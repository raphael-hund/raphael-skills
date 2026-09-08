<!-- Private research origin: /root/skill-workspace/skill-updates/2026-09-07-web-design-depth/research/layers/REPORT.md; images/code remain outside the skill. -->

# GetLayers: visuelle Zerlegung und übertragbare Konstruktion

Stand: 07.09.2026. Öffentlich und ohne Anmeldung untersucht. Tatsächlich im kollaborativen Chromium-Tab `tab_4` angesehen, Desktop 1280×800 CSS-Pixel sowie Mobile 390×844 CSS-Pixel. Mobile-Screenshots enthalten 780×1688 Rasterpixel (DPR 2); Pixelmaße der PNGs nicht mit CSS-Pixeln verwechseln. Die Recherche ist keine Nutzungs- oder Kopierlizenz für fremde Assets.

## Evidenz und Reichweite

| Quelle / Zustand | Visuell angesehen | Dauerhafte Evidenz |
|---|---|---|
| https://www.getlayers.ai/ | Desktop-Hero, Navigation, Galerieanfang, Cookie-/Tutorial-Überlagerungen | `02-home-desktop.png`, `home-source.html` |
| gleiche URL | Mobile-Hero, Suchleiste, zwei Galeriespalten | `home-mobile.png` |
| gleiche URL | Hamburger geöffnet, während Übergangsanimation | Nur Sitzung; kein belastbarer Endzustand, nicht als fertiges Menü beurteilt |
| https://www.getlayers.ai/layer/vesper | Desktop-Detailmodal mit laufendem Videobeispiel; unterschiedliche dargestellte Szenen | `vesper.png`, `vesper-preview.webp` |
| gleiche URL | Mobile-Detailmodal, Preview über Metadaten/CTA | `vesper-mobile.png` |
| https://www.getlayers.ai/layer/strigil | Mobile-Galerie mit Farbvarianten; Premium-Controls im DOM | Nur Sitzung; kein erfolgreicher dauerhafter Detail-Screenshot |
| https://www.getlayers.ai/layer/soffit | freie Gradientenkonfiguration, Ausgangspalette | `soffit.png` |
| gleiche URL | Palette Aqua Mint geklickt, Controls unabhängig gescrollt | `soffit-mint.png` |
| gleiche URL | Spotlight-UI gewählt, HTML liegt über Gradientencanvas | `soffit-ui.png` |

Die Screenshots wurden als Bild ausgegeben und tatsächlich visuell gelesen. Accessibility-/DOM-Text ergänzte diese Sichtung, ersetzte sie nicht. Bezahlte Prompts/Quellpakete wurden nicht freigeschaltet oder extrahiert. Es wurde nichts veröffentlicht, kein Like abgegeben und kein Formular gesendet. Treg-Katalog für Screenshot-Fähigkeit geprüft; direkte Browseransicht war verfügbar, deshalb kein kostenpflichtiger Screenshot-Aufruf. Keine Zugriffsblockade, kein Ultimate-Browsing erforderlich. Mehrere erste Screenshots zeigten Übergänge bzw. Loader; für die zentralen Zustände wurden stabile Ansichten erneut aufgenommen.

## 1. Die eigenständige Formsprache der Plattform

**Sichtbar:** Fast schwarzer Grund, milchig-graue Schrift, wenige glänzende Flächen. Der Hero ist ein flacher, fast vollbreiter gerundeter Filmrahmen. Eine weiche, körnige Lichtströmung läuft hinter dem Inhalt; in der Mitte bleibt ein dunkler Lesekorridor. Die Überschrift ist dünn, mäßig groß, einzeilig auf Desktop, zweizeilig auf Mobile. Diese Zurückhaltung macht die Preview-Motive zum eigentlichen Beweis der Produktleistung.

**Gemessen auf Desktop:**

| Element | DOM-/CSS-Messung | Bedeutung |
|---|---|---|
| Hauptschrift | Onest, Fallback system-ui | Utility-Texte und normale Bedienung |
| Display-Schrift | generalSans, Gewicht 300 | H1 und große Galerie-H2; kein schwerer Standard-SaaS-Block |
| H1 | 42,6666px; line-height 45,2266px; tracking −1,28px | Zeilenhöhe ca. 1,06, Tracking ca. −0,03em |
| H1-Füllung | linear-gradient(122deg, #f5f4f7 0%, #f5f4f7 18%, #a3a1ad 100%), text clip | Sehr subtile Materialität statt bunter Verlaufsschrift |
| Header | 68,80px hoch, padding 12,44px 14,22px | Randabstand bewusst knapp; breite Bühne |
| Haupt-CTA | 201,13×39,10px, radius 999px, 14,22px Onest | Kompakter Pillenbutton mit eigenem Icon-Kreis |
| Galerie-Header | x 14,22px, Breite 1240,56px | Überschrift links, „All Templates →“ rechts |
| Karte | ca. 306,94×250,80px, radius 12px, padding 4,98px | Vier Spalten; Bild dominiert Titel/Metadaten |
| Kartentitel | 12,8px generalSans, Gewicht 500, tracking −0,128px | Kleine, präzise Beschriftung statt größerer Erklärungskarte |
| „Explore Templates“ | 157,61×43,23px; Rand 1px rgba(255,255,255,.08); Grund rgba(255,255,255,.05) | Tertiäre Flächen bleiben leise |

Diese merkwürdig genauen CSS-Werte gelten für das gemessene Viewport-/Skalierungssystem; sie sind keine universell empfohlenen Tokens. Für eine neue Site erst ein eigenständiges, lesbares Tokenset bestimmen. Die gemessene CTA-Höhe ist kleiner als ein robuster 44px-Touchbereich; nicht blind übernehmen.

### Header und Hierarchie

Desktop: Logo links, Suchknopf separat vor einer dunklen Navigationskapsel, Sign-in rechts. Der aktive Library-Link hat einen eigenen etwas helleren Pillengrund. Der Sale-Streifen sitzt darüber, helle Creme-/Lavendeltöne und schwarzer Text. Er ist visuell lauter als die Navigation. Hero-Badge → Displaytext → zweizeilige Erklärung → CTA ergibt eine eindeutige Rangfolge.

Mobile: Logo reduziert sich auf ein Zeichen in einer gerundeten quadratischen Fläche. Die Suche erhält die meiste Breite; Hamburger bleibt klar getrennt. Hero- und Galerieüberschriften zentrieren sich, Karten bleiben zweispaltig. Der gesamte Hero beansprucht erheblichen Platz, aber der Galerieanfang bleibt im ersten langen Screenshot sichtbar. Ein fixer „Ask AI for guides“-Pill kann Kartenbeschriftungen überdecken; beim Nachbau Overlay-Safe-Areas einplanen.

### Bilder, Karten und Rhythmus

Die erste Template-Reihe zeigt voneinander deutlich verschiedene Bildkompositionen: mint-violette Partikel auf Schwarz (Vesper), elektrisches Blau mit Sternknoten (Stride), ein schräges violettes Objekt auf Weiß (AI Studio), Portrait-Editorial. Das neutrale Gallery-Chrome lässt diese Motive nebeneinander bestehen. Die Karte selbst versucht nicht, jedes Motiv nochmals mit einem farbigen Rand oder Schatten zu kommentieren.

**Native Rezeptur:** `<section>` mit Label, `<h2>`, Archivlink; danach CSS Grid mit vier bzw. zwei Spalten; pro `<article>` ein Media-Container mit festem Seitenverhältnis und `overflow: hidden`, darunter Titel und Kategorie. Like-Button als eigener semantischer Button außerhalb des Hauptlinks. Ein Poster lädt zuerst, ein optionales Video erst bei Sichtbarkeit/Interesse. Keine vier dauerhaft laufenden teuren 3D-Szenen nötig, um vier Vorschaukarten zu zeigen.

**Nicht übernehmen:** kleine Texte als pauschales Premium-Signal; niedrige Kontraste für tatsächliche Aktionen; alle verfügbaren Motive gleichzeitig animieren; künstliche Social-Proof-Zahlen oder Countdown. Die beobachteten Verkaufszahlen sind Anbieter-Copy, keine von uns überprüften Fakten.

## 2. Vesper: Bildwirkung zerlegen, ohne ein Video für eine App zu halten

### Was wirklich sichtbar ist

Auf Desktop eine große linke Previewfläche und eine kleinere rechte Informationsfläche, beide separat schwarz, gerundet, dünn umrandet. Die restliche Galerie ist dahinter abgedunkelt und unscharf. Links läuft ein Film einer Partikelszene: zunächst ein mint-/violetter organischer Torus, später Sterne und eine horizontal aufgefächerte Galaxie. Über der Szene liegt eine schmale Navigationsleiste; dünne, große Headlines lassen sehr viel negative Fläche frei. Am unteren Rand stehen Mini-Metriken in durch Linien getrennten Spalten. Darunter folgt „More like this“ als horizontaler Kartenstreifen.

Rechts: Premium-/Lizenz-Badges, Titel, Upgrade-CTA, Beschreibung, Taxonomie-Chips, gesperrte Exportbuttons, Like/Share. Der Upgrade-Button verwendet einen dunklen Pillenkörper, einen subtilen warmen Randschein und einen fast weißen Icon-Kreis. Mobile stapelt Preview und Informationen in einer einzigen langen Fläche. Ein großer Close-Button bleibt oben; die Mini-Desktopnavigation **innerhalb des Videos** schrumpft mit dem Film und ist kein Beleg für Responsive-Verhalten des eigentlichen Templates.

### Entscheidende Quellenunterscheidung

DOM belegt `video.currentSrc = https://storage.getlayers.ai/templates/vesper-06e69bbad0.mp4`; Poster: https://storage.getlayers.ai/templates/vesper-06e69bbad0.webp . Das sichtbare Beispiel ist ein Film. Seine Aussage „answers every move“ und die Tags `threejs`, `nextjs` sind Anbieterbeschreibung. In diesem Lauf wurden weder Pointer-Reaktion noch Scrollmorphing einer ausführbaren Vesper-Site getestet. Sichtbare 91k-/60fps-Zahlen gehören zum Motiv, nicht zu unseren Messungen.

### Übertragung in eigene HTML/CSS-/Grafikarbeit

1. **Dokumentebene:** echte Headerlinks, Headline, Nutzenzeile, CTA und gegebenenfalls echte Leistungsdaten bleiben HTML. Positionssystem: Hero als relativer Container; Text im normalen Gridfluss mit gezielten Overlay-Zonen. Lesekorridor aus Inhaltsbreite und Dunkelmaske definieren.
2. **Lichtebene:** zwei bis drei große radiale CSS-Verläufe an den Bildrändern, weiche Maskierung; optional kleine gekachelte Noise-Textur. Bewegung nur mit langsamen Transform/Opacity-Änderungen. Text niemals mit der Texturebene verbacken.
3. **Partikelebene:** Für ein stilles Markenmotiv genügt ein eigenes transparentes Raster-Rendering eines Torus/Objekts oder eine passende lizenzierte Illustration. Für tatsächliches Morphing ist Canvas/WebGL sachgerecht; CSS allein erzeugt nicht dasselbe räumliche Partikelfeld. Ein WebGL-Element isolieren, Pointer normalisieren, Geometrie-/Farbattribute verwalten, Rendering stoppen außerhalb Sichtbarkeit und bei reduced motion ein Poster zeigen.
4. **UI-Geometrie:** Haarlinien, kleine Utility-Labels, klare Spalten, ein maximaler Blickfang. SVG für Stern-/Pfeil-/Close-Icons, CSS für Rahmen und Buttons. Partikelbild ist Hintergrunddekoration; funktionale Beschriftungen separat zugänglich machen.
5. **Abnahme:** Poster und laufenden Zustand separat ansehen; Textkontrast über mehrere helle/dunkle Filmphasen prüfen; schmalen Viewport testen; keine Performancezahlen behaupten, bevor real gemessen wurde.

Der übertragbare Kern ist die Aufgabentrennung zwischen Inhaltslayout und einem einzigen räumlichen Ereignis. Die besondere Vesper-Geometrie und Markenästhetik sind kein pauschales Muster für jeden Dienstleister.

## 3. Soffit: Material, Farbe und UI getrennt konfigurieren

### Durchgeführte Zustände

- Ausgangszustand: leuchtendes Magenta/Lila mit milchigen, weichen Lichtfeldern. Linke Preview ca. 663×473 CSS-Pixel; darunter Varianten. Rechts Palette, Regler und UI-Auswahl.
- Klick auf `button[aria-label='Aqua Mint']`: Preview wechselt sichtbar zu Cyan, Türkis und mintfarbenem Licht. Auswahl erhält sichtbare Kontur. Die geometrische Grundidee bleibt weich und diffus.
- Rechte Bedienfläche gescrollt: Preview bleibt links sichtbar; rechts erscheinen die UI-Thumbnails. Damit lassen sich Controls verändern, ohne die visuelle Rückkopplung zu verlieren.
- Klick auf `Spotlight`: über derselben Preview erscheinen eine kleine Navigation, zentrierte Headline „Design that / Bends the light“ (zweite Zeile als kontrastierende Schreibschrift) und zwei CTA-Pillen. Keine neue Vollbild-Bitmap: DOM zeigt `canvas.gm-canvas` mit daneben liegender HTML-Struktur `uip-root > .uit-spotlight`.

### Was implementiert und was nur demonstriert ist

Die Gradientenvorschau ist ein Canvas. Gemessen: interne Rastergröße 497×355, CSS ca. 662,891×472,727; UI-Qualitätsanzeige 0,75×. Ein DOM-Tooltip sagt ausdrücklich: **„Render quality — live preview only, never part of the prompt“**. Daher diese Vorschaueinstellung nicht als Export-Eigenschaft ausgeben. Controls enthalten zusätzlich ein `maxDpr`-Feld, im DOM auf 1; dessen Exportwirkung wurde nicht geprüft.

Die native UI-Vorschau liegt in `aria-hidden="true"`; Navigationsnamen sind `<span>`. Ihre CTAs sind eine Kompositionsdemonstration, keine getesteten Conversion-Aktionen. Das ist bei einem Konfigurator legitim, darf aber nicht in einer ausgelieferten Website als funktionierende Navigation missverstanden werden.

### Gesehene Parametergruppen und ihre Designbedeutung

| Ebene | Tatsächliche Controls | Sinnvolle eigene Abstraktion |
|---|---|---|
| Grundlook | Dark/Cool/Warm/Muted/Light-Paletten, Custom-Farben | Palette getrennt von Geometrie speichern |
| Sofortige Wirkung | Grain, Speed, Contrast, Scale | Vier häufige Regler zuerst; Fortgeschrittenes einklappen |
| Licht | tilt, horizon, spread, curve, bounce | Lichtposition und Falloff sind eigene Entscheidungen |
| Atmosphäre | amount, warp, flow, roughness, motes | Materialcharakter getrennt von Farben |
| Ton/Finish | ambient, midpoint, glow, vignette, dither | Kontrast und Bildabschluss gezielt kontrollieren |
| Interaktion | steer, lift, sweep, parallax, cursor | Pointerbewegung ist Zusatzschicht, kein Inhaltsersatz |

Die Werte und Felder wurden aus DOM gelesen; nicht jeder Regler wurde verändert. Byte-Größe, WebGL1-Fallback und Exportumfang sind Anbieterbehauptungen, hier nicht unabhängig auditiert.

### Konkret ableitbare Konstruktion

**Einfacher eigener CSS-Fallback:** Hero mit dunkler Grundfarbe; darüber mehrere große, unscharfe radiale Verläufe; eine weiche lineare Maske steuert die Lichtkante. Ein geringer Noiseanteil verhindert glatte digitale Bänder. Visuelle Ähnlichkeit des Grundmaterials ist mit CSS erreichbar; die exakte prozedurale Strömung erfordert Shader oder ein eigenes Video.

**Procedural-Variante:** Canvas nur als `aria-hidden`-Hintergrund, uniforms für Palette, Zeit, Kontrast, räumliche Skala und Pointer. HTML liegt als nächste Geschwisterebene darüber. Die Farbwerte als Tokens an Canvas und Fallback weitergeben. Renderauflösung begrenzen; bei unsichtbarem Tab/Offscreen stoppen; ResizeObserver für Darstellungsgröße; WebGL-Fehler auf stillen Fallback führen. Das sind empfohlene eigene Produktionsmaßnahmen, nicht Behauptungen über geprüften GetLayers-Quellcode.

**UI-Variante:** Overlay-Layout als gesonderte Komponente. „Spotlight“ benötigt nur Topbar, zentralen Inhaltsblock und CTA-Reihe. Thumbnails als kleine native schematische Vorschauen oder SVG bauen: Rechtecke, Linien und Kreise, keine Screenshot-Collage nötig. Der Look kann zwischen „Bare“ und „Spotlight“ wechseln, ohne Paletten-/Shaderwerte zu überschreiben. UI, Hintergrund und Exportzustand müssen separat adressierbar bleiben.

**Wichtige negative Evidenz:** Der Aqua-Mint-Hintergrund sieht als freies Material attraktiv aus; im Spotlight-Zustand liegt sehr helle Schrift auf hellem Mint. Sie ist sichtbar kontrastarm. Eine schöne isolierte Hintergrundvorschau ist keine bestandene UI-Abnahme. Bei eigener Umsetzung dunklere Textfarbe, stärkerer lokaler Scrim oder eine dunklere Palette wählen und den Kontrast tatsächlich messen. Hier wurde kein WCAG-Zahlenwert erhoben.

## 4. UX-Erkenntnisse mit Grenzen

Die starke Idee ist das Verhältnis zwischen Vorschau und Entscheidung: erst Material sehen, dann Palette/Form/Tempo verändern, dann die echte Inhaltsanordnung darüber prüfen. Die Variantenreihe bleibt in derselben Ansicht und erhält eine deutliche Auswahlkontur. Kleine Informationsicons und „Show all“ halten die erste Ebene übersichtlich. Für ein Expertenwerkzeug ist das sinnvoll; unverständliche Shaderbegriffe ohne ausreichende Erklärungen wären für Kundenoberflächen zu technisch.

Die Homepage öffnet gleichzeitig mehrere konkurrierende Ebenen: Sale-Streifen, Cookiekarte, Tutorialkarte und AI-Hilfe. Im beobachteten Zustand überlagern Tutorial und Cookies die Galerie. Das kann Onboarding unterstützen, aber es kostet visuelle Ruhe und verdeckt das Verkaufsargument. Für eine neue Website höchstens einen primären nächsten Schritt zur gleichen Zeit priorisieren.

Mobile gewinnt durch Stapeln, verliert aber bei den tiefen Einstellungslisten die gleichzeitige Sicht auf Preview und Controls. Eine eigene mobile Konfiguration sollte eine kompakte angeheftete Vorschau oder kontrolliertes „Vorschau anzeigen“ erwägen; das ist eine Empfehlung, kein hier getestetes GetLayers-Verhalten.

## 5. Konkrete Ergänzung für den Web-Skill

Ein Referenzprotokoll sollte je auffälligem Element mindestens folgende Felder erzwingen:

1. **Gesehen:** URL, Viewport, Zustand und Bilddatei; nach Transition erneut angesehen. Ein Video, Poster, Canvas und funktionierende App sind vier verschiedene Evidenzarten.
2. **Zerlegt:** semantischer Inhalt, Layoutgeometrie, Typografie, Farb-/Materialschicht, eigenes Asset, Bewegung und Zustandslogik getrennt beschreiben. Messwerte mit Messmethode markieren; optische Schätzungen als solche nennen.
3. **Gebaut:** günstigste angemessene native Primitive wählen — HTML für Inhalt, CSS für Flächen/Typografie, SVG für Geometrie/Icons, Raster für wirkliche Bildinformation, Canvas/WebGL für notwendige prozedurale Bewegung. Nicht jede schöne Illustration als CSS imitieren, nicht jede Oberfläche als Bild backen.
4. **Im Kontext geprüft:** dasselbe Material hinter tatsächlicher Headline, CTA und Formular ansehen; alle hellen/dunklen Phasen und mobile Anordnung berücksichtigen. Die Soffit-Mint/Spotlight-Paarung zeigt, warum Hintergrundabnahme allein nicht genügt.
5. **Begrenzt:** übernommenes Prinzip benennen, nicht verifizierte Interaktionen/Quellcode/Lizenzen offen lassen; eigene Produktionsmaßnahmen klar von Anbieterimplementierung unterscheiden. Fertig erst mit Bildern des eigenen Ergebnisses und getesteten echten Aktionen.

Das Verfahren soll Entscheidungsqualität liefern, keine Stilvorschrift „alles dunkel, gläsern, animiert“. Für eine sachliche lokale Dienstleistung kann das geeignete Ergebnis aus dieser Referenz die ruhige Galerie, der getrennte Bild-/Textaufbau und das Kontextprüfen sein — ohne einen einzigen Shader.

## Beobachtungsstatus

Keine separate Observation angelegt: diese Subtask liefert Forschung innerhalb eines bereits ausdrücklich beauftragten Skill-Updates; die konkreten methodischen Ergänzungen sind oben mit Bildbelegen enthalten und gehen an den Leader zur gemeinsamen Staging-Integration. Keine Live-Skilldatei geändert.
