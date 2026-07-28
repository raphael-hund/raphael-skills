# Muster-Wahl — welches Workflow-Muster für welche Aufgabe

Entscheide anhand der Aufgaben-Form, nicht der Themen-Domäne. Bei Mischformen:
Phasen kombinieren (Hybrid ist der Normalfall bei großen Aufgaben).

| Aufgaben-Form | Muster | Skelett |
|---|---|---|
| Viele gleichartige Einheiten bearbeiten (N Dateien umbauen, N Seiten schreiben, N Repos sichten) | **Fan-out-Pipeline** | `pipeline(items, schreib(sonnet-worker/kimi-worker), pruef(luna-worker/haiku-worker), fixWennRot(sonnet-worker))` — je Einheit eigene Datei, geteilte Dateien zentral am Ende; Sol nimmt die Stichprobe ab. Bei einem Publish-/Live-Node am Ende ist der `pruef()`-Schritt der Selbst-QA-Schritt vor Veröffentlichung — nie direkt von Schreiber zu Publish ohne ihn. Für Codex-/Kimi-Adapter, die das private CLAUDE.md nicht erben, muss der Loop-/Workflow-Prompt den Baustein „long horizon session, human is away“ sowie Autonomie, Nicht-Stoppen bis Gate/Budget und die Rot-Klassen explizit enthalten. |
| Qualität eines bestehenden Stands prüfen/heben | **Kritik-Flotte** | `sol-pruefer`=Urteil, `kimi-recherche`=Gegenperspektive, `luna-worker`=Mechanik parallel; Sonnet/Haiku ergänzen → je Fund Verify (Default: widerlegt) → passender Fixer → Sol-Abnahme |
| Echte Streitfrage / Architektur-Entscheidung | **Council** | Sol, Kimi und Claude mit Gegensatz-Linsen (First-Principles / Executor / Outsider), anonym als Antwort A/B/C, 2 Peer-Rankings (erst Einzelbewertung, dann `FINAL RANKING:`), Sol-Chairman (5 Abschnitte: einig / Streit / blinde Flecken / Empfehlung / eine erste Handlung) — dann SOFORT umsetzen |
| Unbekanntes Terrain erkunden (Web, Codebase, Vendor-Repo) | **Recherche-Sweep** | mehrere Sucher mit VERSCHIEDENEN Zugängen parallel (Community-Meinung / Doku / Code lesen / Gegenprobe), danach Synthese-Agent; Warnliste ist Pflicht-Output |
| Etwas Fremdes übernehmen (Repo, Skill, Wissen) | **Vendor-Kette** | je Quelle: clone → Lizenz → Red-Flag-Check (Hooks/Netz/exec/Auto-Update) → destillieren in BESTEHENDE Strukturen (nie Masseninstall) → Haiku-Validate → Buchführung (VENDORING) |
| Unbekannte Fundmenge ausschöpfen ("finde alle X") | **Loop-until-dry** | Runden von Findern, dedupe gegen ALLE bisherigen Funde (auch verworfene!), Stopp nach 2 leeren Runden |
| Messen/Diagnose ohne Eingriff (geteilte Infrastruktur) | **Mess-und-Vorschlag** | Messen (haiku) + Vergleich (sonnet) + Urteil (opus) parallel → EIN Proposal-Dokument, KEIN Eingriff — Abschluss-Check verifiziert Unberührtheit |

## Worker-Zuteilung (Standard)

- **`sol-pruefer`** — Pflicht: Urteil, Design-Kritik, Chairman, finale Abnahme.
- **`kimi-recherche` / `kimi-worker`** — Pflicht: unabhängige dritte
  Modellfamilie; Gegenprobe bzw. Frontend/deutscher Text.
- **`luna-worker`** — Pflicht: Mechanik, Tests, klar begrenzte Umbauten.
- **`sonnet-worker`** — Schreiben, Integrieren, Destillieren.
- **`haiku-worker`** — Massen-Lesen, einfache Verify-/Lint-Aufgaben.
- **NIE Fable-Subagents** (Raphael-Regel; Fable nur als Cockpit).

Im Workflow-Script diese Rollen mit `agentType:'…'` starten. `model:'opus'`,
`model:'sonnet'` und `model:'haiku'` sind reine Claude-Overrides und zählen
nicht als Multi-Modell-Flotte.

## Dimensionierung

- Klein (1 Thema, <5 Artefakte): 3–6 Agenten.
- Mittel (Kritik über einen Repo-Stand): 10–20.
- Groß (Massen-Umbau): 2 Agenten je Einheit (Schreiber+Prüfer) + Fix-Kette
  + Opus-Stichprobe (jede ~8.) + zentraler Abschluss-Agent.
- Verify-Tiefe an Risiko koppeln: Ship-relevantes bekommt Opus-Abnahme,
  Interna reicht Haiku.

## Erfahrungswerte (Session 2026-07-20, 11 Runden)

- Der Prüfer-je-Artefakt-Schritt fängt real ~10–20 % Ausschuss — nie sparen.
- Opus-Stichprobe gegen `git diff` fängt Substanzverlust/Erfindung, die
  Einzel-Prüfer nicht sehen (sie kennen das Vorher nicht).
- Kritiker-Konflikte (Haiku streng vs. Opus locker) selbst entscheiden —
  mit eigenem Datei-Blick, nicht per Mehrheit.
- Ein zentraler Index-/Cache-Agent nach dem Fan-out verhindert die
  Schreib-Rennen, die sonst ~jede 3. Massen-Runde treffen.
