#!/usr/bin/env node
/**
 * run-motion-check.mjs — taugt der Motion-Pruefer in BEIDE Richtungen?
 *
 * Befund 29.07.2026: Die Motion-Doktrin entscheidet den Kurven-Konflikt in
 * Prosa ("beides im selben Projekt -> eine waehlen"), aber nichts hat je
 * nachgesehen. In der eigenen Komponentenbibliothek lagen drei Ease-Kurven
 * statt der zwei dokumentierten; die dritte (Material-Default
 * cubic-bezier(0.4, 0, 0.2, 1)) stand in keiner Doktrin-Zeile. Niemand hatte
 * sie entschieden, sie war einfach da.
 *
 * Diese Eval baut winzige Projekte mit genau einem eingebauten Zustand und
 * prueft, was der Waechter dazu sagt. Der wichtigste Teil sind die Faelle, die
 * er DURCHLASSEN muss:
 *
 *   Beim ersten Bauen meldete der Pruefer die eigene Bibliothek als BLOCK
 *   "kein Reduced Motion" — sie loest es per useReducedMotion() in JS statt
 *   per CSS-Media-Query. Die richtige Umsetzung rot zu faerben ist schlimmer
 *   als gar nicht zu pruefen: nach dem dritten Fehlalarm schaltet man den
 *   Waechter ab, und dann schuetzt er auch vor dem echten Fall nicht mehr.
 *
 * Braucht weder Browser noch Server.
 *
 *   node evals/run-motion-check.mjs
 *
 * Exit 0 = jeder Fall wie erwartet. Exit 1 = mindestens einer daneben.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const PRUEFER = path.join(HIER, '..', 'scripts', 'motion-check.mjs');
if (!fs.existsSync(PRUEFER)) {
  console.error(`FEHLER: motion-check.mjs nicht gefunden: ${PRUEFER}`);
  process.exit(1);
}

// Jeder Fall: Name, Dateien, erwarteter Exit, erwartete Befund-IDs.
const FAELLE = [
  // --- muessen reissen ---
  {
    name: 'drei Kurven — niemand hat mehr gewaehlt',
    reisst: true, ids: ['M-motion-1'],
    dateien: {
      'a.css': '.x{transition:all .2s cubic-bezier(0.16, 1, 0.3, 1)}\n@media (prefers-reduced-motion:reduce){*{transition:none}}',
      'b.css': '.y{transition:all .2s cubic-bezier(0.23, 1, 0.32, 1)}',
      'c.css': '.z{transition:all .2s cubic-bezier(0.4, 0, 0.2, 1)}',
    },
  },
  {
    name: 'Animation ohne jede Reduced-Motion-Vorkehrung',
    reisst: true, ids: ['M-motion-3'],
    dateien: { 'a.css': '.x{transition:opacity .2s cubic-bezier(0.23, 1, 0.32, 1)}' },
  },
  {
    name: 'Ordner ohne passende Datei — leerer Lauf ist kein sauberes Ergebnis',
    reisst: true, ids: [],
    dateien: { 'liesmich.txt': 'kein Frontend' },
  },

  // --- muessen durchgehen ---
  {
    name: 'eine Kurve, CSS-Reduced-Motion',
    reisst: false, ids: [],
    dateien: {
      'a.css': '.x{transition:all .2s cubic-bezier(0.23, 1, 0.32, 1)}\n@media (prefers-reduced-motion:reduce){*{transition:none}}',
    },
  },
  {
    // Der Fehlalarm, der diese Eval ausgeloest hat.
    name: 'Reduced Motion per useReducedMotion() statt CSS (React-Weg)',
    reisst: false, ids: [],
    dateien: {
      'k.tsx': 'import { useReducedMotion } from "motion/react";\n'
        + 'export const K = () => { const r = useReducedMotion();\n'
        + '  return <div style={{ transition: "all .2s cubic-bezier(0.23, 1, 0.32, 1)" }} />; };',
    },
  },
  {
    name: 'zwei Kurven — dokumentierte Uebergangslage, nur Warnung',
    reisst: false, ids: ['M-motion-1'],
    dateien: {
      'a.css': '.x{transition:all .2s cubic-bezier(0.16, 1, 0.3, 1)}\n@media (prefers-reduced-motion:reduce){*{transition:none}}',
      'b.css': '.y{transition:all .2s cubic-bezier(0.23, 1, 0.32, 1)}',
    },
  },
  {
    name: 'nacktes ease-out — Warnung, kein Blocker',
    reisst: false, ids: ['M-motion-2'],
    dateien: {
      'a.css': '.x{transition:opacity .2s ease-out}\n@media (prefers-reduced-motion:reduce){*{transition:none}}',
    },
  },
  {
    // Sonst trifft das Tailwind-Muster jede Zeichenkette, in der "ease-out"
    // zufaellig vorkommt — ein Klassenname, ein Kommentar, ein Dateipfad.
    name: '"ease-out" im Fliesstext ohne Transition daneben — kein Befund',
    reisst: false, ids: [],
    dateien: {
      'a.tsx': '// Die ease-out-Kurve ist dokumentiert in motion-doktrin.md\n'
        + 'export const NAME = "ease-out-beispiel";',
    },
  },
  {
    name: 'JS-Array-Schreibweise wird als Kurve erkannt (drei Stueck)',
    reisst: true, ids: ['M-motion-1'],
    dateien: {
      'a.tsx': 'const r = useReducedMotion();\n'
        + 'const A = { ease: [0.16, 1, 0.3, 1] };\n'
        + 'const B = { ease: [0.23, 1, 0.32, 1] };\n'
        + 'const C = { ease: [0.4, 0, 0.2, 1] };',
    },
  },
];

function lauf(dateien) {
  const ordner = fs.mkdtempSync(path.join(os.tmpdir(), 'motion-eval-'));
  try {
    for (const [name, inhalt] of Object.entries(dateien)) {
      const p = path.join(ordner, name);
      fs.mkdirSync(path.dirname(p), { recursive: true });
      fs.writeFileSync(p, inhalt);
    }
    let roh = '', code = 0;
    try {
      roh = execFileSync('node', [PRUEFER, ordner, '--json'], { encoding: 'utf8' });
    } catch (e) {
      roh = String(e.stdout || ''); code = e.status ?? 1;
    }
    let json = null;
    try { json = JSON.parse(roh); } catch { /* leerer Lauf schreibt auf stderr */ }
    return { code, json };
  } finally {
    fs.rmSync(ordner, { recursive: true, force: true });
  }
}

let fehler = 0;
const zeile = (ok, text, detail) => {
  if (!ok) fehler++;
  console.log(`  [${ok ? 'OK' : '!!'}]   ${text}`);
  if (detail) console.log(`         ${detail}`);
};

console.log('\nMotion-Check — spricht das Projekt EINE Bewegungssprache?\n');
console.log('Diese muessen reissen:\n');
for (const f of FAELLE.filter((x) => x.reisst)) {
  const { code, json } = lauf(f.dateien);
  const ids = (json?.befunde || []).filter((b) => b.stufe === 'BLOCK').map((b) => b.id);
  const passt = code === 1 && f.ids.every((i) => ids.includes(i));
  zeile(passt, f.name, passt ? null : `Exit ${code}, Blocker [${ids.join(', ') || '–'}], erwartet [${f.ids.join(', ') || 'egal'}]`);
}

console.log('\nDiese muessen durchgehen — sonst ist der Waechter nur Laerm:\n');
for (const f of FAELLE.filter((x) => !x.reisst)) {
  const { code, json } = lauf(f.dateien);
  const alle = (json?.befunde || []).map((b) => b.id);
  const blocker = (json?.befunde || []).filter((b) => b.stufe === 'BLOCK').map((b) => b.id);
  const passt = code === 0 && blocker.length === 0
    && f.ids.every((i) => alle.includes(i))
    && (f.ids.length > 0 || alle.length === 0);
  zeile(passt, f.name,
    passt ? null : `Exit ${code}, Befunde [${alle.join(', ') || '–'}], Blocker [${blocker.join(', ') || '–'}]`);
}

// --- 3. Verdrahtung im Tor ------------------------------------------------
// Ein fehlerfreier Pruefer nuetzt nichts, wenn ihn niemand aufruft oder wenn
// das Tor seine Ausgabe falsch liest. Genau dort lagen am 29.07.2026 die
// Fehler der anderen Pruefer: nicht im Werkzeug, sondern in der Zeile, die
// sein Ergebnis auswertet.
console.log('\nVerdrahtung im G1-Tor:\n');
{
  const gate = fs.readFileSync(path.join(HIER, '..', 'scripts', 'g1-gate.mjs'), 'utf8');
  const proben = [
    ['checkMotion() wird aufgerufen', /^checkMotion\(\);$/m.test(gate)],
    ["motion zaehlt als Qualitaets-Pruefer", /QUALITAET = \[[^\]]*'motion'/.test(gate)],
    ['ein Lauf ueber 0 Dateien besteht nicht', gate.includes('dateienGelesen === 0')],
    // Nach Schreibweise zu suchen war falsch: der leere Lauf wird ueber
    // `parsed.fehler` abgefangen, nicht ueber `parsed.block === null`. Beide
    // Wege sind richtig, und eine Eval, die auf EINE Formulierung besteht,
    // faerbt eine korrekte Umsetzung rot, sobald jemand anders sie schreibt.
    // Also nach dem VERHALTEN fragen: wird das Fehlerfeld ueberhaupt gelesen?
    ['der Fehlerfall der Ausgabe wird gelesen',
      gate.includes('parsed.fehler') || gate.includes('parsed.block === null')],
    ['unbekanntes Format faellt nicht still auf 0 zurueck',
      /liste\(parsed, 'befunde'/.test(gate) || gate.includes('Number.isFinite')],
    ['bekommt einen Ordner uebergeben, keine URL',
      /run\('node', \[runner, (?:SRC|LESEORDNER|BUILD)[^\]]*'--json'\]/.test(gate)],
  ];
  for (const [text, ok] of proben) zeile(ok, text);
}

const gesamt = FAELLE.length + 6;
console.log(`\n${gesamt - fehler}/${gesamt} wie erwartet.`);
if (fehler) {
  console.log('Der Motion-Pruefer urteilt falsch — nicht ins Tor haengen.');
  process.exit(1);
}
console.log('Drei Kurven werden gefunden, eine korrekte Umsetzung bleibt gruen.');
