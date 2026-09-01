#!/usr/bin/env node
// run-evidence.mjs — kleines revisionsgebundenes Receipt, kein Scheduler.
//
//   node run-evidence.mjs create|bind-build|attach|validate ...
//
// Exit 0 = RUN_EVIDENCE=PASS, Exit 1 = RUN_EVIDENCE=BLOCKED, Exit 2 = Aufruf.

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const SCHEMA = 'web/run-evidence/v1';
const FILENAME = 'run-evidence.json';
const PHASES = new Set(['planned', 'building', 'verifying', 'blocked', 'ready', 'deployed', 'learning']);
const FORBIDDEN = new Set(['units', 'unit_progress', 'checklist', 'progress', 'agents', 'orchestration', 'tasks']);
const ROOT_KEYS = new Set(['schema', 'run_id', 'target', 'plan', 'contracts', 'evidence', 'phase']);
const EVIDENCE_KEYS = ['plan', 'g1', 'sweep', 'ship'];
const KIND_SCHEMA = {
  plan: 'website-plan/verification/v3',
  g1: 'web/g1-report/v2',
  sweep: 'web/shot-sweep/v2',
  ship: 'visual-aaa/ship/v2',
};
const SHIP_V1 = 'visual-aaa/ship/v1';
const KNOWN_FLAGS = new Set([
  'out', 'run-id', 'repo', 'revision', 'base-url', 'plan', 'plan-required',
  'contract', 'phase', 'kind', 'path', 'file', 'ready', 'help',
]);

class UsageError extends Error {}

function usage(msg) {
  if (msg) console.error(msg);
  console.error('Aufruf: node run-evidence.mjs create --out DIR --run-id ID --repo PATH --revision SHA --base-url URL');
  console.error('                            [--plan DIR] [--plan-required] [--contract role=path]... [--phase PHASE]');
  console.error('         node run-evidence.mjs bind-build --out DIR --revision SHA');
  console.error('         node run-evidence.mjs attach --out DIR --kind plan|g1|sweep|ship --path FILE');
  console.error('         node run-evidence.mjs validate --out DIR [--ready]');
  console.error('Exit 0 = RUN_EVIDENCE=PASS, 1 = BLOCKED, 2 = Aufruf.');
  process.exit(2);
}

function pass(detail = '') {
  console.log('RUN_EVIDENCE=PASS' + (detail ? ` ${detail}` : ''));
  process.exit(0);
}

function blocked(errors) {
  const list = Array.isArray(errors) ? errors : [errors];
  console.log('RUN_EVIDENCE=BLOCKED');
  for (const e of list) console.log(`FAIL: ${e}`);
  process.exit(1);
}

function nonempty(s) {
  return typeof s === 'string' && s.trim().length > 0;
}

function sha256File(p) {
  return crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
}

function isInside(inner, outer) {
  const a = path.resolve(inner);
  const b = path.resolve(outer);
  return a === b || a.startsWith(b + path.sep);
}

function parseArgs(argv) {
  const flags = { contract: [] };
  const rest = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--help' || a === '-h') {
      flags.help = true;
      continue;
    }
    if (!a.startsWith('--')) {
      rest.push(a);
      continue;
    }
    const key = a.slice(2);
    if (!KNOWN_FLAGS.has(key)) throw new UsageError(`Unbekanntes Flag: --${key}`);
    if (key === 'plan-required' || key === 'ready' || key === 'help') {
      flags[key] = true;
      continue;
    }
    const val = argv[++i];
    if (val == null || val.startsWith('--')) throw new UsageError(`Flag --${key} braucht einen Wert`);
    if (key === 'contract') flags.contract.push(val);
    else flags[key] = val;
  }
  return { cmd: rest[0], extra: rest.slice(1), flags };
}

function atomicWrite(file, obj) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const tmp = `${file}.tmp-${process.pid}-${process.hrtime.bigint()}`;
  fs.writeFileSync(tmp, `${JSON.stringify(obj, null, 2)}\n`);
  fs.renameSync(tmp, file);
}

function evidenceFile(out) {
  if (!nonempty(out)) throw new UsageError('--out fehlt');
  return path.join(path.resolve(out), FILENAME);
}

function readJsonFile(file) {
  if (!fs.existsSync(file)) return { blocked: `Datei fehlt: ${file}` };
  let raw;
  try {
    raw = fs.readFileSync(file, 'utf8');
  } catch (e) {
    return { blocked: `Datei nicht lesbar: ${file}: ${e.message}` };
  }
  if (!String(raw).trim()) return { blocked: `leeres JSON: ${file}` };
  try {
    return { value: JSON.parse(raw) };
  } catch {
    return { blocked: `partial oder ungueltiges JSON: ${file}` };
  }
}

function emptyEvidence() {
  return { plan: null, g1: null, sweep: null, ship: null };
}

function validateManifest(data, opts = {}) {
  const errors = [];
  if (data === null || typeof data !== 'object' || Array.isArray(data)) {
    return ['run-evidence.json muss ein Objekt sein'];
  }
  for (const key of Object.keys(data)) {
    if (FORBIDDEN.has(key)) errors.push(`verbotenes Scheduler-Feld: ${key}`);
    else if (!ROOT_KEYS.has(key)) errors.push(`unbekanntes Feld: ${key}`);
  }
  if (data.schema !== SCHEMA) {
    errors.push(`unbekanntes Schema ${JSON.stringify(data.schema)}; erwartet ${SCHEMA}`);
  }
  if (!nonempty(data.run_id)) errors.push('run_id fehlt');
  const target = data.target;
  if (!target || typeof target !== 'object' || Array.isArray(target)) {
    errors.push('target fehlt');
  } else {
    if (!nonempty(target.repo)) errors.push('target.repo fehlt');
    if (!nonempty(target.revision)) errors.push('target.revision fehlt');
    if (!nonempty(target.base_url)) errors.push('target.base_url fehlt');
  }
  const plan = data.plan;
  if (!plan || typeof plan !== 'object' || Array.isArray(plan)) {
    errors.push('plan fehlt');
  } else {
    if (typeof plan.required !== 'boolean') errors.push('plan.required muss boolean sein');
    if (plan.required) {
      if (!nonempty(plan.path)) errors.push('genannter Plan: plan.path ist Pflicht');
    } else if (plan.path != null) {
      errors.push('optionaler Plan muss path=null haben');
    }
  }
  if (!PHASES.has(data.phase)) errors.push(`ungueltige phase ${JSON.stringify(data.phase)}`);

  if (!Array.isArray(data.contracts)) {
    errors.push('contracts muss eine Liste sein');
  } else {
    for (const [i, c] of data.contracts.entries()) {
      if (!c || typeof c !== 'object') {
        errors.push(`contracts[${i}] ungueltig`);
        continue;
      }
      if (!nonempty(c.role) || !nonempty(c.path) || !nonempty(c.sha256)) {
        errors.push(`contracts[${i}]: role/path/sha256 Pflicht`);
        continue;
      }
      if (opts.checkDisk !== false) {
        if (!fs.existsSync(c.path)) errors.push(`Hash-Drift: Contract fehlt (${c.role}: ${c.path})`);
        else if (sha256File(c.path) !== c.sha256) errors.push(`Hash-Drift: ${c.role} ${c.path}`);
      }
    }
  }

  const ev = data.evidence;
  if (!ev || typeof ev !== 'object' || Array.isArray(ev)) {
    errors.push('evidence fehlt');
  } else {
    for (const key of Object.keys(ev)) {
      if (!EVIDENCE_KEYS.includes(key)) errors.push(`unbekannter evidence-Key: ${key}`);
    }
    for (const kind of EVIDENCE_KEYS) {
      const ref = ev[kind] === undefined ? null : ev[kind];
      if (ref == null) continue;
      if (typeof ref !== 'object' || !nonempty(ref.path) || !nonempty(ref.sha256)) {
        errors.push(`evidence.${kind} braucht path+sha256 oder null`);
        continue;
      }
      if (opts.checkDisk === false) continue;
      const rec = readJsonFile(ref.path);
      if (rec.blocked) {
        errors.push(rec.blocked);
        continue;
      }
      if (sha256File(ref.path) !== ref.sha256) errors.push(`Evidence-Hash drift: ${kind}`);
      const schema = rec.value?.schema;
      if (kind === 'ship' && schema === SHIP_V1) {
        errors.push('visual-aaa/ship/v1 ist kein aktueller Ship-Beleg');
        continue;
      }
      if (schema !== KIND_SCHEMA[kind]) {
        errors.push(`evidence.${kind} Schema ${JSON.stringify(schema)} != ${KIND_SCHEMA[kind]}`);
      }
      if (rec.value.run_id !== data.run_id) {
        errors.push(`Misch-Run: evidence.${kind} run_id ${JSON.stringify(rec.value.run_id)} != ${JSON.stringify(data.run_id)}`);
      }
      if (rec.value.build_revision !== data.target?.revision) {
        errors.push(`stale Revision: evidence.${kind} ${JSON.stringify(rec.value.build_revision)} != ${data.target?.revision}`);
      }
    }
  }

  if (opts.ready) {
    if (data.plan?.required && (data.evidence?.plan == null)) {
      errors.push('genannter Plan ist Pflicht, Plan-Receipt fehlt');
    }
    if (data.evidence?.g1 == null) errors.push('G1-Receipt fehlt');
    if (data.evidence?.sweep == null) errors.push('Screenshot-Manifest fehlt');
    if (data.evidence?.ship == null) errors.push('Ship-Receipt fehlt');
  }

  return errors;
}

function assertRunIsolated(out, repo) {
  if (nonempty(repo) && isInside(path.resolve(out), path.resolve(repo))) {
    return `run-out muss ausserhalb des Ziel-Repos liegen (${path.resolve(out)} in ${path.resolve(repo)})`;
  }
  return null;
}

function loadForWrite(out) {
  const file = evidenceFile(out);
  const parsed = readJsonFile(file);
  if (parsed.blocked) return { blocked: parsed.blocked, file };
  return { value: parsed.value, file };
}

function cmdCreate(flags) {
  const out = flags.out;
  const runId = flags['run-id'];
  const repo = flags.repo;
  const revision = flags.revision;
  const baseUrl = flags['base-url'];
  if (!nonempty(out) || !nonempty(runId) || !nonempty(repo) || !nonempty(revision) || !nonempty(baseUrl)) {
    throw new UsageError('create braucht --out --run-id --repo --revision --base-url');
  }
  const repoAbs = path.resolve(repo);
  if (!fs.existsSync(repoAbs)) throw new UsageError(`--repo existiert nicht: ${repoAbs}`);
  const outAbs = path.resolve(out);
  const isolated = assertRunIsolated(outAbs, repoAbs);
  if (isolated) blocked(isolated);

  const planPath = nonempty(flags.plan) ? path.resolve(flags.plan) : null;
  const planRequired = Boolean(flags['plan-required'] || planPath);
  if (planRequired && !planPath) throw new UsageError('--plan-required braucht --plan DIR');
  if (planPath && !fs.existsSync(planPath)) blocked(`Planpfad fehlt: ${planPath}`);

  const phase = flags.phase || 'planned';
  if (!PHASES.has(phase)) throw new UsageError(`ungueltige --phase ${phase}`);

  const contracts = [];
  for (const spec of flags.contract) {
    const eq = spec.indexOf('=');
    if (eq <= 0) throw new UsageError(`--contract erwartet role=path, nicht ${JSON.stringify(spec)}`);
    const role = spec.slice(0, eq).trim();
    const cpath = path.resolve(spec.slice(eq + 1));
    if (!nonempty(role)) throw new UsageError('--contract role leer');
    if (!fs.existsSync(cpath) || !fs.statSync(cpath).isFile()) blocked(`Contract-Datei fehlt: ${cpath}`);
    contracts.push({ role, path: cpath, sha256: sha256File(cpath) });
  }

  const manifest = {
    schema: SCHEMA,
    run_id: runId,
    target: { repo: repoAbs, revision, base_url: baseUrl },
    plan: { required: planRequired, path: planRequired ? planPath : null },
    contracts,
    evidence: emptyEvidence(),
    phase,
  };
  const errors = validateManifest(manifest, { checkDisk: true, ready: false });
  if (errors.length) blocked(errors);
  atomicWrite(evidenceFile(outAbs), manifest);
  pass(evidenceFile(outAbs));
}

function cmdBindBuild(flags) {
  const revision = flags.revision;
  if (!nonempty(revision)) throw new UsageError('bind-build braucht --out --revision');
  const loaded = loadForWrite(flags.out);
  if (loaded.blocked) blocked(loaded.blocked);
  const data = loaded.value;
  if (data.schema !== SCHEMA) blocked(`unbekanntes Schema ${JSON.stringify(data.schema)}`);
  for (const key of Object.keys(data)) {
    if (FORBIDDEN.has(key)) blocked(`verbotenes Scheduler-Feld: ${key}`);
  }
  if (!data.target || !nonempty(data.target.repo)) blocked('target.repo fehlt');
  const isolated = assertRunIsolated(path.dirname(loaded.file), data.target.repo);
  if (isolated) blocked(isolated);

  data.target.revision = revision;
  data.evidence = data.evidence && typeof data.evidence === 'object' ? data.evidence : emptyEvidence();
  data.evidence.g1 = null;
  data.evidence.sweep = null;
  data.evidence.ship = null;

  if (Array.isArray(data.contracts)) {
    const drift = [];
    for (const c of data.contracts) {
      if (!c || !nonempty(c.path) || !nonempty(c.sha256)) continue;
      if (!fs.existsSync(c.path) || sha256File(c.path) !== c.sha256) drift.push(c.role || c.path);
    }
    if (drift.length) data.evidence.plan = null;
  }

  data.phase = 'verifying';
  atomicWrite(loaded.file, data);
  pass(loaded.file);
}

function receiptIdentityErrors(kind, receiptPath, data) {
  const errors = [];
  const rec = readJsonFile(receiptPath);
  if (rec.blocked) return [rec.blocked];
  const schema = rec.value?.schema;
  if (kind === 'ship' && schema === SHIP_V1) {
    return ['visual-aaa/ship/v1 ist kein aktueller Ship-Beleg'];
  }
  if (schema !== KIND_SCHEMA[kind]) {
    errors.push(`Receipt-Schema ${JSON.stringify(schema)} != ${KIND_SCHEMA[kind]}`);
  }
  if (rec.value.run_id !== data.run_id) {
    errors.push(`Misch-Run: Receipt run_id ${JSON.stringify(rec.value.run_id)} != ${JSON.stringify(data.run_id)}`);
  }
  if (rec.value.build_revision !== data.target?.revision) {
    errors.push(`stale Revision: Receipt ${JSON.stringify(rec.value.build_revision)} != ${data.target?.revision}`);
  }
  return errors;
}

function readyComplete(data) {
  if (data.plan?.required && data.evidence?.plan == null) return false;
  return data.evidence?.g1 != null && data.evidence?.sweep != null && data.evidence?.ship != null;
}

function cmdAttach(flags) {
  const kind = flags.kind;
  const receipt = flags.path;
  if (!nonempty(kind) || !nonempty(receipt)) throw new UsageError('attach braucht --out --kind --path');
  if (!EVIDENCE_KEYS.includes(kind)) throw new UsageError(`--kind muss plan|g1|sweep|ship sein, nicht ${kind}`);
  const loaded = loadForWrite(flags.out);
  if (loaded.blocked) blocked(loaded.blocked);
  const data = loaded.value;
  const pre = validateManifest(data, { checkDisk: true, ready: false });
  // Vorhandene Receipts duerfen stale sein, wenn wir sie ersetzen; Contract-Hashes nicht.
  const preHard = pre.filter((e) => !e.startsWith('stale Revision:') && !e.startsWith('Misch-Run:') && !e.startsWith('evidence.'));
  if (preHard.length) blocked(preHard);

  const receiptAbs = path.resolve(receipt);
  if (!fs.existsSync(receiptAbs) || !fs.statSync(receiptAbs).isFile()) blocked(`Receipt fehlt: ${receiptAbs}`);
  const idErr = receiptIdentityErrors(kind, receiptAbs, data);
  if (idErr.length) blocked(idErr);

  data.evidence = data.evidence && typeof data.evidence === 'object' ? data.evidence : emptyEvidence();
  for (const k of EVIDENCE_KEYS) {
    if (!(k in data.evidence)) data.evidence[k] = null;
  }
  data.evidence[kind] = { path: receiptAbs, sha256: sha256File(receiptAbs) };

  if (readyComplete(data) && validateManifest(data, { checkDisk: true, ready: true }).length === 0) {
    data.phase = 'ready';
  } else if (kind === 'plan' && data.phase === 'planned') {
    data.phase = 'building';
  } else if (kind !== 'plan' && (data.phase === 'planned' || data.phase === 'building')) {
    data.phase = 'verifying';
  }

  const after = validateManifest(data, { checkDisk: true, ready: false });
  if (after.length) blocked(after);
  atomicWrite(loaded.file, data);
  pass(`${kind} ${receiptAbs}`);
}

function cmdValidate(flags) {
  const file = nonempty(flags.file) ? path.resolve(flags.file) : evidenceFile(flags.out);
  const parsed = readJsonFile(file);
  if (parsed.blocked) blocked(parsed.blocked);
  const errors = validateManifest(parsed.value, { checkDisk: true, ready: Boolean(flags.ready) });
  if (errors.length) blocked(errors);
  pass(file);
}

function main() {
  const { cmd, extra, flags } = parseArgs(process.argv.slice(2));
  if (flags.help) {
    usage();
  }
  if (!cmd) throw new UsageError('Subcommand fehlt (create|bind-build|attach|validate)');
  if (extra.length) throw new UsageError(`unerwartete Argumente: ${extra.join(' ')}`);
  if (cmd === 'create') cmdCreate(flags);
  else if (cmd === 'bind-build') cmdBindBuild(flags);
  else if (cmd === 'attach') cmdAttach(flags);
  else if (cmd === 'validate') cmdValidate(flags);
  else throw new UsageError(`unbekanntes Subcommand: ${cmd}`);
}

try {
  main();
} catch (e) {
  if (e instanceof UsageError) {
    usage(e.message);
  }
  console.log('RUN_EVIDENCE=BLOCKED');
  console.log(`FAIL: ${e.message || e}`);
  process.exit(1);
}
