<!-- Private research origin: /root/skill-workspace/skill-updates/2026-09-07-web-design-depth/research/refero/REPORT.md; images/code remain outside the skill. -->

# Refero: visuelle Tiefenrecherche für den Web-Skill

Stand: 07.09.2026. Ausschließlich Recherche und SIP-Zulieferung; keine Live-Skill-Änderung, keine Publikation. Vier vollständige Style-Referenzen, vier visuelle Suchrichtungen, neun konkrete Screens und ein vollständiger Drei-Zustands-Flow. Alle 13 unterschiedlichen Motive wurden als tatsächliche Bilder geöffnet. Zusätzlich wurden Linear und der Acne-Erfolgszustand mit get_screen_image(full) geöffnet.

## Ergebnis

Refero eignet sich als dreiteilige Quelle: Styles liefern visuelle Hypothesen und Rollen, Screens belegen sichtbare Struktur und Zustände, Flows erklären Übergänge. Es ist keine verifizierte CSS-Extraktion und keine Sammlung automatisch empfehlenswerter UX. Der stärkste zusätzliche Skill-Baustein ist deshalb ein **Widerspruchs- und Evidenzprotokoll zwischen Style-Text, Bild, Zustand und eigener Umsetzung**.

Die vier Stile unterscheiden sich durch Hierarchie, Medienrolle und Formen, nicht nur durch Farben. CLOU nutzt plakative Satzflächen und echte Architektur; Gumroad verteilt illustrative Energie um einen funktionalen Conversion-Kern; Oxide verbindet reale Hardware mit präziser technischer Darstellung; Attio setzt eine große Produktoberfläche unter einen kompakten, mittigen Einstieg.

## Evidenz und Reproduzierbarkeit

- Native Werkzeuge: refero_search_styles, refero_get_style, refero_search_screens, refero_get_screen, refero_search_flows, refero_get_flow, refero_get_screen_image. Suche erst nach Stil, dann nach Element und Zustand, schließlich nach der Journey.
- Style-Suchen: editorial monochrome architecture studio; playful vivid creator tools bold typography; dark technical data infrastructure; Attio editorial SaaS typography.
- Screen-Suchen: contact form inline validation; pricing cards annual monthly toggle; empty state create first project; navigation mega menu; Stripe pricing; Linear pricing. Flow-Suche: booking appointment.
- Rohquellen: [full-styles.json](/root/skill-workspace/skill-updates/2026-09-07-web-design-depth/research/refero/full-styles.json), [style-searches.json](/root/skill-workspace/skill-updates/2026-09-07-web-design-depth/research/refero/style-searches.json), [screens.json](/root/skill-workspace/skill-updates/2026-09-07-web-design-depth/research/refero/screens.json), [flow-4360.json](/root/skill-workspace/skill-updates/2026-09-07-web-design-depth/research/refero/flow-4360.json). Vollständige IDs, Ursprungs- und Bild-URLs dort und in [EVIDENCE.md](/root/skill-workspace/skill-updates/2026-09-07-web-design-depth/research/refero/EVIDENCE.md).
- Bilder unter images/. UUID benennt die Refero-Entität; diese muss nicht mit dem Dateinamen auf dem Refero-CDN übereinstimmen. Beispiel Linear: Screen-ID 5d709… verweist auf Bilddatei 376bfd….
- **B = Bildbeobachtung**, **Q = Quelle nennt Wert**, **R = eigenes Umsetzungsrezept**. Q ist kein gemessener Browserwert. JPEG-Farben und gerenderte Vorschauen liefern keine belastbaren originalen CSS-Maße. Hover, Keyboard, Breakpoints, Versand oder Backend-Erfolg wurden nicht ausgeführt.

## Vier getrennte Stilmechaniken

### CLOU architects — Satzfläche und Architektur

Quelle: https://www.clouarchitects.com ; Style 5c404b95-00d9-4188-9db0-03692ad28a3e.

**B:** Fast weiße Fläche; schwarzes Zeichenlogo links; drei Textlinks; aktive Info-Seite über Unterstreichung; Sprachwechsel weit rechts. Darunter ein enormer weißer Satz auf hartem schwarzen Rechteck. Die schmale, breite Architekturfotografie darunter trägt Rot, Grün und bauliche Tiefe. Das Bild ist deutlich breiter als die Satzfläche. Keine Schatten, keine runden Karten, keine generische Buttonleiste.

**Q:** Canvas #fffffc, Ink #000000. Rot #ff0000 gehört ausdrücklich in fotografische Architektur, nicht in UI. Circular Std, 400/700; extrem große Displaystufen bis 201px; Tracking bis -0.07em. Radius 0, Elementgap 17px, Sectiongap 25px. Diese ungeraden Werte sind Quellenangaben, kein Grund, eine generische 4px-Skala darüberzulegen.

**R:** Große echte Überschrift als HTML; schwarzer Inline- oder Blockhintergrund mit kontrollierter Zeilenbox; responsive Schrift mit clamp und manuell geprüftem Umbruch. Harte Rechtecke und schmale Nav erhalten. Bild als optimierte Rasterfotografie mit bewusstem object-position; geometrisches Markenlogo nur als originales SVG. Keine CSS-Architektur aus roten Boxen als Fotoersatz.

**Tradeoff:** Merkfähigkeit und Projektcharakter entstehen unmittelbar. Für längere deutsche Serviceversprechen kann die Displayzeile überlaufen; mobil braucht es einen neu komponierten Umbruch. Die fotografische Schmalansicht vermittelt Atmosphäre, erklärt aber allein kein Projekt. Fehlende starke CTA kann für Portfolio-Orientierung passen, für dringende Dienstleistungsanfragen eine schwächere Führung sein.

### Gumroad — spielerischer Rand, funktionaler Kern

Quelle: https://gumroad.com ; Style ac783c6e-6c2b-4663-87b3-bcd12d463b0a.

**B:** Hohe horizontale Navigationszeile mit schwarzen Trennlinien; Start selling rechts als schwarzer Block. Große mittige Headline in normaler Sans-Serif-Gewichtung. Pinke, schwarze konturierte Münzillustrationen liegen versetzt am Rand und werden angeschnitten. Im Zentrum schwarzer CTA neben einem grauen Suchfeld; der Suchbutton ist nochmals als kleine weiße, umrandete Fläche abgesetzt. Unterhalb beginnen runde Inhaltskarten mit überlappendem Produktillustrationsfenster.

**Q:** ABC Favorit 400/500/700; #ff90e8 Creator Pink; schwarze primäre CTA. Kartenradius 16px, Default 4px, großes Element 24px; Sectiongap 48px. Pauschaler Buttons-Eintrag nennt 1.67772e+07px, konkrete Primary-Black-Button-Regel dagegen 4px.

**R:** Radius nach Komponente festlegen: Rechteck-CTA, Pille für aktive Nav, weichere Medienkarten. Keine globale pill-Klasse für alles. Münzen als echte Vektorillustrationen bzw. sauber lizenziertes Raster, mit wenigen positionierten Assets; Text bleibt im DOM. UI-Suche mit tatsächlichem Label, Input und Submit, kein Bild einer Suche. Dekorative Assets aria-hidden und außerhalb der Trefferflächen.

**Tradeoff:** Farbe belebt die Marke, ohne alle CTAs pink zu machen. Gleichrangige Suche und Verkaufs-CTA bedienen zwei Zielgruppen; ein Servicebetrieb mit nur einem Ziel sollte diese Zweigleisigkeit nicht übernehmen. Randillustrationen benötigen eigene Mobile-Komposition, sonst verdecken sie Texte oder erzeugen horizontalen Overflow.

### Oxide — Hardwarebeweis und technische Präzision

Quelle: https://oxide.computer ; Style 57399d2f-b94d-48df-a573-2c423077b16c.

**B:** Dunkles Canvas, schmale monochrome Navigation, grünes Logo und grüner Contact-sales-CTA. Links oben Terminal mit Tabs und Code; dünner Linienverbinder zum Hardware-Rack rechts. Große, leicht gewichtete Headline sitzt links unten. Hardware nimmt beinahe die gesamte rechte Hälfte ein und liefert den eigentlichen Produktbeweis. Grüne Bauteile im Render verbinden Medien- und UI-Sprache. Logos sind stark gedämpft.

**Q:** Canvas #0b0e12; Graphite #1f2124; Border #303235; Snow #dedede; Text #bababb; Terminal Green #00d892; gefüllte Aktion #002923. SuisseIntl 400, Display 65px/1.1; GT America Mono für technische Daten. Radius 0–1px, Gap/Padding 12px, Sectiongap 56px. Keine klassischen Dropshadows.

**R:** CSS für Oberflächen; SVG für präzisen Verbinder; semantisches pre/code mit echtem Inhalt für Terminal; hochwertiges Raster/3D-Render für Hardware. Ein fotografischer Hardwarebeweis darf nicht durch generische CSS-Würfel ersetzt werden. Animation nur bei nachgewiesenem Nutzen; statischer Screenshot belegt keine Terminal-Tippgeschwindigkeit.

**Tradeoff:** Technische Käufer erkennen Inhalt und Produktqualität. Sehr dunkle Logozeile und kleine Mono-Nav sind eine Lesbarkeitswarnung, keine Pflicht. Farbe in Code hat eine andere Funktion als globale CTA-Farbe. Tiefdunkle Flächen funktionieren nicht automatisch in hellen Umgebungen.

### Attio — kompakter Einstieg, große Produktbeweisfläche

Quelle: https://attio.com ; Style 9f0c028b-6b11-415e-ab92-f32e4597cbe2.

**B:** Weißes Canvas; dünne horizontale Trennlinien; schmale Nav mit Dropdown-Chevrons; schwarz gefülltes Start for free und umrandetes Talk to sales. Headline ist im geöffneten Vorschaubild **Sans Serif**, mittig zweizeilig und kräftig. Darunter vier gleich breite Tabs und groß gerahmte App-Oberfläche. Die UI besitzt dichte Zeilen, feine Trennlinien, wenige Farbakzente und geringe Rundung.

**Q:** #ffffff, Ink #1c1d1f, Slate #d3d8df; Action Blue #407ff2 nur Interaktion; Focus Blue #94b9ff. Buttons 10px, Cards 8px, Inputs 7px. 4px-Basis, Elementgap 8px, Sectiongap 96px, Seiten-Maximum 1440px. Typografieregel verlangt große Tiempos-Text-Headlines; außerdem nennt sie Inter Display und Inter.

**R:** Produktdemonstration als echter Screenshot oder ehrliches eigenes UI; strukturierte Tabs nur mit funktionierender Auswahl und passender Tastaturbedienung. Eine rein informative Screenshot-Galerie braucht nicht das Verhalten einer echten App vorzutäuschen. Kompakte UI und großzügige Außenräume sind zwei Dichten im selben System.

**Tradeoff:** Visuelle Ruhe funktioniert durch eindeutige Produktbeweise. Wer nur weiße Cards kopiert, verliert den Inhalt. Für diese konkrete Referenz ist die Sans-Serif-Headline bildlich belegt; ein Serif-Headline-Rezept wäre eine eigene Abweichung, kein originalgetreuer Transfer.

## Konkrete Komponentenvergleiche

### Preisangebote: Geschäftsmodell bestimmt Kartenstruktur

**Stripe, Screen 716fcc41-3f69-4a8e-9026-c795088b0886:** Zwei Angebote. Standard teilt Erklärung und Gebührenwert in zwei vertikale Teilflächen; Custom teilt individuelle Beratung und vier Konditionsklassen. Standard ist hell, Custom navy. Die schräge bunte Fläche liegt dahinter und bleibt dekorativ; Beschriftungen bleiben auf ruhigen Karten. Cyan CTA im dunklen Angebot, violett im hellen. Kleine Navigation unter den Angeboten verbindet Standard, Custom und FAQs.

**Linear, Screen 5d709fa1-5b61-416b-996f-f049cae07791:** Vier dicht benachbarte Preisspalten. Business steht etwas höher und heller, erhält weißen CTA und behält dieselbe Spaltenposition in der langen Featurematrix. Jahresabrechnung sitzt in den betreffenden Tarifen; Enterprise nennt jährliche Abrechnung explizit. Die Vollseitenansicht zeigt wiederholte CTAs nach der detaillierten Matrix und zusätzliche Abschluss-CTA.

**R:** Vergleichbare Tarifinhalte nach Preis, Abrechnung, Funktionsgruppe und CTA ausrichten. Eine semantische Tabelle für die Featurematrix; Karten für den frühen Entscheidungseinstieg. Mobile erst mit echtem Inhaltsumfang testen; keine Vier-Spalten-Verkleinerung. Dienstleistungsvarianten ohne einheitliche Preise brauchen eher eine Stripe-artige Routingstruktur als erfundene Bronze/Silber/Gold-Pakete.

**Grenze:** Die generische Pricing-Suche lieferte überwiegend Screens eines Framer-Editors. Diese wurden verworfen: Ein Editor-Canvas ist kein Beleg für reale Conversion. Marken-/URL-Präzisierung ergab die hier geprüften Kundenseiten.

### Navigation: Taxonomie-Grid versus schrittweise Auswahl

**Mercury, 13c48a4c-7882-422f-ac3b-0954163a6c7c:** Offenes Mega-Menü spannt fast die ganze Breite auf. Linke Intro-Spalte über zwei Reihen; rechts vier Sachgruppen, durch Linien in Felder gegliedert. Abschnittstitel, kurze Erklärung, kleiner PRODUCTS-Label, konkrete Links. Unten separat Personal Banking. Aktiver Nav-Trigger als hellere Pille mit nach oben zeigendem Chevron.

**On, 35affe14-fb40-4edc-966b-a50c26c7aad8:** Weißes breites Panel rechts vor einem teilweise sichtbaren Hero. Shop/Activities/Explore oben; darunter große Kategorien. Men ist geöffnet, mit eingerücktem Minus und deutlich kleineren Unterpunkten. Das ist progressive Offenlegung statt gleichzeitiger Darstellung aller Unterkategorien.

**R:** Mercury für breite, sachlich gut benannte Angebote; On für eine längere Taxonomie, bei der zunächst eine Kategorie gewählt wird. Das Bild belegt Sichtbarkeit, nicht Hover-/Click-Auslösung. Implementierung benötigt eindeutige Trigger, aria-expanded, Escape, Fokus-Rückgabe und Touch-Verhalten. Ein kleines lokales Dienstleistungsangebot benötigt meist kein Mega-Menü.

### Formulare: klare Zustände statt dekorative Felder

**Rox, 49229bf2-3256-4465-8754-b7d6f2a10c59:** Helles zentriertes Payment-Modal über gedimmtem Dashboard. Gruppenlabels links, Eingaben rechts. Rote ungültige Kartennummer und Fehlertext direkt darunter; Cancel aktiv, Save Method sichtbar gedämpft. Horizontale Gruppentrenner schaffen Lesbarkeit.

**R:** Fehlertext mit Feld über aria-describedby verbinden, aria-invalid setzen; Wert erhalten. Im mobilen Dialog Gruppenlabels über Inputs stapeln. Kein Aktivierungsverhalten oder Focus-Trap wurde im Screenshot bewiesen; diese sind eigene erforderliche Umsetzung. Das deaktivierte Save ist allein keine ausreichende Erklärung, der direkt zugeordnete Fehler ist entscheidend.

**Acne Studios, Flow 4360:** Siehe folgenden Abschnitt. Seine weiten, fast randlosen Rechteckfelder und große Produktfotografie sind ein bewusst anderer Formcharakter als Rox' dichtes Verwaltungsmodal. Beide dürfen nicht in dieselbe generische Kartenform normalisiert werden.

### Empty State: Bildquelle kritisch lesen

**Mocha, 6842d157-e23e-4c3a-9947-b8f44042919f:** Navigation, Tabelle mit Spaltenköpfen und Suchfeld bleiben stehen. Im leeren Inhaltsbereich: kleines Vier-Quadrate-Icon, No apps yet, kurze Erklärung, violetter Create new app. Dieselbe Aktion existiert oben rechts.

**Befund:** Im Suchfeld steht bereits eine Ziffernfolge. Die Copy spricht trotzdem von einem allerersten Projekt. Das kann ein leerer Suchtreffer sein, wird aber wie ein leerer Account erklärt. Aus dem Screenshot lässt sich die Datenlage nicht entscheiden. Gerade deshalb darf der Skill dieses Muster nicht ungeprüft als guten Empty State übernehmen.

**R:** Zustände getrennt modellieren: Erstnutzung → Create; gefiltert leer → Clear filters; Suche leer → Suche ändern/zurücksetzen; Fehler → Wiederholen; fehlende Berechtigung → Zugriff erklären. Nur der passende Zustand erhält die passende CTA. Ein schönes Icon behebt keine falsche Zustandsbeschreibung.

## Journey: Terminwunsch ist noch kein bestätigter Termin

Acne Studios, https://refero.design/flows/4360 :

1. **3acf3200-2066-4491-bc58-e6635d976d89:** Ort und Store wählen, Name und E-Mail, Telefon und Wunschdatum ausdrücklich optional. Linke Hälfte Formular, rechte Hälfte echte Storefotografie. Schwarzer, vollbreiter Request Appointment.
2. **53b1f56c-0623-4ac4-83f8-78a1121e96bc:** Werte sind eingetragen, Feldlabels bleiben sichtbar. Kein separater Review-Screen im aufgezeichneten Flow.
3. **33db4d94-7bdf-4c54-9ca9-c79465d06c8c:** Formular bleibt erhalten; Button erscheint als Umriss; blassgrüner Inline-Hinweis bestätigt Eingang und spätere Kontaktaufnahme. Er sagt nicht, dass ein Slot fest gebucht ist.

**Übertragung:** Für einen Dienstleistungsbetrieb kann dieses Anfrageformular passend sein, wenn Terminabstimmung persönlich erfolgt. Keine erfundene Live-Kalenderbestätigung. Nach Absenden verständliche Eingangsbestätigung und reale nächste Erwartung aus dem Kundenprozess. Persistenz, Mailversand und tatsächliche Zustellung sind separate technische Nachweise. Der Erfolgshinweis liegt in der Aufnahme am unteren Viewportrand: Implementierung muss Sichtbarkeit/Ankündigung sicherstellen, z.B. Fokus auf bestätigte Statusüberschrift oder korrekt eingesetzte Live-Region.

## Widersprüche und Grenzen der Quelle

| Konflikt | Beleg | Konsequenz |
|---|---|---|
| Attio verlangt immer Tiempos, Bild zeigt Sans-Serif-Hero | full-styles.json dos/typography vs 9f0c…jpg | Hypothese als widersprüchlich markieren; Bildmerkmal für diesen Snapshot verwenden |
| Oxide 1px-Komponentenradius vs 9999px-Pille im Agent Prompt Guide | full-styles.json | Beispiele nicht blind kopieren; konkrete Komponente + Bild priorisieren |
| Oxide Display-Tracking -0.005em in Typografie vs -0.05em im Prompt | full-styles.json | Faktor-10-Differenz bleibt ungeklärt; eigenes optisch geprüftes Tracking explizit R |
| Gumroad pauschal riesiger Radius vs Primary 4px und Nav-Pille | full-styles.json + Bild | Rollenmatrix statt eines globalen Button-Radius |
| Mocha No apps yet bei sichtbarer Suchanfrage | 6842…jpg | Zustandsdiagnose vor Musterübernahme |
| Full-Bild kann weiterhin nur eine Bildschirmaufnahme sein | Acne full im Vergleich zu Linear full | full bedeutet nicht garantiert gesamte Seite; Abdeckung offen dokumentieren |

Quellen enthalten konkrete HTML/CSS-Beispiele, aber keine Lizenzfreigabe zur beliebigen Weiterverteilung, keine Garantie für Barrierefreiheit und teils keine vollständige Semantik. Besser Mechanik selbst implementieren und Assets/Fonts separat lizenzieren. Bilder wurden für interne Referenzanalyse gespeichert; keine Originalmarke als neue Kundenmarke verwenden.

## Empfohlene SIP-Ergänzung für web

1. **Evidenzfelder pro Referenz:** UUID, URL, Bilddatei, betrachteter Ausschnitt/Zustand, B/Q/R, ungelöste Widersprüche. Ein bloßer Link oder eine semantische Beschreibung ist keine Sichtprüfung.
2. **Komponentenprofil statt Stiladjektive:** Canvas, Typorollen, Content-/UI-Dichte, Radius je Komponente, Border-/Elevation-Logik, Bildrolle, CTA-Hierarchie, Zustandsregeln. Mindestens einen echten Gegenentwurf vergleichen.
3. **Mechanik vor Transfermedium:** HTML für lesbaren Inhalt und Controls; CSS für Layout/Oberflächen; SVG für einfache präzise Geometrie; Raster für Foto/komplexe Illustration/Produktbeweis. Fehlendes Hauptmedium nicht mit generischen Boxen kaschieren.
4. **Zustands- und Geschäftsmodellprüfung:** Preise ohne erfundene Tarife; Anfrage versus Buchung; leerer Account versus leere Suche. Gegenstand der UX-Übertragung ist die Nutzerentscheidung, nicht die Screenshot-Karte.
5. **Widerspruchsgate:** Screenshot und Style-Rezept abgleichen. Bei Konflikt keine exakten Werte behaupten. Eigene plausible Werte als Rezept markieren und später mit realem responsive Render, Keyboard und tatsächlichen Formularantworten prüfen.

Die normale Refero-Referenzsperre bleibt sinnvoll: eine dominante Richtung, nur begrenzte sekundäre Details, klare Rollen und ausdrücklich verworfene Alternativen. Neu ist die epistemische Grenze: Diese Sperre darf sich nicht auf widersprüchliche, ungesehene Stiltexte stützen.

## Abschlussprüfung und Beobachtungen

Artefakte im eigenen Ownership-Verzeichnis gespeichert; 13 Bildmotive tatsächlich geöffnet, zwei davon zusätzlich über das Full-Image-Werkzeug. JSON-Lesbarkeit und Bildformate anschließend lokal geprüft. Keine unabhängige Browserausführung der Originalseiten behauptet. Task-observer Session-Start ausgeführt; letzte Review 07.09.2026, keine OPEN-Beobachtung für Refero/task-observer. Keine separate Observation geschrieben: die belegten methodischen Befunde sind der ausdrücklich beauftragte SIP-Forschungsgegenstand und werden vom Leader in dessen gemeinsames Staging integriert.

Nachtrag zur Abschlussprüfung: Während des Abschlusses erschien OPEN Observation 0032 „Long full-page screenshots need original-scale tiles before visual verdict“. Gelesen und unmittelbar angewandt: Linear-Vollseite zusätzlich in Originalauflösung und in drei überlappenden 800px-breiten Ausschnitten (linear-tile-1 bis -3.jpg) geöffnet. Der erste Session-Start hatte diesen parallel neu geschriebenen Eintrag noch nicht. Die Matrixbefunde und CTA-Wiederholungen bleiben bestätigt; kleinere, stark gedämpfte Ausschlussmerkmale sind kritisch auf Kontrast zu prüfen. Observation 0032 wurde nicht doppelt geloggt.
