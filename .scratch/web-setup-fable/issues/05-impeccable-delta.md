# Impeccable-Original gegen vendored design-Skill: was fehlt

Type: research
Status: resolved
Blocked by: 

## Question

Welche Verben, Context-Flow-Teile (PRODUCT.md/DESIGN.md, context.mjs), Detektoren und Referenzen hat das Original unter /root/.agents/skills/impeccable (und /root/tools/vendor), die in /root/raphael-skills/skills/design fehlen oder veraltet sind? Welche davon ändern eine Build-Entscheidung, welche sind Dublette zu web/design? Lizenz-Ampel und Commit-Stand prüfen.

## Answer

Report: /tmp/claude-997/-root/eeba6b3f-9784-4222-a9db-d2265e8f025e/scratchpad/recherche/05-impeccable-delta.md. Original (/root/.agents/skills/impeccable, v4.0.5, Apache-2.0 per SPDX-Header im Detektor-Kern, LICENSE-Datei fehlt = gelb für Nicht-Detektor-Teile) liegt vor dem vendored Stand vom 19.07. (v3.9.1/v4.0.1): Detektor-Registry 46 → 59 Regeln (14 neue IDs, u.a. content-hidden-at-rest, script-error, first-viewport-column-overflow, text-occlusion, kicker-above-heading, heading-rhythm, undersized-ui-text; 2 umbenannt), 13 von 20 Detektor-Dateien stark abweichend. craft-floor.md hat einen neuen Verify-Block 'Browser surfaces' plus 8 Refuse-Punkte, die in craft-floor-de.md fehlen. Die 23 Kommando-Verben sind in commands-de.md 1:1 vorhanden; Context-Flow (context.mjs, PRODUCT.md/DESIGN.md) und die 4 Sub-Agent-TOMLs wurden bewusst nicht übernommen. Netzwerk im Original nur ausserhalb des Detektor-Kerns (Telemetrie-Ping, Update-Check, beide per Env abschaltbar); keine Eigenwerbung. Folge: Detektor-Refresh ist ein klarer Task (grün), Verben-als-Phasen ist eine Entscheidung (Ticket 07).
