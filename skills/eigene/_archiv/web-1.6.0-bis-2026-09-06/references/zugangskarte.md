# Zugangskarte — wie der Agent eine Quelle wirklich nutzt

**Wofür:** Der konkrete Bedarf bestimmt, welche benannte Quelle der Agent
untersucht und verwendet. [inspirations-quellen.md](inspirations-quellen.md)
beschreibt den Weg vom Fund zum belegten Einsatz im Projekt; der
[Router](tool-usecase-router.md) ordnet technische Bedarfe zu.

Die Scripts liegen unter `/root/raphael-skills/skills/eigene/web/scripts/`.
Die verkürzten Aufrufe unten beziehen sich auf diesen absoluten Pfad. Vor
Ausführung `--help` für aktuelle Flags nutzen. `inspiration.mjs` nimmt einen
Quellenschlüssel, `komponenten.mjs` einen Namen oder Namespace aus `libs`.
Astra kann diese Shellwege auch ohne native MCP-Tools nutzen; der Root übernimmt
Browser-/Shellaktionen für Leaves, denen diese Werkzeuge fehlen.

Quellenmenge folgt der offenen Entscheidung. Bilder muss der tatsächlich
sehfähige Owner/Agent ansehen; eine feste Kritik-Leaf-Pflicht gibt es nicht.
`open` liest Text, `show` nur Metadaten. Ein konkreter anderer erfolgreicher
Quellenzugriff braucht kein zusätzliches Homepage-`open`.

## Raphaels Quellen vom 05.09.2026

32 eindeutige Ziele einschließlich GetLayers und Godly (`godly.design`, Nachtrag
06.09.2026); Mobbin einmal, alleinstehende `http://` ohne Ziel verworfen.
Diese Quellen bilden den bevorzugten Pool bei passenden neuen Gestaltungs- und
Komponentenentscheidungen. „Verfügbar“ bedeutet hier einen benannten Zugang;
Aktualität, Anmeldung, Lizenz und tatsächlicher Abruf werden im jeweiligen Lauf
geprüft. Die Live-Befunde vom 05.09.2026 sind Momentaufnahmen.

| Quelle | Bedarf und konkreter Zugriff | Grenze vor Anwendung |
|---|---|---|
| [GetLayers](https://www.getlayers.ai/) | Website-/Landing-Komposition: `inspiration.mjs getlayers list --grep "<thema>"` → `get <slug>`; zurückgegebene Preview ansehen. Einbindung nach `inspirations-quellen.md` | Galerie-Preview belegt Gestaltung; Interaktion am laufenden Beispiel prüfen, Nutzungsrechte vor Übernahme |
| [Godly](https://godly.design/) | Website-/Landing-Inspiration: `resource-access.mjs open "Godly"`; konkretes Werk im Browser öffnen und ansehen | `godly.design` ist der gewünschte Zugang; der bestehende `recent`-Adapter gehört zu `recent.design` (vormals `godly.website`). Interaktion am laufenden Beispiel prüfen |
| [Landdding](https://landdding.com/) | Landing-Komposition: `inspiration.mjs landdding list` → `get <slug>`; verlinkte Site ansehen | Galerieeintrag und echte Site unterscheiden |
| [Awwwards](https://www.awwwards.com/websites/) | Art Direction/Interaktion: `inspiration.mjs awwwards list` → `get <slug>`; passende ausgezeichnete Site öffnen | Award ist kein A11y-/Performancebeleg |
| [SiteInspire](https://www.siteinspire.com/) | Typografie/Layout: `inspiration.mjs siteinspire list` → `get <id-slug>`; Visit-Ziel ansehen | Direkter Zugriff kann Checkpoint liefern; Firecrawl/Browser prüfen |
| [Mobbin](https://mobbin.com/) | Produkt-Screens/Flows: `design-mcp.mjs mobbin screens\|flows\|sections "<query>" --platform web --out <absoluter-Ordner>` | Tatsächliche Bilddateien ansehen; öffentliche Landingpage belegt keine Flow-Recherche |
| [Behance](https://www.behance.net/for_you?tracking_source=nav20) | Branding/Case-Gestaltung: `inspiration.mjs behance search "<query>"` → `get <id>`; Projektbilder ansehen | Persönlicher Feed kann Anmeldung brauchen; echte Projekt-Suche statt leerem Feed |
| [Inspora](https://www.inspora.design/) | Aktuelle Layout-/Motionarbeiten: `inspiration.mjs inspora list`; konkretes Werk und zugehörige Medien ansehen | Intro/Logo oder Detail-Checkpoint ist keine gesehene Referenz; vorhandenen Browser/Firecrawl prüfen |
| [Modulify](https://modulify.ai/templates) | Webflow-/Site-Templates: Templatekarte → echte Vorschau → dokumentierter Clone-/Exportweg | Vorschau ist kein erfolgter Clone; Account/Premium und Zielstack prüfen |
| [Kinetics](https://kinetics.colorion.co/) | CSS-Bewegung/Zustandswechsel: `inspiration.mjs kinetics list` → `get <slug> --out <absolute-Datei>` | CSS-Snippet kann nur einen Teil liefern; nötiges HTML/React/Keyframes aus Originaldetail lesen |
| [Circle Loaders](https://circleloaders.dominikakissi.com/) | Ladeindikator: `inspiration.mjs circleloaders list` → `get <slug> --out <absolute-Datei>` | SVG, Keyframes, Lizenz und Reduced Motion prüfen |
| [VibeIndex](https://vibeindex.dev/) | Werkzeugauswahl: Kategorie UI Generators → konkretes Tooldetail → Anbieter öffnen | Verzeichnisfund ist kein ausgeführter Builder |
| [404 Colorion](https://404.colorion.co/) | Passende Fehlerseite: `inspiration.mjs notfound list` → `get <slug> --out <absolute-Datei>` | HTML/CSS lesen, eigene Inhalte einsetzen, Fehlerroute und Bewegung prüfen |
| [FinderGit](https://findergit.app/) | Mac-Git-Dateiarbeit oder Datei-/Diff-UX: offizielle Feature-/Detailseite; vorhandene Mac-App im entsprechenden Auftrag bedienen | macOS-Anwendung; auf dem Linux-VPS nur Quellenzugriff, kein erfundener App-Lauf |
| [Mantine](https://mantine.dev/) | React-Primitives/Formulare: `komponenten.mjs search Mantine "<Komponente>"`; offizielle Component-/Setup-Doku öffnen | Vorhandenen Stack erhalten; Provider/CSS/React-Version prüfen. MCP nur nach tatsächlicher Discovery |
| [CodeShots](https://codeshots.dev/) | Code-Darstellung in Portfolio/Doku: Editor/Demo mit eigenem Code untersuchen, benötigten Export lokal verwenden | Kein Bild einer Codezeile als Beleg ihrer Funktion; Exportformat und Rechte prüfen |
| [AI Canvas](https://aicanvas.me/) | Interaktive Blocks: Komponentenübersicht → konkretes Detail, etwa `/components/tilted-coverflow` → dokumentierte Registry | Ohne Account lieferte `@aicanvas/tilted-coverflow` beim Test einen AccountRequired-Platzhalter; nur echtes Component-Payload einbauen |
| [Superfile](https://superfile.dev/) | Terminal-Dateiarbeit oder Datei-UX: Getting-Started-/Funktionsdoku; vorhandene Installation bei passendem Auftrag nutzen | Doku gelesen ist keine ausgeführte Dateioperation; kein zusätzliches Tool für triviale Shellarbeit installieren |
| [Kickresume](https://kickresume.com/) | Karriere-/Profilwebsite: `/en/online-web/` und konkrete Vorlage/Export ansehen | Websitebereich vorhanden; Account/Export und Nutzungszweck prüfen |
| [Umanmade](https://umanmade.com/) | Digitale Arbeiten/Portfolio: `inspiration.mjs umanmade list` → verlinkte Arbeit im Browser öffnen | `list` liefert Entdeckung, kein `get`-Adapter; Werk wirklich ansehen |
| [Beautiful UI](https://beautifului.dev/) | Agent-/Daten-UI: `resources/components/beautifului/INDEX.md` → konkrete TSX-Datei, Atoms und Tokens; aktuelles Site-Beispiel | Lokaler React-Port mit Demo-Daten, kein offizielles Agent-SDK; 20 lokale gegenüber 21 Live-Komponenten; echte Daten/Callbacks anbinden |
| [AI CSS](https://aicss.dev/) | Agent-Thinking-/Tool-/Streaming-Blöcke: konkretes Detail `/components/thinking-state` → Code `/r/thinking-state.json` und Lizenz lesen | Free/CLI MIT, Pro separat; konkreten React-/CSS-Stack prüfen |
| [Transitions.dev](https://transitions.dev/) | Gezielte CSS/JS-Übergänge: lokaler Vendor-Index → Rezept, etwa `01-card-resize.md`, plus `_root.css`; aktuelle Detaildemo | Rezepte mit eigenen Nutzungsbedingungen, Tooling MIT; Pro nicht pauschal im Snapshot |
| [Amicro](https://amicro.vercel.app/) | Micro-Interactions: Beispiel ansehen; im offiziell verlinkten Repo liefert [fade-in.json](https://github.com/Subhan-code/Amicro--Micro-transitions-/blob/main/registry/ui/fade-in.json) TSX | MIT; React/framer-motion-Abhängigkeiten lesen; im Motion-Stack Import kompatibel auf `motion/react` übertragen und testen |
| [Canvas UI](https://canvasui.dev/) | HTML-in-Canvas/WebGL/WebGPU: `/docs/installation` → konkrete Demo/Registry, etwa `/r/liquid-react.json` | MIT + Commons Clause; Browserfallback prüfen. Das geprüfte Liquid-Item importiert einen fehlenden `../rect-cache`-Helper; Download allein ist nicht baubar |
| [AI Elements](https://elements.ai-sdk.dev/) | AI-Chat-/Conversation-UI: `/docs/setup` → `/components/conversation` und gewählte Quelldateien | Apache-2.0; AI SDK-/React-/Tailwind-Voraussetzungen des gewählten Bausteins prüfen |
| [React Bits](https://reactbits.dev/) | Passender React-Effekt: `inspiration.mjs reactbits list` → `get <Name> --out <absoluter-Ordner>` oder `komponenten.mjs` | MIT + Commons Clause; Variante JS/TS und CSS/Tailwind wählen, Dependencies je Item lesen |
| [21st.dev](https://21st.dev/) | Gesuchte Community-Komponente: `design-mcp.mjs 21st search "<Baustein>"` → `get <id> --out <absoluter-Ordner>` | Auth, Quota und Lizenz je Item prüfen; Code, Demo und alle Imports lesen. Button 3824 benötigt zusätzlich `spinner-1` |
| [Beste UI](https://ui.beste.co/) | shadcn-/Tailwind-Blocks: konkretes `/block/<slug>` → dokumentiertes `/r/<slug>` | Free-Repo MIT, Site-/Pro-Lizenz hat eigene Bedingungen; Herkunft und Payload prüfen |
| [Magic UI](https://magicui.design/) | React-Marketingeffekt: `komponenten.mjs search @magicui "<Baustein>"` → `view/get`; alternativ `inspiration.mjs magicui get <name>` | Open-Source-Komponente und Pro-Template unterscheiden; benötigte CSS/Dependencies übernehmen |
| [Aceternity UI](https://ui.aceternity.com/) | Passender React-Background/Block: `komponenten.mjs search @aceternity "<Baustein>"` → `view/get` | Component-Demo/Code und eigene Lizenz unter `/licence` prüfen; keine Demo-Assets als Kundenmaterial |
| [Paper Shaders](https://shaders.paper.design/) | Gestalterisch begründeter Shader: `/mesh-gradient`, offizielle Doku; `@paper-design/shaders` beziehungsweise `@paper-design/shaders-react` | Apache-2.0; GPU-/Browserkosten, Reduced Motion und statischen Fallback prüfen |

## Weitere vorhandene Zugänge (Stand 04.09.2026; bei Nutzung prüfen)

| Quelle | Zugriff | Auth / Lizenzgrenze |
|---|---|---|
| Refero Styles/Screens/Flows | `node scripts/design-mcp.mjs refero styles search "<query>"` → `styles get <uuid>`; Screens/Flows analog | Bearer aus `~/.claude.json`; nur Inspiration, keine 1:1-Übernahme |
| Mobbin Screens/Flows/Sections | `node scripts/design-mcp.mjs mobbin screens\|flows\|sections "<query>" --platform web\|ios --out <dir>` | OAuth aus `.credentials.json`; Bilder nur als Dateien, nur Inspiration |
| 21st.dev Inspiration + Code | `node scripts/design-mcp.mjs 21st search "<query>"` → `21st get <id> --out <dir>` | Token aus `~/.config/21st/auth.json` oder `API_KEY_21ST`; einzelne Komponente nach Lizenzprüfung |
| Öffentliche Galerien | `node scripts/inspiration.mjs <quelle> list\|search\|get`; danach `shot <url> --out <dir>` | öffentlich; Look analysieren, keine Layouts/Assets kopieren |
| Komponenten-Registries | `node scripts/komponenten.mjs libs` → `search <@namespace\|name-aus-libs> "<query>"` (z.B. `@magicui`, `@react-bits`, `"Magic UI"`, `hyperui`; Query = ein bis zwei Wörter aus dem Komponentennamen, alle müssen vorkommen; `exit 1` heißt „kein Name passt", dann kürzer suchen) → `view <@namespace/name>` → `get <@namespace/name> --out <verzeichnis>` | eine Komponente; `get` druckt `lizenz prüfen`, wenn das Item keine Lizenz trägt: dann LICENSE des Repos/Docs lesen und in der Werkzeugtabelle nennen, sonst kein Einbau |
| Pexels | `pexels-pp-cli photos curated --per-page 6 --json` (keyless); `photos search --query "<query>" --per-page 6 --json` (Key seit 04.09.2026 in `~/.local/share/pexels-pp-cli/credentials.toml` und als `PEXELS_API_KEY` in `api-keys.env`; `pexels-pp-cli doctor` zeigt `Auth: configured`); gewählte `src.large`-URL mit `curl -L` lokal speichern | **Foto-Default bleibt Shutterstock über `scripts/stock.mjs`**; Pexels nur ohne Shutterstock-Passung; nie Kundenbeweis |
| Poly Haven | `polyhaven-pp-cli asset-types` → `assets --type textures\|hdris\|models [--categories <wert>] --json` → `info <id>` → `files <id>`; ausgewählte URL mit `curl -L` lokal speichern | öffentlich, CC0 |
| Iconify | `iconify-pp-cli icons --query "<query>" --prefixes <familien> --json` → `svg <prefix> <name> --deliver file:<pfad>`; Treffer ist Substring-Match: Icon-Namen lesen (`tooth` in `lucide` liefert nur `bluetooth`), bei Fehltreffer erst ohne `--prefixes` schauen, welche Familie das Motiv führt, dann bei der einen Produktfamilie bleiben oder das Motiv anders benennen | öffentlich; Lizenz über `collections` prüfen |
| Fontshare | `fontshare-pp-cli fonts list --search "<query>" --limit 20 --json` → `fonts get <slug>` | öffentlich; Lizenzfeld prüfen; Suche liefert derzeit auch ungefilterten Katalog |
| Codrops | `codrops-pp-cli posts list --search "<query>" --per-page 10 --json` → `posts get <id>` | öffentlich; Inspiration/Recherche, Code nur nach Lizenzprüfung |
| Shutterstock | `scripts/stock.mjs` (`search` → `preview` → `license` → `add`); englische Query mit ein bis zwei Motivwörtern (`dentist`, `dental practice`), keine Ortsnamen: `exit 1` = zu eng, breiter suchen | Token in `api-keys.env`; Standardlizenz dokumentieren |

Status und Hilfe: jedes oben genannte Werkzeug mit `--help`; MCP-Token erneuern:
`/root/tools/auth-relays/README.md`. Mobbin bei 401:
`python3 /root/tools/auth-relays/mobbin-refresh.py --force`.

## Zugriffstypen — genau ein Werkzeug je Typ

| Typ | Werkzeug | Gilt für |
|---|---|---|
| **MCP-Client** | `design-mcp.mjs` | Refero, Mobbin, 21st.dev; JSON-RPC/SSE nicht mit printing-press wrappen |
| **Komponenten-Skript** | `komponenten.mjs` | Registry, Vendor, npm-/Docs-Hinweis; `view`/`get` für `@namespace/name` |
| **Galerie-Skript** | `inspiration.mjs` | Galerien und Shot-Dateien |
| **REST-CLI** | `*-pp-cli` | flache REST-APIs: Pexels, Poly Haven, Iconify, Fontshare, Codrops |
| **Vendor** | `resources/components/<site>/` | lokale Kopie zuerst |
| **Paket/Original-CLI** | `npm i <pkg>` oder dokumentierte Anbieter-CLI | Runtime-Library bzw. Registry-Installation |
| **Einzelzugriff** | `resource-access.mjs open "<exakter Name>"` | Docs, Generatoren und Quellen ohne tieferen Adapter |
| **Spezialwerkzeuge** | offizieller Zugang nach Einsatzzweck | FinderGit, Superfile, Kickresume und VibeIndex nach der aktuellen Tabelle oben |

## Komponenten ziehen — ein Weg für UI-Bibliotheken

```bash
node scripts/komponenten.mjs libs
node scripts/komponenten.mjs search <lib|@namespace> "<query>"
node scripts/komponenten.mjs view <@namespace/name>
node scripts/komponenten.mjs get <@namespace/name> --out src/components/vendor/<namespace>/
```

`libs` nennt Zugangsweg und Lizenzstatus, `search` begrenzt die gewählte
Bibliothek, `view` zeigt Dateien und Abhängigkeiten, `get` schreibt genau das
Registry-Item. HTML-/npm-Treffer werden über ihren dokumentierten Weg geöffnet;
`view`/`get` gelten nur für `@namespace/name`. Danach Lizenz, Abhängigkeiten,
A11y und Router-Anker prüfen.

## Ergänzende Quellenwege

| Quellen | Weg |
|---|---|
| navbar.gallery (`navbar`) | `inspiration.mjs navbar list [static\|dropdowns\|mega-menu\|side-bar\|search-bar]` (ohne Typ: die drei Haupttypen) → `navbar get <slug>` → `shot` |
| styles.refero.design | `design-mcp.mjs refero styles search\|get`; öffentliche Style-URL bei ungültiger MCP-UUID einmal direkt lesen |
| supahero.io (`supahero`) | `inspiration.mjs supahero list` → `supahero get <slug\|url> [--out <datei>]` → `shot`; live belegt 04.09.2026 |
| cta.gallery (`cta`) | `inspiration.mjs cta list` → `cta get <slug\|url> [--out <datei>]` → `shot`; live belegt 04.09.2026 |
| recent.design (`recent`, vormals godly.website) | `inspiration.mjs recent list` → `recent get <slug\|url> [--out <datei>]` → `shot`; live belegt 04.09.2026 |
| 60fps.design (`fps`) | `inspiration.mjs fps list` → `fps get <slug\|url> [--out <datei>]` → `shot`; live belegt 04.09.2026 |
| posts.design (`posts`) | `inspiration.mjs posts list` → `posts get <slug\|url> [--out <datei>]` → `shot`; live belegt 04.09.2026 |
| loadmo.re (`loadmore`) | `inspiration.mjs loadmore list` → `loadmore get <slug\|url>` (JSON mit Quelle) → `shot`; live belegt 04.09.2026 |
| aicanvas.me | `komponenten.mjs search @aicanvas "<query>"` → `view`; `get` liefert ohne Account nur einen Stub (AccountRequired) → Login nötig, sonst nur Inspiration |
| mantine.dev | `komponenten.mjs search Mantine "<komponente>"` (Docs) bzw. `npm view @mantine/core`; kein Default-Stack |
| codeshots.dev | `node scripts/inspiration.mjs shot https://codeshots.dev --out <dir>` zur Funktionssicht; Werkzeug, kein Referenzfundus |
| findergit.app, superfile.dev, kickresume.com, vibeindex.dev | **nein** für Site-Builds |
| React Bits (`@react-bits`), Magic UI (`@magicui`), Aceternity UI (`@aceternity`), Cult UI (`@cult-ui`, Vercel-Checkpoint: `search` meldet exit 3 mit Ersatz `resource-access.mjs open "Cult UI"`), Motion Primitives (`@motion-primitives`, dito; Motion-Bedarf über npm `motion` + `references/ui-components/`), Origin UI (`vendor:coss-origin-ui`, AGPL; Vendor-Kopie lesen, `get` nur für Registry-Ziele `@coss/<name>`), Shadcn Blocks (`@shadcnblocks`; Pro-Blöcke antworten 401 → nächster freier Block) | `komponenten.mjs search <@namespace> "<query>"` → `view @namespace/name` → `get @namespace/name --out <dir>` |
| 21st.dev | `design-mcp.mjs 21st search\|get --out` |
| shadcn/ui | lokale Vendor-Kopie zuerst; dann gezielt `npx shadcn@latest add <name>` |
| shadcn.io, Ruixen UI | `komponenten.mjs libs` → `search`; Registry-Treffer über `view`/`get`, Docs-Treffer vor Übernahme öffnen und Lizenz prüfen |
| Untitled UI React | `npx untitledui@latest add`; Login bei Bedarf |
| Park UI | `@park-ui/cli`/Panda nach offizieller Doku |
| Hover.dev (`hover.dev`), Animata (`animata`), Float UI (`"Float UI"`), HyperUI (`hyperui`; Query = Kategorie-Slug wie `pricing`, `banners`, `headers`, `blog-cards`), Meraki UI (`"Meraki UI"`), daisyUI (`daisyUI`) | `komponenten.mjs search <name> "<query>"` liest die Docs-Seite und listet Treffer-URLs in der Spalte `ziel`; genau einen Treffer öffnen, Code an der Quelle kopieren, Lizenz prüfen |
| Shoogle | JS-App ohne statische Docs: `resource-access.mjs open` / VPS-Chrome; kein Skript-Weg |
| Preline UI, daisyUI | offizielles npm-Paket; Docs für eine Komponente |
| Ruixen UI, Park UI, Untitled UI React, Hover.dev | kein erfundener Registry-Code; bei Login/Checkpoint offen melden |
| tsParticles, Vanta.js, Three.js, OGL | offizielles npm-Paket, nur mit Router-Budget |
| Shadertoy, GLSL Sandbox, The Book of Shaders, NodeToy, ShaderFrog, VertexShaderArt, WebGL Samples, Three.js Resources | `resource-access.mjs open "<exakter Name>"`; Inspiration, Code/Lizenz separat prüfen. Shadertoy nur über Firecrawl-Kanal lesbar (Cloudflare), NodeToy ist tot (DNS SERVFAIL seit 04.09.2026) |
| Codrops | `codrops-pp-cli posts list\|get` |
| PixiJS, React Three Fiber, Theatre.js, GSAP | offizielles npm-Paket; Docs per `resource-access.mjs open` |
| Haikei, BGJar, Hero Patterns, SVG Backgrounds, fffuel, Get Waves, SVG Wave, MagicPattern, Mesh Gradient, WebGradients, uiGradients, Gradient Hunt, CSS Gradient, Grabient, InstantGradient, ColorFlow, Learn UI, Gradient Page, GradientsHub, Coolors, Photo Gradient, Colorffy, Gradients.app, PatternPad, Pattern Monster, Blobmaker, Blobmixer, Shape Divider, CSS Pattern, Patternico | `resource-access.mjs open "<exakter Katalogname>"` (Namen: `frontend-referenzbibliothek.md` Abschnitt Gradients; Learn UI = https://learnui.design/tools/gradient-generator.html); SVG/CSS lokal exportieren, Generator nie einbetten. InstantGradient und Gradient Page sitzen hinter Vercel-Checkpoint: `open` liest sie nur über Firecrawl (Key aus `api-keys.env`, seit 04.09.2026 automatisch), interaktiv nur VPS-Chrome |
| Poly Haven | `polyhaven-pp-cli assets\|info\|files`; URL gezielt per `curl -L` speichern |
| Texturelabs, Transparent Textures, Subtle Patterns, ambientCG, FreePBR, 3DTextures, ShareTextures, Kenney, Quaternius | `resource-access.mjs open "<exakter Name>"`; Asset lokal speichern, Lizenz notieren. ambientCG zusätzlich per API: `curl -s 'https://ambientcg.com/api/v2/full_json?q=<begriff>&type=Material&limit=5&include=downloadData'` → `downloadLink` mit `curl -L` laden (CC0). Subtle Patterns: Cloudflare, `open` liest über Firecrawl, Repo https://github.com/atlemo/SubtlePatterns |
| Pexels | `pexels-pp-cli photos search\|get`; Download-URL gezielt per `curl -L` speichern |
| Unsplash, Pixabay | `resource-access.mjs open "<Name>"` (Bot-Wall: läuft nur über den Firecrawl-Kanal); nur ohne Shutterstock-Passung; Unsplash-API braucht eigenen Key (nicht vorhanden), Pixabay-API ebenso. Foto-Suche also Shutterstock → Pexels → erst dann diese beiden |
| unDraw, ManyPixels, Storyset, Open Doodles, Humaaans, Blush, DrawKit, IRA Design, Illustrations.co | `resource-access.mjs open "<Name>"`; genau ein Kit, SVG lokal, Attribution prüfen. IRA Design ist down (522 seit 04.09.2026) |
| LottieFiles, Spline, Rive, Mixkit, Coverr, Life of Vids | `resource-access.mjs open "<Name>"` (LottieFiles und Life of Vids hinter Cloudflare, nur Firecrawl-Kanal); Lottie-Player als npm `@lottiefiles/dotlottie-react`; Datei lokal, Lizenz/Performance prüfen |
| Lucide (`lucide`), Tabler (`tabler`), Phosphor (`ph`), Heroicons (`heroicons`), Remix (`ri`), Iconoir (`iconoir`), Simple Icons (`simple-icons`), Radix (`radix-icons`), Material Symbols (`material-symbols`), Hugeicons (`hugeicons`), Iconify (alle) | `iconify-pp-cli icons --query "<motiv>" --prefixes <prefix> --json` → `svg <prefix> <name> --deliver file:<pfad>`; Prefix ist der Schlüssel in Klammern (`iconify-pp-cli collections --json` listet alle); leere `results` heißt „Familie führt das Motiv nicht“, nicht „Familie fehlt“; eine Familie pro Produkt |
| Atlas Icons | `resource-access.mjs open "Atlas Icons"`; Iconify-Live-Katalog enthält die Familie derzeit nicht, daher offen prüfen |
| SVG Repo, Icons8 | `resource-access.mjs open "<Name>"` (Vercel-/Cloudflare-Wall, nur Firecrawl-Kanal); Premium-Lizenz bei Icons8 prüfen |
| Fontshare | `fontshare-pp-cli fonts list\|get` |
| Google Fonts, Velvetyne, Open Foundry, Uncut, Use & Modify, Typewolf, Fonts In Use, Fontesk, Collletttivo, The League of Moveable Type, Omnibus Type, Atipo Foundry | `resource-access.mjs open "<exakter Name>"` (z.B. `"The League of Moveable Type"`; Uncut nur über `open`, nacktes curl bekommt 455); Recherche/Lizenzprüfung. Adobe Fonts bleibt Router-Default: `node scripts/adobe-fonts-kit.mjs json\|embed\|files\|apply\|show` |
| React Native Reusables, gluestack UI, Tamagui UI, React Native Paper, React Native UI Lib, React Native Elements, UI Kitten, Composables UI, Jetpack Compose Samples, GetWidget | `komponenten.mjs libs` nennt Paket + Docs-URL; `komponenten.mjs search "<Name>" "<komponente>"` listet Docs-Treffer (Menü-Links; `exit 1` = Docs führen den Namen nicht, dann Docs-URL direkt öffnen); GetWidget ist Flutter (pub.dev), kein npm; Expo/Plattform-Kompatibilität prüfen |

## Grenzen

- Nur die für die Entscheidung und Prüfung benötigten Quellen/Bausteine laden.
- Bilddateien und Shots zählen erst nach tatsächlichem Ansehen als gesehen.
- Stock, Demo-Fotos und Illustrationskits sind nie Kundenbeweis.
- `--deliver file:<pfad>` ist bei Iconify der Dateiweg; Pexels/Poly Haven haben
  keinen nativen Download-`--out`, deshalb nur die gewählte Datei per `curl -L`.

## Login / CLI, die Raphael einmal geben muss

| Bedarf | Was Raphael tut | Danach |
|---|---|---|
| 21st Token fehlt/ist ungültig | `21st login` oder Key auf 21st.dev/mcp; Agent startet den Login-Flow | `design-mcp.mjs 21st …` |
| Mobbin 401 | Agent führt `python3 /root/tools/auth-relays/mobbin-refresh.py --force` aus | `design-mcp.mjs mobbin …` |
| Shutterstock 401 | Agent startet den Auth-Relay-Login im VPS-Chrome | `stock.mjs` |
| Adobe Fonts | Kit-ID in `adobe-fonts-kit.mjs` | Embed |
| Mobbin-Browse außerhalb des Clients | VPS-Chrome / AgentReach, echte Shots | Notizen in `art-direction.md` |

Kein Login: Rest der öffentlichen Galerien und Docs.

## Nie

- Vorhandenen passenden Adapter verwenden; dokumentierten Browser-/Fetch-Ersatz bei Zugangslücken nutzen, keine zweite allgemeine Zugangsschicht bauen.
- Zwei UI-Kits parallel.
- Katalog-Dump statt einer benannten Quelle.
- Screenshot-Pfad ohne Read.
- Stock oder Demo-Fotos als Kundenbeweis.
