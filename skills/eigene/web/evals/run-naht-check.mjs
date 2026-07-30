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
// Selbst zaehlen statt unten eine Formel zu pflegen.
//
// Bis 30.07.2026 stand dort `2 + 2 + 1 + 7 + 1` — eine Zaehlung von Hand,
// festgeschrieben zu einem Zeitpunkt, an dem sie stimmte. Gemessen ergab der
// Lauf 15 gedruckte Pruefzeilen bei Schlusszahl 13/13: zwei Pruefungen liefen
// und tauchten in der Bilanz nicht auf. Drei der Abschnitte drucken aus
// SCHLEIFEN, deren Laenge vom Bestand abhaengt (Werkzeuge mit --json,
// Gate-Dateien) — eine feste Zahl kann das nicht wissen und veraltet still,
// weil sie plausibel bleibt.
let gepruefte = 0;
const zeile = (ok, text, detail) => {
  gepruefte++;
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
  // Kommentare fliegen VOR dem Zaehlen raus. Sonst gilt `// checkMotion();`
  // als Aufruf: mit der Definition sind das zwei Vorkommen, und die Schwelle
  // `<= 1` ist erfuellt.
  //
  // Selbst nachgemessen 30.07.2026: checkMotion() auskommentiert — der Pruefer
  // laeuft dann nie — und diese Eval meldete weiter 13/13, Exit 0. Genau die
  // Luecke, gegen die sie gebaut ist, hatte sie an sich selbst. Eine Naht-Pruefung,
  // die einen gekappten Aufruf nicht sieht, prueft die Naht nicht.
  const codeOhneKommentar = txt.split('\n')
    .map((z) => z.replace(/\/\/.*$/, ''))
    .join('\n')
    .replace(/\/\*[\s\S]*?\*\//g, '');
  const nicht = checks.filter((c) => {
    const alle = (codeOhneKommentar.match(new RegExp(`\\b${c}\\s*\\(`, 'g')) || []).length;
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

  // Die Liste allein nuetzt nichts — es muss auch die Huerde geben, die sie
  // benutzt. Befund 30.07.2026 durch den Sabotage-Lauf: `if (fehltGanz.length)`
  // zu `if (false)` geaendert, und keine einzige Eval merkte es. Damit wuerde ein
  // Rechner ohne installierte Werkzeuge "G1 BESTANDEN — 0 Checks gruen" melden.
  // Geprueft wird beides: dass die Huerde existiert und dass sie Exit 2 wirft
  // (nicht 1 — "kann nicht urteilen" ist etwas anderes als "Qualitaet gerissen").
  const huerde = txt.match(/if \(fehltGanz\.length\)\s*\{([\s\S]{0,400}?)\n\}/);
  zeile(!!huerde, 'die Huerde `if (fehltGanz.length)` existiert',
    huerde ? null : 'ohne sie urteilt das Tor auch mit 0 gelaufenen Pruefern');
  if (huerde) {
    zeile(/process\.exit\(2\)/.test(huerde[1]),
      'sie endet mit Exit 2 (kann nicht urteilen), nicht mit 1',
      /process\.exit\(2\)/.test(huerde[1]) ? null
        : 'Exit 1 waere "Qualitaet gerissen" — das ist eine andere Aussage');
  }
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

// --- Jeder Pruefer haengt am Tor -----------------------------------------
// Die bisherigen Naht-Pruefungen fragen: ruft das Tor eine Funktion auf, die es
// gibt? Die andere Richtung fehlte: gibt es einen PRUEFER, den das Tor nie
// aufruft? Ein neues Skript neben den anderen zu legen kostet nichts und wirkt
// wie eine Verschaerfung — solange es niemand faehrt, ist es Dekoration.
//
// Werkzeuge sind ausgenommen: sie faellen kein Urteil, das gruen werden koennte.
console.log('\nJeder Pruefer haengt am Tor — sonst ist er Dekoration:\n');
{
  const WERKZEUGE = new Set([
    'g1-gate.mjs',      // das Tor selbst
    'lib-lookup.mjs',   // Nachschlagewerk, faellt kein Urteil
    'lib-exporte.mjs',  // Bibliothek fuer lib-lookup und import-check
    'bilder.mjs',       // Asset-Verwaltung, kein Pruefer
  ]);
  const tor = fs.readFileSync(path.join(SKRIPTE, 'g1-gate.mjs'), 'utf8');
  const alle = fs.readdirSync(SKRIPTE).filter((f) => f.endsWith('.mjs'));
  const lose = alle.filter((f) => !WERKZEUGE.has(f) && !tor.includes(f));
  zeile(lose.length === 0,
    `${alle.length - WERKZEUGE.size} Pruefer, ${lose.length} nicht im Tor`,
    lose.length ? `nie aufgerufen: ${lose.join(', ')} — entweder ins Tor haengen oder als Werkzeug eintragen` : null);

  // Gegenrichtung: ein Eintrag in WERKZEUGE, den es gar nicht mehr gibt, macht
  // die Ausnahmeliste zur Muellhalde und deckt spaeter echte Luecken zu.
  const toteAusnahmen = [...WERKZEUGE].filter((w) => !alle.includes(w));
  zeile(toteAusnahmen.length === 0,
    `${WERKZEUGE.size} Werkzeug-Ausnahmen, ${toteAusnahmen.length} zeigen ins Leere`,
    toteAusnahmen.length ? `entfernte Dateien noch ausgenommen: ${toteAusnahmen.join(', ')}` : null);
}

// --- Jeder urteilende Pruefer hat einen Anti-Set-Fall --------------------
// Der Abschnitt darueber fragt: haengt jeder Pruefer am Tor? Diese Frage geht
// eine Stufe weiter: wird er dort auch AUSGELOEST? Ein Pruefer, den das Tor
// aufruft, der aber nie an einer kaputten Seite rot wird, ist nicht geprueft —
// niemand weiss, ob er das Tor wirklich reissen kann.
//
// Gefunden 30.07.2026 durch genau diesen Abgleich: tastatur und motion hingen
// beide im Tor und hatten keinen Fall. Bei motion war die Luecke getarnt —
// das Wort kam im Anti-Set vor, aber als IMPORTNAME (`from 'motion/react'`).
// Eine Textsuche haette "abgedeckt" gemeldet.
console.log('\nJeder urteilende Pruefer wird im Anti-Set ausgeloest:\n');
{
  // server = Erreichbarkeit (kein Qualitaetsurteil), importe/shot-sweep haben
  // eigene Faelle ausserhalb der Fixture-Liste (import-* bzw. in
  // run-kaputte-ausgaben.mjs). Sie hier zu verlangen waere ein Fehlalarm.
  const OHNE_FIXTURE = new Set(['server', 'importe', 'shot-sweep']);
  const gateQuelle = fs.readFileSync(path.join(SKRIPTE, 'g1-gate.mjs'), 'utf8');
  const antiPfad = path.join(SKRIPTE, '..', 'evals', 'run-antiset.mjs');
  const anti = fs.existsSync(antiPfad) ? fs.readFileSync(antiPfad, 'utf8') : '';

  const urteiler = [...new Set([...gateQuelle.matchAll(/record\('([a-z0-9-]+)'/g)].map((m) => m[1]))];
  // NUR die checks-Listen lesen, nicht die ganze Datei: sonst zaehlt jedes
  // Vorkommen des Wortes als Abdeckung — genau die Tarnung von oben.
  const abgedeckt = new Set(
    [...anti.matchAll(/checks: \[([^\]]+)\]/g)]
      .flatMap((m) => m[1].split(',').map((x) => x.trim().replace(/'/g, ''))),
  );
  const ohne = urteiler.filter((u) => !OHNE_FIXTURE.has(u) && !abgedeckt.has(u));
  zeile(ohne.length === 0,
    `${urteiler.length} urteilende Pruefer, ${OHNE_FIXTURE.size} bewusst ohne Fixture, ${ohne.length} ungedeckt`,
    ohne.length ? `kein Anti-Set-Fall: ${ohne.join(', ')} — niemand weiss, ob sie das Tor reissen` : null);

  // Und die Ausnahmeliste selbst: ein Eintrag fuer einen Pruefer, den es nicht
  // mehr gibt, deckt spaeter eine echte Luecke zu.
  const toteAusnahmen = [...OHNE_FIXTURE].filter((a) => !urteiler.includes(a));
  zeile(toteAusnahmen.length === 0,
    `${OHNE_FIXTURE.size} Ausnahmen, ${toteAusnahmen.length} zeigen auf keinen Pruefer`,
    toteAusnahmen.length ? `entfallene Pruefer noch ausgenommen: ${toteAusnahmen.join(', ')}` : null);
}

// Gegenrichtung sichern: faellt ein ganzer Abschnitt still aus (frueher
// `return`, leere Fundliste, verschluckte Ausnahme), zaehlt `gepruefte` einfach
// weniger — und "9/9 wie erwartet" saehe wieder gruen aus. Die Untergrenze ist
// die Zahl der Abschnitte, die nicht von einem Bestand abhaengen: sechs feste
// Pruefungen (Ablaufliste, QUALITAET, Huerde, Exit-2-Art, Schnittmarken,
// Feldname) plus mindestens je eine aus den drei Schleifen.
const MINDESTENS = 13;
if (gepruefte < MINDESTENS) {
  console.log(`\nNur ${gepruefte} Pruefungen gelaufen, mindestens ${MINDESTENS} erwartet.`);
  console.log('Ein Abschnitt ist still ausgefallen — das ist kein bestandener Lauf.');
  process.exit(2);
}
console.log(`\n${gepruefte - fehler}/${gepruefte} wie erwartet.`);
if (fehler) {
  console.log('Eine Naht ist offen — die Werkzeuge stimmen, die Verbindung nicht.');
  process.exit(1);
}
console.log('Die Werkzeuge sind nicht nur da, sie sind verbunden.');
