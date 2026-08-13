# Voice-DNA: Ads-Korpus (gemessen)

Quelle: `referenz-ads.md` (Meta Ad Library Export, Airtable-Base app9VvWqeSNAOwwmV)
Records: 711 (455 mit gefülltem hook-Feld, 322 mit gefülltem cta-Feld, 535 mit Skript-Block)
Datum der Messung: 2026-08-13

Das Messskript hat alle Zahlen unten ausgezählt. Die Methode steht je Abschnitt dabei.

## Hook-Länge

Gemessen: erster Satz (bis erstes `.`/`!`/`?`) im hook-Feld, Wortzahl. n = 455.

| Metrik | Wert |
|---|---|
| Median Wortzahl | 8 Wörter |
| Kurz (<10 Wörter) | 240 von 455 (52,7 %) |
| Mittel (10–20 Wörter) | 141 von 455 (31,0 %) |
| Lang (>20 Wörter) | 74 von 455 (16,3 %) |

Mehr als die Hälfte der Hooks ist unter 10 Wörter lang im ersten Satz.

## Anrede: Du vs. Sie

Gemessen: `grep -c` auf Wortgrenzen `\bdu\b`, `\bdir\b`, `\bdein...\b` gegen `\bSie\b`, `\bIhnen\b`, `\bIhr...\b` über die komplette Datei (711 Records, alle Textfelder zusammen).

| Anrede | Zeilentreffer | Anteil |
|---|---|---|
| Du/Dir/Dein | 685 | 83,3 % |
| Sie/Ihnen/Ihre | 137 | 16,7 % |

Duzen dominiert 5:1 gegenüber Siezen. Sie-Anrede kommt fast nur bei Enpal (Solar, B2C-Haushalt) vor.

## Hook-Familien

Gemessen: Feld "Hook-Familie", alle 711 Records, exakte Werte gezählt.

| Hook-Familie | Anzahl |
|---|---|
| Callout-Hook | 98 |
| Proof-Hook | 77 |
| Curiosity-/Lehr-Hook | 60 |
| Outcome-Hook | 49 |
| Problem-/Pain-Hook | 45 |
| Offer-/Preis-Hook | 45 |
| Garantie-Hook | 21 |
| Nightmare-Hook | 16 |
| Callout (Kurzform, ohne "-Hook") | 10 |
| Offer (Kurzform) | 3 |
| Problem (Kurzform) | 1 |

Callout-Hook (Zielgruppen-Ansprache "X aufgepasst") ist mit 98 die häufigste Familie, vor Proof-Hook (77).

## Angle-Familien

Gemessen: Feld "Angle-Familie", alle 711 Records, exakte Werte gezählt (nur Werte ab 3 Treffern).

| Angle-Familie | Anzahl |
|---|---|
| Dream-Outcome | 123 |
| Pain | 84 |
| Mechanism | 50 |
| Social-Proof | 37 |
| Nightmare | 18 |
| Prestige | 4 |
| Exklusivität/Status | 3 |

Dream-Outcome (123) ist die häufigste Angle-Familie, fast doppelt so oft wie Pain (84).

## CTA-Formulierungen

Gemessen: Feld "cta", 322 gefüllte Records. Wörtliche exakte Strings dominieren durch Meta-UI-Standardtexte.

| CTA-Text | Anzahl |
|---|---|
| "Learn more" (Meta-Standard-Button) | 136 |
| "See details" (Meta-Standard-Button) | 20 |
| "Sign up" (+ Varianten) | 4 |
| Enthält "Trag dich ein" / "Trage dich ein" / "eintragen" | 22 |
| Enthält "Klick(e)" | 51 |
| Enthält "kostenlos" | 28 |
| Enthält "sicher(e) dir" / "jetzt sichern" | 11 |
| Enthält "Termin" / "Beratungsgespräch" / "buche" | 11 |
| Enthält "bewerb" (bewerben) | 10 |
| Enthält "mehr erfahren" / "mehr dazu" | 7 |
| Enthält "link in/unten" | 7 |
| Enthält "ruft dich an" / "rufe dich" / "Anruf" | 4 |

Bei 322 CTA-Feldern ist "Learn more" mit 136 (42,2 %) der häufigste einzelne Wert. Dahinter steht der Standard-Meta-Button, den die Plattform selbst setzt. Die handgeschriebenen deutschen CTAs sind überwiegend Long-Tail: fast jeder Wortlaut kommt nur 1–2 Mal vor. Das verwertbare Muster liegt deshalb in den Clustern "Klick(e)" (51 Treffer) und "Trag dich ein" (22 Treffer).

## Skriptstrukturen

Gemessen: Feld "Skriptstruktur", 711 Records, exakte Werte gezählt (Top-Werte).

| Skriptstruktur (wörtlich) | Anzahl |
|---|---|
| "STATIC — (keine Textelemente erfasst, Feinstruktur nach Notion-Re-Export)" | 30 |
| "Callout -> Problem -> Mechanism -> Proof -> Offer -> CTA" | 6 |
| "Callout -> Problem -> Mechanism -> Offer -> CTA" | 4 |
| "STATIC — HOOK (Curiosity-/Lehr-Hook): Curiosity (Bildmotiv: quiz-selector-map)" | 4 |
| "STATIC — HOOK (Callout-Hook): Direct-Callout (Bildmotiv: caption-overlay-ugc)" | 4 |
| "Status-Callout-Hook -> Curiosity-Twist -> Value-Stack -> Apply-CTA" | 3 |
| "STATIC — HOOK (Proof-Hook): Authority (Bildmotiv: founder-portrait-split)" | 3 |
| STATIC-HOOK-Varianten Recruiting (3 Bildmotiv-Varianten) | je 3 |

Bei Video-Skripten ist "Callout -> Problem -> Mechanism -> Proof -> Offer -> CTA" die meistgenutzte Struktur (6 Treffer). Bei Statics dominiert eine feste HOOK->Bildmotiv-Notation.

## Satzbau in Hooks

Gemessen: erster Satz im hook-Feld, n = 455.

| Merkmal | Anzahl | Anteil |
|---|---|---|
| Erster Satz endet mit "?" (Frage als Hook) | 37 | 8,1 % |
| Erster Satz enthält eine Ziffer | 137 | 30,1 % |
| Erster Satz ist Fragment (≤4 Wörter) | 164 | 36,0 % |

Fragmente als Hook-Einstieg sind mit 36 % häufiger als vollständige Sätze mit Fragezeichen. Fast jeder dritte Hook (30,1 %) hat eine Zahl im ersten Satz.

## Lexikon: 30 häufigste Inhaltswörter in Hooks

Gemessen: nur wörtlich zitierte Hook-Fragmente (Text in Anführungszeichen innerhalb des hook-Felds), 142 Zitate aus 97 Records mit Zitat-Markierung. Stoppwörter (Artikel, Pronomen, Hilfsverben) entfernt.

| Rang | Wort | Anzahl |
|---|---|---|
| 1 | ich | 27 |
| 2 | webdesigner | 14 |
| 3 | claude | 13 |
| 4 | business | 11 |
| 5 | euro | 11 |
| 6 | nächsten | 11 |
| 7 | wärmepumpe | 10 |
| 8 | bringe | 8 |
| 9 | monaten | 7 |
| 10 | doing | 6 |
| 11 | year | 6 |
| 12 | which | 6 |
| 13 | means | 6 |
| 14 | you | 6 |
| 15 | event | 6 |
| 16 | millionen | 6 |
| 17 | monatsumsatz | 6 |
| 18 | aufgepasst | 6 |
| 19 | kostet | 6 |
| 20 | marketing | 6 |
| 21 | schenk | 6 |
| 22 | webinar | 5 |
| 23 | skript | 5 |
| 24 | deutsche | 5 |
| 25 | größte | 5 |
| 26 | mein | 5 |
| 27 | coaching | 5 |
| 28 | hast | 5 |
| 29 | ads | 5 |
| 30 | raus | 5 |

"Ich" ist mit Abstand das häufigste Inhaltswort. Hooks sprechen oft in Ich-Form vom Anbieter ("Ich bringe dich auf...").

## 20 Original-Hook-Zitate (Stilvorlage)

1. "Hier ist das 100-Millionen-Euro-Webinar-Skript von Speedscaling, das kannst du dir kostenfrei herunterladen" — Speedscaling.de, ad_archive_id 990232776923890
2. "Ich hab den Meta-Algorithmus geknackt, jetzt mal ohne Scheiß" — Speedscaling.de, ad_archive_id 2144348923075345
3. "Webdesigner, ich bringe dich auf 30.000€ Monatsumsatz in den nächsten 3 Monaten, so wie hier, hier, hier oder hier." — Marc Evers Marketing & Consulting, ad_archive_id 2693592234335343
4. "Webdesigner aufgepasst: Ich liefere dir mindestens fünf neue Webdesign-Kunden in den nächsten 60 Tagen — garantiert, oder du zahlst keinen Cent." — Marc Evers Marketing & Consulting, ad_archive_id 1480710363458596
5. "POV: Du hast das ultimative Framework, um Agenturkunden über Ads zu gewinnen" — Marc Evers Marketing & Consulting, ad_archive_id 1351972606551690
6. "Du bist Webdesigner und machst mindestens 3k/m?" — Marc Evers Marketing & Consulting, ad_archive_id 1614003906235086
7. Ich bringe dich in den nächsten 31 Tagen auf Platz 1 bei Google oder du bezahlst mir keinen Cent. — Pascal Harting, ad_archive_id 2525634821189932
8. "Wie viel kostet eine Wärmepumpe inkl. Einbau?" — Enpal, ad_archive_id 792306096588539
9. "Gasheizung raus, Wärmepumpe rein. Das kostet der Umstieg!" — Enpal, ad_archive_id 1074197747869000
10. "Wir suchen Hausbesitzer in Baden-Württemberg …" — Enpal, ad_archive_id 1477873436789240
11. "Solar-Komplettpaket inkl. Speicher + Montage" — Enpal, ad_archive_id 1382097753373797
12. "DAS GRÖSSTE DEUTSCHE Claude EVENT AM 21. & 22. JULI UM 18 UHR" — Maximilian Saal, ad_archive_id 1025550479861256
13. "Ich würde dich gerne einladen zum größten deutschen Claude-Event 2.0 mit dabei zu sein." — Maximilian Saal (KI Bootcamp Live)
14. "DAS 100 MIO. € WEBINAR SKRIPT" — Speedscaling.de, ad_archive_id 1338827804232031
15. Als Handwerksbetrieb musst du dir in 6 Monaten nie wieder Sorgen um Aufträge machen, wenn wir dich bei Google und ChatGPT auf die 1 gebracht haben. — SEOLabs, ad_archive_id 1028393069695235
16. "Sind wir in ChatGPT sichtbar?" – Dein Chef, irgendwann bald — Finseo, ad_archive_id 1592746378407316
17. Leiter von Bildungseinrichtungen aufgepasst! — Neuhaus Digital, ad_archive_id 888906383559297
18. Was kostet eine Website bei mir? — Mario Müller / Maximilian Saal, ad_archive_id REF-0134
19. Niemand redet über diesen einen Schritt im Trading, der letztendlich der entscheidende ist, um profitabel zu werden. — Finseo, ad_archive_id NOTION-VIDEO-1344688310607954
20. You're doing $1M+ a year. Which means you're probably the most successful person in most rooms you walk into. Vantage is the room where you're not. — Alex Hormozi, ad_archive_id 1360098256074210

## 8 wörtliche Skript-Auszüge (Rhythmus-Vorlage)

**1. Enpal (Solar-Callout), ad_archive_id 1257382019278821**
> Hi, wir suchen Hausbesitzer in ganz Nordrhein-Westfalen, die Lust auf ein Solar-Komplettpaket für 0 Euro Anzahlung inklusive Montage haben. Klingt zu gut, um wahr zu sein? Ist es nicht. Bei Enpal gibt es genau dieses Angebot und mit der Direktvermarktung bekommen Sie sogar bis zu 2.000 Euro Enpal-Vergütung obendrauf. Klingt spannend? Dann klicken Sie jetzt einmal hier unten und machen den kostenlosen 2-Minuten-Solar-Check und erhalten Ihr Angebot.

**2. Speedscaling.de (ROAS-5-Formel), ad_archive_id 2144348923075345**
> Ich hab den Meta-Algorithmus geknackt, jetzt mal ohne Scheiß. Wir haben mittlerweile sieben Millionen Euro in Werbung investiert für unsere Kunden und alles ausgetestet, was nur irgendwie geht, und wir haben die Roas 5 Formel geknackt. Also die Formel, die wir nutzen, um 1 Euro rein, 5 Euro raus zu bekommen und das Ganze sogar on-scale hinzukriegen, und ich schenke sie dir. Auf der nächsten Seite findest du die Roas 5 Formel, kannst du dir komplett kostenfrei downloaden.

**3. Neuhaus Digital (Bildungseinrichtung), ad_archive_id 1683688052587535**
> Wenn du als Bildungseinrichtung deine Teilnehmer oder Schüler rein über Empfehlungen oder deine Webseite generierst, dann pass jetzt gut auf. Denn genau das ist für die meisten Einrichtungen Realität und gleichzeitig ein sehr, sehr großes unternehmerisches Risiko. Deine Auslastung schwankt stark und du bist von Kanälen abhängig, die du gar nicht selber steuern kannst. Die Lösung dafür ist ein richtiges System zur Teilnehmer- und Schülergewinnung. Und genau so einen Prozess haben wir bei einer Bildungseinrichtung implementiert und dort in nur 7 Monaten 170.000 Euro an Umsatz gesichert.

**4. Charlie Morgan (LinkedIn Ads), ad_archive_id 760341766980011**
> Tischtennis spielen ist wie LinkedIn Ads. Du musst nur die richtige Technik beherrschen. Dann macht es richtig Spaß. Du kannst nicht nur ein, zwei, drei oder vier Leads am Tag, sondern easy 10, 12, 15 Leads am Tag generieren. Wir sind richtig gut in LinkedIn und können dir mit unserer LinkedIn Schritt für Schritt Anleitung zeigen, wie du Entscheiderleads für 20 bis 30 Euro generierst. Denn seit 1225 Tagen laufen unsere hoch profitablen LinkedIn Ads.

**5. Speedscaling.de (100-Millionen-Euro-Skript), ad_archive_id 990232776923890: Skriptstruktur-Notation**
> HOOK (Buch-Flip-Through, 0–15s): "Hier ist das 100-Millionen-Euro-Webinar-Skript, das kannst du dir kostenfrei herunterladen" → OFFER-TEASE: Inhalt des Skripts → PROOF/BONUS: zwei echte Webinar-Beispiele, 10-Mio.-Euro-Ergebnis → BONUS: 1-Stunden-Masterclass → RELEVANZ/URGENCY: "für alle, die 2026 erfolgreich ihre Expertise vermarkten wollen" → GUARANTEE: "kostenlos, kein Haken" → CTA: "auf der nächsten Seite downloaden"

**6. Dr. Matt Shiver (Instagram Coach Case), Skript-Auszug**
> This is crazy. This one coach spent $423 on this low budget Instagram ad strategy and made $13,494. Okay. These results are not typical. So Natalie is a client of ours. She's a fitness coach and she helps the LGBT community get fit. This worked really well. She used the very simple Instagram follower funnel that we teach inside of our curriculum. That's a 31 times return on ad spend.

**7. Enpal (Weihnachts-Bundle), ad_archive_id 25381491344841352: Static-Struktur-Notation**
> STRUKTUR: Hook (Bundle-Headline) → Pill-Badge (Leistungsumfang) → Produktarrangement auf Podium (Proof) → Logo → Begleittext: Förderung + Enpal-Prinzip → CTA. Headline zweizeilig "Solar-" / "Komplettpaket", Pill-Badge "inkl. Speicher + Wallbox".

**8. Maximilian Saal (KI Bootcamp), ad_archive_id 1025550479861256: Skriptstruktur-Notation**
> HOOK (Superlativ): "Das Größte Deutsche Claude Event" → PROOF: "1.700+ KI Mitarbeiter erstellt, beste KI Experten Deutschlands" → PROBLEM/PAIN: "Manuelle Prozesse kosten Zeit, brauchst Team oder Agenturen" → SOLUTION: "KI automatisiert alles vollständig" → DREAM-OUTCOME: "4-Stunden-Woche bei wachsendem Umsatz" → CTA: "Meld dich kostenlos an"

---

# Teil 2: Schreibregeln aus den Messwerten

> Die Zahlen oben beschreiben, was der Markt tut. Dieser Teil sagt, was wir schreiben.
> Die Schreibregeln filtern die Fehler des Marktes heraus.

## V1 — Hook-Länge

**Regel:** Erster Satz maximal 8 Wörter. Das ist der gemessene Median (n = 455).
Über 12 Wörter im ersten Satz nur, wenn eine exakte Zahl drinsteht.

Beleg für kurz: "Leiter von Bildungseinrichtungen aufgepasst!" (4 Wörter, Neuhaus Digital).
Beleg für lang mit Zahl: "Ich bringe dich in den nächsten 31 Tagen auf Platz 1 bei
Google oder du bezahlst mir keinen Cent." (Pascal Harting). Trägt wegen Zahl plus Garantie.

## V2 — Fragment vor Frage

36,0 % der Hooks starten als Fragment (≤ 4 Wörter). Nur 8,1 % starten als Frage.

**Regel:** Fragment schlägt Frage. Eine Frage als Hook nur, wenn sie eine echte
Kaufentscheidungsfrage ist ("Wie viel kostet eine Wärmepumpe inkl. Einbau?" — Enpal),
nie als rhetorische Aufwärmung ("Kennst du das Gefühl, wenn …?").

**Grenze:** Ein Fragment pro Hook. Zwei Fragmente hintereinander sind ein
Staccato-Paar und damit ein Fail (`/root/.claude/forbidden.md` A1).

**Einzige Ausnahme — Informationssprung** (A1, Ausnahme 2): Zwei Teile sind
erlaubt, wenn der zweite eine belegte Zahl oder Frist trägt. Gilt nur im Hook,
nie im Body, nie zweimal pro Skript.

- ✓ "Wärmepumpe kaputt? Neue in 48 Stunden." (Problem → Frist)
- ✗ "Kein Warten. Kein Vertrösten." (zweimal dieselbe Aussage)

**Test:** Streiche den zweiten Teil. Verliert der Leser eine Information?
Wenn nur der Rhythmus fehlt, ist es Slop.

## V3 — Zahl in den ersten Sekunden

30,1 % der Hooks haben eine Ziffer im ersten Satz.

**Regel:** Zahl in Sekunde 1–3, immer auf die genaue Stelle. "170.000 Euro"
schlägt "über 170.000 Euro", weil eine gerundete Zahl nach Schätzung klingt.
Zahl ohne belegbare Quelle kommt nicht ins Skript (`forbidden.md` E1).

## V4 — Anrede

83,3 % Duzen (685 von 822 Treffern).

**Regel:** Duzen als Default. Für Siezen gilt die Bedingung aus
`copywriting/references/voice-dna.md` Abschnitt 4: hoher Kaufpreis über 10.000 €
UND breite Zielgruppe mit älteren Käufern. Beides muss zutreffen.
Im Korpus erfüllt das ausschließlich Enpal (Solar, Wärmepumpe).
Innerhalb eines Skripts wechselt die Anrede nie.

## V5 — Ich-Form

"ich" ist das häufigste Inhaltswort in Hooks (27 Treffer).

**Regel:** Der Anbieter spricht in Ich-Form, wenn eine Person das Gesicht ist.
"Ich bringe dich auf 30.000 € Monatsumsatz" (Marc Evers) trägt mehr als
"Wir helfen Webdesignern beim Umsatzwachstum".
Firmen ohne Gesicht bleiben bei "Wir".

## V6 — Hook-Familien-Wahl

| Familie | Anzahl | Wann einsetzen |
|---|---|---|
| Callout | 98 | Zielgruppe ist scharf abgrenzbar ("Webdesigner aufgepasst") |
| Proof | 77 | echte Zahl aus einem echten Fall liegt vor |
| Curiosity/Lehr | 60 | Mechanismus ist wirklich neu |
| Outcome | 49 | Ergebnis ist bildlich vorstellbar |
| Problem/Pain | 45 | Zielgruppe kennt den Schmerz täglich |
| Offer/Preis | 45 | Preis ist selbst das Argument |
| Garantie | 21 | Garantie ist echt und einklagbar |

**Regel:** Callout ist der sicherste Einstieg bei scharfer Zielgruppe. Proof nur
mit belegbarer Zahl. Nightmare (16) sparsam einsetzen. Angst ohne Auflösung
verbrennt Vertrauen.

## V7 — Angle-Wahl

Dream-Outcome (123) läuft fast doppelt so oft wie Pain (84).

**Regel:** Dream-Outcome als Default-Angle. Pain nur, wenn der Schmerz im Alltag
der Zielgruppe täglich auftritt. Immer Pain → Auflösung im selben Skript, nie
Pain allein stehen lassen.

## V8 — Skriptstruktur

Meistgenutzte Video-Struktur im Korpus:

> **Callout → Problem → Mechanism → Proof → Offer → CTA**

**Regel:** Diese Struktur als Default. Abweichung braucht einen Grund, der im
Brief steht. Kurzform ohne Proof (Callout → Problem → Mechanism → Offer → CTA)
nur bei unter 20 Sekunden Laufzeit.

## V9 — CTA

"Learn more" (136 von 322) ist der Meta-Standard-Button. Die Plattform setzt ihn
selbst, ein Texter schreibt ihn nie.
Die geschriebenen deutschen CTAs sind Long-Tail. Das Cluster liegt bei
"Klick(e)" (51) und "Trag dich ein" (22).

**Regel:** Der gesprochene CTA sagt, was der Zuschauer bekommt, plus die
Risiko-Umkehr. "Mach den kostenlosen 2-Minuten-Solar-Check und erhalte dein
Angebot" (Enpal) schlägt "Klick hier".
Ein CTA pro Skript, in den letzten 3 Sekunden.

## V10 — Sprechrhythmus

Aus den 8 Skript-Auszügen gemessen: Sätze liegen bei 6–15 Wörtern. Der Ton folgt
natürlicher gesprochener Sprache.

**Regel:**
- Sätze springen in der Länge (lang → kurz → mittel), nie drei gleichlange in Folge.
- Nebensätze auflösen: "Wir haben sieben Millionen Euro investiert. Und alles
  ausgetestet." statt "Nachdem wir sieben Millionen Euro investiert hatten, …"
- Kein Nominalstil, keine Funktionsverbgefüge (`forbidden.md` D1, D2).
- Füllwörter der echten Sprache ("also", "jetzt mal ohne Scheiß") sind erlaubt,
  wenn die VOICE.md des Kunden das trägt. Nie mehr als eins pro Absatz.

## V11 — Was aus dem Korpus NICHT kopiert wird

Der Korpus enthält auch Slop. Diese Muster laufen zwar im Markt, kommen aber
nicht in unsere Skripte:

- **Isokolon-Metapher** — "Tischtennis spielen ist wie LinkedIn Ads."
  (Charlie Morgan) → `forbidden.md` A3.
- **Versalien-Schrei** — "DAS GRÖSSTE DEUTSCHE … EVENT" (Maximilian Saal).
  Max. 1 Wort in Versalien, nur bei echtem Beweis.
- **Ungedeckte Superlative** — "beste KI Experten Deutschlands" ohne Beleg.
- **Ergebnis-Disclaimer als Deckmantel** — "These results are not typical"
  (Dr. Matt Shiver) direkt nach einer Extremzahl. Entweder die Zahl ist typisch
  und wir zeigen sie, oder wir zeigen eine typische Zahl.

## V12 — Selbstcheck vor Abgabe eines Skripts

Sechs Fragen. Ein Nein = zurück ins Skript.

1. Erster Satz ≤ 8 Wörter (oder ≤ 12 mit exakter Zahl)?
2. Zahl in Sekunde 1–3, exakt und belegt?
3. Anrede durchgehend gleich?
4. Struktur folgt V8 oder hat einen begründeten Grund?
5. `forbidden.md` = 0 Treffer?
6. Ein CTA, in den letzten 3 Sekunden, mit Risiko-Umkehr?

## Wartung

Korpus neu ziehen: `bash scripts/export-airtable-korpus.sh`
Danach die Zahlen in Teil 1 neu messen und die Regeln in Teil 2 prüfen.
Verschieben sich Median oder Anteile deutlich, wandern die Regeln mit.
