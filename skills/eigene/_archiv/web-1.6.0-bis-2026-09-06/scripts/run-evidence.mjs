#!/usr/bin/env node
// run-evidence.mjs — kleines revisionsgebundenes Receipt, kein Scheduler.
//
//   node run-evidence.mjs create|bind-build|attach|validate ...
//
// Exit 0 = RUN_EVIDENCE=PASS, Exit 1 = RUN_EVIDENCE=BLOCKED, Exit 2 = Aufruf.

import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { sweepVertrag } from './g1-gate.mjs';

const SCHEMA = 'web/run-evidence/v2';
const FILENAME = 'run-evidence.json';
const PHASES = new Set(['planned', 'building', 'verifying', 'blocked', 'ready', 'deployed', 'learning']);
const FORBIDDEN = new Set(['units', 'unit_progress', 'checklist', 'progress', 'agents', 'orchestration', 'tasks']);
const ROOT_KEYS = new Set(['schema', 'run_id', 'target', 'plan', 'contracts', 'evidence', 'phase', 'requirements']);
const EVIDENCE_KEYS = ['plan', 'g1', 'sweep', 'ship', 'functional'];
const KIND_SCHEMA = {
  plan: 'website-plan/verification/v3',
  g1: 'web/g1-report/v2',
  sweep: 'web/shot-sweep/v2',
  ship: 'visual-aaa/ship/v2',
  functional: 'web/functional/v1',
};
const KNOWN_FLAGS = new Set([
  'out', 'run-id', 'repo', 'revision', 'base-url', 'plan', 'plan-required',
  'contract', 'phase', 'kind', 'path', 'file', 'ready', 'requirements', 'routes', 'help',
]);

class UsageError extends Error {}

function usage(msg) {
  if (msg) console.error(msg);
  console.error('Aufruf: node run-evidence.mjs create --out DIR --run-id ID --repo PATH --revision SHA --base-url URL');
  console.error('                            [--plan DIR] [--plan-required] [--contract role=path]... [--phase PHASE] [--requirements FILE] [--routes /,/kontakt]');
  console.error('         node run-evidence.mjs bind-build --out DIR --revision SHA');
  console.error('         node run-evidence.mjs attach --out DIR --kind plan|g1|sweep|ship|functional --path FILE');
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
  return { plan: null, g1: null, sweep: null, ship: null, functional: null };
}


function stateKey(record) {
  if (!record || !['route', 'viewport', 'target', 'state'].every((k) => nonempty(record[k]))) return null;
  return JSON.stringify(['route', 'viewport', 'target', 'state'].map((k) => record[k]));
}

function requirementsErrors(requirements) {
  if (!requirements || typeof requirements !== 'object' || Array.isArray(requirements)) return ['requirements fehlt'];
  const errors = [];
  for (const k of Object.keys(requirements)) {
    if (!['required', 'routes', 'checks', 'states'].includes(k)) errors.push(`requirements: unbekanntes Feld ${k}`);
  }
  if (!Array.isArray(requirements.required) || !requirements.required.length
    || requirements.required.some((k) => !EVIDENCE_KEYS.includes(k))) errors.push('requirements.required: nichtleere Receipt-Arten erforderlich');
  if (!Array.isArray(requirements.routes) || !requirements.routes.length
    || requirements.routes.some((r) => !nonempty(r) || !r.startsWith('/'))) errors.push('requirements.routes: nichtleere Routenliste erforderlich');
  if (requirements.checks !== undefined && (!Array.isArray(requirements.checks)
    || requirements.checks.some((c) => !nonempty(c)))) errors.push('requirements.checks muss eine Liste benannter G1-Checks sein');
  if (requirements.states !== undefined && (!Array.isArray(requirements.states)
    || requirements.states.some((r) => !stateKey(r)))) errors.push('requirements.states braucht route/viewport/target/state');
  if (requirements.states?.length && !requirements.required?.includes('functional')) errors.push('verlangte Funktionszustände brauchen functional als Pflichtbeleg');
  return errors;
}

function fileEvidenceErrors(ref, label) {
  if (!ref || !nonempty(ref.path) || !nonempty(ref.sha256)) return [`${label}: path/sha256 fehlen`];
  if (!path.isAbsolute(ref.path) || !fs.existsSync(ref.path) || !fs.statSync(ref.path).isFile()) return [`${label}: Belegdatei fehlt ${ref.path}`];
  if (sha256File(ref.path) !== ref.sha256) return [`${label}: Belegdatei Hash-Drift ${ref.path}`];
  return [];
}

function hasValue(value) {
  return nonempty(value) || (value && typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length > 0);
}

function planSnapshot(planDir) {
  if (!nonempty(planDir)) throw new Error('Planpfad fehlt');
  const validator = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../website-plan/scripts/validate-plan.py');
  const code = `import importlib.util,json,sys
from pathlib import Path
spec=importlib.util.spec_from_file_location('website_plan_validator',sys.argv[1])
module=importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)
directory=Path(sys.argv[2]).resolve()
manifest=json.loads((directory/'plan-manifest.json').read_text())
errors=[]
module.validate_manifest(directory,manifest,errors)
print(json.dumps(errors))`;
  const errors = JSON.parse(execFileSync('python3', ['-c', code, validator, planDir], { encoding: 'utf8', timeout: 15000 }));
  if (errors.length) throw new Error(`Planvertrag ungültig: ${errors.join('; ')}`);
  const file = path.join(planDir, 'plan-manifest.json');
  const manifest = JSON.parse(fs.readFileSync(file, 'utf8'));
  const files = new Set([file, ...Object.values(manifest.artifacts).map((p) => path.resolve(planDir, p)),
    ...manifest.routes.map((route) => path.resolve(planDir, route.page_spec))]);
  return { manifest, digest: sha256File(file), contracts: [...files].map((p) => ({ role: 'plan-input', path: p, sha256: sha256File(p) })) };
}

export function receiptErrors(kind, receipt, data, receiptPath) {
  if (!receipt || typeof receipt !== 'object' || Array.isArray(receipt)) return [`evidence.${kind}: Receipt muss Objekt sein`];
  const errors = [];
  const fail = (reason) => errors.push(`evidence.${kind}: ${reason}`);
  const lists = { g1: ['routes', 'results'], sweep: ['routes'], ship: ['pages', 'critic_verdicts', 'acceptance_checks'], functional: ['checks'] };
  for (const field of lists[kind] || []) {
    if (receipt[field] !== undefined && !Array.isArray(receipt[field])) fail(`${field} muss eine Liste sein`);
  }
  if (errors.length) return errors;
  if (receipt.schema !== KIND_SCHEMA[kind]) fail(`Schema ${JSON.stringify(receipt.schema)} != ${KIND_SCHEMA[kind]}`);
  if (kind !== 'plan' && receipt.run_id !== data.run_id) errors.push(`Misch-Run: evidence.${kind}`);
  if (kind !== 'plan' && receipt.build_revision !== data.target?.revision) errors.push(`stale Revision: evidence.${kind}`);
  if (kind !== 'plan') {
    const base = receipt.base_url || receipt.base;
    if (!nonempty(base) || base.replace(/\/$/, '') !== data.target?.base_url?.replace(/\/$/, '')) fail('Basis-URL fehlt oder weicht ab');
  }
  if (receipt.status !== 'PASS' || receipt.ok === false) fail(`Ergebnis ist nicht PASS (${JSON.stringify(receipt.status)})`);
  const hasErrors = (value) => Array.isArray(value) ? value.length > 0
    : value && typeof value === 'object' ? Object.keys(value).length > 0 : Boolean(value);
  if (hasErrors(receipt.errors) || hasErrors(receipt.failed)) fail('Receipt enthält Fehler');
  const wanted = data.requirements?.routes || [];
  const routes = kind === 'sweep' ? (receipt.routes || []).map((r) => r?.route)
    : kind === 'ship' ? (receipt.pages || []).map((r) => r?.route)
    : kind === 'functional' ? (receipt.checks || []).map((r) => r?.route) : receipt.routes;
  if (kind !== 'plan') {
    if (!Array.isArray(routes) || !routes.length) fail('leere Routenabdeckung');
    else for (const route of wanted) if (!routes.includes(route)) fail(`Route nicht geprüft: ${route}`);
  }
  if (kind === 'plan') {
    try {
      const snapshot = planSnapshot(data.plan?.path);
      if (receipt.manifest !== 'plan-manifest.json' || receipt.manifest_sha256 !== snapshot.digest
        || receipt.plan_id !== snapshot.manifest.plan_id) fail('Planidentität oder Manifest-Hash weicht ab');
      for (const contract of snapshot.contracts) {
        if (!data.contracts?.some((c) => c.path === contract.path && c.sha256 === contract.sha256)) fail(`Plan-Input nicht gebunden: ${contract.path}`);
      }
    } catch (error) { fail(error.message); }
  } else if (kind === 'g1') {
    if (receipt.ok !== true || !Array.isArray(receipt.results) || !receipt.results.length) fail('keine erfolgreichen G1-Ergebnisse');
    else {
      if (receipt.results.some((r) => !r || r.ok !== true || r.skipped === true)) fail('G1 enthält FAIL/BLOCKED/NOT_RUN/SKIP');
      for (const check of data.requirements?.checks || []) {
        if (!receipt.results.some((r) => r.name === check || r.name?.startsWith(`${check}/`))) fail(`G1-Check fehlt: ${check}`);
      }
    }
  } else if (kind === 'sweep') {
    errors.push(...sweepVertrag(receipt, { runId: data.run_id, buildRevision: data.target?.revision }).map((e) => `evidence.sweep: ${e}`));
    for (const route of receipt.routes || []) {
      if (!route || !Array.isArray(route.shots)) { fail('Route ohne Shot-Liste'); continue; }
      if (route.error || route.status >= 400 || !route.shots?.length) fail(`fehlerhafte/leere Route: ${route.route}`);
      for (const shot of route.shots || []) {
        if (!shot || typeof shot !== 'object') { fail('ungültiger Shot'); continue; }
        const file = nonempty(shot.file) ? path.resolve(path.dirname(receiptPath), shot.file) : null;
        if (!file || !fs.existsSync(file) || !fs.statSync(file).isFile() || fs.statSync(file).size === 0) fail(`Shot fehlt: ${shot.file}`);
        else if (!nonempty(shot.sha256) || sha256File(file) !== shot.sha256) fail(`Shot Hash fehlt/Drift: ${shot.file}`);
      }
    }
  } else if (kind === 'ship') {
    const validator = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../visual-aaa/scripts/validate-ship-manifest.py');
    try {
      execFileSync('python3', [validator, receiptPath], { encoding: 'utf8', timeout: 15000, stdio: ['ignore', 'pipe', 'pipe'] });
    } catch (error) {
      fail(`visueller Vertrag ungültig: ${String(error.stdout || error.stderr || error.message).trim()}`);
    }
    for (const name of ['g1', 'sweep']) {
      const ref = receipt.inputs?.[name];
      errors.push(...fileEvidenceErrors(ref, `evidence.ship ${name}`));
      if (ref && data.evidence?.[name] && ref.sha256 !== data.evidence[name].sha256) fail(`${name}-Referenz weicht vom aktuellen Beleg ab`);
    }
  } else if (kind === 'functional') {
    if (!Array.isArray(receipt.checks) || !receipt.checks.length) fail('keine funktionalen Prüfungen');
    else {
      for (const check of receipt.checks) {
        if (!check || typeof check !== 'object') { fail('ungültiger funktionaler Check'); continue; }
        if (!stateKey(check) || check.status !== 'PASS' || !hasValue(check.expected) || !hasValue(check.actual)) fail('funktionaler Check ohne Schlüssel/Erwartung/Ergebnis/PASS');
        if (!Array.isArray(check.evidence) || !check.evidence.length) fail('funktionaler Check ohne Belegdatei');
        else for (const ref of check.evidence) errors.push(...fileEvidenceErrors(ref, 'evidence.functional'));
      }
      for (const required of data.requirements?.states || []) {
        if (!receipt.checks.some((check) => stateKey(check) === stateKey(required) && check.status === 'PASS')) fail(`Funktionszustand fehlt: ${stateKey(required)}`);
      }
    }
  }
  return errors;
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
  errors.push(...requirementsErrors(data.requirements));
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
      errors.push(...receiptErrors(kind, rec.value, data, ref.path));
    }
  }

  if (opts.ready) {
    if (data.plan?.required && (data.evidence?.plan == null)) {
      errors.push('genannter Plan ist Pflicht, Plan-Receipt fehlt');
    }
    for (const kind of data.requirements?.required || []) {
      if (data.evidence?.[kind] == null) errors.push(`${kind}-Receipt fehlt`);
    }
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

  let requirements = { required: ['g1', 'sweep', 'ship'], routes: (flags.routes || '/').split(',').map((r) => r.trim()), checks: [], states: [] };
  if (flags.requirements) {
    const requirementPath = path.resolve(flags.requirements);
    const parsed = readJsonFile(requirementPath);
    if (parsed.blocked) blocked(parsed.blocked);
    requirements = parsed.value;
    contracts.push({ role: 'qa-requirements', path: requirementPath, sha256: sha256File(requirementPath) });
  }
  const requirementErrors = requirementsErrors(requirements);
  if (requirementErrors.length) blocked(requirementErrors);
  if (requirements.required.includes('plan') && !planPath) blocked('plan als Pflichtbeleg braucht --plan DIR');
  if (planPath) {
    for (const contract of planSnapshot(planPath).contracts) {
      if (!contracts.some((c) => c.path === contract.path)) contracts.push(contract);
    }
  }

  const manifest = {
    schema: SCHEMA,
    run_id: runId,
    target: { repo: repoAbs, revision, base_url: baseUrl },
    plan: { required: planRequired, path: planRequired ? planPath : null },
    contracts,
    requirements,
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
  data.evidence.functional = null;

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
  const rec = readJsonFile(receiptPath);
  return rec.blocked ? [rec.blocked] : receiptErrors(kind, rec.value, data, receiptPath);
}

function readyComplete(data) {
  if (data.plan?.required && data.evidence?.plan == null) return false;
  return data.requirements.required.every((kind) => data.evidence?.[kind] != null);
}

function cmdAttach(flags) {
  const kind = flags.kind;
  const receipt = flags.path;
  if (!nonempty(kind) || !nonempty(receipt)) throw new UsageError('attach braucht --out --kind --path');
  if (!EVIDENCE_KEYS.includes(kind)) throw new UsageError(`--kind muss plan|g1|sweep|ship|functional sein, nicht ${kind}`);
  const loaded = loadForWrite(flags.out);
  if (loaded.blocked) blocked(loaded.blocked);
  const data = loaded.value;
  const receiptAbs = path.resolve(receipt);
  if (!fs.existsSync(receiptAbs) || !fs.statSync(receiptAbs).isFile()) blocked(`Receipt fehlt: ${receiptAbs}`);
  const digest = sha256File(receiptAbs);
  const changed = data.evidence?.[kind] && data.evidence[kind].sha256 !== digest;
  const nextEvidence = { ...data.evidence, [kind]: null };
  if (changed && (kind === 'g1' || kind === 'sweep')) nextEvidence.ship = null;
  if (changed && kind === 'sweep') nextEvidence.functional = null;
  const pre = validateManifest({ ...data, evidence: nextEvidence }, { checkDisk: true, ready: false });
  if (pre.length) blocked(pre);
  const idErr = receiptIdentityErrors(kind, receiptAbs, data);
  if (idErr.length) blocked(idErr);

  data.evidence = nextEvidence;
  for (const k of EVIDENCE_KEYS) {
    if (!(k in data.evidence)) data.evidence[k] = null;
  }
  data.evidence[kind] = { path: receiptAbs, sha256: digest };

  if (readyComplete(data) && validateManifest(data, { checkDisk: true, ready: true }).length === 0) {
    data.phase = 'ready';
  } else if (kind === 'plan' && data.phase === 'planned') {
    data.phase = 'building';
  } else if (kind !== 'plan' && (data.phase === 'planned' || data.phase === 'building')) {
    data.phase = 'verifying';
  }

  if (data.phase === 'ready' && !readyComplete(data)) data.phase = 'verifying';
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

if (fileURLToPath(import.meta.url) === path.resolve(process.argv[1] || '')) try {
  main();
} catch (e) {
  if (e instanceof UsageError) {
    usage(e.message);
  }
  console.log('RUN_EVIDENCE=BLOCKED');
  console.log(`FAIL: ${e.message || e}`);
  process.exit(1);
}
