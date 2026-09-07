#!/usr/bin/env node
// onpage-check.mjs — der Gate-Beleg für die SEO-Linse (QA-Fach 5, G1).
//
// Die Merge-Regel (d) in references/rolle-kritik.md lässt einen LENS-Befund
// allein überleben, wenn ein deterministischer Beleg dabei liegt. Für SEO ist
// das dieses Skript: es liest das ausgelieferte HTML und prüft die Punkte, bei
// denen es eine richtige Antwort gibt — Titel-Länge, Meta-Description, genau
// eine H1, Canonical, crawlbares Markup. Geschmack kommt hier nicht vor.
//
// Usage:
//   node onpage-check.mjs --base http://127.0.0.1:4321 --routes / /leistungen
//   node onpage-check.mjs --base <url> --routes / --json
//
// Exit 0 = alle Routen sauber, Exit 1 = mindestens ein Befund, Exit 64 = Usage.

const USAGE =
  "usage: node onpage-check.mjs --base <url> --routes <pfad...> [--json]";

const GRENZEN = { titelMax: 60, titelMin: 15, metaMax: 160, metaMin: 70 };

function usage() {
  console.error(USAGE);
  process.exit(64);
}

function parseArgs(argv) {
  let base = null;
  const routes = [];
  let json = false;
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--json") {
      json = true;
    } else if (arg === "--base") {
      base = argv[++i];
      if (!base || base.startsWith("-")) usage();
    } else if (arg === "--routes") {
      while (argv[i + 1] && !argv[i + 1].startsWith("--")) routes.push(argv[++i]);
      if (!routes.length) usage();
    } else {
      usage();
    }
  }
  if (!base || !routes.length) usage();
  // file:// zeigt nicht, was der Besucher bekommt — Titel und Canonical kommen
  // bei SSR/SSG erst vom Server.
  if (base.startsWith("file://")) {
    console.error("--base darf kein file:// sein: über HTTP ausliefern.");
    process.exit(64);
  }
  return { base: base.replace(/\/$/, ""), routes, json };
}

function alleTreffer(html, regex) {
  return [...html.matchAll(regex)];
}

function attribut(tag, name) {
  const m = tag.match(new RegExp(`${name}\\s*=\\s*(['"])(.*?)\\1`, "is"));
  return m ? m[2].trim() : null;
}

function pruefeRoute(html, route) {
  const befunde = [];
  const melde = (feld, text) => befunde.push({ route, feld, text });

  const titelTags = alleTreffer(html, /<title[^>]*>([\s\S]*?)<\/title>/gi);
  if (!titelTags.length) {
    melde("title", "kein <title> im HTML");
  } else {
    if (titelTags.length > 1) melde("title", `${titelTags.length} <title>-Tags`);
    const titel = titelTags[0][1].replace(/\s+/g, " ").trim();
    if (!titel) melde("title", "<title> ist leer");
    else if (titel.length > GRENZEN.titelMax)
      melde("title", `${titel.length} Zeichen (max ${GRENZEN.titelMax}): "${titel}"`);
    else if (titel.length < GRENZEN.titelMin)
      melde("title", `nur ${titel.length} Zeichen (min ${GRENZEN.titelMin}): "${titel}"`);
  }

  const metaTags = alleTreffer(html, /<meta\b[^>]*>/gi)
    .map((m) => m[0])
    .filter((tag) => (attribut(tag, "name") || "").toLowerCase() === "description");
  if (!metaTags.length) {
    melde("meta-description", "keine Meta-Description");
  } else {
    if (metaTags.length > 1)
      melde("meta-description", `${metaTags.length} Meta-Descriptions`);
    const inhalt = (attribut(metaTags[0], "content") || "").replace(/\s+/g, " ").trim();
    if (!inhalt) melde("meta-description", "Meta-Description ist leer");
    else if (inhalt.length > GRENZEN.metaMax)
      melde("meta-description", `${inhalt.length} Zeichen (max ${GRENZEN.metaMax})`);
    else if (inhalt.length < GRENZEN.metaMin)
      melde("meta-description", `nur ${inhalt.length} Zeichen (min ${GRENZEN.metaMin})`);
  }

  const h1 = alleTreffer(html, /<h1\b[^>]*>([\s\S]*?)<\/h1>/gi);
  if (h1.length === 0) melde("h1", "keine H1");
  else if (h1.length > 1) melde("h1", `${h1.length} H1-Elemente, genau eine erwartet`);
  else if (!h1[0][1].replace(/<[^>]*>/g, "").trim()) melde("h1", "H1 ist leer");

  const canonical = alleTreffer(html, /<link\b[^>]*>/gi)
    .map((m) => m[0])
    .filter((tag) => (attribut(tag, "rel") || "").toLowerCase() === "canonical");
  if (!canonical.length) melde("canonical", "kein rel=canonical");
  else if (canonical.length > 1)
    melde("canonical", `${canonical.length} Canonical-Links`);
  else if (!attribut(canonical[0], "href"))
    melde("canonical", "Canonical ohne href");

  // Eine leere Client-Shell ist für Crawler eine leere Seite, egal wie gut die
  // App später rendert.
  const koerper = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  const sichtbar = koerper
    ? koerper[1]
        .replace(/<script[\s\S]*?<\/script>/gi, "")
        .replace(/<style[\s\S]*?<\/style>/gi, "")
        .replace(/<[^>]*>/g, " ")
        .replace(/\s+/g, " ")
        .trim()
    : "";
  if (sichtbar.length < 200)
    melde(
      "crawlbar",
      `nur ${sichtbar.length} Zeichen Text im <body> — sieht nach leerer Client-Shell aus`,
    );

  return befunde;
}

const { base, routes, json } = parseArgs(process.argv.slice(2));
const alleBefunde = [];
const geprueft = [];

for (const route of routes) {
  const url = `${base}${route.startsWith("/") ? route : `/${route}`}`;
  let antwort;
  try {
    antwort = await fetch(url, { redirect: "follow" });
  } catch (fehler) {
    alleBefunde.push({ route, feld: "abruf", text: `nicht erreichbar: ${fehler.message}` });
    continue;
  }
  if (!antwort.ok) {
    alleBefunde.push({ route, feld: "abruf", text: `HTTP ${antwort.status}` });
    continue;
  }
  geprueft.push(route);
  alleBefunde.push(...pruefeRoute(await antwort.text(), route));
}

if (json) {
  console.log(
    JSON.stringify({ base, geprueft, befunde: alleBefunde, exit: alleBefunde.length ? 1 : 0 }, null, 2),
  );
} else {
  for (const b of alleBefunde) console.log(`${b.route}\t${b.feld}\t${b.text}`);
  console.log(
    `\n${geprueft.length} Route(n) geprüft, ${alleBefunde.length} Befund(e).` +
      (alleBefunde.length ? "" : " On-Page G1 sauber."),
  );
}

process.exit(alleBefunde.length ? 1 : 0);
