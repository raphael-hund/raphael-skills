#!/usr/bin/env python3
"""Verify the pinned Kimi upstreams and bridge the attested gstack skill.

This helper is intentionally dry-run by default.  It creates only the two
attested compatibility links ``gstack-upgrade`` and ``writing-skills`` under
``$KIMI_CODE_HOME/skills``; the latter exposes the byte-identical managed
Superpowers bundle without its name being shadowed by the shared Raphael
inventory.  It never copies or overwrites a skill.  All paths are checked
with ``lstat``/``O_NOFOLLOW`` before a write.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import subprocess
import sys
import uuid
from pathlib import Path
from typing import Any, Callable

REPO_ROOT = Path(__file__).resolve().parent.parent
REGISTRY_PATH = REPO_ROOT / "kimi" / "upstream-skills.json"
CODEX_REGISTRY_PATH = REPO_ROOT / "codex" / "upstream-skills.json"
DEFAULT_SOURCE_ROOT = Path("/root/tools/vendor/superpowers")
DEFAULT_KIMI_CODE_HOME = Path(os.environ.get("KIMI_CODE_HOME", str(Path.home() / ".kimi-code")))
DEFAULT_SHARE_ROOT = Path.home() / ".local" / "share" / "raphael-skills"
DEFAULT_STATE_ROOT = Path.home() / ".local" / "state"
SCHEMA_VERSION = 1


class SyncError(RuntimeError):
    """A verification, preflight, or transactional safety failure."""


def _die(message: str) -> None:
    raise SyncError(message)


def _read_json(path: Path, label: str) -> dict[str, Any]:
    if path.is_symlink() or not path.is_file():
        _die(f"{label} is not a regular file: {path}")
    try:
        value = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, UnicodeDecodeError, json.JSONDecodeError) as exc:
        raise SyncError(f"malformed {label}: {path}") from exc
    if not isinstance(value, dict):
        _die(f"{label} must contain a JSON object: {path}")
    return value


def registry_hash(path: Path = REGISTRY_PATH) -> str:
    try:
        return hashlib.sha256(path.read_bytes()).hexdigest()
    except OSError as exc:
        raise SyncError(f"cannot read Kimi registry: {path}") from exc


def load_registry(path: Path = REGISTRY_PATH) -> dict[str, Any]:
    registry = _read_json(path, "Kimi upstream registry")
    if registry.get("schema_version") != SCHEMA_VERSION or registry.get("helper_id") != "raphael.kimi-upstream-bridge":
        _die("unsupported Kimi upstream registry schema/helper")
    if not re.fullmatch(r"\d+\.\d+\.\d+", str(registry.get("helper_version", ""))):
        _die("Kimi registry helper_version is invalid")
    sp = registry.get("superpowers")
    if not isinstance(sp, dict):
        _die("Kimi registry superpowers section is missing")
    required_sp = {
        "repository_url", "pinned_commit", "source_root", "skills_relative",
        "managed_root_template", "installed_plugins_relative", "managed_manifest_relative",
        "plugin_id", "plugin_name", "plugin_version", "expected_skill_bundle_count",
    }
    if set(sp) != required_sp:
        _die("Kimi registry superpowers section is incomplete")
    if not isinstance(sp["repository_url"], str) or not sp["repository_url"].startswith("https://"):
        _die("Superpowers repository URL is invalid")
    if not re.fullmatch(r"[0-9a-f]{40}", str(sp["pinned_commit"])):
        _die("Superpowers pinned_commit must be a 40-character SHA-1")
    if sp["plugin_id"] != "superpowers" or sp["plugin_name"] != "superpowers" or sp["plugin_version"] != "6.1.1":
        _die("registry Superpowers identity/version is not pinned")
    if sp["expected_skill_bundle_count"] != 14:
        _die("registry must pin exactly 14 Superpowers skill bundles")
    for key in ("source_root", "skills_relative", "installed_plugins_relative", "managed_manifest_relative"):
        if not isinstance(sp[key], str) or not sp[key] or Path(sp[key]).is_absolute() and key != "source_root":
            _die(f"registry Superpowers path is invalid: {key}")
        if ".." in Path(sp[key]).parts and key != "source_root":
            _die(f"registry Superpowers path escapes its root: {key}")
    if sp["managed_root_template"] != "{kimi_code_home}/plugins/managed/superpowers":
        _die("registry managed Superpowers path template is invalid")
    gs = registry.get("gstack")
    if not isinstance(gs, dict):
        _die("Kimi registry gstack section is missing")
    required_gs = {
        "registry_path", "state_path_template", "pack_root_template", "expected_generated_count",
        "expected_prefixed_count", "attested_link_id", "attested_target_template",
        "accepted_prior_pack_templates",
    }
    if set(gs) != required_gs:
        _die("Kimi registry gstack section is incomplete")
    if gs["expected_generated_count"] != 54 or gs["expected_prefixed_count"] != 53:
        _die("registry gstack counts must be 54 (53 prefixed + root)")
    if gs["attested_link_id"] != "global-runtime:gstack-upgrade":
        _die("registry gstack attestation id is invalid")
    if gs["state_path_template"] != "{state_root}/raphael-codex-skills/upstream-links.json" or gs["pack_root_template"] != "{share_root}/gstack/{pinned_commit}-bridge-v5" or gs["attested_target_template"] != "{pack_root}/skills/gstack-upgrade":
        _die("registry gstack path template is invalid")
    if gs["accepted_prior_pack_templates"] != ["{share_root}/gstack/{pinned_commit}-bridge-v4"]:
        _die("registry gstack migration allowlist is invalid")
    kimi = registry.get("kimi")
    expected_kimi = {
        "skills_relative": "skills",
        "links": [
            {"name": "gstack-upgrade", "source": "gstack-attested"},
            {"name": "writing-skills", "source": "superpowers-managed", "target_relative": "skills/writing-skills"},
        ],
    }
    if kimi != expected_kimi:
        _die("registry Kimi destination is invalid")
    return registry


def _validate_abs_path(path: Path, label: str, *, allow_default: bool = False) -> Path:
    if not path.is_absolute():
        _die(f"{label} must be an absolute path")
    path = Path(os.path.normpath(str(path)))
    if str(path) in {"/", "/tmp", "/var", "/usr", "/opt", "/home", "/root"} or len(path.parts) < 3:
        if not (allow_default and path == DEFAULT_KIMI_CODE_HOME):
            _die(f"{label} is dangerously broad: {path}")
    return path


def _validate_components(path: Path, *, allow_missing: bool = True) -> None:
    """Reject symlinks and non-directories in every existing component."""
    if not path.is_absolute():
        _die(f"path must be absolute: {path}")
    current = Path(path.anchor)
    for part in path.parts[1:]:
        current /= part
        try:
            st = os.lstat(current)
        except FileNotFoundError:
            if allow_missing:
                return
            raise
        if os.path.islink(current):
            _die(f"path traverses a symlinked component: {current}")
        if not os.path.isdir(current):
            _die(f"path component is not a directory: {current}")


def _open_dir(path: Path, *, create: bool) -> int:
    """Open a directory using no-follow dirfd traversal, optionally creating it."""
    if not path.is_absolute():
        _die(f"path must be absolute: {path}")
    flags = os.O_RDONLY | os.O_DIRECTORY | getattr(os, "O_NOFOLLOW", 0)
    fd = os.open(path.anchor, flags)
    try:
        for part in path.parts[1:]:
            try:
                nxt = os.open(part, flags, dir_fd=fd)
            except FileNotFoundError:
                if not create:
                    raise
                try:
                    os.mkdir(part, 0o755, dir_fd=fd)
                except FileExistsError:
                    pass
                nxt = os.open(part, flags, dir_fd=fd)
            except OSError as exc:
                raise SyncError(f"unsafe directory component below {path}: {part}") from exc
            os.close(fd)
            fd = nxt
        return fd
    except Exception:
        os.close(fd)
        raise


def _run_git(args: list[str], cwd: Path, *, check: bool = True) -> str:
    proc = subprocess.run(["git", *args], cwd=cwd, text=True, capture_output=True, timeout=30)
    if check and proc.returncode:
        raise SyncError(f"git command failed in {cwd}: {(proc.stderr or proc.stdout).strip()[-500:]}")
    return proc.stdout.strip()


def _tree_hash(root: Path) -> str:
    if root.is_symlink() or not root.is_dir():
        _die(f"skill tree is not a real directory: {root}")
    h = hashlib.sha256()

    def visit(path: Path, rel: str) -> None:
        st = os.lstat(path)
        kind = st.st_mode & 0o170000
        h.update(rel.encode("utf-8") + b"\0")
        if kind == 0o120000:
            h.update(b"L\0" + os.readlink(path).encode("utf-8") + b"\0")
        elif kind == 0o100000:
            h.update(b"F\0" + path.read_bytes() + b"\0")
        elif kind == 0o040000:
            h.update(b"D\0")
            for child in sorted(path.iterdir(), key=lambda p: p.name):
                visit(child, f"{rel}/{child.name}" if rel else child.name)
        else:
            _die(f"unsupported skill tree entry: {path}")

    visit(root, "")
    return h.hexdigest()


def _assert_git_pin(source_root: Path, sp: dict[str, Any]) -> None:
    if source_root.is_symlink() or not source_root.is_dir() or not (source_root / ".git").exists():
        _die(f"Superpowers source is not a git checkout: {source_root}")
    status = _run_git(["status", "--porcelain", "--untracked-files=no"], source_root)
    if status:
        _die(f"Superpowers source has tracked modifications: {status.splitlines()[0]}")
    commit = _run_git(["rev-parse", "HEAD"], source_root)
    if commit != sp["pinned_commit"]:
        _die(f"Superpowers source HEAD {commit} is not pinned commit {sp['pinned_commit']}")
    remote = _run_git(["config", "--get", "remote.origin.url"], source_root, check=False)
    if remote and remote.rstrip("/") not in {sp["repository_url"].rstrip("/"), "git@github.com:obra/superpowers.git"}:
        _die(f"Superpowers source remote is foreign: {remote}")


def validate_superpowers(kimi_code_home: Path, source_root: Path, registry: dict[str, Any]) -> dict[str, Path | int | str]:
    sp = registry["superpowers"]
    _validate_components(source_root, allow_missing=False)
    _assert_git_pin(source_root, sp)
    source_skills = source_root / sp["skills_relative"]
    if source_skills.is_symlink() or not source_skills.is_dir():
        _die(f"Superpowers source skills directory is missing: {source_skills}")
    managed_root = Path(sp["managed_root_template"].format(kimi_code_home=kimi_code_home))
    installed_path = kimi_code_home / sp["installed_plugins_relative"]
    manifest_path = managed_root / sp["managed_manifest_relative"]
    _validate_components(installed_path.parent)
    _validate_components(managed_root)
    installed = _read_json(installed_path, "Kimi installed plugins")
    plugins = installed.get("plugins")
    if not isinstance(plugins, list):
        _die("Kimi installed plugins record has no plugins list")
    matches = [p for p in plugins if isinstance(p, dict) and p.get("id") == sp["plugin_id"]]
    if len(matches) != 1:
        _die("Kimi installed plugins must contain exactly one Superpowers entry")
    entry = matches[0]
    if entry.get("enabled") is not True or entry.get("source") != "local-path":
        _die("Superpowers installed entry must be enabled and local-path")
    if not isinstance(entry.get("root"), str) or Path(entry["root"]).resolve() != managed_root.resolve():
        _die("Superpowers installed entry root does not point at managed plugin")
    if entry.get("originalSource") not in (None, str(source_root)):
        _die("Superpowers installed entry originalSource is foreign")
    manifest = _read_json(manifest_path, "managed Superpowers manifest")
    if manifest.get("name") != sp["plugin_name"] or manifest.get("version") != sp["plugin_version"]:
        _die("managed Superpowers manifest name/version is not pinned")
    source_bundles = sorted(p.name for p in source_skills.iterdir() if p.is_dir() and not p.is_symlink())
    managed_skills = managed_root / sp["skills_relative"]
    if managed_skills.is_symlink() or not managed_skills.is_dir():
        _die(f"managed Superpowers skills directory is missing: {managed_skills}")
    managed_bundles = sorted(p.name for p in managed_skills.iterdir() if p.is_dir() and not p.is_symlink())
    if len(source_bundles) != sp["expected_skill_bundle_count"] or len(managed_bundles) != sp["expected_skill_bundle_count"]:
        _die("Superpowers skills tree must contain exactly 14 bundles")
    if source_bundles != managed_bundles:
        _die("managed Superpowers skills bundles differ from pinned source")
    source_hash = _tree_hash(source_skills)
    managed_hash = _tree_hash(managed_skills)
    if source_hash != managed_hash:
        _die("managed Superpowers skills tree is not byte-identical to pinned source")
    return {"source_skills": source_skills, "managed_root": managed_root, "installed_path": installed_path, "manifest": manifest, "bundle_count": len(source_bundles), "tree_sha256": source_hash}


def _load_codex_registry(path: Path) -> dict[str, Any]:
    data = _read_json(path, "Codex upstream registry")
    if data.get("schema_version") != 1 or data.get("helper_id") != "raphael.gstack-upstream-codex":
        _die("Codex upstream registry helper/schema mismatch")
    repo = data.get("repository")
    if not isinstance(repo, dict) or not re.fullmatch(r"[0-9a-f]{40}", str(repo.get("pinned_commit", ""))):
        _die("Codex registry pinned commit is malformed")
    sm = data.get("source_manifest")
    if not isinstance(sm, dict) or sm.get("expected_generated_count") != 54 or sm.get("expected_discoverable_count") != 54 or sm.get("expected_prefixed_count") != 53:
        _die("Codex registry does not attest 54 gstack identities")
    pack = data.get("pack")
    if not isinstance(pack, dict) or pack.get("root_template") != "{share_root}/gstack/{pinned_commit}-bridge-v5" or pack.get("manifest_file") != "PACK-MANIFEST.json":
        _die("Codex registry pack provenance is invalid")
    state = data.get("state")
    if not isinstance(state, dict) or state.get("path_template") != "{state_root}/raphael-codex-skills/upstream-links.json":
        _die("Codex registry state path is invalid")
    return data


def validate_gstack(share_root: Path, state_root: Path, kimi_registry: dict[str, Any], codex_registry_path: Path = CODEX_REGISTRY_PATH) -> dict[str, Any]:
    codex = _load_codex_registry(codex_registry_path)
    commit = codex["repository"]["pinned_commit"]
    gs = kimi_registry["gstack"]
    state_path = Path(gs["state_path_template"].format(state_root=state_root))
    state = _read_json(state_path, "Codex upstream state")
    required = {"schema_version", "helper_id", "helper_version", "registry_sha256", "pinned_commit", "pack_root", "links"}
    if set(state) != required or state["schema_version"] != 1 or state["helper_id"] != codex["helper_id"]:
        _die("Codex upstream state schema/helper mismatch")
    try:
        codex_hash = hashlib.sha256(codex_registry_path.read_bytes()).hexdigest()
    except OSError as exc:
        raise SyncError("cannot hash Codex registry") from exc
    if state["registry_sha256"] != codex_hash or state["pinned_commit"] != commit:
        _die("Codex state registry hash or pinned commit mismatch")
    if not isinstance(state["pack_root"], str) or not Path(state["pack_root"]).is_absolute():
        _die("Codex state pack_root must be absolute")
    expected_pack = Path(gs["pack_root_template"].format(share_root=share_root, pinned_commit=commit))
    pack_root = Path(state["pack_root"])
    if pack_root != expected_pack:
        _die("Codex state pack_root is not the registered immutable pack")
    _validate_components(pack_root, allow_missing=False)
    if pack_root.is_symlink() or not pack_root.is_dir():
        _die("Codex pack_root is not an ordinary directory")
    marker_path = pack_root / codex["pack"]["manifest_file"]
    marker = _read_json(marker_path, "Codex pack manifest")
    if marker.get("helper_id") != codex["helper_id"] or marker.get("pinned_commit") != commit or marker.get("registry_sha256") != codex_hash or marker.get("generated_discoverable_count") != 53:
        _die("Codex pack manifest provenance mismatch")
    links = state["links"]
    if not isinstance(links, list):
        _die("Codex state links are malformed")
    matches = [x for x in links if isinstance(x, dict) and x.get("id") == gs["attested_link_id"]]
    if len(matches) != 1 or any(not isinstance(x, dict) or set(x) != {"id", "destination", "target"} for x in links):
        _die("Codex state must contain exactly one attested gstack-upgrade link")
    link = matches[0]
    target = Path(link.get("target", ""))
    expected_target = Path(gs["attested_target_template"].format(pack_root=pack_root))
    if target != expected_target or not target.is_absolute():
        _die("Codex gstack-upgrade link target is not the attested generated skill")
    _validate_components(target, allow_missing=False)
    if target.is_symlink() or not target.is_dir() or not (target / "SKILL.md").is_file() or (target / "SKILL.md").is_symlink():
        _die("attested gstack-upgrade target is missing or unsafe")
    return {"registry": codex, "state": state, "state_path": state_path, "pack_root": pack_root, "target": target, "link": link, "registry_sha256": codex_hash}


def _normalize_link_target(destination: Path, raw: str) -> str:
    target = Path(raw)
    return str((destination.parent / target).resolve()) if not target.is_absolute() else str(target.resolve())


def _link_snapshot(path: Path) -> tuple[int, int, str] | None:
    try:
        fd = _open_dir(path.parent, create=False)
    except FileNotFoundError:
        return None
    try:
        try:
            st = os.stat(path.name, dir_fd=fd, follow_symlinks=False)
        except FileNotFoundError:
            return None
        if (st.st_mode & 0o170000) != 0o120000:
            _die(f"link destination is not a symlink: {path}")
        return st.st_dev, st.st_ino, os.readlink(path.name, dir_fd=fd)
    finally:
        os.close(fd)


def _unlink_owned(path: Path, owned: tuple[int, int, str]) -> bool:
    try:
        fd = _open_dir(path.parent, create=False)
    except FileNotFoundError:
        return True
    try:
        try:
            st = os.stat(path.name, dir_fd=fd, follow_symlinks=False)
        except FileNotFoundError:
            return True
        if (st.st_dev, st.st_ino) != owned[:2] or (st.st_mode & 0o170000) != 0o120000:
            return False
        if os.readlink(path.name, dir_fd=fd) != owned[2]:
            return False
        os.unlink(path.name, dir_fd=fd)
        return True
    finally:
        os.close(fd)


def _create_link(path: Path, target: Path) -> tuple[int, int, str]:
    fd = _open_dir(path.parent, create=True)
    try:
        try:
            os.symlink(str(target), path.name, dir_fd=fd)
        except FileExistsError as exc:
            raise SyncError(f"destination appeared during apply: {path}") from exc
        st = os.stat(path.name, dir_fd=fd, follow_symlinks=False)
        return st.st_dev, st.st_ino, os.readlink(path.name, dir_fd=fd)
    finally:
        os.close(fd)


def validate_destination(destination: Path, target: Path) -> tuple[int, int, str] | None:
    _validate_components(destination.parent)
    current = _link_snapshot(destination)
    if current is None:
        if destination.exists() or destination.is_symlink():
            _die(f"foreign occupant at Kimi gstack-upgrade destination: {destination}")
        return None
    if _normalize_link_target(destination, current[2]) != str(target.resolve()):
        _die(f"divergent symlink at Kimi gstack-upgrade destination: {destination}")
    return current


def migrate_attested_gstack_link(destination: Path, target: Path, prior_target: Path) -> None:
    """Replace only the exact registered bridge-v4 link, restoring on failure."""
    current = _link_snapshot(destination)
    if current is None or _normalize_link_target(destination, current[2]) == str(target.resolve()):
        return
    if _normalize_link_target(destination, current[2]) != str(prior_target.resolve()):
        _die(f"divergent symlink at Kimi gstack-upgrade destination: {destination}")
    if not _unlink_owned(destination, current):
        _die(f"attested prior Kimi gstack-upgrade link changed during migration: {destination}")
    try:
        _create_link(destination, target)
    except Exception as original:
        try:
            _create_link(destination, Path(current[2]))
        except Exception as restore_error:
            raise SyncError(f"{original}; could not restore prior attested Kimi link: {restore_error}") from original
        raise


def bridge_link(
    mode: str,
    destination: Path,
    target: Path,
    *,
    _test_hook: Callable[[str, Path], None] | None = None,
    _on_created: Callable[[Path, tuple[int, int, str]], None] | None = None,
) -> None:
    current = validate_destination(destination, target)
    if mode in {"dry-run", "check"}:
        if mode == "check" and current is None:
            _die(f"Kimi gstack-upgrade link is missing: {destination}")
        return
    if mode == "rollback":
        if current is None:
            return
        if not _unlink_owned(destination, current):
            _die(f"rollback refused to remove a changed link: {destination}")
        return
    if current is not None:
        return
    owned = _create_link(destination, target)
    try:
        # Record ownership before any callback or failure injection can raise.
        # The callback only appends to the current run's rollback list; it never
        # replaces the no-clobber ownership attestation above.
        if _on_created is not None:
            _on_created(destination, owned)
        if _test_hook is not None:
            _test_hook("after-link", destination)
        inject = os.environ.get("KIMI_SYNC_INJECT_FAILURE_AFTER", "")
        if inject.isdigit() and int(inject) <= 1:
            _die("injected failure after link creation")
    except Exception:
        # A post-create exception must not leak a link.  If a foreign object
        # replaced ours, _unlink_owned returns False and deliberately leaves it.
        _unlink_owned(destination, owned)
        raise


def run(mode: str, kimi_code_home: Path, source_root: Path, share_root: Path, state_root: Path, registry: dict[str, Any], codex_registry_path: Path = CODEX_REGISTRY_PATH, *, _test_hook: Callable[[str, Path], None] | None = None) -> int:
    kimi_code_home = _validate_abs_path(kimi_code_home, "kimi-code-home", allow_default=True)
    share_root = _validate_abs_path(share_root, "share-root")
    state_root = _validate_abs_path(state_root, "state-root")
    source_root = _validate_abs_path(source_root, "source-root")
    _validate_components(kimi_code_home)
    _validate_components(share_root, allow_missing=False)
    _validate_components(state_root, allow_missing=False)
    superpowers = validate_superpowers(kimi_code_home, source_root, registry)
    gstack = validate_gstack(share_root, state_root, registry, codex_registry_path)
    skills_root = kimi_code_home / registry["kimi"]["skills_relative"]
    link_specs = [
        (skills_root / "writing-skills", Path(superpowers["managed_root"]) / "skills" / "writing-skills"),
        (skills_root / "gstack-upgrade", gstack["target"]),
    ]
    if mode == "apply":
        prior_template = registry["gstack"]["accepted_prior_pack_templates"][0]
        prior_pack = Path(prior_template.format(
            share_root=share_root,
            pinned_commit=gstack["registry"]["repository"]["pinned_commit"],
        ))
        migrate_attested_gstack_link(
            skills_root / "gstack-upgrade",
            Path(gstack["target"]),
            prior_pack / "skills" / "gstack-upgrade",
        )
    states = [(destination, target, validate_destination(destination, target)) for destination, target in link_specs]
    if mode == "check":
        missing = [destination for destination, _, current in states if current is None]
        if missing:
            _die("Kimi bridge link is missing: " + ", ".join(map(str, missing)))
        print(f"OK: Superpowers {registry['superpowers']['plugin_version']} ({registry['superpowers']['expected_skill_bundle_count']} skills); gstack {registry['gstack']['expected_generated_count']} identities; 2 bridge links valid")
    elif mode == "dry-run":
        for destination, target, current in states:
            action = "already points at" if current is not None else "would create"
            print(f"DRY-RUN: {action} {destination} -> {target}")
    elif mode == "apply":
        created: list[tuple[Path, tuple[int, int, str]]] = []
        try:
            for destination, target, current in states:
                def remember_created(path: Path, owned: tuple[int, int, str]) -> None:
                    created.append((path, owned))

                bridge_link(
                    mode,
                    destination,
                    target,
                    _test_hook=_test_hook,
                    _on_created=remember_created if current is None else None,
                )
                print(f"APPLIED: {destination} -> {target}")
        except Exception:
            for destination, snapshot in reversed(created):
                _unlink_owned(destination, snapshot)
            raise
    elif mode == "rollback":
        for destination, target, _ in reversed(states):
            bridge_link(mode, destination, target, _test_hook=_test_hook)
            print(f"ROLLED BACK: {destination}")
    else:
        _die(f"unknown mode: {mode}")
    return 0


def parse_args(argv: list[str]) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    modes = parser.add_mutually_exclusive_group()
    modes.add_argument("--dry-run", action="store_const", const="dry-run", dest="mode")
    modes.add_argument("--check", action="store_const", const="check", dest="mode")
    modes.add_argument("--apply", action="store_const", const="apply", dest="mode")
    modes.add_argument("--rollback", action="store_const", const="rollback", dest="mode")
    parser.add_argument("--kimi-code-home", default=str(DEFAULT_KIMI_CODE_HOME))
    parser.add_argument("--source-root", default=str(DEFAULT_SOURCE_ROOT))
    parser.add_argument("--share-root", default=str(DEFAULT_SHARE_ROOT))
    parser.add_argument("--state-root", default=str(DEFAULT_STATE_ROOT))
    parser.add_argument("--registry", default=str(REGISTRY_PATH))
    parser.add_argument("--codex-registry", default=str(CODEX_REGISTRY_PATH))
    args = parser.parse_args(argv)
    args.mode = args.mode or "dry-run"
    for name in ("kimi_code_home", "source_root", "share_root", "state_root", "registry", "codex_registry"):
        value = Path(getattr(args, name))
        if name in {"registry", "codex_registry"}:
            if not value.is_absolute():
                _die(f"{name} must be an absolute path")
        else:
            setattr(args, name, _validate_abs_path(value, name.replace("_", "-"), allow_default=name == "kimi_code_home"))
    args.registry = Path(args.registry)
    args.codex_registry = Path(args.codex_registry)
    return args


def main(argv: list[str] | None = None) -> int:
    try:
        args = parse_args(argv or sys.argv[1:])
        registry = load_registry(args.registry)
        return run(args.mode, args.kimi_code_home, args.source_root, args.share_root, args.state_root, registry, args.codex_registry)
    except (SyncError, subprocess.TimeoutExpired, OSError) as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 2


if __name__ == "__main__":
    raise SystemExit(main())
