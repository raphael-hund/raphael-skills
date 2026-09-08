#!/usr/bin/env node
// session-gate.mjs — hartes Gate zwischen Plan-, Kritik- und Bau-Session.
//
// Usage:
//   node session-gate.mjs --rolle kritik --client <pfad>
//   node session-gate.mjs --rolle bau --client <pfad>
//   node session-gate.mjs --rolle plan --client <pfad>
//
// Exit 0 = frei, Exit 2 = Session gesperrt, Exit 64 = Usage.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATE = path.join(
  HERE,
  "..",
  "references",
  "templates",
  "PRUEFGEGEN-template.md",
);
const ROLLEN = new Set(["plan", "kritik", "fold-duell", "bau"]);
const USAGE =
  "usage: node session-gate.mjs --rolle plan|kritik|fold-duell|bau --client DIR [--auftrag neu|aenderung|kritik --input DATEI] [--kritik-abgeschlossen] [--require-fold-choice]";

function usage() {
  console.error(USAGE);
  process.exit(64);
}

function sperre(message) {
  console.error(message);
  process.exit(2);
}

function parseArgs(argv) {
  const flags = {};
  for (let i = 0; i < argv.length; i++) {
    const key = argv[i].replace(/^--/, "");
    if (["kritik-abgeschlossen", "require-fold-choice"].includes(key)) {
      if (flags[key]) usage();
      flags[key] = true;
    } else if (["rolle", "client", "auftrag", "input"].includes(key)) {
      if (flags[key] || !argv[i + 1] || argv[i + 1].startsWith("--")) usage();
      flags[key] = argv[++i];
    } else usage();
  }
  if (!ROLLEN.has(flags.rolle) || !flags.client) usage();
  if (flags.auftrag && !["neu", "aenderung", "kritik"].includes(flags.auftrag)) usage();
  return { ...flags, client: path.resolve(flags.client), input: flags.input ? path.resolve(flags.input) : null };
}

// Symlinks im Client-Pfad werden aufgelöst, damit ein untergeschobener Link die
// Ablage nicht aus dem Client-Verzeichnis herausträgt.
function echterClient(client) {
  try {
    return fs.realpathSync(client);
  } catch {
    return client;
  }
}

function pruefgegenPfad(client) {
  return path.join(client, "PRUEFGEGEN.md");
}

// Nur echte, nicht-leere Dateien zählen. Ein Verzeichnis oder toter Symlink mit
// passendem Namen ist kein Arbeitsergebnis.
function istEchteDatei(pfad) {
  let st;
  try {
    st = fs.lstatSync(pfad);
  } catch {
    return false;
  }
  if (st.isSymbolicLink()) return false;
  if (!st.isFile()) return false;
  return st.size > 0;
}

// Das Template markiert jede noch nicht bearbeitete Stelle. Solange die Marker
// stehen oder keine eigene Tabellenzeile dazugekommen ist, ist die Datei eine
// unveränderte Kopie und öffnet das Gate nicht.
const AUSFUELL_MARKER = /<!--\s*AUSFUELLEN\s*-->/i;

function templateZeilen() {
  try {
    return new Set(
      fs
        .readFileSync(TEMPLATE, "utf8")
        .split("\n")
        .map((z) => z.trim())
        .filter(Boolean),
    );
  } catch {
    return new Set();
  }
}

function eigeneTabellenzeilen(roh) {
  const ausTemplate = templateZeilen();
  return roh
    .split("\n")
    .map((z) => z.trim())
    .filter((z) => z.startsWith("|") && z.endsWith("|"))
    .filter((z) => !/^\|[\s|:-]*\|$/.test(z)) // Trennzeile der Tabelle
    .filter((z) => !ausTemplate.has(z));
}

function plan(client) {
  if (fs.existsSync(client) && !fs.statSync(client).isDirectory()) sperre(`--client ist kein Verzeichnis: ${client}`);
  fs.mkdirSync(client, { recursive: true });
  console.log("Plan-Eingang frei; nur auftragsbezogene Artefakte anlegen.");
}

function kritik(client, flags) {
  const ziel = flags.input || pruefgegenPfad(client);
  if (flags.input) {
    if (!istEchteDatei(ziel)) sperre(`Prüfauftrag fehlt oder ist leer: ${ziel}`);
    console.log(`Kritik-Eingang frei: ${ziel}`);
    return;
  }
  if (!istEchteDatei(ziel)) {
    sperre("Kritik ohne PRUEFGEGEN.md ist gesperrt — Plan-Session zuerst.");
  }
  const roh = fs.readFileSync(ziel, "utf8");
  if (AUSFUELL_MARKER.test(roh)) {
    sperre(
      "PRUEFGEGEN.md ist noch die Vorlage: AUSFUELLEN-Marker stehen darin. " +
        "Erst eintragen, wogegen geprüft wird (Linse, Quelle, Datei, Shot, Prüffrage).",
    );
  }
  const eigene = eigeneTabellenzeilen(roh);
  if (eigene.length < 1) {
    sperre(
      `PRUEFGEGEN.md enthält nur ${eigene.length} eigene Tabellenzeile(n). ` +
        "Mindestens eine ausgefüllte Prüfzeile ist Pflicht, sonst prüft die Kritik gegen nichts.",
    );
  }
  process.exit(0);
}

function foldDuellGewaehlt(client) {
  // Neuaufbau/Redesign: Raphaels Wahl steht als GO-Zeile mit «Fold-Duell» in DECISIONS.md
  // (im Handoff-Ordner oder eine Ebene darueber).
  for (const kandidat of [path.join(client, "DECISIONS.md"), path.join(client, "..", "DECISIONS.md")]) {
    if (!istEchteDatei(kandidat)) continue;
    const roh = fs.readFileSync(kandidat, "utf8");
    // Festes Format statt Textheuristik (Skill web, DECISIONS.md): Listen- oder Tabellenzeile,
    // Praefix aus Datum und Autor, dann GO als ERSTES Wort des Entscheidungsfelds, dann «Fold-Duell».
    //   - 2026-09-04 · Raphael · GO: Fold-Duell Richtung b
    //   | 2026-09-04 | Raphael | GO | Fold-Duell Richtung b |
    // Alles vor GO im Entscheidungsfeld («noch nicht GO», «NO GO», «kein GO») oeffnet nicht.
    const gewaehlt = roh.split("\n").some((z) => {
      const t = z.trim();
      if (!/^(?:[-*+]\s|\|)/.test(t)) return false;
      const felder = t.replace(/^(?:[-*+]\s+|\|\s*)/, "").replace(/\|\s*$/, "").split(/\s*[·|]\s*/);
      const idx = felder.findIndex((f) => /^GO\b/.test(f.trim()));
      if (idx < 0 || idx > 2) return false; // GO ist Feld 1 (ohne Praefix), 2 oder 3 (nach Datum, Autor)
      const rest = felder.slice(idx).join(" ");
      return /^GO\s*:?\s*Fold-Duell/i.test(rest.trim()) || /^GO\s*:?\s*$/.test(felder[idx].trim()) && /Fold-Duell/i.test(felder.slice(idx + 1).join(" "));
    });
    if (gewaehlt) return kandidat;
  }
  return null;
}

const FOLD_RICHTUNGEN_MIN = 3;

function foldDuellZeilen(client) {
  // Abschnitt «## Fold-Duell» in PLAN.md; zaehlt Tabellen-/Listenzeilen mit mindestens drei Feldern (slug | Achse | Referenzbilder | Copy-Quelle).
  const plan = path.join(client, "PLAN.md");
  if (!istEchteDatei(plan)) return -1;
  const roh = fs.readFileSync(plan, "utf8");
  // Abschnitt endet an der naechsten Ueberschrift oder am Dateiende (JS kennt kein \Z).
  const m = roh.match(/^##+\s+Fold-Duell[^\n]*\n([\s\S]*?)(?=^##+\s|$(?![\s\S]))/m);
  if (!m) return -1;
  return m[1].split("\n").filter((z) => {
    const t = z.trim();
    if (!/^\|/.test(t) && !/^[-*+]\s/.test(t)) return false;
    if (/^\|?\s*-{3,}/.test(t) || /slug\s*\|\s*Achse/i.test(t)) return false; // Trennzeile, Kopfzeile
    return t.split("|").filter((f) => f.trim()).length >= 3;
  }).length;
}

function foldDuell(client) {
  const n = foldDuellZeilen(client);
  if (n < FOLD_RICHTUNGEN_MIN) {
    sperre(
      `Fold-Duell gesperrt — PLAN.md braucht einen Abschnitt «## Fold-Duell» mit mindestens ${FOLD_RICHTUNGEN_MIN} Richtungszeilen slug | Achse | Referenzbilder | Copy-Quelle (gefunden: ${n < 0 ? "kein Abschnitt" : n}). Siehe references/fold-duell.md.`,
    );
  }
  process.exit(0);
}

function bau(client, flags) {
  if (!flags.auftrag || !flags.input) {
    sperre("Bau braucht einen expliziten Eingang: --auftrag neu|aenderung|kritik --input DATEI. Dateinamen oder Markdown-Überschriften sind kein Abschlussstatus.");
  }
  if (!istEchteDatei(flags.input)) sperre(`Bau-Eingang fehlt oder ist leer: ${flags.input}`);
  if (flags.auftrag === "kritik" && !flags["kritik-abgeschlossen"]) {
    sperre("Kritik-Eingang ist nicht als abgeschlossen bestätigt: --kritik-abgeschlossen erst nach der tatsächlichen Prüfung setzen. Null Befunde sind zulässig.");
  }
  if (flags["require-fold-choice"] && !foldDuellGewaehlt(client)) {
    sperre("Die ausdrücklich verlangte Fold-Auswahl fehlt in DECISIONS.md.");
  }
  console.log(`Bau-Eingang frei: ${flags.auftrag} aus ${flags.input}`);
}

if (fileURLToPath(import.meta.url) === path.resolve(process.argv[1] || "")) {
  const flags = parseArgs(process.argv.slice(2));
  const { rolle, client } = flags;
  const aufgeloest = echterClient(client);
  if (rolle === "plan") plan(aufgeloest);
  else if (rolle === "kritik") kritik(aufgeloest, flags);
  else if (rolle === "fold-duell") foldDuell(aufgeloest);
  else bau(aufgeloest, flags);
}
