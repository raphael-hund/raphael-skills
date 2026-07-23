#!/usr/bin/env node
// shot-sweep.mjs — Raphaels Screenshot-Standard (23.07.2026), deterministisch.
// First-Fold 1440x730, Rest 1440x1400, Scroll-Schritt 50%. NIEMALS fullPage/captureBeyondViewport
// (das sind die R20-Schein-Fund-Quellen: fixed Elemente + leere Reveal-Flaechen).
// Ausgabe: PNGs + manifest.json — das Manifest ist der Vertrag fuer Kritik-Agents.
import { chromium } from '/usr/lib/node_modules/playwright/index.mjs';
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const get = (k, d) => { const i = args.indexOf(`--${k}`); return i >= 0 ? args[i + 1] : d; };
const BASE = get('base', 'http://localhost:5280').replace(/\/$/, '');
const OUT = get('out', '/tmp/shot-sweep');
const ROUTES = get('routes', '/').split(',').map((r) => r.trim());
const MOBILE = args.includes('--mobile');
const HOVERS = args.filter((a, i) => args[i - 1] === '--hover');

const FOLD = { width: 1440, height: 730 };   // First Fold: exakt Raphaels 730
const DEEP = { width: 1440, height: 1400 };  // danach: 1400 hoch
const MOB = { width: 390, height: 844 };

const COOKIE_BUTTON = 'button:has-text("Okay"), button:has-text("Akzeptieren"), button:has-text("Alle akzeptieren")';

async function dismissCookie(page) {
  const btn = page.locator(COOKIE_BUTTON).first();
  if (await btn.count()) { try { await btn.click({ timeout: 900 }); } catch { /* nicht kritisch */ } }
}

async function waitSettled(page) {
  await page.waitForTimeout(1200);          // Hydration + erste Reveals
  await dismissCookie(page);
  await page.waitForTimeout(300);
}

async function sweepRoute(browser, route, vp, label, manifest) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
  const slug = route === '/' ? 'home' : route.replace(/\//g, '_').replace(/^_/, '');
  const res = await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle' }).catch((e) => {
    console.log(`NAV-ERR ${route}: ${e.message}`);
    return null;
  });
  if (!res) { await page.close(); return; }
  console.log(`${label} ${route} -> ${res.status()}`);
  await waitSettled(page);

  const entry = { route, status: res.status(), shots: [] };

  // 1) First Fold exakt 730 (bei Desktop) — eigener Shot, kein Zuschnitt.
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(350);
  const foldFile = `${slug}-00-fold.png`;
  await page.screenshot({ path: path.join(OUT, foldFile) });
  entry.shots.push({ file: foldFile, y: 0, kind: 'fold', viewport: vp, width: vp.width, height: vp.height });

  // 2) Hover-Shots (z.B. Header-Dropdowns) direkt nach dem Fold.
  for (let h = 0; h < HOVERS.length; h++) {
    const sel = HOVERS[h];
    const loc = page.locator(sel).first();
    if (await loc.count()) {
      await loc.hover().catch(() => {});
      await page.waitForTimeout(500);
      const hf = `${slug}-hover-${h}.png`;
      await page.screenshot({ path: path.join(OUT, hf) });
      entry.shots.push({ file: hf, y: 0, kind: 'hover', selector: sel, viewport: vp, width: vp.width, height: vp.height });
    }
  }

  // 3) Rest der Seite: Viewport 1400 hoch (Desktop), Schritt 50%, echte Scroll-Events.
  if (label === 'desktop') {
    await page.setViewportSize({ width: DEEP.width, height: DEEP.height });
    await page.waitForTimeout(250);
  }
  const activeVp = label === 'desktop' ? DEEP : vp;
  const docH = await page.evaluate(() => document.documentElement.scrollHeight);
  const step = Math.round((label === 'desktop' ? DEEP.height : vp.height) * 0.5);
  let i = 1;
  for (let y = step; y < docH; y += step) {
    await page.evaluate((yy) => window.scrollTo({ top: yy, behavior: 'instant' }), y);
    await page.waitForTimeout(400);           // Reveal-Animationen zuende laufen lassen
    const f = `${slug}-${String(i).padStart(2, '0')}-y${y}.png`;
    await page.screenshot({ path: path.join(OUT, f) });
    entry.shots.push({ file: f, y, kind: 'scroll', viewport: activeVp, width: activeVp.width, height: activeVp.height });
    i++;
  }
  entry.docHeight = docH;
  manifest.routes.push(entry);
  await page.close();
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });
  const manifest = { base: BASE, createdAt: new Date().toISOString(), viewports: { fold: FOLD, deep: DEEP, scrollStep: '50%' }, routes: [] };
  for (const r of ROUTES) await sweepRoute(browser, r, FOLD, 'desktop', manifest);
  if (MOBILE) for (const r of ROUTES) await sweepRoute(browser, r, MOB, 'mobile', manifest);
  fs.writeFileSync(path.join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2));
  console.log(`manifest: ${path.join(OUT, 'manifest.json')} (${manifest.routes.reduce((n, r) => n + r.shots.length, 0)} shots)`);
  await browser.close();
})();
