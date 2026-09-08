# Plan-Vorlage

Der Plan beschreibt den beauftragten Zielzustand und die Entscheidungen, die
für die Umsetzung nötig sind. Umfang nach Aufgabe wählen; eine Routinekorrektur
braucht kein separates Plan-Dokument. Bestehenden Plan an Ort ergänzen.

## Kopf

- **Ziel:** beobachtbares Ergebnis und Abnahmekriterium.
- **Stand:** relevante Dateien/Symbole, bei einem später auszuführenden Plan
  auch Commit-SHA oder andere überprüfbare Ausgangsversion.
- **Scope:** betroffene absolute Pfade und tatsächlich wichtige Ausschlüsse.
- **Schnittstellen:** Verträge zu bestehenden Komponenten und anderen Tasks.
- **Abhängigkeiten:** Vorgänger, gemeinsame Dateien und Integrations-Owner.
- **Verifikation:** passende vorhandene Tests oder andere Checks mit
  erwarteter Ausgabe; subjektive Abnahme gesondert benennen.

## Umsetzungsschritte

Je Schritt angeben, was sich an welchen Dateien/Symbolen ändert und wie das
verlangte Verhalten geprüft wird. Code nur zeigen, wenn er eine offene
Schnittstellenentscheidung klärt. Implementierungscode entsteht beim Build.
Taskgröße und Commit-Aufteilung folgen Abhängigkeiten und Prüfbarkeit.

Ein eigenständig ausführbares Paket enthält die nötigen Fakten und Quellen.
Keine Platzhalter für ungelöste Kernentscheidungen; offene Fragen benennen.
Keine Secret-Werte in Plan oder Handoff, nur sicheren Fundort und Credential-Typ.

## Vor Umsetzung und Abschluss

Relevante Abweichungen vom geplanten Ausgangsstand prüfen. Technische Details
innerhalb des autorisierten Auftrags selbst anpassen. Nur eine echte Produkt-
oder Scope-Entscheidung oder nicht ermittelbare Zugangsinformation braucht den
Nutzer; unabhängige Arbeit vorher fertigstellen. Ein fehlgeschlagener Check
führt zur Ursachenprüfung, nicht automatisch zum Abbruch des gesamten Plans.

Fertig ist das verlangte Ergebnis mit passenden Verifikationsbelegen. Eine
Planungsanfrage liefert den Plan; ein Auftrag, der Umsetzung umfasst, wird bis
zum geprüften Ergebnis ausgeführt.
