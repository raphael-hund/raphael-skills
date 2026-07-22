---
name: sdd
description: "Fuehre einen vorhandenen Implementierungsplan taskweise aus: schema-legale TodoList, atomares Run-Ledger, resumierbarer coder, getrennte Spec-/Quality-Reviews und belegtes Red-Green nach jedem Fix."
---

# sdd

Dieser Skill setzt einen bestaetigten Implementierungsplan mit Tasks,
Abhaengigkeiten, Dateien, Interfaces, Gates und Abnahmekriterien voraus. Fehlt
er, stoppt Root-Kimi und fragt mit `AskUserQuestion`; kein Agent erfindet ihn.

## Runtime- und Ledger-Vertrag

Zielhost ist Kimi Code 0.28.1. Nutze `TodoList`, `Agent`, `AgentSwarm`,
`AskUserQuestion`, `Skill`, `Read`, `Write`, `Edit`, `Bash`, `Grep`, `Glob`,
`FetchURL` und `WebSearch` mit den eingebauten Agenttypen `coder`, `explore`
und bei reiner Plananalyse `plan`.

`TodoList` enthaelt pro Eintrag ausschliesslich `title` und `status`
(`additionalProperties: false`). Erlaubt sind nur `pending`, `in_progress`, `done`; jede Aktualisierung waehrend der
Arbeit hat genau einen `in_progress`-Eintrag. Red-/Green-Belege, Agent-IDs,
Dependencies, Verdikte und Blocker duerfen keine Todo-Zusatzfelder sein.

Der vollstaendige Plan-Run lebt in `.kimi/workflows/<run-id>.json`; Root nennt
diesen Pfad beim Start und Abschluss. Das Ledger enthaelt Run, Planquelle,
`best_effort_authorized`, stabile Task-DAG-Knoten, `scope`, `write_set`,
Implementierer-/Reviewer-IDs, Red/Green-Ausgaben, Non-TDD-Ausnahmen,
Review-Runden, Findings, Gates, Evidence und Blocker. Jede Mutation: komplettes
JSON per `Write` nach `<run-id>.json.tmp`, mit `Bash` validieren und im selben
Verzeichnis atomar per `mv` ersetzen.

Vor jedem schreibenden Task speichert Root `git status --short --untracked-files=all`,
den relevanten Diff und Blob-/SHA-256-Hashes der
`write_set`-Pfade. Nur gegen diese Pre-Dispatch-Baseline eindeutig
zuordenbare Writer-Aenderungen duerfen verworfen werden; vorbestehende oder
mehrdeutige Nutzerarbeit nie revertieren.

## Plan und Resume

1. Root liest den gesamten Plan und prueft DAG, Interfaces, Scope,
   ueberschneidende Schreibmengen und ausfuehrbare Gates vor dem Dispatch.
2. Root schreibt das Ledger atomar und projiziert kurze Phasen in TodoList;
   genau eine Phase ist `in_progress`.
3. Bei Resume: TodoList ohne `todos` abfragen, Ledger mit `Read` laden und
   beide gegen gespeicherte IDs reconciliieren. Einzelne vorhandene Agenten
   mit `resume`, `prompt` und `description`, aber ohne `subagent_type`
   fortsetzen. Mehrere nur ueber `AgentSwarm.resume_agent_ids`; nicht als neue
   `items` wiederholen. Uneindeutigkeit ist `RECONCILIATION_REQUIRED`.

## Task-Lifecycle: echtes Red-Green

Fuer jeden bereiten Plan-Task gilt:

Jeder `Agent`- und `AgentSwarm`-Prompt — Implementierung, Fix, Spec-Review,
Quality-Review oder Resume — enthaelt explizit und wortgleich:

> Do not call Agent or AgentSwarm. Do not create subagents, agents, or
> descendants. Root Kimi alone may dispatch work.

1. **Focused Red:** Root fuehrt vor der Implementierung einen gezielten Test
   mit `Bash` aus. Der Test muss tatsaechlich fehlschlagen, und Root muss aus
   Ausgabe und Assertion belegen, dass er aus dem **beabsichtigten fachlichen
   Grund** rot ist, nicht wegen Syntax, Setup, Netzwerk oder fremder Fehler.
2. **Nur explizite Non-TDD-Ausnahme:** Ist ein focused Red wirklich
   unmoeglich oder sachlich unpassend, stoppt Root vor der Implementierung und
   fragt mit `AskUserQuestion`. Nur eine ausdrueckliche Nutzerfreigabe fuer
   genau Task, Grund und Ersatz-Gate erlaubt die Fortsetzung. Root speichert
   die Freigabe im atomaren Ledger; sie gilt nicht fuer andere Tasks oder Runs.
   Ein bereits gruener Test ist ohne diese Freigabe kein Ersatz fuer Red.
3. **Implementieren:** Ein begrenzter `coder`-Agent erhaelt Ziel, Planstelle,
   exakte Dateien, Interfaces, `write_set`, Red-Beleg, Green-Befehl,
   Abnahmekriterien und die obige Nachkommen-Sperre.

4. **Green:** Root liest Diff/Dateien und fuehrt den focused Test plus
   relevante Regression-Gates selbst aus. Erst ein belegtes Green erlaubt
   Reviews.
5. **Getrennte Reviews:** Nach Green startet Root zwei getrennte read-only
   `explore`-Aufrufe: zuerst Spec-Review, dann Quality-Review. Jeder Prompt
   enthaelt dieselbe Nachkommen-Sperre. Spec prueft Plan, Scope, Interfaces und
   Akzeptanz; Quality prueft Code, Tests, Fehlerfaelle, Sicherheit und
   Wartbarkeit. Reviewer schreiben keine Fixes.
6. **Fix-Regel:** Nach jedem bestaetigten Review-Fix muss Root **Green erneut
   ausfuehren, bevor beide Reviews erneut starten**. Kein Review-Verdikt aus
   dem alten Diff bleibt gueltig. Maximal zwei Fix-/Review-Runden pro Task;
   danach bleibt der Todo-Schritt `in_progress` und Root fragt den Nutzer.
7. Root speichert alle Agent-IDs, Ausgaben, Green-Belege und Verdikte sofort
   atomar im Ledger. Ein Writer-, Reviewer- oder Swarm-Paket darf niemals
   `Agent`, `AgentSwarm` oder Nachkommen starten; nur Root dispatcht.

## Globaler Abschluss

Nach dem letzten Task prueft Root den gesamten Diff, Architektur, Scope,
Interfaces, alle focused Red-/Ausnahmebelege, das letzte Green jedes Tasks,
beide letzten Review-Verdikte und globale Gates. Bis zum Ende der Verifikation
bleibt genau ein Todo `in_progress`; danach Ledger atomar terminal markieren,
`best_effort_authorized` auf `false` zuruecksetzen und alle abgeschlossenen
Todo-Phasen auf `done` setzen. Berichte Run-ID, Ledger-Pfad, Tasks, Evidence,
Ausnahmen und Risiken; kein automatischer Commit, Push, Merge oder Release.

## Task-scoped Best Effort

`best_effort_authorized` startet im Ledger mit `false`. Eine explizite
Run-Freigabe darf es aendern, aber niemals das focused-Red- bzw.
Non-TDD-Gate, Nutzerfreigaben oder Sicherheitsgrenzen umgehen. Der Wert wird
am Run-Ende verworfen.

## User-facing limits

- Pro Task: echter focused Red fuer den beabsichtigten Grund oder explizite,
  im Ledger belegte Nutzer-Ausnahme.
- Nach jedem Fix erneut Green, danach beide getrennten Reviews erneut.
- TodoList nur `title`/`status`, drei Status, genau ein `in_progress`.
- Maximal zwei Fix-/Review-Runden; Root allein dispatcht und verifiziert.

## Gotchas

- Ein Test, der wegen fehlender Dependency rot ist, ist kein gueltiges Red.
- Reviews vor Green oder nach einem Fix ohne erneutes Green sind veraltet.
- `done`, Agent-IDs und Reviewbelege nicht in einem Todo-Objekt vermischen;
  Detailzustand gehoert ausschliesslich ins atomare Workspace-Ledger.
