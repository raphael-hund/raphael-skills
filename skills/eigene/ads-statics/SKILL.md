---
name: ads-statics
version: 2.7.0
description: >
  Zeigt auf ads Teil Statics. Angle mal Visual-Style-Briefs, acht Styles S1–S8.
  Hook-, Callout- und Angle-Formeln plus kategorisierte Referenz-Bibliothek
  (eine Datei pro Angle A01–A08 unter references/angles/, mit wörtlichem
  Onscreen-Text, Shortcuts und MAKE-Transfer) liegen als Pflicht-Lesen in
  references/. Copy ist ganze Sätze, Hook UND Deal in einer Ad, nur der ICP
  fühlt sich angesprochen. v2.6.1: Hormozi-Mapping der Callout-Typen,
  Likeness/Szene, WHAT×WHO×WHEN für Varianten.
  v2.7.0 (Raphael 03.09.2026): Deliverable ist Text plus visuelle Idee je Karte,
  nie ein Render. Bild-Produktion ist ein eigener Schritt (higgsfield, Shooting, Handy).
  Trigger: "Statics bauen", "Static-Briefs",
  "Bildanzeigen", "Testwelle Statics", "S1-S8". Bild danach: Skill higgsfield.
class: F
scope: agency
sensitivity: internal
loads:
  - ../ads/references/teil-statics.md
  - references/copy-formeln.md
  - references/referenz-statics-index.md
  - references/visual-styles.md
  - references/copy-bauformen.md
  - references/zac-regan-playbook.md
  - references/wettbewerber/grigoletti-ch.md
  - references/wettbewerber/mario-de.md
loads_external: ["/root/.claude/forbidden.md"]
requires_skills: [ads@^2]
completion_criteria:
  - "Teil Statics in ads/references/teil-statics.md gelesen und befolgt"
  - "copy-formeln.md und referenz-statics-index.md gelesen; Hook-, Callout- und Angle-ID stehen im Brief"
  - "Die Angle-Datei des gewählten Angles (references/angles/a01..a08) gelesen; die Referenz, von der die Bauform kommt, steht namentlich im Brief"
  - "Lern-Register des Kunden gelesen, wenn vorhanden; als tot markierte Bauformen werden nicht wieder gebaut"
  - "Jede Onscreen-Zeile ist ein ganzer Satz; Hook UND Deal stehen auf der Ad; nur der ICP fühlt sich angesprochen; Hypothese steht im Brief"
  - "copywriting/scripts/forbidden-check.py auf jedem Brief Exit 0"
  - "Deliverable ist Text plus visuelle Idee je Karte (Onscreen, Primary, Szene, Stil-Chassis). Kein PNG, kein build.py, kein Layout-Skript im Skill-Output. Bild ist ein Folgeschritt."
---

# ads-statics → ads Teil Statics

Arbeit steht in `/root/raphael-skills/skills/eigene/ads/SKILL.md`
dann `references/teil-statics.md`.

Drei Pflicht-Referenzen liegen hier:

- `references/copy-formeln.md` — Hook F01–F12, Callout C01–C06, Angle A01–A08.
- `references/referenz-statics-index.md` — Router auf die kategorisierte Bibliothek:
  eine Datei pro Angle unter `references/angles/`, dazu die zehn Shortcuts über alle
  Gewinner. Vor jedem Brief den Index UND die Angle-Datei des gewählten Angles lesen.
- `references/visual-styles.md` — die acht Rahmen S1–S8.
- `references/zac-regan-playbook.md` — Zac Regan destilliert aus 258 Reels: Hook-Häufigkeiten,
  zwölf Copy-Gesetze, was für Statics gilt, was wir nicht übernehmen.
- `references/wettbewerber/` — CH/DE-Wettbewerber (Grigoletti, Mario Reinwarth, 28.08.2026)
  als Kontrast- und Baustein-Referenzen. Kontrast-Warnungen oben in jeder Datei beachten.

## Deliverable (Raphael, 03.09.2026)

Der Skill gibt **nur Text und visuelle Idee**. Je Karte:

1. Onscreen-Zeilen (Callout, Problem oder Hook, Deal, CTA), ganze Sätze, unter 35 Wörter.
2. Primary Text, erster Absatz trägt allein.
3. Visuelle Idee: Szene in zwei Sätzen (wer, wo, was in der Hand, Blick), plus ein Satz zur Bildquelle (Handy, Shooting, vorhandenes Kundenfoto) und zum Stil-Chassis (S1 bis S8).
4. IDs: Style, Angle, Hook, Callout, Grounding-Referenz.

Nicht im Output: PNGs, Render-Skripte, Pixel-Koordinaten, Kontaktbögen. Wer ein Bild will, ruft danach higgsfield oder bucht ein Shooting.
Beispiel im Kundenordner: `/root/clients/make/ads/statics/welle-4-branchen/TEXT-UND-IDEE.md`.

Der Skill lernt aus den Referenzen. Er schreibt nicht aus dem Gedächtnis.
Ein Brief ohne gelesene Angle-Datei ist unbelegt und wird nicht ausgeliefert.
