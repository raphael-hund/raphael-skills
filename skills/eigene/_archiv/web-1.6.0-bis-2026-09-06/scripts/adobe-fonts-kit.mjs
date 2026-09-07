#!/usr/bin/env node
/**
 * Liest das hinterlegte Adobe-Fonts-Kit (ID, Embed-URL, font-family-Namen).
 * Kein Adobe-Login, kein Passwort, kein Netz.
 *
 *   node adobe-fonts-kit.mjs --help
 *   node adobe-fonts-kit.mjs json
 *   node adobe-fonts-kit.mjs embed
 *   node adobe-fonts-kit.mjs files
 *   node adobe-fonts-kit.mjs apply <ziel>
 *   node adobe-fonts-kit.mjs library
 *   node adobe-fonts-kit.mjs show <familie>
 */
import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const KIT_PATH = join(HERE, "..", "references", "adobe-fonts-kit.json");
const PACK_DIR = join(HERE, "..", "references", "adobe-fonts");
const PACK_FILES = Object.freeze({
  head: join(PACK_DIR, "head.html"),
  tokens: join(PACK_DIR, "tokens.css"),
  nextHead: join(PACK_DIR, "next-head.tsx"),
});
const TYPEKIT_CSS = /^https:\/\/use\.typekit\.net\/[a-z0-9]+\.css$/i;
const DEFAULT_LIBRARY = "/root/tools/adobe-fonts-library";

function die(code, message) {
  console.error(message);
  process.exit(code);
}

export function loadAdobeFontsKit(path = KIT_PATH) {
  let raw;
  try {
    raw = readFileSync(path, "utf8");
  } catch (error) {
    throw new Error(`Adobe-Fonts-Kit fehlt: ${path} (${error.message})`);
  }
  const data = JSON.parse(raw);
  const kit = data?.kit;
  const kitId = String(kit?.id || "").trim();
  const projectId = String(kit?.projectId || kitId).trim();
  const embedUrl = String(kit?.embedUrl || "").trim();
  const families = Array.isArray(data?.families) ? data.families : [];
  const cssNames = families.map((item) => String(item?.cssName || "").trim()).filter(Boolean);
  const defaultFamilies = Array.isArray(data?.defaultFamilies)
    ? data.defaultFamilies.map((name) => String(name).trim()).filter(Boolean)
    : cssNames.slice(0, 2);

  if (!kitId) throw new Error("Adobe-Fonts-Kit: kit.id fehlt");
  if (!projectId) throw new Error("Adobe-Fonts-Kit: kit.projectId fehlt");
  if (!TYPEKIT_CSS.test(embedUrl)) {
    throw new Error("Adobe-Fonts-Kit: embedUrl muss use.typekit.net/<id>.css sein");
  }
  if (!embedUrl.endsWith(`/${kitId}.css`)) {
    throw new Error("Adobe-Fonts-Kit: embedUrl passt nicht zu kit.id");
  }
  if (!cssNames.length) throw new Error("Adobe-Fonts-Kit: families leer");
  if (data.selfHostAdobeWebfonts !== false) {
    throw new Error("Adobe-Fonts-Kit: selfHostAdobeWebfonts muss false sein");
  }
  if (data.downloadLibrary !== false) {
    throw new Error("Adobe-Fonts-Kit: downloadLibrary muss false sein");
  }
  if (data.loadPath !== "official-typekit-embed") {
    throw new Error("Adobe-Fonts-Kit: loadPath muss official-typekit-embed sein");
  }
  for (const [name, file] of Object.entries(PACK_FILES)) {
    try {
      readFileSync(file, "utf8");
    } catch (error) {
      throw new Error(`Adobe-Fonts-Pack fehlt (${name}): ${file} (${error.message})`);
    }
  }

  return Object.freeze({
    source: "adobe-fonts",
    loadPath: "official-typekit-embed",
    selfHostAdobeWebfonts: false,
    downloadLibrary: false,
    brandFilesOverride: data.brandFilesOverride === true,
    secretStore: String(data.secretStore || ""),
    kitId,
    projectId,
    accountId: String(kit.accountId || ""),
    name: String(kit.name || ""),
    embedUrl,
    embedRel: String(kit.embedRel || "stylesheet"),
    embedTag: `<link rel="stylesheet" href="${embedUrl}" />`,
    families: Object.freeze(families.map((item) => Object.freeze({
      cssName: String(item.cssName).trim(),
      role: String(item.role || ""),
      fallback: String(item.fallback || "sans-serif"),
    }))),
    cssNames: Object.freeze(cssNames),
    defaultFamilies: Object.freeze(defaultFamilies),
    packDir: PACK_DIR,
    packFiles: PACK_FILES,
    libraryRoot: String(data.libraryRoot || DEFAULT_LIBRARY),
  });
}

function parseCsvLine(line) {
  const out = [];
  let cur = "";
  let quoted = false;
  for (const ch of line) {
    if (ch === '"') { quoted = !quoted; continue; }
    if (ch === "," && !quoted) { out.push(cur); cur = ""; continue; }
    cur += ch;
  }
  out.push(cur);
  return out;
}

export function loadAdobeFontsLibrary(kit = loadAdobeFontsKit()) {
  const root = kit.libraryRoot;
  const catalogPath = join(root, "catalog.csv");
  const raw = readFileSync(catalogPath, "utf8");
  const lines = raw.split(/\r?\n/).filter(Boolean);
  const header = parseCsvLine(lines[0] || "");
  const idx = Object.fromEntries(header.map((name, i) => [name, i]));
  const rows = [];
  for (const line of lines.slice(1)) {
    const cols = parseCsvLine(line);
    const relpath = String(cols[idx.relpath] || "").trim();
    if (!relpath || relpath.endsWith(".tmp")) continue;
    const familyName = String(cols[idx.familyName] || "").trim();
    const fullName = String(cols[idx.fullName] || "").trim();
    const abs = join(root, relpath);
    rows.push(Object.freeze({
      familyName,
      fullName,
      variationName: String(cols[idx.variationName] || "").trim(),
      adobeUrl: String(cols[idx.familyURL] || "").trim(),
      relpath,
      abs,
      exists: existsSync(abs),
    }));
  }
  return Object.freeze({ root, catalogPath, rows: Object.freeze(rows) });
}

export function showAdobeFontFamily(query, kit = loadAdobeFontsKit()) {
  const needle = String(query || "").trim().toLowerCase();
  if (!needle) throw new Error("show braucht einen Familiennamen");
  const lib = loadAdobeFontsLibrary(kit);
  const exact = lib.rows.filter((row) => row.familyName.toLowerCase() === needle);
  if (exact.length) return exact;
  return lib.rows.filter((row) =>
    row.familyName.toLowerCase().includes(needle)
    || row.fullName.toLowerCase().includes(needle));
}

function usage(message) {
  if (message) console.error(message);
  console.error("usage: adobe-fonts-kit.mjs --help | json | embed | files | library | show <familie> | apply <ziel>");
  process.exit(2);
}

function printHelp() {
  console.log(`adobe-fonts-kit.mjs — hinterlegtes Adobe-Fonts-Kit lesen

usage:
  node adobe-fonts-kit.mjs --help
  node adobe-fonts-kit.mjs json
  node adobe-fonts-kit.mjs embed
  node adobe-fonts-kit.mjs files
  node adobe-fonts-kit.mjs apply <ziel>
  node adobe-fonts-kit.mjs library
  node adobe-fonts-kit.mjs show <familie>

json     Kit-ID, Embed-URL und font-family-Namen
embed    Link-Tag plus die Default-Familien
files    lokale Pack-Dateien unter references/adobe-fonts/
library  lokale Adobe-Bibliothek (Katalog)
show     Familie in der lokalen Bibliothek nachschlagen
apply    Pack nach <ziel>/adobe-fonts/ kopieren (Embed, keine .woff)

Kein Adobe-Login. Kein Passwort. Adobe-Webfonts nicht selbst hosten.`);
}

function main(argv) {
  const args = argv.slice(2);
  if (args.includes("--help") || args.includes("-h") || args[0] === "help") {
    printHelp();
    process.exit(0);
  }
  const unknownFlag = args.find((arg) => arg.startsWith("-") && arg !== "--help" && arg !== "-h");
  if (unknownFlag) usage(`Unbekanntes Flag: ${unknownFlag}`);

  let kit;
  try {
    kit = loadAdobeFontsKit();
  } catch (error) {
    die(2, error.message);
  }

  if (args[0] === "library") {
    if (args.length !== 1) usage();
    let lib;
    try { lib = loadAdobeFontsLibrary(kit); }
    catch (error) { die(2, error.message); }
    const families = new Set(lib.rows.map((row) => row.familyName));
    const onDisk = lib.rows.filter((row) => row.exists).length;
    console.log(lib.root);
    console.log(`${families.size} Familien`);
    console.log(`${lib.rows.length} Schnitte`);
    console.log(`${onDisk} Dateien auf Disk`);
    process.exit(0);
  }
  if (args[0] === "show") {
    if (args.length !== 2) usage("show braucht einen Familiennamen");
    let hits;
    try { hits = showAdobeFontFamily(args[1], kit); }
    catch (error) { die(2, error.message); }
    if (!hits.length) die(1, `Familie nicht gefunden: ${args[1]}`);
    console.log(`${hits[0].familyName}\t${hits[0].adobeUrl}`);
    for (const row of hits) {
      console.log(`${row.exists ? "OK" : "--"}\t${row.fullName}\t${row.abs}`);
    }
    process.exit(0);
  }
  if (args[0] === "apply") {
    if (args.length !== 2) usage("apply braucht ein Zielverzeichnis");
    const dest = resolve(args[1]);
    if (!existsSync(dest) || !statSync(dest).isDirectory()) die(2, `Ziel fehlt: ${dest}`);
    const out = join(dest, "adobe-fonts");
    mkdirSync(out, { recursive: true });
    copyFileSync(kit.packFiles.head, join(out, "head.html"));
    copyFileSync(kit.packFiles.tokens, join(out, "tokens.css"));
    copyFileSync(kit.packFiles.nextHead, join(out, "next-head.tsx"));
    console.log(out);
    process.exit(0);
  }
  if (args.length !== 1) usage();

  if (args[0] === "json") {
    console.log(JSON.stringify({
      kitId: kit.kitId,
      projectId: kit.projectId,
      embedUrl: kit.embedUrl,
      embedTag: kit.embedTag,
      cssNames: kit.cssNames,
      defaultFamilies: kit.defaultFamilies,
      loadPath: kit.loadPath,
      selfHostAdobeWebfonts: kit.selfHostAdobeWebfonts,
      brandFilesOverride: kit.brandFilesOverride,
      libraryRoot: kit.libraryRoot,
    }, null, 2));
    process.exit(0);
  }
  if (args[0] === "embed") {
    console.log(kit.embedTag);
    console.log(kit.defaultFamilies.join(", "));
    process.exit(0);
  }
  if (args[0] === "files") {
    for (const path of Object.values(kit.packFiles)) console.log(path);
    process.exit(0);
  }
  usage(`Unbekanntes Kommando: ${args[0]}`);
}

const invoked = process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1]);
if (invoked) main(process.argv);
