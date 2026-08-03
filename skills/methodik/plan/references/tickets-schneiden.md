<!-- source: fusion — mattpocock/skills skills/engineering/to-tickets @ 9603c1cc + shadcn/improve skills/improve/references/audit-playbook.md (Priorisierungs-Rubrik) — konsolidiert in plan 1.0.0 am 03.08.2026 -->

# tickets — Plan in Tracer-Bullet-Tickets zerlegen

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
   **Priorisierungs-Tiebreaker** bei gleichrangigen Tickets: (a) was andere
   Tickets entblockt (Verifikations-Baseline, Prefactoring) schwimmt nach
   oben; (b) Security-relevante Tickets mit hoher Konfidenz schwimmen über
   gleichrangige Nicht-Security-Tickets; (c) "nicht wert, es zu tun" ist ein
   gültiges Verdikt — mit einer Zeile Begründung explizit als abgelehnt
   markieren statt es unkommentiert liegen zu lassen.
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
   bei `to-spec`.

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
