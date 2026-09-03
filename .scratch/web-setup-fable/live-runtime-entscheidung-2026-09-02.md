# Live-Runtime-Entscheidung, 02.09.2026

- Gültige Nutzerentscheidung: `multi-family bleibt`.
- Live wiederhergestellt um 18:38 UTC über `/root/tools/fleet-profile.sh multi-family`.
- Geprüfter Stand: grok-critic/visual-kritiker = `xai/grok-4.6`; sol-builder/sol-pruefer = `gpt-5.6-sol`; luna-worker = `gpt-5.6-luna`.
- Workflow-Transportfix: Fremdfamilien werden im Desktop-Harness als `claude-gw-xai-4.6` und `claude-gw-sol-5.6` transportiert; `canonical_model` dekodiert sie auf Grok bzw. Sol. Sie sind kein Fable.
- Live-Beleg Workflow `wf_49b7103d-db6`: beide Leaves `TRANSPORT_OK`, Modelle `claude-gw-xai-4.6` und `claude-gw-sol-5.6`.
- Hook-Gate: 70 Tests grün in `test_gateway_aliases.py`, `test_pin-subagent-model.py`, `test_no-billigmodell-subagent.py`, `test_no-fable-subagents.py`.
