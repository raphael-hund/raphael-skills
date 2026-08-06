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
const ROUTES = get('routes', '/').split(',').map((r) => r.trim())
  .map((r) => (r.startsWith('/') ? r : `/${r}`));
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
  page.setDefaultNavigationTimeout(45000);
  // Slug: '/' -> '__', fuehrenden Slash strippen — '/a/b' und '/a_b' kollidieren so nicht.
  const slug = route === '/' ? 'home'
    : route.replace(/^\/+/, '').replace(/\//g, '__').replace(/[^\w.-]+/g, '_');
  // Hängende RSC-Prefetches (Next.js <link prefetch> auf 404-Routen) blockieren
  // networkidle unendlich — diese Requests aborten, sonst timed der Sweep aus.
  await page.route('**/*_rsc=*', (route) => route.abort().catch(() => {}));
  try {
    const res = await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle' }).catch((e) => {
      console.log(`NAV-ERR ${route}: ${e.message}`);
      return null;
    });
    if (!res) {
      manifest.routes.push({ route, error: `navigation failed (${BASE}${route})`, shots: [] });
      return;
    }
    console.log(`${label} ${route} -> ${res.status()}`);
    await waitSettled(page);

    const entry = { route, status: res.status(), shots: [] };

    // SPA-Catch-Alls liefern oft 200 + NotFound-Seite: als ehrlichen Fehler markieren,
    // sonst sweepen wir lautlos eine 404-Huelse. Heuristik: <title> mit 404/not found,
    // sonst schlanker Fallback ueber Body-Text.
    // "404" nur standalone werten — UIDs wie CHE-404.305.274 sind kein NotFound.
    const notFoundRe = /(?<![\d.-])404(?![\d.-])|not found|nicht gefunden|page not found|seite nicht gefunden/i;
    let isNotFound = notFoundRe.test(await page.title());
    if (!isNotFound) {
      const bodyText = await page.evaluate(() => (document.body?.innerText || '').slice(0, 600));
      isNotFound = notFoundRe.test(bodyText);
    }
    if (res.ok() && isNotFound) {
      entry.error = 'not-found page served with HTTP 200 (SPA catch-all)';
      entry.shots = [];
      manifest.routes.push(entry);
      console.log(`WARN ${route}: NotFound-Seite (HTTP 200) -> als Fehler im Manifest`);
      return;
    }

    // 1) First Fold exakt 730 (bei Desktop) — eigener Shot, kein Zuschnitt.
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(350);
    const foldFile = `${slug}-${label}-00-fold.png`;
    await page.screenshot({ path: path.join(OUT, foldFile) });
    entry.shots.push({ file: foldFile, y: 0, kind: 'fold', viewport: vp, width: vp.width, height: vp.height });

    // 2) Hover-Shots (z.B. Header-Dropdowns) direkt nach dem Fold.
    for (let h = 0; h < HOVERS.length; h++) {
      const sel = HOVERS[h];
      const loc = page.locator(sel).first();
      if (await loc.count()) {
        await loc.hover().catch(() => {});
        await page.waitForTimeout(500);
        const hf = `${slug}-${label}-hover-${h}.png`;
        await page.screenshot({ path: path.join(OUT, hf) });
        entry.shots.push({ file: hf, y: 0, kind: 'hover', selector: sel, viewport: vp, width: vp.width, height: vp.height });
      }
    }

    // 3) Rest der Seite: Viewport 1400 hoch (Desktop), Schritt 50%, echte Scroll-Events.
    //    Maximal scrollbar ist docH - viewportHoehe — der Browser clamped hoehere Ziele
    //    (sonst doppelte Bottom-Shots). Nach jedem scrollTo das TATSÄCHLICHE scrollY
    //    auslesen und fuer Dateiname/Manifest verwenden.
    if (label === 'desktop') {
      await page.setViewportSize({ width: DEEP.width, height: DEEP.height });
      await page.waitForTimeout(250);
    }
    const activeVp = label === 'desktop' ? DEEP : vp;
    const docH = await page.evaluate(() => document.documentElement.scrollHeight);
    const vh = activeVp.height;
    const maxY = Math.max(0, docH - vh);
    const step = Math.round(vh * 0.5);
    let i = 1;
    let lastY = 0;
    const scrollShot = async (target) => {
      await page.evaluate((yy) => window.scrollTo({ top: yy, behavior: 'instant' }), target);
      await page.waitForTimeout(400);           // Reveal-Animationen zuende laufen lassen
      const realY = await page.evaluate(() => Math.round(window.scrollY));
      const f = `${slug}-${label}-${String(i).padStart(2, '0')}-y${realY}.png`;
      await page.screenshot({ path: path.join(OUT, f) });
      entry.shots.push({ file: f, y: realY, kind: 'scroll', viewport: activeVp, width: activeVp.width, height: activeVp.height });
      lastY = realY;
      i++;
    };
    for (let y = step; y < maxY; y += step) await scrollShot(y);
    if (maxY > 0 && lastY < maxY) await scrollShot(maxY);  // ein finaler Shot exakt am Bottom
    entry.docHeight = docH;
    manifest.routes.push(entry);
  } finally {
    await page.close();
  }
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
  const failed = manifest.routes.filter((r) => r.error);
  if (failed.length) {
    console.log(`WARN: ${failed.length} Route(s) mit Fehler im Manifest: ${failed.map((r) => r.route).join(', ')}`);
    process.exitCode = 1;
  }
})();
