---
name: r-web
version: 0.2.0
description: >
  Dach-Skill für Websites/Landingpages (Loop 2): Strategie, Sitemap, Copy,
  Look/QA (r-design integriert), Build, QA, CRO-Learning. Trigger: "Website bauen",
  "Landingpage", "Sitemap", "Website-QA", "CRO", "Design polieren", "Slop entfernen".
class: F
scope: agency
sensitivity: internal
loads: [references/loop2-ablauf.md, references/qa-faecher.md, references/landingpage-struktur.md]
requires_skills: [r-copywriting@^0, r-design@^0, r-eval@^0]
completion_criteria:
  - "Lighthouse/axe = 0 Fehler (G1, hart)"
  - "Formular-Reihenfolge: Kontaktdaten zuletzt; Drop-off pro Slide gemessen (G1, hart)"
  - "G2 auf jedem Ship-Copy-Block >= 0.7"
  - "Launch nur mit Raphaels Signatur + Deploy-Egress-Gate"
---

# r-web — Loop 2: Website

**Lies zuerst:**
`/root/clients/client-<name>/wiki/ICP.md`, `OFFER.md`, `PROOF.md`, `VOICE.md`
(Dossier aus Loop 1 — Pflicht), `/root/raphael-brain/wiki/hot.md`.
Für alles Visuelle → **r-design** (Art Direction, impeccable-QA).

## Zweck (1 Satz)

Aus dem Dossier eine konversionsstarke, technisch fehlerfreie Website bauen und aus echten
Analytics verbessern.

## Look & QA (r-design ist die einzige Design-Wissensquelle)

Dieser Skill ist das **Dach**: eine Anleitung von Strategie bis Launch. Alles Visuelle
(Art Direction) **und** die finale Design-Prüfung laufen über **r-design** — nicht
zwischen zwei Skills springen, aber Design auch nie hier neu erfinden. So teilt sich r-design auf:

| Aufgabe | r-design-Linie | Referenz in r-design |
|---|---|---|
| Landing/Kampagne/Portfolio (Design IST das Produkt) | **taste-Linie** | `references/taste-kern.md` |
| App/Dashboard/Tool (Design DIENT dem Produkt) | **ui-ux-Linie** (Offline-DB) | `references/ui-ux-db-nutzung.md` |
| Finale Design-QA (immer, hart) | **impeccable-Detektoren** | `references/impeccable-detektoren.md` |
| Konflikte/Doktrin (Typo/Farbe/Layout) | fusionierte Regeln | `references/design-doktrin.md` |

Regel: In den Schritten `art-direction` und `qa-faecher` (Fach 2 Design) **r-design laden
und befolgen**. impeccable = Exit 0 ist harte Ship-Bedingung. Herkunft der Design-Regeln
(impeccable/taste/ui-ux-pro-max, Lizenzen) steht in `r-design/VENDORING.md`.

## Landingpage-Struktur (Besucher → qualifizierte Leads)

Detail in `references/landingpage-struktur.md` (Quelle: Ads-Kurs-Synthese, siehe dort).
Kurz — eine Landingpage für Ads-Traffic ist **eine Aktion**, kein Website-Menü:

- **Eine Aktion:** kein Menü, kein Blog, kein "About us". Formular **direkt eingebettet**
  (nicht hinter einer "Apply Now"-Button-Seite). CTA/Formular **im oder knapp unter dem Fold**.
- **Formular = Kette kleiner Ja's:** Identifikation → Qualifizierung → **Kontaktdaten ZULETZT**
  (harte QA-Regel, siehe qa-faecher). Website-URL statt Firmenname abfragen.
- **Reihenfolge:** Big Idea oben → FAQ (4 Quadranten) + "Für wen" → Testimonials → Details.
  FAQ-vor-Testimonials ist eine **selbst zu testende Hypothese** (A/B), kein Gesetz.
- **Testimonials:** Video/Screenshot statt Fließtext, nach Identität/Branche gelabelt,
  Menge NICHT wegkürzen (Kürzung halbierte die Conversion).

## Ablauf (Detail in references/loop2-ablauf.md)

1. **strategy** — Ziel, Zielgruppe, Konversionspfad (Fable, Checkpoint Raphael).
2. **sitemap** — Seitenstruktur + Sektionsplan (Sonnet). Landing → Struktur aus
   `references/landingpage-struktur.md` (eine Aktion, Reihenfolge nach Überzeugungskraft).
3. **copy** — Copy sektionsweise (Sonnet, Brand-Voice + Proof über r-copywriting). G1-Stil → G2.
4. **art-direction** — **verweist auf r-design.** G1 = impeccable-46-Regeln (`npx impeccable detect --json`).
5. **components** — Komponenten-Spezifikation aus Art Direction.
6. **build** — Umsetzung (Terra/Sol, Cross-Vendor `/codex:review`).
7. **qa-faecher** — QA parallel: **Conversion · Design · A11y · Technik** (Schwarm gemischt).
   G1 Lighthouse/axe = 0, hart. Optional Persona-QA (Beginner/Engineer/Business-Owner).
   Fächer in `references/qa-faecher.md`.
8. **Launch** — **Signatur + Deploy-Egress-Gate.** Nie autonom.
9. **cro-learn** — CRO aus echten Analytics (Sonnet, G4).

## Loop-2-Ablauf (verbindlich)

Strategie (Fable, Checkpoint Raphael) → Sitemap + Copy sektionsweise (Sonnet, Voice+Proof;
G1-Stil → G2) → Art Direction (r-design, G1 impeccable) → Build (Terra/Sol, Cross-Vendor
`/codex:review`) → QA-Fächer parallel (G1 Lighthouse/axe = 0, hart) → Launch (Signatur +
Deploy-Egress-Gate) → CRO-Learning aus echten Analytics (Sonnet, G4).

## Gotchas

- **Lighthouse/axe = 0 ist hart** — kein "fast fertig". Fertig = Environment-Tatsache (Regel 14).
- Art Direction nie selbst erfinden — Design läuft über **r-design** (Details in Sektion
  "Look & QA" oben, nicht doppelt hier).
- Build läuft Cross-Vendor geprüft: wer baut (Terra/Sol) ist nicht wer reviewt.
- Deploy = Rot-Klasse: nie autonom, immer Egress-Gate (Domain-Whitelist) + Signatur.
- CRO-Behauptungen nur aus echten Analytics (G4), nie aus Judge-Scores.
