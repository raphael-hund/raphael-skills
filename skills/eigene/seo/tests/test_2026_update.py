#!/usr/bin/env python3
"""2026-09-Update: ga4-ki-traffic.md exists, carries mandatory tokens,
SKILL.md loads/triggers/3-Säulen-Regel stay wired."""

from __future__ import annotations

import re
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SKILL = ROOT / "SKILL.md"
REF_GA4 = ROOT / "references" / "ga4-ki-traffic.md"
REF_GEO = ROOT / "references" / "taktiken-ai-suche-geo.md"
REF_GSC_WF = ROOT / "references" / "taktiken-gsc-workflows.md"
REF_ROUTER = ROOT / "references" / "wissens-router.md"

GA4_TOKENS = ("GA4", "Referral", "Fallback")
GEO_TOKENS = ("52,7", "Personal Intelligence", "Query Fan-Out", "Claude-SearchBot")
# v2.1.0: Agentic-Commerce-Abschnitt entfernt (E-Commerce, kein
# Service-Business-Fokus) — Token darf nicht mehr im GEO-Reference stehen.
GEO_REMOVED_TOKENS = ("Agentic Commerce",)
GSC_TOKENS = ("Generative AI", "31.08.2026")
TRIGGERS = ("GA4", "AI-Referral", "Generative AI Reports")


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


class Update2026Tests(unittest.TestCase):
    def test_ga4_reference_exists(self):
        self.assertTrue(REF_GA4.is_file(), "references/ga4-ki-traffic.md missing")

    def test_ga4_reference_has_mandatory_tokens(self):
        text = REF_GA4.read_text(encoding="utf-8")
        for token in GA4_TOKENS:
            self.assertIn(token, text, f"ga4-ki-traffic.md missing {token}")

    def test_geo_reference_has_2026_tokens(self):
        text = REF_GEO.read_text(encoding="utf-8")
        for token in GEO_TOKENS:
            self.assertIn(token, text, f"taktiken-ai-suche-geo.md missing {token}")

    def test_geo_reference_agentic_commerce_removed(self):
        text = REF_GEO.read_text(encoding="utf-8")
        for token in GEO_REMOVED_TOKENS:
            self.assertNotIn(
                token, text,
                f"taktiken-ai-suche-geo.md: entfernter Abschnitt noch vorhanden ({token})",
            )

    def test_gsc_workflows_has_genai_tokens(self):
        text = REF_GSC_WF.read_text(encoding="utf-8")
        for token in GSC_TOKENS:
            self.assertIn(token, text, f"taktiken-gsc-workflows.md missing {token}")

    def test_loads_block_contains_ga4_reference(self):
        entries = _loads_entries(SKILL.read_text(encoding="utf-8"))
        self.assertGreater(len(entries), 0, "no loads-block parsed")
        self.assertIn("references/ga4-ki-traffic.md", entries)

    def test_all_loads_entries_exist(self):
        entries = _loads_entries(SKILL.read_text(encoding="utf-8"))
        for entry in entries:
            self.assertTrue((ROOT / entry).is_file(), f"loads entry missing: {entry}")

    def test_skill_has_ga4_triggers(self):
        text = SKILL.read_text(encoding="utf-8")
        for token in TRIGGERS:
            self.assertIn(token, text, f"SKILL.md missing trigger {token}")

    def test_skill_has_3_saeulen_rule(self):
        text = SKILL.read_text(encoding="utf-8")
        self.assertIn("3-Säulen-Regel", text)

    def test_router_references_ga4(self):
        text = REF_ROUTER.read_text(encoding="utf-8")
        self.assertIn("ga4-ki-traffic.md", text)


if __name__ == "__main__":
    unittest.main()
