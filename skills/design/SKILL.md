---
name: design
version: 0.2.0
description: >
  Frontend-Design-Skill (Fusion aus impeccable + taste + ui-ux-pro-max +
  kill-ai-slop + emilkowalski-Motion-Skills + jakubkrehel-Detailskills).
  Baut und prueft produktionsreife Interfaces ohne AI-Slop. Router: Landing/
  Portfolio -> taste-Linie, App/Dashboard -> ui-ux-Linie, finale QA IMMER ueber
  die deterministischen impeccable-Detektoren PLUS den kill-ai-slop-Scanner.
  Motion/Animation, Farben (OKLCH), Typografie und UI-Polish-Details als
  eigene References bei Bedarf nachladen. Trigger: "Landingpage bauen",
  "Dashboard designen", "UI review", "Design polieren", "sieht nach AI aus",
  "Slop entfernen", "Farben/Typo/Layout fixen", "Animation/Motion pruefen",
  "Kontrast/OKLCH", "Referenz-Site als Stilvorlage".
class: F
scope: agency
sensitivity: internal
loads:
  - references/design-doktrin.md
  - references/impeccable-detektoren.md
  - references/ui-ux-db-nutzung.md
  - references/taste-kern.md
  - references/ai-slop-taxonomy.md
  - references/ai-slop-detection.md
  - references/ai-slop-fixes.md
  - references/motion-doktrin.md
  - references/apple-fluid-interfaces.md
  - references/animation-vokabular.md
  - references/motion-audit-workflow.md
  - references/farben-oklch.md
  - references/typografie.md
  - references/ui-polish-details.md
  - references/design-dna-schema.md
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
  - "kill-ai-slop-Detektoren sind englischsprachig (Tell 14 AI-Copywriting-Voice greift auf englischen Text). Fuer deutsche Ads/Web-Copy siehe copywriting — dort liegt die deutsche Entfloskelungs-Referenz. TODO fuer einen spaeteren Agenten: eine rules.de.mjs nach dem Vorbild von scripts/rules.ru.mjs.example bauen, die deutsche Slop-Phrasen per --rules=scripts/rules.de.mjs zusaetzlich scannt."
  - "UI-Polish-Details (jakubkrehel) liefert exaktere Zahlenwerte (Scale 0.96 nicht 0.9, Blur 4px nicht 2px) als manche Faustregeln in design-doktrin.md/taste-kern.md. Bei Widerspruch gewinnt der exaktere, deterministisch pruefbare Wert aus ui-polish-details.md."
---

# design — Anti-Slop Frontend (Router)

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

## Finale QA — IMMER, unabhaengig von der Linie
Kein Interface gilt als fertig, bevor BEIDE Scanner gruen sind.

```bash
node scripts/detect.mjs <geaenderte .html/.css/.jsx/.tsx-Dateien>
# Exit 0 = sauber (fertig) · Exit 2 = Funde (fixen) · Exit 1 = Fehler

node scripts/scan-ai-slop.mjs <projekt-root>
# druckt gruppierte file:line-Funde der 33 AI-Slop-Tells (Farbe/Typo/Copy/
# Komponenten/Motion/Layout) · liest nie ueber das Projekt hinaus, editiert nie
```

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
| Deutscher Begriff -> englischer Motion-Fachbegriff | `references/animation-vokabular.md` |
| Voller Motion-Audit ueber ein Repo | `references/motion-audit-workflow.md` (nur hier laden, nicht bei jedem UI-Task) |
| Farben/Kontrast/OKLCH/Tailwind-Theme | `references/farben-oklch.md` |
| Typografie (Scale, Heading-Hierarchie, iOS-Zoom-Fix) | `references/typografie.md` |
| Feinschliff-Details (Radius, Shadows, Icon-Motion, Hit-Areas) | `references/ui-polish-details.md` |
| Referenz-Site als Stilvorlage destillieren (nicht 1:1 klonen) | `references/design-dna-schema.md` + `scripts/dna-scaffold.mjs` |

## Doktrin ist bindend
`references/design-doktrin.md` enthaelt die fusionierten Regeln (dedupliziert,
Konflikte entschieden, je Regel Herkunfts-Tag `[imp]`/`[taste]`/`[uiux]`/`[omo]`).
Bei Widerspruch zwischen Quellen gilt die dort dokumentierte Entscheidung.

## Grenzen
Kein Backend/Non-UI. Native Apps (iOS/Android): impeccable-Register-Refs waeren
noetig — hier nur Web abgedeckt. Datentabellen/Wizards: ui-ux-DB gibt Muster,
aber spezialisierte Libs (TanStack/AG Grid) bleiben Sache des Projekts.
Deutsche Copy-Slop-Tells (Floskeln, KI-Voice) gehoeren zu copywriting, nicht
hierher — die kill-ai-slop-Detektoren sind englischsprachig.
