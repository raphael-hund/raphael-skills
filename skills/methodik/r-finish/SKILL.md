---
name: r-finish
version: 0.1.0
description: >
  Schließt einen Entwicklungs-Branch sauber ab: Tests verifizieren, Umgebung
  erkennen, genau die passenden Optionen anbieten (Merge, PR, Behalten,
  Verwerfen), gewählten Weg ausführen, Workspace aufräumen. Trigger:
  "Branch abschließen", "fertig implementiert", "mergen oder PR",
  "finishing a development branch".
class: M
scope: agency
sensitivity: internal
source: vendored from superpowers (obra) skills/finishing-a-development-branch @ d884ae04
completion_criteria:
  - "Tests vor Optionspräsentation nachweislich grün (Kommando + Ergebnis genannt)"
  - "Genau die passende Optionsliste (4 bzw. 3 bei detached HEAD) gestellt und Antwort abgewartet"
  - "Gewählte Option sauber ausgeführt inkl. Cleanup-Regeln (nur bei Merge/Verwerfen, nie bei PR/Behalten)"
---

# r-finish — Entwicklungs-Branch abschließen

**Kernprinzip:** Tests verifizieren → Umgebung erkennen → Optionen
präsentieren → gewählten Weg ausführen → aufräumen.

## Schritt 1: Tests verifizieren

Vor jeder Optionspräsentation die Projekt-Testsuite laufen lassen. Schlagen
Tests fehl: Fehlschläge zeigen, klarstellen, dass Merge/PR erst nach Fix
möglich ist, und hier stoppen — nicht zu Schritt 2 weitergehen.

## Schritt 2: Umgebung erkennen

Feststellen, ob normales Repo, benannter Worktree oder detached HEAD
vorliegt (z. B. über `git rev-parse --git-dir` vs. `--git-common-dir` — sind
sie identisch, gibt es keinen Worktree zum Aufräumen). Das bestimmt, welche
Optionsliste gilt und wie das Aufräumen läuft.

## Schritt 3: Basis-Branch bestimmen

Über `git merge-base HEAD main` bzw. `...master` ermitteln, oder direkt
nachfragen: "Dieser Branch zweigt von main ab — korrekt?"

## Schritt 4: Optionen präsentieren

**Normales Repo oder benannter Worktree — genau diese 4 Optionen, ohne
zusätzliche Erklärung:**

1. Lokal in `<Basis-Branch>` mergen
2. Pushen und Pull Request erstellen
3. Branch so lassen (später weiter)
4. Arbeit verwerfen

**Detached HEAD — genau diese 3 Optionen (kein Merge möglich):**

1. Als neuen Branch pushen und Pull Request erstellen
2. So lassen (später weiter)
3. Arbeit verwerfen

## Schritt 5: Gewählte Option ausführen

**Merge lokal:** ins Hauptverzeichnis wechseln, Basis-Branch auschecken und
pullen, mergen — **erst danach** Erfolg prüfen (Tests auf dem Merge-Ergebnis
laufen lassen), erst wenn das grün ist: Worktree aufräumen (Schritt 6), dann
Feature-Branch löschen (`git branch -d`).

**Push + PR:** Branch pushen (`git push -u origin <branch>`). Worktree
**nicht** aufräumen — der Nutzer braucht ihn noch, um auf PR-Feedback zu
reagieren.

**Behalten:** Stand melden ("Branch `<name>` bleibt, Worktree unter `<pfad>`
erhalten"). Kein Aufräumen.

**Verwerfen:** vorher explizit bestätigen lassen — Branchname, betroffene
Commits und Worktree-Pfad nennen, auf das exakte Wort "verwerfen" (oder
"discard") warten. Erst danach ins Hauptverzeichnis wechseln, Worktree
aufräumen (Schritt 6), dann Branch erzwungen löschen (`git branch -D`).

## Schritt 6: Workspace aufräumen

Läuft nur bei Merge und Verwerfen — bei Push+PR und Behalten immer den
Worktree erhalten.

- Kein Worktree vorhanden (normales Repo): nichts zu tun.
- Worktree unter einem projekteigenen Worktree-Verzeichnis, das dieser
  Workflow selbst angelegt hat: ins Hauptverzeichnis wechseln, `git worktree
  remove <pfad>`, danach `git worktree prune` (räumt nebenbei verwaiste
  Registrierungen auf).
- Sonst (Workspace von der Umgebung/Harness verwaltet): nicht selbst entfernen.
  Falls die Plattform ein eigenes Exit-/Cleanup-Werkzeug bereitstellt,
  dieses nutzen — sonst den Workspace unangetastet lassen.

## Typische Fehler

Tests-Check überspringen (kaputten Code mergen); offene Frage statt fester
Optionsliste stellen; Worktree bei Option "PR" trotzdem aufräumen (Nutzer
verliert seine Arbeitsumgebung für Review-Feedback); Branch löschen, bevor
der Worktree entfernt ist (schlägt fehl, weil der Worktree noch referenziert);
`git worktree remove` von innerhalb des zu entfernenden Worktrees ausführen
(schlägt still fehl — vorher ins Hauptverzeichnis wechseln); Worktrees
aufräumen, die man nicht selbst angelegt hat; Verwerfen ohne getippte
Bestätigung ausführen.

## Immer

Tests vor der Optionspräsentation verifizieren; Umgebung vor dem Menü
erkennen; exakt die passende Optionsanzahl stellen; bei Verwerfen getippte
Bestätigung einholen; Aufräumen nur bei Merge und Verwerfen; vor
`git worktree remove` ins Hauptverzeichnis wechseln; danach `git worktree
prune` laufen lassen.
