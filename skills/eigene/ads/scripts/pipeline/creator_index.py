#!/usr/bin/env python3
"""creator_index.py

Builds an index that tells, for every creator source record in the Ads
knowledge corpus, whether the ORIGINAL text (tweet text, transcript,
caption) exists locally on disk and where.

Read-only on all inputs. Writes exactly one output file (sources_index.jsonl)
and prints a summary. Python 3 stdlib only, deterministic.
"""
from __future__ import annotations

import hashlib
import json
import os
import re
import sys
from collections import Counter, OrderedDict, defaultdict

WISSEN = "/root/raphael-skills/skills/eigene/ads/references/wissen"
AUTOREN = os.path.join(WISSEN, "autoren")
BESTAND = os.path.join(WISSEN, "bestand")
BRAIN_RAW = "/root/raphael-brain/raw"
X_FETCH = "/tmp/x-fetch"
RESEARCH = "/root/clients/make/ads/research"
RESEARCH_DIRS = OrderedDict(
    [
        ("marc-evers-2026-08-19", os.path.join(RESEARCH, "marc-evers-2026-08-19")),
        ("startrunningads-2026-08-19", os.path.join(RESEARCH, "startrunningads-2026-08-19")),
        ("transkript-nachzug-2026-08-30", os.path.join(RESEARCH, "transkript-nachzug-2026-08-30")),
    ]
)
OUT_DIR = "/root/skill-workspace/audits/2026-09-13/run/creators"
OUT_FILE = os.path.join(OUT_DIR, "sources_index.jsonl")

AUTHORS = ["brillaas", "eric-steigner", "evanseech", "georgeclem", "heikstepo", "marc-evers", "nicktheriot_", "zackpaid"]
CANONICAL = {
    "brillaas": "BRILLAAS",
    "eric-steigner": "ERIC-STEIGNER",
    "evanseech": "EVANSEECH",
    "georgeclem": "GEORGECLEM",
    "heikstepo": "HEIK-STEPANJAN",
    "marc-evers": "MARC-EVERS",
    "nicktheriot_": "NICK-THERIOT",
    "zackpaid": "ZACK-BORDEAUX",
    "zac-regan": "ZAC-REGAN",
}
CANON_ORDER = ["BRILLAAS", "ERIC-STEIGNER", "EVANSEECH", "GEORGECLEM", "HEIK-STEPANJAN", "MARC-EVERS", "NICK-THERIOT", "ZACK-BORDEAUX", "ZAC-REGAN"]
# Tokens in brain raw filenames that attribute a file to one of our creators.
# Zack Bordeaux (zackpaid) and Zac Regan (startrunningads) stay separate.
BRAIN_NAME_TOKENS = {
    "brillaas": "BRILLAAS",
    "eric-steigner": "ERIC-STEIGNER",
    "evanseech": "EVANSEECH",
    "georgeclem": "GEORGECLEM",
    "heikstepo": "HEIK-STEPANJAN",
    "marc-evers": "MARC-EVERS",
    "nicktheriot": "NICK-THERIOT",
    "zackpaid": "ZACK-BORDEAUX",
    "startrunningads": "ZAC-REGAN",
}

# Lower rank = richer / preferred.
KIND_RANK = {
    "transcript_txt": 0,
    "whisper_txt": 0,
    "youtube_subs_txt": 1,
    "brain_raw_md:transcript": 1,
    "vtt": 2,
    "brain_raw_md:fulltext": 3,
    "brain_raw_md:caption": 4,
    "tweet_json": 5,
    "evidence_file": 9,
}

RE_IG = re.compile(r"instagram\.com/(?:p|reel|reels|tv)/([A-Za-z0-9_-]{5,})/?")
RE_YT = re.compile(r"(?:youtube\.com/watch\?(?:[^ \s\"']*&)?v=|youtu\.be/|youtube\.com/shorts/)([A-Za-z0-9_-]{11})")
RE_X = re.compile(r"(?:x\.com|twitter\.com)/[A-Za-z0-9_]+/status/(\d{8,})")
RE_HEADING = re.compile(r"^(#{1,6})\s+(.*?)\s*$")


# --------------------------------------------------------------------------- utils
def sha256_text(s: str) -> str:
    return hashlib.sha256(s.encode("utf-8")).hexdigest()


def read_jsonl(path):
    out = []
    with open(path, encoding="utf-8") as fh:
        for line in fh:
            line = line.strip()
            if line:
                out.append(json.loads(line))
    return out


def read_json(path):
    with open(path, encoding="utf-8") as fh:
        return json.load(fh)


def parse_url(url: str):
    """-> (platform, media_key)"""
    if not url:
        return "other", None
    m = RE_IG.search(url)
    if m:
        return "instagram", m.group(1)
    m = RE_YT.search(url)
    if m:
        return "youtube", m.group(1)
    m = RE_X.search(url)
    if m:
        return "x", m.group(1)
    return "other", None


def key_in_name(key: str, name: str) -> bool:
    """Media key appears in filename as a delimited token (not glued to alnum)."""
    return re.search(r"(?<![A-Za-z0-9_])" + re.escape(key) + r"(?![A-Za-z0-9_])", name) is not None


def clean_body(lines):
    """Strip blockquote markers, trim blank lines; -> (text, offset_of_first_nonblank)"""
    out = []
    for ln in lines:
        s = ln.rstrip("\n")
        if s.startswith("> "):
            s = s[2:]
        elif s == ">":
            s = ""
        out.append(s)
    first = 0
    while first < len(out) and not out[first].strip():
        first += 1
    last = len(out)
    while last > first and not out[last - 1].strip():
        last -= 1
    return "\n".join(out[first:last]), first


# --------------------------------------------------------------------------- inventory
def load_inventory():
    """Returns (records, anomalies). Each record: dict with author, canonical, source_id, url, platform,
    media_key, learning_ids(set), date, disposition, inventory(path)."""
    recs = []
    anomalies = []
    seen_ids = defaultdict(list)

    for author in AUTHORS:
        src_path = os.path.join(AUTOREN, author, "sources.jsonl")
        lrn_path = os.path.join(AUTOREN, author, "learnings.jsonl")
        learn_by_src = defaultdict(set)
        if os.path.exists(lrn_path):
            for l in read_jsonl(lrn_path):
                learn_by_src[str(l.get("source_id"))].add(l["id"])
        src_ids_here = set()
        for r in read_jsonl(src_path):
            sid = str(r.get("source_id"))
            url = r.get("url")
            if not url:
                anomalies.append(f"{author}: source {sid} without url")
            platform, key = parse_url(url or "")
            if key is None:
                anomalies.append(f"{author}: source {sid} url not parseable as x/instagram/youtube: {url}")
            elif key != sid and platform == "instagram" and "img_index" in (url or ""):
                anomalies.append(f"{author}: source {sid} is a carousel item; url shortcode {key} is the parent post (media_key=parent, lookup also by source_id)")
            lids = set(r.get("learning_ids") or []) | learn_by_src.get(sid, set())
            if r.get("n_learnings") is not None and int(r["n_learnings"]) != len(learn_by_src.get(sid, ())):
                anomalies.append(f"{author}: source {sid} n_learnings={r['n_learnings']} but learnings.jsonl has {len(learn_by_src.get(sid, ()))}")
            recs.append(
                dict(
                    author=author,
                    canonical=CANONICAL[author],
                    source_id=sid,
                    url=url,
                    platform=platform,
                    media_key=key,
                    learning_ids=lids,
                    date=r.get("date") or None,
                    disposition=r.get("disposition"),
                    inventory=src_path,
                )
            )
            src_ids_here.add(sid)
            seen_ids[(CANONICAL[author], sid)].append(src_path)
        for sid, lids in learn_by_src.items():
            if sid not in src_ids_here:
                anomalies.append(f"{author}: {len(lids)} learnings reference source_id {sid} missing in sources.jsonl")

    # zackpaid course/web sources
    cs_path = os.path.join(AUTOREN, "zackpaid", "course-sources.json")
    cl_path = os.path.join(AUTOREN, "zackpaid", "course-learnings.jsonl")
    if os.path.exists(cs_path):
        learn_by_src = defaultdict(set)
        if os.path.exists(cl_path):
            for l in read_jsonl(cl_path):
                learn_by_src[str(l.get("source_id"))].add(l["id"])
        for r in read_json(cs_path):
            sid = str(r.get("source_id"))
            url = r.get("url")
            platform, key = parse_url(url or "")
            lids = set(r.get("learning_ids") or []) | learn_by_src.get(sid, set())
            recs.append(
                dict(
                    author="zackpaid",
                    canonical="ZACK-BORDEAUX",
                    source_id=sid,
                    url=url,
                    platform=platform,
                    media_key=key,
                    learning_ids=lids,
                    date=r.get("retrieved_at") or None,
                    disposition=r.get("access_status"),
                    inventory=cs_path,
                )
            )
            seen_ids[("ZACK-BORDEAUX", sid)].append(cs_path)

    # Zac Regan (startrunningads) -- separate identity, never merged with zackpaid
    zq_path = os.path.join(BESTAND, "zac-regan-quellen.json")
    zk_path = os.path.join(BESTAND, "zac-regan-korpus.jsonl")
    zq = read_json(zq_path)
    korpus_by_media = defaultdict(set)
    korpus_url = {}
    for k in read_jsonl(zk_path):
        korpus_by_media[k["media_id"]].add(k["id"])
        korpus_url.setdefault(k["media_id"], k.get("source_url"))
    zq_media = set()
    for s in zq.get("sources", []):
        mid = s["media_id"]
        zq_media.add(mid)
        url = s.get("source_url") or korpus_url.get(mid)
        platform, key = parse_url(url or "")
        lids = set(s.get("record_ids") or []) | korpus_by_media.get(mid, set())
        if set(s.get("record_ids") or []) != korpus_by_media.get(mid, set()):
            anomalies.append(f"zac-regan: media {mid} record_ids in quellen.json != korpus ids ({len(s.get('record_ids') or [])} vs {len(korpus_by_media.get(mid, ()))})")
        recs.append(
            dict(
                author="startrunningads",
                canonical="ZAC-REGAN",
                source_id=mid,
                url=url,
                platform=platform,
                media_key=key or mid,
                learning_ids=lids,
                date=s.get("published_at") or None,
                disposition=s.get("disposition") or s.get("status"),
                inventory=zq_path,
            )
        )
        seen_ids[("ZAC-REGAN", mid)].append(zq_path)
    for mid in sorted(set(korpus_by_media) - zq_media):
        anomalies.append(f"zac-regan: korpus media {mid} ({len(korpus_by_media[mid])} claims) missing in zac-regan-quellen.json; added from korpus")
        url = korpus_url.get(mid)
        platform, key = parse_url(url or "")
        recs.append(
            dict(
                author="startrunningads",
                canonical="ZAC-REGAN",
                source_id=mid,
                url=url,
                platform=platform,
                media_key=key or mid,
                learning_ids=korpus_by_media[mid],
                date=None,
                disposition=None,
                inventory=zk_path,
            )
        )
        seen_ids[("ZAC-REGAN", mid)].append(zk_path)

    # Marc Evers bestand -- overlaps autoren/marc-evers; add only media not already present
    mq_path = os.path.join(BESTAND, "marc-evers-quellen.json")
    mk_path = os.path.join(BESTAND, "marc-evers-korpus.jsonl")
    if os.path.exists(mq_path):
        mq = read_json(mq_path)
        korpus_by_media = defaultdict(set)
        for k in read_jsonl(mk_path):
            korpus_by_media[k["media_id"]].add(k["id"])
        have = {r["source_id"] for r in recs if r["canonical"] == "MARC-EVERS"}
        overlap = 0
        for s in mq.get("sources", []):
            mid = s["media_id"]
            if mid in have:
                overlap += 1
                # attach published_at as date where autoren record lacks a date
                for r in recs:
                    if r["canonical"] == "MARC-EVERS" and r["source_id"] == mid and not r["date"]:
                        r["date"] = s.get("published_at") or None
                continue
            url = s.get("source_url")
            platform, key = parse_url(url or "")
            recs.append(
                dict(
                    author="marc-evers",
                    canonical="MARC-EVERS",
                    source_id=mid,
                    url=url,
                    platform=platform,
                    media_key=key or mid,
                    learning_ids=set(s.get("record_ids") or []) | korpus_by_media.get(mid, set()),
                    date=s.get("published_at") or None,
                    disposition=None,
                    inventory=mq_path,
                )
            )
            seen_ids[("MARC-EVERS", mid)].append(mq_path)
        anomalies.append(f"marc-evers: bestand/marc-evers-quellen.json overlaps autoren/marc-evers/sources.jsonl on {overlap} of {len(mq.get('sources', []))} media (not duplicated in index)")

    for (canon, sid), paths in sorted(seen_ids.items()):
        if len(paths) > 1:
            anomalies.append(f"duplicate source_id {sid} for {canon} in {sorted(set(paths))}")
    return recs, anomalies


# --------------------------------------------------------------------------- candidates
class Cand:
    __slots__ = ("kind", "path", "start", "text", "json_index", "subkind", "name_match")

    def __init__(self, kind, path, start, text, json_index=None, subkind=None, name_match=True):
        self.kind = kind
        self.path = path
        self.start = start
        self.text = text
        self.json_index = json_index
        self.subkind = subkind  # for brain_raw_md: transcript|fulltext|caption
        self.name_match = name_match

    def rank_key(self):
        rk = self.kind if self.subkind is None else f"{self.kind}:{self.subkind}"
        return (KIND_RANK.get(rk, 8), 0 if self.name_match else 1, -len(self.text), self.path)


def scan_x_fetch():
    """-> dict tweet_id -> Cand ; plus per-file id sets for orphan reporting."""
    cands = {}
    per_file = {}
    if not os.path.isdir(X_FETCH):
        return cands, per_file
    for fn in sorted(os.listdir(X_FETCH)):
        if not fn.endswith(".json"):
            continue
        path = os.path.join(X_FETCH, fn)
        try:
            data = read_json(path)
        except Exception:
            continue
        if not isinstance(data, list):
            continue
        ids = set()
        for i, t in enumerate(data):
            tid = str(t.get("id"))
            text = t.get("text") or ""
            ids.add(tid)
            c = Cand("tweet_json", path, None, text, json_index=i)
            if tid not in cands or len(text) > len(cands[tid].text):
                cands[tid] = c
        per_file[path] = ids
    return cands, per_file


def scan_transcripts():
    """-> (dict key -> Cand, dict dirname -> list of transcript basenames(keys), mapping info)"""
    cands = {}
    dir_keys = OrderedDict()
    for dname, dpath in RESEARCH_DIRS.items():
        tdir = os.path.join(dpath, "transcripts")
        keys = []
        if os.path.isdir(tdir):
            for fn in sorted(os.listdir(tdir)):
                if not fn.endswith(".txt"):
                    continue
                key = fn[:-4]
                path = os.path.join(tdir, fn)
                with open(path, encoding="utf-8", errors="replace") as fh:
                    text = fh.read().strip()
                keys.append((key, path))
                c = Cand("transcript_txt", path, 1, text)
                if key not in cands or len(text) > len(cands[key].text):
                    cands[key] = c
        dir_keys[tdir] = keys
        # vtt files directly in the research dir (prefer .de.vtt/.en.vtt over -orig)
        vtts = defaultdict(list)
        if os.path.isdir(dpath):
            for fn in sorted(os.listdir(dpath)):
                if fn.endswith(".vtt"):
                    key = fn.split(".")[0]
                    vtts[key].append(os.path.join(dpath, fn))
        vkeys = []
        for key, paths in sorted(vtts.items()):
            paths = sorted(paths, key=lambda p: (("-orig" in p), p))
            path = paths[0]
            text, start = vtt_text(path)
            vkeys.append((key, path))
            if key not in cands:
                cands[key] = Cand("vtt", path, start, text)
        if vkeys:
            dir_keys[dpath + " (*.vtt)"] = vkeys
    return cands, dir_keys


def vtt_text(path):
    lines = []
    start = None
    last = None
    with open(path, encoding="utf-8", errors="replace") as fh:
        for i, ln in enumerate(fh, 1):
            s = ln.strip()
            if not s or s.startswith(("WEBVTT", "Kind:", "Language:", "NOTE")) or "-->" in s:
                continue
            s = re.sub(r"<[^>]+>", "", s).strip()
            if not s or s == last:
                continue
            if start is None:
                start = i
            lines.append(s)
            last = s
    return "\n".join(lines), start


def nachzug_mapping():
    """Check whether transkript-nachzug transcripts (uuid names) map to creator URLs."""
    dpath = RESEARCH_DIRS["transkript-nachzug-2026-08-30"]
    mapping = {}
    for fn in ("worklist.json", "worklist2.json", "worklist3.json"):
        p = os.path.join(dpath, fn)
        if os.path.exists(p):
            try:
                for it in read_json(p):
                    if isinstance(it, dict) and it.get("notion_id"):
                        mapping[it["notion_id"]] = it.get("library_url") or it.get("url") or ""
            except Exception:
                pass
    return mapping


def extract_sections(lines):
    """-> list of (level, title, heading_line_idx0, body_start_idx0, body_end_idx0_exclusive)"""
    heads = []
    for i, ln in enumerate(lines):
        m = RE_HEADING.match(ln)
        if m:
            heads.append((len(m.group(1)), m.group(2), i))
    secs = []
    for j, (lvl, title, i) in enumerate(heads):
        end = len(lines)
        for lvl2, _, i2 in heads[j + 1 :]:
            if lvl2 <= lvl:
                end = i2
                break
        secs.append((lvl, title, i, i + 1, end))
    return secs


def classify_heading(title: str):
    t = title.lower()
    if "transkript" in t or "transcript" in t:
        # plain transcript preferred over timestamped variants
        return "transcript", (1 if ("zeit" in t or "timestamp" in t) else 0)
    if t.startswith(("originaltext", "volltext", "post", "tweet", "thread")):
        return "fulltext", 0
    if t.startswith("caption") or t.startswith("beschreibung"):
        return "caption", 0
    return None, 0


def best_text_in_range(lines, secs, lo, hi, min_level):
    """Among sections within [lo,hi) with level >= min_level pick the richest original-text section.
    -> (subkind, start_line_1based, text) or None"""
    best = None
    for lvl, title, hi_idx, b0, b1 in secs:
        if hi_idx < lo or hi_idx >= hi or lvl < min_level:
            continue
        sub, penalty = classify_heading(title)
        if sub is None:
            continue
        text, off = clean_body(lines[b0:b1])
        if not text.strip():
            continue
        key = (KIND_RANK[f"brain_raw_md:{sub}"], penalty, -len(text))
        if best is None or key < best[0]:
            best = (key, sub, b0 + off + 1, text)
    if best is None:
        return None
    return best[1], best[2], best[3]


def scan_brain_raw(all_keys: set):
    """-> (dict key -> list[Cand], dict path -> set(keys found), dict path -> creator token)"""
    cands = defaultdict(list)
    file_keys = {}
    file_creator = {}
    if not os.path.isdir(BRAIN_RAW):
        return cands, file_keys, file_creator
    for fn in sorted(os.listdir(BRAIN_RAW)):
        if not fn.endswith(".md") or ".provenance" in fn:
            continue
        if not (fn.startswith("bookmark-") or fn.startswith("resource-")):
            continue
        path = os.path.join(BRAIN_RAW, fn)
        low = fn.lower()
        creator = None
        for tok, canon in BRAIN_NAME_TOKENS.items():
            if tok in low:
                creator = canon
                break
        with open(path, encoding="utf-8", errors="replace") as fh:
            content = fh.read()
        lines = content.split("\n")
        secs = extract_sections(lines)
        # keys referenced by URL anywhere in the file
        found = set()
        for rx in (RE_IG, RE_YT, RE_X):
            for m in rx.finditer(content):
                found.add(m.group(1))
        # keys used as section headings (multi-media files)
        head_secs = {}
        for lvl, title, hi_idx, b0, b1 in secs:
            t = title.strip()
            if t in all_keys:
                head_secs[t] = (lvl, hi_idx, b0, b1)
                found.add(t)
        name_keys = {k for k in all_keys if k in fn and key_in_name(k, fn)}
        found |= name_keys
        file_keys[path] = found
        file_creator[path] = creator
        relevant = found & all_keys
        if not relevant:
            continue
        # whole-file best text (for single-media files)
        whole = best_text_in_range(lines, secs, 0, len(lines), 1) if not head_secs else None
        for k in sorted(relevant):
            if k in head_secs:
                lvl, hi_idx, b0, b1 = head_secs[k]
                r = best_text_in_range(lines, secs, hi_idx + 1, b1, lvl + 1)
            elif head_secs:
                # multi-media file: key referenced but has no own section -> no text attribution
                r = None
            else:
                r = whole
            if r is None:
                continue
            sub, start, text = r
            cands[k].append(Cand("brain_raw_md", path, start, text, subkind=sub, name_match=(k in name_keys)))
    return cands, file_keys, file_creator


MEDIA_ROOT = "/root/raphael-brain/raw/media"
MEDIA_DIRS = {  # dir -> canonical creator (None = key-based, any creator)
    "evanseech": "EVANSEECH", "eric-steigner": "ERIC-STEIGNER", "heikstepo": "HEIK-STEPANJAN",
    "marc-evers": "MARC-EVERS", "youtube": None,
}


def scan_media():
    """Durable media under raw/media/<creator>/: mp4|m4a, transcript txt (+meta), frames dir, ocr sidecar.
    -> (dict key -> Cand for transcript text, dict key -> media block)"""
    cands = {}
    blocks = {}
    for d, canon in MEDIA_DIRS.items():
        base = os.path.join(MEDIA_ROOT, d)
        if not os.path.isdir(base):
            continue
        keys = OrderedDict()
        for fn in sorted(os.listdir(base)):
            if (fn.endswith(".mp4") or fn.endswith(".m4a")) and not fn.endswith(".video.mp4"):
                keys.setdefault(fn[: fn.rfind(".")], os.path.join(base, fn))
        imgroot = os.path.join(base, "images")
        if os.path.isdir(imgroot):  # carousel / still-image posts: no mp4, but images + frames + OCR
            for k in sorted(os.listdir(imgroot)):
                if os.path.isdir(os.path.join(imgroot, k)):
                    keys.setdefault(k, None)
        for key, mfile in keys.items():
            blk = OrderedDict()
            blk["media_dir"] = base
            blk["media_file"] = mfile
            blk["images_dir"] = os.path.join(imgroot, key) if os.path.isdir(os.path.join(imgroot, key)) else None
            cap = os.path.join(base, f"{key}.caption.txt")
            blk["caption"] = cap if os.path.isfile(cap) else None
            txt = None
            kind = None
            for cand, k in ((f"{key}.txt", "whisper_txt"), (f"{key}.de.txt", "youtube_subs_txt"), (f"{key}.en.txt", "youtube_subs_txt")):
                pth = os.path.join(base, cand)
                if os.path.isfile(pth) and os.path.getsize(pth) > 0:
                    txt, kind = pth, k
                    break
            blk["transcript"] = txt
            blk["transcript_kind"] = kind
            meta = os.path.join(base, f"{key}.transcript.meta.json")
            blk["transcript_meta"] = meta if os.path.isfile(meta) else None
            blk["no_audio"] = os.path.isfile(os.path.join(base, f"{key}.noaudio"))
            fdir = os.path.join(base, "frames", key)
            nfr = len([f for f in os.listdir(fdir) if f.endswith(".jpg")]) if os.path.isdir(fdir) else 0
            blk["frames_dir"] = fdir if nfr else None
            blk["n_frames"] = nfr
            ocr = os.path.join(base, "frames", f"{key}.ocr.json")
            blk["ocr"] = None
            blk["ocr_frames"] = 0
            if os.path.isfile(ocr):
                try:
                    o = read_json(ocr)
                    blk["ocr"] = ocr
                    blk["ocr_frames"] = int(o.get("n_frames") or 0)
                except Exception:
                    pass
            blk["ocr_complete"] = bool(blk["ocr"]) and blk["ocr_frames"] == nfr and nfr > 0
            blocks[key] = blk
            if txt:
                with open(txt, encoding="utf-8", errors="replace") as fh:
                    text = fh.read().strip()
                if text:
                    cands[key] = Cand(kind, txt, 1, text)
            elif blk["caption"]:
                with open(cap, encoding="utf-8", errors="replace") as fh:
                    text = fh.read().strip()
                if text:
                    cands[key] = Cand("brain_raw_md", cap, 1, text, subkind="caption")
    return cands, blocks


RAW_MAP = "/root/skill-workspace/audits/2026-09-13/run/creators/raw_map.jsonl"
RAW_MAP_SUBKIND = {"tweet": "fulltext", "transcript": "transcript", "caption": "caption", "reference_ad": "fulltext"}


def scan_raw_map():
    """raw_map.jsonl rows (brain-write ingests with line ranges) -> dict media_key -> list[Cand(brain_raw_md)]"""
    cands = defaultdict(list)
    if not os.path.isfile(RAW_MAP):
        return cands
    cache = {}
    with open(RAW_MAP, encoding="utf-8") as fh:
        for ln in fh:
            ln = ln.strip()
            if not ln:
                continue
            try:
                r = json.loads(ln)
            except Exception:
                continue
            path = os.path.join(os.path.dirname(BRAIN_RAW.rstrip("/")), r["raw_path"]) if not r["raw_path"].startswith("/") else r["raw_path"]
            if path not in cache:
                if not os.path.isfile(path):
                    cache[path] = None
                else:
                    with open(path, encoding="utf-8", errors="replace") as f2:
                        cache[path] = f2.read().split("\n")
            lines = cache[path]
            if lines is None:
                continue
            text = "\n".join(lines[r["start_line"] - 1 : r["end_line"]]).strip()
            if not text:
                continue
            sub = RAW_MAP_SUBKIND.get(r.get("kind"), "fulltext")
            cands[str(r["media_key"])].append(Cand("brain_raw_md", path, r["start_line"], text, subkind=sub))
    return cands


def scan_zackpaid_evidence():
    """-> dict source_id -> path (image evidence, no text)"""
    out = {}
    p = os.path.join(AUTOREN, "zackpaid", "evidence", "posts")
    if os.path.isdir(p):
        for fn in sorted(os.listdir(p)):
            key = os.path.splitext(fn)[0]
            out.setdefault(key, os.path.join(p, fn))
    return out


# --------------------------------------------------------------------------- main
HILFE = """creator_index.py - baut den Quellen-Index fuer die Creator-Korpora.

Prueft je Quellen-Datensatz, ob der Originaltext (Tweet, Transkript, Caption)
lokal vorliegt und wo. Liest nur, schreibt genau eine Datei
(creators/sources_index.jsonl) und gibt eine Zusammenfassung aus.

Aufruf: python3 creator_index.py

Keine Argumente. Deterministisch, nur Standardbibliothek.

Exit 0 = Index geschrieben, 2 = Aufruf abgelehnt."""
USAGE = "usage: creator_index.py  (keine Argumente; -h zeigt die Hilfe)"


def main():
    argv = sys.argv[1:]
    if "-h" in argv or "--help" in argv:
        print(HILFE)
        return 0
    if argv:
        print(USAGE, file=sys.stderr)
        return 2
    recs, anomalies = load_inventory()
    all_keys = {r["media_key"] for r in recs if r["media_key"]}
    all_keys |= {r["source_id"] for r in recs}

    tweet_cands, xfetch_ids = scan_x_fetch()
    tr_cands, dir_keys = scan_transcripts()
    brain_cands, brain_file_keys, brain_file_creator = scan_brain_raw(all_keys)
    evidence = scan_zackpaid_evidence()
    media_cands, media_blocks = scan_media()
    rawmap_cands = scan_raw_map()
    nz_map = nachzug_mapping()

    os.makedirs(OUT_DIR, exist_ok=True)
    matched_keys = set()
    out_records = []
    for r in recs:
        key = r["media_key"] or r["source_id"]
        lookup = {key, r["source_id"]}
        cands = []
        for k in lookup:
            if k in tr_cands:
                cands.append(tr_cands[k])
            if k in tweet_cands:
                cands.append(tweet_cands[k])
            if k in media_cands:
                cands.append(media_cands[k])
            cands.extend(rawmap_cands.get(k, []))
            cands.extend(brain_cands.get(k, []))
        cands = [c for c in cands if c.text and c.text.strip()]
        cands.sort(key=lambda c: c.rank_key())
        best = cands[0] if cands else None
        if best is None:
            for k in lookup:
                if k in evidence:
                    best = Cand("evidence_file", evidence[k], None, "")
                    break
        if best is not None:
            matched_keys |= lookup
        rec = OrderedDict()
        rec["author"] = r["author"]
        rec["source_id"] = r["source_id"]
        rec["canonical_source_id"] = r["canonical"]
        rec["url"] = r["url"]
        rec["platform"] = r["platform"]
        rec["media_key"] = key
        rec["learning_ids"] = sorted(r["learning_ids"])
        rec["n_learnings"] = len(r["learning_ids"])
        if best is None:
            rec["original_kind"] = "none"
            rec["original_path"] = None
            rec["text_start_line"] = None
            rec["text_chars"] = 0
            rec["text_sha256"] = None
        else:
            rec["original_kind"] = best.kind
            rec["original_path"] = best.path
            rec["text_start_line"] = best.start
            rec["text_chars"] = len(best.text)
            rec["text_sha256"] = sha256_text(best.text) if best.text else None
            if best.kind == "tweet_json":
                rec["json_index"] = best.json_index
            if best.kind == "brain_raw_md":
                rec["text_section"] = best.subkind
        date = r["date"]
        if not date and best is not None and best.kind == "tweet_json":
            try:
                date = read_json(best.path)[best.json_index].get("createdAtISO")
            except Exception:
                date = None
        rec["date"] = date
        rec["disposition"] = r["disposition"]
        for k in lookup:
            if k in media_blocks:
                rec["media"] = media_blocks[k]
                break
        alts = [c.path for c in cands[1:] if c.path != (best.path if best else None)]
        if alts:
            rec["alt_paths"] = sorted(set(alts))
        rec["inventory"] = r["inventory"]
        out_records.append(rec)

    out_records.sort(key=lambda x: (CANON_ORDER.index(x["canonical_source_id"]), x["source_id"]))
    with open(OUT_FILE, "w", encoding="utf-8") as fh:
        for rec in out_records:
            fh.write(json.dumps(rec, ensure_ascii=False) + "\n")

    # ------------------------------------------------------------------ summary
    print(f"Wrote {len(out_records)} records -> {OUT_FILE}\n")
    kinds = ["tweet_json", "transcript_txt", "whisper_txt", "youtube_subs_txt", "brain_raw_md", "vtt", "evidence_file", "none"]
    hdr = f"{'canonical_source_id':<16} {'total':>5} {'w/learn':>7} {'w/text':>6} " + " ".join(f"{k:>14}" for k in kinds)
    print(hdr)
    print("-" * len(hdr))
    tot = Counter()
    for canon in CANON_ORDER:
        rs = [x for x in out_records if x["canonical_source_id"] == canon]
        if not rs:
            continue
        kc = Counter(x["original_kind"] for x in rs)
        with_text = sum(1 for x in rs if x["text_chars"] > 0)
        with_learn = sum(1 for x in rs if x["n_learnings"] > 0)
        print(f"{canon:<16} {len(rs):>5} {with_learn:>7} {with_text:>6} " + " ".join(f"{kc.get(k, 0):>14}" for k in kinds))
        tot["total"] += len(rs)
        tot["learn"] += with_learn
        tot["text"] += with_text
        for k in kinds:
            tot[k] += kc.get(k, 0)
    print("-" * len(hdr))
    print(f"{'ALL':<16} {tot['total']:>5} {tot['learn']:>7} {tot['text']:>6} " + " ".join(f"{tot[k]:>14}" for k in kinds))
    print("(brain_raw_md counted as text only when a Transkript/Originaltext/Caption section exists; evidence_file = image without text)")
    sub = Counter(x.get("text_section") for x in out_records if x["original_kind"] == "brain_raw_md")
    print(f"brain_raw_md sections used: {dict(sorted(sub.items()))}")
    no_text_with_learn = Counter(x["canonical_source_id"] for x in out_records if x["text_chars"] == 0 and x["n_learnings"] > 0)
    print(f"sources WITH learnings but WITHOUT local original text: {dict(sorted(no_text_with_learn.items()))}\n")

    # orphans
    print("Orphans (files matching no inventory record):")
    for tdir, keys in dir_keys.items():
        orphan = [(k, p) for k, p in keys if k not in matched_keys and k not in all_keys]
        note = ""
        if "transkript-nachzug" in tdir:
            mapped = sum(1 for k, _ in keys if k in nz_map)
            hosts = Counter(re.sub(r"^https?://(www\.)?", "", nz_map.get(k, "")).split("/")[0] for k, _ in keys if k in nz_map)
            note = f"  [uuid->url mapping via worklist*.json: {mapped}/{len(keys)} mapped, hosts={dict(hosts)}; none are creator posts]"
        print(f"  {tdir}: {len(orphan)}/{len(keys)} orphan{note}")
        for k, p in orphan[:3]:
            print(f"      {os.path.basename(p)}")
    for path, ids in sorted(xfetch_ids.items()):
        orphan = sorted(i for i in ids if i not in all_keys)
        print(f"  {path}: {len(orphan)}/{len(ids)} tweet ids not in inventory (newer than inventory or retweets)")
        for i in orphan[:3]:
            print(f"      id={i}")
    # brain raw files attributed to our creators by filename token whose keys matched nothing
    by_creator = defaultdict(list)
    for path, creator in sorted(brain_file_creator.items()):
        if creator is None:
            continue
        keys = brain_file_keys.get(path, set())
        if keys and not (keys & all_keys):
            by_creator[creator].append(path)
        elif not keys:
            by_creator[creator + " (no media key in file)"].append(path)
    print(f"  {BRAIN_RAW} (bookmark-*/resource-* attributed by filename to a creator, no inventory match):")
    for creator in sorted(by_creator):
        ps = by_creator[creator]
        print(f"      {creator}: {len(ps)}")
        for p in ps[:3]:
            print(f"          {os.path.basename(p)}")
    matched_brain = {x["original_path"] for x in out_records if x["original_kind"] == "brain_raw_md"}
    print(f"  brain raw files used as original text: {len(matched_brain)}")

    print("\nAnomalies:")
    for a in anomalies:
        print(f"  - {a}")
    if not anomalies:
        print("  none")


if __name__ == "__main__":
    sys.exit(main())
