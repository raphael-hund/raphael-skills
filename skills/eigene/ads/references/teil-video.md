# Teil Video — Ads-Skripte schreiben

Das ist der Schreibweg. IDs kommen nach dem ersten Entwurf, nicht davor.

## Was ein gutes Skript tut

Der Zuschauer scrollt stumm. In Atem 1 weiß er: das geht mich an.
In Atem 2 sieht er einen Beweis. Am Ende weiß er, was nach dem Klick passiert.

Klingt wie eine Sprachnachricht.

## Bevor du schreibst (3 Dinge)

1. **Wer + was er bekommt.** Aus Teil ICP oder aus dem, was der User sagt.
2. **Ein echter Proof.** Name oder Zahl mit Quelle. Fehlt beides: `proof: fehlt`.
   Keine Kundenzahl erfinden. Markt-Referenzen belegen nur die Bauform.
3. **Ein Segment.** `../scripts/load-wissen.py --skill ads --kunde <slug>`
   Genau ein File unter `maerkte/`. Coaching-Umsatz nicht in Local-Service kopieren.

Optional Tiefe, nie vorher alles laden:
`../ads-video/references/hook-formeln.md`,
`../ads-video/references/skript-architekturen.md`,
`../ads-video/references/voice-dna-ads.md`,
`../ads-video/references/playbook-geile-ads.md`.

Zwei Volltexte derselben Bauform nur gezielt greppen, nie `referenz-ads.md` ganz.

## Schreib-Reihenfolge

### 1. Satz 1 laut

Maximal 8 Wörter. Oder 12, wenn eine exakte Zahl drinsteht.
Erste 12 Wörter sind Callout, Proof, Garantie, Outcome oder Pain.
Kein „Herzlich willkommen". Kein „In diesem Video".

### 2. Sprechtext in einem Stück

Default-Länge: 20–40 Sekunden (Local-Service). High-Ticket 60–90.
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
`[ZEIGEN: …]` pro Beweis-Beat.

### 4. Drei Hook-Varianten

Mindestens zwei verschiedene Einstiege (nicht drei Paraphrasen).
Je Variante nur Satz 1 plus ein Brückensatz.

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

## Anti-Skript (nie so)

Wenn du [ICP] bist und [Outcome] willst, brauchst du [Offer].
Wir bieten ein individuelles Konzept.
Tischtennis spielen ist wie LinkedIn Ads.
Learn more.

## Ausgabe

Eine Datei pro Skript: Sprechtext, Hook-Varianten, `[ZEIGEN]`-Zeilen, CTA,
`winner-basis` oder `kein Performance-Datensatz`, Quellen.
