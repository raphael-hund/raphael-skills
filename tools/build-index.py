#!/usr/bin/env python3
"""build-index.py — dependency-free index.json generator.

Scannt alle skills/**/SKILL.md und schreibt eine deterministische Registry
nach index.json im Repo-Root: name, version, pfad (repo-relativ), description
je Skill. Nutzt denselben Frontmatter-Parser wie validate-skill.py (kein
PyYAML, keine Netzabhaengigkeit).

Usage:
    python3 tools/build-index.py            # schreibt index.json
    python3 tools/build-index.py --check    # prueft nur, ob index.json aktuell ist (CI/pre-commit)
"""
from __future__ import annotations

import importlib.util
import json
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent


def _load_validator():
    """validate-skill.py hat einen Bindestrich im Dateinamen -> kein normaler
    'import', daher ueber importlib per Dateipfad laden (weiterhin 0 externe
    Abhaengigkeiten, nur stdlib)."""
    spec = importlib.util.spec_from_file_location(
        "validate_skill", Path(__file__).resolve().parent / "validate-skill.py"
    )
    module = importlib.util.module_from_spec(spec)
    assert spec.loader is not None
    spec.loader.exec_module(module)
    return module


_validator = _load_validator()
extract_frontmatter = _validator.extract_frontmatter
parse_top_level_keys = _validator.parse_top_level_keys
validate_skill_file = _validator.validate_skill_file


def build_entry(path: Path) -> dict:
    text = path.read_text(encoding="utf-8")
    fm_lines = extract_frontmatter(text) or []
    fields = parse_top_level_keys(fm_lines)
    rel_path = path.relative_to(REPO_ROOT).as_posix()
    return {
        "name": fields.get("name", {}).get("raw", "").strip(),
        "version": fields.get("version", {}).get("raw", "").strip(),
        "path": rel_path,
        "description": fields.get("description", {}).get("raw", "").strip(),
    }


def main(argv: list[str]) -> int:
    check_only = "--check" in argv[1:]

    skills_dir = REPO_ROOT / "skills"
    skill_files = sorted(skills_dir.rglob("SKILL.md"))

    # Nicht in den Index aufnehmen, was nicht valide ist — validate-skill.py
    # ist die Quelle der Wahrheit fuer "gueltiger Skill".
    invalid = [validate_skill_file(f) for f in skill_files]
    invalid = [sf for sf in invalid if not sf.ok]
    if invalid:
        print("build-index abgebrochen — folgende SKILL.md sind ungueltig:")
        for sf in invalid:
            print(f"  {sf.path}: {'; '.join(sf.errors)}")
        return 1

    entries = [build_entry(f) for f in skill_files]
    entries.sort(key=lambda e: e["path"])

    registry = {
        "generated_by": "tools/build-index.py",
        "skill_count": len(entries),
        "skills": entries,
    }
    new_content = json.dumps(registry, indent=2, ensure_ascii=False, sort_keys=False) + "\n"

    index_path = REPO_ROOT / "index.json"

    if check_only:
        old_content = index_path.read_text(encoding="utf-8") if index_path.exists() else ""
        if old_content != new_content:
            print("index.json ist veraltet — 'python3 tools/build-index.py' laufen lassen.")
            return 1
        print(f"index.json aktuell ({len(entries)} Skills).")
        return 0

    index_path.write_text(new_content, encoding="utf-8")
    print(f"index.json geschrieben ({len(entries)} Skills).")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
