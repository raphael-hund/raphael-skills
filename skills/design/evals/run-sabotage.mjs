#!/usr/bin/env node
/**
 * run-sabotage.mjs — merken die design-Evals, wenn ihr Detektor kaputtgeht?
 *
 * Gegenstueck zum gleichnamigen Lauf im web-Skill. Die Frage ist dieselbe: eine
 * Eval, die 17/17 meldet, beweist damit nicht, dass sie etwas pruefen WUERDE —
 * nur, dass heute nichts kaputt ist. Im web-Skill hat genau diese Messung drei
 * blinde Stellen gefunden (craft-check las den Schweregrad nicht, axe-run und
 * shot-sweep konnten ihren Exit-Code verlieren).
 *
 * Ablauf je Fall: Detektor wegkopieren, EINEN gezielten Schaden einbauen, die
 * zugehoerige Eval laufen lassen (sie MUSS reissen), Original zurueckschreiben
 * und pruefen, dass das geklappt hat.
 *
 * Der Schaden ist nie "Datei kaputt" — das faengt jeder Parser. Er ist immer
 * "still das falsche Urteil faellen", der Fall, der im Betrieb wirklich vorkommt.
 *
 *   node evals/run-sabotage.mjs
 *   node evals/run-sabotage.mjs --nur regex
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

const SCHAEDEN = [
  {
    kurz: 'regex',
    pruefer: 'scripts/detector/engines/regex/detect-text.mjs',
    eval: 'evals/run-detect-check.mjs',
    // Der Befund vom 30.07.2026, der die Datei-Eval ueberhaupt ausgeloest hat:
    // `ai-color-palette` hatte nur Tailwind-Zweige und sah den Indigo-Violett-
    // Verlauf in rohem CSS nicht. Hier wird der CSS-Zweig wieder abgeschaltet.
    was: 'CSS-Zweig von ai-color-palette abgeschaltet (nur noch Tailwind)',
    von: "  { id: 'ai-color-palette',\n    regex: /(?:linear|radial|conic)-gradient",
    zu: "  { id: 'ai-color-palette-AUS',\n    regex: /(?:linear|radial|conic)-gradient",
  },
  {
    kurz: 'browser',
    // Nicht rules/checks.mjs! Das ist der NODE-Pfad. Der Browser-Pfad laeuft
    // ueber das generierte Bundle detect-antipatterns-browser.js — zwei getrennte
    // Kopien derselben Regeln. Erster Versuch am 30.07.2026 sabotierte checks.mjs
    // und die Browser-Eval blieb zu Recht gruen: ich hatte die falsche Datei
    // getroffen, nicht die Eval war blind. Genau der Fehler, den ich schon beim
    // Klon-Tor und beim Gate-Zaehler gemacht habe — "Eval merkt es nicht" heisst
    // oft nur "ich habe die falsche gefragt".
    pruefer: 'scripts/detector/detect-antipatterns-browser.js',
    eval: 'evals/run-browser-detect-check.mjs',
    // tiny-text ist eine der Regeln, die NUR im Browser laufen — sie misst die
    // gerenderte Schriftgroesse. Faellt sie, meldet der Detektor eine 9px-Seite
    // als sauber.
    was: 'tiny-text meldet nichts mehr',
    von: "findings.push({ id: 'tiny-text', snippet: `${fontSize}px body text` });",
    zu: "void 0;",
  },
  {
    kurz: 'slop-de',
    pruefer: 'scripts/rules.de.mjs',
    eval: '../eigene/web/evals/run-slop-de-check.mjs',
    // Der deutsche Regelsatz ist der einzige Schutz gegen deutsche
    // Verkaufsfloskeln — der Scanner selbst ist englisch. Faellt die
    // Textstimme (de-14), laeuft "auf das naechste Level" wieder durch.
    was: 'de-14 (deutsche KI-Textstimme) findet nichts mehr',
    von: "    id: \"de-14\",",
    zu: "    id: \"de-14-AUS\",",
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
    execFileSync('node', [path.resolve(SKILL, rel)],
      { encoding: 'utf8', timeout: 900000, cwd: path.dirname(path.resolve(SKILL, rel)) });
    return 0;
  } catch (e) {
    return e.status ?? 1;
  }
}

console.log('\nSabotage (design) — merkt die Eval, wenn ihr Detektor kaputtgeht?\n');

for (const s of SCHAEDEN) {
  if (NUR && NUR !== s.kurz) continue;
  const datei = path.join(SKILL, s.pruefer);
  if (!fs.existsSync(datei)) { zeile(false, `${s.kurz}: ${s.pruefer} fehlt`); continue; }

  const original = fs.readFileSync(datei, 'utf8');
  if (!original.includes(s.von)) {
    // Kein Bestehen: der Schaden liess sich nicht einbauen, also hat dieser Lauf
    // nichts gemessen. Im web-Skill ist mir das zweimal passiert, und beide Male
    // sah die Ausgabe nach Erfolg aus.
    zeile(false, `${s.kurz}: Ankertext nicht gefunden — Schaden NICHT eingebaut`,
      `gesucht: ${s.von.trim().slice(0, 60)}`);
    continue;
  }

  try {
    fs.writeFileSync(datei, original.replace(s.von, s.zu));
    if (fs.readFileSync(datei, 'utf8') === original) {
      zeile(false, `${s.kurz}: Datei unveraendert trotz Schreibversuch`);
      continue;
    }
    const code = laufEval(s.eval);
    zeile(code !== 0, `${s.kurz}: ${s.was}`,
      code === 0 ? `${path.basename(s.eval)} meldet trotzdem Exit 0 — blind an dieser Stelle` : null);
  } finally {
    fs.writeFileSync(datei, original);
    const jetzt = fs.readFileSync(datei, 'utf8');
    if (jetzt !== original) {
      console.error(`\n  !! ${s.pruefer} liess sich NICHT wiederherstellen.`);
      console.error(`     Sofort: git checkout -- skills/design/${s.pruefer}\n`);
      fehler++;
    }
  }
}

console.log('\nAlle Detektoren wieder im Originalzustand:\n');
{
  const rest = SCHAEDEN.filter((s) => {
    const datei = path.join(SKILL, s.pruefer);
    if (!fs.existsSync(datei)) return false;
    const t = fs.readFileSync(datei, 'utf8');
    return t.includes(s.zu) && !t.includes(s.von);
  }).map((s) => s.pruefer);
  zeile(rest.length === 0, `${SCHAEDEN.length} Detektoren geprueft, keine Schadensspur`,
    rest.length ? `noch beschaedigt: ${rest.join(', ')} — SOFORT git checkout` : null);
}

const gesamt = (NUR ? 1 : SCHAEDEN.length) + 1;
console.log(`\n${gesamt - fehler}/${gesamt} wie erwartet.`);
if (fehler) {
  console.log('Mindestens eine Eval merkt ihren eigenen Schaden nicht.');
  process.exit(1);
}
console.log('Jede design-Eval faellt um, wenn ihr Detektor faellt.');
