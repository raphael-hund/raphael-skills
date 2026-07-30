#!/usr/bin/env node
/**
 * run-clone-pfade.mjs — schreiben die Klon-Werkzeuge nur in ihren Zielordner?
 *
 * Befund 29.07.2026: `web-clone/mirror-site.mjs` bildet den Dateipfad aus der URL
 * der FREMDEN Seite. `urlToLocalPath` entfernte nur fuehrende Schraegstriche;
 * `../` blieb stehen und ging ungeprueft in `path.join`. Nachgemessen:
 *
 *   https://opfer.test/x/../../../root/.ssh/authorized_keys
 *     -> rel  "x/../../../root/.ssh/authorized_keys"
 *     -> dest /root/.ssh/authorized_keys
 *
 *   https://opfer.test/../../etc/cron.d/boese   ->  /etc/cron.d/boese
 *
 * Genau der Fall, vor dem die Quarantaene-Regel warnt (AGENTS.md Nr. 17,
 * "untrusted rein ODER maechtig raus"): das Skript liest eine fremde Seite und
 * schreibt Dateien — der Server der Zielseite bestimmt dabei, WOHIN.
 *
 * Diese Eval prueft die Pfadlogik der drei Werkzeuge, die Dateinamen aus fremden
 * URLs bilden, direkt an der Funktion — ohne Browser und ohne Netz. Sie schreibt
 * nichts; sie fragt nur, wohin geschrieben WUERDE.
 *
 * Zwei Richtungen, wie immer:
 *   AUSBRUCH  Der Pfad zeigt aus dem Ordner heraus  -> muss abgewiesen werden.
 *   NORMAL    Ein gewoehnlicher Asset-Pfad          -> muss durchkommen, inklusive
 *             Unterordnern. Ein Waechter, der `assets/app.js` blockt, macht das
 *             Spiegeln unbrauchbar und wird ausgebaut statt repariert.
 *
 *   node evals/run-clone-pfade.mjs
 *
 * Exit 0 = jeder Fall wie erwartet. Exit 1 = mindestens einer daneben.
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const CLONE = path.join(HIER, '..', 'scripts', 'web-clone');

let fehler = 0;
let geprueft = 0;   // von zeile() hochgezaehlt
const zeile = (ok, text, detail) => {
  geprueft++;
  if (!ok) fehler++;
  console.log(`  [${ok ? 'OK' : '!!'}]   ${text}`);
  if (detail) console.log(`         ${detail}`);
};

// --- mirror-site: der Fall, der die Eval ausgeloest hat -------------------
// Die beiden Funktionen werden aus der Datei gelesen statt nachgebaut. Ein
// nachgebauter Test prueft die Kopie, nicht das Werkzeug — und faellt genau dann
// nicht auf, wenn jemand das Original aendert.
const quelle = fs.readFileSync(path.join(CLONE, 'mirror-site.mjs'), 'utf8');
function schneide(name) {
  const a = quelle.indexOf(`function ${name}(`);
  if (a < 0) {
    console.error(`FEHLER: function ${name} nicht in mirror-site.mjs — umbenannt?`);
    process.exit(1);
  }
  // Bis zur schliessenden Klammer am Zeilenanfang.
  const b = quelle.indexOf('\n}\n', a);
  return quelle.slice(a, b + 3);
}
const bauen = new Function('path', `
  ${schneide('urlToLocalPath')}
  ${schneide('zielImOrdner')}
  return { urlToLocalPath, zielImOrdner };
`);
const M = bauen(path);

const SITE = '/tmp/klon-ziel/site';
const ORIGIN = 'https://opfer.test';

console.log('\nKlon-Pfade — bestimmt die fremde Seite, wohin geschrieben wird?\n');
console.log('mirror-site: diese URLs duerfen NICHT geschrieben werden:\n');
const ausbrueche = [
  ['zwei Ebenen hoch', `${ORIGIN}/../../etc/cron.d/boese`],
  ['tief getarnt', `${ORIGIN}/x/../../../root/.ssh/authorized_keys`],
  ['viele Ebenen', `${ORIGIN}/a/b/c/../../../../../../tmp/boese`],
  ['direkt hoch', `${ORIGIN}/../boese.sh`],
];
for (const [was, url] of ausbrueche) {
  const rel = M.urlToLocalPath(url, ORIGIN);
  const ziel = M.zielImOrdner(SITE, rel);
  zeile(ziel === null, `${was}  ("${rel}")`,
    ziel === null ? null : `wuerde schreiben nach: ${ziel}`);
}

console.log('\nmirror-site: diese muessen durchkommen — sonst spiegelt es nichts:\n');
const normal = [
  ['Startseite', `${ORIGIN}/`, 'index.html'],
  ['Datei im Wurzelverzeichnis', `${ORIGIN}/app.js`, 'app.js'],
  ['Unterordner', `${ORIGIN}/assets/index-a1b2.js`, 'assets/index-a1b2.js'],
  ['tiefer Unterordner', `${ORIGIN}/_astro/fonts/inter.woff2`, '_astro/fonts/inter.woff2'],
  ['Ordner-URL wird index.html', `${ORIGIN}/team/`, 'team/index.html'],
  ['Query fliegt raus', `${ORIGIN}/x.js?v=3`, 'x.js'],
  // Ein Punkt-Segment ist harmlos, solange es im Ordner bleibt: `./` loest sich
  // auf denselben Pfad auf. Wer das mitblockt, ist zu grob.
  ['einzelner Punkt bleibt drin', `${ORIGIN}/a/./b.js`, 'a/b.js'],
];
for (const [was, url, erwartetRel] of normal) {
  const rel = M.urlToLocalPath(url, ORIGIN);
  const ziel = M.zielImOrdner(SITE, rel);
  const erwartet = path.resolve(SITE, erwartetRel);
  zeile(ziel === erwartet, `${was}  ("${rel}")`,
    ziel === erwartet ? null : `erwartet ${erwartet}, bekam ${ziel === null ? 'ABGEWIESEN' : ziel}`);
}

// --- Die anderen zwei URL-Schreiber: Gegenprobe ---------------------------
// sourcemap-hunt und network-capture bilden ihre Dateinamen anders — sie filtern
// alles ausser [a-z0-9._-] weg und haengen einen Hash an. Damit kann kein
// Schraegstrich uebrig bleiben. Das ist HIER nachgemessen und nicht angenommen:
// wenn jemand den Filter lockert, faellt es an dieser Stelle auf.
console.log('\nsourcemap-hunt / network-capture: Namensbau darf keinen Pfad ergeben:\n');
const bauNamen = {
  'sourcemap-hunt': (url) => {
    const p = new URL(url);
    const base = path.basename(p.pathname).replace(/[^a-z0-9._-]+/gi, '-').slice(0, 90) || 'bundle.js';
    return `${base}-${crypto.createHash('sha1').update(url).digest('hex').slice(0, 10)}.map`;
  },
  'network-capture': (url) => {
    const p = new URL(url);
    const c = p.pathname.replace(/[^a-z0-9._-]+/gi, '-').replace(/^-+|-+$/g, '').slice(0, 80) || 'response';
    return `${c}-${crypto.createHash('sha1').update(url).digest('hex').slice(0, 10)}.txt`;
  },
};
// Der Nachbau muss zum Original passen — sonst prueft dieser Abschnitt eine
// Kopie, die es im Werkzeug nicht mehr gibt. Also die Filterzeile vergleichen.
for (const [werkzeug, muster] of [
  ['sourcemap-hunt', /replace\(\/\[\^a-z0-9\._-\]\+\/gi, "-"\)/],
  ['network-capture', /replace\(\/\[\^a-z0-9\._-\]\+\/gi, "-"\)/],
]) {
  const txt = fs.readFileSync(path.join(CLONE, `${werkzeug}.mjs`), 'utf8');
  zeile(muster.test(txt), `${werkzeug}: Filterzeile unveraendert (sonst gilt der Nachbau unten nicht)`);
}
for (const [werkzeug, fn] of Object.entries(bauNamen)) {
  const boese = [
    `${ORIGIN}/../../etc/passwd`,
    `${ORIGIN}/a/../../../root/.ssh/x`,
    `${ORIGIN}/..%2f..%2fx`,
    `${ORIGIN}/....//x.js`,
  ];
  // Gefragt ist das VERHALTEN, nicht die Schreibweise: landet die Datei im
  // Ordner? Der erste Versuch prueft `n.startsWith('..')` und meldete
  // "..-2f..-2fx-075af2f590.map" als Ausbruch — ein voellig harmloser Dateiname,
  // in dem nur zufaellig zwei Punkte vorn stehen. Zwei Fehlalarme aus einer zu
  // engen Vermutung darueber, wie ein gefaehrlicher Name AUSSIEHT.
  const wurzel = path.resolve('/tmp/klon-ziel/out');
  const raus = boese.filter((u) => {
    const n = fn(u);
    const ziel = path.resolve(wurzel, n);
    // Muss direkt im Ordner liegen: kein Unterordner, kein Ausbruch.
    return path.dirname(ziel) !== wurzel;
  });
  zeile(raus.length === 0, `${werkzeug}: 4 Ausbruchs-URLs landen flach im Zielordner`,
    raus.length ? `zeigt aus dem Ordner: ${raus.join(', ')}` : null);
}

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
const gesamt = geprueft;
console.log(`\n${gesamt - fehler}/${gesamt} wie erwartet.`);
if (fehler) {
  console.log('Ein Klon-Werkzeug laesst die fremde Seite bestimmen, wohin geschrieben wird.');
  process.exit(1);
}
console.log('Die Zielseite bestimmt den Inhalt, nicht den Ort.');
