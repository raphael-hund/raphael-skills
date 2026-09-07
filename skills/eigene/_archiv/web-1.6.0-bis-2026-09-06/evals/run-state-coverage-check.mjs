#!/usr/bin/env node
/**
 * run-state-coverage-check.mjs — U4A: State-Capture-Matrix gegen den Vertrag.
 *
 * Prueft Contract-Doku, shot-sweep-Quelle und temporaere Manifest-/Spec-Fixtures.
 * Negativtests treiben hoverOnlyFail, ingestStateSpec, reconcileMatrix und
 * runHeldScenario (mit Page-Stubs), nicht nur String-Grep.
 *
 * Live-Sweep gegen eine echte Seite bleibt der Geschwister-Eval
 * run-sweep-check.mjs. Diese Datei mutiert die Matrix selbst.
 *
 *   node evals/run-state-coverage-check.mjs
 *
 * Exit 0 = jede Erwartung erfuellt.
 * Exit 1 = mindestens ein Fall falsch behandelt.
 * Exit 2 = Validator-Funktionen nicht aus der Quelle schneidbar.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { wegwerfOrdner } from './lib/wegwerf.mjs';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const WEB = path.join(HIER, '..');
const SWEEP = path.join(WEB, 'scripts', 'shot-sweep.mjs');
const CONTRACT = path.join(WEB, 'references', 'state-capture-contract.md');

let fehler = 0;
let gezaehlt = 0;
const zeile = (ok, was, detail = '') => {
  gezaehlt += 1;
  if (!ok) fehler += 1;
  console.log(`  [${ok ? 'OK' : 'ROT'}]   ${was}`);
  if (!ok && detail) console.log(`         ${detail}`);
};

const quelle = fs.readFileSync(SWEEP, 'utf8');
function schneide(marke, schluss = '\n}\n') {
  const a = quelle.indexOf(marke);
  if (a < 0) {
    console.error(`FEHLER: "${marke.slice(0, 60)}" nicht in shot-sweep.mjs — umbenannt?`);
    process.exit(2);
  }
  const b = quelle.indexOf(schluss, a);
  if (b < 0) {
    console.error(`FEHLER: Ende von "${marke.slice(0, 60)}" nicht gefunden.`);
    process.exit(2);
  }
  return quelle.slice(a, b + schluss.length);
}

const leerMatrix = () => ({ required: [], captured: [], not_applicable: [], failed: [] });

function ladeValidatoren(STATE_SPEC) {
  const NA_REASONS = new Set(['static-page', 'no-form', 'no-async-data']);
  const code = `
    ${schneide('function matrixPush(')}
    ${schneide('function stateKey(')}
    ${schneide('function slugId(')}
    ${schneide('function hoverOnlyFail(')}
    ${schneide('function ingestStateSpec(')}
    ${schneide('function reconcileMatrix(')}
    return { matrixPush, stateKey, slugId, hoverOnlyFail, ingestStateSpec, reconcileMatrix };
  `;
  return new Function('fs', 'path', 'STATE_SPEC', 'NA_REASONS', code)(
    fs, path, STATE_SPEC, NA_REASONS,
  );
}

function ladeHeldRunner(log) {
  const captureState = async (_page, _entry, _slug, _label, target, state) => {
    log.push(`shot:${state}:${target?.targetId || ''}`);
    return { a11y: {}, axe: null, file: `${state}.png` };
  };
  const code = `
    const BASE = 'http://example.test';
    const STATIC = true;
    async function forceStatic() {}
    async function waitSettled() {}
    ${schneide('function slugId(')}
    ${schneide('function matrixPush(')}
    ${schneide('function specTarget(')}
    ${schneide('async function waitHeld(')}
    ${schneide('async function runHeldScenario(')}
    return runHeldScenario;
  `;
  return new Function('captureState', code)(captureState);
}

function mockPage(log) {
  const handlers = [];
  const routeObj = {
    fulfill: async () => { log.push('fulfill'); },
    abort: async () => { log.push('abort'); },
  };
  const loc = (sel) => {
    const node = {
      fill: async () => { log.push(`fill:${sel}`); },
      click: async () => {
        log.push(`trigger:${sel}`);
        for (const cb of handlers) cb(routeObj);
      },
      first() { return node; },
    };
    return node;
  };
  return {
    goto: async () => { log.push('goto'); },
    route: async (_url, cb) => { handlers.push(cb); },
    unroute: async () => { handlers.length = 0; },
    locator: loc,
    waitForSelector: async (sel) => { log.push(`wait:${sel}`); },
  };
}

function extractIf(nadel) {
  const a = quelle.indexOf(nadel);
  if (a < 0) return null;
  const start = quelle.indexOf('{', a);
  if (start < 0) return null;
  let depth = 0;
  let quote = null;
  for (let j = start; j < quelle.length; j++) {
    const ch = quelle[j];
    if (quote) {
      if (ch === '\\') { j += 1; continue; }
      if (ch === quote) quote = null;
      continue;
    }
    if (ch === '\'' || ch === '"' || ch === '`') { quote = ch; continue; }
    if (ch === '{') depth += 1;
    else if (ch === '}') {
      depth -= 1;
      if (depth === 0) return quelle.slice(a, j + 1);
    }
  }
  return null;
}

function focusBlock() {
  return extractIf('if (!focused) {');
}

function ariaBlock() {
  return extractIf("if (expanded !== 'true' && !detailsOpen && tag !== 'summary') {");
}

function runIfBlock(src, bindings) {
  const names = Object.keys(bindings);
  return new Function(...names, `${src}\nreturn true;`)(...names.map((n) => bindings[n]));
}

const tmp = wegwerfOrdner('state-coverage-');
const receiptOk = path.join(tmp, 'booking-receipt.json');
fs.writeFileSync(receiptOk, `${JSON.stringify({
  test: 'tests/booking.spec.ts',
  shots: ['booking-open.png'],
  axe: { violations: 0 },
  keyboard: ['Tab', 'Enter'],
  focus: 'dialog',
  role: 'dialog',
  name: 'Buchung',
  aria: { expanded: 'true' },
  live: { role: 'status', live: 'polite', text: 'ok' },
  escape: 'Escape',
}, null, 2)}\n`);

const scenario = {
  id: 'contact-submit',
  route: '/',
  states: ['loading', 'success', 'error'],
  prepare: { selector: 'input[name=name]', fill: 'Ada' },
  trigger: { selector: 'form#contact button[type=submit]', action: 'click' },
  hold: { url: '**/api/submit' },
  assert_loading: { selector: '#loading:not([hidden])' },
  success: { status: 200, body: '{"ok":true}', assert: { selector: '[role=status]:not([hidden])' } },
  error: { status: 400, body: '{"ok":false}', assert: { selector: '[role=alert]:not([hidden])' } },
};

function shot(state, target, vp) {
  return {
    file: `home-${vp}-state-${state}-${target}.png`,
    kind: `state-${state}`,
    state,
    target,
    viewport_label: vp,
    keyboard: state === 'focus' ? ['Tab', 'Shift+Tab'] : ['Enter', 'Escape'],
    focus: target,
    role: 'button',
    name: target,
    aria: { expanded: state === 'open-expanded' ? 'true' : 'false' },
    axe: { violations: 0 },
  };
}

console.log('\nState-Coverage — Contract, Quelle, Fixture-Matrix\n');

const vertrag = fs.existsSync(CONTRACT) ? fs.readFileSync(CONTRACT, 'utf8') : '';
zeile(fs.existsSync(CONTRACT) && fs.existsSync(SWEEP),
  'Contract und shot-sweep.mjs existieren', `${CONTRACT} | ${SWEEP}`);
zeile(
  /web\/state-spec\/v1/.test(vertrag)
    && /web\/shot-sweep\/v2/.test(vertrag)
    && /run_id/.test(vertrag)
    && /build_revision/.test(vertrag)
    && /capture_profile/.test(vertrag),
  'run_id/build_revision/schema/capture_profile im Contract',
);
zeile(
  /hover/.test(vertrag) && /focus/.test(vertrag) && /open-expanded/.test(vertrag)
    && /loading/.test(vertrag) && /success/.test(vertrag) && /error/.test(vertrag),
  'Contract nennt hover/focus/open/loading/error/success',
);
zeile(
  /static-page/.test(vertrag) && /no-form/.test(vertrag) && /no-async-data/.test(vertrag)
    && /playwright_refs/.test(vertrag)
    && /ausschließlich Hover-Zustände enthält, ist FAIL/.test(vertrag),
  'Contract: erlaubte N/A-Gruende, Playwright-Refs, Hover-only FAIL',
);
zeile(
  /Während sie gehalten ist, wird `loading` aufgenommen/.test(vertrag)
    && /Success- oder Error-Antwort/.test(vertrag),
  'Contract: intercept-hold Loading vor Terminal',
);

zeile(/function hoverOnlyFail\(/.test(quelle) && /function ingestStateSpec\(/.test(quelle)
  && /function reconcileMatrix\(/.test(quelle),
  'shot-sweep exportiert die Matrix-Validatoren');
zeile(/page\.route\s*\(/.test(quelle) && /held\[0\]\.fulfill/.test(quelle)
  && quelle.indexOf("state, 'loading'") < quelle.indexOf('held[0].fulfill'),
  'Quelle: loading shot vor fulfill');
zeile(/focus assert failed/.test(quelle) && /ARIA-State fehlt/.test(quelle)
  && /setup failed/.test(quelle),
  'Quelle: focus/ARIA/setup-Fehler schreiben failed');
zeile(/playwright_refs/.test(quelle) && /JSON\.parse/.test(quelle)
  && !/test\.describe|chromium\.launch/.test(schneide('function ingestStateSpec(')),
  'keine Business-Schleife in ingestStateSpec');
zeile(/animations:\s*['"]disabled['"]/.test(quelle) && !/fullPage:\s*true/.test(quelle)
  && /FRISCH geladener Seite/.test(quelle),
  'resweep stable: animations disabled, Reload, kein fullPage');

const v0 = ladeValidatoren({
  schema: 'web/state-spec/v1',
  scenarios: [scenario],
  playwright_refs: [{ id: 'booking-complex', test: 'tests/booking.spec.ts', receipt: receiptOk }],
  not_applicable: [],
});

const STATES = ['hover', 'focus', 'open-expanded', 'loading', 'error', 'success'];
const desktopShots = [];
for (const st of STATES) {
  desktopShots.push(shot(st, 'button-aktion-a-0', 'desktop'));
  desktopShots.push(shot(st, 'button-aktion-b-1', 'desktop'));
}
const mobileShots = [
  { file: 'home-mobile-fold.png', kind: 'fold', viewport_label: 'mobile', viewport: { width: 390, height: 844 } },
];
const positive = {
  schema: 'web/shot-sweep/v2',
  run_id: 'u4a-run',
  build_revision: 'rev-u4a',
  capture_profile: { static: true, states: true, mobile: true },
  state_matrix: leerMatrix(),
  routes: [
    { route: '/', viewport_label: 'desktop', shots: desktopShots },
    { route: '/', viewport_label: 'mobile', shots: mobileShots },
  ],
};
v0.ingestStateSpec(positive.state_matrix);
for (const rec of [...positive.state_matrix.required]) {
  if (!positive.state_matrix.captured.some((c) => c.id === rec.id && c.state === rec.state
    && !!c.playwright_ref === !!rec.playwright_ref)) {
    positive.state_matrix.captured.push({ ...rec });
  }
}
v0.reconcileMatrix(positive);
const kinds = desktopShots.map((s) => s.state);
const hasAll = STATES.every((st) => kinds.includes(st));
const twoTargets = new Set(desktopShots.filter((s) => s.state === 'focus').map((s) => s.target)).size >= 2;
zeile(
  hasAll && positive.routes.some((r) => r.viewport_label === 'mobile')
    && positive.state_matrix.failed.length === 0
    && !v0.hoverOnlyFail(positive),
  'positive hover/focus/open/loading/error/success Desktop+Mobile',
  `failed=${JSON.stringify(positive.state_matrix.failed).slice(0, 180)} kinds=${kinds.join(',')}`,
);
zeile(twoTargets && desktopShots.filter((s) => s.state === 'hover').length >= 2,
  'zwei Buttons zwei Target-Receipts',
  desktopShots.filter((s) => s.state === 'focus').map((s) => s.target).join(','));
zeile(
  positive.schema === 'web/shot-sweep/v2'
    && positive.run_id === 'u4a-run'
    && positive.build_revision === 'rev-u4a'
    && positive.capture_profile.static === true
    && positive.capture_profile.states === true
    && positive.capture_profile.mobile === true,
  'run_id/build_revision/schema/capture_profile',
);
zeile(
  positive.state_matrix.captured.some((c) => c.playwright_ref === 'tests/booking.spec.ts'
    && c.role === 'dialog' && c.focus === 'dialog'),
  'existing Playwright ref akzeptiert',
);

{
  const hoverOnly = {
    schema: 'web/shot-sweep/v2',
    capture_profile: { static: true, states: true, mobile: true },
    routes: [{
      route: '/',
      shots: [
        shot('hover', 'button-a-0', 'desktop'),
        shot('hover', 'button-b-1', 'desktop'),
      ],
    }],
    state_matrix: leerMatrix(),
  };
  zeile(v0.hoverOnlyFail(hoverOnly) === true, 'states=true nur hover rot');
  const mixed = JSON.parse(JSON.stringify(hoverOnly));
  mixed.routes[0].shots.push(shot('focus', 'button-a-0', 'desktop'));
  zeile(v0.hoverOnlyFail(mixed) === false, 'states=true mit focus nicht hover-only');
  const off = JSON.parse(JSON.stringify(hoverOnly));
  off.capture_profile.states = false;
  zeile(v0.hoverOnlyFail(off) === false, 'states=false hover-only ist kein FAIL');
}

{
  const log = [];
  const runHeld = ladeHeldRunner(log);
  const matrix = leerMatrix();
  await runHeld(mockPage(log), { route: '/', shots: [] }, 'idx', 'desktop', matrix, scenario);
  const iLoad = log.indexOf('shot:loading:contact-submit-loading');
  const fulfills = log.map((x, i) => (x === 'fulfill' ? i : -1)).filter((i) => i >= 0);
  const iSucc = log.findIndex((x) => x.startsWith('shot:success:'));
  const iErr = log.findIndex((x) => x.startsWith('shot:error:'));
  zeile(
    iLoad >= 0 && fulfills[0] > iLoad,
    'intercept-hold Reihenfolge loading shot vor fulfill',
    log.join(' > '),
  );
  zeile(
    iSucc > fulfills[0] && iErr > (fulfills[1] ?? fulfills[0]) && iSucc !== iErr && iSucc >= 0 && iErr >= 0,
    'intercept-hold getrennte success/error',
    log.join(' > '),
  );
  const noHold = leerMatrix();
  await runHeld(mockPage([]), { route: '/', shots: [] }, 'idx', 'desktop', noHold, { ...scenario, hold: {} });
  zeile(
    noHold.failed.some((f) => /hold\.url missing/.test(f.error || '')),
    'intercept-hold ohne hold.url ist setup failed',
    JSON.stringify(noHold.failed).slice(0, 200),
  );
}

{
  const specNa = {
    scenarios: [],
    playwright_refs: [],
    not_applicable: [
      { route: '/', state: 'empty', reason: 'static-page' },
      { route: '/', state: 'success', reason: 'no-form' },
      { route: '/', state: 'loading', reason: 'no-async-data' },
    ],
  };
  const vNa = ladeValidatoren(specNa);
  const m = { state_matrix: leerMatrix() };
  vNa.ingestStateSpec(m.state_matrix);
  m.state_matrix.required.push({ route: '/', state: 'empty' });
  vNa.reconcileMatrix(m);
  zeile(
    m.state_matrix.not_applicable.length === 3
      && !m.state_matrix.failed.some((f) => f.state === 'empty'),
    'allowed N/A',
    JSON.stringify(m.state_matrix).slice(0, 240),
  );

  const specFrei = {
    scenarios: [{ id: 'empty-1', route: '/', states: ['empty'] }],
    playwright_refs: [],
    not_applicable: [{ route: '/', state: 'empty', reason: 'nicht gebaut' }],
  };
  const vFrei = ladeValidatoren(specFrei);
  const frei = { state_matrix: leerMatrix() };
  vFrei.ingestStateSpec(frei.state_matrix);
  zeile(
    frei.state_matrix.failed.some((f) => /not_applicable reason/.test(f.error || '')),
    'freier Text/fehlend rot (Freitext-N/A)',
    JSON.stringify(frei.state_matrix.failed).slice(0, 240),
  );

  const specFehl = {
    scenarios: [{ id: 'empty-1', route: '/', states: ['empty'] }],
    playwright_refs: [],
    not_applicable: [],
  };
  const vFehl = ladeValidatoren(specFehl);
  const fehl = { state_matrix: leerMatrix() };
  vFehl.ingestStateSpec(fehl.state_matrix);
  vFehl.reconcileMatrix(fehl);
  zeile(
    fehl.state_matrix.failed.some((f) => f.error === 'required state not captured'),
    'freier Text/fehlend rot (N/A fehlt)',
    JSON.stringify(fehl.state_matrix.failed).slice(0, 240),
  );
}

{
  const fb = focusBlock();
  const ab = ariaBlock();
  zeile(!!fb && !!ab, 'focus/ARIA-Assert aus Quelle schneidbar');
  const failedFocus = [];
  const failedOk = [];
  const failedAria = [];
  const failedAriaOk = [];
  const push = (bucket) => (m, b, rec) => { if (b === 'failed') bucket.push(rec); };
  if (fb) {
    runIfBlock(fb, {
      focused: false,
      matrixPush: push(failedFocus),
      matrix: {},
      entry: { route: '/' },
      target: { targetId: 'button-a-0' },
    });
    runIfBlock(fb, {
      focused: true,
      matrixPush: push(failedOk),
      matrix: {},
      entry: { route: '/' },
      target: { targetId: 'button-a-0' },
    });
  }
  if (ab) {
    runIfBlock(ab, {
      expanded: 'false',
      detailsOpen: false,
      tag: 'button',
      matrixPush: push(failedAria),
      matrix: {},
      entry: { route: '/' },
      target: { targetId: 'menubtn' },
    });
    runIfBlock(ab, {
      expanded: 'true',
      detailsOpen: false,
      tag: 'button',
      matrixPush: push(failedAriaOk),
      matrix: {},
      entry: { route: '/' },
      target: { targetId: 'menubtn' },
    });
  }
  zeile(
    failedFocus.some((f) => /focus assert failed/.test(f.error || ''))
      && failedAria.some((f) => /ARIA-State fehlt/.test(f.error || ''))
      && failedOk.length === 0 && failedAriaOk.length === 0,
    'falscher focus/ARIA rot',
    `focusFail=${failedFocus.length} ariaFail=${failedAria.length} ok=${failedOk.length}/${failedAriaOk.length}`,
  );
}

{
  const specSetup = {
    scenarios: [{ id: 'broken-setup', route: '/', states: ['empty'] }],
    playwright_refs: [{ id: 'missing-rec', test: 'tests/x.spec.ts', receipt: path.join(tmp, 'gibt-es-nicht.json') }],
    not_applicable: [],
    _missing: path.join(tmp, 'state-spec.json'),
  };
  const vS = ladeValidatoren(specSetup);
  const m = { state_matrix: leerMatrix() };
  vS.ingestStateSpec(m.state_matrix);
  vS.reconcileMatrix(m);
  zeile(
    m.state_matrix.failed.some((f) => /setup failed: state-spec/.test(f.error || ''))
      && m.state_matrix.failed.some((f) => /playwright receipt missing/.test(f.error || ''))
      && m.state_matrix.failed.some((f) => f.error === 'required state not captured' || f.id === 'broken-setup'),
    'setup failed rot',
    JSON.stringify(m.state_matrix.failed).slice(0, 280),
  );
}

{
  const a = v0.stateKey('/', 'desktop', 'button-a-0', 'focus');
  const b = v0.stateKey('/', 'desktop', 'button-a-0', 'focus');
  const c = v0.stateKey('/', 'mobile', 'button-a-0', 'focus');
  const clone = JSON.parse(JSON.stringify(positive));
  const vClone = ladeValidatoren({
    schema: 'web/state-spec/v1',
    scenarios: [scenario],
    playwright_refs: [{ id: 'booking-complex', test: 'tests/booking.spec.ts', receipt: receiptOk }],
    not_applicable: [],
  });
  const m2 = { ...clone, state_matrix: leerMatrix() };
  vClone.ingestStateSpec(m2.state_matrix);
  for (const rec of [...m2.state_matrix.required]) {
    m2.state_matrix.captured.push({ ...rec });
  }
  vClone.reconcileMatrix(m2);
  zeile(
    a === b && a !== c && a === '/|desktop|button-a-0|focus'
      && v0.hoverOnlyFail(positive) === vClone.hoverOnlyFail(m2)
      && m2.state_matrix.failed.length === 0,
    'resweep stable',
    `key=${a} failed2=${m2.state_matrix.failed.length}`,
  );
}

{
  const zwei = {
    schema: 'web/shot-sweep/v2',
    capture_profile: { states: true },
    routes: [{ route: '/', shots: [shot('focus', 'button-a-0', 'desktop')] }],
    state_matrix: leerMatrix(),
  };
  const vZ = ladeValidatoren({
    scenarios: [
      { id: 'button-a-0', route: '/', states: ['focus'] },
      { id: 'button-b-1', route: '/', states: ['focus'] },
    ],
    playwright_refs: [],
    not_applicable: [],
  });
  vZ.ingestStateSpec(zwei.state_matrix);
  zwei.state_matrix.captured.push({ id: 'button-a-0', route: '/', state: 'focus', target: 'button-a-0' });
  vZ.reconcileMatrix(zwei);
  zeile(
    zwei.state_matrix.failed.some((f) => f.id === 'button-b-1' && f.error === 'required state not captured'),
    'ein Shot deckt nicht zwei Targets',
    JSON.stringify(zwei.state_matrix.failed).slice(0, 240),
  );
}

const MINDESTENS = 24;
if (gezaehlt < MINDESTENS) {
  console.log(`\nNur ${gezaehlt} Pruefungen gelaufen, mindestens ${MINDESTENS} erwartet.`);
  process.exit(2);
}
const ok = gezaehlt - fehler;
console.log(`\n${ok}/${gezaehlt} wie erwartet.`);
if (fehler) {
  console.log('State-Coverage-Vertrag gerissen.');
  process.exit(1);
}
console.log('State-Coverage-Vertrag gehalten.');
