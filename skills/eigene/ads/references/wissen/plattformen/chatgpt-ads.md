# ChatGPT Ads: Stand, Format, Gebote und Grenzen für Leadgen in DACH

Stand: 7. September 2026. Gültig bis zur nächsten Prüfung, spätestens 7. Dezember 2026, weil OpenAI die Ad Policies monatlich ändert (Changelog v1.0 März bis v1.5 August 2026). Quellen sind sechs offizielle OpenAI-Seiten, am 07.09.2026 im Volltext gelesen; die Brain-Rohdatei `raw/bookmark-2026-09-07-openai-chatgpt-ads-doku.md` hält die Einzelaussagen mit Zeilenbelegen. Kein Creator im Ads-Skill (Eric Steigner, Heik Stepanjan, Marc Evers, Zack, Zac Regan) behandelt ChatGPT Ads als Werbekanal; das einzige gefundene Reel dazu stammt von Maximilian Winkler (Agentur W&S, 28.08.2026) und liefert keine Leistungsdaten.

## Was gilt

- Ausspielung seit 24.08.2026 in 31 europäischen Märkten; Self-Service über den OpenAI Ads Manager seit 31.08.2026 für Deutschland, Österreich und die Schweiz. Die abrechnende Firma muss in einem gelisteten Land sitzen.
- Anzeigen sehen nur Nutzer der Free- und Go-Stufe. Plus, Pro, Business und erkannte Minderjährige bleiben werbefrei. B2B-Entscheider mit bezahltem Abo sind damit unerreichbar.
- Format: Advertiser-Name, Favicon, Headline, Beschreibung, Landingpage und ein Bild, platziert unter der ChatGPT-Antwort. Kein Video.
- Auslieferung nach Gesprächskontext und Absicht, Landingpage, Titel, Copy und Context Hints (Themen oder Keywords auf Ad-Group-Ebene, keine Exact-Match-Keywords, keine Garantie). Dazu Geo-Targeting, Plattform-Targeting, Custom Audiences und Produktfeeds.
- Gebote als CPM (Ziel Reach) oder CPC (Ziel Clicks) mit Maximalgebot je Ad-Group, Conversion-Optimierung verfügbar. OpenAI empfiehlt für den CPC-Start 3 bis 5 USD. Relevanzgewichtete Second-Price-Auktion.
- Messung über OpenAI Pixel, Conversions API und UTM-Parameter. Reporting: Impressions, Klicks, Spend, CTR, CPC, CPM, Conversions.
- Erlaubte Startkategorien: Konsumgüter und Haushalt, lokale Dienstleistungen, Reisen und Erlebnisse, digitale Produkte und Bildung. Finanz-, Gesundheits- und Rechtsdienstleistungen sind ausserhalb der USA verboten; ebenso Health-Coaching, Wellness-Claims, konkrete Stellenanzeigen, politische Inhalte.
- Landingpage wird mitgeprüft, Interface-Imitation ist verboten, keine Platzierung neben sensiblen Gesprächen.

## Anwendung für Leadgen

- Handwerk und lokale Dienstleister sind zulässig. Ein Test läuft mit Geo-Targeting auf das Einzugsgebiet, Context Hints aus den Kundensprache-Dateien und der bestehenden Leadgen-Landingpage. Prüfgrösse ist der Preis je qualifizierter Anfrage gegen Meta über 30 Tage.
- Vor dem ersten Euro die erlaubte CPL-Rechenkette anwenden: erwarteter CPC mal Klicks je Anfrage aus der gemessenen Landingpage-Conversion. Ohne diese Rechnung kein Budget.
- Die Statics-Bauformen aus dem Teil Statics (kalter Leser zuerst, Deal auf der Anzeige, ein Bild) passen auf das Format. Video-Skripte passen nicht.
- Pixel oder Conversions API und UTMs vor dem Start setzen, sonst bleibt der Kanal in Pipedrive unsichtbar. Die Auswertung folgt der 7-/30-Tage-Logik aus `loop3-ablauf.md`.
- Vor jedem Kundentest die Kategorie gegen die Ad Policies prüfen. Physiotherapie, Finanzberatung, Anwälte und Gesundheitscoaching fallen in DACH aus.

## Was fehlt

Kein CPC oder CPM für DACH bekannt. Granularität des Geo-Targetings (Radius, PLZ) nicht dokumentiert. Keine Lead-Formulare dokumentiert. Keine eigenen Kampagnendaten. Herstellerzahlen (1 Mrd. USD Run-Rate, 3x ROAS in einem E-Commerce-Fall, über 80 Prozent Neukunden bei einem Partner) sind Selbstauskunft und keine Benchmarks.

## Quellen

- https://openai.com/index/chatgpt-ads-expands-across-europe/ (18.08.2026, Update 31.08.2026)
- https://openai.com/index/expanding-access-to-ai-with-chatgpt-ads/ (31.08.2026)
- https://openai.com/index/new-ways-to-buy-chatgpt-ads/ (05.05.2026)
- https://help.openai.com/en/articles/20001207-ads-in-chatgpt-the-basics
- https://help.openai.com/en/articles/20001245-ads-manager-availability
- https://openai.com/policies/ad-policies/ (v1.5, 31.08.2026)
- Brain: `raw/bookmark-2026-09-07-openai-chatgpt-ads-doku.md`, `raw/bookmark-2026-09-07-max-winkler-chatgpt-ads-DclJMTHo8V6.md`, Kanonseite `wiki/craft/ads/plattformen/chatgpt-ads-dach-start.md`
