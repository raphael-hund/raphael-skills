#!/usr/bin/env python3
"""Claude + Grok must resolve the same /seo and fire on the new triggers."""

from __future__ import annotations

import os
import unittest
from pathlib import Path

# VPS-Betriebspfad (/root/raphael-skills ist ein Alias auf /root/skills);
# auf dem Mac (oder in CI) Env-Override oder repo-relativ.
_default = Path("/root/raphael-skills/skills/eigene/seo")
CANON = Path(os.environ.get("SEO_SKILL_CANON", _default))
if not CANON.exists():
    CANON = Path(__file__).resolve().parent.parent
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


def _exists(path: Path) -> bool:
    """Path.exists() wirft PermissionError auf fremden VPS-Pfaden (Sandbox/CI)."""
    try:
        return path.exists()
    except (PermissionError, OSError):
        return False


class HarnessWiringTests(unittest.TestCase):
    def test_canonical_description_has_triggers(self):
        text = (CANON / "SKILL.md").read_text(encoding="utf-8")
        for token in TRIGGERS:
            self.assertIn(token, text)

    def test_claude_symlink_is_canonical(self):
        """Der Claude-Link muss auf ein VOLLSTÄNDIGES seo-Skill zeigen.

        Auf dem VPS zeigt er bewusst auf den vollen Spiegel
        (/root/...), während CANON der reduzierte Betriebssatz
        (/root/skills/...) ist. Beide Bäume sind absichtlich nicht identisch,
        deshalb wird hier Inhalt geprüft, nicht Pfadgleichheit.
        """
        claude = Path("/root/.claude/skills/seo")
        if not _exists(claude):
            self.skipTest("no Claude skill dir")
        self.assertTrue((claude / "SKILL.md").is_file(), f"{claude}: SKILL.md fehlt")
        self.assertTrue((claude / "scripts" / "ranking_plan.py").is_file())
        self.assertTrue((claude / "references" / "graustufen.md").is_file())

    def test_grok_and_codex_adapter_triggers(self):
        adapters = [
            Path("/root/raphael-skills/codex/skills/seo/SKILL.md"),
            Path("/root/raphael-skills/kimi/skills/seo/SKILL.md"),
            Path("/root/.agents/skills/seo/SKILL.md"),
        ]
        for path in adapters:
            if not _exists(path):
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
