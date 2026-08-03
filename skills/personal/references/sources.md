# Quellenregister

Stand 2026-08-03. Primaerquellen schlagen Spiegel und Kommentare.
Doktrin: Hamzas Lehre gilt als Wahrheit (Raphael 03.08.2026).

## Wissensbasis im Brain

Ordner: `/root/raphael-brain/raw/person-2026-08-03-hamza-ahmed-advanced/`

| Was | Umfang | Dateien |
|---|---|---|
| Transkripte | 136 Videos (alle oeffentlich abrufbaren des Kanals) | `<video-id>.txt` |
| Kanalindex | 138 Eintraege mit Titel, Dauer, Views | `channel-index.tsv` |
| Claim-Extraktionen | 20 Dateien, rund 2.700 belegte Beobachtungen | `claims-batch*.md`, `claims-rbatch-*.md` |
| Sortierte Aggregate | Stimme 715, Werte 618, Kehrtwenden 490, Taktiken 852 Bullets | `aggregat-*.md` |
| Verdichtete Kapitel | Grundlage der Persoenlichkeits-Referenz | `verdichtet-*.md` |

Jede Datei traegt einen Provenance-Sidecar mit SHA256; alle Hashes stehen in
`manifests/raw-baseline.sha256`. Auto-Untertitel via yt-dlp, flachgeklopft.
Claim-Extraktion durch drei fremde Modellfamilien (Regel 8: nichts prueft die eigene
Arbeit).

**Nicht enthalten:** zwei altersgesperrte Videos (`68hpwoPq13w`, `Q7nJZxSYDek`) —
YouTube verlangt dafuer ein eingeloggtes Konto.

## Nachschlagen zur Laufzeit

```bash
D=/root/raphael-brain/raw/person-2026-08-03-hamza-ahmed-advanced
grep -l "<thema>" $D/claims-*.md          # welche Videos behandeln das Thema
grep -n "<stichwort>" $D/verdichtet-*.md  # verdichtete Lehre zum Thema
sed -n '<zeile>p' $D/<video-id>.txt       # Originalstelle nachlesen
```

## Kanal-Metadaten

- "Hamza Advanced", https://www.youtube.com/@HamzaAdvanced-d4l
  (UC6oapb1Vl2GAtYfrKRFZ55w), rund 58.000 Abonnenten, UK, seit 2024-11-28.
  Sekundaerquelle vling.net nennt 175 Videos, der eigene yt-dlp-Index vom selben Tag
  138 oeffentliche — Differenz vermutlich Shorts und Members-only.
- Selbstbeschreibung: fuer Follower, die ueber den Hauptkanal-Rat hinaus sind.
- Hauptkanal-Kontext: rund 2000 Videos in 5 Jahren (Eigenaussage, Video 9kdffasM8Bc).
- Geschaeftsmodell: Community 37 $/Monat und ECC 250 $/Monat (ype9PrgRR-w.txt:558-628),
  geplantes 1:1-Mentorship 8-10k $/Monat (ype9PrgRR-w.txt:738-739).

## Naechste Ingest-Runde

Der Advanced-Kanal ist vollstaendig eingespeist. Erweiterung waere der Hauptkanal
(rund 2000 Videos) — dann in Batches ueber den brain-Skill, Modus `einspeisen`,
Praefix `person-`. Keine vollstaendigen Transkripte als Skill-Inhalt speichern;
Verdichtung immer als Kandidat.
