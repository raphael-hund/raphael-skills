# Regeln — E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)

Vertieft den kurzen E-E-A-T-Abschnitt in `regeln-technischer-audit.md` (dort nur die
4-Zeilen-Kurzfassung für den laufenden Audit). Diese Datei bei echten Content-Qualitäts-
Fragen laden: "rankt die Seite das, was sie verdient?", YMYL-Themen, Autoren-Setup,
AI-Content-Freigabe.

Quelle: `seo-content`-Skill + `references/eeat-framework.md` aus AgriciDaniel/claude-seo
(MIT-Lizenz, Commit `6cf1ea9`), übersetzt und condensiert. Datenpunkte (Dezember-2025-Update,
Rater-Guidelines) sind Stand des Quell-Repos (Redaktionsdatum ~Mitte 2026) — bei Bedarf gegen
aktuelle Google-Quellen nachprüfen, nicht blind als "heute noch gültig" übernehmen.

## Der Who/How/Why-Test (zuerst, vor jeder Sub-Bewertung)

Googles eigene Helpful-Content-Heuristik, bevor überhaupt E-E-A-T-Unterpunkte bewertet werden:

| Frage | Worauf achten |
|---|---|
| **Wer** hat es erstellt? | Sichtbarer Byline, Autoren-Bio, Credentials. Bei YMYL nicht verhandelbar. |
| **Wie** wurde es erstellt? | Prozess-Transparenz, wo Leser das erwarten würden (v. a. bei KI-Unterstützung). Eigene Recherche/Erfahrung statt reinem Zusammenfassen. |
| **Warum** existiert es? | "Um zu helfen", nicht "um Klicks zu bekommen". Warnsignale: Nischen-Einstieg ohne Expertise, Content-Refresh nur wegen Freshness-Signal, Text auf Wortzahl-Ziel geschrieben statt auf Antwortqualität. |

Sind alle drei Antworten schwach, ist die Seite unter den Helpfulness-Signalen des Core-
Algorithmus (seit März 2024 kein eigener Klassifikator mehr, sondern in jedes Core-Update
eingewoben) gefährdet.

## Die vier Säulen

**Trustworthiness ist die wichtigste Säule** — sie wird zusätzlich aus den anderen drei
abgeleitet, nicht nur eigenständig bewertet.

### Experience
- Erfahrungsberichte, Original-Fotos/Screenshots, eigene Daten, Case-Studies mit konkreten
  Details, Vorher/Nachher-Ergebnisse, Anekdoten, die sich nicht fälschen ließen.

### Expertise
- Autoren-Credentials (Bio, Zertifikate), fachliche Tiefe passend zur Zielgruppe, belegte
  Behauptungen, korrekt verwendetes Fachvokabular, aktuell zum Stand des Feldes.

### Authoritativeness
- Von anderen zitiert, externe Erwähnungen/Backlinks von Autoritätsseiten, Branchenpreise,
  konsistente Publikationshistorie im Themenfeld, Medien-Erwähnungen.

### Trustworthiness
- Kontaktinformationen/Impressum, Datenschutz/AGB, durchgängig HTTPS, Transparenz über
  Ersteller und Zweck, echte Kundenbewertungen, sichtbare Korrektur-/Update-Historie, keine
  irreführende Praxis (versteckte Ads, Clickbait).

## YMYL — Umfang seit Ende 2025 breiter als früher

YMYL-Themen (höchste E-E-A-T-Anforderung): Gesundheit/Sicherheit, Finanzberatung/-transaktionen,
Rechtsinformationen, News/aktuelle Ereignisse, Wahlen/demokratische Prozesse (laut Quelle 2025
neu ergänzt), Inhalte über Personengruppen (Schadenspotenzial).

**Wichtig für die Beratung:** Laut Quelle wurde die Prüfung mit einem Core-Update Ende 2025
faktisch auf praktisch alle wettbewerbsintensiven Suchanfragen ausgeweitet, nicht mehr nur auf
klassisches YMYL — auch anonyme/generische Autorenschaft außerhalb von YMYL wurde strenger
bewertet. Konkrete Prozentzahlen aus dem Quell-Repo (Traffic-Einbrüche nach Branche) sind nicht
selbst nachgeprüft und gehören **nicht ungeprüft** in einen Kundenreport (Belegpflicht) — als
Kontext für die eigene Priorisierung aber brauchbar: Autoren-Byline und Trust-Signale zuerst
härten, unabhängig von der Branche.

## KI-Content-Bewertung (Rater-Guideline-Ergänzung)

- KI-generierter Content ist **akzeptabel**, wenn er echtes E-E-A-T zeigt, einzigartigen Wert
  liefert, menschliche Durchsicht/Bearbeitung hatte und originelle Einsichten enthält.
- Schwache KI-Content-Marker: generische Formulierungen ohne Spezifik, kein Originalgedanke,
  repetitive Struktur über mehrere Seiten, keine Autoren-Zuordnung, Sachfehler.
- Neue Spam-Kategorien, die im Zusammenhang stehen: Expired-Domain-Abuse (Domains wegen ihrer
  Backlinks kaufen), Site-Reputation-Abuse (reputable Domain für Low-Quality-Content
  missbrauchen), Scaled-Content-Abuse (Massenproduktion ohne Mehrwert).

## Praktischer Check pro Seite (Reihenfolge)

1. Who/How/Why-Test bestehen — sonst sofort Priorität 1.
2. Byline + Autoren-Bio vorhanden und plausibel zum Thema?
3. Mindestens ein Experience-Signal (eigenes Beispiel/Daten/Foto) vorhanden?
4. Trust-Grundlagen sitzen (Impressum, Datenschutz, HTTPS, Kontakt)?
5. Bei YMYL-nahen Themen: strengere Prüfung aller vier Säulen, keine Kompromisse bei Byline.

## Gotchas

- **Trustworthiness zuerst reparieren, nicht zuletzt.** Es ist die höchstgewichtete Säule und
  hängt an einfachen, schnell behebbaren Dingen (Impressum, HTTPS, Kontakt) — oft der schnellste
  Hebel im Audit.
- **KI-Autorenschaft ist kein automatisches Minus**, solange Who/How/Why bestehen bleibt — nicht
  pauschal "das ist KI-Content, also schlecht" urteilen.
- **YMYL-Grenze nicht zu eng ziehen.** Auch scheinbar harmlose Themen (Lifestyle, Ratgeber) sind
  seit der breiteren Auslegung nicht automatisch von E-E-A-T-Anforderungen ausgenommen.
