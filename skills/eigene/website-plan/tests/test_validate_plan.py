#!/usr/bin/env python3

import csv
import subprocess
import tempfile
import unittest
from pathlib import Path

from PIL import Image


SKILL = Path(__file__).resolve().parents[1]
VALIDATOR = SKILL / "scripts" / "validate-plan.py"
REQUIRED = (
    "00-meta-plan.md", "01-firma-dossier.md", "01b-online-praesenz.md",
    "01c-research-critic.md", "02-asset-inventar.md", "02b-asset-gaps.md",
    "04-seo-plan.md", "04b-seo-critic.md", "04c-growth-critic.md",
    "05-sitemap-ia.md", "05b-copy-style.md", "07-design-system-plan.md",
    "08-component-map.md", "10-roadmap.md", "12-verbote-und-gates.md",
    "13-final-critic.md", "09-mockups/reference-manifest.md",
    "09-mockups/reference-manifest.tsv", "09-mockups/gpt-prompts.md",
    "09-mockups/comparison-manifest.tsv",
)


class ValidatePlanTest(unittest.TestCase):
    def run_validator(self, path: Path):
        return subprocess.run(
            ["python3", str(VALIDATOR), str(path)],
            text=True, capture_output=True, check=False,
        )

    def test_missing_directory_fails(self):
        result = self.run_validator(Path("/definitely/missing/website-plan"))
        self.assertEqual(result.returncode, 1)
        self.assertIn("plan directory missing", result.stderr)

    def test_minimal_verified_fixture_passes(self):
        with tempfile.TemporaryDirectory() as tmp:
            out = Path(tmp)
            mockups = out / "09-mockups"
            refs = mockups / "references"
            generated = mockups / "generated"
            refs.mkdir(parents=True)
            generated.mkdir(parents=True)

            for relative in REQUIRED:
                path = out / relative
                path.parent.mkdir(parents=True, exist_ok=True)
                path.write_text("ok\n", encoding="utf-8")
            (out / "00-meta-plan.md").write_text("Run-ID: wf_fixture-1\n", encoding="utf-8")
            (out / "13-final-critic.md").write_text("VERDICT: PASS\n", encoding="utf-8")
            (out / "12-verbote-und-gates.md").write_text("G-DESIGN_CHOICE: A\n", encoding="utf-8")

            pages = out / "06-seiten"
            pages.mkdir()
            (pages / "01-home.md").write_text(
                "# Home\n## Section: Hero\n### Zweck\n### Finale Copy\n### Layout\n"
                "Desktop Mobile\n### Components\n### Motion\n### SEO\n### Mockup-Brief\n",
                encoding="utf-8",
            )
            route_header = ["route","indexation","priority","owner_file","meta","h1","h2_outline","links","schema","status"]
            with (pages / "route-manifest.tsv").open("w", encoding="utf-8", newline="") as handle:
                writer = csv.writer(handle, delimiter="\t")
                writer.writerow(route_header)
                writer.writerow(["/","index","P0","01-home.md","yes","yes","yes","yes","WebPage","VERIFIED"])

            ref_header = ["id","direction","source_url","captured_at","file","viewport","region","pattern_take","do_not_copy","model_role","suitability"]
            ref_rows = []
            prompt_blocks = []
            for d_index, direction in enumerate("ABC"):
                pairs = []
                for number in (1, 2):
                    rid = f"REF-{direction}-{number:02d}"
                    relative = f"09-mockups/references/{direction}-{number}.png"
                    Image.new("RGB", (640, 360), (40 + d_index * 50, number * 40, 80)).save(out / relative)
                    ref_rows.append([
                        rid, direction, "https://example.com", "2026-08-12", relative,
                        "1440x900", "hero", "layout", "copy/logo", "composition",
                        "2" if number == 1 else "1",
                    ])
                    pairs.append(f"{rid} -> {relative}")
                prompt_blocks.append(f"## Prompt {direction}\n" + "\n".join(pairs))
            with (mockups / "reference-manifest.tsv").open("w", encoding="utf-8", newline="") as handle:
                writer = csv.writer(handle, delimiter="\t")
                writer.writerow(ref_header)
                writer.writerows(ref_rows)
            (mockups / "reference-manifest.md").write_text("# References\n", encoding="utf-8")
            (mockups / "gpt-prompts.md").write_text("\n\n".join(prompt_blocks) + "\n", encoding="utf-8")

            compare_header = ["direction","file","viewport","copy_sha256","source_prompt","review"]
            with (mockups / "comparison-manifest.tsv").open("w", encoding="utf-8", newline="") as handle:
                writer = csv.writer(handle, delimiter="\t")
                writer.writerow(compare_header)
                for d_index, direction in enumerate("ABC"):
                    relative = f"09-mockups/generated/compare-{direction}.png"
                    Image.new("RGB", (800, 450), (80 + d_index * 50, 100, 120)).save(out / relative)
                    writer.writerow([direction, relative, "1440x900", "b"*64, f"Prompt {direction}", "PASS"])

            Image.new("RGB", (1440, 900), (20, 20, 20)).save(generated / "d.png")
            Image.new("RGB", (900, 1200), (30, 30, 30)).save(generated / "m.png")
            header = ["route","section_id","section_name","viewport","file","copy_source","copy_sha256","reduced_motion","cookie_state","data_state","review"]
            with (mockups / "mockup-manifest.tsv").open("w", encoding="utf-8", newline="") as handle:
                writer = csv.writer(handle, delimiter="\t")
                writer.writerow(header)
                for viewport, filename in (("1440x900", "d.png"), ("390x844", "m.png")):
                    writer.writerow(["/","H00","Hero",viewport,f"generated/{filename}","06-seiten/01-home.md","a"*64,"reduce","dismissed","normal","PASS"])

            result = self.run_validator(out)
            self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
            self.assertIn("PLAN_VERIFIED=YES", result.stdout)

    def test_owner_blocker_fails(self):
        with tempfile.TemporaryDirectory() as tmp:
            result = self.run_validator(Path(tmp))
            self.assertEqual(result.returncode, 1)


if __name__ == "__main__":
    unittest.main()
