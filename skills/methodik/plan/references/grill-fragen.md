<!-- source: vendored from mattpocock/skills skills/productivity/grilling @ 9603c1cc — konsolidiert in plan 1.0.0 am 03.08.2026 -->

# grill — Plan/Entscheidung durchgrillen

## Zweck (1 Satz)

Ein Vorhaben durch eine strikte Ein-Frage-nach-der-anderen-Befragung stresstesten, bis
Klarheit herrscht — bevor irgendetwas umgesetzt wird.

## Wann

- Vor einem größeren Commit/Feature, wenn Annahmen unklar sind.
- Wenn der User explizit "grillen" verlangt oder eine Idee/einen Plan zur Diskussion stellt.

## Ablauf

1. Entscheidungsbaum aufspannen — jede Abzweigung einzeln identifizieren, Abhängigkeiten
   zwischen Entscheidungen erkennen.
2. Pro Frage: **eine** stellen, warten, erst dann die nächste. Mehrere Fragen gleichzeitig
   verwirren und werden übersprungen.
3. Zu jeder Frage eine eigene Empfehlung mitliefern — der User soll gegen etwas entscheiden,
   nicht aus dem Nichts.
4. Fakten, die sich aus Dateisystem/Tools ableiten lassen, selbst nachschlagen — nur echte
   **Entscheidungen** (Geschmack, Priorität, Risiko-Toleranz) gehören dem User.
5. Nicht umsetzen, bevor die letzte Frage beantwortet und das gemeinsame Verständnis
   bestätigt ist.

## Gotchas

- Fragenbatches ("hier sind 5 Fragen") sind ein Antipattern — Rückfall in Ein-Frage-Modus.
- Eine Empfehlung ist kein Vorwegnehmen der Entscheidung — bei Widerspruch zählt die Antwort
  des Users.
- Nachfragen, die durch `grep`/`ls`/Doku-Lektüre beantwortbar wären, kosten dem User nur
  Zeit — erst selbst suchen.
- Grillen endet mit einer expliziten Bestätigung, nicht mit einem impliziten "passt schon" —
  ohne klares Okay keine Umsetzung.

## Nachbarn

- [`idea-filter`](/root/raphael-skills/skills/eigene/idea-filter/SKILL.md) — wenn eine
  Geschäftsidee ein festes Verdikt entlang fester Dimensionen braucht statt eines offenen
  Gesprächs.
- [`brainstorm`](/root/raphael-skills/skills/methodik/brainstorm/SKILL.md) — wenn das
  Ergebnis eine schriftliche Design-Spec sein soll, nicht nur gemeinsames Verständnis.
- [`llm-council`](/root/.claude/skills/llm-council/SKILL.md) — derselbe Stresstest, aber
  von mehreren Modellfamilien parallel statt im Dialog.
