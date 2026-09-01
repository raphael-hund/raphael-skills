#!/usr/bin/env node
/**
 * run-preview-vs-launch-check.mjs — Vorschau entscheidet das Bild, nicht die Zahl.
 *
 * Beleg 01.09.2026 (Cowork-Webland): Planner/Kritiker blockten oder holten
 * Quick-Wins an 50-vs-60-Google-Bewertungen, unverbundener Custom-Domain und
 * 24-vs-28h-SLA, während die Seite visuell durchfiel.
 *
 * Diese Eval hält drei Dinge fest:
 *   1. Der Klassifizierer parkt Fakten-/Ops-Nits und lässt Visual gewinnen.
 *   2. CLI gibt Klasse + preview-Feld, Exit 2 ohne Argument.
 *   3. Die Skill-Prosa (web + website-plan + visual-aaa) widerspricht dem
 *      nicht mehr: Vorschau ≠ Launch, FAKT-GATE, biggest_gap darf kein Park sein.
 *
 *   node evals/run-preview-vs-launch-check.mjs
 *
 * Exit 0 = alle Fälle, 1 = mindestens ein Fall rot, 2 = Skript/Dateien fehlen.
 */
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
const LOOP = path.join(WEB, "references", "screenshot-kritik-loop.md");
const QA = path.join(WEB, "references", "qa-faecher.md");
const ANF = path.join(WEB, "references", "anfaenger-pfad.md");
const PLAN = path.join(WEB, "..", "website-plan", "SKILL.md");
const VALIDATOR = path.join(WEB, "..", "website-plan", "scripts", "validate-plan.py");
const KONTRAKT = path.join(WEB, "..", "visual-aaa", "references", "kritiker-kontrakt.md");

let fehler = 0;
let geprueft = 0;

function zeile(ok, text, detail) {
  geprueft++;
  if (!ok) fehler++;
  console.log(`  [${ok ? "OK" : "!!"}]   ${text}`);
  if (!ok && detail) console.log(`         ${detail}`);
}

for (const [p, was] of [
  [SKILL, "web/SKILL.md"],
  [KLASS, "preview-befund-klasse.mjs"],
  [LOOP, "screenshot-kritik-loop.md"],
  [QA, "qa-faecher.md"],
  [ANF, "anfaenger-pfad.md"],
]) {
  if (!fs.existsSync(p)) {
    console.error(`FEHLER: ${was} fehlt: ${p}`);
    process.exit(2);
  }
}

const skill = fs.readFileSync(SKILL, "utf8");
const loop = fs.readFileSync(LOOP, "utf8");
const qa = fs.readFileSync(QA, "utf8");
const anf = fs.readFileSync(ANF, "utf8");

console.log("\nPreview vs Launch — Bild vor Zahl\n");

const faelle = [
  {
    text: "50 vs 60 Google-Bewertungen",
    klasse: "fakt-park",
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
    klasse: "fakt-park",
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
    klasse: "fake-proof",
    preview: "launch-block",
    gap: false,
  },
  {
    text: "Die Seite sieht behindert aus, und die Bewertungszahl ist 50 statt 60",
    klasse: "visual-block",
    preview: "block",
    gap: true,
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
    r.status === 0 && /^fakt-park\tpark\s*$/.test(aus.trim()),
    "CLI: Bewertungszahl → fakt-park/park",
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

zeile(
  /FAKT-GATE/.test(skill) && /Kunden-Vorschau/.test(skill),
  "web SKILL.md nennt FAKT-GATE und Kunden-Vorschau",
);
zeile(
  !/der Web-Skill entscheidet keine Kundenfakten eigenmächtig/.test(skill),
  "web SKILL.md blockt Build nicht mehr an unklaren Kundenfakten",
);
zeile(
  /preview-befund-klasse\.mjs/.test(skill) || /preview-befund-klasse\.mjs/.test(loop),
  "Klassifizierer ist in web SKILL oder Kritik-Loop verdrahtet",
);
zeile(
  /Kunden-Vorschau/.test(anf) && /FAKT-GATE/.test(anf),
  "anfaenger-pfad.md hat Auftrag Kunden-Vorschau mit FAKT-GATE",
);
zeile(
  /biggest_gap/.test(loop) && /fakt-park|FAKT-GATE/.test(loop),
  "screenshot-kritik-loop: Fakten-Nit darf nicht biggest_gap sein",
);
zeile(
  /Fach 6/.test(qa) && /Launch/.test(qa) && /Vorschau/.test(qa),
  "qa-faecher.md: Trust-Zahlen sind Launch, nicht Vorschau",
);
zeile(
  /Executor = Controller/.test(skill) && /PNG-Binaries/.test(skill),
  "web SKILL.md: Executor ist Controller, Parent ohne PNG-Dump",
);
zeile(
  /müssen/.test(skill) && /orchestrate/.test(skill) && !/Liste nicht nachladen/.test(skill),
  "Slash-Dump wirft /orchestrate nicht mehr weg",
);
zeile(
  /Kritik-Leaf/.test(skill) && /Shot-Ledger/.test(skill),
  "Start-hier: PNG-Read ist Kritik-Leaf, Parent nur Ledger",
);



zeile(
  /kritik-matrix\.md/.test(skill) && /Drei Sessions/.test(skill),
  "web SKILL.md: drei Sessions + kritik-matrix",
);
const matrix = fs.readFileSync(path.join(WEB, "references", "kritik-matrix.md"), "utf8");
zeile(
  /PAGE/.test(matrix) && /SITE/.test(matrix) && /LENS/.test(matrix) && /PRUEFGEGEN/.test(matrix),
  "kritik-matrix.md: PAGE + SITE + LENS + PRUEFGEGEN",
);

if (fs.existsSync(PLAN) && fs.existsSync(VALIDATOR)) {
  const plan = fs.readFileSync(PLAN, "utf8");
  const validator = fs.readFileSync(VALIDATOR, "utf8");
  zeile(
    /FAKT-GATE/.test(plan) && /intent-verändernde Mehrdeutigkeit/.test(plan),
    "website-plan: FAKT-GATE, nur intent-verändernde Mehrdeutigkeit blockt",
  );
  zeile(
    /OWNER-BLOCKER/.test(validator) &&
      !/BLOCKING_MARKERS = \([\s\S]*PLACEHOLDER/.test(validator),
    "validate-plan.py: PLACEHOLDER/TODO blocken PLAN_VERIFIED nicht mehr",
  );
} else {
  zeile(false, "website-plan SKILL/Validator erreichbar");
}

if (fs.existsSync(KONTRAKT)) {
  const kontrakt = fs.readFileSync(KONTRAKT, "utf8");
  zeile(
    /FAKT-GATE|fakt-park|Bewertungszahl/.test(kontrakt),
    "visual-aaa kritiker-kontrakt: Fact-Nit ist kein biggest_gap",
  );
} else {
  zeile(false, "visual-aaa kritiker-kontrakt.md erreichbar");
}

console.log(`\n${geprueft - fehler}/${geprueft} wie erwartet.`);
if (fehler) process.exit(1);
console.log("Vorschau-vor-Launch-Vertrag hält.");
