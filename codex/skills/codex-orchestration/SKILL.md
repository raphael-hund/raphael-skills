---
name: "codex-orchestration"
description: "Create, route, continue, monitor, and synthesize real user-visible Codex App tasks across the cloud models exposed by the live app, including OpenAI, Codex coordinator, Kimi, and Grok when available. Use for visible sub-threads, separate tasks, model comparisons, multi-model fan-out, Planner/Advisor/Designer/Executor workflows, Kimi or Grok tasks, or any request that explicitly wants Codex App tasks instead of hidden parallel contributors, workflow workers, CLI sessions, or background agents."
---

# codex-orchestration — Codex source adapter

Read the complete canonical source file before acting:
`/root/raphael-skills/skills/eigene/codex-orchestration/SKILL.md`

The source skill is authoritative for safety, scope, procedure, and completion. Do not copy or paraphrase source content into this adapter.

Codex mapping:
- Claude/Cockpit = current Codex coordinator.
- Read/Bash = current file/terminal tools.
- AskUserQuestion = normale Userfrage.
- Never pretend that a missing tool exists.
- Create new or background threads only when the user explicitly requests them.
- Keep every source safety and completion requirement authoritative.
