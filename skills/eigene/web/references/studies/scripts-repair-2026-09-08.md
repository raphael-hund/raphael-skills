# Skript-Reparatur web 4.0.0 (08.09.2026)

Playwright: `/root/.local/share/web-skill-node` (playwright 1.63.0, chromium-1243). Loader `scripts/lib/playwright-loader.mjs`, Reihenfolge `PLAYWRIGHT_ROOT` → Projekt `node_modules` → gemeinsamer Ordner → Fehlermeldung mit Installationsbefehl. Alle Playwright-Skripte (shot-sweep, axe-run, craft-check, formular-check, inspiration, capture-site, web-clone/*) laufen über den Loader; `g1-gate.mjs` nennt Playwright nur in einem Feldnamen.

Live-Gates gegen den statischen Export des React-Starters (`python3 -m http.server 4174 --directory out`), 08.09.2026 07:31 UTC:

| Skript | Befehl | Ergebnis | Exit |
|---|---|---|---|
| shot-sweep.mjs | `--base http://127.0.0.1:4174 --routes /,/kontakt/ --out /tmp/shots-self --static --mobile` | 14 Shots (Fold 1440×900, Mobil 390×844, Hover), manifest.json mit run_id/build_revision | 0 |
| axe-run.mjs | `--url http://127.0.0.1:4174/` | 0 Violations, 29 Passes, 89 Regeln | 0 |
| onpage-check.mjs | `--base … --routes / /kontakt/ /leistungen/beratung/` | 5 Befunde: Platzhalter-Beschreibungen zu kurz, Unterseiten mit wenig Text (Starter-Platzhalter, erwartet) | 1 |
| capture-site.mjs | `--url … --out /tmp/cap-self` | Desktop/Mobil-Viewport und Fullpage plus manifest; `ready:false` wegen Marquee-Dauerbewegung und Geist-Fallback-FontFace | 1 |
| craft-check.mjs | `--url …` | M13 Mobile-Overflow (1024 px bei 390 px) und M24 keine Bildwelt; Overflow im Starter behoben (`main w-full`), Bildwelt ist Projektinhalt | 1 |
| formular-check.mjs | `--url …/kontakt/` | F0 kein Formular sichtbar, weil `NEXT_PUBLIC_FORM_ENDPOINT` leer; Starter zeigt dann den Hinweistext | 0 |
| tastatur-check.mjs | `<projektordner>` | keine zusammengesetzten Widgets im Starter | 0 |
| komponenten.mjs | `libs` | Tabelle mit Registry-, Vendor-, npm- und HTML-Wegen; Vendor-Route leer (kein `resources/`) | 0 |

`--help` liefert Exit 0 für alle `scripts/*.mjs`; `_debug-events.mjs` und `mscan.mjs` (Wegwerf-Debug ohne CLI) wurden entfernt; `import-check`, `lib-lookup`, `lib-exporte` liegen im Archiv `references/_archiv/vault-abhaengig/`.

Evals: 91/92 `run-preview-vs-launch-check` nach Pfadkorrektur (website-plan entfällt, visual-aaa-Kontrakt mit festem Pfad); `run-exit-vertrag-check` 78/91 und `run-aufruffehler-check` 47/54 entsprechen dem Stand von 0.34.0 (81/93 bzw. 47/54); `run-doku-zahlen` und `run-verweise-check` waren schon in 0.34.0 rot.
