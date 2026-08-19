---
name: r-instagram-organic
version: 0.0.1
status: candidate
description: >
  Liefert Instagram-Reel-Ideen für Raphaels Personal Brand als fertige
  Organic-Formate (3 Arten, 3 Wege, 5 Schritte, Hot Take, Zahl-Hook).
  Transkript der eigenen Clips zuerst. Nie Essay-Takes ohne Bauform.
  Trigger: "Reel-Ideen", "Organic Content", "3 Arten", "Hot Take",
  "Instagram Ideen", "Personal Brand Reels".
class: F
scope: agency
sensitivity: internal
source: >
  Eigenes Muster 2026-08-19, zweimal gescheitert: Spektrum als Slogans,
  dann Essays ohne Liste. Raphael: Ideen müssen 3 Arten / 5 Schritte /
  Hot Take / Hooks sein. Transkript Pflicht.
loads:
  - references/formate.md
completion_criteria:
  - "Eigene Clips sind transkribiert (Ton oder On-Screen) oder die Lücke steht in raw/"
  - "Jede Idee nennt Format-ID, Hook-Satz 1, 3-5 Punkte, Lebensbeweis"
  - "Keine Idee ist ein einzelner Merksatz ohne Liste oder Hot-Take-Auflösung"
  - "Ausgabe liegt in /root/raphael-instagram/drafts/ als Markdown"
---

# r-instagram-organic — Reel-Ideen als Formate

**Zweck (1 Satz):** Raphael bekommt sprechbare Reel-Karten, keine Philosophen-Sätze.

## Herkunft (2 Fehlversuche)

1. 2026-08-19 Spektrum: 29 Ein-Zeiler. Raphael: sinnlos, Sonderheit fehlt.
2. 2026-08-19 verdickt: 10 Essays. Raphael: falsche Form. Er will 3 Arten, 3 Wege, 5 Schritte, Hot Take, Hooks. Transkript der eigenen Videos zuerst.

## Lies zuerst

- `/root/raphael-instagram/docs/specs/2026-08-19-personal-brand-instagram.md`
- `/root/raphael-instagram/raw/2026-08-19-transcript-DcL_BseNmyl.txt`
- `/root/raphael-instagram/raw/2026-08-19-transcript-DcDnfWOtk71.txt`
- `references/formate.md`

## Harte Gates

1. **Transkript zuerst.** Neues eigenes Reel: Ton holen (`yt-dlp -f bv*+ba`) und `transkribieren`. Fehlt Audio: Captions aus Frames rekonstruieren und die Lücke schreiben. Keine Idee ohne Beleg aus seinem Mund oder Grid.
2. **Ausgabe ist eine Karte**, nie ein Essay. Pflichtfelder unten.
3. **Hook = Satz 1.** Zahl, Frist, Gegensatz oder Anklage. Kein „Hey“. Kein „Stell dir vor“.
4. **Liste oder Hot Take.** 3 Arten / 3 Wege / 5 Schritte / 2 Hacks / eine These plus Auflösung in unter 20 Sekunden.
5. **Beweis aus seinem Leben.** 12-Stunden-Tag, Training, Mini-Account, vier Tage, Pause im Reel. Keine fremden Cosplay-Titel.

## Ablauf

1. Eigene letzten Clips lesen (Transkript + Grid).
2. Format aus `references/formate.md` wählen. Mindestens 3 verschiedene Formate in einer Ladung.
3. 8–15 Karten schreiben. Pro Karte die Pflichtfelder.
4. Raphael kreuzt geil / geht / tot. Nur geil wird zur Notiz nach Spec.

## Pflichtfelder je Karte

```
Format: 3 Arten | 3 Wege | 5 Schritte | 2 Hacks | Hot Take
Hook: <ein Satz, laut, mit Zahl oder Gegensatz>
Punkte: 3–5 Stichworte, sprechbar
Beweis: <Szene aus seinem Leben>
Bild: Wohnung | Gym | Green Screen aufs eigene Grid
```

## Verbote

- Essay-These ohne Liste
- „So wächst du auf Instagram“
- Ads-Tutorials, Firma, Kunden, Stack, TRT, Autos, Uhren
- Fremde Jargon-Titel als Idee
- Ablese-Skript (Spec: nur Notizen)
- Agent postet nicht

## Gotchas

- Instagram-Download oft ohne Ton. Dann Captions, nicht so tun als gäbe es Whisper.
- Sein 18.08. ist schon Format F-Liste (2 Hacks, 60 s, 30 %). Neue Ideen müssen so klingen, nicht wie ein Tagebuch-Kommentar.
- Tate: Härte und Gegensatz klauen. Wortlaut und Hetz-Liste bleiben draußen.
