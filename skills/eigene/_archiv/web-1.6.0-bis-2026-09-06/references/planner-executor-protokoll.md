# Aktueller Stand und Übergabe

Ein Owner hält den Web-Auftrag über Planung, Bau und Prüfung zusammen. Die
Arbeitsschritte können in derselben Aufgabe stattfinden. Es gibt keinen Zwang,
einen eindeutigen Änderungsauftrag zuerst durch eine allgemeine Kritik zu führen.

## Bestehende Dateien nach ihrem Zweck nutzen

| Datei / Artefakt | Zweck |
|---|---|
| Aktueller Auftrag oder `PLAN.md` | Gewünschtes Ergebnis, Umfang, aktuelle Vorgaben und Abnahme |
| Vorhandenes `DECISIONS.md` / Decision Log | Herkunft und Verlauf; abgelöste Entscheidungen ausdrücklich abgelöst |
| `STATUS.md` bei längerer Arbeit | Aktueller Stand, gültige Belege, offene Abhängigkeiten und nächster Schritt |
| `PRUEFGEGEN.md` bei umfangreicher Kritik | Gewählte konkrete Prüffragen und ihre Quellen |
| `KRITIK-n.md` bei Kritikaufträgen | Abgeschlossenes Ergebnis mit belegten Befunden oder ohne Befunde |
| v3-Plan / `run-evidence.json` soweit benötigt | Maschinenlesbare Routen-/Schreibgrenzen bzw. aktuelle Qualitätsbelege |

Der aktuelle Plan wird bei geänderten Nutzerentscheidungen aktualisiert.
Historie darf ihn nicht als zweite gültige Fassung überlagern. Ein v3-Paket
wird referenziert, nicht nochmals ausgeschrieben. Seine aktuellen Hashes werden
vor dem Bauen validiert. Ein Handoff erzeugt keine neuen Pflichtartefakte für
eine kleine Aufgabe.

## Handoff

Vier kompakte Teile genügen:

1. **Auftrag:** konkretes gewünschtes Ergebnis und erlaubter Umfang.
2. **Inputs:** absolute Pfade zum aktuellen Stand, zu Quellen und gültigen Belegen.
3. **Grenzen:** aktive Nutzerentscheidungen, erlaubte Schreibflächen und Abhängigkeiten.
4. **Rückgabe:** geänderte Artefakte, Prüfungen, offene Punkte und ehrlicher Status.

Beispiel: „Im bestehenden Anfrageformular den Serverfehler verständlich anzeigen
und Eingaben für Retry erhalten. Inputs: aktueller Auftrag, Formularcode und
kontrollierte 500-Fixture. Nur die benannten Formular-/Testdateien ändern.
Rückgabe: Patch und derselbe Fehlerfall nach dem Fix; Darstellung des Fehlers
prüfen. Keine neue Art Direction.“

Ein übernehmender Agent liest aktuelle Quellen und prüft Identität der Belege.
Er startet keinen zweiten Writer, nur weil die Beobachtung eines laufenden
Prozesses unterbrochen wurde. CLI-Wiederaufnahme und terminale Statuswerte
stehen im geltenden `orchestrate`-Adapter; fachliche Belegannahme in
`run-evidence-contract.md`.

Vor Übergabe oder Kontextwechsel müssen Schwierigkeiten und Auflösung,
versuchte/verworfene Optionen, aktuelle Nutzerentscheidungen einschließlich
jedem Nein, exakter Stand, offene Arbeit sowie relevante Namen/Zahlen/Links
erhalten sein. Eine verdichtete Erklärung ersetzt diese Fakten nicht.
