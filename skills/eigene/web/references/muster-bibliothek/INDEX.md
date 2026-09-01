# Muster-Bibliothek — INDEX

Eine Zeile pro Studie. Vor jeder Art-Direction scannen und **2–3 passende
Cases** laden, nie alle.

**Urteils-Werte:** `GO` · `NO-GO` · `gemischt` · `GO-house-lock`
(= Raphael hat es in der Kunden-`DESIGN.md` gelockt; gilt sofort als
verbindlich, siehe `../stil-regeln.md` §Status-Logik).

**Capture-Status:** `fehlt` heisst, es liegt noch kein Shot-Sweep vor. Das
Urteil stützt sich dann auf die gelockte `DESIGN.md`, nicht auf ein Bild.
Ein Case mit `Capture: fehlt` darf nicht als visueller Beweis zitiert werden.
Ein neuer Website- oder Video-Frame-Case bleibt ohne Raphael-Urteil **oder**
ohne erfüllte Belegschwelle `kandidat`. Jeder neue Case führt in seiner
Case-Datei Quelle, Auswahlgrund, Do-not-copy, Lizenz/Provenance, Status und
Evidence. Video-Frame-Cases brauchen zusätzlich Zeitmarke und Frame-Beleg; ein
visueller Claim ohne Frame bleibt unbestätigt.

## House-Cases (eigene Kunden)

| Slug | Sektor | Quelle | Urteil | Capture | Kernregeln |
|---|---|---|---|---|---|
| `braun-services` | handwerk-local | `/root/clients/braun-services/DESIGN.md` · live `https://umzug-braun.ch` | GO-house-lock | fehlt | S2, S3, S4, S5, S5-N, S6, S13, S17 |
| `salsaflow` | tanz-community | `/root/clients/salsaflow/DESIGN.md` (locked v2.0) | GO-house-lock **auf den DESIGN-Lock**, nicht auf die Live-Seite | fehlt | S1, S4-Ausnahme, S7, S8, S13, S14 |
| `kraftwerk-garage` | handwerk-local | `/root/clients/kraftwerk/DESIGN.md` · live `https://www.kraftwerk-garage.ch` | GO-house-lock | fehlt | S1, S3, S4, S7-Body-Ausnahme, S9-N, S11, S12 |
| `swisshelp-elektro` | handwerk-local | `/root/clients/swisshelp/DESIGN.md` | GO-house-lock | fehlt | S1, S4, S9-N, S10 |
| `kita-wunderkiste` | kita | `/root/clients/kita-wunderkiste/DESIGN.md` · live `https://kiwuki.ch/` | GO-house-lock (Preserve-Modus) | fehlt | S9, S13 |

## Externe Referenzen

| Slug | Live-URL | Stamp | Essenz |
|---|---|---|---|
| `elephant-solar` | `https://www.elephantsolar.de/` | GO 31.08.2026 | Beweis statt Behauptung: untertitelte Kunden-Videos, Referenzkarten mit kWp/Modulzahl/PLZ, ein Dunkelgrün-System mit Lime nur als Wort-Span/Label/Einzel-Button. |
| `farisschmidt` | `https://www.farisschmidt.de/` | GO 31.08.2026 | Typo-Hero ohne Foto mit genau einem Serif-Kursiv-Akzentwort, ein durchgehendes Pill-CTA-System, Referenzen als echte gelieferte Websites im Browser-Rahmen. |
| `alpen-energie` | `https://alpen-energie.ch/` | GO 31.08.2026 | **Eigener Kunde:** Quelle der Wahrheit ist `/root/clients/alpenenergie/DESIGN.md` (clone-parity, S18) — die Live-Seite ist Clone-Vorlage, kein freies Redesign-Vorbild; Echt-Fotos, Messwert-Referenzen, 4-Schritt-Frage-Funnel. |
| `ekd-solar` | `https://www.ekd-solar.de/` | GO 31.08.2026 | Echte unbeschönigte Bewertung „4,2 von 5,0 aus über 1.800" im Fold, Orange nur als Eyebrow/ein CTA/Kreis-Pfeil, identisches Sub-Hero-Muster auf allen Unterseiten. |
| `enpal` | `https://www.enpal.de/` | GO 31.08.2026 | Strenges Zwei-Farben-System Navy/Gold, Trust nur mit Quelle und krummer Zahl (CHIP, Trustpilot 4,2/29.580), Bild-Quiz-Funnel statt Kontaktformular. |
| `jantronic` | `https://www.jantronic.com/` | GO 31.08.2026 | Ehrlicher Proof im Fold (ProvenExpert, nur 8 Bewertungen mit Datum), CTA-Paar grün/grau als System, Vergleichs-Matrix und Team-Karten mit direktem Draht. |
| `peter-at` | `https://www.peter.at/` | GO 31.08.2026 | Ein wörtlich identischer gelber „Jetzt Ersparnis berechnen"-CTA sitewide, drei ProvenExpert-Siegel im Fold, Anfrage-Funnel ohne Navigation mit Ein-Klick-Mikro-Commitment. |
| `priwatt` | `https://priwatt.de/solaranlagen/` | GO 31.08.2026 | Geschlossenes Grün-System aus zwei Polen, krumme Zahlen mit Stand-Fußnote, Berater-Band mit Klartext-Telefon als Sektionstrenner, ein Funnel-Template über Produktlinien. |

Alle 8 externen Zeilen haben eine Case-Datei (`<slug>.md`) mit
GO-Stamp Raphael 31.08.2026. Regel-Kandidaten und Zähler daraus pflegt
`regel-kandidaten.md`; `../stil-regeln.md` bleibt bis zu Raphaels GO
unangetastet.

Der Skill erfindet keine Fremd-URLs. Neue Plätze: Raphael legt URL oder
Screenshot in `/root/eingang` (Tabelle in `../stil-regeln.md` §6), dann
entsteht hier eine Zeile.

## Ablauf für eine neue Studie

1. `_template.md` nach `<slug>.md` kopieren und vollständig ausfüllen.
2. Capture nach Template §1 (1440×900 und 390×844, kein fullPage als Kritik).
3. Zeile hier eintragen; Detail-Evidence bleibt in der Case-Datei.
4. Erst nach Raphael-Urteil und erfüllter Belegschwelle Regel-Kandidaten in
   `../stil-regeln.md` nachtragen, mit Slug als Beleg.
