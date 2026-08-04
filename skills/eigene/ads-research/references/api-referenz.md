# ads_archive — API-Referenz (kondensiert)

Volle Fassung mit allen Quell-Links:
`/root/clients/client-make/ads/research-2026-08-03/03-ad-library-api.md` (Stand 03.08.2026,
Graph API v26.0). Hier nur, was `scripts/ad-library.py` bedient.

## Geografie entscheidet, nicht der Firmensitz

`ad_reached_countries` meint das Land, in dem die Anzeige Menschen erreicht hat.
Wegen der EU-Transparenzpflicht liefert `ad_type=ALL` fuer EU-ausgelieferte Anzeigen
auch normale kommerzielle Ads — ausserhalb der EU nur politische/Issue-Ads.

- **DE**: laufende kommerzielle Konkurrenz-Ads → ja.
- **CH (nur CH ausgeliefert), kommerziell**: nein, gibt die API nicht her.
- **CH politisch/Issue**: ja, mit `ad_type=POLITICAL_AND_ISSUE_ADS`.
- **CH-Ad, die zusaetzlich DE/EU erreicht**: erscheint ueber die EU-Abdeckung.
- Die oeffentliche Ad-Library-UI ist offener als die API — aktive Ads sind dort
  allgemein sichtbar. Fuer CH-Konkurrenz ist die UI oft der einzige Weg.

## Zugang

Ad-Library-Zugang ist ein eigener Prozess: Developer-Konto + App, Registrierung ueber
facebook.com/ads/library/api, Identitaetsbestaetigung (laut Meta bis zu mehrere Wochen),
Zustimmung zu den Plattformbedingungen. **Ein bestehendes Ads-Manager-/System-User-Token
reicht nicht** — gemessen am 03.08.2026 mit MAKEs `META_ACCESS_TOKEN`:
`HTTP 400 · API-Code 10 · Application does not have permission for this action`.

## Parameter (die genutzten)

| Parameter | Bedeutung |
|---|---|
| `ad_reached_countries` | Pflicht. JSON-Liste, z.B. `["DE"]` |
| `ad_type` | `ALL` (Standard), `EMPLOYMENT_ADS`, `FINANCIAL_PRODUCTS_AND_SERVICES_ADS`, `HOUSING_ADS`, `POLITICAL_AND_ISSUE_ADS` |
| `ad_active_status` | `ACTIVE` (Standard), `INACTIVE`, `ALL` |
| `search_terms` | max. 100 Zeichen, Leerzeichen = UND, keine Uebersetzung durch Meta |
| `search_type` | `KEYWORD_UNORDERED` oder `KEYWORD_EXACT_PHRASE` |
| `search_page_ids` | JSON-Liste, max. 10 Page-IDs |
| `ad_delivery_date_min/max` | `YYYY-MM-DD`, inklusive |
| `languages` | ISO-639-1 |
| `media_type` | `ALL`, `IMAGE`, `MEME`, `VIDEO`, `NONE` |
| `publisher_platforms` | `FACEBOOK`, `INSTAGRAM`, `THREADS`, `MESSENGER`, `WHATSAPP`, … |

`bylines`, `delivery_by_region`, `estimated_audience_size_*` gelten nur fuer
politische/Issue-Ads. `CREDIT_ADS` ist durch `FINANCIAL_PRODUCTS_AND_SERVICES_ADS` ersetzt.

## Felder

**Immer:** `id`, `page_id`, `page_name`, `ad_creation_time`, `ad_delivery_start_time`,
`ad_delivery_stop_time`, `ad_creative_bodies`, `ad_creative_link_titles`,
`ad_creative_link_descriptions`, `ad_creative_link_captions`, `ad_snapshot_url`,
`publisher_platforms`, `languages`.

Die Creative-Felder sind **Listen** — Carousels und Varianten liefern mehrere Texte.

**EU-Transparenz, auch kommerziell:** `eu_total_reach` (Schaetzung, keine Impressions,
ohne CH), `beneficiary_payers`, `target_ages`, `target_gender`, `target_locations`,
`age_country_gender_reach_breakdown`, `total_reach_by_location`.

**Nur politisch/Issue:** `spend` (Bereiche), `impressions` (Bereiche), `currency`,
`bylines`, `estimated_audience_size`, `demographic_distribution`, `delivery_by_region`.
Diese Felder bei `ad_type=ALL` mitzuschicken kippt die Abfrage mit HTTP 400 — deshalb
trennt das Skript `FELDER` und `FELDER_POLITISCH`.

`ad_delivery_start_time` ist der geplante Start, nicht zwingend die erste Impression.

## Pagination

Antwort enthaelt `paging.next` als vollstaendige URL — unveraendert weiteraufrufen.
`paging.next` und `ad_snapshot_url` koennen den Access-Token enthalten: nie loggen,
nie in ein Repo committen, nie an einen Kunden weiterreichen.

## Fehlercodes

| Code | Bedeutung |
|---|---|
| `10` | App/Token ohne Ad-Library-Berechtigung |
| `100` | ungueltiger Parameter (haeufig: politisches Feld bei `ad_type=ALL`) |
| `190` | OAuth-Token ungueltig/abgelaufen |
| `613` | Rate Limit ueberschritten |
| `1009` | Parameterpruefung fehlgeschlagen |
| `2500` | Graph-Query-Fehler |

Feste Request-Kontingente veroeffentlicht Meta fuer diesen Endpunkt nicht. Es gelten
die dynamischen Header `X-App-Usage` / `X-Business-Use-Case-Usage` (`call_count`,
`total_time`, `total_cputime`, ggf. `estimated_time_to_regain_access`). Bei `613`
exponentiell zurueckwarten — das Skript macht das automatisch (5 Versuche, max. 120 s).

## Politische Ads in der EU

Seit 06.10.2025 duerfen politische/Wahl-/Social-Issue-Ads in der EU nicht mehr
ausgeliefert werden. DE-Treffer dieser Kategorie sind daher ueberwiegend Archivdaten.
Die Schweiz ist davon nicht erfasst.
