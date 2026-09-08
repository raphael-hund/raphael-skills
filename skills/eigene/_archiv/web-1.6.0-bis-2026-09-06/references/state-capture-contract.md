# Zustände und Funktionsbelege

`scripts/shot-sweep.mjs` nimmt Seiten auf. Standardmäßig stellt es keine
Cookie-Zustimmung her und klickt weder Buttons noch Formulare. Zustände kommen
nur aus ausdrücklich ausgewählten Targets oder Szenarien. Vorhandene Projekt-
und Browsertests bleiben für komplexe Abläufe zuständig.

## Aufruf und Identität

`--states --state-spec <datei>` lädt `web/state-spec/v1`. Bei `--states` ohne
Pfad wird eine vorhandene `web/state-spec.json` im Arbeitsverzeichnis gelesen.
Ohne deklarierte Zustände gibt es keine automatische Zustandsquote.
`--no-interact` verhindert auch angeforderte State-Aktionen; solche Anforderungen
bleiben dann unerfüllt. Ein reiner Aufnahmeauftrag braucht kein `--states`.

Das Manifest nutzt `web/shot-sweep/v2` mit `run_id` und `build_revision`. Für eine Run-Abnahme sind `--run-id` und
`--build-revision` sowie dieselbe `--base` wie in den übrigen Belegen nötig.
Capture ohne Laufidentität bleibt als Bildwerkzeug möglich, ist aber kein
aktueller Run-Beleg.

Jede Anforderung hat exakt die Identität:

```text
route|viewport|target|state
```

`target` ist eine stabile fachliche ID, kein frei austauschbarer Bildname.
`state_matrix` enthält `required`, `captured`, `not_applicable` und `failed`.
Ein Desktop-Newsletter belegt keinen mobilen Checkout. Ein fehlgeschlagener
Aufbau erzeugt keinen Success-Eintrag. Offene Anforderungen werden als Fehler
geführt. N/A braucht dieselben vier Identitätsfelder und einen unterstützten,
begründeten Grund (`static-page`, `no-form` oder `no-async-data`); ein fremdes N/A
oder bloße Prosa schließt keine Lücke.

## Explizite Targets

`targets` nennt Selector, stabile ID und die gewählten Zustände `hover`, `focus`
oder `open-expanded`. Es gibt keine generische Button-Suche als Klickauftrag.
Fokusprüfung nutzt die tatsächliche Tastatur-/Fokusfolge. Escape und beobachtete
Recovery werden festgehalten; ein zweiter allgemeiner Klick gilt nicht als Undo.
Route und Viewport können je Target feststehen. Ohne diese Angaben expandiert
der Auftrag auf die gewählten Routen und Viewports.

## Formularszenarien

Die bestehende Spec unterstützt einen kleinen kontrollierten Submit-Fall:
`prepare` füllt explizite Felder; `trigger.selector` benennt die Aktion;
`hold.url` fängt die erwartete Anfrage ab. `request` legt Methode, Payload und
Anzahl fest. `success` und `error` bestimmen die simulierte Antwort sowie die
zu prüfende UI. Optional zeigt `assert_loading` den wartenden Zustand.

```json
{
  "schema": "web/state-spec/v1",
  "scenarios": [{
    "id": "contact-submit",
    "target": "contact-form",
    "route": "/kontakt",
    "viewport": "mobile",
    "states": ["success", "error"],
    "prepare": {"selector": "input[name=email]", "fill": "isolated@example.test"},
    "trigger": {"selector": "form#contact button[type=submit]"},
    "hold": {"url": "**/lead"},
    "request": {"method": "POST", "post_data": "isolated@example.test", "count": 1},
    "success": {
      "status": 200, "body": "ok",
      "assert": {"selector": "[role=status]", "text": "Gesendet"}
    },
    "error": {
      "status": 500, "body": "error",
      "assert": {"selector": "[role=alert]", "text": "Erneut versuchen"}
    }
  }]
}
```

Payload und UI-Erwartung müssen zum tatsächlichen Projekt passen. Diese Fixture
ist kein universelles Formularformat. Ein HTTP-Fehler mit Erfolgsmeldung,
falsche Payload oder falsche Anfragezahl ist kein Funktions-PASS. Ein bewusst
hergestellter Empty-Zustand kann weiter `setup.evaluate` und `assert` verwenden;
das beweist den dargestellten Zustand, nicht automatisch den echten Datenweg.

`functional.json` (`web/functional/v1`) bindet Run, Revision, Basis und genaue
Zustandsidentitäten. Es enthält Erwartung, beobachtete Request/Response/UI-Daten
und gehashte Bildbelege. Intercepts sind ausdrücklich `backend: mocked`:
Sie prüfen Frontend-Verhalten an einer kontrollierten Antwort und belegen
keine CRM-Zustellung. Fehlende oder unvollständige Prüfungen sind `NOT_CHECKED`.
Echte Backend-/Datenwirkung verlangt den dafür vorhandenen Integrationstest
oder eine autorisierte Probe am bestimmten Ziel.

## Bestehende Playwright-Belege und Accessibility

`playwright_refs` übernimmt aktuelle Receipts vorhandener Tests; der Sweep
führt sie nicht aus. Es verlangt PASS, passende Run-/Build-/Basisbindung und
gehashte existierende Belegdateien. Fehlende oder fremde Receipts sind Fehler.

Fokus, Rolle, Accessible Name, ARIA, Live-Region, Escape und Axe beschreiben nur
die tatsächlich gemessene Eigenschaft. Ein fehlendes Axe-Paket ist eine
Prüflücke. Allgemeines Seiten-Axe ersetzt keine Tastatur-/Fokusprüfung am
veränderten Control.

## Bildprofile und Grenzen

`--mobile` ergänzt 390×844 neben Desktop. Deklarierte Szenarien laufen auch
mobil; ein explizites `viewport` begrenzt sie. Reflow bei 320 CSS-Pixeln bleibt
bei Bedarf eine eigene Prüfung.

`capture_profile` nennt `static`, `states`, `mobile`, `presentation` und
`modified_dom`. Normaler Capture trägt `presentation: runtime`; `--static`
trägt `stabilized`, schaltet Bewegung aus und kann Reveals sichtbar stellen.
Diese Eingriffe machen Vergleichsbilder stabil, beweisen aber weder originales
Ladeverhalten noch Reduced Motion. Jeder Shot trägt einen SHA256-Hash.

Ein Bild zeigt Aussehen. Ein Szenario belegt nur seine ausgeführten Aktionen
und Assertions. Ein Regressionsergebnis braucht einen passenden Vergleich mit
dem bisherigen Stand; keines dieser Ergebnisse ersetzt die anderen.
