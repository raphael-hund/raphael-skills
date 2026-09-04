---
name: ultracode
version: 3.1.0
description: >
  Ultracode: sofort Dynamic Workflow starten und so viele Subagenten spawnen
  wie die Arbeit braucht — Opus, Grok, Kimi, Sol, Luna für Masse. Kein
  Ein-Builder-Deckel, kein 3-Item-Deckel. Trigger: /ultracode, ultracode,
  Ultracode-Effort.
class: O
scope: agency
sensitivity: internal
source: native Claude-Code Dynamic Workflows
loads:
  - references/nutzen.md
completion_criteria:
  - "Ein nativer Dynamic Workflow läuft oder ist in diesem Turn gestartet"
  - "So viele Leaf-Tasks wie isolierbare Pakete, nicht ein Parent der alles allein macht"
  - "agentType aus der Flotte; Luna nur Masse; kein rohes model-Override"
  - "Kein sequenzielles 3-Item-ultracode-Script, kein agent_budget 1"
---

# ultracode — so viele Subs wie nötig, sofort Workflow

Es gibt **keinen** Ein-Builder-Modus. Es gibt **keinen** 3-Item-Deckel.
Ultracode-Effort und `/ultracode` = **jetzt** natives Workflow-Tool plus
Tasks, so viele wie die offene Arbeit hat.

Der Parent ist nur Controller. Er baut die Site nicht allein, er macht keine
Typo-Welle, keine Foto-Serie, keine Dropdown-Debug-Session als Solo.

## Sofort

1. Offene Punkte in Pakete schneiden (Seite, Viewport, Fix, Shot, Datei, Serie).
2. Dynamic Workflow starten. Nicht erst eine Mini-Änderung selbst erledigen.
   Nicht warten auf „mehr als ein Item“. Ein Punkt darf ein Task sein, zehn
   Punkte dürfen zehn parallele Tasks sein.
3. So viele Subagenten spawnen wie Pakete existieren. Kein künstliches N.
   `workflowSizeGuideline` ist `unrestricted`. Keine Wellen-zu-6-Pflicht.
4. `agentType`, nie `model:`:

   | Paket | agentType |
   |---|---|
   | Frontend-Substanz / Integrator / harter Fix (Qualität) | `fable-builder` (max 2 parallel) |
   | Frontend in Breite (>2 parallele Pakete) | `opus-builder` |
   | Backend, Gate-Code, Copy | `sol-builder` |
   | Technischer Fix, Debugging | `grok-worker` |
   | Masse / Serie / Listen | `luna-worker` |
   | Architektur / Bulk | `terra-bulk` |

5. Nach jedem Build die Qualitätsschleife (`orchestrate/references/qualitaetsschleife.md`): G1 → Judge **anderer Familie** (`sol-pruefer`, `grok-critic`, `visual-kritiker`, `opus-critic` nach Nicht-Opus-Build) mit Score → ≤3 Runden → ESCALATE. Kimi tot.
   Mehrere gebaute Pakete = mehrere Kritiker-Tasks, parallel, nicht einer
   für die ganze Site. Self-Review `BLOCKED`.
6. Leaves starten keine Enkel. Rückgabe Verdict + Pfad, keine PNGs.

Shared UI: ein Integrator (`fable-builder` oder `opus-builder`). Alles andere mit disjunktem
`write_set` parallel.

## Tot, nicht aufrufen

- `/workflow ultracode` mit `agent_budget: 1`
- „höchstens drei Items“, „genau ein Builder“, „kein Fan-out“
- Kimi (tot, 03.09.2026); Grok nur nach Sondererlaubnis
- Sonnet, Haiku als Worker; Fable nur über `fable-builder` (max zwei parallel), nie über rohes `model:`

## Start

Effort **Ultracode** oder `/ultracode <auftrag>` → in **diesem** Turn
Workflow an, Subs raus. Nicht erst Parent-Edits.
