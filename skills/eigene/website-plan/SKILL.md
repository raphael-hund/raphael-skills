---
name: website-plan
version: 2.4.0
description: >
  Plant eine Kunden-Website end-to-end als Dateien (kein Code): kanonischer
  Multi-Agent-Workflow, Research, SEO+AEO, IA-Gate, fertige Copy, Specs,
  Design-Gate mit Mockups, Design-System und Roadmap. Trigger: "/website-plan",
  "Website planen", "kompletter Website-Plan", "Site Copy SEO Layout planen",
  "mit Workflow Website planen", "Relaunch planen".
class: F
scope: agency
sensitivity: internal
source: >
  Eigene Session-Praxis 2026-08-11 (BRAUN/Sorglos) + Process-Primitive-Form
  aus writing-skills; Struktur-Ideen (progressive disclosure, action-first steps)
  aus Composio awesome-claude-skills und ayghri/i-have-adhd — Ideen-Merge, kein
  Wortlaut-Vendoring.
loads:
  - references/host-launch.md
  - references/constraints.md
  - references/deliverables-dod.md
  - references/roles-gauntlet.md
  - references/lessons-2026-08-11.md
  - references/workflow-mandat.md
  - references/seo-plan-schema.md
  - references/section-spec-template.md
  - references/mockup-brief.md
  - references/design-inspiration.md
  - references/copy-archetypes.md
  - references/component-research-pool.md
requires_skills:
  - copywriting@^0
  - seo@^0
completion_criteria:
  - "Workflow-Run-ID existiert; gestartetes Script ist Kanon (meta.name beginnt mit website-plan bzw. registriertes website-plan.rhai) — kein freestyle Script"
  - "Cockpit Ultracode/max Effort im Lauf dokumentiert oder gesetzt; kein Fable-agentType im Workflow"
  - "SCOPE in 00-meta-plan.md (FULL default oder explizit eng + Delta); bei FULL alle DoD-Dateien aus references/deliverables-dod.md vorhanden oder ehrlich fehlend gelistet"
  - "G-IA und G-DESIGN (bei FULL) als User-Hard-Stop mit 3 echten Varianten + Empfehlung — keine stillen Defaults"
  - "Vor G-DESIGN ist G-REF PASS: 2–3 lokale Referenz-Captures pro Richtung mit URL/Datum/Viewport/Region, reference-manifest.md und 3 eigenständige GPT-Prompts samt Attachment-Mapping"
  - "Keine erfundenen Reviews/Ratings/Zertifikate/#1; Proof nur aus Inventar"
  - "RUN_COMPLETE ist nur ein Laufstatus; PLAN_VERIFIED wird ausschließlich nach PASS des Final Critics und `python3 scripts/validate-plan.py <out_dir>` vergeben"
  - "Jede indexierbare URL hat genau einen Owner im Route-Manifest; jede sichtbare Section hat vollständige Copy-, Layout-, State-, Motion-, SEO- und Mockup-Felder"
  - "Für die gewählte Designrichtung existieren tatsächliche Mockup-Dateien plus Manifest; reine Briefs oder Full-Page-Miniaturen sind kein G-DESIGN-PASS"
  - "python3 /root/raphael-skills/tools/validate-skill.py auf diesem Skill-Ordner zeigt [OK]"
---

# website-plan

**Zweck:** Abhakbarer Website-**Plan** (Markdown unter `$OUT`) — Recherche, SEO,
Copy, Specs, Design-Richtung — **ohne** Production-Code.

**Archetyp:** Process-Primitive. Verlässlichkeit = Kanon-Workflow + Gates, nicht Parent-Solo.

Lies bei Bedarf: `references/lessons-2026-08-11.md` (Anti-Muster),  
`references/constraints.md` (MUSS/MUSS-NICHT),  
`references/deliverables-dod.md` (Dateien + DoD),  
`references/host-launch.md` (Grok/Claude Start),  
`references/roles-gauntlet.md` (Rollen),
`references/design-inspiration.md` (Pflicht vor `G-DESIGN`).

## Ablauf (in dieser Reihenfolge)

### 1. Mission-Args setzen — fertig wenn notiert

Aus dem User-Text ableiten (Defaults, **kein** Frage-Marathon):

| Feld | Default |
|---|---|
| `live_url` | leer wenn keine URL |
| `repo` + `repo_stand` | `IGNORIEREN` außer User/Repo klar |
| `out_dir` | `<repo\|cwd>/website-plan` |
| `firma` | aus URL/Text |
| `asset_dirs` | `public/` / genannte Ordner |
| `SCOPE` | **`FULL`** — eng nur bei klarem User-Wort |
| `overrides` | DESIGN.md / DECISIONS Frozen Rules |

**Check:** `$out_dir` existiert (`mkdir -p`); SCOPE steht fest.

### 2. Kanon-Workflow starten — fertig wenn Run-ID da

1. Cockpit **Ultracode / max**.  
2. Script **nur** aus Kanon laden und Platzhalter füllen — siehe `references/host-launch.md`.  
   - **Grok:** `name: website-plan` oder `workflow-website-plan.rhai`  
   - **Claude Lauf 1:** `workflow-website-plan.claude.js`  
3. Workflow-Tool feuern; **Run-ID** Raphael nennen und in `00-meta-plan.md` vorsehen.

**Check:** Run-ID im Session-Log. Fehlt sie → Lauf gilt als **nicht gestartet**.

### 3. Workflow laufen lassen — fertig wenn Gate oder RUN_COMPLETE

Parent **watched** (Journal/Progress). Schreibt **nicht** parallel dieselben Deliverables.

| STOP | Aktion |
|---|---|
| `G-IA` | 3 Varianten + Empfehlung → User wählt → Claude Lauf 2 / Rhai-Resume |
| `G-DESIGN` | Erst `G-REF=PASS`; 3 Richtungen + Referenz-Captures + GPT-Prompts + 3 Vergleichsbilder → User wählt → Claude Lauf 3 |
| enger SCOPE done | Delta dokumentieren; FULL separat |
| `RUN_COMPLETE` | weiter zu Schritt 4; noch keine Qualitätsfreigabe |

Gate-Format: `references/constraints.md`.

**Check:** Bei FULL kein Übergang Copy←ohne G-IA-Wahl und kein G-DESIGN ohne
lokale Referenzbilder, Manifest und drei ausführbare Prompt-Pakete. Fehlt ein
Bildtool, ist der Stop `AWAITING_MOCKUPS`, nicht eine blinde Designwahl.

### 4. Fail-closed verifizieren — fertig wenn PLAN_VERIFIED oder BLOCKED

Liste: `references/deliverables-dod.md`. Final Critic muss `PASS` liefern. Danach:

```bash
python3 /root/raphael-skills/skills/eigene/website-plan/scripts/validate-plan.py "$OUT"
```

Löcher: gezielter Nachzieh-Agent. `RUN_COMPLETE` + Validator rot = `BLOCKED`, nie
`PLAN_VERIFIED`. `SHIP_READY` gehört erst zur späteren Build-/web-QA.

**Check:** Validator Exit 0, Critic PASS und FULL-DoD grün → `PLAN_VERIFIED`.

## Quellen (kurz)

Recherche primär → Live-URL optional → Repo nur bei `MITNUTZEN` (nie Source of Truth) → nur belegbare Facts.

## Rote Linien (eine Zeile)

Kein Freestyle-Script · kein Solo-Plan ohne Run-ID · kein Fable-Worker · kein Fake-Proof · keine stillen Gates · kein Code-Build hier · kein Opus auf Inventar/Humanizer-All (Tempo-Shards).

## Kanon-Dateien

| Host | Datei |
|---|---|
| Grok | `references/workflow-website-plan.rhai` |
| Claude 1→G-IA | `references/workflow-website-plan.claude.js` |
| Claude 2→G-DESIGN | `references/workflow-website-plan-after-gia.claude.js` |
| Claude 2b Mockup-Recheck | `references/workflow-website-plan-design-gate.claude.js` |
| Claude 3 close | `references/workflow-website-plan-close.claude.js` |
| Claude Bilder (opt.) | `references/workflow-website-plan-bilder.claude.js` |
