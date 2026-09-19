---
title: "ChatGPT Ads: Stand, Format, Gebote und Grenzen für Leadgen in DACH"
type: reference
status: approved
created: 2026-09-18
refresh_due: 2026-12-18
tags: [ads, chatgpt-ads, openai, plattform, leadgen, dach]
---

# ChatGPT Ads: Stand, Format, Gebote und Grenzen für Leadgen in DACH

> Kanonische Seite (Merge 18.09.2026 aus früherem Skill-Bestand, Wiki-Seite und Recherche-DACH Neubefunden 18.09.2026; am 18.09.2026 als einzige Plattform-Seite in den Skill übernommen). Stand: 18. September 2026. Gültig bis zur nächsten Prüfung, spätestens `refresh_due: 2026-12-18`, weil OpenAI die Ad Policies monatlich ändert (Changelog v1.0 März bis v1.5 August 2026). Primärquellen: sechs offizielle OpenAI-Seiten (Volltext gelesen 07.09.2026) plus DACH-Recherche-Quellen (sichtbarerwerden.de, mjmads.com, onlinemarketing.de).

## Was gilt

- Ausspielung seit **24.08.2026** in 31 europäischen Märkten inkl. Deutschland, Österreich, Schweiz; **Self-Service über den OpenAI Ads Manager seit 31.08.2026** für DACH. Die abrechnende Firma muss in einem gelisteten Land sitzen.
- Anzeigen sehen nur Nutzer der **Free- und Go-Stufe**. Plus, Pro, Business und erkannte Minderjährige bleiben werbefrei. B2B-Entscheider mit bezahltem Abo sind damit unerreichbar.
- **Format `chat_card`**: Advertiser-Name, Favicon, Headline (**3–50 Zeichen**), Beschreibung/Body (**bis 100 Zeichen**), Ziel-URL/Landingpage und ein Bild, platziert unter der ChatGPT-Antwort, als gesponsert markiert. Kein Video.
- Auslieferung **kontextuell nach Gesprächskontext und Absicht**, Landingpage, Titel, Copy und Context Hints (thematische Richtung auf Ad-Group-Ebene). **Kein Keyword-Targeting** (keine Exact-Match-Keywords, keine Garantie), keine Demografie, keine Lookalikes, kein Retargeting. Dazu Geo-Targeting, Plattform-Targeting, Custom Audiences (ab 25.000 Matches) und Produktfeeds.
- Gebote als CPM (Ziel Reach) oder CPC (Ziel Clicks) mit Maximalgebot je Ad-Group, Conversion-Optimierung verfügbar. OpenAI empfiehlt für den CPC-Start 3–5 USD; gemessener CPM liegt bei ~25 USD (Sekundärquelle). Relevanzgewichtete Second-Price-Auktion.
- Messung über OpenAI Pixel, Conversions API und UTM-Parameter. Reporting: Impressions, Klicks, Spend, CTR, CPC, CPM, Conversions.
- **EWR/Schweiz:** vorerst nur kontextuelle Ads (berechtigtes Interesse, DSGVO); personalisierte Ads erst nach Opt-in.
- Erlaubte Startkategorien: Konsumgüter und Haushalt, lokale Dienstleistungen, Reisen und Erlebnisse, digitale Produkte und Bildung. Finanz-, Gesundheits- und Rechtsdienstleistungen sind ausserhalb der USA verboten; ebenso Health-Coaching, Wellness-Claims, konkrete Stellenanzeigen, politische Inhalte.
- Landingpage wird mitgeprüft, Interface-Imitation ist verboten, keine Platzierung neben sensiblen Gesprächen.

## Anwendung für Leadgen

- Handwerk und lokale Dienstleister sind zulässig. Ein Test läuft mit Geo-Targeting auf das Einzugsgebiet, Context Hints aus den Kundensprache-Dateien (Problemformulierungen wie „Dach undicht", „Heizung tauschen") und der bestehenden Leadgen-Landingpage. Prüfgrösse ist der Preis je qualifizierter Anfrage gegen Meta über 30 Tage.
- Vor dem ersten Euro die erlaubte CPL-Rechenkette anwenden: erwarteter CPC mal Klicks je Anfrage aus der gemessenen Landingpage-Conversion. Ohne diese Rechnung kein Budget.
- Die Statics-Bauformen aus dem Teil Statics (kalter Leser zuerst, Deal auf der Anzeige, ein Bild) passen auf das Format — die 50/100-Zeichen-Copy-Disziplin ist eine neue, harte Übungsform. Video-Skripte passen nicht.
- Pixel oder Conversions API und UTMs vor dem Start setzen, sonst bleibt der Kanal in Pipedrive unsichtbar. Die Auswertung folgt der 7-/30-Tage-Logik aus `loop3-ablauf.md`.
- Vor jedem Kundentest die Kategorie gegen die Ad Policies prüfen. Physiotherapie, Finanzberatung, Anwälte und Gesundheitscoaching fallen in DACH aus.
- Wettbewerbs-Signal: DACH-Agenturen positionieren sich bereits als „ChatGPT Ads Agentur" (u. a. weventure.de, mjmads.com).

## Beispiele / Herstellerangaben (keine Benchmarks)

- OpenAI nennt eine Milliarde USD annualisierten Umsatz nach unter 200 Tagen, einen E-Commerce-Fall mit 3x ROAS über 28 Tage und einen Partnerbericht mit über 80 Prozent Neukunden im Ad-Traffic. Das sind Herstellerangaben ohne Kontext und keine Benchmarks für Leadgen in DACH.
- Maximilian Winkler (Agentur W&S) meldete am 28.08.2026 in einem Reel erste Kampagnen und knappen Zugang nur über ein Partnernetzwerk; drei Tage später öffnete OpenAI den Self-Service für alle. Muster für Akquise-Ansprache über einen neuen Kanal (Neuigkeit, eigener Zugang, Knappheit, DM-Aufforderung), keine Leistungsdaten. Die Knappheits-Behauptung galt nur bis 30.08.2026.

## Gilt nicht wenn

- Der Kunde B2B-Entscheider mit bezahltem ChatGPT-Abo erreichen will; diese sehen keine Anzeigen.
- Das Angebot in eine verbotene oder ausserhalb der USA gesperrte Kategorie fällt (Gesundheit, Finanzen, Recht, Wellness-Claims).
- Eric Steigner als Quelle erwartet wird: In seinen gesichteten Videos/Reels kommt ChatGPT Ads als Werbekanal nicht vor; seine KI-Aussagen betreffen Claude und ChatGPT als Werkzeuge für Copy und Recherche.

## Was fehlt / offen

- Kein CPC oder CPM für DACH bekannt (nur US-Indikationen: CPC-Empfehlung 3–5 USD, CPM ~25 USD).
- Granularität des Geo-Targetings (Radius, PLZ) nicht dokumentiert.
- Keine Lead-Formulare dokumentiert.
- Keine eigenen Kampagnendaten.
- Herstellerzahlen sind Selbstauskunft (siehe oben).
- Policy-Drift: OpenAI ändert die Ad Policies monatlich → bei Ablauf `refresh_due` reverifizieren (Starttermine, Kategorien, Format-Specs, EWR-Regel).

## Quellen

- https://openai.com/index/chatgpt-ads-expands-across-europe/ (18.08.2026, Update 31.08.2026)
- https://openai.com/index/expanding-access-to-ai-with-chatgpt-ads/ (31.08.2026)
- https://openai.com/index/new-ways-to-buy-chatgpt-ads/ (05.05.2026)
- https://help.openai.com/en/articles/20001207-ads-in-chatgpt-the-basics
- https://help.openai.com/en/articles/20001245-ads-manager-availability
- https://openai.com/policies/ad-policies/ (v1.5, 31.08.2026)
- onlinemarketing.de/technologie/chatgpt-ads-kommen-datum-europa (24.08.2026)
- sichtbarerwerden.de/ratgeber/ki-ads/chatgpt-ads-deutschland/ (Guide, gepflegt)
- mjmads.com/en/blog/chatgpt-ads-deutschland/ (02.09.2026)
- Brain-Rohdateien (extern, nicht im Paket): `raw/bookmark-2026-09-07-openai-chatgpt-ads-doku.md`, `raw/bookmark-2026-09-07-max-winkler-chatgpt-ads-DclJMTHo8V6.md`
