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
import { spawnSync } from 'node:child_process';
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const WEB = path.join(HIER, '..');
const CLI = path.join(WEB, 'scripts', 'run-evidence.mjs');
const CONTRACT = path.join(WEB, 'references', 'run-evidence-contract.md');

const SCHEMA = 'web/run-evidence/v1';
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
  schreibJson(planManifest, { schema: 'website-plan/plan-manifest/v3', plan_id: 'demo' });
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
  schreibJson(file, {
    schema,
    run_id: runId,
    build_revision: revision,
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
      && ev.contracts.length === 3
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
  const sweepR = writeReceipt(path.join(fx.out, 'manifest.json'), SWEEP_SCHEMA, 'run-1', 'rev-a', { routes: [] });
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

console.log(`\n${fehler ? 'FAIL' : 'PASS'}  ${geprueft - fehler}/${geprueft} Checks`);
process.exit(fehler ? 1 : 0);
