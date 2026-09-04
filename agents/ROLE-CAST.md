# Rolle ≠ Modell

Eine Rolle ist der Auftrag. Ein Modell ist die Besetzung. Diese Datei ist die
kanonische Casting-Policy für aktive Rollenquellen.

## Casting-Prinzipien

- Besetze nach Task-Fit, Abhängigkeiten, Risiko und Informationswert — nie nach
  einem festen Zwei- oder Dreier-Panel.
- Starte nur unabhängige, dependency-ready Arbeitspakete. Fan-out ist kein
  Selbstzweck.
- Parallele Schreiber brauchen disjunkte normalisierte `write_set`s. Geteilte
  Dateien, Lockfiles, generierte Indizes, globale Styles und Integration haben
  genau einen Owner.
- Ein Shared-UI-Artefakt hat genau einen als Integrator benannten Opus-Builder.
  Weitere Opus-Builder dürfen nur disjunkte Pakete bearbeiten.
- Reviewer werden nach verbleibendem Risiko und zusätzlichem Informationswert
  gewählt. Ein Builder prüft oder genehmigt nie die eigene Arbeit; unabhängige
  Prüfung kommt aus einer anderen Modellfamilie.
- Lane-Wrapper (`kimi-worker`, `grok-worker`, `luna-worker`, …) sind Transport,
  keine Rollen.

## Aktive Modellprofile

| Familie | Task-Fit | Harte Grenze |
|---|---|---|
| Luna | Mechanische Masse: Lesen, Parsen, Suchen, deterministische Listen, Tests und mechanische Bulk-Edits | Keine Produkt-, Look- oder offenen Qualitätsurteile |
| Opus | Frontend/UX, substanzielle Implementierung und Integration | Genau ein Shared-UI-Integrator; parallele Builder nur mit disjunkten `write_set`s; kein Self-Review |
| Grok | Schnelle, reversible, lokalisierte Fixes | Reproducer und deterministisches Gate erforderlich; visuelle Kritik ist ein separater read-only Auftrag am echten Artefakt |
| Sol | Tiefe Technik, Architektur, Security, Performance und unabhängige Prüfung fremder Arbeit | Prüft nie die eigene Implementierung |
| Kimi | tot (Raphael 03.09.2026) | keine `kimi-*`-agentTypes, kein Fallback |
| Fable | Controller; Builder-Leaf über `fable-builder` (Raphael 04.09.2026); read-only Advisor über `fable-advisor` | Frontend-Substanz, Integration, harte Fixes; effort high, max zwei parallel; nie Reviewer, nie Fallback-Worker, nie roher `model:`-Spawn |
| Haiku / Sonnet | — | Worker sind `BLOCKED`; Auftrag nicht ausführen |

## Rollen nach Task-Fit

| Rolle / Paket | Bevorzugtes Profil |
|---|---|
| `frontend`, `shared-ui-integrator` | Opus; pro geteiltem UI-Artefakt genau ein Integrator |
| substanzielle Implementierung | Opus mit begrenztem `write_set` |
| lokaler Quick-Fix | Grok mit Reproducer und deterministischem Gate |
| `visual-kritiker` | Grok als separater read-only Kritiker am gerenderten Artefakt |
| `architect`, `security`, `performance` | Sol für tiefe technische Analyse oder Implementierung |
| `reviewer` | Andere Familie als der Builder; Auswahl und Anzahl nach Risiko und Informationswert |
| `researcher`, große Kontextanalyse, Gegenposition | Kimi read-only |
| `explorer`, `triager`, deterministische QA/Tests, mechanischer `sweeper` | Luna, solange das Paket kein offenes Urteil verlangt |
| Ads, Copy, Skript, PM, Retro, Planungskritik, Prototyping | Nach konkretem Auftrag casten; kein festes Panel. Kimi darf read-only recherchieren oder gegenlesen, nicht als Code-/Frontend-Schreiber |

## Harte Grenzen

- Fable baut nur über `fable-builder` (max zwei parallel) und berät read-only
  über `fable-advisor`; nie Reviewer, nie Fallback-Worker, nie roher `model:`-Spawn.
- `haiku-worker` und `sonnet-worker` sind stillgelegt und melden `BLOCKED`.
- Kimi schreibt keinen Frontend- oder Produktivcode.
- Luna übernimmt Masse, nicht Look-, Produkt- oder Qualitätsurteile.
- Grok-Visualkritik bleibt read-only und getrennt vom Builder-Auftrag.
- Kein Self-Review und keine Eigenfreigabe, unabhängig von Rolle oder Familie.
