#!/usr/bin/env python3
"""Borja-Update 2026-09-18: alle 8 neuen Artikel-IDs (6 neu + 2 Zusatzfunde)
stehen in references/playbooks-borjafat.md und im Artikel-Index.
Refactoring v2.1.0: Index fuehrt eine Status-Spalte (uebernommen /
nicht uebernommen); SaaS-/Startup-/Graustufen-Playbooks sind als
"nicht uebernommen" markiert, Modell-Marken nur noch als Titel-Provenienz
im Index."""

from __future__ import annotations

import re
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PLAYBOOKS = ROOT / "references" / "playbooks-borjafat.md"
SKILL = ROOT / "SKILL.md"

NEW_IDS = (
    # 6 neue Artikel 09.09. bis 18.09.2026
    "2097697305725960506",  # 09.09. 8 Startup-Growth-Channels (nicht uebernommen)
    "2098138361324347396",  # 10.09. Google-Trends-Feature (via Rattibha)
    "2099860622955397212",  # 15.09. Customer-Story-Backlinks
    "2100228509398335975",  # 16.09. Agent-Setup, 15 Jobs (modell-neutral bereinigt)
    "2100548186448289970",  # 17.09. 12 Backlink-Taktiken mit AI
    "2100908380793475496",  # 18.09. 8 Internal-Linking-Hacks
    # 2 Zusatzfunde im Alt-Zeitraum
    "2087509184585646163",  # 12.08. 6-step internal linking task
    "2095844768081179067",  # 04.09. Buy-Intent-pSEO mit Website-Builder-Agent (nicht uebernommen)
)

# IDs, deren Playbook-Inhalt seit v2.1.0 bewusst NICHT uebernommen ist
# (kein Service-Business-Fokus bzw. Graustufen-Charakter).
NOT_UEBERNOMMEN_IDS = (
    "2095133322191970796",  # 02.09. Video-GEO fuer SaaS
    "2084599815803998208",  # 04.08. Parasite-pSEO (Risiko-Wissen in graustufen.md)
    "2097697305725960506",  # 09.09. 8 Startup-Growth-Channels
    "2095844768081179067",  # 04.09. Buy-Intent-pSEO-Zusatzfund
)

MODEL_TOKENS = re.compile(r"GPT-6|Astra|Framer")


def _artikel_index(text: str) -> str:
    """Section between '## Artikel-Index' and the next '## ' heading."""
    match = re.search(r"^## Artikel-Index\n(.*?)^## ", text, re.MULTILINE | re.DOTALL)
    return match.group(1) if match else ""


class BorjaUpdateTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.text = PLAYBOOKS.read_text(encoding="utf-8")
        cls.index = _artikel_index(cls.text)

    def test_playbooks_exists(self):
        self.assertTrue(PLAYBOOKS.is_file(), "references/playbooks-borjafat.md missing")

    def test_all_new_ids_in_playbooks(self):
        for article_id in NEW_IDS:
            self.assertIn(article_id, self.text, f"ID {article_id} fehlt in playbooks-borjafat.md")

    def test_all_new_ids_in_artikel_index(self):
        self.assertTrue(self.index, "Artikel-Index-Abschnitt nicht geparst")
        for article_id in NEW_IDS:
            self.assertIn(article_id, self.index, f"ID {article_id} fehlt im Artikel-Index")

    def test_index_has_status_column(self):
        self.assertTrue(self.index, "Artikel-Index-Abschnitt nicht geparst")
        header = next(l for l in self.index.splitlines() if l.startswith("| ID "))
        self.assertIn("Status", header, "Artikel-Index ohne Status-Spalte")

    def test_nicht_uebernommen_marked_in_index(self):
        self.assertTrue(self.index, "Artikel-Index-Abschnitt nicht geparst")
        for article_id in NOT_UEBERNOMMEN_IDS:
            row = next(
                (l for l in self.index.splitlines() if article_id in l), None
            )
            self.assertIsNotNone(row, f"ID {article_id} fehlt im Artikel-Index")
            self.assertIn(
                "nicht übernommen", row,
                f"ID {article_id} im Index nicht als 'nicht übernommen' markiert",
            )

    def test_removed_sections_carry_nicht_uebernommen_stub(self):
        for heading in ("### 9.3", "### 9.4", "### 9.6"):
            section = re.search(
                rf"^{re.escape(heading)}.*?\n(.*?)(?=^### |^## )",
                self.text, re.MULTILINE | re.DOTALL,
            )
            self.assertTrue(section, f"Abschnitt {heading} nicht geparst")
            self.assertIn(
                "nicht übernommen", section.group(0),
                f"Abschnitt {heading} ohne 'nicht übernommen'-Vermerk",
            )

    def test_agent_setup_section_model_neutral(self):
        self.assertIn(
            "### 12.4 Agent-Setup mit 15 delegierbaren Jobs", self.text,
            "Abschnitt 12.4 nicht modell-neutral umbenannt",
        )

    def test_no_model_tokens_outside_index(self):
        body = self.text.replace(self.index, "") if self.index else self.text
        hits = MODEL_TOKENS.findall(body)
        self.assertEqual(
            hits, [],
            f"Modell-Marken ausserhalb des Artikel-Index: {hits} "
            "(erlaubt ist nur Titel-Provenienz im Index)",
        )

    def test_title_date_range_extended(self):
        first_line = self.text.splitlines()[0]
        self.assertIn("18.09.2026", first_line, "Titel-Zeitraum nicht auf 18.09.2026 erweitert")

    def test_rattibha_provenance_marked(self):
        self.assertIn("Rattibha", self.text, "Rattibha-Provenienzvermerk fehlt")

    def test_link_exchange_warning_in_risk_section(self):
        match = re.search(r"^## 14\. Risiko.*?\n(.*?)^## ", self.text, re.MULTILINE | re.DOTALL)
        self.assertTrue(match, "Abschnitt 14 nicht geparst")
        risk = match.group(1)
        self.assertIn("2100548186448289970", risk, "Borja-Exchange-Warnung fehlt in Abschnitt 14")

    def test_quellenmatrix_has_new_rows(self):
        match = re.search(r"^## 16\. Quellenmatrix.*?\n(.*)$", self.text, re.MULTILINE | re.DOTALL)
        self.assertTrue(match, "Quellenmatrix nicht geparst")
        matrix = match.group(1)
        for article_id in NEW_IDS:
            self.assertIn(article_id, matrix, f"ID {article_id} fehlt in der Quellenmatrix")

    def test_skill_source_block_updated(self):
        text = SKILL.read_text(encoding="utf-8")
        self.assertIn("09.09. bis 18.09.2026", text, "SKILL.md source-Block ohne Playbooks-Update")
        self.assertIn("Google Trends SEO", text, "SKILL.md Trigger 'Google Trends SEO' fehlt")


if __name__ == "__main__":
    unittest.main()
