# States, Proof und Pricing machen Wahrheit sichtbar

## TLDR

Zeige Zustand, Beleg und Preis so konkret, dass der ICP ohne Raten versteht, was passiert, wem er glaubt und was das Offer kostet.

## Regeln

### Zustände bilden die Funktion ab

- Entwirf für jede datenabhängige Fläche leer, kein Treffer, Loading, Fehler und Success.
  Beleg: `refero-2.md`, Mocha Empty State; `refero-1.md`, Billing-Formular.
- Trenne „noch keine Daten“ von „keine Treffer“.
  „No apps yet“ trotz gefüllter Suche ist eine Zustandsverwechslung.
  Ein leerer Suchtreffer nennt die Query und bietet „Suche löschen“ an.
  Beleg: `refero-2.md`, Mocha Empty State.
- Wiederhole im Empty State dieselbe Primäraktion wie in der umgebenden Navigation.
  Form, Farbe und Verb bleiben gleich.
  Das macht den nächsten Schritt eindeutig.
  Beleg: `refero-2.md`, Mocha Topbar und Empty State.
- Zeige Loading als strukturelles Vorschaubild, nicht als beliebige graue Fläche.
  Das Billing-Beispiel nutzt einen Label-Balken und einen Feld-Balken je Feldgruppe.
  Beleg: `refero-1.md`, `49229bf2…jpg`.
- Halte beim Pending-Zustand Breite und zugänglichen Namen des CTA stabil.
  Ersetze nur die sichtbare Beschriftung durch einen Spinner.
  Beleg: `prior_corpus.md`, Taste-Skill-Regel zu Pending.
- Markiere Fehler mindestens über Control und Fehlermeldung.
  Das Refero-Beispiel nutzt zusätzlich eine getönte Feldfläche und rote Eingabe.
  Beleg: `refero-1.md`, `49229bf2…jpg`.
- Verknüpfe Fehlermeldung und Control semantisch.
  Nutze `aria-invalid` und `aria-describedby`.
  Native Browservalidierung allein erzeugt im Shadcn-Beleg keine verständliche Fehleroptik.
  Beleg: `shadcn.md`, `card-invalid.png` und FieldError-API.
- Zeige Success dort, wo die Aktion stattfand.
  Ein Inline-Balken darf das Formular sichtbar lassen.
  Nutze `role="status"`, damit Success nicht unterhalb des Folds verloren geht.
  Beleg: `refero-1.md`, `33db4d94…jpg`.
- Baue einen abgeschlossenen Flow als klare Folge: Icon, Ergebnis, personalisierter Kontext, Details, Korrekturaktionen, Sekundärlink, Fine-Print.
  Beleg: `mobbin-2.md`, `624b905e` und `6f5acb59`.
- Deaktiviere einen Pflichtfeld-CTA bis die Eingabe valide ist.
  Ein optionales Feld bleibt dagegen handlungsfähig und wechselt von „Skip for now“ zu „Continue“.
  Beleg: `2096192737867350330.md` und `2096192737867350330-video-2.md`.
- Zeige Fortschritt erst nach erfolgreichem Submit vollständig.
  Ein voller Balken vor dem noch ausstehenden Submit behauptet einen falschen Zustand.
  Beleg: `2096192737867350330-video-2.md`, `second-28.jpg`.
- Unterscheide Hover, Fokus und Selected sichtbar.
  Slots, deren Hover und Selected identisch aussehen, zwingen den ICP zum Raten.
  Beleg: `2096192737867350330.md`, `second-14.jpg`.
- Verwende nicht nur Farbe für Status.
  Ergänze Wort, Form, Icon oder zugängliche Beschriftung.
  Beleg: `2095783930775433616.md`, kaum unterscheidbare Lachs- und Lila-Punkte.
- Ein Status ist keine Aktion.
  „Completed“ gehört in ein Status-Bauteil, „Review“ in einen Button.
  Beleg: `2096833304351961505.md`, `HRlyYaLbAAALKM3.jpg`.
- Nutze `aria-selected`, `aria-current`, `aria-pressed`, `aria-expanded` und `disabled` passend zur Funktion.
  Ein heller oder dunkler Fleck allein ist kein Zustand für Assistive Technology.
  Beleg: `2096931638118871502.md`, `twentyfirst.md`, `shadcn.md`.
- Der aktive Zustand gewinnt Kontrast, nicht Dekoration.
  Belegt sind Vollflächen-Inversion, Sättigungssprung, Raised-Fill und Outline-Ring.
  Wähle genau eine Sprache pro Interface.
  Beleg: `2096929195381457078.md`, `2096618423983964587.md`, `2096891182701793331.md`, `layers.md`.
- Nutze denselben Fokus-Ring für Button, Input und Select.
  Beleg: `shadcn.md`, `theming.html`.
- Ein Accordion-Icon muss Offen und Geschlossen unterscheiden.
  Identische Sparkles sind Dekoration und kein Zustandsbeleg.
  Beleg: `2095928637346472339.md`, `media-1.jpg`.

### Proof braucht Herkunft und Kontext

- Ordne Proof als Kette: Produktbeleg, Kompatibilität oder Kunden, Outcome, Stimme, CTA.
  Das Kalender-SaaS-Board führt Produktshot, Logos, Prozess, Details, Preis und Stimmen nacheinander.
  Beleg: `2096292759489609818.md`, Gesamtboard.
- Setze Logos direkt unter die Behauptung, die sie belegen.
  Integrationslogos belegen Kompatibilität, Kundenlogos belegen Nutzung.
  Vermische diese Aussagen nicht.
  Beleg: `2096292759489609818.md`, Logostrip; `refero-2.md`, Linear-Logozeile.
- Verwende echte Wortmarken nur mit Erlaubnis und korrekter Bezeichnung.
  „Codex“ mit OpenAI-Logo ist unsauber.
  Logoipsum ist Platzhalter, kein Proof.
  Beleg: `2096292759489609818.md`; `2095874058697293985.md`.
- Halte Kundenlogos monochrom, wenn die Marke selbst nicht Teil der Story ist.
  So konkurriert Proof nicht mit CTA oder Offer.
  Beleg: `refero-2.md`, Linear-Logozeile; `2096192737867350330-video-1.md`.
- Bewahre Originalfarbe, wenn Farbe die Kompatibilitätsmarke identifiziert.
  Das Kalender-Board zeigt Tool-Logos in Originalfarbe.
  Beleg: `2096292759489609818.md`, Logostrip.
- Gib einer Zahl direkt Quelle, Zeitraum, Grundgesamtheit und Definition.
  „Trusted by 1000+ Marketing teams in 90+ countries“ widerspricht dort dem Dev-Tool und bleibt unbelegt.
  Beleg: `2095874058697293985.md`, Hero-Proof.
- Hebe eine belastbare Proof-Zahl typografisch hervor, nicht fünf unbelegte Kennzahlen zugleich.
  Der Stripe-Beleg isoliert „2.9% + $0.30“ in einer eigenen Callout-Zelle.
  Die Werte sind im Quellbild gemessen, nicht als Empfehlung übernommen.
  Beleg: `refero-2.md`, Stripe Pricing.
- Ein Chart-Highlight braucht einen Wert oder Tooltip.
  Der hervorgehobene April-Balken ohne Beschriftung ist eine Lücke.
  Beleg: `2095383602431459523.md`, `media-3.jpg`.
- Mache Tooltips per Hover und Fokus erreichbar.
  Sichtbare Rückmeldung ist auch für Copy-Aktionen Pflicht.
  Beleg: `2096891319843164276.md`; `2096175237109092642-video-1.md`.
- Schreibe Testimonials als überprüfbare Mini-Fälle.
  Nenne Person, Rolle, Organisation, Ausgangslage und Outcome.
  Ein Avatar mit generischem Lob ist nur Behauptung.
  Beleg: `2096292759489609818.md`, Testimonial-Split; `2096832279775486079.md`, Zitatkarte.
- Kombiniere eine große Stimme mit einer kleineren Stimmenwand nur bei echtem Volumen.
  Das große Zitat trägt die Aussage; die Wand signalisiert Menge.
  Beleg: `2096292759489609818.md`, Testimonial-Sektion.
- Halte Testimonial-Text lesbar.
  Die verkleinerten Karten im Board sind ein Anti-Beispiel.
  Beleg: `2096292759489609818.md`, rechte Kartenwand.
- Sterne belegen nur eine Bewertung, wenn Plattform, Skala und Anzahl genannt sind.
  Sonst sind sie Dekoration.
  Der Corpus zeigt Sterne, aber keine Bewertungsquelle.
  Beleg: `aakib-tiles.md`, Testimonial-Split; `2096292759489609818.md`.
- Avatare plus „Trusted by“ ersetzen keine nachprüfbare Zahl.
  Der Nexora-Checkout zeigt eine starke Anordnung, aber schwachen Kontrast und keine Quelle.
  Beleg: `2096929195381457078.md`, Social Proof.
- Bild-Captions können Proof tragen.
  Entferne sie auf Mobile nicht, wenn sie Projekt, Ort oder Outcome identifizieren.
  Beleg: `2096149200178418026.md`, Projektgalerie.

### Pricing erklärt Auswahl und Rechnung

- Zeige Tier-Name, ICP oder Use Case, Preisbasis, Abrechnungszeitraum, CTA und enthaltene Features in derselben Lesereihenfolge.
  Beleg: `refero-2.md`, Linear Pricing; `2096929195381457078.md`, Plan-Auswahl.
- Hebe höchstens einen empfohlenen Tier hervor.
  Belegt sind ein sparsamer vertikaler Versatz und eine Vollflächen-Inversion.
  Nutze nicht Versatz, Farbe, Glow und Badge gleichzeitig.
  Beleg: `refero-2.md`, Linear Business; `2096929195381457078.md`, Pro-Karte.
- Mache eine Auswahl als echte Auswahl kenntlich.
  Eine aktivierte Plan-Karte invertiert Fläche, Text, Muted-Text und Radio zusammen.
  Beleg: `2096929195381457078.md`, Pro-Karte.
- Gib jedem Pricing-Tab echten Inhalt.
  Ein Basic-Tab ohne eigenes Panel ist funktionslos und muss entfallen.
  Beleg: `2096674796704813174.md`, Flowly Upgrade-Modal.
- Zeige einen Billing-Toggle nur bei Tiers, die beide Abrechnungsarten anbieten.
  Beleg: `refero-2.md`, Linear Pricing.
- Nenne Rabatt und Abrechnungsbasis zusammen.
  „Forever“ plus „Billed Yearly“ und „2 MONTH FREE“ widerspricht sich.
  Beleg: `aakib-tiles.md`, Pricing-Tabelle.
- Halte Feature-Icons innerhalb einer Tabelle gleich.
  Gerahmte und nackte Häkchen in derselben Liste erzeugen eine falsche Bedeutung.
  Beleg: `2096929195381457078.md`, Basic gegenüber Enterprise.
- Trenne Nutzen von Inventar.
  Im Kalender-Board markieren blaue Kreis-Checks Nutzen; graue Checks listen Pricing-Inventar.
  Beleg: `2096292759489609818.md`.
- Richte Preise und Featurezeilen tierübergreifend aus.
  Ungleiche Textlängen dürfen Preis und CTA nicht gegeneinander verschieben.
  Beleg: `refero-2.md`, Linear-Kopfzonen und Feature-Matrix.
- Isoliere eine variable Preisformel in einer Callout-Fläche.
  Beleg: `refero-2.md`, Stripe „Pay as you go“.
- Gib Enterprise einen konkreten nächsten Schritt.
  „Talk to sales“ ist eine Aktion; ein erfundener Preis ist es nicht.
  Beleg: `refero-2.md`, Linear-Abschluss-CTA und Stripe Enterprise-Modell.
- Stelle die Rechnung vor dem Pay-CTA sichtbar dar.
  Die Nexora-Sequenz führt Auswahl, Kosten und Aktion in dieser Reihenfolge.
  Beleg: `2096929195381457078.md`.
- Nutze Trust-Elemente nur für belegte Eigenschaften.
  Eine „Secure checkout“-Pill ohne PSP-Logo oder erklärten Schutz bleibt eine Behauptung.
  Beleg: `2096929195381457078.md`.
- Verkleinere eine breite Feature-Matrix auf Mobile nicht blind.
  Wechsle dort zu einem Tier-Tab mit vollständigem Panel je Tier.
  Das ist eine abgeleitete Umsetzung für das belegte Matrixproblem.
  Beleg: `refero-2.md`, Linear Feature-Matrix.

### FAQ löst Einwände am Offer

- Ordne Fragen nach Kaufbarrieren: Eignung, Umfang, Abrechnung, Wechsel, Kündigung, Support und Sicherheit.
  Der Corpus belegt FAQ als Abschnitt nach Pricing, nicht diese konkrete Reihenfolge.
  Diese Reihenfolge ist ein eigener Startwert und muss am ICP geprüft werden.
- Formuliere Fragen in der Sprache des ICP.
  Antworten nennen Bedingungen und Grenzen statt Marketing-Sätze.
- Nutze für lange Antworten ein echtes Accordion mit `details` und `summary`.
  Der Offen-Zustand braucht ein wechselndes Icon.
  Beleg: `2095928637346472339.md`.
- Nutze ein FAQ-Kachelgrid nur für kurze Antworten.
  Der Launchkit-Beleg zeigt Frage, kurze Antwort und aktive dunkle Kachel.
  Beleg: `aakib-tiles.md`, FAQ.
- Eine Hover-Kachel darf nicht der einzige Zugang zur Antwort sein.
  Tastatur und Touch brauchen denselben Inhalt ohne Hover-Abhängigkeit.
  Das ist die notwendige zugängliche Korrektur des gezeigten Kachelzustands.
  Beleg: `aakib-tiles.md`, FAQ-Aktivzustand.
- Verlinke „alle Fragen“ nur, wenn die Seite tatsächlich weitere Antworten enthält.
  Ein CTA ohne Ziel ist kein Trust-Element.

## Bauanleitungen

### Zustandsfläche

```html
<section class="results" aria-live="polite" aria-busy="false">
  <div class="state state--empty">
    <svg class="state__icon" aria-hidden="true"></svg>
    <h2>Noch keine Projekte</h2>
    <p>Erstelle dein erstes Projekt.</p>
    <button class="btn btn--primary">Projekt erstellen</button>
  </div>
</section>
```

```css
/* Alle Zahlen in diesem Snippet sind eigene Startwerte. */
.state {
  display: grid;
  justify-items: center;
  gap: 8px;
  padding: 48px 24px;
  text-align: center;
  border-block-end: 1px solid var(--line);
}
.state__icon { inline-size: 32px; block-size: 32px; color: var(--muted); }
.state p { max-inline-size: 42ch; color: var(--muted); }
```

Für „kein Treffer“ ändere Inhalt und Aktion.
Zeige die aktive Query im Text.
Biete „Suche löschen“ statt „Projekt erstellen“.
Die Trennung folgt `refero-2.md`.

### Skeleton und Pending

```html
<div class="field-skeleton" aria-hidden="true">
  <span class="skel skel--label"></span>
  <span class="skel skel--control"></span>
</div>
<button class="btn" aria-busy="true">
  <span class="btn__label">Speichern</span>
</button>
```

```css
/* Maße des Skeletons sind in refero-1.md gemessen; Spinner-Werte sind eigene Startwerte. */
.skel { display:block; background:#ececec; border-radius:4px; }
.skel--label { inline-size:70px; block-size:8px; margin-block-end:6px; }
.skel--control { block-size:26px; margin-block-end:12px; }
.btn { position:relative; min-inline-size:10ch; }
.btn[aria-busy="true"] .btn__label { visibility:hidden; }
.btn[aria-busy="true"]::after {
  content:"";
  position:absolute;
  inset:50% auto auto 50%;
  inline-size:16px;
  aspect-ratio:1;
  border:2px solid currentColor;
  border-inline-end-color:transparent;
  border-radius:50%;
  translate:-50% -50%;
  animation:spin .7s linear infinite;
}
@keyframes spin { to { rotate:1turn; } }
```

Respektiere `prefers-reduced-motion`.
Ein statischer Pending-Indikator reicht dann.

### Fehler und Success

```html
<div class="field" data-invalid="true">
  <label for="email">E-Mail</label>
  <input id="email" aria-invalid="true" aria-describedby="email-error">
  <p id="email-error" class="field__error">Prüfe die E-Mail-Adresse.</p>
</div>
<p class="success" role="status" tabindex="-1">Gespeichert.</p>
```

```css
/* Alle Zahlen in diesem Snippet sind eigene Startwerte. */
.field input { border:1px solid var(--line); }
.field[data-invalid="true"] label,
.field__error { color:var(--danger); }
.field input[aria-invalid="true"] {
  border-color:var(--danger);
  background:color-mix(in srgb,var(--danger) 12%,white);
  box-shadow:0 0 0 3px color-mix(in srgb,var(--danger) 20%,transparent);
}
.field__error { margin-block-start:8px; font-size:.875rem; }
.success { margin-block-start:12px; padding:12px; background:var(--success-soft); }
```

Setze Fokus nach Submit auf die Success-Meldung, wenn sie sonst außerhalb des Viewports liegt.
Das korrigiert das in `refero-1.md` dokumentierte Fold-Problem.

### Zahlen-Proof

```html
<figure class="metric">
  <strong class="metric__value">24&nbsp;%</strong>
  <figcaption>
    weniger Abbrüche bei Bestandskunden,
    <time datetime="2026-08">August 2026</time>,
    <a href="/methodik">Methodik und Grundgesamtheit</a>
  </figcaption>
</figure>
```

Die Beispielzahl ist ein eigener Startwert und darf nicht veröffentlicht werden.
Ersetze sie durch einen gemessenen Outcome.
Nenne Definition, Zeitraum und Quelle direkt am Wert.

```css
/* Alle Zahlen in diesem Snippet sind eigene Startwerte. */
.metric { display:grid; gap:8px; }
.metric__value { font-size:clamp(2.5rem,6vw,5rem); line-height:.95; }
.metric figcaption { max-inline-size:52ch; color:var(--muted); }
```

### Logo-Leiste

```html
<section class="logo-proof" aria-labelledby="logo-proof-title">
  <h2 id="logo-proof-title">Im Einsatz bei diesen Produktteams</h2>
  <ul class="logos">
    <li><img src="/logos/kunde-a.svg" alt="Kunde A"></li>
    <li><img src="/logos/kunde-b.svg" alt="Kunde B"></li>
    <li><img src="/logos/kunde-c.svg" alt="Kunde C"></li>
  </ul>
</section>
```

```css
/* Alle Zahlen in diesem Snippet sind eigene Startwerte. */
.logos {
  display:grid;
  grid-template-columns:repeat(3,minmax(0,1fr));
  border-block:1px solid var(--line);
}
.logos li { min-block-size:96px; display:grid; place-items:center; padding:20px; }
.logos li + li { border-inline-start:1px solid var(--line); }
.logos img { max-inline-size:128px; max-block-size:28px; filter:grayscale(1); }
```

Verwende keinen Logo-Namen, den das Asset nicht zeigt.
Entferne Platzhalter vor Veröffentlichung.

### Testimonial als Mini-Fall

```html
<figure class="quote">
  <blockquote>
    „Nach dem Wechsel sank unsere Übergabezeit von [Ausgangswert] auf [Outcome].“
  </blockquote>
  <figcaption>
    <img src="/people/name.webp" alt="">
    <span><strong>Name</strong><small>Rolle, Organisation</small></span>
    <a href="/kundenfall">Kundenfall lesen</a>
  </figcaption>
</figure>
```

```css
/* Alle Zahlen in diesem Snippet sind eigene Startwerte. */
.quote { display:grid; gap:32px; padding:32px; background:var(--surface); }
.quote blockquote { max-inline-size:38ch; font-size:clamp(1.25rem,2vw,1.75rem); line-height:1.3; }
.quote figcaption { display:flex; align-items:center; gap:12px; }
.quote img { inline-size:36px; aspect-ratio:1; border-radius:50%; object-fit:cover; }
.quote small { display:block; color:var(--muted); }
.quote a { margin-inline-start:auto; }
```

Ausgangswert und Outcome sind Platzhalter.
Veröffentliche sie nur nach Freigabe durch die zitierte Person.

### Pricing-Auswahl

```html
<form class="plans">
  <label class="plan">
    <input type="radio" name="plan" value="basis">
    <span class="plan__copy"><strong>Basis</strong><small>Für Einzelpersonen</small></span>
    <span class="plan__price"><strong>Preis</strong><small>pro Monat</small></span>
  </label>
  <label class="plan">
    <input type="radio" name="plan" value="pro" checked>
    <span class="plan__copy"><strong>Pro</strong><small>Für kleine Teams</small></span>
    <span class="plan__price"><strong>Preis</strong><small>pro Monat</small></span>
  </label>
</form>
```

```css
/* Alle Zahlen in diesem Snippet sind eigene Startwerte. */
.plans { display:grid; gap:16px; }
.plan {
  display:grid;
  grid-template-columns:auto 1fr auto;
  align-items:start;
  gap:12px;
  padding:24px;
  border:1px solid var(--line);
  border-radius:14px;
  background:var(--surface);
  color:var(--ink);
}
.plan:has(input:checked) {
  background:var(--ink);
  color:var(--page);
  border-color:transparent;
}
.plan small { display:block; margin-block-start:4px; color:var(--muted); }
.plan:has(input:checked) small { color:color-mix(in srgb,var(--page) 72%,transparent); }
.plan:focus-within { box-shadow:0 0 0 3px color-mix(in srgb,var(--action) 50%,transparent); }
```

Die Vollflächen-Inversion folgt `2096929195381457078.md`.
Die konkreten Snippet-Maße sind eigene Startwerte.

### Pricing-Matrix mit Mobile-Tiers

```html
<section class="pricing" aria-labelledby="pricing-title">
  <h2 id="pricing-title">Wähle das passende Offer</h2>
  <div class="tier-tabs" role="tablist" aria-label="Tarife">
    <button role="tab" aria-selected="true" aria-controls="tier-pro">Pro</button>
    <button role="tab" aria-selected="false" aria-controls="tier-team">Team</button>
  </div>
  <article id="tier-pro" role="tabpanel">
    <h3>Pro</h3>
    <p><strong>Preis</strong> pro Monat</p>
    <ul><li>Enthaltenes Feature</li></ul>
    <a class="btn btn--primary" href="/start">Starten</a>
  </article>
</section>
```

```css
/* Alle Zahlen in diesem Snippet sind eigene Startwerte. */
.tier-tabs { display:none; }
@media (max-width:48rem) {
  .tier-tabs { display:grid; grid-template-columns:repeat(2,1fr); padding:3px; }
  [role="tab"] { min-block-size:44px; }
  [role="tab"][aria-selected="true"] { background:var(--ink); color:var(--page); }
  [role="tabpanel"][hidden] { display:none; }
}
```

Jeder Tab braucht ein eigenes Panel.
Teste vollständige Featurelisten, nicht nur andere Labels.

### FAQ-Accordion

```html
<div class="faq">
  <details>
    <summary>
      Kann ich den Tarif wechseln?
      <span class="faq__icon" aria-hidden="true">+</span>
    </summary>
    <p>Ja. Der Wechsel gilt ab dem klar genannten Abrechnungszeitpunkt.</p>
  </details>
</div>
```

```css
/* Alle Zahlen in diesem Snippet sind eigene Startwerte. */
.faq details { border-block-end:1px solid var(--line); }
.faq summary { display:flex; justify-content:space-between; gap:24px; padding-block:20px; cursor:pointer; }
.faq__icon { transition:rotate .2s ease; }
.faq details[open] .faq__icon { rotate:45deg; }
.faq details > p { max-inline-size:68ch; padding-block-end:20px; color:var(--muted); }
@media (prefers-reduced-motion:reduce) { .faq__icon { transition:none; } }
```

Das Plus rotiert und zeigt den Zustand.
Ein identisches Sparkle pro Zeile wäre das Gegenbeispiel aus `2095928637346472339.md`.

## Varianten je Stilfamilie

### Präzise helle SaaS-Fläche

- Nutze weiße Flächen, feine Linien und einen dunklen CTA.
- Zeige Empty States mit kleinem Outline-Icon und direkter Aktion.
- Setze Logos monochrom in eine ruhige Zeile.
- Hebe den gewählten Tier per Ink-Inversion hervor.
- Belegfamilie: `refero-2.md` Mocha, `2096929195381457078.md` Nexora.

### Dunkles Produkt-System

- Nutze wenige Luma-Stufen statt bunter Karten.
- Hebe einen Featured-Tier durch Raised-Fläche und Versatz hervor.
- Nutze Akzentfarbe nur für Checks und Toggle.
- Halte Status als Punkt plus Wort oder getönte Pill konsistent.
- Belegfamilie: `refero-2.md` Linear, `2096499167225078020.md`, `2096891182701793331.md`.

### Editoriales Proof-System

- Nutze eine große Stimme und klare Attribution.
- Setze eine Serif für Zitat oder Outcome, Sans für Metadaten.
- Kombiniere die Hauptstimme nur bei realem Material mit kleineren Fällen.
- Belegfamilie: `2096832279775486079.md`, `2096292759489609818.md`.

### Technisches Raster-System

- Nutze Linien, Zellen und kantige Karten.
- Platziere Logos oder Pricing als Matrix.
- Zeige FAQ als offene Kacheln nur bei kurzen Antworten.
- Halte aktive Kachel und Tastaturzustand identisch erreichbar.
- Belegfamilie: `aakib-tiles.md`, `2095863741250474026.md`.

### Ruhiges Commerce-System

- Schließe den Checkout-Kontext ohne unnötige Navigation.
- Zeige Auswahl, Summe, Trust und Pay-CTA als lineare Beweiskette.
- Nutze fremde Markenfarben nur in echten Payment-Logos.
- Belegfamilie: `2096929195381457078.md`.

## Dos

- Schreibe Empty-State-Copy passend zur Ursache.
- Biete genau die Aktion an, die den leeren Zustand beendet.
- Bewahre CTA-Breite beim Loading.
- Verknüpfe Fehlertext mit dem Feld.
- Melde Success mit `role="status"`.
- Gib Selected zusätzlich semantisch an.
- Nenne bei Proof-Zahlen Quelle, Zeitraum und Definition.
- Unterscheide Kundenlogos von Integrationslogos.
- Nenne bei Testimonials Person, Rolle und Organisation.
- Verlinke bei starken Outcome-Claims zum Kundenfall.
- Zeige Preisbasis und Billing-Intervall direkt am Preis.
- Richte Tier-Köpfe, Preise, CTAs und Featurezeilen aus.
- Verwende pro Featureliste einen Check-Stil.
- Gib jedem Pricing-Tab ein echtes Panel.
- Zeige FAQ-Zustand mit wechselndem Icon.
- Schreibe Antworten, die Grenzen offen nennen.

## Don'ts

- Zeige nicht „No apps yet“, wenn eine aktive Suche nur keine Treffer liefert.
  Gegenbeispiel: `refero-2.md`, Mocha-Suche mit Query und „No apps yet“.
- Lass einen Pending-CTA nicht schmaler werden.
  Gegenregel: `prior_corpus.md`, Label unsichtbar halten und Spinner überlagern.
- Nutze Disabled nicht als einzige Erklärung nach einem fehlgeschlagenen Submit.
  Gegenbeleg: `refero-1.md` zeigt Feld, Wert und Fehlerzeile zusammen.
- Zeige keinen vollständigen Fortschritt vor erfolgreichem Submit.
  Gegenbeispiel: `2096192737867350330-video-2.md`, `second-28.jpg`.
- Nutze nicht dieselbe Fläche für Hover und Selected.
  Gegenbeispiel: `2096192737867350330.md`, Time Slot.
- Stelle Zustand und Aktion nicht als identischen Button dar.
  Gegenbeispiel: `2096833304351961505.md`, „Completed“ und „Review“.
- Verwende keinen Sparkle als Accordion-Indikator.
  Gegenbeispiel: `2095928637346472339.md`, drei identische Icons.
- Publiziere keine Logoipsum-Wand.
  Gegenbeispiel: `2095874058697293985.md`, fünf Platzhalterlogos.
- Nenne OpenAI nicht Codex, wenn nur das OpenAI-Zeichen vorliegt.
  Gegenbeispiel: `2096292759489609818.md`, Logostrip.
- Färbe keine unbelegte Zahl orange, um sie wahr wirken zu lassen.
  Gegenbeispiel: `2095874058697293985.md`, „1000+“ und „90+“.
- Nutze keine Sterne ohne Plattform, Skala und Bewertungsmenge als Proof.
  Gegenbeispiel: `aakib-tiles.md`, Sterne ohne Quelle.
- Verkleinere Testimonials nicht bis zur Unlesbarkeit.
  Gegenbeispiel: `2096292759489609818.md`, rechte Kartenwand.
- Nenne einen Checkout nicht „secure“, wenn der Schutz nicht erklärt oder belegt ist.
  Gegenbeispiel: `2096929195381457078.md`, Trust-Pill.
- Mische keine gerahmten und nackten Checks im selben Pricing-Inventar.
  Gegenbeispiel: `2096929195381457078.md`, Basic gegenüber Enterprise.
- Zeige keinen Billing-Rabatt bei einem Forever-Preis.
  Gegenbeispiel: `aakib-tiles.md`, „Forever“ plus Jahresabrechnung.
- Übernimm keine Feature-Copy aus einem fremden Produkt.
  Gegenbeispiel: `2096292759489609818.md`, Finanz-App-Features im Kalender-Pricing.
- Schrumpfe keine breite Feature-Matrix unverändert auf Mobile.
  Gegenbeispiel: `refero-2.md`, Linear-Matrix ohne mobile Zeilenköpfe.
- Entferne keine Captions auf Mobile, wenn sie den Proof erklären.
  Gegenbeispiel: `2096149200178418026.md`, Projektgalerie.

## Gilt nicht wenn

- Nutze keinen Empty State, solange Daten noch laden.
  Zeige zuerst Skeleton oder Pending.
- Nutze kein Skeleton für eine atomare Aktion, deren Dauer sehr kurz und stabil ist.
  Halte trotzdem den zugänglichen Pending-Zustand bereit.
- Deaktiviere keinen CTA für optionale Eingaben.
  Biete einen klaren Skip an.
- Nutze keine Success-Seite, wenn die Aktion im Kontext weitergeführt werden muss.
  Ein Inline-Status ist dann passender.
- Zeige keine Kundenlogos ohne Nutzungsrecht.
  Ersetze sie durch anonymisierte, belegte Outcomes oder freigegebene Zitate.
- Nutze keine Avatar-Wand, wenn die Personen nicht echt oder nicht freigegeben sind.
- Zeige keine Proof-Zahl, deren Definition intern strittig ist.
  Kläre die Definition zuerst.
- Verwende keine Sterne für qualitative Einzelstimmen.
  Zitat und Attribution reichen.
- Baue keine Pricing-Vergleichsmatrix für ein einziges Offer.
  Zeige Preis, Umfang und CTA direkt.
- Markiere keinen Tier als „beliebt“, wenn keine belastbare Auswahlverteilung vorliegt.
  „Empfohlen für [ICP]“ ist zulässig, wenn die Eignung erklärt wird.
- Verwende keinen Billing-Toggle, wenn sich nur der Text, nicht aber Preis oder Vertrag ändert.
- Nutze kein FAQ-Grid für lange rechtliche oder sicherheitsrelevante Antworten.
  Verlinke eine vollständige Erklärung und fasse die Konsequenz kurz zusammen.
- Verstecke kritische Preisbedingungen nicht im FAQ.
  Sie gehören direkt an Preis und CTA.

## Quellen

- `../studies/design-depth/deep/2095383602431459523.md` — Chart-Highlight ohne Wertlabel.
- `../studies/design-depth/deep/2095783930775433616.md` — Status nicht nur über Farbe.
- `../studies/design-depth/deep/2095874058697293985.md` — unbelegte Zahlen und Logoipsum.
- `../studies/design-depth/deep/2095928637346472339.md` — Accordion-Icon und Zitat-Attribution.
- `../studies/design-depth/deep/2096149200178418026.md` — Captions als Projekt-Proof.
- `../studies/design-depth/deep/2096175237109092642-video-1.md` — fehlende Tooltip- und Copy-Rückmeldung.
- `../studies/design-depth/deep/2096192737867350330.md` — Pflichtfeld, optionales Feld und Slot-Zustände.
- `../studies/design-depth/deep/2096192737867350330-video-2.md` — falscher vollständiger Fortschritt.
- `../studies/design-depth/deep/2096292759489609818.md` — Proof-Kette, Logos, Pricing und Testimonials.
- `../studies/design-depth/deep/2096499167225078020.md` — Status als Punkt plus Wort.
- `../studies/design-depth/deep/2096618423983964587.md` — Auswahl per Sättigungssprung.
- `../studies/design-depth/deep/2096674796704813174.md` — funktionsloser Pricing-Tab.
- `../studies/design-depth/deep/2096832279775486079.md` — Editorial-Proof und unbelegte Stats.
- `../studies/design-depth/deep/2096833304351961505.md` — Status und Aktion trennen.
- `../studies/design-depth/deep/2096891319843164276.md` — Tooltip per Hover und Fokus.
- `../studies/design-depth/deep/2096929195381457078.md` — Plan-Auswahl, Checkout-Trust und Social Proof.
- `../studies/design-depth/deep/aakib-tiles.md` — Logo-Wand, Pricing-Tabelle, Testimonials und FAQ.
- `../studies/design-depth/deep/mobbin-2.md` — Success-Screen und Hinweisbanner.
- `../studies/design-depth/deep/refero-1.md` — Skeleton, Fehler und Inline-Success.
- `../studies/design-depth/deep/refero-2.md` — Mocha Empty State, Linear Pricing und Stripe Pricing.
- `../studies/design-depth/deep/shadcn.md` — Fokus- und Invalid-Muster.
- `../studies/design-depth/deep/twentyfirst.md` — semantischer Trigger-Zustand.
- `../studies/design-depth/deep/layers.md` — Auswahl per Outline-Ring.
- `../studies/design-depth/deep/prior_corpus.md` — Pending-Button und stabiler CTA.

Alle vom Auftrag genannten Einzelanalysen wurden für den Corpus-Abgleich gelesen.
Nur die oben genannten Dateien tragen direkte Regeln dieses Kapitels.
