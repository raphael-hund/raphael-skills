# Bild-Assets & Higgsfield-Integration

Websites auf diesem Niveau sind visuelle Produkte: Der Hero braucht ein echtes
Visual, Features brauchen Beweise, Texturen brauchen Tiefe. Diese Datei definiert,
wann Assets generiert werden (statt gekauft, gezeichnet oder weggelassen) und wie
der Higgsfield-Workflow in die Phasen des Skills eingreift.

Grundregel: **Assets authoren statt dekorieren.** Ein generiertes Bild ersetzt
keine Idee; es setzt eine Idee um. Die Idee kommt aus der Ideation (Phase 0/1/6)
und den Patterns aus ui-inspo-patterns.md.

Inhalt: 1 Generieren oder nicht (Entscheidungsbaum) · 2 Die Asset-Brainstorm-Pflicht ·
3 Asset-Typen-Matrix · 4 Der Higgsfield-Ablauf · 5 Transparenz & Freisteller-Logik ·
6 Design-System-Anbindung · 7 Qualitäts-Gate · 8 Fallback-Kette · 9 Harte Regeln

---

## 1. Generieren oder nicht (Entscheidungsbaum)

Vor jedem Raster-Asset diese Kette durchlaufen, in Reihenfolge. Die erste
passende Antwort gewinnt:

1. **Ist es Funktion, nicht Bild?** Icons, Logos, Diagramme, Charts, echte
   Produkt-Screenshots, Tabellen → **CSS/SVG/echte Komponente**, niemals generieren.
   Generierter Text im Bild ist immer falsch (Fake-UI-Verbot aus design-doktrin.md
   gilt unverändert).
2. **Gibt es das Asset schon echt?** Kunden-Logo, Produktfoto des Kunden, Teamfoto,
   echter Screenshot → Original verwenden. Echtheit schlägt Generierung.
3. **Trägt die Sektion ohne Raster-Asset?** Texturen, Gradients, Patterns gehen oft
   in reinem CSS (effekte.md). Wenn CSS das Ziel erreicht → CSS.
4. **Braucht die Sektion Emotion, Produktbeweis oder Welt?** Hero, Features,
   Testimonials, og-image, Blog-Header → **generieren mit Higgsfield**.
5. **Kein Higgsfield verfügbar** → Fallback-Kette (Abschnitt 8).

Faustregel: Eine Landing bekommt 3–7 generierte Assets (1 Hero, 2–4 Feature-/
Sektions-Visuals, 1 og-image, ggf. Textur). Weniger wirkt unfertig, mehr wird
Dekoration ohne Auftrag.

## 2. Die Asset-Brainstorm-Pflicht (vor jedem Generieren)

Kein Prompt ohne vorherige schriftliche Mini-Ideation in der DESIGN.md unter
"Asset-Entscheidungen". Sechs Fragen pro Asset:

1. **Funktion**: Emotion (Lifestyle, Szene) · Erklärung (Produkt, Feature-Beweis) ·
   Welt (Textur, Bühne, abstraktes Keyvisual)? Eine Funktion pro Asset.
2. **Medium**: `foto` (Produkt, Mensch, Szene, Material) oder `illustration`
   (Konzept, 3D-Icon, Abstraktion)? Kamera-Sprache nur bei foto.
3. **Bühne**: Mitgenerierter Hintergrund ODER Freisteller (transparent) auf
   CSS-Bühne? Entscheidung nach Pattern (ui-inspo-patterns.md P03/P04/P16):
   Überlappungen, angeschnittene Motive und Floating-Composites verlangen
   Transparenz; Vollflächen-Bühnen (Footer-Eskalation, Hero-Gradient) können
   mitgeneriert werden.
4. **Stil-Verankerung**: Welche 1–3 Referenzen aus Phase 0 definieren den Look?
   Ohne Stil-Referenz wird nicht generiert.
5. **System-Anschluss**: Wo steckt die Akzent-Hue im Bild (Rim-Light, Glow,
   Textil, Produktfarbe)? Wo bleibt das Bild bewusst neutral?
6. **Verhältnis & Slot**: Ziel-Slot im Layout (Seitenverhältnis, Breite, Crop-
   Verhalten, Retina-Budget) VOR der Generierung festlegen, nicht nachträglich
   zuschneiden.

Wer diese sechs Antworten nicht in je einem Satz geben kann, ist noch nicht
bereit für `generate create`.

## 3. Asset-Typen-Matrix

| Asset | Medium | Transparenz | Seitenverhältnis | Ops-Bedarf |
|---|---|---|---|---|
| Hero-Keyvisual (Produkt im Lebenskontext) | foto | meist nein | 16:9 / 4:5, slotabhängig | Upscale 4k |
| Produkt-Freisteller (Cutout auf Bühne) | foto | **ja** | 1:1 / 4:5 | background_remover + Expand |
| Feature-Visual / Show-don't-tell-Motiv | foto oder illustration | nach Komposition | 4:3 / 3:2 | Expand für Slots |
| 3D-Icon / Glas-Deko / abstraktes Ornament | illustration | **ja** | 1:1 | background_remover |
| Textur / Grain-Träger / Mesh-Basis | illustration | nein | 16:9, kachelbar | meist keine |
| og-image / Social-Card | foto oder illustration | nein | 1.91:1 (1200×630) | Expand exakt |
| Blog-/Ratgeber-Header | foto | nein | 21:9 / 16:9 | Upscale |
| Avatar / Person | foto | nach Slot | 1:1 | nur mit echter Referenz (Regel §9) |
| Video-Loop im Hero (Bild-zu-Video) | foto-Startbild | nein | slotabhängig | Veo/Kling via higgsfield video |

**Niemals generieren**: Icons (Icon-Library), Kundenlogos (Simple Icons CDN),
Charts/Daten (echte Komponente), UI-Screenshots des eigenen Produkts (echter
Screenshot oder echte Mini-Komponente), QR-Codes, Karten mit echten Orten.

## 4. Der Higgsfield-Ablauf

Voraussetzung: `higgsfield` CLI installiert und eingeloggt (`which higgsfield`,
sonst `higgsfield auth login`). Nie `hf` tippen (HuggingFace-Kollision). Der
vollständige Higgsfield-Skill (Referenzen foto-prompt, illustration, ops, video)
ist auf dem System installiert und hat Vorrang bei Tool-Details; diese Datei
definiert die Design-Logik darum.

1. **Medium wählen** (foto/illustration, siehe §2).
2. **Zwei Kontexte als Dateien**: Inhaltkontext (was zu sehen ist: echte
   Produktseite, Referenzfoto, Pexels/Unsplash-Fund) und Stilkontext (wie es
   gemacht ist: 1–3 Referenzen aus Phase 0). Inhalt suchen statt halluzinieren.
   Seiten-Screenshots sind immer Stil, nie Inhalt.
3. **Cost vor Create**: `higgsfield generate cost gpt_image_2 --prompt "…"`.
   Cost-Zeile im Lauf nennen.
4. **Preview-Loop**: Komposition mit `nano_banana_flash` iterieren (billig),
   bis Framing, Bühne und Licht sitzen. Nie Finals als Preview verschwenden.
5. **Final**: immer `gpt_image_2`, `--resolution 4k --quality high`:

```bash
higgsfield generate create gpt_image_2 \
  --prompt "Inhaltkontext: … from image 1. Stilkontext: camera/color/setup from image 2. Accent hue #<hex> as rim light only. Do not invent the subject." \
  --image ./inhalt.jpg --image ./stil-1.jpg \
  --aspect-ratio 16:9 --resolution 4k --quality high --wait
```

6. **Ops** nach Bedarf: Freisteller (`image_background_remover`), Expand
   (`outpaint`, Seitenverhältnis nachträglich ändern ohne Neu-Generierung),
   Upscale (`bytedance_image_upscale` / `topaz_image`).
7. **Read-Check**: Ergebnis mit Read/ReadMediaFile ansehen (§7).
8. **Index**: Projekte mit `bilder.mjs`/Media-Index: Eintrag mit `--typ`,
   deutschem `--motiv` (Pflicht-Bildtext, wird Alt-Text), `--style`, `--modell`,
   `--ref`, `--quelle`. Sonst Dateiname plus Notiz im Projekt. Der `--motiv`-Text
   fließt direkt in den `alt`- und SEO-Bildplan (planung-und-seo.md §5.3).

## 5. Transparenz & Freisteller-Logik

Transparente Assets (Alpha-PNG) sind das Werkzeug für die stärksten Patterns:
Produkt-Cutouts auf Gradient-Bühnen, schwebende Karten-Komposites, am Rand
angeschnittene Motive, Overlap-Brüche, Deko-Ornamente über Sektionsgrenzen.

**Drei Wege zum transparenten Asset:**

1. **Direkt generieren**: GPT Image kann mit transparentem Hintergrund
   rendern. Im Prompt explizit fordern: "isolated subject on transparent
   background, no shadow, clean alpha edges". Gut für 3D-Icons, Ornamente,
   einfache Objekte.
2. **Nachträglich freistellen**: `image_background_remover` auf ein fertiges
   Bild. Besser bei komplexen Motiven (Haare, Glas, Produkte), weil das
   Motiv zuerst in Ruhe komponiert werden kann.
3. **Expand statt neu generieren**: `outpaint`, wenn der Bildausschnitt nicht
   zum Slot passt (z. B. 1:1 → 4:5) oder ein angeschnittenes Motiv mehr Raum
   braucht.

**Disziplin bei Transparenz:**

- **Kanten-Check auf beiden Welten**: Freisteller immer auf dunklem UND hellem
  Hintergrund prüfen (Fringing, Halos, matte Kanten). Bei Halo: neuer Ops-Lauf
  oder Bild nicht freistellen.
- **Schatten-Strategie festlegen**: Entweder Kontaktschatten mitgenerieren
  (realistischer, aber an einen Bg gebunden) ODER ohne Schatten freistellen und
  Schatten per CSS (`filter: drop-shadow(...)`, getönt zum Bg-Hue) setzen
  (flexibel, aber flacher). Nie beides.
- **Bühne aus dem System**: Die Fläche unter dem Freisteller kommt aus den
  DESIGN.md-Tokens (Gradient in OKLCH, Grain-Overlay aus effekte.md). Nie das
  Modell einen zufälligen Hintergrund erfinden lassen, wenn die Bühne CSS kann.
- **Format**: Alpha braucht PNG (oder WebP mit Alpha); nie JPEG für Freisteller.
  Gewicht budgetieren (Performance-Budget in sektionen-und-funnels.md §3).

## 6. Design-System-Anbindung

Generierte Assets gehören derselben Welt an wie das Interface:

- **Akzent als Rim-Light** (Pattern P02): Die Akzent-Hue aus DESIGN.md erscheint
  im Prompt als Lichtquelle, Glow, Textil oder Produktakzent ("Accent hue #hex
  as rim light only"). Dadurch wirken Render und UI wie ein System, ohne dass
  das Bild bunt wird.
- **Neutral-Disziplin im Bild**: Wie im Interface gilt 90/9/1 auch im Asset:
  überwiegend neutrale Szene, Akzent punktuell, maximal ein Asset pro Seite mit
  Vollflächen-Farbe.
- **Eine Stil-Bibel pro Projekt**: Dieselben 1–3 Stil-Referenzen für ALLE
  Assets einer Seite wiederverwenden; in DESIGN.md unter "Iconography & Imagery"
  festhalten (Bildsprache: was/was nicht, Licht, Material, Perspektive). Fünf
  Assets in fünf Stilen = fünf Websites.
- **Bildsprache-Verbote**: Kein Stock-Look (lachende Menschen am Laptop,
  Handshake, Whiteboard), keine erfundenen UI-Screens mit Pseudotext, kein
  Text im Bild (Text setzt das HTML), kein Wasserzeichen-Look, keine
  KI-Glitches (Extra-Finger, Spiegelungsfehler) im Final.
- **Bilder-SEO mitdenken**: beschreibende Dateinamen, deutscher Alt-Text aus
  dem Index-Motiv, width/height gegen CLS, Hero-Asset mit priority, Rest lazy,
  WebP/AVIF-Ausgabe, og-image 1200×630.

## 7. Qualitäts-Gate (nach jedem Job, vor dem Index)

Ergebnis mit Read/ReadMediaFile ansehen und prüfen:

- **Motiv-Treue**: Zeigt das Bild, was der Inhaltkontext vorgab? Falsches Motiv
  → neuer Job, kein stilles "passt schon".
- **Anatomie & Physik**: Fake-Gesichter, Hände, Extra-Glieder, unmögliche
  Reflexionen → neuer Job.
- **Komposition**: Kopf/Motiv ungewollt am Rand abgeschnitten, Horizont schief,
  Fokus falsch → neuer Job oder Expand.
- **Text im Bild**: Pseudotext, Buchstabensalat, fake UI → neuer Job (oder
  Motiv so ändern, dass kein Text nötig ist).
- **System-Passung**: Stimmt Hue/Licht/Material mit der DESIGN.md überein?
  Bei Abweichung: Stil-Referenz schärfen, nicht das Design ans Bild anpassen.
- **Technik**: Auflösung ausreichend für 2× Retina im Slot, Banding in
  Gradients (dann Grain aus effekte.md drüber), Kompressions-Artefakte.

Nach jedem Fix-Versuch neu prüfen. Ein Asset, das das Gate zweimal nicht
schafft, bekommt eine neue Ideation (§2), nicht einen dritten Zufallsversuch.

## 8. Fallback-Kette (wenn Higgsfield nicht verfügbar)

1. `higgsfield` CLI fehlt/nicht eingeloggd → installieren/einloggen oder:
2. `image_generation`-Plugin (GPT Image direkt) mit denselben §2-/§6-Regeln.
3. Beides nicht verfügbar → kuratiertes Stock (Pexels/Unsplash mit echter
   Suche, kein Zufalls-Link) ODER `picsum.photos/seed/{beschreibender-seed}/{w}/{h}`
   als temporärer Slot.
4. Immer: Slot im Code klar kennzeichnen (Kommentar + Hinweis an den Nutzer,
   welche Assets noch generiert werden müssen). Fake-Screenshots und Div-Deko
   sind KEINE Fallbacks, sie bleiben verboten.

## 9. Harte Regeln

- Final-Bild = `gpt_image_2` (4k, high). Recraft nicht aufrufen.
  `nano_banana_flash` nur Preview, nie als Final indexen.
- Cost vor jedem `generate create`.
- Mindestens eine Stil-Referenz pro Job; Inhalt suchen statt halluzinieren.
- Kamera-Sätze (Linse, Blende, Setup) nur bei `foto`.
- Kein erfundenes Kunden-Gesicht in Nahaufnahme: echte Personen-Referenz
  (Kunde oder Stock) nötig, sonst Distanz/Rücken/Hände.
- Soul, Soul-ID, 3D-Render-App, Relight, Angles, Character-Swap nur auf
  explizites Wort des Nutzers.
- Kein generierter Text, keine generierte Fake-UI, keine generierten Logos.
- Freisteller: Kanten-Check auf hell + dunkel, Schatten-Strategie vorher
  festlegen, PNG/WebP-Alpha.
- Jedes Final-Asset: Read-Check + Index-Eintrag mit deutschem Motiv
  (Pflicht-Bildtext) + Slot-Verknüpfung.
