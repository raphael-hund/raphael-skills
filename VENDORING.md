# VENDORING.md — Herkunfts-Protokoll (raphael-skills)

Zentrales Protokoll aller vendorierter (kopierter/adaptierter) Skills und Rollen-Templates.
Regel: Vendoring **nur** aus den von Raphael benannten Repos unter `/root/tools/vendor/`.
Bei jeder Übernahme: SessionStart-Hooks entfernt, Auto-Update-Mechanik gekappt, Telemetrie/
Env-Hinweise dokumentiert. Der Fusions-Skill `skills/design/` hat sein eigenes, detaillierteres
`design/VENDORING.md` (impeccable + taste + ui-ux) — hier nicht dupliziert.

Erlaubte Quellen (und nur diese): **humanizer** (blader), **kill-ai-slop** (yetone),
**anti-ai-slop-writing** (jalaalrd), **distribb-skill** (Bomx), **qwoted-seo-backlinks-skill**
(Bomx), **no-mistakes** (kunchenguid), **coreyhaines/marketingskills** (coreyhaines31),
**shadcn/improve**, **emilkowalski/skills**, **vercel-labs/skills**, **starc007/ui-components**,
**claude-skill-web-clone** (Jane-xiaoer), **openui** (wandb), **ui-layouts/mcp**,
**oh-my-openagent** (code-yeongyu), **davidondrej/skills**, **jakubkrehel/skills**,
**conradcaffier-gist** — alle am 2026-07-20 von Raphael explizit benannt (zweite
Vendoring-Runde, siehe unten) — sowie weiterhin **superpowers** (obra), **mattpocock/skills**,
**gstack** (garrytan), **last30days-skill** (mvanhorn), **andrej-karpathy-skills** (erste Runde,
2026-07-19); **claude-seo** (AgriciDaniel), **claude-ads** (AgriciDaniel),
**knowledge-work-plugins** (anthropics) — dritte Vendoring-Runde, 2026-07-20, von Raphael aus
der Web-Recherche-Kandidatenliste freigegeben (siehe „Vendoring-Runde 3" unten).
NICHT vendored (nur als Doku-Verweis erlaubt, kein Code übernommen): steipete/agent-scripts,
anthropics/skills, SkillSpector.

**OFFENE FREIGABE (Runde 5, 2026-07-20, noch NICHT auf dieser Allowlist bestätigt):**
**trailofbits-skills**, **claude-code-owasp** (agamm), **webdesigner-pro** — vendoriert unter
„Vendoring-Runde 5" unten, aber bisher nicht von Raphael als benannte Quelle freigegeben (Regel
Zeile 4: „nur aus den von Raphael benannten Repos"). Besonders **trailofbits-skills steht unter
CC-BY-SA-4.0** (Share-Alike/Copyleft) — die erste Copyleft-Lizenz in allen bisherigen Runden
(bisher nur MIT/Apache/Sustainable-Use/keine). Share-Alike kann eine Pflicht auslösen, die
abgeleitete Datei (`skills/eigene/web/references/security-audit-playbook.md`) unter derselben
Lizenz (CC-BY-SA-4.0) weiterzugeben bzw. mit Namensnennung zu versehen — bloße Attribution reicht
unter Share-Alike-Regimes unter Umständen NICHT aus. Analog zum oh-my-openagent-Sonderfall (siehe
Sustainable-Use-Hinweis oben, Zeile 179 der Runde-2-Tabelle): diese drei Quellen und speziell die
CC-BY-SA-4.0-Implikation für `security-audit-playbook.md` müssen von Raphael noch explizit
geprüft und freigegeben werden, bevor sie als reguläre Allowlist-Einträge gelten. Bis dahin: kein
stiller Vollzug, offene Entscheidung.

**OFFENE FREIGABE (Runde 6, 2026-07-20, noch NICHT auf dieser Allowlist bestätigt):**
**AgriciDaniel/claude-blog** — vendoriert unter „Vendoring-Runde 6" unten, aber bisher nicht
von Raphael als benannte Quelle explizit freigegeben (Regel Zeile 4). MIT-Lizenz, also
lizenzrechtlich unproblematisch für normale Destillation — die offene Frage ist rein die
Namens-Freigabe analog Runde 5, nicht die Lizenz. Bis Raphael das bestätigt: gilt als
vendoriert, aber nicht regulär gelistet.

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
| `brainstorm` | superpowers | `skills/brainstorming` | d884ae04 |
| `plan` | superpowers | `skills/writing-plans` | d884ae04 |
| `sdd` | superpowers | `skills/subagent-driven-development` | d884ae04 |
| `tdd` | superpowers | `skills/test-driven-development` | d884ae04 |
| `finish` | superpowers | `skills/finishing-a-development-branch` | d884ae04 |
| `grill` | mattpocock | `skills/productivity/grilling` (+ `grill-me`) | 9603c1cc |
| `to-spec` | mattpocock | `skills/engineering/to-spec` | 9603c1cc |
| `tickets` | mattpocock | `skills/engineering/to-tickets` | 9603c1cc |
| `handoff-ext` | mattpocock | `skills/productivity/handoff` | 9603c1cc |
| `research` | mattpocock | `skills/engineering/research` | 9603c1cc |
| `code-review` | **Fusion** (siehe unten) | superpowers requesting+receiving-code-review · mattpocock engineering/code-review | d884ae04 / 9603c1cc |
| `writing-skills` | **Fusion** (siehe unten) | mattpocock writing-great-skills · superpowers writing-skills | 9603c1cc / d884ae04 |
| `debug` | **Fusion** (siehe unten) | mattpocock engineering/diagnosing-bugs · superpowers systematic-debugging | 9603c1cc / d884ae04 |

### Aufgelöste Kollisionen

- **`code-review` (code-review doppelt).** Basis: superpowers `requesting-code-review` +
  `receiving-code-review` — gewählt, weil sie zusammen den vollen Zyklus (Anfordern UND
  Empfangen/Zurückweisen) abdecken, was die mattpocock-Variante allein nicht tut. Die
  mattpocock-Version (`engineering/code-review`, Zwei-Achsen Standards-vs-Spec mit parallelen
  Subagents + Fowler-Smell-Baseline) ist als `references/zwei-achsen-review.md` eingearbeitet.
- **`writing-skills` (writing-skills doppelt).** Basis: mattpocock `writing-great-skills` —
  gewählt, weil dessen Begriffe (Informationshierarchie, Completion-Criterion, Invocation-Kosten)
  direkt auf unser `completion_criteria`-Schema + `validate-skill.py` passen. Die superpowers-
  Version (`writing-skills`, harte TDD-für-Skills-Gates) ist als `references/tdd-fuer-skills.md`
  eingearbeitet.
- **`debug` (Debug-Disziplin zweifach belegt).** Beide Quellen decken unabhängig denselben
  Kern ab (enger pass/fail-Loop vor Hypothesen, Root Cause vor Fix); zu **einem** Skill
  fusioniert statt zweier (Quellenreview 2026-07-19, Teil B). Aus mattpocock
  `engineering/diagnosing-bugs` kommt die Loop-Disziplin, aus superpowers
  `systematic-debugging` die Iron Law (kein Fix ohne Root Cause; nach 3 Fehlversuchen
  Architektur hinterfragen). Liegt unter `skills/eigene/debug/`.
- **`handoff` vs. vorhandenes `eigene/handoff`.** Nicht ersetzt. Unser `handoff` bleibt das
  Session-interne Git-Ritual (PROGRESS/DECISIONS, Commit+Push, hartes `/clear`); die mattpocock-
  Variante wurde als eigenständiges `handoff-ext` (Übergabe an eine FREMDE Instanz: Subagent/
  anderes Tool/externe Person) vendored, das am Kopf auf `handoff` verweist.
- **`research`.** Kein echter Code-Konflikt in den erlaubten Quellen (nur mattpocock hat es);
  als `research` vendored. Der Harness-eigene `deep-research`-Skill bleibt davon unberührt
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

## 3. skills/imported/last30days/ — (last30days-skill, mvanhorn)

Vollständige Engine vendored: `scripts/` (2 MB, self-contained Python, keine Netz-Installer),
`references/save-html-brief.md`, `agents/openai.yaml`, `LICENSE.upstream` (MIT). Der 14 MB große
`assets/`-Ordner (Demo-Medien) wurde bewusst **nicht** mit-vendored — die Engine referenziert ihn
nicht.

Angepasst gegenüber Upstream:
- **Frontmatter** auf unser Schema gebracht (name=`last30days`, version=`3.16.0`, description,
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

## 4. skills/eigene/codex-first/ + kimi-first/ — SELBST GESCHRIEBEN

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

## Vendoring-Runde 2026-07-20

Zweite Vendoring-Runde, durchgeführt von mehreren Build-Agenten parallel (je Skill-Ordner ein
Arbeitspaket, dokumentiert in `VENDORING-NOTE.md` je Ordner — diese Notizen sind hier
konsolidiert und wurden danach gelöscht). Gilt dieselbe Regel wie Runde 1: SessionStart-Hooks
entfernt, Auto-Update-Mechanik gekappt (durchgängig: das Auto-Update-/`VERSIONS.md`-Fetch-Muster
plus die Claude-Code-`` !`command` ``-Dynamic-Content-Injection aus mehreren Quellen wurden NIE
übernommen), Telemetrie/Env-Hinweise dokumentiert, Lizenz vor wörtlicher Übernahme geprüft (bei
fehlendem `LICENSE`-File nur Paraphrase/Idee, keine wörtliche Kopie).

### Quellen-Commits (Runde 2026-07-20)

| Quelle | Upstream | Commit | Lizenz |
|---|---|---|---|
| humanizer | github.com/blader/humanizer | `1b48564898e999219882660237fde01bf4843a0f` | MIT (Copyright 2025 Siqi Chen) |
| kill-ai-slop | github.com/yetone/kill-ai-slop | `4ebbc595f4b799ce8ed0cf56a93977df07389219` | Apache-2.0 |
| anti-ai-slop-writing | github.com/jalaalrd/anti-ai-slop-writing | `63255f9bbb75a265dc5786a04535cd033f487756` | kein LICENSE-File — nur paraphrasiert |
| distribb-skill | github.com/Bomx/distribb-skill | `f86596ce4a7bd8412ebcbd61125a7f24d5a52323` | kein LICENSE-File — nur paraphrasiert |
| qwoted-seo-backlinks-skill | github.com/Bomx/qwoted-seo-backlinks-skill | `3ef97c52e9f1305d3a1e5544a554befa8b929805` | MIT (laut README, kein separates LICENSE-File) |
| no-mistakes | github.com/kunchenguid/no-mistakes | `2d10688c1753de85358ce6a74b72d90e696c4f05` | MIT |
| coreyhaines-marketingskills | github.com/coreyhaines31/marketingskills | `67264763cb107d61749f418d081c56e5bcbc0209` | MIT |
| shadcn-improve | github.com/shadcn/improve | `03369ee6d7cafbfcecc4346539b05b3dc0a603bb` | MIT |
| emilkowalski-skills | github.com/emilkowalski/skills | `6bf24434f7730ad169077756cf9c7cd7bd675fc6` | MIT (Copyright Emil Kowalski) |
| vercel-labs-skills | github.com/vercel-labs/skills | `777599e1159e401b11ce4c8a57c20f09a8f1596e` | MIT (laut `package.json`, kein separates LICENSE-File) |
| starc007-ui-components | github.com/starc007/ui-components | `fb312ce6811cca8ba7b46a5c8fa30c28b5861148` | MIT (Copyright Saurabh Chauhan, 2026) |
| claude-skill-web-clone | github.com/Jane-xiaoer/claude-skill-web-clone | `0269e0e08a3783184ec641d341e7d57065d4a5f8` | MIT (Copyright Jane/xiaoerzhan, 2026) |
| openui | github.com/wandb/openui | `42d7ab4ab6650433486dfb12eb3783c393a3e475` | Apache-2.0 |
| ui-layouts-mcp | github.com/ui-layouts/mcp | `d2248f3e859fe84469f3c9b62a105bd878b4c108` | MIT (Copyright 2025 Jinho Yeom) |
| oh-my-openagent | github.com/code-yeongyu/oh-my-openagent | `a4586027934074bd03a5008b7d068130c395a65b` | Sustainable Use License 1.0 (nur interner Gebrauch, kein Weiterverkauf/SaaS) |
| davidondrej-skills | github.com/davidondrej/skills | `249954322cd12e684ced7275633da82f9f5c0e27` | MIT (Copyright David Ondrej, 2026) |
| jakubkrehel-skills | github.com/jakubkrehel/skills | `f8a1574b08319685705a82e3c28139d1c935af9e` | MIT (Copyright Jakub Krehel, 2026) |
| conradcaffier-gist | Gist (conradcaffier-Agentur-Freebie) | `ea54fc5bbb7263723000e4ebde6061fb62b03197` | kein LICENSE — nur Format-Idee (Zwei-Stufen-Sampling), keine wörtliche Übernahme |

### 6. skills/design/ — Zweite Fusionsrunde (kill-ai-slop, emilkowalski, jakubkrehel, claude-skill-web-clone, oh-my-openagent)

Ergänzt die Erstfusion (impeccable+taste+ui-ux-pro-max, 2026-07-19, siehe `skills/design/VENDORING.md`).

- **kill-ai-slop** → `scripts/scan-ai-slop.mjs` (1:1 aus `skill/scripts/scan.mjs`, Apache-2.0,
  vor Übernahme auf Netzwerk-/exec-Freiheit geprüft: nur `node:fs`/`node:url`/`node:path`, kein
  `fetch`/`http`/`child_process`/`eval`, lauffähig getestet). `rules.ru.mjs.example` nur als
  Vorbild kopiert (nicht aktiv verdrahtet). `references/ai-slop-taxonomy.md`,
  `ai-slop-detection.md`, `ai-slop-fixes.md` aus `taxonomy.md`/`detection.md`/`fixes.md`.
  **Bekannte Spannung:** die 1:1-Skriptkopie widerspricht formal der später (parallel)
  eingeführten roten Linie in `writing-skills` v0.2.0 ("kein Fremdcode-Skript kopieren") —
  Abweichung war für dieses Arbeitspaket explizit angeordnet und Netzwerk-/Exec-Freiheit wurde
  geprüft; offen für Raphael, ob rückwirkend eine reine Prosa-Fassung gewünscht ist.
- **emilkowalski/skills** @ 6bf24434 → `references/motion-doktrin.md`,
  `apple-fluid-interfaces.md`, `animation-vokabular.md`, `motion-audit-workflow.md`
  (Fusion/Kondensat mehrerer Upstream-SKILL.md, ins Deutsche übertragen).
- **jakubkrehel/skills** @ f8a1574b → `references/farben-oklch.md`, `typografie.md`,
  `ui-polish-details.md` (kondensiert aus `better-colors/`, `better-typography/`, `better-ui/`;
  `variable-fonts-and-opentype.md` bewusst nicht übernommen — Deep-Dive, selten kundenrelevant).
- **claude-skill-web-clone** → nur `design-dna.md`/`dna-scaffold.mjs`
  (`references/design-dna-schema.md`, `scripts/dna-scaffold.mjs`, geprüft: nur `node:fs`/
  `node:path`); alle anderen Takes (Web-Clone-Workflow, Recon-Scripts) gingen an `web` (siehe
  Punkt 8), nicht dupliziert.
- **oh-my-openagent**: nur Methodik (Vier-Kategorien-Trennung, Visual-QA-Dual-Oracle-Disziplin)
  in `design-doktrin.md` Abschnitt 8 "[omo]" — kein Code/keine Datei übernommen.
- Geprüft, nichts übernommen: `starc007/ui-components` (Take ging an `web`),
  `davidondrej-skills` (kein Take zugewiesen).

### 7. skills/methodik/ — Zweite Ergänzungsrunde

| Skill | Quelle | Upstream-Pfad | Was |
|---|---|---|---|
| `brainstorm` | shadcn-improve | `skills/improve/references/audit-playbook.md` | Evidenz-Pflicht für Vorschläge (Zitat aus Codebase/Gespräch Pflicht) |
| `plan` | shadcn-improve | `skills/improve/references/plan-template.md` | `references/plan-template-vorlage.md` (deutsch, gekürzt) + Drift-Check/STOP-Bedingungen |
| `writing-skills` | davidondrej-skills, vercel-labs-skills, oh-my-openagent, starc007-ui-components | `skill-authoring/effective-agent-skills`, `find-skills`, `shared-skills/{start-work,review-work}`, `AGENTS.md` | Zwei Skill-Archetypen (Capability-/Process-Primitive), Sicherheits-Checkliste für Fremd-Skills, `references/lektionen-2026-07.md` (Kondensat aus 18 gesichteten Repos) |
| `handoff` | davidondrej-skills | `agent-orchestration/handoff/SKILL.md` | "State, not instructions", Sektion "Fallen & Sackgassen", Secret-Redaction-Grundsatz |
| `research` | davidondrej-skills, shadcn-improve | `research-and-web/research-prompt`, `skills/improve/SKILL.md` | Ziel+Entscheidung-zuerst, Quellenhierarchie, Gap-Round; Effort-Level-Tabelle (quick/standard/deep) als Idee |
| `sdd` | shadcn-improve | `skills/improve/references/closing-the-loop.md` | Worktree-Isolation, Tech-Lead-Review-Disziplin, Verdikt-Tabelle APPROVE/REVISE/BLOCK, Reconcile-Backlog-Routine |
| `code-review` | no-mistakes, shadcn-improve, oh-my-openagent | `CLAUDE.md`, `skills/improve/`, `shared-skills/review-work` | Fail-Closed-Prinzip; `references/audit-playbook.md` (9-Kategorien-Checkliste, deutsch); Phase-0-Kontext-Checkliste, "Review nie im Haupt-Worktree" |
| `tickets` | shadcn-improve | `skills/improve/references/audit-playbook.md` (Prioritization rubric) | Priorisierungs-Tiebreaker (Unblocker zuerst, Security vorziehen, "nicht wert" als gültiges Verdikt) |

### 8. skills/eigene/ — Zweite Ergänzungsrunde

| Skill | Quelle | Was |
|---|---|---|
| `ads` | coreyhaines-marketingskills (`skills/ads/`, `skills/ad-creative/`) | 15-Template-Katalog, RSA-Output-Spec, `assets/creative-review-template.html`, Kill/Keep/Scale-Engine, Hook-3-Komponenten-Modell, "Grounded Inputs"-Regel |
| `copywriting` | humanizer, anti-ai-slop-writing, kill-ai-slop (nur Tells 13–15), distribb-skill (nur Idee), coreyhaines-marketingskills | 33-Pattern-Katalog (`ai-slop-patterns-en.md`), Draft→Selbstkritik→Rewrite-Loop, 11-Punkte-Selbstprüf-Checkliste + Interpunktions-Schwellen (`floskel-verbote.md`), deutsche AI-Copywriting-Voice-Tells, Seven-Sweeps-Redigier-Framework, Mental-Models (`mental-models-en.md`) |
| `watch` | davidondrej-skills, conradcaffier-gist | Gotcha `--sub-format json3` statt VTT/SRT (Bug im eigenen `watch-extract.sh` gefunden+gefixt) |
| `offers` | coreyhaines-marketingskills (`skills/offers/`) | 8-Garantie-Typen-Katalog, Value-Equation-Diagnose, Banned-Vocabulary/"Wann NICHT einsetzen" |
| `eval` | oh-my-openagent (`start-work`, `security-research`) | DoneClaim/AdversarialVerify-Zweirollen-Schema, "keine Severity ohne Angriffspfad" |
| `onboard` | coreyhaines-marketingskills (`customer-research/`, `competitor-profiling/`) | `references/customer-research.md`, leichte Wettbewerbs-Recherche-Variante (kein Firecrawl/DataForSEO) |
| `debug` | no-mistakes | Fail-Closed-Prinzip bei Unsicherheit über Systemzustand |
| `seo` | coreyhaines-marketingskills, qwoted-seo-backlinks-skill, distribb-skill (nur paraphrasiert) | `regeln-technischer-audit.md` (inkl. 9 GSC-Analysen, paraphrasiert), `regeln-schema-markup.md`, `taktiken-linkbuilding-digitalpr.md` (Statistics-Page-Playbook, "Hoard the juice"), `taktiken-content-distribution.md`, `ideen-ai-sichtbarkeit-aeo.md` |
| `web` | claude-skill-web-clone, starc007-ui-components, ui-layouts-mcp, openui (bewusst nicht übernommen), qwoted-seo-backlinks-skill, coreyhaines-marketingskills, oh-my-openagent, davidondrej-skills | `web-clone-playbook.md` + 12 Playwright-Scripts (macOS-Pfade entfernt), ~110 Motion-Komponenten (`ui-components/motion/`), `ui-layouts-catalog.md` (nur Namensliste, kein Code — Komponenten kommen remote), `statistics-page-template.html`, IA/CRO/Experiment/Conversion-References, `code-qualitaets-checkliste.md`, Domain-Safe-Browsing- + Readonly-DB-Rolle-References |
| `orchestrate` | oh-my-openagent (`hyperplan`), davidondrej-skills (`goal-loop`, `launch-subagent`) | Adversariales 5-Rollen-Cross-Critique-Muster (ohne Tool-Calls), 5-Teile-Autonomer-Lauf-Kontrakt, Subagent-Grundregeln |

Details/Nicht-Übernommenes je Skill siehe die ursprünglichen `VENDORING-NOTE.md`-Inhalte (jetzt
hier konsolidiert und gelöscht) — durchgängige Nicht-Übernahme-Regel: Auto-Update-/Telemetrie-/
Hook-Mechanik, fremde YAML-Frontmatter, Kunden-API-Keys/CLI-Tools ohne bestätigten Bedarf,
Model-spezifische KI-Erkennungs-Fingerabdrücke (Detektion ≠ Produktion).

---


## Vendoring-Runde 3 — 2026-07-20 (Top-Kandidaten aus Recherche, Raphael-Freigabe)

Quellen (von Raphael am 2026-07-20 freigegeben, aus der Web-Recherche-Kandidatenliste):

| Quelle | Upstream | Commit | Lizenz |
|---|---|---|---|
| claude-seo | github.com/AgriciDaniel/claude-seo | `6cf1ea9` → `09d37c7` (Update-Check 20.07.26, v2.2.3/v2.2.4) | MIT |
| claude-ads | github.com/AgriciDaniel/claude-ads | `669c760` | MIT |
| knowledge-work-plugins | github.com/anthropics/knowledge-work-plugins | `b02472b` | Apache-2.0 (Repo) / MIT (partner-built/brand-voice, Tribe AI) |

Hinweis: In dieser Runde wurden zugleich alle Skills auf Raphaels Anweisung vom r-Praefix befreit
(seo statt r-seo usw.); die Tabellen aelterer Runden nennen bereits die neuen Namen.

### seo (aus VENDORING-NOTE.md konsolidiert)

# Vendoring-Notiz — claude-seo (AgriciDaniel)

Nur für den `seo`-Skill. Ersetzt/ergänzt nichts im zentralen `VENDORING.md`.

## Quelle

- Repo: https://github.com/AgriciDaniel/claude-seo
- Lokal geklont nach: `/root/tools/vendor/claude-seo` (`git clone --depth 1`)
- Commit: `6cf1ea9fe4c2088b2ad3089797f846850fd66164` (2026-07-06)
- Lizenz: MIT (siehe `/root/tools/vendor/claude-seo/LICENSE`, Copyright (c) 2026 agricidaniel) —
  wörtliche/strukturelle Übernahme zulässig, hier trotzdem übersetzt und condensiert statt
  1:1 kopiert, damit es zur Regeln/Taktiken-Trennung des Repos passt.
- Umfang der Quelle: ~25 Sub-Skills, ~18 Sub-Agents, 8 optionale MCP-Extensions
  (DataForSEO, Firecrawl, Banana, Ahrefs, SE Ranking, Profound, Bing Webmaster, Unlighthouse).
  Hinweis Update-Check 20.07.26: diese Zahl war schon bei `6cf1ea9` erreicht — kein Wachstum
  seither, die kursierende Recherche-Behauptung ("Wachstum auf 25/18") war für den
  Update-Zeitraum falsch, siehe unten.

## Update-Check 20.07.26: `6cf1ea9` → `09d37c7`

- Upstream lag 3 Commits vor: v2.2.3 (14.07., Prompt-Hygiene/Em-Dash-Sweep, keine
  Verhaltensänderung), v2.2.4 (20.07., Community-Maintenance: 410 Tests, Runtime-Manager
  `claude-seo run`, SSRF-sichere Sitemap-Discovery, GSC/Bing-Fixes, Security-Härtung), plus
  ein Contributor-Credit-Commit. Kein Sub-Skill- und kein Sub-Agent-Zuwachs (weiterhin 25/18).
- Substanziell für unsere Wissensseiten waren nur die Google-Fakten-Korrekturen in
  `skills/seo-geo` und `skills/seo-schema` (AI-Mode-Modell korrigiert auf "custom version of
  Gemini 2.5" statt der falschen "Gemini 3.5 Flash"-Zuschreibung, AI-Overviews-Reichweite als
  Third-Party-Zahl gekennzeichnet, Preferred-Sources/Highly-Cited/Community-Perspectives,
  explizites Google-Statement gegen llms.txt, Dataset-Klarstellung als nicht eingestellt,
  hasAdultConsideration) sowie die 50MB-Sitemap-Grenze/lastmod-Genauigkeitsregel in
  `skills/seo-sitemap`. In die wiki/seo-Seiten (seo-geo.md, seo-schema.md, seo-sitemap.md)
  übernommen — siehe dortige Quelle-Sektionen.

## Was übernommen wurde (5 Lücken, als eigene/erweiterte References)

| Neue/erweiterte Datei | Quell-Sub-Skill | Inhalt |
|---|---|---|
| `references/regeln-eeat.md` (neu) | `seo-content` + `references/eeat-framework.md` | E-E-A-T-Tiefe: Who/How/Why-Test, YMYL-Ausweitung, KI-Content-Bewertung |
| `references/taktiken-local-seo-gbp.md` (neu) | `seo-local` | GBP-Kategorien, Reviews/18-Tage-Regel, NAP, Swap-Test, Branchen-Schema |
| `references/taktiken-serp-features.md` (neu) | `seo-sxo` | SERP rückwärts lesen, Seitentyp-Mismatch, Featured-Snippet-Taktik |
| `references/taktiken-interne-verlinkung-cluster.md` (neu) | `seo-cluster` (+ `hub-spoke-architecture.md`) | SERP-Overlap-Clustering, Hub-and-Spoke-Link-Matrix, Kannibalisierungs-Check |
| `references/ideen-ai-sichtbarkeit-aeo.md` (Abschnitt ergänzt) | `seo-geo` | Frische 2026-Zahlen: Brand-Mentions vs. Backlinks, Citability-Score, Recency-Hebel, llms.txt-Status |

Alles übersetzt, condensiert und in die bestehende Regeln-vs.-Taktiken-Struktur des Skills
eingepasst — keine wörtliche Blockübernahme, keine Dopplung mit bereits vorhandenen Dateien
(`taktiken-linkbuilding-digitalpr.md`, `taktiken-content-distribution.md`,
`regeln-technischer-audit.md`, `regeln-schema-markup.md`, `loop4-ablauf.md`,
`tech-qa-checkliste.md` blieben unverändert bzw. wurden nur referenziert).

## Bewusst weggelassen

- **Alle Scripts** (`scripts/*.py`, ~35 Dateien: Rendering, DataForSEO/Ahrefs/Moz/GA4-Calls,
  Screenshot/Visual-Analyse, IndexNow-Submit, Schema-Validierung usw.) — würden Netzwerk-Calls,
  externe API-Keys und Tool-Ausführung in den Skill ziehen. Unser Skill bleibt reine
  Methodik/Wissen, keine ausführbaren Skripte.
- **Hooks** (`hooks/hooks.json`, `hooks/validate-schema.py`, `hooks/run-python-hook.js`) — ein
  `PostToolUse`-Hook auf `Edit|Write`, der bei jedem Datei-Save ein Python-Skript startet. Nicht
  übernommen: Automatismus außerhalb unseres Skill-Vertrags, kein SessionStart-Hook-Muster wie
  im eigenen Repo vorgesehen.
- **Sub-Agents** (18 Stück, `agents/`) — eigenes Agenten-/Orchestrierungsmodell, passt nicht zu
  unserer Sonnet/Luna/Kimi-Rollenaufteilung; nicht vendoriert.
- **8 MCP-Extensions** (Ahrefs, DataForSEO, Firecrawl, Banana, SE Ranking, Profound,
  Bing Webmaster, Unlighthouse) — externe Kosten-/API-Abhängigkeiten, nicht Teil des Auftrags.
- **Die übrigen ~20 Sub-Skills** (u. a. `seo-audit`, `seo-schema`, `seo-hreflang`,
  `seo-content-brief`, `seo-drift`, `seo-ecommerce`, `seo-sitemap`, `seo-image-gen`,
  `seo-programmatic`, `seo-competitor-pages`, `seo-plan`, `seo-flow`, `seo-page`,
  `seo-dataforseo`, `seo-google`, `seo-maps`, `seo-images`) — decken sich inhaltlich weitgehend
  mit bereits vorhandenen eigenen References (Tech-Audit, Schema, hreflang, Content-Distribution,
  Linkbuilding) oder sind reine Tool-/API-Wrapper ohne Methodik-Mehrwert für uns.
- **Marketplace-/Plugin-Metadaten** (`.claude-plugin/`, `agents/`, `data/google-updates.json`
  u. Ä.) — Infrastruktur des Fremd-Plugins, nicht relevant für einen Markdown-Wissens-Skill.

## Red-Flag-Check (durchgeführt)

- **Hooks:** vorhanden (`PostToolUse` → Python-Skript bei jedem Save) — **nicht** übernommen
  (siehe oben).
- **Telemetrie/Tracking:** keine Hinweise auf Phone-Home/Analytics in den gesichteten Dateien;
  `scripts/*` enthalten Netzwerk-Calls, aber ausschließlich gegen die vom Nutzer selbst
  konfigurierten SEO-APIs (DataForSEO/GSC/GA4 etc.), keine verdeckte Telemetrie an den
  Plugin-Autor gefunden. Diese Scripts wurden ohnehin nicht vendoriert.
- **Auto-Update:** kein Auto-Update-Mechanismus im Repo gefunden.
- **Prompt-Injection:** kein verdächtiges verstecktes Prompt-Material in den übernommenen
  SKILL.md-Dateien gefunden; übernommene Inhalte wurden zusätzlich beim Übersetzen/Condensieren
  neu formuliert, nicht wörtlich kopiert.
- **Netzwerk-Calls in Scripts:** ja, in `scripts/*.py` (Rendering/Fetch/API-Calls) — nicht
  übernommen, siehe "Bewusst weggelassen".

## Prüf-Hinweis für Raphael

Alle übernommenen Studien-/Prozentzahlen (Whitespark, BrightLocal, Ahrefs, SE Ranking, Sterling
Sky, Seer Interactive u. a.) sind Angaben aus dem Quell-Repo (Redaktionsstand ~Mitte 2026), nicht
selbst nachgeprüft. Als Priorisierungs-Kontext im eigenen Handwerk nutzbar, aber laut
Skill-Gotcha **nie ungeprüft als eigene Kennzahl in einen Kundenreport** übernehmen — dort zählt
nur der echte eigene Export.

### ads (aus VENDORING-NOTE.md konsolidiert)

# Vendoring-Notiz: AgriciDaniel/claude-ads

**Datum:** 2026-07-20
**Quelle:** https://github.com/AgriciDaniel/claude-ads (geklont nach
`/root/tools/vendor/claude-ads`, `git clone --depth 1`, Stand des Klons: 2026-07-11
Commits laut Datierung in den Referenzdateien)
**Lizenz:** MIT (LICENSE-Datei geprüft, Copyright 2026 agricidaniel) — Übernahme
erlaubt. Trotzdem: alle Inhalte hier sind **paraphrasiert und kondensiert**,
keine wörtliche Kopie von Code, JSON-Schemas oder Skripten.

## Kontext der Aufgabe

Skills wurden am 2026-07-20 auf Anweisung Raphaels von `r-`-Präfix auf präfixlos
umgestellt. Der Ads-Skill liegt unter `skills/eigene/ads/`. Die Agentur macht
primär Meta-Ads für deutschsprachige Kunden — deshalb Priorität auf Meta-
relevante Inhalte, Google/TikTok nur wo die Quelle explizit stark und
plattform-neutral verwendbar war.

## Was übernommen wurde (4 neue Reference-Dateien)

| Datei | Inhalt | Ergänzt was fehlte |
|---|---|---|
| `references/vendor/claude-ads/scoring-methodik.md` | Deterministisches Scoring: 4 getrennte Outputs, 4 Kontrollzustände (pass/fail/unknown/not_applicable), Schweregewichte, Kategorie-/Plattform-/Portfolio-Rechenweg, Coverage-Ampel (80/60 %), Dedupe-Regeln, versionierte JSON-Reports vor Rendering | Wir hatten kein deterministisches Scoring-Modell — nur qualitative Kill/Keep/Scale-Heuristik in `loop3-ablauf.md` |
| `references/vendor/claude-ads/quellen-und-benchmarks.md` | Belegpflicht für jeden Benchmark, Vergleichs-Rangfolge (eigenes Konto > Peer > Branche), Konto-Baseline-Formel statt fixer Zahl, verbotene Formulierungen | Wir hatten keine strukturierte Quellen-/Benchmark-Disziplin, nur implizite Erwartung "echte KPIs zählen" |
| `references/vendor/claude-ads/experimente-und-monitoring.md` | Pre-Registrierung von Testwellen (Hypothese, Stopp-Regel, Guardrails), Anti-Peeking-Regel, Monitoring-Snapshot-Vergleichbarkeit, Anti-Trivial-Nenner-Regel | Wir hatten `perf-analyse` (Schritt 9) ohne explizite Signifikanz-/Peeking-Disziplin |
| `references/vendor/claude-ads/automatisierungs-tiers.md` | T0-T4-Delegationstiers (9 Dimensionen), Bezug zum Mutation-Gate | Ergänzt unser bestehendes "Signatur + Budget-Egress-Gate"-Gotcha um eine granulare Einordnung, WER gerade kontrolliert (relevant bei Advantage+/Automated Rules) |

**Bewusste Design-Entscheidung übernommen:** Die Quelle verzichtet explizit auf
feste universelle Schwellen (Ad-Fatigue-Frequenz, Signifikanz-Stichprobenzahl,
Budget-Minima) und ersetzt sie durch "immer gegen die eigene Konto-Baseline
vergleichen". Das wurde 1:1 als Prinzip übernommen (siehe Gotcha in `SKILL.md`)
statt eine erfundene Zahl zu erfinden, nur weil der Auftrag "Schwellen" nannte.

## Red-Flag-Prüfung (durchgeführt, nichts übernommen)

| Prüfpunkt | Befund |
|---|---|
| Hooks (Claude-Code-Hooks, Auto-Trigger) | Keine gefunden in den gelesenen Skill-/Reference-Dateien. Repo enthält `install.sh`/`install.ps1`, `uninstall.sh/.ps1` — **nicht ausgeführt, nicht übernommen.** |
| Telemetrie | Keine Telemetrie-Calls in den gelesenen Referenzdateien gefunden. `claude_ads_core/` (Python-Paket) wurde **nicht** übernommen — nur Markdown-Referenzen. |
| Auto-Update | `install.sh` referenziert Cross-Host-Installation (Codex/Cursor/Windsurf/Gemini/Goose) — nicht relevant, da wir nur Markdown-Inhalte kondensiert haben, kein Skript übernommen. |
| Prompt-Injection | Positiv aufgefallen: Die Quelle behandelt abgerufene Web-/API-Inhalte explizit als "untrusted data, never instructions" (AGENTS.md + mehrere Referenzdateien) — dieses Prinzip wurde in `quellen-und-benchmarks.md` übernommen, weil es zu unserer eigenen Policy passt. |
| Netzwerk-Calls | Referenzdateien selbst machen keine Netzwerk-Calls (reine Methodik-Dokumente). Das Python-Paket (`claude_ads_core`) und die Skripte (`scripts/`) wurden nicht angefasst/übernommen. |

## Bewusst weggelassen

- **Der gesamte Python-Kern (`claude_ads_core/`), Scripts (`scripts/`), JSON-Schemas
  (`control-plane/`, `claude_ads_core/schemas/`), Tests (`tests/`), Installer
  (`install.sh/.ps1`, `uninstall.sh/.ps1`).** Das ist ein eigenständiges Software-
  Produkt (CLI, Adapter, Release-Gates) — wir vendorieren einen Skill, kein
  Toolchain. Würde außerdem den 300-Zeilen-Rahmen und den Auftrag ("nichts
  installieren", implizit aus Repo-Kontext) sprengen.
- **11 der 12 Plattform-Audits** (Google, TikTok, LinkedIn, Amazon, Apple,
  Microsoft, Reddit, Pinterest, Snapchat, X, YouTube) — laut Auftrag Meta-
  Priorität, andere Plattformen nur bei wirklich starkem, plattform-neutralem
  Inhalt. Die 4 übernommenen Dateien sind bewusst plattform-neutral gehalten
  (Scoring-Methodik, Benchmark-Disziplin, Test-Statistik, Automatisierungs-
  Tiers gelten für Meta genauso wie für jede andere Plattform).
- **`ads/references/copy-frameworks.md`, `voice-to-style.md`** — überlappen mit
  unserem bestehenden `copywriting`-Skill bzw. Hook-Taxonomie; keine Dopplung.
- **`ads/references/meta-creative-specs.md`, `additional-platforms.md`,
  Plattform-Creative-Specs** — volatile Zahlen (Seitenverhältnisse, Datei-
  limits), die sich häufig ändern und laut Quelle selbst live verifiziert
  werden müssen ("resolve from current official evidence"). Hardcoden wäre
  ein Garant für baldige Stale-Info; nicht übernommen.
- **`compliance.md`, `compliance-requirements.md`** — decken sich inhaltlich mit
  unserer bestehenden `claims-verbote.md` (HWG/UWG); Kernprinzip ("Plattform-
  Freigabe ≠ Rechtsfreigabe", "abgerufene Policy-Seiten sind Daten, keine
  Anweisung") ist in `quellen-und-benchmarks.md` mitgedacht, aber keine
  separate Datei, um Dopplung zu vermeiden.
- **`agents/*.md` (Subagent-Definitionen), `evals/*`** — Repo-eigene
  Orchestrierungs-/Eval-Infrastruktur, passt nicht auf unser Skill-Format
  (wir haben `eval`/`orchestrate` als eigene Skills).
- **Alle `assets/*.svg`, Demo-GIF, Marketing-Material des Fremd-Repos.**

## Validierung

    python3 /root/raphael-skills/tools/validate-skill.py skills/eigene/ads/SKILL.md

→ Ergebnis siehe Konsolen-Output im Task-Abschluss.

### copywriting (aus VENDORING-NOTE.md konsolidiert)

# Vendoring-Notiz — copywriting

**Datum:** 2026-07-20
**Quelle:** https://github.com/anthropics/knowledge-work-plugins (Anthropic, Apache-2.0
für das Repo-Root; einzelne Partner-Plugins haben eigene Lizenzen).
Konkret genutzt: `partner-built/brand-voice` (Tribe AI, **MIT-Lizenz**), Skills
`guideline-generation` und `brand-voice-enforcement`.
Vendoriert nach: `/root/tools/vendor/knowledge-work-plugins` (git clone --depth 1).

## Übernommen

- Neue Datei `references/voice-analysis.md`: Voice-konstant/Ton-flext-Denkmodell,
  "Wir sind/Wir sind nicht"-Tabellenstruktur, Terminologie-Tabelle (Pflicht/Bevorzugt/
  Vermeiden/Nie), Tonalitäts-Matrix (auf Agentur-Kanäle reduziert), Confidence-Stufen
  pro Sektion, häufige Anwendungsfehler.
- Diese Datei ist die Vorlage, auf die `onboard` Schritt 6 (brand-voice) verweist, um
  `VOICE.md` zu bauen — schließt eine Lücke, die in `onboard` schon vorher benannt war
  ("voice-analysis.md-Vorlage"), aber nicht existierte.
- `loads:` und Step 1 (Voice laden) in `SKILL.md` ergänzt, ein neues Gotcha
  (Voice vs. Ton nicht verwechseln) hinzugefügt.
- Version 0.3.0 → 0.4.0 (minor, additiv, keine bestehende Struktur verändert).

## Bewusst NICHT übernommen

- **Kein MCP-Setup** (`.mcp.json` mit Notion/Atlassian/Box/Figma/Gong/Granola-Connectoren).
  Unsere Agentur nutzt keine Enterprise-Discovery über 7 Plattformen — Voice kommt aus
  Textproben/Interview beim Onboarding, nicht aus einem Such-Agenten.
- **Kein `discover-brand`-Skill** (autonome Plattform-Discovery-Orchestrierung) — Overkill
  für Agentur-Maßstab, hätte eigene Trust-Grenzen (welche Kundenplattformen darf ein Agent
  autonom durchsuchen?) aufgemacht, die hier nicht gebraucht werden.
- **Keine Agents/Commands/Settings-Dateien** (`agents/*.md`, `commands/*.md`,
  `settings/brand-voice.local.md.example`) — das sind Cowork-Plugin-Mechanik
  (Slash-Commands, autonome Subagenten-Delegation), keine Methodik. Unser `onboard`/
  `copywriting` deckt den Workflow bereits über Sonnet+Sol-Verifier ab.
- **Kein Auto-Save/Session-Persistenz-Mechanismus** (`.claude/brand-voice-guidelines.md`
  automatisch schreiben) — bei uns läuft das über das Kundenrepo (`client-<name>/wiki/
  VOICE.md`), keine plugin-eigene Ablage.
- Vollständige `before-after-examples.md` (B2B-SaaS-Cold-Outreach-Beispiele) — zu
  spezifisch auf US-B2B-Sales zugeschnitten, unsere `references/cta-framework.md` und
  `references/vsl-framework.md` decken das Cold-Outreach/Hook-Handwerk bereits ab.

## Red-Flag-Prüfung

- Keine Hooks (`hooks.json`/`settings.json` mit Auto-Run) im übernommenen Material.
- Keine Telemetrie/Tracking-Calls.
- Kein Auto-Update-Mechanismus.
- Keine Prompt-Injection-Muster (keine "ignoriere vorherige Anweisungen"-artigen Strings
  in SKILL.md/agents/commands geprüft — sauber).
- Lizenz: MIT (`partner-built/brand-voice/LICENSE`) — permissiv, Vendoring mit Attribution
  zulässig.

### onboard (aus VENDORING-NOTE.md konsolidiert)

# Vendoring-Notiz — onboard

**Datum:** 2026-07-20
**Quelle:** https://github.com/anthropics/knowledge-work-plugins → `partner-built/
brand-voice` (Tribe AI, MIT-Lizenz). Vendoriert nach:
`/root/tools/vendor/knowledge-work-plugins` (git clone --depth 1).

## Übernommen

- Schritt 6 ("brand-voice") präzisiert: verweist jetzt konkret auf
  `copywriting/references/voice-analysis.md` (neu angelegt in diesem Zug) statt auf eine
  bisher nicht existierende Vorlage gleichen Namens.
- Neues Gotcha: VOICE.md-Attribute brauchen ein Zitat/eine Textprobe, sonst
  Confidence-Stufe Niedrig + offene Frage — dieselbe Beleg-Disziplin, die `onboard` für
  ICP/PROOF schon fordert, jetzt explizit auch für VOICE.md.
- `source:`-Feld im Frontmatter um die neue Herkunft ergänzt (bestehende
  marketingskills-Herkunft bleibt unverändert stehen).
- Version 0.2.0 → 0.3.0 (minor, additiv).

## Bewusst NICHT übernommen

- Keine Discovery-Agenten, keine MCP-Connectoren, keine Commands — siehe
  `copywriting/VENDORING-NOTE.md` für die vollständige Begründung (gilt hier gleich,
  da onboard denselben Quell-Skill nur referenziert, nicht dupliziert).
- Die eigentliche inhaltliche Vorlage liegt bei `copywriting` (dort, wo auch die Voice
  geladen/angewendet wird) — `onboard` verweist nur darauf, um Doppelung zu vermeiden.

## Red-Flag-Prüfung

Siehe `copywriting/VENDORING-NOTE.md` — identischer Quell-Skill, identisches Ergebnis:
keine Hooks, keine Telemetrie, kein Auto-Update, keine Prompt-Injection. Lizenz MIT.

## Telemetrie / Env-Hinweise

- **last30days:** liest optionale Provider-Keys aus der Env (SCRAPECREATORS/OPENAI/XAI/BRAVE/
  APIFY/PERPLEXITY/…). Nur `SCRAPECREATORS_API_KEY` ist praktisch nötig; alle anderen bleiben
  ungesetzt → die zugehörigen Quellen werden sauber übersprungen. Keys wie Secrets behandeln
  (chmod-600-Env, nie in Git — `tools/secret-scan.sh`).
- **superpowers/mattpocock/gstack methodik:** keine Laufzeit-Env/Telemetrie (reine Prosa).
- **Codex/Kimi-Helfer:** keine eigene Telemetrie; nutzen die vorhandenen CLI-Logins
  (OAuth-Abo-Abrechnung, nie `ANTHROPIC_API_KEY`/`--bare`).
- **Runde 2026-07-20 (design/web Scripts):** `scan-ai-slop.mjs`, `dna-scaffold.mjs` und die
  12 Playwright-Scripts aus `claude-skill-web-clone` laufen rein lokal, keine Telemetrie/Netz-
  Calls außer den vom Nutzer explizit aufgerufenen Playwright-Zielseiten. Vor Übernahme jeweils
  auf `fetch|http|child_process|exec|spawn` geprüft (scan-ai-slop/dna-scaffold: keine Treffer).
  `qwoted-seo-backlinks-skill`-Statistics-Page-Template lädt Chart.js von einem CDN (im
  ausgelieferten HTML dokumentiert, kein Aufruf durch den Skill selbst).

## Update-Pfad (künftig)

1. Upstream in `/root/tools/vendor/<quelle>` mit `git pull` aktualisieren, neuen Commit hier
   nachtragen.
2. Betroffene `r-*`-SKILL.md gegen neue Upstream-Regeln diffen; entfernte Hooks/Auto-Update-
   Pfade erneut kappen.
3. `python3 tools/validate-skill.py` + `python3 tools/build-index.py` grün laufen lassen.

## Vendoring-Runde 4 — 2026-07-20 (Understand-Anything)

| Quelle | Upstream | Commit | Lizenz |
|---|---|---|---|
| understand-anything | github.com/Egonex-AI/Understand-Anything | `2f24580` | MIT (Yuxiang Lin / Infinite Universe, Inc.) |

Lokal geklont nach `/root/tools/vendor/understand-anything` (`git clone --depth 1`).

**Befund (Sicherheits-Check):**
- 9 Skills unter `understand-anything-plugin/skills/` (understand, -chat, -dashboard, -diff,
  -domain, -explain, -figma, -knowledge, -onboard) + 10 Agent-Definitionen unter `agents/`.
- **Hooks vorhanden:** `understand-anything-plugin/hooks/hooks.json` registriert PostToolUse(Bash)-
  und SessionStart-Hooks (Auto-Update des Knowledge Graphs bei Commits, inkl. "Do not ask the
  user for confirmation"). Greifen nur bei Plugin-Installation — Plugin-Manifest wurde deshalb
  zu `.claude-plugin.vendored-disabled` umbenannt; Skills nie als Plugin installieren, nur
  einzeln übernehmen und die Hook-Dateien dabei weglassen.
- **Netzwerk:** `/understand-dashboard` lädt optional einen Viewer-Tarball von GitHub Releases
  (dokumentiert, Offline-Fallback via lokalem Vite-Build); `/understand-figma` ruft dokumentiert
  `api.figma.com` mit `FIGMA_TOKEN` aus der Env (Token wird laut Skill nie persistiert/geloggt).
  Alle anderen Skills arbeiten rein lokal.
- **Keine** Telemetrie, kein eval/exec von Fremd-Input (Node-Scripts nutzen nur
  `spawnSync('git', …)` und Regex-Parser), keine Prompt-Injection-Muster in SKILL.md/Agents.
- Abhängigkeit: die Skills setzen den Plugin-Baum voraus (`packages/core` muss per pnpm gebaut
  werden, Node ≥ 22) — bei Übernahme in `raphael-skills` Pfade auf den Vendor-Klon zeigen lassen.

### Nachtrag Runde 4 — llm-council (2026-07-20)

| Quelle | Upstream | Commit | Lizenz |
|---|---|---|---|
| llm-council | github.com/karpathy/llm-council | `92e1fcc` | **keine** (all rights reserved) |
| claude-skills-llm-council | github.com/aiwithremy/claude-skills-llm-council | `55ee36e` | **keine** (nur README-Credit, Ole Lehmann) |

Beide per `git clone --depth 1` nach `/root/tools/vendor/`.

**Befund:**
- `llm-council` (Karpathy): Referenz-Webapp (FastAPI + React), kein Skill (0 SKILL.md). Einziger
  Netz-Endpunkt: `openrouter.ai` (httpx, Key aus Env). Keine Hooks, keine Telemetrie, keine
  .claude-Ordner. Wegen fehlender Lizenz nur als Lese-Referenz behandeln.
- `claude-skills-llm-council` (Ole Lehmann): 1 SKILL.md (Wurzel) — reines Prompt-Playbook
  (5 Advisors parallel, anonymes Peer-Review, Chairman-Verdikt), kein Code, keine Netz-Calls,
  keine Hooks/Telemetrie. SKILL.md lässt Claude CLAUDE.md/memory/ als Kontext scannen (gewollt).
- **Installiert:** Symlink `/root/.claude/skills/llm-council` → Vendor-Klon (konfliktfrei;
  bestehende Skills unberührt). Kein .claude-Ordner zum Deaktivieren vorhanden (beide Repos).

## Vendoring-Runde 5 — 2026-07-20 (Security + Webdesigner-Pro)

### Quellen-Commits (Runde 5)

| Quelle | Upstream | Commit | Lizenz |
|---|---|---|---|
| trailofbits-skills | github.com/trailofbits/skills | `cfe5d7b` | CC-BY-SA-4.0 |
| claude-code-owasp | github.com/agamm/claude-code-owasp | `f5dfa3d` | MIT |
| webdesigner-pro | (Vendor-Klon `/root/tools/vendor/webdesigner-pro`) | `04340d6` | **kein LICENSE-File** — nur paraphrasiert (siehe Regel Zeile 159). Vendort selbst `remotion-dev/skills` weiter (eigene kommerzielle Remotion-Lizenz) und enthält eine Higgsfield-Abo-Kopplung (Vendor-Infrastruktur, nicht übernommen). |

Alle drei per `git clone --depth 1` nach `/root/tools/vendor/`.

**Befund:**
- `trailofbits-skills`: Enthält u.a. `plugins/insecure-defaults`, `plugins/sharp-edges`,
  `plugins/static-analysis` (CodeQL/SARIF/Semgrep). CC-BY-SA-4.0 erlaubt Bearbeitung mit
  Namensnennung/Share-Alike — destilliert (nicht wörtlich kopiert) nach
  `skills/eigene/web/references/security-audit-playbook.md`: Doktrin ("Pit of Success"),
  Fail-Open-Erkennung (Regel 1, Quelle `plugins/insecure-defaults`). Tooling-Tiefe
  (CodeQL/SARIF/Semgrep) bewusst NICHT dupliziert — dafür bleibt `plugins/static-analysis`
  im Vendor-Klon die Referenz, falls je gebraucht.
- `claude-code-owasp` (agamm, MIT): README-Checkliste destilliert nach
  `skills/methodik/code-review/references/owasp-checkliste.md` — auf OWASP Top 10:2025 +
  ASVS-Kern gekürzt und auf Agentur-Realität gemappt (Next.js/Kontaktformulare/Airtable-Meta-
  API-Anbindungen), Enterprise-Themen (HSM, Pen-Testing-Level-3) weggelassen.
- `webdesigner-pro`: Kein Ganzes-Repo-Vendoring, drei separate Übernahmen als Rezeptkarten
  (Paraphrase, keine wörtliche Kopie — mangels LICENSE-File):
  - Skill `webdesign-component-registry` + Wiki `external-skill-libraries.md` →
    `skills/design/references/component-bibliotheken-radar.md` (Katalog externer
    Component-/Motion-Quellen als Nachschlagewerk, nicht zum pauschalen Laden/Installieren).
  - Skill `rebuild-website-from-image` →
    `skills/eigene/web/references/rebuild-from-image.md` (Denkweg für Bild-zu-Website-Rebuild;
    Higgsfield-Asset-Pipeline und Node-Gate-Scripts bewusst NICHT übernommen — Vendor-/
    Abo-Infrastruktur, kein portabler Ablauf).
  - Skill `remotion-best-practices` (Original-Quelle `github.com/remotion-dev/skills`,
    Weiter-Vendoring durch webdesigner-pro selbst) + Wiki `remotion-production.md` →
    `skills/eigene/web/references/remotion-produktionsweg.md` (neues Thema, nur bei
    ausdrücklichem Video-/Composition-Auftrag aktivieren).
- Keine Hooks, kein SessionStart-Auto-Update, keine Telemetrie in den drei destillierten
  Ziel-Dateien übernommen — konsistent mit Regel aus Runde 2026-07-20.

## Vendoring-Runde 6 — 2026-07-20 (claude-blog)

### Quellen-Commit (Runde 6)

| Quelle | Upstream | Commit | Lizenz |
|---|---|---|---|
| claude-blog | github.com/AgriciDaniel/claude-blog | `49842ea9e7b9a1f6f8a3774a3fcfb082ab6a7d25` | MIT |

Per `git clone --depth 1` nach `/root/tools/vendor/claude-blog`.

**Befund:**
- Repo enthält 30 Sub-Skills, 5 Agenten, ein `.claude-plugin/` (Plugin-Manifest/Marketplace,
  KEIN `.claude/hooks`-Ordner, keine `hooks.json`) und ein `install.sh`, das per
  `curl | bash` von GitHub installiert (nicht ausgeführt, nur gelesen). Keine Hooks, kein
  Auto-Update-Mechanismus, kein exec von Fremd-Eingaben in den gesichteten Skills gefunden.
  Netz-Calls existieren (Google PageSpeed/GSC/GA4/YouTube-APIs, NotebookLM, Gemini-Bild/TTS,
  Openverse-Stockfotos) — alles explizite, dokumentierte API-Integrationen mit eigenem
  Env-Var-Schema, keine versteckte Telemetrie. `.claude-plugin`-Ordner nicht umbenannt, da
  kein Hook-Mechanismus darin (nur Manifest-JSON).
- Abgeglichen gegen bestehende SEO-Bibliothek (`wiki/seo/`, `skills/eigene/seo/references/`,
  inkl. bereits vendoriertem `AgriciDaniel/claude-seo` @ 6cf1ea9): GEO/AEO-Zitier-Taktiken,
  Interlinking/Cluster-Logik sind bereits vollständig abgedeckt (selber Autor, gleiche
  Kernzahlen) — reine Wiederholung, nichts Neues übernommen.
- **Neu übernommen:** der 5-Gate-Blog-Delivery-Contract (`skills/blog/references/
  blog-delivery-contract.md` im Original) als Ablauf-Disziplin — Capability-Discovery,
  Format-Vollständigkeit, visuelle Verifikation, BLOCKIERENDER Content-Review mit P0-Filter
  (unabhängig vom Zahlenscore), Asset-/Link-Integrität, Iterationsschleife (3 Versuche),
  explizites Bypass-Protokoll. Bisher fehlte in `loop4-ablauf.md`/G2 ein automatischer
  Blocker zwischen Fertigstellung und Auslieferung — G2 war weich (Schwelle 0.7), P0 als
  score-unabhängiger Absolut-Filter war neu.
- Destilliert (nicht wörtlich kopiert, obwohl MIT das erlaubt hätte) nach
  `skills/eigene/seo/references/blog-delivery-contract.md`: auf unser Loop-4/G1-G2-Modell
  umgeschrieben, Patchright/Google-API-spezifische Implementierungsdetails NICHT übernommen
  (Werkzeug-Bindung des Originals, keine Agentur-Wissenstiefe für uns).
- Router-Zeile in `skills/eigene/seo/SKILL.md` ergänzt (Reference-Routing-Tabelle + `loads:`),
  Version 0.6.0 → 0.6.1.
