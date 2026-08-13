# Betriebsarten — welche wann, und woran man sie unterscheidet

Alle Betriebsarten leben in **einem** Skill (orchestrate). Unterschieden werden
sie an einer Frage: **wer entscheidet den Weg — du oder der Agent?**

| Betriebsart | Wer entscheidet den Weg | Dauer | Wann |
|---|---|---|---|
| **SOLO** | du, komplett | Minuten | <5 Min, eine Datei, kein Urteil nötig |
| **EINMAL** | du zerlegst, der Agent löst die Stücke | ein Durchgang | EINE Aufgabe, die eine Subagent-Flotte braucht (Fan-out, Kritik, Recherche-Sweep) |
| **LOOP** | der Agent wählt pro Runde den nächsten Punkt | Tage, bis `CronDelete` | Dauer-Verbesserung eines Repos/Skill-Sets ohne festen Endpunkt |
| **GRAPH** | du zeichnest Nodes und Routen vorab | wiederkehrend, ein Lauf = ein Input | Wiederkehrende Pipeline (Content, Offerten, Reports) mit fester Schrittfolge |
| **GAUNTLET** | du setzt nur die Messlatte, der Agent den Weg | bis die Zugewinne klein werden | Qualität ist das Ziel, nicht Fertigwerden |
| **COUNCIL** | niemand — es wird erst entschieden | ein Durchgang | echte Streitfrage mit mehreren plausiblen Antworten |

**Mechanische Sonderform:** klar verifizierbarer Stop (Tests grün,
Coverage-Ziel) und >30 Min mechanische Arbeit → der Autonomer-Lauf-Kontrakt aus
`dispatch.md` (5 Teile: Objective, Constraints, Validation Command, Stop
Condition, Documentation). Braucht keine Flotte, nur einen Worker mit hartem
Gate.

## Faustregeln

- Fester Endpunkt bekannt **und** wiederkehrend → **GRAPH**.
- Fester Endpunkt bekannt, einmalig → **EINMAL** (mit Flotte) bzw.
  Autonomer-Lauf-Kontrakt (mechanisch).
- Kein fester Endpunkt, offene Dauer-Verbesserung → **LOOP**.
- Es gibt eine externe Referenz, die klar besser ist als unser Stand →
  **GAUNTLET**.
- Die Frage ist „welche Antwort“, nicht „wie baue ich“ → **COUNCIL**.

## Gemeinsame Bausteine (einmal zentral, nicht je Betriebsart neu)

- **Contract** = das Mandat beim Start: Ziel, Gates, Tabus, Abbruchbedingung.
  Bei GRAPH heißen die unverrückbaren Teile *Frozen Rules* und wandern wörtlich
  in jeden Node-Prompt.
- **Verifiers** = `eval`-Skill (G1–G4), für alle Betriebsarten gleich.
- **Isolation/Budget** = Worktrees plus Rundenlimits (Default 3 bei
  Graph-Rückrouten), Session-only-Cron bei LOOP.
- **Memory** = Runden-Protokoll (`runden-protokoll.md`) bei LOOP,
  Karten-Header bei GRAPH, `workbench.md` bei GAUNTLET — nie eigene Hook-Logik
  je Betriebsart.

## Loop-in-Node

Ein GRAPH-Node darf intern eine Schleife sein (Kritiker schickt Drafts zurück,
bis die Rubrik klar ist). Ein LOOP darf pro Runde einen GAUNTLET fahren.
Mischformen sind der Normalfall — die Betriebsart benennt nur die äußere Hülle.
