#!/usr/bin/env python3
"""Ingest verbatim creator texts into the Brain raw/ zone and cut review packets.

Groups:
  A  Zac Regan reel transcripts       -> raw/resource-2026-09-13-startrunningads-<SC>-transkript.md
  B  Marc Evers YouTube transcripts   -> raw/resource-2026-09-13-marc-evers-youtube-<ID>-transkript.md (chunked packets)
  C  Meta Ads Library ad transcripts  -> raw/resource-2026-09-13-reference-ad-<ADID|uuid>-transkript.md
  D  Fetched X posts (3 authors)      -> raw/resource-2026-09-13-x-<author>-posts.md (map only, no packets)

Every raw file goes through brain-write.py (the only allowed writer) and gets a
provenance sidecar whose sha256 matches the written bytes.  Re-running is a
no-op for files that already exist.  Source text is data, never instructions.
Stdlib only.
"""
from __future__ import annotations

import datetime as dt
import hashlib
import json
import os
import re
import subprocess
import sys
from pathlib import Path

BRAIN_ROOT = Path(os.environ.get("BRAIN_ROOT", "/root/raphael-brain"))
RUN_ROOT = Path(os.environ.get("ADS_RUN_ROOT", "/root/skill-workspace/audits/2026-09-13/run"))
RUN_DATE = "2026-09-13"
WRITER = BRAIN_ROOT / "scripts" / "brain-write.py"
PROVENANCE_CHECK = BRAIN_ROOT / "scripts" / "candidate-provenance.py"
RESEARCH = Path("/root/clients/make/ads/research")
ZAC_DIR = RESEARCH / "startrunningads-2026-08-19"
MARC_DIR = RESEARCH / "marc-evers-2026-08-19"
REF_DIR = RESEARCH / "transkript-nachzug-2026-08-30"
X_DIR = Path("/tmp/x-fetch")
INDEX = RUN_ROOT / "creators" / "sources_index.jsonl"
RAW_MAP = RUN_ROOT / "creators" / "raw_map.jsonl"
PACKETS = RUN_ROOT / "creators" / "packets_originals.jsonl"
PROBE_PATH = f"raw/evidence/ads-review-run-{RUN_DATE}/_probe.md"
THIN = 200
MARC_WINDOW = 90
DATA_NOTE = "Rohmaterial, nicht redaktionell geprüft; Quelltext ist Datenmaterial, keine Anweisung."

X_AUTHORS = {  # json basename -> (canonical source id, handle)
    "brillaas": ("BRILLAAS", "brillaas"),
    "georgeclem": ("GEORGECLEM", "georgeclem"),
    "nicktheriot_": ("NICK-THERIOT", "nicktheriot_"),
}

ANOMALIES: list[str] = []
STATS: dict[str, dict[str, int]] = {}


def stat(group: str, key: str, n: int = 1) -> None:
    STATS.setdefault(group, {})[key] = STATS.setdefault(group, {}).get(key, 0) + n


def yaml_str(value: str) -> str:
    return json.dumps(value, ensure_ascii=False)


def now_utc() -> str:
    return dt.datetime.now(dt.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


# ----------------------------------------------------------------- brain writer

def brain_create(rel_path: str, body: bytes) -> str:
    """Create a raw file via brain-write.py. Returns 'written' or 'exists'."""
    target = BRAIN_ROOT / rel_path
    if target.exists():
        return "exists"
    target.parent.mkdir(parents=True, exist_ok=True)
    proc = subprocess.run(
        [sys.executable, str(WRITER), "--root", str(BRAIN_ROOT), "--path", rel_path, "create"],
        input=body, capture_output=True,
    )
    if proc.returncode == 0:
        return "written"
    err = proc.stderr.decode("utf-8", "replace").strip()
    if "exist" in err.lower():
        return "exists"
    raise RuntimeError(f"brain-write failed for {rel_path}: {err}")


class SourceIds:
    def __init__(self) -> None:
        pat = re.compile(rb"SRC-20260913-(\d{4})")
        top = 1000
        for path in (BRAIN_ROOT / "raw").rglob("*.md"):
            try:
                data = path.read_bytes()
            except OSError:
                continue
            for m in pat.finditer(data):
                top = max(top, int(m.group(1)))
        self.next = top + 1

    def take(self) -> str:
        sid = f"SRC-20260913-{self.next:04d}"
        self.next += 1
        return sid


def write_sidecar(ids: SourceIds, rel_path: str, source_type: str, herkunft_lines: list[str]) -> str:
    sidecar_rel = rel_path + ".provenance.md"
    if (BRAIN_ROOT / sidecar_rel).exists():
        return "exists"
    raw_bytes = (BRAIN_ROOT / rel_path).read_bytes()
    sha = hashlib.sha256(raw_bytes).hexdigest()
    fm = [
        "---",
        f"source_id: {ids.take()}",
        f"source_type: {source_type}",
        "tenant: agency",
        "sensitivity: internal",
        f"captured_at: {now_utc()}",
        f"original_filename: {Path(rel_path).name}",
        f"sha256: {sha}",
        "status: active",
        "---",
        "# Herkunft",
    ]
    body = "\n".join(fm + herkunft_lines + [DATA_NOTE]) + "\n"
    return brain_create(sidecar_rel, body.encode("utf-8"))


def ingest(ids: SourceIds, group: str, rel_path: str, body: str, source_type: str, herkunft: list[str]) -> None:
    """Write raw md (if missing) and its sidecar (if missing); update stats."""
    state = brain_create(rel_path, body.encode("utf-8"))
    stat(group, "files_ingested" if state == "written" else "files_skipped_existing")
    if state == "exists":
        existing = (BRAIN_ROOT / rel_path).read_text(encoding="utf-8", errors="replace")
        if existing != body:
            ANOMALIES.append(f"{group}: existing {rel_path} differs from regenerated body (kept existing)")
    if write_sidecar(ids, rel_path, source_type, herkunft) == "written":
        stat(group, "sidecars_written")


# --------------------------------------------------------------- text helpers

def read_transcript(path: Path) -> list[str]:
    lines = path.read_text(encoding="utf-8", errors="replace").split("\n")
    while lines and not lines[-1].strip():
        lines.pop()
    return lines


def frontmatter(fields: list[tuple[str, str]]) -> list[str]:
    out = ["---"]
    for key, value in fields:
        out.append(f"{key}: {value}")
    out.append("---")
    return out


def transcript_body(fields: list[tuple[str, str]], transcript: list[str]) -> tuple[str, int, int]:
    """Return (body, start_line, end_line) for a frontmatter + '# Transkript' + verbatim lines file."""
    head = frontmatter(fields) + ["", "# Transkript", ""]
    start = len(head) + 1
    end = start + len(transcript) - 1
    return "\n".join(head + transcript) + "\n", start, end


def section_bounds(lines: list[str], heading_prefix: str, start_hint: int | None = None) -> tuple[int, int] | None:
    """1-based inclusive bounds of the text under the first heading matching prefix."""
    if start_hint:
        start = start_hint
    else:
        idx = next((i for i, l in enumerate(lines) if l.startswith(heading_prefix)), None)
        if idx is None:
            return None
        start = idx + 2  # line after heading
        while start <= len(lines) and not lines[start - 1].strip():
            start += 1
    end = start
    for i in range(start, len(lines) + 1):
        if lines[i - 1].startswith("## ") or lines[i - 1].startswith("# "):
            break
        end = i
    while end > start and not lines[end - 1].strip():
        end -= 1
    return start, end


def chars_of(lines: list[str], start: int, end: int) -> int:
    return len("\n".join(lines[start - 1:end]))


def packet(pid: str, source_id: str, tier: str, media_id: str, medium: str, rel: str, start: int, end: int,
           chars: int, url: str, context: str) -> dict:
    return {
        "id": pid, "track": "creators", "source_id": source_id, "source_tier": tier,
        "media_id": media_id, "medium": medium, "raw_path": rel, "start_line": start, "end_line": end,
        "kind": "text" if chars >= THIN else "thin", "chars": chars, "source_url": url,
        "original_context": context,
    }


def map_row(csid: str, media_key: str, url: str, rel: str, start: int, end: int, kind: str, chars: int) -> dict:
    return {"canonical_source_id": csid, "media_key": media_key, "url": url, "raw_path": rel,
            "start_line": start, "end_line": end, "kind": kind, "chars": chars}


def load_index() -> list[dict]:
    if not INDEX.exists():
        ANOMALIES.append(f"index missing: {INDEX}")
        return []
    return [json.loads(l) for l in INDEX.read_text(encoding="utf-8").splitlines() if l.strip()]


# --------------------------------------------------------------------- group A

def group_a(ids: SourceIds, index: list[dict], rows: list[dict], packets: list[dict]) -> None:
    g = "A_zac"
    tdir = ZAC_DIR / "transcripts"
    meta: dict = {}
    meta_path = ZAC_DIR / "meta.json"
    if meta_path.exists():
        meta = json.loads(meta_path.read_text(encoding="utf-8"))
    reuse = {r["media_key"]: r for r in index
             if r.get("canonical_source_id") == "ZAC-REGAN" and r.get("original_kind") == "brain_raw_md"
             and "startrunningads" in (r.get("original_path") or "")}
    for path in sorted(tdir.glob("*.txt")):
        sc = path.stem
        transcript = read_transcript(path)
        m = meta.get(sc) or {}
        url = m.get("url") or f"https://www.instagram.com/p/{sc}/"
        caption = (m.get("caption") or "").replace("\n", " ").strip()
        date = m.get("date") or m.get("taken_at") or ""
        if sc in reuse:
            r = reuse[sc]
            rel = os.path.relpath(r["original_path"], BRAIN_ROOT)
            lines = (BRAIN_ROOT / rel).read_text(encoding="utf-8", errors="replace").split("\n")
            b = section_bounds(lines, "## Whisper-Transkript", r.get("text_start_line"))
            if not b:
                ANOMALIES.append(f"A: reuse {rel} has no transcript section; falling back to new file")
            else:
                start, end = b
                if "paraphrasiert" in "\n".join(lines[:start]):
                    ANOMALIES.append(f"A: reused {rel} holds a paraphrased Whisper section, not verbatim; verbatim txt at {path}")
                stat(g, "files_reused")
                chars = chars_of(lines, start, end)
                rows.append(map_row("ZAC-REGAN", sc, url, rel, start, end, "transcript", chars))
                packets.append(packet(f"ZAC-REGAN-IG-{sc}", "ZAC-REGAN", "tier_1", f"MEDIA-ZAC-REGAN-{sc}",
                                      "instagram", rel, start, end, chars, url,
                                      f"Instagram-Reel @startrunningads {sc} (Brain-Rohdatei vom 2026-08-30)"))
                stat(g, "packets", 1)
                stat(g, "chars", chars)
                continue
        if not transcript:
            ANOMALIES.append(f"A: empty transcript {path}")
        rel = f"raw/resource-{RUN_DATE}-startrunningads-{sc}-transkript.md"
        fields = [
            ("title", yaml_str(f"Transkript Reel {sc} (@startrunningads)")),
            ("type", "resource"), ("created", RUN_DATE), ("tenant", "agency"), ("sensitivity", "internal"),
            ("status", "active"), ("source_url", url), ("creator", yaml_str("Zac Regan / @startrunningads")),
            ("platform", "instagram"), ("media_key", sc), ("captured_from", str(path)),
        ]
        if caption:
            fields.append(("caption", yaml_str(caption[:500])))
        if date:
            fields.append(("published", yaml_str(str(date))))
        if sc not in meta:
            fields.append(("meta_match", "none"))
            stat(g, "orphans_without_meta")
        body, start, end = transcript_body(fields, transcript)
        ingest(ids, g, rel, body, "bookmark", [
            f"Whisper-Transkript aus {path}, Instagram-Reel {url} von @startrunningads (Zac Regan).",
            "Erfasst per lokalem Reel-Download und Whisper (Research-Lauf 2026-08-19); Zeitmarken sind Positionsangaben im Video.",
        ])
        chars = chars_of(body.split("\n"), start, end)
        rows.append(map_row("ZAC-REGAN", sc, url, rel, start, end, "transcript", chars))
        packets.append(packet(f"ZAC-REGAN-IG-{sc}", "ZAC-REGAN", "tier_1", f"MEDIA-ZAC-REGAN-{sc}", "instagram",
                              rel, start, end, chars, url, f"Instagram-Reel @startrunningads {sc}"))
        stat(g, "packets", 1)
        stat(g, "chars", chars)


# --------------------------------------------------------------------- group B

def group_b(ids: SourceIds, rows: list[dict], packets: list[dict]) -> None:
    g = "B_marc"
    tdir = MARC_DIR / "transcripts"
    titles: dict[str, dict] = {}
    cj = MARC_DIR / "channel.json"
    if cj.exists():
        for e in json.loads(cj.read_text(encoding="utf-8")).get("entries") or []:
            if e and e.get("id"):
                titles[e["id"]] = e
    for path in sorted(tdir.glob("*.txt")):
        vid = path.stem
        url = f"https://www.youtube.com/watch?v={vid}"
        e = titles.get(vid) or {}
        title = e.get("title") or ""
        if not title:
            stat(g, "ids_without_channel_title")
        existing = sorted(p for p in (BRAIN_ROOT / "raw").glob(f"*marc-evers-youtube-{vid}*.md")
                          if not p.name.endswith(".provenance.md"))
        rel = start = end = None
        lines: list[str] = []
        for cand in existing:
            clines = cand.read_text(encoding="utf-8", errors="replace").split("\n")
            b = section_bounds(clines, "## Transkript mit Zeitmarken") or section_bounds(clines, "## Transkript")
            if b and chars_of(clines, *b) >= THIN:
                rel = os.path.relpath(cand, BRAIN_ROOT)
                start, end = b
                lines = clines
                stat(g, "files_reused")
                break
        if rel is None:
            transcript = read_transcript(path)
            if not transcript:
                ANOMALIES.append(f"B: empty transcript {path}")
            rel = f"raw/resource-{RUN_DATE}-marc-evers-youtube-{vid}-transkript.md"
            fields = [
                ("title", yaml_str(f"Transkript YouTube {vid}: {title}" if title else f"Transkript YouTube {vid}")),
                ("type", "resource"), ("created", RUN_DATE), ("tenant", "agency"), ("sensitivity", "internal"),
                ("status", "active"), ("source_url", url), ("creator", yaml_str("Marc Evers")),
                ("platform", "youtube"), ("media_key", vid), ("captured_from", str(path)),
            ]
            if e.get("duration"):
                fields.append(("duration_seconds", str(e["duration"])))
            body, start, end = transcript_body(fields, transcript)
            ingest(ids, g, rel, body, "bookmark", [
                f"Whisper-Transkript aus {path}, YouTube-Video {url} (Kanal Marc Evers).",
                "Erfasst per yt-dlp-Download und Whisper (Research-Lauf 2026-08-19); Zeitmarken sind Positionsangaben im Video.",
            ])
            lines = body.split("\n")
        chars = chars_of(lines, start, end)
        rows.append(map_row("MARC-EVERS", vid, url, rel, start, end, "transcript", chars))
        stat(g, "chars", chars)
        n = 0
        for cs in range(start, end + 1, MARC_WINDOW):
            n += 1
            ce = min(cs + MARC_WINDOW - 1, end)
            c_chars = chars_of(lines, cs, ce)
            packets.append(packet(f"MARC-EVERS-YT-{vid}-C{n:02d}", "MARC-EVERS", "tier_1", f"MEDIA-MARC-EVERS-{vid}",
                                  "youtube", rel, cs, ce, c_chars, url,
                                  f"YouTube Marc Evers {vid} Abschnitt {n}" + (f": {title}" if title else "")))
        stat(g, "packets", n)


# --------------------------------------------------------------------- group C

def parse_ad_name(name: str) -> tuple[str, str, str]:
    """Return (advertiser, title, ad_library_id_from_name)."""
    parts = [p.strip() for p in name.split("|")]
    m = re.search(r"(\d{9,})\s*$", name)
    ad_id = m.group(1) if m else ""
    if len(parts) >= 3:
        return parts[1], name, ad_id
    stripped = re.sub(r"\s*\d{9,}\s*$", "", name).strip()
    return stripped or "unbekannt", name, ad_id


def group_c(ids: SourceIds, rows: list[dict], packets: list[dict]) -> None:
    g = "C_reference_ads"
    tdir = REF_DIR / "transcripts"
    worklist: dict[str, dict] = {}
    for wl in sorted(REF_DIR.glob("worklist*.json")):
        for e in json.loads(wl.read_text(encoding="utf-8")):
            worklist.setdefault(e["notion_id"], e)
    used_ids: dict[str, str] = {}
    for path in sorted(tdir.glob("*.txt")):
        uuid = path.stem
        transcript = read_transcript(path)
        if not transcript:
            ANOMALIES.append(f"C: empty transcript {path}")
        e = worklist.get(uuid)
        if not e:
            ANOMALIES.append(f"C: uuid {uuid} has no worklist mapping")
            stat(g, "unmapped_uuids")
            lib_url, advertiser, title, ad_id = "", "unbekannt", "", ""
        else:
            lib_url = e.get("library_url") or ""
            advertiser, title, ad_id = parse_ad_name(e.get("name") or "")
            m = re.search(r"[?&]id=(\d+)", lib_url)
            if m:
                ad_id = m.group(1)
        key = ad_id or uuid
        if key in used_ids and used_ids[key] != uuid:
            ANOMALIES.append(f"C: ad library id {key} shared by {used_ids[key]} and {uuid}; using uuid for the latter")
            key = uuid
        used_ids.setdefault(key, uuid)
        rel = f"raw/resource-{RUN_DATE}-reference-ad-{key}-transkript.md"
        fields = [
            ("title", yaml_str(f"Referenz-Ad {key}: {advertiser}")),
            ("type", "resource"), ("created", RUN_DATE), ("tenant", "agency"), ("sensitivity", "internal"),
            ("status", "active"), ("source_url", lib_url or f"notion:{uuid}"), ("ad_library_url", lib_url),
            ("advertiser", yaml_str(advertiser)), ("ad_title", yaml_str(title)), ("platform", "reference_ad"),
            ("media_key", key), ("notion_id", uuid), ("captured_from", str(path)),
            ("provenance_note", yaml_str("Referenz-Ad: Beobachtung fremder Anzeige, kein eigener Proof")),
        ]
        body, start, end = transcript_body(fields, transcript)
        ingest(ids, g, rel, body, "ad-export", [
            f"Whisper-Transkript aus {path}; Anzeige aus der Meta Ads Library {lib_url or '(URL unbekannt)'}, Werbetreibender: {advertiser}.",
            f"Notion-Eintrag {uuid} der Werbebibliothek; Video-Download und Transkription im Nachzug 2026-08-30.",
            "Referenz-Ad: Beobachtung fremder Anzeige, kein eigener Proof.",
        ])
        chars = chars_of(body.split("\n"), start, end)
        rows.append(map_row("REFERENCE-ADS", key, lib_url, rel, start, end, "reference_ad", chars))
        packets.append(packet(f"REFERENCE-ADS-{key}", "REFERENCE-ADS", "own", f"MEDIA-REFERENCE-ADS-{key}",
                              "reference_ad", rel, start, end, chars, lib_url,
                              f"Referenz-Ad (Meta Ads Library) von {advertiser}"))
        stat(g, "packets", 1)
        stat(g, "chars", chars)


# --------------------------------------------------------------------- group D

def group_d(ids: SourceIds, rows: list[dict]) -> None:
    g = "D_x_posts"
    for base, (csid, handle) in X_AUTHORS.items():
        path = X_DIR / f"{base}.json"
        if not path.exists():
            ANOMALIES.append(f"D: missing {path}")
            continue
        posts = json.loads(path.read_text(encoding="utf-8"))
        posts = sorted(posts, key=lambda p: int(p["id"]))
        seen: set[str] = set()
        rel = f"raw/resource-{RUN_DATE}-x-{handle}-posts.md"
        lines = frontmatter([
            ("title", yaml_str(f"X-Posts @{handle} (Abruf {RUN_DATE})")),
            ("type", "resource"), ("created", RUN_DATE), ("tenant", "agency"), ("sensitivity", "internal"),
            ("status", "active"), ("source_url", f"https://x.com/{handle}"), ("creator", yaml_str(f"@{handle}")),
            ("platform", "x"), ("captured_from", str(path)), ("post_count", "0"),
        ])
        blocks: list[tuple[str, str, int, int, int]] = []  # id, url, start, end, chars
        count = 0
        for p in posts:
            pid = str(p["id"])
            if pid in seen:
                continue
            seen.add(pid)
            text = p.get("text") or ""
            if not text.strip():
                ANOMALIES.append(f"D: {handle} post {pid} has empty text")
            rt = bool(p.get("isRetweet"))
            author = ((p.get("author") or {}).get("screenName") or "").lower()
            if author and author != handle.lower() and not rt:
                ANOMALIES.append(f"D: {handle} post {pid} authored by @{author}")
            url = f"https://x.com/{handle}/status/{pid}"
            lines += ["", f"## {pid}", "", f"- URL: {url}", f"- Datum: {p.get('createdAtISO') or ''}",
                      f"- Retweet: {'ja' if rt else 'nein'}", ""]
            text_lines = text.split("\n")
            start = len(lines) + 1
            lines += text_lines
            end = len(lines)
            blocks.append((pid, url, start, end, len(text)))
            count += 1
        lines[lines.index("post_count: 0")] = f"post_count: {count}"
        body = "\n".join(lines) + "\n"
        ingest(ids, g, rel, body, "bookmark", [
            f"X-Posts von @{handle}, abgerufen am {RUN_DATE} in {path} (Twitter-API-Export, Felder id/text/createdAtISO/isRetweet).",
            f"Profil https://x.com/{handle}; Posts nach id sortiert, Retweets markiert, Text wörtlich.",
        ])
        for pid, url, start, end, chars in blocks:
            rows.append(map_row(csid, pid, url, rel, start, end, "tweet", chars))
            stat(g, "chars", chars)
        stat(g, "posts", count)


# ------------------------------------------------------------------------ main

def write_jsonl(path: Path, items: list[dict]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8") as fh:
        for item in items:
            fh.write(json.dumps(item, ensure_ascii=False) + "\n")


def probe() -> None:
    state = brain_create(PROBE_PATH, f"# Probe\n\nSchreibtest brain-write.py am {RUN_DATE}.\n".encode("utf-8"))
    print(f"probe {PROBE_PATH}: {state}")


HILFE = """ingest_creator_texts.py - traegt woertliche Creator-Texte in die Brain-Rohzone ein.

Gruppen: Zac-Regan-Reel-Transkripte, Marc-Evers-YouTube-Transkripte,
Meta-Ads-Library-Transkripte und abgerufene X-Posts.

Aufruf: python3 ingest_creator_texts.py

Keine Argumente. Schreibt ausschliesslich ueber brain-write.py, legt je Datei
einen Provenance-Sidecar an und ist bei bestehenden Dateien ein No-Op.
Pfade kommen aus BRAIN_ROOT und ADS_RUN_ROOT.

Exit 0 = Durchlauf beendet, 2 = Aufruf abgelehnt."""
USAGE = "usage: ingest_creator_texts.py  (keine Argumente; -h zeigt die Hilfe)"


def main() -> int:
    argv = sys.argv[1:]
    if "-h" in argv or "--help" in argv:
        print(HILFE)
        return 0
    if argv:
        print(USAGE, file=sys.stderr)
        return 2
    probe()
    ids = SourceIds()
    print(f"provenance ids start at SRC-20260913-{ids.next:04d}")
    index = load_index()
    rows: list[dict] = []
    packets: list[dict] = []
    group_a(ids, index, rows, packets)
    group_b(ids, rows, packets)
    group_c(ids, rows, packets)
    group_d(ids, rows)
    # keep rows added by the other ingesters (ingest_x_recovered / ingest_web_fetch / ingest_media)
    if RAW_MAP.exists():
        mine = {(r["canonical_source_id"], r["media_key"]) for r in rows}
        for line in RAW_MAP.read_text(encoding="utf-8").splitlines():
            if line.strip():
                prev = json.loads(line)
                if (prev["canonical_source_id"], prev["media_key"]) not in mine:
                    rows.append(prev)
    write_jsonl(RAW_MAP, rows)
    write_jsonl(PACKETS, packets)
    pk_ids = [p["id"] for p in packets]
    if len(pk_ids) != len(set(pk_ids)):
        ANOMALIES.append("duplicate packet ids")
    print("\n== Summary ==")
    for group in sorted(STATS):
        s = STATS[group]
        print(f"{group}: " + ", ".join(f"{k}={v}" for k, v in sorted(s.items())))
    print(f"raw_map rows={len(rows)} -> {RAW_MAP}")
    print(f"packets={len(packets)} (thin={sum(1 for p in packets if p['kind'] == 'thin')}) -> {PACKETS}")
    print(f"total chars={sum(r['chars'] for r in rows)}")
    if ANOMALIES:
        print(f"\n== Anomalies ({len(ANOMALIES)}) ==")
        for a in ANOMALIES:
            print(" -", a)
    print("\n== candidate-provenance.py (tail -3) ==")
    proc = subprocess.run([sys.executable, str(PROVENANCE_CHECK), "--root", str(BRAIN_ROOT)],
                          capture_output=True, text=True)
    out = (proc.stdout + proc.stderr).strip().splitlines()
    for line in out[-3:]:
        print(line)
    print(f"candidate-provenance exit={proc.returncode}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
