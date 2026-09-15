#!/usr/bin/env python3
"""Gate metrics for the 2026-09-13 knowledge run. Read-only; prints KEY=VALUE lines.

  stats.py --track hormozi|originals|creators|canonical|frameworks|all

Locator integrity (G2) is re-verified here from scratch: every reviewed
excerpt is searched again in its raw file and the stored line range must
contain the found position. Nothing is trusted from the model.
"""
from __future__ import annotations

import argparse
import json
import sys
from collections import Counter
from pathlib import Path

from common import BRAIN_ROOT, RUN_ROOT, RawText, read_jsonl

_RAW: dict[str, RawText] = {}


def raw_for(rel: str) -> RawText:
    if rel not in _RAW:
        _RAW[rel] = RawText(BRAIN_ROOT / rel)
    return _RAW[rel]


def flatten_reviews(path: Path) -> list[dict]:
    out = []
    for top in read_jsonl(path):
        subs = top["packets"] if top.get("batch") else [top]
        for pkt in subs:
            for rev in pkt.get("reviews", []):
                out.append({**rev, "packet": pkt["packet"], "reviewer_model": top.get("reviewer_model")})
    return out


def verify_locators(reviews: list[dict]) -> Counter:
    c: Counter = Counter()
    for r in reviews:
        if r.get("review_status") == "rejected" and not r.get("excerpt"):
            c["skipped_rejected_no_excerpt"] += 1
            continue
        pk = r["packet"]
        if not pk.get("raw_path") or not r.get("excerpt"):
            c["no_raw_or_excerpt"] += 1
            continue
        raw = raw_for(pk["raw_path"])
        found = raw.locate(r["excerpt"])
        if not found:
            c["LOCATOR_FAILED"] += 1
            continue
        s, e = r.get("start_line") or 0, r.get("end_line") or 0
        if s and e and found[0] >= s - 1 and found[1] <= e + 1:
            c["LOCATOR_VERIFIED"] += 1
        else:
            c["LOCATOR_RANGE_MISMATCH"] += 1
    return c


def print_kv(prefix: str, items: dict | Counter) -> None:
    for k in sorted(items, key=str):
        print(f"{prefix + '_' if prefix else ''}{str(k).upper()}={items[k]}")


def track_packets(name: str) -> None:
    d = RUN_ROOT / name
    packets = read_jsonl(d / "packets.jsonl")
    proposals = read_jsonl(d / "proposals.jsonl")
    reviews = flatten_reviews(d / "reviews.jsonl")
    reviewed_pids = {r.get("proposal_id") for r in reviews}
    all_props = [(pr.get("proposal_id") or pr.get("id"), pr) for p in proposals for pr in p.get("proposals", [])]
    print(f"[{name}]")
    print(f"PACKETS={len(packets)}")
    print(f"PACKETS_WITH_EXTRACT={len(proposals)}")
    print(f"PACKETS_WITHOUT_EXTRACT={len({p['id'] for p in packets} - {p['id'] for p in proposals})}")
    print_kv("EXTRACT_STATUS", Counter(p["status"] for p in proposals))
    print(f"PROPOSALS={len(all_props)}")
    print(f"EXCERPTS_DROPPED_UNLOCATABLE={sum(p.get('dropped', 0) for p in proposals)}")
    pending = [pid for pid, _ in all_props if pid not in reviewed_pids]
    print(f"REVIEW_PENDING={len(pending)}")
    print(f"REVIEWS={len(reviews)}")
    print_kv("REVIEW_STATUS", Counter(r["review_status"] for r in reviews))
    print_kv("EXTRACT_MODEL", Counter(p.get("model") for p in proposals if p.get("model")))
    print_kv("REVIEW_MODEL", Counter(r.get("reviewer_model") for r in reviews))
    print_kv("SOURCE", Counter(p["packet"]["source_id"] for p in proposals))
    if name == "hormozi":
        pages = set()
        for p in packets:
            a, b = p["pages"]
            pages.update((p["source_id"], n) for n in range(a, b + 1))
        print(f"PAGES_COVERED={len(pages)}")
    print_kv("", verify_locators(reviews))
    errs = read_jsonl(d / "proposals.errors.jsonl") + read_jsonl(d / "reviews.errors.jsonl")
    print(f"ERROR_RECORDS={len(errs)}")


def track_creators() -> None:
    d = RUN_ROOT / "creators"
    reviews = flatten_reviews(d / "reviews.jsonl")
    idx = read_jsonl(d / "sources_index.jsonl")
    print("[creators]")
    print(f"SOURCES_INDEXED={len(idx)}")
    print_kv("INDEX_ORIGINAL", Counter(i.get("original_kind") or i.get("kind") or "unknown" for i in idx))
    print(f"REVIEWS={len(reviews)}")
    print_kv("REVIEW_STATUS", Counter(r["review_status"] for r in reviews))
    print_kv("REVIEW_BASIS", Counter(r["packet"].get("review_basis", "unknown") for r in reviews))
    print_kv("REVIEW_MODEL", Counter(r.get("reviewer_model") for r in reviews))
    print_kv("SOURCE", Counter(r["packet"]["source_id"] for r in reviews))
    anchored = [r for r in reviews if r["packet"].get("review_basis") == "original_text"]
    print_kv("", verify_locators(anchored))
    print(f"ERROR_RECORDS={len(read_jsonl(d / 'reviews.errors.jsonl'))}")


def track_canonical() -> None:
    d = RUN_ROOT / "canonical"
    reviews = {r["rel"]: r for r in read_jsonl(d / "reviews.jsonl")}.values()
    print("[canonical]")
    print(f"PAGES_REVIEWED={len(reviews)}")
    print_kv("REVIEW_STATUS", Counter(r["review_status"] for r in reviews))
    print_kv("PROVENANCE", Counter(r["provenance_type"] for r in reviews))
    print_kv("REVIEW_MODEL", Counter(r["reviewer_model"] for r in reviews))
    print(f"WITH_RAW_REF={sum(1 for r in reviews if r.get('raw_refs'))}")
    print(f"ORIGINAL_VERIFIED={sum(1 for r in reviews if r.get('original_verified'))}")
    for name in ("materialize_report.json", "preview_report.json", "apply_report.json"):
        p = d / name
        if p.is_file():
            rows = json.loads(p.read_text())
            key = {"materialize_report.json": "written", "preview_report.json": "promotable", "apply_report.json": "applied"}[name]
            print(f"{name.split('.')[0].upper()}_{key.upper()}={sum(1 for r in rows if r.get(key))}/{len(rows)}")
            if key != "written":
                reasons = Counter()
                for r in rows:
                    if not r.get(key):
                        reasons[r["reason"].split("DENY")[-1].strip().split(":")[0][:40] or "unknown"] += 1
                print_kv("DENY", reasons)
    print(f"ERROR_RECORDS={len(read_jsonl(d / 'reviews.errors.jsonl'))}")


def track_frameworks() -> None:
    d = RUN_ROOT / "frameworks"
    props = read_jsonl(d / "proposals.jsonl")
    reg = {r["lesson_id"] for r in read_jsonl(RUN_ROOT / "lesson_registry.jsonl")}
    fws = [f for p in props for f in p["frameworks"]]
    cons = [c for p in props for c in p["contradictions"]]
    print("[frameworks]")
    print(f"TOPIC_PACKETS={len(props)}")
    print(f"FRAMEWORKS={len(fws)}")
    print(f"FRAMEWORKS_GE3_LESSONS={sum(1 for f in fws if len(f['underlying_lessons']) >= 3)}")
    print(f"UNRESOLVED_LESSON_REFS={sum(1 for f in fws for i in f['underlying_lessons'] if i not in reg)}")
    print(f"CONTRADICTIONS={len(cons)}")
    print_kv("FRAMEWORK_TYPE", Counter(f["framework_type"] for f in fws))
    print_kv("MODEL", Counter(p["model"] for p in props))
    print(f"LESSONS_IN_REGISTRY={len(reg)}")


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--track", default="all")
    args = ap.parse_args()
    tracks = ["hormozi", "originals", "creators", "canonical", "frameworks"] if args.track == "all" else [args.track]
    for t in tracks:
        if t in ("hormozi", "originals"):
            track_packets(t)
        elif t == "creators":
            track_creators()
        elif t == "canonical":
            track_canonical()
        elif t == "frameworks":
            track_frameworks()
        print()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
