#!/usr/bin/env python3
import importlib.util
import pathlib
import unittest


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


if __name__ == "__main__":
    unittest.main()
