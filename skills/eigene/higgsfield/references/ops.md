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
