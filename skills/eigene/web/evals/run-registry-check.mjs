#!/usr/bin/env node
/**
 * run-registry-check.mjs — prüft, ob die Registry-Zahlen in der Doku noch stimmen.
 *
 * `references/shadcn-arbeitsweise.md` trifft harte Aussagen über den lokalen
 * Registry-Index: wie viele Komponenten es gibt, welche Unterbau-Varianten sie
 * haben, welche Namen nur in Appica bzw. nur in shadcn vorkommen. Solche Zahlen
 * sind beim Schreiben wahr und danach still veraltet — der nächste `npm update`
 * im Tresor verschiebt sie, ohne dass jemand die Doku anfasst.
 *
 * Befund 29.07.2026: „87 Seiten unter appica/docs/" — tatsächlich 84. Und die
 * Liste der Appica-Only-Komponenten nannte 10 von 22; wer sich darauf verliess,
 * hielt `date-picker`, `autocomplete` oder `toolbar` für nicht vorhanden und
 * baute sie nach. Eine unvollständige Liste ist schlimmer als keine, weil sie
 * wie eine vollständige aussieht.
 *
 * Geprüft wird gegen die echten Dateien, nicht gegen eine zweite Kopie der
 * Zahlen — sonst würde der Prüfstand nur sich selbst bestätigen.
 *
 *   node evals/run-registry-check.mjs
 *
 * Exit 0 = Doku und Registry stimmen überein.
 * Exit 1 = mindestens eine Aussage in der Doku ist falsch geworden.
 * Exit 2 = Registry fehlt — dann ist nichts prüfbar.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const DOKU = path.join(HIER, '..', 'references', 'shadcn-arbeitsweise.md');
const VAULT = process.env.UIKIT_VAULT || '/root/tools/uikit-vault';
const REG = path.join(VAULT, 'registry');

const shadcnDatei = path.join(REG, 'shadcn-index.json');
const appicaDatei = path.join(REG, 'appica', 'components.json');
for (const f of [shadcnDatei, appicaDatei, DOKU]) {
  if (!fs.existsSync(f)) {
    console.error(`Fehlt: ${f}`);
    process.exit(2);
  }
}

const namen = (datei) => {
  const roh = JSON.parse(fs.readFileSync(datei, 'utf8'));
  const liste = Array.isArray(roh) ? roh : roh.components;
  if (!Array.isArray(liste)) throw new Error(`${datei}: keine Komponentenliste gefunden`);
  return liste.map((e) => (typeof e === 'string' ? e : e.name)).sort();
};

const shadcn = namen(shadcnDatei);
const appica = namen(appicaDatei);
const nurAppica = appica.filter((n) => !shadcn.includes(n));
const nurShadcn = shadcn.filter((n) => !appica.includes(n));

const varianten = (e) => Object.keys(e.meta?.links || {}).sort().join('+');
const shadcnRoh = JSON.parse(fs.readFileSync(shadcnDatei, 'utf8'));
const zaehle = (form) => shadcnRoh.filter((e) => varianten(e) === form).length;

const docsOrdner = path.join(REG, 'appica', 'docs');
const docsSeiten = fs.existsSync(docsOrdner)
  ? fs.readdirSync(docsOrdner, { recursive: true }).filter((f) => String(f).endsWith('.md')).length
  : 0;

const text = fs.readFileSync(DOKU, 'utf8');

// Eine Zahl in der Doku gilt als belegt, wenn sie im Text steht. Grob mit
// Absicht: es geht darum, dass eine veraltete Zahl auffaellt — nicht darum,
// den Satzbau zu bewerten.
const FAELLE = [
  { was: `${shadcn.length} shadcn-Komponenten im Index`, treffer: () => text.includes(`${shadcn.length} Komponenten`) || text.includes(`Von ${shadcn.length} Komponenten`) },
  { was: `${zaehle('aria+base+radix')} mit allen drei Varianten`, treffer: () => text.includes(`${zaehle('aria+base+radix')} alle drei`) },
  { was: `${zaehle('aria')} nur aria`, treffer: () => text.includes(`${zaehle('aria')} nur \`aria\``) },
  { was: `${zaehle('base+radix')} nur base+radix`, treffer: () => text.includes(`${zaehle('base+radix')} nur`) },
  { was: `${docsSeiten} Appica-Doku-Seiten`, treffer: () => text.includes(`${docsSeiten} Seiten`) },
  { was: `${appica.length} Appica-Komponenten`, treffer: () => text.includes(`${appica.length} Komponenten`) },
];

let rot = 0;
console.log(`Registry-Pruefstand — Doku gegen ${REG}\n`);

for (const f of FAELLE) {
  const ok = f.treffer();
  console.log(`  ${ok ? '[OK]  ' : '[ROT] '} ${f.was}`);
  if (!ok) {
    rot++;
    console.log('         Diese Zahl steht so nicht in shadcn-arbeitsweise.md — Doku nachziehen.');
  }
}

// Die Namenslisten sind der eigentliche Wert: eine unvollstaendige Liste sieht
// aus wie eine vollstaendige. Jeder Name muss in der Doku vorkommen.
console.log('\nJeder Einzelstueck-Name muss in der Doku stehen:\n');
for (const [titel, liste] of [['nur Appica', nurAppica], ['nur shadcn', nurShadcn]]) {
  const fehlend = liste.filter((n) => !text.includes(`\`${n}\``));
  if (fehlend.length) {
    rot++;
    console.log(`  [ROT]  ${titel}: ${liste.length} Namen, ${fehlend.length} fehlen in der Doku`);
    console.log(`         ${fehlend.join(', ')}`);
    console.log('         Wer die Liste liest, haelt diese Komponenten fuer nicht vorhanden und baut sie nach.');
  } else {
    console.log(`  [OK]   ${titel}: alle ${liste.length} Namen genannt`);
  }
}

// Gegenprobe: die Doku darf keine Namen nennen, die es nicht mehr gibt. Sonst
// sucht jemand nach einer Komponente, die aus der Registry verschwunden ist.
const alle = new Set([...shadcn, ...appica]);
const behauptet = [...text.matchAll(/^`([a-z][a-z0-9-]+)`(?=[,.]| \(|$)/gm)].map((m) => m[1]);
const erfunden = [...new Set(behauptet)].filter((n) => !alle.has(n));
if (erfunden.length) {
  rot++;
  console.log(`\n  [ROT]  Doku nennt ${erfunden.length} Komponente(n), die in keiner Registry stehen:`);
  console.log(`         ${erfunden.join(', ')}`);
} else {
  console.log('\n  [OK]   kein Name in der Doku, den die Registry nicht kennt');
}

const gesamt = FAELLE.length + 3;
console.log(`\n${gesamt - rot}/${gesamt} wie erwartet.`);
if (rot) {
  console.log('Die Doku beschreibt eine Registry, die es so nicht mehr gibt. Erst nachziehen.');
  process.exit(1);
}
console.log('Zahlen und Namenslisten decken sich mit dem lokalen Registry-Index.');
