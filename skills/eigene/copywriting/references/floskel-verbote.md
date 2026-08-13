# LLM-Floskel-Verbotsliste (dt. + engl.) — G1, 0 Treffer

Deterministischer Anti-Floskel-Check. Diese Muster verraten KI-Text oder leere Werbesprache.
Treffer = Umschreiben, bevor G2 läuft.

## Deutsche LLM-/Werbe-Floskeln
- "In der heutigen schnelllebigen (digitalen) Welt …"
- "Es ist wichtig zu beachten, dass …" / "Es sei angemerkt, dass …"
- "Tauche ein in …" / "Entdecke die Welt von …"
- "auf das nächste Level (heben/bringen)" / "Game-Changer" / "das Nonplusultra"
- "maßgeschneiderte Lösungen" / "ganzheitlicher Ansatz" / "nahtlose Integration"
- "wir freuen uns, Ihnen mitteilen zu können"
- "revolutionär", "bahnbrechend", "einzigartig" (ohne Beleg → auch UWG-Risiko)
- "Reise" / "Journey" als Metapher für Kaufprozess
- "das gewisse Etwas", "das i-Tüpfelchen", "aus einer Hand", "Rundum-sorglos-Paket"
- Übermäßige Dreier-Aufzählungen ("schnell, einfach und effektiv") als Reflex

## Englische LLM-Floskeln (auch in dt. Texten meiden)
- "delve into", "in today's fast-paced world", "it's worth noting that"
- "unlock/unleash the power/potential of", "elevate", "seamless", "cutting-edge"
- "game-changer", "next-level", "at the end of the day", "when it comes to"
- "a testament to", "navigate the landscape of", "in the realm of"
- "whether you're … or …", "look no further", "the possibilities are endless"

**Erweiterte Vokabelliste** (nur relevant bei englischen Kundentexten, niedrige
Priorität. Kernfokus ist deutsch): tapestry, vibrant, pivotal, crucial,
intricate, meticulous, bolster, garner, underscore, interplay, multifaceted,
foster, leverage (als Verb), facilitate, encompass, paramount, groundbreaking,
transformative, robust (außerhalb Technik), aforementioned, unprecedented,
synergy, pain points, moving forward, thought leadership, empower/elevate/
streamline/supercharge (als Verkaufsverb), bridge the gap, move the needle.

## AI-Copywriting-Voice (deutsche Tells)

Eigener rhythmischer Fingerabdruck von KI-Verkaufstext: zu glatt, eine Stufe
zu begeistert, spezifikationsfrei. Fix: konkrete Zahlen/Nomen/Konsequenzen,
so formulieren, wie eine Person es einer anderen erklärt.

- **"Nicht nur X — sondern Y"** / "Es geht nicht nur um X, sondern um Y".
- **"Sag Goodbye zu X"** / "Schluss mit X" als Werbe-Opener.
- **Drei-Wort-Triaden** als Slogan-Reflex ("Schnell. Einfach. Fertig.").
- **"X-Theater"-Framing** ("Wir beenden das Meeting-Theater") — wirkt originell,
  ist aber ein generisches KI-Muster; stattdessen sagen, was die Sache konkret
  tut oder nicht tut.
- **Em-Dash-Gewohnheit** in Werbetexten (siehe unten, quantifiziert).

## Typografische/strukturelle LLM-Marker

- **Em-Dash-Schwelle:** max. **1 Gedankenstrich pro 500 Wörter**. Im Deutschen
  ohnehin selten grammatisch korrekt. Jeder zusätzliche ist ein Fund.
- **Ausrufezeichen-Schwelle:** max. **1 pro 1000 Wörter**. Begeisterung kommt
  über Wortwahl, nicht über Interpunktion.
- **Ellipse:** max. 1 pro Text, nur bei echtem Verklingen, nie als Übergang.
- **Listen-Monotonie**: jeder Absatz gleich lang, jeder Satz gleiche Struktur.
- **Fett-Doppelpunkt-Muster** in jeder Zeile ("**Vorteil:** …") als Schema.
- Emoji als Aufzählungszeichen in seriöser Copy.
- Perfekt symmetrische "Nicht nur … sondern auch …"-Ketten.

## Strukturregeln (Satzebene, ergänzend zum Vokabel-Check)

- **Keine drei gleichlangen Sätze in Folge.** Kurze mit langen mischen: das
  meistgemessene KI-Erkennungssignal.
- **Keine Parataxe** (Kurzsatz. Kurzsatz. Kurzsatz.): verbindet stattdessen
  mit Nebensätzen/Konjunktionen, die eine Beziehung zeigen (Grund, Kontrast).
- **Keine Hedging-Wippe.** Position beziehen, Gegenargument in maximal einem
  Satz würdigen statt beide Seiten gleich zu gewichten.
- **Keine identische Absatzstruktur** (Themasatz → Erklärung → Beispiel →
  Übergang, jedes Mal gleich): manche Absätze mit einer Frage beginnen,
  manche nach einem Satz abrupt enden.

## Maschinell prüfbarer Teil (seit 29.07.2026)

Diese Liste war bis dahin reine Prosa. Sie galt nur, wenn ein Agent sie gelesen
hatte. Die eindeutig greifbaren Muster stehen jetzt zusätzlich als Regelsatz in
`/root/raphael-skills/skills/design/scripts/rules.de.mjs` und laufen im
Slop-Scanner mit:

```bash
node skills/design/scripts/scan-ai-slop.mjs <projekt> --rules=skills/design/scripts/rules.de.mjs
```

`de-14` deutsche KI-Textstimme (Blocker im Web-Gate) · `de-15` Werbe-Interpunktion ·
`de-16` Werbe-Leerformel. **Diese Datei bleibt die Quelle**: kommt hier eine
Floskel dazu, gehört sie in den Regelsatz und in dessen Eval
(`skills/eigene/web/evals/run-slop-de-check.mjs`, 67 Fälle inkl. 14 Gegenproben).

Nicht maschinell prüfbar und deshalb weiterhin Lesearbeit: die Schwellen pro
Dokument (Em-Dash pro 500 Wörter, Ausrufezeichen pro 1000), die Satzrhythmus-
Regeln und die Absatzstruktur. Ein grüner Scan heißt also *nicht*, dass der Text
menschlich klingt. Er sagt nur, dass die bekannten Einzelfloskeln raus sind.

## Regel
Detektor meldet Trefferliste mit Position. 0 Treffer = G1 grün. Voice mancher Kunden
erlaubt einzelne Anglizismen bewusst. Dann in VOICE.md als Ausnahme whitelisten.
Für weitere, englischsprachige Tells + explizite False-Positive-Liste siehe
`ai-slop-patterns-en.md` (33-Pattern-Katalog).
