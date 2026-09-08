# Sonderfälle — Live-Registry-Belege

Geprüft: 2026-09-08, curl Timeout 15s. `ok` = JSON mit Feldern `name` und `files`.

## 1. mvpblocks

Muster: `https://blocks.mvp-subha.me/r/{name}.json`

| URL | HTTP | Item? |
|---|---|---|
| `https://blocks.mvp-subha.me/r/pricing-1.json` | 404 | nein |
| `https://blocks.mvp-subha.me/r/pricing-2.json` | 200 | ja, `name=pricing-2`, `files=1`, `type=registry:block` |
| `https://blocks.mvp-subha.me/r/faq-1.json` | 200 | ja, `name=faq-1`, `files=1` |
| `https://mvp-subha.me/r/pricing-2.json` | 404 | falsche Domain |
| `https://blocks.mvp-subha.me/r/registry.json` | 404 | kein Index |

`pricing-1` existiert nicht. Funktionierendes Item-Muster ist `/r/{slug}.json` mit den tatsächlichen Slugs (`pricing-2`, `faq-1`, …), Host `blocks.mvp-subha.me`. CLI-Alternative: `npx mvpblocks add <name>` (npm `mvpblocks` 2.1.13).

## 2. Animate UI

Muster: `https://animate-ui.com/r/{name}.json`

| URL | HTTP | Item? |
|---|---|---|
| `https://animate-ui.com/r/counter.json` | 404 | nein — Slug `counter` gibt es nicht |
| `https://animate-ui.com/r/primitives-animate-counter.json` | 404 | nein |
| `https://animate-ui.com/r/components-base-accordion.json` | 200 | ja, `name=components-base-accordion`, `files=1`, `type=registry:ui` |
| `https://animate-ui.com/r/components-radix-accordion.json` | 200 | ja |
| `https://animate-ui.com/r/primitives-texts-counting-number.json` | 200 | ja, `name=primitives-texts-counting-number`, `files=1` |
| `https://animate-ui.com/r/registry.json` | 200 | Index, `name=Animate UI`, 580 items |

Namen sind präfigiert (`components-base-…`, `components-radix-…`, `primitives-texts-…`). Der Zähler heisst `primitives-texts-counting-number`, nicht `counter`. Index zuerst lesen.

## 3. Kokonut UI

Muster: `https://kokonutui.com/r/{name}.json`

| URL | HTTP | Item? |
|---|---|---|
| `https://kokonutui.com/r/card-01.json` | 404 | nein — Slug `card-01` gibt es nicht |
| `https://kokonutui.com/r/card-flip.json` | 200 | ja, `name=card-flip`, `files=1`, `type=registry:component` |
| `https://kokonutui.com/r/card-stack.json` | 200 | ja, `name=card-stack`, `files=1` |
| `https://kokonutui.com/r/registry.json` | 200 | Index, `name=kokonut-ui`, 51 items |

Karten-Slugs im Index u. a. `card-flip`, `card-stack`, `mouse-effect-card`, `apple-activity-card`, `tweet-card`, `liquid-glass-card`, `spotlight-cards`. Kein `card-01`. Namespace laut Produkt: `@kokonutui/{name}`.

## 4. Tailark

Muster: `https://oss.tailark.com/r/{name}.json` — Domain `oss.tailark.com` ist live, nicht `tailark.com/r/…`.

| URL | HTTP | Item? |
|---|---|---|
| `https://oss.tailark.com/r/dusk-testimonials-1.json` | 200 | ja, `name=dusk-testimonials-1`, `files=1`, `type=registry:block` |
| `https://oss.tailark.com/r/dusk-card.json` | 200 | ja, `name=dusk-card`, `files=1`, `type=registry:ui` |
| `https://oss.tailark.com/r/card.json` | 404 | generischer Slug existiert nicht |
| `https://tailark.com/r/dusk-testimonials-1.json` | 404 | Marketing-Host, keine Registry |
| `https://www.tailark.com/r/dusk-testimonials-1.json` | DNS-Fehler (Host unbekannt) | |
| `https://oss.tailark.com/r/registry.json` | 200 | Index, `name=Tailark Base`, 259 items |

Slugs tragen Theme-Präfix (`dusk-`, `veil-`, `mist-`). `card.json` 404 ist der falsche Name, nicht die Domain.

## 5. Smooth UI

Muster: `https://smoothui.dev/r/{name}.json`

| URL | HTTP | Item? |
|---|---|---|
| `https://smoothui.dev/r/accordion.json` | 500 | Body `{"error":"Failed to get package","details":{"digest":"NEXT_HTTP_ERROR_FALLBACK;404"}}` — intern 404, als 500 ausgeliefert |
| `https://smoothui.dev/r/faq-1.json` | 200 | ja, `name=faq-1`, `files=1`, `type=registry:block` |
| `https://smoothui.dev/r/basic-accordion.json` | 200 | ja, `name=basic-accordion`, `files=1`, `type=registry:ui` |
| `https://smoothui.dev/r/registry.json` | 200 | Index, `name=SmoothUI Registry`, 178 items |

Es gibt kein Item `accordion`. Accordion-Slug: `basic-accordion`. FAQ-Blöcke: `faq-1` … `faq-4`. CLI-Alternative: `npx smoothui-cli` (npm `smoothui-cli` 1.1.2).

## 6. Skiper UI

Zwei funktionierende Item-Muster, gleicher Inhalt:

- `https://skiper-ui.com/registry/{name}.json` (dokumentiertes Muster)
- `https://skiper-ui.com/r/{name}.json` (Alias)

| URL | HTTP | Item? |
|---|---|---|
| `https://skiper-ui.com/registry/skiper40.json` | 200 | ja, `name=skiper40`, `files=1`, `type=registry:ui` |
| `https://skiper-ui.com/r/skiper40.json` | 200 | ja, `name=skiper40`, `files=1` |
| `https://skiper-ui.com/registry/skiper3.json` | 200 | ja, `name=skiper3`, `files=1` |
| `https://skiper-ui.com/registry/registry.json` | 200 | Katalog-Item `name=skiper-ui` mit `items[]` (kein shadcn-`registry.json`-Index-Schema) |
| `https://skiper-ui.com/r/registry.json` | 404 | |

Komponenten heissen `skiper3`, `skiper40`, … Namespace `@skiper-ui`. Öffentliches GitHub-Vollrepo ist nicht das Produkt-Repo; Website-Titel „Un-common Components for shadcn/ui | Skiper UI“.

## 7. Watermelon UI

`registry.watermelon.sh` ist nicht tot. Item-Muster: `https://registry.watermelon.sh/r/{name}.json`

| URL | HTTP | Item? |
|---|---|---|
| `https://registry.watermelon.sh/r/accordion-1.json` | 200 | ja, `name=accordion-1`, `files=1`, `type=registry:component` |
| `https://registry.watermelon.sh/r/card-split-accordian.json` | 200 | ja (Schreibfehler `accordian` ist der echte Slug) |
| `https://registry.watermelon.sh/` | 200 HTML | Docs-Frontend, kein JSON-Index |
| `https://registry.watermelon.sh/r/registry.json` | 404 | kein Index |
| `https://ui.watermelon.sh/r/accordion-1.json` | 200 | ja, gleiche Komponente — Alias auf der UI-Domain |

404 entsteht bei falschem Slug oder beim Index, nicht bei der Domain. Funktionierende Alternative zur UI-Site: Host `registry.watermelon.sh`.

## 8. Tremor

Keine öffentliche shadcn-Registry.

| URL | HTTP |
|---|---|
| `https://tremor.so/r/card.json` | 404 (redirect `www.tremor.so`) |
| `https://www.tremor.so/r/card.json` | 404 |
| `https://tremor.so/r/registry.json` | 404 |
| `https://raw.tremor.so/r/card.json` | 404 (landet auf www) |

Weg = Copy-Paste Tremor Raw (`https://tremor.so/docs/getting-started/installation`, Quellen `src/components/…`) oder npm `@tremor/react` 3.18.7 (separates Setup, nicht mit Raw mischen). CLI `@tremor/cli` 1.2.0 existiert, ist kein shadcn-Registry-Host.

## 9. Jolly UI — 402 ist kein Paywall der Bibliothek

Live-Host `jollyui.dev` antwortet 402 mit Klartext:

```
Payment required
DEPLOYMENT_DISABLED
fra1::…
```

Das ist Vercel: Deployment abgeschaltet (Plan/Rechnung), keine Komponenten-Paywall. Die Registry-JSON liegt weiter im öffentlichen Repo:

- `https://raw.githubusercontent.com/jolbol1/jolly-ui/main/public/registry/styles/default/textfield.json` — HTTP 200, `name=textfield`, `files=1`, `type=components:ui`

Muster, sobald der Host wieder läuft: `https://jollyui.dev/registry/styles/{style}/{name}.json`. Aktuell: GitHub-Raw oder eigenes Hosting der Repo-Dateien. Kein npm-UI-Paket (`jolly-ui` E404).

## 10. beui, easyui, eldora

Alle drei haben eine öffentliche shadcn-Registry.

**beui** — `https://beui.dev/r/{slug}.json`

- `https://beui.dev/r/bouncy-accordion.json` HTTP 200, `name=bouncy-accordion`, `files=3`, `type=registry:component`
- Index `https://beui.dev/r/registry.json` HTTP 200, 115 items, `name=beui`
- Namespace `@beui/{slug}`

**easyui** — `https://easyui.pro/components-json/{name}.json` (nicht `/r/`)

- `https://easyui.pro/components-json/feature-card.json` HTTP 200 (redirect www), `name=feature-card`, `files=1`, `type=registry:ui`
- `https://easyui.pro/components-json/registry.json` HTTP 404 — kein Index
- Namespace unverifiziert

**eldora** — `https://eldoraui.site/r/{name}.json` (www-Host ebenfalls)

- `https://www.eldoraui.site/r/logo-cloud-01.json` HTTP 200, `name=logo-cloud-01`, `files=2`, `type=registry:block`
- Index `https://www.eldoraui.site/r/registry.json` HTTP 200, 115 items, `name=eldoraui`
- Namespace `@eldoraui/{name}`

## 11. HeroUI MCP

Quelle: `https://heroui.com/docs/react/getting-started/mcp-server` → 308 → `https://heroui.com/en/docs/react/getting-started/mcp-server` HTTP 200, Titel „MCP Server | HeroUI“.

Zitat: „The MCP server currently supports @heroui/react v3 only and stdio transport. Published at @heroui/react-mcp on npm.“

Start-Command (Claude Code, aus derselben Seite):

```
claude mcp add heroui-react -- npx -y @heroui/react-mcp@latest
```

stdio-Config (Cursor / `.mcp.json`):

```json
{
  "mcpServers": {
    "heroui-react": {
      "command": "npx",
      "args": ["-y", "@heroui/react-mcp@latest"]
    }
  }
}
```

npm `@heroui/react-mcp` 1.1.2, bin `heroui-react-mcp`. Nicht `@heroui/mcp` (alpha, anderes Paket) und nicht `heroui-mcp` (fremdes 1.0.0).

## 12. Mantine MCP

npm `@mantine/mcp-server` 9.6.0, description „MCP server for Mantine documentation“, bin `mcp-server` → `bin/mcp-server.cjs`. README:

```
npx @mantine/mcp-server
```

stdio. Daten-URL Default `https://mantine.dev/mcp` (HTTP 200). Paket-Homepage `https://mantine.dev`, Repo `mantinedev/mantine` Verzeichnis `packages/@mantine/mcp-server`. Nicht `@mantine/mcp` (E404). Das Community-Paket `mantine-mcp` 1.0.2 ist ein anderes Binary.
