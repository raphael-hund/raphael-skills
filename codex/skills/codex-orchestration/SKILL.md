---
name: codex-orchestration
description: >
  Orchestriere sichtbare user-owned Codex-Tasks für nichttriviale Arbeit — als
  Codex-App-Einstieg mit demselben Task-, Verify- und Review-Vertrag wie
  orchestrate. Trigger: "Codex App tasks", "visible sub-threads",
  "multi-model fan-out", "model comparisons", "delegieren",
  "parallelisieren", "Sub-Tasks", "Task aufteilen", "orchestrieren",
  "Council", "Zweitmeinungs-Rat", "Workflow", "Loop", "Graph",
  "Gauntlet", "Cross-Model", "Cross-Harness".
---

# codex-orchestration

Das ist der Codex-App-Einstieg in denselben sichtbaren Orchestrierungsvertrag
wie `orchestrate`. Erzeuge sichtbare Threads nur nach ausdrücklicher
Skillinvokation oder einem genannten Trigger. Friere dann den endlichen
Task-Graph ein und erzeuge für jedes dependency-ready, unabhängige und nützliche
Paket sofort einen sichtbaren Task bis zur Live-Kapazität.

## Thread-Route

1. Nutze `create_thread` und `send_message_to_thread`, wenn sie im aktuellen
   Codex-App-Toolkatalog aufrufbar sind und der Startvertrag dort explizit
   `approvalPolicy: never` plus `sandbox: danger-full-access` setzen kann.
2. Fehlen diese Tools oder Berechtigungsfelder, nutze den installierten
   `codex-orchestration`-App-Server-Helper aus
   `/root/.codex/plugins/cache/codex-orchestration/codex-orchestration/*/skills/codex-orchestration/scripts/thread_orchestrator.py`.
   Ermittle zuerst mit `models` den Live-Katalog und verwende ohne explizite
   Nutzerwahl das in `/root/.codex/config.toml` konfigurierte Modell. Der Helper
   erzwingt und prüft Full Access ohne Approval-Prompts bei Start, Resume und
   jedem Turn.
3. Der App-Server-Fallback läuft für den ersten Turn synchron. Übergib dort
   kein `--no-wait`: Ein flüchtiger stdio-App-Server würde beim Prozessende den
   gerade gestarteten Turn unterbrechen.
4. Akzeptiere den Start erst, wenn `THREAD_ID`, `STATUS: completed`,
   `APPROVAL_POLICY: never` und `SANDBOX: danger-full-access` vorliegen und
   `read_thread` denselben sichtbaren Task mit abgeschlossenem Turn zeigt.

## Rollen und Muster

- **Leader-Thread:** klärt Scope, DAG, Gates und Reihenfolge; er entscheidet
  nicht über ungeprüfte Ergebnisse.
- **Task-Threads:** erledigen disjunkte Recherche- oder Schreibpakete mit
  vollständigem Kontext und klarer Rückgabeform.
- **Verifier-Thread:** prüft die Ergebnisse unabhängig gegen Spec, Tests und
  Diff. Übergib erst nach dieser Prüfung in den Ship-Pfad.
- **Council:** lasse mehrere unabhängige Antworten entstehen, anonymisiere sie
  mit stabilen, zufälligen Labels, lasse die Optionen gegenseitig ranken und
  synthetisiere als Root/Chairman Konsens, Dissens, blinde Flecken, Empfehlung
  und genau einen ersten Schritt. Der Chairman darf begründet von der
  Mehrheit abweichen.
- **Cross-Critique:** Bei hoher Tragweite lasse gegensätzliche Linsen zuerst
  unabhängig arbeiten und anschließend einander angreifen. Destilliere nur
  überlebende Constraints und Entscheidungen; der Leader schreibt den finalen
  Plan nicht selbst.

## Dispatch-Vertrag

1. Scanne Aufgabe, In-Scope-Dateien, Abhängigkeiten, Akzeptanzkriterien und
   Risiken. Friere daraus einmal einen endlichen DAG mit stabiler Paket-ID,
   `deps` und `write_set` ein. Ein Root-Owner koordiniert und integriert;
   Task-Threads sind Leaves und erzeugen keine Nachkommen.
2. Dispatch sofort alle dependency-ready Pakete bis zur live konfigurierten
   Kapazität: zwölf aktive und bis zu 32 wartende Requests. Ein Abschluss gibt
   den Slot unmittelbar für das nächste ready Paket frei. Es gibt weder eine
   künstliche Ein-/Drei-Task-Grenze noch eine kumulative Sessionquote und der
   Nutzer muss kein Parallelbudget nennen. Erzeuge keine dekorativen Duplikate
   nur zum Füllen der Kapazität.
3. Parallelisiere Writer nur bei disjunkten normalisierten `write_set`s oder in
   isolierten Worktrees. Abhängige Pakete bleiben geordnet; gemeinsame Dateien
   haben genau einen Integrations-Owner. Bei Websites laufen unabhängige Seiten
   parallel, gemeinsame UI gehört einem ausgewiesenen Opus-Integrator.
4. Lies bei Projektarbeit vor `create_thread` mit `list_projects` die Projekte
   und verwende die exakte `projectId`. Nutze als Default das lokale
   `target: {type: project, projectId, environment: {type: local}}`, für
   isolierte Writer `target: {type: project, projectId, environment: {type: worktree}}` und für allgemeine Arbeit `target: {type: projectless}`. Setze
   im Worktree-Environment `startingState: {type: working-tree}` nur auf
   ausdrücklichen Wunsch.
5. Erzeuge native App-Threads nonblocking; beim App-Server-Fallback warte auf
   den ersten abgeschlossenen Turn. Setze jeden Task und jeden Folgeturn auf
   Full Access mit Approval-Policy `never`. Lass `model` und `thinking` in
   `create_thread` sowie `send_message_to_thread` weg, außer der Nutzer fordert
   eine konkrete Einstellung. Lege je Task eine Registry mit `label`, `deps`,
   `threadId`, `hostId`, optional `clientThreadId`, `cursor` und `status` an.
6. Gib für echte Threads sofort
   `::created-thread{threadId="..."}` aus. Bei einem eingereihten Worktree
   mit nur `clientThreadId` gib
   `::created-thread{clientThreadId="..."}` aus, warte nicht darauf und
   gleiche später über `list_threads` zu `threadId` und `hostId` ab.
7. Formuliere jedes Task-Paket mit Ziel, Kontext, Dateien, Interfaces,
   Abhängigkeiten, Akzeptanzkriterien und Prüfkommandos. Weise den Leaf an,
   Routinezugriffe selbständig auszuführen und nur bei einer materiellen
   Produktentscheidung Rückfrage zu halten. Nutze
   `send_message_to_thread` nur für sachliches Steering und `read_thread` für
   gezielte Diagnose.
8. Überwache höchstens acht Targets je `wait_threads`-Aufruf; `timeoutMs: 0`
   ist ein Snapshot, sonst nutze 30–60-Sekunden-Fenster. Commentary weckt
   nicht. Führe `afterCursor` je Target fort und wiederhole keine finalen
   Texte. Eine Routine-Approval-Anfrage ist ein Startvertragsfehler: prüfe die
   Berechtigungsfelder, wiederhole denselben Infrastrukturstart höchstens
   einmal und melde erst dann konkret `BLOCKED`.
9. Lies autoritative Dateien, Tests und Diffs selbst. Markiere Ergebnisse als
   `accepted`, `rejected` oder `open`, korrigiere nur bestätigte Befunde und
   berichte anschließend Scope, Verifikation, Dissens und Rest-Risiken.

## Sicherheitsgrenzen

- Keine Modellfamilie oder Denkstufe festlegen, solange der Nutzer das nicht
  ausdrücklich verlangt.
- Keine automatische Commit- oder Push-Aktion ohne Nutzerfreigabe.
- Keine stillen Threads außerhalb eines autorisierten Orchestrierungs-Triggers.
- Keine internen Delegationsrouten; alle Arbeit bleibt als user-owned
  Codex-Task sichtbar.
