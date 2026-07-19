---
name: r-code-review
version: 0.1.0
description: >
  Deckt den vollen Code-Review-Zyklus ab: wann und wie ein Review anfordern
  (frischer Subagent, präzise Diff-Grenze statt Session-Historie), und wie
  Feedback danach behandelt wird — verifizieren statt performativ zustimmen,
  gezielt zurückfragen, technisch begründet widersprechen. Für tiefere
  Reviews steht optional die Zwei-Achsen-Methode (Standards vs. Spec, mit
  Fowler-Smell-Baseline) als Referenz bereit. Trigger: "Code Review",
  "review anfordern", "Feedback bekommen", "PR review", "vor dem Merge prüfen".
class: M
scope: agency
sensitivity: internal
source: fusion — superpowers skills/requesting-code-review + skills/receiving-code-review @ d884ae04 + mattpocock skills/engineering/code-review @ 9603c1cc
loads:
  - references/zwei-achsen-review.md
completion_criteria:
  - "Reviewer war ein frischer Subagent mit exakt eingegrenztem Diff (BASE_SHA..HEAD_SHA oder Fixpunkt), nicht die eigene Session-Historie"
  - "Kritische Findings sind gefixt, wichtige vor dem nächsten Schritt behoben oder bewusst mit Begründung zurückgewiesen"
  - "Keine performative Zustimmung im Antworttext (kein 'Du hast völlig recht' o.ä.) — stattdessen Fix + kurze technische Aussage oder begründeter Widerspruch"
---

# r-code-review — Anfordern und Empfangen

**Zweck (1 Satz):** Probleme früh fangen, bevor sie sich verketten — durch
isolierten Review-Kontext beim Anfordern und durch technische statt
soziale Verarbeitung des Feedbacks beim Empfangen.

## Herkunft & Entscheidung

**Basis:** superpowers `requesting-code-review` + `receiving-code-review`
(fusioniert). Begründung: beide zusammen decken den kompletten Zyklus ab
(Anfordern **und** Empfangen inkl. Zurückweisen-Protokoll) — mattpococks
`code-review` deckt nur die Anforder-/Durchführungsseite ab, hat aber keine
Gegenseite für den Umgang mit dem Ergebnis.

**Eingearbeitet:** mattpococks Zwei-Achsen-Methode (Standards vs. Spec,
parallele Subagents, Fowler-Smell-Baseline) ist eine konkrete, stärkere
Technik für die eigentliche Review-*Durchführung* und liegt als
`references/zwei-achsen-review.md` bereit — nutzen, wenn ein Review
strukturiert gegen Standards **und** Spec getrennt laufen soll, statt nur
grob "Review machen".

## Wann anfordern

**Pflicht:** nach jedem Task in Subagent-getriebener Umsetzung (siehe
r-sdd), nach Abschluss eines größeren Features, vor jedem Merge.
**Optional, aber wertvoll:** wenn man feststeckt (frischer Blick), vor
Refactorings (Baseline), nach komplexen Bugfixes.

## Wie anfordern

1. Diff-Grenze exakt fassen: `BASE_SHA=$(git rev-parse HEAD~1)` (oder
   `origin/main`, oder ein vom Nutzer genannter Fixpunkt) und
   `HEAD_SHA=$(git rev-parse HEAD)`.
2. Einen frischen `general-purpose`-Subagenten dispatchen — **nie** die
   eigene Session-Historie als Kontext geben, nur: Kurzbeschreibung was
   gebaut wurde, Anforderung/Plan wogegen geprüft wird, BASE_SHA, HEAD_SHA.
   Das hält den Reviewer aufs Arbeitsergebnis fokussiert, nicht auf den
   eigenen Gedankengang, und schont den eigenen Kontext.
3. Für tiefe/strukturierte Reviews: `references/zwei-achsen-review.md`
   anwenden (Standards-Achse + Spec-Achse getrennt, parallel, nicht
   gegeneinander verrechnet).

## Wie empfangen

Feedback ist immer eine zu bewertende Aussage, kein Befehl:

1. **Lesen** — vollständig, ohne sofort zu reagieren.
2. **Verstehen** — Anforderung in eigenen Worten wiedergeben oder nachfragen.
3. **Verifizieren** — gegen die tatsächliche Codebasis prüfen, nicht blind
   übernehmen.
4. **Bewerten** — technisch korrekt für *diese* Codebasis?
5. **Antworten** — technische Bestätigung oder begründeter Widerspruch.
6. **Umsetzen** — ein Punkt nach dem anderen, jeden einzeln testen.

Bei unklarem Feedback: **stoppen**, nichts umsetzen, gezielt nachfragen —
Punkte hängen oft zusammen, Teilverständnis führt zu falscher Umsetzung.

## Rote Linien

- Kein Review überspringen, weil "es ist doch trivial".
- Keine performative Zustimmung ("Du hast völlig recht!", "Guter Punkt!") —
  stattdessen fixen und die Änderung knapp benennen, oder technisch
  widersprechen. Handlung statt Floskel.
- Kritische Findings nie ignorieren, wichtige nie unbehandelt weiterreichen.
- YAGNI-Check bei "professionell implementieren"-Vorschlägen: erst prüfen,
  ob die Stelle überhaupt genutzt wird, bevor man sie ausbaut.
- Bei Widerspruch zu einer früheren Entscheidung des Nutzers: stoppen und
  mit ihm klären, nicht eigenmächtig überschreiben.

## GitHub-Threads

Antworten auf Inline-Review-Kommentare gehören in den Kommentar-Thread
(`gh api repos/{owner}/{repo}/pulls/{pr}/comments/{id}/replies`), nicht als
neuer Top-Level-Kommentar.
