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
| **impeccable** v3.9.1 | Doktrin-Basis + **deterministische Detektoren** (finale QA) | github.com/pbakaus/impeccable | `e4ab5e24bdf5321b72163d2fbcbe6fa985c848ba` (2026-07-18) | Apache-2.0 |
| **taste-skill** (design-taste-frontend) | **taste-Linie** (Landing/Portfolio) | github.com/Leonxlnx/taste-skill | `7c397f22d3af6f2b3f1925eb147d8e8801086151` (2026-07-17) | MIT |
| **ui-ux-pro-max** v2.11.0 | **ui-ux-Linie** (App/Dashboard) — nur Offline-DB | github.com/nextlevelbuilder/ui-ux-pro-max-skill | `f8ac5e1266dba8354ea96e19994d9f4345e7ec31` (2026-07-15) | MIT |

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
