#!/usr/bin/env python3
"""Bridge locator-checked media extraction proposals into creator registers.

The extractor proposes; this script only normalizes those proposals into the
existing author-learning register. It is append-only and idempotent. Review
and promotion remain separate pipeline stages.
"""
from __future__ import annotations

import argparse
import json
from collections import defaultdict
from pathlib import Path


AUTHOR_BY_CANON = {
    "EVANSEECH": "evanseech",
    "ZAC-REGAN": "zac-regan",
    "ZACK-BORDEAUX": "zackpaid",
    "MARC-EVERS": "marc-evers",
    "ERIC-STEIGNER": "eric-steigner",
    "HEIK-STEPANJAN": "heikstepo",
    "BRILLAAS": "brillaas",
    "GEORGECLEM": "georgeclem",
    "NICK-THERIOT": "nicktheriot_",
}


def rows(path: Path) -> list[dict]:
    if not path.is_file():
        return []
    return [json.loads(line) for line in path.read_text(encoding="utf-8").splitlines() if line.strip()]


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--extracts", type=Path, required=True)
    ap.add_argument("--packets", type=Path, required=True)
    ap.add_argument("--authors-root", type=Path, default=Path(__file__).resolve().parents[2] / "references/wissen/autoren")
    args = ap.parse_args()

    packets = {str(row.get("id")): row for row in rows(args.packets)}
    existing: dict[str, list[dict]] = {}
    existing_ids: dict[str, set[str]] = defaultdict(set)
    for canon, author in AUTHOR_BY_CANON.items():
        path = args.authors_root / author / "learnings.jsonl"
        existing[author] = rows(path)
        existing_ids[author] = {str(row.get("id")) for row in existing[author] if row.get("id")}

    additions: dict[str, list[dict]] = defaultdict(list)
    skipped = 0
    for extract in rows(args.extracts):
        packet_id = str(extract.get("id") or "")
        if not packet_id.startswith("MEDIA-"):
            continue
        packet = extract.get("packet") or packets.get(packet_id) or {}
        canon = str(packet.get("source_id") or "")
        author = AUTHOR_BY_CANON.get(canon)
        if not author:
            skipped += 1
            continue
        proposals = extract.get("proposals") or []
        for proposal in proposals:
            proposal_id = str(proposal.get("proposal_id") or "")
            if not proposal_id:
                skipped += 1
                continue
            learning_id = "media-" + proposal_id
            if learning_id in existing_ids[author]:
                continue
            key = packet_id.removeprefix("MEDIA-" + canon + "-")
            record = {
                "id": learning_id,
                "source_id": key,
                "url": packet.get("source_url"),
                "author": author,
                "date": "2026-09-14",
                "summary": str(proposal.get("aussage") or "").strip(),
                "kind": "media_extract",
                "topics": [str(proposal.get("topic") or "other")],
                "original_context": packet.get("original_context"),
                "leadgen_application": str(proposal.get("warum") or "").strip(),
                "conditions": None,
                "limits": "Extracted from locally captured media; contextual review is still required.",
                "related_ids": [],
                "media_id": packet.get("media_id"),
                "excerpt": proposal.get("excerpt"),
                "locator": proposal.get("locator"),
                "source_locator": proposal.get("locator"),
                "provenance_type": "author_learning",
                "ingest_status": "pending_review",
            }
            additions[author].append(record)
            existing_ids[author].add(learning_id)

    for author, new_rows in sorted(additions.items()):
        path = args.authors_root / author / "learnings.jsonl"
        path.parent.mkdir(parents=True, exist_ok=True)
        with path.open("a", encoding="utf-8") as handle:
            for record in new_rows:
                handle.write(json.dumps(record, ensure_ascii=False) + "\n")
        print(f"author={author} added={len(new_rows)} total={len(existing[author]) + len(new_rows)} path={path}")
    print(f"authors_changed={len(additions)} added={sum(map(len, additions.values()))} skipped={skipped}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
