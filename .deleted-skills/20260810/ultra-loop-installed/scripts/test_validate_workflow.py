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
const mechanic = await agent('check', {agentType:'haiku-worker'})
"""
        )
        self.assertFalse(
            any("Pflicht-Flotte" in message for message in messages), messages
        )

    def test_rejects_fable_agent_type_and_model(self):
        for body in (
            "const x = await agent('x', {model:'fable'})",
            "const x = await agent('x', {agentType:'fable-worker'})",
        ):
            with self.subTest(body=body):
                messages = self.messages(body)
                self.assertTrue(
                    any("Fable-Subagents" in message for message in messages),
                    messages,
                )


if __name__ == "__main__":
    unittest.main()
