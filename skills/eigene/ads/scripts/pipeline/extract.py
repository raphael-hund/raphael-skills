#!/usr/bin/env python3
"""Stage 1: packets -> lesson proposals with verbatim, code-located excerpts.

The model proposes; the code decides whether the excerpt exists in the raw
file. Excerpts that cannot be located verbatim are dropped and counted.
"""
from __future__ import annotations

import argparse
import json
from pathlib import Path

from common import (
    BRAIN_ROOT,
    EXTRACT_MODELS,
    RUN_ROOT,
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
    "Du bist ein Extraktions-Spezialist für Ads- und Leadgen-Wissen (Luna-Rolle). "
    "Du paraphrasierst Aussagen einer Quelle, leitest aber keine Wahrheit oder Wirksamkeit ab. "
    + UNTRUSTED_NOTE
    + " Antworte ausschließlich mit einem JSON-Array ohne Markdown-Zaun."
)

PROMPT = """Quelle: {source_id} ({medium}), Abschnitt {locator}.{medium_note}
Kontext des Ziel-Systems: Eine Agentur macht Meta/Google-Leadgen-Ads für Dienstleister (Handwerk, Immobilien, Beratung, lokale Anbieter). Conversion ist Anfrage oder Termin, nicht E-Commerce-Kauf.

Aufgabe: Finde in diesem Rohtext 0 bis {max_lessons} praktisch nutzbare Lessons für Ads, Offer, Leadgen, Hooks, Qualifizierung, Testing, Funnel oder Sales. Keine Lesson aus Anekdoten ohne Regel, Inhaltsverzeichnis, Danksagungen, Copyright oder reinen Geschichten. Wenn der Text nichts Nutzbares enthält, gib [] zurück.

Pflicht pro Lesson:
- "excerpt": ein WÖRTLICHES, zusammenhängendes Zitat aus dem Rohtext unten (2-6 Sätze, 150-700 Zeichen). Zeichen für Zeichen kopieren, nichts umformulieren, keine Auslassungspunkte, keine Ergänzungen. Das Zitat muss die Aussage tragen.
- "aussage": die praktische Regel in einem deutschen Satz (Paraphrase, kein Zitat).
- "topic": eines aus {topics}.
- "warum": ein Satz, warum das für Leadgen-Ads einer Agentur nützlich ist.

Rohtext (Zeilen {start_line}-{end_line}):
<<<ROHTEXT
{text}
ROHTEXT>>>

Antwort: JSON-Array von Objekten mit den Keys excerpt, aussage, topic, warum."""


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--packets", type=Path, required=True)
    ap.add_argument("--output", type=Path, required=True)
    ap.add_argument("--workers", type=int, default=6)
    ap.add_argument("--max-lessons", type=int, default=4)
    ap.add_argument("--limit", type=int, default=0)
    ap.add_argument("--only", default="", help="comma list of packet ids")
    args = ap.parse_args()

    packets = [p for p in read_jsonl(args.packets) if p.get("kind") != "thin"]
    thin = [p for p in read_jsonl(args.packets) if p.get("kind") == "thin"]
    done = done_ids(args.output)
    for p in thin:
        if p["id"] not in done:
            from common import append_jsonl

            append_jsonl(args.output, {"id": p["id"], "packet": p, "status": "thin", "proposals": [], "dropped": 0})
    done = done_ids(args.output)
    todo = [p for p in packets if p["id"] not in done]
    if args.only:
        wanted = set(args.only.split(","))
        todo = [p for p in todo if p["id"] in wanted]
    if args.limit:
        todo = todo[: args.limit]
    print(f"packets={len(packets)} thin={len(thin)} done={len(done)} todo={len(todo)}")

    raw_cache: dict[str, RawText] = {}

    def raw_for(rel: str) -> RawText:
        if rel not in raw_cache:
            raw_cache[rel] = RawText(BRAIN_ROOT / rel)
        return raw_cache[rel]

    for p in todo:
        raw_for(p["raw_path"])

    def worker(p: dict) -> dict:
        raw = raw_for(p["raw_path"])
        text = raw.slice(p["start_line"], p["end_line"])
        medium_note = ""
        if p["medium"] == "reference_ad":
            medium_note = (
                "\nDies ist das Transkript einer FREMDEN Anzeige (Meta Ads Library). Extrahiere beobachtbare Struktur-Muster "
                "(Hook-Typ, Callout, Problem-Rahmung, Mechanismus, Proof-Art, Offer, CTA), nicht die Copy zum Kopieren und keine fremden Zahlen als Beweis."
            )
        elif p["medium"] in ("instagram", "youtube"):
            medium_note = "\nDies ist ein Sprach-Transkript (automatisch erkannt, Zeitmarken in eckigen Klammern). Zitate müssen ganze Transkriptzeilen wörtlich übernehmen, inklusive der Zeitmarken am Zeilenanfang."
        prompt = PROMPT.format(
            medium_note=medium_note,
            source_id=p["source_id"],
            medium=p["medium"],
            locator=f"{p['raw_path']}:{p['start_line']}-{p['end_line']}" + (f" (Seiten {p['pages'][0]}-{p['pages'][1]})" if p.get("pages") else ""),
            max_lessons=args.max_lessons,
            topics=", ".join(TOPICS),
            start_line=p["start_line"],
            end_line=p["end_line"],
            text=text,
        )
        result = call_json(EXTRACT_MODELS, SYSTEM, prompt, p["id"])
        data = result["data"]
        if isinstance(data, dict):
            data = data.get("lessons") or data.get("items") or [data]
        proposals = []
        dropped = 0
        for i, item in enumerate(data if isinstance(data, list) else []):
            if not isinstance(item, dict):
                dropped += 1
                continue
            excerpt = str(item.get("excerpt", "")).strip()
            loc = raw.locate(excerpt)
            if loc is None or loc[0] < p["start_line"] - 5 or loc[1] > p["end_line"] + 5:
                dropped += 1
                continue
            proposals.append(
                {
                    "proposal_id": f"{p['id']}-L{i + 1}",
                    "excerpt": excerpt,
                    "aussage": str(item.get("aussage", "")).strip(),
                    "topic": enum_or(item.get("topic"), TOPICS, "other"),
                    "warum": str(item.get("warum", "")).strip(),
                    "start_line": loc[0],
                    "end_line": loc[1],
                    "locator": f"{p['raw_path']}:{loc[0]}-{loc[1]}",
                }
            )
        return {
            "id": p["id"],
            "packet": p,
            "status": "ok" if proposals or not dropped else ("empty" if not data else "all_dropped"),
            "proposals": proposals,
            "dropped": dropped,
            "model": result["response_model"],
            "attempt": result["attempt"],
            "elapsed_s": result["elapsed_s"],
        }

    stats = run_parallel(todo, worker, args.output, args.workers, "extract")
    print(json.dumps(stats))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
