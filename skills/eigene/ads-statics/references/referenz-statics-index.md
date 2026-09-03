# Referenz-Statics — kuratierter Lern-Index

Echte, laufende und Long-Runner-Statics, kategorisiert nach Angle (A01–A08).
Zweck: Der Skill liest hier, **wie** Gewinner-Copy aussieht, bevor er schreibt.
Nicht aus dem Gedächtnis schreiben.

## Pflicht vor jedem Brief

1. Angle wählen (A01–A08 in `copy-formeln.md`).
2. **Die Angle-Datei in `angles/` komplett lesen** (siehe Tabelle unten). Dort stehen
   die Shortcuts des Angles und 4–8 Referenzen mit wörtlichem Onscreen-Text.
3. Beim Schreiben notieren, von welcher Referenz die Copy-Bauform kommt
   (steht im Brief unter «Grounding-Quelle»).
4. Zusätzlich echte Statics zum Segment ziehen:
   `python3 /root/raphael-skills/skills/eigene/ads/scripts/load-referenzen.py --kind static --suche "<segment-wort>"`
   (Volltext-Pool aus Notion, 461 Statics mit Copy + Layout. Offline-Absicherung:
   lokaler Dump unter `/root/clients/make/ads/research/referenz-pool-dump/` — die Dateien
   `*-2026-08-30-kategorisiert.json` tragen `angle_tax` (A01–A08), `hook_tax` (F01–F12),
   `awareness` und `qualitaet` je Record.)

## Angle → Datei

| Angle | Datei | Kernmuster |
|---|---|---|
| A01 Social Proof | `angles/a01-social-proof.md` | Name zuerst, Zahl mit Zeitraum, Gegenstand als Beweis |
| A02 Problem | `angles/a02-problem.md` | Zwei Sätze im Widerspruch, Beleg, Ausweg |
| A03 Outcome | `angles/a03-outcome.md` | Ergebnis + Frist + Wer; drei Kleider: Claim / Callout / Ergebnis-Form |
| A04 Verlust | `angles/a04-verlust.md` | Unsichtbare Verlust-Kette, dann Ausweg im selben Bild |
| A05 Vergleich | `angles/a05-vergleich.md` | Zwei Zahlen, ein Sprung, gleicher Massstab |
| A06 Mechanismus | `angles/a06-mechanismus.md` | Benanntes System in einem Satz, Stack zählbar |
| A07 Garantie | `angles/a07-garantie.md` | Outcome + Frist + Null in einem Atemzug |
| A08 Contrarian | `angles/a08-contrarian.md` | Marktglaube kippen, Verbot + Ersatz |

## Die zehn Shortcuts über alle Gewinner

1. **Zahl trägt drei Attribute:** Betrag + Zeitraum + Name. Nie Adjektive.
2. **Name oder Firma zuerst** bei Proof. «Das ist Felix» schlägt «Wir haben einem Kunden…».
3. **Ein Gegenstand als Beweis:** Chat, Screen, Teamfoto, SERP. Die Ad zeigt, sie argumentiert nicht.
4. **Ein ganzer Satz schlägt drei Fetzen.** Jede Onscreen-Zeile hat Subjekt und Verb.
5. **Der Callout filtert mit Schwelle:** «Für Betriebe mit 100'000–250'000 im Monat» zieht bessere
   Termine als «Für Selbstständige». Er steht klein als Eyebrow ÜBER der Hook — die Hook selbst
   bleibt frei von Quali (BEST-NEU: CPL 178 gegen Winner 50). Wer nicht gemeint ist, scrollt weiter.
6. **Garantie in einem Atemzug:** Outcome + «sonst zahlst du nichts» in denselben Satz.
7. **Native Rahmen gewinnen cold:** X-Post, Chat, Notes sehen aus wie Content.
   Die polierte Canva-Mitte verliert.
8. **Hook zuerst, Deal direkt danach.** Bei Instant-Formular gibt es keine Landingpage:
   wer den Deal nicht auf der Ad sieht, weiss nicht, wofür «Jetzt bewerben» gilt.
9. **Ein Angle pro Karte.** Proof + Garantie + Vergleich auf einer Static = keine davon.
10. **Der 1-Sekunden-Test gilt für Fremde.** Wer die Ad nicht ohne Nachdenken versteht,
    scrollt. Internes Wissen (Listen, CRM, «13 von 87») fällt immer durch.

## Zac Regan / startrunningads (aus Raphaels Bookmarks + Profil)

258 Reels analysiert (27 Bookmarks + Top-Plays + letzte 45 Tage), 19.08.2026.
Destillat: `zac-regan-playbook.md` (Hook-Häufigkeiten, Strukturen, Gold-Quotes).
Vier Schritte jede Ad: Avatar ansprechen → Problem → Lösung → CTA. Hook-Formeln Z1–Z9
in `copy-formeln.md`. 80 % der Top-50-Ads sind Proof (Hormozi-Zählung in seinem Reel).
Kein Zac-Talking-Head als Static-Layout klauen — nur die Sätze.

## Marc Evers (38 Kanal-Videos, 19.08.2026)

Destillat: `ads/references/marc-evers-playbook.md`. Für Statics zählt vor allem:
Ergebnis verkaufen statt Website (Preis-Ads ziehen Bottom-Funnel-Vergleicher),
Static-Spearhead zur Validierung (5 Varianten, 30–50 €/Tag, schwarzer Screen nur
mit Claim oder gespeicherte Story), null Interpretationsspielraum auf Ad + Formular,
Ugly/native schlägt Studio.

## Matt Shiver — zwei Static-Stile (Frames gelesen)

### Foto plus Copy (C01 + F10)
Onscreen, wörtlich: «I'm looking for 5 online coaches who want to scale to $100k/mo in
2026 with paid ads. We'll script, edit, and launch your ads in 14 days. And if they
don't work… you don't pay!»

### Twitter-Screenshot (F12 + C01)
«Unpopular opinion: Facebook ads are easier than posting organic content.» Dann Rechnung,
Proof 8.150 Coaches, Callout 10–50k/mo, CTA.
Test-System: 5 Statics / 1 Ad-Set / 1 Pain je Karte. Gewinner wird Video.

## Nicht-Vorlagen (Tabu)

- Video-Formate (SEOLabs KI-Check, Zac-Talking-Head) nicht als Static-Layout kopieren.
  Nur den Gedanken. (Raphael, 18.08.: Statics mit Statics vergleichen.)
- US-Coaching-Kaskaden («$5/hour to $30M») nicht auf Deutschschweizer Inhaber. Unseriös.
- Meme-Statics (Drake) nur als bewusster Kontrast-Test — für MAKE zu locker als Standard.
- Namen-Listen ohne Ergebnis (Speaker-Stacks, Festival-Acts): Namen ohne Zahl sind Dekor.
- OCR-Bruch als Onscreen («Do Not Disturb On»-Kacheln): wenn der Text nicht lesbar ist,
  ist die Referenz wertlos.

## Wettbewerber CH/DE (28.08.2026)

### Grigoletti CH — `wettbewerber/grigoletti-ch.md`
Der einzige direkte Wettbewerber im Segment «Website als Produkt»: 7 Creative-Gruppen,
alle Video, kein Social Proof, keine Garantie, keine Static — A01, A07 und S1 sind gegen
ihn unbesetzt.
Kontrast-Referenz, keine Copy-Vorlage: seine alte Variante A trägt das am 28.08. verworfene
«hübsch aber funktioniert nicht»-Framing; seine aktive Variante B (Wahrnehmung/Vertrauen)
bestätigt die MAKE-Linie.

### Mario Reinwarth DE — `wettbewerber/mario-de.md`
56 erfasste Ads in 36 Gruppen, ~65 % S1-Textkarten, A07-Risikoumkehr als Dauer-Angle;
Long-Runner: G7-Video (~5 Monate), G4-Testimonial (~4 Monate), G1-Textkarte (~4 Monate).
Aktive «Werbekonto-Report»-Leadmagnet-Welle seit 24.08.2026 (Konto-Tabelle, Anzeigen-Check)
liegt direkt neben dem MAKE-Website-Check — dieselbe Mechanik, anderes Produkt.
Warnung: US-frei, aber Coaching-/Berater-Zielgruppe. Auf MAKE-Handwerker-ICP nur die
Bauformen übertragen, nie die Sprache.
