---
name: web
description: >
  Dach-Skill für Website-/Landingpage-Projekte (Loop 2) — immer dann, wenn
  eine komplette Site entsteht oder als Ganzes überarbeitet wird: Strategie,
  Sitemap, Copy, Build, QA, CRO-Learning, Website-Referenzen nachbauen,
  Bild-Rebuild, UI-Motion-Komponenten, Tool-Use-Case-Router
  (Defaults/Install statt Linkliste) und kuratierte Frontend-Referenzen.
  UI-Detailarbeit (Polish, Motion, Slop-Scan) sitzt im design-Skill und
  wird von hier progressiv nachgeladen — nicht als Extra-Skills
  taste/impeccable/ui-ux/kill-ai-slop/animate/frontend-design.
  Trigger: "Website bauen", "Landingpage bauen",
  "Landingpage für einen Kunden", "Sitemap", "Webseite launchen", "CRO",
  "Referenzseite nachbauen", "Website clonen", "Popup/Lead-Magnet",
  "Screenshot nachbauen", "aus Bild bauen",
  "Website planen", "Website-Plan", "Landingpage planen",
  "Website-Kritik", "Website kritisieren", "kompletter Website-Plan".
metadata:
  raphael-version: "0.24.0"
  raphael-class: "F"
  raphael-scope: "agency"
  raphael-sensitivity: "internal"
  raphael-loads: '["references/anfaenger-pfad.md","references/stil-regeln.md","references/muster-bibliothek/INDEX.md","references/load-graph.md","references/loop2-ablauf.md","references/planner-executor-protokoll.md","references/sitemap-section-planung.md","references/qa-faecher.md","references/landingpage-struktur.md","references/informationsarchitektur.md","references/web-clone-playbook.md","references/rebuild-from-image.md","references/bildgenerierung.md","references/ui-components/INDEX.md","references/motion-doktrin.md","references/ui-layouts-catalog.md","references/cro-diagnose.md","references/experiment-programm.md","references/conversion-elemente.md","references/code-qualitaets-checkliste.md","references/security-audit-playbook.md","references/domain-safe-browsing-checkliste.md","references/readonly-db-rolle.md","references/design-systeme-vergleich.md","references/radix-shadcn-tailwind-stack.md","references/remotion-produktionsweg.md","references/screenshot-kritik-loop.md","references/tool-usecase-router.md","references/frontend-referenzbibliothek.md","references/lexlin-design-prinzipien.md","references/damien-design-methodik.md","references/agentur-rubrik.md","references/agent-roster.md","references/templates/statistics-page-template.html"]'
  raphael-requires-skills: '["copywriting@^0","design@^0","eval@^0","visual-aaa@^1","web-anti-slop@^0"]'
  raphael-completion-criteria: '["Anfänger-Pfad: vor erstem Edit Auftrag aus references/anfaenger-pfad.md §1 benannt + nur gelistete Dateien geladen", "Lighthouse/axe = 0 Fehler (G1, hart)", "Formular-Reihenfolge: Kontaktdaten zuletzt; Drop-off pro Slide gemessen (G1, hart)", "G2 auf jedem Ship-Copy-Block >= 0.7", "Kunden-Vorschau: visuelles FAIL vor Fakten-Nit; FAKT-GATE parkt Zahlen/Domain/SLA; Custom-Domain/Vercel ist Ops; G2-Copy und Trust-Fach-6 erst bei Launch", "Launch nur mit Raphaels Signatur + Deploy-Egress-Gate", "Bei Website-Referenz-Nachbau: Lizenz-Check aus web-clone-playbook.md dokumentiert vor Launch", "Bei components/art-direction/build mit UI-Tools: tool-usecase-router.md angewendet; Defaults+Install/Use dokumentiert; keine 160-Link-Dump-Antwort", "Messlatte-Szenario (Motion-Hero+Icons+Stock/FAQ): vier Default-Zeilen aus Router ohne Galerie-Dump", "Werkzeugtabelle in client-<name>/web/art-direction.md existiert vor dem ersten npm i; jede Zeile nennt Bedarf, Werkzeug, Befehl, Gate und Router-Anker; sie steht genau zwischen <!-- WERKZEUGTABELLE:START --> und <!-- WERKZEUGTABELLE:ENDE -->", "Keine Dependency in package.json ohne Zeile in der Werkzeugtabelle (Nachweis: node /root/raphael-skills/skills/eigene/web/scripts/werkzeug-gate.mjs <projekt> --tabelle <pfad>/art-direction.md --profile node|static|cms Exit 0; genau eines der Profile node, static, cms wählen)", "Custom-TS/JS: anti-slop eingerichtet und npx oxlint Exit 0 (Nachweis in qa-faecher Fach 4 + code-qualitaets-checkliste.md; CMS-only ausgenommen)", "Design-G1 nur via node design/scripts/detect.mjs (nie npx impeccable detect)", "shot-sweep immer mit --base <echte-Dev-URL> (ohne --base: Exit 2; kein stiller Default-Port)", "screenshot-kritik-loop inkl. Blind-A/B (3b) gegen Weltklasse-Referenz dokumentiert", "visual-aaa (G1 Exit 0 + visual-kritiker pass HIGH + visual-ship.json valid) — DoneClaim ohne Manifest verboten", "Completion/DoneClaim nur mit <run-out>/run-evidence.json: truth, optional genannter plan, design, Build sowie web/shot-sweep/v2, web/g1-report/v2 und visual-aaa/ship/v2 sind an dieselbe run_id und build_revision sowie aktuelle Contract-SHA256 gebunden; jeder neue Build invalidiert alte G1/Sweep/Ship-QA; visual-aaa/ship/v1, unknown oder stale = BLOCKED", "Launch: QA-Faecher 1-6 gruen und agentur-rubrik 1-25 oder Ausnahme; Vorschau: Fach 2 visuell gruen, Fakten-Nits als FAKT-GATE geparkt", "Multi-Agent-Web-Lauf: alle unabhängigen Analyse- und disjunkten Baupakete adaptiv bis zur Live-Kapazität; genau ein opus-builder integriert gemeinsame UI-Flächen; lokale reproduzierbare Fixes dürfen an Grok/Sol rotieren; Kritik risikobasiert aus fremden tatsächlichen Familien; kein Fable als Subagent, nie Haiku", "Raphael-Nein derselben Session steht in DESIGN.md/DECISIONS.md mit Route+Dateipfad; gesperrter Pfad kommt auf der Route nicht mehr vor (rg vor Ship)", "Blind-A/B: jedes Paar ZWEIMAL bewertet (Kandidat einmal A, einmal B, nicht zusammenhaengende IDs); widerspruechliche Laeufe als 'kein Befund (Positions-Bias)' gewertet, nie als Sieg", "Vor jeder Blind-Bewertung: echte Bildbreiten beider Shots gleich (identify -format '%w'); Abweichung = neu aufnehmen statt bewerten", "Screenshots eines statischen Builds ueber HTTP aufgenommen, nie ueber file://; je eine HTML-, CSS- und Bild-URL vorab mit HTTP 200 belegt", "Kritik-Auftrag nennt ACTUAL_BUILDER_FAMILY (tatsaechlich gelaufenes Modell); still auf die Builderfamilie umgeleitete Kritik ist BLOCKED und wird nicht als PASS verbucht", "Ist keine fremde Familie erreichbar: Sichtpruefung ausdruecklich als Eigenpruefung deklariert und der fehlende Fremdblick in DECISIONS.md als offen gefuehrt", "Kontexttiefe je Route gemessen (Absaetze ab 25 Woertern in <main>, FAQ ausgenommen); jede H2-Sektion mit >=4 Listenpunkten und 0 solchen Absaetzen hat einen Einleitungsabsatz von 45-80 Woertern"]'
---

# web — Loop 2: Website

## Was Raphael tippt

Was du sagst:

- Website bauen / ändern / relaunchen / clonen → `/web`
- Website planen, noch nichts bauen → `/web` (Modus plan). Nicht
  `/website-plan`, nicht `/ce-plan`, nicht 12 Plan-Skills.
- Website-Kritik / Look / Conversion sichtbar prüfen → `/web` (Modus kritik).
  Nicht `/design` + `/impeccable` + `/unslop` + `/visual-harness` + Anti-Slop-Liste.

Was du **nicht** sagst: Skill-Listen. `unslop`, `web-anti-slop`, `no-ai-slop`,
`deslop-*`, `poteto`, `impeccable`, `ui-ux-pro-max`, `taste`, `frontend-design`,
`visual-aaa`, `visual-harness`, `grilling`, `wayfinder`, `lovable`, `plan-tune`,
`plan-design-review`, `plan-ceo-review`, `ce-plan`, `review-animations`,
`higgsfield` sind interne Spezialisten oder andere Türen. `web` lädt, was es
braucht.

Drei Modi (erster Treffer, in einem Satz ansagen):

1. **plan** — Vertrag/Sitemap/Page-Specs, kein Production-Code. Interner
   Spezialist `website-plan` + Anfänger-Pfad-Zeile *Mehrseitige Website planen*.
   Fertig = v3-Validator PASS.
2. **kritik** — Live-URL oder Shots, `screenshot-kritik-loop`, `shot-sweep --base`,
   `design` intern, `visual-aaa` als Gate nicht als Owner. Fertig = Fixliste,
   keine neuen Skills.
3. **build** — bisheriger Loop2-Ablauf.

**Slash-Dump:** Stehen im Prompt viele `/skills`, gilt trotzdem nur `web`. Die
Liste nicht nachladen.

**Zwei-Session-Betrieb** (verbindlich, Raphael 01.09.2026): Raphael fährt
Planner- und Executor-Session getrennt. Übergaben laufen über das
Handoff-Format und die Truth-Dateien (`handoff/PLAN.md` als nie
zusammengefasstes Original, `STATUS.md`, `KRITIK-n.md`) aus
`references/planner-executor-protokoll.md`. Bei voller Session: Rotation
nach Protokoll — frische Session liest PLAN.md vollständig, nie nur eine
Zusammenfassung.

**Feedback-Pfad** (verbindlich, ohne Extra-Slash):

- Raphael-Nein zu einem Asset/Motiv/Muster → `DESIGN.md`/`DECISIONS.md` wie bisher.
- Raphael-Nein zur Methode (falscher Plan, falsche Skills, schlechte Kritik,
  nicht replizierbar) → EIN Lernpunkt in Pflichtform an `skill-update`, Zielskill
  `web`. Kein neuer Skill, kein `/autolearn` extra verlangen.
- Geschmackskalibrierung an einer Referenz → `muster-bibliothek`, nicht neuer Skill.

## Start hier (Anfänger zuerst)

1. Lies **`references/anfaenger-pfad.md`** — wähle **eine** Auftrag-Zeile (§1).
2. Lade **nur** die dort genannten Dateien. Nicht die ganze loads-Liste.
3. **Vor Art-Direction:** Sektor bestimmen (Dials in `references/stil-regeln.md`
   §1) + `references/stil-regeln.md` lesen + 2–3 passende Cases aus
   `references/muster-bibliothek/INDEX.md` laden.
4. Vor dem ersten Edit: Auftrag + geladene Pfade in einem Satz nennen.
5. Visuell? → Sweep mit **`--base`** (siehe Gotchas), jedes PNG per Read ansehen.
6. **Vorschau vor Launch (hart, 01.09.2026):** Raphael zeigt dem Kunden eine geile
   Vorschau. Das Bild entscheidet. Unklare Zahlen (50 vs 60 Google-Bewertungen,
   24 vs 28 Stunden) und Custom-Domain/Vercel sind **FAKT-GATE / Ops**, kein
   Design-Blocker und kein `biggest_gap`. Proof wird nicht erfunden. Klassifizierer:
   `node scripts/preview-befund-klasse.mjs "<befund>"` — Vorschau-`biggest_gap`
   nur bei `preview: block`.

Detail-Ablauf und Gates: `references/loop2-ablauf.md`.

**Lies zuerst (Projekt):**  
`/root/clients/client-<name>/wiki/ICP.md`, `OFFER.md`, `PROOF.md`, `VOICE.md`
(Dossier Loop 1), `/root/raphael-brain/wiki/hot.md`.  
Alles Visuelle → Skill **design** (nicht hier neu erfinden).

**Mitgeladene Skills (keine Extra-Dateien):** `web-anti-slop` ist immer aktiv
und bündelt die Pflichtgates aus `design` (Linien, Detektoren, `scan-ai-slop`),
`copywriting` (G1→G2) und der Anti-Slop-Oxlint-Installation bei Custom-TS/JS.
`taste`, `impeccable`, `ui-ux`, `kill-ai-slop`, `no-ai-slop`, `frontend-design` /
`design-taste-frontend`, `animate` sowie die sieben Spezialisten aus
`web-anti-slop` sind **keine Pflicht-Loads** — sie routen auf `design` bzw.
`copywriting` oder bleiben explizite Zweitmeinungen. Ein Site-Build lädt nicht
jedes Einzel-Skill.

## Zweck (1 Satz)

Aus dem Dossier eine konversionsstarke Website bauen. Die Kunden-Vorschau
entscheidet das Bild; Launch entscheidet die Fakten.

## Workflow-Owner

`web` ist der einzige Agency-Website-Workflow-Owner. `/web` und `/website-plan`
setzen die Web-Lane. `design` ist dort Specialist-Call, nicht Owner. Ohne
gesetzten Web-Owner bleibt `/design` eine explizite visuelle Harness-Lane.

`visual-aaa` ist das **terminale** Pixel- und DoneClaim-Gate (G1 Exit 0,
visual-kritiker, `visual-ship.json`) — kein zweiter Workflow-Owner. Ein
`visual-aaa`-Lauf ersetzt weder `web` noch den Planvertrag.

`visual-harness` ist eine explizite alternative Lane und darf einen bereits
gesetzten Web-Owner nie überschreiben. In der Web-Lane gelten `shot-sweep`, G1
und `visual-aaa` derselben Run-ID/Revision; `.claude/product-design.md` ist
kein Web-Abschluss. Ein reiner `/website-plan`-Lauf hat keine Capture-Pflicht.

## Lokale Vendor-Komponenten (offline zuerst)

Für diese zehn Quellen ist `resources/components/` die primäre Bezugsquelle.
Immer zuerst `resources/components/INDEX.md` und danach den Site-Index lesen;
die Live-Site ist nur ein optionaler Aktualitätscheck und darf nie die einzige
Quelle für Code, Beispiele oder Auswahl sein:

- `beautifului.dev` → `resources/components/beautifului/`
- `beui.dev` → `resources/components/beui-dev/`
- `rareui.com` → `resources/components/rareui/`
- `transitions.dev` → `resources/components/transitions-dev/`
- `ui.shadcn.com` → `resources/components/shadcn-ui/`
- `ui-skills.com` → `resources/components/ui-skills/`
- `coss.com/ui` → `resources/components/coss-origin-ui/`
- `designsystemchecklist.com` → `resources/components/design-system-checklist/`
- `reui.io/components` → `resources/components/reui/`
- `emilkowal.ski/ui/you-dont-need-animations` → `resources/components/emil-no-animations/`

`references/ui-components/` bleibt als vollständig separate, kuratierte beUI-v2-
Bibliothek erhalten: Sie ergänzt die Vendor-Snapshots mit geprüften Motion-
Bausteinen und Nutzungsregeln, ersetzt aber keinen der zehn lokalen Ordner.
Lizenz- und Provenienzangaben stehen jeweils im Site-Index und den lokalen
Lizenzdateien; bei unklarer oder restriktiver Lizenz nur intern referenzieren.

## Eingang aus `website-plan` (fail-closed)

Wenn ein Plan unter `website-plan/` als Baukanon genannt ist, beginnt `build`
nur nach einem aktuellen v3-Validatorlauf mit Exit 0 und
`PLAN_VERIFIED=YES`. Pflicht sind `plan-manifest.json` sowie ein
`plan-verification.json` im Schema `website-plan/verification/v3` mit
`status: PASS`.

Vor `build` müssen Receipt, Manifest-Hash und aktuelle Plan-Hashes
zusammenpassen: `manifest_sha256` entspricht dem aktuellen SHA-256 des
Manifests, und jeder vom Validator attestierte Plan-Hash entspricht dem
aktuellen SHA-256 des referenzierten Planartefakts. Ein vorhandener Receipt
ohne erneuten Abgleich von Manifest und Planartefakten reicht nicht.

`web` liest Route-Abhängigkeiten, Write-Sets und Shared Owners aus dem Manifest.
Abhängige oder überlappende Pakete laufen sequenziell; disjunkte Pakete dürfen
parallel laufen. Bei `OWNER-BLOCKER`, fehlenden Artefakten, doppelten Ownern,
Write-Set-Overlap, Manifest- oder Plan-Hash-Drift bleibt der Build `BLOCKED`;
Proof wird nicht erfunden. Unklare Zahlen und Custom-Domain sind `FAKT-GATE`,
kein `OWNER-BLOCKER` — sie halten `PLAN_VERIFIED` und die Vorschau nicht auf.

## Run-Evidence-Handoff (Completion, fail-closed)

`<run-out>/run-evidence.json` ist der einzige run-isolierte Completion-Index
außerhalb des attestierten Git-Baums. Er bindet die Kette Wahrheitsvertrag
(`truth`) → optionaler, falls genannter Website-Plan (`plan`) → Designvertrag
(`design`) → Build → `web/shot-sweep/v2` → `web/g1-report/v2` →
`visual-aaa/ship/v2`. Das Receipt ist kein Controller, Scheduler oder
Fortschritts-Tracker; der Ablauf bleibt beim `web`-Owner.

Bei `create` werden `truth` und `design` als Contracts mit aktuellem SHA-256
erfasst. Nur wenn die Lane einen Website-Plan nennt, sind zusätzlich `plan`,
der v3-PASS-Receipt und dessen aktuelle Hashes Pflicht; ohne genannten Plan
bleiben `plan.required=false` und `plan.path=null` zulässig. Nach jedem Build
friert `bind-build` dessen Revision als `target.revision` ein. Jeder neue Build
invalidiert alte G1-, Sweep- und Ship-QA; ein noch referenzierter Plan-Receipt
zählt nur mit passendem Hash **und** derselben neuen Revision.

Vor Completion werden Plan (falls Pflicht), Shot, G1 und Ship per `attach`
indexiert. Ihre `run_id` muss der Root-`run_id` entsprechen, ihre
`build_revision` der `target.revision`, jede `contracts[].sha256` dem aktuellen
Contract-SHA256 und jeder Evidence-Hash der aktuellen Receipt-Datei. Misch-Runs,
Hash-Drift, stale Revisionen, partielles/unknown JSON sowie
`visual-aaa/ship/v1` sind `BLOCKED`; v1 bleibt nur historische Lesbarkeit.
Completion/DoneClaim ist erst bei Exit 0 und `RUN_EVIDENCE=PASS` erlaubt:

```bash
node /root/raphael-skills/skills/eigene/web/scripts/run-evidence.mjs \
  validate --out <run-out> --ready
```

Details: `references/run-evidence-contract.md`.

## Workspace-pro-Version (Raphael 10.08.2026, bindend für Bestandsseiten)

Update an einer bestehenden Site = immer neuer Workspace/Worktree von `main`
(in Codex: neuer Worktree). Name egal, umbenennen
erlaubt. `main` trägt nur flache Squash-Commits.

- **Gefällt Raphael** → EIN Squash-Commit auf `main` (`git merge --squash`)
  vorschlagen. Zustimmung zum Ergebnis ist KEINE Commit-Freigabe: Commit,
  Push und Deploy je nur auf ausdrückliche Freigabe für genau diese Aktion.
  Danach Workspace + Branch löschen.
- **Gefällt nicht** → Workspace + Branch ersatzlos löschen UND das Abgelehnte
  als Verboten-Eintrag in Root-`DESIGN.md`/`DECISIONS.md` schreiben. Erst dann
  gilt das Nein als eingearbeitet.
- **Raphael-Nein in derselben Session** (ein Asset, ein Motiv, ein Muster):
  sofort Route + Dateipfad + Ersatz in `DESIGN.md`/`DECISIONS.md` schreiben,
  Datei per `bilder.mjs reject` löschen, Code auf den Ersatz umstellen.
  Gesperrter Pfad darf auf dieser Route nicht mehr vorkommen. Ein späterer
  Workspace-Kill ersetzt das nicht. Beleg 17.08.2026: Haushaltsauflösung
  sollte Illustration, live blieb `hero-polo-dokumentar.webp`, weil die
  Ausnahme vom 13.08. das Foto festhielt.
- Historie/Archiv-Ordner sind KEINE Quelle: nichts aus `git log`, alten Plänen
  oder Chat-Handoffs wieder einbauen. Was nicht im aktuellen Code, in
  `DESIGN.md` oder in den **lebenden** Truth-Dateien
  `/root/clients/client-<name>/web/handoff/{PLAN.md,STATUS.md}`
  (planner-executor-protokoll.md) steht, ist verworfen. Die Truth-Dateien
  sind Autorität, weil sie aktiv gepflegt werden — abgelöste `KRITIK-n.md`
  und Chatverläufe bleiben bloße Evidenz. Muster-Repo: Wilhelm-Bedachung
  (`CLAUDE.md` dort).
- Nie alte Workspaces liegen lassen; nie parallel im Root-Checkout bauen.

## Worker-Besetzung (Raphael 14.08.2026 — ersetzt 05.08.)

Eine Seite entsteht als adaptive Flotte mit einem Integrator, nicht als isolierter Einzel-Agent:

| Job | Wer | Nie |
|---|---|---|
| Gemeinsamer Seitenbau, Layout, UX, Copy-Integration | **genau ein `opus-builder` als Integrator** | konkurrierende Integratoren; Haiku; Luna als Seiten-Builder; Kimi als Default-Integration |
| Unabhängige UI-Analyse / disjunkte Komponenten | mehrere `opus-builder` innerhalb Live-Kapazität | dieselbe Datei gleichzeitig ändern; Gesamtstand integrieren |
| Lokaler reproduzierbarer Frontend-Bug | `grok-worker`/`grok-fixer` oder `sol-builder`, eignungsbasiert rotiert | Redesign, Greenfield, gemeinsame Integration |
| Visuelle Kritik derselben Seite | fremde tatsächliche Familien, standardmäßig Grok + `kimi-recherche` nach Opus-Bau | eigene Builderfamilie; Code schreiben; Haiku; Luna als Urteil |
| Code-Ursache / Ship-Review | **`sol-pruefer`** (Textausschnitt, keine Bildpfade) | visuelle Meinung ohne Code; Screenshot-Pfade an Sol |

Die zwei visuellen Kritiker laufen zuerst unabhängig. Danach bekommt jeder die Befunde des anderen und darf nur **bestätigen oder widerlegen** — das ist der Gegencheck. Fixliste = überlebende Befunde, nicht Mehrheit einer Familie.

Kimi bleibt erlaubt für Recherche, großen Kontext und Zweitstimme, nicht als Default-Seitenintegrator. Luna übernimmt Masse/Mechanik, Grok lokale Fixes, Sol präzise technische Arbeit und Review. Mapping und Parallelität: `agent-roster.md`; Kritik-Ablauf: `screenshot-kritik-loop.md` + `orchestrierung.md`.

### Sol-geführte UI-Lane (Raphael 20.08.2026)

Für substanzielle UI-Neubauten oder einen roten Design-Stand darf Sol die Arbeit
vor dem Opus-Bau führen. Die Lane hat zwei Host-Varianten:

1. **Sol ist das aktive Cockpit:** Sol liest Ziel, Bilder und Ist-Stand,
   schärft Kriterien und koordiniert alle echten unabhängigen Opus-Pakete bis zur Live-Kapazität.
2. **Claude ist das aktive Cockpit:** Das Cockpit erstellt dasselbe Briefing
   selbst und delegiert nach derselben Policy an Opus.

Das Cockpit zerlegt in unabhängige Analyse- und disjunkte Baupakete, zum Beispiel
Hierarchie, responsive Verhalten, Interaktion und Accessibility. Alle bereiten
konfliktfreien Pakete laufen adaptiv parallel. Genau ein `opus-builder` integriert
den beschlossenen Stand in die Zielseite. Schreibarbeit bleibt disjunkt oder läuft in Worktrees.
Danach gelten G1, Shot-Sweep und das familienfremde Kritik-Panel unverändert.

**Wenn keine fremde Familie erreichbar ist (hart).** Erst am Proxy prüfen, welche
Familien wirklich antworten, statt einen `agentType` zu setzen und zu hoffen. Wird ein
angeforderter Kritiker still auf die Builderfamilie umgeleitet, ist sein Urteil
**Self-Review und damit BLOCKED** — auch wenn er ein sauberes PASS zurückgibt.
Zulässige Auflösung, in dieser Reihenfolge:
1. Rollenkompatiblen Fallback aus `CLI-PROXY-STABILITY.md` nehmen und den Wechsel
   sichtbar als `FALLBACK` kennzeichnen.
2. Ist keiner erreichbar: Familien **beim Bauen** tauschen statt beim Prüfen — das
   nächste Paket baut eine andere Familie, dann prüft die vorige.
3. Geht auch das nicht: Sichtprüfung als **Eigenprüfung** deklarieren und den
   fehlenden Fremdblick in DECISIONS.md als offen führen. Eine Eigenprüfung als
   Fremdkritik auszugeben ist der schwerere Fehler.

**Provenienz mitgeben, sonst blockiert der Kritiker zu Recht.** Jeder Kritik-Auftrag
nennt `ACTUAL_BUILDER_FAMILY` (tatsächlich gelaufenes Modell, nicht nur der
angeforderte `agentType`). Fehlt sie, kann der Kritiker die Review-Matrix nicht prüfen
und muss abbrechen — das ist korrektes Verhalten, kein Agentenfehler. Bei Audits an
*gewachsenem Bestand* zusätzlich dazusagen, dass es kein Review eines frischen
Geschwister-Builds ist.

Fable ist als Subagent nicht zugelassen. Die Zerlegung macht Sol oder das
Cockpit selbst und delegiert direkt an Opus.

## Reference-Routing — welche Datei wann

| Anliegen | Datei |
|---|---|
| Erster Einstieg / Auftrag wählen | `references/anfaenger-pfad.md` |
| Kunden-Vorschau vs Launch (Fakten-Nits parken) | `scripts/preview-befund-klasse.mjs` + Anfänger-Pfad Zeile **Kunden-Vorschau** |
| **Stil-Regeln Go/No-Go (Pflicht vor Art-Direction)** | `references/stil-regeln.md` + `references/muster-bibliothek/INDEX.md` |
| Look / Muster / „wie soll das aussehen" | `references/stil-regeln.md` + `references/muster-bibliothek/INDEX.md` |
| Welche Skills lädt ein Site-Build (und welche nie) | `references/load-graph.md` |
| Referenzseite einlernen (Geschmack-Training) | `references/muster-bibliothek/_template.md` |
| Loop-2 Reihenfolge, Meaning-Capture, Gates, Output-Pfade | `references/loop2-ablauf.md` |
| Ads-Landing: eine Aktion, Formular-Reihenfolge | `references/landingpage-struktur.md` |
| Mehrseitige Sitemap + Section-Plan (Pflicht-Format) | `references/sitemap-section-planung.md` |
| IA-Wissen (Nav, URLs, Linkgraph) | `references/informationsarchitektur.md` |
| Rollen / agentType / Parallel | `references/agent-roster.md` |
| Tools/Defaults statt Link-Dump | `references/tool-usecase-router.md` |
| QA 6 Fächer + Formular-G1 | `references/qa-faecher.md` |
| AAA Visual/SEO/Trust (≠ WCAG AAA) | `references/agentur-rubrik.md` |
| Screenshots + Kritik-Panel + Blind-A/B | `references/screenshot-kritik-loop.md` |
| Premium Landing-Regeln (15) | `references/lexlin-design-prinzipien.md` |
| Foundations→Components→Composition | `references/damien-design-methodik.md` |
| URL-Referenz nachbauen + Lizenz | `references/web-clone-playbook.md` |
| Bild/Screenshot nachbauen | `references/rebuild-from-image.md` |
| Higgsfield / GPT Image 2 | Skill `higgsfield` zuerst; CLI-Katalog `references/bildgenerierung.md` |
| Neue Illustration vs. bestehendes Asset; Inhalt+Stil referenzieren (Map/Dresden-Fall) | Skill `higgsfield` + `references/bildgenerierung.md` Abschnitt **Neue Illustration vs. wiederverwenden** |
| Motion-Regeln | `references/motion-doktrin.md` |
| Copy-paste Motion-UI (beUI v2, ergänzende kuratierte Bibliothek) | `references/ui-components/INDEX.md` |
| Lokale Vendor-Komponenten aller zehn Quellen | `resources/components/INDEX.md`, dann `resources/components/<site>/INDEX.md` |
| Default-Stack Next/Tailwind/shadcn/`motion` | `references/radix-shadcn-tailwind-stack.md` |
| Popup/Lead-Magnet | `references/conversion-elemente.md` |
| CRO Bestandsseite | `references/cro-diagnose.md` |
| A/B-Programm | `references/experiment-programm.md` |
| Security Formulare/Supply-Chain | `references/security-audit-playbook.md` |
| Custom-Code gegen AI-Slop + Oxlint anti-slop (nach Build) | `references/code-qualitaets-checkliste.md` |
| Junge Domain vor Launch | `references/domain-safe-browsing-checkliste.md` |
| Statistik-Linkbait HTML | `references/templates/statistics-page-template.html` |
| Vercel-Git, Remotes Org+privat, Plugin-Skills | `references/vercel-git-deploy.md` |
| Adobe Fonts Library | `node scripts/adobe-fonts-kit.mjs show Fieldwork` |
| Genau eine Ressource nach Router-Wahl (exakte Groß-/Kleinschreibung) | `show` = lokale Metadaten; **Pflicht danach:** `node scripts/resource-access.mjs open "<exakter Name>"` öffnet die Katalog-URL und liest die Site. URL-Dump allein zählt nicht als Nutzung. |
| 160er-Katalog (nur nach Router-Zeile, max 3 URLs) | `references/frontend-referenzbibliothek.md` |

Vollständige Auftrag→Datei-Matrix inkl. „nicht laden“: `anfaenger-pfad.md`.

## Portabilitätsvertrag

- Koordination hält Plan, Freigaben, Abschlussbeweis.
- Rollen = Fähigkeiten, keine fest verdrahteten Provider.
- Nur Host-Werkzeuge nutzen; fehlende nie vortäuschen.
- Hintergrund-Jobs nur auf Nutzer-Wunsch; Gates (Egress, Screenshot, Abschluss) immer.

## Screenshot-Pflicht (hart)

Design wird **nur** an Screenshots entschieden. Kanonischer Capture-Weg ist
Playwright über `scripts/shot-sweep.mjs`. Chrome-CLI und `raphael-chrome`
sind kein Ersatz für den Sweep.

```bash
node /root/raphael-skills/skills/eigene/web/scripts/shot-sweep.mjs \
  --base http://127.0.0.1:<PORT> \
  --out /tmp/<projekt>-shots \
  --routes /
```

- **Shot-Standard (Audit 23.08.2026):** Fold-Viewports **1440×900 (Desktop)** UND **390×844 (mobil)**. Kein fullPage als Kritik-Input — fullPage höchstens als Übersichts-Anhang. Danach 1440×1500 @ 750 px Scroll, sequentiell pro Seite, Hover+Klick-Pass, `--static` für Kritik — **nie** fullPage / captureBeyondViewport als Kritik-Material.
- Animationen deaktivieren (`--static`: reduced-motion + addStyleTag `animation/transition: none`) **und** `networkidle` + Fonts abwarten — sonst leere Reveal-Sektionen im Shot.
- **Zustands-Shots pro interaktiver Komponente sind Pflicht:** Hover (echtes `page.hover`, Sweep-Stufe `--states`), Fokus, offenes Menü, Fehler-/Ladezustand. Jede Karte/jedes Grid: mindestens 1 Hover-Shot.
- **Mobile (390×844): ALLE geänderten Routen sweepen**, nicht nur die Startseite (`--mobile`).
- **`--base` Pflicht** (ohne Flag: Exit 2). Früherer Default-Port 5280 entfällt.
- Jeder Shot: Playwright `page.screenshot`, `animations: 'disabled'`, `caret: 'hide'`. Fonts und Seite sind vor dem Shot gesetzt.
- Stabile Screenshots: wiederholbar, nicht leer, Viewport-Vertrag 1440×900 im Fold. Nach Änderung am Sweep: Screenshots testen mit `node evals/run-shot-stable-check.mjs`.
- Jedes PNG per Read ansehen; nach jedem Fix **alle** betroffenen Routen erneut.
- **Statisches Build nie über `file://` aufnehmen (hart).** Absolute Asset-Pfade
  (`/assets/...`) zeigen unter `file://` ins Dateisystem-Root: CSS und Bilder fehlen,
  der Shot zeigt unformatiertes HTML — und sieht auf den ersten Blick nur „kaputt“
  aus, nicht „falsch gemessen“. Immer über HTTP servieren, z. B.
  `python3 -m http.server <port> --directory <dist>`; vor dem Sweep mit
  `curl -o /dev/null -w '%{http_code}'` je **eine** HTML-, CSS- und Bild-URL auf 200
  prüfen. Ein Shot ohne CSS ist kein Beleg, sondern ein stiller Fehlschlag.
- **Ein Browser-Prozess pro Aufnahme, nicht pro Lauf.** Lange Sessions über viele
  Seiten sterben mit `Target page, context or browser has been closed` an wandernder
  Stelle. Jede Aufnahme in einem eigenen Prozess mit `timeout` starten; nach jeder
  Aufnahme **eigene** Browser-Leichen ernten. Belegt 01.09.2026: 3 Läufe gescheitert,
  Ursache waren 13 verwaiste Chromium-Prozesse aus Vorläufen.
  *Nie pauschal `pkill -9 chrome`* — der MCP-Browser-Dienst läuft unter eigenem Nutzer
  und wird sonst mitgerissen. Erst `ps -eo user,comm | grep chrom` prüfen, dann
  nutzerscharf beenden.
- **`networkidle` braucht einen Fallback.** Seiten mit Dauer-Polling erreichen ihn nie
  und reißen den ganzen Lauf mit. Muster: `networkidle` versuchen, bei Timeout auf
  `domcontentloaded` + feste Wartezeit zurückfallen — der Viewport bleibt gleich, der
  Vergleich also gültig.
- Kritik bekommt nur `manifest.json` + PNGs. Ablauf: `screenshot-kritik-loop.md`.
- Plan-Mockups sind Soll; Web-Screenshots sind Ist. Build-QA erfasst pro betroffener
  Route Desktop/Mobile sowie relevante Normal-, Loading-, Empty-, Error- und
  Success-Zustände. Reveal-Zwischenstände, unklare Cookie-/Datenzustände und
  Full-Page-Captures ohne lesbare Section-Zuordnung sind kein PASS.
- Motion-Abnahme prüft Trigger, Element, Dauer, Easing, Stagger und
  `prefers-reduced-motion` gegen den Planvertrag; ein statisches Bild allein
  beweist keine funktionierende Animation.

## Look & QA (design = einzige Design-Quelle)

| Aufgabe | Linie | Referenz |
|---|---|---|
| Landing/Kampagne | taste + Dial-Override aus stil-regeln §1 (taste-kern 8/6/4 gilt nicht) | design → `/root/raphael-skills/skills/design/references/taste-kern.md` |
| App/Dashboard | ui-ux | design → `/root/raphael-skills/skills/design/references/ui-ux-db-nutzung.md` |
| Design-G1 | impeccable | `node /root/raphael-skills/skills/design/scripts/detect.mjs` Exit 0 (Detektoren: `/root/raphael-skills/skills/design/references/impeccable-detektoren.md`) |
| Doktrin | fusioniert | design → `/root/raphael-skills/skills/design/references/design-doktrin.md` |

**AI-Slop-Sequenz (ein Satz-Ort, Detail `qa-faecher.md`):** design ZUERST
(`detect.mjs` Exit 0 **und** `/root/raphael-skills/skills/design/scripts/scan-ai-slop.mjs` mit `--rules=…/rules.de.mjs`
bei deutschem Text) → danach copywriting G1→G2. Nie `npx impeccable detect`.
Einzel-Skills `taste`/`impeccable`/`kill-ai-slop` dafür nicht extra laden.

## Landingpage (Kurz)

- Eine Aktion; Formular **im Fold** eingebettet.
- Mikro-Commitments → **Kontaktdaten zuletzt** (G1).
- Big Idea → FAQ/„Für wen“ → Testimonials → Details.
- Testimonials: Video/Screenshot, Menge nicht wegkürzen.  
Detail: `landingpage-struktur.md`.

## Ablauf (Detail: `loop2-ablauf.md`)

1. **strategy** — Ziel/Pfad; Meaning A–D schriftlich (`strategy.md`).
2. **sitemap** — Landing → `landingpage-struktur.md`; Multi-Page → `sitemap-section-planung.md` (Abnahme dort bindend).
3. **copy** — sektionsweise. Vorschau: Working-Copy plus `FAKT-GATE` für offene
   Zahlen. copywriting G2-Judge erst bei Ship.
3b. **Referenzen holen (Pflicht, nicht optional)** — vor jeder Stilentscheidung:
   `ls -lt /root/eingang | head -20`; bildhafte Dateien der letzten 7 Tage per
   Read ansehen. Raphael legt Referenzen dort ab, ohne sie im Prompt zu
   erwähnen — Nichterwähnung heißt nicht Nichtvorhandensein. Verwendetes kommt
   in den Abschlussbericht; ist nichts relevant, steht dort in einem Satz warum.
4. **art-direction** — **Pflicht-Load zuerst: `references/stil-regeln.md` +
   `references/muster-bibliothek/INDEX.md`** (2–3 passende Cases laden).
   Erst dann design-Skill; G1 = `detect.mjs`. Premium: lexlin + damien.  
   Im Build zitiert jede Section eine Regel-ID oder einen Case; QA gleicht
   gegen das Regelbuch ab. Neue Referenzseiten laufen durch
   `references/muster-bibliothek/_template.md` → INDEX → Regel-Kandidaten.  
   URL-Vorlage → `web-clone-playbook.md` zuerst. Bild-Vorlage → `rebuild-from-image.md`.  
   Assets → Grafik-Baum im Router, dann Skill `higgsfield` (`bildgenerierung.md` = CLI).  
   `imagegen-web`/`imagegen-mobile` = **kein Default** (nur Host+Router).
   **Trust-/Social-Proof-Logos laufen NICHT über higgsfield:** Marken-Logos
   (Google, ProvenExpert, TÜV, Trusted Shops, Partner-Badges) nie generieren,
   sondern als Original beschaffen — 1. offizielles Brand-Kit des Anbieters,
   2. `vectorlogo.zone`/`simpleicons.org` (SVG), 3. CDN/Wikimedia. SVG schlägt
   PNG. Nach CLAUDE.md §10 ist „rechtlich heikel“ kein Blocker und keine
   Rückfrage: holen, einbauen, maximal ein Satz Hinweis im Abschlussbericht.
5. **components** — 5a Bedarf → 5b Router-Zeile → 5c bei einer der zehn
   Vendor-Quellen **zuerst lokal** `resources/components/INDEX.md`, dann den
   zugehörigen `resources/components/<site>/INDEX.md` und nur die benötigten
   Payload-Dateien lesen. Die lokale Kopie ist die Bezugsquelle; ein Live-Abruf
   ist nur für einen ausdrücklich nötigen Aktualitätsvergleich zulässig, nie
   Voraussetzung für Auswahl oder Übernahme. Für andere Katalogressourcen gilt
   weiter: genau einen Namen mit `scripts/resource-access.mjs show "<Name>"`
   nachschlagen und danach mit `scripts/resource-access.mjs open "<Name>"`
   öffnen. → Abweichung belegt → **5d Werkzeugtabelle** in `art-direction.md`.
   Ohne Tabelle kein `npm i`.
   Inspiration App/Flows: Mobbin. MCP oft OFF — Status
   `/root/tools/raphael-mcp-ondemand.sh status`, dann `raphael-chrome` oder
   AgentReach. Nie Fake-Browse.
6. **build** — nur Tabellen-Zeilen installieren; **gemeinsame Seite integriert `opus-builder`**.
   Bei substanziellem UI-Neubau oder rotem Design-Stand darf die Sol-geführte
   UI-Lane Brief und Pakete vorbereiten. Alle unabhängigen Opus-Analysen und
   disjunkten Baupakete laufen bis zur Live-Kapazität; genau ein `opus-builder`
   integriert. Lokale reproduzierbare Bugs dürfen an Grok/Sol rotieren. Review
   nutzt andere tatsächliche Familien und richtet Breite nach Risiko und
   Informationswert (`screenshot-kritik-loop.md` §3). Kein Fable, nie Haiku. Security/OWASP bei Formularen/Consent
   (`/root/raphael-skills/skills/methodik/code-review/references/owasp-checkliste.md`).
   Echtes Custom-UI → `code-qualitaets-checkliste.md` (inkl. Oxlint `anti-slop`
   bei TS/JS).
7. **qa-faecher** — Vorschau: Fächer 1–4 (Fach 2 = Screenshot-Loop). Launch:
   plus 5 SEO + 6 Trust. Premium/Ship: Blind-A/B 3b. Fach 4 = `werkzeug-gate.mjs`
   + bei Custom-TS/JS `npx oxlint` Exit 0.
8. **Launch** — Signatur + Deploy-Egress-Gate. Nie autonom. Junge Domain → Safe-Browsing-Checkliste.  
   Git/Vercel: `references/vercel-git-deploy.md` (`origin`=Org, `personal`=raphael-hund).
9. **cro-learn** — nur echte Analytics (G4).

## Loop-2 (verbindlich, eine Zeile)

strategy → sitemap → copy → art-direction (**stil-regeln + 2–3 Cases zuerst**) →
components (Tabelle) → build → QA 1–4 ‖ dann SEO+Trust → Launch (Signatur) →
cro-learn.

## Gotchas

- **Fakten-Nit statt Bild.** 50 vs 60 Google-Bewertungen, Custom-Domain noch
  nicht an Vercel, 24 vs 28 Stunden — das ist `FAKT-GATE` / Ops, kein
  `biggest_gap` und kein Vorschau-Blocker. Klassifizierer:
  `scripts/preview-befund-klasse.mjs`. Wenn die Seite behindert aussieht, ist
  DAS die Lücke. Proof bleibt unbelegt nicht erfinden.
- **Anfänger lädt alles** → falsch. Nur `anfaenger-pfad.md` §1.
- **`shot-sweep` ohne `--base`** → Exit 2 (Usage); nie ohne echte Dev-URL.
- **`shot-sweep` schlägt fehl → Standard-Skript fixen, NIE eigenes Ad-hoc-Playwright-Skript schreiben.** Forensik 10.08.2026: beide Fehl-Sessions wichen nach einem Fehler/aus Bequemlichkeit auf eigene Skripte aus (12-Shot-Cap, kein Hover/Klick, kein Static) — genau das ist verboten. Auch alte `scratch/shot-*.cjs`-Skripte im Projekt nie wiederverwenden.
- **Kritik nur auf selbst angesehene Shots.** „Jedes PNG per Read" ist wörtlich: Read-Aufrufe auf PNGs müssen die Shot-Zahl decken, Agent-Berichte ersetzen das nicht.
- **`webdesigner-pro`** unter `~/.claude/skills/` = Fremdskill (Mac-Pfade). Nie routen; Kanon = `web` + `design`.
- **Design-G1** nur `node …/design/scripts/detect.mjs`, nie `npx impeccable detect`.
- **Tools** über `tool-usecase-router.md`, nicht Link-Dumps (max 3 URLs aus Bibliothek).
- **Paket `motion`**, Import `motion/react` — nie `framer-motion`.
- **Ein Icon-System**, Default Lucide.
- **Fonts:** Immer die **Adobe Fonts Library** nutzen. Seite lädt über Kit-Embed. Nachschlagen: `node scripts/adobe-fonts-kit.mjs show <Familie>`. Keine Adobe-`.woff` ins Skill-Repo. Nur Kunden-Brand-Dateien gehen vor.
- **Lighthouse/axe = 0** hart; Fertig = Environment-Tatsache.
- Build ≠ Review (Regel 8). Deploy = Rot + Signatur.
- **Haiku baut oder kritisiert keine Seite.** Builder = Opus. Kritiker = Grok + `kimi-recherche` (Gegencheck). Sol für Code, keine Shots. Opus prüft Opus nicht. Codex-CLI (`codex` auf PATH) ist optionaler Ship-Review, kein Pflicht-Wrapper. Fehlt die CLI: ehrlich sagen, nicht vortäuschen.
- **GitHub öffentlich ≠ frei nutzbar** — Lizenz-Check im Clone-Playbook.
- Junge Domain + Formular = Safe-Browsing-Risiko.
- Motion ohne `useReducedMotion` = Fail.
- Bilder: Skill `higgsfield`, CLI in `bildgenerierung.md`; AVIF + Index; `reject` löscht Datei+Index.
- Raphael sagt Nein zu einem sichtbaren Asset: DESIGN/DECISIONS-Sperre **und**
  `reject` **und** Code-Pfad weg. Nur Datei löschen reicht nicht.
- Art-Direction ohne `stil-regeln.md` + Cases = improvisierter Geschmack → Fail.
  Eine NO-GO-Regel ohne Detektor ist nur Prosa; was checkbar ist, wandert in
  `craft-check.mjs`/`scan-ai-slop.mjs`.
- AAA hier = Agentur-Rubrik, nicht WCAG AAA (WCAG bleibt AA).

## Evals (Umfang)

run-eval-umfang.mjs — 48 Evals
`node evals/run-adobe-fonts-check.mjs`   # 34 Faelle
`node evals/run-shot-stable-check.mjs`   # 20 Faelle
`craft-check.mjs` hat **23 echte Pruefstellen**.
**7 von 10** zusammengesetzten Widgets.

- "evals/run-adobe-fonts-check.mjs"
- "evals/run-shot-stable-check.mjs"
- "evals/run-eval-umfang.mjs"
- "evals/run-site-build-load-path-check.mjs"
- "evals/run-preview-vs-launch-check.mjs"
- "evals/run-resource-open-check.mjs"
"48 weitere Pruefer-Evals"
