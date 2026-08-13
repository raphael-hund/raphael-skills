/** website-plan Lauf 2b — nach extern erzeugten A/B/C-Heros. VERSION 2.3.0 */
export const meta = {
  name: 'website-plan-design-gate',
  description: 'Deterministischer Recheck der Referenzen und drei Vergleichs-Heros vor G-DESIGN',
  phases: [{ title: 'Verify-Design', detail: 'G-REF + A/B/C comparison preflight' }],
}

const OUT = '/*MISS:OUT*/'
if (OUT.includes('MISS:')) throw new Error('Platzhalter OUT setzen')

const VERIFY = {
  type: 'object', required: ['exit_code', 'stdout'],
  properties: { exit_code: { type: 'integer' }, stdout: { type: 'string' } },
}

phase('Verify-Design')
const check = await agent(`Read-only gate verifier. Run exactly:
python3 /root/raphael-skills/skills/eigene/website-plan/scripts/validate-design-gate.py '${OUT}'
Return the real process exit code and complete stdout. Do not repair or reinterpret.`, {
  label: 'design-gate-preflight', phase: 'Verify-Design',
  agentType: 'sol-pruefer', effort: 'high', schema: VERIFY, stallMs: 0 })

if (!check || check.exit_code === 3) {
  return { gate: 'G-DESIGN', status: 'AWAITING_MOCKUPS', out_dir: OUT, evidence: check }
}
if (check.exit_code !== 0) {
  return { gate: 'G-REF', status: 'BLOCKED', out_dir: OUT, evidence: check }
}
return {
  gate: 'G-DESIGN', status: 'AWAITING_USER', out_dir: OUT,
  message: 'Deterministischer Preflight PASS. Raphael sichtet A/B/C und wählt A, B, C oder MIX:<Beschreibung>. Erst danach Lauf 3.',
  evidence: check,
}
