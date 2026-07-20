# Regeln — Technischer & On-Page SEO-Audit

Objektive, prüfbare Checkliste für den Research-/Monitor-/Refresh-Schritt (Loop 4). Das ist
harte "Regel"-Ebene: entweder erfüllt oder nicht — kein Interpretationsspielraum. Quelle der
Prioritätsreihenfolge und Checklisten-Struktur: `seo-audit`-Skill aus coreyhaines/marketingskills
(MIT), condensiert und übersetzt; die neun GSC-Analysen darunter sind aus der Distribb-Audit-
Methodik in eigenen Worten paraphrasiert (kein Zitat, keine Distribb-API — generisches
SEO-Handwerk, auf GSC-Rohdaten statt auf ein SaaS-Backend umgeschrieben).

## Prioritätsreihenfolge (immer in dieser Reihenfolge prüfen)

1. Crawlability & Indexierbarkeit (findet Google die Seite überhaupt?)
2. Technische Grundlagen (schnell, funktionsfähig?)
3. On-Page-Optimierung (ist der Content optimiert?)
4. Content-Qualität (verdient die Seite zu ranken?)
5. Autorität & Links (hat sie Glaubwürdigkeit?)

## Crawlability & Indexierbarkeit

- `robots.txt`: keine versehentlichen Blocks, wichtige Seiten erlaubt, Sitemap referenziert.
- XML-Sitemap: existiert, erreichbar, nur kanonische/indexierbare URLs, aktuell.
- Seitenarchitektur: wichtige Seiten in ≤3 Klicks von der Startseite, keine Orphan-Pages.
- Index-Status: `site:domain.de`-Check gegen Search-Console-Coverage-Report.
- Canonical: selbstreferenzierend auf jeder eindeutigen Seite, kein Cross-Locale-Canonical,
  keine Redirect-Ketten/-Loops, keine Soft-404s.

## Core Web Vitals & Technik

- LCP < 2,5 s, INP < 200 ms, CLS < 0,1.
- HTTPS durchgängig, kein Mixed Content, gültiges Zertifikat.
- Mobile: responsive (kein separates m.-Subdomain-Setup), Tap-Targets, kein horizontales Scrollen.
- URL-Struktur: sprechend, klein geschrieben, mit Bindestrichen, ohne unnötige Parameter.

## On-Page

- **Title:** einzigartig, Primär-Keyword vorne, 50–60 Zeichen, klickwürdig.
- **Meta-Description:** einzigartig, 150–160 Zeichen, mit Nutzenversprechen + CTA.
- **Headings:** genau eine H1 mit Primär-Keyword, logische H2/H3-Hierarchie, keine Sprünge.
- **Content:** Keyword in den ersten 100 Wörtern, beantwortet die Suchintention, besser als die
  Top-3-Wettbewerber, keine Duplicate/Thin-Content-Seiten.
- **Bilder:** Alt-Text vorhanden und beschreibend, komprimiert, moderne Formate (WebP).
- **Interne Links:** wichtige Seiten gut verlinkt, beschreibender Anchor-Text, keine Orphans,
  keine Broken Links.
- **Keyword-Zuordnung:** ein Primär-Keyword pro Seite, keine Kannibalisierung zwischen Seiten.

### Schema-Erkennungsfalle

`WebFetch`/`curl` können clientseitig per JavaScript injiziertes JSON-LD (z. B. durch Yoast,
RankMath, AIOSEO) **nicht** sehen — Skript-Tags werden bei der Konvertierung entfernt. "Kein
Schema gefunden" allein aus einem `curl`-Export ist deshalb oft ein Fehlbefund. Für einen
verlässlichen Check: Browser-Tool mit gerendertem DOM, Google Rich-Results-Test, oder einen
Screaming-Frog-Export (rendert JS), der bereits vom Kunden vorliegt.

## E-E-A-T-Signale (Content-Qualität)

- **Experience:** Erfahrungsberichte, eigene Daten, echte Beispiele/Case-Studies.
- **Expertise:** sichtbare Autoren-Credentials, korrekte Fachdetails, belegte Behauptungen.
- **Authoritativeness:** wird von anderen zitiert, Branchenanerkennung.
- **Trustworthiness:** korrekte Angaben, Impressum/Kontakt sichtbar, Datenschutz/AGB vorhanden,
  HTTPS.

## Die neun GSC-Analysen (Monitor/Refresh-Schritt, aus echtem Export)

Auf Basis eines echten GSC-Query-Exports (Impressions/Klicks/CTR/Position, mind. 90 Tage):

| # | Analyse | Was sie findet | Schwellenwert |
|---|---|---|---|
| 1 | CTR-Optimierung | Seiten mit guter Position, aber schwacher CTR | `Ist-CTR < Erwartungs-CTR × 0,7`; Erwartungswert grob: Pos.1 ≈28 %, Pos.2 ≈15 %, Pos.3 ≈10 %, Pos.4 ≈7 %, Pos.5 ≈5 %, Pos.6–7 ≈4 %, Pos.8–10 ≈2,5 %, Pos.11–20 ≈1 % |
| 2 | Content-Decay | Seiten, die im Vergleich zur Vorperiode Traffic verlieren | Positions- oder CTR-Verschlechterung über Zeit, nicht nur ein Zeitpunkt |
| 3 | Striking Distance | Queries auf Position 11–20 bzw. Seiten auf Seite 2 | ein Refresh + interne Links entfernt von Seite 1 |
| 4 | Keyword-Kannibalisierung | mehrere eigene Seiten konkurrieren um dieselbe Query | Marken-Queries ausschließen; eine Seite gewinnt, andere umleiten/differenzieren |
| 5 | Dead Pages | Seiten, die auf Null-Traffic gefallen sind | prüfen: 404/noindex (erklärt es) vs. Traffic ist zu Konkurrenzseite gewandert |
| 6 | Brand- vs. Non-Brand-Health | Wie abhängig ist der Traffic vom Markennamen? | `Non-Brand-Anteil = Non-Brand-Klicks / Gesamt-Klicks`: >60 % gesund, 40–60 % mittel, <40 % zu markenabhängig |
| 7 | Themen-Cluster-Lücken | fehlende/dünne Pillar-Cluster-Struktur | pro Cluster: 1 Pillar + 4–8 Supporting-Artikel, alle intern verlinkt |
| 8 | Wettbewerber-Gap | Themen, die Wettbewerber ranken und der Kunde nicht | nie auf Wettbewerber verlinken, nur faktisch erwähnen |
| 9 | On-Page-Checks | Title/Meta/Heading/Link/Indexierbarkeits-Fehler | siehe On-Page-Abschnitt oben |

**Report-Format:** Executive Summary (Top 3–5 Prioritäten) → je Analyse eine Befundtabelle
(`Seite/Query | Kennzahl | Diagnose | Aktion`) → priorisierter Aktionsplan (kritisch zuerst,
dann High-Impact, dann Quick-Wins). Jeder Befund braucht eine konkrete nächste Aktion — ein
Befund ohne Aktion ist Rauschen.

## Häufige Fehlbilder nach Seitentyp

- **SaaS/Produkt:** dünne Produktseiten, fehlende Vergleichs-/Alternative-Seiten.
- **E-Commerce:** dünne Kategorieseiten, doppelte Produktbeschreibungen, fehlendes Produkt-Schema.
- **Content/Blog:** veraltete Inhalte ohne Refresh, Kannibalisierung, schwache interne Verlinkung.
- **Lokal:** inkonsistentes NAP (Name/Adresse/Telefon), fehlendes LocalBusiness-Schema, keine
  gepflegte Google-Business-Profile-Präsenz (siehe `taktiken-content-distribution.md`).
- **Mehrsprachig:** hreflang-Fehler, Cross-Locale-Canonical, nur Boilerplate übersetzt.

## Hreflang & i18n (nur wenn Kunde mehrsprachig ist)

- Jede Seite braucht einen **selbstreferenzierenden** hreflang-Eintrag — fehlt er, wird das
  ganze hreflang-Set ignoriert.
- Reziprozität: Wenn A auf B verweist, muss B auf A zurückverweisen, sonst wird das Paar
  verworfen.
- Gültige Codes: ISO 639-1 + optional ISO 3166-1 (`de-AT`, nie `de-OE`).
- `x-default` immer setzen (Fallback-Locale/Sprachauswahl).
- Canonical und hreflang dürfen sich nicht widersprechen — Canonical gewinnt im Konfliktfall,
  darf aber niemals cross-locale zeigen (z. B. `/fr/` canonical auf `/en/` killt die
  Indexierung der französischen Version komplett).
- Ab 10+ Locales: hreflang über die Sitemap pflegen statt über `<head>`-Tags (kein
  Seitengewicht, kein Extra-Request).
- Nur Boilerplate übersetzen reicht nicht — Google bewertet den sichtbaren Haupttext für die
  Sprachzuordnung; nur Nav/Footer übersetzt + Hauptinhalt unverändert = Duplicate Content.
