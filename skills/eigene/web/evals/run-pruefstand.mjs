#!/usr/bin/env node
// run-pruefstand.mjs — prueft den Pruefstand.
//
//   node evals/run-pruefstand.mjs
//
// Warum es das gibt: `pruefstand.mjs` ist entstanden, um falsches Rot zu verhindern
// (nackter Dateiserver kennt cleanUrls nicht -> 172 erfundene tote Links). Ein
// Werkzeug, das andere Werkzeuge vor Fehlalarm schuetzt, ist selbst die neue
// Schwachstelle: sagt es faelschlich 200, verschwindet ein echter toter Link.
//
// Regel aus dieser Woche, hier auf das eigene Werkzeug angewandt: wer eine Regel
// einbaut, baut im selben Zug den Fall, der sie ausloest. Sonst ist die Regel
// eine Behauptung.
//
// Exit 0 = alle Faelle wie erwartet. Exit 1 = mindestens einer nicht.

import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const PRUEFSTAND = path.join(HIER, '..', 'scripts', 'pruefstand.mjs');
const PORT = Number(process.env.PRUEFSTAND_TEST_PORT || 5387);

// Ein Mini-Build, der jede Regel genau einmal ausloest.
const wurzel = mkdtempSync('/tmp/pruefstand-test-');
const dist = path.join(wurzel, 'dist');
mkdirSync(path.join(dist, 'unterordner'), { recursive: true });
writeFileSync(path.join(dist, 'index.html'), '<!doctype html><title>Start</title>');
writeFileSync(path.join(dist, 'team.html'), '<!doctype html><title>Team</title>');
writeFileSync(path.join(dist, '404.html'), '<!doctype html><title>Nicht gefunden</title>');
writeFileSync(path.join(dist, 'unterordner', 'index.html'), '<!doctype html><title>Unterordner</title>');
writeFileSync(path.join(dist, 'stil.css'), 'body{color:#111}');
writeFileSync(path.join(wurzel, 'geheim.txt'), 'darf nie ausgeliefert werden');
writeFileSync(path.join(wurzel, 'vercel.json'), JSON.stringify({
  cleanUrls: true,
  redirects: [{ source: '/alt/(.*)', destination: '/team', permanent: true }],
  rewrites: [{ source: '/api/(.*)', destination: '/team.html' }],
}, null, 2));

const FAELLE = [
  { was: 'cleanUrls: /team liefert team.html', pfad: '/team', status: 200, enthaelt: 'Team' },
  { was: 'Startseite', pfad: '/', status: 200, enthaelt: 'Start' },
  { was: 'Ordner mit index.html', pfad: '/unterordner', status: 200, enthaelt: 'Unterordner' },
  { was: 'echte Datei mit Endung', pfad: '/stil.css', status: 200, enthaelt: 'color' },
  // Der Kern: ein toter Link MUSS tot bleiben. Eine SPA-Auffangregel wuerde hier
  // 200 liefern und die ganze Link-Pruefung stumm schalten.
  { was: 'toter Link bleibt 404', pfad: '/gibtesnicht', status: 404 },
  { was: 'toter Link mit Endung bleibt 404', pfad: '/gibtesnicht.html', status: 404 },
  // Wildcard-Redirect. Genau hier lag der Fehler: `*` war in der Escape-Klasse
  // vergessen, dadurch wurde aus `(.*)` das Muster `(\.*)` — passte nur auf Punkte.
  { was: 'Wildcard-Redirect /alt/irgendwas', pfad: '/alt/irgendwas', status: 308 },
  { was: 'Wildcard-Rewrite /api/irgendwas', pfad: '/api/irgendwas', status: 200, enthaelt: 'Team' },
  // Kein Ausbruch aus dem Build-Ordner.
  { was: 'Ausbruch nach oben geblockt', pfad: '/../geheim.txt', status: 404 },
];

const kind = spawn('node', [PRUEFSTAND, '--dir', dist, '--port', String(PORT)], { stdio: 'pipe' });
let ausgabe = '';
kind.stdout.on('data', (d) => { ausgabe += d; });
kind.stderr.on('data', (d) => { ausgabe += d; });

const aufraeumen = () => {
  kind.kill();
  try { rmSync(wurzel, { recursive: true, force: true }); } catch { /* egal */ }
};
process.on('exit', aufraeumen);

// Warten, bis der Server wirklich antwortet — ein festes sleep ist auf einer
// belasteten Maschine entweder zu kurz (Fehlalarm) oder verschwendete Zeit.
async function warten() {
  for (let i = 0; i < 60; i++) {
    try {
      await fetch(`http://localhost:${PORT}/`, { redirect: 'manual' });
      return true;
    } catch {
      await new Promise((r) => setTimeout(r, 500));
    }
  }
  return false;
}

if (!await warten()) {
  console.error(`Pruefstand ist in 30s nicht hochgekommen.\n${ausgabe}`);
  process.exit(2);
}

console.log(`Pruefstand-Test — ${FAELLE.length} Faelle auf Port ${PORT}\n`);

let rot = 0;
for (const f of FAELLE) {
  const res = await fetch(`http://localhost:${PORT}${f.pfad}`, { redirect: 'manual' });
  const text = res.status === 200 ? await res.text() : '';
  const statusOk = res.status === f.status;
  const inhaltOk = !f.enthaelt || text.includes(f.enthaelt);
  const ok = statusOk && inhaltOk;
  console.log(`${ok ? 'OK  ' : 'ROT '} ${f.pfad.padEnd(22)} ${res.status}  ${f.was}`);
  if (!ok) {
    rot++;
    if (!statusOk) console.log(`       Status erwartet ${f.status}, bekommen ${res.status}`);
    if (!inhaltOk) console.log(`       "${f.enthaelt}" fehlt im Inhalt`);
  }
}

// Gegenprobe: ohne vercel.json darf cleanUrls NICHT stillschweigend anspringen.
// Sonst wuerde der Pruefstand Routen erfinden, die es in Produktion nicht gibt.
rmSync(path.join(wurzel, 'vercel.json'));
const kind2 = spawn('node', [PRUEFSTAND, '--dir', dist, '--port', String(PORT + 1)], { stdio: 'pipe' });
process.on('exit', () => kind2.kill());
for (let i = 0; i < 60; i++) {
  try { await fetch(`http://localhost:${PORT + 1}/`); break; } catch { await new Promise((r) => setTimeout(r, 500)); }
}
const ohne = await fetch(`http://localhost:${PORT + 1}/team`);
const ohneOk = ohne.status === 404;
console.log(`${ohneOk ? 'OK  ' : 'ROT '} ${'/team ohne vercel.json'.padEnd(22)} ${ohne.status}  cleanUrls bleibt AUS, wenn keine Konfig da ist`);
if (!ohneOk) { rot++; console.log('       Der Pruefstand erfindet Routen, die Produktion nicht hat'); }

console.log(`\n${FAELLE.length + 1 - rot}/${FAELLE.length + 1} wie erwartet.`);
if (rot) {
  console.log('Der Pruefstand misst nicht wie die Produktion. Erst reparieren, dann damit urteilen.');
  process.exit(1);
}
console.log('Der Pruefstand bildet cleanUrls, Redirects und Rewrites ab — und laesst tote Links tot.');

// Beide Pruefstand-Kinder halten ueber ihre stdio-Rohre die Ereignisschleife
// offen. Ohne dieses Ende meldet der Lauf 10/10 und haengt danach bis zum
// Timeout — ein Runner sieht Exit 124 statt Exit 0 und liest den gruenen Lauf
// als Fehlschlag. Kein `process.exit(0)`: das kann die letzte Zeile abschneiden,
// wenn stdout ein Rohr ist. Kinder beenden reicht, dann laeuft Node selbst aus.
kind.kill();
kind2.kill();
