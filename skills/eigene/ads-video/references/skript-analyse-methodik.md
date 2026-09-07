# Skript-Analyse-Methodik — Raphaels Reverse-Engineering (2 Phasen)

Bevor ein neues Skript geschrieben wird: bestehende Referenz-Skripte (Kunde selbst,
Wettbewerb, Swipe-File) nach dieser Methodik zerlegen. Nie aus dem Gedächtnis
diagnostizieren. Jeder Beat braucht ein wörtliches Zitat.

## Phase 1 — pro Skript: Beats sequenziell zerlegen

Für **jedes** Referenz-Skript einzeln, in Lesereihenfolge:

Für jeden Beat:

| Feld | Bedeutung |
|---|---|
| **Funktion** | Hook / Context / Stakes / Proof / Reframe / Payoff / CTA (oder eigener Name, falls keiner passt — dann benennen, nicht erzwingen) |
| **Zeile(n)** | wörtliches Zitat, kein Paraphrase |
| **Wortzahl** | des Beats |
| **Psychologischer Job** | was der Beat beim Zuschauer bewirken soll (z. B. "senkt Skepsis", "erzeugt Selbst-Selektion") |
| **Device** | curiosity gap, pattern interrupt, specificity, social proof, open loop, contrast/common-belief, mechanism reframe, villain-naming, Anaphern-Kette, Autoritäts-Stakkato … (Devices nicht erfinden — aus `beat-struktur-und-aufbau.md` oder Beobachtung im Text selbst) |

Danach pro Skript eine Kopfzeile:

- **Gesamt-Wortzahl**
- **Hook-Wortzahl** (erster Beat bis zum Funktionswechsel — siehe Gotcha "Hook-Ende inhaltlich, nicht per Satzzahl")
- **Beat-Zahl**
- **CTA-Typ** (klick/Link, Termin/Anruf, DM-Wort, kein CTA: mit Begründung falls letzteres)

## Phase 2 — über alle Skripte: Vergleich + Skelett

Erst wenn Phase 1 für **alle** Referenz-Skripte steht:

1. **Vergleichstabelle.** Zeilen = Skripte, Spalten = Beats (in Lese-Reihenfolge des
   jeweiligen Skripts). Macht sichtbar, welche Beats wiederkehren und welche fehlen.
2. **Gemeinsames Skelett.** Die Beat-Sequenz, die über die Mehrheit der Skripte trägt.
   Je Skelett-Beat:
   - Funktion
   - Ø-Wortzahl über alle Skripte, die diesen Beat haben
   - Anteil an der Laufzeit (Ø-Wortzahl Beat / Ø-Gesamt-Wortzahl)
   - Top-2-3-Devices (die häufigsten, nicht alle beobachteten)
   - 1 starkes Original-Zitat als Beleg (mit Quellenangabe: welches Skript)
3. **Divergenzen mit Hypothese.** Skripte, die vom Skelett abweichen (Beat fehlt, andere
   Reihenfolge, Extra-Beat): je Divergenz eine Hypothese, warum (Format, ICP-Reife,
   Kanal-Placement, Awareness-Stufe). Keine Divergenz unkommentiert lassen.
4. **Fill-in-the-blank-Template.** Aus dem Skelett ein Lückentext mit Platzhaltern.
   Je Slot eine 1-Zeilen-Anweisung, was dort hinmuss (nicht wie es klingen soll:
   das übernimmt `copywriting`/`sprech-text-regeln.md`).

   Beispiel-Form:

   ```
   [HOOK: <ICP-Callout so spezifisch wie möglich> + <Outcome/Problem in 1 Satz>]
   [CONTEXT: <wer spricht, 1 Satz, spät genug dass Hook zuerst trägt>]
   [PROOF: <1-2 benannte Cases mit Vorher/Nachher-Zahl>]
   [MECHANISMUS: <benanntes System, kein Fachjargon-Overload>]
   [OFFER: <Angebot unmittelbar vor CTA>]
   [CTA: <konkrete Handlung + Zeitangabe>]
   ```

## Grounding-Pflicht

Jeder Beat-Eintrag in Phase 1 braucht das wörtliche Zitat als Beleg: keine
Zusammenfassung ohne Fundstelle. Ohne echtes Referenz-Material (mindestens 3-5
Skripte) keine Phase 2, sonst ist das "Skelett" geraten statt abgeleitet.

## Anwendung im ads-video-Ablauf

Diese Methodik läuft in Schritt 3 (Referenz-Skripte analysieren) des `ads-video`-
Ablaufs, bevor in Schritt 4 nach Skelett geschrieben wird. Referenz-Set: bestehende
Kundenskripte (`ads/skripte/` des Kunden) plus bei Bedarf Wettbewerbs-/Swipe-Material.
Bei MAKE: `/root/clients/make/ads/skripte/2026-07-22-MAKE-Ad-Skripte.md` (Stand 07.09.2026 auf Disk nicht vorhanden; 6 Skripte,
2 Bodies × Hook-Varianten) ist selbst schon ein Ergebnis dieser Methodik und kann direkt
als Referenz-Set für Phase 1 dienen.
