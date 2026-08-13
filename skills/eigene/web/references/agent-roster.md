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
| Strategie | Cockpit (Fable/Opus) oder `sol-worker` | high (Gateway-Force gilt) | ICP/OFFER/PROOF/VOICE + hot.md | 1 Ziel, 1 Pfad, offene Fragen | Deploy, Copy final |
| Sitemap/IA | `luna-worker` | medium-Ziel / Gateway oft max | Strategie-Output + sitemap-section-planung.md | volle Sitemap + Section-Plan (Gate-Checkliste) | Design-Tokens erfinden |
| Copy | `opus-builder` oder `kimi-worker` | medium (Opus) / high (Kimi) | Voice+Proof+Section-Plan | sektionsweise Copy, Claims↔Proof | Design-CSS |
| Art Direction | Cockpit + design-Skill | high | Dossier + Design-Brief + Referenzen mit Rolle | art-direction.md inkl. Tokens + Dials | npm i |
| Components-Spec | `luna-worker` | medium-Ziel / Gateway oft max | art-direction + tool-usecase-router | Werkzeugtabelle 5d | Install ohne Tabelle |
| Frontend-Build | `opus-builder` für 3D/art-directed Polish; `kimi-worker` für Frontend + langen Designkontext | medium (Opus) / high (Kimi) | gehashtes Design-Brief + Werkzeugtabelle + Tokens + Section-Brief + `web`/`design` | Code + lokaler Dev-Beweis | Review eigener Arbeit |
| Motion/3D | `opus-builder` oder `kimi-worker`; Luna nur für klar spezifizierte Mechanik | medium/high | Design-Brief + motion-doktrin + Storyboard | animierte Sections + reduced-motion | ungefragter Stackwechsel |
| Shot-Sweep | ausführende Rolle / `luna-worker` | low-Ziel / Gateway oft max | shot-sweep.mjs Pfade | manifest.json + PNGs | fullPage |
| Code-Kritik („Zoll“) | `luna-worker` oder `sol-worker` | high/max (Gateway) | Befunde + Source | datei:zeile pass/fail | Design-Meinung ohne Code |
| Visuelle Kritik A | `kimi-recherche` oder `grok-worker` | high (Gateway-Force) | manifest + PNGs | Befund+Shot-Pfad | Code schreiben |
| Visuelle Kritik B | andere Familie als A | high (Gateway-Force) | manifest + PNGs | Befund+Shot-Pfad | Code schreiben |
| Blind-A/B-Richter | frische Session, **andere** Familie als Builder | high | anonymisierte Shots A/B (paarweise) | winner + Achsen + 1 Lücke | Labels „unsere Seite“ |
| SEO-Fach | `luna-worker` + seo-Skill | medium-Ziel / Gateway oft max | Routes + Content | G1/G2 SEO-Report | Deploy |
| Trust-Fach | `kimi-recherche` | high (Gateway-Force) | PROOF + Seiten-Shots | Trust-Checklist pass/fail | Claims erfinden |
| Ship-Review | `sol-pruefer` (B1) | high | Diff + QA-Reports + Shots | pass/fail + Beleg | Eigenbau |

**Effort-Hinweis:** Spalte = Zielaufwand der Rolle. Gateway/Profil-Force (z. B.
`luna-worker` max, `kimi-worker`/`grok-worker` high) überschreibt und ist kein
Widerspruch — nie manuell niedriger als Force setzen.

## Parallel-Regeln

- Build und Review **nie** dieselbe Modellfamilie (Regel 8).
- Visuelle Kritik A und B: zwei Familien; Blind-Richter = dritte wenn möglich.
- Max 4–6 parallele Subagents (RAM). Sweep vor Panel ist sequentiell.
- TB2: nur Task-Ausschnitt an externe Provider, kein ganzer Kunden-Vault.

## Abbruch Kritik-Loop

- Max **3** Zyklen Fix → Re-Sweep → Panel.
- Panel-Divergenz &gt;20 % der Befunde (keine 2er-Mehrheit) → Eskalation an Cockpit,
  nicht Runde 4.
- Fertig = Fixliste leer oder begründete „bewusst so“-Einträge + Ship-Review pass.
