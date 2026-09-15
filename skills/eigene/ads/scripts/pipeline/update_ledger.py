#!/usr/bin/env python3
"""Append measured review stages to the Ads source processing ledger.

The ledger is JSONL under raw/evidence (append-only). One line per source is
appended with the stage values measured from this run; later lines win when
the audit reads the ledger. Nothing is rewritten. Run with --dry-run first.
"""
from __future__ import annotations

import argparse
import json
import subprocess
import sys
from collections import Counter, defaultdict
from pathlib import Path

from common import BRAIN_ROOT, RUN_DATE, RUN_ROOT, read_jsonl

LEDGER_REL = "raw/evidence/ads-source-processing-ledger-2026-09-12.jsonl"
HORMOZI = ("HORMOZI-100M-OFFERS", "HORMOZI-100M-LEADS", "HORMOZI-MONEY-MODELS")


def flatten(path: Path) -> list[dict]:
    out = []
    for top in read_jsonl(path):
        for pkt in (top["packets"] if top.get("batch") else [top]):
            for rev in pkt.get("reviews", []):
                out.append({**rev, "packet": pkt["packet"]})
    return out


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    per_source: dict[str, Counter] = defaultdict(Counter)
    basis: dict[str, Counter] = defaultdict(Counter)
    for track in ("hormozi", "originals", "creators"):
        for r in flatten(RUN_ROOT / track / "reviews.jsonl"):
            sid = r["packet"]["source_id"]
            per_source[sid][r["review_status"]] += 1
            per_source[sid]["track_" + track] += 1
            basis[sid][r["packet"].get("review_basis", "original_text")] += 1
    # pending = proposals without review (hormozi/originals only)
    for track in ("hormozi", "originals"):
        reviewed = {r.get("proposal_id") for r in flatten(RUN_ROOT / track / "reviews.jsonl")}
        for p in read_jsonl(RUN_ROOT / track / "proposals.jsonl"):
            for pr in p.get("proposals", []):
                if pr["proposal_id"] not in reviewed:
                    per_source[p["packet"]["source_id"]]["pending"] += 1
    registry = Counter(r["source_id"] for r in read_jsonl(RUN_ROOT / "lesson_registry.jsonl"))

    existing = {}
    for line in (BRAIN_ROOT / LEDGER_REL).read_text(encoding="utf-8").splitlines():
        if line.strip():
            item = json.loads(line)
            existing[item["source_id"]] = item

    lines = []
    for sid, c in sorted(per_source.items()):
        base = dict(existing.get(sid, {"source_id": sid, "source_tier": "tier_1" if sid in HORMOZI else "tier_2"}))
        total = c["astra_reviewed"] + c["rejected"] + c["review_unavailable"]
        if c["pending"]:
            reviewed = "partial"
        elif c["review_unavailable"] and not c["astra_reviewed"]:
            reviewed = "partial"  # only paraphrase reviews, no original read
        elif total:
            reviewed = "complete" if not c["review_unavailable"] else "partial"
        else:
            reviewed = base.get("reviewed", "pending")
        base.update({
            "accessed": "complete" if basis[sid]["original_text"] else base.get("accessed", "partial"),
            "extracted": "complete" if c["track_hormozi"] or c["track_originals"] else base.get("extracted", "partial"),
            "located": "complete" if basis[sid]["original_text"] else base.get("located", "partial"),
            "normalized": "complete" if registry[sid] else base.get("normalized", "partial"),
            "reviewed": reviewed,
            "promoted": "pending",
            "review_astra_reviewed": c["astra_reviewed"],
            "review_rejected": c["rejected"],
            "review_unavailable": c["review_unavailable"],
            "review_pending": c["pending"],
            "review_basis_original_text": basis[sid]["original_text"],
            "review_basis_paraphrase": basis[sid]["paraphrase"],
            "candidates_written": registry[sid],
            "reviewed_at": RUN_DATE,
            "evidence": f"/root/skill-workspace/audits/2026-09-13/run/ (reviews.jsonl je Track; stats.py --track all) und wiki/_candidates/ads/review-{RUN_DATE}/",
            "note": "Review = Modell-Lesung des Originalausschnitts (Astra/Fable/Opus rotierend); review_unavailable = nur Lern-Register ohne lokales Original. Kein Performance-Beweis.",
        })
        lines.append(json.dumps(base, ensure_ascii=False))
    payload = "\n".join(lines) + "\n"
    if args.dry_run:
        print(payload)
        return 0
    proc = subprocess.run([sys.executable, str(BRAIN_ROOT / "scripts/brain-write.py"), "--root", str(BRAIN_ROOT), "append", "--path", LEDGER_REL],
                          input=payload.encode("utf-8"), capture_output=True)
    print((proc.stdout + proc.stderr).decode().strip())
    print(f"LEDGER_APPENDED={len(lines)}")
    return proc.returncode


if __name__ == "__main__":
    raise SystemExit(main())
