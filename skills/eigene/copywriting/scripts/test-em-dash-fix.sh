#!/usr/bin/env bash
# Regressionstest für em-dash-fix.py.
#
# Warum: Das Skript hat beim ersten Bau echten Schaden angerichtet.
# Es zerstörte ein Negativ-Beispiel (beide Satzhälften wurden identisch),
# erzeugte Doppel-Doppelpunkte und riss Quellenangaben bei Zitaten ohne
# Anführungszeichen auseinander. Jeder dieser Fälle steht jetzt hier.
#
# Aufruf: bash test-em-dash-fix.sh
# Exit 1, sobald ein Fall bricht.
set -uo pipefail

S="$(cd "$(dirname "$0")" && pwd)/em-dash-fix.py"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
ok=0
bad=0

# fix <erwartet> <eingabe>  -> Zeile muss exakt so herauskommen
fix() {
  printf '%s\n' "$2" > "$TMP/t.md"
  python3 "$S" "$TMP/t.md" >/dev/null 2>&1
  got="$(cat "$TMP/t.md")"
  if [ "$got" = "$1" ]; then
    ok=$((ok + 1))
  else
    bad=$((bad + 1))
    echo "  FEHLER"
    echo "    ein:      $2"
    echo "    erwartet: $1"
    echo "    bekommen: $got"
  fi
}

echo "== Ersetzung nach Regel =="
# Hauptsatz danach -> Punkt plus Grossschreibung
fix 'Der Hook trägt allein. Die Zahl kommt später.' \
    'Der Hook trägt allein — die Zahl kommt später.'
# Konjunktion danach -> Komma
fix 'Wir messen nach, und dann entscheiden wir.' \
    'Wir messen nach — und dann entscheiden wir.'
# Apposition danach -> Doppelpunkt
fix 'Drei Beats: Hook, Proof, CTA.' \
    'Drei Beats — Hook, Proof, CTA.'
# Em-Dash am Zeilenende -> Doppelpunkt
fix 'Der Anbieter muss es tragen können:' \
    'Der Anbieter muss es tragen können —'

echo "== darf NICHT angefasst werden =="
# Zitat-Zeile: der Dash steht im Beispiel und traegt die Aussage
fix 'Aus „Er bekommt die Anfrage — der Rest erfährt nie davon" wird zwei Sätze.' \
    'Aus „Er bekommt die Anfrage — der Rest erfährt nie davon" wird zwei Sätze.'
# Zeile hat schon einen Doppelpunkt: Komma statt zweitem Doppelpunkt
fix 'Material holen: Dossier und Transkript, beides zwingend.' \
    'Material holen: Dossier und Transkript — beides zwingend.'
# Quellenangabe nach Zitat
fix '- Marc Evers: „Ich bringe dich auf 30.000 Euro" — Beleg aus dem Korpus' \
    '- Marc Evers: „Ich bringe dich auf 30.000 Euro" — Beleg aus dem Korpus'
# Nummerierte Beleg-Zeile ohne Anfuehrungszeichen
fix '7. Ich bringe dich in 31 Tagen auf Platz 1. — Pascal Harting, ad_archive_id 252' \
    '7. Ich bringe dich in 31 Tagen auf Platz 1. — Pascal Harting, ad_archive_id 252'
# Ueberschrift
fix '## R6 — Verzichts-Formel' \
    '## R6 — Verzichts-Formel'
# Tabellenzeile
fix '| Hook | 8 Wörter — Median |' \
    '| Hook | 8 Wörter — Median |'
# Backtick-Inhalt: Formatvorlage, muss zum erzeugenden Skript passen
fix '**Bauplan:** `[These] — [Auflösung in 2 Sätzen]`' \
    '**Bauplan:** `[These] — [Auflösung in 2 Sätzen]`'
fix 'Marker `[UNVOLLSTÄNDIG — nur in Notion]` ausschließen.' \
    'Marker `[UNVOLLSTÄNDIG — nur in Notion]` ausschließen.'
# Mehrzeilige Vorlage: Backtick oeffnet, schliesst erst in der naechsten Zeile
fix '**Bauplan:** `[Provokante These] — [max. 2 Sätze' \
    '**Bauplan:** `[Provokante These] — [max. 2 Sätze'

echo "----"
echo "bestanden=$ok  fehlgeschlagen=$bad"
[ "$bad" -eq 0 ] || exit 1
