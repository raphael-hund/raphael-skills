# impeccable Kommandos (deutsch, Kurz-Referenz)

> Quelle: `SKILL.md` + `reference/*.md` aus pbakaus/impeccable v4.0.1 @ bdaa5a4
> (Apache-2.0). Jede Zeile: Kommando — was es tut — wann es feuert.
> **Hinweis:** Die Originale erwarten teilweise die impeccable-CLI (`npx
> impeccable …`). Hier gelten sie als Arbeitsanweisungen; die deterministische
> QA läuft über `node scripts/detect.mjs` im design-Skill.

## Bauen

| Kommando | Was es tut | Wann |
|---|---|---|
| `craft [feature]` | Voller Shape-then-Build-Prozess mit visueller Iteration | Neue Fläche oder kompletter Ersatz |
| `init` | Einmal-Setup: Design-Kontext erfassen (hier: an web/design delegieren) | Projektstart, kein DESIGN.md vorhanden |
| `shape [feature]` | UX/UI planen bevor Code geschrieben wird | Vor jedem größeren Build |
| `document` | DESIGN.md aus bestehendem Projekt-Code generieren | Bestandsprojekt ohne Design-Doku |
| `extract [target]` | Wiederverwendbare Tokens/Komponenten ins System ziehen | Nach erfolgreichem Build, vor dem Nächsten |

## Bewerten

| Kommando | Was es tut | Wann |
|---|---|---|
| `critique [target]` | UX-Design-Review: Hierarchie, Klarheit, emotionale Resonanz. Zwei isolierte Assessments (Design + Detektor/Browser) | Vor Launch, bei "gefällt mir nicht" |
| `audit [target]` | Technische Qualität: A11y, Performance, Responsive, semantisches HTML | Vor Launch, bei "funktioniert nicht richtig" |

## Verfeinern

| Kommando | Was es tut | Wann |
|---|---|---|
| `polish [target]` | Letzter Schliff, Design-System-Alignment, Ship-Bereitschaft. **Nie verdecktes Redesign.** | Vor Auslieferung |
| `bolder [target]` | Sichere/blasse Designs verstärken | "Das ist langweilig" |
| `quieter [target]` | Überladene/aggressive Designs beruhigen | "Das ist zu viel" |
| `distill [target]` | Auf Essenz reduzieren, Komplexität entfernen | "Das ist überladen" |
| `harden [target]` | Produktionsreif: Fehlerfälle, i18n, Text-Overflow, Edge-Cases | Nach Build, vor Launch |
| `onboard [target]` | First-Run-Flows, Empty-States, Aktivierungspfade | Bei Produkt-UI mit Nutzer-Onboarding |

## Verbessern

| Kommando | Was es tut | Wann |
|---|---|---|
| `animate [target]` | Motion mit Absicht hinzufügen (nicht dekorativ) | "Es fühlt sich statisch an" |
| `colorize [target]` | Strategische Farbe in monochrome UIs bringen | "Alles ist grau" |
| `typeset [target]` | Font-Wahl, Hierarchie, Sizing fixen | "Die Typo stimmt nicht" |
| `layout [target]` | Spacing, Rhythmus, visuelle Hierarchie fixen | "Es sieht unruhig/falsch aus" |
| `delight [target]` | Persönlichkeit und memorable Momente hinzufügen | "Es ist korrekt, aber seelenlos" |
| `overdrive [target]` | Technisch außergewöhnliche Effekte (WebGL, Canvas, etc.) | "Es soll wow sein" |

## Reparieren

| Kommando | Was es tut | Wann |
|---|---|---|
| `clarify [target]` | UX-Copy, Labels, Fehlermeldungen verbessern | "Das versteht keiner" |
| `adapt [target]` | Für Devices/Breakpoints anpassen | "Auf Mobile kaputt" |
| `optimize [target]` | UI-Performance diagnostizieren und fixen | "Es ruckelt/lädt langsam" |

## Iterieren

| Kommando | Was es tut | Wann |
|---|---|---|
| `live` | Visueller Variantenmodus: Elemente im Browser picken, Alternativen generieren | Nur wenn impeccable-CLI verfügbar; sonst manuell iterieren |

## Routing

- **Kein Kommando erkannt:** Als allgemeine Design-Arbeit behandeln. Register +
  Modus benennen, `craft`-Logik folgen.
- **Zwei Kommandos passen:** Einmal fragen, dann das gewählte laden.
- **`craft` ist veraltet** — bei normaler neuer Arbeit `shape` + `new-work`
  verwenden (hier: `shape` + design-Doktrin).
