# Impeccable-Detektoren auf v4.0.5 nachziehen (59 Regeln, craft-floor Refuse-Block)

Type: task
Status: resolved
Blocked by: 07

## Question

AFK nach Ticket 07: scripts/detector/ im design-Skill auf den Original-Stand (/root/.agents/skills/impeccable, Apache-2.0) bringen, 14 neue Regel-IDs und 2 Umbenennungen in impeccable-detektoren.md dokumentieren, craft-floor-de.md um den Verify-Block 'Browser surfaces' und die 8 Refuse-Punkte ergänzen, VENDORING.md mit Version/Datum, evals/run-detect-check.mjs und run-browser-detect-check.mjs um Fälle für die neuen Regeln erweitern. Beleg: Evals grün, Regelzahl 59 in run-doku-zahlen.mjs. Quelle: Ticket 05.

## Resolution (2026-09-03)

Detektor-Kern auf impeccable v4.0.5 mit 59 Registry-Regeln nachgezogen; lokale Sicherheits-/CSS-Anpassungen erhalten. `design` steht auf 0.5.0, VENDORING dokumentiert Re-Sync und Herkunft. Belege: `run-detect-check` 36/36, `run-browser-detect-check` 40/40, `run-doku-zahlen` 10/10, validate-skill OK. Opus-Bau/Integration, echte Grok-Kritik PASS (`wf_108e5eb3-8bb`, `wf_99c16e76-3d7`).
