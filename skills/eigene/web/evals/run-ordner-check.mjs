#!/usr/bin/env node
/**
 * run-ordner-check.mjs — liest jeder Pruefer den Ordner, fuer den er gebaut ist?
 *
 * Bis 29.07.2026 bekamen alle dateilesenden Pruefer dasselbe `--src`. Sie
 * brauchen aber Gegensaetzliches:
 *
 *   Import-Check   -> QUELLE (import-Zeilen stehen nur in .tsx/.jsx)
 *   Slop-Scan      -> BUILD  (dort steht der ausgelieferte Text)
 *   Routen-Zaehler -> BUILD  (er zaehlt ausgelieferte HTML-Seiten)
 *
 * An der MAKE-Website gemessen: derselbe Scan ergab 96 Treffer in der Quelle
 * und 6 im Build. Mit `--src .` bekommt man 90 Befunde ueber Dateien, die nie
 * ausgeliefert werden — der Laerm, an dem ein Waechter stirbt. Mit `--src dist`
 * verliert man den Import-Check ganz.
 *
 * Der Bau hier ist bewusst gemein: die QUELLE enthaelt eine Floskel, die im
 * BUILD nicht vorkommt. Liest der Slop-Scan die Quelle, meldet er sie — und
 * genau daran erkennt man, dass er den falschen Ordner liest.
 *
 * Der Kernfall braucht einen laufenden Server (der Lauf startet ihn selbst):
 * bei totem Port bricht das Tor ab, bevor der Slop-Scan drankommt — und dann
 * besteht der Test, ohne etwas gemessen zu haben.
 *
 *   node evals/run-ordner-check.mjs
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync, spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const SKILL = path.join(HIER, '..');
const GATE = path.join(SKILL, 'scripts', 'g1-gate.mjs');

let fehler = 0;
let geprueft = 0;   // von zeile() hochgezaehlt
const zeile = (ok, text, detail) => {
  geprueft++;
  if (!ok) fehler++;
  console.log(`  [${ok ? 'OK' : '!!'}]   ${text}`);
  if (detail) console.log(`         ${detail}`);
};

// --- Projekt bauen --------------------------------------------------------
// Quelle: eine .tsx mit Floskel. Build: saubere HTML ohne Floskel.
function projektBauen({ buildName = 'dist' } = {}) {
  const p = fs.mkdtempSync(path.join(os.tmpdir(), 'ordner-'));
  fs.mkdirSync(path.join(p, 'src'), { recursive: true });
  fs.writeFileSync(path.join(p, 'src', 'App.tsx'),
    'export const t = "Wir heben Ihr Geschäft auf das nächste Level.";\n');
  if (buildName) {
    fs.mkdirSync(path.join(p, buildName), { recursive: true });
    fs.writeFileSync(path.join(p, buildName, 'index.html'),
      '<!doctype html><html lang="de"><head><meta charset="utf-8"><title>T</title></head>'
      + '<body><h1>Kellerraeumung in Muenchen</h1><p>Der Umzug kostet 890 Euro.</p></body></html>\n');
  }
  return p;
}

// Der Kernfall braucht einen ANTWORTENDEN Server: bei totem Port bricht das Tor
// vor dem Slop-Scan ab, und dann steht in beiden Faellen "keine ai-slop-Zeile" —
// der Test besteht, ohne etwas gemessen zu haben. Erster Anlauf 29.07.2026 tat
// genau das; nur die Gegenprobe hat es aufgedeckt.
const HAFEN = Number(process.env.ORDNER_PORT || 5511);
let server;
function serverAn(ordner) {
  serverAus();
  server = spawn('python3', ['-m', 'http.server', String(HAFEN), '--directory', ordner],
    { stdio: 'ignore' });
  spawnSync('sleep', ['2']);
}
function serverAus() { if (server) { server.kill(); server = null; } }
process.on('exit', serverAus);

function torQuelle(argv) {
  const r = spawnSync('node', [GATE, ...argv], { encoding: 'utf8', timeout: 120000 });
  return `${r.stdout || ''}${r.stderr || ''}`;
}

console.log('\nOrdner-Check — liest jeder Pruefer seinen eigenen Ordner?\n');

// --- 1. Build wird selbst gefunden ---------------------------------------
console.log('Ohne --build muss der uebliche Build-Ordner gefunden werden:\n');
for (const name of ['dist', 'build', 'out']) {
  const p = projektBauen({ buildName: name });
  const aus = torQuelle(['--url', 'http://127.0.0.1:1/', '--src', p, '--no-shots']);
  const zeigt = new RegExp(`Build\\s+\\(Slop, Routen\\): ${p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/${name}\\b`);
  zeile(zeigt.test(aus), `${name}/ wird als Build erkannt`,
    zeigt.test(aus) ? null : (aus.match(/Build.*$/m) || ['keine Build-Zeile'])[0]);
  fs.rmSync(p, { recursive: true, force: true });
}

// --- 2. --build schlaegt die Selbstsuche ---------------------------------
console.log('\n--build muss die Selbstsuche schlagen:\n');
{
  const p = projektBauen({ buildName: 'dist' });
  fs.mkdirSync(path.join(p, 'eigen'), { recursive: true });
  fs.writeFileSync(path.join(p, 'eigen', 'index.html'), '<!doctype html><html lang="de"><body>x</body></html>');
  const aus = torQuelle(['--url', 'http://127.0.0.1:1/', '--src', p, '--build', path.join(p, 'eigen'), '--no-shots']);
  zeile(aus.includes(`${p}/eigen   [--build]`), 'expliziter --build gewinnt gegen gefundenes dist/',
    (aus.match(/Build.*$/m) || ['keine Build-Zeile'])[0]);
  fs.rmSync(p, { recursive: true, force: true });
}

// --- 3. Ohne Build-Ordner: --src gilt als Build ---------------------------
console.log('\nStatische Seite ohne Bundler — --src IST der Build:\n');
{
  const p = projektBauen({ buildName: null });
  fs.writeFileSync(path.join(p, 'index.html'), '<!doctype html><html lang="de"><body>x</body></html>');
  const aus = torQuelle(['--url', 'http://127.0.0.1:1/', '--src', p, '--no-shots']);
  zeile(aus.includes('kein Build-Ordner — --src gilt als Build'),
    'ohne dist/ faellt es sichtbar auf --src zurueck',
    (aus.match(/Build.*$/m) || ['keine Build-Zeile'])[0]);
  fs.rmSync(p, { recursive: true, force: true });
}

// --- 4. Der eigentliche Punkt: Slop liest den Build ----------------------
console.log('\nDer Kern — die Floskel steht NUR in der Quelle:\n');
{
  const p = projektBauen({ buildName: 'dist' });
  serverAn(path.join(p, 'dist'));
  const aus = torQuelle(['--url', `http://localhost:${HAFEN}/`, '--src', p, '--no-shots']);
  const slopZeile = (aus.match(/^\[(?:PASS|FAIL)\] ai-slop.*$/m) || [''])[0];
  const meldetFloskel = /de-14|naechste level|nächste level/i.test(slopZeile);
  zeile(!meldetFloskel, 'Slop-Scan meldet die Quell-Floskel NICHT',
    meldetFloskel ? `liest die Quelle statt des Builds: ${slopZeile}` : slopZeile || '(keine ai-slop-Zeile)');

  // Gegenprobe: zeigt man den Build absichtlich auf die Quelle, MUSS sie kommen.
  // Sonst prueft der Fall oben gar nichts.
  const aus2 = torQuelle(['--url', `http://localhost:${HAFEN}/`, '--src', p, '--build', path.join(p, 'src'), '--no-shots']);
  const slopZeile2 = (aus2.match(/^\[(?:PASS|FAIL)\] ai-slop.*$/m) || [''])[0];
  zeile(/de-14|deutsche/i.test(slopZeile2), 'Gegenprobe: auf die Quelle gezeigt, findet er sie sehr wohl',
    slopZeile2 || '(keine ai-slop-Zeile — dann misst der Fall darueber nichts)');
  serverAus();
  fs.rmSync(p, { recursive: true, force: true });
}

// --- 5. --build als unbekanntes Flag darf nicht abgelehnt werden ---------
console.log('\nDas Flag selbst:\n');
{
  const aus = torQuelle(['--url', 'http://127.0.0.1:1/', '--build', '/tmp', '--no-shots']);
  zeile(!aus.includes('Unbekanntes Flag'), '--build steht in der Flag-Liste',
    aus.includes('Unbekanntes Flag') ? 'wird als Tippfehler abgelehnt' : null);
}

// --- 5b. shot-sweep muss --url verstehen und Tippfehler ablehnen ---------
// Von den vier Pruefern mit URL-Argument nehmen drei `--url`; shot-sweep hiess
// als einziges `--base`. Ein `--url` fiel dort still auf den Default 5280
// zurueck: das Skript fotografierte klaglos eine ANDERE Seite und lieferte ein
// volles Manifest dazu. Gemessen am 30.07.2026 — `--url ...:59999` ergab
// "navigating to http://localhost:5280/".
//
// Geprueft wird die Wirkung, nicht die Schreibweise im Code: das Manifest muss
// die uebergebene Adresse tragen. Ein Test auf "steht --url in der Quelle?"
// waere auch dann gruen, wenn der Wert nirgends ankommt.
console.log('\nshot-sweep und sein Adress-Flag:\n');
{
  const sweep = path.join(HIER, '..', 'scripts', 'shot-sweep.mjs');
  const ziel = fs.mkdtempSync(path.join(os.tmpdir(), 'sweep-flag-'));
  const lauf = (argv) => spawnSync('node', [sweep, ...argv, '--out', ziel],
    { encoding: 'utf8', timeout: 120000 });

  // Adresse, an der nichts lauscht: der Lauf scheitert so oder so. Entscheidend
  // ist allein, WELCHE Adresse im Manifest steht.
  const tot = 'http://127.0.0.1:59997';
  lauf(['--url', `${tot}/`]);
  const mpfad = path.join(ziel, 'manifest.json');
  const m = fs.existsSync(mpfad) ? JSON.parse(fs.readFileSync(mpfad, 'utf8')) : null;
  zeile(m?.base === tot, '--url landet wirklich in der Zieladresse',
    m ? `Manifest sagt: ${m.base}` : '(kein Manifest geschrieben)');

  const tipp = lauf(['--urll', `${tot}/`]);
  zeile(tipp.status === 2 && /Unbekanntes Flag/.test(`${tipp.stdout}${tipp.stderr}`),
    'vertipptes Flag wird abgelehnt statt still ignoriert',
    `exit=${tipp.status}`);

  fs.rmSync(ziel, { recursive: true, force: true });
}

// --- 6. Der Exit-Code muss im Text stehen --------------------------------
// Zweimal am 29.07.2026 ging er an einer Pipe verloren (`| grep`, `| tail`),
// beide Male mit dem falschen Schluss "meldet Blocker und besteht trotzdem".
// Ein Urteil, das man beim Weiterreichen verliert, gehoert auch in den Text.
console.log('\nDas Urteil muss die Pipe ueberleben:\n');
{
  const p = projektBauen({ buildName: 'dist' });
  serverAn(path.join(p, 'dist'));
  const aus = torQuelle(['--url', `http://localhost:${HAFEN}/`, '--src', p, '--no-shots']);
  const schluss = (aus.match(/^G1 (?:GERISSEN|BESTANDEN|KANN NICHT URTEILEN).*$/m) || [''])[0];
  zeile(/\(Exit [012]\)/.test(schluss), 'Schlusszeile nennt den Exit-Code',
    schluss || '(keine Schlusszeile gefunden)');
  serverAus();
  fs.rmSync(p, { recursive: true, force: true });
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
const gesamt = geprueft;
console.log(`\n${gesamt - fehler}/${gesamt} wie erwartet.`);
if (fehler) {
  console.log('Ein Pruefer liest den falschen Ordner — sein Urteil gilt fuer Dateien, die niemand bekommt.');
  process.exit(1);
}
console.log('Importe kommen aus der Quelle, Slop und Routen aus dem Build.');

