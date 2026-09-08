# Bewegung erklärt einen Zustand, sie dekoriert nie

## TLDR

Bewegung zeigt dem Nutzer, was sich gerade geändert hat (Schritt weiter, Karte gezogen, Chart geladen) — alles andere ist Dekor und wird weggelassen oder per `prefers-reduced-motion` abgeschaltet.

---

## Regeln

Jede Regel trägt ihren Beleg. Zahlen ohne Quelle im Corpus sind als **Startwert** markiert.

### R1. Jede Animation hat einen Satz Begründung

Der Hook darf Aufmerksamkeit öffnen. Danach bewegt sich nur, was Hierarchie, Story, Feedback oder Zustand — sonst streichen. Beleg: `prior_corpus.md` (`taste-SKILL.md:361`). Fade-up als reflexhafte Politur auf jeder Sektion ist ein Slop-Marker (`unslop-react-design.md:64`).

### R2. Nur `transform` und `opacity` animieren

Beleg: `prior_corpus.md` (`taste-SKILL.md:527`). Gegenbeleg aus eigener Quelle: `twentyfirst.md` (969-source.txt) nutzt `transition:all` — das animiert Layout-Properties und wird dort selbst als Fehler benannt. Ausnahme aus dem Corpus: `stroke-dashoffset` für Chart-Draw-in (`2096175237109092642-video-1.md`, Abschnitt 4) und `width` beim Progress-Fill (`2096192737867350330-video-1.md`, second-02→16).

### R3. `prefers-reduced-motion` ist Pflicht, nicht Bonus

Durchgehender Befund: `designmd_supply.md` (globals.css:265–281 schaltet alles ab), `open_design.md` (Nachbau Reveal mit Reduce-Block), `prior_corpus.md` (`taste-SKILL.md:531`), `gap-marcelkargul.md` (`motion-reduce:hidden` beim Ripple-Dot), `twentyfirst.md` (Reduce-Block im Hover-Button). Wer einen Loop ohne Reduce-Block baut, baut gegen den ganzen Corpus.

### R4. Zwei Dauer-Stufen reichen: 150 ms schnell, 240–300 ms Standard

Beleg: `open_design.md` (atelier-tokens.png Motion-Block x763–1050 y560–615: 150/240 ms, Ease `cubic-bezier(0.2,0,0,1)`), `twentyfirst.md` (300 ms Standard für Buttons/Karten, 400 ms für Bild-Transforms, 969-source.txt + 8223-source.txt), `shadcn.md` (Button `transition:all .15s`, Input-Ring `.15s`). **Startwert:** Overlays 100 ms (shadcn Dialog), Step-Wechsel 400 ms (Onboarding-Flow, gemessen an Frame-Folge).

### R5. Eine Easing-Kurve pro Seite

`cubic-bezier(.2,.8,.2,1)` ist die einzige Kurve, die zwei unabhängige Quellen teilen: `designmd_supply.md` (globals.css:94–107, für alle Einblendungen) und `2096192737867350330-video-1.md` (Nachbau Step-Wechsel). Alternativ belegt: `cubic-bezier(.16,1,.3,1)` für Reveals (`prior_corpus.md`, `taste-SKILL.md:561`) und `cubic-bezier(0.2,0,0,1)` als Standard-Ease (`open_design.md`). Regel: eine wählen, nicht mischen.

### R6. Bühne fix, Szene bewegt

Beleg: `2096192737867350330-video-1.md` second-04/07/09 — Nav, Hintergrund-Monogramm und Progress-Bar bleiben pixelidentisch stehen; nur der Step-Container bewegt sich. Gleiches Muster bei `layers.md`: Chrome statisch, Bewegung nur im Motiv (Video/Canvas).

### R7. Draw-in für Charts: einmalig beim Viewport-Eintritt, nie als Loop

Beleg: `2096175237109092642-video-1.md` — frame-05.jpg zeigt zwei komplett leere Panels; Charts rendern erst beim Eintritt (IntersectionObserver). frame-03 vs. frame-04: Donut-Segmente erst verstreut, dann geschlossen → `stroke-dashoffset`-Draw-in. `2096175237109092642-video-2.md` Abschnitt 7: Speedometer frame-24 (nur Endkappe) → frame-25 (voller Bogen). Don't belegt: `2096175237109092642-video-2.md` Don'ts — „Kein Draw-in Loop im Produktiv-Dashboard; einmal beim Mount, `prefers-reduced-motion` respektieren."

### R8. Endlos-Demo-Animationen sind Demo, nicht Produkt

Beleg: `2096175237109092642.md` Abschnitt 11 — KPI-Zahlen wechseln zwischen contact-01 und contact-02 (880→718, 1297→1125, 874→892); Speedometer-Endkappe ragt als Animationsartefakt ins Standbild (frames/frame-09.jpg x575–590 y620–670). Regel dort wörtlich: „Werte nur bei Datenänderung bewegen." Startwert für Produkt: Gauge-Transition 600 ms nur bei Datenänderung.

### R9. Progress-Fill läuft synchron zum Step-Wechsel

Beleg: `2096192737867350330-video-1.md` — Fill wächst 27→50→78→106→133→160 px auf 320 px Track (~8-%-Schritte), Transition 400 ms gleichzeitig mit dem Step-Slide. Progress steht fix unten (320×8 px, 14 px vom Rand).

### R10. Erfolgs-Feier ist kurz, markentreu und endet

Beleg: `2096192737867350330-video-2.md` second-30→32 — ~80 Partikel, 4–8 px, nur Graustufen (#5A5A5A/#9A9A9A/#FFF), Fall über ≈1 s, dann ausgeblendet (Opacity ≈0.3 bei second-32). Gegenbeleg: `mobbin-2.md` (Apollo) — buntes Konfetti ohne Reduced-Motion-Regel und ohne Backend-Bestätigung ist dort als „Lüge" benannt. Konfetti erst nach echter Erfolgs-Antwort, nie beim Rendern der Erfolgsseite.

### R11. Drag-Zustand = Rotation + Schatten + gestrichelter Ghost

Beleg: `2096889729337921598.md` (HRml921acAEzvBx.jpg) — Karte „WEB-28" rotiert ~−4° mit `box-shadow:0 14px 30px rgba(0,0,0,.15)`; Ursprungsslot als `1.5px dashed #C9CDD2`-Platzhalter. Einziger Schatten in dieser UI ist Aktion gebunden (Schatten nur für Drag/Fokus).

### R12. Hover ist eine Zustandsebene, nicht eine Farbe

Belege: `2096215770783199316.md` — Hover-Spalte im Chart ist die einzige Raised-Ebene des Screens: weisser Fill, Radius 8, `0 4px 24px rgba(0,0,0,.08)`, volle Chart-Höhe inkl. Label. `2096165490498695410.md` — Menü-Hover als Tint `rgba(255,255,255,.06–.08)`, Radius 10, inset 4 px. `shadcn.md` — aktiver Sidebar-Eintrag als Chip #262626 mit Border gleicher Farbe.

### R13. Overlay-Animation bleibt unter 150 ms

Beleg: `shadcn.md` Abschnitt 5 — Dialog 100 ms, Fade + Zoom von 95 %, gesteuert über `data-open`/`data-closed`. Blur auf dem Overlay kostet Mobile-Performance (dort als Slop-Risiko notiert).

### R14. Marquee maximal einmal pro Seite — und nur mit Reduce-Fallback

Beleg: `prior_corpus.md` (`taste-SKILL.md:362`). Indizien für Marquees aus Standbildern: `refero-2.md` (Linear-Logozeile angeschnitten links/rechts), `2096931638118871502.md` (Logozeile mit 250-px-Fade-Masken beidseitig), `designmd-me-1.md` (Logo-Bar läuft aus dem Container). Bewegung selbst ist in keinem Standbild bewiesen — statisch nicht belegbar.

### R15. Reveal per IntersectionObserver oder `animation-timeline:view()`, nie per Scroll-Listener

Beleg: `prior_corpus.md` (`taste-SKILL.md:511` verbietet `window.addEventListener('scroll')`). Reveal-Rezept dort: 0.6 s, `cubic-bezier(.16,1,.3,1)`, 60 ms Stagger, `animation-range:entry 0% entry 30%`.

### R16. Unsichtbarer Inhalt bei pausiertem Reveal ist ein Hard-Fail

Beleg: `neuform-1.md` — Karte D linke Canvas-Hälfte leer („Reveal pausiert"), Headline Zeile 1 in Bild 02 abgeschnitten, rechte Preview-Hälfte Text unsichtbar. Don't dort wörtlich: „Keine Headline, die bei pausiertem Reveal unsichtbar bleibt." Konsequenz: Reveal startet von sichtbarem Zustand (animation füllt auf, nicht von Null), oder Reduce/No-JS zeigt alles.

### R17. Loop-Videos nur als Motiv, mit Poster und Pause-Logik

Beleg: `layers.md` — Video 662×472 in Preview-Card mit `<img>`-Poster, `preload="none"`; Dos: „Poster zuerst, Video lazy". `gap-uiux_hamad.md` — zwei quadratische Loop-Videos (928×928) sind reine Logo-Reveals, kein UI-Beweis. WebGL/Canvas braucht `cancelAnimationFrame`, IntersectionObserver-Pause und Reduced-Motion (`twentyfirst.md` Abschnitt 5 — die Source dort hat keins davon: als Fehler benannt).

### Was im Corpus nicht belegt ist

- Exakte Easing-Kurve und Dauer der Chart-Reveals: ausdrücklich nicht ableitbar aus den Frames (`2096175237109092642-video-1.md` Abschnitt 4; `-video-2.md` Abschnitt 7).
- Ob angeschnittene Logozeilen wirklich laufen: nur Anschnitt und Fade-Masken sind sichtbar (`refero-2.md`; `2096931638118871502.md`; `designmd-me-1.md`).
- Hover und Focus der meisten Standbilder: mehrfach ausdrücklich nicht sichtbar, unter anderem `2095784926717300835.md`, `2095874058697293985.md`, `layers.md`, `refero-2.md`.
- Slide-Richtung im zusammengefassten Booking-Board: nur Opacity-Fade belegt (`2096192737867350330.md`); die Links/Rechts-Richtung stammt ausschliesslich aus den beiden Video-Analysen.
- Skeleton-Shimmer im Booking-Flow: second-13 zeigt Skeleton-Pills, aber kein Frame beweist einen Shimmer (`2096192737867350330-video-1.md`).
- Ob Rive-Illustrationen im Betrieb laufen: nur `*-frame.avif`-Standbilder bewertet (`gap-marcelkargul.md`).
- Motion der zwei Portfolio-Videos als UI-Interaktion: sie zeigen nur Logo-Reveals (`gap-uiux_hamad.md`).
- Marquee-Geschwindigkeit, Loop-Länge und Richtung: nirgends gemessen. Jeder Wert dafür bleibt ein eigener Startwert.

---

## Bauanleitungen

Alle Snippets sind eigene Umsetzungen der belegten Muster. Keine kopierten Assets. Jede Snippet-Zahl ohne direkten Beleg im Begleittext ist ausdrücklich ein **eigener Startwert** und muss im Browser geprüft werden.

### B1. Tokens: Dauer und Kurve (Fundament für alles)

```css
:root{
  --motion-fast:150ms;   /* Buttons, Hover, Focus — Beleg open_design atelier-tokens */
  --motion-base:240ms;   /* Standard — Beleg open_design */
  --motion-step:400ms;   /* Step-Wechsel, Progress — Beleg 2096192737867350330-video-1 */
  --motion-reveal:600ms; /* Scroll-Reveal — Beleg prior_corpus taste-SKILL.md:482-486 */
  --ease:cubic-bezier(.2,.8,.2,1); /* Beleg designmd_supply + 2096192737867350330-video-1 */
}
```

Startwerte, nicht gemessen: `--motion-reveal` 600 ms stammt aus dem Regelwerk, nicht aus einem gerenderten Frame.

### B2. Globaler Reduced-Motion-Block (zuerst schreiben, nicht zuletzt)

```css
@media (prefers-reduced-motion:reduce){
  /* .01ms und eine Iteration: eigene technische Startwerte für sofortigen Endzustand */
  *,*::before,*::after{animation-duration:.01ms!important;
    animation-iteration-count:1!important;transition-duration:.01ms!important}
}
```

Beleg-Muster: `designmd_supply.md` schaltet im Reduce-Fall alles ab; `open_design.md` setzt Wort-Reveal auf Endzustand (`filter:none;opacity:1`) statt auf „nichts". Zweiteres ist der bessere Weg: Endzustand zeigen, Animation überspringen.

### B3. Step-Wechsel (Multi-Step-Flow, Exit links / Enter rechts)

```html
<main class="stage">
  <section class="step" data-state="active">…</section>
</main>
<div class="progress"><span style="width:16%"></span></div>
```

```css
.stage{min-height:100dvh;display:grid;place-items:center;overflow:hidden} /* 100dvh: eigener Layout-Startwert */
.step{transition:transform var(--motion-step) var(--ease),opacity var(--motion-step) var(--ease)}
.step[data-state=exit]{transform:translateX(-160px);opacity:.25}
.step[data-state=enter]{transform:translateX(160px);opacity:0}
.progress{position:fixed;bottom:14px;left:50%;translate:-50%;
  width:320px;height:8px;background:#fff;border-radius:9999px}
.progress span{display:block;height:100%;background:#2b2b2b;border-radius:inherit;
  transition:width var(--motion-step) ease}
@media (prefers-reduced-motion:reduce){
  .step[data-state=exit],.step[data-state=enter]{transform:none}
  /* Opacity-Fade bleibt erlaubt — Beleg 2096192737867350330.md: Fade statt Slide */
}
```

Belege: Offset 160 px und Opacity .25 aus second-04 (Inhalt x250–715 statt 418–888); Enter von rechts second-07 (x510–1100, Opacity ≈35 %); beide Richtungen gleichzeitig (Crossfade, kein Warten) aus second-07-Notiz. Fallback-Fade: `2096192737867350330.md` — Screen-Wechsel als reiner Opacity-Fade (~15 % Rest-Opacity), keine Slide-Richtung belegt.

### B4. Chart-Draw-in per stroke-dashoffset (einmalig)

```html
<svg viewBox="0 0 200 200" class="gauge" role="img" aria-label="Target: 84 von 100">
  <circle cx="100" cy="100" r="60" pathLength="100" class="track"/>
  <circle cx="100" cy="100" r="60" pathLength="100" class="arc" style="--v:84"/>
</svg>
```

```css
.gauge circle{fill:none;stroke-width:14;stroke-linecap:round;
  transform:rotate(135deg);transform-origin:center}
.gauge .track{stroke:#2a2a2a;stroke-dasharray:66.67 100} /* 240° gemessen in video-1; 240/360=66,67 % */
.gauge .arc{stroke:#fff;stroke-dasharray:calc(var(--v)*.6667) 100;
  stroke-dashoffset:calc(var(--v)*.6667);animation:draw .8s ease-out .1s forwards}
@keyframes draw{to{stroke-dashoffset:0}}
@media (prefers-reduced-motion:reduce){
  .gauge .arc{animation:none;stroke-dashoffset:0}
}
```

Belege: Stroke 14 px, round caps, 240°-Bogen, Restsegment #2A2A2A aus `2096175237109092642-video-1.md` Abschnitt 3.12. Draw-in-Richtung aus frame-10 (nur Bogenende sichtbar) vs. frame-13 (84.0 voll). Dauer .8 s und Delay .1 s sind **Startwerte** — Easing/Dauer sind aus Standbildern nicht ableitbar (so notiert in video-1, Abschnitt 4).

Trigger per IntersectionObserver, Klasse `.in-view` setzen, danach Observer trennen (einmalig):

```js
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){e.target.classList.add('in-view');io.unobserve(e.target)}
}),{threshold:.3}); /* eigener Startwert: 30 % Sichtbarkeit */
document.querySelectorAll('.gauge').forEach(el=>io.observe(el));
```

Beleg Viewport-Trigger: frame-05.jpg leere Panels (`2096175237109092642-video-1.md` Abschnitt 4). Wichtig: leeres Panel ist der belegte Fehler — Skeleton oder statischer Erst-Render statt Loch (`2096175237109092642-video-2.md` Don'ts).

### B5. Wert-Transition nur bei Datenänderung (Produkt-Dashboard)

```css
@media (prefers-reduced-motion:no-preference){
  .gauge .arc{transition:stroke-dashoffset .6s var(--ease)} /* Startwert .6s */
  .kpi b{transition:opacity .15s} /* Zahl kurz aus/einblenden beim Tausch */
}
```

Beleg für das Verbot des Loops: `2096175237109092642.md` Abschnitt 11 + Don'ts. Die Demo dort animiert endlos; das ist Chart-Katalog-Deko, kein Produktverhalten.

### B6. Erfolgs-Konfetti, monochrom (eigene Partikel, kein Canvas)

```html
<div class="confetti" aria-hidden="true"></div>
<script>
// Nur nach bestätigter Server-Antwort aufrufen, nie onload.
function celebrate(el){
  if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const tones=['#5a5a5a','#9a9a9a','#fff'];
  for(let i=0;i<80;i++){
    const s=document.createElement('span');
    s.style.cssText=`left:${Math.random()*100}%;top:-10px;
      background:${tones[i%3]};width:${4+Math.random()*4}px;
      height:${4+Math.random()*4}px;animation-delay:${i*12}ms`;
    el.append(s);
  }
  setTimeout(()=>el.remove(),2500); // eigener Startwert: Cleanup nach 2,5 s
}
</script>
```

```css
.confetti{position:fixed;inset:0;pointer-events:none;overflow:hidden}
.confetti span{position:absolute;border-radius:50%;opacity:0;
  animation:fall 1.2s ease-in forwards}
@keyframes fall{
  10%{opacity:1}
  to{transform:translateY(70vh) rotate(180deg);opacity:0}
}
```

Belege: 80 Partikel, 4–8 px, drei Graustufen, Fall ≈1 s, Ausblenden auf Opacity ≈.3 — alles `2096192737867350330-video-2.md` second-30/31/32. Rotation 180° und 12-ms-Stagger sind **Startwerte**. Bedingung aus `mobbin-2.md`: erst nach echtem Backend-Erfolg.

### B7. Drag-Zustand für Kanban/Sortierlisten

```css
.card{transition:transform var(--motion-fast) var(--ease),box-shadow var(--motion-fast) var(--ease)}
.card.dragging{transform:rotate(-4deg);box-shadow:0 14px 30px rgba(0,0,0,.15);cursor:grabbing}
.card.ghost{border:1.5px dashed #C9CDD2;background:transparent;border-radius:12px;min-height:120px} /* 120 px: eigener Startwert */
```

Beleg: `2096889729337921598.md` — Rotation ~−4°, Schattenwerte gemessen, Ghost-Border 1.5 px dashed #C9CDD2. Regel daraus: Schatten erscheint nur während der Aktion; im Ruhezustand trägt die UI 1-px-Border ohne Schatten.

### B8. Hover als Raised-Ebene (Chart/Listen)

```css
.row{border-radius:8px;transition:background var(--motion-fast) var(--ease),
  box-shadow var(--motion-fast) var(--ease)}
.row:hover,.row:focus-visible{background:#fff;box-shadow:0 4px 24px rgba(0,0,0,.08)}
/* Dark-Variante: Tint statt Schatten */
.menuitem:hover,.menuitem:focus-visible{background:rgba(255,255,255,.07);border-radius:10px}
```

Belege: Schatten-Hover `2096215770783199316.md` (0 4px 24px rgba(0,0,0,.08), Radius 8, Padding 12 px); Tint-Hover `2096165490498695410.md` (`rgba(255,255,255,.06–.08)`, Radius 10, inset 4 px). Don't aus `2096192737867350330-video-2.md`: Hover ohne Fläche (nur Cursor) — immer Tint oder Pill geben.

### B9. Dialog/Overlay: 100 ms Fade + Zoom

```css
.overlay{position:fixed;inset:0;background:rgb(0 0 0/.5);
  transition:opacity .1s ease}
.dialog{transition:opacity .1s ease,scale .1s ease}
.dialog[data-closed]{opacity:0;scale:.95}
@media (prefers-reduced-motion:reduce){.overlay,.dialog{transition:none}}
```

Beleg: `shadcn.md` Abschnitt 5 (100 ms, Fade + Zoom von 95 %, `data-open`/`data-closed`). `scale` statt `transform:scale`, damit das zentrierende `translate:-50% -50%` unangetastet bleibt — eigenes Detail, nicht kopiert.

### B10. Wort-Reveal mit Blur (nur Hero, nur einmal)

```css
.word{display:inline-block;filter:blur(8px);opacity:.4;
  animation:reveal .4s var(--ease) forwards;animation-delay:calc(var(--i)*60ms)}
@keyframes reveal{to{filter:blur(0);opacity:1}}
@media (prefers-reduced-motion:reduce){.word{animation:none;filter:none;opacity:1}}
```

Beleg: `open_design.md` — home-mobile.png („Bilder und Videos" y430–470 unscharf) vs. home-mobile-settled.png (scharf); Stagger 60 ms, Blur 8 px. Dauer .4 s ist dort Nachbau-Vorschlag, nicht gemessen. Bedingung aus `neuform-1.md`: settled-Zustand muss ohne Animation lesbar sein; Screenshot-QA erst nach Settled freigeben.

### B11. Marquee mit Reduce-Fallback (maximal einer pro Seite)

```css
.marquee{display:flex;gap:64px;overflow:hidden;
  mask-image:linear-gradient(90deg,transparent,#000 15%,#000 85%,transparent)}
.marquee ul{display:flex;gap:64px;animation:slide 30s linear infinite}
@keyframes slide{to{transform:translateX(-50%)}}
@media (prefers-reduced-motion:reduce){.marquee ul{animation:none}}
```

Belege: Masken-Fade aus `refero-2.md` (15 %/85 %) und `2096931638118871502.md` (≈250 px Fade-Breite beidseitig, gemessen an GlobalBank/Feather-Logos). Maximal einer pro Seite: `prior_corpus.md` (`taste-SKILL.md:362`). Geschwindigkeit 30 s ist **Startwert**; Inhalt muss im Markup verdoppelt sein, damit −50 % nahtlos schliesst. Warnung aus `2096931638118871502.md`: Logos nicht über Glow-Kreuzungen legen — Grau + Fade + Hintergrund-Effekt = unlesbar an den Rändern.

### B12. Loop-Video als Motiv (Poster zuerst, pausierbar)

```html
<figure class="motiv">
  <video muted loop playsinline preload="none" poster="motiv.webp" aria-hidden="true">
    <source src="motiv.webm" type="video/webm">
  </video>
</figure>
```

```css
.motiv{aspect-ratio:1.4;overflow:hidden;border-radius:12px}
.motiv video{width:100%;height:100%;object-fit:cover}
@media (prefers-reduced-motion:reduce){.motiv video{display:none}} /* Poster bleibt */
```

Belege: Geometrie 662×472 (≈1.4:1) und „Poster zuerst, Video lazy" aus `layers.md`. Pause ausserhalb des Viewports per IntersectionObserver + `video.pause()` — Startwert, Muster aus `twentyfirst.md` Abschnitt 5 (dort fehlt die Pause in der Source und ist als Fehler notiert).

---

## Varianten je Stilfamilie

### V1. Monochromes Conversion-Onboarding (Pill-System, hell)

Muster aus `2096192737867350330-video-1.md` / `-video-2.md`: Bühne fix (Nav, Wasserzeichen, Progress), Szene slided (±160 px, 400 ms), Progress wächst synchron in ~8-%-Schritten, Konfetti monochrom und endlich. Zustände tragen Tonwert, nie Farbe: disabled #9E9E9E, enabled #2B2B2B. Variante ohne Slide: reiner Opacity-Fade 250 ms (**Startwert**), belegt als Muster in `2096192737867350330.md`. Einsatz: Fitcheck-/Booking-Flows, ein Job pro View, CTA pro Step genau einer.

### V2. Dark Dashboard / Chart-Katalog (Mono + Success-Grün)

Muster aus `2096175237109092642-video-1.md` / `-video-2.md`: Draw-in per dashoffset beim Viewport-Eintritt, einmalig. Gauge-Restsegment bekommt 1-px-Kontur statt eigenem Farbwert. In Produktion: Transition nur bei Datenänderung (B5). Kein Loop, kein Count-Up als Dauerzustand — belegt als Don't. Hover auf Heatmap-Zellen liefert Werte, nicht nur Dekor — Gegenbeleg: „Hover tiles for metrics"-Hinweistext ohne sichtbaren Hover ist dort Slop.

### V3. Premium-Showcase / Gallery (Video-Motiv, dunkles Chrome)

Muster aus `layers.md`: Bewegung lebt ausschliesslich im Motiv (Video, Canvas, Shader). Chrome (Nav-Kapsel, Karten, Controls) ist statisch. Video mit Poster, `preload="none"`, lazy. Reduce-Fall: Poster statt Video. Tilt/Parallax nur auf dekorativer Fläche ohne Controls im Inneren (`prior_corpus.md`, `taste-SKILL.md:415`). Einsatz: Template-Galerien, Mood-Kataloge — nicht für Flows mit Eingabe. Das bewegte Motiv ist visueller Proof, kein Ersatz für Produkt-Proof.

### V4. Docs-/Komponenten-System (funktional, schnell)

Muster aus `shadcn.md` + `open_design.md`: Dauer 100–150 ms, keine Reveals im Fliesstext, Overlay = Fade+Zoom 95 %, Sidebar-Listen mit Masken-Fade oben/unten (`mask-image:linear-gradient(transparent,black 24px,black calc(100% - 24px),transparent)` — belegt shadcn `scroll-fade`). Bewegung dient Orientierung (was ist offen, wo bin ich), nie Stimmung.

### V5. Studio-Portfolio (Inszenierung als Inhalt)

Muster aus `neuform-1.md` + `gap-marcelkargul.md`: Loader als Inszenierung („Preparing the gallery" mit Datenpaaren), Rive-Illustrationen, Ripple-Dot für Verfügbarkeit (`animate-ripple` auf 8-px-Punkt, `motion-reduce:hidden`). Harte Regel aus neuform: pausierter Reveal darf nie unsichtbaren Inhalt hinterlassen. Einsatz nur, wenn Inszenierung das Offer ist — für ICP-fremde Branchen (B2B-SaaS, Public Sector) zu laut.

### V6. Marketing-Komponenten (Hover als Erlebnis)

Muster aus `twentyfirst.md`: Hover-Button mit drei Ebenen (Fläche, Label, Punkt), Punkt wächst zur Fläche, Label wechselt mit Pfeil — 300 ms. Service-Card: `scale(1.02)` + Schatten, Bild `scale(1.1) rotate(3deg)` 400 ms. Fehler dort mitbelegt: endlos wippender Pfeil, `transition:all`, doppelter Text ohne `aria-hidden` — alle drei nicht übernehmen.

---

## Dos

- Reduced-Motion-Block schreiben, bevor die erste Animation entsteht (Corpus-Konsens: designmd_supply, open_design, prior_corpus, gap-marcelkargul).
- Eine Easing-Kurve und zwei Dauer-Stufen als Tokens festlegen (open_design atelier-tokens).
- Bühne/Szene trennen: Nav, Progress, Hintergrund fix; nur der Inhalt bewegt sich (2096192737867350330-video-1).
- Charts einmalig beim Viewport-Eintritt zeichnen, danach statisch (2096175237109092642-video-2 Don'ts).
- Skeleton in exakt der Geometrie des späteren Inhalts (2096192737867350330-video-1 second-13: 3×3-Pill-Grid 143×48 wie die echten Slots).
- Erfolg erst nach Backend-Bestätigung feiern; Progress-Fill erst nach erfolgreicher Antwort auf 100 % (2096192737867350330-video-2 second-28 als Gegenbeleg).
- Hover immer mit Fläche: Tint, Pill oder Schatten, nie nur Cursor (2096192737867350330-video-2 Don'ts; 2096215770783199316).
- Loop-Videos mit Poster, `muted playsinline preload="none"`, Pause ausserhalb des Viewports (layers, twentyfirst Abschnitt 5).
- Reveals von einem sichtbaren Grundzustand aus aufbauen; Screenshot-QA erst im settled-Zustand (open_design, neuform).

## Don'ts

- **Kein Fade-up auf jeder Sektion als Politur.** Gegenbeispiel: `unslop-react-design.md:64` (in prior_corpus.md) zählt es als Slop-Marker; `mobbin-1.md` zeigt den Fehler am Produkt: Hero-Fragmente (sieben schwarze Rechtecke, x205–612 y160–330) sind ein Animations-Zwischenstand — wer das nachbaut, „baut ein leeres Bild".
- **Keine Endlos-Count-Ups und Loop-Gauges in Produktiv-Dashboards.** Gegenbeispiel: `2096175237109092642.md` — KPI-Zahlen springen zwischen Screenshots (880→718), Speedometer-Kappe ragt als Artefakt heraus (frame-09 x575–590 y620–670).
- **Kein buntes Konfetti ohne Reduced-Motion-Regel und ohne echten Erfolg.** Gegenbeispiel: `mobbin-2.md` (Apollo) — fünf Farben, keine Reduce-Regel, dort wörtlich als „Lüge" bewertet.
- **Keine Blur-Einflüge und Bobble-Loops als Loader-Deko.** Gegenbeispiel: `designmd_supply.md` globals.css — Karten-Enter mit `blur(8px)`, Bobble 9 s ±10 px, Progress 60 s bis 97 %; Analyse nennt es „AI-Loader-Klischee", übernehmbar ist nur die Kurve.
- **Kein `transition:all` auf Layout-Properties.** Gegenbeispiel: `twentyfirst.md` 969-source.txt — dort selbst als Fehler benannt.
- **Kein Scroll-Listener für Reveals.** Gegenbeispiel-Regel: `taste-SKILL.md:511` (in prior_corpus.md) — IntersectionObserver oder `animation-timeline:view()` stattdessen.
- **Kein Inhalt, der bei pausierter Animation unsichtbar bleibt.** Gegenbeispiel: `neuform-1.md` Karte D — linke Canvas-Hälfte komplett leer, Headline Zeile 1 abgeschnitten.
- **Kein fixed WebGL-Canvas über die ganze Seite ohne Cleanup.** Gegenbeispiel: `twentyfirst.md` Abschnitt 5 — Source ohne `cancelAnimationFrame`, ohne Pause, ohne Fallback, `z-index:-10` fixed.
- **Kein Marquee als zweites, drittes, viertes Mal auf derselben Seite** (Cap = 1, taste-SKILL.md:362); Logo-Marquee nicht über Glow-Effekte legen — Gegenbeispiel: `2096931638118871502.md`, Logos unlesbar an den Rändern.
- **Kein Progress-Fill vor der Antwort auf 100 %.** Gegenbeispiel: `2096192737867350330-video-2.md` second-28 — Fill voll vor Submit.
- **Keine Hover-lose Hitliste.** Gegenbeispiel: `mobbin-3.md` — Apollo-Zeitliste abgeschnitten ohne Fade oder Scrollbar; Hover nirgends belegt.

## Gilt nicht wenn

- **Reine Dokumentation und API-Referenz:** Bewegung auf das Minimum (Overlay 100 ms, Fokus-Ring) reduzieren; Reveals im Fliesstext bremsen Leser (Ableitung aus shadcn-Muster).
- **Produktive Dashboards mit Live-Daten:** Draw-in nur beim ersten Mount; danach Transition nur bei echter Datenänderung (Beleg: 2096175237109092642 Regel). Kein Konfetti im Arbeitswerkzeug.
- **`prefers-reduced-motion` aktiv:** Endzustand sofort zeigen, nichts ausblenden (open_design-Muster).
- **Mobile unter 760 px:** Step-Slides auf Opacity-Fade reduzieren (Slide-Richtung ist auf kleinen Viewports ohnehin nicht belegt; Fade ist das belegte Alternativmuster aus 2096192737867350330.md). Marquee-Gap und -Geschwindigkeit neu prüfen, Touch hat kein Hover.
- **Wenn die Animation keinen Satz Begründung hat** (Hierarchie, Story, Feedback, Zustand): streichen — keine Ausnahme (taste-SKILL.md:361).
- **Standbild-Belege:** Sämtliche Easing- und Dauer-Angaben aus den Video-Frame-Analysen sind Frame-Differenzen, keine Messungen der Kurve. Wo oben „Startwert" steht, gilt: erst im Browser gegen das Gefühl prüfen.

## Quellen

- `../studies/design-depth/deep/2096175237109092642-video-1.md` — Abschnitt 4 Motion (Draw-in, Viewport-Trigger, leere Panels); Abschnitt 3.5/3.12 (Donut, Speedometer)
- `../studies/design-depth/deep/2096175237109092642-video-2.md` — Abschnitt 7 Motion (Stroke-Reveal belegt, Easing nicht belegt); Don'ts (kein Loop)
- `../studies/design-depth/deep/2096175237109092642.md` — Abschnitt 11 Motion (KPI-Wechsel 880→718, Candlestick leer); Don'ts
- `../studies/design-depth/deep/2096192737867350330-video-1.md` — second-02…16 (Step-Slide ±160 px, Progress 27→160 px, Bühne/Szene, Skeleton)
- `../studies/design-depth/deep/2096192737867350330-video-2.md` — second-30/31/32 (Konfetti monochrom, ≈1 s Fall); Don'ts (Progress vor Submit)
- `../studies/design-depth/deep/2096192737867350330.md` — Screen-Fade statt Slide (contact-01, ~15 % Opacity)
- `../studies/design-depth/deep/2096889729337921598.md` — Drag-Zustand (Rotation −4°, Schatten, Ghost-Border)
- `../studies/design-depth/deep/2096215770783199316.md` — Hover-Spalte als einzige Raised-Ebene (0 4px 24px rgba(0,0,0,.08))
- `../studies/design-depth/deep/2096165490498695410.md` — Menü-Hover-Tint rgba(255,255,255,.06–.08)
- `../studies/design-depth/deep/layers.md` — Video-Motiv mit Poster, Chrome statisch, Reduce-Fallback
- `../studies/design-depth/deep/designmd_supply.md` — globals.css:83–281 (Kurve, Reduce-Block); Slop: Blur-Einflug, Bobble
- `../studies/design-depth/deep/open_design.md` — Motion-Tokens 150/240 ms; Wort-Blur-Reveal vs. settled; scroll-margin-Fehler
- `../studies/design-depth/deep/twentyfirst.md` — 300/400 ms Dauern; Hover-Button drei Ebenen; WebGL ohne Cleanup als Fehler
- `../studies/design-depth/deep/shadcn.md` — Dialog 100 ms Fade+Zoom; scroll-fade Maske; .15s-Transitionen
- `../studies/design-depth/deep/prior_corpus.md` — taste-SKILL.md:361,362,415,482-486,511,527,531,561; unslop-react-design.md:64
- `../studies/design-depth/deep/neuform-1.md` — pausierter Reveal = unsichtbarer Inhalt (Hard-Fail)
- `../studies/design-depth/deep/mobbin-1.md` — Animations-Zwischenstand als leerer Hero
- `../studies/design-depth/deep/mobbin-2.md` — Konfetti ohne Backend-Erfolg und Reduce-Regel
- `../studies/design-depth/deep/mobbin-3.md` — Scroll-Liste ohne Fade/Scrollbar
- `../studies/design-depth/deep/refero-2.md` — Marquee-Indiz, Masken-Fade 15/85 %
- `../studies/design-depth/deep/2096931638118871502.md` — Logo-Marquee mit 250-px-Fade, Unlesbarkeit über Glow
- `../studies/design-depth/deep/gap-marcelkargul.md` — Rive-Illustrationen, Ripple-Dot, motion-reduce:hidden
- `../studies/design-depth/deep/gap-uiux_hamad.md` — Loop-Videos als Logo-Reveal, kein UI-Beweis
- `../studies/design-depth/deep/designmd-me-1.md` — Logo-Bar Marquee-Indiz
