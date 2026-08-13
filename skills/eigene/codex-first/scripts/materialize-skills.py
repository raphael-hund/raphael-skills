#!/usr/bin/env python3
"""Materialize the registered Codex skill catalog into a flat runtime tree."""

from __future__ import annotations

import json
import shutil
import sys
from pathlib import Path


REPO = Path("/root/raphael-skills")
REGISTRY = REPO / "codex" / "compatibility.json"


def main() -> int:
    if len(sys.argv) != 2:
        print("usage: materialize-skills.py <destination>", file=sys.stderr)
        return 2

    destination = Path(sys.argv[1])
    destination.mkdir(parents=True, exist_ok=False)
    skills = json.loads(REGISTRY.read_text(encoding="utf-8"))["skills"]

    for name, entry in sorted(skills.items()):
        source_file = REPO / entry["source"]
        source_dir = source_file.parent
        target = destination / name
        shutil.copytree(source_dir, target, symlinks=False)

    print(f"Materialized {len(skills)} skills at {destination}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

