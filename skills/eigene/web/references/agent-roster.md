# Agent-Roster — Loop 2 Web (feste Rollen)

**Zweck:** AGENTS.md Regel 7 — jeder Thread hat Modellfamilie, Effort, Kontext,
Output. Keine implizite Vererbung. Host-Portabilität: Rollen beschreiben
**Fähigkeiten**; `agentType` gilt im Claude-Gateway. Anderer Host → gleiche
Rolle, verfügbares Äquivalent laut MODELL-MATRIX.

**Wann laden:** vor jedem Multi-Agent-Lauf in strategy/copy/build/qa.
Kritik-Spawn steht nur in `kritik-matrix.md` — diese Tabelle hier ist
das Rollen-Wörterbuch, nicht der Spawn-Plan.
**Anfänger:** zuerst `anfaenger-pfad.md` (Auftrag wählen), Roster erst bei Multi-Agent.

## Roster

| Rolle | agentType (Default) | claude-only (Modell) | Effort-Ziel | Kontext-Paket | Output-Schema | Verboten |
|---|---|---|---|---|---|---|
| Strategie | Cockpit (Opus) oder Sol-Cockpit | Opus | high (Gateway-Force gilt) | ICP/OFFER/PROOF/VOICE + hot.md | 1 Ziel, 1 Pfad, offene Fragen | Deploy, Copy final |
| Sol UI-Lead | Sol-Cockpit / verfügbare Sol-Lane | Opus (Lane entfällt, Opus zerlegt selbst) | high/max | Ziel + Ist-Shots + Design-Brief + relevante Source-Auszüge | direkte Opus-Zerlegung | selbst integrieren; Proof erfinden (FAKT-GATE für unklare Zahlen ist erlaubt) |
| Opus UI-Analyse / disjunkter Bau | alle unabhängigen `opus-builder` bis zur Live-Kapazität | Opus | high | genau ein Paket + Brief + nötige Shots/Dateien | Befunde oder disjunkter Patch mit Beleg | überlappende reale Schreibflächen; Gesamtstand integrieren |
| Opus UI-Integration | genau ein `opus-builder` | Opus | high | Brief + alle bestätigten Paket-Ergebnisse + Ziel-Worktree | ein gemeinsamer Seitenstand + lokaler Dev-Beweis | eigene Arbeit reviewen; konkurrierende Integratoren |
| Sitemap/IA | `luna-worker` | Haiku | medium-Ziel / Gateway oft max | Strategie-Output + sitemap-section-planung.md | volle Sitemap + Section-Plan (Gate-Checkliste) | Design-Tokens erfinden |
| Copy | `sol-builder` (Kimi tot, 03.09.2026) | Opus im eigenen Copy-Leaf, nie der Integrator | high | Voice+Proof+Section-Plan | sektionsweise Copy, Claims↔Proof | Design-CSS; Haiku; multi-family: **Opus schreibt nie Copy**; claude-only: Copy nie im Integrator-Leaf |
| Art Direction | Cockpit + design-Skill | Opus | high | Dossier + Design-Brief + Referenzen mit Rolle | art-direction.md inkl. Tokens + Dials | npm i |
| Components-Spec | `luna-worker` | Haiku | medium-Ziel / Gateway oft max | art-direction + tool-usecase-router | Werkzeugtabelle 5d | Install ohne Tabelle; Seiten bauen |
| Frontend-Build / Integration | **`fable-builder`** (Qualität; max zwei parallel) oder **`opus-builder`** (Breite) | Opus | high | gehashtes Design-Brief + Werkzeugtabelle + Tokens + Section-Brief + `web`/`design` | Code + lokaler Dev-Beweis | Review eigener Arbeit; **Haiku**; Luna als Builder; Kimi als Default-Integration |
| Frontend-Quick-Fix | `grok-worker`/`grok-fixer`, bei Tiefe `sol-builder` | Sonnet | high/max | Reproducer + Gate + lokales `write_set` | kleinster reversibler Patch + Befehlsbeleg | Greenfield, Redesign, gemeinsame Integration, Selbst-Review |
| Motion/3D | `opus-builder` | Opus | high | Design-Brief + motion-doktrin + Storyboard | animierte Sections + reduced-motion | ungefragter Stackwechsel; Haiku |
| Shot-Sweep | Skript `shot-sweep.mjs` (kein Design-Agent) | — (Skript) | — | shot-sweep.mjs Pfade | manifest.json + PNGs | fullPage; Haiku als „Builder“ |
| Code-Kritik („Zoll“) | `sol-pruefer` | Sonnet | high/max (Gateway) | Befunde + Source als Textausschnitt | datei:zeile pass/fail | Design-Meinung ohne Code; Bildpfade an Sol |
| Visuelle Kritik A | `visual-kritiker` / `kritiker-visuell` | Sonnet | high (Gateway-Force) | manifest + PNGs **einer** Seite | Befund+Shot-Pfad | Code schreiben; Grok-Fixrolle verwenden; Haiku |
| Visuelle Kritik B | andere Familie als Builder **und** als A: `opus-critic` nur wenn nicht Opus gebaut hat; sonst zweite `visual-kritiker`-Instanz mit anderem Katalog-Fokus (Kimi tot) | Sonnet, frische Instanz, anderer Fokus als A | high (Gateway-Force) | dieselben Shots wie A | Befund+Shot-Pfad | Code schreiben; Haiku; gleiche Familie wie Builder oder A |
| Blind-A/B-Richter | frische Session, **andere** Familie als Builder | Sonnet, frische Instanz | high | anonymisierte Shots A/B (paarweise) | winner + Achsen + 1 Lücke | Labels „unsere Seite“ |
| SEO-Fach | `sol-pruefer` + seo-Skill (Text-Input; Kimi tot; Luna nie) | Sonnet | medium-Ziel / Gateway oft max | Routes + Content | G1/G2 SEO-Report | Deploy |
| Trust-Fach | `opus-critic` (nur wenn Opus nicht gebaut hat), sonst `grok-critic` | Sonnet | high (Gateway-Force) | PROOF + Seiten-Shots | Trust-Checklist pass/fail | Claims erfinden |
| Ship-Review | `sol-pruefer` (B1) | Sonnet | high | Diff + QA-Reports + Shots | pass/fail + Beleg | Eigenbau |

**Effort-Hinweis:** Spalte = Zielaufwand der Rolle. Gateway/Profil-Force (z. B.
`luna-worker` max, `grok-worker` high) überschreibt und ist kein
Widerspruch — nie manuell niedriger als Force setzen.

## Parallel-Regeln

- **Seite bauen = `fable-builder` oder `opus-builder`.** Nie Haiku. Nie Luna als Seiten-Builder. Jedes Bau-Paket läuft durch die Qualitätsschleife (`orchestrate/references/qualitaetsschleife.md`): G1 → Judge anderer Familie mit Score → ≤3 Runden.
- Bei der Sol-geführten UI-Lane zerlegt Sol selbst und delegiert an Opus. Alle dependency-ready Analysen und disjunkten Baupakete laufen adaptiv bis zur live verfügbaren Runtime-, Provider-, RAM-, Browser- und Kontextkapazität.
- Genau ein Integrator (`opus-builder` oder `fable-builder`) integriert den gemeinsamen Stand. Fable baut nur über `fable-builder`, nie als Kritiker.
- Build und Review **nie** derselbe Agent. Unter `multi-family` zusätzlich nie dieselbe tatsächliche Modellfamilie; unter `claude-only` tritt die Instanz-Trennung an ihre Stelle (`kritik-matrix.md`) — ausdrücklich schwächer.
- Visuelle Kritik startet nach deterministischen Gates. Besetzung je Profil steht nur in `kritik-matrix.md`; zusätzliche Stimmen nur bei Risiko oder echtem Dissens.
- Sol prüft Code-Ursachen zum selben Seiten-Paket (Textausschnitt), nicht die Bilder.
- Sweep und bildlastiges Panel konkurrieren um RAM/Browser-Leases und werden nicht blind gleichzeitig gestartet.
- Writer brauchen disjunkte normalisierte `write_set`s oder isolierte Worktrees. Shared Files und Integration haben einen Owner.
- TB2: nur Task-Ausschnitt an externe Provider, kein ganzer Kunden-Vault.

**Haiku:** in diesem Skill kein `agentType` für Bau, Kritik oder Copy — auch
unter `claude-only` nicht. Mechanik-Masse bleibt Skript, Luna (multi-family)
oder Haiku (claude-only) — nie Urteil, nie Seite.

## Abbruch Kritik-Loop

Die Abbruchlogik steht in `kritik-matrix.md` („Drei Ausgänge je Kritik-Durchlauf“):
genau `clear`, `miss-with-feedback` oder `escalate`, kein vierter. Hier nicht
zweitschreiben. Fertig heißt `clear` plus Ship-Review pass.
