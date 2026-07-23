# Sprech-Text-Regeln — Vorlage vor Regel

## Kernregel: Vorlage vor Regel

Ein Video-Skript für einen Kunden soll klingen wie **dessen** Referenz-Skripte, nicht wie
eine Zusammenfassung von Regeln. Sprechtext, der wie eine aufgesagte Guideline klingt
("Wir bieten Ihnen ein individuelles Konzept, das genau auf Ihre Bedürfnisse zugeschnitten
ist"), fällt sofort als KI-generiert auf. Referenz-Skripte lesen/hören, bis der Rhythmus,
die Satzlängen und die Wortwahl sitzen — **dann erst** schreiben.

Referenz für MAKE: `/root/clients/client-make/ads/skripte/2026-07-22-MAKE-Ad-Skripte.md`
(Dominic, Du-Ansprache, kurze Hauptsätze, konkrete Zahlen/Namen statt Kategorien). Bei
anderen Kunden: deren `ads/skripte/`-Ordner als Referenz-Set nutzen; existiert noch
keiner, aus VOICE.md + einer echten Textprobe ableiten (siehe `copywriting`-Skill,
Schritt 1 "Voice laden").

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

**Wort-Substitutionstest** (aus `beat-struktur-und-aufbau.md`/Quellen): Satz laut lesen,
nachdem die Kunden-Begriffe eingesetzt sind — klingt das wie etwas, das ein Mensch
tatsächlich sagen würde? Fällt der Test durch, wird der Satz gestrichen, nicht poliert.

## Stil kommt vom copywriting-Skill

Für Orwell-DE-Regeln, Floskel-Verbotsliste, Passiv-/Nominalstil-Detektor und die
Sprachstil-Auswahl (Lokal-Vertrauen / Coach-DR / Skeptiker-DR / Quiz-Funnel / Velvet-Rope /
Enterprise) gilt der `copywriting`-Skill als Primärquelle — hier nicht duplizieren.
`ads-video` lädt `copywriting` (`requires_skills`) für jeden Schreibschritt.

## Claims-Verbote gehören dem ads-Router

HWG/UWG- und Meta-Policy-Verbotsliste liegt in `references/claims-verbote.md` des
`ads`-Router-Skills. `ads-video` schreibt Skripte, prüft sie aber nicht selbst final gegen
die Verbotsliste — claims-qa läuft laut `ads`-Ablauf in einer **frischen Session, anderer
Modellfamilie** (Sol), nie als Selbstprüfung des Autors (Regel 8). Beim Schreiben trotzdem
grob gegensteuern: keine Vorher-Nachher-Heilversprechen, keine unbelegten Superlative
("der Beste", "Nr. 1" ohne Beleg), keine erfundenen Zahlen — jede Zahl im Skript muss aus
PROOF.md/VOC.md stammen (siehe Grounding-Checkliste im SKILL.md-Ablauf).

## Gotchas

- **Perfekte Grammatik ist kein KI-Beweis, gehäufte Weichmacher sind eins.** Nicht jeden
  sauberen Satz kaputt-editieren — auf Cluster von Tells achten (mehrere Weichmacher/
  Regel-Sätze in Folge), nicht auf einen isolierten Fund.
- **Fable-Gotcha (Regel 19):** falls ein Verifier-/Judge-Prompt für den Sprechtext gebaut
  wird ("prüfe, ob das nach Regel klingt"), nie "erkläre deinen Gedankengang" verlangen —
  das kann bei Fable eine `reasoning_extraction`-Refusal auslösen. Immer "pass/fail mit
  eingefügtem Beweis (Zitat der verdächtigen Zeile)".
