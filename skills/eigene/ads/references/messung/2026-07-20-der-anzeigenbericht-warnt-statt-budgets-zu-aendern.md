---
title: "Der Anzeigenbericht warnt statt Budgets zu ändern"
type: sop
confidence: high
status: approved
created: 2026-07-20
tags: [anzeigen, bericht, entscheidung, datenschutz]
---

# Der Anzeigenbericht warnt statt Budgets zu ändern

## TLDR

Der Bericht zeigt Kosten, Termine und Verkäufe, warnt bei fehlenden Zahlen und ändert kein Werbegeld.

## Regeln

- Lies nur lokale Schnappschüsse und verändere keine Kampagne.
- Verbinde Kosten, Kontakte, Termine, Teilnahme und Verkäufe über technische Kennungen.
- Kennzeichne Währung und Zeitzone und addiere verschiedene Währungen niemals.
- Gib keine Kunden-, Firmen-, Anzeigen- oder Kontonamen aus.
- Zeige fehlende Zuordnung, Ziele, Qualifizierung und Deckungsbeitrag (contribution margin) als Warnungen.
- Sperre jede Anzeigenentscheidung, solange ihre eigene Zuordnungsquote unbekannt ist.
- Verlange menschliche Freigabe vor jedem Ausweiten (scaling).

## Taktiken

- Führe `scripts/growth-report.py --self-test` vor einem Betriebslauf aus.
- Übergib nur die namenfreie `meta-ads-summary.json` mit `--meta` und die namenfreie `attribution-summary.json` mit `--attribution`.
- Lege mit `--min-attribution` die kleinste erlaubte Zuordnungsquote fest.
- Filtere mit `--currency` und `--timezone`, wenn ein Geldziel oder exakter Zeitvergleich verwendet wird.
- Übergib eigene Zielwerte nur, wenn sie aus Deckungsbeitrag und Kapazität abgeleitet sind.
- Nutze einen ausdrücklich gewählten Vergleichsschnappschuss für Veränderungen.
- Lies zuerst die Warnungen und danach einzelne Anzeigenkennungen.

## Beispiele

- Der Lauf vom 20. Juli 2026 fand 35 CHF-Anzeigen in zwei Zeitzonen. Weil ihre eigene Zuordnungsquote fehlt, blieben alle `NOT_DECIDABLE`.

## Gilt nicht wenn

- Eingabedateien unterschiedliche Zeiträume, Währungen oder Angebotsfassungen abdecken.
- Zielwerte fehlen oder der Anzeigenbezug geraten wurde.
- Der Bericht als automatische Budgetsteuerung eingesetzt werden soll.

## Gegenargumente

- Ein fester Entscheidungsbaum kann ein falsch gesetztes Geschäftsziel sehr konsequent verfolgen.
- Technische Anzeigenkennungen erschweren menschliches Lesen, schützen aber Namen im gemeinsamen Bericht.

## Datenlücken

- Qualifizierungsquote und Deckungsbeitrag fehlen in den aktuellen Schnappschüssen.
- Ein zweiter vergleichbarer Schnappschuss für drei bis sieben Tage fehlt.
- Die Zuordnungsquote liegt nur für alle Vorgänge gemeinsam vor, nicht für jede Anzeige.

## Quelle

- `raw/evidence/2026-07-20-x-marketing-systems/REPORT-SPEC.md:18-67`
- `scripts/growth-report.py:89-234`
- `scripts/growth-report.py:292-461`
- `evals/outcome/2026-07-20-growth-report/growth-report.json:1-64`
