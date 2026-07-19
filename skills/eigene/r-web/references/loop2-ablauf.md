# Loop 2 — Ablauf im Detail

## Reihenfolge

strategy → sitemap → copy → art-direction (r-design) → components → build → qa-faecher →
Launch (Signatur) → cro-learn.

## Gates

- **G1 (immer zuerst):** impeccable-46, Lighthouse = 0, axe = 0, Link-Check, HTML-validate.
- **G2:** Copy sektionsweise gegen Rubrik `evals/rubrics/web.md`, Schwelle 0.7.
- **G4 (Outcome):** echte Analytics (CVR, Scroll, Bounce) → CRO-Learning, korrigiert Rubriken.

## Build-Regeln

- Wer baut (Terra/Sol) ist nie wer reviewt (Cross-Vendor `/codex:review`, andere Familie).
- Assembly-Line: Copy → `/clear` → Build → `/clear` → QA. Kontext ist Verbrauchsgut.

## Egress (Rot-Klasse Deploys)

Launch → deterministisches Bash-Gate (Domain-Whitelist, Ziel-Env) + `git commit -S` in
review-inbox. Nie autonomer Production-Deploy.

## Outputs (Zielpfade)

`client-<name>/web/strategy.md`, `.../web/sitemap.md`, `.../web/copy/`, `.../web/art-direction.md`,
`.../web/src/` (Build), `.../wiki/qa-<datum>.md`, `.../web/cro-<datum>.md`.
