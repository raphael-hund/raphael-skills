#!/usr/bin/env node
/**
 * run-tastatur-check.mjs — findet der Pruefer unbedienbare Widgets, ohne
 * korrekt gebaute rot zu faerben?
 *
 * Befund 29.07.2026: axe prueft, ob die ARIA-Rollen stimmen — nicht, ob das
 * Ding, das sich `role="listbox"` nennt, auf Pfeiltasten reagiert. In der
 * eigenen Komponentenbibliothek gemessen: 7 von 10 zusammengesetzten Widgets
 * haben saubere Rollen und keine Tastaturbedienung. select.tsx sind 411 Zeilen
 * mit role=listbox/option und aria-* — und null Pfeiltasten.
 *
 * Die Rolle ist ein VERSPRECHEN an Screenreader-Nutzer: "hier kommt eine
 * Listbox, die kennst du." Wer das Versprechen gibt und die Tastatur nicht
 * liefert, hat es schlimmer gemacht als mit einem simplen <select>.
 *
 * Diese Eval baut winzige Projekte mit genau einem Zustand. Der teuerste Fall
 * steht bei "muessen durchgehen": der ausgelagerte Hook.
 *
 *   Die erste Fassung des Pruefers zaehlte den ganzen ORDNER als Beleg. In
 *   dieser Bibliothek liegen 60 Komponenten flach nebeneinander, und eine
 *   davon belegt Pfeiltasten — damit galt die Bedingung fuer alle 60 als
 *   erfuellt. Der Pruefer meldete "alles gut" ueber sieben kaputte Widgets.
 *   Jetzt zaehlt die Datei plus das, was sie wirklich IMPORTIERT.
 *
 *   node evals/run-tastatur-check.mjs
 *
 * Exit 0 = jeder Fall wie erwartet. Exit 1 = mindestens einer daneben.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const PRUEFER = path.join(HIER, '..', 'scripts', 'tastatur-check.mjs');
if (!fs.existsSync(PRUEFER)) {
  console.error(`FEHLER: tastatur-check.mjs nicht gefunden: ${PRUEFER}`);
  process.exit(1);
}

const FAELLE = [
  // --- muessen reissen ---
  {
    name: 'listbox ohne Pfeiltasten (der Hauptfall)',
    reisst: true,
    dateien: { 'a.tsx': 'export const S = () => <ul role="listbox"><li role="option">A</li></ul>;' },
  },
  {
    name: 'tablist ohne Pfeiltasten',
    reisst: true,
    dateien: { 'a.tsx': 'export const T = () => <div role="tablist"><button role="tab">Eins</button></div>;' },
  },
  {
    name: 'menu ohne Pfeiltasten',
    reisst: true,
    dateien: { 'a.tsx': 'export const M = () => <div role="menu"><div role="menuitem">X</div></div>;' },
  },
  {
    // Der Fall, der die Ordner-Lockerung entlarvt hat: ein korrekt gebauter
    // Nachbar darf einen kaputten nicht freisprechen.
    name: 'kaputtes Widget neben einem korrekten im selben Ordner',
    reisst: true,
    dateien: {
      'gut.tsx': 'export const G = () => <ul role="listbox" onKeyDown={(e)=>{if(e.key==="ArrowDown"){}if(e.key==="ArrowUp"){}}} />;',
      'kaputt.tsx': 'export const K = () => <ul role="listbox" />;',
    },
  },
  {
    name: 'Ordner ohne passende Datei — leerer Lauf ist kein sauberes Ergebnis',
    reisst: true,
    dateien: { 'liesmich.md': 'kein Code' },
  },

  // --- muessen durchgehen ---
  {
    name: 'listbox mit Pfeil hoch und runter',
    reisst: false,
    dateien: {
      'a.tsx': 'export const S = () => <ul role="listbox" onKeyDown={(e)=>{'
        + 'if(e.key==="ArrowDown"){} if(e.key==="ArrowUp"){} if(e.key==="Escape"){}}} />;',
    },
  },
  {
    // Der teuerste Fall: die Tastenlogik steht in einem eigenen Hook. Das ist
    // saubere Trennung, kein Fehler — der Pruefer muss dem Import folgen.
    name: 'Tastenlogik in importiertem Hook ausgelagert',
    reisst: false,
    dateien: {
      'use-keys.ts': 'export const useKeys = () => (e: KeyboardEvent) => {'
        + ' if (e.key === "ArrowDown") {} if (e.key === "ArrowUp") {} if (e.key === "Escape") {} };',
      'a.tsx': 'import { useKeys } from "./use-keys";\n'
        + 'export const S = () => <ul role="listbox" onKeyDown={useKeys()} />;',
    },
  },
  {
    name: 'tablist mit Pfeil links/rechts',
    reisst: false,
    dateien: {
      'a.tsx': 'export const T = () => <div role="tablist" onKeyDown={(e)=>{'
        + 'if(e.key==="ArrowLeft"){} if(e.key==="ArrowRight"){}}} />;',
    },
  },
  {
    // Ein einfacher Knopf ist kein zusammengesetztes Widget. Wer hier etwas
    // meldet, meldet ueberall etwas — und wird abgeschaltet.
    name: 'einfache Elemente ohne Widget-Rolle bleiben unbehelligt',
    reisst: false,
    dateien: {
      'a.tsx': 'export const B = () => (<div>'
        + '<button aria-label="Senden">OK</button>'
        + '<div role="alert">Hinweis</div>'
        + '<img alt="x" src="y.png" /></div>);',
    },
  },
  {
    name: 'gar keine Widgets im Projekt — kein Befund, kein Fehlalarm',
    reisst: false,
    dateien: { 'a.tsx': 'export const P = () => <p>Nur Text.</p>;' },
  },
];

function lauf(dateien) {
  const ordner = fs.mkdtempSync(path.join(os.tmpdir(), 'tastatur-eval-'));
  try {
    for (const [name, inhalt] of Object.entries(dateien)) {
      const p = path.join(ordner, name);
      fs.mkdirSync(path.dirname(p), { recursive: true });
      fs.writeFileSync(p, inhalt);
    }
    let roh = '', code = 0;
    try {
      roh = execFileSync('node', [PRUEFER, ordner, '--json'], { encoding: 'utf8' });
    } catch (e) {
      roh = String(e.stdout || ''); code = e.status ?? 1;
    }
    let json = null;
    try { json = JSON.parse(roh); } catch { /* leerer Lauf schreibt auf stderr */ }
    return { code, json };
  } finally {
    fs.rmSync(ordner, { recursive: true, force: true });
  }
}

let fehler = 0;
const zeile = (ok, text, detail) => {
  if (!ok) fehler++;
  console.log(`  [${ok ? 'OK' : '!!'}]   ${text}`);
  if (detail) console.log(`         ${detail}`);
};

console.log('\nTastatur-Check — haelt die ARIA-Rolle ihr Versprechen?\n');
console.log('Diese muessen reissen:\n');
for (const f of FAELLE.filter((x) => x.reisst)) {
  const { code, json } = lauf(f.dateien);
  const passt = code === 1;
  zeile(passt, f.name, passt ? null : `Exit ${code}, Blocker ${json?.block ?? '?'}`);
}

console.log('\nDiese muessen durchgehen — sonst ist der Waechter nur Laerm:\n');
for (const f of FAELLE.filter((x) => !x.reisst)) {
  const { code, json } = lauf(f.dateien);
  const passt = code === 0 && (json?.block ?? 1) === 0;
  zeile(passt, f.name,
    passt ? null : `Exit ${code}, Blocker ${json?.block ?? '?'}: ${(json?.befunde || []).map((b) => b.was).join('; ')}`);
}

// --- Verdrahtung im Tor ---------------------------------------------------
console.log('\nVerdrahtung im G1-Tor:\n');
{
  const gate = fs.readFileSync(path.join(HIER, '..', 'scripts', 'g1-gate.mjs'), 'utf8');
  const proben = [
    ['checkTastatur() wird aufgerufen', /^checkTastatur\(\);$/m.test(gate)],
    ['tastatur zaehlt als Qualitaets-Pruefer', /QUALITAET = \[[^\]]*'tastatur'/.test(gate)],
    ['ein Lauf ueber 0 Dateien besteht nicht',
      /checkTastatur[\s\S]{0,1200}?dateienGelesen === 0/.test(gate)
      || /checkTastatur[\s\S]{0,1200}?parsed\.fehler/.test(gate)],
    ['bekommt einen Ordner uebergeben, keine URL',
      /tastatur-check[\s\S]{0,900}?run\('node', \[runner, (?:SRC|LESEORDNER|BUILD)/.test(gate)],
  ];
  for (const [text, ok] of proben) zeile(ok, text);
}

const gesamt = FAELLE.length + 4;
console.log(`\n${gesamt - fehler}/${gesamt} wie erwartet.`);
if (fehler) {
  console.log('Der Tastatur-Pruefer urteilt falsch — nicht ins Tor haengen.');
  process.exit(1);
}
console.log('Rollen ohne Tastatur werden gefunden, ausgelagerte Hooks bleiben gruen.');
