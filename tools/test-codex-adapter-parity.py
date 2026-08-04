#!/usr/bin/env python3
"""Parity checks for the design, web, and writing-skills Codex adapters."""
from __future__ import annotations

import hashlib
import os
import re
import subprocess
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
QUICK_VALIDATE = Path("/root/.codex/skills/.system/skill-creator/scripts/quick_validate.py")
TARGETS = {
    "design": ROOT / "skills/design/SKILL.md",
    "web": ROOT / "skills/eigene/web/SKILL.md",
    "writing-skills": ROOT / "skills/methodik/writing-skills/SKILL.md",
}
LOCAL_DEPS = {
    "design": [
        *(f"references/{name}.md" for name in (
            "design-doktrin", "impeccable-detektoren", "ui-ux-db-nutzung",
            "taste-kern", "ai-slop-taxonomy", "ai-slop-detection",
            "ai-slop-fixes", "motion-doktrin", "apple-fluid-interfaces",
            "animation-vokabular", "motion-audit-workflow", "farben-oklch",
            "typografie", "ui-polish-details", "design-dna-schema",
            "component-bibliotheken-radar", "wissens-router", "stitch-workflow",
        )),
        "scripts/detect.mjs", "scripts/dna-scaffold.mjs", "scripts/scan-ai-slop.mjs",
    ],
    "web": [
        *(f"references/{name}.md" for name in (
            "loop2-ablauf", "qa-faecher", "landingpage-struktur",
            "informationsarchitektur", "web-clone-playbook", "rebuild-from-image",
            "bildgenerierung", "motion-doktrin", "ui-layouts-catalog",
            "cro-diagnose", "experiment-programm", "conversion-elemente",
            "code-qualitaets-checkliste", "security-audit-playbook",
            "domain-safe-browsing-checkliste", "readonly-db-rolle",
            "design-systeme-vergleich", "radix-shadcn-tailwind-stack",
            "remotion-produktionsweg", "screenshot-kritik-loop",
            "frontend-referenzbibliothek",
        )),
        "references/ui-components/INDEX.md",
        "references/templates/statistics-page-template.html",
        "scripts/bilder.mjs",
    ],
    "writing-skills": [
        "references/tdd-fuer-skills.md",
        "references/lektionen-2026-07.md",
    ],
}
SHARED_DEPS = {
    "design": {
        "wiki/craft/webdesign/effekt-performance-patterns.md": Path("/root/raphael-brain/wiki/craft/webdesign/effekt-performance-patterns.md"),
        "wiki/craft/webdesign/motion-polish.md": Path("/root/raphael-brain/wiki/craft/webdesign/motion-polish.md"),
        "wiki/craft/webdesign/interaction-states-and-accessibility.md": Path("/root/raphael-brain/wiki/craft/webdesign/interaction-states-and-accessibility.md"),
    },
    "web": {
        **{
            f"references/{name}.md": ROOT / f"skills/design/references/{name}.md"
            for name in ("taste-kern", "ui-ux-db-nutzung", "impeccable-detektoren", "design-doktrin")
        },
        "scripts/detect.mjs": ROOT / "skills/design/scripts/detect.mjs",
        "scripts/scan-ai-slop.mjs": ROOT / "skills/design/scripts/scan-ai-slop.mjs",
        "skills/methodik/code-review/references/owasp-checkliste.md": ROOT / "skills/methodik/code-review/references/owasp-checkliste.md",
    },
    "writing-skills": {
        "tools/validate-skill.py": ROOT / "tools/validate-skill.py",
        "superpowers-writing-skills": Path("/root/tools/vendor/superpowers/skills/writing-skills/SKILL.md"),
    },
}


def sha(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def frontmatter(text: str) -> str:
    match = re.match(r"\A---\s*\n(.*?)\n---\s*\n", text, re.DOTALL)
    if not match:
        raise AssertionError("missing frontmatter")
    return match.group(1)


def scalar(field: str, text: str) -> str:
    match = re.search(rf"(?m)^{re.escape(field)}:\s*[\"']?([^\n\"']+)", frontmatter(text))
    if not match:
        raise AssertionError(f"missing frontmatter field {field}")
    return match.group(1).strip()


def expect_path(path: Path, label: str, errors: list[str]) -> None:
    if not path.exists():
        errors.append(f"{label}: missing {path}")


def main() -> int:
    errors: list[str] = []
    before = {name: sha(path) for name, path in TARGETS.items()}

    for name, source in TARGETS.items():
        adapter_dir = ROOT / "codex/skills" / name
        adapter = adapter_dir / "SKILL.md"
        manifest = adapter_dir / "agents/openai.yaml"
        expect_path(source, name, errors)
        expect_path(adapter, name, errors)
        expect_path(manifest, name, errors)
        if not source.is_file() or not adapter.is_file():
            continue

        source_text = source.read_text(encoding="utf-8")
        adapter_text = adapter.read_text(encoding="utf-8")
        try:
            if scalar("name", source_text) != name or scalar("name", adapter_text) != name:
                errors.append(f"{name}: source/adapter frontmatter name drift")
        except AssertionError as exc:
            errors.append(f"{name}: {exc}")
        if name == "web":
            if not adapter_dir.is_symlink():
                errors.append("web: repository bridge is not a symlink")
            elif os.readlink(adapter_dir) != "../../skills/eigene/web":
                errors.append(f"web: repository bridge target drift: {os.readlink(adapter_dir)!r}")
            if adapter.resolve() != source.resolve() or adapter.read_bytes() != source.read_bytes():
                errors.append("web: repository bridge is not byte-identical to canonical source")
            if "Codex dependency map:" in adapter_text or "Codex source adapter" in adapter_text:
                errors.append("web: legacy adapter prose remains in canonical content")
        else:
            absolute_source = str(source.resolve())
            if absolute_source not in adapter_text:
                errors.append(f"{name}: adapter does not point at canonical source")
            if "Codex dependency map:" not in adapter_text:
                errors.append(f"{name}: Codex dependency map missing")

        for dep in LOCAL_DEPS[name]:
            expect_path(source.parent / dep, f"{name} local dependency {dep}", errors)
        for logical, resolved in SHARED_DEPS[name].items():
            expect_path(resolved, f"{name} shared dependency {logical}", errors)
            dependency_text = source_text if name == "web" else adapter_text
            if str(resolved) not in dependency_text:
                errors.append(f"{name}: package does not resolve shared dependency {logical}")

        if QUICK_VALIDATE.is_file():
            checked = subprocess.run(
                [sys.executable, str(QUICK_VALIDATE), str(adapter_dir)],
                cwd=ROOT, text=True, capture_output=True,
            )
            if checked.returncode:
                errors.append(f"{name}: official quick_validate failed: {checked.stdout}{checked.stderr}")
        else:
            errors.append(f"official quick validator missing: {QUICK_VALIDATE}")

    # The parity test must itself reject a broken dependency instead of merely
    # checking the current happy path.
    synthetic_errors: list[str] = []
    expect_path(ROOT / "does-not-exist/parity-sentinel", "sentinel", synthetic_errors)
    if not synthetic_errors:
        errors.append("broken-link detector accepted a missing dependency")

    checked = subprocess.run(
        [sys.executable, str(ROOT / "tools/sync-codex-skills.py"), "--check"],
        cwd=ROOT, text=True, capture_output=True,
    )
    if checked.returncode:
        errors.append(f"adapter sync check failed: {checked.stdout}{checked.stderr}")
    after = {name: sha(path) for name, path in TARGETS.items()}
    if before != after:
        errors.append("canonical source hashes changed during parity validation")

    if errors:
        print("Codex adapter parity: FAIL")
        for error in errors:
            print(f"  - {error}")
        return 1
    print("Codex adapter parity: OK (design, web, writing-skills)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
