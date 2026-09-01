# Cross-Model + Cross-Harness — Pflicht-Zuteilung

> Ergänzt `dispatch.md` (Felder/Kontrakt) und
> [`HARNESS-ROUTER-MATRIX.md`](/root/raphael-command-center/ops/HARNESS-ROUTER-MATRIX.md)
> (Harness-Ebene). Hier: **wer** bekommt **welche** Sub-Action und **über
> welches Werkzeug**.

## Drei Ebenen (Reihenfolge)

1. **Harness** — Claude Code, Codex CLI, Kimi CLI, T3, Hermes, MCP-Worker
2. **Modell / agentType** — Luna, Sol, Terra, Opus, Kimi K3, Grok …
3. **Seat** — Gateway 8317 rotiert innerhalb der Familie; nie stiller
   Provider-Wechsel

Nie rückwärts routen („noch Kimi-Quota, also alles Kimi").

## agentType-Karte (Claude-Cockpit Terminal)

| agentType | Familie | Typische Sub-Actions | Effort-Hinweis |
|---|---|---|---|
| `opus-builder` | Claude | Frontend, Substanz, ein UI-Integrator | high |
| `opus-critic` | Claude | Read-only Kritik nach Nicht-Opus-Build | high |
| `sol-builder` | GPT | begrenzter Code mit Gate | max |
| `sol-pruefer` | GPT | Ship-Review nach Nicht-GPT-Build | max |
| `kimi-worker` | Kimi | Synthese, DE-Copy, Gegenposition | high, **nur K3** |
| `kimi-recherche` | Kimi | Read-only Recherche | high, **nur K3** |
| `kimi-critic` | Kimi | Read-only Kritik nach Nicht-Kimi-Build | high, **nur K3** |
| `grok-worker` | Grok | technische Fixes, Debugging, hartes Engineering | high |
| `grok-critic` | Grok | Read-only technisches Urteil nach Nicht-Grok-Build | high |
| `visual-kritiker` | Grok | read-only visuell; Verdict plus Pfad, nie PNG | high |
| `luna-worker` | GPT | Masse, Serie, mechanische Listen | max |
| `terra-bulk` | GPT | Multi-File-Migration, Architektur-Umbau | max |

**Verboten als Subagent:** Haiku und Sonnet. Fable nur als
`fable-advisor`; rohe Fable-Spawns und andere Fable-Agenttypen sind verboten.
Opus nur als `opus-builder` oder `opus-critic`.
**Verboten:** Kimi HighSpeed / K2.7.

## Wann welche Flotte (Minimum)

| Aufgaben-Klasse | Minimum-Flotte | Warum |
|---|---|---|
| Feature / Website | `opus-builder` + `sol-pruefer` | Default-Paar; visuell extra `visual-kritiker` |
| Code-Paket | `sol-builder` + `opus-critic` | Sol baut, Opus prüft |
| Copy / Recherche | `kimi-worker` + `sol-pruefer` oder `opus-critic` | Kimi baut, andere Familie prüft |
| Visuelles QA | `visual-kritiker` (Verdict + Pfad) | nach Grok-Build: `opus-critic` oder `sol-pruefer` |
| Masse / Serie | `luna-worker` + `opus-critic` | Luna nur Masse, Kritik andere Familie |
| Bulk/Migration | `terra-bulk` + `opus-critic` | Terra=GPT, also nicht `sol-pruefer` |
| Technischer Fix | `grok-worker` + `sol-pruefer` | Grok baut klug, Sol prüft |

**Luna nur für Masse:** `luna-worker` bekommt Serien, Listen und mechanische
Edits — nicht Entscheidungen, nicht Frontend-Substanz, nicht visuelles Urteil.

## Harness-Wahl

| Situation | Harness / Weg |
|---|---|
| Standard-Orchestrierung im Terminal | Claude Code + Agent-Tool (`agentType:…`) über Gateway |
| Claude Desktop / RAPHAEL-Session | dieselben `agentType`s; Failover schreibt die Lane anhand der Rollen-Nadel um |
| Ein großes GPT-Schreibpaket, native Sichtbarkeit | `codex-first` oder `codex exec --profile luna\|terra\|sol` |
| Riesen-Kontext / DE-Volumen nativ | `kimi-first` oder Kimi-CLI; Swarm max Tiefe 2 |
| Codex als Sub-Orchestrator (Seats ok) | Sol plant → Luna/Terra `multi_agent_v2` (max_depth=1, max_threads=6); Cross-Familie zurück ins Claude-Cockpit |
| T3-Thread | **ein** Harness pro Thread; Modell-Logik lebt im Harness, nicht in T3 |
| Hermes | nie als Router/Cockpit; Output nur Candidates |

## Cross-Vendor-Bausteine einstecken

- **codex-first:** ein Codex-Paket → Claude reviewt + Tests selbst fährt.
  Nutzen wenn Terra/Luna nativ besser sind als Gateway-agentType, oder wenn
  der Diff als Codex-Task sichtbar bleiben soll.
- **kimi-first:** ein Kimi-Paket → Claude reviewt. Nutzen bei 1M-Kontext /
  DE-Text-Volumen / leeren Codex-Seats.
- Beide ersetzen **nicht** die Flotte: Mechanik-Tests und Zweitfamilie bleiben.

## Degraded-Pfade (nicht improvisieren)

1. **Codex/GPT tot** (`degraded-gpt.flag` oder Incident): `luna-worker` /
   `terra-bulk` / `sol-pruefer` → `opus-builder` + `kimi-recherche`/`kimi-worker`
   für Regel 8. Melden, nicht verschweigen.
2. **Claude-Seats voll:** Gateway rotiert 1→4; danach Kimi als Abo-Fallback
   (ROUTING). Kein PAYG-Ausweichen.
3. **Kimi-Quota:** nur K3; HighSpeed verboten. Ausfall nennen, mit
   Claude+GPT weiter.
4. **`unsupported model`:** systemd-Log Failover-Proxy, dann curl gegen
   `:8317` — nicht den Task abbrechen.

## Prompt-Pflicht je Sub-Action

Jeder Dispatch enthält mindestens:

```
agentType: <luna-worker|…>   # oder MODELL + EFFORT
ROLLE:     Worker | Verifier | …
AUFGABE:   ein Paket, ein Output
INPUT:     Task-Ausschnitt (TB2)
OUTPUT:    Zielpfad oder Schema
GATE:      Prüfbefehl / eval-Gate
TRUST:     untrusted-bis-cross-review
HARNESS:   claude-agent | mcp-codex | mcp-kimi | codex-native | kimi-native
```

Parallele Writer: disjunkte `write_set`. Index/Lock: ein Owner am Ende.

## Anti-Muster

- Alles auf einer Familie, „später mal Sol“ → **kein** Cross-Model.
- Leader schreibt den Plan nach dem Distill selbst → Selbstbestätigung.
- Parent liest Screenshot-PNGs selbst statt `visual-kritiker` mit Pfad-Rückgabe.
- Gleiche Familie baut und ship-reviewed → Regel 8 verletzt.
- Fable als rohes `model` oder anderer `agentType` → verboten.
  Erlaubt ist nur `agentType:'fable-advisor'` mit low effort.
- Builder ohne Kritiker, oder Kritiker derselben Familie → Regel 8 verletzt.
