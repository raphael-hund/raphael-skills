# Rolle ≠ Modell

Eine Rolle ist der Auftrag. Ein Modell ist die Besetzung.
Kein Modell besitzt eine Rolle allein.

Bei Ads, Copy, Skript und Frontend starten **zwei Modelle parallel**.
Ein drittes nur, wenn die zwei stark abweichen.
Der Prüfer kommt aus einer **anderen Familie** als beide Schreiber (Regel 8).

Instanz bekommt beim Start festes Modell + Effort (Regel 7).
Die Rollen-Datei schreibt kein Exklusiv-Modell fest.

Grok 4.6 sitzt in jedem kreativen Panel. Grok nicht auf Repos mit Secrets
oder Kundendaten (Secrets-Gate, Juli 2026).

## Deine echten Use-Cases

| Rolle | Auftrag | Doppel-Besetzung | Drittes | Skill |
|---|---|---|---|---|
| `ads` | Angles, Strategie, Testwelle, Kill-Keep | Kimi K3 + Opus 5 | Grok 4.6 | `ads` |
| `copywriter` | DE-Verkaufstext (Web, Mail, Ads-Fließtext) | Opus 5 + Kimi K3 | Grok 4.6 | `copywriting` |
| `scriptwriter` | Video-Ad-Skript (Beats, Sprechtext) | Kimi K3 + Opus 5 | Grok 4.6 | `ads-video` |
| `frontend` | Seite / UI bauen | Opus 5 + Kimi K3 | Grok 4.6 | `web` / `design` |
| `pm` | Spec, Plan, Scope | Fable + Grok 4.6 | — | `plan` |
| `engineer` | Ticket umsetzen, Fix | Grok 4.6 + Sol | Sonnet | `tdd` |
| `reviewer` | Diff prüfen | andere Familie als der Builder | — | `code-review` |
| `qa` | echten Flow fahren | Luna + Grok 4.6 | — | — |
| `retro` | Historie → Lernen | Kimi K3 + Grok 4.6 | — | — |
| `visual-kritiker` | visuell zerreißen | Grok 4.6 + Opus 5 (immer beide) | Sol | `visual-aaa` |
| `explorer` | Repo/Docs nur lesen | Luna + Grok 4.6 | — | — |
| `architect` | Schnitt, kein Code | Fable + Grok 4.6 | — | — |
| `planning-critic` | Plan vor dem Bau zerreißen | andere Familie als Architect | — | — |
| `security` | Secrets/Auth/XSS | Sol + Grok 4.6 | — | — |
| `researcher` | Quellen holen | Kimi + Grok 4.6 | — | `agent-reach` / `last30days` |
| `prototyper` | Spike / Wegwerf | Grok + Kimi | — | — |
| `sweeper` | aufräumen nach dem Bau | Grok + Luna | — | — |
| `synthesizer` | zwei Entwürfe zu einem | andere Familie als Schreiber | — | — |
| `triager` | Inbox sortieren | Luna + Grok 4.6 | — | — |
| `test-writer` | Tests schreiben | Luna + Grok 4.6 | — | `tdd` |

Belege (X / 30 Tage): Claude built-in Explore+Plan; Jules Planning Critic; Sid/Anthropic Architect+Reviewer+QA; Simon Last planner/implementer/adversarial reviewer/black-box tester/triager; @ko1_agmsg Prototyper/Builder/Sweeper; @shoto290 Owns-Refuses-Knows-Verifies-Returns; CyrilXBT planner/researcher/skeptic/synthesizer; Codex-Pack security-auditor + docs-researcher.

## Keine eigene Rolle (Skill reicht)

SEO, Report, Onboard, Offer, Research. Das ist Fachwissen, kein zweiter Auftragsschnitt.

## Harte Grenzen

- **Haiku ist als Sub-Agent verboten** (Raphael 14.08.2026). `haiku-worker`
  ist stillgelegt. Masse (lesen, parsen, suchen, Bilder beschreiben) → Luna.
  Denken, bauen, urteilen → Opus, Kimi K3, Grok, Sol.
- **Kritik läuft immer doppelt.** Nie ein Modell allein. Zwei Kritiker aus
  verschiedenen Familien parallel, in EINER Nachricht:
  visuell `visual-kritiker` (Grok) + `opus-critic` ·
  Code `sol-critic` + `opus-critic` ·
  Ads/Copy `kimi-critic` + `opus-critic`.
  Luna ist kein Kritiker — Luna macht Masse, nicht Urteil.
- Kimi fixt keinen Prod-Code.
- Fable schreibt keinen Produktivcode.
- Reviewer ≠ Schreiber-Familie.
- Eine Rolle je Bookmark: verboten.
- Lane-Wrapper (`kimi-worker`, `grok-worker`, …) bleiben Transport, nicht Rolle.
