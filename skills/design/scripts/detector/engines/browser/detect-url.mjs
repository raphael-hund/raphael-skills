import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { finding } from '../../findings.mjs';
import { filterByProviders } from '../../registry/antipatterns.mjs';
import { profileFindingsAsync, profileStep, profileStepAsync } from '../../profile/profiler.mjs';
import { captureVisualContrastCandidate } from '../visual/screenshot-contrast.mjs';

function serializeDesignSystemForBrowser(designSystem) {
  if (!designSystem?.present) return null;
  return {
    present: true,
    hasFonts: designSystem.hasFonts === true,
    allowedFonts: Array.from(designSystem.allowedFonts || []),
    hasColors: designSystem.hasColors === true,
    allowedColors: Array.from(designSystem.allowedColorKeys?.values?.() || [])
      .map(entry => entry?.color)
      .filter(color => color && Number.isFinite(color.r) && Number.isFinite(color.g) && Number.isFinite(color.b))
      .map(color => ({ r: color.r, g: color.g, b: color.b })),
    hasRadii: designSystem.hasRadii === true,
    allowedRadii: (designSystem.allowedRadii || [])
      .map(entry => Number(entry?.px))
      .filter(px => Number.isFinite(px)),
    hasPillRadius: designSystem.hasPillRadius === true,
  };
}

async function runVisualContrastFallback(page, serializedGroups, options, profile, target) {
  if (options?.visualContrast === false) return [];
  const maxCandidates = Number.isFinite(options?.visualContrastMaxCandidates)
    ? options.visualContrastMaxCandidates
    : 12;
  const scrollOffscreen = options?.visualContrastScrollOffscreen !== false;
  const existingLowContrastSelectors = new Set(
    serializedGroups
      .filter(group => group.findings?.some(f => f.type === 'low-contrast'))
      .map(group => group.selector)
      .filter(Boolean)
  );

  let browserAnalyses = [];
  const findings = [];
  if (options?.visualContrastBrowser !== false) {
    const browserFindings = await profileFindingsAsync(profile, {
      engine: 'browser',
      phase: 'visual-contrast',
      ruleId: 'browser-fallback',
      target,
    }, async () => {
      browserAnalyses = await page.evaluate(async ({ maxCandidates, scrollOffscreen }) => {
        if (typeof window.impeccableAnalyzeVisualContrast !== 'function') return [];
        return window.impeccableAnalyzeVisualContrast({ maxCandidates, scrollOffscreen });
      }, { maxCandidates, scrollOffscreen });
      return browserAnalyses
        .filter(result => result.finding && !existingLowContrastSelectors.has(result.selector))
        .map(result => result.finding);
    });
    findings.push(...browserFindings);
  }

  let candidates = browserAnalyses.length > 0 ? browserAnalyses : [];
  if (candidates.length === 0) {
    candidates = await profileStepAsync(profile, {
      engine: 'browser',
      phase: 'visual-contrast',
      ruleId: 'collect-candidates',
      target,
    }, () => page.evaluate(({ maxCandidates }) => {
      if (typeof window.impeccableCollectVisualContrastCandidates !== 'function') return [];
      return window.impeccableCollectVisualContrastCandidates({ maxCandidates });
    }, { maxCandidates }));
  }

  const viewport = options?.viewport || { width: 1280, height: 800 };
  const browserResolvedSelectors = new Set(
    browserAnalyses
      .filter(result => result.status === 'fail' || result.status === 'pass')
      .map(result => result.selector)
      .filter(Boolean)
  );
  const filtered = candidates.filter(candidate =>
    !existingLowContrastSelectors.has(candidate.selector) &&
    !browserResolvedSelectors.has(candidate.selector)
  );
  if (options?.visualContrastPixel === false) return findings;
  for (const candidate of filtered) {
    const result = await profileFindingsAsync(profile, {
      engine: 'browser',
      phase: 'visual-contrast',
      ruleId: 'pixel-diff',
      target,
    }, async () => {
      const finding = await captureVisualContrastCandidate(page, candidate, viewport);
      return finding ? [finding] : [];
    });
    findings.push(...result);
  }
  return findings;
}

// ---------------------------------------------------------------------------
// Puppeteer detection (for URLs)
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Browsertreiber: Puppeteer zuerst, Playwright als Rueckfall.
//
// Befund 30.07.2026: der Browser-Pfad verlangte hart `import('puppeteer')`. Auf
// diesem Rechner ist puppeteer nirgends installiert, playwright liegt in
// /usr/lib/node_modules — und der ganze uebrige Skill benutzt playwright. Damit
// war jede der rund 24 Regeln, die nur im gerenderten DOM messbar sind, ueber
// den offiziellen Weg unerreichbar. Die Eval umging das per Direktinjektion; das
// Werkzeug selbst blieb kaputt.
//
// Die Bindung ist duenn: `launch`, `setViewport` gegen `setViewportSize`,
// `waitUntil: networkidle0` gegen `networkidle`. `page.evaluate`, `newPage` und
// `page.close` sind in beiden gleich. Darum kein Umbau, sondern ein Adapter —
// vendorierter Code bleibt vendoriert.
//
// `require` statt `import`, weil ein global installiertes Paket nicht im
// Auflösungspfad dieser Datei liegt (derselbe Weg wie in
// web/scripts/web-clone/lib/playwright-loader.mjs).
async function ladeTreiber() {
  try {
    const pptr = await import('puppeteer');
    return { art: 'puppeteer', mod: pptr.default || pptr };
  } catch { /* weiter zu playwright */ }

  const { createRequire } = await import('node:module');
  for (const pfad of ['/usr/lib/node_modules/playwright', 'playwright']) {
    try {
      const req = createRequire('/usr/lib/node_modules/x.js');
      const pw = req(pfad);
      if (pw?.chromium) return { art: 'playwright', mod: pw };
    } catch { /* naechster Kandidat */ }
  }
  throw new Error(
    'Kein Browsertreiber gefunden. Erwartet wird puppeteer ODER playwright.\n'
    + 'Installiert: npm install puppeteer  —  oder playwright global verfuegbar machen.');
}

// Startet den Browser und gibt eine Seite mit einheitlicher Oberflaeche zurueck.
async function starteSeite(treiber, { launchArgs, viewport, url, waitUntil }) {
  if (treiber.art === 'puppeteer') {
    const browser = await treiber.mod.launch({ headless: true, args: launchArgs });
    const page = await browser.newPage();
    await page.setViewport(viewport);
    await page.goto(url, { waitUntil, timeout: 30000 });
    return { browser, page, eigen: true };
  }
  const browser = await treiber.mod.chromium.launch({ headless: true, args: launchArgs });
  const page = await browser.newPage({ viewport });
  // networkidle0/networkidle2 sind Puppeteer-Begriffe; Playwright kennt nur
  // 'networkidle'. Alles andere ('load', 'domcontentloaded') ist gleich.
  const pwWait = /^networkidle/.test(waitUntil) ? 'networkidle' : waitUntil;
  await page.goto(url, { waitUntil: pwWait, timeout: 30000 });
  return { browser, page, eigen: true };
}

async function detectUrl(url, options = {}) {
  const profile = options?.profile;
  const waitUntil = options?.waitUntil || 'networkidle0';
  const settleMs = Number.isFinite(options?.settleMs) ? options.settleMs : 0;
  const viewport = options?.viewport || { width: 1280, height: 800 };
  const externalBrowser = options?.browser || null;
  let treiber;
  if (!externalBrowser) {
    treiber = await profileStepAsync(profile, {
      engine: 'browser',
      phase: 'setup',
      ruleId: 'import-browsertreiber',
      target: url,
    }, () => ladeTreiber());
  }

  // Read the browser detection script — reuse it instead of reimplementing
  const browserScriptPath = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '..',
    '..',
    'detect-antipatterns-browser.js'
  );
  let browserScript;
  try {
    browserScript = profileStep(profile, {
      engine: 'browser',
      phase: 'setup',
      ruleId: 'read-browser-script',
      target: url,
    }, () => fs.readFileSync(browserScriptPath, 'utf-8'));
  } catch {
    throw new Error(`Browser script not found at ${browserScriptPath}`);
  }

  // CI runners (GitHub Actions Ubuntu) block unprivileged user namespaces, so
  // Chrome can't initialize its sandbox there. Disable the sandbox only when
  // running in CI; local users keep the default hardened launch.
  const launchArgs = process.env.CI ? ['--no-sandbox', '--disable-setuid-sandbox'] : [];
  let browser = externalBrowser;
  let page;
  if (externalBrowser) {
    page = await profileStepAsync(profile, {
      engine: 'browser', phase: 'load', ruleId: 'new-page', target: url,
    }, () => browser.newPage());
  }
  let results = [];
  try {
    if (!externalBrowser) {
      // Start, Viewport und Navigation in EINEM Schritt: die drei Aufrufe
      // unterscheiden sich zwischen den Treibern und werden im Adapter
      // uebersetzt (setViewport/setViewportSize, networkidle0/networkidle).
      const gestartet = await profileStepAsync(profile, {
        engine: 'browser', phase: 'load', ruleId: `launch+goto:${waitUntil}`, target: url,
      }, () => starteSeite(treiber, { launchArgs, viewport, url, waitUntil }));
      browser = gestartet.browser;
      page = gestartet.page;
    } else {
      await profileStepAsync(profile, {
        engine: 'browser', phase: 'load', ruleId: 'set-viewport', target: url,
      }, () => (page.setViewport ? page.setViewport(viewport) : page.setViewportSize(viewport)));
      await profileStepAsync(profile, {
        engine: 'browser', phase: 'load', ruleId: `goto:${waitUntil}`, target: url,
      }, () => page.goto(url, {
        waitUntil: page.setViewport ? waitUntil : (/^networkidle/.test(waitUntil) ? 'networkidle' : waitUntil),
        timeout: 30000,
      }));
    }
    if (settleMs > 0) {
      await profileStepAsync(profile, {
        engine: 'browser',
        phase: 'load',
        ruleId: 'settle',
        target: url,
      }, () => new Promise(resolve => setTimeout(resolve, settleMs)));
    }

    // Inject the browser detection script and collect results
    const browserDesignSystem = serializeDesignSystemForBrowser(options?.designSystem);
    await profileStepAsync(profile, {
      engine: 'browser',
      phase: 'scan',
      ruleId: 'configure-pure-detect',
      target: url,
    }, () => page.evaluate((designSystem) => {
      window.__IMPECCABLE_CONFIG__ = {
        ...(window.__IMPECCABLE_CONFIG__ || {}),
        autoScan: false,
        ...(designSystem ? { designSystem } : {}),
      };
    }, browserDesignSystem));
    await profileStepAsync(profile, {
      engine: 'browser',
      phase: 'scan',
      ruleId: 'inject-browser-script',
      target: url,
    }, () => page.evaluate(browserScript));
    let serializedGroups = [];
    results = await profileFindingsAsync(profile, {
      engine: 'browser',
      phase: 'scan',
      ruleId: 'browser-scan',
      target: url,
    }, async () => {
      serializedGroups = await page.evaluate(() => {
        if (!window.impeccableDetect) return [];
        return window.impeccableDetect({ decorate: false, serialize: true });
      });
      return serializedGroups.flatMap(({ findings }) =>
        findings.map(f => ({ id: f.type, snippet: f.detail, ignoreValue: f.ignoreValue || '' }))
      );
    });
    const visualFindings = await runVisualContrastFallback(page, serializedGroups, options, profile, url);
    results.push(...visualFindings);
  } finally {
    await profileStepAsync(profile, {
      engine: 'browser',
      phase: 'load',
      ruleId: 'close-page',
      target: url,
    }, () => page.close().catch(() => {}));
    if (!externalBrowser) {
      await profileStepAsync(profile, {
        engine: 'browser',
        phase: 'load',
        ruleId: 'close-browser',
        target: url,
      }, () => browser.close());
    }
  }
  return filterByProviders(results.map(f => {
    const item = finding(f.id, url, f.snippet);
    if (f.ignoreValue) item.ignoreValue = f.ignoreValue;
    return item;
  }), options.providers);
}

async function createBrowserDetector(options = {}) {
  const treiber = await ladeTreiber();
  const launchArgs = options.launchArgs || (process.env.CI ? ['--no-sandbox', '--disable-setuid-sandbox'] : []);
  const browser = options.browser || await (treiber.art === 'puppeteer'
    ? treiber.mod.launch({ headless: options.headless ?? true, args: launchArgs })
    : treiber.mod.chromium.launch({ headless: options.headless ?? true, args: launchArgs }));
  const ownsBrowser = !options.browser;
  const defaults = {
    waitUntil: options.waitUntil || 'load',
    settleMs: Number.isFinite(options.settleMs) ? options.settleMs : 100,
    viewport: options.viewport || { width: 1280, height: 800 },
  };
  return {
    browser,
    async detectUrl(url, scanOptions = {}) {
      return detectUrl(url, {
        ...defaults,
        ...scanOptions,
        browser,
      });
    },
    async close() {
      if (ownsBrowser) await browser.close().catch(() => {});
    },
  };
}

export { runVisualContrastFallback, detectUrl, createBrowserDetector };
