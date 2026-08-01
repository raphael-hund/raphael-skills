#!/usr/bin/env node
// run-verweise-design.mjs — faehrt die gemeinsame Verweis-Wache fuer diesen Skill.
//
//   node evals/run-verweise-design.mjs
//
// Der Name traegt bewusst den Skill statt "-check": eine zweite Datei namens
// run-verweise-check.mjs meldete run-zwillinge-check sofort als abweichende
// Kopie — zu Recht, denn wer die eine liest, glaubt die andere zu kennen.
//
// WARUM (Befund 01.08.2026)
// Die Wache selbst liegt im web-Skill und kann seit jeher jeden Skill pruefen
// (`--skill design`). Nur: sie wurde nie so gefahren. Weder SKILL.md noch ein
// Sammellauf nannte den Aufruf, also lief er nie.
//
// Nachgemessen, was das bedeutet: den spawnSync-Import aus
// design/evals/run-hilfe-check.mjs entfernt. `node --check` sagt "Syntax ok"
// (es IST gueltige Syntax), der web-Lauf der Wache bleibt bei 25/25 — und der
// Fehler faellt erst auf, wenn jemand die Eval zufaellig startet. Mit
// `--skill design` wird er sofort benannt: "benutzt ohne Import: spawnSync".
//
// Dieselbe Luecke hatte mich in dieser Session viermal erwischt: ein fehlender
// Kernmodul-Import ueberlebt jede Syntaxpruefung und stirbt erst zur Laufzeit,
// oft in einem Zweig, den der Testlauf nicht nimmt.
//
// WAS DIESE DATEI TUT
// Sie ruft die web-Wache mit `--skill design` auf und reicht deren Urteil
// durch. Bewusst kein zweites Wachen-Exemplar: zwei Kopien derselben Logik
// laufen auseinander, und genau davor warnt run-zwillinge-check.
//
// Exit 0/1/2 = das Urteil der aufgerufenen Wache.

import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const WACHE = path.resolve(HIER, '..', '..', 'eigene', 'web', 'evals', 'run-verweise-check.mjs');

if (!fs.existsSync(WACHE)) {
  console.error(`Die gemeinsame Verweis-Wache fehlt: ${WACHE}`);
  console.error('Sie liegt im web-Skill und prueft ueber --skill jeden anderen mit.');
  console.error('Ohne sie bleiben fehlende Importe und tote Pfade hier unbemerkt.');
  process.exit(2);
}

const r = spawnSync('node', [WACHE, '--skill', 'design'], {
  encoding: 'utf8', stdio: 'inherit', timeout: 600000,
});

if (r.error && r.error.code === 'ETIMEDOUT') {
  console.error('Die Verweis-Wache hat nach 10 Minuten nicht geantwortet.');
  process.exit(2);
}

process.exit(r.status ?? 2);
