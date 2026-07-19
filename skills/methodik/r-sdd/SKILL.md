---
name: r-sdd
version: 0.1.0
description: >
  Führt einen Umsetzungsplan aus, indem pro Task ein frischer Subagent
  dispatcht, gefolgt von Spec- und Qualitätsreview, plus finaler
  Gesamt-Review am Ende. Trennt Kontexte sauber, hält Fortschritt in einem
  Ledger fest statt im Gesprächsgedächtnis. Trigger: "Plan umsetzen",
  "Subagent pro Task", "Tasks ausführen", "subagent-driven development".
class: M
scope: agency
sensitivity: internal
source: vendored from superpowers (obra) skills/subagent-driven-development @ d884ae04
completion_criteria:
  - "Jeder Task hat Implementierung + Review mit beiden Verdikten (Spec-Konformität, Code-Qualität)"
  - "Kritische/wichtige Findings sind gefixt und re-geprüft, bevor der nächste Task startet"
  - "Finaler Gesamt-Review über den ganzen Branch ist durchgeführt, Ledger vollständig"
---

# r-sdd — Subagent-getriebene Umsetzung

**Voraussetzung:** ein fertiger Umsetzungsplan (siehe r-plan) mit weitgehend
unabhängigen Tasks, Ausführung in dieser Session.

**Kernprinzip:** frischer Subagent pro Task + Task-Review (Spec-Konformität +
Code-Qualität) + breiter Abschluss-Review = hohe Qualität, schnelle Iteration.

**Warum Subagents:** Jeder Subagent bekommt isolierten Kontext — exakt das,
was er für seinen Task braucht, nichts aus der Session-Historie. Das hält ihn
fokussiert und schont den eigenen Kontext für Koordinationsarbeit.

**Durchlaufen ohne Zwischenstopp:** Tasks nacheinander ausführen, ohne nach
jedem Task beim Nutzer nachzufragen. Nur stoppen bei: BLOCKED-Status, den man
selbst nicht auflösen kann, echter Mehrdeutigkeit, die Fortschritt verhindert,
oder wenn alle Tasks fertig sind.

## Ablauf pro Task

1. Plan-Task extrahieren (exakter Auftrag, Dateien, Interfaces zu früheren
   Tasks, relevante Global Constraints).
2. Implementierer-Subagent dispatchen: eigener Task, Interfaces aus früheren
   Tasks, Global Constraints — nicht die gesamte Session-Historie einfügen.
   Fragen des Subagents vor der Umsetzung klar beantworten.
3. Der Subagent implementiert, testet (TDD, siehe r-tdd), committet, macht
   einen kurzen Selbst-Review und meldet einen von vier Status:
   - **DONE** — weiter zum Review.
   - **DONE_WITH_CONCERNS** — Bedenken lesen; bei Korrektheits-/Scope-Fragen vor
     dem Review klären, bei reinen Beobachtungen notieren und weiter.
   - **NEEDS_CONTEXT** — fehlenden Kontext liefern, neu dispatchen.
   - **BLOCKED** — Ursache einordnen: fehlender Kontext (nachliefern),
     Aufgabe braucht mehr Urteilsvermögen (stärkeres Modell), Task zu groß
     (aufteilen), oder Plan selbst fehlerhaft (an den Menschen eskalieren).
     Niemals denselben Subagent unverändert erneut versuchen lassen.
4. Bei DONE: Diff des Tasks erzeugen (Commit-Bereich seit vor dem Dispatch,
   nie nur den letzten Commit — Multi-Commit-Tasks würden sonst beschnitten)
   und einen Task-Reviewer-Subagent dispatchen. Der Reviewer prüft zwei
   getrennte Dinge: Spec-Konformität und Code-Qualität — beide Pflicht.
5. Findet der Review Kritisches/Wichtiges: Fix-Subagent mit der vollständigen
   Findings-Liste dispatchen (nicht ein Subagent pro einzelnem Finding), danach
   erneut reviewen. Wiederholen, bis beide Verdikte sauber sind.
6. Minor-Findings im Ledger vermerken statt sofort zu fixen — der finale
   Gesamt-Review triagiert sie.
7. Task als abgeschlossen markieren (Todo-Liste + Ledger), erst dann zum
   nächsten Task.

Nach dem letzten Task: finalen Reviewer über den gesamten Branch-Diff seit
dem Abzweigpunkt dispatchen (stärkstes verfügbares Modell — Architektur-
und Ganzheitsurteil). Danach r-finish anwenden, um den Branch abzuschließen.

## Modellwahl

Das schwächste Modell nehmen, das die Rolle noch zuverlässig erfüllt:
mechanische Tasks (isolierte Funktionen, klare Spec, 1-2 Dateien) → günstiges
Modell; Integrations-/Urteilsaufgaben (mehrere Dateien, Musterabgleich,
Debugging) → Standardmodell; Architektur/Design und der finale Gesamt-Review →
stärkstes verfügbares Modell. Modell bei jedem Dispatch explizit angeben —
sonst erbt der Subagent das (oft teuerste) Session-Modell. Turnanzahl schlägt
Tokenpreis: günstige Modelle brauchen oft 2-3× so viele Schritte, was den
Gesamtpreis über ein Mittelmodell heben kann — Mittelmodell als Untergrenze
für Reviewer und für Implementierer, die aus Prosa-Beschreibungen arbeiten.

## Vorab-Plan-Check

Vor dem ersten Dispatch den Plan einmal auf Widersprüche scannen: Tasks, die
sich gegenseitig oder den Global Constraints widersprechen; Dinge, die der
Plan vorschreibt, aber die Review-Maßstäbe als Mangel werten würden. Alle
Funde gebündelt dem Menschen vorlegen (Fund neben Plantext, welcher gilt) —
nicht Task für Task einzeln unterbrechen. Ist der Scan sauber, ohne Kommentar
weitermachen.

## Fortschritts-Ledger

Gesprächsgedächtnis übersteht keine Kontextkompaktierung. Fortschritt in einer
Ledger-Datei festhalten, nicht nur in Todos — sonst drohen komplett erneute
Dispatches bereits fertiger Tasks. Bei jedem abgeschlossenen, sauber
geprüften Task eine Zeile ergänzen (Task, Commit-Bereich, "review clean").
Nach Kompaktierung: Ledger und `git log` vertrauen, nicht der eigenen
Erinnerung.

## Nie

- Auf main/master ohne ausdrückliche Zustimmung des Nutzers starten.
- Task-Review überspringen oder einen Report ohne beide Verdikte akzeptieren.
- Mit ungefixten Kritisch/Wichtig-Findings weitermachen.
- Mehrere Implementierer-Subagents parallel für denselben Plan dispatchen
  (Konfliktgefahr).
- Einem Reviewer vorgeben, was er nicht flaggen soll, oder ein Finding vorab
  als "höchstens Minor" einordnen — Findings unvoreingenommen selbst
  einordnen lassen.
- Einen bereits im Ledger als fertig markierten Task erneut dispatchen.
