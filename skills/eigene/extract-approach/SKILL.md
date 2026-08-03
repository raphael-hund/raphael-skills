---
name: extract-approach
version: 0.1.1
description: >
  "skillify this" — feuert, wenn ein Arbeitsmuster zum ZWEITEN Mal auftaucht:
  extrahiert es als Skill-Kandidat nach _candidates/. Trigger: "skillify this",
  "das haben wir schon mal so gemacht", "daraus einen Skill machen".
class: G
scope: agency
sensitivity: internal
loads: [references/candidate-template.md]
requires_skills: []
completion_criteria:
  - "Muster erst ab 2. echter Wiederholung als Kandidat angelegt (nicht auf Vorrat)"
  - "Kandidat liegt in _candidates/, NICHT als aktiver Skill (braucht Raphaels Freigabe)"
---

# extract-approach — "skillify this"

**Lies zuerst:**
`/root/raphael-command-center/AGENTS.md` (Regeln 9, 10 — "erst Schmerz, dann Werkzeug"),
`/root/raphael-skills/skills/_candidates/` (bestehende Kandidaten — Doppelung vermeiden).

## Zweck (1 Satz)

Aus echter, **zweimal wiederholter** Arbeit einen Skill-Kandidaten machen — nie Skills auf
Vorrat bauen.

## Auslöser (die 2×-Regel)

- Ein Vorgehen taucht zum **zweiten Mal** in echter Arbeit auf (nicht antizipiert).
- Raphael/Agent sagt "skillify this" / "das kennen wir schon".
- **Nicht** bei einmaliger Aufgabe, nicht "könnte man mal brauchen".

## Ablauf

1. **Muster benennen** — was genau wurde 2× gleich gemacht? Wo (welche Sessions/Repos)?
2. **Kern extrahieren** — das WIE (Vorgehen), nicht die kundenspezifischen Daten (die
   bleiben Brain-Verweis).
3. **Kandidat schreiben** — nach `references/candidate-template.md` als SKILL.md-Entwurf.
4. **Ablegen in `_candidates/`** — NIE direkt als aktiver Skill. Skill-Mutation ist Rot-Klasse.
5. **Inbox-Notiz** — Kandidat in `ops/review-inbox.md` verlinken → Raphaels Freigabe
   entscheidet über Promotion in den aktiven -Namespace.

## Gotchas

- **Skill-Mutation ist eine der 7 Rot-Klassen** — ein Kandidat wird nie autonom aktiviert.
  Nur Raphael promotet (Signatur).
- Kern = WIE (stabil), nicht WAS/FÜR WEN (das gehört ins Brain, ändert sich oft).
- Ein Kandidat kopiert **keine** Kundendaten — nur verallgemeinertes Vorgehen (scope/sensitivity).
- Erst Schmerz, dann Werkzeug (Regel 10): einmal ≠ Muster. Zwei echte Wiederholungen sind
  die Schwelle.
- Vor dem Anlegen `_candidates/` prüfen — nicht denselben Kandidaten doppelt.

## Nachbar

- Betrifft der Lernpunkt einen **bestehenden** Skill ("soll künftig anders arbeiten"),
  ist das kein neuer Kandidat, sondern
  [`skill-update`](/root/raphael-skills/skills/methodik/skill-update/SKILL.md).
  `extract-approach` legt nur neu an, es ändert nie Bestehendes.
