# Agent-Roster: Web (Claude-Code-Harness, Stand 08.09.2026)

**Zweck:** Jeder Leaf hat Modellfamilie, Effort, Kontextpaket und Rückgabeformat. Keine implizite Vererbung. Katalog: `/root/.claude/agents/`. Raphaels Vorgabe vom 08.09.2026: Fable, Astra und Kimi sind die primären Subagenten; Opus und Grok kommen dazu; Sol nur Backend und Code-Kritik; Luna, Sonnet und Terra nur Serien und Kartierung; Haiku nur `web-research`.

**Wann laden:** vor jedem Multi-Agent-Lauf. Der Spawn-Plan der Kritik steht nur in `kritik-matrix.md`; diese Tabelle ist das Rollen-Wörterbuch.

## Roster

| Rolle | agentType | Effort | Kontextpaket | Rückgabe | Verboten |
|---|---|---|---|---|---|
| Strategie, Plan, Architektur | Hauptsession (Fable) oder `astra-worker`, `kimi-worker` als Planungs-Leaf | high | ICP/OFFER/PROOF/VOICE, hot.md, Referenzbilder | PLAN.md, PRUEFGEGEN.md, SEO-PAGE-MAP.json | Deploy, finale Copy |
| Sitemap/IA, Section-Plan | `astra-worker` oder `kimi-worker` | high | Strategie-Output, sitemap-section-planung.md, seo-pages.md | Seitenkarte mit Intent je Route | Tokens erfinden |
| Art Direction, DESIGN.md | Hauptsession oder `fable-builder`, `astra-worker`, `kimi-worker` | high | stil-regeln, 2 bis 3 Cases, design-depth-Kapitel, Referenzen mit Rolle | DESIGN.md mit Tokens und Elementmanifest | `npm i` |
| Copy | `astra-worker` zuerst, dann `kimi-worker`, dann `fable-builder` | high | VOICE, PROOF, Section-Plan, Keyword je Route | Copy je Sektion mit `forbidden-check.py`-Beleg | Integrator schreibt Copy; Opus, Sol, Haiku |
| Components-Spec, Werkzeugtabelle | `fable-builder` oder `astra-worker` | high | DESIGN.md, component-registries.md, tool-usecase-router.md | Werkzeugtabelle in art-direction.md | Install ohne Tabelle |
| Frontend-Build, Integration | `fable-builder` (Qualität, max zwei parallel), `astra-worker`, `kimi-worker`; `opus-builder` für Breite | high | gehashtes Design-Brief, Werkzeugtabelle, Tokens, Section-Brief, BILDLISTE.txt | Routen im Worktree, Bericht mit «gesehen:» je Bild | Copy ändern, Self-Review, Sol |
| Frontend-Quick-Fix | `grok-worker` | high | Reproducer, Gate, lokales `write_set` | kleinster reversibler Patch mit Befehlsbeleg | Greenfield, Redesign |
| Backend, Formular-Endpoint, API, Tests | `grok-worker`, `sol-worker`; `composer-worker` experimentell | high | Endpoint-Vertrag, Env, Testfälle | laufender Endpoint mit Erfolg/Fehler, Tests | Frontend über Sol |
| Motion | `fable-builder` oder `opus-builder` | high | Design-Brief, motion-doktrin, motion-native, Storyboard | animierte Sektionen mit Reduced Motion | ungefragter Stackwechsel |
| Research, Gegenposition | `kimi-worker`, `grok-worker`; `web-research` (Haiku) nur für Fetch-Destillate | high | Frage, Quellen, Prüfmuster | Destillat mit Quellen und Datum | Astra |
| Kartierung, Massen-Read, Serien, Migration | `sonnet-worker`, `luna-worker`, `terra-worker`, builtin `Explore` | medium | feste Liste, Regel, write_set | Tabelle oder Bulk-Edit mit Prüfbefehl | Urteil, Design, Copy |
| Shot-Sweep | Skript `scripts/shot-sweep.mjs` | – | `--base`, Routen | manifest.json + PNGs | fullPage als Kritik-Input |
| Visuelle Kritik A (Stufe 2) | `grok-critic` | high | manifest + Kacheln **einer** Seite, Referenz-Folds | Befund + Shot-Pfad + Blind-Urteil je Achse | Code schreiben |
| Visuelle Kritik B | `opus-critic` (nach Fable-Build als Instanz-Trennung gekennzeichnet; nie nach Opus-Build), sonst `kimi-critic` | high | wie A, anderer Katalog-Fokus | wie A | gleiche Familie wie Builder |
| Code-Kritik, Ship-Review | `sol-critic` (nur Code/Backend) oder `opus-critic` | high | Diff, Source als Textausschnitt, Gate-Reports | datei:zeile pass/fail | Bildpfade an Sol |
| SEO-Fach | `grok-critic` mit seo-Skill plus `scripts/onpage-check.mjs` | high | Routen, Content, SEO-PAGE-MAP.json | G1/G2-SEO-Report | Deploy |
| Trust-Fach | `opus-critic` (wenn Opus nicht gebaut hat), sonst `grok-critic` | high | PROOF + Seiten-Shots | Trust-Checkliste pass/fail | Claims erfinden |
| Blind-A/B-Richter | `grok-critic` oder `kimi-critic`, frische Session, andere Familie als Builder | high | anonymisierte Shots A/B paarweise | winner + Achsen + eine Lücke | Labels «unsere Seite» |
| Abnahme vor Auslieferung (Stufe 1) | `fable-critic`, `astra-critic`, `kimi-critic`; andere Familie als der Builder | high | Diff, QA-Reports, Shots, DESIGN.md-Abgleich | PASS/FAIL mit Befundliste | nach eigenem Bau |

## Regeln

- **Seite bauen = Fable, Astra, Kimi oder Opus.** Nie Haiku, nie Luna/Sonnet/Terra als Seiten-Builder, nie Sol. Jedes Bau-Paket läuft durch die Qualitätsschleife in `kritik-matrix.md`.
- **Genau ein Integrator** je gemeinsamer UI-Fläche. Build und Review nie derselbe Agent; nie dieselbe tatsächliche Modellfamilie, ausser als gekennzeichnete Instanz-Trennung (Opus prüft Fable, Fable prüft Opus; nie Opus nach Opus).
- **Provenienz:** erste Zeile `ANGEFRAGTES MODELL` plus Fallback-Hinweis. Liefert das Gateway eine andere Familie als angefragt, zählt die gelieferte Familie; ein Kritiker-PASS aus der Builder-Familie ist nur ein Parent-Check, ein weiterer Kritiker läuft.
- **Dynamic Workflows** (Profil `multi-family`) binden jeden Leaf per `agentType` und enthalten mindestens zwei Familien; nach dem Lauf `workflowProgress[].agentType` gegen `workflowProgress[].model` und FAILOVER-Hinweise vergleichen.
- **Zeitbudget je Leaf:** Integrator 45 min, Routen-Leaf 40 min, Kritik-Leaf 25 min, Copy-Leaf 20 min, Mini-Fix 15 min; spätestens 5 Minuten vor Ablauf StructuredOutput mit erreichtem Stand.
- **Serien** (URL-Proben, Massen-Checks) als Skript oder Stufe-3-Leaf mit fester Liste; Stufe 2 bekommt nur die Ausreisser (Observation 0063).
- **Bildlisten als Datei** (`BILDLISTE.txt`), nie Pfade im Prompt; Kritik-Leaf liest höchstens 12 Shots als Kacheln (`/root/tools/shots-verkleinern.sh`).
- **Shared Files und Integration haben einen Owner**; Writer brauchen disjunkte `write_set`s oder Worktrees. Nur Task-Ausschnitte an externe Provider.

## Abbruch Kritik-Loop

Die drei Ausgänge je Kritik-Durchlauf (`clear`, `miss-with-feedback`, `escalate`) und die Qualitätsschleife stehen in `kritik-matrix.md`; hier nicht doppelt.
