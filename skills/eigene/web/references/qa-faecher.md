# QA-Fächer (parallel, Schwarm gemischt)

Sechs Fächer: 1–4 parallel (gemischte Modellfamilien), danach 5 SEO und 6 Trust
(können parallel zueinander laufen, brauchen aber fertige Routes/Content).
G1 zuerst, dann fachlicher G2-Blick. Lighthouse/axe = 0 ist harte Ship-Bedingung.
Rollen: `agent-roster.md`. AAA-Raster: `agentur-rubrik.md`.

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
- G1: `node /root/raphael-skills/skills/design/scripts/detect.mjs <dateien>` = Exit 0
  **und** `node /root/raphael-skills/skills/design/scripts/scan-ai-slop.mjs <projekt-root>`
  triagiert (keine offenen P0-Slop-Funde). Niemals `npx impeccable detect` — das
  trifft die unpatchte npm-Version, nicht die lokalen Regeln.
- Visuelle Hierarchie, Kontrast, Rhythmus/Spacing, konsistente Tokens.
- Landing → taste-Kern + `lexlin-design-prinzipien.md` / `damien-design-methodik.md`;
  App/Dashboard → ui-ux-DB.
- Premium/Ship: Screenshot-Kritik-Loop inkl. **Blind-A/B** (`screenshot-kritik-loop.md`
  Schritt 3b) und Stichprobe gegen `agentur-rubrik.md` Visual-Zeilen.
- Immer ZUERST vor Fach 1 Voice-/Floskel-Check laufen lassen (siehe AI-Slop-Sequenz oben).

### Grafik-Assets-Gate
Greift, sobald Freisteller, Layer-Stapel oder eigene Hintergrund-Grafiken im Spiel sind.
Pass nur, wenn alle fünf Punkte stimmen:
- **(A) Kanten sauber:** Alpha ohne Halo/Restrand, Motiv nirgends angeschnitten — Köpfe
  von Personen niemals (harte Regel, Personen-Crops immer per Screenshot prüfen).
- **(B) Trim eng:** links/rechts endet das Bild am letzten Motiv-Pixel (Alpha-Trim);
  oben/unten ist bewusster Raum für Schatten/optische Balance erlaubt (siehe
  `bildgenerierung.md`, Abschnitt "freistellen + eng zuschneiden"). Abstand kommt aus
  dem CSS, nie aus dem Bild.
- **(C) Layer logisch:** Überdeckungsreihenfolge nachvollziehbar, `z-index`-Stufen in
  `art-direction.md` des Projekts dokumentiert.
- **(D) Mobile-Fallback da:** statische Variante oder Poster für Reduced-Motion vorhanden.
- **(E) Screenshot nach Einbau:** Asset im echten Web-Kontext sichtbar, kein Broken Image,
  Farben stimmen mit der Quelle überein.

Fail = ein Punkt offen → zurück in den Bildgenerierungs-/Freisteller-Schritt, nicht im
Layout nachbessern.

## Fach 3 — A11y
- G1: axe = 0 Fehler (hart). Farbkontrast AA, Fokus-Reihenfolge, Alt-Texte, Labels.
- Tastatur-Navigation vollständig, ARIA korrekt (nicht überladen).

## Fach 4 — Technik
- G1: Lighthouse = 0 Fehler (Performance/Best-Practices/SEO), Link-Check, HTML-validate.
- Meta/OG/Schema vorhanden, Canonical korrekt, keine Broken Links, responsive.
- **G1 Werkzeug-Gate (hart):** `node scripts/werkzeug-gate.mjs <projekt> --tabelle
  <pfad>/art-direction.md` = Exit 0. Prueft deterministisch: genau EIN Icon-System,
  null `framer-motion`-Importe (vendorierte Komponenten nutzen `motion/react`),
  `useReducedMotion` in jeder animierenden Datei, keine Dependency ohne Zeile in
  der Werkzeugtabelle aus Schritt 5d. Rot = kein Launch, wie jedes andere G1-Fach.
  "Router wurde gelesen" ist keine gueltige Antwort auf dieses Gate.

## Fach 5 — SEO
- G1: pro indexierbarer Route unique title (≤60), meta (≤160), clean slug, genau eine H1,
  Canonical, keine Broken Links (Teil von Lighthouse/HTML-Scan = 0 Fehler).
- G1 Index: Marketing-Routen liefern crawlbaren HTML-Inhalt (SSR/SSG/Prerender) — reines
  Client-Empty-Shell ohne Inhalt = Fail.
- G2: `seo`-Skill (Loop 4) ziehen wenn Content-Seiten/Blog/Local — Keyword-Intent,
  Information-Gain, Schema-Tiefe; nicht nur Lighthouse-SEO-Subscore.
- Checkliste: `agentur-rubrik.md` Zeilen 11–17. Fail → kein Launch für öffentliche URLs.

## Fach 6 — Trust
- G1: Impressum + Datenschutz erreichbar und vollständig (DE); 404-Route gebrandet,
  Status 404, `noindex`, klarer Rückweg.
- G1 Proof: jede sichtbare Zahl/Logo/Testimonial ist in `PROOF.md`/Dossier belegt —
  erfundene Claims = Fail (nicht „später belegen“).
- G2: Testimonials Video/Screenshot+Identität (Fach-1-Regeln); keine KI-Personen in
  Beweis-Kontexten ohne Raphael-Freigabe; Partner-Logos nur freigegeben; Consent vor
  nicht-essentiellem Tracking wo nötig (`security-audit-playbook.md`).
- Checkliste: `agentur-rubrik.md` Zeilen 18–25. Fail → kein Launch (wie Fach 5).

## Optional — Persona-QA
Je eine Perspektive: Beginner · Engineer · Business-Owner. Findet Blindstellen, die die
Fach-QA übersieht. Kein Gate, nur Zusatzsignal.

## Regel
Kein Launch, solange ein G1-Fach (1–6) rot ist. Findings → `client-<name>/wiki/qa-<datum>.md`.
