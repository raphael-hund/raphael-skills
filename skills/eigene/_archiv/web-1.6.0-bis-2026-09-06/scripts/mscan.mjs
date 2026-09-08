import { chromium } from "playwright"
const routes = [
  "http://127.0.0.1:3000/messie-wohnung-entruempelung-leipzig",
  "http://127.0.0.1:3000/ratgeber",
  "http://127.0.0.1:3000/entruempelung-keller-dachboden-garage",
]
const b = await chromium.launch()
const pg = await b.newPage({ viewport: { width: 1440, height: 730 } })
for (const url of routes) {
  await pg.goto(url, { waitUntil: "networkidle" })
  const data = await pg.evaluate(() => {
    const out = { sections: [], whiteRuns: [], maxWhiteRun: 0 }
    let prevBottom = 0, whiteStart = null, prevColor = null
    document.querySelectorAll("[data-section-id]").forEach((s) => {
      const r = s.getBoundingClientRect()
      const top = r.top + window.scrollY, bot = r.bottom + window.scrollY
      const bg = getComputedStyle(s).backgroundColor
      const id = s.getAttribute("data-section-id")
      const layer = s.getAttribute("data-layer")
      out.sections.push({ id, layer, top: Math.round(top), bot: Math.round(bot), bg })
    })
    // scan white runs at 10px steps, sample center pixel via elementsFromPoint bg
    const h = document.documentElement.scrollHeight
    let runStart = 0, inWhite = false
    for (let y = 0; y < h; y += 10) {
      const el = document.elementFromPoint(720, Math.min(y - window.scrollY, 700)) // not reliable; use bg walk
    }
    // simpler: white runs = consecutive L0 sections heights
    let run = 0, maxRun = 0, runs = []
    for (const s of out.sections) {
      const white = s.bg === "rgb(255, 255, 255)"
      const hgt = s.bot - s.top
      if (white) { run += hgt } else { if (run > 0) runs.push(run); maxRun = Math.max(maxRun, run); run = 0 }
    }
    if (run > 0) { runs.push(run); maxRun = Math.max(maxRun, run) }
    out.whiteRuns = runs
    out.maxWhiteRun = maxRun
    return out
  })
  console.log("=== " + url)
  for (const s of data.sections) console.log(`  ${s.id} ${s.layer} ${s.top}-${s.bot} ${s.bg}`)
  console.log("  maxWhiteRun:", data.maxWhiteRun, "runs:", data.whiteRuns.join(","))
}
await b.close()
