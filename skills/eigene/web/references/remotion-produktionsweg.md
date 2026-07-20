# Remotion-Produktionsweg — React-basierte Video-Compositions

**Herkunft:** destilliert aus dem vendorten Fremd-Repo `webdesigner-pro`
(Skill `remotion-best-practices` + Wiki-Seite `remotion-production.md`,
Original-Quelle `github.com/remotion-dev/skills`). Details im Vendor-Repo:
`/root/tools/vendor/webdesigner-pro/skills/remotion-best-practices/`.

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
