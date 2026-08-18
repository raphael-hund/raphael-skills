# Foto-Prompt (GPT Image 2)

Nur laden bei Medium `foto`.

## Pflichtsaetze im Prompt

In dieser Reihenfolge, als Prosa, nicht als Tag-Liste:

1. Subject from Inhaltkontext (image N). Do not invent identity, product, or place.
2. Action and setting.
3. Camera: body feel + lens + aperture + distance (example: full-frame, 50mm, f/2.8, medium shot).
4. Light: direction, quality, time of day.
5. Grade: flat neutral, true-to-life color. No teal-orange film look.
6. Stilkontext images: match only camera, color, light, setup. Ignore their subjects.

## Linsen-Default

| Bedarf | Default |
|---|---|
| Portrait / Handshake / eine Person | 85mm, f/1.8, tight or medium |
| Zwei Personen, Gespraech, Buero | 50mm, f/2.8, medium |
| Raum, Werkstatt, Strasse | 35mm or 24mm, f/4, wide |
| Produkt auf Tisch | 70–85mm, f/8, tabletop |

## Handyfoto-Upgrade

Image 1 = Inhalt (das Handyfoto). Image 2–3 = Stil (Pexels/Seite/Shooting).

```
Inhaltkontext: keep the people, product, and spatial layout from image 1.
Stilkontext: shoot it as a real camera photo matching lens, light, and grade of image 2.
No smartphone look, no ultrawide distortion, no cinematic teal-orange.
```

## Stilfamilie Editorial-Foto

Natuerliches Fenster- oder Aussenlicht. Echte Haut und Stoff. Flacher Grade.
Referenzbeispiele (nur Stil, nicht Inhalt kopieren):

- https://www.pexels.com/de-de/foto/buro-arbeiten-geschaft-business-7256363/
- https://www.pexels.com/de-de/foto/geschaftsleute-schutteln-sich-im-freien-die-hande-36712840/

## Personen

Nahes Gesicht nur mit echter Personen-Datei (Kunde oder Unsplash/Pexels).
Ohne Gesicht-Ref: Distanz, angeschnitten, Ruecken, Haende, Werkzeug.
Kein erfundenes Kunden-Portrait.

## Fertig

Prompt enthaelt die sechs Pflichtsaetze und nennt jede `--image`-Datei als
Inhalt oder Stil.
