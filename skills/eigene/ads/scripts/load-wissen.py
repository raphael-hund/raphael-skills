#!/usr/bin/env python3
"""Lädt Craft-Kern plus genau ein Markt-Segment.

Pflichtpfad lebt im Skill. Second Brain ist optional.

Segment-Reihenfolge:
  1. ads/references/maerkte/<segment>.md   (Skill, immer)
  2. wiki/craft/ads/maerkte/<segment>/     (Brain, nur wenn vorhanden)
  3. wiki/_candidates/maerkte/<segment>.md (Brain-Kandidat, nur wenn vorhanden)

Ohne Brain: Exit 0, BRAIN=skipped. Nie BLOCKED wegen fehlendem Wiki.
"""
from __future__ import annotations

import argparse
import os
import subprocess
import sys
from pathlib import Path

ADS_ROOT = Path(__file__).resolve().parents[1]
SKILLS = ADS_ROOT.parent
LOCAL_MAERKTE = ADS_ROOT / "references" / "maerkte"
DEFAULT_BRAIN = Path(os.environ.get("ADS_BRAIN", "/root/raphael-brain"))

SEGMENTS = (
    "agenturen-coaching",
    "local-service-handwerk",
    "b2b-dienstleister",
    "uebertragbar",
)

KUNDE_SEGMENT = {
    "make": "local-service-handwerk",
    "wilhelm": "local-service-handwerk",
    "sorglos": "local-service-handwerk",
    "evers": "agenturen-coaching",
    "default": "uebertragbar",
}

SKILL_KERN = {
    "ads": [
        "references/teil-icp.md",
        "references/teil-research.md",
        "references/teil-video.md",
        "references/teil-statics.md",
        "references/segment-map.md",
        "references/wissens-router.md",
        "references/zac-regan-startrunningads.md",
    ],
    "ads-research": [
        "references/angle-dossier-schema.md",
        "references/wissens-router.md",
        "references/skript-analyse.md",
    ],
    "ads-video": [
        "references/voice-dna-ads.md",
        "references/hook-formeln.md",
        "references/skript-architekturen.md",
        "references/strategien-taktiken.md",
    ],
    "ads-statics": [
        "references/visual-styles.md",
        "references/copy-bauformen.md",
        "references/brief-schema.md",
    ],
    "ads-copy": [
        "references/bauformen.md",
        "references/referenz-korpus.md",
    ],
}


def resolve_segment(kunde: str, segment: str | None) -> str:
    if segment:
        if segment not in SEGMENTS:
            raise SystemExit(f"unbekanntes Segment: {segment}")
        return segment
    key = (kunde or "").strip().lower()
    return KUNDE_SEGMENT.get(key, KUNDE_SEGMENT["default"])


def segment_path(seg: str, brain: Path | None) -> tuple[Path, str]:
    local = LOCAL_MAERKTE / f"{seg}.md"
    if local.is_file():
        return local, "skill"
    if brain is not None:
        approved = brain / "wiki/craft/ads/maerkte" / seg
        if approved.is_dir() and any(approved.rglob("*.md")):
            return approved, "approved"
        cand = brain / "wiki/_candidates/maerkte" / f"{seg}.md"
        if cand.is_file():
            return cand, "candidate"
        return cand, "missing"
    return local, "missing"


def run_kern_index(brain: Path | None) -> str:
    if brain is None:
        return "BRAIN=skipped  grund=--no-brain oder ADS_BRAIN leer"
    script = brain / "scripts/brain-context.py"
    if not script.is_file():
        return f"BRAIN=skipped  grund=kein brain-context.py unter {brain}"
    p = subprocess.run(
        [sys.executable, str(script), "index", "craft/ads"],
        capture_output=True,
        text=True,
    )
    if p.returncode != 0:
        err = (p.stderr or p.stdout or "").strip().splitlines()
        hint = err[-1] if err else f"exit {p.returncode}"
        return f"BRAIN=skipped  grund={hint}"
    return p.stdout


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--skill", required=True, choices=sorted(SKILL_KERN))
    ap.add_argument("--kunde", default="make")
    ap.add_argument("--segment", default=None, choices=SEGMENTS)
    ap.add_argument(
        "--no-brain",
        action="store_true",
        help="Second Brain nicht anfassen. Skill-references reichen.",
    )
    args = ap.parse_args()

    use_brain = not args.no_brain
    brain = DEFAULT_BRAIN if use_brain else None
    if use_brain and os.environ.get("ADS_BRAIN") == "":
        brain = None

    seg = resolve_segment(args.kunde, args.segment)
    path, status = segment_path(seg, brain)
    others = [s for s in SEGMENTS if s != seg]

    print(f"# load-wissen  skill={args.skill}  kunde={args.kunde}")
    print(f"SEGMENT={seg}")
    print(f"SEGMENT_STATUS={status}")
    print(f"SEGMENT_PATH={path}")
    print(f"ANDERE_SEGMENTE_NICHT_GELADEN={','.join(others)}")
    print(f"BRAIN={'on' if brain is not None else 'off'}")
    print()
    print("## Craft-Kern (Skill-references)")
    root = SKILLS / args.skill
    missing_kern = []
    for rel in SKILL_KERN[args.skill]:
        full = root / rel
        mark = "ok" if full.is_file() else "MISSING"
        if mark == "MISSING":
            missing_kern.append(str(full))
        print(f"- [{mark}] {full}")
    print()
    print("## Second Brain (optional)")
    print(run_kern_index(brain))
    print()
    print("## Genau ein Markt-Segment")
    if status == "missing":
        print(f"FAIL: Segmentdatei fehlt im Skill: {LOCAL_MAERKTE / (seg + '.md')}")
        return 2
    print(f"Geladen: {path} ({status})")
    if path.is_file():
        title = next(
            (
                ln[2:].strip()
                for ln in path.read_text(encoding="utf-8").splitlines()
                if ln.startswith("# ")
            ),
            path.name,
        )
        print(f"Titel: {title}")
    print()
    print("Nicht geladen:")
    for s in others:
        p2, st2 = segment_path(s, brain)
        print(f"- {s} ({st2}) {p2}")
    if missing_kern:
        print("FAIL: Craft-Kern fehlt:")
        for m in missing_kern:
            print(f"- {m}")
        return 2
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
