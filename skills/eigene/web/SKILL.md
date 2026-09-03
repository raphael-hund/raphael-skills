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
  raphael-version: "0.31.0"
  raphael-class: "F"
  raphael-scope: "agency"
  raphael-sensitivity: "internal"
  raphael-loads: '["references/rolle-plan.md","references/rolle-kritik.md","references/rolle-bau.md","references/rolle-launch.md","references/kritik-matrix.md","references/anfaenger-pfad.md","references/stil-regeln.md","references/muster-bibliothek/INDEX.md","references/load-graph.md","references/loop2-ablauf.md","references/planner-executor-protokoll.md","references/sitemap-section-planung.md","references/qa-faecher.md","references/landingpage-struktur.md","references/informationsarchitektur.md","references/web-clone-playbook.md","references/rebuild-from-image.md","references/bildgenerierung.md","references/ui-components/INDEX.md","references/motion-doktrin.md","references/ui-layouts-catalog.md","references/cro-diagnose.md","references/experiment-programm.md","references/conversion-elemente.md","references/code-qualitaets-checkliste.md","references/security-audit-playbook.md","references/domain-safe-browsing-checkliste.md","references/readonly-db-rolle.md","references/design-systeme-vergleich.md","references/radix-shadcn-tailwind-stack.md","references/remotion-produktionsweg.md","references/screenshot-kritik-loop.md","references/tool-usecase-router.md","references/frontend-referenzbibliothek.md","references/inspirations-quellen.md","references/lexlin-design-prinzipien.md","references/damien-design-methodik.md","references/agentur-rubrik.md","references/agent-roster.md","references/run-evidence-contract.md","references/templates/PRUEFGEGEN-template.md","references/templates/statistics-page-template.html"]'
  raphael-requires-skills: '["copywriting@^0","design@^0","eval@^0","seo@^0","visual-aaa@^1","web-anti-slop@^0"]'
  raphael-completion-criteria: '["Rolle in einem Satz benannt (Plan|Kritik|Bau|Launch), genau ein Rollen-Dokument aus der Rollen-Tabelle geladen und vor dem ersten Edit die Auftrag-Zeile aus references/anfaenger-pfad.md 1 benannt — nur die dort gelisteten Dateien, nie die ganze loads-Liste", "session-gate.mjs mit --rolle und --client am Sessionstart gelaufen; Exit 2 heisst zurueck an die Vorsession, nicht weiterbauen", "Drei Phasen Plan/Kritik/Bau in einem Chat, Zustand auf Platte; Kritik-Flotte nach kritik-matrix.md samt Profil und drei Ausgaengen; PRUEFGEGEN.md vor Kritik; ohne KRITIK-n.md kein Bau", "Parent duenn: kein CSS/TSX-Edit, kein PNG-Read im Parent; jedes PNG liest ein Kritik-Leaf, Parent fuehrt nur das Shot-Ledger (pfad | viewport | gelesen-von | verdict) in STATUS.md", "Bau-Phase startet im ersten Turn einen Dynamic Workflow; Copy schreibt ein eigener Copy-Leaf (Profil: rolle-bau.md), der Integrator baut sie unveraendert ein; /cost-Zeile mit Datum steht in STATUS.md", "Kunden-Vorschau blockt nur an Ablauf/Sitemap/Idee/Design; Inhalt und Domain parken als content-park/ops-park bzw. FAKT-GATE (scripts/preview-befund-klasse.mjs), nie als biggest_gap", "Ohne frischen shot-sweep --base nach einem Fix = nicht geprueft; Kritik-Befund lebt nur nach der Merge-Regel aus kritik-matrix.md: zwei unabhaengige Leaves, oder eine Linse mit deterministischem Gate-Beleg (SEO onpage-check.mjs, Copy G0/G1, Trust PROOF.md)", "Launch nur mit allen Gates aus references/rolle-launch.md gruen und Raphaels Signatur plus Deploy-Egress-Gate; Launch-Details werden dort geprueft, nicht hier"]'
---

# web — Loop 2: Website

Diese Datei ist ein **Router**, kein Handbuch. Sie sagt dir, welche Session du
bist und welche eine Datei du dafür lädst. Alles Weitere steht dort.

## Was Raphael tippt

- Website bauen / ändern / relaunchen / clonen → `/web`
- Website planen, noch nichts bauen → `/web` (Rolle Plan). Nicht
  `/website-plan`, nicht `/ce-plan`, nicht 12 Plan-Skills.
- Website-Kritik / Look / Conversion sichtbar prüfen → `/web` + `/orchestrate`
  (Rolle Kritik). Nicht `/design` + `/impeccable` + `/unslop` + `/visual-harness`.

Was du **nicht** sagst: Skill-Listen. `unslop`, `web-anti-slop`, `no-ai-slop`,
`deslop-*`, `poteto`, `impeccable`, `ui-ux-pro-max`, `taste`, `frontend-design`,
`visual-aaa`, `visual-harness`, `grilling`, `wayfinder`, `lovable`, `plan-tune`,
`plan-design-review`, `plan-ceo-review`, `ce-plan`, `review-animations`,
`higgsfield` sind interne Spezialisten oder andere Türen. `web` lädt, was es
braucht.

Ausnahme, kein Dump: Kritik- und Bau-Phase **müssen** `/web` plus
`/orchestrate` fahren. `/ultracode` zusätzlich ist redundant.

## Welche Phase bin ich? (ein Pflicht-Load)

Sag die Rolle in einem Satz an, lade **genau ein** Dokument, arbeite dort weiter.

| Rolle | Chips | Pflicht-Load | Fertig heißt |
|---|---|---|---|
| **Plan** | nur `/web` | `references/rolle-plan.md` | `PLAN.md` + `PRUEFGEGEN.md` stehen, Copy-Briefing drin |
| **Kritik** | `/web` + `/orchestrate` | `references/rolle-kritik.md` | `KRITIK-n.md` mit überlebender Fixliste + Shot-Ledger |
| **Bau** | `/web` + `/orchestrate` | `references/rolle-bau.md` | Fixliste umgesetzt, Re-Sweep grün, `STATUS.md` aktuell |
| **Launch** | wie Bau | `references/rolle-launch.md` | alle Launch-Gates grün, Raphaels Signatur liegt vor |

Jede Rolle startet mit dem Gate:

```bash
node /root/raphael-skills/skills/eigene/web/scripts/session-gate.mjs \
  --rolle plan|kritik|bau --client /root/clients/client-<name>/web/handoff
```

Exit 0 = frei, Exit 2 = gesperrt (dann zurück an die Vorsession, nicht selbst
weiterbauen). Launch läuft unter `--rolle bau`.

Bist du unsicher, welche Rolle: der Handoff-Prompt sagt es. Fehlt er, ist es
Plan.

## Rote Linien (universell, gelten in jeder Rolle)

1. **Drei Phasen in einem Chat** (Raphael 02.09.2026). Plan / Kritik / Bau sind
   drei Workflow-Phasen, nie zwei gleichzeitig offen. Zustand lebt auf Platte in
   `/root/clients/client-<name>/web/handoff/` (`PLAN.md`, `PRUEFGEGEN.md`,
   `STATUS.md`, `KRITIK-n.md`), nie nur im Verlauf.
2. **`session-gate.mjs` am Start jeder Session.** Ohne `PRUEFGEGEN.md` keine
   Kritik, ohne `KRITIK-n.md` kein Bau.
3. **Parent bleibt dünn.** Der Parent/Controller editiert keine CSS-/TSX-Datei
   und liest keine PNG-Binaries. Jedes PNG liest ein **Kritik-Leaf**; der Parent
   führt nur das **Shot-Ledger** (`pfad | viewport | gelesen-von | verdict`).
   **Bau-Session = Controller** und startet im ersten Turn einen Dynamic
   Workflow.
4. **Kritik-Flotte nur nach `references/kritik-matrix.md`** — Besetzung,
   Familien-Zählung und die drei Ausgänge stehen dort je Profil. Kein
   Ad-hoc-Kritiker ohne Achse. Wer baut, prüft nicht: Self-Review ist `BLOCKED`.
5. **Kunden-Vorschau ≠ Launch.** Vorschau-Blocker sind nur **Ablauf, Sitemap,
   Idee, Design**; alles andere parkt und ist nie `biggest_gap`. Klassen und
   Folgen: `references/rolle-kritik.md`. Klassifizierer:
   `node scripts/preview-befund-klasse.mjs "<befund>"` — Vorschau-`biggest_gap`
   nur bei `preview: block`. Launch bleibt hart, wenn erfundener Proof als echt
   rausginge.
6. **Copy schreibt nie der Integrator.** Copy kommt aus einem eigenen Copy-Leaf
   nach dem Briefing aus `PLAN.md` — wer ihn je Profil besetzt, steht in
   `references/rolle-bau.md`. Der Integrator baut sie unverändert ein und meldet
   Layoutkonflikte zurück, statt Text zu ändern.
7. **Screenshots sind der einzige Design-Beweis.** Kanonisch
   `scripts/shot-sweep.mjs` mit **Pflicht-`--base`** (ohne Flag Exit 2), über
   HTTP statt `file://`, 1440×900 Fold **und** 390×844 Mobil, `--static`;
   fullPage ist kein Kritik-Input. Ohne frischen Re-Sweep nach einem Fix = nicht
   geprüft. Schlägt der Sweep fehl: Standard-Skript fixen, nie ein
   Ad-hoc-Playwright-Skript.
8. **Launch nur mit Raphaels Signatur** plus deterministischem
   Deploy-Egress-Gate. Nie autonomer Production-Deploy; Zustimmung zum Ergebnis
   ist keine Freigabe für Commit, Push oder Deploy.
9. **Gates werden nicht umgebaut, um durchzukommen.** Blockt ein Hook, Gate
   oder fremder Skill die Session fälschlich, ist das ein **Befund** — als
   Blocker in `STATUS.md`/`DECISIONS.md` dokumentieren (was blockt, warum
   fälschlich, kleinster Fix-Vorschlag) und die eigene Arbeit im nicht
   blockierten Teil zu Ende bringen. Keine Session editiert Hooks, Validatoren
   oder fremde Skills, um ein Gate zu öffnen — auch nicht mit grünen Tests.
   Der Fix läuft über Raphael oder `skill-update`, nie nebenbei.

## Vor dem ersten Edit

1. `references/anfaenger-pfad.md` §1 — **eine** Auftrag-Zeile wählen, nur die
   dort genannten Dateien laden. Nicht die ganze loads-Liste.
2. Vor Art-Direction: `references/stil-regeln.md` (Sektor-Dials §1) + 2–3
   passende Cases aus `references/muster-bibliothek/INDEX.md`.
3. Projekt lesen: `/root/clients/client-<name>/wiki/ICP.md`, `OFFER.md`,
   `PROOF.md`, `VOICE.md` (Dossier Loop 1), `/root/raphael-brain/wiki/hot.md`.
4. Referenzen holen: `ls -lt /root/eingang | head -20`, bildhafte Dateien der
   letzten 7 Tage ansehen — Raphael legt sie dort ab, ohne sie zu erwähnen.
5. Auftrag + geladene Pfade in einem Satz nennen.

Alles Visuelle → Skill `design` (nicht hier neu erfinden). Was ein Site-Build
lädt und was nie: `references/load-graph.md`.

## Geteilte Abhängigkeiten

- `/root/raphael-skills/skills/design/references/taste-kern.md`
- `/root/raphael-skills/skills/design/references/ui-ux-db-nutzung.md`
- `/root/raphael-skills/skills/design/references/impeccable-detektoren.md`
- `/root/raphael-skills/skills/design/references/design-doktrin.md`
- `/root/raphael-skills/skills/design/scripts/detect.mjs`
- `/root/raphael-skills/skills/design/scripts/scan-ai-slop.mjs`
- `/root/raphael-skills/skills/methodik/code-review/references/owasp-checkliste.md`

## Owner-Lage

`web` ist der einzige Agency-Website-Workflow-Owner; `/web` und `/website-plan`
setzen die Web-Lane. `design` ist Specialist-Call, `visual-aaa` das terminale
Pixel-Gate, `visual-harness` eine alternative Lane, die einen gesetzten
Web-Owner nie überschreibt. Detail: `references/rolle-plan.md`
(Plan-Eingang, `website-plan`-v3-Vertrag, fail-closed) und
`references/kritik-matrix.md` (Besetzung je Profil, Instanz-Trennung).

**Präzedenz bei gesetztem Web-Owner:** Der Leaf-Vertrag schlägt die
Screenshot-Pflicht des `design`-Skills. `design` verlangt, nach jeder Änderung
zu rendern und das PNG per Read anzusehen — dieser Zyklus läuft hier im
**Kritik-Leaf**, nie im Controller. Die Pflicht entfällt nicht, sie wechselt den
Ort.

`web-anti-slop` ist immer mitgeladen und bündelt die Pflichtgates aus `design`,
`copywriting` und der Oxlint-Installation. `taste`, `impeccable`, `ui-ux`,
`kill-ai-slop`, `no-ai-slop`, `frontend-design`, `animate` sind **keine
Pflicht-Loads** — sie routen auf `design` bzw. `copywriting`.

## Loop-2 in einer Zeile

strategy → sitemap → copy → art-direction (**stil-regeln + 2–3 Cases zuerst**) →
components (Werkzeugtabelle) → build → shot-sweep → QA 1–4 ‖ dann SEO+Trust →
`visual-aaa` → run-evidence `validate --ready` → Launch (Signatur) → cro-learn.
Detail-Ablauf und Gates: `references/loop2-ablauf.md`.

## Feedback-Pfad (ohne Extra-Slash)

- Raphael-Nein zu einem Asset/Motiv/Muster → `DESIGN.md`/`DECISIONS.md`, Datei
  per `bilder.mjs reject` löschen, Code auf den Ersatz umstellen; gesperrter
  Pfad kommt auf der Route nicht mehr vor.
- Raphael-Nein zur **Methode** (falscher Plan, falsche Skills, schlechte Kritik)
  → EIN Lernpunkt in Pflichtform an `skill-update`, Zielskill `web`. Kein neuer
  Skill.
- **Kritik hat X übersehen** (Raphael fand es selbst) → die Fehlzeile in
  `PRUEFGEGEN.md` nachtragen; bei Wiederholung derselben Klasse zusätzlich als
  Zeile in `references/agentur-rubrik.md`.
- Geschmackskalibrierung an einer Referenz → `muster-bibliothek`, nicht neuer
  Skill.

## Reference-Routing

Vollständige Auftrag→Datei-Matrix (welche Datei wann, und was nie geladen
wird): `references/anfaenger-pfad.md` §8.

## Gotchas (kurz)

- **`shot-sweep` ohne `--base`** → Exit 2. Nie ohne echte Dev-URL, nie `file://`.
- **Design-G1** nur `node …/design/scripts/detect.mjs`, nie `npx impeccable detect`.
- **Paket `motion`**, Import `motion/react` — nie `framer-motion`.
- **Ein Icon-System**, Default Lucide. **Fonts** über die Adobe Fonts Library.
- **Keine Dependency ohne Zeile in der Werkzeugtabelle** (`werkzeug-gate.mjs`).
- **Lighthouse/axe = 0** hart für den Launch, nicht die Vorschau.
- **Haiku baut oder kritisiert keine Seite; Fable ist nie Subagent.**
- **`webdesigner-pro`** unter `~/.claude/skills/` = Fremdskill. Nie routen.
- **AAA hier = Agentur-Rubrik**, nicht WCAG AAA (WCAG bleibt AA).
- **Update an Bestandsseite = neuer Workspace/Worktree**, nie im Root-Checkout.
- **Inspiration nur über `scripts/inspiration.mjs`** (Refero Styles, Navbar Gallery, Magic UI, React Bits, 21st) — 21st-Code ist hinter Login, nie raten.

## Evals

Alle Prüfer liegen in `evals/`; Umfang und Fallzahlen zeigt
`node evals/run-eval-umfang.mjs`. Der Vorschau-vor-Launch-Vertrag und das
Session-Gate hängen an `evals/run-preview-vs-launch-check.mjs`.

Die beiden Referenz-Zuläufe haben je ein eigenes Gate:
`evals/run-kanon-pipeline-check.mjs` bewacht den Weg von `/root/eingang` über
`scripts/eingang-url-watch.mjs` in eine Case-Datei samt
`references/quellen-ledger.md`; `evals/run-x-bookmark-pipeline-check.mjs` den
Weg von `scripts/x-bookmarks-pull.mjs` in `references/x-bookmarks-ledger.md`.
Website-Kandidaten aus den Bookmarks sammelt
`references/muster-bibliothek/kandidaten.md` — ein Kandidat ist kein Case und
kein Urteil.
