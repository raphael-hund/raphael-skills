---
name: dynamic-workflow
description: "Fuehre genau einen explizit angeforderten Kimi-Workflow als 2–6-Knoten-DAG aus; nutze eine schema-legale TodoList, ein atomares Workspace-Ledger, resumierbare Root-Dispatches und eigene Verifikation."
---

# dynamic-workflow

Dieser Skill fuehrt genau **einen** ausdruecklich angeforderten Workflow-Run
aus. Es gibt keinen tasklosen oder SOLO-Pfad und keine unbeauftragte zweite
Runde.

## Kimi-Code-Vertrag

Zielhost ist Kimi Code 0.28.1. Nutze `TodoList`, `Agent`, `AgentSwarm`,
`AskUserQuestion`, `Skill`, `Read`, `Write`, `Edit`, `Bash`, `Grep`, `Glob`,
`FetchURL` und `WebSearch` nur mit ihren realen Parametern.

`TodoList` ist ausschliesslich die sichtbare Projektion. Jeder Eintrag hat
exakt diese beiden Felder und keine weiteren (`additionalProperties: false`):

```json
{"title":"Inspect inputs","status":"in_progress"}
```

Erlaubte Status sind nur `pending`, `in_progress` und `done`. Solange der Run
arbeitet, hat jede TodoList-Aktualisierung **genau einen** Eintrag mit
`in_progress`; Blocker bleiben dort `in_progress`. Labels, DAG, Agent-IDs,
Best-Effort, Findings und Belege gehoeren niemals in zusaetzliche Todo-Felder.

## Offengelegtes Workspace-Ledger

Persistiere den vollstaendigen Run in
`.kimi/workflows/<run-id>.json` und nenne diesen Pfad dem Nutzer beim Start
und im Abschluss. Das JSON enthaelt mindestens `run_id`, Skill, Auftrag,
`best_effort_authorized`, stabile Knoten mit `label`, `deps`, `scope`,
`write_set`, Todo-Projektion, `agent_id` bzw. `agent_ids`, Versuche, Gates,
Findings, Evidence und Blocker.

Aktualisiere atomar: komplettes JSON mit `Write` nach
`.kimi/workflows/<run-id>.json.tmp` schreiben, mit `Bash` als JSON validieren
und im selben Verzeichnis per `mv` auf den finalen Pfad ersetzen. Nie das
Live-Ledger teilweise editieren. Nach jedem Dispatch, Ergebnis, Gate und
Freigabe sofort atomar fortschreiben.

Vor dem ersten Writer speichert Root im Ledger eine Pre-Dispatch-Baseline:
`git status --short --untracked-files=all`, den relevanten Diff sowie Blob-
oder SHA-256-Hashes aller `write_set`-Pfade. Nur Aenderungen, die gegen diese
Baseline eindeutig einem Writer gehoeren, duerfen ihm zugerechnet oder
verworfen werden; mehrdeutige oder vorbestehende Nutzerarbeit nie revertieren.

## Ein Run

1. Klaere Ziel, autorisierte Dateien, Schnittstellen, Gates und Tabus. Frage
   fehlende Pflichtangaben mit `AskUserQuestion`.
2. Plane **2–6 Knoten** als azyklischen DAG. `label`, `deps` und `write_set`
   sind nach der ersten Ledger-Schreiboperation unveraenderlich. Parallele
   Writer haben disjunkte Schreibmengen; gemeinsame Dateien haben einen Owner.
3. Schreibe das Ledger atomar und projiziere kurze Phasen in `TodoList`; jeder
   Todo-Eintrag bleibt `{title,status}`, mit genau einem `in_progress`.
4. Dispatch `Agent` oder `AgentSwarm` nur fuer unabhaengige, begrenzte
   Knoten. Jeder Prompt enthaelt Ziel, Kontext, Scope, Dateien,
   Abhaengigkeiten, Kriterien, Gates, Handoff und wortgleich:

   > Do not call Agent or AgentSwarm. Do not create subagents, agents, or
   > descendants. Root Kimi alone may dispatch work.

5. Speichere jede zurueckgegebene Agent-ID sofort im Ledger. Bei Resume zuerst
   `TodoList` im Query-Modus lesen, dann das Ledger mit `Read` laden und beide
   gegen die vorhandenen IDs abgleichen. Einen einzelnen Agenten nur mit
   `Agent` mit `resume: "<agent-id>"`, `prompt` und `description` fortsetzen;
   dabei keinen `subagent_type` mitsenden. Mehrere vorhandene Agenten nur ueber
   `AgentSwarm(resume_agent_ids: {"<agent-id>": "<Fortsetzung>"})`
   fortsetzen und nicht zugleich als neue `items` duplizieren. Fehlt eine
   eindeutige Zuordnung: `RECONCILIATION_REQUIRED`, kein neuer Dispatch.
6. Root liest autoritative Dateien selbst, prueft Diff und Gates mit
   `Read`/`Bash` sowie relevante Suchen mit `Grep`/`Glob`. Agent-Berichte sind
   Hinweise; Findings werden erst mit Root-Beleg `accepted`, `rejected` oder
   `open` im Ledger.
7. Halte bis zum Ende der Verifikation genau einen Todo-Eintrag `in_progress`.
   Danach das Ledger atomar terminal markieren, `best_effort_authorized` auf
   `false` zuruecksetzen und alle erledigten Todo-Phasen auf `done` setzen.
   Erst dann Run-ID, Ledger-Pfad, Knoten-/Agentzahl, Gates, Evidence und Risiken
   berichten. Keine automatische Wiederholung, Commit- oder Push-Aktion.

## Ledger-Beispiel: zwei Knoten mit Kante

```json
{
  "run_id": "dw-2026-07-21-01",
  "skill": "dynamic-workflow",
  "best_effort_authorized": false,
  "nodes": {
    "inspect": {
      "label": "inspect",
      "deps": [],
      "scope": ["src/"],
      "write_set": [],
      "agent_id": null,
      "evidence": []
    },
    "implement": {
      "label": "implement",
      "deps": ["inspect"],
      "scope": ["src/feature.ts"],
      "write_set": ["src/feature.ts"],
      "agent_id": null,
      "evidence": []
    }
  }
}
```

## Task-scoped Best Effort

`best_effort_authorized` startet im Workspace-Ledger mit `false`. Nur eine
ausdrueckliche Freigabe fuer diesen Run setzt es auf `true`; Resume liest
denselben Wert. Der Latch wird am Run-Ende verworfen, ist nicht global und
hebt Nutzerfreigaben oder Sicherheitsgrenzen nie auf.

## User-facing limits

- Genau ein Run mit 2–6 DAG-Knoten; keine tasklose/SOLO-Ausnahme.
- TodoList nur mit `title`/`status`, nur drei legale Status und genau ein
  `in_progress` waehrend der Arbeit.
- Root allein dispatcht; Agenten duerfen keine Nachkommen starten.
- Kein Abschluss ohne Root-gepruefte Dateien, Diff und Gates.

## Gotchas

- Agent-IDs gehoeren ins atomare Ledger, nicht in TodoList-Zusatzfelder.
- `Agent(resume)` behaelt seinen Typ; ein zusaetzlicher `subagent_type` wird
  vom Runtime-Schema abgelehnt.
- Zwei Knoten ohne Kante sind nur Fan-out; der Beispiel-DAG zeigt deshalb
  bewusst `inspect -> implement`.
