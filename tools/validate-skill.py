#!/usr/bin/env python3
"""validate-skill.py — dependency-free SKILL.md frontmatter linter.

Prueft, dass jede SKILL.md ein YAML-Frontmatter mit den Pflichtfeldern
`name`, `version`, `description`, `completion_criteria` hat und dass diese
nicht leer sind. Nutzt NUR die Python-Standardbibliothek (kein PyYAML, kein
Netz) — laeuft ueberall, auch im pre-commit-Hook, ohne Installationsschritt.

Usage:
    python3 tools/validate-skill.py                # scannt skills/ ab Repo-Root
    python3 tools/validate-skill.py <pfad> [...]    # scannt gegebene Pfade/Dateien

Exit-Code 0 = alle SKILL.md gueltig. Exit-Code 1 = mindestens ein Fehler.
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

REQUIRED_FIELDS = ["name", "version", "description", "completion_criteria"]
SEMVER_RE = re.compile(r"^\d+\.\d+\.\d+$")
NAME_RE = re.compile(r"^[a-z][a-z0-9-]*$")
TOP_KEY_RE = re.compile(r"^([A-Za-z_][A-Za-z0-9_]*):\s*(.*)$")

# Regel 19 (Fable-Gotcha): Judge-/Verifier-Prompts sollen "pass/fail mit
# eingefuegtem Beweis" verlangen, nie "erklaere deinen Gedankengang" —
# solche Phrasen koennen bei Fable eine reasoning_extraction-Refusal ausloesen.
REASONING_EXTRACTION_PHRASES = [
    "explain your thinking",
    "show your work",
    "erklaere deinen gedankengang",
    "erkläre deinen gedankengang",
    "zeig deine gedanken",
]


class SkillFile:
    def __init__(self, path: Path):
        self.path = path
        self.errors: list[str] = []
        self.warnings: list[str] = []
        self.fields: dict[str, str] = {}

    def fail(self, msg: str) -> None:
        self.errors.append(msg)

    def warn(self, msg: str) -> None:
        self.warnings.append(msg)

    @property
    def ok(self) -> bool:
        return not self.errors


def extract_frontmatter(text: str) -> list[str] | None:
    """Returns the raw frontmatter lines (between the first two '---' lines),
    or None if the file has no frontmatter starting on line 1."""
    lines = text.splitlines()
    if not lines or lines[0].strip() != "---":
        return None
    for i in range(1, len(lines)):
        if lines[i].strip() == "---":
            return lines[1:i]
    return None  # opening '---' but no closing '---'


def parse_top_level_keys(fm_lines: list[str]) -> dict[str, dict]:
    """Very small YAML-subset parser: only cares about top-level (col-0) keys
    and whether each has a non-empty scalar, non-empty block scalar (>, |),
    non-empty inline list ([...]), or non-empty '- item' block list below it.
    Returns {key: {"raw": str, "nonempty": bool}}.
    """
    result: dict[str, dict] = {}
    i = 0
    n = len(fm_lines)
    while i < n:
        line = fm_lines[i]
        if not line.strip() or line.strip().startswith("#"):
            i += 1
            continue
        m = TOP_KEY_RE.match(line)
        if not m:
            i += 1
            continue
        key, inline_val = m.group(1), m.group(2).strip()
        i += 1
        nonempty = False
        is_block_indicator = inline_val in (">", "|", ">-", "|-", "")
        raw_parts = [] if is_block_indicator else ([inline_val] if inline_val else [])

        if is_block_indicator:
            # possible block scalar or block list on following indented lines
            block_lines = []
            while i < n and (fm_lines[i].startswith(" ") or fm_lines[i].startswith("\t") or not fm_lines[i].strip()):
                block_lines.append(fm_lines[i])
                i += 1
            stripped_block = [b.strip() for b in block_lines if b.strip()]
            if stripped_block:
                nonempty = True
                raw_parts.extend(stripped_block)
        elif inline_val.startswith("[") :
            # inline list e.g. [] or [a, b]
            inner = inline_val.strip()[1:-1].strip() if inline_val.strip().endswith("]") else inline_val
            nonempty = bool(inner)
        else:
            nonempty = bool(inline_val) and inline_val not in ("null", "~")

        result[key] = {"raw": " ".join(raw_parts), "nonempty": nonempty}
    return result


def validate_skill_file(path: Path) -> SkillFile:
    sf = SkillFile(path)
    try:
        text = path.read_text(encoding="utf-8")
    except Exception as e:  # pragma: no cover
        sf.fail(f"Datei nicht lesbar: {e}")
        return sf

    fm_lines = extract_frontmatter(text)
    if fm_lines is None:
        sf.fail("Kein YAML-Frontmatter gefunden (Datei muss mit '---' beginnen und ein zweites '---' haben)")
        return sf

    fields = parse_top_level_keys(fm_lines)
    sf.fields = {k: v["raw"] for k, v in fields.items()}

    for req in REQUIRED_FIELDS:
        if req not in fields:
            sf.fail(f"Pflichtfeld fehlt: {req}")
        elif not fields[req]["nonempty"]:
            sf.fail(f"Pflichtfeld leer: {req}")

    if "version" in fields and fields["version"]["nonempty"]:
        v = fields["version"]["raw"].strip()
        if not SEMVER_RE.match(v):
            sf.fail(f"version '{v}' ist kein semver (erwartet x.y.z)")

    if "name" in fields and fields["name"]["nonempty"]:
        nm = fields["name"]["raw"].strip()
        if not NAME_RE.match(nm):
            sf.fail(f"name '{nm}' passt nicht auf ^[a-z][a-z0-9-]*$")

    # completion_criteria sollte als Liste vorliegen (mind. ein '- ' Eintrag),
    # nicht nur ein Freitext-Satz — sonst ist "fertig" keine pruefbare Tatsache.
    if "completion_criteria" in fields and fields["completion_criteria"]["nonempty"]:
        raw = fields["completion_criteria"]["raw"]
        if "-" not in raw and not raw.strip().startswith("["):
            sf.warn("completion_criteria sieht nicht wie eine Liste aus (kein '- ' gefunden) — pruefbare Einzelkriterien empfohlen")

    # Regel 19 Lint-Warnung (kein Block, siehe AGENTS.md Regel 19 / Masterplan Z.115)
    lower_text = text.lower()
    for phrase in REASONING_EXTRACTION_PHRASES:
        if phrase in lower_text:
            sf.warn(f"enthaelt reasoning-extraction-Trigger-Phrase '{phrase}' (Fable-Gotcha, Regel 19) — kann stillen Fallback auf Opus ausloesen")

    return sf


def find_skill_files(paths: list[str]) -> list[Path]:
    if not paths:
        repo_root = Path(__file__).resolve().parent.parent
        paths = [str(repo_root / "skills")]
    files: list[Path] = []
    for p in paths:
        pp = Path(p)
        if pp.is_file() and pp.name == "SKILL.md":
            files.append(pp)
        elif pp.is_dir():
            files.extend(sorted(pp.rglob("SKILL.md")))
    return sorted(set(files))


def main(argv: list[str]) -> int:
    files = find_skill_files(argv[1:])
    if not files:
        print("Keine SKILL.md gefunden.")
        return 1

    any_error = False
    any_warning = False
    for path in files:
        sf = validate_skill_file(path)
        rel = path
        if sf.ok:
            status = "OK  "
        else:
            status = "FAIL"
            any_error = True
        print(f"[{status}] {rel}")
        for e in sf.errors:
            print(f"        error:   {e}")
        for w in sf.warnings:
            print(f"        warning: {w}")
            any_warning = True

    print()
    print(f"{len(files)} SKILL.md geprueft — {'FEHLER' if any_error else 'alle gueltig'}"
          + (", Warnungen vorhanden" if any_warning and not any_error else ""))
    return 1 if any_error else 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
