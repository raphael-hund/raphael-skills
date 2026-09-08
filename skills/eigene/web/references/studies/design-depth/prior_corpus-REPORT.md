<!-- Private research origin: /root/skill-workspace/skill-updates/2026-09-07-web-design-depth/research/prior_corpus/REPORT.md; images/code remain outside the skill. -->

# Vorheriger Korpus, Taste und Unslop: belegte Integration und neue Übertragung

Stand: 7. September 2026. Dieses Teilpaket ist eine Quellen- und Bestandsprüfung. Es behauptet keine erneute visuelle Analyse der 34 X-Posts; diese muss durch die dafür zuständigen Teammitglieder belegt werden.

## 1. Was von der früheren Lieferung tatsächlich auffindbar ist

Die vom Nutzer eingefügte Aussage nennt 20 Subagents, 34 Posts, 69 Bilder, Videostandbilder, ein nicht erreichbares Bild, sechs öffentliche Refero-Vorschauen und eine Mobbin-Sperre. Diese Zahlen sind **übernommene Gesprächsbehauptungen, keine in dieser Prüfung bestätigte Abdeckung**.

Geprüfte dauerhafte Quellenräume: `/root/clients/make`, `/root/eingang/ausgang`, `/root/skill-workspace`, aktive und bereits gestagte Web-Skill-Dateien. Exakte Textsuche nach `2096175830624055596` und `2096944343487852961` in Markdown/JSON/CSV fand keine passende Quelle; für Ausgangsverzeichnisse wurden fremde `vendor`, `node_modules` und `upstream` ausgeschlossen. Eine zusätzliche Suche nach „69 Bilder“, „34 Posts“ und „MAKE Web Astra“ fand andere Web-Erweiterungspakete, keinen zu dieser Liste gehörenden Belegkorpus. Das ist eine begrenzte Negativsuche, kein Beweis, dass solche Dateien nie existierten.

Konkrete vorhandene Pakete sind etwa `/root/eingang/ausgang/web-erweiterung-2026-09-07/`, `/root/eingang/ausgang/web-weiterarbeit-2026-09-06/` und `/root/eingang/ausgang/web-image-modul-2026-09-06/`. Deren bloße Existenz bestätigt die zitierte neue X-Liste nicht.

Die aktive Datei `/root/.codex/skills/web/references/creator-methods.md` beschreibt **andere** Creator: LexnLin/Leon Lin, borjafat/Borja Obeso, EXM7777/Machina und shannholmberg/Shann Holmberg. Sie enthält echte Quellenpins und abgrenzende Zugangsangaben. Ihre Abschnitte zu Extraktion einzelner Assets, CSS statt flachem Website-Bild, Referenzordnern und Zustandsnachweisen sind wiederverwendbar; sie dürfen nicht als Abdeckung der jetzt genannten @1Aakib-, @zahragr8r- und weiteren Posts gezählt werden.

Die Nutzerliste enthält den Post `2096944343487852961` zweimal. Wiederholte URLs nur einmal als unabhängige Quelle zählen. Profile, einzelne Posts, Galerie-Einstiege und vollständige Profilarchive sind unterschiedliche Abdeckungsarten.

## 2. Aktiver und ausstehender Web-Skill

Read-only `diff -qr` ergab genau zwei Unterschiede zwischen `/root/.codex/skills/web` und `/root/skill-workspace/skill-updates/2026-09-07/web`:

| Datei | Aktiv | Bereits gestagt, unbedingt erhalten |
|---|---|---|
| `SKILL.md` | Version 2.0.0 | Version 2.0.3 und Changelog; dokumentarische Fotos im Originaldetail prüfen; Frontend- UND Backend-Revision an Review binden; Domain→Hosting-Projekt prüfen; Datenerhebung und Offenlegung gemeinsam liefern; Fortschritt an sichtbarer Produktqualität berichten; Rückverweise vor Umbauten prüfen; Headless/View-Transition-Diagnose |
| `references/motion-native.md` | Bestehende Motion-Regeln | Warnung vor synchronen Layout-Reads bei `content-visibility:auto`, Eintrag zu beobachtetem Long Task und TBT-Regressionsfall; Hinweis direkt beim Beispielcode |

**Merge-Hinweis:** Neue Ergänzungen auf dem vollständigen bestehenden Staging-Stand aufbauen, die übrigen identischen Dateien erhalten. Der gestagte Motion-Abschnitt vergibt `R16` doppelt. Die neue Regel braucht eine eigene stabile Kennung und der zugehörige Codeverweis dieselbe Kennung. Die Headless-Chromium-Aussage „nie“ ist ein aus einem konkreten Lauf verallgemeinerter Befund; sachgerechter wäre eine bekannte Laufzeitkonstellation plus Messprobe, keine ewige Browserbehauptung.

Keine Datei im aktiven Skill wurde hier verändert. Keine Installation und keine Änderung an PENDING.md.

## 3. Öffentliche Repositories und Provenienz

Abruf über die öffentliche GitHub-API: `commits/HEAD`, danach rekursiver Baum und Rohdateien am festen Commit. Vollständige JSON-Antworten und gelesene Dokumente liegen in `sources/` dieses Pakets.

| Quelle | Aktuell geprüfter Commit | Gelesene Teile | Lizenz |
|---|---|---|---|
| Leonxlnx/taste-skill | `ccbc15639c97057cbfcf32ecebc38ef716e4bb37` | `skills/taste-skill/SKILL.md`: gezielte Abschnitte zu Design-Read, Dials, Komponenten, States, responsivem Layout, Bildern, Anti-Defaults, Musterwortschatz und Bestandsschutz; Repositorybaum | MIT, Copyright 2026 Leonxlnx |
| mshumer/unslop | `edcb62386d129c65e4395f0cfcc9168eb1ba2148` | README, `skills/unslop/SKILL.md`, `profiles/react-design.md`, Repositorybaum | MIT, Copyright 2026 Matt Shumer |

Pins: [Taste-Skill](https://github.com/Leonxlnx/taste-skill/blob/ccbc15639c97057cbfcf32ecebc38ef716e4bb37/skills/taste-skill/SKILL.md), [Taste-Lizenz](https://github.com/Leonxlnx/taste-skill/blob/ccbc15639c97057cbfcf32ecebc38ef716e4bb37/LICENSE), [Unslop-Workflow](https://github.com/mshumer/unslop/blob/edcb62386d129c65e4395f0cfcc9168eb1ba2148/skills/unslop/SKILL.md), [Unslop-Profil](https://github.com/mshumer/unslop/blob/edcb62386d129c65e4395f0cfcc9168eb1ba2148/profiles/react-design.md), [Unslop-Lizenz](https://github.com/mshumer/unslop/blob/edcb62386d129c65e4395f0cfcc9168eb1ba2148/LICENSE).

Taste ist bereits exakt auf diesem Commit in `references/dependencies.md` integriert. Ein behauptetes neues Upstream-Update wäre falsch. Unslop kam in der gezielten Suche der aktiven/gestagten Web-Markdown-Dateien nicht vor. Das hier gelesene Repository ist ein empirischer Prüfablauf mit CLI, kein Komponentenbaukasten. Die CLI wurde nicht ausgeführt: Sie startet Claude Code für neue Stichproben, und dieser Auftrag autorisiert keinen impliziten Providerwechsel. Es wird kein lokal gemessener Unslop-Vorher/Nachher-Erfolg behauptet.

## 4. Was Unslop sinnvoll ergänzt

Die Methode untersucht wiederholte Modell-Defaults an einer Stichprobe gerenderter Ergebnisse, zählt konkrete Merkmale und erzeugt anschließend ein eng begrenztes Vermeidungsprofil. Das mitgelieferte Profil behauptet als Herkunft 20 generierte SaaS-HTML-Seiten samt Screenshots; die zugrunde liegenden 20 Bilder liegen nicht im hier geprüften Baum. Deshalb ist die Zahl Quellenangabe, keine von uns nachgezählte Stichprobe.

### Operationalisierbare Web-Regel

Bei Referenzlernen oder einer Serie eigener Entwürfe eine kleine Tabelle führen: **Merkmal → vorkommende Beispiel-IDs → n/N → funktionaler Zweck → Alternativen → Risiko**. Wiederholung ist zunächst ein Befund. Ein verbreitetes Muster wird erst dann zum Problem, wenn es ohne Bezug zu Inhalt, Nutzung oder Marke gewählt wird.

Beispiel: „zentrierte H1 + zwei CTA + Logozeile“ nicht pauschal verbieten. Prüfen, ob der Nutzer die zentrale Entscheidung versteht, ob zwei Aktionen wirklich verschieden sind, ob die Logos nachweisbar sind und ob Produkt/Service visuell verstanden wird. Bei einem editoriellen Statement kann die zentrale Typografie genau richtig sein; bei einem komplexen technischen Produkt kann ein erklärender Split sinnvoller sein.

Vorher/Nachher-Prüfung mit demselben Brief, Inhalt, Ziel und denselben Viewports. Geändert werden die diagnostizierten Defaults; Verbesserungen bei Orientierung, Lesbarkeit, Aktionsklarheit und Eigenständigkeit werden einzeln benannt. Neuheit allein ist kein Qualitätsmaß. Nicht nach jedem Auftrag einen neuen globalen Verbotskatalog erzeugen.

### Beobachtungsfelder aus Unslop

| Feld | Warnsignal | Bessere Entscheidung |
|---|---|---|
| Aufbau | Jede Seite folgt Hero→Zahlen→Features→Preise→Testimonials→CTA | Reihenfolge folgt realen Nutzerfragen und Entscheidungshemmnissen |
| Fläche | Große leere Höhen kaschieren wenig Inhalt | Proportionen vom Inhalt, Blickführung und Lesetakt ableiten; keine künstliche `min-height:100vh` |
| Licht/Material | Glow, Glas und Gradient kaschieren fehlendes Hauptmotiv | Licht nur mit räumlichem/markenbezogenem Zweck; Bild, Objekt oder Typografie trägt die Aussage |
| Komponenten | Drei Preiskarten, Mitteltarif-Badge und Standardtestimonial immer gleich | Vergleichsdimensionen, reale Tarifstruktur und Belegform bestimmen Komponente |
| Vertrauen | Zufallszahlen, Compliance-Logos, „Trusted by“ ohne Nachweis | Tatsächlichen Beleg an der Stelle zeigen, an der er eine konkrete Unsicherheit beantwortet |
| Code | `fixed`+`backdrop-filter`, Gradient-H1, Fade-up als reflexhafte Politur | Ein Verhalten braucht eine Nutzerfunktion, robuste Semantik und Zustandsnachweise |

## 5. Taste: sinnvolle Präzisierung statt pauschaler Übernahme

Bereits richtig im vorhandenen Adapter: Refero führt Referenzen/Designrichtung; Taste liefert gewählte Umsetzungstechniken. React/Next/Tailwind/Motion-Defaults werden nicht übernommen. Kontrastfehler der Quelle wird auf 24 CSS px oder ca. 18,67 CSS px fett für die große Textausnahme korrigiert; normale Texte 4,5:1. Vorgegebene Dial-Werte, Pflicht-Darkmode und erfundene Metriken gelten nicht.

Zusätzliche Präzisierungen für die Erweiterung:

1. **Zustände aus der Aufgabe ableiten.** Default, Hover, Focus-visible, Active, Disabled, Pending, Success, Error nur dort vollständig darstellen, wo die Funktion sie hat. Ein reiner Link braucht keinen erfundenen Ladezustand. Buttons behalten Breite bei Pending und einen lesbaren, zugänglichen Namen. Relevante Feldfehler stehen bei dem Feld; Meldungen erklären Reparatur und verlieren Eingaben nicht.
2. **Komponenten-Geometrie begründen.** Radiusfamilien aus Nesting und visueller Rolle ableiten; abweichende Werte brauchen einen Grund. Nicht jede Karte braucht Elevation: Whitespace, Linien oder Hintergrundflächen können Gruppierung leisten. Schattenfarbe aus der Fläche ableiten, ohne eine starre Ein-Schatten-Formel.
3. **Responsive Komposition statt 768-px-Dogma.** Jede Mehrspaltenstruktur hat eine explizite Anpassung, aber nicht zwingend eine einzige Spalte. Datenvergleich darf horizontales Scrollen oder priorisierte Spalten behalten; kleine Karten können zwei Spalten tragen. Den tatsächlichen Inhaltsbruch testen.
4. **Typografie und Bildwahl bleiben aufgabengebunden.** Keine Pflicht zu 2–3 Bildern, exakt zweizeiliger Hero-H1, maximal 20 Wörtern oder ausschließlich einer Fontfamilie in Betonungen. Solche Zahlen sind Vorschläge, keine evidenzbasierten universellen Regeln. Text und echte Controls bleiben HTML; Illustration, Fotografie, Textur können Raster sein; geometrische skalierbare Formen SVG/CSS.
5. **Kohärenz erlaubt Wiederholung.** Taste verbietet teils eine Layoutfamilie mehr als einmal je Seite. Stattdessen Wiederholung bei gleichen Daten/Aufgaben bewusst erhalten, Monotonie bei unterschiedlichen Erzählabschnitten prüfen. Tabellen, Suchergebnisse, Preiskriterien und Card-Gruppen gewinnen gerade durch Vergleichbarkeit.

## 6. Effekte in HTML/CSS übersetzen

Taste §10 liefert Namen, keine geprüfte Bibliothek. Für jede tatsächlich ausgewählte Bewegung erst Ausgangs-/Endzustand und Eingabemethode definieren.

| Effekt | Technisches Grundprinzip | UX-Grenze |
|---|---|---|
| Spotlight-Border | Pointerlokale Koordinaten steuern maskierten radialen Verlauf | Fokuszustand unabhängig vom Pointer sichtbar; statisch auf Touch |
| Tilt-Karte | `transform: perspective() rotateX() rotateY()` auf dekorativer Fläche | Keine schwer bedienbaren mitrotierenden Controls; Reduced Motion aus |
| Morphing Modal | Ursprung und Dialogzustand verbinden, anschließend echtes Dialogverhalten | Fokusverwaltung, Escape, Rückfokus, scrollbarer Inhalt; Formänderung ersetzt keine Semantik |
| Sticky-Stack | CSS `position:sticky`, definierte Stapelabstände und begrenzte Container | Lesbarkeit, ausreichend Scrollweg, kein verdeckter Inhalt auf Mobil |
| Bildmaske | `clip-path` oder SVG-Maske, Bild separat mit Focal-Point | Inhalte und Alt-Texte nicht in Clip/Bitmap verstecken |
| Horizontales Panning | Overflow oder übersetzter Track, klare Bewegungskopplung | Nativen Scroll bevorzugen; kein zwangsläufiger Scroll-Hijack, Tastatur- und Touchroute |

Diese Tabelle ist eine begründete technische Übertragung, kein Nachweis, dass die gelesenen Bilder genau diese Implementierung benutzen.

## Abnahme dieses Teilpakets

Quellenpins per GitHub-Antwort und gespeicherte Dateien nachprüfbar. MIT-Lizenzen lokal gespeichert. Aktiver/stagter Unterschied semantisch gelesen; keine Live-Edits. Neue Anti-Default-Regeln unterscheiden belegte Quelle, vorhandene Integration und eigene Übertragung. Kein Beobachtungseintrag angelegt: Die Ergebnisse gehören direkt in die ausdrücklich beauftragte Quellenanalyse; globale Beobachtungen bleiben beim Leader.

### Ergänzende Sitzungssuche

Der geladene `coding-agent-sessions`-Finder wurde zusätzlich plattformübergreifend für die letzten sieben Tage mit den drei Suchspuren `2096175830624055596`, `69 Bilder` und `mshumer/unslop` inklusive Subagents ausgeführt. Die passenden Treffer waren die aktuelle Auftragssitzung und deren Titelgenerierung; ein weiterer Zahlentreffer gehörte zu einem anderen Auftrag. Die rohe Titelgenerierung enthielt nur einen Threadtitel, keinen Recherchebericht. Auch diese Suche lieferte keinen früheren Belegkorpus. Suchzeitraum und normalisierte Treffer sind begrenzt; daraus folgt weiterhin nur „nicht wiedergefunden“, nicht „nie durchgeführt“.
