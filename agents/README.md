# agents/ — Subagenten-Rollen-Templates

Wiederverwendbare Subagenten-Rollen mit **fest verdrahtetem Modell + Effort** (AGENTS.md
Regel 7: Subagents nie ohne festes Modell/Effort losschicken — sonst erben sie das teure
Leader-Setup). Zentral hier gepflegt, per Symlink/Kopie in die Harnesses/Kundenrepos
(`.claude/agents/*.md`) verteilt.

**Herkunft:** Rollen-Schnitt adaptiert aus gstack (garrytan) @ `a3259400` — dort als
Slash-Commands (`/spec`, `/review`, `/qa`, `/retro`, `/ship`). Übernommen wurden NUR die
Rollen-Definitionen (Aufgabenzuschnitt), KEIN gstack-Code, KEINE Concurrency-Limits.
Modell + Effort je Rolle nach `raphael-command-center/ops/ROUTING.md` / KLARER-PLAN Kap. 3.

**Kein Concurrency-Limit** (KLARER-PLAN Kap. 3: „Subagenten: Kein Limit") — so viele
parallel, wie die Aufgabe braucht.

**Cross-Vendor-Prinzip (Regel 8):** Nichts prüft die eigene Hausarbeit. Der Builder
(`engineer`, Claude/Sonnet) wird von einer ANDEREN Modellfamilie geprüft (`reviewer` = Sol,
`qa` = Luna, beide GPT-5.6). Fable prüft nie Fable, Sonnet nie Sonnet.

| Rolle | Modell | Effort | Aufruf-Weg | Auftragsschnitt |
|---|---|---|---|---|
| `pm` | Fable | medium | Agent-Typ `pm` / `cc` → `/model fable` | Planen, Spec, entscheiden |
| `engineer` | Sonnet | xhigh | Agent-Typ `engineer` / `cc` → `/model sonnet` | Bauen, umsetzen, Tests schreiben |
| `reviewer` | Sol (GPT-5.6) | high | Agent-Typ `reviewer` (nicht `sol-pruefer`) | Cross-Vendor-Review |
| `qa` | Luna (GPT-5.6) | max | Agent-Typ `qa` (nicht `luna-worker`) | Tests fahren, App treiben |
| `retro` | Kimi K3 (1M) | high | Agent-Typ `retro` / `kimi -p` | Retro über Historie |

Installiert 13.08.2026 in `~/.claude/agents/`, `~/.grok/agents/` und die Spiegel unter `raphael-command-center`. Das sind Rollen, keine weiteren Lane-Wrapper.

Effort für GPT-Profile steckt in den Codex-V2-Profildateien (`sol/terra/luna.config.toml`),
für Kimi in `~/.kimi-code/config.toml` (`k3.default_effort=high`). Für Claude-Modelle wird
Effort im Prompt/Aufruf gesetzt (Standard = kein Override).
