---
kunde: make
datum: 2026-08-13
segment: local-service-handwerk
skill: ads-research
version: 1.0.0
ad_library: skipped
ad_library_grund: code-10
---

# Angle-Dossier MAKE 2026-08-13

## Markt-Segment
slug: local-service-handwerk
status: candidate
pfad: /root/raphael-brain/wiki/_candidates/maerkte/local-service-handwerk.md

## Zielgruppen-Segmente
### Z1 Gewachsener Handwerker
rolle: Inhaber in der Deutschschweiz
situation: Team und Projekte laufen, digitale Anfragen nicht
trigger: eine konkrete Lücke wird sichtbar
quelle: wiki/company/icp/icp-gesamtdossier.md:67 | 2026-07-24
zitat: "Der gewachsene Handwerker (Ruben-Typ): lokal verwurzelt, ehrlich-ordentlich, schrittweise, privat stolz, öffentlich zurückhaltend."

### Z2 Skalierender Dienstleister
rolle: Inhaber, rechnerisch, schon von Agenturen verbrannt
situation: will Beweis, bevor er abgibt
trigger: nächste Wachstumsstufe ohne eigene Baustelle
quelle: wiki/company/icp/icp-gesamtdossier.md:68 | 2026-07-24
zitat: "Der skalierende Dienstleister (Thomas-Typ): rechnerisch, dominanzorientiert, von Agenturen verbrannt, testet zuerst selbst und skaliert erst nach eigenem Beweis."

## Pains
### P1 Tafel-Montag
pain: Montag früh stehen Leute bereit und der nächste Auftrag fehlt.
quelle: wiki/company/icp/icp-gesamtdossier.md:46 | 2026-07-24
zitat: "Alltagssituation: Montag um 05:45 Uhr zeigt die Werkstatttafel zwei Mitarbeiter ohne Baustelle."
confidence: niedrig

### P2 Realitätslücke
pain: Der Betrieb wirkt online kleiner als auf der Baustelle.
quelle: wiki/company/icp/icp-situationen-und-schmerz.md:19 | 2026-07-21
zitat: "Realitätslücke: Betrieb besser als digitaler Eindruck."
confidence: niedrig

### P3 Stiller Verlust
pain: Ein Empfehlungs-Kunde öffnet die Seite und geht ohne Nachricht.
quelle: wiki/company/icp/icp-situationen-und-schmerz.md:34 | 2026-07-21
zitat: "Der grösste blinde Fleck: ein Empfehlungs-Interessent öffnet die Website, bekommt Zweifel und wechselt kommentarlos zum Mitbewerber."
confidence: niedrig

## Angles
### A1 Tafel-Montag
familie: Problem
versprechen: Die leere Tafel ist der Grund für den Anruf.
passt_zu: Z1 plus P1
quelle: wiki/company/icp/icp-gesamtdossier.md:46 | 2026-07-24
zitat: "Alltagssituation: Montag um 05:45 Uhr zeigt die Werkstatttafel zwei Mitarbeiter ohne Baustelle."
confidence: niedrig

### A2 Realitätslücke
familie: Problem
versprechen: Der erste Blick zeigt den echten Betrieb.
passt_zu: Z1 plus P2
quelle: wiki/company/icp/icp-situationen-und-schmerz.md:19 | 2026-07-21
zitat: "Realitätslücke: Betrieb besser als digitaler Eindruck."
confidence: niedrig

### A3 Weicher Rückruf
familie: Lösung
versprechen: Eintrag unten, Rückruf in 24 Stunden, kostenlos.
passt_zu: Z1 plus P3
quelle: wiki/company/voice/2026-07-20-eigene-ad-sprachmuster.md:47 | 2026-07-20
zitat: "Wenn das für dich spannend klingt, dann trage dich einfach kurz hier unten ein. Ich melde mich in der nächsten 24 Stunden persönlich bei dir."
confidence: mittel

## Awareness
stufe: solution-aware
beleg: wiki/craft/ads/creative/2026-07-20-referenz-nischen-transfer-make.md:24. Zitat: "MAKEs ICP ist ein Betriebsinhaber, der eine Dienstleistung einkauft (CHF 5-10k), solution aware."

## Format
wahl: beide
grund: Der ads-Router testet neue Angles zuerst als Static. Evers prüft das Offer zuerst als Video. Diese Welle fährt beide Formate auf A1 und A2.
streit_genannt: ja

## Quellen
- onboarding: /root/raphael-brain/wiki/company/icp/icp-gesamtdossier.md | 2026-07-24
- onboarding: /root/raphael-brain/wiki/company/icp/icp-situationen-und-schmerz.md | 2026-07-21
- onboarding: /root/raphael-brain/wiki/company/voice/2026-07-20-eigene-ad-sprachmuster.md | 2026-07-20
- segment: /root/raphael-brain/wiki/_candidates/maerkte/local-service-handwerk.md | 2026-08-13
- ad_library: skipped | code-10

## Lücken
- Ad Library Token Code 10
- Kein eigener Winner-Datensatz in diesem Lauf
- Confidence der Pains bleibt niedrig, weil die Gesprächsbasis schmal ist

## Übergabe
DOSSIER: /tmp/grok-goal-0ced06dee8ae/implementer/eval/angle-dossier-make.md
SEGMENT: local-service-handwerk
