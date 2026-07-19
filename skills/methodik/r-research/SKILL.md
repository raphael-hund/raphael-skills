---
name: r-research
version: 0.1.0
description: >
  Recherchiert eine Sachfrage gegen vertrauenswürdige Primärquellen (Docs,
  Source Code, Specs, First-Party-APIs) im Hintergrund und hält die Befunde
  als zitierte Markdown-Datei fest. Trigger: "recherchieren", "Doku
  nachschlagen", "API-Fakten sammeln", "Hintergrund-Recherche".
class: M
scope: agency
sensitivity: internal
source: vendored from mattpocock/skills skills/engineering/research @ 9603c1cc
completion_criteria:
  - "Jede Behauptung in der Ergebnisdatei ist mit ihrer Primärquelle belegt"
  - "Quellen sind Primärquellen (offizielle Docs/Source/Specs/First-Party-API), keine Sekundär-Zusammenfassung"
  - "Markdown-Datei liegt an der Stelle, an der das Projekt vergleichbare Notizen bereits sammelt (oder Ablageort ist explizit benannt)"
---

# r-research — Primärquellen-Recherche im Hintergrund

## Zweck (1 Satz)

Eine Sachfrage bis zur besitzenden Primärquelle zurückverfolgen und das Ergebnis als
zitierte Markdown-Notiz ablegen, ohne die Hauptsession zu blockieren.

## Wann

- Doku-/API-Fakten müssen geklärt werden, bevor weitergebaut wird.
- Die Recherche ist reine Lesearbeit, die parallel zur laufenden Arbeit laufen kann.

## Ablauf

1. Einen Hintergrund-Agenten für die Recherche starten, damit die eigentliche Session
   parallel weiterarbeiten kann.
2. Die Frage gegen **Primärquellen** prüfen — offizielle Dokumentation, Source Code,
   Spezifikationen, First-Party-APIs. Keine Sekundär-Zusammenfassung als Beleg akzeptieren;
   jede Behauptung bis zur Quelle zurückverfolgen, die sie tatsächlich besitzt.
3. Befunde in einer einzigen Markdown-Datei festhalten, jede Behauptung mit ihrer Quelle.
4. Ablageort: dort, wo das Projekt vergleichbare Notizen bereits sammelt (bestehende
   Konvention nutzen). Gibt es keine, einen sinnvollen Ort wählen und explizit benennen.

## Gotchas

- Ein Blog-Post/Forum-Beitrag über eine API ist keine Primärquelle — nur die API-Doku/der
  Source Code selbst zählt.
- Unbelegte Behauptungen gehören nicht in die Ergebnisdatei — lieber "nicht auffindbar"
  vermerken als eine Sekundärquelle als Beleg tarnen.
- Ergebnis in einer Datei bündeln, nicht über mehrere Notizen verstreuen — sonst verliert die
  nächste Session den Überblick.
