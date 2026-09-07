#!/usr/bin/env node
/**
 * run-adobe-fonts-check.mjs — immer die Adobe Fonts Library?
 *
 * Der Web-Skill waehlt Schriften immer aus der Adobe Fonts Library.
 * Die Seite laedt sie ueber das offizielle Kit-Embed. Nicht Google Fonts,
 * nicht Fontshare, nicht ein lokaler Adobe-Dump. Nur Kunden-Brand-Dateien
 * ersetzen die Library.
 *
 *   node evals/run-adobe-fonts-check.mjs
 *
 * Liest die gelieferten Dateien und ruft loadAdobeFontsKit zweimal auf.
 * Kein Adobe-Login. Exit 0 = Policy und Kit stimmen. Exit 1 = Default,
 * Ladeweg oder Geheimnis falsch. Exit 2 = Datei fehlt.
 */
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { loadAdobeFontsKit, showAdobeFontFamily } from "../scripts/adobe-fonts-kit.mjs";

const HIER = dirname(fileURLToPath(import.meta.url));
const WEB = join(HIER, "..");
const ROUTER = join(WEB, "references", "tool-usecase-router.md");
const KATALOG = join(WEB, "references", "frontend-referenzbibliothek.md");
const SKILL = join(WEB, "SKILL.md");
const ACCESS = join(WEB, "scripts", "resource-access.mjs");
const KIT_JSON = join(WEB, "references", "adobe-fonts-kit.json");
const SECRET = "/root/tools/secrets/adobe-fonts.env";

let fehler = 0;
let gezaehlt = 0;

function zeile(ok, was, detail) {
  gezaehlt++;
  if (!ok) fehler++;
  console.log(`  [${ok ? "OK" : "!!"}]   ${was}`);
  if (!ok && detail) console.log(`         ${detail}`);
}

for (const [p, name] of [[ROUTER, "tool-usecase-router.md"], [KATALOG, "frontend-referenzbibliothek.md"], [SKILL, "SKILL.md"], [ACCESS, "resource-access.mjs"], [KIT_JSON, "adobe-fonts-kit.json"]]) {
  if (!existsSync(p)) {
    console.error(`FEHLER: ${name} fehlt (${p}) — nicht geprueft.`);
    process.exit(2);
  }
}

console.log("Adobe-Fonts-Policy — Default, Embed, kein Dump, kein Passwort\n");

const router = readFileSync(ROUTER, "utf8");
const fonts = (router.split("### 11. Fonts")[1] || "").split("### 12.")[0];
const katalog = readFileSync(KATALOG, "utf8");
const katalogFonts = (katalog.split("## Fonts und Typografie")[1] || "").split("## ")[0];
const skill = readFileSync(SKILL, "utf8");
const skillFonts = (skill.match(/^- \*\*Fonts:\*\*[^\n]+/m) || [""])[0];
const access = readFileSync(ACCESS, "utf8");

let erstes;
let zweites;
try {
  erstes = loadAdobeFontsKit();
  zweites = loadAdobeFontsKit();
} catch (error) {
  zeile(false, "loadAdobeFontsKit zweimal", error.message);
  console.log(`\n${gezaehlt - fehler}/${gezaehlt} wie erwartet.`);
  process.exit(1);
}

zeile(
  erstes.kitId === zweites.kitId
    && erstes.embedUrl === zweites.embedUrl
    && erstes.cssNames.join("|") === zweites.cssNames.join("|"),
  "loadAdobeFontsKit zweimal, gleicher Stand",
  "zweiter Aufruf weicht ab — der Reader ist nicht deterministisch",
);
zeile(Boolean(erstes.kitId) && Boolean(erstes.projectId), "Kit-ID und Projekt-ID gesetzt");
zeile(
  /^https:\/\/use\.typekit\.net\/[a-z0-9]+\.css$/i.test(erstes.embedUrl)
    && erstes.embedUrl.endsWith(`/${erstes.kitId}.css`),
  "Embed-URL ist use.typekit.net/<id>.css",
);
zeile(erstes.cssNames.length > 0 && erstes.defaultFamilies.length > 0, "font-family-Namen nicht leer");
zeile(
  erstes.loadPath === "official-typekit-embed"
    && erstes.selfHostAdobeWebfonts === false
    && erstes.downloadLibrary === false,
  "Ladeweg ist Kit-Embed, kein Self-Host, kein Bibliotheks-Download",
);
zeile(erstes.brandFilesOverride === true, "Kunden-Brand-Dateien bleiben vorrangig");

zeile(/Adobe Fonts/i.test(fonts) && /use\.typekit\.net/.test(fonts), "#fonts-Default nennt Adobe Fonts und use.typekit.net");
zeile(
  /\*\*Default\*\*[^\n]*Adobe Fonts Library/.test(fonts)
    && /\*\*Install\/Use\*\*[^\n]*Adobe Fonts Library/.test(fonts),
  "#fonts Default und Install/Use nennen Adobe Fonts Library",
);
zeile(
  /\*\*Default\*\*[^\n]*Adobe Fonts/i.test(fonts)
    && !/\*\*Default\*\*[^\n]*Google/i.test(fonts)
    && !/\*\*Default\*\*[^\n]*Fontshare/i.test(fonts),
  "#fonts-Default ist nicht Google Fonts und nicht Fontshare",
);
zeile(
  /\*\*Alternativen\*\*[^\n]*Keine andere Foundry/.test(fonts)
    && !/\*\*Alternativen\*\*[^\n]*(Fontshare|Google)/i.test(fonts),
  "#fonts Alternativen sind keine andere Foundry als Schriftquelle",
);
zeile(
  /Adobe-Webfonts selbst hosten/i.test(fonts)
    && /Adobe-Bibliothek herunterladen/i.test(fonts),
  "#fonts verbietet Adobe-Self-Host und Bibliotheks-Download",
);
zeile(
  !/(?:lade|download|kopier|lege|public\/fonts)[^\n]{0,80}Adobe[^\n]{0,40}\.(woff2?|ttf)/i.test(fonts)
    && !/Adobe[^\n]{0,40}\.(woff2?|ttf)[^\n]{0,40}(?:nach public|self-host|herunterladen)/i.test(fonts),
  "#fonts fordert keinen lokalen Adobe-.woff/.ttf-Dump",
);

zeile(/Adobe Fonts/i.test(katalogFonts) && /use\.typekit\.net/.test(katalogFonts), "Katalog-Default nennt Adobe Fonts Kit-Embed");
zeile(/\*\*Default \(Router\):\*\*[^\n]*Adobe Fonts Library/.test(katalogFonts), "Katalog-Default nennt Adobe Fonts Library");
zeile(
  /\*\*Diese Liste ist:\*\*[^\n]*Recherche/.test(katalogFonts)
    && !/\*\*Diese Liste ist:\*\*[^\n]*Alternative/i.test(katalogFonts),
  "Katalog-Fonts-Liste ist Recherche, keine Schriftquelle",
);
zeile(
  !/next\/font\/local/.test(katalogFonts)
    && !/next\/font\/google/.test(katalogFonts)
    && !/\*\*Default \(Router\):\*\*[^\n]*Google Fonts/.test(katalogFonts),
  "Katalog-Default ist nicht next/font und nicht Google Fonts",
);
zeile(
  /\*\*Fonts:\*\*[^\n]*Adobe Fonts Library/.test(skillFonts)
    && !/\*\*Fonts:\*\*[^\n]*(Fontshare|Google Fonts)/i.test(skillFonts),
  "SKILL-Gotcha nennt Adobe Fonts Library und keine andere Foundry",
);
zeile(
  /Adobe-Webfonts selbst hosten/.test(katalogFonts)
    && /Adobe-Bibliothek herunterladen/.test(katalogFonts),
  "Katalog verbietet Adobe-Dump und Adobe-Self-Host",
);

zeile(
  /"Fonts und Typografie": Object\.freeze\(\{ kind: "font-source", mode: "adobe-kit-embed", routerAnchor: "#fonts" \}\)/.test(access),
  "resource-access Font-Modus ist adobe-kit-embed",
);
zeile(access.includes('"adobe-kit-embed"'), "resource-access kennt den Modus adobe-kit-embed");

const check = spawnSync("node", [ACCESS, "check"], { encoding: "utf8", timeout: 20000 });
zeile(check.status === 0 && /Resource access: OK/.test(check.stdout || ""), "resource-access check liest den gelieferten Katalog", (check.stderr || check.stdout || "").split("\n")[0]);

function showMode(name) {
  const run = spawnSync("node", [ACCESS, "show", name, "--json"], { encoding: "utf8", timeout: 20000 });
  let mode = "";
  try { mode = JSON.parse(run.stdout || "{}").mode || ""; } catch { mode = ""; }
  return { status: run.status, mode };
}
const google = showMode("Google Fonts");
const fontshare = showMode("Fontshare");
zeile(google.status === 0 && google.mode === "browser-research", "Google Fonts ist Recherche, keine Schriftquelle");
zeile(fontshare.status === 0 && fontshare.mode === "browser-research", "Fontshare ist Recherche, keine Schriftquelle");

const embed = spawnSync("node", [join(WEB, "scripts", "adobe-fonts-kit.mjs"), "embed"], { encoding: "utf8", timeout: 20000 });
zeile(
  embed.status === 0
    && (embed.stdout || "").includes(erstes.embedTag)
    && (embed.stdout || "").includes(erstes.defaultFamilies[0]),
  "CLI embed gibt das gelieferte Kit aus",
);

const packOk = Object.values(erstes.packFiles).every((p) => existsSync(p));
zeile(packOk && existsSync(erstes.packDir), "lokales Pack liegt unter references/adobe-fonts/");
const files = spawnSync("node", [join(WEB, "scripts", "adobe-fonts-kit.mjs"), "files"], { encoding: "utf8", timeout: 20000 });
const filesOut = files.stdout || "";
zeile(
  files.status === 0
    && filesOut.includes("head.html")
    && filesOut.includes("tokens.css")
    && filesOut.includes("next-head.tsx"),
  "CLI files nennt die lokalen Pack-Dateien",
);
const packDump = Object.values(erstes.packFiles).some((p) => /\.(woff2?|ttf)$/i.test(p));
zeile(!packDump, "lokales Pack enthaelt keine Adobe-.woff/.ttf");

const applyMissing = spawnSync("node", [join(WEB, "scripts", "adobe-fonts-kit.mjs"), "apply"], { encoding: "utf8", timeout: 20000 });
zeile(applyMissing.status === 2, "apply ohne Ziel endet mit Exit 2");

const applyDir = join(tmpdir(), `adobe-fonts-apply-${process.pid}`);
mkdirSync(applyDir, { recursive: true });
const apply = spawnSync("node", [join(WEB, "scripts", "adobe-fonts-kit.mjs"), "apply", applyDir], { encoding: "utf8", timeout: 20000 });
const appliedHead = join(applyDir, "adobe-fonts", "head.html");
const appliedOk = apply.status === 0 && existsSync(appliedHead) && readFileSync(appliedHead, "utf8").includes("use.typekit.net");
zeile(appliedOk, "apply schreibt das hinterlegte Embed ins Ziel", (apply.stderr || apply.stdout || "").trim().split("\n")[0]);
rmSync(applyDir, { recursive: true, force: true });

zeile(existsSync(erstes.libraryRoot) && existsSync(join(erstes.libraryRoot, "catalog.csv")), "lokale Bibliothek und Katalog sind hinterlegt");
const fieldwork = showAdobeFontFamily("Fieldwork", erstes);
zeile(fieldwork.length > 0 && fieldwork.every((row) => row.familyName === "Fieldwork"), "show Fieldwork liest den gelieferten Katalog");
const unknown = spawnSync("node", [join(WEB, "scripts", "adobe-fonts-kit.mjs"), "show", "xyznotafontfamilie"], { encoding: "utf8", timeout: 20000 });
zeile(unknown.status === 1, "show unbekannte Familie endet mit Exit 1");

function geheimAusDatei(text) {
  const zeilen = String(text || "").split(/\r?\n/);
  for (const z of zeilen) {
    const m = z.match(/^(?:ADOBE_FONTS_PASSWORD|pass)\s*[:=]\s*(\S+)/i);
    if (m && m[1] && m[1] !== "***") return m[1];
  }
  return "";
}

const secretText = existsSync(SECRET) ? readFileSync(SECRET, "utf8") : "";
const passwort = geheimAusDatei(secretText);

const SKIP = new Set(["node_modules", ".git"]);
const TEXT = /\.(md|mjs|js|json|html|tsx?|ya?ml|txt|csv)$/;
const treffer = [];
function scannen(dir) {
  for (const name of readdirSync(dir)) {
    if (SKIP.has(name)) continue;
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) { scannen(p); continue; }
    if (!TEXT.test(name)) continue;
    const roh = readFileSync(p, "utf8");
    if (/Make_\d{4}/.test(roh)) treffer.push(`${p}: Muster Make_<vier Ziffern>`);
    if (passwort && roh.includes(passwort)) treffer.push(`${p}: Passwort aus Secret-Datei`);
  }
}
scannen(WEB);
zeile(treffer.length === 0, "Skill-Baum enthaelt das Adobe-Passwort nicht", treffer.slice(0, 4).join("; "));
zeile(existsSync(SECRET), "Secret-Datei liegt ausserhalb von Git", SECRET);

console.log(`\n${gezaehlt - fehler}/${gezaehlt} wie erwartet.`);
if (fehler) {
  console.log("Default, Ladeweg oder Geheimnis stimmen nicht.");
  process.exit(1);
}
console.log("Adobe Fonts ist der Default. Das Kit kommt per Embed. Das Passwort steht nicht im Skill.");
process.exit(0);
