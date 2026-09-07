#!/usr/bin/env node
/**
 * run-katalog-check.mjs — nennt der Komponenten-Katalog jede Komponente?
 *
 * INDEX.md ist der einzige Weg, auf dem ein Agent eine der 95 Dateien in
 * `references/ui-components/motion/` findet. Was dort nicht steht, existiert
 * fuer ihn nicht — er baut es nach.
 *
 * Gemessen am 30.07.2026: zehn Komponenten fehlten, darunter `loader.tsx`
 * (606 Zeilen, 9 Varianten) und `knockout-bracket.tsx` (802 Zeilen). Der
 * Katalog las sich vollstaendig; nachgezaehlt hatte er es nie jemand.
 *
 * Warum das die gefaehrlichere Haelfte ist: ein Verweis INS LEERE faellt sofort
 * auf ("Datei nicht gefunden"). Eine Datei, die im Katalog FEHLT, faellt nie
 * auf — man vermisst nicht, was man nicht kennt.
 *
 *   node evals/run-katalog-check.mjs
 *
 * Exit 0 = jede Komponente steht im Katalog, jeder Katalog-Eintrag existiert.
 * Exit 1 = mindestens eine Seite hat eine Luecke.
 * Exit 2 = Katalog oder Ordner fehlt (nicht geprueft, nicht bestanden).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const BIB = path.join(HIER, '..', 'references', 'ui-components');
const INDEX = path.join(BIB, 'INDEX.md');
const MOTION = path.join(BIB, 'motion');

for (const [p, was] of [[INDEX, 'INDEX.md'], [MOTION, 'motion/']]) {
  if (!fs.existsSync(p)) {
    console.error(`FEHLER: ${was} nicht gefunden (${p}) — nicht geprueft.`);
    process.exit(2);
  }
}

const idx = fs.readFileSync(INDEX, 'utf8');

function alleDateien(dir, wurzel = dir, raus = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) alleDateien(p, wurzel, raus);
    else if (e.name.endsWith('.tsx')) raus.push(path.relative(wurzel, p));
  }
  return raus;
}

const dateien = alleDateien(MOTION);
if (dateien.length < 20) {
  console.error(`Nur ${dateien.length} Komponenten gefunden — zeigt der Pfad richtig? Nicht geprueft.`);
  process.exit(2);
}

// Im Katalog genannt: einzelne Dateien, ganze Unterordner (`swap/`) und
// Sammeleintraege mit Stern (`action-swap*.tsx` deckt vier Dateien ab).
const genannt = new Set([...idx.matchAll(/`([a-z0-9-]+(?:\/[a-z0-9-]+)?\.tsx)`/g)].map((m) => m[1]));
const ordner = new Set([...idx.matchAll(/`([a-z0-9-]+)\/`/g)].map((m) => m[1]));
const sterne = [...idx.matchAll(/`([a-z0-9-]+)\*\.tsx`/g)].map((m) => m[1]);

const abgedeckt = (rel) => genannt.has(rel)
  || ordner.has(rel.split('/')[0])
  || sterne.some((s) => path.basename(rel).startsWith(s));

let fehler = 0;
console.log('\nKomponenten-Katalog — steht jede Datei drin?\n');

const fehlend = dateien.filter((d) => !abgedeckt(d));
if (fehlend.length) {
  fehler++;
  console.log(`  [!!]   ${fehlend.length} von ${dateien.length} Komponenten fehlen im Katalog`);
  for (const f of fehlend.slice(0, 12)) console.log(`         ${f}`);
  console.log('         Was nicht im Katalog steht, wird nachgebaut statt benutzt.');
} else {
  console.log(`  [OK]   ${dateien.length} Komponenten, jede im Katalog auffindbar`);
}

// Gegenrichtung: ein Katalog-Eintrag ohne Datei schickt den Agenten ins Leere.
// Ohne diese Haelfte waere der Katalog auch dadurch "vollstaendig", dass man
// jede erdenkliche Datei hineinschreibt.
const vorhanden = new Set(dateien);
const geister = [...genannt].filter((g) => !vorhanden.has(g));
if (geister.length) {
  fehler++;
  console.log(`  [!!]   ${geister.length} Katalog-Eintrag/-Eintraege ohne Datei`);
  for (const g of geister.slice(0, 8)) console.log(`         ${g}`);
} else {
  console.log(`  [OK]   ${genannt.size} genannte Dateien, alle vorhanden`);
}

console.log(`\n${2 - fehler}/2 wie erwartet.`);
if (fehler) {
  console.log('Der Katalog und der Ordner sind auseinandergelaufen.');
  process.exit(1);
}
console.log('Katalog und Bibliothek sagen dasselbe.');
