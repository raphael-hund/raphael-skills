# Planung, DESIGN.md & SEO

Vor jeder Website steht der Plan. Keine Zeile Code vor: DESIGN.md + Sitemap +
Sektions-Plan + SEO-Plan. Diese Datei definiert die Artefakte und ihre Inhalte.

Inhalt: 1 Pflicht-Artefakte · 2 DESIGN.md · 3 Sitemap & Seitenplan · 4 Content &
Copywriting · 5 SEO-Plan (sehr detailliert) · 6 Screenshot-Verifikation

---

## 1. Pflicht-Artefakte (in dieser Reihenfolge)

1. **DESIGN.md**: die Design-Source-of-Truth (Abschnitt 2)
2. **Sitemap**: alle Seiten mit Zweck, Ziel-Keyword, URL-Slug (Abschnitt 3)
3. **SEO-Plan**: Keyword-Recherche, On-Page-Spezifikation pro Seite (Abschnitt 5)
4. **Sektions- & Content-Plan**: pro Seite: Sektions-Reihenfolge + ausformulierte Texte (Abschnitt 4)
5. Erst dann: Bau. Und während/nach dem Bau: Screenshot-Verifikation (Abschnitt 6)

## 2. DESIGN.md (immer zuerst, immer im Projektroot)

Die DESIGN.md ist der Vertrag des Projekts. Sie wird VOR dem Code geschrieben und bei
Änderungen synchron gehalten. Format (an styles.refero.design orientiert):

```markdown
# DESIGN.md: <Projektname>

## Read
<1 Zeile: Seitenart für Zielgruppe, Vibe, Richtung, Register brand/product>

## Dials
VARIANCE n (Layout-Mut 1–10, weil…) · MOTION n · DENSITY n

## Signature-Element
<Das eine Element, an das man sich erinnert>

## Tokens
### Farben (OKLCH + Hex)
--canvas / --surface / --ink / --ink-muted / --accent (= CTA, exklusiv) /
--border / --success…  + Commitment-Strategie (Restrained/Committed/…)
Regel: 1 Akzent + Neutrals. Semantische Statusfarben (success/warning/error) aus der
Palette ableiten, auf Feedback-Flächen beschränkt, zählen nicht als Akzent.
### Typografie
Font-Rollen (display/body/ui) mit Familie, Weights, clamp()-Skala, Tracking, Line-Height
### Spacing & Shape
Skala, Section-Gaps, Radius-System (concentric), Elevation (Border ODER Shadow)
### Motion
Kurven (exakte cubic-bezier), Dauer-Tabelle, Focal-Moment, Reduced-Motion-Strategie
### Iconography & Imagery
Icon-Library + strokeWidth, Bildsprache (was/was nicht), Asset-Quellen

## Komponenten-Entscheidungen
Pro Kernkomponente (Button, Nav, Card, Hero, Funnel-Step…): die gewählte Idee
(siehe komponenten-ideation.md) + Begründung in einem Satz.

## Asset-Entscheidungen
Pro Raster-Asset (Hero, Feature-Visual, Freisteller, Textur, og-image): die 6
Antworten aus bild-assets.md §2 (Funktion, Medium, Bühne/Transparenz,
Stil-Verankerung, System-Anschluss, Slot) + Stil-Bibel-Verweis.

## No-Gos für dieses Projekt
<Konkrete Verbote, z.B. Pastell, Serif, …>

## SEO-Verknüpfung
Verweis auf Sitemap + SEO-Plan (Datei seo-plan.md)
```

Regeln: Jede font-size landet auf einem enumerierten Step. Primitive + semantische
Tokens trennen. Token-Namen dokumentieren Zweck, nicht Wert ("caption", nicht "12px").

## 3. Sitemap & Seitenplan

- Jede Seite: **URL-Slug · Zweck (1 Satz) · Primär-Keyword · Sekundär-Keywords ·
  Search Intent (informational/commercial/transactional) · Funnel-Rolle · interne
  Links rein/raus**.
- Struktur-Regeln: Flache Hierarchie (max 3 Klicks tief), ein H1-Thema pro Seite,
  Hub-and-Spoke (Pillar-Seiten + Cluster), Produkte/Leistungen je eigene Seite,
  Trust-Seiten (Erfahrungen, Referenzen mit Detailseiten, Über uns), Prozess-Seite,
  Content-Hub (Ratgeber) der in den Funnel rückverlinkt.
- Slugs: kurz, Keyword-first, klein, Bindestrich, keine Füllwörter. Nie still ändern
  (Redirects bei Bestand).

## 4. Content & Copywriting

- Texte werden VOR dem Layout geschrieben (Content-first): Headline-Alternativen,
  Subtext, CTA-Labels, Sektions-Copy pro Seite ausformuliert.
- Fremdsprachen-/Textqualität: Formuliere benefit-orientiert, konkret, mit Zahlen-Ankern;
  ein Register (Du/Sie) pro Seite; Copy-Audit-Regeln aus review-qa.md gelten.
- Content-Density: Sektion = Headline ≤ 8 Wörter + Sub ≤ 25 Wörter + 1 Visual/CTA.
- Jede Sektion bekommt ihr Ziel-Keyword natürlich in H2/Body, nie gestopft.

## 5. SEO-Plan (sehr detailliert)

### 5.1 Recherche (DataForSEO API, wenn Credentials vorhanden)

Nutze die DataForSEO-Endpoints direkt per HTTP (Credentials als Basic Auth
`login:password`; ohne Credentials → Fallback 5.2):

1. **Keyword-Ideen**: `POST /v3/dataforseo_labs/google/keyword_ideas/live` mit
   Seed-Keywords aus dem Brief (Leistung + Ort + Probleme der Zielgruppe).
   Felder: keyword, search_volume, keyword_difficulty, intent, cpc.
2. **Related/Questions**: `…/related_keywords/live` + People-Also-Ask für FAQ-Sektionen.
3. **SERP-Analyse pro Hauptkeyword**: `POST /v3/serp/google/organic/live`: wer rankt,
   welche Seitentypen, Featured Snippets, lokale Pack-Ergebnisse.
4. **Konkurrenz**: `…/ranked_keywords/live` auf Wettbewerber-Domains → deren Keywords,
   Lücken identifizieren.
5. **Bei Bestandssite**: `POST /v3/on_page/lighthouse/live` + Content-Parsing, um
   technische Baseline und Ist-Content zu erfassen.
6. **Backlinks (optional)**: `…/backlinks/summary/live`.

Output: priorisierte Keyword-Map (Keyword → Seite → Intent → Volumen → Difficulty),
abgelegt als `seo-plan.md` im Projekt.

### 5.2 Fallback ohne API

Manuelle Recherche: Google-Suggest/Autocomplete, "Ähnliche Suchanfragen",
Wettbewerber-Titel-Tag-Analyse, branchenübliche Fragenkataloge. Dieselbe Keyword-Map,
Quellen annotiert, Volumen als Schätzung markiert.

### 5.3 On-Page-Spezifikation (pro Seite im Plan festlegen)

- **Title Tag**: ≤ 60 Zeichen, Primär-Keyword vorn, Marke hinten, einzigartig sitewide.
  **Zeichenanzahl aktiv zählen, nie schätzen**: Platzhalter mit realistischem Ersatz
  (z. B. Praxisname = 12 Zeichen) rechnen; über 60 Zeichen → Title umschreiben, nicht
  "prüfen" kommentieren. Nur verifizierte Längen angeben.
- **Meta Description**: ≤ 155 Zeichen, Nutzen + CTA, Keyword natürlich (ebenfalls zählen).
- **H1**: genau eine, enthält Primär-Keyword, deckt sich mit Search Intent.
- **Heading-Struktur**: logische H2/H3-Hierarchie, Keywords in H2 wo natürlich.
- **Content-Tiefe**: W-Fragen der Intent-Gruppe beantworten; FAQ-Block mit
  FAQPage-Schema; bei Local: NAP (Name/Adresse/Telefon) konsistent, LocalBusiness-Schema.
- **Interne Verlinkung**: jede Seite verlinkt kontextuell auf Funnel-Seite + Hub;
  Anchor-Texte beschreibend.
- **Bilder-SEO**: beschreibende Dateinamen, Alt-Texte, width/height (CLS), lazy loading
  unter dem Fold, WebP/AVIF, Hero priority.
- **Strukturierte Daten (JSON-LD)**: Organization/LocalBusiness, Product/Service,
  FAQPage, BreadcrumbList, Review/AggregateRating (nur echte Daten!).
- **Technisch**: semantisches HTML, eine Canonical-URL, saubere Slugs, Sitemap.xml +
  robots.txt, HTTPS, Core Web Vitals (LCP < 2.5s, INP < 200ms, CLS < 0.1),
  Mobile-first, Open Graph + Twitter Cards, og-image pro Kernseite.
- **E-E-A-T**: echte Namen/Referenzen/Adresse, Impressum, Auszeichnungen mit Quelle –
  Trust ist SEO-Faktor und Conversion-Faktor.

## 6. Screenshot-Verifikation (Pflicht, jede Seite, jeder Breakpoint)

Screenshots sind der visuelle Beweis: ohne sie gilt eine Seite als ungeprüft.

- **Wann**: nach jeder Sektion beim Bau, am Ende jede Seite komplett (Desktop 1440px
  + Mobile 390px), nach jedem Fix erneut (Frische-Pflicht: Screenshot älter als
  letzte Code-Änderung = ungültig).
- **Wie sinnvoll**: volle Viewport-Breite, sinnvolle Höhe (Sektion vollständig im Bild,
  nicht abgeschnitten, nicht 90 % Weißraum); bei langen Seiten mehrere Screenshots mit
  Überlapp statt ein riesiger Downscale-Screenshot, auf dem nichts lesbar ist.
- **Prüfbilder pro Seite**: Hero im ersten Viewport · jede Sektion einzeln ·
  Hover-/Active-States der Kernkomponenten · Funnel alle Steps · Mobile-Collapse.
- **Wonach prüfen** (Checkliste review-qa.md): Kontrast lesbar, kein Clipping,
  Text-Umbrüche sauber, Spacing-Rhythmus, CTA sofort erkennbar, keine leeren Flächen,
  Bilder geladen, kein Horizontal-Scroll. Coverage-Pflicht: jede Seite/jeder State,
  keine Stichprobe.
