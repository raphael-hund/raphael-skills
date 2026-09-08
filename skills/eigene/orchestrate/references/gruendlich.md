# GRUENDLICH — ein Durchlauf, volle Stage-Queue, keine Feedback-Schleifen

**Zweck (1 Satz):** Eine Mission wird in einem Zug gründlich durch die fünf
Stages gefahren — der Controller hält die Queue stabil und meldet erst am Ende
oder bei einem harten Blocker, nicht zwischendurch.

## Wann diese Betriebsart

- Der Auftrag ist klar genug, um ohne Rückfragen zu laufen (Ziel, Pfade,
  Tabus stehen in der Mission).
- Qualität schlägt Tempo: lieber einmal vollständig mit Verify und Review als
  drei kurze Runden mit Abstimmung.
- Der Nutzer will **kein** Zwischen-Feedback — das ist die ausdrückliche
  Erlaubnis, die Checkpoints auszusetzen.

GRUENDLICH ersetzt nicht das Vorab-Klären: Ist die Mission selbst unklar,
läuft vorher genau eine Klärung (GRILL/SPEC aus `plan`), dann startet die
Queue und läuft durch. GRUENDLICH ist keine Dauerschleife (das ist LOOP) und
kein Vergleich gegen eine Messlatte (das ist GAUNTLET).

## Ablauf

1. **Mission einfrieren.** Ein Block: Ziel, Scope, erlaubte Pfade,
   Negativentscheidungen, Gates, Stop-Bedingung, Budget (Zeit/Agenten).
2. **Queue bauen (Stage 1–2).** Die Task-Liste aus `stages.md` einmal
   erzeugen und einfrieren. Jedes Task bekommt `owner` (agentType) und ein
   ausführbares `gate`. Verify-Familie ≠ Owner-Familie.
3. **Durchfahren (Stage 3–5).** Tasks in `depends_on`-Reihenfolge. Jeder
   Step: Owner läuft → Gate ausführen → Verify durch Fremdfamilie. Erst wenn
   alle Steps `pass` oder belegt `blocked` sind, Stage 5 (Review).
4. **Einmal melden.** Am Ende ein kompaktes Ergebnis: Queue-Stand,
   Familienabdeckung, Routenausfälle, Reviewer-Urteil, offene Punkte.

## Zwischenmeldungen (das Gegenteil von Feedback-Schleifen)

Der Controller meldet zwischendurch **nur**, wenn eines davon eintritt:

- **BLOCKED:** ein harter Blocker, den kein Ersatz aus einer anderen Familie
  fängt (z. B. fehlender Zugang, fehlende Datei, widersprüchliche Mission).
- **Rot-Klasse:** der nächste Schritt wäre ein Publish/Live-Eingriff — der
  endet immer an der Review-Inbox, nie am Live-Schalter.
- **Budget erreicht:** Zeit- oder Agenten-Limit ohne vollständige Queue.

Alles andere — „Step 3 läuft", „Verify war grün" — ist Protokoll, nicht
Meldung. Der Nutzer liest den Fortschritt an der aufgelisteten Queue, nicht
an Chat-Nachrichten.

## Failover-Regel in GRUENDLICH

Ein Routenausfall (`null`, Timeout, 429) löst **keine** Meldung aus, solange
der Ersatz aus einer anderen Familie greift. Der Ausfall und der Ersatz
stehen im Runden-Protokoll und in der Schlussmeldung. Erst wenn Primär UND
Ersatz ausfallen, ist das ein BLOCKED.

## Budget-Defaults (ohne andere Ansage)

- Unabhängige Pakete laufen parallel, abhängige bleiben über `depends_on`
  geordnet. Es gibt keine 6er-Welle und keinen Extra-Deckel „ein Schreiber
  für die ganze Runde“, wenn die `write_set`s disjunkt sind. Shared Files
  haben weiterhin genau einen Owner.
- Review-Fixrunden: 1. Ein zweites rotes Gate am selben Task = `blocked`.
- Derselbe Infrastrukturfehler wird höchstens einmal wiederholt.

## Anti-Muster

- Nach jedem Step kurz „okay?" fragen — das ist genau die Feedback-Schleife,
  die GRUENDLICH abschafft.
- Die Queue mitten im Lauf umwerfen — bei neuen Erkenntnissen wird die
  Mission am Ende nachgezogen, nicht unterwegs.
- GRUENDLICH als Freibrief für unbegrenzte Agentenzahl — das Budget steht im
  Missionsblock und wird nicht selbst erhöht.
