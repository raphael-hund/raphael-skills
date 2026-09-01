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
import os from "node:os";
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
  /Bau-Session = Controller/.test(skill) && /PNG-Binaries/.test(skill),
  "web SKILL.md: Bau-Session ist Controller, Parent ohne PNG-Dump",
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

// ---------------------------------------------------------------------------
// session-gate.mjs: das Gate muss ein ausgefülltes Arbeitsprodukt verlangen,
// nicht nur einen Dateinamen. Jeder Fall hier war einmal ein echter Bypass.
// ---------------------------------------------------------------------------

const GATE = path.join(WEB, "scripts", "session-gate.mjs");

function gate(rolle, client) {
  return spawnSync("node", [GATE, "--rolle", rolle, "--client", client], {
    encoding: "utf8",
  }).status;
}

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "web-session-gate-"));
try {
  zeile(gate("plan", tmp) === 0, "Gate plan: legt PRUEFGEGEN.md an (Exit 0)");
  zeile(
    gate("kritik", tmp) === 2,
    "Gate kritik: unveränderte Template-Kopie bleibt gesperrt (Exit 2)",
  );

  const pruefgegen = path.join(tmp, "PRUEFGEGEN.md");
  const eigen = [
    "| Design | web | stil-regeln.md | Fold 1440 | Traegt der Hero ohne Erklaerung? |",
    "| Copy | copywriting | VOICE.md | Fold 390 | Klingt der Text nach dem Kunden? |",
  ].join("\n");
  fs.writeFileSync(
    pruefgegen,
    fs
      .readFileSync(pruefgegen, "utf8")
      .replace(/<!--\s*AUSFUELLEN\s*-->/i, "") + "\n" + eigen + "\n",
  );
  zeile(gate("kritik", tmp) === 0, "Gate kritik: ausgefüllte Datei öffnet (Exit 0)");

  const kritikDatei = path.join(tmp, "KRITIK-1.md");
  zeile(gate("bau", tmp) === 2, "Gate bau: ohne Kritik-Befund gesperrt (Exit 2)");
  fs.writeFileSync(kritikDatei, "");
  zeile(gate("bau", tmp) === 2, "Gate bau: leere KRITIK-1.md gesperrt (Exit 2)");
  fs.unlinkSync(kritikDatei);
  fs.mkdirSync(kritikDatei);
  zeile(gate("bau", tmp) === 2, "Gate bau: Verzeichnis statt Datei gesperrt (Exit 2)");
  fs.rmdirSync(kritikDatei);
  fs.symlinkSync(path.join(tmp, "gibt-es-nicht.md"), kritikDatei);
  zeile(gate("bau", tmp) === 2, "Gate bau: toter Symlink gesperrt (Exit 2)");
  fs.unlinkSync(kritikDatei);
  fs.writeFileSync(
    kritikDatei,
    [
      "# Kritik 1",
      "",
      "- Befund 1: Der Hero traegt nicht — kein visueller Anker im Fold, Desktop 1440x900.",
      "- Befund 2: Sektionsabstaende springen zwischen 48 und 112 Pixeln ohne Rhythmus.",
      "- Befund 3: Auf Mobil 390 bricht die CTA-Zeile in drei Zeilen um.",
      "",
    ].join("\n"),
  );
  zeile(gate("bau", tmp) === 0, "Gate bau: echter Kritik-Befund öffnet (Exit 0)");
  fs.writeFileSync(kritikDatei, "x");
  zeile(gate("bau", tmp) === 2, "Gate bau: Platzhalter-Byte statt Befund gesperrt (Exit 2)");

  zeile(gate("quatsch", tmp) === 64, "Gate: unbekannte Rolle ist Usage-Fehler (Exit 64)");

  // Ein untergeschobener Symlink darf die Ablage nicht aus dem Client tragen.
  const aussen = fs.mkdtempSync(path.join(os.tmpdir(), "web-gate-aussen-"));
  const zweit = fs.mkdtempSync(path.join(os.tmpdir(), "web-gate-zweit-"));
  try {
    fs.symlinkSync(path.join(aussen, "entwischt.md"), path.join(zweit, "PRUEFGEGEN.md"));
    const status = gate("plan", zweit);
    zeile(
      status === 2 && fs.readdirSync(aussen).length === 0,
      "Gate plan: schreibt nicht durch einen Symlink aus dem Client heraus",
      `Exit ${status}, außerhalb: ${fs.readdirSync(aussen).length}`,
    );
  } finally {
    fs.rmSync(aussen, { recursive: true, force: true });
    fs.rmSync(zweit, { recursive: true, force: true });
  }
} finally {
  fs.rmSync(tmp, { recursive: true, force: true });
}

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

const kritikRolle = fs.readFileSync(
  path.join(WEB, "references", "rolle-kritik.md"),
  "utf8",
);
zeile(
  /onpage-check\.mjs/.test(kritikRolle),
  "rolle-kritik.md nennt onpage-check.mjs als SEO-Gate-Beleg",
);
zeile(
  /Gate-Beleg/.test(kritikRolle) && /parkt/.test(kritikRolle),
  "Merge-Regel (d): Beleg noetig, sonst parkt der Befund",
);

// Die Merge-Regel steht an zwei Orten: kritik-matrix.md ist der Spawn-Plan,
// rolle-kritik.md die Rollen-Ebene. Divergieren sie, parkt ein Kritik-Agent
// SEO- und Copy-Befunde wieder weg — genau der alte Fehler.
const matrixText = fs.readFileSync(
  path.join(WEB, "references", "kritik-matrix.md"),
  "utf8",
);
zeile(
  /\(d\)/.test(matrixText) && /onpage-check\.mjs/.test(matrixText),
  "kritik-matrix.md kennt Merge-Regel (d) mit onpage-check.mjs",
);
zeile(
  /\(d\)/.test(matrixText) === /\(d\)/.test(kritikRolle),
  "Merge-Regel identisch in kritik-matrix.md und rolle-kritik.md",
);

// Dieselbe Aussage an mehreren Orten ist die Hauptquelle stiller Rueckfaelle:
// eine Datei wird gefixt, die andere bleibt auf dem alten Stand.
{
  const orte = [
    "SKILL.md",
    "references/anfaenger-pfad.md",
    "references/kritik-matrix.md",
    "references/rolle-bau.md",
    "references/rolle-kritik.md",
    "references/planner-executor-protokoll.md",
  ];
  const ledger = orte.filter((o) =>
    /pfad \| viewport \| gelesen-von \| verdict/.test(
      fs.readFileSync(path.join(WEB, o), "utf8"),
    ),
  );
  zeile(
    ledger.length >= 5,
    "Shot-Ledger-Spalten an allen Orten identisch",
    `gefunden in ${ledger.length}/${orte.length}`,
  );

  const skillText = fs.readFileSync(path.join(WEB, "SKILL.md"), "utf8");
  zeile(
    /Gate-Beleg/.test(skillText),
    "SKILL.md-Completion kennt den Gate-Beleg-Weg der Merge-Regel",
  );
}

console.log(`\n${geprueft - fehler}/${geprueft} wie erwartet.`);
if (fehler) process.exit(1);
console.log("Vorschau-vor-Launch-Vertrag und Session-Gate halten.");
