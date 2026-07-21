#!/usr/bin/env node
// bilder.mjs — Bild-Assets in AVIF halten + Index pflegen (web-Skill).
// Deterministisch, keine npm-Abhaengigkeiten, nutzt ffmpeg (libaom-av1 still-picture).
//
// Ein Asset-Ordner pro Projekt, z. B. client-<name>/web/assets/, darin bilder-index.json.
// Jedes Bild liegt NUR als .avif im Ordner; der Index ist die Wahrheit darueber.
//
// Befehle:
//   add <assets-dir> <quelle-bild> [--typ T] [--motiv "…"] [--style "…"]
//        [--modell M] [--ref a.jpg,b.jpg] [--prompt "…"] [--quelle generiert|geliefert]
//     -> konvertiert nach AVIF, legt es in <assets-dir>, ergaenzt den Index.
//   reject <assets-dir> <id-oder-datei>
//     -> loescht die AVIF-Datei KOMPLETT und entfernt den Index-Eintrag.
//   list <assets-dir>
//     -> druckt den Index als Tabelle.
//
// Semantische Felder (typ/motiv/style/…) fuellt der Agent. Fehlen sie beim add,
// stehen sie als "TBD" im Index und MUESSEN nachgetragen werden (siehe bildgenerierung.md).

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { basename, extname, join, resolve } from "node:path";

const CRF = "30";        // Qualitaet (niedriger = besser/groesser)
const CPU_USED = "5";    // libaom Speed/Quality-Tradeoff (0 lang/best … 8 schnell)

function die(msg) { console.error("FEHLER: " + msg); process.exit(1); }

function parseFlags(argv) {
  const flags = {}; const pos = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith("--")) { flags[a.slice(2)] = argv[++i] ?? ""; }
    else pos.push(a);
  }
  return { flags, pos };
}

function indexPath(dir) { return join(dir, "bilder-index.json"); }
function loadIndex(dir) {
  const p = indexPath(dir);
  if (!existsSync(p)) return { images: [] };
  try { return JSON.parse(readFileSync(p, "utf8")); }
  catch { die("bilder-index.json ist kaputt: " + p); }
}
function saveIndex(dir, idx) {
  writeFileSync(indexPath(dir), JSON.stringify(idx, null, 2) + "\n");
}

function slugify(s) {
  return s.toLowerCase().normalize("NFKD").replace(/[^\w]+/g, "-")
    .replace(/^-+|-+$/g, "").slice(0, 48) || "bild";
}
function uniqueId(idx, base) {
  let id = base, n = 2;
  while (idx.images.some((im) => im.id === id)) id = `${base}-${n++}`;
  return id;
}

function toAvif(src, outPath) {
  execFileSync("ffmpeg", [
    "-hide_banner", "-loglevel", "error", "-y",
    "-i", src,
    "-c:v", "libaom-av1", "-still-picture", "1",
    "-crf", CRF, "-cpu-used", CPU_USED, "-pix_fmt", "yuv420p",
    outPath,
  ], { stdio: ["ignore", "ignore", "inherit"] });
}

function cmdAdd(pos, flags) {
  const [dirArg, src] = pos;
  if (!dirArg || !src) die("Nutzung: add <assets-dir> <quelle-bild> [--typ …]");
  const dir = resolve(dirArg);
  if (!existsSync(src)) die("Quelle nicht gefunden: " + src);
  mkdirSync(dir, { recursive: true });
  const idx = loadIndex(dir);

  const base = slugify(flags.motiv || basename(src, extname(src)));
  const id = uniqueId(idx, base);
  const datei = id + ".avif";
  const outPath = join(dir, datei);
  if (existsSync(outPath)) die("Zieldatei existiert schon: " + outPath);

  toAvif(src, outPath);

  const entry = {
    id,
    datei,
    typ: flags.typ || "TBD",
    motiv: flags.motiv || "TBD",
    style: flags.style || "TBD",
    modell: flags.modell || (flags.quelle === "geliefert" ? "-" : "TBD"),
    referenzen: flags.ref ? flags.ref.split(",").map((s) => s.trim()).filter(Boolean) : [],
    prompt: flags.prompt || "",
    quelle: flags.quelle || "generiert",
    erstellt: flags.datum || "TBD",   // Datum bewusst nicht aus Date.now() (reproduzierbar)
    status: "aktiv",
  };
  idx.images.push(entry);
  saveIndex(dir, idx);
  console.log(`+ ${datei}  (id=${id})`);
  const tbd = ["typ", "motiv", "style", "erstellt"].filter((k) => entry[k] === "TBD");
  if (tbd.length) console.log("  ! bitte nachtragen: " + tbd.join(", "));
}

function cmdReject(pos) {
  const [dirArg, key] = pos;
  if (!dirArg || !key) die("Nutzung: reject <assets-dir> <id-oder-datei>");
  const dir = resolve(dirArg);
  const idx = loadIndex(dir);
  const i = idx.images.findIndex((im) => im.id === key || im.datei === key);
  if (i === -1) die("Kein Index-Eintrag fuer: " + key);
  const [removed] = idx.images.splice(i, 1);
  const f = join(dir, removed.datei);
  if (existsSync(f)) rmSync(f);
  saveIndex(dir, idx);
  console.log(`- geloescht + aus Index entfernt: ${removed.datei} (id=${removed.id})`);
}

function cmdList(pos) {
  const dir = resolve(pos[0] || ".");
  const idx = loadIndex(dir);
  if (!idx.images.length) { console.log("(Index leer)"); return; }
  for (const im of idx.images) {
    console.log(`${im.datei}\n  typ:${im.typ} | motiv:${im.motiv} | style:${im.style}\n  modell:${im.modell} | quelle:${im.quelle} | refs:${im.referenzen.join(",") || "-"} | ${im.erstellt}`);
  }
  console.log(`\n${idx.images.length} Bild(er).`);
}

const [cmd, ...rest] = process.argv.slice(2);
const { flags, pos } = parseFlags(rest);
switch (cmd) {
  case "add": cmdAdd(pos, flags); break;
  case "reject": cmdReject(pos); break;
  case "list": cmdList(pos); break;
  default:
    console.log("bilder.mjs <add|reject|list> …  (siehe references/bildgenerierung.md)");
    process.exit(cmd ? 1 : 0);
}
