# Addendum nach Sol-Skills-Fail

Sol failte, weil die fünf Router-Logs zwei verschiedene Titel für dieselbe Segment-Datei zeigten.

Ursache: Die Markt-Seite wurde nach dem ersten Log neu geschrieben.

Fix: alle fünf Logs am 2026-08-13 nach dem letzten Titel neu erzeugt.

Jetzt identisch:
- SEGMENT=local-service-handwerk
- ANDERE_SEGMENTE_NICHT_GELADEN=agenturen-coaching,b2b-dienstleister,uebertragbar
- Titel: Local-Service-Ads führen mit Ort, Preis und kurzem Check zur Leistung

Beleg: `router-ads.log`, `router-ads-research.log`, `router-ads-video.log`, `router-ads-statics.log`, `router-ads-copy.log`.
