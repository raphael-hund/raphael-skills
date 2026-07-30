#!/usr/bin/env node
/**
 * run-klon-gate.mjs — urteilt das Klon-Tor, oder winkt es durch?
 *
 * Befund 29.07.2026: Der Klon-Weg hatte zwoelf Werkzeuge und kein
 * Annahmekriterium. `visual-diff.mjs` rechnet eine Note von 5 bis 1 aus — und
 * endet danach IMMER mit Exit 0, egal wie schlecht sie ist (am Code
 * nachgelesen: `process.exit(1)` steht nur im catch-Block). Niemand hat die
 * Zahl je gegen etwas gehalten.
 *
 * Gleichzeitig nennt web-clone-playbook.md Erwartungswerte pro Stufe (L1 90-98%,
 * L2 70-90%, …) — als Prosa zur Kundenkalibrierung, ohne dass etwas nachmisst.
 * Zwei Haelften derselben Frage, die sich nie begegnet sind. `klon-gate.mjs`
 * bringt sie zusammen.
 *
 * Diese Eval prueft die drei Wege zu falschem Gruen, die ein solches Tor hat:
 *   1. Zu schlechte Treue besteht trotzdem.
 *   2. Ein fehlendes Feld wird als "0 Abweichung" gelesen.
 *   3. Alle Pruefer uebersprungen -> "bestanden", obwohl nichts geprueft wurde.
 * Und die Gegenrichtung: ein guter Klon MUSS durchkommen.
 *
 * Braucht weder Browser noch Netz — nur JSON-Dateien.
 *
 *   node evals/run-klon-gate.mjs
 *
 * Exit 0 = jeder Fall wie erwartet. Exit 1 = mindestens einer daneben.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const TOR = path.join(HIER, '..', 'scripts', 'web-clone', 'klon-gate.mjs');
const DIFF = path.join(HIER, '..', 'scripts', 'web-clone', 'visual-diff.mjs');
if (!fs.existsSync(TOR)) {
  console.error(`FEHLER: klon-gate.mjs nicht gefunden: ${TOR}`);
  process.exit(1);
}

const ordner = fs.mkdtempSync(path.join(os.tmpdir(), 'klon-eval-'));
const schreib = (name, obj) => {
  const p = path.join(ordner, name);
  fs.writeFileSync(p, typeof obj === 'string' ? obj : JSON.stringify(obj));
  return p;
};

// diffRatio ist der Anteil ABWEICHENDER Pixel — Treue ist der Rest.
const D = {
  fast_gleich: schreib('d95.json', { diffRatio: 0.05, meanAbsDiff: 0.03, score: 4 }),
  mittel: schreib('d80.json', { diffRatio: 0.20, meanAbsDiff: 0.09, score: 3 }),
  schlecht: schreib('d65.json', { diffRatio: 0.35, meanAbsDiff: 0.20, score: 1 }),
  ohne_feld: schreib('dohne.json', { score: 4 }),
  unplausibel: schreib('dneg.json', { diffRatio: -0.5 }),
  kaputt: schreib('dkaputt.json', '{ das ist kein json'),
};
const A = {
  leer: schreib('a-ok.json', { blockers: [] }),
  zwei: schreib('a-bad.json', { blockers: [{ id: 'GA4-Rest' }, { id: 'Fremdlogo' }] }),
  anderes_feld: schreib('a-alt.json', { findings: [{ type: 'tracker' }] }),
  ohne_liste: schreib('a-nix.json', { status: 'fertig' }),
};

function lauf(extra) {
  try {
    const out = execFileSync('node', [TOR, ...extra], { encoding: 'utf8', timeout: 60000 });
    return { code: 0, out };
  } catch (e) {
    return { code: e.status ?? 1, out: `${e.stdout || ''}${e.stderr || ''}` };
  }
}

let fehler = 0;
let geprueft = 0;   // von zeile() hochgezaehlt
const zeile = (ok, text, detail) => {
  geprueft++;
  if (!ok) fehler++;
  console.log(`  [${ok ? 'OK' : '!!'}]   ${text}`);
  if (detail) console.log(`         ${detail}`);
};

console.log('\nKlon-Tor — ist "der Klon ist fertig" ein Exit-Code?\n');

// --- 0. Der Befund selbst: visual-diff blockt nicht ----------------------
// Wenn jemand visual-diff spaeter mit einem eigenen Exit-Code ausstattet, ist
// dieses Tor teilweise ueberfluessig — das soll auffallen, nicht unbemerkt
// bleiben. Darum steht der Befund hier als pruefbare Aussage.
console.log('Ausgangspunkt (der Grund fuer dieses Tor):\n');
{
  const txt = fs.readFileSync(DIFF, 'utf8');
  // process.exit(1) darf NUR im Fehlerpfad stehen, nicht an einer Schwelle.
  const nurImCatch = /catch \(error\) \{[\s\S]{0,200}process\.exit\(1\)/.test(txt);
  const schwelle = /score\s*<|diffRatio\s*>[\s\S]{0,80}process\.exit/.test(txt);
  zeile(nurImCatch && !schwelle,
    'visual-diff.mjs blockt weiterhin nicht an der Note (nur Exit 1 bei Absturz)',
    nurImCatch && !schwelle ? null
      : 'visual-diff urteilt jetzt selbst — dieses Tor pruefen, ob es noch passt');
}

// --- 1. Muss reissen ------------------------------------------------------
console.log('\nDiese muessen reissen:\n');
const reissen = [
  ['Treue unter der Stufen-Grenze (L2, 65%)', ['--stufe', 'L2', '--diff', D.schlecht], 1],
  ['Treue unter L1-Grenze (L1, 80%)', ['--stufe', 'L1', '--diff', D.mittel], 1],
  ['diffRatio fehlt — nicht als "0 Abweichung" lesen', ['--stufe', 'L2', '--diff', D.ohne_feld], 1],
  ['diffRatio unplausibel (negativ)', ['--stufe', 'L2', '--diff', D.unplausibel], 1],
  ['Launch-Blocker im Audit', ['--stufe', 'L2', '--diff', D.fast_gleich, '--audit', A.zwei], 1],
  ['Audit-Fundliste unter anderem Namen wird gefunden', ['--stufe', 'L2', '--diff', D.fast_gleich, '--audit', A.anderes_feld], 1],
  ['audit.json ohne bekannte Fundliste', ['--stufe', 'L2', '--diff', D.fast_gleich, '--audit', A.ohne_liste], 1],
  ['audit.json existiert nicht', ['--stufe', 'L2', '--diff', D.fast_gleich, '--audit', '/tmp/gibt-es-nicht.json'], 1],
];
for (const [was, argv, erwartet] of reissen) {
  const r = lauf(argv);
  zeile(r.code === erwartet, was, r.code === erwartet ? null : `Exit ${r.code}, erwartet ${erwartet}`);
}

// --- 2. Muss Exit 2 geben (kein Urteil, aber auch kein Bestehen) ---------
console.log('\nDiese sind KEIN Bestehen, aber unterscheidbar (Exit 2):\n');
const zwei = [
  ['Stufe fehlt — wird nicht geraten', ['--diff', D.fast_gleich]],
  ['Stufe unbekannt', ['--stufe', 'L9', '--diff', D.fast_gleich]],
  ['--diff fehlt', ['--stufe', 'L2']],
  ['--diff existiert nicht', ['--stufe', 'L2', '--diff', '/tmp/gibt-es-nicht.json']],
  ['visual-diff.json kaputt', ['--stufe', 'L2', '--diff', D.kaputt]],
  ['vertipptes Flag faellt nicht auf den Default zurueck', ['--stufe', 'L2', '--diff', D.fast_gleich, '--audits', A.leer]],
  // Der Audit ist die einzige Rechtspruefung dieses Tors. Ohne ihn stand bis
  // zum 30.07.2026 "KLON-TOR BESTANDEN" — bei guter Treue reichte die allein.
  // Ein Klon mit dem Analytics-Code der fremden Seite waere so ausgeliefert
  // worden. Exit 2, nicht 1: der Audit ist nicht durchgefallen, er hat nicht
  // geurteilt.
  ['gute Treue ohne --audit ist kein Bestehen', ['--stufe', 'L2', '--diff', D.fast_gleich]],
  // L5 hat keine Pixel-Grenze; ohne --audit ist damit JEDER Pruefer
  // uebersprungen. Das darf nicht "bestanden" heissen.
  ['L5 ohne Audit — jeder Pruefer uebersprungen', ['--stufe', 'L5', '--diff', D.schlecht]],
];
for (const [was, argv] of zwei) {
  const r = lauf(argv);
  zeile(r.code === 2, was, r.code === 2 ? null : `Exit ${r.code}, erwartet 2`);
}

// --- 3. Muss bestehen -----------------------------------------------------
// Ohne diesen Teil waere das Tor auch durch "reisse immer" erfuellbar — und ein
// Tor, das nie gruen wird, wird abgeschaltet.
console.log('\nDiese muessen bestehen — sonst ist das Tor nur Schikane:\n');
const bestehen = [
  // Diese drei pruefen die Treue-SCHWELLEN. Sie brauchen trotzdem ein leeres
  // Audit-File: seit dem 30.07.2026 ist die Rechtspruefung Pflicht, und ohne
  // sie endet das Tor mit Exit 2 ("kein Urteil"). Ohne das Argument wuerden sie
  // nicht mehr die Schwelle messen, sondern die fehlende Pflichtangabe.
  ['L1 mit 95% Treue', ['--stufe', 'L1', '--diff', D.fast_gleich, '--audit', A.leer]],
  ['L2 mit 80% Treue (Grenze 70%)', ['--stufe', 'L2', '--diff', D.mittel, '--audit', A.leer]],
  ['L4 mit 65% Treue (Grenze 50%)', ['--stufe', 'L4', '--diff', D.schlecht, '--audit', A.leer]],
  ['L2 mit gutem Diff und leerem Audit', ['--stufe', 'L2', '--diff', D.fast_gleich, '--audit', A.leer]],
  ['L5 mit leerem Audit — Treue uebersprungen, Audit urteilt', ['--stufe', 'L5', '--diff', D.schlecht, '--audit', A.leer]],
];
for (const [was, argv] of bestehen) {
  const r = lauf(argv);
  zeile(r.code === 0, was, r.code === 0 ? null : `Exit ${r.code}: ${r.out.split('\n').filter(Boolean).slice(-2).join(' | ')}`);
}

// --- 4. Die echte Kette: audit-clone -> klon-gate ------------------------
// Bis hierher fuettert die Eval selbstgebaute JSON-Dateien. Das prueft das Tor,
// nicht die Verbindung. Und genau die war kaputt: audit-clone schrieb bis
// 29.07.2026 NUR Markdown fuer menschliche Augen und endete immer mit Exit 0 —
// auch mit einem Google-Tracker im Klon. klon-gate konnte seine Funde gar nicht
// lesen. Ein Fund, den niemand abfragen kann, stoppt keine Auslieferung.
console.log('\nDie echte Kette — audit-clone schreibt, klon-gate liest:\n');
{
  const AUDIT = path.join(HIER, '..', 'scripts', 'web-clone', 'audit-clone.mjs');
  const projDreck = path.join(ordner, 'dreck');
  const projRein = path.join(ordner, 'rein');
  fs.mkdirSync(projDreck); fs.mkdirSync(projRein);
  fs.writeFileSync(path.join(projDreck, 'index.html'),
    '<!doctype html><html><head><script src="https://www.googletagmanager.com/gtag/js?id=G-X"></script>'
    + '</head><body><p>TODO: Text ersetzen</p></body></html>');
  fs.writeFileSync(path.join(projRein, 'index.html'),
    '<!doctype html><html><body><p>Fertiger Text.</p></body></html>');

  const auditLauf = (proj, name) => {
    const md = path.join(ordner, `${name}.md`);
    const js = path.join(ordner, `${name}.json`);
    try {
      execFileSync('node', [AUDIT, '--project', proj, '--out', md, '--json', js],
        { encoding: 'utf8', timeout: 90000 });
    } catch { /* audit endet immer 0; Fehler faellt unten auf */ }
    return js;
  };

  const jsDreck = auditLauf(projDreck, 'a-dreck');
  zeile(fs.existsSync(jsDreck), 'audit-clone schreibt ueberhaupt JSON (--json)',
    fs.existsSync(jsDreck) ? null : 'keine JSON-Datei entstanden');

  if (fs.existsSync(jsDreck)) {
    const d = JSON.parse(fs.readFileSync(jsDreck, 'utf8'));
    zeile(Array.isArray(d.blockers) && d.blockers.length > 0,
      'Tracker + TODO landen als blockers im JSON',
      Array.isArray(d.blockers) ? `${d.blockers.length} Blocker` : 'kein blockers-Feld');
    const r = lauf(['--stufe', 'L2', '--diff', D.fast_gleich, '--audit', jsDreck]);
    zeile(r.code === 1, 'klon-gate reisst am echten Audit eines dreckigen Klons',
      r.code === 1 ? null : `Exit ${r.code}`);
  }

  const jsRein = auditLauf(projRein, 'a-rein');
  if (fs.existsSync(jsRein)) {
    const r = lauf(['--stufe', 'L2', '--diff', D.fast_gleich, '--audit', jsRein]);
    zeile(r.code === 0, 'klon-gate besteht am echten Audit eines sauberen Klons',
      r.code === 0 ? null : `Exit ${r.code}`);
  }
}

fs.rmSync(ordner, { recursive: true, force: true });

// Die Summe zaehlt sich selbst.
//
// Sie stand hier als Handzahl. Bei run-bilder-check war so eine Formel
// nachweislich falsch: gemeldet wurden 9/9, waehrend zwoelf Faelle liefen — drei
// geprueft Faelle blieben unerwaehnt. Der Fehler macht nichts kaputt, er
// VERSCHWEIGT eigene Arbeit, und er wird bei jedem Zusatz neu falsch, weil die
// Zahl an einer Stelle steht, die niemand anfasst, wenn er einen Fall ergaenzt.
//
// Geprueft 30.07.2026: in dieser Datei stimmte sie noch. Umgebaut wird trotzdem
// — die Bauart ist der Fehler, nicht erst sein Eintreten.
// --- Die Schwellen muessen mit dem Playbook uebereinstimmen ----------------
// Im Tor steht "aus der L1-L6-Tabelle in web-clone-playbook.md, bewusst das
// UNTERE Ende". Das war Prosa. Heute haben sich vier von fuenf solcher
// Begruendungen als falsch oder unvollstaendig erwiesen — also nachgemessen:
// die Zahlen stimmen (90/70/65/50, L5/L6 ohne Grenze).
//
// Ein Handvergleich hilft aber nur einmal. Aendert jemand das Playbook, ohne das
// Tor anzufassen (oder umgekehrt), liefert das Tor Urteile nach einer Tabelle,
// die es nicht mehr gibt — und niemand merkt es, weil beide fuer sich stimmig
// aussehen. Darum prueft die Eval den Abgleich mit.
console.log('\nDie Schwellen im Tor stammen aus dem Playbook:\n');
{
  const playbook = path.join(HIER, '..', 'references', 'web-clone-playbook.md');
  const torQuelle = fs.readFileSync(TOR, 'utf8');
  if (!fs.existsSync(playbook)) {
    zeile(false, 'web-clone-playbook.md gefunden', 'ohne die Quelle ist der Abgleich nicht moeglich');
  } else {
    const md = fs.readFileSync(playbook, 'utf8');
    // Aus dem Tor: L1: { min: 0.90, ... }
    const imTor = {};
    for (const m of torQuelle.matchAll(/\b(L[1-6]):\s*\{\s*min:\s*([\d.]+|null)/g)) {
      imTor[m[1]] = m[2] === 'null' ? null : Number(m[2]);
    }
    // Aus dem Playbook: | L1 | >= 90 % |
    const imPlaybook = {};
    for (const m of md.matchAll(/\|\s*(L[1-6])\s*\|\s*≥\s*(\d+)\s*%/g)) {
      imPlaybook[m[1]] = Number(m[2]) / 100;
    }
    const abweichung = [];
    for (const stufe of ['L1', 'L2', 'L3', 'L4']) {
      if (imTor[stufe] !== imPlaybook[stufe]) {
        abweichung.push(`${stufe}: Tor ${imTor[stufe]} vs Playbook ${imPlaybook[stufe]}`);
      }
    }
    zeile(Object.keys(imPlaybook).length >= 4 && abweichung.length === 0,
      `L1-L4 stimmen mit der Tabelle ueberein (${['L1', 'L2', 'L3', 'L4'].map((x) => imTor[x]).join('/')})`,
      abweichung.length ? abweichung.join(' | ')
        : (Object.keys(imPlaybook).length < 4 ? 'Playbook-Tabelle nicht lesbar — Abgleich hat nichts geprueft' : null));
    zeile(imTor.L5 === null && imTor.L6 === null,
      'L5/L6 ohne Pixel-Grenze, wie im Playbook',
      `Tor: L5=${imTor.L5}, L6=${imTor.L6}`);
  }
}

const gesamt = geprueft;
console.log(`\n${gesamt - fehler}/${gesamt} wie erwartet.`);
if (fehler) {
  console.log('Das Klon-Tor urteilt nicht wie behauptet.');
  process.exit(1);
}
console.log('Der Klon besteht an der Stufen-Grenze, nicht am Gefuehl.');
