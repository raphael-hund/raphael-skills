#!/usr/bin/env node
// run-port-vergabe-check.mjs — belegen zwei Evals denselben Port?
//
// LAUFZEIT: 2s (gemessen 02.08.2026) — reines Lesen, kein Server startet.
//
//   node evals/run-port-vergabe-check.mjs
//
// WARUM (Befund 02.08.2026)
// Elf Evals beider Skills starten eigene Testserver auf festen Ports. Jede
// prueft vorher, ob "ihr" Port frei ist, und bricht sonst mit Exit 2 ab — das
// ist richtig und rettet den EINZELNEN Lauf.
//
// Was keine von ihnen sieht: ob eine ANDERE Eval denselben Port beansprucht.
// Im Sammellauf (run-eval-umfang) laufen sie nacheinander, da faellt es nicht
// auf. Fahren zwei parallel, gewinnt die erste, und die zweite meldet
// "Port fremdbelegt — diese Eval kann nichts messen". Ein Abbruch, der wie
// ein fremder Prozess aussieht und in Wahrheit hausgemacht ist.
//
// Mehrere Evals belegen ausserdem BEREICHE: run-halbe-antwort-check nimmt
// PORT bis PORT+4, run-weiterleitung-check PORT und PORT+1. Wer eine neue
// Eval mit einem "freien" Port anlegt, sieht die Basis-Zahlen im Code — die
// abgeleiteten nicht. Gemessen 02.08.2026: 17 belegte Ports aus 11 Basen,
// der engste Abstand betraegt 2.
//
// WAS DIESE EVAL PRUEFT
//   1. Kein Port wird von zwei Evals beansprucht — Basis UND abgeleitete.
//   2. Zwischen zwei Basis-Ports liegt genug Luft fuer die Bereiche, die
//      daran haengen. Ein Bereich, der in den naechsten hineinwaechst, ist
//      heute kein Fehler und morgen einer.
//
// Was sie NICHT prueft: ob die Ports frei sind. Das macht jede Eval selbst,
// und es haengt vom Rechner ab, nicht vom Code.
//
// Exit 0 = die Vergabe ist eindeutig. Exit 1 = zwei Evals streiten sich.
// Exit 2 = die Eval selbst kann nicht pruefen.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const SKILLS = path.join(HIER, '..', '..', '..');

let fehler = 0;
let gezaehlt = 0;

function zeile(ok, was, detail) {
  gezaehlt++;
  if (!ok) fehler++;
  console.log(`  [${ok ? 'OK' : '!!'}]   ${was}`);
  if (!ok && detail) console.log(`         ${detail}`);
}

// Aus dem Code, nicht aus einer Liste: eine neue Eval ist automatisch dabei.
//   const PORT = Number(process.env.HALB_PORT || 5431);
const BASIS_RE = /\|\|\s*(5\d{3})\)/;
//   const PORT_GZIP = PORT_HALB + 2;
const ABLEITUNG_RE = /PORT\w*\s*\+\s*(\d+)/g;

const evals = [];
for (const unter of ['eigene/web/evals', 'design/evals']) {
  const ordner = path.join(SKILLS, unter);
  if (!fs.existsSync(ordner)) continue;
  for (const name of fs.readdirSync(ordner).sort()) {
    if (!name.startsWith('run-') || !name.endsWith('.mjs')) continue;
    // Die eigene Datei nicht: ihr Kopfkommentar NENNT Ports als Beispiel
    // ("run-halbe-antwort-check nimmt PORT bis PORT+4"). Gemessen 02.08.2026:
    // die erste Fassung meldete sich selbst als Kollision mit genau der Eval,
    // die sie zitiert. Derselbe Fehler wie bei der Zeilenverweis-Wache einen
    // Tag zuvor — ein Waechter, der seine eigene Erklaerung als Schaden
    // meldet, wird abgeschaltet statt gelesen.
    if (name === path.basename(fileURLToPath(import.meta.url))) continue;
    const text = fs.readFileSync(path.join(ordner, name), 'utf8');
    const b = text.match(BASIS_RE);
    if (!b) continue;
    const basis = Number(b[1]);
    const offsets = new Set([0]);
    for (const m of text.matchAll(ABLEITUNG_RE)) offsets.add(Number(m[1]));
    evals.push({ name, basis, offsets: [...offsets].sort((x, y) => x - y) });
  }
}

// Eine leere Liste sieht wie ein sauberer Lauf aus. Untergrenze unter dem
// Ist-Stand (11 am 02.08.2026).
const MINDESTENS = 8;
if (evals.length < MINDESTENS) {
  console.error(`Nur ${evals.length} Evals mit festem Port gefunden (erwartet mindestens ${MINDESTENS}).`);
  console.error('Das Muster "|| 5xxx)" greift nicht mehr — ohne es prueft diese');
  console.error('Eval nichts und meldet trotzdem gruen.');
  process.exit(2);
}

console.log(`Port-Vergabe — ${evals.length} Evals mit eigenem Testserver\n`);
console.log('Zwei Evals auf einem Port sabotieren sich, und es sieht fremd aus:\n');

// 1. Kollisionen. Jeder belegte Port, Basis wie abgeleitet, gehoert genau
//    einer Eval.
const belegt = new Map();   // Port -> [Eval-Namen]
for (const { name, basis, offsets } of evals) {
  for (const o of offsets) {
    const p = basis + o;
    if (!belegt.has(p)) belegt.set(p, []);
    belegt.get(p).push(o === 0 ? name : `${name} (+${o})`);
  }
}
const streit = [...belegt.entries()].filter(([, wer]) => wer.length > 1);
zeile(streit.length === 0, `${belegt.size} belegte Ports, jeder gehoert genau einer Eval`,
  streit.map(([p, wer]) => `${p}: ${wer.join(' vs ')}`).join(' | '));

// 2. Luft zwischen den Basen. Ein Bereich, der bis zum naechsten Basis-Port
//    reicht, ist heute knapp und morgen eine Kollision — naemlich sobald
//    jemand einen weiteren Server in dieselbe Eval haengt.
const MIN_LUFT = 5;
const sortiert = [...evals].sort((a, b) => a.basis - b.basis);
const eng = [];
for (let i = 0; i < sortiert.length - 1; i += 1) {
  const luft = sortiert[i + 1].basis - sortiert[i].basis;
  if (luft < MIN_LUFT) {
    eng.push(`${sortiert[i].name} (${sortiert[i].basis}) und ${sortiert[i + 1].name} (${sortiert[i + 1].basis}): ${luft}`);
  }
}
zeile(eng.length === 0, `zwischen zwei Basis-Ports liegen mindestens ${MIN_LUFT}`,
  `${eng.join(' | ')} — zu wenig Luft: haengt jemand einen zweiten Server an die `
  + 'erste Eval, greift er in die zweite hinein');

// 3. Dieselbe Frage fuer Wegwerf-Ordner. altlastWeg(praefix) loescht ALLES in
//    /tmp, was mit dem Praefix beginnt — und "beginnt mit" heisst: ein Praefix,
//    der Anfang eines anderen ist, raeumt dessen Ordner gleich mit weg.
//
//    Befund 02.08.2026: beide Skills nannten ihren Praefix 'exit-vertrag-'.
//    Die Ordner selbst kollidieren nicht (mkdtemp haengt Zufall an), und die
//    Sechs-Stunden-Grenze schuetzt den laufenden Lauf. Trotzdem falsch: wer
//    'exit-vertrag-' aufraeumt, trifft beide Skills, und die eine Wache haftet
//    fuer die Reste der anderen. Jetzt 'exit-vertrag-web-' und
//    'exit-vertrag-design-' — und diese Regel haelt es fest.
{
  const praefixe = new Map();   // Praefix -> [Eval-Namen]
  for (const unter of ['eigene/web/evals', 'design/evals']) {
    const ordner = path.join(SKILLS, unter);
    if (!fs.existsSync(ordner)) continue;
    for (const name of fs.readdirSync(ordner).sort()) {
      if (!name.startsWith('run-') || !name.endsWith('.mjs')) continue;
      if (name === path.basename(fileURLToPath(import.meta.url))) continue;
      const text = fs.readFileSync(path.join(ordner, name), 'utf8');
      for (const m of text.matchAll(/(?:wegwerfOrdner|altlastWeg)\(\s*'([^']+)'/g)) {
        if (!praefixe.has(m[1])) praefixe.set(m[1], new Set());
        praefixe.get(m[1]).add(`${unter.split('/')[0]}/${name}`);
      }
    }
  }
  // Zwei Evals mit demselben Praefix — oder einer, der Anfang eines anderen
  // ist. Beide Faelle fuehren dazu, dass eine Eval fremde Ordner loescht.
  const kollision = [];
  const liste = [...praefixe.entries()];
  for (const [p, wer] of liste) {
    if (wer.size > 1) kollision.push(`${p}: ${[...wer].join(' vs ')}`);
  }
  for (const [a, werA] of liste) {
    for (const [b, werB] of liste) {
      if (a === b || !b.startsWith(a)) continue;
      // Innerhalb DERSELBEN Eval ist das gewollt (browserstart- und
      // browserstart-seite- gehoeren zusammen und werden zusammen geraeumt).
      const gemeinsam = [...werA].some((x) => werB.has(x));
      if (!gemeinsam) kollision.push(`${a} ist Anfang von ${b}: ${[...werA].join('/')} raeumt ${[...werB].join('/')} mit weg`);
    }
  }
  zeile(kollision.length === 0, `${praefixe.size} Wegwerf-Praefixe, keiner raeumt fremde Ordner`,
    kollision.join(' | '));
}

console.log(`\n${gezaehlt - fehler}/${gezaehlt} Regeln der Port-Vergabe gelten.`);
if (fehler) {
  console.log('Zwei Evals streiten sich um einen Port — der Abbruch sieht fremd aus.');
  process.exit(1);
}
console.log('Jede Eval hat ihren eigenen Port, mit Luft zur naechsten.');
