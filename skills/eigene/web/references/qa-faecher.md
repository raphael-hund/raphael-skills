# QA-Fächer (parallel, Schwarm gemischt)

Vier Fächer laufen parallel, jeweils eigener Agent (gemischte Modellfamilien). G1 zuerst,
dann fachlicher G2-Blick. Lighthouse/axe = 0 ist harte Ship-Bedingung.

**AI-Slop-Sequenz (fest, kein optionaler Zusatzschritt):** design ZUERST (Fach 2, `detect.mjs`
+ `scan-ai-slop.mjs` je Exit 0) → **danach copywriting G1→G2** auf denselben Seiten (Fach 1,
Voice/Floskel-Check). Siehe SKILL.md "Look & QA".

## Fach 1 — Conversion
- Ein klares Ziel je Seite? CTA über dem Fold + wiederholt? Landing = eine Aktion
  (kein Menü/Blog), Formular direkt eingebettet statt hinter einer Button-Seite.
- Value Proposition in < 5 Sek erfassbar? Proof (Zahlen/Logos/Testimonials belegt)?
- Reibung raus: Formularfelder minimal, Einwände vorweggenommen.

### Harte QA-Regeln Formular (G1, blockieren den Launch)
- **Reihenfolge = Mikro-Commitments, Kontaktdaten IMMER zuletzt:** Identifikation
  ("Welche Beschreibung passt zu dir?") → Qualifizierung (Branche, Team-Größe,
  **Website-URL** statt Firmenname) → **erst zuletzt** Kontaktdaten (Name → E-Mail →
  Telefon). Kontaktdaten nie als erste Frage. *Beleg: Kontaktdaten nach vorne gezogen →
  Conversion brach ein; zurück ans Ende → Conversion vervierfacht.*
- **Drop-off pro Slide messen:** Conversion jedes einzelnen Slides tracken, Ausreißer-Frage
  finden und fixen. *Beleg: offene Frage → ~40 % Drop-off auf Slide 3; ein URL-Freitextfeld
  27 % Drop-off vs. 3–4 % sonst.*
- **Offene Textfelder ersetzen:** sobald die häufigsten Antworten bekannt sind, Freitext →
  Radio-Select (springt automatisch weiter; weniger Tipp-Reibung als Checkbox).

### Harte QA-Regel Thank-You-/Zwischenseiten (G1)
- **Vor dem letzten Schritt KEIN Abschluss-Wording** ("Danke", "Glückwunsch", "Geschafft") —
  das schließt die Schleife im Kopf, der Nutzer schließt den Tab. Stattdessen "Fast geschafft"/
  "Letzter Schritt" + Fortschrittsanzeige. *Beleg: ein 1,5-s-Ladescreen mit "Thank you" zwischen
  zwei Schritten reichte zum Abbruch; Fix "Please wait".*
- Danach zuerst eine Identitätsaussage zum Zustimmen, dann No-Show-/No-BS-Policy
  (Konsistenzprinzip). *Beleg: ein Identitäts-Textblock hob die Show-Rate 60 % → ~75 %.*

### Testimonial-Check
- Video oder echter Screenshot (voller Name/Handle) statt Fließtext; nach **Identität/Branche**
  gelabelt; Video-Schnitt **Hook-first** (stärkster Moment zuerst, nicht die Vorstellung).
- **Menge NICHT wegkürzen** — Volumen ist der Beweis. *Beleg: Reduktion auf die 4 größten
  halbierte die Conversion.*

## Fach 2 — Design (→ design)
- G1: `npx impeccable detect --json` = 0 Findings (46 deterministische Regeln).
- Visuelle Hierarchie, Kontrast, Rhythmus/Spacing, konsistente Tokens.
- Landing → taste-Kern; App/Dashboard → ui-ux-DB.
- Immer ZUERST vor Fach 1 Voice-/Floskel-Check laufen lassen (siehe AI-Slop-Sequenz oben).

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
