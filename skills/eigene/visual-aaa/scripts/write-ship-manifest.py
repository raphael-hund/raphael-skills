#!/usr/bin/env python3
"""Assemble visual-ship.json from render dir + g1 report + critics.json."""
from __future__ import annotations

import argparse
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path


_EVIDENCE_FILE = re.compile(r"\b[^\s,;]+\.(?:png|jpg|jpeg|webp)\b", re.IGNORECASE)
_EVIDENCE_REGION = re.compile(
    r"\b(?:region|oben|unten|links|rechts|mitte|top|bottom|left|right|center|zentral)\b",
    re.IGNORECASE,
)


def _critic_contract_ok(v: object) -> bool:
    if not isinstance(v, dict):
        return False
    required = ("verdict", "biggest_gap", "beleg", "confidence")
    if any(not isinstance(v.get(k), str) or not v[k].strip() for k in required):
        return False
    beleg = v["beleg"]
    if len(beleg.split()) < 4 or not _EVIDENCE_FILE.search(beleg) or not _EVIDENCE_REGION.search(beleg):
        return False
    if v["verdict"] == "pass":
        return v["confidence"] == "HIGH" and v["biggest_gap"] == "none"
    return v["verdict"] == "fail" and v["confidence"] in {"HIGH", "MED", "LOW"} and v["biggest_gap"] != "none"


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", required=True)
    ap.add_argument("--render-dir", required=True)
    ap.add_argument("--g1", required=True)
    ap.add_argument("--critics", required=True)
    ap.add_argument("--self-read", default="false")
    ap.add_argument("--self-read-notes", default="")
    ap.add_argument("--project", default="")
    ap.add_argument("--version-label", default="")
    ap.add_argument("--acceptance", default=None, help="optional acceptance_checks.json")
    args = ap.parse_args()

    render_dir = Path(args.render_dir)
    g1 = json.loads(Path(args.g1).read_text())
    critics = json.loads(Path(args.critics).read_text())
    if isinstance(critics, dict) and "verdicts" in critics:
        verdicts = critics["verdicts"]
    elif isinstance(critics, list):
        verdicts = critics
    else:
        print("FATAL: critics must be list or {verdicts:[]}", file=sys.stderr)
        return 2

    pages = []
    for png in sorted(render_dir.glob("*.png")):
        pages.append(
            {
                "id": png.stem,
                "render": str(png.resolve()),
                "source": "",
            }
        )

    acceptance = []
    if args.acceptance:
        acceptance = json.loads(Path(args.acceptance).read_text())
        if isinstance(acceptance, dict):
            acceptance = acceptance.get("checks", [])

    self_read = str(args.self_read).lower() in ("1", "true", "yes")
    g1_exit = 0 if g1.get("ok") else 1

    # ok computation (same rules as validate)
    ok = self_read and g1_exit == 0 and len(pages) > 0
    # Every critic record must satisfy the exact four-field contract.
    if not verdicts or any(not _critic_contract_ok(v) for v in verdicts):
        ok = False

    # latest pass HIGH per page
    by_page: dict[str, list] = {}
    for v in verdicts:
        if isinstance(v, dict):
            by_page.setdefault(v.get("page_id", ""), []).append(v)
    for p in pages:
        vs = by_page.get(p["id"], [])
        if not vs:
            ok = False
            break
        best = sorted(vs, key=lambda x: x.get("round", 0))[-1]
        if best.get("verdict") != "pass" or best.get("confidence") != "HIGH":
            ok = False
            break
    for c in acceptance:
        if c.get("status") != "pass":
            ok = False

    manifest = {
        "schema": "visual-aaa/ship/v1",
        "ok": ok,
        "project": args.project,
        "version_label": args.version_label,
        "created_at": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "self_read": self_read,
        "self_read_notes": args.self_read_notes,
        "g1_exit": g1_exit,
        "g1_report": str(Path(args.g1).resolve()),
        "pages": pages,
        "critic_verdicts": verdicts,
        "acceptance_checks": acceptance,
    }
    out = Path(args.out)
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n")
    print(f"wrote {out} ok={ok}")
    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main())
