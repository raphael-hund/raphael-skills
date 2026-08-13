# Rollen + Gauntlet

Parent orchestriert und bedient User-Gates. Schwere Phasen laufen im Workflow über Sub-Agents.

## Rollen (was abgedeckt sein muss)

| Rolle | Output |
|---|---|
| Research | `01-firma-dossier` |
| Reach | `01b-online-praesenz` |
| Research Critic | `01c-research-critic` |
| Assets | `02` + `02b` |
| SEO Draft | `03?` + `04` |
| SEO Critic | `04b` |
| Growth Critic | `04c` |
| IA Worker A/B | Entwürfe |
| IA Judge | `05-ia-variants` + Empfehlung |
| Copy | `06-seiten/*` |
| Humanizer | dieselben Dateien, `READY_FOR_VERIFY` |
| Specs | Spec-Blöcke in `06` |
| Design Research | Captures + `reference-manifest.md` + `G-REF` |
| Design | 3 Richtungen + `briefs.md` + `gpt-prompts.md` + Vergleichs-Heros |
| Design-System | `07` |
| Components | `08` |
| Roadmap | `10` + `12` |
| Final Critic | `13` |

Host wählt konkrete `agentType`s. Templates schlagen Defaults vor; bei Quota andere Familie gleicher Rolle.

## Gauntlet-Muster

```
1) Sub-Agent A: Draft / Variante
2) Sub-Agent B: greift an (andere Modellfamilie)
3) Merge → eine Datei-Wahrheit
```

Cap: max. 4–6 schwere Agents gleichzeitig im Parent-Sinne; Workflow-Engine darf queueen.

## Tempo-Defaults (agentType)

| Rolle | agentType | Parallel |
|---|---|---|
| Assets Inventar | `luna-worker` (Shards) | 4 Shards + 1 Merge |
| Assets Merge / Gaps | `luna-worker` | 1 |
| SEO Draft | `opus-builder` | 1 |
| Copy Draft | `kimi-worker` | 4 Shards |
| Humanizer | `kimi-worker` | 4 Shards (nach Copy) |
| Specs | `luna-worker` | 4 Shards |
| Design Research | `grok-worker` | 1 |
| Design Varianten | `kimi-worker` | 1 |
| Bild-Gen (extern) | `luna-worker` | 1 Bild/Agent, max 5 |
| Critics / Judge | `sol-pruefer` / `kimi-recherche` | parallel wo möglich |

**Verboten für Tempo:** `opus-builder` auf Inventar, Massen-Read, oder einen Humanizer-Lauf über alle `06-seiten/*`.

