# Muster-Wahl — welches Workflow-Muster für welche Aufgabe

Entscheide anhand der Aufgaben-Form, nicht der Themen-Domäne. Bei Mischformen:
Phasen kombinieren (Hybrid ist der Normalfall bei großen Aufgaben).

| Aufgaben-Form | Muster | Skelett |
|---|---|---|
| Viele gleichartige Einheiten bearbeiten (N Dateien umbauen, N Seiten schreiben, N Repos sichten) | **Fan-out-Pipeline** | `pipeline(items, schreib(luna-worker/kimi-worker/grok-worker), pruef(grok-worker/luna-worker), fixWennRot(luna-worker))` — je Einheit eigene Datei, geteilte Dateien zentral am Ende; Sol nimmt die Stichprobe ab. Bei einem Publish-/Live-Node am Ende ist der `pruef()`-Schritt der Selbst-QA-Schritt vor Veröffentlichung — nie direkt von Schreiber zu Publish ohne ihn. Für Codex-/Kimi-Adapter, die das private CLAUDE.md nicht erben, muss der Loop-/Workflow-Prompt den Baustein „long horizon session, human is away“ sowie Autonomie, Nicht-Stoppen bis Gate/Budget und die Rot-Klassen explizit enthalten. |
| Qualität eines bestehenden Stands prüfen/heben | **Kritik-Flotte** | `sol-critic`=Urteil, `kimi-worker`=Gegenperspektive, `luna-worker`=Mechanik parallel; Grok ergänzt → je Fund Verify (Default: widerlegt) → passender Fixer → Sol-Abnahme |
| Echte Streitfrage / Architektur-Entscheidung | **Council** | Sol, Kimi und Claude mit Gegensatz-Linsen (First-Principles / Executor / Outsider), anonym als Antwort A/B/C, 2 Peer-Rankings (erst Einzelbewertung, dann `FINAL RANKING:`), Sol-Chairman (5 Abschnitte: einig / Streit / blinde Flecken / Empfehlung / eine erste Handlung) — dann SOFORT umsetzen |
| Unbekanntes Terrain erkunden (Web, Codebase, Vendor-Repo) | **Recherche-Sweep** | mehrere Sucher mit VERSCHIEDENEN Zugängen parallel (Community-Meinung / Doku / Code lesen / Gegenprobe), danach Synthese-Agent; Warnliste ist Pflicht-Output |
| Etwas Fremdes übernehmen (Repo, Skill, Wissen) | **Vendor-Kette** | je Quelle: clone → Lizenz → Red-Flag-Check (Hooks/Netz/exec/Auto-Update) → destillieren in BESTEHENDE Strukturen (nie Masseninstall) → Luna-Validate → Buchführung (VENDORING) |
| Unbekannte Fundmenge ausschöpfen ("finde alle X") | **Loop-until-dry** | Runden von Findern, dedupe gegen ALLE bisherigen Funde (auch verworfene!), Stopp nach 2 leeren Runden |
| Messen/Diagnose ohne Eingriff (geteilte Infrastruktur) | **Mess-und-Vorschlag** | Messen (luna) + Vergleich (grok-worker) + Urteil (opus) parallel → EIN Proposal-Dokument, KEIN Eingriff — Abschluss-Check verifiziert Unberührtheit |

## Worker-Zuteilung (Standard)

- **`sol-critic`** — Pflicht: Urteil, Design-Kritik, Chairman, finale Abnahme.
- **`kimi-worker` / `kimi-worker`** — Pflicht: unabhängige dritte
  Modellfamilie; Gegenprobe bzw. Frontend/deutscher Text.
- **`luna-worker`** — Pflicht: Mechanik, Tests, klar begrenzte Umbauten.
- **`grok-worker`** — schnelle Masse, Prototypen, vierte Perspektive (bevorzugt).
- **`terra-worker`** — Architektur, Multi-File-Volumen (bevorzugt).
- **`fable-builder`** — Fable 5.1 als Builder-Leaf: Default für Frontend-Substanz, Integration und harte Fixes, wenn Qualität vor Kosten geht (Raphael 04.09.2026). Max zwei parallel, nie Reviewer.
- **`opus-builder`** — Claude-Bau für parallele Breite (mehr als zwei Leaves) und Routine-Frontend.
- **`fable-advisor`** — nur benannter Low-Effort-Checkpoint für schwierige
  UI-/Website-Zerlegung; kein eigener Code.
- Andere Fable-Agenttypen und rohe `model: fable`-Spawns bleiben verboten.

Diese Zuteilung gilt für das Profil `multi-family` — dort sind Sonnet und Haiku
nie Subagent. Im Profil `claude-only`
baut Opus, kritisiert Sonnet read-only und macht Haiku die Masse; die
Muster-Skelette oben werden entsprechend besetzt. Maßgeblich ist die
Profil-Tabelle in `dispatch.md` — hier steht sie nicht ein zweites Mal.

Im Workflow-Script diese Rollen mit `agentType:'…'` starten. `model:'opus'` und
`model:'sonnet'` sind reine Claude-Overrides und zählen
nicht als Multi-Modell-Flotte.

## Dimensionierung

- Klein (1 Thema, <5 Artefakte): 3–6 Agenten.
- Mittel (Kritik über einen Repo-Stand): 10–20.
- Groß (Massen-Umbau): 2 Agenten je Einheit (Schreiber+Prüfer) + Fix-Kette
  + Opus-Stichprobe (jede ~8.) + zentraler Abschluss-Agent.
- Verify-Tiefe an Risiko koppeln: Ship-relevantes bekommt Opus-Abnahme,
  Interna reicht Luna.

## Erfahrungswerte (Session 2026-07-20, 11 Runden)

- Der Prüfer-je-Artefakt-Schritt fängt real ~10–20 % Ausschuss — nie sparen.
- Opus-Stichprobe gegen `git diff` fängt Substanzverlust/Erfindung, die
  Einzel-Prüfer nicht sehen (sie kennen das Vorher nicht).
- Kritiker-Konflikte (Luna streng vs. Opus locker) selbst entscheiden —
  mit eigenem Datei-Blick, nicht per Mehrheit.
- Ein zentraler Index-/Cache-Agent nach dem Fan-out verhindert die
  Schreib-Rennen, die sonst ~jede 3. Massen-Runde treffen.
