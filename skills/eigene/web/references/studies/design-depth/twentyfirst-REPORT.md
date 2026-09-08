<!-- Private research origin: /root/skill-workspace/skill-updates/2026-09-07-web-design-depth/research/twentyfirst/REPORT.md; images/code remain outside the skill. -->

# 21st.dev: Bauwissen aus vier konkreten Komponenten

Stand: 07.09.2026. Rechercheartefakt für den gestagten web-Skill, keine Produktionsintegration und keine generelle Lizenzfreigabe.

## Ergebnis und genaue Abdeckung

21st ist hier als **Komponenten- und Implementierungsquelle innerhalb einer vorher gewählten Website-Richtung** wertvoll. Die eigentliche Designleistung ist das Zerlegen und Anpassen eines Kandidaten: Inhalt, Geometrie, Ebenen, Zustände, Assets, Frameworkannahmen. Ein Katalogtreffer oder Installbefehl ersetzt diese Arbeit nicht.

- Homepage in eigenem Browser-Tab `tab_8` bei 1280×800 tatsächlich gesehen und als `homepage.png` gesichert; vollständigen sichtbaren DOM-Text und berechnete Heading-Typografie gelesen. Startseite, Komponentenstreifen und enthaltene Produktabschnitte im DOM erfasst; keine vollständige visuelle Abnahme aller Scrollabschnitte.
- Vier erfolgreiche `mcp__21st__search`-Abfragen: `button hover`, `navigation mega menu`, `service card`, `shader background`; jeweils drei Kandidaten geliefert. Vier vollständige `get_component`-Abrufe einschließlich Demo und Registrydaten: **969, 18191, 8223, 2510**. Rückgaben melden `quota.tier=paid`, keine neue Subscription oder Credits gekauft.
- Alle vier vom offiziellen MCP gelieferten Previewbilder heruntergeladen und persönlich visuell inspiziert. Es sind **Katalog-Preview-Pixel**, keine selbst erfolgreich bedienten Live-Demos. Dateinamen `<id>-preview.png`.
- Öffentliche Detailseite des Buttons in zwei eigenen Browserkontexten versucht. Die Detailroute blieb in einem unvollständigen Shell-Zustand (`Search`, `Dependencies`, `Tags`, `about:blank`-Iframe); weitere Navigation/Screenshotaufrufe liefen in Timeouts. Daher **keine Behauptung einer getesteten Hover-, Tastatur-, Touch- oder Reduced-Motion-Demo**. Die Zustandsangaben unten stammen präzise aus dem abgerufenen Quelltext.
- Bestehende Referenzen `web/references/21st-dev.md` und `component-islands.md` vollständig berücksichtigt. Offizielle `https://21st.dev/terms` und `https://21st.dev/llms.txt` lokal gesichert. Keine externe Skillinstallation, keine Live-Skilländerung, keine Publikation.

Die vollständigen Rohantworten liegen in `<id>.json`, lesbare Source/Demo in `<id>-source.txt` und `<id>-demo.txt`. Der gesicherte Quellstand ist eine Antwort vom genannten Datum, kein SHA-gepinnter Upstream-Release.

## Homepage: wie ihre Hierarchie tatsächlich entsteht

Beobachtung aus Screenshot und berechnetem DOM: dunkler Grund, großflächiger blauer Lichtverlauf, kleine zurückhaltende Navigation, links verankerte zweizeilige Headline. Das Wort „living“ wechselt in blaues kursives Serif, während der Rest eine ruhige Sans bleibt. Die Produktvorschauen liegen in einem horizontalen, seitlich angeschnittenen Streifen statt in gleichförmigen verkleinerten Cards. Das lässt echte unterschiedliche Interface-Pixel wirken und macht die Produktbreite sichtbar.

Gemessen: Hauptheadline `General Sans`, Gewicht 500, 64px, Zeilenhöhe 67.84px, Tracking −1.408px. Abschnittsüberschriften 44px/48.4px, Gewicht 500, Tracking −0.968px. Bei 1280px liegt die Inhaltskante ungefähr bei x=88px. Header ist kompakt; „Sign up“ ist ein kleiner kräftig blauer Pill-CTA. Kategoriechips stehen auf einer gemeinsamen Zeile. Ein Canvas existiert im Dokument; daraus folgt **nicht**, dass genau der sichtbare Hintergrund ausschließlich vom Canvas stammt.

Übertragung: Erst typografische Rollen und Layoutkontrast beschreiben, dann Bauteile wählen. Eine Servicewebsite könnte breite echte Projektansichten, eine kontrastierende typografische Betonung und eine klare Kategoriezeile übernehmen. Die blau-schwarze Techästhetik, Katalogzahlen, Endlosstreifen und 21st-Markenassets sind keine universelle Kundenwebsite-Vorgabe. General Sans und die Serifschrift brauchen bei tatsächlicher Verwendung eine eigene Font-/Lizenzprüfung; der Serifname wurde hier nicht gemessen.

## 1. Button 969: Oberfläche aus drei Ebenen

Quelle: https://21st.dev/@dillionverma/components/interactive-hover-button

**Pixel:** weiße Pill mit dünnem hellgrauem Rand, schwarzer Punkt links vom zentrierten Label. Keine Textur, kein Rasterbild, keine 3D-Geometrie. Das ist vollständig DOM/CSS plus SVG-Pfeil.

**Konstruktion aus Source:** relatives `button`, feste Breite `w-32`, Padding `p-2`, `rounded-full`, `overflow-hidden`. Ebene A: normaler Label-Span leicht nach rechts versetzt. Ebene B: absoluter, zunächst transparenter Label-plus-Pfeil-Container mit `z-10`. Ebene C: kleiner absoluter Punkt bei `left:20%`, `top:40%`; dieser wird im Hover zur vollflächigen Hintergrundfüllung und skaliert auf 1.8. Label A fährt 48px nach rechts und blendet aus; Label B kommt von rechts und blendet ein. Alle Übergänge 300ms. Der Pfeil ist Lucide-SVG.

**Adaption:** Native HTML/CSS ist hier besonders direkt: derselbe semantische Button, CSS-Transition für Fill und Transform/Opacity für Label/Pfeil. Alternativ echte React-Komponente statisch durch Astro rendern, wenn lediglich dieser CSS-Hover und eine native Buttonfunktion benötigt werden. Ein React-`onClick` benötigt Hydration; ein Seitenwechsel gehört als echter Link umgesetzt. CVA oder Motion sind für diesen Quellstand nicht erforderlich. Imports sind React, Lucide und lokales `cn`; Registry meldet trotzdem leere npmDependencies.

**Vor Übernahme ändern/prüfen:** Beide Texte stehen im DOM ohne `aria-hidden`; aus der Source besteht das Risiko eines doppelten zugänglichen Namens. Genau ein semantisches Label behalten, dekorative Kopie und Pfeil aus dem Accessibility-Tree nehmen. `type` passend setzen, da Source keinen Default `type="button"` setzt. Effekt auch für `:focus-visible` entscheiden; sichtbaren Fokusring gewährleisten. Reduced Motion ergänzen. `disabled`, lange deutsche Labels, echte Icongröße und Touchzustand prüfen. Feste `w-32` nicht auf „Kostenlose Erstberatung vereinbaren“ übertragen. Hover ist nicht Loading/Success; diese Zustände existieren hier nicht. Die Expansion animiert auch Position/Breite/Höhe und `transition-all`; bei Bedarf auf gezielte Property-/Transformanimation umstellen, ohne die Ebenenidee zu verlieren.

**Don't:** Nicht als Bild des Buttons einbauen, nicht allein wegen React-Syntax eine ganze Website hydrieren, nicht das doppelte Label blind kopieren.

## 2. Mega-Menü 18191: Informationsarchitektur plus erhaltene Primitive

Quelle: https://21st.dev/@shadcnui-blocks/components/navigation-menu-06

**Pixel:** drei kompakte Navigationseinträge, Products geöffnet. Darunter großes weißes Panel mit zartem Border/Shadow. Linker Bereich beansprucht zwei Drittel und zeigt sechs Icon-Titel-Beschreibung-Links in zwei Spalten; rechter Bereich ein Drittel mit drei weiteren Links, durch eine vertikale Linie getrennt. Überschriften klein, grau, uppercase. Das Design lebt von konsistenter Item-Geometrie und kurzen Texten, nicht vom Schatten.

**Konstruktion:** shadcn-NavigationMenu über Radix, Datenarray mit `title`, `href`, `description`, `icon`; `grid w-[900px] grid-cols-3`, linker Bereich `col-span-2`, innere zwei Spalten, `divide-x`. Item-Padding 12px, Icon 20px, Titel semibold; Beschreibung `line-clamp-2`, 14px mit enger Zeilenhöhe. Das komplette Item ist ein Link. Root hängt einen NavigationMenuViewport an; seine Größe nutzt Radix-CSS-Variablen. Trigger-Chevron rotiert bei `data-state=open`. Content-Ein-/Ausgänge reagieren auf `data-motion`, also Wechselrichtung zwischen Menüs; Viewport zoomt und blendet beim Öffnen/Schließen.

**Dependencies:** React, Lucide, `next/link`, `cn`, shadcn-Datei; die gelieferte Dependency-Datei nutzt `@radix-ui/react-navigation-menu`, `@radix-ui/react-icons`, CVA. `animate-in`/`slide-in-*`-Utilities setzen passende CSS-Animationen voraus. npm-Liste nennt mehrere Werte nur `latest`, keine reproduzierbare Versionsfixierung. Importanalyse muss **Top-Komponente, Demo und transitive Registrydateien** umfassen.

**Astro-Übertragung:** Sinnvolle echte React-Insel, wenn dieses reichere Menü gebraucht wird. Trigger, Content, Viewport und alle Radix-Zustände in **einer** Insel; oberhalb der Falz normalerweise `client:load`. `next/link` durch kompatible normale Anchor-Komposition ersetzen; `client:load` stellt keinen Next-Router bereit. Website-Tokens am richtigen Vorfahren bereitstellen. Direkt nutzbare Hauptlinks und mobile Navigation planen. Einfache fünf Links ohne Dropdown brauchen keine solche Insel; dann normales `nav`.

**Vor Übernahme:** Products-Panel ist hart 900px breit; das ist keine mobile Lösung. Breite begrenzen und echte kompakte Informationsarchitektur für schmale Viewports entwerfen. Lange Labels und Übersetzungen können abgeschnittene Beschreibungen unverständlich machen. Source-Focusstyles sind vorhanden, vollständige Radix-Tastaturfunktion in diesem Lauf aber nicht benutzt/geprüft. Abnahmefälle: Tab/Fokusfolge, Enter/Space, Escape/Fokusrückkehr, Wechsel Products→Solutions, Pointerpfad vom Trigger in Panel, Touch-Toggle, Outside Click, Viewportkante, Scroll, mobile Schließlogik. Genau passende Menütiefe wählen; Rechtsabteilung/Produktdemo-Texte nicht als Kundeninhalt übernehmen.

**Don't:** Radix nur optisch nachbauen und dabei Zustands-/Fokusverhalten verlieren; drei getrennte Inseln für Trigger, Panel und Viewport; Desktoppanel nur schmal skalieren.

## 3. Service Card 8223: DOM-Texte plus bewusst gecropptes Rasterasset

Quelle: https://21st.dev/@lavikatiyar/components/service-card

**Pixel:** 2×2-Servicekarten mit roten, weißen, grauen und blauen Flächen. Überschrift oben links, Link unten links. Große plastische Freisteller unten rechts teilweise außerhalb des Panels. Diese plastischen Objekte sind **Rasterbilder**, nicht komplexe CSS- oder SVG-Illustrationen.

**Konstruktion:** relativer Flex-Container, Padding 24px, Border-Radius 12px, Overflow hidden. Textgruppe `z-10`, H3 24px bold, CTA `mt-auto`. Bild absolut `right:-32px`, `bottom:-32px`, 160×160px, `object-contain`, Opacity .9. Demo: max-width 5xl, 24px Gap, eine Spalte bis `sm`, danach zwei; jede Card mindestens 180px hoch. CVA mappt Default/Red/Blue/Gray auf Flächen und Textfarben.

**Quellzustände:** Card skaliert bei Hover 1.02 in 300ms; Bild 1.1, Rotation 3°, x+10 in 400ms; Arrow x+5 mit unendlichem Hin-und-her während Hover. Schatten stärker, Bildopacity 1, Linkunterstreichung. Das ist Framer Motion, kein physikalisches 3D. Für einen normalen Service-Link können CSS `:hover`/`:focus-within` und Transform dieselbe nützliche Wirkung abdecken. Eine unveränderte Motion-Komponente braucht Client-React, obwohl die Karte vom Inhalt her statisch wirkt. Statische Astro-Renderausgabe behält Inhalt, aber nicht `whileHover`-Verhalten.

**Assetbefund:** Demo-Alttexte nennen bei Graphic Design einen Farbeimer und bei Analytics ein Megafon. Das geprüfte Preview zeigt dort eine Schachfigur bzw. Spinne. Preview und Source-Assetbeschreibung stimmen damit nicht zuverlässig überein. Ursache unklar (geänderter Remoteinhalt, alter Screenshot oder falsche Beschreibung); keine dieser Ursachen wurde bewiesen. **Alttext aus realen Assetpixeln ableiten, nicht aus einem Katalogstring.** Für rein dekorative Freisteller leeres Alt erwägen; für bedeutungstragende Kundenbilder sachlich beschreiben.

**Adaption:** Kundeneigene/licenzierte transparente WebP/PNG/AVIF-Freisteller nach Bildbrief; festes Seitenverhältnis und Intrinsic-Maße; dekorativen Crop bewusst setzen, auf Mobile darf Objekt Titel/CTA nicht überdecken. Ein reales Projektfoto braucht meist einen anderen Frame als ein freigestelltes Objekt. CSS-Card in HTML oder statischem Astro reicht häufig; bestehende Motion-Insel behalten, wenn ihr konkreter Nutzen die Runtime rechtfertigt. Bildlizenz bleibt getrennt vom Code: Remote-URLs führen über thiings.co/Vercel Blob, nicht zu einer im Response erklärten Lizenz.

**Don't:** Demoassets hotlinken, vom generischen „Learn more“ auf gute deutsche CTA-Copy schließen, pauschal eine Cardinsel für jede Karte erzeugen, unendlich hüpfende Pfeile ohne Intent übernehmen. Link ist nur CTA, ganze Card ist im gelieferten Code nicht klickbar; Pointer-/Hoverwirkung nicht fälschlich als flächige Navigation behandeln.

## 4. Shader 2510: echte Rendertechnik statt Gradientetikett

Quelle: https://21st.dev/@minhxthanh/components/shader-background

**Pixel:** dunkles Blau/Violett mit gebündelten leuchtenden welligen Linien und kleinen Lichtpunkten. Keine sichtbare rechteckige Rastertextur, kein Bildmotiv; die Konstruktion ist durch Source belegt: Canvas + WebGL + GLSL. Das Preview selbst bleibt ein Rasterabbild davon.

**Konstruktion:** Fullscreen-Canvas `fixed`, links/oben 0, volle Größe, `z-index:-10`. Vertexshader zeichnet einen bildfüllenden TRIANGLE_STRIP mit vier Vertices. Fragmentshader erhält `iResolution` und `iTime`. Er verzerrt den Raum mit einer Summe aus Cosinusfunktionen, zeichnet 16 Linien mit variabler Breite und seitlicher Fade-Kurve; additive helle Kerne und entlangwandernde kleine Kreise erzeugen den Plasmaeindruck. Hintergrundfarben sind konkrete GLSL-vec4-Konstanten. Das ist keine mit CSS-Drop-Shadow belegte SVG-Linie. React ist hier im Wesentlichen Canvas-Lifecycle-Hülle.

**Übertragung:** Bei echtem Bedarf kann Vanilla-JS denselben Canvas-Lifecycle in einem Abschnitt führen; React nicht technisch nötig. Eine bestehende React-Lösung kann als bewusst nachrangige Astro-Insel genutzt werden, mit statischem Hintergrundfallback und wesentlichen Texten im HTML. Auf Abschnitt statt pauschal fixed Fullscreen begrenzen. Ohne Animation reichen ein eigenes statisches Rasterbild oder eine einfachere SVG-Linienkomposition; das ist eine bewusste Vereinfachung und keine Behauptung shaderidentischer Interaktion. CSS-Gradienten können die Grundfläche, aber nicht automatisch die spezifische pro-Pixel-Linienberechnung ersetzen.

**Konkrete Source-Risiken vor Adoption:** `requestAnimationFrame` wird rekursiv geplant, Cleanup entfernt nur Resize-Listener; kein `cancelAnimationFrame`, keine GPU-Ressourcenfreigabe. Keine Pause bei verborgenem Dokument oder außerhalb des Viewports; kein Reduced Motion; kein sichtbarer No-WebGL-Fallback. Shader-Compile kann null liefern, Folgecode hängt dennoch Shader an. Canvasgröße entspricht Windowgröße, ohne explizite devicePixelRatio-Strategie oder Container-Resize. Negative globale Stackingebene kann je nach Seitenhintergrund verschwinden. Quelltextparameter/Ref sind untypisiert. Diese Feststellungen sind statische Sourcebefunde, kein gemessener FPS-/Leak-Benchmark.

**Don't:** Für eine lokale Handwerkswebsite Shader als Qualitätsabkürzung einsetzen; „zero dependencies“ mit null GPU-/Energiekosten verwechseln; Farben in JSX-Tokens ändern und die hardcodierte GLSL-Palette übersehen; Rasterfallback ohne ausreichenden Textkontrast liefern.

## Lizenz und Übernahmegrenzen

Aktuelle offizielle Terms §§2–3 unterscheiden ausdrücklich Autorencode von 21st-eigenen Demos, Previewbildern/-videos, Metadaten und kuratierter Anordnung. Der Abruf von Source verleiht laut Terms keine Rechte an diesen Previewmedien. Auch freier Katalogzugriff oder ein bezahlter Plan bedeutet keine pauschale MIT-Lizenz für jeden Datensatz. Die vier MCP-Antworten liefern **keine explizite Komponenten- oder Bildlizenz**. §3 enthält Einschränkungen für automatisches Sammeln, Medien-/Metadatenweiterverwendung und Redistribution; §3.1 verlangt Ursprungslizenz und Attribution bei übernommenem Open Source.

Praktische Folgerung: offiziellen MCP für Auswahl/Quellabruf nutzen; kein Spiegeln des Katalogs. Vor tatsächlicher Codeübernahme die konkrete Ursprungslizenz prüfen und nötige Notices behalten; externe Assets gesondert freigeben. Dieses begrenzte lokale Recherchepaket ist internes Prüfmaterial. **Previewbilder, Rohbündel und Terms-HTML nicht in den distributierbaren Skill oder eine Kundenseite kopieren.** Der Skill bekommt eigene analytische Regeln, Komponentenlinks und nachgewiesene technische Fallbeispiele, keine neue Komponentenbibliothek aus Katalogkopien. Die genaue kommerzielle Nutzbarkeit jedes hier abgerufenen Fremdbausteins bleibt unbestätigt.

## Konkreter Zusatz für den web-Skill

Das bestehende `21st-dev.md` erklärt Suche und Verbindung bereits gut. Der sinnvolle nächste Tiefenschritt ist ein kurzer **Bauteil-Steckbrief je tatsächlich gewähltem Kandidaten**, nicht mehr Bibliotheksnamen:

1. **Rolle und Layout:** Welcher Besucherauftrag? Welche DOM-Semantik? Grid/Flex/Overlay, Größen-/Cropverhältnis, Text-/Assethierarchie, responsive Umbau statt nur Skalierung.
2. **Ebenen und Medium:** Fläche, Border, Maske, Shadow, SVG, Rasterbild, Video, Canvas/WebGL jeweils benennen; dekorative und bedeutungstragende Assets unterscheiden. Pixelbeleg neben Sourceentscheidung.
3. **Zustandsvertrag:** Default, Hover, Focus, Active/Open, Disabled, Loading/Success/Error nur soweit vorhanden; Touch, Escape, Reduced Motion und fehlendes JS. Beobachtet vs aus Source abgeleitet klar markieren.
4. **Einbauentscheidung:** Native HTML/CSS/SVG/Vanilla, statisches React-Rendering, eine vollständige Astro-Insel oder bewusster Ersatz. Tatsächliche Imports einschließlich transitiver Dateien, Frameworkadapter, Provider/Portalgrenze, Lifecycle, Fallback und Assetrechte.
5. **Abnahme:** echte deutsche Inhalte und Bilder, Desktop/Mobile, Tastatur, langsamer/fehlender JS-Start, Null-JS-Route soweit versprochen, sichtbare Zustände, ausgelieferte Runtimekosten. Quellabruf und hübsches Preview sind noch kein bestandener Produkttest.

Pro Fall eine kurze Entscheidung in DESIGN.md: „Button 969: Ebenenidee nativ, kein React-Client; doppelte visuelle Beschriftung dekorativ; längenflexibler CTA; Fokus und Reduced Motion ergänzt.“ Oder „Menu 18191: Radix erhalten, next/link ersetzt, eine client:load-Insel, eigener Mobileaufbau“. Die Entscheidung muss den konkreten Mehrwert und die nötigen Änderungen nennen.

## Evidenzstatus

Verifiziert: aktuelle MCP-Verfügbarkeit, vier vollständige Source-/Demo-Abrufe, vier tatsächlich betrachtete Previewdateien, Homepagepixel und Headline-CSS, aktuelle Terms-Trennung. Nicht verifiziert: bedienbare Detaildemos, Mobile-/Keyboard-QA der Komponenten, Laufzeitmessung des Shaders, tatsächliche Installierbarkeit der Pakete, konkrete Ursprungslizenzen, Funktionsparität einer Portierung. Kein fremder Quellcode wurde im Projekt ausgeführt oder installiert.

Task-observer: Shared Storage und Frontmatter/Prinzipien/Reviewdatum geprüft; kein offener Eintrag zu task-observer/web gefunden. Keine neue Observation geschrieben: Erkenntnisse dieses Auftrags liegen als zielgerichtetes SIP-Rechercheartefakt vor und werden vom Leader in den gemeinsamen Vorschlag integriert, statt parallel ein inhaltliches Duplikat anzulegen.
