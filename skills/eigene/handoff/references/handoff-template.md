# Übergabe-Brief — Template

Kopiere ausgefüllt an den Anfang des nächsten Prompts. Kurz, konkret, sofort startbar.

```
# HANDOFF — <Projekt/Kunde> — <Datum> — <ausgehende Session/Modell>

## Auftrag (1 Satz)
<was wird insgesamt gebaut>

## Stand
- ERLEDIGT: <Bullet-Liste>
- OFFEN (WIP=1, gerade aktiv): <genau ein Task>
- Gates-Status: G1 <grün/rot>, G2 <score/offen>, Ship-Bedingung <erfüllt/nicht>

## Nächster Schritt (exakt, sofort startbar)
<eine konkrete Anweisung — Datei, Befehl, Ziel>

## Entscheidungen (warum, damit nicht neu diskutiert)
- <Entscheidung → Grund>

## Kontext-Pfade
- Repo(s): <Pfade>
- Dossier/Brain: <relevante Dateien>
- Offene Fragen an Raphael (review-inbox): <falls vorhanden>

## Fallen & Sackgassen (Traps & Dead Ends)
- <Ansatz, der schon probiert und verworfen wurde → warum er nicht ging>
- <Was die nächste Session versucht sein wird zu tun, aber NICHT tun sollte>
```

## Regeln
- **State, not instructions:** Fakten formulieren ("Auth ist implementiert,
  Logout noch nicht"), nicht Befehle ("Implementiere als nächstes Logout").
  Die nächste Session entscheidet die Handlung selbst — der Brief liefert
  Boden-Wahrheit, keine Anweisung.
- Alles committet/gepusht, bevor dieser Brief geschrieben wird.
- Keine Vermutungen als Fakten — offene Punkte klar als offen markieren.
- Ein Task in OFFEN (WIP=1), nicht fünf halbfertige.
- **Redaction:** keine Secret-Werte (API-Keys, Tokens, Passwörter) im
  Brief — nur benennen, wo sie liegen (z. B. ".env, nicht committet").
