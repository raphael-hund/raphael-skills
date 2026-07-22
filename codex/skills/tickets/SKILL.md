---
name: "tickets"
description: "Zerlegt einen Plan, eine Spec oder das laufende Gespräch in tracer-bullet Tickets — vertikale Slices mit expliziten Blocking-Kanten statt horizontaler Layer-Schnitte. Priorisiert per Tiebreaker (Unblocker zuerst, Security-Funde mit hoher Konfidenz vorziehen, \"nicht wert\" ist ein gültiges Verdikt). Trigger: \"Tickets schreiben\", \"in Tickets aufteilen\", \"Backlog bauen\", \"to-tickets\""
---

# tickets — Codex source adapter

Read the complete canonical source file before acting:
`/root/raphael-skills/skills/methodik/tickets/SKILL.md`

The source skill is authoritative for safety, scope, procedure, and completion. Do not copy or paraphrase source content into this adapter.

Codex mapping:
- Claude/Cockpit = current Codex coordinator.
- Read/Bash = current file/terminal tools.
- AskUserQuestion = normale Userfrage.
- Never pretend that a missing tool exists.
- Create new or background threads only when the user explicitly requests them.
- Keep every source safety and completion requirement authoritative.
