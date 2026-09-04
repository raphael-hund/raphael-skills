# Zugangskarte — wie der Agent eine Quelle wirklich nutzt

**Wofür:** Raphael nennt eine Site oder Bibliothek. Der Agent nimmt den
**einen** Weg in der Tabelle, nicht 160 CLIs und nicht die ganze Galerie.
Einzelzugriff bleibt `resource-access.mjs show`/`open`. Tiefzugriff nur über
die Zeile hier. Doku-Schwester: `inspirations-quellen.md` (Look),
`stock-bilder.md` (Fotos), `tool-usecase-router.md` (Default vor Alternative).

**Deckel:** max. 3 Look-Referenzen, 1 Komponente pro Bedarf, 6 Stock-Previews.
PNG/`shot` gilt erst nach **Read** durch ein Kritik-Leaf.

**Arbeitsverzeichnis:** alle `node scripts/<x>.mjs`-Aufrufe hier gelten mit
`cd /root/raphael-skills/skills/eigene/web` (oder absolutem Skriptpfad).
`*-pp-cli` liegen in `~/.local/bin` (Leaf-Shell: `export PATH=$HOME/.local/bin:$PATH`). Erstes Argument von `inspiration.mjs`
und `komponenten.mjs search` ist der **Schlüssel**, nicht die Domain:
`--help` bzw. `komponenten.mjs libs` (Spalte `name`, Registry-Namespaces
mit `@`) nennen ihn; Domain → Schlüssel steht in der Quellenwege-Tabelle in
Klammern.

## Live-Zugänge (geprüft 04.09.2026)

| Quelle | Zugriff | Auth / Lizenzgrenze |
|---|---|---|
| Refero Styles/Screens/Flows | `node scripts/design-mcp.mjs refero styles search "<query>"` → `styles get <uuid>`; Screens/Flows analog | Bearer aus `~/.claude.json`; nur Inspiration, keine 1:1-Übernahme |
| Mobbin Screens/Flows/Sections | `node scripts/design-mcp.mjs mobbin screens\|flows\|sections "<query>" --platform web\|ios --out <dir>` | OAuth aus `.credentials.json`; Bilder nur als Dateien, nur Inspiration |
| 21st.dev Inspiration + Code | `node scripts/design-mcp.mjs 21st search "<query>"` → `21st get <id> --out <dir>` | Token aus `~/.config/21st/auth.json` oder `API_KEY_21ST`; einzelne Komponente nach Lizenzprüfung |
| Öffentliche Galerien | `node scripts/inspiration.mjs <quelle> list\|search\|get`; danach `shot <url> --out <dir>` | öffentlich; Look analysieren, keine Layouts/Assets kopieren |
| Komponenten-Registries | `node scripts/komponenten.mjs libs` → `search <@namespace\|name-aus-libs> "<query>"` (z.B. `@magicui`, `@react-bits`, `"Magic UI"`, `hyperui`; Query = ein bis zwei Wörter aus dem Komponentennamen, alle müssen vorkommen; `exit 1` heißt „kein Name passt", dann kürzer suchen) → `view <@namespace/name>` → `get <@namespace/name> --out <verzeichnis>` | eine Komponente; `get` druckt `lizenz prüfen`, wenn das Item keine Lizenz trägt: dann LICENSE des Repos/Docs lesen und in der Werkzeugtabelle nennen, sonst kein Einbau |
| Pexels | `pexels-pp-cli photos curated --per-page 6 --json` (keyless); `photos search --query "<query>" --per-page 6 --json` (Key `PEXELS_API_KEY` aus `api-keys.env`, seit 04.09.2026 vorhanden; Leaf: `set -a; . /root/.secrets/api-keys.env; set +a`); gewählte `src.large`-URL mit `curl -L` lokal speichern | **Foto-Default bleibt Shutterstock über `scripts/stock.mjs`**; Pexels nur ohne Shutterstock-Passung; nie Kundenbeweis |
| Poly Haven | `polyhaven-pp-cli assets --type textures\|hdris\|models --categories <wert> --json` → `info <id>` → `files <id>`; ausgewählte URL mit `curl -L` lokal speichern | öffentlich, CC0 |
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
| **Nein** | kein Site-Build-Zugang | FinderGit, Superfile, Kickresume, Vibeindex |

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

## Quellenwege — Raphaels Liste vollständig

| Quellen | Weg |
|---|---|
| navbar.gallery (`navbar`) | `inspiration.mjs navbar list [static\|dropdowns\|mega-menu\|side-bar\|search-bar]` (ohne Typ: die drei Haupttypen) → `navbar get <slug>` → `shot` |
| styles.refero.design | `design-mcp.mjs refero styles search\|get`; öffentliche Style-URL bei ungültiger MCP-UUID einmal direkt lesen |
| supahero.io (`supahero`) | `inspiration.mjs supahero list` → `supahero get <slug\|url> [--out <datei>]` → `shot`; live belegt 04.09.2026 |
| cta.gallery (`cta`) | `inspiration.mjs cta list` → `cta get <slug\|url> [--out <datei>]` → `shot`; live belegt 04.09.2026 |
| recent.design (`recent`, vormals godly.website) | `inspiration.mjs recent list` → `recent get <slug\|url> [--out <datei>]` → `shot`; live belegt 04.09.2026 |
| 60fps.design (`fps`) | `inspiration.mjs fps list` → `fps get <slug\|url> [--out <datei>]` → `shot`; live belegt 04.09.2026 |
| posts.design (`posts`) | `inspiration.mjs posts list` → `posts get <slug\|url> [--out <datei>]` → `shot`; live belegt 04.09.2026 |
| loadmo.re (`loadmore`), kinetics.colorion.co (`kinetics`), 404.colorion.co (`notfound`), circleloaders.dominikakissi.com (`circleloaders`), umanmade.com (`umanmade`) | `inspiration.mjs <schlüssel> list`; Snippet-Seiten `get <slug\|url> --out <datei>` (CSS/SVG); live belegt 04.09.2026 (kinetics-Snippets sind teils <200 B, Keyframes stehen auf der Seite) |
| inspora.design (`inspora`) | `inspiration.mjs inspora list`; Medien-URL lokal speichern und im Shot-Leaf lesen |
| aicanvas.me | `komponenten.mjs search @aicanvas "<query>"` → `view @aicanvas/<name>` → `get @aicanvas/<name> --out <dir>` |
| mantine.dev | npm-Paket + Mantine-Doku/Docs-MCP; kein Default-Stack |
| codeshots.dev | `node scripts/inspiration.mjs shot https://codeshots.dev --out <dir>` zur Funktionssicht; Werkzeug, kein Referenzfundus |
| findergit.app, superfile.dev, kickresume.com, vibeindex.dev | **nein** für Site-Builds |
| React Bits (`@react-bits`), Magic UI (`@magicui`), Aceternity UI (`@aceternity`), Cult UI (`@cult-ui`, oft Vercel-Checkpoint → Vendor/Docs), Motion Primitives (`@motion-primitives`, dito), Origin UI (`vendor:coss-origin-ui`, AGPL), Shadcn Blocks (`@shadcnblocks`) | `komponenten.mjs search <@namespace> "<query>"` → `view @namespace/name` → `get @namespace/name --out <dir>` |
| 21st.dev | `design-mcp.mjs 21st search\|get --out` |
| shadcn/ui | lokale Vendor-Kopie zuerst; dann gezielt `npx shadcn@latest add <name>` |
| shadcn.io, Ruixen UI | `komponenten.mjs libs` → `search`; Registry-Treffer über `view`/`get`, Docs-Treffer vor Übernahme öffnen und Lizenz prüfen |
| Untitled UI React | `npx untitledui@latest add`; Login bei Bedarf |
| Park UI | `@park-ui/cli`/Panda nach offizieller Doku |
| Hover.dev (`hover.dev`), Animata (`animata`), Float UI (`"Float UI"`), HyperUI (`hyperui`), Meraki UI (`"Meraki UI"`) | `komponenten.mjs search <name> "<query>"` liest die Docs-Seite und listet Treffer-URLs in der Spalte `ziel`; genau einen Treffer öffnen, Code an der Quelle kopieren, Lizenz prüfen |
| Shoogle | JS-App ohne statische Docs: `resource-access.mjs open` / VPS-Chrome; kein Skript-Weg |
| Preline UI, daisyUI | offizielles npm-Paket; Docs für eine Komponente |
| Ruixen UI, Park UI, Untitled UI React, Hover.dev | kein erfundener Registry-Code; bei Login/Checkpoint offen melden |
| tsParticles, Vanta.js, Three.js, OGL | offizielles npm-Paket, nur mit Router-Budget |
| Shadertoy, GLSL Sandbox, The Book of Shaders, NodeToy, ShaderFrog, VertexShaderArt, WebGL Samples, Three.js Resources | `resource-access.mjs open`; Inspiration, Code/Lizenz separat prüfen |
| Codrops | `codrops-pp-cli posts list\|get` |
| PixiJS, React Three Fiber, Theatre.js, GSAP | offizielles npm-Paket; Docs per `resource-access.mjs open` |
| Haikei, BGJar, Hero Patterns, SVG Backgrounds, fffuel, Get Waves, SVG Wave, MagicPattern, Mesh Gradient, WebGradients, uiGradients, Gradient Hunt, CSS Gradient, Grabient, InstantGradient, ColorFlow, Learn UI, Gradient Page, GradientsHub, Coolors, Photo Gradient, Colorffy, Gradients.app, PatternPad, Pattern Monster, Blobmaker, Blobmixer, Shape Divider, CSS Pattern, Patternico | `resource-access.mjs open`; SVG/CSS lokal exportieren, Generator nie einbetten |
| Poly Haven | `polyhaven-pp-cli assets\|info\|files`; URL gezielt per `curl -L` speichern |
| Texturelabs, Transparent Textures, Subtle Patterns, ambientCG, FreePBR, 3DTextures, ShareTextures, Kenney, Quaternius | `resource-access.mjs open`; Asset lokal speichern, Lizenz notieren |
| Pexels | `pexels-pp-cli photos search\|get`; Download-URL gezielt per `curl -L` speichern |
| Unsplash, Pixabay | `resource-access.mjs open`; nur ohne Shutterstock-Passung, Lizenz und API-Blocker beachten |
| unDraw, ManyPixels, Storyset, Open Doodles, Humaaans, Blush, DrawKit, IRA Design, Illustrations.co | `resource-access.mjs open`; genau ein Kit, SVG lokal, Attribution prüfen |
| LottieFiles, Spline, Rive, Mixkit, Coverr, Life of Vids | `resource-access.mjs open`; Datei lokal, Lizenz/Performance prüfen |
| Lucide, Tabler Icons, Phosphor Icons, Heroicons, Remix Icon, Iconoir, Simple Icons, Radix Icons, Material Symbols, Iconify, Hugeicons | `iconify-pp-cli icons` → `svg --deliver file:<pfad>`; eine Familie, Collection-Lizenz prüfen |
| Atlas Icons | `resource-access.mjs open "Atlas Icons"`; Iconify-Live-Katalog enthält die Familie derzeit nicht, daher offen prüfen |
| SVG Repo, Icons8 | `resource-access.mjs open`; Rate-Limit bzw. Premium-Lizenz als offen behandeln |
| Fontshare | `fontshare-pp-cli fonts list\|get` |
| Google Fonts, Velvetyne, Open Foundry, Uncut, Use & Modify, Typewolf, Fonts In Use, Fontesk, Collletttivo, The League of Moveable Type, Omnibus Type, Atipo Foundry | `resource-access.mjs open`; Recherche/Lizenzprüfung, Adobe Fonts bleibt Router-Default |
| React Native Reusables, gluestack UI, Tamagui UI, React Native Paper, React Native UI Lib, React Native Elements, UI Kitten, Composables UI, Jetpack Compose Samples, GetWidget | offizielles Paket/CLI + Docs; Expo/Plattform-Kompatibilität prüfen |

## Grenzen

- Max. 3 Look-Referenzen, 1 Komponente pro Bedarf, 6 Stock-Previews.
- Bilddateien und Shots zählen erst nach Read durch ein Kritik-Leaf als gesehen.
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

- Kein zweites Werkzeug für denselben Zugangstyp; MCP bleibt `design-mcp.mjs`, Komponenten bleiben `komponenten.mjs`, Galerien bleiben `inspiration.mjs`, flache REST-APIs bleiben printing-press-CLIs.
- Zwei UI-Kits parallel.
- Katalog-Dump statt einer benannten Quelle.
- Screenshot-Pfad ohne Read.
- Stock oder Demo-Fotos als Kundenbeweis.
