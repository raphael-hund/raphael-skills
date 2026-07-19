# Orwell für deutsche Copy (adaptiert)

George Orwell, "Politics and the English Language" (1946), sechs Regeln — auf deutsche
Verkaufstexte übertragen. **Split für die Gates:** Regeln 2–5 laufen deterministisch als G1,
Regeln 1 + 6 im G2-Judge (6 = Override).

## Die 6 Regeln (deutsch)

1. **Nie eine abgedroschene Metapher/Redewendung**, die man ständig in Werbung liest.
   ("das i-Tüpfelchen", "die Extrameile gehen", "aus einem Guss", "next level"). → **G2-Judge.**
2. **Nie ein langes Wort, wo ein kurzes reicht.** ("nutzen" statt "in Anspruch nehmen",
   "hilft" statt "ist behilflich bei"). → **G1.**
3. **Nie Passiv, wo Aktiv geht.** ("Wir bauen dir X" statt "X wird für dich gebaut"). → **G1.**
4. **Wenn ein Wort gestrichen werden kann, streiche es.** Füllwörter raus: "eigentlich,
   quasi, sozusagen, im Grunde, letztendlich, natürlich, gewissermaßen". → **G1.**
5. **Nie ein Fremd-/Fachwort/Jargon, wenn ein Alltagswort existiert.** ("verbessern" statt
   "optimieren", wenn die Voice kein Fachpublikum will). → **G1.**
6. **Brich jede dieser Regeln, bevor du etwas offenkundig Hölzernes ("barbarous") schreibst.**
   → **G2-Override.** Klang und Menschlichkeit schlagen die Regel. Ein Text, der alle 5
   Regeln perfekt erfüllt und trotzdem steif klingt, ist schlechter als ein warmer mit
   einem bewussten Regelbruch.

## Deutsche Passiv-/Nominalstil-Heuristik (G1-Detektor)

Treffer markieren, wenn Dichte über Schwelle (Richtwert: mehr als 1 Treffer je ~40 Wörter):

**Passiv-Marker**
- "wird/werden/wurde/wurden/worden + Partizip II" (Vorgangspassiv).
- "ist/sind + Partizip II" als Zustandspassiv, wo Aktiv ginge.
- "man" als Verschleierung des Handelnden ("man sollte" → "du solltest / wir").

**Nominalstil-Marker (das deutsche Haupt-Problem)**
- Nominalisierungen auf **-ung/-heit/-keit/-nis** gehäuft ("die Durchführung der
  Optimierung zur Steigerung der Sichtbarkeit").
- **Funktionsverbgefüge**: "zur Anwendung bringen" (→ anwenden), "in Erfahrung bringen"
  (→ erfahren), "eine Entscheidung treffen" (→ entscheiden), "Unterstützung bieten"
  (→ unterstützen), "zum Einsatz kommen" (→ eingesetzt werden → besser: aktiv).
- **Streck-Genitiv-Ketten**: 3+ aneinandergereihte Genitive.
- **Blähfügungen**: "im Rahmen von", "im Hinblick auf", "aufgrund der Tatsache, dass"
  (→ weil), "zum Zwecke der" (→ um zu).

**Fix-Richtung:** Nomen → Verb, Passiv → Aktiv, Handelnden benennen, Blähfügung → einfaches
Wort. Kurze Sätze mischen mit längeren (Rhythmus), nicht alles gleich lang.

## Regel-6-Override in der Praxis

Der G2-Judge fragt nur: "Klingt der Text menschlich und wie die Brand-Voice — ja/nein, mit
Beleg?" Wenn ein bewusster Regelbruch (langes Wort, unvollständiger Satz, umgangssprachliche
Metapher) den Text besser macht, ist das ein PASS, kein Fehler.
