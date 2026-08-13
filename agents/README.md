# agents/ — Rollen, nicht Modelle

Eine Rolle ist der Auftrag. Ein Modell ist die Besetzung.
Quelle der Besetzung: [ROLE-CAST.md](ROLE-CAST.md).

Lane-Wrapper (`kimi-worker`, `grok-worker`, `luna-worker`, …) bleiben
Transport. Rollen heißen nach dem Job.

Bei Ads, Copy, Skript, Frontend: **zwei Modelle parallel**.
Prüfer = andere Familie.

| Rolle | Auftrag | Doppel-Besetzung |
|---|---|---|
| `ads` | Angles, Testwelle, Kill-Keep | Kimi + Opus (+ Grok) |
| `copywriter` | DE-Verkaufstext | Opus + Kimi (+ Grok) |
| `scriptwriter` | Video-Ad-Skript | Kimi + Opus (+ Grok) |
| `frontend` | Seite / UI | Opus + Kimi (+ Grok) |
| `pm` | Spec / Plan | Fable + Grok |
| `engineer` | Ticket / Fix | Grok + Sol |
| `reviewer` | Diff prüfen | andere Familie als Builder |
| `qa` | Flow fahren | Luna + Grok |
| `retro` | Historie | Kimi + Grok |

Installiert in `~/.claude/agents/`, `~/.grok/agents/` und die Spiegel
unter `raphael-command-center`.
