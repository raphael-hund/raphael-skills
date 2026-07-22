---
name: "kimi-first"
description: "Delegiert ein Arbeitspaket an die Kimi-CLI (Kimi K3, 1M Kontext, Weg 2, non-interaktiv) und lässt Codex coordinator das Ergebnis als strenger Reviewer abnehmen. Ideal für Riesen-Kontexte/ Volumen; billig/anders bauen (Kimi), teuer prüfen (Codex coordinator), Merge behält Codex coordinator. Trigger: \"/kimi-first\", \"an Kimi geben\", \"kimi -p\", \"riesiger Kontext\", \"1M ingest\", \"Cross-Vendor-Bau\""
---

# kimi-first — Codex source adapter

Read the complete canonical source file before acting:
`/root/raphael-skills/skills/eigene/kimi-first/SKILL.md`

The source skill is authoritative for safety, scope, procedure, and completion. Do not copy or paraphrase source content into this adapter.

Codex mapping:
- Claude/Cockpit = current Codex coordinator.
- Read/Bash = current file/terminal tools.
- AskUserQuestion = normale Userfrage.
- Never pretend that a missing tool exists.
- Create new or background threads only when the user explicitly requests them.
- Keep every source safety and completion requirement authoritative.
