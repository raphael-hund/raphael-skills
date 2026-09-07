# UI-Bibliotheken für HTML-first-Websites

Dieses Modul hilft dem Website-Agenten, aus 50 UI-Bibliotheken passende Komponenten für HTML-first-Service-Websites auszuwählen.
Die drei Recherche-Teile dokumentieren die Quellenprüfung vom 07.09.2026 über Docs, Repositories, Lizenzdateien, Paketmetadaten und Registry-Antworten.
Es gab keine Installation, keinen CLI-Einbau, keinen Build und keinen Browsertest; dieses Modul konsolidiert ausschliesslich die gelieferten Befunde.

## Einbauwege A–E

Die Tabelle erhält die Originaldefinitionen aller drei Teile; ihre A/B-Grenzen unterscheiden sich.

| Code | Teil A, Originaldefinition | Teil B, Originaldefinition | Teil C, Originaldefinition |
|---|---|---|---|
| A | Direktes HTML mit frameworkfreiem CSS oder JavaScript. | Originalbaustein in HTML mit frameworkfreiem JavaScript nutzbar. | Direktes HTML mit frameworkfreiem DOM-JavaScript, etwa Flowbite oder Preline. |
| B | HTML mit Tailwind-/CSS-Klassen; keine Komponenten-JavaScript-Runtime. | HTML mit kompiliertem Tailwind-/Bibliotheks-CSS; kein Framework-JavaScript nötig. | HTML mit gebautem Tailwind-CSS; der gewählte Baustein benötigt keine Komponenten-Runtime. Native Elemente wie details können trotzdem interaktiv sein. |
| C | React-Komponente statisch beim Astro-Build rendern, ohne `client:*`. | React-Komponente beim Astro-Build statisch rendern, ohne `client:*`. | React nur beim Astro-Build rendern, ohne client:*-Direktive. Nur für tatsächlich statische Ausgabe oder erhaltene native HTML-Funktion. |
| D | React-Insel mit Hydration für Interaktion oder Animation. | React-Insel mit Hydration für Zustand, Ereignisse, Animation oder Browser-APIs. | Zusammengehörige React-Interaktion als hydrierte Insel. Trigger, Zustand und Provider bleiben innerhalb derselben Insel. |
| E | Für unseren Standardweg ungeeignet oder unter der genannten Bedingung ausgeschlossen. | Zurzeit nicht geeignet; Grund steht beim Eintrag. | Derzeit ungeeignet oder gesperrt; der jeweilige Datensatz nennt den Grund. |

Teil A zählt vorgefertigtes CSS zu A; Teile B/C beschreiben A über frameworkfreies JavaScript.
B erlaubt native HTML-Interaktion wie `details`, solange der gewählte Baustein keine Komponenten-Runtime braucht.
Alpine.js bleibt eine zusätzliche DOM-Runtime; entsprechende Float-/Meraki-Beispiele brauchen für striktes A eine native oder Vanilla-Adaption.
Die Route gilt für die genannte Variante samt Voraussetzungen; TSX mit Tailwind-Klassen belegt keinen fertigen HTML-Verteilweg.

## Auswahlregel für den Website-Agenten

1. **Bedarf benennen:** etwa statische Leistungskarten, FAQ, Kontakt-Dialog oder belegte Messwerte; vorhandene passende Komponenten erhalten.
2. **Passende Zeile in der Schnellauswahl suchen:** höchstens drei Kandidaten pro Bedarf prüfen und ihre konkreten Varianten vergleichen.
3. **Lizenz und Route lesen:** Warnhinweise gelten vor einer technischen Empfehlung; bei E oder ungeklärten Nutzungsrechten keine Übernahme starten.
4. **Einzelprofil im [Korpus-JSON](corpus/ui-libraries-2026-09.json) abrufen:** über `nr` auswählen; Quellen, `useful_components`, Imports und Registry-Befunde lesen.
5. **Nach [component-islands.md](component-islands.md) einbauen:** statische Ausgabe erhalten und nur zusammengehörige Interaktion hydratisieren.
6. **Fallbacks und tatsächliche Requests prüfen:** HTML ohne JavaScript, echte Interaktion und Formularwege sowie gelieferte JS-/CSS-Kosten messen.

- Pro Komponentenjob genau eine Implementierung behalten; zusätzliche Bibliotheken dürfen keine zweite Button-, Dialog- oder Formularbasis erzeugen.
- Die Tokens aus `DESIGN.md` haben Vorrang vor jedem Bibliothekstheme; Farben, Schriften, Abstände, Radien und Zustände darauf abbilden.
- Die Empfehlungen nach Bedarf sind Suchgruppen; daraus höchstens drei Kandidaten auswählen und einen Baustein umsetzen.

Einzelprofil beispielhaft vom Skill-Verzeichnis aus lesen; `37` durch die gewünschte Nummer ersetzen.

```sh
node -e 'const c=require("./references/corpus/ui-libraries-2026-09.json"); console.log(JSON.stringify(c.libraries.find(x=>x.nr===37),null,2))'
```

`nr` folgt `LISTE.txt`; die übrigen Objektfelder bleiben unverändert.
Teil A verwendet Objekte für `license`, `route` und `registry_pattern`; Teile B/C verwenden dort Strings.
Weitere Typunterschiede betreffen etwa `primitives`; Verbraucher müssen die Originalstruktur des jeweiligen Profils lesen.

## Schnellauswahl: alle 50 Bibliotheken

Die erste Route ist primär; weitere Codes gelten nur für die im Profil beschriebenen Varianten und Anpassungen.
`C?` bezeichnet einen noch einzeln zu prüfenden statischen Kandidaten; `-` bedeutet, dass kein weiterer Weg erfasst ist.
Lizenzkürzel gelten für den untersuchten öffentlichen Code; Pro-Produkte, Community-Dateien und fremde Assets separat prüfen.
Der Link bei lex ui führt mangels bestätigter Projekt-URL zum Korpus.

| Nr. | Name mit Link | Route primär / weitere | Lizenz, kurz | Kern | Warnhinweis |
|---|---|---|---|---|---|
| 01 | [8bitcn](https://www.8bitcn.com/) | C / D | MIT | Retro-Karten und Pixeloberflächen | `retro.css` lädt Google Fonts; Schriftquelle und Lesbarkeit prüfen. |
| 02 | [basecn](https://basecn.dev) | C / D | MIT | Grundkomponenten auf Base UI | Base-UI-Imports, Tokens und Accordion-Keyframes zusammen übernehmen. |
| 03 | [beui](https://beui.dev) | D / C, B | MIT | Federnde Accordions und Hover-Karten | Marquee-Registry liefert die nötigen CSS-Keyframes nicht mit. |
| 04 | [COSUI](https://baidu.github.io/cosui/) | E / - | Apache-2.0 | San-Komponenten für Dialog- und Datenoberflächen | Zusätzliche San-Runtime; kein belegter HTML-/React-Insel-Einbau. |
| 05 | [Cult UI](https://cult-ui.com) | C / D, B | MIT | Texturierte Karten und animierte Tabs | Live-Registry HTTP 429; Minimal Card enthält ungenutzten Next-Import. |
| 06 | [daisyUI](https://daisyui.com) | B / A | MIT | Semantische HTML-/CSS-Grundbausteine | Native Varianten wählen; Tailwind-Browsercompiler aus Produktionsseiten entfernen. |
| 07 | [Easy UI](https://www.easyui.pro/) | C / B, D | MIT | Feature-Karten, Heroes und Formulare | Idea Form simuliert Erfolg; importiertes `canvas-confetti` fehlt in Registry-Abhängigkeiten. |
| 08 | [Eldora UI](https://www.eldoraui.site) | D / C | MIT | Animierte Texte und Marketingabschnitte | Next-Imports adaptieren; CTA nennt `motion/react` fälschlich als Paket. |
| 09 | [Fancy Components](https://fancycomponents.dev) | D / B | MIT | Typografie-, Scroll- und Mausanimationen | Simple Marquee braucht Motion; nur Sticky Footer ist hier B. |
| 10 | [HeroUI](https://heroui.com) | B / C, D | Apache-2.0-Kopf mit verändertem Anhang | CSS-Klassen und React-Aria-Controls | npm nennt MIT; abweichenden Lizenzanhang vor Produktionsnutzung klären. |
| 11 | [Kibo UI](https://www.kibo-ui.com/) | D / C | MIT | Upload-Auswahl und Bildvergleiche | Dropzone liefert kein Upload-Backend; Validierung und Datenschutz ergänzen. |
| 12 | [Magic UI](https://magicui.design) | C / D, B | MIT | Marquees, Leistungsraster und Einblendeffekte | Blur Fade kann Inhalte initial verstecken; CSS-/Motion-Variante unterscheiden. |
| 13 | [Motion Primitives](https://motion-primitives.com) | D / - | MIT | Animierte Accordions und Bildvergleiche | Registry unter `/c/`; Live-Probe HTTP 429, Repo-Dateien gelesen. |
| 14 | [mvpblocks](https://blocks.mvp-subha.me) | C / D | BSD-3-Clause | Preis-, FAQ- und Kontaktabschnitte | CLI-Metadatum MIT gilt nicht für Blocks; Kontakt-Demo versendet nichts. |
| 15 | [shadcn/ui](https://ui.shadcn.com) | C / D | MIT | Formulare, Overlays und Navigation | Base/Style passend wählen; rohe Style-Dateien können `IconPlaceholder` enthalten. |
| 16 | [React Bits](https://reactbits.dev) | D / - | MIT + Commons Clause | Text-, Maus- und WebGL-Effekte | Komponentenweiterverteilung auch als Port untersagt; dafür E, Website-Endprodukt separat beurteilen. |
| 17 | [Spectrum UI](https://ui.spectrumhq.in) | D / - | Apache-2.0 | Animierte Marketingkarten und Controls | Herkunft aus mehreren Libraries prüfen; Bento-Karten starten mit `opacity: 0`. |
| 18 | [Velora UI](https://velora.colorlib.com) | C / D | MIT | Logo-/Leistungsraster und Seitentemplates | Ganze Templates enthalten Next.js-Annahmen. |
| 19 | [Watermelon UI](https://ui.watermelon.sh) | D / C? | MIT | Animierte Controls und Preisabschnitte | Angekündigte npm-CLI nicht verfügbar: E404; Registry vorhanden, Base-UI-Auflösung prüfen. |
| 20 | [21st.dev](https://21st.dev) | C / D | Plattform MIT; je Komponente offen | Community-Suche für Marketingbausteine | Registry verlangt Login; einzelne Original-LICENSE-Dateien unverifiziert. |
| 21 | [Aceternity UI](https://ui.aceternity.com) | C / D | LICENSE unverifiziert | Bento-Raster, Timelines und Testimonials | Lizenz freier Einzelkomponenten klären; Website-/Pro-Bedingungen begrenzen Weitergabe. |
| 22 | [Amicro](https://amicro.vercel.app) | D / - | MIT | Einblend-, Hover- und Texteffekte | Raw-GitHub-Registry verwenden; Website liefert teils HTML statt JSON. |
| 23 | [Animate UI](https://animate-ui.com) | D / - | MIT + Commons Clause | Animierte Controls und Zahlen | Weiterverteilung der Originalkomponenten eingeschränkt; Primitive-Variante passend wählen. |
| 24 | [Beautiful UI](https://www.beautifului.dev) | D / C | MIT | Eingabe- und Freigabe-UI für Assistenten | Foundation/CSS mitnehmen; SidebarNav enthält kommerzielle Icons, Demos ersetzen kein Backend. |
| 25 | [FlyonUI](https://flyonui.com) | B / A | MIT + Preline Fair Use | HTML-Controls mit DOM-Plugins | Gebündelter Preline-Code bringt zusätzliche Fair-Use-/Attributionspflichten mit. |
| 26 | [HextaUI](https://hextaui.com) | C / D | MIT | Karten, Accordions und Carousels | Carousel importiert einen internen Registry-Buttonpfad; lokal auflösen. |
| 27 | [Jolly UI](https://jollyui.dev) | D / - | MIT | React-Aria-Formulare und Datumsfelder | Website deaktiviert; historische Registry nutzt altes Schema, Einbau unverifiziert. |
| 28 | [Lightswind](https://lightswind.com) | C / D | MIT, öffentliches Repo | Animierte Karten, Hintergründe und Blocks | Aktueller Katalog ist React; alte HTML-/Alpine-Keywords belegen keinen A/B-Weg. |
| 29 | [lex ui](corpus/ui-libraries-2026-09.json) | E / - | unverifiziert | Projekt noch nicht identifiziert | Original-URL nötig; weder Ersatzbibliothek noch Lizenz aus Namensähnlichkeit ableiten. |
| 30 | [Reverse UI](https://reverseui.com) | D / - | LICENSE unverifiziert | Animierte Logos, CTAs und Kennzahlen | Privates Repo; vollständige Quellen fehlen, Tailwind teils erst angekündigt, MUI vorhanden. |
| 31 | [Skyper UI, vermutlich Skiper UI](https://skiper-ui.com) | D / C | Eigene Bedingungen; LICENSE unverifiziert | Scroll-, Bild- und Linkeffekte | Namenszuordnung bleibt Vermutung; Free verlangt laut Docs Attribution, Pro einen Schlüssel. |
| 32 | [Smooth UI](https://smoothui.dev) | D / - | MIT | Animierte FAQ-, Preis- und Testimonial-Blocks | Geprüfte Blocks brauchen Hooks/Motion; nachgeladene Tokens und Demo-Daten prüfen. |
| 33 | [Tailark](https://tailark.com) | C / D | MIT, OSS-Repo | Marketingsektionen in mehreren Stilen | Aktive Registry `oss.tailark.com`, numerische Slugs und `@tailark-oss` beachten; Next-Imports adaptieren. |
| 34 | [Tailgrids](https://tailgrids.com) | C / D | MIT, öffentliches Repo | Controls und Marketing-/App-Blocks | v3 ist React; eigene CLI, kein bestätigtes shadcn-Einzelitem-Muster. |
| 35 | [lui layouts, Kandidat UI-Layouts](https://www.ui-layouts.com) | D / C | MIT, Kandidaten-Repo | Animierte FAQ-, Feature- und Galerielayouts | Namenskorrektur unbestätigt; eigene CLI unpublished, Registry-Imports unvollständig deklariert. |
| 36 | [Flowbite](https://flowbite.com) | A / B | MIT | HTML-Formulare, Navigation und Overlays | Interaktive Datenattribute brauchen JS; CSS und JS auf denselben Paketstand pinnen. |
| 37 | [HyperUI](https://hyperui.dev) | B / - | MIT | Statische Kontakt-, FAQ- und Preisabschnitte | Preview-Script `public/component.js` blockiert Links, Dateien und Submit; niemals übernehmen. |
| 38 | [Preline UI](https://preline.co) | A / B | MIT + Preline UI Fair Use | Vanilla-DOM-Plugins für HTML-Controls | Fair Use begrenzt Konkurrenzprodukte und Weitergabe; Attribution samt Repo-Link prüfen. |
| 39 | [Float UI](https://floatui.com) | B / C, D | Benutzerdefiniert | HTML-Marketing- und Kontaktabschnitte | Alpine auch für FAQ-Daten; vorab HTML erzeugen, keine Komponenten-/Template-/Builder-Weitergabe. |
| 40 | [Meraki UI](https://merakiui.com) | B / - | MIT | HTML-Kontakt- und Preisblöcke mit RTL | Manche Heroes/Modals brauchen Alpine; FAQ-Collapse enthält keine Toggle-Logik. |
| 41 | [coconut ui, Kandidat Kokonut UI](https://kokonutui.com) | D / - | MIT, Kandidaten-Repo | Animierte Karten und Textakzente | Namenskorrektur unbestätigt; anderes Haxe-Projekt gleichen Namens, Next-Font-Import adaptieren. |
| 42 | [NexUI](https://www.nexui.dev) | E / - | unverifiziert | React-Controls mit Kopierbeispielen | Keine LICENSE im Repo/Tarball; CLI-API liefert leere Komponentenliste. |
| 43 | [Ninja UI, Kandidat ninja/ui](https://github.com/ninja/ui) | E / - | Apache-2.0, Kandidat | Historische jQuery-Widgets als Migrationsreferenz | Identität mehrdeutig; alte APIs und nicht erreichbare Website, kein Neubau-Kandidat. |
| 44 | [Sera UI](https://seraui.com) | D / C | MIT | FAQ-, Preis- und Dialogvarianten | Registry-Doppelpfade bei Accordion/Card; fehlende Imports und Abhängigkeiten vor Add auflösen. |
| 45 | [ReUI](https://reui.io) | D / C | MIT | Base-UI-/Radix-Formulare und Dialoge | Freie `c-*`-Items bestätigt; manche Primitive-URLs antworten 401, Style beibehalten. |
| 46 | [Syntax UI](https://syntaxui.com) | C / D | MIT | Leistungsraster, Footer und Preisvarianten | MinimalAccordion nutzt klickbares `motion.div`; Button-Semantik und Tastatur ergänzen. |
| 47 | [Open Source UI](https://opensourceui.in) | D / C | MIT | Kontaktformulare, Terminwahl und Teamraster | Optionaler `onSubmit` belegt keine Zustellung; Next-Imports und fremde Testimonials ersetzen. |
| 48 | [Kimia UI](https://kimia-ui.vercel.app) | C / D | MIT | Kleine Karten und native Formularfelder | React-17-/Tailwind-3-Stand; aktuelle Typen-, Portal- und Build-Kompatibilität unverifiziert. |
| 49 | [Tremor](https://tremor.so) | D / C | Apache-2.0 | Kennzahlen, Datenlisten und Charts | Raw-/npm-Setup trennen; Charts brauchen Browsermessung, ergänzende HTML-Daten vorhalten. |
| 50 | [Headless UI](https://headlessui.com) | D / - | MIT | Fokus- und Interaktionsprimitive ohne festen Stil | Dialog, Disclosure und Combobox brauchen Hydration; React-/Vue-Linien getrennt behandeln. |

## Empfehlung nach Bedarf für Service-Websites

### Statische Sektionen

- Für HTML-Angebots- und Kontaktabschnitte HyperUI (37), Meraki UI (40) oder Float UI (39) prüfen.
  Bei Float die Lizenzgrenzen und Alpine-Datenschleifen beachten; bei Meraki tatsächlich statische Varianten wählen.
- Für statisch gerenderte React-Abschnitte mvpblocks (14) oder Tailark (33) prüfen, etwa Preis- oder Kundenstimmenblöcke.
  Next-Imports zuerst adaptieren; FAQ, mobile Navigation und umschaltbare Preise können D verlangen.

### Frameworkfreie DOM-Interaktion

- Für scriptgesteuerte Menüs, FAQ und Overlays Flowbite (36) oder Preline UI (38) mit gezielter Plugin-Auswahl prüfen.
- Für native FAQs, Kontaktlinks und Formularfelder daisyUI (06) oder HeroUI-CSS (10) prüfen.
  CSS liefert kein React-Aria-Verhalten; HeroUIs Lizenzanhang vor Nutzung klären und native Semantik erhalten.

### Marketing-Motion

- Für dekorative Marketingabschnitte Magic UI (12), Eldora UI (08) oder React Bits (16) prüfen.
- Für animierte Controls und Zustandswechsel Animate UI (23) oder Motion Primitives (13) prüfen.
  Motion-/Event-/WebGL-Bausteine als begrenzte Insel einsetzen; Magic UIs statische CSS-Varianten können C/B bleiben.
- Wichtige Texte und Kennzahlen müssen ohne Animation sichtbar sein; Reduced Motion, Touch und tatsächliche Requests testen.
  React Bits und Animate UI begrenzen Komponentenweitergabe; eine Kundenwebsite ist getrennt vom weiterverteilten Komponentenpaket zu beurteilen.

### Grundkomponenten

- Für Formulare, Dialoge und Navigation shadcn/ui (15), basecn (02) oder Headless UI (50) prüfen.
- Bei vorhandener Base-UI-Grundlage passende Base-UI-Linien von shadcn oder basecn behalten; Radix-/React-Aria-APIs nicht ungeprüft mischen.
- Reine Card-Ausgabe kann C nutzen; Dialogtrigger, Inhalt und Provider bleiben zusammen in einer D-Insel.
  Die Auswahl- und Änderungsregeln im [shadcn/ui-Kontext](dependencies.md) gelten auch für fremde Registry-Komponenten.

### Spezialfälle

- 8bitcn (01) für einen ausdrücklich gewünschten Retro-Stil wählen; Pixeltypografie auf Lesbarkeit prüfen.
- Tremor (49) für echte Messreihen oder Vergleiche prüfen; Charts um eine HTML-Zusammenfassung oder Datentabelle ergänzen.
- Kibo UI (11) für Dateianhänge oder Vorher-/Nachher-Bilder prüfen; Upload-Verarbeitung und Fehlerpfade selbst anbinden.

## Registry-Befehle richtig verwenden

Die Befehle in den Recherche-Teilen beschreiben spätere Bezugswege; diese Konsolidierung führt keinen Installationsbefehl aus.
Ein HTTP-200-JSON belegt Erreichbarkeit und gelesenen Quellcode; die vollständige Installation samt Abhängigkeitskette bleibt ungetestet.

1. Im Einzelprofil das bestätigte `registry_pattern` und eine konkrete Komponentenquelle lesen; Platzhalter durch belegte Slugs und Styles ersetzen.
2. Lizenz, `components.json`, vorhandene Basis/Versionen und lokale Dateien prüfen; unterstützte `add --dry-run`-/`--diff`-Optionen vor Änderungen nutzen.
3. Gelieferte Dateien und rekursive `registryDependencies` prüfen; Zielpfade, tatsächliche Imports, CSS, Tokens und Assets vollständig erfassen.
4. Nur die benötigte Komponente übernehmen und lokale Anpassungen erhalten; Dokumentationsapp und deren Gesamtpaketliste bleiben ausserhalb des Einbaus.

Beispiel aus Teil B, hier ausschliesslich dokumentiert und nicht ausgeführt.

```sh
npx shadcn@latest add https://velora.colorlib.com/r/logo-cloud.json
```

- Amicro: vollständige Raw-GitHub-URL verwenden; Komponenten liegen unter `registry/ui`, Hooks unter `registry/hooks`, Helfer unter `registry/lib`.
- Tailark: aktive Domain `oss.tailark.com`, vorhandene numerische Slugs und passenden `@tailark-oss`-Namespace für Base UI oder Radix verwenden.
- 21st.dev und Pro-Registries können Authentifizierung verlangen; Zugang und Nutzungsrechte vor Auswahl klären, keine Zugangssperre umgehen.
- Jollys historische Registry ist kein bestätigter aktueller CLI-Weg; zusammengehörige Repo-Quellen samt Schema und Abhängigkeiten prüfen.
- FlyonUI nutzt npm plus HTML/CSS/JS; Tailgrids dokumentiert eine eigene CLI. Fehlende shadcn-URLs nicht aus Katalognamen erfinden.
- Watermelons Registry ist vom nicht verfügbaren CLI-Paket getrennt; ein vorhandenes CLI-Repo beweist keine npm-Veröffentlichung.
- Sera: doppelte Zielpfade vor Add auflösen und die konkrete Variante auswählen; leere `dependencies` belegen keine importfreie Datei.
- Tailwind im Build erzeugen, Preflight und Tokenquelle abstimmen; Preview-Scripts und Browsercompiler gehören nicht in die Kundenseite.
- Demo-Formulare an echte Verarbeitung mit Validierung und Fehlerzuständen anschliessen; `action="#"` oder ein Erfolgstext belegen keine Zustellung.
- Bilder, Logos, Schriften, Preise und Kundenstimmen haben eigene Herkunftsanforderungen; die Code-Lizenz belegt weder Asset-Rechte noch Inhalte.

## Grenzen und offene Unstimmigkeiten

Die Quellen sind eine Momentaufnahme vom 07.09.2026; aktuelle Versionen, Verfügbarkeit und Bedingungen vor dem konkreten Einbau erneut lesen.
Routenentscheidungen beruhen auf Quellen; SSR, Hydration, Barrierefreiheit und Produktionsgrössen bleiben für die konkrete Integration unverifiziert.

- **Routenlegenden:** Teil A fasst A weiter als B/C; die Tabelle erhält deshalb alle Originaldefinitionen. Eine gemeinsame wortgleiche Legende fehlt.
- **Feldformen:** Teil A strukturiert Routen/Lizenzen/Registry-Befunde als Objekte, B/C überwiegend als Text; `nr` ist die einzige Ergänzung im Korpus.
- **Identität:** lex ui bleibt offen; Skyper→Skiper, lui→UI-Layouts und coconut→Kokonut sind unbestätigte Zuordnungen, Ninja UI ist mehrdeutig.
- **Lizenznachweise:** Aceternity, Reverse, Skiper und NexUI haben offene Dateinachweise; bei 21st.dev fehlt der Originalnachweis je Community-Komponente.
- **Abweichende Lizenzangaben:** HeroUIs npm-Felder und Lizenzdateien widersprechen sich; mvpblocks-Blocks und CLI-Metadaten haben verschiedene Lizenzangaben.
- **Zusatzbedingungen:** React Bits, Animate UI, Float UI sowie Preline/FlyonUI erlauben keine pauschale Komponenten- oder Builder-Weitergabe.
- **Bezugswege:** Jolly ist live deaktiviert; Cult UI und Motion Primitives lieferten 429, Watermelons CLI E404, NexUIs API eine leere Komponentenliste.
- **Metadatenqualität:** Sera hat kollidierende Dateipfade; weitere Registries lassen Imports, CSS oder passende Primitive-Abhängigkeiten aus.

Beim Einbau nach [component-islands.md](component-islands.md) rohe HTML-Ausgabe, direkte Unterseitenaufrufe und nutzbare Links bei fehlgeschlagenem JavaScript prüfen.
Sofort nötige Interaktion erhält begründet `client:load`; `client:visible` eignet sich nur bei vertretbar später Aktivierung.
`client:only="react"` braucht einen belegten Browser-only-Grund und sichtbaren Fallback; wichtige Inhalte bleiben ausserhalb dieser Grenze.
Portale, Fokus, Escape, mobile Bedienung, Reduced Motion und tatsächliche JS-/CSS-Requests am Produktionsbuild testen.
Quelle/Version, Lizenz, Route, Provider-/Portalgrenze, Tokens, Fallback und gemessene Kosten im Komponentenabschnitt von `DESIGN.md` festhalten.

## Live-Stichprobe vom 07.09.2026 (Root-Session, `gh api` und `curl -sI`)

| Nr | Repo / URL | Befund |
|---|---|---|
| 42 | jessinsam/nexui | Repo existiert, `license: none` laut GitHub-API, 6 Sterne, letzter Push 2026-03-20; nexui.dev antwortet 200. Route E bleibt. |
| 41 | kokonut-labs/kokonutui | MIT, 2081 Sterne, Push 2026-08-20. Namenskorrektur coconut → Kokonut bleibt Vermutung. |
| 04 | baidu/cosui | Apache-2.0, 93 Sterne, San-Framework. Route E bleibt. |
| 43 | ninja/ui | Apache-2.0, 281 Sterne, letzter Push 2012; ninjaui.com nicht erreichbar (000). Route E bleibt. |
| 39 | MarsX-dev/floatui | GitHub meldet `NOASSERTION` (benutzerdefinierte Lizenz), 3591 Sterne; floatui.com 200. |
| 38 | htmlstreamofficial/preline | `NOASSERTION` (MIT plus Fair-Use-Anhang), 6411 Sterne, Push 2026-08-31; preline.co 200. |
| 31 | skiper-ui.com | 200; Repo weiterhin unverifiziert. |
| 01 | TheOrcDev/8bitcn-ui | MIT, 2021 Sterne, Push 2026-09-03. |

Die Korpus-Routen der Einträge 18–50 (33 Datensätze aus den Teilen B und C) wurden auf dieselbe Objektform wie in Teil A gebracht (`primary`, `also`); das ursprüngliche Kurzfeld steht in `normalized_from`. Weitere Codes in `also` gelten nur für die im Profil genannten Varianten.
