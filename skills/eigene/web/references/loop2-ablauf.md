# Loop 2 — Ablauf im Detail

**Anfänger zuerst:** Auftrag wählen und nur nötige Dateien laden →
`anfaenger-pfad.md`. Diese Datei ist der Detail-Ablauf **nach** der Wahl.

## Reihenfolge

strategy → sitemap → copy → art-direction (design) → components → build → qa-faecher →
Launch (Signatur) → cro-learn.

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

- **G1 (immer zuerst):** `node …/design/scripts/detect.mjs` Exit 0 (nie `npx impeccable detect`),
  Lighthouse = 0, axe = 0, Link-Check, HTML-validate, Werkzeug-Gate, SEO-Head-Mindestmaß,
  Trust-Legal (Impressum/Datenschutz/404) — Details `qa-faecher.md` Fächer 1–6.
- **AI-Slop-Sequenz:** nur in `qa-faecher.md` (design detect + scan-ai-slop zuerst,
  dann copywriting G1→G2). Hier nicht noch einmal ausformulieren.
- **G2:** Copy sektionsweise gegen Rubrik `evals/rubrics/web.md`, Schwelle 0.7;
  Premium/Ship: Blind-A/B (`screenshot-kritik-loop.md` 3b) + Stichprobe `agentur-rubrik.md`.
- **G4 (Outcome):** echte Analytics (CVR, Scroll, Bounce) → CRO-Learning, korrigiert Rubriken.

## Build-Regeln

- `art-direction`: Tokens/Components vor Pages (`damien-design-methodik.md`);
  Sektion für Sektion / Image-first (`lexlin-design-prinzipien.md`).
- `components`: zuerst `tool-usecase-router.md` (Default+Install/Use+Gate),
  danach `resource-access.mjs show` **und** `open` für genau einen Namen — keine
  160-Link-Dumps. `open` ist Pflicht, bevor die Site als genutzt gilt. *verify:*
  Werkzeugtabelle in `client-<name>/web/art-direction.md` existiert, jede Zeile
  mit Router-Anker.
- `build`: *verify:* keine Dependency ohne Tabellenzeile —
  `node /root/raphael-skills/skills/eigene/web/scripts/werkzeug-gate.mjs <projekt>` Exit 0.
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
