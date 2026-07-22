---
name: sdd
description: >
  Führe einen vorhandenen Implementierungsplan taskweise als sichtbare
  user-owned Codex-Tasks aus. Trigger: "Plan umsetzen", Alias "Codex-Task pro Task", "Tasks ausführen" und "Codex-task-driven development". Halte einen
  Task-DAG und ein Ledger, trenne Implementierung, Spec-Review und
  Qualitäts-Review, verifiziere Befunde selbst und schließe mit einer globalen
  Review ab.
---

# sdd

Verlange vor dem Start einen fertigen Implementierungsplan mit weitgehend
unabhängigen Tasks, Interfaces, Dateien, Gates und Abnahmekriterien. Eine
ausdrückliche SDD-Invokation oder einer der Trigger autorisiert separate,
sichtbare Threads; andernfalls delegiere nicht still.

## Vorab und Ledger

1. Lies Plan und vorhandenes Ledger. Prüfe den gesamten DAG auf Widersprüche,
   Scope-Drift, fehlende Interfaces und Gate-Konflikte. Bündele Befunde vor
   dem ersten Dispatch. Reconcile `DONE`, `BLOCKED`, stale `IN-PROGRESS` und
   `TODO`, bevor du einen neuen Task startest; einen abgeschlossenen Task nie
   erneut ausführen.
2. Führe je Task Registry und Ledger mit `label`, `deps`, `threadId`, `hostId`,
   optional `clientThreadId`, `cursor`, `status`, Commit-Bereich und
   Review-Verdikten. Aktualisiere das Ledger nach jedem sauber geprüften Task,
   nicht nur im Gespräch.

## Task-Lifecycle

1. Extrahiere den exakten Plan-Task, seine Dateien, Vorgänger-Artefakte,
   Interfaces, Constraints, Tests und erwartete Rückgabe.
2. Lies bei Projektarbeit vor `create_thread` mit `list_projects` die Projekte
   und nimm die exakte `projectId`. Nutze als Default das lokale
   `target: {type: project, projectId, environment: {type: local}}`, für
   isolierte Writer `target: {type: project, projectId, environment: {type: worktree}}` und für allgemeine Reviews `target: {type: projectless}`. Setze
   im Worktree-Environment `startingState: {type: working-tree}` nur nach
   ausdrücklicher
   Nutzeranforderung. Erzeuge pro Plan-Task einen eigenen sichtbaren Thread,
   weil die SDD-Ausführung dies autorisiert; parallele Writer bearbeiten nie
   dieselbe Datei.
3. Erzeuge nonblocking und ohne `model` oder `thinking` in `create_thread`
   bzw. `send_message_to_thread`, sofern der Nutzer keine konkrete Einstellung
   verlangt. Gib sofort `::created-thread{threadId="..."}` aus. Falls ein
   eingereihtes Worktree nur `clientThreadId` liefert, gib
   `::created-thread{clientThreadId="..."}` aus, behandle es nicht als
   wartbar und gleiche über `list_threads` zu `threadId` plus `hostId` ab.
4. Übergib ein vollständiges Paket aus Ziel, Kontext, Scope, Abhängigkeiten,
   Interfaces, Kriterien, Prüfkommandos und Handoff-Format. Bei Fragen liefere
   fehlenden Kontext nach; bei `BLOCKED` ordne Ursache ein, teile einen zu
   großen Task oder eskaliere einen fehlerhaften Plan.
5. Überwache höchstens acht Targets pro `wait_threads`-Aufruf; nutze
   `timeoutMs: 0` für Snapshots, sonst 30–60 Sekunden. Commentary weckt nicht.
   Reiche `afterCursor` weiter, wiederhole keine finalen Texte und beantworte
   User-Input oder Approval niemals stellvertretend. Nutze
   `send_message_to_thread` für Steering und `read_thread` für gezielte
   Diagnose.

## Reviews und Abschluss

1. Nach einem Implementierungs-Status `DONE` prüfe den vollständigen Diff seit
   Dispatch-Beginn und starte zwei getrennte sichtbare Review-Tasks: einen für
   Spec-Konformität und einen für Code-Qualität. Beide Verdikte sind Pflicht.
2. Verifiziere jedes Review-Finding selbst in Diff, Dateien und Tests. Bei
   kritischen oder wichtigen Lücken starte einen gebündelten Fix-Task und
   wiederhole beide Reviews; höchstens zwei Revisionsrunden. Bei Minor-Funden
   schreibe das Ledger fort und triagiere sie global. `APPROVE` schließt den
   Task; `REVISE` hält ihn an; `BLOCK` eskaliert.
3. Nach dem letzten Task starte eine sichtbare globale Review über den
   Branch-Diff seit dem Ausgangspunkt. Prüfe Architektur, Scope, Gates und
   Ledger selbst. Führe keine automatische Commit-, Push- oder Branchaktion
   ohne Nutzerfreigabe aus und berichte accepted, rejected und open.
