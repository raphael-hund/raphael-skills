#!/usr/bin/env python3
"""Runtime registration checks for vendored skill packs."""
from __future__ import annotations

import json
import subprocess
import sys
import unittest
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent


class RuntimeVendorIntegrationTests(unittest.TestCase):
    def test_agentcookie_is_registered_for_codex_and_kimi(self) -> None:
        codex = json.loads((REPO_ROOT / "codex/compatibility.json").read_text(encoding="utf-8"))
        kimi = json.loads((REPO_ROOT / "kimi/compatibility.json").read_text(encoding="utf-8"))

        codex_entry = codex["skills"].get("agentcookie")
        self.assertIsNotNone(codex_entry)
        self.assertEqual(codex_entry["source"], "vendor-packs/agentcookie/SKILL.md")
        self.assertEqual(codex_entry["mode"], "source-adapter")
        self.assertTrue(codex_entry["rationale"])
        self.assertTrue(codex_entry["triggers"])
        self.assertEqual(
            kimi["skills"].get("agentcookie"),
            {"source": "vendor-packs/agentcookie/SKILL.md", "mode": "source-adapter"},
        )

    def test_claude_expected_count_matches_codex(self) -> None:
        codex = json.loads((REPO_ROOT / "codex/compatibility.json").read_text(encoding="utf-8"))
        claude = json.loads((REPO_ROOT / "claude/compatibility.json").read_text(encoding="utf-8"))
        self.assertEqual(claude["expected_count"], len(codex["skills"]))

    def test_index_contains_agentcookie_and_vendored_pack_counts(self) -> None:
        index = json.loads((REPO_ROOT / "index.json").read_text(encoding="utf-8"))
        names = [entry["name"] for entry in index["skills"]]
        self.assertIn("agentcookie", names)
        self.assertEqual(sum(name.startswith("ce-") for name in names), 33)
        self.assertEqual(sum(name.startswith("pstack-") for name in names), 44)

    def test_pstack_show_me_your_work_passes_validator(self) -> None:
        result = subprocess.run(
            [
                sys.executable,
                "tools/validate-skill.py",
                "vendor-packs/pstack/pstack-show-me-your-work",
            ],
            cwd=REPO_ROOT,
            check=False,
            capture_output=True,
            text=True,
        )
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)


if __name__ == "__main__":
    raise SystemExit(unittest.main(verbosity=2))
