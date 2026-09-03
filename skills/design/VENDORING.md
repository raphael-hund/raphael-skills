# design — VENDORING

Dieser Skill ist eine **Fusion** aus drei Upstream-Skills. Diese Datei dokumentiert
Herkunft, Commits und getroffene Entscheidungen. Die Erstuebernahme lief am
**2026-07-19** aus den unter `/root/tools/vendor/` liegenden `--depth 1`-Klonen.
Spaetere Runden stehen weiter unten und ersetzen die Angaben oben, wo sie sie
beruehren: **B.7** der impeccable-Re-Sync auf v4.0.5 (02.09.2026), **B.8** der
Ideen-Merge aus frontend-design ohne Vendoring (02.09.2026).

---

## Abschnitt A — Aufbau des fusionierten Skills

```
design/
  SKILL.md                          # Router (<150 Zeilen): Register-Wahl + finale QA
  VENDORING.md                      # diese Datei
  references/
    design-doktrin.md               # fusionierte Regeln, dedupliziert, Herkunfts-Tags
    impeccable-detektoren.md        # deterministische QA als ausfuehrbare Liste
    ui-ux-db-nutzung.md             # Offline-DB abfragen (Gemini/Paid entfernt)
    taste-kern.md                   # Landing-Kern/Checklisten (imagegen entfernt)
  scripts/                          # impeccable-Detektor-Kern (vendored, lauffaehig)
    detect.mjs
    detector/**                     # 20 Dateien, self-contained (59 Regeln in registry/antipatterns.mjs)
    lib/**                          # von cli/main.mjs benoetigte Helfer
  vendor/ui-ux-db/                  # ui-ux-pro-max Offline-DB (vendored, lauffaehig)
    scripts/{search,core,design_system}.py
    data/**                         # CSV-Wissensbasis + data/stacks/**
    references/{quick-reference,pro-rules}.md
```

**Router-Logik:** Landing/Portfolio/Editorial -> taste-Linie · App/Dashboard/Tool ->
ui-ux-Linie · finale QA IMMER ueber die impeccable-Detektoren (Exit 0) + Handrubrik.

---

## Abschnitt B — Herkunft, Commits, Entscheidungen

### B.1 Quellen (Commits zum Uebernahme-Zeitpunkt)

| Quelle | Rolle in design | Upstream | Commit | Lizenz |
|---|---|---|---|---|
| **impeccable** v4.0.5 | Doktrin-Basis + **deterministische Detektoren** (finale QA) | github.com/pbakaus/impeccable | kein Commit-SHA belegbar (die Quelle `/root/.agents/skills/impeccable` hat kein `.git`) — Anker ist die Skill-Version **4.0.5** (`SKILL.md:7`). Vorstaende: v3.9.1 @ `51b470f` (2026-07-20), dann v4.0.1 @ `bdaa5a4`. Re-Sync auf 4.0.5 am **2026-09-02**, siehe B.7 | Apache-2.0 |
| **taste-skill** (design-taste-frontend) | **taste-Linie** (Landing/Portfolio) | github.com/Leonxlnx/taste-skill | `7c397f22d3af6f2b3f1925eb147d8e8801086151` (2026-07-17) | MIT |
| **ui-ux-pro-max** v2.11.0 | **ui-ux-Linie** (App/Dashboard) — nur Offline-DB | github.com/nextlevelbuilder/ui-ux-pro-max-skill | `5c0946f66120079258e1efc8e436d78ec793877c` (2026-07-20; abgeglichen 2026-07-21, Diff seit f8ac5e1 betrifft nur `stack/`-Starterkit + Stat-Fix in skill.json/marketplace.json — vendorierter Pfad `.claude/skills/ui-ux-pro-max/` unveraendert) | MIT |

Uebernommene Upstream-Pfade:
- impeccable: `.claude/skills/impeccable/SKILL.md` + `scripts/{detect.mjs,detector/,lib/}`
- taste: `skills/taste-skill/SKILL.md`
- ui-ux: `.claude/skills/ui-ux-pro-max/{SKILL.md,scripts/,data/,references/}`

### B.2 Was ENTFERNT wurde (und warum)

- **ui-ux "design"-Sub-Skill komplett** (Logo 55 Stile, CIP 50 Deliverables, Icon,
  Banner, Social-Photos). Grund: haengt an `GEMINI_API_KEY` / Gemini Nano-Banana /
  Gemini 3.x = **bezahlt + online**. Auftrag verlangt "GEMINI-/Paid-Teile ENTFERNT".
  Nur die **Offline-DB** (`search.py`, BM25, reine Stdlib, kein Netz) ist vendored.
- **taste imagegen-Pflicht** (Section 4.8: "Image-Generation-Tool zuerst, MUSS
  `generate_image`/MCP-Bildtool nutzen"; die `imagegen-frontend-*`-Sub-Skills). Grund:
  Auftrag verlangt "imagegen-Teile ENTFERNT". Ersetzt durch reale Bildquellen
  (picsum-seed) + markierte Slots (`taste-kern.md` §6).
- **impeccable Setup-/Betriebs-Flow** (context.mjs-Kontexterfassung, PRODUCT.md-Pflicht,
  `live`-Browser-Variantenmodus, `pin`/`hooks`, alle Register-/Command-Referenzen).
  Grund: design nutzt bewusst nur den **Detektor-Kern** deterministisch; der volle
  impeccable-Command-Router ist nicht Teil dieses Skills. Die Doktrin-Inhalte der
  General-Rules wurden dedupliziert in `design-doktrin.md` uebernommen.

### B.3 Entschiedene Quellen-Konflikte

| Thema | Konflikt | Entscheidung | Ort |
|---|---|---|---|
| **Em-Dash** | taste: `—` komplett verboten in sichtbarem Text · impeccable: Detektor `em-dash-overuse` flaggt nur Uebernutzung | **taste gewinnt** — null Em-Dash im Output; Detektor ist nur weicher Backstop | doktrin §6, SKILL gotchas |
| **Cards** | ui-ux-DB empfiehlt KPI-/Datenkarten (Dashboards) · taste+impeccable: "Cards sind die faule Antwort", 3 gleiche Cards verboten | **registerabhaengig**: App/product = Cards ok, Landing/brand = vermeiden. Verschachtelte Cards **immer** verboten | doktrin §4 |
| **Letter-Spacing** | taste-Default `tracking-tighter` (-0.05em) · impeccable Floor -0.04em (Detektor `extreme-negative-tracking`) | **impeccable gewinnt** — Floor -0.04em; taste "tighter" auf `tracking-tight` (-0.025em) begrenzt | doktrin §1 |
| **Serif** | taste: Serif sehr discouraged als Default, Fraunces/Instrument_Serif verboten · impeccable brand-Register erlaubt editorial-Serif | **taste-Strenge** als Default; Serif nur wenn Aesthetik echt editorial/luxury UND begruendet | doktrin §1 |
| **Inter** | taste: discouraged als Default · impeccable: Detektor `overused-font` flaggt Inter | **einig** — Inter nicht als Default; Override fuer neutral/Linear/Public-Sector | doktrin §1 |
| **Icons/Lucide** | taste: Lucide discouraged (Phosphor/HugeIcons/Radix/Tabler) · ui-ux-DB: listet Lucide gleichwertig | **taste gewinnt** — Lucide nur auf expliziten Wunsch | doktrin §4 |
| **Cream/Beige** | impeccable: Cream-Band verboten (`cream-palette`) · taste: Premium-Consumer beige+brass verboten | **einig** — verstaerkt uebernommen | doktrin §2 |
| **Dials** | taste 3 Dials (VARIANCE/MOTION/DENSITY) · ui-ux `--variance/--motion/--density` | **vereinheitlicht** — dieselben Dials, an DB durchreichbar | taste-kern §3, ui-ux-db §2c |

### B.4 Lauffaehigkeit verifiziert (2026-07-19)

- `node scripts/detect.mjs <clean.html>` -> **Exit 0**; `<slop.html>` -> **Exit 2**
  (Funde: `side-tab`, `gradient-text`); `--json` + Multi-File + `.jsx`-Regex-Modus ok.
- `python3 vendor/ui-ux-db/scripts/search.py "<q>" --domain <style|color>` liefert
  Treffer offline (BM25, keine Netz-Imports).
- Keine externen Laufzeit-Abhaengigkeiten: Detektor = Node-Stdlib (kein npx/Netz),
  DB = Python-Stdlib (kein pip). Beide aus dem Skill-Verzeichnis heraus getestet.

### B.5 Lizenz-Hinweise

Alle drei Quellen sind permissiv (Apache-2.0 / MIT) und erlauben Vendoring mit
Namensnennung. Beim Weiterverteilen des vendorierten impeccable-Detektors gilt die
Apache-2.0-Attribution (Copyright (c) 2026 Paul Bakaus, SPDX Apache-2.0 — Header in
`scripts/detector/detect-antipatterns.mjs`). ui-ux-DB und taste stehen unter MIT
(Copyright (c) 2024 Next Level Builder bzw. (c) 2026 Leonxlnx).

### B.6 Update-Pfad (kuenftig)

1. Upstream in `/root/tools/vendor/<quelle>` mit `git pull` aktualisieren, neuen
   Commit hier in B.1 eintragen.
2. Detektor-Kern neu kopieren: `scripts/{detect.mjs,detector/,lib/}` aus impeccable.
3. DB neu kopieren: `vendor/ui-ux-db/{scripts,data,references}` aus ui-ux-pro-max.
4. `design-doktrin.md`/`taste-kern.md` gegen neue Upstream-Regeln diffen, Konflikte
   in B.3 nachfuehren.
5. Lauffaehigkeit wie B.4 gegenpruefen (Exit 0 auf clean, Exit 2 auf slop).
6. Beide Detektor-Evals fahren (`evals/run-detect-check.mjs`,
   `evals/run-browser-detect-check.mjs`) und danach `evals/run-doku-zahlen.mjs`:
   ein Sync verschiebt Regelzahlen, und die Zahlen in SKILL.md haengen daran.

---

## Abschnitt B.7 — impeccable-Detektor-Kern, Re-Sync 02.09.2026

- **Quelle:** `pbakaus/impeccable`, Skill-Version **4.0.5**
  (`/root/.agents/skills/impeccable/SKILL.md:7`), Lizenz **Apache-2.0**
  (SPDX-Header in `scripts/detector/detect-antipatterns.mjs:1-6`,
  `Copyright (c) 2026 Paul Bakaus`). Kein `.git` in der Quelle vorhanden, daher
  kein Commit-SHA belegbar; die Versionsnummer ist der Anker.
  Vorheriger vendorter Stand: v4.0.1 @ `bdaa5a4`.
- **Datum des Abgleichs:** 02.09.2026.
- **Umfang:** alle 20 Dateien unter `scripts/detector/**` auf den Stand v4.0.5
  gebracht; dazu `references/impeccable-detektoren.md` und
  `references/craft-floor-de.md` nachgezogen.
- **Regelzahl:** **59** Anti-Pattern-Regeln in `registry/antipatterns.mjs`
  (vorher 46), davon **47** im Browser-Pfad (`rules/checks.mjs`). 14 neue
  Regeln: `blinking-cursor`, `content-hidden-at-rest`, `edge-flush-cards`,
  `first-viewport-column-overflow`, `heading-rhythm`, `kicker-above-heading`,
  `marquee`, `pulsing-dot`, `radial-halo`, `radial-spotlight-glow`,
  `script-error`, `shape-assembled-illustration`, `text-occlusion`,
  `undersized-ui-text`. Entfallen: `single-font` (im Original am 29.07.2026
  ersatzlos gestrichen, mit Datum im Code belegt:
  `engines/regex/detect-text.mjs:1069`). Zwei lokale Umbenennungen auf die
  Original-IDs zurueckgezogen: `numbered-section-markers` →
  `numbered-section-labels`, `repeated-section-kickers` →
  `repeated-container-text`. Achtung, keine reine Umbenennung:
  `repeated-container-text` prueft Wiederholung **innerhalb eines Containers**;
  die Kicker-Sache uebernimmt im Original das neue `kicker-above-heading`.
- **Nicht uebernommen** (unveraendert gegenueber B.2): `context.mjs`,
  `concept-seed.mjs`, `hook*.mjs`, `live/**`, `generate-image.mjs`, die
  `agents/*.toml`. Damit bleibt der vendorte Baum frei von Netzzugriff,
  Telemetrie und Auto-Update — geprueft per grep auf `scripts/detector/**`:
  kein `eval`/`new Function`, keine Telemetrie-Endpunkte, und als einziger
  Netzaufruf eine auf `127.0.0.1`/`localhost` gebundene Dev-Server-Probe mit
  Timeout (`node/file-system.mjs:177,189`).
- **Lokale Aenderungen am uebernommenen Code** (jeweils mit
  `AENDERUNG GEGENUEBER DEM ORIGINAL`-Kommentar und Datum an Ort):
  1. `cli/main.mjs` — nicht scannbare Ziele und nicht lesbare Dateien enden mit
     Exit 2 statt still mit Exit 0; Modul-Fehlaufruf-Guard.
  2. `node/file-system.mjs` — `readFileSync` im Import-Graph abgesichert
     (toter Symlink ergab Stacktrace und Exit 1).
  3. `engines/regex/detect-text.mjs` — `ai-color-palette` zusaetzlich mit
     Roh-CSS-Zweigen (das Original kennt nur Tailwind).
  4. `engines/regex/detect-text.mjs` — `varsAufloesen()` loest CSS-Variablen
     einmalig auf, genutzt von `flat-type-hierarchy` und `monotonous-spacing`.
  5. `shared/constants.mjs` — `EM_DASH_FLOOR` bleibt bei 5 statt 8
     (Doktrin §6: null sichtbarer Em-Dash); Dichte-Schranke
     (`EM_DASH_CHARS_PER_DASH = 500`) unveraendert.

  Die Punkte 3-5 hatte der Sync stillschweigend entfernt; beide Detektor-Evals
  waren dadurch rot. Sie tragen also Funktion, nicht Kosmetik.
- **Belegt durch:** `node evals/run-detect-check.mjs` Exit 0 (36/36) und
  `node evals/run-browser-detect-check.mjs` Exit 0 (40/40), nachgefahren am
  02.09.2026 durch die Integration.

---

## Abschnitt B.8 — Ideen-Merge ohne Vendoring: frontend-design

**frontend-design** (Anthropic, Apache-2.0) — Ideen-Merge am 02.09.2026, nicht
vendoriert. Kein Text uebernommen, keine Datei kopiert, der Skill wird nicht
geladen; nur drei Ideen wurden paraphrasiert in die eigene Doktrin eingearbeitet
und tragen dort das Herkunfts-Tag `[fd]`. Uebernommen wurden: (1) der
Zwei-Pass-Ablauf "Plan gegen den generischen Default gegenpruefen, Abweichung
benennen, erst dann Code" als neuer §3a in `references/taste-kern.md`; (2) das
Pflichtfeld `Signature-Element` (genau ein Element, an das die Seite erinnert
wird) im Design-Read, bei uns anders als in der Quelle dial-abhaengig skaliert,
weil `eigene/web/references/stil-regeln.md` §1 (Regel S15) die VARIANCE fuer die
meisten Sektoren daempft; (3) der dritte AI-Slop-Cluster "Broadsheet/Hairline"
als benanntes Verbot in `references/design-doktrin.md` §6, neben den schon
vorhandenen Clustern Cream/Serif und Near-black+Neon. Die uebrigen Regeln der
Quelle waren bereits abgedeckt oder wurden bewusst nicht uebernommen (Ticket 06,
`06-frontend-design-delta.md`). Quelle:
`claude-plugins-official/frontend-design/skills/frontend-design/SKILL.md`.
