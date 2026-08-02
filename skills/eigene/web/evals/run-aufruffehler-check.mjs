#!/usr/bin/env node
// run-aufruffehler-check.mjs — ein falscher Aufruf endet mit Exit 2, nie mit 1.
//
//   node evals/run-aufruffehler-check.mjs
//
// WARUM (Befund 31.07.2026)
// web/SKILL.md trennt zwei Bedeutungen:
//   Exit 1 — Qualitaet gerissen. Es wurde geprueft, das Ergebnis ist schlecht.
//   Exit 2 — das Werkzeug selbst ist nicht bereit. Es wurde NICHTS geprueft.
//
// Ein vertipptes Flag gehoert eindeutig in die zweite Klasse: geprueft wurde
// nichts. Beim Abklopfen aller 13 web-clone-Werkzeuge meldeten trotzdem drei
// eine gerissene Qualitaet:
//
//   zehn Werkzeuge  ein gemeinsames catch mit `process.exit(1)` fuer ALLES —
//                   Aufruffehler und echte Lauffehler landeten im selben Topf.
//   dna-scaffold,   fehlendes Pflichtargument -> Hilfe ausgeben, Exit 1.
//   mirror-site
//
// Der schwerste Einzelfall war init-clone: dort nahm der Slug-Zweig ALLES an,
// was nicht schon als Flag erkannt war. `--tippfehler` wurde damit zum
// PROJEKTNAMEN — der Testlauf legte tatsaechlich
// /root/projects/website-clones/diesesflaggibtsnicht-clone an, samt
// Ordnerstruktur und NOTES.md. Ein Tippfehler erzeugte ein Projekt.
//
// WAS DIESE EVAL PRUEFT
// Jedes Werkzeug bekommt ein garantiert unbekanntes Flag und muss:
//   1. mit Exit 2 enden (nicht 0, nicht 1)
//   2. das Flag in seiner Meldung nennen — sonst raet der Aufrufer
//   3. nichts anlegen: der Projektordner darf danach nicht gewachsen sein
//
// Punkt 3 ist der eigentliche Grund fuer diese Datei. Exit-Codes kann man
// nachtragen; ein Werkzeug, das bei einem Tippfehler Verzeichnisse anlegt,
// hinterlaesst Spuren, die niemand sucht.
//
// Exit 0 = alle drei Punkte fuer jedes Werkzeug. Exit 1 = mindestens einer
// verletzt. Exit 2 = die Eval selbst kann nicht pruefen.

import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const KLONE = path.join(HIER, '..', 'scripts', 'web-clone');
const FRIST_MS = 30000;

// Bewusst so gewaehlt, dass es unter keiner Konvention ein gueltiger Wert ist.
const UNBEKANNT = '--diesesflaggibtsnichtxyz';

// Wohin init-clone Projekte anlegt. Der Pfad steht im Werkzeug selbst; hier
// nur zum Nachsehen, ob ein abgelehnter Aufruf trotzdem etwas hinterlassen hat.
const KLON_ZIEL = path.join(process.env.HOME || '/root', 'projects', 'website-clones');

let fehler = 0;
let gezaehlt = 0;

function zeile(ok, was, detail) {
  gezaehlt++;
  if (!ok) fehler++;
  console.log(`  [${ok ? 'OK' : '!!'}]   ${was}`);
  if (!ok && detail) console.log(`         ${detail}`);
}

// Auch scripts/ selbst, nicht nur die Klon-Werkzeuge. Beim Abklopfen aller 23
// Werkzeuge am 31.07.2026 meldeten zwei aus scripts/ noch Exit 1: bilder.mjs
// (unbekanntes Kommando) und lib-lookup.mjs (Library nicht im Tresor). Beides
// Aufruffehler — das Werkzeug hat nichts angesehen. Ein Ordner, den diese Eval
// nicht betritt, ist kein sauberer Ordner.
//
// lib-exporte.mjs bleibt draussen: es ist ein Modul, kein Werkzeug, und sagt
// das auch (Exit 2 mit Verweis auf lib-lookup).
const SKRIPTE = path.join(HIER, '..', 'scripts');
const sammeln = (ordner, praefix) => (fs.existsSync(ordner)
  ? fs.readdirSync(ordner)
    .filter((n) => n.endsWith('.mjs') && n !== 'playwright-loader.mjs' && n !== 'lib-exporte.mjs')
    .map((n) => `${praefix}${n}`)
  : []);

const werkzeuge = [...sammeln(SKRIPTE, ''), ...sammeln(KLONE, 'web-clone/')].sort();

// Eine leere Liste sieht wie ein sauberer Lauf aus. Untergrenze deutlich unter
// dem Ist-Stand (13 am 31.07.2026): sie faengt stilles Nichtstun, nicht jedes
// geloeschte Werkzeug.
const MINDESTENS = 8;
if (werkzeuge.length < MINDESTENS) {
  console.error(`Nur ${werkzeuge.length} Werkzeuge gefunden (erwartet mindestens ${MINDESTENS}).`);
  console.error('Ohne sie prueft diese Eval nichts und meldete trotzdem gruen.');
  process.exit(2);
}

const vorher = fs.existsSync(KLON_ZIEL) ? fs.readdirSync(KLON_ZIEL).sort() : null;

console.log(`Aufruffehler-Check — ${werkzeuge.length} Werkzeuge in web-clone/\n`);
console.log('Ein unbekanntes Flag heisst: nichts geprueft. Also Exit 2, nicht 1:\n');

for (const name of werkzeuge) {
  const r = spawnSync('node', [path.join(SKRIPTE, name), UNBEKANNT], {
    encoding: 'utf8', timeout: FRIST_MS, maxBuffer: 8 * 1024 * 1024,
  });

  if (r.error && r.error.code === 'ETIMEDOUT') {
    zeile(false, name, `keine Antwort binnen ${FRIST_MS / 1000}s — arbeitet, statt abzulehnen`);
    continue;
  }
  const aus = `${r.stdout || ''}${r.stderr || ''}`;
  if (r.status !== 2) {
    zeile(false, name, r.status === 1
      ? 'Exit 1 heisst "geprueft und durchgefallen" — geprueft wurde aber nichts'
      : `Exit ${r.status} — ein abgelehnter Aufruf darf nie als bestanden gelten`);
    continue;
  }
  // Die Meldung muss das Flag nennen. Sonst weiss der Aufrufer nur, dass etwas
  // falsch war, nicht was.
  if (!aus.includes(UNBEKANNT)) {
    zeile(false, name, `Exit 2, aber "${UNBEKANNT}" steht nicht in der Meldung — welcher Aufruf war falsch?`);
    continue;
  }
  zeile(true, name);
}

// --- Der eigentliche Grund: nichts anlegen --------------------------------
console.log('\nEin abgelehnter Aufruf darf nichts hinterlassen:\n');
{
  if (vorher === null) {
    // Ordner gab es vorher nicht. Dann darf ihn auch keiner angelegt haben.
    zeile(!fs.existsSync(KLON_ZIEL), `${KLON_ZIEL} wurde nicht angelegt`,
      'ein abgelehnter Aufruf hat den Projektordner erzeugt');
  } else {
    const nachher = fs.readdirSync(KLON_ZIEL).sort();
    const neu = nachher.filter((n) => !vorher.includes(n));
    zeile(neu.length === 0, `${KLON_ZIEL} unveraendert (${vorher.length} Eintraege)`,
      `neu entstanden: ${neu.join(', ')} — ein Tippfehler hat ein Projekt erzeugt`);
  }
}

// --- Fehlendes Pflichtargument ist derselbe Fall ---------------------------
// Ein unbekanntes Flag und ein vergessenes Pflichtargument sagen beide: dieser
// Aufruf war falsch, geprueft wurde nichts. Bis zum 31.07.2026 endeten
// visual-diff und compare-recon dabei mit Exit 1 — also mit dem Code fuer
// "geprueft und durchgefallen". In einer Kette liest das jedes Skript als
// echten Befund.
//
// Nur die Werkzeuge mit erkennbarer Pflichtangabe: wer ohne Argument seine
// Uebersicht zeigt (bilder.mjs, lib-lookup.mjs), tut das mit Recht.
console.log('\nEin fehlendes Pflichtargument ist auch ein Aufruffehler:\n');
{
  const MIT_PFLICHT = [
    'axe-run.mjs', 'craft-check.mjs', 'formular-check.mjs', 'motion-check.mjs',
    'tastatur-check.mjs',
    // import-check und shot-sweep bleiben draussen: sie HABEN eine sinnvolle
    // Voreinstellung und arbeiten ohne Argument wirklich (Quellordner '.',
    // Standard-URL). Nachgemessen — import-check meldete "2 erfundene Importe",
    // shot-sweep schrieb ein Manifest. Ihr Exit 1 ist ein echtes Urteil, kein
    // Aufruffehler. Bei import-check ist der stille Rueckfall auf '.' getrennt
    // abgesichert (Pfad ohne --src -> Exit 2, siehe run-import-check).
    'web-clone/audit-clone.mjs', 'web-clone/visual-diff.mjs',
    'web-clone/compare-recon.mjs', 'web-clone/klon-gate.mjs',
    'web-clone/dna-scaffold.mjs',
  ].filter((n) => fs.existsSync(path.join(SKRIPTE, n)));

  if (MIT_PFLICHT.length < 8) {
    zeile(false, `nur ${MIT_PFLICHT.length} Werkzeuge mit Pflichtangabe gefunden`,
      'umbenannt oder verschoben? Diese Liste muss mitgezogen werden');
  }

  for (const name of MIT_PFLICHT) {
    const r = spawnSync('node', [path.join(SKRIPTE, name)], {
      encoding: 'utf8', timeout: FRIST_MS, maxBuffer: 8 * 1024 * 1024,
    });
    if (r.error && r.error.code === 'ETIMEDOUT') {
      zeile(false, `${name} (ohne Argument)`, `keine Antwort binnen ${FRIST_MS / 1000}s`);
      continue;
    }
    zeile(r.status === 2, `${name} (ohne Argument) -> Exit ${r.status}`,
      r.status === 2 ? null
        : r.status === 1 ? 'Exit 1 heisst "geprueft und durchgefallen" — geprueft wurde nichts'
          : `Exit ${r.status} — ein unvollstaendiger Aufruf darf nie als bestanden gelten`);
  }
}

console.log(`\n${gezaehlt - fehler}/${gezaehlt} wie erwartet.`);
if (fehler) {
  console.log('Ein falscher Aufruf wird nicht ueberall als solcher behandelt.');
  process.exit(1);
}
console.log('Kein Werkzeug verwechselt einen Tippfehler mit einem Qualitaetsurteil.');
