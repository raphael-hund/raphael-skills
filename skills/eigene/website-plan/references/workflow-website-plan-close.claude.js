/**
 * website-plan Lauf 3 — nach G-DESIGN (Claude). VERSION 2.3.0
 */
export const meta = {
  name: 'website-plan-close',
  description: 'Design-system, component map, roadmap, final critic',
  phases: [
    { title: 'Preflight', detail: 'G-REF, A/B/C-Heros und User-Wahl verifizieren' },
    { title: 'Close', detail: '07/08/10/12 + final critic' },
  ],
}

const OUT = '/*MISS:OUT*/'
const REPO = '/*MISS:REPO*/'
const DESIGN_CHOICE = '/*MISS:DESIGN*/'
const REPO_STAND = 'MITNUTZEN'

if (OUT.includes('MISS:') || DESIGN_CHOICE.includes('MISS:') ||
    !/^(A|B|C|MIX:[\wÄÖÜäöüß ,.;:/()+&-]{3,200})$/i.test(DESIGN_CHOICE.trim())) {
  throw new Error('Platzhalter setzen')
}

// Lauf 3 wird erst gestartet, nachdem drei Vergleichs-Heros gesichtet wurden.
// DESIGN_CHOICE enthält A/B/C oder eine explizite Mix-Entscheidung des Users.

const ULTRA = `Long-horizon ultracode. PLAN only. OUT=${OUT} REPO=${REPO} DESIGN=${DESIGN_CHOICE} REPO_STAND=${REPO_STAND}`
const TEXT = {
  type: 'object', required: ['summary', 'paths_written'],
  properties: {
    summary: { type: 'string' },
    paths_written: { type: 'array', items: { type: 'string' } },
  },
}
const VERIFY = {
  type: 'object', required: ['exit_code', 'stdout'],
  properties: { exit_code: { type: 'integer' }, stdout: { type: 'string' } },
}

phase('Preflight')
const preflight = await agent(`Read-only preflight. Run exactly:
python3 /root/raphael-skills/skills/eigene/website-plan/scripts/validate-design-gate.py '${OUT}' --choice '${DESIGN_CHOICE}'
Return real exit code and complete stdout. Do not repair or reinterpret.`, {
  label: 'close-preflight', phase: 'Preflight', agentType: 'sol-pruefer', schema: VERIFY, stallMs: 0 })
if (!preflight || preflight.exit_code !== 0) {
  return { status: 'BLOCKED', plan_verified: false, gate: 'G-DESIGN', out_dir: OUT, evidence: preflight }
}

phase('Close')
await parallel([
  () => agent(ULTRA + `ROLLE Design-System-Plan → ${OUT}/07-design-system-plan.md
(Farben, Adobe Fonts first, Type, Spacing-Ideen, Button-States/Hover-Vision, Header, Motion, Icons).`, {
    label: 'design-system', phase: 'Close', agentType: 'opus-builder', schema: TEXT, stallMs: 0 }),
  () => agent(ULTRA + `ROLLE Component-Map → ${OUT}/08-component-map.md
Repo scannen wenn MITNUTZEN; Library nur Inspiration, kein Dump.`, {
    label: 'components', phase: 'Close', agentType: 'luna-worker', schema: TEXT, stallMs: 0 }),
  () => agent(ULTRA + `ROLLE Roadmap → ${OUT}/10-roadmap.md und ${OUT}/12-verbote-und-gates.md
G-IA/G-DESIGN Entscheidungen dokumentieren. Schreibe exakt die maschinenlesbare
Zeile G-DESIGN_CHOICE: ${DESIGN_CHOICE}. 11-open-questions updaten.`, {
    label: 'roadmap', phase: 'Close', agentType: 'grok-worker', schema: TEXT, stallMs: 0 }),
])
const critic = await agent(ULTRA + `ROLLE Final-Critic adversarial auf gesamtes ${OUT}/.
Datei ${OUT}/13-final-critic.md — fehlende DoD-Punkte, schwache Specs.
Prüfe zusätzlich G-REF, reference-manifest.md, drei GPT-Prompts, drei gesichtete
Vergleichs-Heros, dokumentierte G-DESIGN-Wahl, Route-Manifest, Per-Section-Specs
und Mockup-Manifest der gewählten Richtung. Return summary muss mit `VERDICT: PASS`
oder `VERDICT: FAIL` beginnen; FAIL enthält konkrete Fehl-Liste.`, {
  label: 'final-critic', phase: 'Close', agentType: 'sol-pruefer', schema: TEXT, stallMs: 0 })

const criticPass = critic && typeof critic.summary === 'string' && critic.summary.startsWith('VERDICT: PASS')
if (!criticPass) {
  return { status: 'BLOCKED', run_status: 'RUN_COMPLETE', plan_verified: false, out_dir: OUT, gate: null, critic }
}

return {
  status: 'RUN_COMPLETE',
  plan_verified: false,
  next: `python3 /root/raphael-skills/skills/eigene/website-plan/scripts/validate-plan.py ${OUT}`,
  out_dir: OUT,
  gate: null,
}
