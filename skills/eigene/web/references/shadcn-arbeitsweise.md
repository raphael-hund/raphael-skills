# shadcn-Arbeitsweise — lokale Registry + Verbesserungs-Loop

**Wofür:** shadcn-Komponenten nicht als Default-Look stehen lassen, sondern als
Rohmaterial behandeln, das angefasst werden muss. Ergänzt `radix-shadcn-tailwind-stack.md`
(dort steht der Stack-Rahmen: Radix als A11y-Layer, Tailwind als Optik-Layer,
shadcn als Brücke — hier wird das NICHT wiederholt).

**Herkunft:**
- `/root/tools/vendor/shadcn-improve/` — Skill `improve` (Audit→Plan→Execute-Loop
  für beliebige Codebasen, hier auf kopierte shadcn-Komponenten angewendet).
  Lizenz: MIT, Copyright 2026 shadcn (`LICENSE.md` im Vendor-Repo, Frontmatter
  von `skills/improve/SKILL.md` im Vendor-Repo bestätigt `license: MIT`).
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

> **Falle:** Im selben Ordner liegt `shadcn-registry.json`. Das ist **keine
> Registry**, sondern eine HTML-Fehlerseite mit `.json`-Endung (39 KB, beginnt
> mit `<!DOCTYPE html>`) — ein missglückter Download vom 28.07.26. `jq` bricht
> daran ab. Der brauchbare Index ist `shadcn-index.json`, sonst nichts.

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

**Diese Zahlen sind geprüft, nicht behauptet:**

```bash
node evals/run-registry-check.mjs
```

9 Fälle, Exit 0. Er zieht Komponentenzahlen, Varianten-Verteilung, Doku-Seiten
und **beide Einzelstück-Listen** aus den echten Dateien und vergleicht sie mit
dieser Seite. Zahlen in einer Doku sind beim Schreiben wahr und danach still
veraltet — der nächste Registry-Update verschiebt sie, ohne dass jemand hier
etwas anfasst.

Der Lauf hat sich sofort gelohnt: „87 Seiten" waren in Wahrheit 84, und die
Liste der Appica-Only-Komponenten nannte 10 von 22. Wer sich darauf verließ,
hielt `date-picker`, `autocomplete` oder `toolbar` für nicht vorhanden und baute
sie nach. **Eine unvollständige Liste ist schlimmer als keine, weil sie wie eine
vollständige aussieht.** Beide Richtungen sind belegt: Prüfstand gegen die alte
Fassung → 2 rot, gegen die korrigierte → 9/9.

## 2. Appica als zweite lokale Quelle

Appica UI (`/root/tools/uikit-vault/registry/appica/`) ist eine eigenständige,
auf Base UI + Tailwind v4 aufbauende React-Bibliothek — 62 Komponenten laut
`components.json`, dokumentiert in 84 Seiten unter `appica/docs/`.

Beide Bibliotheken haben zufällig genau 62 Komponenten, aber je **22 davon sind
Einzelstücke**. Die Mengendifferenz nicht abschreiben, sondern ziehen — der
Index ändert sich mit jedem Update:

```bash
cd /root/tools/uikit-vault/registry
jq -r '.[].name' shadcn-index.json      | sort > /tmp/sh.txt
jq -r '.[].name' appica/components.json | sort > /tmp/ap.txt
comm -13 /tmp/sh.txt /tmp/ap.txt    # nur Appica
comm -23 /tmp/sh.txt /tmp/ap.txt    # nur shadcn
```

**Nur Appica** (Stand 29.07.26): `autocomplete`, `background-pattern`, `chip`,
`copy-button`, `countdown`, `data-table`, `date-field`, `date-picker`,
`gradient-glow`, `loader`, `meter`, `navigation`, `number-field`, `otp-field`,
`preview-card`, `radio`, `sparkline`, `text-animate`, `thumbnail`, `time-field`,
`toc`, `toolbar`. Eigene Konzepte, keine Umbenennungen — die wertvollsten sind
`data-table` (fertige TanStack-Table-Verdrahtung: Sortierung, Filter, Auswahl,
Pagination), `sparkline` (Inline-Trend-Chart), `countdown` (Rolling-Digit-Timer)
sowie `gradient-glow` und `background-pattern` (dekorative Marketing-Effekte).

**Nur shadcn:** `aspect-ratio`, `attachment`, `bubble`, `card`, `chart`
(Recharts-Wrapper), `command` (cmdk-Befehlspalette), `direction`, `empty`
(Empty-State-Pattern), `hover-card`, `input-group`, `input-otp`, `item`,
`label`, `marker`, `message`, `message-scroller`, `native-select`,
`radio-group`, `resizable`, `sheet` (Seiten-Panel-Modal), `sidebar`
(App-Shell-Navigationsraster), `sonner`.

> **Doppelgänger beachten:** `otp-field` (Appica) und `input-otp` (shadcn) lösen
> dieselbe Aufgabe, ebenso `radio` und `radio-group`. Das entscheidet der Tresor
> bereits: für OTP gilt die installierte Library `input-otp`, nicht die
> Registry-Kopie (`bibliotheks-tresor.md`, Konflikt-Tabelle). Eine dritte
> Antwort auf dieselbe Frage ist genau das, was dieser Skill nicht will.

**Regel, wann Appica statt shadcn:** Braucht das Projekt eine der oben
genannten Appica-Only-Komponenten (v.a. `data-table` oder `sparkline` für
Dashboards/Analytics, `gradient-glow`/`background-pattern`/`countdown` für
Marketing-Landingpages) — Appica installieren statt selbst nachzubauen. Für
alles andere bleibt shadcn+Radix der Default aus `radix-shadcn-tailwind-stack.md`,
weil das die etablierte, breiter dokumentierte Kombination ist.

## 3. shadcnuikit.com ist NICHT im Tresor — und warum nicht

`shadcnuikit.com` (Shadcn UI Kit) wirkt auf den ersten Blick wie eine dritte
Quelle: die öffentliche Registry unter `/r/registry.json` listet **875 Einträge**
(512 `registry:component`, 363 `registry:block`), darunter 28 Illustrationen
(`illustration1`–`illustration28`, verlinkt auf `/illustrations`).

**Geprüft am 29.07.2026 — nutzbar ist davon nichts:**

| Prüfung | Ergebnis |
|---|---|
| `GET /r/registry.json` | 200, 875 Einträge — aber jedes `files[].content` ist **leer** (0 Bytes) |
| `GET /r/illustration1.json` | **404** `{"error":"Component, block, or example not found!"}` |
| Lizenzseite (`/license`, `/docs/license`, `/terms`) | alle **404** |
| `/pricing` | 200 — „Premium license", Einmalpreise von $129 bis $699 |

Es ist ein **Bezahlprodukt**. Die Registry ist ein Schaufenster: Namen und
Beschreibungen sind öffentlich, der Quellcode nicht. Wer `npx shadcn add` gegen
diese URLs laufen lässt, bekommt einen 404, keine Komponente.

**Regel:** Nicht in den Tresor spiegeln, nicht als Quelle in Kunden-Builds
nennen, nicht aus dem Gedächtnis „nachbauen, wie es dort aussieht". Die Seite
taugt als **Ideengeber** — man sieht dort, welche Blocktypen ein
Dashboard-Kit üblicherweise abdeckt. Der Weg zur Umsetzung führt danach über
den Tresor (`lib-lookup.mjs`) und die freien Registries oben, nicht über eine
Kopie.

Soll das Kit wirklich benutzt werden, ist das eine **Kaufentscheidung** und
gehört als solche in `ops/review-inbox.md` — Geld ausgeben ist nichts, was ein
Agent nebenbei entscheidet.

**Illustrationen ohne Kauf:** dafür ist `references/bildgenerierung.md` da —
GPT Image 2 ist laut Bildgenerierungs-Doktrin der beste Illustrator (2D/3D,
auch ohne Referenz). Eine gekaufte Illustrations-Bibliothek löst ein Problem,
das Raphaels Stack bereits gelöst hat.

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
