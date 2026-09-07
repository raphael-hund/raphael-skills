# Quellen auswählen und tatsächlich anwenden

Diese Referenz gilt, wenn der Auftrag neue Gestaltung, eine neue Komponente oder
ein neues Werkzeug braucht. [Raphaels Liste](zugangskarte.md#raphaels-quellen-vom-05092026)
ist der bevorzugte Quellenpool. Eine Kundenreferenz und vorhandene verbindliche
Gestaltung bleiben maßgeblich. Ein reiner Bestandsfix braucht keine neue Recherche.

Bei der Inspirationssuche zuerst [Raphaels Favoriten](muster-bibliothek/favoriten.md)
nach Seitentyp, Baustein und gewünschter Wirkung durchsuchen. Nur passende
Einträge und deren relevante Medien öffnen; eine begründete Auswahl ergänzt
den aktuellen Auftrag. Danach die externen Quellen für noch offene Fragen nutzen.

[GetLayers](https://www.getlayers.ai/) ist auf Raphaels Wunsch vom 05.09.2026
bei **jeder Inspirationsrunde** eine feste Quelle: ein passendes konkretes
Beispiel öffnen und ansehen, die übertragbare Eigenschaft im bestehenden
Ergebnis nennen. Zugang und Detailabruf stehen in der Zugangskarte. Fehlt ein
passender Treffer oder der Zugang, den Grund benennen und die Recherche fortsetzen.

## Vom Bedarf zum Einsatzort

1. Die offene Entscheidung benennen: etwa Hero-Komposition, Produktnavigation,
   Ladezustand, AI-Chat-Baustein oder Übergang. Nur dazu passende Quellen aus der
   Zugangskarte auswählen. Weitere Quellen erst für eine noch offene Frage.
2. Ein konkretes Werk, einen Flow, ein Rezept, einen Block oder ein Tooldetail
   öffnen. Galerien: `list/search → get`; Komponenten: `search → view/get`;
   lokaler Vendor: Index → konkrete Quelldatei. Die Homepage allein reicht nicht.
3. Die relevante Eigenschaft untersuchen: Gestaltung am tatsächlich gerenderten
   Bild/Browser, Bewegung am laufenden Beispiel, API/Abhängigkeiten im Originalcode
   beziehungsweise in offizieller Doku. Eine Login-/Checkpoint-Seite ist kein Fund.
   Bei Videos die [zeitliche Evidenz](video-evidence-contract.md) verwenden.
   Benennen, ob die Quelle **Komposition** (Hierarchie, Abschnittsfolge, Ebenen)
   oder eine **konkrete Komponente** liefert. „Premium“ in beobachtbare Merkmale
   übersetzen: welches Element reagiert auf welche Eingabe, was bleibt stehen,
   was ändert sich? Bewegungsdetails stehen in [motion-doktrin.md](motion-doktrin.md).
4. Bei einem Bauauftrag die Auswahl im bestehenden Projekt anwenden: gewählten
   Baustein kopieren/importieren, Export einbauen oder die benannte Layout-/Typo-
   Entscheidung in eigenen Code übertragen. Tokens, Text und Assets kommen aus
   dem Auftrag. Eine unbenutzte Vendor-Datei ist noch keine Integration.
   Ein „Copy prompt“ ist ein Hinweis auf das Originalrezept; Demo, tatsächlichen
   Code und Dependencies prüfen. Nicht identifizierte Komponenten bleiben
   unbekannt, auch wenn der Creator eine Bibliothek nennt.
5. Am tatsächlichen Einsatzort rendern und die betroffene Funktion prüfen.
   Für Bewegung Reduced Motion, für interaktive UI Tastatur/Fokus und für
   zusätzliche Runtime die passenden Projekt-/SSR-/Performancechecks nutzen.
   Nur die tatsächlich geprüfte Eigenschaft als bestanden melden.

Ein Inspirations- oder Planauftrag endet mit untersuchten Beispielen und
konkreten Entscheidungen; er autorisiert keinen zusätzlichen Build. Fehlt eine
passende Komponente, die wirklich geprüften Quellen und den konkreten Grund
nennen und den nötigen Baustein im Auftragsrahmen selbst bauen. Eine vorhandene
Nutzerreferenz wird nicht zugunsten einer fremden Demo umgestaltet.

Soll eine Marketing-Demo den Produktnutzen zeigen, eine verständliche Folge
**Eingabe → Verarbeitung → Ergebnis** aus dem eigenen Produkt ableiten, etwa
Diktat → bereinigter Text → Nachricht im Zielprogramm. Benennen, ob sie eine
Simulation, eine Aufnahme oder eine echte Integration ist. Eine inszenierte
Demo belegt keine funktionierende Übermittlung oder Produktfähigkeit.

## Kurzer Beleg im vorhandenen Projektort

Kein zusätzlicher Ledger und kein Pflichtformular. Im bestehenden Plan,
`art-direction.md` oder verlangten Ergebnis genügt pro verwendeter Quelle:

**Quelle/konkretes Item → übernommene Eigenschaft → Einsatzort → Prüfung.**

Beispiel: `Magic UI / marquee → horizontale Kundenlogo-Reihe →
components/CustomerLogos.tsx, importiert auf app/page.tsx → gerendert;
Bewegung pausiert bei Reduced Motion`. Erst nach den tatsächlichen Aktionen so
schreiben. Bei reiner Inspiration ersetzt die begründete Designentscheidung den
Einsatzpfad, mit dem ausdrücklichen Stand „untersucht, noch nicht eingebaut“.

`gefunden`, `Inhalt gelesen`, `visuell angesehen` und `im Projekt angewandt`
sind unterschiedliche Aussagen. Tool-Exit 0 und Dateihash belegen weder das
Ansehen eines Bildes noch die Verwendung in einer Website.

## Persönliche Favoriten

Bei „als Web-Inspiration speichern“, „das gefällt mir“ mit Speicherauftrag oder
einer ausdrücklich ausgewählten Referenzliste den Eintrag in
[muster-bibliothek/favoriten.md](muster-bibliothek/favoriten.md) anlegen oder
ergänzen. Bei X über die Post-ID deduplizieren, sonst über die Original-URL
beziehungsweise lokale Quelle. Raphaels spätere Korrektur aktualisiert den Eintrag.

Quelle/Autor, Speicherdatum, Suchbegriffe, kurze beobachtete Eigenschaften,
Medienpfad und Prüfstand reichen. Raphaels Begründung getrennt festhalten;
fehlt sie, „nicht angegeben“ schreiben. Verfügbare Originale mit Herkunft unter
`/root/eingang/ausgang/web-inspiration/<quellen-id>/` sichern, Rohinhalte erhalten
und den lesbaren Sammlungsindex dort aktualisieren. Bilder nur nach dem Ansehen
beschreiben, Bewegung nach dem Videovertrag. Bei Zugangslücke bleibt die Quelle
gespeichert und der betroffene Inhalt ausdrücklich ungeprüft.

Das Speichern braucht keine vollständige Website-Studie oder Screenshotserie.
Die Auswahl ist eine persönliche Präferenz; verbindliche Kundenvorgaben und
Rechte an fremden Assets gelten weiter. Eine Übernahme wird erst im jeweiligen
Projekt entschieden und nach dem bestehenden Quellenweg geprüft.

## Zugriffe für Astra und andere Hosts

Alle Scripts liegen unter `/root/raphael-skills/skills/eigene/web/scripts/`.
Astra verwendet denselben installierten Web-Skill. Der Root führt Shell-/
Browseraktionen selbst aus oder übernimmt sie für einen Leaf ohne diese Tools.
Native MCP-Namen nur verwenden, wenn sie in der Sitzung tatsächlich angeboten
werden. Die vorhandenen CLI-Clients bieten denselben Quellenzugang über Shell:

| Quelle/Typ | Konkreter Zugriff |
|---|---|
| Mobbin | `node /root/raphael-skills/skills/eigene/web/scripts/design-mcp.mjs mobbin screens "onboarding" --platform web --out /absoluter/projektpfad/referenzen/mobbin`; Flows/Sections nach `--help`; zurückgegebene Bilddateien ansehen |
| 21st.dev | `design-mcp.mjs 21st search "<Baustein>"` → `21st get <id> --out <absoluter-Ordner>`; Code, Dependencies und konkrete Lizenz lesen |
| Galerien/CSS/SVG | `inspiration.mjs <Schlüssel> list/search/get` nach der Zugangskarte; Ausgabe auf echte Detail-/Bild-/Codeinhalte prüfen |
| Registries | `komponenten.mjs search <Name-oder-@namespace> "<Baustein>"` → `view <@namespace/name>` → `get <@namespace/name> --out <absoluter-Ordner>` |
| Beautiful UI / Transitions.dev | `resources/components/INDEX.md` → jeweiliger Vendor-Index → benötigte Dateien/Dependencies; aktuelles Online-Beispiel bei neuer oder abweichender API |
| Weitere offizielle Quellen | `resource-access.mjs open "<Katalogname>" --url https://<offizielle-detailseite> --out /absoluter/pfad/quelle.txt`; alternativ vorhandener Firecrawl-/Browserzugriff |

`--url` bei `resource-access` bleibt auf dem Kataloghost. Offiziell verlinkte
GitHub-Repos oder CDNs über den passenden Fetch-/Registryweg lesen; keine
Paket-/Namespace-Identität aus einem Domainnamen erfinden. `open --out` speichert
lesbaren Inhalt, keinen Screenshot. Die CLI-Hilfe bestimmt die tatsächlichen Flags.

Ein erfolgreicher spezialisierter Zugriff ersetzt das allgemeine Homepage-
`open`; denselben Inhalt nicht nur für eine Checkliste erneut laden. Bei
Checkpoint/JavaScript-Shell den vorhandenen Browser oder Firecrawl versuchen.
Nach einem gezielten fehlgeschlagenen Infrastrukturretry bleibt dieser Zugang
`BLOCKED`; eine passende andere Quelle kann die unabhängige Arbeit fortsetzen.
Login bei Bedarf selbst über den vorhandenen Host-Flow starten, keine Secrets
in den Prompt. Ein früherer Loginvermerk belegt keine aktuelle Authentifizierung.

## Code und Bilder übernehmen

Eine Galerie liefert Inspiration, keine pauschale Lizenz für fremde Assets,
Copy oder komplette Layouts. Für Code die konkrete Original-Lizenz, benötigte
Dependencies und Frameworkversion lesen; „free“ oder ein Installbefehl reicht
nicht. Premium-Templates und Community-Registry-Items einzeln prüfen.

Bei Transitions.dev unterscheiden sich Rezepte und Tooling-Lizenz. Beautiful UI
und AI Elements haben andere Einsatzzwecke als Marketing-Effekte. Canvas UI ist
keine pauschale React-UI-Library. Die Zugangskarte nennt diese Unterschiede.
Kundenassets und freigegebene Copy ersetzen Demo-Inhalte; weder unnötige Pakete
noch eine komplette Bibliothek auf Vorrat in das Projekt übernehmen.
