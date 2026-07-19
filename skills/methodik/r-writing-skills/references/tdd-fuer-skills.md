# TDD für Skills (aus superpowers, kondensiert)

Für Skills, die eine Disziplin durchsetzen sollen (harte Gates, Verbote,
Regeln, die unter Zeit- oder Sunk-Cost-Druck gebrochen werden könnten) —
nicht für reine Referenz-Skills. Ergänzt die Kernregeln in SKILL.md.

## Grundidee

Skills sind Prozess-Dokumentation, nicht Prosa über eine einmalige Lösung.
Superpowers wendet TDD auf sie an: Testfall = Drucksituation mit einem
Subagenten, Produktionscode = die SKILL.md selbst.

| TDD-Begriff | Bei Skills |
|---|---|
| Test schreibt man zuerst | Drucksituation mit Subagent VOR der SKILL.md laufen lassen |
| Rot (Test schlägt fehl) | Agent verletzt die Regel ohne Skill — Baseline dokumentieren |
| Grün (Test besteht) | Agent hält die Regel mit Skill ein |
| Refactor | Neue Ausreden schließen, ohne die grüne Baseline zu brechen |

**Kein Skill ohne vorherigen Fehlschlag-Nachweis** — gilt für neue Skills
genauso wie für Änderungen an bestehenden. Wo diese Session keine
Subagent-Testinfrastruktur hat, ersetzt ein manueller Gegencheck ("würde
ein Agent das ohne diese Zeile übersehen?") die volle Pressure-Testrunde —
aber das ist eine bewusste Abschwächung, kein Ersatz mit gleicher Stärke.

## Form nach Fehlerart wählen

Die Form muss zur Art des Fehlschlags passen, sonst verschlimmert sie ihn:

| Beobachteter Fehlschlag | Richtige Form | Falsche Form |
|---|---|---|
| Regel wird unter Druck übersprungen (kennt sie, tut es trotzdem) | Verbot + Ausreden-Tabelle + Rote-Flaggen-Liste | weiche Formulierung ("bevorzugt...") |
| Regel wird befolgt, aber Ergebnis hat falsche Form | positives Rezept: was die Ausgabe IST, in Teilen/Reihenfolge | Verbotsliste ("nicht X") |
| Ein Pflichtelement fehlt in dem, was ohnehin produziert wird | strukturelles Pflichtfeld im Template | Prosa-Erinnerung in der Nähe |
| Verhalten soll von einer Bedingung abhängen | Bedingung an ein beobachtbares Merkmal knüpfen | unbedingte Regel + Ausnahmeklauseln |

Keine Nuance-Klauseln an ein funktionierendes Rezept anhängen ("... außer
wenn es wichtig ist") — das öffnet die Verhandlung wieder. Eine echte
Ausnahme bekommt ihre eigene, an ein beobachtbares Merkmal geknüpfte Regel.

## Ausreden-Tabelle und Rote Flaggen

Aus jeder Baseline-Testrunde die wörtlichen Ausreden sammeln und als
Tabelle in den Skill aufnehmen (Ausrede → Realität). Dazu eine kurze
"Rote Flaggen"-Liste zum Selbstcheck, wann eine Regel gerade umgangen wird.
Beispielmuster:

| Ausrede | Realität |
|---|---|
| "Ist doch offensichtlich klar" | Klar für den Autor ≠ klar für den nächsten Agenten |
| "Testen ist hier übertrieben" | Ungetestete Skills haben fast immer Lücken |
| "Ich teste, falls Probleme auftauchen" | Probleme heißen: Agent kann den Skill nicht anwenden — vorher testen |

## Beschreibungs-Regeln (Frontmatter)

- Beschreibung beginnt mit den Auslösebedingungen, nicht mit einer
  Ablaufzusammenfassung — sonst folgt der Agent der Kurzfassung und
  überspringt den eigentlichen Skill-Text.
- Konkrete Symptome/Schlüsselwörter statt abstrakter Umschreibung
  ("Race Condition", "flaky", nicht "Timing-Probleme").
- Dritte Person, technologieneutral, außer der Skill ist selbst
  technologiespezifisch — dann das explizit machen.

## Anti-Muster

- **Narrative Beispiele** ("in Session vom 3.10. haben wir..."): zu
  spezifisch, nicht übertragbar.
- **Mehrsprachige Dopplung** desselben Beispiels in mehreren Sprachen:
  Pflegeaufwand ohne Mehrwert — ein exzellentes Beispiel reicht.
- **Generische Labels** (Schritt1, Helper2): Bezeichner sollen inhaltlich
  tragen, nicht durchnummerieren.
- **Sedimentierung**: Schichten bleiben liegen, weil Hinzufügen sich sicher
  anfühlt und Löschen riskant. Ohne Aufräumdisziplin wächst jeder Skill so.

## Checkliste vor dem Ausliefern

- Drucksituation (manuell oder mit Subagent) durchgespielt, Ausreden
  dokumentiert.
- Jede gefundene Ausrede hat eine Gegenmaßnahme im Skilltext.
- Rote-Flaggen-Liste vorhanden, falls es sich um ein Disziplin-Skill
  handelt (harte Gates/Verbote).
- Beschreibung nennt nur Auslöser, keine Ablaufzusammenfassung.
- Kein narratives Beispiel, kein generisches Label.
