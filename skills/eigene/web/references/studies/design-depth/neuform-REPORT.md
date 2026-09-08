<!-- Private research origin: /root/skill-workspace/skill-updates/2026-09-07-web-design-depth/research/neuform/REPORT.md; images/code remain outside the skill. -->

# Neuform: visuelle Referenzstudie und Übertragung in den web-Skill

Stand: 07.09.2026. Eigener Browser-Tab `tab_7`; Desktop 1280×800 CSS-Pixel, Mobile 390×844 CSS-Pixel. Mobile-PNGs haben 780×1688 Bildpixel (2× Raster), nicht 780px CSS-Breite. Forschung, keine Umsetzung und keine Änderungen an Live-Skills.

## Ergebnis

Neuforms wertvollster Beitrag ist die **gleichzeitige Ansicht eines konkreten Entwurfs und seiner zerlegten Gestaltung**: Schriftprobe, Farbrollen, Buttons, Raum, Oberfläche und Bewegung stehen als sichtbare Komponenten neben dem gerenderten Beispiel. Für den web-Skill eignet sich dieses Verfahren als verpflichtende Element-Anatomie. Die automatisch erzeugten Werte sind jedoch **Hypothesen**: In zwei Stichproben stimmen responsive Typogrößen, Bewegungsangaben und sogar Randrezepte nicht zuverlässig mit dem eingebetteten Quelltext überein. Übernehmen sollte man das Untersuchungsformat; jede konkrete Regel braucht Pixel- und/oder Quelltextbeleg.

## Abdeckung und Evidenz

| Oberfläche | Quelle / ausgeführter Schritt | Eigene Sichtprüfung |
|---|---|---|
| Homepage, Desktop | https://neuform.ai/; geladen bis vier sichtbare Templates rendern | [01-home-desktop.png](/root/skill-workspace/skill-updates/2026-09-07-web-design-depth/research/neuform/evidence/01-home-desktop.png) |
| Systema, aus Homepage geöffnet | https://neuform.ai/template/systema-core-digital-architecture-studio?pageId=1c0073ef-c24c-482a-a2e6-5d192b2471b3 | [02-detail-desktop.png](/root/skill-workspace/skill-updates/2026-09-07-web-design-depth/research/neuform/evidence/02-detail-desktop.png), laufendes Beispiel links, Inspector rechts |
| Homepage, Mobile | https://neuform.ai/, 390×844 | [03-home-mobile.png](/root/skill-workspace/skill-updates/2026-09-07-web-design-depth/research/neuform/evidence/03-home-mobile.png) |
| Systema Inspector, Mobile | dieselbe Detail-URL, Größenwechsel | [04-detail-mobile.png](/root/skill-workspace/skill-updates/2026-09-07-web-design-depth/research/neuform/evidence/04-detail-mobile.png) |
| Passwort vergessen | Homepage → FORGOT → https://neuform.ai/forgot-password | [05-forgot-mobile.png](/root/skill-workspace/skill-updates/2026-09-07-web-design-depth/research/neuform/evidence/05-forgot-mobile.png); keine Mail eingegeben/versandt |
| SALTWORKS, direkter URL-Aufruf | https://neuform.ai/template/saltworks-bittern-crystal-harvest?pageId=a77df80c-27bc-4341-92f8-07f3310451af | öffentliche Detailseite mit Preview/Design.md, generischen Extraktionskarten; gerenderten Ladezustand gesehen |
| SALTWORKS, Bibliotheksansicht | „OPEN IN LIBRARY“ führte zurück zur Homepage; dort korrektes Template geöffnet | [06-saltworks-desktop.png](/root/skill-workspace/skill-updates/2026-09-07-web-design-depth/research/neuform/evidence/06-saltworks-desktop.png); Kristall-Canvas und Inspector gesehen; Beschreibung im großen Preview durch pausiertes Reveal unsichtbar |
| SALTWORKS Quelltext | `iframe.srcdoc` der tatsächlich geöffneten Vorlage, per DOMParser gelesen | [saltworks-source-extract.json](/root/skill-workspace/skill-updates/2026-09-07-web-design-depth/research/neuform/evidence/saltworks-source-extract.json): HTML-Anatomie und JS, kein Produktionsartefakt |

Neuform zeigt im untersuchten Browser wiederholt 0–2 FPS und „Performance reduced. Current previews pause below 10 FPS.“ Erste Homepage-Aufnahme zeigte leere Karten; erst nach weiteren Aufrufen waren deren Inhalte sichtbar. Die gespeicherte Desktop-Homepage zeigt gerenderte Vorschauen. **Kein tatsächlicher Nutzergeräte-Benchmark:** der Wert gehört zu dieser Browser-/Preview-Sitzung. Bewegung wurde in wechselnden Kristallzuständen gesehen, aber nicht mit belastbarer Laufzeit vermessen. Nicht geprüft: Login, Remix-Ausführung, Speicherung, Export/Download, echte Bestell-/Kontaktziele der Vorlagen, Tablet, reale Touch-Hardware.

## 1. Homepage: Authentifizierung neben dem Beweis

**Nutzeraufgabe:** Gestaltungsqualität vor Anmeldung beurteilen und eine konkrete Richtung öffnen. Das Produktversprechen wohnt links, seine Belege rechts; kein langer Marketing-Funnel vor der Galerie.

Gemessene Konstruktion bei 1280×800:

| Element | DOM-/Computed-Style-Messung | Funktion und sichtbare Wirkung |
|---|---|---|
| Linker Block | x/y 8/8, 360×784px, Radius 6px; Verlauf `rgb(29,29,32)` → `rgb(23,23,25)` | Fast volle Höhe, nur 8px Außenluft; ruhige, feste Lesesäule |
| Innerer Text | x 26.59, Breite 322.81px | Rund 18.6px Innenabstand; alle Inhalte an derselben Kante |
| H1 | DM Sans, 300, 32.64px / 31.99px; weiß | Drei eng geführte Zeilen; keine riesige mittige Hero-Headline |
| Eyebrow | JetBrains Mono mit Fallbacks, 9.28px / 11.14px; `rgb(157,177,255)` | Tracking und Versalien geben technische Kennzeichnung; Blau ist hier Label-Farbe |
| Beschreibung | Segoe UI/Arial, 15.04px / 24.82px; `rgb(181,175,164)` | Deutlich mehr Zeilenluft als die Headline; zurückgenommenes Warmgrau |
| Google-CTA | 322.81×46px, Radius 999px; `#F4F1EA`, Text `#141414` | Größter Helligkeitskontrast der Säule; Google-SVG links, Pfeil in separater grauer Kreisscheibe rechts |
| Galerie | Karten 436.5×388px; 8px Abstand, zwei Spalten rechts | Die Arbeit selbst dominiert die Fläche; dünne Ränder und 6px Radius halten den Rahmen zurück |

**Button-Anatomie:** Nicht bloß „Pill Button“. Der helle Hauptkörper trägt drei Zonen: links ein farbiges Marken-SVG, mittig linksorientierte Aktionskopie, rechts eine kleine runde Fläche für den Richtungspfeil. Der Pfeil ist nicht ein zweiter CTA. Der Eingabebereich darunter ist absichtlich dunkler, mit „OR“ zwischen zwei feinen Linien. Social Proof davor besteht aus drei überlappenden Avatar-Kreisen, einer kompakten Nutzerzahl und kleiner Monospace-Nachzeile. Die Zahlen sind Site-Behauptungen, keine von uns validierten Nutzungszahlen.

**Karten-Anatomie:** Laufende HTML-Previews in sandboxed `iframe.srcdoc`, darüber eine volle Klickfläche und Metadaten/Aktionen. Snapshot identifiziert Quick remix, Remix with prompt, Login to like und Full view; Iconbuttons messen nur 24×24px. Vorschau und Metadaten sind getrennte Schichten; das ermöglicht Preview im Hintergrund und Aktionen darüber, erzeugt aber kleine Touchziele. Die Galerie ist kein Raster exportierter PNGs.

**Mobile:** Die Auth-Säule wird zur ersten vollbreiten Karte; die Galerie beginnt darunter. Die zentrale Handlung ist sofort lesbar, die Beispielqualität liegt nun unter dem ersten Inhaltspaket. Der Text bleibt linksbündig. Das ist eine Prioritätsentscheidung, keine bloße Verkleinerung der Desktop-Spalten. Kleine Footerlinks sind sichtbar, jedoch nicht als ergonomisches Vorbild zu übernehmen.

**Native Übertragung:** CSS Grid mit begrenzter Sidebarbreite; normale `aside`, `main`, `section`, `a`, `button` und `form`. Live-Iframes nur für eine tatsächliche interaktive Vorlagengalerie; für Service-Websites echte optimierte Vorschaubilder mit Detailseiten. Google-Marke als offizielles SVG; Avatare als lizenzierte Rasterbilder. Den Grundriss als Verhältnis und Aufgabe übernehmen, nicht die konkreten Texte, Community-Avatare oder Site-Zahlen.

## 2. Detailansicht: Gestaltung als prüfbares Inventar

Desktop zeigt eine kompakte Werkzeugleiste, darunter rund zwei Drittel Preview links und ein Drittel Inspector rechts. Der Inspector nutzt weiße Karten auf dunkler Hülle: Die stark unterschiedliche Fläche trennt das **Designobjekt** von der **Analyseoberfläche**. Schriftmuster bestehen aus Titel, Heading-/Body-Spezifikation, großem Schriftbeispiel und separater Alphabet-/Ziffernprobe. Farben sind große Rollenswatches mit einer Reihe Tonwertstufen, keine Liste nackter Hex-Codes. Jeder Analyseblock hat Copy/Save; auf der Oberfläche ebenfalls DESIGN.md und Save Skill.

Mobile zeigt im getesteten Zustand den Inspector vollbreit; die Live-Preview ist nicht gleichzeitig sichtbar. Die Werkzeugleiste verliert den langen Projekttitel und behält kompakte Icons. Die Überlagerung von Copy/Save-Knöpfen auf der Typografiekarte ist in der mobilen Aufnahme sichtbar und kein Empfehlungsmuster. Für eine eigene Implementierung feste Headerzeilen und umbrechbare Aktionen vorsehen.

**Übertragbarer Arbeitsablauf für den Skill:** Referenz auswählen → sichtbares Element isolieren → Schrift-, Farb-, Flächen- und Abstandswerte daneben dokumentieren → Zustand und Quellbeleg ergänzen → nur diese Rolle in die neue Website übertragen. Ein globaler Moodboard-Absatz reicht nicht. Copy-/Save-Buttons beweisen keine korrekte Extraktion.

## 3. Systema Core: technische Inszenierung mit redaktioneller Typografie

Eigene Sichtprüfung: schwarze, fein diagonal schraffierte Bühne; dünne Eckmarken; kleines `S/C` oben links; korallenroter runder Menüknopf rechts; Serifzeilen und handschriftliche Caveat-Zeile in der Homepage-Vorschau; im Detail ein korallener großer Textausschnitt und angeschnittener riesiger CORE-Schriftzug unten. Die Animation war im Inspector-Preview teilweise pausiert, weshalb die aktuelle Headline dort abgeschnitten erscheint.

Quelltextbelegt:

- Headings verwenden Playfair Display, die Mischzeile Caveat; Body Inter. Das eigentliche `h1` nutzt `text-4xl md:text-5xl lg:text-6xl`, nicht global 160px. Farbrollen `#E7E7E7` für helle Typo, `#FF7A6E` für betonte Aussagen/Aktionen.
- Hero-Schraffur: `repeating-linear-gradient(135deg, rgba(255,255,255,.015) 0, rgba(255,255,255,.015) 1px, transparent 1px, transparent 22px)`; das ist eine feine Materialebene, kein breites dekoratives Gradientband.
- Quelltext enthält normale Bilddateien für abstrakte Arbeiten, Architektur und Porträts; komplexe Fotografien sind Rasterassets. Keine Behauptung, alle unterhalb des Hero liegenden Bilder gesehen zu haben.
- Quelltext lädt Tailwind CDN, Iconify, GSAP 3.12.5 und ScrollTrigger. Die Inspector-Wörter „WebGL“, „Parallax“, „DPR clamp“ sind daraus nicht automatisch vollständig belegt.

**Für native Websites:** Die diagonale Schraffur, Eckmarkierungen, große Typografie und lokale Coral-Akzente sind mit CSS/SVG machbar. Arbeiten und Personen bleiben echte Rasterbilder. Den Menüknopf als echtes beschriftetes Button-Element mit Fokuszustand implementieren. Eine optionale Text-Reveal-Animation darf die Headline bei Ausfall nie verstecken. Die Kombination aus Handschrift, Riesentypo, Coral und Schraffur ist hier ein spezifisches Studiokonzept, kein globaler Anti-Slop-Baukasten.

## 4. SALTWORKS: Produktmechanik wird zum Bild

Die Homepage-Vorschau zeigt links helle verschachtelte Quadrate auf dunklem Wassergrund, rechts Wortmarke, eine Serifheadline mit bernsteinfarbigem „first crust“, knappe technische Erklärung, vier Datensätze und zwei CTAs. Der große Detail-Canvas wurde in mehreren Wachstumszuständen betrachtet. Besonders stark: Das Bild illustriert **Kristallbildung**, also das erklärte Produktmerkmal, statt austauschbarer Tech-Partikel.

### Layout und Typografie (Quelltext, nicht geraten)

Desktop ab `md`: fixiertes Grid `minmax(0,1.08fr) minmax(0,1fr)`, beide Hälften volle Höhe. Links `#0A1013`, rechts `#0E1418`; 1px Trennung mit `#F4F1E9` bei 10% Alpha. Mobile: eine Spalte, Bildfeld 45vh, Inhalt darunter. Rechte Spalte 24px horizontal/40px vertikal mobil; 48px ab `md`. Wordmark Newsreader, 18/20px, 0.22em Tracking, Versalien. H1 Newsreader 300, 36px → 48px → 64px, Zeilenhöhe 1, enge Laufweite, maximal 14ch. Body IBM Plex Mono, 14px, etwa 22.75px Zeilenhöhe, maximal 42ch, `#F4F1E9` bei 50% Alpha.

Die vier Spezifikationen sind semantisch `dl`/`dt`/`dd`, mit trennenden 1px-Linien und rechtsbündigen tabellarischen Zahlen. Abstände: 32px vor dem Datenblock, 40px vor den Aktionen, 16px CTA-Gap. Die Datenliste ist mobil per `hidden md:block` komplett ausgeblendet. Für kaufentscheidende Daten wäre das problematisch; eine eigene Website sollte sie mobil kompakt behalten oder über eine zugängliche Disclosure anbieten.

### Zwei Button-Rezepte mit unterschiedlichen Aufgaben

Primär: rechteckige Fläche `#E8A33D`, Text `#0E1418`, 28px horizontales/14px vertikales Padding, 12px Versalien mit 0.2em Tracking, 300ms Farbtransition. Hover wechselt zu `#F4F1E9`. Fokus hat einen 1px Ring mit 2px Abstand. Sekundär: äußerer Wrapper mit 1px Padding und Diagonalverlauf von `#F4F1E9`/30% über /5% zu transparent; innere dunkle Linkfläche. Hover verstärkt den Rand, invertiert Innenfläche/Text, verschiebt den 16px Solar-Pfeil um 4px. Wrapper-Transition 500ms, Farbe/Pfeil 300ms. Beide Links haben im Quelltext nur `href="#"`: visuelle CTA-Muster, kein funktionierender Kaufprozess.

### Das Grafikrezept

Quelltext bestätigt **Canvas 2D**, nicht Three.js/WebGL:

1. Deterministisch gesetzte Kristallkeime, Anzahl ungefähr Fläche/7600; Position, Endgröße, Geburt und Rotation variieren.
2. Jeder Kristall: vier ineinanderliegende `strokeRect`-Quadrate, gemeinsam gedreht. Kleinere Innenquadrate und zunehmende Alpha-/Strichstärken vermitteln Wachstum und Material.
3. Farbgrund als linearer Verlauf `#0A1013` → `#0E171C` → `#080D10`; eine sehr schwache bernsteinfarbene Lichtzone darüber; am unteren Rand zusätzlicher CSS-Fade.
4. Wachstum im 13.000ms-Zyklus; UI-Metadatum „Saturation“ läuft von 0.74 bis 1.00. Ein `prefers-reduced-motion`-Pfad zeichnet einen fertigen Zustand und setzt 1.00. Das ist Quelltextnachweis, kein durchgeführter Reduced-Motion-Test.
5. Maskierte Text-Reveals: `y:110%`, Opazität 0 → sichtbar, 1.2s, 0.08s Stagger, `expo.out`; Panbar 1.5s, 0.15s Stagger, `power2.out`.

**Native Anpassung:** Für statische Websitegrafik dieselbe Mechanik als SVG-Gruppen mit vier Rechtecken, fixierten Seedpositionen und `rotate()`; für organisches Wachstum ein einzelnes Canvas 2D. Kein Bildgenerator nötig, weil Geometrie und Prozess mathematisch präzise sind. Bei Fotografie von Salz oder Menschen dagegen Rasterbilder verwenden. Ein dekoratives Canvas bekommt `aria-hidden`, die relevante Produktaussage bleibt im DOM. DPR begrenzen, Offscreen-Pause ergänzen, statischen Endzustand bei Fehler/Reduced Motion liefern. Letzte drei Punkte sind unsere Anpassungsempfehlung, nicht voll verifizierte Eigenschaften der Quelle.

## 5. Flow- und Feedbackbefunde

| Ausgang / Handlung | Beobachtete Reaktion | Lehre |
|---|---|---|
| Homepage → Systema Full view | URL wird zur Template-Route; Preview und Inspector erscheinen | Der betrachtete Entwurf bleibt identifizierbar; Analyse direkt neben Objekt |
| Detail → 390px Breite | Inspector wird vollbreit, Titel reduziert | Auf kleinen Flächen eine Aufgabe priorisieren, Wechsel zwischen Objekt und Details klar benennen |
| Homepage → FORGOT | eigene `/forgot-password`-Seite mit Email, Send reset link, Home/Login/Terms/Privacy | Sekundären Auth-Flow klar benennen; kein Accountwechsel ohne Kontext |
| Reset-Seite | große dunkle Karte, weicher Halo dahinter, blauer Primärbutton, Close-Icon | Rückweg sichtbar; hellster Bereich ist die konkrete Handlung. Kein Versandtest |
| Direkter SALTWORKS-Link → Open in Library | landete auf Homepage, danach erneute Auswahl nötig | Deep-Link-Kontext kann verloren gehen; eigenes System muss Objekt-ID bis zur Zielansicht erhalten |
| Preview unter FPS-Schwelle | roter Hinweis, Animationen/Canvas teilweise unterdrückt, Texte teils unsichtbar | Performance-Feedback ist sichtbar; Fallback muss trotzdem Inhalte bewahren |

## 6. Nachgewiesene Grenzen der automatisch erzeugten Designanalyse

**Nicht als belegte Designregeln übernehmen:**

- Systema: Inspector nennt 160px Heading-System, tatsächliches h1 hat responsive Tailwind-Größen 36/48/60px. Ein großer dekorativer Text darf nicht als H1-Token verallgemeinert werden.
- Beide Inspector-Motionlisten zerlegen `cubic-bezier(0.4,0,0.2,1)` sichtbar in unvollständige Einträge wie `cubic-bezier(0.4`, `0`, `0.2`. Keine gültige Easingdefinition.
- SALTWORKS: direkter öffentlicher Detailaufruf meldete Sans/IBM Plex Sans, 8px Basis und generische 160/240/480ms; Bibliotheks-Inspector zeigte Newsreader/IBM Plex Mono, 4px Basis und 300/500ms. Quelltext hat zusätzlich 1200/1500ms Reveals. **Dieselbe Vorlage, verschiedene Extraktionsoberflächen, verschiedene Behauptungen.**
- SALTWORKS Inspector: „Gradient border shell“ mit 0px Padding, 0px Radius und Gradient `none`. Der Quelltext des tatsächlich gemeinten sekundären Buttons hat 1px Padding und einen realen Verlauf. Das generische Rezept ist widersprüchlich.
- SALTWORKS zeigt im Inspector eine tertiäre Limettenfarbe `#BBEF40`; die untersuchte sichtbare Komposition und der extrahierte Hauptinhalt tragen diese nicht. Keine Erlaubnis, Limettengrün als neue CTA-Farbe einzuführen.

Die Vorschau-Sandbox fügt Styles hinzu, die Formulare und Eingaben ausblenden und bei Pausierung Canvas/WebGL verstecken. Deshalb bedeutet „kein Formular sichtbar“ nicht „die Vorlage enthält kein Formular“. Snapshot, Quellenlesung und Zustandsnotiz müssen gemeinsam die Aussage tragen.

## 7. Konkrete Ergänzungen für das SIP (Vorschläge, nicht live installiert)

1. **Elementkarte vor Nachbau:** Quelle, Screenshot-Crop, Elementrolle, Bounding Box/Verhältnis, Typo inklusive Breakpoints, Flächen-/Rand-/Schattenrezept, interner Abstand, Medienart und funktionaler Zustand. Jede Zahl als `gemessen`, `Quelltext`, `Quellenbehauptung` oder `abgeleitet` markieren.
2. **Prozessbezogene Bildidee:** Ein starkes Beispiel nicht als „dunkle Grafik“ beschreiben. Benennen, welcher reale Mechanismus visualisiert wird, aus welchen Primitiven er besteht, wie er sich verändert und welche Aussage neben ihm steht.
3. **Export ist eine Behauptung:** Generiertes DESIGN.md gegen gerendertes Element und Quelltext prüfen; semantische Rolle des Tokens erhalten. Dekorativer Großtext ≠ H1, Tooltipfarbe ≠ Brandakzent, leere Technikbeschreibung ≠ implementierter Effekt.
4. **Zustand vor Urteil:** Preview laden lassen, mehrere Zustände betrachten, FPS-/Sandbox-Fallback dokumentieren. Keine Bewegung als gesehen behaupten, wenn lediglich die Beschreibung gelesen wurde. Unsichtbare Reveal-Texte verhindern die Freigabe eines kopierten Musters.
5. **Detailqualität separat bewerten:** Neue Website muss responsive Aktionshierarchie, echte Linkziele, lesbare Daten, Fokus und statische Fallbacks ergänzen. Interessante Templates sind Gestaltungsquellen, keine automatisch produktionsreifen Komponenten.

Beobachtungsprotokoll: Session-Start-Speicherprüfung, Frontmatter-Scan und Reviewdatum geprüft; task-observer-/refero-design-Bezüge abgefragt (keine offenen einschlägigen Einträge). Keine neue Observation-ID geschrieben: Die neuen Befunde sind in diesem beauftragten SIP-Forschungsbericht gebündelt und werden vom Leader integriert; keine konkurrierende Änderung am gemeinsamen Log.
