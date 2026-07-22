---
name: kimi-sol
description: "Sicherer, ausdrücklich freigegebener Kimi-K3-Entwurf mit unabhängiger Sol-Prüfung; ausschließlich über die geprüfte External-Model-Route und ohne automatische Änderungen. Trigger: \"/kimi-sol\", \"Kimi→Sol\", \"Kimi nach Sol\", \"Kimi mit Sol prüfen\", \"Kimi mit Sol pruefen\""
---

# kimi-sol — Kimi bauen lassen, Sol unabhängig prüfen lassen

Diese Skill ist ein eng begrenzter Review-Pfad. Sie wird nur bei einer der
expliziten Trigger-Phrasen in der Beschreibung aktiviert. Ein einzelnes Wort
wie „Kimi“, „Sol“ oder „prüfen“ aktiviert sie nicht; die vorhandene
`kimi-first`-Skill bleibt für ihre eigenen großen Kontext-/CLI-Trigger zuständig.
Erlaubte Schreibvarianten sind ausschließlich `/kimi-sol`, `Kimi→Sol`,
`Kimi -> Sol`, `Kimi mit Sol prüfen` und `Kimi mit Sol pruefen`.

## Harte Sicherheitsgrenzen

- Der aktuelle Codex-Task bleibt Root und entscheidet über Scope, Belege und
  Integration. Es gibt keinen stillen zweiten Scheduler.
- Verwende ausschließlich den auditierten External-Model-Lifecycle des
  installierten Codex-Orchestration-Plugins. Vor jeder möglichen Modellaktion
  sind nur dessen read-only `external status` und das exakte read-only `resolve`
  zulässig. Sie dürfen keine Konfiguration verändern und sind kein Beleg für
  eine Modellantwort.
- Eine Kimi-Anfrage ist nur zulässig, wenn für das exakt angeforderte Role,
  Provider, Modell und Effort beide Bedingungen gelten: der Lifecycle meldet
  `READY` und der versiegelte Invoke-Preflight meldet `callable`. Die gebündelte
  Kimi-K3-Zuordnung ist nur `moonshotai/kimi-k3` mit `max`; andere Werte werden
  nicht geraten, geklammert oder ersetzt.
- Direkt vor *jeder* potentiell kostenpflichtigen Kimi-Anfrage muss eine neue,
  ausdrückliche Nutzerfreigabe für genau diesen Paket- und Routenaufruf vorliegen.
  Trigger, frühere Freigaben, ein Abo, `READY` oder eine Statusausgabe sind keine
  Freigabe. Fehlt sie, endet der Lauf mit `APPROVAL_REQUIRED` und ohne Invoke.
- Der Invoke darf ausschließlich den versiegelten, vom geprüften Lifecycle
  bereitgestellten Pfad verwenden. Keine freie CLI, URL, Shell-Route oder
  Modellabkürzung.
- Diese Skill führt keine Credential- oder Key-Aktion aus: keine
  Provider-Vorbereitung, Authentifizierung, Auth-Mutation, Connect-, Repair- oder
  Trust-Helper-Aktion, kein Gate 0, keine Billing-Bestätigung, kein automatischer Fallback
  und kein nativer Agent-Shortcut. Bei jedem solchen Bedarf wird
  abgebrochen und Root meldet den Blocker.
- Nach einem Fehlschlag gibt es keinen stillen Retry. Eine neue Anfrage benötigt
  erneut Status/Resolve und eine neue Freigabe.

## Deterministischer Ablauf

1. **Trigger und Paket prüfen.** Root grenzt ein minimales Paket ab und hält
   `request_id`, Ziel, erlaubte Ausgabeorte, Route (`role`, `provider`, `model`,
   `effort`) und die noch ausstehende Freigabe fest. Keine Credentials, Chats,
   Sessions oder unnötigen Quellen in das Paket aufnehmen.
2. **Readiness diagnostizieren.** Root führt für genau diese Route
   `external status` und `resolve` aus. Alles außer exaktem `READY` plus
   `callable` wird als `NOT_READY` protokolliert und beendet den Lauf. Root
   bereitet die Route nicht vor und wechselt nicht auf ein anderes Modell.
3. **Freigabe anfordern.** Unmittelbar vor dem versiegelten Invoke fragt Root
   sinngemäß: „Ich benötige jetzt genau einen potentiell kostenpflichtigen
   Kimi-Aufruf für `request_id` auf Route X. Soll ich ihn ausführen?“ Nur ein
   klares Ja für genau diesen Aufruf zählt. Bei Nein, Unklarheit oder fehlender
   Antwort: `APPROVAL_REQUIRED`.
4. **Kimi einmalig aufrufen.** Übergebe nur den begrenzten UTF-8-Packet-Inhalt
   an den versiegelten Invoke und erwarte ein einzelnes Raw-Artefakt. Keine
   automatische Reparatur, Kürzung, Normalisierung, Wiederholung oder
   Ausführung der Kimi-Ausgabe.
5. **Artefakt versiegeln.** Schreibe die empfangenen Bytes unverändert in ein
   Artefakt. Berechne SHA-256 über exakt diese Bytes und erfasse Byte-Länge,
   `artifact_id`, `request_id`, Kimi-Route und Entstehungszeitpunkt. Ein leerer,
   abgeschnittener, nicht adressierbarer oder hash-inkonsistenter Datensatz ist
   `MALFORMED_ARTIFACT`.
6. **Sol unabhängig beauftragen.** Erzeuge mit
   `scripts/kimi_sol_packet.py` den Review-Handoff. Base64 ist dabei nur eine
   verlustfreie Transportkodierung: Sol muss die dekodierten Bytes bytegenau und
   gegen den SHA-256 prüfen. Übergib das Paket an einen unabhängigen, klar
   verschiedenen Sol-Reviewer-Kontext. Root/Kimi-Kontext, identische Context-ID
   oder Selbstprüfung sind unzulässig und ergeben `REVIEWER_UNAVAILABLE`.
7. **Verdikt prüfen.** Der Sol-Kontext liefert ausschließlich das unten
   definierte Verdict-Schema. Fehlt der Reviewer, stimmt der Hash nicht, ist das
   Schema unvollständig oder sind Verdict/Fund-Dispositionen unbekannt, wird
   fail-closed als `REVIEWER_UNAVAILABLE` oder `MALFORMED_VERDICT` beendet.
   `REVIEW_REJECTED` bedeutet ein explizites negatives Verdikt; es gibt keinen
   Fallback auf die ungeprüfte Kimi-Antwort.
8. **Root verifiziert und integriert.** Root prüft jeden akzeptierten Fund
   selbst gegen Quellen, Diff und Tests und entscheidet über die kleinste
   zulässige Änderung. Nur danach darf Root manuell integrieren. Diese Skill
   führt niemals Ausführung, Merge, Commit oder Push automatisch aus.

## Packet- und Artefaktvertrag (Schema-Version 1)

Der Request-Packet ist ein Objekt mit genau diesen Kernfeldern:

```text
{
  "schema_version": 1,
  "kind": "kimi-sol-request",
  "request_id": "nicht-leere-id",
  "task": "begrenzte Aufgabe",
  "allowed_outputs": ["repo-relativer/pfad"],
  "route": {"role": "...", "provider": "...", "model": "...", "effort": "..."},
  "approval": {"state": "PENDING|GRANTED", "scope": "request_id + route"}
}
```

Das unveränderte Raw-Artefakt wird als separates Byte-Objekt erfasst und im
Handoff verlustfrei transportiert:

```text
{
  "schema_version": 1,
  "kind": "kimi-sol-artifact",
  "request_id": "...",
  "artifact_id": "...",
  "artifact_encoding": "base64",
  "artifact_b64": "...",
  "artifact_sha256": "64 hex Zeichen über die Originalbytes",
  "artifact_bytes": 123,
  "producer_context_id": "..."
}
```

Das Review-Verdikt muss den Hash und einen *anderen* Reviewer-Kontext spiegeln:

```text
{
  "schema_version": 1,
  "kind": "sol-review-verdict",
  "request_id": "...",
  "artifact_sha256": "identisch zum Artefakt",
  "reviewer": {"provider": "openai", "model": "sol", "context_id": "..."},
  "verdict": "ACCEPT|REJECT",
  "findings": [{"id": "F-1", "disposition": "ACCEPT|REJECT", "evidence": "...", "location": "..."}],
  "tests": [{"command": "...", "result": "..."}]
}
```

`ACCEPT` ist keine Integrationsfreigabe. Es erlaubt Root nur, die aufgeführten
Findings unabhängig zu verifizieren. Ein fehlendes Feld, ein fremder Hash,
`context_id`-Kollision, unbekannte Enum oder zusätzliche nicht belegte Änderung
stoppt den Pfad.

## Statusmaschine

Erlaubte, nach außen berichtete Status sind:

`NOT_READY` → `APPROVAL_REQUIRED` → `ARTIFACT_READY` →
`REVIEW_IN_PROGRESS` → `VERIFIED`.

Jeder Schritt darf stattdessen fail-closed in `REVIEWER_UNAVAILABLE`,
`MALFORMED_ARTIFACT`, `MALFORMED_VERDICT` oder `REVIEW_REJECTED` enden. `VERIFIED`
setzt einen unveränderten Artefakt-Hash, ein valides unabhängiges Sol-Verdikt und
Roots eigene Beleg-/Testprüfung voraus. Ein Status darf nicht übersprungen oder
aus einer Modellbehauptung abgeleitet werden.

Der lokale Helfer ist absichtlich rein funktional und offline:
`scripts/kimi_sol_packet.py`. Er hasht, baut und validiert Handoffs; er ruft
keinen Provider auf, liest keine Credentials und führt keine Änderungen aus.
