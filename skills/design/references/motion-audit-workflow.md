> Vendoriert aus emilkowalski/skills (github.com/emilkowalski/skills @ 6bf24434),
> MIT-Lizenz. Kondensiert aus `find-animation-opportunities` (Vorschlags-Gate)
> und `improve-animations/AUDIT.md` (Audit-Kategorien). Nur bei einem vollen
> Motion-Audit laden — nicht bei jedem UI-Task (Progressive Disclosure).
> Details: `../VENDORING.md`.

# Motion-Audit-Workflow

Zwei Einsatzfaelle: (A) neue Motion vorschlagen, wo noch keine ist — das
4-Fragen-Gate. (B) bestehende Motion in einem ganzen Repo pruefen — die
8 Audit-Kategorien. Fuer ein einzelnes Diff-Review reicht
`motion-doktrin.md` (Ten Standards + Eskalations-Trigger).

## A. Neue Motion vorschlagen — das 4-Fragen-Gate

Jeder Kandidat muss alle vier Fragen ueberleben, in dieser Reihenfolge.
Antwort dokumentieren.

1. **Frequenz** — siehe Tabelle in motion-doktrin.md §1. 100+/Tag = Ablehnen,
   immer.
2. **Zweck** — muss einer von Feedback/Spatial Consistency/State
   Indication/Preventing Jarring Change/Explanation/Delight sein. Delight nur
   in der Selten/Erstnutzung-Stufe zulaessig.
3. **Speed** — passt in die Dauer-Budgets aus motion-doktrin.md §4?
4. **Function** — hilft Motion hier oder stoert sie? Dekoration auf
   funktionaler, datendichter UI (ein Chart in einem Finanz-Dashboard) stoert;
   auf einer Marketing-Seite ist sie ok.

**Deckelung:** maximal 5–7 Vorschlaege fuers Gesamtprodukt, weniger fuer eine
einzelne Seite. Nach Leverage sortiert, nicht danach, was am meisten Spass
macht zu bauen.

**Pflicht-Sektion "Abgelehnte Kandidaten":** 2–5 bewusst abgelehnte Stellen
mit der Gate-Frage, die sie gekippt hat, gehoeren in JEDEN Vorschlagsreport —
das unterscheidet einen Vorschlag von einer Wunschliste.

```
- CommandMenu.tsx:12 — Command-Palette Open/Close. Abgelehnt: Keyboard-
  ausgeloest, 100+/Tag. Nie animieren.
- Chart.tsx:88 — animierte Linienzeichnung im Analytics-Graph. Abgelehnt:
  funktionale Daten, die der Nutzer liest; Dekoration stoert.
```

**Wo suchen:** fehlendes `:active`-Feedback auf klickbaren Elementen ·
teleportierender State (Conditional Render ohne Transition, Accordion ohne
Height/Opacity-Uebergang) · fehlende raeumliche Geschichte (Popover ohne
Trigger-Origin, asymmetrische Ein-/Austrittspfade) · Gruppen-Eintritt ohne
Stagger · Gesten ohne Physik (Snap statt Spring, kein Velocity-Dismiss).

## B. Bestehende Motion auditieren — 8 Kategorien

Fuer jede Kategorie: Befund mit `file:line` + Beleg, kein Fix ohne Beleg.

1. **Purpose & Frequency** — Motion ohne benennbaren Zweck; Animation auf
   Keyboard-/Hochfrequenz-Aktion. Staerkster Fix ist oft: loeschen.
2. **Easing & Duration** — `ease-in` auf UI ist immer ein Fund; Dauer >300ms
   auf UI-Element; Tooltip-Delay+Animation auf jedem Tooltip im selben
   Cluster statt nur dem ersten.
3. **Physicality & Origin** — `scale(0)`, fehlender initialer Transform bei
   Fade-Entrances, `transform-origin: center` auf Trigger-verankertem
   Element (Modals sind korrekt ausgenommen — nicht melden).
4. **Interruptibility** — Keyframes auf Toasts/Toggles/schnell Ausloesbarem;
   Gesten ohne Spring; Drag-Dismiss nach Distanz statt Velocity
   (`Math.abs(distance)/elapsedMs > ~0.11`); Hard-Stop statt Rubber-Banding.
5. **Performance** — `transition: all`; animierte Layout-Eigenschaften;
   Framer-Motion-Shorthands unter Last; CSS-Variable am Parent treibt
   Kind-Transform; `filter: blur()` >20px waehrend Transition.
6. **Accessibility** — Bewegung ohne `prefers-reduced-motion`-Handling;
   ungegatetes `:hover`; Reduced-Motion-Implementierung, die ALLES killt
   statt nur Bewegung (Opacity/Farbe duerfen bleiben).
7. **Cohesion & Tokens** — mehrere fast identische handgetippte Cubic-Beziers
   statt eines Tokens; ein federndes Bauteil in einer sonst knackigen App;
   Gruppen-Eintritt ohne Stagger, wo einer hingehoert.
8. **Missed Opportunities** — additiv, kein Fix: State-Wechsel, die
   teleportieren; raeumlich verbundene UI ohne Motion, die den Ursprung
   zeigt; seltene High-Emotion-Momente (Erstlauf, Erfolg) ohne den ihnen
   zustehenden Delight-Spielraum. Nur eine Handvoll, geerdet in echten
   Seams — keine Wunschliste.

**Severity:** HIGH = gefuehlsbrechend (falsches Easing auf UI, Animation auf
Keyboard/Hochfrequenz, gedroppte Frames, `scale(0)`) · MEDIUM = merklich
falsch (falscher Origin, nicht-interruptible dynamische UI, fehlendes
Reduced-Motion) · LOW = Polish (Stagger, Blur-Maskierung, Token-
Konsolidierung).

**Bevor ein Fund zaehlt:** den zitierten Code selbst nachlesen. Was
dokumentiert absichtlich abgewichen ist (Kommentar/Designentscheidung
belegt), zaehlt nicht als Fund, sondern wird nur notiert.
