#!/usr/bin/env node
/**
 * run-antiset.mjs — prueft das Tor, nicht die Seite.
 *
 * Jede Fixture unter antiset/ ist dieselbe saubere Seite mit GENAU EINEM
 * eingebauten Fehler. Der Lauf besteht nur, wenn das Tor
 *   (a) die saubere Kontrolle durchlaesst  und
 *   (b) jede kaputte Fixture am ERWARTETEN Check reisst.
 *
 * Warum das noetig ist: ein Tor, das nie gruen wird, ist genauso nutzlos wie
 * eins, das nie rot wird. Nur der Unterschied zwischen beiden ist der Beweis.
 *
 *   node evals/run-antiset.mjs
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const SKILL = path.resolve(HIER, '..');
const FIXTURES = path.join(HIER, 'antiset');
const PORT = Number(process.env.ANTISET_PORT || 5321);

// Was jede Fixture reissen MUSS. Alles andere darf sie nicht reissen.
//
// `strict: true` heisst: die Fixture enthaelt bewusst nur WARN-Befunde, die im
// Normallauf NICHT blocken duerfen und erst mit --strict rot werden. Das prueft
// den Schweregrad selbst — sonst koennte jede Warnung heimlich zum Blocker werden.
const ERWARTET = {
  '_basis':                 { checks: [],                    was: 'Kontrolle: muss sauber durchgehen' },
  'a1-ki-look':             { checks: ['ai-slop', 'craft'],  was: 'Indigo-Violett-Verlauf + Inter ueberall' },
  'a2-em-dash-rundzahlen':  { checks: ['ai-slop', 'craft'],  was: 'Em-Dash im Fliesstext + erfundene Rundzahlen' },
  'a3-mobile-kaputt':       { checks: ['craft'],             was: 'Raster bricht auf 390px nicht um' },
  // outline:none ohne :focus-visible-Ersatz ist M17 und damit ein dokumentierter
  // Craft-Blocker, nicht nur ein axe-Befund. Craft gehoert hier also dazu.
  'a4-a11y-kaputt':         { checks: ['lighthouse', 'axe', 'craft'], was: 'Kontrast, fehlendes alt, kein lang, Link ohne Namen' },
  // Border+Shadow (M11) und Springy-Hover (T7) sind laut Doktrin WARN. Sie duerfen
  // die Auslieferung NICHT stoppen. Rot wird hier nur der tote Link.
  'a5-craft-kaputt':        { checks: ['links'], strict: true, was: 'toter Link (hart) + Ghost-Card/Springy-Hover (nur Warnung)' },
  // Zugefuegt 28.07.2026. Vorher pruefte nichts den M24-Blocker: alle sechs Fixtures
  // hatten dasselbe Bild, eine bildlose Seite kam im Anti-Set schlicht nicht vor.
  // Ein Blocker ohne Fixture ist ein Blocker, von dem niemand weiss, ob er ausloest.
  'a6-ohne-bildwelt':       { checks: ['craft'],             was: 'kein einziges Bild ueber Icon-Groesse (M24)' },
  // Zugefuegt 29.07.2026 mit dem formular-check. Die Kontrolle traegt seither ein
  // KORREKT gebautes Formular (type=email/tel, autocomplete, 44px, 16px Schrift) —
  // damit beweist derselbe Lauf beide Richtungen: der Pruefer wird gruen bei einem
  // guten Formular und rot bei einem schlechten. Ein Waechter, der nur rot kann,
  // wird nach dem dritten Fehlalarm abgeschaltet.
  'a7-formular-kaputt':     { checks: ['formular'],          was: 'E-Mail/Telefon als type="text" (F1)' },
  // Zugefuegt 29.07.2026. Alle bisherigen Slop-Fixtures (a1, a2) treffen die
  // ENGLISCHEN Tells des vendorten Scanners — Verlauf, Inter, Em-Dash. Deutsche
  // Verkaufsfloskeln kamen im Anti-Set nicht vor, und der Scanner kennt sie in
  // seinen 33 Kernregeln auch nicht: diese Seite lief mit "0 Slop-Tells,
  // bestanden" durch, obwohl in ihr "auf das naechste Level", "Rundum-sorglos-
  // Paket" und "Schluss mit Baustellen-Theater" stehen. Raphaels Seiten sind
  // alle deutsch — das Tor war auf der Ausliefersprache blind.
  // Die Seite ist eine Kopie von _basis mit ausgetauschten Textstellen: reisst
  // sie an etwas anderem als ai-slop, ist der neue Regelsatz laermig, nicht die
  // Fixture kaputt.
  'a8-deutsche-floskeln':   { checks: ['ai-slop'],           was: 'deutsche Werbefloskeln (de-14) — englische Regeln sahen sie nicht' },
};

const namen = Object.keys(ERWARTET);
for (const n of namen) {
  const f = path.join(FIXTURES, `${n}.html`);
  if (!fs.existsSync(f)) {
    console.error(`Fixture fehlt: ${f}`);
    process.exit(2);
  }
}

// Jede Fixture bekommt einen eigenen Ordner, weil --src einen Projektordner erwartet.
const wurzel = fs.mkdtempSync('/tmp/antiset-');
// Mitkopiert wird alles, was die Fixtures nebenbei brauchen (Bilder). Wuerde nur
// die HTML-Datei wandern, waere jedes Bild ein 404 — die Kontrolle wuerde an der
// Link-Pruefung rot, und zwar aus einem Grund, den keine Fixture testen will.
const BEIWERK = fs.readdirSync(FIXTURES).filter((f) => !f.endsWith('.html'));
for (const n of namen) {
  fs.mkdirSync(path.join(wurzel, n), { recursive: true });
  fs.copyFileSync(path.join(FIXTURES, `${n}.html`), path.join(wurzel, n, 'index.html'));
  for (const b of BEIWERK) fs.copyFileSync(path.join(FIXTURES, b), path.join(wurzel, n, b));
}

// Der Port wurde bisher blind belegt. `python3 -m http.server` stirbt still an
// "Address already in use" — und der Lauf misst danach gegen den Server eines
// FREMDEN Laufs, also gegen fremde Dateien.
//
// Befund 28.07.2026: genau so geschehen. Zwei Anti-Set-Laeufe gleichzeitig, beide
// auf 5321, beide ins selbe Protokoll. Die Kontrolle meldete rot, obwohl an ihr
// nichts kaputt war. Ein Testlauf, der fremde Ergebnisse misst, ist schlimmer als
// keiner: er erfindet Befunde und verbrennt das Vertrauen in die echten.
const server = spawnSync('bash', ['-c',
  `cd ${wurzel} && (python3 -m http.server ${PORT} >/dev/null 2>&1 & echo $!) && sleep 2`], { encoding: 'utf8' });
const pid = (server.stdout || '').trim();
const aufraeumen = () => { if (pid) spawnSync('kill', [pid]); };
process.on('exit', aufraeumen);

// Beweis, dass DIESER Server antwortet und nicht ein fremder: eine Datei abfragen,
// die es nur in diesem Wurzelordner gibt.
const kennung = `probe-${process.pid}.txt`;
fs.writeFileSync(path.join(wurzel, kennung), 'antiset');
const probe = spawnSync('curl', ['-fsS', '-m', '5', `http://localhost:${PORT}/${kennung}`], { encoding: 'utf8' });
if (probe.status !== 0 || (probe.stdout || '').trim() !== 'antiset') {
  console.error(`Port ${PORT} antwortet nicht mit unserem Server (belegt?).`);
  console.error('Anderen Port setzen: ANTISET_PORT=5322 node evals/run-antiset.mjs');
  process.exit(2);
}

// Node puffert stdout, wenn es in eine Datei oder Pipe laeuft. Wird der Lauf per
// Timeout abgeschossen (28.07.2026 zweimal passiert), ist der Puffer weg: null
// Ausgabe, obwohl er minutenlang gearbeitet hat. Man weiss dann nicht einmal, bei
// welcher Fixture er stand. Darum jede Zeile zusaetzlich synchron aufs Protokoll.
//
// Der Dateiname traegt die Prozessnummer: zwei gleichzeitige Laeufe schrieben
// sonst ineinander, und das Ergebnis las sich wie ein Widerspruch derselben
// Fixture mit sich selbst (28.07.2026 im Log nachlesbar).
const PROTOKOLL = process.env.ANTISET_LOG || path.join(HIER, `antiset-lauf-${process.pid}.log`);
fs.writeFileSync(PROTOKOLL, '');
const sag = (zeile) => {
  console.log(zeile);
  fs.appendFileSync(PROTOKOLL, `${zeile}\n`);
};

sag(`Anti-Set — ${namen.length} Fixtures auf Port ${PORT}`);
sag(`Protokoll: ${PROTOKOLL}\n`);

// Eigenes Budget fuers Anti-Set: Lighthouse-Performance wird hier nicht bewertet.
//
// Befund 28.07.2026: dieselbe unveraenderte Kontroll-Fixture lieferte einmal 92 und
// einmal 72 — allein je nach Maschinenlast. Bei einer statischen 6-KB-Seite misst
// Lighthouse den Server, nicht die Seite. Ein Testlauf, dessen Ergebnis vom Wetter
// abhaengt, meldet Rot ohne Fehler; nach dem dritten Fehlalarm schaut niemand mehr
// hin. accessibility/best-practices/seo bleiben scharf — die sind deterministisch,
// und a4 reisst genau daran. Fuer echte Builds gilt weiter das Gate-Budget.
const BUDGET = path.join(HIER, 'antiset-budget.json');

// Zeitgrenze pro Fixture. Auf einer ausgelasteten Maschine reichten 300 s nicht:
// spawnSync liefert dann `status: null`, und der Laeufer las das als "Exit
// erwartet 0, bekommen null" — also als Qualitaetsbefund. Befund 29.07.2026:
// bei Last 88 meldete der Lauf 0/14 mit dem Satz "Das Tor blockt echte
// Importe", obwohl am Tor nichts kaputt war. Ein Testlauf, der Langsamkeit
// nicht von Defekt unterscheidet, erfindet Befunde.
const FRIST = Number(process.env.ANTISET_FRIST_MS || 900000);

const torLauf = (n, strict) => spawnSync('node', [
  path.join(SKILL, 'scripts/g1-gate.mjs'),
  '--url', `http://localhost:${PORT}/${n}/`,
  '--src', path.join(wurzel, n),
  '--budget', BUDGET,
  '--no-shots',
  ...(strict ? ['--strict'] : []),
], { encoding: 'utf8', timeout: FRIST });

// `status === null` heisst: kein Urteil. Entweder abgewuergt (Frist) oder per
// Signal gestorben. Beides ist ein kaputter LAUF, kein Befund ueber die Seite —
// und muss darum den ganzen Durchgang abbrechen, statt eine Zeile Rot zu setzen.
const abbruchPruefen = (r, n) => {
  if (r.status !== null) return;
  const grund = r.error && r.error.code === 'ETIMEDOUT'
    ? `ueber ${Math.round(FRIST / 1000)} s ohne Ergebnis (Maschine ueberlastet?)`
    : `durch Signal ${r.signal || '?'} beendet`;
  sag(`\nANTI-SET ABGEBROCHEN bei ${n}: ${grund}.`);
  sag('Das ist kein Befund ueber das Tor. Frist hochsetzen und wiederholen:');
  sag(`  ANTISET_FRIST_MS=1800000 node evals/run-antiset.mjs`);
  sag(`  aktuelle Last: ${fs.readFileSync('/proc/loadavg', 'utf8').trim()}`);
  process.exit(2);
};

// Check-Namen tragen die Route als Suffix (`craft/`), darum Praefix-Vergleich.
const gerissenAus = (r) =>
  [...`${r.stdout || ''}${r.stderr || ''}`.matchAll(/^\[FAIL\] (\S+?)\/?\s/gm)].map((m) => m[1]);

let rot = 0;
for (const n of namen) {
  const erwartet = ERWARTET[n];
  // VOR dem Lauf ins Protokoll, nicht danach: bricht der Lauf hier ab, steht im
  // Protokoll genau die Fixture, an der es haengt.
  fs.appendFileSync(PROTOKOLL, `.. laeuft: ${n}\n`);
  const r = torLauf(n, false);
  abbruchPruefen(r, n);
  const gerissen = gerissenAus(r);
  const fehlend = erwartet.checks.filter((c) => !gerissen.includes(c));
  const zuviel = gerissen.filter((c) => !erwartet.checks.includes(c));
  const exitOk = erwartet.checks.length === 0 ? r.status === 0 : r.status === 1;

  // Zweiter Lauf: die Warnungen MUESSEN mit --strict rot werden, sonst waeren sie
  // stumm und der dokumentierte Schweregrad nur behauptet.
  let strictOk = true, strictStatus = null;
  if (erwartet.strict) {
    const s = torLauf(n, true);
    abbruchPruefen(s, `${n} (--strict)`);
    strictStatus = s.status;
    strictOk = gerissenAus(s).includes('craft');
  }

  const ok = exitOk && fehlend.length === 0 && zuviel.length === 0 && strictOk;
  sag(`${ok ? 'OK  ' : 'ROT '} ${n.padEnd(24)} exit=${r.status}${erwartet.strict ? ` strict=${strictStatus}` : ''}  ${erwartet.was}`);
  if (!ok) {
    rot++;
    if (!exitOk) sag(`       Exit erwartet ${erwartet.checks.length === 0 ? 0 : 1}, bekommen ${r.status}`);
    if (fehlend.length) sag(`       nicht gerissen, aber erwartet: ${fehlend.join(', ')}`);
    if (zuviel.length) sag(`       zusaetzlich gerissen: ${zuviel.join(', ')}`);
    if (!strictOk) sag('       --strict hat die Warnungen NICHT rot gemacht — Schweregrad ist wirkungslos');
  }
}

// Sonderfall mit anderer Form: die Fixtures oben sind Ein-Seiten-Builds, hier geht
// es um einen MEHRseitigen. Geprueft wird der Routen-Waechter in beide Richtungen —
// ein Waechter, der nie gruen wird, ist genauso nutzlos wie einer, der nie rot wird.
//
// Die erste Fassung testete nur "--routes fehlt ganz". Damit war die eigentliche
// Luecke ungeprueft: 2 von 28 Seiten nennen und Gruen fuers Ganze bekommen.
const mehr = path.join(wurzel, 'mehrseitig');
fs.mkdirSync(mehr, { recursive: true });
fs.copyFileSync(path.join(FIXTURES, '_basis.html'), path.join(mehr, 'index.html'));
fs.copyFileSync(path.join(FIXTURES, '_basis.html'), path.join(mehr, 'team.html'));
for (const b of BEIWERK) fs.copyFileSync(path.join(FIXTURES, b), path.join(mehr, b));

const ROUTEN_FAELLE = [
  { was: 'mehrseitig-ohne-routes',   routes: null,             exit: 2, warum: '2 Seiten im Build, --routes fehlt ganz' },
  { was: 'mehrseitig-halbe-routes',  routes: '/',              exit: 2, warum: 'nur "/" genannt, /team.html ungesehen' },
  { was: 'mehrseitig-alle-routes',   routes: '/,/team.html',   exit: 0, warum: 'alle Seiten genannt -> darf gruen werden' },
];

for (const f of ROUTEN_FAELLE) {
  sag(`\n.. laeuft: ${f.was}`);
  const lauf = spawnSync('node', [
    path.join(SKILL, 'scripts/g1-gate.mjs'),
    '--url', `http://localhost:${PORT}/mehrseitig/`,
    '--src', mehr,
    '--budget', BUDGET,
    '--no-shots',
    ...(f.routes ? ['--routes', f.routes] : []),
  ], { encoding: 'utf8', timeout: FRIST });

  abbruchPruefen(lauf, f.was);
  const ok = lauf.status === f.exit;
  if (!ok) rot++;
  sag(`${ok ? 'OK  ' : 'ROT '} ${f.was.padEnd(24)} exit=${lauf.status}  ${f.warum}`);
  if (!ok) {
    sag(`       Exit erwartet ${f.exit}, bekommen ${lauf.status}`);
    sag(f.exit === 2
      ? '       Das Tor buergt fuer Seiten, die es nie gesehen hat.'
      : '       Der Waechter blockt auch bei vollstaendigen Routen — dann nimmt ihn niemand ernst.');
  }
}

// Der Import-Check ist der einzige Pruefer im Tor, der nicht die laufende Seite
// liest, sondern den Quellcode. Er lief seit dem 28.07.2026 nur von Hand — als
// Angebot, nicht als Tor. Ab dem 29.07. haengt er drin, und diese zwei Faelle
// belegen, dass er dort auch wirkt: ein erfundener Import muss die Auslieferung
// stoppen, ein echter darf sie nicht stoppen.
//
// Dieselbe HTML-Seite wie oben, nur eine .tsx-Datei daneben — der Unterschied im
// Ergebnis kann also nur vom Import kommen.
const IMPORT_FAELLE = [
  {
    was: 'import-erfunden',
    code: `import { toast, ToastProvider } from 'sonner';\nexport const x = () => toast('hi') && ToastProvider;`,
    exit: 1, reisst: true, warum: 'ToastProvider gibt es in sonner nicht',
  },
  {
    was: 'import-echt',
    code: `import { Toaster, toast } from 'sonner';\nimport { motion, AnimatePresence } from 'motion/react';\nexport const x = () => [Toaster, toast, motion, AnimatePresence];`,
    exit: 0, reisst: false, warum: 'echte Exporte, auch ueber den Subpfad motion/react',
  },
];

for (const f of IMPORT_FAELLE) {
  sag(`\n.. laeuft: ${f.was}`);
  const dir = path.join(wurzel, f.was);
  fs.mkdirSync(dir, { recursive: true });
  fs.copyFileSync(path.join(FIXTURES, '_basis.html'), path.join(dir, 'index.html'));
  for (const b of BEIWERK) fs.copyFileSync(path.join(FIXTURES, b), path.join(dir, b));
  fs.writeFileSync(path.join(dir, 'app.tsx'), f.code);

  const lauf = spawnSync('node', [
    path.join(SKILL, 'scripts/g1-gate.mjs'),
    '--url', `http://localhost:${PORT}/${f.was}/`,
    '--src', dir,
    '--budget', BUDGET,
    '--no-shots',
  ], { encoding: 'utf8', timeout: FRIST });

  abbruchPruefen(lauf, f.was);
  const gerissen = gerissenAus(lauf).includes('importe');
  const ok = lauf.status === f.exit && gerissen === f.reisst;
  if (!ok) rot++;
  sag(`${ok ? 'OK  ' : 'ROT '} ${f.was.padEnd(24)} exit=${lauf.status}  ${f.warum}`);
  if (!ok) {
    sag(`       Exit erwartet ${f.exit}, bekommen ${lauf.status}`);
    sag(f.reisst
      ? '       Ein erfundener Import kommt durchs Tor — der Build stirbt erst beim Kunden.'
      : '       Das Tor blockt echte Importe. Nach dem dritten Fehlalarm schaltet es jemand ab.');
  }
}

const gesamt = namen.length + ROUTEN_FAELLE.length + IMPORT_FAELLE.length;
sag(`\n${gesamt - rot}/${gesamt} Faelle wie erwartet.`);
if (rot) {
  sag('Das Tor unterscheidet nicht wie dokumentiert. Erst reparieren, dann ausliefern.');
  process.exit(1);
}
sag('Das Tor laesst Sauberes durch und faengt jeden eingebauten Fehler.');
