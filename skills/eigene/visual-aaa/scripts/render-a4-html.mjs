#!/usr/bin/env node
// render-a4-html.mjs — Chrome headless screenshot of A4 HTML pages (794x1123 CSS px)
// Usage:
//   node render-a4-html.mjs --dir ./seiten --out ./export/v15/render --pattern '*.html'
import { chromium } from '/usr/lib/node_modules/playwright/index.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const args = process.argv.slice(2);
const get = (k, d) => {
  const i = args.indexOf(`--${k}`);
  return i >= 0 ? args[i + 1] : d;
};

const DIR = get('dir', null);
const OUT = get('out', null);
const PATTERN = get('pattern', '*.html');
const SCALE = Number(get('scale', '1.25')); // deviceScaleFactor for sharper PNG

if (!DIR || !OUT) {
  console.error(`Usage: node render-a4-html.mjs --dir <seiten> --out <render-dir> [--pattern '*.html']`);
  process.exit(2);
}

fs.mkdirSync(OUT, { recursive: true });

function matchPattern(name, pattern) {
  // tiny glob: only supports prefix/suffix * and exact
  if (pattern === '*.html') return name.endsWith('.html') && !name.startsWith('_');
  if (pattern.startsWith('*') && pattern.endsWith('*')) {
    return name.includes(pattern.slice(1, -1));
  }
  if (pattern.startsWith('*')) return name.endsWith(pattern.slice(1));
  if (pattern.endsWith('*')) return name.startsWith(pattern.slice(0, -1));
  return name === pattern;
}

const files = fs
  .readdirSync(DIR)
  .filter((f) => matchPattern(f, PATTERN))
  .sort();

if (!files.length) {
  console.error(`No files matching ${PATTERN} in ${DIR}`);
  process.exit(2);
}

const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || '/usr/bin/google-chrome-stable',
  headless: true,
  args: ['--no-sandbox', '--disable-gpu'],
});

const manifest = { pages: [], scale: SCALE, viewport: { width: 794, height: 1123 } };

try {
  for (const file of files) {
    const abs = path.resolve(DIR, file);
    const url = pathToFileURL(abs).href;
    const id = path.basename(file, path.extname(file));
    const outPng = path.join(OUT, `${id}.png`);

    const page = await browser.newPage({
      viewport: { width: 794, height: 1123 },
      deviceScaleFactor: SCALE,
    });
    page.setDefaultTimeout(45000);
    await page.goto(url, { waitUntil: 'networkidle' }).catch(async () => {
      await page.goto(url, { waitUntil: 'load' });
    });
    // wait for fonts/images
    await page.waitForTimeout(400);
    await page.evaluate(async () => {
      if (document.fonts?.ready) await document.fonts.ready;
      const imgs = [...document.images];
      await Promise.all(
        imgs.map((img) =>
          img.complete
            ? Promise.resolve()
            : new Promise((res) => {
                img.onload = img.onerror = () => res();
              })
        )
      );
    });
    // clip to .page if present, else full viewport
    const clip = await page.evaluate(() => {
      const el = document.querySelector('.page');
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return {
        x: Math.max(0, Math.floor(r.x)),
        y: Math.max(0, Math.floor(r.y)),
        width: Math.ceil(r.width),
        height: Math.ceil(r.height),
      };
    });
    await page.screenshot({
      path: outPng,
      clip: clip || { x: 0, y: 0, width: 794, height: 1123 },
      type: 'png',
    });
    await page.close();
    const st = fs.statSync(outPng);
    console.log(`OK ${id} -> ${outPng} (${st.size} bytes)`);
    manifest.pages.push({ id, source: abs, render: outPng, bytes: st.size });
  }
} finally {
  await browser.close();
}

fs.writeFileSync(path.join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
console.log(`Rendered ${manifest.pages.length} page(s) -> ${OUT}`);
