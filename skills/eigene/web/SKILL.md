---
name: web
description: >
  Dach-Skill für Website- und Landingpage-Projekte in der Claude-Code-Harness:
  Plan, Fold-Duell, Bau, Kritik und Launch als Phasen mit Gates und Screenshots.
  Baut React-Projekte (Next.js App Router, TypeScript, Tailwind v4, shadcn/ui)
  und installiert Komponenten aus den verbundenen Registries, MCP-Servern und
  npm-Bibliotheken (21st.dev, shadcn, Mantine, Magic UI, Aceternity, Kibo und
  weitere), statt sie nachzubauen. Trägt SEO-Seitenkarte, DESIGN.md, Design-Depth-
  Kapitel, Motion-Regeln, Bildsuche, GPT-Image, Muster-Bibliothek und Stil-Regeln.
  Subagenten: Fable, Astra und Kimi zuerst, Opus und Grok dazu, Sol nur Backend,
  Luna/Sonnet/Terra nur Serien. Trigger: "Website bauen", "Landingpage bauen",
  "Sitemap", "Webseite launchen", "CRO", "Referenzseite nachbauen", "Website
  clonen", "Screenshot nachbauen", "aus Bild bauen", "Website planen",
  "Website-Kritik", "kompletter Website-Plan", "DESIGN.md".
metadata:
  raphael-version: "4.0.0"
  raphael-changelog: '["0.34.0 (04.09.2026): Fold-Duell als Welle 0, Referenzen als Bilder, Blind-Judge, Komponenten vor Eigenbau", "2.0.0 bis 2.2.0 (07.09.2026): MAKE Web Astra mit 56 Galerien, 50 UI-Bibliotheken, Motion-Regeln, Bildsuche, GPT-Image, 14 Design-Depth-Kapiteln", "3.0.0 (08.09.2026): React-first, verifizierte Registries, react-starter, 21st-CLI und Design Context, shadcn- und Mantine-MCP", "4.0.0 (08.09.2026): Zusammenführung 0.34.0 + 2.2.0 + 3.0.0: Rollen, Gates, Skripte und Muster-Bibliothek aus 0.34.0, Wissensmodule aus 2.2.0, React-Stack und Registries aus 3.0.0; Agentenkatalog auf Fable/Astra/Kimi + Opus/Grok; Workflow-Tool statt /orchestrate; Playwright-Loader für alle Screenshot-Skripte"]'
  raphael-class: "F"
  raphael-scope: "agency"
  raphael-sensitivity: "internal"
  raphael-loads: '["references/anfaenger-pfad.md", "references/rolle-plan.md", "references/rolle-kritik.md", "references/rolle-bau.md", "references/rolle-launch.md", "references/fold-duell.md", "references/kritik-matrix.md", "references/agent-roster.md", "references/stack.md", "references/component-registries.md", "references/21st-dev.md", "references/stil-regeln.md", "references/muster-bibliothek/INDEX.md", "references/design-depth.md", "references/design-depth/INDEX.md", "references/motion-native.md", "references/image-search.md", "references/gpt-image.md", "references/seo-pages.md", "references/screenshots.md", "references/load-graph.md", "references/loop2-ablauf.md", "references/tool-usecase-router.md", "references/modus-inspiration.md", "references/zugangskarte.md"]'
  raphael-requires-skills: '["copywriting@^0","design@^0","seo@^0","higgsfield@^0"]'
  raphael-completion-criteria: '["Rolle in einem Satz benannt (Plan|Kritik|Bau|Launch), genau ein Rollen-Dokument geladen, Preflight aus dem Abschnitt Vor dem ersten Edit gelaufen", "Website ist ein React-Projekt aus assets/react-starter; jede vereinbarte Route der SEO-Seitenkarte ist prerendert und trägt Inhalt, Metadaten und Links im Response-HTML (curl-Beleg am Produktionsbuild)", "Wiederverwendbare Komponenten kommen aus den konfigurierten Registries, npm oder 21st mit Herkunft, Lizenz und entfernten Abhängigkeiten in DESIGN.md; Eigenbau nur mit Suchbeleg", "Bei Neuaufbau/Redesign hat Raphael das Fold-Duell gesehen und in DECISIONS.md gewählt, bevor Routen gebaut wurden", "Plan, Fold-Duell, Bau und Kritik als Phasen in einem Chat, Zustand auf Platte (PLAN.md, PRUEFGEGEN.md, STATUS.md, KRITIK-n.md); Neuaufbau: Fold-Duell-GO öffnet den ersten Bau, danach öffnet nur KRITIK-n.md den nächsten Bau", "Parent dünn: kein CSS/TSX-Edit, kein PNG-Read im Parent; jedes PNG liest ein Kritik-Leaf, Parent führt das Shot-Ledger", "Fold-Duell und Bau starten im ersten Turn einen Dynamic Workflow (multi-family); Fable/Astra/Kimi primär, Opus ergänzend; nach jedem Bau genau ein Stufe-2-Kritiker anderer Familie, zweiter nur nach FAIL; vor Auslieferung genau eine Stufe-1-Abnahme", "Screenshots über scripts/shot-sweep.mjs mit --base (1440×900 Fold und 390×844), nach jedem Fix frischer Sweep; DESIGN.md mit CSS und gerendertem Stand abgeglichen", "Launch nur mit allen Gates aus rolle-launch.md grün und Raphaels Signatur; kein Push, Deploy oder Versand ohne Auftrag"]'
---

# web: Website-Skill (Claude Code)

Diese Datei ist der **Router**. Sie sagt, welche Phase du bist, welche eine Datei
du dafür lädst und welche Gates gelten. Das Handbuch steht in den Referenzen.

## Was Raphael tippt

- Website bauen / ändern / relaunchen / clonen → `/web`
- Inspiration / Look / Referenzen holen, noch nichts planen → `/web` (Modus Inspiration: Refero-MCP, 21st-MCP, Galerien, Komponenten-Registries, Screenshots über Leaves)
- Website planen, noch nichts bauen → `/web` (Rolle Plan)
- Website-Kritik / Look / Conversion sichtbar prüfen → `/web` (Rolle Kritik, Workflow)
- Nur DESIGN.md → `/web` (Rolle Plan, Ausgabe DESIGN.md)

Kein `/orchestrate`, kein `/ultracode`, keine Skill-Liste. Bau- und Kritik-Phase
starten im ersten Turn einen Dynamic Workflow über das Workflow-Tool (Profil
`multi-family`); `web` lädt seine internen Spezialisten selbst.

## Welche Phase bin ich? (ein Pflicht-Load)

Sag die Rolle in einem Satz an und lade **genau ein Rollen-Dokument**. Danach lädt die Auftrag-Zeile aus `anfaenger-pfad.md` nur die dort genannten Fachreferenzen.

| Rolle | Pflicht-Load | Fertig heisst |
|---|---|---|
| **Inspiration** | `references/modus-inspiration.md` | Reference-Lock + Shot-Ledger in `art-direction.md`; Code entsteht erst im Bau |
| **Plan** | `references/rolle-plan.md` | `PLAN.md`, `PRUEFGEGEN.md`, `SEO-PAGE-MAP.json`, `DESIGN.md`-Seed, Copy-Briefing, eine Art-Direction je Kunde, Fold-Duell-Zeilen bei Neuaufbau |
| **Fold-Duell** (Welle 0 bei Neuaufbau/Redesign) | `references/fold-duell.md` | Raphael hat drei Folds gesehen und gewählt (`DECISIONS.md`); erst dann Welle 1 |
| **Kritik** | `references/rolle-kritik.md` | `KRITIK-n.md` mit überlebender Fixliste + Shot-Ledger |
| **Bau** | `references/rolle-bau.md` | Fixliste umgesetzt, Re-Sweep grün, `STATUS.md` aktuell, alle Routen der Seitenkarte gebaut |
| **Launch** | `references/rolle-launch.md` | alle Launch-Gates grün, Raphaels Signatur liegt vor |

Jede Rolle startet mit dem Gate:

```bash
node /root/raphael-skills/skills/eigene/web/scripts/session-gate.mjs \
  --rolle plan|kritik|fold-duell|bau --client /root/clients/<kunde>/web/handoff
```

Exit 0 = frei, Exit 2 = gesperrt (zurück an die Vorphase). Launch läuft unter `--rolle bau`. Kanonischer Handoff ist `/root/clients/<kunde>/web/handoff`; bestehende Pfade `/root/clients/client-<name>/web/handoff` und `/root/clients/<kunde>/website/<lauf>/handoff` bleiben akzeptierte Aliase. Fehlt der Handoff-Prompt, ist es Plan.

## Vor dem ersten Edit (Preflight, jede Session)

1. Harness prüfen: `claude mcp list` zeigt `21st`, `shadcn`, `mantine`, `refero` als Connected; `id` und `stat` des Projektordners vergleichen, Schreibprobe (`touch`) auf Projekt und Skill-Quelle; `test -r /root/.secrets/api-keys.env`, sonst `sudo /root/raphael-command-center/ops/bin/heal-secrets-acl.sh`. Ergebnis in einer Zeile.
2. `references/anfaenger-pfad.md` §1: **eine** Auftrag-Zeile wählen, nur die dort genannten Dateien laden.
3. Vor Art-Direction: `references/stil-regeln.md` (Sektor-Dials §1) + 2 bis 3 Cases aus `references/muster-bibliothek/INDEX.md` + `references/design-depth.md` mit den Kapiteln aus `references/design-depth/INDEX.md`, die die Sektion braucht.
4. Projekt lesen: `/root/clients/<kunde>/wiki/ICP.md`, `OFFER.md`, `PROOF.md`, `VOICE.md`, `/root/raphael-brain/wiki/hot.md`.
5. Referenzen holen: `ls -lt /root/eingang | head -20`, bildhafte Dateien der letzten 7 Tage durch `astra-worker`, `kimi-worker` oder `fable-builder` ansehen lassen; in der Plan-Phase höchstens drei Bilder, kein Produktionsbau.
6. Auftrag + geladene Pfade in einem Satz nennen.

## Rote Linien (gelten in jeder Rolle)

- **Raphael sieht den Look, bevor Routen gebaut werden.** Bei Neuaufbau, Redesign oder «Look von null» ist Welle 0 das Fold-Duell: drei Fold-Richtungen, ein Montage-Bild im Eingang, seine Wahl in `DECISIONS.md`. Erstes Bild ≤30 Minuten nach Auftrag.
- **Referenzen sind Bilder.** Referenzbilder und Referenz-Folds gehen als `BILDLISTE.txt` an jeden Builder- und Judge-Leaf; Berichte tragen je Bild «gesehen:». Der Judge fragt blind «besser Build oder besser Referenz?» je Achse; «Referenz besser» auf Visual = FAIL.
- **Kunden-`DESIGN.md` und Raphaels Referenz schlagen `stil-regeln.md`.** Ein Widerspruch wird als Zeile in `brand/DESIGN.md` aufgelöst.
- **React-Stack, Komponenten holen statt nachbauen.** Neue Sites starten aus `assets/react-starter` (`references/stack.md`). Jede Komponentenfamilie zuerst über die konfigurierten Registries, das shadcn-MCP, 21st (MCP oder CLI mit Design Context) und npm nach `references/component-registries.md`; Eigenbau nur mit Zeile «gesucht in …, nichts passte, weil …» im Bericht und in `DESIGN.md`. HTML-first und Astro-Inseln gelten nur noch für bestehende HTML-Projekte (`references/component-islands.md`).
- **Jede SEO-Route wird gebaut.** `SEO-PAGE-MAP.json` (`references/seo-pages.md`) ist der Umfang; keine Homepage-only-Lieferung, keine leeren Routen, kein kopierter Ortstext. Beleg ist `curl` am Produktionsbuild.
- **Screenshots sind der einzige Design-Beweis.** `scripts/shot-sweep.mjs` mit Pflicht-`--base`, über HTTP, 1440×900 Fold **und** 390×844, `--static`; nach jedem Fix frischer Sweep. Aufnahmeregeln und Headless-Fallen: `references/screenshots.md`. Zusätzlich vor der Abnahme: jede Datei in `components/ui/` einem Registry-Eintrag oder einer festgehaltenen Eigenbau-Begründung in `DESIGN.md` zuordnen.
- **Parent bleibt dünn; Bau-Session = Controller.** Der Parent editiert keine CSS-/TSX-Datei und liest keine PNG-Binaries. Jedes PNG liest ein Kritik-Leaf; der Parent führt das Shot-Ledger (`pfad | viewport | gelesen-von | verdict`) in `STATUS.md`. Bau- und Kritik-Phase **müssen** im ersten Turn einen Dynamic Workflow starten.
- **Drei Sessions in einem Chat, Kritik-Flotte nur nach `references/kritik-matrix.md`.** Plan, Kritik und Bau sind drei Workflow-Phasen mit Zustand auf Platte. Genau ein Stufe-2-Kritiker anderer Familie nach jedem Bau, `effort: high`; Abnahme aus Stufe 1 vor Auslieferung. Ein Befund lebt nur nach der Merge-Regel: zwei unabhängige Leaves oder eine Linse mit deterministischem Gate-Beleg (SEO `onpage-check.mjs`, Copy G0/G1, Trust `PROOF.md`). Wer baut, prüft nicht. Provenienz aus `ANGEFRAGTES MODELL` plus Fallback-Hinweis.
- **Copy schreibt nie der Integrator.** Copy kommt aus einem eigenen Copy-Leaf (`astra-worker`, dann `kimi-worker`, dann `fable-builder`) mit `forbidden-check.py`-Beleg; der Integrator baut sie unverändert ein.
- **Kunden-Vorschau ist kein Launch.** Vorschau-Blocker sind nur Ablauf, Sitemap, Idee, Design; Inhalt und Domain parken als `content-park`/`ops-park` oder FAKT-GATE (`scripts/preview-befund-klasse.mjs`), nie als `biggest_gap`. Der Web-Skill entscheidet keine Kundenfakten eigenmächtig.
- **Launch nur mit Raphaels Signatur** plus Deploy-Egress-Gate. Kein Push, Deploy oder Versand ohne Auftrag; Zustimmung zum Ergebnis ist keine Freigabe dafür.
- **Gates werden nicht umgebaut, um durchzukommen.** Ein fälschlich blockendes Gate ist ein Befund in `STATUS.md` (was blockt, warum fälschlich, kleinster Fix-Vorschlag); keine Session editiert Hooks, Validatoren oder fremde Skills, um ein Gate zu öffnen.

## Subagenten (Claude-Code-Harness, Raphael 08.09.2026)

| Job | Zuerst | Dazu | Nie |
|---|---|---|---|
| Plan, Architektur, Design-Richtung | Hauptsession (Fable), `astra-worker`, `kimi-worker` | | Sol, Luna, Sonnet, Haiku |
| Frontend, UI, Integration | `fable-builder` (max zwei parallel), `astra-worker`, `kimi-worker` | `opus-builder` (Breite) | Sol |
| Copy | `astra-worker` | `kimi-worker`, `fable-builder` | Opus, Sol, Haiku |
| Technik, Debug, Browser, Toolchain | `grok-worker` | | |
| Backend, API, Tests | `grok-worker`, `sol-worker` | `composer-worker` | Frontend über Sol |
| Research, Gegenposition | `kimi-worker`, `grok-worker` | `web-research` (Haiku, nur Fetch) | Astra |
| Kartierung, Serien, Massen-Read | `sonnet-worker`, `luna-worker`, `terra-worker`, `Explore` | | Urteil, Design |
| Erste Kritik nach Bau (Stufe 2) | `grok-critic` (visuell), `opus-critic` (Code/UX; nach Fable-Build als Instanz-Trennung gekennzeichnet, nie nach Opus) | `sol-critic` (nur Code/Backend) | gleiche Familie wie Builder |
| Abnahme vor Auslieferung (Stufe 1) | `fable-critic`, `astra-critic`, `kimi-critic` (andere Familie als Builder) | | nach eigenem Bau |

Rollen-Wörterbuch mit Kontextpaketen: `references/agent-roster.md`. Spawn-Plan
der Kritik: `references/kritik-matrix.md`. Jedes Paket nennt Ziel, Eingaben,
`write_set`, Prüfbefehl, Stop-Bedingung, Zeitbudget und Rückgabeformat; Reviews
zusätzlich `ACTUAL_BUILDER_FAMILY`. Serienarbeit (URL-Proben, Massen-Checks)
läuft als Skript oder Stufe-3-Leaf, nie als offenes 50er-Paket an Stufe 2
(Observation 0063).

## Wissensmodule (bedarfsweise, nie alle)

| Thema | Datei | Wann |
|---|---|---|
| Stack, Projektstruktur, Client/Server-Grenze, Export | `references/stack.md`, `assets/react-starter/README.md` | vor dem ersten Bau-Paket |
| Registries, npm, MCP, Suchreihenfolge je Komponentenjob | `references/component-registries.md`, `references/21st-dev.md`, `references/ui-libraries.md` | vor jeder neuen Komponentenfamilie |
| Werkzeugtabelle, Icon/Font/Motion-Defaults, `werkzeug-gate.mjs` | `references/tool-usecase-router.md`, `references/zugangskarte.md` | art-direction, components, build |
| Stil-Regeln, Muster-Bibliothek, Sektor-Dials | `references/stil-regeln.md`, `references/muster-bibliothek/INDEX.md` | vor jeder Art-Direction |
| Design-Depth: Anatomie, Effekte, UX, 14 Kapitel mit Messwerten | `references/design-depth.md`, `references/design-anatomy.md`, `references/design-effects.md`, `references/design-ux-decisions.md`, `references/design-depth/INDEX.md` | vor der ersten Komponente eines Neuaufbaus; pro Sektion das passende Kapitel |
| DESIGN.md-Vertrag und Abgleich | `assets/DESIGN.template.md`, `references/design-contract.md` | Plan und Reconcile |
| Inspiration: Refero, Galerien, Service-Referenzen, Creator-Methoden | `references/modus-inspiration.md`, `references/inspiration.md`, `references/inspiration-galleries.md`, `references/service-learning.md`, `references/creator-methods.md`, `references/video-methods.md` | Modus Inspiration |
| Motion | `references/motion-native.md` (CSS, WAAPI, View Transitions, `motion/react`), `references/motion-doktrin.md` (wann animieren), `scripts/motion-check.mjs` | build, polish |
| Bilder: Suche, GPT-Image, Bibliothek, Image-to-Code, Scrollcraft | `references/image-search.md` + `scripts/find-images.mjs`, `references/gpt-image.md`, `references/image-library.md`, `references/image-to-code.md`, `references/scrollcraft.md`, `references/bildgenerierung.md`, `scripts/bilder.mjs`, `scripts/stock.mjs` | art-direction, build |
| SEO-Seitenkarte und Release-Vergleich | `references/seo-pages.md`, `scripts/validate-page-map.mjs`, `scripts/onpage-check.mjs` | Plan und Launch |
| Screenshots und QA | `references/screenshots.md`, `references/screenshot-kritik-loop.md`, `references/qa-faecher.md`, `scripts/shot-sweep.mjs`, `scripts/capture-site.mjs`, `scripts/axe-run.mjs`, `scripts/tastatur-check.mjs`, `scripts/formular-check.mjs`, `scripts/craft-check.mjs`, `scripts/g1-gate.mjs` | Kritik, Bau, Launch |
| Landingpage, Sitemap, IA, Conversion | `references/landingpage-struktur.md`, `references/sitemap-section-planung.md`, `references/informationsarchitektur.md`, `references/conversion-elemente.md`, `references/cro-diagnose.md` | Plan |
| UI-Skills-Taktiken, Beautiful UI, externe Skills | `references/ui-skills.md`, `references/ui-playbook.md`, `references/beautiful-ui.md`, `references/external-skills-2026-09.md` | bei konkreter Schwäche |
| Klon und Rebuild aus Bild | `references/web-clone-playbook.md`, `references/rebuild-from-image.md`, `scripts/web-clone/` | Referenz nachbauen |
| Bestehende Projekte, Abhängigkeiten, weitere Skills | `references/existing-web.md`, `references/dependencies.md`, `references/load-graph.md` | Übernahme, Skill-Kombination |
| Launch, Deploy, Evidence | `references/rolle-launch.md`, `references/vercel-git-deploy.md`, `references/run-evidence-contract.md`, `scripts/run-evidence.mjs` | Launch |

Volle Auftrag→Datei-Matrix: `references/anfaenger-pfad.md` §8. Was ein
Site-Build lädt und was nie: `references/load-graph.md`.

## Ablauf in einer Zeile

strategy → SEO-Seitenkarte → copy-Briefing → Referenzrichtung (**stil-regeln + Cases + design-depth**) → Fold-Duell (Neuaufbau) → gewählte Art-Direction als Tokens → components (Registries, Werkzeugtabelle) → build (alle Routen) → shot-sweep → Kritik-Flotte → Fixliste → Re-Sweep → SEO+Trust → Abnahme Stufe 1 → run-evidence `validate --ready` → Launch (Signatur) → cro-learn.
Detail-Ablauf und Gates: `references/loop2-ablauf.md`.

## Gotchas (kurz)

- **Dev-Server nur über `raphael-preview start --cwd <dir> --port <n>`**; `shot-sweep` liest `--base` aus `.ai/preview-<port>.json`. Statischer Export: `scripts/pruefstand.mjs` liefert `out/` wie Vercel aus. Keine handgebauten Warteschleifen mit `curl`.
- **Playwright** kommt aus `scripts/lib/playwright-loader.mjs` (Reihenfolge `PLAYWRIGHT_ROOT`, Projekt, `/root/.local/share/web-skill-node`). Fehlt es: Installationsbefehl aus der Fehlermeldung, nie ein Ad-hoc-Skript.
- **Headless und View Transitions:** bei `@view-transition{navigation:auto}` Tests headed unter `xvfb-run -a` oder Kontext mit `reducedMotion:'reduce'`; vor jeder Controller-Diagnose `:active-view-transition` und rAF-Ticks messen (Observation 0013).
- **Session-Wechsel** (Codex und Claude, root und raphael-claude): fremdes Eigentum in Repo, `/tmp`-Ausgabepfaden und `.npm` vor dem ersten Schreibschritt beheben (Observations 0037 bis 0040, 0061). Build-Skripte kopieren byteweise, QA-Skripte prüfen den Ausgabeordner vor dem Browserstart.
- **Deploy** aus frischem Worktree erst nach `vercel link --project <name>`; Beleg ist ein Treffer im HTML der echten Domain, nie der READY-Status (Observations 0025, 0035). Tracking-Skript und Datenschutz-Abschnitt sind eine Lieferung (0029).
- **Grüne Tests belegen keinen frischen Build** (0051): vor dem Sweep `find src -newer out/index.html` leer oder frisch bauen. Leere Bildflächen in Vollseiten-Captures sind Capture-Verdacht (0050, 0054).
- **Paket `motion`, Import `motion/react`**, nie `framer-motion`. **Ein Icon-System**, Default Lucide. Fonts über `next/font` mit `latin` + `latin-ext`, Adobe Fonts über `scripts/adobe-fonts-kit.mjs`.
- **Keine Dependency ohne Zeile in der Werkzeugtabelle** (`werkzeug-gate.mjs`); nach jedem `shadcn add` die `package.json`-Diff lesen.
- **Lighthouse/axe = 0** hart für den Launch, nicht die Vorschau. **AAA hier = Agentur-Rubrik**, WCAG bleibt AA.
- **Update an Bestandsseite = neuer Worktree**, nie im Root-Checkout.
- **Stock-Fotos nur über `scripts/stock.mjs`** (Shutterstock, Lizenznachweis) oder `scripts/find-images.mjs` (Logos/Icons ohne Rechte-Rückfrage, Fotos als Referenz für GPT-Image).
- **Dokumentarfotos** brauchen eine Inhaltsfreigabe am Original (Displays, Logos auf Kleidung, Kennzeichen, Namensschilder); Kontaktbögen sind nur Auswahlhilfe (Observation 0021).

## Feedback-Pfad

- Raphael-Nein zu einem Asset/Motiv/Muster → `DESIGN.md`/`DECISIONS.md`, Datei per `bilder.mjs reject` löschen, Code auf den Ersatz umstellen.
- Raphael-Nein zur **Methode** → eine Observation im task-observer-Log (Zielskill `web`), kein neuer Skill.
- **Kritik hat X übersehen** → Fehlzeile in `PRUEFGEGEN.md`; bei Wiederholung Zeile in `references/agentur-rubrik.md`.
- Geschmackskalibrierung an einer Referenz → `muster-bibliothek`.

## Evals

Alle Prüfer liegen in `evals/`; Umfang zeigt `node evals/run-eval-umfang.mjs`.
Vorschau-vor-Launch-Vertrag und Session-Gate hängen an
`evals/run-preview-vs-launch-check.mjs`. Referenz-Zuläufe:
`evals/run-kanon-pipeline-check.mjs` (Eingang → Case) und
`evals/run-x-bookmark-pipeline-check.mjs` (X-Bookmarks → Ledger).

## Geteilte Abhängigkeiten

- `/root/raphael-skills/skills/design/` (taste-kern, ui-ux-db-nutzung, impeccable-detektoren, design-doktrin, `design/scripts/detect.mjs`, `design/scripts/scan-ai-slop.mjs`)
- `/root/raphael-skills/skills/eigene/copywriting/` (`scripts/forbidden-check.py`, `/root/.claude/forbidden.md`)
- `/root/raphael-skills/skills/eigene/seo/`
- `/root/raphael-skills/skills/eigene/visual-aaa/` (terminales Pixel-Gate, nur über Pfad; nicht als Slash verlinkt)
- `/root/raphael-skills/skills/eigene/eval/` (nur über Pfad)
- `/root/raphael-command-center/ops/bin/raphael-preview`, `heal-secrets-acl.sh`
- `/root/tools/shots-verkleinern.sh` (Kacheln für Kritik-Leaves)

Aus dem Ablauf gestrichen, weil nicht mehr vorhanden: `web-anti-slop`,
`/root/tools/uikit-vault` (Archiv: `references/_archiv/vault-abhaengig/`),
`orchestrate` als Chip (ersetzt durch das Workflow-Tool).

## Versionierung und Rückverweise

Gepflegte Quelle: `/root/raphael-skills/skills/eigene/web`, verlinkt nach
`/root/.claude/skills/web`, `/root/.codex/skills/web`, `/root/.agents/skills/web`.
Vor jedem Umbau, der Pfade ändert: `grep -rl "<alter-pfad>" /root/raphael-brain/wiki`
und `python3 /root/raphael-brain/scripts/externe-pfade-check.py`; tote Ziele in
`/root/raphael-command-center/ops/review-inbox.md` melden (Observation 0004).
