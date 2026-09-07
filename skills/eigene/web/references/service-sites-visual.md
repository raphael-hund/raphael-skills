# Service-Websites: visuelle Beobachtungen vom 6. September 2026

Diese erhaltene Erststudie ist ein begrenzter, tatsächlicher Browserdurchgang. Neuere Desktop-/Mobilstudien zu den sechs zusätzlich gewünschten Websites stehen in [Solar/Peter](service-sites-solar.md), [Beratung/Agentur](service-sites-specialists.md) und [service-expansion-2026-09.json](corpus/service-expansion-2026-09.json). Deren Belege erweitern die Sammlung, bestätigen aber keine ungetesteten alten Unterseiten. Sie enthält 12 gespeicherte Desktop-Screenshots von neun Domains und eine visuell erfasste Unterseite. Elf der 13 gewünschten Domains wurden navigiert; bei zwei weiteren liess sich nach einem Verbindungsabbruch kein Tab mehr öffnen. Das ist **keine abgeschlossene visuelle Analyse aller Seiten und Unterseiten**. Die weitergehende Text- und Sitemap-Recherche steht getrennt in den anderen Corpus-Dateien.

Manifest mit geprüften Dateipfaden, Zeitpunkten, Pixelmassen, Aktionen, Status, Prüfern und Hashes: [visual.json](corpus/visual.json). Identische Kopie bei den Bildern: [manifest.json](../assets/service-reference-evidence/manifest.json). Bilder sind originale Browser-JPEGs, zusammen rund 1,1 MB. In den Bildnamen werden unvollständige Ladezustände und abweichende Scrollpositionen ausdrücklich bezeichnet.

## Abdeckung und Grenzen

| Referenz | Tatsächlich visuell gesehen | Offener Teil |
|---|---|---|
| AlpenEnergie | Dunkler Hero, roter Offerten-CTA, Region und Installationsumfang; beginnende helle Folgesektion | Aufnahme zeigt teilweise dunkle/unvollständige Headline; vollständiger Hero, Motion und Unterseiten unbestätigt |
| Elephant Solar | Hausmotiv, schmale Versalheadline, Angebots- und Videoaktion, Bewertungen, Kontaktleiste | Ladeindikator und Cookiepanel sichtbar; Produktwahl und Unterseiten ungetestet |
| Priwatt /solaranlagen/ | Voller zweispaltiger Einstieg mit fünf Vorteilen und grossem Hausfoto | Beratungsfunnel, FAQ, Menü und weitere Seiten ungetestet |
| Enpal | Hausmotiv über fast den ganzen Viewport, knappe zentrale Botschaft, gelber Ersparnis-CTA, drei Vorteile und Prüfsiegel | Rotierende Headline, Produktmenü, Enpal.One und Rechner nicht als Ablauf verifiziert |
| EKD Solar | Navigation versucht, anschliessend Browser-Timeouts | Kein Browser-DOM und keine Pixel gewonnen; kein Beleg für einen Botblock aus diesem Browserdurchgang |
| Rollers | Video-Hintergrundzustand und tatsächlich geöffnetes Menü visuell geprüft | Nur Ausgangsbild synchronisiert; Menübild fehlt als dauerhafte Datei, keine native Aufnahme oder Timingmessung |
| Faris Schmidt | Weisser typografischer Einstieg, blaue Hervorhebung, Konzept-CTA und kleiner Vertrauenshinweis | Folgesektionen, Slider, Animationsablauf und Unterseiten visuell ungetestet |
| MK Börsenhandel | Erst leerer Ladezustand, später Kalenderbereich | Keine verifizierte Hero-Aufnahme; Kalender weder ausgefüllt noch gebucht; weitere Interaktionen offen |
| JANTronic | Videobereich; im späteren nicht synchronisierten Bild klarer Sprecher-Poster sichtbar | Unerwartete Scrollposition, kein Hero; kein Video abgespielt, keine Leistungsunterseite visuell untersucht |
| Jonah Struck | Navigation versucht, danach Timeout und Laufzeitabbruch | Kein verifizierbarer Browserzustand |
| Leadfluss | Kein Browserzugriff nach finalem Verbindungsversuch möglich | Navigation konnte nicht mehr ausgeführt werden; Textanalyse nicht als Pixelprüfung zählen |
| SEO Labs | Startseite und /websites, gleiche kleine Headerinsel und Aktionshierarchie | Menü-/Cookie-/Scrollversuche lieferten Timeouts; FAQ, Vergleich und Kundenwebsites nicht visuell als Ablauf untersucht |
| Haubner Group | Kein Browserzugriff nach finalem Verbindungsversuch möglich | Navigation konnte nicht mehr ausgeführt werden; Textanalyse nicht als Pixelprüfung zählen |

Der dokumentierte Browser bietet Screenshots, DOM, Klicks und Scrollaktionen, aber keine native Videoaufnahme und keine Viewportänderung/Mobile-Emulation. Deshalb wurden **null Videos und null echte Mobile-Aufnahmen** erstellt. Ein Zustandsbild darf nicht als Video, eine Desktopaufnahme nicht als Mobile-Prüfung bezeichnet werden. Wiederholte CDP-, Runtime- und Input-Timeouts verhinderten weitere zuverlässige Übergangsprüfungen. Nach einem letzten Neustart wurden weitere Wiederholungen beendet.

## Konkrete Muster und ihre begrenzte Übertragung

### 1. Enpal: ein verständlicher Einstieg mit wenig Text

Das Haus mit Solardach, Wärmepumpe und Wallbox erklärt das Angebot räumlich. Eine dunklere Bildlage trägt weisse Headline und Finanzierungsbotschaft. Der gelbe Ersparnis-CTA sitzt direkt darunter; ein kleines Prüfsiegel und drei kurze Vorteile ergänzen Vertrauen. Die freistehende weisse Navigation hält die Produktkategorien lesbar.

**Übertragen:** Bei einem erklärbaren Gesamtsystem kann ein gutes Bild mehrere Absätze ersetzen. Headline, eine bevorzugte Aktion und kurze Belege genügen für den Einstieg, wenn die folgenden Seiten Details aufnehmen. **Nicht ableiten:** Vollbild-Hero oder Finanzierungsbotschaft sind keine Pflicht für jede Dienstleistung. Das Bild beweist keine Konversionswirkung und keine implementierte Animation.

### 2. Priwatt: mehr Kaufzweifel bereits im ersten Blick beantworten

Die linke Hälfte enthält ein konkretes Leistungsversprechen, eine kurze Erklärung, fünf gut getrennte Vorteile mit grünen Haken und einen dunklen Beratungs-CTA. Rechts steht ein grosses Hausfoto ohne Text darüber. Das warme helle Fundament, dunkles Grün und limettengrüne Akzente bleiben in ihren Rollen zusammenhängend. Die umfangreiche Navigation und Angebotsleiste zeigen eine stärker handelsorientierte Informationsaufgabe.

**Übertragen:** Ein geteilter Hero eignet sich, wenn Installationsumfang, Preislogik oder Lieferzusage vor der Anfrage erklärt werden müssen. Bild und Argumente erhalten feste Aufgaben. **Nicht ableiten:** Immer fünf Bulletpoints, immer Creme/Grün oder automatisch ein Shop-Navigationsmodell verwenden. Die sichtbaren Anbieterzusagen sind keine von uns validierten Tatsachen.

### 3. Elephant: starke Wiedererkennbarkeit bei verständlichem Serviceangebot

Eine grosse schmale Versalheadline steht links über einem stark abgedunkelten Hausmotiv; das Motiv bleibt rechts gut erkennbar. Weiss und leuchtendes Gelb trennen die Botschaft. Der weisse Angebotsbutton ist stärker als der graue Videobutton. Direkt darunter stehen Bewertungen; die Navigation enthält Telefonnummer und eine weitere Angebotsaktion.

**Übertragen:** Eine eigenständige Schrift, ein klarer Medienbezug und eine unmissverständliche Aktionshierarchie können eine gewöhnliche Dienstleistung hochwertig präsentieren. Der Videoweg ergänzt die Anfrage. **Grenze:** Im Bild sind Spinner und Cookiepanel sichtbar. Diese Aufnahme ist nur für bereits sichtbare Komposition und Hierarchie geeignet, nicht als fertiges Sollbild für Layoutabgleich oder Motion.

### 4. SEO Labs: konsistente Orientierung über Start- und Leistungsseite

Beide besuchten Seiten nutzen dieselbe kompakte Headerinsel aus Menü, Logo und Terminaktion. Die Startseite bindet Markenlogos in die grosse schwarze Headline ein; darunter stehen Erklärung und zwei unterschiedlich gewichtete Aktionen. Am unteren Viewportrand beginnt ein Band mit Referenz- und Auszeichnungskarten. Auf /websites trägt eine dreizeilige Leistungsheadline den Einstieg, gefolgt von vier erklärenden Zeilen, gleichem CTA-Paar und viel freiem Raum.

**Übertragen:** Unterseiten können dieselbe Orientierung und Aktionssprache behalten, während Inhalt und Beweismittel auf ihren jeweiligen Such- und Entscheidungszweck wechseln. Eine Agenturseite darf typografisch sein, wenn ihre Leistungsbotschaft konkret bleibt. **Nicht ableiten:** Jede Kundenseite soll diesen zentrierten Hero, das Headerformat oder die Akzentfarbe übernehmen. Kundenwebsites wurden hier nicht visuell geprüft. Die zwei Startseitenbilder zeigen weiterhin den Cookiekasten; der Klickversuch ist kein erfolgreicher Consent-Nachweis.

### 5. Rollers: industrieller Charakter durch echte Medienrolle

Der Hero zeigt eine Aufnahme aus einem Fahrzeug; Headline und Erklärung stehen unten links, eine separate Maschinenkarte mit Anfrage- und Flottenaktion unten rechts. Orange, Weiss und dunkle kantige Headerflächen wirken industriell. Die helle Bildmitte trägt keinen wichtigen Text.

Der Klick auf den sichtbaren Menü-Link änderte die URL auf `https://rollers.com.au/#awb-open-oc__63` und öffnete rechts eine weisse Navigationsfläche. Links blieb der abgedunkelte Hero sichtbar. Die Navigation zeigte About, Equipment, Training, Resources, News, Careers und Contact; unten waren Anfrage und Telefonnummer zugänglich. Zwischen Ausgangs- und Menübild änderte sich auch das laufende Hintergrundmotiv.

**Übertragen:** Eine grosse Menüfläche kann Produktkategorien und Kontaktmöglichkeiten aufnehmen, während der Ausgangskontext sichtbar bleibt. Bewegtes Material sollte Leistung und Arbeitswelt erklären. **Evidenzgrenze:** Beide Zustände wurden vom Browseragenten pixelgeprüft; das Menübild wurde trotz erfolgreichem Speichern im Browser nicht synchronisiert und fehlte auch nach dem vorgeschriebenen Poll. Es gibt deshalb keinen dauerhaft nutzbaren Bildpaar-Beleg, kein Video und keine gemessene Dauer/Easing. Daraus weder Transitiontechnik noch Framework ableiten.

### 6. Faris, AlpenEnergie, JANTronic und MK: spezifische statt pauschale Lehren

Faris zeigt einen weitgehend weissen Einstieg mit grosser zentraler Aussage, kleiner Vertrauensmarke und blauem Konzept-CTA. Das erzeugt eine klare Hierarchie; schwach graue Navigation und Erklärung verdienen jedoch eine gesonderte Kontrastprüfung. Die blau-kursive Betonung ist eine sichtbare Referenzeigenschaft, kein neuer Standard für jedes MAKE-Projekt.

AlpenEnergie zeigt Region, Installationsumfang, dunkle Fläche, rote Akzentleiste und direkten Offertenweg. Die unvollständige Headline in diesem Capture verbietet eine fertige visuelle Bewertung. JANTronics Videobereich belegt einen klaren Sprecher-/Video-Baustein und grünen Playbutton, aber keine Wiedergabe. MKs eingebetteter Kalender belegt einen Termin-Einstieg; aus dem zufällig sichtbaren Scrollbereich lassen sich weder Hero noch Gesamtseitenqualität ableiten.

## Wie der Skill diese Evidenz verwenden soll

1. **Nach Entscheidungsaufgabe wählen.** Enpal für einen knappen Systemeinstieg, Priwatt für frühe Kaufargumente, Elephant für regionale Servicepräsenz, SEO Labs für Agenturorientierung, Rollers für industrielle Medienführung. Eine Referenz erhält einen begrenzten Job.
2. **Quellenrollen erhalten.** Dominante Aussage, bevorzugte Aktion, glaubwürdige Belege und ein Bild mit Leistungsbezug sind eine gemeinsame Arbeitshypothese. Daraus folgt keine Pflicht zu Pillennavigation, Zentrierung, drei Karten, Cremegrund oder einer bestimmten Farbe.
3. **Unfertige Bilder ausschliessen.** `unready`, `unready_blank` und `unexpected_scroll_position` dürfen weder als vollständige Positivvorlage noch zur Bewertung einer anderen Website verwendet werden. Vor einem solchen Einsatz neu aufnehmen.
4. **Bewertung und Beobachtung trennen.** Fotos, Textdichte, Rollen und Reihenfolge sind sichtbar. Performance, SEO-Ranking, tatsächliche Leads, Barrierefreiheit, Framework, Motiondauer und Nutzerpräferenz sind damit nicht bewiesen. Anbieterzahlen und Testimonials als Anbieterangaben behandeln.
5. **Den offenen Motionauftrag erhalten.** Bei einer später verfügbaren Aufnahmefunktion echte Clips für Seitenaufbau, Scroll, Menü, FAQ/Tab und Formularschritte erzeugen; danach Zeitpunkte, Trigger und Wirkung prüfen. Bis dahin bleiben die Einträge offen. Keine aus Standbildern erzeugte Slideshow als native Websiteaufnahme ausgeben.

Alle gespeicherten Bilder wurden vom Browseragenten tatsächlich angesehen. Neun wurden zusätzlich in einer unabhängigen Pixelprüfung geöffnet; Root prüfte SEO Labs /websites und Elephant ebenfalls. Die Prüferzuordnung steht pro Datei im Manifest. Der unabhängige Review bestätigte vor allem Rollenverteilung, Textdichte, Aktionshierarchie und die ausdrücklich markierten unfertigen Zustände; er beweist keine zusätzlich getesteten Interaktionen.
