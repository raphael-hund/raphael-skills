# Motion-Doktrin — wann und wie animieren

**Wofür:** Kurze, sofort anwendbare Regel für Motion/Animation in Website-
und Web-App-Builds, inklusive Accessibility-Pflicht. Ergänzt die
`ui-components/`-Bibliothek (dort der Code, hier das "wann/wie").

**Herkunft:** kondensiert aus `starc007/ui-components` ("beUI v2"),
`app/docs/motion-patterns/motion-patterns.tsx` — MIT-Lizenz, Details in
`VENDORING-NOTE.md`.

## Vier Fragen vor jeder Animation

1. **Häufigkeit prüfen.** Aktionen, die oft passieren, sollen fast instant
   wirken — keine Choreografie. Seltene Momente dürfen mehr Delight zeigen.
2. **Zweck benennen.** Motion soll Raum erklären, Eingabe bestätigen, Zustand
   zeigen oder einen Wechsel abfedern. Kann man den Zweck nicht benennen,
   raus mit der Bewegung.
3. **Physik passend wählen.** Ease-out für Entrances, Ease-in-out für
   Bewegungen von bereits sichtbaren Objekten, linear für Progress, Springs
   für Gesten. Die Kurve folgt dem, was das Objekt tut — nicht dem
   persönlichen Geschmack.
4. **Reduced-Motion-Fallback mitdenken.** Reduced Motion behält nützliches
   Opacity-/Farb-Feedback, entfernt Bewegung/Skalierung/Parallax. Accessibility
   ist ein eigener Motion-Zustand, kein nachträglicher Haken.

## Timing-Tabelle (Startpunkte, keine starren Zielwerte)

| Interaktion | Dauer | Gefühl |
|---|---|---|
| Press-Feedback | 100–160ms | sofort, physisch |
| Tooltip/Popover | 125–200ms | schnell, ursprungsbewusst |
| Dropdown/Select | 150–250ms | reaktionsschnell |
| Modal/Drawer | 200–500ms | genug Zeit, um Raum zu erklären |
| Marketing-Demo | flexibel | Klarheit wichtiger als Tempo |

Faustregel: unter 300ms ist der Standard für UI-Motion. Längere Motion gehört
zu erklärenden Demos, bewussten Gesten, großen räumlichen Wechseln.

## Fünf Motion-Recipes

**1. Press-Feedback** — Zweck: bestätigt, dass die UI die Eingabe gehört hat.
Kleine Skalierung, sofortige Reaktion, Spring statt Ease. Vermeiden: große
Skalensprünge, langsames Zurückfedern, Spring auf jedem Kind-Element.

```jsx
<motion.button whileTap={reduce ? undefined : { scale: 0.97 }} transition={SPRING_PRESS}>
  Weiter
</motion.button>
```

**2. Semantische Icon-Motion** — Zweck: verstärkt, was eine Aktion tut, ohne
weiteres Label (z. B. eine Glocke schwingt aus ihrer Aufhängung). Vermeiden:
denselben generischen Bounce auf jedem Icon, Motion bei Touch-"Hover".
Immer mit `useHoverCapable()` gegen Touch-Phantom-Hover gaten.

**3. Content-Reveal** — Zweck: verhindert, dass neuer Inhalt als harter
visueller Schnitt erscheint. Kurzer Lift + zurückhaltender Blur, muss fertig
sein bevor er zum Fokus wird. Vermeiden: halbsekündige UI-Entrances, langer
Stagger über jedes kleine Kind-Element.

**4. Layout-Continuity** — Zweck: erhält Objekt-Identität, während sich der
Footprint ändert (z. B. Icon-Button expandiert zu Label-Button). Form zuerst
bewegen, Label danach einblenden. Vermeiden: direkte Width-Tweens, Text der
erscheint bevor die Fläche Platz gemacht hat.

**5. Content-Swap** — Zweck: macht klar, dass sich Inhalt geändert hat,
während der Kontext stehen bleibt (Tabs, Filter). Altes Element verlässt
schneller als das neue erscheint, Travel nur wenige Pixel. Vermeiden: große
seitenartige Übergänge für häufig gewechselte Views.

## Accessibility ist ein designter Zustand, kein Entfernen

Nicht jeden Übergang killen. Behalten: Opacity-, Farb- und sofortige
Zustandswechsel. Entfernen: Parallax, große Transforms, wiederholte Skalierung,
Spring-Overshoot.

```js
const reduce = useReducedMotion();
const hidden = { opacity: 0, transform: reduce ? "none" : "translateY(8px)" };
const visible = { opacity: 1, transform: "translateY(0px)" };
```

Die globale CSS-Media-Query allein stoppt keine JS-Springs — `useReducedMotion()`
(bzw. äquivalent im jeweiligen Framework) ist deshalb Pflicht, nicht optional,
für jede Komponente aus `ui-components/`.

## Regel: nur Transform + Opacity animieren

Nie Layout-Eigenschaften (Width/Height/Top/Left) direkt animieren — das
erzwingt Reflows und ruckelt auf schwächeren Geräten. Blur maximal ~10px.
Exits laufen schneller als Entrances.
