# Orchestrierung — wer baut, wer prüft, wer sieht was

Stand 14.08.2026. Alle Fähigkeitsangaben hier sind **getestet, nicht vermutet**
(Kontrollbild-Test und Sol-Leseprobe, siehe unten). Wer eine Rolle umhängt, testet vorher.

## Die Fähigkeitstabelle — das ist die Grundlage jeder Rollenverteilung

| Subagent | Familie | Sieht Bilder | Liest Dateien | Schreibt | Wofür |
|---|---|---|---|---|---|
| `fable-builder` | Claude Fable | **ja** | ja | ja | Frontend/UI/Design, Copy |
| `astra-worker` | GPT Astra | **ja** | ja | ja | Planung, Frontend, Copy |
| `kimi-worker` | Kimi | **ja** | ja | ja | Planung, Frontend, Copy, Recherche |
| `fable-critic` | Claude Fable | **ja** | ja | nein | Abnahme vor Auslieferung |
| `astra-critic` | GPT Astra | **ja** | ja | nein | Abnahme vor Auslieferung |
| `kimi-critic` | Kimi | **ja** | ja | nein | Abnahme vor Auslieferung, zweite visuelle Stimme |
| `opus-builder` | Claude Opus | **ja** | ja | ja | Frontend/UI, nie Copy oder Backend |
| `opus-critic` | Claude Opus | **ja** | ja | nein | visuelle Kritik, nie nach Opus-Build |
| `grok-worker` | Grok | **ja** | ja | ja | Technik, Debug, Browser, Recherche |
| `grok-critic` | Grok | **ja** | ja | nein | visuelle Kritik |
| `sol-worker` | GPT Sol | nein | ja | ja | Backend, API, Tests |
| `sol-critic` | GPT Sol | nein | nein | nein | Code- und Backend-Urteil gegen eingebetteten Text |
| `luna-worker` / `sonnet-worker` / `terra-worker` | GPT / Claude / GPT | ja | ja | ja | Serien, Kartierung, Massen-Read |

**Der Test, auf dem das beruht:** ein Kontrollbild mit einer Überschrift, einer Unterzeile
und einer Form, deren Inhalt kein Modell erraten kann („KOBALT 47" / „drei Fische tanzen
links" / magenta Kreis auf marineblau). `sonnet-worker`, `luna-worker`, `kimi-critic`
und `terra-worker` haben alle drei Angaben korrekt genannt. Die frühere Annahme
„nur Claude-Subagenten können Bilder sehen" ist damit widerlegt — bei der Panel-Besetzung
ist man also freier als gedacht.

**Sol ist der Sonderfall.** Seine bubblewrap-Sandbox kann auf diesem VPS keine einzige
Datei öffnen (`kernel.apparmor_restrict_unprivileged_userns=1`). Er bekommt deshalb
**nie** Pfade und **nie** Screenshots, sondern immer den fertigen Textausschnitt mit
Zeilennummern. Über eingebetteten Code urteilt er nachweislich korrekt.
Details: `ops/incidents/2026-07-27-sol-critic-tot.md` im command-center.

## Das Panel — drei Familien, weil eine Familie ihre eigenen Fehler nicht sieht

Regel 8 sagt: nichts prüft die eigene Hausarbeit. Praktisch heißt das für eine Website:

| Rolle | Besetzung | Bekommt |
|---|---|---|
| Code-Urteil | `sol-critic` (GPT) | Textausschnitt mit Zeilennummern, kein Pfad |
| Visuelle Kritik A | `grok-critic` (Grok) | `manifest.json` + alle Shot-PNGs |
| Visuelle Kritik B | andere Familie als Builder und A | dieselben Shots wie A |

Wer gebaut hat, prüft nicht. Nach Opus-Build ist visuelle Kritik A
`grok-critic` und B `kimi-critic`; nach Fable-Build ist `opus-critic` nur mit
Label „Instanz-Trennung“ zulässig. Jeder Kritiker gehört einer anderen Familie
als der Builder an; `opus-critic` prüft nie einen Opus-Build. Sol prüft
Code-Ursachen als Text, nicht die Shots.

**Kritik läuft immer doppelt plus Gegencheck** (Raphael 14.08.2026). Nie ein
Kritiker allein. Nie Haiku. Luna ist kein Kritiker — Luna macht Masse, nicht Urteil.
Beide Kritiker starten in EINER Nachricht. Danach zweiter Pass: jeder bestätigt
oder widerlegt die Befunde des anderen. Fixliste = überlebende Befunde.

**Judge-Form immer „pass/fail + eingefügter Beweis", nie „erkläre dein Denken"**
(Regel 19). Ein Befund ohne Beleg gilt als nicht gefunden.

**Zusammenführen:** Auf die Fixliste kommen ausschließlich die nach
`kritik-matrix.md` überlebenden Befunde aus der ersten Stufe-2-Kritik und, nur nach FAIL, dem nächsten Kritikdurchlauf. Bei
Widerspruch **nicht** nach Mehrheit entscheiden, sondern einen Verify-Agenten pro
strittigem Befund ansetzen, mit der Vorgabe „widerlegt, wenn unsicher". Mehrheit
belohnt sonst den häufigsten Irrtum.

## Reihenfolge: erst das Tor, dann das Panel

```
Build → g1-gate.mjs (Exit 0?) → shot-sweep.mjs → Kritik-Leaves lesen PNGs → Panel → Fixliste → Fix → zurück zum Tor
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

## RAM — live messen, keine Prosa-Deckel

Stand 01.09.2026: 62 GiB RAM, ~39 GiB verfügbar, 15 GiB Swap. Die alte
4–6-Subagenten-Zahl stammte von einer 31-GiB-Kiste mit OOM und gilt nicht mehr.

- Keine fachliche Obergrenze für die Agentenzahl. Unabhängige Pakete starten,
  soweit Runtime, Provider, RAM, Browser und Kontext tragen.
- Playwright/Screenshot-Sweeps belegen Browser. Panel und Sweep nicht blind
  gleichzeitig, wenn der freie RAM knapp ist.
- Writer: disjunkte `write_set`s oder Worktrees; Shared Files einen Owner.
- Keine künstliche Arbeit nur zur Auslastung.

## Modell und Effort

Regel 13: **erst Effort hoch, dann Modell teurer.** Ein `terra-worker` mit `effort: high`
löst mehr als ein größeres Modell auf Standard-Effort — und kostet weniger.

| Aufgabe | Besetzung |
|---|---|
| Art Direction, Struktur, Entscheidungen | Controller **entscheidet**, baut nicht: Kriterien schärfen, Pakete schneiden, Leaves starten |
| Substanzieller UI-Neubau / roter Design-Stand | Controller zerlegt → unabhängige Fable-/Astra-/Kimi-Pakete parallel → genau ein Integrator |
| Frontend-Code, Seite, Layout | **`fable-builder`, `astra-worker`, `kimi-worker` oder `opus-builder`** |
| Deutsche Verkaufscopy ins Markup | **`astra-worker`, dann `kimi-worker` oder `fable-builder`** — Opus schreibt nie Copy, er baut sie unverändert ein (`rolle-bau.md`) |
| Mechanik, Tests, Datenkram | `grok-worker` oder `sol-worker` (kein Urteil, keine Seite) |
| Massen-Lesen, Sortieren | `luna-worker`, `sonnet-worker` oder `terra-worker` |
| Visuelle Kritik einer Seite | Grok + `kimi-critic` (Opus hat gebaut), dann Gegencheck |
| Auslieferungs-Urteil Code | `sol-critic` (Textausschnitt) |

**Nie Haiku.** Fable, Astra und Kimi sind primäre Builder; Luna, Sonnet und Terra bauen keine Seite. HighSpeed verboten.

## Stufe 1 → Frontend: Delegation ohne Drift

Die Idee aus Kevin Kerns X-Post vom 19.08.2026 ist eine Harness-Kette:
Ein Leitmodell formuliert die Aufgabe, ein Delegator verteilt mehrere
UI-Blickwinkel, ein Frontend-Builder setzt die Entscheidung um. Für diesen Skill gilt:

- Der Controller zerlegt die Arbeit und delegiert direkt an die Leaves. Zerlegen
  heißt Pakete schneiden, nicht selbst bauen: kein CSS, keine Animationskurve,
  kein PNG-Read im Parent (`rolle-bau.md`).
- Das Cockpit schärft Kriterien und delegiert an alle unabhängigen
  `fable-builder`-, `astra-worker`- oder `kimi-worker`-Pakete bis zur Live-Kapazität.
- Unabhängige Opus-Pakete behandeln getrennte Kriterien oder getrennte Dateien.
- Parallele Analyse darf denselben Stand lesen. Paralleles Schreiben braucht
  disjunkte Dateien oder Worktrees.
- Genau ein Frontend-Builder integriert alle bestätigten Ergebnisse.
- Der Integrator bekommt Ziel, Referenzen, erforderliches Verhalten, Grenzen,
  Testplan und die vollständige Liste bestätigter Befunde.
- Danach folgen G1, Shot-Sweep, PNG-Reads durch Kritik-Leaves und familienfremdes Panel.

Ein Lauf ist bei einem dieser Befunde rot: überlappende Opus-Schreibbereiche,
fehlender Integrator, ein Bau ohne fremdfamiliäre Kritik — oder ein Cockpit,
das selbst gebaut hat statt zu delegieren.

## Was nie autonom passiert

Deploy und Launch sind Rot-Klasse. Das Tor kann grün sein, die Seite kann perfekt sein —
**veröffentlicht wird erst mit Raphaels Signatur** über `ops/review-inbox.md`.
