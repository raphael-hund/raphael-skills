#!/usr/bin/env node
/**
 * run-sabotage.mjs — merken die Evals, wenn ihr Pruefer kaputtgeht?
 *
 * Die Frage hinter allen anderen. Eine Eval, die 22/22 meldet, beweist damit
 * NICHT, dass sie etwas pruefen wuerde — sie beweist nur, dass heute nichts
 * kaputt ist. Der Unterschied faellt erst auf, wenn man den Pruefer absichtlich
 * beschaedigt.
 *
 * Befund 30.07.2026, genau so gemessen: von sechs sabotierten Pruefern fiel
 * einer durch. `craft-check.mjs` — `add('BLOCK', 'M3', …)` zu
 * `add('WARN', 'M3', …)` geaendert, und die Eval meldete weiter 22/22. Sie warf
 * `blockers` und `warns` in einen Topf und fragte nur nach der ID. Zehn der 23
 * Regeln sind BLOCK-Stufe; wird eine still zur Warnung, laeuft eine Seite durch,
 * die haette stoppen muessen.
 *
 * Dieser Lauf macht die Messung wiederholbar. Er
 *   1. kopiert den Pruefer weg,
 *   2. baut EINEN gezielten Schaden ein,
 *   3. laesst die zugehoerige Eval laufen — sie MUSS reissen,
 *   4. stellt das Original wieder her (auch bei Absturz, via finally).
 *
 * Er aendert nichts dauerhaft. Wer ihn abbricht, sollte trotzdem
 * `git status skills/eigene/web/scripts/` pruefen.
 *
 *   node evals/run-sabotage.mjs
 *   node evals/run-sabotage.mjs --nur craft
 *
 * Exit 0 = jede Eval merkt ihren Schaden. Exit 1 = mindestens eine ist blind.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const SKILL = path.join(HIER, '..');
const nurArg = process.argv.indexOf('--nur');
const NUR = nurArg >= 0 ? process.argv[nurArg + 1] : null;

// Jeder Schaden ist EINE Zeile und trifft genau das, was der Pruefer entscheidet:
// nicht "Datei kaputt machen" (das faengt jeder Parser), sondern "still das
// falsche Urteil faellen". Das ist der Fall, der im Betrieb wirklich vorkommt.
const SCHAEDEN = [
  {
    kurz: 'tastatur',
    pruefer: 'scripts/tastatur-check.mjs',
    eval: 'evals/run-tastatur-check.mjs',
    was: 'Blocker-Zweig abgeschaltet — meldet nie eine fehlende Tastaturbedienung',
    von: '    if (!erfuellt) {',
    zu: '    if (false) {',
  },
  {
    kurz: 'motion',
    pruefer: 'scripts/motion-check.mjs',
    eval: 'evals/run-motion-check.mjs',
    was: 'Kurven-Vielfalt wird nie zum Blocker',
    von: 'if (anzahl >= VIELFALT_BLOCK) {',
    zu: 'if (false) {',
  },
  {
    kurz: 'formular',
    pruefer: 'scripts/formular-check.mjs',
    eval: 'evals/run-formular-check.mjs',
    was: 'F1 (falscher input-type) faellt von BLOCK auf WARN',
    von: "add('BLOCK', 'F1'",
    zu: "add('WARN', 'F1'",
  },
  {
    kurz: 'craft',
    pruefer: 'scripts/craft-check.mjs',
    eval: 'evals/run-craft-check.mjs',
    // Der Fall, der diesen Lauf ausgeloest hat: bis zum 30.07.2026 blieb die
    // Eval hier bei 22/22, weil sie den Schweregrad gar nicht las.
    was: 'M3 (Satzspiegel) faellt von BLOCK auf WARN',
    von: "add('BLOCK', 'M3'",
    zu: "add('WARN', 'M3'",
  },
  {
    kurz: 'import',
    pruefer: 'scripts/import-check.mjs',
    eval: 'evals/run-import-check.mjs',
    was: 'erfundene Importe werden gefunden, aber nicht gemeldet',
    von: 'befunde.push({ datei: relative(SRC, f)',
    zu: 'void ({ datei: relative(SRC, f)',
  },
  {
    kurz: 'lib-exporte',
    pruefer: 'scripts/lib-exporte.mjs',
    eval: 'evals/run-lib-lookup.mjs',
    was: 'Typdatei-Aufloesung liefert nie ein Ziel',
    von: "      if (existsSync(p) && /\\.m?ts$/.test(p)) return p;",
    zu: '      if (existsSync(p)) return null;',
  },
];

let fehler = 0;
const zeile = (ok, text, detail) => {
  if (!ok) fehler++;
  console.log(`  [${ok ? 'OK' : '!!'}]   ${text}`);
  if (detail) console.log(`         ${detail}`);
};

function laufEval(rel) {
  try {
    execFileSync('node', [path.join(SKILL, rel)],
      { encoding: 'utf8', timeout: 900000, cwd: SKILL });
    return 0;                       // Exit 0 = Eval fand alles in Ordnung
  } catch (e) {
    return e.status ?? 1;
  }
}

console.log('\nSabotage — merkt die Eval, wenn ihr Pruefer kaputtgeht?\n');
console.log('Jeder Schaden ist EINE Zeile und faellt still das falsche Urteil.\n');

for (const s of SCHAEDEN) {
  if (NUR && NUR !== s.kurz) continue;
  const datei = path.join(SKILL, s.pruefer);
  if (!fs.existsSync(datei)) { zeile(false, `${s.kurz}: ${s.pruefer} fehlt`); continue; }

  const original = fs.readFileSync(datei, 'utf8');
  if (!original.includes(s.von)) {
    // Wichtiger Fall: der Schaden liess sich gar nicht einbauen. Das ist KEIN
    // Bestehen — es heisst, dieser Lauf hat nichts gemessen. Beim Bauen ist mir
    // genau das zweimal passiert (ein sed traf nicht, ein Python-Ausdruck brach
    // an Anfuehrungszeichen), und beide Male sah die Ausgabe nach Erfolg aus.
    zeile(false, `${s.kurz}: Ankertext nicht gefunden — Schaden NICHT eingebaut`,
      `gesucht: ${s.von.trim().slice(0, 60)}`);
    continue;
  }

  try {
    fs.writeFileSync(datei, original.replace(s.von, s.zu));
    // Gegenprobe, dass die Aenderung wirklich auf der Platte steht.
    if (fs.readFileSync(datei, 'utf8') === original) {
      zeile(false, `${s.kurz}: Datei unveraendert trotz Schreibversuch`);
      continue;
    }
    const code = laufEval(s.eval);
    zeile(code !== 0, `${s.kurz}: ${s.was}`,
      code === 0
        ? `${path.basename(s.eval)} meldet trotzdem Exit 0 — die Eval ist an dieser Stelle blind`
        : null);
  } finally {
    // Immer zurueck, auch wenn die Eval abstuerzt oder der Lauf abgebrochen wird.
    fs.writeFileSync(datei, original);
  }
}

// Nach allem: sind wirklich alle Pruefer wieder im Originalzustand? Ein
// Sabotage-Lauf, der Schaden hinterlaesst, ist schlimmer als keiner.
console.log('\nAlle Pruefer wieder im Originalzustand:\n');
{
  let sauber = true;
  const rest = [];
  for (const s of SCHAEDEN) {
    const datei = path.join(SKILL, s.pruefer);
    if (fs.existsSync(datei) && fs.readFileSync(datei, 'utf8').includes(s.zu)
      && !fs.readFileSync(datei, 'utf8').includes(s.von)) {
      sauber = false; rest.push(s.pruefer);
    }
  }
  zeile(sauber, `${SCHAEDEN.length} Pruefer geprueft, keine Schadensspur`,
    sauber ? null : `noch beschaedigt: ${rest.join(', ')} — SOFORT git checkout`);
}

const gesamt = (NUR ? 1 : SCHAEDEN.length) + 1;
console.log(`\n${gesamt - fehler}/${gesamt} wie erwartet.`);
if (fehler) {
  console.log('Mindestens eine Eval merkt ihren eigenen Schaden nicht.');
  process.exit(1);
}
console.log('Jede Eval faellt um, wenn ihr Pruefer faellt.');
