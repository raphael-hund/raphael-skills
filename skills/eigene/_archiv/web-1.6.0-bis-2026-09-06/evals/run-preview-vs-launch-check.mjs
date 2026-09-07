#!/usr/bin/env node
/** Echte Befundklassifizierung und CLI-Verträge. Kein Modell-/Website-PASS. */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  darfBiggestGapSein,
  klassifiziereBefund,
} from "../scripts/preview-befund-klasse.mjs";

const HIER = path.dirname(fileURLToPath(import.meta.url));
const WEB = path.join(HIER, "..");
const SKILL = path.join(WEB, "SKILL.md");
const KLASS = path.join(WEB, "scripts", "preview-befund-klasse.mjs");
let fehler = 0;
let geprueft = 0;

function zeile(ok, text, detail) {
  geprueft++;
  if (!ok) fehler++;
  console.log(`  [${ok ? "OK" : "!!"}]   ${text}`);
  if (!ok && detail) console.log(`         ${detail}`);
}

console.log("\nPreview vs Launch — Befund und Auftragsumfang\n");

for (const finding of ["Formular sendet HTTP 500", "Dialog lässt sich nicht schließen", "Tastaturfokus verschwindet nach Öffnen"]) {
  zeile(darfBiggestGapSein(finding, "preview"), `Anwendbarer Funktionsfehler blockiert Vorschau: ${finding}`);
}
zeile(darfBiggestGapSein("Tippfehler im Hero", "preview", { required: true }), "Explizit beauftragte Textkorrektur wird nicht weggeparkt");
zeile(!darfBiggestGapSein("Tippfehler im Hero", "preview"), "Unbeauftragter Copy-Nit behält Vorschau-Einordnung");

const faelle = [
  {
    text: "50 vs 60 Google-Bewertungen",
    klasse: "content-park",
    preview: "park",
    gap: false,
  },
  {
    text: "Custom-Domain noch nicht mit Vercel verbunden",
    klasse: "ops-park",
    preview: "park",
    gap: false,
  },
  {
    text: "Wir können nicht 24 oder 28 Stunden versprechen",
    klasse: "content-park",
    preview: "park",
    gap: false,
  },
  {
    text: "Kopf im Hero angeschnitten",
    klasse: "visual-block",
    preview: "block",
    gap: true,
  },
  {
    text: "Vier Button-Familien, keine Einheit",
    klasse: "visual-block",
    preview: "block",
    gap: true,
  },
  {
    text: "Erfundene 500 Google-Bewertungen",
    klasse: "content-park",
    preview: "park",
    gap: false,
  },
  {
    text: "Die Seite sieht behindert aus, und die Bewertungszahl ist 50 statt 60",
    klasse: "visual-block",
    preview: "block",
    gap: true,
  },
  {
    text: "Sitemap fehlt die Leistungsseite",
    klasse: "struktur-block",
    preview: "block",
    gap: true,
  },
  {
    text: "Satz im Hero ist falsch",
    klasse: "content-park",
    preview: "park",
    gap: false,
  },
  {
    text: "sichtbare Platzhalter im Hero",
    klasse: "visual-block",
    preview: "block",
    gap: true,
  },
  {
    text: "kein einziges Foto auf einer Handwerker-Seite",
    klasse: "visual-block",
    preview: "block",
    gap: true,
  },
  {
    text: "Domain fehlt",
    klasse: "ops-park",
    preview: "park",
    gap: false,
  },
];

for (const fall of faelle) {
  const treffer = klassifiziereBefund(fall.text);
  zeile(
    treffer.klasse === fall.klasse && treffer.preview === fall.preview,
    `Klassifizierer: ${fall.klasse}/${fall.preview}`,
    `Eingabe: ${fall.text} → ${treffer.klasse}/${treffer.preview}`,
  );
  zeile(
    darfBiggestGapSein(fall.text, "preview") === fall.gap,
    `biggest_gap-Vorschau ${fall.gap ? "ja" : "nein"}: ${fall.klasse}`,
  );
}


zeile(
  darfBiggestGapSein("Erfundene 500 Google-Bewertungen", "launch") === true,
  "Launch: erfundene Reviews sind launch-block, Vorschau nicht",
);
{
  const r = spawnSync("node", [KLASS], { encoding: "utf8" });
  zeile(
    r.status === 2 && /usage:/.test(`${r.stderr || ""}${r.stdout || ""}`),
    "CLI ohne Argument = Exit 2 Usage",
  );
}

{
  const r = spawnSync("node", [KLASS, "50 vs 60 Google-Bewertungen"], {
    encoding: "utf8",
  });
  const aus = `${r.stdout || ""}`;
  zeile(
    r.status === 0 && /^content-park\tpark\s*$/.test(aus.trim()),
    "CLI: Bewertungszahl → content-park/park",
    aus.trim(),
  );
}

{
  const r = spawnSync(
    "node",
    [KLASS, "--json", "Custom-Domain noch nicht mit Vercel verbunden"],
    { encoding: "utf8" },
  );
  let parsed = null;
  try {
    parsed = JSON.parse(r.stdout || "");
  } catch {
    parsed = null;
  }
  zeile(
    r.status === 0 &&
      parsed?.klasse === "ops-park" &&
      parsed?.preview === "park",
    "CLI --json: Domain/Vercel → ops-park",
    r.stdout?.trim(),
  );
}

{
  const r = spawnSync(
    "node",
    [KLASS, "--json", "sichtbare Platzhalter im Hero"],
    { encoding: "utf8" },
  );
  let parsed = null;
  try {
    parsed = JSON.parse(r.stdout || "");
  } catch {
    parsed = null;
  }
  zeile(
    r.status === 0 && parsed?.klasse === "visual-block" && parsed?.preview === "block",
    "CLI --json: Platzhalter im Hero → visual-block",
    r.stdout?.trim(),
  );
}

{
  const r = spawnSync(
    "node",
    [KLASS, "--json", "kein einziges Foto auf einer Handwerker-Seite"],
    { encoding: "utf8" },
  );
  let parsed = null;
  try {
    parsed = JSON.parse(r.stdout || "");
  } catch {
    parsed = null;
  }
  zeile(
    r.status === 0 && parsed?.klasse === "visual-block" && parsed?.preview === "block",
    "CLI --json: kein Foto → visual-block",
    r.stdout?.trim(),
  );
}

{
  const r = spawnSync("node", [KLASS, "--json", "Domain fehlt"], {
    encoding: "utf8",
  });
  let parsed = null;
  try {
    parsed = JSON.parse(r.stdout || "");
  } catch {
    parsed = null;
  }
  zeile(
    r.status === 0 && parsed?.klasse === "ops-park" && parsed?.preview === "park",
    "CLI --json: Domain ohne Vercel-Wort → ops-park",
    r.stdout?.trim(),
  );
}

// ---------------------------------------------------------------------------
// Regressionsschutz für die zwei Löcher, an denen die Vorschau historisch
// falsch entschieden hat: schlechtes Design kam nicht durch, Content-Nits
// blockten. Beide Richtungen werden am echten Klassifizierer geprüft.
// ---------------------------------------------------------------------------

const KLASSEN_FAELLE = [
  ["Hero sieht billig aus", "visual-block"],
  ["wirkt lieblos und generisch", "visual-block"],
  ["kein visueller Anker im Fold", "visual-block"],
  ["sichtbare Platzhalter im Hero", "visual-block"],
  ["kein einziges Foto auf einer Handwerker-Seite", "visual-block"],
  ["50 statt 60 Google-Bewertungen sichtbar im Hero", "content-park"],
  ["sichtbarer Tippfehler im Hero", "content-park"],
  ["Custom-Domain sichtbar im Footer", "ops-park"],
  ["Custom-Domain zeigt noch auf Telekom", "ops-park"],
  ["Sitemap hat keine Leistungsseite", "struktur-block"],
  // Kimi-P0 01.09.: "fold" stand im VISUAL-Regex — der kanonische Shot-Ort
  // machte jeden Content-Nit zum Vorschau-Blocker. Goldfaelle sagten nur "Hero".
  ["50 statt 60 Google-Bewertungen im Fold", "content-park"],
  ["sichtbarer Tippfehler im Fold", "content-park"],
  ["Custom-Domain im Fold sichtbar", "ops-park"],
  ["Tippfehler im Layout der Preisliste", "content-park"],
  ["kein visueller Anker im Fold", "visual-block"],
  ["Fold tot, nur Text ohne Anker", "visual-block"],
  ["Layout kaputt im Fold", "visual-block"],
  // Kimi-Rest 01.09.: Review-Platzhalter ist laut Roter Linie 5 ein Swap,
  // wurde aber ueber VISUAL_KONTEXT+platzhalter zum visual-block.
  ["Review-Platzhalter im Fold", "content-park"],
  ["Platzhalter-Review sichtbar im Hero", "content-park"],
  ["Platzhalter-Kundenstimme im Fold", "content-park"],
  ["Platzhalter-Grafik im Hero", "visual-block"],
];

for (const [befund, erwartet] of KLASSEN_FAELLE) {
  const ist = klassifiziereBefund(befund).klasse;
  zeile(ist === erwartet, `Klassifizierer: "${befund}" -> ${erwartet}`, `ist: ${ist}`);
}

zeile(
  darfBiggestGapSein("Hero sieht billig aus", "preview") === true,
  "Schlechtes Design darf in der Vorschau biggest_gap sein",
);
zeile(
  darfBiggestGapSein("50 statt 60 Google-Bewertungen sichtbar im Hero", "preview") === false,
  "Sichtbarer Content-Nit ist kein Vorschau-biggest_gap",
);

// Der explizite Session-Vertrag hat eigene ausführbare Gegenproben in
// run-evidence-contract-check.mjs. Keine alte Dateinamen-/Längenheuristik hier.

// ---------------------------------------------------------------------------
// onpage-check.mjs ist der Gate-Beleg, den Merge-Regel (d) fuer die SEO-Linse
// verlangt. Ohne dieses Skript waere die Regel unerfuellbar.
// ---------------------------------------------------------------------------

const ONPAGE = path.join(WEB, "scripts", "onpage-check.mjs");
zeile(fs.existsSync(ONPAGE), "onpage-check.mjs existiert (Gate-Beleg der SEO-Linse)");

{
  const r = spawnSync("node", [ONPAGE], { encoding: "utf8" });
  zeile(r.status === 64, "onpage-check ohne Argumente ist Usage-Fehler (Exit 64)");
}
{
  const r = spawnSync("node", [ONPAGE, "--base", "file:///tmp", "--routes", "/"], {
    encoding: "utf8",
  });
  zeile(r.status === 64, "onpage-check lehnt file:// ab (Exit 64)");
}

console.log(`\n${geprueft - fehler}/${geprueft} wie erwartet.`);
if (fehler) process.exit(1);
console.log("Befundklassifizierung und CLI-Verträge halten.");
