#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

function usage() {
  console.log(`Usage:
  node scripts/audit-clone.mjs --project <clone-dir> [--brand "KOKUYO,Original Brand"] [--out CLONE_AUDIT.md]

Scans clone source files for tracking scripts, original-brand residue, Japanese residue, TODOs, and risky external dependencies.
`);
}

function parseArgs(argv) {
  // `project` bewusst OHNE Voreinstellung. Bis zum 31.07.2026 stand hier
  // process.cwd(): `node audit-clone.mjs` ohne Argument scannte den Ordner, in
  // dem man gerade stand, schrieb CLONE_AUDIT.md hinein und endete mit Exit 0.
  // Gemessen — die Datei landete im scripts/-Ordner dieses Skills.
  //
  // Dasselbe Muster wie bei import-check (--src fiel still auf '.' zurueck):
  // ein Bericht ueber das falsche Projekt sieht aus wie ein Bericht ueber das
  // richtige. Bei einem Werkzeug, das fremde Tracker im Klon sucht, heisst das
  // "keine Funde" ueber Code, den niemand angesehen hat.
  const out = { project: "", brand: [], out: "CLONE_AUDIT.md" };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") out.help = true;
    else if (arg === "--project") out.project = argv[++i] || process.cwd();
    else if (arg === "--brand") out.brand = (argv[++i] || "").split(",").map((s) => s.trim()).filter(Boolean);
    else if (arg === "--out") out.out = argv[++i] || "CLONE_AUDIT.md";
    // JSON-Ausgabe nachgetragen 29.07.2026. Bis dahin schrieb dieses Werkzeug
    // NUR Markdown fuer menschliche Augen — und endete immer mit Exit 0, auch
    // wenn es einen Google-Tracker im Klon gefunden hatte. Damit war der einzige
    // Pruefer auf Tracking-Reste und Fremdmarken maschinell nicht auswertbar:
    // klon-gate.mjs konnte seine Funde nicht lesen, kein Tor konnte an ihnen
    // blocken. Ein Fund, den niemand abfragen kann, stoppt keine Auslieferung.
    else if (arg === "--json") out.json = argv[++i] || "";
    else {
      // Aufruffehler, kein Lauffehler: der Handler unten macht daraus
      // Exit 2 ('Werkzeug/Aufruf nicht bereit') statt Exit 1
      // ('Qualitaet gerissen'). Siehe web/SKILL.md.
      const e = new Error(`Unexpected argument: ${arg}`);
      e.aufruffehler = true;
      throw e;
    }
  }
  return out;
}

const includeExt = new Set([".html", ".css", ".js", ".jsx", ".ts", ".tsx", ".json", ".md", ".txt", ".svg"]);
const skipDirs = new Set([".git", "node_modules", "dist", "build", ".next", ".nuxt", "coverage", "RECON"]);
const skipFiles = new Set(["NOTES.md", "TEARDOWN.md", "CLONE_REPORT.md", "CLONE_AUDIT.md", "REPLACE_GUIDE.md"]);

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (skipDirs.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "screenshots") continue;
      walk(full, files);
    } else if (!skipFiles.has(entry.name) && includeExt.has(path.extname(entry.name).toLowerCase())) {
      files.push(full);
    }
  }
  return files;
}

function lineNumber(text, index) {
  return text.slice(0, index).split("\n").length;
}

function collectMatches(file, text, checks) {
  const findings = [];
  for (const check of checks) {
    const regex = new RegExp(check.pattern, check.flags || "gi");
    for (const match of text.matchAll(regex)) {
      const matchedText = String(match[0]);
      if (check.type === "external" && /^https?:\/\/(www\.)?w3\.org\//i.test(matchedText)) continue;
      findings.push({
        type: check.type,
        label: check.label,
        file,
        line: lineNumber(text, match.index || 0),
        match: matchedText.slice(0, 160),
      });
    }
  }
  return findings;
}

function markdown(findings, project, scannedFiles) {
  const byType = new Map();
  for (const finding of findings) {
    if (!byType.has(finding.type)) byType.set(finding.type, []);
    byType.get(finding.type).push(finding);
  }
  const types = [
    ["tracking", "Tracking-Skripte / Zaehl-Pixel"],
    ["brand", "Marken-Reste der Originalseite"],
    ["japanese", "Japanische Textreste"],
    ["todo", "TODO / Platzhalter-Inhalte"],
    ["external", "Externe Abhaengigkeiten / Links nach draussen"],
  ];
  const lines = [
    `# Clone Audit`,
    "",
    `- Project: ${project}`,
    `- Scanned files: ${scannedFiles}`,
    `- Findings: ${findings.length}`,
    "",
  ];

  for (const [type, title] of types) {
    const items = byType.get(type) || [];
    lines.push(`## ${title}`);
    if (!items.length) {
      lines.push("- nichts gefunden");
      lines.push("");
      continue;
    }
    for (const item of items.slice(0, 200)) {
      lines.push(`- ${path.relative(project, item.file)}:${item.line} · ${item.label} · \`${item.match.replaceAll("`", "'")}\``);
    }
    if (items.length > 200) lines.push(`- ${items.length - 200} weitere, hier nicht ausgeklappt`);
    lines.push("");
  }

  lines.push("## Fazit");
  lines.push(findings.length
    ? "- Die Funde oben muessen weg, bevor irgendjemand \"kann ausgeliefert werden\" sagt."
    : "- Keine offensichtlichen Reste. Bildrechte und Screenshots pruefen bleibt trotzdem Handarbeit.");
  return `${lines.join("\n")}\n`;
}

try {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    usage();
    process.exit(0);
  }

  if (!args.project) {
    console.error("Fehler: --project fehlt.");
    usage();
    process.exit(2);
  }
  const project = path.resolve(args.project);
  if (!fs.existsSync(project)) throw new Error(`Project not found: ${project}`);

  const brandPatterns = args.brand.map((brand) => ({
    type: "brand",
    label: `brand residue: ${brand}`,
    pattern: brand.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
    flags: "gi",
  }));

  const checks = [
    { type: "tracking", label: "Google Tag Manager", pattern: "googletagmanager|GTM-[A-Z0-9]+", flags: "gi" },
    { type: "tracking", label: "Google Analytics / gtag", pattern: "google-analytics|gtag\\s*\\(|ga\\s*\\(", flags: "gi" },
    { type: "tracking", label: "Meta Pixel / fbq", pattern: "connect\\.facebook\\.net|fbq\\s*\\(", flags: "gi" },
    { type: "tracking", label: "Hotjar / Clarity", pattern: "hotjar|clarity\\.ms|hj\\s*\\(", flags: "gi" },
    { type: "japanese", label: "Japanese kana residue", pattern: "[\\u3040-\\u30ff]{2,}", flags: "g" },
    { type: "todo", label: "TODO / placeholder content", pattern: "TODO|FIXME|lorem ipsum|待补|这里填写", flags: "gi" },
    { type: "external", label: "external URL", pattern: "https?://[^\\s\"')<>]+", flags: "gi" },
    ...brandPatterns,
  ];

  const files = walk(project);
  const findings = [];
  for (const file of files) {
    const text = fs.readFileSync(file, "utf8");
    findings.push(...collectMatches(file, text, checks));
  }

  const output = path.resolve(args.out);
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, markdown(findings, project, files.length));
  console.log(output);

  // Dieselben Funde maschinenlesbar. Das Feld heisst `blockers`, weil es genau
  // das sind: Tracking-Code der fremden Seite, deren Markennamen, TODO-Reste —
  // jeder davon stoppt einen Launch. `findings` bleibt als Alias, damit
  // bestehende Leser nicht brechen.
  if (args.json !== undefined) {
    const jsonPfad = path.resolve(args.json || output.replace(/\.md$/i, "") + ".json");
    fs.mkdirSync(path.dirname(jsonPfad), { recursive: true });
    fs.writeFileSync(jsonPfad, `${JSON.stringify({
      project,
      scannedFiles: files.length,
      blockers: findings,
      findings,
    }, null, 2)}\n`);
    console.log(jsonPfad);
  }
} catch (error) {
  console.error(`audit-clone failed: ${error.message}`);
  // Ein vertipptes Flag ist keine gerissene Qualitaet. Exit 1 hiesse
  // 'geprueft und durchgefallen' — geprueft wurde aber nichts.
  process.exit(error.aufruffehler ? 2 : 1);
}
