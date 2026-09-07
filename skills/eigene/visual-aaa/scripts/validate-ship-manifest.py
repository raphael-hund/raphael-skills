#!/usr/bin/env python3
"""validate-ship-manifest.py — Exit 0 only if visual-ship.json is ship-ready."""
from __future__ import annotations

import json
import hashlib
import re
import sys
from pathlib import Path


_VERDICTS = {"pass", "fail"}
_CONFIDENCE = {"HIGH", "MED", "LOW"}
_PLACEHOLDER = re.compile(r"<[^>]+>|…|TODO|TBD", re.IGNORECASE)
_EVIDENCE_FILE = re.compile(r"\b[^\s,;]+\.(?:png|jpg|jpeg|webp)\b", re.IGNORECASE)
_EVIDENCE_REGION = re.compile(
    r"\b(?:region|oben|unten|links|rechts|mitte|top|bottom|left|right|center|zentral)\b",
    re.IGNORECASE,
)


def _critic_errors(v: object, index: int) -> list[str]:
    if not isinstance(v, dict):
        return [f"critic[{index}] must be an object"]
    errs: list[str] = []
    prefix = f"critic[{index}]"
    if not isinstance(v.get("page_id"), str) or not v["page_id"].strip():
        errs.append(f"{prefix}.page_id must be non-empty")
    if type(v.get("round")) is not int or v["round"] < 1:
        errs.append(f"{prefix}.round must be a positive integer")
    for key in ("verdict", "biggest_gap", "beleg", "confidence"):
        if not isinstance(v.get(key), str) or not v[key].strip():
            errs.append(f"{prefix}.{key} must be a non-empty string")
    verdict = v.get("verdict")
    confidence = v.get("confidence")
    gap = v.get("biggest_gap")
    beleg = v.get("beleg")
    if verdict not in _VERDICTS:
        errs.append(f"{prefix}.verdict must be pass or fail")
    if confidence not in _CONFIDENCE:
        errs.append(f"{prefix}.confidence must be HIGH, MED, or LOW")
    if isinstance(beleg, str) and (
        _PLACEHOLDER.search(beleg)
        or len(beleg.split()) < 4
        or not _EVIDENCE_FILE.search(beleg)
        or not _EVIDENCE_REGION.search(beleg)
    ):
        errs.append(f"{prefix}.beleg must name an observed PNG, region, and visible fact")
    if verdict == "pass":
        if confidence != "HIGH":
            errs.append(f"{prefix}: pass requires confidence HIGH")
        if gap != "none":
            errs.append(f"{prefix}: pass requires biggest_gap=none")
    elif verdict == "fail" and gap == "none":
        errs.append(f"{prefix}: fail requires one concrete biggest_gap")
    return errs


def manifest_errors(m: object) -> list[str]:
    if not isinstance(m, dict):
        return ["manifest must be an object"]
    errs: list[str] = []

    if m.get("schema") != "visual-aaa/ship/v2":
        errs.append("schema must be visual-aaa/ship/v2")
    for key in ("run_id", "build_revision"):
        if not isinstance(m.get(key), str) or not m[key].strip():
            errs.append(f"{key} must be non-empty")
    if m.get("status") != "PASS":
        errs.append("status must be PASS")
    if m.get("ok") is not True:
        errs.append("ok must be true")
    if m.get("self_read") is not True:
        errs.append("self_read must be true")
    if m.get("g1_exit") != 0:
        errs.append(f"g1_exit must be 0 (got {m.get('g1_exit')})")

    pages = m.get("pages") or []
    if not isinstance(pages, list):
        return errs + ["pages must be a list"]
    if not pages:
        errs.append("pages empty")

    for p in pages:
        if not isinstance(p, dict):
            errs.append("page must be an object")
            continue
        if not isinstance(p.get("render"), str) or not Path(p["render"]).is_absolute():
            errs.append("render must be an absolute path")
            continue
        r = Path(p["render"])
        if not r.is_file():
            errs.append(f"missing render: {r}")
        elif r.stat().st_size < 10_000:
            errs.append(f"tiny render: {r} ({r.stat().st_size} bytes)")
        elif p.get("sha256") != hashlib.sha256(r.read_bytes()).hexdigest():
            errs.append(f"render hash drift: {r}")

    verdicts = m.get("critic_verdicts") or []
    if not isinstance(verdicts, list) or not verdicts:
        errs.append("critic_verdicts must be a non-empty list")
        verdicts = []
    by_page: dict[str, list] = {}
    for i, v in enumerate(verdicts):
        errs.extend(_critic_errors(v, i))
        if isinstance(v, dict) and isinstance(v.get("page_id"), str) and type(v.get("round")) is int:
            by_page.setdefault(v.get("page_id", ""), []).append(v)

    for p in pages:
        if not isinstance(p, dict):
            continue
        pid = p.get("id")
        if not isinstance(pid, str) or not pid:
            errs.append("page id must be non-empty")
            continue
        vs = sorted(by_page.get(pid, []), key=lambda x: x.get("round", 0))
        if not vs:
            errs.append(f"no critic verdict for page {pid}")
            continue
        best = vs[-1]
        if best.get("verdict") != "pass":
            errs.append(f"latest verdict not pass for {pid}: {best.get('verdict')}")
        if best.get("confidence") != "HIGH":
            errs.append(f"latest confidence not HIGH for {pid}: {best.get('confidence')}")
        if not isinstance(p.get("render"), str) or not isinstance(best.get("beleg"), str) or Path(p["render"]).name not in best["beleg"]:
            errs.append(f"critic evidence does not name render for {pid}")

    acceptance = m.get("acceptance_checks", [])
    if not isinstance(acceptance, list):
        errs.append("acceptance_checks must be a list")
        acceptance = []
    for c in acceptance:
        if not isinstance(c, dict):
            errs.append("acceptance check must be an object")
        elif c.get("status") != "pass":
            errs.append(f"acceptance open/fail: {c.get('id')}={c.get('status')}")

    inputs = m.get("inputs", {})
    if not isinstance(inputs, dict):
        errs.append("inputs must be an object")
        inputs = {}
    is_web = "base_url" in m or "inputs" in m
    base_url = m.get("base_url", "")
    if is_web and (not isinstance(base_url, str) or not base_url.startswith(("https://", "http://"))):
        errs.append("web ship base_url must be an HTTP URL")
        base_url = ""
    for kind, expected_schema in (("g1", "web/g1-report/v2"), ("sweep", "web/shot-sweep/v2")):
        ref = inputs.get(kind)
        if ref is None:
            if is_web:
                errs.append(f"web ship input missing: {kind}")
            continue
        if not isinstance(ref, dict) or not isinstance(ref.get("path"), str):
            errs.append(f"invalid {kind} input")
            continue
        source = Path(ref["path"])
        if not source.is_absolute() or not source.is_file():
            errs.append(f"missing {kind} input: {source}")
            continue
        if ref.get("sha256") != hashlib.sha256(source.read_bytes()).hexdigest():
            errs.append(f"{kind} input hash drift")
        try:
            receipt = json.loads(source.read_text())
        except (ValueError, OSError):
            errs.append(f"invalid {kind} input JSON")
            continue
        if not isinstance(receipt, dict):
            errs.append(f"{kind} input must be an object")
            continue
        if receipt.get("schema") != expected_schema or receipt.get("status") != "PASS" or receipt.get("ok") is False:
            errs.append(f"{kind} input is not a successful {expected_schema}")
        for key in ("run_id", "build_revision"):
            if receipt.get(key) != m.get(key):
                errs.append(f"{kind} {key} differs")
        source_base = receipt.get("base_url") or receipt.get("base", "")
        if not isinstance(source_base, str) or source_base.rstrip("/") != base_url.rstrip("/"):
            errs.append(f"{kind} base URL differs")
        if kind == "g1":
            results = receipt.get("results")
            if receipt.get("ok") is not True or not isinstance(results, list) or not results or any(not isinstance(r, dict) or r.get("ok") is not True or r.get("skipped") for r in results):
                errs.append("g1 input has failed or missing checks")
        if kind == "sweep":
            routes = receipt.get("routes")
            matrix = receipt.get("state_matrix")
            if not isinstance(routes, list) or not routes or not isinstance(matrix, dict) or matrix.get("failed"):
                errs.append("sweep input is incomplete")
                continue
            known = {}
            for route in routes:
                if not isinstance(route, dict) or not isinstance(route.get("shots"), list) or not route["shots"] or route.get("error"):
                    errs.append("sweep route is incomplete")
                    continue
                for shot in route["shots"]:
                    if not isinstance(shot, dict) or not isinstance(shot.get("file"), str):
                        errs.append("sweep shot is invalid")
                        continue
                    render = (source.parent / shot["file"]).resolve()
                    known[str(render)] = (route.get("route"), route.get("viewport_label"))
                    if not render.is_file() or shot.get("sha256") != hashlib.sha256(render.read_bytes()).hexdigest():
                        errs.append(f"sweep shot missing or hash drift: {render}")
            rendered = {page["render"] for page in pages if isinstance(page, dict) and isinstance(page.get("render"), str)}
            if rendered != set(known):
                errs.append("ship pages do not match the complete sweep render list")
            for page in pages:
                if isinstance(page, dict) and isinstance(page.get("render"), str):
                    if known.get(page["render"]) != (page.get("route"), page.get("viewport")):
                        errs.append(f"render route/viewport differs from sweep input: {page['render']}")
    return errs


def main() -> int:
    if len(sys.argv) != 2:
        print("Usage: validate-ship-manifest.py <visual-ship.json>", file=sys.stderr)
        return 2
    try:
        payload = json.loads(Path(sys.argv[1]).read_text())
    except (OSError, ValueError) as exc:
        print(f"SHIP INVALID: {exc}", file=sys.stderr)
        return 1
    errs = manifest_errors(payload)
    if errs:
        print(f"SHIP INVALID — {len(errs)} error(s)")
        for error in errs:
            print(f"  - {error}")
        return 1
    print("SHIP VALID")
    return 0


if __name__ == "__main__":
    sys.exit(main())
