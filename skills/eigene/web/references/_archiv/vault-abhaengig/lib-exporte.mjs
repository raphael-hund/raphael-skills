// lib-exporte.mjs — die echten Exportnamen einer Tresor-Library auflösen.
//
// Eine Quelle für zwei Werkzeuge. `lib-lookup.mjs` beantwortet "wie heisst die
// API wirklich?", `import-check.mjs` beantwortet "existiert dieser Import?" —
// das ist dieselbe Frage, zweimal gestellt. Bis zum 29.07.2026 hatte jedes der
// beiden seine eigene Antwort, und die von import-check war die schlechtere:
//
//   * `lib-lookup` folgte seit dem 29.07. den Weiterleitungen (`export * from`,
//     `/// <reference>`, `export =`). `import-check` gab bei jedem `export *`
//     auf und meldete die Library als unpruefbar. Sechs der 30 Libraries —
//     darunter `zustand`, `date-fns`, `motion`, `leva` — wurden damit nie
//     geprueft. Ein erfundener `import { dasGibtEsNicht } from 'zustand'` kam
//     still durch, und `import-check` meldete am Ende "Kein erfundener Import".
//   * Subpfade fielen ganz raus: `libFuer` verglich nur auf Gleichheit, also
//     passte `motion/react` auf keine Library. Das ist die einzige Form, die
//     der Skill ueberhaupt lehrt — 75-mal in den References. Der meistgenutzte
//     Importpfad des ganzen Skills war der einzige ungeprüfte.
//
// Weil beide Werkzeuge jetzt hier nachfragen, kann diese Schere nicht wieder
// aufgehen: was `lib-lookup` anzeigt, ist genau das, wogegen `import-check`
// prueft.
//
// Grob mit Absicht: es geht um die Namen, nicht um vollstaendiges Typ-Parsing.

import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

export const VAULT = process.env.UIKIT_VAULT || '/root/tools/uikit-vault';
export const NM = join(VAULT, 'node_modules');

const TYPE_KANDIDATEN = [
  'dist/index.d.ts', 'index.d.ts', 'dist/index.d.mts',
  'types/index.d.ts', 'dist/types/index.d.ts', 'lib/index.d.ts',
];

export function pkgPath(name) {
  return join(NM, name);
}

export function version(name) {
  try {
    return JSON.parse(readFileSync(join(pkgPath(name), 'package.json'), 'utf8')).version;
  } catch {
    return null;
  }
}

// Ein Importpfad wie `motion/react` oder `@dnd-kit/core` in Paket + Unterpfad
// zerlegen. Ohne diese Trennung sieht `libFuer('motion/react')` keine Library,
// obwohl `motion` im Tresor liegt.
export function pfadTeilen(quelle) {
  const teile = quelle.split('/');
  const paket = quelle.startsWith('@') ? teile.slice(0, 2).join('/') : teile[0];
  const rest = quelle.slice(paket.length).replace(/^\//, '');
  return { paket, unterpfad: rest ? `./${rest}` : '.' };
}

// Ein `exports`-Eintrag darf beliebig tief nach Bedingung verschachteln:
//
//   ".": { "import": { "types": "./clsx.d.mts", "default": "./dist/clsx.mjs" },
//          "default": { "types": "./clsx.d.ts",  "default": "./dist/clsx.js"  } }
//
// Wer nur die oberste Ebene nach `types` absucht, findet hier nichts und faellt
// auf `package.json#types` zurueck — bei clsx also auf die CommonJS-Datei mit
// `export = clsx`, waehrend jedes ESM-Projekt die `.d.mts` mit dem benannten
// `export function clsx` benutzt. Das ist kein Randfall: es war der Grund, warum
// `import { clsx } from "clsx"` im eigenen `lib/utils.ts` des Skills als
// erfundener Import gemeldet wurde.
//
// ESM zuerst, weil jedes Projekt in diesem Skill ESM ist.
function bedingungenAufloesen(eintrag, tiefe = 0) {
  if (typeof eintrag === 'string') return [eintrag.replace(/\.(m?)js$/, '.d.$1ts')];
  if (!eintrag || typeof eintrag !== 'object' || tiefe > 3) return [];
  const raus = [];
  for (const k of ['types', 'typings', 'import', 'module', 'default', 'require', 'node']) {
    if (k in eintrag) raus.push(...bedingungenAufloesen(eintrag[k], tiefe + 1));
  }
  return raus;
}

// Die Typdatei zu einem Unterpfad finden. Moderne Pakete beschreiben das in
// ihrer `exports`-Karte (`"./react": { "types": "./dist/react.d.ts" }`) — das
// ist die verlaessliche Quelle, die Kandidatenliste nur der Rueckfall.
export function typesFile(paket, unterpfad = '.') {
  const base = pkgPath(paket);
  const kandidaten = [];
  let pj = null;
  try {
    pj = JSON.parse(readFileSync(join(base, 'package.json'), 'utf8'));
  } catch { /* Kandidatenliste reicht */ }

  if (pj) {
    kandidaten.push(...bedingungenAufloesen(pj.exports?.[unterpfad]));
    if (unterpfad === '.') {
      if (pj.types) kandidaten.push(pj.types);
      if (pj.typings) kandidaten.push(pj.typings);
    }
  }
  // Ohne exports-Karte: `motion/react` liegt oft schlicht als `dist/react.d.ts`.
  if (unterpfad !== '.') {
    const rest = unterpfad.replace(/^\.\//, '');
    kandidaten.push(`${rest}.d.ts`, `dist/${rest}.d.ts`, `${rest}/index.d.ts`, `dist/${rest}/index.d.ts`,
      // ESM-Pakete: dieselben Formen als `.d.mts` (siehe folgeZiel, 29.07.2026).
      `${rest}.d.mts`, `dist/${rest}.d.mts`, `${rest}/index.d.mts`, `dist/${rest}/index.d.mts`);
  } else {
    kandidaten.push(...TYPE_KANDIDATEN);
  }

  for (const k of kandidaten) {
    const p = join(base, k.replace(/^\.\//, ''));
    if (existsSync(p)) return p;
  }
  return null;
}

export function docs(paket) {
  const base = pkgPath(paket);
  const gefunden = [];
  for (const f of ['README.md', 'readme.md', 'docs']) {
    const p = join(base, f);
    if (existsSync(p)) gefunden.push(p);
  }
  return gefunden;
}

// `export * from './woanders'` leitet nur weiter. Wer dieser Zeile nicht folgt,
// findet in der Datei keinen einzigen Namen — und haelt "nicht hingeschaut" für
// "es gibt nichts". Genau die Verwechslung, gegen die der Tresor gebaut ist.
export function folgeZiel(dts, ziel) {
  // `.mjs` gehoert hier genauso weg wie `.js`.
  //
  // Befund 29.07.2026: `@base-ui/react` leitet ausschliesslich per
  // `export * from "./select/index.mjs"` weiter und legt seine Typen als
  // `.d.mts` ab. Der Resolver kannte nur `.js`/`.d.ts`, fand also kein Ziel und
  // meldete die ganze Library als UNPRUEFBAR — 42 Subpfade, kein einziger
  // Exportname. Damit war der Import-Check auf genau der Library blind, die die
  // Komponenten-Doku fuer neun Widgets empfiehlt (Tastatur-Befund desselben
  // Tages). Ein Tresor, der bei der wichtigsten Empfehlung "weiss nicht" sagt,
  // laedt zum Raten ein — und Raten von Importnamen ist der Fehler, gegen den
  // er gebaut wurde.
  const roh = ziel.replace(/\.m?js$/, '');
  // Relativ: neben der Typdatei nachsehen.
  if (roh.startsWith('.')) {
    const basis = dirname(dts);
    // `./add.ts` meint in einer .d.ts die Deklaration `add.d.ts`, nicht die
    // Quelldatei. `./animation.d.ts` (GSAP) ist schon fertig und darf nicht zu
    // `animation.d.ts.d.ts` werden.
    const ohneTs = roh.replace(/\.d\.m?ts$|\.m?ts$/, '');
    for (const k of [
      roh,
      `${roh}.d.ts`, `${ohneTs}.d.ts`, `${roh}/index.d.ts`, `${ohneTs}/index.d.ts`,
      // ESM-Pakete legen ihre Typen als `.d.mts` ab (base-ui, zunehmend andere).
      `${roh}.d.mts`, `${ohneTs}.d.mts`, `${roh}/index.d.mts`, `${ohneTs}/index.d.mts`,
    ]) {
      const p = resolve(basis, k);
      if (existsSync(p) && /\.m?ts$/.test(p)) return p;
    }
    return null;
  }
  // Paketname: `motion` leitet an `framer-motion/dom` weiter, `zustand` an
  // `zustand/vanilla`. Liegt das Ziel im Tresor, sind die echten Namen dort zu
  // holen — sonst muesste der Nutzer die Kette von Hand verfolgen, und genau
  // das soll dieses Werkzeug abnehmen.
  const { paket, unterpfad } = pfadTeilen(roh);
  const ueberKarte = typesFile(paket, unterpfad);
  if (ueberKarte) return ueberKarte;
  // Rueckfall fuer Formen ohne exports-Karte: `zustand/vanilla.d.ts`.
  const nm = join(NM, roh);
  for (const k of [`${nm}.d.ts`, join(nm, 'index.d.ts'), join(nm, 'dist', 'index.d.ts'),
    `${nm}.d.mts`, join(nm, 'index.d.mts'), join(nm, 'dist', 'index.d.mts')]) {
    if (existsSync(k)) return k;
  }
  return null;
}

export function exporte(dts, tiefe = 0) {
  const text = readFileSync(dts, 'utf8');
  const namen = new Set();
  const offen = [];
  const raeume = [];

  // Weiterleitungen zuerst: bis zu drei Ebenen tief, damit ein Kreis nicht
  // zur Endlosschleife wird.
  for (const m of text.matchAll(/^export\s+\*\s+from\s+['"]([^'"]+)['"]/gm)) {
    const ziel = folgeZiel(dts, m[1]);
    if (ziel && tiefe < 3) {
      const tiefer = exporte(ziel, tiefe + 1);
      for (const n of tiefer.exportiert) namen.add(n);
      offen.push(...tiefer.offen);
    } else {
      // Fremdpaket oder zu tief: ehrlich benennen statt still weglassen.
      offen.push(m[1]);
    }
  }

  // `export * as Select from "./index.parts.mjs"` ist KEINE Weiterleitung, die
  // man verfolgen muesste — sie erzeugt genau EINEN Namen, `Select`, und das ist
  // der Name, den man importiert (`import { Select } from "@base-ui/react/select"`).
  //
  // Befund 29.07.2026: base-ui benutzt fast nur diese Form. Ohne sie meldete der
  // Tresor fuer `select`, `popover`, `tooltip`, `menu` und die uebrigen 38
  // Subpfade keinen einzigen Namen — also fuer jedes Primitive, das die
  // Komponenten-Doku empfiehlt. Der Stern davor ist irrefuehrend: hier wird
  // nichts ausgebreitet, sondern gebuendelt.
  for (const m of text.matchAll(/^export\s+\*\s+as\s+([A-Za-z0-9_$]+)\s+from\s+['"][^'"]+['"]/gm)) {
    namen.add(m[1]);
  }

  for (const m of text.matchAll(/^export\s*\{([^}]+)\}/gm)) {
    for (const teil of m[1].split(',')) {
      const n = teil.trim().split(/\s+as\s+/).pop().trim();
      if (n && n !== 'type') namen.add(n.replace(/^type\s+/, ''));
    }
  }
  for (const m of text.matchAll(/^export\s+(?:declare\s+)?(?:const|function|class|type|interface)\s+([A-Za-z0-9_$]+)/gm)) {
    namen.add(m[1]);
  }
  // `export = clsx` ist der CommonJS-Stil: ein einziger Default-Export, kein
  // benannter. Wer hier nichts findet, glaubt sonst, die Library habe keine API —
  // dabei ist der Import schlicht `import clsx from 'clsx'`.
  for (const m of text.matchAll(/^export\s*=\s*([A-Za-z0-9_$]+)/gm)) {
    namen.add(`${m[1]} (default, \`import ${m[1]} from …\`)`);
  }
  // GSAP nutzt weder das eine noch das andere, sondern `/// <reference path=…>`
  // ueber ein Dutzend Dateien. Auch das ist eine Weiterleitung.
  for (const m of text.matchAll(/^\/\/\/\s*<reference\s+path=["']([^"']+)["']/gm)) {
    const ziel = folgeZiel(dts, m[1].startsWith('.') ? m[1] : `./${m[1]}`);
    if (ziel && tiefe < 3) {
      const tiefer = exporte(ziel, tiefe + 1);
      for (const n of tiefer.exportiert) namen.add(n);
      raeume.push(...tiefer.raeume);
    } else {
      offen.push(m[1]);
    }
  }

  // `declare namespace gsap.core` — die API haengt am globalen Objekt, nicht an
  // benannten Importen. Bei GSAP steht das nicht in der index.d.ts, sondern in
  // den 32 referenzierten Dateien; ohne Einsammeln bliebe die Library
  // "unpruefbar", obwohl ihre API vollstaendig beschrieben ist.
  for (const m of text.matchAll(/^declare\s+namespace\s+([A-Za-z0-9_$.]+)/gm)) {
    raeume.push(m[1].split('.')[0]);
  }
  // Viele Pakete deklarieren erst lokal und exportieren am Ende gesammelt.
  // Ohne diesen Zweig sieht man bei sonner/cmdk gar nichts.
  const lokal = new Set();
  for (const m of text.matchAll(/^declare\s+(?:const|function|class)\s+([A-Za-z0-9_$]+)/gm)) {
    lokal.add(m[1]);
  }
  return {
    exportiert: [...namen].sort(),
    deklariert: [...lokal].sort(),
    offen: [...new Set(offen)],
    raeume: [...new Set(raeume)],
  };
}

// Die pruefbare Namensmenge eines Importpfads — die Frage, die import-check
// stellt. `null` heisst **unpruefbar** und ist ausdruecklich nicht dasselbe wie
// eine leere Menge: bei `null` darf niemand urteilen, bei einer leeren Menge
// waere jeder Import erfunden.
export function pruefbareNamen(quelle) {
  const { paket, unterpfad } = pfadTeilen(quelle);
  const dts = typesFile(paket, unterpfad);
  if (!dts) return null;
  const { exportiert, offen, raeume } = exporte(dts);
  // Eine offene Weiterleitung heisst: die Menge ist unvollstaendig. Dann lieber
  // gar nicht urteilen, als einen echten Export faelschlich als erfunden melden.
  if (offen.length) return null;
  // Ohne einen einzigen Namen ist nichts zu vergleichen — bei GSAP etwa haengt
  // die API als Namespace am globalen Objekt (`raeume`), nicht an benannten
  // Importen. Auch hier ist Schweigen richtiger als ein Fehlalarm.
  if (!exportiert.length) return null;
  void raeume;
  // Der Default-Eintrag aus `export = clsx` traegt einen Erklaertext im Namen und
  // ist kein benannter Import — er darf keinen Treffer erzeugen.
  const benannt = exportiert.filter((n) => /^[A-Za-z0-9_$]+$/.test(n));
  // Bleibt nach dem Filtern nichts uebrig, besteht die Library nur aus einem
  // Default-Export. Eine leere Menge zurueckzugeben hiesse "jeder benannte
  // Import hier ist erfunden" — das waere ein Urteil aus Unwissen. `null`.
  return benannt.length ? new Set(benannt) : null;
}

// Diese Datei ist ein MODUL, kein Werkzeug: `lib-lookup.mjs` und
// `import-check.mjs` importieren die Funktionen hier. Ein Direktaufruf lief
// bisher still mit Exit 0 durch — kein Fehler, keine Ausgabe, nichts getan.
//
// Das ist dieselbe Verwechslung wie bei detector/cli/main.mjs (30.07.2026):
// "Exit 0, keine Ausgabe" liest sich wie "alles in Ordnung" und heisst
// "nie gelaufen". Bei einer Datei mit "lib" im Namen ist die Gefahr kleiner als
// bei einer namens main.mjs — aber der Unterschied kostet zwei Zeilen.
if (import.meta.url === `file://${process.argv[1]}`) {
  process.stderr.write(
    'lib-exporte.mjs ist ein Modul, kein Werkzeug.\n'
    + 'Gemeint ist vermutlich eines davon:\n'
    + '  node scripts/lib-lookup.mjs <library>          # wie heisst die API wirklich?\n'
    + '  node scripts/import-check.mjs --src <ordner>   # existiert dieser Import?\n');
  process.exit(2);
}
