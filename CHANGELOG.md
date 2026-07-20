# CHANGELOG — raphael-skills

**TLDR:** Hier steht grob, was sich an den Skill-Vertraegen und am
Pruef-Werkzeug geaendert hat. Neueste Aenderung oben. Format lehnt sich an
"Keep a Changelog" an, bleibt aber bewusst kurz und deutsch.

Versionierung einzelner Skills laeuft ueber `version:` in der jeweiligen
SKILL.md (semver) und einen Git-Tag `r-<name>@<semver>` beim main-Merge. Dieses
CHANGELOG beschreibt das Repo drumherum (Vertrag, Validator, Marker).

---

## 2026-07-20 — Karpathy-Deep-Dive: Council- und Autoresearch-Muster eingearbeitet

**Geaendert**
- `skills/eigene/orchestrate/` 0.2.0 → 0.3.0: neues Council-Muster (3
  Modellfamilien antworten unabhaengig, anonymes Peer-Ranking mit
  randomisierter Zuordnung, Chairman-Synthese) als Abschnitt in SKILL.md +
  neue `references/council.md`. Idee nach Karpathys llm-council @ 92e1fcc
  (Lese-Referenz, keine Lizenz — kein Code/Text uebernommen) und der
  Advisor-Variante claude-skills-llm-council @ 55ee36e.
- `skills/eigene/eval/` 0.2.0 → 0.3.0: G3 um den Autoresearch-Mutations-Loop
  ergaenzt (Baseline zuerst, genau eine Mutation je Experiment, gleich =
  revertieren, Changelog-Pflicht, Plateau-Stopp) mit Verweis auf den
  vendorierten `autoresearch`-Skill; Abgrenzung Panel (judgt ein Artefakt)
  vs. Council (waehlt zwischen Antworten) ergaenzt.
- Karpathy-Coding-Prinzipien NICHT erneut eingearbeitet — seit Runde 1
  Doktrin in `raphael-command-center/AGENTS.md`; llm-wikid nicht
  uebernommen — Muster lebt bereits als raphael-brain.
- Lektionen-Seite: `raphael-brain/wiki/_candidates/karpathy-methodik.md`.

**Geprueft**
- `python3 tools/validate-skill.py skills/eigene/orchestrate/SKILL.md
  skills/eigene/eval/SKILL.md`: beide gruen (nur bekannte Warnungen zu
  optionalen Feldern).

---

## 2026-07-20 — Vendoring-Runde 2 (Housekeeping)

Große parallele Vendoring-Runde: Build-Agenten haben 18 zusaetzliche Fremdquellen
(humanizer, kill-ai-slop, anti-ai-slop-writing, distribb-skill,
qwoted-seo-backlinks-skill, no-mistakes, coreyhaines-marketingskills,
shadcn-improve, emilkowalski-skills, vercel-labs-skills, starc007-ui-components,
claude-skill-web-clone, openui, ui-layouts-mcp, oh-my-openagent,
davidondrej-skills, jakubkrehel-skills, conradcaffier-gist) in bestehende Skills
eingearbeitet (keine neuen Skill-Ordner). Je Skill-Ordner lag eine
`VENDORING-NOTE.md`; diese wurden in `VENDORING.md` (neuer Abschnitt
"Vendoring-Runde 2026-07-20") konsolidiert und danach geloescht.

**Geaendert**
- `skills/design/` (2. Fusionsrunde: kill-ai-slop-Scanner, emilkowalski-Motion-
  Doktrin, jakubkrehel Farben/Typo/UI-Polish, claude-skill-web-clone Design-DNA).
- `skills/eigene/web/`, `ads/`, `copywriting/`, `offers/`, `onboard/`,
  `seo/`, `watch/`, `debug/`, `eval/`, `orchestrate/` sowie
  `skills/methodik/brainstorm/`, `plan/`, `writing-skills/`, `sdd/`,
  `code-review/`, `tickets/`, `research/`, `skills/eigene/handoff/` je um
  Referenzen/Gotchas aus den oben genannten Quellen ergaenzt (Details:
  `VENDORING.md`).

**Geprueft**
- `python3 tools/validate-skill.py`: 29/29 SKILL.md gruen (nur unveraenderte
  Warnungen zu optionalen Feldern, keine Fehler).
- `python3 tools/build-index.py`: 29 Skills (unveraendert ggue. vor der Runde —
  keine neuen Skill-Ordner angelegt).
- Alle 29 Skills bereits unter `/root/.claude/skills/` verlinkt, keine neuen
  Symlinks noetig.

---

## 2026-07-19 — Neue Skills watch + debug

**Neu**
- `skills/eigene/watch/`: lokale Video-Analyse (yt-dlp + ffmpeg, Hook-Kontaktboegen
  15 s @ 15 fps, Body 1 Frame/3,5 s, YouTube-Auto-Subs statt Whisper) inkl. Helper
  `scripts/watch-extract.sh` (eigener Code). Quelle: quellenreview-2026-07-19 Teil D.
- `skills/eigene/debug/`: kombinierte Debug-Disziplin aus mattpocock
  `diagnosing-bugs` + superpowers `systematic-debugging` (enger pass/fail-Loop vor
  Hypothesen, Root Cause vor Fix, nach 3 Fehlversuchen Architektur hinterfragen).

---

## 2026-07-19 — Skill-Vertraege gehaertet

Grundlage: v5-Plan Abschnitt 9.1 (Skill-Vertrag) und 9.2 (Progressive
Disclosure). Keine bestehende SKILL.md wurde angefasst.

**Neu**
- `.skill-namespace` (Inhalt `r-`): technischer Marker fuer den Pflicht-Praefix
  aller eigenen Skills.
- `SKILL-VERTRAG.md`: erklaert die sieben Pflichtfelder
  (`name`, `version`, `description`, `class`, `scope`, `sensitivity`,
  `completion_criteria`), die sieben Skill-Klassen (R/M/F/O/E/W/G) und die
  Zeilenlimits der Progressive Disclosure. Auf Fuenfjaehrigen-Niveau erklaert.

**Geaendert**
- `tools/validate-skill.py` additiv erweitert:
  - `class`, `scope`, `sensitivity` sind jetzt Pflichtfelder (fehlt/leer = rot).
    Alle 27 vorhandenen Skills fuehren diese Felder bereits, keiner wird rot.
  - Werte werden weich geprueft: unbekannte `class`/`scope`/`sensitivity`-Werte
    geben nur eine Warnung, brechen den Lauf nicht ab (alte Skills bleiben gruen).
  - Fehlende empfohlene Felder (`provenance`, `eval_scorecard`, `expires`,
    `loads`, `requires_skills`) geben nur eine Warnung, nie rot.

**Status:** Vertrag + Validator sind ein Runbook-/Lint-Stand, kein Nachweis
bestandener Evals oder erteilter Freigaben. Skill-Mutationen bleiben eine der
7 Rot-Klassen und laufen ueber `ops/review-inbox.md` mit Raphaels Signatur.

## 2026-07-20 — Umbenennung: r-Praefix entfernt (Raphael-Anweisung)
Alle 28 r-*-Skills heissen jetzt einfach nach ihrer Disziplin (seo, design, copywriting, ...).
Ordner per git mv umbenannt, Querverweise in raphael-skills, raphael-command-center und
raphael-brain/wiki aktualisiert, .skill-namespace geleert, SKILL-VERTRAG angepasst,
Symlinks in ~/.claude/skills neu gesetzt. Rote Linie "kein Fremdcode-Skript kopieren"
aus writing-skills entfernt (Raphael-Entscheid, scan-ai-slop.mjs bleibt).

## 2026-07-20 — Vendoring-Runde 3 (Top-Kandidaten)
claude-seo (E-E-A-T, Local/GBP, SERP-Features, Cluster/interne Verlinkung, AEO-Update) -> seo v0.4.0;
claude-ads (deterministisches Audit-Scoring, Benchmark-Belegpflicht, Testwellen-Regeln, Automatisierungs-Tiers) -> ads v0.4.0;
knowledge-work-plugins/brand-voice (Voice-Analyse-Vorlage, Voice-vs-Ton) -> copywriting v0.4.0 + onboard v0.3.0.
Details in VENDORING.md Runde 3.
