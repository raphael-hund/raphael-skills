---
name: r-tdd
version: 0.1.0
description: >
  Test-Driven Development als eiserne Regel: erst der fehlschlagende Test,
  dann minimaler Code, dann Refactor. Kein Produktionscode ohne vorher
  gesehenen Fehlschlag. Trigger: "TDD", "Test-Driven Development",
  "Red-Green-Refactor", "Feature implementieren", "Bugfix schreiben".
class: M
scope: agency
sensitivity: internal
source: vendored from superpowers (obra) skills/test-driven-development @ d884ae04
completion_criteria:
  - "Für jede neue Funktion/jeden Fix existiert ein Test, der vor der Implementierung fehlgeschlagen ist"
  - "Jeder Fehlschlag wurde beobachtet und war aus dem erwarteten Grund (fehlendes Feature, kein Tippfehler)"
  - "Alle Tests grün, Ausgabe sauber (keine Fehler/Warnungen), Implementierung minimal"
---

# r-tdd — Test-Driven Development

**Kernregel:**

```
KEIN PRODUKTIONSCODE OHNE VORHER FEHLGESCHLAGENEN TEST
```

Wer Code vor dem Test schreibt: löschen, neu anfangen. Nicht "als Referenz"
behalten, nicht beim Testschreiben "anpassen", nicht ansehen. Löschen heißt
löschen — frisch aus den Tests heraus implementieren.

**Wann:** immer bei neuen Features, Bugfixes, Refactorings, Verhaltensänderungen.
Ausnahmen (nur nach Absprache mit dem Menschen): Wegwerf-Prototypen, generierter
Code, reine Konfigurationsdateien. Der Gedanke "diesmal ohne TDD" ist bereits
das Warnsignal.

## Red-Green-Refactor

**RED — fehlschlagenden Test schreiben.** Ein minimaler Test für genau ein
Verhalten, klarer Name, echter Code statt Mocks wo möglich.

**RED verifizieren (Pflicht, nie überspringen).** Testkommando laufen lassen
und bestätigen: Test schlägt fehl (nicht Fehler/Crash), Fehlermeldung ist die
erwartete, Fehlschlag liegt am fehlenden Feature — nicht an einem Tippfehler.
Test besteht direkt? Dann wird bestehendes Verhalten getestet — Test korrigieren.
Test wirft einen Fehler statt eines Fehlschlags? Fehler beheben, bis er korrekt
fehlschlägt.

**GREEN — minimaler Code.** Gerade genug, um den Test zu bestehen. Keine
zusätzlichen Features, kein Refactoring nebenher, keine "Verbesserung" über
den Test hinaus (YAGNI).

**GREEN verifizieren (Pflicht).** Testkommando erneut laufen lassen: Test
besteht, alle übrigen Tests bestehen weiterhin, Ausgabe ist sauber (keine
Fehler/Warnungen). Schlägt der Test fehl: Code korrigieren, nicht den Test.
Schlagen andere Tests fehl: sofort beheben.

**REFACTOR — nur im grünen Zustand.** Duplikate entfernen, Namen verbessern,
Hilfsfunktionen extrahieren. Tests bleiben grün, kein neues Verhalten.

**Wiederholen** mit dem nächsten fehlschlagenden Test für das nächste Stück
Verhalten.

## Was gute Tests ausmacht

Minimal (ein Verhalten — "und" im Namen ist ein Signal zum Splitten), klar
benannt (Name beschreibt Verhalten, nicht "test1"), zeigt Absicht (demonstriert
die gewünschte API statt sie zu verschleiern).

## Warum die Reihenfolge zählt

Tests, die nach dem Code geschrieben werden, bestehen sofort — das beweist
nichts: sie könnten das Falsche testen, die Implementierung statt das
Verhalten prüfen, oder Grenzfälle übersehen, an die man nachträglich nicht
mehr denkt. Test-first zwingt dazu, den Fehlschlag tatsächlich zu sehen — nur
so ist belegt, dass der Test überhaupt etwas prüft. Manuelles Testen ist
Ad-hoc, nicht systematisch: kein Protokoll, nicht wiederholbar, unter Zeitdruck
leicht vergessen. Bereits investierte Zeit ist kein Grund, ungetesteten Code
zu behalten (Sunk-Cost-Falsche) — ungetesteter Code ist technische Schuld,
unabhängig davon, wie lange er gedauert hat.

## Häufige Rationalisierungen — und warum sie nicht tragen

"Zu einfach zum Testen" — einfacher Code bricht trotzdem, ein Test kostet
Sekunden. "Ich teste danach" — sofort bestehende Tests beweisen nichts.
"Schon manuell getestet" — Ad-hoc statt systematisch, kein Protokoll.
"Bereits X Stunden investiert, Löschen wäre Verschwendung" — Sunk-Cost-Falsche,
ungetesteter Code ist die eigentliche Verschwendung. "Erst mal explorieren" —
in Ordnung, aber danach die Exploration verwerfen und mit TDD neu beginnen.

## Warnsignale — sofort neu anfangen

Code vor dem Test; Test nach der Implementierung geschrieben; Test besteht
sofort; kann nicht erklären, warum der Test fehlgeschlagen ist; Tests "später"
ergänzt; jede Formulierung von "nur dieses eine Mal ohne".

## Debugging-Integration

Bug gefunden? Erst einen fehlschlagenden Test schreiben, der ihn reproduziert,
dann dem Zyklus folgen. Der Test belegt den Fix und verhindert Rückfälle. Nie
einen Bug ohne begleitenden Test fixen.

## Bei Blockaden

Unklar, wie man testet? Die gewünschte API zuerst hinschreiben, dann die
Assertion. Test zu kompliziert? Das Design ist zu kompliziert — Schnittstelle
vereinfachen. Muss fast alles mocken? Code ist zu eng gekoppelt — Dependency
Injection nutzen. Testaufbau riesig? Hilfsfunktionen extrahieren; bleibt es
komplex, Design vereinfachen.

## Abschluss-Checkliste

Jede neue Funktion hat einen Test; jeder Fehlschlag wurde beobachtet und war
aus erwartetem Grund; minimaler Code je Test; alle Tests grün; Ausgabe sauber;
echte statt gemockter Pfade, wo vertretbar; Grenzfälle und Fehlerpfade
abgedeckt. Lässt sich ein Punkt nicht abhaken: TDD wurde übersprungen — neu
anfangen.
