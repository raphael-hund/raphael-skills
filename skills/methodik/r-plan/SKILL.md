---
name: r-plan
version: 0.1.0
description: >
  Verwandelt eine freigegebene Spec in einen bissgroßen Umsetzungsplan mit
  exakten Dateipfaden, vollständigem Code je Schritt und TDD-Zyklus — für
  einen Umsetzer, der die Codebasis nicht kennt. Trigger: "Umsetzungsplan",
  "Plan schreiben", "Spec in Tasks zerlegen", "implementation plan".
class: M
scope: agency
sensitivity: internal
source: vendored from superpowers (obra) skills/writing-plans @ d884ae04
completion_criteria:
  - "Plan-Datei mit Kopf (Ziel, Architektur, Tech-Stack, Global Constraints) geschrieben"
  - "Jeder Task hat exakte Dateipfade, vollständigen Code, Testschritte, Commit-Schritt"
  - "Selbstprüfung durchgeführt: Spec-Abdeckung, Platzhalter-Scan, Typkonsistenz — Lücken behoben"
---

# r-plan — Spec zu Umsetzungsplan

**Voraussetzung:** eine bereits freigegebene Spec (siehe r-brainstorm). Ohne
Spec oder Anforderungen nicht anwenden — dorthin zurückgehen.

**Zweck:** einen Umsetzungsplan schreiben, als hätte der Umsetzer null Kontext
zur Codebasis und fragwürdigen Geschmack. Alles dokumentieren, was er braucht:
welche Dateien pro Task, welcher Code, wie getestet wird. Der Plan zerfällt in
bissgroße Tasks. Prinzipien: DRY, YAGNI, TDD, häufige Commits.

Speicherort: sinnvoller Projektpfad, z. B. `docs/plans/YYYY-MM-DD-<feature>.md`,
sofern nicht anders vorgegeben.

## Umfangsprüfung

Deckt die Spec mehrere unabhängige Teilsysteme ab, hätte das schon bei
r-brainstorm in Teilprojekte zerlegt werden müssen. Falls nicht geschehen: hier
vorschlagen, in getrennte Pläne aufzuteilen — je Teilsystem ein eigener Plan,
der für sich funktionierendes, testbares Ergebnis liefert.

## Dateistruktur zuerst

Vor der Task-Definition festlegen, welche Dateien entstehen/geändert werden
und wofür jede zuständig ist. Hier fallen die Zerlegungsentscheidungen.

- Klare Grenzen, definierte Schnittstellen, eine Verantwortung pro Datei.
- Zusammen geänderte Dateien gehören zusammen — nach Verantwortung splitten,
  nicht nach technischer Schicht.
- In bestehenden Codebasen: etablierten Mustern folgen, nicht eigenmächtig
  umstrukturieren — außer eine gerade bearbeitete Datei ist bereits unhandlich.

## Task-Zuschnitt

Ein Task ist die kleinste Einheit mit eigenem Testzyklus, die ein eigenes
Freigabe-Gate verdient. Setup, Konfiguration, Doku-Schritte gehören in den
Task, dessen Ergebnis sie brauchen. Nur dort splitten, wo ein Reviewer einen
Task sinnvoll ablehnen könnte, während er den Nachbarn freigibt. Jeder Task
endet mit einem eigenständig testbaren Ergebnis.

**Schritte sind atomar (2-5 Minuten je Schritt):** "Test schreiben" →
"Test laufen lassen, Fehlschlag prüfen" → "Minimalen Code schreiben" →
"Test laufen lassen, Erfolg prüfen" → "Committen".

## Plan-Kopf (Pflicht)

Jeder Plan beginnt mit: Titel, Ziel (ein Satz), Architektur (2-3 Sätze),
Tech-Stack, und einem Abschnitt **Global Constraints** — projektweite
Vorgaben aus der Spec (Versionsuntergrenzen, Namenskonventionen, Plattform-
Anforderungen), Werte wörtlich aus der Spec übernommen. Diese gelten implizit
für jeden Task.

## Task-Struktur

Pro Task: **Dateien** (Create/Modify mit exakten Pfaden, ggf. Zeilenbereich;
Test-Datei), **Interfaces** (was der Task aus früheren Tasks konsumiert — exakte
Signaturen; was er produziert — exakte Funktionsnamen/Typen für spätere Tasks,
denn der Umsetzer eines Tasks sieht nur diesen Task). Danach die Schritte:
Test schreiben (voller Code) → Fehlschlag verifizieren (Kommando + erwartete
Meldung) → minimale Implementierung (voller Code) → Erfolg verifizieren
(Kommando + erwartete Ausgabe) → Commit (exakte `git add`/`git commit`-Zeilen).

## Keine Platzhalter

Jeder Schritt braucht den tatsächlichen Inhalt, den der Umsetzer benötigt. Das
sind **Plan-Fehler**, niemals akzeptabel: "TBD"/"TODO"/"später implementieren";
"angemessene Fehlerbehandlung ergänzen" ohne Code; "Tests wie oben" ohne echten
Testcode; "ähnlich wie Task N" statt den Code zu wiederholen (Tasks werden
womöglich nicht in Reihenfolge gelesen); Schritte, die beschreiben statt zeigen;
Verweise auf Typen/Funktionen, die in keinem Task definiert sind.

## Selbstprüfung nach dem Schreiben

Mit frischem Blick gegen die Spec prüfen — eigenständig, kein Sub-Dispatch:

1. **Spec-Abdeckung:** jeden Abschnitt/jede Anforderung der Spec durchgehen —
   gibt es dafür einen Task? Lücken auflisten und mit Task schließen.
2. **Platzhalter-Scan:** Plan gegen die Liste oben durchsuchen, beheben.
3. **Typkonsistenz:** stimmen Typen, Signaturen, Namen über spätere Tasks
   hinweg überein? Eine Funktion `clearLayers()` in Task 3, aber
   `clearFullLayers()` in Task 7 ist ein Bug.

Gefundene Probleme direkt inline beheben, keine erneute Prüfrunde nötig.

## Übergabe zur Umsetzung

Nach dem Speichern Umsetzungsweg anbieten: **Subagent-getrieben** (siehe
r-sdd) — frischer Subagent je Task, schnelle Iteration, empfohlen bei
weitgehend unabhängigen Tasks — oder **Inline-Ausführung** in der laufenden
Session mit Checkpoints zur Prüfung, wenn Tasks eng gekoppelt sind oder eine
Session-übergreifende Übergabe nicht gewünscht ist.
