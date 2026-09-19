# www.trademania.io

## Steckbrief

| Feld | Wert |
|---|---|
| Domain | https://www.trademania.io/ |
| Branche | SaaS / Finanz-Infotainment: Krypto-Trading-Ausbildung, Community, Cashback-Leaderboard |
| Seitentyp | Lead-Gen-Marketing-Site mit Auslagerung des Produkts auf eine App-Subdomain |
| Betreiber | Trademania LLC, George Town, Cayman Islands (impressum.html: nur Firmenname und Sitz, kein Vertretungsberechtigter, keine USt-ID) |
| Stack | Next.js (App Router, Turbopack-Chunks, `self.__next_f`) auf Vercel (`?dpl=dpl_HTZ4fyyuQVZwyBxrqKo32sVfCUw3`), Tailwind CSS mit Arbitrary Values, Radix-UI-Primitives, Sanity als Headless-CMS (Projekt `encc3le8`, Dataset `production`) |
| Sprache | Deutsch als Default (`<html lang="de" data-theme="new">`), zweite Sprache Englisch unter `/en/` |
| Anrede | Du-Form durchgehend. Zaehlprobe home.html: ` du ` 74x, ` dich ` 26x, `dein` 34x, ` Sie ` 0x, `Ihr` 0x |
| Seiten in Sitemap | Keine auffindbare Sitemap. `/sitemap.xml` liefert 404. Gefundene echte Routen: 7 DE-Marketing-Seiten (Home, Komplettausbildung, Live-Call, Community, Leaderboards, About, Manifesto), davon 6 gespiegelt unter `/en/`, dazu 1 Buch-Landingpage, Impressum, Datenschutz. `robots.txt` ist 55 Bytes und disallowt nur `/studio` |
| Funnel-Ziel | Alle CTAs zeigen auf die Schwester-Domain `https://trademania.app/register` (119 Register-Links ueber alle geprueften Seiten) |
| Auffaellig | Canonical jeder Seite zeigt auf eine fremde Domain: `<link rel="canonical" href="https://bitbull-trading.com//">`, doppelter Slash inklusive |

## Sitemap

Keine `sitemap.xml` vorhanden (404). Struktur aus Header, Footer und Dropdown-Daten rekonstruiert:

```
/                         Home
/komplettausbildung       Produktseite Ausbildung
/live-call                Produktseite Live-Sessions
/community                Produktseite Community
/leaderboards             Produktseite Cashback-Wettbewerb
/manifesto                Gruenderbrief (Langtext)
/about                    Ueber uns / Team / Partner
/bitcoin-breakout-ty      Buch-Landingpage mit Danke-Zustand
/impressum
/datenschutz
/en/...                   Spiegelung der 6 Marketing-Seiten
```

Hauptnavigation (5 Punkte, aus den RSC-Daten): `Home`, `Deine Vorteile` (Dropdown, per Klick, kein Link), `Manifesto`, `Ueber uns`. Dropdown `Deine Vorteile` enthaelt 4 Eintraege: `Komplettausbildung` ("100h+ Videokurs, unterrichtet von Profis: Ex-Hedgefonds, Top-Scalper und Finalisten."), `Community` ("Die erfolgreichste deutschsprachige Krypto-Trading Community"), `Leaderboard` ("Der groesste Cashback-Pool in der Geschichte der deutschsprachigen Trading-Community."), `Live Calls` ("Handel live mit Experten und Traedern mit ueber 10 Jahren Erfahrung.").

Rechts in der Nav: Nutzerzaehler `60k`, Sprachumschalter `CH` (disabled) / `EN`, Buttons `REGISTRIEREN` (dunkelgruen) und `EINLOGGEN` (outline).

Footer, 3 Spalten plus Markenblock: `COMPANY` (Homepage, Ueber Uns, Manifesto), `FEATURES` (Komplettausbildung, Live Calls, Community, Leaderboards), `SOCIAL MEDIA` (Youtube, Instagram, X.com, TradingView). Markenblock mit Live-Zaehler `16,350 Online` / `43,650 Offline`, `Est. Jul 2021`, `Join Community`, `Impressum`, `Datenschutz`, Copyright-Zeile und 4 Zeilen Risiko-Disclaimer.

## Seiten

### Startseite: https://www.trademania.io/

- `<title>`: "Home - Die einzige Trading-Ausbildung, die du jemals brauchst. - Trademania"
- Meta-Description: **fehlt** (`<meta name="description">` 0x im Dokument)
- H1 woertlich: "Die einzige Trading-Ausbildung, die du jemals brauchst."
- H2: 11, H3: 50. Schema.org: **keine** `application/ld+json` (0 Bloecke). Canonical: `https://bitbull-trading.com//`. hreflang: keine.
- Textmenge: 2090 Woerter im Body, 140 `<img>` (139 mit `loading="lazy"`), 10 `<video>`, 12 `<section>`.

**Sektionsliste in DOM-Reihenfolge**

| Nr | Sektionstyp | Headline woertlich | Subline gekuerzt | Layout-Familie | Medien | CTA-Labels woertlich | Trust-Elemente | Hinweise |
|---|---|---|---|---|---|---|---|---|
| 0 | Nav | (keine) | (keine) | Zentriert schmal, 3 Zonen | Logo-SVG, 1 Nutzer-Icon | `REGISTRIEREN`, `EINLOGGEN`, `CH`, `EN` | Zaehler `60k` | `lg:absolute lg:top-[1rem]`, kein Sticky. Unterstrich-Span erscheint bei Hover |
| 1 | Hero | "Die einzige Trading-Ausbildung, die du jemals brauchst." | 38 Woerter | Full-bleed, zentriert | Hintergrundvideo (Mux/HLS) ueber Grid-SVG, Gradient `#EFFFDF` zu `#D9F9B9` bei `opacity-70`, Fallback-PNG bei `opacity-[.25]` | `Jetzt kostenlos registrieren` | Chip `Jetzt 100% kostenlos registrieren`, "40.000 Tradern", "$210.000" | Hero-Karte `w-[min(226rem,calc(100%-4rem))] h-[109rem] lg:h-[118rem] rounded-[4rem]`, also feste Hoehe statt `min-h-screen`. Em-Wort "Trading-Ausbildung," in Ivy-Font mit gruener Unterstreichung |
| 2 | Founder-Letter | "Lieber Trader," | 33 Woerter | Zentriert schmal, Brief-Optik | Briefmarken-PNG, Signatur-SVG | `Jetzt kostenlos registrieren` | Unterschrift "Gruender & CEO, Trademania", nummerierte Liste 1/2/3 | Weisser Kasten `w-[min(111rem,100%)] p-[7rem] bg-white border-t-[6px] border-t-[#D9F9B9]` |
| 3 | Bento-Showcase | "Deutschlands fuehrende Komplettausbildung & Community fuer Trader" | keine | Bento, `md:grid-cols-2 lg:grid-cols-4` | 23 Bilder, Mockup einer Chat-UI aus HTML gebaut (`Frage stellen...` / `Senden`) | `Jetzt kostenlos registrieren` | "40.000 aktive Trader", "141k Abonnenten", "10 Jahre Erfahrung", Chips `TRADING`, `PLATFORM UPDATES`, `TOOLS`, `SCALPING SETUPS`, `RISK MANAGEMENT`, `COUNTER STRIKE SETUP` | 3 Saeulen: TRADING / ERFAHRUNG / COMMUNITY, jede mit eigener Schlagzeile und Personenkarten |
| 4 | Zaehler-Grid | (kein H2) | (keine) | 4er-Grid | 12 Bilder | (keine) | `40k +`, `8`, `50h +`, `210k` | Wiederholt dieselben 4 Zahlen vier Mal im DOM, drei Wiederholungen davon fuer Reveal-Varianten |
| 5 | Problem-Sticky | "Wenn du tradest, kennst du das:" | (keine) | Sticky-Scroll, `lg:h-[300vh]` | 12 Bilder, 2 Videos | (keine) | "Probably You"-Label | Dunkler Block `bg-[#0A1A1D] lg:h-screen`, innen `lg:sticky lg:top-0`. Problem 1/2/3 mit eigenen Textzeilen |
| 6 | Benefits | "Wir geben dir das, was dir zum Erfolg gefehlt hat:" | (keine) | 4er-Grid | 9 Bilder | `Jetzt kostenlos registrieren`, `Unser System im Detail` | (keine) | Vier Karten: Klarheit, Sicherheit, Transparenz, Motivation & Belohnung |
| 7 | Produkt-Karten (4 Komponenten) | "Die 4 Komponenten" | "Das Fundament fuer profitables Trading" | Carousel/Slider mit Prev/Next und 9 Segment-Balken | 6 Bilder, 4 Videos | `Jetzt kostenlos registrieren`, `Mehr zur Komplettausbildung`, `Mehr zum Live-Trading & Analysen`, `Mehr ueber die Community`, `Mehr zu Rankings & Cashback` | "12 Module", "40.000 Trader", "Feedback in <24h", Modulnummern | Jede Karte: Komponente, Beschreibung, Detail-Liste, Outcome-Zeile, eigener Deep-Link |
| 8 | Prozess-Steps | "Unser System basiert auf 6 Schritten" | (keine) | Timeline, links sticky | 10 Bilder, 3 Videos | 6 Schritt-Sprungmarken, u.a. `Grundlagen des Krypto-Tradings`, `Krypto-Trading-Strategien` | "Schritt 1" bis "Schritt 6" | Dunkle Sektion `bg-[#0A1A1D]`, links sticky Headline `lg:sticky top-[3rem]`, rechts gestapelte Karten im Abstand `gap-[40rem]` |
| 9 | Vergleichstabelle | "TradeMania vs. Gurus vs. Signalgruppen" | (keine) | 4er-Grid als Tabelle | 5 Bilder | `Jetzt kostenlos registrieren` | Badge `BEST OPTION`, "0 EUR, ueber Broker finanziert" gegen "1.000-9.000 EUR" und "49-199 EUR/Monat" | Spaltenfarben pro Wettbewerber: TradeMania `#D9F9B9`, Coachings `#E9B9F9`, Signalgruppen `#B9C0F9`. Mobile zeigt nur die TradeMania-Spalte, Konkurrenz ist `hidden` bis `lg` |
| 10 | Zielgruppen | "Fuer wen ist TradeMania?" | (keine) | 3er-Grid, `sm:grid-cols-3` | 7 Bilder | `Jetzt kostenlos registrieren` | Karte "Bastian K. / Trading Typ / Profis" | Drei Karten: Anfänger, Fortgeschrittene, Profis, je mit "Ergebnis:"-Zeile |
| 11 | Team | "Die besten deutschsprachigen Krypto-Trader & Investoren" | (keine) | Zentriert breit, Liste mit grossem Abstand `gap-[40rem]` | 12 Bilder | (keine) | 9 Personen mit Rolle, u.a. "Finalist World Cup Trading Competition", "140.000 Abos" | Label `KOSTENFREI. KLAR. PRAXISNAH` |
| 12 | FAQ | "Haeufige Fragen" | (keine) | 2-Spalten, links sticky | 12 Bilder | `Jetzt kostenlos registrieren` | 9 Fragen | Karten `bg-[#EDECEB] p-[3rem]` mit Pfeil-Icon, Frage als H3 in `font-geist uppercase`, Mock-Richtung: Pfeil-SVG statt Akkordeon-Marker |
| 13 | Lead-Formular | (kein H2) | (keine) | Zentriert schmal | SVG-Halbkreise | `Senden` | "Danke, dass du dich angemeldet hast" (Konditionaltext) | Kein echtes `<form>`, kein `<input>`. Nachbau einer Chat-Eingabe als `div` mit `Frage stellen...`. Absenden geht an `https://hooks.zapier.com/hooks/catch/15695066/uzjwg57/` |
| 14 | Final-CTA | "TradeMania ist alles, was du brauchst, um profitabel zu traden:" | (keine) | 2-Spalten, Karte auf dunklem Grund | Canvas-Platzhalter, Halbkreis-SVGs | `Jetzt kostenlos registrieren` | 4 Corner-List-Punkte: 92 Lektionen / 12 Module, 8 Live-Tradings, groesste Community DACH, bis $210.000 monatlich | Karte `bg-[#D9F9B9]` mit `[clip-path:polygon(0_0,100%_0,100%_calc(100%-9rem),calc(100%-9rem)_100%,0_100%)]` |
| 15 | Marquee | "Mitglied werden" | (keine) | Marquee | SVG-Pfeil | (keine) | (keine) | Band `bg-[#D9F9B9]`, `style="animation:scrollRight 45s linear infinite"` |
| 16 | Footer | (keine) | (keine) | 4 Zonen, Markenblock rechts | Footer-Icon-Grafik | `Join Community`, `Impressum`, `Datenschutz` | Live-Zaehler `16,350 Online` / `43,650 Offline`, "Est. Jul 2021" | 4 Disclaimer-Zeilen auf `text-white/60` |

**Hero-Formel**: Nutzenversprechen "die einzige ... die du jemals brauchst" (Superlativ mit Ausschluss aller Alternativen). Subline 38 Woerter, ein Satz, enthaelt 4 Zahlen (50 Stunden, 8 Live-Tradings, 40.000 Trader, $210.000). 1 CTA plus 1 Chip. Chip oben: `Jetzt 100% kostenlos registrieren`. CTA: `Jetzt kostenlos registrieren`. Trust-Signal im Hero: Zahlen, kein Siegel, keine Sterne. Medientyp: Hintergrundvideo plus Grid-Grafik plus Gradient, dazu Fallback-Bitmap. Hoehe: nicht `min-h-screen`, sondern feste Karte `h-[109rem] lg:h-[118rem]`, Sektion `pt-[8.25rem] lg:pt-[15.5rem] pb-[8rem] lg:pb-[12rem]`.

**CTA-Strategie**: Nur 4 verschiedene Ziele auf der Startseite. `Jetzt kostenlos registrieren` 30x im Markup (als Text zweimal pro Button fuer den Hover-Slide, 10 Buttons), `Mitglied werden` 32x (Marquee-Wiederholung), 4 Deep-Links in die Produktseiten, `REGISTRIEREN` und `EINLOGGEN` je 1x, `Senden` 1x. 24 Links auf `trademania.app/register`, 6 auf `trademania.app/login`, alle mit `forwardUTMParams()`. Kein Sticky-Header (Header steht `lg:absolute`), also auch kein dauerhaft sichtbarer CTA. Telefonnummer: **keine** auf keiner Seite (`href="tel:` 0x).

**Trust-Staffelung**: Stufe 1 im Hero: nackte Zahlen, keine Logos. Stufe 2 im zweiten Screen: "40.000 aktive Trader", "141k Abonnenten", "10 Jahre Erfahrung". Stufe 3 vor dem Vergleich: Zaehlerblock 40k / 8 / 50h / 210k. Stufe 4 vor Zielgruppen: Vergleichstabelle gegen zwei Alternativen. Stufe 5: 9 Teamfotos mit Titeln wie "Finalist World Cup Trading Competition". Stufe 6: 27 Text-Testimonials mit Vorname und Nachname auf der Ausbildungsseite. Stufe 7 im Footer: Live-Online-Zaehler und Firmensitz. Persoenliche Daten: absolut keine im Marketing. Keine Zeitangabe "gegruendet 2021" bis in den Footer. Kein Presse-Logo, kein TUEV-Siegel, keine Google-Sterne, keine Auszeichnungs-Badges.

**Funnel/Formular**: Es gibt kein Funnel-Formular auf der Marketing-Domain. Das einzige interaktive Element ist ein nachgebautes Chat-Eingabefeld ohne `<input>`. Der echte Funnel liegt auf `trademania.app/register` mit "SCHRITT 1 VON 4" und einem einzigen Feld: `Mit E-Mail fortfahren`, Placeholder "Gib deine E-Mail-Adresse ein", Microcopy "Durch die Registrierung akzeptierst du unsere Datenschutzrichtlinien" und "Kostenfrei". Die restlichen 3 Schritte sind textlich benannt: 2 Broker verifizieren, 3 Discord joinen, 4 Durchstarten. Fortschrittsanzeige vorhanden als Text, nicht als Balken.

### Komplettausbildung: https://www.trademania.io/komplettausbildung

- `<title>`: "Deine Komplettausbildung im Detail - Trademania". Meta-Description fehlt. H1: "Meistere die Maerkte mit Elite-Tradern als Mentoren." H2: 8, H3: 25. Schema.org: keine. Canonical: `https://bitbull-trading.com//komplettausbildung`.
- 4109 Woerter, 90 Bilder, 2 Videos, 7 Sektionen.

| Nr | Sektionstyp | Headline | Subline | Layout | Medien | CTA | Trust | Hinweis |
|---|---|---|---|---|---|---|---|---|
| 1 | Hero | "Meistere die Maerkte mit Elite-Tradern als Mentoren." | 15 Woerter | Zentriert, dunkle Karte | 2 Videos | `Jetzt kostenlos registrieren` | Label `Elite Wissen` | Chip "Die 100h+ Videokurs-Komplettausbildung, unterrichtet von institutionell gepraegten Profis: Ex-Hedgefonds & Prop-Trader, Top-Scalper und World-Cup-Finalisten" |
| 2 | Zaehler-Band | "Was ist in der Komplettausbildung enthalten" | 1 Satz | 4er-Grid | Bilder | `Jetzt kostenlos registrieren` | `12` Kurse, `100h+` Videomaterial, `33` Lektionen pro Kurs, `266` Lektionen | Markup trennt Zahl und Wort: `<strong>12</strong> Kurse`. Zahlen doppelt im DOM (Animation) |
| 3 | Kurs-Katalog | "Die Komplettausbildung im Detail" | "besteht aus 11 Videokursen mit insgesamt ueber 100 Stunden" | Dunkle Sektion, gestapelte Karten | 4 Videos | `Jetzt kostenlos registrieren` | Kursnummern 1 bis 8 mit Videoanzahl und Stunden | Jeder Kurs: Titel, Claim, "Du lernst:", "Outcome:". Widerspruch im Text: an einer Stelle "11 Videokurse", in der Startseiten-Zusammenfassung "12 Module" und "92 Lektionen", hier "266 Lektionen" |
| 4 | Team | "Triff die Trading-Profis" | 2 Saetze | Liste | Bilder | (keine) | 9 Personen mit Rolle | Label `Das Herz der Ausbildung` |
| 5 | Benefits | "Was du zusammengefasst lernst" | (keine) | 4 Punkte | Bilder | (keine) | (keine) | 4 Zeilen, jede mit fettem Nutzen und duennem Zusatz |
| 6 | Zielgruppen | "Wer sollte sich die Videokurse ansehen?" | (keine) | 2er-Grid | Bilder | (keine) | (keine) | Karte "Bastian K. / Trading Typ / Profis" als Anker-Bild, dann "Einsteiger" und "Fortgeschrittene & Erfahrene Trader" mit "Statt Ratgeber-Chaos:" und "Schluss mit Coach-Hopping:" |
| 7 | Testimonial-Marquee | "Das sagt die Community" | (keine) | 4 vertikale Spalten, Marquee | (keine) | (keine) | 27 Namen, u.a. "Khaled Hajjaji", "Dr. Gabriele Hahne", "ASR Sanierungstechnik" | Spalten mit `animation:scrollUp 150s linear infinite` und `scrollDown 150s` / `scrollDown 145s`, Container `h-[95.75rem] max-h-[85vh]` |
| 8 | FAQ | "Haeufige Fragen" | (keine) | 2-Spalten, links sticky | (keine) | `Jetzt kostenlos registrieren` | 7 Fragen | Fragen: "Kostet die Ausbildung wirklich nichts?", "Muss ich Vorerfahrung haben?", "Fuer wen ist die Ausbildung geeignet?", "Hilft es mir wirklich dabei, Trading zu erlernen?", "Was werde ich lernen?", "Sind es nur die Videokurse, die ich kriege?", "Was, wenn ich bereits Trading-Erfahrung habe?" |

### Live Tradings & Analysen: https://www.trademania.io/live-call

- `<title>`: "Live Tradings & Analysen - Trademania". Meta-Description fehlt. H1: "Live Tradings & Analysen". H2: 6, H3: 21. Schema.org: keine.
- 1250 Woerter, 82 Bilder, 4 Videos, 7 Sektionen, 60 Prozent Bilder ohne Alt-Text.

| Nr | Sektionstyp | Headline | Subline | Layout | Medien | CTA | Trust | Hinweis |
|---|---|---|---|---|---|---|---|---|
| 1 | Hero | "Live Tradings & Analysen" | 18 Woerter | Zentriert, dunkle Karte mit Uhren-Animation | 4 Videos | `Jetzt kostenlos registrieren` (Variante `corner-button-default`, also gruen) | Label `Jeden Tag von Montag bis Samstag` | Uhrzeit-Leiste 1:00 bis 24:00 und Kursleiste 1.245 bis 1.560 als Dekoration |
| 2 | Kennzahlen | (kein H2) | (keine) | 3er-Grid `lg:grid-cols-3` | (keine) | (keine) | `40.000 Trader`, `10x die Woche Live Trading`, `6 Mentoren` | Ergaenzt den Claim "Wir haben bereits ueber 10.000 Trader erfolgreich und profitabel gemacht" |
| 3 | Feature-Karten | "Das Grundgeruest:" | (keine) | Karten mit `bg-[#112628]` | (keine) | (keine) | "Pro-Training", "Live Trading", "Trading Analyse", "Total 4930", Kennung "#01" | 3 Bloecke: Pro-Training, Trading Strategien und Analysen, Live Trading. Jeder mit "1 Morgen-Meeting", "2 Mentoring 1:1", "3 Live-Q&As & Office Hours", "4 Trade- & Portfolio-Reviews" |
| 4 | Erfolgskonzept | "Unser Erfolgskonzept:" | (keine) | Liste | (keine) | (keine) | (keine) | (keine) |
| 5 | Team | "Die besten deutschsprachigen Krypto-Trader & Investoren" | (keine) | Liste | Bilder | (keine) | 9 Personen | Identisch zur Startseite |
| 6 | Daily Updates | "Daily Updates" | (keine) | Liste | (keine) | (keine) | (keine) | (keine) |
| 7 | FAQ | "Haeufige Fragen" | (keine) | 2-Spalten | (keine) | (keine) | 6 Fragen | Fragen: "Muss ich etwas bezahlen, um teilzunehmen?", "Was muss ich tun, um Zugriff auf die Live-Sessions und den Discord zu bekommen?", "Wie oft finden Live-Sessions statt?", "Wie viele Mentoren stehen bereit?", "Welche Assets werden getradet?", "Kann ich Fragen stellen und meine Charts analysieren lassen?" |

### Community: https://www.trademania.io/community

- `<title>`: "Community - Trademania". Meta-Description fehlt. H1: "Die erfolgreichste deutschsprachige Krypto-Trading Community". H2: 7, H3: 11. Schema.org: keine.
- 3757 Woerter, 113 Bilder, 0 Videos, 7 Sektionen.

| Nr | Sektionstyp | Headline | Subline | Layout | Medien | CTA | Trust | Hinweis |
|---|---|---|---|---|---|---|---|---|
| 1 | Hero | "Die erfolgreichste deutschsprachige Krypto-Trading Community" | 19 Woerter | Zentriert mit Discord-Chat-Mock | Bilder | `Jetzt kostenlos registrieren` | "50.000+ Trader", "35+ Discord-Channels" | Chat-Verlauf "Today" mit Zeitstempeln 10:25 bis 10:29 als Kulisse |
| 2 | Marquee-Band | "#1 Community" 30x wiederholt | (keine) | Marquee | (keine) | (keine) | (keine) | `animation:scrollRight 45s linear infinite` |
| 3 | Feature-Tabs | "Die Community im Detail" | "Deine Zugaenge zu echtem Trading-Know-how und direktem Austausch." | 3 Tabs | (keine) | (keine) | (keine) | Tab-Labels `Live Events`, `Discord`, `YouTube` |
| 4 | Live Events | "Live Events: Basti & das Team in Person erleben." | (keine) | 2-Spalten | Bilder | (keine) | "500+ Trader. Eine Community" | 5 Punkte: Top-Trader & Speaker, Keynotes & Deep Dives, Networking, Exklusive Releases. Label `DIREKT. LIVE. UNVERGESSLICH.` |
| 5 | Discord-Block | "Discord (Community Hub)" | "Trading waechst, wenn man sich austauscht." | 2er-Grid | Bilder | `Jetzt kostenlos registrieren` | "bis zu $250 000" Cashback, "Jeden Monat" | 6 Punkte: Portfolio-Checks, Channels fuer Setups, Direkter Kontakt zu Analysten, Playbooks, Leaderboard & Challenges, Daily Recaps. Label `GEMEINSAM. SCHNELLER. BESSER.` |
| 6 | YouTube-Block | "YouTube Channel" | "Willkommen bei Bitbull!..." | Einbettung | Bilder | `Subscribe` (extern) | `141k Abonnenten`, `2,6k Videos`, "130K Trader Live" | 6 Punkte: Taegliche Strategien, Deep Dives, Live-Breakdowns, Krypto Updates, Trading Tutorials. Label `KOSTENFREI. KLAR. PRAXISNAH.` |
| 7 | Final-CTA | "Das erwartet dich" | (keine) | 3er-Grid `lg:grid-cols-3` | Bilder | `Jetzt kostenlos registrieren` | (keine) | Sektionstitel im DOM "Sei Teil der Revolution" |
| 8 | Testimonial-Marquee | "Was unsere Bewerter sagen" | (keine) | 4 vertikale Marquee-Spalten | (keine) | (keine) | 27 Stimmen | wie auf `/komplettausbildung` |

### Leaderboards: https://www.trademania.io/leaderboards

- `<title>`: "$210,000 Cashback im Leaderboard - Trademania". H1: "$210,000 Cashback." H2: 8, H3: 4. Schema.org: keine. 1475 Woerter, 109 Bilder, 1 Video.

| Nr | Sektionstyp | Headline | Subline | Layout | Medien | CTA | Trust | Hinweis |
|---|---|---|---|---|---|---|---|---|
| 1 | Hero | "$210,000 Cashback." | 9 Woerter | Zentriert, dunkel | Video | `Jetzt kostenlos registrieren` (3x) | "Der groesste Cashback-Pool in der Geschichte der deutschsprachigen Trading-Community." | H1 ist nur eine Zahl plus Wort, das kuerzeste H1 der Site (2 Woerter) |
| 2 | Preistreppe | (kein H2) | (keine) | 4er-Grid | (keine) | (keine) | `1. $15.000`, `2. $10.000`, `3. $8.000` | Medaillen-Emojis im Markup |
| 3 | Erklaerung | "Profitiere groesser als jemals zuvor" | (keine) | Liste | Bilder | `Jetzt kostenlos registrieren` | (keine) | (keine) |
| 4 | Ablauf | "Deine Trades. Deine Belohnung." | (keine) | Karten | (keine) | (keine) | (keine) | (keine) |
| 5 | Prozess | "Wie das Leaderboard funktioniert" | "Sobald du dein Trading-Konto (Bitunix, Phemex oder Pionex) mit Trademania verbunden hast, laeuft alles vollautomatisch" | 4er-Grid `md:grid-cols-2 lg:grid-cols-4` | (keine) | (keine) | Broker-Namen | Vier Karten mit Austausch-Simulation, jede mit farbigem Rang-Badge `#32CA0A` / `#FF8D28` |
| 6 | Live-Board | "Das Leaderboard in Echtzeit" | (keine) | 3 Boersen-Karten | (keine) | Tabs `Exchange 1`, `Exchange 2`, `Exchange 3` | `150K USD` / `2,984 USERS`, `48K USD` / `1,984 USERS`, `12K USD` / `984 USERS` | Daten kommen clientseitig, im HTML stehen `Loading...` und `$ 0` |
| 7 | Countdown | "Wie du teilnehmen kannst" | (keine) | 4er-Grid Countdown | (keine) | (keine) | `DAYS` / `HOURS` / `MINUTES` / `SECONDS` | Ziffern als gefaelschte Roll-Anzeige, jede Ziffer 0 bis 9 als eigenes `<span>` mit `transition-all duration-500`, im Auslieferungszustand alle `00` |
| 8 | FAQ | "Haeufige Fragen" | (keine) | 2-Spalten | (keine) | (keine) | 4 Fragen | Fragen: "Muss ich etwas bezahlen, um teilzunehmen?", "Was muss ich tun, um im Leaderboard mitzuspielen?", "Zaehlen nur Gewinne oder das Volumen?", "Ab welchem Platz bekomme ich etwas?" |

### Ueber uns: https://www.trademania.io/about

- `<title>`: "Ueber uns - Trademania". Meta-Description fehlt. H1: "Gebaut von Traedern fuer Trader" (im Markup ohne Leerzeichen: "Gebaut vonTradern fuer Trader"). H2: 4, H3: 17. Schema.org: keine. 1749 Woerter, 65 Bilder, 1 Video.

Ablauf: Hero mit Vollbild-Video und Button `Expand Video` (oeffnet einen Showreel-Overlay mit eigenem Cursor-Label) / Abschnitt "UNSER ANTRIEB" mit 3 Absaetzen Gruendungsgeschichte / "UNSERE MISSION" mit 3 Absaetzen und Signatur "Bastian Keller, CEO bei Trademania" / "UNSERE VISION" mit Ziel "ueber 100.000 Mitgliedern" und "monatlich ueber eine Million Dollar" Cashback / Partnerblock "Langfristige Partnerschaften, dein Vorteil als Trader" mit 8 Namen (Bitunix, Pionex, Web3 Universe, IQ Capital, Phemex, Trading IQ, Cointracking, TradingView) / Zaehler-Sektion "TRADEMANIA IN ZAHLEN" mit `Aktive Trader 40k+`, `Jaehrliche Livestreams`, `Lessons & Videos`, `Traders & Mentors` / Team-Sektion "Die Menschen hinter TradeMania" mit 5 Hauptpersonen.

Partner-Wand als Endlos-Lauf: `style="animation:scrollDown 24s linear infinite"` mit Schriftzuegen in `text-[15rem] text-[#D9F9B9] uppercase`, davor und dahinter gestaffelte `backdrop-filter: blur(.25rem/.5rem/.75rem)` Masken als Ein-/Ausblendung.

### Manifesto: https://www.trademania.io/manifesto

- `<title>`: "Unser Manifesto - Trademania". H1: "Ein Brief des Gruenders" (4 Woerter). H2: 7, H3: 0. 1276 Woerter, 53 Bilder, davon nur 4 ohne Alt-Text. Datumszeile im Hero: "August 2025".

Reine Langtextseite mit 6 datierten Kapiteln: "Unser Motto", "Das Problem", "Der Gegenentwurf", "Ordnung im Chaos", "Wir wollen die Art veraendern, wie Menschen Trading lernen.", "Die Trading-Welt hat lange Zeit das Falsche belohnt." Dazwischen zweimal der CTA `Jetzt kostenlos registrieren`. Wortfuehrung stark polarisierend, woertlich: "Plötzlich sind es nicht mehr Trader, die den Ton angeben, sondern Content-Creator mit gemieteten Autos und nachbearbeiteten Screenshots." Kein FAQ, keine Testimonials, kein weiterer Funnel ausser den zwei CTA-Bloecken.

### Buch-Landingpage: https://www.trademania.io/bitcoin-breakout-ty

- `<title>`: "Danke fuer deine Bestellung! - Trademania". H1: "Deine Teilnahme war erfolgreich!". H2: 4, H3: 3. 0 Formulare, 0 Inputs. Nur erreichbar ueber die Zapier-Weiterleitung aus dem Buchverkauf.
- Aufbau: Danke-Headline / "So geht's jetzt weiter" mit 3 Schritten / "Das kannst du gewinnen" mit 3 Gewinnen (5 Tage Dubai Business Class, 20.000 USDT Funding, Macbook-Bundle) / "Was jetzt passiert" mit Verweis auf Bestaetigungsmail / Final-CTA `Jetzt kostenlos registrieren` und `Weitere Exemplare bestellen` (Amazon-Link).

### Impressum und Datenschutz

- `/impressum` (107 Woerter, 1 Sektion): "Trademania LLC", "The registered office for both entities is Carey Olsen Cayman Limited, Pavilion East Cricket Square, 205 Elgin Ave, George Town KY1-1001, Cayman Islands." Sonst nur Footer. Kein Vertretungsberechtigter, keine Kontakt-E-Mail, keine Registernummer im sichtbaren Text.
- `/datenschutz` (343 Woerter): 8 nummerierte Abschnitte (Verantwortliche Stelle, Welche Daten wir erfassen, Zweck, Weitergabe, Aufbewahrung, Deine Rechte und folgende). Erfasste Daten woertlich: "Name, E-Mail-Adresse, Passwort (verschluesselt), Telefonnummer, Phemex/Bitget/Bitunix/Pionex UID, Discord Name."
- Kein Cookie-Banner im HTML, kein Consent-Manager-Framework (0x Cookiebot, Usercentrics, Klaro, Borlabs, OneTrust, iubenda in HTML und JS), obwohl GTM, Twitter-Pixel und PostHog aktiv sind.

## Design-System

**Tech-Stack** (aus HTML-Markern und Chunk-Inhalten)

| Bereich | Befund | Beleg |
|---|---|---|
| Framework | Next.js App Router mit Turbopack, React-Server-Components | 34 `_next/static/chunks/*.js`, 54 `self.__next_f.push` in home.html |
| Hosting | Vercel, Deployment-ID in jeder Asset-URL | `?dpl=dpl_HTZ4fyyuQVZwyBxrqKo32sVfCUw3` |
| CSS | Tailwind, komplett Arbitrary Values (`text-[2rem]`, `pt-[13rem]`), Utility-Aliase `.richtext`, `.container`, `.corner-button` | 8f3c0ebfc5b9802f.css, 0ef02c5696aa57e6.css |
| UI-Primitives | Radix UI (Accordion-Keyframes mit `--radix-accordion-content-height`, Tooltip, Dialog) | 8f3c0ebfc5b9802f.css: `@keyframes accordion-up{0%{height:var(--radix-accordion-content-height)}...}` |
| CMS | Sanity, Projekt `encc3le8`, Dataset `production`, API-Version `2024-01-08` | home.html RSC-Payload `"projectId":"encc3le8"` |
| Video | Mux mit HLS, `hls.js` als Player | js/94b862ca5fa44a8f.js: `https://stream.mux.com/${a.muxVideo?.playbackId}.m3u8?redundant_streams=true`, `https://image.mux.com/${...}/storyboard.vtt` |
| Animation | GSAP + ScrollTrigger, Framer Motion, Swiper | js/94b862ca5fa44a8f.js: `registerPlugin(c.ScrollTrigger)`, 183x `motion.div`, 47x `slidesPerView` |
| Analytics | Google Tag Manager `GTM-MJBXQWJ`, Twitter-Pixel `px9jr`, PostHog (Key im Client-Bundle vorhanden, hier nicht abgedruckt) | home.html: `<link rel="preload" href="https://www.googletagmanager.com/gtm.js?id=GTM-MJBXQWJ">`, RSC-Payload `{"gtmId":"GTM-MJBXQWJ"}`, `twq('config','px9jr')` |
| Formulare | Zapier-Webhook als Backend | RSC-Payload `"url":"https://hooks.zapier.com/hooks/catch/15695066/uzjwg57/"` |
| Bot-Messung | eigenes Skript `t.trademania.io/v1/lst/universal-script` | home.html RSC-Payload |
| Consent | kein Tool | 0 Treffer fuer alle gaengigen CMP-Namen |

**Fonts**

| Familie | Rolle | Gewichte | Format |
|---|---|---|---|
| `funnel` | alle H1 bis H4 (Display) | variable | TTF, Variable Font `FunnelDisplay_VariableFont_wght` |
| `ivy` (Ivy Presto Display Light) | Akzentwoerter in Headlines, kursiv gesetzt als `<em>` | 300 | OTF |
| `ivyHeadline` / `ivyHeadlineRegular` / `ivyHeadlineItalic` | weitere Display-Schnitte | 300 / 400 / 300 italic | OTF |
| `geist` | FAQ-Fragen, Sprachumschalter | variable | TTF |
| `geistmono` | Labels, Buttons, Zahlen, Kicker | variable | TTF |
| `DM Sans` | Body-Standard (`html{font-family:var(--font-sans)}`, `--font-sans:"DM Sans","DM Sans Fallback"`) | 400/500/600/700 | WOFF2, self-hosted, 45 `@font-face`-Bloecke |
| `Roboto` | Altbestand | 100/300/400/500/700/900 | WOFF2, self-hosted |
| `Bebas Neue` | Altbestand | 400 | WOFF2, self-hosted |

Kein Google-Fonts- oder Adobe-Fonts-Link. Alle Schriften liegen als `_next/static/media/*.woff2` bzw. `.ttf`/`.otf` auf eigener Domain. Jede Familie hat einen `*-Fallback`-Block auf `local(Arial)`.

**Farben** (Top-Werte mit Rolle)

| Hex | Rolle | Anzahl im CSS |
|---|---|---|
| `#D9F9B9` | Primaer-Akzent: Hintergrund der Haupt-CTAs, Highlight-Unterstreichung in Headlines, Marquee-Band, Listencorners, Footer-Links beim Hover | 94 + 11 lowercase, dazu 83x als `bg-[#D9F9B9]` allein auf home.html |
| `#0A1A1D` | Dunkelflaeche (Problem-, Prozess-, Final-CTA-Sektion), Textfarbe auf hellem Akzent | 36 |
| `#202223` | Primaertext auf Hell, Trennlinien mit `/15` Alpha | 34 |
| `#112628` | Kartenflaeche auf Dunkel, `corner-button-dark`-Hintergrund, Footer-Markenblock | 27 |
| `#61FFCE` | Online-Punkt im Footer | 22 |
| `#F3F2F1` | Seitenhintergrund hell | 12 |
| `#EDECEB` | FAQ-Karten | 4 |
| `#B9C0F9` | Konkurrenz-Spalte "Signalgruppen" | 10 |
| `#E9B9F9` | Konkurrenz-Spalte "Teure Coachings" | 6 inline |
| `#F97474` | Warn-/Negativakzent (Problem-Sektion) | 12 |
| `#052920` | Kicker-Text in Chips | 10 |
| `#32CA0A` / `#FF8D28` | Rang-Badges Goldachse im Leaderboard | 1 / 1 inline |
| `#000E0A` | Backdrop hinter der Hero-Karte, mit `/20` und `backdrop-blur-[2rem]` | 3 |

Keine `oklch()`, keine CSS-Variablen-Farbpalette im Marketing-CSS. Die 26 vorhandenen Custom Properties (`--primary: 240 5.9% 10%`, `--radius: .5rem` usw.) sind shadcn-Defaults aus dem App-Bundle und werden auf den Marketing-Seiten nicht benutzt: alle Farben stehen als Arbitrary Values direkt in den Klassen.

**Radius**: `9999px` (Pills, Chips), `4rem`/`5rem` (grosse Hero- und Sektionskarten), `2rem`/`2.5rem` (Karten und gestapelte Backdrops), `1rem` (Buttonform `button-shape-round`, Sprachumschalter), `.5rem` (Radix-Default). Buttons sind nicht einheitlich: `corner-button` ist eckig, aber beschnitten per Clip-Path, runde Buttons sind Pills.

**Shadows**: Fast keine. Die einzigen sprechenden Werte aus dem Marketing-CSS: `box-shadow:0 .375rem 2.375rem 0 #1ecc9780` (6f2f2895cf241f4d.css) sowie Glow-Werte `0 0 12px #d9f9b9e6, 0 0 24px #aa2fd399` in der Pulse-Animation. Alle anderen Treffer sind Tailwind-Ring-Variablen oder Video-Player-Defaults. Die Tiefe kommt ueber `backdrop-filter: blur(2rem)` und Farbflaechen, nicht ueber Schatten.

**Spacing/Container**: Die Site skaliert ueber `html`-Fontsize statt ueber Breakpoints. Inline im `<head>`:

```css
:root{font-size:.363636vw}
@media (width<=1920px){:root{font-size:.416667vw}}
@media (width<=992px){:root{font-size:50%}}
@media (width<=639px){:root{font-size:1.83908vw}}
```

Damit ist `2rem` Text auf 1920px genau 8px, `pt-[13rem]` sind 26px. Zusaetzlich gibt es einen echten Begrenzer: `.container{max-width:1536px}` bis 992px, ab 993px `max-width:200rem`, Padding `2rem` horizontal. Sektions-Padding auf home.html: `pt-[8.25rem] lg:pt-[15.5rem]`, `pt-[13rem] lg:pt-[18rem]`, `pt-[13rem] lg:pt-[24rem]`, `py-[13rem] lg:py-[22rem]`, `lg:py-[15rem] py-[8rem]`. Abstaende innerhalb der Sektionen liegen bei `gap-[40rem]` fuer gestapelte Karten.

**Typo-Skala** (aus `[data-theme=new]`-Regeln)

| Element | Mobile | ab Breakpoint | Desktop | Line-Height | Familie |
|---|---|---|---|---|---|
| H1 | 5rem | 6rem / 8rem | 8rem | 1 | funnel |
| H2 | 4.125rem | 5rem / 7rem | 7rem | 1 | funnel |
| H3 | 3rem | 4rem | 4rem | 1 | funnel |
| H4 | 2.5rem | 3rem | 3rem | 1 | funnel |
| Body (`p`, `.p-normal`) | 2.25rem | (keine) | 2.25rem | 1.5 | DM Sans, `font-weight:400`, `color:rgb(0 0 0/.6)` |
| Body dunkel (globales `body`) | 2rem | (keine) | 2rem | 1.5 | DM Sans, `color:rgb(255 255 255/.8)` |
| Button (`button-size-default`) | 2rem | (keine) | 2rem | (keine) | geistmono |

Keine `clamp()`-Funktionen. Letter-Spacing: `-.02em` (11x), `0` (10x), `.3px` fuer Ivy-Familien. Die H1 der Startseite nutzt keine Groessenklasse, sondern die `[data-theme=new] :where(h1)`-Regel.

**Bilder**: Alle ueber `next/image`. Format wird per Accept-Header ausgehandelt, `curl` mit `Accept: image/avif,image/webp` liefert `image/webp` (11410 Bytes fuer 1500x844). `srcset`-Breiten: 96, 256, 384, 640, 768, 992, 1280, 1536, 1920. `loading="lazy"` auf 139 von 140 Bildern auf home.html, `fetchPriority="high"` genau 1x (Header-Logo), `fetchPriority="low"` 1x. Keine `poster`-Attribute an den 10 Video-Elementen, kein `autoplay`-Attribut im Markup (Steuerung per JS nach Sichtbarkeit, `IntersectionObserver`).

**Barrierefreiheit, gemessene Luecken**: Alt-Text fehlt bei 50 Prozent der Bilder auf home.html, 60 Prozent auf live-call.html, 47 Prozent auf community.html, 21 Prozent auf leaderboards.html. FAQ-Fragen sind H3 in einem `div`, nicht in `<details>`, nicht in `button` mit `aria-expanded` (0x im Dokument). Es gibt aber `aria-label` an Carousel-Pfeilen und Play/Pause-Buttons.

## Animationen

**Motion-Libraries im Einsatz** (alle aus js/94b862ca5fa44a8f.js verifiziert)

- GSAP mit ScrollTrigger: `o.default.registerPlugin(c.ScrollTrigger)`, eigenes Hook `useGSAP` als Modul `602052`
- Framer Motion: 183x `motion.div`, 14x `useAnimationControls`, 11x `useInView`, 40x `useTransform`, 9x `useScroll`, 14x `useSpring`, 5x `AnimatePresence`
- Swiper: 47x `slidesPerView` im Produkt-Carousel
- Kein Lenis, kein AOS, kein Splide, kein Lottie, kein Rive, kein Three.js (0 Treffer in allen 34 Chunks)

**Zentrale Konstanten** (Modul `467681` und `862034`, woertlich aus dem Bundle)

```js
EASE_OUT        = [.22, 1, .36, 1]
PARALLAX_SPRING = {stiffness: 100, damping: 28, mass: .55, restDelta: 5e-4}
STACK_STEP      = .09
MOTION_BREAKPOINT = 992
REVEAL_WINDOW   = .45
REVEAL_OFFSET   = ["start 0.85", "start 0.45"]
CROSSING_OFFSET = ["start end", "end start"]
```

**ScrollTrigger-Rezepte, woertlich aus dem Bundle**

Ausblenden per Progress auf dem Problem-Block:

```js
c.default.fromTo(e,{opacity:.2},{opacity:1,scrollTrigger:{trigger:e,start:"top 60%",end:"top 20%",scrub:!0,
  onUpdate:e=>{ if(t){ let r=100-100*e.progress; t.style.filter=`grayscale(${r}%)` }}}})
```

Gestaffelte Reveals im Prozess-Block:

```js
t.forEach((t,s)=>{m.ScrollTrigger.create({trigger:e,start:`top+=${10+s/i*60}% top`,
  onEnter:()=>{d.default.to(t,{opacity:1,y:0,duration:.8,ease:"power2.out"})},
  onLeaveBack:()=>{d.default.to(t,{opacity:0,y:50,duration:.5,ease:"power2.in"})}})})
```

Wort-fuer-Wort-Textreveal mit Scrub:

```js
let l=s.default.timeline({scrollTrigger:{trigger:e,start:"top 50%",end:"bottom 60%",scrub:2}});
i.forEach((e,t)=>{let r=e instanceof HTMLImageElement;
  l.fromTo(e,{opacity:r?.4:.2},{opacity:1,ease:"power2.out",duration:.6},.4*t)})
```

Expandieren auf Touch-Geraeten:

```js
ScrollTrigger.create({trigger:e,start:"top 50%",end:"bottom 50%",
  onEnter:()=>x("expanded"),onLeaveBack:()=>x("collapsed"),invalidateOnRefresh:!0})
```

Anker-Animation der Kopfzeile beim Laden (Framer Motion, nicht CSS, aus dem minifizierten Bundle in JSX-Notation gebracht):

```jsx
<motion.header initial={{y:"calc(-100% - 1.5rem)"}} animate={{y:0}} transition={{duration:.6,ease:[.22,1,.36,1]}}>
```

**@keyframes-Bestand** (26 Definitionen im CSS, davon 9 aktive auf den Marketing-Seiten)

| Name | Wirkung | Belegter Einsatz |
|---|---|---|
| `scrollRight` | `0%{transform:translate(0)} to{transform:translate(50%)}` | `animation:scrollRight 45s linear infinite` in home, about, live-call, community, leaderboards, manifesto, komplettausbildung, en |
| `scrollLeft` | `0%{translate(0)} to{translate(-50%)}` | `scrollLeft 16s` auf komplettausbildung (Bildband), `27s` auf community, `36s` auf leaderboards |
| `scrollUp` | `0%{translateY(0%)} to{translateY(-50%)}` | `scrollUp 150s linear infinite` auf Testimonial-Spalten community und komplettausbildung |
| `scrollDown` | `0%{translateY(-50%)} to{translateY(0)}` | `scrollDown 150s` und `145s` (Testimonials), `24s` (Partnernamen auf about und live-call) |
| `lplGlow` | `0%,100%{opacity:.7;transform:translate(-50%)scale(.95)} 50%{opacity:1;scale(1.05)}` | 0ef02c5696aa57e6.css, Klasse `.lpl-stack-glow` |
| `lplBeamFlow` | `0%{background-position:0 220%} to{background-position:0 -120%}` | `.lpl-stack-beam-line`, `animation:2.6s linear .5s infinite lplBeamFlow` |
| `lplBeamPulse` | `0%{opacity:0;transform:translateY(-6px)scale(.6)} 15%{opacity:1} 85%{opacity:1} to{opacity:0;transform:translateY(10rem)scale(1.2)}` | `.lpl-stack-beam-pulse`, `animation:2.6s linear .5s infinite lplBeamPulse` |
| `lplBranchFlow` | `0%{stroke-dashoffset:0} to{stroke-dashoffset:-300px}` | `.lpl-branches-tracer path`, `animation:3.6s linear infinite lplBranchFlow` |
| `tilt`, `trustScroll`, `weeklyScroll`, `coachesScroll`, `spin`, `enter`, `exit`, `accordion-up`, `accordion-down`, `vds-*` | teils ungenutzt, teils Radix/Player-Defaults | `trustScroll-animation`, `weeklyScroll-animation`, `coachesScroll-animation` existieren im CSS (`12s`, `30s`, `15s`), kommen aber in **keiner** HTML-Datei und in **keinem** JS-Chunk vor: toter Code |

**Transition-Katalog** (54 Deklarationen, 40 unique, Top-Werte)

| Wert | Anzahl |
|---|---|
| `none` | 4 |
| `all .3s ease-in-out` | 4 |
| `transform .2s ease-out` | 2 |
| `opacity .3s` | 2 |
| `opacity .2s ease-out` | 2 |
| `max-width .14s ease-in` | 2 |
| `opacity .15s ease-out,visibility .15s ease-out` | 2 |
| `transform .1s linear` | 2 |
| `transform .5s cubic-bezier(.19,1,.22,1) .2s` | 1 |
| `opacity .5s cubic-bezier(.19,1,.22,1) .8s, transform .6s cubic-bezier(.19,1,.22,1) .8s` | 1 |
| `opacity .4s 1.5s` / `opacity .4s 1.6s` | 1 / 1 |
| `all .3s ease-out .1s` | 1 |
| `height .35s` | 1 |
| `top .433s` | 1 |

Der Button nutzt eine eigene Kurve: `.corner-button{transition-duration:.3s;transition-timing-function:cubic-bezier(0,0,.2,1)}`, und fuer den Strich links `cubic-bezier(.4,0,.2,1)`.

**Hover-Effekt des Haupt-CTAs** (der Praegnanteste der Site, woertlich aus 0ef02c5696aa57e6.css)

```css
.corner-button:before{content:"";width:4px;height:100%;position:absolute;top:0;left:0;
  transition:all .3s cubic-bezier(.4,0,.2,1)}
.corner-button:hover:before{width:8px}
.corner-button-text-initial{opacity:1;transition:all .3s cubic-bezier(.4,0,.2,1)}
.corner-button-text-hover{opacity:0;position:absolute;transition:all .3s cubic-bezier(.4,0,.2,1)}
.corner-button:hover .corner-button-text-initial{--tw-translate-y:-3rem;opacity:0}
.corner-button:hover .corner-button-text-hover{--tw-translate-y:-3rem;opacity:1}
.corner-button:hover .corner-button-icon-initial{--tw-translate-x:2.25rem;--tw-translate-y:-2.25rem;opacity:0}
.corner-button:hover .corner-button-icon-hover{--tw-translate-x:2.25rem;--tw-translate-y:-2.25rem;opacity:1}
.corner-button-dark{background:#112628!important;color:rgb(255 255 255);}
.corner-button-dark:before{background-color:rgb(217 249 185);opacity:.3}
.corner-button-dark:hover:before{opacity:.7}
```

Effekt: Label und Pixel-Icon schieben sich beim Hover gemeinsam um `3rem` nach oben und werden getauscht, der Balken links waechst von 4px auf 8px und springt von 30 auf 70 Prozent Deckkraft.

**Scroll-Reveal-Muster**: Kein CSS-Klassenmuster wie `aos` oder `reveal`. Stattdessen stehen die Startzustaende als Inline-Styles im Server-HTML und werden clientseitig ueberschrieben. Auf home.html: `style="opacity:0;transform:translateY(30px)"` 9x, `style="opacity:0;transform:translateY(100%)"` 4x, `style="opacity:0;transform:translateX(-50%) translateY(20px)"` 2x, `style="opacity:0;transform:scale(0.95) rotateX(50deg)"` 1x, `style="opacity:0;top:-10px;right:-10px;bottom:-10px;left:-10px"` 1x (Fokusring am Chat-Feld). Aufgeloest wird ueber `style="opacity:1;transform:none"` 3x. Stagger-Schrittweite `.09` Sekunden (`STACK_STEP`), Count-Up-Dauer `1.15` Sekunden mit `ease:"linear"` und `delay: start + index * .09`.

**Zaehler-Animation**: `useCountUp` liest Zahlen per Regex aus dem Text (`/^(\D*?)(\d{1,3}(?:\.\d{3})+|\d+)(\D*)$/`), formatiert mit `toLocaleString("de-DE")` und mappt den Motion-Value auf 0 bis Zielwert. Auf home.html stehen `40k`, `8`, `50h`, `210k` als Text im DOM.

**Marquees**: 6 belegte Instanzen mit 4 verschiedenen Dauern (16s, 24s, 45s, 145s, 150s). Alle mit `will-change:transform` und `animation:... linear infinite`. Der CTA-Band laeuft auf jeder Seite mit 45s.

**Parallax/Sticky**: `useMotionMode()` schaltet Parallax ab, wenn `useReducedMotion()` true ist **oder** die Viewport-Breite unter 992px liegt. Der Scroll-Spring-Wert ist `{stiffness:100, damping:28, mass:.55, restDelta:5e-4}`. Sticky-Sektionen: `lg:h-[300vh]` mit innenliegendem `lg:sticky lg:top-0` (Problem-Block), `lg:sticky top-[3rem]` (Prozess-Kopf), `lg:sticky lg:top-[15rem]` (FAQ-Kopf auf allen Produktseiten), `lg:sticky` auf jeder Prozesskarte.

**Reduced-Motion-Handling**: 9 `prefers-reduced-motion`-Bloecke im CSS, davon stammen 8 aus dem Video-Player-Default (`c1e872fc27e620e4.css`, alles `.vds-*`-Selektoren) und nur 1 aus eigenem Code (`0ef02c5696aa57e6.css`). Die sprechendste selbst geschriebene Regel:

```css
@media (prefers-reduced-motion:reduce){
  .lpl-stack-glow,.lpl-stack-beam-line,.lpl-stack-beam-pulse,.lpl-branches-tracer path{animation:none!important}
  .lpl-stack-box{opacity:1;transition:none;transform:none}
  .lpl-branches-base path{opacity:1;transition:none}
  .lpl-branches-tracer path{opacity:0}
}
```

Im JS schaltet `useReducedMotion()` die Framer-Motion-Reveals auf Dauer `0` (`duration:0`) und Parallax komplett ab. Die CSS-Marquees (`scrollLeft`, `scrollRight`, `scrollUp`, `scrollDown`) haben **keine** Reduced-Motion-Ausnahme, laufen also auch bei Systemeinstellung "Bewegung reduzieren" weiter.

## Synthese

### Seitentyp-Blueprints

**Startseite** (12 Sektionen plus Nav und Footer)
1. Nav, absolut positioniert, kein Sticky, Rechtszone mit Zaehler und Sprachumschalter
2. Hero, Full-bleed, Chip plus H1 mit Akzentwort plus 38-Wort-Subline plus 1 CTA, Hintergrundvideo
3. Founder-Letter, Zentriert-schmal, weisser Kasten auf hellem Grund, nummerierte Problemliste, Unterschrift
4. Bento-Showcase, 4er-Grid, Chat-Mock und Personenkarten, 3 Saeulen TRADING/ERFAHRUNG/COMMUNITY
5. Zaehler-Grid, 4er-Grid, die vier Kernzahlen
6. Problem-Sticky, 300vh-Huelle mit innenliegendem Sticky-Screen, dunkel
7. Benefits, 4er-Grid, vier Nutzenbegriffe mit Doppelpunkt
8. Produkt-Carousel, Slider mit Segment-Fortschritt, 4 Komponentenkarten mit je einem Deep-Link
9. Prozess-Timeline, dunkel, 6 Schritte, links sticky
10. Vergleichstabelle, 4er-Grid, TradeMania farblich markiert, Konkurrenz ab lg sichtbar
11. Zielgruppen, 3er-Grid, drei Personas mit Ergebnis-Zeile
12. Team, Liste, 9 Personen
13. FAQ, 2-Spalten mit sticky Kopf, 9 Fragen
14. Lead-Feld, Zentriert-schmal, nachgebautes Chat-Eingabefeld ohne Input
15. Final-CTA, 2-Spalten, gruene Karte mit Clip-Path und 4 Corner-List-Punkten
16. Marquee, 45s, `Mitglied werden`
17. Footer, 3 Linkgruppen plus Markenblock mit Live-Zaehler und Disclaimer

**Produktseite** (Komplettausbildung, Live-Call, Community, Leaderboards)
1. Dark Hero, Chip plus H1 plus kurze Subline plus 1 CTA, themenspezifische Deko-Animation (Uhr, Chat, Zaehler, Rangliste)
2. Zaehlerband mit 3 bis 4 Kennzahlen
3. Feature-Block mit Karten, jede mit Nummer und Outcome-Zeile
4. Prozess- oder Ablaufblock, 3 bis 6 Schritte
5. Team-Block, 9 Personen (nicht auf leaderboards)
6. Testimonial-Marquee, 4 vertikale Spalten (nur Komplettausbildung und Community)
7. FAQ, 2-Spalten mit sticky Kopf, 4 bis 7 Fragen
8. Final-CTA
9. Footer

**Ueber-uns-Seite**: Video-Hero mit Expand-Button, 3 Textabschnitte (Antrieb, Mission, Vision) mit Signatur, Partner-Wand als Endlos-Lauf, Zaehler-Grid, Team-Liste, Footer.

**Manifesto-Seite**: Hero mit Datum, 6 datierte Langtext-Kapitel, 2 CTA-Bloecke, Footer. Kein FAQ, keine Testimonials, kein Zaehler.

**Funnel-Einstieg** (`trademania.app/register`): Schrittanzeige "SCHRITT 1 VON 4", 1 Eingabefeld (E-Mail), Microcopy "Kostenfrei" und Datenschutz-Satz, darunter 4 ausformulierte Schritte als Erwartungsmanagement. Kein Multi-Step im Frontend, kein Fortschrittsbalken. Danach Verzweigung in App, Discord und Broker-Verifizierung.

### Die 5 staerksten Muster

**1. Kicker-Chip als Label-System.** Jede Sektion und jeder Hero traegt einen zweiteiligen Kicker: farbiges Quadrat mit Icon plus weisser Kasten mit Mono-Label in Grossbuchstaben. Woertlich aus home.html: `<div class="w-[4rem] flex items-center justify-center bg-[#D9F9B9]"><img .../></div><div class="flex items-center px-[1rem] bg-white"><p class="mb-0 leading-none text-[2rem]">FAQ</p></div>`. Labels im Bestand: `Jetzt 100% kostenlos registrieren`, `DER BRIEF VOM GRUENDER`, `TRADEMANIA AUF EINEN BLICK`, `TRADEMANIA IN ZAHLEN`, `DAS PROBLEM`, `GENAU HIER SETZT TRADEMANIA AN`, `TRADEMANIA INHALTE`, `DER TRADEMANIA-MECHANISMUS`, `VERGLEICH`, `KOSTENFREI. KLAR. PRAXISNAH`, `FAQ`, `UNSER VERSPRECHEN`, `Elite Wissen`, `Das Herz der Ausbildung`, `Jeden Tag von Montag bis Samstag`. Das Muster erzeugt Orientierung ohne Zwischenueberschriften und ist in reinem HTML ohne Bilddatei nachbaubar.

**2. Echter CTA-Hover mit Label-Tausch und Clip-Path-Ecke.** Woertlich aus home.html am Hero-Button: `[clip-path:polygon(0_0,100%_0,100%_calc(100%-2rem),calc(100%-2rem)_100%,0_100%)]` mit innenliegendem Doppel-Label (`corner-button-text-initial` und `corner-button-text-hover`, beide `absolute`), getauscht ueber `--tw-translate-y:-3rem` bei `transition:all .3s cubic-bezier(.4,0,.2,1)`. Abgeschnittene Ecke unten rechts als Erkennungsmerkmal der Marke, identisch in der Final-CTA-Karte (`calc(100%-9rem)`) und in den Listencornern (`cornerListCorner` mit `clip-path:polygon(0_0,calc(100%-0.75rem)_0,100%_0.75rem,100%_100%,0_100%)`, home.html Byte 247661).

**3. Vier-Zahlen-Rhythmus statt Claim-Prosa.** Die Site argumentiert mit Zahlen an festen Plaetzen: `40k` Trader, `8` Live-Tradings pro Woche, `50h` Ausbildung, `210k` Cashback. Sie erscheinen im Hero-Satz, dann im Zaehler-Grid, dann wieder in der Final-CTA als Corner-Liste: `Vollstaendige Ausbildung (92 Lektionen, 12 Module)`, `8 Live-Tradings & Analysen pro Woche`, `Groesste Community in DACH (40.000 Trader)`, `Preise & Cashback bis $210.000 monatlich`. Woertlich aus home.html Byte 65144: `<span class="text-[23rem]">40k</span><span class="text-[10rem]">+</span>`. Der Effekt: die Wiederholung traegt die Beweisfuehrung, nicht Adjektive.

**4. Marquee als Bewegung ohne Bildgewicht.** Sechs Instanzen mit nur zwei Keyframe-Familien. CTA-Band woertlich: `<div class="inline-flex items-center will-change-transform" style="animation:scrollRight 45s linear infinite"><div class="flex items-center flex-shrink-0 pr-[3rem] lg:pr-[5rem]"><p class="text-[3rem] lg:text-[4rem] mb-0 leading-none font-funnel whitespace-nowrap pr-[3rem] lg:pr-[5rem]">Mitglied werden</p>` (home.html Byte 107913). Testimonials laufen vertikal mit `scrollUp 150s` und `scrollDown 145s` in vier Spalten mit `max-h-[85vh]` und Maskierungs-Gradienten. Alle Marquees sind reine CSS-Animation ohne JS-Loop.

**5. Farbe als Argument in der Vergleichstabelle.** Jede Spalte hat eine eigene Signalfarbe, die als `border-top` und Badge-Hintergrund wiederkehrt. Woertlich aus home.html Byte 148136: `<div class="inline-flex items-center gap-[1rem] ... uppercase prose-p:text-[1.75rem] min-h-[4.5rem]" style="background-color:#B9C0F9"><p class="font-geistmono mb-0 leading-none text-[2rem]">Signalgruppen</p></div>`. TradeMania bekommt `#D9F9B9` und das Badge `BEST OPTION` sowie die Zeilen-Unterlegung `lg:bg-[#D9F9B9]/20`, die Konkurrenz `#E9B9F9` und `#B9C0F9`. Auf Mobil sind die Konkurrenzspalten `hidden`, so dass nur die eigene Spalte stehen bleibt.

### Animation-Rezepte

**Rezept 1: CTA-Hover mit Label-Slide (exakte Werte von der Site)**

```css
.cta{
  position:relative; display:flex; align-items:center; justify-content:center; gap:2rem;
  min-height:7rem; padding:0 4rem; font:500 2.25rem/1 var(--font-geistmono);
  background:#112628; color:#fff;
  clip-path:polygon(0 0,100% 0,100% calc(100% - 2rem),calc(100% - 2rem) 100%,0 100%);
}
.cta::before{
  content:""; position:absolute; top:0; left:0; width:4px; height:100%;
  background:#D9F9B9; opacity:.3;
  transition:all .3s cubic-bezier(.4,0,.2,1);
}
.cta:hover::before{ width:8px; opacity:.7 }
.cta__label{ transition:all .3s cubic-bezier(.4,0,.2,1) }
.cta__label--hover{ position:absolute; opacity:0; transition:all .3s cubic-bezier(.4,0,.2,1) }
.cta:hover .cta__label{ transform:translateY(-3rem); opacity:0 }
.cta:hover .cta__label--hover{ transform:translateY(-3rem); opacity:1 }
```

**Rezept 2: Scroll-Reveal-Stapel mit Count-Up (Werte aus EASE_OUT und STACK_STEP)**

```js
// EASE_OUT = [.22, 1, .36, 1]; STACK_STEP = .09; Count-Up-Dauer 1.15s
const EASE = [.22, 1, .36, 1], STEP = .09;
<motion.div
  initial={{opacity:0, y:30}}
  whileInView={{opacity:1, y:0}}
  viewport={{once:true, margin:"-100px"}}
  transition={{duration:.7, ease:EASE}}>
  <Counter delay={index * STEP} />
</motion.div>

// Counter: Motion-Value 0 -> 1, dann auf Zielwert mappen
animate(progress, 1, {duration:1.15, ease:"linear", delay: start + index * STEP})
useTransform(useTransform(progress,[0,1],[0,target]), v => Math.round(v).toLocaleString("de-DE"))
```

**Rezept 3: Scroll-gekoppelte Wort-Aufdeckung (GSAP + ScrollTrigger, woertlich)**

```js
const tl = gsap.timeline({
  scrollTrigger: { trigger: el, start: "top 50%", end: "bottom 60%", scrub: 2 }
});
words.forEach((w, i) => {
  const isImg = w instanceof HTMLImageElement;
  tl.fromTo(w, { opacity: isImg ? .4 : .2 },
               { opacity: 1, ease: "power2.out", duration: .6 }, .4 * i);
});
```

**Rezept 4: Parallax mit Feder (exakte Konstanten)**

```js
const EASE_OUT = [.22, 1, .36, 1];
const PARALLAX_SPRING = { stiffness: 100, damping: 28, mass: .55, restDelta: 5e-4 };
const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "start 0.45"] });
const smooth = useSpring(scrollYProgress, PARALLAX_SPRING);
const y = useTransform(smooth, [0, 1], ["2.5rem", "0rem"], { ease: cubicBezier(...EASE_OUT) });
```

Achtung: `useMotionMode()` schaltet das ab, wenn `prefers-reduced-motion` gesetzt ist **oder** die Breite unter 992px liegt.

**Rezept 5: Endloser Marquee (nur CSS, zwei Varianten)**

```css
@keyframes scrollRight{ 0%{transform:translate(0)} to{transform:translate(50%)} }
@keyframes scrollLeft { 0%{transform:translate(0)} to{transform:translate(-50%)} }
@keyframes scrollUp   { 0%{transform:translateY(0%)} to{transform:translateY(-50%)} }
@keyframes scrollDown { 0%{transform:translateY(-50%)} to{transform:translateY(0)} }

.marquee{ display:inline-flex; align-items:center; background:#D9F9B9; color:#0A1A1D;
          padding:2.5rem 0; will-change:transform; animation:scrollRight 45s linear infinite }
.marquee > *{ flex-shrink:0; padding-right:5rem; white-space:nowrap }
```

Dauern im Bestand: 16s (Bildband), 24s (Partnernamen), 45s (CTA-Band), 145s / 150s (Testimonial-Spalten).

**Rezept 6: Farbstufen-Ausblendung mit gestapelten Blur-Masken (von der Partner-Wand auf /about)**

```html
<div style="position:absolute;inset:0;backdrop-filter:blur(.75rem);
  mask-image:linear-gradient(to top, black 0%, black 30%, transparent 85%)"></div>
```

Drei Lagen mit `blur(.25rem / .5rem / .75rem)` und abgestuften Maskenstopps erzeugen eine weiche Kante vor und hinter der laufenden Schrift. Fuer den Hero wird dasselbe Muster mit `blur(.2rem)` und Stopps bei 45 / 60 Prozent genutzt.

### Anti-Patterns und Schwaechen

- **Canonical zeigt auf eine fremde Domain.** Jede der 11 geprueften Seiten traegt `<link rel="canonical" href="https://bitbull-trading.com//...">` mit doppeltem Slash. Die Seite kann so nicht auf sich selbst ranken. Groesster SEO-Fehler der Site.
- **Keine einzige Meta-Description.** 0 Treffer in allen 11 HTML-Dateien. Suchmaschinen bauen die Snippets selbst.
- **Kein strukturiertes Markup.** 0 `application/ld+json` auf allen Seiten. Keine FAQPage, kein Organization, kein Article, obwohl FAQ-Bloecke mit 4 bis 9 Fragen existieren.
- **Keine Sitemap, kein hreflang.** `/sitemap.xml` liefert 404 und die `/en/`-Seiten haben kein `hreflang` und tragen trotzdem `canonical` auf die DE-URL-Struktur.
- **Zahlenwiderspruch im gleichen Verkaufstrichter.** Startseite: "92 Lektionen, 12 Module" und "Die 4 Komponenten". Komplettausbildung: "12 Kurse ... 266 Lektionen", "besteht aus 11 Videokursen". Community: "50.000+ Trader". Startseite sonst: "40.000". Footer: "60k". Vier verschiedene Mitgliederzahlen auf derselben Website. Zusaetzlich bei den Live-Sessions: Startseite "8 Live-Tradings pro Woche", Produktseite "10x die Woche Live Trading".
- **Zwei Preisaussagen ueber denselben Zugang.** FAQ woertlich: "fuer dich bleibt alles kostenfrei" und im selben Absatz "erhaeltst du fuer nur $49 im Monat Zugang zu allen Pro-Inhalten". Der Hauptclaim "100 % kostenlos" wird im gleichen Atemzug relativiert.
- **Formulare nur als Kulisse.** Auf allen Marketing-Seiten gibt es 0 `<form>`, 0 `<input>`, 0 `<textarea>`. Das Chat-Feld auf der Startseite ist ein `div` mit dem Text `Frage stellen...`. Der eigentliche Funnel liegt vollstaendig auf einer anderen Domain.
- **Kein Consent-Banner trotz dreier Tracker.** GTM, Twitter-Pixel und PostHog laufen ohne Einwilligungsabfrage, obwohl die Seite EU-Publikum adressiert und die Datenschutzseite Einwilligung als Rechtsgrundlage nennt.
- **Marquees ohne Reduced-Motion-Ausnahme.** Die CSS-Animationen `scrollLeft`, `scrollRight`, `scrollUp`, `scrollDown` laufen weiter, auch wenn das System "Bewegung reduzieren" meldet. Nur die SVG- und Blur-Animationen haben eine Ausnahme.
- **Alt-Text-Luecken.** 50 Prozent der Bilder auf der Startseite, 60 Prozent auf `/live-call` sind ohne Alt-Text. Die FAQ-Fragen sind H3 ohne Button-Rolle und ohne `aria-expanded`.
- **Barrierefreiheit der FAQ.** Kein `<details>`, kein `aria-expanded`, keine Tastatur-Semantik. Der Antwistext steht als `div` neben der Frage, das Auf-/Zuklappen ist nicht als Zustand im DOM lesbar.
- **Deko-Daten als Tabelle.** Die Leaderboard-Spalten tragen im Auslieferungszustand `Loading...` und `$ 0` sowie `Exchange 3` als Platzhalternamen. Der Countdown steht auf `00`. Ohne JS sieht der Beweis-Block kaputt aus.
- **Toter CSS-Code.** Drei Keyframes (`trustScroll`, `weeklyScroll`, `coachesScroll`) und ihre Klassen existieren im Stylesheet, werden aber nirgends verwendet.
- **Firmenangaben duenn.** Impressum nennt nur LLC, Cayman Islands und eine Kanzlei-Adresse. Kein Vertretungsberechtigter, keine Kontakt-E-Mail, keine Registernummer im Text. Fuer eine Seite, die mit "Seriositaet" und "Transparenz" als Hauptargument wirbt, ist das der schwaechste Punkt.
- **Feste Pixelhoehen statt fluessig.** `h-[50rem]`, `h-[95.75rem]`, `h-[109rem]`, `w-[min(226rem,calc(100%-4rem))]`. Der Rem-Trick ueber `vw` faengt das meistens ab, wirkt aber bei Browser-Zoom und in eingebetteten Iframes unvorhersehbar.

### Conversion-Mechanik

Die Seite verkauft nicht, sie zieht alles auf eine einzige Handlung zusammen: 119 Links ueber alle geprueften Seiten zeigen auf `trademania.app/register`, es gibt kein Kontaktformular, keine Telefonnummer und keinen Newsletter, also keinen einzigen alternativen Ausgang. Der Preiswiderstand wird vorab zerlegt, indem "0 EUR, ueber Broker finanziert" gegen "1.000-9.000 EUR" fuer Coachings und "49-199 EUR/Monat" fuer Signalgruppen gestellt wird, und der Interessent zahlt mit dem Broker-Konto statt mit Geld. Der Beweis laeuft ueber Wiederholung von vier Zahlen (40k Trader, 8 Live-Tradings, 50h Ausbildung, $210.000 Cashback) in Hero, Zaehler-Grid und Abschlussliste, nicht ueber Zertifikate oder Presse. Die Risikoabsicherung uebernimmt ein 9-Fragen-FAQ auf jeder Produktseite, das genau die vier Bremsen bedient: Zeit, Kapital, Vorkenntnis und Seriositaet. Der letzte Klick wird durch sozialen Nachweis in Textform flankiert (27 Testimonials mit Klarnamen, 9 Mentoren mit Titeln wie "Finalist World Cup Trading Competition") direkt vor dem Abschlussblock, waehrend die Gegenargumente "Gurus" und "Signalgruppen" in der Vergleichstabelle bereits zwei Screens vorher entwertet wurden.

## Abrufprotokoll

Alle Abrufe am 2026-09-16 mit `curl -sL -m 30 -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128 Safari/537.36"`, Arbeitsverzeichnis `/tmp/site-trademania/`.

| URL | HTTP | Bytes | Datei |
|---|---|---|---|
| https://www.trademania.io/ | 200 | 496961 | home.html |
| https://www.trademania.io/en | 200 | 492211 | en.html |
| https://www.trademania.io/komplettausbildung | 200 | 671746 | komplettausbildung.html |
| https://www.trademania.io/live-call | 200 | 320090 | live-call.html |
| https://www.trademania.io/community | 200 | 673315 | community.html |
| https://www.trademania.io/leaderboards | 200 | 377218 | leaderboards.html |
| https://www.trademania.io/about | 200 | 276197 | about.html |
| https://www.trademania.io/manifesto | 200 | 239091 | manifesto.html |
| https://www.trademania.io/impressum | 200 | 102164 | impressum.html |
| https://www.trademania.io/datenschutz | 200 | 119372 | datenschutz.html |
| https://www.trademania.io/bitcoin-breakout-ty | 200 | 111997 | bitcoin-breakout-ty.html |
| https://trademania.app/register | 200 | 92296 | register.html |
| https://www.trademania.io/robots.txt | 200 | 55 | robots.txt |
| https://www.trademania.io/sitemap.xml | 404 | 44841 | sitemap.xml (Next.js-404-Seite) |
| https://www.trademania.io/_next/static/chunks/1b60e6d0bd3c924f.css | 200 | 316048 | 1b60e6d0bd3c924f.css |
| https://www.trademania.io/_next/static/chunks/8f3c0ebfc5b9802f.css | 200 | 332578 | 8f3c0ebfc5b9802f.css |
| https://www.trademania.io/_next/static/chunks/0ef02c5696aa57e6.css | 200 | 13535 | 0ef02c5696aa57e6.css |
| https://www.trademania.io/_next/static/chunks/6f2f2895cf241f4d.css | 200 | 53082 | 6f2f2895cf241f4d.css |
| https://www.trademania.io/_next/static/chunks/2af8151143018b0d.css | 200 | 1053 | 2af8151143018b0d.css |
| https://www.trademania.io/_next/static/chunks/c1e872fc27e620e4.css | 200 | 66617 | c1e872fc27e620e4.css |
| 34 JS-Chunks aus `/_next/static/chunks/*.js` | 200 | 3.9 MB gesamt | js/*.js |
| https://www.trademania.io/_next/image?url=...hero-fallback.png&w=1920&q=75 (mit `Accept: image/avif,image/webp`) | 200 | 11410 | imgtest.bin, Content-Type `image/webp` |
| https://www.trademania.io/sitemap_index.xml, sitemap-0.xml, sitemap.xml.gz | 404 | je ca. 44850 | nicht gespeichert |
| https://www.trademania.io/ch, /ch/, /blog, /ratgeber, /kontakt, /preise, /pricing, /team, /faq, /live-events, /danke, /bitcoin-breakout, /en/bitcoin-breakout-ty | 404 | je ca. 44840 | nicht gespeichert |
| https://www.trademania.io/en/komplettausbildung, en/live-call, en/community, en/leaderboards, en/about, en/manifesto | 200 | 243130 bis 673349 | nicht gespeichert (Existenz geprueft) |
| https://www.trademania.io/studio | 200 | 55977 | nicht gespeichert, via robots.txt disallowed |

Nicht abrufbar bzw. nicht belegbar: Der Inhalt hinter `/studio` wurde wegen `Disallow` nicht analysiert. Die Zaehler in Footer, Leaderboard-Tabellen und Countdown stammen aus clientseitigen Datenquellen, ihr echter Wert ist im ausgelieferten HTML nicht enthalten und daher hier nur als Platzhalter dokumentiert. Der PostHog-Projektschluessel wurde im Client-Bundle gefunden, der Wert wird hier nicht abgedruckt. Der Inhalt der Marketing-App unter `trademania.app` wurde nur an der Funnel-Einstiegsseite geprueft, nicht im eingeloggten Bereich.
