# Inspirations-Quellen — Tiefzugriff über `scripts/inspiration.mjs`

**Wofür:** Fünf Quellen maschinenlesbar holen, ohne Katalog-Dump und ohne Login.
Einzelzugriff bleibt `resource-access.mjs show`/`open`. Dieses Skript ist der
Tiefzugriff (Suche, Style-Seite, Registry-JSON, eine Komponente). CLI:
`node scripts/inspiration.mjs --help`. Unbekanntes Flag = Exit 2. `--json`
überall. Timeout 45 s, User-Agent `raphael-web-inspiration/1.0`. Kein Cache,
kein Cookie, kein Schreiben außer `--out`.

Lesen über `https://r.jina.ai/<url>`; Fallback `firecrawl scrape <url> -f markdown --only-main-content`.

## Deckel

Max. **3 Referenzen** pro Auftrag. Max. **1 Komponente pro Bedarf**. Danach
Zeile in der Werkzeugtabelle (`art-direction.md`) plus Router-Anker
`#sections` / `#motion` / `#background`, wie `tool-usecase-router.md` verlangt.

## Lizenz

Refero, Navbar Gallery, 21st = **Inspiration/Analyse** (Muster, Tokens,
Struktur). Keine Layout- oder Asset-Kopie. Magic UI (MIT) und React Bits
(MIT, Registry) = **eine** Komponente übernehmbar, danach Vendor-Pfad plus
Werkzeugtabelle. Dieselbe Regel steht in `--help`.

## 1. Refero Styles — Loop `art-direction`

**Wofür:** Design-DNA-Tokens als Vergleich zur eigenen `art-direction.md`.
Nie 1:1 übernehmen.

```bash
node scripts/inspiration.mjs refero search "saas dark" --limit 10
node scripts/inspiration.mjs refero get <styleId|url> [--out DESIGN.md]
```

Suche: `https://styles.refero.design/?q=<query>` → `{title, url, styleId}`;
Links `/style/<uuid>`, Titel aus `### <Titel>`. Get: Seite
`https://styles.refero.design/style/<uuid>` — Jina liefert den DESIGN.md-Block
in einem Fence; Fence-Inhalt, sonst Volltext. Ohne `--out` stdout.

**Ziehen:** Farbe, Typo, Radius, Dichte, Motion-Halt — gegen die eigene DNA
halten, nicht kopieren.

## 2. Navbar Gallery — Loop `art-direction` / Sitemap-IA

**Wofür:** Navigationsmuster für `sitemap`/`informationsarchitektur.md`.
Kein Header-HTML übernehmen.

```bash
node scripts/inspiration.mjs navbar list [static|dropdowns|mega-menu|side-bar|search-bar|<typ>] [--limit 20]
node scripts/inspiration.mjs navbar get <slug|url>
```

Ohne Typ: `https://www.navbar.gallery/browse`. Mit Typ:
`https://www.navbar.gallery/type/<typ>`. Einträge `{name, url}`, Links
`/navbar/<slug>`. Get reduziert auf Titel, Beschreibung, Bild-/Video-URLs, Typ.

**Ziehen:** Anzahl Items, Dropdown vs. Mega vs. Sidebar, Suche ja/nein.

## 3. Magic UI (MIT) — Loop `components`

**Wofür:** Eine Motion-/Marketing-Komponente, nicht das Starter-Kit.

```bash
node scripts/inspiration.mjs magicui list [--grep <substr>]
node scripts/inspiration.mjs magicui get <name> [--out src/components/vendor/magicui/<name>.tsx]
```

Liste: `https://magicui.design/r/registry.json` (`items[]`, Name+Beschreibung).
Get: `https://magicui.design/r/<name>.json` — `files[0].content` als Quelle;
`dependencies`/`registryDependencies` mit ausgeben (`--json` komplett).

**Ziehen:** Datei nach `src/components/vendor/magicui/`, eine Werkzeugzeile,
Anker `#motion` oder `#sections`.

## 4. React Bits (MIT, Registry) — Loop `components`

**Wofür:** Eine Komponente (Default-Variante TS-TW). `--all` listet alle.

```bash
node scripts/inspiration.mjs reactbits list [--grep <substr>]
node scripts/inspiration.mjs reactbits get DotField --out src/components/vendor/reactbits/
```

Liste: `https://reactbits.dev/r/registry.json`. Get:
`https://reactbits.dev/r/<Name>.json` — fehlt das Suffix, hängt `-TS-TW` an.
Alle `files[]` ausgeben; `--out` legt das Verzeichnis an und schreibt jede
Datei unter ihrem `path`.

**Ziehen:** Vendor-Ordner plus Werkzeugzeile, Anker `#sections` / `#motion` /
`#background`.

## 5. 21st.dev — Loop `components` (Muster, kein geratener Code)

**Wofür:** Muster + Source-Link. Registry
`https://21st.dev/r/<author>/<slug>` liefert **403 ohne Login**. Das Skript
sagt ausdrücklich: *Code hinter Login; Quelle: \<Source-Link\>, falls
vorhanden dort holen.* Nie raten, nie einloggen.

```bash
node scripts/inspiration.mjs 21st search hero --limit 20
node scripts/inspiration.mjs 21st get @author/slug
```

Suche: `https://21st.dev/community/components/s/<slug>` über Jina. Links
`/@<author>/components/<slug>` → `{title, author, url}`. Get extrahiert Titel,
Beschreibung, Usage-Codeblock, Dependencies, Source-Link, License.

**Ziehen:** Struktur/Usage als Muster. Code nur über den Source-Link, wenn
öffentlich; sonst Inspiration und weiter.

## Exit-Codes

| Code | Bedeutung |
|---|---|
| 0 | ok |
| 1 | nichts gefunden / leeres Ergebnis |
| 2 | Bedienfehler (unbekanntes Flag, fehlendes Argument) |
| 3 | `HOST_UNAVAILABLE` — Netz/Jina/Firecrawl fehlgeschlagen; Meldung nennt den Kanal |
