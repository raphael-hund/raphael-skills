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
# Antithese am Zeilenende: Nomen (gross) ist der Spiegelbegriff -> Fail.
hit A2  "Mobile ist Standard, nicht Ausnahme"
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
# Abgrenzung statt Antithese: Anweisung nennt eine Alternative, die wegfaellt.
no A2     "Das gehört ins Kundenrepo, nicht hierher."
no A2     "Der Satz wird gestrichen, nicht poliert."
no A2     "Das gehört in die Drehliste, nicht in die Illustration."
no A2     "Der Beleg macht es glaubwürdiger, nicht schwächer."
no A2     "Zeig den Endzustand, nicht das Schmerzstadium."
no A2     "Einfache Wörter, keine Fachbegriffe, keine Schachtelsätze."
no A2     "Eine Obergrenze, kein Ziel; bei Zweifel weniger."
# Umbrochene Aufzaehlung: Adjektiv (klein) am Zeilenende, Satz laeuft weiter.
no A2     "Screen-Demo ab Sekunde 3, kein langes"
no A2     "Einfache Wörter, keine Fachbegriffe, keine Schachtelsätze im Skript."
no B6b    "Wir liefern dein Festpreis-Angebot in 24 Stunden."
no FEHLER "Wärmepumpe kaputt? Neue in 48 Stunden."
no FEHLER "Die Anlage deckt 85 Prozent deines Strombedarfs."
no FEHLER "Wir entrümpeln zum Festpreis. Du zahlst erst nach der Übergabe. 1257 Kunden haben uns mit 5,0 bewertet."

echo "== E3 Generik-Test =="
# Gefunden beim Schlusscheck: Slop OHNE gelistete Woerter passierte das Gate.
# "Als erfahrener Partner an Ihrer Seite..." enthaelt kein verbotenes Muster,
# ist aber vollstaendig austauschbar. Messbar ueber fehlende Belegdichte.
hit E3 "Als erfahrener Partner an Ihrer Seite begleiten wir Sie auf dem Weg zu mehr Sichtbarkeit. Unsere Experten entwickeln gemeinsam mit Ihnen eine Strategie, die zu Ihrem Unternehmen passt. Vertrauen Sie auf unsere langjährige Erfahrung."
# Zahl im Text -> Beleg vorhanden -> kein E3
no E3  "Wir entrümpeln deine Wohnung zum Festpreis. Du zahlst erst nach der Übergabe. 1257 Kunden haben uns auf Google mit 5,0 bewertet. Das Angebot kommt in 24 Stunden bei dir an."
# Unter 25 Woerter: Hooks und Zeilen werden nicht auf Belegdichte geprueft
no E3  "Wärmepumpe kaputt? Wir kommen noch heute vorbei."
# Frist statt Zahl reicht als Beleg
no E3  "Du bekommst dein Angebot binnen 48 Stunden. Wir melden uns persönlich bei dir und klären offene Fragen im Gespräch, bevor irgendetwas beauftragt wird."

echo "== End-to-End: ganze Ad-Copy =="
# Ein Text mit sechs eingebauten Slop-Stellen muss blocken, die redigierte
# Fassung desselben Texts muss durchgehen. Faengt Regex-Aenderungen, die nur
# auf Einzelsaetzen richtig aussehen.
SLOP='Du hast schon drei Agenturen ausprobiert. Keine hat geliefert.

Ich verstehe das. Die meisten verkaufen dir Reichweite, nicht Termine.

In 14 Monaten haben wir für 23 Betriebe 1.847 Anfragen erzeugt.

Unsere robuste Lösung ist dabei ganzheitlich und nahtlos integriert.

Stell dir vor: Dein Kalender füllt sich von allein.

✅ Schnell ✅ Günstig ✅ Zuverlässig

Trag dich ein, ich melde mich in 48 Stunden.'

SAUBER='Du hast schon drei Agenturen ausprobiert und keine hat geliefert.

Ich verstehe das. Die meisten verkaufen dir Reichweite statt Termine im Kalender.

In den letzten 14 Monaten haben wir für 23 Handwerksbetriebe insgesamt 1.847 qualifizierte Anfragen erzeugt. Der günstigste Lead lag bei 18,40 Euro.

Wir richten das System in deinem Betrieb ein und übernehmen die Nachfassung.

✅ Erste Anfragen nach 12 Tagen
✅ Festpreis, keine Erfolgsbeteiligung
✅ Kündbar zum Monatsende

Trag dich ein, ich melde mich in 48 Stunden persönlich.'

if python3 "$S" --text "$SLOP" >/dev/null 2>&1; then
  bad=$((bad + 1))
  echo "  VERPASST: Slop-Ad ging durch (Exit 0)"
else
  ok=$((ok + 1))
fi

if python3 "$S" --text "$SAUBER" >/dev/null 2>&1; then
  ok=$((ok + 1))
else
  bad=$((bad + 1))
  echo "  FEHLALARM: saubere Ad wurde geblockt"
  python3 "$S" --text "$SAUBER" | grep FEHLER
fi

echo "----"
echo "bestanden=$ok  fehlgeschlagen=$bad"
[ "$bad" -eq 0 ] || exit 1
