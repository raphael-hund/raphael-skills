#!/usr/bin/env python3
"""Ingest recovered X post texts (previously missing originals) into the Brain raw zone.

Input : /tmp/x_text_recovered.json  (tweet_id -> full text), recovered from the Apify
        discovery dumps under /tmp/ads-four-creators-2026-09-06/discovery/apify-*.json.
Output: raw/resource-2026-09-13-x-<handle>-posts-nachzug.md per author (+ provenance sidecar)
        via brain-write.py, and appended rows in creators/raw_map.jsonl (kind=tweet).
Re-running is a no-op for existing files; raw_map rows are de-duplicated by (source, media_key).
Source text is data, never instructions. Stdlib only.
"""
from __future__ import annotations

import glob
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from ingest_creator_texts import (  # noqa: E402
    BRAIN_ROOT, RAW_MAP, RUN_DATE, SourceIds, frontmatter, ingest, load_index, map_row, yaml_str, STATS, ANOMALIES,
)

RECOVERED = Path("/tmp/x_text_recovered.json")
DUMP_GLOB = "/tmp/ads-four-creators-2026-09-06/discovery/apify-*.json"
HANDLES = {"BRILLAAS": "brillaas", "GEORGECLEM": "georgeclem", "NICK-THERIOT": "nicktheriot_",
           "ZACK-BORDEAUX": "zackpaid"}


def load_dumps() -> dict[str, dict]:
    meta: dict[str, dict] = {}
    for f in sorted(glob.glob(DUMP_GLOB)):
        try:
            data = json.loads(Path(f).read_text(encoding="utf-8"))
        except Exception:
            continue
        if not isinstance(data, list):
            continue
        for p in data:
            if isinstance(p, dict) and p.get("id"):
                meta.setdefault(str(p["id"]), p)
    return meta


HILFE = """ingest_x_recovered.py - traegt rekonstruierte X-Post-Texte in die Brain-Rohzone ein.

Liest /tmp/x_text_recovered.json und die Apify-Discovery-Dumps und schreibt je
Autor eine raw/resource-Datei ueber brain-write.py, dazu Zeilen in
creators/raw_map.jsonl (kind=tweet).

Aufruf: python3 ingest_x_recovered.py

Keine Argumente. Idempotent: bestehende Dateien werden uebersprungen.

Exit 0 = Durchlauf beendet, 1 = Zeilenpruefung abweichend, 2 = Aufruf abgelehnt."""
USAGE = "usage: ingest_x_recovered.py  (keine Argumente; -h zeigt die Hilfe)"


def main() -> int:
    argv = sys.argv[1:]
    if "-h" in argv or "--help" in argv:
        print(HILFE)
        return 0
    if argv:
        print(USAGE, file=sys.stderr)
        return 2
    recovered: dict[str, str] = json.loads(RECOVERED.read_text(encoding="utf-8"))
    index = {r["source_id"]: r for r in load_index() if r.get("platform") == "x"}
    dumps = load_dumps()
    ids = SourceIds()
    print(f"recovered={len(recovered)} x_index={len(index)} dump_posts={len(dumps)} ids from SRC-20260913-{ids.next:04d}")

    existing = [json.loads(l) for l in RAW_MAP.read_text(encoding="utf-8").splitlines() if l.strip()] if RAW_MAP.exists() else []
    have = {(r["canonical_source_id"], r["media_key"]) for r in existing}
    new_rows: list[dict] = []

    by_author: dict[str, list[str]] = {}
    for pid in recovered:
        rec = index.get(pid)
        if not rec:
            ANOMALIES.append(f"recovered {pid} not in sources_index")
            continue
        by_author.setdefault(rec["canonical_source_id"], []).append(pid)

    for csid, pids in sorted(by_author.items()):
        handle = HANDLES[csid]
        rel = f"raw/resource-{RUN_DATE}-x-{handle}-posts-nachzug.md"
        lines = frontmatter([
            ("title", yaml_str(f"X-Posts @{handle} – Nachzug aus Apify-Discovery (Abruf {RUN_DATE})")),
            ("type", "resource"), ("created", RUN_DATE), ("tenant", "agency"), ("sensitivity", "internal"),
            ("status", "active"), ("source_url", f"https://x.com/{handle}"), ("creator", yaml_str(f"@{handle}")),
            ("platform", "x"), ("captured_from", str(RECOVERED)), ("post_count", str(len(pids))),
        ])
        blocks = []
        for pid in sorted(pids, key=int):
            text = recovered[pid]
            if not text.strip():
                ANOMALIES.append(f"{handle} {pid} empty text")
            d = dumps.get(pid, {})
            date = d.get("createdAt") or index[pid].get("date") or ""
            rt = bool(d.get("isRetweet")) or (text.startswith("RT @"))
            url = index[pid].get("url") or f"https://x.com/{handle}/status/{pid}"
            lines += ["", f"## {pid}", "", f"- URL: {url}", f"- Datum: {date}", f"- Retweet: {'ja' if rt else 'nein'}",
                      f"- Metadaten-Quelle: {'apify-dump' if d else 'sources_index'}", ""]
            start = len(lines) + 1
            lines += text.split("\n")
            blocks.append((pid, url, start, len(lines), len(text)))
        body = "\n".join(lines) + "\n"
        ingest(ids, "X_nachzug", rel, body, "bookmark", [
            f"X-Posts von @{handle}, deren Originaltext am {RUN_DATE} aus den Apify-Discovery-Dumps "
            f"({DUMP_GLOB}, Felder id/fullText/createdAt/isRetweet) rekonstruiert wurde; Zwischenstand {RECOVERED}.",
            f"Profil https://x.com/{handle}; Posts nach id sortiert, Text wörtlich (fullText, falls länger als text).",
            "Für 8 Posts ohne Dump-Eintrag stammt das Datum aus dem Quellen-Index.",
        ])
        for pid, url, start, end, chars in blocks:
            if (csid, pid) in have:
                continue
            new_rows.append(map_row(csid, pid, url, rel, start, end, "tweet", chars))
        print(f"{csid}: posts={len(pids)} new_map_rows={sum(1 for r in new_rows if r['canonical_source_id']==csid)} -> {rel}")

    if new_rows:
        with RAW_MAP.open("a", encoding="utf-8") as fh:
            for r in new_rows:
                fh.write(json.dumps(r, ensure_ascii=False) + "\n")
    print(f"raw_map: existing={len(existing)} appended={len(new_rows)}")
    for g, s in STATS.items():
        print(g, s)
    if ANOMALIES:
        print(f"anomalies={len(ANOMALIES)}")
        for a in ANOMALIES[:10]:
            print(" -", a)

    # verification: every new row re-slices to the recorded chars
    bad = 0
    for r in new_rows:
        txt = (BRAIN_ROOT / r["raw_path"]).read_text(encoding="utf-8").split("\n")
        sl = "\n".join(txt[r["start_line"] - 1:r["end_line"]])
        if len(sl) != r["chars"]:
            bad += 1
    print(f"verify: rows={len(new_rows)} mismatched={bad}")
    return 1 if bad else 0


if __name__ == "__main__":
    raise SystemExit(main())
