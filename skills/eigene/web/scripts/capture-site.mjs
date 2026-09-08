#!/usr/bin/env node
// Standalone Node >=18 helper. No dependency installation or browser download.
import { pathToFileURL } from 'node:url';
import { resolve, join } from 'node:path';
import { mkdir, writeFile } from 'node:fs/promises';
import { parseArgs } from 'node:util';
import { loadPlaywright as loadPlaywrightFromSkill, launchChromium } from './lib/playwright-loader.mjs';

const help = `Usage: node capture-site.mjs --url URL --out DIRECTORY [options]
  --mode both|desktop|mobile       Default both; independent contexts
  --module-path PATH              Playwright package directory or entry file
  --executable-path PATH          Explicit Chromium/Chrome executable
  --timeout-ms N                  Preparation budget per view (default 20000)
  --stable-ms N                   Minimum quiet observation (default 1500)
  --max-scroll-steps N            Lazy-scroll bound (default 40)
  --ready-selector SELECTOR       Optional application-ready visible selector
  --revision TEXT                 Supplied build/revision identifier
  --help
Exit: 0 all views ready and captured; 1 failed/incomplete evidence; 2 invalid CLI.
Existing manifest.json is replaced. Use a distinct output directory per run.`;

function options() {
  const names = ['url', 'out', 'mode', 'module-path', 'executable-path', 'timeout-ms',
    'stable-ms', 'max-scroll-steps', 'ready-selector', 'revision'];
  const { values } = parseArgs({ options: Object.fromEntries([
    ...names.map(name => [name, { type: 'string' }]), ['help', { type: 'boolean' }]
  ]), strict: true });
  if (values.help) return null;
  if (!values.url || !values.out) throw Error('--url and --out are required');
  if (!['http:', 'https:', 'file:'].includes(new URL(values.url).protocol))
    throw Error('URL must use http:, https: or file:');
  const opt = { url: values.url, out: resolve(values.out), mode: values.mode || 'both',
    modulePath: values['module-path'], executablePath: values['executable-path'],
    readySelector: values['ready-selector'], revision: values.revision ?? null };
  if (!['both', 'mobile', 'desktop'].includes(opt.mode)) throw Error('Invalid --mode');
  for (const [flag, key, fallback, maximum] of [
    ['timeout-ms', 'timeoutMs', 20000, 300000], ['stable-ms', 'stableMs', 1500, 60000],
    ['max-scroll-steps', 'maxScrollSteps', 40, 500]
  ]) {
    opt[key] = Number(values[flag] ?? fallback);
    if (!Number.isInteger(opt[key]) || opt[key] < 1 || opt[key] > maximum)
      throw Error(`--${flag} must be an integer from 1 to ${maximum}`);
  }
  if (opt.stableMs >= opt.timeoutMs) throw Error('--stable-ms must be below --timeout-ms');
  return opt;
}

function loadPlaywright(opt) {
  const loaded = loadPlaywrightFromSkill({ modulePath: opt.modulePath });
  return { playwright: loaded.playwright, entry: loaded.entry };
}

const presets = {
  desktop: { viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1, isMobile: false, hasTouch: false },
  mobile: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }
};
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const fault = (code, stage, message, extra = {}) => ({ code, stage, message, ...extra });

// Runs before page scripts; catches late DOM changes and retains decode results by source.
function installProbe() {
  const probe = { mutations: 0, images: new WeakMap() };
  new MutationObserver(() => { probe.mutations++; }).observe(document, {
    subtree: true, childList: true, attributes: true, characterData: true
  });
  window.__captureSiteProbe = probe;
}

async function inspectPage() {
  const probe = window.__captureSiteProbe;
  const images = [...document.images];
  const decoding = images.map(img => {
    const src = img.currentSrc || img.src;
    let item = probe.images.get(img);
    if (!item || item.src !== src) {
      item = { src, decoded: false, decodeError: null };
      item.promise = img.decode().then(() => { item.decoded = true; }, error => {
        item.decodeError = error.message;
      });
      probe.images.set(img, item);
    }
    return item.promise;
  });
  let fontsReady = false;
  await Promise.race([
    Promise.all([document.fonts.ready.then(() => { fontsReady = true; }), ...decoding]),
    new Promise(resolve => setTimeout(resolve, 100))
  ]);
  const imageStates = images.map(img => {
    const item = probe.images.get(img);
    return { src: item.src, declaredSrc: img.getAttribute('src'), loading: img.loading,
      complete: img.complete, naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight,
      decoded: item.decoded, decodeError: item.decodeError };
  });
  const elements = [...document.querySelectorAll('*')];
  // Limit sampling cost on pathological pages; report loss of coverage explicitly.
  const boxes = elements.slice(0, 3000).map(el => {
    const r = el.getBoundingClientRect();
    return [r.x, r.y, r.width, r.height].map(n => Math.round(n * 10) / 10).join(',');
  });
  const root = document.documentElement;
  const fonts = [...document.fonts].map(f => ({ family: f.family, weight: f.weight,
    style: f.style, status: f.status }));
  const dimensions = { scrollWidth: root.scrollWidth, scrollHeight: root.scrollHeight,
    clientWidth: root.clientWidth, clientHeight: root.clientHeight,
    innerWidth, innerHeight, scrollX, scrollY };
  return {
    signature: JSON.stringify([probe.mutations, dimensions, boxes, imageStates, fonts]),
    fonts: { ready: fontsReady && document.fonts.status === 'loaded', status: document.fonts.status, faces: fonts },
    images: imageStates, dimensions, sampledElements: Math.min(3000, elements.length),
    samplingTruncated: elements.length > 3000,
    environment: { devicePixelRatio, userAgent: navigator.userAgent,
      maxTouchPoints: navigator.maxTouchPoints, coarsePointer: matchMedia('(pointer: coarse)').matches,
      mobileMediaQuery: matchMedia('(max-width: 600px)').matches,
      visualViewport: window.visualViewport ? { width: visualViewport.width, height: visualViewport.height,
        scale: visualViewport.scale } : null,
      viewportMeta: document.querySelector('meta[name="viewport"]')?.content ?? null,
      language: document.documentElement.lang, title: document.title,
      bodyFont: document.body ? { family: getComputedStyle(document.body).fontFamily,
        weight: getComputedStyle(document.body).fontWeight } : null,
      focusedElement: document.activeElement?.tagName,
      frames: document.querySelectorAll('iframe').length }
  };
}

async function settle(page, pending, deadline, stableMs) {
  let signature = null, quietSince = Date.now(), observations = 0, last = null;
  while (Date.now() < deadline) {
    last = await page.evaluate(inspectPage);
    observations++;
    // Broken images are terminal for settling, but remain errors for readiness.
    const terminal = last.fonts.ready && last.images.every(i => i.complete && (i.decoded || i.decodeError));
    const next = last.signature + JSON.stringify([...pending.values()]);
    if (next !== signature || !terminal || pending.size) quietSince = Date.now();
    signature = next;
    if (terminal && !pending.size && Date.now() - quietSince >= stableMs)
      return { stable: true, observations, quietMs: Date.now() - quietSince, snapshot: last };
    await sleep(150);
  }
  return { stable: false, observations, quietMs: Date.now() - quietSince, snapshot: last };
}

async function lazyScroll(page, opt, deadline) {
  let bottomSamples = 0, previousHeight = -1;
  const positions = [];
  for (let i = 0; i < opt.maxScrollSteps && Date.now() < deadline; i++) {
    const state = await page.evaluate(() => {
      const root = document.scrollingElement;
      const step = Math.max(1, Math.floor(innerHeight * 0.75));
      // Explicit instant scroll overrides CSS smooth scrolling without changing page styles.
      window.scrollTo({ left: 0, top: Math.min(root.scrollHeight - innerHeight, scrollY + step), behavior: 'instant' });
      return { y: scrollY, height: root.scrollHeight, bottom: scrollY + innerHeight >= root.scrollHeight - 2 };
    });
    positions.push(state);
    bottomSamples = state.bottom && state.height === previousHeight ? bottomSamples + 1 : 0;
    previousHeight = state.height;
    if (bottomSamples >= 2) return { completed: true, positions };
    await sleep(150);
  }
  return { completed: false, positions, reason: Date.now() >= deadline ? 'preparation deadline' : 'max-scroll-steps' };
}

async function captureView(browser, name, opt) {
  const settings = { ...presets[name], reducedMotion: 'reduce', colorScheme: 'light', locale: 'en-US' };
  const record = { id: name, requestedURL: opt.url, settings, startedAt: new Date().toISOString(),
    status: 'captured', ready: false, errors: [], findings: [], artifacts: [] };
  const context = await browser.newContext(settings);
  const page = await context.newPage();
  page.setDefaultTimeout(Math.min(opt.timeoutMs, 10000));
  const pending = new Map();
  const errors = record.errors;
  let lastResourceAt = Date.now();
  const relevant = r => ['document', 'stylesheet', 'image', 'font', 'script'].includes(r.resourceType());
  page.on('request', r => { if (relevant(r)) { pending.set(r, r.url()); lastResourceAt = Date.now(); } });
  page.on('requestfinished', r => { pending.delete(r); if (relevant(r)) lastResourceAt = Date.now(); });
  page.on('requestfailed', r => {
    pending.delete(r);
    if (relevant(r)) {
      lastResourceAt = Date.now();
      errors.push(fault('ERROR', 'resource', r.failure()?.errorText || 'request failed', { url: r.url(), type: r.resourceType() }));
    }
  });
  page.on('response', r => {
    if (r.status() >= 400 && relevant(r.request())) errors.push(fault('ERROR', 'http', `HTTP ${r.status()}`,
      { url: r.url(), type: r.request().resourceType() }));
  });
  page.on('pageerror', error => errors.push(fault('ERROR', 'page', error.message)));
  record.consoleErrors = [];
  page.on('console', msg => { if (msg.type() === 'error') record.consoleErrors.push(msg.text()); });
  try {
    await page.addInitScript(installProbe);
    const deadline = Date.now() + opt.timeoutMs;
    const response = await page.goto(opt.url, { waitUntil: 'domcontentloaded', timeout: opt.timeoutMs });
    record.navigation = { finalURL: page.url(), status: response?.status() ?? null,
      redirected: page.url() !== opt.url };
    if (opt.readySelector) await page.locator(opt.readySelector).waitFor({ state: 'visible', timeout: Math.max(1, deadline - Date.now()) });
    record.scroll = await lazyScroll(page, opt, deadline);
    if (!record.scroll.completed) errors.push(fault('TIMEOUT', 'lazy-scroll', record.scroll.reason));
    await page.evaluate(() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' }));
    record.readiness = await settle(page, pending, deadline, opt.stableMs);
    if (!record.readiness.stable) errors.push(fault('TIMEOUT', 'stability', 'Resources/layout did not settle within preparation budget'));
    let snapshot = record.readiness.snapshot;
    // A settled page may have grown after the first pass; coverage must remain honest.
    const visitedHeight = record.scroll.positions.at(-1)?.height ?? 0;
    if (snapshot && snapshot.dimensions.scrollHeight > visitedHeight + 2) {
      record.scroll.followup = await lazyScroll(page, opt, deadline);
      if (!record.scroll.followup.completed) errors.push(fault('TIMEOUT', 'lazy-scroll', 'Late page growth exceeded scroll budget'));
      await page.evaluate(() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' }));
      record.readiness = await settle(page, pending, deadline, opt.stableMs);
      snapshot = record.readiness.snapshot;
      if (!record.readiness.stable) errors.push(fault('TIMEOUT', 'stability', 'Late growth did not settle'));
      if (snapshot && snapshot.dimensions.scrollHeight > (record.scroll.followup.positions.at(-1)?.height ?? 0) + 2)
        errors.push(fault('TIMEOUT', 'lazy-scroll', 'Page continues growing beyond bounded second pass'));
    }
    if (snapshot) {
      for (const img of snapshot.images) if (!img.decoded || !img.naturalWidth || !img.complete)
        errors.push(fault(img.complete ? 'ERROR' : 'TIMEOUT', 'image', img.decodeError || 'Image not loaded and decoded', { url: img.src }));
      for (const font of snapshot.fonts.faces) if (font.status === 'error') errors.push(fault('ERROR', 'font', 'FontFace failed', { font }));
      if (snapshot.samplingTruncated) errors.push(fault('ERROR', 'stability', 'Layout sampling limited to 3000 elements'));
      if (snapshot.dimensions.scrollWidth > snapshot.dimensions.clientWidth + 1)
        record.findings.push({ kind: 'horizontal-overflow', pixels: snapshot.dimensions.scrollWidth - snapshot.dimensions.clientWidth });
    }
    const before = await page.evaluate(inspectPage);
    const resourceEpoch = lastResourceAt;
    for (const fullPage of [false, true]) {
      const kind = fullPage ? 'fullpage' : 'viewport';
      try {
        const path = join(opt.out, `${name}-${kind}.png`);
        const buffer = await page.screenshot({ path, fullPage, type: 'png', scale: 'device',
          animations: 'disabled', caret: 'hide', timeout: Math.min(opt.timeoutMs, 10000) });
        record.artifacts.push({ kind, path, capturedAt: new Date().toISOString(),
          raster: { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) },
          scale: 'device', status: 'captured', reviewed: false });
      } catch (error) { errors.push(fault(error.name === 'TimeoutError' ? 'TIMEOUT' : 'ERROR', kind, error.message)); }
    }
    const after = await page.evaluate(inspectPage);
    if (before.signature !== after.signature || resourceEpoch !== lastResourceAt || pending.size)
      errors.push(fault('WRONG', 'capture-stability', 'Page/resources changed during screenshots; evidence is not a stable baseline'));
    record.postCapture = after;
    record.pendingResources = [...pending.values()];
    record.ready = !!record.readiness.stable && !errors.length && record.artifacts.length === 2;
    // Internal large signatures are not useful in the evidence manifest.
    if (record.readiness.snapshot) delete record.readiness.snapshot.signature;
    delete record.postCapture.signature;
  } catch (error) {
    errors.push(fault(error.name === 'TimeoutError' ? 'TIMEOUT' : 'ERROR', 'prepare', error.message));
    // Preserve viewport/fullpage failure evidence even when navigation/readiness failed.
    for (const fullPage of [false, true]) {
      const kind = fullPage ? 'fullpage' : 'viewport';
      if (record.artifacts.some(a => a.kind === kind)) continue;
      try {
        const path = join(opt.out, `${name}-${kind}.png`);
        const buffer = await page.screenshot({ path, fullPage, timeout: 3000, animations: 'disabled', scale: 'device', caret: 'hide' });
        record.artifacts.push({ kind, path, capturedAt: new Date().toISOString(), scale: 'device',
          raster: { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) }, status: 'captured', reviewed: false });
      } catch (failure) { errors.push(fault('ERROR', kind, failure.message)); }
    }
    record.pendingResources = [...pending.values()];
  } finally { await context.close(); }
  record.status = record.ready ? 'captured' : 'needs-fix';
  record.finishedAt = new Date().toISOString();
  return record;
}

export async function main() {
  let opt;
  try { opt = options(); } catch (error) { console.error(`${error.message}\n${help}`); return 2; }
  if (!opt) { console.log(help); return 0; }
  await mkdir(opt.out, { recursive: true });
  const manifest = { version: 1, requestedURL: opt.url, revision: opt.revision,
    startedAt: new Date().toISOString(), options: opt, ready: false, errors: [], records: [],
    policy: { motion: 'prefers-reduced-motion: reduce; screenshot animations: disabled; caret: hide',
      stability: 'DOM mutations, sampled element rectangles, font/image states and pending document/style/image/font/script requests',
      scrolling: '75% viewport steps, 150ms cadence, three equal bottom observations, at most two bounded passes; return to top',
      limits: ['Finite quiet window cannot prove absence of future timers or application hydration; use --ready-selector.',
        'Mobile is Chromium touch emulation with default browser UA, not a physical phone or branded device.',
        'FontFace status and fonts.ready do not prove glyph-level font selection.',
        'Image decoding covers main-document img elements, not CSS backgrounds, shadow DOM or frame contents.',
        'Nested scrollers, virtualised lists and iframe contents are not traversed.',
        'Animation suppression at screenshot time can finish finite animations; post-capture changes invalidate readiness.',
        'Video/canvas/JS motion and pixel-only paint changes are not guaranteed stable.',
        'Full-page captures can differ for sticky/fixed layers; viewport companion is retained.',
        'No user interactions, consent dismissal, masking, form submissions or page markup substitution.',
        'Artifacts are captured evidence, not independent visual approval.'] } };
  let browser;
  try {
    const { playwright, entry } = loadPlaywright(opt);
    manifest.playwrightModule = entry;
    manifest.executablePath = opt.executablePath ? resolve(opt.executablePath) : playwright.chromium.executablePath();
    browser = await launchChromium(playwright.chromium, {
      executablePath: manifest.executablePath,
    });
    manifest.browser = { name: 'chromium', version: browser.version() };
    for (const name of opt.mode === 'both' ? ['desktop', 'mobile'] : [opt.mode])
      manifest.records.push(await captureView(browser, name, opt));
    manifest.ready = manifest.records.every(r => r.ready);
  } catch (error) { manifest.errors.push(fault('ERROR', 'runner', error.message)); }
  finally {
    if (browser) await browser.close().catch(error => manifest.errors.push(fault('ERROR', 'close', error.message)));
    if (manifest.errors.length) manifest.ready = false;
    manifest.finishedAt = new Date().toISOString();
    await writeFile(join(opt.out, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
  }
  console.log(JSON.stringify({ ready: manifest.ready, manifest: join(opt.out, 'manifest.json') }));
  return manifest.ready ? 0 : 1;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href)
  process.exitCode = await main();
