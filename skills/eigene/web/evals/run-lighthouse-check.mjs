#!/usr/bin/env node
// Prueft die Frage, die diese Woche jeden Pruefer entlarvt hat:
// Saehe die Erfolgsmeldung anders aus, wenn der Pruefer gar nicht gelaufen waere?
//
// Fuer Lighthouse gibt es zwei Wege zu falschem Gruen (beide am 29.07.2026 gemessen):
//  - runtimeError: 404/Timeout, trotzdem vollstaendiger Bericht
//  - stille Umleitung: `/preise` -> `/`, Bericht sagt 100/82 ueber die STARTSEITE
//
// Der Lauf braucht kein Lighthouse und keinen Browser: geprueft wird die
// Entscheidungsfunktion `lhLaufFehler` des Gates gegen echte Bericht-Formen.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const GATE = path.join(HIER, '..', 'scripts', 'g1-gate.mjs');

// Das Gate ist ein Skript, das beim Import losläuft — deshalb die Funktion
// aus der Quelle schneiden statt importieren.
const quelle = fs.readFileSync(GATE, 'utf8');
const anfang = quelle.indexOf('function lhLaufFehler(');
if (anfang < 0) {
  console.error('FEHLER: function lhLaufFehler(...) nicht im Gate gefunden — umbenannt?');
  process.exit(1);
}
const ende = quelle.indexOf('\n}\n', anfang) + 3;
const lhLaufFehler = new Function(`${quelle.slice(anfang, ende)}; return lhLaufFehler;`)();

const U = 'http://localhost:5911';

// muss: true  = der Fall MUSS als Laufproblem auffallen
// muss: false = der Fall ist in Ordnung und darf NICHT blockieren
const FAELLE = [
  { was: 'sauberer Lauf, gleiche URL',
    lh: { finalDisplayedUrl: `${U}/preise` }, url: `${U}/preise`, muss: false },
  { was: 'Schraegstrich am Ende, sonst identisch',
    lh: { finalDisplayedUrl: `${U}/preise/` }, url: `${U}/preise`, muss: false },
  { was: 'Startseite mit und ohne Schraegstrich',
    lh: { finalDisplayedUrl: `${U}/` }, url: U, muss: false },
  { was: 'alte Feldnamen (finalUrl statt finalDisplayedUrl)',
    lh: { finalUrl: `${U}/preise` }, url: `${U}/preise`, muss: false },

  { was: 'stille Umleitung /preise -> /  (gemessen: 100/82, Exit 0)',
    lh: { finalDisplayedUrl: `${U}/` }, url: `${U}/preise`, muss: true },
  { was: 'Umleitung auf eine ganz andere Seite',
    lh: { finalDisplayedUrl: `${U}/kontakt` }, url: `${U}/preise`, muss: true },
  { was: 'Umleitung auf fremde Domain',
    lh: { finalDisplayedUrl: 'https://beispiel.de/' }, url: `${U}/preise`, muss: true },
  { was: '404 — ERRORED_DOCUMENT_REQUEST trotz vollem Bericht',
    lh: { runtimeError: { code: 'ERRORED_DOCUMENT_REQUEST' }, finalDisplayedUrl: `${U}/x` },
    url: `${U}/x`, muss: true },
  { was: 'Timeout beim Laden',
    lh: { runtimeError: { code: 'NO_FCP' }, finalDisplayedUrl: `${U}/` }, url: U, muss: true },
  { was: 'Query-Parameter verschwindet (andere Ansicht bewertet)',
    lh: { finalDisplayedUrl: `${U}/suche` }, url: `${U}/suche?q=dach`, muss: true },
];

let rot = 0;
for (const f of FAELLE) {
  const grund = lhLaufFehler(f.lh, f.url);
  const auffaellig = grund !== null;
  const ok = auffaellig === f.muss;
  if (!ok) rot++;
  console.log(`${ok ? 'OK  ' : 'ROT '} ${f.was}`);
  console.log(`       ${grund ? `-> ${grund}` : '-> in Ordnung, kein Blocker'}`);
  if (!ok) console.log(`       erwartet: ${f.muss ? 'muss auffallen' : 'darf NICHT blockieren'}`);
}

console.log(`\n${FAELLE.length - rot}/${FAELLE.length} Faelle wie erwartet.`);
if (rot) {
  console.log('Ein Lighthouse-Ergebnis sagt hier nichts ueber die genannte Seite. Erst reparieren.');
  process.exit(1);
}
console.log('Ein Lighthouse-Score gilt jetzt nur fuer die Seite, nach der gefragt wurde.');
