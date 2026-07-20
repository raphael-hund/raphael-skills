# Judge-Prompt-Vorlagen (pass/fail + Beweis-Stil)

**Kernregel (Regel 19 / Fable-Gotcha):** Niemals "explain your thinking", "show your work",
"begründe" oder "erkläre deinen Gedankengang" verlangen — das kann bei Fable die
`reasoning_extraction`-Refusal auslösen und still auf Opus zurückfallen. Immer: **pass/fail
mit eingefügtem Beleg aus dem Artefakt.**

## Struktur jedes Judge-Prompts

```
Du bewertest EIN Artefakt gegen eine Rubrik. Für jede Frage:
- Antworte NUR mit einer Zahl 0, 1 oder 2.
- Füge als Beweis das WÖRTLICHE Zitat aus dem Artefakt ein, das deine Zahl stützt.
- Kein Fließtext, keine Begründung, keine Meta-Kommentare.

Skala: 0 = fehlt/falsch · 1 = teilweise · 2 = erfüllt, Beleg vorhanden.

Rubrik:
1. <Ja/Nein-Frage> → Zahl + "Beleg: <Zitat>"
2. ...

Am Ende: SCORE = Summe/Maximum. VERDICT = PASS (>=0.7) | FAIL.
```

## Beispiel (Ads-Copy)

```
1. Enthält jeder Claim mit Zahl einen Beleg aus PROOF.md?  → 0/1/2 + Beleg
2. 0 verbotene Claims (Meta/HWG/UWG)?                       → 0/1/2 + Beleg
3. Klingt der Text in der Brand-Voice (VOICE.md)?           → 0/1/2 + Beleg
4. 0 LLM-Floskeln aus der Verbotsliste?                     → 0/1/2 + Beleg
SCORE = .. / 8   VERDICT = ..
```

## Panel-Modus (ship-kritisch)

3 Modellfamilien (Sonnet + Sol + Kimi) bewerten unabhängig, **frische Sessions**. Median je
Frage gegen Rubrik. Divergenz > 20 % zwischen den Judges → Flag an Raphael, 1 Regenerierung,
dann Eskalation. Kein Judge bewertet Output der eigenen Autor-Session.
