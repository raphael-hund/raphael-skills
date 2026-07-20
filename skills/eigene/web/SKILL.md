---
name: web
version: 0.3.0
description: >
  Dach-Skill für Websites/Landingpages (Loop 2): Strategie, Sitemap, Copy,
  Look/QA (design integriert), Build, QA, CRO-Learning, Website-Referenzen
  nachbauen, UI-Motion-Komponenten. Trigger: "Website bauen", "Landingpage",
  "Sitemap", "Website-QA", "CRO", "Design polieren", "Slop entfernen",
  "Referenzseite nachbauen", "Website clonen", "Popup/Lead-Magnet".
class: F
scope: agency
sensitivity: internal
loads:
  - references/loop2-ablauf.md
  - references/qa-faecher.md
  - references/landingpage-struktur.md
  - references/informationsarchitektur.md
  - references/web-clone-playbook.md
  - references/ui-components/INDEX.md
  - references/motion-doktrin.md
  - references/ui-layouts-catalog.md
  - references/cro-diagnose.md
  - references/experiment-programm.md
  - references/conversion-elemente.md
  - references/code-qualitaets-checkliste.md
  - references/domain-safe-browsing-checkliste.md
  - references/readonly-db-rolle.md
  - references/templates/statistics-page-template.html
requires_skills: [copywriting@^0, design@^0, eval@^0]
completion_criteria:
  - "Lighthouse/axe = 0 Fehler (G1, hart)"
  - "Formular-Reihenfolge: Kontaktdaten zuletzt; Drop-off pro Slide gemessen (G1, hart)"
  - "G2 auf jedem Ship-Copy-Block >= 0.7"
  - "Launch nur mit Raphaels Signatur + Deploy-Egress-Gate"
  - "Bei Website-Referenz-Nachbau: Lizenz-Check aus web-clone-playbook.md dokumentiert vor Launch"
---

# web — Loop 2: Website

**Lies zuerst:**
`/root/clients/client-<name>/wiki/ICP.md`, `OFFER.md`, `PROOF.md`, `VOICE.md`
(Dossier aus Loop 1 — Pflicht), `/root/raphael-brain/wiki/hot.md`.
Für alles Visuelle → **design** (Art Direction, impeccable-QA).

## Zweck (1 Satz)

Aus dem Dossier eine konversionsstarke, technisch fehlerfreie Website bauen und aus echten
Analytics verbessern.

## Look & QA (design ist die einzige Design-Wissensquelle)

Dieser Skill ist das **Dach**: eine Anleitung von Strategie bis Launch. Alles Visuelle
(Art Direction) **und** die finale Design-Prüfung laufen über **design** — nicht
zwischen zwei Skills springen, aber Design auch nie hier neu erfinden. So teilt sich design auf:

| Aufgabe | r-design-Linie | Referenz in design |
|---|---|---|
| Landing/Kampagne/Portfolio (Design IST das Produkt) | **taste-Linie** | `references/taste-kern.md` |
| App/Dashboard/Tool (Design DIENT dem Produkt) | **ui-ux-Linie** (Offline-DB) | `references/ui-ux-db-nutzung.md` |
| Finale Design-QA (immer, hart) | **impeccable-Detektoren** | `references/impeccable-detektoren.md` |
| Konflikte/Doktrin (Typo/Farbe/Layout) | fusionierte Regeln | `references/design-doktrin.md` |

Regel: In den Schritten `art-direction` und `qa-faecher` (Fach 2 Design) **design laden
und befolgen**. impeccable = Exit 0 ist harte Ship-Bedingung. Herkunft der Design-Regeln
(impeccable/taste/ui-ux-pro-max, Lizenzen) steht in `design/VENDORING.md`.

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
   Mehrseitige Website (kein Ads-Landing) → `references/informationsarchitektur.md`
   (Seitenhierarchie, Navigation, URL-Struktur, internes Verlinken).
3. **copy** — Copy sektionsweise (Sonnet, Brand-Voice + Proof über copywriting). G1-Stil → G2.
4. **art-direction** — **verweist auf design.** G1 = impeccable-46-Regeln (`npx impeccable detect --json`).
   Soll eine bestehende Referenzseite als Vorlage/Stil dienen ("baue mir etwas Ähnliches
   wie X", "clone diese Landingpage") → **zuerst** `references/web-clone-playbook.md` laden
   (Entscheidungsbaum, Lizenz-Check, Komplexitätsskala L1–L6) **bevor** Art Direction beginnt.
5. **components** — Komponenten-Spezifikation aus Art Direction. Copy-paste-fertige
   Motion-Komponenten (Buttons, Modals, Tabs, Command-Palette, …) → `references/ui-components/INDEX.md`
   + Motion-Doktrin (wann/wie animieren, Reduced-Motion-Pflicht) → `references/motion-doktrin.md`.
   Weitere Komponenten-Ideen (Glass/Mesh-Gradient/3D) nur als Vokabular →
   `references/ui-layouts-catalog.md`.
6. **build** — Umsetzung (Terra/Sol, Cross-Vendor `/codex:review`). Bei echtem Custom-Code
   zusätzlich `references/code-qualitaets-checkliste.md` gegen AI-Slop prüfen. Braucht der
   Build Datenbankzugriff zur Content-Prüfung → `references/readonly-db-rolle.md` (nie
   Schreibzugriff für Agenten).
7. **qa-faecher** — QA parallel: **Conversion · Design · A11y · Technik** (Schwarm gemischt).
   G1 Lighthouse/axe = 0, hart. Optional Persona-QA (Beginner/Engineer/Business-Owner).
   Fächer in `references/qa-faecher.md`. Conversion-Elemente (Popup/Lead-Magnet/Free-Tool) →
   `references/conversion-elemente.md`. Tiefere CRO-Diagnose bei Bestandsseiten →
   `references/cro-diagnose.md`.
8. **Launch** — **Signatur + Deploy-Egress-Gate.** Nie autonom. Neue/junge Domain →
   vorher `references/domain-safe-browsing-checkliste.md` durchgehen (Google-Safe-Browsing-Flag
   verhindern). Bei Referenz-Nachbau: Lizenz-Check aus `web-clone-playbook.md` muss geklärt sein.
9. **cro-learn** — CRO aus echten Analytics (Sonnet, G4). Für ein laufendes Test-Programm
   statt Einzelfixes → `references/experiment-programm.md` (ICE-Score, Experiment-Playbook).

## Loop-2-Ablauf (verbindlich)

Strategie (Fable, Checkpoint Raphael) → Sitemap + Copy sektionsweise (Sonnet, Voice+Proof;
G1-Stil → G2) → Art Direction (design, G1 impeccable) → Build (Terra/Sol, Cross-Vendor
`/codex:review`) → QA-Fächer parallel (G1 Lighthouse/axe = 0, hart) → Launch (Signatur +
Deploy-Egress-Gate) → CRO-Learning aus echten Analytics (Sonnet, G4).

## Statistik-/Linkbait-Seite als Vorlage

Für eine eigenständige Statistik-/Datenseite (Linkbait für seo, oder als
Ressourcenseite auf der Kundenwebsite): `references/templates/statistics-page-template.html`
— eigenständige HTML-Vorlage mit Chart.js, Article+FAQPage-Schema.org, mobile-first,
Print-Styles. Unverändert übernehmen, nur Inhalte/Branding ersetzen.

## Gotchas

- **Lighthouse/axe = 0 ist hart** — kein "fast fertig". Fertig = Environment-Tatsache (Regel 14).
- Art Direction nie selbst erfinden — Design läuft über **design** (Details in Sektion
  "Look & QA" oben, nicht doppelt hier).
- Build läuft Cross-Vendor geprüft: wer baut (Terra/Sol) ist nicht wer reviewt.
- Deploy = Rot-Klasse: nie autonom, immer Egress-Gate (Domain-Whitelist) + Signatur.
- CRO-Behauptungen nur aus echten Analytics (G4), nie aus Judge-Scores.
- **"Auf GitHub öffentlich" ≠ "frei nutzbar"** — beim Nachbauen einer Referenzseite immer
  den Lizenz-Check aus `web-clone-playbook.md` machen, sonst Urheberrechtsrisiko im
  Kunden-Launch (siehe dortige Iron Rule).
- **Junge Domain + Formular ist das Safe-Browsing-Flag-Muster** — vor jedem Launch auf
  neuer Domain die Checkliste in `domain-safe-browsing-checkliste.md` durchgehen, nicht
  erst wenn der rote Warnbildschirm schon da ist.
- Motion-Komponenten aus `ui-components/` nie ohne `useReducedMotion()`-Äquivalent
  einbauen — die globale CSS-Media-Query stoppt keine JS-Animationen.
