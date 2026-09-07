# Case: Kita Wunderkiste

| Feld | Wert |
|---|---|
| Slug | `kita-wunderkiste` |
| URL | `https://kiwuki.ch/` (belegt: `/root/clients/kita-wunderkiste/GATES.md:995`) |
| Quelle | `/root/clients/kita-wunderkiste/DESIGN.md` |
| Sektor | `kita` — Dials 5 / 3 / 5 |
| Typ | House-Case |
| Datum der Studie | 30.08.2026 |
| Urteil | **GO-house-lock (Preserve-Modus)** |

## Preserve-Modus — was das für einen Agenten heisst

Aufbau, Typografie, Grün und die bestätigte Hero-Copy **bleiben erhalten**.
Ohne ausdrücklichen Kundenwunsch erfolgt **kein weiterer Hero-Neuentwurf**.
Dieser Case ist kein Redesign-Vorbild, sondern ein Beleg dafür, wie eine
Bild-Sperrliste geführt wird.

## 1. Capture

**Status: fehlt.** Kein Shot-Sweep vorhanden.

## 2. Tokens

**Nicht geprüft.** Die `DESIGN.md` dokumentiert bewusst nur die
Bild-Entscheidungen, keine Farb- oder Font-Tokens. Grün ist als Markenfarbe
benannt, ohne HEX-Wert an dieser Stelle. Wer Tokens braucht, extrahiert sie
aus dem Live-Stand und trägt sie hier nach. Geraten ist kein Token.

## 3. Sektionen-Inventar

| # | Sektion | Pattern-ID | Wie gebaut |
|---|---|---|---|
| 1 | Hero | `P-HERO-PHOTO` | Alltagsfoto `CAMC1811.jpg`: lachende Betreuungsperson mit Kind beim Zähneputzen. Crop Desktop `50% 38%`, mobil `35% 45%`; beide Gesichter bleiben vollständig sichtbar. |

Weitere Sektionen: nicht geprüft. Der Preserve-Modus hat den Fokus auf den
Hero gelegt.

## 4. Raphael-Urteil

**GO-house-lock im Preserve-Modus.** Der lehrreiche Teil ist die
Sperrliste — vier Hero-Kandidaten wurden nacheinander abgelehnt:

1. `foto2.jpg` / `onecdn.io/…dd4cd500…` — Babsi ordnete das Bild dem
   Tagesablauf zu; die zusätzliche Hero-Nutzung war nicht bestätigt.
2. Breites Gruppenmotiv `onecdn.io/…fe5e99d6…` — Babsi beanstandete die
   Gesichtsausdrücke.
3. `CAMC1373.jpg` / `onecdn.io/…6924fb27…` — Raphael bat am 25.08.2026
   ausdrücklich um ein anderes Bild.
4. Veröffentlicht ist `CAMC1811.jpg` / `onecdn.io/…f19b13ee…`.

Lehre für den Skill: Ein Nein zu einem Bild wird als Pfad plus Grund
festgeschrieben, nicht als Gefühl. Ein gesperrter Pfad darf auf der Route
nicht mehr vorkommen. Der Crop wird als Zahlenwert notiert, damit er
reproduzierbar ist.

## 5. Regel-Kandidaten

| Beobachtung | Regel-ID | Richtung | Status |
|---|---|---|---|
| Echte Fotos echter Menschen, keine KI-Personen | S9 | GO | verbindlich |
| Gesichter im Crop vollständig sichtbar lassen, Crop als Zahlenwert notieren | S9 | GO | kandidat |
| Ein abgelehntes Motiv kommt auf der Route nicht mehr vor | S13 | NO-GO | verbindlich |
