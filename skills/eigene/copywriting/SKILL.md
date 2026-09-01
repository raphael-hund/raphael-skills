---
name: copywriting
version: 0.11.0
description: >
  Feuert für JEDEN einzelnen deutschen Verkaufs-/Marketing-Text (Ads, Web,
  SEO, einzelne E-Mail) UND für das Vermenschlichen/Entfloskeln von
  KI-generiertem Text: klarer, aktiver, floskelfreier Text in der
  Brand-Voice des Kunden, frei von AI-Slop-Tells. Trigger: "Text schreiben",
  "Copy", "umschreiben", "Stil prüfen", "entfloskeln", "klingt nach KI",
  "humanize", "AI-Slop raus". Für mehrteilige Email-Sequenzen, Drip-Kampagnen,
  Trigger-/Automations-Flows (z.B. Warenkorbabbrecher-Mails) siehe emails
  als Primärskill; copywriting liefert dort nur den Text/Ton als Sekundärskill.
class: F
scope: agency
sensitivity: internal
source: >
  ergänzt um voice-analysis.md, adaptiert aus knowledge-work-plugins/
  partner-built/brand-voice (Tribe AI, MIT-Lizenz), Stand 2026-07-20;
  ergänzt um direct-response-klassiker.md: destilliert aus
  robpalmer99/claude-code-copywriting-skills (CC-BY-4.0), Stand 2026-07-21
loads: [references/voice-dna.md, references/kanaele.md, references/beispiele-gute-copy.md, references/orwell-de.md, references/floskel-verbote.md, references/cta-framework.md, references/vsl-framework.md, references/ai-slop-patterns-en.md, references/mental-models-en.md, references/copy-editing-sweeps.md, references/voice-analysis.md, references/direct-response-klassiker.md, references/sprachstile-referenz.md]
loads_external: ["/root/.claude/forbidden.md"]
requires_skills: [eval@^0]
completion_criteria:
  - "scripts/forbidden-check.py auf dem Entwurf gelaufen, Exit 0 (harte Sperre, vor allem anderen); Skript-Ausgabe im Output zitiert"
  - "Skript-Hinweise (A1/A5/A6/A7/B6b) einzeln beurteilt: je Hinweis 'gefixt' oder 'bewusst behalten weil <Grund>'"
  - "G1 grün: Orwell-Regeln 2-5 + Passiv-/Nominalstil-Detektor + Floskelliste (inkl. quantifizierter Interpunktions-Schwellen) = 0 Treffer"
  - "voice-dna.md Selbstcheck (5 Fragen) = 5x ja"
  - "Selbstkritik-Zwischenschritt durchlaufen: 'was ist an diesem Entwurf noch offensichtlich KI-generiert?' beantwortet, vor G2"
  - "G2 Judge: unabhängiger Eval-Agent (andere Modellfamilie), Regeln 1+6 (Override) + Brand-Voice-Treue >= 0.7"
  - "Kontext-Disziplin belegt: entweder <=3 Referenzdateien + Kundenmaterial gelesen, oder Subagent-Split mit Aufteilung im Output genannt"
---

# copywriting — deutscher Klartext in Brand-Voice

**Lies zuerst (brand-voice-Slot):**
`/root/raphael-brain/business/` (voice-Dateien, falls zentral) **und** zur Laufzeit
`/root/clients/client-<name>/wiki/VOICE.md` (kundenspezifische Voice):
der Kunde gewinnt bei Widerspruch. Außerdem `/root/raphael-brain/wiki/craft/hooks/`.

**Kein Extra-Load:** `no-ai-slop` ist ein Router auf diesen Skill. Site-Build
lädt nur `copywriting` (G1→G2). `/no-ai-slop` extra nur auf ausdrücklichen Wunsch.

## Zweck (1 Satz)

Text produzieren/prüfen, der klar, aktiv und floskelfrei ist und wie der jeweilige Kunde
klingt: als Stil-Gate für ads, web, seo.

## Betriebsregeln (vor dem ersten Satz lesen)

**1. Schreib-Doktrin gilt.** ASD-STE100 (ein Gedanke pro Satz, max. 20 Wörter,
aktiv, ein Wort = eine Bedeutung) plus Zinssers vier Prinzipien
(Simplicity, Brevity, Clarity, Humanity). Siehe `/root/.claude/CLAUDE.md`.

**2. `forbidden.md` ist das härteste Gate.** Aktive Datei: `/root/.claude/forbidden.md`.
Ein Treffer = Fail. Läuft VOR G1. Trage neuen Slop sofort dort nach (Abschnitt F),
statt ihn im Kopf zu behalten.

**Web-Einstieg (Bau-Workflow des web-Skills):** Schreibt ein Copy-Leaf
(`kimi-worker` oder `sol-builder`) Website-Copy, fährt es G0 (`forbidden.md`)
und G1 **selbst vor der Rückgabe** und legt die Belege bei; G2 ≥ 0.7 läuft erst
zum Launch durch einen Judge fremder Familie. Copy ohne G0/G1-Beleg gilt als
nicht fertig und wird nicht eingebaut. Vertrag: `web/references/rolle-bau.md`.

**Werkzeuge (in `scripts/`):**

| Skript | Zweck | Aufruf |
|---|---|---|
| `forbidden-check.py` | misst A–F, Exit 1 bei Treffer | `python3 scripts/forbidden-check.py <datei>` |
| `forbidden-check.py --doku` | dasselbe für Regelwerk-Dateien (ignoriert ✗/✓-Beispiele, Verbotslisten, Zitat-Korpora) | `… --doku <datei>` |
| `em-dash-fix.py` | ersetzt Em-Dash-Denkpausen durch Punkt/Komma/Doppelpunkt | `python3 scripts/em-dash-fix.py [--dry] <datei>` |
| `test-forbidden-check.sh` | 46 Regressionsfälle (hit/no, B8/B9, E3-Generik, End-to-End) | `bash scripts/test-forbidden-check.sh` |
| `test-em-dash-fix.sh` | 13 Fälle, u. a. Zitate und Backtick-Vorlagen | `bash scripts/test-em-dash-fix.sh` |

**Vor jeder Regex-Änderung an einem der Skripte laufen beide Tests.** Sie halten
Fehlalarme und Verpasser fest, die beim Bauen mehrfach aufgetreten sind:
`robust` traf nicht `robuste`, `nicht nur X` wurde als Antithese gemeldet,
und `em-dash-fix.py` zerstörte in einer frühen Fassung Negativ-Beispiele
sowie Formatvorlagen in Backticks.

**`em-dash-fix.py` immer erst mit `--dry` ansehen.** Das Skript ändert
ausschließlich Zeichensetzung. Es meidet Zitate, Backtick-Vorlagen,
Überschriften, Tabellen und Quellenangaben. Was es trotzdem anfasst,
gehört vor dem Schreiben geprüft.

**`forbidden.md` liegt außerhalb eines Git-Repos.** Nach jeder Änderung sichern:
`cp /root/.claude/forbidden.md /root/raphael-skills/skills/eigene/copywriting/references/forbidden-backup.md`

**3. Modell-Wahl für den Schreib-Schritt.**

| Aufgabe | Modell | Grund |
|---|---|---|
| Deutsche Verkaufs-Copy schreiben | `kimi-worker` oder `sol-builder` (gleichberechtigt) | Copy-Owner laut Rollenlogik 01.09.2026; Opus schreibt nie Copy |
| Ad-Copy, kreative Angles | `kimi-worker` | Ads-Spezialist, knapper Output |
| Umschreiben/Kürzen mechanisch | `luna-worker` | exakte Vorgabe, kein Eigenleben |
| Eval/Judge | `sol-pruefer` oder `kimi-recherche` | andere Familie als der Schreiber |

Fable schreibt **keine** Copy: zu wortreich. Ein Modell schreibt nie den
eigenen Text ab: Schreiber und Prüfer sind immer verschiedene Familien.

**4. Writer-Kontext unter 50 %.** Über 50 % Füllstand fällt die Textqualität hart
ab. Braucht der Auftrag mehr Material (langer Korpus, viele Referenzen):
pro Teilstück einen eigenen Subagenten einsetzen.
Faustregel: mehr als 3 Referenzdateien + Kundenmaterial → splitten.

**5. Der Eval-Agent ist unabhängig.** Kein Text geht raus, den der Schreiber
selbst freigegeben hat. Prüfauftrag an den Eval-Agenten enthält immer:
`forbidden.md`, `references/voice-dna.md`, die VOICE.md des Kunden, den Entwurf.
Rückgabe: pass/fail je Regel mit **eingefügtem Beleg aus dem Text**.
Nie "erkläre dein Denken" fragen (Fable-Gotcha, Regel 19).

**6. Handedit vor Veröffentlichung.** Jeder Draft geht als Entwurf an Raphael,
nie direkt live. Der Skill liefert Entwurf + Eval-Bericht, nicht "fertig".

## Ablauf

1. **Voice laden** — VOICE.md des Kunden (Duzen/Siezen, Jargon-Level, Erlaubt-/Verboten-Sätze).
   Fehlt eine belastbare Voice in VOICE.md, vor dem Schreiben kurz klären (oder aus einer
   echten Textprobe des Kunden ableiten statt aus einer generischen "natürlichen" Stimme):
   Duzen/Siezen, welcher Humor (trocken/sarkastisch/keiner), was würde dieser Kunde **nie**
   sagen, für welche Plattform (Landingpage ≠ Ad ≠ Newsletter ≠ WhatsApp). Muss VOICE.md neu
   gebaut werden, Vorlage + Modell in `references/voice-analysis.md` nutzen: **Voice ist
   konstant, Ton flext**: "Wir sind/Wir sind nicht"-Tabelle mit Beleg, Terminologie-Tabelle,
   Tonalitäts-Matrix je Kanal, Confidence-Stufe pro Sektion.
1b. **Kanal festlegen**: `references/kanaele.md`. Ad, Video, Landingpage, E-Mail, SEO,
   Social brauchen jeweils eigenes Framing. Dieselbe Idee wird pro Kanal neu gebaut.
   Bei Multi-Kanal-Aufträgen: Kern in EINEM Satz schreiben, dann pro Kanal neu bauen:
   nie den längsten Text kürzen.

1c. **Beispiele laden**: 2–3 passende Belege aus `references/beispiele-gute-copy.md`
   wählen (Branche + Preisklasse + Kanal). Ohne echte Beispiele regrediert jedes LLM
   zum Mittelwert. Die Datei markiert je Beispiel auch, welcher Teil **nicht** kopiert wird.

2. **Schreiben/Umschreiben**: nach `references/voice-dna.md` (Casing, Rhythmus, Lexikon,
   Anrede, Beweis-Muster, CTA-Regeln, Kanal-Dials) und Orwell-DE (`references/orwell-de.md`).
   Kern-Rhythmusregel: Satzlängen müssen springen (lang → kurz → mittel); drei gleichlange
   Sätze in Folge sind ein Fail. Perfekte Grammatik
   oder gehobenes Vokabular allein ist **kein** KI-Beweis (siehe Detection Guidance in
   `references/ai-slop-patterns-en.md`): nicht jede saubere Formulierung kaputt-editieren.
   **Sprachstil wählen:** Für Conversion-Copy (Landing, Ads, Sales) vor dem Schreiben einen
   der 6 Referenz-Sprachstile aus `references/sprachstile-referenz.md` wählen
   (Lokal-Vertrauen / Coach-DR / Skeptiker-DR / Quiz-Funnel / Velvet-Rope / Enterprise):
   gewählt nach Kunde + Kanal + Markt-Reife, nie nach eigener Vorliebe. Der Stil liefert
   Rhythmus, Proof-Muster und CTA-Form; die VOICE.md des Kunden gewinnt bei Konflikt.
3. **G0: `forbidden.md` (härtestes Gate, läuft VOR G1):**
   `/root/.claude/forbidden.md` durchgehen, Abschnitt A bis F. Jeder Treffer = Satz neu
   schreiben, nicht abschwächen. Besonders: Staccato-Paare (A1), Antithese-Reframes
   „nicht X, sondern Y" (A2), Isokolon-Metapher-Paare (A3), Rückwärts-Referenzen (A4),
   Drei-Wort-Triaden (A5), Interpunktions-Schwellen (C).

3b. **G1 (deterministisch):**
   - Orwell-Regeln **2–5** als Checks (kurzes Wort, Aktiv, kürzen, kein Fachjargon-Ballast).
   - **Passiv-/Nominalstil-Detektor** (`references/orwell-de.md` → Heuristik).
   - **LLM-Floskel-Verbotsliste** dt.+engl. inkl. quantifizierter Interpunktions-Schwellen und
     Struktur-Regeln (`references/floskel-verbote.md`) = 0 Treffer.
   - Bei englischer Copy zusätzlich gegen den 33-Pattern-Katalog prüfen
     (`references/ai-slop-patterns-en.md`): auf **Cluster** von Tells achten, nicht auf
     Einzelfunde.
4. **Selbstkritik-Zwischenschritt (billig, vor dem teuren G2):** Entwurf laut durchlesen und
   knapp beantworten: "Was macht diesen Text noch offensichtlich KI-generiert?" Die Antwort
   direkt einarbeiten, bevor G2 läuft: hebt die Qualität vor dem Judge-Call günstig an.
5. **G2 (unabhängiger Eval-Agent, andere Modellfamilie als der Schreiber):**
   Prüfauftrag bekommt: den Entwurf, `/root/.claude/forbidden.md`,
   `references/voice-dna.md`, die VOICE.md des Kunden. Geprüft wird:
   - Orwell-Regel **1** (abgedroschene Metaphern)
   - Orwell-Regel **6** (Override: Regel brechen, bevor der Text hölzern wird)
   - **Brand-Voice-Treue** ≥ 0,7
   - **voice-dna-Selbstcheck** (5 Fragen aus Abschnitt 8 dort)
   - **forbidden.md**: Gegenprüfung, ob der Schreiber Treffer übersehen hat

   Rückgabe: pass/fail je Regel **mit wörtlich eingefügtem Beleg aus dem Text**.
   Nie "erkläre dein Denken" fragen (Regel 19 / Fable-Gotcha).

   **Jeder Fund des Eval-Agenten, der ein neues Muster zeigt, wird sofort in
   `forbidden.md` Abschnitt F nachgetragen**: mit kaputtem Beispiel und Fix.
   Die Harness wird bei jedem Durchlauf besser, sonst wiederholt sich der Fehler.
6. **Hook & CTA**: nach `references/cta-framework.md` (Hook = drei Funktionen + 1,8-s-Regel,
   Curious-vs-Committed-Diagnose, Financial Qualification über die Situation). Für
   Persuasion-Framing (Anchoring, Verlust-Aversion, Decoy-Effekt etc.) siehe
   `references/mental-models-en.md`: ersetzt keine echte Voice-of-Customer-Recherche.
7. **Zweit-Edit bleibt hier:** Wenn der Text nach G2 noch nach KI klingt, denselben
   Ablauf G0→G1→G2 erneut fahren. Skill `no-ai-slop` nicht extra laden.
8. **Verkaufs-/VSL-Struktur**: bei Long-Form (VSL, Sales-Page, Nurture) nach
   `references/vsl-framework.md`: Reihenfolge nach Überzeugungskraft, Identitäts-Commitment
   auf Danke-Seiten, Nurture aus Empfängerperspektive.
9. **Selbstcheck vor Abgabe (letzter Schritt, still anwenden):** Zuerst die 5 Fragen aus
   `references/voice-dna.md` Abschnitt 8 (Satzlängen springen? erste Zahl früh? Anrede
   durchgehend? forbidden.md null? Generik-Test bestanden?). Dann: Banned Words? Drei
   gleichlange Sätze in Folge? Parataxe (drei+ kurze Sätze hintereinander)? Hedging statt
   klarer Position? Mehr als 1 Em-Dash/500 Wörter? Erfundene Zahlen/Zitate? "Könnte das
   jede KI für jeden Kunden geschrieben haben?": falls ja, eine konkrete Zahl/Nomen/Konsequenz
   ergänzen. Bei langer Copy (Sales-Page, Landingpage) zusätzlich optional die
   Seven-Sweeps (`references/copy-editing-sweeps.md`) als Qualitäts-Gate vor Auslieferung.

10. **Übergabe als Entwurf.** Ausgeliefert wird: Entwurf + Eval-Bericht + Liste der
   `forbidden.md`-Nachträge. Nie "fertig, kann live". Raphael handeditiert vor
   Veröffentlichung. Das gehört zum Verfahren.

## Gotchas

- **`forbidden.md` schlägt jede Stilvorlage.** Auch die Referenzseiten in
  `references/beispiele-gute-copy.md` enthalten Slop ("Kein Warten, kein Vertrösten",
  "It's not an event. It's a workshop.", das Nervensystem/Gehirn-Bild). Übernommen
  wird das Beweis- und Aufbau-Muster, nie die kaputte Formulierung.
- **Eval-Agent muss eine andere Modellfamilie sein.** Ein Modell findet den eigenen
  Slop nicht. Es hat ihn erzeugt, weil es ihn für gut hält.
- **Kontext über 50 % = Textqualität fällt.** Bemerkbar an: längeren Sätzen,
  mehr Hedging, Rückwärts-Referenzen. Bei diesen Symptomen Kontext prüfen,
  nicht am Text herumdoktern.
- **Kürzen ist kein Kanal-Transfer.** Eine Landingpage auf 90 Wörter gekürzt ist
  keine Ad. Pro Kanal aus dem Kern-Satz neu bauen (`references/kanaele.md`).

- **Orwell-Split:** Regeln 2–5 sind G1 (deterministisch), Regeln 1+6 sind G2 (Judge). Regel 6
  ist die **Override-Klausel**. Ein starrer Regel-Roboter produziert steifen Text; der Judge
  darf Regelbruch belohnen, wenn er den Text menschlicher macht.
- **Voice-Slot: Kunde vor Zentrale.** Ein globaler Skill kopiert nie Kundeninhalt — VOICE.md
  wird zur Laufzeit als Verweis geladen (scope/sensitivity!).
- **Judge-Prompt nie nach dem Denkweg fragen ("erklaere dein Denken"-Muster)** → Fable `reasoning_extraction`-Refusal, stiller
  Opus-Fallback (Regel 19). Immer "pass/fail + eingefügter Beweis".
- Deutsch ist nicht Englisch: Nominalstil ("die Durchführung der Optimierung") und
  Funktionsverbgefüge ("zur Anwendung bringen") sind die deutschen Haupt-Floskeln. Der
  Detektor zielt darauf, nicht auf englische Passiv-Marker.
- Anglizismen sind nur dann Fehler, wenn ein Alltagswort existiert (Orwell Regel 5). Die
  Voice mancher Kunden erlaubt sie bewusst.
- **Hohe CTR ist ein Warnsignal, kein Ziel.** CTR > ~2 % + schwache Conversion = Copy zu
  „curious" → Richtung „committed" verschieben (filtert vor). Nie auf reine Klickmenge
  optimieren (`references/cta-framework.md`).
- **Show-Rate ist die echte KPI für Danke-/Nurture-Texte. Kein Judge-Score.** Der Judge
  bewertet Klartext/Voice, nicht ob ein Text „verkauft"; ob Identitäts-Commitment wirkt,
  zeigt nur das echte Erscheinen der Leads.
- **Nurture nur aus Empfängerperspektive** („das hilft DIR"). Die Hammer-Sequenz (hohe
  Frequenz) ist Grauzone und **nur für bereits gebuchte** Leads: bei kalten Leads Spam.
- **LLM nie „schreib eine Anzeige für X" fragen** (Mittelwert-Regression) — erst 2–3 eigene
  funktionierende Beispiele + Begründung als Referenz geben (`references/vsl-framework.md`).
- **Einzelfund ≠ Beweis.** Ein Em-Dash, ein "however", perfekte Grammatik oder gehobenes
  Vokabular allein sagen nichts über KI-Herkunft aus: erst ein **Cluster** mehrerer Tells
  gleichzeitig ist ein Fund (Detection Guidance in `references/ai-slop-patterns-en.md`). Ein
  zu aggressiver Detektor zerstört sonst legitime, nur zufällig KI-ähnliche Texte.
- **AI-Copywriting-Voice ist kein Stilmittel, sondern ein Tell:** "Nicht nur X — sondern Y",
  "Sag Goodbye zu X", Drei-Wort-Triaden als Slogan-Reflex, "X-Theater"-Framing wirken beim
  Schreiben originell, lesen sich aber bei jedem Kunden gleich generisch
  (`references/floskel-verbote.md` → AI-Copywriting-Voice).
- **Voice vs. Ton nicht verwechseln.** Will der Kunde "lockerer", ist das ein Ton-Dial
  (Formalität runter, Energie hoch): nicht ein neuer Charakter. Alle Voice-Attribute auf
  Maximum zu ziehen wirkt aufgesetzt; 2-3 führende pro Text reichen
  (`references/voice-analysis.md`).
