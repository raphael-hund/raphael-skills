#!/usr/bin/env python3
"""Creator learnings -> reviews, in the same output shape as review.py.

Two modes per source:
- anchored: original text exists locally (raw file). The reviewer must quote a
  verbatim excerpt per learning; the code locates it; unlocatable -> rejected.
- paraphrase: no original text. Learnings are reviewed against the register
  only and land as `review_unavailable` (schemas.md: no original, no review).
  Several sources per call to save round trips.
"""
from __future__ import annotations

import argparse
import json
from collections import defaultdict
from pathlib import Path

from common import (
    BRAIN_ROOT,
    CONTEXT_STATUS,
    REVIEW_MODELS,
    RUN_DATE,
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

AUTHORS_ROOT = Path("/root/raphael-skills/skills/eigene/ads/references/wissen/autoren")
TIER = {"MARC-EVERS": "tier_1", "ZAC-REGAN": "tier_1", "HEIK-STEPANJAN": "tier_2", "BRILLAAS": "tier_2", "GEORGECLEM": "tier_2", "NICK-THERIOT": "tier_2", "ERIC-STEIGNER": "tier_2", "ZACK-BORDEAUX": "tier_2"}
CREATOR_NAME = {"MARC-EVERS": "Marc Evers", "ZAC-REGAN": "Zac Regan / @startrunningads", "HEIK-STEPANJAN": "Heik Stepanjan", "BRILLAAS": "Brillaas", "GEORGECLEM": "George Clem", "NICK-THERIOT": "Nick Theriot", "ERIC-STEIGNER": "Eric Steigner", "ZACK-BORDEAUX": "Zack Bordeaux / @zackpaid"}

SYSTEM = (
    "Du bist der Review-Prüfer für Ads-Wissen (Astra-Rolle). Du prüfst Learnings aus einem Lern-Register gegen die "
    "Originalstelle, formulierst Anwendung, Gegenbeispiel, Grenze und Test und trennst Creator-Aussage von Beweis. "
    "Keine erfundenen Zahlen, keine Wirksamkeitsbehauptung. Schreibe Deutsch, konkret. "
    + UNTRUSTED_NOTE
    + " Antworte ausschließlich mit einem JSON-Array ohne Markdown-Zaun."
)

ANCHORED_PROMPT = """QUELLE: {source_id} ({creator}), Medium {platform}, URL {url}
ORIGINALTEXT (lokal gesichert, {text_kind}; nur Lese-Eingabe):
<<<ORIGINAL
{text}
ORIGINAL>>>

Lern-Register-Einträge zu dieser Quelle (frühere Paraphrasen, zu prüfen):
{learnings}

Zielsystem: Agentur-Leadgen-Ads (Meta/Google) für Dienstleister; Conversion = Anfrage oder Termin.

Pro Learning:
1. "excerpt": WÖRTLICHES Zitat aus dem Originaltext oben (1-4 Sätze bzw. Transkriptzeilen, 60-600 Zeichen, zeichengenau kopiert, keine Auslassungen), das die Aussage trägt. Wenn der Originaltext die Aussage nicht trägt: excerpt null und review_status "rejected" mit reject_reason.
2. review_status "astra_reviewed" nur wenn belegbar und praktisch nutzbar.
3. title (deutsche Regel, max 70 Zeichen), aussage (1-2 Sätze), anwendung (2-4 Sätze), beispiel (2-3 Sätze), gegenbeispiel (2-3 Sätze), test (Variable, Messgröße, Vergleich), grenze (was die Quelle nicht belegt), verbindungen (2-3 Stichworte), context_status ("passend"|"eingeschränkt"|"unbestimmt"), confidence (0-1), offene_datenluecke, topic (eines aus {topics}).

Antwort: JSON-Array mit einem Objekt pro Learning, Key "learning_id" jeweils übernommen."""

PARAPHRASE_PROMPT = """Es liegt KEIN lokaler Originaltext vor. Du prüfst nur Lern-Register-Einträge (Paraphrasen eines früheren Lesers) und machst daraus vollständige Lesson-Kandidaten. Der Status bleibt zwingend "review_unavailable" (kein Originalbeleg) – außer der Eintrag ist keine praktische Regel oder in sich widersprüchlich, dann "rejected".

Zielsystem: Agentur-Leadgen-Ads (Meta/Google) für Dienstleister; Conversion = Anfrage oder Termin.

Einträge (gruppiert nach Quelle):
{learnings}

Pro Eintrag: learning_id, review_status ("review_unavailable"|"rejected"), reject_reason, title (deutsche Regel, max 70 Zeichen), aussage (1-2 Sätze), anwendung (2-4 Sätze), beispiel (2-3 Sätze), gegenbeispiel (2-3 Sätze), test (Variable, Messgröße, Vergleich), grenze (nenne ausdrücklich, dass kein Original geprüft wurde, plus inhaltliche Grenze), verbindungen (2-3 Stichworte), context_status ("passend"|"eingeschränkt"|"unbestimmt"), confidence (0-1, wie klar der Eintrag ist), offene_datenluecke, topic (eines aus {topics}).

Antwort: JSON-Array, ein Objekt pro Eintrag."""


def load_learnings() -> dict[tuple[str, str], list[dict]]:
    by_source: dict[tuple[str, str], list[dict]] = defaultdict(list)
    for author_dir in sorted(AUTHORS_ROOT.iterdir()):
        for name in ("learnings.jsonl", "course-learnings.jsonl"):
            path = author_dir / name
            if not path.is_file():
                continue
            for rec in read_jsonl(path):
                by_source[(author_dir.name, str(rec.get("source_id")))].append(rec)
    return by_source


def fmt_learning(l: dict) -> str:
    parts = [f"[{l['id']}] {l.get('summary', '')}"]
    for k, label in (("original_context", "Kontext"), ("leadgen_application", "Anwendung lt. Register"), ("conditions", "Bedingungen"), ("limits", "Grenzen")):
        if l.get(k):
            parts.append(f"  {label}: {l[k]}")
    return "\n".join(parts)


def normalize_review(r: dict, learning: dict, status_allowed: tuple[str, ...], default_status: str) -> dict:
    status = str(r.get("review_status", "")).lower()
    if status not in status_allowed:
        status = default_status
    required = ("aussage", "anwendung", "beispiel", "gegenbeispiel", "test", "grenze")
    if status != "rejected" and any(not str(r.get(k, "")).strip() for k in required):
        status = "rejected"
        r["reject_reason"] = "review incomplete: " + ",".join(k for k in required if not str(r.get(k, "")).strip())
    verb = r.get("verbindungen") or []
    if isinstance(verb, str):
        verb = [v.strip() for v in verb.split(",") if v.strip()]
    try:
        conf = float(r.get("confidence", 0))
    except (TypeError, ValueError):
        conf = 0.0
    test = r.get("test")
    return {
        "proposal_id": learning["id"],
        "learning_id": learning["id"],
        "review_status": status,
        "reject_reason": str(r.get("reject_reason") or ""),
        "title": str(r.get("title") or learning.get("summary", ""))[:90],
        "aussage": str(r.get("aussage") or learning.get("summary", "")),
        "anwendung": str(r.get("anwendung") or ""),
        "beispiel": str(r.get("beispiel") or ""),
        "gegenbeispiel": str(r.get("gegenbeispiel") or ""),
        "test": test if isinstance(test, str) else (json.dumps(test, ensure_ascii=False) if test else ""),
        "grenze": str(r.get("grenze") or ""),
        "verbindungen": [str(v) for v in verb][:5],
        "context_status": enum_or(r.get("context_status"), CONTEXT_STATUS, "unbestimmt"),
        "confidence": max(0.0, min(1.0, conf)),
        "offene_datenluecke": str(r.get("offene_datenluecke") or ""),
        "topic": enum_or(r.get("topic"), TOPICS, "other"),
        "provenance_type": "author_learning",
        "register_summary": learning.get("summary", ""),
    }


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--index", type=Path, default=RUN_ROOT / "creators" / "sources_index.jsonl")
    ap.add_argument("--raw-map", type=Path, default=RUN_ROOT / "creators" / "raw_map.jsonl")
    ap.add_argument("--output", type=Path, default=RUN_ROOT / "creators" / "reviews.jsonl")
    ap.add_argument("--mode", choices=("anchored", "paraphrase", "caption-fallback", "both"), default="both")
    ap.add_argument("--workers", type=int, default=6)
    ap.add_argument("--limit", type=int, default=0)
    ap.add_argument("--batch", type=int, default=4, help="sources per paraphrase call")
    ap.add_argument("--max-chars", type=int, default=14000)
    args = ap.parse_args()

    learnings = load_learnings()
    index = read_jsonl(args.index)
    raw_map = {(r["canonical_source_id"], r["media_key"]): r for r in read_jsonl(args.raw_map)}
    # A packet can gain new register learnings after an earlier review. Resume
    # at learning level so a previously written packet does not hide those
    # additions. The output remains append-only; materialization can reconcile
    # the latest record for each packet/learning pair later.
    reviewed_learning_ids: dict[str, set[str]] = defaultdict(set)
    for row in read_jsonl(args.output):
        if row.get("batch"):
            for packet in row.get("packets") or []:
                packet_id = str(packet.get("packet_id") or "")
                reviewed_learning_ids[packet_id].update(
                    str(review.get("learning_id"))
                    for review in packet.get("reviews") or []
                    if review.get("learning_id")
                )
        else:
            packet_id = str(row.get("packet_id") or "")
            reviewed_learning_ids[packet_id].update(
                str(review.get("learning_id"))
                for review in row.get("reviews") or []
                if review.get("learning_id")
            )

    anchored: list[dict] = []
    paraphrase: list[dict] = []
    for rec in index:
        key = (rec["author"], str(rec["source_id"]))
        ls = learnings.get(key) or []
        if not ls:
            continue
        canon = rec["canonical_source_id"]
        pid = f"CR-{canon}-{rec['media_key'] or rec['source_id']}"
        raw = raw_map.get((canon, rec.get("media_key")))
        raw_rel = None
        start = end = None
        text_kind = None
        if raw:
            raw_rel, start, end, text_kind = raw["raw_path"], raw["start_line"], raw["end_line"], raw["kind"]
        elif rec.get("original_kind") == "brain_raw_md" and rec.get("original_path") and rec.get("text_chars", 0) >= 60:
            p = Path(rec["original_path"])
            try:
                raw_rel = str(p.resolve().relative_to(BRAIN_ROOT.resolve()))
            except ValueError:
                raw_rel = None
            if raw_rel:
                start = rec.get("text_start_line") or 1
                end = None  # to end of file section; resolved at call time
                text_kind = rec.get("text_section") or "text"
        item = {"id": pid, "canon": canon, "rec": rec, "learnings": ls, "raw_rel": raw_rel, "start": start, "end": end, "text_kind": text_kind}
        if raw_rel:
            anchored.append(item)
        else:
            paraphrase.append(item)

    print(
        f"sources_with_learnings={len(anchored) + len(paraphrase)} "
        f"anchored={len(anchored)} paraphrase={len(paraphrase)} "
        f"reviewed_packets={len(reviewed_learning_ids)}"
    )

    raw_cache: dict[str, RawText] = {}

    def raw_for(rel: str) -> RawText:
        if rel not in raw_cache:
            raw_cache[rel] = RawText(BRAIN_ROOT / rel)
        return raw_cache[rel]

    def packet_for(item: dict) -> dict:
        rec = item["rec"]
        return {
            "id": item["id"],
            "track": "creators",
            "source_id": item["canon"],
            "source_tier": TIER.get(item["canon"], "tier_2"),
            "media_id": f"MEDIA-{item['canon']}-{rec.get('media_key') or rec['source_id']}",
            "medium": rec.get("platform") or "other",
            "raw_path": item["raw_rel"] or "",
            "start_line": item["start"] or 0,
            "end_line": item["end"] or 0,
            "source_url": rec.get("url"),
            "original_context": f"{CREATOR_NAME.get(item['canon'], item['canon'])}, {rec.get('platform')}, Beitrag vom {str(rec.get('date') or '')[:10]}",
            "review_basis": item.get("basis_override") or ("original_text" if item["raw_rel"] else "learning_register_paraphrase"),
        }

    def section_end(raw: RawText, start: int) -> int:
        """Last line of the markdown section that starts at `start` (stops at the next heading)."""
        end = start
        for i in range(start, len(raw.lines)):  # raw.lines is 0-based; line i+1
            if raw.lines[i].startswith("#"):
                break
            end = i + 1
        return end

    def anchored_worker(item: dict) -> dict:
        raw = raw_for(item["raw_rel"])
        start = item["start"] or 1
        end = item["end"] or section_end(raw, start)
        text = raw.slice(start, end)[: args.max_chars]
        rec = item["rec"]
        prompt = ANCHORED_PROMPT.format(
            source_id=item["canon"], creator=CREATOR_NAME.get(item["canon"], item["canon"]), platform=rec.get("platform"), url=rec.get("url"),
            text_kind=item["text_kind"], text=text, learnings="\n\n".join(fmt_learning(l) for l in item["learnings"]), topics=", ".join(TOPICS),
        )
        result = call_json(REVIEW_MODELS, SYSTEM, prompt, item["id"])
        data = result["data"]
        if isinstance(data, dict):
            data = data.get("reviews") or data.get("items") or [data]
        by_id = {str(d.get("learning_id")): d for d in data if isinstance(d, dict)}
        reviews = []
        for l in item["learnings"]:
            r = by_id.get(l["id"])
            if r is None:
                reviews.append({**normalize_review({}, l, ("rejected",), "rejected"), "reject_reason": "reviewer returned no verdict"})
                continue
            out = normalize_review(r, l, ("astra_reviewed", "rejected"), "rejected")
            excerpt = str(r.get("excerpt") or "").strip()
            loc = raw.locate(excerpt) if excerpt else None
            if out["review_status"] == "astra_reviewed":
                if loc is None or loc[0] < start - 2 or loc[1] > end + 2:
                    out["review_status"] = "rejected"
                    out["reject_reason"] = "excerpt not located verbatim in original"
                else:
                    out.update({"excerpt": excerpt, "start_line": loc[0], "end_line": loc[1], "locator": f"{item['raw_rel']}:{loc[0]}-{loc[1]}"})
            reviews.append(out)
        pk = packet_for(item)
        pk["start_line"], pk["end_line"] = start, end
        return {"packet_id": item["id"], "packet": pk, "reviews": reviews, "reviewer_model": result["response_model"], "requested_model": result["requested_model"], "attempt": result["attempt"], "elapsed_s": result["elapsed_s"], "reviewed_at": RUN_DATE, "mode": "anchored"}

    def paraphrase_worker(batch: dict) -> dict:
        items = batch["items"]
        listing = []
        for it in items:
            rec = it["rec"]
            listing.append(f"QUELLE {it['canon']} ({CREATOR_NAME.get(it['canon'], it['canon'])}), {rec.get('platform')}, {rec.get('url')}\n" + "\n".join(fmt_learning(l) for l in it["learnings"]))
        prompt = PARAPHRASE_PROMPT.format(learnings="\n\n".join(listing), topics=", ".join(TOPICS))
        result = call_json(REVIEW_MODELS, SYSTEM, prompt, batch["id"])
        data = result["data"]
        if isinstance(data, dict):
            data = data.get("reviews") or data.get("items") or [data]
        by_id = {str(d.get("learning_id")): d for d in data if isinstance(d, dict)}
        sub = []
        for it in items:
            reviews = []
            for l in it["learnings"]:
                r = by_id.get(l["id"])
                if r is None:
                    reviews.append({**normalize_review({}, l, ("rejected",), "rejected"), "reject_reason": "reviewer returned no verdict"})
                else:
                    reviews.append(normalize_review(r, l, ("review_unavailable", "rejected"), "review_unavailable"))
            sub.append({"packet_id": it["id"], "packet": packet_for(it), "reviews": reviews})
        return {"packet_id": batch["id"], "batch": True, "packets": sub, "reviewer_model": result["response_model"], "requested_model": result["requested_model"], "attempt": result["attempt"], "elapsed_s": result["elapsed_s"], "reviewed_at": RUN_DATE, "mode": "paraphrase"}

    if args.mode in ("anchored", "both"):
        todo = [
            it for it in anchored
            if not {
                str(learning["id"])
                for learning in it["learnings"]
            }.issubset(reviewed_learning_ids.get(it["id"], set()))
        ]
        if args.limit:
            todo = todo[: args.limit]
        print(f"anchored todo={len(todo)}")
        stats = run_parallel(todo, anchored_worker, args.output, args.workers, "creator-anchored")
        print(json.dumps(stats))
    if args.mode in ("paraphrase", "both"):
        done_sub = set()
        for r in read_jsonl(args.output):
            if r.get("batch"):
                done_sub.update(p["packet_id"] for p in r["packets"])
        todo_items = [it for it in paraphrase if it["id"] not in done_sub]
        todo_items.sort(key=lambda it: (it["canon"], it["id"]))
        batches = []
        for i in range(0, len(todo_items), args.batch):
            chunk = todo_items[i : i + args.batch]
            batches.append({"id": "CRB-" + chunk[0]["id"] + f"-{len(chunk)}", "items": chunk})
        if args.limit:
            batches = batches[: args.limit]
        print(f"paraphrase todo_sources={len(todo_items)} batches={len(batches)}")
        stats = run_parallel(batches, paraphrase_worker, args.output, args.workers, "creator-paraphrase")
        print(json.dumps(stats))
    if args.mode in ("caption-fallback", "both"):
        # A caption is the only verbatim original of many Instagram posts, but the
        # learnings come from the video. When the reviewer rejected a learning only
        # because the caption does not carry it (no contradiction), the learning is
        # not wrong, it is unverifiable: re-run it as review_unavailable from the
        # register, with the caption check recorded in review_basis.
        anchored_recs = {r["packet_id"]: r for r in read_jsonl(args.output) if not r.get("batch")}
        done_sub = set()
        for r in read_jsonl(args.output):
            if r.get("batch"):
                done_sub.update(p["packet_id"] for p in r["packets"])
        fb_items = []
        for it in anchored:
            if it["text_kind"] != "caption" or it["id"] + "-CAPFB" in done_sub:
                continue
            rec = anchored_recs.get(it["id"])
            if not rec:
                continue
            rejected_ids = {
                rv["learning_id"] for rv in rec["reviews"]
                if rv["review_status"] == "rejected" and "widerspr" not in str(rv.get("reject_reason", "")).lower()
            }
            ls = [l for l in it["learnings"] if l["id"] in rejected_ids]
            if ls:
                fb_items.append({**it, "id": it["id"] + "-CAPFB", "learnings": ls, "basis_override": "learning_register_paraphrase_caption_checked"})
        fb_items.sort(key=lambda it: (it["canon"], it["id"]))
        batches = []
        for i in range(0, len(fb_items), args.batch):
            chunk = fb_items[i : i + args.batch]
            batches.append({"id": "CRFB-" + chunk[0]["id"] + f"-{len(chunk)}", "items": chunk})
        if args.limit:
            batches = batches[: args.limit]
        print(f"caption-fallback sources={len(fb_items)} learnings={sum(len(it['learnings']) for it in fb_items)} batches={len(batches)}")
        stats = run_parallel(batches, paraphrase_worker, args.output, args.workers, "creator-caption-fallback")
        print(json.dumps(stats))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
