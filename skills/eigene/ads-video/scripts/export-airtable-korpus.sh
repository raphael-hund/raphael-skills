#!/usr/bin/env bash
# Exportiert Airtable Ads (kundeneigene Performance) + Referenz-Ads (Markt) aus Airtable.
#
# Zwei Ziele, zwei Repos:
#   eigene Ads   -> /root/clients/client-<KUNDE>/ads/korpus/eigene-ads.md   (Kundenrepo)
#   Referenz-Ads -> <skill>/references/korpus/referenz-ads.md              (Skills-Repo)
#
# Auth: /root/tools/secrets/airtable.env (AIRTABLE_API_KEY)
# Usage: KUNDE=make bash scripts/export-airtable-korpus.sh
#        (Default KUNDE=make; Base/Tabellen über AIRTABLE_* überschreibbar)
set -euo pipefail

KUNDE="${KUNDE:-make}"
ENV_FILE="${AIRTABLE_ENV_FILE:-/root/tools/secrets/airtable.env}"
BASE="${AIRTABLE_BASE:-app9VvWqeSNAOwwmV}"
ADS_TABLE="${AIRTABLE_ADS_TABLE:-tbl6pfcYgHgo2uVii}"
REF_TABLE="${AIRTABLE_REF_TABLE:-tblKuUyOwIAOqcvb7}"
SKILL_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT_DIR="${SKILL_ROOT}/references/korpus"
CLIENT_OUT_DIR="${CLIENT_KORPUS_DIR:-/root/clients/client-${KUNDE}/ads/korpus}"
DATE_TAG="$(date -u +%Y-%m-%d)"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "FAIL: missing $ENV_FILE" >&2
  exit 1
fi
# shellcheck disable=SC1090
set -a; source "$ENV_FILE"; set +a
KEY="${AIRTABLE_API_KEY:-${AIRTABLE_TOKEN:-}}"
if [[ -z "$KEY" ]]; then
  echo "FAIL: AIRTABLE_API_KEY empty" >&2
  exit 1
fi

mkdir -p "$OUT_DIR" "$CLIENT_OUT_DIR"
export AIRTABLE_API_KEY="$KEY" AIRTABLE_BASE="$BASE" AIRTABLE_ADS_TABLE="$ADS_TABLE" \
  AIRTABLE_REF_TABLE="$REF_TABLE" OUT_DIR="$OUT_DIR" CLIENT_OUT_DIR="$CLIENT_OUT_DIR" \
  KUNDE="$KUNDE" DATE_TAG="$DATE_TAG"

python3 <<'PY'
import os, json, urllib.request, urllib.parse, time
from pathlib import Path

KEY = os.environ["AIRTABLE_API_KEY"]
BASE = os.environ["AIRTABLE_BASE"]
OUT = Path(os.environ["OUT_DIR"])
CLIENT_OUT = Path(os.environ["CLIENT_OUT_DIR"])
KUNDE = os.environ["KUNDE"]
DATE = os.environ["DATE_TAG"]
ADS_TABLE = os.environ["AIRTABLE_ADS_TABLE"]
REF_TABLE = os.environ["AIRTABLE_REF_TABLE"]

def fetch_all(table_id):
    records, offset = [], None
    while True:
        q = {"pageSize": "100"}
        if offset:
            q["offset"] = offset
        url = f"https://api.airtable.com/v0/{BASE}/{table_id}?{urllib.parse.urlencode(q)}"
        req = urllib.request.Request(url, headers={"Authorization": f"Bearer {KEY}"})
        with urllib.request.urlopen(req, timeout=90) as r:
            d = json.load(r)
        records.extend(d.get("records", []))
        offset = d.get("offset")
        if not offset:
            break
        time.sleep(0.2)
    return records

def is_incomplete(text: str) -> bool:
    if not text:
        return True
    t = text.lower()
    return any(m in t for m in (
        "volltext liegt nur in notion", "nur in notion", "lokal geloescht",
        "lokal gelöscht", "struktur-beschreibung", "strukturbeschreibung",
        "feinstruktur nach notion",
    ))

def fmt_val(v):
    if isinstance(v, list):
        parts = []
        for item in v:
            if isinstance(item, dict):
                parts.append(item.get("filename") or (item.get("url", "")[:80]) or str(item))
            else:
                parts.append(str(item))
        return ", ".join(parts)
    if isinstance(v, dict):
        return json.dumps(v, ensure_ascii=False)[:200]
    return str(v)

def write_eigene(recs):
    fields_pref = [
        "Name", "Creative-ID", "Format", "Status", "Angle / Hook", "Visual Style",
        "Awareness Level", "Industry", "Target Audience", "Offer / Funnel-Typ",
        "Kampagne", "Adset", "Ausgaben gesamt", "Ausgaben 30T",
        "Hookrate % 14T", "ROAS 14T", "CTR % 14T", "CPL 30T", "CPA AT",
        "Leads 14T", "Termine AT", "Klicks gesamt", "Klicks AT",
    ]
    lines = [
        f"# Korpus: Eigene Ads ({KUNDE} · Airtable)",
        f"Kunde: {KUNDE}",
        f"Export: {DATE}",
        f"Base: {BASE}",
        f"Tabelle: Ads ({ADS_TABLE})",
        f"Anzahl Records: {len(recs)}",
        "Vollständig: ja (Pagination)",
        "",
        "Quelle für Winner-Learning: Hookrate % 14T, ROAS 14T, CTR % 14T, Ausgaben.",
        "",
    ]
    incomplete = 0
    for r in recs:
        f = r.get("fields", {})
        name = f.get("Name") or f.get("Creative-ID") or r["id"]
        lines.append(f"## {name}")
        lines.append(f"- id: {r['id']}")
        for k in fields_pref:
            if k in f and f[k] not in (None, "", []):
                lines.append(f"- {k}: {fmt_val(f[k])}")
        for k, v in sorted(f.items()):
            if k in fields_pref or k in ("Skript / visuelle Beschreibung", "Bild"):
                continue
            if isinstance(v, (str, int, float, bool)) and str(v).strip() and len(str(v)) < 200:
                lines.append(f"- {k}: {fmt_val(v)}")
        skript = f.get("Skript / visuelle Beschreibung", "")
        skript_s = fmt_val(skript) if skript else ""
        if is_incomplete(skript_s):
            incomplete += 1
            lines.append("- Skript: [UNVOLLSTÄNDIG — nur in Notion oder leer]")
            if skript_s:
                lines.append(f"  (Roh): {skript_s[:300]}")
        else:
            lines.append("- Skript:")
            for line in (skript_s.splitlines() or [skript_s]):
                lines.append(f"  {line}")
        lines.append("")
    lines += ["---", f"Unvollständig markiert: {incomplete}/{len(recs)}"]
    CLIENT_OUT.mkdir(parents=True, exist_ok=True)
    path = CLIENT_OUT / "eigene-ads.md"
    path.write_text("\n".join(lines), encoding="utf-8")
    return path, len(recs), incomplete

def write_referenz(recs):
    fields_pref = [
        "title", "page_name", "kind", "ad_archive_id", "is_active",
        "hook", "angle", "Hook-Familie", "Angle-Familie", "Skriptstruktur",
        "cta", "offer", "awareness_level", "visual_style", "target_audience",
        "industry", "funnel_type", "tags", "brand", "index_quality",
        "transcript_vorhanden", "Visuelle Beschreibung",
    ]
    lines = [
        "# Korpus: Referenz-Ads (Konkurrenz / Library)",
        f"Export: {DATE}",
        f"Base: {BASE}",
        f"Tabelle: Referenz-Ads ({REF_TABLE})",
        f"Anzahl Records: {len(recs)}",
        "Vollständig: ja (Pagination)",
        "",
    ]
    incomplete = 0
    for r in recs:
        f = r.get("fields", {})
        name = f.get("title") or f.get("page_name") or f.get("ad_archive_id") or r["id"]
        lines.append(f"## {name}")
        lines.append(f"- id: {r['id']}")
        for k in fields_pref:
            if k in f and f[k] not in (None, "", []):
                lines.append(f"- {k}: {fmt_val(f[k])}")
        skript = f.get("Skript", "")
        skript_s = fmt_val(skript) if skript else ""
        if is_incomplete(skript_s) or not skript_s.strip():
            incomplete += 1
            lines.append("- Skript: [UNVOLLSTÄNDIG — nur in Notion oder leer]")
            if skript_s:
                lines.append(f"  (Roh): {skript_s[:300]}")
        else:
            lines.append("- Skript:")
            for line in (skript_s.splitlines() or [skript_s]):
                lines.append(f"  {line}")
        lines.append("")
    lines += ["---", f"Unvollständig markiert: {incomplete}/{len(recs)}"]
    path = OUT / "referenz-ads.md"
    path.write_text("\n".join(lines), encoding="utf-8")
    return path, len(recs), incomplete

ads = fetch_all(ADS_TABLE)
refs = fetch_all(REF_TABLE)
p1, n1, i1 = write_eigene(ads)
p2, n2, i2 = write_referenz(refs)
print(f"OK {p1} records={n1} incomplete={i1}")
print(f"OK {p2} records={n2} incomplete={i2}")
if n1 < 1 or n2 < 1:
    raise SystemExit("empty export")
PY

echo "Korpus-Refresh fertig"
echo "  eigene Ads (${KUNDE}) → ${CLIENT_OUT_DIR}"
echo "  Referenz-Ads (Markt)  → ${OUT_DIR}"
