---
name: dynamic-workflow
description: >
  Fuehre genau einen dynamischen Codex-Thread-Workflow fuer eine Aufgabe aus.
  Trigger: "/dynamic-workflow", "dynamic workflow", "als Workflow machen", "mach das mit Sub-Tasks", "starte einen Workflow dafür" und "fächere das auf". Verwende sichtbare, user-owned Codex-Tasks, einen kleinen DAG und eine belegte Verifikation.
---

# dynamic-workflow

Dieser Skill fuehrt genau einen Run aus. Eine ausdrueckliche Invokation oder
ein Trigger autorisiert sichtbare user-owned Codex-Tasks. Ohne Trigger werden
keine Threads erzeugt.

## 1. Faehigkeiten zuerst entdecken

Die Namen in diesem Vertrag sind Rollenbezeichnungen. Mappe sie auf die von
der Host-Umgebung tatsaechlich angebotenen Thread-Tools; erfinde keine Namen.
Entdecke vor dem ersten Create mindestens:

| Rolle | Erwartete Tool-Beispiele |
| --- | --- |
| Projekt-Lookup | `list_projects`, `get_project` |
| Erzeugen | `create_thread` (nonblocking) |
| Auflisten/Lesen | `list_threads`, `read_thread` |
| Warten | `wait_threads` mit Cursor und Timeout |
| Nachricht | `send_message_to_thread` |
| Titel | `set_thread_title` |
| Archivieren | `archive_thread`, `set_thread_archived` |

Ein Host darf Aliasnamen liefern. Fehlt eine Rolle, die fuer den gewaehlten
Schritt gebraucht wird, stoppe mit dem klaren Ergebnis
`CAPABILITY_UNAVAILABLE:<rolle>:<grund>`. Erzeuge dann keinen Ersatzpfad und
behaupte keinen Abschluss.

### Mockbarer Backend-Vertrag

Der folgende konzeptionelle Vertrag beschreibt die einzige Schnittstelle, die
Tests mocken. Er ist Pseudocode, kein Aufruf und darf keine echte Codex-Task
erzeugen:

```text
backend.discover() -> {project_lookup, create, list, read, wait, send, title, archive}
backend.list_projects() -> [{projectId, name}]
backend.create_thread({label, target, title?, startingState?})
  -> {threadId?, hostId?, clientThreadId?, status: "queued"|"running"}
backend.list_threads({projectId?, projectless?, afterCursor?})
  -> {threads: [{threadId?, hostId?, clientThreadId?, title, status, cursor}], nextCursor?}
backend.read_thread({threadId, hostId?, afterCursor?}) -> {events, cursor, status}
backend.send_message_to_thread({threadId, hostId?, message}) -> {accepted: true}
backend.wait_threads({targets: [{threadId, hostId, afterCursor?}], timeoutMs})
  -> {updates: [{threadId, hostId, status, events, cursor}], timedOut: bool}
backend.set_thread_title({threadId, hostId, title}) -> {accepted: true}
backend.archive_thread({threadId, hostId}) -> {archived: true}
```

## 2. DAG und Workflow-Ledger

Plane 2–6 Knoten als azyklischen Graphen. Jeder
Knoten hat ein stabiles `label`; Labels, `deps` und `write_set` aendern sich
nicht bei Resume. Parallele Writer muessen disjunkte `scope`/`write_set`
besitzen. Fuehre dieses Ledger als eine logische Einheit:

```json
{
  "run_id": "stable-workflow-id",
  "run_mode": "dynamic-workflow",
  "best_effort_authorized": false,
  "nodes": {
    "inspect": {
      "label": "inspect",
      "deps": [],
      "scope": ["/repo/docs"],
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

Zulaessige Statuswerte sind `planned`, `queued`, `running`, `waiting`,
`completed`, `blocked` und `failed`. Nach jedem Host-Ereignis schreibe den
neuesten `status`, `cursor` und die Verifikation zurueck. Reports gelten erst
als akzeptiert, wenn die Root-Instanz die autoritativen Dateien und Gates
selbst gelesen hat.

## 3. Ziel, Erzeugung und Dispatch

1. Klaere Ziel, Dateien, Schnittstellen, Gates und Tabus. Waehle ein Muster
   (Fan-out, Pipeline, Kritik, Council, Recherche-Sweep oder Hybrid) nur mit
   begruendeten DAG-Kanten.
2. Bei Projektarbeit fuehre vor jedem Create den Projekt-Lookup aus und nutze
   die exakte `projectId`. Standard ist
   `target: {type: project, projectId, environment: {type: local}}`.
   Isolierte Schreibbereiche duerfen
   `target: {type: project, projectId, environment: {type: worktree}}` nutzen;
   `startingState: {type: working-tree}` nur nach ausdruecklicher Anforderung.
   Ohne Projekt nutze `target: {type: projectless}`.
3. Vor jedem Create muss das Ledger mit `list_threads` gegen den Live-Stand
   abgeglichen sein. Erzeuge pro bereitem stabilen Label genau einen
   sichtbaren Thread mit `create_thread` nonblocking. Lass `model` und
   `thinking` weg, ausser der Nutzer verlangt diese konkrete Einstellung.
4. Speichere das Ergebnis sofort. Bei `threadId` plus `hostId` emittiere
   `::created-thread{threadId="..."}`. Bei einer Queue-Antwort mit nur
   `clientThreadId` emittiere
   `::created-thread{clientThreadId="..."}`; dieser Eintrag ist noch nicht
   wartbar.
5. Sende ein vollstaendiges Paket (Ziel, Kontext, Scope, Dateien,
   Abhaengigkeiten, Akzeptanz, Verifikation) mit
   `send_message_to_thread`; approvals und Rueckfragen bleiben beim Nutzer.

## 4. Queue-Reconciliation und begrenztes Warten

Ein `clientThreadId` ist nur ein Queue-Schluessel. Rufe wiederholt
`list_threads` auf und gleiche exakt nach `clientThreadId` (und, falls
vorhanden, stabilem Titel/Label) ab. Erst wenn echte `threadId` **und**
`hostId` im Ledger stehen, darf der Knoten in einen Wait-Target aufgenommen
oder mit `read_thread`/`send_message_to_thread` angesprochen werden. Bei
Mehrdeutigkeit oder fehlender Zuordnung: `CAPABILITY_UNAVAILABLE` bzw.
`RECONCILIATION_REQUIRED`, kein Raten.

Ueberwache hoechstens 8 (max 8) Targets je `wait_threads`-Aufruf. Nutze
`timeoutMs: 0` fuer einen Snapshot oder ein begrenztes Fenster von
`30_000` bis `60_000` Millisekunden. Reiche je Target den zuletzt bekannten
`afterCursor` weiter; schreibe nur neue Events und wiederhole keinen bereits
ausgegebenen finalen Text. Commentary allein weckt keinen Wait. Lies bei
Bedarf gezielt mit `read_thread` nach.

## 5. Idempotentes Resume

Resume beginnt immer mit Capability-Discovery, dem Laden des vorhandenen
Ledgers und `list_threads`-Reconciliation **vor jedem** Create. Fuer jedes
Label gilt:

```text
live match mit threadId+hostId? -> Ledger-IDs/Cursor uebernehmen, nie neu erzeugen
status completed?                -> verifizieren, nie neu erzeugen
status running/queued/waiting?   -> vorhandenen Thread weiter nutzen, nie duplizieren
nur clientThreadId vorhanden?    -> zuerst reconciliieren, nicht duplizieren
kein Live-Match und nicht completed -> genau ein neues Create erlauben
```

Eine Wiederaufnahme darf weder abgeschlossene noch laufende Tasks duplizieren.
Ein fehlgeschlagener Knoten wird nur nach expliziter Nutzerentscheidung und
neuer, belegter Idempotenzpruefung erneut eingeplant.

## 6. Task-scoped Best-Effort-Latch

`best_effort_authorized` ist ein explizites Boolean im aktuellen
Workflow-Ledger und startet mit `false`. Erteilt der Nutzer in diesem Run die
Best-Effort-Freigabe, wird es auf `true` gesetzt. Retries und Resume-Runden
lesen denselben Ledger-Wert und fragen nicht erneut. Beim Ende des aktuellen
Tasks/Workflows wird der Wert verworfen; er ist **nicht global persistent** und
darf nie als globale Freigabe behauptet werden. Ohne `true` bleiben die
normalen Gates und Blockaden aktiv.

## 7. Expliziter Smoke-Test

Eine echte Test-Task ist disposable und wird nur angelegt, wenn der Nutzer
ausdruecklich einen Smoke-Test verlangt. Kennzeichne sie im Ledger als
`smoke_test: true`, verwende einen eigenen stabilen Label und warte bis zur
Verifikation. Danach archiviere sie mit dem entdeckten
`archive_thread`/`set_thread_archived`-Alias und verifiziere den Archivstatus.
Im normalen Workflow gibt es keine Smoke-Task. Fehlt die Archiv-Faehigkeit,
melde `CAPABILITY_UNAVAILABLE:archive` klar und behaupte keine Bereinigung.

## 8. Abschluss und Grenzen

Pruefe Dateien, Diff und Gates selbst, markiere Befunde als `accepted`,
`rejected` oder `open` und liefere Run-ID, Taskzahl, Verifikation und Risiken.
Dieser Skill endet nach **genau einem Run**; keine unbeauftragte Wiederholung,
Terminierung, Commit- oder Push-Aktion. Es werden ausschliesslich sichtbare,
user-owned Codex-Tasks/Threads verwendet. Fehlt ein benoetigtes Tool, wird
klar gestoppt statt eine andere Ausfuehrungsart zu waehlen.
