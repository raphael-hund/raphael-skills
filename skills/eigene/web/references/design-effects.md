# Effekte: Zweck, Primitive, Fallback

Nach [design-depth.md](design-depth.md) für eine konkret gewählte Bild-/Interaktionswirkung laden. Bestehende [motion-native.md](motion-native.md) führt Timing, Interruptibility, Fokus und native Motionbeispiele. Diese Datei ergänzt die Material- und Grafikentscheidung. [Quellenindex](design-depth-sources.md). Tiefe Kapitel mit Bauanleitungen über den [Design-Depth Router](design-depth/INDEX.md): [Effekte](design-depth/effects.md), [Motion](design-depth/motion.md), [Imagery](design-depth/imagery.md).

Ein Effekt benötigt einen Job: Hierarchie, Gruppierung, Material, räumliche Beziehung oder Zustandsfeedback. „Premium“ ist kein technischer Job. Zuerst statische lesbare Komposition, danach gezielte Bewegung. Beobachtete Optik und eigene Umsetzung getrennt dokumentieren.

## Effektkarten

| Effekt / Referenz | Aufbau als eigene Umsetzung | Wann / Grenze / Fallback |
|---|---|---|
| Schraffur, Aakib/Tatastu | `repeating-linear-gradient` im seitlichen Pseudoelement; ruhige Inhaltsfläche darüber | Rahmenrhythmus; nicht hinter kleine Schrift. Abstand/Strichstärke an DPR prüfen, bei Moiré vereinfachen |
| Technisches Linienraster, Nest/Vetra | zwei lineare Gradients oder SVGgrid mit gemeinsamer Linienfarbe | Ausrichtung/Markensprache. Linien unter dem Inhaltskontrast halten; nicht jede Sektion identisch füllen |
| Gradientborder, Neuform SALTWORKS | äusserer Gradientwrapper mit 1px Padding, deckende Innenfläche, konsistente Radien | Dünne Materialkante. Source belegt 1px, Inspector behauptet 0/none. Solide Border als Fallback; Fokus aussen |
| Lichtbogen, Vetra | radialer Verlauf oder eigene SVGkurve mit Glow; dunkle ruhige Textmitte | Atmosphärische Randzone. Kein WebGL aus Still ableiten. Statisches SVG/Raster bei aufwendigen Filtern |
| Körniges Licht, Flowly Pro | Farbverlauf plus subtile eigene kleine Noisetextur in separater Ebene | Materialtiefe für hervorgehobene Fläche. Nicht Text verrauschen; Preis/Leistung müssen unabhängig verständlich bleiben |
| Glas, Flowz/GetLayers | getönte Surface, dünne helle Kontur, optional `backdrop-filter`; deckende Innenpanels | Räumliche Hülle. Deckender Fallback, Kontrast über wechselndem Motiv. Nicht jede Datenzeile transparent |
| Kartenfächer, Stellar | Karten absolut in benannter Illustrationsebene, abgestufte `rotate/translate`, gemeinsame Transformorigin | Breite/Vielfalt bildlich zeigen. Standbild beweist keine Hoveranimation. Auf Mobile kompakt oder gestapelt, Inhalt ausserhalb lesbar |
| Isometrische Platten, Zahra | SVGpolygone, gemeinsame Perspektive und Stroke, geordnete Verbinder | Ablauf erklären. Pfeile und Beschriftung müssen Sinn tragen; komplexe Interaktion nicht als Bild vortäuschen |
| Ellipsen/Spiralpunkte, Nest | ein SVGformsystem mit konsistenter Geometrie, begrenzter Farbfamilie | Wiedererkennung über Abschnitte. Eine dominante Figur je Fläche; kein willkürlicher Symbolmix |
| Wachsende Quadrate, SALTWORKS | beobachteter Source: Canvas2D, vier rotierte verschachtelte `strokeRect`, Wachstum über 13s | Prozedurale Dekoration. Keine WebGLbehauptung; pausieren ausserhalb Viewport, statisches Bild bei reduced motion |
| Shader, 21st | Canvas/WebGL nur bei begründeter kontinuierlicher Bildberechnung; Shadercode gesondert prüfen | GPU/RAF cleanup und Resize/DPR fehlen im untersuchten Beispiel teilweise. Native Gradientalternative zuerst bewerten |
| Produkt auf Landschaft, Aakib/Recurr | Rastermotiv, getrennte Preview, CSSrahmen/Schatten, HTMLtext | Atmosphäre plus Beweis. Crop/Fade darf keine relevanten Controls verbergen; keine fremden Markenassets übernehmen |

## Beispiel: eigene Gradientkante ohne Maskentrick

```html
<div class="rim"><button class="rim__action" type="button">Vorschau öffnen</button></div>
```

```css
.rim { display: inline-flex; padding: 1px; border-radius: 1rem;
  background: linear-gradient(135deg, var(--rim-light), var(--rim-dark)); }
.rim__action { border: 0; border-radius: calc(1rem - 1px);
  background: var(--surface); color: var(--text); font: inherit;
  padding: .75em 1.1em; }
.rim__action:focus-visible { outline: 2px solid var(--focus); outline-offset: 4px; }
```

Das ist eine eigene strukturelle Skizze, kein kopierter Neuformcode. Radius/Farben werden aus dem Projekt gewählt. Kein `overflow:hidden` auf dem Wrapper, wenn es den Fokus clippt. Bei Forced Colors eine Systemborder ergänzen und Hintergrundeffekte nicht als einzigen Zustandsindikator nutzen.

## Motion-Vertrag vor Animation

Notiere Auslöser, veränderte Eigenschaft, Anfang/Ende, Dauer/Easing, Unterbrechung, Wiederholung, reduced-motion- und offscreen-Verhalten. Ein Hero darf beim Laden einmal erscheinen; Tabellenfilter brauchen unmittelbares verständliches Feedback; ein Arbeitsdashboard braucht keine unendliche Chartzeichenschleife. Quelle Amicro zeigt Katalogdemos und ist kein Beleg, dass permanente Bewegung produktiv hilft.

Transform/Opacity sind gute erste Kandidaten, aber kein Freibrief für riesige Compositingflächen. Blur/Shadow/Filterkosten am tatsächlichen Gerät prüfen. Pointereffekte dürfen nicht wesentliche Information tragen. Parallax nur, wenn Blickführung und Scrollfunktion intakt bleiben. Focus/Keyboardaktionen nicht wegen eines dekorativen Pressdelays verzögern.

Canvas/WebGL: bei Aufbau Ressourcen erzeugen, bei Abbau `cancelAnimationFrame`, Listener entfernen und GPUressourcen freigeben; Sichtbarkeit, reduced motion, Resize und devicePixelRatio behandeln. Ein Preview, das bei niedrigen FPS pausiert, ist kein allgemeiner Hardwarebenchmark (Neuform). Der statische Zustand muss lesbar sein, wenn Animation oder JS fehlt.

## Materialprüfung

1. Auf hellster/dunkelster Bildstelle Text/Fokus/Kontur prüfen; Glasfallback separat ansehen.
2. Scrolling und Eingabe mit laufendem Effekt bedienen; überlappende Layer dürfen keine Klicks abfangen (`pointer-events:none` nur für dekorative Layer).
3. Mobilecrop und 200% Zoom ansehen; nicht das ganze Desktopboard verkleinern.
4. Reduced motion, Tabwechsel/offscreen und Komponentenabbau prüfen; keine versteckten Endlosschleifen.
5. Bild-/Effektebene ausblenden: Inhalt, Hierarchie und Hauptaufgabe müssen bestehen bleiben. Fehlt dann alles, ist die Grafik mit Produktfunktion verwechselt worden.

Übernahmeentscheidung im DESIGN.md: Effektname, Job, Referenz, gewählte Primitive, eigene Abweichung, Performance-/Accessibilitybeleg. Keine exakten Originaltimings aus einem gesampelten Video schätzen und als Messung ausgeben.

## Kernregeln aus den tiefen Kapiteln (2.2.0)

Je Kapitel die zehn wichtigsten Regeln; Messwerte, Bauanleitungen und Gegenbeispiele stehen im Kapitel. Die Effektkarten oben bleiben gültig; wo eine Kernregel dieselbe Referenz nennt, ist das Kapitel die ausführliche Fassung.

### Effekte → [design-depth/effects.md](design-depth/effects.md)

1. Erst den Job benennen (Ebene, Fokus, Material, Bewegung, Zustand, Markenmotiv); ein Effekt, der nur leeren Raum kaschiert, fliegt. Pro Sektion höchstens eine dominante Effektfamilie.
2. Ebenen vor Schatten: Light Page → Surface → Surface-2 → Raised in 3–4 % Stufen; Dark Page → Surface → Sunken → Raised. Schatten erst, wenn etwas wirklich schwebt.
3. Glow braucht Quelle und Fall-off; hellster Punkt an Kreuzung, Kante oder Objektkern; Textzone bleibt dunkler. Kein Outer-Glow an Text, kein Glow zur Trennung gleichfarbiger CTAs.
4. Lichtbogen und Strahlen als SVG-Pfade mit `feGaussianBlur` auf der Lichtgruppe, `mix-blend-mode:screen` nur im Effekt-Layer, `aria-hidden`, `pointer-events:none`.
5. Grain als Anti-Banding auf Verläufen und Fotos in eigenem Pseudo-Element (Startwert Opacity .04, gemessen .08–.18); nie unter Copy, Inputs oder Controls.
6. Glas nur vor sichtbarem Motiv, mit deckenden Innenflächen für Text und Daten, opakem Fallback und Reduced-Transparency-Fallback; keine leeren Glasflächen, keine Mikrocopy auf Glas.
7. Gradient-Border zeigt Lichtrichtung (oben hell, unten transparent), Innenfläche opak, Mask-Composite für runde Rahmen; 1 px Inset-Highlight, wenn nur die Oberkante Licht braucht.
8. Schraffur ausserhalb der Content-Spalte oder als Abschnittstrenner; Linienraster an echte Geometrie binden, Textzone aussparen; Punktraster nur für Daten, Bühne oder Randtiefe, Status nie nur über Farbton.
9. 3D: SVG für lineare Isometrie (`matrix(.866,.5,-.866,.5,0,0)`), Raster-Assets für facettierte Objekte, Rotation von Rastern unter 1.5°, HTML-UI nie perspektivisch verzerren.
10. Shader als `aria-hidden` Geschwister in einer Sektion, DPR gedeckelt, per `IntersectionObserver` pausiert, `cancelAnimationFrame` beim Unmount, ein statisches Frame bei Reduced Motion, CSS/SVG-Fallback. Mask-Fades schliessen Bühnen ab, verstecken keinen schwachen Proof.

### Motion → [design-depth/motion.md](design-depth/motion.md)

1. Jede Animation hat einen Satz Begründung: welcher Zustand hat sich geändert.
2. Nur `transform` und `opacity` animieren.
3. `prefers-reduced-motion` als globaler Block zuerst schreiben; unsichtbarer Inhalt bei pausiertem Reveal ist ein Hard-Fail.
4. Zwei Dauer-Stufen: 150 ms schnell, 240–300 ms Standard; eine Easing-Kurve pro Seite; Overlays unter 150 ms.
5. Bühne fix, Szene bewegt: Step-Wechsel als Exit links / Enter rechts, Progress-Fill synchron zum Schritt, nie vor dem Submit voll.
6. Chart-Draw-in einmalig beim Viewport-Eintritt (`stroke-dashoffset`), nie als Loop; Wert-Transition nur bei Datenänderung.
7. Endlos-Demo-Animationen sind Demo, nicht Produkt; Marquee maximal einmal pro Seite mit Reduce-Fallback.
8. Hover ist eine Zustandsebene (Raised, Schatten, Tint), nicht eine neue Farbe; Drag = Rotation + Schatten + gestrichelter Ghost.
9. Reveal per `IntersectionObserver` oder `animation-timeline: view()`, nie per Scroll-Listener.
10. Erfolgs-Feier kurz, markentreu, monochrom, endet; Loop-Videos nur als Motiv mit Poster und Pause-Logik.

### Imagery → [design-depth/imagery.md](design-depth/imagery.md)

1. Text in die ruhigste Bildzone; Scrim nur bei zu wenig Kontrast, lokal hinter Text; dunkler Verlauf oben für Header-Lesbarkeit.
2. Bodenfade 115–160 px in die Page-Farbe, Weiss-Fades klammern die Beweiszone, seitlicher Mask-Fade beim Split-Hero.
3. Foto-Temperatur = Page-Temperatur; eine Motivfamilie als Klammer über Hero, Pricing, Testimonials, Footer.
4. Mockup ist eine eigene Ebene auf Material (Foto, Textur, Verlauf, Bühne mit Raster); oben Weiss-Fade an die Textzone, unten weicher Fade, Radius nur an der sichtbaren Ecke.
5. Browserrahmen kennzeichnet Proof, nicht Live-Produkt; Präsentationsbühnen (Passepartout, Kreuzlinien, Popover-Deko) nie nachbauen.
6. Drei Foto-Rollen für Menschen: Farbgalerie = Stimmung, Reportage = Kontext, S/W-Portrait = Team-Index; kein CTA über Gesichtern; echtes Gesicht + konkreter Satz = Proof-Anker.
7. Grain nur auf Foto- oder Verlaufsebene; Glas-Karten nur auf Fotos mit deckenden Datenflächen; Glas-Chip mit Stroke-Gradient statt Vollborder.
8. Materialrollen strikt: Text und Controls HTML, Foto/Textur Raster, skalierbare Geometrie SVG/CSS; dekorative Freisteller absolut, geclipt, `aria-hidden`; Bitmaps ohne Produktbezug streichen.
9. Charts als Imagery monochrom mit Datenbindung; Logo-Walls monochrom ≥ 3:1; Avatar-Stack 24–56 px mit Ring in Surface-Farbe; Outline-Icons 1.5 px `currentColor`.
10. Statischer Produkt-Proof darf `<img>` sein, eine Demo muss bedienbar sein; Crop vor Blur; Alt-Text aus echten Pixeln.
