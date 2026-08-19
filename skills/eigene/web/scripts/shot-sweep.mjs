#!/usr/bin/env node
// shot-sweep.mjs — Raphaels Screenshot-Standard (Rev. 10.08.2026), deterministisch.
//
// Spec (Raphael, 10.08.2026):
//   1. Desktop zuerst. Pro Seite ALLES nacheinander (sequentiell, eine Page-Instanz).
//   2. Hero/First-Fold: Viewport 1440x730. Danach Viewport 1440x1500.
//   3. Scroll-Schritt exakt 750 px (halber 1500er-Viewport), Shot nach jedem Schritt,
//      bis die ganze Seite abgedeckt ist. NIE fullPage/captureBeyondViewport.
//   4. Interaktiv-Pass: Header-Nav hovern (Shot je Hover), und alles Klickbare klicken
//      (Buttons, Accordions, Tabs, aria-expanded) mit Shot. Links (a[href]) nur hovern —
//      Navigation ist durch den Routen-Sweep abgedeckt.
//   5. --static: Animationen hart aus (reduced-motion + CSS-Kill + data-reveal sichtbar).
//      Standard fuer Kritik-Sweeps, damit keine leeren Reveal-Flaechen entstehen.
//   6. Jeder Shot ueber Playwright page.screenshot: animations disabled,
//      caret hide, Fonts/Seite gesetzt. Nie fullPage/captureBeyondViewport.
//
// Ausgabe: PNGs + manifest.json — das Manifest ist der Vertrag fuer Kritik-Agents.
// Playwright erst NACH der Flag-Wache laden (dynamischer import unten): ein
// statischer import laeuft immer zuerst und kostet 12-36s, nur um danach ein
// falsch getipptes Flag abzulehnen (Befund 03.08.2026, siehe axe-run.mjs).
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const get = (k, d) => { const i = args.indexOf(`--${k}`); return i >= 0 ? args[i + 1] : d; };
// --base ist PFLICHT (kein stiller Default). Historischer Default 5280 erzeugte
// leere Shots bei Anfaengern — siehe anfaenger-pfad.md §2 + SKILL Gotchas.
const baseRaw = get('base', null);
if (!baseRaw) {
  console.error(`shot-sweep: --base <url> ist Pflicht (z. B. --base http://127.0.0.1:3000).
Beispiel:
  node /root/raphael-skills/skills/eigene/web/scripts/shot-sweep.mjs \\
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

const FOLD = { width: 1440, height: 730 };   // Hero/First Fold: exakt 730
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
  entry.shots.push({ file, viewport: vp, width: vp.width, height: vp.height, ...meta });
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

    const entry = { route, status: res.status(), static: STATIC, shots: [] };

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
  const manifest = {
    base: BASE, createdAt: new Date().toISOString(), static: STATIC,
    viewports: { fold: FOLD, deep: DEEP, scrollStepPx: SCROLL_STEP }, routes: [],
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
  if (MOBILE && browser) await sweepAll(ROUTES, MOB, 'mobile');
  writeManifest();
  console.log(`manifest: ${manifestPath} (${manifest.routes.reduce((n, r) => n + r.shots.length, 0)} shots)`);
  await browser?.close().catch(() => {});
  const failed = manifest.routes.filter((r) => r.error && !(ALLOW_404 && r.shots.length));
  if (failed.length) {
    console.log(`WARN: ${failed.length} Route(s) mit Fehler im Manifest: ${failed.map((r) => r.route).join(', ')}`);
    process.exitCode = 1;
  }
})();
