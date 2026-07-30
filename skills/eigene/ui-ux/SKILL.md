---
name: ui-ux
version: 0.1.0
description: >
  Feuert bei App-/Dashboard-/Tool-/SaaS-Produkt-UI, Formularen, Settings und
  Admin-Flächen — der product-Register-Pfad, bei dem Design dem Produkt dient.
  Nutzt die vendored ui-ux-pro-max Offline-Wissensdatenbank (BM25-Suche,
  Design-Systeme, Stacks, Farb-/Style-Empfehlungen). Trigger: "Dashboard bauen",
  "App-UI", "Admin-Panel", "Formular designen", "Settings-Seite", "Tool-UI",
  "SaaS-Interface", "Datentabelle", "UI-UX", "Produkt-UI".
class: R
scope: agency
sensitivity: internal
source: pointer — ui-ux-pro-max Offline-DB ist vendored im design-Skill
  (skills/design/vendor/ui-ux-db/ aus nextlevelbuilder/ui-ux-pro-max-skill @ 5c0946f, MIT)
loads: []
requires_skills: [design@^0]
completion_criteria:
  - "Anfrage als App/product-Register erkannt und an design/ui-ux-Linie weitergeleitet (keine eigenen Design-Regeln hier)"
  - "Offline-DB abgefragt (search.py --design-system, dann --domain) und Empfehlungen an den Projekt-Stack gebunden"
---

# ui-ux — Router auf die ui-ux-Linie in design

**Zweck (1 Satz):** Wegweiser für Produkt-UI — die eigentliche Methodik und die
vendored Offline-Wissensdatenbank (ui-ux-pro-max) leben im **design**-Skill.

## Routing (einzige Aufgabe)

Wenn dieser Skill feuert:

1. **design laden** (falls nicht schon geschehen) und dort die **ui-ux-Linie**
   wählen: `references/ui-ux-db-nutzung.md` + `references/design-doktrin.md`.
2. **Offline-DB abfragen** (kein Netz, reine Stdlib):
   `python3 ../../design/vendor/ui-ux-db/scripts/search.py "<thema>" --domain <style|color>`
   (aus einem Skill-Ordner heraus; absolut:
   `/root/raphael-skills/skills/design/vendor/ui-ux-db/scripts/search.py`).
   Erst `--design-system`, dann die Domain.
   Der Pfad stand hier bis 30.07.2026 als `vendor/…` mit dem Zusatz "im
   design-Skill-Verzeichnis" — fachlich richtig, aber wer die Zeile kopiert,
   bekommt "No such file or directory". Ein Befehl in einem Skill soll laufen,
   nicht erst uebersetzt werden.
3. **Stack erkennen** (package.json etc.) und Empfehlungen daran binden.
4. Karten sind hier legitime Datencontainer — aber nie verschachtelt.

## Was hier NICHT steht (und warum)

- Keine duplizierte DB und keine kopierten Regeln — `skills/design/vendor/ui-ux-db/`
  und `references/ui-ux-db-nutzung.md` sind die einzige Quelle (Single Source).
- Keine Gemini-/Paid-Bildgenerierung — der ui-ux "design"-Sub-Skill
  (Logo/CIP/Icon/Banner) hing an GEMINI_API_KEY und wurde beim Vendoring
  komplett entfernt. Bilder laufen über `references/bildgenerierung.md`.
- Keine Landing-/Marketing-Regeln — das ist die taste-Linie (Skill `taste`).

## Gotchas

- **Register vor DB-Abfrage klären:** Eine Landingpage mit Dashboard-Screenshot
  bleibt taste-Linie; die Frage ist, was der BESUCHER auf dieser Fläche tun soll.
- **DB empfiehlt KPI-Karten** — auf Landing-Flächen trotzdem vermeiden
  (Quellen-Konflikt entschieden in design-doktrin.md §4).
- **Semantische Farb-Tokens statt rohem Hex** in Komponenten (uiux-Regel).
