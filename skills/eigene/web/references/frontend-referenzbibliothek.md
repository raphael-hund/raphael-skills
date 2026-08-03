# Frontend-Referenzbibliothek — Kandidaten hinter dem Router

Diese Bibliothek ist die **Kandidaten-Karte** zur Tweet-Sammlung. Sie ist
**keine Installationsliste** und **kein erster Output** eines Agents.

**Zuerst immer** `tool-usecase-router.md` (Bedarf → Default → Install/Use →
Gate → Nie). Die URLs hier sind nur Alternativen und Recherchequellen **nach**
Default-Wahl.

> **Ausgabe-Deckel:** Nie mehr als 3 URLs aus dieser Datei in eine Antwort, nie
> eine ganze Kategorie zitieren, nie diese Datei als Ersatz für den Router laden.

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
- [Origin UI](https://originui.com/)
- [Float UI](https://floatui.com/)
- [Preline UI](https://preline.co/)
- [HyperUI](https://www.hyperui.dev/)
- [Meraki UI](https://merakiui.com/)
- [daisyUI](https://daisyui.com/)
- [tsParticles](https://particles.js.org/)
- [Vanta.js](https://www.vantajs.com/)
- [Three.js](https://threejs.org/)
- [OGL](https://oframe.github.io/ogl/)

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
- [Blobmixer](https://www.blobmixer.ooo/)
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

## Bilder, Videos und Illustrationen

**Bedarf:** Inhalts-Bilder, Illustrationen und Bewegtbild auf der fertigen Seite.
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
- [unDraw](https://undraw.co/)
- [ManyPixels](https://www.manypixels.co/)
- [Storyset](https://storyset.com/)
- [Open Doodles](https://www.opendoodles.com/)
- [Humaaans](https://www.humaaans.com/)
- [Blush](https://blush.design/)
- [DrawKit](https://www.drawkit.com/)
- [IRA Design](https://iradesign.io/)
- [Illustrations.co](https://illlustrations.co/)
- [LottieFiles](https://lottiefiles.com/)
- [Spline](https://spline.design/)
- [Rive](https://rive.app/)
- [Mixkit](https://mixkit.co/)
- [Coverr](https://coverr.co/)
- [Life of Vids](https://www.lifeofvids.com/)

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
- [Atlas Icons](https://atlasicons.vectopus.com/)

## Fonts und Typografie

**Bedarf:** Typografie für Marke und Web.
**Default (Router):** Brand-Font aus dem Dossier, self-hosted (`next/font/local`)  [`#fonts`]
**Diese Liste ist:** Alternativen/Inspiration — erst öffnen, wenn der Default begründet ausgeschieden ist.
**Gate:** Lizenz erlaubt Web-Embedding; keine Requests gegen fonts.gstatic.com; max. 2 Familien
**Nie:** Schrift allein aus einer Galerie übernehmen; CDN statt Self-Hosting


Webfont-Lizenz, Self-Hosting, erlaubtes Subsetting, Zeichensatz, variable Achsen,
Fallbacks und echte Renderkosten prüfen. Gefundene Schrift niemals allein anhand
einer Galerie in Produktion übernehmen.

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

Vor einer Empfehlung oder Installation:

1. `agent-reach doctor --json` ausführen und den aktiven öffentlichen Web-/
   Search-Kanal verwenden.
2. Kandidaten-Website und offizielle Doku öffnen; bei Code zusätzlich das
   offizielle Repository und die Lizenzdatei prüfen.
3. Datum, geprüfte URL, Lizenzstand, letzte gepflegte Version und offene
   Unsicherheit im Projekt-Log notieren.
4. Scheitert die Prüfung oder bleibt die Lizenz unklar, nichts installieren
   und einen besser belegten Kandidaten aus derselben Router-Zeile wählen
   (`tool-usecase-router.md`).
