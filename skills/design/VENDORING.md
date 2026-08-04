# design — VENDORING

Dieser Skill ist eine **Fusion** aus drei Upstream-Skills. Diese Datei dokumentiert
Herkunft, Commits und getroffene Entscheidungen. Alles wurde am **2026-07-19** aus
den unter `/root/tools/vendor/` liegenden `--depth 1`-Klonen uebernommen.

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
    detector/**                     # 20 Dateien, self-contained
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
| **impeccable** v3.9.1 | Doktrin-Basis + **deterministische Detektoren** (finale QA) | github.com/pbakaus/impeccable | `51b470f903045dc6d459ddfaf6f1700d6a3516e2` (2026-07-20; abgeglichen 2026-07-21, Diff seit e4ab5e2 betraf nur `plugin/skills/impeccable/scripts/{detector/design-system.mjs,lib/impeccable-config.mjs,lib/impeccable-paths.mjs}` — Font-Size-Detektor unterstuetzt jetzt `clamp()`-Fluid-Endpunkte + DESIGN.md `typography.scale`, plus Pfad-Traversal-Haertung `safeSessionId()`; nachgezogen, SKILL.md/Doktrin unveraendert) | Apache-2.0 |
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

---

## Abschnitt C — jakubkrehel/skills (Detail-Referenzen)

Quelle: github.com/jakubkrehel/skills, **MIT-Lizenz** (Copyright (c) Jakub Krehel).
Vendor-Klon: `/root/tools/vendor/jakubkrehel-skills`.

### C.1 Runden

| Runde | Datum | Commit | Umfang |
|---|---|---|---|
| 1 | 2026-07-2x | `f8a1574` | `typografie.md` (better-typography), `farben-oklch.md` (better-colors), `ui-polish-details.md` (better-ui, Basis) |
| 1b | 2026-07-29 | `a673333` | `layout-struktur.md` (better-layout), `barrierefreiheit.md` (better-accessibility), Abschnitt "Icons" in `ui-polish-details.md` (better-ui/icons.md), Hit-Area-Konflikt entschieden |
| 2 | 2026-07-29 | `a673333` | Nachzug der drei Runde-1-Dateien auf `a673333`, `color-usage.md` in `farben-oklch.md` eingearbeitet, **neu** `interface-texte.md` (better-writing, nur UI-Anteil), Interface-Review-Abschnitt in `SKILL.md` (better-interface) |

Alle Dateien stehen jetzt auf `a673333`. Kopfzeilen jeder Reference nennen Quelle,
Skill, Commit und Lizenz.

### C.2 Mapping Upstream -> design

| Upstream-Skill | Ziel in design |
|---|---|
| `better-typography` | `references/typografie.md` |
| `better-colors` (inkl. `color-usage.md`) | `references/farben-oklch.md` |
| `better-ui` (inkl. `icons.md`) | `references/ui-polish-details.md` |
| `better-layout` | `references/layout-struktur.md` |
| `better-accessibility` | `references/barrierefreiheit.md` |
| `better-writing` | `references/interface-texte.md` (**nur** der UI-/Microcopy-Anteil) |
| `better-interface` | Abschnitt "Voller Interface-Review" in `SKILL.md` (keine eigene Datei) |

### C.3 Was BEWUSST nicht vendored wurde

- **better-writing, allgemeiner Copywriting-Teil** (Voice-Recherche, Ton-Matrix,
  "einfache Woerter statt clevere", Leser direkt ansprechen als Stilregel). Grund:
  liegt bereits vollstaendig und deutschsprachig in den Skills `copywriting`
  (Orwell-DE, Floskel-Verbote, Brand-Voice, VOICE.md) und `no-ai-slop`. Nur die
  Interface-spezifischen Regeln (Button-Labels, Fehlermeldungen, Empty States,
  Toggle-Labels, Platzhalter, Linktext, Flow-Vokabular, Variablen-Interpolation)
  sind neu und wurden uebernommen.
- **better-interface als eigene Reference.** Grund: `design/SKILL.md` ist bereits
  der Router ueber alle Domaenen; eine zweite Orchestrierungs-Ebene waere
  Doppelung. Uebernommen wurden nur die Teile mit eigenem Substanzwert:
  Modus-Tabelle (quick/full + Fund-Limit), Review-Reihenfolge (Fundament vor
  Politur), Belegpflicht, "eine Ursache = ein Fund", Severity-Skala,
  Considered-but-Rejected, Read-only-Default, Verdikt-Stufen.
- **Standalone "Review Output Format"-Bloecke der einzelnen better-Skills**
  (Findings-Tabelle mit Severity/Location/Before/After/Why je Skill plus eigenem
  Verdikt). Grund: In design gilt EIN konsolidiertes Format aus dem
  Interface-Review-Abschnitt in `SKILL.md` — sechs eigene Verdikte
  widersprechen genau dem, wofuer better-interface upstream existiert. Die
  knappen Before/After-Vorgaben in den References bleiben als Arbeitsformat.
- **`agents/openai.yaml`** aller Skills (Plugin-Metadaten fuer die Codex-Oberflaeche,
  ohne Inhalt fuer uns).
- **`variable-fonts-and-opentype.md`** weiterhin nur als Kurzabschnitt in
  `typografie.md` — Achsen-/OpenType-Deep-Dive ist fuer Kundenprojekte selten
  relevant. Die inhaltliche Aenderung dieser Datei (font-synthesis) ist
  eingearbeitet.

### C.4 Wert-Korrekturen aus `f8a1574` -> `a673333`

Alle in `SKILL.md` unter `gotchas` dokumentiert. Kurzfassung:

| Thema | Alt (f8a1574) | Neu (a673333) |
|---|---|---|
| Hell/Dunkel-Grenze | L > 0.6 | **L > 0.73** (APCA-Crossover) |
| WCAG-Grosstext | >=18px / >=14px bold | **>=24px / >=18.5px bold** (18pt/14pt in px) |
| Kontrast-Fix | "nur L, Chroma egal" | L zuerst, C/H halten, C bei Gamut senken, **neu messen** |
| Kontrast-Fund | direkt fixen | **melden**, nur auf Anforderung fixen |
| Exit-Easing | `ease-in` | **`ease-out`** (Enter und Exit) |
| Kein Exit | immer falsch | **manchmal richtig** (haeufig, informationslos, reduced-motion) |
| Tailwind `transition` | mappt auf `all` | mappt auf **kuratierte Liste**; verboten bleibt `transition-all` |
| `clip-path` GPU | komponierbar | **nur neueres Chromium**, cross-browser unzuverlaessig |
| `font-synthesis: none` | pauschal setzen | **erst Schnitte laden**, `none` nur nach Fallback-Pruefung |
| Palettenstufen | 9 = Standard | **11 = Tailwind-Default**, 9 = schlanker Default |
| Dark Mode | Mapping umkehren | Rollen tauschen, dann **je Paar nachziehen und pruefen** |
| Duenne Gewichte | (nicht erwaehnt) | **`400`+ unter 18px**, `100`-`300` erst ab 28px Display |
| Line-height eng | Headings ~1.1 | zusaetzlich: **mind. 1.4 ab 3 umgebrochenen Zeilen** |
| `user-select: none` | auf Button-Labels ok | **nur auf begruendeter Drag-/Gesten-Flaeche** |
| Heading-Hierarchie | seitenweit `h3` < `h2` | **je semantischem Abschnitt**; Semantik gehoert zu A11y |

### C.5 Update-Pfad jakubkrehel

1. `git -C /root/tools/vendor/jakubkrehel-skills pull`, neuen Commit in C.1 eintragen.
2. `git diff <alt>..<neu> -- skills/<skill>` je betroffenem Skill lesen.
3. Inhaltliche Aenderungen in die deutsche Reference einarbeiten (Zahlenwerte exakt
   aus der Quelle), Formatierungs-Rauschen ignorieren.
4. Kopfzeilen-Commit der Reference aktualisieren; Wert-Korrekturen in C.4 und als
   `gotcha` in `SKILL.md` nachfuehren.
5. Neue Upstream-Skills gegen bestehende Raphael-Skills pruefen (Doppelung
   vermeiden), Entscheidung in C.3 begruenden.
