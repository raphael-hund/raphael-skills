#!/usr/bin/env node
// run-spuren-check.mjs — kein Werkzeug darf Browser-Profile in /tmp liegen lassen.
//
//   node evals/run-spuren-check.mjs
//
// WARUM (Befund 31.07.2026)
// axe-run.mjs beendete sich mit `process.exit()` INNERHALB seines try-Blocks.
// Das ueberspringt das finally — der Browser wurde nie geschlossen und liess
// bei jedem Lauf ein Profil unter /tmp/com.google.Chrome.XXXXXX zurueck.
// Gemessen: 2823 solcher Ordner auf dem Rechner, Zuwachs exakt +1 pro Lauf.
// craft-check, formular-check und shot-sweep hinterliessen nichts — die
// beenden erst NACH dem finally.
//
// Der belegte Platz war nie das Problem (12 MB fuer 2833 Ordner). Die ANZAHL
// ist es: jedes readdir ueber /tmp wird langsamer, und ausgerechnet die
// g1-gate-Aufraeumung liest dieses Verzeichnis bei jedem Lauf.
//
// Die Klasse dahinter ist dieselbe wie bei `process.on('exit')` und Signalen:
// ein Aufraeum-Block, der zwar dasteht, aber auf dem tatsaechlich genommenen
// Weg nie erreicht wird. Er sieht im Code aus wie eine Garantie und ist keine.
//
// WAS DIESE EVAL PRUEFT
// Fuer jedes Browser-Werkzeug ein echter Lauf gegen einen echten Server, davor
// und danach die Profilordner gezaehlt. Beide Wege getrennt:
//   1. normaler Lauf (Server antwortet)
//   2. Abbruch (Server tot) — hier greift der catch-Zweig
// Ein Werkzeug, das nur auf einem der beiden Wege aufraeumt, faellt durch.
//
// Exit 0 = kein Werkzeug hinterlaesst etwas. Exit 1 = mindestens eines schon.
// Exit 2 = die Eval selbst kann nicht pruefen (kein Server, kein Werkzeug).

import { spawn, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
// Temp-Ordner, die auch beim Abbruch verschwinden. Gemessen 31.07.2026:
// drei abgebrochene Laeufe dieser Eval liessen zwei Fixture-Ordner liegen.
import { wegwerfOrdner, wegwerfen, altlastWeg } from './lib/wegwerf.mjs';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const SKRIPTE = path.join(HIER, '..', 'scripts');
const FRIST_MS = 180000;
const PORT = Number(process.env.SPUREN_PORT || 5407);

// Playwright/Chrome legen ihre Wegwerf-Profile unter diesen Praefixen an.
const PRAEFIXE = ['com.google.Chrome.', 'playwright_chromiumdev_profile-', 'lighthouse.'];

const WERKZEUGE = ['axe-run.mjs', 'craft-check.mjs', 'formular-check.mjs'];

// Reste frueherer SIGKILL-Abbrueche — dagegen hilft kein Handler,
// nur der naechste Lauf.
altlastWeg('spuren-seite-', 6);

let fehler = 0;
let gezaehlt = 0;

function zeile(ok, was, detail) {
  gezaehlt++;
  if (!ok) fehler++;
  console.log(`  [${ok ? 'OK' : '!!'}]   ${was}`);
  if (!ok && detail) console.log(`         ${detail}`);
}

// Nur EIGENE Ordner zaehlen. Auf einem geteilten Rechner liegen dort auch
// fremde (gemessen: 10 von browser-agent und root) — die zu zaehlen hiesse,
// fremde Laeufe als eigene Spur zu melden.
function profileZaehlen() {
  let n = 0;
  for (const name of fs.readdirSync(os.tmpdir())) {
    if (!PRAEFIXE.some((p) => name.startsWith(p))) continue;
    try {
      const s = fs.statSync(path.join(os.tmpdir(), name));
      if (s.uid === process.getuid()) n += 1;
    } catch { /* verschwunden waehrend des Zaehlens — dann zaehlt er nicht */ }
  }
  return n;
}

const fehlend = WERKZEUGE.filter((n) => !fs.existsSync(path.join(SKRIPTE, n)));
if (fehlend.length) {
  console.error(`Werkzeug fehlt: ${fehlend.join(', ')}`);
  console.error('Ohne sie prueft diese Eval nichts und meldete trotzdem gruen.');
  process.exit(2);
}

// Der Testserver MUSS ein eigener Prozess sein. Ein http.createServer im
// selben Prozess sieht funktionierend aus, kann aber nichts beantworten,
// solange spawnSync laeuft — spawnSync blockiert die Event-Loop vollstaendig.
// Gemessen 31.07.2026: curl gegen den eigenen Server waehrend eines
// spawnSync-Aufrufs liefert HTTP-Code 000. Die Werkzeuge liefen dann in
// "page.goto: Timeout 45000ms exceeded" — und diese Eval meldete trotzdem
// 6/6, weil sie nur Profilordner zaehlte und nie den Exit-Code ansah.
const SEITE = wegwerfOrdner('spuren-seite-');
fs.writeFileSync(path.join(SEITE, 'index.html'),
  '<!doctype html><html lang="de"><head><meta charset="utf-8">'
  + '<title>Spuren-Check</title></head><body><h1>Seite</h1>'
  + '<form><label for="a">Name</label><input id="a" name="a"></form>'
  + '</body></html>\n');

// stderr NICHT verwerfen: startet der Server nicht (Port belegt, Rechte,
// fehlendes Verzeichnis), ist seine Fehlermeldung die einzige Spur. Mit
// stdio:'ignore' bleibt nur "antwortet nicht" — wahr, aber ohne Grund.
// Gemessen 01.08.2026 in der Schwester-Eval: ein verworfener
// Python-SyntaxError kostete sechs Fehlversuche.
const serverLog = path.join(SEITE, 'server-run-spuren-check.log');
const server = spawn('python3', ['-m', 'http.server', String(PORT), '--bind', '127.0.0.1'],
  { cwd: SEITE, stdio: ['ignore', 'ignore', fs.openSync(serverLog, 'w')], detached: false });

// Warten, bis er wirklich antwortet. Ein `listen`-Callback des eigenen
// Prozesses gibt es hier nicht mehr, und blind zu schlafen waere ein Test,
// der auf langsamen Maschinen zufaellig durchfaellt.
// Eine Kennungsdatei beweist, dass UNSER Server antwortet — nicht ein fremder
// auf demselben Port. "HTTP 200" allein genuegt nicht: gemessen 02.08.2026 mit
// einem fremden Server auf 5407 lief diese Eval 6/6 durch, obwohl ihr eigener
// Server nie startete. Sie mass die fremde Seite und gab deren Ergebnis als
// eigenes aus.
//
// run-antiset und run-formular-check machen das seit jeher so; diese beiden
// waren die letzten mit dem schwaecheren Nur-200-Check.
const kennung = `probe-${process.pid}.txt`;
fs.writeFileSync(path.join(SEITE, kennung), 'spuren');

let bereit = false;
for (let i = 0; i < 50 && !bereit; i += 1) {
  const p = spawnSync('curl', ['-fsS', '-m', '2',
    `http://127.0.0.1:${PORT}/${kennung}`], { encoding: 'utf8' });
  if (p.status === 0 && (p.stdout || '').trim() === 'spuren') bereit = true;
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
  console.error('Ohne laufende Seite startet kein Werkzeug einen Browser,');
  console.error('und diese Eval saehe sauber aus, ohne etwas zu messen.');
  process.exit(2);
}

console.log(`Spuren-Check — ${WERKZEUGE.length} Browser-Werkzeuge\n`);
console.log('Ein Werkzeug, das seinen Browser nicht schliesst, laesst ein Profil liegen:\n');

const laufen = (name, url) => spawnSync('node', [path.join(SKRIPTE, name), '--url', url], {
  encoding: 'utf8', timeout: FRIST_MS, maxBuffer: 16 * 1024 * 1024,
});

for (const name of WERKZEUGE) {
  // Weg 1: normaler Lauf.
  let vorher = profileZaehlen();
  let r = laufen(name, `http://127.0.0.1:${PORT}/`);
  if (r.error && r.error.code === 'ETIMEDOUT') {
    zeile(false, `${name} (normaler Lauf)`, `keine Antwort binnen ${FRIST_MS / 1000}s`);
  } else if (r.status === 2) {
    // Ein abgestuerzter Lauf hinterlaesst oft NICHTS und saehe damit sauber
    // aus. Genau so meldete diese Eval am 31.07.2026 sechs von sechs gruen,
    // waehrend jeder "normale Lauf" in Wahrheit ein Timeout war. Ein Zaehler
    // ohne Blick auf den Exit-Code misst die Abwesenheit von Arbeit.
    zeile(false, `${name} (normaler Lauf) raeumt seinen Browser weg`,
      `Exit 2 gegen eine gueltige Seite — der Lauf kam nie zustande: ${`${r.stderr || ''}`.trim().split('\n')[0].slice(0, 50)}`);
  } else {
    const zuwachs = profileZaehlen() - vorher;
    zeile(zuwachs <= 0, `${name} (normaler Lauf) raeumt seinen Browser weg`,
      `${zuwachs} Profil(e) liegen geblieben — steht das process.exit() im try-Block?`);
  }

  // Weg 2: Abbruch. Port 1 ist reserviert und antwortet nie.
  vorher = profileZaehlen();
  r = laufen(name, 'http://127.0.0.1:1/');
  if (r.error && r.error.code === 'ETIMEDOUT') {
    zeile(false, `${name} (toter Server)`, `keine Antwort binnen ${FRIST_MS / 1000}s`);
  } else {
    const zuwachs = profileZaehlen() - vorher;
    zeile(zuwachs <= 0, `${name} (toter Server) raeumt seinen Browser weg`,
      `${zuwachs} Profil(e) liegen geblieben — der Abbruchweg umgeht das finally`);
  }
}

server.kill('SIGKILL');
wegwerfen(SEITE);

console.log(`\n${gezaehlt - fehler}/${gezaehlt} wie erwartet.`);
if (fehler) {
  console.log('Mindestens ein Werkzeug haeuft mit jedem Lauf Muell in /tmp an.');
  process.exit(1);
}
console.log('Kein Werkzeug laesst ein Browser-Profil zurueck.');
