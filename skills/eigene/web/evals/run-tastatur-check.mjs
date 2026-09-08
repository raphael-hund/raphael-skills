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
import { execFileSync, spawnSync } from 'node:child_process';
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
    erwartet: 'K1',
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
    // Befund 29.07.2026: der Pruefer sucht nach Pfeiltasten-Handlern und war
    // damit zufrieden. Ein Handler auf einem <div> OHNE tabIndex und ohne
    // fokussierbares Kind feuert aber nie — das Element kann keinen Fokus
    // bekommen. Tastenlogik, die richtig aussieht und nie laeuft, ist
    // schlimmer als gar keine: sie besteht jede Pruefung.
    name: 'Pfeiltasten-Handler auf einem Element, das nie Fokus bekommt',
    reisst: false, warntNur: 'K3',
    dateien: {
      'a.tsx': `export function S() {
  const onKey = (e) => { if (e.key === "ArrowDown") n(); if (e.key === "ArrowUp") p(); };
  return <div role="listbox" onKeyDown={onKey}><div role="option">A</div></div>;
}`,
    },
  },
  {
    // Befund 31.07.2026, gefunden beim Gegentest der neuen Flaechenprobe: in
    // tabs.tsx das `onKeyDown={aufTaste}` vom tablist entfernt — und der
    // Pruefer blieb gruen. Er sucht die Tastennamen im Umfeld, und die stehen
    // weiter in der Handler-Funktion, die jetzt niemand mehr aufruft.
    //
    // Das ist die haeufigste Art, wie Tastaturbedienung beim Umbauen
    // verlorengeht: nicht der Handler wird geloescht, sondern seine Anmeldung.
    name: 'Handler existiert, ist aber nirgends angemeldet',
    reisst: true,
    dateien: {
      'a.tsx': `export function T() {
  const aufTaste = (e) => { if (e.key === "ArrowLeft") p(); if (e.key === "ArrowRight") n(); };
  return <div role="tablist"><button role="tab" tabIndex={0}>A</button></div>;
}`,
    },
  },
  {
    // Gegenprobe zum Fall darueber: derselbe Code MIT Anmeldung muss gruen
    // bleiben. Ohne diese Haelfte waere K4 auch dadurch "bestanden", dass er
    // auf jedes Widget anschlaegt.
    name: 'derselbe Handler, korrekt angemeldet',
    reisst: false,
    dateien: {
      'a.tsx': `export function T() {
  const aufTaste = (e) => { if (e.key === "ArrowLeft") p(); if (e.key === "ArrowRight") n(); };
  return <div role="tablist" onKeyDown={aufTaste}><button role="tab" tabIndex={0}>A</button></div>;
}`,
    },
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
      'a.tsx': 'export const S = () => <ul role="listbox" tabIndex={0} onKeyDown={(e)=>{'
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
        + 'export const S = () => <ul role="listbox" tabIndex={0} onKeyDown={useKeys()} />;',
    },
  },
  {
    name: 'tablist mit Pfeil links/rechts',
    reisst: false,
    dateien: {
      'a.tsx': 'export const T = () => <div role="tablist" onKeyDown={(e)=>{'
        + 'if(e.key==="ArrowLeft"){} if(e.key==="ArrowRight"){}}}>'
        + '<button role="tab" tabIndex={0}>A</button></div>;',
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
  {
    // Eigener Fehlalarm vom 29.07.2026: wheel-picker.tsx ist ein EINGEBETTETER
    // Rad-Picker, dauerhaft sichtbarer Teil des Formulars. Dort gibt es nichts
    // zu schliessen — Escape zu fordern war Laerm. "listbox" heisst nicht
    // automatisch Overlay.
    name: 'eingebettete listbox braucht kein Escape (kein Overlay)',
    reisst: false, keineWarnung: true,
    dateien: {
      'a.tsx': 'export const R = () => (<div className="relative">'
        + '<ul role="listbox" tabIndex={0} onKeyDown={(e)=>{if(e.key==="ArrowDown"){} if(e.key==="ArrowUp"){}}}>'
        + '<li role="option">A</li></ul></div>);',
    },
  },
];

// Gegenprobe zum Fokus-Blocker: derselbe Handler auf einem Element, das sehr
// wohl Fokus bekommt, ist korrekt und darf NICHT reissen. Ohne diesen Fall waere
// der neue Blocker auch dadurch erfuellbar, dass er alles rot meldet.
const FOKUS_OK = [
  {
    name: 'Pfeiltasten-Handler auf einem Element mit tabIndex',
    dateien: {
      'a.tsx': `export function S() {
  const onKey = (e) => { if (e.key === "ArrowDown") n(); if (e.key === "ArrowUp") p(); };
  return <div role="listbox" tabIndex={0} onKeyDown={onKey}><div role="option">A</div></div>;
}`,
    },
  },
  {
    name: 'Handler am Container, Fokus auf den Kind-Buttons (Roving Tabindex)',
    dateien: {
      'a.tsx': `export function T() {
  const onKey = (e) => { if (e.key === "ArrowLeft") p(); if (e.key === "ArrowRight") n(); };
  return <div role="tablist" onKeyDown={onKey}><button role="tab" tabIndex={0}>A</button></div>;
}`,
    },
  },
];

// Die Gegenrichtung zum Fall oben: eine listbox, die WIRKLICH ueber der Seite
// schwebt (Portal/open-Zustand), muss die Escape-Warnung bekommen. Ohne diesen
// Fall waere die Overlay-Heuristik auch dadurch erfuellbar, dass sie nie warnt.
const WARNT = [
  {
    name: 'schwebende listbox ohne Escape bekommt die Warnung',
    dateien: {
      'a.tsx': 'import { createPortal } from "react-dom";\n'
        + 'export const S = () => { const [open, setOpen] = useState(false);\n'
        + '  return open ? createPortal(<ul role="listbox" tabIndex={0} onKeyDown={(e)=>{'
        + 'if(e.key==="ArrowDown"){} if(e.key==="ArrowUp"){}}} />, document.body) : null; };',
    },
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
let geprueft = 0;   // von zeile() hochgezaehlt
const zeile = (ok, text, detail) => {
  geprueft++;
  if (!ok) fehler++;
  console.log(`  [${ok ? 'OK' : '!!'}]   ${text}`);
  if (detail) console.log(`         ${detail}`);
};

console.log('\nTastatur-Check — haelt die ARIA-Rolle ihr Versprechen?\n');
console.log('Diese muessen reissen:\n');
for (const f of FAELLE.filter((x) => x.reisst)) {
  const { code, json } = lauf(f.dateien);
  // Exit 1 allein genuegt nicht — die Eval muss wissen, WELCHE Regel gefeuert
  // hat.
  //
  // Gemessen am 31.07.2026 ueber den Sabotage-Lauf: mit abgeschaltetem
  // K1-Blocker-Zweig (`if (!erfuellt)` -> `if (false)`) meldete der Pruefer
  // weiter Exit 1 — aber aus K4 statt K1. Die Eval blieb bei 21/21 und Exit 0,
  // obwohl die Hauptregel tot war. Ein Pruefer, der aus dem falschen Grund rot
  // wird, ist von einem wachsamen nicht zu unterscheiden, solange man nur den
  // Exit-Code liest.
  //
  // `erwartet` ist optional: nur der Hauptfall nennt seine Regel. Ein Feld fuer
  // jeden Fall zu verlangen hiesse, 21 IDs zu pflegen, von denen die meisten
  // nichts belegen.
  const ids = (json?.befunde || []).filter((b) => b.stufe === 'BLOCK').map((b) => b.id);
  const grundOk = !f.erwartet || ids.includes(f.erwartet);
  const passt = code === 1 && grundOk;
  zeile(passt, f.name,
    passt ? null
      : code !== 1 ? `Exit ${code}, Blocker ${json?.block ?? '?'}`
        : `reisst, aber an ${ids.join(',') || 'keiner Regel'} statt ${f.erwartet}`);
}

console.log('\nDiese muessen durchgehen — sonst ist der Waechter nur Laerm:\n');
for (const f of FAELLE.filter((x) => !x.reisst)) {
  const { code, json } = lauf(f.dateien);
  const passt = code === 0 && (json?.block ?? 1) === 0;
  zeile(passt, f.name,
    passt ? null : `Exit ${code}, Blocker ${json?.block ?? '?'}: ${(json?.befunde || []).map((b) => b.was).join('; ')}`);
}

// --- Escape nur bei echten Overlays --------------------------------------
console.log('\nEscape-Warnung trifft nur schwebende Widgets:\n');
for (const f of FAELLE.filter((x) => x.keineWarnung)) {
  const { json } = lauf(f.dateien);
  const warns = (json?.befunde || []).filter((b) => b.stufe === 'WARN');
  zeile(warns.length === 0, f.name,
    warns.length ? `Fehlalarm: ${warns.map((b) => b.was).join('; ')}` : null);
}
for (const f of WARNT) {
  const { json } = lauf(f.dateien);
  const warns = (json?.befunde || []).filter((b) => b.id === 'K2');
  zeile(warns.length === 1, f.name,
    warns.length === 1 ? null : `erwartet 1 K2-Warnung, bekam ${warns.length}`);
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

// Die Summe zaehlt sich selbst.
//
// Sie stand hier als Handzahl. Bei run-bilder-check war so eine Formel
// nachweislich falsch: gemeldet wurden 9/9, waehrend zwoelf Faelle liefen — drei
// geprueft Faelle blieben unerwaehnt. Der Fehler macht nichts kaputt, er
// VERSCHWEIGT eigene Arbeit, und er wird bei jedem Zusatz neu falsch, weil die
// Zahl an einer Stelle steht, die niemand anfasst, wenn er einen Fall ergaenzt.
//
// Geprueft 30.07.2026: in dieser Datei stimmte sie noch. Umgebaut wird trotzdem
// — die Bauart ist der Fehler, nicht erst sein Eintreten.
// --- Flaechenprobe auf der eigenen Bibliothek -----------------------------
// 113 Dateien, von Hand geschrieben, mit ARIA-Rollen in zehn zusammengesetzten
// Widgets. run-import-check faehrt sie seit Tagen als Stichprobe; dieser
// Pruefer nicht -- dabei ist genau hier sein Befund entstanden (7 von 10
// Widgets ohne Tastaturbedienung, alle grun bei axe).
//
// Ein Pruefer, der nur gegen gebaute Fixtures laeuft, sagt nichts darueber,
// ob er auf echtem Code Fehlalarm schlaegt. Und ein Rueckfall in der
// Bibliothek faellt sonst erst auf, wenn jemand die Datei kopiert.
{
  const bib = path.join(HIER, '..', 'references', 'ui-components');
  if (!fs.existsSync(bib)) {
    zeile(false, 'references/ui-components fehlt — Flaechenprobe nicht gelaufen');
  } else {
    let aus = '';
    let code = 0;
    try {
      aus = execFileSync('node', [PRUEFER, bib], { encoding: 'utf8', timeout: 600000 });
    } catch (e) {
      aus = `${e.stdout || ''}${e.stderr || ''}`;
      code = e.status ?? 1;
    }
    const widgets = aus.match(/(\d+) zusammengesetzte Widget/);
    const genug = widgets && Number(widgets[1]) >= 5;
    zeile(code === 0 && genug,
      `eigene Bibliothek: Exit ${code}, ${widgets ? widgets[1] : '?'} Widgets geprueft`,
      code !== 0 ? 'ein Widget ist zurueckgefallen — oder der Pruefer schlaegt auf gutem Code an'
        : genug ? null : 'zu wenige Widgets gesehen — zeigt der Pfad noch richtig?');
  }
}

// --- Toter Symlink --------------------------------------------------------
// Ein Lesefehler wurde bis zum 01.08.2026 still verschluckt: die Datei zaehlte
// in der Kopfzeile mit ("N Dateien"), wurde aber nie geoeffnet. Der Pruefer
// hat zwei Ausgabewege (JSON und Text) mit je eigenem exit — die Wache muss
// vor beiden stehen, sonst greift sie nur auf einem.
{
  const ordner = fs.mkdtempSync(path.join(os.tmpdir(), 'tastatur-symlink-'));
  fs.writeFileSync(path.join(ordner, 'echt.tsx'), 'export const A = () => null;\n');
  fs.symlinkSync(path.join(ordner, 'gibtsnicht.tsx'), path.join(ordner, 'tot.tsx'));

  const lauf = (extra = []) => spawnSync('node',
    [path.join(HIER, '..', 'scripts', 'tastatur-check.mjs'), ordner, ...extra],
    { encoding: 'utf8' });

  for (const [was, extra] of [['Text', []], ['JSON', ['--json']]]) {
    const r = lauf(extra);
    const aus = `${r.stdout || ''}${r.stderr || ''}`;
    // Der Grund steht je nach Modus woanders: im Text als Klartext, im JSON
    // als Feld `nichtLesbar`. Beides muss auffindbar sein — ein Automat liest
    // kein stderr, ein Mensch kein JSON-Feld. Bis zum 01.08.2026 lieferte der
    // --json-Modus im Fehlerfall GAR KEIN JSON: die Wache beendete vor der
    // Ausgabe, und der Automat bekam Klartext, wo er ein Objekt erwartete.
    const grundDa = was === 'JSON'
      ? (() => { try { return (JSON.parse(r.stdout || '{}').nichtLesbar || []).length > 0; } catch { return false; } })()
      : /nicht gelesen werden/i.test(aus);
    zeile(r.status === 2 && grundDa,
      `toter Symlink -> Exit 2 mit Grund (${was}-Modus)`,
      r.status === 2
        ? 'Exit 2, aber der Grund fehlt in dieser Ausgabeform'
        : `Exit ${r.status} — die Datei zaehlt mit, geprueft wurde sie nie`);
  }

  fs.rmSync(path.join(ordner, 'tot.tsx'));
  const sauber = lauf();
  zeile(sauber.status !== 2, 'ohne toten Symlink: normales Urteil',
    'Exit 2 auf einem sauberen Ordner — die Wache ist zu scharf');

  fs.rmSync(ordner, { recursive: true, force: true });
}

const gesamt = geprueft;
console.log(`\n${gesamt - fehler}/${gesamt} wie erwartet.`);
if (fehler) {
  console.log('Der Tastatur-Pruefer urteilt falsch — nicht ins Tor haengen.');
  process.exit(1);
}
console.log('Rollen ohne Tastatur werden gefunden, ausgelagerte Hooks bleiben gruen.');
