#!/usr/bin/env python3
"""Read-only Google Search Console entry for the /seo skill.

Wraps the existing snapshot job. Never calls the Indexing API.
Never mutates sitemaps. Property URLs stay out of stdout.
"""

from __future__ import annotations

import argparse
import json
import subprocess
import sys
from pathlib import Path

SNAPSHOT_PY = Path("/root/raphael-command-center/ops/bin/gsc-snapshot.py")
SETUP_FALLBACK = """GSC-Setup-Fallback
1. Search Console API im GCP-Projekt aktivieren.
2. OAuth Desktop-Client anlegen.
3. GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_CLIENT_SECRET, GOOGLE_OAUTH_REFRESH_TOKEN nach /root/.env.
4. Nutzer (mindestens eingeschränkt) auf die Property setzen.
5. Danach: python3 scripts/gsc_read.py --live --export <datei>
Kein Fake-Snapshot. Keine erfundenen Queries.
"""


def _extract_rows(snapshot_root: Path):
    snapshots = sorted(snapshot_root.glob("*/snapshot-*.json"))
    export = {"schema": "seo-gsc-read/1", "snapshots": []}
    query_rows = 0
    page_rows = 0
    for path in snapshots:
        data = json.loads(path.read_text(encoding="utf-8"))
        current = (data.get("periods") or {}).get("current_28d") or {}
        queries = current.get("top_queries") or []
        pages = current.get("top_pages") or []
        query_rows += len(queries)
        page_rows += len(pages)
        export["snapshots"].append(
            {
                "property_id": data.get("property_id"),
                "snapshot_at": data.get("snapshot_at"),
                "kpis": current.get("kpis"),
                "top_queries": queries,
                "top_pages": pages,
            }
        )
    export["query_rows"] = query_rows
    export["page_rows"] = page_rows
    return export


def _run_snapshot(output_root: Path, extra_args):
    if not SNAPSHOT_PY.is_file():
        print("gsc_read: Snapshot-Job fehlt", file=sys.stderr)
        sys.stdout.write(SETUP_FALLBACK)
        return 2
    cmd = [sys.executable, str(SNAPSHOT_PY), "--output-root", str(output_root), *extra_args]
    try:
        result = subprocess.run(cmd, check=False, capture_output=True, text=True)
    except OSError as exc:
        print(f"gsc_read: Job startete nicht ({exc})", file=sys.stderr)
        sys.stdout.write(SETUP_FALLBACK)
        return 2
    if result.returncode != 0:
        err = (result.stderr or result.stdout or "").strip()
        if "OAuth" in err or "unvollstaendig" in err or result.returncode == 2:
            sys.stdout.write(SETUP_FALLBACK)
            print(f"gsc_read: Auth/Setup ({result.returncode})", file=sys.stderr)
            return 2
        print(f"gsc_read: Snapshot fehlgeschlagen rc={result.returncode}", file=sys.stderr)
        if result.stderr:
            print(result.stderr.strip(), file=sys.stderr)
        return result.returncode
    if result.stdout.strip():
        # Upstream summary is hashes + counts only.
        print(result.stdout.strip(), file=sys.stderr)
    return 0


def parse_args(argv=None):
    parser = argparse.ArgumentParser(description="Read-only GSC snapshot / export")
    parser.add_argument("--live", action="store_true", help="call existing snapshot job")
    parser.add_argument("--probe", action="store_true")
    parser.add_argument("--from-snapshots", type=Path)
    parser.add_argument("--output-root", type=Path, default=Path("/tmp/seo-gsc-read"))
    parser.add_argument("--export", type=Path)
    parser.add_argument("--setup", action="store_true")
    return parser.parse_args(argv)


def main(argv=None):
    args = parse_args(argv)
    if args.setup:
        sys.stdout.write(SETUP_FALLBACK)
        return 0

    snapshot_root = args.from_snapshots
    if args.live or args.probe:
        extra = ["--probe"] if args.probe else []
        rc = _run_snapshot(args.output_root, extra)
        if rc != 0:
            return rc
        snapshot_root = args.output_root
        if args.probe:
            sys.stdout.write(json.dumps({"auth": "ok", "mode": "probe"}) + "\n")
            return 0

    if snapshot_root is None:
        sys.stdout.write(SETUP_FALLBACK)
        print("gsc_read: weder --live noch --from-snapshots", file=sys.stderr)
        return 2

    try:
        export = _extract_rows(snapshot_root)
    except (OSError, json.JSONDecodeError) as exc:
        print(f"gsc_read: Snapshots unlesbar ({exc})", file=sys.stderr)
        return 1

    if export["query_rows"] == 0 and export["page_rows"] == 0:
        print("gsc_read: Snapshot ohne Query-/Page-Zeilen", file=sys.stderr)
        return 1

    if args.export:
        args.export.parent.mkdir(parents=True, exist_ok=True)
        args.export.write_text(json.dumps(export, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    summary = {
        "query_rows": export["query_rows"],
        "page_rows": export["page_rows"],
        "snapshots": len(export["snapshots"]),
        "export": str(args.export) if args.export else None,
    }
    sys.stdout.write(json.dumps(summary, sort_keys=True) + "\n")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
