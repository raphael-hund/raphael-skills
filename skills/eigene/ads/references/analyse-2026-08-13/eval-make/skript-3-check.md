# Skript 3 — Weicher Rückruf

kunde: make
segment: local-service-handwerk
dossier: /tmp/grok-goal-0ced06dee8ae/implementer/eval/angle-dossier-make.md
F-ID: F2
A-ID: A6
S-ID: S4
T-ID: T9
Winner-Basis: kein Performance-Datensatz

## Sprechtext

Du bist Inhaber in der Deutschschweiz.

Du willst planbare Anfragen für den laufenden Betrieb.

Ich bin Dominic von MAKE.

Trag dich unten ein.

Ich melde mich in 24 Stunden. Kostenlos.

## Hook-Varianten

1. F2: Du bist Inhaber in der Deutschschweiz.
2. F10: Trag dich unten ein. Ich rufe dich an.
3. F8: Du willst planbare Anfragen für den laufenden Betrieb.

## Beat-Tabelle

| Beat | Funktion | Wörter |
|---|---|---:|
| Hook | Geo plus Rolle | 6 |
| Offer | Anfragen für den Betrieb | 8 |
| Face | Dominic | 5 |
| CTA | 24 Stunden | 8 |

## Grounding

- Deutschschweiz / Inhaber: `wiki/company/icp/icp-operationalisierung.md:25-26`
- Job ist Anfragen: `wiki/company/icp/icp-situationen-und-schmerz.md:22`
- 24 Stunden: `wiki/company/voice/2026-07-20-eigene-ad-sprachmuster.md:47`

## V12

1. Erster Satz 6 Wörter. ja
2. 24 Stunden aus Voice. ja
3. Du durchgehend. ja
4. A6 kurz. ja
5. forbidden-check folgt. ja
6. Ein CTA. ja
