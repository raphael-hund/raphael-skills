---
name: r-seo
version: 0.1.0
description: >
  Feuert für SEO (Loop 4): Keyword-/SERP-Research, Informationsarchitektur,
  Briefs, Produktion, Tech-QA, GSC-Monitoring, Refresh. Trigger: "SEO",
  "Keyword-Research", "Content-Brief", "Ranking", "Tech-Audit".
class: F
scope: agency
sensitivity: internal
loads: [references/loop4-ablauf.md, references/tech-qa-checkliste.md]
requires_skills: [r-copywriting@^0, r-eval@^0]
completion_criteria:
  - "Tech-QA 0 Blocker (Meta/Schema/Canonical/Links) — G1 hart"
  - "G2 auf jedem Ship-Text >= 0.7"
  - "Publish nur mit Raphaels Signatur"
---

# r-seo — Loop 4: SEO

**Lies zuerst:**
`/root/clients/client-<name>/wiki/ICP.md`, `OFFER.md`, `VOICE.md` (Dossier aus Loop 1),
`/root/raphael-brain/wiki/hot.md`. Stil immer über **r-copywriting**.

## Zweck (1 Satz)

Aus Suchintention belegbaren, technisch fehlerfreien Content bauen, der rankt, und bei
Ranking-Decay auffrischen.

## Ablauf (Detail in references/loop4-ablauf.md)

1. **research** — Keyword-/SERP-Research (Kimi räumt Volumen auf, Luna klassifiziert). G1.
2. **ia** — Informationsarchitektur: Themen-Cluster, Pillar/Cluster-Struktur (Sonnet). G2.
3. **briefs** — Content-Briefs pro Seite (Sonnet): Intent, Entitäten, Struktur, interne Links. G2.
4. **produce** — Produktion (Volumen billig — Haiku/Luna; Qualitäts-Pass Sonnet). G1-Stil → G2.
5. **tech-qa** — Skripte (`references/tech-qa-checkliste.md`). **G1 = 0 Blocker, hart.**
6. **Publish** — **Raphaels Signatur.**
7. **monitor** — GSC-Monitoring (Haiku/Luna), read-only Snapshot → Outcome-Daten (G4).
8. **refresh** — bei Ranking-Decay auffrischen (Haiku/Luna, G4).

## Loop-4-Ablauf (verbindlich)

Keyword-/SERP-Research (Kimi räumt auf, Luna klassifiziert, G1) → IA + Briefs (Sonnet, G2) →
Produktion (Volumen billig, Qualitäts-Pass Sonnet; G1-Stil → G2) → Tech-QA (Skripte, G1 =
0 Blocker, hart) → Publish (Signatur) → GSC-Monitoring + Refresh bei Ranking-Decay
(Haiku/Luna, G4).

## Gotchas

- **Persona-Skills ersetzen kein Fachwissen (Warnung D38).** SEO-Technik kommt aus echten
  SERPs + Erfahrung, nicht aus einem "SEO-Experten"-Prompt.
- Tech-QA 0 Blocker ist hart: Meta/Schema/Canonical/Links müssen sauber sein, sonst kein Publish.
- GSC-Zugang read-only, per Snapshot — nie Schreib-Scope (Konnektoren-Regel).
- Volumen billig, Qualität teuer: Massen-Produktion Haiku/Luna, aber Qualitäts-Pass Sonnet
  vor G2 — nicht roh ausliefern.
- Refresh-Trigger = echter Ranking-Decay (G4), nicht Kalender.
