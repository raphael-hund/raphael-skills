#!/usr/bin/env node
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

function usage() {
  console.log(`Usage:
  node scripts/init-clone.mjs <slug> [--url <url>] [--mode <mode>] [--level <L1-L6>]

Creates:
  ~/projects/website-clones/<slug>-clone/
  ~/projects/website-clones/<slug>-clone/NOTES.md
  ~/projects/website-clones/<slug>-clone/RECON/screenshots/
`);
}

function parseArgs(argv) {
  const out = { slug: null, url: "", mode: "", level: "" };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") out.help = true;
    else if (arg === "--url") out.url = argv[++i] || "";
    else if (arg === "--mode") out.mode = argv[++i] || "";
    else if (arg === "--level") out.level = argv[++i] || "";
    else if (arg.startsWith("-")) {
      // Gemessen 31.07.2026: ohne diese Zeile wurde `--tippfehler` zum
      // PROJEKTNAMEN. Der Testlauf legte tatsaechlich
      // /root/projects/website-clones/diesesflaggibtsnicht-clone an — ein
      // vertipptes Flag erzeugte ein Projekt samt Ordnerstruktur. Der Slug-Zweig
      // unten nimmt alles an, was nicht schon als Flag erkannt wurde; ein
      // fuehrendes "-" ist nie ein Projektname.
      const e = new Error(`Unbekanntes Flag: ${arg}`);
      e.aufruffehler = true;
      throw e;
    }
    else if (!out.slug) out.slug = arg;
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

function cleanSlug(input) {
  return input
    .trim()
    .toLowerCase()
    .replace(/https?:\/\//g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function notesTemplate({ name, url, mode, level }) {
  return `# ${name} · Klon-Notizen

## Woher
- Original-URL: ${url}
- Quellcode-Repo: 
- Urheber: 
- Lizenz: 
- Verlangte Namensnennung: 

## Technik
- Framework / wichtige Libraries / Node-Version: 

## Einschaetzung vor dem Nachbau
- Schwierigkeitsstufe: ${level}
- Empfohlener Modus: ${mode}
- Was originalgetreu machbar ist: 
- Was nur angenaehert oder ersetzt wird: 
- Was gar nicht geklont wird: 
- Groesste Risiken: 

## Starten
\`\`\`bash
cd ~/projects/website-clones/${name}
python3 -m http.server 8123
\`\`\`

## Was geaendert wurde (gegenueber dem Original)
- 

## Original gegen Klon
| Bereich | Original | Klon | Unterschied / bewusste Entscheidung | Beleg |
|---|---|---|---|---|
| Erster Bildschirm |  |  |  |  |
| Navigation |  |  |  |  |
| Kern-Animationen |  |  |  |  |
| Inhaltsbloecke |  |  |  |  |
| Mobil |  |  |  |  |

## Bewertung des Nachbaus
- Belege aus der Quelle: /5
- Struktur getroffen: /5
- Optik getroffen: /5
- Bewegung / Bedienung: /5
- Responsiv: /5
- Funktionen vollstaendig: /5
- Inhalte ersetzt: /5
- Rechts- und Deploy-Risiko: /5
- Gesamt: 

## Austausch-Karte (was wird wo geaendert)
- Texte -> Datei, Zeile
- Bilder/Medien -> Ordner
- Farben -> CSS-Variablen / Theme
- 3D-Modelle / Schriften -> 

## Nachweis
- [ ] Laeuft lokal, 0 Fehler in der Konsole
- [ ] Screenshots gegen das Original gehalten (RECON/screenshots/)
- Was sich NICHT pruefen liess (ehrlich eintragen, nichts erfinden): 
`;
}

try {
  const args = parseArgs(process.argv.slice(2));
  if (args.help || !args.slug) {
    usage();
    process.exit(args.help ? 0 : 1);
  }

  const slug = cleanSlug(args.slug);
  if (!slug) throw new Error("Slug is empty after normalization.");
  const name = slug.endsWith("-clone") ? slug : `${slug}-clone`;
  const root = path.join(os.homedir(), "projects", "website-clones");
  const project = path.join(root, name);

  if (fs.existsSync(project)) {
    throw new Error(`Project already exists: ${project}`);
  }

  fs.mkdirSync(path.join(project, "RECON", "screenshots"), { recursive: true });
  fs.writeFileSync(
    path.join(project, "NOTES.md"),
    notesTemplate({
      name,
      url: args.url,
      mode: args.mode,
      level: args.level,
    })
  );
  fs.writeFileSync(path.join(project, ".gitignore"), "node_modules/\n.DS_Store\n");

  console.log(project);
} catch (error) {
  console.error(`init-clone failed: ${error.message}`);
  // Ein vertipptes Flag ist keine gerissene Qualitaet. Exit 1 hiesse
  // 'geprueft und durchgefallen' — geprueft wurde aber nichts.
  process.exit(error.aufruffehler ? 2 : 1);
}
