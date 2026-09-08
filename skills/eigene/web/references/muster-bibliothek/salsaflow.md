# Case: Salsaflow Dance Company (Basel)

| Feld | Wert |
|---|---|
| Slug | `salsaflow` |
| Quelle | `/root/clients/salsaflow/DESIGN.md` — Frontmatter `status: locked`, `version: 2.0` |
| Sektor | `tanz-community` — Dials 6 / 5 / 4 |
| Typ | House-Case |
| Datum der Studie | 30.08.2026 |
| Urteil | **GO-house-lock auf das Designsystem v2** |

## ACHTUNG — Live-Seite ist nicht der Case

Unter `https://www.salsaflow-dc.com/` steht eine **Jimdo-Seite**. Das ist
**nicht** das gelockte Designsystem v2 aus `DESIGN.md`. Das GO in diesem Case
gilt ausschliesslich dem `DESIGN.md`-Lock.

Wer die Jimdo-Live-Seite als abgenommenen Geschmack verkauft, macht einen
Fehler. Sie ist der Alt-Stand, kein Vorbild und kein Beleg für eine Regel.

## 1. Capture

**Status: fehlt.** Kein Shot-Sweep vorhanden. Wenn ein Sweep entsteht, muss
die Zeile ausdrücklich nennen, **welchen** Stand er zeigt (Jimdo-Live oder den
gebauten v2-Stack `react-vite-tailwind4`). Ein Shot der Jimdo-Seite belegt
keine Regel dieses Cases.

## 2. Tokens (aus dem Frontmatter, maschinell gelockt)

| Token | Wert |
|---|---|
| Display-Font | Cal Sans (`font-display`, aktiv seit Home-Redesign 2026-07) |
| Body-Font | Afacad (`font-sans`) |
| Script-Akzent | Alex Brush — genau EINE Stelle (Hero-Eyebrow) |
| Akzentfarbe | `salsa #ad1827` in vier Deckkraft-Stufen, ~90/10 sparsam |
| Grundfläche | `paper #ffffff`, Ziel warm (Migration `bg-white` → paper-warm läuft) |
| Dunkle Fläche | `surface-dark #111111`, nur als bewusster Kontrast-Block |
| Linie | `line #e4e4e1` |
| Radius | `rounded-full` für Buttons und Pills, 1.5rem–2.5rem für Bild-Container |
| Spacing | Sektion `py-16`/`py-20`/`py-24`, Karten `p-6`/`p-8`, Shell `max-w-[1400px]` |
| Motion | EINE Signatur: getakteter Stagger-Fade-up `[data-reveal]`, Feder-Kurve |

**Gesperrte Fonts (Frontmatter `banned`):** Hanken Grotesk, Inter, Plus Jakarta
Sans, Geist, Manrope, Poppins, Outfit, DM Sans, Satoshi, Montserrat, Roboto,
Fraunces, Instrument Serif. Tauchen sie wieder aktiv auf, ist das ein Bug.

## 3. Sektionen-Inventar (Startseite, aus DESIGN.md)

| # | Sektion | Pattern-ID | Wie gebaut |
|---|---|---|---|
| 1 | Hero | `P-HERO-PHOTO` | Grosser Studio-Crop mit Bleed und rotem Kant-Marker. Script-Eyebrow „Bailar es vivir". Fixe Navbar, First-Section mit `--nav-h` 76px Headroom. |
| 2 | Angebot | `P-OFFER-PAIR` | Karten nur mit Job, keine Card-Soup. |
| 3 | Events | dunkler Kontrast-Block, nicht P-CTA-MID | Der eine dunkle Kontrast-Block `surface-dark`. |
| 4 | Kursplan / Buchung | `P-CONTACT` | Buchung ist Kernfunktion: Label, Validierung, Submitting-State, Erfolg und Next-Step. |
| 5 | Abschluss | `P-CTA-END` | Roter Primary-Pill, ein Verb („Schnupperstunde buchen"). |

## 4. Raphael-Urteil

**GO-house-lock auf DESIGN.md v2, NICHT auf die Jimdo-Live-Seite.**

- Gefühl ist gesetzt: warm, familiär, Community, einladend, „Du", lateinisch,
  Premium ohne kalt zu sein. Nicht: kalt, generisch, Template-SaaS, kindisch,
  Stockphoto-leblos.
- Eine Akzentfarbe in vier Stufen, Rot strikt für Aktion und Akzent, nie als
  Deko-Fläche. Das ist die sauberste 90/10-Umsetzung im Bestand.
- Die Ban-Liste ist der schärfste Font-Beleg im ganzen Haus und trägt S8.
- Offener Punkt, ehrlich benannt: 66 `bg-white`-Stellen warten auf die
  Migration zu warmem Paper. Nicht blind global tauschen, pro Seite mit
  Screenshot-Check.

## 5. Regel-Kandidaten

| Beobachtung | Regel-ID | Richtung | Status |
|---|---|---|---|
| Eine Akzentfarbe, nie als Deko-Fläche, ~90/10 | S1 | GO | verbindlich |
| **Ausnahme zu S4:** Primary-CTA als roter Pill ist hier ausdrücklich gelockt | S4 | Ausnahme | verbindlich |
| Inter nie als Display | S7 | NO-GO | verbindlich |
| Vollständige Font-Ban-Liste | S8 | NO-GO | verbindlich |
| Kein Bild doppelt auf derselben Seite | S13 | NO-GO | verbindlich |
| Karten brauchen einen Job, keine Card-Soup | S14 | NO-GO | bestätigt |
| Menschen nie KI-from-scratch | S9-N | NO-GO | verbindlich |
