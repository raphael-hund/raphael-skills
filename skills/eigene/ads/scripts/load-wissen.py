#!/usr/bin/env python3
"""Lädt den lokalen Wissenseinstieg plus genau ein Markt-Segment.

Alle Quellen liegen im Skill. ADS_BRAIN wird nicht ausgewertet;
--no-brain bleibt für bestehende Aufrufe als wirkungsloser Schalter erhalten.
"""
from __future__ import annotations

import argparse
from pathlib import Path

ADS_ROOT = Path(__file__).resolve().parents[1]
LOCAL_MAERKTE = ADS_ROOT / "references" / "maerkte"

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
        "references/wissen/index.md",
        "references/wissen/leadgen-betriebsmodell.md",
        "references/segment-map.md",
    ],
    "ads-research": [
        "references/teil-research.md",
        "references/craft/dossier-schema.md",
        "references/craft/referenzkatalog.md",
    ],
    "ads-video": [
        "references/teil-video.md",
        "references/craft/video.md",
        "references/video-produktion.md",
    ],
    "ads-statics": [
        "references/teil-statics.md",
        "references/craft/statics.md",
        "references/craft/referenzkatalog.md",
    ],
    "ads-copy": [
        "references/craft/video.md",
        "references/craft/statics.md",
        "references/craft/referenzkatalog.md",
    ],
}


def resolve_segment(kunde: str, segment: str | None) -> str:
    if segment:
        if segment not in SEGMENTS:
            raise SystemExit(f"unbekanntes Segment: {segment}")
        return segment
    key = (kunde or "").strip().lower()
    return KUNDE_SEGMENT.get(key, KUNDE_SEGMENT["default"])


def segment_path(seg: str) -> tuple[Path, str]:
    local = LOCAL_MAERKTE / f"{seg}.md"
    if local.is_file():
        return local, "skill"
    return local, "missing"


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--skill", required=True, choices=sorted(SKILL_KERN))
    ap.add_argument("--kunde", default="")
    ap.add_argument("--segment", default=None, choices=SEGMENTS)
    ap.add_argument(
        "--no-brain",
        action="store_true",
        help="Kompatibilitätsschalter; Wissen wird immer ausschließlich lokal geladen.",
    )
    args = ap.parse_args()

    seg = resolve_segment(args.kunde, args.segment)
    path, status = segment_path(seg)
    others = [s for s in SEGMENTS if s != seg]

    print(f"# load-wissen  skill={args.skill}  kunde={args.kunde}")
    print(f"SEGMENT={seg}")
    print(f"SEGMENT_STATUS={status}")
    print(f"SEGMENT_PATH={path}")
    print(f"ANDERE_SEGMENTE_NICHT_GELADEN={','.join(others)}")
    print("WISSEN=skill-local")
    print("BRAIN=off")
    print()
    print("## Craft-Kern (Skill-references)")
    missing_kern = []
    for rel in SKILL_KERN[args.skill]:
        full = ADS_ROOT / rel
        mark = "ok" if full.is_file() else "MISSING"
        if mark == "MISSING":
            missing_kern.append(str(full))
        print(f"- [{mark}] {full}")
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
        p2, st2 = segment_path(s)
        print(f"- {s} ({st2}) {p2}")
    if missing_kern:
        print("FAIL: Craft-Kern fehlt:")
        for m in missing_kern:
            print(f"- {m}")
        return 2
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
