# QA-Fächer (parallel, Schwarm gemischt)

Vier Fächer laufen parallel, jeweils eigener Agent (gemischte Modellfamilien). G1 zuerst,
dann fachlicher G2-Blick. Lighthouse/axe = 0 ist harte Ship-Bedingung.

## Fach 1 — Conversion
- Ein klares Ziel je Seite? CTA über dem Fold + wiederholt?
- Value Proposition in < 5 Sek erfassbar? Proof (Zahlen/Logos/Testimonials belegt)?
- Reibung raus: Formularfelder minimal, Einwände vorweggenommen.

## Fach 2 — Design (→ r-design)
- G1: `npx impeccable detect --json` = 0 Findings (46 deterministische Regeln).
- Visuelle Hierarchie, Kontrast, Rhythmus/Spacing, konsistente Tokens.
- Landing → taste-Kern; App/Dashboard → ui-ux-DB.

## Fach 3 — A11y
- G1: axe = 0 Fehler (hart). Farbkontrast AA, Fokus-Reihenfolge, Alt-Texte, Labels.
- Tastatur-Navigation vollständig, ARIA korrekt (nicht überladen).

## Fach 4 — Technik
- G1: Lighthouse = 0 Fehler (Performance/Best-Practices/SEO), Link-Check, HTML-validate.
- Meta/OG/Schema vorhanden, Canonical korrekt, keine Broken Links, responsive.

## Optional — Persona-QA
Je eine Perspektive: Beginner · Engineer · Business-Owner. Findet Blindstellen, die die
Fach-QA übersieht. Kein Gate, nur Zusatzsignal.

## Regel
Kein Launch, solange ein G1-Fach rot ist. Findings → `client-<name>/wiki/qa-<datum>.md`.
