#!/usr/bin/env node
/*
  klon-gate.mjs — "der Klon ist fertig" ist ein Exit-Code, keine Einschaetzung.

  WARUM ES DIESES TOR GIBT (Befund 29.07.2026)
  Der Klon-Weg hatte zwoelf Werkzeuge und kein Annahmekriterium. `visual-diff.mjs`
  rechnet eine Note von 5 bis 1 aus — und endet danach IMMER mit Exit 0, egal wie
  schlecht sie ist. Niemand hat die Zahl je gegen etwas gehalten.

  Das Playbook nennt gleichzeitig Erwartungswerte pro Komplexitaetsstufe
  (L1 90-98%, L2 70-90%, …). Die standen als Prosa da, zur Kundenkalibrierung —
  ohne dass irgendetwas nachgemessen haette, ob der Klon sie erreicht. Zwei
  Haelften derselben Frage, die sich nie begegnet sind.

  Dieses Tor bringt sie zusammen: die gemessene Wiedergabetreue gegen die
  Erwartung der Stufe, plus die zwei Pruefungen, die vor jedem Launch ohnehin
  gelten (Tracking-Reste, Fremdmarken).

    node klon-gate.mjs --stufe L2 --diff visual-diff.json [--audit audit.json]

  Exit 0 = Treue erreicht, kein Blocker. Exit 1 = Treue verfehlt oder Blocker.
  Exit 2 = Tor selbst nicht lauffaehig (Datei fehlt, Format unbekannt) — bewusst
           KEIN Bestehen, aber unterscheidbar.
*/
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const get = (k, d) => { const i = args.indexOf(`--${k}`); return i >= 0 ? args[i + 1] : d; };

const KNOWN = ['stufe', 'diff', 'audit', 'json', 'help'];
const unbekannt = args.filter((a) => a.startsWith('--') && !KNOWN.includes(a.slice(2)));
if (unbekannt.length) {
  console.error(`Unbekanntes Flag: ${unbekannt.join(', ')}\nErlaubt: ${KNOWN.map((k) => `--${k}`).join(' ')}`);
  process.exit(2);
}
if (args.includes('--help') || !args.length) {
  console.log('Aufruf: node klon-gate.mjs --stufe L1..L6 --diff <visual-diff.json> [--audit <audit.json>] [--json]');
  process.exit(args.includes('--help') ? 0 : 2);
}

// Untergrenze pro Stufe, aus der L1-L6-Tabelle in web-clone-playbook.md.
// Bewusst das UNTERE Ende des dort genannten Bereichs: die Tabelle beschreibt,
// was ueblich erreichbar ist — das Tor fragt, ob das Minimum davon erreicht wurde.
// L5/L6 haben keine sinnvolle Pixelgrenze (WebGL laeuft, oder es laeuft nicht;
// bei L6 ist nur die Anzeigeschicht versprochen) und werden ehrlich uebersprungen
// statt mit einer erfundenen Zahl zu bestehen.
const STUFEN = {
  L1: { min: 0.90, was: 'Statisches HTML/CSS' },
  L2: { min: 0.70, was: 'CMS/Content-Site' },
  L3: { min: 0.65, was: 'React/Vue/Next Content-Frontend' },
  L4: { min: 0.50, was: 'Animierte Brand-Site' },
  L5: { min: null, was: 'WebGL/Canvas/Three.js — Pixel-Grenze nicht sinnvoll' },
  L6: { min: null, was: 'SaaS/Login — nur Anzeigeschicht versprochen' },
};

const stufe = String(get('stufe', '')).toUpperCase();
if (!STUFEN[stufe]) {
  console.error(`--stufe fehlt oder unbekannt: "${get('stufe', '')}". Erlaubt: ${Object.keys(STUFEN).join(', ')}`);
  console.error('Die Stufe wird NICHT geraten: sie entscheidet, was der Klon leisten muss (siehe web-clone-playbook.md).');
  process.exit(2);
}

const diffDatei = get('diff', null);
if (!diffDatei) { console.error('--diff <visual-diff.json> fehlt.'); process.exit(2); }
if (!fs.existsSync(diffDatei)) { console.error(`--diff existiert nicht: ${diffDatei}`); process.exit(2); }

let diff;
try {
  diff = JSON.parse(fs.readFileSync(diffDatei, 'utf8'));
} catch (e) {
  console.error(`--diff unlesbar: ${e.message}`);
  process.exit(2);
}

const befunde = [];
const record = (name, ok, detail, uebersprungen = false) =>
  befunde.push({ name, ok, detail, uebersprungen });

// --- 1. Wiedergabetreue ---------------------------------------------------
// `diffRatio` ist der Anteil abweichender Pixel; Treue ist der Rest davon.
// Fehlt das Feld, ist die Ausgabe nicht die von visual-diff — dann urteilt das
// Tor nicht, sondern sagt das. "Feld fehlt" ist nicht "0 Abweichung".
const q = STUFEN[stufe];
// Beide Namen lesen. visual-diff.mjs schreibt `diffPixelRatio`, dieses Tor
// suchte nur `diffRatio` — gemessen 30.07.2026 mit einer ECHTEN Ausgabe des
// Werkzeugs: "KLON-TOR GERISSEN: treue", Exit 1, bei 1,2 % Abweichung. Die
// Treue-Pruefung war damit unbenutzbar, seit es sie gibt.
//
// Warum die Eval das nicht fand: sie baut ihre Fixtures selbst und schrieb
// `diffRatio` hinein. 28 gruene Faelle ueber ein Feld, das das echte Werkzeug
// nie erzeugt. Genau die Naht, an der schon audit-clone und visual-diff
// gesessen haben.
const rohTreue = typeof diff.diffRatio === 'number' ? diff.diffRatio : diff.diffPixelRatio;
if (typeof rohTreue !== 'number' || Number.isNaN(rohTreue)) {
  record('treue', false, `visual-diff.json ohne brauchbares Feld "diffRatio"/"diffPixelRatio" — falsche Datei oder abgebrochener Lauf?`);
} else if (rohTreue < 0 || rohTreue > 1) {
  record('treue', false, `Abweichungsanteil ausserhalb 0..1 (${rohTreue}) — Ausgabe unplausibel`);
} else {
  const treue = 1 - rohTreue;
  if (q.min === null) {
    record('treue', true, `${stufe}: ${(treue * 100).toFixed(1)}% gemessen, keine Pixel-Grenze fuer diese Stufe (${q.was})`, true);
  } else {
    record('treue', treue >= q.min,
      `${(treue * 100).toFixed(1)}% Wiedergabetreue, ${stufe} verlangt >= ${(q.min * 100).toFixed(0)}% (${q.was})`);
  }
}

// --- 2. Launch-Blocker aus dem Audit -------------------------------------
// audit-clone.mjs sucht Tracking-Reste, Fremdmarken, TODOs, riskante URLs.
// Ohne --audit wird der Check als UEBERSPRUNGEN gefuehrt, nicht als bestanden:
// ein Klon mit dem Analytics-Code der fremden Seite ist ein Rechtsproblem, kein
// Schoenheitsfehler.
const auditDatei = get('audit', null);
if (!auditDatei) {
  record('audit', true, 'kein --audit <audit.json> uebergeben (audit-clone.mjs nicht gelaufen)', true);
} else if (!fs.existsSync(auditDatei)) {
  record('audit', false, `--audit existiert nicht: ${auditDatei}`);
} else {
  try {
    const a = JSON.parse(fs.readFileSync(auditDatei, 'utf8'));
    // Verschiedene Fassungen von audit-clone haben unterschiedlich benannte
    // Felder. Wer nur eins davon liest, meldet Gruen, weil er am falschen Ort
    // nachgesehen hat — dieselbe Falle wie beim Slop-Scan (29.07.2026).
    const kandidaten = ['blockers', 'findings', 'issues', 'befunde'];
    const feld = kandidaten.find((k) => Array.isArray(a[k]));
    if (!feld) {
      record('audit', false, `audit.json ohne bekannte Fundliste (gesucht: ${kandidaten.join(', ')})`);
    } else {
      const n = a[feld].length;
      record('audit', n === 0, n === 0
        ? `0 Launch-Blocker im Audit (${feld})`
        : `${n} Launch-Blocker: ${a[feld].slice(0, 4).map((x) => x.id || x.type || x.name || '?').join(', ')}`);
    }
  } catch (e) {
    record('audit', false, `audit.json unlesbar: ${e.message}`);
  }
}

// --- Urteil ---------------------------------------------------------------
// Wie im G1-Tor: ein uebersprungener Pruefer ist kein bestandener. Sind ALLE
// uebersprungen, gab es kein Urteil — dann Exit 2, nicht 0.
const gelaufen = befunde.filter((b) => !b.uebersprungen);
const gerissen = befunde.filter((b) => !b.ok);

// Der Audit ist die einzige Rechtspruefung dieses Tors. Ohne ihn stand da
// "KLON-TOR BESTANDEN", waehrend der Analytics-Code der fremden Seite noch im
// Klon lag — gemessen 30.07.2026 mit `--stufe L2 --diff` und ohne `--audit`:
// [PASS] treue, [SKIP] audit, Exit 0.
//
// Der Kommentar oben sagte schon das Richtige ("ein Klon mit dem Analytics-Code
// der fremden Seite ist ein Rechtsproblem, kein Schoenheitsfehler"), nur folgte
// dem nichts: `gelaufen.length > 0` war durch die Treue allein erfuellt.
//
// Exit 2, nicht 1: der Audit ist nicht durchgefallen, er hat nicht geurteilt.
// Dieselbe Trennung wie ueberall — uebersprungen ist nicht bestanden.
const auditUebersprungen = befunde.some((b) => b.name === 'audit' && b.uebersprungen);
if (auditUebersprungen && gerissen.length === 0) {
  if (args.includes('--json')) {
    // Im JSON steht `bestanden` sonst auf true — das liest ein Skript als gruen.
    console.log(JSON.stringify({ hinweis: 'Audit fehlt — kein Urteil', bestanden: false }, null, 2));
  } else {
    console.log('KEIN URTEIL: ohne --audit ist die Rechtspruefung nicht gelaufen.\n');
    console.log('  node scripts/web-clone/audit-clone.mjs --project <klon> --json <audit.json>');
    console.log('  dann erneut mit --audit <audit.json>.\n');
  }
  process.exit(2);
}

if (args.includes('--json')) {
  console.log(JSON.stringify({
    stufe, diffDatei: path.resolve(diffDatei), befunde,
    bestanden: gerissen.length === 0 && gelaufen.length > 0,
  }, null, 2));
} else {
  console.log(`\nKlon-Tor — Stufe ${stufe} (${STUFEN[stufe].was})\n`);
  for (const b of befunde) {
    const marke = b.uebersprungen ? 'SKIP' : b.ok ? 'PASS' : 'FAIL';
    console.log(`[${marke}] ${b.name.padEnd(6)} ${b.detail}`);
  }
  console.log('');
}

if (gerissen.length) {
  if (!args.includes('--json')) console.log(`KLON-TOR GERISSEN: ${gerissen.map((b) => b.name).join(', ')}\n`);
  process.exit(1);
}
if (gelaufen.length === 0) {
  if (!args.includes('--json')) {
    console.log('KEIN URTEIL: jeder Pruefer uebersprungen — uebersprungen ist nicht bestanden.\n');
  }
  process.exit(2);
}
if (!args.includes('--json')) console.log('KLON-TOR BESTANDEN.\n');
process.exit(0);
