// Deutsche AI-Slop-Tells fuer scan-ai-slop.mjs.
//
//   node scan-ai-slop.mjs <root> --rules=<dieser Pfad> --json
//
// WARUM ES DIESE DATEI GIBT (Befund 29.07.2026)
// Der vendorte Scanner (kill-ai-slop, Apache-2.0) ist englischsprachig. Tell 14
// "AI copywriting voice" greift auf "seamless", "game-changer", "say goodbye to".
// Eine deutsche Landingpage mit "maßgeschneiderte Lösungen", "auf das nächste
// Level", "Schluss mit Meeting-Theater", "Rundum-sorglos-Paket" lief durch den
// Scanner mit 0 Treffern und Exit 0 — das Gate meldete "0 Slop-Tells", gruen.
// Raphaels Kundenseiten sind praktisch alle deutsch. Der schaerfste Copy-Pruefer
// des Gates war damit auf genau der Sprache blind, die ausgeliefert wird.
//
// QUELLE DER MUSTER
// `skills/eigene/copywriting/references/floskel-verbote.md` — Raphaels bereits
// freigegebene Verbotsliste. Diese Datei erfindet keine neuen Regeln, sie macht
// die vorhandene Prosa-Liste maschinell pruefbar. Aendert sich die Liste dort,
// aendert sich diese Datei mit; die Eval `run-slop-de-check.mjs` haelt beide
// zusammen.
//
// EINTEILUNG
// `de-14` (Textstimme) ist das deutsche Gegenstueck zum englischen Tell 14 und
// gehoert wie dieses zu den Blockern — das Gate fuehrt es in SLOP_BLOCK.
// `de-15` (Interpunktion) und `de-16` (Werbe-Vokabeln ohne Beleg) sind
// Warnungen: sie sind haeufig, kontextabhaengig und stoppen keine Auslieferung.
//
// FALSCH-POSITIV-GRENZE
// Muster stehen bewusst eng. "Reise" trifft nur als Kaufprozess-Metapher
// ("Ihre Reise beginnt"), nicht in einem Reisebuero-Text ("Reise nach Rom").
// Wer einen Treffer bewusst behaelt, unterdrueckt ihn per Kommentar-Direktive
// `deslop-ignore de-16` in der Zeile — nicht durch Aufweichen des Musters.
//
// JS-`\b` ist ASCII-only und greift nicht neben Umlauten. Muster mit ae/oe/ue
// im Wortinneren sind unkritisch (Umlaut steht nicht am Rand); wo ein Umlaut an
// die Grenze koennte, steht statt `\b` eine explizite Zeichenklasse.
export default [
  {
    id: "de-14",
    group: "copy",
    name: "deutsche KI-Textstimme",
    fix: "die konkrete Sache sagen — Zahl, Nomen, Konsequenz",
    copy: true,
    patterns: [
      // Eroeffnungs-Floskeln
      /in der heutigen (?:schnelllebigen |digitalen |vernetzten )*welt/iu,
      /es (?:ist wichtig zu beachten|sei angemerkt), dass/iu,
      /tauche[nt]? (?:sie )?ein in|entdecke[nt]? (?:sie )?die welt von/iu,
      /wir freuen uns, ihnen mitteilen zu koennen|wir freuen uns, ihnen mitteilen zu können/iu,
      // Nicht-nur-sondern / Schluss-mit / Level
      /nicht nur .{1,40}?[—–-]\s*sondern/iu,
      /es geht nicht nur um .{1,40}?,?\s*sondern/iu,
      /(?:sag|sagen sie) (?:goodbye|tschuess|tschüss) zu|schluss mit\b/iu,
      /auf (?:das|ein) (?:naechste|nächste|neue)s? level/iu,
      // X-Theater-Framing
      /\w+(?:-|\s)theater\b/iu,
      // Kaufprozess als Reise
      /ihre reise (?:beginnt|startet)|die reise (?:zu|zum|zur) ihre[mr]/iu,
      /customer journey|kunden-?reise/iu,
    ],
  },
  {
    id: "de-16",
    group: "copy",
    name: "deutsche Werbe-Leerformel",
    fix: "durch die belegbare Eigenschaft ersetzen (oder streichen)",
    copy: true,
    patterns: [
      /ma(?:ss|ß)geschneiderte (?:loesung|lösung|lösungen|loesungen)/iu,
      /ganzheitliche[rns]? ansatz|nahtlose integration/iu,
      /rundum-?sorglos-?paket|aus einer hand\b/iu,
      /das gewisse etwas|das i-?tuepfelchen|das i-?tüpfelchen/iu,
      /\bnonplusultra\b|\bgame-?changer\b/iu,
      // "revolutionaer/bahnbrechend/einzigartig" ohne Beleg — auch UWG-Risiko
      /revolutionaer|revolutionär|bahnbrechend|wegweisend/iu,
      /voller potenziale?|potenzial (?:entfesseln|freisetzen)/iu,
    ],
  },
  {
    id: "de-15",
    group: "copy",
    name: "Werbe-Interpunktion (Ausrufezeichen-Haeufung)",
    fix: "Begeisterung ueber Wortwahl, nicht ueber Satzzeichen",
    copy: true,
    patterns: [
      // Drei Ausrufezeichen im selben Absatz/derselben Zeile: sicherer Fund.
      // Die Schwelle "1 pro 1000 Woerter" aus floskel-verbote.md ist eine
      // Dokument-Statistik und laesst sich zeilenweise nicht pruefen — hier
      // steht deshalb bewusst nur das, was pro Zeile eindeutig ist.
      /![^!\n]{0,120}![^!\n]{0,120}!/u,
      /\?!|!\?/u,
    ],
  },
];
