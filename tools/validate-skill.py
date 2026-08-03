#!/usr/bin/env python3
"""validate-skill.py — dependency-free SKILL.md frontmatter linter.

Prueft das bestehende Raphael-Frontmatter oder das portable Agent-Skills-
Frontmatter (`name`, `description`, string-valued `metadata`). Portable
Raphael-Felder werden aus namespaced Metadata normalisiert, sodass Index und
Abhaengigkeitspruefung fuer beide Formen denselben Vertrag sehen.
Die Werte von class/scope/sensitivity werden weich geprueft (unbekannt = nur
Warnung), empfohlene Felder fehlen = nur Warnung. Nutzt NUR die Python-
Standardbibliothek (kein PyYAML, kein Netz) — laeuft ueberall, auch im
pre-commit-Hook, ohne Installationsschritt.

Usage:
    python3 tools/validate-skill.py                # scannt skills/ ab Repo-Root
    python3 tools/validate-skill.py <pfad> [...]    # scannt gegebene Pfade/Dateien

Exit-Code 0 = alle SKILL.md gueltig. Exit-Code 1 = mindestens ein Fehler.
"""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

# Pflichtfelder laut v5-Plan 9.1: name, version, description, class, scope,
# sensitivity, completion_criteria. class/scope/sensitivity wurden additiv
# ergaenzt — alle bestehenden Skills fuehren sie bereits, keiner wird rot.
REQUIRED_FIELDS = [
    "name",
    "version",
    "description",
    "class",
    "scope",
    "sensitivity",
    "completion_criteria",
]
# Empfohlen laut v5-Plan 9.1: fehlt nur eine Warnung, nie rot.
RECOMMENDED_FIELDS = ["provenance", "eval_scorecard", "expires", "loads", "requires_skills"]

SEMVER_RE = re.compile(r"^\d+\.\d+\.\d+$")
NAME_RE = re.compile(r"^[a-z][a-z0-9-]*$")
TOP_KEY_RE = re.compile(r"^([A-Za-z_][A-Za-z0-9_]*):\s*(.*)$")
METADATA_KEY_RE = re.compile(r"^\s+([A-Za-z0-9][A-Za-z0-9_-]*):\s*(.*)$")
PORTABLE_TOP_LEVEL_FIELDS = {"name", "description", "metadata"}
PORTABLE_METADATA_FIELDS = {
    "raphael-version": "version",
    "raphael-class": "class",
    "raphael-scope": "scope",
    "raphael-sensitivity": "sensitivity",
    "raphael-loads": "loads",
    "raphael-requires-skills": "requires_skills",
    "raphael-completion-criteria": "completion_criteria",
}
PORTABLE_JSON_LIST_FIELDS = {
    "raphael-loads",
    "raphael-requires-skills",
    "raphael-completion-criteria",
}
LOCAL_RESOURCE_RE = re.compile(
    r"(?<![A-Za-z0-9_./-])((?:references|scripts|assets)/[A-Za-z0-9._@/+:-]+)"
)
REPO_RESOURCE_RE = re.compile(r"(/root/raphael-skills/[A-Za-z0-9._@/+:-]+)")

# Erlaubte Werte fuer die leichten Label-Felder. Unbekannte Werte geben nur
# eine WARNUNG (nicht rot), damit aeltere Skills gruen bleiben (additive Haertung).
CLASS_VALUES = {"R", "M", "F", "O", "E", "W", "G"}  # Router·Methodik·Fulfillment·Orchestrierung·Eval·Wissen·Governance
SENSITIVITY_VALUES = {"public", "internal", "client-confidential", "secret"}
SCOPE_SIMPLE_VALUES = {"global", "agency"}  # zusaetzlich erlaubt: client:<slug> | project:<slug>


def _scalar_value(raw: str) -> str:
    """Nimmt den Roh-Wert eines Skalar-Feldes und entfernt einen YAML-Inline-
    Kommentar (' # ...') sowie umschliessende Anfuehrungszeichen, damit
    Enum-Vergleiche auf 'M # Kommentar' oder '\"agency\"' funktionieren."""
    val = raw.split(" #", 1)[0].strip()
    if len(val) >= 2 and val[0] == val[-1] and val[0] in ("'", '"'):
        val = val[1:-1].strip()
    return val

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


def _parse_quoted_metadata_scalar(raw: str) -> tuple[str | None, str | None]:
    value = raw.strip()
    if len(value) < 2 or value[0] != value[-1] or value[0] not in ("'", '"'):
        return None, "muss ein gequoteter String sein"
    if value[0] == "'":
        return value[1:-1].replace("''", "'"), None
    try:
        parsed = json.loads(value)
    except json.JSONDecodeError as exc:
        return None, f"ungueltiger gequoteter String: {exc}"
    if not isinstance(parsed, str):
        return None, "muss ein String sein"
    return parsed, None


def parse_metadata_strings(fm_lines: list[str]) -> tuple[dict[str, str], list[str]]:
    values: dict[str, str] = {}
    errors: list[str] = []
    metadata_line: int | None = None
    for index, line in enumerate(fm_lines):
        if re.match(r"^metadata:\s*$", line):
            metadata_line = index
            break
    if metadata_line is None:
        return values, errors

    for line in fm_lines[metadata_line + 1:]:
        if line and not line[0].isspace():
            break
        if not line.strip() or line.lstrip().startswith("#"):
            continue
        match = METADATA_KEY_RE.match(line)
        if match is None:
            errors.append(f"metadata-Zeile nicht als String-Feld lesbar: {line.strip()!r}")
            continue
        key, raw = match.groups()
        if key in values:
            errors.append(f"metadata-Schluessel doppelt: {key}")
            continue
        parsed, error = _parse_quoted_metadata_scalar(raw)
        if error is not None:
            errors.append(f"metadata.{key} {error}")
            continue
        assert parsed is not None
        values[key] = parsed
    return values, errors


def _json_string_list(value: str, label: str, sf: SkillFile) -> list[str]:
    try:
        parsed = json.loads(value)
    except json.JSONDecodeError as exc:
        sf.fail(f"metadata.{label} ist kein gueltiges JSON-Array: {exc}")
        return []
    if not isinstance(parsed, list) or any(not isinstance(item, str) or not item for item in parsed):
        sf.fail(f"metadata.{label} muss ein JSON-Array aus nicht-leeren Strings sein")
        return []
    return parsed


def _validate_portable_resources(
    path: Path,
    text: str,
    metadata: dict[str, str],
    sf: SkillFile,
) -> None:
    repo_root = Path(__file__).resolve().parent.parent
    loads = _json_string_list(metadata.get("raphael-loads", "[]"), "raphael-loads", sf)
    for declared in loads:
        candidate = Path(declared)
        if candidate.is_absolute() or ".." in candidate.parts:
            sf.fail(f"raphael-loads enthaelt unportablen Pfad: {declared}")
            continue
        resolved = path.parent / candidate
        if not resolved.exists():
            sf.fail(f"raphael-loads verweist auf fehlende Ressource: {declared}")

    referenced = set(LOCAL_RESOURCE_RE.findall(text))
    for raw_declared in sorted(referenced):
        declared = raw_declared.rstrip(".,;:")
        candidate = Path(declared)
        if ".." in candidate.parts:
            sf.fail(f"Markdown-Ressource verlaesst den Skill: {declared}")
            continue
        if not (path.parent / candidate).exists():
            sf.fail(f"Markdown verweist auf fehlende lokale Ressource: {declared}")

    for raw_declared in sorted(set(REPO_RESOURCE_RE.findall(text))):
        declared = raw_declared.rstrip(".,;:")
        candidate = Path(declared)
        try:
            candidate.relative_to(repo_root)
        except ValueError:
            continue
        if not candidate.exists():
            sf.fail(f"Markdown verweist auf fehlende Repository-Ressource: {declared}")


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
    if "metadata" in fields:
        unexpected = sorted(set(fields) - PORTABLE_TOP_LEVEL_FIELDS)
        if unexpected:
            sf.fail(f"portables Frontmatter hat unerlaubte Top-Level-Felder: {unexpected}")
        metadata, metadata_errors = parse_metadata_strings(fm_lines)
        for error in metadata_errors:
            sf.fail(error)
        normalized = dict(fields)
        for metadata_key, field_name in PORTABLE_METADATA_FIELDS.items():
            if metadata_key in metadata:
                normalized[field_name] = {"raw": metadata[metadata_key], "nonempty": bool(metadata[metadata_key])}
        fields = normalized
        for metadata_key in sorted(PORTABLE_JSON_LIST_FIELDS - {"raphael-loads"}):
            if metadata_key in metadata:
                _json_string_list(metadata[metadata_key], metadata_key, sf)
        _validate_portable_resources(path, text, metadata, sf)
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

    # Weiche Enum-Pruefung fuer die Label-Felder: unbekannte Werte -> nur WARNUNG.
    # So bleiben bestehende Skills gruen (additive Haertung, v5-Plan 9.1).
    if "class" in fields and fields["class"]["nonempty"]:
        cls = _scalar_value(fields["class"]["raw"])
        if cls not in CLASS_VALUES:
            sf.warn(f"class '{cls}' ist keiner der 7 Werte R/M/F/O/E/W/G "
                    "(Router·Methodik·Fulfillment·Orchestrierung·Eval·Wissen·Governance)")

    if "sensitivity" in fields and fields["sensitivity"]["nonempty"]:
        sens = _scalar_value(fields["sensitivity"]["raw"])
        if sens not in SENSITIVITY_VALUES:
            sf.warn(f"sensitivity '{sens}' ist keiner von "
                    "public|internal|client-confidential|secret")

    if "scope" in fields and fields["scope"]["nonempty"]:
        sc = _scalar_value(fields["scope"]["raw"])
        scope_ok = sc in SCOPE_SIMPLE_VALUES or sc.startswith("client:") or sc.startswith("project:")
        if not scope_ok:
            sf.warn(f"scope '{sc}' ist keiner von global|agency|client:<slug>|project:<slug>")
        # Plan-Regel: client-confidential darf nie global werden.
        if sc == "global" and "sensitivity" in fields and \
                _scalar_value(fields["sensitivity"]["raw"]) == "client-confidential":
            sf.warn("scope 'global' bei sensitivity 'client-confidential' — "
                    "Kundengeheimnis darf nicht global werden (v5-Plan 8.4/9.1)")

    # Empfohlene Felder: fehlen -> nur eine gesammelte WARNUNG, nie rot.
    missing_recommended = [f for f in RECOMMENDED_FIELDS if f not in fields]
    if missing_recommended:
        sf.warn("empfohlene Felder fehlen (kein Fehler): " + ", ".join(missing_recommended))

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


def _requires_names(raw: str) -> list[str]:
    """Extrahiert Skill-Namen aus inline- oder Blocklisten.

    Ein Eintrag darf wie im Skill-Vertrag eine Versionsangabe (z. B. ``@^0``)
    tragen. Die Versionsangabe wird fuer die Existenz-/Zykluspruefung entfernt.
    """
    value = raw.strip()
    if value.startswith("[") and value.endswith("]"):
        value = value[1:-1].strip()
    if not value:
        return []
    # parse_top_level_keys fuehrt eingerueckte Blocklisten zu einer Zeile
    # zusammen; die Bindestriche bleiben dabei als Trennzeichen erhalten.
    items = (re.findall(r"(?:^|\s)-\s*([^\s,]+)", value)
             if value.startswith("-") else value.split(","))
    names: list[str] = []
    for item in items:
        item = item.strip()
        if item.startswith("-"):
            item = item[1:].strip()
        if len(item) >= 2 and item[0] == item[-1] and item[0] in ("'", '"'):
            item = item[1:-1].strip()
        if item:
            names.append(item.split("@", 1)[0].strip())
    return names


def validate_requires_skills(all_files: list[Path], skill_files: dict[Path, SkillFile]) -> tuple[dict[Path, list[str]], list[str]]:
    """Prueft tote requires_skills-Verweise und Zyklen im Skill-Graphen."""
    repo_root = Path(__file__).resolve().parent.parent
    indexed_names: set[str] = set()
    index_path = repo_root / "index.json"
    if index_path.is_file():
        try:
            import json
            index_data = json.loads(index_path.read_text(encoding="utf-8"))
            indexed_names = {str(entry.get("name")) for entry in index_data.get("skills", [])
                             if isinstance(entry, dict) and entry.get("name")}
        except (OSError, ValueError, TypeError):
            # Der Verzeichnis-Scan bleibt die autoritative Fallback-Quelle.
            pass

    name_to_path: dict[str, Path] = {}
    for path in all_files:
        sf = skill_files.get(path)
        if sf and sf.fields.get("name"):
            name_to_path[sf.fields["name"].strip()] = path
        name_to_path.setdefault(path.parent.name, path)
    existing_names = indexed_names | set(name_to_path)

    requirements: dict[Path, list[str]] = {}
    dead_refs: dict[Path, list[str]] = {}
    for path, sf in skill_files.items():
        names = _requires_names(sf.fields.get("requires_skills", ""))
        requirements[path] = names
        dead_refs[path] = [name for name in names if name not in existing_names]

    graph: dict[str, list[str]] = {}
    for path, names in requirements.items():
        source = sf_name = skill_files[path].fields.get("name", path.parent.name).strip()
        graph[sf_name] = [name for name in names if name in name_to_path]

    cycle_errors: list[str] = []
    visited: set[str] = set()
    active: list[str] = []

    def visit(node: str) -> None:
        if node in active:
            start = active.index(node)
            cycle = active[start:] + [node]
            cycle_errors.append("requires_skills-Zyklus: " + " -> ".join(cycle))
            return
        if node in visited:
            return
        active.append(node)
        for dependency in graph.get(node, []):
            visit(dependency)
        active.pop()
        visited.add(node)

    for node in graph:
        visit(node)
    return dead_refs, cycle_errors


def main(argv: list[str]) -> int:
    files = find_skill_files(argv[1:])
    if not files:
        print("Keine SKILL.md gefunden.")
        return 1

    any_error = False
    any_warning = False
    skill_files = {path: validate_skill_file(path) for path in files}
    # requires_skills wird gegen den kompletten Skill-Bestand aufgeloest, auch
    # wenn der Aufruf nur einzelne SKILL.md-Dateien zum Linten uebergibt.
    all_skill_files = find_skill_files([])
    all_skill_results = {path: (skill_files[path] if path in skill_files else validate_skill_file(path))
                         for path in all_skill_files}
    dead_refs, cycle_errors = validate_requires_skills(all_skill_files, all_skill_results)

    for path in files:
        sf = skill_files[path]
        for missing in dead_refs.get(path, []):
            sf.warn(f"requires_skills verweist auf unbekannten Skill '{missing}' (toter Verweis)")
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

    for cycle_error in cycle_errors:
        print(f"[FAIL] requires_skills")
        print(f"        error:   {cycle_error}")
        any_error = True

    print()
    print(f"{len(files)} SKILL.md geprueft — {'FEHLER' if any_error else 'alle gueltig'}"
          + (", Warnungen vorhanden" if any_warning and not any_error else ""))
    return 1 if any_error else 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
