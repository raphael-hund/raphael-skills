# Tabellen und Datenflächen machen Vergleiche statt Dekoration sichtbar

## TLDR

Richte Daten nach ihrer Vergleichsaufgabe aus, halte Struktur leise und verknüpfe jede Farbe, Skala und Interaktion mit echter Bedeutung.

## Regeln

### Erst die Aufgabe, dann das Component

- Nutze eine KPI-Kachel für genau einen Hauptwert mit kurzem Label. Die vier hellen Kacheln zeigen Label und Wert ohne Sparkline oder Trend. Beleg: `2096215770783199316.md`, Abschnitt „Begrüßung + KPI-Reihe“.
- Nutze eine Liste, wenn Menschen Einträge erkennen und öffnen sollen. Die Projektliste ordnet Logo, Identität, Avatare und Betrag nach Scan-Reihenfolge. Beleg: `2095383602431459523.md`, Abschnitt `media-2.jpg`.
- Nutze eine Tabelle, wenn Menschen Werte zeilen- oder spaltenweise vergleichen müssen. Die Engagement-Tabelle nutzt eine breite Textspalte und kompakte Zahlenspalten. Beleg: `2096215770783199316.md`, Abschnitt „Engagement Breakdown“.
- Nutze ein `dl`, wenn wenige feste Eigenschaften eines Objekts gelesen werden. Die Neuform-Specs setzen Mono-Label links und Wert rechts. Beleg: `neuform-1.md`, Abschnitte zu Spec-Tiles und Datenlisten.
- Nutze einen Chart nur, wenn Form, Verlauf oder Verteilung schneller lesbar sind als Rohwerte. Die Filow-Karten trennen Ring, Pipeline-Balken und Verlauf nach Aussage. Beleg: `2095383602431459523.md`, Abschnitte `media-0.jpg`, `media-1.jpg` und `media-3.jpg`.
- Zerlege mehr als fünf gleichartige Informationszeilen in Gruppen, Karten, Tabs oder Scroll-Snap, wenn kein echter Spaltenvergleich nötig ist. Beleg: `prior_corpus.md`, Tabellen-Regel aus `sources/taste-SKILL.md:312-323,677`.
- Behalte die Tabelle bei, wenn der Spaltenvergleich die Aufgabe ist. Erlaube mobil horizontalen Scroll oder priorisiere Spalten. Beleg: `prior_corpus.md`, Verweis `REPORT.md:72`.

### Baue Hierarchie mit Ausrichtung

- Richte Namen, Kategorien und Datumswerte links aus. Richte Zahlen rechts aus, sobald Größen verglichen werden. Die linksbündigen Zahlen der Engagement-Tabelle sind ausdrücklich als Fehler dokumentiert. Beleg: `2096215770783199316.md`, Abschnitt „Engagement Breakdown“.
- Aktiviere Tabellenziffern für Beträge, Prozente, Mengen, Daten-IDs und Chartwerte. Die Projektliste, Dark-Tabelle und Billing-Tabelle nutzen oder fordern `tabular-nums`. Belege: `2095383602431459523.md`, `2096499167225078020.md`, `2096891182701793331.md`.
- Gib der Schlüsselspalte mehr Breite als Status, Datum oder Betrag. Das Raster der Engagement-Tabelle misst etwa `270 / 170 / 205 / 195 px` im Export. Beleg: `2096215770783199316.md`, Abschnitt „Engagement Breakdown“.
- Setze Identität in der ersten inhaltlichen Spalte dunkel oder Medium. Setze Segment, Zeit und Datum Muted. Beleg: `2096660897628668066.md`, Abschnitt „Tabelle“.
- Ordne eine Transaktionszeile als Medium, Identität und Wert. Das gemessene Raster nutzt `48 px / 1fr / auto`, `18 px` Gap und `72 px` Zeilenhöhe. Beleg: `2096618423983964587.md`, Transaktionsliste in `image-1.jpg`.
- Ordne eine reichere Projektzeile als `90 px / 1fr / auto / auto`. Das gemessene Beispiel lässt zwischen zwei Zeilen `57 px` Luft und verzichtet auf Divider. Beleg: `2095383602431459523.md`, `media-2.jpg`.
- Halte Zeilen eines dichten Dark-Dashboards ruhig. Das gemessene Beispiel nutzt `66 px` Zeilenhöhe, keinen regulären Divider und grauen Body-Text. Beleg: `2096499167225078020.md`, Abschnitt „Tabellen-Karte“.
- Nutze ein regelmäßiges Raster bei langen Verwaltungslisten. Das helle Customer-Dashboard misst Headerhöhe `2.2f`, Body-Zeilen `3f` und Spaltenraster um `10.5f`. Beleg: `2096660897628668066.md`, Abschnitt „Tabelle“.

### Trenne Struktur von Status

- Erzeuge Tiefe zuerst mit Page, Surface, Raised und Border. Die Billing-Ansicht kommt ohne Kartenschatten aus. Beleg: `2096891182701793331.md`, Abschnitte „Seitenrahmen“, „Nachbau“ und „Warum es funktioniert“.
- Nutze Divider gezielt. Die Invoice-Tabelle setzt einen Divider pro `51 px` hoher Zeile; die Dark-Order-Tabelle lässt normale Zeilen offen. Belege: `2096891182701793331.md` und `2096499167225078020.md`.
- Nutze kein Zebra, wenn Spaltenraster, Abstand oder Divider die Zeilen schon eindeutig trennen. Kein untersuchtes Kernbeispiel braucht Zebra. Belege: `2096215770783199316.md`, `2096660897628668066.md`, `2096891182701793331.md`.
- Zeige Selektion mit mindestens zwei Signalen. Die Dark-Tabelle kombiniert Raised-Fläche, Kontur, weißen Text, aktive Checkbox und Zellgrenzen. Beleg: `2096499167225078020.md`, Abschnitt „Tabellen-Karte“.
- Zeige Status als Wort plus Punkt oder als lesbares Badge. Farbe allein reicht nicht. Die Dark-Tabelle nutzt Punkt und Wort; die Customer-Tabelle nutzt getönte Badges. Belege: `2096499167225078020.md` und `2096660897628668066.md`.
- Verwende dieselbe Signalfarbe nicht für zwei verschiedene Taxonomien. Im Customer-Dashboard teilen Plan und Status dieselben Blau- und Rottöne; die Analyse markiert das als Fehler. Beleg: `2096660897628668066.md`, Abschnitt „Badges“.
- Stelle Richtung zusätzlich zum Vorzeichen dar. Schwarze negative Beträge in der Transaktionsliste sind zu schwach codiert. Beleg: `2096618423983964587.md`, Transaktionsliste in `image-1.jpg`.
- Nutze positive und negative Farben nur bei klarer Semantik. Die Kursliste zeigt Plus hellgrün und Minus dunkelrot, jeweils mit Dreieck. Beleg: `2096855995909869867.md`, Kurszeilen in `image-1.jpg`.

### Filter, Suche und Sortierung sind Zustände

- Stelle Suche und Filter direkt über die zugehörigen Daten. Die helle Customer-Ansicht platziert Zeitraum, Plan, Status, Ansicht und Suche rechts über der Tabelle. Beleg: `2096660897628668066.md`, Abschnitt „Filterleiste“.
- Gib zusammengehörigen Controls dieselbe Höhe, Border und Radius. Die gemessene Filterleiste nutzt etwa `58 px` Höhe, `12 px` Radius und `20 px` Gap im Exportmaß. Beleg: `2096660897628668066.md`, Abschnitt „Filterleiste“.
- Gib Selects eine erkennbare Dropdown-Affordance. Fehlende Chevrons sind im Customer-Dashboard als Fehler markiert. Beleg: `2096660897628668066.md`, Abschnitt „Filterleiste“.
- Unterscheide Placeholder und vorhandenen Wert. Der zu dunkle Search-Placeholder wirkt im Customer-Dashboard wie gesetzter Inhalt. Beleg: `2096660897628668066.md`, Abschnitt „Filterleiste“.
- Bündele Werkzeuge in einer eigenen Leiste, wenn die Tabelle viele Aktionen trägt. Die Dark-Tabelle misst eine `70 px` hohe Toolbar mit Filter, Sort, Plus und Suche. Beleg: `2096499167225078020.md`, Abschnitt „Tabellen-Karte“.
- Baue Sortierung als Button im `th`. Das Refero-Beispiel zeigt Muted-Label plus Richtungssymbol in einer `40 px` hohen Headerzeile. Beleg: `refero-2.md`, Abschnitt zur Tabelle mit sortierbaren Spalten.
- Setze `aria-sort` nur auf die aktive Sortierspalte. Zeige Richtung im sichtbaren Label, nicht als dekoratives Sparkle. Das Sparkle im Engagement-Header suggeriert eine unbekannte AI-Funktion. Beleg: `2096215770783199316.md`, Abschnitt „Engagement Breakdown“.
- Bewahre Filter im URL-State, wenn eine gefilterte Ansicht geteilt werden soll. Das ist eine eigene Implementierungsentscheidung; der Corpus belegt dafür keinen Produktzustand.

### Zahlen brauchen Kontext

- Formatiere Zahlen nach Locale und Bedeutung. Trenne Menge, Geld, Quote und Prozent bereits im Datenmodell. Die Billing-Ansicht unterscheidet `$84 / month`, `12 of 20` und `3,150 / 5,000`. Beleg: `2096891182701793331.md`, Plan- und Usage-Zeilen.
- Zeige Einheit am Wert oder im Spaltenkopf. Mische nie Dollar und Enrollment auf derselben Skala. Der Course-Chart zeigt `$750,000` neben einer Enrollment-Achse und ist als semantischer Bruch markiert. Beleg: `2096215770783199316.md`, Abschnitt „Top Engaged Courses“.
- Zeige Delta immer mit Bezugszeitraum. Vier grüne Deltas ohne Zeitraum werden im Dark-Dashboard als Slop benannt. Beleg: `2096499167225078020.md`, KPI-Karten.
- Nutze `time` und `datetime` für Zeitwerte. Die Customer-Tabelle nennt relative und absolute Zeit; ihre Mischung ohne Regel ist ein Fehler. Belege: `2096660897628668066.md` und `2096499167225078020.md`.
- Entscheide pro Spalte zwischen relativem und absolutem Datum. Mische „Just now“ und „Feb 2, 2025“ nicht ungeklärt. Beleg: `2096499167225078020.md`, Abschnitt „Tabellen-Karte“.
- Kürze große Werte nur, wenn die Präzision entbehrlich ist. Ein KPI darf `145k` zeigen; Rechnung, Export und Tooltip brauchen den genauen Wert. Belege: `2095383602431459523.md`, Ring-Chart, und `2096891182701793331.md`, Invoice-Tabelle.
- Lass lange Token-Werte nicht mit Ellipsis verschwinden. Zeige vollständigen Wert über Titel und Copy-Button. Beleg: `open_design.md`, Abschnitt zur Token-Tabelle in `atelier-tokens.png`.
- Nutze Mono nur für technische oder kopierbare Werte. Die Billing-Ansicht nutzt Mono für Invoice-ID, Betrag, Quoten, E-Mail und Kartenwerte; Prosa bleibt Sans. Beleg: `2096891182701793331.md`, Abschnitt „Warum es funktioniert“.

### Charts brauchen eine ehrliche Skala

- Binde Linie, Legende und Tooltip an dasselbe Datenarray. Die Filow-Ringfarben widersprechen ihrer Legende; die Analyse nennt das Proof-Verlust. Beleg: `2095383602431459523.md`, `media-0.jpg`.
- Erkläre jede Segmentfarbe. Der Pipeline-Balken zeigt drei Segmente ohne Legende; ihre Bedeutung bleibt unlesbar. Beleg: `2095383602431459523.md`, `media-1.jpg`.
- Binde Segmentbreiten, Achse und Gesamtwert rechnerisch zusammen. Die dekorative Pipeline-Achse passt nicht zu den Segmentgrenzen. Beleg: `2095383602431459523.md`, `media-1.jpg`.
- Verwende getrennte Skalen für getrennte Einheiten. ROAS und Spend liegen im Dark-Chart ohne Skalen übereinander; die Analyse verwirft das als Datenbeleg. Beleg: `2096833304351961505.md`, Abschnitt „Daily report“.
- Positioniere Zeitpunkte proportional. „Jun 20“, „Jun 24“ und „Jun 27“ stehen trotz ungleicher Abstände gleich weit auseinander. Beleg: `2096833304351961505.md`, Abschnitt „Chart-Panel“.
- Zeige im Tooltip den X-Wert, Serienwerte und Marker. Das frei schwebende Tooltip ohne Datum, Crosshair und Punkte ist als Slop markiert. Beleg: `2096833304351961505.md`, Abschnitt „Tooltip“.
- Nutze Gridlines nur, wenn sie den Abgleich mit einer Skala erleichtern. Filow zeigt dünne gestrichelte Gridlines; das editoriale Dark-Chart verzichtet auf Skala und taugt deshalb nur als Illustration. Belege: `2095784926717300835.md`, Chart-Abschnitte, und `2096833304351961505.md`.
- Lass eine Sparkline nur Form zeigen. Ergänze exakten Wert und Zeitraum außerhalb der Kurve. Das Revenue-Panel koppelt Zahl, Monatsvergleich, Verlauf und Marker. Beleg: `2095784926717300835.md`, `media-3.jpg`.
- Nutze Prognosen mit eigener Linienart. Das orange Linienchart setzt die Fortsetzung gestrichelt und grau ab. Beleg: `2095874058697293985.md`, Dashboard-Linienchart.
- Nutze Hover als Interaktionszustand, nicht als permanente Dekoration. Im Course-Chart tragen nur Hover-Spalte und Tooltip Schatten. Beleg: `2096215770783199316.md`, Abschnitt „Top Engaged Courses“.
- Halte Achsenlabels lesbar. Die Kurs-Zeitachse um `10 px` wird in der Analyse ausdrücklich als zu klein bewertet. Beleg: `2096855995909869867.md`, Zeitachse „1 Day … 1 Year“.
- Nutze Ring-Charts nicht als Anteile, wenn die Werte zusammen über `100 %` liegen. Die Filow-Werte ergeben gemessen `156 %`; beschrifte sie als unabhängige Zielerreichung oder wechsle das Chart. Beleg: `2095383602431459523.md`, `media-0.jpg`.

### KPI-Kacheln brauchen eine Frage

- Zeige einen Hauptwert pro Kachel. Das helle Dashboard setzt Label und Zahl ohne Nebenvisualisierung. Beleg: `2096215770783199316.md`, KPI-Reihe.
- Nutze Icon-Tiles nur, wenn ihre Symbole unterscheidbar sind. Vier fast gleiche schwarze Outline-Icons werden dort als schwach informativ bewertet. Beleg: `2096215770783199316.md`, KPI-Reihe.
- Ergänze Vergleichswert oder Zeitraum, wenn der Wert als Proof dienen soll. Die große Zahl ohne Vergleich im Customer-Dashboard bleibt kontextarm. Beleg: `2096660897628668066.md`, Abschnitt „KPI-Karten“.
- Vermeide leere Höhe. Die gemessenen Customer-Karten lassen etwa `4f` Luft unter zwei Textzeilen; die Analyse bewertet sie als zu hoch. Beleg: `2096660897628668066.md`, Abschnitt „KPI-Karten“.
- Verwende Akzentfarbe nur für relevante Veränderung oder Zustand. Das Dark-Dashboard beschränkt Farbe auf Icon-Tiles, Chart, Delta und Status. Beleg: `2096499167225078020.md`, Abschnitt „Gemeinsamkeiten“.
- Baue dichte Metrik-Footer als Raster. Das Console-Beispiel misst vier Spalten, eine grüne Toplinie und grüne vertikale Trenner. Beleg: `2095565814405742911.md`, Abschnitt „Metrik-Footer“.

## Bauanleitungen

Alle nicht ausdrücklich als „gemessen“ bezeichneten Zahlen in den folgenden Rezepten sind **eigene Startwerte**. Passe sie an echte Daten, Fontmetriken und Viewport an.

### Vergleichstabelle mit Suche, Filtern und Sortierung

```html
<section class="data-view" aria-labelledby="orders-title">
  <header class="data-head">
    <div>
      <p class="eyebrow">Orders</p>
      <h2 id="orders-title">Aktive Orders</h2>
    </div>
    <form class="filters" role="search">
      <label class="search">
        <span class="sr-only">Orders durchsuchen</span>
        <svg aria-hidden="true"><!-- eigene Lupe --></svg>
        <input name="q" type="search" placeholder="Suche nach ID oder Kunde">
      </label>
      <button type="button" aria-haspopup="listbox">Status <span aria-hidden="true">⌄</span></button>
    </form>
  </header>
  <div class="table-scroll" tabindex="0" aria-label="Order-Tabelle, horizontal scrollbar">
    <table>
      <caption>Aktualisiert <time datetime="2026-09-07T10:00:00+02:00">heute</time></caption>
      <thead>
        <tr>
          <th scope="col"><button type="button">Order <span aria-hidden="true">↕</span></button></th>
          <th scope="col">Kunde</th>
          <th scope="col">Status</th>
          <th scope="col" class="num" aria-sort="descending"><button type="button">Betrag <span aria-hidden="true">↓</span></button></th>
          <th scope="col"><span class="sr-only">Aktionen</span></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="key">CM9801</td>
          <td><span class="identity"><span class="avatar" aria-hidden="true">AL</span><span>Alleads</span></span></td>
          <td><span class="status status--ok"><i aria-hidden="true"></i>Bezahlt</span></td>
          <td class="num"><data value="878.82">878,82 €</data></td>
          <td><button class="row-action" aria-label="Aktionen für Order CM9801">•••</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</section>
```

```css
.data-view{--line:#e7e7e7;--muted:#686868;--surface:#fff;color:#171717}
.data-head{display:flex;align-items:end;justify-content:space-between;gap:1rem}
.filters{display:flex;gap:.75rem;flex-wrap:wrap}
.filters button,.search{min-height:2.75rem;border:1px solid var(--line);border-radius:.625rem;background:var(--surface)}
.search{display:flex;align-items:center;gap:.625rem;padding:0 .875rem}
.search input{min-width:14rem;border:0;background:transparent;font:inherit}
.search input::placeholder{color:#858585}
.table-scroll{overflow-x:auto;-webkit-overflow-scrolling:touch;margin-top:1rem;border:1px solid var(--line);border-radius:.75rem}
table{width:100%;min-width:46rem;border-collapse:collapse}
caption{caption-side:bottom;padding:1rem;text-align:left;color:var(--muted)}
th,td{height:3.5rem;padding:0 1rem;border-bottom:1px solid var(--line);text-align:left;white-space:nowrap}
th{font-size:.8125rem;font-weight:500;color:var(--muted)}
th button{display:inline-flex;align-items:center;gap:.375rem;color:inherit;font:inherit}
.num{text-align:right;font-variant-numeric:tabular-nums}
.key{font-weight:500}
.identity,.status{display:inline-flex;align-items:center;gap:.625rem}
.avatar{display:grid;width:2rem;aspect-ratio:1;place-items:center;border-radius:50%;background:#efefef}
.status i{width:.5rem;aspect-ratio:1;border-radius:50%;background:currentColor}
.status--ok{color:#176b45}
.row-action{width:2rem;height:2rem;border:0;border-radius:.5rem;background:transparent}
.row-action:hover,.row-action:focus-visible{background:#f2f2f2}
.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
@media(max-width:44rem){.data-head{align-items:stretch;flex-direction:column}.search input{min-width:0}.filters>*{flex:1}}
```

Dieses Rezept übernimmt die echte Tabellen-Semantik aus `2096891182701793331.md`, die Zahlenausrichtung aus `2096215770783199316.md`, die Sortier-Affordance aus `refero-2.md` und den mobilen Scroll aus `prior_corpus.md`.

### Scanbare Transaktionsliste

```html
<ul class="transactions" aria-label="Letzte Transaktionen">
  <li>
    <span class="merchant-mark" aria-hidden="true">N</span>
    <span class="transaction-copy"><strong>Neuform</strong><time datetime="2026-09-07">7. Sep. 2026</time></span>
    <data class="amount amount--debit" value="-210">−210,00 € <span class="sr-only">Ausgabe</span></data>
  </li>
</ul>
```

```css
.transactions{list-style:none;margin:0;padding:0}
.transactions li{display:grid;grid-template-columns:3rem minmax(0,1fr) auto;gap:1rem;align-items:center;min-height:4.5rem;border-bottom:1px solid #e3e3e3}
.merchant-mark{display:grid;place-items:center;width:3rem;aspect-ratio:1;border-radius:.75rem;background:#f2f2f2}
.transaction-copy{display:grid;gap:.25rem;min-width:0}
.transaction-copy strong{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.transaction-copy time{color:#737373;font-size:.875rem}
.amount{text-align:right;font-variant-numeric:tabular-nums;white-space:nowrap}
.amount--debit{color:#7f1d1d}
.amount--credit{color:#176b45}
```

Das Rezept startet beim gemessenen `48 px / 1fr / auto`-Raster aus `2096618423983964587.md`. Das zusätzliche Richtungswort behebt dort das konkrete Gegenbeispiel der schwarzen Minuswerte.

### KPI-Raster mit belastbarem Kontext

```html
<section class="kpi-grid" aria-label="Kernmetriken">
  <article class="kpi">
    <p>Aktive Kunden</p>
    <strong><data value="5126">5.126</data></strong>
    <p class="kpi-meta"><span class="delta delta--up">↗ 8,2 %</span> gegenüber den letzten sieben Tagen</p>
  </article>
</section>
```

```css
.kpi-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(13rem,1fr));gap:1rem}
.kpi{padding:1.25rem;border:1px solid #e6e6e9;border-radius:.75rem;background:#fff}
.kpi>p:first-child{margin:0;color:#555}
.kpi strong{display:block;margin-top:1.5rem;font-size:clamp(2rem,4vw,3.25rem);font-weight:600;letter-spacing:-.03em;font-variant-numeric:tabular-nums}
.kpi-meta{margin:.75rem 0 0;color:#666;font-size:.875rem}
.delta--up{color:#176b45;font-weight:600}
.delta--down{color:#8a2020;font-weight:600}
```

Das Rezept verdichtet die gemessenen KPI-Muster aus `2096215770783199316.md`, `2096660897628668066.md` und `2096499167225078020.md`. Es ergänzt genau den dort fehlenden Zeitraum.

### Ehrlicher Linienchart mit Tooltip

```html
<figure class="trend" aria-labelledby="trend-title trend-desc">
  <figcaption>
    <span id="trend-title">Umsatz</span>
    <strong><data value="11558.11">11.558,11 €</data></strong>
    <span id="trend-desc">Tageswerte der letzten sieben Tage</span>
  </figcaption>
  <svg viewBox="0 0 640 260" role="img" aria-label="Umsatz steigt von Montag bis Sonntag">
    <g class="grid" aria-hidden="true"><path d="M48 32H624M48 96H624M48 160H624M48 224H624"/></g>
    <g class="axis" aria-hidden="true"><text x="40" y="228">0 €</text><text x="40" y="164">5 Tsd. €</text><text x="40" y="100">10 Tsd. €</text></g>
    <path class="area" d="M48 205 C140 180 180 188 240 142 S360 88 430 112 S550 70 624 48 L624 224 L48 224Z"/>
    <path class="line" d="M48 205 C140 180 180 188 240 142 S360 88 430 112 S550 70 624 48"/>
    <g class="focus" transform="translate(430 112)"><line y1="-80" y2="112"/><circle r="5"/></g>
  </svg>
  <output class="chart-tip"><time datetime="2026-09-05">5. Sep.</time><span>Umsatz <b>8.420,00 €</b></span></output>
</figure>
```

```css
.trend{position:relative;padding:1.5rem;border:1px solid #e7e7e7;border-radius:.875rem;background:#fff}
.trend figcaption{display:grid;gap:.375rem}
.trend figcaption strong{font-size:1.75rem;font-variant-numeric:tabular-nums}
.trend svg{display:block;width:100%;height:auto;margin-top:1rem;overflow:visible}
.grid path{fill:none;stroke:#dedede;stroke-dasharray:3 4}
.axis text{fill:#707070;font-size:.75rem;text-anchor:end}
.area{fill:url(#own-gradient,#e8f0ff);opacity:.45}
.line{fill:none;stroke:#285fd4;stroke-width:2;stroke-linecap:round;vector-effect:non-scaling-stroke}
.focus line{stroke:#285fd4;stroke-opacity:.22}.focus circle{fill:#fff;stroke:#285fd4;stroke-width:2}
.chart-tip{position:absolute;right:1.5rem;top:1.5rem;display:grid;gap:.375rem;padding:.75rem 1rem;border:1px solid #ddd;border-radius:.625rem;background:#fff;box-shadow:0 .5rem 1.5rem rgb(0 0 0/.08)}
.chart-tip span{display:flex;gap:1rem;justify-content:space-between}.chart-tip b{font-variant-numeric:tabular-nums}
```

Der X-Wert, die Hilfslinie und der Marker beheben das konkrete Tooltip-Problem aus `2096833304351961505.md`. Die Gridlines folgen `2095784926717300835.md`; der exakte Wert plus Zeitraum folgt dem Sparkline-Muster dort.

### Segmentbalken mit lesbarer Legende

```html
<figure class="pipeline">
  <figcaption><span>Pipeline</span><strong><data value="48345">48.345 €</data></strong></figcaption>
  <div class="segments" role="img" aria-label="30 Prozent qualifiziert, 61 Prozent Angebot, 9 Prozent gewonnen">
    <i style="--share:30;--c:#285fd4"></i>
    <i style="--share:61;--c:#d25f35"></i>
    <i style="--share:9;--c:#16849a"></i>
  </div>
  <dl class="segment-legend">
    <div><dt><i style="--c:#285fd4"></i>Qualifiziert</dt><dd>30 %</dd></div>
    <div><dt><i style="--c:#d25f35"></i>Offer</dt><dd>61 %</dd></div>
    <div><dt><i style="--c:#16849a"></i>Gewonnen</dt><dd>9 %</dd></div>
  </dl>
</figure>
```

```css
.pipeline{padding:1.5rem;border:1px solid #e7e7e7;border-radius:.875rem}
.pipeline figcaption{display:flex;justify-content:space-between;gap:1rem}
.pipeline figcaption strong,.segment-legend dd{font-variant-numeric:tabular-nums}
.segments{display:flex;gap:.375rem;height:1.875rem;margin-top:1.25rem}
.segments>i{flex:var(--share);min-width:.25rem;border-radius:.375rem;background:var(--c)}
.segment-legend{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-top:1rem}
.segment-legend div{display:grid;gap:.25rem}.segment-legend dt{color:#666}.segment-legend dt i{display:inline-block;width:.375rem;height:.875rem;margin-right:.375rem;border-radius:999px;background:var(--c)}
.segment-legend dd{margin:0}
```

Die Proportionen zitieren als Beispieldaten das gemessene Verhältnis aus `2095383602431459523.md`, `media-1.jpg`. Anders als die Quelle benennt das Rezept alle Segmente und lässt die dekorative Achse weg.

### Kompakte Specs und Design-Tokens

```html
<dl class="specs">
  <div><dt>Radius</dt><dd><code>0.75rem</code><button aria-label="Radius kopieren">Kopieren</button></dd></div>
  <div><dt>Surface</dt><dd><i class="swatch" style="--sw:#f5f5f5" aria-hidden="true"></i><code>#F5F5F5</code><button aria-label="Farbwert kopieren">Kopieren</button></dd></div>
</dl>
```

```css
.specs{margin:0;border-top:1px solid rgb(0 0 0/.1)}
.specs>div{display:grid;grid-template-columns:minmax(7rem,1fr) minmax(0,2fr);gap:1rem;align-items:center;padding:.625rem 0;border-bottom:1px solid rgb(0 0 0/.1)}
.specs dt{font:600 .6875rem/1.2 ui-monospace,monospace;letter-spacing:.1em;text-transform:uppercase;color:#666}
.specs dd{display:flex;align-items:center;justify-content:flex-end;gap:.625rem;min-width:0;margin:0;font-variant-numeric:tabular-nums}
.specs code{overflow-wrap:anywhere}.swatch{width:1rem;aspect-ratio:1;border:1px solid #d9d9d9;border-radius:.1875rem;background:var(--sw)}
```

Das `dl` folgt `neuform-1.md`. Swatch, Mono-Name, rechtsbündiger Wert und ungekürzte Werte folgen `open_design.md`.

## Varianten je Stilfamilie

### Helles SaaS-Raster

- Nutze weiße Surface, Off-White Header-Fill und graue Linien. Die Engagement-Tabelle misst Header `#FAFAFB`, Border `#ECECEF`, Headerhöhe `60 px` und Zeilenhöhe `59 px`. Beleg: `2096215770783199316.md`.
- Nutze Radius und Border statt Schatten. Die KPI-Karten messen `12 px` Radius und `1 px #E6E6E9`. Beleg: `2096215770783199316.md`.
- Lass nur aktive Balken dunkel werden. Inaktive Balken sind dort `#E4E4E7`, der aktive ist `#151518`. Beleg: `2096215770783199316.md`.
- Setze Schatten ausschließlich auf Hover-Spalte und Tooltip, wenn die Grundfläche flach bleibt. Beleg: `2096215770783199316.md`.

### Dunkles Operations-Dashboard

- Nutze drei Helligkeitsstufen und dünne Borders statt Glow. Das Order-Dashboard arbeitet mit `#0A`, `#11`, `#1B` und `1 px` Border. Beleg: `2096499167225078020.md`.
- Setze statischen Body-Text grau; reserviere Weiß für Werte, Titel und aktive Elemente. Beleg: `2096499167225078020.md`, Abschnitt „Typografie“.
- Nutze Status als Punkt plus Wort. Nutze Selektion über Helligkeit und Kontur, nicht über Neon. Beleg: `2096499167225078020.md`, Tabellen-Karte.
- Nutze im Billing-Stil Mono für technische Werte und Lime nur für Primäraktion, aktiven Zustand und Fortschritt. Beleg: `2096891182701793331.md`.
- Nutze im editorialen Dark-Chart dicke, komplementäre Linien ohne Fill nur als Übersicht. Ergänze für Analyse getrennte Skalen. Beleg: `2096833304351961505.md`.

### Editoriales Minimal

- Entferne vertikale Linien, wenn Abstand und Typo reichen. Die Projektliste nutzt `57 px` Abstand statt Divider. Beleg: `2095383602431459523.md`, `media-2.jpg`.
- Gib Zahlen den stärksten typografischen Kontrast. Der Betrag ist dort der größte Text der Zeile. Beleg: `2095383602431459523.md`, `media-2.jpg`.
- Nutze eine einzige Akzentlinie, ein dezentes Flächen-Fade und einen Ring-Marker für Sparklines. Beleg: `2095784926717300835.md`, `media-3.jpg`.
- Verwende Zeitraum-Pills mit Kontur statt Fill-Wechsel, wenn der Look leise bleiben soll. Gemessen sind `3m / 6m / 1y / 2y` mit aktivem `1 px` Rahmen. Beleg: `2095488681796854015.md`.

### Technisch und Console

- Nutze Mono-Labels, Tabellenziffern und strenge Spalten. Belege: `neuform-1.md`, `open_design.md`, `2095565814405742911.md`.
- Setze Logs als Zeitspalte plus Inhalt. Das Console-Beispiel misst `80 px` Zeitspalte, `95 px` Zeilenhöhe und gestrichelten grünen Divider. Beleg: `2095565814405742911.md`.
- Nutze Rasterlinien als System, nicht als Ornament. Die Console verbindet Metrik-Footer und Log-Divider über dasselbe Grün. Beleg: `2095565814405742911.md`.
- Nutze Token-Swatches als Daten, nicht als Dekoration. Werte bleiben vollständig und kopierbar. Beleg: `open_design.md`.

### Commerce und Billing

- Nutze ein echtes `table` für Rechnungen. Das gemessene Muster zeigt `45 px` Header, `51 px` Rows, Datum, Invoice-ID, Betrag, Status und Download. Beleg: `2096891182701793331.md`.
- Stelle Betrag mit Tabellenziffern dar. Stelle Status neutral dar, wenn keine Handlung nötig ist. Beleg: `2096891182701793331.md`.
- Reduziere wiederholte Aktionen. Sechs identische PDF-Buttons werden dort als visuelle Last bewertet. Beleg: `2096891182701793331.md`.
- Zeige Quoten mit einem aus Daten berechneten Progress-Balken. Hart codierte Breiten sind dort ausdrücklich ausgeschlossen. Beleg: `2096891182701793331.md`.

### Vergleichs- und Featurematrix

- Nutze Gruppenzeilen, wenn Features in Bereiche zerfallen. Beleg: `refero-2.md`, Featurematrix.
- Wiederhole Feature-Namen nicht unnötig in jeder Zelle, wenn ein Zeilenkopf die Zuordnung klarer macht. Das Refero-Beispiel wiederholt Namen und wird nur als Quellmuster, nicht als Pflicht übernommen. Beleg: `refero-2.md`.
- Dämpfe Ausschlüsse, aber halte Textkontrast lesbar. Das Linear-Beispiel liegt mit `#3e4245` auf `#101113` unter dem geforderten Kontrast. Beleg: `refero-2.md`.
- Fixiere mobil bei horizontalem Scroll die erste Vergleichsspalte, sofern sie die Zeilenidentität trägt. Beleg für Scrollstrategie: `prior_corpus.md`; Sticky-Verhalten ist eigener Startpunkt.

### Kalender als Datenraster

- Nutze ein echtes Sieben-Spalten-Raster. Das Booking-Beispiel misst Tages-Pills mit `40 px` Höhe. Beleg: `2096192737867350330.md`, Kalenderabschnitt.
- Unterscheide verfügbar, nicht verfügbar und gewählt über Form, Ton und Textgewicht. Beleg: `2096192737867350330.md`.
- Setze den gewählten Tag dunkel mit weißer Zahl. Setze nicht verfügbare Tage als nackte Muted-Zahl. Beleg: `2096192737867350330.md`.

## Dos

- Wähle das Component nach Vergleichsaufgabe. Belege: `2095383602431459523.md`, `2096215770783199316.md`, `neuform-1.md`.
- Verwende semantisches `table`, `caption`, `th scope`, `data`, `time`, `dl`, `output` und echte Buttons. Belege für die zugrunde liegenden Muster: `2096891182701793331.md`, `shadcn.md`, `neuform-1.md`.
- Richte Zahlen rechts aus und aktiviere Tabellenziffern. Belege: `2096215770783199316.md`, `shadcn.md`.
- Halte Header lesbar und sortierbare Labels klickbar. Beleg: `refero-2.md`.
- Nutze Farbwort plus Form für Status. Belege: `2096499167225078020.md`, `2096660897628668066.md`.
- Zeige KPI, Delta und Zeitraum als eine Aussage. Gegenbeleg: `2096499167225078020.md`.
- Render Chart, Legende und Tooltip aus denselben Daten. Gegenbeleg: `2095383602431459523.md`.
- Beschrifte Achsen mit Einheit. Gegenbelege: `2096215770783199316.md`, `2096833304351961505.md`.
- Zeige X-Bezug, Hilfslinie und Marker im Tooltip. Gegenbeleg: `2096833304351961505.md`.
- Verwende Prognosen mit anderer Linienart. Beleg: `2095874058697293985.md`.
- Nutze Schatten für Interaktion, nicht als flächendeckendes Material. Beleg: `2096215770783199316.md`.
- Lass Tabellen mobil scrollen, wenn Spaltenvergleich erhalten bleiben muss. Beleg: `prior_corpus.md`.
- Halte lange Token-Werte sichtbar und kopierbar. Beleg: `open_design.md`.
- Verbinde Daten mit Offer, CTA oder Proof nur, wenn die Beziehung wahr und beschriftet ist. Die untersuchten Showcase-Charts verlieren Proof durch unklare Einheiten und Platzhalter. Belege: `2096215770783199316.md`, `2096499167225078020.md`.
- Nutze ICP, Hook, Offer und CTA als Inhaltsbegriffe, nicht als dekorative Labels. Eine Kampagnentabelle darf diese Spalten tragen; ihre Werte brauchen dieselben Ausrichtungs- und Sortierregeln. Corpus-Bezug: Tabellenmuster in `2096660897628668066.md` und Sortierung in `refero-2.md`.

## Don'ts

- Don't: Stelle Zahlenspalten linksbündig. Gegenbeispiel: Enrollments und Completion lassen sich in `2096215770783199316.md` schlechter vergleichen.
- Don't: Setze ein Sparkle in jeden Header und nenne das Sortierung. Gegenbeispiel: `2096215770783199316.md`.
- Don't: Nutze eine Achse als Ornament. Gegenbeispiel: Die `10k–50k`-Achse passt in `2095383602431459523.md` nicht zu den Segmentgrenzen.
- Don't: Zeige Segmente ohne Namen. Gegenbeispiel: Der Pipeline-Balken in `2095383602431459523.md` hat drei Farben ohne Bedeutung.
- Don't: Lass Legende und Chart unterschiedliche Farben nutzen. Gegenbeispiele: Ring-Chart in `2095383602431459523.md` und Sales Overview in `2095784926717300835.md`.
- Don't: Nenne unabhängige Zielwerte Anteile eines Ganzen. Gegenbeispiel: `70 + 48 + 38 = 156 %` im Ring-Chart aus `2095383602431459523.md`.
- Don't: Mische Dollar und Enrollments in einem Chart. Gegenbeispiel: `$750,000` neben Enrollment-Achse in `2096215770783199316.md`.
- Don't: Lege ROAS und Spend ohne getrennte Skalen übereinander. Gegenbeispiel: `2096833304351961505.md`.
- Don't: Verteile ungleiche Zeitintervalle gleich weit. Gegenbeispiel: `Jun 20 / Jun 24 / Jun 27` in `2096833304351961505.md`.
- Don't: Zeige ein Tooltip ohne Datum oder Kurvenmarker. Gegenbeispiel: `2096833304351961505.md`.
- Don't: Verdecke den untersuchten Datenpunkt mit dem Tooltip. Gegenbeispiele: `2096833304351961505.md` und `2096215770783199316.md`.
- Don't: Setze Achsenlabels auf unlesbare Showcase-Größe. Gegenbeispiel: etwa `10 px` in `2096855995909869867.md`.
- Don't: Färbe eine Linie als Verlauf, wenn der Farbwechsel keine Datenbedeutung hat. Gegenbeispiel: Cyan zu Lime mit unpassendem Endpunkt in `2096499167225078020.md`.
- Don't: Lass Placeholder wie „PRIMARY TEXT“ im Tooltip stehen. Gegenbeispiel: `2096499167225078020.md`.
- Don't: Zeige vier positive Deltas ohne Zeitraum. Gegenbeispiel: `2096499167225078020.md`.
- Don't: Zeige negative Beträge nur schwarz mit Minus. Gegenbeispiel: `2096618423983964587.md`.
- Don't: Nutze Rot gleichzeitig für Enterprise-Plan und Cancelled-Status. Gegenbeispiel: `2096660897628668066.md`.
- Don't: Nutze Statusfarben mit unzureichendem Textkontrast. Gegenbeispiel: gelbes Basic-Badge unter `2:1` in `2096660897628668066.md`.
- Don't: Dämpfe ausgeschlossene Features unter Lesbarkeit. Gegenbeispiel: Featurematrix in `refero-2.md`.
- Don't: Vermische relative und absolute Daten ohne Produktregel. Gegenbeispiel: „Just now“ neben „Feb 2, 2025“ in `2096499167225078020.md`.
- Don't: Schneide Token-Werte mit Ellipsis ab. Gegenbeispiel: `color-mix(in oklab,…)` in `open_design.md`.
- Don't: Wiederhole sechs schwere Download-Buttons, wenn leise Links reichen. Gegenbeispiel: `2096891182701793331.md`.
- Don't: Nutze Demo-Duplikate als Proof. Gegenbeispiel: wiederholte Order-Daten in `2096499167225078020.md`.
- Don't: Verwandle ein Mobile-Layout pauschal in eine einspaltige Tabelle. Gegenbeleg: `prior_corpus.md`.
- Don't: Setze Hairlines über und unter jede kurze Content-Zeile. Gegenbeleg und Alternative: `prior_corpus.md`.

## Gilt nicht wenn

- Nutze keine Tabelle, wenn es nur einen Wert und eine Handlung gibt. Eine KPI-Kachel oder Summary-Zeile ist direkter. Beleg: KPI-Muster in `2096215770783199316.md`.
- Nutze keinen Chart, wenn die exakten Werte die Entscheidung tragen und kein Verlauf verglichen wird. Die Invoice-Historie ist als Tabelle korrekt. Beleg: `2096891182701793331.md`.
- Nutze keinen Ring-Chart für unabhängige Kategorien. Nutze getrennte Progress-Balken. Gegenbeleg: `2095383602431459523.md`.
- Nutze keine Statusfarbe, wenn der Zustand neutral und abgeschlossen ist. Ein neutrales Paid-Badge reicht. Beleg: `2096891182701793331.md`.
- Nutze keinen horizontalen Mobile-Scroll, wenn die Aufgabe nur die Identität eines Eintrags braucht. Wechsle dann in eine priorisierte Liste. Beleg für Listenraster: `2096618423983964587.md`.
- Fixiere die erste Spalte nicht, wenn sie Aktionen statt Identität enthält. Das Sticky-Rezept ist ein eigener Startpunkt, kein gemessener Corpus-Zustand.
- Zeige keine Trendfarbe, wenn kein valider Vergleichszeitraum existiert. Gegenbeleg: `2096499167225078020.md`.
- Nutze keine getrennten Y-Achsen, wenn zwei Serien dieselbe Einheit und Größenordnung teilen. Das Erfordernis entsteht erst bei getrennten Einheiten; Gegenbeleg: `2096833304351961505.md`.
- Nutze kein Tooltip als einzigen Zugang zu Werten. Touch, Keyboard und Export brauchen eine alternative Tabelle oder Textzusammenfassung. Diese Zugänglichkeitslösung ist eine eigene Implementierungsentscheidung; der Corpus zeigt keine vollständigen Keyboard-Zustände.
- Nutze keine dichte Datenfläche als Marketing-Proof, wenn Daten, Labels oder Einheiten Platzhalter sind. Gegenbelege: `2096499167225078020.md`, `2096215770783199316.md`, `2095784926717300835.md`.

## Quellen

Alle beauftragten Einzelanalysen wurden gelesen. Die folgenden Dateien bilden den vollständigen Corpus dieses Kapitels:

- `2095383602431459523.md`
- `2095784926717300835.md`
- `2095797753305612601.md`
- `2095874058697293985.md`
- `2095928637346472339.md`
- `2096149200178418026.md`
- `2096165490498695410.md`
- `2096175237109092642-video-1.md`
- `2096175237109092642-video-2.md`
- `2096175237109092642.md`
- `2096215770783199316.md`
- `2095783930775433616.md`
- `2095807169346334900.md`
- `2096618423983964587.md`
- `2096634909263646898.md`
- `2096674796704813174.md`
- `2096832279775486079.md`
- `2096855995909869867.md`
- `2096891319843164276.md`
- `2096929195381457078.md`
- `2096192737867350330-video-1.md`
- `2096192737867350330-video-2.md`
- `2096192737867350330.md`
- `2096499167225078020.md`
- `2096660897628668066.md`
- `2096833304351961505.md`
- `2096876701775261945.md`
- `2096891182701793331.md`
- `2096931638118871502.md`
- `2096953356086313312.md`
- `2095488681796854015.md`
- `2095565814405742911.md`
- `2095863741250474026.md`
- `2096175830624055596.md`
- `2096292759489609818.md`
- `2096889729337921598.md`
- `2096944343487852961.md`
- `aakib-tiles.md`
- `mobbin-1.md`
- `mobbin-2.md`
- `mobbin-3.md`
- `refero-1.md`
- `refero-2.md`
- `designmd-me-1.md`
- `neuform-1.md`
- `layers.md`
- `designmd_supply.md`
- `open_design.md`
- `twentyfirst.md`
- `shadcn.md`
- `prior_corpus.md`
- `gap-marcelkargul.md`
- `gap-uiux_hamad.md`

Die Regeln priorisieren direkte Tabellen-, Dashboard- und Chart-Belege. Analysen ohne passende Datenfläche dienen nur der Corpus-Abgrenzung und erzeugen keine zusätzlichen Regeln.
