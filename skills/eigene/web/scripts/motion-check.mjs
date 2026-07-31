#!/usr/bin/env node
/*
  motion-check.mjs — spricht das Projekt EINE Motion-Sprache?

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

  Liest QUELLTEXT, keine URL — wie der Slop-Scanner, aus demselben Grund:
  die Kurven stehen in CSS/TSX, nicht im gerenderten DOM.

    node motion-check.mjs <projektordner> [--json]

  Exit 0 = keine Blocker. Exit 1 = Blocker. Exit 2 = Aufruf kaputt.
*/
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const alsJson = args.includes('--json');
const wurzel = args.find((a) => !a.startsWith('--'));

// --help ist kein Fehlerfall. Beide Faelle drucken dieselbe Zeile, aber sie
// bedeuten Verschiedenes: wer --help tippt, hat bekommen was er wollte
// (Exit 0, Hilfe auf stdout); wer den Ordner vergisst, hat einen Fehler
// (Exit 2, Meldung auf stderr). Bis zum 31.07.2026 endeten beide mit Exit 2 —
// in einer Kette liest das jedes Skript als "Pruefer kaputt".
const hilfe = 'Aufruf: node motion-check.mjs <projektordner> [--json]';
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

const UEBERSPRINGEN = new Set([
  'node_modules', '.git', 'dist', 'build', 'out', '.next', '.astro',
  '.output', '.svelte-kit', '.nuxt', 'coverage', '.cache', '.vercel', '.turbo',
]);
const ENDUNGEN = new Set([
  '.css', '.scss', '.sass', '.less',
  '.tsx', '.jsx', '.ts', '.js', '.mjs', '.cjs',
  '.vue', '.svelte', '.astro', '.html',
]);

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
  try { text = fs.readFileSync(f, 'utf8'); } catch { continue; }
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
    wurzel, dateienGelesen: alleDateien.length,
    kurvenAnzahl: anzahl, block, warn, befunde,
  }, null, 2));
  process.exit(block > 0 ? 1 : 0);
}

console.log(`\nmotion-check — ${alleDateien.length} Dateien unter ${wurzel}\n`);
if (!befunde.length) {
  console.log(`Eine Motion-Sprache: ${anzahl} Kurve(n), keine nackten Defaults, Reduced Motion vorhanden.\n`);
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
