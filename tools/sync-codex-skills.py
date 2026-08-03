#!/usr/bin/env python3
"""Build, verify, and install the Codex skill packages.

The source ``skills/**/SKILL.md`` files remain canonical.  This utility only
generates source-pointing adapters under ``codex/skills`` and verifies
``canonical-link`` packages without writing through their bridges. It
deliberately has no prune operation: directories that
are not in ``codex/compatibility.json`` are reported as stale and left alone.

Usage::

    python3 tools/sync-codex-skills.py                 # build adapters
    python3 tools/sync-codex-skills.py --check         # check, never write
    python3 tools/sync-codex-skills.py --install       # install links in $HOME
    python3 tools/sync-codex-skills.py --install --dry-run
    python3 tools/sync-codex-skills.py build --dry-run # show build writes

Only the Python standard library is used.
"""
from __future__ import annotations

import argparse
import contextlib
import importlib.util
import json
import os
import re
import stat
import sys
import tempfile
import uuid
from pathlib import Path
from typing import Any

REPO_ROOT = Path(__file__).resolve().parent.parent
SKILLS_ROOT = REPO_ROOT / "skills"
CODEX_ROOT = REPO_ROOT / "codex"
CODEX_SKILLS_ROOT = CODEX_ROOT / "skills"
REGISTRY_PATH = CODEX_ROOT / "compatibility.json"

# This is intentionally stable.  Adapters may be checked out elsewhere, but
# the source file they point at is always this canonical Raphael skills tree.
CANONICAL_REPO = "/root/raphael-skills"
NATIVE_THREAD_SKILLS = {"orchestrate", "plan"}
NATIVE_EXTERNAL_SKILLS = {"kimi-sol"}
NATIVE_SKILLS = NATIVE_THREAD_SKILLS | NATIVE_EXTERNAL_SKILLS
VALID_MODES = {"source-adapter", "canonical-link", "native-thread", "native-external-review"}

# Tokens which describe the source harness rather than Codex.  The generated
# description must not advertise any of these stale platform concepts.  The
# adapter body may mention the explicit compatibility mapping by design.
STALE_TOKEN_PATTERNS = (
    re.compile(r"\bclaude\b", re.IGNORECASE),
    re.compile(r"\bcockpit\b", re.IGNORECASE),
    re.compile(r"\bsubagent(?:en|e)?\b", re.IGNORECASE),
    re.compile(r"\bworkflow[- ]tools?\b", re.IGNORECASE),
    re.compile(r"\bcroncreate\b", re.IGNORECASE),
    re.compile(r"\bcrondelete\b", re.IGNORECASE),
    re.compile(r"\bfable\b", re.IGNORECASE),
    re.compile(r"\b(?:opus|sonnet|haiku)\b", re.IGNORECASE),
)


def _load_validator():
    """Import the repository's dependency-free frontmatter parser."""
    path = Path(__file__).resolve().parent / "validate-skill.py"
    spec = importlib.util.spec_from_file_location("validate_skill", path)
    if spec is None or spec.loader is None:  # pragma: no cover - import failure
        raise RuntimeError(f"Validator nicht ladbar: {path}")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


_validator = _load_validator()
extract_frontmatter = _validator.extract_frontmatter
parse_top_level_keys = _validator.parse_top_level_keys
validate_skill_file = _validator.validate_skill_file


def _collapse(value: str) -> str:
    return re.sub(r"\s+", " ", value).strip()


def sanitize_description(value: str) -> str:
    """Translate source-harness vocabulary into neutral Codex vocabulary."""
    text = _collapse(value)
    replacements = (
        (r"\bClaude\b", "Codex coordinator"),
        (r"\bCockpit\b", "Codex coordinator"),
        (r"\bSubagent[- ]Flotte\b", "parallel contributors"),
        (r"\bSubagenten\b", "parallel contributors"),
        (r"\bSubagents\b", "parallel contributors"),
        (r"\bSubagent\b", "parallel contributor"),
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
    text = text.replace("->", "→").replace("<-", "←")
    text = text.replace(">=", "mindestens ").replace("<=", "höchstens ")
    text = text.replace("<", "unter ").replace(">", "über ")
    return _collapse(text)


def _has_stale_token(text: str) -> str | None:
    for pattern in STALE_TOKEN_PATTERNS:
        match = pattern.search(text)
        if match:
            return match.group(0)
    return None


def source_files() -> list[Path]:
    return sorted(
        path
        for path in SKILLS_ROOT.rglob("SKILL.md")
        if "_candidates" not in path.parts
    )


def load_registry() -> dict[str, dict[str, Any]]:
    try:
        data = json.loads(REGISTRY_PATH.read_text(encoding="utf-8"))
    except FileNotFoundError as exc:
        raise RuntimeError(f"Registry fehlt: {REGISTRY_PATH}") from exc
    except json.JSONDecodeError as exc:
        raise RuntimeError(f"Registry ist kein JSON: {exc}") from exc
    if not isinstance(data, dict) or not isinstance(data.get("skills"), dict):
        raise RuntimeError("Registry braucht ein Objektfeld 'skills'.")
    result: dict[str, dict[str, Any]] = {}
    for name, entry in data["skills"].items():
        if not isinstance(name, str) or not isinstance(entry, dict):
            raise RuntimeError("Registry-Einträge müssen benannte Objekte sein.")
        if entry.get("name", name) != name:
            raise RuntimeError(f"Registry name mismatch für {name!r}.")
        source = entry.get("source")
        mode = entry.get("mode")
        rationale = entry.get("rationale")
        triggers = entry.get("triggers")
        if not isinstance(source, str) or not source or Path(source).is_absolute() or ".." in Path(source).parts:
            raise RuntimeError(f"{name}: source muss ein repo-relativer Pfad sein.")
        if not isinstance(mode, str) or mode not in VALID_MODES:
            raise RuntimeError(
                f"{name}: mode muss source-adapter, canonical-link, native-thread oder "
                "native-external-review sein."
            )
        if not isinstance(rationale, str) or not rationale.strip():
            raise RuntimeError(f"{name}: rationale darf nicht leer sein.")
        if not isinstance(triggers, list) or not triggers or any(
            not isinstance(trigger, str) or not trigger.strip() for trigger in triggers
        ):
            raise RuntimeError(f"{name}: triggers muss ein non-empty String-Array sein.")
        aliases = entry.get("trigger_aliases", {})
        if aliases is None:
            aliases = {}
        if not isinstance(aliases, dict) or any(
            not isinstance(k, str) or not isinstance(v, str) or not k.strip() or not v.strip()
            for k, v in aliases.items()
        ):
            raise RuntimeError(f"{name}: trigger_aliases muss ein String-zu-String-Objekt sein.")
        codex_notes = entry.get("codex_notes", [])
        if not isinstance(codex_notes, list) or any(
            not isinstance(note, str) or not note.strip() for note in codex_notes
        ):
            raise RuntimeError(f"{name}: codex_notes muss ein String-Array sein.")
        result[name] = dict(entry, trigger_aliases=aliases, codex_notes=codex_notes)
    return result


def inspect_sources(registry: dict[str, dict[str, Any]]) -> dict[str, tuple[Path, dict[str, Any]]]:
    """Validate and index canonical source skills plus native entries."""
    found: dict[str, tuple[Path, dict[str, Any]]] = {}
    duplicate_paths: set[str] = set()
    for path in source_files():
        sf = validate_skill_file(path)
        if not sf.ok:
            raise RuntimeError(f"Ungültige Source-SKILL.md {path}: {'; '.join(sf.errors)}")
        fm = parse_top_level_keys(extract_frontmatter(path.read_text(encoding="utf-8")) or [])
        name = fm.get("name", {}).get("raw", "").strip()
        if not name:
            raise RuntimeError(f"{path}: Frontmatter name fehlt.")
        if name in found:
            raise RuntimeError(f"Doppelter Source-Skillname: {name}")
        rel = path.relative_to(REPO_ROOT).as_posix()
        if rel in duplicate_paths:
            raise RuntimeError(f"Doppelter Source-Pfad: {rel}")
        duplicate_paths.add(rel)
        found[name] = (path, fm)
    source_names = set(found)
    registry_names = {
        name for name, entry in registry.items()
        if entry["mode"] != "native-external-review"
    }
    if source_names != registry_names:
        missing = sorted(source_names - registry_names)
        extra = sorted(registry_names - source_names)
        raise RuntimeError(f"Registrydeckung falsch (missing={missing}, extra={extra}).")
    for name, (path, fm) in found.items():
        entry = registry[name]
        rel = path.relative_to(REPO_ROOT).as_posix()
        if entry["source"] != rel:
            raise RuntimeError(f"{name}: Registry source {entry['source']!r} != {rel!r}.")
        if name in NATIVE_THREAD_SKILLS:
            expected_modes = {"native-thread"}
        else:
            expected_modes = {"source-adapter", "canonical-link"}
        if entry["mode"] not in expected_modes:
            raise RuntimeError(f"{name}: mode muss einer von {sorted(expected_modes)!r} sein.")
    for name in NATIVE_EXTERNAL_SKILLS:
        entry = registry.get(name)
        if entry is None:
            raise RuntimeError(f"Native External-Review fehlt in Registry: {name}")
        if entry["mode"] != "native-external-review":
            raise RuntimeError(f"{name}: mode muss 'native-external-review' sein.")
        expected = (CODEX_SKILLS_ROOT / name / "SKILL.md").relative_to(REPO_ROOT).as_posix()
        if entry["source"] != expected:
            raise RuntimeError(f"{name}: native source {entry['source']!r} != {expected!r}.")
    return found


def normalize_trigger(name: str, trigger: str, entry: dict[str, Any]) -> str:
    aliases = entry.get("trigger_aliases", {})
    normalized = aliases.get(trigger, trigger)
    return sanitize_description(normalized)


def adapter_description(name: str, source_description: str, entry: dict[str, Any]) -> str:
    base = sanitize_description(source_description)
    # The registry is the audited trigger inventory.  Remove the source's
    # free-form trigger tail before appending that inventory, avoiding duplicate
    # trigger lists and keeping long descriptions below Codex's hard limit.
    base = re.split(r"\bTrigger(?:-Worte)?:", base, maxsplit=1, flags=re.IGNORECASE)[0].rstrip(" .")
    triggers = []
    for trigger in entry["triggers"]:
        normalized = normalize_trigger(name, trigger, entry)
        if normalized and normalized not in triggers:
            triggers.append(normalized)
    suffix = "Trigger: " + ", ".join(json.dumps(t, ensure_ascii=False) for t in triggers)
    # Preserve every trigger deterministically even when a future source
    # description grows beyond the OpenAI 1024-character limit.
    if base:
        room = 1024 - len(suffix) - 2
        if room < 1:
            raise RuntimeError(f"{name}: Triggerliste überschreitet 1024 Zeichen.")
        base = base[:room].rstrip()
        result = f"{base}. {suffix}"
    else:
        result = suffix
    result = _collapse(result)
    stale = _has_stale_token(result)
    if stale:
        raise RuntimeError(f"{name}: stale Plattformtoken in Description: {stale!r}.")
    if not 1 <= len(result) <= 1024:
        raise RuntimeError(f"{name}: Description muss 1..1024 Zeichen lang sein.")
    return result


def render_adapter(name: str, entry: dict[str, Any], source_description: str) -> str:
    description = adapter_description(name, source_description, entry)
    source_path = f"{CANONICAL_REPO}/{entry['source']}"
    notes = entry.get("codex_notes", [])
    note_block = ""
    if notes:
        note_block = "\nCodex dependency map:\n" + "".join(f"- {note}\n" for note in notes)
    return (
        "---\n"
        f"name: {json.dumps(name, ensure_ascii=False)}\n"
        f"description: {json.dumps(description, ensure_ascii=False)}\n"
        "---\n\n"
        f"# {name} — Codex source adapter\n\n"
        "Read the complete canonical source file before acting:\n"
        f"`{source_path}`\n\n"
        "The source skill is authoritative for safety, scope, procedure, and completion. "
        "Do not copy or paraphrase source content into this adapter.\n\n"
        "Codex mapping:\n"
        "- Claude/Cockpit = current Codex coordinator.\n"
        "- Read/Bash = current file/terminal tools.\n"
        "- AskUserQuestion = normale Userfrage.\n"
        "- Never pretend that a missing tool exists.\n"
        "- Create new or background threads only when the user explicitly requests them.\n"
        "- Keep every source safety and completion requirement authoritative.\n"
        f"{note_block}"
    )


def _title(name: str) -> str:
    return " ".join(part.capitalize() for part in name.split("-"))


def render_manifest(name: str) -> str:
    display = f"Codex {_title(name)}"
    short = f"Codex adapter for the {name} skill"
    if not 25 <= len(short) <= 64:
        short = f"Run the {name} skill in Codex"
    if not 25 <= len(short) <= 64:  # defensive for unusually long future names
        short = (short[:64]).rstrip()
    default = f"Use ${name} for this task."
    return (
        "interface:\n"
        f"  display_name: {json.dumps(display, ensure_ascii=False)}\n"
        f"  short_description: {json.dumps(short, ensure_ascii=False)}\n"
        f"  default_prompt: {json.dumps(default, ensure_ascii=False)}\n"
    )


def expected_files(
    registry: dict[str, dict[str, Any]],
    sources: dict[str, tuple[Path, dict[str, Any]]],
) -> dict[Path, str]:
    files: dict[Path, str] = {}
    for name, entry in registry.items():
        if entry["mode"] != "source-adapter":
            continue
        _, fm = sources[name]
        source_description = fm.get("description", {}).get("raw", "").strip()
        adapter_dir = CODEX_SKILLS_ROOT / name
        files[adapter_dir / "SKILL.md"] = render_adapter(name, entry, source_description)
        files[adapter_dir / "agents" / "openai.yaml"] = render_manifest(name)
    return files


def native_paths(registry: dict[str, dict[str, Any]]) -> list[Path]:
    paths: list[Path] = []
    for name, entry in registry.items():
        if entry["mode"] in {"native-thread", "native-external-review"}:
            paths.extend((CODEX_SKILLS_ROOT / name / "SKILL.md", CODEX_SKILLS_ROOT / name / "agents" / "openai.yaml"))
    return paths


def _plain_scalar(raw: str) -> str:
    value = raw.strip()
    if len(value) >= 2 and value[0] == value[-1] == '"':
        try:
            parsed = json.loads(value)
        except json.JSONDecodeError:
            return value
        return parsed if isinstance(parsed, str) else value
    if len(value) >= 2 and value[0] == value[-1] == "'":
        return value[1:-1]
    return value


def validate_codex_skill(path: Path, expected_name: str) -> list[str]:
    """Validate the strict two-field frontmatter used by Codex adapters."""
    try:
        text = path.read_text(encoding="utf-8")
    except OSError as exc:
        return [f"nicht lesbar: {exc}"]
    frontmatter = extract_frontmatter(text)
    if frontmatter is None:
        return ["Frontmatter fehlt"]
    fields = parse_top_level_keys(frontmatter)
    errors: list[str] = []
    if set(fields) != {"name", "description"}:
        errors.append(f"Frontmatter-Keys {sorted(fields)} statt ['description', 'name']")
    name = _plain_scalar(fields.get("name", {}).get("raw", ""))
    if name != expected_name:
        errors.append(f"name {name!r} statt {expected_name!r}")
    description = _collapse(fields.get("description", {}).get("raw", ""))
    if not 1 <= len(description) <= 1024:
        errors.append("description muss 1..1024 Zeichen lang sein")
    if "<" in description or ">" in description:
        errors.append("description enthält ASCII-Winkelklammern")
    stale = _has_stale_token(description)
    if stale:
        errors.append(f"description enthält stale Plattformtoken {stale!r}")
    return errors


def validate_openai_manifest(path: Path, expected_name: str) -> list[str]:
    """Check the UI metadata shape without adding a YAML dependency."""
    try:
        text = path.read_text(encoding="utf-8")
    except OSError as exc:
        return [f"nicht lesbar: {exc}"]
    errors: list[str] = []
    if re.search(r"^interface:\s*$", text, re.MULTILINE) is None:
        errors.append("interface-Block fehlt")
    values: dict[str, str] = {}
    for line in text.splitlines():
        match = re.match(r"^\s{2}(display_name|short_description|default_prompt):\s*([\"'])(.*)\2\s*$", line)
        if match:
            values[match.group(1)] = match.group(3)
    for key in ("display_name", "short_description", "default_prompt"):
        if key not in values:
            errors.append(f"{key} fehlt oder ist nicht gequotet")
    short = values.get("short_description", "")
    if short and not 25 <= len(short) <= 64:
        errors.append("short_description muss 25..64 Zeichen lang sein")
    prompt = values.get("default_prompt", "")
    if prompt and f"${expected_name}" not in prompt:
        errors.append(f"default_prompt nennt ${expected_name} nicht")
    return errors


def canonical_bridge_target(entry: dict[str, Any]) -> str:
    canonical_dir = (REPO_ROOT / entry["source"]).parent
    return os.path.relpath(canonical_dir, CODEX_SKILLS_ROOT)


def validate_canonical_link(name: str, entry: dict[str, Any]) -> list[str]:
    errors: list[str] = []
    bridge = CODEX_SKILLS_ROOT / name
    expected_target = canonical_bridge_target(entry)
    if not bridge.is_symlink():
        return [f"repository bridge ist kein Symlink: {bridge}"]
    actual_target = os.readlink(bridge)
    if actual_target != expected_target:
        errors.append(f"repository bridge target {actual_target!r} statt {expected_target!r}")

    canonical_skill = REPO_ROOT / entry["source"]
    if not canonical_skill.is_file():
        errors.append(f"kanonische SKILL.md fehlt: {canonical_skill}")
        return errors
    if (bridge / "SKILL.md").resolve() != canonical_skill.resolve():
        errors.append("repository bridge loest nicht auf die kanonische SKILL.md auf")

    skill_result = validate_skill_file(canonical_skill)
    errors.extend(skill_result.errors)
    frontmatter = extract_frontmatter(canonical_skill.read_text(encoding="utf-8")) or []
    fields = parse_top_level_keys(frontmatter)
    if set(fields) != {"name", "description", "metadata"}:
        errors.append(f"kanonische Frontmatter-Keys {sorted(fields)} statt ['description', 'metadata', 'name']")
    if _plain_scalar(fields.get("name", {}).get("raw", "")) != name:
        errors.append(f"kanonischer name ist nicht {name!r}")
    description = _collapse(fields.get("description", {}).get("raw", ""))
    if not 1 <= len(description) <= 1024:
        errors.append("kanonische description muss 1..1024 Zeichen lang sein")

    manifest = canonical_skill.parent / "agents" / "openai.yaml"
    if not manifest.is_file():
        errors.append(f"kanonisches OpenAI manifest fehlt: {manifest}")
    else:
        errors.extend(validate_openai_manifest(manifest, name))
    return errors


def stale_adapter_paths(registry: dict[str, dict[str, Any]]) -> list[Path]:
    if not CODEX_SKILLS_ROOT.exists():
        return []
    names = set(registry)
    return sorted(
        path for path in CODEX_SKILLS_ROOT.iterdir() if path.name not in names
    )


def check_outputs(
    registry: dict[str, dict[str, Any]],
    sources: dict[str, tuple[Path, dict[str, Any]]],
    *,
    report_stale: bool = True,
) -> tuple[bool, list[Path]]:
    ok = True
    expected = expected_files(registry, sources)
    for path, content in expected.items():
        if not path.exists():
            print(f"MISSING generated: {path}")
            ok = False
        elif path.read_text(encoding="utf-8") != content:
            print(f"DRIFT generated: {path}")
            ok = False
    for path in native_paths(registry):
        if not path.exists():
            print(f"MISSING native file: {path}")
            ok = False
    for name in sorted(registry):
        entry = registry[name]
        if entry["mode"] == "canonical-link":
            for error in validate_canonical_link(name, entry):
                print(f"INVALID canonical link {name}: {error}")
                ok = False
            continue
        skill = CODEX_SKILLS_ROOT / name / "SKILL.md"
        manifest = CODEX_SKILLS_ROOT / name / "agents" / "openai.yaml"
        if skill.exists():
            for error in validate_codex_skill(skill, name):
                print(f"INVALID Codex skill {skill}: {error}")
                ok = False
        if manifest.exists():
            for error in validate_openai_manifest(manifest, name):
                print(f"INVALID OpenAI manifest {manifest}: {error}")
                ok = False
    stale = stale_adapter_paths(registry)
    if stale and report_stale:
        print("STALE adapter paths (not removed):")
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
    sources = inspect_sources(registry)
    expected = expected_files(registry, sources)
    native_missing = [path for path in native_paths(registry) if not path.exists()]
    stale = stale_adapter_paths(registry)
    if native_missing:
        for path in native_missing:
            print(f"MISSING native file: {path}")
        return 1
    native_invalid = False
    for name in sorted(NATIVE_SKILLS):
        skill = CODEX_SKILLS_ROOT / name / "SKILL.md"
        manifest = CODEX_SKILLS_ROOT / name / "agents" / "openai.yaml"
        for error in validate_codex_skill(skill, name):
            print(f"INVALID Codex skill {skill}: {error}")
            native_invalid = True
        for error in validate_openai_manifest(manifest, name):
            print(f"INVALID OpenAI manifest {manifest}: {error}")
            native_invalid = True
    if native_invalid:
        return 1
    if check:
        ok, _ = check_outputs(registry, sources)
        print("Codex adapter check: " + ("OK" if ok else "FAIL"))
        return 0 if ok else 1
    canonical_invalid = False
    for name, entry in sorted(registry.items()):
        if entry["mode"] != "canonical-link":
            continue
        for error in validate_canonical_link(name, entry):
            print(f"INVALID canonical link {name}: {error}")
            canonical_invalid = True
    if canonical_invalid:
        return 1
    if dry_run:
        for path, content in expected.items():
            state = "unchanged" if path.exists() and path.read_text(encoding="utf-8") == content else "write"
            print(f"DRY-RUN {state}: {path}")
        if stale:
            print("STALE adapter paths (not removed):")
            for path in stale:
                print(f"  {path}")
        return 0
    for path, content in expected.items():
        atomic_write(path, content)
    if stale:
        print("STALE adapter paths (not removed):")
        for path in stale:
            print(f"  {path}")
    print(f"Codex adapters written: {len(expected) // 2} skills ({len(expected)} files).")
    return 0


def _manifest_names(registry: dict[str, dict[str, Any]]) -> list[str]:
    return sorted(registry)


def installation_root() -> Path:
    raw_home = os.environ.get("HOME")
    if not raw_home:
        raise RuntimeError("HOME muss gesetzt sein.")
    home = Path(raw_home)
    if not home.is_absolute():
        raise RuntimeError(f"HOME muss absolut sein: {raw_home!r}")
    return home / ".agents" / "skills"


_DIRECTORY_OPEN_FLAGS = (
    os.O_RDONLY
    | getattr(os, "O_DIRECTORY", 0)
    | getattr(os, "O_NOFOLLOW", 0)
    | getattr(os, "O_CLOEXEC", 0)
)


def _open_directory_at(parent_fd: int, name: str, *, create: bool) -> int:
    """Open a child directory without following a symlink, creating it safely."""
    try:
        return os.open(name, _DIRECTORY_OPEN_FLAGS, dir_fd=parent_fd)
    except FileNotFoundError:
        if not create:
            raise
        try:
            os.mkdir(name, 0o755, dir_fd=parent_fd)
        except FileExistsError:
            # A concurrent creator won the race.  Re-open below with
            # O_NOFOLLOW so a concurrent symlink replacement fails closed.
            pass
        return os.open(name, _DIRECTORY_OPEN_FLAGS, dir_fd=parent_fd)


@contextlib.contextmanager
def _installation_dirfds(*, create: bool):
    """Hold HOME/.agents/skills as no-follow directory descriptors."""
    destination_root = installation_root()
    home_fd = os.open(str(destination_root.parent.parent), _DIRECTORY_OPEN_FLAGS)
    agents_fd: int | None = None
    skills_fd: int | None = None
    try:
        try:
            agents_fd = _open_directory_at(home_fd, ".agents", create=create)
        except FileNotFoundError:
            # Dry-run may inspect a fresh HOME without creating anything.
            yield destination_root, None
            return
        try:
            skills_fd = _open_directory_at(agents_fd, "skills", create=create)
        except FileNotFoundError:
            yield destination_root, None
            return
        yield destination_root, skills_fd
    finally:
        if skills_fd is not None:
            os.close(skills_fd)
        if agents_fd is not None:
            os.close(agents_fd)
        os.close(home_fd)


def _unlink_owned_link(parent_fd: int, target: str, inode: int, source: str) -> None:
    st = os.lstat(target, dir_fd=parent_fd)
    if st.st_ino == inode and stat.S_ISLNK(st.st_mode) and os.readlink(target, dir_fd=parent_fd) == source:
        os.unlink(target, dir_fd=parent_fd)


def _rollback_links(created: list[tuple[int, str, int, str]]) -> None:
    for parent_fd, target, inode, source in reversed(created):
        try:
            _unlink_owned_link(parent_fd, target, inode, source)
        except FileNotFoundError:
            pass
        except OSError:
            pass


def install(*, dry_run: bool = False) -> int:
    registry = load_registry()
    sources = inspect_sources(registry)
    # Installation must never start until every adapter (including native
    # files supplied by the native-thread executor) exists.
    output_ok, _ = check_outputs(registry, sources, report_stale=False)
    if not output_ok:
        print("Install abgebrochen: zuerst einen vollständigen Build ausführen.")
        return 1
    destination_root = installation_root()
    plans: list[tuple[str, Path, str]] = []
    conflicts: list[str] = []
    created: list[tuple[int, str, int, str]] = []
    rollback_fd: int | None = None
    try:
        with _installation_dirfds(create=not dry_run) as (destination_root, skills_fd):
            for name in _manifest_names(registry):
                source = CODEX_SKILLS_ROOT / name
                if skills_fd is None:
                    state = "create"
                else:
                    try:
                        target_stat = os.lstat(name, dir_fd=skills_fd)
                    except FileNotFoundError:
                        state = "create"
                    else:
                        if stat.S_ISLNK(target_stat.st_mode):
                            try:
                                link_target = os.readlink(name, dir_fd=skills_fd)
                                os.stat(name, dir_fd=skills_fd)
                            except OSError:
                                state = "conflict"
                            else:
                                state = "noop" if link_target == str(source) else "conflict"
                        else:
                            state = "conflict"
                if state == "conflict":
                    conflicts.append(str(destination_root / name))
                plans.append((name, source, state))
            if conflicts:
                print("Install preflight conflict — no links were created:")
                for target in conflicts:
                    print(f"  {target}")
                return 1
            if dry_run:
                for name, source, state in plans:
                    print(f"DRY-RUN {state}: {destination_root / name} -> {source}")
                return 0
            if skills_fd is None:  # pragma: no cover - create=True opens it
                raise RuntimeError("Installationspfad konnte nicht geöffnet werden.")
            # Keep one duplicate descriptor alive until the outer exception
            # handler has either rolled back every owned link or the install
            # has completed. The context manager closes its descriptor before
            # propagating an exception, so storing that original fd would make
            # rollback silently operate on a closed descriptor.
            rollback_fd = os.dup(skills_fd)
            fail_after: int | None = None
            if os.environ.get("RAPHAEL_CODEX_TESTING") == "1" and os.environ.get("RAPHAEL_CODEX_FAIL_AFTER") is not None:
                try:
                    fail_after = int(os.environ["RAPHAEL_CODEX_FAIL_AFTER"])
                except ValueError as exc:
                    raise RuntimeError("RAPHAEL_CODEX_FAIL_AFTER muss eine ganze Zahl sein.") from exc
                if fail_after < 0:
                    raise RuntimeError("RAPHAEL_CODEX_FAIL_AFTER darf nicht negativ sein.")
            writes = 0
            for name, source, state in plans:
                if state == "noop":
                    continue
                if fail_after is not None and writes >= fail_after:
                    raise RuntimeError(f"Test injection after {writes} link(s).")
                # Capture ownership on an unguessable staging symlink first, then
                # hard-link that symlink inode to the final name. os.link is
                # no-clobber, so a post-preflight race becomes EEXIST rather than
                # overwriting a user object. Ownership is known before final link.
                staging = f".codex-install-{name}-{uuid.uuid4().hex}"
                os.symlink(str(source), staging, dir_fd=skills_fd)
                staging_stat = os.lstat(staging, dir_fd=skills_fd)
                try:
                    created.append((rollback_fd, name, staging_stat.st_ino, str(source)))
                    try:
                        os.link(staging, name, src_dir_fd=skills_fd, dst_dir_fd=skills_fd, follow_symlinks=False)
                    except Exception:
                        created.pop()
                        raise
                    if (
                        os.environ.get("RAPHAEL_CODEX_TESTING") == "1"
                        and os.environ.get("RAPHAEL_CODEX_FAIL_POST_CREATE") == "1"
                        and writes == 0
                    ):
                        raise OSError("Test injection after owned final link creation.")
                finally:
                    try:
                        _unlink_owned_link(skills_fd, staging, staging_stat.st_ino, str(source))
                    except FileNotFoundError:
                        pass
                writes += 1
            if fail_after is not None and writes == fail_after and fail_after == 0:
                raise RuntimeError("Test injection after 0 link(s).")
    except Exception as exc:
        _rollback_links(created)
        print(f"Install failed; created links rolled back: {exc}", file=sys.stderr)
        return 1
    finally:
        if rollback_fd is not None:
            os.close(rollback_fd)
    print(f"Codex skills installed in {destination_root} ({len(created)} new, {len(plans) - len(created)} unchanged).")
    return 0


def parse_args(argv: list[str]) -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Build deterministic Codex source adapters and install no-clobber skill links."
    )
    parser.add_argument("command", nargs="?", choices=("build", "check", "install"), help="operation (default: build)")
    parser.add_argument("--build", action="store_true", help="explicitly select the build operation (the default)")
    parser.add_argument("--check", action="store_true", help="verify generated files without writing")
    parser.add_argument("--install", action="store_true", help="install manifest-name links under $HOME/.agents/skills")
    parser.add_argument("--dry-run", action="store_true", help="show actions without writing files or links")
    args = parser.parse_args(argv)
    if args.command == "check":
        args.check = True
    if args.command == "install":
        args.install = True
    if args.build and (args.check or args.install or args.command in {"check", "install"}):
        parser.error("--build cannot be combined with check or install")
    if args.command == "build" and args.check and args.install:
        parser.error("--check und --install sind nicht kombinierbar")
    if args.check and args.install:
        parser.error("--check und --install sind nicht kombinierbar")
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
