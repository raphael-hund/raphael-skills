# Sprech-Text-Regeln — Vorlage vor Regel

## Kernregel: Vorlage vor Regel

Ein Video-Skript für einen Kunden soll klingen wie **dessen** Referenz-Skripte, nicht wie
eine Zusammenfassung von Regeln. Sprechtext, der wie eine aufgesagte Guideline klingt
("Wir bieten Ihnen ein individuelles Konzept, das genau auf Ihre Bedürfnisse zugeschnitten
ist"), fällt sofort als KI-generiert auf. Referenz-Skripte lesen/hören, bis der Rhythmus,
die Satzlängen und die Wortwahl sitzen — **dann erst** schreiben.

Zwei Referenz-Ebenen, beide Pflicht:

1. **Markt-Referenzen (im Skill):** vor dem Schreiben **zwei wörtliche Beleg-Skripte
   derselben Bauform** aus `references/hook-formeln.md` / `references/skript-architekturen.md`
   lesen — das sind Zeilen aus 682 echten, laufenden Ads. Zusätzlich Stichprobe aus der
   Referenz-Datenbank ziehen (siehe SKILL.md, „Referenz-Datenbank").
2. **Kunden-Referenzen:** Referenz für MAKE:
   `/root/clients/client-make/ads/skripte/2026-07-22-MAKE-Ad-Skripte.md`
   (Dominic, Du-Ansprache, kurze Hauptsätze, konkrete Zahlen/Namen statt Kategorien). Bei
   anderen Kunden: deren `ads/`-Ordner als Referenz-Set nutzen; existiert noch keiner, aus
   dem Voice-Dossier + einer echten Textprobe ableiten (siehe `copywriting`-Skill).

## Sprach-Härtung lebt in sprech-sprache.md

Die Regeln für **gesprochenen** Text (kurze Sätze, Kraftwörter nur im Hook/Pain,
un-runde Zahlen, Verzichts-Formel, Case-Schablone, Sign-off, verbotene Schreib-DE-Muster,
Laut-lesen-Gate mit Fail/Pass-Beispielen) stehen in
[sprech-sprache.md](/root/raphael-skills/skills/eigene/ads-video/references/sprech-sprache.md) —
gemessen an 682 echten Ads. Für Orwell-DE-Grundlagen, Floskel-Verbotsliste und
Sprachstil-Auswahl bleibt der `copywriting`-Skill Primärquelle; die Spoken-Schicht ist
eigenständig und wird nicht an copywriting delegiert.

## Nie Regel-Sätze oder Weichmacher im Sprechtext

Zwei Kategorien, die im gesprochenen Text selbst **nichts verloren haben** (auch wenn sie
in der Analyse/im Brief völlig richtig sind):

- **Regel-Sätze** — Sätze, die eine Marketing-Regel paraphrasieren statt etwas zu sagen,
  das ein Mensch tatsächlich ausspricht. Beispiel schlecht: "Wir setzen auf zielgerichtete
  Kommunikation, die Vertrauen aufbaut." Beispiel gut (MAKE-Referenz): "Wir bringen deine
  Schweizer Firma auf Platz 1 bei Google in 60 Tagen — schriftlich garantiert."
- **Weichmacher** — Worthülsen, die nichts Konkretes behaupten: "individuell", "massgeschneidert",
  "ganzheitlich", "auf Augenhöhe", "nachhaltig" (außer wörtlich gemeint), "innovativ",
  "Lösung" ohne Objekt. Jeder Weichmacher ersetzt eine Stelle, an der eine Zahl, ein Name
  oder eine konkrete Handlung stehen könnte.

**Wort-Substitutionstest:** Satz laut lesen, nachdem die Kunden-Begriffe eingesetzt sind —
klingt das wie etwas, das ein Mensch tatsächlich sagen würde? Fällt der Test durch, wird
der Satz gestrichen, nicht poliert.

## no-ai-slop ist Pflicht-Gate

Nach jedem fertigen Skript-Entwurf läuft der `no-ai-slop`-Skill als Zweit-Editor über den
Sprechtext (Edit-Modus): Muster-Katalog anwenden (Throat-clearing, Faux-Insight,
Colon-Enthüllung, binäre Kontraste, Roboter-Rhythmus, Fake-profound Kicker u. a.),
jeden Eingriff an einem benannten Muster begründen, Stimme bewahren. **Sprech-Zusatz:**
Füllwörter, Selbstkorrekturen und Kraftwörter, die echt wirken (R2/R3 in
`sprech-sprache.md`), sind **keine** Slop-Muster — nicht wegpolieren. Ohne bestandenen
Slop-Check gilt kein Skript als fertig (completion_criteria).

## Claims-Verbote gehören dem ads-Router

HWG/UWG- und Meta-Policy-Verbotsliste liegt in `eigene/ads/references/claims-verbote.md` des
`ads`-Router-Skills. `ads-video` schreibt Skripte, prüft sie aber nicht selbst final gegen
die Verbotsliste — claims-qa läuft laut `ads`-Ablauf in einer **frischen Session, anderer
Modellfamilie** (Sol), nie als Selbstprüfung des Autors (Regel 8). Beim Schreiben trotzdem
grob gegensteuern: keine Vorher-Nachher-Heilversprechen, keine unbelegten Superlative
("der Beste", "Nr. 1" ohne Beleg), keine erfundenen Zahlen — jede Zahl im Skript muss aus
einer vorhandenen Dossier-Datei (Proof/VOC) stammen (siehe Grounding-Checkliste im
SKILL.md-Ablauf). Disclaimer direkt hinter Monster-Zahlen (P5 in
`skript-architekturen.md`) ist Schreibregel, ersetzt aber nicht die Claims-QA.

## Gotchas

- **Perfekte Grammatik ist kein KI-Beweis, gehäufte Weichmacher sind eins.** Nicht jeden
  sauberen Satz kaputt-editieren — auf Cluster von Tells achten (mehrere Weichmacher/
  Regel-Sätze in Folge), nicht auf einen isolierten Fund.
- **Fable-Gotcha (Regel 19):** falls ein Verifier-/Judge-Prompt für den Sprechtext gebaut
  wird ("prüfe, ob das nach Regel klingt"), nie "erkläre deinen Gedankengang" verlangen —
  das kann bei Fable eine `reasoning_extraction`-Refusal auslösen. Immer "pass/fail mit
  eingefügtem Beweis (Zitat der verdächtigen Zeile)".
