# raphael-skills

Können-Repo. Eine Sammlung, per Symlink oder explizitem externen Skill-Pfad in
Claude Code, Codex, Kimi Code und Hermes Agent verteilt — ein Skill-Bestand,
mehrere Laufzeiten. Quelle der Doktrin
ist `raphael-command-center/AGENTS.md`; dieses Repo liefert nur die Skills selbst.

## Struktur

```
raphael-skills/
├── index.json              # generiert: name, version, pfad, description je Skill
├── tools/
│   ├── validate-skill.py   # prueft SKILL.md-Frontmatter (Pflichtfelder)
│   └── build-index.py      # schreibt/prueft index.json aus allen SKILL.md
└── skills/
    ├── eigene/              # Raphaels eigene Skills fuer die Kundenarbeit
    │                         #   (Loops 1-4: onboard/web/ads/seo) + QueSkills
    │                         #   (copywriting, eval, orchestrate, handoff, report, offers)
    │                         #   + extract-approach ("skillify this")
    ├── design/             # eigener Top-Level-Ordner (nicht in eigene/), weil er
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

## Codex-Varianten installieren

Codex liest die persoenlichen Varianten aus `$HOME/.agents/skills`. Die meisten
Original-Skills unter `skills/` erhalten kleine Codex-Adapter. `web` ist die
bewusste Ausnahme: `skills/eigene/web/` ist ein portables Komplettpaket mit
eigenem `agents/openai.yaml`; `codex/skills/web` ist nur der relative
Repository-Bridge-Symlink `../../skills/eigene/web`. Der Modus
`canonical-link` erzeugt keine Datei, sondern prueft Bridge, Frontmatter,
Ressourcen und UI-Metadaten, ohne durch den Symlink zu schreiben.

```bash
# Source-Adapter bauen und alle 39 Varianten inklusive canonical-link pruefen
python3 tools/sync-codex-skills.py
python3 tools/sync-codex-skills.py --check

# Installation zuerst simulieren, dann ausfuehren
python3 tools/sync-codex-skills.py --install --dry-run
python3 tools/sync-codex-skills.py --install

# Registry, Trigger, Thread-Vertrag, Kimi→Sol und Installer testen
python3 tools/test-codex-skills.py
python3 tools/test-codex-thread-skills.py
python3 tools/test-kimi-sol-skill.py
python3 tools/test-codex-adapter-parity.py
python3 tools/test-codex-live-catalog.py
```

### Claude Code

Die 38 kanonischen Raphael-Sources sind bereits Claude-native; `kimi-sol`
besitzt eine eigene Claude-Variante. Der Installer verlinkt immer das ganze
Skill-Verzeichnis (inklusive References und Scripts), ueberschreibt keine
fremden Eintraege und folgt keinen Symlink-Komponenten im Zielpfad.

```bash
python3 tools/sync-claude-skills.py --check
python3 tools/sync-claude-skills.py --install --dry-run
python3 tools/sync-claude-skills.py --install
python3 tools/sync-claude-skills.py --verify-install
python3 tools/test-claude-skills.py
python3 tools/test-claude-live-catalog.py
```

Superpowers wird in Claude als offizielles Plugin installiert. gstack nutzt
einen separaten, auf den gepinnten Commit gebauten Claude-Clone und den
`gstack-*`-Namespace; so bleibt der gemeinsame Codex/Kimi-Vendor-Checkout
unveraendert und bestehende Claude-Skills werden nicht verdeckt.

Vier Orchestrierungs-Skills sind native Codex-Varianten:
`dynamic-workflow`, `orchestrate`, `sdd` und `ultra-loop`. Sie koordinieren
sichtbare, user-owned Codex-Tasks/Threads. `dynamic-workflow` startet keine
interne Agenten-Flotte. `kimi-sol` ist ein zusaetzlicher nativer,
fail-closed External-Review-Pfad; ein kostenpflichtiger Kimi-Aufruf braucht
jedes Mal eine frische ausdrueckliche Freigabe. 33 Source-Adapter lesen vor
der Arbeit ihre kanonische Source-SKILL.md vollstaendig; `web` wird als ein
byte-identisches kanonisches Paket geladen.

Der Installer verwaltet ausschliesslich die 39 Namen aus
`codex/compatibility.json`. Fremde Eintraege bleiben unberuehrt. Ein belegter
Pfad oder ein abweichender/beschaedigter Symlink unter demselben Namen ist ein
harter Konflikt: Der Lauf bricht ohne Teilinstallation ab; Laufzeitfehler
rollen nur die im aktuellen Lauf neu angelegten Links zurueck. Falls neue
Skills nach der Installation nicht sofort in der Codex-Seitenleiste erscheinen,
Codex einmal neu starten.

### Superpowers und gstack

Die beiden Upstream-Pakete bleiben getrennt von den kanonischen Raphael-
Sources und werden unveraendert ueber ihre Codex-Oberflaechen bereitgestellt:

- Superpowers ist als lokales Codex-Plugin `superpowers@superpowers-dev`
  aus dem gepinnten Checkout `/root/tools/vendor/superpowers` installiert.
  Version 6.1.1 liefert 14 bytegleiche Skills.
- gstack wird aus dem gepinnten Checkout mit dessen offiziellem Codex-
  Generator in einer Wegwerfkopie erzeugt. Die kompilierten Runtime-Artefakte
  werden mit dem gepinnten Lockfile im dauerhaft gepinnten Vendor-Checkout
  gebaut, damit eingebettete Laufzeitpfade gueltig bleiben. Der transaktionale Installer
  stellt 54 Skills bereit: den Root-Skill `gstack` plus 53 `gstack-*`-Skills.
  Runtime-Abhaengigkeiten werden ohne eingebettete Skill-Dokumente installiert,
  sodass auch rekursive Loader genau 54 eindeutige Identitaeten sehen. Alle
  Pfadkomponenten werden ohne Symlink-Following geoeffnet; Rollback entfernt
  nur Objekte, deren Inode und Ziel der Lauf selbst attestiert hat.
  Das breite Upstream-`./setup` wird absichtlich nicht ausgefuehrt, damit
  Browser-, Telemetrie-, Hook-, Migration- und Settings-Nebeneffekte
  ausbleiben.

```bash
# gstack nur simulieren, dann sicher installieren und pruefen
python3 tools/sync-codex-upstream-skills.py --dry-run
python3 tools/sync-codex-upstream-skills.py --apply
python3 tools/sync-codex-upstream-skills.py --check
python3 tools/test-codex-upstream-skills.py
```

Damit sind 39 Raphael-Varianten, 14 Superpowers-Skills und 54 gstack-Skills
verfuegbar: insgesamt 107 Codex-Skills aus diesen drei Bestaenden. Nach einer
Plugin- oder Skill-Pack-Erstinstallation Codex einmal neu starten, damit eine
bereits laufende Task ihre Skill-Liste neu laedt.

## Kimi-Code-Varianten installieren

Kimi Code 0.28.1 scannt User-Skills unter `$KIMI_CODE_HOME/skills` (standardmaessig
`$HOME/.kimi-code/skills`) vor dem gemeinsamen `$HOME/.agents/skills`-Bestand.
Die 39 Raphael-Namen bekommen deshalb eine Kimi-spezifische, hoeher priorisierte
Variante: 32 kleine Source-Adapter, das byte-identische kanonische `web`-Paket
ueber `kimi/skills/web -> ../../skills/eigene/web` und sechs native Kimi-Skills
(`dynamic-workflow`, `orchestrate`, `sdd`, `ultra-loop`, `kimi-first` und
`kimi-sol`). Die Source-Adapter lesen weiterhin die kanonische Source vollstaendig;
die nativen Varianten verwenden Kimis echte `TodoList`-, `Agent`-,
`AgentSwarm`- und `Skill`-Vertraege.

```bash
# Adapter bauen, offline pruefen und konfliktfrei installieren
python3 tools/sync-kimi-skills.py --build
python3 tools/sync-kimi-skills.py --check
python3 tools/test-kimi-skills.py
python3 tools/sync-kimi-skills.py --install --dry-run
python3 tools/sync-kimi-skills.py --install
```

Die sichtbare Kimi-`TodoList` enthaelt nur die vom Host erlaubten Felder
`title` und `status`. Resume-sichere DAG-, Agent-ID-, Gate- und Best-Effort-Daten
liegen atomar im jeweiligen Workspace unter `.kimi/workflows/<run-id>.json`.
Damit wird eine ausdrueckliche Best-Effort-Freigabe innerhalb desselben Runs
wiederverwendet, aber nie global auf spaetere Aufgaben uebertragen.

Superpowers ist ueber sein unveraendertes offizielles Kimi-Plugin installiert.
gstack besitzt in der gepinnten Upstream-Version keinen eigenen Kimi-Host;
Kimi nutzt deshalb den bereits attestierten gemeinsamen `.agents`-Bestand plus
einen separaten, no-clobber `gstack-upgrade`-Link. Ein zweiter attestierter
Link legt den unveraenderten Superpowers-Skill `writing-skills` in Kimis
hoeheren User-Scope, damit die gemeinsame Raphael-Variante ihn nicht verdeckt.
Der Bridge-Check veraendert keine Upstream-Skill-Datei und fuehrt weder das
breite gstack-Setup noch einen Modellaufruf aus.

```bash
# Einmalig im Kimi-TUI: /plugins install /root/tools/vendor/superpowers
# Danach Upstreams pruefen und nur den fehlenden gstack-upgrade-Link setzen
python3 tools/sync-kimi-upstream-skills.py --dry-run
python3 tools/sync-kimi-upstream-skills.py --apply
python3 tools/sync-kimi-upstream-skills.py --check
python3 tools/test-kimi-upstream-skills.py
```

Damit stehen auch Kimi 39 Raphael-Varianten, 14 Superpowers-Plugin-Skills und
54 gstack-Skills zur Verfuegung: dieselben 107 Eintraege aus den drei Bestaenden.
Die Raphael-Variante heisst in Kimi `raphael-writing-skills`; der unveraenderte
Superpowers-Skill behaelt `writing-skills`. So bleiben beide trotz Kimis
Namensprioritaet sichtbar. Nach Installation in einer laufenden Kimi-Session
`/reload` oder `/new` verwenden.

### Hermes Agent

Hermes bekommt keine Kopie und keinen vierten Adapter. In
`$HOME/.hermes/config.yaml` wird nur das kanonische Paket registriert:

```yaml
skills:
  external_dirs:
    - /root/raphael-skills/skills/eigene/web
```

So entdeckt Hermes genau einen `web`-Skill, waehrend References, Scripts und
Metadata aus demselben Verzeichnis wie in den anderen Laufzeiten kommen. Nach
einer Aenderung `/reload-skills` oder eine neue Session verwenden.

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
   `VENDORING.md` neben der Skill-Kopie (Referenzbeispiel: `skills/design/VENDORING.md`,
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
