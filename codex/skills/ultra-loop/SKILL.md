---
name: ultra-loop
description: >
  Betreibe einen selbstkritischen Verbesserungs-Loop, dessen Runde einen dynamischen sichtbaren Codex-Thread-Workflow ausfuehrt. Trigger: "/ultra-loop", "Loop mit Workflows", "Dauer-Verbesserungs-Loop", "selbstkritischer Loop", "loop der sich verbessert" und "ultracode-Loop". Runde 1 startet sofort; eine echte Wiederholung braucht ausdruecklichen Auftrag und verfuegbare Automation.
---

# ultra-loop

Dieser Skill startet bei ausdruecklicher Invokation sofort **eine** erste
Verbesserungsrunde. Jede Runde nutzt sichtbare, user-owned Codex-Tasks. Es
gibt keinen tasklosen Ausfuehrungszweig und keine Ausnahme fuer Kleinst-Fixes.
Dieser Text beschreibt keinen stillen Hintergrundlauf.

## 1. Faehigkeiten entdecken und mockbarer Vertrag

Vor dem ersten Create mappe die vom Host surfaced Tools auf diese Rollen:
`list_projects`/`get_project` (Projekt-Lookup), `create_thread`
(nonblocking), `list_threads`, `read_thread`, `wait_threads`,
`send_message_to_thread`, `set_thread_title` und
`archive_thread`/`set_thread_archived`. Exakte Host-Namen koennen variieren.
Fehlt eine fuer den Schritt benoetigte Rolle, stoppe mit
`CAPABILITY_UNAVAILABLE:<rolle>:<grund>`; waehle keine andere Ausfuehrungsart.

Tests verwenden ausschliesslich einen konzeptionellen Mock-Vertrag, niemals
echte Codex-Tasks:

```text
backend.discover() -> capabilities
backend.list_projects() -> projects
backend.create_thread({label, target}) -> {threadId?, hostId?, clientThreadId?, status}
backend.list_threads({projectId?, projectless?, afterCursor?}) -> {threads, nextCursor?}
backend.read_thread({threadId, hostId?, afterCursor?}) -> {events, cursor, status}
backend.send_message_to_thread({threadId, hostId?, message}) -> accepted
backend.wait_threads({targets, timeoutMs}) -> {updates, timedOut}
backend.set_thread_title({threadId, hostId, title}) -> accepted
backend.archive_thread({threadId, hostId}) -> archived
```

## 2. Runde, DAG und Ledger

Pruefe Working Tree und Stand-Datei, uebernehme Reste einer abgebrochenen
Runde und waehle genau einen offenen Punkt mit Substanz. Plane dafuer 2–6
Knoten als DAG fuer Kritik, Verifikation, Fix und Tests. Jeder Knoten fuehrt
ein stabiles `label`, `deps`, `scope`, `write_set`, `threadId`, `hostId`,
`clientThreadId`, `cursor`, `status` und `verification`:

```json
{
  "run_id": "loop-run-1",
  "run_mode": "ultra-loop",
  "round": 1,
  "best_effort_authorized": false,
  "nodes": {
    "critique": {
      "label": "critique",
      "deps": [],
      "scope": ["/repo"],
      "write_set": [],
      "threadId": null,
      "hostId": null,
      "clientThreadId": null,
      "cursor": null,
      "status": "planned",
      "verification": {"required": true, "status": "pending", "evidence": []}
    }
  }
}
```

Labels, Kanten und Write-Sets bleiben bei Resume stabil; parallele Writer
teilen keine Dateien. Reports werden erst nach eigener Lektuere von Dateien,
Diff und Gates akzeptiert.

## 3. Target und Dispatch

Bei Projektarbeit fuehre vor jedem `create_thread` den Projekt-Lookup aus und
nutze die exakte `projectId`. Standard ist
`target: {type: project, projectId, environment: {type: local}}`, isolierte
Schreibbereiche koennen ein Worktree-Target erhalten, und ohne Projekt gilt
`target: {type: projectless}`. Setze `startingState: {type: working-tree}` nur
nach ausdruecklichem Wunsch.

Reconcile vor jedem Create den Live-Stand ueber `list_threads`. Erzeuge jeden
bereiten Task einmal nonblocking. Lass `model` und `thinking` in
`create_thread` und `send_message_to_thread` weg, ausser der Nutzer verlangt
die konkrete Einstellung. Bei echter `threadId` plus `hostId` emittiere
`::created-thread{threadId="..."}`; bei Queue nur
`::created-thread{clientThreadId="..."}` und warte erst nach der Zuordnung.
Sende vollstaendige Pakete; Rueckfragen und Freigaben beantwortet der Nutzer.

## 4. Queue, Wait und idempotentes Resume

Gleiche `clientThreadId` mit `list_threads` exakt zu echter `threadId` plus
`hostId` ab, bevor `read_thread`, `send_message_to_thread` oder
`wait_threads` verwendet wird. Bei Unklarheit gilt
`RECONCILIATION_REQUIRED`, nicht raten.

Ueberwache hoechstens 8 (max 8) Targets pro `wait_threads`-Aufruf. Nutze
`timeoutMs: 0` fuer Snapshots oder ein begrenztes Fenster von 30–60 Sekunden;
fuehre `afterCursor` pro Target fort und wiederhole keinen finalen Text.
Resume laedt zuerst Ledger und Live-Stand: vorhandene `completed`, `running`,
`queued` oder wartende Knoten werden verifiziert bzw. weitergenutzt, niemals
dupliziert. Nur ein Label ohne Live-Match und ohne Abschluss darf einmal neu
erzeugt werden. User-Input bleibt beim Nutzer.

## 5. Task-scoped Best-Effort und Smoke-Test

`best_effort_authorized` ist ein Boolean des aktuellen Runden-Ledgers und
startet `false`. Setzt der Nutzer es in dieser Runde auf `true`, verwenden
Retries und Resume denselben Wert ohne erneute Frage. Am Ende von Task/Run
wird er verworfen: nicht global persistent und nie als globale Freigabe
behaupten. Ohne `true` gelten alle Gates.

Eine echte disposable Smoke-Task ist nur bei ausdruecklichem Testauftrag
zulaessig. Markiere `smoke_test: true`, verifiziere den Abschluss und
archiviere danach ueber den entdeckten `archive_thread`/
`set_thread_archived`-Alias; verifiziere den Archivstatus. Im normalen Run
gibt es keine Smoke-Task. Fehlt die Archiv-Rolle, melde
`CAPABILITY_UNAVAILABLE:archive` und keine Bereinigung als erfolgt.

## 6. Wiederholung und Abschluss

Runde 1 startet sofort und wird vollstaendig verifiziert. Suche nur bei
ausdruecklichem Loop- oder Schedule-Wunsch nach `automation_update` oder dem
verfuegbaren recurring-task-Mechanismus. Lege eine echte recurring Automation
nur an, wenn der Nutzer sie ausdruecklich verlangt **und** das Tool vorhanden
ist; andernfalls bleibt es bei dieser einen Runde und wird transparent
gemeldet. Ohne Wiederholungsauftrag endet der Run nach Runde 1.

Schreibe Runde, Run-ID, Thread-IDs, Taskzahl, Befunde zu Fixes, Gates,
Commitstatus und naechsten offenen Punkt in die Stand-Datei. Keine
unbeauftragten Commits oder Pushes, keine unbeauftragte zweite Runde. Nutze
ausschliesslich sichtbare, user-owned Codex-Tasks/Threads; bei fehlender
Faehigkeit stoppe klar.
