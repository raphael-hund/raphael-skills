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

// JEDEN scripts/-Ordner suchen, egal wie tief. Der erste Entwurf sah genau
// eine Ebene (skills/*/scripts und skills/eigene/*/scripts) und uebersah
// skills/imported/last30days/scripts — ein Skill, der eine Ebene weiter unten
// liegt. Gemessen 03.08.2026: 55 gepruefte Skripte, 56 im Repo.
//
// Eine Zaehlung, die eine Ebene nicht kennt, meldet trotzdem eine runde Zahl.
function scriptOrdner(wurzel, raus = []) {
  if (!fs.existsSync(wurzel)) return raus;
  for (const e of fs.readdirSync(wurzel, { withFileTypes: true })) {
    if (!e.isDirectory() || e.name.startsWith('.') || e.name === 'node_modules') continue;
    const p = path.join(wurzel, e.name);
    if (e.name === 'scripts') { if (!raus.includes(p)) raus.push(p); continue; }
    scriptOrdner(p, raus);
  }
  return raus;
}

const ORDNER = scriptOrdner(SKILLS_WURZEL);

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

// Ausgenommen: der last30days-Skill VERARBEITET chinesische Inhalte (er
// durchsucht Xiaohongshu und Weibo). Seine Stoppwortlisten, Zeichenbereiche
// und API-Parameter sind notwendig chinesisch — das ist Datenverarbeitung,
// keine Ausgabe an Raphael.
//
// Bewusst der ganze Ordner, nicht Zeile fuer Zeile: die drei betroffenen
// Dateien (cjk.py, relevance.py, xiaohongshu_api.py) haben Docstrings mit
// chinesischen Beispielen, Konstantenlisten und Sortier-Parameter. Jede
// Form einzeln auszunehmen haette das Muster so weit aufgeweicht, dass es
// echte Ausgabe in anderen Skripten durchgelassen haette.
//
// Nachgesehen 03.08.2026, Zeile fuer Zeile: keine einzige Stelle druckt
// etwas auf Chinesisch. Kaeme das dazu, faellt es hier NICHT auf — der
// Preis dieser Ausnahme, und er steht hier, damit ihn jemand kennt.
const AUSGENOMMENE_ORDNER = ['imported/last30days/scripts/lib'];

// Die Ausnahmeliste selbst pruefen: ein Eintrag fuer einen Ordner, den es
// nicht mehr gibt, macht sie zur Muellhalde. Dieselbe Wache haengt an jeder
// anderen Ausnahmeliste beider Skills.
{
  const tot = AUSGENOMMENE_ORDNER.filter((o) => !fs.existsSync(path.join(SKILLS_WURZEL, o)));
  if (tot.length) {
    console.error(`\n${tot.length} Ausnahme(n) ohne Ordner: ${tot.join(', ')}`);
    console.error('Entfernt oder verschoben? Die Liste muss mitgezogen werden.\n');
    process.exit(2);
  }
}

function dateien(dir, raus = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) dateien(p, raus);
    // Auch Python und Shell: 107 solche Dateien liegen in den Skript-Ordnern,
    // und ein Bericht auf Chinesisch ist dort genauso unlesbar wie in .mjs.
    // Der last30days-Skill hat drei mit chinesischem Text — nachgesehen
    // 03.08.2026, alles Kommentare und Datenverarbeitung (er sucht ja
    // chinesische Inhalte). Genau deshalb muessen sie GEPRUEFT werden statt
    // ausgenommen: sonst faellt echte Ausgabe dort nie auf.
    else if (/\.(mjs|py|sh)$/.test(e.name)) raus.push(p);
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
  const rel = path.relative(SKILLS_WURZEL, f);
  if (AUSGENOMMENE_ORDNER.some((o) => rel.startsWith(o))) continue;
  const zeilen = fs.readFileSync(f, 'utf8').split('\n');
  const treffer = [];
  for (const [i, z] of zeilen.entries()) {
    if (!CJK.test(z)) continue;
    geprueft++;
    // Kommentare bleiben: sie sind Teil des vendorierten Originals.
    // Kommentar-Zeichen aller drei Sprachen: // und * (JS), # (Python/Shell).
    // Erster Lauf ueber Python meldete zehn Kommentarzeilen in cjk.py als
    // "fremdsprachige Ausgabe" — der Skill sucht chinesische Inhalte, seine
    // Beispiele SIND chinesisch. Ein Waechter, der das anklagt, wird nach dem
    // dritten Fehlalarm abgeschaltet.
    if (/^\s*(\/\/|\*|\/\*|#)/.test(z)) continue;
    // Datenverarbeitung ist keine Ausgabe: `text.endswith("万")` prueft ein
    // Zeichen, es druckt keins. Geprueft wird, was der Leser SIEHT.
    if (/\b(?:endswith|startswith|replace|split|strip)\s*\(/.test(z)) continue;
    // Docstring-Zeilen und reine Zuweisungen von Konstanten.
    if (/^\s*(?:\x22\x22\x22|''')/.test(z)) continue;
    if (/^\s*[A-Za-z_]+\s*[:=]\s*[\x22'][^\x22']*[\x22']\s*,?\s*$/.test(z)) continue;
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
