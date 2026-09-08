#!/usr/bin/env python3
"""Claude + Grok must resolve the same /seo and fire on the new triggers."""

from __future__ import annotations

import unittest
from pathlib import Path

CANON = Path("/root/raphael-skills/skills/eigene/seo")
TRIGGERS = (
    "Ranking-Plan",
    "Graustufen",
    "gray-hat",
    "asozial SEO",
    "GSC",
    "AEO",
    "GEO",
    "AI Overviews",
    "ChatGPT",
    "Perplexity",
    "Bing Copilot",
)


class HarnessWiringTests(unittest.TestCase):
    def test_canonical_description_has_triggers(self):
        text = (CANON / "SKILL.md").read_text(encoding="utf-8")
        for token in TRIGGERS:
            self.assertIn(token, text)

    def test_claude_symlink_is_canonical(self):
        claude = Path("/root/.claude/skills/seo")
        if not claude.exists():
            self.skipTest("no Claude skill dir")
        self.assertEqual(claude.resolve(), CANON.resolve())
        self.assertTrue((claude / "scripts" / "ranking_plan.py").is_file())
        self.assertTrue((claude / "references" / "graustufen.md").is_file())

    def test_grok_and_codex_adapter_triggers(self):
        adapters = [
            Path("/root/raphael-skills/codex/skills/seo/SKILL.md"),
            Path("/root/raphael-skills/kimi/skills/seo/SKILL.md"),
            Path("/root/.agents/skills/seo/SKILL.md"),
        ]
        for path in adapters:
            if not path.exists():
                continue
            if path.resolve() == (CANON / "SKILL.md").resolve():
                # Symlink auf die kanonische Datei: kein Adapter, nichts zu prüfen.
                continue
            text = path.read_text(encoding="utf-8")
            self.assertIn("/root/raphael-skills/skills/eigene/seo/SKILL.md", text)
            for token in TRIGGERS:
                self.assertIn(token, text, f"{path} missing {token}")

    def test_scripts_exist_at_absolute_paths(self):
        for name in ("ranking_plan.py", "gsc_read.py"):
            self.assertTrue((CANON / "scripts" / name).is_file())


if __name__ == "__main__":
    unittest.main()
