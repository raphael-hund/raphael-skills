# Video-Visuals — Einblendungen, Formate, erster Frame

Muster verallgemeinert aus MAKE-Referenzmaterial (Einblendungs-Plan und
Illustrations-Prompts der Juli-Skripte; Originaldateien inzwischen archiviert).
Konkrete Kunden-Assets (Logo, Farben, Website-Screens) bleiben kundenspezifisch.
Hier nur die übertragbare Struktur.

## Einblendungs-Plan — ein Beat, eine Einblendung

Ein Skript bekommt einen Einblendungs-Plan als eigene Tabelle: gesprochener Satz ↔
Einblendung. Grundregel: **ca. alle 5-10 Sekunden EINE Einblendung**, außer man kann
etwas Spezifisches echt zeigen (Website-Screen, Foto). Weniger ist mehr. Der Sprecher
trägt das Video, Einblendungen unterstützen, sie ersetzen nicht.

Drei Einblendungs-Typen, priorisiert:

1. **Echt** (bevorzugt, wenn verfügbar): Website-Screen-Recording, echtes Foto
   (z. B. Shooting-Foto), echte Referenz. Deckt oft zwei Beats gleichzeitig ab
   (z. B. ein Fotoshooting-Bild deckt sowohl "Stufe zwei" als auch die
   Sprecher-Vorstellung ab).
2. **Doodle/Illustration**: wenn nichts Echtes existiert oder ein Konzept abstrakt ist
   (z. B. "Zwei-Stufen-System", "Platz 1 bei Google"). Siehe Illustrations-Rezept unten.
3. **Nichts**: bei Beats, die frontal getragen werden sollen (Vorstellung, CTA-Abschluss,
   emotionale Kernsätze): nicht jeder Satz braucht eine Einblendung.

Beispiel-Tabellenform (aus MAKE-Referenz):

| Gesprochener Satz | Einblendung |
|---|---|
| HOOK-Zeile | Doodle, klein, 1 Motiv |
| Erklärender Satz ohne Bildbedarf | nichts |
| Proof-Satz mit Kundenname | ECHT: Kunden-Website-Screen |
| Abschluss/CTA | nichts |

Headline-Overlay ergänzt die Aussage. Untertitel geben den Sprechtext korrekt
wieder. Ein früher Overlay hilft nur, wenn er lesbar ist und zur Aussage passt.

## Fünf Dreh-Formate

Nach einem Static-Sieg denselben Hook in eines dieser Formate legen.
Erstes Standbild = One-Frame-Test: hält der Frame als Static, darf gedreht werden.

### Talking Head

Wofür: Garantie, Callout, CTA. Gesicht trägt Glaubwürdigkeit.
Aussehen: Brustbild, Blick in die Linse, ruhiger Hintergrund oder echter Ort.
Bewegung klein. Overlay oben, Gesicht frei. Stumm: Lippen plus Overlay reichen.

### B-Roll

Wofür: Proof und Mechanismus. Zeigen statt behaupten.
Aussehen: Hände, Screen, Ort, Werkzeug. Kein Reden ins Bild nötig.
Schnitt eng. Jeder Cut ein neues Objekt. Overlay nennt die Zahl, Bild zeigt sie.

### Green Screen

Wofür: Screen-Proof, SERP, Dashboard, Folie hinter dem Sprecher.
Aussehen: Person vor Key, dahinter ein echter Capture, kein Stock-Himmel.
Der Screen muss lesbar sein. Sprecher zeigt hin. Erster Frame = Claim plus Screen.

### Skit

Wofür: Pain und Einwand. Kurze Szene vor dem Pitch.
Aussehen: zwei Rollen oder ein Vorher-Moment. 3–6 Sekunden Handlung, dann Offer.
Kein Sketch-Kabarett. Der ICP erkennt seinen Tag. Overlay nennt den Filter.

### Split Screen

Wofür: Vorher/Nachher, alt gegen neu, zwei Beweise nebeneinander.
Aussehen: zwei gleich große Felder, eine Linie, eine Zahl pro Seite.
Links Problem, rechts Ergebnis. Erster Frame muss beide Seiten lesen lassen.

## 6×6 nach Winner (Evers)

Die fünf Dreh-Formate oben bleiben der MAKE-Default nach Static-Sieg.
Wenn ein Video-Winner steht, kommt horizontale Skalierung dazu, nicht nur mehr Spend.
Sechs Winkel (Problem, Lösung, Social Proof, Preis, FOMO, Angst) mal die Formate
UGC, Static, Split Screen, Green Screen, High Production, Screen Recording/Proof.
Playbook: `../../ads/references/marc-evers-playbook.md`, Varianten nach Belegen.

## One-Frame-Test

Pause bei Sekunde 0. Der Frame muss allein als Static tragen:
Thema und Relevanz erkennbar, vorhandener Overlay lesbar, CTA noch nicht nötig.
Zahl, Name und Ortsbezug nur einsetzen, wenn sie zur Aussage passen und belegt sind.
Fällt der Test: Format oder Overlay ändern, nicht nur den Sprechsatz.

## Illustrations-Stil-Rezept (Prompt-Baustein)

Struktur eines Stil-Rezepts, das pro Kunde einmal festgelegt und dann für alle Doodles
wiederverwendet wird (Konsistenz über den ganzen Batch):

- Grundtechnik benennen (z. B. "Hand-drawn whiteboard doodle, thick black marker,
  deliberately scribbly")
- Hintergrund festlegen (meist "white background")
- Format/Ratio festlegen (z. B. 16:9, Elemente GROSS und lesbar: Handy-Bildschirm testen)
- Farbakzente sparsam und markenkonform benennen (Brand-Farbe aus `brand/` des Kunden,
  nie raten: im MAKE-Fall war "#E30613" eine Annahme, die gegen `brand/` geprüft werden
  musste)
- Negativ-Liste ("no clean vector shapes, no 3D, no photo" o.ä.) — verhindert Drift zum
  generischen Stockfoto-Look
- Logo-Platzierung, falls gewünscht ("small scribbled MAKE logo in a corner")

Jede einzelne Illustration bekommt dann einen kurzen, konkreten Bildprompt (1 Motiv, GROSS,
mit Sprech-Zeile referenziert, welchem Beat sie zugeordnet ist) plus das Stil-Rezept
angehängt.

## Referenzbilder — Pflicht, nicht optional

Nach Bildprompts-Referenz-Doktrin: immer inhaltliche **und** stilistische Referenzbilder
mitgeben (Add-Image-Prinzip), nie nur aus Text generieren, wenn Referenzen existieren.
Zwei Referenz-Rollen im Prompt benennen:

- **Inhaltliche Referenz**. Was konkret zu sehen sein soll (Logo, Produkt, Person, Ort).
- **Stilistische Referenz**. Der gewünschte Illustrationsstil/Look (z. B. eine bereits
  genehmigte Doodle-Folie als Stilvorlage).

## Bildgenerierungs-Policy (Verweis)

Modellwahl, Auflösung, KI-Menschen-Regeln und Asset-Indexierung sind nicht Teil dieses
Skills. Operative Doktrin:
`/root/raphael-skills/skills/eigene/_archiv/web-1.6.0-bis-2026-09-06/references/bildgenerierung.md`.
Kurzfassung für Video-Illustrationen: **Illustrationen (2D/3D, stilisiert) → GPT Image 2**,
auch ohne Referenz: GPT Image ist der beste Illustrator, Recraft ist dafür falsch.
Auflösung mindestens 2k, besser 4k. Uncanny-Check gilt auch für Illustrationen mit
Personen-Darstellung (Strichmännchen sind unkritisch, realistischere Stile prüfen).

## B-Roll und Live-Aufnahmen

Wo eine Einblendung eine echte Handlung zeigen soll (z. B. Live-Google-Suche am Handy,
um einen Proof-Claim zu stützen), gehört das in die Drehliste, nicht in die
Illustrations-Pipeline: als eigener Punkt "Handy-Take" markieren, damit es am Drehtag
nicht vergessen wird.

## Gotchas

- **Einblendung ohne Sprech-Zeilen-Bezug ist ein Blocker.** Jede Einblendung muss exakt
  einem gesprochenen Satz/Beat zugeordnet sein. Ein loser "passt thematisch"-Bezug führt
  zu Timing-Fehlern im Schnitt.
- **Markenfarbe nie annehmen.** Farbwerte aus dem Gedächtnis oder von einer alten Quelle
  übernehmen ist ein wiederkehrender Fehler (MAKE-Fall: "#E30613" musste explizit gegen
  `brand/` geprüft werden, bevor sie in Prompts verwendet wurde): vor dem ersten
  Illustrations-Batch einmal gegen `client-<name>/brand/` (oder Äquivalent) verifizieren.
- **Zu viele Einblendungen verdecken den Sprecher.** Der Sprecher trägt das Video. Eine
  Einblendung pro 5-10 Sekunden ist eine Obergrenze, kein Ziel; bei Zweifel weniger.
