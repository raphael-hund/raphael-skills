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

import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const SKRIPTE = path.join(HIER, '..', 'scripts');
const FRIST_MS = 180000;
const PORT = Number(process.env.SPUREN_PORT || 5407);

// Playwright/Chrome legen ihre Wegwerf-Profile unter diesen Praefixen an.
const PRAEFIXE = ['com.google.Chrome.', 'playwright_chromiumdev_profile-', 'lighthouse.'];

const WERKZEUGE = ['axe-run.mjs', 'craft-check.mjs', 'formular-check.mjs'];

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

// Eine echte Seite, kein Fixture-Ordner: die Werkzeuge sollen wirklich einen
// Browser starten. Genau der ist ja der Gegenstand.
const server = http.createServer((_req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end('<!doctype html><html lang="de"><head><meta charset="utf-8">'
    + '<title>Spuren-Check</title></head><body><h1>Seite</h1>'
    + '<form><label for="a">Name</label><input id="a" name="a"></form>'
    + '</body></html>');
});

await new Promise((gut, schlecht) => {
  server.on('error', schlecht);
  server.listen(PORT, '127.0.0.1', gut);
}).catch((e) => {
  console.error(`Kein Testserver auf Port ${PORT}: ${e.message}`);
  console.error('Ohne laufende Seite startet kein Werkzeug einen Browser —');
  console.error('dann misst diese Eval nichts und saehe trotzdem sauber aus.');
  process.exit(2);
});

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

server.close();

console.log(`\n${gezaehlt - fehler}/${gezaehlt} wie erwartet.`);
if (fehler) {
  console.log('Mindestens ein Werkzeug haeuft mit jedem Lauf Muell in /tmp an.');
  process.exit(1);
}
console.log('Kein Werkzeug laesst ein Browser-Profil zurueck.');
