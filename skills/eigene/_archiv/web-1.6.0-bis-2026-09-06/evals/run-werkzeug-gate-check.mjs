#!/usr/bin/env node

import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
  mkdirSync,
  mkdtempSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const GATE = join(HERE, "..", "scripts", "werkzeug-gate.mjs");
const ROOT = mkdtempSync(join(tmpdir(), "werkzeug-gate-check-"));
const START = "<!-- WERKZEUGTABELLE:START -->";
const END = "<!-- WERKZEUGTABELLE:ENDE -->";

function write(path, content) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content);
}

function table(rows, prefix = "") {
  return `${prefix}${START}\n| Bedarf | Werkzeug | Befehl | Gate | Router-Anker |\n|---|---|---|---|---|\n${rows.join("\n")}\n${END}\n`;
}

function fixture(name, { files = {}, packageJson, rows, prefix = "" }) {
  const dir = join(ROOT, name);
  mkdirSync(dir, { recursive: true });
  for (const [relativePath, content] of Object.entries(files)) {
    write(join(dir, relativePath), content);
  }
  if (packageJson !== undefined) {
    write(join(dir, "package.json"), `${JSON.stringify(packageJson, null, 2)}\n`);
  }
  const tablePath = join(ROOT, `${name}-art-direction.md`);
  write(tablePath, table(rows, prefix));
  return { dir, tablePath };
}

function run(...args) {
  return spawnSync(process.execPath, [GATE, ...args], {
    cwd: ROOT,
    encoding: "utf8",
  });
}

function output(result) {
  return `${result.stdout ?? ""}${result.stderr ?? ""}`;
}

function expectExit(result, expected, label, fragment) {
  assert.equal(
    result.status,
    expected,
    `${label}: Exit ${result.status}, erwartet ${expected}\n${output(result)}`
  );
  if (fragment) {
    assert.match(output(result), fragment, `${label}: Diagnose fehlt\n${output(result)}`);
  }
}

const scenarios = [
  ["1/6 markierter Block statt erster Token-Tabelle", () => {
    const project = fixture("marked", {
      files: {
        "src/icon.js": 'import { Menu } from "lucide-react";\nexport { Menu };\n',
      },
      packageJson: {
        dependencies: { react: "1.0.0", "lucide-react": "1.0.0" },
      },
      prefix:
        "# Tokens\n\n| Token | Wert |\n|---|---|\n| color-brand | #123456 |\n\n# Werkzeuge\n\n",
      rows: ["| Icons | lucide-react | npm i lucide-react | ein System | #icons |"],
    });
    expectExit(
      run(project.dir, "--tabelle", project.tablePath, "--profile", "node"),
      0,
      "markierter Tabellenblock"
    );
  }],
  ["2/6 Node-Profil blockiert undokumentierte Dependency", () => {
    const project = fixture("node-undocumented", {
      files: { "src/index.js": "export const ready = true;\n" },
      packageJson: {
        dependencies: { react: "1.0.0", "date-fns": "1.0.0" },
      },
      rows: ["| Basis | CSS | n/a | n/a | #stack-primitives |"],
    });
    expectExit(
      run(project.dir, "--tabelle", project.tablePath, "--profile", "node"),
      1,
      "undokumentierte Node-Dependency",
      /Abhaengigkeiten ohne Zeile/
    );
  }],
  ["3/6 Static-Profil besteht ohne package.json", () => {
    const project = fixture("static", {
      files: { "index.html": "<!doctype html><title>Static</title><main>OK</main>\n" },
      rows: ["| Basis | HTML und CSS | n/a | n/a | #stack-primitives |"],
    });
    expectExit(
      run(project.dir, "--tabelle", project.tablePath, "--profile", "static"),
      0,
      "statische HTML-Site"
    );
  }],
  ["4/6 CMS-Profil ohne JS gruen, Custom-Dependency rot", () => {
    const cmsOnly = fixture("cms-only", {
      rows: ["| Basis | CMS-Theme | n/a | n/a | #stack-primitives |"],
    });
    expectExit(
      run(cmsOnly.dir, "--tabelle", cmsOnly.tablePath, "--profile", "cms"),
      0,
      "CMS-only ohne Custom-JavaScript"
    );

    const custom = fixture("cms-custom", {
      files: {
        "custom.js": 'import Alpine from "alpinejs";\nwindow.Alpine = Alpine;\n',
      },
      packageJson: { dependencies: { alpinejs: "1.0.0" } },
      rows: ["| Basis | CMS-Theme | n/a | n/a | #stack-primitives |"],
    });
    expectExit(
      run(custom.dir, "--tabelle", custom.tablePath, "--profile", "cms"),
      1,
      "CMS-Custom-Dependency ohne Tabellenzeile",
      /Abhaengigkeiten ohne Zeile/
    );
  }],
  ["5/6 CLI und Router-Anker enden fail-closed mit Exit 2", () => {
    const project = fixture("cli", {
      files: { "src/index.js": "export const ready = true;\n" },
      packageJson: { dependencies: { react: "1.0.0" } },
      rows: ["| Basis | CSS | n/a | n/a | #stack-primitives |"],
    });

    expectExit(run(project.dir, "--profile", "node"), 2, "fehlendes --tabelle", /--tabelle/);
    expectExit(run(project.dir, "--tabelle", project.tablePath), 2, "fehlendes --profile", /--profile/);
    expectExit(
      run(project.dir, "--tabelle", project.tablePath, "--profile", "wordpress"),
      2,
      "unbekanntes Profil",
      /unbekanntes Profil/
    );
    expectExit(
      run(project.dir, "--tabelle", project.tablePath, "--profile", "node", "--skip-deps"),
      2,
      "unbekanntes Flag",
      /unbekanntes Flag/
    );
    expectExit(
      run(project.dir, "--tabelle", join(ROOT, "fehlt.md"), "--profile", "node"),
      2,
      "fehlende Tabellendatei",
      /Tabellendatei fehlt/
    );

    const unknownAnchor = fixture("unknown-anchor", {
      files: { "src/index.js": "export const ready = true;\n" },
      packageJson: { dependencies: { react: "1.0.0" } },
      rows: ["| Basis | CSS | n/a | n/a | #nicht-im-router |"],
    });
    expectExit(
      run(unknownAnchor.dir, "--tabelle", unknownAnchor.tablePath, "--profile", "node"),
      2,
      "unbekannter Router-Anker",
      /unbekannter Router-Anker/
    );
  }],
  ["6/6 framer-motion rot, motion/react nur mit Reduced Motion gruen", () => {
    const framer = fixture("framer", {
      files: {
        "src/card.jsx":
          'import { motion, useReducedMotion } from "framer-motion";\n' +
          "export function Card() { const reduce = useReducedMotion(); return <motion.div animate={reduce ? {} : { opacity: 1 }} />; }\n",
      },
      packageJson: { dependencies: { react: "1.0.0", "framer-motion": "1.0.0" } },
      rows: ["| Motion | framer-motion | npm i framer-motion | Reduced Motion | #motion |"],
    });
    expectExit(
      run(framer.dir, "--tabelle", framer.tablePath, "--profile", "node"),
      1,
      "framer-motion",
      /framer-motion/
    );

    const motionBad = fixture("motion-bad", {
      files: {
        "src/card.jsx":
          'import { motion } from "motion/react";\n' +
          "export function Card() { return <motion.div animate={{ opacity: 1 }} />; }\n",
      },
      packageJson: { dependencies: { react: "1.0.0", motion: "1.0.0" } },
      rows: ["| Motion | motion (Import motion/react) | npm i motion | Reduced Motion | #motion |"],
    });
    expectExit(
      run(motionBad.dir, "--tabelle", motionBad.tablePath, "--profile", "node"),
      1,
      "motion/react ohne Reduced Motion",
      /Motion ohne Reduced-Motion-Behandlung/
    );

    const motionGood = fixture("motion-good", {
      files: {
        "src/card.jsx":
          'import { motion, useReducedMotion } from "motion/react";\n' +
          "export function Card() { const reduce = useReducedMotion(); return <motion.div animate={reduce ? {} : { opacity: 1 }} />; }\n",
      },
      packageJson: { dependencies: { react: "1.0.0", motion: "1.0.0" } },
      rows: ["| Motion | motion (Import motion/react) | npm i motion | Reduced Motion | #motion |"],
    });
    expectExit(
      run(motionGood.dir, "--tabelle", motionGood.tablePath, "--profile", "node"),
      0,
      "motion/react mit Reduced Motion"
    );
  }],
];

let failed = 0;
try {
  console.log("Werkzeug-Gate-Check — 6 Planszenarien\n");
  for (const [name, scenario] of scenarios) {
    try {
      scenario();
      console.log(`PASS ${name}`);
    } catch (error) {
      failed++;
      console.error(`FAIL ${name}`);
      console.error(error.message);
    }
  }
} finally {
  rmSync(ROOT, { recursive: true, force: true });
}

if (failed > 0) {
  console.error(`\nWerkzeug-Gate-Check: FAIL (${failed}/6 Szenarien rot)`);
  process.exit(1);
}
console.log("\nWerkzeug-Gate-Check: OK (6/6)");
