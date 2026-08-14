#!/usr/bin/env python3
"""Drive shipped gsc_read.py on a fixture snapshot; block write endpoints."""

from __future__ import annotations

import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / "scripts" / "gsc_read.py"
SNAPSHOT = ROOT / "tests" / "fixtures" / "gsc-snapshot"
PLAN = ROOT / "scripts" / "ranking_plan.py"

WRITE_MARKERS = (
    "indexing.googleapis.com",
    "urlNotifications:publish",
    "urlNotifications",
)


class GscReadTests(unittest.TestCase):
    def test_no_write_endpoints_in_skill_scripts(self):
        for path in (SCRIPT, PLAN):
            text = path.read_text(encoding="utf-8")
            for marker in WRITE_MARKERS:
                self.assertNotIn(marker, text, f"{path.name} contains {marker}")

    def test_from_snapshots_exports_query_rows(self):
        with tempfile.TemporaryDirectory() as tmp:
            export = Path(tmp) / "export.json"
            result = subprocess.run(
                [
                    sys.executable,
                    str(SCRIPT),
                    "--from-snapshots",
                    str(SNAPSHOT),
                    "--export",
                    str(export),
                ],
                check=False,
                capture_output=True,
                text=True,
            )
            self.assertEqual(result.returncode, 0, result.stderr)
            summary = json.loads(result.stdout)
            self.assertGreaterEqual(summary["query_rows"], 1)
            self.assertGreaterEqual(summary["page_rows"], 1)
            body = json.loads(export.read_text(encoding="utf-8"))
            row = body["snapshots"][0]["top_queries"][0]
            for key in ("query", "impressions", "clicks", "ctr", "position"):
                self.assertIn(key, row)
            self.assertEqual(row["query"], "dachdecker stuttgart")

    def test_setup_fallback_text(self):
        result = subprocess.run(
            [sys.executable, str(SCRIPT), "--setup"],
            check=False,
            capture_output=True,
            text=True,
        )
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertIn("GSC-Setup-Fallback", result.stdout)
        self.assertIn("GOOGLE_OAUTH_REFRESH_TOKEN", result.stdout)


if __name__ == "__main__":
    unittest.main()
