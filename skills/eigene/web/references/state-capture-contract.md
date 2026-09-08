# State-Capture-Vertrag (U4)

Dieser Vertrag beschreibt die bereits von `scripts/shot-sweep.mjs` erzeugten Zustands-Receipts. Er erweitert den normalen Route-/Viewport-Sweep; er ersetzt weder Funktionsprüfungen noch den visuellen Vergleich.

## Aufruf und Schemas

Zustände werden mit `--states` aufgenommen. Eine deklarative Spec kommt über `--state-spec <datei>`; ohne Pfad wird bei aktivem `--states` eine vorhandene `web/state-spec.json` im Arbeitsverzeichnis verwendet.

- State-Spec: exakt `web/state-spec/v1`
- Manifest: exakt `web/shot-sweep/v2`
- Laufidentität im Manifest: `run_id` und `build_revision`
- Tatsächliches Profil: `capture_profile: { static, states, mobile }`

`run_id` und `build_revision` kommen aus den gleichnamigen Flags beziehungsweise den vorhandenen `SHOT_SWEEP_*`-Umgebungsvariablen; ohne Angabe stehen sie auf `null`.

## Matrix und Status

Die kanonische Capture-Identität ist:

```text
route|viewport|target|state
```

Ein Screenshot gilt nie für zwei Targets. `state_matrix` führt getrennte Arrays:

- `required`: durch Spec, Applicability oder Playwright-Referenz verlangte Zustände.
- `captured`: tatsächlich aufgenommene Zustände oder eingelesene bestehende Playwright-Receipts.
- `not_applicable`: nur begründete Nicht-Anwendbarkeit.
- `failed`: Setup-, Capture- oder Assertion-Fehler sowie nach der Reconciliation fehlende Pflichtzustände.

Ein Setup-Fehler erzeugt kein Success-Receipt. Nach dem Sweep wird jedes `required` gegen `captured`, zulässiges `not_applicable` und bereits vorhandenes `failed` abgeglichen; ein sonst offener Eintrag wird mit `required state not captured` zu `failed`.

## Automatische Zustände

Mit `--states` nimmt der Desktop-Pass je eigenem Target auf:

- `hover`
- `focus`
- `open-expanded`

Der Focus-Receipt trägt `Tab` und `Shift+Tab` als Keyboard-Pfad und prüft das Target gegen `document.activeElement`. Der Open-/Expanded-Pass klickt das Target, prüft `aria-expanded="true"` beziehungsweise ein offenes `details`, nimmt den Receipt auf und nutzt `Escape` sowie nötigenfalls einen erneuten Klick zur Recovery. Ein Lauf mit `states: true`, der ausschließlich Hover-Zustände enthält, ist FAIL.

## Deklarierte Loading-, Empty-, Error- und Success-Zustände

Eine `scenario`-Deklaration verwendet nur die im Sweep vorhandenen Schritte:

- optional `prepare.selector` plus `prepare.fill`
- `trigger.selector`; der Sweep klickt dieses Target
- `hold.url` für `page.route(...)`
- optional `assert_loading.selector`
- `success` beziehungsweise `error` mit `status`, `body` und optional `assert.selector`
- für `empty`: optional `setup.evaluate` und `assert.selector`

Beim Intercept-Hold wird die passende Request nach dem Trigger gehalten. Während sie gehalten ist, wird `loading` aufgenommen. Danach erfüllt der Sweep die Request mit der deklarierten Success- oder Error-Antwort, wartet optional auf deren Assertion-Selektor und nimmt den Terminalzustand auf. Fehlt `hold.url`, wird der Request nicht getroffen oder schlägt Setup/Assertion fehl, landet der Zustand in `failed`.

`empty` wird nach einem frischen Route-Load über `setup.evaluate` hergestellt und gegen den optionalen Selektor aufgenommen.

### Applicability und N/A

Die automatische Applicability ist absichtlich eng:

| Erkannt auf der Route | Automatisch `required` |
| --- | --- |
| `form` | `loading`, `error`, `success` |
| Async-Signal (`fetch`, `XMLHttpRequest`, `aria-live` oder `aria-busy`) | `loading` |
| Liste (`ul`, `ol`, `tbody` oder `[role="list"]`) | `empty` |
| deklarierter Submit-Scenario | die in `states` genannten `loading`-/`success`-/`error`-Zustände über Trigger und Intercept-Hold |

Für `not_applicable` sind ausschließlich diese Gründe erlaubt:

- `static-page`: weder Form noch Liste noch Async-Signal; gilt für `loading`, `empty`, `error`, `success`.
- `no-form`: ohne Form wird `success` als nicht anwendbar markiert.
- `no-async-data`: ohne Async-Signal und ohne Form wird `loading` als nicht anwendbar markiert.

Jeder andere Grund ist ein Setup-Fehler in `state_matrix.failed`; N/A ist kein Ersatz für einen fehlgeschlagenen Aufbau.

## Receipt-Inhalt und Accessibility

Ein State-Screenshot enthält neben Datei, Route, Viewport, Target und State die vorhandenen Receipt-Felder:

- `keyboard`
- `focus`
- `role`
- `name`
- `aria` mit `expanded`, `busy`, `invalid`, `controls`
- `live` mit Rolle, `aria-live` und Text
- `escape`
- `axe`

Axe läuft, sofern `axe-core` vorhanden ist, für WCAG-2A/2AA und schreibt Anzahl sowie IDs der Violations. Ist Axe nicht vorhanden oder nicht ausführbar, enthält das Receipt den Messfehler; daraus wird nicht still ein Axe-PASS.

Für einen komplexen, bereits durch Playwright abgedeckten Zustand nutzt die Spec `playwright_refs` mit `id`, `test` und `receipt`. `shot-sweep` führt diesen Test nicht erneut aus. Es verlangt eine vorhandene, parsebare Receipt-JSON und übernimmt daraus `keyboard`, `focus`, `role`, `name`, `aria`, `live`, `escape`, `axe` und `shots` als `captured`. Fehlende oder nicht parsebare Receipts werden `failed`.

## Mobile, Reload und stabile Aufnahme

`--mobile` setzt `capture_profile.mobile` und ergänzt je Route einen Mobile-Sweep mit `390x844`. Der automatische und deklarative U4-State-Pass läuft derzeit nur für `desktop`; Mobile bleibt als eigene Route-/Viewport-Aufnahme im Manifest sichtbar.

Nach dem State-Pass wird die Route frisch geladen, bevor der normale Scroll-Pass beginnt. Auch der spätere Klick-Pass startet von einer frisch geladenen Seite, damit State- oder Klick-Nebenwirkungen nicht als Baseline weitergetragen werden.

Jeder PNG-Capture läuft über den einen Playwright-`page.screenshot`-Pfad mit `animations: "disabled"`, verstecktem Caret, gesetzten Fonts und CSS-Skalierung. `fullPage` ist `false`; `captureBeyondViewport` wird nicht aktiviert. Mit `--static` kommen Reduced Motion, ausgeschaltete CSS-Animationen/Transitions und der Reveal-Vorlauf hinzu.

## Visual, functional und regression bleiben getrennt

- **Visual:** PNG pro Route, Viewport, Target und State; das ist das Material für die visuelle Prüfung.
- **Functional/Accessibility:** Intercept-Hold, Selektor-Assertions, Focus-/ARIA-/Live-/Escape-Daten, Axe-Messung und `state_matrix` belegen nur die ausgeführten Checks.
- **Regression:** stabile Viewports, deaktivierte Animationen, Reloads, `capture_profile` und Laufidentität machen getrennte Lauf-/Pixelvergleiche möglich. Der Sweep selbst macht aus einem funktionalen Receipt keinen visuellen oder Regression-PASS.

## Kleines valides `state-spec.json`

```json
{
  "schema": "web/state-spec/v1",
  "scenarios": [
    {
      "id": "contact-submit",
      "route": "/",
      "states": ["loading", "success", "error"],
      "prepare": { "selector": "input[name=name]", "fill": "Ada" },
      "trigger": {
        "selector": "form#contact button[type=submit]",
        "action": "click"
      },
      "hold": { "url": "**/api/submit" },
      "assert_loading": { "selector": "#loading:not([hidden])" },
      "success": {
        "status": 200,
        "body": "{\"ok\":true}",
        "assert": { "selector": "[role=status]:not([hidden])" }
      },
      "error": {
        "status": 400,
        "body": "{\"ok\":false}",
        "assert": { "selector": "[role=alert]:not([hidden])" }
      }
    },
    {
      "id": "items-empty",
      "route": "/",
      "states": ["empty"],
      "setup": { "evaluate": "document.getElementById('items').innerHTML=''" },
      "assert": { "selector": "#items:empty" }
    }
  ],
  "playwright_refs": [],
  "not_applicable": []
}
```
