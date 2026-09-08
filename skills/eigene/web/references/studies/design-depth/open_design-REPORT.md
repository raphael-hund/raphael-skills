<!-- Private research origin: /root/skill-workspace/skill-updates/2026-09-07-web-design-depth/research/open_design/REPORT.md; images/code remain outside the skill. -->

# OpenDesign: visuell belegte Referenzstudie

Stand: 07.09.2026. Forschung für den Web-Skill-SIP; keine Installation, Publikation oder Änderung eines Live-Skills. Alle folgenden PNGs wurden vom ausführenden Agenten tatsächlich als Bilder geöffnet. Hauptbefund: **Die Plattform zeigt eine nützliche Verbindung aus semantischen Design-Tokens, kontextuellen Vorschauen und ausführlicher Design-Erklärung. Diese drei Schichten sind jedoch nicht zuverlässig synchron.** Sie eignen sich als prüfbare Recherchequelle, nicht als ungeprüfte Wahrheitsquelle für eine Markenimplementierung.

## Quellen und Abdeckung

| Quelle | Tatsächliche Prüfung | Evidenz |
|---|---|---|
| https://open-design.ai/ → https://open-design.ai/de/ | Homepage Desktop, Mobil, Hero-Zustandsfolge, Mobilmenü und FAQ | home-desktop.png; home-mobile.png; home-mobile-settled.png; mobile-menu.png; mobile-faq.png |
| https://open-design.ai/de/plugins/systems/ | Katalogstart Desktop, Suche nach Atelier | systems-desktop.png; search-atelier.png |
| https://open-design.ai/de/plugins/design-system-atelier-zero/ | Detailseite, echte gerenderte Mockups, Tokenliste, vollständiger Leitfadentext | atelier-desktop.png; atelier-tokens.png; DOM-Text |
| https://open-design.ai/de/plugins/design-system-airbnb/ | Detailseite, Website-/Slides-Mockups, Tokenliste und Leitfaden-Auszug | airbnb-preview.png; DOM-Text |

Alle Screenshotpfade relativ zu `/root/skill-workspace/skill-updates/2026-09-07-web-design-depth/research/open_design/`. Desktop-CSS-Viewport 1440 × 1000, Mobil 390 × 844. Browser lief in eigener neu geöffneter Registerkarte, angesprochen über die Domain; andere Tabs wurden nicht navigiert. Keine vollständige Prüfung aller 152 angebotenen Systeme, keine Desktop-App-Nutzung, keine Video-Wiedergabe, keine gemessenen Conversion- oder Performance-Ergebnisse. Zahlen wie Stars, Agents und Systeme sind Angaben der Website.

## 1. Homepage: Anatomie und Aufgabe

Der Einstieg kombiniert oben einen hellgrünen Angebotsstreifen, darunter Logo, Produkt-/Ressourcen-Navigation und dunklen Download-Link. Der Hero rahmt die Überschrift mit einer grünen Auswahlbox und vier quadratischen Griffen. Das visualisiert die Bearbeitbarkeit des Produkts; die Form ist eine konkrete Produktmetapher. Die Überschrift bleibt echter DOM-Text. Eine Markerfläche unter dem Wort „Designsystem“ verbindet die Bedeutung mit der Form. Dekorative Zeichnungsraster, ein typografisches T und ein blauer räumlicher Körper bleiben seitlich und kontrastarm. Darunter gruppieren fünf grüne Pills die Verkaufsargumente; primärer Download ist dunkel, mit grellgrünem Pfeilkreis. Der zweite CTA nutzt eine weisse, dünn umrandete Pill und ein kleines Credits-Abzeichen. Das grosse Video-Poster setzt einen Menschen und ein konkretes Produktformat anstelle einer anonymen abstrakten Softwarefläche ein.

**Wirkung (Interpretation):** Die Auswahlbox, das Raster und die Markerlinie gehören zur Tätigkeit „Design bearbeiten“. Diese Konsistenz ist übertragbarer als die konkrete Neonfarbe. Die fünf Pills beantworten unterschiedliche Einwände, erzeugen aber bereits eine zweite Informationsebene vor dem Beweisvideo. Die Produktnavigation und wiederholten Download-CTAs bieten klare nächste Schritte. Auf Mobil beansprucht allein der Textblock ungefähr die halbe Bildschirmhöhe; das Video liegt unter dem sichtbaren Einstieg. Der sekundäre Text ist dort fast so schwer und gross wie die Hauptaussage. Für eine lokale Dienstleistung wäre diese Priorisierung meist zu produktintern und wortreich.

**Exakt gemessen:** Am Desktop meldete `getComputedStyle(h1)` Albert Sans mit Fallbacks PingFang SC/Microsoft YaHei/sans-serif, `700 72px / 72px`. Das ist der CSS-Wert des H1-Containers, **nicht** die sichtbare Grösse jeder inneren Textzeile. Der Screenshot zeigt kleinere, unterschiedlich skalierte Kinder. Weitere gemessene H2-Werte: Workflow 800 38/38px, Outputabschnitt 800 48/48px, Agentabschnitt 800 42/42px, Newsletter 600 56/59.36px, FAQ 600 38/40.28px. Keine exakten Header-/Buttonradien aus dem Screenshot behauptet.

**Visuell geschätzt:** Desktop-Inhaltsränder etwa 96px; Hero-Auswahlbox etwa 1050px breit; Video etwa 1080px breit. CTA-Höhe ungefähr 50px. Farben im Screenshot: fast weisser Hintergrund, dunkles Graphit, helles Grün für Infoflächen und stark gesättigtes Grün für kleine Signale. Diese Beschreibungen sind Beobachtungen, keine ausgelesenen Hex-Tokens.

## 2. Katalog: identische Bühne zum Vergleichen

Die Systemübersicht hat grosse linksausgerichtete Überschrift, schmalere Beschreibung, Community-Beitragsbox, Suchfeld und dreispaltige Karten. Jede Karte zeigt dasselbe kleine Browsermodell: Fensterpunkte, Markenname, Sign-up-Schaltfläche, Headline, primären und sekundären Button sowie drei kleine Featureflächen. Darunter folgen Name, Kategorie, Beschreibung und Detail-Link. Dadurch lassen sich Farb-/Schrift-/Radiusunterschiede bei identischer Struktur vergleichen.

**Nutzen:** Kontrollierte Vergleichsbedingungen machen Unterschiede nachvollziehbar. Der Katalog führt vom Überblick zum Detail; die Suche nach `Atelier` reduzierte die sichtbaren Karten tatsächlich auf Atelier Zero (search-atelier.png). Für einen Primitive Showcase ist die identische Struktur wertvoll.

**Grenzen:** Diese Vorschauen sind ausdrücklich originale Mockups, keine Screenshots der Marken. Die generische Struktur transportiert weder Airbnbs Fotografie-/Buchungslogik noch Atelier Zeros editoriale Collagen. Selbst eine korrekte Farbe würde daraus keine Markenfidelität machen. Im sichtbaren Katalogstart ist Airbnbs Text violett und der Akzent rot; die spätere Detailvorschau zeigt dagegen dunklen Text und Korallrosa. Auch zwischen Katalog- und Detailvorschau ist deshalb ein Konsistenzabgleich nötig. Die Beitragsbox steht vor der eigentlichen Suche und verschiebt den Hauptjob „passendes System finden“ unter die Bildschirmmitte. Für einen kundenorientierten Auswahlkatalog sollte die Suche höher priorisiert werden.

## 3. Atelier Zero: wertvoller Leitfaden, kritischer Widerspruch

Die Detailseite kombiniert einen zentralen Kopf, eine rechte Inhaltsnavigation, Preview-Abschnitt, gruppierte Token-Tabelle und langen DESIGN.md-Leitfaden. Die Inhaltsnavigation macht die drei Evidenzschichten direkt anspringbar. Tokenlisten zeigen sichtbare Farbproben, Radiusformen und Name/Wert-Paare. Das ist eine gute Form, um Spezifikation als benutzbares Material statt als Fliesstext zu präsentieren.

**Belegter Konflikt zwischen Tokenliste/Detailvorschau und Leitfaden:**

| Rolle | Angezeigte strukturierte Tokens | Textlicher DESIGN.md-Leitfaden |
|---|---|---|
| Hintergrund | `--bg: #ffffff` | Papier `#efe7d2`; reines Weiss auf Papier verboten |
| Vordergrund | `--fg: #111111` | Ink `#15140f`; reines Schwarz verboten |
| Akzent | `--accent: #111111` | Coral `#ed6f5c`, eine betonte Rolle |
| Display-/Body-Font | Helvetica Neue / Arial | Inter Tight 700–900; Inter Body; Playfair Italic für betonte Wörter |
| Container | 1180px | 1360px |
| Desktop-Abschnitt | 96px | 130px, engere Abschnitte 90px |
| Motion | 150/240ms | 180ms allgemein, niemals über 250ms |

`atelier-desktop.png` zeigt die tatsächlich weisse, schwarze generische Vorschau; `atelier-tokens.png` die dazugehörigen Listenwerte. Die gefilterte Katalogkarte ist hingegen cremefarben. Das ist ein konkreter Gegenbeweis zu einer automatischen Übernahme nach dem Motto „es steht DESIGN.md darüber, daher stimmt die Vorschau“.

**Was am Leitfaden trotzdem nützlich ist (Textquelle, nicht visuell ausgeführt):** Er ordnet Referenzen einzelnen Rollen zu: Monocle für Papier/Metadaten, Apartamento für surreale Collage und Leerraum, IDEA für römische Kapitel, Mischtypografie und grosse Schlusswörter. Er beschreibt Bildmotiv, Komposition, Typoverhalten, Farbrollen, Layout, Buttons, Karten, Hover, Mobile und verbotene Muster. Besonders übertragbar ist die Parameterantwort: „dramatischer“ soll zuerst Schrift-/Bildgrösse verändern, nicht zusätzliche Farben hinzufügen. Ebenso hilfreich: „minimaler“ entfernt Nebenanmerkungen, erhält aber die charaktertragenden Abschnittsregeln.

**Nicht ungeprüft übernehmen:** Vorgaben wie ein Coral-Moment pro 600vh, verpflichtende Seitenstreifen/Koordinaten, reale Zahlen als vermeintlicher Authentizitätsschlüssel oder feste Roman-Nummern auf jeder Seite sind markenspezifische Stilregeln. Sie würden auf Dienstleistungsseiten leicht zu dekorativer Scheinevidenz. Keine erfundenen Koordinaten, Versionsnummern oder Kennzahlen einsetzen.

## 4. Airbnb-Beispiel: Tokens zeigen Grenzen einer generischen Vorschau

`airbnb-preview.png` zeigt eine weisse Websitefläche, Korallrosa an Logoquadrat, Badge und primären Buttons, dunkle Überschrift, helle gerahmte Featurekarten; darunter eine Slides-Fläche mit pinken Diagrammbalken. Die Seite erklärt selbst, dass die Beispiele dieselben Tokens auf verschiedene Artefakte anwenden. Das demonstriert Portabilität, keine Nachbildung des realen Airbnb-Erlebnisses.

Aus der angezeigten Tokenliste exakt übernommen: Hintergrund `#ffffff`, Text `#222222`, Akzent `#ff385c`, Hover `#e31c5f`, Active `#e00b41`; Radien 8/14/20px und Pill 9999px; Basisschrift 16px, Textstufen 12/14/16/20/22/28/44/56px; Desktopabschnitt 64px, Tablet 48px, Telefon 32px; Container 1280px, Gutter 40/24/16px; Motion 150/200ms, `cubic-bezier(0.2,0,0,1)`. **Das sind publizierte Spezifikationswerte der Referenzseite, nicht gemessene Werte von airbnb.com.** Die genannten Cereal-Fontfamilien beweisen weder eine geladene Schrift noch Nutzungsrechte.

Der Text beschreibt wesentlich mehr als die Preview: Fotografie, Kategorie-Icons, echte Unterkunftskarten, Buchungspanel und mobile Reserve-Leiste. Daraus folgt für den Skill: Farb-/Radius-/Typoproben benötigen zusätzlich mindestens einen echten, auf den Nutzerjob abgestimmten Bildschirm. Eine dreiteilige Featurekarte ist kein Ersatz für ein Buchungsformular.

## 5. Mobil und Interaktion

1. **Hero-Reveal:** `home-mobile.png` zeigt einen Zwischenstand mit unscharfen unteren Wörtern; `home-mobile-settled.png` zeigt denselben Text vollständig scharf. Das ist eine Zustandsfolge, kein Video. Exakte Dauer, Easing, Reduced Motion und Abbrechbarkeit wurden nicht gemessen. Die erste Aufnahme belegt, warum ein einzelner zu früher Screenshot keine Freigabegrundlage ist.
2. **Mobilmenü:** `mobile-menu.png` zeigt geöffnete Navigation, X im Toggle, innen scrollende lange Liste mit Funktionen, Anwendungsfällen, Rollen und Tools. `aria-expanded` wechselte auf `true`. Das Angebot ist erreichbar, aber die sehr lange Navigation belastet kleine Bildschirme. Für überschaubare Dienstleistungen keine dutzenden vollständig aufgeklappten Unterpunkte kopieren.
3. **FAQ:** `mobile-faq.png` zeigt geöffnetes natives `details/summary`, die Antwort darunter, Kreis-Plus bzw. dunkles Schliesssymbol und dünne Zeilentrenner. Nummer, Frage und Schalter sind klar getrennt. Der oben schwebende Glas-Header überlagert den Anfang des angesprungenen Inhalts: Sprungmarken brauchen ausreichenden `scroll-margin-top`.
4. **Eingabe:** Die Desktop-Katalogsuche wurde durch reales Befüllen des Inputs getestet und sichtbar bestätigt. Native Clear-Affordance bleibt erkennbar.

Die Pointer-Klickautomatisierung für das Mobilmenü lief wiederholt in Timeouts. Anschliessend wurden vorhandene DOM-Controls mit `element.click()` aktiviert; dadurch sind **Zustandswechsel und sichtbares Layout** belegt, aber **kein bestandener Touch-, Fokus-, Tastatur- oder Hit-Target-Test**. Keine Abwertung des echten Produkts allein wegen dieses Toolproblems. Hover, Escape, Fokusfalle und Reduced Motion bleiben ungeprüft.

## 6. Abbildung auf HTML, CSS, SVG und Raster

| Element | Zweck und Umsetzungsempfehlung | Abgrenzung |
|---|---|---|
| Hero-Text + Auswahlrahmen | H1 mit selektiven Spans; CSS-Border und vier absolut positionierte quadratische Griffe; `aria-hidden` für Dekor | Keine komplette Hero-Grafik mit eingebautem Text |
| Textmarker | CSS-Hintergrund oder Pseudoelement hinter genau dem bedeutenden Wort | Nicht jedes zweite Wort markieren |
| Zeichnungsraster/Proportionslinien | SVG-Linien oder CSS-Gradient; schwacher Kontrast, keine Zeigerereignisse | Visuell hergeleitete Empfehlung; Originaltechnik nicht nachgewiesen |
| Räumliches T/blauer Körper | Einzelne transparente Rasterassets, falls Materialwirkung gebraucht wird | Keine pseudorealistischen CSS-Basteleien; Assetlizenz gesondert klären |
| Video-Beweis | Echtes Poster als Raster + HTML-Button + optional erst nach Aktion geladener Player | Poster ist kein betrachtetes Video; keine Wiedergabebehauptung |
| CTAs/Pills | Link bzw. Button entsprechend Aktion, CSS-Pill, SVG-Pfeil/Icon | „Download“ navigiert: semantisch Link; grünes Icon allein trägt keine Bedeutung |
| Vergleichs-Preview | HTML/CSS-Komponenten mit denselben Tokens auf mehreren echten Layouts | Generische Mockups deutlich kennzeichnen; keine markenoffiziellen Screenshots behaupten |
| Tokenliste | Semantische Liste/Tabelle, CSS-Variablen, Textwerte plus visuelle Swatches | Lange Schattenwerte nicht nur abschneiden: kopier-/lesbare Vollwerte anbieten |
| FAQ | Native `details/summary`, getrennte Plus/Minus-Darstellung, Headeroffset beachten | Öffnen allein zertifiziert keine komplette Accessibility |
| Glas-Header | Sticky/fixed CSS, translucenter Hintergrund und optional `backdrop-filter`; eigener Fallback | Nicht ungeprüft über lange Inhalte legen; Kontrast auf wechselndem Inhalt testen |

## 7. Konkrete Übernahme für den Web-Skill

- **Drei-Schichten-Abgleich:** Für eine Designreferenz immer getrennt erfassen: Beschreibung/Leitfaden, deklarierte Tokens, tatsächliche gerenderte Komponente. Mindestens Hintergrund, Fontfamilie, Akzentrolle, Radius und Layoutbreite gegeneinander prüfen. Konflikte vor Übernahme benennen, nicht still mitteln.
- **Primitive plus realer Job:** Identische kleine Vorschau zum Vergleich nutzen; danach einen echten projektrelevanten Screen prüfen. Palette und Radius allein bilden keine visuelle Identität. Fotografie, Inhaltsdichte, Proportionen und Interaktionsmuster sind gleichberechtigte Quellen.
- **Referenzdimensionen zuordnen:** Pro Inspirationsquelle festhalten, was sie liefert und was nicht: etwa Papiermaterial, Bildkomposition oder Typorhythmus. Das verhindert ein unbegründetes Gemisch aus mehreren Marken.
- **Eigenschaft statt Etikett:** „Dramatischer“, „ruhiger“ oder „minimaler“ in konkrete veränderbare Parameter übersetzen und die unverzichtbaren Identitätsmerkmale daneben festhalten.
- **Zustandsbereitschaft prüfen:** Desktop/Mobil jeweils settled und relevante Zustände betrachten; DOM-Klicks, echte Pointeraktionen und Tastaturtests getrennt dokumentieren. Frühe Blur-Reveal-Aufnahmen bleiben Zwischenstände.

**Dos:** Produktmetaphern aus dem tatsächlichen Nutzerjob ableiten; Text und Bedienelemente in HTML; semantische Akzentrollen; echte Cases/Assets; nachvollziehbare Tokenrollen; fehlende Messung markieren.

**Don'ts:** generische Brand-Mockups als echte Markenreferenz verkaufen; widersprüchliche DESIGN.md-Werte ungeprüft importieren; Koordinaten/Stats als Dekoration erfinden; vollständige Sections rasterisieren; eine erfolgreiche Suche als Beleg für gesamte mobile Bedienbarkeit verwenden.

## Beobachtungsabschluss

Task-observer-Sessionstart durchgeführt: gepinnter Speicher geprüft, Frontmatter und aktive Prinzipien gelesen, Reviewdatum 2026-09-07; keine OPEN-Beobachtung für die geladenen Skills gefunden. Keine globale Beobachtungsdatei durch diesen Agenten geschrieben: der Auftrag begrenzt seinen Dateibesitz auf diesen Forschungsordner. Der wiederverwendbare Befund „Leitfaden/Token/Render können auseinanderlaufen“ ist hier vollständig als SIP-Material dokumentiert und dem Leader zur Integration gemeldet.
