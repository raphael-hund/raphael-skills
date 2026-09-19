---
title: "Anzeigen werden erst bis zum Verkauf bewertet"
type: sop
confidence: medium
status: approved
created: 2026-07-20
tags: [anzeigen, messung, termine, verkauf]
---

# Anzeigen werden erst bis zum Verkauf bewertet

## TLDR

Bewerte eine Anzeige erst, wenn du ihren Weg bis zum Verkauf verfolgen kannst.

## Regeln

- Verbinde Werbeeinsatz, Kontakt, beobachtbare Qualifizierung, Buchung, Teilnahme und Verkauf in derselben Messkette (tracking).
- Beurteile Kosten pro Kontakt immer zusammen mit Kosten pro passendem Termin und Kosten pro Verkauf.
- Definiere „passend“ vor der Messung als beobachtbare Auswahlregel.
- Zeige fehlende Zuordnung als Datenlücke und rechne sie nicht als null Erfolg.
- Interne Schutzregel: Sende nur freigegebene und notwendige Ereignisse an eine Werbeplattform.

## Taktiken

- Vergib beim ersten Kontakt eine technische Herkunftskennung ohne Kundennamen.
- Schreibe Qualifizierung, Terminstatus und Verkauf an diese Kennung zurück.
- Berechne für dasselbe Zeitfenster Kosten pro Kontakt, Teilnahmequote (show rate), Abschlussquote und Kosten pro Gewinn.
- Setze eine Mindest-Zuordnungsquote, unter der keine Anzeigenentscheidung entsteht.
- Prüfe die Kette regelmäßig mit einem bekannten Testfall vom Kontakt bis zum Abschluss.

## Beispiele

- Anzeige A kostet 20 Euro pro Kontakt, aber 200 Euro pro teilnehmendem Wunschkunden. Anzeige B kostet 40 Euro pro Kontakt und 120 Euro pro teilnehmendem Wunschkunden.

## Gilt nicht wenn

- Werbe-, Termin- und Verkaufsdaten unterschiedliche Zeiträume oder Angebotsfassungen beschreiben.
- Die Herkunftskennung fehlt oder nachträglich geraten wurde.
- Datenschutz, Einwilligung oder Plattformregeln die Rückmeldung eines Ereignisses ausschließen.
- Die Messketten-Seite fordert, eine Anzeige erst am Verkauf zu bewerten; die Waise zeigt die konkrete Luecke, dass der bekannte Verkauf nie an Meta zurueckgemeldet wird, und ist damit der Praxisfall zur Regel — (Konto-Auswertung 07/2026; CAPI-Randnotiz in `../eigene-regeln.md`)

## Gegenargumente

- Eine längere Messkette erhöht technische Fehlerquellen und kann Ergebnisse verzögert sichtbar machen.
- Verkäufe hängen auch von Verkaufsgespräch, Preis und Lieferfähigkeit ab, nicht nur von der Anzeige.

## Datenlücken

- Der aktuelle lokale Anzeigenbezug deckt nur 12,9 Prozent der Verkaufsvorgänge ab.
- Qualifizierungsquote und Deckungsbeitrag (contribution margin) fehlen im vorhandenen Schnappschuss.
- Die Zuordnungsquote je einzelner Anzeige fehlt; die globale Quote darf keine Anzeigenentscheidung freigeben.

## Quelle

- `raw/evidence/2026-07-20-x-marketing-systems/ASSESSMENT.md:30-36`
- `raw/evidence/2026-07-20-x-marketing-systems/ASSESSMENT.md:87-90`
- `raw/evidence/2026-07-20-x-marketing-systems/x/brillaas-explicit.jsonl:2`
