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
validate_skill_file = _validator.validate_skill_file
scalar_value = _validator._scalar_value


def build_entry(path: Path) -> dict:
    skill = validate_skill_file(path)
    if not skill.ok:
        raise ValueError(f"invalid skill {path}: {'; '.join(skill.errors)}")
    fields = skill.fields
    rel_path = path.relative_to(REPO_ROOT).as_posix()
    return {
        "name": scalar_value(fields.get("name", "")),
        "version": scalar_value(fields.get("version", "")),
        "path": rel_path,
        "description": fields.get("description", "").strip(),
    }


def discover_skill_files(*roots: Path) -> list[Path]:
    skill_files = []
    for root in roots:
        for path in root.rglob("SKILL.md"):
            parts = path.relative_to(root).parts
            if "_candidates" in parts or "_archiv" in parts:
                continue
            if any(part.startswith("_restored-") for part in parts):
                continue
            if any(part in {"resources", "vendor"} for part in parts[:-1]):
                continue
            skill_files.append(path)
    return sorted(skill_files)


def main(argv: list[str]) -> int:
    check_only = "--check" in argv[1:]

    skill_roots = [REPO_ROOT / "skills", REPO_ROOT / "vendor-packs"]
    skill_files = discover_skill_files(*skill_roots)

    # Nicht in den Index aufnehmen, was nicht valide ist — validate-skill.py
    # ist die Quelle der Wahrheit fuer "gueltiger Skill".
    #
    # Eigene Skills (skills/eigene, skills/methodik, skills/design) muessen
    # valide sein, sonst bricht der Lauf ab. Importierte Fremd-Skills
    # (skills/imported/...) erfuellen unser Frontmatter-Schema oft nicht — die
    # werden uebersprungen statt den ganzen Index zu blockieren.
    #
    # Grund (2026-08-13): Vorher blockierte EIN ungueltiger Fremd-Skill den
    # kompletten Schreibvorgang. index.json stand dadurch seit dem 10.08. still,
    # waehrend eigene Skills weiterliefen — der Index log stillschweigend
    # veraltete Versionen.
    def ist_eigen(p) -> bool:
        return "imported" not in p.parts

    validiert = [(f, validate_skill_file(f)) for f in skill_files]

    eigene_kaputt = [sf for f, sf in validiert if not sf.ok and ist_eigen(f)]
    if eigene_kaputt:
        print("build-index abgebrochen — eigene SKILL.md sind ungueltig:")
        for sf in eigene_kaputt:
            print(f"  {sf.path}: {'; '.join(sf.errors)}")
        return 1

    fremd_kaputt = [f for f, sf in validiert if not sf.ok and not ist_eigen(f)]
    if fremd_kaputt:
        print(f"uebersprungen: {len(fremd_kaputt)} importierte SKILL.md ohne gueltiges Frontmatter")

    gueltige = [f for f, sf in validiert if sf.ok]
    entries = [build_entry(f) for f in gueltige]
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
