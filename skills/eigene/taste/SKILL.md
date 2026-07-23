---
name: taste
version: 0.1.0
description: >
  Feuert bei Landing/Marketing/Portfolio/Editorial-Flächen, wenn der Look
  "besonders", "premium", "nicht nach Template" aussehen soll — die
  Landing-/Brand-Linie des design-Systems. Trigger: "Landingpage designen",
  "Premium-Look", "nicht nach Baukasten aussehen", "Brand-Fläche", "Hero
  gestalten", "Portfolio", "Editorial", "taste", "mehr Geschmack ins Design".
class: R
scope: agency
sensitivity: internal
source: pointer — taste-Kern ist vendored im design-Skill
  (skills/design/references/taste-kern.md aus Leonxlnx/taste-skill @ 7c397f2, MIT)
loads: []
requires_skills: [design@^0]
completion_criteria:
  - "Anfrage als Landing/brand-Register erkannt und an design/taste-Linie weitergeleitet (keine eigenen Design-Regeln hier)"
  - "design-Skill geladen und taste-Linie (taste-kern.md + design-doktrin.md) angewendet"
---

# taste — Router auf die taste-Linie in design

**Zweck (1 Satz):** Dieser Skill ist ein Wegweiser, kein Wissensspeicher — die
taste-Methodik (3 Dials VARIANCE/MOTION/DENSITY, Brief-Inference,
Landing-Checklisten) lebt im **design**-Skill.

## Routing (einzige Aufgabe)

Wenn dieser Skill feuert:

1. **design laden** (falls nicht schon geschehen) und dort die **taste-Linie**
   wählen: `references/taste-kern.md` + `references/design-doktrin.md`.
2. **Design-Read ausgeben** (1 Zeile): Seitenart, Zielgruppe, Vibe, Richtung.
3. Danach den Regeln in taste-kern.md folgen: Brief-Inference, Dials setzen,
   Design-System-Map, Landing-Checklisten.

## Was hier NICHT steht (und warum)

- Keine duplizierten Regeln — taste-kern.md im design-Skill ist die einzige
  Quelle (Single Source). Wer hier Inhalte kopiert, erzeugt Drift.
- Keine imagegen-Pflicht — die wurde beim Vendoring entfernt (Bilder laufen
  über `references/bildgenerierung.md` im web-Skill / Higgsfield-Policy).
- Keine App/Dashboard-Regeln — das ist die ui-ux-Linie (Skill `ui-ux`).

## Gotchas

- **Cards sind auf Landing-Flächen die faule Antwort** — 3 gleiche Cards
  (Icon+Heading+Text) verboten; auf App-Flächen dagegen legitim
  (Quellen-Konflikt entschieden in design-doktrin.md §4).
- **Kein Em-Dash in sichtbarem Text** (taste-Strenge gewinnt gegenüber
  impeccable-Toleranz).
- **Serif sehr zurückhaltend** — "kreativ = Serif" ist der meistgetestete
  AI-Tell; nur bei echt editorial/luxury UND begründet.
