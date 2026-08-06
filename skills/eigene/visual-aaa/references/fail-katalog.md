# Fail-Katalog — visuelle AAA-Sperren

Jeder Eintrag: **Symptom → harte Regel → G1-Check (falls vorhanden) → Fix-Hinweis.**

## F1 — Köpfe / Personen angeschnitten

- **Symptom:** Gesicht, Schädel, Schulterlinie am Rahmen abgeschnitten.
- **Regel:** Nie shippen. Crop/`object-position` so, dass ganze Köpfe + Luft bleiben.
- **G1:** `edge-content-crush` (Proxy); Critic muss Personen explizit abhaken.
- **Fix:** `object-position` auf Kopfhöhe; Motiv outpainten statt harder cover-crop;
  nie `object-fit: fill` auf Gruppenfotos.

## F2 — Harter Schwarz-/Farb-Slab statt Verlauf

- **Symptom:** Untere (oder obere) Bildhälfte ist tot einfarbig; Text sitzt auf
  Platte; Foto endet abrupt.
- **Regel:** Verläufe brauchen ≥120 CSS-px weiche Zone; kein Soft-Stop auf reines
  `#000` über mehr als ~15 % der Seitenhöhe ohne Motivrest.
- **G1:** `hard-black-slab`, `low-variance-dead-zone`.
- **Fix:** Längeres Foto (echtes Outpaint), Gradient-Stops neu, Overlay erst
  unterhalb der Personen enden lassen.

## F3 — Blur- / Spiegel- / Stretch-Pfusch

- **Symptom:** Unterer Streifen ist gespiegeltes/geblurrtes Motiv; unnatürliche
  Textur-Wiederholung; „Gummi“-Verzerrung.
- **Regel:** Verboten als Outpaint-Ersatz. Echtes Generativ-Outpaint oder
  anderes Motiv.
- **G1:** `blur-mirror-band`.
- **Fix:** Higgsfield/outpaint-Modell; Ergebnis per Read prüfen.

## F4 — Text / CTA abgeschnitten oder unvollständig

- **Symptom:** Button-Label endet mitten im Satz; Letzte Zeile fehlt; Text
  läuft ins Logo/Footer.
- **Regel:** Gesamter String muss im PNG lesbar sein; Safe-Margin einhalten.
- **G1:** `bottom-text-clip-risk`, `edge-content-crush`.
- **Fix:** Karte `fit-content` + max-height prüfen; Font/Padding reduzieren;
  Copy kürzen **bewusst**, nicht still abschneiden.

## F5 — Safe-Margin verletzt

- **Symptom:** Logo, QR, Text < ~5 % Seitenkante (A4 @794: ~40 px).
- **Regel:** Außenkante frei; Raphael-Rüge „zu weit draußen“.
- **G1:** `edge-content-crush`.
- **Fix:** Inset 40–48 px (A4-Template), QR neu platzieren.

## F6 — Asset falsch / nicht freigestellt / Kasten sichtbar

- **Symptom:** Weißer/farbiger Kasten um Freisteller; falsches Produktmotiv.
- **Regel:** Jedes Asset vor Einbau einzeln ansehen (Memory screenshot-pflicht).
- **G1:** begrenzt (Kontrast-Box); Critic + Self-Read Pflicht.
- **Fix:** background-remover; Asset tauschen.

## F7 — Feedback-Punkt nicht als Check

- **Symptom:** User sagt „Monteure auf letzte Seite“ — Agent baut Team-Grid um.
- **Regel:** Jede User-Korrektur → eine Zeile in `visual-lattee.md`:
  `check: <seite> | <soll> | open|pass|fail`.
- **G1:** nein (semantisch). Critic bekommt die Checkliste.
- **Fix:** Scope-Lock vor dem nächsten Render.

## F8 — DoneClaim ohne Gate

- **Symptom:** „v14 ist fertig“ bei offenen Pixel-Fails.
- **Regel:** Nur `visual-ship.json` mit `ok: true` darf „fertig“ heißen.
- **G1/Ship:** `validate-ship-manifest.py`.
