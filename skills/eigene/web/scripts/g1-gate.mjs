#!/usr/bin/env node
// g1-gate.mjs — deterministisches Auslieferungs-Gate fuer Websites (Regel 14:
// "fertig" ist eine Umgebungstatsache, kein Selbsturteil des Agenten).
//
// Bisheriges Problem: shot-sweep.mjs setzt Exit 1 nur bei Navigationsfehlern,
// visual-diff.mjs nur bei Exception. Kein Skript hat je an Qualitaet blockiert.
// Dieses Gate buendelt die harten Checks und liefert EINEN Exit-Code.
//
//   node g1-gate.mjs --base http://localhost:5280 --routes /,/leistungen
//
// Exit 0 = alle aktivierten Checks bestanden. Exit 1 = mindestens ein Check
// gerissen. Exit 2 = Gate selbst kaputt (Tool fehlt, Server tot) — das ist
// bewusst KEIN Pass, aber unterscheidbar von einem echten Qualitaetsfehler.
//
// Budget-Datei (optional, --budget): ueberschreibt DEFAULT_BUDGET.

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const args = process.argv.slice(2);
const get = (k, d) => { const i = args.indexOf(`--${k}`); return i >= 0 ? args[i + 1] : d; };
const has = (k) => args.includes(`--${k}`);

const BASE = get('base', 'http://localhost:5280').replace(/\/$/, '');
const ROUTES = get('routes', '/').split(',').map((r) => r.trim()).filter(Boolean)
  .map((r) => (r.startsWith('/') ? r : `/${r}`));
const OUT = get('out', path.join(os.tmpdir(), 'g1-gate'));
const SKILL_DIR = path.dirname(new URL(import.meta.url).pathname);

// Budgets. Bewusst konservativ: ein 10k-Website-Ergebnis reisst diese Werte nicht.
const DEFAULT_BUDGET = {
  lighthousePerformance: 0.90,
  lighthouseAccessibility: 1.00,
  lighthouseBestPractices: 0.95,
  lighthouseSeo: 1.00,
  axeViolations: 0,          // hart: web/SKILL.md completion_criteria
  brokenLinks: 0,
  htmlErrors: 0,
  slopScore: 0,              // scan-ai-slop.mjs Exit 1 = Slop gefunden
};

const budgetFile = get('budget', null);
const BUDGET = { ...DEFAULT_BUDGET, ...(budgetFile ? JSON.parse(fs.readFileSync(budgetFile, 'utf8')) : {}) };

const results = [];
const record = (name, ok, detail, skipped = false) => {
  results.push({ name, ok, skipped, detail });
  const tag = skipped ? 'SKIP' : ok ? 'PASS' : 'FAIL';
  console.log(`[${tag}] ${name} — ${detail}`);
};

function toolExists(bin) {
  try { execFileSync('which', [bin], { stdio: 'pipe' }); return true; } catch { return false; }
}

function run(bin, argv, opts = {}) {
  return execFileSync(bin, argv, { encoding: 'utf8', stdio: 'pipe', maxBuffer: 64 * 1024 * 1024, ...opts });
}

// --- Check 1: Server erreichbar -------------------------------------------
function checkServer() {
  try {
    const code = run('curl', ['-s', '-o', '/dev/null', '-w', '%{http_code}', `${BASE}${ROUTES[0]}`]).trim();
    if (!/^[23]/.test(code)) { record('server', false, `${BASE}${ROUTES[0]} -> HTTP ${code}`); return false; }
    record('server', true, `${BASE}${ROUTES[0]} -> HTTP ${code}`);
    return true;
  } catch (e) {
    record('server', false, `nicht erreichbar: ${e.message.split('\n')[0]}`);
    return false;
  }
}

// --- Check 2: Lighthouse pro Route ----------------------------------------
function checkLighthouse() {
  if (!toolExists('lighthouse')) { record('lighthouse', true, 'lighthouse nicht installiert', true); return; }
  for (const route of ROUTES) {
    const jsonPath = path.join(OUT, `lh${route.replace(/[^\w]+/g, '_')}.json`);
    try {
      run('lighthouse', [`${BASE}${route}`, '--quiet', '--output=json', `--output-path=${jsonPath}`,
        '--chrome-flags=--headless=new --no-sandbox', '--only-categories=performance,accessibility,best-practices,seo']);
      const lh = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
      const s = lh.categories;
      const checks = [
        ['performance', s.performance?.score, BUDGET.lighthousePerformance],
        ['accessibility', s.accessibility?.score, BUDGET.lighthouseAccessibility],
        ['best-practices', s['best-practices']?.score, BUDGET.lighthouseBestPractices],
        ['seo', s.seo?.score, BUDGET.lighthouseSeo],
      ];
      const bad = checks.filter(([, got, min]) => typeof got === 'number' && got < min);
      const fmt = checks.map(([k, got]) => `${k}=${got == null ? '?' : Math.round(got * 100)}`).join(' ');
      record(`lighthouse${route}`, bad.length === 0, bad.length
        ? `${fmt} — unter Budget: ${bad.map(([k, got, min]) => `${k} ${Math.round(got * 100)}<${Math.round(min * 100)}`).join(', ')}`
        : fmt);
    } catch (e) {
      record(`lighthouse${route}`, false, `Lauf fehlgeschlagen: ${String(e.message).split('\n')[0]}`);
    }
  }
}

// --- Check 3: axe (a11y, hart 0) ------------------------------------------
// Ueber axe-run.mjs (Playwright), nicht ueber @axe-core/cli: dessen chromedriver
// ist auf dieser Maschine eine Major-Version voraus und stirbt beim Start.
function checkAxe() {
  const runner = path.join(SKILL_DIR, 'axe-run.mjs');
  if (!fs.existsSync(runner)) { record('axe', true, 'axe-run.mjs nicht gefunden', true); return; }
  for (const route of ROUTES) {
    let out = '';
    let code = 0;
    try {
      out = run('node', [runner, '--url', `${BASE}${route}`, '--json']);
    } catch (e) {
      code = e.status ?? 2;
      out = String(e.stdout || '');
      if (code === 2) {
        record(`axe${route}`, false, `axe-Lauf kaputt: ${String(e.stderr || e.message).split('\n')[0]}`);
        continue;
      }
    }
    try {
      const parsed = JSON.parse(out);
      const violations = parsed.violations || [];
      record(`axe${route}`, violations.length <= BUDGET.axeViolations,
        violations.length === 0 ? `0 Violations (${parsed.passes} Passes)`
          : `${violations.length} Violations: ${violations.slice(0, 5).map((v) => `${v.id}(${v.impact})`).join(', ')}`);
    } catch {
      record(`axe${route}`, false, `axe-Ausgabe unlesbar (exit ${code})`);
    }
  }
}

// --- Check 4: tote Links ---------------------------------------------------
function checkLinks() {
  if (!toolExists('linkinator')) { record('links', true, 'linkinator nicht installiert', true); return; }
  try {
    const out = run('linkinator', [BASE, '--recurse', '--format', 'json', '--silent']);
    const parsed = JSON.parse(out);
    const broken = (parsed.links || []).filter((l) => l.state === 'BROKEN');
    record('links', broken.length <= BUDGET.brokenLinks,
      broken.length === 0 ? `${(parsed.links || []).length} Links, 0 tot`
        : `${broken.length} tot: ${broken.slice(0, 5).map((l) => l.url).join(', ')}`);
  } catch (e) {
    const stdout = e.stdout ? String(e.stdout) : '';
    try {
      const parsed = JSON.parse(stdout);
      const broken = (parsed.links || []).filter((l) => l.state === 'BROKEN');
      record('links', broken.length <= BUDGET.brokenLinks,
        `${broken.length} tot: ${broken.slice(0, 5).map((l) => l.url).join(', ')}`);
    } catch {
      record('links', false, `linkinator-Lauf kaputt: ${String(e.message).split('\n')[0]}`);
    }
  }
}

// --- Check 5: AI-Slop-Scanner (bestehender design-Skill) ------------------
// scan-ai-slop.mjs greppt QUELLCODE, nicht eine URL — braucht daher --src.
// Ohne --src ist der Check nicht anwendbar und wird ehrlich uebersprungen,
// statt still zu bestehen.
function checkSlop() {
  const src = get('src', null);
  const scan = path.resolve(SKILL_DIR, '../../../design/scripts/scan-ai-slop.mjs');
  if (!fs.existsSync(scan)) { record('ai-slop', true, `scan-ai-slop.mjs nicht gefunden (${scan})`, true); return; }
  if (!src) { record('ai-slop', true, 'kein --src <projektordner> uebergeben', true); return; }
  if (!fs.existsSync(src)) { record('ai-slop', false, `--src existiert nicht: ${src}`); return; }
  try {
    const out = run('node', [scan, src, '--json']);
    const parsed = JSON.parse(out);
    const hits = parsed.hits || parsed.findings || [];
    const n = Array.isArray(hits) ? hits.length : 0;
    record('ai-slop', n <= BUDGET.slopScore,
      n === 0 ? '0 Slop-Tells' : `${n} Tells: ${hits.slice(0, 5).map((h) => h.id || h.tell || '?').join(', ')}`);
  } catch (e) {
    // Exit 1 = Tells gefunden (kein kaputter Lauf). JSON steht trotzdem auf stdout.
    const stdout = String(e.stdout || '');
    try {
      const parsed = JSON.parse(stdout);
      const hits = parsed.hits || parsed.findings || [];
      record('ai-slop', hits.length <= BUDGET.slopScore,
        `${hits.length} Tells: ${hits.slice(0, 5).map((h) => h.id || h.tell || '?').join(', ')}`);
    } catch {
      record('ai-slop', false, `Slop-Scan kaputt: ${String(e.stderr || e.message).split('\n')[0]}`);
    }
  }
}

// --- Check 6: Handwerks-Merkmale (M1-M25 / T1-T10) ------------------------
function checkCraft() {
  const runner = path.join(SKILL_DIR, 'craft-check.mjs');
  if (!fs.existsSync(runner)) { record('craft', true, 'craft-check.mjs nicht gefunden', true); return; }
  for (const route of ROUTES) {
    let out = '';
    let code = 0;
    try {
      out = run('node', [runner, '--url', `${BASE}${route}`, '--json', ...(has('strict') ? ['--strict'] : [])]);
    } catch (e) {
      code = e.status ?? 2;
      out = String(e.stdout || '');
      if (code === 2) { record(`craft${route}`, false, `craft-check kaputt: ${String(e.stderr || e.message).split('\n')[0]}`); continue; }
    }
    try {
      const parsed = JSON.parse(out);
      const b = parsed.blockers || [];
      const w = parsed.warns || [];
      record(`craft${route}`, b.length === 0,
        b.length === 0 ? `0 Blocker, ${w.length} Warnung(en)`
          : `${b.length} Blocker: ${b.slice(0, 5).map((f) => `${f.id}`).join(', ')} (+${w.length} Warnungen)`);
    } catch {
      record(`craft${route}`, false, `craft-check-Ausgabe unlesbar (exit ${code})`);
    }
  }
}

// --- Check 7: Screenshot-Sweep muss sauber durchlaufen ---------------------
function checkSweep() {
  const sweep = path.join(SKILL_DIR, 'shot-sweep.mjs');
  if (!fs.existsSync(sweep)) { record('shot-sweep', true, 'shot-sweep.mjs nicht gefunden', true); return; }
  const shotDir = path.join(OUT, 'shots');
  try {
    run('node', [sweep, '--base', BASE, '--routes', ROUTES.join(','), '--out', shotDir, '--mobile']);
    const manifest = JSON.parse(fs.readFileSync(path.join(shotDir, 'manifest.json'), 'utf8'));
    const shots = manifest.routes.reduce((n, r) => n + r.shots.length, 0);
    const errs = manifest.routes.filter((r) => r.error);
    record('shot-sweep', errs.length === 0,
      errs.length ? `${errs.length} Route(n) fehlerhaft: ${errs.map((r) => r.route).join(', ')}`
        : `${shots} Screenshots in ${shotDir}`);
  } catch (e) {
    record('shot-sweep', false, `Sweep fehlgeschlagen: ${String(e.message).split('\n')[0]}`);
  }
}

// --- main ------------------------------------------------------------------
fs.mkdirSync(OUT, { recursive: true });
console.log(`G1-Gate — ${BASE} — Routen: ${ROUTES.join(', ')}\n`);

if (!checkServer()) {
  console.log('\nServer nicht erreichbar — Gate kann nicht urteilen.');
  process.exit(2);
}

checkLighthouse();
checkAxe();
checkLinks();
checkSlop();
checkCraft();
if (!has('no-shots')) checkSweep();

const failed = results.filter((r) => !r.ok && !r.skipped);
const skipped = results.filter((r) => r.skipped);
const reportPath = path.join(OUT, 'g1-report.json');
fs.writeFileSync(reportPath, JSON.stringify({ base: BASE, routes: ROUTES, budget: BUDGET, results }, null, 2));

console.log(`\nReport: ${reportPath}`);
if (skipped.length) console.log(`${skipped.length} Check(s) uebersprungen (Tool fehlt): ${skipped.map((r) => r.name).join(', ')}`);

if (failed.length) {
  console.log(`\nG1 GERISSEN — ${failed.length} Check(s): ${failed.map((r) => r.name).join(', ')}`);
  process.exit(1);
}
console.log(`\nG1 BESTANDEN — ${results.length - skipped.length} Check(s) gruen.`);
