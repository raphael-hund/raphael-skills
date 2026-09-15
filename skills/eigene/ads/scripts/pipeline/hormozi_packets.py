#!/usr/bin/env python3
"""Cut the three local Hormozi page extracts into review packets.

A packet is a small window of consecutive pages with exact line bounds. Every
page of every book lands in exactly one packet, so coverage is provable.
"""
from __future__ import annotations

import argparse
import json
from pathlib import Path

from common import BRAIN_ROOT, RUN_ROOT, append_jsonl, rel_raw

BOOKS = {
    "HORMOZI-100M-OFFERS": "raw/resource-2026-09-12-_oceanofpdf.com_100_million_offer_-_alex_hormozi-book.md",
    "HORMOZI-100M-LEADS": "raw/resource-2026-09-12-_oceanofpdf.com_100m_leads_-_alex_hormozi-book.md",
    "HORMOZI-MONEY-MODELS": "raw/resource-2026-09-12-_oceanofpdf.com_00m_money_models_how_to_make_money_-_alex_hormozi-book.md",
}
PAGE_BREAK = "--- PAGE BREAK ---"


def page_bounds(lines: list[str]) -> list[tuple[int, int]]:
    """1-based inclusive (start, end) line bounds per page, in order."""
    bounds: list[tuple[int, int]] = []
    start = None
    for i, line in enumerate(lines, 1):
        if line.strip() == PAGE_BREAK:
            if start is not None:
                bounds.append((start, i - 1))
            start = i + 1
    if start is not None and start <= len(lines):
        bounds.append((start, len(lines)))
    return bounds


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--pages-per-packet", type=int, default=3)
    ap.add_argument("--output", type=Path, default=RUN_ROOT / "hormozi" / "packets.jsonl")
    args = ap.parse_args()
    if args.output.exists():
        args.output.unlink()
    total_pages = 0
    for source_id, rel in BOOKS.items():
        path = BRAIN_ROOT / rel
        lines = path.read_text(encoding="utf-8", errors="replace").split("\n")
        bounds = page_bounds(lines)
        total_pages += len(bounds)
        for k in range(0, len(bounds), args.pages_per_packet):
            window = bounds[k : k + args.pages_per_packet]
            first_page, last_page = k + 1, k + len(window)
            start, end = window[0][0], window[-1][1]
            text = "\n".join(lines[start - 1 : end])
            if len(text.strip()) < 200:
                kind = "thin"
            else:
                kind = "text"
            append_jsonl(
                args.output,
                {
                    "id": f"{source_id}-P{first_page:03d}-{last_page:03d}",
                    "track": "hormozi",
                    "source_id": source_id,
                    "source_tier": "tier_1",
                    "media_id": f"MEDIA-{source_id}-PAGES-{first_page:03d}-{last_page:03d}",
                    "medium": "pdf",
                    "raw_path": rel_raw(path),
                    "start_line": start,
                    "end_line": end,
                    "pages": [first_page, last_page],
                    "kind": kind,
                    "chars": len(text),
                },
            )
        print(f"{source_id}: pages={len(bounds)} lines={len(lines)}")
    print(f"TOTAL_PAGES={total_pages} OUTPUT={args.output}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
