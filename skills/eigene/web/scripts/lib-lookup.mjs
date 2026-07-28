#!/usr/bin/env node
// lib-lookup — echte API einer Library aus dem lokalen Tresor lesen, statt sie zu raten.
//
//   node lib-lookup.mjs                 # alle Libraries mit Version + Rolle
//   node lib-lookup.mjs sonner          # Exporte + Doku-Pfade einer Library
//   node lib-lookup.mjs sonner --api    # zusaetzlich die rohen Typ-Zeilen
//   node lib-lookup.mjs --task toasts   # welche Library fuer welche Aufgabe
//
// Tresor: /root/tools/uikit-vault (nur lesen, kein App-Build).

import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const VAULT = process.env.UIKIT_VAULT || '/root/tools/uikit-vault';
const NM = join(VAULT, 'node_modules');

// Rolle = wofuer diese Library da ist. Quelle: references/bibliotheks-tresor.md.
// Genau eine Library pro Aufgabe — die Tabelle ist die Entscheidung, nicht eine Auswahl.
const ROLLEN = {
  '@base-ui/react': ['ui-primitives', 'Unstyled A11y-Primitives: Dialog, Popover, Menu, Select'],
  '@radix-ui/themes': ['ui-theme-engine', 'Volle Radix-Theme-Engine — nur ohne eigenes Brand-Design'],
  'cmdk': ['command-menu', 'Command-Palette (⌘K)'],
  'sonner': ['toasts', 'Toasts / Benachrichtigungen'],
  'input-otp': ['otp-input', 'Einmalcode-/OTP-Eingabefelder'],
  'leva': ['control-panel', 'Regler-Panel fuer Prototypen und Demos'],
  'vaul': ['drawer', 'Drawer / Bottom-Sheet mit Drag'],
  'motion': ['motion', 'Springs, Layout- und Exit-Animationen in React'],
  'gsap': ['motion-timeline', 'Scroll-getriebene Sequenzen, Timelines, SVG, framework-agnostisch'],
  '@number-flow/react': ['zahlen-animation', 'Zahlen animieren (Zaehler, Preise, Kennzahlen)'],
  'cobe': ['globe', '3D-Globus'],
  'satori': ['og-images', 'OG-Bilder aus HTML/CSS'],
  'shiki': ['syntax-highlight', 'Syntax-Hervorhebung'],
  'liveline': ['charts-realtime', 'Echtzeit-/Streaming-Diagramme'],
  'recharts': ['charts', 'Normale Diagramme, statisch oder interaktiv'],
  '@dnd-kit/core': ['drag-drop', 'Drag and Drop'],
  '@dnd-kit/sortable': ['drag-drop-sortable', 'Sortierbare Listen per Drag'],
  'react-virtuoso': ['virtualisierung', 'Lange Listen und grosse Tabellen'],
  '@tanstack/react-table': ['tabellen-logik', 'Tabellen-Logik (Sortierung, Filter) ohne Optik'],
  'embla-carousel-react': ['carousel', 'Karussell / Slider'],
  'react-hook-form': ['formulare', 'Formular-Zustand und Validierung'],
  'zod': ['schema', 'Schema-Validierung, typsicher'],
  'zustand': ['state', 'Geteilter Zustand ohne Prop-Ketten'],
  'clsx': ['classnames', 'Bedingte className-Strings'],
  'tailwind-merge': ['classnames-merge', 'Widerspruechliche Tailwind-Klassen aufloesen'],
  'class-variance-authority': ['varianten', 'Typisierte Varianten-API (size, intent, state)'],
  'next-themes': ['theme-switch', 'Hell/Dunkel ohne Flackern beim Laden'],
  'lucide-react': ['icons', 'Icon-Set'],
  'date-fns': ['datum', 'Datums-Rechnung und -Formatierung'],
  '@appica/ui-react': ['ui-komplett', 'Fertige gestylte Komponenten — zweite Quelle neben shadcn'],
};

function pkgPath(name) {
  return join(NM, name);
}

function version(name) {
  try {
    return JSON.parse(readFileSync(join(pkgPath(name), 'package.json'), 'utf8')).version;
  } catch {
    return null;
  }
}

const TYPE_KANDIDATEN = [
  'dist/index.d.ts', 'index.d.ts', 'dist/index.d.mts',
  'types/index.d.ts', 'dist/types/index.d.ts', 'lib/index.d.ts',
];

function typesFile(name) {
  const base = pkgPath(name);
  let entry = null;
  try {
    const pj = JSON.parse(readFileSync(join(base, 'package.json'), 'utf8'));
    entry = pj.types || pj.typings || null;
  } catch { /* package.json unlesbar → Kandidatenliste reicht */ }
  const kandidaten = entry ? [entry, ...TYPE_KANDIDATEN] : TYPE_KANDIDATEN;
  for (const k of kandidaten) {
    const p = join(base, k.replace(/^\.\//, ''));
    if (existsSync(p)) return p;
  }
  return null;
}

function docs(name) {
  const base = pkgPath(name);
  const gefunden = [];
  for (const f of ['README.md', 'readme.md', 'docs']) {
    const p = join(base, f);
    if (existsSync(p)) gefunden.push(p);
  }
  return gefunden;
}

// Exportierte Namen aus einer .d.ts ziehen. Bewusst grob: es geht darum,
// die echten Namen zu sehen, nicht den Typ vollstaendig zu parsen.
function exporte(dts) {
  const text = readFileSync(dts, 'utf8');
  const namen = new Set();

  for (const m of text.matchAll(/^export\s*\{([^}]+)\}/gm)) {
    for (const teil of m[1].split(',')) {
      const n = teil.trim().split(/\s+as\s+/).pop().trim();
      if (n && n !== 'type') namen.add(n.replace(/^type\s+/, ''));
    }
  }
  for (const m of text.matchAll(/^export\s+(?:declare\s+)?(?:const|function|class|type|interface)\s+([A-Za-z0-9_$]+)/gm)) {
    namen.add(m[1]);
  }
  // Viele Pakete deklarieren erst lokal und exportieren am Ende gesammelt.
  // Ohne diesen Zweig sieht man bei sonner/cmdk gar nichts.
  const lokal = new Set();
  for (const m of text.matchAll(/^declare\s+(?:const|function|class)\s+([A-Za-z0-9_$]+)/gm)) {
    lokal.add(m[1]);
  }
  return { exportiert: [...namen].sort(), deklariert: [...lokal].sort() };
}

function alleLibs() {
  try {
    return Object.keys(JSON.parse(readFileSync(join(VAULT, 'package.json'), 'utf8')).dependencies || {});
  } catch {
    return [];
  }
}

function liste() {
  const libs = alleLibs();
  if (!libs.length) {
    console.error(`Kein Tresor unter ${VAULT} gefunden.`);
    process.exit(2);
  }
  const zeilen = libs.map((n) => {
    const v = version(n);
    const [rolle, zweck] = ROLLEN[n] || ['-', ''];
    return { n, v, rolle, zweck };
  });
  const w = Math.max(...zeilen.map((z) => z.n.length));
  const wr = Math.max(...zeilen.map((z) => z.rolle.length));
  console.log(`Tresor: ${VAULT}  (${zeilen.length} Libraries)\n`);
  for (const z of zeilen.sort((a, b) => a.rolle.localeCompare(b.rolle))) {
    const v = z.v ? z.v.padEnd(9) : 'FEHLT'.padEnd(9);
    console.log(`${z.rolle.padEnd(wr)}  ${z.n.padEnd(w)}  ${v}  ${z.zweck}`);
  }
  const fehlend = zeilen.filter((z) => !z.v);
  if (fehlend.length) {
    console.log(`\nNicht installiert: ${fehlend.map((z) => z.n).join(', ')}`);
    console.log(`Beheben mit: cd ${VAULT} && npm install`);
    process.exit(1);
  }
}

function detail(name, mitApi) {
  const treffer = alleLibs().filter((n) => n === name || n.endsWith('/' + name) || n.includes(name));
  if (!treffer.length) {
    console.error(`"${name}" ist nicht im Tresor. Verfuegbar: node lib-lookup.mjs`);
    process.exit(1);
  }
  for (const n of treffer) {
    const v = version(n);
    if (!v) {
      console.log(`${n} — im Tresor gelistet, aber NICHT installiert (npm install im Tresor faellig)`);
      continue;
    }
    const [rolle, zweck] = ROLLEN[n] || ['-', ''];
    console.log(`\n${n}@${v}`);
    console.log(`Rolle:  ${rolle}${zweck ? ' — ' + zweck : ''}`);
    for (const d of docs(n)) console.log(`Doku:   ${d}`);
    const dts = typesFile(n);
    if (!dts) {
      console.log('Typen:  keine .d.ts gefunden');
      continue;
    }
    console.log(`Typen:  ${dts}`);
    const { exportiert, deklariert } = exporte(dts);
    if (exportiert.length) console.log(`Export: ${exportiert.join(', ')}`);
    if (deklariert.length) console.log(`Intern: ${deklariert.join(', ')}`);
    if (mitApi) {
      console.log('\n--- Typ-Zeilen ---');
      const text = readFileSync(dts, 'utf8').split('\n');
      for (const z of text) {
        if (/^(export|declare)\s/.test(z)) console.log(z.slice(0, 200));
      }
    }
  }
}

function nachAufgabe(begriff) {
  const b = begriff.toLowerCase();
  const treffer = Object.entries(ROLLEN).filter(
    ([n, [rolle, zweck]]) =>
      rolle.includes(b) || zweck.toLowerCase().includes(b) || n.toLowerCase().includes(b)
  );
  if (!treffer.length) {
    console.log(`Keine Library im Tresor fuer "${begriff}".`);
    console.log('Das heisst: bewusst entscheiden und begruenden — nicht irgendetwas installieren.');
    process.exit(1);
  }
  for (const [n, [rolle, zweck]] of treffer) {
    const v = version(n);
    console.log(`${rolle.padEnd(22)} ${n}@${v || 'FEHLT'} — ${zweck}`);
  }
}

const args = process.argv.slice(2);
if (!args.length) liste();
else if (args[0] === '--task') nachAufgabe(args[1] || '');
else detail(args[0], args.includes('--api'));
