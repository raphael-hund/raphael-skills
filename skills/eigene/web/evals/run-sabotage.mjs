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
import os from 'node:os';
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
// Nur EIN Lauf gleichzeitig.
//
// Dieses Werkzeug beschaedigt echte Pruefer-Dateien und stellt sie danach wieder
// her. Laufen zwei Laeufe gleichzeitig, liest Lauf B den Pruefer im sabotierten
// Zustand von Lauf A als "Original" — und schreibt genau den beim Aufraeumen
// zurueck. Am 30.07.2026 genau so passiert: craft-check.mjs blieb mit
// `add('WARN', 'M3'` liegen, also mit abgeschaltetem Blocker.
//
// Der Abschluss-Check meldet den Schaden zwar (und hat es getan), aber melden
// ist nicht verhindern. Ein Werkzeug, das fremde Dateien schreibt, gehoert
// gesperrt, nicht beobachtet.
const SPERRE = path.join(os.tmpdir(), 'run-sabotage.lock');
let verwaisterLauf = false;
if (fs.existsSync(SPERRE)) {
  const alt = fs.readFileSync(SPERRE, 'utf8').trim();
  let laeuft = false;
  try { process.kill(Number(alt), 0); laeuft = true; } catch { /* Leiche */ }
  if (laeuft) {
    console.error(`Ein Sabotage-Lauf laeuft bereits (PID ${alt}).`);
    console.error('Zwei Laeufe wuerden sich gegenseitig beschaedigte Pruefer als Original zurueckschreiben.');
    process.exit(2);
  }
  console.error(`Verwaiste Sperre von PID ${alt} — der Lauf lebt nicht mehr, wird uebernommen.`);
  // Aber nicht kommentarlos: ein Lauf, der mitten im Schaden abgebrochen wurde,
  // hat einen Pruefer beschaedigt zurueckgelassen. Am 30.07.2026 genau so
  // passiert — craft-check.mjs stand auf WARN statt BLOCK, und die verwaiste
  // Sperre war der einzige Hinweis darauf. Wer sie nur uebernimmt, sabotiert
  // gleich weiter auf einem schon kaputten Stand.
  verwaisterLauf = true;
}
fs.writeFileSync(SPERRE, String(process.pid));
process.on('exit', () => { try { fs.rmSync(SPERRE, { force: true }); } catch { /* egal */ } });

const SCHAEDEN = [
  {
    kurz: 'tastatur',
    beleg: 'listbox ohne Pfeiltasten',
    pruefer: 'scripts/tastatur-check.mjs',
    eval: 'evals/run-tastatur-check.mjs',
    was: 'Blocker-Zweig abgeschaltet — meldet nie eine fehlende Tastaturbedienung',
    von: '    if (!erfuellt) {',
    zu: '    if (false) {',
  },
  {
    kurz: 'motion',
    beleg: 'drei Kurven',
    pruefer: 'scripts/motion-check.mjs',
    eval: 'evals/run-motion-check.mjs',
    was: 'Kurven-Vielfalt wird nie zum Blocker',
    von: 'if (anzahl >= VIELFALT_BLOCK) {',
    zu: 'if (false) {',
  },
  {
    kurz: 'formular',
    beleg: 'label-for',
    pruefer: 'scripts/formular-check.mjs',
    eval: 'evals/run-formular-check.mjs',
    was: 'F1 (falscher input-type) faellt von BLOCK auf WARN',
    von: "add('BLOCK', 'F1'",
    zu: "add('WARN', 'F1'",
  },
  {
    kurz: 'craft',
    beleg: 'melden nicht BLOCK: M3',
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
    beleg: 'erfundener Name aus sonner',
    pruefer: 'scripts/import-check.mjs',
    eval: 'evals/run-import-check.mjs',
    was: 'erfundene Importe werden gefunden, aber nicht gemeldet',
    von: 'befunde.push({ datei: relative(SRC, f)',
    zu: 'void ({ datei: relative(SRC, f)',
  },
  {
    kurz: 'lib-exporte',
    beleg: 'export \\* auf relativen Pfad',
    pruefer: 'scripts/lib-exporte.mjs',
    eval: 'evals/run-lib-lookup.mjs',
    was: 'Typdatei-Aufloesung liefert nie ein Ziel',
    von: "      if (existsSync(p) && /\\.m?ts$/.test(p)) return p;",
    zu: '      if (existsSync(p)) return null;',
  },
  {
    kurz: 'bilder',
    beleg: '\\.\\./opfer\\.txt',
    pruefer: 'scripts/bilder.mjs',
    eval: 'evals/run-bilder-check.mjs',
    // Die einzige unwiderruflich loeschende Stelle im ganzen Skill. Ohne die
    // Wache loescht `reject` Dateien ausserhalb des Asset-Ordners (Befund
    // 29.07.2026, nachgemessen an /tmp/bt/opfer.txt).
    was: 'Pfad-Wache beim Loeschen abgeschaltet',
    von: '  if (f !== join(dir, basename(f)) || basename(f) !== removed.datei) {',
    zu: '  if (false) {',
  },
  {
    kurz: 'gate-zaehlung',
    beleg: 'fehltGanz',
    pruefer: 'scripts/g1-gate.mjs',
    // Zuerst auf run-kaputte-ausgaben.mjs gezeigt — die prueft aber die
    // Auswertung EINZELNER Werkzeug-Ausgaben, nicht das Gesamturteil. Sie blieb
    // gruen, und der Sabotage-Lauf zeigte damit auf die falsche Eval. Die
    // Zustaendigkeit liegt bei run-naht-check.mjs (Verbindungen und Huerden);
    // dort ist die Pruefung seit dem 30.07.2026 drin.
    eval: 'evals/run-naht-check.mjs',
    // Das Tor zaehlt mit, ob ueberhaupt ein Qualitaets-Pruefer gelaufen ist.
    // Faellt diese Huerde, meldet ein Rechner ohne installierte Werkzeuge
    // "G1 BESTANDEN — 0 Checks gruen".
    was: 'Tor urteilt auch ohne einen einzigen gelaufenen Qualitaets-Pruefer',
    von: 'if (fehltGanz.length) {',
    zu: 'if (false) {',
  },
  {
    kurz: 'klon-gate',
    beleg: 'Treue unter der Stufen-Grenze',
    pruefer: 'scripts/web-clone/klon-gate.mjs',
    eval: 'evals/run-klon-gate.mjs',
    // Die Wiedergabetreue gegen die Stufen-Grenze zu halten ist der ganze Zweck
    // dieses Tors. Faellt der Vergleich, besteht jeder Klon.
    was: 'Wiedergabetreue besteht unabhaengig von der Stufen-Grenze',
    von: "record('treue', treue >= q.min,",
    zu: "record('treue', true,",
  },
  {
    kurz: 'axe',
    beleg: 'Exit 1 bei echten Violations',
    pruefer: 'scripts/axe-run.mjs',
    eval: 'evals/run-axe-check.mjs',
    // axe endet mit 1, wenn es Violations gibt. Wird daraus ein festes 0, meldet
    // das Gate "axe bestanden" fuer jede Seite — und der A11y-Pruefer ist tot,
    // ohne dass etwas fehlt.
    was: 'axe endet immer mit 0, egal wie viele Violations',
    von: 'process.exit(violations.length ? 1 : 0);',
    zu: 'process.exit(0);',
  },
  {
    // Nachgetragen 30.07.2026 beim Abgleich, welche Pruefer mit eigener Eval noch
    // keinen Sabotage-Fall haben. Uebrig waren zwei: lib-lookup (deckt der
    // lib-exporte-Fall bereits ab — dieselbe Quelle) und dieser hier.
    //
    // Der Pruefstand liefert den Build so aus wie die Produktion. Faellt seine
    // cleanUrls-Regel aus, meldet der Link-Check erfundene tote Links — genau der
    // Befund vom 28.07.2026 (SalsaFlow: 172 tote Links, kein einziger echt).
    // Ein Werkzeug gegen falsches Rot, das selbst falsches Rot erzeugt.
    kurz: 'pruefstand',
    pruefer: 'scripts/pruefstand.mjs',
    eval: 'evals/run-pruefstand.mjs',
    was: 'cleanUrls abgeschaltet — /team liefert wieder 404 statt team.html',
    von: 'const CLEAN_URLS = cfg.cleanUrls === true;',
    zu: 'const CLEAN_URLS = false;',
    beleg: 'cleanUrls: /team liefert team.html',
  },
  {
    kurz: 'shot-sweep',
    beleg: 'fehlen auf der Platte',
    pruefer: 'scripts/shot-sweep.mjs',
    eval: 'evals/run-sweep-check.mjs',
    // shot-sweep meldet fehlgeschlagene Routen ueber process.exitCode = 1.
    // Faellt das weg, meldet ein Sweep, der NICHTS fotografiert hat, Erfolg —
    // und der Panel-Schritt kritisiert Bilder, die es nicht gibt.
    was: 'fehlgeschlagene Routen setzen keinen Exit-Code mehr',
    von: '    process.exitCode = 1;',
    zu: '    process.exitCode = 0;',
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
    const aus = execFileSync('node', [path.join(SKILL, rel)],
      { encoding: 'utf8', timeout: 900000, cwd: SKILL });
    return { code: 0, aus };        // Exit 0 = Eval fand alles in Ordnung
  } catch (e) {
    return { code: e.status ?? 1, aus: `${e.stdout || ''}${e.stderr || ''}` };
  }
}

// Vor dem ersten Schaden nachsehen, ob alle Pruefer unveraendert sind. Sonst
// misst dieser Lauf gegen einen Stand, den ein abgestuerzter Vorgaenger
// hinterlassen hat — und meldet "Ankertext nicht gefunden" statt der Ursache.
{
  const dreckig = [];
  for (const s of SCHAEDEN) {
    const datei = path.join(SKILL, s.pruefer);
    if (!fs.existsSync(datei)) continue;
    const txt = fs.readFileSync(datei, 'utf8');
    // Beides pruefen: Ersatz DA und Original WEG. Nur auf den Ersatz zu sehen
    // meldet Fehlalarme, wenn er zufaellig auch im gesunden Code vorkommt —
    // klon-gate.mjs hat `record('treue', true,` regulaer in der L5/L6-Zeile
    // (dort gibt es keine Pixel-Grenze). Am 30.07.2026 beim ersten Lauf
    // gemessen: eine saubere Datei als beschaedigt gemeldet.
    if (txt.includes(s.zu) && !txt.includes(s.von)) dreckig.push(s.pruefer);
  }
  if (dreckig.length) {
    console.error('\nEin Pruefer traegt schon einen Sabotage-Schaden:');
    for (const d of dreckig) console.error(`  ${d}`);
    console.error(verwaisterLauf
      ? 'Ein frueherer Lauf wurde abgebrochen. Zuerst zuruecksetzen:'
      : 'Unerwartet — zuerst nachsehen, woher das kommt, dann zuruecksetzen:');
    console.error(`  git checkout -- ${dreckig.map((d) => `skills/eigene/web/${d}`).join(' ')}\n`);
    process.exit(2);
  }
}

console.log('\nSabotage — merkt die Eval, wenn ihr Pruefer kaputtgeht?\n');
console.log('Jeder Schaden ist EINE Zeile und faellt still das falsche Urteil.\n');

// Notfall-Wiederherstellung fuer den Fall, dass der Lauf per SIGNAL stirbt.
//
// `finally` sieht nach vollstaendigem Schutz aus, greift bei SIGTERM/SIGINT aber
// NICHT — dieselbe Falle wie bei den Servern (dort am 30.07.2026 belegt). Am
// Minimalbeispiel nachgestellt: Datei beschaedigt, SIGTERM, Datei bleibt
// beschaedigt. Der Kommentar am `finally` behauptete "auch wenn der Lauf
// abgebrochen wird" — das war die Annahme, nicht die Messung.
//
// Realistisch ist der Fall gerade hier: dieser Lauf dauert 3-4 Minuten (gemessen
// 31.07.2026: 3:31; die frueher hier stehenden ~15 Minuten waren geschaetzt und
// nie nachgemessen — eine Prosa-Zahl, die eine Ausnahme begruendet und still
// altert), wird
// also am ehesten per `timeout` oder Strg-C abgebrochen. Zurueck bleibt ein
// BESCHAEDIGTER Pruefer — genau der Zustand, vor dem die Eval am Ende warnt
// ("SOFORT git checkout"). Mir selbst zweimal in einer Sitzung passiert.
let inArbeit = null;   // { datei, original } waehrend eines Schadens
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
    // Wichtiger Fall: der Schaden liess sich gar nicht einbauen. Das ist KEIN
    // Bestehen — es heisst, dieser Lauf hat nichts gemessen. Beim Bauen ist mir
    // genau das zweimal passiert (ein sed traf nicht, ein Python-Ausdruck brach
    // an Anfuehrungszeichen), und beide Male sah die Ausgabe nach Erfolg aus.
    zeile(false, `${s.kurz}: Ankertext nicht gefunden — Schaden NICHT eingebaut`,
      `gesucht: ${s.von.trim().slice(0, 60)}`);
    continue;
  }

  try {
    // Ab hier weiss der Signal-Handler, was zurueckzuschreiben ist.
    inArbeit = { datei, original };
    fs.writeFileSync(datei, original.replace(s.von, s.zu));
    // Gegenprobe, dass die Aenderung wirklich auf der Platte steht.
    if (fs.readFileSync(datei, 'utf8') === original) {
      zeile(false, `${s.kurz}: Datei unveraendert trotz Schreibversuch`);
      continue;
    }
    const { code, aus } = laufEval(s.eval);
    // Reissen allein genuegt nicht — die Eval muss den EINGEBAUTEN Schaden
    // benennen.
    //
    // Befund 30.07.2026: ich habe die Stufen-Trennung in run-craft-check
    // absichtlich entfernt (genau den Fix, der den urspruenglichen Befund behoben
    // hatte) — und der craft-Fall bestand weiter. Die Eval riss, aber aus einem
    // anderen Grund: die M3-Fixture loest ohne Blocker ohnehin nicht mehr sauber
    // aus. Ein Waechter, der nur "rot oder gruen" fragt, kann eine blind
    // gewordene Eval nicht von einer wachsamen unterscheiden.
    //
    // `beleg` ist eine Zeichenfolge aus der erwarteten Fehlermeldung. Fehlt sie
    // im Text, riss die Eval aus dem falschen Grund — und das ist derselbe
    // Befund wie gar nicht zu reissen.
    const trifft = !s.beleg || new RegExp(s.beleg, 'i').test(aus);
    zeile(code !== 0 && trifft, `${s.kurz}: ${s.was}`,
      code === 0
        ? `${path.basename(s.eval)} meldet trotzdem Exit 0 — die Eval ist an dieser Stelle blind`
        : (!trifft
          ? `${path.basename(s.eval)} reisst, aber ohne "${s.beleg}" — falscher Grund`
          : null));
  } finally {
    // Immer zurueck, auch wenn die Eval abstuerzt. Bei einem SIGNAL greift
    // `finally` NICHT — dafuer steht der Handler oben.
    fs.writeFileSync(datei, original);
    inArbeit = null;
    // Und nachsehen, ob es geklappt hat. Am 30.07.2026 blieb craft-check.mjs
    // beschaedigt zurueck: der Schreibvorgang lief, aber eine parallele Aenderung
    // an derselben Datei kam dazwischen. Ein Sabotage-Lauf, der Schaden
    // hinterlaesst, ist schlimmer als keiner — also sofort laut werden, nicht
    // erst im Abschluss-Check am Ende.
    const jetzt = fs.readFileSync(datei, 'utf8');
    if (jetzt !== original) {
      console.error(`\n  !! ${s.pruefer} liess sich NICHT wiederherstellen.`);
      console.error(`     Sofort: git checkout -- ${s.pruefer}\n`);
      fehler++;
    }
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
