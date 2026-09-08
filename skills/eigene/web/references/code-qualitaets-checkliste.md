# Code-Qualitäts-Checkliste — für Builds mit echtem Custom-Code

**Wofür:** Nur relevant, wenn der `build`-Schritt echten Custom-Code erzeugt
(React/Next.js-Komponenten, eigene Scripts) — **nicht** für reine
Webflow/CMS-only-Projekte ohne Code. Ergänzt `qa-faecher.md` (Fach Technik)
um eine Checkliste gegen typische KI-generierte Code-Schwächen ("AI Slop").

**Nicht verwechseln:** `scan-ai-slop.mjs` (design) prüft Text und Markup.
`anti-slop` (Oxlint) prüft TypeScript-Typen. Zwei Werkzeuge, zwei Jobs.

**Herkunft:** kondensiert aus `oh-my-openagent`,
`packages/shared-skills/skills/remove-ai-slops/SKILL.md`. Lizenz: Sustainable
Use License 1.0 — nur interner Agentur-Gebrauch, nicht weiterverkaufen/als
eigenes Produkt vertreiben. Volle Prozess-Maschinerie (Parallel-Agent-Batches,
Team-Mode-Tooling) bewusst **nicht** übernommen — nur die inhaltliche
Kategorien-Liste, angepasst auf einen einzelnen Reviewer/Build-Schritt statt
einen mehrstufigen Automatisierungs-Loop.

## Grundregel

**Verhalten zuerst mit einem Test/manueller Prüfung festhalten, bevor
aufgeräumt wird.** Ein Checklisten-Abhaken allein ist keine Sicherheit — erst
wenn das Verhalten vor der Änderung bekannt ist (Screenshot, Testfall,
manueller Durchlauf), darf reduziert werden.

## Zehn Kategorien

**Stilistisch**
1. **Offensichtliche Kommentare** — Kommentare, die nur wiederholen, was der
   Code schon sagt. Behalten: Kommentare, die das WARUM erklären
   (Geschäftslogik, Workarounds, Edge-Cases).
2. **Über-defensiver Code** — Null-Checks für garantierte Werte, Try/Catch um
   Code, der nicht fehlschlagen kann, doppelte Validierung an mehreren
   Ebenen. Behalten: Validierung an echten Systemgrenzen (Nutzereingabe,
   externe APIs).
3. **Übermäßige Komplexität** — tiefe Verschachtelung (>3 Ebenen), verschachtelte
   Ternaries, lange Parameterlisten, Gott-Funktionen (>50 Zeilen, viele
   Verantwortlichkeiten).

**Strukturell**
4. **Unnötige Abstraktion** — Durchleit-Wrapper, Einmal-genutzte Helfer,
   spekulative Indirektion ("brauchen wir vielleicht später").
5. **Grenzverletzungen** — falsche Schicht importiert (UI importiert direkt
   DB-Treiber), Verantwortlichkeiten verwischt.
6. **Toter Code** — ungenutzte Imports, unerreichbare Zweige, `console.log`-Reste,
   Debug-Leichen.

**Versteckte Kosten**
7. **Duplikation** — kopiert-eingefügte Zweige mit trivialen Unterschieden,
   wiederholte Magic Numbers.
8. **Performance-Äquivalenzen** (nur wenn Verhalten offensichtlich identisch
   bleibt) — z. B. O(n²)→O(n) bei Lookup, wiederholte Berechnung in Schleife
   nach draußen ziehen. **Bei Zweifel: nicht anfassen.**

**Verhaltensabdeckung**
9. **Fehlende Tests** — Verhalten ohne Absicherung. Fix ist NICHT Code zu
   entfernen, sondern den engsten Test/Check hinzuzufügen, der das aktuelle
   Verhalten festhält.

**Struktur**
10. **Überdimensionierte Module** — Dateien über ~250 reine Codezeilen
    (ohne Leerzeilen/Kommentare) sind ein Architekturmangel, keine
    Stilfrage. Bei Fund: nach Verantwortlichkeit aufsplitten, nie in
    `utils.ts`/`helpers.ts`-Sammeldateien.

## Reihenfolge (sicherstes zuerst)

Kommentare → toter Code → über-defensiv → Duplikation → Komplexität →
Abstraktion/Grenzen → Performance → Tests → überdimensionierte Module.

## Oxlint anti-slop (G1 bei TypeScript/JavaScript)

Greift, sobald das Projekt eigene `.ts`/`.tsx`/`.js`/`.jsx` hat (nicht nur
CMS). Das Plugin verbietet weiche Typen und Schein-Beweise im Code:

- `as unknown as User` und andere Ketten-Casts
- `value as User` ohne `// SAFETY:`-Kommentar davor
- Parameter/Returns als `unknown` oder `object`
- `Record<string, unknown>` und ähnliche Wörterbücher
- `typeof x === "string"` statt Parse an der Grenze
- `vi.mock` / `jest.mock` statt echter Naht
- `Reflect.get` / `Reflect.apply`

Einmal im Repo einrichten (Skill `install-anti-slop`, schon global):

```bash
node /root/.agents/skills/install-anti-slop/scripts/install.mjs
```

Dann `oxlint` + `@oxlint/plugins` in derselben Version als Dev-Abhängigkeit,
Plugin in `oxlint.config.ts` registrieren, alle `anti-slop/*`-Regeln auf
`"error"`. Vollständige Schritte: Skill `install-anti-slop`.

*verify:* `npx oxlint` im Projekt-Root endet mit Exit 0. Rot = kein Launch.
Fund im eigenen Code: Typen schärfen (`satisfies`, `as const`, Parse an der
Grenze). Regel nicht stumm schalten. Cast nur mit konkretem `// SAFETY:`.

Quelle: [dmmulroy/anti-slop](https://github.com/dmmulroy/anti-slop) MIT,
SHA `446268e5d15baa968eaec669ff65358d36ae6259`.

## Harte Leitplanken

- Verhalten MUSS erhalten bleiben — bei Unklarheit über Äquivalenz: überspringen,
  nicht raten.
- Keine öffentlichen API-Signaturen ändern.
- Keine Type-Hints entfernen.
- Diff bleibt auf Aufräumen beschränkt, keine Bugfixes/Feature-Änderungen
  mit reinmischen.
- Im Zweifel: Original-Code behalten statt raten.
