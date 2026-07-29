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
// BEWUSST NICHT ABGEDECKT (Abdeckungsmessung 29.07.2026)
// Die Dreier-Aufzaehlung als Reflex ("schnell, einfach und effektiv") steht in
// der Verbotsliste, ist aber nicht greppbar: sie ist strukturell nicht von
// "Planung, Ausfuehrung und Abnahme" zu unterscheiden — dieselbe Form, einmal
// Floskel, einmal Leistungsliste. Der Unterschied liegt darin, ob die Woerter
// etwas bezeichnen, und das sieht kein Regex. Ebenso ausserhalb: die Schwellen
// pro Dokument (Em-Dash je 500 Woerter), Satzrhythmus, Absatzstruktur. Die
// bleiben Lesearbeit im copywriting-Durchgang. Ein gruener Scan heisst
// "die bekannten Einzelfloskeln sind raus", nicht "klingt menschlich".
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
      /(?:sag|sagen sie) (?:goodbye|tschuess|tschüss) zu/iu,
      // "Schluss mit X" nur als Werbe-Opener, also OHNE Artikel dahinter.
      // "Schluss mit der Debatte um die Kostenverteilung" ist normaler Fliesstext
      // und schlug vorher als BLOCKER an (getestet 29.07.2026). Der Reflex, den
      // die Liste meint, ist artikellos: "Schluss mit Papierkram".
      /schluss mit (?!der\b|die\b|das\b|den\b|dem\b|des\b|diesem\b|dieser\b|diesen\b)/iu,
      /auf (?:das|ein) (?:naechste|nächste|neue)s? level/iu,
      // X-Theater-Framing — geschlossene Liste, wie beim englischen Tell 14.
      // Vorher stand hier /\w+(?:-|\s)theater\b/. Das traf "Der Theater-Umbau
      // dauerte vier Monate" (getestet 29.07.2026) und haette als BLOCKER die
      // Auslieferung einer Sanierungs-Seite gestoppt. Ein Blocker, der auf
      // "Theater" anschlaegt, ist im Handwerks-Kontext unbrauchbar.
      /\b(?:meeting|prozess|sicherheits|innovations|produktivitaets|produktivitäts|compliance|daten|wachstums|agilitaets|agilitäts)-?theater\b/iu,
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
      // "revolutionaer/bahnbrechend/wegweisend" als SELBSTLOB — auch UWG-Risiko.
      // Vorher stand hier die nackte Wortliste. Sie traf "Eine bahnbrechende
      // Studie der TU Muenchen belegt das" und "Wegweisende Urteile des BGH"
      // (getestet 29.07.2026) — beides belegte Fremdzuschreibung und genau das
      // Gegenteil von Werbefloskel. Die Liste verbietet das Wort "ohne Beleg";
      // ein Beleg steht typischerweise im selben Satz. Also nur greifen, wenn
      // sich der Text auf SICH SELBST bezieht.
      /(?:wir sind|unser|unsere|unserem|unseren|unserer|das ist|hier ist) (?:\w+ ){0,2}?(?:revolutionaer|revolutionär|bahnbrechend|wegweisend)/iu,
      /\b(?:revolutionaer|revolutionär|bahnbrechend|wegweisend)e?[rnsm]?\s+(?:loesung|lösung|technologie|plattform|methode|software|innovation|produkt)/iu,
      // "Potenzial entfesseln" in beiden Wortstellungen — deutsch steht das Verb
      // am Satzende ODER direkt hinter dem Subjekt. Die erste Fassung deckte nur
      // "Potenzial entfesseln" ab und lief an "Wir entfesseln Ihr Potenzial"
      // vorbei (Abdeckungsmessung 29.07.2026).
      /voller potenziale?/iu,
      /potenzial(?:e|s)? (?:zu )?(?:entfesseln|freisetzen|entfalten|ausschoepfen|ausschöpfen)/iu,
      /(?:entfesseln|entfesselt|befreien|freisetzen) (?:sie )?(?:ihr|dein|das volle|ihr volles) \w*\s?potenzial/iu,
      // "nahtlos" und "einzigartig" als Adjektiv-Reflex, nicht nur im festen
      // Paar "nahtlose Integration". Beide stehen in der Verbotsliste.
      /\bnahtlose[rnsm]?\s+\w/iu,
      /\beinzigartige[rnsm]?\s+(?:qualitaet|qualität|loesung|lösung|erlebnis|service|leistung|kombination|atmosphaere|atmosphäre)/iu,
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
