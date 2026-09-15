#!/usr/bin/env python3
"""Build extraction packets for ingested creator-media originals.

The media ingester owns raw files and raw_map rows; this bridge turns those
rows into the same packet contract consumed by extract.py. It is append-safe:
existing packet ids are preserved and only new media blocks are emitted.
"""
from __future__ import annotations

import argparse
import json
from pathlib import Path


TIER = {
    "MARC-EVERS": "tier_1",
    "ZAC-REGAN": "tier_1",
    "HEIK-STEPANJAN": "tier_2",
    "BRILLAAS": "tier_2",
    "GEORGECLEM": "tier_2",
    "NICK-THERIOT": "tier_2",
    "ERIC-STEIGNER": "tier_2",
    "ZACK-BORDEAUX": "tier_2",
    "EVANSEECH": "tier_2",
}


def read_jsonl(path: Path) -> list[dict]:
    if not path.is_file():
        return []
    rows = []
    for line_no, line in enumerate(path.read_text(encoding="utf-8", errors="replace").splitlines(), 1):
        if not line.strip():
            continue
        value = json.loads(line)
        if not isinstance(value, dict):
            raise SystemExit(f"{path}:{line_no}: expected JSON object")
        rows.append(value)
    return rows


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--index", type=Path, required=True)
    parser.add_argument("--raw-map", type=Path, required=True)
    parser.add_argument("--packets", type=Path, required=True)
    parser.add_argument("--min-chars", type=int, default=60)
    args = parser.parse_args()

    index = {(r.get("canonical_source_id"), r.get("media_key")): r for r in read_jsonl(args.index)}
    existing = read_jsonl(args.packets)
    seen = {str(r.get("id")) for r in existing if r.get("id")}
    additions = []
    skipped = 0

    for row in read_jsonl(args.raw_map):
        canon = row.get("canonical_source_id")
        key = row.get("media_key")
        if row.get("kind") not in {"transcript", "caption", "ocr"}:
            continue
        if row.get("kind") == "ocr":
            continue
        if int(row.get("chars") or 0) < args.min_chars:
            skipped += 1
            continue
        source = index.get((canon, key))
        if not source:
            skipped += 1
            continue
        pid = f"MEDIA-{canon}-{key}"
        if pid in seen:
            continue
        raw_path = str(row.get("raw_path") or "")
        start = int(row.get("start_line") or 0)
        end = int(row.get("end_line") or 0)
        if not raw_path or start <= 0 or end < start:
            skipped += 1
            continue
        platform = source.get("platform") or "other"
        packet = {
            "id": pid,
            "track": "creators",
            "source_id": canon,
            "source_tier": TIER.get(canon, "tier_2"),
            "media_id": f"MEDIA-{canon}-{key}",
            "medium": platform,
            "raw_path": raw_path,
            "start_line": start,
            "end_line": end,
            "kind": "text",
            "chars": int(row.get("chars") or 0),
            "source_url": source.get("url") or row.get("url"),
            "original_context": f"{canon}, {platform}, Medienbeitrag {key}",
            "review_basis": "original_text",
        }
        additions.append(packet)
        seen.add(pid)

    args.packets.parent.mkdir(parents=True, exist_ok=True)
    with args.packets.open("w", encoding="utf-8") as handle:
        for row in existing + additions:
            handle.write(json.dumps(row, ensure_ascii=False) + "\n")
    print(f"existing={len(existing)} added={len(additions)} skipped={skipped} total={len(existing) + len(additions)}")
    print(f"output={args.packets}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
