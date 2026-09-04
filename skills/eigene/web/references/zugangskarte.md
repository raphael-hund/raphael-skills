# Zugangskarte — wie der Agent eine Quelle wirklich nutzt

**Wofür:** Raphael nennt eine Site oder Bibliothek. Der Agent nimmt den
**einen** Weg in der Tabelle, nicht 160 CLIs und nicht die ganze Galerie.
Einzelzugriff bleibt `resource-access.mjs show`/`open`. Tiefzugriff nur über
die Zeile hier. Doku-Schwester: `inspirations-quellen.md` (Look),
`stock-bilder.md` (Fotos), `tool-usecase-router.md` (Default vor Alternative).

**Deckel:** max. 3 Look-Referenzen, 1 Komponente pro Bedarf, 6 Stock-Previews.
PNG/`shot` gilt erst nach **Read** durch ein Kritik-Leaf.

## Live-Zugänge (eingeloggt 03.09.2026)

| Quelle | Weg | Login |
|---|---|---|
| Refero Styles/Screens/Flows | MCP `refero` (`mcp__refero__refero_search_styles` → `get_style`; Screens/Flows analog) | Bearer, dauerhaft |
| Mobbin Screens/Flows/Sections | MCP `mobbin` (`mcp__mobbin__search_screens` / `search_flows` / `search_sections`) | OAuth, **neue Session** nach Token |
| 21st.dev Katalog + Code | MCP `21st` (`mcp__21st__search`, `get_component`, `get_inspiration`); Skript `inspiration.mjs 21st code <id> --out <dir>` (tsx + demo) | Token in `~/.config/21st/auth.json` + `API_KEY_21ST` |
| Shutterstock | `scripts/stock.mjs` (search → preview → license → add) | Token in `api-keys.env`, App Raphael VPS CLI |
| Navbar, Landdding, Awwwards, Siteinspire, Curated, Getlayers, Behance, Inspora, Swiped | `scripts/inspiration.mjs <quelle> list\|search\|get` + `shot` | öffentlich; Siteinspire nur Firecrawl; 21st-Code hinter Login → MCP |

Status: `claude mcp list`. Token erneuern: `/root/tools/auth-relays/README.md`.
Mobbin-Token lebt 60 min; Cron `mobbin-refresh.py` alle 40 min, bei 401 von Hand
`python3 /root/tools/auth-relays/mobbin-refresh.py --force`.

Live-Beleg 04.09.2026: 11 Galerie-Shots durch ein visual-kritiker-Leaf gelesen —
9 GALERIE, Mobbin ohne Login LANDING, Siteinspire BOT (auch im VPS-Chrome),
Inspora-Startseite zeigt nur das Intro-Logo → Medien-URLs aus `inspora list` laden. Refero/Mobbin/21st-MCP je ein Live-Call ok.

## Zugriffstypen (kein Extra-CLI)

| Typ | Bedeutung | Wann |
|---|---|---|
| **MCP** | Live-Tools in der Session | Refero, Mobbin, 21st, Firecrawl |
| **Skript** | `inspiration.mjs` / `stock.mjs` / `resource-access.mjs` | Galerien, Stock, Katalog-Open |
| **Vendor** | lokale Kopie unter `resources/components/<site>/` zuerst | shadcn, Origin, beui, Rare UI, … |
| **npm/Registry** | eine Komponente nach Router + Werkzeugtabelle | Magic UI, React Bits, Aceternity, Cult, Motion Primitives |
| **Paket** | `npm i <pkg>` nach Werkzeugtabelle | daisyUI, Preline, three, lucide-react, gsap |
| **open** | `resource-access.mjs open "<exakter Name>"` | Rest der 160er-Liste (Haikei, Unsplash, Lucide-Doku, …) |
| **Login** | Raphael muss einmal einloggen; Agent startet den Flow | siehe Blocker unten |
| **nein** | nicht für Site-Builds / anderer Skill | Kickresume, Superfile, FinderGit, Vibeindex |

## Komponenten (eine, nicht das Kit)

Magic UI, React Bits → `inspiration.mjs magicui|reactbits get --out`. 21st → MCP
`get_component` (Quota: `get_usage` zuerst). shadcn/ui Default:
`npx shadcn@latest add`. Aceternity, Cult, Motion Primitives, Shadcn Blocks,
Untitled UI, Park, Origin: Registry/CLI laut Router, eine Section.
daisyUI, Preline, HyperUI, Meraki, Float, Hover, Animata, Shoogle, Ruixen,
shadcn.io: `open` zur Recherche oder **eine** geprüfte Section. tsParticles,
Vanta, Three.js, OGL, R3F, Pixi, Theatre, GSAP: Paket, nur mit Budget in der
Werkzeugtabelle. Mantine: Docs + optional MCP der Library, nicht Default-Stack.

## Inspiration-Galerien (Look, nicht clonen)

Landdding, Awwwards, Siteinspire, Curated, Getlayers, Behance, Inspora,
Swiped, Navbar Gallery, Godly, Refero, Mobbin: Skript oder MCP wie oben.
60fps.design, posts.design, supahero.io, loadmo.re, recent.design, cta.gallery,
kinetics.colorion.co, 404.colorion.co, circleloaders, aicanvas.me, umanmade.com,
codeshots.dev: `open` falls im Katalog, sonst Firecrawl/`shot` **eine** URL,
max. 3. Siteinspire: Vercel-Checkpoint auch im VPS-Chrome → `siteinspire list` (Firecrawl) + Thumbnails. Inspora: Intro-Logo → Medien-URLs aus `inspora list`.

## Assets (Lizenz lesen, dann lokal)

Unsplash/Pexels/Pixabay nur ohne Shutterstock-Passung. Lottie, Spline, Rive,
Mixkit, Coverr: `open` + Lizenz, eine Datei. Illustration-Kits (unDraw,
Storyset, Humaaans, Blush, DrawKit, …): `open`, Attribution. Texturen/3D
(Poly Haven, ambientCG, Kenney, …): Download lokal, Lizenz in die Tabelle.
Icons: Default Lucide; andere Familien nur als **die eine** Familie.
Fonts: Adobe Fonts Library, nicht Google Fonts als Default.

## Shader / Generatoren

Haikei, BGJar, Hero Patterns, fffuel, Mesh Gradient, Coolors, Blobmaker, …:
`open`, Export lokal, nicht die Generator-Seite einbetten. Shadertoy,
Book of Shaders, Codrops: Recherche, Code nur mit Lizenz.

## Login / CLI, die Raphael einmal geben muss

| Bedarf | Was Raphael tut | Danach |
|---|---|---|
| 21st Token tot | `21st login` oder Key auf 21st.dev/mcp. Plan **Builder** (64 €/Jahr, seit 04.09.2026): Code-Abrufe unbegrenzt | MCP + CLI |
| Mobbin-Tools fehlen in der Session | neue Session nach OAuth | `mcp__mobbin__*` |
| Shutterstock 401 | Auth-Relay README, Google im VPS-Chrome | `stock.mjs` |
| Adobe Fonts | Kit-ID in `adobe-fonts-kit.mjs` | Embed |
| Mobbin-Browse ohne MCP | VPS-Chrome / AgentReach, echte Shots | Notizen in art-direction.md |

Kein Login: Rest der öffentlichen Galerien und Docs.

## Nie

- Eine CLI pro Site aus der Tweet-Liste.
- Zwei UI-Kits parallel.
- Katalog-Dump statt einer benannten Quelle.
- Screenshot-Pfad ohne Read.
- Stock oder Demo-Fotos als Kundenbeweis.
