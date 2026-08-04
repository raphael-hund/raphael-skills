---
name: ads-research
version: 0.1.0
description: >
  Zieht echte laufende Konkurrenz-Ads ueber die Meta Ad Library API (ads_archive,
  Graph v26.0) und wertet sie nach Struktur aus: Hook-Typ, Story-Aufbau,
  Szenen-Takt, Beweisform, CTA. Laufzeit ist der Performance-Proxy — was ueber
  30 Tage laeuft, funktioniert. Trigger: "Konkurrenz-Ads ziehen", "Ad Library",
  "was schaltet <Firma>", "Swipe-File bauen", "Marktscan Ads", "welche Ads
  laufen lange". Liefert Rohmaterial fuer ads (Angles), ads-video (Skripte) und
  ads-copy (Primary Text) — schreibt selbst keine Creatives.
class: F
scope: agency
sensitivity: internal
source: >
  Eigenrecherche 03.08.2026, belegt in
  /root/clients/client-make/ads/research-2026-08-03/ (01 Explainer-Muster,
  02 Storytime-Ads, 03 Ad-Library-API).
provenance: >
  API-Verhalten am 03.08.2026 gegen graph.facebook.com/v26.0/ads_archive gemessen,
  nicht nur aus der Doku uebernommen: MAKEs vorhandenes META_ACCESS_TOKEN aus
  /root/.secrets/api-keys.env liefert HTTP 400 / API-Code 10
  ("Application does not have permission for this action") — Ad-Library-Zugang
  ist also noch nicht freigeschaltet. Skript-Fehlerpfade entsprechend getestet.
loads:
  - references/api-referenz.md
  - references/skript-analyse.md
requires_skills: [ads@^0, watch@^0]
completion_criteria:
  - "Jede Aussage im Muster-Report ist ausgezaehlt (N von M), nie 'meistens'"
  - "Deep-Analyse nur auf Ads mit Laufzeit >= 30 Tage, mit Gegenprobe an Kurzlaeufern"
  - "Rohdaten-JSON liegt im Kundenrepo, Token nirgends in der Datei"
  - "Kein Creative-Text 1:1 uebernommen — nur Muster als Regel formuliert"
---

# ads-research — echte laufende Ads ziehen und sezieren

## Zweck (1 Satz)

Statt aus dem Gefuehl ueber Konkurrenz zu reden: die tatsaechlich laufenden Ads
abrufen, nach Laufzeit sortieren und die Gewinner in ihre Bauteile zerlegen.

## Voraussetzung (einmal pruefen, dann nie wieder)

`scripts/ad-library.py` braucht `META_ACCESS_TOKEN` mit **Ad-Library-Zugang**.
Das ist ein anderer Zugang als MAKEs Ads-Manager-Token in `/root/.secrets/api-keys.env`
— gemessen am 03.08.2026 antwortet dieses mit `API-Code 10 · Application does not
have permission`. Ohne freigeschalteten Zugang laeuft nur der UI-Weg (siehe Gotchas).

## Reference-Routing (bei Bedarf laden, nicht vorab)

| Situation | Laden | Inhalt |
|---|---|---|
| Parameter/Feld/Fehlercode klaeren, CH-vs-DE-Frage | `references/api-referenz.md` | Endpunkt, alle Parameter, Feldgruppen, Fehlercodes, Rate-Limit-Verhalten |
| Gezogene Ads auswerten, Report schreiben | `references/skript-analyse.md` | 6-Felder-Raster, Grundformen, Sprach-Messwerte, Report-Form |
| Video hinter dem Snapshot wirklich sehen | Skill `watch` | Frames + Transkript, lokal, keine API-Kosten |
| Aus dem Befund Angles/Skripte/Copy bauen | Skills `ads`, `ads-video`, `ads-copy` | Dieser Skill liefert nur Rohstoff |

## Ablauf

1. **Zielmenge definieren.** Zwei Zugaenge, meist beide fahren:
   - *Suchbegriffe*: 3–8 Begriffe in der Sprache des Marktes (Meta uebersetzt nicht),
     z.B. „leadgenerierung handwerker", „website kunden gewinnen".
   - *Konkurrenten*: Page-IDs sammeln (aus der oeffentlichen Ad-Library-URL der Seite),
     max. 10 pro Abfrage.
2. **Ziehen.**
   ```bash
   S=/root/raphael-skills/skills/eigene/ads-research/scripts/ad-library.py
   python3 $S --land DE --suche "leadgenerierung handwerker" --sprache de \
             --limit 200 --out /root/clients/client-<name>/ads/swipe/<datum>-suche.json
   python3 $S --land DE --page-id 111,222,333 --limit 200 \
             --out /root/clients/client-<name>/ads/swipe/<datum>-konkurrenz.json
   ```
   Rohdaten immer ins **Kundenrepo**, nie ins Brain (Mandantentrennung).
3. **Nach Laufzeit sortieren.** Macht das Skript selbst (`laufzeit_tage`, absteigend).
   Schnellblick:
   ```bash
   python3 $S --land DE --page-id 111 --min-laufzeit 30 --format tabelle
   ```
   **Deutungsregel:** Laufzeit ist ein Proxy, kein Beweis. > 30 Tage aktiv =
   starkes Indiz, dass die Ad sich traegt (auch Branding-Budgets oder
   Vergessenes laufen lang). 7–30 Tage = laeuft noch im Test. < 7 Tage =
   keine Aussage. Immer mit Gegenprobe an Kurzlaeufern lesen.
4. **Winner deep-analysieren.** Nur die Long-Running-Ads, hoechstens 10–15.
   Tiefe A (Copy) direkt aus dem JSON; Tiefe B (Skript/Szenen) ueber
   `ad_snapshot_url` im Browser oder `watch` auf das Video.
   Raster und Messwerte: `references/skript-analyse.md`.
5. **Gegenprobe.** Dieselben Felder an 5–10 Kurzlaeufern derselben Suche auswerten.
   Ein Merkmal, das beide Gruppen teilen, erklaert nichts.
6. **Muster-Report schreiben** nach der Report-Form in `references/skript-analyse.md`,
   Ablage `client-<name>/ads/swipe/<datum>-muster.md`. Uebergabe an `ads`
   (Angles) bzw. `ads-video` / `ads-copy`.

## Gotchas

- **Der Token ist die haeufigste Wand, nicht der Code.** `Code 10` = kein
  Ad-Library-Zugang, `Code 190` = abgelaufen. Beides bricht sauber mit Exit 3 ab.
  Kein Workaround per Ads-Manager-Token — der Zugang ist ein eigener, verifizierter
  Prozess (bis zu mehrere Wochen).
- **CH-only-Ads gibt die API nicht her.** Kommerzielle Schweizer Anzeigen ohne
  EU-Auslieferung erscheinen nur in der oeffentlichen Ad-Library-UI
  (facebook.com/ads/library). Fuer CH-Konkurrenz also: UI im Browser, Screenshot,
  Text von Hand ins Raster. Das Skript warnt bei `--land CH`.
- **Rate Limits sind undokumentiert.** Meta nennt keine feste Zahl; `Code 613`
  kommt ploetzlich. Das Skript wartet exponentiell (5 Versuche) und pausiert 1 s
  zwischen Seiten. Nicht mit `--limit 5000` blind loslaufen — erst 50, dann skalieren.
- **Snapshot-URLs brauchen einen Browser.** `ad_snapshot_url` rendert eine
  HTML-Seite, kein Medienfile; Batch-Download ist laut Meta nicht vorgesehen.
  Fuer Video-Analyse den Skill `watch` nutzen, nicht curl.
- **Token steckt in `paging.next` und teils in `ad_snapshot_url`.** Diese URLs nie
  loggen, nie committen, nie an Kunden weitergeben. Das Skript schreibt den Token
  nicht in die Parameter-Sektion des Outputs und maskiert ihn in Fehlern.
- **Keine Performance-Zahlen fuer kommerzielle Ads.** Kein Spend, keine Impressions,
  kein CTR. `eu_total_reach` ist eine EU-Schaetzung ohne CH. Alles andere waere
  Erfindung — Laufzeit bleibt der einzige belastbare Proxy.
- **Laufzeit ist ein Proxy, kein Beweis.** Grosse Marken lassen Ads auch aus
  Budget-/Traegheitsgruenden lange laufen. Im Report als Einschraenkung mitschreiben.
- **Nie ein Creative 1:1 uebernehmen.** Extrahiert werden Muster (Hook-Typ,
  Bogen, Beweisform) — nicht Saetze. Ein abgeschriebener Hook ist Urheberrechts-
  und Markenrisiko und funktioniert im fremden Angebot ohnehin selten.
- **Creative-Felder sind Listen.** `ad_creative_bodies[0]` ist bei Carousels nur
  die erste Karte; fuer die Analyse alle Elemente ansehen.
- **`ad_delivery_start_time` ist der geplante Start.** Bei ganz jungen Ads kann die
  Laufzeit dadurch minimal ueberschaetzt sein — bei >30-Tage-Ads egal.
