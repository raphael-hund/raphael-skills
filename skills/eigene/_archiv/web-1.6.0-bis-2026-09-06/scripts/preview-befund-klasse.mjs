#!/usr/bin/env node
// preview-befund-klasse.mjs — Vorschau vs Launch: was darf blocken?
//
// Advisory für Befundtexte, kein Abnahmegate. Ein ausdrücklich verlangtes
// Ergebnis und anwendbare Funktionsfehler können auch die Vorschau blockieren.
// Der Owner bestimmt den Scope; Textheuristik kann ihn nicht ersetzen.
//
// Usage:
//   node preview-befund-klasse.mjs "50 vs 60 Google-Bewertungen"
//   node preview-befund-klasse.mjs --json "Kopf im Hero angeschnitten"
// Exit 0 = klassifiziert, Exit 2 = Aufruffehler.

import { fileURLToPath } from "node:url";
import path from "node:path";

// Handfeste Gestaltungsbefunde: blocken die Vorschau immer.
const VISUAL =
  /hierarchie|spacing|typo|beschnitten|angeschnitten|bildschnitt|crop\b|layout kaputt|kontrast|hero (tot|leer)|template|button-famil|leerfl|rhythmus|motion|wipe\b|cta-f(?:ue|ü)hrung|nicht premium|fold (?:tot|leer|kaputt)|überlapp|ueberlapp|safe-margin|kopf .*(?:rand|rahmen)|vier button|design (?:fail|rot|daneben)|kein(?:e[sn]?)?(?:\s+einziges)?\s+(?:foto|bild)\b|ohne bilder|fehlende bilder|kein(?:en)? visuelle[rn]? anker/i;

// Subjektive Gesamturteile über die Gestaltung ("sieht billig aus", "wirkt
// lieblos"). Historischer Kernfehler: die fielen auf "sonst" und konnten die
// Vorschau nicht blocken, obwohl schlechtes Design genau der Vorschau-Blocker ist.
const VISUAL_URTEIL =
  /sieht\s+(?:\w+\s+){0,3}(?:behindert|schei(?:ß|ss)\w*|schlecht|hässlich|haesslich|billig|unfertig|generisch|lieblos|austauschbar|nach baukasten)|wirkt\s+(?:\w+\s+){0,3}(?:billig|lieblos|generisch|unfertig|schlecht|austauschbar)|\blieblos\b|nach baukasten/i;

// Sichtbarkeits- und Ortswörter sind allein KEIN Visual-Signal — sonst wird
// jeder Content-Nit "sichtbar im Hero" fälschlich zum Vorschau-Blocker.
const VISUAL_KONTEXT = /sichtbar|\bhero\b|\bfold\b|\blayout\b/i;

const STRUKTUR =
  /sitemap|informationsarchitektur|\bablauf\b|funnel|nav(?:igation)?-struktur|\bidee\b|kernidee|seitenfluss|unterseiten fehlen|route fehlt/i;

const OPS =
  /vercel|custom-domain|custom domain|\bdns\b|\bssl\b|\bdomain\b|zertifikat|nameserver|domain nicht (?:verbunden|angebunden|an vercel)|nicht mit vercel|preview-url|apex-domain/i;

const INHALT =
  /google-bewertung|bewertungszahl|\breviews?\b|\d+\s*(?:vs|oder|statt|\/)\s*\d+|stunden[- ]?(?:versprechen|sla)|lieferzeit|werktage|tippfehler|rechtschreib|erfunden|fake[- ]?(?:review|bewertung|proof|logo)|ki-person|platzhalter|placeholder|satz.{0,60}falsch|wort tauschen|bild tauschen|copy[- ]nit|sektionstext/i;

const FUNKTION =
  /HTTP\s*[45]\d\d|(?:formular|submit|button|navigation).{0,50}(?:funktioniert nicht|sendet nicht|fehler|timeout)|(?:dialog|menü|menu).{0,45}(?:nicht (?:schließen|schliessen|öffnen|oeffnen))|(?:tastatur)?fokus.{0,35}(?:verschwindet|verloren|gefangen)/i;

function visualBlock() {
  return { klasse: "visual-block", preview: "block", launch: "block" };
}

export function klassifiziereBefund(text, { required = false } = {}) {
  const roh = String(text ?? "").trim();
  if (!roh) return { klasse: "leer", preview: "ignore", launch: "ignore" };

  if (required) return { klasse: "auftrag-block", preview: "block", launch: "block" };
  if (FUNKTION.test(roh)) return { klasse: "funktion-block", preview: "block", launch: "block" };

  // Reihenfolge ist die Fachaussage: ein handfester Gestaltungsbefund oder ein
  // Design-Urteil blockt, auch wenn im selben Satz eine Zahl steht. Danach
  // gewinnt der Content-/Ops-Kern über bloße Sichtbarkeitswörter.
  if (VISUAL.test(roh) || VISUAL_URTEIL.test(roh)) {
    return visualBlock();
  }
  // Ein sichtbarer Platzhalter-SLOT (leere Grafik, fehlendes Bild) ist eine
  // visuelle Lücke. Ein Review-/Copy-Platzhalter ist dagegen Working-Copy und
  // damit ein Swap — auch wenn er im Fold sichtbar ist (SKILL.md Rote Linie 5).
  const contentPlatzhalter =
    /(?:review|copy|text|satz|zitat|kundenstimm\w*)[- ]?platzhalter|platzhalter[- ]?(?:review|copy|text|satz|zitat|kundenstimm\w*)/i;
  if (
    VISUAL_KONTEXT.test(roh) &&
    /platzhalter|placeholder/i.test(roh) &&
    !contentPlatzhalter.test(roh) &&
    !OPS.test(roh)
  ) {
    return visualBlock();
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
  return { klasse: "sonst", preview: "review", launch: "review" };
}

export function darfBiggestGapSein(text, phase = "preview", options) {
  const treffer = klassifiziereBefund(text, options);
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
    // Die Launch-Spalte muss mit: ein erfundener Proof parkt in der Vorschau,
    // sperrt aber den Launch. Wer nur "park" liest, winkt ihn sonst durch.
    const launchHinweis =
      treffer.launch === "launch-block"
        ? "\tLAUNCH-SPERRE (erfundener Proof)"
        : treffer.launch === "block"
          ? "\tlaunch: block"
          : "";
    console.log(`${treffer.klasse}\t${treffer.preview}${launchHinweis}`);
  }
}
