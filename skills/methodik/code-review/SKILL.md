---
name: code-review
version: 0.2.0
description: >
  Deckt den vollen Code-Review-Zyklus ab: wann und wie ein Review anfordern
  (frischer Subagent, präzise Diff-Grenze statt Session-Historie), und wie
  Feedback danach behandelt wird — verifizieren statt performativ zustimmen,
  gezielt zurückfragen, technisch begründet widersprechen. Jeder Fund bekommt
  eine von drei Eskalationsstufen (auto-fix/no-op/ask-user), Reviews starten
  mit der erklärten Absicht des Autors, nicht nur dem Diff. Für tiefere
  Reviews steht optional die Zwei-Achsen-Methode (Standards vs. Spec, mit
  Fowler-Smell-Baseline) und ein 9-Kategorien-Audit-Playbook als Referenz
  bereit. Trigger: "Code Review", "review anfordern", "Feedback bekommen",
  "PR review", "vor dem Merge prüfen".
class: M
scope: agency
sensitivity: internal
source: fusion — superpowers skills/requesting-code-review + skills/receiving-code-review @ d884ae04 + mattpocock skills/engineering/code-review @ 9603c1cc + no-mistakes (kunchenguid) @ 2d10688c + shadcn/improve skills/improve + oh-my-openagent packages/shared-skills/skills/review-work
loads:
  - references/zwei-achsen-review.md
  - references/audit-playbook.md
completion_criteria:
  - "Reviewer war ein frischer Subagent mit exakt eingegrenztem Diff (BASE_SHA..HEAD_SHA oder Fixpunkt), nicht die eigene Session-Historie"
  - "Reviewer bekam vor dem Diff die erklärte Absicht des Autors (Ziel, Trade-offs, bewusst verworfene Alternativen)"
  - "Jeder Fund trägt eine von drei Eskalationsstufen (auto-fix/no-op/ask-user); ask-user-Funde sind wortgetreu an den Menschen weitergegeben"
  - "Kritische Findings sind gefixt, wichtige vor dem nächsten Schritt behoben oder bewusst mit Begründung zurückgewiesen"
  - "Keine performative Zustimmung im Antworttext (kein 'Du hast völlig recht' o.ä.) — stattdessen Fix + kurze technische Aussage oder begründeter Widerspruch"
---

# code-review — Anfordern und Empfangen

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
sdd), nach Abschluss eines größeren Features, vor jedem Merge.
**Optional, aber wertvoll:** wenn man feststeckt (frischer Blick), vor
Refactorings (Baseline), nach komplexen Bugfixes.

## Wie anfordern

1. **Phase 0 — Kontext sammeln, bevor irgendwer dispatcht wird:** Ziel/
   Auftrag, Constraints, Hintergrund, geänderte Dateien, Diff, Verify-Befehl.
   Wo möglich aus dem laufenden Gespräch ziehen statt neu zu erfragen.
   Ohne diesen Schritt bewertet der Reviewer gegen ein Ziel, das er sich
   selbst ausdenkt.
2. **Intent-first, nicht Diff-first:** der Reviewer bekommt VOR dem Diff die
   erklärte Absicht des Autors — Ziel, getroffene Entscheidungen, bewusst
   ausgeschlossene Alternativen — als autoritative Abnahmekriterien. Eine
   dünne Ein-Satz-Zusammenfassung führt dazu, dass bewusste Entscheidungen
   fälschlich als Fehler markiert werden.
3. Diff-Grenze exakt fassen: `BASE_SHA=$(git rev-parse HEAD~1)` (oder
   `origin/main`, oder ein vom Nutzer genannter Fixpunkt) und
   `HEAD_SHA=$(git rev-parse HEAD)`.
4. Einen frischen `general-purpose`-Subagenten dispatchen, idealerweise in
   einem eigenen Worktree (Review läuft nie im Haupt-Worktree) — **nie** die
   eigene Session-Historie als Kontext geben, nur: Absicht (Schritt 2),
   BASE_SHA, HEAD_SHA. Das hält den Reviewer aufs Arbeitsergebnis fokussiert,
   nicht auf den eigenen Gedankengang, und schont den eigenen Kontext.
5. Für tiefe/strukturierte Reviews: `references/zwei-achsen-review.md`
   anwenden (Standards-Achse + Spec-Achse getrennt, parallel, nicht
   gegeneinander verrechnet), oder für eine vollständige 9-Kategorien-
   Durchsicht mit Evidenz-Pflicht `references/audit-playbook.md`.

## Findings-Klassifikation

Jeder Fund bekommt eine von drei Kategorien, bevor er in die Antwort geht:

- **auto-fix** — eindeutig, Fix ist mechanisch, keine Rückfrage nötig.
- **no-op** — beobachtet, aber bewusst kein Fix (z. B. by-design, in ADR
  entschieden, außerhalb des Scopes) — mit einer Zeile Begründung notieren.
- **ask-user** — widerspricht der erklärten Absicht des Nutzers oder ändert
  Produktverhalten. **Muss** eskaliert werden — wortgetreu, ohne Paraphrase,
  bevor weitergemacht wird.

Nur die dritte Kategorie geht an den Menschen; die ersten zwei entscheidet
der Agent selbst.

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
- **Am Gate wird entschieden, nicht umgangen:** solange ein Review-Gate
  aktiv ist, Findings nicht selbst im Code fixen und den Lauf nicht
  abbrechen/neu starten, um am Gate vorbeizukommen. Aufgabe am Gate ist
  approve/fix/skip entscheiden — nicht eigenmächtig editieren.
- Doku-Scope-Creep ist ein eigener Finding-Typ: ein Review, das über die vom
  Diff tatsächlich veraltete Doku hinaus zu einem erschöpfenden Corpus-Sweep
  auffordert, produziert unnötige Doku-Commits (belegter Fall: 90 von 121
  auditierten PRs). Scope auf das begrenzen, was der Change veraltet hat.

## GitHub-Threads

Antworten auf Inline-Review-Kommentare gehören in den Kommentar-Thread
(`gh api repos/{owner}/{repo}/pulls/{pr}/comments/{id}/replies`), nicht als
neuer Top-Level-Kommentar.

## Gotchas

- **Ausführbare Config nur vom vertrauenswürdigen Branch lesen.** Felder,
  die echten Code/Befehle starten (welcher Agent läuft, welcher Testbefehl),
  dürfen nie vom PR-/Feature-Branch gelesen werden, nur von einer frisch
  aufgelösten SHA des Default-Branch — sonst kann ein Contributor sich per
  Config selbst gefährliche Rechte freischalten.
- **Subagenten-Reports vor der Präsentation selbst nachlesen.** Ein Review-
  Subagent über-reportet gerne ("alles grün") — jeder zitierte Fund wird vom
  Hauptagenten selbst im Diff verifiziert, bevor er in die finale Antwort
  kommt.
