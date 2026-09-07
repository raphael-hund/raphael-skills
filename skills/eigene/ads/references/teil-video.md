# Teil Video — Ads-Skripte schreiben

Das ist der Schreibweg. IDs kommen nach dem ersten Entwurf, nicht davor.

## Was ein gutes Skript tut

Der Zuschauer scrollt stumm. In Atem 1 weiß er: das geht mich an.
In Atem 2 sieht er einen Beweis. Am Ende weiß er, was nach dem Klick passiert.

Klingt wie eine Sprachnachricht. Für Diktat, Drehbrief oder wiederkehrende
Produktion zusätzlich `video-produktion.md` lesen; dort liegen auch die Wispr-Vorlagen.

## Bevor du schreibst (5 Dinge)

0. Lies das eigene Lern-Register des Kunden, wenn vorhanden:
   `/root/clients/<slug>/ads/lern-register.md`. Eigene Resultate schlagen jede
   Markt-Referenz. Was dort als tot markiert ist, wird nicht wieder gebaut.
1. **Wer + was er bekommt.** Aus Teil ICP oder aus dem, was der User sagt.
2. **Ein echter Proof.** Prüffähiger Case, Demonstration oder Artefakt mit Quelle.
   Ein Name oder eine Zahl ist optional. Fehlt ein tragfähiger Beleg: `proof: fehlt`.
   Keine Kundenzahl erfinden. Markt-Referenzen belegen nur die Bauform.
3. **Ein Segment.** Den absoluten Loader-Pfad aus dem Ads-Einstieg nutzen.
   Genau ein File unter `maerkte/`. Coaching-Umsatz nicht in Local-Service kopieren.
4. **Wie das Video aussieht.** Lade genau eine Datei:
   `craft/video.md`.
   Nicht den ganzen Ordner. Ohne diese Datei kein Skript.
5. **Passendes Wissen.** Über `wissen/index.md` die zur Testfrage passende
   Referenz wählen. Beispielsweise Regan für einfache Hooks oder eine belegte
   Evers-Variante für eine Bildschirm-Erklärung. Quelle und eigene Ad trennen.

Alle Pfade gelten von dieser Datei aus (`ads/references/`).
Optional Tiefe, nie vorher alles laden:
`craft/video.md`, `craft/referenzkatalog.md` und die lokalen Autorenregister.
Grosse Learning-Register gezielt durchsuchen; Referenztexte nicht als eigene
Kundenbehauptung übernehmen.

## Vier Hook-Lagen

Ein Hook ist kein Satz. Er sitzt in vier Lagen gleichzeitig:

1. **Bild** — erster Frame. Gesicht, Ort, Beweis-Objekt. Stumm verständlich.
2. **Satz** — gesprochener Opener, kurz und beim ersten Hören verständlich.
3. **Handlung** — was im Clip passiert: zeigen, tippen, umdrehen, schneiden.
4. **Primary Text** — Text über der Anzeige, nicht die Untertitel-Zeile.

Der erste Frame muss auch stumm verständlich sein; ein Overlay kann dabei helfen.
Ein zusätzlicher Headline-Overlay kann die Stimme ergänzen. Untertitel geben
die Sprache korrekt wieder; dafür ist Wiederholung richtig. Aussage und Bild
dürfen sich nicht widersprechen.

Nach einem Static-Sieg denselben Hook in Formate übersetzen.
Nicht neu erfinden. Dieselbe Behauptung, neues Bild.
Die Hook-Fabrik (`hormozi-paid-ads.md`) ist eine mögliche Methode für Varianten,
keine Pflichtmenge. Jeden neuen Einstieg auf den passenden Body abstimmen;
Testfrage und Datenlage bestimmen den Umfang.

Formate: Talking Head, B-Roll, Green Screen, Skit, Split Screen.
Nach einer belegten Basis zusätzlich Evers' Variantenmatrix (`marc-evers-playbook.md`):
dieselbe Ad in Problem/Lösung/Social Proof/Preis/FOMO/Angst und in UGC, Static,
Split Screen, Green Screen, High Production, Screen Recording/Proof.
Wahl und Aussehen stehen in `video-visuals.md`.

## Schreib-Reihenfolge

### 1. Satz 1 laut

Mit wenigen Worten Thema und Relevanz eröffnen: etwa Offer/Ergebnis, konkrete
Situation, belegter Proof oder Neugier. Zahl, Name und Callout sind mögliche
Einstiege, kein Zwang. Ein Claim darf nicht für eine Wortgrenze verfälscht werden.
Kein „Herzlich willkommen". Kein „In diesem Video".

### 2. Sprechtext in einem Stück

Default-Länge: 20–40 Sekunden (Local-Service: Handwerk, Praxis, Termin
ohne Sales-Call). High-Ticket 60–90 (Agentur, Beratung, Sales-Call nötig).
Sätze 6–15 Wörter, Länge springt. Duzen, außer der Kunde siezt belegt.
Diese Längen sind Planungshilfen. Eine kurze Content-Einladung und ein
ausführliches Testimonial brauchen andere Umfänge; Aufgabe und Belegmaterial
bestimmen die Wahl. Eigene Evers-Anzeigen zeigen diese Spannweite im Playbook.

Füllgerüst (A2 kurz, der häufigste Video-Default):

```
HOOK     Thema und Relevanz; Zahl oder Name nur mit passendem Beleg
PAIN     was heute schiefgeht, in seiner Sprache
SYSTEM   tatsächlicher Mechanismus, 1–2 Sätze; keinen Methodennamen erfinden
PROOF    ein Case oder ein sichtbares Artefakt
OFFER    was er bekommt
CTA      Aktion + Ort + was danach; Frist nur, wenn tatsächlich vereinbart
```

High-Ticket mit mehreren Cases: A1 (Case-Stack).
Geo plus kleiner Check: A6.

### 3. Caption und Bild

Gut lesbare, inhaltlich korrekte Untertitel. Headline-Overlay nur, wo es ergänzt.
`[ZEIGEN: …]` pro Beweis-Beat. Einen geplanten Overlay samt Zeitpunkt benennen.

### 4. Drei Hook-Varianten

Drei Varianten, davon mindestens zwei wirklich verschiedene Einstiege
(nicht drei Paraphrasen). Je Variante nur Satz 1 plus ein Brückensatz.
Nach Static-Sieg: Varianten als Formate, nicht als Worttausch.

### 5. Gate

```
python3 "$ADS_ROOT/scripts/text-check.py" <skript.md>
```

Exit 1 = nicht ausliefern.
Kraftwort im Hook darf bleiben, wenn es ein Mensch so sagt. Nie im CTA.
Nie „nicht X, sondern Y". Nie drei gleich lange Sätze.

## Fertig nur wenn

- Einstieg macht Thema und Relevanz früh erkennbar; jede Zahl/jeder Name ist belegt
- CTA nennt Aktion und was danach passiert
- Jede Kundenzahl hat eine Quelle oder das Feld heißt `proof: fehlt`
- Lokaler text-check Exit 0
- Laut gelesen klingt es wie eine Sprachnachricht
- Die vier Lagen stehen im Skript, nicht nur der Sprechtext
- video-visuals.md war geladen
- Lern-Register des Kunden gelesen (Pflicht, wenn vorhanden): keine als tot markierte Bauform erneut

## Anti-Skript (nie so)

Wenn du [ICP] bist und [Outcome] willst, brauchst du [Offer].
Wir bieten ein individuelles Konzept.
Tischtennis spielen ist wie LinkedIn Ads.
Learn more.

## Ausgabe

Eine Datei pro Skript: Sprechtext, Hook-Varianten, `[ZEIGEN]`-Zeilen, CTA,
Format (Talking Head / B-Roll / Green Screen / Skit / Split Screen),
vier Lagen, `winner-basis` oder `kein Performance-Datensatz`, Quellen.
