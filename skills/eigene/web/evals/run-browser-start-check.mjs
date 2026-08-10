#!/usr/bin/env node
// run-browser-start-check.mjs — findet jedes Browser-Werkzeug seinen Browser?
//
//   node evals/run-browser-start-check.mjs
//
// WARUM (Befund 31.07.2026)
// scripts/web-clone/lib/playwright-loader.mjs kannte zwei Suchpfade:
// "playwright" (relativ, greift nur mit lokalem node_modules) und
// /root/tools/vendor/claude-skill-web-clone/node_modules/playwright. Der zweite
// existiert auf diesem Rechner nicht. Ergebnis: alle sechs
// Browser-Klon-Werkzeuge meldeten "Playwright not found" und waren unbenutzbar
// — waehrend dieselbe Bibliothek unter /usr/lib/node_modules taeglich lief,
// weil craft-check, axe-run, formular-check und shot-sweep diesen Pfad fest
// verdrahtet haben.
//
// Die Klasse dahinter: eine Abhaengigkeit, die an zwei Orten im selben Skill
// unterschiedlich aufgeloest wird. Der eine Weg funktioniert und wird staendig
// benutzt, der andere ist tot und faellt nie auf — weil die toten Werkzeuge
// selten laufen und ihr Fehler wie ein Umgebungsproblem aussieht
// ("npm install -D playwright"), nicht wie ein Bug im Skill.
//
// WAS DIESE EVAL PRUEFT
// Jedes Werkzeug, das den Loader importiert, wird gegen eine echte lokale
// Seite gestartet. Es muss:
//   1. NICHT an der Bibliothek scheitern (kein "not found", "Cannot find
//      module", "ERR_MODULE_NOT_FOUND")
//   2. mit Exit 0 enden — die Seite ist trivial, aber gueltig
//
// Bewusst gegen eine echte Seite statt gegen --help: eine Hilfe beweist nur,
// dass die Datei parst. Ob der Browser startet, zeigt erst der Start.
//
// Exit 0 = alle finden ihren Browser. Exit 1 = mindestens eines nicht.
// Exit 2 = die Eval selbst kann nicht pruefen.

import { spawn, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
// Temp-Ordner, die auch beim Abbruch verschwinden. Gemessen 31.07.2026:
// drei abgebrochene Laeufe dieser Eval liessen zwei Fixture-Ordner liegen.
import { wegwerfOrdner, wegwerfen, altlastWeg } from './lib/wegwerf.mjs';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const KLONE = path.join(HIER, '..', 'scripts', 'web-clone');
const FRIST_MS = 240000;
const PORT = Number(process.env.BROWSERSTART_PORT || 5415);

// Woran man erkennt, dass es die BIBLIOTHEK war und nicht die Seite.
const FEHLT_RE = /Playwright not found|Cannot find module|ERR_MODULE_NOT_FOUND|Executable doesn't exist/i;

// Reste frueherer SIGKILL-Abbrueche — dagegen hilft kein Handler,
// nur der naechste Lauf.
altlastWeg('browserstart-', 6);

let fehler = 0;
let gezaehlt = 0;

function zeile(ok, was, detail) {
  gezaehlt++;
  if (!ok) fehler++;
  console.log(`  [${ok ? 'OK' : '!!'}]   ${was}`);
  if (!ok && detail) console.log(`         ${detail}`);
}

// Die Liste kommt aus dem Code, nicht aus einer gepflegten Aufzaehlung: wer den
// Loader importiert, braucht einen Browser. Ein neues Werkzeug ist damit
// automatisch dabei.
const werkzeuge = fs.existsSync(KLONE)
  ? fs.readdirSync(KLONE)
    .filter((n) => n.endsWith('.mjs'))
    .filter((n) => fs.readFileSync(path.join(KLONE, n), 'utf8').includes('playwright-loader'))
    .sort()
  : [];

// Eine leere Liste sieht wie ein sauberer Lauf aus. Untergrenze unter dem
// Ist-Stand (6 am 31.07.2026), damit sie stilles Nichtstun faengt.
const MINDESTENS = 4;
if (werkzeuge.length < MINDESTENS) {
  console.error(`Nur ${werkzeuge.length} Werkzeuge mit playwright-loader gefunden (erwartet mindestens ${MINDESTENS}).`);
  console.error('Ohne sie prueft diese Eval nichts und meldete trotzdem gruen.');
  process.exit(2);
}

// Der Testserver MUSS ein eigener Prozess sein. Ein http.createServer im
// selben Prozess sieht funktionierend aus, kann aber nichts beantworten,
// solange spawnSync laeuft — spawnSync blockiert die Event-Loop vollstaendig.
// Gemessen 31.07.2026: curl gegen den eigenen Server waehrend eines
// spawnSync-Aufrufs liefert HTTP-Code 000, und alle Werkzeuge liefen in
// "page.goto: Timeout 45000ms exceeded". Das saehe aus wie ein kaputtes
// Werkzeug und war ein kaputter Test.
const SEITE = wegwerfOrdner('browserstart-seite-');
fs.writeFileSync(path.join(SEITE, 'index.html'),
  '<!doctype html><html lang="de"><head><meta charset="utf-8">'
  + '<title>Browser-Start</title></head><body><h1>Seite</h1>'
  + '<a href="/zwei.html">Zweite Seite</a><button type="button">Knopf</button>'
  + '</body></html>\n');
fs.writeFileSync(path.join(SEITE, 'zwei.html'),
  '<!doctype html><html lang="de"><head><meta charset="utf-8">'
  + '<title>Zwei</title></head><body><h1>Zweite</h1></body></html>\n');

// stderr NICHT verwerfen: startet der Server nicht (Port belegt, Rechte,
// fehlendes Verzeichnis), ist seine Fehlermeldung die einzige Spur. Mit
// stdio:'ignore' bleibt nur "antwortet nicht" — wahr, aber ohne Grund.
// Gemessen 01.08.2026 in der Schwester-Eval: ein verworfener
// Python-SyntaxError kostete sechs Fehlversuche.
const serverLog = path.join(SEITE, 'server-run-browser-start-check.log');
const server = spawn('python3', ['-m', 'http.server', String(PORT), '--bind', '127.0.0.1'],
  { cwd: SEITE, stdio: ['ignore', 'ignore', fs.openSync(serverLog, 'w')], detached: false });

// Warten, bis er wirklich antwortet — blind zu schlafen waere ein Test, der
// auf langsamen Maschinen zufaellig durchfaellt.
// Eine Kennungsdatei beweist, dass UNSER Server antwortet — nicht ein fremder
// auf demselben Port. "HTTP 200" allein genuegt nicht: gemessen 02.08.2026 mit
// einem fremden Server auf 5409 lief diese Eval 6/6 durch, obwohl ihr eigener
// Server nie startete. Sie mass die fremde Seite und gab deren Ergebnis als
// eigenes aus.
//
// run-antiset und run-formular-check machen das seit jeher so; diese beiden
// waren die letzten mit dem schwaecheren Nur-200-Check.
const kennung = `probe-${process.pid}.txt`;
fs.writeFileSync(path.join(SEITE, kennung), 'browserstart');

let bereit = false;
for (let i = 0; i < 50 && !bereit; i += 1) {
  const p = spawnSync('curl', ['-fsS', '-m', '2',
    `http://127.0.0.1:${PORT}/${kennung}`], { encoding: 'utf8' });
  if (p.status === 0 && (p.stdout || '').trim() === 'browserstart') bereit = true;
  else spawnSync('sleep', ['0.2']);
}
if (!bereit) {
  server.kill('SIGKILL');
  console.error(`Kein Testserver auf Port ${PORT} — nach 10s keine Antwort.`);
  // ERST lesen, DANN aufraeumen: wegwerfen(SEITE) loescht den Ordner samt
  // Logdatei. Beim ersten Versuch stand es davor, und die Fehlermeldung des
  // Servers war weg, bevor sie jemand las (gemessen 01.08.2026).
  let serverGesagt = '';
  try { serverGesagt = fs.readFileSync(serverLog, 'utf8').trim(); } catch { /* kein Log */ }
  wegwerfen(SEITE);
  try {
    const log = serverGesagt;
    if (log) {
      console.error('Der Server sagt dazu:');
      for (const z of log.split('\n').slice(-4)) console.error(`  ${z}`);
    }
  } catch { /* kein Log — dann eben nicht */ }
  console.error('Ohne Seite startet kein Werkzeug einen Browser, und diese Eval');
  console.error('saehe sauber aus, ohne etwas zu messen.');
  process.exit(2);
}

const ZIEL = wegwerfOrdner('browserstart-ziel-');

console.log(`Browser-Start-Check — ${werkzeuge.length} Werkzeuge mit playwright-loader\n`);
console.log('Ein Werkzeug, das seine Bibliothek nicht findet, ist unbenutzbar:\n');

// Nicht jedes Browser-Werkzeug nimmt eine URL. visual-diff vergleicht zwei
// fertige PNGs in einem Browser-Canvas — es braucht denselben Playwright, aber
// eine andere Aufrufform. Ein Test, der ihm --url gibt, misst seine
// Flag-Wache, nicht seinen Browserstart.
const PNG_A = path.join(ZIEL, 'a.png');
const PNG_B = path.join(ZIEL, 'b.png');
// Kleinstes gueltiges PNG (1x1, weiss) — der Inhalt ist egal, der Start nicht.
const EIN_PIXEL = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  'base64',
);
fs.writeFileSync(PNG_A, EIN_PIXEL);
fs.writeFileSync(PNG_B, EIN_PIXEL);

const argumenteFuer = (name) => (name === 'visual-diff.mjs'
  ? ['--original', PNG_A, '--clone', PNG_B, '--out', path.join(ZIEL, 'diff.json')]
  : ['--url', `http://127.0.0.1:${PORT}/`, '--out', path.join(ZIEL, name.replace(/\.mjs$/, ''))]);

for (const name of werkzeuge) {
  const r = spawnSync('node', [path.join(KLONE, name), ...argumenteFuer(name)],
    { encoding: 'utf8', timeout: FRIST_MS, maxBuffer: 16 * 1024 * 1024 });

  if (r.error && r.error.code === 'ETIMEDOUT') {
    zeile(false, name, `keine Antwort binnen ${FRIST_MS / 1000}s`);
    continue;
  }
  const aus = `${r.stdout || ''}${r.stderr || ''}`;
  if (FEHLT_RE.test(aus)) {
    zeile(false, name, `findet Playwright nicht: ${(aus.match(FEHLT_RE) || [''])[0]} — welche Pfade kennt der Loader?`);
    continue;
  }
  if (r.status !== 0) {
    zeile(false, name, `Exit ${r.status} gegen eine gueltige Seite: ${aus.trim().split('\n')[0].slice(0, 60)}`);
    continue;
  }
  zeile(true, name);
}

server.kill('SIGKILL');
wegwerfen(SEITE);
wegwerfen(ZIEL);

console.log(`\n${gezaehlt - fehler}/${gezaehlt} wie erwartet.`);
if (fehler) {
  console.log('Mindestens ein Browser-Werkzeug kann auf diesem Rechner nicht starten.');
  process.exit(1);
}
console.log('Jedes Browser-Werkzeug findet seine Bibliothek und laeuft durch.');
