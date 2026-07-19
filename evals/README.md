# evals/ — Eval-Daten pro Skill (SkillOpt-Format)

> **TLDR:** Pro Skill eine Datei `benchmark.jsonl` (sichtbar, zum Optimieren) und eine
> `held-out.jsonl` (ehrliche Endprüfung, nie zum Optimieren benutzen). Format adoptiert aus
> gbrain-evals SkillOpt: eine JSON-Zeile pro Fall, Rule-Judge mit Regex-Checks —
> deterministisch und kostenlos. Konzept/Trennung: `raphael-command-center/evals/HELDOUT.md`,
> Nachweis-Format: `raphael-command-center/evals/scorecard-schema.md`.

## Format

```json
{"task_id":"bm-<skill>-001","task":"<Auftrag an das Modell>","judge":{"kind":"rule","checks":[{"op":"regex","arg":"..."}]}}
```

- `task_id`: `bm-` = benchmark, `hd-` = held-out.
- `judge.checks`: alle Regex-Checks müssen auf dem Output matchen (AND). Patterns so wählen,
  dass sie in JS- und Python-Regex gleich funktionieren (keine Lookarounds).

## Bestand

| Skill | benchmark | held-out |
|---|---|---|
| `r-tdd` | 5 Fälle | 3 Fälle |
| `r-code-review` | 4 Fälle | 3 Fälle |
| `r-copywriting` | 4 Fälle | 3 Fälle |

## Regeln

- **Held-out nie im Optimierungs-Loop** sehen/lesen — nur für die finale Bewertung
  (siehe HELDOUT.md: der Optimizer wird nie mit dem Scorer final bewertet, gegen den
  optimiert wurde).
- Solange der `eval-runner`-User nicht existiert, ist die Versiegelung **Konvention, kein
  Dateischutz** — ehrlich markiert, nicht scharf.
- Regex-Judges prüfen **Struktur, nicht Qualität**. Das „gut" bleibt bei G2-LLM-Judges
  (Rubriken im command-center) und Raphaels Signatur.
