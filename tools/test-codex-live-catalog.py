#!/usr/bin/env python3
"""Query a fresh Codex app-server and verify the installed skill catalog.

This is an integration test, not a model call.  It exercises Codex's real
plugin and skill discovery path through the public ``skills/list`` JSON-RPC
method, then compares the result with the pinned Raphael, gstack, and
Superpowers inventories.
"""
from __future__ import annotations

import json
import selectors
import subprocess
import time
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
CODEX_COMPAT = ROOT / "codex" / "compatibility.json"
GSTACK_STATE = Path.home() / ".local" / "state" / "raphael-codex-skills" / "upstream-links.json"
SUPERPOWERS_SOURCE = Path("/root/tools/vendor/superpowers/skills")


def frontmatter_name(path: Path) -> str:
    lines = path.read_text(encoding="utf-8").splitlines()
    if not lines or lines[0].strip() != "---":
        raise AssertionError(f"missing frontmatter: {path}")
    for line in lines[1:]:
        if line.strip() == "---":
            break
        if line.startswith("name:"):
            return line.split(":", 1)[1].strip().strip("\"'")
    raise AssertionError(f"missing frontmatter name: {path}")


def expected_inventories() -> tuple[set[str], set[str], set[str], Path]:
    raphael_data = json.loads(CODEX_COMPAT.read_text(encoding="utf-8"))
    raphael = set(raphael_data["skills"])
    assert len(raphael) == 32, f"expected 32 Raphael skills, found {len(raphael)}"

    state = json.loads(GSTACK_STATE.read_text(encoding="utf-8"))
    pack = Path(state["pack_root"])
    gstack_docs = [pack / "root" / "SKILL.md", *sorted((pack / "skills").glob("*/SKILL.md"))]
    gstack = {frontmatter_name(path) for path in gstack_docs}
    assert len(gstack_docs) == len(gstack) == 54, f"expected 54 gstack skills, found {len(gstack)}"

    superpowers = {
        f"superpowers:{frontmatter_name(path)}"
        for path in sorted(SUPERPOWERS_SOURCE.glob("*/SKILL.md"))
    }
    assert len(superpowers) == 14, f"expected 14 Superpowers skills, found {len(superpowers)}"
    return raphael, gstack, superpowers, pack


def live_catalog(cwd: Path, timeout_seconds: float = 15.0) -> list[dict[str, object]]:
    process = subprocess.Popen(
        ["codex", "app-server", "--stdio"],
        cwd=cwd,
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
        bufsize=1,
    )
    assert process.stdin is not None and process.stdout is not None
    requests = [
        {
            "jsonrpc": "2.0",
            "id": 1,
            "method": "initialize",
            "params": {
                "clientInfo": {"name": "raphael-skill-audit", "version": "1.0"},
                "capabilities": {"experimentalApi": True},
            },
        },
        {"jsonrpc": "2.0", "method": "initialized", "params": {}},
        {
            "jsonrpc": "2.0",
            "id": 2,
            "method": "skills/list",
            "params": {"cwds": [str(cwd)], "forceReload": True},
        },
    ]
    for request in requests:
        process.stdin.write(json.dumps(request, separators=(",", ":")) + "\n")
    process.stdin.flush()

    selector = selectors.DefaultSelector()
    selector.register(process.stdout, selectors.EVENT_READ)
    deadline = time.monotonic() + timeout_seconds
    response: dict[str, object] | None = None
    try:
        while time.monotonic() < deadline:
            ready = selector.select(max(0.0, deadline - time.monotonic()))
            if not ready:
                break
            line = process.stdout.readline()
            if not line:
                break
            message = json.loads(line)
            if message.get("id") == 2:
                response = message
                break
    finally:
        selector.close()
        process.terminate()
        try:
            process.wait(timeout=3)
        except subprocess.TimeoutExpired:
            process.kill()
            process.wait(timeout=3)

    if response is None:
        stderr = process.stderr.read() if process.stderr is not None else ""
        raise AssertionError(f"Codex skills/list timed out or closed early: {stderr[-1000:]}")
    if response.get("error") is not None:
        raise AssertionError(f"Codex skills/list failed: {response['error']}")
    result = response.get("result")
    if not isinstance(result, dict) or not isinstance(result.get("data"), list):
        raise AssertionError(f"malformed Codex skills/list response: {response}")
    entries = result["data"]
    if len(entries) != 1 or not isinstance(entries[0], dict):
        raise AssertionError(f"unexpected Codex skills/list cwd entries: {entries}")
    entry = entries[0]
    if entry.get("errors"):
        raise AssertionError(f"Codex catalog discovery errors: {entry['errors']}")
    skills = entry.get("skills")
    if not isinstance(skills, list):
        raise AssertionError("Codex catalog has no skills array")
    return skills


def main() -> int:
    raphael, gstack, superpowers, pack = expected_inventories()
    skills = live_catalog(Path("/root"))
    names = [str(skill.get("name", "")) for skill in skills]
    paths = {str(skill.get("name", "")): Path(str(skill.get("path", ""))) for skill in skills}
    assert len(names) == len(set(names)), "Codex live catalog contains duplicate names"
    assert all(skill.get("enabled") is True for skill in skills), "Codex live catalog contains disabled skills"
    live = set(names)
    for label, expected in (("Raphael", raphael), ("gstack", gstack), ("Superpowers", superpowers)):
        missing = sorted(expected - live)
        assert not missing, f"missing {label} live skills: {missing}"

    wrong_raphael = sorted(name for name in raphael if ROOT / "codex" / "skills" / name not in paths[name].parents)
    assert not wrong_raphael, f"Raphael skills resolved outside adapter tree: {wrong_raphael}"
    wrong_gstack = sorted(name for name in gstack if pack not in paths[name].parents)
    assert not wrong_gstack, f"gstack skills resolved outside attested pack: {wrong_gstack}"
    wrong_superpowers = sorted(
        name for name in superpowers
        if "/.codex/plugins/cache/superpowers-dev/superpowers/6.1.1/skills/" not in str(paths[name])
    )
    assert not wrong_superpowers, f"Superpowers skills resolved outside plugin cache: {wrong_superpowers}"

    print(
        "Codex live catalog: OK "
        f"({len(skills)} total; Raphael {len(raphael)}, gstack {len(gstack)}, Superpowers {len(superpowers)})"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
