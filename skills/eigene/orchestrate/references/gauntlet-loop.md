# Gauntlet-Loop — gegen eine Messlatte bauen, bis der Abstand klein ist

> Herkunft: Muster „Gauntlet Loop“ von Matt Shumer (somethingbig.ai/gauntlet-loop,
> entstanden beim Bau von „Claude of Duty“). **Ideen-Merge, kein Vendoring** —
> keine Lizenzdatei auf der Seite, deshalb hier komplett neu formuliert und an
> unsere Doktrin angepasst (Cross-Model-Pflicht, Regel 8, Rot-Klassen).
> Gelesen 03.08.2026.

## Der Kern in einem Satz

Statt eine gute Ausgabe zu akzeptieren, zwingt der Loop jedes Teilstück in einen
Vergleich gegen eine **konkrete, prüfbare Messlatte** — und lässt so lange bauen,
bis der Vergleich nicht mehr klar verloren geht.

Zyklus: **zerlegen → bauen → richten → wiederholen.**

## Wann dieses Muster (und wann nicht)

**Nutzen bei:** Qualität ist das Ziel, nicht Fertigstellung. Websites, Landingpages,
Ads-Creatives, Design-Systeme, längere Texte, Prototypen, alles mit „das sieht noch
nach KI aus“-Risiko. Auch für Backend: Referenz-Implementierung, Testsuite,
Latenz-Ziel als Latte.

**Nicht nutzen bei:** klar definierten Mechanik-Aufgaben mit binärem Gate
(Migration, Bugfix, Tests grün). Dafür der normale Flotten-Dispatch — der Gauntlet
kostet ein Vielfaches.

Abgrenzung: `eval` misst **ein** Artefakt gegen eine Rubrik, einmal.
Der Gauntlet-Loop ist die **Schleife**, die das Artefakt so lange verbessert,
bis es die Latte fast erreicht. Betriebsart LOOP ist die Dauer-Cron-Version über ein
ganzes Repo; der Gauntlet zielt auf **ein** Werkstück mit **einer** Latte.

## Die Messlatte (der wichtigste Teil)

„Mach es großartig“ scheitert immer. Die Latte muss **inspizierbar** sein — der
Kritiker muss sie ansehen, ausführen oder messen können:

| Aufgabe | Taugliche Latte |
|---|---|
| Website / Landingpage | 2–3 echte Best-in-Class-Seiten als Screenshots (Desktop + Mobil) |
| Ads-Creative | die eigene Referenz-Anzeige (v10) plus 2 fremde Top-Performer |
| Text / Verkaufsseite | ein exemplarischer Absatz mit der Zielklarheit — als **Maßstab**, nicht als Stimme zum Kopieren |
| Frontend-Komponente | dieselbe Komponente bei einem starken Produkt, live geöffnet |
| Backend | Referenz-Implementierung, Testsuite, Latenz-Budget, Failure-Recovery-Test |

Drei Regeln zur Latte:

1. **Sie darf unerreichbar sein.** Der Sinn ist, dass niemand bei „ganz okay für
   KI“ stehenbleibt — nicht, dass sie geschlagen wird.
2. **Keine Latte da? Dann ist das Finden der Latte der erste Auftrag** — an einen
   Recherche-Worker, nicht ans Bauchgefühl.
3. **Latte als Datei ablegen** (Screenshots, URLs, Referenztext) und in jeden
   Kritiker-Prompt hängen — sonst driftet sie über die Runden weg.

## Rollen (unsere Besetzung)

| Rolle | Wer | Was |
|---|---|---|
| **Lead** | Cockpit (Opus) | zerlegt in kleinste einzeln bewertbare Stücke, verteilt, hält den Stand — baut nicht selbst |
| **Builder** | `fable-builder` (Substanz, max zwei parallel), `opus-builder` (Breite), `grok-worker` (Code/Tempo), `sol-worker` (Architektur/Copy), `luna-worker` (nur Masse) | baut ein Stück |
| **Kritiker** | **andere Familie als der Builder**: `sol-critic` / `grok-critic` / `grok-critic` / `opus-critic` | vergleicht gegen die Latte, benennt **die eine größte Lücke** |
| **Glätter** | ein frischer Agent nach jeder großen Welle | gleicht die unabhängig verbesserten Stücke zu einem Ganzen an |

**Harte Kopplung an Regel 8:** Builder und Kritiker sind nie dieselbe Familie.
Ein Builder darf sich nie selbst benoten — er erinnert seine eigene Begründung
und rechtfertigt jede Entscheidung überzeugend. Gebraucht wird ein unabhängiges
Urteil, kein plausibles.

## Kritiker-Kontrakt (Pflicht)

Der Kritiker bekommt: Ziel, die Latte, die geltenden Regeln, das Artefakt.
Er bekommt **nicht**: die Historie des Builders, dessen Begründung, dessen
Selbstauskunft.

1. **Am echten Ding prüfen** — gerenderter Screenshot, laufende Seite, echte
   Testausgabe. **Nie eine vom Builder geschriebene Zusammenfassung benoten.**
   (Bei Web: `web`-Skill / shot-sweep. Bei Code: Test selbst fahren.)
2. **Blind A/B, wo möglich** — Latte und Ergebnis nebeneinander, ohne zu sagen,
   welches unseres ist. Verdikt als `GEWINNER: A|B` plus Begründung.
3. **Genau EINE größte Lücke** zurückgeben, konkret und umsetzbar — keine
   Wunschliste. Zehn Punkte lähmen den Builder; einer bewegt ihn.
4. Format: `GEWINNER: <A|B>` · `GRÖSSTE LÜCKE: <ein Satz>` · `BELEG: <was genau
   gesehen/gemessen wurde>`. Kein „erkläre deinen Gedankengang“ (Regel 19).

## Ablauf

1. **Latte festlegen** (oder Suchauftrag dafür geben) und als Datei ablegen.
2. **Zerlegen** — kleinste Stücke, die **getrennt verbessert und getrennt
   bewertet** werden können. Der Lead zerlegt, nicht der Builder.
3. **Je Stück ein Paar aufsetzen:** Builder + eigener Kritiker, beide mit
   frischem Kontext, Familien überkreuz.
4. **Runde fahren:** Builder baut → Kritiker vergleicht → verliert unser Stück,
   geht es mit der einen Lücke zurück → Builder schließt sie.
5. **Nach jeder großen Welle glätten** — ein frischer Agent zieht die Stücke
   zusammen (Abstände, Typo, Ton, Namensgebung). Kein Redesign, nur Angleich.
6. **Stand sichtbar halten:** `workbench.md` (oder eine HTML-Seite) im Arbeitsordner
   mit Screenshots, Verdikten, offenen Lücken je Stück — damit Raphael vom Handy
   schauen kann, ohne den Lauf zu unterbrechen.
7. **Abbruch:** kein festes Rundenlimit. Schluss ist, wenn (a) die Zugewinne
   erkennbar klein werden, (b) das Budget aufgebraucht ist, oder (c) Raphael
   sagt, es reicht. „Noch nicht fertig“ ist der Normalzustand beim Stoppen.

## Auftragsform (nicht die Architektur vorschreiben)

Dem Lead werden **Ziel und Latte** gegeben — nicht der Bauplan. Vorgeschriebene
Architektur, feste Zerlegung oder eine feste Rundenzahl ersetzen das Urteil des
Modells durch das eigene. **Ziel nennen, Route offen lassen.**

Prompt-Gerüst für den Lead:

```
ZIEL:        <ein Satz, was am Ende existiert>
LATTE:       <Datei/URLs/Screenshots — inspizierbar>
REGELN:      <Rot-Klassen, Tabus, Marke/Doktrin, Zielordner>
FLOTTE:      Builder je Stück nach work_type (Fable/Opus/Grok/Sol; Luna nur mass),
             Kritiker IMMER andere Familie (sol-critic/grok-critic/grok-critic/opus-critic)
KRITIKER:    blind A/B gegen die Latte, am echten Artefakt, EINE größte Lücke
STAND:       workbench.md fortschreiben (Screenshot + Verdikt + offene Lücke je Stück)
FREI:        Zerlegung, Reihenfolge, Anzahl Runden bestimmst du
STOPP:       wenn die Zugewinne klein werden oder das Budget endet
```

## Umsetzung bei uns

- **Ausführung:** über orchestrate-Betriebsart EINMAL bzw. LOOP
  (Dauerbetrieb). `pipeline(stücke, build, kritik, fixWennVerloren)` ist das
  Grundgerüst; `parallel()` nur, wenn eine Stufe wirklich alle Stücke braucht.
- **Effort:** für ernste Läufe hoch fahren (Cockpit `ultracode`/max) — der
  Aufpreis lohnt bei großer Mehr-Agenten-Arbeit. Regel 13 gilt trotzdem: erst
  Effort, dann teureres Modell.
- **Screenshot-Pflicht:** bei allem Visuellen prüft der Kritiker gerenderte
  Bilder, nie Code oder Beschreibung.
- **Rot-Klassen bleiben rot:** Der Loop veröffentlicht nichts, deployt nichts und
  schreibt keine Kundennachricht — Ausgabe bleibt lokal bis zur Signatur.

## Fallen

- **Latte zu vage** → der Loop dreht sich, ohne besser zu werden. Häufigster Fehler.
- **Kritiker liest die Zusammenfassung des Builders** → er benotet eine Erzählung,
  nicht das Werk. Immer Artefakt/Screenshot/Testausgabe verlangen.
- **Gleiche Familie baut und richtet** → Selbstbestätigung, Regel 8 verletzt.
- **Kritiker liefert zehn Punkte** → Builder verzettelt sich. Genau einer.
- **Kein Glättungsschritt** → das Ergebnis wirkt zusammengestückelt, obwohl jedes
  Stück für sich gut ist.
- **Feste Rundenzahl vorgegeben** → gestoppt wird bei „drei Runden rum“, nicht bei
  „Zugewinn klein“.
- **Kein sichtbarer Stand** → Raphael muss nachfragen oder den Lauf unterbrechen.
