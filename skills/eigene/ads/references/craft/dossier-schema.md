# Angle-Dossier und Creative-Analyse

Selbstständiges Schema für den Ausgang von [Teil Research](../teil-research.md).
Für einen reinen Library-/Playback-Auftrag genügt das Protokoll in
[Meta Ads Library](../meta-ads-library.md). Kein kompletter Strategieauftrag
entsteht automatisch aus der Bitte, eine Ad anzusehen.

## Umfang und Quellenstand zuerst

```yaml
---
kunde: <slug oder allgemeine Recherche>
datum: YYYY-MM-DD
segment: <ein Hauptsegment aus segment-map.md; weitere Kontexte separat erklären>
kundenkontext: vorhanden | teilweise | fehlt
umfang: <bereitgestelltes Material / öffentliche Konkurrenz / definierte Quellen>
meta_ui: gesichtet | blocked | nicht_beauftragt
meta_ui_grund: <tatsächlich beobachteter Grund, falls nötig>
meta_api: genutzt | fehlgeschlagen | nicht_genutzt
foreplay: genutzt | nicht_genutzt
playback: vollständig | teilweise | nur_frames | nicht_möglich | nicht_beauftragt
---
```

Die Felder dokumentieren den tatsächlich genutzten Kanal. Fehlender API-Token
beweist keinen Browserfehler; Foreplay ist keine Meta-Oberflächensichtung.
Frames belegen die angesehenen Bildmomente. Die Abdeckung eines vollständigen
Playbacks muss separat nachgewiesen werden.
Automatisches Transkript, gesprochener Ton und sichtbarer Text getrennt führen.

Vorhandenen ICP, Kundenabsprachen und Ergebnisse verwenden. Fehlen sie, kann
allgemeine Recherche weiterlaufen: Annahmen als Annahmen führen. Lokale
[Segmentdateien](../segment-map.md) liefern Orientierung. Kein Brain-Abruf ist
für das Schema nötig. Ablage im tatsächlichen Kundenrepo unter
`ads/research/<datum>-angle-dossier.md`, sonst am vereinbarten lokalen Ort.

## Dossier-Blöcke

### 1. Zielgruppe und Entscheidung

Pro belegtem Slice Rolle, Situation, Suchanlass, Kaufentscheidung und
Ausschlussgrund notieren. Quelle mit Datum und kurzer Fundstelle. Ein vermutetes
Slice darf unter „zu prüfen“ stehen; es wird nicht als Nutzerzitat ausgegeben.

### 2. Pains, Wünsche und Einwände

Pro Eintrag: kundennaher Wortlaut oder klar markierte Paraphrase, Herkunft,
Relevanz für das Angebot, Gegenbelege und offene Frage. Nicht künstlich auffüllen,
um eine feste Anzahl zu erreichen. Anzahl unabhängiger Quellen dokumentieren;
„drei Quellen“ macht eine Aussage nicht automatisch sicher. Qualität,
Passung und Unabhängigkeit entscheiden über die Aussagekraft.

### 3. Creative-Beobachtungen

| Feld | Inhalt |
|---|---|
| Quelle | Original-URL, Ad-/Post-ID, Autor, Abrufdatum und Zeitraum |
| Medientyp | Static, Video, Carousel; Kind-ID und Position bei mehreren Medien |
| Abdeckung | Text, Ton, gesichtete Frames oder Playback-Zeitbereiche |
| Beobachtung | Was direkt lesbar, hörbar oder sichtbar ist; mit Fundstelle |
| Autorenbehauptung | Was der Werber behauptet; etwa Resultate oder Spend |
| Einordnung | Hook/Angle/Architektur, Ad-Aufgabe und Awareness-Hypothese |
| Übertragung | Was am eigenen Lead-Gen-Angebot sinnvoll testbar ist |
| Grenze | Was fehlt, unklar ist oder im Zielmarkt nicht gilt |

Laufzeit, Duplikate, Likes und Anbieter-Rankings beschreiben Auswahlkriterien.
Sie beweisen weder Gewinn noch qualifizierte Leads. Summierte Ad-Reichweiten
sind nicht automatisch deduplizierte Personen. Geschätzter Spend bleibt eine
Rechnung mit Annahmen. Originalzitate kurz halten; die Ableitung in eigenen
Worten schreiben.

### 4. Angles und Testhypothesen

```text
Angle-ID: <eindeutig im Dossier; Kategorie bei Bedarf static:Axx>
Job: <welchen Grund zum Handeln macht die Ad verständlich?>
Passt zu: <Zielgruppenslice und belegter Pain/Wunsch/Einwand>
Grundlage: <Beobachtung + Quelle oder als neue Hypothese gekennzeichnet>
Kundenclaim: <tatsächliche Leistung; benötigter eigener Beleg>
Test: <konkrete Veränderung und erwartetes qualifiziertes Ergebnis>
Grenzen: <z.B. Creator verkauft Coaching, Kunde verkauft lokale Dienstleistung>
Status: <belegt anwendbar / Testhypothese / wartet auf Beleg / verworfen>
```

Der Angle ist eine redaktionelle Hypothese; er muss kein wörtlicher Satz aus
einer fremden Ad sein. Seine behaupteten Fakten benötigen dagegen Belege.
Kundenvorgaben oder eigenen Resultaten widersprechende Ideen unter „Verworfen“
mit Grund erhalten, statt sie still als Empfehlungen weiterzureichen.

### 5. Awareness, Format und Funnel

Hauptstufe samt Begründung: unaware, problem-aware, solution-aware,
product-aware oder most-aware. Audience-Temperatur und Awareness sind verwandt,
aber nicht identisch. Einen Erstkontakt nicht automatisch als unaware einstufen.

Static, Video oder beide nach Erklärungsbedarf, vorhandenem Material,
Kundenresultaten und Testfrage wählen. Den Streit Static-first/Video-first
nennen, wenn er die konkrete Entscheidung betrifft; kein universelles
Formatgesetz aus einem Creator-Beispiel ableiten. Ad, Formular/Landingpage,
Follow-up und Sales-Prozess müssen dieselbe Leistung und denselben nächsten
Schritt beschreiben.

### 6. Messung und Übergabe

Für Lead-Generation Definitionen vor Zahlen: Was zählt als Lead, qualifiziert,
gebucht, erschienen und gewonnen? Pro Stufe Quelle, Zeitraum, Zählweise und
verfügbare Rückmeldung ins Werbesystem notieren. CTR und günstige CPL dürfen die
Kosten pro qualifiziertem Termin oder Kunde nicht ersetzen. Attribution und
verzögerte Abschlüsse begrenzen schnelle Schlussfolgerungen.

Abschluss enthält Quellenliste, Materiallücken, Entscheidungen, offene
Hypothesen und den existierenden absoluten `DOSSIER`-Pfad mit `SEGMENT`.
Keine Secrets, Token oder signierten Download-URLs in den Bericht übernehmen.

## Aus Referenz-Videos eine Struktur ableiten

**Erst jedes Video, dann den Vergleich.** Pro Beat Funktion, kurze Textfundstelle
oder Zeitcode, Wortzahl, sichtbaren/gehörten Vorgang und vermuteten rhetorischen
Job festhalten. Der Job ist Interpretation. Der Hook endet beim inhaltlichen
Funktionswechsel, nicht nach einer willkürlichen Satzzahl.

Danach die Beat-Folgen nebeneinander legen: gemeinsame Reihenfolge, Auslassungen,
abweichende Angebote, CTA-Typen und Länge. Gleiches Video mit mehreren Hooks
gehört in eine Variantenfamilie. Häufigkeiten als `n von N` mit Nenner und
Quellenumfang angeben. Ein kleiner Bestand liefert Beispiele; er wird nicht
durch feste Mindestzahlen zu einem allgemeinen Marktgesetz.

Ein übertragbares Gerüst nennt pro Slot seine **Aufgabe**: Relevanz,
Problem/Mechanismus, Beleg, Angebot, nächster Schritt. Vorhandene Sprache und
Kundenmaterial füllen die Slots. Details: [Video](video.md),
[Statics](statics.md), [Referenzkatalog](referenzkatalog.md).

## Fertig, wenn der nächste Arbeitsschritt ohne Raten möglich ist

Quellen und Sichtungsumfang sind nachvollziehbar; Beobachtung, fremde Aussage
und eigener Testvorschlag bleiben getrennt. Kundenclaims haben eigene Belege
oder stehen als Materiallücke. Die Formatwahl und die messbare Testfrage sind
begründet. Ungesichtete Bilder erzeugen keine neuen Aussagen über Layout,
Schnitt oder Gestik. Ein dokumentierter Zugangsfehler begrenzt die Recherche,
wird aber nicht als erfolgreiche Sichtung ausgegeben.
