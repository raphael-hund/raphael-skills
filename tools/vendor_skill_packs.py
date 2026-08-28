#!/usr/bin/env python3
"""Deterministic, namespaced importer for external skill packages."""
from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import shutil
import stat
import subprocess
import sys
import tempfile
import uuid
from dataclasses import dataclass
from pathlib import Path, PurePosixPath
from typing import Any, Iterable


REPO_ROOT = Path(__file__).resolve().parent.parent
NAME_RE = re.compile(r"^[a-z][a-z0-9-]*$")
COMMIT_RE = re.compile(r"^[0-9a-f]{40}$")
SEMVER_RE = re.compile(r"^\d+\.\d+\.\d+$")
FORBIDDEN_PAYLOAD_DIRS = {".git", "node_modules", ".github", ".gitlab", ".circleci", "ci"}


@dataclass(frozen=True)
class PackSpec:
    source_label: str
    source_root: Path
    target_root: Path
    prefix: str
    expected_count: int


class ImportError(RuntimeError):
    pass


def build_name_map(skill_names: list[str], prefix: str) -> dict[str, str]:
    return {name: name if name.startswith(prefix) else f"{prefix}{name}" for name in skill_names}


def _reference_name_pattern(name: str) -> str:
    return re.escape(name)


def _replace_slash_command(text: str, source: str, target: str) -> str:
    pattern = rf"(?<![A-Za-z0-9_./:~-])/{_reference_name_pattern(source)}(?![A-Za-z0-9_/-])"
    return re.sub(pattern, f"/{target}", text)


def _replace_skill_path(text: str, source: str, target: str) -> str:
    escaped = _reference_name_pattern(source)
    text = re.sub(
        rf"(?<![A-Za-z0-9_/:~-])(?P<package>(?:(?:[A-Za-z0-9_-][A-Za-z0-9_.-]*/|\./|\.\./))*)skills/{escaped}(?=[/?#)\]`'\"\s]|$)",
        rf"\g<package>skills/{target}",
        text,
    )
    text = re.sub(
        rf"(?P<prefix>(?:\.\./|\./)+){escaped}(?=/)",
        rf"\g<prefix>{target}",
        text,
    )
    text = re.sub(
        rf"(?<![A-Za-z0-9_./:~-]){escaped}(?=/SKILL\.md(?:[)#\]`'\"\s]|$))",
        target,
        text,
    )
    return text


def _replace_agent_path(text: str, source: str, target: str) -> str:
    escaped = _reference_name_pattern(source)
    return re.sub(
        rf"(?<![A-Za-z0-9_/:~-])(?P<package>(?:(?:[A-Za-z0-9_-][A-Za-z0-9_.-]*/|\./|\.\./))*)agents/{escaped}(?=\.md(?:[?#)\]`'\"\s]|$))",
        rf"\g<package>agents/{target}",
        text,
    )


def _replace_agent_id(text: str, source: str, target: str) -> str:
    escaped = _reference_name_pattern(source)
    # Only rewrite values of structured agent fields. In particular, agent
    # names in prose, URLs, or absolute paths are not package-owned references.
    return re.sub(
        rf"(?P<prefix>(?<![A-Za-z0-9_-])['\"]?(?:subagent_type|agent_type|agent_name|agent_id|agent)['\"]?\s*[:=]\s*['\"]?){escaped}(?P<suffix>(?![A-Za-z0-9_-]))",
        rf"\g<prefix>{target}",
        text,
    )


def rewrite_references(text: str, name_map: dict[str, str]) -> str:
    """Rewrite active internal commands, links, and agent identifiers.

    The command matcher deliberately requires a command boundary. This keeps
    an external URL such as ``https://example.test/tdd`` and a local path such
    as ``/root/tdd`` unchanged.
    """
    rewritten = text
    for source, target in sorted(name_map.items(), key=lambda item: len(item[0]), reverse=True):
        if not isinstance(source, str) or not isinstance(target, str):
            continue
        if not re.fullmatch(r"[A-Za-z0-9][A-Za-z0-9_-]*", source):
            continue
        if not re.fullmatch(r"[A-Za-z0-9][A-Za-z0-9_-]*", target):
            raise ImportError(f"unsafe namespaced target: {target!r}")
        if source not in rewritten:
            continue
        rewritten = _replace_slash_command(rewritten, source, target)
        rewritten = _replace_skill_path(rewritten, source, target)
        rewritten = _replace_agent_path(rewritten, source, target)
        rewritten = _replace_agent_id(rewritten, source, target)
    return rewritten


def _absolute_target(path: Path) -> Path:
    return path if path.is_absolute() else REPO_ROOT / path


def _assert_directory(path: Path, label: str) -> None:
    if path.is_symlink():
        raise ImportError(f"{label} must not be a symlink: {path}")
    if not path.exists() or not path.is_dir():
        raise ImportError(f"{label} must be a directory: {path}")


def _assert_regular_file(path: Path, label: str) -> None:
    if path.is_symlink() or not path.is_file():
        raise ImportError(f"{label} must be a regular file: {path}")


def _assert_no_symlink_components(root: Path, label: str) -> None:
    _assert_directory(root, label)
    for current, dirs, files in os.walk(root, topdown=True, followlinks=False):
        current_path = Path(current)
        for name in [*dirs, *files]:
            candidate = current_path / name
            if candidate.is_symlink():
                raise ImportError(f"symlinked {label} component is not allowed: {candidate}")


def _assert_safe_path_components(path: Path, label: str) -> None:
    absolute = path if path.is_absolute() else path.absolute()
    current = Path(absolute.anchor)
    for part in absolute.parts[1:]:
        current /= part
        if current.is_symlink():
            raise ImportError(f"{label} contains a symlinked component: {current}")
        if current.exists() and not current.is_dir() and current != absolute:
            raise ImportError(f"{label} contains a non-directory component: {current}")


def _source_skill_root(source_root: Path) -> Path:
    candidate = source_root / "skills"
    if candidate.exists():
        _assert_no_symlink_components(candidate, "source skills root")
        return candidate
    _assert_no_symlink_components(source_root, "source root")
    return source_root


def _frontmatter_parts(text: str) -> tuple[list[str], str]:
    lines = text.splitlines(keepends=True)
    if not lines or lines[0].strip() != "---":
        raise ImportError("source SKILL.md has no YAML frontmatter")
    for index in range(1, len(lines)):
        if lines[index].strip() == "---":
            return [line.rstrip("\r\n") for line in lines[1:index]], "".join(lines[index + 1 :])
    raise ImportError("source SKILL.md has an unterminated YAML frontmatter")


def _parse_frontmatter(text: str) -> tuple[dict[str, Any], str]:
    lines, body = _frontmatter_parts(text)
    fields: dict[str, Any] = {}
    index = 0
    while index < len(lines):
        line = lines[index]
        match = re.match(r"^([A-Za-z_][A-Za-z0-9_-]*):\s*(.*)$", line)
        if not match:
            index += 1
            continue
        key, raw = match.groups()
        index += 1
        if raw in {"", ">", ">-", "|", "|-"}:
            block: list[str] = []
            while index < len(lines) and (not lines[index].strip() or lines[index][0].isspace()):
                block.append(lines[index].strip())
                index += 1
            fields[key] = {"raw": raw, "block": block}
        else:
            fields[key] = {"raw": raw, "block": []}
    return fields, body


def _unquote(value: str) -> str:
    value = value.strip()
    if len(value) >= 2 and value[0] == value[-1] and value[0] in {"'", '"'}:
        if value[0] == '"':
            try:
                parsed = json.loads(value)
                return parsed if isinstance(parsed, str) else value[1:-1]
            except json.JSONDecodeError:
                return value[1:-1]
        return value[1:-1].replace("''", "'")
    return value


def _field_value(fields: dict[str, Any], key: str, default: str = "") -> str:
    field = fields.get(key)
    if not isinstance(field, dict):
        return default
    raw = str(field.get("raw", ""))
    if raw in {"", ">", ">-", "|", "|-"}:
        return " ".join(str(line) for line in field.get("block", []) if str(line).strip()).strip() or default
    return _unquote(raw) or default


def _completion_criteria(fields: dict[str, Any]) -> list[str]:
    field = fields.get("completion_criteria")
    portable_value = _metadata_fields(fields).get("raphael-completion-criteria")
    if portable_value:
        field = {"raw": portable_value, "block": []}
    if not isinstance(field, dict):
        return ["Imported source content is preserved"]
    raw = str(field.get("raw", "")).strip()
    if raw.startswith("[") and raw.endswith("]"):
        try:
            parsed = json.loads(raw)
            if isinstance(parsed, list) and all(isinstance(item, str) and item for item in parsed):
                return parsed
        except json.JSONDecodeError:
            pass
    block = [str(line).strip() for line in field.get("block", []) if str(line).strip()]
    if block:
        values = [re.sub(r"^-\s*", "", line).strip() for line in block]
        values = [_unquote(value) for value in values if value]
        if values:
            return values
    value = _unquote(raw)
    return [value] if value else ["Imported source content is preserved"]


def _description(fields: dict[str, Any], target_name: str) -> str:
    description = re.sub(r"\s+", " ", _field_value(fields, "description", "Imported vendor skill")).strip()
    description = re.split(r"\bTrigger(?:-Worte)?:", description, maxsplit=1, flags=re.IGNORECASE)[0].rstrip(" .")
    trigger = f'Trigger: "/{target_name}"'
    return f"{description}. {trigger}" if description else trigger


def _render_skill(text: str, target_name: str, overlay: dict[str, str]) -> str:
    fields, body = _parse_frontmatter(text)
    portable = _metadata_fields(fields)
    version = overlay.get("version") or overlay.get("raphael-version") or portable.get("raphael-version") or _field_value(fields, "version", "0.1.0")
    if not SEMVER_RE.fullmatch(version):
        version = "0.1.0"
    skill_class = overlay.get("class") or overlay.get("raphael-class") or portable.get("raphael-class") or _field_value(fields, "class", "M") or "M"
    scope = overlay.get("scope") or overlay.get("raphael-scope") or portable.get("raphael-scope") or _field_value(fields, "scope", "global") or "global"
    sensitivity = overlay.get("sensitivity") or overlay.get("raphael-sensitivity") or portable.get("raphael-sensitivity") or _field_value(fields, "sensitivity", "public") or "public"
    description = overlay.get("description") or _description(fields, target_name)
    criteria = _completion_criteria(fields)
    metadata = {
        "raphael-version": version,
        "raphael-class": skill_class,
        "raphael-scope": scope,
        "raphael-sensitivity": sensitivity,
        "raphael-completion-criteria": json.dumps(criteria, ensure_ascii=False),
    }
    frontmatter = ["---", f"name: {target_name}", f"description: {json.dumps(description, ensure_ascii=False)}", "metadata:"]
    frontmatter.extend(f"  {key}: {json.dumps(value, ensure_ascii=False)}" for key, value in metadata.items())
    frontmatter.append("---")
    rendered = "\n".join(frontmatter) + "\n"
    if body:
        rendered += body if body.startswith("\n") else "\n" + body
    return rendered


def normalize_skill(source: Path, target: Path, target_name: str, source_label: str, overlay: dict[str, str]) -> None:
    """Write one source skill as a portable Raphael ``SKILL.md``."""
    del source_label
    if not NAME_RE.fullmatch(target_name):
        raise ImportError(f"unsafe target skill name: {target_name!r}")
    _assert_regular_file(source, "source skill")
    if target.exists() and target.is_symlink():
        raise ImportError(f"target skill must not be a symlink: {target}")
    target.mkdir(parents=True, exist_ok=True)
    _assert_directory(target, "target skill")
    rendered = _render_skill(source.read_text(encoding="utf-8"), target_name, dict(overlay))
    (target / "SKILL.md").write_text(rendered, encoding="utf-8")


def _discover_skills(spec: PackSpec) -> list[tuple[str, Path, str]]:
    if not spec.prefix or not spec.prefix.endswith("-"):
        raise ImportError(f"prefix must be a non-empty hyphenated namespace: {spec.prefix!r}")
    if spec.expected_count < 1:
        raise ImportError("expected_count must be positive")
    source_root = spec.source_root.expanduser()
    _assert_directory(source_root, "source root")
    skills_root = _source_skill_root(source_root)
    candidates: list[Path] = []
    for child in sorted(skills_root.iterdir(), key=lambda path: path.name):
        if child.is_symlink():
            raise ImportError(f"symlinked source skill is not allowed: {child}")
        if child.is_dir() and (child / "SKILL.md").is_file():
            candidates.append(child)
    if not candidates and (skills_root / "SKILL.md").is_file():
        candidates = [skills_root]
    if len(candidates) != spec.expected_count:
        raise ImportError(f"expected {spec.expected_count} skills, found {len(candidates)}")
    found: list[tuple[str, Path, str]] = []
    original_names: set[str] = set()
    for skill_dir in candidates:
        _assert_no_symlink_components(skill_dir, "source skill")
        source_file = skill_dir / "SKILL.md"
        _assert_regular_file(source_file, "source SKILL.md")
        fields, _ = _parse_frontmatter(source_file.read_text(encoding="utf-8"))
        declared_name = _field_value(fields, "name")
        original_name = skill_dir.name
        if not NAME_RE.fullmatch(original_name):
            raise ImportError(f"invalid source skill identity {declared_name!r}: {source_file}")
        if original_name in original_names:
            raise ImportError(f"duplicate source skill name: {original_name}")
        original_names.add(original_name)
        found.append((original_name, skill_dir, skill_dir.relative_to(source_root).as_posix()))
    return sorted(found, key=lambda item: item[0])


def _copy_payload(source_dir: Path, target_dir: Path, name_map: dict[str, str]) -> None:
    target_dir.mkdir(parents=True, exist_ok=False)
    for current, dirs, files in os.walk(source_dir, topdown=True, followlinks=False):
        current_path = Path(current)
        dirs.sort()
        files.sort()
        for directory in list(dirs):
            candidate = current_path / directory
            if candidate.is_symlink():
                raise ImportError(f"symlinked source component is not allowed: {candidate}")
            if directory in FORBIDDEN_PAYLOAD_DIRS:
                raise ImportError(f"forbidden source payload directory: {candidate}")
        for filename in files:
            source_file = current_path / filename
            if source_file.is_symlink():
                raise ImportError(f"symlinked source component is not allowed: {source_file}")
            if filename == "SKILL.md" and current_path == source_dir:
                continue
            relative = source_file.relative_to(source_dir)
            target_file = target_dir / relative
            target_file.parent.mkdir(parents=True, exist_ok=True)
            data = source_file.read_bytes()
            try:
                decoded = data.decode("utf-8")
            except UnicodeDecodeError:
                target_file.write_bytes(data)
            else:
                target_file.write_text(rewrite_references(decoded, name_map), encoding="utf-8")
            shutil.copystat(source_file, target_file, follow_symlinks=False)


def _sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def _source_url(source_root: Path, source_label: str) -> str:
    try:
        result = subprocess.run(
            ["git", "-C", str(source_root), "config", "--get", "remote.origin.url"],
            check=False,
            capture_output=True,
            text=True,
            timeout=10,
        )
    except (OSError, subprocess.TimeoutExpired):
        return source_label
    value = result.stdout.strip()
    return value or source_label


def _license(source_root: Path) -> str:
    for candidate in ("LICENSE", "LICENSE.md", "LICENSE.txt", "COPYING"):
        path = source_root / candidate
        if not path.is_file() or path.is_symlink():
            continue
        text = path.read_text(encoding="utf-8", errors="ignore")[:10000]
        if "MIT License" in text or "Permission is hereby granted, free of charge" in text:
            return "MIT"
        if "Apache License" in text and "Version 2.0" in text:
            return "Apache-2.0"
        if "GNU GENERAL PUBLIC LICENSE" in text:
            return "GPL"
        return "UNKNOWN"
    return "UNKNOWN"


def _validate_link_targets(package_root: Path) -> None:
    link_pattern = re.compile(r"!?(?:\[[^\]]*\])\(([^)]+)\)")
    for markdown in sorted(package_root.rglob("*.md")):
        text = markdown.read_text(encoding="utf-8")
        for match in link_pattern.finditer(text):
            raw_target = match.group(1).strip()
            placeholder = raw_target in {"<permalink>", "<url>", "url"}
            if raw_target.startswith("<") and ">" in raw_target:
                raw_target = raw_target[1 : raw_target.index(">")]
            target = raw_target.split(None, 1)[0] if raw_target else ""
            if placeholder:
                continue
            if not target or target.startswith(("#", "//", "/")):
                if target.startswith("/") and not target.startswith("//"):
                    raise ImportError(f"absolute local link is not allowed: {markdown}: {target}")
                continue
            if re.match(r"^[A-Za-z][A-Za-z0-9+.-]*:", target):
                continue
            target_path = (markdown.parent / target.split("#", 1)[0].split("?", 1)[0]).resolve()
            try:
                target_path.relative_to(package_root.resolve())
            except ValueError as exc:
                raise ImportError(f"local link leaves imported package: {markdown}: {target}") from exc
            if not target_path.exists():
                raise ImportError(f"local link does not resolve: {markdown}: {target}")


def _validate_generated_package(package_root: Path, spec: PackSpec, manifest: dict[str, Any]) -> None:
    if package_root.is_symlink() or not package_root.is_dir():
        raise ImportError(f"staging package is not a safe directory: {package_root}")
    skill_entries = manifest.get("skills")
    if not isinstance(skill_entries, list) or len(skill_entries) != spec.expected_count:
        raise ImportError("source manifest skill count mismatch")
    target_names: set[str] = set()
    for entry in skill_entries:
        if not isinstance(entry, dict):
            raise ImportError("source manifest contains a malformed skill entry")
        target_name = entry.get("target_name")
        if not isinstance(target_name, str) or not NAME_RE.fullmatch(target_name):
            raise ImportError(f"source manifest contains an unsafe target name: {target_name!r}")
        if target_name in target_names:
            raise ImportError(f"duplicate generated target name: {target_name}")
        target_names.add(target_name)
        skill_file = package_root / target_name / "SKILL.md"
        _assert_regular_file(skill_file, "generated SKILL.md")
        fields, _ = _parse_frontmatter(skill_file.read_text(encoding="utf-8"))
        if _field_value(fields, "name") != target_name:
            raise ImportError(f"generated name mismatch: {skill_file}")
        if not _field_value(fields, "description") or "Trigger:" not in _field_value(fields, "description"):
            raise ImportError(f"generated description is missing Trigger: {skill_file}")
        metadata = _metadata_fields(fields)
        required = {
            "raphael-version",
            "raphael-class",
            "raphael-scope",
            "raphael-sensitivity",
            "raphael-completion-criteria",
        }
        if not required.issubset(metadata):
            raise ImportError(f"generated Raphael metadata is incomplete: {skill_file}")
        if not SEMVER_RE.fullmatch(metadata["raphael-version"]):
            raise ImportError(f"generated version is invalid: {skill_file}")
        try:
            criteria = json.loads(metadata["raphael-completion-criteria"])
        except json.JSONDecodeError as exc:
            raise ImportError(f"generated completion criteria is invalid: {skill_file}") from exc
        if not isinstance(criteria, list) or not criteria or any(not isinstance(item, str) or not item for item in criteria):
            raise ImportError(f"generated completion criteria is invalid: {skill_file}")
        if entry.get("target_sha256") != _sha256(skill_file):
            raise ImportError(f"target hash mismatch: {skill_file}")
    actual_dirs = {path.name for path in package_root.iterdir() if path.is_dir()}
    if actual_dirs != target_names:
        raise ImportError(f"staging package contains unexpected directories: {sorted(actual_dirs - target_names)}")
    _validate_link_targets(package_root)


def _metadata_fields(fields: dict[str, Any]) -> dict[str, str]:
    metadata: dict[str, str] = {}
    container = fields.get("metadata")
    if not isinstance(container, dict):
        return metadata
    for line in container.get("block", []):
        match = re.match(r"^\s*(raphael-[A-Za-z0-9_-]+):\s*(.*)$", str(line))
        if match:
            metadata[match.group(1)] = _unquote(match.group(2))
    return metadata


def _staging_dir() -> Path:
    parent = Path(os.environ.get("TMPDIR") or "/tmp")
    _assert_safe_path_components(parent, "temporary directory")
    _assert_directory(parent, "temporary directory")
    run_dir = Path(tempfile.mkdtemp(prefix=f"raphael-skill-import-{os.getuid()}-", dir=str(parent)))
    try:
        os.chmod(run_dir, stat.S_IRWXU)
    except Exception:
        shutil.rmtree(run_dir)
        raise
    return run_dir


def _build_staged_pack(spec: PackSpec, source_commit: str) -> tuple[Path, dict[str, Any], Path]:
    if not COMMIT_RE.fullmatch(source_commit):
        raise ImportError("source commit must be an exact 40-character hexadecimal commit")
    _verify_source_commit(spec, source_commit)
    discovered = _discover_skills(spec)
    source_names = [item[0] for item in discovered]
    name_map = build_name_map(source_names, spec.prefix)
    if len(set(name_map.values())) != len(name_map):
        raise ImportError("source names produce a namespace collision")
    target_root = _absolute_target(spec.target_root)
    _assert_safe_path_components(target_root.parent, "target root")
    staging_root = _staging_dir()
    try:
        staged_package = staging_root / target_root.name
        staged_package.mkdir()
        source_url = _source_url(spec.source_root, spec.source_label)
        license_name = _license(spec.source_root)
        reference_names = source_names + [f"{name[:-5]}-agent" for name in source_names if name.endswith("-mode")]
        name_map = build_name_map(reference_names, spec.prefix)
        entries: list[dict[str, Any]] = []
        for original_name, source_dir, source_relative in discovered:
            target_name = name_map[original_name]
            target_dir = staged_package / target_name
            _copy_payload(source_dir, target_dir, name_map)
            source_file = source_dir / "SKILL.md"
            rewritten_source = rewrite_references(source_file.read_text(encoding="utf-8"), name_map)
            rendered = _render_skill(
                rewritten_source,
                target_name,
                {"class": "M", "scope": "global", "sensitivity": "public"},
            )
            (target_dir / "SKILL.md").write_text(rendered, encoding="utf-8")
            entries.append(
                {
                    "source_path": f"{source_relative}/SKILL.md",
                    "source_sha256": _sha256(source_file),
                    "original_name": original_name,
                    "target_name": target_name,
                    "target_path": f"{target_name}/SKILL.md",
                    "target_sha256": _sha256(target_dir / "SKILL.md"),
                    "version": _metadata_fields(_parse_frontmatter(rendered)[0]).get("raphael-version", "0.1.0"),
                    "description": _field_value(_parse_frontmatter(rendered)[0], "description"),
                    "source_commit": source_commit,
                    "source_url": source_url,
                    "license": license_name,
                }
            )
        entries.sort(key=lambda entry: entry["original_name"])
        manifest = {
            "schema_version": 1,
            "source_label": spec.source_label,
            "source_commit": source_commit,
            "source_url": source_url,
            "license": license_name,
            "expected_count": spec.expected_count,
            "skills": entries,
        }
        manifest_path = staged_package / "source-manifest.json"
        manifest_path.write_text(json.dumps(manifest, indent=2, ensure_ascii=False, sort_keys=True) + "\n", encoding="utf-8")
        _validate_generated_package(staged_package, spec, manifest)
        _verify_source_commit(spec, source_commit)
        return staged_package, manifest, staging_root
    except Exception:
        if staging_root.exists():
            shutil.rmtree(staging_root)
        raise


def _existing_target_is_owned(target_root: Path, source_label: str) -> None:
    if not target_root.exists():
        return
    if target_root.is_symlink() or not target_root.is_dir():
        raise ImportError(f"target package is not a safe directory: {target_root}")
    manifest_path = target_root / "source-manifest.json"
    _assert_regular_file(manifest_path, "existing target manifest")
    try:
        existing = json.loads(manifest_path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as exc:
        raise ImportError(f"existing target manifest is invalid: {manifest_path}") from exc
    if existing.get("source_label") != source_label:
        raise ImportError(f"refusing to replace foreign target package: {target_root}")


def _replace_staged_package(staged_package: Path, target_root: Path, source_label: str) -> Path | None:
    target_root = _absolute_target(target_root)
    target_root.parent.mkdir(parents=True, exist_ok=True)
    _assert_safe_path_components(target_root.parent, "target root")
    _existing_target_is_owned(target_root, source_label)
    backup: Path | None = None
    if target_root.exists():
        backup = target_root.parent / f".{target_root.name}.raphael-old-{uuid.uuid4().hex}"
        os.replace(target_root, backup)
    try:
        os.replace(staged_package, target_root)
    except Exception:
        if backup is not None and not target_root.exists():
            os.replace(backup, target_root)
        raise
    return backup


def _discard_package_backup(backup: Path | None) -> None:
    if backup is not None:
        shutil.rmtree(backup)


def _rollback_package_replacement(target_root: Path, backup: Path | None) -> None:
    target_root = _absolute_target(target_root)
    if target_root.exists():
        if target_root.is_symlink() or not target_root.is_dir():
            raise ImportError(f"cannot roll back unsafe target package: {target_root}")
        shutil.rmtree(target_root)
    if backup is not None:
        os.replace(backup, target_root)


def _install_staged(staged_package: Path, target_root: Path, source_label: str) -> None:
    backup = _replace_staged_package(staged_package, target_root, source_label)
    _discard_package_backup(backup)


def import_pack(spec: PackSpec, source_commit: str) -> dict:
    staged_package, manifest, staging_root = _build_staged_pack(spec, source_commit)
    try:
        _install_staged(staged_package, _absolute_target(spec.target_root), spec.source_label)
    finally:
        if staging_root.exists():
            shutil.rmtree(staging_root)
    result = dict(manifest)
    result["target_root"] = str(_absolute_target(spec.target_root))
    return result


def _registry_path(name: str) -> Path:
    locations = {
        "index": REPO_ROOT / "index.json",
        "codex": REPO_ROOT / "codex" / "compatibility.json",
        "claude": REPO_ROOT / "claude" / "compatibility.json",
        "kimi": REPO_ROOT / "kimi" / "compatibility.json",
    }
    return locations[name]


def _read_registry(path: Path) -> dict[str, Any]:
    _assert_regular_file(path, "registry")
    try:
        value = json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as exc:
        raise ImportError(f"registry is not valid JSON: {path}") from exc
    if not isinstance(value, dict):
        raise ImportError(f"registry must be a JSON object: {path}")
    return value


def _safe_registry_source(value: Any, name: str) -> str:
    if not isinstance(value, str) or not value:
        raise ImportError(f"{name}: registry source must be repo-relative")
    if (
        "\\" in value
        or value.startswith(("/", "~"))
        or re.match(r"^[A-Za-z]:", value)
        or re.match(r"^[A-Za-z][A-Za-z0-9+.-]*:", value)
    ):
        raise ImportError(f"{name}: registry source must be repo-relative")
    raw_parts = value.split("/")
    path = PurePosixPath(value)
    if path.is_absolute() or any(part in {"", ".", ".."} for part in raw_parts):
        raise ImportError(f"{name}: registry source must be repo-relative")
    return value


def _unique_entries(entries: Iterable[dict[str, Any]], *, target_key: str = "name") -> list[dict[str, Any]]:
    result: list[dict[str, Any]] = []
    seen: set[str] = set()
    for raw in entries:
        if not isinstance(raw, dict):
            raise ImportError("registry entry must be an object")
        name = raw.get(target_key) or raw.get("target_name")
        if not isinstance(name, str) or not NAME_RE.fullmatch(name):
            raise ImportError(f"registry entry has an unsafe name: {name!r}")
        if name in seen:
            continue
        seen.add(name)
        entry = dict(raw)
        entry["name"] = name
        result.append(entry)
    return result


def _atomic_json_write(path: Path, value: dict[str, Any]) -> None:
    _assert_safe_path_components(path.parent, "registry path")
    if path.exists() and path.is_symlink():
        raise ImportError(f"registry must not be a symlink: {path}")
    fd, temporary = tempfile.mkstemp(prefix=f".{path.name}.", suffix=".tmp", dir=str(path.parent))
    try:
        with os.fdopen(fd, "w", encoding="utf-8") as stream:
            json.dump(value, stream, indent=2, ensure_ascii=False)
            stream.write("\n")
        os.replace(temporary, path)
    except Exception:
        try:
            os.unlink(temporary)
        except FileNotFoundError:
            pass
        raise


def _atomic_bytes_write(path: Path, value: bytes) -> None:
    _assert_safe_path_components(path.parent, "registry path")
    if path.exists() and path.is_symlink():
        raise ImportError(f"registry must not be a symlink: {path}")
    fd, temporary = tempfile.mkstemp(prefix=f".{path.name}.", suffix=".tmp", dir=str(path.parent))
    try:
        with os.fdopen(fd, "wb") as stream:
            stream.write(value)
        os.replace(temporary, path)
    except Exception:
        try:
            os.unlink(temporary)
        except FileNotFoundError:
            pass
        raise


def update_registries(index_entries: list[dict], namespaced_entries: list[dict]) -> None:
    """Add new names to all runtime registries without overwriting existing names."""
    index = _read_registry(_registry_path("index"))
    codex = _read_registry(_registry_path("codex"))
    claude = _read_registry(_registry_path("claude"))
    kimi = _read_registry(_registry_path("kimi"))
    if not isinstance(index.get("skills"), list):
        raise ImportError("index registry needs a skills array")
    if not isinstance(codex.get("skills"), dict):
        raise ImportError("Codex registry needs a skills object")
    if not isinstance(kimi.get("skills"), dict):
        raise ImportError("Kimi registry needs a skills object")
    if not isinstance(claude.get("expected_count"), int):
        raise ImportError("Claude registry needs an integer expected_count")

    incoming_index = _unique_entries(index_entries)
    incoming_runtime = _unique_entries(namespaced_entries)
    existing_index_names = {entry.get("name") for entry in index["skills"] if isinstance(entry, dict)}
    existing_runtime_names = set(codex["skills"]) | set(kimi["skills"])
    index_additions: list[dict[str, Any]] = []
    for entry in incoming_index:
        name = entry["name"]
        if name in existing_index_names:
            continue
        path = _safe_registry_source(entry.get("path") or entry.get("source"), name)
        index_additions.append(
            {
                "name": name,
                "version": str(entry.get("version", "0.1.0")),
                "path": path,
                "description": str(entry.get("description", f'Trigger: "/{name}"')),
            }
        )
    runtime_additions: list[dict[str, Any]] = []
    for entry in incoming_runtime:
        name = entry["name"]
        if name in existing_runtime_names:
            continue
        source = _safe_registry_source(entry.get("source") or entry.get("path"), name)
        mode = entry.get("mode", "source-adapter")
        if not isinstance(mode, str) or not mode:
            raise ImportError(f"{name}: runtime mode must be a non-empty string")
        rationale = entry.get("rationale") or f"Expose namespaced vendor skill {name}."
        triggers = entry.get("triggers") or [f"/{name}"]
        if not isinstance(rationale, str) or not rationale.strip():
            raise ImportError(f"{name}: runtime rationale must not be empty")
        if not isinstance(triggers, list) or not triggers or any(not isinstance(trigger, str) or not trigger.strip() for trigger in triggers):
            raise ImportError(f"{name}: runtime triggers must be a non-empty string array")
        runtime_additions.append(
            {
                "name": name,
                "source": source,
                "mode": mode,
                "rationale": rationale,
                "triggers": list(dict.fromkeys(triggers)),
            }
        )

    new_index = dict(index)
    new_index["skills"] = list(index["skills"]) + index_additions
    new_index["skill_count"] = len(new_index["skills"])
    new_codex = dict(codex)
    new_codex["skills"] = dict(codex["skills"])
    new_kimi = dict(kimi)
    new_kimi["skills"] = dict(kimi["skills"])
    for entry in runtime_additions:
        name = entry["name"]
        codex_entry = {key: value for key, value in entry.items() if key != "name"}
        new_codex["skills"][name] = codex_entry
        new_kimi["skills"][name] = {"source": entry["source"], "mode": entry["mode"]}
    new_claude = dict(claude)
    new_claude["expected_count"] = len(new_codex["skills"])

    changes = [
        (_registry_path("index"), index, new_index),
        (_registry_path("codex"), codex, new_codex),
        (_registry_path("claude"), claude, new_claude),
        (_registry_path("kimi"), kimi, new_kimi),
    ]
    originals = {path: path.read_bytes() for path, old, new in changes if new != old}
    try:
        for path, old, new in changes:
            if new != old:
                _atomic_json_write(path, new)
    except Exception:
        for path, original in reversed(list(originals.items())):
            _atomic_bytes_write(path, original)
        raise


# Vendored packs live under vendor-packs/ because skills/ is root-owned and
# this process cannot write there.
def _known_specs(source_override: Path | None = None) -> dict[str, PackSpec]:
    return {
        "compound-engineering": PackSpec(
            "compound-engineering",
            source_override or Path("/root/.cursor/plugins/local/compound-engineering"),
            REPO_ROOT / "vendor-packs/compound-engineering",
            "ce-",
            33,
        ),
        "pstack": PackSpec(
            "pstack",
            source_override or Path("/root/tools/vendor/coding-slop-cursor-plugins/pstack"),
            REPO_ROOT / "vendor-packs/pstack",
            "pstack-",
            44,
        ),
    }


def _git_source_top_level(source: Path) -> Path:
    try:
        result = subprocess.run(
            ["git", "-C", str(source), "rev-parse", "--show-toplevel"],
            check=False,
            capture_output=True,
            text=True,
            timeout=10,
        )
    except (OSError, subprocess.TimeoutExpired) as exc:
        raise ImportError(f"could not locate source repository: {source}") from exc
    if result.returncode != 0 or not result.stdout.strip():
        raise ImportError(f"could not locate source repository: {source}")
    return Path(result.stdout.strip())


def _working_imported_files(source: Path, skill_dirs: list[Path], repository_root: Path) -> dict[str, Path]:
    files: dict[str, Path] = {}
    for skill_dir in skill_dirs:
        for current, dirs, filenames in os.walk(skill_dir, topdown=True, followlinks=False):
            current_path = Path(current)
            dirs.sort()
            filenames.sort()
            for name in [*dirs, *filenames]:
                candidate = current_path / name
                mode = candidate.lstat().st_mode
                if stat.S_ISLNK(mode):
                    raise ImportError(f"symlinked source component is not allowed: {candidate}")
                if name in dirs:
                    if not stat.S_ISDIR(mode):
                        raise ImportError(f"source payload has non-directory component: {candidate}")
                    continue
                if not stat.S_ISREG(mode):
                    raise ImportError(f"source payload has non-regular file: {candidate}")
                try:
                    repository_path = candidate.relative_to(repository_root).as_posix()
                except ValueError as exc:
                    raise ImportError(f"source skill is outside its repository: {candidate}") from exc
                if repository_path in files:
                    raise ImportError(f"source payload file is selected twice: {candidate}")
                files[repository_path] = candidate
    return files


def _pinned_imported_blobs(repository_root: Path, expected: str, repository_paths: list[str]) -> dict[str, str]:
    try:
        result = subprocess.run(
            ["git", "-C", str(repository_root), "ls-tree", "-r", "-z", expected, "--", *repository_paths],
            check=False,
            capture_output=True,
            timeout=30,
        )
    except (OSError, subprocess.TimeoutExpired) as exc:
        raise ImportError(f"could not inspect pinned source tree: {repository_root}") from exc
    if result.returncode != 0:
        raise ImportError(f"could not inspect pinned source tree: {repository_root}")
    blobs: dict[str, str] = {}
    for record in result.stdout.split(b"\0"):
        if not record:
            continue
        try:
            metadata, raw_path = record.split(b"\t", 1)
            mode, object_type, object_id = metadata.decode("ascii").split(" ", 2)
            repository_path = os.fsdecode(raw_path)
        except (UnicodeDecodeError, ValueError) as exc:
            raise ImportError(f"could not parse pinned source tree: {repository_root}") from exc
        if object_type != "blob" or mode == "120000":
            raise ImportError(f"pinned source contains non-regular content: {repository_path}")
        blobs[repository_path] = object_id
    return blobs


def _verify_pinned_imported_files(spec: PackSpec, expected: str) -> None:
    source = spec.source_root.expanduser()
    discovered = _discover_skills(spec)
    repository_root = _git_source_top_level(source)
    try:
        source.relative_to(repository_root)
    except ValueError as exc:
        raise ImportError(f"source root is outside its repository: {source}") from exc
    skill_dirs = [skill_dir for _, skill_dir, _ in discovered]
    working_files = _working_imported_files(source, skill_dirs, repository_root)
    pinned_paths = [skill_dir.relative_to(repository_root).as_posix() for skill_dir in skill_dirs]
    pinned_blobs = _pinned_imported_blobs(repository_root, expected, sorted(pinned_paths))
    if set(working_files) != set(pinned_blobs):
        missing = sorted(set(pinned_blobs) - set(working_files))
        extra = sorted(set(working_files) - set(pinned_blobs))
        details = ", ".join([*(f"missing {path}" for path in missing), *(f"extra {path}" for path in extra)])
        raise ImportError(f"source imported file set differs from pinned commit: {details}")
    for repository_path, working_path in working_files.items():
        try:
            blob = subprocess.run(
                ["git", "-C", str(repository_root), "show", f"{expected}:{repository_path}"],
                check=False,
                capture_output=True,
                timeout=30,
            )
        except (OSError, subprocess.TimeoutExpired) as exc:
            raise ImportError(f"could not read pinned source blob: {repository_path}") from exc
        if blob.returncode != 0:
            raise ImportError(f"could not read pinned source blob: {repository_path}")
        if working_path.read_bytes() != blob.stdout:
            raise ImportError(f"source imported file differs from pinned commit: {working_path}")


def _verify_source_commit(spec: PackSpec, expected: str) -> None:
    source = spec.source_root.expanduser()
    if not COMMIT_RE.fullmatch(expected):
        raise ImportError("--commit must be an exact 40-character hexadecimal commit")
    _assert_directory(source, "source root")
    try:
        result = subprocess.run(
            ["git", "-C", str(source), "rev-parse", "HEAD"],
            check=False,
            capture_output=True,
            text=True,
            timeout=10,
        )
    except (OSError, subprocess.TimeoutExpired) as exc:
        raise ImportError(f"could not verify source commit: {source}") from exc
    actual = result.stdout.strip()
    if result.returncode != 0 or actual != expected:
        raise ImportError(f"source HEAD {actual or '<unavailable>'} does not match --commit {expected}")
    try:
        status = subprocess.run(
            ["git", "-C", str(source), "status", "--porcelain=v1", "--ignored"],
            check=False,
            capture_output=True,
            text=True,
            timeout=10,
        )
    except (OSError, subprocess.TimeoutExpired) as exc:
        raise ImportError(f"could not verify source cleanliness: {source}") from exc
    if status.returncode != 0:
        raise ImportError(f"could not verify source cleanliness: {source}")
    if status.stdout.strip():
        raise ImportError(f"source working tree is not clean (including ignored files): {source}")
    _verify_pinned_imported_files(spec, expected)


def _args(argv: list[str]) -> list[str]:
    if argv and not argv[0].startswith("-"):
        return argv[1:]
    return argv


def main(argv: list[str]) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="validate source and staged output without installing")
    parser.add_argument("--import", dest="pack", metavar="PACK", help="import a known pack")
    parser.add_argument("--source", type=Path, help="source checkout override")
    parser.add_argument("--commit", help="exact 40-character source HEAD commit")
    parser.add_argument("--dry-run", action="store_true", help="stage and validate without changing the repository")
    args = parser.parse_args(_args(argv))
    if not args.pack:
        if args.check or args.source or args.commit or args.dry_run:
            print("ERROR: --check, --source, --commit and --dry-run require --import", file=sys.stderr)
            return 2
        print("vendor skill importer: OK")
        return 0
    if not args.commit or not COMMIT_RE.fullmatch(args.commit):
        print("ERROR: --import requires an exact 40-character hexadecimal --commit", file=sys.stderr)
        return 2
    specs = _known_specs(args.source)
    if args.pack not in specs:
        print(f"ERROR: unknown pack {args.pack!r}", file=sys.stderr)
        return 2
    spec = specs[args.pack]
    try:
        if args.check or args.dry_run:
            _, manifest, staging_root = _build_staged_pack(spec, args.commit)
            try:
                print(f"checked {args.pack}: {len(manifest['skills'])} skills")
            finally:
                if staging_root.exists():
                    shutil.rmtree(staging_root)
            return 0
        staged, result, staging_root = _build_staged_pack(spec, args.commit)
        index_entries = [
            {
                "name": entry["target_name"],
                "version": entry["version"],
                "path": f"{Path(spec.target_root).relative_to(REPO_ROOT).as_posix()}/{entry['target_path']}",
                "description": entry["description"],
            }
            for entry in result["skills"]
        ]
        namespaced_entries = [
            {
                "name": entry["target_name"],
                "source": f"{Path(spec.target_root).relative_to(REPO_ROOT).as_posix()}/{entry['target_path']}",
                "mode": "source-adapter",
                "description": entry["description"],
            }
            for entry in result["skills"]
        ]
        backup: Path | None = None
        replaced = False
        registries_committed = False
        try:
            backup = _replace_staged_package(staged, _absolute_target(spec.target_root), spec.source_label)
            replaced = True
            update_registries(index_entries, namespaced_entries)
            registries_committed = True
            try:
                _discard_package_backup(backup)
            except (ImportError, OSError) as exc:
                print(f"WARNING: imported {args.pack}; retained package backup after cleanup failure: {exc}", file=sys.stderr)
            print(f"imported {args.pack}: {len(result['skills'])} skills")
            return 0
        except Exception:
            if replaced and not registries_committed:
                _rollback_package_replacement(_absolute_target(spec.target_root), backup)
            raise
        finally:
            if staging_root.exists():
                shutil.rmtree(staging_root)
    except (ImportError, OSError, ValueError) as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 2


__all__ = [
    "PackSpec",
    "build_name_map",
    "normalize_skill",
    "rewrite_references",
    "import_pack",
    "update_registries",
    "main",
]
