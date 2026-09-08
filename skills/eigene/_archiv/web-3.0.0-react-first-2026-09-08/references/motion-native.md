# Emil Kowalski Motion für MAKE Web Astra

Referenzmodul für HTML/CSS, Vanilla JavaScript und gezielte Astro-Inseln. Stand: 2026-09-07.

Lade dieses Modul beim Bau einer Website-Interaktion. Es liefert die Web-Umsetzung der vorhandenen Motion-Doktrin. Für Begriffe, Designbegründungen und umfassende Audits gelten die verlinkten Design-Referenzen. Die Codebeispiele teilen die Tokens aus Beispiel C01; ihre Klassen und Bezeichner sind Englisch.

## 1. Quelle, Lesenumfang und Lizenz

- Quelle: [attentiondotnet/emilkowalski_skills](https://github.com/attentiondotnet/emilkowalski_skills/tree/f76beceb7d3fc8c43309cefad5a095a206103a4e/skills).
- Gelesener Commit: `f76beceb7d3fc8c43309cefad5a095a206103a4e`, Commit-Datum `2026-07-09T17:12:50+02:00`, Nachricht `Fix nits`.
- Lokale Quellenkopie: [assets/vendor/emilkowalski-skills/](../assets/vendor/emilkowalski-skills/). Clone wie beauftragt mit `gh repo clone attentiondotnet/emilkowalski_skills /root/eingang/ausgang/web-erweiterung-2026-09-07/motion/vendor-emilkowalski -- --depth 1`.
- Lizenz: **MIT**, `Copyright (c) 2026 Emil Kowalski`. [Unveränderte LICENSE](../assets/vendor/emilkowalski-skills/LICENSE); vollständiger Lizenztext am Ende dieses Moduls. Beim Weitergeben bearbeiteter wesentlicher Teile den Hinweis und die Erlaubnis erhalten.
- Vollständig gelesen: alle **4 SKILL.md**, die einzige weitere Referenzdatei **STANDARDS.md**, README und LICENSE. Unter `skills/` liegen insgesamt 5 Dateien mit 1'434 Zeilen. Externe Kurse und WWDC-Videos gehören nicht zu diesem Dateikorpus.

### Skill-Übersicht

| Skill | Datei im Snapshot | Zweck | Einsatz in MAKE Web Astra |
|---|---|---|---|
| `animation-vocabulary` | [SKILL.md](../assets/vendor/emilkowalski-skills/skills/animation-vocabulary/SKILL.md) | Beschriebene Effekte ihren Fachbegriffen zuordnen | Vor der Umsetzung Begriff klären; bestehendes Glossar verwenden |
| `emil-design-eng` | [SKILL.md](../assets/vendor/emilkowalski-skills/skills/emil-design-eng/SKILL.md) | Motion auswählen und Komponenten ausarbeiten | Dauer, Easing, Eingabefeedback, Transitions, Gesten und Performance |
| `review-animations` | [SKILL.md](../assets/vendor/emilkowalski-skills/skills/review-animations/SKILL.md), [STANDARDS.md](../assets/vendor/emilkowalski-skills/skills/review-animations/STANDARDS.md) | Gezieltes Motion-Review mit zehn Standards und begründetem Urteil | Review der implementierten Interaktion; `file:line` und Vorher/Nachher-Tabelle |
| `apple-design` | [SKILL.md](../assets/vendor/emilkowalski-skills/skills/apple-design/SKILL.md) | Direkte Manipulation, unterbrechbare Physik, Materialien und Designprinzipien | Nur bei Gesten, Sheets, Springs oder ausdrücklich gewünschtem Apple-Stil vertiefen |

Die Kurs-Begrüssung aus `emil-design-eng` und dessen Vorgabe, zunächst keine Arbeit zu leisten, gehören zum Quellskill. MAKE Web Astra übernimmt diese Dialogsteuerung nicht. `review-animations` trägt `disable-model-invocation: true`; das ist Metadatenverhalten des Quellskills, keine automatische Aktivierung dieses Moduls.

### Was im Fork anders ist

Vergleichsbasis des installierten Bestands: `emilkowalski/skills@6bf24434f7730ad169077756cf9c7cd7bd675fc6`, Commit-Datum `2026-07-15T14:51:34Z`. Die GitHub-API führt das attentiondotnet-Repository mit `fork: false`; hier bezeichnet «Fork» die vom Auftrag benannte Kopie. Eine von GitHub ausgewiesene Parent-Beziehung existiert nicht.

Der Blobvergleich und der vollständige Diff ergeben **keine neuen fachlichen Animationsregeln**. Bei den Easing-Kurven und den Zeitbudgets gibt es ebenfalls keine Abweichung vom festgehaltenen Originalcommit.

| Datei | Exakter Unterschied gegenüber dem Originalstand |
|---|---|
| `animation-vocabulary/SKILL.md` | Bytegleich; Git-Blob `cd0af50454bfe33a1e8c4ea24cc0c3c737d0f5e0` |
| `apple-design/SKILL.md` | Bytegleich; Git-Blob `66f56807cb503fd482b86c4e0aaee5a080918242` |
| `emil-design-eng/SKILL.md` | Bytegleich; Git-Blob `4911235325272b124f1f298b9040e7f539a03b34` |
| `review-animations/SKILL.md`, Zeile 13 | Original: `senior design engineer`; Fork: `senior motion-design reviewer`. Die restliche Datei ist gleich. |
| `review-animations/STANDARDS.md`, Zeile 3 | Der Fork ergänzt den Link `([animations.dev](https://animations.dev/))`. Die restliche Datei ist gleich. |
| `find-animation-opportunities/` | Im Original vorhanden; fehlt im Fork |
| `improve-animations/` | Im Original mit `SKILL.md`, `AUDIT.md` und `PLAN-TEMPLATE.md` vorhanden; fehlt im Fork |

Der Fork-Snapshot ist älter als die installierte Originalbasis. Sein geringerer Umfang erweitert den bestehenden Audit-Workflow nicht. Die implementierungsbezogenen Ergänzungen dieses Moduls sind **MAKE-Adaptionen**, ausdrücklich keine Neuerungen von attentiondotnet.

### Zuständigkeit der vorhandenen Design-Dateien

Alle vier Dateien und die Inselreferenz wurden vollständig gelesen.

| Vorhandene Referenz | Dort belassen | Ergänzung dieses Moduls |
|---|---|---|
| [animation-vokabular.md](/root/.claude/skills/design/references/animation-vokabular.md) | Vollständiges Reverse-Lookup-Glossar; Haupttext identisch zum Fork | Fachbegriffe gezielt auf native Browser-APIs abbilden; kein zweites Glossar |
| [motion-doktrin.md](/root/.claude/skills/design/references/motion-doktrin.md) | Begründungen, Frequenz-Gate, Wertekatalog und zehn Review-Standards | Ausführbare HTML/CSS/JS-Muster, Browser-Fallbacks und Auflösung technischer Pauschalaussagen |
| [motion-audit-workflow.md](/root/.claude/skills/design/references/motion-audit-workflow.md) | Vier Vorschlagsfragen, abgelehnte Kandidaten, acht Audit-Kategorien | Tests für native Zustandswechsel und Abbruchfälle; Workflow unverändert erhalten |
| [apple-fluid-interfaces.md](/root/.claude/skills/design/references/apple-fluid-interfaces.md) | Gestenphysik, Materialien, Typografie, acht Designprinzipien; Haupttext identisch zum Fork, Überschrift lokal angepasst | Einheiten, API-Grenzen und Entscheidung zwischen CSS-Annäherung und Motion-Insel |
| [component-islands.md](component-islands.md) | HTML-first, Hydration, Provider, Portale, Fallbacks und Kostenmessung | Motion-spezifische Einbauentscheidung in Abschnitt 6 |

Die kurzen Wertetabellen hier sind für die Beispiele nötig. Bei weiteren Designfragen die zuständige Datei laden. Die absoluten Bestandslinks gelten in dieser Arbeitsumgebung; beim Einbau in eine andere Installation diese Verweise auf deren Referenzpfade setzen.

## 2. Verbindliche Regeln und ihre native Umsetzung

Quellkürzel: **E** = `emil-design-eng/SKILL.md`, **S** = `review-animations/STANDARDS.md`, **A** = `apple-design/SKILL.md`. Abschnittsnamen stehen in den jeweiligen Quelldateien. **MAKE** kennzeichnet hier festgelegte Implementierungsentscheidungen.

### Dauer und Easing

| Einsatz | Quellbudget aus E/S «Duration» | MAKE-Startwert für die Website |
|---|---|---|
| Press-Feedback | 100–160 ms | 120 ms, Scale 0.97 |
| Tooltip, kleines Popover | 125–200 ms | 160 ms; nach erstem Tooltip im Cluster ohne Delay und Animation |
| Dropdown, Select | 150–250 ms | 180 ms |
| Modal, Drawer | 200–500 ms | 240 ms hinein, 160 ms hinaus; längere UI-Motion begründen |
| Erklärende Marketing-Sequenz | Darf länger sein | Nach Inhalt bemessen, Wiedergabe steuerbar halten |
| Stagger | 30–80 ms zwischen Elementen | 50 ms, höchstens 150 ms Gesamtdelay im Beispiel |
| Bewusstes Halten | 2 s linear, Rücknahme 200 ms ease-out | Nur bei ausdrücklichem Produktbedarf; zugängliche Alternative anbieten |

**Quellkonflikt Dauer:** E/S erlauben 200–500 ms für Modal/Drawer und fordern zugleich UI unter 300 ms. MAKE startet bei 240 ms. Ab 300 ms braucht die konkrete Interaktion einen dokumentierten Grund. Die 400-ms-Toast- und 300-ms-Stagger-Beispiele der Quelle sind keine allgemeinen Defaults.

### C01 · Gemeinsame Tokens

```css
:root {
  --motion-out: cubic-bezier(0.23, 1, 0.32, 1);
  --motion-in-out: cubic-bezier(0.77, 0, 0.175, 1);
  --motion-drawer: cubic-bezier(0.32, 0.72, 0, 1);
  --motion-hover: ease; /* cubic-bezier(0.25, 0.1, 0.25, 1) */
  --motion-press: 120ms;
  --motion-small: 160ms;
  --motion-menu: 180ms;
  --motion-enter: 240ms;
  --motion-exit: 160ms;
}
```

`ease-out` aus dem Quelltext bedeutet für bewusste Ein-/Austritte den starken Token `--motion-out`. Nutze `--motion-in-out` für sichtbare Bewegung zwischen zwei Positionen. `ease` bleibt für kleine Farb-/Hoverwechsel zulässig. `linear` passt zu konstanter Rotation oder gemessenem Fortschritt. Ein Fortschrittsbalken darf keinen erfundenen Ladefortschritt zeigen.

### Regel → HTML/CSS/Vanilla JS

| ID | Konkrete Vorgabe | Native Übersetzung und Beispiel | Quelle |
|---|---|---|---|
| R01 | Zweck und Häufigkeit vor jeder Animation festlegen. Bei 100+/Tag, Shortcuts und Command-Palette sofort wechseln. Häufiges Listenlesen kaum oder gar nicht animieren. | Zustandsänderung ohne Delay ausführen; Keyboard-/Assistenzaktivierung in C02–C04 und C08 sofort behandeln. Rein dekorative Daten-, Zähler- und Textanimation weglassen. | E/S «Should it animate?» |
| R02 | UI unter 300 ms halten; Unterschiede nach Element aus der Tabelle wählen. | CSS-Zeittokens in C01; WAAPI erhält Millisekunden. Status und Navigation warten nie auf ein dekoratives Ende. | E/S «Duration» |
| R03 | Enter/Exit starkes Ease-out; sichtbare Ortswechsel Ease-in-out; kleine Hover-/Farbwechsel `ease`; konstante Bewegung `linear`. Kein träger Ease-in-Start auf UI. | Exakte Cubic-Bezier-Tokens C01, CSS-Transitions C03/C04 und WAAPI C05. | E/S «Easing» |
| R04 | Eintritt mit Opacity und Scale 0.9–0.97; kein Scale 0. Popover am Trigger verankern, Modal zentrieren. Ein-/Austritt an derselben Kante führen. | `transform-origin`, `@starting-style`, `translateY(100%)` für eigene Elementhöhe. C03/C04; einen verschobenen Popover-Origin aus Trigger-/Panel-Rechtecken berechnen. | E/S «Physicality», A §7 |
| R05 | Wiederholte Toggles vom sichtbaren Zwischenstand umleiten. Keine Eingabesperre während Motion. | CSS-Transitions für zwei Zustände; WAAPI in C05 liest den aktuellen Stil vor `cancel()`. Ein neu gestartetes Keyframe-Programm garantiert keinen kontinuierlichen Anschluss. | E/S «Interruptibility», A §3 |
| R06 | Geschwindigkeit bei echter Gestenphysik erhalten. Standard ohne Bounce; Momentum darf leicht überschwingen. | CSS `linear()` in C10 nur für vorbestimmte Annäherungen. Motion/physikalischer Solver für Velocity-Handoff und Re-Targeting, Abschnitt 6. | E/S «Springs», A §§3–6 |
| R07 | Animierte Eigenschaften explizit nennen. Standard ist `transform` und `opacity`; kein `transition: all`. | C01–C07; Zustandslayout einmal ändern. Eine Height-/Grid-Animation ist eine zu messende Ausnahme. Für visuelle Ortswechsel FLIP oder View Transitions prüfen. | E/S «Performance» |
| R08 | Reduced Motion entfernt selbstlaufende Verschiebung, Scale, Parallax, Overshoot und Stagger. Feedback bleibt als Text, Farbe oder kurze Opacity-Änderung verfügbar. | CSS pro Komponente und `matchMedia()` in C04–C08; laufende WAAPI-Motion beim Präferenzwechsel beenden. Statischer Wechsel ist zulässig. | E/S «Accessibility», A §14 |
| R09 | Hover-Motion nur für präzisen Pointer. Feedback beginnt beim Drücken; Aktion bestätigt regulär beim Aktivieren. | `@media (hover: hover) and (pointer: fine)`, native `button`/`a`, `:active`, `:focus-visible`; C02/C06. | E «Buttons», «Touch device hover», A §1 |
| R10 | Nur die bewusste Entscheidungsphase langsam machen. Reaktion auf Abbruch oder Loslassen kurz halten. | Overlay mit `scaleX()` statt Layoutbreite, C11. Native Dialog-Exit in C04 ist kürzer; gewöhnliche Toggles brauchen kein künstliches 2-s-Enter. | E/S «Asymmetric timing» |
| R11 | Tooltips nach dem ersten offenen Nachbarn sofort zeigen. | Gemeinsamer Tooltip-Gruppenstatus setzt `data-instant`; CSS `transition-duration: 0ms; transition-delay: 0ms`. Fokus, Escape, Hoverbarkeit und `aria-describedby` behalten. | E «Tooltips» |
| R12 | Gruppen bei begründetem Erst-Reveal mit 30–80 ms staffeln; keine Pflichtanimation für jede Gruppe. | `IntersectionObserver` + begrenzter WAAPI-Delay in C07. Inhalt bleibt im HTML; keine unsichtbaren fokussierbaren Links warten lassen. | E/S «Stagger» |
| R13 | Geste folgt Pointer 1:1, respektiert Griffposition, zusätzliche Pointer verändern sie nicht. | Pointer-ID, Capture, `pointercancel`, `lostpointercapture`, achsengerechtes `touch-action`; C12. Keine Spring-Verzögerung während direkter Manipulation. | A §§2, 10; E «Gestures» |
| R14 | Release nach jüngster Geschwindigkeit und Bewegungsrichtung auswerten. Grenze gibt zunehmend nach. | Pixel und Sekunden sauber trennen; Projektions-/Rubberband-Funktionen C12. Velocity-Schwellwert der Quelle ist 0.11 px/ms = 110 px/s. | E «Momentum dismissal», A §§5, 6, 9 |
| R15 | Pro Frame nur lokale Werte schreiben; Layout lesen und schreiben getrennt halten. | `element.style.transform` direkt; kein geerbter CSS-Variablenwert am grossen Parent für jeden Drag-Schritt. rAF bündelt Pointer-Updates. `will-change` nur kurz vor/während gemessener Animation. | E/S «Performance», A §11 |
| R16 | Blur und Clip nur gezielt einsetzen. | C11 zeigt `clip-path`, die bevorzugte Hold-Alternative verwendet Transform. Blur zunächst 2 px, animiert unter 20 px; auf echten Geräten messen. | E/S «Masking imperfect crossfades», «clip-path» |
| R17 | Materialien müssen lesbar bleiben; Motion ist kein Grund für Glas auf jeder Navbar. | `prefers-reduced-transparency` und `prefers-contrast` in C13; Typografie und Designgrundlagen verbleiben in `apple-fluid-interfaces.md`. | A §§12, 14–16 |
| R18 | Selbstlaufende Schleifen sparsam, pausierbar und ausserhalb des Viewports inaktiv halten. | `animation-play-state`, `visibilitychange`, C13; statischer Ersatz bei Reduced Motion. Keine grossflächigen Parallax-Flächen oder langsamen dauernden Schwingungen. | A §14; E «Sonner Principles» |
| R19 | Fehler und Erfolg sofort semantisch mitteilen. | Beständiges `role="status"`, Fehlertext mit `aria-describedby`/`aria-invalid`; C09. Shake, Konfetti und Sound sind keine Voraussetzung zum Verstehen. | A §§13, 16 |
| R20 | Wirkung mit Zwischenständen und unter Last prüfen. | C14-Checkliste; Slow Motion 2–5×, schnelle Umkehr, Keyboard, Reduced Motion, Fokus und echte Touchgeräte. Reviewformat aus `motion-doktrin.md`. | E/S «Debugging», A §17 |

### Technische Konflikte der Quelle auflösen

1. **GPU ist keine API-Garantie.** CSS, WAAPI oder ein voller Transform-String garantieren allein keine Compositor-Ausführung. Eigenschaft, Effektkombination, Browser und Layer entscheiden. `clip-path`, `filter` und `backdrop-filter` sind trotz Quellbeispielen keine pauschalen GPU-Ausnahmen. Transform/Opacity sind der Ausgangspunkt für Messungen.
2. **Motion-Shorthands sind versionsabhängig.** Die pauschale Aussage über `x`/`y`/`scale` beschreibt konkrete Implementierungen. Prüfe die verwendete Motion-Version und den gewählten Animationspfad. rAF kann compositorfähige Eigenschaften schreiben, obwohl die Berechnung auf dem Main Thread läuft.
3. **Transitions lassen sich umleiten.** Die pauschale Ablehnung in A §3 betrifft frei greifbare Gesten mit Velocity-Handoff. Für CSS-Zustandstoggles gilt E/S: Transitions setzen am sichtbaren Zwischenwert an. Ihre Geschwindigkeit kann dabei wechseln; eine physikalisch kontinuierliche Feder ist ein eigener Bedarf.
4. **Reduced Motion hat Vorrang vor Transform-/Stagger-Vorschriften.** Der Review-Trigger gegen reine Fade-Entrances widerspricht der zulässigen Opacity-Alternative. MAKE erlaubt Fade oder sofortigen Wechsel, insbesondere für Accessibility und häufige Bedienung. Eine komplett statische Rückmeldung ist ebenfalls gültig.
5. **Mirror-Easing gilt begrenzt.** A §7 fordert gespiegelte Kurven, E/S verlangen Ease-out auch beim Exit. MAKE verwendet responsives Ease-out in beiden Richtungen. Nur eine bewusst zeitumgekehrte Sequenz erhält die inverse Kurve `cubic-bezier(1-x2, 1-y2, 1-x1, 1-y1)`; bei freier Geste trägt die Feder die Umkehr.
6. **Spring-Parameter sind nicht austauschbar.** Apples Dämpfungsverhältnis 1.0 ist dimensionslos. Motion-`damping: 1` ist ein physikalischer Koeffizient und erzeugt keine kritisch gedämpfte Standardfeder. Näherung über `bounce: 0`; physikalisch gilt `damping = 2 * sqrt(stiffness * mass)` für kritische Dämpfung. Apples `response`, Motion-`duration` und `visualDuration` haben unterschiedliche Semantik.
7. **Quellgesten brauchen Einheiten und Vorzeichen.** Der Durchschnitt `abs(distance)/elapsedMs` verliert die letzte Bewegungsrichtung. Für reale Sheets jüngste Samples und gerichtete px/s verwenden; bei `pointercancel` niemals destruktiv bestätigen. Quellwerte bleiben Ausgangspunkte zum Testen.
8. **A11y ist Voraussetzung.** Die Quellhierarchie führt Accessibility erst nach anderen Korrekturen auf. MAKE prüft Bedienbarkeit und Präferenzen vor dekorativer Verfeinerung. Audio/Haptik bleiben optional; Browser garantieren keinen framegenauen Gleichlauf aller Ausgabekanäle.

## 3. Native Bausteine für Websites

Die Beispiele zeigen abgegrenzte Bausteine und ergänzen die verlinkten Designregeln. Fehlende Unterstützung darf nur die Animation entfernen. Produkttexte, echte Formularverarbeitung und Gestaltung ergänzt der jeweilige Website-Auftrag. Für clientseitige Router jede Initialisierung und jeden Listener beim Entfernen der Seite aufräumen.

### C02 · Press-Feedback ohne verzögerte Keyboard-Aktion

```html
<button class="pressable" type="button">Save draft</button>
```

```css
.pressable {
  transition: transform var(--motion-press) var(--motion-out);
}
.pressable[data-pointer]:active { transform: scale(0.97); }
.pressable:not([data-pointer]) { transition: none; }
.pressable:focus-visible { outline: 2px solid currentColor; outline-offset: 4px; }
@media (prefers-reduced-motion: reduce) {
  .pressable { transition: none; }
  .pressable[data-pointer]:active { transform: none; }
}
```

```js
for (const button of document.querySelectorAll('.pressable')) {
  button.addEventListener('pointerdown', () => button.setAttribute('data-pointer', ''));
  button.addEventListener('keydown', () => button.removeAttribute('data-pointer'));
}
```

Der native Button behält Click-, Enter- und Space-Semantik. Fachliche Aktionen gehören in `click` oder `submit`. Ein Pointerdown bestätigt noch keine Bestellung. Ergänze für Reduced Motion einen sichtbaren statischen Active-Zustand aus dem Designsystem.

### C03 · Navbar als HTML-Disclosure mit Entry-Transition

```html
<details class="site-nav">
  <summary>Menu</summary>
  <nav class="nav-panel" aria-label="Main navigation">
    <a href="/services/">Services</a>
    <a href="/contact/">Contact</a>
  </nav>
</details>
```

```css
.site-nav { position: relative; inline-size: max-content; }
.nav-panel {
  transform-origin: top left;
  opacity: 1;
  transform: scale(1);
  transition: opacity var(--motion-menu) var(--motion-out),
              transform var(--motion-menu) var(--motion-out);
}
@starting-style {
  .site-nav[open] .nav-panel { opacity: 0; transform: scale(0.97); }
}
.site-nav[data-instant] .nav-panel { transition: none; }
@media (prefers-reduced-motion: reduce) {
  .nav-panel { transition: none; }
  @starting-style {
    .site-nav[open] .nav-panel { opacity: 1; transform: scale(1); }
  }
}
```

```js
for (const navigation of document.querySelectorAll('.site-nav')) {
  const summary = navigation.querySelector('summary');
  summary.addEventListener('click', event => {
    navigation.toggleAttribute('data-instant', event.detail === 0);
  });
  navigation.addEventListener('keydown', event => {
    if (event.key === 'Escape' && navigation.open) {
      navigation.setAttribute('data-instant', '');
      navigation.open = false;
      summary.focus();
    }
  });
}
```

Diese kompakte Navbar schliesst sofort. Der Eintritt ist Best Effort: Ein geschlossenes `details` rendert seinen Inhalt nicht, deshalb greift `@starting-style` je nach Browser erst mit `::details-content` und `transition-behavior: allow-discrete` wie in C04. `@starting-style` ergänzt nur den Eintritt; es verzögert weder DOM-Entfernung noch das native Zuklappen. Für ein animiertes Exit mit Top-Layer-Lebenszyklus C04 oder einen nativen Popover verwenden. Navigation benötigt kein `role="menu"`; normale Links bleiben mit Tab erreichbar. Ohne JS bleibt `details` bedienbar.

Für ein frei positioniertes Popover den Ursprung nach dessen Platzierung aus den Rechtecken bestimmen: `originX = triggerCenterX - panelLeft`, `originY = triggerCenterY - panelTop`. Diese einmalige Messung gehört vor die Animation. Bei Kollisionen und neuem Placement neu messen; der Beispiel-Origin `top left` gilt für die gezeigte Ausrichtung.

### C04 · Dialog mit Entry, Exit, Escape und Link-Fallback

```html
<a id="contact-link" href="/contact/">Contact options</a>
<dialog id="contact-dialog" aria-labelledby="contact-title">
  <h2 id="contact-title" tabindex="-1" autofocus>Contact options</h2>
  <p><a href="/contact/">Open the full contact page</a></p>
  <button id="contact-close" type="button">Close</button>
</dialog>
```

```css
#contact-dialog {
  opacity: 0;
  transform: scale(0.95);
  transform-origin: center;
  transition: opacity var(--motion-exit) var(--motion-out),
              transform var(--motion-exit) var(--motion-out);
}
@supports (transition-behavior: allow-discrete) and (overlay: auto) {
  #contact-dialog {
    transition: opacity var(--motion-exit) var(--motion-out),
                transform var(--motion-exit) var(--motion-out),
                display var(--motion-exit) allow-discrete,
                overlay var(--motion-exit) allow-discrete;
  }
}
#contact-dialog[open] {
  opacity: 1;
  transform: scale(1);
  transition-duration: var(--motion-enter);
}
#contact-dialog::backdrop { background: rgb(0 0 0 / 0.35); }
@starting-style {
  #contact-dialog[open] { opacity: 0; transform: scale(0.95); }
}
#contact-dialog[data-instant] { transition: none; }
@media (prefers-reduced-motion: reduce) {
  #contact-dialog { transition: none; transform: none; }
  #contact-dialog[open] { transition: none; transform: none; }
  @starting-style {
    #contact-dialog[open] { opacity: 1; transform: none; }
  }
}
```

```js
const contactLink = document.querySelector('#contact-link');
const contactDialog = document.querySelector('#contact-dialog');
const contactClose = document.querySelector('#contact-close');
if (typeof contactDialog.showModal === 'function') {
  contactLink.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey ||
        event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    contactDialog.toggleAttribute('data-instant', event.detail === 0);
    if (!contactDialog.open) contactDialog.showModal();
  });
  contactClose.addEventListener('click', event => {
    contactDialog.toggleAttribute('data-instant', event.detail === 0);
    contactDialog.close();
  });
  contactDialog.addEventListener('cancel', () => {
    contactDialog.setAttribute('data-instant', '');
    // Keep the native Escape action; do not preventDefault().
  });
  contactDialog.addEventListener('close', () => {
    if (!contactDialog.open && contactLink.isConnected) contactLink.focus();
  });
}
```

`display` und `overlay` sind hier **diskrete Lebenszyklus-Eigenschaften**. Sie halten die Darstellung bis zum Exit-Ende; es findet keine schrittweise Layoutgrössen-Animation statt. `showModal()` übernimmt Top Layer und modale Fokusgrenze. Der Scrim bleibt im Beispiel statisch. Bei Bedarf seine Opacity separat animieren und auch dessen Reduced-Motion-Regeln ergänzen.

Ohne `allow-discrete`/`overlay` schliesst der Dialog sofort. Ohne `@starting-style` entfällt der Eintrittseffekt. Der echte Kontaktlink funktioniert bei ausgeschaltetem oder fehlgeschlagenem JS. Der native Dialog garantiert keinen überall passenden Body-Scroll-Lock. Prüfe im Zielprojekt, ob der Hintergrund scrollt und seine Scrollposition erhalten bleibt. Keine Handarbeit mit `open`-Attribut oder Timern anstelle von `showModal()`/`close()`.

### C05 · WAAPI aus dem aktuellen Zwischenwert umleiten

Für programmatische Toggles, die mehr Kontrolle als eine CSS-Transition brauchen. Der Helfer besitzt `opacity` und `transform` eines eigenen Wrappers; auf diesen Eigenschaften keine zweite Animation parallel starten.

```js
function createStateAnimator(element) {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  let running = null;
  const settle = () => {
    if (preference.matches && running) running.finish();
  };
  preference.addEventListener('change', settle);
  return {
    async to(destination, { duration = 180, instant = false } = {}) {
      if (running) {
        running.commitStyles(); // Freeze the visible intermediate values as inline styles.
        running.cancel();
        running = null;
      }
      const current = getComputedStyle(element);
      const from = { opacity: current.opacity, transform: current.transform };
      Object.assign(element.style, destination); // Persist the logical final state.
      if (instant || preference.matches || !element.animate) return true;
      const animation = element.animate([from, destination], {
        duration,
        easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
        fill: 'both',
      });
      running = animation;
      try {
        await animation.finished;
        if (running !== animation) return false;
        running = null;
        animation.cancel(); // Final inline styles remain; release the effect.
        return true;
      } catch (error) {
        if (error.name !== 'AbortError') throw error;
        return false;
      }
    },
    destroy() {
      running?.cancel();
      running = null;
      preference.removeEventListener('change', settle);
    },
  };
}
```

Aufruf beispielsweise `animator.to({ opacity: '1', transform: 'translateY(0px)' }, { instant: event.detail === 0 })`. Für ein Exit erst nach erfolgreichem `true` den Knoten entfernen; die Anwendung muss dabei ihren aktuellen Open-State erneut prüfen. Bei Schliessen Fokus aus dem Inhalt bewegen und verborgene Interaktion mit `inert` verhindern. Der Helfer allein ist kein Dialog oder Fokusmanager.

Das Muster konserviert die Position beim Abbruch über `commitStyles()`, jedoch keine Feder-Velocity. `getComputedStyle().transform` liefert eine Matrix; WAAPI interpoliert Matrix und `translateY()` nur, wenn beide Keyframes als Transform-Listen aufgelöst werden können. Bei Problemen `translate` und `opacity` als getrennte Eigenschaften führen. Es setzt den Endstil vorab und entfernt fertige WAAPI-Effekte. Ein blosses `fill: 'forwards'` würde Effektobjekte und überschreibende Animationsstile behalten. Auf Router-Cleanup `destroy()` aufrufen; keine unaufgefangene `finished`-Ablehnung hinterlassen.

### C06 · Karten-Hover ohne unsichtbare oder verschobene Trefferfläche

```html
<a class="card-link" href="/project/">
  <span class="card-surface">View project</span>
</a>
```

```css
.card-link { display: block; }
.card-surface {
  display: block;
  transition: transform var(--motion-small) var(--motion-hover);
}
@media (hover: hover) and (pointer: fine) {
  .card-link:hover .card-surface { transform: translateY(-2px); }
}
.card-link:focus-visible { outline: 2px solid currentColor; outline-offset: 4px; }
@media (prefers-reduced-motion: reduce) {
  .card-surface { transition: none; }
  .card-link:hover .card-surface { transform: none; }
}
```

Der Link behält seine Layoutposition. Nur seine visuelle Oberfläche bewegt sich. Den Fokusindikator niemals bis zum Ende einer Animation verstecken. In häufig bedienten Kartenlisten den Hover-Versatz ganz entfernen.

### C07 · Scroll-Reveal als fehlertolerante Ergänzung

Im Beispiel animiert nur eine dekorative Fläche. Text und Links bleiben vom ersten Render an sichtbar und bedienbar. Für Fotos mit Informationswert `alt`-Text und Sichtbarkeit erhalten. Wesentliche Inhalte niemals dauerhaft durch eine anfängliche `opacity: 0` von erfolgreichem JavaScript abhängig machen.

```html
<article class="reveal-card">
  <div class="reveal-visual" aria-hidden="true">Decorative shape</div>
  <h3><a href="/project/">Project details</a></h3>
</article>
```

```js
function installReveals() {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const running = new Set();
  if (preference.matches || !window.IntersectionObserver ||
      !Element.prototype.animate) return () => {};
  const observer = new IntersectionObserver(entries => {
    let index = 0;
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      observer.unobserve(entry.target);
      if (preference.matches) continue;
      const animation = entry.target.animate([
        { opacity: 0, transform: 'translateY(8px)' },
        { opacity: 1, transform: 'translateY(0px)' },
      ], {
        duration: 240,
        delay: Math.min(index++ * 50, 150),
        easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
        fill: 'backwards',
      });
      running.add(animation);
      animation.finished.then(
        () => { running.delete(animation); animation.cancel(); },
        () => running.delete(animation),
      );
    }
  }, { rootMargin: '0px 0px -100px 0px' });
  for (const visual of document.querySelectorAll('.reveal-visual')) {
    if (visual.getBoundingClientRect().top >= innerHeight) observer.observe(visual);
  }
  const stop = () => {
    if (!preference.matches) return;
    observer.disconnect();
    for (const animation of running) animation.cancel();
    running.clear();
  };
  preference.addEventListener('change', stop);
  return () => {
    observer.disconnect();
    preference.removeEventListener('change', stop);
    for (const animation of running) animation.cancel();
    running.clear();
  };
}
const disposeReveals = installReveals();
```

Der erste Viewport bleibt statisch, jeder weitere Kandidat spielt höchstens einmal. Der 100-px-Observer-Rand stammt aus dem Quellrezept; Delay-Deckel und Beschränkung auf dekorative Flächen sind MAKE-Entscheidungen. Bei Seitenabbau `disposeReveals()` ausführen. Für rein scrollgebundene Effekte CSS `animation-timeline: view()` nur innerhalb einer Support-Abfrage einsetzen; statische Darstellung bleibt der Fallback.

### C08 · Seitenwechsel mit View Transitions

**MAKE-Ergänzung:** Der Fork benennt View Transitions im Glossar, liefert aber kein Implementierungsrezept. Für eine statisch erzeugte Website zuerst normale Links und Cross-Document View Transitions prüfen. Beide gleichursprünglichen Dokumente müssen teilnehmen; Browserunterstützung, Navigationstyp und Policy können einen Übergang auslassen.

```css
@media (prefers-reduced-motion: no-preference) {
  @view-transition { navigation: auto; }
}
::view-transition-group(*) {
  animation-duration: 180ms;
  animation-timing-function: var(--motion-in-out);
}
::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 160ms;
  animation-timing-function: var(--motion-out);
}
@media (prefers-reduced-motion: reduce) {
  ::view-transition-group(*),
  ::view-transition-old(*),
  ::view-transition-new(*) { animation: none !important; }
}
```

```js
let keyboardNavigation = false;
document.addEventListener('click', event => {
  if (event.target instanceof Element && event.target.closest('a[href]')) {
    keyboardNavigation = event.detail === 0;
  }
}, { capture: true });
window.addEventListener('pageswap', event => {
  event.viewTransition?.ready.catch(() => {});
  if (keyboardNavigation || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    event.viewTransition?.skipTransition();
  }
});
window.addEventListener('pagereveal', event => {
  event.viewTransition?.ready.catch(() => {});
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    event.viewTransition?.skipTransition();
  }
});
```

Das Beispiel lässt URL, Zurück/Vorwärts und Scrollrestauration beim Browser. Cross-Document-Skip erfordert die entsprechenden Lifecycle-Events. Wenn der Zielbrowser diese Kombination nicht unterstützt und Keyboard-Transitions nicht zuverlässig auslassen kann, dort die Cross-Document-Erweiterung deaktivieren. Für den Crossfade keine zusätzlichen `view-transition-name` vergeben. Ein Shared Element erhält pro Snapshot einen eindeutigen Namen; Duplikate können den Übergang abbrechen.

Für einen **bereits vorhandenen** Same-Document-Zustandswechsel genügt ein kleiner Helfer. Ein SPA-Router nur für Animation ist nicht nötig.

```js
function createViewUpdater() {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  let active = null;
  const skip = () => { if (preference.matches) active?.skipTransition(); };
  preference.addEventListener('change', skip);
  return {
    async update(changeDOM, { instant = false } = {}) {
      active?.skipTransition();
      if (instant || preference.matches || !document.startViewTransition) {
        await changeDOM();
        return;
      }
      const transition = document.startViewTransition(changeDOM);
      active = transition;
      transition.ready.catch(() => {}); // Unsupported snapshots may skip animation.
      const finished = transition.finished.catch(() => {});
      try {
        await transition.updateCallbackDone; // Propagate a real update failure.
        await finished;
      } finally {
        if (active === transition) active = null;
      }
    },
    destroy() {
      active?.skipTransition();
      preference.removeEventListener('change', skip);
    },
  };
}
```

Aufruf: `views.update(renderNextState, { instant: event.detail === 0 })`; fachliche Fehler am Aufrufer behandeln. Der DOM-Callback läuft auch dann, wenn die Animation ausfällt. Ihn in einem Catch pauschal erneut aufzurufen kann eine Aktion doppelt ausführen. Gleichzeitige asynchrone Datenupdates muss die Anwendung selbst ordnen; `skipTransition()` bricht keine Datenanforderung ab. Fokus nach einem echten Ansichtswechsel an den passenden Inhalt setzen und dessen Titel aktualisieren. Auf Astro-Seiten mit ClientRouter nicht zusätzlich einen konkurrierenden Router oder zweite View Transition starten.

### C09 · Formular-Feedback mit zugänglichem Status

```html
<form id="request-form" action="/request/" method="post">
  <label for="email">Email</label>
  <input id="email" name="email" type="email" required aria-describedby="email-error">
  <p id="email-error"></p>
  <button type="submit">Send request</button>
  <p id="form-status" role="status" aria-live="polite" aria-atomic="true"></p>
</form>
```

```js
function showFormResult(message, { error = '', field = null } = {}) {
  const status = document.querySelector('#form-status');
  status.textContent = message;
  document.querySelector('#email-error').textContent = error;
  if (field) {
    if (error) {
      field.setAttribute('aria-invalid', 'true');
      field.focus();
    } else {
      field.removeAttribute('aria-invalid');
    }
  }
}
```

Die Live-Region existiert vor der Statusmeldung. Rückmeldungen bleiben sichtbar und kommen sofort. Der Helfer animiert bewusst nicht: Formularstatus entsteht auch durch Keyboard-Eingaben. Verwende ihn erst mit dem tatsächlichen Validierungs- oder Serverergebnis. Der angegebene Endpoint ist ein Beispielvertrag; der Website-Auftrag muss ihn implementieren. Keine simulierte Erfolgsmeldung und keine blockierende künstliche Mindestladezeit. Bei asynchronem Submit `aria-busy` am Formular setzen und in jedem Erfolg-/Fehlerpfad zurücksetzen; Netzwerkfehler dürfen die Eingabe nicht löschen.

## 4. Springs, Gesten und Spezialeffekte in Vanilla

### C10 · Spring-Annäherung mit CSS `linear()`

Für eine vorbestimmte, seltene Bewegung kann `linear()` eine gesampelte Federkurve abbilden. Das CSS-Schlüsselwort `linear` bedeutet konstante Geschwindigkeit; die Funktion `linear(...)` interpoliert eine Folge von Stützpunkten. Werte über 1 erzeugen Overshoot. Das ist eine Zeitkurve ohne integrierten Federzustand oder gespeicherte Geschwindigkeit.

```css
.spring-demo {
  --spring-curve: var(--motion-out);
  transition: transform 240ms var(--spring-curve);
}
@supports (animation-timing-function: linear(0, 0.5, 1)) {
  .spring-demo {
    --spring-curve: linear(0, 0.105, 0.319, 0.543, 0.729, 0.862,
                           0.946, 0.992, 1.012, 1.015, 1.012, 1.007, 1);
  }
}
.spring-demo[data-raised] { transform: translateY(-8px); }
@media (prefers-reduced-motion: reduce) {
  .spring-demo { transition: none; }
}
```

Die Stützpunkte bilden eine **illustrative MAKE-Annäherung**. Sie stammen aus dieser Adaption; Apples `response` lässt sich daraus nicht ableiten. Ihr geringer Overshoot eignet sich höchstens für eine begründete spielerische Sequenz. Für gewöhnliche Menüs genügt weiterhin der Ease-out-Token aus C01. Browser ohne `linear()`-Unterstützung nutzen die im selben Beispiel hinterlegte Bezier-Kurve. Für Keyboard-Auslösung denselben `data-instant`-Weg wie in C02/C03 verwenden; das CSS-Rezept allein unterscheidet Pointer und Tastatur nicht.

CSS-Transitions können eine solche Kurve beim Toggle umleiten. Sie übernehmen dabei keine reale Release-Velocity. Für Drags, erneutes Greifen und kontinuierliche Impulsübergabe reicht dieses Rezept nicht. Gesampelte Kurven können auch als WAAPI-`easing` dienen, wenn die Browser die Funktion dort akzeptieren; `CSS.supports()` allein ersetzt diesen API-Test nicht.

### C11 · Hold-Overlay, Clip-Reveal und Blur

Ein Hold-Indikator braucht keine animierte Breite. Der visuelle Teil lässt sich mit Transform bauen.

```css
.hold-button { position: relative; overflow: hidden; }
.hold-progress {
  position: absolute;
  inset: 0;
  pointer-events: none;
  transform-origin: left center;
  transform: scaleX(0);
  transition: transform 200ms var(--motion-out);
}
.hold-button[data-holding] .hold-progress {
  transform: scaleX(1);
  transition: transform 2s linear;
}
@media (prefers-reduced-motion: reduce) {
  .hold-progress { display: none; }
}
```

`data-holding` kennzeichnet den Zustand einer eigenen Hold-Zustandsmaschine; die CSS-Regel bestätigt selbst keine Löschung. Bei Loslassen, Wegziehen, Fokusverlust oder `pointercancel` abbrechen. Eine zugängliche Button-/Bestätigungsalternative muss dieselbe Aktion ermöglichen; Reduced Motion zeigt den Entscheidungsstatus statisch. Das 2-s-Budget definiert in E/S die Schwelle für das bewusste Halten.

Für einen begründeten Bild-Reveal kann `clip-path: inset(0 0 100% 0)` nach `inset(0 0 0 0)` interpolieren. Ein kurzer WAAPI-Effekt auf einer dekorativen Fläche ist beispielsweise möglich.

```js
function revealClip(element) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !element.animate) return;
  return element.animate([
    { clipPath: 'inset(0 0 100% 0)' },
    { clipPath: 'inset(0 0 0 0)' },
  ], { duration: 240, easing: 'cubic-bezier(0.77, 0, 0.175, 1)' });
}
```

Das Element muss im Endzustand ungeclippt sein. Für eine laufzeitänderbare Präferenz den zurückgegebenen Effekt wie in C07 abbrechen. Dieses kurze Rezept ist eine zu profilierende Ausnahme zur Transform/Opacity-Vorgabe. Dasselbe gilt für `filter: blur(2px)` bei problematischem Crossfade; zuerst Dauer, Layout und Überlappung korrigieren. Animierte Blur-Radien unter 20 px bleiben ein Quellbudget, keine Garantie für ein ruckelfreies Bild.

Weitere Übersetzungen aus E/S: Vergleichsbilder durch einen nativen `<input type="range">` steuern und dessen Wert auf den Clip übertragen. Für Tabs höchstens eine `aria-hidden="true"` und `inert` gesetzte visuelle Kopie clippen; niemals doppelte fokussierbare Tablisten oder IDs erzeugen. Für Akkordeons zuerst `<details>` mit sofortigem Layoutwechsel nutzen. Eine animierte Höhe, `grid-template-rows` oder intrinsische Grösse ist weiterhin Layoutarbeit. Ein FLIP-Wrapper misst Start/Ende einmal und animiert die visuelle Differenz per Transform; Scale kann dabei Text verzerren, weshalb Inhalt und Fläche getrennte Wrapper brauchen.

### C12 · Direkte Manipulation und physikalische Einheiten

Für einen einfachen funktionalen Slider ist ein nativer Range-Input oft die bessere Lösung. Der Ausschnitt zeigt nur den Pointer-Lebenszyklus einer eigenen horizontalen Drag-Fläche. `onMove` rendert eine Position; `onRelease` übernimmt einen Snap-/Spring-Controller. Buttons oder Keyboard-Controls müssen dieselben Zustände unabhängig von der Geste erreichen.

```js
function bindHorizontalDrag(element, readPosition, onMove, onRelease) {
  let drag = null;
  let frame = 0;
  const abort = new AbortController();
  const listen = (type, handler) => element.addEventListener(type, handler, {
    signal: abort.signal,
  });
  listen('pointerdown', event => {
    if (drag || !event.isPrimary || event.button !== 0) return;
    const start = readPosition(); // Read the live value and stop any existing spring.
    drag = { id: event.pointerId, origin: event.clientX, start, x: start,
             samples: [{ x: start, t: event.timeStamp }] };
    element.setPointerCapture(event.pointerId);
  });
  listen('pointermove', event => {
    if (!drag || event.pointerId !== drag.id) return;
    drag.x = drag.start + event.clientX - drag.origin;
    drag.samples.push({ x: drag.x, t: event.timeStamp });
    drag.samples = drag.samples.filter(sample => event.timeStamp - sample.t <= 80);
    if (!frame) frame = requestAnimationFrame(() => {
      frame = 0;
      if (drag) onMove(drag.x);
    });
  });
  const end = event => {
    if (!drag || event.pointerId !== drag.id) return;
    cancelAnimationFrame(frame);
    frame = 0;
    const state = drag;
    drag = null;
    const cancelled = event.type !== 'pointerup';
    if (!cancelled) {
      state.x = state.start + event.clientX - state.origin;
      state.samples.push({ x: state.x, t: event.timeStamp });
    }
    const samples = state.samples.filter(sample => event.timeStamp - sample.t <= 80);
    const first = samples[0];
    const last = samples.at(-1);
    const seconds = first && last ? (last.t - first.t) / 1000 : 0;
    const velocity = !cancelled && seconds > 0 ? (last.x - first.x) / seconds : 0;
    onMove(state.x);
    if (element.hasPointerCapture(state.id)) element.releasePointerCapture(state.id);
    onRelease({ position: state.x, velocity, cancelled });
  };
  for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) listen(type, end);
  return () => {
    abort.abort();
    cancelAnimationFrame(frame);
    if (drag && element.hasPointerCapture(drag.id)) element.releasePointerCapture(drag.id);
    drag = null;
  };
}
function project(velocity, decay = 0.998) {
  return (velocity / 1000) * decay / (1 - decay);
}
function rubberband(overshoot, dimension, constant = 0.55) {
  return (overshoot * dimension * constant) /
    (dimension + constant * Math.abs(overshoot));
}
```

```css
.drag-handle { touch-action: pan-y; user-select: none; }
```

80 ms History ist ein MAKE-Beispielwert. Ein vertikales Sheet benötigt ein passendes Scroll-/Gestenkonzept; `touch-action: none` auf der ganzen Seite würde Scrollen und Zoom unnötig blockieren. Für konkurrierende Gesten vor dem Festlegen einer Achse etwa 10 px Hysterese aus A §10 prüfen. Capture hält den Eventstrom fest; es ersetzt weder Hysterese noch Klickunterdrückung nach einem tatsächlichen Drag.

`readPosition()` muss den sichtbaren Wert aus dem Controller übernehmen und dessen laufende Feder stoppen. Während der Geste direkt rendern, etwa `element.style.transform = \`translateX(${x}px)\``. Nach dem Loslassen den Zielpunkt nahe `position + project(velocity)` wählen und die gerichtete Velocity weiterreichen. Bei zusätzlichem Pointer bleibt die erste Pointer-ID zuständig. Bei Cancel zum gültigen Zustand zurückkehren.

Die Projektionswerte 0.998 und optional 0.99 sowie Rubberband 0.55 stammen aus A §§6/9. Die Funktionen setzen `0 < decay < 1` und eine positive `dimension` voraus. Sie sind Ausgangspunkte für eigene Snap-Grenzen. Relative Spring-APIs benötigen `velocity / (target - current)`; bei Distanz 0 keine Division ausführen. Motion verwendet für skalare Pixelwerte px/s. X und Y bei zweidimensionaler Physik getrennt führen. Den Betrag der Velocity nur zusammen mit zulässiger Richtung verwenden; ein Flick zurück nach innen darf kein Dismiss auslösen.

### C13 · Materialien und laufende Effekte begrenzen

```css
.floating-toolbar {
  background: rgb(255 255 255 / 0.85);
  color: #171717;
}
@supports (backdrop-filter: blur(20px)) {
  .floating-toolbar { backdrop-filter: blur(20px); }
}
@media (prefers-reduced-transparency: reduce), (prefers-contrast: more) {
  .floating-toolbar {
    background: white;
    backdrop-filter: none;
    border: 1px solid currentColor;
  }
}
.ambient[data-paused] { animation-play-state: paused; }
@media (prefers-reduced-motion: reduce) {
  .ambient { animation: none; }
}
```

Das statische 20-px-Backdrop-Filter illustriert A §12; der Textkontrast muss zum tatsächlichen Hintergrund passen. Bei fehlender Media-Feature-Unterstützung greift die gut lesbare Basis. Keine wichtigen Farben ausschliesslich auf Transparenz stützen. Materialien, optische Schriftgrössen und Tracking im bestehenden Apple-Modul nachschlagen.

Eine vorhandene dekorative Schleife lässt sich mit `element.toggleAttribute('data-paused', paused)` pausieren. `paused` fasst die Nutzerwahl, `document.hidden` und fehlende Sichtbarkeit aus einem Observer zusammen. Beim Resume die Nutzerpause erhalten. Für Timer/Toasts die Restzeit ebenfalls pausieren, wenn das Dokument verborgen ist; CSS-Pause allein stoppt keinen JavaScript-Timer. Länger automatisch laufende Inhalte brauchen nach ihrem Accessibility-Kontext eine erreichbare Pause-/Stop-Möglichkeit. Sound und Haptik nur optional, kausal und ohne Voraussetzung für Erfolg/Fehler einsetzen.

## 5. Auswahl nach Website-Situation

| Situation | Erste Wahl | Ausgangswerte | Weglassen / Inselbedarf |
|---|---|---|---|
| Navbar öffnen | `details` oder Popover + CSS-Transition, C03 | 180 ms, `--motion-out`, Scale 0.97, Origin am Trigger | Keyboard sofort. Für normale Navigation keine Motion-Insel. |
| Dialog / Kontaktoptionen | `<dialog>` + `@starting-style` + diskrete Exit-Transitions, C04 | Enter 240 ms, Exit 160 ms, Scale 0.95, zentraler Origin | Escape und Keyboard sofort. Insel bei Wiederverwendung eines geprüften Dialog-/Sheet-Bausteins oder echter Gestenphysik. |
| Karten-Hover | CSS auf innerer Oberfläche, C06 | 160 ms `ease`, optional −2 px | Touch und Reduced Motion ohne Versatz. Häufige Listen statisch; kein JS nötig. |
| Scroll-Reveal | Observer + WAAPI auf dekorativer Fläche, C07 | 240 ms, 8 px, 50-ms-Stagger mit 150-ms-Deckel | Erste Ansicht, Reduced Motion und fachlich wichtige Inhalte statisch. Keine Insel. |
| Seitenwechsel | Normale Links, optional native View Transitions, C08 | Root-Crossfade 160 ms; sichtbare Shared-Element-Bewegung 180 ms | Fallback normale Navigation. ClientRouter nur, wenn die Website ihn bereits braucht. |
| Formular-Feedback | HTML-Validierung, Text, Live-Region und Fokus, C09 | Sofortiger Status; zusätzliche dekorative Opacity höchstens 160 ms bei passendem Auslöser | Kein Shake auf jeder Eingabe, keine künstliche Wartezeit. Gewöhnliches Formular ohne Insel. |
| Swipe-Sheet / Snap-Carousel | Geprüfter Gestencontroller mit Spring und zugänglichen Controls | Direkte 1:1-Phase, Velocity-Handoff, begrenzte Snap-Punkte | Motion React oder vergleichbare geprüfte React-Komponente in einer Insel; native Scroll-Snap-/Range-Alternative zuerst prüfen. |
| Produktdemo / spielerischer Akzent | CSS oder WAAPI, bei festem Ablauf `linear()` möglich | Inhalt bestimmt Timing; Stagger 30–80 ms | Nur bei erklärbarem Nutzen. Pause, Sichtbarkeitsgrenze und Reduced Motion; Insel erst für echte Zustands-/Gestenanforderung. |

## 6. Wann `motion` und eine Astro-Insel sinnvoll sind

**Keine der beschriebenen Wirkungen ist technisch exklusiv an `motion` gebunden.** Ein eigener JS-Solver kann ebenfalls Federn berechnen. Für kontinuierliches Greifen, Velocity-Handoff, Rubberbanding, gekoppelte Layoutwechsel und zuverlässige Gestenunterbrechung ist eine geprüfte Bibliothek meist wartbarer als eine kurze Eigenimplementierung. CSS `linear()` ersetzt diese Zustandslogik nicht.

| Bedarf | Einbau |
|---|---|
| CSS-Transition, `@starting-style`, WAAPI oder native View Transition | Direkt in der Komponente oder `globals.css`; kein `motion` nötig |
| Frameworkfreie Motion-API `import { animate } from 'motion'` | In einem `useEffect` einer Client-Komponente; Cleanup beim Unmount |
| `motion/react`, `useSpring`, `useMotionValue`, `AnimatePresence`, `layout`/`layoutId`, React-Drag-/Reorder-Widget | Client-Komponente (`"use client"`); Provider und Zustand in derselben Komponente |
| Wiederverwendetes Sheet mit React-Primitives, Portalen und Fokusmanagement | Trigger, Sheet, Provider und gestenabhängige Zustände in derselben Insel; Library-Lebenszyklus bewahren |
| Einzelner Hover, einfacher Fade, Karten-Eintritt oder Kontakt-Modal | Native Beispiele verwenden; die Motion-Runtime bringt dafür keinen nötigen Funktionsgewinn |

Die Quellbeispiele wechseln zwischen `framer-motion` und `motion`. Für eine neue Integration die konkrete Paketversion im Lockfile sperren und dazu passende Importpfade wählen. Die aktuelle Motion-Quellstruktur bietet frameworkfreie und React-Einstiege; das belegt keine ausgeführte Integration oder pauschale Bundle-Grösse.

### Spring-Werte korrekt übertragen

Die Tabellen in A §4 nennen für Reposition Dämpfungsverhältnis 1.0 / Response 0.4 s, für Rotation 0.8 / 0.4 s und für Drawer 0.8 / 0.3 s. E/S zeigen `{ type: 'spring', duration: 0.5, bounce: 0.2 }` sowie `{ mass: 1, stiffness: 100, damping: 10 }`. Den letzten Satz von Koeffizienten nicht als kritisch gedämpft ausgeben; sein Dämpfungsverhältnis beträgt 0.5.

```js
// Predetermined spring-like timing; no release-velocity contract.
const calmTransition = { type: 'spring', duration: 0.4, bounce: 0 };

// Physics configuration for velocity-aware retargeting.
// MAKE example: damping ratio 0.8 with mass 1 and stiffness 100.
const momentumTransition = releaseVelocity => ({
  type: 'spring', mass: 1, stiffness: 100, damping: 16,
  velocity: releaseVelocity, // px/s for a scalar pixel position
});
```

Bei einer physikalischen Feder Geschwindigkeit und aktuellen Wert weiterreichen. Ein Controller muss diesen Zustand über Re-Targeting hinweg behalten; jeweils einen neuen beliebigen DOM-Effekt zu starten genügt nicht. Physikparameter überschreiben in Motion die `bounce`-/`duration`-Konfiguration. Für Velocity-Handoff den physikalischen Pfad wählen. `visualDuration` bezeichnet wahrgenommenes Ankommen, nicht die vollständige Ausregelzeit. Response-/Settling-Zeiten um 0.3–0.4 s aus der Gestenquelle sind eine begründete Ausnahme für physische Gesten; normale Website-Toggles bleiben beim kürzeren CSS-Budget.

Bei Reduced Motion den dekorativen Spring-Lauf stoppen und den gültigen Zielzustand sofort setzen. Direkte, funktional nötige Pointer-Manipulation und alternative Keyboard-/Button-Bedienung müssen weiter funktionieren. Im React-Widget `useReducedMotion()` oder einen passenden Media-Query-Hook verwenden; laufende Motion Values gezielt stoppen. Ein globales `transform: none !important` würde unter Umständen das Sheet falsch positionieren.

### Astro-Grenze

Konzeptioneller Einbau; `MotionSheet.tsx` ist ein projektspezifischer Wrapper um einen geprüften Baustein und gehört nicht zum Fork.

```astro
---
import MotionSheet from '../components/MotionSheet.tsx';
---
<main>
  <h1>Project consultation</h1>
  <p>Service details remain available in the HTML document.</p>
  <a href="/contact/">Open the contact page</a>
  <MotionSheet client:load />
</main>
```

- Sichtbarer Trigger: `client:load`. Ein echtes Link-Fallback bis zur erfolgreichen Hydration erhalten; ein noch inaktiver Button darf keine Sackgasse erzeugen.
- Nachrangiges Widget unterhalb des ersten Viewports: `client:visible`, sofern spätere Aktivierung vertretbar bleibt. `client:idle` nur für entbehrliche Interaktion.
- `client:only="react"` nur bei belegter fehlender SSR-Fähigkeit; sichtbares HTML-Fallback und wesentliche Inhalte ausserhalb erhalten.
- Hook-/Provider-Zustand bleibt innerhalb einer Insel. `layoutId` oder Context verbinden getrennte Inseln nicht automatisch.
- Native Skripte dürfen denselben React-Teilbaum nicht gleichzeitig steuern. Listener, Motion-Subscriptions und Controller beim Unmount bereinigen.
- Portale, globale Tokens und Exit-Erkennung entsprechend [component-islands.md](component-islands.md) prüfen. Eine Primitive durch selbst erdachte Exit-Timer zu ersetzen kann Fokus und DOM-Abbau beschädigen.
- Paketversion, Lizenz, Direktive, Fallback, Provider-/Portalgrenze und tatsächliche JS-/CSS-Requests im Komponentenabschnitt der Projekt-`DESIGN.md` festhalten. Produktionsbundle gzip messen; eine kleine Insel kann React und weitere Primitives laden.

Seit 08.09.2026 ist React der Standardstack; `motion/react` in einer Client-Komponente ist damit der Normalfall für Gesten, Layout- und Presence-Übergänge, CSS/WAAPI bleibt für einfache Übergänge richtig. Die Astro-Insel-Hinweise gelten nur noch für Legacy-HTML-Projekte. Vor Übernahme braucht die konkrete Komponente einen Build und Interaktionstests.

## 7. C14 · Umsetzung prüfen

Für ein Diff-Review das Format `Before | After | Why` mit `file:line` sowie ein explizites `Block`/`Approve` aus `motion-doktrin.md` verwenden. Die vollständige Audit-Methode und abgelehnte Animationskandidaten bleiben in `motion-audit-workflow.md`.

1. **Native Funktion:** Ohne JS bleiben Navigation, Inhalte und echte Zielseiten erreichbar. Dialog-Link folgt seinem Ziel; Formulare besitzen einen funktionierenden Endpoint.
2. **Input:** Pointer, Tab, Enter, Space und Escape testen. Keyboard-Auslösung bleibt sofort. Der Fokus bleibt sichtbar, kehrt aus dem Dialog zurück und erreicht keinen verborgenen Inhalt.
3. **Lebenszyklus:** Während Entry schliessen, während Exit erneut öffnen und mehrmals rasch umkehren. Keine doppelten Effekte, liegengebliebenen Scrims, Race-Conditions oder unaufgefangenen `AbortError`.
4. **Präferenzen:** Reduced Motion vor dem Laden und während einer laufenden Animation einschalten. Bewegungen stoppen; Inhalt und Endzustand bleiben korrekt. Touch-Hover, höhere Kontraste und reduzierte Transparenz separat prüfen.
5. **Browser-Fallback:** `@starting-style`, diskrete Transitions, WAAPI, `linear()` und View Transitions unabhängig voneinander behandeln. Support einer API beweist keinen Support aller anderen. Ausfall führt zu statischer Bedienung.
6. **Rendering:** Unter CPU-/Netzlast profilieren. Transform/Opacity, Paint-Flashing, Layoutarbeit und Layerzahl prüfen; Effekte auf grossen Flächen und Safari separat untersuchen.
7. **Gesten:** Echte Touchgeräte, Capture-Verlust, zweiten Finger, Scrollkonflikte, Achsenwechsel, Resize und Momentum-Richtung testen. Langsames Ziehen und schneller Flick brauchen nachvollziehbare Ziele.
8. **Wirkung:** Bei Normaltempo und 2–5× langsamer ansehen. Ursprung, Synchronität und Rückweg prüfen. Mit frischem Blick erneut beurteilen; einen unklaren Effekt zuerst reduzieren oder entfernen.
9. **Lieferkosten:** Native Route ohne Insel lädt keinen unnötigen React-Client. Für eine Motion-Insel Roh-HTML, Hydration, Unterseiten-Direktaufruf, Portal-CSS und Produktionsrequests messen.

### Reproduzierbare Beispielprüfung

Das Prüfskript `verify-motion.mjs` im Rechercheordner `/root/eingang/ausgang/web-erweiterung-2026-09-07/motion/` extrahiert die Codeblöcke direkt aus diesem Modul. Die Prüfung kontrolliert JSON-Pflichtfelder, Commit und Git-Blobs, die unveränderte Quellenkopie, den MIT-Text und alle lokalen Links. Anschliessend führt sie native Beispiele mit Playwright in Chromium aus.

```bash
# Prüfskript liegt beim Rechercheordner, weil es den Git-Clone mit Blob-Hashes braucht;
# die Skillkopie unter assets/vendor/ ist derselbe Stand ohne .git.
node /root/eingang/ausgang/web-erweiterung-2026-09-07/motion/verify-motion.mjs
node /root/eingang/ausgang/web-erweiterung-2026-09-07/motion/verify-motion.mjs --upstream
```

Der lokale Lauf bestand mit **21 Checks in Chromium 152.0.7977.64**. Der optionale Aufruf verifiziert zusätzlich die Fork-Differenzen gegen den festgehaltenen Originalcommit über `gh api`. Er benötigt Netzwerkzugang. Das Skript nutzt standardmässig das vorhandene `playwright-core` unter `/root/tools/node-deps/node_modules/` und `/usr/bin/google-chrome`; über `PLAYWRIGHT_CORE_PATH` und `CHROME_PATH` lassen sich andere Installationspfade angeben. Es installiert keine Abhängigkeiten.

Die Browserprüfung deckt unter anderem Keyboard- und Pointer-Bedienung, Nutzung ohne JavaScript, sichtbares diskretes Dialog-Exit, Wiederöffnen während Exit, WAAPI-Abbruch, Reduced Motion, Clip-Endzustand und View-Transition-Fehler ab. Sie prüft Gesten nur mit synthetischen Pointer-Events und emuliert Touch-Media-Features. Echte Touchgeräte, Safari, visuelle Abnahme und ein Astro-/Motion-Produktionsbuild bleiben projektspezifische Prüfungen.

### Ergänzende Browser-/API-Quellen

Die Übersetzungen gehen über die Fork-Dateien hinaus. MDN-Seiten wurden zur API-Semantik herangezogen; sie sind kein Ersatz für Tests der Zielbrowser.

- [MDN: `@starting-style`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@starting-style)
- [MDN: Dialoge animieren](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog#animating_dialogs)
- [MDN: Web Animations API, Endstile und Cleanup](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Using_the_Web_Animations_API)
- [MDN: `document.startViewTransition()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/startViewTransition)
- [Motion-Quelltypen: SpringOptions und DurationSpringOptions](https://github.com/motiondivision/motion/blob/main/packages/motion-dom/src/animation/types.ts)
- [Motion-Paketeinstiege](https://github.com/motiondivision/motion/blob/main/packages/motion/package.json)

Die Motion-Webdokumentation lieferte beim Abruf HTTP 403. Importpfade und Parametergrenzen wurden deshalb zusätzlich im öffentlichen Quellcode nachgelesen. Dessen `main` ist beweglich; bei einer Integration die tatsächlich gesperrte Paketversion erneut prüfen.

## Lizenzhinweis zum übernommenen Quellmaterial

Unveränderter englischer Lizenztext aus dem gelesenen Snapshot. Die eigenen HTML/CSS/JS-Adaptionen und Konfliktauflösungen sind im Modul gekennzeichnet.

```text
MIT License

Copyright (c) 2026 Emil Kowalski

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## R21 · content-visibility und Reveal (Observation 0008)

In offscreen Sektionen mit `content-visibility:auto` kein synchrones Layout-Lesen (`getBoundingClientRect`, `offsetHeight`) zur Reveal-Vorbereitung erzwingen. Das kann die eingesparte Layoutarbeit auslösen. Sichtbarkeit über IntersectionObserver und dessen Entrydaten behandeln; C07 ohne vorgezogene Layoutschleife verwenden. Vor nötigen Messungen deren Kosten und betroffene Sektionen ausdrücklich bestimmen.
