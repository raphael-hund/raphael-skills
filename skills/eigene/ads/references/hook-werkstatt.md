---
title: "Hook-Werkstatt — Hooks und Hook-Styles für Meta-Leadgen-Ads bauen"
type: synthesis
confidence: high
status: approved
created: 2026-09-18
tags: [ads, hooks, werkstatt]
---

# Hook-Werkstatt

Bauanleitung, keine Zitatensammlung. Dieses Dokument verdichtet die
Craft-Referenzen des Skills zu einem Arbeitsablauf, mit dem man **neue**
Hooks konstruiert — nicht kopiert. Zählbasis für alle Markt-Zahlen: 711
Referenz-Records (682 auswertbar, 455 mit Hook-Label, 383 Statics / 328
Videos, s. `korpus/README.md`). Messlatte für alle Eigen-Schwellen: das
eigene Konto (`eigene-regeln.md`).

---

## 1. Was ein Hook leisten muss

Ein Hook ist keine Zeile, sondern ein dreischichtiges Ereignis in den ersten
~2 Sekunden. Er muss drei Fragen gleichzeitig beantworten:

- **Person:** Wer ist gemeint? Der Hook löst Selbstselektion aus — der ICP
  denkt «das bin ich», alle anderen scrollen weiter. Das ist gewollt: die
  Aufgabe des Hooks ist filtern, nicht möglichst viele anlocken.
- **Situation:** Welcher Zustand oder Schmerz ist gerade aktiv? Benannt in
  der Alltagssprache der Zielperson, nicht in Agentursprache.
- **Intention:** Was bekomme ich, wenn ich bleibe/klicke? Angebot oder
  Mechanismus müssen grob erkennbar sein — der Hook trägt
  «Committed-Sprache», kein Ratespiel.

Das ist der **Committed-vs-Curious-Filter**: Ein reiner
Neugier-Hook («Curious») erzeugt hohe Klickraten bei schlechter
Landingpage-Conversion, weil die Leute nur raten, was sie erwartet. Zeigt
die Messung genau dieses Bild (CTR hoch, Qualität/Conversion tief), wird
der Hook präzisiert — Zielgruppen-Situation, konkrete Zahl, nötigenfalls
Fachwort — und damit von Curious nach Committed geschoben. Das senkt
Klicks und hebt die Downstream-Conversion. Umgekehrt gilt: Fehlt die
Neugier-Komponente ganz, wird gar nicht erst gestoppt. Der Hook braucht
also beides, gewichtet je nach Konto-Diagnose.

Physisch besteht der Hook aus **drei synchronen Komponenten** (bei Video):
Visual (Sekunde 0–3), gesprochene Zeile, Caption/Banner-Text — mit der
**No-Duplication-Regel**: keine Komponente wiederholt eine andere wörtlich
(Karaoke-Untertitel sind Pflicht und gelten nicht als Dopplung; ein
Banner, das den Sprechtext abschreibt, dagegen schon). Bei Statics fällt
das auf **Visual + Headline** zusammen: die Headline captiont nicht das
Bild, das Bild illustriert nicht die Headline — beide tragen je einen
eigenen Teil der Antwort.

**Verhältnis zu den «vier Hook-Lagen» in `teil-video.md`:** zwei Ebenen
desselben Hooks, kein Widerspruch. Person/Situation/Intention ist die
**Copy-Zerlegung** (was der Hook inhaltlich beantworten muss); die vier
Lagen Bild/Satz/Handlung/Primary Text sind das **Video-Produktions-Modell**
(wo der Hook physisch sitzt — dort zählt die Handlung als eigene Lage und
der Primary Text über der Anzeige explizit mit). Wer ein Video-Skript
baut, prüft beide Ebenen: inhaltlich hier, physisch dort.

**Messlatte (eigenes Konto, Referenzkonto-Baseline):** Hook-Rate-Schwelle **25 %**
(3-Sek-Views/Impressionen, nur Video, nur Lead-Funnel). Unter 20 % bringen
nur ~15 % der Ads eine Anfrage; ab 25 % sind es ~59 %. Die Schwelle ist
Frühwarnung, keine Kill-Regel: unter 25 % wird der Einstieg neu gebaut,
kein Budget nachgeschossen. Fremd-Schwellen (s. §6) sind Orientierung,
diese Zahl ist der Vertrag.

---

## 2. Die Hook-Landkarte (Familien)

Familie = **psychologischer Mechanismus**. Die Korpus-Zahlen (von 455
gelabelten Hooks; Kurzformen zusammengezogen) sind Verbreitungs-
Orientierung, keine Rangliste der Wirksamkeit.

| Familie | Korpus | Wirkmechanismus (warum sie trägt) | Wann sie trägt | Wann sie kippt |
|---|---|---|---|---|
| **Callout** | 108 | Selbstidentifikation: der ICP wird namentlich angesprochen und stoppt sich selbst; alle anderen werden gratis aussortiert | Zielgruppe scharf abgrenzbar (Rolle, Ort, Status); TOFU, cold; trägt Video **und** Static | Label zu generisch («Selbstständige» ist unsichtbar); Callout ohne Zahl/Schwelle filtert nicht |
| **Proof** | 77 | Der fremde Name trägt die Behauptung, die der eigene Name nicht tragen kann; Beweis VOR Versprechen dreht die Abwehrhaltung um | Echter, benennbarer Case mit belegter Zahl liegt vor; problem- bis solution-aware; stark bei lokalen/nischigen Dienstleistern | «Zahlreiche Kunden vertrauen uns» ohne Namen; erfundenes Dashboard; gerundete Fantasiezahl |
| **Curiosity/Lehr** | 60 | Informationslücke: eine offene Schleife, die nur das Weiterschauen schliesst; echte Lehre in der Ad qualifiziert (wer zuhört, ist warm) | Mechanismus ist wirklich neu oder der Markt hat Lärm/Vorwissen; Webinar-/Event-Funnel; vor allem **Video** (s. §5) | Versprechen ohne Payoff = Clickbait; die Schleife darf nie länger als ~2 Sätze offen bleiben |
| **Outcome** | 49 | Der Zielzustand wird vorgezogen und bildlich vorstellbar — der Kopf erlebt das Ergebnis vor dem Preis | Ergebnis ist konkret und vorstellbar (Platz 1, voller Auftragskalender); solution-aware | Ungedeckter Superlativ; Mondversprechen in verbrannten Märkten (dort gewinnt radikale Untertreibung) |
| **Offer/Preis** | 48 | Preis/Geschenk ist selbst das Argument; «gratis/0 Franken» löst Reaktanz, eine grosse eigene Bilanz-Zahl verankert Glaubwürdigkeit | Preis/Deal ist ehrlich und konkret; Lead-Magnet-/Download-Funnel; sehr stark auf **Statics** | Deal unklar auf der Ad; zieht Schnäppchenjäger ohne Qualifizierung dahinter |
| **Pain** | 46 | Wiedererkennung des täglichen Schmerzes; je konkreter (in Geld/Auftrag, nie Gefühl), desto stärker | Problem-aware, TOFU/MOFU; Schmerz kommt wörtlich aus Kundensprache/VOC | Schmerz ohne Auflösung im selben Stück; Beschämung statt Betriebssprache; Problem komplex UND Sprache komplex |
| **Garantie** | 21 | Risiko-Umkehr in Satz 1 ersetzt langen Vertrauensaufbau und filtert gleichzeitig | Solution- bis product-aware, High-Ticket mit echtem Gespräch dahinter; Garantie ist real und einklagbar | Anbieter kann sie wirtschaftlich nicht tragen — hier zählt Lead-Qualität, nicht CPL. **Chef 18.09.2026: Garantie-Ads sind absolut möglich; der frühere Anti-ICP-Einwand («unhaltbare Garantie als Kaufbedingung») ist gelöscht (konflikt-register.md K7)** |
| **Nightmare** | 16 | Verlust-Aversion: die Kosten des Nichtstuns werden sichtbar | Sparsam, als Kontrast-Farbe; problem-aware; nur **Video**, wo die Auflösung sofort folgen kann | Angst ohne Auflösung verbrennt Vertrauen; nie als Dauer-Angle |

**Regel aus der Verteilung:** Callout ist der sicherste Einstieg bei scharfer
Zielgruppe. Proof nur mit belegbarer Zahl. Dream-Outcome läuft als Angle
im Korpus fast doppelt so oft wie Pain (123 vs. 84) — Pain ist Gewürz,
nicht Grundlage, und braucht immer die Auflösung im selben Stück.

---

## 3. Hook-Styles ≠ Hook-Familien

Zwei Achsen, die nie verwechselt werden dürfen:

- **Familie** beantwortet: *Warum* stoppt die Person? (psychologischer
  Mechanismus — §2)
- **Style** beantwortet: *Wie* sieht/klingt die Ausführung? (Form)

Dieselbe Familie kann in mehreren Styles auftreten (ein Callout als
Statement, als Frage, als Selfie-Video), und derselbe Style kann mehrere
Familien tragen. Wer «drei Hook-Varianten» baut und nur den Style wechselt,
testet dieselbe Hypothese dreimal (Verlierer-Muster L3).

Gemessene Form-Verteilung im Korpus (n = 455): die grosse Mehrheit der
Hooks ist **Statement-Direkteinstieg** (~82 %); nur **8,1 %** der
Hook-Erstsätze sind Fragen, **36 %** starten als Fragment (≤4 Wörter),
**30 %** tragen eine Ziffer im ersten Satz.

| Style | Wirkung | Produktionsaufwand | Typische Falle |
|---|---|---|---|
| **Statement-Direkteinstieg** (~82 %) | Null Anlauf, Behauptung steht sofort; trägt jede Familie | Minimal (Talking Head oder Textzeile) | Austauschbare Behauptung ohne Zahl/Name — wirkt wie jede andere Ad |
| **Frage** (8,1 %) | Zieht nur bei echter Kaufentscheidungsfrage («Was kostet X inkl. Einbau?») | Minimal | Rhetorische Aufwärmung («Kennst du das Gefühl …?») — Fragment schlägt Frage |
| **Zahl-first** | Krumme, exakte Zahl als Echtheits-Signal in Sekunde 1 | Minimal, aber die Zahl muss belegt sein | Unbelegte oder gerundete Zahl; «viele Kunden» ohne Zahl |
| **Dialog/Skit** | Einwand oder Alltagsszene wird gezeigt statt behauptet; hohe Wiedererkennung | Hoch (Rollen, Schnitt, zwei Stimmen) | Gespielter Vorgang wird als echter Kundenfall getarnt; Pointe kommt zu spät |
| **Zeigegeste** («so wie hier, hier, hier») | Versprechen und Beweis fallen in dieselbe Sekunde — Overlay trägt den Proof | Mittel (Overlays müssen geplant und produziert sein) | Geste ohne geplantes Overlay zeigt ins Leere; funktioniert nur im Skript vorgedacht |
| **Negativ-Qualifikation** | Wehrt aktiv ab, wer nicht passt; erklärt Lead-Qualität und macht das Angebot begehrenswerter | Minimal (ein Satz) | Bei kleinem Ticket unnötig abschreckend; als Opener statt als Abwehr-Passage gesetzt |
| **Seifig-raw Selfie (UGC)** | Rohheit ist Teil des Proof-Signals; Talking-Head nah, durchgehend Karaoke-Captions — der Feed läuft stumm | Tief (Telefon, Arbeitsalltag, kein Studio) | Musik-only mit Text-on-Screen ohne gesprochenes Wort — für die Hälfte der Impressionen verloren |

---

## 3b. Ton-Register & Copy-Grenzen (Chef 18.09.2026)

**Erlaubte Ton-Register (Entscheid Raphael 18.09.2026):** provokant ok,
beschämend ok, nüchtern/sachlich ok. **Kumpelhaft-flapsig: „nicht unbedingt"**
— kein Verbot, aber kein Default; nur mit Grund.

**Sprach-Regeln (Entscheid Raphael 18.09.2026):**

- **Anglizismen:** je nach Kunde erlaubt.
- **Emojis:** frei dosiert.
- **Du oder Sie:** egal — der Kunde wählt.
- **Direkten Konkurrenten namentlich nennen: NEIN (hart).** Vergleiche ohne
  Namen („klassische SEO-Agenturen") bleiben möglich.

**Verbotene Muster (Entscheid Raphael 18.09.2026):** Hooks, die **wie vom
Englischen übersetzt** klingen (Typ „Hier ist die Rechnung");
**über-emotionale Dramatik** ist unnötig; **generische Ansprache** („Du willst
mehr Kunden?") = kill.

**Kommentierte Beispiel-Staffel (Chef-Urteile 18.09.2026, je 1 Zeile Typ +
Verdikt):**

| # | Typ | Verdikt |
|---|---|---|
| 1 | Aufzählungs-Callout ohne Verb | **kill** — kein Verb, niemand spricht so |
| 2 | Generische Frage-Ansprache („Du willst mehr Kunden?") | **kill** — generische Ansprache |
| 3 | Proof mit Ort + Zahl + Zeitraum | **ok** |
| 4 | „X ist tot"-Provokation | **kill** — generisch |
| 5 | Suche-Callout mit konkreter Zahl + Region, gesprochen klingend | **top** |
| 6 | Bildliches Outcome („nie wieder Kaltakquise") | **cool** |
| 7 | Prozent-Drohung mit Beweis-Ankündigung | **kill** — zu generisch |
| 8 | Vorstellungs-Opener („Wir sind eine Agentur aus …") | **nicht gut** |
| 9 | Platzhalter-Formel „Wenn du … willst, brauchst du …" | **ok** |
| 10 | Objekt-Teaser mit übersetzter Schlussformel | **kill** — klingt übersetzt |

---

## 4. Die Bau-Werkstatt — neuen Hook in sieben Schritten

Durchgehendes Beispiel, frei erfunden: **Malerbetrieb Friedli,
Zürcher Oberland** — Inhaber, 9 Mitarbeitende, will Renovationsaufträge
von Eigentümern älterer Einfamilienhäuser (Baujahr vor 1995), Fokus
Fassade und Innenrenovation, mittleres Ticket (15–60k CHF), Lead-Formular
mit Foto-Upload.

**(a) Ausgangslage: ICP-Schmerz in Kundensprache.**
Aus Verkaufsgesprächen und Offert-Anfragen die wörtlichen Sätze sammeln,
nicht übersetzen. Beispiel-VOC: «Wir holen drei Offerten ein, und von
zwei hören wir nie wieder etwas.» — «Am Ende weiss ich nie, was die
Fassade wirklich kostet, bevor der Gerüstbauer da war.» Der Hook wird aus
diesen Sätzen gebaut, nicht aus dem Leistungskatalog.

**(b) Familie wählen.**
Awareness prüfen: Der Hausbesitzer kennt den Schmerz (Problem-aware),
misstraut aber Offerten (Richtung solution-aware). Zwei Kandidaten
begründet festlegen, z. B. **Pain** (Wiedererkennung) und **Proof**
(sobald ein freigegebener Kundenfall mit Zahl existiert). Garantie fällt
weg — der Betrieb kann keine Preisgarantie vor Besichtigung tragen; das
ehrlich notieren statt eine zu erfinden.

**(c) Style wählen.**
Familie und Style getrennt festlegen. Beispiel: Pain als **Fragment-
Statement** (Korpus-Mehrheitsform, tiefster Aufwand), Proof später als
**Zahl-first** mit echtem Case. Kein Skit, solange kein Dreh-Team da ist;
Zeigegeste nur, wenn die Offert-Belege als Overlay geplant werden.

**(d) Erste 12 Wörter schreiben — Zahl + Zeitraum + Population.**
Regeln aus der Messung: erster Satz ≤ 8 Wörter (Median), über 12 Wörter
nur mit exakter Zahl; eine harte, möglichst krumme Zahl oder ein Name in
Satz 1; Fragment schlägt Frage. Entwürfe für Friedli:

- Pain/Fragment: «Drei Offerten eingeholt. Zwei nie zurückgemeldet.» (8 Wörter, Zahl × 2, Population im Visual)
- Pain/Committed: «Fassade sanieren ohne Offerten-Poker: Festpreis nach der Besichtigung, in 48 Stunden.»
- Proof/Zahl-first (sobald Case freigegeben): «Fassade in Wila: 31'400 Franken, 11 Arbeitstage — so wie bei der Familie Keller.»

Gegenprobe: «Suchen Sie einen zuverlässigen Maler im Zürcher Oberland?»
enthält keine Zahl, keine Situation, keine Intention — weg damit.

**(e) Brücke Sekunde 3–15 (On-Ramp-Pflicht).**
Jede Hook-Variante bekommt die Brücke gleich mitgeschrieben, sonst
Hold-Rate-Tod. Sie löst den Hook ein und führt in den Mechanismus, ohne
das Produkt sprunghaft einzuführen. Beispiel-Brücke zum Pain-Hook:
«Deshalb arbeiten wir mit einem fixen Wochenplan: Besichtigung innert
einer Woche, Festpreis-Offerte 48 Stunden danach — und der Plan steht im
Angebot, nicht im Kleingedruckten.» Ein Satz Brücke, ein Mechanismus,
kein Pitch-Sprung.

**(f) Anti-Muster-Check (14 Punkte, Kurzliste aus skript-architekturen + Chef-Vetos 18.09.2026).**

1. Behauptung ohne Proof daneben?
2. Generischer Hook / weicher Filter («alle, die irgendwie renovieren»)?
3. Weichspüler-Eröffnung («Herzlich willkommen, in diesem Video …»)?
4. Curiosity ohne Payoff — oder drei Hook-Ideen in den ersten 10 Sekunden?
5. Feature-Gerede ohne Kundenname und Zahl?
6. Versprechen ohne Zeitrahmen («schöne Fassade» statt «in 11 Tagen»)?
7. Weicher CTA ohne Ort, Frist, Post-Click-Vorschau?
8. Wiederholung mitten im Value-Teil (erlaubt nur beim CTA/Trigger-Wort)?
9. Story-Start ohne Hook-Spannung (Schmerz kommt erst nach 30 Sekunden)?
10. Kein gesprochenes Wort / keine Karaoke-Captions geplant?
11. Bei High-Ticket: fehlt die Negativ-Qualifikation?
12. Klingt die Zeile wie vom Englischen übersetzt (Chef 18.09.2026)?
13. Über-emotionale Dramatik ohne Nutzen (Chef 18.09.2026)?
14. Wird ein direkter Konkurrent namentlich genannt — hartes Nein (Chef 18.09.2026)?

Ein Ja = zurück an den Entwurf.

**Deliverable dieser Datei:** 3–5 Hook-Varianten je Auftrag, jede mit Familie
(§2), Style (§3), erstem Satz und Brücke Sekunde 3–15 (e) — Anti-Muster-Check
(f) und Laut-Lesen-Test (g) bestanden. Abgabe in den Produktionsteil:
`teil-video.md` (vier Lagen) oder `teil-statics.md` (Brief nach
`statics/brief-schema.md`); die Winning Variable der Welle wandert danach ins
Kunden-Lern-Register (§6.5).

**(g) Laut-Lesen-Test.**
Den Hook tatsächlich laut lesen — ein Mal, in einem Atemzug. Prüffragen:
Klingt es wie eine Sprachnachricht, nicht wie eine Broschüre? Jedes Wort
ein Alltagswort? Versteht es jemand ohne Branchenkontext, verschlafen um
8 Uhr morgens? Fühlt sich die Zielperson direkt angesprochen? Danach den
Einstieg **stumm** prüfen (Caption-Test: trägt der Hook ohne Ton?).

---

## 5. Hook × Style × Format-Matrix

| Format | Tragende Familien | Tragende Styles | Warum |
|---|---|---|---|
| **Statics** | Callout, Offer/Preis dominieren; Proof mit Zahl; Qualifizierungs-Callout | Zahl-first, Statement, Ja-Frage-Callout, Typo-Karte, Chat/Post-Look | Der Static wird **gescannt** (1–2 Sekunden Blick, kein Ton, keine Zeit für Auflösung): die Headline muss allein tragen — wer gemeint ist, was es gibt, was es bringt. Der Deal steht auf der Ad, weil nach dem Klick nur das Formular kommt |
| **Video** | Curiosity/Lehr und Nightmare zusätzlich möglich; Callout/Proof/Garantie bleiben Kern | Statement-Direkteinstieg, Dialog/Skit, Zeigegeste, Raw-Selfie mit Karaoke | Video hat **Ton + Schrift + Zeit**: eine offene Schleife darf geöffnet werden, weil Sekunde 3–15 sie schliesst; ein Nightmare darf angedroht werden, weil die Auflösung im selben Clip folgt. Ohne Ton tragen die Captions |

**Konsequenz:** Eine Curiosity- oder Nightmare-Formel auf eine Static zu
legen, ist der häufigste Transfer-Fehler — die Schleife bleibt offen, weil
kein Body sie schliesst, und aus Neugier wird Klickbait-Verdacht. Umgekehrt
funktioniert ein reiner Offer-/Preis-Hook im Video zwar, verschenkt aber
die Stärke des Mediums (Mechanismus zeigen). Bild und Text müssen zur
selben Awareness-Stufe gehören; ein Mismatch zerstört die Ad auch bei
starkem Wording.

---

## 6. Test-Disziplin für Hooks

1. **3–5 Hooks je Testwelle** (Kanon-Korridor 3–10 je Ad-Set; beim Wochenbudget des Referenzkontos ~230 CHF bleiben es 3–5, damit jede Ad auswertbaren Spend bekommt — Beispiel aus dem Referenzkonto, keine Vorgabe für andere Konten).
2. **Mindestens 2 verschiedene Familien** im Set (verschiedene F-IDs) — drei Paraphrasen desselben Callouts sind eine Hypothese dreimal, kein Test (L3). Varianten werden als Matrix Segment × Motivation × Familie gebaut.
3. **Eine Variable pro Test.** Wer Hook, Body und CTA gleichzeitig ändert, lernt nichts. Bei einem laufenden Winner-Body wird nur der Hook getauscht (Hook-Recycling auf Winner-Body ist ein belegtes Muster); die Selektions-Zahl im Hook darf als eigene Variable mitgetestet werden.
4. **Messfenster und Rauschen-Regeln:** eine volle Kalenderwoche Mindestlaufzeit ohne Eingriff; unter 30 CHF Spend pro Ad sagt ein Nullergebnis nichts, ab 100 CHF wird es aussagekräftig; unter 1'000 Impressionen ist alles Rauschen → warten.
5. **Winning-Variable ins Lern-Register.** Jede Welle dokumentiert die eine gefundene Gewinner-Eigenschaft (Offer, Person im Bild, Format, lokale Ansprache) im Kunden-Lern-Register, damit spätere Wellen darauf aufbauen statt bei null zu starten. Unbelegte Variablen bleiben Hypothesen.
6. **Fremd-Schwellen sind Orientierung, eigene Schwelle gewinnt.** Fremde Median-Werte (z. B. ein 28-%-Hook-Rate-Median aus anderen Accounts) und Fremd-Korridore («40–50 % ist gut») kalibrieren die Erwartung, bevor eigene Historie existiert. Ab ~30 Tagen eigener Daten schlagen die eigenen Kontozahlen jede Fremdzahl: kanonisch gilt die eigene **25-%-Schwelle** (<20 % → ~15 % der Ads bringen eine Anfrage, ab 25 % → ~59 %). Fremdregeln ohne Zählweise sind weder bestätig- noch widerlegbar — eine Kennzahl ohne Messdefinition ist keine. Und: Hook-Rate nie formatübergreifend vergleichen (Statics haben per Definition keine); Hookrate 0 bei altem Spend ist eine Datenlücke, kein Flop.
7. **Meta-Regel (Chef 18.09.2026): Was datentechnisch gewinnt, gewinnt — ansonsten ist Stil egal.** Gewinnt ein Hook datentechnisch, geht aber stilistisch gegen den Strich, gilt der Datenbefund. Stil-Debatten werden nicht geführt.

---

## Verwandt

- [video/hook-formeln.md](video/hook-formeln.md) — die 13 Baupläne F1–F13 (Video-Namensraum)
- [video/beat-struktur-und-aufbau.md](video/beat-struktur-und-aufbau.md) — vier gestapelte Hook-Ebenen, Klo-Check, Bridge-Bruchpunkt
- [video/skript-architekturen.md](video/skript-architekturen.md) — Messlatte und die 11 Anti-Muster im Volltext
- [video/strategien-taktiken.md](video/strategien-taktiken.md) — S1–S7, T1–T14 (Zeigegeste, krumme Zahlen, Hook-Recycling)
- [video/voice-dna-ads.md](video/voice-dna-ads.md) — alle gemessenen Verteilungen (8-Wörter-Median, 83 % Du, Fragment 36 %)
- [video/playbook-geile-ads.md](video/playbook-geile-ads.md) — Winner-Muster W1–W7, Verlierer L1–L5
- [statics/copy-formeln.md](statics/copy-formeln.md) — static:F01–F12, C01–C06, Awareness-Mapping
- [craft/video.md](craft/video.md) und [craft/statics.md](craft/statics.md) — ID-Namensräume, Leitplanken, Brief-Vorlage
- [teil-strategie.md](teil-strategie.md) — Hook-Filter (Committed vs. Curious), Winning Variables
- [eigene-regeln.md](eigene-regeln.md) — 25-%-Schwelle, Trefferquoten, Test-Wellen-Regeln
- [korpus/README.md](korpus/README.md) — kanonische Zählbasis (711 Records)
