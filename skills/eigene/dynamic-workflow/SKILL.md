---
name: dynamic-workflow
version: 0.1.0
description: >
  Erzwingt für EINE Aufgabe die Ausführung als dynamischer Workflow
  (Workflow-Tool) mit Subagent-Flotte — nie Solo-Arbeit des Cockpits.
  Zerlegt die Aufgabe, wählt das passende Orchestrierungs-Muster
  (Fan-out/Pipeline/Kritik/Council), baut das Script nach Vorlage, startet,
  verifiziert die Kern-Ergebnisse selbst. Trigger: "/dynamic-workflow",
  "dynamic workflow", "als Workflow machen", "mach das mit Subagents",
  "starte einen Workflow dafür", "fächere das auf".
class: O
scope: agency
sensitivity: internal
source: >
  eigene Praxis 2026-07-20 (11 Workflow-Runden derselben Session) —
  Destillat der funktionierenden Muster; teilt die Vorlage mit ultra-loop.
loads:
  - references/muster-wahl.md
requires_skills: [ultra-loop@^0]
completion_criteria:
  - "Die Aufgabe lief als Workflow-Run (Run-ID genannt) — Solo nur bei Kleinst-Aufgaben (<5 Min, eine Datei), dann explizit als SOLO begründet"
  - "Modell-Mix genutzt: opus=Urteil, sonnet=Schreiben, haiku=Mechanik — NIE Fable-Subagents"
  - "Kern-Ergebnisse vom Cockpit selbst nachverifiziert (eigener Read/Bash-Beleg), nicht nur Agenten-Report übernommen"
  - "Ergebnis-Zusammenfassung nennt: Agentenzahl, was verifiziert, was verworfen"
---

# dynamic-workflow — eine Aufgabe, immer als Workflow

## Zweck (1 Satz)

Nimm EINE Aufgabe entgegen und führe sie verbindlich als dynamischen
Workflow mit Subagent-Flotte aus — Zerlegung, Muster-Wahl, Script, Start,
Eigen-Verifikation.

## Abgrenzung

- **ultra-loop** = Dauerschleife (Cron, Runde für Runde, Protokoll).
- **dynamic-workflow** = genau EIN Durchgang für die genannte Aufgabe.
  ultra-loop benutzt intern dasselbe Muster; dieser Skill ist der
  Einzelfall-Einstieg.

## Ablauf (5 Schritte)

1. **Aufgabe zerlegen** (30 Sekunden, im Kopf): Was ist die Arbeits-Liste
   (Dateien/Themen/Quellen)? Was ist das Fertig-Kriterium? Welche Gates
   gelten (validate/lint/Tests)? Was ist tabu?
2. **Muster wählen** nach `references/muster-wahl.md` — Fan-out, Pipeline,
   Kritik-Flotte, Council, Recherche-Sweep oder Hybrid.
3. **Script bauen** nach der geteilten Vorlage
   `skills/eigene/ultra-loop/references/workflow-vorlage.md`:
   `meta` als pures Literal, `pipeline()` als Default, Args defensiv
   parsen (`typeof args === 'string' ? JSON.parse(args) : args`),
   Modell-Mix opus/sonnet/haiku, NIE Fable-Subagents, kein
   `Date.now()`/`Math.random()`.
4. **Starten & begleiten:** Workflow-Tool aufrufen, Run-ID merken.
   Bei Crash: Script-Datei patchen, mit `resumeFromRunId` fortsetzen
   (fertige Agenten kommen aus dem Cache). Vor „Ergebnis leer"-Diagnosen
   immer `journal.jsonl` lesen.
5. **Eigen-Verifikation:** Kern-Funde/Kern-Artefakte mit eigenem
   Read/Bash-Beleg prüfen — Agenten-Reports nie blind übernehmen.
   Widersprechen sich Agenten: llm-council-Muster, nicht den Nutzer
   fragen. Dann Ergebnis knapp berichten (Agentenzahl, verifiziert,
   verworfen).

## Harte Regeln

- **Kein Solo bei Substanz.** Nur Kleinst-Aufgaben (<5 Min, eine Datei)
  dürfen ohne Workflow laufen — dann explizit „SOLO, weil …" sagen.
- **Schreib-Rennen vermeiden:** parallele Schreiber nur auf getrennten
  Dateien; geteilte Dateien (Index, SKILL.md) bekommen EINEN zentralen
  Agenten am Ende.
- **Kein Reward-Hacking**, keine erfundenen Fakten, Gates nie aufweichen.
- Git: nur konkret bearbeitete Pfade stagen (NIE `git add -A`),
  committen/pushen nur wenn der Nutzer es (dauerhaft) angeordnet hat.

## Gotchas

- Args-Falle ist der häufigste Crash — Listen als echtes JSON-Array
  übergeben UND im Script defensiv parsen.
- `parallel()` ist eine Barriere: nur nutzen, wenn eine Stufe wirklich
  ALLE Vorergebnisse zusammen braucht (Dedup, Früh-Abbruch) — sonst
  `pipeline()`.
- Agent-Ausfälle liefern `null` — Ergebnisse immer `.filter(Boolean)`.
- Lange Läufe: Zwischenstand dem Nutzer melden, nicht stumm warten.
