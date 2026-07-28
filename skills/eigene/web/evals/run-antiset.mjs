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

const server = spawnSync('bash', ['-c',
  `cd ${wurzel} && (python3 -m http.server ${PORT} >/dev/null 2>&1 & echo $!) && sleep 2`], { encoding: 'utf8' });
const pid = (server.stdout || '').trim();
const aufraeumen = () => { if (pid) spawnSync('kill', [pid]); };
process.on('exit', aufraeumen);

// Node puffert stdout, wenn es in eine Datei oder Pipe laeuft. Wird der Lauf per
// Timeout abgeschossen (28.07.2026 zweimal passiert), ist der Puffer weg: null
// Ausgabe, obwohl er minutenlang gearbeitet hat. Man weiss dann nicht einmal, bei
// welcher Fixture er stand. Darum jede Zeile zusaetzlich synchron aufs Protokoll.
const PROTOKOLL = process.env.ANTISET_LOG || path.join(HIER, 'antiset-lauf.log');
fs.writeFileSync(PROTOKOLL, '');
const sag = (zeile) => {
  console.log(zeile);
  fs.appendFileSync(PROTOKOLL, `${zeile}\n`);
};

sag(`Anti-Set — ${namen.length} Fixtures auf Port ${PORT}`);
sag(`Protokoll: ${PROTOKOLL}\n`);

const torLauf = (n, strict) => spawnSync('node', [
  path.join(SKILL, 'scripts/g1-gate.mjs'),
  '--url', `http://localhost:${PORT}/${n}/`,
  '--src', path.join(wurzel, n),
  '--no-shots',
  ...(strict ? ['--strict'] : []),
], { encoding: 'utf8', timeout: 300000 });

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
  const gerissen = gerissenAus(r);
  const fehlend = erwartet.checks.filter((c) => !gerissen.includes(c));
  const zuviel = gerissen.filter((c) => !erwartet.checks.includes(c));
  const exitOk = erwartet.checks.length === 0 ? r.status === 0 : r.status === 1;

  // Zweiter Lauf: die Warnungen MUESSEN mit --strict rot werden, sonst waeren sie
  // stumm und der dokumentierte Schweregrad nur behauptet.
  let strictOk = true, strictStatus = null;
  if (erwartet.strict) {
    const s = torLauf(n, true);
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

sag(`\n${namen.length - rot}/${namen.length} Fixtures wie erwartet.`);
if (rot) {
  sag('Das Tor unterscheidet nicht wie dokumentiert. Erst reparieren, dann ausliefern.');
  process.exit(1);
}
sag('Das Tor laesst Sauberes durch und faengt jeden eingebauten Fehler.');
