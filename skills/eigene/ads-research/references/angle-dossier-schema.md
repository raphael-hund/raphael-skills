# Angle-Dossier — festes Schema

Diese Datei ist der Vertrag für den Ausgang von `ads-research`.
Die Ausgabe ist eine Datei mit sechs Pflichtblöcken.
ads-video und ads-statics lesen nur diesen Pfad.

## Ablage

`/root/clients/client-<slug>/ads/research/<YYYY-MM-DD>-angle-dossier.md`

MAKE (`kunde: make`) nutzt denselben Pfad unter `client-make`, wenn das Repo da ist.
Onboarding: zuerst Kundenrepo, Brain `wiki/company/` nur wenn vorhanden.
Ohne beides: `kunden-layer: fehlt` im Dossier, Skill läuft weiter.

Kopf der Datei:

```yaml
---
kunde: <slug>
datum: YYYY-MM-DD
segment: <ein Slug aus segment-map.md>
skill: ads-research
version: 1.0.0
ad_library: ok | skipped
ad_library_grund: <leer | code-10 | no-token | code-190 | ch-only-ui | anderer>
---
```

## Pflichtblöcke (Reihenfolge fest)

### 1. Markt-Segment (genau eins)

```
## Markt-Segment
slug: local-service-handwerk
status: approved | candidate | missing
pfad: <Helper-Pfad>
```

Schreibe einen Slug. Die anderen drei Segmente bleiben ungelesen.
Fehlt die Segmentdatei: `status: missing` und `BLOCKED`.

### 2. Zielgruppen-Segmente

Mindestens eines. Jedes Slice ist eine Rolle plus Situation.

```
## Zielgruppen-Segmente
### Z1 <Kurzname>
rolle: <Funktion im Betrieb>
situation: <was gerade knirscht>
trigger: <warum er jetzt sucht>
quelle: <url oder datei> | <datum>
zitat: "<wörtlich oder [PLATZHALTER]>"
```

Kein erfundener Slice. Fehlt der Beleg, bleibt das Slice weg.

### 3. Pains mit Beleg

Mindestens zwei. Jeder Pain braucht Quelle plus Zitat.

```
## Pains
### P1 <Kurzname>
pain: <in Kundensprache, ein Satz>
quelle: <url oder datei> | <datum>
zitat: "<wörtlich>"
confidence: hoch | mittel | niedrig
```

`hoch` braucht drei unabhängige Quellen, `mittel` zwei, `niedrig` eine.
Eine Quelle reicht für den Eintrag. Der Confidence-Wert bleibt ehrlich.

### 4. Angles mit Beleg

Mindestens zwei. Familie aus dieser Liste: Problem, Lösung, Social-Proof,
Angst, Preis, FOMO, Mechanismus.

```
## Angles
### A1 <Kurzname>
familie: Problem
versprechen: <ein Satz>
passt_zu: <Z-ID plus P-ID>
quelle: <url oder datei> | <datum>
zitat: "<wörtlich>"
confidence: hoch | mittel | niedrig
```

Verworfenen Angle in `## Verworfen` listen. Grund in einem Satz.
Ein Angle ohne Zitat gehört nur nach `## Verworfen`.

### 5. Awareness-Stufe

Genau eine Hauptstufe. Schwartz, fünf Werte:

| Stufe | Bedeutung |
|---|---|
| unaware | kennt das Problem nicht |
| problem-aware | kennt das Problem |
| solution-aware | kennt Lösungsarten |
| product-aware | kennt dieses Angebot |
| most-aware | vergleicht Anbieter |

```
## Awareness
stufe: solution-aware
beleg: <quelle plus kurzes Zitat oder Dossier-Stelle>
```

MAKE liegt oft bei `solution-aware`. Trotzdem am Onboarding prüfen.

### 6. Empfehlung Statics / Video

```
## Format
wahl: statics | video | beide
grund: <zwei Sätze, Segment plus Belege>
streit_genannt: ja | nein
```

`streit_genannt: ja` ist Pflicht bei `local-service-handwerk` und
`agenturen-coaching`. Der Katalog hält den Streit in
`/root/raphael-skills/skills/eigene/ads/references/segment-map.md`.

MAKE testet neue Angles zuerst als Static.
Evers beschreibt je nach Phase Static-Tests und Video-/VSL-Strecken; die
konkrete Quelle nennen, kein pauschales Video-first daraus ableiten.
Eigene Daten vom 02.08.2026 zeigen bei gleichem Spend kaum Formatunterschied.
Das Dossier nennt den Streit und wählt mit Grund.

## Abschlussblöcke

```
## Quellen
- <typ>: <url oder pfad> | <datum>

## Lücken
- <was fehlt>

## Übergabe
DOSSIER: /root/clients/client-<slug>/ads/research/<datum>-angle-dossier.md
SEGMENT: <slug>
```

`## Quellen` listet Onboarding, Website, Profile, Bewertungen, VOC,
Verkaufsgespräche und optional Ad Library.

`ad_library: skipped` mit Grund ist ein gültiger Stand.

## Fertig-Check

Ein Verifier prüft pass/fail mit eingefügtem Beleg:

1. Eine Datei am Pfad oben.
2. Genau ein Segment-Slug.
3. Jeder Pain hat Quelle plus Zitat.
4. Jeder Angle hat Quelle plus Zitat.
5. Awareness ist einer der fünf Werte.
6. Format-Wahl plus Grund stehen.
7. `DOSSIER:`-Zeile ist ein existierender Absolutpfad.
8. Kein Token, kein Secret, kein `paging.next` in der Datei.

Ein Fail in dieser Liste = Dossier unfertig.

## Falsch (nie so)

- Mehrere Dateien statt einem Dossier.
- Angle aus dem Gefühl ohne Zitat.
- Ad Library fehlt und der Lauf stoppt.
- Creative-Sätze 1:1 übernommen.
- Zwei Segment-Slugs.
