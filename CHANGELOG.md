# CHANGELOG — raphael-skills

**TLDR:** Hier steht grob, was sich an den Skill-Vertraegen und am
Pruef-Werkzeug geaendert hat. Neueste Aenderung oben. Format lehnt sich an
"Keep a Changelog" an, bleibt aber bewusst kurz und deutsch.

Versionierung einzelner Skills laeuft ueber `version:` in der jeweiligen
SKILL.md (semver) und einen Git-Tag `r-<name>@<semver>` beim main-Merge. Dieses
CHANGELOG beschreibt das Repo drumherum (Vertrag, Validator, Marker).

---

## 2026-07-19 — Neue Skills r-watch + r-debug

**Neu**
- `skills/eigene/r-watch/`: lokale Video-Analyse (yt-dlp + ffmpeg, Hook-Kontaktboegen
  15 s @ 15 fps, Body 1 Frame/3,5 s, YouTube-Auto-Subs statt Whisper) inkl. Helper
  `scripts/watch-extract.sh` (eigener Code). Quelle: quellenreview-2026-07-19 Teil D.
- `skills/eigene/r-debug/`: kombinierte Debug-Disziplin aus mattpocock
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
