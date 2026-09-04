# Modus `inspiration`

Genau **ein** Modus, analog zum Brain-Skill. Raphael sagt „Inspiration“,
„Look holen“, „Referenzen“, „was gibt’s visuell“, oder `/web inspiration`.
Kein Mischbetrieb mit Bau. Kein Production-Code, keine Copy, kein npm i.

Chip: nur `/web`. Effort high. Subagenten ja — **Fable nie**, Haiku nie.
Parent bleibt dünn: startet den Workflow, führt das Shot-Ledger, liest keine
PNGs selbst.

## Fertig heißt

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
2. **Refero-MCP zuerst.** 3–5 `refero_search_styles`-Winkel (breit, Domäne,
   bekannte Marke) → `refero_get_style` für 3–4 UUIDs (`md`). Produkt-UI:
   `refero_search_screens` / `get_screen` (`platform` web|ios). Journeys:
   Flows. Regeln: nicht eine Referenz kopieren, nicht zur Mitte mitteln,
   Token-Rollen nicht umdeuten. Details: `inspirations-quellen.md` §0.
3. **App/Flows:** Mobbin-MCP (`search_screens` / `search_flows`), Queries
   nach dem, was auf dem Screen steht — nicht nach Stimmungswörtern. Beide
   Tools liefern Preview-Bilder inline und `search_flows` sprengt 25k Tokens:
   nur ein Leaf ruft sie auf und gibt Screen-IDs plus eine DNA-Zeile zurück.
4. **Komponenten-Inspiration (optional):** 21st-MCP `search` → bis zu
   **drei** `get_component` (Builder-Plan, unbegrenzt; `get_usage` nur bei
   401/429 als Diagnose). Übernahme in den Bau nur über
   `inspiration.mjs 21st code <id> --out src/components/vendor/21st/`. Magic UI /
   React Bits nur wenn der Lock eine Motion-/Section-Lücke hat:
   `inspiration.mjs magicui|reactbits list --grep` → ein `get`.
5. **Galerien als Ergänzung, max. 3 URLs.** Quelle aus
   `zugangskarte.md` wählen (Landdding/Awwwards/Navbar/…), nie 20 Tabs.
   `inspiration.mjs <quelle> list|search` → `shot <url>` → PNG an ein
   **frisches** `visual-kritiker`-Leaf. Parent schreibt nur das Ledger.
6. **Synthese.** Ein Leaf (kimi-worker oder sol-builder, Copy-frei: nur
   DNA-Tabelle) schreibt das Reference-Lock. Ein zweites Leaf anderer
   Familie (grok-critic) prüft: drei Referenzen, Lock vollständig, keine
   Klon-Formulierung, Shots gelesen. FAIL → Lock nachziehen, nicht bauen.
7. **Handoff an Plan.** Eine Zeile in `PLAN.md`: Lock-Pfad, Shot-Ledger-
   Anker, offene Login-Blocker. Weiter mit Rolle Plan, nicht mit Bau.

## Subagenten

| Job | agentType | Sieht |
|---|---|---|
| Refero/Mobbin-Recherche | kimi-recherche **oder** grok-worker | MCP-Output, keine PNGs nötig |
| Screenshot **sehen** | visual-kritiker | nur PNG + Lock-Frage (eine DNA-Zeile) |
| Lock schreiben | kimi-worker / sol-builder (kein Fließtext-Copy) | Brief, Refero-md, Shot-Verdicts |
| Lock prüfen | grok-critic | Lock + Ledger, nicht den Recherche-Chat |

Max. ein Shot-Leaf pro PNG-Bündel (Desktop+Mobil derselben URL = ein Leaf,
zwei Dateien). Kein Enkel.

## Nie

- Inspiration und Bau in einem Rutsch.
- 21st-Code raten; mehr als drei Komponenten pro Bedarf ziehen.
- Galerie clonen, Demo-Copy/Logos übernehmen.
- Parent liest PNGs.
- Neue CLI für eine Site aus der Tweet-Liste — zuerst `zugangskarte.md`.
