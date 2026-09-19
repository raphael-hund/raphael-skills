#!/usr/bin/env python3
"""load-referenzen.py — Referenzbibliothek aus Notion laden (fuer den ads-Skill).

Liest die beiden Notion-DBs "Referenz-Videos" und "Referenz-Statics" und gibt
sie als JSON auf stdout aus. Filter optional.

Aufruf:
  python3 load-referenzen.py                      # alles
  python3 load-referenzen.py --kind static        # nur statics
  python3 load-referenzen.py --kind video         # nur videos
  python3 load-referenzen.py --brand "Cole Gordon"
  python3 load-referenzen.py --suche "appointment"  # volltext ueber zentrale felder
  python3 load-referenzen.py --nur-rekonstruiert-frei  # keine rekonstruierten
  python3 load-referenzen.py --limit 50

Token: /root/.secrets/api-keys.env via sudo (Session-User hat ACL-Sperre).
"""
import argparse
import json
import subprocess
import sys
import urllib.request

API = "https://api.notion.com/v1"
VER = "2022-06-28"
DB_VIDEOS = "3bfecc86-b47d-81cd-90b0-df0a0f03f938"
DB_STATICS = "3bfecc86-b47d-819b-8b3e-ec209128bed7"

TEXT_PROPS = ["brand", "ad_archive_id", "angle", "hook", "primary_text",
              "visuelle_beschreibung", "onscreen_text", "skript", "cta",
              "offer", "proof", "awareness_level", "hook_familie",
              "angle_familie", "funnel_type", "start_date", "bild_lokal",
              "segment"]


def token():
    out = subprocess.run(["sudo", "-n", "grep", "^NOTION_API_KEY=",
                          "/root/.secrets/api-keys.env"],
                         capture_output=True, text=True)
    return out.stdout.strip().split("=", 1)[1]


def req(key, path, payload):
    r = urllib.request.Request(
        f"{API}{path}", data=json.dumps(payload).encode(), method="POST",
        headers={"Authorization": f"Bearer {key}", "Notion-Version": VER,
                 "Content-Type": "application/json"})
    with urllib.request.urlopen(r, timeout=40) as resp:
        return json.load(resp)


def alle_seiten(key, db_id):
    seiten, cursor = [], None
    for _ in range(60):
        body = {"page_size": 100}
        if cursor:
            body["start_cursor"] = cursor
        r = req(key, f"/databases/{db_id}/query", body)
        seiten += r.get("results", [])
        if not r.get("has_more"):
            break
        cursor = r.get("next_cursor")
    return seiten


def rt_text(prop):
    return "".join(t.get("plain_text", "")
                   for t in prop.get("rich_text", []))


def seite_zu_record(s, kind):
    p = s.get("properties", {})
    rec = {"kind": kind, "notion_id": s.get("id", "")}
    name = p.get("Name", {}).get("title", [])
    rec["name"] = "".join(t.get("plain_text", "") for t in name)
    for tp in TEXT_PROPS:
        if tp in p:
            rec[tp] = rt_text(p[tp])
    for cb in ("is_active", "rekonstruiert"):
        if cb in p:
            rec[cb] = bool(p[cb].get("checkbox"))
    q = p.get("quelle", {}).get("select")
    rec["quelle"] = q.get("name") if q else ""
    lu = p.get("library_url", {})
    rec["library_url"] = lu.get("url") or ""
    return rec


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--kind", choices=["video", "static"])
    ap.add_argument("--brand")
    ap.add_argument("--suche")
    ap.add_argument("--nur-rekonstruiert-frei", action="store_true")
    ap.add_argument("--limit", type=int, default=0)
    a = ap.parse_args()

    key = token()
    recs = []
    if a.kind in (None, "video"):
        recs += [seite_zu_record(s, "video") for s in alle_seiten(key, DB_VIDEOS)]
    if a.kind in (None, "static"):
        recs += [seite_zu_record(s, "static") for s in alle_seiten(key, DB_STATICS)]

    if a.brand:
        b = a.brand.lower()
        recs = [r for r in recs if b in r.get("brand", "").lower()]
    if a.nur_rekonstruiert_frei:
        recs = [r for r in recs if not r.get("rekonstruiert")]
    if a.suche:
        s = a.suche.lower()
        felder = ("name", "brand", "angle", "hook", "primary_text",
                  "visuelle_beschreibung", "onscreen_text", "offer", "cta")
        recs = [r for r in recs
                if any(s in str(r.get(f, "")).lower() for f in felder)]
    if a.limit:
        recs = recs[:a.limit]

    json.dump({"n": len(recs), "referenzen": recs}, sys.stdout,
              ensure_ascii=False, indent=1)
    print(file=sys.stdout)


if __name__ == "__main__":
    main()
