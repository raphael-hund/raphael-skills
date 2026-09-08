#!/usr/bin/env node
/*
  motion-check.mjs — spricht das Projekt EINE Motion-Sprache?

    node motion-check.mjs <projektordner> [--json]

  WARUM ES DIESEN PRUEFER GIBT (Befund 29.07.2026)
  Die Motion-Doktrin entscheidet den Kurven-Konflikt in Prosa: vendorierte
  Komponenten behalten [0.16, 1, 0.3, 1], neuer eigener Code nimmt
  cubic-bezier(0.23, 1, 0.32, 1), und "beides im selben Projekt -> eine waehlen".
  Der letzte Satz ist der wichtige, und genau er war eine Bitte. Nichts hat je
  nachgesehen, ob ein Projekt ihn befolgt.

  Nachgemessen in der eigenen Komponentenbibliothek: drei verschiedene
  Ease-Out-Kurven im Bestand, nicht zwei. Die dritte — cubic-bezier(0.4, 0, 0.2, 1),
  der Material-Default — stand in theme-toggle.tsx und in keiner Doktrin-Zeile.
  Niemand hatte sie entschieden; sie war einfach da.

  Das ist der typische Motion-Fehler: nicht eine falsche Kurve, sondern drei
  richtige nebeneinander. Einzeln ist jede verteidigbar, zusammen ergeben sie
  keine Sprache. Ein Auge sieht das erst, wenn zwei Elemente nebeneinander
  laufen — ein Zaehler sieht es sofort.

  WAS ER PRUEFT
    1. KURVEN-VIELFALT  Wie viele verschiedene Ease-Kurven kommen vor?
                        Mehr als eine pro Rolle (out / in-out / drawer) = Befund.
    2. NACKTE DEFAULTS  `ease`, `ease-in`, `ease-out`, `linear` in transition/
                        animation — die Doktrin nennt sie ausdruecklich zu schwach.
    3. REDUCED MOTION   Gibt es Animation ohne @media (prefers-reduced-motion)?
                        In der Doktrin Pflicht, nicht Empfehlung.

  WAS ER NICHT PRUEFT
    Ob eine Bewegung ueberhaupt sein sollte (Frequenz-Gate), ob die Dauer zur
    Distanz passt, ob sie unterbrechbar ist. Das steht in der Doktrin und
    braucht Augen. Dieser Pruefer zaehlt nur, was zaehlbar ist.

  Standard: QUELLTEXT-Teilcheck. --url + --selector pruefen zusaetzlich beim
  Laden beobachtete Bewegung unter normaler und reduzierter Bewegung.
  Eingabe-abhaengige Bewegung prueft der passende Projekt-Browsertest.

    node motion-check.mjs <projektordner> [--json]

  Exit 0 = keine Blocker. Exit 1 = Blocker. Exit 2 = Aufruf kaputt.
*/
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);

// Ein unbekanntes Flag ist ein Aufruffehler und muss SO heissen. Bis zum
// 31.07.2026 druckte dieses Skript darauf nur seine Aufrufzeile — die Meldung
// las sich wie "Argument fehlt", und wer sich vertippt hat, sucht am falschen
// Ende. Exit 2 war schon richtig, der Text nicht.
const FLAG_ERLAUBT = ['json', 'help', 'url', 'selector'];
{
  const fremd = args.filter((a) => a.startsWith('--') && !FLAG_ERLAUBT.includes(a.slice(2)));
  if (fremd.length) {
    console.error(`Unbekanntes Flag: ${fremd.join(', ')}`);
    console.error(`Erlaubt: ${FLAG_ERLAUBT.map((k) => `--${k}`).join(' ')}`);
    process.exit(2);
  }
}
const alsJson = args.includes('--json');
const wurzel = args.find((a, i) => !a.startsWith('--') && !['--url', '--selector'].includes(args[i - 1]));
const get = (key) => { const i = args.indexOf(`--${key}`); return i < 0 ? null : args[i + 1]; };
const runtimeUrl = get('url');
const runtimeSelector = get('selector');

// --help ist kein Fehlerfall. Beide Faelle drucken dieselbe Zeile, aber sie
// bedeuten Verschiedenes: wer --help tippt, hat bekommen was er wollte
// (Exit 0, Hilfe auf stdout); wer den Ordner vergisst, hat einen Fehler
// (Exit 2, Meldung auf stderr). Bis zum 31.07.2026 endeten beide mit Exit 2 —
// in einer Kette liest das jedes Skript als "Pruefer kaputt".
const hilfe = 'Aufruf: node motion-check.mjs <projektordner> [--json] [--url <url> --selector <betroffenes-element>]';
if (args.includes('--help')) {
  console.log(hilfe);
  process.exit(0);
}
if (!wurzel) {
  console.error(hilfe);
  process.exit(2);
}
if (!fs.existsSync(wurzel) || !fs.statSync(wurzel).isDirectory()) {
  console.error(`Kein Ordner: ${wurzel}`);
  process.exit(2);
}
if (!!runtimeUrl !== !!runtimeSelector || [runtimeUrl, runtimeSelector].some(value => value?.startsWith('--'))) {
  console.error('Runtime-Pruefung braucht --url und --selector zusammen.');
  process.exit(2);
}

const UEBERSPRINGEN = new Set([
  'node_modules', '.git', 'dist', 'build', 'out', '.next', '.astro',
  '.output', '.svelte-kit', '.nuxt', 'coverage', '.cache', '.vercel', '.turbo',
]);
const ENDUNGEN = new Set([
  '.css', '.scss', '.sass', '.less',
  '.tsx', '.jsx', '.ts', '.js', '.mjs', '.cjs',
  '.vue', '.svelte', '.astro', '.html',
]);

// Dateien, die nicht geoeffnet werden konnten — sie zaehlen mit, sind aber
// ungeprueft. Muss VOR der Sammelstelle stehen: const wird nicht hochgezogen
// (ReferenceError, zum zweiten Mal in dieser Session).
const nichtLesbar = [];

function dateien(unter) {
  const raus = [];
  for (const e of fs.readdirSync(unter, { withFileTypes: true })) {
    if (e.name.startsWith('.') && e.name !== '.') continue;
    if (UEBERSPRINGEN.has(e.name)) continue;
    const p = path.join(unter, e.name);
    if (e.isDirectory()) raus.push(...dateien(p));
    else if (ENDUNGEN.has(path.extname(e.name))) raus.push(p);
  }
  return raus;
}

// --- Sammeln ---------------------------------------------------------------
const KURVE = /cubic-bezier\(\s*([\d.-]+)\s*,\s*([\d.-]+)\s*,\s*([\d.-]+)\s*,\s*([\d.-]+)\s*\)/g;
// Die JS/TS-Schreibweise derselben Kurve: [0.16, 1, 0.3, 1] als ease-Wert.
// Ohne diese zweite Form sieht der Pruefer in einem React-Projekt fast nichts —
// dort steht die Kurve als Array in einer motion-Transition, nicht als CSS-String.
const KURVE_ARRAY = /ease\s*:\s*\[\s*([\d.-]+)\s*,\s*([\d.-]+)\s*,\s*([\d.-]+)\s*,\s*([\d.-]+)\s*\]/g;
// Nackte Defaults nur dort, wo sie wirklich Timing sind — `transition:`,
// `animation:`, `transition-timing-function:`. Ein Tailwind `ease-out` in einer
// Klassenliste ist dieselbe Aussage, deshalb auch `duration-*`-Nachbarschaft.
const DEFAULT_CSS = /(?:transition|animation)(?:-timing-function)?\s*:\s*[^;{}]*?\b(ease-in-out|ease-in|ease-out|ease|linear)\b/g;
const DEFAULT_TW = /\bease-(?:linear|in|out|in-out)\b/g;

const alleDateien = dateien(wurzel);
const kurven = new Map();      // "0.16,1,0.3,1" -> [{datei, zeile}]
const defaults = [];           // {datei, zeile, text}
let hatAnimation = false;
let hatReducedMotion = false;

const schluessel = (a, b, c, d) =>
  [a, b, c, d].map((x) => String(parseFloat(x))).join(',');

for (const f of alleDateien) {
  let text;
  // Ein Lesefehler wurde still verschluckt: die Datei zaehlte in der Kopfzeile
  // mit, wurde aber nie geoeffnet. Gemessen 01.08.2026 mit einem toten Symlink
  // — nicht nur die: auch fehlende Rechte, defekte Sektoren, Dateien die
  // waehrend des Laufs verschwinden.
  try { text = fs.readFileSync(f, 'utf8'); } catch (e) {
    nichtLesbar.push(`${path.relative(wurzel, f) || path.basename(f)} (${e.code || 'Lesefehler'})`);
    continue;
  }
  const rel = path.relative(wurzel, f) || path.basename(f);

  // Reduced Motion hat ZWEI legitime Formen, und die zweite hatte ich beim
  // ersten Bauen vergessen: React-Projekte loesen es in JS (`useReducedMotion()`
  // aus motion/react, `matchMedia('(prefers-reduced-motion...)')`), nicht per
  // CSS-Media-Query. Die eigene Komponentenbibliothek benutzt genau diese Form
  // in mehreren Dateien — und mein Pruefer faerbte sie BLOCK. Ein Waechter, der
  // die richtige Umsetzung rot meldet, ist schlimmer als keiner.
  if (/@media[^{]*prefers-reduced-motion/.test(text)
    || /useReducedMotion|prefers-reduced-motion/.test(text)) hatReducedMotion = true;
  if (/(?:transition|animation)\s*:|useAnimate|framer-motion|from ['"]motion/.test(text)) {
    hatAnimation = true;
  }

  for (const [i, zeile] of text.split('\n').entries()) {
    for (const re of [KURVE, KURVE_ARRAY]) {
      re.lastIndex = 0;
      let m;
      while ((m = re.exec(zeile)) !== null) {
        const k = schluessel(m[1], m[2], m[3], m[4]);
        if (!kurven.has(k)) kurven.set(k, []);
        kurven.get(k).push({ datei: rel, zeile: i + 1 });
      }
    }
    DEFAULT_CSS.lastIndex = 0;
    let d;
    while ((d = DEFAULT_CSS.exec(zeile)) !== null) {
      defaults.push({ datei: rel, zeile: i + 1, text: d[1] });
    }
    // Tailwind-Klassen: nur wenn daneben wirklich eine Transition steht, sonst
    // trifft es jede Zeichenkette, in der zufaellig "ease-out" vorkommt.
    if (/\b(?:transition|duration-\d+)\b/.test(zeile)) {
      DEFAULT_TW.lastIndex = 0;
      let t;
      while ((t = DEFAULT_TW.exec(zeile)) !== null) {
        defaults.push({ datei: rel, zeile: i + 1, text: `${t[0]} (Tailwind)` });
      }
    }
  }
}

// --- Urteilen --------------------------------------------------------------
// Eine Kurve ist normal. Zwei sind die dokumentierte Uebergangslage (vendoriert
// + eigen). Ab drei ist es keine Entscheidung mehr, sondern Zufall — dann hat
// niemand mehr gewaehlt, es ist nur passiert.
const VIELFALT_WARN = 2;
const VIELFALT_BLOCK = 3;

const befunde = [];
const anzahl = kurven.size;

if (anzahl >= VIELFALT_BLOCK) {
  befunde.push({
    id: 'M-motion-1', stufe: 'BLOCK',
    was: `${anzahl} verschiedene Ease-Kurven im Projekt`,
    fix: 'Auf eine Kurve je Rolle einigen und in den Projekt-Tokens festschreiben (motion-doktrin.md)',
    stellen: [...kurven.entries()].map(([k, v]) => `cubic-bezier(${k})  ${v.length}x  z.B. ${v[0].datei}:${v[0].zeile}`),
  });
} else if (anzahl === VIELFALT_WARN) {
  befunde.push({
    id: 'M-motion-1', stufe: 'WARN',
    was: '2 verschiedene Ease-Kurven — erlaubt, solange es die dokumentierte Lage ist (vendoriert + eigen)',
    fix: 'Pruefen, ob beide gewollt sind; sonst auf eine ziehen',
    stellen: [...kurven.entries()].map(([k, v]) => `cubic-bezier(${k})  ${v.length}x  z.B. ${v[0].datei}:${v[0].zeile}`),
  });
}

if (defaults.length) {
  befunde.push({
    id: 'M-motion-2', stufe: 'WARN',
    was: `${defaults.length}x CSS-Standard-Easing (${[...new Set(defaults.map((d) => d.text))].join(', ')})`,
    fix: 'Starke Kurve setzen — die Defaults sind laut Doktrin zu schwach',
    stellen: defaults.slice(0, 8).map((d) => `${d.datei}:${d.zeile}  ${d.text}`),
  });
}

// Reduced Motion ist in der Doktrin Pflicht. Aber nur, wenn ueberhaupt animiert
// wird — eine Seite ohne Bewegung braucht keine Ausnahme dafuer.
if (hatAnimation && !hatReducedMotion) {
  befunde.push({
    id: 'M-motion-3', stufe: 'BLOCK',
    was: 'Animation im Projekt, aber kein @media (prefers-reduced-motion)',
    fix: 'Reduced-Motion-Block ergaenzen — in der Doktrin Pflicht, nicht Empfehlung',
    stellen: [],
  });
}

let runtime = { status: 'NOT_CHECKED', scope: 'reduced-motion-target' };
if (runtimeUrl) {
  let browser;
  try {
    const { chromium } = await import('/usr/lib/node_modules/playwright/index.mjs');
    browser = await chromium.launch({ headless: true, channel: 'chrome' });
    const observations = {};
    for (const preference of ['no-preference', 'reduce']) {
      const page = await browser.newPage({ reducedMotion: preference });
      const response = await page.goto(runtimeUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
      if (!response?.ok()) throw new Error(`navigation failed: ${response?.status()}`);
      await page.locator(runtimeSelector).first().waitFor({ state: 'visible', timeout: 5000 });
      observations[preference] = await page.locator(runtimeSelector).first().evaluate(async (target) => {
        const elements = [target, ...target.querySelectorAll('*')];
        const samples = [];
        for (let i = 0; i < 4; i++) {
          samples.push(elements.map(el => {
            const rect = el.getBoundingClientRect(), style = getComputedStyle(el);
            return { x: rect.x, y: rect.y, width: rect.width, height: rect.height, transform: style.transform,
              translate: style.translate, rotate: style.rotate, scale: style.scale };
          }));
          await new Promise(resolve => setTimeout(resolve, 100));
        }
        const moving = elements.some((_, index) => samples.slice(1).some(sample =>
          ['x', 'y', 'width', 'height'].some(key => Math.abs(sample[index][key] - samples[0][index][key]) > 0.5)
          || ['transform', 'translate', 'rotate', 'scale'].some(key => sample[index][key] !== samples[0][index][key])));
        const spatial = /^(transform|translate|rotate|scale|left|right|top|bottom|width|height|offsetDistance|offsetPath|offsetRotate)$/;
        const spatialAnimations = target.getAnimations({ subtree: true }).filter(animation => animation.playState === 'running'
          && animation.effect?.getKeyframes().some(frame => Object.keys(frame).some(key => spatial.test(key)))).length;
        return { reduced: matchMedia('(prefers-reduced-motion: reduce)').matches, moving, spatialAnimations, sample_ms: 400 };
      });
      await page.close();
    }
    const reduced = observations.reduce;
    const normal = observations['no-preference'];
    if (!normal.moving && normal.spatialAnimations === 0) throw new Error('keine Bewegung am Ziel beobachtet; Interaktion zuerst im Projekt-Browsertest ausloesen');
    const failed = !reduced.reduced || reduced.moving || reduced.spatialAnimations > 0;
    runtime = { status: failed ? 'FAIL' : 'PASS', scope: 'reduced-motion-target', url: runtimeUrl, selector: runtimeSelector, observations };
    if (failed) befunde.push({ id: 'M-motion-runtime', stufe: 'BLOCK', was: 'Bewegung am Ziel bleibt unter Reduced Motion aktiv',
      fix: 'Die betroffene Bewegung unter prefers-reduced-motion reduzieren; eine unbenutzte Query reicht nicht.', stellen: [runtimeSelector] });
  } catch (error) {
    runtime = { status: 'BLOCKED', scope: 'reduced-motion-target', url: runtimeUrl, selector: runtimeSelector, error: error.message };
  } finally {
    await browser?.close();
  }
}
const block = befunde.filter((b) => b.stufe === 'BLOCK').length;
const warn = befunde.filter((b) => b.stufe === 'WARN').length;

// Wie der Slop-Scanner: ein Lauf ueber null Dateien ist kein sauberes Ergebnis.
// Ohne diese Zeile meldet ein falscher Pfad "0 Blocker, 0 Warnungen" — gruen
// ueber nichts, genau der Fehler, den das Tor am 29.07. an drei Stellen hatte.
if (alleDateien.length === 0) {
  const meldung = `motion-check hat 0 Dateien gelesen — zeigt der Pfad auf den richtigen Ordner? (${wurzel})`;
  if (alsJson) console.log(JSON.stringify({ wurzel, dateienGelesen: 0, block: null, warn: null, fehler: meldung }, null, 2));
  else console.error(meldung);
  process.exit(1);
}

if (alsJson) {
  console.log(JSON.stringify({
    scope: 'motion-source-patterns', runtime,
    wurzel, dateienGelesen: alleDateien.length, nichtLesbar,
    kurvenAnzahl: anzahl, block, warn, befunde,
  }, null, 2));
  // Erst das JSON ausgeben, DANN abbrechen: die Wache stand vorher davor und
  // liess den --json-Modus voellig ohne JSON zurueck (gemessen 01.08.2026).
  // Ein Automat bekam dann eine Klartext-Fehlermeldung, wo er ein Objekt
  // erwartete — und das JSON-Feld `nichtLesbar` sah nie jemand.
  if (nichtLesbar.length || runtime.status === 'BLOCKED') process.exit(2);
  process.exit(block > 0 ? 1 : 0);
}

// Nicht lesbare Dateien VOR jedem Text-Ausgang. Der Pruefer hat ZWEI davon:
// "keine Befunde" (Exit 0) und die Befundliste (Exit 1). Beim ersten Umbau
// stand die Wache nur vor dem zweiten — ein Ordner ohne Befunde meldete
// weiterhin Exit 0, obwohl eine Datei ungelesen blieb (gemessen 01.08.2026).
if (nichtLesbar.length) {
  console.error(`\n${nichtLesbar.length} Datei(en) konnten nicht gelesen werden:`);
  for (const d of nichtLesbar.slice(0, 5)) console.error(`  ${d}`);
  if (nichtLesbar.length > 5) console.error(`  ... und ${nichtLesbar.length - 5} weitere`);
  console.error('Ueber sie sagt dieser Lauf nichts.');
  process.exit(2);
}

console.log(`\nmotion-check — ${alleDateien.length} Dateien unter ${wurzel}\n`);
console.log(`Quelltext-Teilcheck. Reduced-Motion-Wirkung: ${runtime.status}.`);
if (runtime.status === 'BLOCKED') { console.error(runtime.error); process.exit(2); }
if (!befunde.length) {
  console.log(`${anzahl} Kurve(n), keine Quelltextbefunde. Ohne Runtime-Pruefung ist die Wirkung nicht geprueft.\n`);
  process.exit(0);
}
for (const b of befunde) {
  console.log(`[${b.stufe}] ${b.id}  ${b.was}`);
  console.log(`        -> ${b.fix}`);
  for (const s of b.stellen) console.log(`        ${s}`);
  console.log('');
}
console.log(`${block} Blocker, ${warn} Warnung(en).\n`);
process.exit(block > 0 ? 1 : 0);
