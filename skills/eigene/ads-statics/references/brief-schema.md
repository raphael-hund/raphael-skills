# Brief-Schema für Statics

Standardisiertes Format für Statics-Briefs. Ein Brief = eine Zelle in der
Angle × Visual-Style-Matrix. Kein Konzept ohne Grounding, siehe Blocker unten.

**Pflicht vor jedem Brief, in Reihenfolge:**
1. **Style wählen, BEVOR Copy geschrieben wird.** Style-ID aus `visual-styles.md` (S1–S8)
   festlegen. Nie Copy schreiben und dann einen Rahmen suchen.
2. **Clarity oder Curiosity ankreuzen.** Jede Static macht genau eines von beiden.
   Beides festhalten, nicht implizit lassen.

## Feld-Reihenfolge je Brief

```markdown
## Angle [ID] × Style [ID] — [Kurztitel]

**Angle:** [Winkel-Name + 1 Satz Referenz-Framing/Beleg, woher der Angle kommt]
**Visual Style:** [S1-S8 aus visual-styles.md, + Format 1:1/4:5/9:16]
**Wirkung:** [Clarity | Curiosity — genau eines ankreuzen]
**Copy-Bauform:** [1-6 aus copy-bauformen.md, ggf. + Primary-Text-Skelett 1-4]

**Onscreen-Copy:**
> [Text, in Rahmen-Sprache des gewählten Styles — Karte=Schlagzeile,
>  Post=Postsprache, Chat=Chatsprache, Schild=handschriftlich, Selfie=Storysprache.
>  Unter 35 Wörtern, Zahl+Zeit+Name wo möglich]

**Primary Text:**
> [Ganzer Text nach gewähltem Skelett, 600-1.200 Zeichen]

**Bild-Beschreibung:** [Szene + Stil + Format + exakter On-Image-Text, konkret genug,
  dass ein Designer/Bildgenerator ohne Rückfrage bauen kann. Safe-Zone beachten:
  9:16 anlegen, Kern im zentrierten 1:1]

**Grounding-Quelle:** [Pflichtfeld, echte Review/Winning-Ad/Ad-Kommentar/Kundenzitat aus
  voc.md, PROOF.md oder Kunden-Wiki. Kein Beleg = kein Brief, siehe Blocker unten]

**Status:** [sofort produzierbar | wartet auf Material: <was fehlt> | Grounding fehlt]
```

## Batch-Kopf (INDEX, ein Dokument pro Welle)

Am Dokumentanfang: Angle × Style-Matrix als Tabelle (● = sofort produzierbar,
⌀ = wartet auf Material), gefolgt von einer Material-Liste an den Kunden/Raphael für
alle ⌀-Zellen. So scannt der Reviewer den ganzen Batch in ~2 Minuten statt jeden Brief
einzeln zu öffnen.

## Layout-Vorlagen (Tiefe bei Bedarf)

Für die konkrete Bild-Komposition verweist dieses Schema auf die 15 Layout-Vorlagen im
ads-Router: `../../ads/references/vendor/coreyhaines-ads/static-ad-templates-en.md`. Dort
steht auch das Output-Format und die Batch-Verteilungsregel (über alle 15 zyklen, nicht
auf 2–3 Favoriten clustern). Nicht kopieren: verweisen.

## Grounding-Pflicht (harter Blocker)

Jedes Konzept braucht eine Quelle: echte Review, Winning-Ad, Ad-Kommentar oder Zitat aus
`client-<slug>/wiki/voc.md` / `PROOF.md`. Keine erfundenen Claims, Statistiken,
Testimonials, Chats oder Dashboard-Screens. Fehlt Rohmaterial für eine Zelle:
**stoppen und um Material bitten**, nicht ungegroundet weiterproduzieren. Dieselbe Härte
wie claims-qa, nur schon am Brief statt erst am Text.

## Kunden-Freigabe eines Batches

Für die Review-Runde beim Kunden das HTML-Artefakt aus dem ads-Router nutzen:
`../../ads/assets/creative-review-template.html` (ein File, JSON-Datenblock, kein Build).
Nicht Rohtext-Briefs als Freigabe-Artefakt verschicken.

## Gotchas

- **Ein Brief ohne Grounding-Feld ist gar kein Brief.** Das Feld leer lassen und
  „Status: wartet" reicht nicht. Der Blocker gilt für Erzeugung, nicht nur Auslieferung.
- **Mehr Headline-/Hook-Varianten schlagen mehr Body-Varianten.** Die
  Performance-Streuung sitzt im Hook, nicht im Body. Produktionszeit entsprechend
  verteilen.
- **Ein neues Design ist kein neues Konzept.** Neu ist nur, was Angle, Offer oder
  Persona ändert (siehe `../../ads/references/teil-strategie.md`). Ein Format-Wechsel ist eine Variante
  desselben Konzepts: gut gegen Fatigue, aber kein neuer Test. Mikro-Variationen
  (nur Hintergrundfarbe, nur Pose) sind als eigene Briefs wertlos: nicht separat
  messbar, Meta gruppiert sie zur selben Ad-ID.
