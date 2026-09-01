#!/usr/bin/env node
// preview-befund-klasse.mjs — Vorschau vs Launch: welcher Befund darf blocken?
//
// 01.09.2026: Planner/Kritiker holten Quick-Wins an Copy-Claims
// (50 vs 60 Google-Bewertungen, Custom-Domain nicht an Vercel, 24 vs 28h),
// während die Seite visuell durchfiel. Die Kunden-Vorschau braucht das Bild.
// Zahl und Domain sind ein 5-Minuten-Swap vor Launch.
//
// Usage:
//   node preview-befund-klasse.mjs "50 vs 60 Google-Bewertungen"
//   node preview-befund-klasse.mjs --json "Kopf im Hero angeschnitten"
// Exit 0 = klassifiziert, Exit 2 = Aufruffehler.
//
// preview: block | park | launch-block | ignore
// biggest_gap einer Vorschau darf nur `block` sein.

import { fileURLToPath } from "node:url";
import path from "node:path";

const VISUAL =
  /hierarchie|spacing|typo|beschnitten|angeschnitten|bildschnitt|crop\b|layout kaputt|kontrast|hero (tot|leer)|template|button-famil|leerfl|rhythmus|motion|wipe\b|cta-f(?:ue|ü)hrung|sieht (behindert|schei(?:ß|ss)|schlecht|hässlich)|nicht premium|fold\b|überlapp|ueberlapp|safe-margin|kopf .*(?:rand|rahmen)|vier button/i;

const OPS =
  /vercel|custom-domain|custom domain|\bdns\b|domain nicht (?:verbunden|angebunden|an vercel)|nicht mit vercel|preview-url|apex-domain/i;

const FAKT =
  /google-bewertung|bewertungszahl|\breviews?\b|\d+\s*(?:vs|oder|\/)\s*\d+|stunden[- ]?(?:versprechen|sla)|lieferzeit|werktage|24\s*(?:vs|oder|\/)\s*28|50\s*(?:vs|oder|\/)\s*60/i;

const FAKE =
  /erfunden|fake[- ]?(?:review|bewertung|proof|logo)|ki-person|stock-gesicht als proof|erfundene (?:bewertung|zahl|referenz)/i;

export function klassifiziereBefund(text) {
  const roh = String(text ?? "").trim();
  if (!roh) return { klasse: "leer", preview: "ignore" };

  if (FAKE.test(roh)) {
    return { klasse: "fake-proof", preview: "launch-block" };
  }
  // Visual gewinnt, auch wenn derselbe Satz eine Zahl enthält.
  if (VISUAL.test(roh)) {
    return { klasse: "visual-block", preview: "block" };
  }
  if (OPS.test(roh)) {
    return { klasse: "ops-park", preview: "park" };
  }
  if (FAKT.test(roh)) {
    return { klasse: "fakt-park", preview: "park" };
  }
  return { klasse: "sonst", preview: "visual-first" };
}

export function darfBiggestGapSein(text, phase = "preview") {
  const { preview } = klassifiziereBefund(text);
  if (phase !== "preview") return preview !== "ignore";
  return preview === "block";
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
