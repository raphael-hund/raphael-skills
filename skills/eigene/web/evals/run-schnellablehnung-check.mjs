#!/usr/bin/env node
// run-schnellablehnung-check.mjs — lehnt ein Werkzeug ab, BEVOR es arbeitet?
//
// LAUFZEIT: 20s (gemessen 03.08.2026) — je zwei Aufrufe ohne Browser-Start.
//
//   node evals/run-schnellablehnung-check.mjs
//
// WARUM (Befund 03.08.2026)
// `node axe-run.mjs --diesesflaggibtsnichtxyz` brauchte 36 Sekunden fuer die
// Antwort "Unbekanntes Flag". Der Grund stand in Zeile 13: ein statischer
// `import { chromium }`. In JavaScript laufen import-Zeilen IMMER zuerst —
// vor jeder Flag-Wache, vor jeder Pruefung. Das Werkzeug lud den kompletten
// Browser-Stack, nur um danach einen Tippfehler abzulehnen.
//
// Das ist nicht nur langsam. run-aufruffehler-check meldete deshalb
// "keine Antwort binnen 30s — arbeitet, statt abzulehnen" fuer vier Werkzeuge,
// die in Wahrheit korrekt ablehnten. Ein Waechter, der Langsamkeit als
// Fehlverhalten meldet, schickt jeden auf die falsche Spur.
//
// Vier Werkzeuge wurden auf dynamischen Import umgestellt (36,13s -> 0,13s).
// Nichts hielt das fest: wer die import-Zeile morgen wieder nach oben
// schreibt, faellt in dieselbe Grube — und merkt es erst, wenn eine andere
// Eval mit einer irrefuehrenden Meldung rot wird.
//
// WAS DIESE EVAL PRUEFT
// Fuer jedes Werkzeug, das Playwright benutzt:
//   1. Ein unbekanntes Flag wird binnen GRENZE_MS abgelehnt (Exit != 0).
//   2. `--help` antwortet binnen GRENZE_MS mit Exit 0.
// Beide Wege duerfen keinen Browser laden — sie beantworten eine Frage ueber
// das Werkzeug, nicht ueber eine Seite.
//
// WIE GEMESSEN WIRD — und warum nicht mit einer festen Sekundenzahl.
// Der Schaden zeigte sich als 36s, aber das war eine Maschine unter Last. In
// der Gegenprobe (Load 34) brauchte dasselbe kaputte Werkzeug nur 1,04s —
// eine Grenze bei 5s haette den Rueckfall glatt durchgelassen. Gemessen wird
// deshalb der ABSTAND ZUM FELD: der schnellste Lauf dieses Durchgangs ist der
// Massstab, jedes Werkzeug darf hoechstens das FAKTOR-fache brauchen.
//
// Der Abstand ist gross und stabil: dynamisch 0,06 bis 0,29s, statisch 1,04s
// — Faktor 10 und mehr. Ein Verhaeltnis wandert mit der Maschinenlast mit,
// eine Sekundenzahl nicht. Die absolute Grenze bleibt als zweite Sicherung
// fuer den Fall, dass ALLE Werkzeuge gleichzeitig langsam werden.
//
// Exit 0 = jedes Werkzeug antwortet schnell. Exit 1 = eines laedt erst.
// Exit 2 = die Eval selbst kann nicht pruefen.

import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const SKRIPTE = path.join(HIER, '..', 'scripts');
const KLONE = path.join(SKRIPTE, 'web-clone');
const FRIST_MS = 60000;

// Zweite Sicherung, falls alle gleichzeitig langsam werden (siehe Kopf).
const GRENZE_MS = 5000;
// Erster Massstab: Vielfaches des schnellsten Laufs in diesem Durchgang.
const FAKTOR = 5;
// Unter dieser Schwelle ist jeder Vergleich Rauschen — 0,06s gegen 0,3s sind
// beide "sofort", und ein Prozessstart schwankt um mehr als das.
const RAUSCHEN_MS = 400;

let fehler = 0;
let gezaehlt = 0;

function zeile(ok, was, detail) {
  gezaehlt++;
  if (!ok) fehler++;
  console.log(`  [${ok ? 'OK' : '!!'}]   ${was}`);
  if (!ok && detail) console.log(`         ${detail}`);
}

// Kandidaten aus dem Code: wer Playwright nennt — direkt oder ueber den
// gemeinsamen Loader —, wird geprueft. Ein neues Browser-Werkzeug ist damit
// automatisch dabei.
const BENUTZT_BROWSER = /playwright|loadPlaywright|launchChromium/;

const werkzeuge = [];
for (const [ordner, praefix] of [[SKRIPTE, ''], [KLONE, 'web-clone/']]) {
  if (!fs.existsSync(ordner)) continue;
  for (const name of fs.readdirSync(ordner).sort()) {
    if (!name.endsWith('.mjs')) continue;
    // playwright-loader.mjs ist der Loader selbst — ein Modul ohne CLI.
    if (name === 'playwright-loader.mjs') continue;
    const text = fs.readFileSync(path.join(ordner, name), 'utf8');
    if (!BENUTZT_BROWSER.test(text)) continue;
    werkzeuge.push({ name: `${praefix}${name}`, pfad: path.join(ordner, name) });
  }
}

// Eine leere Liste sieht wie ein sauberer Lauf aus. Untergrenze unter dem
// Ist-Stand (11 am 03.08.2026), damit sie stilles Nichtstun faengt.
const MINDESTENS = 6;
if (werkzeuge.length < MINDESTENS) {
  console.error(`Nur ${werkzeuge.length} Browser-Werkzeuge gefunden (erwartet mindestens ${MINDESTENS}).`);
  console.error('Die Erkennung ueber "playwright" im Quelltext greift nicht mehr —');
  console.error('ohne sie prueft diese Eval nichts und meldet trotzdem gruen.');
  process.exit(2);
}

console.log(`Schnellablehnung — ${werkzeuge.length} Werkzeuge mit Browser\n`);
console.log(`Eine Frage ueber das Werkzeug braucht keinen Browser (Grenze ${GRENZE_MS / 1000}s):\n`);

const messen = (pfad, args) => {
  const start = Date.now();
  const r = spawnSync('node', [pfad, ...args],
    { encoding: 'utf8', timeout: FRIST_MS, maxBuffer: 8 * 1024 * 1024 });
  return { ms: Date.now() - start, r };
};

// Erst ALLE messen, dann bewerten: der Massstab ist der schnellste Lauf des
// Durchgangs, und den kennt man erst am Ende.
const messwerte = [];
for (const { name, pfad } of werkzeuge) {
  messwerte.push({ name, flag: messen(pfad, ['--diesesflaggibtsnichtxyz']), hilfe: messen(pfad, ['--help']) });
}

const alle = messwerte.flatMap((m) => [m.flag, m.hilfe])
  .filter((x) => !(x.r.error && x.r.error.code === 'ETIMEDOUT'))
  .map((x) => x.ms);
const schnellster = alle.length ? Math.min(...alle) : 0;
const massstab = Math.max(schnellster * FAKTOR, RAUSCHEN_MS);
console.log(`  [i]    schnellster Lauf ${(schnellster / 1000).toFixed(2)}s -> erlaubt bis ${(massstab / 1000).toFixed(2)}s\n`);

const bewerten = (name, was, x, sollExit) => {
  if (x.r.error && x.r.error.code === 'ETIMEDOUT') {
    zeile(false, `${name}: ${was}`, `keine Antwort binnen ${FRIST_MS / 1000}s`);
    return;
  }
  const exitOk = sollExit === 0 ? x.r.status === 0 : x.r.status !== 0;
  const schnell = x.ms <= massstab && x.ms <= GRENZE_MS;
  zeile(exitOk && schnell, `${name}: ${was} -> ${(x.ms / 1000).toFixed(2)}s`,
    !exitOk
      ? (sollExit === 0 ? `Exit ${x.r.status} — Hilfe ist kein Fehlerfall` : 'Exit 0 — das Flag wurde verschluckt')
      : `${(x.ms / 1000).toFixed(2)}s gegen ${(massstab / 1000).toFixed(2)}s erlaubt — laedt das `
        + 'Werkzeug den Browser, bevor es die Frage versteht? Statische import-Zeilen laufen zuerst.');
};

for (const m of messwerte) {
  bewerten(m.name, 'unbekanntes Flag', m.flag, 2);
  bewerten(m.name, '--help', m.hilfe, 0);
}

console.log(`\n${gezaehlt - fehler}/${gezaehlt} Pruefungen wie erwartet.`);
if (fehler) {
  console.log('Ein Werkzeug arbeitet, bevor es die Frage versteht.');
  process.exit(1);
}
console.log('Jedes Werkzeug antwortet, ohne vorher den Browser zu laden.');
