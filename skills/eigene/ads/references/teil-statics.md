# Teil Statics: Briefs, die ein Bild tragen

Ein Brief = ein Angle × ein Style (S1–S8) bei Dienstleistung und Angebot.
Bei Objektverkauf gilt der Abschnitt «Objektverkauf» unten: eine Botschaft, das Foto wechselt.
Bild erst nach Text und nach gezeigten Referenzen, immer über Higgsfield mit dem neuesten GPT-Image-Modell (aktuell 2.5), Referenzbilder für Stil und Inhalt sind Pflicht — nie Pillow (Entscheid Raphael 18.09.2026).
Style wählen **bevor** Copy.

## Pflicht vor dem Schreiben

0. Lies das eigene Lern-Register des Kunden, wenn vorhanden:
   `/root/clients/<slug>/ads/lern-register.md`. Eigene Resultate schlagen jede
   Markt-Referenz. Was dort als tot markiert ist, wird nicht wieder gebaut.
1. Lies `craft/statics.md`: S1–S8, Hook F01–F12, Callout C01–C06, Angle A01–A08 (Stil-/ID-Kanon).
   Das Pflicht-Schema für den Brief selbst ist `statics/brief-schema.md` — es füllen,
   nicht die historische Vorlage in craft/statics.md.
2. Lies die Angle-Datei zum gewählten Angle komplett (Ordner `statics/angles/`,
   z. B. `statics/angles/a02-problem.md`). Ein Brief ohne gelesene Angle-Datei
   wird nicht ausgeliefert.
3. Lies die zur Aufgabe passenden Beispiele in `craft/referenzkatalog.md`.
   Im Brief die tatsächlich verwendete Referenz und ihre Funktion nennen.
3. Prüfe die gelieferten oder lokal vorhandenen Bildbelege. Bei beauftragter
   Live-Recherche den Meta-/Foreplay-Weg aus `teil-research.md` nutzen.
   Eine optionale verbundene Notion-Sammlung kann ergänzen:

```
python3 "$ADS_ROOT/scripts/load-referenzen.py" \
  --kind static --suche "<segment-wort>"
```

Die lokale Wissensbibliothek genügt für das Handwerk. Eine nicht verbundene
Notion-Sammlung blockiert keinen Brief mit vorhandenem Kundenmaterial und Belegen.

Layouts: `creative/2026-07-20-referenz-static-ad-muster.md` (Baupläne) und
`statics/visual-styles.md`.
Schema: `statics/brief-schema.md` (kanonisches Pflicht-Brief-Schema, Festlegung
18.09.2026). `craft/statics.md` bleibt Stil-/ID-Kanon (Styles, Hooks, Callouts,
Angles, Produktionsanforderungen), nicht das Brief-Schema.
Alle Pfade gelten von dieser Datei aus (`ads/references/`).

S1–S8 kurz: Text-only, Native-UI, Testimonial, Chat, Schild,
Story-Selfie, Device/Dashboard, Quiz/Map/Product.
Wähle einen Style aus der gelesenen Datei, nicht aus dem Gedächtnis.

## Holen

1. Angle aus Teil Research. Fehlt das Dossier: Angle aus Teil ICP plus User.
2. Ein Segment über den absoluten Loader-Pfad im Ads-Einstieg.
3. Grounding-Quelle: Review, Winner-Ad, Kommentar oder VOC-Zitat

Ohne Grounding: kein Brief. Die Zelle steht nur als Zeile auf der
Material-Liste im Batch-Kopf. Nicht erfinden.

## Schreiben

Pro Brief:

- Angle + woher er kommt
- Style S1–S8 + Format (Style steht fest, dann Onscreen-Copy).
  Ein GPT-Image-Lauf pro Karte (3:4-Master), Feed 4:5 als lokaler Crop, Story 9:16 als symmetrisches Streifen-Outpaint (je 285 px oben und unten, Feed pixelgenau); kein «Visualisierung» im Bild, Offenlegung im Primary Text; kein Edit-Lauf, keine lokalen Blur-Ränder (Raphael 08.09.2026, Details `higgsfield/references/ops.md`). Ausschnitt und Safe-Zones je Placement prüfen.
- Onscreen-Copy: ganze Sätze, die ein Fremder in einer Sekunde auf dem Handy versteht.
  Konkreter Nutzen und erkennbares Angebot. Geld- oder Rankingwerte nur mit eigenem Beleg. Kein internes Wissen
  (keine Listen-Quote, kein CRM-Bruch, kein «13 von 87»).
  Jede Zeile hat Subjekt und Verb. Kein Telegramm («Platz 1 / 30 Tage / kein Rappen» ist tot).
  Raphaels eigene Ads sind Material, nie die einzige Vorlage.
- Instant-Formular: Hook UND Deal in einer Ad (die eine Regel).
  Hook zuerst (Ergebnis, Callout oder Schmerz). Nie «Wir bauen …» als Opener.
  **Direkt danach steht, was der Klick bringt**, in einem Satz:
  etwa der angebotene Check und der tatsächliche nächste Kontakt.
  Bei direktem Instant-Form-Klick erklärt keine vorgeschaltete Landingpage den Deal. Wer ihn nicht auf der Ad sieht,
  weiss nicht, wofür «Jetzt bewerben» gilt.
  Beide Fehler sind rot: Feature-Opener ohne Hook. UND Hook ohne Klick-Grund.
  Zwei Fragen muss ein Fremder in einer Sekunde beantworten können:
  «Was macht die Firma?» und «Was passiert, wenn ich klicke?»
  Referenzen: Name plus Zahl (Jannis), Callout plus Outcome (Marc Evers),
  Pain mit Ausweg (Kaschinski), dann erst Offer und CTA.
- ICP-Filter: Rolle, Situation, Region oder belegte Voraussetzungen machen die
  Passung erkennbar. Creative allein garantiert keine Qualifikation; Formulare,
  Kontakt und spätere Qualität gemeinsam prüfen.
  Der Callout steuert als eigenes Element, WER bleibt; der Angle steuert, WAS
  die Ad will (Proof, Problem, Outcome, Verlust, Vergleich, Mechanismus, Garantie, Haltung).
- Friction-Waage (Hormozi): Reibung nach der diagnostizierten Lücke wählen.
  Eine sinnvolle Frage kann Passung klären, eine unnötige kann gute Kontakte
  ausschliessen. Qualitätskosten und Abschlüsse vergleichen; weder mehr Felder
  noch ein Plattformwechsel sind automatische Reparaturen.
- Kein Interpretationsspielraum (Evers): Ad plus Formular beantworten drei Fragen
  unmissverständlich: warum du, was das Angebot, was nach dem Eintrag passiert.
  Der CTA nennt den konkreten nächsten Schritt («wir melden uns in 24 Stunden»).
  Qualifizierung und tatsächlich gemeldete Events prüfen. Aus unpassenden Leads
  allein folgt keine bewiesene Diagnose des Algorithmus.

## Formular (die zweite Hälfte der Ad)

Das Instant-Formular gehört zum Brief, nicht erst zur Schaltung:

- **Qualifikation passend zum Offer:** notwendige Voraussetzungen und tatsächliche
  Ausschlusszweige prüfen. Reihenfolge anhand Verständlichkeit und Abbruchdaten wählen.
- **Wenige Fragen, echte Reibung:** jede Frage muss filtern, nicht dekorieren.
  Manuelle Eingabe kann Absicht und Datenqualität prüfen, erzeugt aber auch Abbrüche.
- **Bearbeitung:** vereinbarte Reaktionszeit, Öffnungszeiten und Kapazität festlegen.
  Buchung, Passung, Erreichbarkeit und Dringlichkeit unterscheiden. Ein gebuchter
  Termin ist noch kein erschienener oder qualifizierter Termin.
- Ad-Versprechen und erste Formular-Frage nennen denselben Deal (Kongruenz).
- Primary Text (kurze Absätze, höchstens ein Gedankenstrich)
- Bild-Beschreibung so konkret, dass jemand ohne Rückfrage bauen kann
- Grounding-Quelle
- Status: sofort oder wartet auf Material

Primary Text: erster Absatz trägt allein (Meta schneidet früh).
Zahlen nur mit Quelle. CTA ist ein verständlicher Satz.

## Gate

```
python3 "$ADS_ROOT/scripts/text-check.py" <brief.md>
```

Welle braucht vor Produktion eine Stopp-Regel (Metrik + Mindestlaufzeit).

## Kalter Leser zuerst (Raphael, 06.09.2026)

Der Leser kennt weder uns noch das Objekt. Die Headline sagt allein, was angeboten wird, wo, und was es bringt; Bullets listen, was er bekommt (mindestens zwei); ein Body-Satz erklärt bei Bedarf. Dann CTA. Verknappung, Vergleich oder Frage ohne Objekt sind als Headline Fail. Der Preis darf Headline sein, wenn Objekt und Ort dabeistehen («Was bekommen Sie für CHF 1,92 Mio in Umiken bei Brugg?»); Preis allein ist Fail. Fünf Textelemente (Eyebrow, Headline, Body, Bullets, CTA), kein Badge, keine Dopplung zwischen Elementen: `craft/statics.md`. Der verantwortliche Ads-Autor führt die finale Copy zusammen.

## Objektverkauf (Raphael, 03.09.2026)

Verkauft der Kunde ein Objekt mit Preis (Immobilie, Neubau, Fahrzeug, Möbel), gibt es
keine Angle-Wahl. Die Karte ist: Produkt gross im Bild, drei bis fünf Fakten, Preis oder
Preisanker, Verknappung als kleines Element, ein Button. Alle Karten einer Welle tragen
dieselbe Botschaft, nur das Foto wechselt (Aussen, Innen, Drohne, Portal-Look).
Beleg: Foreplay-Langläufer Specht Cuxhaven 529 Tage, Blumenauer München 345 Tage,
BUWOG Havel Lichter 142 Tage, Haus Arbor 142 Tage (Sichtung 03.09.2026, Dossier
`/root/clients/<slug>/ads/research/2026-09-03-angle-dossier-statics.md`).
Nicht auf die Karte: wer baut, seit wann, wie oft; Auswahl-Fragen; Lage-Dreiklänge;
alles, was der Käufer erst nach «Was ist das, was kostet es» wissen will.
Beispiel: `/root/clients/<slug>/ads/statics/welle-1-umiken/TEXT-UND-IDEE.md`.

## Bild (Raphael, 03.09.2026 abends; Standard verschärft 18.09.2026)

Text und Idee zuerst. Raphael sieht Logo, Look und Onscreen-Text. Dann das Bild —
**Statics werden immer mit Higgsfield gebaut, immer mit dem neuesten
GPT-Image-Modell (aktuell `gpt_image_2.5`; sobald ein neueres GPT-Modell in
Higgsfield verfügbar ist, gilt das)** (Entscheid Raphael 18.09.2026).

**Referenzbilder sind Pflicht, im Stil UND im Inhalt** (Entscheid Raphael
18.09.2026). Jeder Job bekommt die Referenzen mit:
`--image` Logo, `--image` Stil-Referenz (Look: Website, Winner-Ad oder
Referenzbild im gewünschten Stil), `--image` Inhalts-Referenz (Referenzbild zum
Inhalt: Projektfoto, Team, Szene). Prompt = JSON-Spec plus Text-Fidelity-Regel
in `higgsfield/references/ops.md` (Ads-Static). Fehlt Logo oder Referenz:
nicht bauen, erst besorgen.
Logo compositen, nie neu zeichnen. Pillow-Overlay auf Copy und Logo ist Fail.
Beweis-Kontexte (Screens, Cases, echte Gesichter) nie KI-generiert.

**Spezifität (Chef 18.09.2026):** So spezifisch wie möglich — Kundenlogo und/oder
Gesicht auf die Static, wenn vorhanden und freigegeben. Spezifität ist der Punkt.

Ein Brief, ein Style. Ein Angle bei Dienstleistung, eine Botschaft bei Objektverkauf. Keine Stil-Mischung in einer Karte.

## KI-Montage aus Kundenmaterial (Entscheid Raphael 18.09.2026)

Statics dürfen als **KI-Bild-Montage aus echtem Kundenmaterial** gebaut werden:
Kundenmaterial (Projektfoto, Hintergrund, Teamfoto) wird kombiniert — die KI
baut das Referenzbild nach und stellt **1–2 echte Teamleute posend** hinein,
wie ein Fotoshooting. Die Aesthetics sind frei. Erlaubt ist das, weil die
gezeigten Personen und das Material echt sind (Veto 58); **erfundene
Resultat-Claims bleiben verboten, Veto 57 (kein Fremd-Case) gilt** —
`claims-verbote.md` prüft weiter.

Zwei weitere Freigaben (Entscheid Raphael 18.09.2026): **Meme-Formate sind
erlaubt und werden getestet.** Eine **Static darf ohne Zahl laufen** — eine
Zahl ist ein Werkzeug, keine Pflicht (die Drei-Zeilen-Form unten bleibt die
klare Fallback-Form).

## Check vor Abgabe

- Lokales `craft/statics.md` gelesen
- Lern-Register des Kunden gelesen (Pflicht, wenn vorhanden): keine als tot markierte Bauform erneut
- Falls Taxonomie genutzt: Hook-, Callout- und Angle-ID mit passender Referenz (entfällt bei Objektverkauf)
- Tatsächlich gelesene Quelle aus lokalem Referenzkatalog, Kundenevidenz oder Live-Recherche genannt
- Style-ID S1–S8 steht im Brief
- Jede Onscreen-Zeile ist ein ganzer Satz (Subjekt + Verb), kein Telegramm
- Handy-Test: ein Fremder versteht in einer Sekunde, was die Firma tut und was der Klick bringt
- Headline-Test: nur die Headline gelesen, weiss ein Fremder, was angeboten wird und wo; keine Verknappung, kein Vergleich ohne Objekt als Headline; Preis nur zusammen mit Objekt und Ort
- Headline und CTA vorhanden; Body oder Bullets (mindestens zwei); Eyebrow nur ohne Dopplung; kein Badge
- Instant-Formular: Hook UND Deal in einer Ad; Hook first, danach der Klick-Grund in einem Satz
- Weder Feature-Opener noch Hook ohne Klick-Grund
- ICP-Filter: nur der ICP fühlt sich angesprochen (Schwelle, Rolle, Ort oder ICP-Rechnung)
- keine interne Zählung auf dem Bild
- Lokaler text-check Exit 0
- Bild über Higgsfield mit dem neuesten GPT-Image-Modell (aktuell 2.5) — mit Logo, Stil-Referenz, Inhalts-Referenz und Text-Spec (Chef 18.09.2026: immer so); Pillow-Overlay Fail
- Format: ein GPT-Image-Lauf pro Karte, 3:4-Master, Feed = lokaler 4:5-Crop, Story = symmetrisches 9:16-Streifen-Outpaint; Edit- oder Fix-Lauf auf das fertige Bild und lokale Blur-Ränder sind Fail (Raphael 08.09.2026, ersetzt 04.09.). Direkt-9:16 Fail

## Aus dem Leaf ads-statics (Merge 18.09.2026)

Übernommene Inline-Doktrin aus dem aufgelösten Leaf-Skill `ads-statics/SKILL.md`
(v2.13.0). Nur ergänzt, was oben fehlte; vorhandene Abschnitte gelten unverändert.

### Kalter Leser — Belege und Anti-Beispiele zum Abschnitt oben

Regeln stehen im Abschnitt «Kalter Leser zuerst» oben (Headline allein =
was/wo/wozu; Preis nur mit Objekt+Ort; «Nur die Headline»-Test vor jedem Brief).
Hier nur die Belege dazu:

- Beleg für die Headline-Verbote: 200+ gesichtete Immobilien-Ads (Foreplay,
  03.–06.09.2026) — keine einzige startet mit Verknappung, alle Langläufer starten
  mit Objekt und Ort. Verknappung höchstens als Bullet.
- Anti-Beispiele (Umiken, 06.09., verworfen): «Eine Terrasse, so gross wie eine
  Wohnung.» / «[12] von 17 sind verkauft.» / «Ab CHF [1,92] Mio.»
  Richtig: «Terrassenhaus mit über 100 m² eigener Terrasse.» / «Was bekommen Sie
  für CHF 1,92 Mio in Umiken bei Brugg?»

### Fünf Textelemente — Grössen-Hierarchie und Obergrenze

Grösse ist Rang (Headline = 100): Headline 100, CTA 45, Body 55, Bullets 42,
Eyebrow 36 (Eyebrow optional, mit Pin-Icon als Ort-/Objekt-Etikett). Pflicht:
Headline und CTA immer; Body oder Bullets, gern beide. Gesamt unter 35 Wörter —
zu viel Text ist häufiger Fail als zu wenig; wenn Headline und Bullets reichen,
gibt es keinen Body.
Beispiel mit allen Varianten: `/root/clients/ak-omega/ads/statics/COPY-VARIANTEN-2026-09-06.md`
(externe Konvention: Kundenrepo).

### Klarheit vor Handwerk (Raphael, 03.09.2026)

Wenn keine gute Zahl auf die Karte darf (kein Case, kein Screen), muss die Karte
viel klarer werden, nicht voller. Die Formeln F01–F12 und C01–C06 sind Werkzeug,
kein Pflichtprogramm. Auf einer Karte ohne Case gilt die Drei-Zeilen-Form:

1. **Zustand in einem Satz**, den der Leser sofort mit Ja oder Nein beantwortet.
   «Deine Kunden googeln dich. Bist du in den Top 3?»
2. **Versprechen mit Frist.** «Wir bringen dich in 90 Tagen in die Top 3 bei Google.»
3. **Null.** «Oder du zahlst 0 CHF.»

Fertig. Kein «ab 20k Monatsumsatz», kein «mit Fotoshooting», kein «in deiner Stadt
für deine Keywords», keine Mitwirkungsklausel. Das gehört ins Formular und in den
Vertrag, nicht aufs Bild. Branche kommt als ein Wort in Zeile 1 oder als Szene im Bild.

Test: Liest ein Fremder die Karte in einer Sekunde und kann das Versprechen in
einem Satz nachsprechen? Wenn nicht, streichen, bis es geht.

Anti-Beispiel (Welle 4, erste Fassung, 03.09. vormittags): «Neue Website mit
Fotoshooting plus Top 3 bei Google in deiner Stadt in 90 Tagen, sonst keinen
Rappen.» — sieben Bausteine in einem Satz, nicht nachsprechbar.
Richtig: «Top 3 bei Google in 90 Tagen, oder du zahlst 0 CHF.»

### Deliverable — kompakte Reihenfolge je Karte

Bild-Regeln selbst stehen im Abschnitt «Bild» oben (Higgsfield + neuestes
GPT-Image-Modell + Stil-/Inhalts-Referenzen als verbindlicher Standard). Hier nur
die Ablauf-Kurzform je Karte:

1. Onscreen-Zeilen (Callout, Problem oder Hook, Deal, CTA), ganze Sätze, unter 35 Wörter.
2. Primary Text, erster Absatz trägt allein.
3. Visuelle Idee: Szene in zwei Sätzen, Bildquelle, Stil-Chassis (S1 bis S8).
4. IDs: Style, Angle, Hook, Callout, Grounding-Referenz.
5. Referenzen Raphael zeigen, bevor das Bild läuft. Fehlt Logo oder Look, nicht bauen.
6. Umlaute 1:1, kein ß, kein ae/oe/ue in der Onscreen-Copy.
7. Ergebnis mit Read prüfen: Headline vollständig, Logo lesbar, Text = Spec.
   Fail → neuer Bild-Job, kein Pillow-Flicken.

Beleg für die Pillow-/Redraw-Härte: PROPFIN-Welle 1, Umiken-Karten v1 mit
Headline «Umike» und Logo-Matsch (KRITIK-KARTEN.md, externe Konvention: Kundenrepo).
Beispiel Text: `/root/clients/referenzkonto/ads/statics/welle-4-branchen/TEXT-UND-IDEE.md`
(externe Konvention: Kundenrepo).

Ein Brief ohne gelesene Angle-Datei ist unbelegt und wird nicht ausgeliefert.
