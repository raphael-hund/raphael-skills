# Bildsuche für MAKE Web Astra

Laden, sobald eine Website vorhandene Logos, Icons, Produktbilder, Ortsbilder oder fotografische Inhaltsreferenzen braucht. Dieses Modul ergänzt [GPT Image](gpt-image.md) und den [Higgsfield-Skill](/root/raphael-skills/skills/eigene/higgsfield/SKILL.md). Recherche und Live-Tests stammen vom 07.09.2026.

## Arbeitsregel

**Logos und Icons als Originaldateien suchen, direkt übernehmen und ohne Copyright-Rückfrage in die Website einbauen.** Diese Regel hat für Logos, Icons und bekannte Produktdarstellungen Vorrang vor der allgemeinen Rechteprüfung in [image-to-code.md](image-to-code.md); gefundene Fotos fremder Herkunft gehen entweder als Inhaltsreferenz an GPT Image oder werden mit Quelle im Manifest direkt genutzt, ebenfalls ohne Rückfrage. Vorhandenes Kundenmaterial und offizielle Brand-Kits haben Vorrang. Dokumentiere Quelle und Abrufdatum, übernimm vorhandene Lizenzhinweise als Quellenmetadaten und erledige angegebene Attribution beim Einbau. Eine allgemeine Rechteprüfung oder Freigabefrage gehört nicht in diesen Ablauf.

Fotos kannst du direkt verwenden oder als **Inhaltsreferenz** an GPT Image übergeben. Erzeuge bei der zweiten Variante eine neue Komposition mit anderer Perspektive und einem zum Websiteauftritt passenden Look. Ändere dabei Kamera, Ausschnitt, Licht und räumliche Anordnung gezielt. Die gefundene Datei muss beim Bildjob tatsächlich beiliegen.

Eine geänderte Perspektive begründet keine pauschale Aussage über Nutzungsrechte. Das Manifest hält Herkunft und Ableitungen fest. Vermeide selbst vergebene Rechtsurteile wie `copyright_safe` oder `approved`. Wasserzeichenbilder scheiden als Websiteassets und Generierungsreferenzen aus; suche eine saubere Quelle. Erfinde aus einem gefundenen Firmenlogo keine Kundenbeziehung, Partnerschaft, Bewertung oder Zertifizierung.

## Wann suchen statt generieren

| Bedarf | Vorgehen |
|---|---|
| Google-, Stripe-, Zahlungsanbieter-, Kunden- und Partnerlogo | Original-SVG oder Brand-Kit suchen. Identität, Farben und Proportionen erhalten. Logos nie generativ nachzeichnen. |
| Telefon-, Standort-, Menü- und andere UI-Icons | Iconify verwenden und innerhalb einer Iconfamilie bleiben. |
| Bekanntes Produkt oder konkrete Verpackung | Herstellerbild beziehungsweise vorhandene Produktaufnahme suchen. Form und Beschriftung am Original prüfen. |
| Karten, Orte, Gebäude und Sehenswürdigkeiten | Reale Quelle suchen. Geografie und Gebäudeidentität erhalten; eine generierte Karte eignet sich nur für ausdrücklich dekorative Zwecke. |
| Handwerk, Material, Arbeitsablauf oder Referenzmotiv | Fotos suchen und ansehen. Direkt einbauen oder Inhaltsreferenz für eine eigene Bildkomposition auswählen. |
| Eigene Illustration, neue Szene, fehlendes passendes Foto | Zum GPT-Image-Modul wechseln; vorhandene Inhalts- und Stilreferenzen getrennt übergeben. |

## CLI und Quellenreihenfolge

Das Skript benötigt Node 22 und dessen Standardbibliothek. Es installiert nichts, lädt keine `.env`-Dateien und benötigt für den Standardablauf keine Keys.

```bash
SCRIPT="<skill-dir>/scripts/find-images.mjs"

node "$SCRIPT" logo google --max 1
node "$SCRIPT" logo stripe --download "$PROJECT/assets/sources/stripe" --max 1
node "$SCRIPT" icon phone --download "$PROJECT/assets/sources/phone" --max 3
node "$SCRIPT" photo "dachdecker bei der arbeit" --download "$PROJECT/assets/sources/dachdecker" --max 3
node "$SCRIPT" search "Zürich Altstadt Limmat" --max 8
```

Setze `PROJECT` auf den absoluten Website-Projektpfad. Bei Übernahme in den Website-Skill liegt das Skript unter `scripts/find-images.mjs`; passe `SCRIPT` an dessen Installationspfad an.

- `logo`: Simple Icons → SVGL → Logo.dev bei Key → Brandfetch Brand API bei Key → Wikimedia Commons → DuckDuckGo-Bilder.
- `icon`: Iconify.
- `photo`: DuckDuckGo-Bilder → Unsplash bei Key → Pexels bei Key → Wikimedia Commons.
- `search`: DuckDuckGo-Bilder → Serper bei Key → SerpAPI bei Key → Google Custom Search bei vorhandenem Key und CX → Wikimedia Commons.

Die Automatik stoppt beim ersten Anbieter mit Treffern. `--max N` begrenzt die Ausgabe beziehungsweise die Anzahl erfolgreicher Downloads. Erlaubt sind 1 bis 50; Standard ist 5. Ein einzelnes Logo bleibt auch bei `--max 5` ein Treffer. Die Suche sammelt je nach Höchstzahl bis zu 100 Kandidaten aus einer Antwort; sie blättert nicht durch weitere Ergebnisseiten.

Fehlgeschlagene Downloads überspringt das Skript und versucht weitere Kandidaten derselben Antwort. Scheitern sämtliche Downloads eines Anbieters, folgt in der Automatik der nächste Anbieter. Bei teilweise erfolgreichem Download endet der Lauf mit den gespeicherten Dateien. Unter `runs[].errors` steht, weshalb weitere Dateien fehlten.

### Anbieter gezielt wählen

```bash
# Multicolour symbol and wordmark instead of the monochrome Simple Icons variant.
node "$SCRIPT" logo google --provider svgl --download "$PROJECT/assets/sources/google" --max 2

# Use a coherent icon family by including its name in the query.
node "$SCRIPT" icon "lucide phone" --provider iconify --max 5

# Alternative photo sources when credentials are already present.
node "$SCRIPT" photo "roofer working on a roof" --provider pexels --max 5
node "$SCRIPT" photo "roofer working on a roof" --provider unsplash --max 5

# Commons provides source pages and structured attribution metadata.
node "$SCRIPT" search "Zurich Limmat" --provider wikimedia --max 5
```

`--provider` unterstützt `simpleicons`, `svgl`, `logodev`, `brandfetch`, `wikimedia`, `duckduckgo`, `iconify`, `unsplash`, `pexels`, `serper`, `serpapi` und `google`. Bei expliziter Anbieterwahl gibt es keinen Anbieterwechsel. Ein fehlender Key führt zu einer Diagnose auf stderr.

Simple Icons liefert häufig einfarbige Markensymbole. Das getestete Google-SVG ist ein blaues G mit einer ViewBox von 24 × 24. Für Googles mehrfarbiges G oder den Schriftzug gezielt SVGL wählen. Die Reihenfolge der Treffer belegt keine Aktualität: Commons lieferte unter anderem Googles Logo von 2013. Prüfe deshalb die gewünschte Markenfassung am Bild.

### Vorhandene Schlüssel

Der ausgeführte Aufruf `env | grep -i "serp\|google\|bing\|unsplash\|pexels\|brandfetch"` lieferte hier keine Treffer. Auch Logo.dev-Schlüssel waren nicht gesetzt. Der Beleg speichert nur Variablennamen in [environment.json](../assets/image-search-evidence/environment.json).

| Anbieter | Unterstützte Umgebungsvariablen |
|---|---|
| Logo.dev | `LOGO_DEV_TOKEN`, `LOGODEV_TOKEN` oder `LOGO_DEV_PUBLISHABLE_KEY` |
| Brandfetch Brand API | `BRANDFETCH_API_KEY`; bei dieser Route eine bekannte Firmendomain übergeben |
| Brandfetch Logo CDN | `BRANDFETCH_CLIENT_ID` erkannt, aber als Browser-CDN vom CLI-Download ausgeschlossen |
| Unsplash | `UNSPLASH_ACCESS_KEY` oder `UNSPLASH_API_KEY` |
| Pexels | `PEXELS_API_KEY` |
| Serper | `SERPER_API_KEY` |
| SerpAPI | `SERPAPI_API_KEY` oder `SERPAPI_KEY` |
| Google Custom Search | `GOOGLE_CSE_API_KEY` oder `GOOGLE_API_KEY`, zusätzlich `GOOGLE_CSE_ID`, `GOOGLE_CX` oder `GOOGLE_SEARCH_CX` |

Authentisierte API-Zweige sind mit Testantworten geprüft. Mangels Keys liegt dafür kein erfolgreicher Live-Nachweis vor. Vorhandene Keys können Anbietergebühren auslösen; das CLI zeigt keinen Kontostand an und richtet keine Konten ein. Tokens erscheinen in Ausgabe und Manifest als `[REDACTED]`. Für einen erneuten Abruf derselben geschützten Quelle den CLI-Aufruf mit dem Key aus der Umgebung wiederholen.

## Vom Suchtreffer zum eingebauten Bild

1. **Suchen.** Assetindex und Kundenmaterial prüfen. Danach Marke, Produktbezeichnung, Ort oder konkrete Handlung suchen. Bei schwachen Fototreffern Deutsch und Englisch versuchen, etwa `Dachdecker Ziegel verlegen` und `roofer laying roof tiles`.
2. **Auswählen.** Trefferdateien ansehen und die Quellseite öffnen. Original gegenüber Thumbnail bevorzugen. Identität, Fassung, Bildinhalt und sichtbare Wasserzeichen prüfen. Eine Suchmaschine liefert auch veraltete Logos und Stockvorschauen.
3. **Laden.** `--download DIR --max N` verwenden. Das CLI legt in `DIR` Originaldateien unter ihrem SHA-256-Namen und ein `manifest.json` ab. Bei mehreren Kandidaten kann die Auswahl nach dem Download erfolgen; unverwendete Dateien bleiben Quellenmaterial.
4. **Format und Grösse prüfen.** Das CLI erkennt PNG, JPEG, GIF, WebP, AVIF und ICO anhand der Signatur und liest die Headermasse. SVG besitzt keine binären Magic Bytes; hier prüft das CLI SVG-Wurzel, Grössenangaben und aktive Inhalte. Unbekannte Grössen bleiben `null`. Öffne die Datei zusätzlich im Bildviewer beziehungsweise Browser, denn eine Headerprüfung ersetzt keinen vollständigen Bilddecoder.
5. **SVG bevorzugen.** Bei Logos und UI-Icons die passende SVG-Fassung nehmen. Fremde SVGs zunächst als externe Datei per `<img>` einbauen. Vor einem Inline-Einbau einen vorhandenen SVG-Sanitizer einsetzen und das Ergebnis prüfen. Der CLI-Filter ersetzt keinen vollständigen XML-Sanitizer.
6. **Optimieren.** Original erhalten und Ableitung separat speichern. Vorhandene SVGO-Werkzeuge für SVG nutzen; ViewBox, Markenfarben und feine Konturen erhalten. Fotos nach Einbaugrösse und mobilem Crop als WebP oder AVIF exportieren. Alpha und Bildinhalt nach jedem Export erneut ansehen. Keine neue Werkzeuginstallation allein für diesen Schritt starten.
7. **Einbauen.** Feste `width`/`height`, sinnvollen Alternativtext und passende CSS-Grösse setzen. Dekorative Icons erhalten `alt=""`; der Button trägt seinen zugänglichen Namen. Logos bekommen etwa `alt="Google"`, Fotos eine Beschreibung der sichtbaren Handlung. Hero-Bilder sofort laden; Bilder unterhalb des ersten Bildschirms können `loading="lazy"` erhalten.
8. **Im Layout abnehmen.** Desktop und Mobilansicht prüfen. Bei einem 160 CSS-Pixel breiten Rasterlogo sind mindestens 320 echte Bildpixel eine brauchbare Zielgrösse für 2×-Displays. Hochskalieren ersetzt keine fehlenden Details. Kontrolliere Freiraum, Seitenverhältnis und Kontrast auf dem tatsächlichen Hintergrund.

### Manifest-Pflicht

Speichere mindestens `url`, `source`, `page`, `fetched_at`, `sha256`, `mime`, `bytes`, `width`, `height` und `file`. `license_hint` übernimmt Angaben der Quelle oder vermerkt, dass der Suchdienst keine geliefert hat. `attribution` und `attribution_required` erscheinen, soweit der Anbieter diese Angaben liefert.

Das erzeugte Manifest enthält `schema_version: 1`, `assets` und `runs`. Ein erneuter Lauf ergänzt die Historie und erhält vorhandene Assets. Die Dateien sind inhaltsadressiert; gleiche Bytes erzeugen denselben Dateinamen. Fehler bleiben im jeweiligen Suchlauf erhalten. Das Skript schreibt das Manifest atomar und sperrt parallele Schreibzugriffe auf denselben Downloadordner über `.image-search.lock`; bleibt die Datei nach einem Abbruch liegen, meldet der nächste Lauf `EEXIST`, und die Sperrdatei wird von Hand gelöscht. Ein fremdes, beschädigtes oder symbolisch verlinktes Manifest überschreibt es nicht.

Der bestehende Website-Assetindex bleibt der Einbauindex. Verknüpfe darin Quelldatei und Downloadmanifest; ergänze die verwendete Ableitung, den Alternativtext und die Zielsektion. So bleiben Suchbelege und eingebautes Asset verbunden. Bei GPT Image zusätzlich Inhalts-/Stilreferenz-IDs, tatsächlichen Prompt, Tool, gegebenenfalls Modell und Job-ID sowie Generierungsdatum speichern. Trage Kosten nur mit einem Kostenbeleg ein.

### Technische Grenzen und Quellenbesonderheiten

- stdout enthält eine JSON-Liste mit `url`, `width`, `height`, `source`, `page`, `license_hint` und optionalen Metadaten. Nach Download kommen Dateipfad, Hash und geprüfter Typ hinzu. stderr enthält Diagnosen. `--help` liefert Hilfetext.
- Exit `0` bedeutet mindestens einen Treffer beziehungsweise Download. Exit `2` bedeutet keine Treffer, auch wenn der einzige gewählte Anbieter mangels Schlüssel übersprungen wurde (stderr nennt dann „Schlüssel fehlt“); Exit `1` meldet Aufruf-/Dateifehler oder ausschliesslich fehlgeschlagene Downloads. Eine kleinere Trefferzahl als `--max` bleibt erfolgreich.
- Das Netzwerkmodul begrenzt jede HTTP-Anfrage auf 20 Sekunden, vier Weiterleitungen und höchstens 25 MiB. JSON-Antworten haben ein eigenes 8-MiB-Limit. Es blockiert lokale und private Zieladressen einschliesslich DNS-Auflösung, HTTPS-Abstufungen auf HTTP und ungewöhnliche Ports.
- DuckDuckGo `i.js` ist inoffiziell und kann Rate-Limits, HTML oder eine Suchsperre liefern. Der Ablauf beschafft pro Suche einen neuen `vqd`-Token. Bei Sperre folgt die dokumentierte Quellenalternative; Captchas und Zugriffssperren werden nicht umgangen.
- Ein URL-Filter entfernt bekannte Stockvorschau-CDNs und offensichtliche Wasserzeichenpfade. Er erkennt nicht jedes Wasserzeichen im Bild. Die Sichtprüfung bleibt Pflicht. Erste Zürich-Tests deckten Adobe-Stock- und Freepik-Wasserzeichen auf; die betreffenden Hosts stehen inzwischen im Filter.
- Brandfetchs kostenloses Logo-CDN verlangt Browser-Hotlinking mit Client-ID und schliesst programmgesteuerte Bildabrufe aus. Deshalb überspringt das CLI eine reine Client-ID und verwendet bei vorhandenem `BRANDFETCH_API_KEY` die Brand API. Für Browser-Hotlinking gilt etwa `https://cdn.brandfetch.io/domain/google.com?c=CLIENT_ID`; die Client-ID ist keine Zusicherung eines erfolgreichen CLI-Downloads.
- Unsplash verlangt Hotlinking der gelieferten Bild-URLs, Attribution und Download-Tracking. `--download` ruft den authentisierten `download_location`-Endpunkt auf. Verwende lokale Dateien für Sichtung und Referenzübergabe; beim direkten Websiteeinbau die API-URL aus `embed_url` und die geforderte Attribution einsetzen. Bereits transformierte `regular`-URLs können kleinere Masse als das Original haben; das Downloadmanifest hält beide Grössen fest.
- Bei Pexels Fotograf und Quellenlink erhalten. Logo.dev verlangt im kostenlosen kommerziellen Einsatz Attribution. Anbieterregeln zu Speicherung und Einbettung bei der gewählten Route übernehmen, ohne daraus eine Rückfrageschleife zu machen.

## Foto als Inhaltsreferenz an GPT Image übergeben

Prüfe das gefundene Foto und wähle getrennt ein passendes Stilbild aus dem bestehenden Websiteauftritt oder Shooting. Übergib beide Dateien. Weise jeder Datei eine ID, einen absoluten Pfad, die Herkunft und eine konkrete Rolle zu, wie im GPT-Image-Modul beschrieben.

| Referenz | Rolle | Zu übernehmen |
|---|---|---|
| `content-roof-01` | `content` | Handlung des Ziegelverlegens, Material, Werkzeugfunktion, nachvollziehbare Arbeitsposition |
| `style-site-01` | `style` | Lichtcharakter, Farbigkeit, Materialwiedergabe und Kontrast der Website-Bildfamilie |

Der folgende Prompt ist eine Vorlage für ein neues Szenenbild. Fülle Licht, Bildformat und Zielparameter nach Sichtung aus. Die Zahlen beschreiben gewünschte Aufnahmeparameter; unbekannte EXIF der Vorlage bleiben unbekannt.

```text
Create one complete photographic image for the roofing-service hero section.

Content reference [content-roof-01, /absolute/roof-reference.jpg]:
Use the visible roofing activity, tile material and tool function as subject
context. Show a roofer placing a tile with a physically plausible grip and
secure working posture. Treat the source as a scene reference. Do not present
the depicted worker, company or building as the website customer's own project.

Style reference [style-site-01, /absolute/site-style.jpg]:
Use only its soft directional light, warm-neutral colour treatment, restrained
contrast and natural material detail. Exclude its people, logos and lettering.

Create a new composition. Move the camera to the opposite diagonal side at
roof level, widen the framing and rearrange the background roof planes.
Use a desired full-frame-equivalent 35 mm view, f/5.6 depth of field and a
medium working distance. These are target settings, not measured source EXIF.
Keep the working hands and the tile readable. Place the activity on the right
and leave quiet background space on the left for website copy.

Output a 16:9 photographic scene in the requested delivery resolution.
Preserve believable tile geometry, tool use and safety equipment. Exclude
added logos, text, watermarks and interface elements. The result is a new
illustrative scene, never documentary proof of completed customer work.
```

Bei einer Illustration den Kamerablock durch Blickrichtung, Linienführung, Volumen, Material und Licht auf dem Objekt ersetzen. Für ein präzises Firmenlogo weiterhin die Originaldatei im DOM beziehungsweise als separates Bild verwenden.

Wähle die im aktuellen Auftrag verfügbare GPT-Image-Route. Im nativen `image_gen`-Werkzeug die tatsächlichen Bildreferenzen über dessen aktuelles Schema beifügen. Ein Dateipfad im Prompt allein übermittelt keine Datei. Bei bestehender Higgsfield-Autorisierung den vorhandenen CLI-Ablauf verwenden.

```bash
higgsfield model get gpt_image_2 --json
higgsfield generate cost gpt_image_2 \
  --prompt "$image_prompt" \
  --image /absolute/roof-reference.jpg --image /absolute/site-style.jpg \
  --aspect-ratio 16:9 --resolution 2k --quality high
higgsfield generate create gpt_image_2 \
  --prompt "$image_prompt" \
  --image /absolute/roof-reference.jpg --image /absolute/site-style.jpg \
  --aspect-ratio 16:9 --resolution 2k --quality high --wait
```

Lies `image_prompt` aus der tatsächlich geprüften Promptdatei und übergib ihn als Argument. Quelltexte niemals als Shellcode ausführen. Eine Kostenabfrage kann Referenzen bereits hochladen. Rufe kostenpflichtige Jobs gemäss der bestehenden Routenfreigabe auf; dieses Suchmodul erweitert sie nicht. Speichere die Ausgabe, öffne sie und prüfe Hände, Werkzeugkontakt, Gebäudeform, mobile Zuschnitte und fremde Beschriftung.

### Freistellen

Bevorzuge bereits transparente SVGs oder Rasteroriginale. Braucht ein Foto oder Objekt einen transparenten Hintergrund, nutze bei bestehender Higgsfield-Route den Background Remover.

```bash
higgsfield model get image_background_remover --json
higgsfield generate cost image_background_remover --image /absolute/object.png
higgsfield generate create image_background_remover --image /absolute/object.png --wait
```

Prüfe das aktuelle Schema vor dem Job. Kontrolliere danach echte Alphawerte und Kanten auf hellen und dunklen Flächen. Entferne überschüssigen Rand, erhalte Schatten und verknüpfe die Ableitung im Assetindex. Ein Wasserzeichen ist kein zu entfernender Hintergrund; dafür eine andere Quelldatei suchen.

## Fallback, wenn kein brauchbares Bild vorliegt

Verfeinere zuerst Name, Domain, Produktmodell oder Ort und wechsle die Quelle. Suche bei Logos das offizielle Brand-Kit oder den Pressebereich der Marke. Nutze für unbekannte UI-Begriffe die englische Bezeichnung und eine passende Iconfamilie.

Fehlt ein sauberes Logo weiterhin, verwende vorläufig den ausgeschriebenen Firmennamen und halte das fehlende Original als offene Aufgabe fest. Erfinde weder ein Markenlogo noch ein Partnerschaftssiegel. Bei Fotos nach einer weiteren Inhaltsreferenz suchen und anschliessend den beschriebenen GPT-Image-Ablauf verwenden. Bleibt ein reales Produkt oder Gebäude unklar, die betreffende Bildfläche auslassen beziehungsweise klar als Illustration behandeln. Eine Quellenblockade rechtfertigt keine erfundenen Suchergebnisse.

## Geprüfte Endpunkte und Kosten

Alle folgenden API-Testaufrufe liefen tatsächlich mit `curl`, ohne Browser und ohne Keys. Die exakten Argumente, HTTP-Status, Abrufzeiten und Antwortdateien stehen in [index.json](../assets/image-search-evidence/index.json); die Header-/Body-Dateien liegen daneben unter `assets/image-search-evidence/research/`. API-Aufrufe und Dokumentationsabrufe sind getrennte Belege.

| Quelle und Endpoint | Key | Tatsächlicher Test am 07.09.2026 | Kosten und Status |
|---|---|---|---|
| Google Custom Search: `GET https://www.googleapis.com/customsearch/v1?searchType=image&q=google%20logo&num=2`; authentisiert zusätzlich `key` und `cx` | Ja, API-Key + CX | HTTP 403, nicht registrierter Aufrufer | Für bestehende Kunden 100 Abfragen/Tag gratis, danach 5 USD/1'000, höchstens 10'000/Tag. Für Neukunden geschlossen; Abschaltung am 01.01.2027. [Google-Dokumentation](https://developers.google.com/custom-search/v1/overview). |
| Bing Images: `GET https://api.bing.microsoft.com/v7.0/images/search?q=google%20logo&count=2` | Historisch Subscription-Key | HTTP 401 | Microsoft stellte Bing Search APIs am 11.08.2025 ein. Für 2026 kein neuer nutzbarer Bildsuchtarif. Die 401-Antwort belegt keine Verfügbarkeit. [Microsoft-Abkündigung](https://learn.microsoft.com/en-us/lifecycle/announcements/bing-search-api-retirement). |
| DuckDuckGo: `GET https://duckduckgo.com/?q=…&iax=images&ia=images`, danach `GET https://duckduckgo.com/i.js?l=de-de&o=json&q=…&vqd=…&f=,,,` | Nein; kurzlebiger `vqd` | Beide HTTP 200; Bildantwort mit 100 Dachdecker-Treffern | Kein bezahlter API-Zugang nötig. Inoffiziell, ohne garantierte Verfügbarkeit oder feste öffentliche Quote. Beleg `research/ddg-images.body` unter `assets/image-search-evidence/`. |
| SerpAPI: `GET https://serpapi.com/search.json?engine=google_images&q=google%20logo&num=2` | Ja, `api_key` | HTTP 401, ungültiger/fehlender Key | 250 Suchen/Monat gratis; Starter 25 USD/Monat für 1'000; Developer 75 USD/Monat für 5'000. [Preise](https://serpapi.com/pricing). |
| Serper: `POST https://google.serper.dev/images`, JSON `{"q":"google logo","num":2}` | Ja, `X-API-KEY` | HTTP 403, Unauthorized | 2'500 Gratisabfragen zum Einstieg; 50 USD für 50'000 Credits, sechs Monate gültig. [Preise](https://serper.dev/). |
| Wikimedia Commons: `GET https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=Google%20logo&gsrnamespace=6&gsrlimit=2&prop=imageinfo&iiprop=url%7Csize%7Cextmetadata&format=json` | Nein | HTTP 200; Bild-URLs, Masse, Quellseiten, Metadaten | Öffentlich und kostenlos; Rücksicht auf API-Limits. [Imageinfo](https://www.mediawiki.org/wiki/API:Imageinfo). |
| Brandfetch Logo CDN: `GET https://cdn.brandfetch.io/google.com`; regulär `?c=CLIENT_ID` | Ja, kostenlose Client-ID | Weiterleitung, am Ende HTTP 200 mit HTML-Nutzungsseite statt Bild | 1 Mio. Logoabrufe/Monat gratis, ohne Attribution; Browser-Hotlinking vorgeschrieben. CLI-Bildabrufe ausgeschlossen. [Logo-API](https://docs.brandfetch.com/logo-api/overview). |
| Brandfetch Brand API: `GET https://api.brandfetch.io/v2/brands/google.com` | Ja, Bearer-Key | HTTP 401 | 100 Brand-Abfragen einmalig gratis; Preisseite zeigt Growth ab 99 USD/Monat. Abrechnungswahl und Kontingent vor Nutzung prüfen. [Preise](https://brandfetch.com/developers/pricing). |
| Logo.dev: `GET https://img.logo.dev/google.com`; regulär `?token=KEY` | Ja, Publishable-Key | HTTP 401; Preis- und Dokumentationsseiten HTTP 429 | 500'000/Monat gratis, Attribution bei kommerzieller Gratisnutzung. Bezahltarife hier nicht verifiziert. [Offizielles Repository](https://github.com/logo-dev/logo-api) bestätigt Gratisumfang und unterstützt auch `/name/FIRMA`. |
| Clearbit: `GET https://logo.clearbit.com/google.com` | Früher nein | curl Exit 6, DNS-Auflösung fehlgeschlagen | Eingestellt; laut [Brandfetch-Migrationsdokumentation](https://docs.brandfetch.com/comparisons/clearbit) seit Dezember 2025. Clearbit-Helpcenter hier HTTP 403. Kein aktueller Tarif oder CLI-Fallback. |
| Simple Icons: `GET https://cdn.simpleicons.org/google` und `/stripe` | Nein | Je HTTP 200 mit echtem SVG | Kostenlos; [Projekt](https://github.com/simple-icons/simple-icons) und markenspezifische Metadaten beachten. |
| SVGL: `GET https://api.svgl.app?search=google`, Asset `https://svgl.app/library/google.svg` | Nein | Beide HTTP 200; Varianten als SVG geladen | Kostenlose API mit Rate-Limit. [API-Dokumentation](https://svgl.app/api). |
| Iconify: `GET https://api.iconify.design/search?query=phone&limit=32`, Asset `https://api.iconify.design/lucide/phone.svg` | Nein | Beide HTTP 200; Suchtreffer samt Sammlungslizenzen | Öffentliche API gratis. Bedingungen der jeweiligen Iconfamilie erhalten. [API-Dokumentation](https://iconify.design/docs/api/). |
| Unsplash: `GET https://api.unsplash.com/search/photos?query=roofer&per_page=2` | Ja, Access-Key | HTTP 401 | Gratis-API; Demo 50 Requests/Stunde, freigeschaltete Produktion laut aktueller Dokumentation 1'000/Stunde. [Dokumentation](https://unsplash.com/documentation). |
| Pexels: `GET https://api.pexels.com/v1/search?query=roofer&per_page=2` | Ja, `Authorization` | HTTP 401 | Kostenlos, 200 Requests/Stunde und 20'000/Monat. API-Webseite hier HTTP 403; [offizielle Helpcenter-JSON-API](https://help.pexels.com/api/v2/help_center/en-us/articles/900005852323.json) lieferte HTTP 200 und bestätigt Limits sowie kostenlose Erhöhung bei Eignung. |

Die abgeschalteten Bing- und Clearbit-Dienste sind absichtlich keine CLI-Anbieter. Googles auslaufende API bleibt nur als optionaler Weg für bereits bestehende Zugänge erhalten. Unbekannte Lizenzhinweise, blockierte Quellserver und nicht geprüfte Bezahltarife bleiben ausdrücklich unbekannt.

## Nachprüfen

```bash
cd <skill-dir>
node --check scripts/find-images.mjs
node --test test/find-images.test.mjs
node test/run-live.mjs        # schreibt nach test/<lauf>/; Netzwerk nötig
python3 /root/.claude/skills/copywriting/scripts/forbidden-check.py --doku references/image-search.md
```

Die lokalen Tests prüfen Argumente, Quellenreihenfolge, Tokenbehandlung, Dateisignaturen, SVG-Inhalte, Manifest-Ergänzung, gesperrte Netzwerkziele und Fehlerpfade. Der Live-Runner entfernt Anbieter-Keys aus der Kindprozessumgebung und prüft sieben Suchläufe samt Downloadhashes und Headerdaten. Die Ergebnisse der sieben Läufe vom 07.09.2026 liegen als Belegkopie in [live-runs-final.json](../assets/image-search-evidence/live-runs-final.json) und [unit-tests.tap](../assets/image-search-evidence/unit-tests.tap); die heruntergeladenen Testbilder selbst blieben im Entwicklungsordner `/root/eingang/ausgang/web-erweiterung-2026-09-07/bildsuche/test/`. Referenzgenerierung und Background Remover gehören zum dokumentierten Folgeablauf; für diese Modulentwicklung lief kein Bildjob.
