# Loop-Typen — welcher der vier Loop/Graph-Skills, wann

| Skill | Typ (Taxonomie) | Wer entscheidet den Weg | Trigger | Dauer | Wann |
|---|---|---|---|---|---|
| `goal-loop` | goal-loop (Ralph-Kontrakt) | Agent, bis Stop-Bedingung erfüllt | `/goal` | eine Session, bis erreicht/Budget | >30 Min mechanische Arbeit MIT verifizierbarem Stop (Tests grün, Coverage-Ziel) |
| `dynamic-workflow` | turn-loop / Einzel-Workflow | DU (Zerlegung), Agent (Ausführung je Node) | "mach das als Workflow" | ein Durchgang | EINE Aufgabe, die eine Subagent-Flotte braucht (Fan-out/Kritik/Council) |
| `ultra-loop` | time-loop (Cron) | Agent wählt pro Runde den nächsten Punkt | Cron alle 20-30 Min | Tage, bis CronDelete | Dauer-Verbesserung eines Repos/Skill-Sets ohne festen Endpunkt |
| `graph` | proactive/auto-loop (vorgezeichnet) | DU zeichnest Nodes/Routen vorab | `/graph` | wiederkehrend (jeder Lauf = ein Input) | Wiederkehrende Pipeline (Content, Offerten, Reports) mit fester Schrittfolge |

**Gemeinsame Bausteine aller vier** (die "Contract"-Ebene der Fremd-Taxonomie
ist bei uns nicht pro Loop neu erfunden, sondern zentral):
- **Contract** = das Mandat/die Mission beim Start (Schritt 1 in ultra-loop,
  Schritt 1 in dynamic-workflow, Frozen Rules im Graph-Header).
- **Verifiers** = `eval`-Skill (G1-G4) für alle vier gleich.
- **Isolation/Budget** = Worktrees + Rundenlimits (max 3 in Graph-Loops),
  Cron-Session-only-Regel für Dauer-Loops.
- **Memory/Hooks** = Runden-Protokoll (`ultra-loop`) bzw. Karten-Header
  (`graph`) statt eigener Hook-Logik pro Loop-Typ.

Faustregel: fester Endpunkt bekannt UND wiederkehrend → `graph`. Fester
Endpunkt bekannt, einmalig → `goal-loop` (mechanisch) oder `dynamic-workflow`
(braucht Flotte). Kein fester Endpunkt, offene Dauer-Verbesserung →
`ultra-loop`.
