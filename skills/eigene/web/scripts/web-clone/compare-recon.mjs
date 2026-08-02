#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

function usage() {
  console.log(`Usage:
  node scripts/compare-recon.mjs --original <original-recon.json> --clone <clone-recon.json> [--visual-diff visual-diff.json] [--original-routes route-map.json] [--clone-routes route-map.json] [--original-interactions interactions.json] [--clone-interactions interactions.json] [--out CLONE_REPORT.md]
`);
}

function parseArgs(argv) {
  const out = {
    original: "",
    clone: "",
    visualDiff: "",
    originalRoutes: "",
    cloneRoutes: "",
    originalInteractions: "",
    cloneInteractions: "",
    out: "CLONE_REPORT.md",
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") out.help = true;
    else if (arg === "--original") out.original = argv[++i] || "";
    else if (arg === "--clone") out.clone = argv[++i] || "";
    else if (arg === "--visual-diff") out.visualDiff = argv[++i] || "";
    else if (arg === "--original-routes") out.originalRoutes = argv[++i] || "";
    else if (arg === "--clone-routes") out.cloneRoutes = argv[++i] || "";
    else if (arg === "--original-interactions") out.originalInteractions = argv[++i] || "";
    else if (arg === "--clone-interactions") out.cloneInteractions = argv[++i] || "";
    else if (arg === "--out") out.out = argv[++i] || "CLONE_REPORT.md";
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

function readJson(file) {
  // Eine unlesbare Eingabedatei ist ein AUFRUF-Fehler, kein Vergleichsergebnis:
  // verglichen wurde nichts. Ohne diese Markierung endete der Lauf mit Exit 1
  // ("geprueft und durchgefallen"), gemessen 01.08.2026.
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (err) {
    const e = new Error(`${file} ist kein lesbares JSON: ${err.message.split("\n")[0]}`);
    e.aufruffehler = true;
    throw e;
  }
}

function firstSignals(recon) {
  return recon.captures?.[0]?.signals || {};
}

function boolList(flags = {}) {
  return Object.entries(flags).filter(([, value]) => value).map(([key]) => key);
}

function ratioScore(a, b) {
  if (a === 0 && b === 0) return 5;
  if (a === 0 || b === 0) return 1;
  const ratio = Math.min(a, b) / Math.max(a, b);
  if (ratio > 0.9) return 5;
  if (ratio > 0.75) return 4;
  if (ratio > 0.55) return 3;
  if (ratio > 0.3) return 2;
  return 1;
}

function sequenceSimilarity(a, b) {
  const left = a.map((item) => `${item.tag}:${item.text}`).filter(Boolean);
  const right = b.map((item) => `${item.tag}:${item.text}`).filter(Boolean);
  if (!left.length && !right.length) return 1;
  if (!left.length || !right.length) return 0;
  const rightSet = new Set(right);
  const hits = left.filter((item) => rightSet.has(item)).length;
  return hits / Math.max(left.length, right.length);
}

function inferComplexity(signals) {
  const frameworks = boolList(signals.frameworks);
  const counts = signals.counts || {};
  if ((counts.forms || 0) > 2 && (counts.inputs || 0) > 10) return "L6";
  if ((counts.canvas || 0) > 0 || signals.frameworks?.three) return "L5";
  if (signals.frameworks?.gsap || signals.frameworks?.lenis || (counts.video || 0) > 2) return "L4";
  if (frameworks.some((name) => ["react", "next", "vue", "nuxt", "svelte", "astro"].includes(name))) return "L3";
  if ((counts.links || 0) > 80 || (counts.images || 0) > 40) return "L2";
  return "L1";
}

// "Nichts gemessen" ist keine Note. Zwei leere Listen sind rechnerisch
// identisch, und daraus wurde bis zum 30.07.2026 eine 5/5: eine leere
// recon-Datei (abgestuerztes Werkzeug, falscher Pfad, `{}`) ergab
// "Struktur getroffen: 5/5, Bewegung/Bedienung: 5/5, Exit 0" — Bestnote fuer
// einen Klon, den niemand angesehen hat. Nachgemessen mit zwei `{}`-Dateien.
//
// Dieselbe Klasse wie die neun `parsed.x || []` im G1-Tor: der Rueckfall auf
// eine leere Liste macht aus einem Absturz ein sauberes Ergebnis.
const OHNE_DATEN = 'nicht gemessen (keine Signale in der recon-Datei)';

// "/5" gehoert an eine Note, nicht an einen Satz. Erster Versuch schrieb
// "nicht gemessen (...)/5" — sieht aus wie ein kaputter Platzhalter und liest
// sich, als waere doch irgendwie bewertet worden.
const note = (wert) => (wert === OHNE_DATEN ? wert : `${wert}/5`);

function score(original, clone, visualDiff) {
  const o = firstSignals(original);
  const c = firstSignals(clone);
  // Hat die Aufnahme ueberhaupt etwas gesehen? Ohne Ueberschriften und ohne
  // Zaehlwerte ist jede daraus gerechnete Note geraten.
  const hatSignale = (x) => Boolean(x.headings?.length) || Boolean(x.counts && Object.keys(x.counts).length);
  const messbar = hatSignale(o) && hatSignale(c);

  const structureSimilarity = sequenceSimilarity(o.headings || [], c.headings || []);
  const structure = messbar ? Math.max(1, Math.round(structureSimilarity * 5)) : OHNE_DATEN;
  const responsive = (original.captures?.length || clone.captures?.length)
    ? (original.captures?.length === clone.captures?.length ? 4 : 2)
    : OHNE_DATEN;
  const functionCounts = ["links", "forms", "buttons", "inputs"].map((key) => ratioScore(o.counts?.[key] || 0, c.counts?.[key] || 0));
  const functional = messbar ? Math.round(functionCounts.reduce((sum, value) => sum + value, 0) / functionCounts.length) : OHNE_DATEN;
  const motionCounts = ["canvas", "video"].map((key) => ratioScore(o.counts?.[key] || 0, c.counts?.[key] || 0));
  const interaction = messbar ? Math.round(motionCounts.reduce((sum, value) => sum + value, 0) / motionCounts.length) : OHNE_DATEN;
  return {
    _messbar: messbar,
    sourceEvidence: 3,
    structure,
    visual: visualDiff ? `${visualDiff.visualScore}/5` : "von Hand ansehen oder --visual-diff uebergeben",
    interaction,
    responsive,
    functional,
    contentReplacement: "von Hand pruefen: Textreste des Originals",
    legalRisk: "von Hand pruefen: Lizenz und Bildrechte",
  };
}

function line(value) {
  if (Array.isArray(value)) return value.join(", ") || "none";
  return value ?? "";
}

function routePath(url) {
  try {
    const parsed = new URL(url);
    return `${parsed.pathname}${parsed.search}` || "/";
  } catch {
    return url;
  }
}

function routesSection(files, evidence) {
  if (!evidence.originalRoutes || !evidence.cloneRoutes) {
    return `## Routen-Abdeckung
- Kein route-crawl-Ergebnis uebergeben. Mehrseitige Sites brauchen --original-routes / --clone-routes.
`;
  }
  const originalSet = new Set((evidence.originalRoutes.routes || []).map((route) => routePath(route.url)));
  const cloneSet = new Set((evidence.cloneRoutes.routes || []).map((route) => routePath(route.url)));
  const matched = Array.from(originalSet).filter((item) => cloneSet.has(item));
  const missing = Array.from(originalSet).filter((item) => !cloneSet.has(item));
  const extra = Array.from(cloneSet).filter((item) => !originalSet.has(item));
  const coverage = originalSet.size ? Math.round((matched.length / originalSet.size) * 100) : 100;
  return `## Routen-Abdeckung
- Routen im Original: ${originalSet.size}
- Routen im Klon: ${cloneSet.size}
- Abdeckung: ${coverage}%
- Routen-Karte Original: ${files.originalRoutes}
- Routen-Karte Klon: ${files.cloneRoutes}
- Fehlende Routen: ${missing.join(", ") || "keine"}
- Zusaetzliche Routen: ${extra.join(", ") || "keine"}
`;
}

function changedActionCount(interactions) {
  return (interactions?.actions || []).filter((action) => action.changed).length;
}

function interactionSection(files, evidence) {
  if (!evidence.originalInteractions || !evidence.cloneInteractions) {
    return `## Bedien-Abdeckung
- Kein interaction-probe-Ergebnis uebergeben. Interaktive Sites brauchen --original-interactions / --clone-interactions.
`;
  }
  const originalActions = evidence.originalInteractions.actions || [];
  const cloneActions = evidence.cloneInteractions.actions || [];
  const originalChanged = changedActionCount(evidence.originalInteractions);
  const cloneChanged = changedActionCount(evidence.cloneInteractions);
  const originalCanvas = evidence.originalInteractions.discovered?.canvases?.length || 0;
  const cloneCanvas = evidence.cloneInteractions.discovered?.canvases?.length || 0;
  const originalInteractive = evidence.originalInteractions.discovered?.interactive?.length || 0;
  const cloneInteractive = evidence.cloneInteractions.discovered?.interactive?.length || 0;
  return `## Bedien-Abdeckung
- Sichtbare Bedienelemente im Original: ${originalInteractive}
- Sichtbare Bedienelemente im Klon: ${cloneInteractive}
- Canvas-Elemente im Original: ${originalCanvas}
- Canvas-Elemente im Klon: ${cloneCanvas}
- Wirksame Aktionen im Original: ${originalChanged}/${originalActions.length}
- Wirksame Aktionen im Klon: ${cloneChanged}/${cloneActions.length}
- Bedien-Messung Original: ${files.originalInteractions}
- Bedien-Messung Klon: ${files.cloneInteractions}
- Einschaetzung: ${originalChanged === cloneChanged && originalCanvas === cloneCanvas ? "Anzahl der Interaktionen passt ungefaehr; ob die Zustaende gut aussehen, zeigt erst der Screenshot." : "Anzahl der Interaktionen weicht ab: entweder fehlen Zustaende oder es wurde mehr gebaut als im Original."}
`;
}

function report(files, original, clone, evidence) {
  const o = firstSignals(original);
  const c = firstSignals(clone);
  const scores = score(original, clone, evidence.visualDiff);
  const complexity = inferComplexity(o);
  const originalFlags = boolList(o.frameworks);
  const cloneFlags = boolList(c.frameworks);
  const counts = ["sections", "links", "images", "video", "canvas", "forms", "buttons", "inputs", "interactive", "scripts"];

  return `# ${original.label || "original"} vs ${clone.label || "clone"} · Bericht zur Klon-Bewertung

## Fazit
- Original-URL: ${original.url}
- Klon-URL: ${clone.url}
- Automatisch geschaetzte Stufe: ${complexity}
- Empfohlener Modus: ${complexity === "L5" ? "Technik auseinandernehmen, Originaltreue zuerst" : complexity === "L6" ? "nur die sichtbare Schicht nachbauen" : "Optik nachbauen, Inhalte komplett ersetzen"}
- Was dieser Bericht NICHT kann: Struktur, Anzahlen, Framework und Konsole vergleicht er selbst; mit --visual-diff kommt der Pixel-Unterschied dazu. Textreste des Originals und die Rechtsfrage bleiben Handarbeit.

## Technische Signale
| Punkt | Original | Klon |
|---|---|---|
| title | ${o.title || ""} | ${c.title || ""} |
| lang | ${o.lang || ""} | ${c.lang || ""} |
| frameworks | ${line(originalFlags)} | ${line(cloneFlags)} |
| scrollHeight | ${o.scrollHeight || 0} | ${c.scrollHeight || 0} |
| h1 | ${line(o.h1)} | ${line(c.h1)} |

## Zahlen im Vergleich
| Kennzahl | Original | Klon | Automatische Note |
|---|---:|---:|---:|
${counts.map((key) => `| ${key} | ${o.counts?.[key] || 0} | ${c.counts?.[key] || 0} | ${ratioScore(o.counts?.[key] || 0, c.counts?.[key] || 0)}/5 |`).join("\n")}

## Bewertung des Nachbaus
- Belege aus der Quelle: ${scores.sourceEvidence}/5
- Struktur getroffen: ${note(scores.structure)}
- Optik getroffen: ${scores.visual}
- Bewegung / Bedienung: ${note(scores.interaction)}
- Responsiv: ${note(scores.responsive)}
- Funktionen vollstaendig: ${note(scores.functional)}
- Inhalte ersetzt: ${scores.contentReplacement}
- Rechts- und Deploy-Risiko: ${scores.legalRisk}

## Console
- Konsolen-Fehler im Original: ${original.console?.errors?.length || 0}
- Konsolen-Fehler im Klon: ${clone.console?.errors?.length || 0}
- Seiten-Fehler im Original: ${original.console?.pageErrors?.length || 0}
- Seiten-Fehler im Klon: ${clone.console?.pageErrors?.length || 0}

${routesSection(files, evidence)}

${interactionSection(files, evidence)}

## Belege aus Screenshots
- Aufnahme Original: ${files.original}
- Aufnahme Klon: ${files.clone}
- Pixel-Unterschied: ${files.visualDiff || "nicht uebergeben"}
- Anteil abweichender Pixel: ${evidence.visualDiff ? evidence.visualDiff.diffPixelRatio : "nicht uebergeben"}
- Screenshots Original: ${(original.captures || []).map((capture) => capture.screenshot).join(", ")}
- Screenshots Klon: ${(clone.captures || []).map((capture) => capture.screenshot).join(", ")}

## Bekannte Luecken
- Ohne --visual-diff laesst sich die Optik nur durch Ansehen der Screenshots beurteilen.
- Recht, Bildlizenzen und ob wirklich jede Fremdmarke ersetzt wurde: bleibt Handarbeit.
`;
}

try {
  const args = parseArgs(process.argv.slice(2));
  if (args.help || !args.original || !args.clone) {
    usage();
    // Exit 2, nicht 1: ein fehlendes Pflichtargument heisst "nichts geprueft",
    // nicht "geprueft und durchgefallen". Dieselbe Trennung wie in beiden Toren
    // und in den zehn Werkzeugen, die sie am 31.07.2026 bekommen haben.
    // --help bleibt 0 — die Hilfe ist kein Fehlerfall.
    process.exit(args.help ? 0 : 2);
  }

  const original = readJson(args.original);
  const clone = readJson(args.clone);
  const visualDiff = args.visualDiff ? readJson(args.visualDiff) : null;
  const originalRoutes = args.originalRoutes ? readJson(args.originalRoutes) : null;
  const cloneRoutes = args.cloneRoutes ? readJson(args.cloneRoutes) : null;
  const originalInteractions = args.originalInteractions ? readJson(args.originalInteractions) : null;
  const cloneInteractions = args.cloneInteractions ? readJson(args.cloneInteractions) : null;
  const output = path.resolve(args.out);
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, report(args, original, clone, {
    visualDiff,
    originalRoutes,
    cloneRoutes,
    originalInteractions,
    cloneInteractions,
  }));
  console.log(output);

  // Exit 2 = "konnte nicht urteilen", nicht "bestanden". Dieselbe Trennung wie
  // im G1- und im Klon-Tor. Bis zum 30.07.2026 endete auch ein Lauf ueber zwei
  // leere recon-Dateien mit Exit 0 — wer das Skript in einer Kette aufruft,
  // liest daraus "Vergleich fertig".
  const signale = (x) => Boolean(x?.captures?.[0]?.signals?.headings?.length)
    || Boolean(x?.captures?.[0]?.signals?.counts && Object.keys(x.captures[0].signals.counts).length);
  if (!signale(original) || !signale(clone)) {
    console.error('Keine Signale in mindestens einer recon-Datei — der Bericht enthaelt keine Noten.');
    console.error('Zuerst recon-site.mjs auf beiden Seiten laufen lassen, dann erneut vergleichen.');
    process.exit(2);
  }
} catch (error) {
  console.error(`compare-recon failed: ${error.message}`);
  // Ein vertipptes Flag ist keine gerissene Qualitaet. Exit 1 hiesse
  // 'geprueft und durchgefallen' — geprueft wurde aber nichts.
  process.exit(error.aufruffehler ? 2 : 1);
}
