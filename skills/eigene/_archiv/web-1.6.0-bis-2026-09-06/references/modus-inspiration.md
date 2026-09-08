# Inspiration für eine Website

Ergebnis ist eine begründete Auswahl tatsächlich untersuchter Referenzen für
den konkreten Auftrag. Der Modus plant oder baut keine Website, solange das
nicht ebenfalls beauftragt ist. Eine bestehende Kundenrichtung bleibt gültig;
neue Referenzvorschläge werden nicht automatisch zum verbindlichen Design-Lock.

## Vorgehen

1. Ziel, Zielgruppe, gewünschte Wirkung und vorhandene Kundenreferenzen lesen.
   Relevante neue Eingangsdateien der letzten sieben Tage prüfen.
2. Raphaels passende Quelle aus `zugangskarte.md` wählen: Galerien für
   Seitenbeispiele, Mobbin für Produkt-Screens/Flows oder vorhandene Kundenfälle.
   `inspirations-quellen.md` bestimmt den Weg zum konkreten untersuchten Beispiel.
3. Konkrete Beispiele untersuchen. Bei visueller Aussage die Bilder wirklich
   ansehen; bei einer Flow-Aussage die Interaktion prüfen. Quellen, IDs/URLs,
   Datum und Zugangslücken festhalten. Fehlender Login ist kein leerer Erfolg.
4. Im bestehenden `art-direction.md` oder verlangten Ergebnis erklären, was
   zur Aufgabe passt, welche Teile als Vorbild dienen und welche Vorgaben
   erhalten bleiben. Bestehendes `brand/DESIGN.md` wird referenziert.
5. Die verlangte Auswahl liefern. Wenn eine subjektive Richtungswahl nötig
   ist, konkrete Vorschläge zeigen. Der Inspirationsauftrag startet nicht
   automatisch einen Build oder ein Fold-Duell.

Unabhängige Recherche kann über `orchestrate` delegiert werden; Modell- und
Werkzeugwahl folgen dem aktuellen Host. Eine Synthese braucht keine feste
Vier-Rollen-Flotte. Bildmengen werden nach Prüffrage und Hostbudget aufgeteilt.

## Vorhandene Quellen- und Komponentenzugänge

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
LICENSE des Repos oder der Docs lesen und beim Quellenbefund im vorhandenen Plan nennen; ohne
Beleg kein Einbau.

Nach `get`: die benötigten Dateien, Abhängigkeiten und konkrete Lizenz lesen.
Ein Inspirationsauftrag beschreibt die mögliche Verwendung; erst ein Bauauftrag
integriert den Baustein. Im vorhandenen Plan Quelle, übertragene Eigenschaft und
gegebenenfalls Einsatzdatei/Prüfung festhalten, nach `inspirations-quellen.md`.

| Zugang | Werkzeug | Grenze |
|---|---|---|
| Design-MCP | `design-mcp.mjs` | Refero/Mobbin nur Inspiration; 21st einzeln |
| Komponenten | `komponenten.mjs` | eine Komponente; Lizenz und Abhängigkeiten vor Einbau prüfen |
| Galerien | `inspiration.mjs` | gezielte Auswahl; verwendete Bilder tatsächlich ansehen |
| Flache REST-APIs | `*-pp-cli` aus `zugangskarte.md` (Pexels, Poly Haven, Iconify, Fontshare, Codrops) | Asset lokal, Lizenz notieren |
| Katalog-Quellen (Generatoren, Shader, Texturen, Illustrations-Kits, Foundries) | `resource-access.mjs open "<exakter Name>"` | Bot-Walls laufen über den Firecrawl-Kanal; `show` ist nur der lokale Katalog, kein Live-Beleg |
| Fotos / Icons / Fonts im Look | Shutterstock `stock.mjs` → Pexels; `iconify-pp-cli` (Prefix-Tabelle in `zugangskarte.md`); Adobe Fonts `adobe-fonts-kit.mjs`, Fontshare | als Referenz verwenden; Einbau nur im entsprechenden Auftrag |
