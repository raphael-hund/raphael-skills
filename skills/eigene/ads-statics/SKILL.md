---
name: ads-statics
version: 2.8.0
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
  v2.8.0 (Raphael 03.09.2026): Klarheit vor Handwerk. Ohne Case-Zahl auf der Karte
  gilt die Drei-Zeilen-Form: Zustand, Versprechen mit Frist, Null. Keine Schwellen,
  keine Bedingungen, kein Bundle-Beiwerk onscreen.
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
  - "Klarheits-Regel: ohne Case-Zahl onscreen höchstens drei Aussagen (Zustand, Versprechen mit Frist, Null). Umsatzschwelle, Bundle-Bestandteile und Garantiebedingungen stehen nie auf der Karte."
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

## Klarheit vor Handwerk (Raphael, 03.09.2026)

Wenn keine gute Zahl auf die Karte darf (kein Case, kein Screen), muss die Karte
viel klarer werden, nicht voller. Die Formeln F01 bis F12 und C01 bis C06 sind Werkzeug,
kein Pflichtprogramm. Auf einer Karte ohne Case:

1. **Zustand in einem Satz**, den der Leser sofort mit Ja oder Nein beantwortet.
   «Deine Kunden googeln dich. Bist du in den Top 3?»
2. **Versprechen mit Frist.** «Wir bringen dich in 90 Tagen in die Top 3 bei Google.»
3. **Null.** «Oder du zahlst 0 CHF.»

Fertig. Kein «ab 20k Monatsumsatz», kein «mit Fotoshooting», kein «in deiner Stadt
für deine Keywords», keine Mitwirkungsklausel. Das gehört ins Formular und in den Vertrag,
nicht aufs Bild. Branche kommt als ein Wort in Zeile 1 oder als Szene im Bild.

Test: Liest ein Fremder die Karte in einer Sekunde und kann das Versprechen in einem
Satz nachsprechen? Wenn nicht, streichen, bis es geht.

Anti-Beispiel (Welle 4 erste Fassung, 03.09. vormittags):
«Neue Website mit Fotoshooting plus Top 3 bei Google in deiner Stadt in 90 Tagen,
sonst keinen Rappen.» Sieben Bausteine in einem Satz, nicht nachsprechbar.

Richtig: «Top 3 bei Google in 90 Tagen, oder du zahlst 0 CHF.»

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
