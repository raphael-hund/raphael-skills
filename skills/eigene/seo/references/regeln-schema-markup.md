# Regeln — Schema-Markup (JSON-LD) Quick-Reference

Kurzreferenz für Structured Data. Quelle: `schema`-Skill aus coreyhaines/marketingskills (MIT),
übersetzt und condensiert.

## Grundregeln

1. **Genauigkeit vor allem.** Schema muss den sichtbaren Seiteninhalt exakt widerspiegeln —
   nichts markieren, was auf der Seite nicht wirklich vorhanden ist.
2. **JSON-LD verwenden** (Google-Empfehlung), in `<head>` oder am Ende von `<body>`.
3. Nur von Google unterstützte Typen nutzen, keine Spam-Taktiken (z. B. Rating-Schema ohne
   echte Bewertungen).
4. Immer validieren, nie ungeprüft ausliefern.

## Wichtigste Typen

| Typ | Wofür | Pflichtfelder |
|---|---|---|
| `Organization` | Firmen-/Über-uns-Seite | `name`, `url` |
| `WebSite` | Startseite (Sitelinks-Suchbox) | `name`, `url` |
| `Article`/`BlogPosting` | Blogartikel, News | `headline`, `image`, `datePublished`, `author` |
| `Product` | Produktseiten | `name`, `image`, `offers` |
| `SoftwareApplication` | SaaS/App-Seiten | `name`, `offers` |
| `FAQPage` | FAQ-Inhalte | `mainEntity` (Array aus Question/Answer) |
| `HowTo` | Anleitungen | `name`, `step` |
| `BreadcrumbList` | Seiten mit Breadcrumbs | `itemListElement` |
| `LocalBusiness` | Lokale Unternehmen | `name`, `address` |
| `Event` | Events, Webinare | `name`, `startDate`, `location` |

Mehrere Typen auf einer Seite kombinieren über `@graph`:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", "...": "..." },
    { "@type": "WebSite", "...": "..." },
    { "@type": "BreadcrumbList", "...": "..." }
  ]
}
```

## Validierung

- **Google Rich-Results-Test** — https://search.google.com/test/rich-results (rendert JS,
  das einzig verlässliche Tool bei clientseitig injiziertem Schema).
- **Schema.org-Validator** — https://validator.schema.org/
- Search Console → Verbesserungen-Reports auf laufende Fehler prüfen.

Häufige Fehler: fehlende Pflichtfelder, ungültige Werte (Daten nicht in ISO 8601, URLs nicht
vollqualifiziert), Schema widerspricht dem sichtbaren Inhalt.

## Für PR-/Linkbait-Statistikseiten (siehe `taktiken-linkbuilding-digitalpr.md`)

`Article` + `FAQPage` sind hier der größte Hebel für AI-Overview-/ChatGPT-Zitierbarkeit — beide
Blöcke bewusst beibehalten, `FAQPage` nur löschen, wenn wirklich keine FAQ-Daten vorliegen.
