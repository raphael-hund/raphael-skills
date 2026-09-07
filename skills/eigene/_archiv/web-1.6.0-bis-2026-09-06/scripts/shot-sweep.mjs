#!/usr/bin/env node
// shot-sweep.mjs — Raphaels Screenshot-Standard (Rev. 10.08.2026,
// Audit-Fix 23.08.2026: Fold 1440x900 + --states), deterministisch.
//
//   node shot-sweep.mjs --url <basis-url> --routes /,/preise --out <ordner> [--mobile] [--static] [--states]
//
// Spec (Raphael, 10.08.2026; Fold-Hoehe per Audit 23.08.2026 auf 900):
//   1. Desktop zuerst. Pro Seite ALLES nacheinander (sequentiell, eine Page-Instanz).
//   2. Hero/First-Fold: Viewport 1440x900. Danach Viewport 1440x1500.
//   3. Scroll-Schritt exakt 750 px (halber 1500er-Viewport), Shot nach jedem Schritt,
//      bis die ganze Seite abgedeckt ist. NIE fullPage/captureBeyondViewport.
//   4. Capture klickt nichts. Interaktionen nur aus explizitem state-spec oder --hover.
//   5. --static: Animationen hart aus (reduced-motion + CSS-Kill + data-reveal sichtbar).
//      Als stabilisierte Darstellung markiert; kein Beleg fuer normale Reveals.
//   5b. --states: nur deklarierte Route/Viewport/Target/State-Szenarien.
//   6. Jeder Shot ueber Playwright page.screenshot: Animationen nur bei --static aus,
//      caret hide, Fonts/Seite gesetzt. Nie fullPage/captureBeyondViewport.
//
// Ausgabe: PNGs + manifest.json — das Manifest ist der Vertrag fuer Kritik-Agents.
// Playwright erst NACH der Flag-Wache laden (dynamischer import unten): ein
// statischer import laeuft immer zuerst und kostet 12-36s, nur um danach ein
// falsch getipptes Flag abzulehnen (Befund 03.08.2026, siehe axe-run.mjs).
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';

const args = process.argv.slice(2);
const get = (k, d) => { const i = args.indexOf(`--${k}`); return i >= 0 ? args[i + 1] : d; };

const ERLAUBT = [
  'base', 'url', 'out', 'routes', 'mobile', 'hover', 'static', 'allow-404',
  'no-interact', 'states', 'state-sel', 'run-id', 'build-revision', 'state-spec', 'help',
];
const HILFE = 'Aufruf: node shot-sweep.mjs --url <basis-url> --routes /,/preise'
  + ' --out <ordner> [--mobile] [--static] [--states] [--run-id ID] [--build-revision SHA] [--state-spec FILE]'
  + '\nOhne --base/--url: juengste .ai/preview-*.json in cwd (raphael-preview) -> http://127.0.0.1:<port>';
if (args.includes('--help') || args.includes('-h')) {
  console.log(HILFE);
  console.log(`Erlaubt: ${ERLAUBT.map((k) => `--${k}`).join(' ')}`);
  process.exit(0);
}
const fremd = args.filter((a) => a.startsWith('--') && !ERLAUBT.includes(a.slice(2)));
if (fremd.length) {
  console.error(`Unbekanntes Flag: ${fremd.join(', ')}`);
  console.error(`Erlaubt: ${ERLAUBT.map((k) => `--${k}`).join(' ')}`);
  process.exit(2);
}

// --base ist PFLICHT (kein stiller Default). Historischer Default 5280 erzeugte
// leere Shots bei Anfaengern — siehe anfaenger-pfad.md §2 + SKILL Gotchas.
// `--url` ist Alias (Doktrin und die anderen Pruefer).
// Fehlt --base/--url: juengste .ai/preview-*.json in cwd (raphael-preview, Feld port).
function previewBaseFromCwd() {
  const dir = path.join(process.cwd(), '.ai');
  let names;
  try {
    names = fs.readdirSync(dir).filter((n) => /^preview-\d+\.json$/.test(n));
  } catch {
    return null;
  }
  const ranked = names.map((name) => {
    const p = path.join(dir, name);
    let mtime = 0;
    let port = null;
    try { mtime = fs.statSync(p).mtimeMs; } catch { /* fehlt */ }
    try {
      const j = JSON.parse(fs.readFileSync(p, 'utf8'));
      const n = Number(j && j.port);
      if (Number.isFinite(n) && n > 0) port = n;
    } catch { /* unlesbar */ }
    return { name, mtime, port };
  }).filter((f) => f.port != null).sort((a, b) => b.mtime - a.mtime);
  const pick = ranked[0];
  if (!pick) return null;
  console.error(`shot-sweep: base aus .ai/${pick.name}`);
  return `http://127.0.0.1:${pick.port}`;
}
const baseRaw = get('base', get('url', null)) || previewBaseFromCwd();
if (!baseRaw) {
  console.error(`shot-sweep: --base <url> ist Pflicht (z. B. --base http://127.0.0.1:3000).
oder Dev-Server über raphael-preview starten
Beispiel:
  node /root/raphael-skills/skills/eigene/web/scripts/shot-sweep.mjs \\
    --base http://127.0.0.1:3310 --out /tmp/shots --routes / --static`);
  process.exit(2);
}
const BASE = String(baseRaw).replace(/\/$/, '');
const OUT = path.resolve(get('out', '/tmp/shot-sweep'));
const ROUTES = get('routes', '/').split(',').map((r) => r.trim())
  .map((r) => (r.startsWith('/') ? r : `/${r}`));
const MOBILE = args.includes('--mobile');
const STATIC = args.includes('--static');       // Animationen aus (Kritik-Standard)
const ALLOW_404 = args.includes('--allow-404'); // 404-Seite bewusst sweepen (not-found.tsx)
const NO_INTERACT = args.includes('--no-interact'); // auch explizite Interaktionen ausschalten
const HOVERS = args.filter((a, i) => args[i - 1] === '--hover'); // zusaetzliche Selektoren
if (NO_INTERACT && HOVERS.length) {
  console.error('shot-sweep: --no-interact widerspricht ausdruecklichem --hover');
  process.exit(2);
}
const STATES = args.includes('--states');   // Zustands-Stufe (Audit 23.08.2026)
const STATE_SELECTORS_EXTRA = args.filter((a, i) => args[i - 1] === '--state-sel');
const RUN_ID = get('run-id', process.env.SHOT_SWEEP_RUN_ID || null);
const BUILD_REVISION = get('build-revision', process.env.SHOT_SWEEP_BUILD_REVISION || null);
const STATE_SPEC_PATH = get('state-spec', null)
  || (STATES && fs.existsSync(path.join(process.cwd(), 'web/state-spec.json'))
    ? path.join(process.cwd(), 'web/state-spec.json') : null);
const NA_REASONS = new Set(['static-page', 'no-form', 'no-async-data']);
const AXE_CANDIDATES = [
  '/usr/lib/node_modules/@axe-core/cli/node_modules/axe-core/axe.min.js',
  '/usr/lib/node_modules/pa11y-ci/node_modules/axe-core/axe.min.js',
  '/usr/lib/node_modules/lighthouse/node_modules/axe-core/axe.min.js',
];
const AXE_PATH = AXE_CANDIDATES.find((p) => fs.existsSync(p)) || null;

function loadStateSpec() {
  if (!STATE_SPEC_PATH) return { scenarios: [], not_applicable: [], playwright_refs: [], targets: [] };
  if (!fs.existsSync(STATE_SPEC_PATH)) {
    return { _missing: STATE_SPEC_PATH, scenarios: [], not_applicable: [], playwright_refs: [], targets: [] };
  }
  try {
    const parsed = JSON.parse(fs.readFileSync(STATE_SPEC_PATH, 'utf8'));
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)
      || ['scenarios', 'targets', 'not_applicable', 'playwright_refs'].some(key => parsed[key] !== undefined && !Array.isArray(parsed[key]))) {
      throw new Error('state-spec needs an object with scenario/target/receipt arrays');
    }
    return parsed;
  } catch (e) {
    return { _missing: `${STATE_SPEC_PATH}: ${e.message}`, scenarios: [], not_applicable: [], playwright_refs: [], targets: [] };
  }
}
const STATE_SPEC = loadStateSpec();
STATE_SPEC.targets = [...(STATE_SPEC.targets || []), ...STATE_SELECTORS_EXTRA.map((selector, index) => ({
  id: `selector-${index}`, selector, states: ['hover', 'focus'],
}))];

function slugId(s) {
  return String(s || '').trim().toLowerCase().replace(/[^\wÀ-ſ-]+/g, '_').replace(/^_+|_+$/g, '').slice(0, 32) || 'el';
}

function stateKey(route, viewport, target, state) {
  return JSON.stringify([route, viewport, target, state]);
}

function stateIdentity(rec) {
  return ['route', 'viewport', 'target', 'state'].every((key) => typeof rec?.[key] === 'string' && rec[key].length > 0)
    ? stateKey(rec.route, rec.viewport, rec.target, rec.state) : null;
}

function ingestStateSpec(matrix) {
  if (STATE_SPEC._missing) {
    matrixPush(matrix, 'failed', {
      error: `setup failed: state-spec ${STATE_SPEC._missing}`,
    });
  }
  for (const sc of [...(STATE_SPEC.scenarios || []), ...(STATE_SPEC.targets || [])]) {
    const routes = sc.route ? [sc.route] : ROUTES;
    const viewports = sc.viewport ? [sc.viewport] : (MOBILE ? ['desktop', 'mobile'] : ['desktop']);
    const target = sc.target || sc.id;
    for (const route of routes) for (const viewport of viewports) for (const state of sc.states || []) {
      const rec = { id: sc.id, route, viewport, target, state };
      matrixPush(matrix, 'required', rec);
      if (!stateIdentity(rec) || !['desktop', 'mobile'].includes(viewport)) {
        matrixPush(matrix, 'failed', { ...rec, error: 'setup failed: exact route/viewport/target/state required' });
      }
    }
  }
  for (const na of STATE_SPEC.not_applicable || []) {
    const reason = na?.reason;
    if (!NA_REASONS.has(reason) || !stateIdentity(na)) {
      matrixPush(matrix, 'failed', {
        ...(typeof na === 'object' && na ? na : {}),
        reason,
        error: 'setup failed: not_applicable needs exact route/viewport/target/state and allowed reason',
      });
    } else {
      matrixPush(matrix, 'not_applicable', na);
    }
  }
  for (const ref of STATE_SPEC.playwright_refs || []) {
    matrixPush(matrix, 'required', { ...ref, playwright_ref: ref.test || ref.receipt });
    const recPath = ref.receipt;
    if (!recPath || !fs.existsSync(recPath)) {
      matrixPush(matrix, 'failed', {
        id: ref.id,
        error: 'setup failed: playwright receipt missing',
      });
      continue;
    }
    try {
      const rec = JSON.parse(fs.readFileSync(recPath, 'utf8'));
      if (!stateIdentity(ref) || stateIdentity(rec) !== stateIdentity(ref)
        || rec.status !== 'PASS' || rec.run_id !== RUN_ID || rec.build_revision !== BUILD_REVISION
        || String(rec.base_url || rec.base || '').replace(/\/$/, '') !== BASE) {
        throw new Error('playwright receipt identity/status mismatch');
      }
      if (!Array.isArray(rec.evidence) || !rec.evidence.length || rec.evidence.some(item =>
        !path.isAbsolute(item.path || '') || !fs.existsSync(item.path)
        || createHash('sha256').update(fs.readFileSync(item.path)).digest('hex') !== item.sha256)) {
        throw new Error('playwright receipt evidence missing or hash mismatch');
      }
      matrixPush(matrix, 'captured', {
        route: ref.route, viewport: ref.viewport, target: ref.target, state: ref.state,
        id: ref.id,
        playwright_ref: ref.test || rec.test,
        keyboard: rec.keyboard,
        focus: rec.focus,
        role: rec.role,
        name: rec.name,
        aria: rec.aria || null,
        live: rec.live || null,
        escape: rec.escape || 'Escape',
        axe: rec.axe,
        shots: rec.shots,
        evidence: rec.evidence,
      });
    } catch (e) {
      matrixPush(matrix, 'failed', { id: ref.id, error: `setup failed: ${e.message}` });
    }
  }
}

function reconcileMatrix(manifest) {
  const m = manifest.state_matrix;
  if (!m) return;
  for (const req of m.required) {
    const key = stateIdentity(req);
    const cap = key && m.captured.some((c) => stateIdentity(c) === key && (!c.status || c.status === 'PASS')
      && c.ok !== false && (!req.playwright_ref || c.playwright_ref === req.playwright_ref));
    const na = key && m.not_applicable.some((n) => stateIdentity(n) === key && NA_REASONS.has(n.reason));
    const already = key && m.failed.some((f) => stateIdentity(f) === key);
    if (!cap && !na && !already) {
      m.failed.push({ ...req, error: 'required state not captured' });
    }
  }
}

const FOLD = { width: 1440, height: 900 };   // Hero/First Fold: exakt 900 (Audit 23.08.2026, vorher 730)
const DEEP = { width: 1440, height: 1500 };  // danach: 1500 hoch
const SCROLL_STEP = 750;                     // exakt 750 px pro Schritt
const MOB = { width: 390, height: 844 };

// Capture-Stabilitaet getrennt von I/O (Flags, Manifest, Hover/Klick).
// scale css + deviceScaleFactor 1: PNG-Pixel = Viewport-Vertrag.
const SHOT_OPTS = {
  animations: STATIC ? 'disabled' : 'allow',
  caret: 'hide',
  fullPage: false,
  scale: 'css',
  type: 'png',
  timeout: 20000,
};

async function forceStatic(page) {
  // 1) reduced-motion: Komponenten mit useReducedMotion rendern im Endzustand.
  await page.emulateMedia({ reducedMotion: 'reduce' });
  // 2) CSS-Animationen/Transitions hart toeten + Reveal-Container sichtbar erzwingen.
  await page.addStyleTag({
    content: `*, *::before, *::after {
      animation: none !important;
      transition: none !important;
      scroll-behavior: auto !important;
    }
    [data-reveal], [data-reveal] * { opacity: 1 !important; transform: none !important; }`,
  });
  // 3) Reveal-Vorlauf: einmal durch die ganze Seite scrollen und zurueck.
  //
  //    Die CSS-Regel oben trifft nur Reveals, die `data-reveal` tragen.
  //    Scroll-Reveals von Framer, GSAP oder Motion setzen ihre opacity und
  //    ihr transform per JS inline — `animation: none` haelt die nicht auf,
  //    und ein Attribut-Selektor findet sie nicht.
  //
  //    Beleg 2026-08-19, alpen-energie.ch: die Bildspalte der Sektion
  //    "Solaranlage kaufen" steht beim ersten Erreichen auf
  //    `transform: matrix(1,0,0,1,0,50)` und faehrt erst danach auf 0. Ein
  //    Shot bei scrollY=1500 traf sie mitten in dieser Bewegung — 50px
  //    versetzt und halb transparent. Nach dem Vorlauf steht sie auf
  //    translateY 0 und opacity 1, also in der Ruhe-Lage, die ein
  //    Standbild-Vergleich braucht.
  //
  //    Ohne diesen Vorlauf liefert dieselbe Seite bei jedem Lauf einen
  //    anderen Zwischenstand. Ein Vergleich kann dann nie gruen werden,
  //    und jeder Kritiker meldet Layoutfehler, die keine sind.
  await page.evaluate(async () => {
    const schritt = window.innerHeight;
    const ende = document.documentElement.scrollHeight;
    for (let y = 0; y < ende; y += schritt) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 140));
    }
    window.scrollTo(0, ende);
    await new Promise((r) => setTimeout(r, 400));
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 400));
  });
}

async function waitSettled(page) {
  await page.waitForTimeout(STATIC ? 600 : 1200);  // Hydration (+ Reveals ohne static)
}

async function waitPageReady(page) {
  await page.evaluate(async () => {
    if (document.readyState !== 'complete') {
      await new Promise((resolve) => window.addEventListener('load', resolve, { once: true }));
    }
    if (document.fonts && document.fonts.ready) await document.fonts.ready;
  });
}

async function captureShot(page, destPath) {
  await waitPageReady(page);
  await page.screenshot({ path: destPath, ...SHOT_OPTS });
}

async function shot(page, entry, file, meta) {
  await captureShot(page, path.join(OUT, file));
  const vp = page.viewportSize();
  entry.shots.push({
    sha256: createHash('sha256').update(fs.readFileSync(path.join(OUT, file))).digest('hex'),
    file, viewport: vp, width: vp.width, height: vp.height,
    viewport_label: entry.viewport_label, ...meta,
  });
}

async function ensureAxe(page) {
  if (!AXE_PATH) return false;
  const has = await page.evaluate(() => typeof window.axe?.run === 'function').catch(() => false);
  if (!has) await page.addScriptTag({ path: AXE_PATH });
  return true;
}

async function runAxe(page) {
  if (!AXE_PATH) return { violations: null, error: 'axe-core nicht gefunden' };
  try {
    await ensureAxe(page);
    return await page.evaluate(async () => {
      const r = await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] } });
      return { violations: r.violations.length, ids: r.violations.map((v) => v.id).slice(0, 12) };
    });
  } catch (e) {
    return { violations: null, error: String(e.message || e).slice(0, 160) };
  }
}

async function collectA11y(page, loc) {
  const snap = await loc.evaluate((e) => {
    const labelled = e.getAttribute('aria-labelledby');
    const labelledText = labelled
      ? labelled.split(/\s+/).map((id) => document.getElementById(id)?.innerText || '').join(' ')
      : '';
    const name = (e.getAttribute('aria-label') || labelledText || e.innerText || e.getAttribute('title') || '').trim().slice(0, 80);
    const liveEl = e.closest('[aria-live]') || document.querySelector('[aria-live], [role="status"], [role="alert"]');
    return {
      role: e.getAttribute('role') || e.tagName.toLowerCase(),
      name,
      aria: {
        expanded: e.getAttribute('aria-expanded'),
        busy: e.getAttribute('aria-busy'),
        invalid: e.getAttribute('aria-invalid'),
        controls: e.getAttribute('aria-controls'),
      },
      live: liveEl ? {
        role: liveEl.getAttribute('role'),
        live: liveEl.getAttribute('aria-live'),
        text: (liveEl.innerText || '').trim().slice(0, 120),
      } : null,
    };
  }).catch(() => ({ role: null, name: '', aria: {}, live: null }));
  const focus = await page.evaluate(() => {
    const e = document.activeElement;
    if (!e || e === document.body) return null;
    return e.id || e.getAttribute('aria-label') || e.tagName.toLowerCase();
  }).catch(() => null);
  return { ...snap, focus };
}

function matrixPush(matrix, bucket, rec) {
  matrix[bucket].push(bucket === 'captured' ? { status: 'PASS', ...rec } : rec);
}

async function captureState(page, entry, slug, label, target, state, keyboard, extra = {}) {
  const a11y = await collectA11y(page, target.loc);
  const axe = extra.skipAxe ? null : await runAxe(page);
  const file = `${slug}-${label}-state-${state}-${slugId(target.targetId)}.png`;
  await shot(page, entry, file, {
    kind: `state-${state}`,
    state,
    target: target.targetId,
    selector: target.selector,
    keyboard,
    focus: a11y.focus,
    role: a11y.role,
    name: a11y.name,
    aria: a11y.aria,
    live: a11y.live,
    escape: extra.escape || 'Escape',
    axe,
    route: entry.route,
  });
  return { a11y, axe, file };
}

/** Jeder explizite --hover-Selektor muss genau ein erreichbares Target treffen. */
async function hoverPass(page, entry, slug, label) {
  let k = 0;
  for (const selector of HOVERS) {
    const check = { selector, status: 'FAIL' };
    (entry.hover_checks ||= []).push(check);
    try {
      const loc = page.locator(selector);
      const count = await loc.count();
      if (count !== 1) throw new Error(`expected one target, found ${count}`);
      await loc.hover({ timeout: 1500 });
      if (!(await loc.evaluate(el => el.matches(':hover')))) throw new Error('hover assert failed');
      await page.waitForTimeout(STATIC ? 150 : 450);
      const text = (await loc.innerText().catch(() => '')).trim().slice(0, 24)
        .replace(/[^\wÀ-ſ-]+/g, '_') || `sel${k}`;
      check.file = `${slug}-${label}-hover-${String(k).padStart(2, '0')}-${text}.png`;
      await shot(page, entry, check.file, { kind: 'hover', target: text, selector });
      check.status = 'PASS';
      k++;
    } catch (e) {
      check.error = `hover ${selector}: ${e.message}`;
      entry.error = [entry.error, check.error].filter(Boolean).join('; ');
    }
    await page.mouse.move(0, 0); // Hover-Zustand zuruecksetzen
    await page.waitForTimeout(120);
  }
  return k;
}

function specTarget(page, selector, targetId, name, role) {
  return {
    loc: page.locator(selector).first(),
    selector,
    targetId,
    name: name || targetId,
    role: role || 'unknown',
  };
}

async function freshScenarioPage(page, route) {
  const fresh = await page.context().browser().newPage({ viewport: page.viewportSize(), deviceScaleFactor: 1 });
  try {
    const response = await fresh.goto(`${BASE}${route}`, { waitUntil: 'domcontentloaded' });
    if (!response?.ok()) throw new Error(`scenario navigation failed: ${response?.status()}`);
    await waitPageReady(fresh);
    return fresh;
  } catch (error) {
    await fresh.close();
    throw error;
  }
}

function recordFunctional(entry, label, target, state, expected, actual, file) {
  const evidencePath = path.join(OUT, file);
  (entry.functional_checks ||= []).push({
    route: entry.route, viewport: label, target, state, status: 'PASS', expected, actual,
    evidence: [{ path: evidencePath, sha256: createHash('sha256').update(fs.readFileSync(evidencePath)).digest('hex') }],
  });
}

/** Nur benannte Targets; jeder Zustand startet mit frischem Browser-Kontext. */
async function autoStatePass(page, entry, slug, label, matrix) {
  let n = 0;
  const specs = (STATE_SPEC.targets || []).filter((t) => (!t.route || t.route === entry.route)
    && (!t.viewport || t.viewport === label));
  for (const sc of specs) for (const state of sc.states || []) {
    const identity = { id: sc.id, route: entry.route, viewport: label, target: sc.target || sc.id, state };
    let fresh;
    try {
      if (!['hover', 'focus', 'open-expanded'].includes(state)) throw new Error(`unsupported target state: ${state}`);
      fresh = await freshScenarioPage(page, entry.route);
      const target = specTarget(fresh, sc.selector, identity.target, sc.id);
      await target.loc.waitFor({ state: 'visible', timeout: 5000 });
      const keyboard = [];
      let actual;
      if (state === 'hover') {
        await target.loc.hover();
        actual = { hovered: await target.loc.evaluate(el => el.matches(':hover')) };
        if (!actual.hovered) throw new Error('hover assert failed');
      } else {
        let focused = false;
        for (let step = 0; step < 100 && !focused; step++) {
          await fresh.keyboard.press('Tab'); keyboard.push('Tab');
          focused = await target.loc.evaluate((el) => el === document.activeElement);
        }
        if (!focused) throw new Error('focus assert failed: target not reachable by Tab');
        if (state === 'open-expanded') {
          const alreadyOpen = await target.loc.evaluate(el => el.getAttribute('aria-expanded') === 'true' || (el.tagName === 'SUMMARY' && el.parentElement.open));
          if (!alreadyOpen) { await fresh.keyboard.press('Enter'); keyboard.push('Enter'); }
          await fresh.waitForFunction(selector => {
            const el = document.querySelector(selector);
            return el?.getAttribute('aria-expanded') === 'true' || (el?.tagName === 'SUMMARY' && el.parentElement.open);
          }, sc.selector, { timeout: 3000 });
          actual = { reachedByTab: focused, focus: (await collectA11y(fresh, target.loc)).focus, expanded: true };
        } else actual = { focused };
      }
      const captured = await captureState(fresh, entry, slug, label, target, state, keyboard, { escape: 'fresh-context' });
      matrixPush(matrix, 'captured', identity);
      recordFunctional(entry, label, identity.target, state, { state }, actual, captured.file);
      n++;
    } catch (e) {
      matrixPush(matrix, 'failed', { ...identity, error: `setup failed: ${e.message}` });
    } finally {
      await fresh?.close();
    }
  }
  return n;
}

async function waitHeld(held, ms) {
  const t0 = Date.now();
  while (!held.length && Date.now() - t0 < ms) await new Promise((r) => setTimeout(r, 40));
  return held.length > 0;
}

async function assertScenario(page, assertion) {
  if (!assertion?.selector) throw new Error('explicit UI assertion selector required');
  const loc = page.locator(assertion.selector).first();
  const visibility = assertion.state === 'attached' ? 'attached' : 'visible';
  await loc.waitFor({ state: visibility, timeout: 5000 });
  if (assertion.text !== undefined) {
    await page.waitForFunction(({ selector, text }) => document.querySelector(selector)?.textContent?.trim() === text,
      { selector: assertion.selector, text: String(assertion.text) }, { timeout: 3000 });
  }
  const text = (await loc.innerText()).trim();
  if (assertion.not_text !== undefined && text.includes(String(assertion.not_text))) {
    throw new Error(`UI assertion rejected text: ${text}`);
  }
  return { selector: assertion.selector, visible: await loc.isVisible(), text };
}

async function runEmptyScenario(page, entry, slug, label, matrix, sc) {
  const identity = { id: sc.id, route: entry.route, viewport: label, target: sc.target || sc.id, state: 'empty' };
  let fresh;
  try {
    fresh = await freshScenarioPage(page, entry.route);
    if (sc.setup?.evaluate) await fresh.evaluate(sc.setup.evaluate);
    const actual = await assertScenario(fresh, sc.assert);
    const target = specTarget(fresh, sc.assert.selector, identity.target, sc.id, 'list');
    const captured = await captureState(fresh, entry, slug, label, target, 'empty', sc.setup?.evaluate ? ['setup'] : [], { escape: 'fresh-context' });
    matrixPush(matrix, 'captured', identity);
    recordFunctional(entry, label, identity.target, 'empty', sc.assert, { ...actual, setup: !!sc.setup?.evaluate }, captured.file);
    return 1;
  } catch (e) {
    matrixPush(matrix, 'failed', { ...identity, error: `setup failed: ${e.message}` });
    return 0;
  } finally {
    await fresh?.close();
  }
}

async function runHeldScenario(page, entry, slug, label, matrix, sc) {
  const identity = { id: sc.id, route: entry.route, viewport: label, target: sc.target || sc.id };
  const url = sc.hold?.url;
  if (!url) {
    matrixPush(matrix, 'failed', { ...identity, state: 'loading', error: 'setup failed: hold.url missing' });
    return 0;
  }
  const terminals = [];
  if ((sc.states || []).includes('success') && sc.success) terminals.push(['success', sc.success]);
  if ((sc.states || []).includes('error') && sc.error) terminals.push(['error', sc.error]);
  if (!terminals.length) terminals.push(['_release', { status: 200, body: '{}' }]);
  let n = 0;
  let loadingCaptured = false;
  for (const [termName, term] of terminals) {
    const held = [];
    let fresh;
    try {
      fresh = await freshScenarioPage(page, entry.route);
      await fresh.route(url, (route) => { held.push(route); });
      for (const prepare of Array.isArray(sc.prepare) ? sc.prepare : (sc.prepare ? [sc.prepare] : [])) {
        await fresh.locator(prepare.selector).fill(String(prepare.fill ?? ''));
      }
      if (!sc.trigger?.selector) throw new Error('explicit trigger.selector required');
      await fresh.locator(sc.trigger.selector).click({ timeout: 4000 });
      if (!await waitHeld(held, 8000)) throw new Error('request was not intercepted');
      const request = held[0].request();
      const observed = { method: request.method(), post_data: request.postData(), url: request.url(), backend: 'mocked' };
      if (sc.request) {
        if (!sc.request.method) throw new Error('request.method expectation required');
        if (observed.method !== sc.request.method) throw new Error(`request method: expected ${sc.request.method}, got ${observed.method}`);
        if (sc.request.post_data !== undefined && observed.post_data !== sc.request.post_data) throw new Error('request payload mismatch');
      }
      if (!loadingCaptured && (sc.states || []).includes('loading')) {
        const actual = await assertScenario(fresh, sc.assert_loading);
        const target = specTarget(fresh, sc.assert_loading.selector, identity.target, sc.id, 'status');
        const captured = await captureState(fresh, entry, slug, label, target, 'loading', ['click'], { escape: 'fresh-context' });
        matrixPush(matrix, 'captured', { ...identity, state: 'loading' });
        if (sc.request) recordFunctional(entry, label, identity.target, 'loading', { request: sc.request, ui: sc.assert_loading }, { request: observed, ui: actual }, captured.file);
        loadingCaptured = true;
        n++;
      }
      const status = term.status ?? (termName === 'error' ? 400 : 200);
      if (termName === 'success' && status >= 400) throw new Error('success cannot be established from a failed HTTP response');
      const received = fresh.waitForResponse(response => response.request() === request, { timeout: 5000 });
      await held[0].fulfill({ status, contentType: 'application/json', body: term.body ?? '' });
      const response = await received;
      const responseActual = { status: response.status(), body: await response.text(), backend: 'mocked' };
      if (responseActual.status !== status) throw new Error(`response status: expected ${status}, got ${responseActual.status}`);
      if (termName.startsWith('_')) continue;
      const actual = await assertScenario(fresh, term.assert);
      await fresh.waitForTimeout(100);
      const count = sc.request?.count ?? 1;
      if (held.length !== count) throw new Error(`request count: expected ${count}, got ${held.length}`);
      const target = specTarget(fresh, term.assert.selector, identity.target, sc.id, termName === 'error' ? 'alert' : 'status');
      const captured = await captureState(fresh, entry, slug, label, target, termName, ['click'], { escape: 'fresh-context' });
      matrixPush(matrix, 'captured', { ...identity, state: termName });
      if (sc.request) recordFunctional(entry, label, identity.target, termName,
        { request: { ...sc.request, count }, response: { status }, ui: term.assert },
        { request: { ...observed, count: held.length }, response: responseActual, ui: actual }, captured.file);
      n++;
    } catch (e) {
      matrixPush(matrix, 'failed', { ...identity, state: termName === '_release' ? 'loading' : termName, error: `setup failed: ${e.message}` });
    } finally {
      for (const route of held) await route.abort().catch(() => {});
      await fresh?.close();
    }
  }
  return n;
}

async function specStatePass(page, entry, slug, label, matrix, route) {
  let n = 0;
  const scenarios = (STATE_SPEC.scenarios || []).filter((sc) => (!sc.route || sc.route === route)
    && (!sc.viewport || sc.viewport === label));
  for (const sc of scenarios) {
    if ((sc.states || []).some((s) => ['loading', 'success', 'error'].includes(s))) {
      n += await runHeldScenario(page, entry, slug, label, matrix, sc);
    }
    if ((sc.states || []).includes('empty')) n += await runEmptyScenario(page, entry, slug, label, matrix, sc);
  }
  return n;
}

async function sweepRoute(browser, route, vp, label, manifest) {
  const page = await browser.newPage({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
    colorScheme: 'light',
  });
  page.setDefaultNavigationTimeout(45000);
  // Slug: '/' -> 'home', fuehrenden Slash strippen — '/a/b' und '/a_b' kollidieren so nicht.
  const slug = route === '/' ? 'home'
    : route.replace(/^\/+/, '').replace(/\//g, '__').replace(/[^\w.-]+/g, '_');
  // Haengende RSC-Prefetches (Next.js <link prefetch> auf 404-Routen) blockieren
  // networkidle unendlich — diese Requests aborten, sonst timed der Sweep aus.
  await page.route('**/*_rsc=*', (route) => route.abort().catch(() => {}));
  try {
    if (STATIC) await page.emulateMedia({ reducedMotion: 'reduce' });
    const res = await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle' }).catch((e) => {
      console.log(`NAV-ERR ${route}: ${e.message}`);
      return null;
    }) || await page.goto(`${BASE}${route}`, { waitUntil: 'domcontentloaded' }).then((r) => {
      // Externe Referenz-Seiten erreichen networkidle nie (Ads/Tracker) — Fallback
      // auf domcontentloaded + laengeres Settling, damit Blind-A/B-Sweeps nicht
      // komplett leer ausfallen (Befund 10.08.2026, lugg.com/anyvan.com).
      console.log(`NAV-FALLBACK ${route}: domcontentloaded statt networkidle`);
      return page.waitForTimeout(2500).then(() => r);
    }).catch((e) => {
      console.log(`NAV-ERR-2 ${route}: ${e.message}`);
      return null;
    });
    if (!res) {
      manifest.routes.push({ route, error: `navigation failed (${BASE}${route})`, shots: [] });
      return;
    }
    console.log(`${label} ${route} -> ${res.status()}`);
    if (STATIC) await forceStatic(page);
    await waitSettled(page);

    const entry = {
      route, status: res.status(), static: STATIC, shots: [],
      viewport_label: label, label,
    };

    // SPA-Catch-Alls liefern oft 200 + NotFound-Seite: als ehrlichen Fehler markieren.
    // "404" nur standalone werten — UIDs wie CHE-404.305.274 sind kein NotFound.
    const notFoundRe = /(?<![\d.-])404(?![\d.-])|not found|nicht gefunden|page not found|seite nicht gefunden/i;
    let isNotFound = notFoundRe.test(await page.title());
    if (!isNotFound) {
      const bodyText = await page.evaluate(() => (document.body?.innerText || '').slice(0, 600));
      isNotFound = notFoundRe.test(bodyText);
    }
    if (!res.ok() || isNotFound) {
      const issue = res.ok()
        ? 'not-found page served with HTTP 200 (SPA catch-all)'
        : `HTTP ${res.status()}`;
      if (!(ALLOW_404 && (res.status() === 404 || (res.ok() && isNotFound)))) {
        entry.error = issue;
        manifest.routes.push(entry);
        console.log(`WARN ${route}: ${entry.error} -> als Fehler im Manifest`);
        return;
      }
      entry.allowed_not_found = issue;
      console.log(`WARN ${route}: ${issue} -> --allow-404, Sweep laeuft`);
    }

    // 1) Hero/First Fold — eigener Shot, kein Zuschnitt.
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(350);
    await shot(page, entry, `${slug}-${label}-00-fold.png`, { kind: 'fold', y: 0 });

    // 2) Expliziter --hover-Pass direkt nach dem Fold.
    if (!NO_INTERACT) {
      const h = await hoverPass(page, entry, slug, label);
      if (h) console.log(`  hover: ${h} Shots`);
    }

    // 2b) Zustands-Stufe (--states): hover, state-focus, open-expanded, plus
    //     state-spec loading/empty/error/success. Nur deklarierte Anforderungen.
    if (STATES && !NO_INTERACT) {
      const autoN = await autoStatePass(page, entry, slug, label, manifest.state_matrix);
      const specN = await specStatePass(page, entry, slug, label, manifest.state_matrix, route);
      if (autoN || specN) console.log(`  states: ${autoN} auto + ${specN} spec`);
      await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle' }).catch(() => {});
      if (STATIC) await forceStatic(page);
      await waitSettled(page);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(250);
    }

    // 3) Rest der Seite: Viewport 1500 hoch (Desktop), Schritt exakt 750 px, echte
    //    Scroll-Events. Nach jedem scrollTo das TATSAECHLICHE scrollY auslesen.
    //
    if (label === 'desktop') {
      await page.setViewportSize({ width: DEEP.width, height: DEEP.height });
      await page.waitForTimeout(250);
    }
    const activeVp = label === 'desktop' ? DEEP : vp;
    const step = label === 'desktop' ? SCROLL_STEP : Math.round(activeVp.height * 0.5);
    // "Execution context was destroyed" (Hydration-Reload mitten im Sweep) war DIE
    // Ursache, warum Sessions auf Ad-hoc-Skripte auswichen (Forensik 10.08.2026):
    // ein Retry nach kurzer Wartezeit statt Abbruch.
    const safeEval = async (fn, arg) => {
      try { return await page.evaluate(fn, arg); }
      catch { await page.waitForTimeout(1500); return await page.evaluate(fn, arg); }
    };
    const measureMaxY = async () => {
      const docH = await safeEval(() => document.documentElement.scrollHeight);
      entry.docHeight = docH; // immer der letzte echte Messwert
      return Math.max(0, docH - activeVp.height);
    };

    // Pass A: reine Scroll-Abdeckung. Hoehe vor jedem Schritt neu messen; fertig erst,
    // wenn kein Fortschritt mehr moeglich ist UND das Seitenende erreicht wurde.
    let i = 0;
    let lastY = -1;
    let coveredTo = 0;
    let stalled = 0;
    let coverageError = null;
    for (let target = 0; ; target += step) {
      const maxY = await measureMaxY();
      const y = Math.min(target, maxY);
      await safeEval((yy) => window.scrollTo({ top: yy, behavior: 'instant' }), y);
      await page.waitForTimeout(STATIC ? 200 : 400);
      const realY = await safeEval(() => Math.round(window.scrollY));
      if (realY === lastY) {
        if (realY >= (await measureMaxY()) - 2) break; // Ende erreicht
        if (++stalled >= 3) {
          coverageError = `scroll coverage incomplete: stuck at y=${realY}, expected bottom y=${await measureMaxY()}`;
          break;
        }
        continue;
      }
      stalled = 0;
      if (realY > coveredTo + 2) {
        coverageError = `scroll coverage gap: y=${coveredTo}..${realY}`;
      }
      i++;
      await shot(page, entry, `${slug}-${label}-${String(i).padStart(2, '0')}-y${realY}.png`,
        { kind: 'scroll', y: realY });
      coveredTo = Math.max(coveredTo, realY + activeVp.height);
      lastY = realY;
      if (realY >= maxY && realY >= (await measureMaxY()) - 2) break;
    }
    if (coveredTo < entry.docHeight - 2 && !coverageError) {
      coverageError = `scroll coverage incomplete: captured to ${coveredTo}, document height ${entry.docHeight}`;
    }
    entry.scroll_coverage = {
      status: coverageError ? 'FAIL' : 'PASS', method: 'viewport-intervals',
      captured_to: coveredTo, doc_height: entry.docHeight, last_y: lastY,
      ...(coverageError ? { error: coverageError } : {}),
    };
    if (coverageError) entry.error = [entry.error, coverageError].filter(Boolean).join('; ');

    manifest.routes.push(entry);
  } finally {
    await page.close();
  }
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const { chromium } = await import('/usr/lib/node_modules/playwright/index.mjs');
  const launch = () => chromium.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-dev-shm-usage',
      '--use-gl=swiftshader',
      '--disable-software-rasterizer',
      '--force-color-profile=srgb',
      '--disable-lcd-text',
      '--hide-scrollbars',
    ],
  });
  let browser = await launch();
  const state_matrix = {
    required: [], captured: [], not_applicable: [], failed: [],
  };
  if (STATES) ingestStateSpec(state_matrix);
  const manifest = {
    schema: 'web/shot-sweep/v2',
    run_id: RUN_ID,
    build_revision: BUILD_REVISION,
    status: 'RUNNING',
    capture_profile: { static: STATIC, states: STATES, mobile: MOBILE,
      presentation: STATIC ? 'stabilized' : 'runtime', modified_dom: STATIC },
    base: BASE, createdAt: new Date().toISOString(), static: STATIC, states: STATES,
    viewports: { fold: FOLD, deep: DEEP, scrollStepPx: SCROLL_STEP },
    state_matrix,
    routes: [],
  };
  const manifestPath = path.join(OUT, 'manifest.json');
  const writeManifest = () =>
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  // Sequentiell: eine Route mit ihren expliziten Szenarien, dann die naechste.
  // Browser-Crash (z.B. "Target closed" mitten im Hover-Pass) darf den Rest-Sweep
  // nicht toeten: Route als Fehler ins Manifest, Browser neu starten, weiter.
  // Das Manifest wird nach JEDER Route geschrieben — ein toter Lauf verliert so
  // keine bereits geschossenen Routen mehr (Absturz 10.08.2026, /reinigung-privat).
  const sweepAll = async (routes, vp, label) => {
    for (const r of routes) {
      try {
        await sweepRoute(browser, r, vp, label, manifest);
      } catch (e) {
        console.log(`CRASH ${r}: ${e.message} -> Browser-Neustart, Sweep laeuft weiter`);
        manifest.routes.push({ route: r, error: `sweep crashed: ${e.message}`, shots: [] });
        await browser?.close().catch(() => {});
        browser = await launch().catch((e2) => {
          console.log(`CRASH: Browser-Neustart fehlgeschlagen: ${e2.message}`);
          return null;
        });
        if (!browser) break;
      }
      writeManifest();
    }
  };
  await sweepAll(ROUTES, FOLD, 'desktop');
  if (MOBILE && browser) await sweepAll(ROUTES, MOB, 'mobile');
  writeManifest();
  reconcileMatrix(manifest);
  writeManifest();
  console.log(`manifest: ${manifestPath} (${manifest.routes.reduce((n, r) => n + r.shots.length, 0)} shots)`);
  await browser?.close().catch(() => {});
  const failed = manifest.routes.filter((r) => r.error);
  if (failed.length) {
    console.log(`WARN: ${failed.length} Route(s) mit Fehler im Manifest: ${failed.map((r) => r.route).join(', ')}`);
    process.exitCode = 1;
  }
  if ((manifest.state_matrix.failed || []).length) {
    console.log(`WARN: state_matrix.failed=${manifest.state_matrix.failed.length}`);
    process.exitCode = 1;
  }
  manifest.status = process.exitCode ? 'FAIL' : 'PASS';
  writeManifest();
  const checks = manifest.routes.flatMap((route) => route.functional_checks || []);
  const unverified = manifest.state_matrix.required.filter(required =>
    !checks.some(check => stateIdentity(check) === stateIdentity(required))
    && !manifest.state_matrix.not_applicable.some(na => stateIdentity(na) === stateIdentity(required)));
  fs.writeFileSync(path.join(OUT, 'functional.json'), JSON.stringify({
    schema: 'web/functional/v1', run_id: RUN_ID, build_revision: BUILD_REVISION, base_url: BASE,
    status: process.exitCode ? 'FAIL' : checks.length && unverified.length === 0 ? 'PASS' : 'NOT_CHECKED',
    checks, unverified,
  }, null, 2));
})();
