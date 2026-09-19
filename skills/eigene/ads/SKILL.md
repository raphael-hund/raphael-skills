---
name: ads
description: >
  Generisches Produktions-Framework für Paid Ads: Strategie auswerfen, Statics
  bauen, Videos bauen. Nutzen bei: Ads bauen, Hooks schreiben, Video-Skripte,
  Ads Scripts, Static-Briefs, Testwellen, Werbebibliothek-Recherche (Meta Ads
  Library mit Playbacks/Bildbelegen), Offer bauen (Hormozi), Kill/Keep/Scale,
  Cialdini-Psychologie, CPL-/Deckungsbeitrag-Rechnung, Diagnose (Ad performt
  nicht), Wispr-Diktat und Drehbrief. Nicht für: E-Commerce-ROAS-Optimierung,
  Plattform-Konto-Setup-Anleitungen (Ads Manager Klick-Führung), Google Ads,
  Landingpage-Umsetzung, organische Content-Strategie. Funktioniert für jeden
  Kunden; references/eigene-regeln.md ist Methodik-Vorlage, keine Kundenvorgabe.
metadata:
  raphael-version: "6.0.0"
  raphael-class: "F"
  raphael-scope: "agency"
  raphael-sensitivity: "internal"
  raphael-requires-skills: "[]"
  raphael-changelog: "[\"6.0.0 (18.09.2026): Radikal verschlankt auf Chef-Direktive — Skill ist generisches Framework für Strategie/Statics/Videos; MAKE-Interna, Vendor-Dumps, Roh-Archive und Creator-Rohbibliothek entfernt (purge-log.md)\", \"5.0.0 (18.09.2026): Mega-Merge ads+ads-statics+ads-video+Wiki+Lehren-Kanon+Nuggets+Recherche 2026-09-18\"]"
  raphael-completion-criteria: "[\"Passender Teil und lokal aufloesbare Referenzen gelesen\", \"Originalquelle, Aussage und Leadgen-Anwendung getrennt\", \"Keine erfundenen Kundenergebnisse oder unbelegten Performance-Gewinner\", \"Sichtungs- und Erfassungsluecken ausgewiesen\", \"Kontoaktionen nur im autorisierten Umfang\"]"
---

# ads — Produktions-Framework: Strategie auswerfen, Statics bauen, Videos bauen

Start bei `references/INDEX.md` — er routet jede Aufgabe zur richtigen Datei.

Der Skill leistet drei Dinge, generisch für jeden Kunden: **Strategie auswerfen**
(Konzept, Formatwahl, Testwelle, Messplan), **Statics bauen** (Briefs und Copy nach
`references/statics/`), **Videos bauen** (Skripte und Drehbriefe nach `references/video/`).

**Nicht zuständig:** E-Commerce-ROAS-Optimierung, Plattform-Konto-Setup als
Klick-Anleitung (Ads Manager), Google Ads, Landingpage-Umsetzung, organische
Content-Strategie.

**Vorrang-Ordnung bei Konflikten (oben gewinnt):**
1. Kundenauftrag und Kunden-Lern-Register
2. Chef-Entscheide in `references/konflikt-register.md` (Sammelstelle: `references/chef-entscheide.md`) — vor jedem Creator-Rat
3. Craft-Kanon (`references/craft/`, `references/eigene-regeln.md` als Methodik)
4. Chef-SOP (`references/doktieren-sop.md` — Anregungs-Layer, kein Gesetz)
5. Creator-Rat (`references/marc-evers-playbook.md`, `references/zac-regan-startrunningads.md`, `references/hormozi-paid-ads.md`, `references/brandon-willington-playbook.md`, `references/shiver-gordon-taktiken.md`)
6. Fremd-Benchmarks (nie als eigene Schwelle verkaufen)

## Schritt 0

`ADS_ROOT` = Ordner der tatsächlich geladenen `SKILL.md`; diesen absoluten Pfad
für Shell-Aufrufe einsetzen.

```bash
python3 "$ADS_ROOT/scripts/load-wissen.py" --skill ads --kunde <slug|leer>
```

Der Loader nennt den Einstieg und das passende Segment unter `references/maerkte/`.
Ohne bekannten Kunden `--segment` aus dem Auftrag wählen oder `uebertragbar`
verwenden; keine Kundenannahmen einsetzen. Aufgelöste Dateien tatsächlich lesen.

## Welcher Teil

| Auftrag | Datei |
|---|---|
| Strategie, Konzept, Testwelle, Static oder Video | `references/teil-strategie.md` |
| ICP (wer kauft, was tut weh) | `references/teil-icp.md` |
| Research, Dossier, Werbebibliothek/Meta Ads Library | `references/teil-research.md` + `references/meta-ads-library.md` |
| Video-Skript (Ads Scripts), Wispr-Diktat, Drehbrief | `references/teil-video.md` + `references/video/` |
| Static-Brief, Statics S1–S8 | `references/teil-statics.md` + `references/statics/` |
| Ad Copy / Primary Text schreiben | `references/ad-copy.md` + `references/copy-referenztexte.md` |
| Offer bauen, Value Proposition, Hormozi | `references/offer-architektur.md` + `references/creative/offer-ergebnis-risikoumkehr.md` |
| Hooks schreiben | `references/hook-werkstatt.md` + `references/video/hook-formeln.md` |
| Laufende Ads, 7/30 Tage, Kill/Keep/Scale, Diagnose | `references/loop3-ablauf.md` + `references/eigene-regeln.md` + `references/messung/` |
| Claims, Compliance, was darf die Ad versprechen | `references/claims-verbote.md` |
| Messlatten, CPL-Rechnung, Baseline-Methodik | `references/eigene-regeln.md` + `references/leadgen-betriebsmodell.md` |
| Referenz-Korpus (711 Ads, Gewinner-Muster) | `references/korpus/` |
| Konflikte, Chef-Entscheide | `references/konflikt-register.md` + `references/chef-entscheide.md` |

Alles Weitere (Playbooks, Psychologie, Beispiele, Recherche-Stand):
`references/INDEX.md` ist der Voll-Router.

Video ist Default bei „Skript"/„Ads Scripts"; Performance ist Default bei
„Zahlen", „7/30 Tage", „laufende Ads". Nur den passenden Teil lesen, Detailwissen
über dessen Links ergänzen — nie alle Ordner auf einmal; GROSSE Dateien
(`korpus/`) gezielt per Abschnitt.

## Doktrin-Kern

1. Concept vor Pixel: Static = Persona x Angle x Offer x Format; die Botschaft schlägt die Produktion.
2. Kalter Leser zuerst: die Ad muss ohne Vorwissen und ohne Ton funktionieren.
3. Spezifisch schreiben: Namen, Zahlen, Zeitraum, Population — oder weglassen.
4. Proof muss echt sein: nie KI-generierte Chats, Testimonials, Gesichter oder Case-Zahlen.
5. Static testet die Message billig, Video vertieft nur validierte Gewinner. VSL ist die seltene Ausnahme für erklärungsbedürftige High-Ticket-Funnel, nicht die Standard-Endstufe (Korrektur 18.09.2026).
6. Die Formatfrage (Static/Video/parallel) nie still entscheiden — im Output begründen.
7. Beim Testen Struktur-Varianz: andere Angles und psychologische Effekte, keine Umformulierungen.
8. Jede Zahl trägt Geltungsbereich und Nenner; Fremd-Benchmarks sind keine eigene Schwelle.
9. Prozess-Hebel vor Creative-Diskussion: Reaktion so schnell wie möglich, am selben Tag (Chef-Entscheid 18.09.2026) und Nachfassen entscheiden oft mehr als die Ad.
10. Erlaubter CPL = Deckungsbeitrag x Lead→Verkauf-Quote (Ziel: CPL ≤ 50 % davon).
11. Eine Karte = eine Botschaft; Qualifier und eine Zahl im ersten Blick.
12. Claims-Prüfung vor jeder Schaltung (`references/claims-verbote.md`).
13. Jeder Test endet im Lern-Register: Beobachtung, Interpretation, nächste Testfrage.
14. Geld: Signatur — nie autonom schalten, pausieren oder skalieren.
15. Winning Variables dokumentieren: Offer, Person, Format, lokale Ansprache.
16. Wir optimieren auf Termine, nicht auf Lead-Preis und nicht auf Kosten (Chef 18.09.2026). Steuergrösse ist der Preis je Termin; CPL ist Diagnosegrösse, nie Zielgrösse.

## Reihenfolge

Strategie-Frage **nicht still** entscheiden: im Output Static-first, Video-first
oder begründeten parallelen Test nennen, dann drei Denkzeilen OBSERVE, THINK
(Unit Economics), CREATE — auch bei direktem Skript-/Statics-Einstieg.
Reihenfolge: ICP → Research → Video oder Statics. Fehlt ICP: holen oder
`kunden-layer: fehlt` schreiben, dann Craft-Kern. Jedes Video mit Spend wird
visuell und sprachlich ausgewertet (`scripts/media-extract.sh` liefert
Kontaktbögen, Body-Frames, Untertitel); Extraktion ersetzt keine Sichtung —
Bilder öffnen, Ton lesen/anhören, fehlendes Transkript ausweisen.

## Enthaltene Werkzeuge

- `python3 "$ADS_ROOT/scripts/load-wissen.py" --skill ads --kunde <slug>` — Schritt 0.
- `python3 "$ADS_ROOT/scripts/text-check.py" <entwurf.md>` — lokaler Copy-Check;
  Exit 1 = harte Muster; belegt weder rechtliche Freigabe noch Kundenzahlen.
- `bash "$ADS_ROOT/scripts/media-extract.sh" --doctor` — Medienwerkzeuge prüfen;
  mit Video-URL/Dateipfad entstehen lokale Analyseartefakte mit Sichtungsstatus.

## Bild-Produktion und externe Integrationen

Statics werden **immer mit Higgsfield gebaut, immer mit dem neuesten
GPT-Image-Modell (aktuell GPT Image 2.5)** — mit Referenzbildern für Stil und
Inhalt als Pflicht-Beigabe (Entscheid Raphael 18.09.2026, Details in
`references/teil-statics.md` Abschnitt «Bild»).

Weitere Integrationen nur nutzen, wenn installiert und für den Auftrag
sinnvoll: `copywriting`/forbidden-check (zusätzlicher Copy-Filter),
`no-ai-slop` (Slop-Erkennung), `claims-qa` (vertiefte Claims-Prüfung), `watch`
(Video-Sichtung/Transkription). Live-Konto- oder Foreplay-Zugänge sind
optionale autorisierte Integrationen; keine Secrets voraussetzen.

## Rot

- Alle Teile auf einmal laden
- Kundenzahlen erfinden
- Erfundene Case-Zahlen verwenden (Beleg: „$17.000→$107.000" ist verbrannt und entfernt)
- Fremd-Benchmarks als eigene Schwelle verkaufen
- KI-generierten Proof (Fake-Chats, Fake-Testimonials, KI-Gesichter als Case, erfundene ROAS-Screens)
- Coaching-Umsatz in Local-Service kopieren
- „Wenn du [ICP] bist und [Outcome] willst, brauchst du [Offer]"
- Static-first vs. Video-first still entscheiden
- Autonom schalten, pausieren oder Budget bewegen — Geld braucht Signatur
