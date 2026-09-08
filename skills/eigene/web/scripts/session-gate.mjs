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
  "usage: node session-gate.mjs --rolle plan|kritik|fold-duell|bau --client <handoff-ordner>  (z.B. /root/clients/client-<name>/web/handoff oder /root/clients/<kunde>/website/<lauf>/handoff)";

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
    if (arg === "--help" || arg === "-h") {
      console.log(USAGE);
      process.exit(0);
    }
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

// Ein Platzhalter ist kein Kritik-Ergebnis. Gezählt wird, was ein Befund
// ausmacht: benannte Einzelpunkte. Nicht die Dateilänge — drei knappe echte
// Befunde sind ein Arbeitsergebnis, 300 Zeichen Fließtext mit einem
// Spiegelstrich sind keins.
const MIN_BEFUND_ZEILEN = 2;
const MIN_ZEICHEN_JE_BEFUND = 15;

function befundZeilen(roh) {
  return roh
    .split("\n")
    .map((z) => z.trim())
    .filter((z) => /^(?:[-*+]\s+\S|\d+\.\s+\S|\|\s*\S|#{1,6}\s+\S)/.test(z))
    .filter((z) => z.replace(/^(?:[-*+]|\d+\.|#{1,6}|\|)\s*/, "").trim().length >= MIN_ZEICHEN_JE_BEFUND);
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

function planHatFoldDuell(client) {
  return foldDuellZeilen(client) >= 0;
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

function bau(client) {
  const dateien = kritikDateien(client);
  if (planHatFoldDuell(client) && !foldDuellGewaehlt(client)) {
    sperre(
      "Bau gesperrt: PLAN.md enthaelt ein Fold-Duell, aber DECISIONS.md traegt keine GO-Zeile mit «Fold-Duell». Erst Raphaels Wahl eintragen (references/fold-duell.md Regel 8), dann Welle 1.",
    );
  }
  if (dateien.length < 1) {
    if (foldDuellGewaehlt(client)) process.exit(0); // Neuaufbau: Raphaels Fold-Wahl ist die Kritik-Vorphase
    sperre(
      "Bau ohne Kritik-Befunde ist gesperrt — mindestens eine nicht-leere KRITIK-*.md nötig (oder bei Neuaufbau: Fold-Duell-GO in DECISIONS.md).",
    );
  }
  const brauchbar = dateien.filter(
    (name) =>
      befundZeilen(fs.readFileSync(path.join(client, name), "utf8")).length >=
      MIN_BEFUND_ZEILEN,
  );
  if (brauchbar.length < 1) {
    sperre(
      `KRITIK-Datei(en) vorhanden, aber ohne erkennbare Befunde: ${dateien.join(", ")}. ` +
        `Verlangt sind mindestens ${MIN_BEFUND_ZEILEN} benannte Befunde als Aufzählung, ` +
        `Tabellenzeile oder Überschrift (je mindestens ${MIN_ZEICHEN_JE_BEFUND} Zeichen Inhalt) — ` +
        "ein Platzhalter oder reiner Fließtext öffnet den Bau nicht.",
    );
  }
  process.exit(0);
}

if (fileURLToPath(import.meta.url) === path.resolve(process.argv[1] || "")) {
  const { rolle, client } = parseArgs(process.argv.slice(2));
  const aufgeloest = echterClient(client);
  if (rolle === "plan") plan(aufgeloest);
  else if (rolle === "kritik") kritik(aufgeloest);
  else if (rolle === "fold-duell") foldDuell(aufgeloest);
  else bau(aufgeloest);
}
