#!/usr/bin/env bash
# test-werkzeug-gate.sh — Fixture-Suite fuer skills/eigene/web/scripts/werkzeug-gate.mjs
#
# Das Gate ist die einzige harte Pruefung, ob der Tool-Use-Case-Router im Build
# wirklich befolgt wurde. Ein Gate, das immer gruen ist, ist schlimmer als keins —
# deshalb pruefen diese Fixtures beide Richtungen: gruen wenn sauber, rot bei
# jedem bekannten Umgehungsweg.
#
# Usage: bash tools/test-werkzeug-gate.sh
# Exit 0 = alle Fixtures verhalten sich wie erwartet.

set -uo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
GATE="$ROOT/skills/eigene/web/scripts/werkzeug-gate.mjs"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

fails=0

# run <name> <erwarteter-exit> <projekt> [tabelle]
run() {
  local name="$1" want="$2" proj="$3"
  local table="${4:-$proj/art-direction.md}"
  node "$GATE" "$proj" --tabelle "$table" >/dev/null 2>&1
  local got=$?
  if [ "$got" -eq "$want" ]; then
    echo "  ok   $name (exit $got)"
  else
    echo "  FAIL $name — erwartet exit $want, bekam $got"
    fails=$((fails + 1))
  fi
}

table_ok() {
  printf '| Bedarf | Werkzeug | Befehl | Gate | Router-Anker |\n' > "$1"
  printf '| Icons | Lucide | `npm i lucide-react` | ein Icon-System | `#icons` |\n' >> "$1"
  printf '| Motion | motion | `npm i motion` | useReducedMotion | `#motion` |\n' >> "$1"
}

clean_component() {
  printf 'import { ChevronDown } from "lucide-react";\n' > "$1"
  printf 'import { motion, useReducedMotion } from "motion/react";\n' >> "$1"
  printf 'export const F = () => { const r = useReducedMotion(); return <motion.div animate={{opacity:1}}><ChevronDown/></motion.div>; };\n' >> "$1"
}

# --- 1. sauberes Projekt -> gruen ---------------------------------------------
mkdir -p "$TMP/good/src"
echo '{"dependencies":{"react":"19","next":"15","lucide-react":"^0.4","motion":"^11"}}' > "$TMP/good/package.json"
clean_component "$TMP/good/src/faq.tsx"
table_ok "$TMP/good/art-direction.md"
run "sauberes Projekt" 0 "$TMP/good"

# --- 2. zwei Icon-Systeme -> rot ----------------------------------------------
cp -r "$TMP/good" "$TMP/icons"
printf 'import { Star } from "@phosphor-icons/react";\nexport const T = () => <Star/>;\n' > "$TMP/icons/src/trust.tsx"
run "zwei Icon-Systeme" 1 "$TMP/icons"

# --- 3. framer-motion statt motion/react -> rot -------------------------------
cp -r "$TMP/good" "$TMP/framer"
printf 'import { motion } from "framer-motion";\nexport const H = () => <motion.div animate={{y:0}}/>;\n' > "$TMP/framer/src/hero.tsx"
run "framer-motion-Import" 1 "$TMP/framer"

# --- 4. Motion ohne Reduced-Motion -> rot -------------------------------------
cp -r "$TMP/good" "$TMP/reduced"
printf 'import { motion } from "motion/react";\nexport const C = () => <motion.div animate={{scale:1.1}}/>;\n' > "$TMP/reduced/src/card.tsx"
run "Motion ohne useReducedMotion" 1 "$TMP/reduced"

# --- 5. Dependency ohne Tabellenzeile -> rot ----------------------------------
cp -r "$TMP/good" "$TMP/dep"
echo '{"dependencies":{"react":"19","next":"15","lucide-react":"^0.4","motion":"^11","gsap":"^3"}}' > "$TMP/dep/package.json"
run "undokumentierte Dependency" 1 "$TMP/dep"

# --- 6. fehlende Werkzeugtabelle -> rot ---------------------------------------
run "fehlende Werkzeugtabelle" 1 "$TMP/good" "$TMP/good/gibt-es-nicht.md"

# --- 7. Bypass: Paket in devDependencies versteckt -> rot ---------------------
cp -r "$TMP/good" "$TMP/devdep"
echo '{"dependencies":{"react":"19","next":"15","lucide-react":"^0.4","motion":"^11"},"devDependencies":{"gsap":"^3"}}' > "$TMP/devdep/package.json"
run "Bypass devDependencies" 1 "$TMP/devdep"

# --- 8. Bypass: Code ausserhalb src/ (app/) -> rot ----------------------------
cp -r "$TMP/good" "$TMP/approuter"
mkdir -p "$TMP/approuter/app"
printf 'import { motion } from "framer-motion";\nexport const B = () => <motion.div animate={{x:1}}/>;\n' > "$TMP/approuter/app/bad.tsx"
run "Bypass Code in app/" 1 "$TMP/approuter"

# --- 9. Bypass: Paket nur im Fliesstext erwaehnt -> rot -----------------------
cp -r "$TMP/good" "$TMP/prosa"
echo '{"dependencies":{"react":"19","next":"15","gsap":"^3"}}' > "$TMP/prosa/package.json"
echo 'Wir haben ueberlegt ob gsap sinnvoll waere, aber uns dagegen entschieden.' > "$TMP/prosa/art-direction.md"
run "Bypass Fliesstext-Erwaehnung" 1 "$TMP/prosa"


# --- 10. Bypass: Subpath-Import verschleiert zweites Icon-Set -> rot ----------
cp -r "$TMP/good" "$TMP/subpath"
echo '{"dependencies":{"react":"19","next":"15","lucide-react":"^0.4","motion":"^11","@phosphor-icons/react":"^2"}}' > "$TMP/subpath/package.json"
printf 'import Heart from "@phosphor-icons/react/dist/icons/Heart";\nexport const H = () => <Heart/>;\n' > "$TMP/subpath/src/heart.tsx"
printf '| Icons2 | @phosphor-icons/react | `npm i @phosphor-icons/react` | ein Set | `#icons` |\n' >> "$TMP/subpath/art-direction.md"
run "Bypass Subpath-Icon-Import" 1 "$TMP/subpath"

# --- 11. Bypass: framer-motion via Subpath -> rot ----------------------------
cp -r "$TMP/good" "$TMP/framersub"
echo '{"dependencies":{"react":"19","next":"15","lucide-react":"^0.4","framer-motion":"^11"}}' > "$TMP/framersub/package.json"
printf 'import { motion } from "framer-motion/dist/es/index";\nexport const H = () => <motion.div animate={{x:1}}/>;\n' > "$TMP/framersub/src/hero.tsx"
printf '| Motion2 | framer-motion | `npm i framer-motion` | x | `#motion` |\n' >> "$TMP/framersub/art-direction.md"
run "Bypass framer-motion Subpath" 1 "$TMP/framersub"

# --- 12. Bypass: framer-motion via require() -> rot --------------------------
cp -r "$TMP/good" "$TMP/framerreq"
echo '{"dependencies":{"react":"19","next":"15","lucide-react":"^0.4","framer-motion":"^11"}}' > "$TMP/framerreq/package.json"
printf 'const { motion } = require("framer-motion");\nmodule.exports = () => motion;\n' > "$TMP/framerreq/src/legacy.js"
printf '| Motion2 | framer-motion | `npm i framer-motion` | x | `#motion` |\n' >> "$TMP/framerreq/art-direction.md"
run "Bypass framer-motion require()" 1 "$TMP/framerreq"

# --- 13. Bypass: useReducedMotion nur als Kommentar -> rot -------------------
cp -r "$TMP/good" "$TMP/kommentar"
printf 'import { motion } from "motion/react";\n// useReducedMotion machen wir spaeter\nexport const C = () => <motion.div animate={{x:1}}/>;\n' > "$TMP/kommentar/src/card.tsx"
run "Bypass Reduced-Motion im Kommentar" 1 "$TMP/kommentar"

# --- 14. Bypass: erfundener Router-Anker -> rot ------------------------------
cp -r "$TMP/good" "$TMP/fakeanker"
printf '| Bedarf | Werkzeug | Befehl | Gate | Router-Anker |\n' > "$TMP/fakeanker/art-direction.md"
printf '| Irgendwas | lucide-react | `npm i lucide-react` | x | `#gibtsnicht` |\n' >> "$TMP/fakeanker/art-direction.md"
printf '| Motion | motion | `npm i motion` | x | `#auchnicht` |\n' >> "$TMP/fakeanker/art-direction.md"
run "Bypass erfundener Router-Anker" 1 "$TMP/fakeanker"

# --- 15. Bypass: optionalDependencies -> rot ---------------------------------
cp -r "$TMP/good" "$TMP/optdep"
echo '{"dependencies":{"react":"19","next":"15","lucide-react":"^0.4","motion":"^11"},"optionalDependencies":{"gsap":"^3"}}' > "$TMP/optdep/package.json"
run "Bypass optionalDependencies" 1 "$TMP/optdep"

# --- 16. Substring-Falle: @emotion/react darf NICHT durch "motion" gedeckt sein -> rot
cp -r "$TMP/good" "$TMP/emotion"
echo '{"dependencies":{"react":"19","next":"15","lucide-react":"^0.4","motion":"^11","@emotion/react":"^11"}}' > "$TMP/emotion/package.json"
run "Substring-Falle @emotion/react" 1 "$TMP/emotion"


# --- 17. Bypass: A11y-Gate per Bibliothekswahl abschalten (gsap) -> rot -------
cp -r "$TMP/good" "$TMP/gsap"
echo '{"dependencies":{"react":"19","next":"15","lucide-react":"^0.4","gsap":"^3"}}' > "$TMP/gsap/package.json"
rm -f "$TMP/gsap/src/faq.tsx"
printf 'import gsap from "gsap";\nexport const A = () => { gsap.to(".x",{y:100}); return null; };\n' > "$TMP/gsap/src/anim.tsx"
printf '| Motion | gsap | `npm i gsap` | reduced motion | `#motion` |\n' >> "$TMP/gsap/art-direction.md"
run "Bypass A11y-Gate via gsap" 1 "$TMP/gsap"

# --- 18. Bypass: react-spring/animejs ohne Reduced Motion -> rot --------------
cp -r "$TMP/good" "$TMP/spring"
echo '{"dependencies":{"react":"19","next":"15","lucide-react":"^0.4","@react-spring/web":"^9","animejs":"^3"}}' > "$TMP/spring/package.json"
rm -f "$TMP/spring/src/faq.tsx"
printf 'import { useSpring } from "@react-spring/web";\nimport anime from "animejs";\nexport const A = () => { anime({targets:".x",translateY:100}); return null; };\n' > "$TMP/spring/src/anim.tsx"
printf '| Motion | @react-spring/web | `npm i @react-spring/web` | x | `#motion` |\n' >> "$TMP/spring/art-direction.md"
printf '| Motion2 | animejs | `npm i animejs` | x | `#motion` |\n' >> "$TMP/spring/art-direction.md"
run "Bypass A11y-Gate via react-spring/animejs" 1 "$TMP/spring"

# --- 19. Bypass: ein guter Anker deckt Fremd-Pakete (Blob-Matching) -> rot ----
cp -r "$TMP/good" "$TMP/blob"
echo '{"dependencies":{"react":"19","next":"15","lucide-react":"^0.4","motion":"^11","gsap":"^3","three":"^0.16"}}' > "$TMP/blob/package.json"
printf '| Sonstiges | gsap three | siehe oben | x | (kein Anker) |\n' >> "$TMP/blob/art-direction.md"
run "Bypass Anker deckt Fremd-Pakete" 1 "$TMP/blob"

# --- 20. Regression: gsap MIT Reduced-Motion-Behandlung -> gruen -------------
cp -r "$TMP/good" "$TMP/gsapok"
echo '{"dependencies":{"react":"19","next":"15","lucide-react":"^0.4","gsap":"^3"}}' > "$TMP/gsapok/package.json"
rm -f "$TMP/gsapok/src/faq.tsx"
printf 'import { ChevronDown } from "lucide-react";\nimport gsap from "gsap";\nexport const A = () => {\n  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) gsap.to(".x",{y:100});\n  return <ChevronDown/>;\n};\n' > "$TMP/gsapok/src/anim.tsx"
printf '| Bedarf | Werkzeug | Befehl | Gate | Router-Anker |\n' > "$TMP/gsapok/art-direction.md"
printf '| Icons | Lucide | `npm i lucide-react` | ein Set | `#icons` |\n' >> "$TMP/gsapok/art-direction.md"
printf '| Motion | gsap | `npm i gsap` | prefers-reduced-motion | `#motion` |\n' >> "$TMP/gsapok/art-direction.md"
run "gsap MIT reduced-motion (muss gruen)" 0 "$TMP/gsapok"


# --- 21. Bypass: Paket nur in auskommentierter ("verworfener") Zeile -> rot --
cp -r "$TMP/good" "$TMP/htmlcomment"
echo '{"dependencies":{"react":"19","next":"15","lucide-react":"^0.4","motion":"^11","gsap":"^3"}}' > "$TMP/htmlcomment/package.json"
printf '<!--\n| verworfen | gsap | wollten wir doch nicht | x | `#motion` |\n-->\n' >> "$TMP/htmlcomment/art-direction.md"
run "Bypass Paket im HTML-Kommentar" 1 "$TMP/htmlcomment"


# --- 22. Bypass: verworfene Zeile im Markdown-Code-Fence -> rot --------------
cp -r "$TMP/good" "$TMP/fence"
echo '{"dependencies":{"react":"19","next":"15","lucide-react":"^0.4","motion":"^11","gsap":"^3"}}' > "$TMP/fence/package.json"
printf '\nVerworfene Variante zur Doku:\n\n```markdown\n| verworfen | gsap | wollten wir nicht | x | `#motion` |\n```\n' >> "$TMP/fence/art-direction.md"
run "Bypass Zeile im Code-Fence" 1 "$TMP/fence"

# --- 23. Bypass: zweite Tabelle unter "## Verworfen" -> rot ------------------
cp -r "$TMP/good" "$TMP/verworfen"
echo '{"dependencies":{"react":"19","next":"15","lucide-react":"^0.4","motion":"^11","gsap":"^3"}}' > "$TMP/verworfen/package.json"
printf '\n## Verworfen (bewusst NICHT gewaehlt)\n\n| Bedarf | Werkzeug | Grund | Gate | Router-Anker |\n| Motion | gsap | zu schwer | x | `#motion` |\n' >> "$TMP/verworfen/art-direction.md"
run "Bypass zweite Tabelle Verworfen" 1 "$TMP/verworfen"

# --- 24. Gegenprobe: Begruendung IN der Zelle bleibt gruen -------------------
mkdir -p "$TMP/begruendung/src"
echo '{"dependencies":{"react":"19","next":"15","lucide-react":"^0.4","motion":"^11"}}' > "$TMP/begruendung/package.json"
clean_component "$TMP/begruendung/src/faq.tsx"
printf '| Bedarf | Werkzeug | Befehl | Gate | Router-Anker |\n' > "$TMP/begruendung/art-direction.md"
printf '| Icons | Lucide | `npm i lucide-react` | ein Set | `#icons` |\n' >> "$TMP/begruendung/art-direction.md"
printf '| Motion | motion (statt gsap, weil kleiner) | `npm i motion` | useReducedMotion | `#motion` |\n' >> "$TMP/begruendung/art-direction.md"
run "Begruendung in der Zelle (muss gruen)" 0 "$TMP/begruendung"

echo
if [ "$fails" -eq 0 ]; then
  echo "Werkzeug-Gate-Fixtures: OK (24/24)"
  exit 0
fi
echo "Werkzeug-Gate-Fixtures: FAIL ($fails von 24)"
exit 1
