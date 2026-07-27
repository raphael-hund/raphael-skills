# Orchestrierung — wer baut, wer prüft, wer sieht was

Stand 27.07.2026. Alle Fähigkeitsangaben hier sind **getestet, nicht vermutet**
(Kontrollbild-Test und Sol-Leseprobe, siehe unten). Wer eine Rolle umhängt, testet vorher.

## Die Fähigkeitstabelle — das ist die Grundlage jeder Rollenverteilung

| Subagent | Familie | Sieht Bilder | Liest Dateien | Schreibt | Wofür |
|---|---|---|---|---|---|
| `sonnet-worker` | Claude | **ja** | ja | ja | visuelle Kritik, normale Bauarbeit, Drafts |
| `haiku-worker` | Claude | **ja** | ja | ja | Massen-Lesen, Parsen, billige Klassifikation |
| `kimi-worker` | Kimi K3 | ja | ja | ja | Frontend-Code, deutsche Marketing-Texte |
| `kimi-recherche` | Kimi K3 | **ja** | ja | nein | dritte Familie, Zweitmeinung, Slop-Blick |
| `luna-worker` | GPT-5.6 | **ja** | ja | ja | Mechanik, Tests, Recherche |
| `sol-pruefer` | GPT-5.6 Sol | **nein** | **nein** | nein | Code-Urteil gegen eingebetteten Text |

**Der Test, auf dem das beruht:** ein Kontrollbild mit einer Überschrift, einer Unterzeile
und einer Form, deren Inhalt kein Modell erraten kann („KOBALT 47" / „drei Fische tanzen
links" / magenta Kreis auf marineblau). `sonnet-worker`, `haiku-worker`, `kimi-recherche`
und `luna-worker` haben alle drei Angaben korrekt genannt. Die frühere Annahme
„nur Claude-Subagenten können Bilder sehen" ist damit widerlegt — bei der Panel-Besetzung
ist man also freier als gedacht.

**Sol ist der Sonderfall.** Seine bubblewrap-Sandbox kann auf diesem VPS keine einzige
Datei öffnen (`kernel.apparmor_restrict_unprivileged_userns=1`). Er bekommt deshalb
**nie** Pfade und **nie** Screenshots, sondern immer den fertigen Textausschnitt mit
Zeilennummern. Über eingebetteten Code urteilt er nachweislich korrekt.
Details: `ops/incidents/2026-07-27-sol-pruefer-tot.md` im command-center.

## Das Panel — drei Familien, weil eine Familie ihre eigenen Fehler nicht sieht

Regel 8 sagt: nichts prüft die eigene Hausarbeit. Praktisch heißt das für eine Website:

| Rolle | Besetzung | Bekommt |
|---|---|---|
| Code-Urteil | `sol-pruefer` (GPT) | Textausschnitt mit Zeilennummern, kein Pfad |
| Visuelle Kritik A | `sonnet-worker` (Claude) | `manifest.json` + alle Shot-PNGs |
| Visuelle Kritik B | `kimi-recherche` (Kimi) | `manifest.json` + alle Shot-PNGs |

Wer gebaut hat, prüft nicht. Hat `kimi-worker` das Frontend gebaut, wandert die
visuelle Kritik B auf `luna-worker` — sonst prüft die Familie sich selbst.

**Judge-Form immer „pass/fail + eingefügter Beweis", nie „erkläre dein Denken"**
(Regel 19, Fable-Gotcha). Ein Befund ohne Beleg gilt als nicht gefunden.

**Zusammenführen:** Auf die Fixliste kommt, was (a) zwei Panel-Mitglieder tragen oder
(b) das eigene Auge plus ein Panel-Mitglied. Bei Widerspruch **nicht** nach Mehrheit
entscheiden, sondern einen Verify-Agenten pro strittigem Befund ansetzen, mit der
Vorgabe „widerlegt, wenn unsicher". Mehrheit belohnt sonst den häufigsten Irrtum.

## Reihenfolge: erst das Tor, dann das Panel

```
Build → g1-gate.mjs (Exit 0?) → shot-sweep.mjs → eigenes Ansehen → Panel → Fixliste → Fix → zurück zum Tor
```

Das Panel läuft **nach** G1, nicht davor. Menschen (und Modelle) über eine Seite urteilen
zu lassen, die noch axe-Fehler und tote Links hat, verbrennt Panel-Zeit an Dingen, die ein
Exit-Code billiger findet.

## Parallel oder nacheinander

- **Parallel**, sobald zwei Pakete verschiedene Dateien anfassen: mehrere `Agent`-Calls in
  **einer** Nachricht, sonst laufen sie nacheinander.
- **`isolation: "worktree"`** nur, wenn Subagenten gleichzeitig schreiben. Für reine
  Kritik-Agenten (die nur lesen) ist es verschwendete Zeit und Platte.
- **Nie `git add -A`** in Parallel-Sessions — das committet die Arbeit der anderen mit.

## RAM — die harte Grenze dieser Maschine

Gemessen am 27.07.2026: 31 GiB gesamt, ~12 GiB verfügbar, **5 von 8 GiB Swap bereits
belegt**. Diese Kiste hatte OOM-Vorfälle.

- Höchstens **4–6 Subagenten gleichzeitig**.
- Playwright zählt mit: jeder Sweep startet einen echten Chrome. Ein Sweep über 8 Routen
  neben 6 Subagenten ist der Weg in den OOM.
- Faustregel: Panel-Agenten **oder** Sweep, nicht beides zur selben Sekunde.
- Was inline in unter 5 Minuten erledigt ist, bekommt keinen eigenen Thread.

## Modell und Effort

Regel 13: **erst Effort hoch, dann Modell teurer.** Ein `luna-worker` mit `effort: high`
löst mehr als ein größeres Modell auf Standard-Effort — und kostet weniger.

| Aufgabe | Besetzung |
|---|---|
| Art Direction, Struktur, Entscheidungen | Cockpit selbst (nicht delegieren) |
| Frontend-Code, deutsche Texte | `kimi-worker` |
| Mechanik, Tests, Datenkram | `luna-worker` |
| Massen-Lesen, Sortieren | `haiku-worker` |
| Auslieferungs-Urteil | `sol-pruefer` + eine bildfähige Familie |

Keine Opus-/Fable-Subagenten (Doktrin). Kimi immer K3, HighSpeed verboten (3× Quota).

## Was nie autonom passiert

Deploy und Launch sind Rot-Klasse. Das Tor kann grün sein, die Seite kann perfekt sein —
**veröffentlicht wird erst mit Raphaels Signatur** über `ops/review-inbox.md`.
