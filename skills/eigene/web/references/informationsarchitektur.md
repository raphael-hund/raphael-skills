# Informationsarchitektur — Seitenstruktur für Mehrseiten-Websites

**Wofür:** Ergänzt den `sitemap`-Schritt im Haupt-SKILL.md für Websites, die
**mehr** als eine Landingpage sind (Firmenwebsite, Content-Hub, mehrseitiger
Shop) — Seitenhierarchie, Navigation, URL-Struktur, internes Verlinken.
Für die reine Ads-Landingpage (eine Aktion, kein Menü) gilt stattdessen
`landingpage-struktur.md`. Nicht für XML-Sitemaps/technisches SEO — das
gehört zu seo.

**Herkunft:** kondensiert aus `coreyhaines/marketingskills`,
`skills/site-architecture/SKILL.md` (MIT-Lizenz).

## Site-Typen als Startpunkt

| Site-Typ | Übliche Tiefe | Kernbereiche | URL-Muster |
|---|---|---|---|
| KMU/Handwerk (Raphaels häufigster Fall) | 1–2 Ebenen | Home, Leistungen, Über uns, Kontakt | `/leistungen/name` |
| Content/Blog | 2–3 Ebenen | Home, Blog, Kategorien, Über uns | `/blog/slug` |
| SaaS-Marketing | 2–3 Ebenen | Home, Features, Preise, Blog, Docs | `/features/name` |
| E-Commerce | 3–4 Ebenen | Home, Kategorien, Produkte, Warenkorb | `/kategorie/unterkategorie/produkt` |

## Die 3-Klick-Regel

Wichtige Seiten sollen von der Startseite in maximal 3 Klicks erreichbar
sein. Nicht absolut, aber wenn eine kritische Seite 4+ Ebenen tief vergraben
ist, stimmt etwas nicht. Faustregel: so flach wie möglich, solange die
Navigation übersichtlich bleibt. Ein Dropdown mit 20+ Einträgen braucht eine
zusätzliche Hierarchieebene.

## Navigation

- **Header-Nav: 4–7 Einträge max.** Mehr führt zu Entscheidungslähmung.
- **CTA-Button ganz rechts** (z. B. "Jetzt anfragen").
- **Logo links, verlinkt zur Startseite.**
- Reihenfolge nach Priorität — wichtigste/meistbesuchte Seiten zuerst.
- **Footer** in Spalten gruppieren: Leistungen · Über uns/Kontakt/Karriere ·
  Rechtliches (Impressum, Datenschutz).
- **Breadcrumbs** spiegeln die URL-Hierarchie; jedes Segment außer der
  aktuellen Seite ist klickbar.

## URL-Struktur — Design-Prinzipien

1. Menschlich lesbar — `/leistungen/webdesign`, nicht `/l/w123`.
2. Bindestriche, keine Unterstriche.
3. URL-Pfad spiegelt die Hierarchie.
4. Konsistente Trailing-Slash-Regel (mit oder ohne — eine wählen, durchziehen).
5. Immer klein schreiben.
6. Kurz, aber beschreibend.

**Häufige Fehler:** Datum in Blog-URLs (`/blog/2024/01/15/titel` — überflüssig,
macht URLs lang), Über-Verschachtelung, URLs ohne Redirect ändern (jede alte
URL braucht einen 301-Redirect, sonst Verlust von Backlink-Wert + kaputte
Links), IDs statt Slugs, Query-Parameter für Content.

## Internes Verlinken

- **Keine Waisen-Seiten** — jede Seite braucht mindestens einen internen Link,
  der auf sie zeigt.
- **Beschreibender Anchor-Text** — "unsere Webdesign-Leistungen" statt "hier
  klicken".
- **5–10 interne Links pro 1000 Wörter** Content (Richtwert).
- Wichtige Seiten (Startseite, Kontakt, Kern-Leistung) bekommen mehr eingehende
  Links.
- **Hub-and-Spoke** für Content-schwere Bereiche: eine Übersichtsseite (Hub)
  verlinkt zu Detailseiten (Spokes), jede Spoke verlinkt zurück zum Hub.

## Ausgabeformat für die Sitemap

1. **Seitenhierarchie als ASCII-Baum** (schnell, textbasiert):
```
Startseite (/)
├── Leistungen (/leistungen)
│   ├── Webdesign (/leistungen/webdesign)
│   └── SEO (/leistungen/seo)
├── Über uns (/ueber-uns)
├── Blog (/blog)
└── Kontakt (/kontakt)
```
2. **Visuelle Sitemap als Mermaid** (`graph TD`) bei komplexeren Strukturen
   oder wenn Navigationszonen (Header/Footer) mit-visualisiert werden sollen.
3. **URL-Map-Tabelle**: Seite | URL | Parent | Nav-Ort | Priorität.
4. **Navigations-Spec**: Header-Items geordnet + CTA, Footer-Spalten,
   Breadcrumb-Hinweise.
