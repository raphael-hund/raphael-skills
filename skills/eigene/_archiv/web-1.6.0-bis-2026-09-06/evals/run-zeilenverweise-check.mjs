#!/usr/bin/env node
// run-zeilenverweise-check.mjs — zeigt "Zeile 578" noch auf das Gemeinte?
//
// LAUFZEIT: 2s (gemessen 02.08.2026) — reines Lesen, kein Werkzeug laeuft.
//
//   node evals/run-zeilenverweise-check.mjs
//
// WARUM (Befund 02.08.2026)
// Kommentare in diesen Skills belegen ihre Aussagen — das ist die Regel, an
// der hier alles haengt. Manche belegen sie mit einer ZEILENNUMMER:
//   "scan-ai-slop.mjs endet mit 1 (Zeile 578: 'Scan root must be...')"
//   "Rollen (heading UND body, Zeile 132: nonMono[1] || nonMono[0])"
//
// Eine Zeilennummer altert schneller als jede andere Angabe: sie verschiebt
// sich bei JEDER Einfuegung darueber, ohne dass jemand die Datei anfasst, in
// der sie steht. Gemessen am selben Tag: die erste zeigte auf 593 statt 578,
// die zweite auf 158 statt 132. Beide Verweise schickten den Leser 15 bzw. 26
// Zeilen daneben — auf Code, der plausibel aussieht und etwas anderes tut.
//
// Das ist schlimmer als ein fehlender Beleg. Wer "Zeile 578" liest, schaut
// dort nach, findet etwas Fremdes und schliesst daraus, der Kommentar sei
// falsch — dabei ist nur die Zahl gewandert.
//
// WAS DIESE EVAL PRUEFT
// Jeder Kommentar der Form "Zeile <n>: <zitat>" wird gegen die genannte Datei
// geprueft: steht das Zitat wirklich dort? Wenn nicht, sucht die Eval es in
// der ganzen Datei und nennt die richtige Nummer — sonst waere der Befund
// eine Aufgabe statt einer Antwort.
//
// Verweise OHNE Zitat ("Zeile 90 und 149") kann sie nicht pruefen; sie zaehlt
// sie und sagt das. Eine Wache, die schweigt, wo sie nichts kann, ist
// gefaehrlicher als eine, die es ausspricht.
//
// Beide Skills auf einmal: die Verweise zeigen ueber die Skill-Grenze hinweg
// (eine web-Eval belegt etwas in design/scripts).
//
// Exit 0 = jeder Verweis trifft. Exit 1 = mindestens einer zeigt daneben.
// Exit 2 = die Eval selbst kann nicht pruefen.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const SKILLS = path.join(HIER, '..', '..', '..');   // .../skills

let fehler = 0;
let gezaehlt = 0;
let ohneZitat = 0;

function zeile(ok, was, detail) {
  gezaehlt++;
  if (!ok) fehler++;
  console.log(`  [${ok ? 'OK' : '!!'}]   ${was}`);
  if (!ok && detail) console.log(`         ${detail}`);
}

// Alle .mjs beider Skills einsammeln. Ueber den Ordner, nicht ueber eine
// Liste: ein neuer Verweis ist damit automatisch dabei.
const dateien = [];
for (const unter of ['eigene/web', 'design']) {
  const wurzel = path.join(SKILLS, unter);
  if (!fs.existsSync(wurzel)) continue;
  const stapel = [wurzel];
  while (stapel.length) {
    const jetzt = stapel.pop();
    for (const e of fs.readdirSync(jetzt, { withFileTypes: true })) {
      const voll = path.join(jetzt, e.name);
      if (e.isDirectory()) { if (e.name !== 'node_modules') stapel.push(voll); }
      else if (e.name.endsWith('.mjs')) dateien.push(voll);
    }
  }
}

// Eine leere Liste sieht wie ein sauberer Lauf aus.
const MINDESTENS = 30;
if (dateien.length < MINDESTENS) {
  console.error(`Nur ${dateien.length} .mjs-Dateien gefunden (erwartet mindestens ${MINDESTENS}).`);
  console.error(`Zeigt ${SKILLS} noch auf den skills-Ordner? Ohne Dateien prueft`);
  console.error('diese Eval nichts und meldet trotzdem gruen.');
  process.exit(2);
}

// "Zeile 578: `Scan root must be...`" oder "Zeile 132: nonMono[1] || nonMono[0]"
// Das Zitat endet am schliessenden Anfuehrungszeichen oder am Klammerende.
const RE = /Zeile (\d+):\s*[`'"]?([^`'"\n)]{8,80})/g;

// Welche Datei ist gemeint? Der naechste .mjs-Name VOR dem Verweis, im selben
// Absatz. Ohne diese Bindung wuesste die Eval nicht, wo sie nachsehen soll.
const DATEI_RE = /([a-z0-9-]+(?:\/[a-z0-9-]+)*\.mjs)/g;

const alleWege = new Map();   // Dateiname -> Vollpfad(e)
for (const d of dateien) {
  const kurz = path.basename(d);
  if (!alleWege.has(kurz)) alleWege.set(kurz, []);
  alleWege.get(kurz).push(d);
}

console.log('Zeilenverweise — zeigt die Nummer noch auf das Gemeinte?\n');
console.log('Eine Zeilennummer wandert bei jeder Einfuegung darueber:\n');

const SELBST = fileURLToPath(import.meta.url);

for (const quelle of dateien.sort()) {
  // Die eigene Datei nicht: ihr Kopfkommentar ZITIERT zwei Verweise als
  // Beispiel ("scan-ai-slop.mjs endet mit 1 (Zeile 578: ...)"). Gemessen
  // 02.08.2026: die erste Fassung meldete diese Zitate als eigene Befunde —
  // zwei von drei Treffern stammten aus der eigenen Erklaerung. Ein Waechter,
  // der seine Doku als Schaden meldet, wird abgeschaltet statt gelesen.
  if (quelle === SELBST) continue;

  const text = fs.readFileSync(quelle, 'utf8');
  for (const m of text.matchAll(RE)) {
    const nr = Number(m[1]);
    const zitat = m[2].trim();

    // Die gemeinte Datei: letzter .mjs-Name im GANZEN Text davor. Gemessen
    // 02.08.2026: mit einem Fenster von 300 Zeichen fiel der Verweis in
    // run-dna-scaffold-check.mjs durch — der Dateiname stand im Kopf, sechs
    // Zeilen und rund 400 Zeichen weiter oben. Ein Fenster, das den halben
    // Bestand als "nicht pruefbar" abtut, ist keine Wache.
    const davor = text.slice(0, m.index);
    const namen = [...davor.matchAll(DATEI_RE)].map((x) => x[1]);
    const ziel = namen.length ? path.basename(namen[namen.length - 1]) : null;
    let wege = ziel ? alleWege.get(ziel) : null;

    // Zwei Dateien koennen gleich heissen: dna-scaffold.mjs liegt in
    // design/scripts UND in eigene/web/scripts/web-clone. Gemessen 02.08.2026:
    // die erste Fassung gab bei Gleichstand auf und zaehlte den Verweis als
    // "nicht pruefbar" — dabei ist die gemeinte Datei die im SELBEN Skill.
    // Ein Waechter, der bei jeder Doppelung schweigt, prueft am Ende nichts.
    if (wege && wege.length > 1) {
      const skill = quelle.includes(`${path.sep}design${path.sep}`) ? `${path.sep}design${path.sep}` : `${path.sep}web${path.sep}`;
      const nah = wege.filter((w) => w.includes(skill));
      if (nah.length === 1) wege = nah;
    }

    if (!wege || wege.length !== 1) {
      // Kein eindeutiges Ziel — das ist kein Befund gegen den Verweis, nur
      // eine Grenze dieser Wache. Sie sagt es, statt still zu ueberspringen.
      ohneZitat += 1;
      continue;
    }

    const zielText = fs.readFileSync(wege[0], 'utf8').split('\n');
    const istDa = (zielText[nr - 1] || '').includes(zitat);
    if (istDa) {
      zeile(true, `${path.basename(quelle)} -> ${ziel}:${nr}`);
      continue;
    }

    // Nicht da? Dann die richtige Nummer nennen. Ein Befund ohne die Antwort
    // waere eine Aufgabe fuer den Leser statt einer Hilfe.
    const echt = zielText.findIndex((z) => z.includes(zitat)) + 1;
    zeile(false, `${path.basename(quelle)} -> ${ziel}:${nr}`,
      echt > 0
        ? `steht in Zeile ${echt}, nicht ${nr} — ${echt - nr > 0 ? '+' : ''}${echt - nr} Zeilen gewandert`
        : `"${zitat.slice(0, 40)}" steht nirgends in ${ziel} — umbenannt oder geloescht?`);
  }
}

// Ein Lauf ohne einen einzigen pruefbaren Verweis sieht sauber aus und ist
// leer. Untergrenze unter dem Ist-Stand (2 am 02.08.2026).
if (gezaehlt === 0) {
  console.error('Kein einziger pruefbarer Zeilenverweis gefunden.');
  console.error('Das Muster "Zeile <n>: <zitat>" greift nicht mehr — ohne es');
  console.error('prueft diese Eval nichts und meldet trotzdem gruen.');
  process.exit(2);
}

if (ohneZitat) {
  console.log(`\n  [i]    ${ohneZitat} Verweis(e) ohne eindeutige Zieldatei — von Hand pruefen.`);
}

console.log(`\n${gezaehlt - fehler}/${gezaehlt} Zeilenverweise treffen.`);
if (fehler) {
  console.log('Ein Verweis schickt den Leser auf fremden Code, der plausibel aussieht.');
  process.exit(1);
}
console.log('Jede genannte Zeilennummer zeigt auf das, was der Kommentar behauptet.');
