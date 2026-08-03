#!/usr/bin/env node
// shot-sweep.mjs — Raphaels Screenshot-Standard (23.07.2026), deterministisch.
//
//   node shot-sweep.mjs --url <basis-url> --routes /,/preise --out <ordner> [--mobile] [--hover]
//
// First-Fold 1440x730, Rest 1440x1400, Scroll-Schritt 50%. NIEMALS fullPage/captureBeyondViewport
// (das sind die R20-Schein-Fund-Quellen: fixed Elemente + leere Reveal-Flaechen).
// Ausgabe: PNGs + manifest.json — das Manifest ist der Vertrag fuer Kritik-Agents.
// Playwright erst NACH der Flag-Wache laden (dynamischer import unten): ein
// statischer import laeuft immer zuerst und kostet 12-36s, nur um danach ein
// falsch getipptes Flag abzulehnen (Befund 03.08.2026, siehe axe-run.mjs).
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const get = (k, d) => { const i = args.indexOf(`--${k}`); return i >= 0 ? args[i + 1] : d; };

// Ein vertipptes oder fremdes Flag darf nicht still auf den Default fallen —
// sonst fotografiert dieses Skript klaglos eine ANDERE Seite und liefert dafuer
// ein volles Manifest. Dasselbe Schutzmuster hat g1-gate.mjs; hier fehlte es.
//
// Gemessen am 30.07.2026: `--url http://localhost:59999/` ergab "navigating to
// http://localhost:5280/" — das Flag hiess nur `--base`, `--url` fiel still auf
// den Default zurueck. Von den vier Pruefern mit URL-Argument nehmen drei
// (axe-run, craft-check, formular-check) `--url`; nur dieses Skript wich ab.
// Wer die gewohnte Schreibweise benutzt, misst dann die falsche Seite und
// bekommt Screenshots, die echt aussehen.
const ERLAUBT = ['base', 'url', 'out', 'routes', 'mobile', 'hover'];

// --help gehoert dazu und ist KEIN unbekanntes Flag. Bis zum 31.07.2026
// antwortete dieses Skript darauf mit "Unbekanntes Flag: --help" und Exit 2 —
// also mit einem Fehler auf die uebliche Frage nach der Bedienung. Der
// Hilfe-Waechter sah es nicht, weil er nur Skripte mit einer Aufrufzeile im
// Kopf prueft, und die fehlte hier ebenfalls. Beides jetzt da.
const HILFE = 'Aufruf: node shot-sweep.mjs --url <basis-url> --routes /,/preise'
  + ' --out <ordner> [--mobile] [--hover]';
if (args.includes('--help')) {
  console.log(HILFE);
  console.log(`Erlaubt: ${ERLAUBT.map((k) => `--${k}`).join(' ')}`);
  process.exit(0);
}

const fremd = args.filter((a) => a.startsWith('--') && !ERLAUBT.includes(a.slice(2)) && a !== '--help');
if (fremd.length) {
  console.error(`Unbekanntes Flag: ${fremd.join(', ')}`);
  console.error(`Erlaubt: ${ERLAUBT.map((k) => `--${k}`).join(' ')}`);
  process.exit(2);
}

// `--url` ist der Name, den die Doktrin und die anderen Pruefer benutzen;
// `--base` bleibt als bisherige Schreibweise gueltig (das Tor ruft so auf).
const BASE = get('base', get('url', 'http://localhost:5280')).replace(/\/$/, '');
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
    let isNotFound = /\b(404|not found|nicht gefunden)\b/i.test(await page.title());
    if (!isNotFound) {
      const bodyText = await page.evaluate(() => (document.body?.innerText || '').slice(0, 600));
      isNotFound = /\b(404|page not found|seite nicht gefunden)\b/i.test(bodyText);
    }
    if (res.ok() && isNotFound) {
      entry.error = 'not-found page served with HTTP 200 (SPA catch-all)';
      entry.shots = [];
      manifest.routes.push(entry);
      console.log(`WARN ${route}: NotFound-Seite (HTTP 200) -> als Fehler im Manifest`);
      return;
    }

    // Ein Fehlerstatus wurde bisher nur ins Log geschrieben und dann normal
    // durchgesweept: 500er landeten als huebsche PNGs im Manifest, das Gate sah
    // "Shots vorhanden, keine Fehler" und meldete gruen.
    if (!res.ok()) {
      entry.error = `HTTP ${res.status()}`;
      entry.shots = [];
      manifest.routes.push(entry);
      console.log(`FEHLER ${route}: HTTP ${res.status()} -> kein Sweep`);
      return;
    }

    // Weisse Seite. Liefert der Server 200 und die App hydratisiert nicht, sind
    // die Screenshots leer — und ein leeres Bild besteht jede Pruefung, weil
    // niemand hineinschaut. Zwei Zeilen Text sind die Untergrenze fuer "geladen".
    const inhalt = await page.evaluate(() => ({
      text: (document.body?.innerText || '').trim().length,
      knoten: document.body ? document.body.querySelectorAll('*').length : 0,
    }));
    if (inhalt.text < 40 || inhalt.knoten < 10) {
      entry.error = `leere Seite (${inhalt.text} Zeichen Text, ${inhalt.knoten} Elemente) — nicht gerendert?`;
      entry.shots = [];
      manifest.routes.push(entry);
      console.log(`FEHLER ${route}: ${entry.error}`);
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
  const { chromium } = await import('/usr/lib/node_modules/playwright/index.mjs');
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
