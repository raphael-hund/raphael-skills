#!/usr/bin/env python3
"""Verify Claude's installed Raphael, gstack, and Superpowers inventories."""
from __future__ import annotations

import json
import os
import re
import subprocess
from collections import Counter
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
CLAUDE_SKILLS = Path.home() / ".claude" / "skills"
GSTACK_COMMIT = "a3259400a366593e0c909dd9ac3e59752efd2488"
GSTACK_VENDOR = Path("/root/tools/vendor/gstack")


def frontmatter_name(path: Path) -> str:
    match = re.search(r"^name:\s*([^\s#]+)", path.read_text(encoding="utf-8"), re.MULTILINE)
    assert match, f"missing frontmatter name: {path}"
    return match.group(1).strip("\"'")


def run(*command: str, cwd: Path = ROOT) -> str:
    result = subprocess.run(command, cwd=cwd, text=True, capture_output=True)
    assert result.returncode == 0, (result.stdout + result.stderr).strip()
    return result.stdout


def main() -> int:
    registry = json.loads((ROOT / "claude" / "compatibility.json").read_text(encoding="utf-8"))
    raphael_names = set(json.loads((ROOT / "codex" / "compatibility.json").read_text(encoding="utf-8"))["skills"])
    assert registry["expected_count"] == len(raphael_names)
    for name in raphael_names:
        installed = CLAUDE_SKILLS / name
        assert installed.is_symlink(), f"missing Claude Raphael link: {name}"
        assert (installed / "SKILL.md").is_file(), f"broken Claude Raphael link: {name}"
        assert frontmatter_name(installed / "SKILL.md") == name
    assert (CLAUDE_SKILLS / "web").resolve() == (ROOT / "skills" / "eigene" / "web").resolve()

    gstack_link = CLAUDE_SKILLS / "gstack"
    assert gstack_link.is_symlink(), "native Claude gstack link is missing"
    gstack = gstack_link.resolve()
    assert gstack.name == f"{GSTACK_COMMIT}-prefix"
    assert run("git", "rev-parse", "HEAD", cwd=gstack).strip() == GSTACK_COMMIT
    documents = [gstack / "SKILL.md", *sorted(gstack.glob("*/SKILL.md"))]
    names = [frontmatter_name(path) for path in documents]
    counts = Counter(names)
    assert len(documents) == 55, f"expected 55 native docs including one alias, found {len(documents)}"
    assert len(counts) == 54, f"expected 54 unique native gstack identities, found {len(counts)}"
    assert {name: count for name, count in counts.items() if count > 1} == {"gstack-open-gstack-browser": 2}
    assert all(name == "gstack" or name.startswith("gstack-") for name in counts)
    assert run("git", "status", "--porcelain", cwd=GSTACK_VENDOR).strip() == "", "shared gstack vendor checkout is dirty"

    plugins = json.loads(run("claude", "plugin", "list", "--json"))
    matches = [item for item in plugins if item.get("id") == "superpowers@claude-plugins-official"]
    assert len(matches) == 1
    plugin = matches[0]
    assert plugin.get("enabled") is True and plugin.get("version") == "6.1.1"
    plugin_root = Path(plugin["installPath"])
    assert plugin_root == Path("/root/.claude/plugins/cache/claude-plugins-official/superpowers/6.1.1")
    superpower_docs = sorted((plugin_root / "skills").glob("*/SKILL.md"))
    assert len(superpower_docs) == 14
    assert len({frontmatter_name(path) for path in superpower_docs}) == 14
    run("claude", "plugin", "validate", "/root/tools/vendor/superpowers")

    broken = [path for path in CLAUDE_SKILLS.iterdir() if path.is_symlink() and not os.path.exists(path)]
    assert not broken, f"broken Claude skill links: {broken}"
    print(f"Claude live catalog: OK (Raphael {len(raphael_names)}, gstack 54, Superpowers 14)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
