#!/usr/bin/env python3
"""SE-Ranking-MCP integration: references exist, carry mandatory tokens,
SKILL.md loads/triggers/version stay wired."""

from __future__ import annotations

import re
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SKILL = ROOT / "SKILL.md"
REF_MCP = ROOT / "references" / "se-ranking-mcp.md"
REF_WF = ROOT / "references" / "se-ranking-workflows.md"

MANDATORY_TOKENS = (
    "DATA_getSubscription",
    "api.seranking.com/mcp",
    "PROJECT_",
    "AIRT",
    "Credit",
)

TRIGGERS = ("SE Ranking", "SE-Ranking")


def _loads_entries(text: str) -> list[str]:
    """Extract the YAML loads-list from the SKILL.md frontmatter."""
    match = re.search(r"^loads:\n((?:  - .+\n)+)", text, re.MULTILINE)
    if not match:
        return []
    return [
        line.strip()[2:].strip()
        for line in match.group(1).splitlines()
        if line.strip().startswith("- ")
    ]


class SeRankingMcpTests(unittest.TestCase):
    def test_new_references_exist(self):
        self.assertTrue(REF_MCP.is_file(), "references/se-ranking-mcp.md missing")
        self.assertTrue(REF_WF.is_file(), "references/se-ranking-workflows.md missing")

    def test_mcp_reference_has_mandatory_tokens(self):
        text = REF_MCP.read_text(encoding="utf-8")
        for token in MANDATORY_TOKENS:
            self.assertIn(token, text, f"se-ranking-mcp.md missing {token}")

    def test_all_loads_entries_exist(self):
        text = SKILL.read_text(encoding="utf-8")
        entries = _loads_entries(text)
        self.assertGreater(len(entries), 0, "no loads-block parsed")
        for entry in entries:
            self.assertTrue((ROOT / entry).is_file(), f"loads entry missing: {entry}")

    def test_loads_block_contains_new_references(self):
        text = SKILL.read_text(encoding="utf-8")
        entries = _loads_entries(text)
        self.assertIn("references/se-ranking-mcp.md", entries)
        self.assertIn("references/se-ranking-workflows.md", entries)

    def test_skill_has_new_triggers_and_version(self):
        text = SKILL.read_text(encoding="utf-8")
        for token in TRIGGERS:
            self.assertIn(token, text, f"SKILL.md missing trigger {token}")
        self.assertIn("version: 2.1.0", text)


if __name__ == "__main__":
    unittest.main()
