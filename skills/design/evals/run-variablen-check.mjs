#!/usr/bin/env node
/**
 * run-variablen-check.mjs — sieht jede Regel durch CSS-Variablen hindurch?
 *
 * Am 31.07.2026 viermal derselbe Fehler gefunden, jedes Mal einzeln:
 * flat-type-hierarchy, dark-glow (Schatten), monotonous-spacing und noch
 * einmal dark-glow (Hintergrund). Immer dasselbe Muster — die Regel liest
 * rohen CSS-Text, findet `padding: 16px` und schweigt bei
 * `padding: var(--s)`. Design-Systeme schreiben ausschliesslich die zweite
 * Form. Die Regeln funktionierten also genau dort, wo niemand sie braucht.
 *
 * Beim vierten Mal ist Einzelsuche keine Antwort mehr. Diese Eval nimmt jede
 * Probe-Seite, schreibt sie ein zweites Mal mit denselben Werten in Tokens,
 * und verlangt dasselbe Urteil. Was in einer Form gefunden wird, muss in der
 * anderen auch gefunden werden.
 *
 * Der Browser-Pfad braucht das nicht: getComputedStyle liefert aufgeloeste
 * Werte. Nur der Datei-Modus liest Text — dort sitzt die Luecke.
 *
 *   node evals/run-variablen-check.mjs
 *
 * Exit 0 = beide Formen ergeben dasselbe Urteil.
 * Exit 1 = mindestens eine Regel sieht nur die rohe Form.
 * Exit 2 = der Detektor lief nicht (nicht geprueft, nicht bestanden).
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const DETEKTOR = path.join(HIER, '..', 'scripts', 'detect.mjs');

if (!fs.existsSync(DETEKTOR)) {
  console.error(`FEHLER: detect.mjs nicht gefunden (${DETEKTOR}) — nicht geprueft.`);
  process.exit(2);
}

// Jede Probe: dieselbe Seite zweimal. `roh` schreibt die Werte hin, `tokens`
// legt sie in Variablen. Was die eine meldet, muss die andere auch melden.
const PROBEN = [
  {
    was: 'flache Typo-Skala',
    regel: 'flat-type-hierarchy',
    roh: 'h1{font-size:1.1rem}h2{font-size:1rem}p{font-size:0.9rem}',
    tokens: ':root{--a:1.1rem;--b:1rem;--c:0.9rem}h1{font-size:var(--a)}h2{font-size:var(--b)}p{font-size:var(--c)}',
    body: '<h1>A</h1><h2>B</h2><p>C</p>',
  },
  {
    was: 'farbiger Glow auf dunklem Grund',
    regel: 'dark-glow',
    roh: 'body{background:#0a0a12;color:#eee}.k{box-shadow:0 0 60px rgba(99,102,241,.6)}',
    tokens: ':root{--bg:#0a0a12;--g:0 0 60px rgba(99,102,241,.6)}body{background:var(--bg);color:#eee}.k{box-shadow:var(--g)}',
    body: '<div class="k">A</div>',
  },
  {
    was: 'monotoner Abstands-Rhythmus',
    regel: 'monotonous-spacing',
    roh: Array.from({ length: 14 }, (_, i) => `.a${i}{padding:16px}`).join(''),
    tokens: `:root{--s:16px}${Array.from({ length: 14 }, (_, i) => `.a${i}{padding:var(--s)}`).join('')}`,
    body: Array.from({ length: 14 }, (_, i) => `<div class="a${i}">x</div>`).join(''),
  },
  // Diese beiden kamen dazu, als der systematische Vergleich zum ersten Mal
  // lief (31.07.2026): die Einzelsuche hatte sie nicht erwischt, weil sie
  // nicht Zahlenwerte lesen, sondern Schriftnamen und Verlaeufe. Sie waren
  // der Anlass, die Aufloesung zentral zu machen statt Regel fuer Regel.
  {
    was: 'abgenutzte Schriftart',
    regel: 'overused-font',
    roh: '.b{font-family:Inter,sans-serif}',
    tokens: ':root{--font:Inter,sans-serif}.b{font-family:var(--font)}',
    body: '<div class="b">B</div>',
  },
  {
    was: 'Verlauf im Text',
    regel: 'gradient-text',
    roh: '.c{background:linear-gradient(90deg,#6366f1,#a855f7);-webkit-background-clip:text;color:transparent}',
    tokens: ':root{--v:linear-gradient(90deg,#6366f1,#a855f7)}'
      + '.c{background:var(--v);-webkit-background-clip:text;color:transparent}',
    body: '<div class="c">C</div>',
  },
  // Diese drei liefen in einer Sammelprobe mit und hatten deshalb keinen
  // eigenen Fall — die neue Abdeckungs-Wache unten hat das sofort gemeldet.
  // "Ich hab's mal mitgetestet" ist kein Testfall: beim naechsten Umbau weiss
  // niemand mehr, was mitgelaufen ist.
  {
    was: 'Indigo-Violett-Verlauf',
    regel: 'ai-color-palette',
    roh: '.v{background:linear-gradient(90deg,#6366f1,#a855f7)}',
    tokens: ':root{--v:linear-gradient(90deg,#6366f1,#a855f7)}.v{background:var(--v)}',
    body: '<div class="v">V</div>',
  },
  {
    was: 'Bounce-Kurve',
    regel: 'bounce-easing',
    roh: '.d{transition:transform .3s cubic-bezier(.68,-.55,.27,1.55)}',
    tokens: ':root{--b:cubic-bezier(.68,-.55,.27,1.55)}.d{transition:transform .3s var(--b)}',
    body: '<div class="d">D</div>',
  },
  {
    was: 'Layout-Transition',
    regel: 'layout-transition',
    roh: '.e{transition:width .3s ease}',
    tokens: ':root{--t:.3s}.e{transition:width var(--t) ease}',
    body: '<div class="e">E</div>',
  },
];

// Warum die restlichen vier keine Probe brauchen:
//
// Am 31.07.2026 nachgezaehlt: der Datei-Modus hat 9 benannte Regeln. Fuenf
// davon lesen Werte, die in Tokens stehen koennen (oben). Die restlichen
  // vier sind geprueft und brauchen keine Probe:
  //
//   side-tab, border-accent-on-rounded  — messen Kanten und Radien; mit
//       Tokens gegengeprueft, beide Formen ergeben dasselbe Urteil.
//   broken-image                        — liest ein src-Attribut, kein CSS.
//   gray-on-color                       — reine Tailwind-Klassenregel,
//       CSS-Variablen kommen darin nicht vor.
  //
// ai-color-palette, bounce-easing und layout-transition sind ueber die
  // Sechser-Probe mitgelaufen (beide Formen identisch) und haengen an
  // denselben zentralen Zeilen wie overused-font.


const seite = (style, body) => `<!doctype html><html lang="de"><head><meta charset="utf-8">`
  + `<title>Probe</title><style>${style}</style></head><body>${body}</body></html>\n`;

function lauf(html) {
  const ordner = fs.mkdtempSync(path.join(os.tmpdir(), 'varcheck-'));
  const datei = path.join(ordner, 'i.html');
  fs.writeFileSync(datei, html);
  let aus = '';
  try {
    // stdio: der Detektor schreibt seinen Bericht sonst mitten in unseren.
    aus = execFileSync('node', [DETEKTOR, datei],
      { encoding: 'utf8', timeout: 120000, stdio: ['ignore', 'pipe', 'pipe'] });
  } catch (e) {
    aus = `${e.stdout || ''}${e.stderr || ''}`;
  }
  fs.rmSync(ordner, { recursive: true, force: true });
  return [...new Set([...aus.matchAll(/\[([a-z0-9-]+)\]/g)].map((m) => m[1]))];
}

console.log('\nCSS-Variablen — sieht jede Regel durch Tokens hindurch?\n');

let fehler = 0;
for (const p of PROBEN) {
  const idsRoh = lauf(seite(p.roh, p.body));
  const idsTok = lauf(seite(p.tokens, p.body));

  // Erst die Voraussetzung: findet die Regel den Fall ueberhaupt in der rohen
  // Form? Sonst prueft der Vergleich unten zwei Nullen gegeneinander und
  // meldet gruen, weil beide Seiten gleich blind sind.
  if (!idsRoh.includes(p.regel)) {
    console.log(`  [!!]   ${p.was}: ${p.regel} feuert nicht einmal auf rohem CSS`);
    console.log('         Die Probe trifft die Regel nicht mehr — Schwelle geaendert?');
    fehler++;
    continue;
  }

  const ok = idsTok.includes(p.regel);
  console.log(ok
    ? `  [OK]   ${p.was}: ${p.regel} in beiden Formen gefunden`
    : `  [!!]   ${p.was}: ${p.regel} nur in roher Form — Tokens machen sie blind`);
  if (!ok) fehler++;
}

// Kommt eine Regel dazu, faellt sie hier auf. Ohne diese Wache waechst der
// Detektor weiter, und der Vergleich prueft immer dieselben fuenf — genau die
// Alterung, die diese Luecke sechs Runden lang am Leben hielt.
{
  const quelle = fs.readFileSync(
    path.join(HIER, '..', 'scripts', 'detector', 'engines', 'regex', 'detect-text.mjs'), 'utf8');
  const alle = [...new Set([...quelle.matchAll(/id: '([a-z0-9-]+)'/g)].map((m) => m[1]))];
  const geprueft = new Set(PROBEN.map((p) => p.regel));
  // Bewusst ohne Probe, Begruendung im Kommentar bei der Probenliste.
  const OHNE_PROBE = new Set(['side-tab', 'border-accent-on-rounded', 'broken-image', 'gray-on-color']);
  const offen = alle.filter((r) => !geprueft.has(r) && !OHNE_PROBE.has(r));
  const toteAusnahmen = [...OHNE_PROBE].filter((r) => !alle.includes(r));

  if (offen.length) {
    console.log(`  [!!]   ${offen.length} Regel(n) ohne Variablen-Probe: ${offen.join(', ')}`);
    console.log('         Entweder eine Probe bauen oder mit Begruendung ausnehmen.');
    fehler++;
  } else if (toteAusnahmen.length) {
    console.log(`  [!!]   ${toteAusnahmen.length} Ausnahme(n) ohne Regel: ${toteAusnahmen.join(', ')}`);
    console.log('         Die Liste wird zur Muellhalde und deckt spaeter echte Luecken zu.');
    fehler++;
  } else {
    console.log(`  [OK]   ${alle.length} Regeln im Datei-Modus, ${geprueft.size} mit Probe, ${OHNE_PROBE.size} begruendet ohne`);
  }
}

console.log(`\n${PROBEN.length - fehler}/${PROBEN.length} Regeln sehen durch Tokens hindurch.`);
if (fehler) {
  console.log('Eine Regel funktioniert nur auf hingeschriebenem CSS — also nicht auf echten Projekten.');
  process.exit(1);
}
console.log('Was in roher Form gefunden wird, wird auch in Tokens gefunden.');
