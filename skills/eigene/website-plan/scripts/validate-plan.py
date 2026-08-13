#!/usr/bin/env python3
"""Fail-closed structural validator for website-plan outputs."""

from __future__ import annotations

import csv
import re
import sys
from pathlib import Path


REQUIRED_FILES = (
    "00-meta-plan.md",
    "01-firma-dossier.md",
    "01b-online-praesenz.md",
    "01c-research-critic.md",
    "02-asset-inventar.md",
    "02b-asset-gaps.md",
    "04-seo-plan.md",
    "04b-seo-critic.md",
    "04c-growth-critic.md",
    "05-sitemap-ia.md",
    "05b-copy-style.md",
    "07-design-system-plan.md",
    "08-component-map.md",
    "10-roadmap.md",
    "12-verbote-und-gates.md",
    "13-final-critic.md",
    "09-mockups/reference-manifest.md",
    "09-mockups/reference-manifest.tsv",
    "09-mockups/gpt-prompts.md",
    "09-mockups/comparison-manifest.tsv",
)

BLOCKING_MARKERS = (
    "PLACEHOLDER",
    "OWNER-BLOCKER",
    "OWNER_BLOCKED",
    "TODO",
    "TBD",
    "wie oben",
    "Wie A.",
)

MANIFEST_FIELDS = (
    "route",
    "indexation",
    "priority",
    "owner_file",
    "meta",
    "h1",
    "h2_outline",
    "links",
    "schema",
    "status",
)

MOCKUP_FIELDS = (
    "route",
    "section_id",
    "section_name",
    "viewport",
    "file",
    "copy_source",
    "copy_sha256",
    "reduced_motion",
    "cookie_state",
    "data_state",
    "review",
)


def load_tsv(path: Path) -> list[dict[str, str]]:
    with path.open(encoding="utf-8", newline="") as handle:
        return list(csv.DictReader(handle, delimiter="\t"))


def fail(errors: list[str], message: str) -> None:
    errors.append(message)


def main() -> int:
    if len(sys.argv) != 2:
        print("usage: validate-plan.py <website-plan-dir>", file=sys.stderr)
        return 2

    out = Path(sys.argv[1]).resolve()
    errors: list[str] = []

    if not out.is_dir():
        print(f"FAIL: plan directory missing: {out}", file=sys.stderr)
        return 1

    for relative in REQUIRED_FILES:
        if not (out / relative).is_file():
            fail(errors, f"missing required deliverable: {relative}")
    if any("missing required" in e for e in errors):
        for error in errors:
            print(f"FAIL: {error}")
        return 1

    # Reuse the deterministic pre-design gate; a plan cannot verify without it.
    import subprocess
    gates = (out / "12-verbote-und-gates.md").read_text(encoding="utf-8")
    choice_match = re.search(r"(?m)^G-DESIGN_CHOICE:\s*(A|B|C|MIX:.{3,})\s*$", gates, re.I)
    if not choice_match:
        fail(errors, "12-verbote-und-gates.md has no machine-readable G-DESIGN_CHOICE")
        design_choice = "INVALID"
    else:
        design_choice = choice_match.group(1)
    design_check = subprocess.run(
        ["python3", str(Path(__file__).with_name("validate-design-gate.py")), str(out), "--choice", design_choice],
        capture_output=True, text=True,
    )
    if design_check.returncode != 0:
        fail(errors, "design gate preflight failed: " + design_check.stdout.strip().replace("\n", " | "))

    meta = (out / "00-meta-plan.md").read_text(encoding="utf-8")
    if not re.search(r"wf_[a-z0-9_-]+", meta, re.I):
        fail(errors, "00-meta-plan.md has no workflow Run-ID")

    critic = (out / "13-final-critic.md").read_text(encoding="utf-8")
    if not re.search(r"(?:VERDICT|Verdikt)\s*:\s*PASS\b", critic, re.I):
        fail(errors, "final critic is not explicit PASS")
    if re.search(r"\b(?:FAIL|BLOCKER|BLOCKED)\b", critic, re.I):
        fail(errors, "final critic still contains FAIL/BLOCKER/BLOCKED")

    pages = out / "06-seiten"
    route_manifest = pages / "route-manifest.tsv"
    if not route_manifest.is_file():
        fail(errors, "missing 06-seiten/route-manifest.tsv")
        route_rows: list[dict[str, str]] = []
    else:
        route_rows = load_tsv(route_manifest)
        if tuple(route_rows[0].keys()) != MANIFEST_FIELDS if route_rows else True:
            fail(errors, "route-manifest.tsv header does not match required fields")

    routes: dict[str, int] = {}
    for row in route_rows:
        route = row.get("route", "").strip()
        routes[route] = routes.get(route, 0) + 1
        owner = pages / row.get("owner_file", "")
        if not route.startswith("/"):
            fail(errors, f"invalid route in manifest: {route!r}")
        if not owner.is_file():
            fail(errors, f"route {route}: owner file missing: {owner.name}")
        for field in ("meta", "h1", "h2_outline", "links", "schema"):
            if row.get(field, "").strip().lower() not in {"yes", "n/a"} and not row.get(field, "").strip():
                fail(errors, f"route {route}: missing {field}")
        if row.get("status") not in {"VERIFIED", "FINAL"}:
            fail(errors, f"route {route}: status is not VERIFIED/FINAL ({row.get('status')})")
    for route, count in routes.items():
        if count != 1:
            fail(errors, f"route appears {count} times in manifest: {route}")

    page_files = sorted(path for path in pages.glob("[0-9][0-9]-*.md") if not path.name.startswith("00-"))
    if not page_files:
        fail(errors, "no numbered page specs found")
    for path in page_files:
        text = path.read_text(encoding="utf-8")
        for marker in BLOCKING_MARKERS:
            if re.search(re.escape(marker), text, re.I):
                fail(errors, f"{path.name}: unresolved marker {marker!r}")
        explicit_sections = len(re.findall(r"(?m)^## (?:Section:|\d+\. Section\b)", text))
        explicit_specs = len(re.findall(r"(?m)^### Section-Spec\b", text))
        template_specs = len(re.findall(r"(?m)^### Zweck\s*$", text))
        if explicit_sections and max(explicit_specs, template_specs) < explicit_sections:
            fail(
                errors,
                f"{path.name}: {explicit_sections} visible sections but only "
                f"{max(explicit_specs, template_specs)} explicit per-section specs",
            )
        if not explicit_sections and not template_specs:
            fail(errors, f"{path.name}: no explicit per-section template blocks")

    mockup_manifest = out / "09-mockups" / "mockup-manifest.tsv"
    if not mockup_manifest.is_file():
        fail(errors, "missing 09-mockups/mockup-manifest.tsv")
    else:
        mockups = load_tsv(mockup_manifest)
        if tuple(mockups[0].keys()) != MOCKUP_FIELDS if mockups else True:
            fail(errors, "mockup-manifest.tsv header does not match required fields")
        coverage: dict[str, set[str]] = {}
        for row in mockups:
            route = row.get("route", "")
            viewport = row.get("viewport", "")
            coverage.setdefault(route, set()).add(viewport)
            image_path = (out / "09-mockups" / row.get("file", "")).resolve()
            if out not in image_path.parents:
                fail(errors, f"mockup path escapes plan directory: {image_path}")
            elif not image_path.is_file():
                fail(errors, f"mockup file missing: {row.get('file')}")
            elif image_path.stat().st_size < 64:
                fail(errors, f"mockup file is empty/invalid: {row.get('file')}")
            if row.get("review") != "PASS":
                fail(errors, f"mockup {row.get('file')}: review is not PASS")
            if not re.fullmatch(r"[0-9a-f]{64}", row.get("copy_sha256", "")):
                fail(errors, f"mockup {row.get('file')}: invalid copy_sha256")
            if row.get("reduced_motion") not in {"reduce", "no-preference"}:
                fail(errors, f"mockup {row.get('file')}: reduced_motion undocumented")
        p0_routes = {row["route"] for row in route_rows if row.get("priority", "").startswith("P0")}
        for route in sorted(p0_routes):
            viewports = coverage.get(route, set())
            if not any(v.startswith("1440x900") for v in viewports):
                fail(errors, f"P0 route {route}: desktop 1440x900 mockup missing")
            if not any(v.startswith("390x844") for v in viewports):
                fail(errors, f"P0 route {route}: mobile 390x844 mockup missing")

    if errors:
        print(f"PLAN_VERIFIED=NO ({len(errors)} errors)")
        for error in errors:
            print(f"FAIL: {error}")
        return 1

    print("PLAN_VERIFIED=YES")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
