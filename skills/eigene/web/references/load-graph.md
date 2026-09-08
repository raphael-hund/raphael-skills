# Load-Graph — was ein Site-Build lädt (und was nie)

Stand: 01.09.2026 · Beschluss Raphael.
**Der Standardpfad komponiert `web`, `design` und `copywriting` phasenweise.**
Alles andere ist bedarfsweise oder gesperrt. Es gibt keine Vorratsloads: Wer
mehr lädt, verbrennt Kontext ohne Geschmack zu gewinnen.

## 1. Phasenvertrag

Die Reihenfolge ist bindend. Ein späterer Spezialist öffnet keine bereits
abgenommene Phase ohne konkreten Befund.

**Bindende Kette:** Strategy/IA → Copy/Visual System → statischer Basisbuild →
optionaler Motion-Polish → QA → `visual-aaa`.

| Phase | Load und Übergabe |
|---|---|
| Strategy/IA | `web`, bei echtem Planbedarf `website-plan`; Ergebnis sind Journey, Sitemap und Seitenjob. |
| Copy/Visual System | Skill `copywriting` für Copy-Gates und Skill `design` für Art Direction, Tokens und Komponenten. |
| statischer Basisbuild | Ein Integrator baut die freigegebenen Copy-/Design-Artefakte zunächst ohne optionalen Motion-Polish. |
| optionaler Motion-Polish | Skill `design` und `motion-doktrin.md` nur bei offener Motion-Entscheidung; statischer Basis- und Funktions-PASS sowie Reduced-Motion-/Lifecycle-Belege sind Pflicht. |
| QA | `shot-sweep`, G1 und `qa-faecher.md` prüfen Funktion, Zustände und Revision getrennt von Geschmack. |
| `visual-aaa` | Skill `visual-aaa` ist das terminale Pixel-/DoneClaim-Gate, nie Workflow-Owner. |

`design`, `copywriting` und `visual-aaa` werden nur in ihrer oben benannten
Phase geladen, nicht als paralleler Dauer-Stack. Jeder Zusatzload — auch ein
benannter Fremd-Skill aus einer Videoquelle — ist nur zulässig, wenn er eine
noch offene Entscheidung ändert und weder fusioniert noch eine Dublette zu
`design` oder `copywriting` ist. Ähnliche Einzel-Skills werden nicht gesammelt;
ein Video-Skill-Katalog ist kein Default-Stack.

## 2. Always (in der jeweils genannten Phase)

| Was | Datei / Skill | Wofür |
|---|---|---|
| Dach und Gates | `web/SKILL.md` | Ablauf, Screenshot-Pflicht, Gotchas |
| Einstieg | `anfaenger-pfad.md` §1 | genau eine Auftrag-Zeile wählen |
| Geschmack | `stil-regeln.md` | Pflicht vor Art-Direction |
| Vorbilder | `web/references/muster-bibliothek/INDEX.md` + **2–3 Cases** | Sektor-passende Cases, nicht alle |
| Design-Linie | Skill `design` → `taste-kern.md` **mit Dial-Override aus stil-regeln §1** | Bindend bleiben: Design-Read, Anti-Default-Disziplin, Hero-Fold-Regeln. Nicht bindend: Baseline-Dials 8/6/4 — die kommen aus stil-regeln §1 |
| Doktrin | Skill `design` → `design-doktrin.md` | fusionierte Linie |
| Design-G1 | Skill `design` → `scripts/detect.mjs` + `scan-ai-slop.mjs` | Exit 0, nie `npx impeccable detect` |
| Copy-Gates | Skill `copywriting` G0→G1→G2 | G0 `forbidden.md` und G1 immer beim Copy-Leaf im Bau; G2 ≥ 0.7 zum Launch |
| Copy-/Slop-Bündel | `copywriting/scripts/forbidden-check.py` + `design/scripts/scan-ai-slop.mjs` + `design/scripts/detect.mjs` | in Copy- und Kritik-Leaves: Design-Detektoren, Copy-G0/G1, G2 zum Launch |
| SEO On-Page | Skill `seo` (nur On-Page-Teil) | **Plan-Phase**: Keyword je Route, Sitemap-Entscheidung, Title/Meta/H1-Vorgabe ins `PLAN.md`. Loop-4-Vollprogramm bleibt On demand |
| Werkzeuge | `tool-usecase-router.md` | Werkzeugtabelle vor `npm i` |
| QA | `qa-faecher.md` | Fächer 1–6 |

Der Dial-Override ist wichtig: aus `taste-kern.md` bleiben Design-Read,
Anti-Default-Disziplin und Hero-Fold-Regeln bindend. Die Baseline-Dials
8/6/4 gelten hier nicht — VARIANCE/MOTION/DENSITY kommen aus der
Sektor-Tabelle in `stil-regeln.md` §1 (Regel S15).

## 3. On demand (nur wenn der Auftrag es verlangt)

| Was | Wann laden |
|---|---|
| `landingpage-struktur.md` **XOR** `sitemap-section-planung.md` | Landing oder Multi-Page — nie beide |
| Skill `higgsfield` + `bildgenerierung.md` | echte Bildgenerierung ansteht |
| Skill `seo` (Loop-4-Vollprogramm: SERP/GSC, Cluster, Briefs, Linkbuilding) | ausdrücklicher SEO-Auftrag oder Loop 4. **Nicht zu verwechseln** mit dem On-Page-Anteil, den jede Plan-Session lädt (siehe `rolle-plan.md`): Keyword je Route, Sitemap-Entscheidung, Title/Meta/H1-Vorgabe. |
| `screenshot-kritik-loop.md` | Kritik-Panel oder Blind-A/B läuft |
| `planner-executor-protokoll.md` | Drei-Sessions-Betrieb (Plan/Kritik/Bau): Handoff schreiben/empfangen oder Session-Rotation |
| `kritik-matrix.md` | **Pflicht in der Kritik-Session:** vor dem Spawn der Flotte laden und befolgen |
| Skill `visual-aaa` | terminales Pixel-/DoneClaim-Gate nach G1; nie als Workflow-Owner |
| `motion-doktrin.md` | eine Motion-Komponente wirklich gebaut wird |
| `web-clone-playbook.md` | URL-Vorlage nachbauen (Lizenz zuerst) |
| `lexlin-design-prinzipien.md` + `damien-design-methodik.md` | **nur** auf der Premium-Zeile aus `anfaenger-pfad.md` |
| `ui-layouts-catalog.md` | nur wenn Vokabular für ein ungewöhnliches Layout fehlt |
| `frontend-referenzbibliothek.md` als Dump | nur nach einer Router-Zeile und dann max 3 URLs |

## 4. Never on site-build

Diese Skills und Dateien werden bei einem normalen Seitenbau **nicht** geladen.
Nur ein ausdrücklicher `/slash`-Befehl von Raphael hebt das auf.

| Gesperrt | Grund |
|---|---|
| Slash-Skills `taste`, `impeccable`, `kill-ai-slop`, `no-ai-slop`, `ui-ux`, `animate`, `frontend-design` | Router und Dubletten; zeigen nur auf `design` bzw. `copywriting` |
| `emil-design-eng` extra | in `design` fusioniert |
| `visual-harness` extra | keine zweite Owner-Lane; **`shot-sweep` + G1 + `visual-aaa` sind der Web-Capture**. `visual-harness` nur als expliziter Slash, nie über einem Web-Owner |
| `ce-work`, `wayfinder`, `unlazy` | Meta-Workflows, tragen keinen Geschmack bei; `unlazy` nur bei explizitem Gauntlet |
| `poteto` / `peteto` | Persona-Modus, orthogonal zum Seitenbau |

## 5. Prüffrage vor jedem zusätzlichen Load

Drei Fragen, alle drei müssen mit Ja beantwortbar sein:

1. Steht die Datei in der Auftrag-Zeile aus `anfaenger-pfad.md` §1?
2. Ändert sie eine Entscheidung, die ich in diesem Schritt wirklich treffe?
3. Ist sie nicht schon durch `design` oder `copywriting` abgedeckt?

Ein Nein heisst: nicht laden. Quellenstatus und Ablauf vor dem Load in `_archiv/quellen-ledger.md` prüfen.

## 6. Nach dem Projekt

Einmal je abgeschlossenem Kundenprojekt, vor dem Schliessen der Karte: die im
Projekt **tatsächlich geladenen** Referenzdateien gegen §2 und §3 halten. Quelle
ist der Ladeverlauf im `STATUS.md`, nicht die Erinnerung.

Zwei Listen, je eine Zeile pro Datei:

- **Nie geladen, steht aber in §2 (Always)** — Kandidat für §3 oder fürs
  Streichen. Eine Always-Zeile, die kein Projekt braucht, kostet in jedem
  Projekt Kontext.
- **Immer nachgeladen, steht aber in §3 (On demand)** — Kandidat für §2. Wer
  dieselbe Datei in jedem Projekt nachlädt, hat sie faktisch als Always.

Das Ergebnis geht als **ein** Lernpunkt in Pflichtform an `skill-update`,
Zielskill `web` — nicht als Sammelbericht und nicht als stille Änderung an
dieser Datei. Findet der Abgleich nichts, ist auch das eine Zeile („Ladeprofil
unverändert“), keine ausgelassene Prüfung.
