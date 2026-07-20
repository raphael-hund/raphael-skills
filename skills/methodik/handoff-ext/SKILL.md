---
name: handoff-ext
version: 0.1.0
description: >
  Verdichtet das laufende Gespräch zu einem kompakten Übergabe-Dokument für
  eine andere Instanz, einen Subagenten oder eine externe Person, die
  weiterarbeiten soll — mit Redaktion sensibler Daten und Verweis statt
  Duplikat auf bestehende Artefakte. Trigger: "Handoff für einen anderen
  Agenten", "an Subagenten übergeben", "externe Übergabe", "handoff-ext".
class: M
scope: agency
sensitivity: internal
source: vendored from mattpocock/skills skills/productivity/handoff @ 9603c1cc
completion_criteria:
  - "Dokument verweist auf bestehende Artefakte (Spec/Plan/ADR/Issue/Commit/Diff) statt sie zu duplizieren"
  - "Keine Geheimnisse/Zugangsdaten/personenbezogenen Daten im Dokument (Redaktion geprüft)"
  - "Dokument liegt außerhalb des Workspace (OS-Temp-Verzeichnis), nicht im Repo committet"
---

# handoff-ext — Übergabe an eine andere Instanz

**Abgrenzung zu handoff:** `handoff` ist unser eigenes Session-Ritual
(PROGRESS.md/DECISIONS.md, Commit+Push, hartes `/clear`) für die eigene nächste Session im
selben Repo. `handoff-ext` deckt den Fall ab, dass **eine andere Instanz** weitermacht —
ein Subagent, ein anderes Werkzeug/Modell, oder eine externe Person (Kollege, Kunde,
Freelancer) ohne Zugriff auf unser Git-Ritual. Für den eigenen Session-Übergang zuerst
`handoff` prüfen.

## Zweck (1 Satz)

Das laufende Gespräch so zu einem eigenständigen, redigierten Dokument verdichten, dass eine
fremde Instanz ohne Rückfragen anschließen kann.

## Wann

- Übergabe an einen Subagenten mit eigenem, begrenztem Kontext.
- Übergabe an eine externe Person (Kollege ohne Zugriff auf unser Repo-Ritual, Kunde,
  Freelancer).
- Wechsel auf ein anderes Werkzeug/Modell, das PROGRESS.md/DECISIONS.md nicht kennt.

## Ablauf

1. Gespräch zusammenfassen: Ziel, Stand, offene Fragen, nächster konkreter Schritt.
2. **Nicht duplizieren** — was bereits in Specs, Plänen, ADRs, Issues, Commits oder Diffs
   steht, wird per Pfad/URL referenziert, nicht erneut ausgeschrieben.
3. Abschnitt "Empfohlene nächste Skills" ergänzen — welche Skills die aufnehmende Instanz
   sinnvollerweise aufruft.
4. Wenn Argumente übergeben wurden (Fokus der nächsten Session), das Dokument darauf
   zuschneiden.
5. **Redaktion** — API-Keys, Passwörter, personenbezogene Daten konsequent entfernen, bevor
   das Dokument irgendwo landet, an das eine fremde Instanz Zugriff hat.
6. Ablage im OS-Temp-Verzeichnis, nicht im Workspace/Repo — das Dokument ist eine Übergabe,
   kein Projekt-Artefakt.

## Gotchas

- Verwechslung mit handoff vermeiden: hier kein Commit/Push-Zwang, kein PROGRESS.md — das
  Dokument selbst ist die Übergabe.
- Ungeprüfte Redaktion ist ein Leck, kein Detail — Geheimnisse/PII vor Ablage aktiv suchen,
  nicht nur hoffen, dass keine drin sind.
- Referenz statt Kopie hält Dokument und Quelle synchron — eine Kopie veraltet sofort.
- Externe Empfänger kennen unsere internen Pfade/Konventionen nicht — das Dokument muss für
  sich allein verständlich sein.
