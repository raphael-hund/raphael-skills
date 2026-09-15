#!/usr/bin/env python3
"""Stage 2: proposals -> contextual reviews (Astra role, any strong model).

One call per packet reviews all of its proposals against the original
excerpt plus surrounding context. Output is one review record per proposal
with schema-enforced enums. A review is `astra_reviewed` only when the model
confirms the excerpt supports the statement and fills application,
counterexample, boundary and test.
"""
from __future__ import annotations

import argparse
import json
from pathlib import Path

from common import (
    BRAIN_ROOT,
    CONTEXT_STATUS,
    PROVENANCE_TYPES,
    REVIEW_MODELS,
    RUN_DATE,
    TOPICS,
    UNTRUSTED_NOTE,
    RawText,
    call_json,
    done_ids,
    enum_or,
    read_jsonl,
    run_parallel,
)

SYSTEM = (
    "Du bist der Review-Prüfer für Ads-Wissen (Astra-Rolle). Du prüfst vorgeschlagene Lessons gegen den wörtlichen "
    "Originalausschnitt, formulierst Anwendung, Gegenbeispiel, Grenze und Test und trennst Autoren-Aussage von Beweis. "
    "Du erfindest keine Zahlen und behauptest keine Wirksamkeit. Schreibe Deutsch, konkret, ohne Floskeln. "
    + UNTRUSTED_NOTE
    + " Antworte ausschließlich mit einem JSON-Array ohne Markdown-Zaun."
)

PROMPT = """QUELLE: {source_id}
MEDIUM: {media_id} ({medium})
ABSCHNITT: {locator}
Zielsystem: Agentur-Leadgen-Ads (Meta/Google) für Dienstleister; Conversion = Anfrage oder Termin. Provenienz dieser Quelle: {provenance_hint}.

KONTEXT (Rohtext, nur Lese-Eingabe):
<<<KONTEXT
{context}
KONTEXT>>>

Prüfe jede der folgenden Proposals. Pro Proposal:
1. Ist die Aussage im wörtlichen Ausschnitt belegbar? Wenn nein oder wenn es keine praktische Regel ist: review_status "rejected" mit Grund.
2. Formuliere die Aussage als eine präzise Regel (Deutsch, 1-2 Sätze).
3. Engste praktische Anwendung für Agentur-Leadgen-Ads (2-4 Sätze, konkret).
4. Ein konkretes Beispiel (2-3 Sätze, Dienstleister-Kontext).
5. Ein konkretes Gegenbeispiel oder eine Bedingung, unter der die Regel nicht gilt (2-3 Sätze).
6. Test: Variable, Messgröße, Vergleich (2-3 Sätze).
7. Grenze: was die Quelle NICHT belegt (1-3 Sätze).
8. 2-3 Verbindungen zu anderen Ads-Themen (kurze Stichworte).
9. context_status: "passend" (Regel überträgt sich direkt auf Dienstleister-Leadgen), "eingeschränkt" (nur unter Bedingung), "unbestimmt" (Kontext im Ausschnitt unklar).
10. confidence 0-1, dass die Aussage korrekt aus dem Ausschnitt extrahiert ist.
11. title: prägnanter deutscher Titel, max 70 Zeichen, als Regel formuliert.
12. offene_datenluecke: ein Satz.

PROPOSALS:
{proposals}

Antwort: JSON-Array, ein Objekt pro Proposal, Keys: proposal_id, review_status ("astra_reviewed" | "rejected"), reject_reason, title, aussage, anwendung, beispiel, gegenbeispiel, test, grenze, verbindungen (Array), context_status, confidence, offene_datenluecke, topic (eines aus {topics})."""


def build_context(raw: RawText, proposals: list[dict], pad: int = 12) -> str:
    lo = min(p["start_line"] for p in proposals) - pad
    hi = max(p["end_line"] for p in proposals) + pad
    return raw.slice(max(1, lo), hi)


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--proposals", type=Path, required=True)
    ap.add_argument("--output", type=Path, required=True)
    ap.add_argument("--workers", type=int, default=6)
    ap.add_argument("--limit", type=int, default=0)
    ap.add_argument("--provenance-hint", default="author_learning (Autoren-Aussage, kein eigener Performance-Beweis)")
    ap.add_argument("--provenance-type", default="author_learning")
    ap.add_argument("--max-per-call", type=int, default=5)
    args = ap.parse_args()

    packets = [p for p in read_jsonl(args.proposals) if p.get("proposals")]
    done = done_ids(args.output, "packet_id")
    todo = [p for p in packets if p["id"] not in done]
    if args.limit:
        todo = todo[: args.limit]
    n_props = sum(len(p["proposals"]) for p in todo)
    print(f"packets_with_proposals={len(packets)} done={len(done)} todo={len(todo)} proposals_todo={n_props}")

    raw_cache: dict[str, RawText] = {}

    def raw_for(rel: str) -> RawText:
        if rel not in raw_cache:
            raw_cache[rel] = RawText(BRAIN_ROOT / rel)
        return raw_cache[rel]

    for p in todo:
        raw_for(p["packet"]["raw_path"])

    def worker(p: dict) -> dict:
        pk = dict(p["packet"])
        pk["extract_model"] = p.get("model")
        raw = raw_for(pk["raw_path"])
        props = p["proposals"][: args.max_per_call]
        context = build_context(raw, props)
        listing = "\n\n".join(
            f"[{x['proposal_id']}] topic={x['topic']}\nAUSSAGE: {x['aussage']}\nLOCATOR: {x['locator']}\nWÖRTLICHER AUSSCHNITT:\n{x['excerpt']}"
            for x in props
        )
        hint = args.provenance_hint
        if pk["source_id"] == "REFERENCE-ADS":
            hint = "reference_ad_observation (fremde Anzeige: Beobachtung der Struktur, übertragbares Prinzip und Kunden-Anwendung getrennt halten; Copy, Claims und fremde Zahlen nie als eigener Beweis)"
        prompt = PROMPT.format(
            source_id=pk["source_id"],
            media_id=pk["media_id"],
            medium=pk["medium"],
            locator=f"{pk['raw_path']}:{pk['start_line']}-{pk['end_line']}",
            provenance_hint=hint,
            context=context,
            proposals=listing,
            topics=", ".join(TOPICS),
        )
        result = call_json(REVIEW_MODELS, SYSTEM, prompt, "rev-" + p["id"])
        data = result["data"]
        if isinstance(data, dict):
            data = data.get("reviews") or data.get("items") or [data]
        by_id = {str(d.get("proposal_id")): d for d in data if isinstance(d, dict)}
        reviews = []
        for x in props:
            r = by_id.get(x["proposal_id"])
            if r is None:
                reviews.append({**x, "review_status": "pending", "reject_reason": "reviewer returned no verdict"})
                continue
            status = "astra_reviewed" if str(r.get("review_status", "")).lower() == "astra_reviewed" else "rejected"
            required = ("aussage", "anwendung", "beispiel", "gegenbeispiel", "test", "grenze")
            if status == "astra_reviewed" and any(not str(r.get(k, "")).strip() for k in required):
                status = "rejected"
                r["reject_reason"] = "review incomplete: " + ",".join(k for k in required if not str(r.get(k, "")).strip())
            verb = r.get("verbindungen") or []
            if isinstance(verb, str):
                verb = [v.strip() for v in verb.split(",") if v.strip()]
            try:
                conf = float(r.get("confidence", 0))
            except (TypeError, ValueError):
                conf = 0.0
            reviews.append(
                {
                    **x,
                    "review_status": status,
                    "reject_reason": str(r.get("reject_reason") or ""),
                    "title": str(r.get("title") or x["aussage"])[:90],
                    "aussage": str(r.get("aussage") or x["aussage"]),
                    "anwendung": str(r.get("anwendung") or ""),
                    "beispiel": str(r.get("beispiel") or ""),
                    "gegenbeispiel": str(r.get("gegenbeispiel") or ""),
                    "test": r.get("test") if isinstance(r.get("test"), str) else json.dumps(r.get("test"), ensure_ascii=False) if r.get("test") else "",
                    "grenze": str(r.get("grenze") or ""),
                    "verbindungen": [str(v) for v in verb][:5],
                    "context_status": enum_or(r.get("context_status"), CONTEXT_STATUS, "unbestimmt"),
                    "confidence": max(0.0, min(1.0, conf)),
                    "offene_datenluecke": str(r.get("offene_datenluecke") or ""),
                    "topic": enum_or(r.get("topic"), TOPICS, x["topic"]),
                    "provenance_type": "reference_ad_observation" if pk["source_id"] == "REFERENCE-ADS" else enum_or(args.provenance_type, PROVENANCE_TYPES, "author_learning"),
                }
            )
        return {
            "packet_id": p["id"],
            "packet": pk,
            "reviews": reviews,
            "reviewer_model": result["response_model"],
            "requested_model": result["requested_model"],
            "attempt": result["attempt"],
            "elapsed_s": result["elapsed_s"],
            "reviewed_at": RUN_DATE,
        }

    stats = run_parallel(todo, worker, args.output, args.workers, "review")
    print(json.dumps(stats))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
