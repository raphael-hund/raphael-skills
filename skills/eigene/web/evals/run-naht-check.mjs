#!/usr/bin/env node
/**
 * run-naht-check.mjs — sind die Werkzeuge auch WIRKLICH verbunden?
 *
 * Befund 29./30.07.2026, zweimal derselbe Fehler an verschiedenen Stellen:
 *
 *   `visual-diff.mjs` rechnete eine Note von 5 bis 1 aus und endete immer mit
 *   Exit 0 — niemand hielt die Zahl gegen etwas.
 *
 *   `audit-clone.mjs` fand vier Launch-Blocker (darunter einen Google-Tracker)
 *   und schrieb sie nur als Markdown. Das Klon-Tor erwartete JSON, das es nie
 *   gab. Beide Werkzeuge funktionierten fuer sich; sie redeten aneinander vorbei.
 *
 *   `slopNamen()` im G1-Tor war toter Code — von `slopTeilen()` abgeloest, aber
 *   liegen geblieben. Die zugehoerige Eval schnitt sie sogar heraus und prueft
 *   sie, also eine Funktion, die das Tor nie aufruft.
 *
 * Alle drei sind dieselbe Sorte Fehler: nicht im Werkzeug, sondern in der NAHT.
 * Eine Eval mit selbstgebauten Eingaben prueft ein Werkzeug — nie die Stelle,
 * an der zwei sich beruehren. Genau dort ist bisher jeder Fehler dieser Runde
 * gesessen.
 *
 * Diese Eval prueft die Naehte selbst, ohne Browser und ohne Netz:
 *   1. Kein toter Code im G1-Tor und im Klon-Tor.
 *   2. Jeder Pruefer, der eine Funktion hat, wird auch aufgerufen.
 *   3. Jede Eval, die eine Gate-Funktion HERAUSSCHNEIDET, prueft eine, die es
 *      im Gate noch gibt — sonst prueft sie eine Fassade.
 *   4. Jedes Werkzeug, dessen Ausgabe ein Tor liest, kann sie maschinenlesbar
 *      schreiben.
 *
 *   node evals/run-naht-check.mjs
 *
 * Exit 0 = jede Naht haelt. Exit 1 = mindestens eine ist offen.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const SKRIPTE = path.join(HIER, '..', 'scripts');
const CLONE = path.join(SKRIPTE, 'web-clone');

let fehler = 0;
const zeile = (ok, text, detail) => {
  if (!ok) fehler++;
  console.log(`  [${ok ? 'OK' : '!!'}]   ${text}`);
  if (detail) console.log(`         ${detail}`);
};

console.log('\nNaht-Check — beruehren sich die Werkzeuge wirklich?\n');

// --- 1. Toter Code -------------------------------------------------------
// Eine Funktion, die nur einmal vorkommt, ist nur definiert und nie benutzt.
// Das ist an sich harmlos — aber es heisst, dass jemand einen Umbau nicht zu
// Ende gefuehrt hat, und der Rest des Umbaus koennte an einer Stelle liegen, die
// weniger harmlos ist. Genau so war es bei slopNamen/slopTeilen.
console.log('Kein toter Code in den Toren:\n');
for (const datei of [
  path.join(SKRIPTE, 'g1-gate.mjs'),
  path.join(CLONE, 'klon-gate.mjs'),
]) {
  const txt = fs.readFileSync(datei, 'utf8');
  const namen = [...txt.matchAll(/^function ([a-zA-Z][a-zA-Z0-9_]*)\s*\(/gm)].map((m) => m[1]);
  const tot = namen.filter((n) => {
    // Vorkommen als Aufruf zaehlen, die Definitionszeile abziehen.
    const alle = (txt.match(new RegExp(`\\b${n}\\s*\\(`, 'g')) || []).length;
    return alle <= 1;
  });
  zeile(tot.length === 0, `${path.basename(datei)}: ${namen.length} Funktionen, alle benutzt`,
    tot.length ? `nie aufgerufen: ${tot.join(', ')}` : null);
}

// --- 2. Jeder Pruefer wird aufgerufen ------------------------------------
// Der Fall vom 29.07.: motion-check war fertig gebaut, stand in keiner
// Aufrufliste und lief deshalb nie. Das faellt nur auf, wenn man es prueft.
console.log('\nJeder checkX() im G1-Tor wird auch aufgerufen:\n');
{
  const txt = fs.readFileSync(path.join(SKRIPTE, 'g1-gate.mjs'), 'utf8');
  const checks = [...txt.matchAll(/^function (check[A-Z][a-zA-Z]*)\s*\(/gm)].map((m) => m[1]);
  // Nicht auf die nackte Zeile `checkX();` pruefen: zwei Pruefer werden
  // BEDINGT aufgerufen (`if (!checkServer())`, `if (!has('no-shots')) checkSweep()`),
  // und das ist richtig so. Erster Versuch meldete beide als "nie aufgerufen" —
  // ein Fehlalarm aus einer Vermutung darueber, wie ein Aufruf AUSSIEHT.
  // Gefragt ist, ob der Name ausserhalb seiner Definition ueberhaupt vorkommt.
  const nicht = checks.filter((c) => {
    const alle = (txt.match(new RegExp(`\\b${c}\\s*\\(`, 'g')) || []).length;
    return alle <= 1;
  });
  zeile(nicht.length === 0, `${checks.length} Pruefer definiert, alle in der Ablaufliste`,
    nicht.length ? `nicht aufgerufen: ${nicht.join(', ')}` : null);

  // Und: jeder Pruefer, der ein Qualitaetsurteil faellt, muss in QUALITAET
  // stehen — sonst zaehlt das Tor ihn beim "ist ueberhaupt einer gelaufen?"
  // nicht mit und kann mit 0 gelaufenen Pruefern gruen melden.
  const m = txt.match(/const QUALITAET = \[([^\]]+)\]/);
  const inListe = m ? [...m[1].matchAll(/'([^']+)'/g)].map((x) => x[1]) : [];
  const erwartet = ['lighthouse', 'axe', 'ai-slop', 'craft', 'formular', 'motion', 'tastatur'];
  const fehlt = erwartet.filter((e) => !inListe.includes(e));
  zeile(fehlt.length === 0, `QUALITAET fuehrt alle ${erwartet.length} Qualitaets-Pruefer`,
    fehlt.length ? `fehlt in QUALITAET: ${fehlt.join(', ')}` : null);
}

// --- 3. Keine Eval prueft eine Fassade ----------------------------------
// Sieben Evals schneiden Funktionen aus dem Gate heraus und fuehren sie isoliert
// aus. Das ist richtig — es hielt die Urteilslogik pruefbar, ohne Browser. Aber
// es faellt still auf die Nase, wenn die Funktion im Gate verschwindet oder
// umbenannt wird: die Eval prueft dann ihre eigene Kopie weiter und bleibt gruen.
// (Bei slopNamen war genau das der Fall.)
console.log('\nJede herausgeschnittene Funktion existiert im Gate noch:\n');
{
  // Nicht jede Eval schneidet aus dem G1-Tor: run-clone-pfade holt seine
  // Funktionen aus web-clone/mirror-site.mjs. Erster Versuch suchte alles im
  // Gate und meldete zwei Fehlalarme. Also nachsehen, welche Datei die Eval
  // wirklich liest, statt eine anzunehmen.
  const quellen = new Map();
  const laden = (p) => {
    if (!quellen.has(p)) quellen.set(p, fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : '');
    return quellen.get(p);
  };
  let geprueft = 0;
  const vermisst = [];
  for (const f of fs.readdirSync(HIER).filter((x) => x.startsWith('run-') && x.endsWith('.mjs'))) {
    const txt = fs.readFileSync(path.join(HIER, f), 'utf8');
    if (!txt.includes("schneide('")) continue;
    // Welche Datei liest diese Eval? Die readFileSync-Zeile vor dem Schneiden
    // nennt sie ueber eine Konstante wie GATE oder quelle = ...join(..., 'x.mjs').
    const datei = [...txt.matchAll(/join\([^)]*?'([a-z0-9-]+\.mjs)'\)/g)].map((m) => m[1]);
    const ziel = datei.includes('mirror-site.mjs')
      ? path.join(CLONE, 'mirror-site.mjs')
      : path.join(SKRIPTE, 'g1-gate.mjs');
    const quelltext = laden(ziel);
    for (const m of txt.matchAll(/schneide\('(?:function |const )?([a-zA-Z][a-zA-Z0-9_]*)/g)) {
      geprueft++;
      const name = m[1];
      if (!new RegExp(`(function|const)\\s+${name}\\b`).test(quelltext)) {
        vermisst.push(`${f} -> ${name} (in ${path.basename(ziel)})`);
      }
    }
  }
  zeile(vermisst.length === 0, `${geprueft} Schnittmarken in den Evals, alle im Gate vorhanden`,
    vermisst.length ? `nicht mehr im Gate: ${vermisst.join(', ')}` : null);
}

// --- 4. Werkzeuge, deren Ausgabe ein Tor liest, koennen JSON ------------
// Der audit-clone-Fall: das Werkzeug fand vier Blocker und schrieb sie nur als
// Markdown. Ein Fund, den niemand abfragen kann, stoppt keine Auslieferung.
console.log('\nWerkzeuge, deren Urteil ein Tor liest, schreiben maschinenlesbar:\n');
for (const [werkzeug, ordner, flag] of [
  ['audit-clone.mjs', CLONE, '--json'],
  ['visual-diff.mjs', CLONE, '--out'],
  ['craft-check.mjs', SKRIPTE, '--json'],
  ['formular-check.mjs', SKRIPTE, '--json'],
  ['motion-check.mjs', SKRIPTE, '--json'],
  ['tastatur-check.mjs', SKRIPTE, '--json'],
  ['import-check.mjs', SKRIPTE, '--json'],
]) {
  const p = path.join(ordner, werkzeug);
  if (!fs.existsSync(p)) { zeile(false, `${werkzeug} fehlt`, p); continue; }
  const txt = fs.readFileSync(p, 'utf8');
  const kann = txt.includes(flag);
  zeile(kann, `${werkzeug} kennt ${flag}`,
    kann ? null : `ohne ${flag} kann kein Tor seine Funde lesen`);
}

// --- 5. Das Klon-Tor liest das Feld, das audit-clone schreibt -----------
// Beide Seiten der Naht in EINER Pruefung: schreibt das eine, was das andere
// sucht? Ein Umbenennen auf einer Seite reisst hier, statt still zu wirken.
console.log('\nKlon-Tor und audit-clone benutzen denselben Feldnamen:\n');
{
  const tor = fs.readFileSync(path.join(CLONE, 'klon-gate.mjs'), 'utf8');
  const audit = fs.readFileSync(path.join(CLONE, 'audit-clone.mjs'), 'utf8');
  const gesucht = [...(tor.match(/kandidaten = \[([^\]]+)\]/)?.[1] || '')
    .matchAll(/'([^']+)'/g)].map((m) => m[1]);
  const geschrieben = gesucht.filter((k) => new RegExp(`${k}:`).test(audit));
  zeile(geschrieben.length > 0,
    `Tor sucht [${gesucht.join(', ')}], audit-clone schreibt [${geschrieben.join(', ') || 'keins'}]`,
    geschrieben.length ? null : 'die beiden reden aneinander vorbei');
}

const gesamt = 2 + 2 + 1 + 7 + 1;
console.log(`\n${gesamt - fehler}/${gesamt} wie erwartet.`);
if (fehler) {
  console.log('Eine Naht ist offen — die Werkzeuge stimmen, die Verbindung nicht.');
  process.exit(1);
}
console.log('Die Werkzeuge sind nicht nur da, sie sind verbunden.');
