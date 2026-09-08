#!/usr/bin/env node
// g1-gate.mjs — technische Prüfungen für einen benannten Web-Auftrag.
//
//   node g1-gate.mjs --base URL --run-id ID --build-revision SHA \
//     --routes /,/kontakt --out DIR [--src PROJEKT] [--checks axe,links]
//
// Ohne --checks laufen die bisherigen Prüfer. Ausgewählte Quelltextchecks
// brauchen --src; fehlende Werkzeuge oder Inputs ergeben keinen PASS.
// Exit 0 = bestanden, 1 = fehlgeschlagene Prüfung, 2 = ungeprüft/Toolfehler.
// Ein Import lädt nur die wiederverwendbaren Vertragsfunktionen.

import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// State-Abdeckung ist an Route, Viewport, Target und Zustand gebunden.
const SWEEP_NA_REASONS = new Set(['static-page', 'no-form', 'no-async-data']);

export function sweepRequiredGedeckt(req, matrix) {
  const fields = ['route', 'viewport', 'target', 'state'];
  const complete = (record) => record && fields.every((field) => typeof record[field] === 'string' && record[field].trim());
  if (!complete(req)) return false;
  const same = (record) => complete(record) && fields.every((field) => record[field] === req[field]);
  const captured = (matrix.captured || []).some((record) => same(record)
    && (record.status === undefined || record.status === 'PASS') && record.ok !== false
    && (!req.playwright_ref || record.playwright_ref === req.playwright_ref));
  const notApplicable = (matrix.not_applicable || []).some((record) => same(record) && SWEEP_NA_REASONS.has(record.reason));
  return captured || notApplicable;
}

export function sweepVertrag(manifest, ident) {
  if (!manifest || typeof manifest !== 'object' || Array.isArray(manifest)) return ['Manifest ist kein Objekt'];
  const errors = [];
  if (manifest.schema !== 'web/shot-sweep/v2') errors.push('schema muss web/shot-sweep/v2 sein');
  if (!ident?.runId || !ident?.buildRevision || manifest.run_id !== ident.runId || manifest.build_revision !== ident.buildRevision) {
    errors.push('run-id/build-revision fehlen oder Identitaet weicht ab');
  }
  if (manifest.status !== 'PASS') errors.push(`Sweep-Ergebnis ist ${manifest.status || 'NOT_RUN'}, nicht PASS`);
  const routes = manifest.routes;
  if (!Array.isArray(routes) || !routes.length || routes.some((route) => !route || !Array.isArray(route.shots))) {
    return [...errors, 'routes mit Shot-Listen fehlen'];
  }
  const profile = manifest.capture_profile;
  if (!profile || ['static', 'states', 'mobile'].some((key) => typeof profile[key] !== 'boolean')) errors.push('capture_profile unvollständig');
  const matrix = manifest.state_matrix;
  if (!matrix || ['required', 'captured', 'not_applicable', 'failed'].some((key) => !Array.isArray(matrix[key]))) {
    errors.push('state_matrix unvollständig');
  } else {
    if (matrix.failed.length) errors.push(`${matrix.failed.length} state_matrix.failed`);
    if (matrix.not_applicable.some((record) => !SWEEP_NA_REASONS.has(record?.reason))) errors.push('ungueltige N/A-Gruende');
    const gaps = matrix.required.filter((record) => !sweepRequiredGedeckt(record, matrix));
    if (gaps.length) errors.push(`${gaps.length} required gap(s): ${gaps.map((record) => JSON.stringify(record)).join(', ')}`);
    if (matrix.required.length && profile?.states !== true) errors.push('deklarierte Zustände ohne states-Profil');
    for (const record of matrix.captured) {
      if (!record || (record.status !== undefined && record.status !== 'PASS') || record.ok === false) {
        errors.push('captured enthält keinen erfolgreichen Zustand');
        continue;
      }
      const hasShot = routes.some((route) => route.route === record.route
        && route.viewport_label === record.viewport && route.shots.some((shot) =>
          shot?.state === record.state && shot.target === record.target && typeof shot.file === 'string'));
      const external = record.playwright_ref && Array.isArray(record.evidence) && record.evidence.length > 0
        && record.evidence.every((ref) => typeof ref?.path === 'string' && path.isAbsolute(ref.path)
          && fs.existsSync(ref.path) && fs.statSync(ref.path).isFile()
          && createHash('sha256').update(fs.readFileSync(ref.path)).digest('hex') === ref.sha256);
      if (!hasShot && !external) errors.push(`captured ohne zugehörige Belegdatei: ${JSON.stringify(record)}`);
    }
  }
  if (profile?.mobile) {
    for (const route of new Set(routes.map((r) => r.route))) {
      if (!routes.some((r) => r.route === route && r.viewport_label === 'mobile' && r.shots?.length)) errors.push(`Mobile-Route fehlt: ${route}`);
    }
  }
  return errors;
}

export function writeG1Report(file, identity, results, exitCode = 0, detail = {}) {
  if (!identity.runId || !identity.buildRevision || !identity.base) throw new Error('G1-Identität fehlt');
  const complete = Array.isArray(results) && results.length > 0 && results.every((r) => r.ok === true && r.skipped !== true);
  const status = exitCode === 2 || !results?.length || results?.some((r) => r.skipped) ? 'BLOCKED'
    : exitCode === 0 && complete ? 'PASS' : 'FAIL';
  const report = {
    ...detail,
    schema: 'web/g1-report/v2', run_id: identity.runId, build_revision: identity.buildRevision,
    base: identity.base, base_url: identity.base, routes: identity.routes,
    status, ok: status === 'PASS', exit_code: status === 'PASS' ? 0 : exitCode || 1,
    results,
  };
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const temp = `${file}.tmp-${process.pid}-${process.hrtime.bigint()}`;
  fs.writeFileSync(temp, JSON.stringify(report, null, 2) + '\n');
  fs.renameSync(temp, file);
  return report;
}

export function runGate(args = process.argv.slice(2)) {

const get = (k, d) => { const i = args.indexOf(`--${k}`); return i >= 0 ? args[i + 1] : d; };
const has = (k) => args.includes(`--${k}`);

// Ein vertipptes Flag darf nicht still auf den Default zurueckfallen — sonst prueft das
// Gate klaglos die falsche Adresse und meldet ein gruenes Ergebnis fuer nichts.
const KNOWN = [
  'base', 'url', 'routes', 'out', 'src', 'build', 'budget', 'strict', 'no-shots',
  'run-id', 'build-revision', 'state-spec', 'checks', 'help',
];
const unknown = args.filter((a) => a.startsWith('--') && !KNOWN.includes(a.slice(2)));
if (unknown.length) {
  console.error(`Unbekanntes Flag: ${unknown.join(', ')}\nErlaubt: ${KNOWN.map((k) => `--${k}`).join(' ')}`);
  process.exit(2);
}

// 'help' stand seit jeher in KNOWN — also galt `--help` als gueltiges Flag und
// wurde stillschweigend ignoriert: das Gate startete einen echten Lauf mit
// Browser und Lighthouse, statt Hilfe zu zeigen. Ein erlaubtes Flag ohne
// Wirkung ist schlimmer als ein unbekanntes, weil die Flag-Wache oben es
// durchwinkt (gemessen 31.07.2026).
if (args.includes('--help') || args.includes('-h')) {
  console.log('Aufruf: node g1-gate.mjs [--url <basis>] [--routes a,b] [--src <ordner>]');
  console.log('                          [--build <ordner>] [--budget <datei.json>]');
  console.log('                          --base URL --run-id ID --build-revision SHA');
  console.log('                          [--out <ordner>] [--checks axe,links,...] [--strict] [--no-shots]');
  console.log('Fuehrt alle Qualitaets-Pruefer gegen eine laufende Seite aus.');
  console.log('Exit 0 = bestanden, 1 = Qualitaet gerissen, 2 = Tor selbst kaputt.');
  process.exit(0);
}

// --url ist ein Alias fuer --base (die Doktrin nennt es --url, das Skript hiess --base).
const base = get('base', get('url', null));
const RUN_ID = get('run-id', process.env.SHOT_SWEEP_RUN_ID || null);
const BUILD_REVISION = get('build-revision', process.env.SHOT_SWEEP_BUILD_REVISION || null);
if (!base || !RUN_ID || !BUILD_REVISION) {
  console.error('--base, --run-id und --build-revision sind Pflicht');
  process.exit(2);
}
const BASE = base.replace(/\/$/, '');
const ROUTES = get('routes', '/').split(',').map((r) => r.trim()).filter(Boolean)
  .map((r) => (r.startsWith('/') ? r : `/${r}`));

// Ohne --routes prueft das Gate nur die Startseite — und meldet gruen fuers Ganze.
//
// Befund 28.07.2026 (SalsaFlow): der Build hat 28 Seiten. Geprueft wurde eine.
// Die anderen 27 waren nicht "bestanden", sie waren ungesehen; genau das darf ein
// Tor nicht verwechseln. Es entscheidet die Routen nicht selbst — es weigert sich,
// stillschweigend fuer Unbesehenes zu buergen.
//
// Jede Seite liefert BEIDE zulaessigen Schreibweisen (`/team` und `/team.html`),
// weil das Gate nicht wissen kann, ob die Produktion cleanUrls fahrt. Passt eine
// davon, gilt die Seite als benannt.
function seitenImBuild(dir) {
  const raus = [];
  const gehe = (unter, praefix) => {
    for (const e of fs.readdirSync(unter, { withFileTypes: true })) {
      if (e.name.startsWith('.') || e.name === 'assets' || e.name === 'node_modules') continue;
      if (e.isDirectory()) { gehe(path.join(unter, e.name), `${praefix}/${e.name}`); continue; }
      if (!e.name.endsWith('.html') || e.name === '404.html') continue;
      raus.push(e.name === 'index.html'
        ? [praefix || '/', `${praefix}/`]
        : [`${praefix}/${e.name.replace(/\.html$/, '')}`, `${praefix}/${e.name}`]);
    }
  };
  // Kein `catch { return [] }`. Ein unlesbarer Ordner ist nicht dasselbe wie ein
  // Build ohne Unterseiten — der eine Fall waere ein stilles Gruen fuer eine
  // Website, die dieses Skript nie gesehen hat. Es fliegt lieber laut.
  gehe(dir, '');
  return raus;
}
// Ohne --out bekommt JEDER Lauf einen eigenen Ordner. Vorher war es fuer alle
// derselbe (`/tmp/g1-gate`).
//
// Befund 28.07.2026: zwei Anti-Set-Laeufe liefen gleichzeitig, und beide riefen
// `lighthouse --output-path=/tmp/g1-gate/lh_.json` auf. Lauf A schrieb das Ergebnis
// von a3, Lauf B las es als seines. Die Folge war ein Urteil ueber die falsche
// Seite — in beide Richtungen, unreproduzierbar, und niemand haette es gemerkt.
// Betrifft ebenso g1-report.json und die Screenshots.
const OUT = get('out', null) || fs.mkdtempSync(path.join(os.tmpdir(), 'g1-gate-'));

// Alte Laufordner altern lassen.
//
// Jeder Lauf bekommt seit dem 28.07.2026 einen EIGENEN Ordner (gegen die
// Kollision zweier gleichzeitiger Laeufe, siehe oben). Nur wegraeumen tut ihn
// niemand: der Bericht soll ja lesbar bleiben, wenn das Tor fertig ist.
//
// Gemessen am 30.07.2026: 912 Ordner, 291 MB, aeltester vom 28.07. — in drei
// Tagen. Dazu 44 Lighthouse-Profile mit 90 MB und 64 Anti-Set-Ordner. Kein
// akutes Problem auf 344 GB frei, aber ein Wachstum ohne Grenze ist eins auf
// Zeit, und ein voller /tmp macht jeden Pruefer kaputt.
//
// Bewusst NICHT beim Start des naechsten Laufs den vorigen loeschen: wer zwei
// Tore parallel faehrt (Anti-Set tut das), wuerde dem anderen den Bericht unter
// den Fuessen wegziehen. Stattdessen nach ALTER: was aelter als 24 Stunden ist,
// hat seinen Zweck erfuellt.
//
// Nur eigene Ordner, erkennbar am Praefix, und nur direkt unter tmpdir.
// Fehler beim Loeschen werden geschluckt — ein Aufraeumen, das den Lauf
// abbricht, waere schlimmer als der belegte Platz.
if (!get('out', null)) {
  const GRENZE = Date.now() - 24 * 60 * 60 * 1000;
  try {
    for (const name of fs.readdirSync(os.tmpdir())) {
      if (!name.startsWith('g1-gate-')) continue;
      const p = path.join(os.tmpdir(), name);
      if (p === OUT) continue;
      try {
        if (fs.statSync(p).mtimeMs < GRENZE) fs.rmSync(p, { recursive: true, force: true });
      } catch { /* fremder Besitzer, gerade geloescht: egal */ }
    }
  } catch { /* tmpdir unlesbar: kein Grund, das Tor zu stoppen */ }
}
const SKILL_DIR = path.dirname(new URL(import.meta.url).pathname);
// Zwei Pruefer brauchen den Quellcode statt der laufenden Seite: der
// Import-Check und die Routen-Vollstaendigkeit ganz am Ende.
const SRC = get('src', null);

// --- Quelle und Build sind nicht derselbe Ordner --------------------------
//
// Bis 29.07.2026 bekamen ALLE dateilesenden Pruefer dasselbe `--src`. Die
// brauchen aber Gegensaetzliches:
//
//   Import-Check   -> QUELLE. Er sucht `import`-Zeilen in .tsx/.jsx; im Build
//                     sind die wegkompiliert.
//   Slop-Scan      -> BUILD.  Dort steht der Text, den der Besucher bekommt.
//   Routen-Zaehler -> BUILD.  Er zaehlt die ausgelieferten HTML-Seiten.
//
// An der MAKE-Website gemessen: derselbe Scan ergab 96 Treffer in der Quelle
// und 6 im Build. Wer `--src .` setzt, bekommt 90 Befunde ueber Dateien, die
// nie ausgeliefert werden — genau der Laerm, an dem ein Waechter stirbt. Wer
// `--src dist` setzt, verliert den Import-Check ganz. Beides war falsch, und
// es fiel nicht auf, weil kein Pruefer sagte, welchen Ordner er gelesen hat.
//
// Darum ein zweiter Schalter. Ohne ihn wird der uebliche Build-Ordner unter
// --src gesucht; gefunden oder nicht, es steht im Bericht.
const BUILD_KANDIDATEN = ['dist', 'build', 'out', '.output/public', '.next'];
function buildFinden(src) {
  if (!src) return null;
  for (const k of BUILD_KANDIDATEN) {
    const p = path.join(src, k);
    if (fs.existsSync(p) && fs.statSync(p).isDirectory()) return p;
  }
  return null;
}
const BUILD_EXPLIZIT = get('build', null);
const BUILD = BUILD_EXPLIZIT || buildFinden(SRC);
// Kein Build gefunden und keiner genannt: dann IST --src vermutlich schon der
// Build (statische Seite ohne Bundler). Das ist der haeufige Fall im Anti-Set.
const LESEORDNER = BUILD || SRC;

// Fehlendes Feld ist NICHT dasselbe wie ein leeres Feld.
//
// Luna-Audit 27.07.2026: neunmal stand `parsed.violations || []` im Gate. Liefert
// ein Werkzeug `{}`, weil es unterwegs gestorben ist, wird daraus eine leere Liste
// und damit "0 Probleme gefunden" — ein Absturz meldete Bestnote. Wer eine Liste
// erwartet, muss eine Liste bekommen; alles andere ist ein kaputter Lauf.
//
// Wirft, statt null zurueckzugeben: der Aufrufer faengt es ohnehin schon und
// meldet dann ehrlich "Ausgabe unlesbar" statt still zu bestehen.
function liste(parsed, feld, werkzeug) {
  if (parsed === null || typeof parsed !== 'object') {
    throw new Error(`${werkzeug}: Ausgabe ist kein Objekt`);
  }
  const v = parsed[feld];
  if (v === undefined) throw new Error(`${werkzeug}: Feld "${feld}" fehlt in der Ausgabe`);
  if (!Array.isArray(v)) throw new Error(`${werkzeug}: "${feld}" ist ${typeof v}, erwartet Liste`);
  return v;
}

// Budgets. Bewusst konservativ: ein 10k-Website-Ergebnis reisst diese Werte nicht.
const DEFAULT_BUDGET = {
  lighthousePerformance: 0.90,
  lighthouseAccessibility: 1.00,
  lighthouseBestPractices: 0.95,
  lighthouseSeo: 1.00,
  axeViolations: 0,          // hart: web/SKILL.md completion_criteria
  brokenLinks: 0,
  htmlErrors: 0,
  // scan-ai-slop.mjs endet IMMER mit Exit 0, auch bei Funden (nachgemessen
  // 30.07.2026: sieben Treffer, Exit 0, in Text- wie JSON-Modus). Das Urteil
  // faellt deshalb hier, aus dem JSON — nicht am Exit-Code des Scanners.
  slopScore: 0,              // 0 Blocker erlaubt; Quelle ist das JSON, nicht der Exit
};

// Ein Budget kann Gruen erkaufen. Also muss es dafuer geradestehen.
//
// Befund 29.07.2026: `--budget` war die einzige Eingabe des Gates ohne jede
// Pruefung. Drei Wege zu falschem Gruen lagen offen:
//   1. `{"axeViolation": 99}` — ein fehlender Buchstabe, und die Lockerung
//      landet still neben dem echten Schluessel. Das Gate laeuft weiter mit
//      Standardwerten und meldet ein Ergebnis, das der Aufrufer anders erwartet.
//      Vertippte FLAGS lehnt das Gate seit dem 26.07. hart ab — vertippte
//      Budget-Schluessel nicht. Dieselbe Gefahr, halb geschlossen.
//   2. Kaputtes JSON oder fehlende Datei liessen einen nackten Node-Stacktrace
//      mit Exit 1 raus. Exit 1 heisst in diesem Tor "Qualitaet gerissen" — ein
//      Werkzeugfehler tarnte sich als Befund. Das ist Exit 2.
//   3. Nichts sagte hinterher, dass ueberhaupt gelockert wurde. Ein erkauftes
//      Gruen sah aus wie ein verdientes.
// Schluessel mit `_` sind Kommentare (siehe evals/antiset-budget.json) und
// werden bewusst ignoriert, nicht abgelehnt.
function budgetLaden(datei) {
  if (!datei) return { budget: { ...DEFAULT_BUDGET }, gelockert: [] };
  let roh;
  try {
    roh = JSON.parse(fs.readFileSync(datei, 'utf8'));
  } catch (e) {
    console.error(`Budget-Datei unbrauchbar (${datei}): ${e.message.split('\n')[0]}`);
    process.exit(2);
  }
  if (roh === null || typeof roh !== 'object' || Array.isArray(roh)) {
    console.error(`Budget-Datei muss ein Objekt enthalten, ist aber ${Array.isArray(roh) ? 'eine Liste' : typeof roh}: ${datei}`);
    process.exit(2);
  }
  const budget = { ...DEFAULT_BUDGET };
  const gelockert = [];
  for (const [k, v] of Object.entries(roh)) {
    if (k.startsWith('_')) continue;
    if (!(k in DEFAULT_BUDGET)) {
      console.error(`Unbekannter Budget-Schluessel "${k}" in ${datei}`);
      console.error(`Erlaubt: ${Object.keys(DEFAULT_BUDGET).join(', ')}`);
      process.exit(2);
    }
    if (typeof v !== 'number' || !Number.isFinite(v)) {
      console.error(`Budget "${k}" ist ${typeof v}, erwartet eine Zahl: ${datei}`);
      process.exit(2);
    }
    // Wertebereich, nicht nur Typ.
    //
    // Lighthouse-Punktzahlen laufen von 0 bis 1 (`s.performance.score`), nicht
    // von 0 bis 100. Wer `99` statt `0.99` schreibt, hat die Anforderung nicht
    // verschaerft, sondern unerfuellbar gemacht — und wer `90` meint und `0.90`
    // vergisst, merkt es nie, weil das Tor dann IMMER reisst.
    //
    // Gemessen am 31.07.2026: `{"lighthousePerformance": 99}` ergab
    // "performance=100 ... GERISSEN". Das Tor rechnete in zwei Einheiten
    // gleichzeitig und meldete einen Qualitaetsfehler, wo ein Tippfehler stand.
    //
    // Zaehlbudgets (Violations, tote Links) duerfen nicht negativ sein: ein
    // Budget unter null ist von keiner Seite erfuellbar, `axeViolations: -5`
    // lief bis dahin durch und riss dann am Check.
    if (k.startsWith('lighthouse') && (v < 0 || v > 1)) {
      console.error(`Budget "${k}" ist ${v} — Lighthouse-Punktzahlen laufen von 0 bis 1.`);
      console.error(`Gemeint war vermutlich ${v > 1 && v <= 100 ? (v / 100).toFixed(2) : '0.90'}.`);
      process.exit(2);
    }
    if (!k.startsWith('lighthouse') && v < 0) {
      console.error(`Budget "${k}" ist ${v} — ein Zaehlbudget unter null ist nie erfuellbar: ${datei}`);
      process.exit(2);
    }
    budget[k] = v;
    // Lockerung heisst: mehr Verstoesse erlaubt bzw. niedrigere Punktzahl noetig.
    // Beide Richtungen haengen an derselben Frage — ist der Standard schaerfer?
    const strenger = k.startsWith('lighthouse') ? v < DEFAULT_BUDGET[k] : v > DEFAULT_BUDGET[k];
    if (strenger) gelockert.push(`${k}: ${DEFAULT_BUDGET[k]} -> ${v}`);
  }
  return { budget, gelockert };
}

const budgetFile = get('budget', null);
const { budget: BUDGET, gelockert: BUDGET_GELOCKERT } = budgetLaden(budgetFile);

const results = [];
const record = (name, ok, detail, skipped = false) => {
  results.push({ name, ok, skipped, detail });
  const tag = skipped ? 'SKIP' : ok ? 'PASS' : 'FAIL';
  console.log(`[${tag}] ${name} — ${detail}`);
};

function toolExists(bin) {
  try { execFileSync('which', [bin], { stdio: 'pipe' }); return true; } catch { return false; }
}

// Zeitgrenze pro Pruefer. Ohne sie wartet das Tor unbegrenzt.
//
// Die Pruefer setzen zwar Timeouts, aber nur auf die NAVIGATION (page.goto,
// 45s). Haengt einer NACH dem Laden — Playwright wartet auf ein Element, ein
// Port ist von einem fremden Lauf belegt, eine Animation wird nie fertig —,
// laeuft er weiter, und `execFileSync` ohne timeout wartet mit.
//
// Am 30.07.2026 in dieser Umgebung passiert: ein Browser-Lauf hing 980
// Sekunden und hielt dabei seinen Port; der wartende Lauf lief in einen
// Playwright-Timeout und meldete "reisst, aber aus dem falschen Grund".
//
// 10 Minuten sind grosszuegig: der langsamste Pruefer (Lighthouse ueber vier
// Kategorien) braucht auf diesem Rechner unter zwei. Ein Lauf, der laenger
// braucht, haengt — er ist nicht langsam.
//
// Der Abbruch landet im catch des Aufrufers, und `e.status` ist bei einem
// Timeout `null` -> `e.status ?? 2` macht daraus Exit 2, also "Pruefer kaputt,
// NICHT bestanden". Genau die richtige Einstufung: nichts geprueft.
const PRUEFER_FRIST = Number(process.env.G1_FRIST_MS || 600000);

// Nach einem Abbruch bleiben ENKELPROZESSE zurueck.
//
// Der Timeout schickt SIGTERM an das Werkzeug — nicht an das, was es selbst
// gestartet hat. Lighthouse startet ein eigenes Chrome mit
// `--user-data-dir=/tmp/lighthouse.XXXX` und raeumt es normalerweise am Ende
// auf; stirbt es vorher, laeuft der Browser weiter und wird von systemd
// adoptiert (PPID 1).
//
// Gemessen am 30.07.2026, direkt nach dem Einbau der Frist: 56 -> 65
// Chrome-Prozesse durch EINEN abgebrochenen Lauf. Zu dem Zeitpunkt lagen
// bereits 91 Chrome-Prozesse mit 6,2 GB auf der Maschine, sieben verwaiste
// Lighthouse-Wurzeln aus einer halben Stunde Tor-Laeufen. Auf einem Server,
// der schon ein OOM hatte, ist das kein Schoenheitsfehler.
//
// Ein Fix, der ein neues Leck aufreisst, ist keiner. Also nach jedem Abbruch
// die Browser einsammeln, die zu DIESEM Lauf gehoeren — erkennbar am
// user-data-dir, das Lighthouse pro Lauf neu anlegt.
//
// Bewusst eng: nur Prozesse, deren Profilordner unter /tmp/lighthouse. liegt
// UND die verwaist sind (PPID 1). Fremde Browser-Agents laufen unter eigenem
// Profilpfad und mit lebendem Elternprozess; sie werden nicht angefasst.
// Pauschal `pkill chrome` waere hier grob fahrlaessig — auf dieser Maschine
// laeuft ein fremder Browser-Agent seit 25 Stunden.
function verwaisteBrowserAufraeumen() {
  let liste = '';
  try {
    liste = execFileSync('ps', ['-eo', 'pid,ppid,args'], { encoding: 'utf8', timeout: 10000 });
  } catch { return 0; }
  const opfer = [];
  for (const z of liste.split('\n')) {
    if (!/--user-data-dir=\/tmp\/lighthouse\./.test(z)) continue;
    const m = z.trim().match(/^(\d+)\s+(\d+)\s/);
    if (m && m[2] === '1') opfer.push(m[1]);
  }
  for (const pid of opfer) {
    try { process.kill(Number(pid), 'SIGKILL'); } catch { /* schon weg */ }
  }
  return opfer.length;
}

function run(bin, argv, opts = {}) {
  try {
    return execFileSync(bin, argv, {
      encoding: 'utf8', stdio: 'pipe', maxBuffer: 64 * 1024 * 1024, timeout: PRUEFER_FRIST, ...opts,
    });
  } catch (e) {
    // Nur beim Abbruch aufraeumen. Ein normal beendetes Werkzeug hat seinen
    // Browser selbst geschlossen; dann faende die Suche ohnehin nichts, aber
    // ein `ps` pro Pruefer waere unnoetige Last.
    if (e.signal === 'SIGTERM' || e.code === 'ETIMEDOUT') {
      const weg = verwaisteBrowserAufraeumen();
      if (weg) console.log(`  (${weg} verwaiste Browser nach Abbruch eingesammelt)`);
    }
    throw e;
  }
}

// Warum ein Fehler passierte, steht je nach Werkzeug woanders: manche schreiben
// den Grund auf stderr, manche legen ihn ins JSON auf stdout (seit dem
// 01.08.2026 etwa `nichtLesbar` in tastatur-check und motion-check). Bleibt
// beides leer, liefert e.message nur "Command failed: node /langer/pfad/..." —
// eine Meldung, die fast nur aus dem Kommandopfad besteht.
//
// Gemessen 01.08.2026 mit einem toten Symlink im --src: drei Pruefer meldeten
// genau das. Der Nutzer sah einen abgeschnittenen Pfad und keinen Grund.
function fehlerGrund(e) {
  const err = String(e.stderr || '').trim();
  if (err) return err.split('\n')[0].slice(0, 160);

  // JSON auf stdout: die strukturierten Gruende der Pruefer.
  try {
    const d = JSON.parse(String(e.stdout || ''));
    for (const feld of ['nichtLesbar', 'unlesbar', 'unlesbareDateien', 'kaputteKodierung']) {
      const v = d[feld];
      if (Array.isArray(v) && v.length) {
        return `${v.length} Datei(en) nicht lesbar: ${v.slice(0, 2).join(', ')}${v.length > 2 ? ' …' : ''}`;
      }
    }
    if (d.fehler) return String(d.fehler).slice(0, 160);
  } catch { /* kein JSON — dann eben die Notbremse unten */ }

  // Notbremse: der Kommandopfad ist die schlechteste Auskunft, aber besser als
  // gar keine. Vorne abschneiden, damit der Grund am Ende sichtbar bleibt.
  const m = String(e.message).split('\n')[0];
  return m.length > 160 ? `…${m.slice(-157)}` : m;
}

// --- Check 1: Server erreichbar -------------------------------------------
function checkServer() {
  try {
    const code = run('curl', ['-s', '-o', '/dev/null', '-w', '%{http_code}', `${BASE}${ROUTES[0]}`]).trim();
    if (!/^[23]/.test(code)) { record('server', false, `${BASE}${ROUTES[0]} -> HTTP ${code}`); return false; }
    // Wohin fuehrt die Weiterleitung? Der Code allein sagt es nicht: 3xx gilt
    // als "erreichbar", und alle Pruefer folgen der Kette anschliessend
    // stillschweigend. Gemessen 01.08.2026 gegen einen 302 auf einen anderen
    // Host: das Tor meldete "server PASS — HTTP 302" und bewertete danach eine
    // FREMDE Domain, ohne das je zu erwaehnen. Ein gruenes Tor ueber die Seite
    // eines anderen Anbieters ist das teuerste Missverstaendnis, das dieses
    // Werkzeug produzieren kann.
    let ziel = '';
    if (/^3/.test(code)) {
      try {
        ziel = run('curl', ['-sL', '-o', '/dev/null', '-w', '%{url_effective}', `${BASE}${ROUTES[0]}`]).trim();
      } catch { ziel = ''; }
    }
    if (ziel) {
      const hostVon = (u) => { try { return new URL(u).host; } catch { return ''; } };
      const start = hostVon(`${BASE}${ROUTES[0]}`);
      const ende = hostVon(ziel);
      if (start && ende && start !== ende) {
        record('server', false, `${BASE}${ROUTES[0]} leitet auf einen anderen Host: ${ziel} — geprueft wuerde ${ende}, nicht ${start}`);
        return false;
      }
      record('server', true, `${BASE}${ROUTES[0]} -> HTTP ${code}, weiter auf ${ziel}`);
    } else {
      record('server', true, `${BASE}${ROUTES[0]} -> HTTP ${code}`);
    }

    // ALLE Routen pruefen, nicht nur die erste. Bis zum 31.07.2026 sah das Tor
    // nur ROUTES[0] an; eine weitere Route mit HTTP 404 lief ungeprueft in die
    // Pruefer und erzeugte dort FAIL-Zeilen — dieselbe Kategorie wie echte
    // Qualitaetsmaengel. Gemessen mit --routes "/,/weg": sieben FAILs, davon
    // vier allein aus der toten Route. Ein Tippfehler in der Routenliste sah
    // damit aus wie kaputtes Design.
    //
    // Der Unterschied zaehlt, weil das Tor zwei Ausgaenge hat: Exit 1 heisst
    // "geprueft und durchgefallen", Exit 2 heisst "gar nicht erst pruefbar".
    // Eine Route, die es nicht gibt, gehoert in die zweite Klasse.
    const tot = [];
    for (const r of ROUTES.slice(1)) {
      let c = '000';
      try {
        c = run('curl', ['-s', '-o', '/dev/null', '-w', '%{http_code}', `${BASE}${r}`]).trim();
      } catch { c = '000'; }
      if (!/^[23]/.test(c)) tot.push(`${r} -> ${c === '000' ? 'nicht erreichbar' : `HTTP ${c}`}`);
    }
    if (tot.length) {
      record('routen', false, `${tot.length} von ${ROUTES.length} Routen antworten nicht: ${tot.join(', ')} — Tippfehler in --routes?`);
      return false;
    }
    if (ROUTES.length > 1) record('routen', true, `alle ${ROUTES.length} Routen antworten`);
    return true;
  } catch (e) {
    record('server', false, `nicht erreichbar: ${e.message.split('\n')[0]}`);
    return false;
  }
}

// Hat Lighthouse ueberhaupt die Seite bewertet, nach der gefragt wurde?
//
// Zwei Wege zu falschem Gruen, beide gemessen 29.07.2026:
//  1. runtimeError — Lighthouse konnte die Seite nicht laden (404, Timeout) und
//     schreibt trotzdem einen vollstaendigen Bericht. Scores sind dann 0, aber
//     ein Budget von 0 waere theoretisch bestehbar; vor allem sagt der Bericht
//     nichts ueber die echte Seite aus.
//  2. Stille Umleitung — `/preise` leitet auf `/` um. Gemessen: performance=100,
//     seo=82, Exit 0, kein Fehler. Bewertet wurde die Startseite. Die Preisseite
//     war nie gemessen, und nichts im Bericht sagte das.
//
// Rueckgabe: null wenn in Ordnung, sonst der Grund als Text.
function lhLaufFehler(lh, angefragt) {
  if (lh.runtimeError) {
    return `Lighthouse konnte die Seite nicht laden: ${lh.runtimeError.code}`;
  }
  const norm = (u) => {
    try { const x = new global.URL(u); return (x.pathname.replace(/\/+$/, '') || '/') + x.search; }
    catch { return u; }
  };
  const ziel = lh.finalDisplayedUrl || lh.finalUrl;
  if (ziel && norm(ziel) !== norm(angefragt)) {
    return `bewertet wurde ${ziel}, angefragt war ${angefragt} — stille Umleitung, die genannte Seite ist ungeprueft`;
  }
  return null;
}

// --- Check 2: Lighthouse pro Route ----------------------------------------
function checkLighthouse() {
  if (!toolExists('lighthouse')) { record('lighthouse', true, 'lighthouse nicht installiert', true); return; }
  for (const route of ROUTES) {
    const jsonPath = path.join(OUT, `lh${route.replace(/[^\w]+/g, '_')}.json`);
    try {
      run('lighthouse', [`${BASE}${route}`, '--quiet', '--output=json', `--output-path=${jsonPath}`,
        '--chrome-flags=--headless=new --no-sandbox', '--only-categories=performance,accessibility,best-practices,seo']);
      const lh = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
      const laufFehler = lhLaufFehler(lh, `${BASE}${route}`);
      if (laufFehler) { record(`lighthouse${route}`, false, laufFehler); continue; }
      const s = lh.categories;
      const checks = [
        ['performance', s.performance?.score, BUDGET.lighthousePerformance],
        ['accessibility', s.accessibility?.score, BUDGET.lighthouseAccessibility],
        ['best-practices', s['best-practices']?.score, BUDGET.lighthouseBestPractices],
        ['seo', s.seo?.score, BUDGET.lighthouseSeo],
      ];
      // Eine Kategorie ohne Zahl ist ein kaputter Lauf, kein bestandener.
      // Vorher stand `typeof got === 'number' && got < min` da: fehlte der Score,
      // wurde er als '?' gedruckt und zaehlte nicht als Verstoss — PASS mit Luecke.
      const fehlend = checks.filter(([, got]) => typeof got !== 'number');
      const fmt = checks.map(([k, got]) => `${k}=${typeof got === 'number' ? Math.round(got * 100) : '?'}`).join(' ');
      if (fehlend.length) {
        record(`lighthouse${route}`, false,
          `${fmt} — ohne Score: ${fehlend.map(([k]) => k).join(', ')} (Lauf unvollstaendig)`);
        continue;
      }
      const bad = checks.filter(([, got, min]) => got < min);
      record(`lighthouse${route}`, bad.length === 0, bad.length
        ? `${fmt} — unter Budget: ${bad.map(([k, got, min]) => `${k} ${Math.round(got * 100)}<${Math.round(min * 100)}`).join(', ')}`
        : fmt);
    } catch (e) {
      record(`lighthouse${route}`, false, `Lauf fehlgeschlagen: ${String(e.message).split('\n')[0]}`);
    }
  }
}

// --- Check 3: axe (a11y, hart 0) ------------------------------------------
// Ueber axe-run.mjs (Playwright), nicht ueber @axe-core/cli: dessen chromedriver
// ist auf dieser Maschine eine Major-Version voraus und stirbt beim Start.
function checkAxe() {
  const runner = path.join(SKILL_DIR, 'axe-run.mjs');
  if (!fs.existsSync(runner)) { record('axe', true, 'axe-run.mjs nicht gefunden', true); return; }
  for (const route of ROUTES) {
    let out = '';
    let code = 0;
    try {
      out = run('node', [runner, '--url', `${BASE}${route}`, '--json']);
    } catch (e) {
      code = e.status ?? 2;
      out = String(e.stdout || '');
      if (code === 2) {
        record(`axe${route}`, false, `axe-Lauf kaputt: ${fehlerGrund(e)}`);
        continue;
      }
    }
    try {
      const parsed = JSON.parse(out);
      const violations = liste(parsed, 'violations', 'axe');
      // "0 Violations" ist nur dann eine Aussage, wenn ueberhaupt Regeln liefen.
      // axe-run.mjs meldet die Zahl seit 29.07.2026 mit; fehlt sie, stammt die
      // Ausgabe aus einer alten Fassung und ist nicht beurteilbar.
      if (typeof parsed.regeln !== 'number' || parsed.regeln === 0) {
        record(`axe${route}`, false,
          `axe meldet ${parsed.regeln ?? 'keine Zahl fuer'} gelaufene Regeln — 0 Violations ist hier keine Freigabe`);
        continue;
      }
      record(`axe${route}`, violations.length <= BUDGET.axeViolations,
        violations.length === 0 ? `0 Violations (${parsed.passes} Passes, ${parsed.regeln} Regeln)`
          : `${violations.length} Violations: ${violations.slice(0, 5).map((v) => `${v.id}(${v.impact})`).join(', ')}`);
    } catch {
      record(`axe${route}`, false, `axe-Ausgabe unlesbar (exit ${code})`);
    }
  }
}

// --- Check 4: tote Links ---------------------------------------------------
//
// Befund 29.07.2026: das Gate rief linkinator mit `--silent` auf. Das Flag
// unterdrueckt die OK-Links — die Ausgabe enthaelt dann NUR noch die kaputten.
// Auf der Kontroll-Fixture mit vier href-Attributen meldete das Tor deshalb
// "0 Links, 0 tot" und bestand. Dieselbe Zeile kaeme heraus, wenn linkinator
// die Seite gar nicht geoeffnet haette. Ein Pruefer, dessen Bestanden-Meldung
// von seinem Nicht-gelaufen-Zustand ununterscheidbar ist, prueft nichts.
//
// Ohne --silent liefert dieselbe Seite zwei Links mit state: 'OK'. Also: Flag
// weg, und eine leere Liste gilt als kaputter Lauf statt als sauberes Ergebnis.
function linkUrteil(parsed) {
  const alle = liste(parsed, 'links', 'linkinator');
  if (alle.length === 0) {
    return { ok: false, detail: 'linkinator hat 0 Links gesehen — auch die Startseite fehlt, also ist der Lauf leer, nicht sauber' };
  }
  const broken = alle.filter((l) => l.state === 'BROKEN');
  return {
    ok: broken.length <= BUDGET.brokenLinks,
    detail: broken.length === 0
      ? `${alle.length} Links geprueft, 0 tot`
      : `${broken.length} von ${alle.length} tot: ${broken.slice(0, 5).map((l) => l.url).join(', ')}`,
  };
}

function checkLinks() {
  if (!toolExists('linkinator')) { record('links', true, 'linkinator nicht installiert', true); return; }
  const auswerten = (text) => {
    const u = linkUrteil(JSON.parse(text));
    record('links', u.ok, u.detail);
  };
  try {
    auswerten(run('linkinator', [BASE, '--recurse', '--format', 'json']));
  } catch (e) {
    // Exit 1 = tote Links gefunden (kein kaputter Lauf). JSON steht auf stdout.
    try {
      auswerten(String(e.stdout || ''));
    } catch {
      record('links', false, `linkinator-Lauf kaputt: ${fehlerGrund(e)}`);
    }
  }
}

// --- Check 5: AI-Slop-Scanner (bestehender design-Skill) ------------------
// scan-ai-slop.mjs greppt QUELLCODE, nicht eine URL — braucht daher --src.
// Ohne --src ist der Check nicht anwendbar und wird ehrlich uebersprungen,
// statt still zu bestehen.
// Der Scanner meldet `hits` als ZAHL und `findings` als Gruppen-Liste. Ein naives
// `parsed.hits || parsed.findings` liefert deshalb die Zahl, und `Array.isArray(4)`
// ist false — das Gate meldete "0 Slop-Tells" fuer eine Seite mit vier Treffern.
// Darum hier explizit: Zahl gewinnt, sonst Treffer ueber alle Gruppen summieren.
function slopZaehlen(parsed) {
  if (typeof parsed.hits === 'number') return parsed.hits;
  if (Array.isArray(parsed.hits)) return parsed.hits.length;
  if (Array.isArray(parsed.findings)) {
    return parsed.findings.reduce((s, g) => s + (Array.isArray(g.hits) ? g.hits.length : 1), 0);
  }
  return null; // unbekanntes Format — nicht als 0 durchwinken
}

// Der Scanner kennt keine Schweregrade: jede seiner 33 Regeln zaehlt gleich viel.
// Damit wuerde ein "Kicker ueber der Ueberschrift" (in der Doktrin WARN) die
// Auslieferung genauso stoppen wie ein Indigo-Violett-Verlauf (BLOCK). Die
// Einteilung passiert deshalb hier, in denselben Stufen wie craft-check.
// Quelle der Zuordnung: references/agentur-merkmale.md.
const SLOP_BLOCK = new Set([
  '01', // Indigo→Violett-Verlauf (T2)
  '02', // Verlauf in der Headline
  '14', // KI-Textstimme ("nahtlos", "muehelos", "Game-Changer")
  '24', // KI-gezeichnetes SVG-Icon
  '28', // erfundene Statistik-Zeile (T9)
  // Deutsche Textstimme — das Gegenstueck zu '14' auf Raphaels Ausliefersprache.
  // Kommt aus scripts/rules.de.mjs im design-Skill (Befund 29.07.2026: der
  // Scanner ist englischsprachig, deutsche Slop-Seiten liefen mit 0 Treffern
  // durch). Nur de-14 blockt; de-15/de-16 bleiben Warnung.
  'de-14',
]);

// Der Scanner schreibt die IDs heute als String mit fuehrender Null ("01").
// Wuerde er auf Zahlen umstellen, waere aus "01" die 1 — und `Set.has("1")`
// faende die schlimmste Regel (Indigo-Violett-Verlauf) nicht mehr. Das waere
// ein stilles falsches Gruen, also wird die ID vorher auf zwei Stellen normiert.
const slopId = (id) => String(id).trim().padStart(2, '0');

function slopTeilen(parsed) {
  const g = Array.isArray(parsed.findings) ? parsed.findings : [];
  const zaehle = (x) => (Array.isArray(x.hits) ? x.hits.length : 1);
  const block = g.filter((x) => SLOP_BLOCK.has(slopId(x.id)));
  const warn = g.filter((x) => !SLOP_BLOCK.has(slopId(x.id)));
  return {
    block: block.reduce((s, x) => s + zaehle(x), 0),
    warn: warn.reduce((s, x) => s + zaehle(x), 0),
    blockNamen: block.map((x) => x.name || x.id).join(', '),
    warnNamen: warn.map((x) => x.name || x.id).join(', '),
  };
}

// `deDa` = lief der deutsche Regelsatz mit? Steht im Urteilstext, damit ein
// gruener Slop-Check nie verschweigt, dass er nur englisch gelesen hat.
function slopMelden(parsed, deDa) {
  const deNote = deDa === false ? ' [nur englische Regeln — rules.de.mjs fehlt]' : '';
  const n = slopZaehlen(parsed);
  if (n === null) { record('ai-slop', false, 'Slop-Scan: unbekanntes JSON-Format'); return; }

  // Dieselbe Frage wie beim Link-Check (29.07.2026): sieht die Erfolgsmeldung
  // anders aus, wenn der Pruefer gar nicht gelaufen ist? Der Scanner meldet auf
  // einem Ordner ohne eine einzige HTML-Datei `{filesScanned: 0, hits: 0}` — und
  // das Gate machte daraus "0 Slop-Tells", bestanden. Ein --src, das auf den
  // Quellordner statt auf den Build zeigt, auf einen Tippfehler, auf ein leeres
  // dist/ — jedes davon war ein gruener Slop-Check ueber nichts.
  // Dateien, die der Scanner nicht als UTF-8 lesen konnte. Ihre Umlaute wurden
  // zu Ersatzzeichen, also greift dort kein deutsches Muster mehr — sie sind
  // ungeprueft, egal was `hits` sagt.
  //
  // Gemessen 01.08.2026: eine Latin-1-Datei mit drei deutschen Floskeln lief
  // durch, das Tor meldete "PASS — 0 Slop-Tells". Dieselbe Datei in UTF-8 ergab
  // einen Treffer. Alte CMS-Exporte und Windows-Werkzeuge schreiben Latin-1 bis
  // heute, und betroffen sind ausgerechnet die deutschen Seiten.
  // Dateien, die der Scanner gar nicht oeffnen konnte. Sie zaehlen in
  // filesScanned mit, sind aber ungeprueft — gemessen 01.08.2026 mit chmod
  // 000: das Tor meldete "PASS — 0 Slop-Tells" ueber eine Datei, die nie
  // gelesen wurde.
  const nichtGelesen = Array.isArray(parsed.unlesbareDateien) ? parsed.unlesbareDateien : [];
  if (nichtGelesen.length) {
    record('ai-slop', false,
      `${nichtGelesen.length} Datei(en) nicht lesbar — ungeprueft trotz filesScanned: ${nichtGelesen.slice(0, 3).join(', ')}${nichtGelesen.length > 3 ? ' …' : ''}`);
    return;
  }

  const unlesbar = Array.isArray(parsed.kaputteKodierung) ? parsed.kaputteKodierung : [];
  if (unlesbar.length) {
    record('ai-slop', false,
      `${unlesbar.length} Datei(en) nicht als UTF-8 lesbar — dort greift kein deutsches Muster: ${unlesbar.slice(0, 3).join(', ')}${unlesbar.length > 3 ? ' …' : ''}`);
    return;
  }

  const gelesen = parsed.filesScanned;
  if (typeof gelesen === 'number' && gelesen === 0) {
    record('ai-slop', false,
      'Slop-Scan hat 0 Dateien gelesen — zeigt --src auf den richtigen Ordner? (leerer Lauf, kein sauberes Ergebnis)');
    return;
  }

  const s = slopTeilen(parsed);
  // Die Abkuerzung "n === 0 -> gruen" stand frueher VOR dieser Pruefung. Meldet der
  // Scanner {hits: 0, findings: [...]} — Zaehler kaputt, Funde da —, war das ein
  // stilles Gruen auf einer Seite mit Treffern. Erst Widerspruch pruefen, dann Null.
  if (n === 0 && s.block + s.warn > 0) {
    record('ai-slop', false,
      `Zaehler meldet 0 Tells, die Fundliste enthaelt aber ${s.block + s.warn} — Ausgabe widerspruechlich`);
    return;
  }
  if (n === 0) { record('ai-slop', true, `0 Slop-Tells${deNote}`); return; }
  // Gesamtzahl und Einteilung lesen zwei verschiedene Felder: `hits` (Zahl) und
  // `findings` (Gruppen). Klaffen sie auseinander, sind Treffer gemeldet, die
  // sich keiner Regel zuordnen lassen — dann ist die Einteilung blind und darf
  // nicht Gruen sagen. Sol-Befund 27.07.2026: {hits:1, findings:[]} meldete Gruen.
  if (s.block + s.warn !== n) {
    record('ai-slop', false,
      `${n} Tells gemeldet, aber nur ${s.block + s.warn} einer Regel zuzuordnen — Einteilung unvollstaendig`);
    return;
  }
  const detail = s.block
    ? `${s.block} Blocker (${s.blockNamen})${s.warn ? `, ${s.warn} Warnung(en): ${s.warnNamen}` : ''}`
    : `0 Blocker, ${s.warn} Warnung(en): ${s.warnNamen}`;
  record('ai-slop', s.block <= BUDGET.slopScore, detail + deNote);
}

function checkSlop() {
  // Der Slop-Scan liest den BUILD, nicht die Quelle (siehe LESEORDNER oben).
  const src = LESEORDNER;
  const scan = path.resolve(SKILL_DIR, '../../../design/scripts/scan-ai-slop.mjs');
  if (!fs.existsSync(scan)) { record('ai-slop', true, `scan-ai-slop.mjs nicht gefunden (${scan})`, true); return; }
  if (!src) { record('ai-slop', true, 'kein --src <projektordner> uebergeben', true); return; }
  if (!fs.existsSync(src)) { record('ai-slop', false, `--src existiert nicht: ${src}`); return; }

  // Deutscher Regelsatz (Befund 29.07.2026). Er liegt beim Scanner, nicht hier:
  // die Muster kommen aus copywriting/references/floskel-verbote.md und gehoeren
  // in den design-Skill, der die Slop-Wissensquelle ist. Fehlt die Datei, laeuft
  // der Scan englisch weiter — aber sichtbar, nicht still: das Urteil sagt es an.
  const regelnDe = path.resolve(SKILL_DIR, '../../../design/scripts/rules.de.mjs');
  const deDa = fs.existsSync(regelnDe);
  const argv = deDa ? [scan, src, `--rules=${regelnDe}`, '--json'] : [scan, src, '--json'];

  const melden = (json) => {
    slopMelden(json, deDa);
  };

  try {
    melden(JSON.parse(run('node', argv)));
  } catch (e) {
    // Der Scanner endet zwar immer mit 0 — aber `run()` wirft auch bei einem
    // echten Absturz, und dann steht das JSON manchmal trotzdem auf stdout.
    // Deshalb der zweite Versuch, bevor "Scan kaputt" gemeldet wird.
    try {
      melden(JSON.parse(String(e.stdout || '')));
    } catch {
      record('ai-slop', false, `Slop-Scan kaputt: ${fehlerGrund(e)}`);
    }
  }
}

// --- Check 6: Handwerks-Merkmale (M1-M25 / T1-T10) ------------------------
function checkCraft() {
  const runner = path.join(SKILL_DIR, 'craft-check.mjs');
  if (!fs.existsSync(runner)) { record('craft', true, 'craft-check.mjs nicht gefunden', true); return; }
  for (const route of ROUTES) {
    let out = '';
    let code = 0;
    try {
      out = run('node', [runner, '--url', `${BASE}${route}`, '--json', ...(has('strict') ? ['--strict'] : [])]);
    } catch (e) {
      code = e.status ?? 2;
      out = String(e.stdout || '');
      if (code === 2) { record(`craft${route}`, false, `craft-check kaputt: ${fehlerGrund(e)}`); continue; }
    }
    try {
      const parsed = JSON.parse(out);
      const b = liste(parsed, 'blockers', 'craft-check');
      const w = liste(parsed, 'warns', 'craft-check');
      // Mit --strict zaehlen Warnungen als Fehler. Das entscheidet craft-check
      // selbst ueber seinen Exit-Code — wer hier nur `blockers.length` liest,
      // schluckt das Flag stillschweigend und meldet PASS trotz Warnungen.
      const strengeVerletzt = has('strict') && w.length > 0;
      record(`craft${route}`, b.length === 0 && !strengeVerletzt,
        b.length === 0
          ? `0 Blocker, ${w.length} Warnung(en)${strengeVerletzt ? ' — strict: Warnungen zaehlen als Fehler' : ''}`
          : `${b.length} Blocker: ${b.slice(0, 5).map((f) => `${f.id}`).join(', ')} (+${w.length} Warnungen)`);
    } catch {
      record(`craft${route}`, false, `craft-check-Ausgabe unlesbar (exit ${code})`);
    }
  }
}

// --- Check 7: Formularfelder (F1-F7) --------------------------------------
// Eigener Pruefer, weil die Luecke gemessen ist: ein E-Mail-Feld mit
// type="text", ohne autocomplete, ohne inputmode kam am 29.07.2026 durch axe
// (0 Violations, 31 Passes) UND durch craft-check (kein Formular-Befund).
// Auf einer Landingpage ist das Formular die einzige Conversion.
function checkFormular() {
  const runner = path.join(SKILL_DIR, 'formular-check.mjs');
  if (!fs.existsSync(runner)) { record('formular', true, 'formular-check.mjs nicht gefunden', true); return; }
  for (const route of ROUTES) {
    let out = '';
    let code = 0;
    try {
      out = run('node', [runner, '--url', `${BASE}${route}`, '--json', ...(has('strict') ? ['--strict'] : [])]);
    } catch (e) {
      code = e.status ?? 2;
      out = String(e.stdout || '');
      if (code === 2) { record(`formular${route}`, false, `formular-check kaputt: ${fehlerGrund(e)}`); continue; }
    }
    try {
      const parsed = JSON.parse(out);
      const b = liste(parsed, 'blockers', 'formular-check');
      const w = liste(parsed, 'warns', 'formular-check');
      const strengeVerletzt = has('strict') && w.length > 0;
      // Eine Seite ohne Formular ist nicht kaputt — sie ist nur nicht gemeint.
      // Der Pruefer sagt das mit F0. Das Gate muss es weitersagen, statt "0
      // Blocker" zu melden: sonst liest der Naechste ein geprueftes Formular,
      // wo gar keines war (siehe Link-Check, 29.07.2026).
      const ohneFormular = (parsed.infos || []).some((i) => i.id === 'F0');
      record(`formular${route}`, b.length === 0 && !strengeVerletzt,
        ohneFormular
          ? 'kein Formular auf dieser Seite — nichts zu pruefen'
          : b.length === 0
            ? `0 Blocker, ${w.length} Warnung(en)${strengeVerletzt ? ' — strict: Warnungen zaehlen als Fehler' : ''}`
            : `${b.length} Blocker: ${b.slice(0, 5).map((f) => f.id).join(', ')} (+${w.length} Warnungen)`);
    } catch {
      record(`formular${route}`, false, `formular-check-Ausgabe unlesbar (exit ${code})`);
    }
  }
}

// --- Check 8: Screenshot-Sweep muss sauber durchlaufen ---------------------
//
// Das Urteil hing bis zum 29.07.2026 allein an `r.error`. Vier Manifeste kamen
// damit als Gruen durch, jedes davon ein Sweep, der nichts fotografiert hat:
//   { routes: [] }                            -> "0 Screenshots", bestanden
//   [{ route: '/', shots: [] }]               -> "0 Screenshots", bestanden
//   nur 1 von 3 verlangten Routen im Manifest -> "1 Screenshots", bestanden
//   shots nennt eine Datei, die es nicht gibt -> "1 Screenshots", bestanden
// Der Sweep ist die Grundlage jeder Sichtpruefung. Fehlt das Bild, hat der
// Panel-Schritt nichts zu sehen — und ein Nichts besteht sonst jede Pruefung.
// --- Check 9: kein erfundener Import aus dem Tresor -----------------------
//
// Der Import-Pruefer existierte seit dem 28.07.2026, lief aber nur von Hand.
// Damit war er kein Tor, sondern ein Angebot — und die Regel "erst lib-lookup,
// dann importieren" stand als Prosa-Bitte da, obwohl sie maschinell pruefbar
// ist (Doktrin-Regel 11: erzwingen statt erbitten).
//
// Er braucht als einziger Pruefer keinen Server, sondern `--src`. Ohne --src
// gilt er als uebersprungen — das faellt in der SKIP-Zeile auf, statt still
// als bestanden durchzugehen.
function checkImporte() {
  if (!SRC) { record('importe', true, 'ohne --src kein Quellcode zum Pruefen', true); return; }
  const runner = path.join(SKILL_DIR, 'import-check.mjs');
  if (!fs.existsSync(runner)) { record('importe', true, 'import-check.mjs nicht gefunden', true); return; }
  let out = '';
  let code = 0;
  try {
    out = run('node', [runner, '--src', SRC, '--json']);
  } catch (e) {
    code = e.status ?? 2;
    out = String(e.stdout || '');
    if (code === 2) { record('importe', false, `import-check kaputt: ${fehlerGrund(e)}`); return; }
  }
  try {
    const parsed = JSON.parse(out);
    const b = liste(parsed, 'befunde', 'import-check');
    // Wie beim Formular-Check (F0): "nichts zu pruefen" muss anders klingen als
    // "geprueft und sauber". Eine reine HTML-Seite importiert nichts aus dem
    // Tresor — das ist kein bestandener Import-Check, das ist gar keiner.
    // "0 Dateien gelesen" ist etwas anderes als "Dateien gelesen, keine
    // Tresor-Importe". Der erste Fall heisst: --src zeigt auf einen Ordner ohne
    // Quellcode (falscher Pfad mit Tippfehler im richtigen Elternordner, Build
    // statt Quelle, vergessenes Unterverzeichnis). Der Pruefer hat dann NICHTS
    // gelesen und meldete bisher denselben Satz wie eine echte HTML-Seite ohne
    // Importe. Gemessen am 30.07.2026 an einem leeren Ordner: dateien 0,
    // geprueft 0, Exit 0 — nichts geprueft, sieht aus wie sauber.
    // Ein fehlender Ordner wird sauber mit Exit 2 abgefangen; ein LEERER nicht.
    // Nur den TEXT zu aendern reicht nicht — der Check wuerde sonst weiter als
    // gruen zaehlen und die neue Warnung stuende mitten in einer Erfolgsliste.
    // Denselben Fehler hatte --no-shots: Grund korrekt benannt, Ergebnis
    // trotzdem bestanden. SKIP ist hier der VIERTE Parameter von record();
    // ein `null` als zweiter waere FAIL geworden — falscher Alarm statt
    // ehrlicher Luecke.
    record('importe', b.length === 0,
      b.length === 0
        ? parsed.dateien === 0
          ? 'KEINE Quelldatei unter --src gefunden — nichts gelesen, nicht geprueft'
          : parsed.geprueft === 0
            ? 'kein Import aus dem Tresor — nichts zu pruefen'
            : `${parsed.geprueft} Tresor-Import(e) in ${parsed.dateien} Datei(en), keiner erfunden`
        : `${b.length} erfundene(r) Import: ${b.slice(0, 5).map((f) => `${f.name} aus ${f.quelle}`).join(', ')}`,
      parsed.dateien === 0);
  } catch {
    record('importe', false, `import-check-Ausgabe unlesbar (exit ${code})`);
  }
}

// Motion-Sprache. Wie der Import-Check braucht er die QUELLE, nicht den Build:
// im Buendel sind Klassennamen und Kurven zusammengeworfen.
//
// Warum im Tor und nicht nur von Hand: die Doktrin sagt "beides im selben
// Projekt -> eine waehlen". Dieser Satz war eine Bitte, und nichts hat je
// nachgesehen, ob ein Projekt ihn befolgt (Doktrin-Regel 11: erzwingen statt
// erbitten). Nachgemessen in der eigenen Bibliothek: drei Ease-Kurven im
// Bestand, die dritte hatte nie jemand entschieden.
function checkMotion() {
  if (!SRC) { record('motion', true, 'ohne --src kein Quellcode zum Pruefen', true); return; }
  const runner = path.join(SKILL_DIR, 'motion-check.mjs');
  if (!fs.existsSync(runner)) { record('motion', true, 'motion-check.mjs nicht gefunden', true); return; }
  let out = '';
  let code = 0;
  try {
    // Der Ordner ist ein Positionsargument, kein --src (anders als import-check).
    out = run('node', [runner, SRC, '--json']);
  } catch (e) {
    code = e.status ?? 2;
    out = String(e.stdout || '');
    if (code === 2) { record('motion', false, `motion-check kaputt: ${fehlerGrund(e)}`); return; }
  }
  try {
    const parsed = JSON.parse(out);
    if (parsed.fehler) { record('motion', false, `motion-check: ${parsed.fehler}`); return; }
    const befunde = liste(parsed, 'befunde', 'motion-check');
    // "0 Dateien gelesen" ist kein bestandener Motion-Check, sondern ein leerer
    // Lauf — dieselbe Frage wie beim Slop-Scan und beim Link-Check.
    if (parsed.dateienGelesen === 0) {
      record('motion', false, 'Motion-Check hat 0 Dateien gelesen — zeigt --src auf den richtigen Ordner?');
      return;
    }
    const blocker = befunde.filter((b) => b.stufe === 'BLOCK');
    const warn = befunde.filter((b) => b.stufe === 'WARN');
    record('motion', (parsed.block || 0) === 0,
      blocker.length === 0
        ? `${parsed.kurvenAnzahl} Ease-Kurve(n) in ${parsed.dateienGelesen} Datei(en)${warn.length ? `, ${warn.length} Warnung(en)` : ''}`
        : `${blocker.length} Befund(e): ${blocker.slice(0, 3).map((b) => b.was || b.id).join(', ')}`);
  } catch {
    record('motion', false, `motion-check-Ausgabe unlesbar (exit ${code})`);
  }
}

// --- Check 7c: Haelt die ARIA-Rolle ihr Versprechen? ----------------------
//
// axe prueft, ob die Rollen stimmen — nicht, ob das Ding, das sich
// role="listbox" nennt, auf Pfeiltasten reagiert. Befund 29.07.2026 in der
// eigenen Komponentenbibliothek: 7 von 10 zusammengesetzten Widgets hatten
// saubere Rollen und keine Tastaturbedienung, alle gruen bei axe. select.tsx
// sind 411 Zeilen mit role=listbox/option — und null Pfeiltasten.
//
// Liest wie motion und Slop den Quelltext: Tastenlogik steht in
// Event-Handlern, im gerenderten DOM sieht man sie nicht.
function checkTastatur() {
  const runner = path.join(SKILL_DIR, 'tastatur-check.mjs');
  if (!fs.existsSync(runner)) { record('tastatur', true, 'tastatur-check.mjs nicht gefunden', true); return; }
  if (!SRC) { record('tastatur', true, 'ohne --src kein Quellcode zum Pruefen', true); return; }
  if (!fs.existsSync(SRC)) { record('tastatur', false, `--src existiert nicht: ${SRC}`); return; }
  let out = '';
  let code = 0;
  try {
    out = run('node', [runner, SRC, '--json']);
  } catch (e) {
    code = e.status ?? 2;
    out = String(e.stdout || '');
    if (code === 2) { record('tastatur', false, `tastatur-check kaputt: ${fehlerGrund(e)}`); return; }
  }
  try {
    const parsed = JSON.parse(out);
    if (parsed.fehler) { record('tastatur', false, `tastatur-check: ${parsed.fehler}`); return; }
    const befunde = liste(parsed, 'befunde', 'tastatur-check');
    if (parsed.dateienGelesen === 0) {
      record('tastatur', false, 'tastatur-check hat 0 Dateien gelesen — zeigt --src auf den richtigen Ordner?');
      return;
    }
    const blocker = befunde.filter((b) => b.stufe === 'BLOCK');
    const warn = befunde.filter((b) => b.stufe === 'WARN');
    record('tastatur', blocker.length === 0,
      blocker.length === 0
        ? parsed.widgets === 0
          ? 'keine zusammengesetzten Widgets — nichts zu pruefen'
          : `${parsed.widgets} Widget(s) bedienbar${warn.length ? `, ${warn.length} Warnung(en)` : ''}`
        : `${blocker.length} Rolle(n) ohne Tastatur: ${blocker.slice(0, 3).map((b) => `${b.datei} (${b.rolle})`).join(', ')}`);
  } catch {
    record('tastatur', false, `tastatur-check-Ausgabe unlesbar (exit ${code})`);
  }
}

function checkSweep() {
  const sweep = path.join(SKILL_DIR, 'shot-sweep.mjs');
  // Ist Capture für diesen Lauf ausgewählt, muss es tatsächlich ausführbar sein.
  if (!fs.existsSync(sweep)) {
    record('shot-sweep', false, `shot-sweep.mjs fehlt (${sweep}) — ohne ihn entsteht kein Screenshot`);
    return;
  }
  const shotDir = path.join(OUT, 'shots');
  const runId = get('run-id', process.env.SHOT_SWEEP_RUN_ID || null);
  const buildRevision = get('build-revision', process.env.SHOT_SWEEP_BUILD_REVISION || null);
  const stateSpec = get('state-spec', null);
  const argv = [
    sweep, '--base', BASE, '--routes', ROUTES.join(','), '--out', shotDir,
    '--static', '--mobile',
    '--run-id', runId == null ? '' : String(runId),
    '--build-revision', buildRevision == null ? '' : String(buildRevision),
  ];
  if (stateSpec) argv.push('--states', '--state-spec', stateSpec);
  try {
    let sweepFehler = null;
    try {
      run('node', argv);
    } catch (e) {
      sweepFehler = e;
    }
    let manifest;
    try {
      manifest = JSON.parse(fs.readFileSync(path.join(shotDir, 'manifest.json'), 'utf8'));
    } catch (e) {
      record('shot-sweep', false,
        `Sweep fehlgeschlagen: Manifest JSON fehlt oder kaputt (${String(e.message).split('\n')[0]})`);
      return;
    }
    const maengel = sweepMaengel(manifest, ROUTES, shotDir)
      .concat(sweepVertrag(manifest, { runId, buildRevision }));
    if (sweepFehler && maengel.length === 0) {
      maengel.push(`shot-sweep Exit ${sweepFehler.status ?? 2}: ${fehlerGrund(sweepFehler)}`);
    }
    const shots = liste(manifest, 'routes', 'shot-sweep').reduce((n, r) => n + (r.shots?.length || 0), 0);
    record('shot-sweep', maengel.length === 0,
      maengel.length ? maengel.join(' | ') : `${shots} Screenshots in ${shotDir}`);
  } catch (e) {
    record('shot-sweep', false, `Sweep fehlgeschlagen: ${String(e.message).split('\n')[0]}`);
  }
}

// Getrennt von checkSweep, damit evals/run-sweep-check.mjs sie ohne Browser
// gegen erfundene Manifeste fahren kann.
function sweepMaengel(manifest, verlangt, shotDir) {
  const routen = liste(manifest, 'routes', 'shot-sweep');
  const maengel = [];

  const errs = routen.filter((r) => r.error);
  if (errs.length) maengel.push(`${errs.length} Route(n) fehlerhaft: ${errs.map((r) => r.route).join(', ')}`);

  // Jede verlangte Route muss im Manifest stehen — sonst hat der Sweep sie
  // uebersprungen, ohne einen Fehler zu melden.
  const gesehen = new Set(routen.map((r) => String(r.route).replace(/\/$/, '') || '/'));
  const fehlend = verlangt.filter((r) => !gesehen.has(r.replace(/\/$/, '') || '/'));
  if (fehlend.length) maengel.push(`nie fotografiert: ${fehlend.join(', ')}`);

  // Und jede muss mindestens ein Bild haben. Eine Route mit shots: [] ist kein
  // Fehler im Manifest-Sinn, aber sie ist auch keine Sichtpruefung.
  const leer = routen.filter((r) => !r.error && !(r.shots?.length));
  if (leer.length) maengel.push(`ohne einen einzigen Screenshot: ${leer.map((r) => r.route).join(', ')}`);

  // Ein Dateiname im Manifest ist eine Behauptung. Nachsehen ist billig.
  if (shotDir) {
    const weg = [];
    for (const r of routen) {
      for (const s of r.shots || []) {
        if (!fs.existsSync(path.join(shotDir, s.file))) weg.push(s.file);
      }
    }
    if (weg.length) maengel.push(`${weg.length} Datei(en) im Manifest fehlen auf der Platte: ${weg.slice(0, 3).join(', ')}`);
  }
  return maengel;
}


const checks = {
  lighthouse: checkLighthouse, axe: checkAxe, links: checkLinks, 'ai-slop': checkSlop,
  craft: checkCraft, formular: checkFormular, importe: checkImporte, motion: checkMotion,
  tastatur: checkTastatur, 'shot-sweep': checkSweep,
};
const selectedChecks = has('checks') ? get('checks', '').split(',').map((s) => s.trim())
  : Object.keys(checks).filter((name) => name !== 'shot-sweep' || !has('no-shots'));
if (!selectedChecks.length || selectedChecks.some((name) => !checks[name]) || new Set(selectedChecks).size !== selectedChecks.length) {
  console.error(`--checks braucht eindeutige Werte aus ${Object.keys(checks).join(',')}`);
  process.exit(2);
}
function finish(code) {
  writeG1Report(path.join(OUT, 'g1-report.json'), { runId: RUN_ID, buildRevision: BUILD_REVISION, base: BASE, routes: ROUTES }, results, code, {
    budget: BUDGET, budgetDatei: budgetFile, budgetGelockert: BUDGET_GELOCKERT, required_checks: selectedChecks,
  });
  process.exit(code);
}

// --- main ------------------------------------------------------------------
fs.mkdirSync(OUT, { recursive: true });
console.log(`G1-Gate — ${BASE} — Routen: ${ROUTES.join(', ')}`);
// Welcher Ordner gelesen wurde, muss dastehen. Genau weil es NICHT dastand,
// fiel monatelang nicht auf, dass Slop-Scan und Import-Check denselben Ordner
// bekamen, obwohl sie Gegensaetzliches brauchen.
if (SRC) {
  const woher = BUILD_EXPLIZIT ? '--build' : (BUILD ? 'gefunden unter --src' : 'kein Build-Ordner — --src gilt als Build');
  console.log(`Quelle (Importe): ${SRC}`);
  console.log(`Build  (Slop, Routen): ${LESEORDNER}   [${woher}]`);
}
if (BUDGET_GELOCKERT.length) {
  console.log(`Budget gelockert (${budgetFile}): ${BUDGET_GELOCKERT.join(' | ')}`);
}
console.log('');

if (!checkServer()) {
  console.log('\nServer nicht erreichbar — Gate kann nicht urteilen.');
  finish(2);
}

for (const name of selectedChecks) checks[name]();

const failed = results.filter((r) => !r.ok && !r.skipped);
const skipped = results.filter((r) => r.skipped);
const reportPath = path.join(OUT, 'g1-report.json');

console.log(`\nReport: ${reportPath}`);
// Frueher stand hier pauschal "(Tool fehlt)". Das ist die falsche Faehrte: bei
// Import-, Motion- und Slop-Check fehlt meist kein Werkzeug, sondern schlicht
// `--src`. Wer "Tool fehlt" liest, sucht nach einer Installation, die es gar
// nicht braucht. Der Grund steht in der SKIP-Zeile jedes Checks — hier wird er
// zusammengefasst statt geraten.
if (skipped.length) {
  // Jeder SKIP nennt SEINEN Grund, nicht einen von zwei vorgegebenen.
  //
  // Die erste Fassung kannte "kein --src" und "Werkzeug fehlt". Am 30.07.2026 kam
  // `--no-shots` dazu und wurde als "Werkzeug fehlt" gemeldet — das Werkzeug war
  // da, abgeschaltet hatte es der Aufrufer. Dieselbe falsche Faehrte wie vorher
  // bei "(Tool fehlt)", nur eine Ebene weiter: eine feste Liste von Gruenden
  // wird beim naechsten neuen Grund wieder falsch.
  const grundVon = (r) => {
    const d = r.detail || '';
    if (/--no-shots/.test(d)) return 'per --no-shots abgeschaltet';
    // Reihenfolge zaehlt: "KEINE Quelldatei unter --src gefunden" erwaehnt das
    // Flag, obwohl es gesetzt WAR. Ein Muster, das auf die Nennung eines Flags
    // reagiert statt auf seine Bedeutung, uebersetzt den Fall dann in sein
    // Gegenteil — hier stand "kein --src", wo --src korrekt gesetzt und der
    // Ordner nur leer war. Dritter Anlauf an dieser Zeile: sie ist der Ort, an
    // dem ein Detailtext zu einer Kategorie gerundet wird, und jedes Runden
    // kann daneben liegen. Die spezifischste Bedingung muss zuerst stehen.
    if (/KEINE Quelldatei/.test(d)) return '--src zeigt auf Ordner ohne Quellcode';
    // Beide echten Wortlaute gemessen, nicht geraten: "ohne --src kein
    // Quellcode zum Pruefen" (importe) und "kein --src <projektordner>
    // uebergeben" (ai-slop).
    if (/ohne --src|kein --src </.test(d)) return 'kein --src';
    if (/nicht gefunden|nicht installiert/.test(d)) return 'Werkzeug fehlt';
    return d.split('—')[0].trim() || 'Grund unbekannt';
  };
  const nachGrund = new Map();
  for (const r of skipped) {
    const g = grundVon(r);
    if (!nachGrund.has(g)) nachGrund.set(g, []);
    nachGrund.get(g).push(r.name);
  }
  const teile = [...nachGrund].map(([g, namen]) => `${namen.join(', ')} (${g})`);
  console.log(`${skipped.length} Check(s) uebersprungen: ${teile.join(' | ')}`);
}

// Der Exit-Code steht in der Schlusszeile MIT DRIN.
//
// Er ist das eigentliche Urteil, aber er ist unsichtbar: wer die Ausgabe durch
// `grep`, `tail` oder `head` schickt, liest danach `$?` der Pipe statt des Tores.
// Das ist am 29.07.2026 zweimal an einem Tag passiert, beide Male mit dem
// falschen Schluss "meldet Blocker und besteht trotzdem". Ein Urteil, das man
// beim Weiterreichen verliert, muss auch im Text stehen.
// Vor dem Exit-1-Urteil: sind ALLE Rot-Meldungen Abstuerze? Dann ist das kein
// Qualitaetsurteil, sondern gar keins.
//
// Ein Pruefer, der GELAUFEN und dabei ABGESTUERZT ist, zaehlt in der Huerde
// weiter unten als gelaufen (die fragt nur nach `!skipped`). Sein Rot wandert
// bis hierher und wird zu "Qualitaet gerissen" — das schickt jemanden los,
// Fehler auf einer Seite zu suchen, die nie geprueft wurde.
//
// Am 30.07.2026 sichtbar geworden, als die neue Zeitgrenze griff: vier Pruefer
// mit ETIMEDOUT, Meldung "G1 GERISSEN (Exit 1) — 4 Check(s)". Die Detailzeilen
// sagten den Grund ("craft-check kaputt: ETIMEDOUT") — nur der Exit-Code log.
//
// Erkennung ueber die Detailtexte statt ueber ein neues Flag: so erfasst sie
// auch die Absturzarten, die es vor der Zeitgrenze schon gab (Pufferueberlauf,
// unlesbares JSON, toter Server), ohne sechs record()-Aufrufe anzufassen, von
// denen einer vergessen wuerde.
//
// Nur wenn KEIN echter Befund daneben steht. Sonst bleibt Exit 1 richtig: dann
// ist nachweislich etwas an der Seite kaputt, und das ist die dringendere
// Nachricht. Ein Tor, das bei einem Absturz einen echten Fund verschluckt,
// waere schlimmer als die Fehleinstufung.
const KAPUTT_RE = /kaputt|fehlgeschlagen|unlesbar|ETIMEDOUT|ENOBUFS|nicht erreichbar/i;
if (failed.length && failed.every((r) => KAPUTT_RE.test(r.detail || ''))) {
  console.log(`\nG1 KANN NICHT URTEILEN (Exit 2) — ${failed.length} Pruefer abgestuerzt, keiner mit Befund:`);
  for (const r of failed) console.log(`  ${r.name}: ${r.detail}`);
  console.log('Das ist kein Urteil ueber die Seite. Ursache beheben, dann erneut.');
  finish(2);
}

if (failed.length) {
  console.log(`\nG1 GERISSEN (Exit 1) — ${failed.length} Check(s): ${failed.map((r) => r.name).join(', ')}`);
  finish(1);
}

// Uebersprungen ist nicht bestanden. Fehlt zu viel Werkzeug, hat das Gate nichts
// geprueft und darf kein Gruen melden — sonst liefert ein kaputter Rechner
// jede Seite durch. Exit 2 heisst "Tor kaputt", nicht "Seite gut".
// Namen tragen die Route als Suffix (`lighthouse/`, `axe/preise`), darum Praefix-Vergleich.
//
// Frueher galt "mindestens 2 von 4 gelaufen" als ausreichend. Diese Schwelle war
// willkuerlich: fehlten Lighthouse UND der Slop-Scan, meldeten axe und craft
// allein ein gruenes Tor — Tempo, Suchmaschinen und KI-Tells waren schlicht
// ungeprueft. Jede der vier Familien beantwortet eine eigene Frage, also muss
// jede mindestens einmal gelaufen sein. Wer eine bewusst weglassen will,
// laesst sie weg und liest Exit 2 als das, was es ist: kein Urteil.
//
// 29.07.2026 kam `formular` als fuenfte Familie dazu. Sie beantwortet eine
// Frage, die keine der anderen vier stellt: fuellt sich dieses Formular auf
// einem Telefon ueberhaupt ausfuellen? Fehlt der Pruefer, ist das ungeprueft —
// und auf einer Landingpage ist das Formular die einzige Conversion.
//
// `importe` steht bewusst NICHT in dieser Liste. Die anderen fuenf haengen an der
// laufenden Seite und sind immer beantwortbar; der Import-Check braucht `--src`.
// Waere er Pflichtfamilie, wuerde jeder Lauf ohne Quellordner mit Exit 2 enden —
// aus einem fehlenden Argument wuerde ein kaputtes Tor. Er faellt trotzdem auf:
// ohne `--src` erscheint er in der SKIP-Zeile, und die Routen-Vollstaendigkeit
// weiter unten verlangt `--src` ohnehin fuer jede Auslieferung.
// motion gehoert dazu: er beantwortet eine Frage, die sonst keiner stellt —
// ob die Bewegungen des Projekts EINE Sprache sprechen. Kein anderer Pruefer
// vertritt ihn (gleiche Begruendung wie bei den fuenf anderen, 27.07.2026).
// Warum shot-sweep hier NICHT steht, obwohl er die Screenshot-Pflicht einloest:
// er braucht ihn nicht. Diese Liste faengt Pruefer, die STILL ausfallen (Werkzeug
// fehlt -> SKIP -> waere sonst ein gruenes Feld). Der Sweep faellt nicht still —
// nachgemessen 30.07.2026, indem er absichtlich mit Exit 3 abgebrochen wurde:
//
//   [FAIL] shot-sweep — Sweep fehlgeschlagen: Command failed: node .../shot-sweep.mjs
//   G1 GERISSEN (Exit 1) — 1 Check(s): shot-sweep
//
// Ein Ausfall wird also zum Qualitaetsfehler, nicht zu einem uebersprungenen
// Feld. In QUALITAET aufgenommen wuerde er stattdessen Exit 2 erzwingen — das
// waere sachlich falsch: ein abgestuerzter Browser ist kein Urteil ueber die
// Seite. Die Frage ist damit geprueft, nicht offen.
const QUALITAET = selectedChecks;
const fehltGanz = QUALITAET.filter((q) =>
  !results.some((r) => r.name.startsWith(q) && !r.skipped));
if (fehltGanz.length || skipped.length) {
  console.log(`\nG1 KANN NICHT URTEILEN (Exit 2) — kein einziger Lauf in: ${fehltGanz.join(', ')}.`);
  console.log('Uebersprungen ist nicht bestanden. Werkzeug nachinstallieren bzw. --src setzen, dann erneut.');
  finish(2);
}

// Letzte Huerde: gruen fuer EINIGE Seiten ist kein gruen fuer die Website.
//
// Die erste Fassung fragte nur, ob --routes ueberhaupt gesetzt ist. Wer 2 von 28
// Seiten nannte, bekam Gruen fuers Ganze — dieselbe Luecke, nur eine Ebene tiefer.
// Es zaehlt nicht, ob Routen genannt wurden, sondern ob ALLE genannt wurden.
if (SRC && !has('checks')) {
  const geprueft = new Set(ROUTES.map((r) => r.replace(/\/$/, '') || '/'));
  // Der Routen-Zaehler zaehlt AUSGELIEFERTE Seiten -> Build, nicht Quelle.
  const ungesehen = seitenImBuild(LESEORDNER)
    .filter((schreibweisen) => !schreibweisen.some((s) => geprueft.has(s.replace(/\/$/, '') || '/')))
    .map(([erste]) => erste);
  if (ungesehen.length) {
    const zeigen = ungesehen.slice(0, 12).join(', ');
    console.log(`\nG1 KANN NICHT URTEILEN (Exit 2) — ${ungesehen.length} Seite(n) im Build wurden nie geoeffnet.`);
    console.log(`Ungesehen: ${zeigen}${ungesehen.length > 12 ? ` … (+${ungesehen.length - 12})` : ''}`);
    console.log('Ungesehen ist nicht bestanden. Alle Routen mit --routes benennen');
    console.log('(vollstaendige Liste: node scripts/pruefstand.mjs --dir <build> --routen).');
    finish(2);
  }
}

// Ein Gruen mit gelockertem Budget ist ein Gruen unter Vorbehalt. Es muss in der
// Schlusszeile stehen, sonst liest der Naechste es als volles Bestehen.
if (BUDGET_GELOCKERT.length) {
  console.log(`\nG1 BESTANDEN MIT GELOCKERTEM BUDGET (Exit 0) — ${results.length - skipped.length} Check(s) gruen.`);
  console.log(`Gelockert: ${BUDGET_GELOCKERT.join(' | ')} (Datei: ${budgetFile})`);
} else {
  console.log(`\nG1 BESTANDEN (Exit 0) — ${results.length - skipped.length} Check(s) gruen.`);
}

finish(0);
}

if (fileURLToPath(import.meta.url) === path.resolve(process.argv[1] || '')) runGate();
