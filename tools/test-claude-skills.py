#!/usr/bin/env python3
"""Deterministic tests for the Claude Code skill installer."""
from __future__ import annotations

import importlib.util
import os
import subprocess
import tempfile
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
SYNC_PATH = ROOT / "tools" / "sync-claude-skills.py"


def load_sync():
    spec = importlib.util.spec_from_file_location("sync_claude", SYNC_PATH)
    assert spec and spec.loader
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


sync = load_sync()


def invoke(home: Path, *args: str) -> subprocess.CompletedProcess[str]:
    env = dict(os.environ)
    env["HOME"] = str(home)
    return subprocess.run(["python3", str(SYNC_PATH), *args], cwd=ROOT, env=env, text=True, capture_output=True)


def main() -> int:
    inventory = sync.load_inventory()
    expected_count = sync.read_json(sync.CODEX_REGISTRY_PATH)["skills"]
    assert len(inventory) == len(expected_count)
    assert inventory["dynamic-workflow"] == ROOT / "skills" / "eigene" / "dynamic-workflow"
    assert inventory["kimi-sol"] == ROOT / "claude" / "skills" / "kimi-sol"

    with tempfile.TemporaryDirectory(prefix="claude-skills-") as td:
        home = Path(td) / "home"
        home.mkdir()
        dry = invoke(home, "--install", "--dry-run")
        assert dry.returncode == 0, dry.stderr
        assert not (home / ".claude").exists()

        installed = invoke(home, "--install")
        assert installed.returncode == 0, installed.stderr
        skills = home / ".claude" / "skills"
        assert all((skills / name).is_symlink() for name in inventory)
        assert invoke(home, "--verify-install").returncode == 0
        assert invoke(home, "--install").returncode == 0

        foreign_home = Path(td) / "foreign-home"
        foreign = foreign_home / ".claude" / "skills" / "ads"
        foreign.parent.mkdir(parents=True)
        foreign.write_text("preserve", encoding="utf-8")
        failed = invoke(foreign_home, "--install")
        assert failed.returncode != 0
        assert foreign.read_text(encoding="utf-8") == "preserve"
        assert not any((foreign.parent / name).is_symlink() for name in inventory if name != "ads")

        redirected_home = Path(td) / "redirected-home"
        redirected_home.mkdir()
        outside = Path(td) / "outside"
        outside.mkdir()
        os.symlink(outside, redirected_home / ".claude")
        redirected = invoke(redirected_home, "--install")
        assert redirected.returncode != 0
        assert not list(outside.iterdir())

    print(f"Claude skill installer tests: OK ({len(inventory)} skills, no-clobber, idempotent, no-follow)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
