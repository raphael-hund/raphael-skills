# Skript 1 — Tafel-Montag

kunde: make
segment: local-service-handwerk
dossier: /tmp/grok-goal-0ced06dee8ae/implementer/eval/angle-dossier-make.md
F-ID: F8
A-ID: A2
S-ID: S4
T-ID: T9
Winner-Basis: kein Performance-Datensatz
dossier-status: vorhanden

## Sprechtext

Du kennst den Montag um Viertel vor sechs.

Zwei Namen an der Tafel. Keine Baustelle dahinter.

Der Betrieb läuft. Die Anfragen tun es nicht.

MAKE baut dir Website und Sichtbarkeit aus einer Hand.

Du trägst dich unten ein. Ich rufe dich in 24 Stunden an.

Kostenlos und unverbindlich. Dein Dominic.

## Hook-Varianten

1. F8: Du kennst den Montag um Viertel vor sechs.
2. F2: Handwerker in der Deutschschweiz, schau kurz hier.
3. F4: Du führst den Betrieb selbst und die Tafel bleibt lückenhaft.

## Beat-Tabelle

| Beat | Zeile | Wörter | Device |
|---|---|---:|---|
| Hook | Du kennst den Montag um Viertel vor sechs. | 8 | VO + Tafel |
| Pain | Zwei Namen an der Tafel. Keine Baustelle dahinter. | 9 | Close-up Tafel |
| Mechanismus | MAKE baut dir Website und Sichtbarkeit aus einer Hand. | 10 | Dominic |
| CTA | Du trägst dich unten ein. Ich rufe dich in 24 Stunden an. | 13 | Overlay Formular |

## Grounding

- Tafel-Szene: `wiki/company/icp/icp-gesamtdossier.md:46`
- 24 Stunden / kostenlos: `wiki/company/voice/2026-07-20-eigene-ad-sprachmuster.md:47`
- Eine Hand: `wiki/company/icp/icp-situationen-und-schmerz.md:22`

## V12

1. Erster Satz 8 Wörter. ja
2. Zahl in Sekunde 1–3: 24 Stunden im CTA, Szene ohne erfundene Euro-Zahl. ja
3. Anrede Du durchgehend. ja
4. A2 kurz. ja
5. forbidden-check folgt. ja
6. Ein CTA am Ende. ja
