#!/usr/bin/env python3
import importlib.util
import os
import pathlib
import unittest
from unittest import mock


MODULE_PATH = pathlib.Path(__file__).with_name("validate-workflow.py")
SPEC = importlib.util.spec_from_file_location("validate_workflow", MODULE_PATH)
VALIDATOR = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(VALIDATOR)


BASE = """export const meta = {
  name: 'test-workflow',
  description: 'test',
}
const parsed = typeof args === 'string' ? JSON.parse(args) : (args || [])
%s
"""


class MultiModelValidationTest(unittest.TestCase):
    """Profil `multi-family` — per Env gepinnt, damit die Tests unabhaengig
    vom echten `/root/.claude/fleet-profile` deterministisch sind."""

    PROFILE = "multi-family"

    def setUp(self):
        patcher = mock.patch.dict(
            os.environ, {"RAPHAEL_FLEET_PROFILE": self.PROFILE}
        )
        patcher.start()
        self.addCleanup(patcher.stop)

    def messages(self, body):
        return [message for _, _, message in VALIDATOR.validate(BASE % body)]

    def test_rejects_claude_only_workflow(self):
        messages = self.messages(
            "const result = await agent('work', {model:'sonnet'})"
        )
        self.assertTrue(
            any("sol-pruefer" in message for message in messages), messages
        )
        self.assertTrue(
            any("kimi" in message for message in messages), messages
        )
        self.assertTrue(
            any("luna-worker" in message for message in messages), messages
        )

    def test_accepts_required_cross_vendor_fleet(self):
        messages = self.messages(
            """
const sol = await agent('judge', {agentType:'sol-pruefer'})
const kimi = await agent('critic', {agentType:'kimi-recherche'})
const luna = await agent('verify', {agentType:'luna-worker'})
const writer = await agent('write', {agentType:'sonnet-worker'})
const mechanic = await agent('check', {agentType:'terra-bulk'})
"""
        )
        self.assertFalse(
            any("Pflicht-Flotte" in message for message in messages), messages
        )

    def test_rejects_raw_fable_model_override(self):
        """Rohes model:'fable' umgeht die Agenten-Definition und bleibt ein WARN.

        Seit der Freigabe 20.08.2026 laufen Fable und Opus ueber die
        agentTypes 'fable-advisor' / 'opus-builder' — dort stehen die
        Leitplanken (Bounded Task, kein Reward-Hacking, Selbstbenotungs-Verbot).
        Ein roher model-Override umgeht genau die.
        """
        for body in (
            "const x = await agent('x', {model:'fable'})",
            "const x = await agent('x', {agentType:'fable-worker'})",
        ):
            with self.subTest(body=body):
                messages = self.messages(body)
                self.assertTrue(
                    any("agentType" in message and "fable-advisor" in message
                        for message in messages),
                    messages,
                )

    def test_accepts_freigegebene_fable_und_opus_agent_types(self):
        """Die freigegebenen agentTypes duerfen NICHT als Fable-Verstoss gelten."""
        for body in (
            "const x = await agent('x', {agentType:'fable-advisor'})",
            "const x = await agent('x', {agentType:'opus-builder'})",
        ):
            with self.subTest(body=body):
                messages = self.messages(body)
                self.assertFalse(
                    any("umgeht die Agenten-Definition" in message
                        for message in messages),
                    messages,
                )

    def test_accepts_fable_builder_agent_type(self):
        code = (
            "export const meta = { name: 'x', description: 'y' }\n"
            "await agent(p, { agentType: 'fable-builder', effort: 'high' })\n"
            "await agent(q, { agentType: 'sol-pruefer' })\n"
        )
        findings = VALIDATOR.validate(code)
        self.assertFalse([f for f in findings if f[0] == VALIDATOR.FAIL and 'fable' in f[2].lower()], findings)

    def test_accepts_gateway_dd_aliases(self):
        """Transport-IDs sind Grok/Kimi/Sol, kein Fable-FAIL."""
        for body in (
            "const x = await agent('x', {model:'claude-fable-5-dd-korg', agentType:'visual-kritiker'})",
            "const x = await agent('x', {model:'claude-fable-5-dd-3k-imik', agentType:'kimi-worker'})",
            "const x = await agent('x', {model:'claude-fable-5-dd-los-6.5-tpg', agentType:'sol-builder'})",
            "const x = await agent('x', {model:'claude-gw-dd-6.4-korg/iax', agentType:'grok-worker'})",
        ):
            with self.subTest(body=body):
                messages = self.messages(body)
                self.assertFalse(
                    any("umgeht die Agenten-Definition" in message
                        for message in messages),
                    messages,
                )

    def test_rejects_canonical_fable_model_id(self):
        messages = self.messages(
            "const x = await agent('x', {model:'claude-fable-5'})"
        )
        self.assertTrue(
            any("umgeht die Agenten-Definition" in message for message in messages),
            messages,
        )


class ClaudeOnlyFleetTest(MultiModelValidationTest):
    """Profil `claude-only` (Raphael 02.09.2026): Nur-Claude ist der Normalfall.

    Erbt die Fable-/dd-Alias-Tests der Basisklasse — die gelten profilunabhaengig.
    """

    PROFILE = "claude-only"

    def test_claude_only_fleet_ist_kein_warn(self):
        messages = self.messages(
            """
const bau = await agent('build', {agentType:'opus-builder'})
const kritik = await agent('critic', {agentType:'sonnet-worker', label:'Kritik'})
"""
        )
        self.assertFalse(
            any("Nur Claude-Familie" in message for message in messages), messages
        )
        self.assertFalse(
            any("Self-Review" in message for message in messages), messages
        )

    def test_rejects_claude_only_workflow(self):
        """Basisklassen-Fall umgedreht: unter claude-only kein Fremdfamilien-WARN."""
        messages = self.messages(
            "const result = await agent('work', {model:'sonnet'})"
        )
        self.assertFalse(
            any("sol-pruefer" in message for message in messages), messages
        )

    def test_accepts_required_cross_vendor_fleet(self):
        """Fremdfamilien sind hier BLOCKED, nicht Flottenbeleg."""
        messages = self.messages(
            "const sol = await agent('judge', {agentType:'sol-pruefer'})"
        )
        self.assertTrue(
            any("nicht verfuegbar" in message and "sol-pruefer" in message
                for message in messages),
            messages,
        )

    def test_warnt_bei_self_review_opus_auf_opus(self):
        messages = self.messages(
            """
const bau = await agent('build', {agentType:'opus-builder'})
const kritik = await agent('review', {agentType:'opus-critic', label:'Review'})
"""
        )
        self.assertTrue(
            any("Self-Review" in message for message in messages), messages
        )

    def test_ohne_review_schritt_keine_instanz_warnung(self):
        messages = self.messages(
            "const bau = await agent('build', {agentType:'opus-builder'})"
        )
        self.assertFalse(
            any("Self-Review" in message for message in messages), messages
        )

    def test_haiku_masse_mit_sonnet_kritik_ist_sauber(self):
        messages = self.messages(
            """
const masse = await agent('bulk', {model:'haiku'})
const kritik = await agent('check', {model:'sonnet', label:'Kritik'})
"""
        )
        self.assertFalse(
            any("Self-Review" in message or "Nur Claude-Familie" in message
                for message in messages),
            messages,
        )


class FleetProfileResolutionTest(unittest.TestCase):
    def test_env_schlaegt_datei(self):
        with mock.patch.dict(os.environ, {"RAPHAEL_FLEET_PROFILE": "claude-only"}):
            self.assertEqual(VALIDATOR.fleet_profile(), "claude-only")

    def test_default_ohne_env_und_ohne_datei(self):
        env = {k: v for k, v in os.environ.items() if k != "RAPHAEL_FLEET_PROFILE"}
        with mock.patch.dict(os.environ, env, clear=True), \
                mock.patch.object(VALIDATOR, "FLEET_PROFILE_PATH", "/nonexistent/fleet-profile"):
            self.assertEqual(VALIDATOR.fleet_profile(), "multi-family")


if __name__ == "__main__":
    unittest.main()
