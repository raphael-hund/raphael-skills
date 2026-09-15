#!/usr/bin/env python3
"""Stage 3: review records -> candidate Lesson pages in the Brain.

Writes only through brain-write.py into wiki/_candidates/ads/<run>/... and
keeps a registry (lesson_id per review) so re-runs are idempotent. Every
page carries both the Brain promote headings and the Ads schema headings,
so validate-schema.py and brain-promote.py both accept it.
"""
from __future__ import annotations

import argparse
import json
import re
import subprocess
import sys
from pathlib import Path

from common import BRAIN_ROOT, RUN_DATE, RUN_ROOT, read_jsonl, slugify

BRAIN_WRITE = BRAIN_ROOT / "scripts" / "brain-write.py"
VALIDATE = Path(__file__).resolve().parent.parent / "validate-schema.py"

TOPIC_TAG = {
    "icp": "icp", "situation": "icp", "problem": "problem", "angle": "angle", "hook": "hook", "mechanism": "mechanism",
    "proof": "proof", "offer": "offer", "pricing": "pricing", "cta": "cta", "qualification": "qualifizierung",
    "leadgen": "leadgen", "lead_magnet": "lead-magnet", "awareness": "awareness", "testing": "testing", "budget": "budget",
    "video": "video", "static": "static", "copy": "copy", "funnel": "funnel", "performance": "performance", "sales": "sales",
    "account": "account", "creative_strategy": "creative-strategie", "retention": "retention", "other": "sonstiges",
}


def yaml_str(s: str) -> str:
    return json.dumps(str(s), ensure_ascii=False)


def confidence_band(c: float, status: str) -> str:
    if status != "astra_reviewed":
        return "low"
    return "high" if c >= 0.85 else "medium" if c >= 0.6 else "low"


def brain_write(rel_path: str, payload: str) -> tuple[bool, str]:
    (BRAIN_ROOT / rel_path).parent.mkdir(parents=True, exist_ok=True)
    proc = subprocess.run(
        [sys.executable, str(BRAIN_WRITE), "--root", str(BRAIN_ROOT), "--path", rel_path, "create"],
        input=payload.encode("utf-8"),
        capture_output=True,
    )
    return proc.returncode == 0, (proc.stdout + proc.stderr).decode("utf-8", errors="replace").strip()


def render(rec: dict, lesson_id: str, run_slug: str) -> str:
    pk = rec["packet"]
    status = rec["review_status"]
    topic = rec.get("topic", "other")
    tags = ["ads", TOPIC_TAG.get(topic, topic), slugify(pk["source_id"], 30), "review-" + RUN_DATE]
    start = rec.get("start_line") or pk.get("start_line")
    end = rec.get("end_line") or pk.get("end_line")
    has_raw = bool(pk.get("raw_path"))
    if rec.get("locator"):
        locator = rec["locator"]
    elif has_raw:
        locator = f"{pk['raw_path']}:{start}-{end}"
    else:
        locator = f"{pk.get('source_url') or 'unbekannt'} (kein lokales Original; Lern-Register {rec.get('learning_id', '')})"
    pages = f" (Buchseiten {pk['pages'][0]}-{pk['pages'][1]})" if pk.get("pages") else ""
    cite_line = f"`{pk['raw_path']}:{start}`" if has_raw and start else "- Kein raw-Beleg: Originaltext liegt nicht lokal vor."
    reviewed_by = "astra" if status == "astra_reviewed" else "null"
    reviewed_at = RUN_DATE if status == "astra_reviewed" else "null"
    context_status = rec.get("context_status", "unbestimmt") if status == "astra_reviewed" else "pending_astra_review"
    verb = rec.get("verbindungen") or []
    verb_lines = "\n".join(f"- `ads`: {v}" for v in verb) or "- `ads`: keine Verbindungen dokumentiert"
    quelle_extra = ""
    if pk.get("source_url"):
        quelle_extra = f"\n- Original-URL: {pk['source_url']}"
    review_note = {
        "astra_reviewed": f"Review am {RUN_DATE} gegen den wörtlichen Originalausschnitt ({rec.get('reviewer_model', 'reviewer')}); Extraktion durch {rec.get('extract_model', 'extractor')}.",
        "review_unavailable": f"Kein lokaler Originalausschnitt verfügbar; Prüfung am {RUN_DATE} nur gegen das Lern-Register ({rec.get('reviewer_model', 'reviewer')}). Kein Review-Beleg im Sinne von schemas.md.",
        "rejected": f"Vom Reviewer am {RUN_DATE} zurückgewiesen: {rec.get('reject_reason', '')}",
    }.get(status, "Review offen.")
    if pk.get("review_basis") == "learning_register_paraphrase_caption_checked":
        review_note += " Die Instagram-Caption liegt lokal vor und trägt diese Aussage nicht (Aussage stammt aus dem Video); ein Video-Transkript fehlt lokal."
    excerpt = (rec.get("excerpt") or "").strip()
    excerpt_block = ("\n".join("> " + line for line in excerpt.splitlines()) + "\n") if excerpt else ""
    title = (rec.get("title") or rec["aussage"][:80]).strip().rstrip(".")
    tldr_words = title.split()
    tldr = " ".join(tldr_words[:24]) + ("." if not title.endswith(("?", "!")) else "")
    if re.match(r"^\s*[-*0-9]+[.)]?\s", tldr):  # wiki-lint reads a leading number/dash as a list
        tldr = "Regel: " + tldr
    body = f"""---
title: {yaml_str(rec.get('title') or rec['aussage'][:80])}
type: lesson
confidence: {confidence_band(float(rec.get('confidence', 0) or 0), status)}
status: candidate
sensitivity: internal
tenant: agency
created: {RUN_DATE}
tags: [{', '.join(tags)}]
lesson_id: {lesson_id}
provenance_type: {rec.get('provenance_type', 'author_learning')}
source_tier: {pk.get('source_tier', 'tier_1')}
source_id: {pk['source_id']}
media_id: {pk.get('media_id', '')}
source_locator: {yaml_str(locator + pages)}
original_context: {yaml_str(pk.get('original_context') or 'Autorentext; Markt und Funnel-Stufe siehe Grenze')}
context_status: {context_status}
transfer_status: not_transferred
performance_status: not_claimed
review_status: {status}
reviewed_by: {reviewed_by}
reviewed_at: {reviewed_at}
review_confidence: {float(rec.get('confidence', 0) or 0):.2f}
lesson_status: candidate
topic: {topic}
review_run: {run_slug}
---

# {rec.get('title') or rec['aussage'][:80]}

## TLDR

{tldr}

## Aussage

{rec['aussage']}

## Regeln

- {rec['aussage']}
- Autoren-Aussage ({pk['source_id']}), kein eigener Performance-Beweis.

## Anwendung

{rec.get('anwendung') or 'Noch nicht formuliert.'}

## Taktiken

{rec.get('anwendung') or 'Noch nicht formuliert.'}

## Beispiel

{rec.get('beispiel') or 'Kein Beispiel dokumentiert.'}

## Beispiele

{rec.get('beispiel') or 'Kein Beispiel dokumentiert.'}

## Gegenbeispiel

{rec.get('gegenbeispiel') or 'Kein Gegenbeispiel dokumentiert.'}

## Gilt nicht wenn

{rec.get('gegenbeispiel') or 'Nicht dokumentiert.'}

## Test

{rec.get('test') or 'Noch keine Testvariable dokumentiert.'}

## Grenze

{rec.get('grenze') or 'Nicht dokumentiert.'}

## Datenlücken

{rec.get('offene_datenluecke') or 'Nicht dokumentiert.'}

## Verbindungen

{verb_lines}

## Originalausschnitt

{excerpt_block if excerpt_block else 'Kein lokaler Originalausschnitt.'}
## Quelle

{cite_line}

- Locator: `{locator}`{pages}{quelle_extra}
- {review_note}
"""
    return body


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--reviews", type=Path, nargs="+", required=True)
    ap.add_argument("--run-slug", default="review-" + RUN_DATE)
    ap.add_argument("--registry", type=Path, default=RUN_ROOT / "lesson_registry.jsonl")
    ap.add_argument("--include-rejected", action="store_true")
    ap.add_argument("--limit", type=int, default=0)
    args = ap.parse_args()

    registry = {r["review_key"]: r for r in read_jsonl(args.registry)}
    next_no = 1 + max([int(r["lesson_id"].rsplit("-", 1)[1]) for r in registry.values()] or [0])
    records: list[dict] = []
    for path in args.reviews:
        for top in read_jsonl(path):
            subs = top["packets"] if top.get("batch") else [top]
            for pkt in subs:
                for rev in pkt["reviews"]:
                    rec = dict(rev)
                    rec["packet"] = pkt["packet"]
                    rec["reviewer_model"] = top.get("reviewer_model")
                    rec["extract_model"] = pkt["packet"].get("extract_model")
                    rec["review_key"] = rev.get("proposal_id") or f"{pkt['packet_id']}-{len(records)}"
                    records.append(rec)
    wanted = [r for r in records if r["review_status"] in ("astra_reviewed", "review_unavailable") or (args.include_rejected and r["review_status"] == "rejected")]
    todo = [r for r in wanted if r["review_key"] not in registry]
    already = len(wanted) - len(todo)
    if args.limit:
        todo = todo[: args.limit]
    print(f"reviews={len(records)} eligible={len(wanted)} already={already} todo={len(todo)}")
    written = failed = 0
    new_paths: list[str] = []
    for rec in sorted(todo, key=lambda r: r["review_key"]):
        lesson_id = f"LES-{RUN_DATE.replace('-', '')}-{next_no:04d}"
        pk = rec["packet"]
        folder = f"wiki/_candidates/ads/{args.run_slug}/{slugify(pk['source_id'], 40)}"
        fname = f"{lesson_id.lower()}-{slugify(rec.get('title') or rec['aussage'], 50)}.md"
        rel = f"{folder}/{fname}"
        ok, msg = brain_write(rel, render(rec, lesson_id, args.run_slug))
        if not ok:
            failed += 1
            print(f"WRITE_FAILED {rel}: {msg[:200]}", file=sys.stderr)
            continue
        written += 1
        next_no += 1
        new_paths.append(str(BRAIN_ROOT / rel))
        with args.registry.open("a", encoding="utf-8") as fh:
            fh.write(json.dumps({"review_key": rec["review_key"], "lesson_id": lesson_id, "path": rel, "source_id": pk["source_id"], "review_status": rec["review_status"], "topic": rec.get("topic"), "title": rec.get("title")}, ensure_ascii=False) + "\n")
    print(f"WRITTEN={written} FAILED={failed}")
    if new_paths:
        proc = subprocess.run([sys.executable, str(VALIDATE), *new_paths], capture_output=True, text=True)
        tail = "\n".join(proc.stdout.strip().splitlines()[-3:])
        print(f"VALIDATE_EXIT={proc.returncode}\n{tail}\n{proc.stderr.strip()[-500:]}")
    return 0 if failed == 0 else 1


if __name__ == "__main__":
    raise SystemExit(main())
