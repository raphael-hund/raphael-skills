#!/usr/bin/env python3
"""ad-library.py — echte laufende Ads aus der Meta Ad Library ziehen.

Endpunkt: GET /v26.0/ads_archive (Graph API). Fuer in der EU ausgelieferte
Anzeigen liefert `ad_type=ALL` auch normale kommerzielle Ads, nicht nur
politische. Beleg: references/api-referenz.md.

Aufruf:
  ad-library.py --land DE --suche "leadgenerierung handwerker"
  ad-library.py --land DE --page-id 123456789012345 --limit 50
  ad-library.py --land DE --suche "..." --min-laufzeit 30 --format tabelle
  ad-library.py --land CH --typ POLITICAL_AND_ISSUE_ADS --suche klimapolitik

Token: META_ACCESS_TOKEN aus der Umgebung, sonst aus /root/.secrets/api-keys.env.
Ausgabe: JSON auf stdout (oder --out datei.json), sortiert nach Laufzeit
absteigend. Laufzeit in Tagen ist der wichtigste Performance-Proxy: die API
liefert fuer kommerzielle Ads keine Spend-/Impression-Zahlen.

Exit-Codes: 0 ok · 2 Bedienfehler/Token fehlt · 3 API-Fehler.
"""
import argparse
import json
import os
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone

API_VERSION = "v26.0"
BASE = f"https://graph.facebook.com/{API_VERSION}/ads_archive"
SECRETS = "/root/.secrets/api-keys.env"

FELDER = [
    "id", "page_id", "page_name",
    "ad_creation_time", "ad_delivery_start_time", "ad_delivery_stop_time",
    "ad_creative_bodies", "ad_creative_link_titles",
    "ad_creative_link_descriptions", "ad_creative_link_captions",
    "ad_snapshot_url", "publisher_platforms", "languages",
    "eu_total_reach", "target_ages", "target_gender", "target_locations",
]
# Optionale Zusatzfelder (--felder-erweitert): Reach-Aufschluesselungen und
# Zahler/Beguenstigte. Blaehen den Default-Output auf, deshalb nicht Standard.
FELDER_ERWEITERT = [
    "age_country_gender_reach_breakdown", "beneficiary_payers",
    "total_reach_by_location",
]
# Nur politische/Issue-Ads liefern diese Felder; bei ad_type=ALL kippen sie
# die Abfrage mit HTTP 400.
FELDER_POLITISCH = [
    "bylines", "currency", "spend", "impressions",
    "estimated_audience_size", "demographic_distribution",
    "delivery_by_region",
]


def token_holen():
    tok = os.environ.get("META_ACCESS_TOKEN", "").strip()
    if tok:
        return tok
    try:
        with open(SECRETS, encoding="utf-8") as f:
            for zeile in f:
                if zeile.startswith("META_ACCESS_TOKEN="):
                    return zeile.split("=", 1)[1].strip().strip("'\"")
    except OSError as e:
        fehler_exit(
            f"META_ACCESS_TOKEN nicht in der Umgebung und {SECRETS} nicht lesbar ({e}).\n"
            "  Setzen:  export META_ACCESS_TOKEN='...'\n"
            "  Zugang beantragen: https://www.facebook.com/ads/library/api", 2)
    fehler_exit(
        f"META_ACCESS_TOKEN fehlt (weder Umgebung noch {SECRETS}).\n"
        "  Setzen:  export META_ACCESS_TOKEN='...'\n"
        "  Ein normales Ads-Manager-Token reicht evtl. nicht — der\n"
        "  Ad-Library-Zugang ist ein eigener, verifizierter Prozess:\n"
        "  https://www.facebook.com/ads/library/api", 2)


def fehler_exit(text, code):
    print(f"FEHLER: {text}", file=sys.stderr)
    sys.exit(code)


def geheim_raus(text, tok):
    """Token nie in Logs/Fehlern durchreichen."""
    return text.replace(tok, "<TOKEN>") if tok else text


def abrufen(url, tok, versuche=5):
    for versuch in range(1, versuche + 1):
        req = urllib.request.Request(url, headers={"User-Agent": "ads-research/1.0"})
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                return json.loads(r.read().decode("utf-8"))
        except urllib.error.HTTPError as e:
            roh = e.read().decode("utf-8", "replace")
            try:
                api = json.loads(roh).get("error", {})
            except ValueError:
                api = {}
            code = api.get("code")
            if code == 613 or e.code == 429:  # Rate Limit
                warte = min(2 ** versuch * 5, 120)
                print(f"Rate Limit (Code {code}) — warte {warte}s "
                      f"(Versuch {versuch}/{versuche})", file=sys.stderr)
                time.sleep(warte)
                continue
            hinweis = {
                10: "Der Token hat KEINEN Ad-Library-Zugang. Ein normales "
                    "Ads-Manager-/System-User-Token reicht nicht — die "
                    "Registrierung inkl. Identitaetspruefung laeuft ueber "
                    "https://www.facebook.com/ads/library/api",
                190: "Token ungueltig oder abgelaufen — neu erzeugen.",
                100: "Ungueltiger Parameter — pruefe Felder (politische Felder "
                     "nur mit --typ POLITICAL_AND_ISSUE_ADS).",
                1009: "Parameterpruefung fehlgeschlagen.",
                2500: "Graph-Query-Fehler — Zugang zur Ad Library freigeschaltet?",
            }.get(code, "")
            fehler_exit(geheim_raus(
                f"HTTP {e.code} · API-Code {code} · "
                f"{api.get('message', roh[:300])}"
                + (f"\n  {hinweis}" if hinweis else ""), tok), 3)
        except urllib.error.URLError as e:
            if versuch == versuche:
                fehler_exit(f"Netzwerkfehler: {e.reason}", 3)
            time.sleep(2 ** versuch)
    fehler_exit("Rate Limit blieb bestehen — spaeter erneut versuchen.", 3)


def snapshot_url_saeubern(ad):
    """access_token aus ad_snapshot_url entfernen — nie in Output/Dateien."""
    url = ad.get("ad_snapshot_url")
    if not url:
        return
    teile = urllib.parse.urlsplit(url)
    q = [(k, v) for k, v in urllib.parse.parse_qsl(teile.query)
         if k != "access_token"]
    ad["ad_snapshot_url"] = urllib.parse.urlunsplit(
        teile._replace(query=urllib.parse.urlencode(q)))


def laufzeit_tage(ad):
    start = ad.get("ad_delivery_start_time")
    if not start:
        return None
    try:
        s = datetime.fromisoformat(start.replace("Z", "+00:00"))
    except ValueError:
        return None
    stop = ad.get("ad_delivery_stop_time")
    if stop:
        try:
            e = datetime.fromisoformat(stop.replace("Z", "+00:00"))
        except ValueError:
            e = datetime.now(timezone.utc)
    else:
        e = datetime.now(timezone.utc)
    return max((e - s).days, 0)


def main():
    p = argparse.ArgumentParser(
        description="Meta Ad Library (ads_archive) abfragen und nach Laufzeit sortieren.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__.split("Aufruf:", 1)[1] if "Aufruf:" in __doc__ else None)
    p.add_argument("--land", default="DE",
                   help="ISO-Laendercode der AUSLIEFERUNG, z.B. DE, AT, FR. "
                        "Mehrere kommasepariert. CH liefert kommerziell nichts "
                        "(Standard: DE)")
    p.add_argument("--suche", help="Suchbegriff (max. 100 Zeichen, Leerzeichen = UND)")
    p.add_argument("--page-id", help="Facebook-Page-IDs, kommasepariert, max. 10")
    p.add_argument("--exakt", action="store_true",
                   help="search_type=KEYWORD_EXACT_PHRASE statt KEYWORD_UNORDERED")
    p.add_argument("--typ", default="ALL",
                   choices=["ALL", "EMPLOYMENT_ADS",
                            "FINANCIAL_PRODUCTS_AND_SERVICES_ADS", "HOUSING_ADS",
                            "POLITICAL_AND_ISSUE_ADS"])
    p.add_argument("--status", default="ACTIVE", choices=["ACTIVE", "INACTIVE", "ALL"])
    p.add_argument("--medium", default="ALL",
                   choices=["ALL", "IMAGE", "MEME", "VIDEO", "NONE"])
    p.add_argument("--sprache", help="ISO-639-1, z.B. de")
    p.add_argument("--start-ab", help="ad_delivery_date_min, YYYY-MM-DD")
    p.add_argument("--start-bis", help="ad_delivery_date_max, YYYY-MM-DD")
    p.add_argument("--limit", type=int, default=100,
                   help="Maximale Anzahl Ads insgesamt (Standard 100)")
    p.add_argument("--seite-groesse", type=int, default=50, help="Ads pro API-Aufruf")
    p.add_argument("--min-laufzeit", type=int, default=0,
                   help="Nur Ads, die mindestens N Tage laufen/liefen")
    p.add_argument("--felder-erweitert", action="store_true",
                   help="Zusatzfelder abfragen (Reach-Breakdowns, beneficiary_payers)")
    p.add_argument("--format", default="json", choices=["json", "tabelle"])
    p.add_argument("--out", help="Zieldatei statt stdout")
    a = p.parse_args()

    if not a.suche and not a.page_id:
        fehler_exit("Entweder --suche oder --page-id angeben.", 2)
    if a.suche and len(a.suche) > 100:
        fehler_exit("--suche darf hoechstens 100 Zeichen haben (API-Limit).", 2)
    seiten = [s.strip() for s in (a.page_id or "").split(",") if s.strip()]
    if len(seiten) > 10:
        fehler_exit("--page-id: hoechstens 10 Page-IDs pro Abfrage (API-Limit).", 2)

    tok = token_holen()
    laender = [c.strip().upper() for c in a.land.split(",") if c.strip()]
    if a.typ == "ALL" and laender == ["CH"]:
        print("HINWEIS: Kommerzielle CH-only-Ads liefert die API nicht. Fuer die "
              "Schweiz entweder --typ POLITICAL_AND_ISSUE_ADS oder DE mitgeben.",
              file=sys.stderr)

    felder = list(FELDER)
    if a.felder_erweitert:
        felder += FELDER_ERWEITERT
    if a.typ == "POLITICAL_AND_ISSUE_ADS":
        felder += FELDER_POLITISCH

    params = {
        "access_token": tok,
        "ad_reached_countries": json.dumps(laender),
        "ad_type": a.typ,
        "ad_active_status": a.status,
        "media_type": a.medium,
        "fields": ",".join(felder),
        "limit": str(min(a.seite_groesse, a.limit)),
    }
    if a.suche:
        params["search_terms"] = a.suche
        params["search_type"] = "KEYWORD_EXACT_PHRASE" if a.exakt else "KEYWORD_UNORDERED"
    if seiten:
        params["search_page_ids"] = json.dumps(seiten)
    if a.sprache:
        params["languages"] = json.dumps([a.sprache])
    if a.start_ab:
        params["ad_delivery_date_min"] = a.start_ab
    if a.start_bis:
        params["ad_delivery_date_max"] = a.start_bis

    url = BASE + "?" + urllib.parse.urlencode(params)
    ads = []
    while url and len(ads) < a.limit:
        antwort = abrufen(url, tok)
        ads.extend(antwort.get("data", []))
        url = antwort.get("paging", {}).get("next")
        if url:
            time.sleep(1)  # freiwillig hoeflich, Rate Limits sind undokumentiert
    ads = ads[:a.limit]

    for ad in ads:
        snapshot_url_saeubern(ad)
        ad["laufzeit_tage"] = laufzeit_tage(ad)
        ad["laeuft_noch"] = not ad.get("ad_delivery_stop_time")
    if a.min_laufzeit:
        ads = [x for x in ads if (x["laufzeit_tage"] or 0) >= a.min_laufzeit]
    ads.sort(key=lambda x: x["laufzeit_tage"] or -1, reverse=True)

    if a.format == "tabelle":
        zeilen = [f"{'Tage':>5}  {'Seite':<28}  Hook"]
        for ad in ads:
            body = (ad.get("ad_creative_bodies") or [""])[0].replace("\n", " ")
            zeilen.append(f"{str(ad['laufzeit_tage'] or '?'):>5}  "
                          f"{(ad.get('page_name') or '?')[:28]:<28}  {body[:80]}")
        ausgabe = "\n".join(zeilen)
    else:
        ausgabe = json.dumps({
            "abgefragt_am": datetime.now(timezone.utc).isoformat(),
            "parameter": {k: v for k, v in params.items() if k != "access_token"},
            "anzahl": len(ads),
            "ads": ads,
        }, ensure_ascii=False, indent=2)

    if a.out:
        with open(a.out, "w", encoding="utf-8") as f:
            f.write(ausgabe + "\n")
        print(f"{len(ads)} Ads → {a.out}", file=sys.stderr)
    else:
        print(ausgabe)


if __name__ == "__main__":
    main()
