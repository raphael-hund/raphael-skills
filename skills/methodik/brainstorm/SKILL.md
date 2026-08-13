---
name: brainstorm
version: 1.0.0
description: >-
  Kompatibilitäts-Adapter für /brainstorm. Enthält keine eigene
  Brainstorm-Logik: Zielklärung läuft über plan (GRILL/SPEC), die
  Perspektiven-Arbeit über den kanonischen Workflow `ultracode` mit
  mode "brainstorm" (drei Luna-Perspektiven, je ein frischer
  Sol-Kritiker, Synthese erst nach PASS aller drei). Trigger:
  /brainstorm, "brainstorme", "Lösungsrichtungen entwickeln".
class: O
scope: agency
sensitivity: internal
completion_criteria:
  - "Workflow ultracode (mode brainstorm) gestartet und Ergebnis mit PASS aller drei Perspektiven berichtet"
---

# brainstorm — Adapter auf plan + ultracode

Dieser Skill delegiert nur. Er brainstormt nie selbst inline.

## Ablauf (zwingend)

1. **Zielklärung** über [`plan/SKILL.md`](/root/raphael-skills/skills/methodik/plan/SKILL.md),
   Stufe `GRILL` (Annahmen unklar) oder `SPEC` (Idee da, Wie offen).
2. Danach Workflow `ultracode` starten mit:

```json
{
  "mode": "brainstorm",
  "task": "<das geklärte Problem in einem prüfbaren Satz>",
  "paths": ["</absoluter/ablage-pfad/für/die/spec>"],
  "gate": "<ausführbarer Check, z.B. Spec-Datei existiert und Lint besteht>"
}
```

3. Der Workflow erzeugt **drei Luna-Items** mit bewusst unterschiedlichen
   Perspektiven: konservativ, ausgewogen, ambitioniert.
4. Jede Perspektive bekommt einen **separaten frischen Sol-Kritiker**
   (andere Modellfamilie, max. 3 Runden).
5. **Synthese erst nach PASS aller drei Items.**
6. **Keine Umsetzung**, bevor Raphael die Spec ausdrücklich freigegeben hat.

## Verbote

- Kein Inline-Brainstorm ohne Workflow.
- Keine eigene Perspektiven-Logik hier pflegen — `plan` bleibt kanonisch,
  der Workflow [`ops/workflows/ultracode.js`](/root/raphael-command-center/ops/workflows/ultracode.js)
  ist die einzige ausführbare Quelle.
