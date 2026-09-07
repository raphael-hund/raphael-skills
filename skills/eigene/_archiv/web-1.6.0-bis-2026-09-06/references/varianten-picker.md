# Varianten-Picker — drei echte Richtungen statt einer geratenen

**Wofür:** Wenn ein einzelnes UI-Stück (Hero, Preiskarte, Toast, Formularschritt,
Button-Interaktion) noch keine entschiedene Form hat. Statt eine Version zu bauen
und Raphael raten zu lassen, ob sie stimmt: mehrere **wirklich verschiedene**
Versionen bauen, hinter einen Umschalter hängen, live durchblättern lassen.

**Herkunft:** `/root/tools/vendor/emilkowalski-skills/skills/prototype/`
(`SKILL.md` + `PICKER.md`, MIT). Die Picker-Optik dort ist eine **wörtliche
Vorlage** — Markup, CSS und Tastatur-Verdrahtung stehen in `PICKER.md` und
werden unverändert kopiert, nicht nachgebaut.

**Abgrenzung zu den Nachbar-Referenzen:** `rebuild-from-image.md` baut *eine*
vorgegebene Vorlage nach. `web-clone-playbook.md` nimmt eine *fremde* Seite als
Vorlage. Hier gibt es **keine Vorlage** — die Form wird erst gefunden.

## Wann das dran ist (und wann nicht)

| Lage | Werkzeug |
|---|---|
| Briefing nennt kein Vorbild, das Stück trägt die Seite (Hero, Angebotsblock) | **Varianten-Picker** |
| Es gibt einen Screenshot/eine Referenzseite | `rebuild-from-image.md` / `web-clone-playbook.md` |
| Die Form steht, nur die Umsetzung fehlt | direkt bauen, kein Picker |
| Bestehende Motion soll besser werden | `design`-Skill, `design/references/motion-audit-workflow.md` |

Pro Lauf **ein** Stück. „Das Dashboard" ist kein Stück — dann das mit dem größten
Hebel auswählen, das ansagen und den Rest als eigene Läufe anbieten.

## Die fünf harten Regeln

1. **Nie in Produktionscode.** Alles lebt in einer eigenen Fläche
   (`/prototypes/<slug>` bei laufendem Dev-Server, sonst **eine** eigenständige
   HTML-Datei). Nichts aus dem Projekt importiert daraus.
2. **Jede Variante hat eine benannte Achse** — Layout, Dichte, Persönlichkeit,
   Motion, Interaktionsmodell. Vor dem Bauen muss die Achse in einem Satz
   sagbar sein. Andere Akzentfarbe ist **keine** Achse.
3. **Jede Variante funktioniert vollständig.** Echte Interaktion, echte
   Bewegung, echter Inhalt in Projektsprache — kein Lorem ipsum, keine toten
   Knöpfe, kein „hier wäre dann X".
4. **Der Picker ist Werkzeug, kein Kandidat.** Optik wörtlich aus `PICKER.md`.
   Nie mit Projekt-Tokens umstylen — er soll erkennbar Gerüst sein, sonst
   bewertet Raphael den Picker mit.
5. **Nach der Wahl aufräumen.** Gewinner an seinen Platz integrieren, die
   Prototyp-Fläche löschen — außer Raphael sagt ausdrücklich, sie soll bleiben.

## Ablauf

1. **Umfeld lesen.** Stack, Tokens (Farben, Radien, Abstände, Fonts, Eases),
   Persönlichkeit, Nachbarschaft des Stücks. Die Varianten benutzen **die
   Projekt-Tokens** — gemeinsame Tokens sind keine Konvergenz, jede Variante
   soll aussehen, als könnte sie morgen live gehen.
2. **Richtungen festlegen, bevor Code entsteht.** Standard **3**, höchstens 5.
   Namen beschreiben die Richtung („Ruhig", „Editorial", „Verspielt", „Dicht") —
   nie „Variante A/B/C". Zwei Richtungen, die sich nur in Farbe oder Text
   unterscheiden, sind **eine** Richtung; eine davon ersetzen.
3. **Picker-Gerüst bauen.** Markup/CSS/Tasten wörtlich aus
   `/root/tools/vendor/emilkowalski-skills/skills/prototype/PICKER.md`. Eine
   Variante zur Zeit, **volle Größe, im echten Umfeld** — ein Toast braucht eine
   Seite dahinter, eine Karte braucht Nachbarn. Nie nebeneinander als Briefmarken
   beurteilen. Umschalten ist **sofort**, ohne Übergang (100+/Sitzung → nach der
   Häufigkeitsregel aus `motion-doktrin.md` keine Animation).
4. **Selbst durchblättern, dann Screenshots.** `scripts/shot-sweep.mjs` auf die
   Prototyp-Route, **einmal pro Variante** (`?v=1`, `?v=2`, …), jedes PNG per
   Read ansehen — die Screenshot-Pflicht aus `SKILL.md` gilt hier genauso.
   Konsole muss sauber sein.
5. **Vorlegen und stehenbleiben.** Eine Tabelle: Nummer, Name, Achse, wann diese
   Richtung gewinnt, was sie kostet. Kein Favorit in der Tabelle. Dazu die
   URL/der Dateipfad und die Tasten (`1–N`, `←`/`→`, `R`).
6. **Gewinner integrieren**, Prototyp-Fläche löschen (Regel 5). Will Raphael eine
   weitere Runde, das Gerüst behalten und **um** die favorisierte Richtung herum
   neu divergieren.

## Divergenz ist keine Ausrede für schlechtes Handwerk

Jede einzelne Variante hält den Craft-Floor: `ease-out` bei Entrances (nie
`ease-in`), UI-Motion unter 300 ms, richtiger `transform-origin`, nur
`transform`/`opacity`, Reduced-Motion behandelt. Eine schlampige Variante
erweitert die Erkundung nicht — sie verliert an der Ausführung und sagt nichts
über ihre Richtung aus.

## Warum das kein Regelbruch der Autonomie-Doktrin ist

Die Doktrin verbietet Rückfragen mitten in der Arbeit. Der Picker ist **keine
Rückfrage** — er ist ein fertiges, lauffähiges Artefakt mit drei verteidigbaren
Antworten. Er wird abgeliefert, nicht abgewartet: Raphael blättert, wann er will.
Solange keine Wahl kommt, läuft die restliche Arbeit weiter (Variante 1 gilt als
Arbeitsstand). Erst die Integration des Gewinners braucht seine Entscheidung.

## Kein G1 auf der Prototyp-Fläche

`g1-gate.mjs` prüft die **Auslieferung**. Eine Prototyp-Fläche wird nie
ausgeliefert — sie hat keinen SEO-Auftrag, keine echten Links, keine finale Copy.
Das Tor auf `/prototypes/…` zu fahren erzeugt nur Fehlbefunde. Geprüft wird der
**integrierte Gewinner** an seinem echten Ort, dann greift G1 ganz normal.

## Falscher Fall

Drei „Varianten" eines Hero, die sich in Überschriftengröße, Button-Farbe und
Abstand unterscheiden. Raphael blättert durch und sieht dreimal dasselbe — die
Runde hat nichts entschieden, aber Zeit gekostet. Richtig wären drei Antworten
auf dieselbe Frage: *Bild trägt die Fläche* vs. *Typografie trägt die Fläche*
vs. *Produkt-UI trägt die Fläche* — drei Layouts, die man nebeneinander nicht
verwechseln kann.
