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
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const SKILL = path.join(HIER, '..');
const nurArg = process.argv.indexOf('--nur');
const NUR = nurArg >= 0 ? process.argv[nurArg + 1] : null;

// Nur EIN Lauf gleichzeitig — dieselbe Sperre wie im web-Skill.
//
// Dieses Werkzeug beschaedigt echte Detektoren und stellt sie wieder her. Laufen
// zwei Laeufe parallel, liest Lauf B den Detektor im sabotierten Zustand von
// Lauf A als "Original" und schreibt genau den zurueck. Im web-Skill genau so
// passiert (30.07.2026): craft-check.mjs blieb mit abgeschaltetem Blocker liegen.
const SPERRE = path.join(os.tmpdir(), 'run-sabotage-design.lock');
if (fs.existsSync(SPERRE)) {
  const alt = fs.readFileSync(SPERRE, 'utf8').trim();
  let laeuft = false;
  try { process.kill(Number(alt), 0); laeuft = true; } catch { /* Leiche */ }
  if (laeuft) {
    console.error(`Ein design-Sabotage-Lauf laeuft bereits (PID ${alt}).`);
    console.error('Zwei Laeufe wuerden sich beschaedigte Detektoren als Original zurueckschreiben.');
    process.exit(2);
  }
  console.error(`Verwaiste Sperre von PID ${alt} — Lauf lebt nicht mehr, wird uebernommen.`);
}
fs.writeFileSync(SPERRE, String(process.pid));
process.on('exit', () => { try { fs.rmSync(SPERRE, { force: true }); } catch { /* egal */ } });

const SCHAEDEN = [
  {
    kurz: 'regex',
    beleg: '\\[!!\\][^\\n]*ai-color-palette',
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
    beleg: '\\[!!\\][^\\n]*tiny-text',
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
    beleg: '\\[!!\\][^\\n]*de-14',
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
    const aus = execFileSync('node', [path.resolve(SKILL, rel)],
      { encoding: 'utf8', timeout: 900000, cwd: path.dirname(path.resolve(SKILL, rel)) });
    return { code: 0, aus };
  } catch (e) {
    return { code: e.status ?? 1, aus: `${e.stdout || ''}${e.stderr || ''}` };
  }
}

console.log('\nSabotage (design) — merkt die Eval, wenn ihr Detektor kaputtgeht?\n');

// Notfall-Wiederherstellung, wenn der Lauf per SIGNAL stirbt.
//
// `finally` sieht nach vollstaendigem Schutz aus, greift bei SIGTERM/SIGINT aber
// NICHT — am 30.07.2026 an einem Minimalbeispiel belegt: Datei beschaedigt,
// SIGTERM, Datei bleibt beschaedigt. Dieser Lauf beschaedigt echte Detektoren;
// wird er per `timeout` oder Strg-C abgebrochen, bleibt einer kaputt liegen.
let inArbeit = null;
const notfallZurueck = () => {
  if (!inArbeit) return;
  try { fs.writeFileSync(inArbeit.datei, inArbeit.original); } catch { /* nichts mehr zu retten */ }
  inArbeit = null;
};
for (const sig of ['SIGTERM', 'SIGINT', 'SIGHUP']) {
  process.on(sig, () => {
    notfallZurueck();
    try { fs.rmSync(SPERRE, { force: true }); } catch { /* egal */ }
    process.exit(2);
  });
}

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
    inArbeit = { datei, original };
    fs.writeFileSync(datei, original.replace(s.von, s.zu));
    if (fs.readFileSync(datei, 'utf8') === original) {
      zeile(false, `${s.kurz}: Datei unveraendert trotz Schreibversuch`);
      continue;
    }
    const { code, aus } = laufEval(s.eval);
    // Reissen genuegt nicht — die Eval muss den EINGEBAUTEN Schaden benennen.
    //
    // Im web-Skill hat genau diese Verschaerfung (30.07.2026) eine blind
    // gewordene Eval gefangen, die vorher als bestanden durchlief: sie riss aus
    // einem Nebengrund, nicht wegen des Schadens. `beleg` ist aus einem
    // Protokoll-Lauf GEMESSEN, nicht geraten — bei den web-Belegen war das der
    // Unterschied zwischen 12/12 und zwei Fehlschlaegen.
    const trifft = !s.beleg || new RegExp(s.beleg, 'i').test(aus);
    zeile(code !== 0 && trifft, `${s.kurz}: ${s.was}`,
      code === 0
        ? `${path.basename(s.eval)} meldet trotzdem Exit 0 — die Eval ist an dieser Stelle blind`
        : (!trifft ? `${path.basename(s.eval)} reisst, aber ohne "${s.beleg}" — falscher Grund` : null));
  } finally {
    fs.writeFileSync(datei, original);
    inArbeit = null;
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
