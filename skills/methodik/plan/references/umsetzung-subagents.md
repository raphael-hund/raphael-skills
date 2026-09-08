<!-- source: fusion — superpowers (obra) skills/subagent-driven-development @ d884ae04 + shadcn/improve skills/improve/references/closing-the-loop.md — konsolidiert in plan 1.1.0 am 03.08.2026 -->

# Delegierte Umsetzung

Der Owner hält einen endlichen Auftragsgraphen, den aktuellen Stand und den
Abschluss. Delegation dient unabhängigen Arbeitspaketen; die Zahl der Agents
folgt dem Auftrag und der tatsächlichen Kapazität. Leaves erzeugen keine
Nachkommen.

## Paket und Schreibgrenzen

Jeder Leaf erhält Ziel, Abnahmekriterium, relevante Quellen, betroffene absolute
Pfade, Schnittstellen, Abhängigkeiten und Verify-Kommandos. Bestehende Belege
gezielt mitgeben; aktuelle Nutzerkorrekturen erhalten.

Dependency-ready Pakete dürfen parallel laufen. Writer benötigen disjunkte
normalisierte `write_set`s oder isolierte Worktrees. Gemeinsame Dateien haben
einen Integrations-Owner. Modell und Werkzeuge folgen dem aktuellen
Nutzer-/Hostvertrag; es gibt keine feste Familien- oder Reviewerquote.

## Ausführen und prüfen

1. Der Task-Owner implementiert das verlangte Verhalten und führt passende
   vorhandene Tests oder gezielte Checks aus. Commit/Push folgen dem Auftrag.
2. Die Rückgabe nennt Änderungen, Belege und tatsächlichen Status:
   **DONE**, **DONE_WITH_CONCERNS**, **NEEDS_CONTEXT** oder **BLOCKED**.
   Infrastrukturfehler sind kein Produkt-PASS.
3. Der Integrations-Owner prüft Artefakt, Scope und aussagekräftige Belege.
   Ein zusätzlicher unabhängiger Reviewer braucht eine konkrete Prüffrage
   und erwarteten Erkenntniswert. Er bekommt den relevanten gesamten Diff,
   einschließlich aller Task-Commits und noch nicht committierter Änderungen.
4. Berechtigte Findings gehen an denselben Task-Owner. Nach gezieltem Fix die
   betroffenen Checks wiederholen. Neue Reviewer oder vollständige Reviewrunden
   benötigen eine neue Änderung, ein relevantes Risiko oder eine offene Frage.
5. Nach Integration den Stand aktualisieren und weitere dependency-ready
   Pakete fortsetzen. Abschließenden Gesamt-Review nur bei entsprechendem
   Risiko oder ausdrücklichem Auftrag ergänzen.

Reviewer liefern Befunde mit Datei:Zeile und Begründung. Ein Findings-Bericht
ist keine Anweisung, den Scope zu erweitern. Subjektive Abnahme bleibt beim
Nutzer.

## Wiederaufnahme

Den vorhandenen Task-Plan bzw. das bestehende Ledger für Status und Belege
nutzen; kein paralleles neues Statusdokument anlegen. Erledigte Pakete nicht
neu dispatchen. Bei einem gestorbenen Task Prozessstatus und Artefakt prüfen
und die offene Arbeit innerhalb des Auftrags fortsetzen.

Technische Widersprüche im Plan selbst beheben. Fehlenden Kontext aus Dateien
und Verlauf nachliefern. Nur echte Produkt-/Scope-Entscheidungen oder nicht
ermittelbare Zugänge vorlegen; ein blockiertes Paket beendet die anderen
Pakete nicht. Aktuelle Korrekturen haben Vorrang vor alten Ledgers und Reviews.
