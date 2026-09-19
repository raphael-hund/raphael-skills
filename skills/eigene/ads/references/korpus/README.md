# Korpus — kanonische Zählbasis

> **Kanonische Zählbasis:** 711 Airtable-Records (Base app9VvWqeSNAOwwmV), Export 04.09.2026. 682 Records mit auswertbarem Text, 455 mit Hook-Label, 383 Statics / 328 Videos, 176 Records unvollständig (nur Notion). Ältere Zählungen in Wiki/analyse-Dateien (610 Ads / 333 Statics / 277 Videos / 682 laufende Ads) sind ältere Teilmengen desselben Korpus. `scripts-711.jsonl` ist die kanonische Maschinenform; `referenz-ads.md` ist ein generierter Markdown-Export derselben Records (keine Zweitquelle).

## Dateien

- `scripts-711.jsonl` — kanonische Maschinenform (eine Record-ID pro Zeile; Record-IDs, z. B. `rec08ptsg7qJmKnfv`, sind die Referenzwährung in den Craft-Dateien).
- `referenz-ads.md` — generierter Markdown-Export derselben Records (Export 04.09.2026). Bei Abweichung gilt die JSONL.

## Zugriff (GROSS — nie ganz lesen)

**Für Abfragen immer die JSONL nutzen, nicht die .md.** `referenz-ads.md` (15k+
Zeilen) ist ein reiner Lese-Export ohne Abschnitts-Anker — nie vollständig in den
Kontext ziehen. Vorgehen: Record per `grep` in `scripts-711.jsonl` suchen
(z. B. `grep '"rec…"' scripts-711.jsonl` oder `grep -i '<marke>' scripts-711.jsonl`),
nur den gefundenen Datensatz lesen.

## Refresh

Der Korpus ist ein eingefrorener Referenz-Stand (Export 04.09.2026). Ein Refresh erfolgt nur auf ausdrücklichen Chef-Auftrag mit autorisiertem Zugang; dafür gibt es kein mitgeliefertes Skript mehr.
