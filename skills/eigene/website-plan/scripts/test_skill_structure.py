#!/usr/bin/env python3
"""Structural contract tests for website-plan skill (real SKILL.md on disk)."""
from __future__ import annotations

import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SKILL = ROOT / "SKILL.md"
REFS = ROOT / "references"


def fail(msg: str) -> None:
    print(f"FAIL: {msg}", file=sys.stderr)
    sys.exit(1)


def main() -> None:
    text = SKILL.read_text(encoding="utf-8")
    if not text.startswith("---"):
        fail("no frontmatter")
    parts = text.split("---", 2)
    if len(parts) < 3:
        fail("frontmatter not closed")
    fm, body = parts[1], parts[2]

    for key in ("name: website-plan", "version:", "description:", "class:", "scope:", "sensitivity:", "completion_criteria:"):
        if key not in fm:
            fail(f"frontmatter missing {key}")

    if "Trigger:" not in fm and "Trigger:" not in text:
        # description block should end with Trigger phrases
        if "Trigger:" not in text:
            fail("description must include Trigger phrases")

    # ordered steps
    for step in ("### 1.", "### 2.", "### 3.", "### 4."):
        if step not in body:
            fail(f"missing step heading {step}")

    # thin body (instructional density)
    body_lines = [ln for ln in body.splitlines() if ln.strip()]
    if len(body_lines) > 130:
        fail(f"body too long ({len(body_lines)} nonempty lines; target ~60-120)")
    if len(body_lines) < 30:
        fail(f"body too short ({len(body_lines)} nonempty lines)")

    # contract tokens somewhere in tree
    blob = text
    for p in REFS.glob("*"):
        if p.is_file():
            blob += p.read_text(encoding="utf-8", errors="ignore")

    required = [
        "workflow-website-plan",
        "G-IA",
        "G-DESIGN",
        "Ultracode",
        "SCOPE",
        "freestyle",
        "workflow-website-plan.claude.js",
        "workflow-website-plan-after-gia.claude.js",
        "workflow-website-plan-close.claude.js",
        "workflow-website-plan.rhai",
        "workflow-website-plan-design-gate.claude.js",
        "design-inspiration.md",
        "G-REF",
        "reference-manifest.md",
        "gpt-prompts.md",
        "AWAITING_MOCKUPS",
    ]
    for tok in required:
        if tok not in blob:
            fail(f"contract token missing in skill tree: {tok}")

    # fake-proof ban (German or English)
    if not re.search(r"erfund|Fake|fake proof|Fake-Proof", blob, re.I):
        fail("fake-proof ban not found")

    # required reference files exist
    for name in (
        "host-launch.md",
        "constraints.md",
        "deliverables-dod.md",
        "roles-gauntlet.md",
        "lessons-2026-08-11.md",
        "workflow-website-plan.claude.js",
        "workflow-website-plan-after-gia.claude.js",
        "workflow-website-plan-close.claude.js",
        "workflow-website-plan.rhai",
        "workflow-website-plan-design-gate.claude.js",
        "design-inspiration.md",
    ):
        if not (REFS / name).is_file():
            fail(f"missing reference {name}")

    # Design-reference contract must be wired into both executable Lauf-2 routes.
    for name in ("workflow-website-plan-after-gia.claude.js", "workflow-website-plan.rhai"):
        route = (REFS / name).read_text(encoding="utf-8")
        for tok in ("design-inspiration.md", "reference-manifest.md", "gpt-prompts.md", "G-REF"):
            if tok not in route:
                fail(f"{name} missing design-reference contract token: {tok}")

    standalone = (REFS / "STANDALONE-SYSTEM-PROMPT.md").read_text(encoding="utf-8")
    for tok in ("G-REF", "reference-manifest.md", "gpt-prompts.md", "AWAITING_MOCKUPS", "PLAN_VERIFIED"):
        if tok not in standalone:
            fail(f"STANDALONE-SYSTEM-PROMPT.md missing contract token: {tok}")

    rhai = (REFS / "workflow-website-plan.rhai").read_text(encoding="utf-8")
    for tok in ("READY_FOR_VERIFY", "VERDICT: PASS", "validate-plan.py", "route-manifest.tsv"):
        if tok not in rhai:
            fail(f"workflow-website-plan.rhai missing fail-closed token: {tok}")

    close = (REFS / "workflow-website-plan-close.claude.js").read_text(encoding="utf-8")
    for tok in ("validate-design-gate.py", "close-preflight", "MIX:"):
        if tok not in close:
            fail(f"close workflow missing deterministic preflight token: {tok}")

    if not (ROOT / "scripts" / "validate-design-gate.py").is_file():
        fail("missing scripts/validate-design-gate.py")
    if not (ROOT / "scripts" / "test_design_gate.py").is_file():
        fail("missing scripts/test_design_gate.py")

    # Draft and humanizer must be ordered, never simultaneous writers.
    js = (REFS / "workflow-website-plan-after-gia.claude.js").read_text(encoding="utf-8")
    if "parallel([\n  () => agent(ULTRA + `ROLLE Copywriter" in js:
        fail("copy draft and humanizer still run in parallel")
    if "Copy+Humanizer" in standalone or "optional `opus-builder` parallel" in standalone:
        fail("standalone prompt still advertises parallel copy/humanizer writers")

    validator = (ROOT / "scripts" / "validate-plan.py").read_text(encoding="utf-8")
    for tok in ("reference-manifest.tsv", "gpt-prompts.md", "comparison-manifest.tsv", "validate-design-gate.py"):
        if tok not in validator:
            fail(f"validate-plan.py missing design gate token: {tok}")
    if "G-DESIGN_CHOICE" not in validator:
        fail("validate-plan.py missing user-choice evidence contract")

    # validator OK
    r = subprocess.run(
        ["python3", "/root/raphael-skills/tools/validate-skill.py", str(ROOT)],
        capture_output=True,
        text=True,
    )
    if r.returncode != 0 or "[OK" not in r.stdout and "[OK]" not in r.stdout and "alle gueltig" not in r.stdout:
        # accept "[OK  ]" with spaces
        if "[OK" not in r.stdout:
            fail(f"validate-skill.py failed: {r.stdout}{r.stderr}")

    print("PASS: website-plan skill structure contract")
    print(f"  nonempty_body_lines={len(body_lines)}")


if __name__ == "__main__":
    main()
