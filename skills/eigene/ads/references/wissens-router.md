# Wissens-Router (Second Brain) — ads

Diese Datei nennt **keine Dateipfade**. Das ist Absicht.

Bis zum 13.08.2026 stand hier eine handgepflegte Pfadtabelle. Am Ende zeigten
13 von 68 Pfaden ins Leere: Die Seiten waren am 23./24.07. freigegeben und
umgezogen, die Tabelle blieb stehen. Drei Wochen lang schickte der Skill jeden
Agenten an tote Pfade, und niemand merkte es.

**Pfade kommen ab jetzt aus dem Ladebefehl, nicht aus einer Tabelle:**

```bash
python3 /root/raphael-brain/scripts/brain-context.py index craft/ads
```

Er zeigt jede freigegebene Ads-Wissensseite mit Pfad, Titel, TLDR und Länge —
den echten Stand, auch nach Freigaben und Umzügen. Aus dieser Landkarte wählst
du die 1–3 passenden Seiten und liest sie mit dem Read-Tool.

Diese Datei hilft nur bei der Frage **davor**: In welchem Themenfeld suche ich?

## Themenfelder im Ads-Wissen

| Feld | Beantwortet die Frage |
|---|---|
| **grundlagen** | Wie denke, rechne und prüfe ich ein Werbekonto? Denk-Framework, Rechenwege (CPA, ROAS, Break-even), Scoring, Benchmarks, Compliance |
| **plattformen** | Was gilt auf genau diesem Kanal? Ein Steckbrief je Plattform. Bei Raphael ist Meta der Normalfall — nie alle Plattformen laden |
| **creative** | Wie entstehen Anzeigen, die wirken? Hooks, Angles, Skript-Struktur, Static-Baupläne, Offer- und Garantie-Muster, Landingpage-Anschluss |
| **messung** | Woher weiß ich, was wirkt? Metrik-Hierarchie, Attribution, Server-Side-Tracking, Lead-Qualifizierung, Berichte |
| **strategie** | Wann teste, wann skaliere ich? Testwellen, Kill/Keep/Scale, Budget und Pacing, Retargeting, Kampagnenstruktur |
| **lehren** | Was haben wir aus eigenen Daten gelernt? Belegte Einzelbefunde aus echten Konten und Auswertungen |

## Wo liegt was

| Wissensart | Ort | Landkarte |
|---|---|---|
| Übertragbares Werbe-Handwerk (gilt für jeden Kunden) | `wiki/craft/ads/` | `index craft/ads` |
| MAKEs eigenes Konto, ICP, Offer, Voice | `wiki/company/` | `index company` |
| Ein konkreter Kunde | `/root/clients/client-<name>/` | — |

MAKE ist ein Sonderfall: Die Agentur ist ihr eigener Kunde, deshalb liegt ihr
Dossier im Brain unter `wiki/company/` und nicht in einem Kundenrepo.

## Reihenfolge bei der Arbeit

1. Landkarte laden (`index craft/ads`).
2. Themenfeld bestimmen — Tabelle oben.
3. In der Landkarte die 1–3 passenden Seiten nach Titel und TLDR wählen.
4. Diese Seiten mit dem Read-Tool lesen. Bei „GROSS, gezielt lesen" nie den
   Volltext ziehen, sondern den passenden Abschnitt suchen.
5. Erst danach arbeiten. Nie aus dem Gedächtnis diagnostizieren.

Für die sechs häufigsten Aufgaben gibt es eine Abkürzung in
`/root/raphael-brain/wiki/craft/ads/README.md`. Die operativen `references/`
dieses Skills (loop3-ablauf, hook-taxonomie, claims-verbote) bleiben der Kern;
die Brain-Seiten sind die Tiefe dahinter. Bei Themen-Überschneidung führt die
`references/`-Quelle.
