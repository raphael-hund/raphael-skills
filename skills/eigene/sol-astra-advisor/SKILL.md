---
name: sol-astra-advisor
version: 0.1.0
description: >
  Codex-Arbeitsmodus, wenn Astra das Kontingent frisst: Sol (gpt-5.6-sol) trägt Fortschritt,
  Implementierung und Verifikation; Astra (gpt-6-astra, Effort high) wird nur als Berater
  mit frischem Kontext gerufen — bei harten Entscheidungen, Architektur-Trade-offs oder
  unabhängigem Review. Astra editiert keine Dateien und startet keine Agenten. Sol arbeitet
  danach weiter. Trigger: "Astra fragen", "Berater", "advisor", "Zweitmeinung von Astra",
  "Architektur-Trade-off", "Sol baut, Astra berät", "$sol-astra-advisor".
class: O
scope: agency
sensitivity: internal
source: >
  Voxyz_ai (X 2096667246294655224 und 2096221816603979886, 08.09.2026); Codex-Multi-Agent
  (spawn_agent mit fork_turns "none", agent_type, model, reasoning_effort) am 08.09.2026 auf
  dem VPS live geprüft. Rollen-Datei `agents/astra-advisor.toml` eigenständig geschrieben.
loads:
  - agents/astra-advisor.toml
completion_criteria:
  - "Sol hat die Arbeit selbst getan und verifiziert; Astra wurde höchstens für benannte Entscheidungen gerufen, nie für Routine"
  - "Jeder Astra-Aufruf war spawn_agent mit fork_turns none, agent_type astra-advisor, model gpt-6-astra, reasoning_effort high und einem selbsttragenden Paket (Frage, Material, Constraints)"
  - "Astra hat nur Rat, Begründung und Risiken geliefert; keine Datei wurde von Astra geändert, kein weiterer Agent gestartet"
  - "Bestehende Freigabe- und Test-Pflichten sind unverändert; Abschluss nennt, was verifiziert ist und was nicht"
---

# sol-astra-advisor — Sol arbeitet, Astra berät

## Zweck (1 Satz)
Alltagscode und Tests laufen auf Sol; Astra kommt nur mit frischem Kontext für die Entscheidung
dazu, die Sol nicht sicher allein treffen kann, und Sol macht weiter.

## Setup (einmalig, liegt auf dem VPS)
- `~/.codex/agents/astra-advisor.toml` (Kopie von `agents/astra-advisor.toml`), registriert in
  `~/.codex/config.toml` unter `[agents.astra-advisor]`.
- Session mit Sol starten: `codex -m gpt-5.6-sol -c model_reasoning_effort=high` (oder im
  Codex-App-Modellwähler Sol wählen). `features.multi_agent = true` ist gesetzt.

## Wann Astra rufen (und nur dann)
- Architektur-Trade-off mit mindestens zwei ernsthaften Optionen.
- Sol steckt fest: zwei Anläufe ohne Fortschritt oder widersprüchliche Befunde.
- Unabhängiger Review vor Auslieferung eines riskanten Diffs.
Nicht rufen für Routine, Formulierungen, Tests schreiben oder „zur Sicherheit“.

## So ruft Sol
`spawn_agent` mit genau diesen Parametern (Modell explizit, nie geerbt):
```json
{
  "fork_turns": "none",
  "agent_type": "astra-advisor",
  "model": "gpt-6-astra",
  "reasoning_effort": "high",
  "message": "<Frage> \n\n## Material\n<relevante Dateien/Diffs/Fehlermeldungen, ausgeschnitten>\n\n## Constraints\n<Regeln, die gelten; was nicht verändert werden darf>\n\n## Erwartete Antwort\nEmpfehlung · Begründung · Risiken · was zu verifizieren ist. Keine Dateiänderungen."
}
```
Dann `wait_agent`. Antwort lesen, Entscheidung treffen, weiterarbeiten. Bei Rückfrage
`followup_task` an denselben Berater statt neuem Spawn.

Wenn `spawn_agent` in der aktuellen Session `model` oder `agent_type` nicht anbietet
(V1-Toolsatz), zuerst Raphael sagen, nicht still mit dem Session-Modell weitermachen.

## Was Astra darf und nicht darf
- Darf: lesen, `rg`, `git log/diff`, Tests **lesen**, argumentieren.
- Darf nicht: Dateien anlegen/ändern, Befehle mit Nebenwirkung, weitere Agenten starten.
  Der Sandbox-Modus in der Rollen-Datei ist `read-only`; die Anweisung steht zusätzlich in
  `developer_instructions`. (Befund 08.09.2026: Codex 0.153.4 vererbt `danger-full-access` der
  Session an Kinder, der TOML-Wert allein sperrt nicht. Deshalb gilt die Anweisung als Regel
  und der Parent prüft `git status` nach jedem Astra-Aufruf.)

## Verifikationsvertrag für Sol (aus dem zweiten Post)
Nach jeder Aufgabe: Ergebnis gegen die Akzeptanzkriterien prüfen und die Pflicht-Tests des
Projekts laufen lassen. Für reversible, kleine Änderungen keine Tests schreiben, die nur die
Implementierung spiegeln. Checks nur erweitern, wenn neue Änderungen, Fehler oder offene
Punkte es verlangen. Fehlen Umgebung, Tools oder Rechte: genau sagen, was fehlt. Im Abschluss
trennen: verifiziert / nicht verifiziert.

## Beispiel
Sol soll Auth von Session-Cookies auf JWT umstellen. Sol baut den Refresh-Flow, bleibt beim
Speicherort des Refresh-Tokens (HttpOnly-Cookie vs. Storage) unsicher → ein `spawn_agent` an
Astra mit den beiden Optionen, dem Threat-Model aus `docs/security.md` und der Constraint
„kein Breaking Change für die Mobile-App“. Astra empfiehlt HttpOnly + Rotation, nennt CSRF als
Risiko. Sol setzt um, testet, liefert; Astra hat nichts geschrieben.

## Gilt nicht wenn
- Die Aufgabe ist selbst reine Beratung: dann direkt Astra als Hauptmodell.
- Herdr-Flotte läuft (`herdr-fleet`): dort ist der Reviewer ein Pane, kein Spawn.

## Quelle
- X: Voxyz_ai 2096667246294655224 (Sol+Astra-Skill), 2096221816603979886 (Verifikationsvertrag).
- Live-Probe 08.09.2026: `spawn_agent {fork_turns:"none", agent_type, model:"gpt-6-astra",
  reasoning_effort:"high"}` → Rollout zeigt Kind auf `gpt-6-astra`, Effort `high`.
