#!/usr/bin/env node
/** Exact state identities, declared scope, and imported evidence receipts.
 * G1 validators are imported directly; the standalone sweep CLI's pure helpers
 * are evaluated without launching its browser. Browser assertions live in the
 * sibling run-sweep-check and run-formular-check evals.
 */
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { sweepRequiredGedeckt, sweepVertrag } from '../scripts/g1-gate.mjs';
import { wegwerfOrdner } from './lib/wegwerf.mjs';

const WEB = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = fs.readFileSync(path.join(WEB, 'scripts/shot-sweep.mjs'), 'utf8');
const tmp = wegwerfOrdner('web-upgrade-contracts-states-');
const identity = { runId: 'state-run', buildRevision: 'state-revision' };
const base = 'http://example.test';
const exact = { route: '/checkout', viewport: 'mobile', target: 'payment', state: 'success' };
const hash = file => createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const empty = () => ({ required: [], captured: [], not_applicable: [], failed: [] });
let total = 0;
let failures = 0;
function check(ok, label, detail = '') {
  total++;
  if (!ok) failures++;
  console.log(`  [${ok ? 'OK' : 'ROT'}] ${label}`);
  if (!ok && detail) console.log(`        ${detail}`);
}
function cut(marker) {
  const start = source.indexOf(marker);
  const end = source.indexOf('\n}\n', start);
  if (start < 0 || end < 0) throw new Error(`Sweep helper missing: ${marker}`);
  return source.slice(start, end + 3);
}
function sweepHelpers(spec = {}, { routes = ['/checkout'], mobile = true } = {}) {
  const body = ['matrixPush', 'stateKey', 'stateIdentity', 'ingestStateSpec', 'reconcileMatrix']
    .map(name => cut(`function ${name}(`)).join('\n');
  return new Function('fs', 'path', 'createHash', 'STATE_SPEC', 'NA_REASONS', 'ROUTES', 'MOBILE',
    'RUN_ID', 'BUILD_REVISION', 'BASE', `${body}; return { stateIdentity, ingestStateSpec, reconcileMatrix };`)(
    fs, path, createHash, spec, new Set(['static-page', 'no-form', 'no-async-data']), routes, mobile,
    identity.runId, identity.buildRevision, base);
}
function ingest(spec, options) {
  const helpers = sweepHelpers(spec, options);
  const matrix = empty();
  helpers.ingestStateSpec(matrix);
  return { matrix, helpers };
}
function manifest(matrix = empty()) {
  return {
    schema: 'web/shot-sweep/v2', run_id: identity.runId, build_revision: identity.buildRevision,
    status: 'PASS', base, capture_profile: { static: false, states: matrix.required.length > 0,
      mobile: true, presentation: 'runtime', modified_dom: false },
    state_matrix: matrix,
    routes: [{ route: '/checkout', viewport_label: 'mobile', shots: [
      { file: 'payment.png', target: 'payment', state: 'success', viewport_label: 'mobile' },
    ] }],
  };
}
function coveredBySweep(required, captured = [], notApplicable = []) {
  const helpers = sweepHelpers();
  const m = { required: [required], captured, not_applicable: notApplicable, failed: [] };
  helpers.reconcileMatrix({ state_matrix: m });
  return m.failed.length === 0;
}

console.log('\nState-Coverage — exact identities and real receipt references\n');
const contract = fs.readFileSync(path.join(WEB, 'references/state-capture-contract.md'), 'utf8');
check(['web/state-spec/v1', 'web/shot-sweep/v2', 'run_id', 'build_revision', 'capture_profile']
  .every(value => contract.includes(value)), 'Published state contract names schemas and identity');
check(sweepVertrag(manifest(), identity).length === 0,
  'No declared scenarios means no universal state quota');
for (const [name, covered] of [['Sweep', coveredBySweep], ['G1', (req, cap, na) =>
  sweepRequiredGedeckt(req, { captured: cap, not_applicable: na })]]) {
  check(covered(exact, [{ ...exact }], []), `${name}: exact captured key satisfies requirement`);
  for (const field of ['route', 'viewport', 'target', 'state']) {
    check(!covered(exact, [{ ...exact, [field]: 'foreign' }], []), `${name}: foreign ${field} is not coverage`);
    const missing = { ...exact }; delete missing[field];
    check(!covered(exact, [missing], []), `${name}: missing ${field} is not coverage`);
  }
  for (const status of ['FAIL', 'BLOCKED', 'NOT_RUN']) {
    check(!covered(exact, [{ ...exact, status }], []), `${name}: ${status} capture is not coverage`);
  }
  check(covered(exact, [], [{ ...exact, reason: 'no-form' }]), `${name}: exact allowed N/A satisfies scope`);
  check(!covered(exact, [], [{ ...exact, target: 'newsletter', reason: 'no-form' }]), `${name}: foreign N/A does not satisfy scope`);
  check(!covered(exact, [], [{ ...exact, reason: 'not-tested' }]), `${name}: invalid N/A reason does not satisfy scope`);
}

{
  const hover = { ...exact, state: 'hover' };
  const m = manifest({ required: [hover], captured: [hover], not_applicable: [], failed: [] });
  m.routes[0].shots[0].state = 'hover';
  check(sweepVertrag(m, identity).length === 0, 'A declared hover-only task can be complete');
  m.routes[0].shots[0].target = 'unrelated';
  check(sweepVertrag(m, identity).length > 0, 'A matrix claim without a matching state shot is rejected');
}
for (const status of ['FAIL', 'BLOCKED', 'NOT_RUN', 'RUNNING']) {
  const m = manifest(); m.status = status;
  check(sweepVertrag(m, identity).length > 0, `G1 rejects overall ${status}`);
}
{
  const m = manifest({ required: [exact], captured: [exact], not_applicable: [], failed: [] });
  check(sweepVertrag(m, identity).length === 0, 'Exact required state has a corresponding shot');
  m.run_id = 'foreign';
  check(sweepVertrag(m, identity).length > 0, 'Foreign run cannot satisfy G1');
  m.run_id = identity.runId; m.build_revision = 'foreign';
  check(sweepVertrag(m, identity).length > 0, 'Foreign build cannot satisfy G1');
}
{
  const { matrix } = ingest({ scenarios: [{ id: 'contact', states: ['loading', 'success'] }] },
    { routes: ['/', '/kontakt'], mobile: true });
  check(matrix.required.length === 8 && new Set(matrix.required.map(r => r.target)).size === 1,
    'Unscoped scenario expands selected routes/viewports with a stable target');
  const { matrix: scoped } = ingest({ scenarios: [{ id: 'contact', route: '/kontakt', viewport: 'mobile', states: ['success'] }] });
  check(scoped.required.length === 1 && scoped.required[0].viewport === 'mobile',
    'Explicit viewport remains scoped');
  const { matrix: desktop } = ingest({ targets: [{ id: 'nav', states: ['focus'] }] }, { mobile: false });
  check(desktop.required.length === 1 && desktop.required[0].viewport === 'desktop', 'Desktop-only run has desktop requirements');
  const { matrix: invalid } = ingest({ scenarios: [{ states: ['success'] }], not_applicable: [{ state: 'success', reason: 'no-form' }] });
  check(invalid.failed.length >= 2, 'Incomplete targets and broad N/A are setup failures');
  const { matrix: absent } = ingest({ _missing: '/missing/state-spec.json' });
  check(absent.failed.length > 0, 'Requested but absent state specification fails');
}

const evidenceFile = path.join(tmp, 'payment.png');
fs.writeFileSync(evidenceFile, 'deterministic state receipt fixture');
const receiptPath = path.join(tmp, 'playwright.json');
const receipt = { ...exact, run_id: identity.runId, build_revision: identity.buildRevision,
  base_url: base, status: 'PASS', evidence: [{ path: evidenceFile, sha256: hash(evidenceFile) }],
  keyboard: ['Tab', 'Enter'], focus: 'payment', role: 'dialog', name: 'Payment' };
const ref = { ...exact, id: 'payment', test: 'payment.spec.ts', receipt: receiptPath };
function imported(payload, specRef = ref) {
  fs.writeFileSync(receiptPath, JSON.stringify(payload));
  const { matrix, helpers } = ingest({ playwright_refs: [specRef] });
  helpers.reconcileMatrix({ state_matrix: matrix });
  return matrix;
}
check(imported(receipt).failed.length === 0, 'Matching Playwright receipt with hashed file is accepted');
for (const field of ['route', 'viewport', 'target', 'state', 'run_id', 'build_revision', 'base_url', 'status']) {
  check(imported({ ...receipt, [field]: 'foreign' }).failed.length > 0, `Playwright ${field} mismatch is rejected`);
}
check(imported({ ...receipt, evidence: [] }).failed.length > 0, 'Playwright JSON-PASS without evidence fails');
check(imported({ ...receipt, evidence: [{ path: evidenceFile, sha256: 'wrong' }] }).failed.length > 0,
  'Playwright file hash mismatch fails');
check(imported(receipt, { ...ref, receipt: path.join(tmp, 'absent.json') }).failed.length > 0,
  'Missing Playwright receipt fails');
fs.writeFileSync(evidenceFile, 'modified');
check(imported(receipt).failed.length > 0, 'Modified evidence invalidates previously matching Playwright receipt');

console.log(`\n${failures ? 'FAIL' : 'PASS'} ${total - failures}/${total} state checks`);
process.exit(failures ? 1 : 0);
