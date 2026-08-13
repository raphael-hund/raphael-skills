#!/usr/bin/env python3
"""Black-box tests for validate-design-gate.py."""

from __future__ import annotations

import hashlib
import subprocess
import tempfile
from pathlib import Path

from PIL import Image


HERE = Path(__file__).resolve().parent
VALIDATOR = HERE / "validate-design-gate.py"
REF_HEADER = (
    "id\tdirection\tsource_url\tcaptured_at\tfile\tviewport\tregion\t"
    "pattern_take\tdo_not_copy\tmodel_role\tsuitability\n"
)
COMPARE_HEADER = "direction\tfile\tviewport\tcopy_sha256\tsource_prompt\treview\n"


def build_fixture(root: Path, comparison: bool = True) -> None:
    mockups = root / "09-mockups"
    refs = mockups / "references"
    generated = mockups / "generated"
    refs.mkdir(parents=True)
    generated.mkdir(parents=True)

    ref_lines = [REF_HEADER]
    prompt_blocks: list[str] = []
    for direction in "ABC":
        mapped: list[str] = []
        for number, suitability in ((1, "2"), (2, "1")):
            rid = f"REF-{direction}-{number:02d}"
            relative = f"09-mockups/references/{rid}.png"
            color = (40 * (ord(direction) - 64), 70 * number, 30 * number)
            Image.new("RGB", (640, 360), color).save(root / relative)
            ref_lines.append(
                "\t".join((
                    rid, direction, f"https://example-{direction.lower()}.com/page",
                    "2026-08-12", relative, "1440x900 @1x", "Homepage > Hero",
                    f"pattern {direction} {number}", "logo/copy/assets", "composition",
                    suitability,
                )) + "\n"
            )
            mapped.append(f"{rid} — {relative}")
        prompt_blocks.append(f"## Prompt {direction}\n\n" + "\n".join(mapped) + "\n")
    (mockups / "reference-manifest.tsv").write_text("".join(ref_lines), encoding="utf-8")
    (mockups / "gpt-prompts.md").write_text("\n".join(prompt_blocks), encoding="utf-8")

    if comparison:
        copy_hash = hashlib.sha256(b"identical final copy").hexdigest()
        compare_lines = [COMPARE_HEADER]
        for direction in "ABC":
            relative = f"09-mockups/generated/{direction}__hero.png"
            color = (60 * (ord(direction) - 64), 40, 90)
            Image.new("RGB", (1536, 864), color).save(root / relative)
            compare_lines.append(
                f"{direction}\t{relative}\t1536x864\t{copy_hash}\tPrompt {direction}\tPASS\n"
            )
        (mockups / "comparison-manifest.tsv").write_text("".join(compare_lines), encoding="utf-8")


def run(root: Path, *extra: str) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        ["python3", str(VALIDATOR), str(root), *extra],
        capture_output=True, text=True,
    )


def main() -> None:
    with tempfile.TemporaryDirectory() as tmp:
        root = Path(tmp)
        build_fixture(root)
        result = run(root, "--choice", "B")
        assert result.returncode == 0, result.stdout + result.stderr
        assert "G_REF=PASS MOCKUPS_READY=YES" in result.stdout

    with tempfile.TemporaryDirectory() as tmp:
        root = Path(tmp)
        build_fixture(root, comparison=False)
        result = run(root)
        assert result.returncode == 3, result.stdout + result.stderr
        assert "AWAITING_MOCKUPS" in result.stdout

    with tempfile.TemporaryDirectory() as tmp:
        root = Path(tmp)
        build_fixture(root)
        manifest = root / "09-mockups" / "reference-manifest.tsv"
        manifest.write_text(manifest.read_text(encoding="utf-8").replace("https://", "bad://", 1), encoding="utf-8")
        result = run(root)
        assert result.returncode == 1, result.stdout + result.stderr
        assert "G_REF=FAIL" in result.stdout

    with tempfile.TemporaryDirectory() as tmp:
        root = Path(tmp)
        build_fixture(root)
        first = root / "09-mockups/references/REF-A-01.png"
        second = root / "09-mockups/references/REF-A-02.png"
        second.write_bytes(first.read_bytes())
        result = run(root)
        assert result.returncode == 1, result.stdout + result.stderr
        assert "duplicate reference image content" in result.stdout

    with tempfile.TemporaryDirectory() as tmp:
        root = Path(tmp)
        build_fixture(root)
        prompts = root / "09-mockups/gpt-prompts.md"
        text = prompts.read_text(encoding="utf-8")
        a1 = "REF-A-01 — 09-mockups/references/REF-A-01.png"
        a2 = "REF-A-02 — 09-mockups/references/REF-A-02.png"
        text = text.replace(a1 + "\n" + a2, "REF-A-01\nREF-A-02\n09-mockups/references/REF-A-02.png\n09-mockups/references/REF-A-01.png")
        prompts.write_text(text, encoding="utf-8")
        result = run(root)
        assert result.returncode == 1, result.stdout + result.stderr
        assert "expected ordered pair" in result.stdout

    print("PASS: validate-design-gate black-box contract")


if __name__ == "__main__":
    main()
