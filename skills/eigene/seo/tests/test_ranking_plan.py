#!/usr/bin/env python3
"""Drive the shipped ranking_plan.py on fixture SERP+GSC rows."""

from __future__ import annotations

import hashlib
import subprocess
import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / "scripts" / "ranking_plan.py"
SERP = ROOT / "tests" / "fixtures" / "serp.json"
GSC = ROOT / "tests" / "fixtures" / "gsc.json"
GSC_READ_EXPORT = ROOT / "tests" / "fixtures" / "gsc-read-export.json"
GSC_READ = ROOT / "scripts" / "gsc_read.py"
SNAPSHOT = ROOT / "tests" / "fixtures" / "gsc-snapshot"

REQUIRED = (
    "Keyword-Ziele",
    "Google-Aktionen",
    "KI-Engine-Aktionen",
    "Beleg-Zeiger",
    "30-Tage-Schritte",
    "90-Tage-Schritte",
)
ENGINES = (
    "Google AI Overviews",
    "Google AI Mode",
    "ChatGPT",
    "Perplexity",
    "Bing Copilot",
)


def run_plan(extra=()):
    cmd = [
        sys.executable,
        str(SCRIPT),
        "--property",
        "fixture.example",
        "--serp",
        str(SERP),
        "--gsc",
        str(GSC),
        *extra,
    ]
    result = subprocess.run(cmd, check=False, capture_output=True, text=True)
    return result


class RankingPlanTests(unittest.TestCase):
    def test_script_exists(self):
        self.assertTrue(SCRIPT.is_file())

    def test_two_runs_identical_and_complete(self):
        first = run_plan()
        second = run_plan()
        self.assertEqual(first.returncode, 0, first.stderr)
        self.assertEqual(second.returncode, 0, second.stderr)
        self.assertEqual(first.stdout, second.stdout)
        self.assertGreater(len(first.stdout.strip()), 0)
        digest_a = hashlib.sha256(first.stdout.encode()).hexdigest()
        digest_b = hashlib.sha256(second.stdout.encode()).hexdigest()
        self.assertEqual(digest_a, digest_b)
        text = first.stdout
        for section in REQUIRED:
            self.assertIn(f"## {section}", text)
            start = text.index(f"## {section}")
            rest = text[start + 3 :].split("## ", 1)[0]
            self.assertTrue(rest.strip(), f"empty section {section}")
        for engine in ENGINES:
            self.assertIn(engine, text)
        # Proves the transform read the fixture, not a hardcoded oracle.
        self.assertIn("dachdecker stuttgart", text)
        self.assertIn("handwerker offerte vorlage", text)
        self.assertIn("günstiger dachdecker notdienst", text)
        self.assertIn("quick_win", text)
        self.assertIn("[gsc:", text)

    def test_accepts_gsc_read_export_schema(self):
        result = subprocess.run(
            [
                sys.executable,
                str(SCRIPT),
                "--property",
                "fixture.example",
                "--serp",
                str(SERP),
                "--gsc",
                str(GSC_READ_EXPORT),
            ],
            check=False,
            capture_output=True,
            text=True,
        )
        self.assertEqual(result.returncode, 0, result.stderr)
        text = result.stdout
        self.assertIn("fixture brand gmbh", text)
        self.assertIn("dachdecker stuttgart", text)
        self.assertIn("orphan keyword no page", text)
        self.assertRegex(text, r"fixture brand gmbh — (watch|money)")
        self.assertNotIn("fixture brand gmbh — content_gap", text)
        self.assertIn("orphan keyword no page — content_gap", text)
        self.assertIn("dachdecker stuttgart — quick_win", text)
        for engine in ENGINES:
            self.assertIn(engine, text)

    def test_pipeline_gsc_read_then_plan(self):
        import tempfile

        with tempfile.TemporaryDirectory() as tmp:
            export = Path(tmp) / "from-gsc-read.json"
            read = subprocess.run(
                [
                    sys.executable,
                    str(GSC_READ),
                    "--from-snapshots",
                    str(SNAPSHOT),
                    "--export",
                    str(export),
                ],
                check=False,
                capture_output=True,
                text=True,
            )
            self.assertEqual(read.returncode, 0, read.stderr)
            plan = subprocess.run(
                [
                    sys.executable,
                    str(SCRIPT),
                    "--property",
                    "fixture.example",
                    "--serp",
                    str(SERP),
                    "--gsc",
                    str(export),
                ],
                check=False,
                capture_output=True,
                text=True,
            )
            self.assertEqual(plan.returncode, 0, plan.stderr)
            self.assertIn("dachdecker stuttgart", plan.stdout)
            self.assertIn("## Keyword-Ziele", plan.stdout)

    def test_grayhat_only_when_flagged(self):
        plain = run_plan()
        flagged = run_plan(("--grayhat",))
        self.assertEqual(plain.returncode, 0, plain.stderr)
        self.assertEqual(flagged.returncode, 0, flagged.stderr)
        self.assertNotIn("## Graustufen", plain.stdout)
        self.assertIn("## Graustufen", flagged.stdout)
        self.assertIn("Penalty", flagged.stdout)


if __name__ == "__main__":
    unittest.main()
