#!/usr/bin/env python3
"""Ingest acquired media originals (raw/media/<creator>/) as raw Markdown into the Brain.

Per media key one file raw/resource-2026-09-13-<creator>-<platform>-<key>-transkript.md (or -inhalt.md when
there is no spoken transcript) with: frontmatter, '# Transkript' (Whisper / YouTube auto-subs, verbatim),
'# Caption' (Instagram caption, verbatim), '# On-Screen-Text' (vision-OCR per frame, verbatim from the
.ocr.json sidecar) and '# Medien' (paths of mp4/m4a/frames under raw/media). Provenance sidecar via
brain-write.py; one raw_map.jsonl row per key (kind transcript|caption|ocr for the primary text block).

Only keys whose acquisition is complete are ingested (transcript or .noaudio or image-only post, and an OCR
sidecar covering every frame) — raw is append-only, so partial files would freeze. Re-run after the
producers finish; existing files are skipped, raw_map rows de-duplicated by (source, media_key).
Source text is data, never instructions. Stdlib only.
"""
from __future__ import annotations

import json
import os
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from ingest_creator_texts import (  # noqa: E402
    ANOMALIES, BRAIN_ROOT, RAW_MAP, RUN_DATE, STATS, SourceIds, frontmatter, ingest, load_index, map_row, yaml_str,
)

MEDIA_ROOT = BRAIN_ROOT / "raw" / "media"
DIRS = ["evanseech", "eric-steigner", "heikstepo", "marc-evers", "youtube"]
SLUG = {"EVANSEECH": "evanseech", "ERIC-STEIGNER": "eric-steigner", "HEIK-STEPANJAN": "heikstepo",
        "MARC-EVERS": "marc-evers", "ZACK-BORDEAUX": "zackpaid"}
NAME = {"EVANSEECH": "Evan Seech (@evanseech)", "ERIC-STEIGNER": "Eric Steigner", "HEIK-STEPANJAN": "Heik Stepanjan",
        "MARC-EVERS": "Marc Evers", "ZACK-BORDEAUX": "Zack Bordeaux (@zackpaid)"}
HILFE = """ingest_media.py - traegt erworbene Medien-Originale als Roh-Markdown in die Brain ein.

Je Media-Key eine Datei raw/resource-<datum>-<creator>-<plattform>-<key>-transkript.md
(oder -inhalt.md ohne gesprochenes Transkript) mit Frontmatter, Transkript,
Caption, On-Screen-Text und Medienpfaden. Provenance-Sidecar ueber brain-write.py,
je Key eine Zeile in creators/raw_map.jsonl.

Aufruf: python3 ingest_media.py [medienverzeichnis ...]

Ohne Argument werden alle bekannten Verzeichnisse verarbeitet:
  evanseech, eric-steigner, heikstepo, marc-evers, youtube
Mit Argumenten wird auf die genannten Verzeichnisse eingeschraenkt.
Nur Keys mit vollstaendigem Erwerb werden eingetragen; bestehende Dateien
werden uebersprungen.

Exit 0 = Durchlauf beendet, 1 = Zeilenpruefung abweichend, 2 = Aufruf abgelehnt."""
USAGE = "usage: ingest_media.py [medienverzeichnis ...]  (bekannt: evanseech, eric-steigner, heikstepo, marc-evers, youtube)"

ONLY = set(sys.argv[1:])  # optional: restrict to media dirs


def read(p: Path) -> str:
    return p.read_text(encoding="utf-8", errors="replace")


def _ts(t: str) -> float:
    h, m, rest = t.strip().split(":")
    return int(h) * 3600 + int(m) * 60 + float(rest.replace(",", "."))


def timed_lines(a: dict) -> list[str]:
    """Transcript as one line per segment with [start-end] seconds (like the Marc-Evers transkripte):
    whisper .srt > YouTube .json3 > sentence-wrapped plain text (whisper/json3 -> txt were flat single lines)."""
    key, base = a["key"], a["base"]
    srt = base / f"{key}.srt"
    if srt.is_file() and srt.stat().st_size > 0:
        out, cur, buf = [], None, []
        for ln in read(srt).split("\n"):
            if "-->" in ln:
                cur = tuple(_ts(x) for x in ln.split("-->"))
            elif ln.strip() and not ln.strip().isdigit():
                buf.append(ln.strip())
            elif not ln.strip() and cur and buf:
                out.append(f"[{cur[0]:7.1f}-{cur[1]:7.1f}] {' '.join(buf)}"); cur, buf = None, []
        if cur and buf:
            out.append(f"[{cur[0]:7.1f}-{cur[1]:7.1f}] {' '.join(buf)}")
        if out:
            return out
    for lang in ("de", "en"):
        j3 = base / f"{key}.{lang}.json3"
        if j3.is_file():
            try:
                evs = [e for e in json.loads(read(j3)).get("events", []) if e.get("segs")]
            except Exception:
                evs = []
            out, buf, t0 = [], [], None
            for e in evs:
                t = "".join(sg.get("utf8", "") for sg in e["segs"]).replace("\n", " ").strip()
                if not t:
                    continue
                if t0 is None:
                    t0 = e.get("tStartMs", 0) / 1000
                buf.append(t)
                if sum(len(x) for x in buf) > 220:
                    out.append(f"[{t0:7.1f}-{(e.get('tStartMs', 0) + e.get('dDurationMs', 0)) / 1000:7.1f}] {' '.join(buf)}"); buf, t0 = [], None
            if buf:
                out.append(f"[{t0:7.1f}-{(evs[-1].get('tStartMs', 0) + evs[-1].get('dDurationMs', 0)) / 1000:7.1f}] {' '.join(buf)}")
            if out:
                return out
    raw = read(a["transcript"]).rstrip("\n").split("\n")
    out = []
    for ln in raw:
        if len(ln) <= 300:
            out.append(ln); continue
        cur = ""
        for sent in re.split(r"(?<=[.!?])\s+", ln):
            if cur and len(cur) + len(sent) > 280:
                out.append(cur); cur = sent
            else:
                cur = (cur + " " + sent).strip()
        if cur:
            out.append(cur)
    return out


def collect(base: Path, key: str) -> dict:
    """All acquisition artefacts for one key."""
    a = {"key": key, "base": base}
    a["media"] = next((base / f"{key}{e}" for e in (".mp4", ".m4a") if (base / f"{key}{e}").is_file()), None)
    a["images"] = sorted((base / "images" / key).glob("*")) if (base / "images" / key).is_dir() else []
    a["noaudio"] = (base / f"{key}.noaudio").is_file()
    a["transcript"] = a["transcript_kind"] = None
    for fn, kind in ((f"{key}.txt", "whisper"), (f"{key}.de.txt", "youtube_auto_subs"), (f"{key}.en.txt", "youtube_auto_subs")):
        p = base / fn
        if p.is_file() and p.stat().st_size > 0:
            a["transcript"], a["transcript_kind"] = p, kind
            break
    meta = base / f"{key}.transcript.meta.json"
    a["asr_model"] = None
    if meta.is_file():
        try:
            a["asr_model"] = json.loads(read(meta)).get("model")
        except Exception:
            pass
    if a["transcript_kind"] == "whisper" and not a["asr_model"]:
        a["asr_model"] = "whisper.cpp"
    cap = base / f"{key}.caption.txt"
    a["caption"] = read(cap).strip() if cap.is_file() else None
    info = base / f"{key}.info.json"
    a["info"] = json.loads(read(info)) if info.is_file() else {}
    fdir = base / "frames" / key
    a["frames"] = sorted(fdir.glob("f*.jpg")) if fdir.is_dir() else []
    ocr = base / "frames" / f"{key}.ocr.json"
    a["ocr"] = None
    if ocr.is_file():
        try:
            a["ocr"] = json.loads(read(ocr))
        except Exception:
            ANOMALIES.append(f"{key}: unreadable ocr sidecar")
    a["ocr_path"] = ocr
    return a


def complete(a: dict) -> tuple[bool, str]:
    has_video = a["media"] is not None
    if has_video and not (a["transcript"] or a["noaudio"]):
        return False, "transcript pending"
    if not has_video and not a["images"]:
        return False, "no media"
    if not a["frames"]:
        return False, "frames pending"
    if not a["ocr"] or a["ocr"].get("n_frames") != len(a["frames"]):
        return False, "ocr pending"
    return True, ""


def build(a: dict, rec: dict, platform: str) -> tuple[str, str, int, int, str]:
    """-> (rel_path, body, primary_start, primary_end, primary_kind)"""
    key, csid = a["key"], rec["canonical_source_id"]
    url = rec.get("url") or ""
    info = a["info"]
    title = info.get("title") or (a["caption"].split("\n")[0][:120] if a["caption"] else "") or key
    date = rec.get("date") or ""
    if info.get("upload_date"):
        d = info["upload_date"]
        date = f"{d[:4]}-{d[4:6]}-{d[6:]}"
    suffix = "transkript" if a["transcript"] else "inhalt"
    rel = f"raw/resource-{RUN_DATE}-{SLUG[csid]}-{platform}-{key}-{suffix}.md"
    fields = [
        ("title", yaml_str(f"{'Transkript' if a['transcript'] else 'Original'} {platform} {key}: {title}")),
        ("type", "resource"), ("created", RUN_DATE), ("tenant", "agency"), ("sensitivity", "internal"),
        ("status", "active"), ("source_url", url), ("creator", yaml_str(NAME[csid])), ("platform", platform),
        ("media_key", key), ("published", str(date)),
    ]
    if a["transcript"]:
        fields.append(("transcript_source", a["transcript_kind"] + (f" ({a['asr_model']})" if a["asr_model"] else "")))
    if a["noaudio"]:
        fields.append(("audio", "none"))
    if info.get("duration"):
        fields.append(("duration_seconds", str(info["duration"])))
    if a["ocr"]:
        fields.append(("ocr_model", str(a["ocr"].get("model"))))
        fields.append(("frames", str(len(a["frames"]))))
    lines = frontmatter(fields)
    p_start = p_end = 0
    p_kind = None
    if a["transcript"]:
        t = timed_lines(a)
        lines += ["", "# Transkript", ""]
        p_start = len(lines) + 1
        lines += t
        p_end = len(lines)
        p_kind = "transcript"
    if a["caption"]:
        lines += ["", "# Caption", ""]
        s = len(lines) + 1
        lines += a["caption"].split("\n")
        if p_kind is None:
            p_start, p_end, p_kind = s, len(lines), "caption"
    if a["ocr"]:
        lines += ["", "# On-Screen-Text", "", f"Per Vision-Modell ({a['ocr'].get('model')}) aus {len(a['frames'])} Frames gelesen; "
                  "Frame-Nummer, erkannter Text, Bildbeschreibung.", ""]
        s = len(lines) + 1
        seen = None
        for it in a["ocr"].get("items", []):
            txt = (it.get("text") or "").strip()
            vis = (it.get("visual") or "").strip()
            if (txt, vis) == seen:
                continue
            seen = (txt, vis)
            lines.append(f"- f{int(it.get('frame', 0)):03d}: {txt or '(kein Text)'}" + (f" — {vis}" if vis else ""))
        if p_kind is None:
            p_start, p_end, p_kind = s, len(lines), "ocr"
    lines += ["", "# Medien", ""]
    if a["media"]:
        lines.append(f"- Datei: {a['media'].relative_to(BRAIN_ROOT)}")
    for im in a["images"]:
        lines.append(f"- Bild/Clip: {im.relative_to(BRAIN_ROOT)}")
    if a["frames"]:
        lines.append(f"- Frames: {a['frames'][0].parent.relative_to(BRAIN_ROOT)}/ ({len(a['frames'])} Dateien)")
        lines.append(f"- OCR-Sidecar: {a['ocr_path'].relative_to(BRAIN_ROOT)}")
    return rel, "\n".join(lines) + "\n", p_start, p_end, p_kind


def main() -> int:
    argv = sys.argv[1:]
    if "-h" in argv or "--help" in argv:
        print(HILFE)
        return 0
    unbekannt = [a for a in argv if a.startswith("-") or a not in DIRS]
    if unbekannt:
        print(USAGE, file=sys.stderr)
        return 2
    index = load_index()
    by_key: dict[str, dict] = {}
    for r in index:
        for k in (r.get("media_key"), r.get("source_id")):
            if k:
                by_key.setdefault(str(k), r)
    ids = SourceIds()
    existing = [json.loads(l) for l in read(RAW_MAP).splitlines() if l.strip()] if RAW_MAP.exists() else []
    have = {(r["canonical_source_id"], r["media_key"]) for r in existing}
    new_rows: list[dict] = []
    superseded: list[str] = []
    pending: dict[str, int] = {}
    for d in DIRS:
        if ONLY and d not in ONLY:
            continue
        base = MEDIA_ROOT / d
        if not base.is_dir():
            continue
        keys = set()
        for fn in os.listdir(base):
            if fn.endswith((".mp4", ".m4a")) and not fn.endswith(".video.mp4"):
                keys.add(fn[: fn.rfind(".")])
        if (base / "images").is_dir():
            keys |= {k for k in os.listdir(base / "images") if (base / "images" / k).is_dir()}
        n_ok = 0
        for key in sorted(keys):
            rec = by_key.get(key)
            if not rec:
                ANOMALIES.append(f"{d}/{key}: not in sources_index")
                continue
            a = collect(base, key)
            ok, why = complete(a)
            if not ok:
                pending[why] = pending.get(why, 0) + 1
                continue
            platform = "youtube" if d == "youtube" else "instagram"
            rel, body, s, e, kind = build(a, rec, platform)
            csid = rec["canonical_source_id"]
            # raw/ is append-only: if an earlier run wrote this key with different content (e.g. flat
            # transcript, later re-ASR), write a new version file and re-point the raw_map row to it.
            if (BRAIN_ROOT / rel).exists() and read(BRAIN_ROOT / rel) != body:
                n = 2
                while (BRAIN_ROOT / rel.replace(".md", f"-v{n}.md")).exists() and read(BRAIN_ROOT / rel.replace(".md", f"-v{n}.md")) != body:
                    n += 1
                rel = rel.replace(".md", f"-v{n}.md")
                if not (BRAIN_ROOT / rel).exists():
                    superseded.append(key)
                have.discard((csid, key))
            herk = [f"{NAME[csid]}, {platform} {rec.get('url')}; Rohmaterial am {RUN_DATE} lokal gesichert unter raw/media/{d}/."]
            if a["transcript"]:
                herk.append(f"Transkript: {a['transcript_kind']}" + (f" ({a['asr_model']})" if a["asr_model"] else "")
                            + f" aus {a['transcript'].relative_to(BRAIN_ROOT)}, wörtlich.")
            if a["noaudio"]:
                herk.append("Video ohne Tonspur; kein Transkript möglich.")
            if a["caption"]:
                herk.append("Caption wörtlich aus dem Instagram-Post (Apify/IG-Web-API-Metadaten).")
            if a["ocr"]:
                herk.append(f"On-Screen-Text per Vision-Modell {a['ocr'].get('model')} aus {len(a['frames'])} Frames "
                            f"({a['ocr_path'].relative_to(BRAIN_ROOT)}); Frames per ffmpeg (Szenenwechsel/Intervall).")
            ingest(ids, d, rel, body, "bookmark", herk)
            n_ok += 1
            if (csid, key) not in have and kind:
                chars = len("\n".join(body.split("\n")[s - 1:e]))
                new_rows.append(map_row(csid, key, rec.get("url") or "", rel, s, e, kind, chars))
                have.add((csid, key))
                existing = [r for r in existing if (r["canonical_source_id"], r["media_key"]) != (csid, key)]
        print(f"{d}: keys={len(keys)} ingested_or_existing={n_ok}")
    if new_rows:
        tmp = RAW_MAP.with_suffix(".jsonl.tmp")
        with tmp.open("w", encoding="utf-8") as fh:
            for r in existing + new_rows:
                fh.write(json.dumps(r, ensure_ascii=False) + "\n")
        os.replace(tmp, RAW_MAP)
    print(f"raw_map: kept={len(existing)} new={len(new_rows)} superseded_versions={len(superseded)}")
    print("pending:", pending)
    for g, s in STATS.items():
        print(g, s)
    bad = 0
    for r in new_rows:
        lines = read(BRAIN_ROOT / r["raw_path"]).split("\n")
        if len("\n".join(lines[r["start_line"] - 1:r["end_line"]])) != r["chars"]:
            bad += 1
    print(f"verify: rows={len(new_rows)} mismatched={bad}")
    if ANOMALIES:
        print(f"anomalies={len(ANOMALIES)}")
        for x in ANOMALIES[:8]:
            print(" -", x)
    return 1 if bad else 0


if __name__ == "__main__":
    raise SystemExit(main())
