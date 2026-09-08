# Frontend-Referenzbibliothek — Kandidaten hinter dem Router

**Verbund (08.09.2026):** Kandidaten-URLs bleiben hier. Für die 50 UI-Bibliotheken mit Lizenz und Warnhinweis gilt [ui-libraries.md](ui-libraries.md); für die verifizierten Registry-Namespaces, npm-Pakete und MCP-Server [component-registries.md](component-registries.md); UI-Skills-Taktiken in [ui-skills.md](ui-skills.md).

Diese Bibliothek ist die **Kandidaten-Karte** zur Tweet-Sammlung. Sie ist
**keine Installationsliste** und **kein erster Output** eines Agents.

**Zuerst immer** `tool-usecase-router.md` (Bedarf → Default → Install/Use →
Gate → Nie). Die URLs hier sind nur Alternativen und Recherchequellen **nach**
Default-Wahl.

> **Ausgabe-Deckel:** Nie mehr als 3 URLs aus dieser Datei in eine Antwort, nie
> eine ganze Kategorie zitieren, nie diese Datei als Ersatz für den Router laden.

**Einzelzugriff:** Nach der Router-Wahl genau eine benannte Ressource mit
`node scripts/resource-access.mjs show "<Name>"` nachschlagen, danach **dieselbe**
Ressource mit `node scripts/resource-access.mjs open "<Name>"` öffnen und lesen.
Der Name ist exakt und Groß-/Kleinschreibung gilt. `show` liest diese Datei und
liefert genau einen Eintrag (URL, Kategorie, Router-Modus und Metadaten) ohne
Install und ohne Netz. `open` nimmt die Katalog-URL und holt die offizielle Site.
Ohne diesen Öffnen-/Lesen-Schritt gilt die Site nicht als genutzt. URL-Dump allein
zählt nicht.

**Tiefzugriff:** Suche, Style-Seite, Registry-JSON und eine einzelne Komponente
laufen über `node scripts/inspiration.mjs` (Refero Styles, Navbar Gallery,
Magic UI, React Bits, 21st). Doku und Lizenzdeckel:
`references/inspirations-quellen.md`. Das ersetzt weder `show`/`open` noch die
Listen unten.

Pro Projekt nur die kleinste sinnvolle Auswahl öffnen. Vor Übernahme: Lizenz,
Wartung, Barrierefreiheit, Bundle-Kosten, Supply-Chain.

## Herkunft und Aktualitätsprüfung

- Ausgangspunkt: Leon Lin, [A Large Resource Library for AI-Built React and
  React Native Interfaces](https://x.com/LexnLin/status/2083898950755471520),
  veröffentlicht am 2. August 2026.
- Die Liste wurde am 2. August 2026 über den öffentlichen strukturierten
  Artikel-Endpunkt gelesen. Es wurden keine angemeldete Sitzung und keine
  privaten Browserdaten verwendet.
- AgentReach wurde vor der Recherche mit `agent-reach doctor --json` geprüft.
  Der öffentliche Web-Kanal war verfügbar; die angemeldete X-Route wurde nicht
  verwendet. Links bleiben trotzdem zeitveränderlich und müssen bei Nutzung
  erneut über AgentReach, die offizielle Website und gegebenenfalls das
  offizielle Repository geprüft werden.
- Der im Original enthaltene Mobbin-Affiliate-Link ist hier bewusst auf die
  neutrale Hauptadresse `https://mobbin.com/` normalisiert.

## Auswahlregeln

1. **Problem zuerst:** Inspiration, Component-System, Effekt, Asset, Icon oder
   Font als getrennte Bedarfe behandeln. Nicht fünf Bibliotheken für denselben
   Zweck einführen.
2. **Router vor Liste:** Default und Install-Befehl stehen in
   `tool-usecase-router.md`. Diese Datei erst danach für Alternativen öffnen.
3. **Offizielle Quelle zuerst:** Bei Code und Paketen immer offizielle Doku,
   Repository, Paketname, Release-Aktivität und Lizenz abgleichen. Eine Galerie
   oder ein Showcase ist kein Herkunftsnachweis.
4. **Lizenz vor Download:** Code-Lizenz, Asset-Lizenz, Attribution,
   Weitergabe-/Kundenrechte, Markenrechte und bei Personen Model-Releases
   dokumentieren. „Kostenlos" oder „auf GitHub" bedeutet nicht automatisch
   kommerziell nutzbar.
5. **Keine blinde Installation:** Beispiele zuerst lesen oder in einer
   isolierten Demo prüfen. Abhängigkeiten, Install-Skripte, Telemetrie,
   Browserrechte und Supply-Chain-Risiko vor Aufnahme ins Kundenprojekt prüfen.
6. **Original statt Kopie:** Inspiration in Design-DNA übersetzen. Fremde Copy,
   Logos, Illustrationen, Screenshots, 3D-Modelle oder komplette Layouts nicht
   ungeprüft übernehmen.
7. **Qualitäts-Gates:** Tastaturbedienung, sichtbarer Fokus, Reduced Motion,
   Kontrast, Ladezeit, Mobile-Verhalten und SSR/Hydration am echten Build testen.
8. **Aktualität:** Vor Verwendung mit AgentReach die aktuelle Domain sowie die
   offizielle Doku öffnen. Bei Umleitung, aufgegebener Pflege oder unklarer
   Lizenz einen anderen Kandidaten wählen.

## Lokale Vendor-Bibliothek

Für die folgenden zehn Quellen ist die lokale Kopie unter
`resources/components/<site>/` die primäre Arbeitsgrundlage. Zuerst den
jeweiligen `INDEX.md` lesen, dann nur benötigte Payload-Dateien und Abhängigkeiten
öffnen. Die Live-URL dient höchstens zur Aktualitätskontrolle; sie ist nie die
einzige Bezugsquelle. Auswahl weiterhin nach Bedarf, Router, genau einem UI-Kit,
Accessibility und Bundle-Kosten treffen.

- **Beautiful UI — `beautifului.dev`:** `resources/components/beautifului/`.
  20 Agent-/Daten-UI-Komponenten, Atoms und Tailwind-v4-Tokens. MIT; abweichende
  Copyright-Nennung von Repo und Site vor Kundeneinsatz prüfen. Wählen für
  Agent-Traces, Approval, Streaming, Tabellen und AI-native Workflows.
- **beui.dev — `beui.dev`:** `resources/components/beui-dev/`. Vollständiger
  offizieller Snapshot mit 81 Registry-Slugs, Motion-/Agent-Komponenten,
  Previews und Registry-Routes. MIT. Wählen für breite Motion- und
  Interaktionsmuster; bei einzelnen kuratierten Bausteinen zusätzlich
  `references/ui-components/INDEX.md` beachten.
- **Rare UI — `rareui.com`:** `resources/components/rareui/`. 15 TSX-
  Komponenten einschließlich `family-drawer`, Registry-JSON und `cn`-Helper.
  MIT; Site bittet um Attribution und untersagt Weiterverkauf als eigenes Kit.
  Wählen für eigenständige expressive Motion-Widgets.
- **transitions.dev — `transitions.dev`:**
  `resources/components/transitions-dev/`. 32 freie Transition-Rezepte,
  gemeinsame CSS-Tokens, Showcase, CLI und Refine-Tool. Rezepte unter den
  lokalen Nutzungsbedingungen, Tooling MIT; nicht als konkurrierende Bibliothek
  weiterverteilen. Wählen für gezielte Zustands- und Layoutübergänge.
- **shadcn/ui — `ui.shadcn.com`:** `resources/components/shadcn-ui/`.
  Vollständige v4-Registry mit 290 Einträgen, Base-Varianten, Blocks, Beispielen,
  Themes und Metadaten. MIT. Default für zugängliche Primitives und den
  Radix-/shadcn-Stack; Eintrag samt Dependencies und Aliasen übernehmen.
- **UI Skills — `ui-skills.com`:** `resources/components/ui-skills/`.
  Offizielles Site-/CLI-/Skill-Repo plus 269/269 lokal gesicherte Registry-
  Skills. Root MIT; Fremd-Skills behalten individuelle, teils ungeklärte
  Lizenzen. Wählen als lokale Skill-/Pattern-Recherche, Fremdcode erst nach
  Prüfung seines Source-Eintrags nutzen.
- **Origin UI — `coss.com/ui`:** `resources/components/coss-origin-ui/`.
  1.446 Payload-Dateien aus App-Registry, UI-Package und Dokumentation. AGPL-3.0;
  Copyleft-Auswirkungen vor Übernahme prüfen. Wählen für Registry-Varianten und
  detaillierte Component-Dokumentation, nicht blind in proprietäre Projekte kopieren.
- **Design System Checklist — `designsystemchecklist.com`:**
  `resources/components/design-system-checklist/`. Kanonische Checklist-Daten,
  Übersetzungen und App-UI. Upstream ohne Lizenz; nur interne Referenz, keine
  Kundenauslieferung ohne Erlaubnis. Wählen für Design-System-Audit und
  Vollständigkeitsprüfung, nicht als Komponentenkit.
- **ReUI — `reui.io/components`:** `resources/components/reui/`. Vollständiges
  Upstream-Repo mit Registry-Paketen, Radix-Komponenten, ReUI-Beispielen und
  Dokumentation. MIT. Wählen für umfangreiche shadcn-kompatible Komponenten und
  Varianten; gegen shadcn-Default abgrenzen und kein zweites Kit parallel führen.
- **You Don't Need Animations — `emilkowal.ski/ui/you-dont-need-animations`:**
  `resources/components/emil-no-animations/`. Offline-Artikel mit allen
  referenzierten First-Party-JS-/CSS-/Medienassets und interaktiven Demos. Keine
  explizite Lizenz; nur intern als Entscheidungs- und Motion-Referenz verwenden,
  keinen Code oder Inhalt ohne Erlaubnis ausliefern.

Die bestehende Bibliothek `references/ui-components/` (**beUI v2**) bleibt
vollständig intakt und hat eine ergänzende Rolle: kuratierte, dokumentierte
Copy-paste-Motion-Muster mit gemeinsamen Helpers und Accessibility-Hinweisen.
Sie ist weder Ersatz noch Alias für `resources/components/beui-dev/` und ersetzt
keinen anderen Vendor-Snapshot.

## Website- und UI-Inspiration

**Bedarf:** Look-Recherche für die Art Direction; Ergebnis ist eine Design-DNA-Tabelle, keine Sammlung.
**Default (Router):** Godly **oder** Mobbin **oder** Refero — eine Quelle → im Browser/AgentReach öffnen  [`#inspiration`]
**Diese Liste ist:** Alternativen/Inspiration — erst öffnen, wenn der Default begründet ausgeschieden ist.
**Gate:** max. 3 Referenz-URLs; Design-DNA-Tabelle steht vor dem ersten Sektionsentwurf
**Nie:** Ganze Galerie-Kategorien zitieren; fremde Copy/Logos/Layouts übernehmen


Nur zur Recherche und Musteranalyse. Sichtbare Arbeiten bleiben urheberrechtlich
geschützt; keine Assets oder Layouts ohne Rechte kopieren.

- [Godly](https://godly.website/)
- [Awwwards](https://www.awwwards.com/)
- [Land-book](https://land-book.com/)
- [Lapa Ninja](https://www.lapa.ninja/)
- [One Page Love](https://onepagelove.com/)
- [Landingfolio](https://www.landingfolio.com/)
- [CSS Design Awards](https://www.cssdesignawards.com/)
- [Recent Design](https://recent.design/)
- [Minimal Gallery](https://minimal.gallery/)
- [SiteInspire](https://www.siteinspire.com/)
- [Httpster](https://httpster.net/)
- [Refero](https://refero.design/)
- [Page Flows](https://pageflows.com/)
- [Collect UI](https://collectui.com/)
- [Screenlane](https://screenlane.com/)
- [Navbar Gallery](https://www.navbar.gallery/)
- [Footer Design](https://www.footer.design/)
- [SaaSFrame](https://www.saasframe.io/)
- [SaaS Landing Page](https://saaslandingpage.com/)
- [Dark Mode Design](https://www.darkmodedesign.com/)
- [Design Spells](https://www.designspells.com/)
- [Hoverstat.es](https://hoverstat.es/)
- [Brutalist Websites](https://brutalistwebsites.com/)
- [Curated Design](https://www.curated.design/)
- [Commerce Cream](https://commercecream.com/)
- [Admire The Web](https://www.admiretheweb.com/)
- [Mobbin](https://mobbin.com/)

## React, UI und Komponenten

**Bedarf:** Interaktive Primitives und Marketing-Sections im Agentur-Stack.
**Default (Router):** Radix + shadcn/ui → `npx shadcn@latest add <komponente>`  [`#stack-primitives`]
**Diese Liste ist:** Alternativen/Inspiration — erst öffnen, wenn der Default begründet ausgeschieden ist.
**Gate:** axe = 0 und vollständiger Tastaturpfad am echten Build
**Nie:** Zwei UI-Kits parallel; ganze Registry auf Vorrat adden


Vor Verwendung exakten Paketnamen, Framework-/React-Version, Lizenz,
Barrierefreiheit, SSR-Kompatibilität und Wartungsaktivität prüfen.

- [React Bits](https://reactbits.dev/)
- [Magic UI](https://magicui.design/)
- [21st.dev](https://21st.dev/)
- [Aceternity UI](https://ui.aceternity.com/)
- [shadcn.io](https://www.shadcn.io/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Untitled UI React](https://www.untitledui.com/react)
- [Shadcn Blocks](https://www.shadcnblocks.com/)
- [Shoogle](https://shoogle.dev/)
- [Ruixen UI](https://ruixen.com/)
- [Hover.dev](https://www.hover.dev/)
- [Animata](https://animata.design/)
- [Motion Primitives](https://motion-primitives.com/)
- [Cult UI](https://www.cult-ui.com/)
- [Park UI](https://park-ui.com/)
- [Origin UI](https://coss.com/ui)
- [Float UI](https://floatui.com/)
- [Preline UI](https://preline.co/)
- [HyperUI](https://www.hyperui.dev/)
- [Meraki UI](https://merakiui.com/)
- [daisyUI](https://daisyui.com/)
- [Three.js](https://threejs.org/)
- [OGL](https://oframe.github.io/ogl/)

Partikel- und Effekt-Hintergründe (tsParticles, Vanta.js) sind keine UI-Kits und
stehen deshalb nicht hier. Siehe `tool-usecase-router.md` `#background` oder
`#webgl` mit Reduced-Motion-Gate.

## Shader, WebGL und Creative Coding

**Bedarf:** Bewegter GPU-Hintergrund — nur wenn der Brief ihn ausdrücklich fordert.
**Default (Router):** Bewusstes Nein: statisches AVIF-Hero + CSS-Parallax  [`#webgl`]
**Diese Liste ist:** Alternativen/Inspiration — erst öffnen, wenn der Default begründet ausgeschieden ist.
**Gate:** Mobile-Fallback definiert, Reduced Motion aktiv, Lighthouse bleibt bei 0
**Nie:** Shader „weil es cool aussieht"; Demo-Code ohne Lizenz kopieren


Zusätzlich GPU-/CPU-Kosten, Mobile-Fallback, Reduced Motion, Eingabegeräte,
Lizenz der Demo und Produktionsreife prüfen. Demos sind nicht automatisch
Copy-paste-fertige Komponenten.

- [Shadertoy](https://www.shadertoy.com/)
- [GLSL Sandbox](https://glslsandbox.com/)
- [The Book of Shaders](https://thebookofshaders.com/)
- [Codrops](https://tympanus.net/codrops/)
- [NodeToy](https://nodetoy.co/)
- [Three.js Resources](https://threejsresources.com/)
- [ShaderFrog](https://shaderfrog.com/)
- [VertexShaderArt](https://www.vertexshaderart.com/)
- [WebGL Samples](https://webglsamples.org/)
- [PixiJS](https://pixijs.com/)
- [React Three Fiber](https://r3f.docs.pmnd.rs/)
- [Theatre.js](https://www.theatrejs.com/)
- [GSAP](https://gsap.com/)
- [tsParticles](https://particles.js.org/)
- [Vanta.js](https://www.vantajs.com/)

## Gradients, SVGs und Hintergründe

**Bedarf:** Sektions-Hintergrund, Farbverlauf, Texturanmutung.
**Default (Router):** Tailwind/CSS-Gradient aus den Marken-Tokens (kein Paket)  [`#background`]
**Diese Liste ist:** Alternativen/Inspiration — erst öffnen, wenn der Default begründet ausgeschieden ist.
**Gate:** exportiertes SVG ohne `<script>`/externe Referenzen; Textkontrast bleibt AA
**Nie:** Generator-Runtime bundlen; Preset-Palette statt Markenfarben


Generierte Dateien lokal sichern, unnötige Generator-Skripte nicht in die
Produktion übernehmen und SVGs vor Einbau auf eingebettete Skripte/Links prüfen.

- [Haikei](https://haikei.app/)
- [BGJar](https://bgjar.com/)
- [Hero Patterns](https://heropatterns.com/)
- [SVG Backgrounds](https://www.svgbackgrounds.com/)
- [fffuel](https://fffuel.co/)
- [Get Waves](https://www.getwaves.io/)
- [SVG Wave](https://svgwave.in/)
- [MagicPattern](https://www.magicpattern.design/)
- [Mesh Gradient](https://meshgradient.com/)
- [WebGradients](https://webgradients.com/)
- [uiGradients](https://uigradients.com/)
- [Gradient Hunt](https://gradienthunt.com/)
- [CSS Gradient](https://cssgradient.io/)
- [Grabient](https://www.grabient.com/)
- [InstantGradient](https://instantgradient.com/)
- [ColorFlow](https://colorflow.ls.graphics/)
- [Learn UI](https://learnui.design/)
- [Gradient Page](https://gradient.page/)
- [GradientsHub](https://gradientshub.com/)
- [Coolors](https://coolors.co/)
- [Photo Gradient](https://photogradient.com/)
- [Colorffy](https://colorffy.com/)
- [Gradients.app](https://gradients.app/)
- [PatternPad](https://patternpad.com/)
- [Pattern Monster](https://pattern.monster/)
- [Blobmaker](https://www.blobmaker.app/)
- [Blobmixer](https://blobmixer.14islands.com/)
- [Shape Divider](https://www.shapedivider.app/)
- [CSS Pattern](https://css-pattern.com/)
- [Patternico](https://patternico.com/)

## Texturen und 3D-Assets

**Bedarf:** PBR-Texturen und einfache 3D-Props — nur mit echtem 3D-Bedarf.
**Default (Router):** Nicht verwenden; bei echtem Bedarf ambientCG oder Poly Haven  [`#texturen`]
**Diese Liste ist:** Alternativen/Inspiration — erst öffnen, wenn der Default begründet ausgeschieden ist.
**Gate:** Lizenz und Attribution pro Asset dokumentiert; Auflösung/LOD geprüft
**Nie:** Ganze Texture-Packs ungenutzt committen


Pro Asset Lizenz, erlaubte Bearbeitung, Attribution, Texturauflösung,
Dateigröße, LOD und Herkunft der zugrunde liegenden Scans/Modelle prüfen.

Zwei Bedarfe in einer Kategorie: Subtle Patterns und Transparent Textures sind
UI-Kachel-Muster für Hintergründe → Alternativen zur Router-Zeile `#background`.
ambientCG, Poly Haven und die übrigen Einträge sind PBR-/3D-Material →
Alternativen zur Router-Zeile `#texturen`.

- [Texturelabs](https://texturelabs.org/)
- [Transparent Textures](https://www.transparenttextures.com/)
- [Subtle Patterns](https://www.toptal.com/designers/subtlepatterns/)
- [ambientCG](https://ambientcg.com/)
- [Poly Haven](https://polyhaven.com/)
- [FreePBR](https://freepbr.com/)
- [3DTextures](https://3dtextures.me/)
- [ShareTextures](https://www.sharetextures.com/)
- [Kenney](https://kenney.nl/)
- [Quaternius](https://quaternius.com/)

## Inhaltsfotos und KI-Bilder

**Bedarf:** Foto, Produkt oder Szene auf der fertigen Seite.
**Default (Router):** Higgsfield nach `bildgenerierung.md` → `hf generate create gpt_image_2 …`  [`#bilder`]
**Diese Liste ist:** Alternativen/Inspiration — erst öffnen, wenn der Default begründet ausgeschieden ist.
**Gate:** jedes Bild AVIF + Zeile in `bilder-index.json`; bei Personen Model-Release
**Nie:** Stock als Default neben Higgsfield; Stockmaterial als Kundenbeweis ausgeben


Lizenz gilt oft pro Medium oder Abo-Stufe. Bei Personen zusätzlich Model-Release,
sensiblen Kontext und Kundennutzungsrecht prüfen; Stockmaterial nicht als echten
Kundenbeweis ausgeben.

- [Unsplash](https://unsplash.com/)
- [Pexels](https://www.pexels.com/)
- [Pixabay](https://pixabay.com/)

## 2D-Illustration-Kits

**Bedarf:** Flache Vektor-Illustrationen für Sektionen, leere Zustände und Erklärbilder.
**Default (Router):** siehe Router-Zeile für flache Illustration  [`#illustration-flat`]
**Diese Liste ist:** Alternativen/Inspiration — erst öffnen, wenn der Default begründet ausgeschieden ist.
**Gate:** Lizenz gelesen und notiert; Farben auf Marken-Tokens gezogen. Für die
projektweite Auswahl gilt ausschließlich der Router-Eintrag `#illustration-flat`.
**Nie:** Attributionspflicht übersehen; die Auswahlregel aus dem Router durch keine
lokale Ausnahme ersetzen.


Diese Kits haben sehr unterschiedliche Lizenzen — von frei bis Abo mit
Attribution. Pro Kit vor Übernahme klären, ob Bearbeitung, Umfärben und
Kundennutzung erlaubt sind.

- [unDraw](https://undraw.co/)
- [ManyPixels](https://www.manypixels.co/)
- [Storyset](https://storyset.com/)
- [Open Doodles](https://www.opendoodles.com/)
- [Humaaans](https://www.humaaans.com/)
- [Blush](https://blush.design/)
- [DrawKit](https://www.drawkit.com/)
- [IRA Design](https://iradesign.io/)
- [Illustrations.co](https://illlustrations.co/)

## Motion-Assets und Stock-Video

**Bedarf:** Bewegtbild, Lottie-Mikroanimation oder interaktives 3D auf der Seite.
**Default (Router):** Lottie sparsam **oder** kurzer stummer Loop; schwere Videos über den Remotion-Weg  [`#video`]
**Diese Liste ist:** Alternativen/Inspiration — erst öffnen, wenn der Default begründet ausgeschieden ist.
**Gate:** Autoplay nur stumm; Reduced Motion liefert Standbild; Dateien selbst gehostet
**Nie:** externe Lottie-CDN ohne Fallback; Spline-Hero auf schwachem Mobilgerät ohne Poster


Dateigröße, Abspielverhalten und Lizenz pro Clip prüfen. Stock-Clips sind kein
Beleg für echte Kundenarbeit.

- [LottieFiles](https://lottiefiles.com/)
- [Spline](https://spline.design/)
- [Rive](https://rive.app/)
- [Mixkit](https://mixkit.co/)
- [Coverr](https://coverr.co/)
- [Life of Vids](https://pixabay.com/users/life-of-vids-1282862/)

## Icons

**Bedarf:** Icon-Set für UI, Listen und Feature-Blöcke.
**Default (Router):** Lucide → `npm i lucide-react`  [`#icons`]
**Diese Liste ist:** Alternativen/Inspiration — erst öffnen, wenn der Default begründet ausgeschieden ist.
**Gate:** genau EIN Icon-System im Projekt; dekorative Icons `aria-hidden="true"`
**Nie:** Zwei Icon-Sets mischen; Premium-Sets ohne Lizenz


Icon-Lizenz, Marken-/Logo-Regeln, Stroke-Gewicht, optische Größe und einheitliche
Quelle prüfen. Nicht mehrere Icon-Systeme ohne begründeten Bedarf mischen.

- [Lucide](https://lucide.dev/)
- [Tabler Icons](https://tabler.io/icons)
- [Phosphor Icons](https://phosphoricons.com/)
- [Heroicons](https://heroicons.com/)
- [Remix Icon](https://remixicon.com/)
- [Iconoir](https://iconoir.com/)
- [Simple Icons](https://simpleicons.org/)
- [SVG Repo](https://www.svgrepo.com/)
- [Radix Icons](https://www.radix-ui.com/icons)
- [Material Symbols](https://fonts.google.com/icons)
- [Iconify](https://iconify.design/)
- [Icons8](https://icons8.com/)
- [Hugeicons](https://hugeicons.com/)
- [Atlas Icons](https://atlasicons.vectoricons.net/)

## Fonts und Typografie

**Bedarf:** Typografie für Marke und Web.
**Default (Router):** Immer die **Adobe Fonts Library** nutzen. Kit-Embed (`use.typekit.net`), außer bei Kunden-Brand-Dateien  [`#fonts`]
**Diese Liste ist:** nur Recherche — keine Schriftquelle.
**Gate:** offizielles Kit-CSS; keine Adobe-Dateien lokal; max. 2 Familien
**Nie:** Adobe-Bibliothek herunterladen; Google-Fonts-CDN-Default; Adobe-Webfonts selbst hosten


Webfont-Lizenz, Zeichensatz, variable Achsen, Fallbacks und echte Renderkosten
prüfen. Adobe-Webfonts nur über das Kit laden, nie als lokale Dateien. Google
Fonts, Fontshare und andere Foundrys hier sind keine Schriftquelle. Gefundene
Schrift niemals allein anhand einer Galerie in Produktion übernehmen.

- [Google Fonts](https://fonts.google.com/)
- [Fontshare](https://www.fontshare.com/)
- [Velvetyne](https://velvetyne.fr/)
- [Open Foundry](https://open-foundry.com/)
- [Uncut](https://uncut.wtf/)
- [Use & Modify](https://usemodify.com/)
- [Typewolf](https://www.typewolf.com/)
- [Fonts In Use](https://fontsinuse.com/)
- [Fontesk](https://fontesk.com/)
- [Collletttivo](https://www.collletttivo.it/)
- [The League of Moveable Type](https://www.theleagueofmovabletype.com/)
- [Omnibus Type](https://www.omnibus-type.com/)
- [Atipo Foundry](https://www.atipofoundry.com/)

## React Native und Mobile UI

**Bedarf:** Native App-UI — außerhalb von Loop 2, nur bei App-Auftrag.
**Default (Router):** React Native Reusables **oder** gluestack, an die Expo/RN-Version gekoppelt  [`#mobile`]
**Diese Liste ist:** Alternativen/Inspiration — erst öffnen, wenn der Default begründet ausgeschieden ist.
**Gate:** iOS+Android-Parität der genutzten Komponenten; Reanimated-Version passend
**Nie:** RN-Kit auf eine Marketing-Website ziehen


Vor Auswahl Expo-/React-Native-Kompatibilität, New Architecture, Plattformparität,
Accessibility-APIs, Gesten, Reanimated-Version und Release-Aktivität prüfen.

- [React Native Reusables](https://reactnativereusables.com/)
- [gluestack UI](https://gluestack.io/ui/docs/components/all-components)
- [Tamagui UI](https://tamagui.dev/ui/intro)
- [React Native Paper](https://reactnativepaper.com/)
- [React Native UI Lib](https://wix.github.io/react-native-ui-lib/)
- [React Native Elements](https://reactnativeelements.com/)
- [UI Kitten](https://akveo.github.io/react-native-ui-kitten/)
- [Composables UI](https://composables.com/ui)
- [Jetpack Compose Samples](https://github.com/android/compose-samples)
- [GetWidget](https://www.getwidget.dev/)

## Projektbezogener AgentReach-Check

Die kanonische AgentReach-Regel — einschließlich öffentlichem Kanal,
Projekt-Log und Fallback — steht in
[`tool-usecase-router.md`](tool-usecase-router.md#agentreach-pflicht-vor-install-kurz).
Für diese Kandidatenliste gilt sie unverändert; die Prüfschritte werden hier
nicht wiederholt.
