---
name: orchestrate
description: >
  Orchestriere sichtbare user-owned Codex-Tasks für nichttriviale Arbeit.
  Trigger: "delegieren", "parallelisieren", Alias "Sub-Tasks", "Task aufteilen",
  "orchestrieren", "Council" und "Zweitmeinungs-Rat". Kleine Aufgaben
  bleiben solo. Für größere Aufgaben setze Leader-, Task- und Verifier-Threads
  auf, halte Schreiben disjunkt, lasse Antworten unabhängig und synthetisiere
  nur nach eigener Prüfung.
---

# orchestrate

Erzeuge sichtbare Threads nur nach ausdrücklicher Skillinvokation oder einem
genannten Trigger. Bei einer kleinen, in sich geschlossenen Aufgabe arbeite
solo und begründe das kurz; erzeuge dafür keinen Thread.

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
   Risiken. Parallelisiere nur unabhängige Zweige; gemeinsame Dateien gehören
   einem Owner.
2. Lies bei Projektarbeit vor `create_thread` mit `list_projects` die Projekte
   und verwende die exakte `projectId`. Nutze als Default das lokale
   `target: {type: project, projectId, environment: {type: local}}`, für
   isolierte Writer `target: {type: project, projectId, environment: {type: worktree}}` und für allgemeine Arbeit `target: {type: projectless}`. Setze
   im Worktree-Environment `startingState: {type: working-tree}` nur auf
   ausdrücklichen Wunsch.
3. Erzeuge Threads nonblocking. Lass `model` und `thinking` in
   `create_thread` sowie `send_message_to_thread` weg, außer der Nutzer fordert
   eine konkrete Einstellung. Lege je Task eine Registry mit `label`, `deps`,
   `threadId`, `hostId`, optional `clientThreadId`, `cursor` und `status` an.
4. Gib für echte Threads sofort
   `::created-thread{threadId="..."}` aus. Bei einem eingereihten Worktree
   mit nur `clientThreadId` gib
   `::created-thread{clientThreadId="..."}` aus, warte nicht darauf und
   gleiche später über `list_threads` zu `threadId` und `hostId` ab.
5. Formuliere jedes Task-Paket mit Ziel, Kontext, Dateien, Interfaces,
   Abhängigkeiten, Akzeptanzkriterien und Prüfkommandos. Nutze
   `send_message_to_thread` nur für sachliches Steering und `read_thread` für
   gezielte Diagnose.
6. Überwache höchstens acht Targets je `wait_threads`-Aufruf; `timeoutMs: 0`
   ist ein Snapshot, sonst nutze 30–60-Sekunden-Fenster. Commentary weckt
   nicht. Führe `afterCursor` je Target fort und wiederhole keine finalen
   Texte. User-Input und Approval beantwortet der Nutzer selbst.
7. Lies autoritative Dateien, Tests und Diffs selbst. Markiere Ergebnisse als
   `accepted`, `rejected` oder `open`, korrigiere nur bestätigte Befunde und
   berichte anschließend Scope, Verifikation, Dissens und Rest-Risiken.

## Sicherheitsgrenzen

- Keine Modellfamilie oder Denkstufe festlegen, solange der Nutzer das nicht
  ausdrücklich verlangt.
- Keine automatische Commit- oder Push-Aktion ohne Nutzerfreigabe.
- Keine stillen Threads außerhalb eines autorisierten Orchestrierungs-Triggers.
- Keine internen Delegationsrouten; alle Arbeit bleibt als user-owned
  Codex-Task sichtbar.
