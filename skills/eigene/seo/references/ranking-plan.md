# Ranking-Plan — Pflichtfelder

Ein Ranking-Plan gilt nur für eine **benannte Property**. Er ist kein Loop-4-Ersatz.
Loop-4 bleibt der Produktionsweg. Dieser Plan ist das getrennte Ausgabeformat.

Skript (deterministisch, Fixture oder echte Exporte):
`python3 scripts/ranking_plan.py --property <name> --serp <datei> --gsc <datei>`

`--gsc` akzeptiert den First-Class-Export von `scripts/gsc_read.py --export`
(Schema `seo-gsc-read/1`, `snapshots[].top_queries`) und Listen/`queries`.

## Pflichtsektionen (leer = Fail)

1. **Keyword-Ziele** — aus GSC/SERP, jede Zeile mit Beleg-Zeiger.
2. **Google-Aktionen** — klassische Suche, getrennt von KI.
3. **KI-Engine-Aktionen** — je eine nicht-leere Aktion für:
   Google AI Overviews, Google AI Mode, ChatGPT, Perplexity, Bing Copilot.
4. **Beleg-Zeiger** — `quelle + datum + datei`, keine erfundenen Zahlen.
5. **30-Tage-Schritte** — Technik, Quick Wins (GSC Pos. 4–10), interne Links.
6. **90-Tage-Schritte** — Cluster, Zitationen, Refresh, Authority.

Optional `--grayhat`: nur mit Raphaels ausdrücklichem Go. Jede Zeile braucht
ein Risiko-Label aus `graustufen.md`. Ohne Flag bleibt dieser Block weg.

## Klassifikation der GSC-Zeilen (Code, nicht Bauch)

| Klasse | Bedingung | Default-Aktion |
|---|---|---|
| quick_win | Position 4–10 und Impressions ≥ 100 | Title/H1/interne Links, keine neue URL |
| content_gap | Feld `page`/`url` ist **vorhanden und leer**, Impressions ≥ 50 | Neue Seite nur bei echtem SERP-Intent. Fehlt das Feld (typischer GSC-Query-Export), gilt das nicht als Lücke. |
| refresh | Position > 10 und Impressions ≥ 200 | Bestehende URL updaten |
| money | höchste Klicks | 4–11 kontextuelle Links darauf |

Schwellen sind Heuristik im Skript, keine Kunden-KPI.

## Quellen für die Default-Aktionen

Mechaniken und Daten liegen nicht hier. Siehe:
`quellen-2026-08.md`, `taktiken-interne-verlinkung-cluster.md`,
`ideen-ai-sichtbarkeit-aeo.md`, Brain `seo-google.md` / `seo-plan.md` / `seo-geo.md`.
