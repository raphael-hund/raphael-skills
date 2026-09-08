# Typografie: drei Schriftrollen, Gewicht 400–600, Hierarchie über Größe und Farbe

Kapitel „typography" des Web-Design-Skills. Korpus: 53 Deep-Analysen unter `../studies/design-depth/deep/` (X-Creator-Posts, Mobbin, Refero, designmd, Layers, 21st, shadcn, Prior-Corpus). Jede Zahl ist gemessen (Datei genannt) oder als **Startwert** markiert.

## TLDR

Eine Schriftfamilie mit einer klaren Rolle, Display-Gewicht 400–600 mit negativem Tracking und Zeilenhöhe um 1.0, Hierarchie über Größen- und Farbstufen statt über Bold — das tragen fast alle guten Seiten im Korpus.

## Regeln (mit Beleg)

### A. Schriftrollen und Familien

1. **Drei Font-Rollen-Systeme decken den ganzen Korpus ab.** (a) Eine Sans für alles — H1, UI, Body, Labels: `2095797753305612601.md` (eine Grotesk für H1 72px bis Footer), `2096499167225078020.md` (eine Sans 400/500/600), `shadcn.md` (Geist Sans überall, Mono nur für Code), `refero-2.md` (Linear/Attio/Gumroad je eine Sans). (b) Serif nur für Display, Sans für UI: `2096876701775261945.md` (Serif H1 64/H2 40/Feature 30, Sans 13–17px UI), `2096634909263646898.md` (Serif H1/H2, Sans UI), `mobbin-2.md` (Serif als Rollenfont für Metrik-Zahl und Plan-Namen), `2096953356086313312.md` (Serif-Bold-Headline, geometrische Sans Body). (c) Sans für Sprache, Mono für Struktur/Daten: `2096149200178418026.md` (Grotesk H1/Body, Mono Uppercase für alle Labels), `2096891182701793331.md` (Mono nur für kopierbare technische Werte: IDs, Beträge, Mail), `designmd-me-1.md` (Mono für URLs, Token, Hex, Fontnamen), `designmd_supply.md` (Mono 10–11px Uppercase für alle Metadaten, Sans für Aussagen). Merksatz aus dem Korpus: **Mono = Daten/Struktur, Sans = Sprache.**

2. **Ein Wort in Serif-Italic ist der einzige erlaubte Familien-Mix in Sans-Headlines.** `twentyfirst.md` („living" Serif-Italic `#1136ff` in 64px/500 Sans), `designmd-me-1.md` („any" und „design systems" Serif-Italic `#4E81EE`, gleiche Größe wie Sans 700), `neuform-1.md` (Markenwort Serif-Italic Blau in DM-Sans-H1), `layers.md` (Sans-Zeile + größere Serif-Italic-Zeile). Gegenregel aus `prior_corpus.md`: keine fremde Serif in Sans-Zeile als Reflex (taste-SKILL.md:175) und Instrument Serif als Default-Choice gebannt (Zeile 158) — der Mix braucht einen inhaltlichen Grund (das Wort trägt die Kernaussage, Beleg `twentyfirst.md` Slop-Risiko).

3. **Kondensierte Versal-Grotesk nur für kurze Claims, nie für Sätze.** `2095488681796854015.md` Bild B (condensed Uppercase 800, ~44px — dort 11 Wörter als Fehler markiert), `2096175830624055596.md` Bild 3 (kondensierte Versalien 800, 4.2×B), `open_design.md` (Condensed ~110px Uppercase, Leading 0.9, nur 6 Wörter „I GO TO OPEN DESIGN FIRST."). Regel: Uppercase-800-Display maximal eine Handvoll Wörter, sonst Lesetempo-Einbruch.

### B. Display-Größe, Gewicht, Tracking, Zeilenhöhe

4. **Display-Gewicht 400–600, nie Bold-Reflex.** Gemessen: 500 (`2095797753305612601.md` H1 72px; `2096889729337921598.md` ~80px; `2096944343487852961.md` 58/68px; `2096292759489609818.md` Regular/Medium; `2095488681796854015.md` ~60px/500), 400 (`2095928637346472339.md` ~78px; `2096175830624055596.md` Bild 2 ~4.5×B; `refero-2.md` Gumroad ~88px Regular), 300 (`layers.md` GeneralSans 300 42.7px; `2095565814405742911.md` Light 2.6×B; `neuform-1.md` DM Sans 300), 600 (`2096931638118871502.md` ~96px; `mobbin-1.md` Marketing-Hero 4–4.5×B 600; `refero-2.md` Attio 68px 600). Bold 700–800 kommt vor (`2096192737867350330-video-1/-video-2.md`, `designmd-me-1.md`, `refero-2.md` Stripe 700), ist aber die Minderheit im Korpus.

5. **Negatives Tracking −0.01 bis −0.04em gilt für jede Display-Größe.** −0.02em (`2095797753305612601.md`, `2096889729337921598.md`, `2096944343487852961.md`, `mobbin-2.md` Proof-Headline, `2095488681796854015.md`, `twentyfirst.md` −0.022em), −0.03em (`2095874058697293985.md`, `2096855995909869867.md`, `refero-2.md` Attio, `open_design.md` 64px), −0.01em bei Serif-Display (`2096876701775261945.md`, `2096634909263646898.md`, `designmd-me-1.md` „Keep thinking."), −0.04em extrem bei Slab (`refero-1.md` CLOU 150px). Faustregel gemessen: Sans Display −0.02 bis −0.03em, Serif Display −0.01em.

6. **Zeilenhöhe Display 0.98–1.15.** 1.05 (`2095797753305612601.md`, `2095784926717300835.md`, `2096876701775261945.md`, `refero-1.md` Oxide 64px), 1.0–1.02 (`2096149200178418026.md` H1 ~84px; `2096889729337921598.md` 1.02; `twentyfirst.md` 1.06; `refero-2.md` Attio 0.97!), 1.1 (`2096175830624055596.md` Bild 2; `2096634909263646898.md`; `2096929195381457078.md`), 1.0 bei Slab-Block (`refero-1.md` CLOU), 0.8 bei Footer-Wortmarke (`2095863741250474026.md`). Ausreißer gemessen: 1.25 bei Footer-Statement-Headline (`2096891319843164276.md`) und 1.35 bei mehrzeiliger Serif-Statement-Headline (`neuform-1.md` Karte D) — je mehr Zeilen, desto mehr Luft, aber nie über 1.35.

7. **Headline/Body-Verhältnis: Marketing 2.6–5.5×, Produkt-UI 1.2–1.7×.** Marketing: 3.2× (`2096944343487852961.md`), 3.6× (`2096889729337921598.md`), 4.5–5.5× (`2096175830624055596.md`), 4–4.5× (`mobbin-1.md`), 4.2× (`2095807169346334900.md` 92px Display), 4–5× (`refero-2.md`), 2.6–2.7× (`2095565814405742911.md`), 5.6× Serif-Statement (`designmd-me-1.md` „Keep thinking." 96px vs Body 17). Flache Hierarchie in Funktionsflows: 1.7× (`mobbin-3.md` Apollo-Booking 24/14), ~1.05–1.2× Claim-Banner (`2095783930775433616.md`), UI-Titel 1.2–1.8× (`shadcn.md` 30/16, `2096660897628668066.md` 0.7f/1f/1.4f/1.8f).

8. **Satzpunkt am Headline-Ende als Betonungsmuster.** `2095488681796854015.md` („email campaigns."), `2096292759489609818.md` (jede Headline endet mit Punkt), `refero-1.md` CLOU („We do social space."), `open_design.md` (Punkt in Lime `#7CFF2E` als einziger Farbakzent: „152 Designsysteme."), `2096953356086313312.md` (Headline mit Punkt), `refero-2.md` (Punkt verstärkt Logo-Block-Wirkung bei LH <1).

### C. Farbliche Abstufung in Headlines

9. **Mehrheit einfarbig; Abstufung hat genau vier belegte Muster.** Einfarbig ist die Regel: `2096192737867350330-video-1/-video-2.md`, `2096855995909869867.md`, `2096953356086313312.md`, `2095928637346472339.md`, `refero-2.md` (alle vier Marketingseiten), `mobbin-2.md` (alle Headlines einfarbig, Punkt 6). Die vier Muster: (a) zweite Zeile/Phrase Grau: `2096944343487852961.md` (`#111` → `#8A8A8A`), `2095784926717300835.md` (Zeile 2 `#8A8A8A`), `2095863741250474026.md` Bild 3 (Zeile 2 `#7A7A7A`), `2096832279775486079.md` (Zeile 2 Italic Orange); (b) ein Akzentwort/-phrase in Markenfarbe: `2095874058697293985.md` (letztes Wort oder Zahl Orange `#ED5B28`, 5× wiederholt), `2095488681796854015.md` („email campaigns." `#F7562C`), `2096292759489609818.md` (schwarz → blau am Nutzen-Satzteil), `aakib-tiles.md` (Zeile 2 `#1B3BFF`); (c) Serif-Italic-Fragment (siehe Regel 2); (d) Farbiger Satzpunkt (`open_design.md`). Gradient-Text kommt nur zweimal vor: Graustufung letztes Wort (`layers.md` `#f5f4f7 → #a3a1ad`) und Navy→Blau auf späteren Wörtern (`designmd_supply.md` Stripe, confidence low; `designmd-me-1.md` Stripe-Clone). Nie bunten Regenbogen-Gradient auf H1 (`prior_corpus.md` Slop-Liste).

10. **Die abgestufte Phrase muss eine semantische Einheit sein.** Gegenbeleg `2096889729337921598.md`: „That Actually Get Seen" wird falsch geteilt — „Actually" bleibt schwarz, „That"/„Get Seen" grau, Sinnpaar bricht. Positive Gegenprobe `2096292759489609818.md`: der Farbbruch sitzt immer am Satzteil, der den Nutzen trägt. Regel: erst die Phrase markieren, dann färben — nie nach Zeilenumbruch.

11. **Ein Grau pro Headline, und es muss zum Hintergrund passen.** Gemessene Stufen: `#8A8A8A` (`2095784926717300835.md`, `2096944343487852961.md`), `#7A7A7A` (`2095863741250474026.md` Bild 3), `#A5A5A5` als Fehler (Kontrast 2.4:1 auf getöntem Grund, `2096944343487852961.md` Statement), `#8A8F96` als Fehler auf Blau-Wolken 2.5:1 (`2096889729337921598.md`). Auf Hell nicht heller als ~`#8A8A8A` setzen (**Startwert**, abgeleitet aus den Kontrast-Fehlern).

### D. Eyebrow-Labels

12. **Eyebrow: 11–13px, Uppercase, Tracking +0.08 bis +0.18em, gedämpfte Farbe.** 11px +0.08em `#84848e` (`refero-1.md` Mercury), 11px 700 +0.18em Blau (`designmd-me-1.md`), 9–11px +0.18–0.2em (`neuform-1.md` Mono `#9DB1FF`), 11px +0.1em `#8a8a92` (`layers.md`), 12–13px +0.06–0.1em (`2095874058697293985.md` mono Index-Labels 12px +0.08em), 13px +0.04em (`2096149200178418026.md` Mono), 11px +0.18em (`prior_corpus.md` taste-SKILL.md:253), 11–12px +0.15–0.18em (`open_design.md`), 0.6–0.65×B +0.1–0.15em (`mobbin-2.md`). Uppercase ohne positives Tracking ist nicht belegt — wer Caps setzt, weitet immer.

13. **Vier Eyebrow-Familien, je Stilfamilie eine.** (a) Mono Uppercase mit Marker (Quadrat/Punkt): `2096891319843164276.md` (gefülltes Quadrat + .75B +0.08em), `designmd_supply.md` (6px Ink-Punkt + Mono 11px), `2096292759489609818.md` (blauer Punkt 6px); (b) Pill-Badge mit Punkt: `2095797753305612601.md` (Pill mit Dot + 12px Text), `2095863741250474026.md` (dunkle Glas-Pill 11px +0.08em), `2095488681796854015.md` (Kasten 1px Border statt Pill, ~12px +0.06em); (c) nacktes Label ohne Hülle: `refero-1.md`, `layers.md`, `prior_corpus.md` (explizit ohne Pill, ohne Punkt); (d) Sentence-Case mit Hairline: `2095807169346334900.md` (22px normaler Text + 1px Linie `#eae2de`), `open_design.md` (12px + 16×2px Lime-Strich), `layers.md` (Uppercase in eckigen Klammern mit Bullet-Separator).

14. **Maximal eine Eyebrow pro drei Sektionen, Hero zählt mit.** `prior_corpus.md` (taste-SKILL.md:254). Slop-Muster im Korpus bestätigt: Eyebrow über jeder Sektion als Reflex (`prior_corpus.md` Zeile 158/159), falsches Label („Features" über Pricing, `2096292759489609818.md`), Platzhalter-Copy („SEE THE BIGGER PICTURE … founders", `2095565814405742911.md`, `2095488681796854015.md`, `2096175830624055596.md`).

### E. Body, Muted, Hierarchie

15. **Muted = Opazität auf Dunkel, Hex-Grau auf Hell.** Dark: `rgba(255,255,255,.55–.8)` (`2096634909263646898.md` .55; `2096674796704813174.md` .78; `2096149200178418026.md` .8; `2096891319843164276.md` .78; `mobbin-1.md` .65 auf Violett), warmes Grau statt Weiß (`neuform-1.md` Body `#B5AFA4` LH 1.65 „never white"). Hell: `#6B6B6B` (`2095797753305612601.md`), `#8A8A8A` (`2095874058697293985.md`), `#666` (`2096192737867350330-video-1/-video-2.md`), `#737373` (`twentyfirst.md`), warm `#4d473b` (`2095565814405742911.md`). Merksatz: Alpha-Weiß auf dunklen Flächen, Grau-Hex auf hellen (`twentyfirst.md` formuliert exakt so).

16. **Hierarchie über Farbe und Größe, nicht über Bold.** Vier Textstufen allein über Farbe: `#09090b / #3b3b3b / #616264 / #a0a0a4` (`2095383602431459523.md`), `#141414 / #3a3a3a / #6b6b6b / #9a9a9a` (`2096660897628668066.md`), Alpha-Stufen statt Gewicht (`2096165490498695410.md`: Label 55% Alpha, Items weiß). Gewichte im Korpus sind fast immer nur 400/500/600 — Bold ist selten und meist ein Fehler (`2096192737867350330-video-1/-video-2.md`: Bold bei Auswahl verursacht Layout-Shift, als Slop markiert).

17. **„Kleiner UND grauer" schlägt „nur grauer" für Meta-Ebenen.** `2096618423983964587.md` (KPI 2.2B, Meta kleiner und `#727177`), `2096215770783199316.md` (Stufen 34/28/22/17/15/13), `2096833304351961505.md` (Meta 17px `#9a9a9a` über Titel 19px weiß, 6px Gap), `2096944343487852961.md` (KPI 22px 600 + Label 13px `#666`).

18. **Body-Zeilenhöhe 1.25–1.7, Zeilenlänge in ch begrenzen.** LH: 1.25 (`2096674796704813174.md` Modal 34ch), 1.5–1.55 (`2095874058697293985.md`, `designmd-me-1.md` 1.55), 1.6 (`2096149200178418026.md` Lede, `2096876701775261945.md`), 1.65 (`neuform-1.md`), 1.7 (`2096889729337921598.md` Lede 22px), 1.8 als Fehler-Rand (`mobbin-1.md` Subline LH 1.8 mit Kontrastproblem). Breite: max 34ch (`2096674796704813174.md`, `2096931638118871502.md` Lede), 38em (`2096889729337921598.md`), 44ch (`refero-2.md` Subline), 58ch (`designmd_supply.md` Lead), 65ch (`prior_corpus.md` Body). Gegenbeleg: ~85 Zeichen pro Zeile als Fehler (`2096953356086313312.md`).

19. **Headline-Umbruch: manuell nach Sinn-Einheiten, sonst `text-wrap: balance`.** Manueller `<br>` nach Sinneinheit: `2096634909263646898.md` („Ambient Sounds / For Focus and Calm"), `2096953356086313312.md` (drei Zeilen manuell), `2096855995909869867.md` (zwei balancierte Zeilen), `2095928637346472339.md` (manueller Bruch, max 45% Breite). Balance als Fallback: `2096634909263646898.md` + `designmd_supply.md` (`text-balance`), `shadcn.md` (descriptions text-balance max 80%). Headline max-width in ch: 12ch (`refero-1.md` Oxide), 14ch (`designmd_supply.md`, `mobbin-2.md` Square), 16ch (`2096944343487852961.md`), 22ch (`mobbin-1.md`, `2095565814405742911.md` 22–24ch).

### F. Zahlen und Daten-Typografie

20. **Tabellarische Ziffern für KPIs, Beträge, Tabellen; Zahlen rechtsbündig.** `2095383602431459523.md` (Beträge tabular, rechtsbündig), `2096618423983964587.md` (alle Zahlenspalten rechts, tabular), `2096499167225078020.md` (KPI 46px Medium tabular LH 1), `2096215770783199316.md` (Semibold tabular „a / b"), `designmd_supply.md` (Mono 12px tabular für Zeilenzahlen), `neuform-1.md` (Tabellenziffern rechtsbündig).

21. **Große Zahl + kleine gedämpfte Einheit auf einer Baseline.** `2096175237109092642-video-1/-video-2.md` (Stat 22px Bold + 12px Muted-Einheit), `refero-2.md` (Preis: Betrag light + Einheit muted; Clerk „US"/Zahl/„per month" Baseline-bündig), `mobbin-3.md` Runner (`$50` Sans + `/month` 0.65em muted, Baseline), `2096292759489609818.md` (`$0` 1.6×B Bold + `/forever` 0.6× grau). Baseline-Paarung auch bei Zeit („10:00 . Today" — dort der Punkt als Baseline-Mittelpunkt als Fehler markiert, `2096833304351961505.md`).

22. **KPI-Größenstaffel: Wert 1.3–2.2× Body, Label 0.7–0.8× muted.** 1.7B Semibold über 1B Muted-Label (`2095383602431459523.md`), 2.2B Bold −0.02em (`2096618423983964587.md`), 46px Medium (`2096499167225078020.md`), 30px Regular (`gap-marcelkargul.md` — Zahlen Regular wirkt „instrumentenhaft"), Betrag 1.3B > Name 1.1B > Datum 1B (`2095383602431459523.md`).

### G. Sonderformen

23. **Riesige Footer-Wortmarke: 150–280px, tonal, angeschnitten.** Ton-in-Ton `#2A2A2C` auf `#1C1C1E` Weight 600 (`2095797753305612601.md`), `#262626` auf `#0A0A0A` Bold (`2095863741250474026.md` Bild 3), Serif 260px Weiß 70–85% über Foto (`2095863741250474026.md` Bilder 1/4, `aakib-tiles.md`), LH 0.8–0.85, `clamp(100px,14–22vw,280px)` (`2095863741250474026.md`, `aakib-tiles.md`).

24. **Editorialer Slab: ein Satz als schwarzer Block, Gewicht 400, LH 1.0.** `refero-1.md` CLOU (~150px, −0.04em, weiß auf schwarzem Rechteck, Padding nur 0.05–0.07em — Satzfläche statt Card). Kein CTA, keine zweite Größe.

25. **Fine Print 0.6–0.65× Body.** `mobbin-2.md` (`#8E8EA0`), `refero-1.md` (Disclaimer 10–11px), `2095863741250474026.md` (Fussnote 9–11px Muted). Unter 13px nur für Meta/Legal, nie für Content — Gegenbeleg `2096832279775486079.md` (Body 9.5–10.5px als nicht web-tauglich markiert, Minimum 13px).

26. **Fonts selbst hosten und mit `font-display: swap` laden.** `prior_corpus.md` verlangt Self-Hosting mit Swap und verbietet Inter als reflexhaften Default. Font-Identitäten sind in fast allen Bildanalysen ausdrücklich nicht belegbar; deshalb übernimmt der Build nie einen vermuteten Fontnamen aus einem Screenshot.

## Bauanleitungen (eigene Umsetzung, keine kopierten Assets)

Alle nicht direkt in der anschließenden Belegzeile zugeordneten Zahlen in den Snippets sind **eigene Startwerte** und werden im echten Viewport geprüft. Schriftdateien und visuelle Assets sind Platzhalter für eigene, lizenzierte Dateien.

### B1 Typo-Tokens: Skala relativ zu Body

```css
@font-face{
  font-family: "Brand Sans";
  src: url("/fonts/brand-sans-var.woff2") format("woff2");
  font-weight: 400 600;
  font-display: swap;
}
:root{
  --font-sans: "Brand Sans", system-ui, sans-serif; /* eigene/lizenzierte Familie */
  --font-mono: ui-monospace, "SF Mono", monospace;  /* nur Daten/Labels */
  --b: 1rem;                                         /* Body 16px */
  --fs-display: clamp(2.5rem, 5vw, 4.5rem);          /* 2.6–4.5× Body */
  --fs-h2:      clamp(1.75rem, 3vw, 2.5rem);         /* ~2× Body (Startwert) */
  --fs-title:   1.25rem;                             /* 1.25× (Startwert) */
  --fs-body:    var(--b);
  --fs-meta:    .8125rem;                            /* 13px */
  --fs-label:   .6875rem;                            /* 11px Eyebrow */
  --fs-fine:    .625rem;                             /* 10px Legal (Startwert) */
}
```

Begründung: Verhältnisse aus Regel 7 (Marketing 2.6–4.5×), Label-Größen aus Regel 12, Meta aus Regel 17.

### B2 Display-Headline (Sans, einfarbig oder ein Akzentwort)

```html
<h1>Ship your design system
  <em>in one prompt.</em></h1>
```

```css
h1{
  font: 500 var(--fs-display)/1.05 var(--font-sans);
  letter-spacing: -.025em;
  max-width: 16ch;
  text-wrap: balance;
}
h1 em{ font-style: normal; color: var(--accent); }   /* genau eine Phrase */
```

Beleg: Gewicht 500 / LH 1.05 / −0.025em nach `2095797753305612601.md`, `2096889729337921598.md`, `twentyfirst.md`; max-width 16ch nach `2096944343487852961.md`; Akzentphrase nach `2095874058697293985.md`, `2095488681796854015.md`.

### B3 Zweifarbige Headline (schwarz → grau am Nutzen-Satzteil)

```html
<h1>Bring your projects,
  <span class="mute">tasks, and team together.</span></h1>
```

```css
h1 .mute{ color: #8a8a8a; }   /* hell: nicht heller als ~#8a8a8a (Startwert) */
```

Beleg: `2096944343487852961.md` (`#111`/`#8A8A8A`), `2095784926717300835.md`. Regel 10: Span-Grenze = Phrasengrenze, nie Zeilengrenze. Auf Dunkel: `color: rgb(255 255 255 / .55)` (Beleg `2096634909263646898.md`).

### B4 Serif-Italic-Akzentwort

```html
<h1>The <em>living</em> library<br>of interfaces</h1>
```

```css
h1{ font: 500 64px/1.06 var(--font-sans); letter-spacing: -.022em; }
h1 em{
  font-family: Georgia, "Times New Roman", serif;
  font-style: italic; font-weight: 400;
  color: var(--accent);
  padding-bottom: .08em;      /* Unterlängen-Schutz (prior_corpus.md:183) */
}
```

Beleg: `twentyfirst.md` (64px/500/−0.022em/LH 1.06), `designmd-me-1.md`. Nur wenn das Wort die Kernaussage trägt (Regel 2).

### B5 Eyebrow-Varianten (je Stilfamilie eine)

```html
<p class="eyebrow eyebrow--mono"><i></i>WORKFLOWS</p>     <!-- (a) Mono + Quadrat -->
<p class="eyebrow eyebrow--pill"><i></i>NEW FEATURE</p>    <!-- (b) Pill + Punkt -->
<p class="eyebrow eyebrow--plain">CASE STUDIES</p>         <!-- (c) nackt -->
<p class="eyebrow eyebrow--line">Pricing</p>               <!-- (d) Hairline -->
```

```css
.eyebrow{ font: 500 .6875rem/1 var(--font-sans); letter-spacing: .14em;
          text-transform: uppercase; color: var(--muted); margin: 0 0 .75rem; }
.eyebrow--mono{ font-family: var(--font-mono); font-weight: 400; }
.eyebrow--mono i{ width: 8px; height: 8px; background: currentColor;
                  display: inline-block; margin-right: 8px; }
.eyebrow--pill{ display: inline-flex; gap: 8px; align-items: center;
                border: 1px solid var(--border); border-radius: 999px;
                padding: 6px 14px; letter-spacing: .08em; }
.eyebrow--pill i{ width: 6px; height: 6px; border-radius: 50%; background: var(--accent); }
.eyebrow--line{ text-transform: none; letter-spacing: 0; font-size: .9375rem;
                display: flex; gap: 12px; align-items: center; }
.eyebrow--line::before{ content: ""; width: 16px; height: 2px; background: var(--accent); }
```

Beleg: (a) `2096891319843164276.md`, `designmd_supply.md`; (b) `2095797753305612601.md`, `2095488681796854015.md`; (c) `refero-1.md`, `layers.md`, `prior_corpus.md`; (d) `open_design.md` (16×2px Strich), `2095807169346334900.md`.

### B6 Lede und Body

```css
.lede{ font-size: 1.125rem; line-height: 1.6; max-width: 38em;
       color: var(--muted); }                 /* hell: #666–#8a8a8a */
@supports (color: rgb(255 255 255 / .5)){
  .dark .lede{ color: rgb(255 255 255 / .65); }
}
.prose{ font-size: 1rem; line-height: 1.625; max-width: 65ch; color: var(--muted); }
```

Beleg: 38em/1.7 `2096889729337921598.md`; 65ch/1.625 `prior_corpus.md`; Alpha-Regel `twentyfirst.md`, `mobbin-1.md`.

### B7 Zahlen: tabular + Baseline-Einheit

```html
<p class="stat"><b>$1,240</b><span>/month</span></p>
```

```css
.stat{ display: flex; align-items: baseline; gap: 6px; }
.stat b{ font: 600 1.75rem/1 var(--font-sans);
         font-variant-numeric: tabular-nums; }
.stat span{ font-size: .75rem; color: var(--muted); }
```

Beleg: `refero-2.md` (Clerk-Preiszeile), `mobbin-3.md` Runner, `2096175237109092642-video-1/-video-2.md`; tabular nach `2096618423983964587.md`, `2096499167225078020.md`.

### B8 Riesige Footer-Wortmarke

```css
.wordmark{
  font: 600 clamp(100px, 18vw, 280px)/.8 var(--font-sans);
  letter-spacing: -.02em;
  color: #262626;              /* Ton-in-Ton auf #0a0a0a */
  margin-bottom: -.12em;       /* Anschnitt */
  overflow: hidden;
}
```

Beleg: `2095863741250474026.md` (Bild 3 Nachbau-Werte), `2095797753305612601.md`, `aakib-tiles.md`.

### B9 Mono-Datenzeile (Rollenfont)

```html
<dl class="meta">
  <div><dt>INVOICE</dt><dd>#2026-0917</dd></div>
  <div><dt>AMOUNT</dt><dd>$4,800.00</dd></div>
</dl>
```

```css
.meta>div{ display:grid; grid-template-columns:minmax(0,1fr) auto; gap:1rem; align-items:baseline; }
.meta dt{ font: .6875rem var(--font-mono); letter-spacing: .12em;
          text-transform: uppercase; color: var(--muted); }
.meta dd{ margin:0; text-align:end; font: .8125rem var(--font-mono);
          font-variant-numeric: tabular-nums; }
```

Beleg: `2096891182701793331.md` (Mono für IDs/Beträge), `designmd_supply.md` (Mono 11px Uppercase Metadaten), `neuform-1.md` (Tabellenziffern rechtsbündig).

## Varianten je Stilfamilie

| Stilfamilie | Display | Body/UI | Eyebrow | Beleg |
|---|---|---|---|---|
| Clean SaaS (Linear/Attio) | Sans 400–600, −0.02em, LH 1.0–1.05, einfarbig | dieselbe Sans | nackt 11px +0.1em oder Pill | `refero-2.md`, `shadcn.md` |
| Bold Grotesk (Kargul/Vetra) | Sans 600–800, −0.02 bis −0.03em, LH 1.0–1.1 | Sans | Pill mit Dot | `2096192737867350330-video-1.md`, `2096931638118871502.md` |
| Editorial Serif | Serif 400, −0.01em, LH 1.05–1.2 | Sans 13–17px | Sentence-Case + Hairline oder Serif-Italic | `2096876701775261945.md`, `2095928637346472339.md`, `2095807169346334900.md` |
| Blueprint/Terminal (Mono) | Mono-Grotesk 500, LH 1.15, zweifarbig Akzent | Sans Body, Mono Labels | Mono + Quadrat/Punkt, Footer komplett Mono-Versal | `2096292759489609818.md`, `2095863741250474026.md` Bild 2 |
| Dev-Dark (Oxide/Neuform) | Sans 400/300, LH 1.0–1.05, weiß | Sans Body warmgrau | Mono 9–13px +0.04–0.2em, Blau-Label | `refero-1.md`, `neuform-1.md`, `2096149200178418026.md` |
| Fashion/Brutal | ein Gewicht 400, Hierarchie nur Größe + Uppercase | dieselbe Sans 9–24px | Uppercase klein, kein Marker | `refero-1.md` Acne/CLOU |
| Dashboard-UI | flache Skala 1.2–1.8×, Zahlen tabular | eine Sans 400/500/600 | Tabellenkopf 11–12px +0.08–0.12em | `2096618423983964587.md`, `2096499167225078020.md`, `2096891182701793331.md` |

## Dos

- Ein Font-Rollen-System pro Seite festlegen (Sans-only / Serif-Display / Sans+Mono) und konsequent durchziehen (Regel 1).
- Display-Gewicht 400–600, Tracking −0.02em, LH 1.0–1.05 als Default-Startpunkt (Regeln 4–6).
- Genau eine Abstufung pro Headline: ein Akzentwort ODER eine graue Phrase ODER ein Serif-Italic-Fragment — nie kombiniert (Regeln 2, 9).
- Farbbruch an der semantischen Phrase ausrichten, nicht am Zeilenumbruch (`2096292759489609818.md`).
- Uppercase immer mit positivem Tracking +0.08 bis +0.18em setzen (Regel 12).
- Muted auf Dunkel als Alpha-Weiß, auf Hell als Grau-Hex (Regel 15).
- Zahlen tabular, rechtsbündig, Einheit klein auf Baseline (Regeln 20–21).
- Headline-Umbruch manuell nach Sinn-Einheiten setzen; `text-wrap: balance` als Absicherung (Regel 19).
- Satzpunkt ans Headline-Ende als billige, belegte Betonung (Regel 8).
- Gewicht-Wechsel auf 400/500/600 beschränken; Hierarchie über Größe + Farbe (Regel 16).

## Don'ts (mit konkretem Gegenbeispiel aus den Quellen)

- **Kein Bold-Layout-Shift bei Zustandswechsel.** `2096192737867350330-video-1/-video-2.md`: ausgewähltes Kalender-Element wird Bold und verschiebt das Layout — Zustand über Fläche/Ring codieren, nicht über Gewicht.
- **Keine semantisch falsche Farbteilung.** `2096889729337921598.md`: „That Actually Get Seen" mit „Actually" schwarz und „That"/"Get Seen" grau bricht das Sinnpaar; zusätzlich Grau `#8A8F96` auf Blau-Wolken ≈ 2.5:1.
- **Kein Muted unter der Kontrastgrenze.** `#A5A5A5` auf getöntem Foto-Weiß ≈ 2.4:1 (`2096944343487852961.md` Statement), Copyright `#d9d9d9` auf `#f7f7f7` ≈ 1.4:1 (`2096891319843164276.md` y=660), Chart-Titel mit 15% Opacity (`2096499167225078020.md`).
- **Kein Uppercase-800-Satz.** `2095488681796854015.md` Bild B: 11 Wörter kondensierte Versalien als Feature-Liste — langsamer Scan, kein Outcome.
- **Kein Serif-Reflex und keine Default-Fonts.** `prior_corpus.md`: Fraunces und Instrument Serif als Reflex gebannt, kein Inter-Default, keine fremde Serif in Sans-Zeile ohne Grund (taste-SKILL.md:175, Zeile 158).
- **Kein Regenbogen-Gradient auf H1.** `prior_corpus.md` (`background-clip:text` als Slop-Signatur, Zeile 158); im Korpus nur Grau-Grad oder Brand→Dunkel belegt (`layers.md`, `designmd_supply.md` Stripe).
- **Keine Eyebrow-Flut und keine Platzhalter-Eyebrows.** Max 1 pro 3 Sektionen (`prior_corpus.md` taste-SKILL.md:254); „SEE THE BIGGER PICTURE · founders" mit Sinn-freiem Toggle (`2095565814405742911.md`, `2095488681796854015.md`); falsches Label „Features" über Pricing (`2096292759489609818.md`).
- **Keine Inkonsistenz zwischen zwei Schriftsystemen ohne Regel.** `aakib-tiles.md` Launchkit: Mono-Hero vs. Sans-Sektionen auf derselben Seite ohne begründeten Split — als Inkonsistenz markiert.
- **Kein Body unter 13px und keine 85-Zeichen-Zeilen.** `2096832279775486079.md` (Body 9.5–10.5px nicht web-tauglich), `2096953356086313312.md` (~85 Zeichen/Zeile zu lang), `neuform-1.md` (6–8px Mono unleserlich).
- **Kein Title Case im Fließtext.** `2096149200178418026.md` (als Slop markiert), `2096292759489609818.md` (Sub in Title Case inkonsistent zu Sentence Case).
- **Kein „10:00 . Today" mit Baseline-Punkt als Pseudo-Separator.** `2096833304351961505.md` — Mittelpunkt `·` oder voller Zwischenraum (Gegenbeleg `2096891182701793331.md`: middle dot korrekt).
- **Keine Fake-Placeholder in Daten-Typo.** Tooltip „PRIMARY TEXT" (`2096499167225078020.md`), „David..!" und „Number of Task" (`2096944343487852961.md`), „Resea rch" Umbruch-Fehler in Footer-Links (`2095863741250474026.md`, `aakib-tiles.md`).

## Gilt nicht wenn

- **Funktionsflows statt Marketing.** Booking/Checkout/Formulare leben mit flacher Hierarchie 1.2–1.7× und ohne Display-Tracking-Drama (`mobbin-3.md` Apollo 1.7×, `2096929195381457078.md` Checkout-Skala ab 15px Body). Display-Regeln 4–8 gelten dort nicht.
- **Serif als Markenkern.** Wenn die Marke Serif ist, gilt sie auch für Wortmarke und Quotes, nicht nur Display (`mobbin-3.md` Runner/Notion: Serif für Plan-Namen und Kundenzitat; `2096855995909869867.md` nur Wortmarke Serif). Regel 1b wird dann zur Voll-Serif-Rolle — aber nie Serif als Body (`mobbin-3.md` Punkt 8: Serif nie als Body).
- **Condensed-Uppercase als Genre.** Automotive/Poster-Stil darf Versal-Display, aber nur ≤6 Wörter (Regel 3, `open_design.md` Poster 110px).
- **Mono als Produkt-Identität.** Bei Dev-ICP darf Mono die Produkt-Sprache komplett tragen (`2096175830624055596.md` Bild 4: UI durchgängig Mono; `2095863741250474026.md` Bild 2: Footer komplett Mono-Versal). Dann gilt Regel 1c invertiert: Mono = Marke, nicht nur Daten.
- **Slab-Editorial.** Ein-Satz-Seiten brechen Regel 7 (Verhältnis 9×, `refero-1.md` CLOU) — bewusstes Ausnahme-Genre, nicht übertragbar auf SaaS.
- **Prior-Corpus-Verbote haben Vorrang.** Fraunces/Instrument-Serif-Bann und Eyebrow-Cap (`prior_corpus.md`) gelten auch dann, wenn Einzelquellen sie zeigen — der Korpus-Filter schlägt die Einzelbeobachtung.

## Quellen

Alle Belege stehen inline je Regel als Dateiname unter `../studies/design-depth/deep/`. Gemessene Werte stammen aus den jeweiligen Pixel-/DOM-Messungen der Analysen; Werte ohne Datei-Beleg sind als **Startwert** markiert. Unbelegt bleiben: konkrete Font-Identitäten (in allen Analysen als „nicht belegbar" markiert) und Mobile-Verhalten der meisten X-Post-Screens (keine Mobile-Ansichten im Material).
