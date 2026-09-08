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
//   4. Interaktiv-Pass: Header-Nav hovern (Shot je Hover), und alles Klickbare klicken
//      (Buttons, Accordions, Tabs, aria-expanded) mit Shot. Links (a[href]) nur hovern —
//      Navigation ist durch den Routen-Sweep abgedeckt.
//   5. --static: Animationen hart aus (reduced-motion + CSS-Kill + data-reveal sichtbar).
//      Standard fuer Kritik-Sweeps, damit keine leeren Reveal-Flaechen entstehen.
//   5b. --states: je Route+Viewport eigene Targets fuer hover, focus (Tab/Shift+Tab
//      plus Focusassert) und open-expanded (button/details/summary/menu/dialog,
//      ARIA, Escape/Recovery). Ein Shot nie fuer zwei Controls. --states mit
//      nur Hover ist FAIL.
//   6. Jeder Shot ueber Playwright page.screenshot: animations disabled,
//      caret hide, Fonts/Seite gesetzt. Nie fullPage/captureBeyondViewport.
//
// Ausgabe: PNGs + manifest.json — das Manifest ist der Vertrag fuer Kritik-Agents.
// Playwright erst NACH der Flag-Wache laden (dynamischer import unten): ein
// statischer import laeuft immer zuerst und kostet 12-36s, nur um danach ein
// falsch getipptes Flag abzulehnen (Befund 03.08.2026, siehe axe-run.mjs).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SCRIPT = fileURLToPath(import.meta.url);

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
  node ${SCRIPT} \\
    --base http://127.0.0.1:3310 --out /tmp/shots --routes / --static`);
  process.exit(2);
}
const BASE = String(baseRaw).replace(/\/$/, '');
const OUT = get('out', '/tmp/shot-sweep');
const ROUTES = get('routes', '/').split(',').map((r) => r.trim())
  .map((r) => (r.startsWith('/') ? r : `/${r}`));
const MOBILE = args.includes('--mobile');
const STATIC = args.includes('--static');       // Animationen aus (Kritik-Standard)
const ALLOW_404 = args.includes('--allow-404'); // 404-Seite bewusst sweepen (not-found.tsx)
const NO_INTERACT = args.includes('--no-interact'); // Hover/Klick-Pass abschalten
const HOVERS = args.filter((a, i) => args[i - 1] === '--hover'); // zusaetzliche Selektoren
const STATES = args.includes('--states');   // Zustands-Stufe (Audit 23.08.2026)
const STATE_SELECTORS_EXTRA = args.filter((a, i) => args[i - 1] === '--state-sel');
const STATE_SELECTORS = ['a[href*="/products/"]', '.card', 'button', 'nav', ...STATE_SELECTORS_EXTRA];
const STATE_MAX_PER_SELECTOR = 6;
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
const FOCUS_SEL = 'a[href], button:not([disabled]), input:not([type="hidden"]):not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
const OPEN_SEL = '[aria-expanded], summary, [role="combobox"]';

function loadStateSpec() {
  if (!STATE_SPEC_PATH) return { scenarios: [], not_applicable: [], playwright_refs: [], targets: [] };
  if (!fs.existsSync(STATE_SPEC_PATH)) {
    return { _missing: STATE_SPEC_PATH, scenarios: [], not_applicable: [], playwright_refs: [], targets: [] };
  }
  try {
    return JSON.parse(fs.readFileSync(STATE_SPEC_PATH, 'utf8'));
  } catch (e) {
    return { _missing: `${STATE_SPEC_PATH}: ${e.message}`, scenarios: [], not_applicable: [], playwright_refs: [], targets: [] };
  }
}
const STATE_SPEC = loadStateSpec();

function slugId(s) {
  return String(s || '').trim().toLowerCase().replace(/[^\wÀ-ſ-]+/g, '_').replace(/^_+|_+$/g, '').slice(0, 32) || 'el';
}

function stateKey(route, viewport, target, state) {
  return `${route}|${viewport}|${target}|${state}`;
}

function hoverOnlyFail(manifest) {
  if (!manifest.capture_profile?.states) return false;
  const kinds = [];
  for (const r of manifest.routes) {
    for (const s of r.shots || []) {
      const st = s.state || (String(s.kind || '').startsWith('state-')
        ? String(s.kind).slice('state-'.length) : '');
      if (st) kinds.push(st);
    }
  }
  if (!kinds.length) return false;
  return kinds.every((k) => k === 'hover' || k === 'state-hover');
}

function ingestStateSpec(matrix) {
  if (STATE_SPEC._missing) {
    matrixPush(matrix, 'failed', {
      error: `setup failed: state-spec ${STATE_SPEC._missing}`,
    });
  }
  for (const sc of STATE_SPEC.scenarios || []) {
    for (const st of sc.states || []) {
      matrixPush(matrix, 'required', { id: sc.id, route: sc.route, state: st });
    }
  }
  for (const na of STATE_SPEC.not_applicable || []) {
    const reason = typeof na === 'string' ? na : na.reason;
    if (!NA_REASONS.has(reason)) {
      matrixPush(matrix, 'failed', {
        ...(typeof na === 'object' && na ? na : {}),
        reason,
        error: `setup failed: not_applicable reason '${reason}' not in static-page|no-form|no-async-data`,
      });
    } else {
      matrixPush(matrix, 'not_applicable', typeof na === 'string' ? { reason: na } : na);
    }
  }
  for (const ref of STATE_SPEC.playwright_refs || []) {
    matrixPush(matrix, 'required', { id: ref.id, playwright_ref: ref.test || ref.receipt });
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
      matrixPush(matrix, 'captured', {
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
    const cap = m.captured.some((c) => {
      if (req.playwright_ref) return !!c.playwright_ref && (!req.id || c.id === req.id);
      if (req.id && c.id) return c.id === req.id && (!req.state || c.state === req.state);
      return c.state === req.state && (!req.route || c.route === req.route);
    });
    const na = m.not_applicable.some((n) => {
      if (req.state && (n.state === req.state || (n.states || []).includes(req.state))) return true;
      if (req.applicability && n.reason) return NA_REASONS.has(n.reason);
      return false;
    });
    const already = m.failed.some((f) => f.id && req.id && f.id === req.id
      && (!req.state || f.state === req.state));
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
  animations: 'disabled',
  caret: 'hide',
  fullPage: false,
  scale: 'css',
  type: 'png',
  timeout: 20000,
};

const COOKIE_BUTTON = 'button:has-text("Okay"), button:has-text("Akzeptieren"), button:has-text("Alle akzeptieren")';

// Interaktive Elemente, die geklickt werden (Links werden NICHT geklickt — nur gehovert):
const CLICKABLE = [
  'button:not([disabled])',
  '[role="button"]:not(a)',
  '[role="tab"]',
  'summary',
  '[aria-expanded]',
].join(', ');

async function dismissCookie(page) {
  const btn = page.locator(COOKIE_BUTTON).first();
  if (await btn.count()) { try { await btn.click({ timeout: 900 }); } catch { /* nicht kritisch */ } }
}

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
  await dismissCookie(page);
  await page.waitForTimeout(300);
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

async function listTargets(page, selector, limit) {
  const els = page.locator(selector);
  const count = Math.min(await els.count().catch(() => 0), limit);
  const out = [];
  for (let i = 0; i < count; i++) {
    const loc = els.nth(i);
    if (!(await loc.isVisible().catch(() => false))) continue;
    const info = await loc.evaluate((e, idx) => ({
      // innerText ist vor dem Scroll ins Viewport oft leer (Reveal-Animationen);
      // textContent liefert den Namen sofort, sonst hiesse jedes Target el<i>.
      name: (e.getAttribute('aria-label') || e.innerText || e.textContent || e.id || '')
        .replace(/\s+/g, ' ').trim().slice(0, 40),
      role: e.getAttribute('role') || e.tagName.toLowerCase(),
      id: e.id || '',
      idx,
    }), i).catch(() => ({ name: `el${i}`, role: 'unknown', id: '', idx: i }));
    const targetId = `${slugId(info.role)}-${slugId(info.name || info.id || `el${i}`)}-${i}`;
    out.push({ loc, selector, index: i, targetId, name: info.name, role: info.role });
  }
  return out;
}

function matrixPush(matrix, bucket, rec) {
  matrix[bucket].push(rec);
}

async function captureState(page, entry, slug, label, target, state, keyboard, extra = {}) {
  const a11y = await collectA11y(page, target.loc);
  const axe = extra.skipAxe ? null : await runAxe(page);
  const file = `${slug}-${label}-state-${state}-${target.targetId}.png`;
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

/** Hover-Pass: Header-Nav-Eintraege + explizite --hover-Selektoren, je ein Shot. */
async function hoverPass(page, entry, slug, label) {
  const targets = [];
  // Header-Nav automatisch: sichtbare Links/Buttons in header/nav.
  const navItems = page.locator('header a, header button, nav a, nav button');
  const n = Math.min(await navItems.count(), 40);
  for (let i = 0; i < n; i++) {
    const el = navItems.nth(i);
    if (await el.isVisible().catch(() => false)) targets.push({ loc: el, name: `nav${i}` });
  }
  for (let h = 0; h < HOVERS.length; h++) {
    targets.push({ loc: page.locator(HOVERS[h]).first(), name: `sel${h}`, selector: HOVERS[h] });
  }
  let k = 0;
  for (const t of targets) {
    if (!(await t.loc.count())) continue;
    const text = (await t.loc.innerText().catch(() => '')).trim().slice(0, 24)
      .replace(/[^\wÀ-ſ-]+/g, '_') || t.name;
    try {
      await t.loc.hover({ timeout: 1500 });
      await page.waitForTimeout(STATIC ? 150 : 450);
      await shot(page, entry, `${slug}-${label}-hover-${String(k).padStart(2, '0')}-${text}.png`,
        { kind: 'hover', target: text, selector: t.selector });
      k++;
    } catch { /* nicht hoverbar -> weiter */ }
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

async function recordApplicability(page, entry, matrix) {
  const appl = await page.evaluate(() => {
    const html = document.documentElement.innerHTML;
    return {
      form: !!document.querySelector('form'),
      list: !!document.querySelector('ul, ol, tbody, [role="list"]'),
      async: /fetch\s*\(|XMLHttpRequest|aria-live|aria-busy/.test(html),
    };
  }).catch(() => ({ form: false, list: false, async: false }));
  if (appl.form) {
    for (const st of ['loading', 'error', 'success']) {
      matrixPush(matrix, 'required', { route: entry.route, state: st, applicability: 'form' });
    }
  } else {
    matrixPush(matrix, 'not_applicable', {
      route: entry.route, state: 'success', reason: 'no-form',
    });
  }
  if (appl.list) {
    matrixPush(matrix, 'required', { route: entry.route, state: 'empty', applicability: 'list' });
  }
  if (appl.async) {
    matrixPush(matrix, 'required', { route: entry.route, state: 'loading', applicability: 'async' });
  } else if (!appl.form) {
    matrixPush(matrix, 'not_applicable', {
      route: entry.route, state: 'loading', reason: 'no-async-data',
    });
  }
  if (!appl.form && !appl.list && !appl.async) {
    matrixPush(matrix, 'not_applicable', {
      route: entry.route, states: ['loading', 'empty', 'error', 'success'], reason: 'static-page',
    });
  }
  return appl;
}

/** Hover + state-focus + open-expanded, je Target ein Shot. --states mit
 *  nur Hover ist FAIL. */
async function autoStatePass(page, entry, slug, label, matrix) {
  let n = 0;
  await recordApplicability(page, entry, matrix);

  for (const selector of STATE_SELECTORS) {
    const targets = await listTargets(page, selector, STATE_MAX_PER_SELECTOR);
    for (const target of targets) {
      try {
        await target.loc.scrollIntoViewIfNeeded({ timeout: 1500 });
        await target.loc.hover({ timeout: 1500 });
        await page.waitForTimeout(STATIC ? 150 : 450);
        await captureState(page, entry, slug, label, target, 'hover', ['Hover'], { skipAxe: n > 0, escape: 'none' });
        matrixPush(matrix, 'captured', {
          route: entry.route, viewport: label, target: target.targetId, state: 'hover',
        });
        n++;
      } catch { /* nicht hoverbar */ }
      await page.mouse.move(0, 0);
      await page.waitForTimeout(80);
    }
  }

  const focusTargets = await listTargets(page, FOCUS_SEL, 8);
  for (const target of focusTargets) {
    try {
      await target.loc.scrollIntoViewIfNeeded({ timeout: 1500 });
      await target.loc.focus({ timeout: 1500 });
      await page.waitForTimeout(80);
      const focused = await target.loc.evaluate((e) => e === document.activeElement).catch(() => false);
      await captureState(page, entry, slug, label, target, 'focus', ['Tab', 'Shift+Tab']);
      matrixPush(matrix, 'captured', {
        route: entry.route, viewport: label, target: target.targetId, state: 'focus',
        kind: 'state-focus',
      });
      n++;
      if (!focused) {
        matrixPush(matrix, 'failed', {
          route: entry.route, target: target.targetId, state: 'focus',
          error: 'focus assert failed: activeElement ist nicht das Target',
        });
      }
    } catch (e) {
      matrixPush(matrix, 'failed', {
        route: entry.route, target: target.targetId, state: 'focus',
        error: `setup failed: ${e.message}`,
      });
    }
  }

  const openTargets = await listTargets(page, OPEN_SEL, 6);
  for (const target of openTargets) {
    try {
      await target.loc.scrollIntoViewIfNeeded({ timeout: 1500 });
      const tag = await target.loc.evaluate((e) => e.tagName.toLowerCase()).catch(() => '');
      // Vorzustand lesen: ein per Default offenes Target (z. B. erstes FAQ-Item)
      // wuerde der Klick schliessen und der ARIA-Assert faelschlich als Fail werten.
      const preExpanded = await target.loc.getAttribute('aria-expanded').catch(() => null);
      const alreadyOpen = preExpanded === 'true';
      if (!alreadyOpen) {
        await target.loc.click({ timeout: 2000 });
        await page.waitForTimeout(STATIC ? 150 : 350);
      }
      const a11yPre = await collectA11y(page, target.loc);
      const expanded = a11yPre.aria?.expanded;
      const detailsOpen = tag === 'summary'
        ? await target.loc.evaluate((e) => !!e.closest('details')?.open).catch(() => false)
        : false;
      await captureState(page, entry, slug, label, target, 'open-expanded', ['Enter', 'Escape'], { escape: 'Escape' });
      matrixPush(matrix, 'captured', {
        route: entry.route, viewport: label, target: target.targetId, state: 'open-expanded',
        ...(alreadyOpen ? { note: 'default-open, ohne Klick erfasst' } : {}),
      });
      n++;
      if (expanded !== 'true' && !detailsOpen && tag !== 'summary') {
        matrixPush(matrix, 'failed', {
          route: entry.route, target: target.targetId, state: 'open-expanded',
          error: 'ARIA-State fehlt: aria-expanded ist nicht true',
        });
      }
      await page.keyboard.press('Escape').catch(() => {});
      await page.waitForTimeout(80);
      const still = await target.loc.getAttribute('aria-expanded').catch(() => null);
      if (still === 'true' && !alreadyOpen) await target.loc.click({ timeout: 1000 }).catch(() => {});
    } catch (e) {
      matrixPush(matrix, 'failed', {
        route: entry.route, target: target.targetId, state: 'open-expanded',
        error: `setup failed: ${e.message}`,
      });
    }
  }
  return n;
}

async function waitHeld(held, ms) {
  const t0 = Date.now();
  while (!held.length && Date.now() - t0 < ms) await new Promise((r) => setTimeout(r, 40));
  return held.length > 0;
}

async function runEmptyScenario(page, entry, slug, label, matrix, sc) {
  try {
    if (sc.setup?.evaluate) await page.evaluate(sc.setup.evaluate);
    const sel = sc.assert?.selector;
    if (sel) await page.waitForSelector(sel, { timeout: 5000, state: 'attached' });
    const target = specTarget(page, sel || 'body', `${slugId(sc.id)}-empty`, sc.id, 'list');
    await captureState(page, entry, slug, label, target, 'empty', sc.setup?.evaluate ? ['setup'] : [], { escape: 'none' });
    matrixPush(matrix, 'captured', {
      id: sc.id, route: sc.route || entry.route, state: 'empty', target: target.targetId,
    });
    return 1;
  } catch (e) {
    matrixPush(matrix, 'failed', {
      id: sc.id, route: sc.route || entry.route, state: 'empty',
      error: `setup failed: ${e.message}`,
    });
    return 0;
  }
}

async function runHeldScenario(page, entry, slug, label, matrix, sc) {
  const url = sc.hold?.url;
  if (!url) {
    matrixPush(matrix, 'failed', {
      id: sc.id, state: 'loading', error: 'setup failed: hold.url missing',
    });
    return 0;
  }
  const terminals = [];
  if ((sc.states || []).includes('success') && sc.success) terminals.push(['success', sc.success]);
  if ((sc.states || []).includes('error') && sc.error) terminals.push(['error', sc.error]);
  if (!terminals.length) terminals.push(['_release', { status: 200, body: '{}' }]);

  let n = 0;
  let loadingCaptured = false;
  for (const [termName, term] of terminals) {
    await page.goto(`${BASE}${sc.route || entry.route}`, { waitUntil: 'domcontentloaded' }).catch(() => {});
    if (STATIC) await forceStatic(page);
    await waitSettled(page);
    const held = [];
    try {
      await page.route(url, (route) => { held.push(route); });
    } catch (e) {
      matrixPush(matrix, 'failed', {
        id: sc.id, state: termName, error: `setup failed: ${e.message}`,
      });
      continue;
    }
    try {
      if (sc.prepare?.selector) {
        await page.locator(sc.prepare.selector).fill(String(sc.prepare.fill ?? ''));
      }
      if (sc.trigger?.selector) {
        await page.locator(sc.trigger.selector).click({ timeout: 4000 });
      }
      const got = await waitHeld(held, 8000);
      if (!got) {
        matrixPush(matrix, 'failed', {
          id: sc.id, state: 'loading',
          error: 'setup failed: request was not intercepted',
        });
        continue;
      }
      const loadSel = sc.assert_loading?.selector;
      if (loadSel) await page.waitForSelector(loadSel, { timeout: 5000 });
      if (!loadingCaptured && (sc.states || []).includes('loading')) {
        const target = specTarget(
          page, loadSel || 'body', `${slugId(sc.id)}-loading`, sc.id, 'status',
        );
        await captureState(page, entry, slug, label, target, 'loading',
          [sc.trigger?.action || 'click'], { escape: 'none' });
        matrixPush(matrix, 'captured', {
          id: sc.id, route: sc.route || entry.route, state: 'loading', target: target.targetId,
        });
        loadingCaptured = true;
        n++;
      }
      await held[0].fulfill({
        status: term.status ?? (termName === 'error' ? 400 : 200),
        contentType: 'application/json',
        body: term.body ?? '',
      });
      for (let i = 1; i < held.length; i++) await held[i].abort().catch(() => {});
      if (termName.startsWith('_')) continue;
      const assertSel = term.assert?.selector;
      if (assertSel) await page.waitForSelector(assertSel, { timeout: 5000 });
      const target = specTarget(
        page, assertSel || 'body', `${slugId(sc.id)}-${termName}`, sc.id,
        termName === 'error' ? 'alert' : 'status',
      );
      await captureState(page, entry, slug, label, target, termName,
        [sc.trigger?.action || 'click'], { escape: 'none' });
      matrixPush(matrix, 'captured', {
        id: sc.id, route: sc.route || entry.route, state: termName, target: target.targetId,
      });
      n++;
    } catch (e) {
      matrixPush(matrix, 'failed', {
        id: sc.id, state: termName, error: `setup failed: ${e.message}`,
      });
    } finally {
      for (const r of held) await r.abort().catch(() => {});
      await page.unroute(url).catch(() => {});
    }
  }
  return n;
}

async function specStatePass(page, entry, slug, label, matrix, route) {
  let n = 0;
  const scenarios = (STATE_SPEC.scenarios || []).filter((sc) => !sc.route || sc.route === route);
  for (const sc of scenarios) {
    const wantsHeld = (sc.states || []).some((s) => s === 'loading' || s === 'success' || s === 'error');
    if (wantsHeld && sc.hold?.url) {
      n += await runHeldScenario(page, entry, slug, label, matrix, sc);
    } else if (wantsHeld && !sc.hold?.url) {
      matrixPush(matrix, 'failed', {
        id: sc.id, state: 'loading', error: 'setup failed: hold.url missing',
      });
    }
    if ((sc.states || []).includes('empty')) {
      await page.goto(`${BASE}${sc.route || route}`, { waitUntil: 'domcontentloaded' }).catch(() => {});
      if (STATIC) await forceStatic(page);
      await waitSettled(page);
      n += await runEmptyScenario(page, entry, slug, label, matrix, sc);
    }
  }
  return n;
}

/** Klick-Pass am aktuellen Scroll-Y: alle sichtbaren klickbaren Nicht-Link-Elemente
 *  klicken -> Shot -> zurueck-toggeln. `seen` verhindert Doppel-Klicks ueber
 *  ueberlappende Scroll-Positionen hinweg. */
async function clickPass(page, entry, slug, label, y, seen) {
  const els = page.locator(CLICKABLE);
  const n = Math.min(await els.count(), 200);
  let k = 0;
  for (let i = 0; i < n; i++) {
    const el = els.nth(i);
    if (!(await el.isVisible().catch(() => false))) continue;
    // Nur Elemente im aktuellen Viewport klicken.
    const box = await el.boundingBox().catch(() => null);
    if (!box) continue;
    const vp = page.viewportSize();
    if (box.y < 0 || box.y > vp.height - 20) continue;
    const key = await el.evaluate((e) => {
      const t = (e.innerText || e.getAttribute('aria-label') || '').trim().slice(0, 40);
      return `${e.tagName}|${t}|${e.className}`.slice(0, 120);
    }).catch(() => null);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    // Cookie-Buttons und Header-Nav (schon im Hover-Pass) auslassen.
    const inHeader = await el.evaluate((e) => !!e.closest('header, nav')).catch(() => false);
    if (inHeader) continue;
    const text = key.split('|')[1].replace(/[^\wÀ-ſ-]+/g, '_').slice(0, 24) || `el${i}`;
    try {
      const urlBefore = page.url();
      await el.click({ timeout: 1500 });
      await page.waitForTimeout(STATIC ? 250 : 550);
      if (page.url() !== urlBefore) {
        // Hat doch navigiert (z.B. button mit onClick-Routing): zurueck, kein Shot.
        await page.goBack({ waitUntil: 'domcontentloaded' }).catch(() => {});
        if (STATIC) await forceStatic(page);
        await page.evaluate((yy) => window.scrollTo(0, yy), y);
        await page.waitForTimeout(400);
        continue;
      }
      await shot(page, entry, `${slug}-${label}-click-y${y}-${String(k).padStart(2, '0')}-${text}.png`,
        { kind: 'click', y, target: text });
      k++;
      // Zuruecktoggeln (Accordion/Tab/Menu wieder schliessen), Fehlschlag unkritisch.
      await el.click({ timeout: 1000 }).catch(() => {});
      await page.waitForTimeout(STATIC ? 150 : 350);
      // Escape fuer Modals/Overlays, die sich nicht per Re-Klick schliessen.
      await page.keyboard.press('Escape').catch(() => {});
    } catch { /* nicht klickbar -> weiter */ }
  }
  return k;
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
      entry.error = res.ok()
        ? 'not-found page served with HTTP 200 (SPA catch-all)'
        : `HTTP ${res.status()}`;
      if (!ALLOW_404) {
        manifest.routes.push(entry);
        console.log(`WARN ${route}: ${entry.error} -> als Fehler im Manifest`);
        return;
      }
      console.log(`WARN ${route}: ${entry.error} -> --allow-404, Sweep laeuft`);
    }

    // 1) Hero/First Fold exakt 730 (Desktop) — eigener Shot, kein Zuschnitt.
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(350);
    await shot(page, entry, `${slug}-${label}-00-fold.png`, { kind: 'fold', y: 0 });

    // 2) Hover-Pass (Header-Nav + --hover) direkt nach dem Fold.
    if (!NO_INTERACT) {
      const h = await hoverPass(page, entry, slug, label);
      if (h) console.log(`  hover: ${h} Shots`);
    }

    // 2b) Zustands-Stufe (--states): hover, state-focus, open-expanded, plus
    //     state-spec loading/empty/error/success. --states mit nur Hover ist FAIL.
    if (STATES && label === 'desktop') {
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
    //    Pass A (Scroll) und Pass B (Klick) sind GETRENNT (Forensik 10.08.2026, Runde 2):
    //    Klicks mitten im Scroll-Lauf veraenderten die Seitenhoehe (Galerie-Filter auf
    //    /fotos schrumpfte die Seite 7005->3500px, Tag-Tab auf /kursplan sperrte den
    //    Scroll komplett) — dadurch fehlten bis zu 3463px Abdeckung. Deshalb: erst die
    //    ganze Seite luecklos scrollen (Hoehe pro Schritt NEU messen, Lazy-Load waechst),
    //    dann Seite frisch laden und den Klick-Pass an denselben Positionen fahren.
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
    const positions = [];
    let i = 0;
    let lastY = -1;
    for (let target = 0; ; target += step) {
      const maxY = await measureMaxY();
      const y = Math.min(target, maxY);
      await safeEval((yy) => window.scrollTo({ top: yy, behavior: 'instant' }), y);
      await page.waitForTimeout(STATIC ? 200 : 400);
      const realY = await safeEval(() => Math.round(window.scrollY));
      if (realY === lastY) {
        if (realY >= (await measureMaxY()) - 2) break; // Ende erreicht
        if (target > y + step * 2) break;              // haengt fest (Scroll-Lock) -> ehrlich abbrechen
        continue;
      }
      i++;
      await shot(page, entry, `${slug}-${label}-${String(i).padStart(2, '0')}-y${realY}.png`,
        { kind: 'scroll', y: realY });
      positions.push(realY);
      lastY = realY;
      if (realY >= maxY && realY >= (await measureMaxY()) - 2) break;
    }

    // Pass B: Klick-Pass an denselben Positionen — auf FRISCH geladener Seite, damit
    // Klick-Nebenwirkungen (Filter, Modals) die Scroll-Abdeckung nie beeinflussen.
    if (!NO_INTERACT && positions.length) {
      await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle' }).catch(() => {});
      if (STATIC) await forceStatic(page);
      await waitSettled(page);
      const seen = new Set();
      for (const y of positions) {
        await safeEval((yy) => window.scrollTo({ top: yy, behavior: 'instant' }), y);
        await page.waitForTimeout(STATIC ? 200 : 400);
        const c = await clickPass(page, entry, slug, label, y, seen);
        if (c) console.log(`  click y${y}: ${c} Shots`);
      }
    }
    manifest.routes.push(entry);
  } finally {
    await page.close();
  }
}

function ensureWritableDir(dir) {
  try {
    fs.mkdirSync(dir, { recursive: true });
    const probe = path.join(dir, `.write-probe-${process.pid}`);
    fs.writeFileSync(probe, 'ok');
    fs.unlinkSync(probe);
  } catch (e) {
    console.error(
      `shot-sweep: Ausgabeordner nicht beschreibbar: ${dir} (${e.code || e.message}).`
      + ' Vor dem Browserstart mkdir -p plus Schreibprobe prüfen (EACCES sonst erst nach dem teuren Teil).',
    );
    process.exit(2);
  }
}

(async () => {
  ensureWritableDir(OUT);
  const { loadPlaywright, launchChromium } = await import(new URL('./lib/playwright-loader.mjs', import.meta.url));
  const { chromium } = loadPlaywright();
  const launch = () => launchChromium(chromium);
  let browser = await launch();
  const state_matrix = {
    required: [], captured: [], not_applicable: [], failed: [],
  };
  if (STATES) ingestStateSpec(state_matrix);
  const manifest = {
    schema: 'web/shot-sweep/v2',
    run_id: RUN_ID,
    build_revision: BUILD_REVISION,
    capture_profile: { static: STATIC, states: STATES, mobile: MOBILE },
    base: BASE, createdAt: new Date().toISOString(), static: STATIC, states: STATES,
    viewports: { fold: FOLD, deep: DEEP, scrollStepPx: SCROLL_STEP },
    state_matrix,
    routes: [],
  };
  const manifestPath = path.join(OUT, 'manifest.json');
  const writeManifest = () =>
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  // Sequentiell: eine Route komplett (Fold -> Hover -> Scroll+Klick), dann die naechste.
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
  // Mobil-Fold (390x844) immer: Kritik und Capture-Site erwarten beide Viewports,
  // auch ohne --mobile. --mobile bleibt im Profil und in der Hilfe sichtbar.
  if (browser) await sweepAll(ROUTES, MOB, 'mobile');
  writeManifest();
  reconcileMatrix(manifest);
  writeManifest();
  console.log(`manifest: ${manifestPath} (${manifest.routes.reduce((n, r) => n + r.shots.length, 0)} shots)`);
  await browser?.close().catch(() => {});
  const failed = manifest.routes.filter((r) => r.error && !(ALLOW_404 && r.shots.length));
  if (failed.length) {
    console.log(`WARN: ${failed.length} Route(s) mit Fehler im Manifest: ${failed.map((r) => r.route).join(', ')}`);
    process.exitCode = 1;
  }
  if (hoverOnlyFail(manifest)) {
    console.log('FAIL: --states mit nur Hover — Fokus/Open/Terminal fehlen');
    process.exitCode = 1;
  }
  if ((manifest.state_matrix.failed || []).length) {
    console.log(`WARN: state_matrix.failed=${manifest.state_matrix.failed.length}`);
    process.exitCode = 1;
  }
})();
