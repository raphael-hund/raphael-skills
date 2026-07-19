---
name: r-design
version: 0.1.0
description: >
  Frontend-Design-Skill (Fusion aus impeccable + taste + ui-ux-pro-max).
  Baut und prueft produktionsreife Interfaces ohne AI-Slop. Router: Landing/
  Portfolio -> taste-Linie, App/Dashboard -> ui-ux-Linie, finale QA IMMER ueber
  die deterministischen impeccable-Detektoren. Trigger: "Landingpage bauen",
  "Dashboard designen", "UI review", "Design polieren", "sieht nach AI aus",
  "Slop entfernen", "Farben/Typo/Layout fixen".
class: F
scope: agency
sensitivity: internal
loads:
  - references/design-doktrin.md
  - references/impeccable-detektoren.md
  - references/ui-ux-db-nutzung.md
  - references/taste-kern.md
completion_criteria:
  - "impeccable-Detektoren laufen auf allen geaenderten UI-Dateien mit Exit 0 (node scripts/detect.mjs <dateien>)"
  - "Rubrik erfuellt: Kontrast WCAG AA (Body 4.5:1), EINE Theme-/Akzent-/Radius-Linie, Hero passt in Viewport, kein sichtbarer Em-Dash, Motion motiviert + reduced-motion, Bilder statt Fake-Screenshots"
  - "Register bewusst gewaehlt (Landing=taste ODER App=ui-ux) und im Design-Read benannt"
gotchas:
  - "Quellen-Konflikt Em-Dash: taste verbietet '—' komplett in sichtbarem Text; impeccable-Detektor flaggt nur Uebernutzung. ENTSCHIEDEN: taste gewinnt (null Em-Dash im Output)."
  - "Quellen-Konflikt Cards: ui-ux-DB empfiehlt KPI-/Datenkarten fuer Dashboards, taste+impeccable nennen Cards die faule Antwort. ENTSCHIEDEN: registerabhaengig (App=Cards ok, Landing=vermeiden). Verschachtelte Cards immer falsch."
  - "Quellen-Konflikt Tracking: taste-Default 'tracking-tighter' (-0.05em) unterschreitet impeccables Floor -0.04em. ENTSCHIEDEN: Floor -0.04em (Detektor 'extreme-negative-tracking' gewinnt)."
  - "impeccable ist auf ganze Projektkontexte (PRODUCT.md/DESIGN.md, context.mjs) ausgelegt. In r-design nutzen wir NUR den Detektor-Kern deterministisch; der context.mjs-Setup-Flow ist NICHT Teil dieses Skills."
  - "ui-ux 'design'-Skill (Logo/CIP/Icon/Banner) haengt an GEMINI_API_KEY (bezahlt) — komplett ENTFERNT. Nur die Offline-DB (search.py, BM25, stdlib) ist vendored."
  - "taste imagegen-Teile (generate_image-Pflicht) ENTFERNT — hier: Bild-Slots + reale Quellen (picsum-seed), nie div-Fake-Screenshots."
---

# r-design — Anti-Slop Frontend (Router)

**Zweck (1 Satz):** Interfaces bauen/pruefen, die niemand als "AI-gemacht" erkennt —
teuer denkt (Register + Doktrin), billig tippt, deterministisch geprueft.

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
Kein Interface gilt als fertig, bevor die deterministischen Detektoren gruen sind.

```bash
node scripts/detect.mjs <geaenderte .html/.css/.jsx/.tsx-Dateien>
# Exit 0 = sauber (fertig) · Exit 2 = Funde (fixen) · Exit 1 = Fehler
```

Ablauf: `references/impeccable-detektoren.md` lesen -> Detektor laufen lassen ->
jeden Fund entweder fixen oder (nur mit echtem Grund) per Inline-Ignore
dokumentieren -> erneut laufen bis **Exit 0**. Danach die Rubrik aus
`completion_criteria` von Hand durchgehen (das, was ein Skript nicht sieht:
Register stimmig? Em-Dash null? Motion motiviert? Bilder real?).

## Doktrin ist bindend
`references/design-doktrin.md` enthaelt die fusionierten Regeln (dedupliziert,
Konflikte entschieden, je Regel Herkunfts-Tag `[imp]`/`[taste]`/`[uiux]`).
Bei Widerspruch zwischen Quellen gilt die dort dokumentierte Entscheidung.

## Grenzen
Kein Backend/Non-UI. Native Apps (iOS/Android): impeccable-Register-Refs waeren
noetig — hier nur Web abgedeckt. Datentabellen/Wizards: ui-ux-DB gibt Muster,
aber spezialisierte Libs (TanStack/AG Grid) bleiben Sache des Projekts.
