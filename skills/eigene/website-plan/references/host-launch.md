# Host-Launch (Kanon-Workflow only)

## Platzhalter (Claude JS)

In den `.claude.js`-Templates nur `/*MISS:…*/` ersetzen:

| Platzhalter | Bedeutung |
|---|---|
| `OUT` | absoluter Plan-Ordner |
| `REPO` | Repo-Pfad oder leer |
| `LIVE` / `LIVE_URL` | Live-URL oder leer |
| `FIRMA` | Firmenname |
| `REPO_STAND` | `MITNUTZEN` \| `IGNORIEREN` |
| `ASSETS` / `ASSET_DIRS` | Medienpfade |
| `SCOPE` | Default `FULL` |
| `OVERRIDES` | DESIGN/DECISIONS Frozen Rules kurz |
| `GIA` / `GIA_CHOICE` | nach G-IA: A/B/C/Mix |
| `DESIGN` / `DESIGN_CHOICE` | nach G-DESIGN |

`meta.name` **muss** mit `website-plan` beginnen.

## Grok

```
workflow name: website-plan
# oder script_path:
# /root/raphael-skills/skills/eigene/website-plan/references/workflow-website-plan.rhai
# auch: ~/.grok/workflows/website-plan.rhai
args: { firma, live_url, out_dir, repo_stand, asset_dirs, overrides, extra }
agent_budget: 128–256
```

## Claude — drei Läufe + bedingter Lauf 2b

| Lauf | Script | Ende |
|---|---|---|
| 1 | `workflow-website-plan.claude.js` | `gate: G-IA` **oder** enger SCOPE done |
| 2 | `workflow-website-plan-after-gia.claude.js` | `G-REF=PASS`, dann `G-DESIGN` oder `AWAITING_MOCKUPS` |
| 2b | `workflow-website-plan-design-gate.claude.js` | nur nach externen Heros; deterministischer Recheck → G-DESIGN |
| 3 | `workflow-website-plan-close.claude.js` | `RUN_COMPLETE` oder `BLOCKED`; danach Validator |

Vor Start: Datei lesen → Platzhalter ersetzen → Workflow-Tool mit Script-String.

Optional validieren (JS):  
`python3 /root/raphael-skills/skills/eigene/ultra-loop/scripts/validate-workflow.py <script>`  
wenn fürs Format anwendbar; rot = nicht starten.

## Ultracode-Klausel (in jeden Agent-Prompt)

```
Long-horizon ultracode session. Human may step away between gates.
Do not stop early. Produce complete artifacts for your role.
No code implementation — planning deliverables only.
Spawn no nested agents; only the workflow starts agents.
Never invent reviews, ratings, certificates, or #1 claims.
```

## Nach dem Start

1. Run-ID Raphael melden + in `00-meta-plan.md`  
2. Parent watched Journal/Progress — schreibt **nicht** parallel dieselben Deliverables  
3. Bei `AWAITING_MOCKUPS`: 3 Prompts + exakte Attachment-Pfade liefern; erst
   nach drei Vergleichsbildern Lauf 2b starten und die G-DESIGN-Wahl fragen  
4. Bei `AWAITING_USER`: nur Gate-Frage (3 Varianten + Empfehlung)  
5. User-Antwort → Lauf 2 bzw. 2b/3 (Claude) oder Workflow-Resume (Grok Rhai)

## Tempo-Check vor Start

1. Script ist Kanon (nicht freestyle mit `opus-builder` auf Assets/Humanizer-All).  
2. Assets/Copy/Humanize/Specs laufen in Shards (`index % 4`).  
3. Bild-Workflows: 1 Bild pro Agent, max 5 parallel, Wait kurz.  
4. Parent startet **keine** Extra-Opus-Wellen „für Qualität“ auf Mechanik-Rollen.

