---
name: ultra-loop
description: "Starte sofort Runde 1 eines Kimi-Verbesserungsloops; jede Runde nutzt legale TodoList-Phasen, ein atomares Run-Ledger und Root-dispatchte Agents, Wiederholung nur mit Nutzerauftrag und echter Host-Automation."
---

# ultra-loop

Runde 1 startet bei ausdruecklicher Invokation sofort. Jede Runde nutzt echte
`Agent`-/`AgentSwarm`-Arbeit und sichtbare TodoList-Phasen; es gibt keine
tasklose oder SOLO-Ausnahme. Standard ist genau eine Runde.

## Runtime- und State-Vertrag

Zielhost ist Kimi Code 0.28.1. Nutze `TodoList`, `Agent`, `AgentSwarm`,
`AskUserQuestion`, `Skill`, `Read`, `Write`, `Edit`, `Bash`, `Grep`, `Glob`,
`FetchURL` und `WebSearch`; Agenttypen sind `coder`, `explore` und `plan`.

TodoList-Eintraege haben exakt `title` und `status`, ohne Zusatzfelder
(`additionalProperties: false`).
Erlaubte Status: `pending`, `in_progress`, `done`. Jede Aktualisierung
waehrend der Runde hat genau einen `in_progress`-Eintrag; ein Blocker bleibt
`in_progress`. Runden-, DAG-, Agent-, Best-Effort- und Evidence-Daten stehen
nicht in TodoList.

Der vollstaendige Zustand lebt in `.kimi/workflows/<run-id>.json`; Root nennt
den Pfad beim Start und Abschluss. Das Ledger enthaelt Run und Runde,
Mission, `best_effort_authorized`, stabile DAG-Knoten mit `label`, `deps`,
`scope`, `write_set`, Agent-/Swarm-IDs, Altlasten, Findings, Fixes, Gates,
Evidence, naechsten Punkt, Automation und Blocker. Jede Mutation atomar:
vollstaendiges JSON per `Write` nach `<run-id>.json.tmp`, mit `Bash`
validieren, dann im selben Verzeichnis per `mv` ersetzen.

Vor jedem Writer speichert Root als Pre-Dispatch-Baseline
`git status --short --untracked-files=all`, den relevanten Diff und
Blob-/SHA-256-Hashes der
`write_set`-Pfade im Ledger.
Vorbestehende oder mehrdeutige Nutzer-Aenderungen nie einem Agenten zurechnen
oder revertieren.

## Jede Runde

1. Root liest Working Tree, Stand-Datei und vorhandenes Ledger. Abgebrochene
   Reste zuerst zuordnen; nichts still ueberschreiben.
2. Root waehlt genau einen substantiellen Verbesserungspunkt, schreibt 2–6
   stabile DAG-Knoten ins Ledger und projiziert kurze Phasen in TodoList.
   Genau eine Phase ist `in_progress`.
3. Jede Runde dispatcht mindestens einen begrenzten Agenten. Unabhaengige
   read-only Kritiken duerfen als `AgentSwarm` laufen; parallele Writer haben
   disjunkte `write_set`s. **Jeder** Agent- und Swarm-Prompt enthaelt
   wortgleich:

   > Do not call Agent or AgentSwarm. Do not create subagents, agents, or
   > descendants. Root Kimi alone may dispatch work.

4. Speichere zurueckgegebene IDs sofort atomar. Bei Resume zuerst TodoList
   ohne `todos` abfragen, Ledger lesen und beide reconciliieren. Einzelne IDs
   ueber `Agent` mit `resume`, `prompt`, `description` und ohne
   `subagent_type` fortsetzen. Mehrere ueber
   `AgentSwarm.resume_agent_ids`; resumierte Arbeit nie zugleich als neues
   `item` starten. Uneindeutigkeit ist `RECONCILIATION_REQUIRED`.
5. Root verifiziert Kritik, Dateien, Diff und Gates mit `Read`, `Grep`,
   `Glob` und `Bash`, wendet nur bestaetigte Fixes an und aktualisiert Ledger
   plus legale Todo-Projektion. Ergibt sich kein Fix, muss ein read-only Agent
   `NO_ACTION` mit Evidence liefern; keine erfundene Beschaeftigung.
6. Root berichtet Runde, Run-ID, Ledger-Pfad, Agentzahl, angenommene und
   verworfene Findings, Gates, Aenderungen und naechsten Punkt. Bis zu dieser
   Bis zum Ende der Verifikation bleibt genau ein Todo `in_progress`. Danach
   Ledger atomar terminal markieren, `best_effort_authorized` auf `false`
   setzen und alle abgeschlossenen Todo-Phasen auf `done` aktualisieren.

## Wiederholung und Host-Automation

Nach Runde 1 stoppt der Skill. Eine echte Wiederholung braucht beides:

1. einen ausdruecklichen Nutzerauftrag mit Intervall, Scope und Stop-Bedingung;
2. eine reale, erreichbare Automation-/Scheduler-Faehigkeit des Hosts.

`AskUserQuestion` holt fehlende Angaben ein. Mit den oben gelisteten
Kimi-Werkzeugen allein existiert keine solche Faehigkeit; dann melde nach
Runde 1 `CAPABILITY_UNAVAILABLE:recurrence`. Keine simulierten Timer, kein
Polling und keine unbeauftragte zweite Runde.

## Task-scoped Best Effort

`best_effort_authorized` startet fuer jede Runde im atomaren Ledger mit
`false`. Nur eine ausdrueckliche Freigabe fuer diesen Run setzt es auf `true`;
Resume liest denselben Wert. Nach dem Run wird er verworfen, ist nicht global
und ersetzt keine Nutzer- oder Sicherheitsfreigabe.

## User-facing limits

- Sofort eine Runde; jede Runde 2–6 Ledger-Knoten, sichtbare Todo-Phasen und
  echte Agent-Arbeit, niemals tasklos/SOLO.
- TodoList nur `title`/`status`, drei legale Status, genau ein `in_progress`.
- Nur Root dispatcht; Agenten und Swarms duerfen keine Nachkommen starten.
- Wiederholung nur mit Nutzerauftrag plus echter Host-Automation; sonst
  `CAPABILITY_UNAVAILABLE:recurrence`.

## Gotchas

- Agent-ID und `NO_ACTION`-Evidence gehoeren ins Ledger, nie als Todo-Felder.
- Eine vorhandene ID wird resumiert, nicht durch einen neuen gleichnamigen
  Agenten ersetzt.
- Ein Wiederholungswunsch schafft keine Scheduler-Faehigkeit.
