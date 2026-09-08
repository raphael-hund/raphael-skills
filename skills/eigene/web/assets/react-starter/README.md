# React-Starter für den Web-Skill (geprüft 08.09.2026)

Kopie dieses Ordners ist der Ausgangspunkt jedes neuen Website-Projekts. Geprüft am 08.09.2026 mit Next.js 16.3.4, React 19.2.8, Tailwind 4, shadcn CLI 4.21.0: `npm install`, `npx next build` mit `output: "export"`, drei Routen als `out/<route>/index.html` mit Inhalt, Sitemap und robots.

## Enthalten

- `components.json` mit Namespace-Registries `@magicui`, `@aceternity`, `@kibo`, `@21st` (Schlüssel aus `API_KEY_21ST`), `@beautifului`, `@kokonut`, `@smoothui`, `@uilayouts`. Weitere Namespaces aus [component-registries.md](../../references/component-registries.md) ergänzen.
- `.mcp.json` mit dem shadcn-MCP für dieses Projekt (Tools: `search_items_in_registries`, `view_items_in_registries`, `get_add_command_for_items`, `get_item_examples_from_registries`, `get_audit_checklist`).
- `.21st/design.json`: 21st Design Context, erzeugt aus dem Starter. Nach jeder Tokenänderung `npx @21st-dev/cli init --design-context --refresh` laufen lassen. Bekannt: der Generator liest `--background` aus dem `.dark`-Block (oklch 0.145) statt aus `:root`; vor `search --context auto` die Farbwerte im JSON gegen `globals.css` prüfen und bei Bedarf von Hand korrigieren.
- `lib/routes.ts` als einzige Routenquelle für Navigation, Sitemap und Seitenkarte.
- `components/site/contact-form.tsx`: Formular mit Endpoint aus `NEXT_PUBLIC_FORM_ENDPOINT`; ohne Endpoint zeigt es den ehrlichen Hinweis statt Fake-Erfolg.
- `components/ui/`: `button`, `badge` (shadcn `new-york`, Radix), `marquee` (Magic UI, MIT). Alles andere per Registry holen. Style bleibt `new-york` mit Radix; kein Wechsel auf `base-nova`, sonst laufen zwei Primitive-Familien.
- `app/layout.tsx` bricht den Build ab, wenn `SITE_URL` fehlt; Canonicals, OpenGraph-Grundgerüst und Sitemap hängen daran. Startseite setzt `title.absolute` mit Marke.

## Start

```sh
cp -r <skill>/assets/react-starter <projekt> && cd <projekt>
cp .env.example .env.local   # SITE_URL, NEXT_PUBLIC_FORM_ENDPOINT, API_KEY_21ST setzen
npm install
npx shadcn@latest search @magicui -q hero
npx shadcn@latest add @magicui/<name> --dry-run
npx next build && ls out
```

`API_KEY_21ST` in der Shell exportieren, bevor `@21st/...` installiert wird; die shadcn-CLI ersetzt `${API_KEY_21ST}` aus der Umgebung. Belegt: mit `headers: x-api-key` antwortet 21st 401, mit `params: api_key` funktioniert der Abruf.

## Bekannte Stolpersteine

- `main` trägt `w-full`: als Flex-Kind mit `mx-auto` wird es sonst so breit wie sein breitester Inhalt (Marquee) und erzeugt auf 390 px horizontales Scrollen (craft-check M13 hat das am 08.09.2026 gemeldet).
- Registry-Animationen (Marquee) respektieren Reduced Motion nicht von selbst; `globals.css` schaltet `.animate-marquee` unter `prefers-reduced-motion` ab. Für jedes weitere animierte Item dieselbe Regel ergänzen.
- Geist ist die Schrift von create-next-app, keine Markenentscheidung; `DESIGN.md` legt die Schrift fest, `craft-check` warnt sonst (T1).

- Der Starter wurde nach den Kritiker-Befunden vom 08.09.2026 neu gebaut: Font-Variablen zeigen auf `--font-geist-sans`, `@base-ui/react` und `lucide-react` sind entfernt, `.mcp.json` nutzt dieselben Args wie der User-Scope (`npx -y shadcn@latest mcp`), `.env.example` ist nicht mehr ignoriert.

- Mantine-Komponenten brauchen `"use client"` in der Seite oder einer Hülle; sonst bricht der Prerender mit `Element type is invalid`.
- Registry-Items bringen Pakete mit (`@tabler/icons-react`, `cn`, `motion`). Nach jedem `add` die `package.json`-Diff lesen und Überflüssiges entfernen.
- `output: "export"` liefert keine Server Actions; Formulare gehen an einen externen Endpoint.
- `next/font` Subsets: `latin` plus `latin-ext` behalten, sonst fehlen Umlaute in manchen Schriften.
