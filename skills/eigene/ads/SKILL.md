---
name: ads
version: 2.7.5
description: >
  Ein Skill für Paid Ads. Strategie zuerst (was testen, Static oder Video),
  dann ICP, Research, Video-Skript, Statics, Performance.
  Video-Skripte klingen wie eine Sprachnachricht.
  Performance zieht 7/30-Tage-Zahlen und sieht jedes Video per watch.
  Läuft ohne Second Brain.
  Trigger: "Ads bauen", "Ad-Skript", "Video-Skript", "Ads Scripts",
  "Static-Briefs", "Angle-Dossier", "ICP für Ads", "Hooks schreiben",
  "Creatives", "Testwelle", "was zuerst", "Static oder Video",
  "Konto-Audit", "Ads Performance", "laufende Ads", "7 Tage", "30 Tage".
class: F
scope: agency
sensitivity: internal
source: >
  Fusion Loop-3 plus Korpus 711. v2.2.0 legt Strategie in teil-strategie
  (Static-first, Konzept-Achsen, Andromeda). Brain bleibt optional.
  v2.7.0 legt die Hormozi-Doktrin in hormozi-paid-ads (4 Probleme,
  Callout-Typen, WHAT×WHO×WHEN, 70/20/10, Friction-Waage), destilliert aus
  den zwei Paid-Ads-Trainings (Transkripte 19.08.2026).
  v2.7.1 legt das Marc-Evers-Playbook dazu (Kanal-Videos analysiert:
  Ergebnis statt Produkt verkaufen, drei USPs, Instant-Form ohne
  Interpretationsspielraum, Static-Spearhead, Testing als Schachspiel,
  Eimer-Modell, Fast-/Slow-Lane).
  v2.7.2 schliesst die Lernschleife: Lern-Register pro Kunde
  (`client/ads/lern-register.md`), Pflicht-Lektüre vor Briefs, Write-back nach
  jeder Auswertung, Hypothese-Feld im Brief-Schema, Formular-Regeln.
  v2.7.3 zieht das 39. Kanal-Video und 90 Instagram-Reels nach: Flow vor Reibung,
  Pixel Conditioning, VSL hinter dem Formular, 6×6-Skalierung.
    v2.7.4 legt Zac Regan / @startrunningads daneben (41 Reel-Transkripte im Brain,
    Playbook zac-regan-startrunningads.md). Nicht mit Marc Evers vermischen.
  v2.7.5 (03.09.2026): Foreplay-Export mit --media im Teil Research, Bilder werden
  gelesen und wörtlich zitiert; Objektverkauf-Regel im Teil Statics.
loads:
  - references/teil-strategie.md
  - references/teil-icp.md
  - references/teil-research.md
  - references/teil-video.md
  - references/teil-statics.md
  - references/loop3-ablauf.md
  - references/segment-map.md
  - references/wissens-router.md
  - references/claims-verbote.md
  - references/hormozi-paid-ads.md
  - references/marc-evers-playbook.md
  - references/zac-regan-startrunningads.md
loads_external: ["/root/.claude/forbidden.md"]
requires_skills: [copywriting@^0, watch@^0]
completion_criteria:
  - "Genau ein Teil gewählt und dessen Datei gelesen"
  - "Genau ein Markt-Segment geladen über scripts/load-wissen.py"
  - "copywriting/scripts/forbidden-check.py auf jedem Ship-Text Exit 0"
  - "Keine erfundene Kundenzahl"
  - "Schaltung nur mit Raphaels Signatur"
  - "Teil Performance: 7-Tage- und 30-Tage-Zahlen als Datei, jedes Video-Ad mit Spend über watch (Frames gelesen, Transkript gezogen oder ehrlich keins)"
  - "Strategie-Frage Static-first vs Video-first im Output genannt, nicht still entschieden; Konzept als Persona × Angle × Offer geschrieben"
---

# ads — Strategie, ICP, Research, Video, Statics, Performance

Grundschule «Wie macht man Paid Ads»: `references/hormozi-paid-ads.md`
(4 Probleme, Call out → Value → CTA, Callout-Typen, WHAT×WHO×WHEN,
Kreativ-Volumen 70/20/10, Targeting, Friction-Waage, Proof > Promise).
Praxis aus dem Agentur-Alltag: `references/marc-evers-playbook.md`
(Ergebnis statt Produkt, drei USPs, Instant-Form ohne Interpretationsspielraum,
Spearhead-Validierung, Testing als Schachspiel, Eimer-Modell, Pixel Conditioning, 6×6).
Ad-Handwerk aus 41 Reels: `references/zac-regan-startrunningads.md`
(Call-Out-Hooks, Vier-Schritte-Ad, Creative über Targeting, Messaging Pockets;
Volltranskripte in `raw/resource-2026-08-30-startrunningads-*.md`).
Hormozi und Evers gelten immer mit. Zac-Regan zusätzlich, sobald Hooks, Copy
oder Video-Skripte geschrieben werden. Nicht mit Evers vermischen.

## Schritt 0

```bash
python3 /root/raphael-skills/skills/eigene/ads/scripts/load-wissen.py --skill ads --kunde <slug>
```

Craft-Kern plus genau ein Segment unter `references/maerkte/`.
Wiki fehlt: `BRAIN=skipped`. Skill läuft weiter.

## Welcher Teil

| Auftrag | Datei |
|---|---|
| Was zuerst, Konzept, Static oder Video | `references/teil-strategie.md` |
| Wer kauft, was tut weh | `references/teil-icp.md` |
| Angles, Konkurrenz, Dossier | `references/teil-research.md` |
| **Video-Ad-Skript (Ads Scripts)** | `references/teil-video.md` |
| Static-Brief | `references/teil-statics.md` |
| Laufende Ads, 7/30 Tage, Kill/Keep | `references/loop3-ablauf.md` (Abschnitt Performance) |

Nur diese eine Datei lesen. Tiefe erst, wenn der Teil sie nennt.
`loads:` im Frontmatter ist das Manifest, kein Lade-Befehl.

Video ist der Default, wenn der User „Skript" oder „Ads Scripts" sagt.
Performance ist der Default bei „Zahlen", „7 Tage", „30 Tage", „laufende Ads".
Jedes Video mit Spend läuft durch watch.

Testwelle / was zuerst / Static oder Video: zuerst `references/teil-strategie.md`.
Auch bei direktem Skript- oder Statics-Einstieg: die drei Strategie-Zeilen
(Konzept, Welle, Messen) stehen im Output. Eine Zeile je Punkt reicht.

## Reihenfolge

Strategie-Frage **nicht still** entscheiden. Im Output nennen:
Static-first (Default) oder Video-first plus Grund.
Dann drei Denkzeilen: OBSERVE, THINK (Unit Economics), CREATE.
Nicht alle zehn Prinzipien abspulen.

ICP → Research → Video oder Statics.
Fehlt ICP: holen oder `kunden-layer: fehlt` schreiben, dann Craft-Kern.

Konto, Kill/Keep/Scale: `references/loop3-ablauf.md` nur bei Bedarf.
Claims vor Schaltung: Sol, frische Session, `references/claims-verbote.md`.
Geld: Signatur. Nie autonom schalten.

## Rot

- Second Brain als Pflicht behandeln
- Alle Teile auf einmal laden
- Kundenzahlen erfinden
- Coaching-Umsatz in Local-Service kopieren
- „Wenn du [ICP] bist und [Outcome] willst, brauchst du [Offer]"
- Static-first vs Video-first still entscheiden
