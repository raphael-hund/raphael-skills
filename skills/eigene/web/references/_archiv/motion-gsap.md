# Motion mit GSAP — wann das dritte Werkzeug ziehen

**Wofür:** Ergänzt `motion-doktrin.md` um GSAP als drittes Motion-Werkzeug neben CSS-Transitions und Framer Motion (`motion`). Die Vier-Fragen-Prüfung (Häufigkeit, Zweck, Physik, Reduced-Motion) aus `motion-doktrin.md` gilt unverändert — hier geht es nur um das **Werkzeug**, nicht um ob überhaupt animiert wird.

**Herkunft:** kondensiert aus `gsap-skills` (Skills `gsap-core`, `gsap-timeline`, `gsap-scrolltrigger`, `gsap-react`, `gsap-plugins`, `gsap-performance`), Frontmatter-Lizenz jeweils MIT. Lokal installiert: GSAP 3.15.0 (`/root/tools/uikit-vault/node_modules/gsap`). Lizenzlage: seit Webflows GSAP-Kauf ist **jedes** Plugin kostenlos, auch kommerziell — Club GSAP ist keine Bezahlstufe mehr, kein Plugin (auch früher Club-only wie SplitText, MorphSVG) braucht Membership/Key/Auth-Token.

## Entscheidungstabelle: CSS, Framer Motion oder GSAP

Erst die Vier-Fragen-Prüfung aus `motion-doktrin.md` durchlaufen, dann erst das Werkzeug wählen.

| Fall | Werkzeug | Warum |
|---|---|---|
| Hover, Fokus, Farbwechsel, einfacher Press-State | **CSS-Transition** | Kein State-Management nötig, günstigster Fix |
| React-State treibt Animation (Mount/Unmount, Exit, Layout-Shift, Re-Order) | **Framer Motion** | Kennt React-Lifecycle, `AnimatePresence`, Springs — siehe `motion-doktrin.md` |
| Scroll-getriebene Sequenz (Pin, Scrub, Parallax-Choreografie) | **GSAP + ScrollTrigger** | Kein Äquivalent in CSS/Framer Motion |
| SVG-Morphing, Line-Drawing, Multi-Step-Timeline mit Labels | **GSAP** | Timeline mit Position-Parameter, MorphSVG/DrawSVG |
| Framework-agnostisch/Webflow, Animation außerhalb React nutzbar | **GSAP** | Läuft in jedem Framework/vanilla JS; treibt Webflow Interactions |
| Viele Elemente, exakte Sequenzkontrolle von außen (Pause/Reverse/Seek) | **GSAP-Timeline** | Timeline-Instanz bleibt steuerbar |

Faustregel bei Unsicherheit Framer Motion vs. GSAP: Bleibt die Animation **innerhalb** des React-Baums und hängt an React-State → Framer Motion. Verlässt sie ihn (seitenweite Scroll-Timeline, SVG-Icon-System, Cross-Framework-Wiederverwendung) → GSAP.

## GSAP-Kern

```javascript
gsap.to(".box", { x: 100, duration: 1, ease: "power2.out" });   // aktuell -> vars
gsap.from(".item", { opacity: 0, y: 20, stagger: 0.1 });         // vars -> aktuell
gsap.fromTo(".el", { scale: 0.9 }, { scale: 1, duration: 0.4 }); // expliziter Start+Ende
gsap.set(".el", { autoAlpha: 0 });                                // sofort, ohne Dauer
```

- **Stagger**: `stagger: 0.1` oder `{ amount: 0.3, from: "center" }`.
- **Defaults projektweit**: `gsap.defaults({ duration: 0.6, ease: "power2.out" })`.
- **Eases, die reichen**: `"power1.out"` (Default-Gefühl), `"power3.inOut"`, `"back.out(1.7)"` (Overshoot), `"elastic.out(1, 0.3)"`, `"none"` (linear, für Progress/Scrub). Keine eigene Bezier erfinden.
- Transform-Aliase (`x`, `y`, `scale`, `rotation`) statt Raw-`transform`; `autoAlpha` statt `opacity` (setzt `visibility` mit).

## Timeline statt verketteter Delays

```javascript
const tl = gsap.timeline({ defaults: { duration: 0.5, ease: "power2.out" } });
tl.to(".a", { x: 100 })
  .to(".b", { y: 50 }, "+=0.5")   // 0.5s nach Ende des letzten Tweens
  .to(".c", { opacity: 0 }, "<")  // startet zeitgleich mit vorherigem
  .addLabel("outro")
  .to(".d", { scale: 2 }, "outro+=0.2");
```

Position-Parameter: absolut (`1`), relativ (`"+=0.5"`/`"-=0.2"`), Label (`"labelName"`), `"<"` (Start = Start des vorherigen), `">"` (Default: Start = Ende des vorherigen). Timeline statt Delay-Verkettung: Die ganze Sequenz bleibt als **eine** Einheit pausierbar/umkehrbar/seekbar (`tl.pause()/.reverse()/.seek()`) — einzelne `delay`-Werte können das nicht.

## ScrollTrigger — die 5 wichtigsten Optionen

```javascript
gsap.registerPlugin(ScrollTrigger); // einmal vor jeder Nutzung
gsap.to(".box", {
  x: 500,
  scrollTrigger: {
    trigger: ".box",       // Element, das den Trigger-Punkt definiert
    start: "top center",   // "TriggerPosition ViewportPosition"
    end: "bottom center",
    scrub: true,            // Fortschritt an Scroll koppeln (oder Zahl = Nachlauf in s)
    pin: true               // Element fixieren, solange aktiv
  }
});
```

Fünfte Option: **`toggleActions`** (z. B. `"play reverse play reverse"` für onEnter/onLeave/onEnterBack/onLeaveBack) — Alternative zu `scrub`, nie beide zusammen.

Häufigste Fehler: ScrollTrigger auf ein **Kind-Tween** in einer Timeline statt auf die Timeline selbst; `registerPlugin` vergessen; nach dynamischen DOM-Änderungen `ScrollTrigger.refresh()` vergessen (Resize läuft automatisch, neuer Content nicht); `markers: true` in Produktion.

## React: Pflichtmuster gegen Leaks

```javascript
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);

useGSAP(() => {
  gsap.to(".box", { x: 100 });
}, { scope: containerRef }); // Revert von Tweens+ScrollTrigger läuft automatisch
```

Ohne `@gsap/react`: `gsap.context()` in `useEffect`, **immer** mit `ctx.revert()` im Cleanup — sonst laufen Tweens/ScrollTrigger auf unmounteten Nodes weiter (Next.js-Leak):

```javascript
useEffect(() => {
  const ctx = gsap.context(() => { gsap.to(".box", { x: 100 }); }, containerRef);
  return () => ctx.revert();
}, []);
```

Immer `scope` übergeben — sonst matchen Selektoren wie `.box` auch Elemente außerhalb der Komponente.

## Reduced-Motion: `gsap.matchMedia()`

```javascript
let mm = gsap.matchMedia();
mm.add("(prefers-reduced-motion: reduce)", () => {
  gsap.set(".box", { opacity: 1 }); // Endzustand sofort, keine Bewegung
});
mm.add("(prefers-reduced-motion: no-preference)", () => {
  gsap.from(".box", { opacity: 0, y: 40, duration: 0.6 });
});
```

`matchMedia()` revertet beim Verlassen des Breakpoints automatisch alle darin erzeugten Animationen/ScrollTrigger — kein zusätzliches `gsap.context()` verschachteln, `matchMedia` bringt seinen eigenen Context mit.

## Performance

Nur `transform` (`x`, `y`, `scale`, `rotation`, …) und `opacity` animieren — bleibt auf dem Compositor, kein Layout/Paint. `width/height/top/left` vermeiden. `will-change: transform` nur auf Elementen, die gerade tatsächlich animieren, nicht pauschal. GSAPs `x`/`y` nutzen intern bereits Transforms; für sehr häufig aktualisierte Werte (z. B. Mouse-Follower) `gsap.quickTo()` statt neuer Tweens pro Frame.

## Falscher Fall

GSAP für einen einzelnen Button-Hover einbinden — z. B. `gsap.to(".btn", { scale: 1.05 })` bei `:hover`. Das ist exakt der erste Fall der Entscheidungstabelle oben: keine Sequenz, kein Scroll, kein SVG, kein React-Exit-State — eine CSS-Transition macht dasselbe ohne JS-Bundle-Kosten und ohne GSAP-Import/Registrierung. GSAP für Mikro-State wie diesen zu laden ist der Overengineering-Fall der Karpathy-Prinzipien: Werkzeug größer als das Problem.
