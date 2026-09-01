# Agent-Roster — Loop 2 Web (feste Rollen)

**Zweck:** AGENTS.md Regel 7 — jeder Thread hat Modellfamilie, Effort, Kontext,
Output. Keine implizite Vererbung. Host-Portabilität: Rollen beschreiben
**Fähigkeiten**; `agentType` gilt im Claude-Gateway. Anderer Host → gleiche
Rolle, verfügbares Äquivalent laut MODELL-MATRIX.

**Wann laden:** vor jedem Multi-Agent-Lauf in strategy/copy/build/qa.
**Anfänger:** zuerst `anfaenger-pfad.md` (Auftrag wählen), Roster erst bei Multi-Agent.

## Roster

| Rolle | agentType (Default) | Effort-Ziel | Kontext-Paket | Output-Schema | Verboten |
|---|---|---|---|---|---|
| Strategie | Cockpit (Opus) oder Sol-Cockpit | high (Gateway-Force gilt) | ICP/OFFER/PROOF/VOICE + hot.md | 1 Ziel, 1 Pfad, offene Fragen | Deploy, Copy final |
| Sol UI-Lead | Sol-Cockpit / verfügbare Sol-Lane | high/max | Ziel + Ist-Shots + Design-Brief + relevante Source-Auszüge | direkte Opus-Zerlegung | selbst integrieren; ungeprüfte Kundenfakten |
| Opus UI-Analyse / disjunkter Bau | alle unabhängigen `opus-builder` bis zur Live-Kapazität | high | genau ein Paket + Brief + nötige Shots/Dateien | Befunde oder disjunkter Patch mit Beleg | überlappende reale Schreibflächen; Gesamtstand integrieren |
| Opus UI-Integration | genau ein `opus-builder` | high | Brief + alle bestätigten Paket-Ergebnisse + Ziel-Worktree | ein gemeinsamer Seitenstand + lokaler Dev-Beweis | eigene Arbeit reviewen; konkurrierende Integratoren |
| Sitemap/IA | `luna-worker` | medium-Ziel / Gateway oft max | Strategie-Output + sitemap-section-planung.md | volle Sitemap + Section-Plan (Gate-Checkliste) | Design-Tokens erfinden |
| Copy | `kimi-worker` oder `sol-builder` (gleichberechtigt, explizit besetzt) | high | Voice+Proof+Section-Plan | sektionsweise Copy, Claims↔Proof | Design-CSS; Haiku; **Opus schreibt nie Copy** |
| Art Direction | Cockpit + design-Skill | high | Dossier + Design-Brief + Referenzen mit Rolle | art-direction.md inkl. Tokens + Dials | npm i |
| Components-Spec | `luna-worker` | medium-Ziel / Gateway oft max | art-direction + tool-usecase-router | Werkzeugtabelle 5d | Install ohne Tabelle; Seiten bauen |
| Frontend-Build / Integration | **`opus-builder`** | high | gehashtes Design-Brief + Werkzeugtabelle + Tokens + Section-Brief + `web`/`design` | Code + lokaler Dev-Beweis | Review eigener Arbeit; **Haiku**; Luna als Builder; Kimi als Default-Integration |
| Frontend-Quick-Fix | `grok-worker`/`grok-fixer`, bei Tiefe `sol-builder` | high/max | Reproducer + Gate + lokales `write_set` | kleinster reversibler Patch + Befehlsbeleg | Greenfield, Redesign, gemeinsame Integration, Selbst-Review |
| Motion/3D | `opus-builder` | high | Design-Brief + motion-doktrin + Storyboard | animierte Sections + reduced-motion | ungefragter Stackwechsel; Haiku |
| Shot-Sweep | Skript `shot-sweep.mjs` (kein Design-Agent) | — | shot-sweep.mjs Pfade | manifest.json + PNGs | fullPage; Haiku als „Builder“ |
| Code-Kritik („Zoll“) | `sol-pruefer` | high/max (Gateway) | Befunde + Source als Textausschnitt | datei:zeile pass/fail | Design-Meinung ohne Code; Bildpfade an Sol |
| Visuelle Kritik A | `visual-kritiker` / `kritiker-visuell` | high (Gateway-Force) | manifest + PNGs **einer** Seite | Befund+Shot-Pfad | Code schreiben; Grok-Fixrolle verwenden; Haiku |
| Visuelle Kritik B | andere Familie als Builder **und** als A: `opus-critic` nur wenn nicht Opus gebaut hat; sonst `kimi-recherche` | high (Gateway-Force) | dieselben Shots wie A | Befund+Shot-Pfad | Code schreiben; Haiku; gleiche Familie wie Builder oder A |
| Blind-A/B-Richter | frische Session, **andere** Familie als Builder | high | anonymisierte Shots A/B (paarweise) | winner + Achsen + 1 Lücke | Labels „unsere Seite“ |
| SEO-Fach | `luna-worker` + seo-Skill | medium-Ziel / Gateway oft max | Routes + Content | G1/G2 SEO-Report | Deploy |
| Trust-Fach | `kimi-recherche` | high (Gateway-Force) | PROOF + Seiten-Shots | Trust-Checklist pass/fail | Claims erfinden |
| Ship-Review | `sol-pruefer` (B1) | high | Diff + QA-Reports + Shots | pass/fail + Beleg | Eigenbau |

**Effort-Hinweis:** Spalte = Zielaufwand der Rolle. Gateway/Profil-Force (z. B.
`luna-worker` max, `kimi-worker`/`grok-worker` high) überschreibt und ist kein
Widerspruch — nie manuell niedriger als Force setzen.

## Parallel-Regeln

- **Seite bauen = `opus-builder`.** Nie Haiku. Nie Luna als Seiten-Builder.
- Bei der Sol-geführten UI-Lane zerlegt Sol selbst und delegiert an Opus. Alle dependency-ready Analysen und disjunkten Baupakete laufen adaptiv bis zur live verfügbaren Runtime-, Provider-, RAM-, Browser- und Kontextkapazität.
- Genau ein `opus-builder` integriert den gemeinsamen Stand. Fable ist als Subagent gesperrt.
- Build und Review **nie** dieselbe tatsächliche Modellfamilie.
- Visuelle Kritik startet nach deterministischen Gates. Normaler Seitenbau nutzt Grok plus Kimi als fremde Perspektiven; zusätzliche Stimmen nur bei Risiko oder echtem Dissens.
- Sol prüft Code-Ursachen zum selben Seiten-Paket (Textausschnitt), nicht die Bilder.
- Sweep und bildlastiges Panel konkurrieren um RAM/Browser-Leases und werden nicht blind gleichzeitig gestartet.
- Writer brauchen disjunkte normalisierte `write_set`s oder isolierte Worktrees. Shared Files und Integration haben einen Owner.
- TB2: nur Task-Ausschnitt an externe Provider, kein ganzer Kunden-Vault.

**Haiku:** in diesem Skill kein `agentType` für Bau, Kritik oder Copy. Mechanik-Masse bleibt Skript oder Luna — nie Urteil, nie Seite.

## Abbruch Kritik-Loop

- Max **3** Zyklen Fix → Re-Sweep → Panel.
- Panel-Divergenz &gt;20 % der Befunde (keine 2er-Mehrheit) → Eskalation an Cockpit,
  nicht Runde 4.
- Fertig = Fixliste leer oder begründete „bewusst so“-Einträge + Ship-Review pass.
