# Komponenten-Registries, npm, GitHub und MCP: die verbundenen Quellen

Stand 08.09.2026. Dieses Modul ist die eine Stelle, an der der Skill Komponenten **holt**. Jede Zeile unten wurde an diesem Tag live geprüft (HTTP-Status eines echten Registry-Items, `npm view`, `gh api`, MCP `tools/list`); Befunde mit Datum und Status liegen im [Korpus](corpus/component-registries-2026-09-08.json). Lizenzen, Warnhinweise und Stärken je Bibliothek stehen weiterhin in [ui-libraries.md](ui-libraries.md) und dem [Bibliothekskorpus](corpus/ui-libraries-2026-09.json).

## Drei Anbindungen, ein Projekt

| Anbindung | Was sie liefert | Wo sie konfiguriert ist |
|---|---|---|
| **shadcn-Registries** in `components.json` unter `registries` | Installiert TSX-Dateien, CSS-Vars, Keyframes und npm-Abhängigkeiten in `components/ui/` | Projekt: [assets/react-starter/components.json](../assets/react-starter/components.json); pro Projekt erweitern |
| **npm-Pakete** | Laufzeitbibliotheken mit eigener Theme-Schicht (Mantine, HeroUI, Paper Shaders, Libraries.dev) | `package.json`; Provider in `app/providers.tsx` |
| **MCP-Server** | Suche, Doku, Props und Install-Befehle für den Agenten | Claude user-scope: `21st` (HTTP), `shadcn` (stdio), `mantine` (stdio); Projekt: `.mcp.json` mit `shadcn` |

Belegter Ablauf im Starter: `npx shadcn@latest add @magicui/marquee @aceternity/bento-grid` installierte beide Dateien plus CSS-Keyframes und Pakete; `npx next build` mit `output: "export"` lieferte die Komponenten im statischen HTML.

### Konfigurierte Namespaces (geprüft, Item-JSON 200)

```json
"registries": {
  "@shadcn": "https://ui.shadcn.com/r/styles/{style}/{name}.json",
  "@magicui": "https://magicui.design/r/{name}.json",
  "@aceternity": "https://ui.aceternity.com/registry/{name}.json",
  "@kibo": "https://www.kibo-ui.com/r/{name}.json",
  "@21st": { "url": "https://21st.dev/r/{name}", "params": { "api_key": "${API_KEY_21ST}" } },
  "@beautifului": "https://www.beautifului.dev/r/{name}.json",
  "@basecn": "https://basecn.dev/r/{name}.json",
  "@8bitcn": "https://www.8bitcn.com/r/{name}.json",
  "@beui": "https://beui.dev/r/{name}.json",
  "@eldora": "https://www.eldoraui.site/r/{name}.json",
  "@fancy": "https://fancycomponents.dev/r/{name}.json",
  "@spectrum": "https://ui.spectrumhq.in/r/{name}.json",
  "@velora": "https://velora.colorlib.com/r/{name}.json",
  "@amicro": "https://raw.githubusercontent.com/Subhan-code/Amicro--Micro-transitions-/main/registry/ui/{name}.json",
  "@animateui": "https://animate-ui.com/r/{name}.json",
  "@hexta": "https://hextaui.com/r/{name}.json",
  "@lightswind": "https://lightswind.com/r/{name}.json",
  "@smoothui": "https://smoothui.dev/r/{name}.json",
  "@uilayouts": "https://www.ui-layouts.com/r/{name}.json",
  "@kokonut": "https://kokonutui.com/r/{name}.json",
  "@sera": "https://seraui.com/registry/{name}.json",
  "@reui": "https://reui.io/r/default/{name}.json",
  "@reactbits": "https://reactbits.dev/r/{name}.json",
  "@canvasui": "https://canvasui.dev/r/{name}.json",
  "@aielements": "https://registry.ai-sdk.dev/{name}.json",
  "@aicanvas": "https://aicanvas.me/r/{name}.json",
  "@mvpblocks": "https://blocks.mvp-subha.me/r/{name}.json",
  "@tailark": "https://oss.tailark.com/r/{name}.json",
  "@skiper": "https://skiper-ui.com/registry/{name}.json",
  "@watermelon": "https://registry.watermelon.sh/r/{name}.json",
  "@easyui": "https://www.easyui.pro/components-json/{name}.json"
}
```

`@shadcn` ist eingebaut; `{style}` wird bei `@shadcn` durch den Style aus `components.json` ersetzt (Starter: `new-york`, Radix). `@reui` ist auf `default` festgelegt; dort sind nur einzelne Items frei (`badge` 200, `button` und `accordion` 401), also vor dem Install `view` laufen lassen. `@skiper` (Lizenz unverifiziert) und `@aicanvas` (nur freie Items MIT, Premium proprietär) sind konfigurierbar, aber ohne geklärte Lizenz je Item nicht installierbar. `@21st` braucht `API_KEY_21ST` in der Shell; die Variante mit `headers: x-api-key` antwortete 401, `params: api_key` funktioniert. `@reactbits` verlangt Slugs der Form `SplitText-TS-TW`. `@animateui`-Slugs sind präfigiert (`components-base-accordion`, `primitives-texts-counting-number`), `@tailark`-Slugs tragen Theme-Präfixe (`dusk-`, `veil-`, `mist-`), `@skiper` nummeriert (`skiper40`), `@mvpblocks` und `@smoothui` liefern auf falsche Slugs 404 bzw. 500 (`faq-1` funktioniert bei beiden). Slugs aus dem Index `/r/registry.json` lesen, wo es einen gibt (Magic UI, Kibo, Aceternity, Animate UI, Kokonut, Smooth UI, beui, Eldora, Hexta, ReUI, React Bits, Beautiful UI, UI-Layouts, Fancy, Spectrum, Velora, basecn, Canvas UI, AI Elements, AI Canvas); mvpblocks, Watermelon, Skiper, Lightswind und Sera haben keinen Index, dort Slugs aus der Website-Doku.

Beautiful UI: der Katalogeintrag Nr. 24 und beautifului.dev (Turbo, Registry-Name `beautifui`) sind dieselbe Quelle; die Registry existiert (`/r/registry.json` 200 mit `approval-card`, `thinking-state`, `streaming-text`). Der Starter trägt acht Namespaces (`@magicui`, `@aceternity`, `@kibo`, `@21st`, `@beautifului`, `@kokonut`, `@smoothui`, `@uilayouts`). Ein Projekt ergänzt weitere aus dieser Liste, wenn ein Job sie braucht; ein Namespace ohne Verwendung bleibt draussen.

### Ohne öffentliche shadcn-Registry (Stand 08.09.2026)

| Bibliothek | Befund | Weg |
|---|---|---|
| Motion Primitives, Cult UI | Item-URL antwortet 429 (Rate-Limit) | Repo-Dateien lesen, Item lokal ablegen; später erneut probieren |
| Jolly UI | 402 = Vercel `DEPLOYMENT_DISABLED` (Deployment abgeschaltet) | Item-JSON aus dem GitHub-Repo (raw) laden; Projekt seit 01/2025 ohne Push |
| Tremor | `tremor.so/r` 404 | npm `@tremor/react` 3.18.7 oder Tremor-Raw-Copy-Paste (Apache-2.0) |
| Untitled UI React, AICSS, Kinetics, 404-Animations, Circle Loaders, MicroKit, Transitions.dev | keine Registry; Copy-Paste | Untitled UI React (MIT, React Aria, Tailwind v4) per Installationsanleitung kopieren; Transitions.dev ohne Lizenz nicht kopieren |
| daisyUI, Flowbite, Preline, FlyonUI, HyperUI, Float UI, Meraki, Syntax UI, Kimia, Ninja, NexUI, Open Source UI, Headless UI, COSUI | HTML-/Tailwind-Klassen oder eigene Runtime, keine shadcn-Registry | Im React-Stack nur als Markup-Vorlage; Headless UI per npm `@headlessui/react` 2.2.10, sonst nachrangig gegenüber Radix/Base UI |
| Beste UI | `/r/<slug>` 403 ohne Login | Pro-Gating; nur mit Lizenz |

### npm-Bibliotheken mit eigener Theme-Schicht

| Paket | Version (08.09.2026) | Primitive | Einbau | Hinweis |
|---|---|---|---|---|
| `@mantine/core`, `@mantine/hooks` | 9.6.0 | eigene | `MantineProvider` in `providers.tsx` mit `"use client"`, `@mantine/core/styles.css` einmal importieren, PostCSS-Preset | Zweites Styling-System neben Tailwind; nur, wenn eine Mantine-Familie (Dates, Charts, Forms) den Job löst. Ohne `"use client"` bricht der Prerender. |
| `@heroui/react` | 3.2.4 | React Aria Components | Tailwind v4, Provider laut Doku | Repo Apache-2.0, npm-Metadaten MIT; Apache-2.0 zitieren |
| `@paper-design/shaders-react` | 0.0.80 | WebGL | Client-Komponente, Reduced-Motion-Fallback | GPU-Kosten; API pre-1.0 |
| `border-beam`, `thinking-orbs`, `liquid-gooey`, `metal-fx`, `img-fx` | je npm | keine | Einzelpakete (Libraries.dev, MIT) | Effekte, keine Grundbausteine |
| `motion` | 13.2.0 | keine | `motion/react` in Client-Komponenten | Regeln in [motion-native.md](motion-native.md) |
| `radix-ui` / `@base-ui/react` | 1.6.7 / 1.8.0 | Primitive | kommen über shadcn-Items | eine Primitive-Familie pro Komponentenjob |
| `ai-elements` (CLI) | 1.9.0 | shadcn | `npx ai-elements@latest add <name>` oder `@aielements` | Apache-2.0; für Assistenten-UI, an das AI SDK gekoppelt |

### MCP-Server

| Server | Transport | Tools (aus `tools/list`) | Zweck im Ablauf |
|---|---|---|---|
| `21st` | HTTP `https://21st.dev/api/mcp`, Header `x-api-key` | `search`, `get_inspiration` (Design Context), `get_component`, `generate`, `iterate_generation`, `search_logo`, Bookmarks, Teams | Katalog mit 12 000+ Items; Tier „paid“ ohne Limits (geprüft) |
| `shadcn` | stdio `npx -y shadcn@latest mcp`, braucht `components.json` im cwd | `get_project_registries`, `list_items_in_registries`, `search_items_in_registries`, `view_items_in_registries`, `get_item_examples_from_registries`, `get_add_command_for_items`, `get_audit_checklist` | Alle konfigurierten Namespaces durchsuchen und Install-Befehle erzeugen |
| `mantine` | stdio `npx -y @mantine/mcp-server@latest` (9.6.0) | `list_items`, `get_item_doc`, `get_item_props`, `search_docs` | Mantine-Doku und Props ohne Browser |
| HeroUI | stdio `npx -y @heroui/react-mcp@latest` (1.1.2), Server-Card `heroui.com/.well-known/mcp/server-card.json` | read-only Doku, Komponenten-Metadaten, Theme-Variablen | `claude mcp add heroui-react -- npx -y @heroui/react-mcp@latest` nur, wenn HeroUI im Projekt ist |
| AI Canvas, Beste UI | beworben; nicht registriert | – | AI Canvas Index `/r/registry.json` 200; Beste 403 ohne Lizenz |

`21st`, `mantine` und `shadcn` sind im Claude-User-Scope registriert (`claude mcp list`: Connected). Der Starter trägt zusätzlich `.mcp.json` mit denselben shadcn-Args (`npx -y shadcn@latest mcp`), damit das Projekt die Verbindung portabel deklariert; der Server liest `components.json` aus dem jeweiligen cwd. Für Codex liegt `mcp_servers.21st` in `config.toml`, dort mit `enabled = false`; vor einem Codex-Lauf einschalten oder den 21st-CLI-Weg nehmen.

### 21st CLI und Design Context

```sh
npx @21st-dev/cli@latest init --design-context          # erzeugt .21st/design.json und .21st/DESIGN.md aus globals.css und components/ui
npx @21st-dev/cli@latest search "faq accordion" --type c --limit 5 --context auto --json
npx @21st-dev/cli@latest get <id>                         # Code und Demo
npx @21st-dev/cli@latest logo <marke> --json              # svgl, frei
```

`--context auto` liest `.21st/design.json`; ohne die Datei bricht die Suche mit einem Hinweis ab. Nach Tokenänderungen `init --design-context --refresh`. Die Datei darf ins Repo: sie enthält Tokens und die Komponentenliste. Schlüssel stehen nur in der Umgebung. Auth: `TWENTYFIRST_TOKEN` oder `API_KEY_21ST`; `whoami` bestätigt die Session. Publish-Befehle (`publish-theme`, Registry-Publish) sind aussenwirksam und laufen nur auf ausdrücklichen Auftrag.

## Suchreihenfolge je Komponentenjob

1. **Job in Worten:** Zweck, Inhalt, Zustände, mobile Form, Barrierefreiheit. Ein Job, eine Implementierung.
2. **Basis zuerst:** Formular, Dialog, Menü, Tabs, Accordion, Tabelle → `@shadcn` (Radix oder Base UI je nach Style). Diese Bausteine werden nicht aus Marketing-Registries geholt.
3. **Marketing- und Effektblöcke** (höchstens drei Kandidaten je Job): Hero, Bento, Marquee, Testimonials, Preise, Logo-Wolke, Zahlen → `@magicui`, `@aceternity`, `@kokonut`, `@smoothui`, `@uilayouts`, `@eldora`, `@spectrum`, `@velora`, `@fancy`, `@animateui`; dann 21st `search`/`get_inspiration` mit Design Context.
4. **Spezialjobs:** Upload, Bildvergleich, Crop → `@kibo`; Assistenten-UI → `@beautifului`, `@aielements`; Charts → Tremor (npm) oder Mantine Charts; Datum, Formulare mit vielen Feldern → Mantine oder React Aria über HeroUI.
5. **Lesen vor Installieren:** `npx shadcn@latest view @ns/item` oder `add --dry-run`; Dateien, `dependencies`, `registryDependencies`, `cssVars`, Next-/Router-Annahmen, Lizenz aus [ui-libraries.md](ui-libraries.md). **Ungeklärte oder unverifizierte Lizenz = kein Install**; die Entscheidung steht als Zeile in der Werkzeugtabelle. Commons-Clause-Quellen (React Bits, Animate UI, Canvas UI) dürfen in Kundenprojekten laufen, aber nicht als Teil einer weiterverteilten Bibliothek.
6. **Installieren und anpassen:** `npx shadcn@latest add @ns/item -y`; danach `git diff package.json` lesen und Überflüssiges entfernen (belegt: Aceternity zog `cn` 0.2.6 mit). Tokens auf `DESIGN.md` abbilden, Demo-Texte durch echte Inhalte ersetzen, `"use client"` prüfen.
7. **Nachweis:** Komponentenabschnitt in `DESIGN.md` mit Namespace/Item, Version oder Commit, Lizenz, Datei, Server/Client, entfernten Abhängigkeiten, Requests und Zustandsbelegen. Kein Kandidat passend → Eigenbau mit dieser Begründung.

Ein Suchlauf pro Job. Wiederholungen desselben Jobs, Text-, Abstands- oder Tokenkorrekturen lösen keine neue Registry-Abfrage aus.

## Neue Quellen aus der Liste vom 08.09.2026

Raphael lieferte 31 weitere Adressen; alle wurden live gelesen ([Rohbefunde](corpus/new-sources-2026-09-08.json)). Ergebnis:

- **Aufgenommen als Registry:** Canvas UI (`@canvasui`, MIT + Commons Clause), AI Elements (`@aielements`, Apache-2.0), AI Canvas (`@aicanvas`, freie Items MIT, Premium proprietär).
- **Aufgenommen als npm:** Mantine 9.6 mit MCP, HeroUI 3.2 mit MCP, Paper Shaders, Libraries.dev-Pakete (`thinking-orbs` u. a.).
- **Copy-Paste mit Lizenz:** Untitled UI React (MIT, kein npm-Paket), Kinetics (MIT laut Seite, LICENSE-Datei fehlt im Repo), 404-Animations (MIT), Circle Loaders (CC0), MicroKit (MIT), AICSS (MIT). Beautiful UI läuft über `@beautifului` und seine Registry, nicht über einen zweiten Copy-Paste-Eintrag.
- **Nur Referenz, nicht abfragen:** component.gallery (robots.txt sperrt ClaudeBot, `ai-train=no`), Umanmade, VibeIndex, appshot.gallery.
- **Nicht aufgenommen:** transitions.dev (keine Lizenz, Pro-Gating), FinderGit, superfile, Kickresume, Superset, kitty, CodeShots (keine UI-Quellen); libraries.dev-Sammelseite nur über ihre fünf Pakete.
- **Duplikate:** heroui, magic ui, react bits, aceternity, amicro standen bereits im Katalog.

## Pflege

Diese Datei und der Korpus tragen ein Prüfdatum. Vor einem Bau, der älter als vier Wochen zurückliegt, die betroffenen Namespaces mit einem `shadcn search` neu prüfen und den Korpus-Eintrag aktualisieren. Ein 429 ist ein Rate-Limit, kein Wegfall; ein 404 auf einem dokumentierten Muster ist ein Wegfall, bis ein neues Muster belegt ist.
