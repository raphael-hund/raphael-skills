# GSC-Read — First-Class, nur Lesen

Write-Scope ist verboten: keine Indexing-API-Publishes, keine Sitemap-Mutationen,
kein Disavow-Upload, kein Property-Delete.

## Entry (Skill-Skript)

```bash
python3 scripts/gsc_read.py --live --export /pfad/gsc-export.json
```

Das Skript ruft den bestehenden Read-Job auf:
`/root/raphael-command-center/ops/bin/gsc-snapshot.py`
(OAuth aus `/root/.env`: `GOOGLE_OAUTH_CLIENT_ID`, `GOOGLE_OAUTH_CLIENT_SECRET`,
`GOOGLE_OAUTH_REFRESH_TOKEN`). Property-URLs nicht nach stdout.

`--from-snapshots <dir>` liest schon geschriebene Snapshot-JSONs
(Query-/Page-Zeilen mit Impressions/Klicks/CTR/Position).

`--dry-run` am Upstream-Job: API lesen, nichts schreiben.

## Erfolg

Export enthält echte `query`- oder `page`-Zeilen plus Metriken.
Leerer Body bei HTTP-200/„ok“ ist ein Fehler, kein Fallback.

## Setup-Fallback (nur wenn Auth fehlt oder bricht)

1. GCP-Projekt, Search Console API an, OAuth Desktop-Client.
2. Die drei `GOOGLE_OAUTH_*`-Werte nach `/root/.env`.
3. Service-Account-Mail unter GSC → Einstellungen → Nutzer (eingeschränkt reicht).
4. Danach denselben `--live`-Befehl.

Kein Fake-Snapshot. Keine erfundenen Queries.

## Generative AI Reports (seit 03.06.2026, weltweit seit 31.08.2026)

GSC zeigt seit Juni 2026 dedizierte „Search Generative AI"-Reports
(Impressionen aus AI Overviews, AI Mode, GenAI in Discover). **Nur
Impressionen — keine Klicks, keine CTR, keine Queries; UI-only** (weder
Search Analytics API noch BigQuery; verifiziert 11.08.2026. Quellen:
mariehaynes.com 03.06.2026; SEJ 31.08.2026).

Konsequenz für dieses Skript: GenAI-Daten kommen **nicht** über die API —
der `--live`-Export bleibt die klassische Query-/Page-Ebene. GenAI-Report
manuell im UI lesen und als Trend-Zeile (Datum, Impressionen, Seiten-Top-5)
im Report ergänzen. Konversationelle AI-Queries lassen sich indirekt über
Regex-/ML-Klassifikatoren auf dem normalen Query-Export schätzen — Details
und Caveats in `taktiken-gsc-workflows.md` §7. GenAI-Impressionen sind eine
Trend-Anzeige, kein Traffic-Beleg (3-Säulen-Regel, `taktiken-ai-suche-geo.md` §7).

## Tiers

Felddaten-Werkzeuge (GSC, CrUX/PageSpeed, Indexing, GA4) und ihre Tiers stehen in
`se-ranking-mcp.md` und `taktiken-gsc-workflows.md`.
GSC-Daten haben 2–3 Tage Lag. Quick-Win-Fenster: Position 4–10, hohe Impressions.
