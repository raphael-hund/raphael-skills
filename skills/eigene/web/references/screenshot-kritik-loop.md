# Screenshot-Kritik-Loop — wie Design ab jetzt entschieden wird (23.07.2026, Raphael)

**Kernregel:** Design wird NUR noch an Screenshots entschieden. Kein „muesste passen",
kein Code-Lesen als Ersatz fuer das Ansehen. Desktop zuerst (1440) — Mobile folgt als
Pflicht-Check, nicht als Design-Quelle.

## Ablauf (immer diese Reihenfolge)

### 0. Wiederkehrender Health-Sweep (optional, nur für Live-Kundenseiten, per Cron)

Unterschied zum Rest dieser Datei: DAS hier läuft nicht auf expliziten Auftrag,
sondern regelmäßig im Hintergrund über einen Cron-Job (nie als versteckte
Runtime-Schleife — Cron ist einziger Zeitplan-Besitzer, siehe AGENTS.md).
Erst Gesundheit (Konsole-Fehler, 404s, Ladezeit, Mobile-Viewport), dann Ästhetik.

1. Cron ruft `shot-sweep.mjs` auf denselben Kern-Routen einer Live-Kundenseite
   auf (z. B. täglich), Output in `state/health-sweeps/<datum>/`.
2. Eine kostengünstige Vergleichs-Rolle vergleicht den neuen Sweep NUR gegen den
   Besucher-Blick-Katalog (Schritt 2 unten) und schreibt Auffälligkeiten
   in ein Ledger: `state/screenshot-ledger.md` — eine Zeile pro Beobachtung
   (Datum, Route, Befund, Screenshot-Pfad). Kein Fix, keine Bewertung, nur
   Beobachtung.
3. **3-4x-Regel:** Eine Beobachtung wird erst zum "Befund" (und landet auf der
   echten Fixliste), wenn dieselbe Auffälligkeit an derselben Stelle **3-4 Mal
   an unterschiedlichen Tagen** im Ledger auftaucht. Einmalige Glitches (CDN-
   Hickup, kaputter Screenshot) werden so herausgefiltert, bevor sie einen
   Panel-Lauf auslösen.
4. Erst wenn ein Muster bestätigt ist: normaler Ablauf ab Schritt 1 dieser
   Datei (Sweep→Selbst-ansehen→Panel→Fixliste→Fix→Re-Sweep) — der
   Health-Sweep liefert nur den Auslöser, nicht die Entscheidung.

Cron-Vorschlag (Raphael muss freigeben, nicht Teil dieser Synthese-Datei):
täglich außerhalb der Stoßzeiten, ein Job pro aktivem Kundenprojekt mit
Live-Website.

**WICHTIG:** Kein Cron wird von einer ausführenden Rolle selbst angelegt. Dauerbetrieb nur
mit Raphael-Einzelfreigabe pro Kunde + Kostenlimit.

### 1. Sweep
`node /root/raphael-skills/skills/eigene/web/scripts/shot-sweep.mjs --base <url> --out <dir> --routes <liste> [--hover ...] [--mobile]`
- **`--base` ist Pflicht** mit der echten Dev-/Live-URL. Ohne Flag: Exit 2 + Usage (Anfänger-Falle #2 in `anfaenger-pfad.md`; stiller Port-5280-Default ist entfernt).
- First Fold 1440×730, Rest 1440×1400, Schritt 50 %. Niemals fullPage.
- Das Skript schreibt `manifest.json` — NUR dieses Manifest wird an die Kritik-Rollen gegeben.

### 2. Selbst ansehen (Pflicht, nicht delegierbar)
Die ausführende Rolle öffnet JEDES PNG mit dem verfügbaren Bildlese-Werkzeug. Befundliste schreiben:
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
| Rolle | Fähigkeit | Liest | Auftrag |
|---|---|---|---|
| Code-Kritik („Zoll") | unabhängige Code-Ursachenprüfung | Die zum Befund gehoerenden Source-Dateien + die Befundliste (KEIN Manifest noetig — sie prueft Code gegen Befund, nicht Screenshots) | „Verifiziere pro Befund die Code-Ursache (datei:zeile) oder widerlege ihn. Keine Design-Meinung ohne Code-Beleg." |
| Visuelle Kritik A | erste unabhängige visuelle Prüfung | manifest.json + alle Shot-PNGs | „Kritisiere Hierarchie, Spacing, Typo, Bildschnitt, CTA-Fuehrung pro Shot. Befund + Shot-Datei als Beleg." |
| Visuelle Kritik B | zweite unabhängige visuelle Prüfung | manifest.json + alle Shot-PNGs | „Zweite, unabhaengige Sicht: Was wirkt wie KI-Slop, was ist inkonsistent ueber die Seiten? Befund + Shot-Datei als Beleg." |

Judge-Prompt-Form: IMMER „pass/fail + eingefuegter Beweis", NIE eine Aufforderung,
internes Denken offenzulegen. Jeder Befund ohne Shot-Beleg gilt als nicht gefunden.

### 3b. Blind-A/B vs. Weltklasse-Referenz (Pflicht bei Ship / Premium / Gauntlet)

Das Panel allein bewertet nur die eigene Seite. Self-Preference-Bias bleibt.
Deshalb zusaetzlich (frische Session, andere Modellfamilie als Builder):

1. **Kandidat-Shots** aus dem aktuellen Sweep (First Fold + 1–2 Key-Sections).
2. **1–2 Referenz-Shots** derselben Seitentyp-Klasse (Awwwards/Land-book-Niveau
   oder Raphael-gewaehlte Best-in-Class). Lizenz: nur intern vergleichen, nicht
   klonen — `web-clone-playbook.md` Iron Rule bleibt.
3. **Paarweise Runs (hart):** Jeder Richter-Lauf bewertet **genau ein Paar**
   (ein Kandidat-Shot vs. ein Referenz-Shot als A/B). Mehrere Shots = mehrere
   getrennte Runs, kein Mehrbild-Dump in einem Prompt.
4. Dateien **anonymisieren** (`shot-a.png`, `shot-b.png`). Labels „unsere
   Seite“ / Markennamen entfernen. **Positions-Tausch:** in der Haelfte der
   Laeufe Kandidat als A, sonst als B (Bias-Kontrolle).
5. Richter-Prompt (nur pass/fail-Form):
   - Pro Achse aus `agentur-rubrik.md` (Visual / Usability / Creativity / Content-Trust):
     `besser A | besser B | unentschieden` + **ein** Satz Beleg am Bild.
   - Am Ende: `GEWINNER: A|B|unentschieden` · **genau EINE** groesste Luecke des
     Verlierers · `BELEG: <dateiname>`.
   - Kein „erklaere deinen Gedankengang“.
6. Kandidat verliert klar auf Visual oder Usability → groesste Luecke auf die
   Fixliste (P0), nicht „Geschmackssache“.
7. Optional Gauntlet: wiederholen bis Zugewinn klein oder max. Kritik-Zyklen
   (unten) erreicht — Messlatte bleibt die Referenz, nicht „ok fuer KI“.

Rollen-Mapping: `agent-roster.md` → Blind-A/B-Richter.

### 4. Verifizierte Fixliste
Die aktuelle Koordination merged: nur Befunde, die (a) von >=2 Panel-Mitgliedern ODER
(b) vom eigenen Auge + 1 Panel-Mitglied getragen werden, kommen auf die Fixliste.
Blind-A/B-Luecken (Kandidat verliert) zaehlen wie Panel-Mehrheit.
Code-Befunde ohne sichtbaren Effekt kommen auf eine getrennte Hygiene-Liste.

### 5. Fix (Worker nach Doktrin)
Die Implementierungs-Rolle erhält: Fixliste MIT Shot-Belegen
(Dateipfade der relevanten PNGs pro Befund), betroffene Dateien, Verify-Kommandos
(Build/TS + Re-Sweep), Screenshot-Pflicht.

### 6. Re-Sweep + Vergleich
Gleiche Routes, gleiche Spec, NEUES out-Verzeichnis. Die aktuelle Koordination vergleicht
vorher/nachher pro Befund Shot fuer Shot. Nicht behoben → zurueck auf die Liste mit
Kommentar. Dann ALLE Seiten erneut pruefen (Nebenwirkungen), nicht nur die gefixte.

### 7. Abschluss + Abbruchkriterium
„Fertig" heisst: Fixliste leer ODER jeder Restpunkt hat einen begruendeten
„bewusst so"-Eintrag. Abschluss-Report listet pro Befund: vorher-Shot, nachher-Shot,
Status. Screenshots sind der Beweis, nicht Prosa.

**Max. 3 Zyklen** Panel/Blind → Fix → Re-Sweep. Danach keine Runde 4:
- Panel-Divergenz &gt;20 % der Befunde (keine 2er-Mehrheit) → Eskalation Cockpit.
- Blind-A/B weiter klar verloren und kein messbarer Shot-Fortschritt → Raphael
  oder Richtungswechsel (Art Direction), nicht weiteres Pixel-Schleifen.


## Verbote (hart)
- Kein fullPage-Screenshot, kein captureBeyondViewport (R20-Schein-Funde = Fullpage-Artefakte:
  fixed Elemente schweben mitten im Inhalt, leere Reveal-Flaechen).
- Kein Panel ohne vorheriges eigenes Ansehen der Shots.
- Kein „fixed" ohne Nachher-Shot, der das belegt.
- Keine Design-Entscheidung aus dem Code heraus (z.B. „sticky ist gesetzt" statt
  „auf dem Shot klebt der Tag sichtbar").
