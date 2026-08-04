> Vendoriert aus jakubkrehel/skills (github.com/jakubkrehel/skills), Skill
> `better-writing` @ Commit `a673333`, MIT-Lizenz. Kondensiert aus SKILL.md.
> Bewusst NUR der UI-/Microcopy-Anteil (Button-Labels, Fehlermeldungen,
> Empty States, Toggles, Platzhalter) — die allgemeinen Copywriting-Teile
> (Voice-Recherche, Ton-Matrix, "einfache Woerter") liegen bereits in den
> Skills `copywriting` und `no-ai-slop` und wurden hier NICHT dupliziert.
> Wie Text rendert (`text-transform`, Truncation, typografische Zeichen)
> siehe `typografie.md`; Fehler-Markup und Ansagen (`aria-invalid`,
> Live-Regionen) siehe `barrierefreiheit.md`; Platz fuer uebersetzte Strings
> siehe `layout-struktur.md`. Fuer deutsche Verkaufs-/Marketing-Texte gilt
> weiter `copywriting`, nicht diese Datei.
> Details: `../VENDORING.md`.

# Interface-Texte (Microcopy)

Text, der im Interface verschwindet: klar und kurz schlaegt clever,
Konsistenz schlaegt Abwechslung, und die beste Fehlermeldung ist die
Interaktion, die so umgebaut wurde, dass der Fehler nicht mehr auftreten
kann.

**Bestehende Terminologie zuerst lesen.** Vor jedem Umschreiben die
Nachbar-Texte, die Produkt-Begriffe und die Lokalisierungs-Konventionen
ansehen. Eine Abweichung von generischer Klarsprache ist nur dann ein Fund,
wenn sie Inkonsistenz, Mehrdeutigkeit, Uebersetzungsrisiko oder einen
unpassenden Ton erzeugt.

## Ein Wort pro Sache

Heisst es im Menue "Archivieren", heisst es im Toast nicht "In den Speicher
verschieben". Eine Voice, der Ton flext mit dem Einsatz:

| Kontext | Ton |
|---|---|
| Erfolg, Onboarding, Empty States | warm, darf leicht sein |
| Routine-Aktionen, Einstellungen | neutral, minimal |
| Fehler, destruktive Bestaetigungen | ruhig, klar, null Verspieltheit |
| Datenverlust, Sicherheit | ernst, explizit |

## Den Leser direkt ansprechen

In anleitenden Interface-Texten den Leser direkt ansprechen ("du"/"Sie" laut
Kunden-Voice), nie "der Nutzer". "Wir" in Fehlern vermeiden, wo es
Verantwortung verwischt: besser "Inhalt kann nicht geladen werden" als "Wir
haben gerade Probleme, diesen Inhalt zu laden". Besitzanzeigende Woerter
sparsam ("Favoriten" statt "Deine Favoriten"), und die Perspektive nie
versehentlich wechseln.

**Eingabegeraet treffen:** "tippen" auf Touch, "klicken" mit Zeiger,
"auswaehlen", wenn beides moeglich ist.

**Nie Saetze aus Fragmenten um Variablen bauen** (`"Du hast " + n + " neue
Nachrichten"`) — die Wortstellung aendert sich je Sprache. Vollstaendige
Template-Strings mit ordentlicher Pluralisierung nutzen.

## Buttons beginnen mit einem Verb

Button-Labels starten mit dem Verb der konkreten Aktion: "Senden",
"Entwurf speichern", "Projekt loeschen". Nie "OK!", "Los geht's!" oder ein
nacktes "Ja"/"Nein" bei folgenreichen Aktionen.

**Bestaetigungs-Buttons wiederholen die Konsequenz**, damit der Dialog ohne
Lesen des Fliesstexts beantwortbar ist: "Dieses Projekt loeschen?" bietet
`Projekt loeschen` und `Abbrechen`, nicht `Ja` und `Nein`.

## Ein Vokabular pro Flow

Mehrstufige Flows nutzen durchgehend dieselben Woerter: "Los geht's" zum
Einstieg, "Weiter" **oder** "Naechster Schritt" (eines waehlen) zum
Vorruecken, "Fertig" zum Abschluss. Wechselnde Synonyme lassen Nutzer
raetseln, ob die Buttons Unterschiedliches tun.

## Links beschreiben ihr Ziel

Linktext muss ausserhalb seines Kontexts verstaendlich sein — Screenreader-
Nutzer navigieren ueber eine Liste aller Links der Seite. "Zur
Abrechnungs-Doku", nie "Hier klicken" (verletzt zusaetzlich die
Eingabegeraet-Regel auf Touch) und nie ein nacktes "Mehr erfahren", wenn
mehrere davon auf einer Seite stehen. Jeweils praezisieren: "Mehr ueber
Exporte erfahren".

## Eine Gross-/Kleinschreibungs-Regel

Pro Element-Typ (alle Buttons, alle Headings) **eine** Konvention waehlen und
durchhalten. "Aenderungen Speichern" neben "Aenderungen verwerfen" liest sich
als Schlamperei. Im Englischen ist sentence case der sichere Default
(ruhiger, keine Regeln pro Wort, lokalisiert sauber).

## Einstellungen beschreiben den AN-Zustand

Ein Toggle wird danach benannt, was passiert, wenn er **an** ist:
"Lesebestaetigungen senden" — den Aus-Zustand schliessen Nutzer selbst.
Nie negativ labeln ("Keine Lesebestaetigungen senden") — das macht aus dem
Toggle eine doppelte Verneinung.

Direkt auf die gemeinte Einstellung verlinken statt den Pfad zu beschreiben:
ein Link "Benachrichtigungs-Einstellungen", nicht "Gehe zu Einstellungen >
Benachrichtigungen > E-Mail".

## Fehler sagen, wie man es behebt — direkt neben der Stelle

Ein Fehler ist eine Anweisung, direkt am fehlgeschlagenen Feld:

| Schlecht | Gut |
|---|---|
| Das Passwort ist zu kurz | Waehle ein Passwort mit mindestens 8 Zeichen |
| Ungueltiger Name | Verwende fuer den Namen nur Buchstaben |
| Ups! Da ist etwas schiefgelaufen. | Speichern nicht moeglich. Pruefe deine Verbindung und versuche es erneut. |

Keine Schuldzuweisung, kein "Ups", keine Ausrufezeichen. Hinweise **positiv**
formulieren ("Verwende nur Buchstaben" statt "Keine Zahlen oder Sonderzeichen")
und **vor** dem Fehler zeigen, nicht danach. Feuert derselbe Fehler bei vielen
Nutzern, die Interaktion umbauen statt die Formulierung zu polieren.

## Empty States zeigen nach vorn

Ein Empty State sagt, was dieser Ort ist und wie er sich fuellt — mit genau
einer klaren naechsten Aktion:

```html
<!-- Schlecht: ein Schulterzucken -->
<p>Keine Ergebnisse.</p>

<!-- Gut: Orientierung plus naechster Schritt -->
<p class="font-medium">Noch keine Projekte</p>
<p class="text-sm text-zinc-500">Projekte buendeln deine Aufgaben und Dateien.</p>
<button class="mt-4">Projekt anlegen</button>
```

Such- und Filter-Empty-States nennen die Suchanfrage und bieten einen
Ausgang: "Keine Treffer fuer 'Quartal'. Filter zuruecksetzen". **Nie**
wichtige Dauer-Information im Empty State parken — sie verschwindet in dem
Moment, in dem Inhalt existiert.

## Platzhalter sind Beispiele, keine Labels

Platzhalter zeigen das erwartete Format (`name@beispiel.de`, `TT.MM.JJJJ`).
Ein Platzhalter ist **nie** das einzige Label eines Feldes — er verschwindet
bei der Eingabe. Jedes Feld behaelt ein sichtbares Label.

## Common Mistakes

| Problem | Fix |
|---|---|
| Lokale Umschreibung ignoriert die etablierte Terminologie | Nachbar-Texte und Style-Guide vor dem Vorschlag lesen |
| "Der Nutzer" in anleitendem Interface-Text | den Leser direkt ansprechen |
| "Wir haben gerade Probleme…" verschleiert Ursache/Ausweg | direkter Status plus naechster Schritt |
| `OK` / `Ja` auf einem destruktiven Dialog | Konsequenz wiederholen: "Projekt loeschen" |
| "Weiter" in Schritt 2, "Naechster Schritt" in Schritt 3 | ein Vokabular durch den ganzen Flow |
| "Hier klicken" oder nacktes "Mehr erfahren" | Ziel benennen: "Zur Abrechnungs-Doku" |
| "Aenderungen Speichern" neben "Aenderungen verwerfen" | eine Schreibweisen-Regel pro Element-Typ |
| Toggle "Keine Lesebestaetigungen senden" | den AN-Zustand labeln |
| "Ups! Da ist etwas schiefgelaufen." | sagen, was zu tun ist — am fehlgeschlagenen Feld |
| "Keine Ergebnisse." als ganzer Empty State | orientieren und eine naechste Aktion anbieten |
| Platzhalter uebernimmt die Label-Rolle | sichtbares Label; Platzhalter zeigt nur das Format |
| `"Du hast " + n + " Nachrichten"` | vollstaendige Template-Strings mit Pluralisierung |

## Review-Checkliste

- [ ] Ein Begriff pro Sache, durchgehend im ganzen Flow
- [ ] Buttons starten mit einem Verb; Bestaetigungen wiederholen die Konsequenz
- [ ] Links beschreiben ihr Ziel, auch aus dem Kontext gerissen
- [ ] Eine Gross-/Kleinschreibungs-Regel je Element-Typ
- [ ] Toggles labeln den AN-Zustand
- [ ] Jeder Fehler sagt, wie man ihn behebt, und steht am betroffenen Feld
- [ ] Jeder Empty State orientiert und bietet eine naechste Aktion
- [ ] Jedes Feld hat ein sichtbares Label (Platzhalter zeigt nur das Format)
- [ ] Keine aus Fragmenten zusammengesetzten Saetze um Variablen
- [ ] Verben passen zum Eingabegeraet (tippen/klicken/auswaehlen)
