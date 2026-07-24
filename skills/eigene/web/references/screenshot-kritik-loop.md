# Screenshot-Kritik-Loop — wie Design ab jetzt entschieden wird (23.07.2026, Raphael)

**Kernregel:** Design wird NUR noch an Screenshots entschieden. Kein „muesste passen",
kein Code-Lesen als Ersatz fuer das Ansehen. Desktop zuerst (1440) — Mobile folgt als
Pflicht-Check, nicht als Design-Quelle.

## Ablauf (immer diese Reihenfolge)

### 1. Sweep
`node /root/raphael-skills/skills/eigene/web/scripts/shot-sweep.mjs --base <url> --out <dir> --routes <liste> [--hover ...] [--mobile]`
- First Fold 1440×730, Rest 1440×1400, Schritt 50 %. Niemals fullPage.
- Das Skript schreibt `manifest.json` — NUR dieses Manifest wird an Agents gegeben.

### 2. Selbst ansehen (Pflicht, nicht delegierbar)
Der ausfuehrende Agent liest JEDES PNG per Read. Befundliste schreiben:
`befund: <shot-datei> | <was falsch ist> | <vermutete Ursache>`.
Erst wer selbst gesehen hat, darf das Panel rufen.

**Besucher-Blick-Katalog (pro Shot explizit durchgehen, nicht nur "draufschauen"):**
1. **Koepfe/Gesichter angeschnitten?** Jedes Bild mit Personen: Ist irgendein Kopf am
   Rahmen abgeschnitten oder klebt am Rand? → immer HOCH, immer fixen (object-position
   auf Kopfhoehe, nicht Bildmitte). Diese Frage pro Personen-Bild einzeln beantworten.
2. Seltsamer Crop: Nur Ruecken/Haare/Koerperteile ohne erkennbares Motiv?
3. Text lesbar? (Kontrast auf Foto, Scrim vorhanden, nichts abgeschnitten)
4. Layout kaputt? (Ueberlappungen, Elemente ausserhalb, horizontales Scrollen auf Mobile)
5. Leere/kaputte Bilder, sichtbare Platzhalter?
6. Wuerde ein Besucher lachen oder stutzen? Wenn ja → Befund, egal ob "technisch korrekt".

Regel dazu (Raphael, 24.07.2026): Diese Dinge muessen von ALLEINE auffallen — er will
sie nicht ansagen muessen. Ein Sweep ohne diesen Katalog gilt als nicht angesehen.

### 3. Kritik-Panel (3 Rollen, parallel, frische Kontexte)
| Rolle | Agent | Liest | Auftrag |
|---|---|---|---|
| Code-Kritik („Zoll") | `sol-pruefer` | Die zum Befund gehoerenden Source-Dateien + die Befundliste (KEIN Manifest noetig — er prueft Code gegen Befund, nicht Screenshots) | „Verifiziere pro Befund die Code-Ursache (datei:zeile) oder widerlege ihn. Keine Design-Meinung ohne Code-Beleg." |
| Visuelle Kritik A („Opus-Register") | `sonnet-worker` | manifest.json + alle Shot-PNGs (per Read) | „Kritisiere Hierarchie, Spacing, Typo, Bildschnitt, CTA-Fuehrung pro Shot. Befund + Shot-Datei als Beleg." |
| Visuelle Kritik B (Kimi) | `kimi-recherche` | manifest.json + alle Shot-PNGs (per Read) | „Zweite, unabhaengige Sicht: Was wirkt wie KI-Slop, was ist inkonsistent ueber die Seiten? Befund + Shot-Datei als Beleg." |

Judge-Prompt-Form: IMMER „pass/fail + eingefuegter Beweis", NIE „erklaere dein Denken"
(Fable-Gotcha, Regel 19). Jeder Befund ohne Shot-Beleg gilt als nicht gefunden.

### 4. Verifizierte Fixliste
Der Cockpit-Agent merged: nur Befunde, die (a) von >=2 Panel-Mitgliedern ODER
(b) vom eigenen Auge + 1 Panel-Mitglied getragen werden, kommen auf die Fixliste.
Sol-Code-Befunde ohne sichtbaren Effekt kommen auf eine getrennte Hygiene-Liste.

### 5. Fix (Worker nach Doktrin)
Salsaflow-Frontend: `kimi-worker`. Der Fix-Prompt enthaelt: Fixliste MIT Shot-Belegen
(Dateipfade der relevanten PNGs pro Befund), betroffene Dateien, Verify-Kommandos
(Build/TS + Re-Sweep), Screenshot-Pflicht.

### 6. Re-Sweep + Vergleich
Gleiche Routes, gleiche Spec, NEUES out-Verzeichnis. Der Cockpit-Agent vergleicht
vorher/nachher pro Befund Shot fuer Shot. Nicht behoben → zurueck auf die Liste mit
Kommentar. Dann ALLE Seiten erneut pruefen (Nebenwirkungen), nicht nur die gefixte.

### 7. Abschluss
„Fertig" heisst: Fixliste leer ODER jeder Restpunkt hat einen begruendeten
„bewusst so"-Eintrag. Abschluss-Report listet pro Befund: vorher-Shot, nachher-Shot,
Status. Screenshots sind der Beweis, nicht Prosa.

## Verbote (hart)
- Kein fullPage-Screenshot, kein captureBeyondViewport (R20-Schein-Funde = Fullpage-Artefakte:
  fixed Elemente schweben mitten im Inhalt, leere Reveal-Flaechen).
- Kein Panel ohne vorheriges eigenes Ansehen der Shots.
- Kein „fixed" ohne Nachher-Shot, der das belegt.
- Keine Design-Entscheidung aus dem Code heraus (z.B. „sticky ist gesetzt" statt
  „auf dem Shot klebt der Tag sichtbar").
