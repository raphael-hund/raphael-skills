#!/usr/bin/env python3
import importlib.util
import pathlib
import re
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
    """Deckt check_multimodel_fleet und check_model_fable ab."""

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


# --- Die vier Pruefer, die niemand getestet hat (Befund 30.07.2026) ---------
# Der Validator hat sieben check_*-Funktionen; die drei Tests oben deckten zwei
# davon ab (Flotte + Fable). check_meta, check_nondeterminism, check_args_falle
# und check_slice_falle waren ungeprueft — also gerade die, die vor den drei
# Fehlern schuetzen, die laut workflow-vorlage.md wirklich passiert sind
# (Resume-Bruch durch Date.now(), args-Crash, still gekappte Daten per slice).

class MetaValidationTest(unittest.TestCase):
    """check_meta — ohne meta laeuft kein Workflow, also ist das FAIL, nicht WARN."""

    def stufen(self, code):
        return [(stufe, message) for stufe, _, message in VALIDATOR.validate(code)]

    def test_fehlendes_meta_ist_fail(self):
        stufen = self.stufen("const x = 1\nawait agent('tu was', {model: 'sol'})\n")
        self.assertTrue(any(s == VALIDATOR.FAIL and "meta" in m for s, m in stufen),
                        f"kein FAIL zu fehlendem meta: {stufen}")

    def test_meta_ohne_name_ist_fail(self):
        # Der Pruefer sucht schlicht `"name" not in body` — das Wort darf also
        # nicht im Beschreibungstext stehen. Erster Versuch nutzte
        # `description: 'ohne name'` und der Test schlug fehl, weil der Pruefer
        # das `name` DARIN fand. Nicht der Pruefer war schuld, mein Testtext war
        # es (dieselbe Sorte Fehler wie bei den Detektor-Fixtures).
        code = "export const meta = {\n  description: 'nur Beschreibung',\n}\n"
        stufen = self.stufen(code)
        self.assertTrue(any(s == VALIDATOR.FAIL and "name" in m for s, m in stufen),
                        f"kein FAIL zu fehlendem name: {stufen}")

    def test_vollstaendiges_meta_meldet_nichts_dazu(self):
        # Gegenrichtung: ein korrektes meta darf keinen meta-Befund erzeugen.
        # Ohne diesen Fall waere check_meta auch durch "immer FAIL" erfuellbar.
        stufen = self.stufen(BASE % "await agent('a', {model: 'sol'})\nawait agent('b', {model: 'kimi'})\n")
        meta_befunde = [m for _, m in stufen if "meta" in m.lower()]
        self.assertEqual(meta_befunde, [], f"meta-Befund auf korrektem meta: {meta_befunde}")


class NondeterminismTest(unittest.TestCase):
    """check_nondeterminism — diese drei brechen Resume, deshalb FAIL."""

    def messages(self, body):
        return [message for _, _, message in VALIDATOR.validate(BASE % body)]

    def test_math_random_ist_verboten(self):
        self.assertTrue(any("Math.random()" in m for m in self.messages(
            "const i = Math.random()\nawait agent(`tu ${i}`, {model: 'sol'})\n")))

    def test_date_now_ist_verboten(self):
        self.assertTrue(any("Date.now()" in m for m in self.messages(
            "const t = Date.now()\nawait agent(`tu ${t}`, {model: 'sol'})\n")))

    def test_argloses_new_date_ist_verboten(self):
        self.assertTrue(any("new Date()" in m for m in self.messages(
            "const d = new Date()\nawait agent(`tu ${d}`, {model: 'sol'})\n")))

    def test_new_date_mit_wert_ist_erlaubt(self):
        # Die Gegenprobe zum Fall darueber: `new Date(args.stamp)` ist
        # reproduzierbar und darf NICHT gemeldet werden. Ein Pruefer, der jedes
        # `new Date` verbietet, macht Zeitstempel unmoeglich.
        msgs = self.messages("const d = new Date(parsed[0])\nawait agent(`tu ${d}`, {model: 'sol'})\n")
        self.assertFalse(any("new Date()" in m for m in msgs), f"Fehlalarm: {msgs}")


class ArgsUndSliceTest(unittest.TestCase):
    """Die zwei WARN-Pruefer aus der Vorlage — beide aus echten Crashes."""

    def messages(self, code):
        return [message for _, _, message in VALIDATOR.validate(code)]

    def test_args_ohne_typeof_parse_warnt(self):
        code = ("export const meta = {\n  name: 'x',\n  description: 'y',\n}\n"
                "for (const a of args) { await agent(a, {model: 'sol'}) }\n")
        self.assertTrue(any("typeof" in m for m in self.messages(code)),
                        "kein Hinweis auf das defensive args-Muster")

    def test_args_mit_typeof_parse_ist_still(self):
        # BASE enthaelt das Muster bereits — hier darf nichts kommen.
        msgs = self.messages(BASE % "for (const a of parsed) { await agent(a, {model: 'sol'}) }\n")
        self.assertFalse(any("typeof" in m for m in msgs), f"Fehlalarm: {msgs}")

    def test_slice_auf_json_stringify_warnt(self):
        body = "await agent(`Daten: ${JSON.stringify(parsed).slice(0, 2000)}`, {model: 'sol'})\n"
        self.assertTrue(any("Slice-Falle" in m for m in self.messages(BASE % body)),
                        "Slice-Falle nicht erkannt")

    def test_json_stringify_ohne_slice_ist_still(self):
        body = "await agent(`Daten: ${JSON.stringify(parsed)}`, {model: 'sol'})\n"
        msgs = self.messages(BASE % body)
        self.assertFalse(any("Slice-Falle" in m for m in msgs), f"Fehlalarm: {msgs}")


class PrueferAbdeckungTest(unittest.TestCase):
    """Meta-Test: jede check_*-Funktion des Validators hat mindestens einen Test.

    Ohne diesen Test faellt es nicht auf, wenn jemand einen achten Pruefer
    hinzufuegt und ihn ungetestet laesst — genau der Zustand, in dem vier von
    sieben waren."""

    def test_jede_checkfunktion_wird_geprueft(self):
        quelle = MODULE_PATH.read_text(encoding="utf-8")
        pruefer = set(re.findall(r"^def (check_[a-z_]+)", quelle, re.M))
        # Welche werden in dieser Datei namentlich erwaehnt (Docstring genuegt)?
        eigen = pathlib.Path(__file__).read_text(encoding="utf-8")
        ohne = sorted(p for p in pruefer if p not in eigen)
        self.assertEqual(ohne, [], f"Pruefer ohne Test: {ohne}")


class SabotageTest(unittest.TestCase):
    """Merken die Tests, wenn der Validator kaputtgeht?

    Die Frage hinter allen anderen — im web- und design-Skill hat genau diese
    Messung drei blinde Stellen gefunden. Ein Testlauf, der gruen meldet,
    beweist nicht, dass er etwas pruefen WUERDE; nur, dass heute nichts kaputt
    ist.

    Je Fall wird EINE Zeile im Validator so geaendert, dass ein Pruefer still
    aufhoert zu urteilen (nicht "Datei kaputt" — das faengt jeder Parser). Danach
    laufen alle uebrigen Tests dieser Datei; mindestens einer MUSS fehlschlagen.
    Das Original wird immer zurueckgeschrieben, auch bei Absturz.
    """

    # (Name, Suchtext, Ersatz) — jeweils die Stelle, an der das Urteil faellt.
    SCHAEDEN = [
        ("check_nondeterminism", "        for m in re.finditer(pat, code):",
         "        for m in []:"),
        ("check_multimodel_fleet", "    for label, pattern in required:",
         "    for label, pattern in []:"),
        ("check_model_fable", "def check_model_fable(code, findings):",
         "def check_model_fable(code, findings):\n    return"),
        ("check_meta", '    if "name" not in body:', "    if False:"),
        ("check_args_falle", '    if not re.search(r"\\bargs\\b", code):',
         "    if True:"),
        ("check_slice_falle", '    for m in re.finditer(r"JSON\\.stringify',
         "    for m in []:  # "),
    ]

    def test_jeder_schaden_faellt_auf(self):
        import subprocess
        import sys

        original = MODULE_PATH.read_text(encoding="utf-8")
        blind = []
        nicht_eingebaut = []
        try:
            for name, alt, neu in self.SCHAEDEN:
                if alt not in original:
                    # Kein Bestehen: der Schaden liess sich nicht einbauen, also
                    # hat dieser Fall nichts gemessen. Beim Bauen im web-Skill ist
                    # mir das zweimal passiert, und beide Male sah die Ausgabe
                    # nach Erfolg aus.
                    nicht_eingebaut.append(name)
                    continue
                MODULE_PATH.write_text(original.replace(alt, neu, 1), encoding="utf-8")
                # NICHT `-k "not Sabotage"` — das filtert bei unittest ALLE Tests
                # weg ("Ran 0 tests", Exit 0), und ein Lauf ohne Tests gilt als
                # Erfolg. Damit hat dieser Test nach dem Bauen nichts gemessen:
                # jeder Schaden sah bestanden aus. Nachgemessen am 30.07.2026,
                # nachdem ich drei Schutz-Tests entfernte und die Sabotage
                # trotzdem OK meldete. Genau das stille Gruen, gegen das dieser
                # ganze Umbau laeuft — hier in meinem eigenen Test.
                #
                # Stattdessen die drei Testklassen namentlich, die den Validator
                # gegen Eingaben pruefen. Und `Ran 0 tests` gilt als Fehler.
                r = subprocess.run(
                    [sys.executable, "-m", "unittest",
                     "test_validate_workflow.MultiModelValidationTest",
                     "test_validate_workflow.MetaValidationTest",
                     "test_validate_workflow.NondeterminismTest",
                     "test_validate_workflow.ArgsUndSliceTest",
                     "-v"],
                    capture_output=True, text=True, timeout=300,
                    cwd=str(pathlib.Path(__file__).parent),
                )
                gelaufen = re.search(r"Ran (\d+) tests?", r.stderr or "")
                if not gelaufen or int(gelaufen.group(1)) == 0:
                    nicht_eingebaut.append(f"{name} (Unterlauf fuehrte 0 Tests aus)")
                    continue
                if r.returncode == 0:
                    blind.append(name)
        finally:
            MODULE_PATH.write_text(original, encoding="utf-8")
            # Und nachsehen, ob das geklappt hat: ein Sabotage-Lauf, der Schaden
            # hinterlaesst, ist schlimmer als keiner.
            self.assertEqual(MODULE_PATH.read_text(encoding="utf-8"), original,
                             "validate-workflow.py liess sich NICHT wiederherstellen — "
                             "sofort: git checkout -- scripts/validate-workflow.py")

        self.assertEqual(nicht_eingebaut, [],
                         f"Schaden liess sich nicht einbauen (Ankertext geaendert?): {nicht_eingebaut}")
        self.assertEqual(blind, [],
                         f"Diese Pruefer koennen still ausfallen, ohne dass ein Test reisst: {blind}")


if __name__ == "__main__":
    unittest.main()
