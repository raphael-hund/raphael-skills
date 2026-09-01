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
const ROLLEN = new Set(["plan", "kritik", "bau"]);
const USAGE =
  "usage: node session-gate.mjs --rolle plan|kritik|bau --client <pfad>";

function usage() {
  console.error(USAGE);
  process.exit(64);
}

function sperre(message) {
  console.error(message);
  process.exit(2);
}

function parseArgs(argv) {
  let rolle = null;
  let client = null;
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--rolle" || arg === "--client") {
      const value = argv[i + 1];
      if (!value || value.startsWith("-")) usage();
      if (arg === "--rolle") {
        if (rolle !== null) usage();
        rolle = value;
      } else {
        if (client !== null) usage();
        client = value;
      }
      i++;
      continue;
    }
    usage();
  }
  if (!rolle || !client) usage();
  if (!ROLLEN.has(rolle)) usage();
  return { rolle, client: path.resolve(client) };
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

function kritikDateien(client) {
  let eintraege;
  try {
    if (!fs.statSync(client).isDirectory()) return [];
    eintraege = fs.readdirSync(client);
  } catch {
    return [];
  }
  return eintraege
    .filter((name) => /^KRITIK-.*\.md$/.test(name))
    .filter((name) => istEchteDatei(path.join(client, name)));
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
  const ziel = pruefgegenPfad(client);
  let st = null;
  try {
    st = fs.lstatSync(ziel);
  } catch {
    st = null;
  }
  if (st && st.isSymbolicLink()) {
    sperre(
      `PRUEFGEGEN.md ist ein Symlink und wird nicht beschrieben: ${ziel}`,
    );
  }
  // Wiederholter Plan-Lauf: die Datei existiert schon. Dann ist die Frage
  // nicht mehr "gibt es sie", sondern "steht etwas drin" — sonst merkt die
  // Plan-Session erst eine Session später, dass sie nur die Vorlage hinterließ.
  if (st) {
    const roh = fs.readFileSync(ziel, "utf8");
    if (AUSFUELL_MARKER.test(roh) || eigeneTabellenzeilen(roh).length < 2) {
      console.warn(
        `Hinweis: ${ziel} ist noch die unbearbeitete Vorlage. ` +
          "Die Kritik-Session startet damit nicht — jetzt eintragen, wogegen geprüft wird.",
      );
    }
    process.exit(0);
  }
  if (!fs.existsSync(client)) {
    fs.mkdirSync(client, { recursive: true });
  } else if (!fs.statSync(client).isDirectory()) {
    sperre(`--client ist kein Verzeichnis: ${client}`);
  }
  if (!fs.existsSync(TEMPLATE)) {
    sperre(`PRUEFGEGEN-template.md fehlt: ${TEMPLATE}`);
  }
  fs.copyFileSync(TEMPLATE, ziel);
  console.log(`PRUEFGEGEN.md angelegt: ${ziel}`);
  process.exit(0);
}

function kritik(client) {
  const ziel = pruefgegenPfad(client);
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
  if (eigene.length < 2) {
    sperre(
      `PRUEFGEGEN.md enthält nur ${eigene.length} eigene Tabellenzeile(n). ` +
        "Mindestens zwei ausgefüllte Prüfzeilen sind Pflicht, sonst prüft die Kritik gegen nichts.",
    );
  }
  process.exit(0);
}

// Ein Platzhalter-Byte ist kein Kritik-Ergebnis. Verlangt wird eine Datei, in
// der wirklich ein Befund steht: genug Text und mindestens eine Aufzählungs-,
// Tabellen- oder Überschriftenzeile.
const MIN_KRITIK_ZEICHEN = 200;

function hatBefundStruktur(roh) {
  return roh
    .split("\n")
    .some((z) => /^\s*(?:[-*+]\s+\S|\d+\.\s+\S|\||#{1,6}\s+\S)/.test(z));
}

function bau(client) {
  const dateien = kritikDateien(client);
  if (dateien.length < 1) {
    sperre(
      "Bau ohne Kritik-Befunde ist gesperrt — mindestens eine nicht-leere KRITIK-*.md nötig.",
    );
  }
  const brauchbar = dateien.filter((name) => {
    const roh = fs.readFileSync(path.join(client, name), "utf8");
    return roh.trim().length >= MIN_KRITIK_ZEICHEN && hatBefundStruktur(roh);
  });
  if (brauchbar.length < 1) {
    sperre(
      `KRITIK-Datei(en) vorhanden, aber ohne erkennbare Befunde: ${dateien.join(", ")}. ` +
        `Verlangt sind mindestens ${MIN_KRITIK_ZEICHEN} Zeichen und eine Befundliste ` +
        "(Aufzählung, Tabelle oder Überschriften) — ein Platzhalter öffnet den Bau nicht.",
    );
  }
  process.exit(0);
}

if (fileURLToPath(import.meta.url) === path.resolve(process.argv[1] || "")) {
  const { rolle, client } = parseArgs(process.argv.slice(2));
  const aufgeloest = echterClient(client);
  if (rolle === "plan") plan(aufgeloest);
  else if (rolle === "kritik") kritik(aufgeloest);
  else bau(aufgeloest);
}
