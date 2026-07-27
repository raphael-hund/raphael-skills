#!/usr/bin/env node
// axe-run.mjs — axe-core ueber Playwright statt ueber @axe-core/cli.
//
// Grund: @axe-core/cli braucht chromedriver, und der ist auf dieser Maschine
// eine Version voraus (chromedriver 151 vs Chrome 150) — der CLI-Weg stirbt
// mit "session not created". Playwright bringt seinen eigenen, passenden
// Browser mit und laeuft hier nachweislich.
//
//   node axe-run.mjs --url http://localhost:5280/ [--json]
//
// Exit 0 = keine Violations. Exit 1 = Violations gefunden. Exit 2 = Lauf kaputt.

import { chromium } from '/usr/lib/node_modules/playwright/index.mjs';
import fs from 'node:fs';

const args = process.argv.slice(2);
const get = (k, d) => { const i = args.indexOf(`--${k}`); return i >= 0 ? args[i + 1] : d; };
const URL_ = get('url', null);
const AS_JSON = args.includes('--json');

if (!URL_) { console.error('usage: axe-run.mjs --url <url> [--json]'); process.exit(2); }

// axe.min.js liegt nur als transitive Dependency vor — erste vorhandene nehmen.
const CANDIDATES = [
  '/usr/lib/node_modules/@axe-core/cli/node_modules/axe-core/axe.min.js',
  '/usr/lib/node_modules/pa11y-ci/node_modules/axe-core/axe.min.js',
  '/usr/lib/node_modules/lighthouse/node_modules/axe-core/axe.min.js',
];
const axePath = CANDIDATES.find((p) => fs.existsSync(p));
if (!axePath) { console.error('axe-core nicht gefunden'); process.exit(2); }

const browser = await chromium.launch({ headless: true, channel: 'chrome' });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const res = await page.goto(URL_, { waitUntil: 'networkidle', timeout: 45000 });
  if (!res || !res.ok()) { console.error(`Navigation fehlgeschlagen: ${URL_} -> ${res ? res.status() : 'kein Response'}`); process.exit(2); }
  await page.waitForTimeout(800);

  await page.addScriptTag({ path: axePath });
  const result = await page.evaluate(async () => {
    // wcag2a/wcag2aa/wcag21aa = der Umfang, den axe-cli und pa11y als Standard fahren.
    return await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'] } });
  });

  const violations = result.violations || [];
  if (AS_JSON) {
    console.log(JSON.stringify({ url: URL_, violations, passes: (result.passes || []).length }, null, 2));
  } else {
    console.log(`${URL_}: ${violations.length} Violation(s), ${(result.passes || []).length} Passes`);
    for (const v of violations) {
      console.log(`  [${v.impact || '?'}] ${v.id} — ${v.help} (${v.nodes.length}x)`);
      for (const n of v.nodes.slice(0, 3)) console.log(`      ${n.target.join(' ')}`);
    }
  }
  process.exit(violations.length ? 1 : 0);
} catch (e) {
  console.error(`axe-Lauf kaputt: ${e.message}`);
  process.exit(2);
} finally {
  await browser.close();
}
