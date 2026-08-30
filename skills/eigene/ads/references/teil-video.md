# Teil Video — Ads-Skripte schreiben

Das ist der Schreibweg. IDs kommen nach dem ersten Entwurf, nicht davor.

## Was ein gutes Skript tut

Der Zuschauer scrollt stumm. In Atem 1 weiß er: das geht mich an.
In Atem 2 sieht er einen Beweis. Am Ende weiß er, was nach dem Klick passiert.

Klingt wie eine Sprachnachricht.

## Bevor du schreibst (5 Dinge)

0. Lies das eigene Lern-Register des Kunden, wenn vorhanden:
   `/root/clients/<slug>/ads/lern-register.md`. Eigene Resultate schlagen jede
   Markt-Referenz. Was dort als tot markiert ist, wird nicht wieder gebaut.
1. **Wer + was er bekommt.** Aus Teil ICP oder aus dem, was der User sagt.
2. **Ein echter Proof.** Name oder Zahl mit Quelle. Fehlt beides: `proof: fehlt`.
   Keine Kundenzahl erfinden. Markt-Referenzen belegen nur die Bauform.
3. **Ein Segment.** `../scripts/load-wissen.py --skill ads --kunde <slug>`
   Genau ein File unter `maerkte/`. Coaching-Umsatz nicht in Local-Service kopieren.
4. **Wie das Video aussieht.** Lade genau eine Datei:
   `../../ads-video/references/video-visuals.md`.
   Nicht den ganzen Ordner. Ohne diese Datei kein Skript.
5. **Zac-Regan-Playbook.** Lade `zac-regan-startrunningads.md`. Hooks, Vier-Schritte-Ad
   und Steal-the-structure kommen von dort; Wortlaut nur aus dem zitierten Raw-File.

Alle Pfade gelten von dieser Datei aus (`ads/references/`).
Optional Tiefe, nie vorher alles laden:
`../../ads-video/references/hook-formeln.md`,
`../../ads-video/references/skript-architekturen.md`,
`../../ads-video/references/voice-dna-ads.md`,
`../../ads-video/references/playbook-geile-ads.md`,
`zac-regan-startrunningads.md`.

Zwei Volltexte derselben Bauform nur gezielt greppen, nie
`../../ads-video/references/korpus/referenz-ads.md` ganz (15k Zeilen).

## Vier Hook-Lagen

Ein Hook ist kein Satz. Er sitzt in vier Lagen gleichzeitig:

1. **Bild** — erster Frame. Gesicht, Ort, Beweis-Objekt. Stumm verständlich.
2. **Satz** — gesprochener Opener, max. 8 Wörter (12 mit exakter Zahl).
3. **Handlung** — was im Clip passiert: zeigen, tippen, umdrehen, schneiden.
4. **Primary Text** — Text über der Anzeige, nicht die Untertitel-Zeile.

Overlay-Text ab Frame 0. Stumm-Scroller lesen zuerst das Overlay.
Onscreen sagt etwas anderes als die Stimme. Nie denselben Satz zweimal.

Nach einem Static-Sieg denselben Hook in Formate übersetzen.
Nicht neu erfinden. Dieselbe Behauptung, neues Bild.
Skalierung über die Hook-Fabrik (`hormozi-paid-ads.md`): 30 Hooks × 10 Bodies
spleissen, bester Hook × bester Body. Winner ~100× variieren, bis er stirbt.

Formate: Talking Head, B-Roll, Green Screen, Skit, Split Screen.
Nach einem Winner zusätzlich Evers-6×6 (`marc-evers-playbook.md` Abschnitt 14):
dieselbe Ad in Problem/Lösung/Social Proof/Preis/FOMO/Angst und in UGC, Static,
Split Screen, Green Screen, High Production, Screen Recording/Proof.
Wahl und Aussehen stehen in `video-visuals.md`.

## Schreib-Reihenfolge

### 1. Satz 1 laut

Maximal 8 Wörter. Oder 12, wenn eine exakte Zahl drinsteht.
Erste 12 Wörter sind Callout, Proof, Garantie, Outcome oder Pain.
Kein „Herzlich willkommen". Kein „In diesem Video".

### 2. Sprechtext in einem Stück

Default-Länge: 20–40 Sekunden (Local-Service: Handwerk, Praxis, Termin
ohne Sales-Call). High-Ticket 60–90 (Agentur, Beratung, Sales-Call nötig).
Sätze 6–15 Wörter, Länge springt. Duzen, außer der Kunde siezt belegt.

Füllgerüst (A2 kurz, der häufigste Video-Default):

```
HOOK     wer + Zahl oder Name
PAIN     was heute schiefgeht, in seiner Sprache
SYSTEM   Mechanismus mit Eigennamen, 1–2 Sätze
PROOF    ein Case oder ein sichtbares Artefakt
OFFER    was er bekommt
CTA      Aktion + Ort + was danach + Frist
```

High-Ticket mit mehreren Cases: A1 (Case-Stack).
Geo plus kleiner Check: A6.

### 3. Caption und Bild

Karaoke-Untertitel durchgehend. Onscreen sagt etwas anderes als die Stimme.
`[ZEIGEN: …]` pro Beweis-Beat. Overlay ab Frame 0 benennen.

### 4. Drei Hook-Varianten

Drei Varianten, davon mindestens zwei wirklich verschiedene Einstiege
(nicht drei Paraphrasen). Je Variante nur Satz 1 plus ein Brückensatz.
Nach Static-Sieg: Varianten als Formate, nicht als Worttausch.

### 5. Gate

```
python3 /root/raphael-skills/skills/eigene/copywriting/scripts/forbidden-check.py <skript.md>
```

Exit 1 = nicht ausliefern.
Kraftwort im Hook darf bleiben, wenn es ein Mensch so sagt. Nie im CTA.
Nie „nicht X, sondern Y". Nie drei gleich lange Sätze.

## Fertig nur wenn

- Satz 1 trägt Zahl oder Name
- CTA nennt Aktion und was danach passiert
- Jede Kundenzahl hat eine Quelle oder das Feld heißt `proof: fehlt`
- forbidden-check Exit 0
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
