# Cross-Model + Cross-Harness — Pflicht-Zuteilung

> Ergänzt `dispatch.md` (Felder/Kontrakt) und
> [`HARNESS-ROUTER-MATRIX.md`](/root/raphael-command-center/ops/HARNESS-ROUTER-MATRIX.md)
> (Harness-Ebene). Hier: **wer** bekommt **welche** Sub-Action und **über
> welches Werkzeug**.

## Drei Ebenen (Reihenfolge)

1. **Harness** — Claude Code, Codex CLI, Kimi CLI, T3, Hermes, MCP-Worker
2. **Modell / agentType** — Luna, Sol, Terra, Sonnet, Kimi K3, …
3. **Seat** — Gateway 8317 rotiert innerhalb der Familie; nie stiller
   Provider-Wechsel

Nie rückwärts routen („noch Kimi-Quota, also alles Kimi").

## agentType-Karte (Claude-Cockpit Terminal)

| agentType | Familie | Typische Sub-Actions | Effort-Hinweis |
|---|---|---|---|
| `luna-worker` | GPT | Tests schreiben/laufen, Mechanik-Patches, Recherche, begrenzte Umbauten, Smoke | Gateway erzwingt max |
| `terra-bulk` | GPT | Multi-File-Migration, Architektur-Umbau, Bulk-Rename | high/max |
| `sol-pruefer` | GPT | Ship-Review, Urteil, Chairman, adversarialer Critic | high (B1) |
| `sonnet-worker` | Claude | Drafts, Integration, normaler Feature-Bau | standard/high |
| `kimi-worker` | Kimi | Frontend, DE-Marketing-/Sales-Text, UI-Copy | high, **nur K3** |
| `kimi-recherche` | Kimi | Read-only Zweitmeinung, Gegenperspektive, Dritt-Familie | high, **nur K3** |

**Verboten als Subagent:** Fable, Opus (Cockpit only). **Verboten:** Kimi
HighSpeed / K2.7.

## Wann welche Flotte (Minimum)

| Aufgaben-Klasse | Minimum-Flotte | Warum |
|---|---|---|
| Mechanik + Tests | `luna-worker` + `sonnet-worker` | Luna tippt, Claude spot-checkt |
| Feature-Bau | `sonnet-worker` oder `kimi-worker` + `luna-worker` (Tests) + Verifier andere Familie | Bauen ≠ Prüfen |
| Frontend / DE-Copy | `kimi-worker` + `luna-worker` + Review Claude/Sol | Kimi-Stärke + Cross-Review |
| Bulk/Migration | `terra-bulk` + `luna-worker` (Tests) + `sol-pruefer`/`sonnet` Review | Volumen + Urteil |
| Ship / Auslieferung | Builder-Familie A + `sol-pruefer` (oder Sonnet+Kimi-Panel) | Regel 8 + B1 |
| Streit / Architektur | Council: Sonnet + Sol + Kimi | Drei Familien |
| Nur Lesen / Map | `luna-worker` + optional `kimi-recherche` | billig + Gegenblick |

**Luna-Bias (Raphael 03.08.):** Isolierbare Sub-Actions (Tests, Fixes,
Recherche-Häppchen, Verify-Scripts) **zuerst** an `luna-worker` — nicht an
das Cockpit und nicht standardmäßig an Sonnet, solange Luna erreichbar ist.

## Harness-Wahl

| Situation | Harness / Weg |
|---|---|
| Standard-Orchestrierung im Terminal | Claude Code + Agent-Tool (`agentType:…`) über Gateway |
| Claude Desktop / Web-Session | **nur** MCP: `mcp__raphael-codex-worker__codex_worker` / `kimi_worker` — keine Gateway-Subagents |
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
   `terra-bulk` / `sol-pruefer` → `sonnet-worker` + `kimi-recherche`/`kimi-worker`
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

- Alles auf Sonnet, „später mal Sol“ → **kein** Cross-Model.
- Leader schreibt den Plan nach dem Distill selbst → Selbstbestätigung.
- Desktop-Session spawnt `luna-worker` via Agent-Tool → greift nicht; MCP.
- Gleiche Familie baut und ship-reviewed → Regel 8 verletzt.
- Fable als `agentType` → verboten.
