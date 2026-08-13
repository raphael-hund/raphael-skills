#!/usr/bin/env bash
# Regressionstest für forbidden-check.py.
#
# Warum: Die Muster sind Regex. Jede Verschärfung erzeugt Fehlalarme, jede
# Lockerung erzeugt Verpasser. Beides fällt ohne festen Testsatz nicht auf.
# Beim ersten Bau lag der B4-Regex daneben ("robust" traf nicht "robuste"),
# D1 verlangte einen Großbuchstaben, der A2-Regex meldete "nicht nur".
#
# Aufruf: bash test-forbidden-check.sh
# Exit 1, sobald ein Fall bricht.
set -uo pipefail

S="$(cd "$(dirname "$0")" && pwd)/forbidden-check.py"
ok=0
bad=0

# hit <regel> <text>  -> muss anschlagen
hit() {
  if [ "$(python3 "$S" --text "$2" 2>&1 | grep -c "$1")" -gt 0 ]; then
    ok=$((ok + 1))
  else
    bad=$((bad + 1))
    echo "  VERPASST [$1]: $2"
  fi
}

# no <regel> <text>  -> darf nicht anschlagen
no() {
  if [ "$(python3 "$S" --text "$2" 2>&1 | grep -c "$1")" -eq 0 ]; then
    ok=$((ok + 1))
  else
    bad=$((bad + 1))
    echo "  FEHLALARM [$1]: $2"
  fi
}

echo "== muss anschlagen =="
hit A2  "Das ist kein Tool, sondern ein System."
hit A2  "Mobile ist Standard, nicht Ausnahme."
hit A2  "Dann warm siezen, nicht steif."
hit A2  "Es geht nicht um Traffic."
hit A9  "Stell dir vor: Dein Dach ist dicht."
hit A9  "Was wäre, wenn du nie wieder zahlen müsstest?"
hit B1  "Kurz gesagt, wir liefern."
hit B4  "Unsere robuste Lösung hilft."
hit B4  "Eine nahtlose Integration ist möglich."
hit B4b "Wir sind wirklich schnell, in 48 Stunden."
hit B5  "Das ändert alles."
hit B6b "Unsere Entrümpelungs-Excellence überzeugt."
hit B7  "✅ Schnell ✅ Günstig ✅ Fair"
hit D1  "Die Durchführung der Optimierung läuft."
hit D2  "Wir bringen das zur Anwendung bringen."
hit D4  "Wir müssen die Annahme challengen."

echo "== darf nicht anschlagen =="
no A2     "Es ist nicht nur eine Frage des Preises."
no A2     "Keine Quelle heisst Zahl raus, nicht schätzen."
no A2     "Die Regel steht im Imperativ, nicht im Passiv."
no A2     "Gilt auf allen Kanälen, nicht nur Social."
no B6b    "Wir liefern dein Festpreis-Angebot in 24 Stunden."
no FEHLER "Wärmepumpe kaputt? Neue in 48 Stunden."
no FEHLER "Die Anlage deckt 85 Prozent deines Strombedarfs."
no FEHLER "Wir entrümpeln zum Festpreis. Du zahlst erst nach der Übergabe. 1257 Kunden haben uns mit 5,0 bewertet."

echo "----"
echo "bestanden=$ok  fehlgeschlagen=$bad"
[ "$bad" -eq 0 ] || exit 1
