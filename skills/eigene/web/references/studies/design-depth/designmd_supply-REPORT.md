<!-- Private research origin: /root/skill-workspace/skill-updates/2026-09-07-web-design-depth/research/designmd_supply/REPORT.md; images/code remain outside the skill. -->

# designmd.supply: Designgrammatik und belastbarer DESIGN.md-Einsatz

Stand: 07.09.2026. **Ergebnis: nützlicher Referenz-Extraktor und Ausgangsdossier; kein ungeprüfter Designvertrag und kein Beweis für originale Markentokens.** Drei substanzielle Guides wurden vollständig gelesen und gesichert, die Oberfläche auf Desktop und Mobile betrachtet, drei zugelieferte Markenscreenshots geöffnet und die öffentliche Implementierung untersucht. Kein Live-Skill verändert, nichts veröffentlicht.

## Quellen und Umfang

| Quelle | Inspektion und Artefakt |
|---|---|
| [Homepage](https://www.designmd.supply/) | 42 Markenlinks; Desktop 1280×800, Mobile 390×844; `01-home-desktop.png`, `06-home-mobile.png`, `home-computed.json` |
| [Linear](https://www.designmd.supply/guides/linear.app) | 293 Zeilen / 8.811 Zeichen; `linear-DESIGN.md`, `linear-dom.json`, `linear-tokens.css`, `02-linear-desktop.png` |
| [Anthropic](https://www.designmd.supply/guides/anthropic.com) | 342 Zeilen / 10.000 Zeichen; `anthropic-DESIGN.md`, `anthropic-dom.json`, `03-anthropic-desktop.png` |
| [Stripe](https://www.designmd.supply/guides/stripe.com) | 9.447 Zeichen; `stripe-DESIGN.md`, `04-stripe-desktop.png`, `05-stripe-mobile.png` |
| [Quellcode](https://github.com/context-dot-dev/designmd-supply/tree/8339314c85fea899c6663426a720da4107366bc6) | Commit laut GitHub-API: `8339314c85fea899c6663426a720da4107366bc6`; lokale Quelle `designmd-supply-main/`; MIT-Lizenz |

**Evidenzklassen:** P = betrachtete Pixel; D = DOM/computed style; Q = gelesener Quellcode; G = generierter Guide als Aussage des Diensts; A = eigene Ableitung. G-Werte sind keine Messungen am Original. Die Originalseiten Linear/Anthropic/Stripe wurden nicht live durchgeklickt; deren eingebundene 1920×1080-Aufnahmen wurden heruntergeladen und geöffnet: `linear-source-home.png`, `anthropic-source-home.png`, `stripe-source-home.png`. Aufnahmedatum, CSS-Viewport und DPR dieser Fremdaufnahmen sind unbekannt. Direkte CDN-URLs stehen in `evidence-manifest.json`.

Neun PNGs wurden betrachtet. `04-stripe-desktop.png` ist ein Zwischenzustand mit geladener Sidebar und noch nicht sichtbarem Code, ausdrücklich kein Ready-Beleg. Danach wurde der vollständige Stripe-Text aus dem DOM gespeichert und Mobile im Ready-Zustand betrachtet. Ein abschließender erneuter Browseraufruf lieferte 429; weitere Abfragen wurden unterlassen. Die `*-api.json` enthalten Vercel-Checkpoint-HTML aus gescheiterten curl-Versuchen, keine verwertbaren API-Daten. Dokumentbeschaffung erfolgte erfolgreich über den sichtbaren DOM-Codeblock. Main-Archiv und Commit wurden im selben Recherchefenster abgerufen, nicht kryptografisch abgeglichen; Deployment-Identität ist nicht belegt.

## Die eigene Oberfläche: vier Rollenfarben und eine klare Aufgabe

**P/D/Q:** Papier `#fbfaf6`, Tinte `#0a0a0a`, gedämpfter Text `#6f6b66`, Linie `rgb(10 10 10 / 0.08)`. Inhalt, Metadaten und Trennung erhalten eigene Rollen. Die Sans-Herozeile bekommt nur bei „style guides“ eine graue kursive Stimme; Metadaten und Code verwenden Monospace. Markeneigenheiten bleiben in den Beispielen, statt die Bedienoberfläche ständig einzufärben.

Desktop: Main 1152px breit, 32px horizontaler Innenabstand, 80px oben, 128px unten; effektive Inhaltsbreite 1088px. Hero maximal 14ch, Desktopklasse 72px. Karten: drei Spalten à circa 346,66px, Gap 24px. Mobile gemessen: H1 48/48px und einspaltiges 335px-Raster. Der Quellcode definiert eine zweispaltige Zwischenstufe; diese wurde nicht separat gerendert.

**Kartenanatomie P/D/Q:** Ganzflächiger semantischer Link, 16px Radius, zarte 1px-Linie, Screenshot mit festem Ausschnitt oben. Darunter echtes HTML für Logo, Name, Domain/Kategorie und Farbkreise. Bild ist Inhalt, Name und Navigation bleiben live HTML. Hover im Quellcode: Anhebung 2px, stärkere Linie, zurückhaltender Schatten. Keine eigene Bewegungskurve gemessen.

**Buttonanatomie P/D/Q:** Domain-Eingabe als langer weißer Container; rechts schwarzer 40×40px-Kreis mit SVG-Pfeil und zugänglichem Namen „Generate style guide“. Kontrast und Freiraum schaffen Hierarchie. 40px ist eine Beobachtung, keine allgemeine Touchvorgabe.

**Guide P/Q:** Titel/Domainlink, Linie, links schwarzer Codeblock mit drei Formaten, rechts „Ingredients“ mit Screenshot, Logo/Marke, Hintergrund, Palette und Status. Desktopcode: `minmax(0,1fr) 22rem`, Gap 48px; Sidebar sticky ab `lg`, top 32px. So stehen Ergebnis und Input nebeneinander. Codeblock zeigt Dateiname, echte Zeichen-/Zeilenzahl und Kopieren-Button. Die Site nutzt Next.js/Tailwind/Lucide; das verpflichtet ein Kundenprojekt zu keinem dieser Pakete.

**Übertragung A:** Ruhige Werkzeugoberfläche, vielfältiger Referenzinhalt. Übertragbar sind Rollenfarben, Textordnung, echtes Bild-Text-Kartenmodell und konzentrierte Hauptaktion. Codefenster und Monospace sind für Dienstleisterbesucher nicht automatisch passend.

## Drei Marken: Unterschiede erhalten

### Linear

**P:** Nahezu schwarze Bühne, große helle linksbündige Headline, breite Leerzone, darunter ein großes dichtes Produktinterface. Kleine sekundäre Navigation. Aufgaben, Status und Zusammenhang bleiben im Produktbild erkennbar. Dunkle Karte wird durch feine Kanten und Tonwertunterschiede vom dunklen Grund getrennt.

**G:** Grund `#08090a`, Surface `#0f1011`, Text `#f7f8f8`, Aktion `#e5e5e6`; Inter Variable, Display 56/61,6px, Gewicht 510, Tracking −1,232px; Body 15/24px; Spacing 6/14/24/36/128px. Primärbutton hell, dunkler Text, 14×20px Padding, min. 44px. Karte 8px Radius, 1px durchscheinende Linie, Padding `0 24px 28px`, ohne Schatten.

**P/G-Widerspruch:** Guide behauptet pauschal Pillenbuttons und verbietet rechteckige. Im gelieferten Screenshot ist „Sign up“ kompakt und deutlich ein abgerundetes Rechteck. Komponenten verschiedener Kontexte dürfen nicht zu einer Universalregel verschmelzen.

**A:** Für Software ist eine lesbare Produktvorschau oft stärker als abstrakte Dekoration. Für Handwerk ist die dunkle App-Ästhetik keine Vorgabe. Übertragbar: Beweis unmittelbar nach Versprechen.

### Anthropic

**P:** Warmer Grund, schwere Sans-Headline links, Serif-Erklärung rechts. Darunter dunkle breite Storyfläche mit großer Serif-Überschrift und selbstständiger Netzgrafik. Typorollen erzeugen Charakter; gemeinsame Ausrichtung hält unterschiedliche Schriftmaße zusammen.

**G:** Fläche `#faf9f5`, Text `#141413`, Linie `#e5e7eb`; Anthropic Sans Display 51/ca.56,28px, 700; Anthropic Serif Body 16/24px, 400. Spacing 8/16/52/76/150px. Button 4px Radius, 8×16px Padding, min.40×120px. Sekundärbutton dunkle 1px-Linie; Karte 8px Radius, 16px Padding, ohne Schatten.

**Grenzen:** Proprietäre Fontnamen sind keine Fontdateien oder Nutzungsrechte. Guide-YAML nennt `inverse-surface` als `#141413`, die Prosa gruppiert es mit `#000000`: interner Widerspruch. Auf der betrachteten Fremdaufnahme ist der kleine Untertitel der dunklen Storykarte sehr schwach sichtbar; kein gemessener Kontrastbefund und keine Aussage über einen endgültigen Livezustand.

**A:** Für Beratung/Forschung kann „kräftige Sans orientiert, Serif erklärt“ passen. Eigene Schriften und echte Inhalte wählen. Netzgrafik als Einzelasset, Text als HTML; keine ganze Storykarte flatten.

### Stripe

**P:** Weiße Bühne, dunkelblaue/gedämpft blaue Schrift, violetter Haupt-CTA, klar sekundäre Aktion. Ein großformatiges farbiges Band verläuft diagonal im Hero und über die rechte Grenze. Darunter Logoschiene. Farbigkeit konzentriert sich auf Motiv und Aktion.

**G:** Weiß, Primär `#533afd`, Sekundär `#b9b9f9`, Text `#0a2540`; sohne-var Display 48/55,2px, Gewicht300, Tracking−0,96px. Button 4px Radius, min.48px Höhe, Padding `15.5px 24px 16.5px`. Karte 6px Radius, 8px Basispadding und weicher Schatten. Textfarbe und Errorfarbe sind in Prosa als nicht direkt belegt markiert, stehen aber exakt im YAML.

**G/A:** Hero-Farbigkeit ist Bildsprache, kein Regenbogen-UI. Das Verbot „Don't introduce heavy gradients“ braucht ausdrücklich seine Ausnahme für das Bildmotiv. Originaltechnik des Bandes (Raster/Video/Canvas/SVG/WebGL) wurde nicht untersucht. Einzelnes optimiertes Asset wäre eine mögliche Adaption, keine Aussage zum Original.

## Generator und Export: die entscheidenden Grenzen

[Prompt](https://github.com/context-dot-dev/designmd-supply/blob/8339314c85fea899c6663426a720da4107366bc6/lib/design-md.ts): YAML-Tokens plus Overview, Colors, Typography, Layout, Elevation & Depth, Shapes, Components, Do’s and Don’ts. `{colors.primary}` und ähnliche Referenzen verbinden Komponenten mit Rollen.

**Q:** Context.dev-Styleguide ist Hauptquelle, Screenshot und Homepage-Markdown ergänzen. JSON wird auf18.000 Zeichen, Markdown auf3.000 gekürzt. Generator übergibt das Bild tatsächlich als Bildinhalt und nennt im Quellcode `openai/gpt-5.4-mini`; dies ist Dienstbeschreibung, kein eigener Providerauftrag. Fehlende Daten dürfen konservativ ergänzt werden; Unsicherheit soll in Prosa stehen, nicht in Tokenwerten. Exakte Zahlen bedeuten daher keine Messsicherheit.

**Q:** Daten und Dokumente sind gecacht. Turso-Lesen zeigt keinen Altersfilter. Trotzdem heißt das Sidebarlabel statisch „captured just now“. Abrufzeit und tatsächliches Aufnahmealter getrennt halten.

**D/Q, bestätigter Defekt:** `linear-DESIGN.md` hat8.811 Zeichen und genau EINE `---`-Zeile, an Position1. Die schließende YAML-Grenze fehlt. Anthropic/Stripe besitzen jeweils zwei. API trimmt und speichert, ohne erkennbare Schema-Prüfung. Unveränderter Defekt bleibt im Export erhalten. Nicht blind als valides Frontmatter importieren.

### CSS ist nicht kompilierte DESIGN.md

[Guide-Tabs](https://github.com/context-dot-dev/designmd-supply/blob/8339314c85fea899c6663426a720da4107366bc6/components/guide-tabs.tsx): DESIGN.md wird direkt angezeigt; CSS/Tailwind separat aus `brand, styleguide` abgeleitet, ohne das Dokument zu parsen.

[Tokenableitung](https://github.com/context-dot-dev/designmd-supply/blob/8339314c85fea899c6663426a720da4107366bc6/lib/derive-tokens.ts) erzeugt immer Light und Dark, mischt für den nicht beobachteten Modus Farben, ergänzt Sidebar/Charts/Muted und Defaults. Radius wird auf2–16px begrenzt, Spacing-Einheit auf3,5–5px. Achtstelliges Hex wird ohne Alpha in RGB zerlegt. Das sind Transformationen, keine exakte Originalübernahme.

**D:** Nach realem Klick auf den CSS-Tab beginnt Linear mit weißem `:root`, dunklem Text, Primär `#c3c3c4`; erst `.dark` enthält dunkle Werte. Das DESIGN.md beschreibt die dunkle Seite mit Primär `#e5e5e6`. Beide Artefakte gleichzeitig als kanonisch anzunehmen erzeugt widersprüchliche Implementierung.

## UX: übernehmen und verbessern

**Gut P/D:** Klickbare ganze Karten; sichtbare Formatwahl und unmittelbarer Copy-Zugang; Inputs neben Ergebnis; Herkunft wird als tatsächliches Material gezeigt. Die Homepage erfüllt eine enge Aufgabe.

**Schwach P/D:** Bei390×844 ist Stripes kompletter Codeblock9.752 CSS-px hoch, Sidebarbeginn y=11.096, Seitenhöhe12.288px. Provenienz liegt mobil extrem weit vom Ergebnis. Tab „CSS variab…“ wird abgeschnitten. Festes Context.dev-Badge überlagert mobilen Inhalt, auf Homepage Kartenmetadaten. Bessere Adaption: frühe Quellenzusammenfassung, aufklappbarer/begrenzter Codebereich, freier Inhalt ohne Badgeüberdeckung.

**Nicht geprüft:** Clipboard-Inhalt, kompletter Keyboard-Tabbetrieb, neue Domain-Generierung, Originalmarken-Menüs, reales Touchgerät und reduzierte Bewegung. Fokus- und Reduced-Motion-Regeln existieren im Quellcode; keine Laufzeitbestätigung. Keine Conversion-/SEO-/Geschwindigkeitsaussagen.

## Empfohlenes Verfahren im web-Skill

1. **Import prüfen:** Original unverändert speichern, Domain/Abruf/Quelle/Screenshotzustand erfassen. YAML-Grenzen, Syntax, Tokenreferenzen, Einheiten und Rollen prüfen. Gemessene, extrahierte und generierte Werte getrennt markieren.
2. **Grammatik entscheiden:** Hierarchieträger, Beweis, Dekoration, Besucherziel und Markeneignung bestimmen. Eine Leitquelle wählen, Ergänzungen begründen; nicht Linear/Anthropic/Stripe mitteln.
3. **Bauteile zerlegen:** Button = Text/Icon/Fläche/Rand/Größe/Zustände; Karte = Medienausschnitt/Text/Metadaten/Aktion. HTML für Texte und Steuerelemente, SVG für geeignete Icons/Logos, Einzelraster für passende Foto-/Illustrationsinhalte. Ursprungstechnik nicht aus Pixeln erfinden.
4. **Eigenen Vertrag schreiben:** Rollenfarben, verfügbare Fonts/Fallbacks, Typomaße, Spacing, Container, Breakpoints, Bildausschnitt, Komponentenvarianten und Zustände mit Begründung. Verbote mit Bereich/Ausnahme. Fremde Angaben am konkreten Bauteil prüfen; CSS-Export gegen Vertrag abgleichen.
5. **Gerendert rückprüfen:** Desktop/Mobile, geladene Fonts/Bilder, reale Steuerungen und sichtbare Zustände. Responsive-/Interaktionsregeln ergänzen, weil die drei Markenexports hier keinen vollständigen Vertrag liefern. „Folgt DESIGN.md“ entlastet nicht von sichtbaren Fehlern.

**SIP-Kandidaten:** Importstatus pro Token; Validator vor Verwendung; Dokument/Export-Unterschied; Cache-/Zeitprüfung; Bildpalette versus UI-Palette; Komponentenvarianten statt pauschaler Radiusregeln; mobile Nähe von Aussage und Beleg; eigene DESIGN.md als überprüfbarer Vertrag.

## Beobachtungsabschluss

Task-observer-Speicherprobe, Frontmatter-Scan, Prinzipien und Reviewdatum gelesen; gezielter Lookup offener Beobachtungen für geladene Skills ohne offene Treffer. Keine globale Observation geschrieben: beauftragte Forschung ist in diesem SIP-Bericht konserviert, globale Logs liegen außerhalb des Dateibesitzes. Kein Live-Skill verändert.
