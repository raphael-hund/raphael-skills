---
name: graph
version: 0.1.0
description: >
  Startet einen Agenten-Graphen: die Karte (Nodes → Routen → Checkpoints →
  Gates) wird VOR dem Lauf gezeichnet, dann automatisch als Workflow-Script
  mit Subagent-Flotte ausgeführt — inkl. automatischem Setup der Agenten und
  des Kontextes je Node. Trigger: "/graph", "starte einen Graphen",
  "Graph Engineering", "baue eine Agenten-Pipeline", "State-Machine für
  diese Arbeit", "wiederkehrende Pipeline aufsetzen".
class: O
scope: agency
sensitivity: internal
source: >
  shannholmberg Graph-Engineering-Threads (Jul 2026, paraphrasiert:
  Nodes/Routen/Checkpoints/Gates, externe Anker-Checkpoints, Loop-in-Node)
  + eigene dynamic-workflow/ultra-loop-Praxis.
loads:
  - references/graph-vorlage.md
  - references/kontext-packs.md
  - references/loop-typen.md
requires_skills: [dynamic-workflow@^0]
completion_criteria:
  - "Graph-Definition existiert als Datei (graphs/<name>.graph.md) mit Nodes, Routen, Checkpoints, Gates"
  - "Workflow-Script generiert, validate-workflow.py PASS, Run gestartet (Run-ID notiert)"
  - "Mindestens ein Gate ist ein externer Anker (Test, Lint, Screenshot-Diff, Live-Signal) — kein reines Agenten-Urteil"
---

# graph — Agenten-Graphen zeichnen und starten

## Zweck (1 Satz)

Für wiederkehrende Arbeit die **Karte vorab zeichnen** (wer macht was, in
welcher Reihenfolge, mit welchen Prüfungen) und sie dann verbindlich als
dynamischen Workflow mit automatisch aufgesetzten Agenten + Kontext fahren.

## Abgrenzung (Loop vs. Graph)

- **Loop** (ultra-loop/goal-loop): DU setzt Ziel und Messlatte, der Agent
  wählt den Weg. Richtig für Einmal-Arbeit mit unbekanntem Pfad.
- **Graph** (dieser Skill): DU zeichnest den Weg — Nodes, Routen,
  Checkpoints, Gates. Der Agent entscheidet nur noch, WIE er jeden Node
  löst. Richtig für alles, was wöchentlich wiederkehrt (Content-Pipeline,
  Offerten, Ads-Reports, Website-QA).
- Ein Node darf intern ein Loop sein (Kritiker schickt Drafts zurück, bis
  die Rubrik klar ist) — das ist das "Loop-in-Node"-Muster.

## Die 4 Bausteine (Doktrin)

1. **Nodes** — eine Station der Arbeit (research, brief, draft, score,
   publish). Jeder Node bekommt: Worker (agentType), Kontext-Pack,
   Output-Schema.
2. **Routen** — vorab erlaubte Wege zwischen Nodes (auch rückwärts).
3. **Checkpoints** — die Prüfung auf jeder Route: Ergebnis lesen, vorwärts
   bei PASS, zurück zum benannten Node bei FAIL. Später Fehlschlag routet
   meist WEIT zurück (Ranking-Miss → zurück zu Research, nicht zu Draft).
4. **Gates** — Checkpoints, die niemand überspringen darf. **Mindestens ein
   Gate muss ein externer Anker sein**, den Agenten nicht "überreden"
   können: Testlauf, Lint, Screenshot-Vergleich, Lighthouse, Live-Signal
   (Indexierung, Ranking, Termine). Reine Agenten-Rubriken können sich
   selbst bestehen — der Anker nicht.

Dazu: **Frozen Rules** — wenige Regeln, die kein Node je umschreibt
(Brand-Voice, verbotene Claims, Rot-Klassen aus AGENTS.md).

## Ablauf (5 Schritte)

1. **Karte zeichnen** (im Gespräch oder aus dem Auftrag ableiten, nicht
   nachfragen wenn ableitbar): Nodes, Routen, Checkpoints, Gates, Frozen
   Rules. Als Datei speichern: `graphs/<name>.graph.md` im Projektordner
   (Format in `references/graph-vorlage.md`). Existiert schon ein Graph
   mit dem Namen → wiederverwenden, nur Input füttern.
2. **Agenten + Kontext automatisch aufsetzen:** pro Node Worker nach der
   Modell-Matrix wählen (`kimi-sol`-Skill / ROUTING.md: Sonnet=Bau,
   Haiku=Mechanik, Luna=Tests/Mechanik, Kimi=Frontend/deutsche Texte,
   Sol=Urteil) und ein Kontext-Pack schnüren
   (`references/kontext-packs.md`): Brain-Hot-Cache, relevante Skills,
   Projektdateien, Vorergebnis-PFADE (nie Inline-Dumps >8k — Slice-Falle).
3. **Workflow-Script generieren:** Graph → `pipeline()`/Schleifen nach
   `references/graph-vorlage.md`. Checkpoints = Schema-Verdicts,
   Rückrouten = `while`-Schleifen mit Rundenlimit (Default 3), Gates =
   echte Bash-Checks im Script/Cockpit.
4. **Validieren + starten:** `python3 /root/raphael-skills/skills/eigene/ultra-loop/scripts/validate-workflow.py <script>`
   — FAIL = nicht starten. Dann Workflow-Tool, Run-ID in den Graph-Header
   schreiben (Lauf-Historie).
5. **Eigen-Verifikation + Karte pflegen:** Kern-Artefakte selbst prüfen
   (Read/Bash). Brach ein Node → genau diesen Node in der Graph-Datei
   nachschärfen (das ist der Sinn der Karte: der Fehler hat eine Adresse).
   Läuft die Karte stabil → wiederverwenden, nur neuen Input füttern.

## Harte Regeln

- Kein Graph ohne externes Anker-Gate.
- Rückrouten immer mit Rundenlimit — kein unendliches Kreisen.
- NIE Fable-Subagents; Worker nur über `agentType`.
- Frozen Rules wandern wörtlich in JEDEN Node-Prompt.
- Schreib-Rennen: parallele Nodes nur auf getrennten Dateien.
- Rot-Klassen (Geld, Deploys, Kundennachrichten, CRM, Löschen, Rechte,
  Skill-Mutationen) bleiben Raphael — ein Publish-Node endet an der
  Review-Inbox, nie am Live-Schalter.

## Gotchas

- **Selbst-bestehende Rubriken:** Kritiker-Node und Schreiber-Node aus
  DERSELBEN Modellfamilie bestehen sich gegenseitig zu leicht — Verifier
  aus anderer Familie wählen (Empfehlung, bei Ausfall protokollieren).
- **Später Fehlschlag, frühe Ursache:** ein Miss am Ende (Ranking, Termin,
  Conversion) routet fast immer zu Research/Angle zurück, nicht zum Draft.
- **Graph zu früh:** für Einmal-Arbeit ist die Karte Overhead — dann
  dynamic-workflow oder Solo. Graph erst, wenn die Arbeit wiederkehrt.
- **Args-Falle:** Input-Listen als echtes JSON-Array übergeben und im
  Script defensiv parsen.
- Die Graph-Datei ist die Quelle der Wahrheit, das Script nur Kompilat —
  Änderungen zuerst in der Karte, dann neu generieren.
