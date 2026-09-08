#!/usr/bin/env node
// werkzeug-gate.mjs — Fach-4-Gate: wurde tool-usecase-router.md wirklich befolgt?
//
// Prueft deterministisch am gebauten Projekt (nicht an einer Behauptung):
//   1. Werkzeugtabelle ist echt: Datenzeilen mit Ankern, die es im Router gibt
//   2. genau EIN Icon-System im ganzen Projekt (auch Subpath-Importe)
//   3. null Importe aus "framer-motion" (vendorierte Komponenten nutzen "motion/react")
//   4. jede animierende Datei behandelt Reduced Motion — fuer JEDE Animations-
//      bibliothek (motion, gsap, react-spring, animejs, lottie …), nicht nur die
//      Router-Defaults; ein auskommentierter Hinweis zaehlt nicht
//   5. keine Abhaengigkeit (dependencies/devDependencies/optionalDependencies)
//      ohne Zeile in der Werkzeugtabelle
//
// Gescannt wird das GANZE Projekt (src/, app/, pages/, components/ …), nicht nur src/.
//
// Was dieses Gate NICHT kann (bewusste Grenze, nicht vergessen):
//   - Es prueft eine Richtung: nichts im Projekt, was nicht in der Tabelle steht.
//     Die Gegenrichtung bleibt weich, weil viele Router-Zeilen gar kein npm-Paket
//     haben (Inspiration = Website oeffnen, Bilder = Higgsfield-CLI, Gradient = CSS).
//   - Ein Projekt ganz ohne Frontend-Tools ist gruen. Das ist richtig so: eine reine
//     Tailwind-Landing ohne Icons und ohne Motion ist ein zulaessiges Router-Ergebnis.
//   - Inhaltliche Gates (axe, Tastatur, Lizenz, AVIF, Bundle-Budget) stehen im Router
//     und laufen in den anderen QA-Faechern — nicht hier.
//
// Die Werkzeugtabelle steht exakt zwischen diesen Markern:
//   <!-- WERKZEUGTABELLE:START -->
//   <!-- WERKZEUGTABELLE:ENDE -->
// Usage:
//   node werkzeug-gate.mjs <projekt-verzeichnis> --tabelle <pfad> --profile node|static|cms
// Exit 0 = gruen, Exit 1 = Qualitaetsfehler, Exit 2 = Aufruf-/Vertragsfehler.

import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, extname, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROUTER_PATH = join(HERE, "..", "references", "tool-usecase-router.md");
const TABLE_START = "<!-- WERKZEUGTABELLE:START -->";
const TABLE_END = "<!-- WERKZEUGTABELLE:ENDE -->";
const PROFILES = new Set(["node", "static", "cms"]);
const USAGE =
  "usage: node werkzeug-gate.mjs <projekt-verzeichnis> " +
  "--tabelle <pfad> --profile node|static|cms";

function invocationError(message) {
  console.error(`Werkzeug-Gate: AUFRUFFEHLER\n  - ${message}`);
  console.error(USAGE);
  process.exit(2);
}

const args = process.argv.slice(2);
if (args.includes("--help") || args.includes("-h")) {
  console.log(USAGE);
  process.exit(0);
}
let projectDir = null;
let tablePath = null;
let profile = null;
for (let index = 0; index < args.length; index++) {
  const arg = args[index];
  if (arg === "--tabelle" || arg === "--profile") {
    const value = args[index + 1];
    if (!value || value.startsWith("-")) {
      invocationError(`Wert fuer ${arg} fehlt`);
    }
    if (arg === "--tabelle") {
      if (tablePath !== null) invocationError("--tabelle wurde mehrfach angegeben");
      tablePath = value;
    } else {
      if (profile !== null) invocationError("--profile wurde mehrfach angegeben");
      profile = value;
    }
    index++;
  } else if (arg.startsWith("-")) {
    invocationError(`unbekanntes Flag: ${arg}`);
  } else if (projectDir === null) {
    projectDir = arg;
  } else {
    invocationError(`unerwartetes Argument: ${arg}`);
  }
}

if (!projectDir) invocationError("Projektverzeichnis fehlt");
if (!tablePath) invocationError("--tabelle fehlt");
if (!profile) invocationError("--profile fehlt");
if (!PROFILES.has(profile)) invocationError(`unbekanntes Profil: ${profile}`);
if (!existsSync(projectDir)) invocationError(`Projektverzeichnis fehlt: ${projectDir}`);
try {
  if (!statSync(projectDir).isDirectory()) {
    invocationError(`Projektpfad ist kein Verzeichnis: ${projectDir}`);
  }
} catch (error) {
  invocationError(`Projektverzeichnis nicht lesbar: ${error.message}`);
}
if (!existsSync(tablePath)) invocationError(`Tabellendatei fehlt: ${tablePath}`);

// Bekannte Icon-Pakete. Ergaenzt um eine Heuristik auf "icon" im Paketnamen,
// damit ein unbekanntes zweites Set (iconoir-react, @mui/icons-material …)
// nicht einfach durchrutscht.
const KNOWN_ICON_PACKAGES = new Set([
  "lucide-react",
  "@phosphor-icons/react",
  "react-icons",
  "@heroicons/react",
  "@iconify/react",
  "@tabler/icons-react",
  "@radix-ui/react-icons",
  "react-feather",
  "@fortawesome/react-fontawesome",
]);
const ICON_NAME_HINT = /icon/i;

// Jede JS-Animationsbibliothek muss Reduced Motion behandeln — nicht nur die
// beiden aus dem Router-Default. Sonst laesst sich das A11y-Gate abschalten,
// indem man statt "motion" einfach gsap oder react-spring waehlt.
const MOTION_PACKAGES = new Set([
  "motion",
  "framer-motion",
  "gsap",
  "@gsap/react",
  "@react-spring/web",
  "react-spring",
  "animejs",
  "@formkit/auto-animate",
  "lottie-react",
  "lottie-web",
  "@lottiefiles/react-lottie-player",
  "react-transition-group",
  "auto-animate",
]);

// Pakete, die jedes Next/Tailwind-Projekt ohnehin mitbringt und die nicht
// aus einer Router-Zeile stammen muessen.
const BASELINE_DEPS = new Set([
  "react",
  "react-dom",
  "next",
  "typescript",
  "tailwindcss",
  "postcss",
  "autoprefixer",
  "@types/react",
  "@types/react-dom",
  "@types/node",
  "eslint",
  "eslint-config-next",
  "prettier",
]);

const SOURCE_EXT = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".html",
  ".htm",
]);
const SKIP_DIRS = new Set([
  "node_modules",
  ".next",
  "dist",
  "build",
  ".git",
  "out",
  "coverage",
  ".turbo",
  ".vercel",
]);

function walk(dir, acc = []) {
  if (!existsSync(dir)) return acc;
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue;
    const full = join(dir, entry);
    let st;
    try {
      st = statSync(full);
    } catch {
      continue;
    }
    if (st.isDirectory()) walk(full, acc);
    else if (SOURCE_EXT.has(extname(entry))) acc.push(full);
  }
  return acc;
}

// Kommentare und String-Literale entfernen, damit ein auskommentiertes
// "useReducedMotion" nicht als Nachweis zaehlt.
function stripCommentsAndStrings(code) {
  return code
    .replace(/\/\*[\s\S]*?\*\//g, " ")
    .replace(/(^|[^:])\/\/[^\n]*/g, "$1 ")
    .replace(/`(?:[^`\\]|\\.)*`/g, '""')
    .replace(/'(?:[^'\\\n]|\\.)*'/g, '""')
    .replace(/"(?:[^"\\\n]|\\.)*"/g, '""');
}

// Alle Modul-Spezifizierer einer Datei: import ... from "x", import("x"),
// require("x"), export ... from "x".
function moduleSpecifiers(code) {
  const specs = [];
  const patterns = [
    /\bfrom\s*["']([^"']+)["']/g,
    /\bimport\s*\(\s*["']([^"']+)["']\s*\)/g,
    /\brequire\s*\(\s*["']([^"']+)["']\s*\)/g,
    /\bimport\s+["']([^"']+)["']/g,
  ];
  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(code)) !== null) specs.push(match[1]);
  }
  return specs;
}

// "@scope/name/sub/path" -> "@scope/name" · "name/sub" -> "name" ·
// relative/aliased Pfade -> null
function packageOf(specifier) {
  if (!specifier || specifier.startsWith(".") || specifier.startsWith("/")) return null;
  if (specifier.startsWith("@/") || specifier.startsWith("~/")) return null;
  if (specifier.startsWith("node:") || /^[a-z]+:\/\//i.test(specifier)) return null;
  const parts = specifier.split("/");
  if (specifier.startsWith("@")) return parts.slice(0, 2).join("/");
  return parts[0];
}

const failures = [];
const notes = [];

const files = walk(projectDir);
if (files.length === 0 && profile !== "cms") {
  failures.push(`keine Quelldateien unter ${projectDir} gefunden`);
}

// Einmal alle Dateien einlesen und ihre Importe aufloesen.
const parsed = files.map((file) => {
  const raw = readFileSync(file, "utf8");
  const code = stripCommentsAndStrings(raw);
  const packages = new Set();
  for (const spec of moduleSpecifiers(raw)) {
    const pkg = packageOf(spec);
    if (pkg) packages.add(pkg);
  }
  return { file, raw, code, packages };
});

// --- 1. Werkzeugtabelle ist echt ---------------------------------------------
// Nur der explizit markierte Block gilt. Fruehere Token- oder Vergleichstabellen
// und spaetere verworfene Alternativen koennen dadurch nichts legitimieren.
function markdownCells(row) {
  return row
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

let tableText;
try {
  tableText = readFileSync(tablePath, "utf8");
} catch (error) {
  invocationError(`Tabellendatei nicht lesbar (${tablePath}): ${error.message}`);
}

let routerText;
try {
  routerText = readFileSync(ROUTER_PATH, "utf8");
} catch (error) {
  invocationError(`Router nicht lesbar (${ROUTER_PATH}): ${error.message}`);
}
const routerAnchors = new Set(
  [...routerText.matchAll(/\*\*Anker:\*\*\s*`#([a-z0-9_-]+)`/gi)].map((match) =>
    match[1].toLowerCase()
  )
);
if (routerAnchors.size === 0) {
  invocationError(`Router ohne Anker gefunden: ${ROUTER_PATH}`);
}

const validRows = [];
const tableAnchors = [];
const startCount = tableText.split(TABLE_START).length - 1;
const endCount = tableText.split(TABLE_END).length - 1;
if (startCount !== 1 || endCount !== 1) {
  failures.push(
    `Werkzeugtabelle braucht genau einen Markerblock (${TABLE_START} ... ${TABLE_END}); ` +
      `gefunden: Start ${startCount}, Ende ${endCount}`
  );
} else {
  const start = tableText.indexOf(TABLE_START) + TABLE_START.length;
  const end = tableText.indexOf(TABLE_END);
  if (end <= start) {
    failures.push(`Werkzeugtabellen-Marker stehen in falscher Reihenfolge: ${tablePath}`);
  } else {
    const marked = tableText
      .slice(start, end)
      .replace(/<!--[\s\S]*?-->/g, "")
      .trim();
    const lines = marked
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    const nonTableLines = lines.filter((line) => !line.startsWith("|"));
    if (nonTableLines.length > 0) {
      failures.push(
        `Werkzeugtabellen-Markerblock enthaelt Inhalt ausserhalb der Tabelle: ` +
          nonTableLines[0].slice(0, 90)
      );
    }
    const tableBlock = lines.filter((line) => line.startsWith("|"));
    if (tableBlock.length < 3) {
      failures.push(`Werkzeugtabelle in ${tablePath} hat keine Datenzeilen`);
    } else {
      const header = markdownCells(tableBlock[0]);
      const routerColumn = header.findIndex(
        (cell) => cell.replace(/[`*_]/g, "").toLowerCase() === "router-anker"
      );
      const separator = markdownCells(tableBlock[1]);
      if (routerColumn === -1) {
        failures.push(`Werkzeugtabelle in ${tablePath} hat keine Spalte Router-Anker`);
      } else if (
        separator.length !== header.length ||
        separator.some((cell) => !/^:?-{3,}:?$/.test(cell))
      ) {
        failures.push(`Werkzeugtabelle in ${tablePath} hat keine gueltige Trennzeile`);
      } else {
        const dataRows = tableBlock.slice(2);
        for (const row of dataRows) {
          const cells = markdownCells(row);
          if (cells.length !== header.length) {
            failures.push(`Werkzeugtabellen-Zeile hat falsche Spaltenzahl: ${row.slice(0, 90)}`);
            continue;
          }
          const anchors = [
            ...cells[routerColumn].matchAll(/#([a-z0-9_-]+)/gi),
          ].map((match) => match[1].toLowerCase());
          if (anchors.length === 0) {
            failures.push(
              `Werkzeugtabellen-Zeile ohne Router-Anker: ${row.slice(0, 90)}`
            );
            continue;
          }
          const unknown = anchors.filter((anchor) => !routerAnchors.has(anchor));
          if (unknown.length > 0) {
            invocationError(
              `unbekannter Router-Anker in ${tablePath}: ${unknown
                .map((anchor) => `#${anchor}`)
                .join(", ")}`
            );
          }
          validRows.push(row);
          tableAnchors.push(...anchors);
        }
        if (dataRows.length === 0) {
          failures.push(`Werkzeugtabelle in ${tablePath} hat keine Datenzeilen`);
        } else if (tableAnchors.length > 0) {
          notes.push(
            `Werkzeugtabelle: ${dataRows.length} Zeile(n), Anker ${[
              ...new Set(tableAnchors),
            ].join(", ")}`
          );
        }
      }
    }
  }
}

// --- 2. genau EIN Icon-System -------------------------------------------------
const iconHits = new Map();
for (const { file, packages } of parsed) {
  for (const pkg of packages) {
    if (KNOWN_ICON_PACKAGES.has(pkg) || ICON_NAME_HINT.test(pkg)) {
      if (!iconHits.has(pkg)) iconHits.set(pkg, []);
      iconHits.get(pkg).push(relative(projectDir, file));
    }
  }
}
if (iconHits.size > 1) {
  failures.push(
    `mehrere Icon-Systeme: ${[...iconHits.keys()].join(", ")} — Router erlaubt genau eines (#icons)`
  );
} else if (iconHits.size === 1) {
  notes.push(`Icon-System: ${[...iconHits.keys()][0]}`);
}

// --- 3. kein framer-motion ----------------------------------------------------
const framerFiles = parsed
  .filter(({ packages }) => packages.has("framer-motion"))
  .map(({ file }) => relative(projectDir, file));
if (framerFiles.length > 0) {
  failures.push(
    `framer-motion-Import in ${framerFiles.length} Datei(en) — vendorierte Komponenten ` +
      `importieren aus "motion/react" (Paket "motion"): ${framerFiles.slice(0, 5).join(", ")}`
  );
}

// --- 4. useReducedMotion wird wirklich aufgerufen ------------------------------
const motionMissing = [];
for (const { file, raw, code, packages } of parsed) {
  const motionPkgs = [...packages].filter((pkg) => MOTION_PACKAGES.has(pkg));
  if (motionPkgs.length === 0) continue;
  const animates =
    /<motion\.|<m\.|AnimatePresence|useAnimate\s*\(|animate\s*[=:]/.test(code) ||
    /\bgsap\s*\.|\banime\s*\(|useSpring\s*\(|useTransition\s*\(|autoAnimate\s*\(/.test(code) ||
    /\bLottie\b|useLottie\s*\(/.test(code);
  if (!animates) continue;
  // Der Hook-Aufruf wird am entkommentierten Code geprueft, damit ein
  // auskommentiertes "useReducedMotion" nicht zaehlt. Die Media-Query steht
  // dagegen zwangslaeufig IN einem String — dafuer muss der Rohtext ran,
  // aber nur ausserhalb von Kommentaren.
  const rawWithoutComments = raw
    .replace(/\/\*[\s\S]*?\*\//g, " ")
    .replace(/(^|[^:])\/\/[^\n]*/g, "$1 ");
  const handlesReduced =
    /useReducedMotion\s*\(/.test(code) ||
    /prefers-reduced-motion/.test(rawWithoutComments);
  if (!handlesReduced) motionMissing.push(relative(projectDir, file));
}
if (motionMissing.length > 0) {
  failures.push(
    `Motion ohne Reduced-Motion-Behandlung in ${motionMissing.length} Datei(en): ` +
      motionMissing.slice(0, 5).join(", ")
  );
}

// --- 5. keine Abhaengigkeit ohne Werkzeugtabellen-Zeile ------------------------
const pkgPath = join(projectDir, "package.json");
if (!existsSync(pkgPath)) {
  if (profile === "node") {
    failures.push(`package.json fehlt unter ${projectDir} (Profil node)`);
  } else {
    notes.push(`Profil ${profile}: package.json nicht erforderlich`);
  }
} else {
  let pkg;
  try {
    pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
  } catch (error) {
    pkg = null;
    failures.push(`package.json ist kein gueltiges JSON: ${error.message}`);
  }
  if (pkg) {
    // Wenn Static oder CMS Custom-JavaScript mit Paketdatei enthalten, gilt
    // derselbe Dependency-Vertrag. Nur das Fehlen der Paketdatei ist erlaubt.
    const deps = [
      ...new Set([
        ...Object.keys(pkg.dependencies ?? {}),
        ...Object.keys(pkg.devDependencies ?? {}),
        ...Object.keys(pkg.optionalDependencies ?? {}),
      ]),
    ];
    if (deps.includes("framer-motion")) {
      failures.push(
        `framer-motion als Abhaengigkeit — erlaubt ist Paket "motion" mit Import "motion/react"`
      );
    }

    // Der Paketname muss in EINER gueltigen Zeile stehen. Fuer das Paket
    // "motion" zaehlt auch seine kanonische Importbezeichnung "motion/react".
    const documented = (dep) => {
      const candidates = dep === "motion" ? ["motion", "motion/react"] : [dep];
      return candidates.some((candidate) => {
        const escaped = candidate.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const pattern = new RegExp(
          `(^|[^A-Za-z0-9@/_-])${escaped}([^A-Za-z0-9./_-]|$)`
        );
        return validRows.some((row) => pattern.test(row));
      });
    };
    const undocumented = deps.filter(
      (dep) => !BASELINE_DEPS.has(dep) && !documented(dep)
    );
    if (undocumented.length > 0) {
      failures.push(
        `Abhaengigkeiten ohne Zeile in der Werkzeugtabelle: ${undocumented.join(", ")}`
      );
    } else {
      notes.push(`Werkzeugtabelle deckt ${deps.length} Abhaengigkeit(en) ab`);
    }
  }
}

for (const note of notes) console.log(`  ok: ${note}`);
if (failures.length === 0) {
  console.log("Werkzeug-Gate: OK");
  process.exit(0);
}
console.error("Werkzeug-Gate: FAIL");
for (const failure of failures) console.error(`  - ${failure}`);
process.exit(1);
