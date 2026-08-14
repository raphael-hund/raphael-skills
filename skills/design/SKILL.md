---
name: design
version: 0.4.0
description: >
  Frontend-Design-Skill für UI-Detailarbeit an Interfaces (Fusion aus
  impeccable + taste + ui-ux-pro-max + kill-ai-slop + emilkowalski-Motion-
  Skills + jakubkrehel-Detailskills): Polish, Review, Motion, Farben (OKLCH),
  Typografie und AI-Slop-Scan an bestehendem oder in Arbeit befindlichem
  Frontend. NICHT für komplette Website-Projekte/Site-Builds — das ist der
  web-Skill. Router: Landing/Portfolio -> taste-Linie, App/Dashboard ->
  ui-ux-Linie, finale QA IMMER ueber die deterministischen
  impeccable-Detektoren PLUS den kill-ai-slop-Scanner. Trigger:
  "Design polieren", "UI review", "sieht nach AI aus", "Slop entfernen",
  "Farben/Typo/Layout fixen", "Animation/Motion pruefen", "Kontrast/OKLCH",
  "Dashboard designen", "Referenz-Site als Stilvorlage", "Stitch",
  "Screen in Stitch bauen", "Design mit Google Stitch", "/taste",
  "/impeccable", "kill AI slop", "frontend-design".
class: F
scope: agency
sensitivity: internal
loads:
  - references/design-doktrin.md
  - references/impeccable-detektoren.md
  - references/taste-kern.md
  - references/ui-ux-db-nutzung.md
  # Weitere References (ai-slop-*, motion-*, farben-*, etc.) werden nur bei Bedarf nachgeladen — siehe Progressive Disclosure unten.
provenance: >
  Fusion aus drei Upstream-Skills (impeccable, taste, ui-ux-pro-max), uebernommen
  am 2026-07-19 aus --depth-1-Klonen unter /root/tools/vendor/. Herkunft, Commits,
  Lizenzen und die entfernten Teile (Gemini-Bildgenerierung, imagegen-Pflicht)
  stehen vollstaendig in VENDORING.md dieses Skills — diese Zeile ist nur der
  Zeiger, nicht die Zweitfassung. Spaeter ergaenzt: emilkowalski-Motion- und
  jakubkrehel-Detailskills, kill-ai-slop-Scanner.
requires_skills: []
# Wie tief ist dieser Skill geprueft? Die Zahlen sind an Laeufe gebunden —
# evals/run-doku-zahlen.mjs reisst, wenn eine hier falsch wird.
eval_scorecard:
  stand: 2026-07-30
  laeufe:
    - "evals/run-detect-check.mjs — 35 Faelle: Datei-Modus, 13 von 13 Regeln belegt, Typo-Skala in Variablen beide Richtungen"
    - "evals/run-browser-detect-check.mjs — 39 Faelle: alle 37 Browser-Regeln belegt"
    - "evals/run-dna-scaffold-check.mjs — destilliert dna-scaffold eine echte Design-DNA?"
    - "evals/run-variablen-check.mjs — 9 Faelle: 8 Regeln — sehen sie durch CSS-Tokens hindurch oder nur auf rohes CSS?"
    - "evals/run-flag-wache-check.mjs — 3 Werkzeuge: lehnt jedes ein unbekanntes Flag mit Exit 2 ab?"
    - "evals/run-sabotage.mjs — 4 Faelle: merkt jede Eval, wenn ihr Detektor kaputtgeht?"
    - "evals/run-hilfe-check.mjs — 3 Werkzeuge: beantwortet jedes --help, statt zu arbeiten?"
    - "evals/run-verweise-design.mjs — faehrt die gemeinsame Verweis-Wache fuer diesen Skill (Pfade, loads-Eintraege, fehlende Kernmodul-Importe)"
    - "evals/run-struktur-design.mjs — faehrt die vier Struktur-Wachen oben in EINEM Lauf (65s gemessen 01.08.2026, ohne Browser)"
    - "evals/run-eval-umfang.mjs — 5 Evals: hat jede noch ihre Faelle?"
    - "evals/run-doku-zahlen.mjs — 7 Zahlen: verspricht SKILL.md den echten Umfang?"
    - "evals/run-zahlen-gegen-lauf.mjs — 5 Evals: deckt sich die dokumentierte Fallzahl mit dem Lauf? (120s)"
    - "evals/run-exit-vertrag-check.mjs — 9 Faelle: heisst der Exit-Code bei jedem Werkzeug dasselbe? (20s)"
  grenzen:
    - "Der URL-Modus von detect.mjs braucht puppeteer und laeuft auf diesem Rechner nicht — die Evals laden den Detektor per Playwright direkt in die Seite"
    - "Ein gruener Lauf heisst 'die bekannten Slop-Muster sind raus', nicht 'das Design ist gut'"
completion_criteria:
  - "impeccable-Detektoren laufen auf allen geaenderten UI-Dateien mit Exit 0 (node scripts/detect.mjs <dateien>)"
  - "kill-ai-slop-Scanner laeuft auf allen geaenderten Frontend-Dateien, jeder Fund triagiert (Slop vs. bewusste Entscheidung) und report-bestaetigt (node scripts/scan-ai-slop.mjs <root>)"
  - "Rubrik erfuellt: Kontrast WCAG AA (Body 4.5:1), EINE Theme-/Akzent-/Radius-Linie, Hero passt in Viewport, kein sichtbarer Em-Dash, Motion motiviert + reduced-motion, Bilder statt Fake-Screenshots"
  - "Register bewusst gewaehlt (Landing=taste ODER App=ui-ux) und im Design-Read benannt"
gotchas:
  - "Quellen-Konflikt Em-Dash: taste verbietet '—' komplett in sichtbarem Text; impeccable-Detektor flaggt nur Uebernutzung. ENTSCHIEDEN: taste gewinnt (null Em-Dash im Output)."
  - "Quellen-Konflikt Cards: ui-ux-DB empfiehlt KPI-/Datenkarten fuer Dashboards, taste+impeccable nennen Cards die faule Antwort. ENTSCHIEDEN: registerabhaengig (App=Cards ok, Landing=vermeiden). Verschachtelte Cards immer falsch."
  - "Quellen-Konflikt Tracking: taste-Default 'tracking-tighter' (-0.05em) unterschreitet impeccables Floor -0.04em. ENTSCHIEDEN: Floor -0.04em (Detektor 'extreme-negative-tracking' gewinnt)."
  - "impeccable ist auf ganze Projektkontexte (PRODUCT.md/DESIGN.md, context.mjs) ausgelegt. In design nutzen wir NUR den Detektor-Kern deterministisch; der context.mjs-Setup-Flow ist NICHT Teil dieses Skills."
  - "ui-ux 'design'-Skill (Logo/CIP/Icon/Banner) haengt an GEMINI_API_KEY (bezahlt) — komplett ENTFERNT. Nur die Offline-DB (search.py, BM25, stdlib) ist vendored."
  - "taste imagegen-Teile (generate_image-Pflicht) ENTFERNT — hier: Bild-Slots + reale Quellen (picsum-seed), nie div-Fake-Screenshots."
  - "kill-ai-slop-Detektoren sind englischsprachig (Tell 14 AI-Copywriting-Voice greift nur auf englischen Text). ERLEDIGT 29.07.2026: scripts/rules.de.mjs ergaenzt drei deutsche Tells (de-14 Textstimme = Blocker, de-15 Werbe-Interpunktion, de-16 Werbe-Leerformel), Muster aus copywriting/references/floskel-verbote.md. Immer mit --rules=scripts/rules.de.mjs scannen, wenn der Text deutsch ist; das web-Gate haengt ihn automatisch an. Beleg: web/evals/run-slop-de-check.mjs (67/67, inkl. 14 Falsch-Positiv-Faelle)."
  - "UI-Polish-Details (jakubkrehel) liefert exaktere Zahlenwerte (Scale 0.96 nicht 0.9, Blur 4px nicht 2px) als manche Faustregeln in design-doktrin.md/taste-kern.md. Bei Widerspruch gewinnt der exaktere, deterministisch pruefbare Wert aus ui-polish-details.md."
---

# design — Anti-Slop Frontend (Router)

**Site-Build kommt über `web`.** Hier nur UI-Detail. Nicht extra laden:
`taste`, `impeccable`, `ui-ux`, `kill-ai-slop`, `design-taste-frontend`.
Kommandosprache + Craft-Floor: `references/commands-de.md` +
`references/craft-floor-de.md`. taste-Linie: `references/taste-kern.md`.
Slop-Scan: `scripts/scan-ai-slop.mjs` (deutsch: `--rules=scripts/rules.de.mjs`).

**Zweck (1 Satz):** Interfaces bauen/pruefen, die niemand als "AI-gemacht" erkennt —
teuer denkt (Register + Doktrin), billig tippt, deterministisch geprueft.

**Leitsatz:** Slop ist die Abwesenheit einer Entscheidung. Ein Element ist nur
Slop, wenn es ein nicht getroffener Default ist — dasselbe Element, bewusst
gewaehlt und begruendet, ist in Ordnung. Das schaerft jeden Fund unten: erst
fixen, was niemand entschieden hat.

## Immer zuerst: Design-Read (1 Zeile)
Vor jeder Zeile Code eine Zeile ausgeben:
> *"Lese das als: \<Seitenart> fuer \<Zielgruppe>, \<Vibe>-Sprache, Richtung \<System/Aesthetik>."*
Nur EINE Rueckfrage, falls der Read echt zweideutig ist — sonst annehmen und weiter.

## Router — welche Linie?
Nach dem Design-Read genau eine Linie waehlen (erster Treffer gewinnt):

| Signal | Linie | Was laden |
|---|---|---|
| Landing, Marketing, Kampagne, Portfolio, Editorial, Long-form (Design IST das Produkt) | **taste-Linie** | `references/taste-kern.md` + `references/design-doktrin.md` |
| App, Dashboard, Admin, Tool, SaaS-Produkt-UI, Formulare, Settings (Design DIENT dem Produkt) | **ui-ux-Linie** | `references/ui-ux-db-nutzung.md` + `references/design-doktrin.md` |
| Redesign | Modus erkennen (preserve/overhaul), dann Linie nach Zielseite | taste-kern §Redesign + Doktrin |

Wahl nach: (1) Task-Cue ("Landingpage" vs "Dashboard"), (2) konkrete Seite/Route im Fokus, (3) explizite Ansage. Im Zweifel: eine Seite = eine Linie.

### taste-Linie (Landing/Portfolio)
1. `references/taste-kern.md` lesen: Brief-Inference, 3 Dials (VARIANCE/MOTION/DENSITY), Design-System-Map, Landing-Checklisten.
2. Doktrin anwenden (Typo/Farbe/Layout/Komponenten/Anti-Slop).
3. Bilder: reale Quellen oder klar markierte Slots — nie div-Fake-Screenshots.

### ui-ux-Linie (App/Dashboard)
1. `references/ui-ux-db-nutzung.md` lesen: Offline-DB abfragen (`--design-system`, dann `--domain`).
2. Stack aus dem Projekt erkennen (package.json etc.), Empfehlungen daran binden.
3. Doktrin anwenden. Karten hier als legitime Datencontainer (nicht verschachtelt).

## Screenshot-Pflicht — nach JEDER sichtbaren Aenderung (Raphael-Regel, hart)

Nichts Visuelles wird gebaut, geaendert oder als fertig gemeldet ohne
Screenshot-Zyklus. Kein "muesste jetzt passen" — nur belegte Sicht.

1. Nach JEDER Aenderung rendern (Chrome headless `--screenshot`, Playwright,
   `pdftoppm`, Figma `get_screenshot`) und das PNG **per Read ansehen**.
2. **Jedes Asset einzeln ansehen, BEVOR es eingebaut wird:** Freisteller
   wirklich freigestellt (kein sichtbarer Hintergrund-Kasten auf farbiger
   Flaeche)? Richtiges Produkt/Motiv? Stil konsistent zu den Nachbar-Assets?
   Nicht freigestellt -> Higgsfield `image_background_remover`, dann erneut ansehen.
3. Kleinlich triagieren: Bildkanten, Farbsprung Asset- vs. Seitenhintergrund,
   falsches Motiv, Abschnitt, Matsch-Aufloesung = Fehler -> fixen -> ERNEUT
   Screenshot. Erst melden, wenn der letzte Zyklus sauber war.
4. In JEDEN Subagent-Prompt fuer visuelle Arbeit diese Pflicht explizit
   hineinschreiben (rendern + Read + nachbessern, mind. 2 Zyklen).
5. Bei PDF-Export zusaetzlich `pdffonts <datei.pdf>` laufen lassen: Nur die
   CI-Fonts duerfen eingebettet sein. Faellt etwas auf Arimo/Roboto/Arial o. ae.
   zurueck, war der Webfont beim Headless-Render nicht da -> Fonts lokal per
   `@font-face` buendeln (nie auf Netz-@import verlassen), neu rendern.
6. **Nach JEDEM Fix ALLES nochmal pruefen, nicht nur die geaenderte Stelle.**
   Wer einen Fehler fixt (Pfad, Layout, Bild-Quelle, CSS) und dann nur die
   gefixte Seite anschaut, uebersieht dasselbe Problem auf den anderen Seiten.
   Nach jedem Fix: ALLE Seiten/Assets erneut rendern und ansehen. Beispiel:
   Bild-Pfad auf Seite 3 gefixt -> Seiten 1-11 alle nochmal ansehen, ob die
   Bilder ueberall laden. Erst wenn ALLE Seiten sauber sind, ist die Arbeit
   fertig.

## Finale QA — IMMER, unabhaengig von der Linie
Kein Interface gilt als fertig, bevor BEIDE Scanner gruen sind.

```bash
node scripts/detect.mjs <geaenderte .html/.css/.jsx/.tsx-Dateien>
# Exit 0 = sauber (fertig) · Exit 2 = Funde (fixen) · Exit 1 = Fehler

node scripts/scan-ai-slop.mjs <projekt-root> --rules=scripts/rules.de.mjs
# druckt gruppierte file:line-Funde der 33 AI-Slop-Tells (Farbe/Typo/Copy/
# Komponenten/Motion/Layout) · liest nie ueber das Projekt hinaus, editiert nie
```

**`--rules=scripts/rules.de.mjs` ist bei deutschem Text Pflicht, nicht Kuer.**
Die 33 Kern-Tells sind englisch: Tell 14 sucht "seamless", "game-changer",
"say goodbye to". Eine deutsche Seite mit "maßgeschneiderte Lösungen", "auf das
nächste Level" und "Rundum-sorglos-Paket" lief bis 29.07.2026 mit **0 Treffern
und Exit 0** durch — der schaerfste Copy-Pruefer war auf der Ausliefersprache
blind. Der Regelsatz ergaenzt `de-14` (Textstimme, im web-Gate ein Blocker),
`de-15` (Werbe-Interpunktion) und `de-16` (Leerformel), alle aus Raphaels
freigegebener Liste `copywriting/references/floskel-verbote.md`. Das web-Gate
haengt ihn automatisch an und schreibt es ins Urteil, wenn er fehlt.

**Der Detektor hatte 46 Regeln und keinen Test** (Befund 30.07.2026). Aufgefallen
an einer Seite mit `linear-gradient(90deg, #6366f1, #a855f7)` und
`font-family: Inter`: `detect.mjs` meldete **nur** die Schriftart,
`scan-ai-slop.mjs` fand auf derselben Datei beides. Zwei Prüfer, eine Seite,
einer blind — `ai-color-palette` hatte nur Tailwind-Zweige (`from-purple-500`)
und keinen für rohes CSS. Jede andere Regel dort hat beide. Auf einer
handgeschriebenen Landingpage ohne Tailwind war damit der wichtigste
Farb-Detektor wirkungslos. Behoben; Beleg:

```bash
node evals/run-detect-check.mjs
```

35 Fälle plus Kontrollseite. Die Abdeckung steht dort ehrlich aufgeteilt: **13 von
46** Regeln haben einen Testfall, und **33 sind über den Datei-Modus
grundsätzlich nicht erreichbar** — sie liegen in `rules/checks.mjs` und brauchen
ein gerendertes DOM. Im Datei-Modus ist damit **alles belegt, 13 von 13.**

> **Korrektur einer Behauptung, die hier stand:** „dort deckt `craft-check` sie
> ab" war ungemessen und ist falsch. Nachgezählt: 37 Browser-Regeln, davon haben
> **11 ein fachliches Pendant** in `craft-check` (T1↔`overused-font`,
> T2↔`ai-color-palette`/`gradient-text`, T5↔`repeated-section-kickers`,
> M8↔`flat-type-hierarchy`, M3↔`line-length`, M11↔`border-accent-on-rounded` …).
> Zwei weitere deckt axe (`low-contrast`→`color-contrast`,
> `skipped-heading`→`heading-order`). **Rund 24 sind wirklich nur über den
> Browser-Pfad des design-Detektors zu holen** — darunter `nested-cards`,
> `cream-palette`, `oversized-h1`, `tiny-text`, `all-caps-body`,
> `justified-text`, `tight-leading`, `cramped-padding`, `dark-glow`,
> `codex-grid-background`. Wer nur `craft-check` fährt, prüft sie nicht.
> **Nachgetragen 30.07.2026:** Der Browser-Pfad hat jetzt eine Eval —
> `node evals/run-browser-detect-check.mjs` (39 Fälle). **Alle 37 Browser-Regeln
> sind belegt, keine offen.** Zusammen mit dem Datei-Modus (13 von 13) ist damit
> jede Regel des Detektors durch mindestens einen Testfall gedeckt.
>
> Der Weg dahin ging über sechs Runden, und in jeder war der Grund für einen
> fehlenden Befund derselbe: **die Regel liest etwas anderes, als ihr Name
> vermuten lässt.** Die Fälle, die beim Debuggen zuerst gebraucht werden:
>
> | Regel | liest tatsächlich |
> |---|---|
> | `monotonous-spacing` | den **HTML-Text** (Tailwind-Klassen, `rem`) — nie `px` im Stylesheet |
> | `image-hover-transform` | eine **CSS-Textsuche**, kein echter Hover nötig |
> | `side-tab` / `border-accent-on-rounded` | `if/else` nach Kante: links/rechts vs. oben/unten |
> | `hero-eyebrow-chip` | nur über einer **h1**, bei h2 schweigt sie |
> | `single-font` / `overused-font` | erst ab **20 Textelementen** auf der Seite |
> | `oversized-h1` | **drei** Bedingungen: ≥ 72px, ≥ 40 Zeichen, ≥ 28 % Viewport-Höhe |
>
> Meine Annahme, `bounce-easing`, `layout-transition` und `image-hover-transform`
> bräuchten echte Interaktion, war falsch — am Code nachgelesen lesen alle drei
> nur Stil-Werte. Deshalb stand „braucht Hover/Scroll" zwei Runden lang als
> Begründung im Bericht, obwohl es nie stimmte.
>
> **Der offizielle Weg dorthin funktioniert auf diesem Rechner nicht:**
> ```
> $ node scripts/detect.mjs http://localhost:5392/
> Error: puppeteer is required for URL scanning. Install: npm install puppeteer
> ```
> Installiert ist Playwright, das der ganze Rest des Skills benutzt.
> `page.setViewport` (Puppeteer) gegen `setViewportSize` (Playwright) ist der
> Unterschied — ein Austausch wäre ein Umbau am vendorten Detektor. Der injizierte
> Detektor selbst ist browserneutral (`window.impeccableScan()`), also lädt die
> Eval ihn per Playwright direkt in die Seite. Wer den URL-Modus von
> `detect.mjs` braucht, muss puppeteer nachinstallieren; für die Prüfung der
> Regeln ist das nicht nötig.

**Die vier `design-system-*`-Regeln brauchen eine `DESIGN.md`** im Projektordner
und schweigen ohne sie — richtig so: ein Projekt ohne erklärtes System hat keine
Abweichung, an der man es messen könnte. Das Frontmatter-Format ist genau
vorgegeben: `typography` erwartet Rollen mit `fontFamily`/`fontSize`, keine
Strings. Die Eval fährt beide Richtungen — eine Seite, die gegen die erklärte
Skala verstößt (fremde Schrift, Radius 9px bei 4/12/16, 37px neben der Ramp), und
eine, die ihr folgt und deshalb **nichts** melden darf. Ohne die zweite wären die
Regeln auch dadurch „bestanden", dass sie auf alles anschlagen.

Ablauf beider Scanner identisch (Scope -> Scan -> Triage -> Report -> Fix):
1. **Scope**: Default = Frontend-Source, `node_modules`/`dist`/`.git`/Lockfiles
   raus.
2. **Scan**: beide Scripte laufen lassen (`--json` fuer maschinelle Weiterverarbeitung).
3. **Triage**: jeder Fund ist ein Hinweis, kein Urteil — pro Fund entscheiden
   Slop vs. bewusste, verteidigbare Entscheidung (Brand-Token, Logo, echte
   Illustration bleibt).
4. **Report**: gruppierte Zusammenfassung vor jeder Aenderung zeigen (Tell,
   file:line, ein Satz Begruendung, Fix-Richtung), Freigabe einholen statt
   blind durchzufixen.
5. **Fix**: erst Tokens/Theme, dann Komponenten, dann Einzelstellen, zuletzt
   Copy (`references/ai-slop-fixes.md`) — kleinstmoeglicher Diff, danach
   erneut scannen bis der Count sinkt/auf 0 steht. Bestaetigte Ausnahmen per
   `deslop-ignore-next-line <id>` (ID-scoped, nie global) im Code pinnen.

Detektor-Details: `references/impeccable-detektoren.md` (Layout/Farbe/
Kontrast/Design-System) + `references/ai-slop-taxonomy.md` (was/warum) +
`references/ai-slop-detection.md` (Patterns/False-Positives) +
`references/ai-slop-fixes.md` (Vorher/Nachher). Danach die Rubrik aus
`completion_criteria` von Hand durchgehen (was kein Skript sieht: Register
stimmig? Motion motiviert? Bilder real?).

## Vertiefung bei Bedarf (Progressive Disclosure)

| Aufgabe | Reference |
|---|---|
| Animation/Motion bauen oder reviewen | `references/motion-doktrin.md` (Werte+Standards+Review-Format) |
| Gesten/Drag/Sheet/Spring, "Apple-Style"/"iOS-Feel" | `references/apple-fluid-interfaces.md` |
| Deutscher Begriff -> englischer Motion-Fachbegriff ("wie heisst dieser Effekt") | `references/animation-vokabular.md` (reines Uebersetzungsglossar, KEIN Performance-Tool) |
| Animation "ruckelt"/laggt, Performance-Diagnose bei Motion | `references/motion-audit-workflow.md` + `wiki/craft/webdesign/effekt-performance-patterns.md` + `wiki/craft/webdesign/motion-polish.md` |
| Voller Motion-Audit ueber ein Repo | `references/motion-audit-workflow.md` (nur hier laden, nicht bei jedem UI-Task) |
| Farben/Kontrast/OKLCH/Tailwind-Theme | `references/farben-oklch.md` |
| Typografie (Scale, Heading-Hierarchie, iOS-Zoom-Fix) | `references/typografie.md` |
| Buttons/Formulare: hover/focus/error-States + A11y | `wiki/craft/webdesign/interaction-states-and-accessibility.md` (zuerst), `references/ui-polish-details.md` nur ergaenzend |
| Feinschliff-Details (Radius, Shadows, Icon-Motion, Hit-Areas) | `references/ui-polish-details.md` |
| Referenz-Site als Stilvorlage destillieren (nicht 1:1 klonen) | `references/design-dna-schema.md` + `scripts/dna-scaffold.mjs` |
| Externe Component-/Motion-Bibliothek pruefen statt neu erfinden | `references/component-bibliotheken-radar.md` |
| Vertiefte, belegte Web-Substanz (States/A11y, Farb-/Typo-System, Motion-Polish, Anti-Slop-QA, Referenz-Auswahl) | `references/wissens-router.md` (liest `wiki/craft/webdesign/`) |

## Doktrin ist bindend
`references/design-doktrin.md` enthaelt die fusionierten Regeln (dedupliziert,
Konflikte entschieden, je Regel Herkunfts-Tag `[imp]`/`[taste]`/`[uiux]`/`[omo]`).
Bei Widerspruch zwischen Quellen gilt die dort dokumentierte Entscheidung.

## Grenzen
Kein Backend/Non-UI. Native Apps (iOS/Android): impeccable-Register-Refs waeren
noetig — hier nur Web abgedeckt. Datentabellen/Wizards: ui-ux-DB gibt Muster,
aber spezialisierte Libs (TanStack/AG Grid) bleiben Sache des Projekts.
Deutsche Copy-Slop-Tells (Floskeln, KI-Voice) gehoeren zu copywriting, nicht
hierher. Der Scanner hier bleibt der visuelle/englische Tell-Satz plus
`rules.de.mjs` fuer deutsche Tells im web-Gate.
