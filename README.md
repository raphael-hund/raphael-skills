# raphael-skills

Können-Repo. Eine Sammlung, per Symlink in alle Harnesses (4× Claude-Profile,
Codex, Kimi) verteilt — ein Skill-Bestand, mehrere Cockpits. Quelle der Doktrin
ist `raphael-command-center/AGENTS.md`; dieses Repo liefert nur die Skills selbst.

## Struktur

```
raphael-skills/
├── index.json              # generiert: name, version, pfad, description je Skill
├── tools/
│   ├── validate-skill.py   # prueft SKILL.md-Frontmatter (Pflichtfelder)
│   └── build-index.py      # schreibt/prueft index.json aus allen SKILL.md
└── skills/
    ├── eigene/              # Raphaels eigene r-*-Skills fuer die Kundenarbeit
    │                         #   (Loops 1-4: onboard/web/ads/seo) + Quer-Skills
    │                         #   (copywriting, eval, orchestrate, handoff, report, offers)
    │                         #   + extract-approach ("skillify this")
    ├── r-design/             # eigener Top-Level-Ordner (nicht in eigene/), weil er
    │                         #   ein vendorter Fusion-Skill mit eigenem scripts/+vendor/
    │                         #   Payload ist (impeccable + taste + ui-ux-pro-max)
    ├── imported/             # Platzhalter fuer vendorte Fremd-Skills (noch leer)
    ├── methodik/             # Platzhalter fuer ein Methodik-Framework (noch leer)
    ├── ops/                  # Platzhalter fuer Server-/Agenten-Betriebs-Skills (noch leer)
    ├── agents/               # Platzhalter fuer wiederverwendbare Subagenten-Rollen (noch leer)
    └── _candidates/          # Skill-Kandidaten aus extract-approach, NICHT aktiv
```

Jeder Platzhalter-Ordner hat eine eigene `README.md`, die seinen Zweck erklaert —
er bleibt bewusst leer, bis echter Bedarf da ist (Regel 10: "Erst Schmerz, dann
Werkzeug").

## r-Namespace

Alle eigenen Skills tragen das Praefix `r-` (Ausnahme: `extract-approach`, siehe
Masterplan Kap. 6.2 — bewusst ohne Praefix, da es ein Meta-/Tooling-Skill ist,
kein fachlicher). Der `r-`-Namespace hat zwei Jobs:

1. **Eindeutigkeit** — kein Kollisionsrisiko mit vendorten Fremd-Skills.
2. **Sichtbarkeit** — an jedem Skill-Aufruf sofort erkennbar: "das ist unserer",
   nicht ein unveraendertes Fremd-Skript.

Jede `SKILL.md` traegt ein Pflicht-Frontmatter mit mindestens `name`, `version`
(semver), `description` (WANN feuert der Skill) und `completion_criteria`
(pruefbare Fertig-Tatsachen, kein Selbst-Attest). Empfohlen, nicht Pflicht:
`class` (R/M/F/O/E/W/G), `scope` (global/agency/client:<slug>/project:<slug>),
`sensitivity` (public/internal/client-confidential/secret), `loads`,
`requires_skills`. `tools/validate-skill.py` prueft die vier Pflichtfelder
maschinell und laesst als Lint-Warnung u. a. reasoning-extraction-Trigger-Phrasen
("explain your thinking" etc., Regel 19 / Fable-Gotcha) durchklingeln.

Seit 2026-07-19 gilt zusaetzlich (Details: `SKILL-VERTRAG.md` Abschnitte 7-9):
`## Gotchas` ist **Pflichtsektion** — bei Neu-Skills sofort, bei Bestandsskills
bei der naechsten Beruehrung (kein Big-Bang-Umschreiben). Skills mit Eingaben
deklarieren ihre Parameter als Aufruf-Signatur (Method-Call-Konvention).
Kandidaten in `skills/_candidates/` duerfen `confidence`/`evidence`/`seen_in`
tragen; ein Promotion-Vorschlag an Raphael geht erst ab confidence >= 0.7 raus.

## Vendoring-Politik

Fremd-Skills werden nie live nachgeladen (kein Marketplace, kein Auto-Update).
Stattdessen:

1. **Vorher lesen** — kein Skill wird blind uebernommen.
2. **Fork/Kopie, auf einen Commit-Hash gepinnt** — der Hash steht in einer
   `VENDORING.md` neben der Skill-Kopie (Referenzbeispiel: `skills/r-design/VENDORING.md`,
   dort dokumentiert als Fusion aus drei Fremd-Quellen mit Commit-Tabelle,
   Lizenz-Spalte und bewusst entfernten Bezahl-/Netzwerk-Abhaengigkeiten).
3. **Umbenennen in den `r-`-Namespace** — verhindert Namenskollisionen und
   macht Herkunft sofort sichtbar.
4. **SessionStart-Hooks entschaerfen, Telemetrie hart aus** — genau ein aktiver
   SessionStart-Hook je Harness, keine stillen Netzaufrufe.
5. **Keine Paid-/Key-pflichtigen Unterfunktionen mitziehen** (z. B. Bildmodell-
   Aufrufe) — nur der Offline-/Keyless-Kern wird vendored.
6. **Nie direkt als aktiver Skill** — neue oder veraenderte Skills sind laut
   Doktrin eine Rot-Klasse (Skill-Mutation) und laufen ueber
   `raphael-command-center/ops/review-inbox.md` mit Raphaels Signatur.

## index.json pflegen

Nach jeder Skill-Aenderung: `python3 tools/build-index.py` neu laufen lassen
(schreibt `index.json`), davor `python3 tools/validate-skill.py` — der
Index-Builder bricht ohnehin ab, wenn eine SKILL.md ungueltig ist.
