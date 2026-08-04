#!/usr/bin/env python3
"""Validate and install the Raphael skill inventory for Claude Code.

Canonical repository skills are already Claude-native, so this helper links
the complete source directories from the shared registry instead of copying or rewriting them.
Only ``kimi-sol`` has a small Claude-specific native override.  Installation
is no-clobber and keeps the destination directory open via ``O_NOFOLLOW``.
"""
from __future__ import annotations

import argparse
import contextlib
import json
import os
import re
import stat
import sys
import uuid
from pathlib import Path
from typing import Iterator


ROOT = Path(__file__).resolve().parent.parent
REGISTRY_PATH = ROOT / "claude" / "compatibility.json"
CODEX_REGISTRY_PATH = ROOT / "codex" / "compatibility.json"
DIRECTORY_FLAGS = os.O_RDONLY | getattr(os, "O_DIRECTORY", 0) | getattr(os, "O_NOFOLLOW", 0)


class SyncError(RuntimeError):
    pass


def read_json(path: Path) -> dict:
    if path.is_symlink() or not path.is_file():
        raise SyncError(f"registry is not a regular file: {path}")
    value = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(value, dict):
        raise SyncError(f"registry is not an object: {path}")
    return value


def frontmatter_name(path: Path) -> str:
    text = path.read_text(encoding="utf-8")
    match = re.match(r"^---\n(?P<body>.*?)\n---(?:\n|$)", text, re.DOTALL)
    if not match:
        raise SyncError(f"missing YAML frontmatter: {path}")
    name = re.search(r"(?m)^name:\s*[\"']?([^\n\"']+)[\"']?\s*$", match.group("body"))
    if not name:
        raise SyncError(f"missing frontmatter name: {path}")
    return name.group(1).strip()


def load_inventory() -> dict[str, Path]:
    registry = read_json(REGISTRY_PATH)
    required = {"schema_version", "helper_id", "target", "inventory_source", "expected_count", "native_overrides"}
    if set(registry) != required or registry["schema_version"] != 1 or registry["helper_id"] != "raphael.claude-skills":
        raise SyncError("unsupported Claude registry")
    if not isinstance(registry["expected_count"], int) or registry["expected_count"] < 1 or registry["inventory_source"] != "../codex/compatibility.json":
        raise SyncError("Claude registry inventory contract is invalid")
    overrides = registry["native_overrides"]
    if overrides != {"kimi-sol": "claude/skills/kimi-sol/SKILL.md"}:
        raise SyncError("Claude native override registry is invalid")
    codex = read_json(CODEX_REGISTRY_PATH).get("skills")
    if not isinstance(codex, dict) or len(codex) != registry["expected_count"]:
        raise SyncError(f"Codex inventory must contain exactly {registry['expected_count']} skills")

    inventory: dict[str, Path] = {}
    for name, entry in codex.items():
        if not isinstance(name, str) or not isinstance(entry, dict):
            raise SyncError("malformed Codex inventory entry")
        skill_file = ROOT / (overrides[name] if name in overrides else entry.get("source", ""))
        if skill_file.is_symlink() or not skill_file.is_file() or skill_file.name != "SKILL.md":
            raise SyncError(f"Claude skill source is missing or unsafe: {name}: {skill_file}")
        if frontmatter_name(skill_file) != name:
            raise SyncError(f"Claude skill name mismatch: {name}: {skill_file}")
        inventory[name] = skill_file.parent
    if len(inventory) != registry["expected_count"]:
        raise SyncError("Claude inventory count mismatch")
    return inventory


def destination_root() -> Path:
    home = Path(os.environ.get("HOME", ""))
    if not home.is_absolute() or str(home) in {"/", "/root", "/home", "/tmp"}:
        # The real root home is an intentional supported default; dangerously
        # broad alternatives remain rejected.
        if home != Path("/root"):
            raise SyncError(f"HOME must be an absolute user directory: {home}")
    return home / ".claude" / "skills"


def open_child(parent_fd: int, name: str, *, create: bool) -> int:
    try:
        return os.open(name, DIRECTORY_FLAGS, dir_fd=parent_fd)
    except FileNotFoundError:
        if not create:
            raise
        try:
            os.mkdir(name, 0o755, dir_fd=parent_fd)
        except FileExistsError:
            pass
        return os.open(name, DIRECTORY_FLAGS, dir_fd=parent_fd)


@contextlib.contextmanager
def skills_fd(*, create: bool) -> Iterator[tuple[Path, int | None]]:
    root = destination_root()
    home_fd = os.open(str(root.parent.parent), DIRECTORY_FLAGS)
    claude_fd: int | None = None
    result_fd: int | None = None
    try:
        try:
            claude_fd = open_child(home_fd, ".claude", create=create)
            result_fd = open_child(claude_fd, "skills", create=create)
        except FileNotFoundError:
            yield root, None
            return
        yield root, result_fd
    finally:
        if result_fd is not None:
            os.close(result_fd)
        if claude_fd is not None:
            os.close(claude_fd)
        os.close(home_fd)


def snapshot(fd: int, name: str) -> tuple[int, int, str] | None:
    try:
        st = os.stat(name, dir_fd=fd, follow_symlinks=False)
    except FileNotFoundError:
        return None
    if not stat.S_ISLNK(st.st_mode):
        raise SyncError(f"foreign non-symlink at Claude skill destination: {name}")
    return st.st_dev, st.st_ino, os.readlink(name, dir_fd=fd)


def unlink_owned(fd: int, name: str, owned: tuple[int, int, str]) -> bool:
    try:
        current = snapshot(fd, name)
    except SyncError:
        return False
    if current is None:
        return True
    if current != owned:
        return False
    os.unlink(name, dir_fd=fd)
    return True


def run(mode: str, *, dry_run: bool = False) -> int:
    inventory = load_inventory()
    if mode == "check":
        print(f"Claude source inventory: OK ({len(inventory)} skills)")
        return 0
    create = mode == "install" and not dry_run
    with skills_fd(create=create) as (root, fd):
        plans: list[tuple[str, Path, str]] = []
        conflicts: list[str] = []
        for name, source in sorted(inventory.items()):
            if fd is None:
                current = None
            else:
                try:
                    current = snapshot(fd, name)
                except SyncError:
                    conflicts.append(str(root / name))
                    current = None
            state = "create" if current is None else "unchanged" if current[2] == str(source) else "conflict"
            if state == "conflict":
                conflicts.append(str(root / name))
            plans.append((name, source, state))
        if conflicts:
            raise SyncError("Claude install conflicts (nothing changed): " + ", ".join(sorted(set(conflicts))))
        if mode == "verify":
            missing = [str(root / name) for name, _, state in plans if state != "unchanged"]
            if missing:
                raise SyncError("Claude skills missing or divergent: " + ", ".join(missing))
            print(f"Claude installed inventory: OK ({len(plans)} skills)")
            return 0
        if dry_run:
            for name, source, state in plans:
                print(f"DRY-RUN {state}: {root / name} -> {source}")
            return 0
        if fd is None:
            raise SyncError("Claude skills directory could not be opened")
        created: list[tuple[str, tuple[int, int, str]]] = []
        try:
            for name, source, state in plans:
                if state == "unchanged":
                    continue
                staging = f".raphael-claude-{name}-{uuid.uuid4().hex}"
                os.symlink(str(source), staging, dir_fd=fd)
                staged = snapshot(fd, staging)
                assert staged is not None
                try:
                    os.link(staging, name, src_dir_fd=fd, dst_dir_fd=fd, follow_symlinks=False)
                    final = snapshot(fd, name)
                    if final is None:
                        raise SyncError(f"Claude link disappeared after creation: {name}")
                    created.append((name, final))
                finally:
                    unlink_owned(fd, staging, staged)
        except Exception:
            recovery_failures = [name for name, owned in reversed(created) if not unlink_owned(fd, name, owned)]
            if recovery_failures:
                raise SyncError("Claude install failed and preserved changed objects: " + ", ".join(recovery_failures))
            raise
        print(f"Claude skills installed: {len(created)} new, {len(plans) - len(created)} unchanged")
    return 0


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    group = parser.add_mutually_exclusive_group()
    group.add_argument("--check", action="store_const", const="check", dest="mode")
    group.add_argument("--install", action="store_const", const="install", dest="mode")
    group.add_argument("--verify-install", action="store_const", const="verify", dest="mode")
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args(argv)
    mode = args.mode or "check"
    if args.dry_run and mode != "install":
        parser.error("--dry-run requires --install")
    try:
        return run(mode, dry_run=args.dry_run)
    except (OSError, json.JSONDecodeError, SyncError) as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 2


if __name__ == "__main__":
    raise SystemExit(main())
