---
name: ultra-loop
version: 1.0.0
description: >
  Dünner Router für /ultra-loop: lädt ausschließlich orchestrate und delegiert
  an dessen Betriebsart LOOP. Die kanonische Dauer-Verbesserungs-Mechanik lebt
  nur dort. Trigger: "/ultra-loop", "Ultra-Loop",
  "Dauer-Verbesserungs-Loop".
class: R
scope: agency
sensitivity: internal
source: pointer — die kanonische LOOP-Bedeutung liegt in orchestrate
loads: []
requires_skills: [orchestrate@^1]
completion_criteria:
  - "orchestrate ist geladen"
  - "Die Betriebsart LOOP ist ausdrücklich genannt"
  - "Die kanonischen LOOP-Gates aus orchestrate sind erfüllt"
---

# ultra-loop — dünner Router auf orchestrate/LOOP

## Weiterleitung

Wenn dieser Skill feuert:

1. **orchestrate** laden.
2. Die Anfrage ausdrücklich als Betriebsart **LOOP** an orchestrate weiterreichen.
3. Danach ausschließlich den Regeln, Gates und dem Protokoll von orchestrate
   folgen. Dieser Router besitzt keine eigene Ablaufbedeutung.

## Gotchas

- Keine LOOP-Regeln hier ergänzen oder duplizieren — `orchestrate` ist die einzige
  kanonische Quelle.
- `/ultra-loop` ist nur ein Trigger und kein zweiter Orchestrierungsweg.
