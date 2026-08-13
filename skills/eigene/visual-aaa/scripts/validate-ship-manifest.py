#!/usr/bin/env python3
"""validate-ship-manifest.py — Exit 0 only if visual-ship.json is ship-ready."""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path


_VERDICTS = {"pass", "fail"}
_CONFIDENCE = {"HIGH", "MED", "LOW"}
_PLACEHOLDER = re.compile(r"<[^>]+>|…|TODO|TBD", re.IGNORECASE)
_EVIDENCE_FILE = re.compile(r"\b[^\s,;]+\.(?:png|jpg|jpeg|webp)\b", re.IGNORECASE)
_EVIDENCE_REGION = re.compile(
    r"\b(?:region|oben|unten|links|rechts|mitte|top|bottom|left|right|center|zentral)\b",
    re.IGNORECASE,
)


def _critic_errors(v: object, index: int) -> list[str]:
    if not isinstance(v, dict):
        return [f"critic[{index}] must be an object"]
    errs: list[str] = []
    prefix = f"critic[{index}]"
    for key in ("verdict", "biggest_gap", "beleg", "confidence"):
        if not isinstance(v.get(key), str) or not v[key].strip():
            errs.append(f"{prefix}.{key} must be a non-empty string")
    verdict = v.get("verdict")
    confidence = v.get("confidence")
    gap = v.get("biggest_gap")
    beleg = v.get("beleg")
    if verdict not in _VERDICTS:
        errs.append(f"{prefix}.verdict must be pass or fail")
    if confidence not in _CONFIDENCE:
        errs.append(f"{prefix}.confidence must be HIGH, MED, or LOW")
    if isinstance(beleg, str) and (
        _PLACEHOLDER.search(beleg)
        or len(beleg.split()) < 4
        or not _EVIDENCE_FILE.search(beleg)
        or not _EVIDENCE_REGION.search(beleg)
    ):
        errs.append(f"{prefix}.beleg must name an observed PNG, region, and visible fact")
    if verdict == "pass":
        if confidence != "HIGH":
            errs.append(f"{prefix}: pass requires confidence HIGH")
        if gap != "none":
            errs.append(f"{prefix}: pass requires biggest_gap=none")
    elif verdict == "fail" and gap == "none":
        errs.append(f"{prefix}: fail requires one concrete biggest_gap")
    return errs


def main() -> int:
    if len(sys.argv) != 2:
        print("Usage: validate-ship-manifest.py <visual-ship.json>", file=sys.stderr)
        return 2
    path = Path(sys.argv[1])
    if not path.is_file():
        print(f"FATAL: missing {path}", file=sys.stderr)
        return 2
    m = json.loads(path.read_text())
    errs: list[str] = []

    if m.get("schema") != "visual-aaa/ship/v1":
        errs.append("schema must be visual-aaa/ship/v1")
    if m.get("ok") is not True:
        errs.append("ok must be true")
    if m.get("self_read") is not True:
        errs.append("self_read must be true")
    if m.get("g1_exit") != 0:
        errs.append(f"g1_exit must be 0 (got {m.get('g1_exit')})")

    pages = m.get("pages") or []
    if not pages:
        errs.append("pages empty")

    for p in pages:
        r = Path(p.get("render", ""))
        if not r.is_file():
            errs.append(f"missing render: {r}")
        elif r.stat().st_size < 10_000:
            errs.append(f"tiny render: {r} ({r.stat().st_size} bytes)")

    verdicts = m.get("critic_verdicts") or []
    if not isinstance(verdicts, list) or not verdicts:
        errs.append("critic_verdicts must be a non-empty list")
        verdicts = []
    by_page: dict[str, list] = {}
    for i, v in enumerate(verdicts):
        errs.extend(_critic_errors(v, i))
        if isinstance(v, dict):
            by_page.setdefault(v.get("page_id", ""), []).append(v)

    for p in pages:
        pid = p.get("id")
        vs = sorted(by_page.get(pid, []), key=lambda x: x.get("round", 0))
        if not vs:
            errs.append(f"no critic verdict for page {pid}")
            continue
        best = vs[-1]
        if best.get("verdict") != "pass":
            errs.append(f"latest verdict not pass for {pid}: {best.get('verdict')}")
        if best.get("confidence") != "HIGH":
            errs.append(f"latest confidence not HIGH for {pid}: {best.get('confidence')}")

    for c in m.get("acceptance_checks") or []:
        if c.get("status") != "pass":
            errs.append(f"acceptance open/fail: {c.get('id')}={c.get('status')}")

    if errs:
        print(f"SHIP INVALID — {len(errs)} error(s)")
        for e in errs:
            print(f"  - {e}")
        return 1
    print("SHIP VALID")
    return 0


if __name__ == "__main__":
    sys.exit(main())
