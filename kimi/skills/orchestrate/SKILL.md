---
name: orchestrate
description: "Orchestriere nur groessere Kimi-Arbeit mit leader-eigenem DAG, schema-legaler TodoList, atomarem Workspace-Ledger, resumierbaren coder/explore/plan-Agenten und unabhaengigem Verifier."
---

# orchestrate

Dieser Skill gilt nur fuer groessere Arbeit mit mindestens zwei substantiellen,
unabhaengigen Paketen. Kleine geschlossene Aufgaben bleiben bei Root-Kimi;
performative Delegation ist unzulaessig.

## Runtime- und State-Vertrag

Zielhost ist Kimi Code 0.28.1. Nutze `TodoList`, `Agent`, `AgentSwarm`,
`AskUserQuestion`, `Skill`, `Read`, `Write`, `Edit`, `Bash`, `Grep`, `Glob`,
`FetchURL` und `WebSearch`. `Agent` verwendet nur `coder`, `explore` oder
`plan`.

`TodoList` ist nur die sichtbare Kurzprojektion. Jeder Eintrag enthaelt exakt
`title` und `status` (`additionalProperties: false`); `status` ist nur
`pending`, `in_progress` oder `done`.
Jede Aktualisierung waehrend der Arbeit hat genau einen `in_progress`-Eintrag.
Keine Agent-ID, Dependency, Rolle, Evidence oder Blocker als Zusatzfeld.

Root persistiert den vollstaendigen DAG unter
`.kimi/workflows/<run-id>.json` und legt den Pfad dem Nutzer offen. Das Ledger
enthaelt Run, Auftrag, `best_effort_authorized`, stabile Knoten (`label`,
`deps`, Rolle, `scope`, `write_set`), Agent-/Swarm-IDs, Versuche, Gates,
Verdikte, Evidence und Blocker. Jede Aenderung wird als komplettes JSON mit
`Write` nach `<run-id>.json.tmp` geschrieben, mit `Bash` validiert und per
atomarem `mv` im selben Verzeichnis ersetzt.

Vor jedem Writer-Fan-out speichert Root `git status --short --untracked-files=all`,
den relevanten Diff und Blob-/SHA-256-Hashes aller
Schreibpfade als Pre-Dispatch-Baseline. Vorbestehende oder nicht eindeutig
zuordenbare Nutzer-Aenderungen bleiben unberuehrt und werden nie revertiert.

## Rollen

- **Leader/Root-Kimi:** besitzt Zerlegung, DAG, Ledger, Todo-Projektion,
  Dispatch, Nutzerfreigaben, Integration und Abschluss.
- **`plan`:** begrenzte read-only Architektur- oder Risikoanalyse.
- **`explore`:** read-only Recherche oder Pruefung mit Pfad-/Quellenbeleg.
- **`coder`:** genau ein begrenztes Schreibpaket mit disjunkter `write_set`.
- **Verifier:** frischer read-only `explore`-Agent, der nie Writer desselben
  Pakets war und keine Fixes schreibt.

## Ablauf

1. Root begruendet, warum mindestens zwei Pakete eine Orchestrierung lohnen,
   und zerlegt selbst. Ein `plan`-Agent darf beraten, aber den Leader-DAG nicht
   ersetzen oder freigeben.
2. Root schreibt zuerst das atomare Ledger und dann eine legale TodoList mit
   kurzen Phasentiteln; genau eine Phase ist `in_progress`.
3. Dispatch nur unabhaengige Pakete mit `Agent` oder `AgentSwarm`. Parallele
   Writer haben disjunkte Dateien; Index, Lock und gemeinsame Konfiguration
   bekommen genau einen Owner. Jeder Auftrag enthaelt Kontext, Scope, Dateien,
   Nicht-Ziele, Interfaces, Kriterien, Gates, Handoff und wortgleich:

   > Do not call Agent or AgentSwarm. Do not create subagents, agents, or
   > descendants. Root Kimi alone may dispatch work.

4. Agent-IDs sofort atomar im Ledger speichern. Bei Resume zuerst `TodoList`
   ohne `todos` abfragen, dann Ledger lesen und die sichtbare Phase gegen
   Knoten und IDs reconciliieren. Einen Agenten mit seinem `resume`-Wert,
   `prompt` und `description`, aber ohne `subagent_type` fortsetzen. Mehrere
   IDs ueber `AgentSwarm.resume_agent_ids` fortsetzen; dieselbe Arbeit nicht
   noch einmal in `items` starten. Uneindeutigkeit ergibt
   `RECONCILIATION_REQUIRED`.
5. Nach den Writern startet Root einen getrennten read-only `explore`-
   Verifier mit derselben Nachkommen-Sperre. Root prueft anschliessend Dateien,
   vollstaendigen Diff und Gates selbst und schreibt Findings samt Beleg als
   `accepted`, `rejected` oder `open` ins Ledger.
6. Kritische bestaetigte Findings erhalten ein neues enges Fix-Paket und eine
   erneute unabhaengige Verifikation. Nutzerentscheidungen zu Scope, Risiko,
   Daten oder Release werden mit `AskUserQuestion` eingeholt; kein Agent und
   kein Leader bestaetigt sie stellvertretend.
7. Bis zum Ende der Verifikation bleibt genau ein Todo `in_progress`. Danach
   Ledger atomar terminal markieren, den Best-Effort-Latch auf `false`
   zuruecksetzen und alle abgeschlossenen Todo-Phasen auf `done` setzen.
   Berichte Run-ID, Ledger-Pfad, Rollen, Agent-IDs in gekuerzter Form, Gates,
   Dissens und Risiken. Kein automatischer Commit, Push, Merge oder Release.

## Task-scoped Best Effort

Das Ledger startet mit `best_effort_authorized: false`. Nur eine explizite
Freigabe fuer diesen Run darf den Wert aendern; Resume liest ihn aus dem
Ledger. Er ist weder global noch eine Release-, Daten- oder
Sicherheitsfreigabe und wird am Run-Ende verworfen.

## User-facing limits

- Nur groessere Arbeit; kleine Tasks werden nicht performativ delegiert.
- TodoList: exakt `title`/`status`, nur drei Status, genau ein
  `in_progress` waehrend der Arbeit.
- Root allein dispatcht; Agenten und Swarms duerfen keine Nachkommen starten.
- Parallele Writer muessen disjunkt sein; unabhängiger read-only Verifier ist
  vor Abschluss Pflicht.

## Gotchas

- `AgentSwarm.resume_agent_ids` ist eine ID→Prompt-Abbildung; resumierte Arbeit
  darf nicht parallel als neues `item` auftauchen.
- Agenten- und Evidence-Daten in TodoList verletzen `additionalProperties:
  false`; sie gehoeren ins Workspace-Ledger.
- Ein Plan-Agent ist Beratung, nicht Leader oder Freigabeinstanz.
