---
name: printingpress
description: "Druckt agent-native CLI + SKILL.md für API-only Services aus einem Prompt. Target: ads-research, seo, pipedrive, trello. Intake → Draft-Welle (1-3 Luna parallel) → G1 mechanical → G2 cross-family → _candidates/. Nutze NUR wenn Raphael explizit 'printingpress' oder 'CLI für X' sagt."
class: O
scope: global
sensitivity: internal
requires_skills: ["eval"]
loads: []
version: 0.1.0
completion_criteria:
  - "skills/_candidates/<name>/SKILL.md existiert mit G1 + G2 + Provenienz"
  - "ops/review-inbox.md hat Eintrag mit Datei-Pfad"
  - "Dedupe gegen index.json + _candidates/ bewiesen (grep)"
  - "Kein Write nach eigene/ops/methodik/ ohne Raphael-Signatur"
---

## Wann nutzen

Nur wenn Raphael **explizit** sagt:
- "printingpress für X"
- "CLI für [Service] generieren"
- "Skillify [API-only Tool]"

**Nicht** automatisch bei jedem API-Schmerz — warte auf expliziten Trigger.

## Eingabe

Ein API-Service-Name + URL oder OpenAPI-Spec:
- `printingpress ads-research` → Meta Ads Archive API
- `printingpress seo` → Google Search Console API
- `printingpress pipedrive` → Pipedrive REST API

## Ausgabe

**Immer** landet in:
- `skills/_candidates/<name>/SKILL.md`
- `skills/_candidates/<name>/references/` (optional)
- Eintrag in `ops/review-inbox.md`

**Nie** direkt nach `eigene/`, `ops/`, `methodik/`.

## Pipeline (7 Luna + 1 Sol)

**Stage 0 — Intake (1 Luna, billig)**
- Spec einlesen (Name + URL/Spec)
- Dedupe gegen `index.json` + `_candidates/*/SKILL.md` (grep-Beleg)
- Bei Treffer: STOP, existiert schon

**Stage 1 — Draft-Welle (1-3 Luna parallel, Effort max)**
- 1 Luna bei R-Klasse (Router)
- 2-3 Lunas bei F/O-Klasse (Kundenoutput/Orchestrierung)
- Jeder Draft: 7 Pflichtfelder aus SKILL-VERTRAG, `## Gotchas` mit echtem Eintrag, `completion_criteria` als Fakten, Parameter-Signatur, < 300 Zeilen

**Stage 2 — G1 (deterministisch, kein LLM)**
1. `python3 tools/validate-skill.py <candidate-pfad>`
2. Zeilenbudget `wc -l < 300`
3. Alle `loads:`/`references/` existieren real
4. `requires_skills` löst auf `index.json` auf
5. Kein Namens-Duplikat

Fehlschlag → max 3 Fix-Runden, dann FAIL.

**Stage 3 — Funktions-Smoke (deterministisch)**
- Bei Skript-Skills: minimales Stdlib-Only-Beispiel
- Bei Router-Skills: `description`-Trigger deterministisch matchen

**Stage 4 — G2 (cross-family, Regel 8)**
- Standard: `kimi-recherche` gegen Rubrik aus SKILL-VERTRAG
- Hohe Einsätze: Sol+Opus-Tandem
- 3-6 binäre Fragen, Schwelle 0.7, Median

**Stage 5 — Landung**
- Provenienz (Spec-Quelle, Luna-Worktrees, G1/G2-Output) in `_candidates/<name>/`
- Eintrag `ops/review-inbox.md`
- Promotion nur durch Raphael

## Gotchas

- `build-index.py` filtert `_candidates/` jetzt korrekt (Fix 2026-08-09)
- Codex-Compatibility + Sync-Installer **nie** anfassen — nur bei Promotion durch Raphael
- `r-`-Präfix existiert nicht mehr seit 2026-07-20
- Zielordner (`eigene/`, `ops/`, `methodik/`) wird vorgeschlagen, nicht entschieden

## Parameter

Aufruf: `printingpress(service: str [pflicht], spec_url: str [optional], class: str [optional R|F|O])`

- `service`: Klarname (z.B. `ads-research`, `seo`, `pipedrive`)
- `spec_url`: OpenAPI-Spec oder Landingpage (default: Recherche)
- `class`: Skill-Klasse (default: O für Orchestrierung)