---
name: r-web
version: 0.1.0
description: >
  Feuert für Websites/Landingpages (Loop 2): Strategie, Sitemap, Copy,
  Art Direction, Components, Build, QA, CRO-Learning. Trigger: "Website bauen",
  "Landingpage", "Sitemap", "Website-QA", "CRO".
class: F
scope: agency
sensitivity: internal
loads: [references/loop2-ablauf.md, references/qa-faecher.md]
requires_skills: [r-copywriting@^0, r-design@^0, r-eval@^0]
completion_criteria:
  - "Lighthouse/axe = 0 Fehler (G1, hart)"
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

## Ablauf (Detail in references/loop2-ablauf.md)

1. **strategy** — Ziel, Zielgruppe, Konversionspfad (Fable, Checkpoint Raphael).
2. **sitemap** — Seitenstruktur + Sektionsplan (Sonnet).
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
- Art Direction nie selbst erfinden — **r-design** ist die einzige Design-Wissensquelle
  (Landing→taste, App/Dashboard→ui-ux, finale QA immer impeccable).
- Build läuft Cross-Vendor geprüft: wer baut (Terra/Sol) ist nicht wer reviewt.
- Deploy = Rot-Klasse: nie autonom, immer Egress-Gate (Domain-Whitelist) + Signatur.
- CRO-Behauptungen nur aus echten Analytics (G4), nie aus Judge-Scores.
