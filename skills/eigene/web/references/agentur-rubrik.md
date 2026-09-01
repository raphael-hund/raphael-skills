# Agentur-Rubrik — AAA Visual / SEO / Trust

**Zweck:** „AAA“ hier = **Top-Tier-Qualitätsraster** (nicht WCAG AAA).
WCAG bleibt AA (axe=0) in QA Fach 3. Dieses Dokument macht Visual, SEO und
Trust **prüfbar** — kein Bauchgefühl beim Ship.

**Wann laden:** vor `qa-faecher` bei Ship-Kandidaten; bei Gauntlet/Blind-A/B als
Messlatte; in Art Direction als Zielbild.

## Gewichtung (Awwwards-inspiriert, angepasst)

| Achse | Gewicht | Prüft |
|---|---|---|
| **Design / Visual** | 40 % | Hierarchie, Typo, Spacing, Tokens, Motion, Anti-Slop |
| **Usability / Conversion** | 30 % | Pfad, CTA, Formular, Mobile, Reibung |
| **Creativity / Differentiation** | 15 % | Layout-Familie, Assets, kein Template-SaaS-Default |
| **Content / Trust+SEO** | 15 % | Proof-Echtheit, Meta/Schema, Impressum/Legal |

**Blind-A/B-Achsen (kanonisch, exakt so im Richter-Prompt):**
**Visual · Usability · Creativity · Content-Trust**
— eine Zeile pro Achse (`besser A | besser B | unentschieden`). Keine vierte
Namensvariante erfinden; SEO-Detail bleibt in QA Fach 5, nicht im Blind-Shot.

## 25 Merkmale (Schwellwert · Prüfmethode · Beleg)

### Visual (1–10)

| # | Merkmal | Schwellwert | Prüfmethode | Beleg/Quelle |
|---|---|---|---|---|
| 1 | Design-Read dokumentiert | 1 Zeile Seitentyp/Zielgruppe/Vibe vor Code | Datei `art-direction.md` oder Chat-Zeile | design SKILL |
| 2 | Tokens eingefroren | ≤1 Accent + Neutrals, keine Drift-Werte | Grep Hex außerhalb Tokens | damien Foundations |
| 3 | Type-Pair bewusst | Display ≠ Inter-Default; Scale dokumentiert | art-direction + Shot | lexlin #2 |
| 4 | Hero = ein Moment | ≤1 Primär-CTA, Headline ≤2 Zeilen | First-Fold-Shot 1440×900 | lexlin #3–5 |
| 5 | Layout-Familien wechseln | Keine 3× gleiche Card-Grid-Sektion hintereinander | Sweep alle Sections | lexlin #10 |
| 6 | Spacing-Rhythmus | 8pt-Grid, keine Random-Gaps | Shot + Code-Stichprobe | damien Brandbook |
| 7 | Radius-Logik konsistent | sharp XOR soft XOR pill seitenweit | Shot-Vergleich | lexlin #13 |
| 8 | Motion motiviert | Jede Animation hat Funktion; reduced-motion | Code + Motion-Doktrin | motion-doktrin |
| 9 | Assets art-direziert | Keine Fake-UI-Screenshots, keine Stock-Gesichter als Proof | Asset-Check vor Einbau | bildgenerierung |
| 10 | impeccable/detect grün | `node …/detect.mjs` Exit 0 + scan-ai-slop triagiert | CLI | design SKILL |

### SEO (11–17)

| # | Merkmal | Schwellwert | Prüfmethode | Beleg/Quelle |
|---|---|---|---|---|
| 11 | Unique title | ≤60 Zeichen, intent-match, kein Duplikat | HTML/Head je Route | damien SEO |
| 12 | Meta description | ≤160, unique, Nutzen klar | Head-Scan | damien SEO |
| 13 | Clean URL | lesbare Slugs, keine `?id=`-Marketing-Routen | Sitemap | damien SEO |
| 14 | Heading-Hierarchie | genau 1 H1, logische H2 | axe/HTML | damien SEO |
| 15 | Schema/JSON-LD | wo passend (Org, FAQ, Product, LocalBusiness) | Rich-Results / View-Source | damien SEO |
| 16 | Indexierbarkeit | Marketing-Routen SSR/SSG oder Prerender | Next route segment / curl HTML | damien SEO |
| 17 | SEO-Skill G1/G2 | Loop-4-Skill gezogen bei Content-Seiten | Skill-Output vorhanden | seo skill |

### Trust (18–25)

| # | Merkmal | Schwellwert | Prüfmethode | Beleg/Quelle |
|---|---|---|---|---|
| 18 | Proof belegt | Jede Zahl/Logo/Testimonial hat Quelle im Dossier | PROOF.md Abgleich | Loop 1 |
| 19 | Testimonials echt | Video/Screenshot+Name, nicht erfundener Fließtext | Shot + Source | qa-faecher |
| 20 | KI-Menschen-Policy | Keine KI-Personen in Beweis-Kontexten ohne Raphael-Ok | Asset-Index | bildgenerierung-policy |
| 21 | Impressum/Datenschutz | erreichbar, vollständig (DE-Pflicht) | Link-Check | Legal |
| 22 | Kontakt erreichbar | echte Kontaktmöglichkeit, keine toten Mailto-only-Fakes | Klick-Test | Trust |
| 23 | Keine Fake-Logos | Partner/Press nur mit Freigabe | Dossier | PROOF |
| 24 | 404 gebrandet | echte 404, noindex, Rückweg | Route-Test | webdesigner-pro Idee |
| 25 | Consent/Tracking | Tracking erst nach Consent wo nötig | Code-Review OWASP/A08 | security-audit |

## Score-Nutzung

- **Ship:** alle G1-Fächer (1–6) grün **und** jede Zeile 1–25 erfüllt oder
  mit begründeter Ausnahme dokumentiert (es gibt keine separate P0-Spalte —
  „offen“ = Ship-Blocker).
- **Blind-A/B:** nur die vier kanonischen Achsen oben; Labels anonym.
- **Gauntlet:** Messlatte = 1–2 Weltklasse-Referenz-Shots + diese Tabelle.

## Was das nicht ist

- Kein Ersatz für Lighthouse/axe (die bleiben harte G1).
- Kein WCAG-AAA-Zwang (Kontrast 7:1 Fließtext oft unpraktisch).
- Keine Award-Einreichungspflicht — nur die **Sprache** der Award-Rubriken als Messlatte.
