# UX-Entscheidungen aus konkreten Referenzen

Für Angebotsseiten, Produktbeweise, Preisentscheidungen, Navigation und Anfrageabläufe nach [design-depth.md](design-depth.md) laden. Quellen und private Bildbelege im [Studienindex](design-depth-sources.md). Tiefe Kapitel mit Bauanleitungen über den [Design-Depth Router](design-depth/INDEX.md): [Forms](design-depth/forms.md), [Navigation](design-depth/navigation.md), [States/Proof/Pricing](design-depth/states-proof-pricing.md). Sichtbarer Erfolg ist keine Conversionmessung; archivierte States sind keine selbst bedienten Flows.

## Beweisart bestimmt Darstellung

| Vorhandener echter Beweis | Geeignete Struktur | Referenz / Warnung |
|---|---|---|
| Konkretes Projektergebnis mit Kontext | Case mit Aufgabe, Arbeit, Ergebnis; aussagekräftige Bilder | Arcstone: Architektur als Hauptbeweis; keine erfundenen Projekte |
| Autorisiertes Kundenzitat | `blockquote` mit Name/Rolle und passendem Portrait, bei Bedarf Metrik daneben | Jasper-Mobbin kombiniert Zitat, Mensch und Kennzahl; keine Stockperson als Kunde |
| Mehrere nachvollziehbare Messwerte | vergleichbares Metrikgrid mit Zeitraum/Einheit/Quelle | Amplemarket; keine 99.99%-Behauptung aus dem Referenzbild übernehmen |
| Funktionsweise eines Produkts | Übersicht plus spezifischer Detailbeweis | Attio, Aakib; echte Daten oder klar deklarierte Illustration |
| Prozess-/Betriebszuverlässigkeit | Schritte, Verantwortlichkeiten, reale Betriebsbelege | Zendesk; nicht in austauschbare Testimonialkarten zwingen |

Eine Logozeile ist nur sinnvoll mit belegter Beziehung und passenden Rechten. Fehlende Beweise nicht mit Logoipsum, erfundenen Bewertungen oder pseudoexakten Prozentwerten ersetzen. Hubmini/Aakib zeigen, dass saubere Komposition falsche Copy nicht heilt. Schrift, Bild und CTA sollen dieselbe Leistung benennen.

## Geschäftsmodell bestimmt Preisstruktur

Stripe-Refero zeigt zwei Erwerbswege, Linear vier Tarife; Clerk-Mobbin Grundplan plus Addons, Qatalog Trial versus Sales. Drei gleich grosse Preiskarten sind deshalb keine Standardantwort.

Vor Layout entscheiden: Kauf/Anfrage, Nutzer-/Nutzungs-/Projektbasis, Abrechnungsperiode, enthaltene Leistung, Limits, Addons, Steuern, Kündigung und Primärziel. Nur echte Angebote darstellen. Vergleiche in gleichgerichteten Zeilen, wenn Besucher dieselben Merkmale prüfen; individuelle Leistungen lieber als klar getrennte Wege. Eine „empfohlen“-Markierung braucht sachlichen Grund, nicht nur Hervorhebungsbedarf.

Checkout: Auswahl, Leistung, Rechnungsdaten, Summe und Verpflichtung nachvollziehbar verbinden. Nexora zeigt korrekt 99.90 − 29.97 = 69.93, aber das Bild beweist keine Zahlungsintegration. Rabatte, Währung und Periode zusammen anzeigen. Bestätigungsbutton benennt die tatsächlich ausgelöste Handlung. Erfolg erst aus autoritativem Ergebnis, Fehler mit erhaltenen Daten und sicherer Wiederholung.

Billing: Kestrel trennt Plan, Usage, Invoice und gefährliche Aktion. Daten bilden Handlungsgründe; Upgrade nicht überall gleich laut. Kündigung kann Bestätigung benötigen, darf aber keine irreführende Sackgasse werden. Downloadlinks liefern die angekündigte Datei; „PDF“ ist kein kosmetischer Buttontext.

## Formulare und progressive Schritte

Mobbin Notion/Miro/Airtable und Refero Rox liefern Feld-/Fehlerbilder; shadcn trennt `data-invalid`, `aria-invalid` und `FieldError`. Native Emailvalidität ersetzt keinen sichtbaren Appfehler. Dauerhaft sichtbare Labels, sinnvolle `autocomplete`-/`inputmode`-Werte und Feldhilfe verwenden. Pflicht/optional ausdrücklich, Fehler am Feld und gegebenenfalls Zusammenfassung; Farbe allein reicht nicht.

Ein mehrstufiger Ablauf passt, wenn Antworten den nächsten Schritt bestimmen oder die Aufgabe wirklich komplex ist. Karguls Video zeigt Preisfit → Identität → Termin → Bedarf → Erfolg. Seine schmale konstante Formularfläche und optionale Skipaktion sind übertragbar; die lange Schrittzahl ist kein Universalvorbild. Für einfache Serviceanfragen kann ein kurzes Formular mit passendem Kontext weniger Arbeit machen.

Zustandsvertrag: aktuelle Position, erhaltene Werte, Zurück, Feldfehler, Netzfehler, Loading, Erfolg; sensible Daten nicht ungefragt dauerhaft speichern. Fokus nach Schrittwechsel logisch setzen, Screenreader über Änderung informieren. Browser-Back und Reload bewusst entscheiden. Bei Upload Dateityp/Grösse und echten Fortschritt/Fehler anzeigen.

Booking: Zeitzone sichtbar bei Auswahl UND Bestätigung; vergangene/unverfügbare Slots sperren, Konkurrenzbuchung serverseitig behandeln. Karguls frühe 30-Tage-Bedingung widerspricht späteren 2–6-Monatsoptionen: vor UIpolish fachlich bereinigen. Seine Erfolgskarte lässt Terminübersicht aus; eigene Bestätigung braucht Datum, Zeit, Zeitzone, Kontakt und Änderungsweg. Refero Acne bestätigt Anfrageeingang, keine feste Buchung. Diese Verben müssen zum Backendzustand passen.

## Navigation und Informationsarchitektur

Appnavigation (Lurni/Oqulus/Kestrel) zeigt Orte und Werkzeuge; öffentliche Agenturnavigation erklärt Angebot, Arbeit und Kontakt. Mindspace vermischt beide Rollen. Vor dem Bau Zielgruppe und Berechtigung pro Bereich bestimmen. Eine eingerückte Liste braucht nicht automatisch ein komplexes Treewidget.

Megamenü aus 21st ist Quellmaterial, keine direkt passende Websitekomponente: feste 900px Breite und `next/link` müssen zum Projekt passen. Nativ mit passenden Links und einem Disclosuretrigger umsetzen, oder begründete kompatible Insel. Escape, Tabfolge, Fokus, Pointerwechsel und mobile Alternative tatsächlich prüfen. DOMclick ist kein Touch-/Keyboardbeleg. Stickyheader benötigen passenden `scroll-margin-top`, damit Sprungziele nicht verdeckt werden (OpenDesign).

Suche/Filter: angewendete Auswahl, Ergebnismenge, Reset und leere Ergebnisse getrennt von „noch keine Daten“ behandeln. Refero Mocha zeigt „No apps yet“ während aktiver Suche: Warnfall. Ein leerer Erstzustand erklärt Anlegen; null Suchtreffer erklären Änderung der Suche; fehlende Berechtigung erklärt Zugriff. Keinen falschen Create-CTA einsetzen, wenn Daten bloss weggefiltert sind.

## Übertragung auf Dienstleistungswebsites

Produktdashboards liefern Details für Status, Gruppierung und Daten, sind aber kein Grund, einer Handwerkerseite eine Appshell zu geben. Für Dienstleistungen: klare Leistung und Gebiet, reale Menschen/Arbeit, passende Unterseiten, nachvollziehbare Anfrage. Markenbild unterstützt diese Aufgaben. Mobbin/Refero als Musterquelle wählen, danach echten Betriebskontext einsetzen.

Dos: eine Frage pro Abschnitt, echte Beweise passend darstellen, Aktionsgewicht nach Entscheidung, Fehler/Leerzustände mitdenken, mobil neu ordnen. Don'ts: fiktive Kennzahlen, kopierte Markenidentitäten, unlesbare Gray-on-Gray-Labels, Film-Erfolg als Backendbeleg, dekorative Tabellen als echte Daten, universelle Pricing-/FAQformeln.

## Abnahmefragen

Kann ein neuer Besucher Angebot und nächsten Schritt benennen? Kann er Preis/Leistung vergleichen? Sind wichtige Einheiten und Bedingungen klar? Funktioniert derselbe Weg mit Tastatur, schmalem Viewport und längstem Inhalt? Bleiben Eingaben bei Fehlern erhalten? Ist der Erfolgsbegriff wahr? Für einen tatsächlichen Websitebau diese Aufgaben bedienen und Belege speichern; beim Referenzlernen ungeprüfte Funktionsaspekte ausdrücklich als Grenzen nennen.

## Kernregeln aus den tiefen Kapiteln (2.2.0)

Je Kapitel die zehn wichtigsten Regeln; Bauanleitungen, Stilfamilien-Varianten und Gegenbeispiele stehen im Kapitel. Die Abschnitte oben bleiben gültig und liefern die Referenzbegründung.

### Forms → [design-depth/forms.md](design-depth/forms.md)

1. Label sichtbar über dem Feld, Pflicht im Label, nie Placeholder-only; Label-im-Feld nur als statisches Zwei-Zeilen-Feld, nie als Float-Animation.
2. Genau ein dunkles Element pro Formular (Submit oder gewählter Zustand); Auswahl und Fortschritt trennen sich durch Füllung, nicht durch Hue.
3. Fokus als 2–3 px Ring in Aktionsfarbe; derselbe Ring für Button, Input und Select.
4. Kontext des Offers bleibt neben oder über dem Formular sichtbar.
5. Inputs teilen Radius-Familie und Höhe mit den Buttons: 36–46 px Desktop, mindestens 44 px Touch, 16 px Schrift auf Mobile.
6. Fehler dreifach codieren (Feldfläche/Border, Textfarbe, Fehlerzeile direkt unter dem Feld) plus `aria-invalid` und `aria-describedby`.
7. Multi-Step: ein Screen, eine Frage, ein Primär-Button; optional = „Skip for now" statt disabled; Pflichtfeld-CTA disabled bis valide.
8. Chips/Radio-Gruppen als Materialwechsel; Segmented Control mit dunklerem Track und 2–5 px Inset; Checkbox nie vorangehakt; Select mit Chevron, Placeholder heller als Wert.
9. Booking: Zeitzone bei Auswahl und Bestätigung, vergangene Slots gesperrt; Bestätigung als Icon → H1 → Kontextsatz → Detail-`dl` → gleichrangige Korrektur-Buttons → Sekundärlink.
10. Aktionen rechtsbündig in Karten und Dialogen, full-width nur in schmalen Karten; ab etwa 8 Feldern Zwei-Spalten-Grid mit Textarea, Select, Checkbox und Button in voller Breite.

### Navigation → [design-depth/navigation.md](design-depth/navigation.md)

1. Drei-Zonen-Grid (Logo | Links | ein CTA) ist die Grundform; Höhe 48–80 px, Marketing höher als App.
2. Genau ein CTA oben, und nur er trägt Farbe oder Fläche.
3. Zwei Familien für die Nav-Fläche: Zeile oder schwebende Kapsel (Logo-Kreis + Link-Pille + CTA-Pille).
4. Transparente Nav über Foto braucht einen Dunkelverlauf, kein Blur.
5. Aktiver Link über Helligkeit, Pille oder 1 px Unterstrich, nie Akzentbalken; Nav-Text Muted 12–15 px, Versalien nur mit Tracking und maximal 5 Links.
6. Dropdown-Trigger mit Chevron; Mega-Menü als Liniengrid mit Escape, Tabfolge, Fokus und mobiler Alternative; feste Pixelbreiten fluid machen.
7. Logo-Zone: Wortmarke oder 24–44 px Kachel mit Marken-Radius; Announcement-Bar 38–52 px in Tonwert statt Farbe.
8. Mobile-Menü: Burger in 40 px Box wird X, Panel als Overlay oder Drawer, Menüzeilen auf Touch-Höhe.
9. Footer: Brand-Spalte breit, 2–5 schmale Linkspalten, Bottom-Bar mit Hairline, Links ohne Umbruch; Riesenwortmarke ist Stilmerkmal, nicht Pflicht.
10. Sticky nur mit Funktion, Anker mit `scroll-margin-top`; im Funnel verschwindet der Nav-CTA; App-Shell: Sidebar 200–300 px, Items 30–48 px, Aktiv als Tonwertfläche.

### States, Proof, Pricing → [design-depth/states-proof-pricing.md](design-depth/states-proof-pricing.md)

1. Jede datenabhängige Fläche hat leer, kein Treffer, Loading, Fehler und Success; „noch keine Daten" ist nicht „keine Treffer".
2. Loading als strukturelles Skeleton; Pending hält Breite und zugänglichen Namen des CTA.
3. Success dort, wo die Aktion stattfand, mit `role="status"`; Fortschritt erst nach erfolgreichem Submit vollständig.
4. Hover, Fokus und Selected sichtbar unterscheiden; aktiver Zustand gewinnt Kontrast (Inversion, Sättigungssprung, Raised-Fill oder Outline-Ring, eine Sprache pro Interface); Status ist keine Aktion.
5. `aria-selected`, `aria-current`, `aria-pressed`, `aria-expanded`, `disabled` passend zur Funktion; Accordion-Icon zeigt offen/geschlossen.
6. Proof als Kette: Produktbeleg → Kompatibilität/Kunden → Outcome → Stimme → CTA; Logos direkt unter der Behauptung, die sie belegen, Integrations- und Kundenlogos nicht vermischen.
7. Jede Zahl mit Quelle, Zeitraum, Grundgesamtheit und Definition; eine belastbare Proof-Zahl hervorheben statt fünf unbelegte; Sterne nur mit Plattform, Skala und Anzahl.
8. Testimonials als Mini-Fälle mit Person, Rolle, Organisation, Ausgangslage, Outcome; lesbar, nie verkleinert; Bild-Captions als Proof mobil behalten.
9. Pricing: Tier-Name, ICP, Preisbasis, Zeitraum, CTA, Features in derselben Lesereihenfolge; höchstens ein hervorgehobener Tier mit einem Mittel; Auswahl invertiert die ganze Karte; Rabatt und Abrechnungsbasis zusammen; Rechnung vor dem Pay-CTA; Enterprise mit konkretem Schritt; Feature-Matrix mobil als Tier-Tabs.
10. FAQ nach Kaufbarrieren geordnet, echtes `details`/`summary` mit wechselndem Icon; Kachel-FAQ nur für kurze Antworten ohne Hover-Abhängigkeit; „alle Fragen" nur mit echtem Ziel.
