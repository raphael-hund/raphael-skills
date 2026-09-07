# Skript-Analyse — aus gezogenen Ads die Struktur extrahieren

Quelle der Muster: `/root/clients/make/ads/research-2026-08-03/01-explainer-skript-muster.md` (Stand 07.09.2026 auf Disk nicht vorhanden)
und `02-storytime-ads.md` (belegte Recherche vom 03.08.2026, jede Zeile dort mit Link).
Hier steht die Auswertungs-Methodik, dort die Belege.

## Was analysierbar ist und was nicht

Die API liefert nur Text (`ad_creative_bodies`, `ad_creative_link_titles`) plus Laufzeit.
Das Video/Bild selbst steckt hinter `ad_snapshot_url` und braucht einen Browser oder den
Skill `watch` (yt-dlp + ffmpeg + Transkript). Also zwei Analysetiefen:

| Tiefe | Datenquelle | Was rauskommt |
|---|---|---|
| A — Copy-Analyse | API-Text | Hook-Typ, Angle, Versprechen, CTA-Form, Beweisart |
| B — Skript-Analyse | Snapshot im Browser / `watch` auf das Video | Beat-Struktur, Szenen-Takt, Sprechtempo, visueller Stil |

Tiefe A auf alle Treffer, Tiefe B nur auf die Long-Running-Winner (siehe SKILL.md).

## Raster pro Ad (immer diese sechs Felder ausfuellen)

1. **Hook-Typ** — welcher der Einstiege liegt vor?
   - Schmerz beim Zuschauer benannt (erste 3 s ueber IHN, nicht ueber die Marke)
   - offene Frage / Suspense
   - Ergebnis zuerst (results-first), dann rueckwaerts erklaert
   - absurde Uebertreibung des Problems
   - Storytime-Einstieg („Gestern wollte ich nur…")
   - Pattern Interrupt (visuell/AI-Bild), danach echtes Material
   - Autoritaet/Zahl vorne
2. **Grundform** — welcher Bogen?
   - Explainer: Hook → Problem/Agitation → Mechanik → Loesung/Demo → Beweis → 1 CTA
   - PAS: Problem → Agitation → Solution
   - Storytime: Hook → Setup → Eskalation → Payoff → CTA
   - 50/50: erste Haelfte Problem, zweite Haelfte Loesung
   - TikTok-Dreiakt: 3–5 s Hook, 10–15 s Body, 3–5 s Close
3. **Zeitverteilung** — grobe Sekundenanteile. Referenzgewichtung fuer 60 s:
   Problem ~30 %, Loesung ~40 %, Proof ~20 %, Action ~10 %.
   Laenge einordnen: 10–15 s = ein Hook/ein Produktmoment/ein CTA · 16–25 s = Dreiakt ·
   20–30 s = Problem/Loesung-Haelften · 60 s = High-Concept · >2 min = Charakterbogen.
4. **Szenen-Takt** — Anzahl Hauptszenen und Mikroszenen. Orientierung: 60 s ≈ 5–7
   Hauptszenen + 2–3 Mikroszenen. Wichtiger als die Zahl: haengen die Schnitte an
   Sprach-Beats oder an einem starren Effekt? Case Studies nennen fast nie eine
   Schnittrate — deshalb Beats zaehlen, nicht Cuts schaetzen.
5. **Beweisform** — Zahl, Kundenname, Vorher/Nachher, Screenshot, Demo, Testimonial,
   oder nichts. Notieren, ob der Beweis NACH der Loesung kommt (Regelfall) oder davor.
6. **CTA-Form** — Wortlaut, Anzahl (mehr als einer ist ein Fehler), Laenge (3–10 s),
   und ob er eine Handlung oder nur eine Marke nennt.

## Sprach-Messwerte (objektiv, nicht Geschmack)

- Saetze: 10–15 Woerter, hoechstens 20.
- Wortzahl gegen Sprechtempo: 120–170 Woerter pro 60 Sekunden. Ein 60-s-Skript mit
  240 Woertern ist zu lang — laut lesen und stoppen, nicht schaetzen.
- Erster Satz: spricht er ueber den Zuschauer oder ueber den Absender?
- Konkrete Alltagsszene vs. abstrakte Erklaerung (konkret gewinnt).
- Benefit-/Transformationszeile vs. Feature-Liste.

## Aus N Ads ein Muster machen

Einzelne Ads sind Anekdoten. Ein Muster braucht:

1. **Mindestens 5 Ads** desselben Marktes mit Laufzeit > 30 Tage.
2. **Auszaehlen statt erinnern:** wie viele der N nutzen Hook-Typ X? Ergebnis als
   „7 von 12" schreiben, nie „meistens".
3. **Gegenprobe an den Kurzlaeufern:** was machen die Ads mit < 7 Tagen Laufzeit
   anders? Ein Merkmal, das beide Gruppen teilen, ist kein Erfolgsmerkmal.
4. **Confounder benennen:** grosse Marken lassen Ads auch aus Budgetgruenden lange
   laufen. Laufzeit ist ein Proxy, kein Performance-Beweis.

## Report-Form

```
Markt/Suche · Zeitraum · N Ads · davon >30 Tage: M
1. Hook-Typen: <Typ> N/M, <Typ> N/M …
2. Dominante Grundform + typische Zeitverteilung
3. Beweisformen: welche kommen vor, welche fehlen
4. CTA-Formulierungen woertlich (Liste)
5. Was NIEMAND macht (die Luecke = unser Angle-Kandidat)
6. 3 uebertragbare Muster fuer den eigenen Kunden — als Regel, nicht als Textkopie
```

Punkt 5 ist der wertvollste: die Luecke im Markt schlaegt das gemeinsame Muster.
