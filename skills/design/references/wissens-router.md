# Wissens-Router (Second Brain) — design

Die belegte, aufgabengenaue Substanz liegt als Wissensseiten unter
`/root/raphael-brain/wiki/webdesign/`. Trifft eine Aufgabe ein Spezialthema,
lies die passende Seite mit dem **Read-Tool** nach, *bevor* du arbeitest — nie
aus dem Gedächtnis diagnostizieren. Immer nur die 1–3 wirklich relevanten
Seiten laden, nie alle 21.

| Wenn die Aufgabe … | dann lies |
|---|---|
| States/Formulare: Hover/Focus/Active/Disabled, A11y-Zustände | `interaction-states-and-accessibility.md` |
| Farben: Systematik, Skalen, Kontrast-Entscheidungen | `color-system.md` |
| Typo: Skalen-/Hierarchie-System jenseits der Basiswerte | `2026-07-20-typography-system.md` |
| Motion/Performance: Feinschliff-Motion-Muster | `motion-polish.md` |
| Motion/Performance: Ruckeln/Jank diagnostizieren, Perf-Patterns | `effekt-performance-patterns.md` |
| Anti-Slop-QA: Detailqualität jenseits der Scanner | `detail-quality.md` |
| Anti-Slop-QA: Vereinfachen ohne Substanz zu verlieren | `2026-07-20-simplification.md` |
| Anti-Slop-QA: Art-Direction-Slop erkennen | `2026-07-20-art-direction-and-anti-slop.md` |
| Referenz-Site: welche Referenz überhaupt taugt | `2026-07-20-reference-selection.md` |
| Referenz-Site: Rebuild-Prompt-Vertrag (Destillation, nicht Klon) | `2026-07-20-rebuild-prompt-vertrag.md` |
| Micro-Interactions (Hover-Feedback, Toasts, Feingranulares) | `micro-interaction-patterns.md` |
| Responsive Layout jenseits der Grundregeln | `responsive-layout.md` |
| Design-System-Aufbau/Workflow | `design-system-workflow.md` |
| Frontend-Framework-Wahl/Routing | `frontend-framework-routing.md` |
| Komponenten-Routing (welche Lib für welchen Fall) | `component-routing.md` |
| Asset-/CDN-Strategie | `2026-07-20-asset-strategie-cdn-konstante.md` |
| Premium-Landing-Motion-DNA (Referenzmuster) | `2026-07-20-premium-landing-motion-dna.md` |
| Freisteller/Higgsfield ohne transparenten Leerraum | `2026-07-20-higgsfield-freisteller-ohne-transparenten-leerraum.md` |
| Website-Truth-Contract (keine erfundenen Facts/Claims) | `website-truth-contract.md` |
| Device-Mockups (Morflax-Workflow) | `morflax-device-mockup-workflow.md` |
| Gradient-Workflow (Feralui) | `feralui-gradient-workflow.md` |

**Kern vs. Tiefe:** Die operativen `references/` (design-doktrin, impeccable-
Detektoren, ai-slop-*, motion-doktrin, farben-oklch, typografie,
ui-polish-details) sind der **Kern** jeder Arbeit; die `wiki/webdesign/`-Seiten
oben sind **Tiefen-Nachschlag** für Spezialfälle. Bei Überschneidung
(z. B. Typo-Skala: `references/typografie.md` vs. `typography-system.md`)
**führt die `references/`-Quelle**, die Wiki-Seite ergänzt mit tieferem Beleg.
