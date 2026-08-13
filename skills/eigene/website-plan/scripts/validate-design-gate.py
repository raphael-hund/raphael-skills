#!/usr/bin/env python3
"""Deterministic preflight for G-REF and G-DESIGN comparison artifacts."""

from __future__ import annotations

import argparse
import csv
import hashlib
import re
import sys
from pathlib import Path
from urllib.parse import urlparse

from PIL import Image


REF_FIELDS = (
    "id", "direction", "source_url", "captured_at", "file", "viewport",
    "region", "pattern_take", "do_not_copy", "model_role", "suitability",
)
COMPARE_FIELDS = (
    "direction", "file", "viewport", "copy_sha256", "source_prompt", "review",
)


def rows(path: Path) -> list[dict[str, str]]:
    with path.open(encoding="utf-8", newline="") as handle:
        reader = csv.DictReader(handle, delimiter="\t")
        if tuple(reader.fieldnames or ()) == ():
            return []
        return list(reader)


def digest(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def contained_file(
    out: Path, relative: str, errors: list[str], minimum: tuple[int, int]
) -> Path | None:
    path = (out / relative).resolve()
    if out != path and out not in path.parents:
        errors.append(f"path escapes OUT: {relative}")
        return None
    if not path.is_file():
        errors.append(f"file missing: {relative}")
        return None
    try:
        with Image.open(path) as image:
            image.verify()
        with Image.open(path) as image:
            if image.width < minimum[0] or image.height < minimum[1]:
                errors.append(
                    f"image too small {relative}: {image.width}x{image.height}, "
                    f"minimum {minimum[0]}x{minimum[1]}"
                )
                return None
    except Exception as exc:
        errors.append(f"invalid image file {relative}: {exc}")
        return None
    return path


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("out_dir")
    parser.add_argument("--choice", default="")
    args = parser.parse_args()
    out = Path(args.out_dir).resolve()
    mockups = out / "09-mockups"
    errors: list[str] = []

    manifest = mockups / "reference-manifest.tsv"
    prompt_path = mockups / "gpt-prompts.md"
    if not manifest.is_file():
        errors.append("missing 09-mockups/reference-manifest.tsv")
        ref_rows: list[dict[str, str]] = []
    else:
        with manifest.open(encoding="utf-8", newline="") as handle:
            reader = csv.DictReader(handle, delimiter="\t")
            if tuple(reader.fieldnames or ()) != REF_FIELDS:
                errors.append("reference-manifest.tsv header mismatch")
            ref_rows = list(reader)

    if not prompt_path.is_file():
        errors.append("missing 09-mockups/gpt-prompts.md")
        prompts = ""
    else:
        prompts = prompt_path.read_text(encoding="utf-8")

    by_direction: dict[str, list[dict[str, str]]] = {d: [] for d in "ABC"}
    seen_ids: set[str] = set()
    seen_ref_files: set[str] = set()
    seen_ref_hashes: dict[str, str] = {}
    for row in ref_rows:
        rid = row.get("id", "").strip()
        direction = row.get("direction", "").strip()
        if not re.fullmatch(r"REF-[ABC]-\d{2}", rid) or rid in seen_ids:
            errors.append(f"invalid/duplicate reference id: {rid!r}")
        seen_ids.add(rid)
        if direction not in by_direction:
            errors.append(f"{rid}: invalid direction {direction!r}")
            continue
        by_direction[direction].append(row)
        parsed = urlparse(row.get("source_url", ""))
        if parsed.scheme not in {"http", "https"} or not parsed.netloc:
            errors.append(f"{rid}: invalid source_url")
        if not re.fullmatch(r"\d{4}-\d{2}-\d{2}", row.get("captured_at", "")):
            errors.append(f"{rid}: invalid captured_at")
        if not re.search(r"\d+x\d+", row.get("viewport", "")):
            errors.append(f"{rid}: invalid viewport")
        for field in ("region", "pattern_take", "do_not_copy", "model_role"):
            if not row.get(field, "").strip():
                errors.append(f"{rid}: missing {field}")
        if row.get("suitability") not in {"1", "2"}:
            errors.append(f"{rid}: suitability must be 1 or 2")
        ref_file = row.get("file", "")
        if ref_file in seen_ref_files:
            errors.append(f"duplicate reference file: {ref_file}")
        seen_ref_files.add(ref_file)
        valid_ref = contained_file(out, ref_file, errors, (320, 180))
        if valid_ref:
            content_hash = digest(valid_ref)
            if content_hash in seen_ref_hashes:
                errors.append(
                    f"duplicate reference image content: {ref_file} equals "
                    f"{seen_ref_hashes[content_hash]}"
                )
            seen_ref_hashes[content_hash] = ref_file

    for direction, refs in by_direction.items():
        if not 2 <= len(refs) <= 3:
            errors.append(f"direction {direction}: expected 2-3 references, got {len(refs)}")
        if sum(r.get("suitability") == "2" for r in refs) != 1:
            errors.append(f"direction {direction}: expected exactly one primary reference")
        match = re.search(
            rf"(?ms)^##\s+(?:GPT-)?Prompt\s+{direction}\b(.*?)(?=^##\s+(?:GPT-)?Prompt\s+[ABC]\b|\Z)",
            prompts,
        )
        if not match:
            errors.append(f"gpt-prompts.md: missing Prompt {direction} block")
            continue
        block = match.group(1)
        cursor = 0
        for ref in refs:
            id_pos = block.find(ref["id"], cursor)
            file_pos = block.find(ref["file"], id_pos + len(ref["id"])) if id_pos >= 0 else -1
            if id_pos < 0 or file_pos < 0:
                errors.append(
                    f"Prompt {direction}: expected ordered pair "
                    f"{ref['id']} -> {ref['file']}"
                )
            else:
                cursor = file_pos + len(ref["file"])

    if errors:
        print(f"G_REF=FAIL ({len(errors)} errors)")
        for error in errors:
            print(f"FAIL: {error}")
        return 1

    comparison = mockups / "comparison-manifest.tsv"
    if not comparison.is_file():
        print("G_REF=PASS MOCKUPS_READY=NO")
        print("AWAITING_MOCKUPS: missing 09-mockups/comparison-manifest.tsv")
        return 3

    with comparison.open(encoding="utf-8", newline="") as handle:
        reader = csv.DictReader(handle, delimiter="\t")
        if tuple(reader.fieldnames or ()) != COMPARE_FIELDS:
            print("G_REF=PASS MOCKUPS_READY=NO")
            print("FAIL: comparison-manifest.tsv header mismatch")
            return 1
        compare_rows = list(reader)

    compare_errors: list[str] = []
    if sorted(r.get("direction") for r in compare_rows) != ["A", "B", "C"]:
        compare_errors.append("comparison manifest must contain exactly A, B and C")
    viewports = {r.get("viewport") for r in compare_rows}
    copy_hashes = {r.get("copy_sha256") for r in compare_rows}
    if len(viewports) != 1 or not next(iter(viewports), ""):
        compare_errors.append("A/B/C must use one identical non-empty viewport")
    if len(copy_hashes) != 1 or not re.fullmatch(r"[0-9a-f]{64}", next(iter(copy_hashes), "")):
        compare_errors.append("A/B/C must use one identical valid copy_sha256")
    seen_compare_files: set[str] = set()
    seen_compare_hashes: dict[str, str] = {}
    for row in compare_rows:
        direction = row.get("direction", "?")
        if row.get("review") != "PASS":
            compare_errors.append(f"direction {direction}: review is not PASS")
        if row.get("source_prompt") != f"Prompt {direction}":
            compare_errors.append(f"direction {direction}: source_prompt mismatch")
        compare_file = row.get("file", "")
        if compare_file in seen_compare_files:
            compare_errors.append(f"duplicate comparison file: {compare_file}")
        seen_compare_files.add(compare_file)
        valid_compare = contained_file(out, compare_file, compare_errors, (800, 450))
        if valid_compare:
            content_hash = digest(valid_compare)
            if content_hash in seen_compare_hashes:
                compare_errors.append(
                    f"duplicate comparison image content: {compare_file} equals "
                    f"{seen_compare_hashes[content_hash]}"
                )
            seen_compare_hashes[content_hash] = compare_file

    if args.choice and not re.fullmatch(
        r"(?:A|B|C|MIX:[\wÄÖÜäöüß ,.;:/()+&-]{3,200})", args.choice.strip(), re.I
    ):
        compare_errors.append("choice must be A, B, C or MIX:<explicit description>")

    if compare_errors:
        print("G_REF=PASS MOCKUPS_READY=NO")
        for error in compare_errors:
            print(f"FAIL: {error}")
        return 1

    print("G_REF=PASS MOCKUPS_READY=YES")
    if args.choice:
        print(f"G_DESIGN_CHOICE={args.choice.strip()}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
