# Loop 3 — Ablauf im Detail

## Reihenfolge

voc-mine → angles → hooks → video-scripts → ad-copy → statics → claims-qa → (Signatur) →
Schaltung → perf-analyse → nächste Testwelle.

## Worker-Reuse

Hooks/Skripte/Copy laufen über **denselben Sonnet-Worker je Kunde** (Regel 2), nicht neue
Session pro Hook — der Worker trägt Brand-Voice + Dossier stabil im Cache-Prefix.

## Andromeda-Struktur (Stand: Meta-Update ~Mitte 2025 — bei Änderung prüfen)

**TLDR:** Meta liest den Ad-Inhalt und sucht sich die Zielgruppe selbst. Deshalb: viele
verschiedene Creatives bauen, Text/Bild die Zielgruppe klar ansprechen lassen, Targeting nur
als grobe Suggestion setzen.

- **Targeting kommt aus dem Ad-Inhalt, nicht aus Interessen.** Keine Zeit in manuelles
  Interessen-Targeting stecken (Advantage+ nutzen). Copy/Video so schreiben, dass Sprache
  und Bild eindeutig den Avatar ansprechen (z. B. „Service-Business-Owner" statt E-Commerce).
  Ad-Set-Targeting ist nur noch ein Vorschlag — Meta wertet Transkript, Visuals und Landingpage aus.
- **~12 diverse Creatives pro Kampagne (nicht 1–3).** Pro Ad eine **komplett neue Kreation**
  (neuer Hook, neues Video/Bild, neue Kernbotschaft), jeweils auf **einen** Avatar-Motivator
  (towards / away / gescheiterte Vorversuche). Nur Hook/Titel einer bestehenden Anzeige zu
  tauschen zählt nicht mehr als eigenständiges Creative — Creative-Diversität ist ein eigener
  Matching-Faktor.
- **Struktur:** 1 Kampagne → mehrere Ad-Sets (cold / retargeting / lookalike) → je ~12
  verschiedene Ads.
- **Budget-Klumpen ist erwartetes Matching, kein Fehler.** Legt Meta bei vielen aktiven Ads
  fast das ganze Budget auf eine Anzeige (z. B. ~800 € von 1.000 € auf eine Ad), NICHT manuell
  umverteilen. Der Algorithmus schätzt pro Sub-Segment die Erfolgswahrscheinlichkeit; breite
  Botschaften bekommen oft mehr Budget als Nischen-Botschaften.

## Pixel-Conditioning (harte Regel — greift in claims-qa/Schaltung)

**TLDR:** Der Algorithmus lernt genau auf das Event, das du meldest. Meldest du Müll, sucht er
Müll-Zielgruppen. Darum sauber tracken, bevor irgendetwas live geht.

- **Tracking/Events VOR dem ersten Launch einrichten.** Läuft eine Kampagne ohne Tracking an,
  lernt der Algorithmus nichts über den echten Erfolg — auch wenn sie kurzfristig gut aussieht.
- **Lead-Event nur bei qualifizierter Antwort feuern**, nicht bei jedem Formular-Submit. Sonst
  lernt Meta, unqualifizierte Leute zu finden, und verbrennt Budget (CPL fällt scheinbar, die
  Lead-Qualität kollabiert — dann muss der Pixel neu aufgesetzt werden).
- **Auf das tiefste gewünschte Funnel-Event optimieren** (Booking/Schedule), nicht auf „Link
  Clicks" oder nur „Leads". Sagst du Meta „ich will Klicks", bekommst du Klicks — keine Leads.

## Produktionstaktiken (Creative-Herstellung)

- **One-Frame-Test:** Vor Dreh/Schnitt den ersten Frame wie ein Standbild prüfen — was
  signalisieren Kleidung und Hintergrund, bevor ein Wort fällt? Hintergrund aktiv als
  Credibility-Fläche nutzen (Team/Kunden im Bild statt leere Wand). Glaubwürdigkeit entscheidet
  sich in Sekundenbruchteilen visuell.
- **Batching:** Content in einer langen Session drehen (30+ Min, mehrere Varianten) statt täglich
  einzeln — die Anlaufzeit (Setup, in den Flow finden) zahlt man so nur einmal (~15 Stücke pro
  Session statt 1/Tag).
- **Geographical-Affinity-Hook (lokale Kunden):** Hook + erstes Frame mit lokal erkennbaren
  Landmarks verknüpfen (Opening vor dem echten Firmenschild an einer Hauptstraße). Rapport über
  geografische Nähe ist leichter als Vertrauen über die unsichtbare Innenwelt des Business.
  Routinefrage im Briefing: „Seid ihr an einer Hauptstraße? Gibt es einen bekannten Landmark?"

## Gates

- **G1 (immer zuerst):** LLM-ismus-/Passiv-Detektor + Meta-Policy-Verbotsliste (deterministisch).
- **G2:** Rubrik `evals/rubrics/ads.md`, Schwelle 0.7. Ship-kritisch = Panel aus 3 Familien
  (Sonnet + Sol + Kimi), Median gegen Rubrik, >20 % Divergenz = Flag an Raphael.
- **claims-qa:** Block-Gate. Output-Zeilenformat siehe claims-verbote.md.
- **G4 (Outcome):** echte CTR/CPL/CVR aus Datei-Export korrigieren Rubriken rückwirkend;
  "Judge liebte es, Markt floppte" → permanentes Anti-Beispiel in evals/anti/.

## Egress (Rot-Klasse Budgets)

Schaltung berührt Geld → kleines deterministisches Bash-Gate (Konto-/Budget-Whitelist) +
`git commit -S` in review-inbox. Nie autonom, kein Schreib-Scope auf Ads-Konten.

## Outputs (Zielpfade)

`client-<name>/wiki/voc.md`, `.../ads/angles.md`, `.../ads/hooks.md`, `.../ads/scripts/`,
`.../ads/copy.md`, `.../ads/statics-briefs.md`, `.../ads/claims-qa-<datum>.md`,
`.../ads/perf-<datum>.md`.
