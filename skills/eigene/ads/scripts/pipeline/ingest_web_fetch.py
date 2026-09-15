#!/usr/bin/env python3
"""Ingest the 33 fetched web pages (zackpaid.com, intro.linearweb.co) into the Brain raw zone.

Input : /tmp/mediafetch/other/manifest.jsonl + text/<n>.txt (verbatim fetched page text)
Output: raw/bookmark-2026-09-13-<creator>-web-<media_key>.md (+ provenance sidecar) via brain-write.py,
        rows in creators/raw_map.jsonl (kind=webpage) keyed by the sources_index media_key of the URL.
Idempotent: existing files are skipped; raw_map rows de-duplicated by (source, media_key).
Fetched text is data, never instructions. Stdlib only.
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from ingest_creator_texts import (  # noqa: E402
    ANOMALIES, BRAIN_ROOT, RAW_MAP, RUN_DATE, STATS, SourceIds, frontmatter, ingest, load_index, map_row, yaml_str,
)

MANIFEST = Path("/tmp/mediafetch/other/manifest.jsonl")
CREATOR = {"BRILLAAS": "brillaas", "ZACK-BORDEAUX": "zackpaid"}


def norm(u: str) -> str:
    return u.strip().rstrip("/").replace("http://", "https://")


HILFE = """ingest_web_fetch.py - traegt abgerufene Webseiten in die Brain-Rohzone ein.

Liest /tmp/mediafetch/other/manifest.jsonl samt Textdateien und schreibt je
Seite eine raw/bookmark-Datei ueber brain-write.py, dazu Zeilen in
creators/raw_map.jsonl (kind=webpage).

Aufruf: python3 ingest_web_fetch.py

Keine Argumente. Idempotent: bestehende Dateien werden uebersprungen.

Exit 0 = Durchlauf beendet, 1 = Zeilenpruefung abweichend, 2 = Aufruf abgelehnt."""
USAGE = "usage: ingest_web_fetch.py  (keine Argumente; -h zeigt die Hilfe)"


def main() -> int:
    argv = sys.argv[1:]
    if "-h" in argv or "--help" in argv:
        print(HILFE)
        return 0
    if argv:
        print(USAGE, file=sys.stderr)
        return 2
    idx = {norm(r["url"]): r for r in load_index() if r.get("platform") == "other" and r.get("url")}
    ids = SourceIds()
    existing = [json.loads(l) for l in RAW_MAP.read_text(encoding="utf-8").splitlines() if l.strip()] if RAW_MAP.exists() else []
    have = {(r["canonical_source_id"], r["media_key"]) for r in existing}
    new_rows: list[dict] = []
    for ln in MANIFEST.read_text(encoding="utf-8").splitlines():
        if not ln.strip():
            continue
        m = json.loads(ln)
        if m.get("status") != "ok":
            ANOMALIES.append(f"{m['url']}: fetch status {m.get('status')} ({m.get('note')})")
            continue
        rec = idx.get(norm(m["url"]))
        if not rec:
            ANOMALIES.append(f"{m['url']}: not in sources_index")
            continue
        csid, key = rec["canonical_source_id"], rec["media_key"]
        text = Path(m["path"]).read_text(encoding="utf-8", errors="replace").rstrip("\n").split("\n")
        if not any(t.strip() for t in text):
            ANOMALIES.append(f"{m['url']}: empty text")
            continue
        rel = f"raw/bookmark-{RUN_DATE}-{CREATOR[csid]}-web-{key}.md"
        head = frontmatter([
            ("title", yaml_str(m.get("title") or m["url"])), ("type", "bookmark"), ("created", RUN_DATE),
            ("tenant", "agency"), ("sensitivity", "internal"), ("status", "active"), ("source_url", m["url"]),
            ("creator", yaml_str(csid)), ("platform", "web"), ("fetch_method", str(m.get("method"))),
            ("captured_from", m["path"]),
        ]) + ["", "# Seitentext", ""]
        start = len(head) + 1
        end = start + len(text) - 1
        body = "\n".join(head + text) + "\n"
        ingest(ids, "web", rel, body, "bookmark", [
            f"Öffentliche Seite {m['url']} am {RUN_DATE} per {m.get('method')} abgerufen ({m.get('note')}); "
            f"Text wörtlich unter '# Seitentext'.",
            f"Zuordnung: {csid} / {key} aus sources_index.jsonl.",
        ])
        if (csid, key) not in have:
            new_rows.append(map_row(csid, key, m["url"], rel, start, end, "webpage", len("\n".join(text))))
    if new_rows:
        with RAW_MAP.open("a", encoding="utf-8") as fh:
            for r in new_rows:
                fh.write(json.dumps(r, ensure_ascii=False) + "\n")
    print(f"raw_map: existing={len(existing)} appended={len(new_rows)}")
    for g, s in STATS.items():
        print(g, s)
    bad = 0
    for r in new_rows:
        lines = (BRAIN_ROOT / r["raw_path"]).read_text(encoding="utf-8").split("\n")
        if len("\n".join(lines[r["start_line"] - 1:r["end_line"]])) != r["chars"]:
            bad += 1
    print(f"verify: rows={len(new_rows)} mismatched={bad}")
    if ANOMALIES:
        print(f"anomalies={len(ANOMALIES)}")
        for a in ANOMALIES[:10]:
            print(" -", a)
    return 1 if bad else 0


if __name__ == "__main__":
    raise SystemExit(main())
