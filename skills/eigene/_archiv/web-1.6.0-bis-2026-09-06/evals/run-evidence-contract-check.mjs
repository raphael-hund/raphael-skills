#!/usr/bin/env node
/**
 * run-evidence-contract-check.mjs — U3A: revisionsgebundenes Run-Evidence.
 *
 * Treibt scripts/run-evidence.mjs. Fixtures leben unter os.tmpdir(), nie im
 * attestierten Repo. Kein Mock der CLI.
 *
 * Szenarien: Happy Path, Commit A/B stale, Misch-Run, Hash-Drift,
 * ship/v1 historisch nicht shipfaehig, optional/genannter Plan,
 * unknown/partial JSON, Scheduler-Felder, bind-build invalidiert Capture.
 */
import { spawn, spawnSync } from 'node:child_process';
import crypto from 'node:crypto';
import { createServer } from 'node:http';
import { receiptErrors } from '../scripts/run-evidence.mjs';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const WEB = path.join(HIER, '..');
const CLI = path.join(WEB, 'scripts', 'run-evidence.mjs');
const CONTRACT = path.join(WEB, 'references', 'run-evidence-contract.md');

const SCHEMA = 'web/run-evidence/v2';
const PLAN_SCHEMA = 'website-plan/verification/v3';
const G1_SCHEMA = 'web/g1-report/v2';
const SWEEP_SCHEMA = 'web/shot-sweep/v2';
const SHIP_V2 = 'visual-aaa/ship/v2';
const SHIP_V1 = 'visual-aaa/ship/v1';
const PHASES = ['planned', 'building', 'verifying', 'blocked', 'ready', 'deployed', 'learning'];

let fehler = 0;
let geprueft = 0;
const zeile = (ok, text, detail = '') => {
  geprueft++;
  if (!ok) fehler++;
  console.log(`  [${ok ? 'OK' : '!!'}]   ${text}`);
  if (detail) console.log(`         ${detail}`);
};

const sha256 = (p) => crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const leseJson = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const schreibJson = (p, obj) => {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, `${JSON.stringify(obj, null, 2)}\n`);
};

function cli(args, extra = {}) {
  return spawnSync(process.execPath, [CLI, ...args], {
    encoding: 'utf8',
    timeout: 15000,
    ...extra,
  });
}

function setup(prefix = 'run-ev-') {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), prefix));
  const repo = path.join(root, 'repo');
  const out = path.join(root, 'run-out');
  const planDir = path.join(root, 'plan');
  fs.mkdirSync(repo);
  fs.mkdirSync(out);
  fs.mkdirSync(planDir);
  const truth = path.join(repo, 'truth.md');
  const design = path.join(repo, 'design.md');
  const planManifest = path.join(planDir, 'plan-manifest.json');
  fs.writeFileSync(truth, 'truth-a\n');
  fs.writeFileSync(design, 'design-a\n');
  const artifacts = Object.fromEntries(['contract', 'route_manifest', 'global_system', 'queue', 'decision_log', 'final_acceptance']
    .map(role => { fs.writeFileSync(path.join(planDir, `${role}.md`), `Agreed ${role} for the integration fixture.\n`); return [role, `${role}.md`]; }));
  fs.writeFileSync(path.join(planDir, 'home.md'), 'Home route: show the agreed contact action.\n');
  schreibJson(planManifest, { schema: 'website-plan/plan-manifest/v3', plan_id: 'demo', artifacts, shared_files: [],
    routes: [{ id: 'home', route: '/', priority: 'P0', owner: 'builder', page_spec: 'home.md', write_set: ['src/home.ts'],
      dependencies: [], viewports: { desktop: '1440x900', mobile: '390x844' }, states: ['default'], blockers: [],
      meta: 'yes', copy: 'yes', components: 'yes', acceptance: 'yes' }] });
  return { root, repo, out, planDir, truth, design, planManifest };
}

function evidencePath(out) {
  return path.join(out, 'run-evidence.json');
}

function createArgs(fx, opts = {}) {
  const args = [
    'create',
    '--out', fx.out,
    '--run-id', opts.runId ?? 'run-1',
    '--repo', fx.repo,
    '--revision', opts.revision ?? 'rev-a',
    '--base-url', opts.baseUrl ?? 'https://example.test',
    '--contract', `truth=${fx.truth}`,
    '--contract', `design=${fx.design}`,
  ];
  if (opts.plan) {
    args.push('--plan', opts.plan === true ? fx.planDir : opts.plan);
    args.push('--contract', `plan=${fx.planManifest}`);
  }
  if (opts.phase) args.push('--phase', opts.phase);
  return args;
}

function writeReceipt(file, schema, runId, revision, extra = {}) {
  const dir = path.dirname(file);
  const render = path.join(dir, 'fold.png');
  if (!fs.existsSync(render)) fs.writeFileSync(render, Buffer.alloc(12000));
  const defaults = { status: 'PASS', base_url: 'https://example.test' };
  if (schema === PLAN_SCHEMA) Object.assign(defaults, { plan_id: 'demo', manifest: 'plan-manifest.json',
    manifest_sha256: sha256(path.join(dir, '../plan/plan-manifest.json')) });
  if (schema === G1_SCHEMA) Object.assign(defaults, { ok: true, routes: ['/'], results: [{ name: 'unit', ok: true, skipped: false, detail: 'fixture check' }] });
  if (schema === SWEEP_SCHEMA) Object.assign(defaults, {
    routes: [{ route: '/', viewport_label: 'desktop', status: 200, shots: [{ file: 'fold.png', sha256: sha256(render) }] }],
    capture_profile: { static: true, states: false, mobile: false },
    state_matrix: { required: [], captured: [], not_applicable: [], failed: [] },
  });
  if (schema === SHIP_V2) Object.assign(defaults, {
    ok: true, self_read: true, g1_exit: 0,
    pages: [{ id: 'fold', route: '/', viewport: 'desktop', render, sha256: sha256(render) }],
    critic_verdicts: [{ page_id: 'fold', round: 1, verdict: 'pass', biggest_gap: 'none', confidence: 'HIGH', beleg: 'fold.png oben zeigt lesbare Navigation ohne Überlappung.' }],
    inputs: Object.fromEntries([['g1', 'g1-report.json'], ['sweep', 'manifest.json']].map(([kind, name]) => {
      const source = path.join(dir, name);
      return [kind, { path: source, sha256: fs.existsSync(source) ? sha256(source) : 'missing' }];
    })),
  });
  schreibJson(file, {
    ...defaults,
    schema,
    ...(schema === PLAN_SCHEMA ? {} : { run_id: runId, build_revision: revision }),
    ...extra,
  });
  return file;
}

function attach(fx, kind, file) {
  return cli(['attach', '--out', fx.out, '--kind', kind, '--path', file]);
}

console.log('\nRun-Evidence-Vertrag — CLI create/validate/attach\n');

zeile(fs.existsSync(CLI), 'scripts/run-evidence.mjs existiert', CLI);
zeile(fs.existsSync(CONTRACT), 'references/run-evidence-contract.md existiert', CONTRACT);

const contractText = fs.existsSync(CONTRACT) ? fs.readFileSync(CONTRACT, 'utf8') : '';
zeile(
  contractText.includes(SCHEMA)
    && PHASES.every((p) => contractText.includes(p))
    && /run-isoliert/.test(contractText)
    && /SHA-256|sha256/i.test(contractText),
  'Contract nennt Schema, Phasen, run-isolierten Ort, SHA-256',
);
zeile(
  /visual-aaa\/ship\/v1/.test(contractText)
    && /nie/.test(contractText)
    && /create/.test(contractText)
    && /validate/.test(contractText)
    && /attach/.test(contractText)
    && /bind-build/.test(contractText),
  'Contract: CLI create/validate/attach/bind-build; ship/v1 nicht shipfaehig',
);
zeile(
  /units|unit_progress|checklist/.test(contractText)
    && /BLOCKED/.test(contractText)
    && /optionaler Website-Plan/.test(contractText),
  'Contract verbietet Scheduler-Felder und beschreibt optionalen Plan',
);

// --- Happy Path ---
{
  const fx = setup('run-ev-happy-');
  const created = cli(createArgs(fx, { plan: true }));
  zeile(
    created.status === 0 && /RUN_EVIDENCE=PASS/.test(created.stdout),
    'Happy: create Exit 0 / PASS',
    `exit=${created.status} stdout=${(created.stdout || '').trim()} stderr=${(created.stderr || '').trim()}`,
  );
  const evFile = evidencePath(fx.out);
  let ev = null;
  try { ev = leseJson(evFile); } catch (e) { ev = { _err: String(e) }; }
  zeile(
    ev?.schema === SCHEMA
      && ev?.run_id === 'run-1'
      && ev?.target?.repo === fx.repo
      && ev?.target?.revision === 'rev-a'
      && ev?.target?.base_url === 'https://example.test'
      && ev?.plan?.required === true
      && ev?.plan?.path === fx.planDir
      && ev?.phase === 'planned'
      && Array.isArray(ev?.contracts)
      && ev.contracts.length >= 3
      && ev.contracts.every((c) => c.role && c.path && c.sha256 === sha256(c.path)),
    'Happy: Manifest bindet run_id, repo, revision, base_url, Contract-Hashes',
  );
  zeile(
    !fs.existsSync(path.join(fx.repo, 'run-evidence.json'))
      && evFile.startsWith(fx.out),
    'Happy: Receipt liegt run-isoliert ausserhalb des Ziel-Repos',
  );

  const bound = cli(['bind-build', '--out', fx.out, '--revision', 'rev-a']);
  zeile(
    bound.status === 0 && /RUN_EVIDENCE=PASS/.test(bound.stdout),
    'Happy: bind-build friert Revision ein',
    `exit=${bound.status} ${(bound.stdout || '').trim()}`,
  );

  const planR = writeReceipt(path.join(fx.out, 'plan-verification.json'), PLAN_SCHEMA, 'run-1', 'rev-a', { status: 'PASS' });
  const g1R = writeReceipt(path.join(fx.out, 'g1-report.json'), G1_SCHEMA, 'run-1', 'rev-a', { ok: true });
  const sweepR = writeReceipt(path.join(fx.out, 'manifest.json'), SWEEP_SCHEMA, 'run-1', 'rev-a', {});
  const shipR = writeReceipt(path.join(fx.out, 'visual-ship.json'), SHIP_V2, 'run-1', 'rev-a', { ok: true });

  const aPlan = attach(fx, 'plan', planR);
  const aG1 = attach(fx, 'g1', g1R);
  const aSw = attach(fx, 'sweep', sweepR);
  const aShip = attach(fx, 'ship', shipR);
  zeile(
    [aPlan, aG1, aSw, aShip].every((r) => r.status === 0 && /RUN_EVIDENCE=PASS/.test(r.stdout)),
    'Happy: attach plan/g1/sweep/ship atomar PASS',
    [aPlan, aG1, aSw, aShip].map((r) => `e${r.status}:${(r.stdout || r.stderr || '').trim()}`).join(' | '),
  );

  const ready = cli(['validate', '--out', fx.out, '--ready']);
  zeile(
    ready.status === 0 && /RUN_EVIDENCE=PASS/.test(ready.stdout),
    'Happy Path: validate --ready PASS (AE4-Gegenstueck, gleiche Run-ID/Revision/Hashes)',
    `exit=${ready.status} ${(ready.stdout || '').trim()} ${(ready.stderr || '').trim()}`,
  );
  try { ev = leseJson(evFile); } catch { ev = null; }
  zeile(
    ev?.evidence?.plan?.sha256 === sha256(planR)
      && ev?.evidence?.g1?.sha256 === sha256(g1R)
      && ev?.evidence?.sweep?.sha256 === sha256(sweepR)
      && ev?.evidence?.ship?.sha256 === sha256(shipR)
      && (ev?.phase === 'ready' || ev?.phase === 'verifying'),
    'Happy: Evidence-Refs + Hashes sitzen; Phase ready/verifying',
  );
  fs.rmSync(fx.root, { recursive: true, force: true });
}

// --- Commit A/B stale ---
{
  const fx = setup('run-ev-stale-');
  cli(createArgs(fx, { plan: true, revision: 'commit-a' }));
  const planR = writeReceipt(path.join(fx.out, 'plan-verification.json'), PLAN_SCHEMA, 'run-1', 'commit-a', { status: 'PASS' });
  const g1R = writeReceipt(path.join(fx.out, 'g1-report.json'), G1_SCHEMA, 'run-1', 'commit-a', { ok: true });
  const sweepR = writeReceipt(path.join(fx.out, 'manifest.json'), SWEEP_SCHEMA, 'run-1', 'commit-a', {});
  const shipR = writeReceipt(path.join(fx.out, 'visual-ship.json'), SHIP_V2, 'run-1', 'commit-a', { ok: true });
  attach(fx, 'plan', planR);
  attach(fx, 'g1', g1R);
  attach(fx, 'sweep', sweepR);
  attach(fx, 'ship', shipR);
  const before = fs.readFileSync(evidencePath(fx.out), 'utf8');
  const rebound = cli(['bind-build', '--out', fx.out, '--revision', 'commit-b']);
  zeile(
    rebound.status === 0,
    'Stale: bind-build auf Commit B akzeptiert',
    `exit=${rebound.status} ${(rebound.stdout || '').trim()}`,
  );
  const afterBind = leseJson(evidencePath(fx.out));
  zeile(
    afterBind.target.revision === 'commit-b'
      && afterBind.evidence.g1 == null
      && afterBind.evidence.sweep == null
      && afterBind.evidence.ship == null
      && afterBind.evidence.plan != null,
    'Stale: neuer Build invalidiert Capture/G1/Ship; Plan bleibt bei haltendem Hash',
  );
  const readyB = cli(['validate', '--out', fx.out, '--ready']);
  zeile(
    readyB.status === 1 && /RUN_EVIDENCE=BLOCKED/.test(readyB.stdout),
    'AE4: Evidence von Commit A gegen Commit B ist BLOCKED',
    `exit=${readyB.status} ${(readyB.stdout || '').trim()}`,
  );
  const staleAttach = attach(fx, 'g1', g1R);
  zeile(
    staleAttach.status === 1 && /RUN_EVIDENCE=BLOCKED/.test(staleAttach.stdout),
    'Stale: attach eines Commit-A-G1 an Revision B ist BLOCKED',
    `exit=${staleAttach.status} ${(staleAttach.stdout || '').trim()}`,
  );
  const afterFail = fs.readFileSync(evidencePath(fx.out), 'utf8');
  zeile(afterFail !== before && leseJson(evidencePath(fx.out)).evidence.g1 == null, 'Stale: fehlgeschlagenes attach bleibt atomar (g1 bleibt null)');
  fs.rmSync(fx.root, { recursive: true, force: true });
}

// --- Misch-Run ---
{
  const fx = setup('run-ev-mix-');
  cli(createArgs(fx, { plan: true }));
  cli(['bind-build', '--out', fx.out, '--revision', 'rev-a']);
  const g1ok = writeReceipt(path.join(fx.out, 'g1-report.json'), G1_SCHEMA, 'run-1', 'rev-a', { ok: true });
  writeReceipt(path.join(fx.out, 'g1-other.json'), G1_SCHEMA, 'run-2', 'rev-a', { ok: true });
  attach(fx, 'g1', g1ok);
  const snapshot = fs.readFileSync(evidencePath(fx.out), 'utf8');
  const mixed = attach(fx, 'sweep', writeReceipt(path.join(fx.out, 'manifest.json'), SWEEP_SCHEMA, 'run-2', 'rev-a', {}));
  zeile(
    mixed.status === 1 && /RUN_EVIDENCE=BLOCKED/.test(mixed.stdout),
    'Misch-Run: Receipt mit fremder Run-ID wird nicht angehaengt',
    `exit=${mixed.status} ${(mixed.stdout || '').trim()}`,
  );
  zeile(fs.readFileSync(evidencePath(fx.out), 'utf8') === snapshot, 'Misch-Run: attach atomar, Datei unveraendert');

  const hand = leseJson(evidencePath(fx.out));
  hand.evidence.sweep = { path: path.join(fx.out, 'manifest.json'), sha256: sha256(path.join(fx.out, 'manifest.json')) };
  schreibJson(evidencePath(fx.out), hand);
  const mixedVal = cli(['validate', '--out', fx.out]);
  zeile(
    mixedVal.status === 1 && /RUN_EVIDENCE=BLOCKED/.test(mixedVal.stdout),
    'Misch-Run: zwei gruene Receipts mit unterschiedlichen Run-IDs ergeben keinen PASS',
    `exit=${mixedVal.status} ${(mixedVal.stdout || '').trim()}`,
  );
  fs.rmSync(fx.root, { recursive: true, force: true });
}

// --- Hash-Drift ---
{
  const fx = setup('run-ev-drift-');
  cli(createArgs(fx, { plan: true }));
  const planR = writeReceipt(path.join(fx.out, 'plan-verification.json'), PLAN_SCHEMA, 'run-1', 'rev-a', { status: 'PASS' });
  attach(fx, 'plan', planR);
  fs.writeFileSync(fx.design, 'design-b-drift\n');
  const drifted = cli(['validate', '--out', fx.out]);
  zeile(
    drifted.status === 1 && /RUN_EVIDENCE=BLOCKED/.test(drifted.stdout),
    'Hash-Drift: geaenderte Design-Datei invalidiert den Beleg',
    `exit=${drifted.status} ${(drifted.stdout || '').trim()}`,
  );
  const g1R = writeReceipt(path.join(fx.out, 'g1-report.json'), G1_SCHEMA, 'run-1', 'rev-a', { ok: true });
  const attachAfter = attach(fx, 'g1', g1R);
  zeile(
    attachAfter.status === 1 && /RUN_EVIDENCE=BLOCKED/.test(attachAfter.stdout),
    'Hash-Drift: attach nach Drift ist BLOCKED',
    `exit=${attachAfter.status} ${(attachAfter.stdout || '').trim()}`,
  );
  fs.rmSync(fx.root, { recursive: true, force: true });
}

// --- ship/v1 historisch nicht shipfaehig ---
{
  const fx = setup('run-ev-shipv1-');
  cli(createArgs(fx, { plan: true }));
  const planR = writeReceipt(path.join(fx.out, 'plan-verification.json'), PLAN_SCHEMA, 'run-1', 'rev-a', { status: 'PASS' });
  const g1R = writeReceipt(path.join(fx.out, 'g1-report.json'), G1_SCHEMA, 'run-1', 'rev-a', { ok: true });
  const sweepR = writeReceipt(path.join(fx.out, 'manifest.json'), SWEEP_SCHEMA, 'run-1', 'rev-a', {});
  const shipV1 = writeReceipt(path.join(fx.out, 'visual-ship.json'), SHIP_V1, 'run-1', 'rev-a', { ok: true, self_read: true, g1_exit: 0 });
  attach(fx, 'plan', planR);
  attach(fx, 'g1', g1R);
  attach(fx, 'sweep', sweepR);
  const v1attach = attach(fx, 'ship', shipV1);
  zeile(
    v1attach.status === 1 && /RUN_EVIDENCE=BLOCKED/.test(v1attach.stdout),
    'ship/v1: attach als aktueller Ship-Beleg ist BLOCKED (nicht still v2)',
    `exit=${v1attach.status} ${(v1attach.stdout || '').trim()}`,
  );
  const hand = leseJson(evidencePath(fx.out));
  hand.evidence.ship = { path: shipV1, sha256: sha256(shipV1) };
  schreibJson(evidencePath(fx.out), hand);
  const v1ready = cli(['validate', '--out', fx.out, '--ready']);
  zeile(
    v1ready.status === 1 && /RUN_EVIDENCE=BLOCKED/.test(v1ready.stdout),
    'ship/v1 bleibt historisch lesbar, erzeugt aber keinen neuen Gesamt-PASS',
    `exit=${v1ready.status} ${(v1ready.stdout || '').trim()}`,
  );
  fs.rmSync(fx.root, { recursive: true, force: true });
}

// --- optional vs genannter Plan ---
{
  const fx = setup('run-ev-optplan-');
  const created = cli(createArgs(fx, { plan: false }));
  zeile(
    created.status === 0,
    'Optionaler Plan: create ohne --plan ist erlaubt',
    `exit=${created.status} ${(created.stdout || '').trim()}`,
  );
  const ev = leseJson(evidencePath(fx.out));
  zeile(ev.plan?.required === false && ev.plan?.path == null, 'Optionaler Plan: plan.required=false, path=null');
  const g1R = writeReceipt(path.join(fx.out, 'g1-report.json'), G1_SCHEMA, 'run-1', 'rev-a', { ok: true });
  const sweepR = writeReceipt(path.join(fx.out, 'manifest.json'), SWEEP_SCHEMA, 'run-1', 'rev-a', {});
  const shipR = writeReceipt(path.join(fx.out, 'visual-ship.json'), SHIP_V2, 'run-1', 'rev-a', { ok: true });
  attach(fx, 'g1', g1R);
  attach(fx, 'sweep', sweepR);
  attach(fx, 'ship', shipR);
  const ready = cli(['validate', '--out', fx.out, '--ready']);
  zeile(
    ready.status === 0 && /RUN_EVIDENCE=PASS/.test(ready.stdout),
    'Optionaler Plan: Lane ohne website-plan darf --ready PASS ohne Plan-Receipt',
    `exit=${ready.status} ${(ready.stdout || '').trim()}`,
  );
  fs.rmSync(fx.root, { recursive: true, force: true });
}
{
  const fx = setup('run-ev-namedplan-');
  cli(createArgs(fx, { plan: true }));
  const g1R = writeReceipt(path.join(fx.out, 'g1-report.json'), G1_SCHEMA, 'run-1', 'rev-a', { ok: true });
  const sweepR = writeReceipt(path.join(fx.out, 'manifest.json'), SWEEP_SCHEMA, 'run-1', 'rev-a', {});
  const shipR = writeReceipt(path.join(fx.out, 'visual-ship.json'), SHIP_V2, 'run-1', 'rev-a', { ok: true });
  attach(fx, 'g1', g1R);
  attach(fx, 'sweep', sweepR);
  attach(fx, 'ship', shipR);
  const ready = cli(['validate', '--out', fx.out, '--ready']);
  zeile(
    ready.status === 1 && /RUN_EVIDENCE=BLOCKED/.test(ready.stdout),
    'Genannter Plan: ohne Plan-Receipt kein --ready PASS',
    `exit=${ready.status} ${(ready.stdout || '').trim()}`,
  );
  fs.rmSync(fx.root, { recursive: true, force: true });
}

// --- unknown / partial JSON ---
{
  const fx = setup('run-ev-json-');
  fs.writeFileSync(evidencePath(fx.out), '{ "schema": "web/run-evidence/v1", "run_id":');
  const partial = cli(['validate', '--out', fx.out]);
  zeile(
    partial.status === 1 && /RUN_EVIDENCE=BLOCKED/.test(partial.stdout),
    'partial JSON ist BLOCKED',
    `exit=${partial.status} ${(partial.stdout || '').trim()}`,
  );
  schreibJson(evidencePath(fx.out), {
    schema: 'web/run-evidence/v0',
    run_id: 'run-1',
    target: { repo: fx.repo, revision: 'rev-a', base_url: 'https://example.test' },
    plan: { required: false, path: null },
    contracts: [],
    evidence: { plan: null, g1: null, sweep: null, ship: null },
    phase: 'planned',
  });
  const unknown = cli(['validate', '--out', fx.out]);
  zeile(
    unknown.status === 1 && /RUN_EVIDENCE=BLOCKED/.test(unknown.stdout),
    'unbekannte Schema-Version ist BLOCKED',
    `exit=${unknown.status} ${(unknown.stdout || '').trim()}`,
  );
  schreibJson(evidencePath(fx.out), {
    schema: SCHEMA,
    run_id: 'run-1',
    target: { repo: fx.repo, revision: 'rev-a', base_url: 'https://example.test' },
    plan: { required: false, path: null },
    contracts: [],
    evidence: { plan: null, g1: null, sweep: null, ship: null },
    phase: 'planned',
    units: [{ id: 'u1', done: false }],
    progress: 0.4,
  });
  const sched = cli(['validate', '--out', fx.out]);
  zeile(
    sched.status === 1 && /RUN_EVIDENCE=BLOCKED/.test(sched.stdout),
    'Scheduler/Unit-Fortschritt (units, progress) ist BLOCKED',
    `exit=${sched.status} ${(sched.stdout || '').trim()}`,
  );
  fs.rmSync(fx.root, { recursive: true, force: true });
}


// Anforderungen werden gehasht und erlauben funktionale Arbeit ohne visuelle Pflichtbelege.
{
  const fx = setup('web-upgrade-contracts-functional-');
  const requirement = { route: '/kontakt', viewport: 'mobile', target: 'contact', state: 'success' };
  const requirements = path.join(fx.repo, 'qa.json');
  schreibJson(requirements, { required: ['functional'], routes: ['/kontakt'], states: [requirement] });
  const created = cli([...createArgs(fx), '--requirements', requirements]);
  zeile(created.status === 0, 'Auftragsbezogener funktionaler Pflichtbeleg ohne Sweep/Ship konfigurierbar', created.stdout);
  const log = path.join(fx.out, 'request.json');
  schreibJson(log, { request: 'POST /api/contact', response: 200, ui: 'success' });
  const receipt = path.join(fx.out, 'functional.json');
  schreibJson(receipt, { schema: 'web/functional/v1', run_id: 'run-1', build_revision: 'rev-a', base_url: 'https://example.test', status: 'PASS',
    checks: [{ ...requirement, status: 'PASS', expected: { response: 200 }, actual: { response: 200 }, evidence: [{ path: log, sha256: sha256(log) }] }] });
  const attached = attach(fx, 'functional', receipt);
  zeile(attached.status === 0 && cli(['validate', '--out', fx.out, '--ready']).status === 0,
    'Geprüfte funktionale Anforderung macht ihren Auftrag ohne visuelle Belege ready', attached.stdout);
  const mutated = leseJson(receipt); mutated.checks[0].viewport = 'desktop'; schreibJson(receipt, mutated);
  zeile(attach(fx, 'functional', receipt).status === 1, 'Falscher funktionaler Viewport reicht nicht');
  fs.writeFileSync(requirements, '{}');
  zeile(cli(['validate', '--out', fx.out, '--ready']).status === 1, 'Anforderungsänderung invalidiert den alten Abschluss');
  fs.rmSync(fx.root, { recursive: true, force: true });
}

// Producer→Consumer: echte G1-Receiptfunktion wird weder nachgebaut noch per Quelltext ausgeschnitten.
{
  const { writeG1Report } = await import('../scripts/g1-gate.mjs');
  const fx = setup('web-upgrade-contracts-producer-');
  const req = path.join(fx.repo, 'qa.json');
  schreibJson(req, { required: ['g1'], routes: ['/'], checks: ['axe'] });
  cli([...createArgs(fx), '--requirements', req]);
  const report = path.join(fx.out, 'g1-report.json');
  const identity = { runId: 'run-1', buildRevision: 'rev-a', base: 'https://example.test', routes: ['/'] };
  writeG1Report(report, identity, [{ name: 'axe/', ok: true, skipped: false, detail: 'axe violations=0' }]);
  zeile(attach(fx, 'g1', report).status === 0 && cli(['validate', '--out', fx.out, '--ready']).status === 0,
    'Echter G1-Producer liefert unmittelbar konsumierbaren PASS');
  writeG1Report(report, identity, [{ name: 'axe/', ok: true, skipped: false, detail: 'verified again' }]);
  zeile(attach(fx, 'g1', report).status === 0, 'A successful rerun replaces the same receipt path atomically');
  const importCheck = spawnSync(process.execPath, ['--input-type=module', '-e',
    `await import(${JSON.stringify(path.join(WEB, 'scripts/g1-gate.mjs'))})`], { encoding: 'utf8', env: { ...process.env, TMPDIR: fx.root } });
  zeile(importCheck.status === 0 && !importCheck.stdout && !importCheck.stderr
    && !fs.readdirSync(fx.root).some(name => name.startsWith('g1-gate-')), 'Importing G1 has no CLI, output, or temporary directory side effect');
  writeG1Report(report, identity, [{ name: 'axe/', ok: false, skipped: false, detail: 'violations=1' }], 1);
  zeile(attach(fx, 'g1', report).status === 1, 'Echter fehlgeschlagener G1-Producer wird abgelehnt');
  writeG1Report(report, identity, [{ name: 'axe/', ok: true, skipped: true, detail: 'not installed' }]);
  zeile(attach(fx, 'g1', report).status === 1, 'Echter übersprungener G1-Check wird abgelehnt');
  fs.rmSync(fx.root, { recursive: true, force: true });
}

// Canonical website-plan producer uses plan identity, not invented build fields.
{
  const fx = setup('web-upgrade-contracts-plan-');
  const req = path.join(fx.repo, 'qa.json'); schreibJson(req, { required: ['plan'], routes: ['/'] });
  const produced = spawnSync('python3', [path.resolve(WEB, '../website-plan/scripts/validate-plan.py'), fx.planDir], { encoding: 'utf8' });
  const receipt = path.join(fx.planDir, 'plan-verification.json');
  const raw = fs.readFileSync(receipt, 'utf8');
  const created = cli([...createArgs(fx, { plan: true }), '--requirements', req]);
  const attached = attach(fx, 'plan', receipt);
  zeile(produced.status === 0 && created.status === 0 && attached.status === 0
    && cli(['validate', '--out', fx.out, '--ready']).status === 0,
    'Actual v3 plan producer is consumable without fabricated run/build fields', attached.status ? attached.stdout : '');
  cli(['bind-build', '--out', fx.out, '--revision', 'rev-b']);
  zeile(cli(['validate', '--out', fx.out, '--ready']).status === 0,
    'Unchanged plan remains valid when the build revision changes');
  zeile(fs.readFileSync(receipt, 'utf8') === raw, 'Evidence checks never mutate the original plan receipt');
  fs.appendFileSync(path.join(fx.planDir, 'home.md'), 'Changed route scope.\n');
  zeile(cli(['validate', '--out', fx.out, '--ready']).status === 1,
    'Changed plan artifact invalidates the bound run even when the manifest bytes stay fixed');
  fs.rmSync(fx.root, { recursive: true, force: true });
}

// Same input must be rejected by the writer, standalone validator, and consumer.
{
  const fx = setup('web-upgrade-contracts-ship-');
  cli(createArgs(fx));
  const g1 = writeReceipt(path.join(fx.out, 'g1-report.json'), G1_SCHEMA, 'run-1', 'rev-a');
  const sweep = writeReceipt(path.join(fx.out, 'manifest.json'), SWEEP_SCHEMA, 'run-1', 'rev-a');
  const ship = writeReceipt(path.join(fx.out, 'visual-ship.json'), SHIP_V2, 'run-1', 'rev-a');
  const scripts = path.resolve(WEB, '../visual-aaa/scripts');
  const validate = () => spawnSync('python3', [path.join(scripts, 'validate-ship-manifest.py'), ship], { encoding: 'utf8' });
  const original = leseJson(ship);
  zeile(validate().status === 0, 'Canonical ship validator accepts current producer contract');
  schreibJson(ship, { ...original, critic_verdicts: original.critic_verdicts.map(v => ({ ...v, beleg: 'TODO' })) });
  zeile(validate().status === 1 && attach(fx, 'ship', ship).status === 1,
    'Placeholder visual verdict is rejected by both validators');
  schreibJson(ship, { ...original, inputs: { ...original.inputs, sweep: { path: sweep, sha256: 'wrong' } } });
  zeile(validate().status === 1 && attach(fx, 'ship', ship).status === 1, 'Ship input hash drift is rejected everywhere');
  const second = path.join(fx.out, 'other.png'); fs.writeFileSync(second, Buffer.alloc(12000, 1));
  const sw = leseJson(sweep); sw.routes[0].shots.push({ file: 'other.png', sha256: sha256(second) }); schreibJson(sweep, sw);
  schreibJson(ship, { ...original, inputs: { ...original.inputs, sweep: { path: sweep, sha256: sha256(sweep) } } });
  zeile(validate().status === 1 && attach(fx, 'ship', ship).status === 1,
    'Ship cannot silently omit a captured page from its declared visual input');
  const critics = path.join(fx.out, 'critics.json'); schreibJson(critics, original.critic_verdicts);
  const writer = extra => spawnSync('python3', [path.join(scripts, 'write-ship-manifest.py'),
    '--run-id', 'run-1', '--build-revision', 'rev-a', '--render-dir', fx.out, '--out', ship,
    '--g1', g1, '--sweep', sweep, '--critics', critics, '--self-read', 'true', ...extra], { encoding: 'utf8' });
  const before = fs.readFileSync(ship, 'utf8');
  zeile(writer(['--schema', SHIP_V1]).status === 2 && fs.readFileSync(ship, 'utf8') === before,
    'Rejected schema never overwrites a previous ship file');
  fs.writeFileSync(critics, '{partial');
  const badJson = writer([]);
  zeile(badJson.status === 2 && !badJson.stderr.includes('Traceback') && fs.readFileSync(ship, 'utf8') === before,
    'Malformed writer input is a clear usage failure and leaves output unchanged', badJson.stderr);
  schreibJson(critics, original.critic_verdicts);
  const missingBase = leseJson(g1); delete missingBase.base_url; schreibJson(g1, missingBase);
  zeile(writer([]).status !== 0, 'Web writer cannot skip input validation by dropping base_url');
  fs.rmSync(fx.root, { recursive: true, force: true });
}

// Receipt file lists and hashes are part of the result, not optional metadata.
{
  const fx = setup('web-upgrade-contracts-files-');
  cli(createArgs(fx));
  const file = writeReceipt(path.join(fx.out, 'manifest.json'), SWEEP_SCHEMA, 'run-1', 'rev-a');
  const valid = leseJson(file);
  const noHash = structuredClone(valid); delete noHash.routes[0].shots[0].sha256; schreibJson(file, noHash);
  zeile(attach(fx, 'sweep', file).status === 1, 'Screenshot without a content hash is not reusable evidence');
  schreibJson(file, valid); fs.appendFileSync(path.join(fx.out, 'fold.png'), 'modified');
  zeile(attach(fx, 'sweep', file).status === 1, 'Modified screenshot invalidates the sweep receipt');
  for (const kind of ['g1', 'sweep', 'ship', 'functional']) {
    const receipt = { schema: ({ g1: G1_SCHEMA, sweep: SWEEP_SCHEMA, ship: SHIP_V2, functional: 'web/functional/v1' })[kind],
      status: 'PASS', run_id: 'run-1', build_revision: 'rev-a', base_url: 'https://example.test',
      routes: {}, pages: {}, checks: {}, results: {} };
    let errors;
    try { errors = receiptErrors(kind, receipt, leseJson(evidencePath(fx.out)), file); } catch { errors = []; }
    zeile(errors.length > 0, `${kind}: malformed receipt lists return validation errors`);
  }
  fs.rmSync(fx.root, { recursive: true, force: true });
}

// Actual CLI chain, actual browser capture; visual verdicts are synthetic test
// fixtures for the file contract and never claim a human/model design approval.
{
  const fx = setup('web-upgrade-contracts-live-');
  const html = '<!doctype html><html lang="de"><meta charset="utf-8"><title>Evidence integration fixture</title>'
    + '<style>body{margin:30px;font:22px/1.5 sans-serif;color:#14222e;background:#e9f0f4}main{max-width:880px}h1{font-size:40px}</style>'
    + '<main><h1>Evidence contract integration</h1><p>' + 'Browser capture proves the current rendered file. '.repeat(24) + '</p><button>Fixture action</button></main></html>';
  const server = createServer((_req, res) => { res.writeHead(200, { 'content-type': 'text/html' }); res.end(html); });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const baseUrl = `http://127.0.0.1:${server.address().port}`;
  try {
    const gateOut = path.join(fx.out, 'gate');
    const gate = await new Promise(resolve => {
      const proc = spawn(process.execPath, [path.join(WEB, 'scripts/g1-gate.mjs'), '--base', baseUrl,
        '--run-id', 'run-1', '--build-revision', 'rev-a', '--routes', '/', '--checks', 'shot-sweep', '--out', gateOut]);
      let stdout = ''; let stderr = '';
      proc.stdout.on('data', b => { stdout += b; }); proc.stderr.on('data', b => { stderr += b; });
      const timer = setTimeout(() => proc.kill('SIGTERM'), 120000);
      proc.on('close', status => { clearTimeout(timer); resolve({ status, stdout, stderr }); });
    });
    zeile(gate.status === 0, 'Actual G1 CLI creates a passing browser sweep', gate.status ? `${gate.stdout}\n${gate.stderr}` : '');
    if (gate.status === 0) {
      const g1 = path.join(gateOut, 'g1-report.json');
      const sweep = path.join(gateOut, 'shots/manifest.json');
      const sw = leseJson(sweep);
      const critics = path.join(fx.out, 'critics.json');
      schreibJson(critics, sw.routes.flatMap(route => route.shots.map(shot => ({
        page_id: path.basename(shot.file, '.png'), round: 1, verdict: 'pass', biggest_gap: 'none', confidence: 'HIGH',
        beleg: `${shot.file} oben zeigt den Integrationstext der synthetischen Testseite.`,
      }))));
      const ship = path.join(fx.out, 'visual-ship.json');
      const scripts = path.resolve(WEB, '../visual-aaa/scripts');
      const produced = spawnSync('python3', [path.join(scripts, 'write-ship-manifest.py'), '--run-id', 'run-1',
        '--build-revision', 'rev-a', '--out', ship, '--render-dir', path.dirname(sweep), '--g1', g1,
        '--sweep', sweep, '--critics', critics, '--self-read', 'true', '--self-read-notes', 'Synthetic contract test fixture'], { encoding: 'utf8' });
      zeile(produced.status === 0, 'Actual ship writer consumes actual G1 and sweep files', produced.status ? `${produced.stdout}\n${produced.stderr}\n${fs.existsSync(ship) ? fs.readFileSync(ship, 'utf8') : ''}` : '');
      const created = cli(createArgs(fx, { baseUrl }));
      const attached = [attach(fx, 'g1', g1), attach(fx, 'sweep', sweep), attach(fx, 'ship', ship)];
      const ready = cli(['validate', '--out', fx.out, '--ready']);
      zeile(created.status === 0 && attached.every(r => r.status === 0) && ready.status === 0,
        'Actual G1 → sweep → ship → run-evidence reaches ready', ready.status ? attached.map(r => r.stdout + r.stderr).join('\n') + ready.stdout : '');
      const captureOnly = leseJson(path.join(path.dirname(sweep), 'functional.json'));
      zeile(captureOnly.status === 'NOT_CHECKED' && captureOnly.checks.length === 0,
        'The same capture-only run never claims functional PASS');
      fs.appendFileSync(path.join(path.dirname(sweep), sw.routes[0].shots[0].file), 'changed');
      zeile(cli(['validate', '--out', fx.out, '--ready']).status === 1,
        'Actual screenshot mutation invalidates the previously ready run');
    }
  } finally {
    await new Promise(resolve => server.close(resolve));
    fs.rmSync(fx.root, { recursive: true, force: true });
  }
}

// --- Aufruffehler ---
{
  const bad = cli(['create', '--diesesflaggibtsnichtxyz']);
  zeile(
    bad.status === 2,
    'Unbekanntes Flag: Exit 2 (Aufruffehler, nicht BLOCKED/PASS)',
    `exit=${bad.status}`,
  );
  const noCmd = cli([]);
  zeile(noCmd.status === 2, 'Ohne Subcommand: Exit 2', `exit=${noCmd.status}`);
}


// Reale Fehlfreigaben: Identität allein ist kein Prüfergebnis.
for (const status of ['FAIL', 'BLOCKED', 'NOT_RUN']) {
  const fx = setup('web-upgrade-contracts-status-');
  cli(createArgs(fx));
  for (const [kind, schema] of [['g1', G1_SCHEMA], ['sweep', SWEEP_SCHEMA], ['ship', SHIP_V2]]) {
    attach(fx, kind, writeReceipt(path.join(fx.out, `${kind}.json`), schema, 'run-1', 'rev-a',
      { status, ok: false, errors: ['not verified'], routes: [] }));
  }
  const result = cli(['validate', '--out', fx.out, '--ready']);
  zeile(result.status === 1, `${status}-Receipts ergeben nie ready`, result.stdout);
  fs.rmSync(fx.root, { recursive: true, force: true });
}
{
  const fx = setup('web-upgrade-contracts-empty-');
  cli(createArgs(fx));
  const empty = attach(fx, 'sweep', writeReceipt(path.join(fx.out, 'empty.json'), SWEEP_SCHEMA,
    'run-1', 'rev-a', { status: 'PASS', routes: [] }));
  zeile(empty.status === 1, 'Leere Sweep-Abdeckung wird beim Attach abgelehnt', empty.stdout);
  fs.rmSync(fx.root, { recursive: true, force: true });
}
{
  const fx = setup('web-upgrade-contracts-session-');
  const gate = path.join(WEB, 'scripts', 'session-gate.mjs');
  const input = path.join(fx.out, 'KRITIK-1.md');
  fs.writeFileSync(input, '# Kritik steht noch aus\n## Diese Befunde fehlen noch\n');
  const call = (extra) => spawnSync(process.execPath, [gate, '--rolle', 'bau', '--client', fx.out, ...extra], { encoding: 'utf8' });
  zeile(call([]).status === 2, 'Zwei Platzhalterüberschriften öffnen kein Bau-Gate');
  const request = path.join(fx.out, 'auftrag.md');
  fs.writeFileSync(request, 'Ersetze das Linkziel des Kontakt-Buttons durch /kontakt.\n');
  zeile(call(['--auftrag', 'aenderung', '--input', request]).status === 0, 'Expliziter Änderungsauftrag braucht keine vorgeschaltete Kritik');
  fs.writeFileSync(request, 'Neue Website: Startseite mit Kontaktlink; Abnahme: Link öffnet /kontakt.\n');
  zeile(call(['--auftrag', 'neu', '--input', request]).status === 0, 'Expliziter Erstbau startet aus dem Plan');
  fs.writeFileSync(input, '# Abgeschlossene Kritik\nKeine Befunde; Kontaktlink und Layout geprüft.\n');
  zeile(call(['--auftrag', 'kritik', '--input', input, '--kritik-abgeschlossen']).status === 0,
    'Explizit abgeschlossene Kritik ohne Befunde ist ein gültiger Eingang');
  zeile(call(['--auftrag', 'kritik', '--input', input]).status === 2, 'Kritik ohne Abschlussstatus bleibt gesperrt');
  fs.rmSync(fx.root, { recursive: true, force: true });
}

console.log(`\n${fehler ? 'FAIL' : 'PASS'}  ${geprueft - fehler}/${geprueft} Checks`);
process.exit(fehler ? 1 : 0);
