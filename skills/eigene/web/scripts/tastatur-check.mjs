#!/usr/bin/env node
/*
  tastatur-check.mjs — laesst sich das Widget ohne Maus bedienen?

  WARUM ES DIESEN PRUEFER GIBT (Befund 29.07.2026)
  axe prueft, ob die ARIA-Rollen stimmen. Es prueft NICHT, ob das Ding, das
  sich `role="listbox"` nennt, auf Pfeiltasten reagiert. Diese Luecke ist keine
  Theorie: in der eigenen Komponentenbibliothek gemessen —

    expandable-tabs.tsx     role=tablist     —  0 Pfeiltasten
    radio.tsx               role=radiogroup  —  0 Pfeiltasten
    select-morph.tsx        role=listbox     —  0 Pfeiltasten
    select.tsx              role=listbox     —  0 Pfeiltasten  (411 Zeilen, volle aria-*)
    table/table-menu.tsx    role=menu        —  0 Pfeiltasten
    tabs.tsx                role=tablist     —  0 Pfeiltasten
    wallet-card/account-switcher.tsx  role=listbox  —  0 Pfeiltasten
    wheel-picker.tsx        role=listbox     —  WARN

  Sieben von zehn zusammengesetzten Widgets, gemessen ueber 113 Dateien
  (`node scripts/tastatur-check.mjs references/ui-components --json`).
  Erst geschaetzt, dann gemessen: die erste Fassung dieses Kommentars sprach
  von "fuenf von sieben" — die Zahl stammte aus dem Kopf, nicht aus dem Lauf.

  Alle sieben haben saubere Rollen, alle sind bei axe gruen, keines ist mit der
  Tastatur benutzbar. Die Rolle ist ein
  VERSPRECHEN an Screenreader-Nutzer: "hier kommt eine Listbox, die kennst du."
  Wer das Versprechen gibt und die Tastatur nicht liefert, hat es schlimmer
  gemacht als mit einem simplen <select> — der Nutzer weiss jetzt, was es sein
  sollte, und kommt trotzdem nicht durch.

  WAS ER PRUEFT — nur zusammengesetzte Widgets, nur das WAI-ARIA-Minimum:
    listbox / combobox   Pfeil hoch+runter           BLOCK
    menu / menubar       Pfeil hoch+runter           BLOCK
    tablist              Pfeil links+rechts          BLOCK
    grid / tree          alle vier Pfeile            BLOCK
    dazu jeweils         Escape zum Schliessen       WARN (nur bei Overlays)

  WAS ER NICHT PRUEFT
    Ob die Reihenfolge stimmt, ob der Fokus sichtbar ist (das kann axe/craft),
    ob Home/End belegt sind (empfohlen, nicht Pflicht). Und er kann nicht
    wissen, ob die Tastenlogik RICHTIG ist — nur, ob sie ueberhaupt da ist.
    Ein Fund ist ein Blocker, ein Nicht-Fund ist kein Freispruch.

  Liest QUELLTEXT: die Tastaturlogik steht in Event-Handlern, nicht im DOM.

    node tastatur-check.mjs <projektordner> [--json]

  Exit 0 = keine Blocker. Exit 1 = Blocker. Exit 2 = Aufruf kaputt.
*/
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);

// Ein unbekanntes Flag ist ein Aufruffehler und muss SO heissen. Bis zum
// 31.07.2026 druckte dieses Skript darauf nur seine Aufrufzeile — die Meldung
// las sich wie "Argument fehlt", und wer sich vertippt hat, sucht am falschen
// Ende. Exit 2 war schon richtig, der Text nicht.
const FLAG_ERLAUBT = ['json', 'help'];
{
  const fremd = args.filter((a) => a.startsWith('--') && !FLAG_ERLAUBT.includes(a.slice(2)));
  if (fremd.length) {
    console.error(`Unbekanntes Flag: ${fremd.join(', ')}`);
    console.error(`Erlaubt: ${FLAG_ERLAUBT.map((k) => `--${k}`).join(' ')}`);
    process.exit(2);
  }
}
const alsJson = args.includes('--json');
const wurzel = args.find((a) => !a.startsWith('--'));

// --help ist kein Fehlerfall. Beide Faelle drucken dieselbe Zeile, aber sie
// bedeuten Verschiedenes: wer --help tippt, hat bekommen was er wollte
// (Exit 0, Hilfe auf stdout); wer den Ordner vergisst, hat einen Fehler
// (Exit 2, Meldung auf stderr). Bis zum 31.07.2026 endeten beide mit Exit 2 —
// in einer Kette liest das jedes Skript als "Pruefer kaputt".
const hilfe = 'Aufruf: node tastatur-check.mjs <projektordner> [--json]';
if (args.includes('--help')) {
  console.log(hilfe);
  process.exit(0);
}
if (!wurzel) {
  console.error(hilfe);
  process.exit(2);
}
if (!fs.existsSync(wurzel) || !fs.statSync(wurzel).isDirectory()) {
  console.error(`Kein Ordner: ${wurzel}`);
  process.exit(2);
}

const UEBERSPRINGEN = new Set([
  'node_modules', '.git', 'dist', 'build', 'out', '.next', '.astro',
  '.output', '.svelte-kit', '.nuxt', 'coverage', '.cache', '.vercel', '.turbo',
]);
const ENDUNGEN = new Set(['.tsx', '.jsx', '.ts', '.js', '.vue', '.svelte', '.astro', '.html']);

function dateien(unter) {
  const raus = [];
  for (const e of fs.readdirSync(unter, { withFileTypes: true })) {
    if (e.name.startsWith('.')) continue;
    if (UEBERSPRINGEN.has(e.name)) continue;
    const p = path.join(unter, e.name);
    if (e.isDirectory()) raus.push(...dateien(p));
    else if (ENDUNGEN.has(path.extname(e.name))) raus.push(p);
  }
  return raus;
}

// Rolle -> welche Tasten das WAI-ARIA-Pattern mindestens verlangt.
// Bewusst knapp: nur was ohne Ausnahme gilt. Wo eine Rolle mehrere Bauformen
// erlaubt (menubar horizontal vs. vertikal), zaehlt EINE Achse als erfuellt.
const MUSTER = {
  listbox:  { tasten: [/ArrowDown/, /ArrowUp/], wie: 'Pfeil hoch/runter', achse: 'beide' },
  combobox: { tasten: [/ArrowDown/, /ArrowUp/], wie: 'Pfeil hoch/runter', achse: 'beide' },
  menu:     { tasten: [/ArrowDown/, /ArrowUp/], wie: 'Pfeil hoch/runter', achse: 'beide' },
  menubar:  { tasten: [/ArrowLeft/, /ArrowRight/, /ArrowDown/, /ArrowUp/], wie: 'Pfeiltasten', achse: 'eine' },
  tablist:  { tasten: [/ArrowLeft/, /ArrowRight/, /ArrowDown/, /ArrowUp/], wie: 'Pfeil links/rechts', achse: 'eine' },
  grid:     { tasten: [/ArrowDown/, /ArrowUp/, /ArrowLeft/, /ArrowRight/], wie: 'alle vier Pfeile', achse: 'beide' },
  tree:     { tasten: [/ArrowDown/, /ArrowUp/], wie: 'Pfeil hoch/runter', achse: 'beide' },
  radiogroup: { tasten: [/ArrowDown/, /ArrowUp/, /ArrowLeft/, /ArrowRight/], wie: 'Pfeiltasten', achse: 'eine' },
};

// Rollen, die als Overlay ueber der Seite liegen: dort ist Escape Pflicht-nah.
const OVERLAY = new Set(['listbox', 'combobox', 'menu', 'dialog']);

const alleDateien = dateien(wurzel);
const befunde = [];
// Dateien, die nicht geoeffnet werden konnten. Sie zaehlen in der Kopfzeile
// mit, sind aber ungeprueft — ohne diese Liste bliebe das still.
const nichtLesbar = [];
let widgets = 0;

for (const f of alleDateien) {
  let text;
  // Ein Lesefehler wurde still verschluckt: der tote Symlink zaehlte in der
  // Kopfzeile mit ("4 Dateien"), wurde aber nie geoeffnet. Gemessen
  // 01.08.2026. Nicht nur Symlinks — auch fehlende Rechte, defekte Sektoren,
  // Dateien die waehrend des Laufs verschwinden.
  try { text = fs.readFileSync(f, 'utf8'); } catch (e) {
    nichtLesbar.push(`${path.relative(wurzel, f)} (${e.code || 'Lesefehler'})`);
    continue;
  }
  const rel = path.relative(wurzel, f) || path.basename(f);

  // Rollen dieser Datei sammeln. `role="listbox"` und role={'listbox'} beide.
  const rollen = new Set();
  const roleRe = /role\s*=\s*["'{]\s*["']?([a-z]+)["']?/g;
  let m;
  while ((m = roleRe.exec(text)) !== null) {
    if (MUSTER[m[1]]) rollen.add(m[1]);
  }
  if (!rollen.size) continue;

  // Die Tastenlogik muss nicht in derselben Datei stehen — ein ausgelagerter
  // Hook ist genauso richtig. Aber "irgendwo im selben Ordner" ist zu weit:
  //
  // Erster Versuch am 29.07.2026 zaehlte den ganzen Ordner. In dieser
  // Bibliothek liegen 60 Komponenten flach nebeneinander, und `command-palette
  // .tsx` belegt Pfeiltasten — damit galt die Bedingung fuer ALLE 60 als
  // erfuellt. Der Pruefer meldete "jedes Widget hat Tastaturbedienung", obwohl
  // sieben von zehn keine haben. Ein Nachbar ist kein Beleg.
  //
  // Also: die Datei selbst, plus die Dateien, die sie tatsaechlich IMPORTIERT.
  // Das deckt den ausgelagerten Hook ab und sonst nichts.
  const importiert = new Set();
  const impRe = /from\s+["'](\.[^"']+)["']/g;
  let im;
  while ((im = impRe.exec(text)) !== null) {
    const ziel = path.resolve(path.dirname(f), im[1]);
    for (const kand of [ziel, `${ziel}.ts`, `${ziel}.tsx`, `${ziel}.js`, `${ziel}.jsx`,
      path.join(ziel, 'index.ts'), path.join(ziel, 'index.tsx')]) {
      if (alleDateien.includes(kand)) { importiert.add(kand); break; }
    }
  }
  const umfeld = [text, ...[...importiert].map((x) => {
    try { return fs.readFileSync(x, 'utf8'); } catch { return ''; }
  })].join('\n');

  for (const rolle of rollen) {
    widgets++;
    const { tasten, wie, achse } = MUSTER[rolle];
    const treffer = tasten.filter((t) => t.test(umfeld));
    const erfuellt = achse === 'beide'
      ? treffer.length >= 2
      : treffer.length >= 1;

    if (!erfuellt) {
      befunde.push({
        id: 'K1', stufe: 'BLOCK', datei: rel, rolle,
        was: `role="${rolle}" ohne Tastaturbedienung`,
        fix: `${wie} belegen (WAI-ARIA-Pattern fuer ${rolle}) — oder das Primitive aus dem Tresor nehmen`,
      });
      continue;
    }
    // K4: Tastenlogik ohne Anschluss. Befund 31.07.2026 — in tabs.tsx das
    // `onKeyDown={aufTaste}` vom <div role="tablist"> entfernt, und der
    // Pruefer blieb gruen. Er sucht die Tastennamen im Umfeld; die stehen
    // aber weiter in der Handler-Funktion, die jetzt niemand mehr aufruft.
    // Eine Funktion, die ArrowLeft behandelt und nirgends haengt, ist
    // dasselbe wie keine.
    //
    // Gesucht wird die VERDRAHTUNG: ein Tasten-Prop am Element, ein
    // addEventListener, oder ein Hook, der beides fuer einen erledigt.
    // Bewusst BLOCK wie K1 — anders als bei K3 ist das hier zaehlbar, nicht
    // geschaetzt: entweder es steht eine Anmeldung im Umfeld oder nicht.
    const verdrahtet = /onKeyDown|onKeyUp|onKeyPress|addEventListener\(\s*['"]key(down|up|press)['"]|useKeyboard|useHotkeys|useRovingTabIndex|useTypeahead/
      .test(umfeld);
    if (!verdrahtet) {
      befunde.push({
        id: 'K4', stufe: 'BLOCK', datei: rel, rolle,
        was: `role="${rolle}" nennt Tasten, meldet sie aber nirgends an`,
        fix: 'onKeyDown am Element (oder addEventListener/Hook) — sonst laeuft die Tastenlogik nie',
      });
      continue;
    }

    // "listbox" heisst nicht automatisch Overlay. Ein eingebetteter Rad-Picker
    // (wheel-picker.tsx) ist dauerhaft sichtbarer Teil des Formulars — dort gibt
    // es nichts zu schliessen, und Escape zu fordern war ein Fehlalarm meines
    // eigenen Pruefers (29.07.2026). Nur wo die Rolle wirklich ueber der Seite
    // schwebt, ist Escape die Erwartung: erkennbar an einem Portal, an
    // position:fixed oder an einem open/close-Zustand.
    // K3: Tastenlogik, die nie laeuft. Befund 29.07.2026 — der Pruefer sucht
    // Pfeiltasten-Handler und war damit zufrieden. Ein onKeyDown auf einem
    // <div role="listbox"> OHNE tabIndex und ohne fokussierbares Kind feuert
    // aber nie: das Element bekommt keinen Fokus. Ein Handler, der richtig
    // aussieht und nie ausloest, ist schlimmer als keiner — er besteht jede
    // Pruefung, auch die von K1 direkt darueber.
    //
    // Bewusst WARN, nicht BLOCK: ob ein Element Fokus bekommt, laesst sich am
    // Quelltext nur SCHAETZEN. ref.focus(), autoFocus, ein fokussierbares Kind
    // aus einer anderen Datei, ein Framework-Primitive — alles Wege, die dieses
    // Skript nicht sieht. Bei einer Schaetzung ist Rot zu viel; Rot gehoert nur
    // dorthin, wo die Antwort zaehlbar ist.
    const fokusTraeger = /tabIndex|<button|<input|<select\b|<textarea|<a\s|href=|\.focus\(\)|autoFocus/
      .test(umfeld);
    if (!fokusTraeger) {
      befunde.push({
        id: 'K3', stufe: 'WARN', datei: rel, rolle,
        was: `role="${rolle}" hat Tastenlogik, aber nichts, was Fokus bekommen kann`,
        fix: 'tabIndex am Container ODER fokussierbare Kinder (Roving Tabindex) — sonst feuert der Handler nie',
      });
    }

    const schwebt = /createPortal|position:\s*fixed|\bfixed\s+inset|\[open,\s*setOpen\]|setOpen\(/.test(umfeld);
    if (OVERLAY.has(rolle) && schwebt && !/Escape|['"]Esc['"]/.test(umfeld)) {
      befunde.push({
        id: 'K2', stufe: 'WARN', datei: rel, rolle,
        was: `role="${rolle}" schliesst nicht mit Escape`,
        fix: 'Escape-Handler ergaenzen — bei Overlays erwartet das jeder Nutzer',
      });
    }
  }
}

const block = befunde.filter((b) => b.stufe === 'BLOCK').length;
const warn = befunde.filter((b) => b.stufe === 'WARN').length;

// Wie ueberall im Tor: ein Lauf ueber null Dateien ist kein sauberes Ergebnis.
if (alleDateien.length === 0) {
  const meldung = `tastatur-check hat 0 Dateien gelesen — zeigt der Pfad auf den richtigen Ordner? (${wurzel})`;
  if (alsJson) console.log(JSON.stringify({ wurzel, dateienGelesen: 0, block: null, warn: null, fehler: meldung }, null, 2));
  else console.error(meldung);
  process.exit(1);
}

// Nicht lesbare Dateien VOR jedem Urteil: "keine zusammengesetzten Widgets"
// gilt nur fuer die Dateien, die wirklich gelesen wurden. Der Pruefer hat zwei
// Ausgabewege (JSON und Text) mit je eigenem exit — die Wache muss vor beiden
// stehen, nicht in einem davon (erster Versuch landete im JSON-Zweig).
if (nichtLesbar.length) {
  console.error(`\n${nichtLesbar.length} Datei(en) konnten nicht gelesen werden:`);
  for (const d of nichtLesbar.slice(0, 5)) console.error(`  ${d}`);
  if (nichtLesbar.length > 5) console.error(`  ... und ${nichtLesbar.length - 5} weitere`);
  console.error('Ueber sie sagt dieser Lauf nichts.');
  process.exit(2);
}

if (alsJson) {
  console.log(JSON.stringify({
    wurzel, dateienGelesen: alleDateien.length, widgets, block, warn, befunde,
  }, null, 2));
  process.exit(block > 0 ? 1 : 0);
}

console.log(`\ntastatur-check — ${alleDateien.length} Dateien, ${widgets} zusammengesetzte Widget(s)\n`);
if (!befunde.length) {
  console.log(widgets === 0
    ? 'Keine zusammengesetzten Widgets gefunden — nichts zu pruefen.\n'
    : 'Jedes Widget mit ARIA-Rolle hat auch die passende Tastaturbedienung.\n');
  process.exit(0);
}
for (const b of befunde) {
  console.log(`[${b.stufe}] ${b.id}  ${b.datei}  ${b.was}`);
  console.log(`        -> ${b.fix}\n`);
}
console.log(`${block} Blocker, ${warn} Warnung(en).\n`);
process.exit(block > 0 ? 1 : 0);
