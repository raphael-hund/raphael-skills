# voice-analysis — Vorlage für VOICE.md (Kunden-Voice-Dossier)

**Herkunft:** Methodik adaptiert aus `knowledge-work-plugins/partner-built/brand-voice`
(Tribe AI, MIT-Lizenz) — Skills `guideline-generation` und `brand-voice-enforcement`.
Original ist auf Enterprise-Discovery (Notion/Confluence/Gong) ausgelegt; hier auf
Agentur-Maßstab reduziert: keine Plattform-Discovery, kein Agenten-Overhead — nur die
Denkmodelle und die Dossier-Struktur, angewandt auf das, was der Kunde beim Onboarding
tatsächlich liefert (Textproben, Website, Interview).

Diese Datei ist die Vorlage, auf die `onboard` Schritt 6 ("brand-voice") verweist, um
`client-<name>/wiki/VOICE.md` zu bauen. `copywriting` selbst nutzt sie als Referenz beim
Voice-Laden (Schritt 1), wenn eine belastbare VOICE.md fehlt und aus echten Textproben
abgeleitet werden muss.

## Kernmodell: Voice ist konstant, Ton flext

- **Voice** = WER der Kunde ist — Persönlichkeit, Werte, Identität. Ändert sich **nie**,
  egal ob Ad, Landingpage, Newsletter oder WhatsApp.
- **Ton** = WIE der Kunde in einer konkreten Situation spricht — Formalität, Energie,
  Fachtiefe. Flext je Kanal, wie ein Mensch mit einem Freund anders spricht als mit dem
  Finanzamt.

Häufigster Fehler (aus der Quelle übernommen, weil real beobachtet): Voice und Ton
verwechseln. Wenn der Kunde "lockerer" will, ist das ein Ton-Dial (Formalität runter,
Energie hoch) — nicht ein neuer Charakter. Die Persönlichkeit bleibt.

## "Wir sind / Wir sind nicht"-Tabelle

Der Anker des Dossiers. 4-7 Zeilen, jede mit Beleg aus einer echten Quelle (Zitat,
Textprobe, Interview-Aussage) — keine erratenen Adjektive.

| Wir sind | Wir sind nicht |
|---|---|
| **[Attribut]** — [was das konkret heißt] | **[Gegenstück]** — [wo die Grenze ist] |

Beispielzeile: **Direkt** — kommt sofort zum Punkt / **Nicht** schroff — Direktheit
schließt Empathie nicht aus.

Nicht jedes Attribut muss in jedem Text vorkommen — die 2-3 relevantesten für den
jeweiligen Kanal/die Zielgruppe reichen.

## Terminologie-Tabelle

| Spalte | Bedeutung |
|---|---|
| Pflichtbegriffe | Wörter, die der Kunde tatsächlich benutzt (aus Zitaten, nicht erfunden) |
| Bevorzugt | Klingt nach dem Kunden, aber kein Muss |
| Vermeiden | Klingt falsch/fremd, ist aber kein Totalausschluss |
| Nie verwenden | Harte Sperre (z. B. Konkurrenzsprache, Reizwörter, Jargon, den der Kunde ablehnt) |

## Tonalitäts-Matrix nach Kanal

Die drei Dimensionen (Formalität / Energie / Fachtiefe) je Kanal einstufen — deckt sich
mit der Frage aus Schritt 1 von `copywriting` ("Landingpage ≠ Ad ≠ Newsletter ≠
WhatsApp"):

| Kanal | Formalität | Energie | Fachtiefe |
|---|---|---|---|
| Meta-Ad (Hook) | niedrig-mittel | hoch | niedrig |
| Landingpage | mittel | mittel | mittel-hoch |
| Newsletter/Nurture | mittel | warm | mittel |
| WhatsApp/Direktnachricht | niedrig | mittel | niedrig |
| Kundenreport-Text | hoch | niedrig | mittel-hoch |

## Confidence-Stufen pro Sektion

Erfüllt die Pflicht aus `onboard`s `completion_criteria` ("Jede Persona-Aussage trägt
eine Confidence-Stufe"). Auf VOICE.md-Abschnitte angewandt:

- **Hoch:** Attribut/Begriff kommt in ≥3 unabhängigen Quellen vor (Website + Interview +
  echte Textprobe) UND ist explizit belegt (Zitat).
- **Mittel:** 1-2 Quellen, oder aus Muster abgeleitet (z. B. wiederkehrender Satzbau in
  mehreren Kundentexten, aber nicht explizit ausgesprochen).
- **Niedrig:** Einzelquelle oder starke Interpretation nötig. Bei Niedrig: als offene
  Frage an den Kunden zurückspielen statt zu raten (deckt sich mit dem Verallgemeinerungs-
  Gotcha in `onboard`: lieber Feld leer lassen als erfinden).

Jede Sektion mit Niedrig-Confidence bekommt eine offene Frage mit einer Empfehlung —
nie eine Sackgasse ("wir vermuten X, bitte bestätigen" statt nur "unklar").

## Häufige Fehler bei der Anwendung

1. Alle Voice-Attribute gleichzeitig auf Maximum ziehen — 2-3 führende reichen pro Text.
2. Voice mit Ton verwechseln (siehe oben).
3. Das Dossier als starre Checkliste statt als Leitplanke behandeln — Text muss natürlich
   bleiben, nicht mechanisch abgehakt wirken.
4. Zielgruppe ignorieren — dieselbe Voice klingt bei einer B2B-Ansprache anders als bei
   einer Story-Ad, das regelt die Tonalitäts-Matrix, nicht die Voice selbst.
