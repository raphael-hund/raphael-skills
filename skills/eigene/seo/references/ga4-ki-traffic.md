# GA4 — KI-Traffic messen (AI-Referral, nur Lesen)

Zweck: **realen AI-Referral-Traffic** aus ChatGPT, Perplexity, Claude, Gemini,
Copilot & Co. messen — Sessions, Conversions, Landingpages — und gegen den
organischen Google-Traffic stellen. GA4 ist die dritte Säule der
KI-Messung neben AIRT (Sichtbarkeits-Beobachtung) und GSC (Impressionen) —
siehe 3-Säulen-Regel in `taktiken-ai-suche-geo.md` §7 und SKILL.md.

**Harte Regel:** GA4 nur lesen. Keine Property-Einstellungen am Kundenkonto
ändern ohne dokumentierte Freigabe; Custom Channel Groups sind schreibende
Admin-Aktionen → vorher bestätigen lassen. Keine erfundenen Metriken: ohne
Zugriff/Daten kein Bericht, sondern Setup-Fallback (unten).

## Was GA4 zeigt — und was nicht

| Sichtbar in GA4 | NICHT in GA4 |
|---|---|
| Sessions/Users mit `source` = AI-Referrer | AI-Sichtbarkeit ohne Klick (Zitationen, Mentions) |
| Conversions/Key Events aus AI-Referral | Google-AIO-/AI-Mode-Impressionen (das ist GSC) |
| Landingpages, Engagement-Zeit der AI-Sessions | Zero-Click-Konsum der Antworten |
| Vergleich AI-Referral vs. Organic Search | Attribution „in KI entdeckt, später via Direct konvertiert" |

Erwartung setzen: AI-Referral ist 2026 der **klickende Rest** einer viel
größeren unsichtbaren Sichtbarkeit (Antworten werden konsumiert, nicht
angeklickt) — kleine absolute Zahlen sind normal und kein Misserfolg.
Kontext-Zahl: AI-Traffic engaged ~30 % länger als Google-Organisch
(Goodie-Panel März–April 2026, 21.05.2026).

## Setup (Reihenfolge)

1. **GA4-Property vorhanden?** Property-ID + Datenstream prüfen; Basis-
   Reporting (Traffic-Akquisition) muss laufen. Kein GA4 → Setup-Fallback.
2. **Variante A — Exploration mit Regex (read-only-freundlich, Default):**
   Exploration → Freiform → Dimension „Session source/medium" (oder
   „Session source") mit Filter-Regex auf bekannte AI-Referrer:
   ```
   (chatgpt\.com|chat\.openai\.com|perplexity\.ai|claude\.ai|gemini\.google\.com|copilot\.microsoft\.com|you\.com|deepseek\.com|grok\.com|meta\.ai)
   ```
   Metriken: Sessions, Engaged sessions, Key events/Conversions,
   Engagement rate. Als gespeicherte Exploration ablegen; Zeitraum 90 Tage.
3. **Variante B — Custom Channel Group „AI Referral" (schreibend, nur mit
   Freigabe):** Admin → Data display → Channel groups → neue Gruppe →
   Bedingung „Session source matches regex" (Regex oben) → Channel
   „AI Referral" VOR „Referral" einsortieren. Wirkt rückwirkend auf
   Standard-Reports. *(UI-Pfade Stand GA4 2024–2026, stabil — Bezeichnungen
   und Menüpunkte live im Konto verifizieren, Google benennt gelegentlich um.)*
4. **Referrer-Liste pflegen:** neue AI-Clients erscheinen laufend (Stand
   oben Sept. 2026); alle 3 Monate Session-source-Topliste nach
   unbekannten `.ai`-/Chat-Referrern absuchen und Regex ergänzen. Auch
   `utm_source=chatgpt.com`-Varianten aus Kampagnen einbeziehen.
5. **Vergleichs-Sicht:** gleiche Exploration duplizieren mit Filter
   `Session default channel group = Organic Search` — daneben stellen,
   nie verrechnen. Anomalie-Check: ~62–63 % der ChatGPT-Referrals landen
   auf Homepages (Similarweb, via cognizo.ai 13.08.2026) — Homepage-/
   Direct-Spitzen gehören zur AI-Referral-Lektüre dazu.

## Berichtsformat (Pflicht, mit Datum)

```
AI-Referral-Snapshot <datum> — Property <id>, Zeitraum <von–bis>
| Quelle | Sessions | Key events | Engagement-Ø | Top-Landingpage |
 Vergleich Organic Search: Sessions __, Key events __
Methode: Exploration-Regex (Variante A) / Channel Group (Variante B)
```

Jede Zahl mit Abrufdatum + Property-ID; Export unter
`client-<name>/seo/exports/ga4-ai-referral-<datum>.csv` ablegen
(Belegpflicht wie GSC/SE-Ranking-Exporte).

## 3-Säulen-Regel (nie vermischen)

1. **GA4 = realer Referral** (harte Sessions/Conversions, aber nur Klicks).
2. **AIRT/Prompt-Tracking = Beobachtung** der Sichtbarkeit pro Engine
   (`se-ranking-workflows.md` §5) — nie als KPI verkaufen.
3. **GSC = Google-Impressionen** inkl. Generative AI Reports (nur
   Impressionen, UI-only, seit 03.06.2026; `gsc-read.md`).
Werte der drei Säulen nie gegeneinander als „Beleg" ausspielen und nie zu
einer Gesamtzahl addieren.

## Setup-Fallback (nur wenn kein GA4-Zugang)

1. Kunde prüft, ob GA4 läuft (Realtime-Report erreichbar?).
2. Falls ja: Zugang als **Betrachter/Analyst** (read-only reicht) auf
   Property-Ebene gewähren lassen — danach Setup ab Schritt 2 oben.
3. Falls nein: GA4-Property + Datenstream durch den Kunden anlegen lassen
   (oder mit schriftlichem Go), Basis-Tag ausrollen, **4 Wochen Daten
   sammeln** — vorher keine AI-Referral-Aussagen.
4. Bis dahin: ehrlicher Vermerk im Report — „AI-Referral nicht messbar:
   kein GA4-Zugang (Stand <datum>)". Keine Schätzungen, keine
   Vendor-Benchmarks als Kundenzahl.
