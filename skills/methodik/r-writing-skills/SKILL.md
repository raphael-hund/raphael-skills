---
name: r-writing-skills
version: 0.1.0
description: >
  Beschreibt, wie in diesem Repo neue r-*-Skills geschrieben werden:
  Vorhersagbarkeit als Leitprinzip, Informationshierarchie (Frontmatter →
  SKILL.md-Schritte → references/), unser Pflicht-Frontmatter-Schema und
  wann validate-skill.py grün sein muss. Ergänzt um die TDD-Testdisziplin
  aus superpowers für Skills, die unter Druck befolgt werden müssen.
  Trigger: "neuen Skill schreiben", "SKILL.md anlegen", "Skill überarbeiten",
  "r-Skill erstellen", "Frontmatter-Schema".
class: M
scope: agency
sensitivity: internal
source: fusion — mattpocock skills/productivity/writing-great-skills @ 9603c1cc + superpowers skills/writing-skills @ d884ae04
loads:
  - references/tdd-fuer-skills.md
completion_criteria:
  - "SKILL.md hat gültiges Frontmatter mit name, version, description (endet auf Trigger-Zeile), class, scope, sensitivity, completion_criteria als Liste"
  - "python3 tools/validate-skill.py <pfad-zum-skill> läuft mit [OK] durch, ohne verbotene Phrasen"
  - "Jeder Schritt/jede Regel hat ein prüfbares Kriterium (checkbar: erfüllt vs. nicht erfüllt), keine vagen Formulierungen wie 'gründlich prüfen'"
---

# r-writing-skills — Neue r-*-Skills schreiben

**Zweck (1 Satz):** Vorhersagbarkeit erzeugen — derselbe Agent nimmt bei
jedem Lauf denselben *Weg*, nicht zwingend dieselbe Ausgabe. Jede Regel
unten dient nur diesem einen Ziel.

## Herkunft & Entscheidung

**Basis:** mattpocock `writing-great-skills`. Begründung: liefert die
präziseren, direkt übertragbaren Begriffe (Informationshierarchie,
Completion-Criterion, Invocation-Kosten) — deckt sich fast 1:1 mit unserem
bereits bestehenden `completion_criteria`-Feld im Frontmatter-Schema. Die
schwere superpowers-Maschinerie (Subagent-Pressure-Testing, verpflichtendes
RED-GREEN-REFACTOR, eigenes `test-driven-development`-Vorwissen) passt nicht
zu unserem leichtgewichtigen, prosa-basierten Skill-Format, das über
`validate-skill.py` statt über Subagent-Testläufe geprüft wird.

**Eingearbeitet:** superpowers' Testdisziplin (RED-GREEN-REFACTOR für
Skills, Rationalisierungs-Tabellen, Rote-Flaggen-Listen, Beschreibungs-Regeln
"Use when..." ohne Workflow-Zusammenfassung) ist wertvoll für Skills, die
unter Druck befolgt werden müssen (harte Gates, Verbote) — kondensiert in
`references/tdd-fuer-skills.md`.

## Frontmatter-Schema (Pflicht für jeden r-*-Skill)

```yaml
---
name: r-<name>          # ^[a-z][a-z0-9-]*$
version: 0.1.0           # semver x.y.z
description: >
  Ein Absatz: was der Skill tut / wann er greift. Endet mit:
  Trigger: "wort1", "wort2", "wort3".
class: M                 # Klassifikation nach Repo-Konvention
scope: agency
sensitivity: internal
source: ...               # Herkunft (vendored/fusion, mit Commit)
loads:
  - references/<datei>.md # nur falls references/ existiert
completion_criteria:
  - "prüfbares Kriterium 1"
  - "prüfbares Kriterium 2"
---
```

`name`, `version`, `description`, `completion_criteria` sind Pflichtfelder —
ohne sie oder mit leerem Inhalt schlägt der Validator fehl. `version` muss
Semver sein, `name` nur Kleinbuchstaben/Ziffern/Bindestrich.

## Informationshierarchie — was gehört wohin

Drei Ebenen, sortiert danach, wie sofort der Agent es braucht:

1. **Schritt in SKILL.md** — geordnete Handlung, die wichtigste Ebene: was
   der Agent tut, in Reihenfolge. Jeder Schritt endet an einem prüfbaren
   Kriterium (fertig vs. nicht fertig erkennbar) — vage Kriterien laden zu
   verfrühtem Abschluss ein.
2. **Referenz in SKILL.md** — Regel/Fakt, der bei Bedarf nachgeschlagen
   wird, direkt im Fließtext.
3. **Externe Referenz** — zu groß für SKILL.md, ausgelagert nach
   `references/<datei>.md`, über `loads:` im Frontmatter referenziert. Nur
   laden, was der jeweilige Zweig tatsächlich braucht.

Kondensieren, bis SKILL.md 60–120 Zeilen hat. Alles, was nur ein Teilpfad
braucht, gehört nach `references/`, nicht in den Hauptpfad.

## Regeln beim Schreiben

- **Beschreibung = Auslöser, nicht Ablauf.** Beginnt mit "Trigger:" plus
  konkreten Schlüsselwörtern. Keine Workflow-Zusammenfassung in der
  Beschreibung — sonst folgt der Agent der Kurzfassung statt der SKILL.md.
- **Ein Bedeutungsort.** Dieselbe Regel nie an zwei Stellen — Änderung wäre
  sonst ein Mehrfach-Edit und Quellen laufen auseinander.
- **Kein No-op.** Jede Zeile muss Verhalten ändern gegenüber dem, was der
  Agent ohnehin täte. Sätze, die nichts Neues verlangen, streichen.
- **Positiv formulieren.** Zielverhalten benennen statt nur zu verbieten —
  ein Verbot ohne Alternative lässt das Verbotene im Kopf des Agenten
  präsent statt es zu verdrängen. Harte Verbote nur, wo eine positive
  Formulierung wirklich nicht reicht.
- **Prüfbare Kriterien.** Jedes `completion_criteria`-Element muss ein
  Verifier (Mensch oder Skript) als erfüllt/nicht erfüllt einstufen können —
  Verifier-Anweisungen als pass/fail mit eingefügtem Beweis formulieren,
  nie als "erkläre, wie du vorgegangen bist" (Refusal-Risiko bei manchen
  Modellen, siehe validate-skill.py-Phrasenliste). Ein exzellentes Beispiel
  reicht, statt mehrerer mittelmäßiger.

## Ablauf

1. Zweck in einem Satz festlegen, Frontmatter nach obigem Schema ausfüllen
   (inkl. `source:`-Herkunft).
2. Kern in SKILL.md schreiben: Zweck, harte Gates falls nötig, Ablauf, rote
   Linien — Zielgröße 60–120 Zeilen.
3. Zweigspezifisches nach `references/<datei>.md` auslagern, per `loads:`
   verlinken.
4. Auf verbotene Phrasen prüfen (Liste in `references/tdd-fuer-skills.md`).
5. `python3 tools/validate-skill.py <pfad>` laufen lassen — muss `[OK]`
   zeigen, sonst Frontmatter/Kriterien nachbessern.

## Rote Linien

- Kein Skill ohne `completion_criteria` als prüfbare Liste.
- Keine repo-fremde Automatisierung (SessionStart-Hooks, Auto-Update,
  Plugin-Marketplace-Mechanik) aus Quell-Repos übernehmen — dieses Repo hat
  keine solche Infrastruktur.
- Kein Fremdcode-Skript aus einer Quelle kopieren — nur kondensierte Prosa
  in `references/`.
