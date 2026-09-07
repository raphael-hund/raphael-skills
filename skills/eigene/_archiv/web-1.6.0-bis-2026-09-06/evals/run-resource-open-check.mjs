#!/usr/bin/env node
/**
 * run-resource-open-check.mjs — treibt den gelieferten open-Pfad.
 *
 * Importiert parseCatalog / openOfficialPage aus scripts/resource-access.mjs
 * (kein Nachbau) und ruft denselben CLI-Einstieg für unbekannte Namen.
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { adapter, openOfficialPage, parseCatalog, CATALOG_PATH } from "../scripts/resource-access.mjs";

const HIER = path.dirname(fileURLToPath(import.meta.url));
const ACCESS = path.join(HIER, "..", "scripts", "resource-access.mjs");
const SKILL = path.join(HIER, "..", "SKILL.md");
const ROUTER = path.join(HIER, "..", "references", "tool-usecase-router.md");

let fehler = 0;
let geprueft = 0;
const zeile = (ok, text, detail) => {
  geprueft++;
  if (!ok) fehler++;
  console.log(`  [${ok ? "OK" : "!!"}]   ${text}`);
  if (detail) console.log(`         ${detail}`);
};

const catalog = parseCatalog(fs.readFileSync(CATALOG_PATH, "utf8"));
const byName = Object.fromEntries(catalog.map((row) => [row.name, row]));

zeile(Boolean(byName.Spline), "Katalog kennt Spline");
zeile(Boolean(byName.Haikei), "Katalog kennt Haikei");
zeile(Boolean(byName["shadcn/ui"]), "Katalog kennt shadcn/ui");

const expected = {
  Spline: "spline.design",
  Haikei: "haikei.app",
  "shadcn/ui": "ui.shadcn.com",
};

for (const [name, host] of Object.entries(expected)) {
  const row = byName[name];
  const item = row ? adapter(row) : null;
  zeile(
    Boolean(row) && row.officialUrl.includes(host) && item?.officialUrl === row.officialUrl,
    `gelieferter Adapter liefert Katalog-URL für ${name}`,
    row ? row.officialUrl : "fehlt",
  );
}

async function driveOpen(name, host) {
  const row = byName[name];
  if (!row) {
    zeile(false, `openOfficialPage ${name}`, "Katalogeintrag fehlt");
    return null;
  }
  try {
    const opened = await openOfficialPage(row);
    const bodyOk = typeof opened.excerpt === "string" && opened.excerpt.length > 0;
    const hostOk = opened.url.includes(host) && /https:\/\//.test(opened.url);
    const markerOk = Boolean(opened.marker);
    const channelOk = opened.channel === "fetch" || opened.channel === "firecrawl";
    zeile(
      hostOk && bodyOk && markerOk && channelOk && opened.bytes > 0,
      `openOfficialPage("${name}") URL + Site-Marker`,
      `${opened.channel} ${opened.httpStatus} ${opened.url} marker=${opened.marker} bytes=${opened.bytes}`,
    );
    return opened;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (error && error.code === "HOST_UNAVAILABLE") {
      zeile(true, `openOfficialPage("${name}") ehrlicher Host-Fail`, message);
      return { hostUnavailable: true, message, url: row.officialUrl };
    }
    zeile(false, `openOfficialPage("${name}")`, message);
    return null;
  }
}

const splineA = await driveOpen("Spline", "spline.design");
const splineB = await driveOpen("Spline", "spline.design");
if (splineA && splineB && !splineA.hostUnavailable && !splineB.hostUnavailable) {
  zeile(
    splineA.url === splineB.url && splineA.marker === splineB.marker && splineA.channel === splineB.channel,
    "zwei Spline-openOfficialPage-Läufe sind konsistent",
    `${splineA.channel}/${splineA.marker} vs ${splineB.channel}/${splineB.marker}`,
  );
} else if (splineA?.hostUnavailable && splineB?.hostUnavailable) {
  zeile(splineA.url === splineB.url, "zwei Spline-Host-Fails nennen dieselbe Katalog-URL");
}

await driveOpen("Haikei", "haikei.app");
await driveOpen("shadcn/ui", "ui.shadcn.com");

{
  const unknown = "DieseBibliothekGibtEsNicht";
  const cli = spawnSync("node", [ACCESS, "open", unknown], { encoding: "utf8", timeout: 20000 });
  const aus = `${cli.stderr || ""}${cli.stdout || ""}`;
  zeile(
    cli.status === 1 && /Resource not found/.test(aus) && !/https:\/\//.test(aus),
    "resource-access open Unbekannt = Exit 1 ohne erfundene URL",
    (aus.split("\n")[0] || "").slice(0, 160),
  );
}

{
  const skill = fs.readFileSync(SKILL, "utf8");
  const router = fs.readFileSync(ROUTER, "utf8");
  zeile(
    /resource-access\.mjs open/.test(skill) && /URL-Dump allein zählt nicht/.test(skill),
    "SKILL.md verlangt open nach Router-Wahl; URL-Dump zählt nicht",
  );
  zeile(
    /resource-access\.mjs open/.test(router)
      && /Nach jeder Router-Wahl ist `open` Pflicht/.test(router)
      && /zählt als Nutzung/.test(router)
      && /URL-Dump allein nicht/.test(router),
    "Router verlangt open als Pflicht vor Nutzung",
  );
}

console.log(`\n${geprueft - fehler}/${geprueft} wie erwartet.`);
if (fehler) process.exit(1);
console.log("Resource-open-Pfad stimmt.");
