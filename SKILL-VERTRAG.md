# SKILL-VERTRAG — was jede SKILL.md haben muss

**TLDR:** Jede `SKILL.md` beginnt mit einem YAML-Kopf. Sieben Felder sind
Pflicht: `name`, `version`, `description`, `class`, `scope`, `sensitivity`,
`completion_criteria`. Der Name faengt mit `r-` an, die Klasse ist einer von
sieben Buchstaben, und "fertig" ist immer eine pruefbare Tatsache. Das Skript
`tools/validate-skill.py` prueft das. Dieses Dokument erklaert die Regeln so
einfach, dass ein Fuenfjaehriger sie versteht.

> Status: Vertrag + Runbook. Das Skript prueft die Pflichtfelder hart und die
> Werte weich (Warnung). Es ist KEIN Ersatz fuer ein echtes Review durch
> Raphael. Erledigt-Zustaende (Evals bestanden, Freigabe erteilt) stehen hier
> nicht — die belegt der jeweilige Skill selbst.

Grundlage: v5-Plan Abschnitt 9.1 (Skill-Vertrag) und 9.2 (Progressive
Disclosure), sowie `raphael-command-center/AGENTS.md` (7 Rot-Klassen,
Trust-Grenzen). Namensraum-Marker: `.skill-namespace` (Inhalt `r-`).

---

## 1. Die sieben Pflichtfelder

Fehlt eines oder ist es leer, ist die SKILL.md **rot** (Fehler, Exit-Code 1).

| Feld | Was es bedeutet (einfach) | Beispiel |
|---|---|---|
| `name` | Der eindeutige Name. Faengt mit `r-` an. Nur Kleinbuchstaben, Ziffern, Bindestriche. | `r-ads-hooks` |
| `version` | Die Ausgabe-Nummer im Format `x.y.z` (semver). | `1.0.0` |
| `description` | **WANN** der Skill feuert — nicht bloss was drinsteht. Der wichtigste Satz. | `Scroll-Stopper-Hooks fuer Meta-Ads aus Angle + Brand-Voice.` |
| `class` | Ein Buchstabe: was fuer eine Art Skill das ist (siehe Teil 2). | `F` |
| `scope` | Fuer wen der Skill gilt (siehe Teil 3). | `agency` |
| `sensitivity` | Wie geheim der Inhalt ist (siehe Teil 4). | `internal` |
| `completion_criteria` | Eine **Liste** von pruefbaren Kriterien: woran man sieht, dass die Arbeit fertig ist. Mit "eingefuegtem Beweis" im Chat. | `- rubric: evals/rubrics/ads.md >= 0.7` |

**Empfohlen** (nicht Pflicht, fehlt = nur Warnung, nie rot):
`provenance`, `eval_scorecard`, `expires`, `loads`, `requires_skills`.

`completion_criteria` soll eine Liste sein (mit `- ` Eintraegen), kein
Fliesstext-Satz. Sonst ist "fertig" keine pruefbare Tatsache.

---

## 2. Die sieben Skill-Klassen (`class`)

Ein Buchstabe. Das ist nur eine leichte Ordnung, kein Formalismus.

| Buchstabe | Klasse | Was der Skill tut (einfach) |
|---|---|---|
| `R` | Router | Schickt eine Anfrage an den richtigen anderen Skill weiter. Kurz, nur Wegweiser. |
| `M` | Methodik | Ein Wissens-/Methoden-Baustein, den andere Skills mitnutzen (z. B. Copy-Grundlagen). |
| `F` | Fulfillment | Erledigt echten Kundenoutput (Web, Ads, SEO, Design). Der Loop, der etwas liefert. |
| `O` | Orchestrierung | Verbindet mehrere Teile: Seats, Gateway, Quota, Verifier, Handoff. |
| `E` | Eval | Misst Qualitaet: Rubrics, Baselines, Scorecards. Macht "gut" pruefbar. |
| `W` | Wissen | Pflegt Wissen/Brain: Wiki, Provenienz, Promotion 0-8. |
| `G` | Governance | Regeln, Grenzen, Freigaben, Rot-Klassen-Schutz. |

Merksatz: **R**outer · **M**ethodik · **F**ulfillment · **O**rchestrierung ·
**E**val · **W**issen · **G**overnance.

Unbekannter Buchstabe = Warnung (nicht rot), damit alte Skills nicht brechen.

---

## 3. Der Wirkungsbereich (`scope`)

Fuer wen gilt der Skill? Wichtig fuer die Mandanten-Trennung (Trust-Grenze TB4).

| Wert | Bedeutung |
|---|---|
| `global` | Gilt ueberall, auch ausserhalb der Agentur. |
| `agency` | Gilt intern in der Agentur. |
| `client:<slug>` | Gilt nur fuer einen Kunden, z. B. `client:mueller-bau`. |
| `project:<slug>` | Gilt nur fuer ein Projekt, z. B. `project:sommer-launch`. |

Regel aus dem Plan: `client-confidential` darf **nie** `global` werden.

---

## 4. Die Sensitivitaet (`sensitivity`)

Wie geheim ist der Inhalt?

| Wert | Bedeutung |
|---|---|
| `public` | Darf jeder sehen. |
| `internal` | Nur intern in der Agentur. |
| `client-confidential` | Kundengeheimnis. Bleibt beim Kunden-Scope. |
| `secret` | Streng geheim (z. B. Zugangsdaten-nahe Inhalte). Nie in Git im Klartext. |

---

## 5. Progressive Disclosure — die Zeilenlimits (v5-Plan 9.2)

Nicht alles auf einmal laden. Jede Ebene bleibt klein, damit der Kontext nicht
zumuellt. Diese Grenzen sind Richtwerte fuer "kurz halten":

1. **SessionStart-Hook** — nur Pointer und der `hot.md`-TLDR. Genau **ein**
   SessionStart-Hook je Harness.
2. **AGENTS.md** — unter **200 Zeilen**, maximal ungefaehr **15 harte Regeln**.
3. **Domain-Router** — unter **150 Zeilen**, nur Routing, keine Inhalte.
4. **Leaf-Skill (SKILL.md)** — unter **300 Zeilen**.
5. **references/** — einzeln **lazy** laden, nie alles vorab.

Wer mehr Inhalt braucht, lagert ihn in `references/` aus und laedt ihn erst bei
Bedarf ueber `loads`.

---

## 6. Vollstaendiges Beispiel

```yaml
---
name: r-ads-hooks
version: 1.0.0
description: >
  Wann dieser Skill feuert, nicht bloss was er enthaelt.
  Scroll-Stopper-Hooks fuer Meta-Ads aus Angle + Brand-Voice.
class: F
scope: global
sensitivity: public
loads:
  - references/hook-frameworks.md
requires_skills:
  - r-copywriting@^1
completion_criteria:
  - "rubric: evals/rubrics/ads.md >= 0.7"
# empfohlen: provenance, eval_scorecard, expires
---
```

---

## 7. Pruefen

    python3 tools/validate-skill.py            # scannt skills/ ab Repo-Root
    python3 tools/validate-skill.py <pfad>      # prueft einzelne Pfade/Dateien

Exit-Code `0` = alle gueltig. Exit-Code `1` = mindestens ein Fehler (rot).
Warnungen brechen den Lauf nicht ab, sind aber ein Auftrag zum Aufraeumen.
