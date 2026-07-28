# shadcn-Arbeitsweise — lokale Registry + Verbesserungs-Loop

**Wofür:** shadcn-Komponenten nicht als Default-Look stehen lassen, sondern als
Rohmaterial behandeln, das angefasst werden muss. Ergänzt `radix-shadcn-tailwind-stack.md`
(dort steht der Stack-Rahmen: Radix als A11y-Layer, Tailwind als Optik-Layer,
shadcn als Brücke — hier wird das NICHT wiederholt).

**Herkunft:**
- `/root/tools/vendor/shadcn-improve/` — Skill `improve` (Audit→Plan→Execute-Loop
  für beliebige Codebasen, hier auf kopierte shadcn-Komponenten angewendet).
  Lizenz: MIT, Copyright 2026 shadcn (`LICENSE.md` im Vendor-Repo, Frontmatter
  von `skills/improve/SKILL.md` bestätigt `license: MIT`).
- `/root/tools/uikit-vault/registry/` — lokaler Registry-Index (`shadcn-index.json`,
  57 KB) + zweite Komponentenbibliothek Appica (`appica/llms.txt`,
  `appica/components.json`, `appica/docs/`). Appica-Paket `@appica/ui-react`:
  Lizenz MIT, Copyright 2026 Appica UI (`node_modules/@appica/ui-react/LICENSE`
  + `package.json`-Feld `"license": "MIT"` — geprüft, nicht unklar).

**Der zentrale Punkt:** `npx shadcn add <component>` kopiert Quellcode nach
`components/ui/`. Ab dem Moment gehört die Datei dem Projekt — kein Import aus
einem Paket, kein Update-Pfad, keine Fremdverantwortung mehr. Der ausgelieferte
Default-Look (shadcn-Standardfarben, Standardradien, Standardschatten) ist der
**Anfang der Arbeit, nicht das Ergebnis**. Wer die Datei nur kopiert und nie
wieder anfasst, liefert das gleiche Aussehen wie jedes zweite Vercel-Template.

## 1. Lokale Registry nutzen (kein Internet nötig)

`shadcn-index.json` ist ein Array von Komponenten-Objekten mit
`meta.links.{base,aria,radix}` — den drei möglichen Unterbau-Varianten
(Base UI, React Aria, Radix Primitives), auf denen eine shadcn-Komponente
aufbauen kann. Nicht jede Komponente hat alle drei.

**Befehl (getestet):**

```bash
cd /root/tools/uikit-vault/registry
jq --arg n "hover-card" '.[] | select(.name==$n) | {name, variants: (.meta.links // {} | keys)}' shadcn-index.json
```

Echte Ausgabe:

```json
{
  "name": "hover-card",
  "variants": [
    "base",
    "radix"
  ]
}
```

Zweites Beispiel, `attachment` (nur eine Variante):

```json
{
  "name": "attachment",
  "variants": [
    "aria"
  ]
}
```

Zum Vergleich: `accordion` und `sidebar` haben alle drei (`aria`, `base`, `radix`).
Von 62 Komponenten haben 52 alle drei Varianten, 5 nur `aria`, 3 nur
`base`+`radix`, 1 (`toast`) nur `base`. **Vor dem `shadcn add`** kurz prüfen,
welche Variante existiert — spart das Nachschlagen im Browser komplett, der
Index liegt lokal.

Alle Namen auf einen Blick: `jq -r '.[].name' shadcn-index.json`.

## 2. Appica als zweite lokale Quelle

Appica UI (`/root/tools/uikit-vault/registry/appica/`) ist eine eigenständige,
auf Base UI + Tailwind v4 aufbauende React-Bibliothek — 62 Komponenten laut
`components.json`, dokumentiert in 87 Seiten unter `appica/docs/`.

**Was Appica hat, das shadcn (in diesem Index) nicht hat** (Fundstelle:
Mengendifferenz `appica/components.json` vs. `shadcn-index.json`-Namen):
`sparkline` (kompaktes Inline-Trend-Chart), `data-table` (fertige TanStack-Table-
Verdrahtung: Sortierung, Filter, Auswahl, Pagination), `countdown` (Rolling-
Digit-Timer), `gradient-glow` und `background-pattern` (dekorative Marketing-
Effekte), `copy-button`, `preview-card`, `chip`, `toc`. Das sind eigene
Konzepte, keine Umbenennungen.

**Was shadcn hat, das in Appica fehlt:** `sidebar` (App-Shell-Navigationsraster),
`command` (cmdk-Befehlspalette), `chart` (Recharts-Wrapper), `sheet`
(Seiten-Panel-Modal), `empty` (Empty-State-Pattern), `resizable`.

**Regel, wann Appica statt shadcn:** Braucht das Projekt eine der oben
genannten Appica-Only-Komponenten (v.a. `data-table` oder `sparkline` für
Dashboards/Analytics, `gradient-glow`/`background-pattern`/`countdown` für
Marketing-Landingpages) — Appica installieren statt selbst nachzubauen. Für
alles andere bleibt shadcn+Radix der Default aus `radix-shadcn-tailwind-stack.md`,
weil das die etablierte, breiter dokumentierte Kombination ist.

**Lizenz:** MIT, geprüft (`@appica/ui-react/LICENSE` + `package.json`). Damit
gilt NICHT die reference-only-Regel aus `component-bibliotheken-radar.md` §2
(die greift nur bei ungeklärter Lizenz) — Appica-Code darf mit eigenen Tokens
adaptiert werden, kein 1:1-Copy-Zwang zur Vorsicht nötig, aber trotzdem sinnvoll
(eigene Marken-Tokens statt Appica-Defaults, siehe Punkt 5).

## 3. Der Verbesserungs-Loop (Kern von shadcn-improve)

Ablauf: **Audit → Plan → Ausführung → Gegenprüfung**, angewendet auf die
kopierten Dateien in `components/ui/` statt auf eine ganze Codebasis.

- **Audit + Plan** macht das teure/urteilsfähige Modell — liest die kopierte
  Komponente, findet die Stellen, die noch nach Default aussehen, schreibt
  einen in sich geschlossenen Plan (Datei, Zeile, Vorher/Nachher, Verifikation).
- **Ausführung** macht ein günstigeres Modell nach genau diesem Plan.
- **Gegenprüfung**: eine andere Modellfamilie liest den Diff gegen den Plan.

Das deckt sich 1:1 mit Raphaels bestehender Rollentrennung — Details zu
Modellwahl, Panel-Besetzung und Cross-Vendor-Prüfung stehen in
`orchestrierung.md`, hier nicht neu aufgeschrieben. Für shadcn-Komponenten
speziell heißt das: Plan-Datei bekommt den Ist-Zustand der kopierten
`.tsx`-Datei als Zitat, nennt genau welche Tailwind-Klassen/Tokens sich ändern,
und der Executor rührt keine andere Datei in `components/ui/` an, die nicht im
Plan steht.

## 4. Die Audit-Achsen (aus `audit-playbook.md`, auf eine kopierte Komponente verdichtet)

- **Farb-/Radius-/Schatten-Tokens**: nutzt die Datei noch shadcn-Default-CSS-
  Variablen (`--primary`, `--radius` etc.) oder schon die Marken-Tokens des
  Projekts?
- **Varianten-Vollständigkeit**: deckt `cva()` alle Zustände ab, die das Design
  im Briefing verlangt (z.B. destructive/success/ghost), oder fehlt eine?
- **A11y-Reste**: sind ARIA-Attribute/Fokus-Reihenfolge nach dem Umbau noch
  intakt (Radix/Base UI liefert sie, eigener Markup-Umbau kann sie kaputt
  machen)?
- **Motion**: nutzt die Komponente noch die Default-Transition oder ist sie an
  `motion-doktrin.md` angepasst (Timing, Reduced-Motion)?
- **Duplikation**: gibt es eine zweite, fast identische Komponente im selben
  Projekt (z.B. zwei Dialog-Varianten), die zusammengelegt gehört?
- **Bundle/Abhängigkeiten**: zieht die Komponente einen Unterbau (Radix/Base
  UI/Aria), den das Projekt sonst nirgends nutzt — lohnt sich das?
- **Wiedererkennbarkeit**: sieht die Komponente, nebeneinander mit einem
  frischen `shadcn add`-Output verglichen, überhaupt noch anders aus?

Jeder Befund braucht eine Fundstelle (`file:line`), keine Vermutung — Format
und Prioritätsregel (Impact ÷ Aufwand) direkt aus `audit-playbook.md`
übernehmen.

## 5. Falscher Fall

`npx shadcn add button dialog card` ausführen, Standardfarben (Zinc/Slate-
Graustufen), Standardradius `0.5rem`, Standard-Schatten unverändert lassen,
Seite live schalten. Ergebnis: Kunde bekommt exakt die Optik, die jedes
KI-generierte Vercel-Template hat — gleiche Button-Rundung, gleiches Grau,
gleicher Card-Schatten wie zehntausend andere Projekte, die denselben Befehl
liefen. Kein Wiedererkennungswert, kein Beleg für den Website-Preis. Die
Komponente MUSS mindestens Marken-Tokens (Farbe, Radius, Font) bekommen, bevor
sie ausgeliefert wird — siehe Audit-Achse 1 oben.
