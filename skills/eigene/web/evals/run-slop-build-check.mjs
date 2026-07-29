#!/usr/bin/env node
/**
 * run-slop-build-check.mjs — findet der Slop-Scanner den Text, der WIRKLICH
 * ausgeliefert wird?
 *
 * Das Tor scannt `dist/`, nicht die Quelle. Dort steht der Text so, wie der
 * Bundler ihn geschrieben hat — und Bundler schreiben Nicht-ASCII als
 * \uXXXX-Escape.
 *
 * Befund 29.07.2026: dieselbe deutsche Floskelseite ergab
 *     als Quelle  -> hits: 3   (de-14 gefunden)
 *     nach esbuild -> hits: 0   (nichts gefunden)
 * Kein Zeichen am Text war anders, nur "ä" stand als "\u00e4". Dazu kam eine
 * zweite Bremse: Dateien ueber 512 KB wurden still uebersprungen — und ein
 * echtes React-Buendel ist immer groesser. Auf einer deutschen React-Seite
 * hat der Slop-Scan also faktisch nie stattgefunden und trotzdem gruen
 * gemeldet.
 *
 * Geprueft werden drei Dinge, die je einzeln falsches Gruen erzeugen:
 *   1. ESCAPES   — \u00e4-Text wird gefunden wie roher Text.
 *   2. GROSS     — ein Buendel ueber 512 KB wird gelesen, nicht uebersprungen.
 *   3. UNVERSEHRT — ein literaler Backslash vor "u" wird NICHT umgedeutet,
 *                  und sauberer Text loest weiterhin nichts aus.
 *
 * Braucht weder Browser noch Server.
 *
 *   node evals/run-slop-build-check.mjs
 *
 * Exit 0 = alle Faelle wie erwartet. Exit 1 = mindestens einer daneben.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const SKILL = path.join(HIER, '..');
const SCAN = path.resolve(SKILL, '../../design/scripts/scan-ai-slop.mjs');
const REGELN = path.resolve(SKILL, '../../design/scripts/rules.de.mjs');

for (const [was, p] of [['Scanner', SCAN], ['Regelsatz', REGELN]]) {
  if (!fs.existsSync(p)) {
    console.error(`FEHLER: ${was} nicht gefunden: ${p}`);
    process.exit(1);
  }
}

// Ein Satz, der de-14 sicher ausloest — einmal roh, einmal so, wie esbuild
// ihn schreibt.
const ROH  = 'Wir heben Ihr Geschäft auf das nächste Level.';
const ESC  = 'Wir heben Ihr Gesch\\u00e4ft auf das n\\u00e4chste Level.';

function scanne(dateien) {
  const ordner = fs.mkdtempSync(path.join(os.tmpdir(), 'slop-build-'));
  try {
    for (const [name, inhalt] of Object.entries(dateien)) {
      fs.writeFileSync(path.join(ordner, name), inhalt);
    }
    let roh;
    try {
      roh = execFileSync('node', [SCAN, ordner, `--rules=${REGELN}`, '--json'],
        { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
    } catch (e) {
      roh = String(e.stdout || '');
    }
    return JSON.parse(roh);
  } finally {
    fs.rmSync(ordner, { recursive: true, force: true });
  }
}

const ids = (json) => (json.findings || []).map((f) => f.id);

let fehler = 0;
const zeile = (ok, text, detail) => {
  if (!ok) fehler++;
  console.log(`  [${ok ? 'OK' : '!!'}]   ${text}`);
  if (detail) console.log(`         ${detail}`);
};

console.log('\nSlop-Check BUILD — sieht der Scanner den ausgelieferten Text?\n');

// --- 1. Gegenprobe: roh muss treffen (sonst misst der Rest nichts) ---------
console.log('Kontrolle — roher Text muss anschlagen:\n');
const rohTreffer = ids(scanne({ 'app.js': `const t = "${ROH}";` }));
zeile(rohTreffer.includes('de-14'), 'roher Umlaut-Text findet de-14',
  rohTreffer.includes('de-14') ? null : `bekam [${rohTreffer.join(', ') || 'nichts'}]`);

// --- 2. Escapes -----------------------------------------------------------
console.log('\nSo schreibt der Bundler — muss genauso anschlagen:\n');
for (const [was, inhalt] of [
  ['einfaches \\u00e4 im JS',      `const t = "${ESC}";`],
  ['\\u im HTML-Attribut',        `<div data-x="${ESC}"></div>`],
  ['mehrere Escapes in Folge',    `x("Ma\\u00dfgeschneiderte L\\u00f6sungen f\\u00fcr das n\\u00e4chste Level.")`],
]) {
  const name = was.includes('HTML') ? 'index.html' : 'app.js';
  const gefunden = ids(scanne({ [name]: inhalt }));
  zeile(gefunden.includes('de-14') || gefunden.includes('de-16'), was,
    gefunden.length ? null : 'nichts gefunden — Escapes werden nicht aufgeloest');
}

// --- 3. Grosse Datei ------------------------------------------------------
console.log('\nEin echtes Buendel ist gross — darf nicht still uebersprungen werden:\n');
const fuellung = `const a${'x'.repeat(60)} = 1;\n`.repeat(12000);   // ~800 KB
const gross = ids(scanne({ 'bundle.js': `${fuellung}const t = "${ESC}";\n` }));
zeile(gross.includes('de-14'), 'Buendel ~800 KB wird gelesen',
  gross.includes('de-14') ? null : 'uebersprungen — der Scan hat nie stattgefunden');

// --- 4. Nichts kaputtgemacht ---------------------------------------------
console.log('\nGegenprobe — nichts darf falsch umgedeutet werden:\n');

// Literaler Backslash vor "u": im Quelltext steht \\u00e4, gemeint ist ein
// Backslash gefolgt von "u00e4". Das ist KEIN Escape und darf nicht ersetzt
// werden. Loest der Scanner es trotzdem auf, erfindet er Text.
const literal = ids(scanne({ 'app.js': String.raw`const pfad = "C:\\u00e4chste";` }));
zeile(!literal.includes('de-14'), 'literaler Backslash wird nicht umgedeutet',
  literal.includes('de-14') ? 'de-14 erfunden — die Backslash-Zaehlung stimmt nicht' : null);

const sauber = ids(scanne({ 'app.js': 'const preis = "Der Umzug kostet 890 Euro und dauert einen Tag.";' }))
  .filter((i) => i.startsWith('de-'));
zeile(sauber.length === 0, 'sauberer deutscher Fachtext bleibt still',
  sauber.length ? `Falsch-Positiv: ${sauber.join(', ')}` : null);

// Zeilennummern muessen nach dem Aufloesen noch stimmen — sonst zeigt jeder
// Befund auf die falsche Stelle und niemand findet ihn wieder.
const mehrzeilig = scanne({ 'app.js': `// Zeile 1\n// Zeile 2\nconst t = "${ESC}";\n` });
const trefferZeile = (mehrzeilig.findings || [])
  .flatMap((f) => f.hits || []).map((h) => h.line);
zeile(trefferZeile.includes(3), 'Zeilennummer stimmt nach dem Aufloesen (3)',
  trefferZeile.length ? `bekam Zeile ${trefferZeile.join(', ')}` : 'kein Treffer');

// --- Schluss --------------------------------------------------------------
const gesamt = 1 + 3 + 1 + 3;
console.log(`\n${gesamt - fehler}/${gesamt} wie erwartet.`);
if (fehler) {
  console.log('Der Scanner sieht den ausgelieferten Text nicht — Slop-Gruen ist wertlos.');
  process.exit(1);
}
console.log('Der Scanner liest den Build so, wie der Besucher ihn bekommt.');
