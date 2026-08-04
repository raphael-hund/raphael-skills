---
name: "no-ai-slop"
description: "Feuert beim Redigieren/Verfeinern englischer UND deutscher Texte, die nach KI klingen sollen — und bei der Frage \"liest sich das nach AI?\". Zweit-Meinung als scharfer menschlicher Editor NACH dem copywriting-Skill: erkennt 20+ AI-Slop-Muster (binary contrasts, throat-clearing, faux-insight, colon reveals, importance puffery, weasel attribution u.a.), entfernt sie mit minimalen Eingriffen und bewahrt dabei die Stimme des Autors. Trigger: \"klingt nach KI\", \"humanize\", \"schärfer machen\", \"AI slop raus\", \"ist das AI-slop?\", \"audit this text\", \"make it sound human\"."
---

# no-ai-slop — Codex source adapter

Read the complete canonical source file before acting:
`/root/raphael-skills/skills/eigene/no-ai-slop/SKILL.md`

The source skill is authoritative for safety, scope, procedure, and completion. Do not copy or paraphrase source content into this adapter.

Codex mapping:
- Claude/Cockpit = current Codex coordinator.
- Read/Bash = current file/terminal tools.
- AskUserQuestion = normale Userfrage.
- Never pretend that a missing tool exists.
- Create new or background threads only when the user explicitly requests them.
- Keep every source safety and completion requirement authoritative.
