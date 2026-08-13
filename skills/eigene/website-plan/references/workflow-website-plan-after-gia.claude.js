/**
 * website-plan Lauf 2 — nach G-IA Freigabe (Claude-Host). VERSION 2.4.0 — Tempo-Fix 5c51f3a5
 * Setze MISSION + GIA_CHOICE, dann Workflow starten.
 */
export const meta = {
  name: 'website-plan-after-gia',
  description: 'Nach G-IA: Copy, Specs, G-DESIGN, Close',
  phases: [
    { title: 'Lock-IA', detail: '05-sitemap-ia festschreiben' },
    { title: 'Copy', detail: 'Final + humanizer' },
    { title: 'Specs', detail: 'Section specs' },
    { title: 'Design-Research', detail: 'Captures + Manifest + G-REF' },
    { title: 'Design', detail: '3 Richtungen + GPT-Prompts + Vergleichs-Heros + G-DESIGN' },
  ],
}

const OUT = '/*MISS:OUT*/'
const REPO = '/*MISS:REPO*/'
const LIVE_URL = '/*MISS:LIVE*/'
const FIRMA = '/*MISS:FIRMA*/'
const GIA_CHOICE = '/*MISS:GIA*/' // A | B | C | Mix-Beschreibung
const OVERRIDES = ''

if (OUT.includes('MISS:') || GIA_CHOICE.includes('MISS:')) {
  throw new Error('Platzhalter OUT/GIA_CHOICE setzen')
}

// TEMPO — Session 5c51f3a5: 1× Opus-Humanizer = 44 Min / 157 Tools
const SPEED = `TEMPO-REGELN (hart):
1) Copy/Humanize/Specs in parallelen Shards (index%4), nie ein Agent für alle Seiten.
2) Humanizer = kimi-worker (DE-Copy) — NIE ein einzelner opus-builder über alle Dateien.
3) Ein Pass pro Datei. Max 3 Tool-Calls pro Datei. Keine Re-Open-Schleifen.
4) Schema-Return sobald Shard fertig. Max 4–6 Agents gleichzeitig.`

const ULTRA = `Long-horizon ultracode. PLAN only. No nested agents. No fake proof.
OUT=${OUT} FIRMA=${FIRMA} LIVE=${LIVE_URL} REPO=${REPO}
G-IA Wahl des Users: ${GIA_CHOICE}
${OVERRIDES}
${SPEED}`

const TEXT = {
  type: 'object', required: ['summary', 'paths_written'],
  properties: {
    summary: { type: 'string' },
    paths_written: { type: 'array', items: { type: 'string' } },
  },
}
const VARIANTS = {
  type: 'object', required: ['recommendation', 'options', 'markdown', 'g_ref_pass', 'mockups_ready'],
  properties: {
    recommendation: { type: 'string' },
    options: {
      type: 'array', minItems: 3, maxItems: 3,
      items: {
        type: 'object', required: ['id', 'title', 'meaning', 'tradeoff'],
        properties: {
          id: { type: 'string' }, title: { type: 'string' },
          meaning: { type: 'string' }, tradeoff: { type: 'string' },
        },
      },
    },
    markdown: { type: 'string' },
    g_ref_pass: { type: 'boolean' },
    mockups_ready: { type: 'boolean' },
    prompt_path: { type: 'string' },
    reference_manifest_path: { type: 'string' },
    generated_paths: { type: 'array', items: { type: 'string' } },
  },
}
const VERIFY = {
  type: 'object', required: ['exit_code', 'stdout'],
  properties: { exit_code: { type: 'integer' }, stdout: { type: 'string' } },
}

phase('Lock-IA')
await agent(ULTRA + `ROLLE IA-Lock.
Schreibe final ${OUT}/05-sitemap-ia.md und ${OUT}/05b-copy-style.md (Archetyp + 3 Zeilen Begründung)
gemäß User-Wahl ${GIA_CHOICE} und Dateien 05-ia-*.`, {
  label: 'ia-lock', phase: 'Lock-IA', agentType: 'luna-worker', schema: TEXT, stallMs: 0 })

phase('Copy')
// 4 parallele Copy-Shards (Seiten-Liste aus IA / bestehende 06-seiten)
await parallel([0, 1, 2, 3].map((shard) => () =>
  agent(ULTRA + `ROLLE Copywriter Shard ${shard}/4.
Aus ${OUT}/05-sitemap-ia.md die Priority-Pages listen (oder vorhandene ${OUT}/06-seiten/*.md).
Sortiert; bearbeite NUR Seiten mit (index % 4) === ${shard}.
Vollständige DE-Copy je Seite → ${OUT}/06-seiten/<slug>.md.
Nur belegbare Claims. Kein Lorem. Ein Write-Pass pro Datei.`, {
    label: 'copy-shard-' + shard, phase: 'Copy',
    agentType: 'kimi-worker', schema: TEXT, stallMs: 0,
  })
))
// Humanizer parallel, andere Familie als reiner Massen-Opus-Loop
await parallel([0, 1, 2, 3].map((shard) => () =>
  agent(ULTRA + `ROLLE Humanizer Shard ${shard}/4.
Liste ${OUT}/06-seiten/*.md sortiert; nur (index % 4) === ${shard}.
Entfloskeln, Fakten bewahren, AI-Slop raus. Status-Kopf: READY_FOR_VERIFY
(FINAL erst nach Critic+Validator). Ein Edit-Pass pro Datei, max 3 Tools/Datei.`, {
    label: 'humanize-shard-' + shard, phase: 'Copy',
    agentType: 'kimi-worker', schema: TEXT, stallMs: 0,
  })
))

phase('Specs')
await parallel([0, 1, 2, 3].map((shard) => () =>
  agent(ULTRA + `ROLLE Section-Specs Shard ${shard}/4.
Liste ${OUT}/06-seiten/*.md sortiert; nur (index % 4) === ${shard}.
Pro sichtbarer Section vollständigen Spec: Zweck, exakte Copy, Desktop/Mobile,
Components/States, Motion Trigger→Element→Initial/Final→Dauer→Easing→Stagger→
Reduced-Motion, SEO, Mockup-Brief. Kein "wie oben". Copy nicht umschreiben.
Shard 0 schreibt zusätzlich ${OUT}/06-seiten/route-manifest.tsv (Owner je URL).`, {
    label: 'specs-shard-' + shard, phase: 'Specs',
    agentType: 'luna-worker', schema: TEXT, stallMs: 0,
  })
))

phase('Design-Research')
await agent(ULTRA + `ROLLE Design-Reference-Research (Writer).
Lies references/design-inspiration.md aus dem website-plan Skill. Formuliere zuerst
3 strukturell verschiedene Suchhypothesen A/B/C. Prüfe Repo, Brand-Boards,
Asset-Inventar und User-Referenzen. Nutze Mobbin nur wenn der Connector in diesem
Lauf wirklich exponiert ist; sonst reale Websites per Browser/Web und notiere
"Mobbin: nicht verfügbar". Pro Richtung 2–3 relevante Regionen capturen, nicht
nur URL-Listen oder unlesbare Full-Page-Miniaturen. Speichere lokale PNGs unter
${OUT}/09-mockups/references/ und schreibe ${OUT}/09-mockups/reference-manifest.md
plus ${OUT}/09-mockups/reference-manifest.tsv
mit URL, Datum, Viewport, Region, pattern_take, do_not_copy, 0/1/2-Eignung und
genau einer Modellrolle. Nur Planungsreferenzen, keine Asset-Lizenz ableiten.
Fahre alle binären G-REF-Checks aus design-inspiration.md und dokumentiere PASS/FAIL.
Schreibe ausschließlich unter ${OUT}/ und liste alle Pfade in paths_written.`, {
  label: 'design-reference-research', phase: 'Design-Research',
  agentType: 'grok-worker', effort: 'high', schema: TEXT, stallMs: 0 })

phase('Design')
const des = await agent(ULTRA + `ROLLE Design-Richtungen + Prompt-Pakete.
Lies ${OUT}/09-mockups/reference-manifest.md und references/design-inspiration.md.
Bei G-REF FAIL: nachrecherchieren und reparieren, nicht zum Gate springen.
Schreibe GENAU 3 strukturell verschiedene Richtungen A/B/C nach
${OUT}/09-mockups/briefs.md und GENAU 3 eigenständige, einzeln kopierbare
GPT-Prompts nach ${OUT}/09-mockups/gpt-prompts.md. Jeder Prompt: 1 horizontaler
Hero, identischer Viewport und identische FINAL-Copy, 2–3 lokale Referenzen in
expliziter Attachment-Reihenfolge mit je einer Modellrolle und klaren
Nicht-Kopieren-Grenzen. Keine bloßen URLs als visueller Input.
Wenn ein Bildtool verfügbar ist, hänge die lokalen Referenzdateien tatsächlich
an und erzeuge A/B/C-Hero unter ${OUT}/09-mockups/generated/. Prüfe Quellenlogos,
Quellen-Copy, Textabweichung, Fake-Proof und erkennbare Kopie. Setze mockups_ready
nur true, wenn genau drei vergleichbare, geprüfte Hero-Dateien existieren.
Return g_ref_pass, mockups_ready, Pfade und markdown.`, {
  label: 'design-variants', phase: 'Design', agentType: 'kimi-worker', schema: VARIANTS, stallMs: 0 })

const check = await agent(`Read-only gate verifier. Run exactly:
python3 /root/raphael-skills/skills/eigene/website-plan/scripts/validate-design-gate.py '${OUT}'
Return real exit code and complete stdout. Do not repair or reinterpret.`, {
  label: 'design-gate-preflight', phase: 'Design',
  agentType: 'sol-pruefer', effort: 'high', schema: VERIFY, stallMs: 0 })
if (!check || (check.exit_code !== 0 && check.exit_code !== 3)) {
  return { gate: 'G-REF', status: 'BLOCKED', out_dir: OUT, evidence: check }
}
if (check.exit_code === 3) {
  return {
    gate: 'G-DESIGN',
    status: 'AWAITING_MOCKUPS',
    recommendation: des.recommendation,
    options: des.options,
    prompt_path: des.prompt_path || `${OUT}/09-mockups/gpt-prompts.md`,
    reference_manifest_path: des.reference_manifest_path || `${OUT}/09-mockups/reference-manifest.md`,
    message: 'G-REF PASS. Erzeuge mit den 3 GPT-Prompts je einen Hero, schreibe comparison-manifest.tsv und starte danach den kanonischen Lauf 2b website-plan-design-gate.',
    evidence: check,
    out_dir: OUT,
  }
}
return {
  gate: 'G-DESIGN',
  status: 'AWAITING_USER',
  recommendation: des && des.recommendation,
  options: des && des.options,
  generated_paths: des && des.generated_paths,
  evidence: check,
  message: 'G-DESIGN STOP: Drei geprüfte Vergleichs-Heros liegen vor. Raphael wählt A/B/C oder Mix. Danach website-plan-close Workflow.',
  out_dir: OUT,
}
