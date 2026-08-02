#!/usr/bin/env node
// run-flag-hilfe-check.mjs — nennt --help jedes Flag, das das Werkzeug kennt?
//
// LAUFZEIT: 14s (gemessen 02.08.2026) — sieben Werkzeuge beider Skills,
// je ein --help-Aufruf.
//
//   node evals/run-flag-hilfe-check.mjs
//
// WARUM (Befund 02.08.2026)
// Sieben Werkzeuge beider Skills fuehren eine Liste erlaubter Flags
// (`FLAG_ERLAUBT`) und brechen bei allem anderen mit Exit 2 ab. Das ist richtig — ein verschlucktes
// Flag prueft etwas anderes als bestellt.
//
// Die Liste und die Hilfe sind aber zwei getrennte Stellen. craft-check.mjs
// kannte `--textseite`, und ein Befund EMPFAHL es sogar ausdruecklich:
//   "kein einziges Bild ueber Icon-Groesse ... (reiner Rechtstext?
//    dann --textseite)"
// In `--help` stand es nicht. Wer den Rat las und daraufhin die Hilfe aufrief,
// fand das Flag dort nicht — und hielt den Rat fuer einen Tippfehler.
//
// Die Gegenrichtung ist genauso schlimm: ein Flag in der Hilfe, das die Liste
// nicht kennt, endet mit "Unbekanntes Flag" und Exit 2. Dann glaubt man, das
// Werkzeug sei kaputt, dabei ist es die Hilfe.
//
// WAS DIESE EVAL PRUEFT
// Fuer jedes Werkzeug mit FLAG_ERLAUBT:
//   1. Jedes Flag der Liste steht in der --help-Ausgabe.
//   2. Jedes Flag der Hilfe steht in der Liste.
// `--help` selbst ist ausgenommen: eine Hilfe, die sich selbst auffuehrt, ist
// Rauschen, und niemand sucht sie dort.
//
// Was sie NICHT prueft: ob die Erklaerung stimmt. Nur, ob das Flag vorkommt.
//
// Exit 0 = jede Liste deckt sich mit ihrer Hilfe. Exit 1 = eine nicht.
// Exit 2 = die Eval selbst kann nicht pruefen.

import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const SKRIPTE = path.join(HIER, '..', 'scripts');
const FRIST_MS = 30000;

let fehler = 0;
let gezaehlt = 0;

function zeile(ok, was, detail) {
  gezaehlt++;
  if (!ok) fehler++;
  console.log(`  [${ok ? 'OK' : '!!'}]   ${was}`);
  if (!ok && detail) console.log(`         ${detail}`);
}

// Kandidaten aus dem Code, nicht aus einer gepflegten Liste: wer eine
// Flag-Liste fuehrt, wird geprueft. Ein neues Werkzeug ist automatisch dabei.
const LISTE_RE = /(?:FLAG_ERLAUBT|ERLAUBTE_FLAGS)\s*=\s*\[([^\]]+)\]/;

// Beide Skills: der design-Skill hat dieselbe Klasse (detect.mjs fuehrt eine
// Liste). Eine Wache, die an der Skill-Grenze haltmacht, prueft die Haelfte.
const ORTE = [SKRIPTE, path.join(HIER, '..', '..', '..', 'design', 'scripts')];

const werkzeuge = [];
for (const ort of ORTE) {
  if (!fs.existsSync(ort)) continue;
  for (const name of fs.readdirSync(ort).sort()) {
    if (!name.endsWith('.mjs')) continue;
    const text = fs.readFileSync(path.join(ort, name), 'utf8');
    const m = text.match(LISTE_RE);
    if (!m) continue;
    let flags = [...m[1].matchAll(/'([a-z-]+)'/g)].map((x) => x[1]).filter((f) => f !== 'help');

    // Ausnahme aus dem CODE, nicht aus einer Liste hier: ein Flag, das in
    // seiner eigenen Zeile als VERALTET markiert ist, gehoert nicht in die
    // Hilfe. detect.mjs nimmt `--fast` nur noch aus Rueckwaerts-
    // Vertraeglichkeit an, ignoriert es und sagt das auch. Es zu bewerben
    // waere schlechter als es zu verschweigen (Befund 02.08.2026).
    // NUR die ausdrueckliche Nennung "// <flag> = VERALTET" zaehlt, nicht
    // jedes Flag in derselben Zeile. Gemessen 02.08.2026: die erste Fassung
    // nahm alle Flags der Zeile mit — in detect.mjs stehen vor dem Kommentar
    // noch gemini, gpt und json, und die galten damit alle als veraltet. Die
    // Wache meldete sie prompt als "in der Hilfe, aber nicht in FLAG_ERLAUBT".
    // Ein Waechter, der aus einer Ausnahme drei Fehlalarme macht, ist
    // schlimmer als gar keiner.
    const veraltet = new Set();
    for (const z of m[1].split('\n')) {
      const nach = z.match(/\/\/\s*([a-z-]+)\s*=\s*VERALTET/i);
      if (nach) veraltet.add(nach[1]);
    }
    flags = flags.filter((f) => !veraltet.has(f));

    if (flags.length) werkzeuge.push({ name, ort, flags });
  }
}

// Eine leere Liste sieht wie ein sauberer Lauf aus. Untergrenze unter dem
// Ist-Stand (7 am 02.08.2026), damit sie stilles Nichtstun faengt.
const MINDESTENS = 4;
if (werkzeuge.length < MINDESTENS) {
  console.error(`Nur ${werkzeuge.length} Werkzeuge mit Flag-Liste gefunden (erwartet mindestens ${MINDESTENS}).`);
  console.error('Das Muster "FLAG_ERLAUBT = [...]" greift nicht mehr — ohne es prueft');
  console.error('diese Eval nichts und meldet trotzdem gruen.');
  process.exit(2);
}

console.log(`Flag-Hilfe — ${werkzeuge.length} Werkzeuge mit erklaerter Flag-Liste\n`);
console.log('Ein Flag, das nur der Code kennt, findet niemand:\n');

for (const { name, ort, flags } of werkzeuge) {
  const r = spawnSync('node', [path.join(ort, name), '--help'],
    { encoding: 'utf8', timeout: FRIST_MS, maxBuffer: 8 * 1024 * 1024 });

  if (r.error && r.error.code === 'ETIMEDOUT') {
    zeile(false, `${name} --help`, `keine Antwort binnen ${FRIST_MS / 1000}s`);
    continue;
  }
  const hilfe = `${r.stdout || ''}${r.stderr || ''}`;
  if (!hilfe.trim()) {
    zeile(false, `${name} --help`, 'keine Ausgabe — ohne Hilfe ist nichts zu vergleichen');
    continue;
  }

  // 1. Kennt der Code ein Flag, das die Hilfe verschweigt?
  const fehltInHilfe = flags.filter((f) => !hilfe.includes(`--${f}`));
  zeile(fehltInHilfe.length === 0, `${name}: alle ${flags.length} Flags stehen in --help`,
    `${fehltInHilfe.map((f) => `--${f}`).join(', ')} fehlt in der Hilfe — `
    + 'wer sie liest, kennt das Flag nicht und benutzt es nie');

  // 2. Nennt die Hilfe ein Flag, das der Code ablehnt? Das ist der teurere
  //    Fall: man tippt es ab und bekommt "Unbekanntes Flag" mit Exit 2.
  const inHilfe = [...new Set([...hilfe.matchAll(/--([a-z][a-z-]+)/g)].map((x) => x[1]))]
    .filter((f) => f !== 'help');
  const fehltImCode = inHilfe.filter((f) => !flags.includes(f));
  zeile(fehltImCode.length === 0, `${name}: kein erfundenes Flag in --help`,
    `${fehltImCode.map((f) => `--${f}`).join(', ')} steht in der Hilfe, aber nicht in `
    + 'FLAG_ERLAUBT — abgetippt endet es mit "Unbekanntes Flag" und Exit 2');
}

console.log(`\n${gezaehlt - fehler}/${gezaehlt} Pruefungen wie erwartet.`);
if (fehler) {
  console.log('Hilfe und Flag-Liste sagen Verschiedenes — eine von beiden fuehrt in die Irre.');
  process.exit(1);
}
console.log('Jedes Flag steht in der Hilfe, und jedes in der Hilfe existiert.');
