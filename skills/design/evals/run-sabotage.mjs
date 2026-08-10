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
  // Eine LEERE Sperrdatei blockiert sonst fuer immer: Number('') ist 0, und
  // process.kill(0, 0) prueft die eigene Prozessgruppe — meldet also immer
  // "laeuft". Gemessen 01.08.2026: eine leere Sperre lag herum, der Lauf brach
  // seither mit Exit 2 ab ("Ein Lauf laeuft bereits, PID "), und niemand
  // konnte den Sabotage-Test mehr fahren.
  //
  // Woher eine leere Sperre kommt, war zuerst eine Vermutung ("Lauf stirbt
  // zwischen Anlegen und PID-Schreiben"). Nachgemessen am 01.08.2026: falsch.
  // writeFileSync schreibt Anlegen und Inhalt in einem Zug; 200 Durchlaeufe
  // ergaben nie eine leere Datei. Die leere Sperre, die den Lauf blockierte,
  // stammte aus meiner eigenen Gegenprobe (`: > lock`).
  //
  // Die Wache bleibt trotzdem: eine Sperre in /tmp kann von jedem Werkzeug
  // und jeder Hand angefasst werden, und ihr Inhalt ist nicht garantiert. Ein
  // unbrauchbarer Inhalt darf den Lauf nicht fuer immer stilllegen — das war
  // der eigentliche Schaden, nicht seine Ursache.
  const pid = Number.parseInt(alt, 10);
  if (!Number.isInteger(pid) || pid <= 0) {
    console.error(`Sperre ohne brauchbare PID (Inhalt: "${alt}") — wird uebernommen.`);
  } else {
    try { process.kill(pid, 0); laeuft = true; } catch { /* Leiche */ }
  }
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

// Vor dem ersten Schaden: passen die Anker ueberhaupt noch zu den Detektoren?
//
// Uebernommen aus der web-Version nach dem Befund vom 01.08.2026. Dort war ein
// Anker seit einem Umbau tot, und sein Ersatztext ('process.exit(0);') kam im
// gesunden Werkzeug regulaer vor. Die Rest-Wache hielt das fuer einen
// Schadenrest und brach den GANZEN Lauf mit Exit 2 ab: 0 von 14 Faellen
// geprueft. Diese Version hatte gar keine Vorpruefung — ein toter Anker waere
// hier als "Ankertext nicht gefunden" mitten im Lauf aufgetaucht, ohne zu
// sagen, dass der FALL das Problem ist und nicht der Detektor.
{
  const probleme = [];
  for (const s of SCHAEDEN) {
    const datei = path.join(SKILL, s.pruefer);
    if (!fs.existsSync(datei)) { probleme.push(`${s.kurz}: ${s.pruefer} fehlt`); continue; }
    const txt = fs.readFileSync(datei, 'utf8');
    const n = txt.split(s.von).length - 1;
    if (n === 0) {
      probleme.push(`${s.kurz}: Ankertext steht nicht mehr in ${s.pruefer} — umgebaut? Der Fall belegt nichts.`);
    } else if (n > 1) {
      probleme.push(`${s.kurz}: Ankertext steht ${n}x in ${s.pruefer} — nicht eindeutig, der Schaden traefe die erste Stelle.`);
    }
    if (txt.includes(s.zu)) {
      probleme.push(`${s.kurz}: Ersatztext kommt im gesunden ${s.pruefer} vor — Marker einbauen.`);
    }
  }
  // Hat jeder Detektor, der ein URTEIL faellt, auch einen Sabotage-Fall?
  // Uebernommen aus der web-Version. Die Richtung ist wichtig: nicht von den
  // Evals aus (die Namenskonvention greift dort nur bei einem Fuenftel), sondern
  // von den Werkzeugen — wer mit Exit 1 urteilt, kann still zum Durchwinker
  // werden, und genau das soll dieser Lauf ausschliessen.
  {
    const abgedeckt = new Set(SCHAEDEN.map((x) => x.pruefer));
    const ordner = path.join(SKILL, 'scripts');
    if (fs.existsSync(ordner)) {
      for (const datei of fs.readdirSync(ordner)) {
        if (!datei.endsWith('.mjs')) continue;
        const rel = `scripts/${datei}`;
        if (abgedeckt.has(rel)) continue;
        const txt = fs.readFileSync(path.join(ordner, datei), 'utf8');
        // "Urteilt" heisst hier eng: der Exit-Code haengt an einer BEFUNDMENGE
        // (`exit(befunde.length ? 1 : 0)`). Bewusst nicht breiter:
        //   /process\.exit\(1\)/       trifft auch Startfehler — detect.mjs meldet
        //                             so nur "Detektor nicht gefunden".
        //   /\? 1 : 0/                trifft `error.aufruffehler ? 2 : 1` aus dem
        //                             Aufruffehler-Fix und meldete 13 Werkzeuge.
        // Beide Fassungen habe ich am 01.08.2026 gemessen und verworfen. Ein
        // Muster, das ein Dutzend Fehlalarme liefert, wird abgeschaltet.
        // Zwei Formen: `exit(befunde.length ? 1 : 0)` und — seit dem
        // Browser-Aufraeum-Fix — `code = befunde.length ? 1 : 0` mit dem
        // exit-Aufruf nach dem finally. Ohne die zweite Form blieb axe-run
        // unerkannt, und die Gegenprobe (Fall entfernen) schlug nicht an.
        const urteilt = /(?:exit\(|code\s*=\s*)\s*(?!error\.)[\w$]+(?:\.length)?\s*(?:>\s*0\s*)?\?\s*1\s*:\s*0/.test(txt);
        if (urteilt) probleme.push(`${rel} faellt ein Urteil, hat aber keinen Sabotage-Fall — ohne Gegenprobe kann seine Eval blind werden.`);
      }
    }
  }

  if (probleme.length) {
    console.error('\nSabotage-Anker passen nicht mehr zum Detektor:');
    for (const a of probleme) console.error(`  ${a}`);
    console.error('Ohne passenden Anker belegt der Fall nichts — oder legt den Lauf still.');
    // Zwei Ursachen, zwei Wege zurueck — und die Meldung muss beide nennen,
    // sonst raet der naechste Leser. Gemessen 01.08.2026 nach einem SIGKILL
    // mitten im Lauf: Sperre und beschaedigte Datei blieben liegen, die
    // Anker-Wache meldete sauber "Ankertext steht nicht mehr" — aber ohne
    // Hinweis, dass hier ein ABBRUCH die Datei zerstoert hat und nicht ein
    // Umbau den Anker.
    console.error('');
    console.error('Kam der Lauf zuvor durch einen Abbruch (SIGKILL, OOM, Stromausfall)');
    console.error('zum Stehen? Dann traegt die Datei noch den Schaden. Zuruecksetzen:');
    console.error('  git checkout -- skills/design/<datei>');
    console.error('Wurde der Pruefer umgebaut? Dann den Anker in dieser Datei nachziehen.');
    process.exit(2);
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
