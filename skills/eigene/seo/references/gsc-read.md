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

## Tiers (Tiefe, nicht hier kopieren)

Brain: `/root/raphael-brain/wiki/craft/seo/seo-google.md` (Tier 0–3, Quotas).
GSC-Daten haben 2–3 Tage Lag. Quick-Win-Fenster: Position 4–10, hohe Impressions.
