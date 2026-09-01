#!/usr/bin/env node
// preview-befund-klasse.mjs — Vorschau vs Launch: was darf blocken?
//
// Preview-Blocker sind langsam: Ablauf, Sitemap, Idee, Design.
// Inhalt ist ein Swap (Satz, Wort, Bild, Sektion, Review-Platzhalter) —
// in der Vorschau parken, nicht biggest_gap. Launch bleibt hart bei
// erfundenem Proof als echte Behauptung.
//
// Usage:
//   node preview-befund-klasse.mjs "50 vs 60 Google-Bewertungen"
//   node preview-befund-klasse.mjs --json "Kopf im Hero angeschnitten"
// Exit 0 = klassifiziert, Exit 2 = Aufruffehler.

import { fileURLToPath } from "node:url";
import path from "node:path";

const VISUAL =
  /hierarchie|spacing|typo|beschnitten|angeschnitten|bildschnitt|crop\b|layout kaputt|kontrast|hero (tot|leer)|template|button-famil|leerfl|rhythmus|motion|wipe\b|cta-f(?:ue|ü)hrung|sieht (behindert|schei(?:ß|ss)|schlecht|hässlich)|nicht premium|fold\b|überlapp|ueberlapp|safe-margin|kopf .*(?:rand|rahmen)|vier button|design (?:fail|rot|daneben)/i;

const STRUKTUR =
  /sitemap|informationsarchitektur|\bablauf\b|funnel|nav(?:igation)?-struktur|\bidee\b|kernidee|seitenfluss|unterseiten fehlen|route fehlt/i;

const OPS =
  /vercel|custom-domain|custom domain|\bdns\b|domain nicht (?:verbunden|angebunden|an vercel)|nicht mit vercel|preview-url|apex-domain/i;

const INHALT =
  /google-bewertung|bewertungszahl|\breviews?\b|\d+\s*(?:vs|oder|\/)\s*\d+|stunden[- ]?(?:versprechen|sla)|lieferzeit|werktage|24\s*(?:vs|oder|\/)\s*28|50\s*(?:vs|oder|\/)\s*60|erfunden|fake[- ]?(?:review|bewertung|proof|logo)|ki-person|platzhalter|placeholder|satz.{0,60}falsch|wort tauschen|bild tauschen|copy[- ]nit|sektionstext/i;

export function klassifiziereBefund(text) {
  const roh = String(text ?? "").trim();
  if (!roh) return { klasse: "leer", preview: "ignore", launch: "ignore" };

  // Design/Struktur gewinnen, auch wenn derselbe Satz eine Zahl oder ein Review enthält.
  if (VISUAL.test(roh)) {
    return { klasse: "visual-block", preview: "block", launch: "block" };
  }
  if (STRUKTUR.test(roh)) {
    return { klasse: "struktur-block", preview: "block", launch: "block" };
  }
  if (OPS.test(roh)) {
    return { klasse: "ops-park", preview: "park", launch: "block" };
  }
  if (INHALT.test(roh)) {
    const fake = /erfunden|fake[- ]?(?:review|bewertung|proof)|ki-person/i.test(roh);
    return {
      klasse: "content-park",
      preview: "park",
      launch: fake ? "launch-block" : "park",
    };
  }
  return { klasse: "sonst", preview: "visual-first", launch: "visual-first" };
}

export function darfBiggestGapSein(text, phase = "preview") {
  const treffer = klassifiziereBefund(text);
  if (phase === "launch") {
    return treffer.launch === "block" || treffer.launch === "launch-block";
  }
  return treffer.preview === "block";
}

function istMain() {
  const hier = fileURLToPath(import.meta.url);
  const argv1 = process.argv[1] ? path.resolve(process.argv[1]) : "";
  return argv1 === hier;
}

if (istMain()) {
  const args = process.argv.slice(2);
  const json = args[0] === "--json";
  const text = json ? args.slice(1).join(" ") : args.join(" ");
  if (!text.trim()) {
    console.error(
      'usage: node preview-befund-klasse.mjs [--json] "<befund>"',
    );
    process.exit(2);
  }
  const treffer = klassifiziereBefund(text);
  if (json) {
    console.log(JSON.stringify({ befund: text, ...treffer }));
  } else {
    console.log(`${treffer.klasse}\t${treffer.preview}`);
  }
}
