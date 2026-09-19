# Komponenten-Ideation & Library-Workflow

Der häufigste Qualitäts-Killer: faule Komponenten. Ein Button mit Border, Text und
Pfeil ist keine Komponente, sondern ein Default. Diese Datei erzwingt die Ideation-
Phase und den Library-First-Workflow.

Inhalt: 1 Die Ideation-Pflicht · 2 Ideation-Fragen pro Komponente · 3 Library-First
(21st.dev & Co.) · 4 Der Komponenten-Katalog · 5 Font-Setup (Adobe Fonts) ·
6 Copy-or-Prompt-Pattern

---

## 1. Die Ideation-Pflicht (vor jeder Kernkomponente)

Bevor eine Kernkomponente (Button, Nav, Hero, Card, Pricing-Table, Funnel-Step,
Testimonial, Footer) gebaut wird, steht ein kurzes Brainstorming: schriftlich, in der
DESIGN.md unter "Komponenten-Entscheidungen":

1. **Idee benennen**: Was ist die konkrete gestalterische Idee? ("Button mit Border +
Pfeil" ist KEINE Idee.)
2. **Eine Stufe weiter denken**: Was macht die Komponente auf dieser Seite besonders?
   Hover-Physik? Ein Detail (Icon-Morph, Border-Beam, Fill-Sweep)? Eine unerwartete Form?
3. **Referenz suchen**: Gibt es bei 21st.dev / Mobbin / Refero / kage.design eine
   Komponente, die besser ist als das, was ich aus dem Kopf bauen würde?
4. **Entscheidung + Begründung in einem Satz** festhalten.

Faustregel: Wenn die Komponente in jeder beliebigen anderen Website identisch
funktionieren würde, ist sie noch nicht fertig gedacht.

## 2. Ideation-Fragen (Beispiele, nicht erschöpfend)

**Button**: Magnetischer Hover? Fill-Sweep aus der Akzentfarbe? Icon, das sich beim
Hover verwandelt (Pfeil → Arrow-45°)? Border-Beam (rotierender conic-gradient)?
Squash-Feedback bei :active? Zweizeilig mit Microcopy darunter ("100 % kostenlos")?
**Nav**: Backdrop-Blur beim Scroll? Schrumpft sie? Pill-Form floating? Mega-Menu mit
Bildkarten? Aktiver Link mit animiertem Underline-Indicator?
**Hero**: Zeilen-Masken-Reveal der H1? Video/WebGL/3D-Asset? Rotierende Wort-Botschaften?
**Card**: Spotlight-Effekt folgt dem Cursor? 3D-Tilt mit Glanz-Layer? Image-Zoom im
Container? Concentric Radius statt Standard?
**Pricing/Testimonial/FAQ**: Welche konkrete Interaktion macht sie besser als die
Standard-Version? (Vergleichs-Toggle, Video-Quote, Accordion mit smooth height)
**Formular/Funnel**: Kacheln statt Inputs, Auto-Advance, Fortschritts-Animation,
Floating Labels (`:placeholder-shown`), Success-Choreografie?

Techniken-Vorrat: siehe effekte.md (Hover-/Micro-Interaktionen, Text-Effekte, Glass).
Bewährte Rezepte: Kinetics (153 Spring-Interaktionen), texteffects.colorion.co (81),
csscursors.colorion.co (36), animatedbuttons.colorion.co (99): alle MIT, Copy-Paste.

## 3. Library-First: 21st.dev & Registry-Workflow (Pflicht vor dem Selbstbauen)

**Regel: Erst suchen, dann bauen.** Bevor eine nicht-triviale Komponente von Hand
geschrieben wird, werden die Registries durchsucht. Gefundene Komponenten werden
installiert und an die DESIGN.md-Tokens angepasst: nicht blind übernommen.

### 21st.dev (Hauptquelle)

Größte kuratierte React-Komponenten-Registry (Tailwind + Radix + shadcn-Stack,
12.000+ Komponenten, Blocks, Themes). Drei Zugänge:

- **MCP**: Endpoint `https://21st.dev/api/mcp` (Tools: `search`, `get_component`,
  `get_theme`, `generate`). Metadaten-Suche kostenlos; API-Key via
  21st.dev/settings/api-keys, Env-Var `API_KEY_21ST`.
- **CLI**: `npx @21st-dev/cli add @<scope>/<component>?api_key=$API_KEY_21ST`
- **Copy-Paste / "Copy prompt"** auf der Website: Prompt in den Coding-Agent pasten.

Prompt-Konvention: `/ui <beschreibung>` (Komponente bauen/verfeinern), `/21st` oder
"get inspiration from 21st.dev" (Inspirations-Komponenten).

### shadcn-Registry-Mechanismus (universeller Standard)

Fast alle Libraries installieren per einem Kommando-Muster:

```bash
npx shadcn@latest add "<registry-url>/<komponente>.json"
```

Damit nutzbar: uiable (~800 Komponenten, React 19/Tailwind v4), ObsidianUI
(`https://www.obsidianui.dev/r/<name>.json`: Effekt-Komponenten: spotlight-card,
book-flip, magnetic-image-trail; eigener MCP via `npm run mcp`), Magic UI, Aceternity,
cult-ui, react-bits.

### Ablauf pro Komponenten-Suche

1. Kategorie bestimmen (Button / Hero / Pricing / Testimonial / Nav / Footer / Effekt).
2. 21st.dev `search` (+ Website) → Kandidaten-Live-Preview prüfen.
3. Nichts Passendes → uiable, Magic UI, Aceternity, react-bits, kage.design-Prompts.
4. Immer noch nichts → selbst bauen, aber mit Ideation (Abschnitt 2) und Techniken
   aus effekte.md.
5. Übernommene Komponente an Tokens anpassen (Farben, Radius, Font, Motion-Kurven aus
   DESIGN.md): niemals fremde Defaults mitnehmen.

## 4. Der Komponenten-Katalog (immer prüfen)

| Quelle | Wofür | Zugang |
|---|---|---|
| **21st.dev** | Alles, Hauptquelle | MCP/CLI/Web |
| **uiable.com** | ~800 Standard-Blocks, Forms | shadcn-Registry/Copy |
| **magicui.design** | 150+ animierte Marketing-Komponenten, Backgrounds, Text-Animationen | Registry/Copy |
| **ui.aceternity.com** | 3D-Cards, Beams, Spotlight, Dark-Mode-Effekte | Registry/Copy (Pro $199) |
| **reactbits.dev** | Effekte: Scramble, Cursor, Backgrounds, Text | Copy |
| **cult-ui.com** | Animierte Komponenten/Templates | Registry |
| **obsidianui.dev** | Cursor-Effekte, Book-Flip, Magnetic-Trail, Landing-Templates | shadcn-Registry + MCP |
| **originui / reui.io** | Große freie shadcn-Sammlungen, Data-Grid/Kanban | Registry |
| **kage.design** | 1.442 Komponenten echter Produkte → fertige Prompts | Copy-Prompt |
| **vibeprompts.dev** | ~280 Prompts pro UI-Section (Auth, Pricing, Onboarding) | Copy-Prompt |
| **getlayers.ai** | 175+ Templates/Sections als Prompt-Kontext, MCP | Copy-Prompt/MCP |
| **Colorion/ckissi** | Pure-CSS Snippets: Kinetics, Texteffekte, Cursor, Toggles, Buttons, 404s, Loader | Copy (MIT) |
| **bundui/shadcn-admin-free**, satnaing/shadcn-admin, Kiranism-Starter | Dashboard-Startpunkte | Clone |
| **mantine.dev** | Voll-Library mit bestem MCP (`@mantine/mcp-server`), llms.txt | npm + MCP |
| **liquid-glass (samasante)** | Echte Glas-Refraction cross-browser | npm |
| Etablierte Basis | shadcn/ui, Radix, Motion, GSAP, Lenis, three.js/r3f, lucide, next-themes, TanStack, Recharts | npm |

Mantine-Muster merken: version-locked MCP + llms.txt: so wird Doku agent-tauglich.

## 5. Font-Setup: Adobe Fonts (Typekit) als Primärquelle

Adobe Fonts ist die Font-Quelle des Workflows (Premium-Qualität statt
Google-Fonts-Einerlei):

1. **Web-Projekt (Kit) anlegen** auf fonts.adobe.com → Kit-ID erhalten.
2. **Einbinden** im Root-Layout/Head:
   ```html
   <link rel="stylesheet" href="https://use.typekit.net/<KIT-ID>.css">
   ```
   Alternativ JS-Embed; bei Next.js/React: Link im `<head>` des Root-Layouts.
3. **Nutzung**: `font-family: <family-name>, <fallback-stack>;` exakt wie im Kit
   angegeben. In Tailwind v4 als `@theme`-Token: `--font-display: "family-name", sans-serif;`
4. **Disziplin bleibt**: max 2–3 Familien, nur genutzte Weights im Kit aktivieren
   (Performance), metrik-kompatible Fallbacks definieren, `font-display: swap`.
5. Fallback wenn kein Adobe-Zugang: Fontshare, Google Fonts (Geist, Outfit, Cabinet
   Grotesk via CDN-Speciallinks): niemals System-Default stehen lassen.
6. Typo-Regeln aus design-doktrin.md gelten unverändert (kein LLM-Default-Reflex,
   Serif-Disziplin, Floors).

## 6. Copy-or-Prompt-Pattern (Ressourcen richtig konsumieren)

Moderne Quellen liefern drei Artefakte: Live-Demo + Snippet + LLM-Prompt. Nutze sie so:
- **Snippet passt** → installieren/kopieren, an Tokens anpassen.
- **Nur Prompt vorhanden** (kage, vibeprompts, GetLayers, 21st "Copy prompt") → Prompt
  als Layout-Ziel übernehmen und mit eigenen Tokens/Effekten ausführen.
- **Nur Inspiration** (Mobbin, Refero, Awwwards) → Idee extrahieren (was genau macht
  es gut?), nicht die Oberfläche kopieren.
