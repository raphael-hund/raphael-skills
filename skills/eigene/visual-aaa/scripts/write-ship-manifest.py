#!/usr/bin/env python3
"""Assemble visual-ship.json from render dir + g1 report + critics.json."""
from __future__ import annotations

import argparse
import json
import hashlib
import importlib.util
import os
import sys
import tempfile
from datetime import datetime, timezone
from pathlib import Path


_SHIP_SCHEMA = "visual-aaa/ship/v2"
def _write_atomic(path: Path, payload: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    temp_path: Path | None = None
    try:
        with tempfile.NamedTemporaryFile(
            mode="w",
            encoding="utf-8",
            dir=path.parent,
            prefix=f".{path.name}.",
            suffix=".tmp",
            delete=False,
        ) as handle:
            temp_path = Path(handle.name)
            handle.write(payload)
            handle.flush()
            os.fsync(handle.fileno())
        os.replace(temp_path, path)
    except BaseException:
        if temp_path is not None:
            temp_path.unlink(missing_ok=True)
        raise


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--schema", default=_SHIP_SCHEMA)
    ap.add_argument("--run-id", required=True)
    ap.add_argument("--build-revision", required=True)
    ap.add_argument("--out", required=True)
    ap.add_argument("--render-dir", required=True)
    ap.add_argument("--g1", required=True)
    ap.add_argument("--sweep", help="Web: current shot-sweep manifest.json")
    ap.add_argument("--critics", required=True)
    ap.add_argument("--self-read", default="false")
    ap.add_argument("--self-read-notes", default="")
    ap.add_argument("--project", default="")
    ap.add_argument("--version-label", default="")
    ap.add_argument("--acceptance", default=None, help="optional acceptance_checks.json")
    args = ap.parse_args()

    if args.schema != _SHIP_SCHEMA:
        print(
            f"FATAL: unsupported schema {args.schema!r}; new ship manifests require {_SHIP_SCHEMA}",
            file=sys.stderr,
        )
        return 2
    run_id = args.run_id.strip()
    build_revision = args.build_revision.strip()
    if not run_id or not build_revision:
        print("FATAL: run_id and build_revision must be non-empty", file=sys.stderr)
        return 2

    render_dir = Path(args.render_dir)
    g1 = json.loads(Path(args.g1).read_text())
    if not isinstance(g1, dict):
        raise ValueError("g1 must be an object")
    critics = json.loads(Path(args.critics).read_text())
    if isinstance(critics, dict) and "verdicts" in critics:
        verdicts = critics["verdicts"]
    elif isinstance(critics, list):
        verdicts = critics
    else:
        print("FATAL: critics must be list or {verdicts:[]}", file=sys.stderr)
        return 2

    if not isinstance(verdicts, list):
        raise ValueError("critic verdicts must be a list")

    pages = []
    inputs = {}
    base_url = ""
    sweep_path = Path(args.sweep) if args.sweep else render_dir / "manifest.json"
    is_web = g1.get("schema") == "web/g1-report/v2"
    if is_web:
        if not sweep_path.is_file():
            print("FATAL: web ship requires --sweep manifest.json", file=sys.stderr)
            return 2
        sweep = json.loads(sweep_path.read_text())
        if not isinstance(sweep, dict) or not isinstance(sweep.get("routes"), list):
            raise ValueError("sweep must contain a routes list")
        base_url = g1.get("base_url") or g1.get("base", "")
        for kind, source in (("g1", Path(args.g1)), ("sweep", sweep_path)):
            inputs[kind] = {"path": str(source.resolve()), "sha256": hashlib.sha256(source.read_bytes()).hexdigest()}
        for route in sweep["routes"]:
            if not isinstance(route, dict) or not isinstance(route.get("shots"), list):
                raise ValueError("sweep route must contain a shots list")
            for shot in route["shots"]:
                if not isinstance(shot, dict) or not isinstance(shot.get("file"), str):
                    raise ValueError("sweep shot must name its file")
                png = (sweep_path.parent / shot["file"]).resolve()
                pages.append({"id": png.stem, "render": str(png), "source": route.get("route", ""),
                              "route": route.get("route"), "viewport": route.get("viewport_label"),
                              "sha256": hashlib.sha256(png.read_bytes()).hexdigest() if png.is_file() else ""})
    else:
        for png in sorted(render_dir.glob("*.png")):
            pages.append({"id": png.stem, "render": str(png.resolve()), "source": "",
                          "sha256": hashlib.sha256(png.read_bytes()).hexdigest()})

    acceptance = []
    if args.acceptance:
        acceptance = json.loads(Path(args.acceptance).read_text())
        if isinstance(acceptance, dict):
            acceptance = acceptance.get("checks", [])

    self_read = str(args.self_read).lower() in ("1", "true", "yes")
    g1_exit = 0 if g1.get("ok") else 1

    ok = self_read and g1_exit == 0 and bool(pages)

    manifest = {
        "schema": _SHIP_SCHEMA,
        "run_id": run_id,
        "build_revision": build_revision,
        "ok": ok,
        "status": "PASS" if ok else "FAIL",
        "project": args.project,
        "version_label": args.version_label,
        "created_at": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "self_read": self_read,
        "self_read_notes": args.self_read_notes,
        "g1_exit": g1_exit,
        "g1_report": str(Path(args.g1).resolve()),
        "pages": pages,
        "critic_verdicts": verdicts,
        "acceptance_checks": acceptance,
    }
    if is_web:
        manifest["base_url"] = base_url
        manifest["inputs"] = inputs
    validator_path = Path(__file__).with_name("validate-ship-manifest.py")
    module_spec = importlib.util.spec_from_file_location("visual_ship_validator", validator_path)
    validator = importlib.util.module_from_spec(module_spec)
    module_spec.loader.exec_module(validator)
    errors = validator.manifest_errors(manifest)
    if errors:
        ok = False
        manifest.update(ok=False, status="FAIL", errors=errors)
    out = Path(args.out)
    _write_atomic(out, json.dumps(manifest, indent=2, ensure_ascii=False) + "\n")
    print(f"wrote {out} ok={ok}")
    return 0 if ok else 1


if __name__ == "__main__":
    try:
        sys.exit(main())
    except (OSError, ValueError, TypeError, KeyError) as exc:
        print(f"FATAL: invalid ship input: {exc}", file=sys.stderr)
        sys.exit(2)
