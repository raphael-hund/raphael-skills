# Loop 2 — Ablauf im Detail

## Reihenfolge

strategy → sitemap → copy → art-direction (design) → components → build → qa-faecher →
Launch (Signatur) → cro-learn.

## Gates

- **G1 (immer zuerst):** impeccable-46, Lighthouse = 0, axe = 0, Link-Check, HTML-validate.
- **G2:** Copy sektionsweise gegen Rubrik `evals/rubrics/web.md`, Schwelle 0.7.
- **G4 (Outcome):** echte Analytics (CVR, Scroll, Bounce) → CRO-Learning, korrigiert Rubriken.

## Build-Regeln

- `components`: zuerst `tool-usecase-router.md` (Default+Install/Use+Gate),
  danach optional `frontend-referenzbibliothek.md` nur für Alternativen — keine
  160-Link-Dumps. *verify:* Werkzeugtabelle in `client-<name>/web/art-direction.md`
  existiert, jede Zeile mit Router-Anker.
- `build`: *verify:* keine Dependency ohne Tabellenzeile —
  `node scripts/werkzeug-gate.mjs <projekt>` Exit 0.
- Wer baut, ist nie wer reviewt; der Review läuft in einem unabhängigen Kontext
  und nach Möglichkeit über einen anderen Anbieter.
- Assembly-Line: Copy → frischer Build-Kontext → frischer QA-Kontext. Kontext ist
  Verbrauchsgut; den passenden Reset-/Neustart-Mechanismus des aktuellen Hosts nutzen.

## Egress (Rot-Klasse Deploys)

Launch → deterministisches Bash-Gate (Domain-Whitelist, Ziel-Env) + `git commit -S` in
review-inbox. Nie autonomer Production-Deploy.

## Outputs (Zielpfade)

`client-<name>/web/strategy.md`, `.../web/sitemap.md`, `.../web/copy/`, `.../web/art-direction.md`,
`.../web/src/` (Build), `.../wiki/qa-<datum>.md`, `.../web/cro-<datum>.md`.
