# VENDORING.md — Herkunfts-Protokoll (raphael-skills)

Zentrales Protokoll aller vendorierter (kopierter/adaptierter) Skills und Rollen-Templates.
Regel: Vendoring **nur** aus den von Raphael benannten Repos unter `/root/tools/vendor/`.
Bei jeder Übernahme: SessionStart-Hooks entfernt, Auto-Update-Mechanik gekappt, Telemetrie/
Env-Hinweise dokumentiert. Der Fusions-Skill `skills/r-design/` hat sein eigenes, detaillierteres
`r-design/VENDORING.md` (impeccable + taste + ui-ux) — hier nicht dupliziert.

Erlaubte Quellen (und nur diese): **superpowers** (obra), **mattpocock/skills**, **gstack**
(garrytan), **last30days-skill** (mvanhorn), **andrej-karpathy-skills**.
NICHT vendored (nur als Doku-Verweis erlaubt, kein Code übernommen): steipete/agent-scripts,
anthropics/skills, SkillSpector.

Übernahme-Datum: **2026-07-19**. Alle Commits per `git -C /root/tools/vendor/<repo> rev-parse HEAD`
zum Übernahme-Zeitpunkt verifiziert.

## Quellen-Commits

| Quelle | Upstream | Commit | Lizenz |
|---|---|---|---|
| superpowers | github.com/obra/superpowers | `d884ae04edebef577e82ff7c4e143debd0bbec99` | siehe Repo (permissiv) |
| mattpocock/skills | github.com/mattpocock/skills | `9603c1cc8118d08bc1b3bf34cf714f62178dea3b` | siehe Repo (permissiv) |
| gstack | github.com/garrytan/gstack (Klon) | `a3259400a366593e0c909dd9ac3e59752efd2488` | MIT |
| last30days-skill | github.com/mvanhorn/last30days-skill | `249c7a4c040558a903d6838dee31012980d4946d` (v3.16.0) | MIT |
| andrej-karpathy-skills | github.com/(andrej-karpathy-skills) | `2c606141936f1eeef17fa3043a72095b4765b9c2` | MIT |

---

## 1. skills/methodik/ — Dev-Kern (superpowers + mattpocock)

Prosa-Workflows, auf Deutsch kondensiert, auf unser Frontmatter-Schema gebracht (name,
version, description, completion_criteria). Superpowers-/mattpocock-interne Hilfsskripte,
SessionStart-Hooks, Plugin-/Auto-Update-Mechanik und `setup-*-skills`-Verweise wurden entfernt;
Cross-Verweise auf andere Skills durch unsere `r-*`-Entsprechungen ersetzt. Keine Fremdskripte
kopiert (reine Methode). Alle `validate-skill.py`-grün.

| Skill | Herkunft | Upstream-Pfad | Commit |
|---|---|---|---|
| `r-brainstorm` | superpowers | `skills/brainstorming` | d884ae04 |
| `r-plan` | superpowers | `skills/writing-plans` | d884ae04 |
| `r-sdd` | superpowers | `skills/subagent-driven-development` | d884ae04 |
| `r-tdd` | superpowers | `skills/test-driven-development` | d884ae04 |
| `r-finish` | superpowers | `skills/finishing-a-development-branch` | d884ae04 |
| `r-grill` | mattpocock | `skills/productivity/grilling` (+ `grill-me`) | 9603c1cc |
| `r-to-spec` | mattpocock | `skills/engineering/to-spec` | 9603c1cc |
| `r-tickets` | mattpocock | `skills/engineering/to-tickets` | 9603c1cc |
| `r-handoff-ext` | mattpocock | `skills/productivity/handoff` | 9603c1cc |
| `r-research` | mattpocock | `skills/engineering/research` | 9603c1cc |
| `r-code-review` | **Fusion** (siehe unten) | superpowers requesting+receiving-code-review · mattpocock engineering/code-review | d884ae04 / 9603c1cc |
| `r-writing-skills` | **Fusion** (siehe unten) | mattpocock writing-great-skills · superpowers writing-skills | 9603c1cc / d884ae04 |
| `r-debug` | **Fusion** (siehe unten) | mattpocock engineering/diagnosing-bugs · superpowers systematic-debugging | 9603c1cc / d884ae04 |

### Aufgelöste Kollisionen

- **`r-code-review` (code-review doppelt).** Basis: superpowers `requesting-code-review` +
  `receiving-code-review` — gewählt, weil sie zusammen den vollen Zyklus (Anfordern UND
  Empfangen/Zurückweisen) abdecken, was die mattpocock-Variante allein nicht tut. Die
  mattpocock-Version (`engineering/code-review`, Zwei-Achsen Standards-vs-Spec mit parallelen
  Subagents + Fowler-Smell-Baseline) ist als `references/zwei-achsen-review.md` eingearbeitet.
- **`r-writing-skills` (writing-skills doppelt).** Basis: mattpocock `writing-great-skills` —
  gewählt, weil dessen Begriffe (Informationshierarchie, Completion-Criterion, Invocation-Kosten)
  direkt auf unser `completion_criteria`-Schema + `validate-skill.py` passen. Die superpowers-
  Version (`writing-skills`, harte TDD-für-Skills-Gates) ist als `references/tdd-fuer-skills.md`
  eingearbeitet.
- **`r-debug` (Debug-Disziplin zweifach belegt).** Beide Quellen decken unabhängig denselben
  Kern ab (enger pass/fail-Loop vor Hypothesen, Root Cause vor Fix); zu **einem** Skill
  fusioniert statt zweier (Quellenreview 2026-07-19, Teil B). Aus mattpocock
  `engineering/diagnosing-bugs` kommt die Loop-Disziplin, aus superpowers
  `systematic-debugging` die Iron Law (kein Fix ohne Root Cause; nach 3 Fehlversuchen
  Architektur hinterfragen). Liegt unter `skills/eigene/r-debug/`.
- **`handoff` vs. vorhandenes `eigene/r-handoff`.** Nicht ersetzt. Unser `r-handoff` bleibt das
  Session-interne Git-Ritual (PROGRESS/DECISIONS, Commit+Push, hartes `/clear`); die mattpocock-
  Variante wurde als eigenständiges `r-handoff-ext` (Übergabe an eine FREMDE Instanz: Subagent/
  anderes Tool/externe Person) vendored, das am Kopf auf `r-handoff` verweist.
- **`research`.** Kein echter Code-Konflikt in den erlaubten Quellen (nur mattpocock hat es);
  als `r-research` vendored. Der Harness-eigene `deep-research`-Skill bleibt davon unberührt
  (kein Fremdcode übernommen).

---

## 2. agents/ — Rollen-Templates (gstack)

Aus gstack **nur die Rollen-Definitionen** (Aufgabenzuschnitt) als Subagent-Templates
übernommen — KEIN gstack-Code, KEINE Concurrency-Limits. gstack führt die Rollen als
Slash-Commands (`/spec`, `/review`, `/qa`, `/retro`, `/ship`); wir gießen den Rollen-Schnitt in
`.md`-Templates mit **explizitem Modell + Effort** (KLARER-PLAN Kap. 3 / `ops/ROUTING.md`).

| Template | gstack-Rolle | Modell | Effort |
|---|---|---|---|
| `agents/pm.md` | `/spec` + `/office-hours` (CEO/PM) | Fable | Standard |
| `agents/engineer.md` | `/implement` | Sonnet (Bulk: Terra) | Standard (Terra: high) |
| `agents/reviewer.md` | `/review` | Sol (GPT-5.6) | medium |
| `agents/qa.md` | `/qa` + `/qa-only` | Luna (GPT-5.6) | high |
| `agents/retro.md` | `/retro` | Kimi K3 (1M) | high |

Cross-Vendor-Prinzip abgesichert: Builder (Sonnet) wird von anderer Familie (Sol/Luna GPT)
geprüft. gstack @ a3259400.

---

## 3. skills/imported/r-last30days/ — (last30days-skill, mvanhorn)

Vollständige Engine vendored: `scripts/` (2 MB, self-contained Python, keine Netz-Installer),
`references/save-html-brief.md`, `agents/openai.yaml`, `LICENSE.upstream` (MIT). Der 14 MB große
`assets/`-Ordner (Demo-Medien) wurde bewusst **nicht** mit-vendored — die Engine referenziert ihn
nicht.

Angepasst gegenüber Upstream:
- **Frontmatter** auf unser Schema gebracht (name=`r-last30days`, version=`3.16.0`, description,
  `completion_criteria`); `requires_env: [SCRAPECREATORS_API_KEY]` gesetzt.
- **Auto-Update-Reset entfernt:** Der komplette Block „STEP 0: STALE-CLONE SELF-CHECK" wurde
  gelöscht. Er diente dazu, einen von Claude Code nach **origin/main** auto-zurückgesetzten
  Marketplace-Klon zu erkennen. Diese Auto-Update-/origin-main-Reset-Mechanik ist verboten
  (AGENTS.md Regel 11: alle Auto-Update-Pfade). Wir betreiben genau EINE vendored Kopie (per
  Symlink), es gibt keinen konkurrierenden Klon, der still zurückgesetzt würde. (Der später im
  Body erwähnte „STEP 0 - RESOLVE HOST WEB SEARCH FIRST" ist ein ANDERER Schritt und blieb.)
- **Voraussetzung / Gotcha dokumentiert:** `SCRAPECREATORS_API_KEY` als primäre Env
  (`~/.secrets/api-keys.env`, TODO-RAPHAEL Punkt 6). Ohne Key laufen nur keyless/degradierte
  Quellen. Weitere optionale Keys (OPENAI/XAI/BRAVE/APIFY …) sind optional und bleiben ungesetzt.
  Consent-Dialog muss vor dem ersten externen Abruf erscheinen (Upstream-Bug-Hinweis).

---

## 4. skills/eigene/r-codex-first/ + r-kimi-first/ — SELBST GESCHRIEBEN

**Kein Fremdcode.** Eigene SKILL.md + eigenes Bash-Helper-Skript je Skill. Funktionsweise laut
KLARER-PLAN/ROUTING: Prompt → Temp-Datei → `codex exec --profile sol|terra|luna -C <repo>`
(Profile aus `/root/.codex-1/config.toml`; Sol=medium, Terra/Luna=high) bzw. `(cd <repo> &&
kimi -p "$(cat $PROMPTFILE)")` → Output-Datei → Claude reviewt den Diff streng, fährt Tests
selbst, behält den Merge. Fallback-Ketten dokumentiert: Codex Seat 1→2, Kimi Abo 1→2
(`KIMI_HOME_2`). Kein `danger-full-access`/`approval_policy=never` (Regel 11).

---

## 5. andrej-karpathy-skills — KEIN Skill-Install

Nur die 4 Prinzipien (Think Before Coding, Simplicity First, Surgical Changes, Goal-Driven)
kondensiert/übersetzt als Doktrin-Abschnitt in `raphael-command-center/AGENTS.md` übernommen —
kein Skill vendored. Quelle: `skills/karpathy-guidelines/SKILL.md` @ 2c606141 (MIT).

---

## Telemetrie / Env-Hinweise

- **last30days:** liest optionale Provider-Keys aus der Env (SCRAPECREATORS/OPENAI/XAI/BRAVE/
  APIFY/PERPLEXITY/…). Nur `SCRAPECREATORS_API_KEY` ist praktisch nötig; alle anderen bleiben
  ungesetzt → die zugehörigen Quellen werden sauber übersprungen. Keys wie Secrets behandeln
  (chmod-600-Env, nie in Git — `tools/secret-scan.sh`).
- **superpowers/mattpocock/gstack methodik:** keine Laufzeit-Env/Telemetrie (reine Prosa).
- **Codex/Kimi-Helfer:** keine eigene Telemetrie; nutzen die vorhandenen CLI-Logins
  (OAuth-Abo-Abrechnung, nie `ANTHROPIC_API_KEY`/`--bare`).

## Update-Pfad (künftig)

1. Upstream in `/root/tools/vendor/<quelle>` mit `git pull` aktualisieren, neuen Commit hier
   nachtragen.
2. Betroffene `r-*`-SKILL.md gegen neue Upstream-Regeln diffen; entfernte Hooks/Auto-Update-
   Pfade erneut kappen.
3. `python3 tools/validate-skill.py` + `python3 tools/build-index.py` grün laufen lassen.
