# Zwei-Achsen-Review (aus mattpocock-skills, kondensiert)

Für Reviews, die strukturiert gegen zwei getrennte Maßstäbe laufen sollen,
statt gegen einen vagen Gesamteindruck. Ergänzt den normalen Ablauf aus
SKILL.md — für tiefe Reviews (größeres Feature, PR gegen einen Fixpunkt)
statt für schnelle Zwischenchecks.

## Die zwei Achsen

- **Standards** — folgt der Code den dokumentierten Konventionen des Repos
  (z. B. `CODING_STANDARDS.md`, `CONTRIBUTING.md`) plus einer festen
  Smell-Baseline (siehe unten)?
- **Spec** — setzt der Code exakt das um, was Issue/PRD/Spec verlangt haben?

Beide Achsen **getrennt** berichten, nie verrechnen: Code kann jede
Konvention einhalten und trotzdem das Falsche bauen (Standards bestanden,
Spec durchgefallen) — oder exakt das verlangte tun und dabei Konventionen
brechen (Spec bestanden, Standards durchgefallen). Ein gemeinsamer
Gesamtscore verdeckt genau diesen Fall.

## Ablauf

1. **Fixpunkt festnageln** — Commit/Branch/Tag, gegen den geprüft wird.
   `git diff <fixpunkt>...HEAD` (Drei-Punkt, gegen die Merge-Base) plus
   `git log <fixpunkt>..HEAD --oneline`. Vor dem Dispatch prüfen: Fixpunkt
   löst auf, Diff ist nicht leer.
2. **Spec-Quelle finden** — Issue-Referenzen in Commits, vom Nutzer
   genannter Pfad, oder ein PRD/Spec-Dokument im Projekt. Nichts gefunden
   und auch keine Spec vorhanden: Spec-Achse entfällt, im Bericht vermerken.
3. **Standards-Quellen finden** — alles im Repo, das Codierregeln
   dokumentiert, plus die Smell-Baseline unten als Grundrauschen.
4. **Zwei parallele Subagents dispatchen** (eine Nachricht, zwei
   Agent-Aufrufe), je mit eigenem, engem Auftrag:
   - **Standards-Agent:** Diff + Standards-Quellen + Smell-Baseline. Auftrag:
     pro Fund (a) dokumentierter Verstoß mit Zitat der Regel, (b) erkannter
     Baseline-Smell mit Zitat des Hunks. Harte Verstöße vs. Ermessensfragen
     trennen; dokumentierte Repo-Regel schlägt Baseline; nichts melden, was
     Tooling schon erzwingt.
   - **Spec-Agent:** Diff + Spec-Inhalt. Auftrag: (a) fehlende/halbe
     Anforderungen, (b) ungefragtes Verhalten (Scope Creep), (c) Anforderungen,
     die umgesetzt aussehen, aber falsch sind. Je Fund die Spec-Zeile zitieren.
5. **Aggregieren** — beide Berichte unter eigenen Überschriften
   nebeneinander, nicht mischen oder neu ranken. Abschluss: Fundzahl je
   Achse, schlimmster Fund *innerhalb* jeder Achse — kein achsenübergreifender
   Gesamtsieger, das würde die Trennung wieder aufheben.

## Smell-Baseline (Fowler, *Refactoring* Kap. 3 — Kurzform)

Immer als Ermessensfrage markieren, nie als harte Regel; dokumentierte
Repo-Standards überstimmen die Baseline.

| Smell | Erkennungsmerkmal | Fix-Richtung |
|---|---|---|
| Mysterious Name | Name verrät nicht, was drinsteckt | umbenennen; findet sich kein ehrlicher Name, ist das Design unklar |
| Duplicated Code | gleiche Logikform mehrfach im Diff | gemeinsame Form extrahieren |
| Feature Envy | Methode greift mehr auf fremde Daten zu als auf eigene | Methode zu den Daten verschieben |
| Data Clumps | dieselben Felder/Parameter reisen immer zusammen | zu einem Typ bündeln |
| Primitive Obsession | Primitive/String steht für ein Domänenkonzept | eigenen kleinen Typ geben |
| Repeated Switches | gleicher switch/if-Kaskade auf denselben Typ mehrfach | Polymorphie oder gemeinsame Map |
| Shotgun Surgery | eine Änderung zwingt zu verstreuten Edits | Zusammengehöriges in ein Modul ziehen |
| Divergent Change | eine Datei ändert sich aus mehreren unabhängigen Gründen | nach Änderungsgrund aufteilen |
| Speculative Generality | Abstraktion für einen Bedarf, den die Spec nicht hat | löschen, zurück inlinen |
| Message Chains | lange `a.b().c().d()`-Navigation | hinter einer Methode verstecken |
| Middle Man | Klasse/Funktion delegiert nur weiter | wegkürzen, direkt aufrufen |
| Refused Bequest | Subklasse ignoriert/überschreibt das meiste Geerbte | Vererbung durch Komposition ersetzen |
