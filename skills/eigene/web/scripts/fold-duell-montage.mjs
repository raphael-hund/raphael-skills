#!/usr/bin/env node
// Fold-Duell-Montage: drei Fold-Shots nebeneinander als ein PNG (Desktop und Mobil).
// Aufruf: node fold-duell-montage.mjs --shots <dir mit <slug>/<route>-desktop-00-fold.png> --out <dir>
import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'

const args = process.argv.slice(2)
if (args.includes('--help') || args.includes('-h')) {
  console.log('usage: fold-duell-montage.mjs --shots <dir> --out <dir>')
  process.exit(0)
}
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d }
const shots = opt('--shots'); const out = opt('--out')
if (!shots || !out) { console.error('usage: fold-duell-montage.mjs --shots <dir> --out <dir>'); process.exit(64) }

const require = createRequire(import.meta.url)
let sharp = null
for (const cand of ['sharp', '/usr/lib/node_modules/sharp', path.join(process.env.HOME || '/root', 'node_modules', 'sharp')]) {
  try { sharp = require(cand); break } catch { /* naechster Kandidat */ }
}
if (!sharp) { console.error('sharp nicht gefunden (npm i -g sharp)'); process.exit(2) }

const fehlend = []
const slugs = fs.readdirSync(shots).filter(s => fs.statSync(path.join(shots, s)).isDirectory()).sort()
if (slugs.length === 0) { console.error(`keine Richtungen unter ${shots}`); process.exit(2) }
fs.mkdirSync(out, { recursive: true })

async function montage(kind, width) {
  const tiles = []
  for (const slug of slugs) {
    const dir = path.join(shots, slug)
    const f = fs.readdirSync(dir).find(n => n.includes(`-${kind}-00-fold`) && n.endsWith('.png'))
    if (!f) { console.error(`${slug}: kein ${kind}-Fold unter ${dir}`); fehlend.push(`${slug}/${kind}`); continue }
    const esc = String(slug).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])
    const label = Buffer.from(`<svg width="${width}" height="56"><rect width="100%" height="100%" fill="#111"/><text x="20" y="38" font-family="sans-serif" font-size="28" font-weight="700" fill="#fff">${esc}</text></svg>`)
    const img = await sharp(path.join(dir, f)).resize({ width }).toBuffer()
    const meta = await sharp(img).metadata()
    const tile = await sharp({ create: { width, height: meta.height + 56, channels: 3, background: '#111' } })
      .composite([{ input: label, top: 0, left: 0 }, { input: img, top: 56, left: 0 }]).png().toBuffer()
    tiles.push({ buf: tile, h: meta.height + 56 })
  }
  if (tiles.length === 0) return null
  const gap = 24
  const H = Math.max(...tiles.map(t => t.h)); const W = tiles.length * width + (tiles.length - 1) * gap
  const comp = tiles.map((t, i) => ({ input: t.buf, left: i * (width + gap), top: 0 }))
  const file = path.join(out, `${kind}.png`)
  await sharp({ create: { width: W, height: H, channels: 3, background: '#000' } }).composite(comp).png().toFile(file)
  return file
}

let d = null, m = null
try {
  d = await montage('desktop', 1440)
  m = await montage('mobile', 390)
} catch (e) {
  console.error(`Montage fehlgeschlagen: ${e && e.message ? e.message : e}`)
  process.exit(2)
}
console.log(JSON.stringify({ richtungen: slugs, desktop: d, mobile: m, fehlend }))
// Vertrag (fold-duell.md Regel 7): jede Richtung braucht Desktop UND Mobil. Sonst Exit 2, auch wenn Bilder entstanden.
process.exit(d && m && fehlend.length === 0 ? 0 : 2)
