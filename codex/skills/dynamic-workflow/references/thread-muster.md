# Codex Thread-Muster und Lifecycle

Diese Referenz ist eine Kurzform des Vertrags in `../SKILL.md`. Sie gilt fuer
einen einzelnen sichtbaren, user-owned Run; Tests koennen den Backend-Vertrag
mocken, ohne echte Tasks anzulegen.

## Vorbereitung

1. Entdecke die vom Host angebotenen Rollen fuer `list_projects`/`get_project`,
   `create_thread`, `list_threads`, `read_thread`, `wait_threads`,
   `send_message_to_thread`, `set_thread_title` und
   `archive_thread`/`set_thread_archived`. Fehlt eine benoetigte Rolle,
   stoppe mit `CAPABILITY_UNAVAILABLE:<rolle>:<grund>`.
2. Plane 2–6 Knoten als DAG. Die Registry pro Knoten fuehrt `label`, `deps`,
   `scope`, `write_set`, `threadId`, `hostId`, `clientThreadId`, `cursor`,
   `status` und `verification`; das Workflow-Ledger fuehrt ausserdem
   `best_effort_authorized`.
3. Bei Projektarbeit zuerst `list_projects`, dann exakte `projectId` waehlen.
   Standard: lokales Project-Target; isolierte Writer erhalten ein Worktree-
   Target; ohne Projekt `target: {type: projectless}`.

## Dispatch

Vor jedem Create zuerst den Live-Stand mit `list_threads` reconciliieren.
Erzeuge sichtbare Tasks nonblocking und lasse `model`/`thinking` weg, solange
der Nutzer nichts Konkretes verlangt. Eine Queue-Antwort mit nur
`clientThreadId` wird sofort angezeigt, aber erst nach Zuordnung zu echter
`threadId` plus `hostId` wartbar.

## Warten und Resume

`wait_threads` ueberwacht hoechstens 8 Targets, mit `timeoutMs: 0` oder einem
Fenster von 30–60 Sekunden und fortgeschriebenem `afterCursor`. Neue Events
werden einmal verarbeitet; finaler Text wird nicht wiederholt. Resume laedt
Ledger und Live-Stand vor jedem Create und nutzt vorhandene queued/running/
completed Threads, statt Duplikate zu erzeugen. User-Input und Freigaben
bleiben beim Nutzer.

## Smoke und Best-Effort

Eine disposable echte Smoke-Task ist nur bei ausdruecklichem Testauftrag
zulaessig und wird nach erfolgreicher Verifikation ueber das entdeckte
Archiv-Tool archiviert und verifiziert. `best_effort_authorized` ist ein
task-scoped Boolean: einmal im aktuellen Ledger auf `true` gesetzt, gilt es
auch fuer Retries/Resume; am Workflow-Ende wird es verworfen und nie global
persistent behauptet.
