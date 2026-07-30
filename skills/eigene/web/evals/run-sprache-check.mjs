#!/usr/bin/env node
/**
 * run-sprache-check.mjs — spricht jedes Werkzeug die Sprache seines Lesers?
 *
 * Raphael liest die Berichte. Die vendorierten Klon-Werkzeuge schrieben sie auf
 * Chinesisch: der Rechtspruefungs-Bericht von audit-clone.mjs (Kategorien,
 * Befunde, Fazit), die Projekt-Notizvorlage von init-clone.mjs, der komplette
 * Bewertungsbericht von compare-recon.mjs. Gemessen am 30.07.2026: 137 Zeilen
 * AUSGABE, nicht Kommentar.
 *
 * Warum das mehr ist als Kosmetik: ein Bericht, den der Leser nicht lesen kann,
 * ist kein Bericht. Der Klon-Audit nennt fremde Tracker im Klon — ein
 * Rechtsproblem. Wer die Ueberschrift nicht versteht, ueberfliegt ihn.
 *
 * Kommentare im Code bleiben ausdruecklich unangetastet: sie sind Teil des
 * vendorierten Originals und stehen niemandem im Weg.
 *
 *   node evals/run-sprache-check.mjs
 *
 * Exit 0 = keine fremdsprachige Ausgabe. Exit 1 = mindestens eine Zeile.
 * Exit 2 = Ordner fehlt (nicht geprueft, nicht bestanden).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));
// Jeder Skill mit einem scripts/-Ordner, nicht nur web. Der erste Entwurf sah
// nur hierher — und uebersah, dass design eine EIGENE Kopie von
// dna-scaffold.mjs haelt, die noch komplett auf Chinesisch ausgab (gefunden
// 30.07.2026, einen Tag nachdem die web-Kopie uebersetzt war). Zwei Kopien
// derselben Datei, eine geprueft, eine nicht: genau die Luecke, die ein
// Pruefer mit festem Pfad offen laesst.
const SKILLS_WURZEL = path.join(HIER, '..', '..', '..');
const ORDNER = [];
for (const wurzel of [path.join(HIER, '..', '..'), SKILLS_WURZEL]) {
  if (!fs.existsSync(wurzel)) continue;
  for (const e of fs.readdirSync(wurzel, { withFileTypes: true })) {
    if (!e.isDirectory() || e.name.startsWith('.')) continue;
    const skripte = path.join(wurzel, e.name, 'scripts');
    if (fs.existsSync(skripte) && !ORDNER.includes(skripte)) ORDNER.push(skripte);
  }
}

if (!ORDNER.length) {
  console.error('FEHLER: kein scripts/-Ordner gefunden — nicht geprueft.');
  process.exit(2);
}

// CJK-Bereich. Bewusst grob: es geht um "steht hier Text, den Raphael nicht
// lesen kann", nicht um eine Sprachbestimmung.
const CJK = /[一-鿿]/;

// Ausdrueckliche Ausnahme: SUCHMUSTER duerfen fremde Zeichen enthalten — sie
// sollen chinesische Platzhalter im Klon ja FINDEN. `audit-clone.mjs` sucht
// nach "待补" und "这里填写". Das ist keine Ausgabe, sondern ihr Gegenteil.
const IST_SUCHMUSTER = (zeile) => /pattern:\s*"/.test(zeile);

function dateien(dir, raus = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) dateien(p, raus);
    else if (e.name.endsWith('.mjs')) raus.push(p);
  }
  return raus;
}

const alle = ORDNER.flatMap((o) => dateien(o));
if (alle.length < 5) {
  console.error(`Nur ${alle.length} Skript(e) gefunden — der Lauf misst so nichts.`);
  process.exit(2);
}

console.log('\nSprache der Ausgabe — kann Raphael jeden Bericht lesen?\n');

let fehler = 0;
let geprueft = 0;
for (const f of alle) {
  const zeilen = fs.readFileSync(f, 'utf8').split('\n');
  const treffer = [];
  for (const [i, z] of zeilen.entries()) {
    if (!CJK.test(z)) continue;
    geprueft++;
    // Kommentare bleiben: sie sind Teil des vendorierten Originals.
    if (/^\s*(\/\/|\*|\/\*)/.test(z)) continue;
    if (IST_SUCHMUSTER(z)) continue;
    treffer.push(`${i + 1}: ${z.trim().slice(0, 70)}`);
  }
  if (treffer.length) {
    fehler++;
    console.log(`  [!!]   ${path.relative(SKILLS_WURZEL, f)}: ${treffer.length} Zeile(n) fremdsprachige Ausgabe`);
    for (const t of treffer.slice(0, 5)) console.log(`         ${t}`);
  }
}

if (!fehler) console.log(`  [OK]   ${alle.length} Skripte, keine fremdsprachige Ausgabe`);
console.log(`\n${alle.length - fehler}/${alle.length} Skripte wie erwartet.`);
if (fehler) {
  console.log('Ein Bericht, den der Leser nicht lesen kann, ist kein Bericht.');
  process.exit(1);
}
console.log('Jeder Bericht spricht die Sprache seines Lesers.');
