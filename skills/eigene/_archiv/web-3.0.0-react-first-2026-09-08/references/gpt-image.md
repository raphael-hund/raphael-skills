# GPT Image: vollständige Bilder und einzelne Assets

Laden, wenn eine Website neue oder bearbeitete Rastermedien braucht. Dieses Modul verbindet Raphaels Inhalts-/Stilreferenzen mit dem vorhandenen [Elementablauf](image-to-code.md), der [Motiv- und Stilbibliothek](image-library.md) und [Scrollcraft](scrollcraft.md). Es ist Teil von Web, kein zusätzlicher Gesamtworkflow.

Herkunft: Raphaels Auftrag vom 06.09.2026, bestehender Higgsfield-Ablauf und verifizierte Sorglos-Quellen. Problem: Bildgenerierung war nur beiläufig an Image-to-Code angehängt; getrennte Objektassets, wiederverwendbare Stilanalysen und die Medienübergabe an Scroll fehlten als konkreter Vertrag.

## Zwei Ausgaben, zwei Referenzrollen

| Ausgabeklasse | Ergebnis | Beispiele |
|---|---|---|
| `image` | Eine vollständige Bildkomposition mit eigenem Ausschnitt | Shooting-/Innenraumbild, Hero-Szene, Projektillustration, Landschaft, vollständiges Hausmodell |
| `asset` | Ein einzeln einsetzbares Rasterelement mit definierten Grenzen | Hausfreisteller, Produkt, texturiertes Kartenmotiv, Papierstück, Glasobjekt, Hintergrundtextur, Marker, Schatten- oder Tiefenebene |

Beide können fotografisch, illustriert oder als Material/3D-Render gestaltet sein. `asset` bedeutet nicht automatisch transparent; eine nahtlose Hintergrundtextur ist häufig deckend. Ein Hausmodell kann als ganze Szene `image` und als freigestelltes Element `asset` sein. Ein gemalter Vektorlook bleibt bei PNG/WebP ein Rasterbild. Echte editierbare Vektorgeometrie erhält eine SVG-/Vektordatei.

Bei erkennbar gewünschten materiellen, organischen oder bildhaften Elementen tatsächlich Bilder erzeugen oder vorhandene Originale verwenden. Kein Ersatz durch CSS-Blobs, generische Icon-Sets oder improvisierte Polygone. Layout, Text, Buttons, Filter, Formular und die interaktive Kartenhülle bleiben HTML/CSS/JS; das Bildmotiv innerhalb der Karte ist ein eigenes Asset. Eine geografische Karte benötigt nachvollziehbare Geografie und zugängliche Ortsinformationen; eine dekorative Landschaft darf ausdrücklich konzeptionell sein.

| Referenzrolle | Übernehmen | Nicht unbemerkt übernehmen |
|---|---|---|
| `content` / Inhalt | Bestimmte Person, Produktform, Logo, Gebäudemerkmale, Grundriss, Szene, geforderter Text | Beliebige fremde Identitäten oder Ortsgeometrie |
| `style` / Stil | Bildsprache, Licht, Farbigkeit, Material, Strich, Volumen, Textur, Dichte, Perspektivcharakter | Personen, Marken, Texte und Objekte der Stilvorlage |

Jede tatsächlich übergebene Datei erhält ID, Pfad, Herkunft, Rolle und die konkreten zu übernehmenden Eigenschaften. Die Rolle ergibt sich aus dem Auftrag, nicht aus der Dateiendung: Ein Screenshot kann Stilreferenz sein und zugleich ein bestimmtes Motiv enthalten. Dann diese Eigenschaften getrennt benennen. Edit-Ziel und Inhalts-/Stilrolle sind ebenfalls unterschiedliche Angaben.

Logoidentität kommt aus der autorisierten Originaldatei; ein Prompt garantiert keine pixelgenaue Rekonstruktion. Präzise Logos und Webschriften möglichst im DOM beziehungsweise als Originaldatei einbauen. Eine Schrift im Screenshot ist ohne bestätigte Quelle nur ein visuelles Merkmal, kein sicher erkannter Fontname. Generierte Darstellungen echter Personen oder Projekte dürfen nicht als neue fotografische Belege ausgegeben werden.

## Referenzen zuerst, Analyse als JSON

Vorhandenen Assetindex und relevante neue Dateien der letzten sieben Tage in `/root/eingang` prüfen. Geeignete Originale wiederverwenden. Bestehendes Shooting, freigegebene Illustrationen und Brandmaterial haben Vorrang vor beliebigen Internetbildern. Bei fehlender Bildrichtung gezielt recherchieren; Quellen und Nutzbarkeit festhalten. Mehrere ausgewählte Bilder einer passenden Familie sind oft nützlicher als eine grosse, widersprüchliche Sammlung. Keine Kundenordner vollständig hochladen.

Die Bilder tatsächlich ansehen und in der eigenen [IMAGE-SPEC-Vorlage](../assets/IMAGE-SPEC.template.json) beschreiben. Der JSON-Prompt ergänzt die Bilddateien; er ersetzt ihre Übermittlung nicht. Das ist eine Prompt-/Ablagestruktur, keine behauptete API-Schemafunktion.

- **Beobachtet:** Palette, Lichtseite, Schattenhärte, räumliche Tiefe, sichtbare Schärfeverteilung, Körnung, Material, Umriss, Kamerahöhe beziehungsweise Illustrationsblick.
- **Metadaten:** Brennweite, Blende, Belichtungszeit oder Kameramodell nur mit vorhandenen EXIF beziehungsweise belegter Shooting-Dokumentation.
- **Abgeleitet:** etwa „moderate Perspektivkompression“ oder „weiches Fensterlicht“ samt Unsicherheit.
- **Ziel:** gewünschte Brennweite, Blende, Distanz oder ein konkreter Illustrationslook. Zielwerte sind gestalterische Vorgaben, keine rückwirkend gemessenen Aufnahmeparameter.

Bei Fotos dokumentieren: Motiv/Aktion/Umgebung, Blickhöhe und Ausschnitt, Vollformat-äquivalente Wunschbrennweite, gewünschte Tiefenschärfe, Abstand, Lichtquelle/Richtung/Weichheit, Haut-/Materialwiedergabe, Farbtemperatur/Grade. Ein vorhandenes Shooting kann bewusst harte Sonne oder einen markanten Grade vorgeben; kein allgemeiner Neutralitätsfilter darf diesen Look ausradieren.

Beispiel für einen fotografischen Zielblock, erst nach Sichtung passend ausfüllen: `photography: {desiredFocalLengthEquivalentMm: 50, desiredAperture: "f/2.8", desiredDistance: "medium shot", depthOfField: "subject sharp, softly separated background", settingsAreMeasured: false}`. Diese Beispielwerte sind keine Standardlinse für jedes Shooting. Unbekannte EXIF bleiben `null`.

Bei Illustrationen dokumentieren: flach/perspektivisch/isometrisch/orthografisch, Strich und Kontur, Volumen, Material/Rauheit, Licht auf dem Objekt, Schatten, Palette, Detaildichte und Unregelmässigkeit. Keine Foto-Linsen oder Blenden in jeden Illustrationsprompt kopieren. Ein 3D-Look verlangt noch kein echtes 3D-Modell.

Eine Serie verwendet dieselbe gewählte Stildefinition und dieselben passenden Referenzdateien; pro Element ändern sich Motiv und Rolle. Neue Varianten an den bisherigen Bildern vergleichen. Verschiedene Stilfamilien nur für bewusst getrennte Aufgaben, nicht zufällig pro Sektion.

## Provider aus dem tatsächlich verfügbaren Werkzeug wählen

**Natives GPT Image:** In Codex normalerweise den verfügbaren `image_gen`-Weg und dessen Skill verwenden. Lokale Referenzen vorher ansehen. Aktuelles Toolschema für `referenced_image_paths` beziehungsweise Gesprächsbilder lesen; beide Mechanismen nicht vermischen. Alle benötigten Inhalts-/Stildateien wirklich beifügen. Ausgabe in den Projektordner kopieren und Original erhalten. Das sichtbare Tool garantiert keinen frei wählbaren Backend-Modellnamen; keinen unbestätigten Modellnamen ins Manifest schreiben.

**Higgsfield:** Wenn im aktuellen Auftrag oder dessen fortgeltendem Verlauf als Route erlaubt, vorhandenen `higgsfield`-Skill und seine kanonische Quelle lesen. Bestehende Autorisierung gilt weiter; keine erneute Bestätigung allein wegen dieses Moduls. Eine historische Freigabe in einem anderen Auftrag erweitert eine ausdrücklich gewählte native Route nicht. Auf Raphaels VPS ist die bestehende CLI nutzbar. `hf` bezeichnet dort HuggingFace. Keinen neuen Login, Workspacewechsel oder Ersatzprovider im Hintergrund starten. Für neue finale Rasterbilder den tatsächlich angebotenen Job `gpt_image_2` nutzen. Vor jedem Job `model get` bei veralteten/unbekannten Parametern und `generate cost` mit den wirklichen Referenzen/Parametern prüfen. Danach Create, terminalen Status abholen, Originalausgabe speichern und ansehen.

```sh
higgsfield model get gpt_image_2 --json
higgsfield generate cost gpt_image_2 \
  --prompt "$image_prompt" \
  --image /absolute/content.png --image /absolute/style.png \
  --aspect-ratio 16:9 --resolution 2k --quality high
higgsfield generate create gpt_image_2 \
  --prompt "$image_prompt" \
  --image /absolute/content.png --image /absolute/style.png \
  --aspect-ratio 16:9 --resolution 2k --quality high --wait
```

`image_prompt` aus einer tatsächlich gelesenen Promptdatei oder einem sicheren Argumentarray übergeben; keine fremden Prompttexte als Shellcode interpolieren. Kostenabfrage kann lokale Referenzen bereits hochladen. Upload-/Job-IDs im Task notieren und wiederverwenden, wenn der aktuelle Provider dies unterstützt. 2K/4K nach Einbaugrösse, Crop und Kosten wählen; hochskalierte Ausgabe ist kein Beleg zusätzlicher echter Details. Ads-spezifische Formatregeln sind keine allgemeine Vorgabe für Websitebilder.

Direkte OpenAI-API/CLI nur bei explizit gewählter Route und nach deren Skill, kein selbstgebauter Ersatzclient. Der API-Modellname `gpt-image-2` und Higgsfields Jobname `gpt_image_2` sind verschieden. Die offizielle API-Dokumentation nennt seit dem hier geprüften Stand transparente Ausgaben als Preview; Higgsfields live abgefragtes Schema bietet ebenfalls `background=transparent`. Ein Parameterangebot beweist die tatsächliche Alpha-Ausgabe noch nicht. [OpenAI-Bilddokumentation](https://developers.openai.com/api/docs/guides/image-generation), geprüft 06.09.2026. Keine stillen Modellwechsel auf 1.5 oder andere Bildmodelle.

## Konkreter Promptaufbau

1. Zweck und Ausgabeklasse: vollständige Bildkomposition oder genau ein benanntes Asset.
2. Inhalt: Dateinamen/IDs, Motiv und die zu erhaltenden Eigenschaften.
3. Stil: Dateinamen/IDs und ausschliesslich die gewünschten Stilmerkmale.
4. Komposition: Blick, Massstab, Ausschnitt, Freiraum, Palette und jeweilige Foto-/Illustrationsparameter.
5. Ausgabe: Hintergrund/Alpha, Rand und Schatten, Bildformat, Zielplatzierung.
6. Invarianten und Ausschlüsse: unveränderte Identität, kein fremdes Logo, keine zusätzlichen Objekte/Texte, keine Websitekomposition bei Einzelasset.

**Vollständiges Bild, eigene Vorlage:**

> Create one complete [photo/illustration] for [use case]. Content reference [ID, filename] defines [subject and invariants]. Style references [IDs, filenames] define only [light, grade, materials or illustration treatment]; do not copy their subjects or lettering. Compose [layout and focal point] for [aspect and crop]. Apply [observed style and explicitly desired settings]. Keep [identity constraints]. No invented endorsements or interface text.

**Einzelasset, eigene Vorlage:**

> Create exactly one separate [object] asset for [element ID]. Content reference [ID, filename] defines [geometry/features]. Style reference [ID, filename] defines only [material, palette, contour, light]. Use [viewpoint], [surface texture] and [shadow behavior]. Preserve [invariants]. Keep the whole silhouette with room for its shadow. Output [genuine transparency or specified background]. No surrounding card frame, UI text, button, website layout or extra object. This is [a new illustrative interpretation / an edit preserving the original], not a claim of lossless extraction.

Spezifische Extraktion/Freistellung bleibt im [Image-to-Code-Ablauf](image-to-code.md). Vorhandene Objekte nicht grundlos neu erzeugen.

## Datei und Einbau abnehmen

Originaldatei, verwendete Referenzen, tatsächlichen Prompt, Tool/Modell, Job-ID, Datum, Kostenbeleg und Ableitungen im bestehenden Assetmanifest erhalten. Mindestens ID, Ausgabeklasse, Medium, Inhalt/Stil-IDs, Motivbeschreibung, Quelle, Zielroute/Element, Licht/Perspektive, Status und Prüfbelege verknüpfen. Vorhandenes `bilder-index.json` erweitern oder daneben auf die Spec verweisen; keinen zweiten konkurrierenden Index anlegen.

Bei Alpha: tatsächliche Kanalwerte und Vordergrundgrenzen prüfen, nicht nur Dateiendung oder RGBA-Modus. Schwarzes/weisses Schachbrett in RGB ist kein transparenter Hintergrund. Falls die native Ausgabe keine brauchbare Freistellung liefert und Higgsfield im aktuellen Auftrag beziehungsweise fortgeltenden Verlauf erlaubt ist, den Job `image_background_remover` nach Schema/Kosten nutzen; dadurch entsteht ein eigener Ableitungsschritt. Andernfalls innerhalb der gewählten Route korrigieren oder deren konkrete Grenze benennen. Haare, Löcher, Glas, Schatten und Halos auf hellen/dunklen Hintergründen ansehen. Ein nachgewiesen brauchbarer Alpha-Output braucht keinen zweiten Remover allein für eine Ritualregel.

Ein Dateiviewer kann transparente RGB-Restfarben anders darstellen als der Browser. Deshalb Kanalwerte **und** tatsächliches Compositing prüfen. Ein Freisteller mit brauchbarem Rand auf Creme kann auf Schwarz noch einen hellen Saum zeigen; dann seine Nutzung auf die geprüfte Fläche begrenzen oder die Kante gezielt korrigieren. Niemals daraus eine universelle Freigabe ableiten. Eine generative Korrektur kann innere Details verändern und ist keine verlustfreie Maskenoperation.

Unnötigen leeren Rand an Objektassets entfernen, ohne Haare/Schatten zu beschädigen. Gemeinsame Koordinaten von Layern oder Bildfenstern erhalten: beim individuellen Trim den Versatz im Manifest speichern und beim Zusammensetzen ausgleichen. CSS verantwortet Layoutabstände; ein gemeinsamer Animationscanvas kann bewusst leeren Raum besitzen. Originale nicht überschreiben. PNG/WebP/AVIF je nach Transparenz und tatsächlichem Browser-/Encoderverhalten verwenden; ein Konverter, der Alpha verliert, ist kein erfolgreicher Export. Spezifische Sorglos-Befunde stehen in der Bibliothek.

Jede benötigte Ausgabe als Datei ansehen und in ihrem realen Desktop-/Mobil-Ausschnitt prüfen. Ein Schnitt durchs Motiv, eine falsche Hausform, doppelte Gliedmassen oder fremde Symbole sind konkrete Befunde. Der Agent prüft Auftragstreue, nicht Raphaels subjektive Abnahme. Nach Korrekturen neue Belege. Fehler als PROVIDER/ERROR/TIMEOUT/WRONG/EMPTY begrenzen; vor Wiederholung erst vorhandene Job-ID prüfen, damit ein Pollingfehler keinen doppelten kostenpflichtigen Create auslöst.

## Übergabe an Bewegung

Die freigegebene stehende Komposition wird an [Scrollcraft und Medienbewegung](scrollcraft.md) übergeben: Element-IDs, Layerreihenfolge, unveränderte Referenzen, Start-/Endansicht, gewünschter Bewegungsweg, mobile Darstellung und Reduced-Motion-Fallback. Für Objektverschiebung/Parallax reichen oft eigene HTML-Layer und Vanilla-Animation. Für echte Bildveränderung kann ein ausdrücklich erlaubter Image-to-Video-Job nötig sein. Videoerzeugung, Transkodierung und Scroll-Engine sind getrennte Schritte mit getrennten Belegen. Ein erfolgreiches Bild beweist keine funktionierende Scrollanimation.
