#!/usr/bin/env node
/**
 * run-doku-zahlen.mjs — verspricht SKILL.md noch den echten Umfang?
 *
 * Gegenstueck zum gleichnamigen Lauf im web-Skill, aber fuer ein anderes Format:
 * dort stehen die Zahlen als Kommentar hinter dem Aufruf ("# 12 Faelle"), hier
 * in Prosa ("(39 Faelle)", "13 von 13"). Ein Regex, der das eine kann, kann das
 * andere nicht — deshalb eine eigene Datei statt eines gemeinsamen Kerns.
 *
 * Warum es das braucht: dieses SKILL.md nennt drei Zahlen, die alle nachmessbar
 * sind, und keine davon war an eine Messung gebunden.
 *
 *   39 Faelle          Umfang von run-browser-detect-check.mjs
 *   37 Browser-Regeln  Abdeckung im Browser-Pfad
 *   13 von 13          Abdeckung im Datei-Modus
 *
 * Wer eine Regel ergaenzt, aendert den Detektor und die Eval — nicht die Prosa.
 * Die Zahl bleibt stehen und wird mit jedem Umbau ein Stueck falscher. Genau so
 * stand im web-SKILL "12 Faelle" bei einer Eval, die 22 fuhr.
 *
 * Gemessen wird gegen die LAUFENDEN Evals, nicht gegen eine zweite Liste. Eine
 * Sollstand-Datei waere nur eine dritte Zahl, die auch veralten kann.
 *
 *   node evals/run-doku-zahlen.mjs
 *
 * Exit 0 = jede Zahl stimmt. Exit 1 = mindestens eine ist falsch.
 * Exit 2 = eine Eval lief nicht (nicht geprueft, nicht bestanden).
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const SKILL = path.join(HIER, '..');
const MD = path.join(SKILL, 'SKILL.md');
if (!fs.existsSync(MD)) {
  console.error(`FEHLER: SKILL.md nicht gefunden: ${MD}`);
  process.exit(2);
}
const md = fs.readFileSync(MD, 'utf8');

let fehler = 0;
// Selbst zaehlen statt eine feste Zahl zu behaupten. Die Bilanz stand auf
// einer festen 9 — achte Eval dieser Session mit dieser Falle. Eine feste
// Zahl in einer Bilanzformel altert still, weil sie plausibel bleibt.
let gezaehlt = 0;
const zeile = (ok, text, detail) => {
  gezaehlt++;
  if (!ok) fehler++;
  console.log(`  [${ok ? 'OK' : '!!'}]   ${text}`);
  if (detail) console.log(`         ${detail}`);
};

// Eine Eval laufen lassen und ihre Schlusszahl holen. Bricht sie ab, ist das
// Exit 2 — "nicht geprueft" ist nicht "bestanden", dieselbe Trennung wie im Tor.
function lauf(datei, extraEnv = {}) {
  try {
    const aus = execFileSync('node', [path.join(HIER, datei)],
      { encoding: 'utf8', timeout: 1700000, cwd: SKILL, env: { ...process.env, ...extraEnv } });
    return { aus };
  } catch (e) {
    const aus = `${e.stdout || ''}${e.stderr || ''}`;
    if (!aus) return { kaputt: String(e.message).split('\n')[0] };
    return { aus, code: e.status };
  }
}

const gesamtzahl = (aus) => {
  const m = [...aus.matchAll(/^(\d+)\/(\d+)(?: Faelle)? wie erwartet\./gm)].pop();
  return m ? Number(m[2]) : null;
};

console.log('\nDoku-Zahlen (design) — verspricht SKILL.md noch den echten Umfang?\n');

// --- 1. Umfang der Browser-Eval ------------------------------------------
{
  const doku = md.match(/run-browser-detect-check\.mjs`?\s*\((\d+)\s*F(?:ä|ae)lle/);
  if (!doku) {
    zeile(false, 'keine Fallzahl zu run-browser-detect-check.mjs in SKILL.md gefunden',
      'entweder umformuliert oder entfallen — dann dieses Muster anpassen');
  } else {
    // Eigener Port: der Standardport kollidiert mit einem parallel laufenden
    // Browser-Lauf, und dann misst diese Wache einen Abbruch statt der Zahl.
    const r = lauf('run-browser-detect-check.mjs', { BROWSER_EVAL_PORT: '5477' });
    if (r.kaputt) {
      console.error(`\nFEHLER: run-browser-detect-check.mjs lief nicht (${r.kaputt}).`);
      console.error('Das ist kein Befund ueber die Zahl — nicht geprueft.');
      process.exit(2);
    }
    const echt = gesamtzahl(r.aus);
    zeile(echt === Number(doku[1]),
      `run-browser-detect-check.mjs: SKILL.md sagt ${doku[1]}, Lauf sagt ${echt ?? '?'}`,
      echt === Number(doku[1]) ? null : 'Zahl in SKILL.md nachziehen');
  }
}

// --- 2. Abdeckung im Browser-Pfad ----------------------------------------
// "Alle 37 Browser-Regeln sind belegt" — die 37 ist die Zahl der Regeln in
// rules/checks.mjs, und "belegt" heisst: der Bericht der Eval nennt 0 offene.
{
  const doku = md.match(/Alle (\d+) Browser-Regeln/);
  const echt = [...new Set(
    (fs.readFileSync(path.join(SKILL, 'scripts', 'detector', 'rules', 'checks.mjs'), 'utf8')
      .match(/id: '([a-z0-9-]+)'/g) || []).map((x) => x),
  )].length;
  if (!doku) {
    zeile(false, 'keine Aussage "Alle N Browser-Regeln" in SKILL.md gefunden');
  } else {
    zeile(echt === Number(doku[1]),
      `Browser-Regeln: SKILL.md sagt ${doku[1]}, checks.mjs hat ${echt}`,
      echt === Number(doku[1]) ? null : 'Zahl in SKILL.md nachziehen');
  }
}

// --- 3. Abdeckung im Datei-Modus -----------------------------------------
// "alles belegt, 13 von 13" — beide Zahlen muessen gleich sein UND zur
// Restliste der Datei-Eval passen (die meldet, wie viele offen sind).
{
  const doku = md.match(/alles belegt, (\d+) von (\d+)/);
  if (!doku) {
    zeile(false, 'keine Aussage "alles belegt, N von M" in SKILL.md gefunden');
  } else if (doku[1] !== doku[2]) {
    zeile(false, `"${doku[1]} von ${doku[2]}" behauptet Vollstaendigkeit, ist aber keine`);
  } else {
    const r = lauf('run-detect-check.mjs');
    if (r.kaputt) {
      console.error(`\nFEHLER: run-detect-check.mjs lief nicht (${r.kaputt}). Nicht geprueft.`);
      process.exit(2);
    }
    const offen = r.aus.match(/^\s*(\d+) im Datei-Modus herstellbar und noch ohne Fixture/m);
    if (!offen) {
      zeile(false, 'die Datei-Eval nennt keine Restliste mehr',
        'ohne sie ist "alles belegt" unbelegt — Ausgabeform geaendert?');
    } else {
      zeile(Number(offen[1]) === 0,
        `Datei-Modus: SKILL.md sagt "alles belegt", Eval meldet ${offen[1]} offen`,
        Number(offen[1]) === 0 ? null : 'entweder Fixtures nachtragen oder die Aussage abschwaechen');
    }
  }
}

// --- 4. Der deutsche Regelsatz und seine Eval ---------------------------
// design/SKILL.md und copywriting/references/floskel-verbote.md nennen BEIDE die
// Fallzahl derselben Eval. Zwei Dateien, eine Wahrheit — und beide standen am
// 30.07.2026 auf "30 Faelle inkl. 8 Gegenproben", waehrend die Eval 50 mit 14
// fuhr. Eine Zahl, die an zwei Orten steht, veraltet doppelt so leicht.
{
  // NICHT ueber lauf(): das setzt den Pfad relativ zum evals-Ordner zusammen
  // (`design/evals/../eigene/...`) und landet neben dem Skill statt daneben.
  // Erster Versuch meldete deshalb "Eval faehrt null" — kein Befund ueber die
  // Zahl, sondern ein Pfadfehler in der Wache selbst.
  const slopDe = path.join(SKILL, '..', 'eigene', 'web', 'evals', 'run-slop-de-check.mjs');
  let r;
  try {
    r = { aus: execFileSync('node', [slopDe], { encoding: 'utf8', timeout: 600000 }) };
  } catch (e) {
    const aus = `${e.stdout || ''}${e.stderr || ''}`;
    r = aus ? { aus } : { kaputt: String(e.message).split('\n')[0] };
  }
  if (r.kaputt) {
    console.error(`\nFEHLER: run-slop-de-check.mjs lief nicht (${r.kaputt}). Nicht geprueft.`);
    process.exit(2);
  }
  const echt = gesamtzahl(r.aus);
  const hier = md.match(/run-slop-de-check\.mjs \((\d+)\/\d+, inkl\. (\d+)/);
  const floskel = path.join(SKILL, '..', 'eigene', 'copywriting', 'references', 'floskel-verbote.md');
  const dort = fs.existsSync(floskel)
    ? fs.readFileSync(floskel, 'utf8').match(/run-slop-de-check\.mjs`?, (\d+) F(?:ä|ae)lle inkl\. (\d+)/)
    : null;

  zeile(hier && Number(hier[1]) === echt,
    `design/SKILL.md: sagt ${hier ? hier[1] : '?'}, Eval faehrt ${echt}`,
    hier && Number(hier[1]) === echt ? null : 'Zahl nachziehen');
  zeile(dort && Number(dort[1]) === echt,
    `copywriting/floskel-verbote.md: sagt ${dort ? dort[1] : '?'}, Eval faehrt ${echt}`,
    dort && Number(dort[1]) === echt ? null
      : 'dieselbe Zahl steht an zwei Orten — beide nachziehen');
}

// --- Die Fallzahl von run-detect-check ------------------------------------
// Sie steht an ZWEI Stellen (Scorecard und Fliesstext) und war an keiner
// gebunden: beide sagten 17, waehrend die Eval 25 fuhr (31.07.2026). Dieselbe
// Klasse wie im web-Skill, wo die Zahl an drei Orten stand.
{
  const r = lauf('run-detect-check.mjs');
  if (r.kaputt) {
    console.error(`\nFEHLER: run-detect-check.mjs lief nicht (${r.kaputt}). Nicht geprueft.`);
    process.exit(2);
  }
  const echt = gesamtzahl(r.aus);
  const inScorecard = md.match(/run-detect-check\.mjs — (\d+) F(?:ä|ae)lle/);
  const imText = md.match(/^(\d+) F(?:ä|ae)lle plus Kontrollseite/m);
  for (const [wo, treffer] of [['Scorecard', inScorecard], ['Fliesstext', imText]]) {
    zeile(treffer && echt !== null && Number(treffer[1]) === echt,
      `run-detect-check (${wo}): sagt ${treffer ? treffer[1] : '?'}, Lauf faehrt ${echt ?? '?'}`,
      treffer && Number(treffer[1]) === echt ? null : 'Zahl nachziehen');
  }
}

// --- 5. Die eval_scorecard im Frontmatter --------------------------------
// Sie ist der erste Ort, den ein fremder Agent liest. Im web-Skill stand sie
// am Tag ihrer Entstehung schon falsch (24 statt 25) — eine Zahl ueber die
// Pruefung, die selbst ungeprueft ist. Hier gleich mit Wache angelegt.
{
  const dateien = fs.readdirSync(HIER).filter((f) => /^run-.*\.mjs$/.test(f)).length;
  const genannt = (md.match(/^\s*- "evals\/run-/gm) || []).length;
  zeile(genannt === dateien,
    `Scorecard: nennt ${genannt} Evals, im Ordner liegen ${dateien}`,
    genannt === dateien ? null : 'jede Eval gehoert in die Scorecard');

  // Die drei Zahlen der Wachen selbst — sie messen sich hier gegenseitig.
  const sab = md.match(/run-sabotage\.mjs — (\d+) F(?:ä|ae)lle/);
  const r = lauf('run-sabotage.mjs');
  const echtSab = r.kaputt ? null : gesamtzahl(r.aus);
  zeile(sab && echtSab !== null && Number(sab[1]) === echtSab,
    `Scorecard: sagt ${sab ? sab[1] : '?'} Sabotage-Faelle, Lauf faehrt ${echtSab ?? '?'}`,
    sab && Number(sab[1]) === echtSab ? null : 'Zahl in der Scorecard nachziehen');
}

// --- Dieselbe Eval, zwei verschiedene Zahlen ------------------------------
// Jede Pruefung oben vergleicht eine Doku-Zahl mit einem echten Lauf. Keine
// sieht, ob DIESELBE Zahl an zwei Stellen VERSCHIEDEN dasteht: jede fuer sich
// kann stimmen, wenn sie zu verschiedenen Zeiten gemessen wurden.
//
// Gemessen 02.08.2026 im web-Skill: "37 Evals" in der Scorecard, "36 Evals
// nacheinander" in der Kommandozeile. Die zweite stammte vom Vortag. Eine
// Zahl, die an zwei Stellen steht, altert an einer davon zuerst.
console.log('\nDieselbe Sache, dieselbe Zahl:\n');
{
  // Auch die Eval-KOEPFE, nicht nur SKILL.md — sonst findet die Wache nur den
  // halben Widerspruch. Historische Befunde und zitierte Doku-Beispiele
  // bleiben aussen vor: sie nennen absichtlich alte Zahlen.
  let doku = fs.readFileSync(MD, 'utf8');
  for (const datei of fs.readdirSync(HIER).sort()) {
    if (!datei.startsWith('run-') || !datei.endsWith('.mjs')) continue;
    const kopf = fs.readFileSync(path.join(HIER, datei), 'utf8').slice(0, 3000);
    const ohneBeispiel = kopf.replace(/^ \*\s{3,}node [^\n]*$/gm, '');
    doku += `\n${ohneBeispiel
      .split(/\n\s*\*?\s*\n/)
      .filter((abs) => !/Befund \d{2}\.\d{2}\.\d{4}|stand auf|nannte|hiess frueher|Zaehlweisen|Erster Versuch|Vorher/i.test(abs))
      .join('\n\n')}`;
  }
  const gefunden = new Map();
  // Ueber Zeilengrenzen: in Kommandozeilen steht der Name oben, die Zahl in
  // der Fortsetzung darunter.
  // Fenster eng halten und KEINEN zweiten Dateinamen ueberspringen: mit 120
  // Zeichen ohne diese Sperre ordnete das Muster eine Zahl dem falschen
  // Dateinamen zu — "run-bilder-check.mjs (12 Faelle)" landete bei
  // run-craft-check, weil dessen Name 80 Zeichen vorher stand. Ein Waechter,
  // der Befunde erfindet, wird abgeschaltet (gemessen 02.08.2026).
  const re = /(run-[a-z-]+\.mjs)((?:(?!run-[a-z-]+\.mjs)[\s\S]){0,120}?)(\d+)\s+(Faelle|Fälle|Evals|Werkzeuge|Angaben)/g;
  for (const m of doku.matchAll(re)) {
    // "Faelle" und "Fälle" meinen dasselbe — ohne diese Zusammenfassung
    // gelten sie als zwei Schluessel, und ein Widerspruch zwischen beiden
    // Schreibweisen faellt nie auf (gemessen 02.08.2026: 35 vs 30 blieb
    // unentdeckt, weil die eine Stelle "Fälle" und die andere "Faelle"
    // schrieb).
    const wort = m[4] === 'Fälle' ? 'Faelle' : m[4];
    const k = `${m[1]} / ${wort}`;
    if (!gefunden.has(k)) gefunden.set(k, new Set());
    gefunden.get(k).add(Number(m[3]));
  }
  const streit = [...gefunden.entries()].filter(([, z]) => z.size > 1);
  zeile(streit.length === 0,
    `${gefunden.size} Zahl-Nennungen mit Eval-Bezug, keine widerspricht sich`,
    streit.map(([k, z]) => `${k}: ${[...z].sort((a, b) => a - b).join(' vs ')}`).join(' | '));
}

const gesamt = gezaehlt;
console.log(`\n${gesamt - fehler}/${gesamt} Zahlen stimmen.`);
if (fehler) {
  console.log('SKILL.md verspricht einen Umfang, den die Evals nicht liefern.');
  process.exit(1);
}
console.log('Jede Zahl in SKILL.md ist gegen einen echten Lauf belegt.');
