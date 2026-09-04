# Remotion-Produktionsweg — React-basierte Video-Compositions

**Herkunft:** destilliert aus dem vendorten Fremd-Repo `webdesigner-pro`
(Skill `remotion-best-practices` + Wiki-Seite `remotion-production.md`,
Original-Quelle `github.com/remotion-dev/skills`). Details im Vendor-Repo:
`/root/tools/vendor/webdesigner-pro/skills/remotion-best-practices/`.
Ergaenzt am 2026-07-21 um Luecken aus den offiziellen Remotion Agent Skills
(liegen NICHT in einem eigenen Repo `remotion-dev/skills`, sondern im
Monorepo `github.com/remotion-dev/remotion`, Pfad `packages/skills/skills/`,
Commit `511e50f10977fd9de56b6ea6889a62d963eca031`, 2026-07-20). Vendor-Klon:
`/root/tools/vendor/remotion-skills/packages/skills/skills/` (Sparse-Checkout).

**Wofuer:** Neues Thema fuer uns — wir hatten bisher keinen Remotion-/Video-
Composition-Skill. Nur bei einem AUSDRUECKLICHEN Video-, Composition-,
Player- oder Render-Auftrag aktivieren (z.B. Hero-Video, animierter
Produkt-Teaser, Loom-artiges Erklaervideo als React-Composition). Normale
Website-Micro-Interactions/Hover/Transitions bleiben bei `motion-doktrin.md`
und `design/references/apple-fluid-interfaces.md` — die sind CSS/JS-Motion,
kein Rendering-Stack.

## Ablauf

1. **Inventarisieren vor dem ersten Edit:** Projekt, installierte
   Remotion-Version, Composition-IDs, FPS, Dimensionen, Dauer, Assets,
   Renderziel.
2. **Lizenz/Nutzungsklasse pruefen zuerst.** Remotion ist bei kommerzieller
   Nutzung/Team-Groesse/Automation lizenzpflichtig — bei Unklarheit ueber
   Teamgroesse oder kommerziellem Produkt KEINE Nutzung freigeben, sondern
   erst klaeren.
3. **Genau einen Unterweg waehlen**, nicht mischen: Create (neue Composition),
   Markup (Text/Captions in Video einbrennen), Captions, Mediabunny
   (Video-Processing im Browser), Interactivity (Player-Steuerung), Render
   (Export), oder SaaS (gehostetes Rendering). Installierte
   Remotion-Dokumente und Projektpatterns gewinnen vor generischen Tutorials.
4. **Zeitbasierte Darstellung immer aus `frame`/Video-Konfiguration ableiten**,
   niemals aus CSS-Animationen oder Tailwind-Animationsklassen — die sind
   kein gueltiger Renderbeleg in Remotion (Remotion rendert deterministisch
   Frame fuer Frame, CSS-Transitions laufen zeitbasiert, nicht frame-exakt).
5. **Assets lokal und nachvollziehbar referenzieren.** ElevenLabs, Mapbox,
   AWS/Lambda-Cloud-Render und andere externe Remote-Dienste brauchen eine
   separate Freigabe, bevor sie in eine Composition eingebunden werden.
6. **Vor jedem Vollrender:** Typecheck und Composition-Registrierung pruefen,
   dann repraesentative Einzelframes (Anfang/Mitte/Ende) visuell
   kontrollieren. Einen kompletten Render nur starten, wenn Umfang und Ziel
   klar sind — Rendering kostet Zeit/Compute.
7. **Kein Upload, Deploy, Kauf oder Publish ohne Freigabe.**

## Video-Layout-Regeln (aus offiziellem `video-layout.md`, neu)

Ein Video-Frame wird anders wahrgenommen als eine Webseite — kurz betrachtet,
nicht Zeile fuer Zeile gelesen. Deshalb eigene Layout-Regeln statt Web-UI-
Gewohnheiten:

- Safe Area einhalten: bei 1080px Breite mind. 80px Abstand zu den Seiten,
  100px zu oben/unten fuer wichtigen Text.
- Ein Frame, eine Kernaussage. Kein dashboard-artiges Nebeneinander vieler
  Karten/Badges/Pills — das sind Web-Muster, die im Video ueberladen wirken.
  Konkurrierende Elemente lieber nacheinander zeigen (Zeit statt Flaeche
  loest Enge) als gleichzeitig kleiner machen.
- Layout ueber `flex`/`grid`/`gap` bauen, nicht jedes Element einzeln mit
  `top`/`left`/`right`/`bottom` positionieren. Absolute Positionierung bleibt
  Hintergruenden/Deko vorbehalten. Jedes Element animiert aus seinem
  reservierten Slot heraus (Opacity/Transform/Scale) — nie in einen Slot
  hinein, den ein anderes Element belegt.
- Mindestschriftgroessen bei 1080px Breite (proportional skalieren mit der
  Composition-Breite): Headline ~84px, wichtiger Nebentext ~44px, Labels
  ~32px. Im Zweifel groesser statt kleiner, kurze Zeilen statt Schriftgroesse
  runterschrauben.
- Pre-Render-Check als Frage formulieren: Kernaussage in unter einer Sekunde
  erfassbar? Ein klarer Fokuspunkt? Nichts, das sich beruehrt/ueberlappt?

## Technische Markup-Regeln (aus offiziellem `remotion-markup/SKILL.md`, neu)

- `interpolate()` ist der Standardweg fuer Animation ueber `useCurrentFrame()`;
  `spring()`/`Easing.spring()` nur gezielt fuer Feder-Charakter, sonst
  `Easing.bezier()` fuer eigene Timing-Kurven.
  **CSS-Transitions/-Animationen und Tailwind-Animationsklassen sind nicht
  nur "nicht frame-exakt", sondern rendern im Remotion-Export schlicht
  falsch** — das ist der technische Kern hinter Regel 4 oben, nicht nur ein
  Stilargument.
  `scale`/`translate`/`rotate` als eigene CSS-Properties bevorzugen statt
  eines zusammengesetzten `transform`-Strings — das bleibt im Studio (Visual
  Mode) einzeln editierbar.
- Assets liegen in `public/`, referenziert ueber `staticFile()`; Remote-URLs
  gehen direkt in `src`. Neue `@remotion/*`-/`mediabunny`-Pakete ueber
  `npx remotion add <paket>` installieren, nicht per Hand in die
  package.json eintragen (haelt Versionen kompatibel).
  `<Sequence from={} durationInFrames={}>` fuer Timing/Verzoegerung/
  Begrenzung von Abschnitten statt manueller Frame-Arithmetik in jeder
  Komponente.
- Vor einem vollen Render genuegt oft ein einzelnes Standbild als
  Stichprobe: `npx remotion still [composition-id] --scale=0.25 --frame=N`
  (bei trivialen Edits/reinen Refactors optional, bei allem mit
  Layout-/Timing-Aenderung ein guter Zwischenschritt vor dem Vollrender aus
  Regel 6).
- Upgrade-Pfad (falls je gebraucht): `npx remotion upgrade` fuer
  Remotion-/Mediabunny-Pakete, danach `npx remotion skills update` fuer die
  Skill-Dateien selbst — nur relevant, wenn ein Projekt aktiv gepflegt wird,
  nicht Teil des normalen Produktionswegs hier.

## Richtiger Fall (Illustrativ)

Fuer den Hero einer Produktseite existiert die Composition `DashboardTeaser`
mit 30 FPS, 1080×1080px, 240 Frames, lokalen UI-Screens als Assets. Nur die
markierte Feature-Sequenz wird geaendert, Opacity/Position werden aus `frame`
abgeleitet, Typecheck + Registrierung + Frames 0/96/239 geprueft, danach ein
lokaler Still uebergeben. Vollrender/Upload/Player-Einbau bleiben ohne
zusaetzliche Freigabe aus.

## Falscher Fall (Warnsignal)

Ein simpler Hover-Effekt auf einer Pricing-Card wird als neue Remotion-
Composition gebaut und direkt ueber Cloud-Render getestet. Schaden: falscher
Stack fuer einen einfachen Browserzustand, unnoetige Kosten, externe Aktion
ohne Not. Warnsignal: kein Composition-Konzept, keine Dauer/FPS-Angabe, kein
ausdruecklicher Video-Auftrag — dann gehoert die Aufgabe in
`motion-doktrin.md`, nicht hierher.
