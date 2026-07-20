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

## Kill/Keep/Scale-Engine (TCPL-Anker)

> Kondensiert aus coreyhaines31/marketingskills, `skills/ads/references/meta-decision-system.md`
> + `b2b-paid-playbook.md` (MIT-Lizenz). Ersetzt Bauchgefühl bei perf-analyse durch feste
> Arithmetik. Alle Schwellen sind Startwerte — nach den ersten 30 Tagen am echten Konto
> nachjustieren.

**TCPL = Target Cost Per Qualified Lead** (qualifiziert = erfüllt ICP-Bar, nicht nur
Formular ausgefüllt). Herleitung, in Prioritätsreihenfolge: (1) aus Deal-Mathematik —
TCPL = Zielkosten pro Demo × Quote qualifizierter Lead → Demo; (2) aus Historie —
TCPL = rollierender 30-Tage-CPL(qualifiziert) × 0,80 (20 % Verbesserung ist allein durch
Aufräumen erreichbar); (3) neues Konto — Platzhalter aus Ziel-CAC, nach 30 Tagen durch (2)
ersetzen. TCPL monatlich neu prüfen.

**Ad-Count-Deckel:** Deckel = (Tagesbudget × 14) / (2 × TCPL) — jede Anzeige braucht in
14 Tagen mind. 2× TCPL Spend, um beurteilbar zu sein. Über dem Deckel: neuer Test nur nach
Kill einer bestehenden Anzeige.

**Zwei-Kampagnen-Struktur:** Scaling-Kampagne (~80 % Budget, nur graduierte Ads) + Testing-
Kampagne (~20 %, neue Konzepte) über dieselbe Zielgruppe — schützt Tests davor, in einer
gemeinsamen CBO von bewährten Ads ausgehungert zu werden.

**Kill-Regeln (hart, nehmen Emotion raus):**
- Neue Ad, 0 Conversions bei 2–3× TCPL Spend → killen.
- Laufende Ad (>7–14 Tage), CPL läuft 1,5–2× über Ziel → killen.
- Tag 7 Delivery-Check: erwarteter Mindest-Spend = (Tagesbudget ÷ aktive Ads) × 7 × 0,5 — darunter killen (Meta hat schon depriorisiert).
- **Datengate vor jedem Qualitätsurteil:** Spend < 3× TCPL → warten, noch kein Signal (2× hat ~13 % Fehlkill-Rate).
- **Nie pausieren ohne Ersatz** — 2–3 Iterationen immer in der Pipeline halten.

**Lead-Quality-Score (Urgency/Budget/Fit, je 0–3, max 9):** wer die Calls führt, scored jeden
Lead gegen die Ad, die ihn brachte. Nach ~20 gescorten Calls: Ads nach Ø-Score ranken, nicht
nach CPL/CTR — der CPL-günstigste Ad liefert regelmäßig die 3/9-Leads. Score <5 im Schnitt → killen.

**Fatigue-Bänder (Frequency, sicher/Warnung/kritisch):** Cold Prospecting 1,0–2,5 / 2,5–4,0 / >4,0.
Retargeting 2,0–4,0 / 4,0–6,0 / >6,0. Für Scaling-Kampagne-Ads strengeren Maßstab anlegen
(sie tragen ~80 % des Spends): Warnung schon bei 3,0–3,5 oder Kosten +20 % → jetzt 2 Iterationen
starten (brauchen ~14 Tage). Nie Creative in einer laufenden, performenden Ad bearbeiten — das
resettet die Lernphase; neue Ad danebenschalten statt editieren.

**Scaling-Protokoll:** nur wenn genug bewährte Ads für die nächste Budgetstufe vorhanden sind,
Frequency <3,0, Cost-per-QL ≤TCPL seit 2+ Wochen, 3+ Ersatz-Ads bereit. Rate: +20 % alle 5 Tage,
nie +30 % in einem Schritt (resettet Lernen). Rollback-Trigger: Cost-per-QL >1,5× TCPL nach einem
Scale-Schritt → Budget sofort 20–30 % zurücknehmen, 2 Wochen stabilisieren.

**Lead-Formulare vs. Landingpage:** LP-Conversion ≥5 % → LP nutzen; <~2 % → Lead-Formular mit
"Higher Intent"-Typ (Review-Schritt) + Pflichtfeld Arbeits-E-Mail (kann nicht aus dem Profil
autofillen — stärkster Qualitäts-Lever gegen "Social Amnesia" bei Formular-Leads).

## Outputs (Zielpfade)

`client-<name>/wiki/voc.md`, `.../ads/angles.md`, `.../ads/hooks.md`, `.../ads/scripts/`,
`.../ads/copy.md`, `.../ads/statics-briefs.md`, `.../ads/claims-qa-<datum>.md`,
`.../ads/perf-<datum>.md`.
