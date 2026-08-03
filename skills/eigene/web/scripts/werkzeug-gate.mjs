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
// Usage:
//   node werkzeug-gate.mjs <projekt-verzeichnis> [--tabelle <pfad/art-direction.md>]
// Exit 0 = gruen, Exit 1 = rot (kein Launch), Exit 2 = Aufruffehler.

import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, extname, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROUTER_PATH = join(HERE, "..", "references", "tool-usecase-router.md");

const args = process.argv.slice(2);
const projectDir = args[0];
if (!projectDir) {
  console.error("usage: node werkzeug-gate.mjs <projekt-verzeichnis> [--tabelle <pfad>]");
  process.exit(2);
}
const tableFlag = args.indexOf("--tabelle");
const tablePath =
  tableFlag !== -1 && args[tableFlag + 1]
    ? args[tableFlag + 1]
    : join(projectDir, "..", "art-direction.md");

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

const SOURCE_EXT = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs"]);
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
  const parts = specifier.split("/");
  if (specifier.startsWith("@")) return parts.slice(0, 2).join("/");
  return parts[0];
}

const failures = [];
const notes = [];

const files = walk(projectDir);
if (files.length === 0) {
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
// Nur Zeilen, die selbst einen gueltigen Router-Anker tragen, duerfen ein Paket
// decken. Sonst legitimiert eine einzige gute Zeile den ganzen Rest der Tabelle.
let validRows = [];
let tableAnchors = [];
if (!existsSync(tablePath)) {
  failures.push(
    `Werkzeugtabelle fehlt (${tablePath}) — Schritt 5d im web-Skill ist die Freigabe fuer den Build`
  );
} else {
  // HTML-Kommentare raus: eine auskommentierte ("verworfene") Zeile darf kein
  // Paket legitimieren.
  const table = readFileSync(tablePath, "utf8").replace(/<!--[\s\S]*?-->/g, "");
  const lines = table.split("\n").map((line) => line.trim());
  const dataRows = lines.filter(
    (line) =>
      line.startsWith("|") &&
      !/^\|[\s|:-]+\|?$/.test(line) && // Trennzeile
      !line.includes("Router-Anker") // Kopfzeile
  );
  if (dataRows.length === 0) {
    failures.push(`Werkzeugtabelle in ${tablePath} hat keine Datenzeilen`);
  }

  // Anker gegen den echten Router pruefen — ein erfundenes `#none` faellt durch.
  let routerAnchors = new Set();
  if (existsSync(ROUTER_PATH)) {
    const routerText = readFileSync(ROUTER_PATH, "utf8");
    routerAnchors = new Set(
      [...routerText.matchAll(/\*\*Anker:\*\*\s*`#([a-z-]+)`/g)].map((m) => m[1])
    );
  }
  if (routerAnchors.size === 0) {
    failures.push(`Router ohne Anker gefunden (${ROUTER_PATH}) — Gate kann nicht pruefen`);
  }

  for (const row of dataRows) {
    const anchors = [...row.matchAll(/#([a-z-]+)/g)].map((m) => m[1]);
    const valid = anchors.filter((a) => routerAnchors.has(a));
    if (valid.length === 0) {
      failures.push(
        `Werkzeugtabellen-Zeile ohne gueltigen Router-Anker: ${row.slice(0, 90)}`
      );
    } else {
      validRows.push(row);
    }
    tableAnchors.push(...valid);
  }
  if (tableAnchors.length > 0) {
    notes.push(`Werkzeugtabelle: ${dataRows.length} Zeile(n), Anker ${[...new Set(tableAnchors)].join(", ")}`);
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
  failures.push(`package.json fehlt unter ${projectDir}`);
} else if (validRows.length > 0) {
  let pkg;
  try {
    pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
  } catch (error) {
    pkg = null;
    failures.push(`package.json ist kein gueltiges JSON: ${error.message}`);
  }
  if (pkg) {
    // Alle Abhaengigkeitsarten zaehlen — Verschieben nach devDependencies oder
    // optionalDependencies aendert nichts daran, dass das Paket im Projekt landet.
    const deps = [
      ...Object.keys(pkg.dependencies ?? {}),
      ...Object.keys(pkg.devDependencies ?? {}),
      ...Object.keys(pkg.optionalDependencies ?? {}),
    ];
    // Wortgenau pruefen, damit "motion" nicht durch "@emotion/react" gedeckt wird
    // und umgekehrt.
    // Der Paketname muss in EINER Zeile stehen, die selbst einen gueltigen
    // Anker traegt — ein guter Anker legitimiert nicht die ganze Tabelle.
    const documented = (dep) => {
      const escaped = dep.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const pattern = new RegExp(`(^|[^A-Za-z0-9@/_-])${escaped}([^A-Za-z0-9./_-]|$)`);
      return validRows.some((row) => pattern.test(row));
    };
    const undocumented = deps.filter((dep) => !BASELINE_DEPS.has(dep) && !documented(dep));
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
