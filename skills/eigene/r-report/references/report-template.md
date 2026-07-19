# Kundenreport — Vorlage

Jede Zahl hat eine Quelle. Kein Wert ohne Herkunft. Nuechtern, ehrlich, belegt.

```
# Report — <Kunde> — <Zeitraum>

## Auf einen Blick
- <KPI 1>: <Wert> (<Veraenderung ggue. Vorperiode>)   Quelle: <Datei/Snapshot, Datum>
- <KPI 2>: <Wert> (<Veraenderung>)                     Quelle: <...>
- <KPI 3>: <Wert>                                      Quelle: <...>

## Was lief gut
<nur belegte Aussagen; jede Zahl mit Quelle>

## Was nicht lief
<ehrlich; Datenluecken hier klar benennen>

## Naechste Schritte / Testwelle
<konkret, aus perf-analyse (r-ads) / cro-learn (r-web) / refresh (r-seo)>

## Datengrundlage
- Quellen: <Liste der Export-/Snapshot-Dateien mit Datum>
- Verifiziert von: Sol, <Datum>  (jede Zahl gegen Quelle geprueft)
- Zeitraum: <von-bis>   Datenluecken: <falls vorhanden>
```

## Regeln
- Kein KPI ohne Quelle-Zeile. Fehlt die Quelle -> Zahl raus, nicht raten.
- Prozent-/Veraenderungsangaben immer mit Basiswert (sonst irrefuehrend, UWG).
- Keine Judge-/Stil-Scores als Erfolgszahl.
- Versand erst nach Raphaels Signatur (Rot-Klasse Kundennachricht).
