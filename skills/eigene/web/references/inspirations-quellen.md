# Inspirations-Quellen — Refero-MCP zuerst, Galerien über `scripts/inspiration.mjs`

**Wofür:** Design-DNA und Look-Referenzen vor dem Bau. Primär Refero-MCP
(Styles→Screens→Flows + Reference-Lock). Galerien und Komponenten nur als
Ergänzung über `node scripts/inspiration.mjs --help`. Einzelzugriff bleibt
`resource-access.mjs show`/`open`. Unbekanntes Flag = Exit 2. `--json`
überall. Timeout 45 s. Kein Cache, kein Cookie, Schreiben nur mit `--out`
(shot → Default `/tmp/inspiration-shots`).

Lesen: Jina `https://r.jina.ai/<url>`, Fallback Firecrawl. Ausnahme
siteinspire: direkt Firecrawl (Jina = 429). awwwards/getlayers/inspora:
HTML per fetch mit Chrome-UA.

## Deckel

Max. **3 Referenzen** pro Auftrag. Max. **1 Komponente pro Bedarf**. Danach
Zeile in der Werkzeugtabelle (`art-direction.md`) plus Router-Anker
`#sections` / `#motion` / `#background`.

## Lizenz

Alle Galerien = **Inspiration/Analyse** (Muster, Tokens, Struktur).
Screenshots nur intern (Design-DNA, PRUEFGEGEN), nie in Kundenauslieferung.
Keine Layout-/Asset-Kopie. Magic UI (MIT) und React Bits (MIT, Registry) =
**eine** Komponente übernehmbar, danach Vendor-Pfad plus Werkzeugtabelle.

## 0. Ablauf (Refero-MCP zuerst, dann Galerien, dann Screenshot)

Nach Skill `/root/.claude/skills/refero-design/SKILL.md` und
`references/mcp-tools.md`. Server: User-MCP `refero` (HTTP, Bearer) —
Status `claude mcp list`. Toolnamen exakt mit Präfix `mcp__refero__…`.

1. Brief in 8 Zeilen (WHAT/WHO/PLATFORM, Goal, Tone, Objection, Hook,
   Constraints, Research needed, Path).
2. `mcp__refero__refero_search_styles` mit 3–5 Suchwinkeln (breit, Domäne,
   bekannte Marke).
3. `mcp__refero__refero_get_style` für 3–4 UUIDs (`response_format: md`).
4. Reference-Lock: Primärreferenz, Preserve, Borrow only, Role rules,
   Reject, Token commitments — in `art-direction.md`.
5. Produkt-UI: `mcp__refero__refero_search_screens` /
   `mcp__refero__refero_get_screen` (`platform` web|ios). Journeys:
   `mcp__refero__refero_search_flows` / `mcp__refero__refero_get_flow`.
6. Galerien über `inspiration.mjs` nur als Ergänzung (max. 3 Referenzen).
7. `inspiration.mjs shot <url>` für alles Visuelle; PNG per **Read** ansehen
   (Pfad ohne Ansehen = nicht gesehen).
8. Design-DNA-Tabelle in `art-direction.md`.

Regeln: nicht eine Referenz kopieren; nicht zur sicheren Mitte mitteln;
Token-Rollen nicht umdeuten; Bild-Rollen erhalten; kein Design „aus
Erinnerung".

## Mobbin

MCP-Server `mobbin` (OAuth abgeschlossen 03.09.2026, Tools `search_screens`,
`search_flows`, `search_sections` → `mcp__mobbin__*`, erscheinen in einer
**neuen** Session). Öffentliche Seite ohne Login = Landingpage. App/Flows:
Mobbin zuerst (Router-Default). Skript: `inspiration.mjs mobbin` → Hinweis,
kein Netzaufruf. Token erneuern: `/root/tools/auth-relays/README.md`.

## 1. Refero Styles — Loop `art-direction`

**Wofür:** Design-DNA-Tokens als Vergleich. Primär über MCP (§0); Skript
nur Fallback/Offline.

```bash
node scripts/inspiration.mjs refero search "saas dark" --limit 10
node scripts/inspiration.mjs refero get <styleId|url> [--out DESIGN.md]
```

Suche `styles.refero.design/?q=` → `{title,url,styleId}`. Get: DESIGN.md-
Fence. **Ziehen:** Farbe, Typo, Radius, Dichte, Motion — gegen eigene DNA,
nicht kopieren.

## 2. Navbar Gallery — Loop `art-direction` / Sitemap-IA

```bash
node scripts/inspiration.mjs navbar list [static|dropdowns|mega-menu|…] [--limit 20]
node scripts/inspiration.mjs navbar get <slug|url>
```

**Ziehen:** Item-Anzahl, Dropdown vs. Mega vs. Sidebar, Suche ja/nein. Kein
Header-HTML übernehmen.

## 3. Magic UI (MIT) — Loop `components`

```bash
node scripts/inspiration.mjs magicui list [--grep <substr>]
node scripts/inspiration.mjs magicui get <name> [--out src/components/vendor/magicui/<name>.tsx]
```

Eine Motion-/Marketing-Komponente, Werkzeugtabelle, Anker `#motion`/`#sections`.

## 4. React Bits (MIT, Registry) — Loop `components`

```bash
node scripts/inspiration.mjs reactbits list [--grep <substr>]
node scripts/inspiration.mjs reactbits get DotField --out src/components/vendor/reactbits/
```

Default-Variante TS-TW. Vendor-Ordner + Werkzeugtabelle.

## 5. 21st.dev — Loop `components` (MCP zuerst)

MCP `21st` (User-Scope, x-api-key aus `~/.config/21st/auth.json`, 03.09.2026):
`mcp__21st__get_usage` → Quota; `mcp__21st__search` (Metadaten, immer frei);
`mcp__21st__get_component` (Code + Demo, zählt gegen Quota, free = 2/Tag);
`mcp__21st__get_inspiration` (gegen Design-Context rerankt); `search_logo` frei.
Skript bleibt für Muster ohne Login:

```bash
node scripts/inspiration.mjs 21st search hero --limit 20
node scripts/inspiration.mjs 21st get @author/slug
```

Registry ohne Login = 403. Muster + Source-Link; Code nie raten. Mit CLI-
Login siehe § „21st mit CLI".

## Landdding — Loop `art-direction`

Landing-Looks. `landdding list [<kategorie>] [--limit 20]` (agency, ai,
design …); `landdding get <slug|url>`. Einträge `{title,url,slug}`; get →
title, visit, thumbnail. Lesen über `readMarkdown`.

## Awwwards — Loop `art-direction`

Award-Sites. `awwwards list [<tag>] [--limit 30]` (agency, e-commerce,
portfolio …); HTML-fetch, Parser `parseAwwwardsList`. Get → title,
screenshot (og:image), tags. ~31 Einträge/Seite.

## Siteinspire — Loop `art-direction`

Kuratierte Websites. **Nur Firecrawl** (Jina = Vercel-Checkpoint).
`siteinspire list [<kategorie>] [--limit 20]`; get `<id-slug|url>`. Ausgabe
`{name,url,visit,thumbnail}`; Mobbin-Werbekarte herausfiltern. shot trifft
ebenfalls Checkpoint → raphael-chrome.

## Curated.design — Loop `art-direction`

Screenshot-/Video-Galerie. `curated list [--limit 30]` →
`{name,thumbnail,video?}`. **Kein get** (SPA, leere Detailseite) — Exit 2,
Thumbnail ist bereits Screenshot.

## Getlayers — Loop `art-direction` / Prompt-Templates

KI-Site-Templates. `getlayers list [--limit 40] [--grep <substr>]`; get `<slug|url>`.
`{name,slug,url,category,thumbnail}`. Lizenz/Preis auf der Seite prüfen,
nichts kopieren.

## Behance — Loop `art-direction`

Projekt-Suche. `behance search "<query>" [--limit 20]`; get `<id|url>` →
title + images (max 12). Gallery-Links dedupen nach id.

## Inspora — Loop `art-direction`

Design-Posts mit Medien. `inspora list [--limit 20]` (HTML-fetch Startseite).
`{slug,url,media}`. **Kein get** — Detail hinter Vercel-Checkpoint (429);
Medien-URL aus list oder raphael-chrome.

`shot` zeigt bei Inspora nur das blaue Logo, auch im VPS-Chrome mit echtem Profil
(Intro-Animation der Site, gemessen 04.09.2026). Sehen: `inspora list` liefert
16 Medien-URLs (webp/mp4) → einzelne Datei laden und per Read ansehen.

## Swiped — Loop `art-direction` (Posts, keine Websites)

Design-Posts von X/LinkedIn. `swiped list [--limit 20]` →
`{category,author,handle,text≤280,media,likes}`. Keine Website-Referenz.

## Screenshot sehen (shot)

```bash
node scripts/inspiration.mjs shot <url> [--out <dir>] [--mobile] [--full] [--wait <ms>]
```

Playwright (dynamischer Import nur hier), Viewport 1440×900 (+390×844 mit
`--mobile`), Cookie-Klick (Accept all / Accept / Akzeptieren / …), Default-
Wait 4000 ms, Default-out `/tmp/inspiration-shots`. Bot-Schutz-Titel → Exit 1
mit Hinweis `raphael-chrome open <url>` / `raphael-chrome screenshot`. **PNG
danach mit Read ansehen** — ein Pfad ohne Ansehen zählt nicht. Deckel 3
Referenzen; Screenshots nur intern.

## 21st mit CLI

CLI: `/root/.local/bin/21st`, eingeloggt (`21st whoami`, Token in
`~/.config/21st/auth.json`, 03.09.2026). `inspiration.mjs 21st code <begriff|id>`
liefert Treffer mit `installCommand`; `21st get <id> --json` den Code.
Login erneuern: `/root/tools/auth-relays/README.md` (Google-2FA am Handy).
Ohne Token bleibt `21st get` (Muster, Source-Link).

## Lehren aus dem Video (Jack Roberts, „Fable 5.1 Just Solved AI Slop", 03.09.2026)

1. Referenz-URL + Prompt „inspired by this, build it, make it a little
   better" als One-Shot → bei uns: Reference-Lock aus Refero +
   `art-direction.md`, nie ohne Referenz bauen.
2. Mehrere Designs kombinieren statt eines klonen → Deckel 3 Referenzen,
   Primär + Borrow.
3. „UI sniping": einzelne Komponente gezielt holen → `magicui`/`reactbits`
   get `--out` + Werkzeugtabelle.
4. Bilder UND Videos als Referenz → shot-PNGs und Video-URLs aus
   curated/getlayers/inspora in `art-direction.md` verlinken.
5. Copy immer durch Anti-Slop → copywriting G0/G1 + `scan-ai-slop`, nie roh.

Nicht-Tun: nicht ohne gute Referenzen bauen; nicht alles von Null designen;
AI-Copy nicht roh lassen.

## Lehren aus dem Video (Griffin Wooldridge, „I Tested Claude Fable 5.1 as a UI Designer", 03.09.2026)

1. Ohne Referenzen baut das Modell generisch (Alignment-Fehler, Placeholder-
   Logo, corporate statt consumer) → Referenzen sind Pflicht.
2. Referenzen per MCP aktiv verlangen: `search screens` mit Queries wie
   „personal portfolio homepage", Treffer öffnen, dann bauen → Refero
   Styles→Screens, Mobbin für App/Flows, Queries nach Screen-Inhalt.
3. Prompt-Ende „test it and iterate until the UI is bug-free" erzwingt die
   visuelle Prüfung; „UX is great" ist keine Abnahme → `shot` + Read nach dem
   Build, `shot-sweep --base` im Kritik-Leaf, Dark-Mode und Links prüfen.
4. Screenshots nie als „copy this, replace the content" → Reference-Lock mit
   Preserve/Borrow/Reject statt 1:1-Klon.

## Exit-Codes

| Code | Bedeutung |
|---|---|
| 0 | ok |
| 1 | nichts gefunden / leeres Ergebnis / Bot-Schutz (shot) |
| 2 | Bedienfehler (unbekanntes Flag, fehlendes Argument, get nicht verfügbar) |
| 3 | `HOST_UNAVAILABLE` — Netz/Jina/Firecrawl fehlgeschlagen; Meldung nennt den Kanal |
