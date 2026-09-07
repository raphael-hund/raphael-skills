---
name: orchestrate
version: 3.0.0
description: >-
  Use when a task needs bounded delegation, parallel independent work or an
  explicitly requested workflow, loop, graph, gauntlet or council. Coordinate
  dependencies, write boundaries, result acceptance and recovery through the
  tools available in the current host.
class: O
scope: agency
sensitivity: internal
source: >-
  Konsolidierung der bestehenden Orchestrierungs-Skills; Umsetzung des
  Web-Setup-Plans vom 05.09.2026. Host-Adapter und aktueller Nutzervertrag
  bestimmen Werkzeuge und Modellrollen.
loads:
  - references/qualitaetsschleife.md
requires_skills: []
completion_criteria:
  - "Ein koordinierender Owner haelt Auftrag, Abhaengigkeiten, Integration und Abschluss"
  - "Delegierte Pakete sind unabhaengige Leaves mit disjunkten normalisierten Schreibpfaden oder isolierten Worktrees"
  - "Der gewaehlte Host-Adapter bietet die tatsaechlich verlangten Werkzeuge"
  - "Ergebnisstatus, aktuelle Inputs, Revision und Versuch wurden vor Annahme geprueft"
  - "Auftragsbezogene deterministische Checks liefen; Modellpruefung ergaenzt nur eine konkrete offene Frage"
  - "Timeout, Cancel, Providerfehler und ungepruefte Eigenschaften sind getrennt vom Produkturteil benannt"
  - "Geforderte Aussenaktionen sind am aufgeloesten Ziel ausgefuehrt; subjektive Abnahme bleibt beim Nutzer"
---

# orchestrate

Ein koordinierender Owner zerlegt den Auftrag, integriert Ergebnisse und prueft
seinen Abschluss. Bei Web-Auftraegen bleibt `web` der Gesamtowner; orchestrate
liefert dessen Ausfuehrungsvertrag. Eine einzelne zusammenhaengende Aenderung
kann derselbe Owner direkt erledigen.

## 1. Auftrag und Adapter festhalten

Vor dem ersten Paket stehen Ziel, aktuelle Negativentscheidungen, Eingaben,
erlaubte Schreibpfade und messbare Abnahme fest. Bestehenden Plan oder Auftrag
verwenden; einen zweiten ausgeschriebenen Vertrag nur fuer neue Information
anlegen. Fertig, wenn jedes Paket ein verlangtes Ergebnis liefert.

Der laufende Host bestimmt die Ausfuehrung:

| Kontext | Ausfuehrungsweg | Grenze |
|---|---|---|
| Codex-App | Verfuegbare interne Sitzungswerkzeuge fuer Unteragenten | Neue nutzereigene `create_thread`-Tasks nur bei ausdruecklichem Auftrag, einen neuen Task anzulegen |
| Native Claude-/Kimi-Sitzung | Tatsaechlich angebotene Delegationswerkzeuge und deren aktuelles Schema | Kein Werkzeug aus einer alten Anleitung als vorhanden annehmen |
| Ausdruecklich gewaehlter VPS-CLI-Ablauf | Bestehender `/root/.local/bin/cli-worker`; Vertrag `/root/.local/share/cli-orchestrator/ORCHESTRATOR.md` | CLI-only gilt fuer diesen Ablauf. Claude-/Kimi-Dateileaves liefern Dateien; Root fuehrt Shell-, Browser- und Buildpruefungen aus |

Aktuelle Modellrollen kommen aus dem geltenden Nutzer-/Hostvertrag. Die
Web-Fachrollen sind in [agent-roster.md](/root/raphael-skills/skills/eigene/web/references/agent-roster.md)
zugeordnet. Aktuelle Sol-Copy- und Opus-Integrationsvorgaben behalten ihren
Scope. Ein alter Providerfehler ist kein dauerhaftes Modellverbot.

Beim CLI-Ablauf prueft `scripts/preflight.sh --cwd /absoluter/projektpfad
--provider kimi --require python3` ausschliesslich lokale Voraussetzungen.
`--provider` nennt genau die gewaehlte CLI; `--require` wird nur fuer benoetigte
Tools wiederholt. Exit 0 bedeutet lokale Voraussetzungen erfuellt, Exit 1
`BLOCKED`, Exit 2 ungueltiger Aufruf. Providerinferenz, Authentifizierung,
Browserzugriff und Schreib-Ownership sind damit nicht nachgewiesen. Ohne
gewaehlten Provider entfaellt `--provider`.

## 2. Begrenzte Pakete ausfuehren

Die endliche Paketliste und ihre Abhaengigkeiten einmal erfassen. Alle
unabhaengigen bereiten Pakete duerfen bis zur tatsaechlich verfuegbaren
Kapazitaet parallel laufen. Abhaengige Pakete warten auf ihre Inputs.
Gemeinsame Dateien haben einen Integrations-Owner; parallele Writer erhalten
disjunkte normalisierte `write_set`s oder isolierte Worktrees. Vorhandene
Nutzeraenderungen gehoeren zur Baseline und bleiben erhalten.

Ein Paket enthaelt Ziel, aktuelle Entscheidungen, benannte Inputs,
`write_set`, benoetigte Werkzeuge, Abnahmekriterien und Rueckgabeort. Root
ordnet jede Pruefung einem Prozess zu, der sie ausfuehren kann. Ein
Dateiworker bekommt keine unerfuellbare Browser-/Shellpflicht.

Worker sind Leaves und starten keine Nachkommen. Ihre Rueckgabe nennt
Ergebnis, geaenderte Pfade, ausgefuehrte Checks mit Exit/Beleg und offene
Punkte. Bilder werden als Datei plus relevante Region uebergeben. Ein
Pfad oder eine Behauptung des Builders ersetzt die Pruefung am Artefakt nicht.

Fertig ist dieser Schritt, wenn jedes Paket einen aktuellen Ergebnisstand
oder einen konkreten Blocker besitzt und unabhaengige freie Arbeit erledigt ist.

## 3. Ergebnisse pruefen und annehmen

Root prueft zuerst den terminalen Transportstatus, dann Task-/Inputidentitaet,
Revision, Versuch und tatsaechlichen Diff. Veraltete oder ueberholte Antworten
werden nicht integriert. `completed` bedeutet eine erfolgreiche CLI-Rueckgabe;
auch `result_eligible: true` ist noch kein fachliches PASS.

Die benoetigten deterministischen Checks laufen vor einer Modellpruefung.
Eine zusaetzliche Fachpruefung braucht eine konkrete Frage und zusaetzlichen
Erkenntniswert; es gibt keine feste Reviewerzahl oder Familienquote. Fuer
Web-Arbeit waehlt [qa-faecher.md](/root/raphael-skills/skills/eigene/web/references/qa-faecher.md)
den Nachweis je Eigenschaft. Darstellung braucht eine aktuelle gerenderte
Ansicht, Interaktion ihre tatsaechliche Aktion und erwartete Wirkung.

Die [Qualitaetsschleife](references/qualitaetsschleife.md) regelt Befund,
Korrektur und Wiederpruefung. Root akzeptiert nur belegte Resultate; subjektive
Gestaltungsabnahme bleibt beim Nutzer. Fertig, wenn die verlangten Kriterien
belegt erfuellt oder praezise als offen/blockiert benannt sind.

## 4. Fehler und Wiederaufnahme

Bei einer Beobachtungszeitueberschreitung zuerst vorhandene Run-/Agent-ID,
Prozess und Lease pruefen. Dieselbe Arbeit nicht parallel neu starten.
Native Resume-Funktionen nur nutzen, wenn der ausgewaehlte Host sie anbietet.
Der CLI-Worker besitzt kein Modellkontext-Resume: `--supersedes RUN_DIR`
startet nach terminalem Vorgaenger einen identifizierten neuen Versuch. Bei
verlorenem Supervisor muessen dessen Lease frei und der gespeicherte Prozess
samt Prozessgruppe nachweislich beendet sein; der alte Ausgang bleibt `unknown`.

Ein Provider-/Infrastrukturfehler darf einmal gezielt wiederholt werden.
Danach bleibt dieses Paket `BLOCKED`; unabhaengige Arbeit laeuft weiter.
Keine automatische Provider-, Abo- oder Loginumstellung. Bei einem fachlichen
Fehler Ursache und passende Korrektur bestimmen; weitere Checks brauchen eine
relevante Aenderung oder eine offene Frage.

## Explizite Sonderauftraege

Ein Dauerloop braucht eine ausdrueckliche Nutzerwahl sowie Ziel, Stopbedingung
und Budget; daraus folgt kein automatischer Cron. Ein wiederkehrender Graph
verwendet den bestehenden Plan als Quelle und bindet seine Gates an echte
Artefakte. Gauntlet oder Council werden nur auf ausdruecklichen Wunsch mit
vorher festgelegter Frage, Vergleichsgrundlage und endlichem Budget ausgefuehrt.
Sie uebernehmen weder den Gesamtowner noch die Nutzerabnahme.

## Abschluss

Root liefert das verlangte Ergebnis mit relevanten Checks, offenen Grenzen
und den ausgefuehrten Aussenaktionen. Der konkrete Auftrag autorisiert seine
Umsetzung; vor irreversiblen Schritten Ziel und Umfang deterministisch pruefen.
Artefakte fuer Raphael liegen unter `/root/eingang/ausgang/<thema>/` und werden
ueber den verfuegbaren Host-Ausgabeweg zugestellt. Ein gueltiger Pfad allein
beweist keine Zustellung an den Mac.
