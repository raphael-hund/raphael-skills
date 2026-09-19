---
title: "Meta-Ads-Erfolg wird nach Spend-Verteilung und ROAS bewertet, nie nach Hook-Rate allein"
type: swipe
confidence: medium
status: approved
created: 2026-07-20
expires_at: 2026-10-20
tags: [ads, metriken, kpi, reporting, hook-rate, roas, meta]
---
> **Fremd-Quelle / Einordnung (18.09.2026):** Diese Datei ist `type: swipe` aus dem US-E-Commerce-/Coaching-Kontext. **Kanonisch gilt: Terminpreis und Abschlussquote führen jede Bewertung; ROAS ist keine Zielgrösse** (Veto 67, `../eigene-regeln.md`, `../teil-strategie.md` Mess-Grundsätze). „ROAS ist finaler Richter" (unten, Z. Regeln/Taktiken/Beispiele) ist damit für unsere Leadgen-Accounts **nicht** die Entscheidungsregel — ROAS/Cost-per-Result dient höchstens als Diagnose bei Reife und Masse. CTR/Hook-Rate-Werte sind Fremdwerte (yt/x-Posts); eigene Hook-Schwelle 25 % siehe `../eigene-regeln.md`. Übernommen wird nur: Metrik-Diagnose-Reihenfolge, Funnel-Check vor Creative-Kritik, Lernbudget-Phasen.

# Meta-Ads-Erfolg wird nach Spend-Verteilung und ROAS bewertet, nie nach Hook-Rate allein

## TLDR

Eine Anzeige zählt nur nach Umsatz und wohin Meta Geld schickt — nicht nach Klicks oder Anschau-Rate.

## Regeln

- Metrik-Hierarchie in absteigender Aussagekraft, massgeblich für die Audit-Bewertung eines Meta-Kontos: (1) Spend-Verteilung — Meta gibt der besten Ad automatisch mehr Budget, weil der Algorithmus Multi-Touch/Sequencing optimiert statt Last-Click; (2) ROAS/CPA auf 7-Tage-Klick; (3) CPC/CTR als Frühindikator; (4) Hook-/Hold-Rate — reines Diagnosewerkzeug, kein Erfolgsmaß (yt:vUbLw80KTpo).
- Hook-Rate = 3-Sekunden-View-Rate ÷ Impressionen, als Custom Column im Ads Manager trackbar (Columns → Customize Columns). Hohe Hook-Rate (40-50%) korreliert mit mehr Meta-Spend-Zuteilung, ist aber Ursache für Reichweite, nicht Beweis für Umsatz (yt:1yvRpok0GZM).
- ROAS ist finaler Richter: eine Ad mit schlechter CTR/CPM/Hook-Rate, aber positivem ROAS, wird nicht abgeschaltet (x:georgeclem).
- Konkrete Benchmarks für Column-Presets: CTR Video 1,5-2%+, Static 3-4%+, Hook Rate >20%, Frequency <1,5 bei Cold Traffic (x:georgeclem).
- Vor jeder Diagnose "Anzeige ist schlecht" den Funnel einzeln prüfen: Klicks → Targeting → Termin-Erscheinen → Abschlussquote. Erst wenn die richtigen Leute ankommen aber nicht abschliessen, liegt kein Werbe-, sondern ein Vertriebsproblem vor (yt:t5exP_41x-U).
- Werbebudget-Aufbau läuft in drei Phasen: Tracking (sauber erfassen) → Verlieren (bewusstes Lernbudget) → Drucken (Skalieren des Gewinners). Frühes Abbrechen bei ersten Verlusten verhindert Phase 3 (yt:t5exP_41x-U).
- Rote Linie: Fremde Copy/Benchmarks nur strukturell übernehmen, nie als exakte Zielwerte für jeden Kunden kopieren — Benchmarks stammen aus fremden Branchen/Budgetgrössen.

## Taktiken

- Hook-Rate als Custom Column für jeden Referenzkonto-Kundenaccount einrichten: Ads Manager → Columns → Customize Columns → 3-Sek-Video-Views ÷ Impressions als Formel-Spalte. Objektives Frühwarnsystem, bevor Lead-Zahlen aussagekräftig sind.
- Reporting-Reihenfolge bei jedem Referenzkonto-Kunden-Check (ROAS und Spend-Verteilung statt Hook-Rate allein): zuerst Spend-Verteilung über die letzten 7 Tage ansehen (wohin schiebt Meta Budget), dann ROAS/Cost-per-Result, dann CTR/CPC, Hook-Rate zuletzt nur zur Erklärung ("warum performt Ad X schlecht trotz gutem Angebot").
- Laufende Ad mit erfüllter ROAS/Cost-per-Result-Zielgrösse nicht wegen niedriger CTR oder Hook-Rate abschalten — diese Zahlen dienen nur der Diagnose, warum eine Ad besser oder schlechter performt, nicht ob sie live bleibt.
- Bei Leadgen-Kunden (Küchenstudio, Immobilienverwaltung, Architektur, Solar) den Vertriebs-Funnel-Check vor jeder Creative-Änderung durchgehen: Kommen genug Klicks? Stimmt Targeting? Erscheinen Leute zum Termin? Erst danach die Anzeige selbst infrage stellen.
- Lernbudget explizit mit dem Kunden vereinbaren (z. B. "erste 4-6 Wochen sind Testphase mit definiertem Verlustbudget"), um vorzeitigen Kampagnenabbruch bei ersten schwachen Wochen zu verhindern — passt zum ehrlichen, seriösen Referenzkonto-Ton beim gehobenen ICP.
- Column-Preset mit Benchmarks (CTR Video 1,5-2%+, Static 3-4%+, Hook Rate >20%, Frequency <1,5) als festen Bestandteil ins r-ads-Reporting übernehmen, damit Testwellen über mehrere Kundenaccounts konsistent bewertet werden statt nach Bauchgefühl (belegte Referenzkonto-Performance-Werte zu Metriken siehe `../eigene-regeln.md`).

## Beispiele

- "The ads that have the best hook rate typically get the most amount of spent... this top ad has a 42, almost 43% hook rate... this has led to 1,717 [...] DM conversations with an average cost per message of $2.50." (yt:1yvRpok0GZM)
- "amount spent becomes the best proxy for performance when looking at creative... this is actually a great top-of-funnel asset that likely has a low frequency that's cutting through on new audiences." (yt:vUbLw80KTpo)
- "If an ad has a terrible CTR, a terrible CPM, and a terrible hook rate, but it's producing a positive ROAS, you do not turn it off. [...] ROAS itself is the final judge." (x:georgeclem)
- "Wenn man die richtigen Leute ans Telefon bekommt, hat man kein Werbeproblem, sondern ein Vertriebsproblem." — Fallstudie: Unternehmen gab 150.000 Dollar für Ads aus und brach ab, obwohl das eigentliche Problem der Abschluss (Vertrieb) war (yt:t5exP_41x-U).
- "Man muss sich also daran gewöhnen, viel zu verlieren, um groß zu gewinnen." — Phasenmodell Tracking → Verlieren → Drucken (yt:t5exP_41x-U).

## Gilt nicht wenn

- Der Account noch keine Spend-Historie hat (Cold Start) — dort ist Spend-Verteilung noch kein verlässliches Signal, erst nach ausreichend Impressionen/Budget pro Ad aussagekräftig.
- Es um reine Diagnose eines neuen Creatives geht, nicht um die Abschalt-Entscheidung — dort ist Hook-Rate sehr wohl das richtige erste Werkzeug, um zu verstehen, warum eine Ad nicht performt.
- Kleine Referenzkonto-Tagesbudgets (20-50 CHF) vorliegen — die absoluten Benchmark-Zahlen (Hit-Rate, Testvolumen) stammen aus grösseren US-Accounts und sind nicht 1:1 übertragbar, das Prinzip (Metrik-Reihenfolge, ROAS als Richter) bleibt aber gültig.
- Die Waise legt die Taktung des KPI-Trackings fest (taeglich loggen, woechentlich und monatlich auswerten) und ergaenzt damit die Metrik-Hierarchie um ihren Betriebsrhythmus — (Konto-Auswertung 07/2026)
- Die Waise benennt genau die Kennzahlen, die taeglich erfasst werden (Leads, Setting- und Closing-Calls, Closes, Deal-Volumen), und macht die Metrik-Hierarchie damit operativ — (Konto-Auswertung 07/2026)

## Datenlücken

- Keine eigenen Referenzkonto-Performance-Daten zur Prüfung dieser Hierarchie an Schweizer B2B-Leadgen-Accounts — Quellen stammen aus US-Coaching/E-Commerce-Kontexten mit teils deutlich höheren Budgets.
- Benchmark-Zahlen (CTR, Hook Rate, Frequency) sind Faustregeln einzelner Praktiker (georgeclem), nicht branchenübergreifend validiert.

## Quelle

- raw/evidence/2026-07-20-ads-wissenspaket/youtube/1yvRpok0GZM/transcript.txt:1-776 — "How to Create Irresistible Facebook Ad Hooks (that actually get clients)", Dr. Matt Shiver, 2026-06-23
- raw/evidence/2026-07-20-ads-wissenspaket/youtube/vUbLw80KTpo/transcript.txt:2809 (Metrik-Hierarchie-Abschnitt) — "Meta Ads Creative Strategy in 2026: The Full System", Blue Sense Digital, 2026-05-11
- raw/evidence/2026-07-20-ads-wissenspaket/youtube/t5exP_41x-U/transcript.txt — "$100M Leads - Paid Ads Playbook Pt II (Alex Hormozi)", Kanal Илья Журавлев, 2023-09-10
- raw/evidence/2026-07-20-ads-wissenspaket/x/georgeclem-*.md — X-Artikel George Clements (@georgeclem), Mai-Juli 2026
