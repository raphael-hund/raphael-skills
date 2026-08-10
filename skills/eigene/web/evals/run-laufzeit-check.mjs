#!/usr/bin/env node
// run-laufzeit-check.mjs — stimmen die dokumentierten Laufzeiten noch?
//
// LAUFZEIT: 266s (gemessen 02.08.2026) — sie faehrt vier Evals nacheinander.
// Wer das nicht weiss, haelt sie fuer haengen geblieben.
//
//   node evals/run-laufzeit-check.mjs
//
// WARUM (Befund 02.08.2026)
// Fuenf Evals nennen im Kopf ihre gemessene Laufzeit — damit niemand sie nach
// fuenf Minuten fuer haengen geblieben haelt und abbricht. Genau das war mir
// selbst zweimal passiert, bevor die Zahlen dastanden.
//
// Eine solche Zahl altert wie jede andere: sie bleibt plausibel, waehrend der
// Lauf laenger wird. Diese Session hat sechs Bilanzformeln und ein Dutzend
// Doku-Zahlen genau daran scheitern sehen. Am selben Tag fiel eine bereits
// falsche auf: run-struktur stand mit "43s" in SKILL.md, gemessen aber 13s —
// die Zahl stammte aus einer Zeit, als der Sammellauf mehr enthielt.
//
// WAS DIESE EVAL PRUEFT
// Jede Eval mit "LAUFZEIT: <n>s" im Kopf wird einmal gefahren und die Zeit
// verglichen. Die Grenze ist bewusst weit: Faktor 2 nach oben, Faktor 3 nach
// unten. Eine Maschine unter Last ist langsamer, eine leere schneller — enge
// Grenzen wuerden diese Wache zum Zufallsgenerator machen, und ein Test, der
// zufaellig durchfaellt, wird abgeschaltet statt repariert.
//
// Was sie NICHT prueft: ob die Zahl beim Schreiben stimmte. Nur, ob sie heute
// noch traegt.
//
// AUSGENOMMEN: Evals, die selbst laenger als 5 Minuten brauchen. Eine Wache,
// die eine halbe Stunde laeuft, wird nicht gefahren — und was niemand faehrt,
// prueft nichts. Gemessen 02.08.2026: mit run-eval-umfang (13 Min) im Bund
// lief dieser Check ueber 21 Minuten und wurde vom Timeout abgeschnitten,
// ohne eine einzige Ergebniszeile. Wer eine solche Angabe pruefen will, faehrt
// die Eval einzeln und vergleicht von Hand.
//
// Exit 0 = jede Angabe traegt. Exit 1 = mindestens eine ist weit daneben.
// Exit 2 = die Eval selbst kann nicht pruefen.

import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const FRIST_MS = 1_800_000;

const ZU_LANG_FUER_DIESE_WACHE = 300;   // Sekunden, siehe Kopf

// Grosszuegig, aus gutem Grund (siehe Kopf).
const ZU_LANGSAM = 2.0;
const ZU_SCHNELL = 3.0;

let fehler = 0;
let gezaehlt = 0;

function zeile(ok, was, detail) {
  gezaehlt++;
  if (!ok) fehler++;
  console.log(`  [${ok ? 'OK' : '!!'}]   ${was}`);
  if (!ok && detail) console.log(`         ${detail}`);
}

// Kandidaten aus dem Code, nicht aus einer gepflegten Liste: wer eine Zeit
// nennt, wird geprueft. Eine neue Angabe ist damit automatisch dabei.
const kandidaten = [];
const zuLangsam = [];
for (const datei of fs.readdirSync(HIER).sort()) {
  if (!datei.startsWith('run-') || !datei.endsWith('.mjs')) continue;
  if (datei === path.basename(fileURLToPath(import.meta.url))) continue;
  const kopf = fs.readFileSync(path.join(HIER, datei), 'utf8').slice(0, 3000);
  // "LAUFZEIT: 70s" oder "LAUFZEIT: rund 13 Minuten (782s gemessen ...)"
  const m = kopf.match(/LAUFZEIT:[^\n]*?(\d+)\s*s\b/);
  if (!m) continue;
  const soll = Number(m[1]);
  if (soll > ZU_LANG_FUER_DIESE_WACHE) {
    zuLangsam.push(`${datei} (${soll}s)`);
    continue;
  }
  kandidaten.push({ datei, soll });
}

// Eine leere Liste sieht wie ein sauberer Lauf aus. Untergrenze unter dem
// Ist-Stand (5 am 02.08.2026), damit sie stilles Nichtstun faengt.
const MINDESTENS = 3;
if (kandidaten.length < MINDESTENS) {
  console.error(`Nur ${kandidaten.length} Evals mit LAUFZEIT-Angabe gefunden (erwartet mindestens ${MINDESTENS}).`);
  console.error('Die Erkennung ueber den Kopfkommentar greift nicht mehr —');
  console.error('ohne sie prueft diese Eval nichts und meldet trotzdem gruen.');
  process.exit(2);
}

console.log(`Laufzeit-Check — ${kandidaten.length} Evals mit dokumentierter Zeit\n`);
console.log('Eine Zahl im Kopf altert wie jede andere:\n');
if (zuLangsam.length) {
  console.log(`  [i]    ${zuLangsam.length} zu langsam fuer diese Wache, einzeln pruefen: ${zuLangsam.join(', ')}`);
  console.log('');
}

for (const { datei, soll } of kandidaten) {
  const start = Date.now();
  const r = spawnSync('node', [path.join(HIER, datei)],
    { encoding: 'utf8', timeout: FRIST_MS, maxBuffer: 64 * 1024 * 1024 });
  const ist = Math.round((Date.now() - start) / 1000);

  if (r.error && r.error.code === 'ETIMEDOUT') {
    zeile(false, `${datei}: ${soll}s dokumentiert`,
      `laeuft laenger als ${FRIST_MS / 60000} Minuten — die Angabe ist wertlos`);
    continue;
  }

  // Exit 2 heisst "konnte nicht messen" — belegter Port, fehlendes Werkzeug,
  // kaputte Umgebung. Die Eval bricht dann in Sekunden ab, und ihre Dauer sagt
  // nichts ueber die dokumentierte Zeit.
  //
  // Gemessen 02.08.2026: ein Server aus einem abgebrochenen Lauf hielt Port
  // 5511 besetzt, run-ordner-check brach nach 1s mit Exit 2 ab, und diese
  // Wache meldete "123s dokumentiert, 1s gemessen — die Eval ist geschrumpft".
  // Ein Fehlalarm, der die richtige Zahl als falsch hinstellt, ist schlimmer
  // als gar keine Wache: beim naechsten Mal glaubt man ihr nicht mehr.
  if (r.status === 2) {
    zeile(true, `${datei}: nicht messbar (Exit 2) — Angabe ungeprueft`,
      null);
    console.log(`         ${`${r.stderr || ''}`.trim().split('\n')[0].slice(0, 60)}`);
    continue;
  }

  // Sonst gilt: der Exit-Code ist NICHT das Kriterium. Eine rote Eval kann
  // eine korrekte Laufzeit haben. Gemessen wird die Dauer.
  const zuLang = ist > soll * ZU_LANGSAM;
  const zuKurz = soll > 5 && ist * ZU_SCHNELL < soll;
  zeile(!zuLang && !zuKurz, `${datei}: ${soll}s dokumentiert, ${ist}s gemessen`,
    zuLang
      ? `mehr als doppelt so lang — die Angabe fuehrt in die Irre, neu messen`
      : `weniger als ein Drittel — die Eval ist geschrumpft oder die Zahl war nie richtig`);
}

console.log(`\n${gezaehlt - fehler}/${gezaehlt} Angaben tragen noch.`);
if (fehler) {
  console.log('Eine dokumentierte Laufzeit stimmt nicht mehr — neu messen und eintragen.');
  process.exit(1);
}
console.log('Jede dokumentierte Laufzeit deckt sich mit dem echten Lauf.');
