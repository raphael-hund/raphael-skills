---
name: r-tickets
version: 0.1.0
description: >
  Zerlegt einen Plan, eine Spec oder das laufende Gespräch in tracer-bullet
  Tickets — vertikale Slices mit expliziten Blocking-Kanten statt
  horizontaler Layer-Schnitte. Trigger: "Tickets schreiben", "in Tickets
  aufteilen", "Backlog bauen", "to-tickets".
class: M
scope: agency
sensitivity: internal
source: vendored from mattpocock/skills skills/engineering/to-tickets @ 9603c1cc
completion_criteria:
  - "Jedes Ticket ist ein vertikaler Slice (Schema bis UI/Test), keine horizontale Layer-Scheibe"
  - "Jedes Ticket nennt seine Blocked-by-Kante oder 'None — kann sofort starten'"
  - "Granularität und Kanten wurden dem User zur Bestätigung vorgelegt, bevor veröffentlicht wurde"
---

# r-tickets — Plan in Tracer-Bullet-Tickets zerlegen

## Zweck (1 Satz)

Einen Plan/eine Spec/ein Gespräch in kleine, unabhängig demonstrierbare Tickets mit klaren
Abhängigkeiten schneiden.

## Ablauf

1. Kontext sammeln — aus dem laufenden Gespräch oder aus einer referenzierten Spec/einem
   Issue (vollständig lesen, inklusive Kommentare).
2. Codebase-Stand verstehen, Domänen-Vokabular und ADRs respektieren. Prefactoring-Chancen
   suchen: erst die Änderung leicht machen, dann die leichte Änderung machen.
3. Vertikale Slices entwerfen:
   - Jeder Slice zieht einen schmalen, aber vollständigen Pfad durch alle Schichten (Schema,
     API, UI, Tests) — vertikal, keine Layer-Scheibe.
   - Ein fertiger Slice ist für sich allein demonstrierbar/verifizierbar.
   - Jeder Slice passt in ein einziges frisches Kontextfenster.
   - Prefactoring-Tickets kommen zuerst.
4. Jedem Ticket seine **Blocking-Kanten** geben — welche anderen Tickets zuerst fertig sein
   müssen. Ticket ohne Blocker = sofort startklar.
5. **Ausnahme Wide Refactor:** ein rein mechanischer Umbau mit Wirkung auf den gesamten Code
   (Spalte umbenennen, geteilten Typ ändern) lässt sich nicht vertikal schneiden. Stattdessen
   Expand → Migrate-Batches → Contract: erst die neue Form parallel zur alten einführen
   (nichts bricht), dann Aufrufer in nach Blast-Radius sortierten Batches umziehen (je Batch
   ein eigenes, vom Expand-Ticket blockiertes Ticket, CI bleibt grün), zuletzt die alte Form
   löschen (blockiert von allen Migrate-Batches).
6. Vorschlag als nummerierte Liste dem User vorlegen: Titel, Blocked-by, gelieferte
   End-to-End-Funktion je Ticket. Fragen: Granularität richtig? Kanten korrekt?
   Zusammenlegen/weiter aufteilen? Iterieren bis Zustimmung.
7. Veröffentlichen — eine Datei je Ticket (lokal, in Abhängigkeitsreihenfolge nummeriert)
   oder ein Issue je Ticket auf dem echten Tracker (native Blocking-/Sub-Issue-Beziehung
   nutzen, wo vorhanden). Kein Datei-Pfad/Code-Schnipsel außer belegter Prototyp-Ausnahme wie
   bei `r-to-spec`.

## Ticket-Inhalt (je Ticket)

- **Was gebaut wird** — End-to-End-Verhalten aus Nutzersicht, keine Layer-für-Layer-Liste.
- **Blocked by** — Verweise auf blockierende Tickets oder "None — kann sofort starten".
- **Abnahmekriterien** — als Checkliste.

## Gotchas

- Horizontale Schichten-Tickets (nur Backend, nur UI) sind kein tracer bullet — nicht einzeln
  demonstrierbar, ablehnen.
- Wide Refactors nie in ein vertikales Ticket zwingen — Expand-Migrate-Contract ist die eigene
  Kategorie.
- Elterliche Issues nie schließen oder verändern — nur referenzieren.
- Kein Veröffentlichen ohne User-Bestätigung der Granularität/Kanten.
