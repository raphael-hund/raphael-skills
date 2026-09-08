<!-- Private research origin: /root/skill-workspace/skill-updates/2026-09-07-web-design-depth/research/mobbin/REPORT.md; images/code remain outside the skill. -->

# Mobbin: Sektionen und vollständige Buchungsabläufe

Recherche: 07.09.2026. 12 Website-Sektionen und sämtliche 11 Screens zweier Web-Flows tatsächlich als Bilder betrachtet. 23 JPEGs dauerhaft unter `images/`, Originalmetadaten in `heroes.json`, `proof.json`, `pricing.json`, `form.json`, `flows.json`. Die Mobbin-URLs sind die zitierfähigen Quellen; Bild-Kurzlinks können nach 30 Tagen ablaufen. Alle Suchaufrufe verwendeten denselben task_intent: “Improve an HTML-first website design skill through evidence-based analysis of UI components and user journeys.”

## Aussagegrenze

Das sind archivierte Mobbin-Aufnahmen, keine aktuellen Live-Implementierungsprüfungen. Bilder belegen sichtbare Gestaltung und Zustände; sie beweisen weder DOM-Struktur noch CSS-Werte, Schriftfamilien, Breakpoints, Kontrastwerte, Conversionwirkung oder tatsächliche Tastaturbedienbarkeit. Pixelangaben unten sind bewusst nur ungefähre Größen **im gelieferten 768-Pixel-Vorschaubild**; sie dürfen nicht als CSS-Pixel der Originalseite übernommen werden. Farbnamen sind Sichtbefunde, keine aus dem Original-CSS extrahierten Tokens. Umsetzungsvorschläge sind eigene Ableitungen. Die dunkle “curated by Mobbin”-Leiste gehört zur Quelle und niemals ins Website-Layout.

## Tatsächlich betrachtete Sektionen

### H1: Lemon Squeezy – typografischer Hero

Quelle: [Lemon Squeezy](https://mobbin.com/sites/sections/0823c6ef-79d1-4ba5-818a-25cff74d3dda), Bild `images/0823c6ef-79d1-4ba5-818a-25cff74d3dda.jpg`.

**Konstruktion:** Durchgehendes kräftiges Violett, weiße zentrierte Sans-Headline über drei Zeilen; die Zeilenbreite dominiert den Inhalt. Logo und Navigation am oberen Rand, Login plus kleine weiße Pillen-CTA rechts. Haupt-CTA „Get started for free“ größer und zentriert; zwei kleine, hellere Vertrauenssätze zwischen Headline und CTA. Große Abstände oberhalb und unterhalb, kein zwanghaft ergänztes Hero-Bild. Größenverhältnis Headline zu Hilfstext etwa 4:1; Inhalt nutzt grob zwei Drittel der Breite.

**Aufgabe:** Angebot und Start-Risiko verstehen, dann kostenlos starten. Main-CTA und Header-CTA bedienen denselben Einstieg an unterschiedlichen Blickorten.

**Übertragung:** Semantisches `header/nav` und `section` mit echtem `h1`, Textbreite via `max-inline-size` in `ch`, responsivem `clamp()` und einem Link. Hintergrund und Pillen in CSS, Logo als vorhandenes SVG. Keine Rasterisierung des Textes. Schriftumbruch mit echtem deutschem Inhalt testen, nicht starre `<br>` aus dem englischen Screenshot übernehmen.

**Do:** Eine eindeutige Handlung und konkrete Risikoreduktion. **Don't:** Violett als universelles „Premium“-Token oder generische Behauptung „kein Risiko“ ohne Grundlage kopieren.

### H2: Square – Angebot im Bildkontext

Quelle: [Square](https://mobbin.com/sites/sections/68afe8ce-0f12-481e-abef-63aa28f25d80), gleichnamiges JPEG.

**Konstruktion:** Schwarzer Hintergrund, weiße zweizeilige Headline in freier Mitte. Kleine Versal-Eyebrow „WHY SQUARE?“. Fünf sichtbare Bildausschnitte unterschiedlicher Größe rahmen den Text: Personen bei der Arbeit und ein Terminal; teilweise abgerundete Ecken, asymmetrische Verteilung. Oben zwei Navigationsebenen: globale Produktnavigation, darunter Kontexttitel und Aktionen. Im Hero eine blaue gefüllte Start-CTA plus blau umrandete Sales-CTA. Manche Fotos sind am Viewport abgeschnitten.

**Aufgabe:** „Passt zu meiner Betriebsart?“ beantworten und zwischen Selbststart und Vertrieb wählen. Fotos tragen Tätigkeitsbezug, nicht bloß Atmosphäre.

**Übertragung:** HTML-Inhalt mit CSS Grid/benannten Bereichen, `picture`/`img` und `object-fit`; Cutouts als normale Bildzuschnitte, Logos/Icons als SVG. Dekorative Bilder bei Mobile reduzieren oder in kontrollierte Reihenfolge überführen, Text und Aktionen im Fluss belassen. Zwei CTAs nur bei zwei realen Wegen. Fotos nicht durch zufällige KI-Menschen ersetzen; Rollen und Nutzungsrechte prüfen.

**Grenze:** Bewegung, Sticky-Verhalten und mobile Reihenfolge sind nicht belegt. Zwei Headerreihen sind für kleine Dienstleister nicht automatisch sinnvoll.

### H3: OFF+BRAND – verworfene Hero-Evidenz

Quelle: [OFF+BRAND](https://mobbin.com/sites/sections/1c082bfd-e527-418c-af97-002e96fe42ca), gleichnamiges JPEG.

**Sichtbar:** Hellgraue Fläche, Logo links, wenige Navigationstexte rechts, kleine schwarze Fragmente im Zentrum, Menüzeichen unten rechts. Der zentrale Inhalt ist nicht lesbar. Das kann ein Animationszwischenstand sein; Ursache ist unbewiesen.

**Entscheidung:** Nicht als erfolgreicher minimalistischer Hero ausgeben und keine Headline erfinden. Dieser Treffer ist ein Negativbeispiel für Referenzqualität: erst lesbaren stabilen Zustand oder echtes Motion-Playback beschaffen, bevor Gestaltungsregeln daraus entstehen. Keine Screenshot-Nachbildung dieser Fragmente.

### P1: Amplemarket – Ergebnisbelege als hierarchisches Raster

Quelle: [Amplemarket](https://mobbin.com/sites/sections/887f98cc-5dbf-4655-860e-bdd5faaeee19), gleichnamiges JPEG.

**Konstruktion:** Offwhite-Grund, zurückhaltende schwarze Navigation. Zentrierte Headline über zwei Zeilen. Darunter zwei große Ergebnisflächen und vier kleine Kacheln. Große Flächen kombinieren kundenspezifische Geschichte, Logo und zwei voneinander getrennte Metrikfelder; Pastellgrün/Türkis versus Gelb/Grün-Verlauf. Kleine Kacheln jeweils Logo, Zahl und Metriklabel. Abgerundete Ecken und sichtbare interne Unterteilung halten unterschiedliche Informationsdichten zusammen.

**Aufgabe:** Relevante Kundenergebnisse scannen; große Fälle bieten Zusammenhang, kleine Fälle verbreitern den Beleg.

**Übertragung:** `section`, `article`, echte Case-Study-Links, Metriken als `dl`; CSS Grid für 2+4-Hierarchie, CSS-Verläufe, SVG-Logos mit Zustimmung. Mobile Reihenfolge fallweise Artikel 1→2→Kleinbelege. Erfolgszahlen dürfen nicht von der Referenz in Kundencopy wandern.

**Do:** Zahl immer mit Einheit, Zeitraum und Zugehörigkeit. **Don't:** Alle Belege in gleich große Karten pressen oder Gradient als Beweisersatz verwenden. Screenshot belegt angezeigte Claims, nicht deren sachliche Verifikation.

### P2: Jasper – mehrere Beweisarten in einem redaktionellen Raster

Quelle: [Jasper](https://mobbin.com/sites/sections/71f4d377-4e1c-4f04-9adf-23dae73c4794), gleichnamiges JPEG.

**Konstruktion:** Dunkelmarine Serif-Headline, kleine gelb hinterlegte Eyebrow, kantiger dunkler Story-CTA. Dreireihiges Raster mit schmalen Fugen: Pastell-Metrikflächen in Grün, Blau, Rosa, Gelb wechseln mit breiten Portrait/Zitat-Paaren. Kundennamen als Logos am unteren Rand, Zahlen/Claims oben. Portraits erscheinen schwarzweiß bzw. entsättigt; Name und Rolle als kleine kontrastierende Label am Foto. Die Kacheln sind überwiegend kantig, nicht die übliche Rundkartenfamilie.

**Aufgabe:** Quantitative Leistung und menschliche Glaubwürdigkeit gemeinsam vermitteln. Leser können Zahlen schnell scannen und bei konkreten Personen vertiefen.

**Übertragung:** CSS Grid mit expliziten Spans und lesbarer DOM-Reihenfolge; `blockquote/figcaption`, Rasterportraits, Vektorlogos, echte Texte. Serif/Sans-Paar als eigene Brandentscheidung, nicht erratener Fontname. Mobile darf Zitat nicht vom Portrait und dessen Zuschreibung getrennt werden.

**Do:** Layout aus Beweisart ableiten. **Don't:** Zitatkacheln ohne Autor/Quelle, farbige Metriken ohne Bedeutung oder endlose identische Testimonial-Slider bauen.

### P3: Zendesk – sachlicher Betriebsbeleg

Quelle: [Zendesk](https://mobbin.com/sites/sections/4ae34544-82ac-4f27-b0d1-2379e088b826), gleichnamiges JPEG.

**Konstruktion:** Sehr hellgrauer Hintergrund, drei breite weiße horizontale Gruppen: zwei nebeneinander zentrierte Zitate mit Zuschreibung; Produktlogo-Reihe; vier Kennzahlen mit kleinen Versalüberschriften. Dunkles Petrol statt reinem Schwarz. Wenig Farbakzent, viel Innenraum. Navigation oben, Chat-Kreis unten rechts.

**Aufgabe:** Nicht nur Lob, sondern Umfang der Einführung zeigen: verwendete Produkte, verbundene Kanäle, Ticketvolumen und Zufriedenheit.

**Übertragung:** Blockquotes und `dl`, flexibles Produktlogo-Grid, CSS-Flächen. Gute Vorlage für Dienstleister-Cases mit „Ausgangslage / Leistung / Ergebnis“, sofern echte Daten vorhanden. Keine Chat-Blase ohne echten Kommunikationskanal. Die breite Typohierarchie mobil auf 1–2 Spalten reduzieren.

## Pricing: drei unterschiedliche Entscheidungsmodelle

### R1: Clerk – Basisplan plus Erweiterungen

Quelle: [Clerk](https://mobbin.com/sites/sections/5125964c-8b12-49cc-b037-8e052fc553f9), gleichnamiges JPEG.

Dunkelanthrazit mit schwach sichtbarem Technikmuster und großer räumlicher C-Form hinter weißer zweizeiliger Headline. Basispläne $0 und $25/Monat links/mittig; rechts eine eigene Add-on-Spalte mit separaten Preisen. Feine Linien, cyanfarbene Hervorhebung beim bezahlten Plan, heller Gratis-Button. **Wichtig:** Der Ausschnitt schneidet die unteren Features ab, daher keine vollständige Vergleichstabelle ableitbar. CSS für Rahmen, Grid und Flächen; aufwendige C-Illustration als eigenes optimiertes Rasterasset oder vorhandenes Vektorasset, nicht als Screenshot der gesamten Sektion. Add-ons semantisch vom Grundpreis trennen; Gesamtpreis bei echter Auswahl transparent nachführen. Nicht zwei Add-ons fälschlich als zwei weitere Tarife darstellen.

### R2: Qatalog – Selbstbedienung versus Vertriebsweg

Quelle: [Qatalog](https://mobbin.com/sites/sections/8fb5fbc1-d28e-4109-a136-08a08db99d2f), gleichnamiges JPEG.

Zwei gleich hohe Plankarten: Pro dunkel, Enterprise weiß. Pro zeigt $15/Monat pro Nutzer, Trial-Badge und sechs kurze Features; Enterprise trägt „Includes Pro, plus“ und ergänzende Betreuung/Verwaltung. CTAs unten bündig: blau „Start your trial“ und dunkel „Book a demo“. Umgebender Grund hell, schmale Rasterlinien, schwebend wirkende Navigationspille; der obere Pricing-Titel ist angeschnitten. CSS Grid, pro Karte Flexcolumn mit CTA per `margin-top:auto`; Preis als echte strukturierte Textgruppe. **Regel:** CTA-Verb folgt dem Erwerbsweg. Enterprise benötigt keinen erfundenen Festpreis. Navigationposition und Scrollverhalten aus diesem Ausschnitt nicht beweisbar.

### R3: Runner – nüchterne gemeinsame Vergleichsfläche

Quelle: [Runner](https://mobbin.com/sites/sections/b1e65803-d2a9-4349-b305-07046cb2a67c), gleichnamiges JPEG.

Serif-Titel, weißer Grund, drei Spalten Standard/Pro/Ultra mit blassgrauen Titel-Preis-Flächen ($50/$100/$200 pro Monat). Kleine schwarze Quadrat-Bullets, punktierte Trennlinien. Gemeinsame Enterprise-Zeile darunter mit Erläuterung links und einer unaufgeregten CTA rechts. Keine stark hervorgehobene „Most popular“-Karte. **Regel:** Wenn Unterschiede als Featurelisten funktionieren, genügt ruhiges Vergleichsgrid; Empfehlungsauszeichnung ist keine Pflicht. Bei zeilenweise identischen Vergleichsdimensionen native Tabelle verwenden, sonst Artikel mit Listen. Punktlinien und sanfte Hintergründe in CSS, keine Rastergrafik erforderlich. Behauptete Adoption im Enterprise-Text ist nur abgebildeter Claim.

## Formular und Navigation: drei beobachtete Einstiege

### F1: Notion – Beleg neben Qualifizierungsformular

Quelle: [Notion](https://mobbin.com/sites/sections/fcfe2d50-61b3-4385-a7e5-b18046eb232c), gleichnamiges JPEG.

Links Überschrift, konkrete Beratungsgründe, Kundenlogo-Reihe und ein einzelnes Zitat in hellgrauer Fläche. Rechts zweispaltige Feldpaare mit sichtbaren Labels und Pflichtstern; Kontaktgrund über volle Breite, optionale Textarea, Marketing-Checkbox, kleiner schwarzer Submit, Datenschutztext und getrennter Supporthinweis. Hauptfläche weiß, geringe Rand- und Schatteneffekte. Aufgabe: Sales-Anliegen qualifizieren und Supportanfragen umleiten. HTML-`form` mit sichtbaren `label`, `select`, `textarea`; Logos SVG und Beleg als `blockquote`. Die sichtbare angehakte Marketing-Box ist kein Vorbild für Einwilligungsdefaults. Antwortzeit, Erfolgsmeldung, Fehlerzustände und echte Pflichtvalidierung sind nicht im Ausschnitt belegt.

### F2: Miro – lineares Formular mit Kontakt-Erwartung

Quelle: [Miro](https://mobbin.com/sites/sections/270f478a-6a90-49fb-8b34-f5751d7254f9), gleichnamiges JPEG.

Schmale weiße zentrale Formfläche, weiches Punktmuster außerhalb; volle Navigation bleibt oben verfügbar. „We'll get back to you shortly“ setzt grobe Erwartung. Neun vertikal gestapelte Eingabe-/Auswahl-/Textfelder, breiter blauer Submit. Viele Feldbezeichnungen sind im Screenshot innerhalb der Inputs; persistente externe Labels sind nicht sichtbar. **Ableitung:** Lineare Leserichtung ist hilfreich, Placeholder-only darf trotzdem nicht kopiert werden. CSS radial-gradient genügt für Punktmuster; keine Grafikdatei. Pflichtumfang reduzieren, sichtbare Labels ergänzen, echte Antwortfrist nur mit operativer Grundlage angeben. Das Muster selbst belegt keine Validierung oder Zustellung.

### F3: Airtable – mehrstufiger Einstieg mit Supportabzweig

Quelle: [Airtable](https://mobbin.com/sites/sections/faecc3dd-44fc-4b65-a840-76106daaa1df), gleichnamiges JPEG.

Zwei helle Headerstreifen über dunkelgrauem Hauptgrund; große weiße Überschrift. Links weiße Formkarte mit Supportlink, fünf sichtbaren vorausgefüllten Feldern und blauem „Next“. Rechts breite Belegfläche mit Headline, sechs Logos sowie Support-/Nonprofit-Abzweigen. Große Tonwertdifferenz zieht zum Formular. **Grenze:** „Next“ belegt einen angekündigten Folgeschritt, nicht dessen Inhalt; dieser einzelne Screenshot beweist keinen vollständigen Lead-Flow. HTML-Form/Navigation, CSS-Flächen; Logos als zugelassene SVGs. Felder mit echten Labels versehen, Daten aus Research-Aufnahmen niemals als Defaults übernehmen. Logo-Kontrast wirkt hier sehr schwach: visuell prüfen statt übernehmen.

## Vollständige Flow-Lektüre A: Apollo „Booking a meeting“

Quelle für alle sieben Screens: [Apollo-Flow](https://mobbin.com/flows/33e2950f-e537-41c3-b7a1-e373c040b835). Jeder Screen ist tatsächlich betrachtet und als `images/<screen_id>.jpg` gespeichert. Das sind sieben dokumentierte Zustände, **keine sieben unabhängigen Aufgaben**.

| Position / Screen-ID | Tatsächlich sichtbarer Zustand | Übergang / Aufgabe |
|---|---|---|
| 1 / `50e13805-f2a9-4bc2-b254-e8d2c2c96cf0` | Apollo-Admin mit linker App-Navigation, Meetings-Tab, drei Karten für 15/30/60 Minuten und Preview/Copy link | Host stellt Einstieg bereit; dieser Admin-Screen gehört nicht in die öffentliche Besucherreise |
| 2 / `90bc1d39-08ec-44ee-a60b-b5d3c0aaf21e` | Öffentliche Seite „Book a meeting with Sam Lee“, links 30-Minuten-Kontext, rechts Monatskalender und Zeitzonenwahl, noch keine Zeitspalte | Besucher versteht Dauer/Ort und wählt Datum |
| 3 / `b9fa282b-64eb-45bc-8125-de49ee0de13c` | Gewählter 14. Februar blau, zusätzliche rechte Spalte mit Zeitbuttons | Datumsauswahl erschließt passende Zeitoptionen |
| 4 / `3f3f8266-647b-455b-927a-aff3f2120c5d` | 09:30 ausgewählt; daneben erscheint separater blauer Confirm-Button | Auswahl und Fortschritt sind getrennte Handlungen |
| 5 / `f3406a72-8cb1-4c5b-969f-47eabef921cb` | Zweispaltiges Detailformular, links „Go back“ und Zusammenfassung inklusive Datum/Zeit/Zeitzone; rechts Name, E-Mail, Gast-E-Mails, optionale Vorbereitung, Submit | Personendaten erst nach konkreter Terminwahl; Kontext bleibt sichtbar |
| 6 / `dd61455e-a9bd-4cf6-81f0-67fd4bb1a013` | Gleiche Struktur mit ausgefülltem Name/E-Mail, Zusatzfelder leer | Minimale Daten genügen sichtbar zum dargestellten Happy Path; technische Pflichtprüfung unbekannt |
| 7 / `6f5acb59-8765-4e76-8b64-f53f7f48ac18` | Grüne Bestätigung mit Konfetti; Text zu versandter Kalendereinladung; Termin-Detailkarte; Reschedule; dunkler Hilfehinweis, falls Termin nicht im Kalender auftaucht | Abschluss zeigt Ergebnis, nennt Folgeereignis und bietet Korrektur/Hilfe |

**Visuelles System:** Überwiegend weiß/hellgrau, dünne neutrale Rahmen, kleine Sans-Texte, mittelblau für Auswahl und Fortschritt. Kartenbreite wächst sichtbar beim Übergang von Datum zu Zeit; Kontext bleibt links. Erfolg bekommt Grün, Hilfe unten Dunkelblau/Gelb. Diese Zustandsfarben haben eine Funktion und sollten im eigenen Tokensystem als `action`, `selected`, `success`, `help` getrennt behandelt werden. Der gelbe Apollo-Admin-Akzent muss nicht zum öffentlichen Buchungsdesign gehören.

**HTML-first-Übertragung:** Öffentliche Reise beginnt beim Kalender, nicht im Host-Dashboard. `form` mit `fieldset/legend` je Schritt; verfügbare Tage und Zeiten als echte Buttons, Zustand zusätzlich textlich/ARIA beschreiben. Gewählter Termin bleibt als Zusammenfassung präsent. Serverseitige Terminverfügbarkeit und serverbestätigte Buchung sind obligatorisch für echte Funktion. JavaScript steuert Kalender und progressive Offenlegung; Marketingseite bleibt HTML. Ein komplexer Kalender kann eine gezielte Insel oder ein zugänglicher externer Scheduler sein. Nicht einen ganzen SPA-Stack allein wegen eines Buchungswidgets übernehmen.

**Eigene erforderliche Zustandsprüfung, nicht aus der Quelle bewiesen:** Datum ändern invalidiert alte Zeitwahl; Zeitzonenwechsel zeigt eindeutige Zeit; Slot inzwischen vergeben führt zurück zu gültigen Alternativen; Netzwerk-/Serverfehler erhält Eingaben; Doppel-Submit erzeugt keine Doppelbuchung; Back erhält Daten; Fokus folgt Schrittwechsel nachvollziehbar; Success erst nach Backendbestätigung. Eine Konfetti-Animation benötigt Reduced-Motion-Rücksicht, statischer Erfolg muss genügen.

## Vollständige Flow-Lektüre B: Zoom „Scheduling a booking“

Quelle für alle vier Screens: [Zoom-Flow](https://mobbin.com/flows/aebae749-cfd4-4e12-bea2-d099370de550). Alle betrachtet und gespeichert.

| Position / Screen-ID | Tatsächlich sichtbarer Zustand | Übergang / Aufgabe |
|---|---|---|
| 1 / `781e68e0-5472-43fa-b207-96b1fec8e13a` | Links Host, „Mentoring Session“, Dauer und Minikalender; rechts fünf Tages-Spalten, Zeitlisten, „No availability“ für zwei Tage, Zeitzone oben und 24-Stunden-Schalter | Besucher vergleicht mehrere Tage gleichzeitig, bevor er einen Slot wählt |
| 2 / `82c8b5bc-eaab-4000-bca0-511c2220e53d` | Schmale zentrierte Detailseite, Terminzusammenfassung oben, persistente Labels, Name-Fokus mit blauem Ring; Book wirkt grau/deaktiviert | Formular folgt Slotwahl; Kontext bleibt, Kalender weicht fokussierter Eingabe |
| 3 / `3d5dcb6c-278b-4f62-b097-58567818202b` | Ausgefüllte Pflichtfelder und Vorbereitungstext, Book blau; Add Attendees und Back verfügbar | Eingabefortschritt wird durch sichtbaren Action-State abgebildet; genaue Validierungslogik unbekannt |
| 4 / `624b905e-243d-4a66-b6b4-9f4da81fd1b0` | Confirmed, Terminname, Datum/Zeit/Zone, Meetinglink; Reschedule und Cancel gleichrangig; Schedule another event darunter | Ergebnis ist konkret nutzbar und korrigierbar, kein bloßes „Danke“ |

**Visuelles System:** Weiß, viel freier Raum, dezente graue Trennlinien, Blau für Links/Aktion/Fokus, sichtbare 1-Pixel-artige Inputränder. Auswahlansicht breit und vergleichend, Form/Success wesentlich schmaler. Kaum dekorative Grafik; kleines Erfolgsillustrationssymbol. Typohierarchie bleibt bei Host, Terminname und Abschnittsüberschrift verständlich, obwohl die absoluten Schriftgrößen gering sind.

**Gegenüber Apollo:** Zoom investiert Platz in gleichzeitigen Tagesvergleich; Apollo reduziert anfängliche Entscheidungen und blendet Slots erst nach Datum ein. Entscheidung für eigenen Service folgt Terminangebot: viele ähnliche Slots an mehreren Tagen sprechen für Vergleich; wenige passende Termine für progressive Auswahl. Beides verlangt klare Zeitzone, Dauer, Zusammenfassung und nachträgliche Korrektur. Die breiteste Zoom-Ansicht darf nicht unverändert auf 360-Pixel-Mobile schrumpfen; mobile Tagesnavigation wäre eigene Gestaltung, keine beobachtete Mobbin-Eigenschaft.

## Vergleichsregeln für den gestagten Web-Skill

1. **Referenz nach Aufgabe und Zustand suchen.** Sektionen für lokale Gestaltung, Screens für konkreten Zustand, Flows für Übergänge. Je Suche einen sichtbaren Aufbau beschreiben, Plattform im eigenen Parameter setzen, task_intent konstant halten. Ergebnisse samt kanonischer URL und Bild sichern; ein Suchtreffer allein zählt nicht als betrachtete Referenz. Bei Flows alle relevanten Positionen laden, nicht nur die vom Tool ausgegebenen 1/Mitte/Ende-Vorschauen.
2. **Eine Entscheidungsmatrix vor Komponentenwahl führen.** Hero: Textklarheit oder kontextgebende Fotos? Proof: messbare Ergebnisse, menschliche Stimmen oder operative Fakten? Pricing: unabhängige Pakete, Basis-plus-Add-on oder Self-Service/Vertrieb? Kontakt: direkte Anfrage, qualifizierter Saleskontakt oder sofortige Terminwahl? Erst daraus Grid, Inhalt und CTA-Verb ableiten.
3. **Elemente in reale Verantwortlichkeiten zerlegen.** Text, Formular, Listen und Navigation sind HTML; Flächen, Spacing, Linien, Raster und einfache Verläufe CSS; Logos und einfache Icons zugelassene SVGs; Fotos/komplexe Illustration Rasterbilder; Kalenderzustand minimale gezielte Interaktivität. Screenshot-Look darf niemals Formular, Text oder Navigation als Bild ersetzen.
4. **Tokens als System ableiten, Werte belegen.** Sichtbar ist eine Rollenverteilung (Grund/Ink/Muted/Action/Selected/Success), nicht die exakte Hex-Farbe. Eigene Palette kontrastprüfen; Typo nach Rollen und Zeilenlängen, Abstände nach Rhythmus, Radien nach Formfamilie festlegen. Kein Sammeln von Violett aus Lemon Squeezy, Pastell-Bento aus Jasper, 3D-C aus Clerk und schwebender Qatalog-Navigation zu einem beliebigen Mischstil.
5. **Von Happy Path zu vollständigem Auftrag ergänzen.** Öffnen, Auswahl, Fortschritt, Zurück, Fehler, Absenden, belegter Erfolg und Änderung/Abbruch benennen. Archivbilder liefern nur Teilbelege; fehlende Zustände gehören ausdrücklich in die Implementierungs- und QA-Liste, nicht in erfundene Quellenbeschreibungen.

## Konkrete Abnahmekriterien

- Pro gewählter Referenz steht: Quelle/ID, betrachtet ja/nein, Rolle, sichtbare Konstruktion, übernommenes Prinzip, bewusst nicht übernommenes Merkmal, Grenzen. Unlesbare oder abgeschnittene Aufnahmen sind entsprechend markiert.
- Ein vollständiger Lead- oder Buchungsweg enthält wirkliche Zielaktion, Backend-/Provider-Vertrag, Bestätigung, Fehlererhalt und Korrekturweg. Ein „Next“-Screenshot ist kein Flow-Beweis.
- Belege haben echte Attribution; Zahlen werden separat inhaltlich geprüft. Vorlagenlogos, Namen und Beispiel-E-Mails bleiben Forschungsinhalt und wandern nicht in das Kundenprodukt.
- Responsive, Focus, Keyboard, Fehlermeldungen, Contrast, Reduced Motion und Ladeverhalten werden an der eigenen Umsetzung geprüft; nichts davon ist durch einen Mobbin-Screenshot zertifiziert.
- Formularfelder, Preise, Metriken und CTAs bleiben echte erreichbare DOM-Inhalte. Keine Screenshot-Fläche als Ersatz für eine funktionsfähige Website.

## Evidenzprüfung und Beobachtungsprotokoll

Die fünf JSON-Dateien sind syntaktisch geprüft; 23 referenzierte IDs besitzen lokale JPEGs. 12 Sektionen wurden inline betrachtet; zunächst sechs Flow-Vorschauen inline und anschließend sämtliche fünf ausgelassenen Zwischenzustände mit `view_image`. Somit sind alle 23 Dateien tatsächlich visuell untersucht. Ein toolseitiger LSP-Hook verweigerte anfangs lediglich den Pfad außerhalb des Request-cwd; persistiert und mit `jq` geprüft wurde anschließend im eigenen Arbeitsverzeichnis. Keine Live-Skills verändert, nichts publiziert.

Task-observer: gemeinsamer Speicher, Frontmatter und aktive Prinzipien gelesen; Review-Datum 2026-09-07, kein fälliger Review. Zugehörige Observation 0016 vollständig gelesen, bereits actioned. Keine neue Observation geschrieben: konkrete Erkenntnisse gehören als beauftragte Research-Evidenz direkt in diesen SIP-Baustein; keine neue unabhängige Workflow-Korrektur festgestellt.
