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
import { execFileSync, spawnSync, spawn } from 'node:child_process';
import http from 'node:http';
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
let geprueft = 0;   // von zeile() hochgezaehlt
const zeile = (ok, text, detail) => {
  geprueft++;
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
    ['Motion ist als gezielter G1-Check waehlbar', /motion:\s*checkMotion/.test(gate)],
    ['G1 fuehrt nur ausgewaehlte Checks aus', /selectedChecks/.test(gate)],
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

// Die Summe zaehlt sich selbst.
//
// Sie stand hier als Handzahl. Bei run-bilder-check war so eine Formel
// nachweislich falsch: gemeldet wurden 9/9, waehrend zwoelf Faelle liefen — drei
// geprueft Faelle blieben unerwaehnt. Der Fehler macht nichts kaputt, er
// VERSCHWEIGT eigene Arbeit, und er wird bei jedem Zusatz neu falsch, weil die
// Zahl an einer Stelle steht, die niemand anfasst, wenn er einen Fall ergaenzt.
//
// Geprueft 30.07.2026: in dieser Datei stimmte sie noch. Umgebaut wird trotzdem
// — die Bauart ist der Fehler, nicht erst sein Eintreten.
// --- Flaechenprobe auf der eigenen Bibliothek -----------------------------
// Dieselbe Luecke wie beim Tastatur-Pruefer: gebaute Fixtures sagen nichts
// darueber, ob der Pruefer auf echtem Code Fehlalarm schlaegt. Die Bibliothek
// ist die groesste echte Stichprobe im Repo (95 Komponenten, alle mit Motion)
// und war der Ort, an dem der Befund "drei Ease-Kurven statt zwei" entstand.
//
// Erwartet werden 0 BLOCKER, nicht 0 Warnungen: zwei Kurven (vendoriert plus
// eigen) sind die dokumentierte Lage und stehen bewusst als WARN da.
{
  const bib = path.join(HIER, '..', 'references', 'ui-components');
  if (!fs.existsSync(bib)) {
    zeile(false, 'references/ui-components fehlt — Flaechenprobe nicht gelaufen');
  } else {
    let aus = '';
    let code = 0;
    try {
      aus = execFileSync('node', [PRUEFER, bib], { encoding: 'utf8', timeout: 600000 });
    } catch (e) {
      aus = `${e.stdout || ''}${e.stderr || ''}`;
      code = e.status ?? 1;
    }
    const zahlen = aus.match(/(\d+) Blocker, (\d+) Warnung/);
    zeile(code === 0 && zahlen && Number(zahlen[1]) === 0,
      `eigene Bibliothek: Exit ${code}, ${zahlen ? `${zahlen[1]} Blocker / ${zahlen[2]} Warnungen` : 'keine Zahlen gemeldet'}`,
      code === 0 && zahlen && Number(zahlen[1]) === 0 ? null
        : 'entweder ist eine Motion-Sprache zerfallen oder der Pruefer schlaegt auf gutem Code an');
  }
}

// --- Toter Symlink --------------------------------------------------------
// Ein Lesefehler wurde bis zum 01.08.2026 still verschluckt: die Datei zaehlte
// in der Kopfzeile mit ("N Dateien"), wurde aber nie geoeffnet. Der Pruefer
// hat zwei Ausgabewege (JSON und Text) mit je eigenem exit — die Wache muss
// vor beiden stehen, sonst greift sie nur auf einem.
{
  const ordner = fs.mkdtempSync(path.join(os.tmpdir(), 'motion-symlink-'));
  fs.writeFileSync(path.join(ordner, 'echt.tsx'), 'export const A = () => null;\n');
  fs.symlinkSync(path.join(ordner, 'gibtsnicht.tsx'), path.join(ordner, 'tot.tsx'));

  const lauf = (extra = []) => spawnSync('node',
    [path.join(HIER, '..', 'scripts', 'motion-check.mjs'), ordner, ...extra],
    { encoding: 'utf8' });

  for (const [was, extra] of [['Text', []], ['JSON', ['--json']]]) {
    const r = lauf(extra);
    const aus = `${r.stdout || ''}${r.stderr || ''}`;
    // Der Grund steht je nach Modus woanders: im Text als Klartext, im JSON
    // als Feld `nichtLesbar`. Beides muss auffindbar sein — ein Automat liest
    // kein stderr, ein Mensch kein JSON-Feld. Bis zum 01.08.2026 lieferte der
    // --json-Modus im Fehlerfall GAR KEIN JSON: die Wache beendete vor der
    // Ausgabe, und der Automat bekam Klartext, wo er ein Objekt erwartete.
    const grundDa = was === 'JSON'
      ? (() => { try { return (JSON.parse(r.stdout || '{}').nichtLesbar || []).length > 0; } catch { return false; } })()
      : /nicht gelesen werden/i.test(aus);
    zeile(r.status === 2 && grundDa,
      `toter Symlink -> Exit 2 mit Grund (${was}-Modus)`,
      r.status === 2
        ? 'Exit 2, aber der Grund fehlt in dieser Ausgabeform'
        : `Exit ${r.status} — die Datei zaehlt mit, geprueft wurde sie nie`);
  }

  fs.rmSync(path.join(ordner, 'tot.tsx'));
  const sauber = lauf();
  zeile(sauber.status !== 2, 'ohne toten Symlink: normales Urteil',
    'Exit 2 auf einem sauberen Ordner — die Wache ist zu scharf');

  fs.rmSync(ordner, { recursive: true, force: true });
}

const runtimeDir = fs.mkdtempSync(path.join(os.tmpdir(), 'web-upgrade-browser-motion-'));
const runtimeHtml = (works) => `<!doctype html><html><style>
.box{width:80px;height:80px;background:red;animation:move 10s cubic-bezier(.23,1,.32,1) infinite}
@keyframes move{to{transform:translateX(400px)}}
@media(prefers-reduced-motion:reduce){${works ? '.box{animation:none}' : '.unused{color:blue}'}}
</style><div class="box"></div></html>`;
const runtimeServer = http.createServer((req, res) => { res.setHeader('content-type', 'text/html'); res.end(runtimeHtml(req.url === '/good')); });
await new Promise(resolve => runtimeServer.listen(0, '127.0.0.1', resolve));
try {
  for (const [name, expected] of [['bad', 1], ['good', 0]]) {
    fs.writeFileSync(path.join(runtimeDir, 'index.html'), runtimeHtml(name === 'good'));
    const result = await new Promise(resolve => {
      const child = spawn('node', [PRUEFER, runtimeDir, '--url', `http://127.0.0.1:${runtimeServer.address().port}/${name}`, '--selector', '.box', '--json']);
      let stdout = '', stderr = '';
      child.stdout.on('data', d => { stdout += d; }); child.stderr.on('data', d => { stderr += d; });
      const timer = setTimeout(() => child.kill('SIGTERM'), 30000);
      child.on('close', code => { clearTimeout(timer); resolve({ code, stdout, stderr }); });
    });
    let report; try { report = JSON.parse(result.stdout); } catch { report = null; }
    zeile(result.code === expected && report?.runtime?.status === (expected ? 'FAIL' : 'PASS'),
      name === 'bad' ? 'unwirksamer Reduced-Motion-Selektor faellt im Browser durch' : 'wirksame Reduced Motion besteht am betroffenen Element',
      JSON.stringify(result));
  }
} finally {
  await new Promise(resolve => runtimeServer.close(resolve));
  fs.rmSync(runtimeDir, { recursive: true, force: true });
}

const gesamt = geprueft;
console.log(`\n${gesamt - fehler}/${gesamt} wie erwartet.`);
if (fehler) {
  console.log('Der Motion-Pruefer urteilt falsch — nicht ins Tor haengen.');
  process.exit(1);
}
console.log('Drei Kurven werden gefunden, eine korrekte Umsetzung bleibt gruen.');
