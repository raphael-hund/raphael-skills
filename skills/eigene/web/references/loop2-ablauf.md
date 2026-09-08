# Loop 2 — Ablauf im Detail

**Anfänger zuerst:** Auftrag wählen und nur nötige Dateien laden →
`anfaenger-pfad.md`. Diese Datei ist der Detail-Ablauf **nach** der Wahl.

## Reihenfolge

strategy → sitemap → copy → **fold-duell (Welle 0, Raphael wählt den Look)** →
art-direction (design, fixiert die gewählte Richtung als Tokens) → components →
build → shot-sweep →
qa-faecher/G1 → visual-aaa/ship/v2 → run-evidence `validate --ready` →
Launch (Signatur) → cro-learn.

Fold-Duell (`fold-duell.md`) ist bei Neuaufbau/Redesign Pflicht und läuft **vor**
der Art-Direction: die Art-Direction schreibt die gewählte Richtung als Tokens
fest, sie erfindet den Look nicht. Parallel zum Duell nur SEO-Map, Copy, Assets.
Gate: `session-gate.mjs --rolle fold-duell` (PLAN.md-Abschnitt) und
`--rolle bau` (GO-Zeile «Fold-Duell» in DECISIONS.md).

## strategy — Unterschritt „Meaning-Capture-Artefakt"

Vor `sitemap`. Artefakt-Ort: `client-<name>/web/strategy.md`, Abschnitt `Meaning`.
Vier Pflicht-Fragen, schriftlich beantwortet:

- **(A) Für wen ist das?** — Zielgruppe konkret, keine Sammelbegriffe.
- **(B) Welches Problem löst es?** — Nutzenaussage in einem Satz.
- **(C) Welches Gefühl soll es kommunizieren?** — ein Vibe-Wort (premium, spielerisch,
  vertrauenswürdig, technisch, experimentell, …).
- **(D) Was soll es repräsentieren?** — Marken-Bedeutung, Werte.

Regel: aufschreiben, nicht denken. Die KI darf hier **nur Fragen stellen, nicht designen**.

*verify:* Pass = alle vier Fragen in `strategy.md` schriftlich beantwortet.
Fail = zurück vor `art-direction`, dort nicht weiterarbeiten.

*source:* Prinzip paraphrasiert nach Leon Lin, „How To Actually Design With AI" (2026).

## Gates

- **G1 Vorschau:** `detect.mjs` Exit 0, Shots gelesen, visuelles FAIL vor Fakten-Nit.
  Unklare Zahlen/Domain = `FAKT-GATE` (`scripts/preview-befund-klasse.mjs`).
- **G1 Launch:** plus Lighthouse = 0, axe = 0, Link-Check, HTML-validate, Werkzeug-Gate,
  SEO-Head-Mindestmaß, Trust-Legal (Impressum/Datenschutz/404) — Details `qa-faecher.md`
  Fächer 1–6. Trust-Zahlen und Custom-Domain gehören hierher, nicht in die Vorschau.
- **AI-Slop-Sequenz:** nur in `qa-faecher.md` (design detect + scan-ai-slop zuerst,
  dann copywriting G1→G2). Hier nicht noch einmal ausformulieren. G2-Copy-Judge
  erst bei Ship, nicht als Vorschau-Blocker.
- **G2:** Copy sektionsweise gegen Rubrik `evals/rubrics/web.md`, Schwelle 0.7;
  Premium/Ship: Blind-A/B (`screenshot-kritik-loop.md` 3b) + Stichprobe `agentur-rubrik.md`.
- **G4 (Outcome):** echte Analytics (CVR, Scroll, Bounce) → CRO-Learning, korrigiert Rubriken.

## Website-Plan-v3-Handoff

Wenn `website-plan/` Baukanon ist, vor `build` den v3-Validator ausführen.
Exit 0, `PLAN_VERIFIED=YES`, `plan-manifest.json` und ein PASS-Receipt in
`plan-verification.json` sind gemeinsam Pflicht. Receipt, Manifest-Hash und
aktuelle Plan-Hashes müssen zusammenpassen: `manifest_sha256` bindet das
aktuelle Manifest, die attestierten Plan-Hashes binden die aktuell
referenzierten Planartefakte. Jede Hash-Drift bleibt `BLOCKED`.

`web` bildet die Baupakete aus Route-Abhängigkeiten, Write-Sets und Shared
Owners: Abhängigkeiten oder überlappende Pfade erzwingen Reihenfolge, disjunkte
Pakete dürfen parallel laufen. Shared Files bleiben beim einzelnen Manifest-Owner.

## Run-Evidence-Handoff und Completion (U3/AE4)

`<run-out>/run-evidence.json` bindet den Wahrheitsvertrag (`truth`), den
Designvertrag (`design`), den Build und alle Abschlussbelege an genau einen Lauf.
Ein Website-Plan ist optional, solange die Lane keinen nennt; sobald er Baukanon
ist, gehören `plan`, sein v3-PASS-Receipt und die aktuellen Plan-Hashes zwingend
in denselben Handoff. Das run-isolierte Receipt liegt außerhalb des Ziel-Repos
und indexiert Evidence, ohne Controller-, Agenten- oder Unit-Fortschritt zu sein.

Verbindliche Übergabe:

1. Nach dem Einfrieren von `truth`, optionalem `plan` und `design` mit
   `run-evidence.mjs create` deren aktuelle Contract-SHA256 erfassen. Für eine
   Lane ohne Website-Plan gilt `plan.required=false`; ein genannter Plan ist
   fail-closed Pflicht.
2. Nach **jedem** Build `bind-build --revision <build_revision>` ausführen.
   `target.revision` ist die kanonische `build_revision`; der neue Build setzt
   alte `evidence.g1`, `evidence.sweep` und `evidence.ship` auf `null`. Damit
   sind alle früheren Capture-/QA-PASS für Completion invalidiert. Ein
   Plan-Receipt darf nur mit aktuellem Hash und derselben Revision zählen.
3. Nur aktuelle Receipts anhängen: optional/erforderlich
   `website-plan/verification/v3`, dann `web/shot-sweep/v2`,
   `web/g1-report/v2` und `visual-aaa/ship/v2`. Jedes Receipt trägt dieselbe
   `run_id` wie das Root-Receipt und dieselbe `build_revision` wie
   `target.revision`; `contracts[].sha256` und `evidence.*.sha256` müssen noch
   den aktuellen Contract- bzw. Receipt-Dateien entsprechen.
4. Abschluss erst nach
   `node /root/raphael-skills/skills/eigene/web/scripts/run-evidence.mjs validate --out <run-out> --ready`:
   Exit 0 plus `RUN_EVIDENCE=PASS`. `visual-aaa/ship/v1`, unbekannte Schemas oder
   Felder, partielles JSON, Misch-Runs, stale Revisionen und Hash-Drift bleiben
   `RUN_EVIDENCE=BLOCKED`; nie auf einen älteren PASS zurückfallen.

Details und die atomaren `create`/`bind-build`/`attach`/`validate`-Regeln:
`run-evidence-contract.md`.

## Build-Regeln

- `art-direction`: zuerst `stil-regeln.md` + 2–3 Cases aus
  `muster-bibliothek/INDEX.md`. `lexlin-design-prinzipien.md` und
  `damien-design-methodik.md` nur auf der Premium-Zeile, nicht Default.
- `components`: zuerst `tool-usecase-router.md` (Default+Install/Use+Gate),
  danach `resource-access.mjs show` **und** `open` für genau einen Namen — keine
  160-Link-Dumps. `open` ist Pflicht, bevor die Site als genutzt gilt. *verify:*
  Werkzeugtabelle in `client-<name>/web/art-direction.md` existiert, jede Zeile
  mit Router-Anker. Die Tabelle steht genau einmal zwischen
  `<!-- WERKZEUGTABELLE:START -->` und `<!-- WERKZEUGTABELLE:ENDE -->`.
- `build`: *verify:* keine Dependency ohne Tabellenzeile —
  `node /root/raphael-skills/skills/eigene/web/scripts/werkzeug-gate.mjs <projekt> --tabelle <pfad>/art-direction.md --profile node|static|cms` Exit 0. Genau eines
  der Profile `node`, `static`, `cms` wählen; nur `node` verlangt
  `package.json`, Quellen-/Icon-/Motion-Prüfungen bleiben profilübergreifend.
  Bei eigenem TypeScript/JavaScript zusätzlich `npx oxlint` Exit 0
  (`code-qualitaets-checkliste.md`, Skill `install-anti-slop`).
- Wer baut, ist nie wer reviewt; der Review läuft in einem unabhängigen Kontext
  und nach Möglichkeit über einen anderen Anbieter. Rollen: `agent-roster.md`.
- Assembly-Line: Copy → frischer Build-Kontext → frischer QA-Kontext. Kontext ist
  Verbrauchsgut; den passenden Reset-/Neustart-Mechanismus des aktuellen Hosts nutzen.

## Egress (Rot-Klasse Deploys)

Launch → deterministisches Bash-Gate (Domain-Whitelist, Ziel-Env) + `git commit -S` in
review-inbox. Nie autonomer Production-Deploy.

Git für Kunden-Sites: `vercel-git-deploy.md`. `origin` ist die Org. `personal` ist
der private Spiegel. Nach `main` auf `origin` läuft `/root/tools/git-personal-mirror.sh`.
Preview über Feature-Branch. Production nur nach Signatur. Plugin-Skills dort.

## Outputs (Zielpfade)

`client-<name>/web/strategy.md`, `.../web/sitemap.md`, `.../web/copy/`, `.../web/art-direction.md`,
`.../web/src/` (Build), `.../wiki/qa-<datum>.md`, `.../web/cro-<datum>.md`.
