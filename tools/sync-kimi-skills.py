#!/usr/bin/env python3
"""Build and install deterministic Kimi Code 0.28.1 skill adapters.

The canonical Raphael skills remain under ``skills/**/SKILL.md``.  Source
adapters in ``kimi/skills`` are intentionally tiny: they point at the
canonical source and document the Kimi tool mapping.  Six Kimi-native skills
are supplied by a separate owner and are checked, never generated, here.

Usage::

    python3 tools/sync-kimi-skills.py                 # build adapters
    python3 tools/sync-kimi-skills.py --check         # verify, never write
    python3 tools/sync-kimi-skills.py --install       # install links
    python3 tools/sync-kimi-skills.py --install --dry-run

The installer targets ``$KIMI_CODE_HOME/skills`` or, by default,
``$HOME/.kimi-code/skills``.  Only registered names are considered; unrelated
Kimi skills (including gpt-subagent and sol-subagent) are left untouched.
"""
from __future__ import annotations

import argparse
import importlib.util
import json
import os
import re
import sys
import tempfile
import uuid
from pathlib import Path
from typing import Any

REPO_ROOT = Path(__file__).resolve().parent.parent
SKILLS_ROOT = REPO_ROOT / "skills"
KIMI_ROOT = REPO_ROOT / "kimi"
KIMI_SKILLS_ROOT = KIMI_ROOT / "skills"
REGISTRY_PATH = KIMI_ROOT / "compatibility.json"
CODEX_REGISTRY_PATH = REPO_ROOT / "codex" / "compatibility.json"
CANONICAL_REPO = "/root/raphael-skills"
TARGET_VERSION = "kimi-code-0.28.1"

NATIVE_KIMI_AGENT = {"dynamic-workflow", "orchestrate", "sdd", "ultra-loop", "kimi-first"}
NATIVE_KIMI_REVIEW = {"kimi-sol"}
NATIVE_KIMI = NATIVE_KIMI_AGENT | NATIVE_KIMI_REVIEW
VALID_MODES = {"source-adapter", "native-kimi-agent", "native-kimi-review"}

KIMI_TOOLS = (
    "AskUserQuestion",
    "TodoList",
    "Agent",
    "AgentSwarm",
    "Read",
    "Write",
    "Edit",
    "Bash",
    "Grep",
    "Glob",
    "FetchURL",
    "WebSearch",
    "Skill",
)

# These describe the old source harness.  They may occur in the canonical
# source, but must not leak into an adapter's generated description/body as
# executable instructions.  The explicit Claude/Cockpit mapping is retained
# in neutral prose in render_adapter().
STALE_TOKEN_PATTERNS = (
    re.compile(r"\bclaude\b", re.IGNORECASE),
    re.compile(r"\bcockpit\b", re.IGNORECASE),
    re.compile(r"\bsubagent(?:en|e|s)?\b", re.IGNORECASE),
    re.compile(r"\bworkflow[- ]tools?\b", re.IGNORECASE),
    re.compile(r"\bcron(?:create|delete)\b", re.IGNORECASE),
    re.compile(r"\bfable\b", re.IGNORECASE),
    re.compile(r"\b(?:opus|sonnet|haiku)\b", re.IGNORECASE),
)
CODEX_THREAD_PATTERN = re.compile(r"\bcodex[- ](?:thread|task)s?\b", re.IGNORECASE)


def _load_validator():
    path = Path(__file__).resolve().parent / "validate-skill.py"
    spec = importlib.util.spec_from_file_location("validate_skill", path)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"Validator not importable: {path}")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


_validator = _load_validator()
extract_frontmatter = _validator.extract_frontmatter
parse_top_level_keys = _validator.parse_top_level_keys
validate_skill_file = _validator.validate_skill_file


def _collapse(value: str) -> str:
    return re.sub(r"\s+", " ", value).strip()


def _load_json(path: Path, label: str) -> dict[str, Any]:
    try:
        value = json.loads(path.read_text(encoding="utf-8"))
    except FileNotFoundError as exc:
        raise RuntimeError(f"{label} missing: {path}") from exc
    except json.JSONDecodeError as exc:
        raise RuntimeError(f"{label} is not valid JSON: {exc}") from exc
    if not isinstance(value, dict):
        raise RuntimeError(f"{label} must be a JSON object")
    return value


def load_codex_registry() -> dict[str, dict[str, Any]]:
    data = _load_json(CODEX_REGISTRY_PATH, "Codex registry")
    skills = data.get("skills")
    if not isinstance(skills, dict) or not skills:
        raise RuntimeError("Codex registry needs a non-empty 'skills' object")
    result: dict[str, dict[str, Any]] = {}
    for name, entry in skills.items():
        if not isinstance(name, str) or not isinstance(entry, dict):
            raise RuntimeError("Codex registry entries must be named objects")
        source = entry.get("source")
        if not isinstance(source, str) or not source or Path(source).is_absolute() or ".." in Path(source).parts:
            raise RuntimeError(f"{name}: Codex source must be repo-relative")
        result[name] = entry
    return result


def _native_mode(name: str) -> str:
    if name in NATIVE_KIMI_AGENT:
        return "native-kimi-agent"
    if name in NATIVE_KIMI_REVIEW:
        return "native-kimi-review"
    return "source-adapter"


def _expected_source(name: str, codex_entry: dict[str, Any]) -> str:
    if name in NATIVE_KIMI:
        return f"kimi/skills/{name}/SKILL.md"
    return str(codex_entry["source"])


def load_registry() -> dict[str, dict[str, Any]]:
    """Load the checked-in Kimi registry and enrich inherited audit fields.

    ``kimi/compatibility.json`` deliberately stores the stable source/mode
    mapping.  Rationale, triggers, aliases, and dependency notes are inherited
    from the Codex inventory so the 36-name set has one deterministic source of
    truth while the Kimi registry remains small and reviewable.
    """
    data = _load_json(REGISTRY_PATH, "Kimi registry")
    if data.get("schema_version") != 1:
        raise RuntimeError("Kimi registry schema_version must be 1")
    if data.get("target") != TARGET_VERSION:
        raise RuntimeError(f"Kimi registry target must be {TARGET_VERSION!r}")
    skills = data.get("skills")
    codex = load_codex_registry()
    if not isinstance(skills, dict):
        raise RuntimeError("Kimi registry needs an object field 'skills'")
    codex_names: dict[str, str] = {}
    for kimi_name, raw_entry in skills.items():
        if not isinstance(raw_entry, dict):
            raise RuntimeError(f"{kimi_name}: registry entry must be an object")
        codex_name = raw_entry.get("codex_name", kimi_name)
        if not isinstance(codex_name, str) or codex_name not in codex:
            raise RuntimeError(f"{kimi_name}: unknown codex_name {codex_name!r}")
        if codex_name in codex_names.values():
            raise RuntimeError(f"{kimi_name}: duplicate Codex mapping {codex_name!r}")
        codex_names[kimi_name] = codex_name
    if set(codex_names.values()) != set(codex):
        missing = sorted(set(codex) - set(codex_names.values()))
        raise RuntimeError(f"Kimi registry/Codex inventory mismatch (missing={missing})")

    result: dict[str, dict[str, Any]] = {}
    for name in sorted(skills):
        entry = skills[name]
        codex_name = codex_names[name]
        source_entry = codex[codex_name]
        if not isinstance(entry, dict):
            raise RuntimeError(f"{name}: registry entry must be an object")
        source = entry.get("source")
        mode = entry.get("mode")
        expected_source = _expected_source(name, source_entry)
        expected_mode = _native_mode(name)
        if source != expected_source:
            raise RuntimeError(f"{name}: source {source!r} != {expected_source!r}")
        if mode != expected_mode or mode not in VALID_MODES:
            raise RuntimeError(f"{name}: mode must be {expected_mode!r}")

        merged = dict(source_entry)
        merged.update(entry)
        merged["source"] = source
        merged["mode"] = mode
        merged["name"] = name
        merged["codex_name"] = codex_name
        merged["trigger_aliases"] = entry.get("trigger_aliases", source_entry.get("trigger_aliases", {})) or {}
        merged["triggers"] = entry.get("triggers", source_entry.get("triggers", []))
        merged["rationale"] = entry.get("rationale", source_entry.get("rationale", f"Expose {name} in Kimi."))
        merged["dependency_map"] = entry.get("dependency_map", source_entry.get("codex_notes", [])) or []
        _validate_entry(name, merged)
        result[name] = merged
    return result


def _validate_entry(name: str, entry: dict[str, Any]) -> None:
    if not isinstance(entry.get("rationale"), str) or not entry["rationale"].strip():
        raise RuntimeError(f"{name}: rationale must not be empty")
    triggers = entry.get("triggers")
    if not isinstance(triggers, list) or not triggers or any(not isinstance(x, str) or not x.strip() for x in triggers):
        raise RuntimeError(f"{name}: triggers must be a non-empty string array")
    aliases = entry.get("trigger_aliases", {})
    if not isinstance(aliases, dict) or any(not isinstance(k, str) or not isinstance(v, str) for k, v in aliases.items()):
        raise RuntimeError(f"{name}: trigger_aliases must be a string-to-string object")
    deps = entry.get("dependency_map", [])
    if not isinstance(deps, list) or any(not isinstance(x, str) or not x.strip() for x in deps):
        raise RuntimeError(f"{name}: dependency_map must be a string array")


def sanitize_description(value: str, *, preserve_codex: bool = False) -> str:
    """Translate source-harness vocabulary into neutral Kimi vocabulary."""
    text = _collapse(value)
    replacements = (
        (r"\bClaude\b", "Kimi coordinator"),
        (r"\bCockpit\b", "Kimi coordinator"),
        (r"\bSubagent[- ]Flotte\b", "parallel contributors"),
        (r"\bSubagents?\b", "parallel contributor"),
        (r"\bSubagenten\b", "parallel contributors"),
        (r"\bWorkflow[- ]Tools?\b", "workflow runner"),
        (r"\bCronCreate\b", "scheduled-task creation"),
        (r"\bCronDelete\b", "scheduled-task deletion"),
        (r"\bFable\b", "review model"),
        (r"\bOpus\b", "high-judgment model"),
        (r"\bSonnet\b", "implementation model"),
        (r"\bHaiku\b", "fast model"),
    )
    for pattern, replacement in replacements:
        text = re.sub(pattern, replacement, text, flags=re.IGNORECASE)
    if not preserve_codex:
        # Keep slash command names such as /codex-first intact, but neutralize
        # prose references to a previous coordinator.  The codex-first skill
        # is the deliberate exception: Codex is its external worker.
        text = re.sub(r"(?<![/\w-])Codex(?:-CLI)?\b", "Kimi coordinator", text, flags=re.IGNORECASE)
    text = text.replace("->", "→").replace("<-", "←")
    text = text.replace(">=", "mindestens ").replace("<=", "höchstens ")
    text = text.replace("<", "unter ").replace(">", "über ")
    return _collapse(text)


def _has_stale_token(text: str) -> str | None:
    for pattern in STALE_TOKEN_PATTERNS:
        found = pattern.search(text)
        if found:
            return found.group(0)
    return None


def normalize_trigger(trigger: str, entry: dict[str, Any]) -> str:
    aliases = entry.get("trigger_aliases", {})
    return sanitize_description(aliases.get(trigger, trigger), preserve_codex=entry.get("name") == "codex-first")


def adapter_description(name: str, source_description: str, entry: dict[str, Any]) -> str:
    base = sanitize_description(source_description, preserve_codex=name == "codex-first")
    base = re.split(r"\bTrigger(?:-Worte)?:", base, maxsplit=1, flags=re.IGNORECASE)[0].rstrip(" .")
    triggers: list[str] = []
    for trigger in entry["triggers"]:
        normalized = normalize_trigger(trigger, entry)
        if normalized and normalized not in triggers:
            triggers.append(normalized)
    suffix = "Trigger: " + ", ".join(json.dumps(t, ensure_ascii=False) for t in triggers)
    room = 1024 - len(suffix) - 2
    if room < 1:
        raise RuntimeError(f"{name}: trigger list exceeds Kimi's 1024-character limit")
    result = f"{base[:room].rstrip()}. {suffix}" if base else suffix
    result = _collapse(result)
    stale = _has_stale_token(result)
    if stale:
        raise RuntimeError(f"{name}: stale platform token in description: {stale!r}")
    if CODEX_THREAD_PATTERN.search(result):
        raise RuntimeError(f"{name}: legacy Codex thread wording in description")
    if not 1 <= len(result) <= 1024:
        raise RuntimeError(f"{name}: description must be 1..1024 characters")
    return result


def _shared_dependency_map(entry: dict[str, Any]) -> str:
    notes = entry.get("dependency_map", [])
    if not notes:
        return ""
    lines = ["\nShared absolute dependency map (shared paths; not platform-specific):\n"]
    for note in notes:
        clean = re.sub(r"\bCodex\b", "Kimi", note, flags=re.IGNORECASE)
        lines.append(f"- {clean}\n")
    return "".join(lines)


def render_adapter(name: str, entry: dict[str, Any], source_description: str) -> str:
    description = adapter_description(name, source_description, entry)
    source_path = f"{CANONICAL_REPO}/{entry['source']}"
    mapping = "\n".join(
        f"- `{tool}` → the surfaced Kimi `{tool}` capability."
        for tool in KIMI_TOOLS
    )
    body = (
        f"# {name} — Kimi source adapter\n\n"
        "Read the complete canonical source file before acting:\n"
        f"`{source_path}`\n\n"
        "The canonical source is authoritative for safety, scope, procedure, "
        "and completion. Do not copy or paraphrase it into this adapter.\n\n"
        "Compatibility mapping:\n"
        "- Claude/Cockpit in the source means the current Kimi coordinator.\n"
        f"{mapping}\n"
        "Use a capability only when the current Kimi host actually surfaces it; "
        "never invent an unavailable tool or silently substitute another one. "
        "Keep every source safety and completion requirement authoritative.\n"
        f"{_shared_dependency_map(entry)}"
    )
    return (
        "---\n"
        f"name: {json.dumps(name, ensure_ascii=False)}\n"
        f"description: {json.dumps(description, ensure_ascii=False)}\n"
        "---\n\n"
        + body
    )


def _native_expected_paths(registry: dict[str, dict[str, Any]]) -> list[Path]:
    return [KIMI_SKILLS_ROOT / name / "SKILL.md" for name, entry in registry.items() if entry["mode"] != "source-adapter"]


def _source_entries(registry: dict[str, dict[str, Any]]) -> dict[str, tuple[Path, dict[str, Any]]]:
    found: dict[str, tuple[Path, dict[str, Any]]] = {}
    for name, entry in registry.items():
        if entry["mode"] != "source-adapter":
            continue
        path = REPO_ROOT / entry["source"]
        if not path.is_file():
            raise RuntimeError(f"{name}: canonical source missing: {path}")
        skill = validate_skill_file(path)
        if not skill.ok:
            raise RuntimeError(f"Invalid canonical source {path}: {'; '.join(skill.errors)}")
        frontmatter = parse_top_level_keys(extract_frontmatter(path.read_text(encoding="utf-8")) or [])
        source_name = frontmatter.get("name", {}).get("raw", "").strip()
        if source_name != entry["codex_name"]:
            raise RuntimeError(f"{name}: canonical source name is {source_name!r}, expected {entry['codex_name']!r}")
        if source_name in found:
            raise RuntimeError(f"Duplicate canonical source skill name: {source_name}")
        found[name] = (path, frontmatter)
    expected = {name for name, entry in registry.items() if entry["mode"] == "source-adapter"}
    if set(found) != expected:
        raise RuntimeError(f"Source registry coverage mismatch: {sorted(expected ^ set(found))}")
    return found


def expected_files(registry: dict[str, dict[str, Any]], sources: dict[str, tuple[Path, dict[str, Any]]]) -> dict[Path, str]:
    files: dict[Path, str] = {}
    for name, entry in registry.items():
        if entry["mode"] != "source-adapter":
            continue
        _, frontmatter = sources[name]
        source_description = frontmatter.get("description", {}).get("raw", "").strip()
        files[KIMI_SKILLS_ROOT / name / "SKILL.md"] = render_adapter(name, entry, source_description)
    return files


def _plain_scalar(raw: str) -> str:
    value = raw.strip()
    if len(value) >= 2 and value[0] == value[-1] == '"':
        try:
            decoded = json.loads(value)
        except json.JSONDecodeError:
            return value
        return decoded if isinstance(decoded, str) else value
    if len(value) >= 2 and value[0] == value[-1] == "'":
        return value[1:-1]
    return value


def validate_kimi_skill(path: Path, expected_name: str, *, strict_platform: bool = True) -> list[str]:
    """Validate Kimi Code's strict name+description frontmatter contract."""
    try:
        text = path.read_text(encoding="utf-8")
    except OSError as exc:
        return [f"unreadable: {exc}"]
    frontmatter = extract_frontmatter(text)
    if frontmatter is None:
        return ["frontmatter missing"]
    fields = parse_top_level_keys(frontmatter)
    errors: list[str] = []
    if set(fields) != {"name", "description"}:
        errors.append(f"frontmatter keys {sorted(fields)} instead of ['description', 'name']")
    name = _plain_scalar(fields.get("name", {}).get("raw", ""))
    if name != expected_name:
        errors.append(f"name {name!r} instead of {expected_name!r}")
    description = _collapse(fields.get("description", {}).get("raw", ""))
    if not 1 <= len(description) <= 1024:
        errors.append("description must be 1..1024 characters")
    if strict_platform:
        stale = _has_stale_token(description)
        if stale:
            errors.append(f"description contains stale platform token {stale!r}")
        if CODEX_THREAD_PATTERN.search(description):
            errors.append("description contains legacy Codex thread wording")
    angle_checked = description.replace("->", "")
    if "<" in angle_checked or ">" in angle_checked:
        errors.append("description contains ASCII angle brackets")
    if len(text.split("---", 2)[-1].strip()) < 20:
        errors.append("skill body is unexpectedly empty")
    return errors


def validate_native_skill(name: str, path: Path, mode: str) -> list[str]:
    # Native Kimi contracts may intentionally refer to the installed
    # ``sol-subagent`` user skill; that is not stale source-harness wording.
    errors = validate_kimi_skill(path, name, strict_platform=False)
    if errors:
        return errors
    text = path.read_text(encoding="utf-8")
    for tool in KIMI_TOOLS:
        if not re.search(r"(?<![A-Za-z0-9_])" + re.escape(tool) + r"(?![A-Za-z0-9_])", text):
            errors.append(f"native Kimi tool contract missing {tool}")
    if CODEX_THREAD_PATTERN.search(text) or re.search(r"\b(?:create_thread|send_message_to_thread|wait_threads)\b", text):
        errors.append("native skill contains legacy Codex thread route wording")
    lowered = text.lower()
    # Captured Kimi Code 0.28.1 runtime contract: TodoList items accept only
    # title/status; statuses are pending|in_progress|done and exactly one item
    # may be in_progress while work is underway.
    for marker in ("title", "status", "pending", "in_progress", "done"):
        if marker not in lowered:
            errors.append(f"native Kimi TodoList contract missing {marker}")
    for block in re.findall(r"```json\s*\n(.*?)\n```", text, flags=re.DOTALL):
        try:
            value = json.loads(block)
        except json.JSONDecodeError:
            errors.append("native Kimi skill contains malformed JSON example")
            continue
        todo_items: list[Any] = []
        if isinstance(value, list):
            todo_items = value
        elif isinstance(value, dict) and {"title", "status"}.issubset(value):
            todo_items = [value]
        for item in todo_items:
            if not isinstance(item, dict) or set(item) != {"title", "status"}:
                errors.append("TodoList JSON example has fields beyond title/status")
                continue
            if item.get("status") not in {"pending", "in_progress", "done"}:
                errors.append(f"TodoList JSON example has unsupported status {item.get('status')!r}")
    if mode == "native-kimi-agent":
        for marker in ("todolist", "agent"):
            if marker not in lowered:
                errors.append(f"native agent contract missing {marker}")
        if name in {"dynamic-workflow", "ultra-loop"} and not re.search(r"2\s*[–-]\s*6", lowered):
            errors.append("native agent contract missing 2–6 bound")
        if name == "dynamic-workflow" and "dag" not in lowered:
            errors.append("native agent contract missing DAG")
        if name == "orchestrate" and "verifier" not in lowered:
            errors.append("native orchestrate contract missing verifier")
        if name == "sdd" and "review" not in lowered:
            errors.append("native SDD contract missing review")
        for marker in (".kimi/workflows/<run-id>.json", "atom", "resume"):
            if marker not in lowered:
                errors.append(f"native agent workspace/resume contract missing {marker}")
        if not re.search(r"do not (?:call|use).*agent.*agentswarm", lowered, re.DOTALL):
            errors.append("native agent packet does not forbid Agent/AgentSwarm descendants")
        if "resume_agent_ids" not in lowered:
            errors.append("native agent contract missing AgentSwarm resume_agent_ids")
        for marker in ("git status --short --untracked-files=all", "baseline", "terminal", "best_effort_authorized"):
            if marker not in lowered:
                errors.append(f"native agent attribution/terminal contract missing {marker}")
        if "revert" not in lowered:
            errors.append("native agent contract does not protect pre-existing user changes from revert")
        if name == "sdd":
            for marker in ("focused red", "non-tdd", "nach jedem", "green erneut", "bevor beide reviews"):
                if marker not in lowered:
                    errors.append(f"native SDD red/green contract missing {marker}")
    elif mode == "native-kimi-review":
        for marker in ("approval_required", "reviewer_unavailable", "malformed_verdict", "verified"):
            if marker not in lowered:
                errors.append(f"native review contract missing {marker}")
        for trigger in ("/kimi-sol", "kimi→sol", "kimi -> sol", "kimi mit sol prüfen", "kimi mit sol pruefen"):
            if trigger not in lowered:
                errors.append(f"native review trigger contract missing {trigger}")
        for marker in ("sol_subagent_status", "sol_subagent_seat", "sol_subagent_output", "sol_subagent_final", "run-sol.sh", "read"):
            if marker not in lowered:
                errors.append(f"native review runner contract missing {marker}")
        if re.search(r"(?m)^reviewer_context_id\s*:", lowered):
            errors.append("native review requires unsupported reviewer_context_id field")
        if "${kimi_skill_dir}" in lowered:
            errors.append("native review reuses kimi-sol KIMI_SKILL_DIR for sol-subagent runner")
        trigger_section = re.search(r"nur diese fuenf trigger sind erlaubt:\s*(.*?)\n\ndie nackten", lowered, flags=re.DOTALL)
        expected_trigger_bullets = {"/kimi-sol", "kimi→sol", "kimi -> sol", "kimi mit sol prüfen", "kimi mit sol pruefen"}
        if trigger_section is None:
            errors.append("native review exact trigger section missing")
        else:
            actual = {item.strip("` ") for item in re.findall(r"^-\s+(.+)$", trigger_section.group(1), flags=re.MULTILINE)}
            if actual != expected_trigger_bullets:
                errors.append(f"native review trigger section broadened: {sorted(actual)}")
        for marker in ("vor jedem runner-aufruf", "frische einmalfreigabe", "fruehere zustimmung", "ohne klares ja"):
            if marker not in lowered:
                errors.append(f"native review approval gate missing {marker}")
    return errors


def stale_adapter_paths(registry: dict[str, dict[str, Any]]) -> list[Path]:
    if not KIMI_SKILLS_ROOT.exists():
        return []
    names = set(registry)
    return sorted(path for path in KIMI_SKILLS_ROOT.iterdir() if path.name not in names)


def check_outputs(registry: dict[str, dict[str, Any]], sources: dict[str, tuple[Path, dict[str, Any]]] | None = None, *, report_stale: bool = True) -> tuple[bool, list[Path]]:
    if sources is None:
        sources = _source_entries(registry)
    ok = True
    for path, content in expected_files(registry, sources).items():
        if not path.is_file():
            print(f"MISSING generated: {path}")
            ok = False
        elif path.read_text(encoding="utf-8") != content:
            print(f"DRIFT generated: {path}")
            ok = False
    for name, entry in registry.items():
        if entry["mode"] == "source-adapter":
            path = KIMI_SKILLS_ROOT / name / "SKILL.md"
            if path.is_file():
                for error in validate_kimi_skill(path, name):
                    print(f"INVALID Kimi skill {path}: {error}")
                    ok = False
        else:
            path = KIMI_SKILLS_ROOT / name / "SKILL.md"
            if not path.is_file():
                print(f"MISSING native Kimi skill: {path}")
                ok = False
            else:
                for error in validate_native_skill(name, path, entry["mode"]):
                    print(f"INVALID native Kimi skill {path}: {error}")
                    ok = False
    stale = stale_adapter_paths(registry)
    if stale and report_stale:
        print("STALE Kimi skill paths (not removed):")
        for path in stale:
            print(f"  {path}")
        ok = False
    return ok, stale


def atomic_write(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    fd, temporary = tempfile.mkstemp(prefix=f".{path.name}.", dir=str(path.parent), text=True)
    try:
        with os.fdopen(fd, "w", encoding="utf-8", newline="") as handle:
            handle.write(content)
            handle.flush()
            os.fsync(handle.fileno())
        os.replace(temporary, path)
    except Exception:
        try:
            os.unlink(temporary)
        except FileNotFoundError:
            pass
        raise


def build(*, check: bool = False, dry_run: bool = False) -> int:
    registry = load_registry()
    sources = _source_entries(registry)
    native_missing = [path for path in _native_expected_paths(registry) if not path.is_file()]
    if native_missing:
        for path in native_missing:
            print(f"MISSING native Kimi skill: {path}")
        return 1
    if check:
        ok, _ = check_outputs(registry, sources)
        print("Kimi adapter check: " + ("OK" if ok else "FAIL"))
        return 0 if ok else 1
    expected = expected_files(registry, sources)
    stale = stale_adapter_paths(registry)
    if dry_run:
        for path, content in expected.items():
            state = "unchanged" if path.is_file() and path.read_text(encoding="utf-8") == content else "write"
            print(f"DRY-RUN {state}: {path}")
        if stale:
            print("STALE Kimi skill paths (not removed):")
            for path in stale:
                print(f"  {path}")
        return 0
    for path, content in expected.items():
        atomic_write(path, content)
    if stale:
        print("STALE Kimi skill paths (not removed):")
        for path in stale:
            print(f"  {path}")
    print(f"Kimi adapters written: {len(expected)} source skills ({len(expected)} files).")
    return 0


def installation_root() -> Path:
    raw_home = os.environ.get("KIMI_CODE_HOME")
    if raw_home is None or not raw_home.strip():
        raw_home = os.environ.get("HOME")
        if not raw_home:
            raise RuntimeError("HOME must be set when KIMI_CODE_HOME is absent")
        raw_home = str(Path(raw_home) / ".kimi-code")
    home = Path(os.path.normpath(raw_home))
    if not home.is_absolute():
        raise RuntimeError(f"KIMI_CODE_HOME must be absolute: {raw_home!r}")
    if str(home) in {"/", "/root", "/home", "/tmp", "/var", "/usr", "/opt"} or len(home.parts) < 3:
        raise RuntimeError(f"KIMI_CODE_HOME is dangerously broad: {home}")
    destination = home / "skills"
    _validate_install_components(destination)
    return destination


def _validate_install_components(path: Path) -> None:
    """Reject every existing symlink/non-directory component in a destination."""
    current = Path(path.anchor)
    for part in path.parts[1:]:
        current /= part
        try:
            st = os.lstat(current)
        except FileNotFoundError:
            return
        if os.path.islink(current):
            raise RuntimeError(f"Kimi installation path traverses a symlink: {current}")
        if not os.path.isdir(current):
            raise RuntimeError(f"Kimi installation component is not a directory: {current}")


def _open_install_dir(path: Path, *, create: bool) -> int:
    """Open/create the destination with no-follow traversal and return its fd."""
    flags = os.O_RDONLY | os.O_DIRECTORY | getattr(os, "O_NOFOLLOW", 0)
    fd = os.open(path.anchor, flags)
    try:
        for part in path.parts[1:]:
            try:
                next_fd = os.open(part, flags, dir_fd=fd)
            except FileNotFoundError:
                if not create:
                    raise
                try:
                    os.mkdir(part, 0o755, dir_fd=fd)
                except FileExistsError:
                    pass
                next_fd = os.open(part, flags, dir_fd=fd)
            os.close(fd)
            fd = next_fd
        return fd
    except Exception:
        os.close(fd)
        raise


def _state_at(fd: int, name: str, source: Path) -> str:
    try:
        st = os.stat(name, dir_fd=fd, follow_symlinks=False)
    except FileNotFoundError:
        return "create"
    if (st.st_mode & 0o170000) != 0o120000:
        return "conflict"
    return "noop" if os.readlink(name, dir_fd=fd) == str(source) else "conflict"


def _unlink_owned_at(fd: int, name: str, inode: int, source: str) -> None:
    try:
        st = os.stat(name, dir_fd=fd, follow_symlinks=False)
    except FileNotFoundError:
        return
    if st.st_ino == inode and (st.st_mode & 0o170000) == 0o120000 and os.readlink(name, dir_fd=fd) == source:
        os.unlink(name, dir_fd=fd)


def _unlink_owned_link(target: Path, inode: int, source: str) -> None:
    st = os.lstat(target)
    if st.st_ino == inode and os.path.islink(target) and os.readlink(target) == source:
        os.unlink(target)


def _rollback_links(created: list[tuple[Path, int, str]]) -> None:
    for target, inode, source in reversed(created):
        try:
            _unlink_owned_link(target, inode, source)
        except (FileNotFoundError, OSError):
            pass


def _test_fail_after() -> int | None:
    if os.environ.get("RAPHAEL_KIMI_TESTING") != "1":
        return None
    raw = os.environ.get("RAPHAEL_KIMI_FAIL_AFTER")
    if raw is None:
        return None
    try:
        value = int(raw)
    except ValueError as exc:
        raise RuntimeError("RAPHAEL_KIMI_FAIL_AFTER must be an integer") from exc
    if value < 0:
        raise RuntimeError("RAPHAEL_KIMI_FAIL_AFTER must not be negative")
    return value


def install(*, dry_run: bool = False) -> int:
    registry = load_registry()
    sources = _source_entries(registry)
    output_ok, _ = check_outputs(registry, sources, report_stale=False)
    if not output_ok:
        print("Install aborted: build/check all Kimi skills first.")
        return 1
    destination = installation_root()
    plans: list[tuple[Path, Path, str]] = []
    conflicts: list[Path] = []
    for name in sorted(registry):
        source = KIMI_SKILLS_ROOT / name
        target = destination / name
        if not os.path.lexists(target):
            state = "create"
        elif os.path.islink(target) and os.path.exists(target) and os.readlink(target) == str(source):
            state = "noop"
        else:
            state = "conflict"
            conflicts.append(target)
        plans.append((target, source, state))
    if conflicts:
        print("Install preflight conflict — no links were created:")
        for target in conflicts:
            print(f"  {target}")
        return 1
    if dry_run:
        for target, source, state in plans:
            print(f"DRY-RUN {state}: {target} -> {source}")
        return 0

    created: list[tuple[str, int, str]] = []
    fail_after = _test_fail_after()
    destination_fd: int | None = None
    try:
        destination_fd = _open_install_dir(destination, create=True)
        # Repeat the complete preflight through the held no-follow dirfd.  This
        # closes the race between the read-only path check and the first write.
        fd_plans: list[tuple[Path, Path, str]] = []
        fd_conflicts: list[Path] = []
        for target, source, _ in plans:
            state = _state_at(destination_fd, target.name, source)
            fd_plans.append((target, source, state))
            if state == "conflict":
                fd_conflicts.append(target)
        if fd_conflicts:
            raise RuntimeError("destination changed during install preflight: " + ", ".join(map(str, fd_conflicts)))
        writes = 0
        for target, source, state in fd_plans:
            if state == "noop":
                continue
            if fail_after is not None and writes >= fail_after:
                raise RuntimeError(f"Test injection after {writes} link(s).")
            staging_name = f".kimi-install-{target.name}-{uuid.uuid4().hex}"
            os.symlink(str(source), staging_name, dir_fd=destination_fd)
            staging_stat = os.stat(staging_name, dir_fd=destination_fd, follow_symlinks=False)
            try:
                created.append((target.name, staging_stat.st_ino, str(source)))
                try:
                    # Hard-linking the staging symlink gives no-clobber
                    # semantics even if a foreign file races the preflight.
                    os.link(staging_name, target.name, src_dir_fd=destination_fd, dst_dir_fd=destination_fd, follow_symlinks=False)
                except Exception:
                    created.pop()
                    raise
                if os.environ.get("RAPHAEL_KIMI_TESTING") == "1" and os.environ.get("RAPHAEL_KIMI_FAIL_POST_CREATE") == "1" and writes == 0:
                    raise OSError("Test injection after owned final link creation.")
            finally:
                _unlink_owned_at(destination_fd, staging_name, staging_stat.st_ino, str(source))
            writes += 1
    except Exception as exc:
        if destination_fd is not None:
            for name, inode, source in reversed(created):
                try:
                    _unlink_owned_at(destination_fd, name, inode, source)
                except OSError:
                    pass
        print(f"Install failed; created links rolled back: {exc}", file=sys.stderr)
        return 1
    finally:
        if destination_fd is not None:
            os.close(destination_fd)
    print(f"Kimi skills installed in {destination} ({len(created)} new, {len(plans) - len(created)} unchanged).")
    return 0


def parse_args(argv: list[str]) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Build deterministic Kimi Code 0.28.1 adapters and install no-clobber links.")
    parser.add_argument("command", nargs="?", choices=("build", "check", "install"), help="operation (default: build)")
    parser.add_argument("--build", action="store_true", help="explicitly select build")
    parser.add_argument("--check", action="store_true", help="verify generated files without writing")
    parser.add_argument("--install", action="store_true", help="install links under $KIMI_CODE_HOME/skills")
    parser.add_argument("--dry-run", action="store_true", help="show actions without writing files or links")
    args = parser.parse_args(argv)
    if args.command == "check":
        args.check = True
    if args.command == "install":
        args.install = True
    if args.build and (args.check or args.install):
        parser.error("--build cannot be combined with check or install")
    if args.check and args.install:
        parser.error("--check and --install are mutually exclusive")
    return args


def main(argv: list[str] | None = None) -> int:
    args = parse_args(list(sys.argv[1:] if argv is None else argv))
    try:
        if args.install:
            return install(dry_run=args.dry_run)
        return build(check=args.check, dry_run=args.dry_run)
    except (RuntimeError, OSError) as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
