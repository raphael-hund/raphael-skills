# Orchestrierung — wer baut, wer prüft, wer sieht was

Stand 14.08.2026. Alle Fähigkeitsangaben hier sind **getestet, nicht vermutet**
(Kontrollbild-Test und Sol-Leseprobe, siehe unten). Wer eine Rolle umhängt, testet vorher.

## Die Fähigkeitstabelle — das ist die Grundlage jeder Rollenverteilung

| Subagent | Familie | Sieht Bilder | Liest Dateien | Schreibt | Wofür |
|---|---|---|---|---|---|
| `opus-critic` | Claude Opus | **ja** | ja | nein | visuelle Kritik, hartes Urteil |
| `visual-kritiker` | Grok (Lane) | **ja** | ja | nein | visuelle Kritik, Default fail |
| `sonnet-worker` | Claude | **ja** | ja | ja | Hülle für native CLI, Drafts |
| `luna-worker` | GPT-Luna | **ja** | ja | ja | Massen-Lesen, Parsen, billige Klassifikation |
| `opus-builder` | Claude Opus | **ja** | ja | ja | **Seiten bauen** (Default-Builder) |
| `kimi-worker` | Kimi K3 | ja | ja | ja | Recherche, langer Kontext — nicht Default-Seitenbau |
| `kimi-recherche` | Kimi K3 | **ja** | ja | nein | dritte Familie, Zweitmeinung, Slop-Blick |
| `luna-worker` | GPT-5.6 | **ja** | ja | ja | Mechanik, Tests, Recherche |
| `sol-pruefer` | GPT-5.6 Sol | **nein** | **nein** | nein | Code-Urteil gegen eingebetteten Text |

**Der Test, auf dem das beruht:** ein Kontrollbild mit einer Überschrift, einer Unterzeile
und einer Form, deren Inhalt kein Modell erraten kann („KOBALT 47" / „drei Fische tanzen
links" / magenta Kreis auf marineblau). `sonnet-worker`, `luna-worker`, `kimi-recherche`
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
| Visuelle Kritik A | `visual-kritiker` (Grok) | `manifest.json` + alle Shot-PNGs |
| Visuelle Kritik B | andere Familie als Builder und A | dieselben Shots wie A |

Wer gebaut hat, prüft nicht. **Bauen ist `opus-builder`.** Dann ist visuelle Kritik A
`visual-kritiker` (Grok) und B **`kimi-recherche`** — Opus darf Opus nicht prüfen.
Sol prüft Code-Ursachen als Text, nicht die Shots.

**Kritik läuft immer doppelt plus Gegencheck** (Raphael 14.08.2026). Nie ein
Kritiker allein. Nie Haiku. Luna ist kein Kritiker — Luna macht Masse, nicht Urteil.
Beide Kritiker starten in EINER Nachricht. Danach zweiter Pass: jeder bestätigt
oder widerlegt die Befunde des anderen. Fixliste = überlebende Befunde.

**Judge-Form immer „pass/fail + eingefügter Beweis", nie „erkläre dein Denken"**
(Regel 19). Ein Befund ohne Beleg gilt als nicht gefunden.

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

- Keine kleine fachliche Obergrenze: alle dependency-ready Pakete dürfen bis zur live verfügbaren Runtime-, Provider-, RAM-, Browser- und Kontextkapazität starten.
- Playwright und Screenshot-Sweeps belegen Browser-/RAM-Leases. Bildlastige Panels und Sweeps werden nur gemeinsam gestartet, wenn die Live-Ressourcenmessung es trägt.
- Writer brauchen disjunkte normalisierte `write_set`s oder isolierte Worktrees; Shared Files haben einen Owner.
- Keine künstliche Arbeit nur zur Auslastung.

## Modell und Effort

Regel 13: **erst Effort hoch, dann Modell teurer.** Ein `luna-worker` mit `effort: high`
löst mehr als ein größeres Modell auf Standard-Effort — und kostet weniger.

| Aufgabe | Besetzung |
|---|---|
| Art Direction, Struktur, Entscheidungen | Cockpit selbst (nicht delegieren) |
| Substanzieller UI-Neubau / roter Design-Stand | Sol/Cockpit zerlegt → alle unabhängigen Opus-Pakete bis Live-Kapazität → genau ein Opus-Integrator |
| Frontend-Code, Seite, Layout | **`opus-builder`** |
| Deutsche Verkaufscopy schreiben | `kimi-worker` oder `sol-builder`; `opus-builder` baut sie nur unverändert ein |
| Mechanik, Tests, Datenkram | `luna-worker` (kein Urteil, keine Seite) |
| Massen-Lesen, Sortieren | `luna-worker` |
| Visuelle Kritik einer Seite | Grok + `kimi-recherche` (Opus hat gebaut), dann Gegencheck |
| Auslieferungs-Urteil Code | `sol-pruefer` (Textausschnitt) |

**Nie Haiku.** Kimi nur Recherche/Zweitstimme, nicht Seiten-Builder. HighSpeed verboten.

## Sol → Opus: Delegation ohne Drift

Die Idee aus Kevin Kerns X-Post vom 19.08.2026 ist eine Harness-Kette:
Ein Leitmodell formuliert die Aufgabe, ein Delegator verteilt mehrere
UI-Blickwinkel, Opus setzt die Entscheidung um. Für diesen Skill gilt:

- Im Sol-Cockpit zerlegt Sol selbst und delegiert direkt an Opus.
- Das Cockpit schärft Kriterien und delegiert alle echten unabhängigen Pakete an `opus-builder`; Fable wird dort nicht gestartet.
- Die Breite folgt ready Nodes und Live-Kapazität, nicht einer statischen Fünferzahl.
- Parallele Analyse darf denselben Stand lesen. Paralleles Schreiben braucht disjunkte normalisierte `write_set`s oder Worktrees.
- Genau ein `opus-builder` integriert alle bestätigten Ergebnisse.
- Der Integrator bekommt Ziel, Referenzen, erforderliches Verhalten, Grenzen,
  Testplan und die vollständige Liste bestätigter Befunde.
- Danach folgen G1, Shot-Sweep, eigenes Ansehen und familienfremdes Panel.

Ein Lauf ist bei einem dieser Befunde rot: überlappende Opus-Schreibbereiche,
fehlender Integrator oder ein Bau ohne fremdfamiliäre Kritik
vom Cockpit selbst.

## Was nie autonom passiert

Deploy und Launch sind Rot-Klasse. Das Tor kann grün sein, die Seite kann perfekt sein —
**veröffentlicht wird erst mit Raphaels Signatur** über `ops/review-inbox.md`.
