# Website-Kandidaten aus den X-Bookmarks

Merge-Ziel für die Teil-Listen der Bookmark-Auswertung. Eine Zeile pro
Bookmark-ID, dedupliziert nach ID. Aufgenommen wird nur, wessen
Auswertungsdatei `website_kandidat: ja` trägt.

**Ein Kandidat ist keine Studie.** Eine Zeile hier heißt: die Rohnotiz nennt
eine prüfbare Website- oder Designreferenz. Sie heißt nicht, dass die Seite
abgerufen, bewertet oder gestempelt wurde. Der Weg zur Studie läuft über
`../stil-regeln.md` §6 und `INDEX.md` §Ablauf für eine neue Studie; erst dort
entstehen Capture, Case-Datei und Urteil.

**Keine Link-Auflösung.** Übernommen werden ausschließlich URLs, die in der
Rohnotiz stehen. `t.co`-Kürzel bleiben unaufgelöst, und es wird keine
Site-URL erfunden, wenn die Notiz nur einen X-Artikel verlinkt.

Quelle je Zeile: `/root/raphael-brain/raw/x-bookmarks/<ID>.auswertung.md`.
Status je ID: `../x-bookmarks-ledger.md`.

## Stand 02.09.2026

Grundgesamtheit 30 ausgewertete Bookmark-IDs, davon 2 mit
`website_kandidat: ja`.

| ID | Kategorie | Referenz-Link | Begründung |
|---|---|---|---|
| 2092285372361519180 | design-muster | <https://transitions.dev> | Die explizite URL verweist auf eine konkrete UI-Transitionsbibliothek und ist damit eine prüfbare Designreferenz. |
| 2094524951025914278 | website-referenz | <https://x.com/i/article/2094493136743473152> | Der gespeicherte Inhalt bezeichnet die eigene Landingpage ausdrücklich als Gegenstand der Referenz, auch wenn nur der zugehörige X-Artikel verlinkt ist. |

Beide Zeilen stammen aus der Teil-Liste `kandidaten-teil-sol.md`, die nach dem
Merge entfallen ist. Dedupliziert wurde nach Bookmark-ID; es gab keine
Dopplung und keine zweite Teil-Liste.

## Nicht aufgenommen

28 der 30 ausgewerteten IDs tragen `website_kandidat: nein` und stehen
deshalb nicht in der Tabelle. Ihre Kategorien: `agent-tooling` 17,
`sonstiges` 9, `design-muster` 1, `copy` 1. Der eine nicht aufgenommene
`design-muster`-Fall (2092979873476215219) nennt Designprinzipien ohne
prüfbare Seiten- oder Bibliotheks-URL — Kategorie und Kandidaten-Flag sind
zwei verschiedene Fragen.
