#!/usr/bin/env node
// run-zahlen-gegen-lauf.mjs — stimmt die dokumentierte Fallzahl mit dem Lauf?
//
// LAUFZEIT: 120s (gemessen 02.08.2026) — sie faehrt jede genannte Eval einmal.
//
//   node evals/run-zahlen-gegen-lauf.mjs
//
// WARUM (Befund 02.08.2026)
// Alle bisherigen Zahl-Wachen vergleichen TEXT MIT TEXT: die Doku gegen den
// Kopfkommentar, eine Nennung gegen die andere. Sie finden jeden Widerspruch —
// und genau deshalb finden sie eine ganze Klasse nicht: eine Zahl, die an
// beiden Stellen GLEICH falsch steht, ist widerspruchsfrei.
//
// Gemessen am selben Tag: SKILL.md nannte
//   "evals/run-variablen-check.mjs — 8 Regeln"
// Der echte Lauf endete mit "9/9 Pruefungen wie erwartet". Keine Wache schlug
// an, weil die 8 nirgendwo sonst stand. Wer die Eval erweitert und die Doku
// vergisst, erzeugt genau diesen Zustand — und er faellt nie auf.
//
// WAS DIESE EVAL PRUEFT
// Jede in SKILL.md mit "— <n> Faelle" oder "— <n> Regeln" beschriebene Eval
// wird einmal gefahren und ihre Bilanzzeile ("35/35 wie erwartet") mit der
// dokumentierten Zahl verglichen. Der NENNER zaehlt, nicht der Zaehler: eine
// rote Eval hat trotzdem die richtige Fallzahl.
//
// Was sie NICHT prueft: ob die Faelle sinnvoll sind. Nur, ob es so viele sind,
// wie die Doku behauptet.
//
// AUSGENOMMEN: sich selbst und run-eval-umfang (der wiederum diese hier faehrt
// — sonst laufen beide endlos ineinander).
//
// Exit 0 = jede Zahl deckt sich. Exit 1 = mindestens eine nicht.
// Exit 2 = die Eval selbst kann nicht pruefen.

import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const MD = path.join(HIER, '..', 'SKILL.md');
const FRIST_MS = 900_000;
const SELBST = path.basename(fileURLToPath(import.meta.url));

let fehler = 0;
let gezaehlt = 0;

function zeile(ok, was, detail) {
  gezaehlt++;
  if (!ok) fehler++;
  console.log(`  [${ok ? 'OK' : '!!'}]   ${was}`);
  if (!ok && detail) console.log(`         ${detail}`);
}

if (!fs.existsSync(MD)) {
  console.error(`SKILL.md nicht gefunden unter ${MD}.`);
  console.error('Ohne sie hat diese Eval nichts zu vergleichen und saehe gruen aus.');
  process.exit(2);
}

// Kandidaten aus der Doku, nicht aus einer gepflegten Liste: wer dort eine
// Fallzahl nennt, wird gemessen. Eine neue Angabe ist damit automatisch dabei.
const kandidaten = [];
const md = fs.readFileSync(MD, 'utf8');
for (const m of md.matchAll(/(?:evals\/)?(run-[a-z-]+\.mjs)\s+—\s+(\d+)\s+(?:Faelle|Fälle|Regeln)/g)) {
  if (m[1] === SELBST || m[1] === 'run-eval-umfang.mjs') continue;
  if (kandidaten.some((k) => k.datei === m[1])) continue;
  kandidaten.push({ datei: m[1], soll: Number(m[2]) });
}

// Eine leere Liste sieht wie ein sauberer Lauf aus. Untergrenze unter dem
// Ist-Stand (4 am 02.08.2026), damit sie stilles Nichtstun faengt.
const MINDESTENS = 3;
if (kandidaten.length < MINDESTENS) {
  console.error(`Nur ${kandidaten.length} Evals mit dokumentierter Fallzahl gefunden (erwartet mindestens ${MINDESTENS}).`);
  console.error('Die Erkennung aus SKILL.md greift nicht mehr — ohne sie prueft');
  console.error('diese Eval nichts und meldet trotzdem gruen.');
  process.exit(2);
}

console.log(`Zahlen gegen den Lauf — ${kandidaten.length} Evals mit dokumentierter Fallzahl\n`);
console.log('Eine Zahl, die an beiden Stellen gleich falsch steht, ist widerspruchsfrei:\n');

for (const { datei, soll } of kandidaten) {
  const pfad = path.join(HIER, datei);
  if (!fs.existsSync(pfad)) {
    zeile(false, `${datei}: in SKILL.md genannt`, 'Datei existiert nicht — umbenannt oder geloescht?');
    continue;
  }

  const r = spawnSync('node', [pfad],
    { encoding: 'utf8', timeout: FRIST_MS, maxBuffer: 64 * 1024 * 1024 });

  if (r.error && r.error.code === 'ETIMEDOUT') {
    zeile(false, `${datei}: ${soll} dokumentiert`, `laeuft laenger als ${FRIST_MS / 60000} Minuten — nicht messbar`);
    continue;
  }

  // Exit 2 heisst "konnte gar nicht erst pruefen" — belegter Port, fehlendes
  // Werkzeug. Die Bilanzzeile fehlt dann oder ist unvollstaendig, und ein
  // Fehlalarm, der die richtige Zahl als falsch hinstellt, ist schlimmer als
  // gar keine Wache.
  if (r.status === 2) {
    zeile(true, `${datei}: nicht messbar (Exit 2) — Angabe ungeprueft`, null);
    console.log(`         ${`${r.stderr || ''}`.trim().split('\n')[0].slice(0, 60)}`);
    continue;
  }

  // Der NENNER ist die Fallzahl. Der Zaehler sagt, wie viele durchkamen — eine
  // rote Eval hat trotzdem die richtige Anzahl Faelle.
  const zeilen = `${r.stdout || ''}`.trim().split('\n');
  let ist = null;
  for (let i = zeilen.length - 1; i >= 0; i -= 1) {
    const b = zeilen[i].match(/^\s*(\d+)\/(\d+)\b/);
    if (b) { ist = Number(b[2]); break; }
  }

  if (ist === null) {
    zeile(false, `${datei}: ${soll} dokumentiert`,
      'keine Bilanzzeile "<n>/<m>" gefunden — ohne sie ist die Zahl nicht pruefbar');
    continue;
  }

  zeile(ist === soll, `${datei}: ${soll} dokumentiert, ${ist} gelaufen`,
    `die Doku nennt eine andere Zahl als der Lauf — beide Textstellen koennen sich einig und trotzdem falsch sein`);
}

console.log(`\n${gezaehlt - fehler}/${gezaehlt} Fallzahlen decken sich mit dem Lauf.`);
if (fehler) {
  console.log('Mindestens eine dokumentierte Fallzahl stimmt nicht mit der Wirklichkeit.');
  process.exit(1);
}
console.log('Jede dokumentierte Fallzahl deckt sich mit dem echten Lauf.');
