#!/usr/bin/env node
/**
 * run-shot-stable-check.mjs: sind die Sweep-Shots stabil?
 *
 *   node evals/run-shot-stable-check.mjs
 *
 * WARUM
 * Design wird nur an Screenshots entschieden. Bis 13.08.2026 rief shot()
 * Playwright ohne Stabilitaets-Optionen. Leere, zitternde oder falsch
 * grosse Shots kamen als Kritik-Material durch. Der bestehende
 * run-sweep-check prueft nur leere Manifeste und Exit-Codes, nicht Pixel.
 *
 * WAS DIESE EVAL PRUEFT
 * 1. Der ausgelieferte shot-sweep.mjs nutzt Playwright page.screenshot
 *    mit animations disabled, caret hide; fullPage/captureBeyondViewport
 *    sind nicht wahr. Fonts/Seite werden vor dem Shot gesetzt.
 * 2. Der echte Sweep startet zweimal gegen die lokale Fixture
 *    (evals/fixtures/shot-stable.html) mit --static --no-interact --base.
 *    Fold-PNG existiert, 1440x900, nicht leer, beide Laeufe matchen.
 *
 * Keine Nachimplementierung des Sweeps. Nur der ausgelieferte Einstieg.
 *
 * Exit 0 = Quelle und zwei Laeufe halten den Vertrag.
 * Exit 1 = Vertrag gerissen (App-Defekt).
 * Exit 2 = Playwright/Server nicht startbar. Nichts ueber Pixel gesagt.
 */
import { execFileSync, spawn, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';
import { altlastWeg, wegwerfen, wegwerfOrdner } from './lib/wegwerf.mjs';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const SWEEP = path.join(HIER, '..', 'scripts', 'shot-sweep.mjs');
const SKILL_MD = path.join(HIER, '..', 'SKILL.md');
const LOOP_MD = path.join(HIER, '..', 'references', 'screenshot-kritik-loop.md');
const FIXTURE = path.join(HIER, 'fixtures', 'shot-stable.html');
const PORT = Number(process.env.SHOT_STABLE_PORT || 5477);
const FRIST_MS = 180000;
// Dokumentierter winziger Pixel-Diff: 0,01 % der Fold-Pixel (1440x900 -> 129; Fold 900 seit Audit 23.08.2026).
const MAX_DIFF_RATIO = 0.0001;
const LAUNCH_FAIL_RE = /browserType\.launch|Executable doesn't exist|Failed to launch/i;

altlastWeg('shot-stable-', 6);

let fehler = 0;
let gezaehlt = 0;
const zeile = (ok, was, detail) => {
  gezaehlt += 1;
  if (!ok) fehler += 1;
  console.log(`  [${ok ? 'OK' : 'ROT'}]   ${was}`);
  if (!ok && detail) console.log(`         ${detail}`);
};

function pngInfo(buf) {
  if (buf.length < 24 || buf[0] !== 0x89 || buf.toString('ascii', 1, 4) !== 'PNG') {
    throw new Error('kein PNG');
  }
  return {
    width: buf.readUInt32BE(16),
    height: buf.readUInt32BE(20),
    bitDepth: buf[24],
    colorType: buf[25],
  };
}

function applyFilter(filter, row, prev, dst, bpp) {
  const n = row.length;
  for (let i = 0; i < n; i += 1) {
    const left = i >= bpp ? dst[i - bpp] : 0;
    const up = prev[i];
    const upLeft = i >= bpp ? prev[i - bpp] : 0;
    let pred = 0;
    if (filter === 1) pred = left;
    else if (filter === 2) pred = up;
    else if (filter === 3) pred = (left + up) >> 1;
    else if (filter === 4) {
      const p = left + up - upLeft;
      const pa = Math.abs(p - left);
      const pb = Math.abs(p - up);
      const pc = Math.abs(p - upLeft);
      pred = pa <= pb && pa <= pc ? left : pb <= pc ? up : upLeft;
    } else if (filter !== 0) {
      throw new Error(`unbekannter PNG-Filter ${filter}`);
    }
    dst[i] = (row[i] + pred) & 255;
  }
}

function pngPixels(buf) {
  const { width, height, bitDepth, colorType } = pngInfo(buf);
  if (bitDepth !== 8 || (colorType !== 2 && colorType !== 6)) {
    throw new Error(`PNG nicht 8bit RGB/RGBA (depth=${bitDepth} type=${colorType})`);
  }
  const bpp = colorType === 6 ? 4 : 3;
  const parts = [];
  let off = 8;
  while (off + 12 <= buf.length) {
    const len = buf.readUInt32BE(off);
    const type = buf.toString('ascii', off + 4, off + 8);
    if (type === 'IDAT') parts.push(buf.subarray(off + 8, off + 8 + len));
    if (type === 'IEND') break;
    off += 12 + len;
  }
  const raw = zlib.inflateSync(Buffer.concat(parts));
  const stride = width * bpp;
  const out = Buffer.alloc(height * stride);
  let src = 0;
  let prev = Buffer.alloc(stride);
  for (let y = 0; y < height; y += 1) {
    const filter = raw[src];
    src += 1;
    const row = raw.subarray(src, src + stride);
    src += stride;
    const dst = out.subarray(y * stride, (y + 1) * stride);
    applyFilter(filter, row, prev, dst, bpp);
    prev = Buffer.from(dst);
  }
  return { width, height, bpp, data: out };
}

function filledRatio(pix) {
  const { width, height, bpp, data } = pix;
  const n = width * height;
  const counts = new Map();
  for (let i = 0; i < n; i += 1) {
    const o = i * bpp;
    const key = (data[o] << 16) | (data[o + 1] << 8) | data[o + 2];
    counts.set(key, (counts.get(key) || 0) + 1);
  }
  let mode = 0;
  let modeN = 0;
  for (const [k, c] of counts) {
    if (c > modeN) { mode = k; modeN = c; }
  }
  const mr = (mode >> 16) & 255;
  const mg = (mode >> 8) & 255;
  const mb = mode & 255;
  let filled = 0;
  for (let i = 0; i < n; i += 1) {
    const o = i * bpp;
    if (Math.abs(data[o] - mr) > 12
      || Math.abs(data[o + 1] - mg) > 12
      || Math.abs(data[o + 2] - mb) > 12) filled += 1;
  }
  return filled / n;
}

function pixelDiffs(a, b) {
  if (a.width !== b.width || a.height !== b.height || a.bpp !== b.bpp) {
    return a.width * a.height;
  }
  const n = a.width * a.height;
  let diff = 0;
  for (let i = 0; i < n; i += 1) {
    const o = i * a.bpp;
    if (Math.abs(a.data[o] - b.data[o]) > 2
      || Math.abs(a.data[o + 1] - b.data[o + 1]) > 2
      || Math.abs(a.data[o + 2] - b.data[o + 2]) > 2) diff += 1;
  }
  return diff;
}

function copyEvidence(srcDir, destDir) {
  if (!destDir) return;
  fs.mkdirSync(destDir, { recursive: true });
  const fold = path.join(srcDir, 'home-desktop-00-fold.png');
  if (fs.existsSync(fold)) fs.copyFileSync(fold, path.join(destDir, 'home-desktop-00-fold.png'));
  const man = path.join(srcDir, 'manifest.json');
  if (fs.existsSync(man)) fs.copyFileSync(man, path.join(destDir, 'manifest.json'));
}

if (!fs.existsSync(SWEEP) || !fs.existsSync(FIXTURE)) {
  console.error('Sweep-Skript oder Fixture fehlt. Nicht geprueft.');
  process.exit(2);
}

const quelle = fs.readFileSync(SWEEP, 'utf8');
const skillText = `${fs.readFileSync(SKILL_MD, 'utf8')}\n${fs.readFileSync(LOOP_MD, 'utf8')}`;

console.log('Shot-Stable-Check: Quelle, dann zwei echte Sweep-Laeufe\n');
console.log('Quelle von shot-sweep.mjs:\n');

const shotAufrufe = quelle.match(/page\.screenshot\s*\(/g) || [];
const shotMitOpts = /page\.screenshot\s*\(\s*\{\s*path:\s*destPath,\s*\.\.\.SHOT_OPTS\s*\}\s*\)/.test(quelle);
zeile(/playwright/i.test(quelle), 'Playwright ist der Capture-Weg',
  'kein Playwright-Import im Sweep');
zeile(shotAufrufe.length === 1 && shotMitOpts,
  'genau ein page.screenshot, und der nutzt SHOT_OPTS',
  `${shotAufrufe.length} Aufrufe, SHOT_OPTS am Aufruf: ${shotMitOpts}`);
zeile(/animations:\s*['"]disabled['"]/.test(quelle) && /SHOT_OPTS/.test(quelle),
  "SHOT_OPTS setzt animations: 'disabled'");
zeile(/caret:\s*['"]hide['"]/.test(quelle) && /SHOT_OPTS/.test(quelle),
  "SHOT_OPTS setzt caret: 'hide'");
zeile(!/fullPage:\s*true/.test(quelle), 'fullPage ist nicht wahr');
zeile(!/captureBeyondViewport:\s*true/.test(quelle), 'captureBeyondViewport ist nicht wahr');
zeile(/document\.fonts/.test(quelle), 'Fonts vor dem Shot gesetzt');
zeile(/width:\s*1440,\s*height:\s*900/.test(quelle), 'Fold-Vertrag 1440x900');
zeile(/width:\s*1440,\s*height:\s*1500/.test(quelle), 'Deep-Vertrag 1440x1500');
zeile(/SCROLL_STEP\s*=\s*750/.test(quelle), 'Scroll-Schritt 750 px');
zeile(/--base/.test(quelle) && /process\.exit\(2\)/.test(quelle),
  '--base Pflicht endet mit Exit 2');
zeile(/capture_profile/.test(quelle)
  && /static:\s*STATIC/.test(quelle)
  && /states:\s*STATES/.test(quelle)
  && /mobile:\s*MOBILE/.test(quelle),
  'capture_profile spiegelt --static/--states/--mobile ehrlich');
zeile(/web\/shot-sweep\/v2/.test(quelle), 'Manifest-Schema web/shot-sweep/v2');
zeile(/run_id/.test(quelle) && /build_revision/.test(quelle),
  'Manifest traegt run_id und build_revision');
zeile(/state-focus/.test(quelle) && /open-expanded/.test(quelle),
  'States-Pass kennt focus und open-expanded, nicht nur Hover');
zeile(/page\.route\s*\(/.test(quelle) && /fulfill/.test(quelle),
  'Loading via Intercept-Hold (page.route + fulfill)');
zeile(/state_matrix/.test(quelle)
  && /not_applicable/.test(quelle)
  && /static-page/.test(quelle)
  && /no-form/.test(quelle)
  && /no-async-data/.test(quelle),
  'state_matrix mit validatorgeprueften not_applicable-Gruenden');
zeile(/playwright_ref/.test(quelle) && /keyboard/.test(quelle) && /axe/.test(quelle),
  'State-Receipts: Keyboard/Axe oder validierte Playwright-Ref');
zeile(/nur Hover/.test(quelle),
  '--states nur Hover ist FAIL (Quelle nennt den Fall)');
zeile(/Playwright/.test(skillText)
  && /stabile Screenshots/i.test(skillText)
  && /Screenshots testen/i.test(skillText),
  'Skill-Text verlangt testen + Playwright + stabile Screenshots');
zeile(!/raphael-chrome/.test(skillText.split('Screenshot-Pflicht')[1] || skillText)
  || /kein Ersatz|kein .*raphael-chrome|nicht .*raphael-chrome/i.test(skillText),
  'raphael-chrome ist kein Standard-Sweep');

const SEITE = wegwerfOrdner('shot-stable-seite-');
fs.copyFileSync(FIXTURE, path.join(SEITE, 'index.html'));
const kennung = `probe-${process.pid}.txt`;
fs.writeFileSync(path.join(SEITE, kennung), 'shot-stable');

const belegt = spawnSync('curl', ['-s', '-o', '/dev/null', '-m', 2,
  '-w', '%{http_code}', `http://127.0.0.1:${PORT}/`], { encoding: 'utf8' });
if (belegt.stdout && belegt.stdout.trim() !== '000') {
  wegwerfen(SEITE);
  console.error(`\nPort ${PORT} ist fremdbelegt. Nicht geprueft.`);
  console.error('SHOT_STABLE_PORT setzen. Ohne eigenen Server laeuft der Test gegen eine fremde Seite.');
  process.exit(2);
}

const serverLog = path.join(SEITE, 'server.log');
const server = spawn('python3', ['-m', 'http.server', String(PORT), '--bind', '127.0.0.1'],
  { cwd: SEITE, stdio: ['ignore', 'ignore', fs.openSync(serverLog, 'w')] });

let bereit = false;
for (let i = 0; i < 50 && !bereit; i += 1) {
  const q = spawnSync('curl', ['-fsS', '-m', 2,
    `http://127.0.0.1:${PORT}/${kennung}`], { encoding: 'utf8' });
  if (q.status === 0 && (q.stdout || '').trim() === 'shot-stable') bereit = true;
  else spawnSync('sleep', ['0.2']);
}
if (!bereit) {
  server.kill('SIGKILL');
  let log = '';
  try { log = fs.readFileSync(serverLog, 'utf8').trim(); } catch { /* kein Log */ }
  wegwerfen(SEITE);
  console.error(`\nKein Testserver auf Port ${PORT}. Nicht geprueft.`);
  if (log) console.error(log.split('\n').slice(-4).join('\n'));
  process.exit(2);
}

function laufSweep(label) {
  const out = wegwerfOrdner(`shot-stable-${label}-`);
  let code = 0;
  let text = '';
  try {
    text = execFileSync('node', [
      SWEEP,
      '--base', `http://127.0.0.1:${PORT}`,
      '--out', out,
      '--routes', '/',
      '--static',
      '--no-interact',
    ], { encoding: 'utf8', timeout: FRIST_MS, maxBuffer: 8 * 1024 * 1024 });
  } catch (e) {
    code = e.status ?? 1;
    text = `${e.stdout || ''}${e.stderr || ''}${e.message || ''}`;
    if (e.error && e.error.code === 'ETIMEDOUT') {
      text += '\nbrowserType.launch: ETIMEDOUT';
      code = 2;
    }
  }
  return { out, code, text };
}

console.log('\nZwei echte Sweep-Laeufe gegen die Fixture (--static --no-interact --base):\n');

const a = laufSweep('a');
if (LAUNCH_FAIL_RE.test(a.text) || a.code === 2) {
  server.kill('SIGKILL');
  console.error('Playwright startet nicht. Pixel nicht gemessen.');
  console.error(a.text.trim().split('\n').slice(-8).join('\n'));
  wegwerfen(SEITE);
  process.exit(2);
}

zeile(a.code === 0, 'Sweep A endet mit Exit 0', `Exit ${a.code}`);

const foldA = path.join(a.out, 'home-desktop-00-fold.png');
zeile(fs.existsSync(foldA), 'Fold-PNG A existiert', foldA);

let pixA = null;
if (fs.existsSync(foldA)) {
  const bufA = fs.readFileSync(foldA);
  let infoA;
  try { infoA = pngInfo(bufA); } catch (e) { infoA = { error: e.message }; }
  zeile(infoA.width === 1440 && infoA.height === 900,
    'Fold A ist 1440x900',
    infoA.error || `${infoA.width}x${infoA.height}`);
  try {
    pixA = pngPixels(bufA);
    const fill = filledRatio(pixA);
    zeile(fill >= 0.08, 'Fold A ist nicht leer/fast-leer',
      `Fuellgrad ${(fill * 100).toFixed(1)} % (Mode-Abstand)`);
  } catch (e) {
    zeile(false, 'Fold A ist nicht leer/fast-leer', e.message);
  }
} else {
  zeile(false, 'Fold A ist 1440x900', 'keine Datei');
  zeile(false, 'Fold A ist nicht leer/fast-leer', 'keine Datei');
}

const b = laufSweep('b');
if (LAUNCH_FAIL_RE.test(b.text)) {
  server.kill('SIGKILL');
  console.error('Playwright startet beim zweiten Lauf nicht. Pixel nicht gemessen.');
  console.error(b.text.trim().split('\n').slice(-8).join('\n'));
  wegwerfen(SEITE);
  process.exit(2);
}

zeile(b.code === 0, 'Sweep B endet mit Exit 0', `Exit ${b.code}`);

const foldB = path.join(b.out, 'home-desktop-00-fold.png');
zeile(fs.existsSync(foldB), 'Fold-PNG B existiert', foldB);

if (fs.existsSync(foldA) && fs.existsSync(foldB)) {
  const bufA = fs.readFileSync(foldA);
  const bufB = fs.readFileSync(foldB);
  if (bufA.equals(bufB)) {
    zeile(true, 'Lauf A und Lauf B matchen (identische Bytes)');
  } else {
    try {
      const pixB = pngPixels(bufB);
      const diffs = pixA ? pixelDiffs(pixA, pixB) : pixB.width * pixB.height;
      const ratio = diffs / (1440 * 900);
      zeile(ratio <= MAX_DIFF_RATIO,
        `Lauf A und Lauf B matchen (Pixel-Diff ${diffs}, ${(ratio * 100).toFixed(4)} %, Limit ${MAX_DIFF_RATIO * 100} %)`,
        'Inkonsistenz zwischen den zwei Laeufen ist ein App-Defekt');
    } catch (e) {
      zeile(false, 'Lauf A und Lauf B matchen', e.message);
    }
  }
} else {
  zeile(false, 'Lauf A und Lauf B matchen', 'Fold fehlt');
}

const evidence = process.env.SHOT_STABLE_EVIDENCE;
if (evidence) {
  copyEvidence(a.out, path.join(evidence, 'run-a'));
  copyEvidence(b.out, path.join(evidence, 'run-b'));
  fs.writeFileSync(path.join(evidence, 'sweep-a.log'), a.text);
  fs.writeFileSync(path.join(evidence, 'sweep-b.log'), b.text);
}

server.kill('SIGKILL');
wegwerfen(SEITE);

console.log(`\n${gezaehlt - fehler}/${gezaehlt} wie erwartet.`);
if (fehler) {
  console.log('Sweep-Shots halten den Stabilitaets-Vertrag nicht.');
  process.exit(1);
}
console.log('Quelle und zwei Sweep-Laeufe halten den Vertrag.');
