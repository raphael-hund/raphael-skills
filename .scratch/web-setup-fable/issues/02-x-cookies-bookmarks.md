# X-Zugang für Bookmark-Pipeline einrichten

Type: task
Status: resolved
Blocked by: 

## Question

HITL: Raphael liefert einmalig auth_token und ct0 aus dem X-Login (Browser DevTools → Application → Cookies → x.com). Ablage in ~/.secrets/api-keys.env als TWITTER_AUTH_TOKEN / TWITTER_CT0, Test mit 'twitter status' und 'twitter bookmarks -n 5'. Alternative B: Chrome-Extension am Mac lesen. Ohne Zugang: Bookmark-Pipeline bleibt Fog.

Ergänzung: E3 Firecrawl-Key ist ungültig (4 von 5 Recherche-Läufen "API key invalid or revoked"). Erneuern kostet Geld; ohne ihn bleibt X-Recherche auf r.jina.ai (~5 Posts je Profil) beschränkt.

## Resolution (2026-09-02)

auth_token und ct0 liegen als TWITTER_AUTH_TOKEN / TWITTER_CT0 in /root/.secrets/api-keys.env (root:root 640, ACL raphael-claude r). Beleg: `twitter status` → authenticated true, user @lolbrotherxo (id 1846133822007767040); `twitter -c bookmarks -n 5` liefert 5 Einträge. Warnung `Failed to init ClientTransaction` ist kosmetisch. Firecrawl-Key bleibt Betrieb (ungültig).
