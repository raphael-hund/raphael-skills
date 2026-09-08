# Modus `inspiration`

Genau **ein** Modus, analog zum Brain-Skill. Raphael sagt „Inspiration“,
„Look holen“, „Referenzen“, „was gibt’s visuell“, oder `/web inspiration`.
Kein Mischbetrieb mit Bau. Kein Production-Code, keine Copy, kein npm i.

Arbeitsverzeichnis für jeden Befehl unten: `cd /root/raphael-skills/skills/eigene/web`
(Leaves bekommen diesen Pfad im Prompt). Quellen-Schlüssel statt Domains:
`node scripts/inspiration.mjs --help`, `node scripts/komponenten.mjs libs`.

Chip: nur `/web`. Effort high. Subagenten ja — Fable, Astra und Kimi für Planung, Frontend und Copy; Haiku nie.
Parent bleibt dünn: startet den Workflow, führt das Shot-Ledger, liest keine
PNGs selbst.

## Fertig heißt

**Lock-Ziel ist `<kunde>/brand/DESIGN.md`** (eine Art-Direction je Kunde, Raphael
04.09.2026): das Reference-Lock steht dort als datierter Abschnitt; existiert
schon ein Lock oder eine Live-Seite, wird der Widerspruch benannt und
Raphaels jüngstes Wort gewinnt. `client-<name>/web/art-direction.md` verweist
nur auf diesen Abschnitt und trägt Shot-Ledger und Werkzeugtabelle. Das Lock
ist Vorschlag für das Fold-Duell (`fold-duell.md`), nie Ersatz für Raphaels
Wahl am Bild.

`client-<name>/web/art-direction.md` enthält:

1. Brief in 8 Zeilen (WHAT/WHO/PLATFORM, Goal, Tone, Objection, Hook,
   Constraints, Research needed, Path) — oder Raphael hat ihn gegeben.
2. **Reference-Lock** (Primär, Preserve, Borrow only, Role rules, Reject,
   Token commitments) aus Refero-Styles, nicht aus Modellgeschmack.
3. 2–3 Look-Cases (URL + was übernommen wird + was verboten ist).
4. Shot-Ledger: `pfad | viewport | gelesen-von | verdict` für jedes PNG.
5. Werkzeugtabelle noch **leer oder nur Defaults** — Komponentenwahl ist
   der nächste Plan-Schritt, nicht dieser Modus.

Ohne Read der Shots = nicht gesehen. Ohne Lock = nicht fertig.

## Ablauf (hart, in dieser Reihenfolge)

1. **Brief.** Fehlt er, 8 Zeilen selbst setzen und Raphael nur fragen, wenn
   die Wahl das Geschäftsergebnis ändert.
2. **Refero zuerst, im Recherche-Leaf.**
   `node scripts/design-mcp.mjs refero styles search "<query>" --json` →
   `node scripts/design-mcp.mjs refero styles get <uuid> --out <dir>`.
   Produkt-UI: `refero screens search|get|image`; Journeys: `refero flows
   search|get`. Eine UUID aus einer öffentlichen `styles.refero.design`-URL,
   die `get` ablehnt, einmal direkt lesen statt in eine andere UUID umzudeuten.
3. **App/Flows, im Recherche-Leaf.**
   `node scripts/design-mcp.mjs mobbin screens|flows|sections "<query>"
   --platform web|ios --out <dir> --json`. Nach Screen-Inhalt suchen, nicht
   nach Stimmungswörtern. Treffer sind Screens fremder Produkte (SaaS-Booking,
   nicht Praxen): nach dem Screen-Element suchen (`appointment booking
   calendar`, `pricing table`), Branchenwörter weglassen; passt nichts,
   `refero screens` nehmen. Dateien und IDs plus eine DNA-Zeile zurückgeben;
   Bilddateien nicht in den Parent-Kontext laden.
4. **21st-Inspiration, optional im Recherche-Leaf.**
   `node scripts/design-mcp.mjs 21st search "<query>" --json` → höchstens
   drei Treffer mit `21st get <id> --out <dir>`. Übernahme erst im Plan/Bau
   nach dem Ablauf „Komponenten ziehen“ unten.
5. **Galerien als Ergänzung, max. 3 URLs.** Quelle aus `zugangskarte.md`
   wählen, nie 20 Tabs: `node scripts/inspiration.mjs <quelle> list|search`
   → optional `<quelle> get <slug|url>` → `node scripts/inspiration.mjs shot
   <url> --out <dir>` → PNG an ein **frisches** `grok-critic`-Leaf. Neue
   Quellen heißen `supahero`, `cta`, `recent`, `fps` und `posts`; sie bleiben
   offen, solange das Galerie-Paket wegen Siteinspire/Firecrawl im globalen G1
   auf ESCALATE steht. Parent schreibt nur das Ledger.
6. **Synthese.** Ein `astra-worker`-Leaf (Copy-frei: nur DNA-Tabelle)
   schreibt das Reference-Lock. `grok-critic` prüft danach:
   drei Referenzen, Lock vollständig, keine Klon-Formulierung, Shots gelesen.
   FAIL → Lock nachziehen, nicht bauen.
7. **Handoff an Plan.** Eine Zeile in `PLAN.md`: Lock-Pfad, Shot-Ledger-
   Anker, offene Login-Blocker. Weiter mit Rolle Plan, nicht mit Bau.

## Komponenten ziehen (erst im Plan/Bau)

Das Komponenten-Skript ist der eine Zugang für Registry-, Vendor-, npm- und
HTML-Bibliotheken. Es listet Wege und sucht in der gewählten Bibliothek;
`view` und `get` arbeiten mit einem Registry-Ziel `@namespace/name`.

```bash
node scripts/komponenten.mjs libs
node scripts/komponenten.mjs search <lib|@namespace> "<query>"
node scripts/komponenten.mjs view <@namespace/name>
node scripts/komponenten.mjs get <@namespace/name> --out src/components/vendor/<lib>/
```

`search` nimmt einen Registry-Namespace (`@magicui`, `@react-bits`, `@aceternity`,
`@shadcnblocks`, …) oder einen Namen aus `libs` (`"Magic UI"`, `hyperui`). Die
Query sind ein bis zwei Wörter aus dem Komponentennamen; alle müssen
vorkommen, `exit 1` heißt „kein Name passt" (kürzer suchen, andere Registry).
Docs-Bibliotheken (HyperUI, Float UI, Meraki, Hover, Animata) liefern nur
Treffer-URLs in der Spalte `ziel`: Code an der Quelle kopieren. Druckt `get` `lizenz prüfen`, gilt:
LICENSE des Repos oder der Docs lesen und in der Werkzeugtabelle nennen; ohne
Beleg kein Einbau.

Nach `get`: Abhängigkeiten und Lizenz lesen, genau **eine** Komponente behalten
und eine Zeile `Bedarf | Loop-Schritt | Default | Install/Use | Gate |
Router-Anker` in `art-direction.md` ergänzen. Der Anker ist je Einsatz
`#sections`, `#motion` oder `#background`; ohne Zeile kein Import.

| Zugang | Werkzeug | Grenze |
|---|---|---|
| Design-MCP | `design-mcp.mjs` | Refero/Mobbin nur Inspiration; 21st einzeln |
| Komponenten | `komponenten.mjs` | eine Komponente; Lizenz und Abhängigkeiten vor Einbau prüfen |
| Galerien | `inspiration.mjs` | max. drei URLs, Shot-Leaf liest Dateien |
| Flache REST-APIs | `*-pp-cli` aus `zugangskarte.md` (Pexels, Poly Haven, Iconify, Fontshare, Codrops) | Asset lokal, Lizenz notieren |
| Katalog-Quellen (Generatoren, Shader, Texturen, Illustrations-Kits, Foundries) | `resource-access.mjs open "<exakter Name>"` | Bot-Walls laufen über den Firecrawl-Kanal; `show` ist nur der lokale Katalog, kein Live-Beleg |
| Fotos / Icons / Fonts im Look | Shutterstock `stock.mjs` → Pexels; `iconify-pp-cli` (Prefix-Tabelle in `zugangskarte.md`); Adobe Fonts `adobe-fonts-kit.mjs`, Fontshare | nur als Referenz im Lock, Einbau erst im Bau |

## Subagenten

| Job | agentType | Sieht |
|---|---|---|
| Refero/Mobbin/21st-Recherche | `grok-worker` | Ausgabe und Dateipfade von `design-mcp.mjs`; keine Tokenwerte, keine Bilder im Prompt |
| Screenshot **sehen** | grok-critic | nur PNG + Lock-Frage (eine DNA-Zeile) |
| Lock schreiben | `astra-worker` (kein Marketingtext) | Brief, Refero-md, Shot-Verdicts |
| Lock prüfen | grok-critic | Lock + Ledger, nicht den Recherche-Chat |

Max. ein Shot-Leaf pro PNG-Bündel (Desktop+Mobil derselben URL = ein Leaf,
zwei Dateien). Kein Enkel. Ist-Seite des Kunden gehört ins Ledger, ihre Shots
nach `client-<name>/web/inspiration/shots/`, nie nach `/tmp`. Ledger-Spalte
heißt `gelesen-von`.

Erster Lauf 04.09.2026 (MAKE): 4 Recherche-Leaves parallel, 4 Shot-Leaves,
Lock + Gegenprüfung + Fix, 11 Agenten, 400k Tokens, 23 Minuten. Ergebnis
`art-direction.md` im Client-Ordner von MAKE (`/root/clients/client-make/web/`).

## Nie

- Inspiration und Bau in einem Rutsch.
- 21st-Code raten; mehr als drei Komponenten pro Bedarf ziehen.
- Galerie clonen, Demo-Copy/Logos übernehmen.
- Parent liest PNGs.
- Zweites Werkzeug für denselben Zugangstyp — zuerst `zugangskarte.md`.
