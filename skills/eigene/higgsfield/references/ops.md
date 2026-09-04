# Higgsfield-Ops (Website + Ads)

Job-Types aus `higgsfield model get`. Pfade als `--image` werden hochgeladen.

| Aufgabe | Job | Kurz |
|---|---|---|
| Neu / Restyle / Edit | `gpt_image_2` | `--image` mehrfach, `--prompt`, Final 4k high |
| Preview | `nano_banana_flash` | wegwerfen, nicht indexen als Final |
| Hintergrund weg | `image_background_remover` | genau ein Bild, Alpha |
| Expand / Uncrop | `outpaint` | `--aspect-ratio` z. B. 21:9 |
| Upscale schnell | `bytedance_image_upscale` | `--resolution 4k` |
| Upscale high-end | `topaz_image` | Breite/Hoehe plus Variante, siehe `bildgenerierung.md` |

```bash
higgsfield generate cost <job_type> --prompt "…"
higgsfield generate create image_background_remover --image ./foto.jpg --wait
higgsfield generate create outpaint --image ./hero.jpg --aspect-ratio 21:9 --wait
```

Nach Freisteller immer Trim, dann `bilder.mjs add` (`transparenz: true`).

Nicht in diesem Skill: Soul, Soul-ID, Video, 3D-Render-App, Relight, Angles,
Character-Swap. Nur wenn Raphael den Namen nennt.

Auth bleibt Dauer-Config. `hf` auf dem VPS ist HuggingFace.

## Ads-Static (Raphael, 03.09.2026)

PROPFIN-Welle 1 hat gezeigt: GPT Image 2 setzt Logo, Look und Text in einem Job,
wenn alle drei als Referenzen hochgeladen werden. Pillow-Overlay auf Copy und
Logo ist Fail (Umiken-Karten v1: Headline «Umike», Logo-Matsch).

**Vor dem Job Raphael zeigen:** Logo-Datei, Look-Referenz, Onscreen-Text wortgleich.
Fehlt das Logo, nicht bauen.

**Was «Look» heisst (Raphael, 04.09.2026):** nicht irgendein Screenshot, sondern eine
Referenz, die die Marke sichtbar trägt und aus der man ablesen kann:
- Schriftart und Schriftschnitt (Serif oder Grotesk, Italic-Akzent, Caps oder nicht)
- Farben als Hex (Primär, Sekundär, Akzent, Weiss)
- Signaturelement (Bogen, Linie, Rahmen, Kachel), Buttonform (Pill, Kante)
- Bildstil (Foto oder Typo, Licht, Grain, Farbverlauf)
Quelle: Website-Screenshot mit Headline und Button, Brand-Kit, oder eine bestehende
Winner-Ad der Marke. Diese vier Punkte stehen als Wörter in `brand.visual_identity`
und `brand.colors` der JSON-Spec, nicht nur als Bild. Ein Look-Bild ohne die
Spec-Wörter reicht nicht; die Spec-Wörter ohne Look-Bild reichen nicht.
Ist die Marke neu und ohne Website: Look aus zwei bis drei Foreplay-Winner-Ads des
Segments ableiten, die Wörter in die Spec schreiben, Raphael die Ableitung zeigen.

**Job**

```bash
higgsfield generate create gpt_image_2 \
  --prompt "<JSON-Spec plus TEXT RENDERING RULE unten>" \
  --image ./logo.png \
  --image ./look-website.jpg \
  --image ./inhalt.jpg \
  --aspect-ratio 1:1 --resolution 4k --quality high --wait
```

Reihenfolge der `--image`: (1) Logo, (2) Look, (3) Inhaltfoto oder Portrait.
Fehlt Inhaltfoto: nur Logo und Look, Spec beschreibt die Szene.
**Format (Raphael, 04.09.2026, gilt für alle Statics):** gpt_image_2 kennt kein 4:5 (geprüft 04.09.: nur 1:1, 4:3, 3:4, 16:9, 21:9, 9:16, 3:2, 2:3). Deshalb: in `3:4` generieren mit Safe-Zone-Anweisung in der Spec, dann `outpaint --aspect-ratio 4:5` (Feed-Master), dann `outpaint --aspect-ratio 9:16` (Story). Der Text sitzt komplett im 3:4-Kern, der Text sitzt komplett im 4:5. Danach mit `outpaint --aspect-ratio 9:16` nach oben und unten erweitern, nie im 9:16 direkt generieren. So passt dieselbe Karte in Feed (4:5) und Story (9:16), ohne dass Text in den Rand rutscht. Kein `1:1`, kein Direkt-9:16 für Statics.

**JSON-Spec Pflichtfelder:** brand.colors, brand.logo_placement («composite the
provided logo, NEVER redraw»), typography (eyebrow, headline, sub, cta), format
(aspect, 1080x1080 oder 1080x1350), layout-Zonen mit exaktem Text, constraints
(Swiss German, umlauts exactly, no ß, no ae/oe/ue, safe_zone inner 85 percent,
no em-dashes, no invented labels).

**TEXT RENDERING RULE** (immer ans Prompt-Ende):

```
TEXT RENDERING RULE: Render every piece of visible text EXACTLY as written,
character for character. Keep German umlaut characters (ä ö ü Ä Ö Ü) intact
and do NOT replace them with ae oe ue. No ß. Do not invent, translate, drop
or alter any text. Composite the provided logo reference without redrawing it.
```

**Nach dem Job:** Datei mit Read öffnen. Headline vollständig? Logo das echte,
nicht nachgezeichnet? Text = Spec? Fail → neuer Job, kein Pillow-Flicken.

Beleg-Creatives: `/root/clients/propfin/ads/creatives/feed/07-haus-zu-gross.png`,
`05-3-monate-wunschpreis-portrait.png`, `09-geerbt.png`.
