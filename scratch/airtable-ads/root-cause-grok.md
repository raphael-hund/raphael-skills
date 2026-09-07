# Root-Cause: warum `ads-video` keine Top-Video-Ad-Skripte produziert

Stand: 2026-08-11 · Worker: grok · Scope: nur Diagnose, kein Skill-Neubau  
Belegbasis: vollständiger Skill + 4 References; Nachbarn `hook-taxonomie`, `copywriting`, `no-ai-slop`; Kontrast `ads-copy`; ≥15 echte Skripte aus `ads-shard-1.json` (u. a. Speedscaling, SEOLabs, Pascal Harting, Marc Evers, TradingFreaks, Dr. Matt Shiver).

**Kernurteil in einem Satz:** `ads-video` lehrt einen sauberen Analyse- und Produktions*prozess*, aber nicht die *Formeln, Sprach-Ebene und Messlatte*, mit denen die Top-Referenzen wirklich klingen — im Gegensatz zu `ads-copy`, das gemessene Bauformen + Korpus + Checker hat.

---

## 1. Die größten Defekte (schonungslos, mit Beleg)

### Defekt 1 — Abstrakter Prozess statt konkreter Bauformen/Formeln
**Beleg Skill:**  
- [SKILL.md](/root/raphael-skills/skills/eigene/ads-video/SKILL.md) L43–72: Ablauf = Wissen laden → Angle übernehmen → Referenzen analysieren → nach Skelett schreiben → Beat-Tabelle → Visuals.  
- [skript-analyse-methodik.md](/root/raphael-skills/skills/eigene/ads-video/references/skript-analyse-methodik.md) L44–57: Fill-in-the-blank nur mit Platzhaltern (`[HOOK: <ICP-Callout…>]`), **explizit** „nicht wie es klingen soll“.  
- [beat-struktur-und-aufbau.md](/root/raphael-skills/skills/eigene/ads-video/references/beat-struktur-und-aufbau.md) L9–27: ein generisches 5-Beat-Skelett (Hook→Problem/Mechanismus→Proof→Offer→CTA) mit Median-Positionen.

**Was die Referenzen tun, was der Skill nicht lehrt:**  
Echte Skripte sind **benannte Formen mit fester Reihenfolge und wörtlichen Einstiegen**, nicht „fülle Skelett“:

| Form (aus Shard) | Einstieg wörtlich | Struktur |
|---|---|---|
| Garantie-Hook | „Ich bringe dich in den nächsten 31 Tagen auf Platz 1 … oder du bezahlst mir keinen Cent.“ (Pascal Harting) | Garantie → Mechanismus → Case → CTA |
| Proof-first | „Schau mal, wir haben diesen Handwerksbetrieb hier auf Platz 1 …“ (SEOLabs) | Proof → Mechanism → Outcome → Offer → Problem → Social-Proof → CTA |
| Outcome-Hook | „Diese Immobilienmakler erhalten jeden Monat über 100 qualifizierte Anfragen …“ | Outcome → Problem → Mechanism → Proof → Offer → CTA |
| Callout+Quali | „Du bist Webdesigner und machst mindestens 3k/m?“ / „Du hast eine Marketingagentur, machst über 5K …“ (Marc Evers) | Callout → Dream-Outcome → Proof-Stack → Offer → 48h-CTA |
| Pain-Montage / Choice | Anapher-Fragen „Wie skaliere ich endlich…?“ + 3-Wege-Vergleich (Speedscaling) | Pain → Option1/2 (töten) → Option3=Offer → Proof-Stack → CTA |
| Insider-Schrei | „Ich hab den Meta-Algorithmus geknackt, jetzt mal ohne Scheiß.“ (Speedscaling ROAS-5) | Schrei-Hook → Spend-Proof → Offer schenken → Mechanism → CTA |
| Lehr/Curiosity | „Niemand redet über diesen einen Schritt im Trading…“ (TradingFreaks) | Curiosity → Nightmare → Mechanismus → Gratis-Training → CTA |

**Kontrast:** `ads-copy` hat **sechs Bauformen mit Volltext-Templates und Beleg-Ads** ([bauformen.md](/root/raphael-skills/skills/eigene/ads-copy/references/bauformen.md), [referenz-korpus.md](/root/raphael-skills/skills/eigene/ads-copy/references/referenz-korpus.md)). `ads-video` hat **null** vergleichbare Video-Bauformen.

**Folge:** Agent produziert korrekt befüllte Beat-Tabellen und generische „Wenn du [ICP] bist…“-Sätze — nicht die Formen, die im Markt laufen.

---

### Defekt 2 — Kein Gold-Korpus wörtlicher Top-Skripte im Skill
**Beleg Skill:**  
- Ablauf verweist auf Kundenordner `client-<slug>/ads/` und MAKE-Datei ([SKILL.md](/root/raphael-skills/skills/eigene/ads-video/SKILL.md) L31–36, L53–58; [skript-analyse-methodik.md](/root/raphael-skills/skills/eigene/ads-video/references/skript-analyse-methodik.md) L66–72).  
- Im Skill-Paket selbst: **kein** `referenz-korpus.md`, keine Vollskripte, keine gemessenen Sprach-Metriken.  
- Einzig wörtliches Positivbeispiel im Paket: ein MAKE-Satz in [sprech-text-regeln.md](/root/raphael-skills/skills/eigene/ads-video/references/sprech-text-regeln.md) L24–25.

**Was die Referenzen tun:**  
Top-Skripte sind extrem **konkret und wiederholbar** (Namen, Beträge, Fristen, „Schau mal“, „Bis gleich“, „Cheers dein Marc“, „Hau ran“). Ohne Volltext-Korpus im Skill muss der Agent aus Dossier-Prosa raten oder dünne Kunden-Referenzen reverse-engineeren — und fällt auf Mittelwert-KI zurück.

**Kontrast:** `ads-copy` SKILL.md lädt Korpus + Bauformen und misst Gedankenstriche/Absätze/Satzlänge am echten Korpus. `ads-video` misst nichts am Gesprochenen.

**Folge:** „Vorlage vor Regel“ ([sprech-text-regeln.md](/root/raphael-skills/skills/eigene/ads-video/references/sprech-text-regeln.md) L1–9) bleibt eine Prosa-Bitte ohne Material.

---

### Defekt 3 — Keine Sprach-Ebene für *gesprochenen* Ad-Text (Satzbau/Rhythmus/Filler)
**Beleg Skill:**  
- [sprech-text-regeln.md](/root/raphael-skills/skills/eigene/ads-video/references/sprech-text-regeln.md) L18–34: verbietet Regel-Sätze/Weichmacher + Wort-Substitutionstest — **kein** Rhythmus-Rezept (Satzlänge, Atemzüge, Filler, Wiederholung, Stakkato).  
- L36–40: „Stil kommt vom copywriting-Skill“ — copywriting ist Primär-Gate für **geschriebenen** DE-Verkaufstext (Orwell, Floskeln, Absätze), nicht für VO/Talking-Head.  
- [skript-analyse-methodik.md](/root/raphael-skills/skills/eigene/ads-video/references/skript-analyse-methodik.md) L45–46: Slot-Anweisung **darf nicht** sagen, wie es klingen soll.  
- Klo-Check ([beat-struktur-und-aufbau.md](/root/raphael-skills/skills/eigene/ads-video/references/beat-struktur-und-aufbau.md) L93–99) ist gut, aber Checkliste ohne Positiv-/Negativ-Sätze und ohne Zahlen (Wörter/Satz, Hook-Sekunden).

**Was die Referenzen tun:**  
- **Sprechmarker:** „Schau mal“, „jetzt mal ohne Scheiß“, „super geil“, „Hau ran“, „Bis gleich“, „Cheers dein Marc“.  
- **Atem-/Rhythmus:** lange aneinandergehängte Hauptsätze mit „und“ (Speedscaling Claude-Event, Marc Evers), oder Anapher-Stakkato (Pain-Fragen).  
- **Quali im ersten Atemzug:** ICP + Schwelle + Outcome in 1–2 Sätzen („Webdesigner … mindestens 3k/m“, „Marketingagentur … über 5K … Retailerkunden 2–4k“).  
- **CTA gesprochen, kurz, persönlich:** „trag dich ein, ich rufe dich in den nächsten 48 Stunden persönlich an“, nicht „Jetzt mehr erfahren“.

**Folge:** Agent schreibt saubere, floskelfreie **Schriftsprache** (copywriting-Gate bestanden) und klingt trotzdem nicht wie eine Ad, die jemand ins Handy brüllt.

---

### Defekt 4 — Hook-Wissen nur verlinkt, nicht nutzbar im Skill-Lauf
**Beleg Skill:**  
- [SKILL.md](/root/raphael-skills/skills/eigene/ads-video/SKILL.md) L48–52: Hook/Angle „kommt aus dem ads-Router“, Verweis auf `eigene/ads/references/hook-taxonomie.md` — **nicht** in `loads:`.  
- [beat-struktur-und-aufbau.md](/root/raphael-skills/skills/eigene/ads-video/references/beat-struktur-und-aufbau.md) L7: „Hook-Familien selbst NICHT dupliziert — siehe wiki/craft/hooks/“.  
- Einzige Formel im Paket: `"Wenn du [ICP] bist und [Outcome] willst, brauchst du [Offer]"` ([beat-struktur-und-aufbau.md](/root/raphael-skills/skills/eigene/ads-video/references/beat-struktur-und-aufbau.md) L35–37) — eine von vielen realen Formen, und oft die schwächste (zu generisch).

**Was hook-taxonomie + Referenzen tun, was der Skill nicht einbindet:**  
- [hook-taxonomie.md](/root/raphael-skills/skills/eigene/ads/references/hook-taxonomie.md) L24–39: **Committed language** (Neugier + Filter + Erwartungsmanagement), Curious→Committed-Diagnose.  
- L48–65: Hook = **Visual + VO + Caption** ohne Duplikation; Pipeline Segment→Motivation→Format→3 Komponenten.  
- L67–79: Diagnose-Trichter Thumbstop/Hold/CTR/CVR + On-Ramp-Regel.  
Shard-Felder `Hook-Familie` / `awareness_level` spiegeln das: Callout, Garantie, Proof, Outcome, Problem/Pain, Curiosity/Lehr — mit **anderen** Sprechformeln als „Wenn du [ICP]…“.

**Folge:** „mindestens 3 Hook-Varianten“ ([SKILL.md](/root/raphael-skills/skills/eigene/ads-video/SKILL.md) L23, L62–63) werden oft 3 Umformulierungen desselben generischen Callouts, keine Matrix Segment×Motivation×Familie.

---

### Defekt 5 — Kein hartes Anti-Slop- / Qualitäts-Gate für Video-Skripte
**Beleg Skill:**  
- `completion_criteria` ([SKILL.md](/root/raphael-skills/skills/eigene/ads-video/SKILL.md) L19–24): Beat-Tabelle, Grounding, Sprechtext ohne Weichmacher, ≥3 Hooks, Visuals-Plan — **alles Format/Compliance**, keine Qualitäts-Messlatte.  
- `requires_skills: [copywriting@^0]` — **kein** `no-ai-slop`.  
- Claims-QA bewusst outgesourct ([SKILL.md](/root/raphael-skills/skills/eigene/ads-video/SKILL.md) L81–86); kein interner „klingt das wie Top-Ad?“-Judge mit Gold/Fail-Beispielen.  
- Kein `scripts/pruefen.py`-Äquivalent (ads-copy hat deterministischen Checker).

**Was die Referenzen implizit als Messlatte haben (Skill lehrt es nicht messbar):**  
1. Erste 1–2 Sätze: ICP oder Beweis oder Garantie — nie Mission-Statement.  
2. ≥1 harte Zahl + benannter Mechanismus (Eigennname: „Suchflow-System“, „No-Funnel-Ads“, „ROAS-5-Formel“, „100K-Roadmap“).  
3. Proof gestapelt oder visuell gezeigt, nicht einmal „viele zufriedene Kunden“.  
4. CTA mit Zeitfenster/Handlung („48 Stunden“, „trag dich ein“, „Kommentar LEADS“).  
5. Gesprochene Register-Marker; null Weichmacher-Cluster; null „wir bieten Ihnen…“.

**Folge:** Agent kann alle completion_criteria grün haben und trotzdem Mid-Skripte liefern. „Nichts prüft die eigene Hausarbeit“ wird hier zur Ausrede, weil **gar keine prüfbare Messlatte** im Skill steckt.

---

### Defekt 6 — Awareness nur als Einzeiler, ohne Struktur-Mapping
**Beleg Skill:**  
[beat-struktur-und-aufbau.md](/root/raphael-skills/skills/eigene/ads-video/references/beat-struktur-und-aufbau.md) L79–83: Schwartz-Stufen in ~4 Zeilen, ohne Beispielskript, ohne „welche Hook-Familie + welche Beat-Reihenfolge bei welcher Stufe“.

**Was die Referenzen tun:**  
- Problem-aware SEOLabs/Pascal: Proof/Garantie **vor** langem Problem-Agitate.  
- Solution-/product-aware Speedscaling Choice-Ad: tötet Alternativen (allein / Schema-F-Coaching), dann Reveal.  
- Solution-aware Event-Ads: Einladung + Logistik + Live-Build, wenig Pain.  
- Lehr-Ads (Matt Shiver): Mechanism-Demo als Hook, Offer am Ende als Kommentar-CTA.

**Folge:** Agent klebt immer dasselbe 5-Beat-Skelett auf jede Awareness-Stufe → flache „Problem→Lösung→CTA“-KI-Ads.

---

### Defekt 7 — Devices und Proof-Stack nur benannt, nicht rezeptiert
**Beleg Skill:**  
[skript-analyse-methodik.md](/root/raphael-skills/skills/eigene/ads-video/references/skript-analyse-methodik.md) L19: Device-Liste (Anaphern-Kette, Autoritäts-Stakkato, villain-naming…) ohne Beispiele.  
[beat-struktur-und-aufbau.md](/root/raphael-skills/skills/eigene/ads-video/references/beat-struktur-und-aufbau.md) L22–23: „Proof wird oft gestapelt“ — Statistik, kein Schreib-Rezept.

**Was die Referenzen tun:**  
- Marc Evers: Autoritätszahl → Framework-Name → ❌-ohne-Liste → 👉-Cases mit € → 48h-Anruf.  
- Speedscaling Choice: Option1/2 als Anti-Proof, dann 25-Mio-€ + Felix-Case.  
- Trading Room: **visueller** Proof im ersten Satz, dann Mechanismus.  
- Anapher: 4–6 „Wie…?“-Fragen hintereinander als Hook (nicht ein elegantes Satzgefüge).

**Folge:** „Proof“-Beat wird ein Satz Social Proof statt gestapelter, filmbarer Beweise.

---

### Defekt 8 — Audio/Onscreen/Visual-Alignment unterentwickelt fürs Skriptschreiben
**Beleg Skill:**  
[beat-struktur-und-aufbau.md](/root/raphael-skills/skills/eigene/ads-video/references/beat-struktur-und-aufbau.md) L28–42: 4 Ebenen erwähnt (Audio, Visual, Banner, Primary Text).  
[video-visuals.md](/root/raphael-skills/skills/eigene/ads-video/references/video-visuals.md): Fokus MAKE-Doodles/Einblendungen alle 5–10s — nützlich, aber **nicht** die dominanten Muster der Top-Shard-Ads.

**Was die Referenzen tun:**  
- Karaoke-Untertitel wortweise (Speedscaling).  
- Onscreen ≠ VO (Hormozi: Onscreen Nischen-Callout, VO andere Frage).  
- Hook-Visual als Szene (Nacht-Laptop + Google-Suche; Trading Room; POV-Gang zu „Pseudocoaches“).  
- Text-Banner-Stack auf Selfie (Marc Evers) als eigenes Format.

**Folge:** Skript endet als Monolog-Tabelle; die scroll-stoppende Arbeit (was Sekunde 0–3 *zeigt* und was der Caption *anders* sagt) bleibt optional/nachgelagert.

---

### Defekt 9 — Falsche Arbeitsteilung: copywriting soll Klang liefern, darf es aber nicht
**Beleg Skill:**  
[SKILL.md](/root/raphael-skills/skills/eigene/ads-video/SKILL.md) L59–61 + [sprech-text-regeln.md](/root/raphael-skills/skills/eigene/ads-video/references/sprech-text-regeln.md) L36–40 + [skript-analyse-methodik.md](/root/raphael-skills/skills/eigene/ads-video/references/skript-analyse-methodik.md) L45–46.

**Realität copywriting:** Gates für Klartext/Floskel/Voice/CTA-Framework — **keine** Video-VO-Bauformen, keine Spoken-DE-Metriken, keine Ad-Skript-Korpora ([copywriting/SKILL.md](/root/raphael-skills/skills/eigene/copywriting/SKILL.md) L44–90).  
**no-ai-slop** wäre der scharfe Zweit-Editor für KI-Tells, ist aber **nicht** required.

**Folge:** Zuständigkeit für „klingt menschlich gesprochen“ ist im Skill-Graphen **nirgends** hart verankert.

---

### Defekt 10 (Nebenfund, verstärkend) — Skill ist jung und selbstreferenziell dünn
**Beleg:** [SKILL.md](/root/raphael-skills/skills/eigene/ads-video/SKILL.md) L102–103: „Noch keine weiteren Fallen aus echter Ship-Praxis… junger Skill“.  
Version 0.1.0, ~430 Zeilen Prozess-Prosa gesamt vs. `ads-copy` mit Korpus+Bauformen+Checker und klarem Schmerz-Auslöser im SKILL-Kopf.

---

## 2. Priorisierte Fix-Anweisungen an den Skill-Neubau

Nur Anweisungen (kein Implementieren hier). Reihenfolge = Impact.

### P0 — Muss rein, sonst bleibt Qualität Zufall

1. **Video-Bauformen-Katalog (6–10 Formen)** analog `ads-copy/bauformen.md`  
   Pro Form: Wann (Awareness + Funnel), wörtliches Skeleton mit Beispielzeilen DE, 1–2 echte Beleg-Skripte (Volltext oder 80–200 Wörter Kern), verbotene Varianten.  
   Mindestset aus Shard: Garantie, Proof-first, Outcome-first, Callout+Quali+Proof-stack, Pain-Anapher/Choice, Insider-Claim+Gratis-Offer, Lehr/Curiosity→Webinar, Event-Einladung.  
   **Datei:** `references/bauformen-video.md` + `loads`.

2. **Gold-Korpus gesprochener Skripte im Skill**  
   15–30 bereinigte DE-(+wenige EN-)Vollskripte mit Metadaten: Hook-Familie, awareness_level, Wortzahl, Form-ID, Onscreen≠VO-Notiz. Quelle: Airtable-Shard + Kunden-Top.  
   **Datei:** `references/referenz-korpus-video.md` (wie ads-copy).  
   Regel: Vor dem Schreiben **2 Belegskripte derselben Form** wörtlich lesen — nicht nur Kundenordner hoffen.

3. **Spoken-DE-Schicht mit harten Zahlen** (nicht an copywriting abschieben)  
   Messen am Korpus, dann Regeln fixen, z. B.:  
   - Hook-Audio ≤ X Wörter / ≤ ~1,8–3 s Kernclaim  
   - Median Wörter/Satz und max Schachtelung  
   - Pflicht: ≥1 Zahl im ersten Drittel; Mechanismus mit Eigennamen  
   - Erlaubte Sprechmarker-Liste / verbotene Schreib-DE-Muster („wir bieten“, „maßgeschneidert“, Doppelpunkt-Dramatik, „Nicht nur X — sondern Y“)  
   - Laut-lesen-Gate: 3 Fail-Sätze vs. 3 Pass-Sätze im Skill  
   **Datei:** `references/sprech-rhythmus.md`; `sprech-text-regeln.md` darauf umbauen; Slot-Anweisung „nicht wie es klingen soll“ **streichen**.

4. **Hook-Familien nutzbar machen (inline, nicht nur Link)**  
   `loads` um kompakte Hook-Matrix erweitern (oder `hook-taxonomie` + 1 Seite „Video-Hook-Formeln“):  
   Familie → 2 wörtliche Formeln → Visual-Job Sek. 0–3 → Caption-Job (No-Duplication) → typische Awareness.  
   Output-Zwang: Hook-Varianten als **Matrix** (Segment × Motivation × Familie), nicht 3 Paraphrasen.  
   Committed-language-Check aus hook-taxonomie L24–39 als Pflichtzeile pro Hook.

5. **Qualitäts-Messlatte + Gate (completion_criteria neu)**  
   Ersetzen/ergänzen der reinen Format-Kriterien durch prüfbare Quality-Assertions, z. B.:  
   - Form-ID gewählt und Beleg-Skript zitiert  
   - Erste 12 Wörter: Callout|Proof|Garantie|Outcome|Pain — kein Throat-clearing  
   - Mechanismus benannt; ≥2 Proof-Elemente oder 1 filmbarer Proof  
   - CTA mit konkreter Handlung + Zeit/Friction  
   - Onscreen-Zeile ≠ VO-Zeile für Hook  
   - `no-ai-slop` required; optional `scripts/pruefen-video.py` (Weichmacher, Gedankenstrich-Cluster, Hook-Länge, Zahl vorhanden)  
   Judge-Prompt: pass/fail + Zitat, mit 3 Gold- und 3 Fail-Mini-Skripten im Skill.

### P1 — Stark heben, sobald P0 steht

6. **Awareness → Form-Routing-Tabelle**  
   Unaware/Problem/Solution/Product/Most → erlaubte Formen + verbotene (z. B. Most-aware nicht mit vager Curiosity starten). Mit je 1 Beleg.

7. **Proof-Stack-Rezept**  
   Schreibregel: Proof nie ein Satz; min. 2 Schichten (Zahl + Name/Case **oder** Zahl + sichtbares Setting). Visueller Proof im Skript als `[ZEIGEN: …]`-Beat markieren.

8. **Hook-On-Ramp-Pflicht**  
   Aus hook-taxonomie: bei Hook-Varianten Body-Brücke mitschreiben (Sek. 3–15), sonst Hold-Rate-Tod. Eigene Zeile im Output-Schema.

9. **Primary-Text / Caption / VO als Drei-Spalten-Output**  
   Nicht nur Sprechtext + Doodle-Plan. Explizit: VO | Onscreen | Visual-beat für Sek. 0–5 und je Hauptbeat.

### P2 — Aufräumen / Architektur

10. **Arbeitsteilung klären**  
    copywriting = Orwell/Floskel/Voice-Basics; **Spoken-Video-Qualität lebt in ads-video**. no-ai-slop nach jedem Draft. claims-qa bleibt Router.

11. **MAKE-Zentrierung lockern**  
    Doodle-Rezept behalten als Anhang; Default-Visualsprache aus Korpus (Talking-Head+Karaoke, POV, Screen-Proof, Banner-Selfie).

12. **Prozess behalten, aber nachrangig**  
    Phase-1/2-Analyse nur wenn ≥3 Kunden-Referenzen existieren; sonst **Form aus Katalog wählen + Gold-Korpus klonen**, nicht leeres Skelett raten. Analyse-Methodik = Diagnose-Tool, nicht Hauptproduktionsweg.

13. **Version & Provenance wie ads-copy**  
    Im SKILL-Kopf: Korpusdatum, n, gemessene Mediane, Auslöser („Skripte klingen nach Prozess, nicht nach Markt“).

### Explizit nicht tun
- Noch mehr abstrakte Frameworks (ABT, VSL-10-Blöcke) ohne wörtliche DE-Beispiele.  
- Hook-Familien weiter nur nach `wiki/craft/hooks/` outsourcen.  
- Qualität an „Agent liest Kundenordner gründlich“ hängen.  
- copywriting/no-ai-slop als alleinige Rettung für Spoken-Ads erwarten.

---

## Kurz: Gap-Tabelle Skill vs. Markt

| Fähigkeit | Top-Referenzen (Shard) | `ads-video` heute |
|---|---|---|
| Konkrete Bauform | ja, wiederkehrend | nein (1 generisches Skelett) |
| Wörtliche Beispiele | massenhaft im Markt | ~1 MAKE-Satz |
| Spoken Rhythmus | Filler, Anapher, Tempo | nur Anti-Weichmacher |
| Hook-Familien | benannt + formelhaft | verlinkt, nicht geladen |
| Awareness-Routing | Form folgt Stufe | 4 Zeilen Theorie |
| Proof-Stack | multi, filmbar | „Proof-Beat“ |
| VO≠Caption≠Visual | oft | angerissen, schwach operationalisiert |
| Messlatte/Checker | implizit im Markt | Format-completion only |
| Korpus im Skill | — | fehlt (ads-copy hat es) |

**Root cause (komprimiert):** Der Skill optimiert auf *nachvollziehbaren Agenten-Prozess und Grounding*, nicht auf *imitierbare Markt-Form + gesprochene Sprache + harte Qualitätsgate*. Deshalb entstehen korrekte, geerdete, mittelmäßige Skripte — nicht Speedscaling/Marc-Evers/Pascal-Harting-Niveau.
