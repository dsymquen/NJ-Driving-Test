/**
 * Renders the MUTCD signs this app uses into public/signs/<code>.svg.
 *
 * The artwork comes from mutcd-ts, which draws the FHWA 2024 Standard Highway
 * Signs geometry and lettering. Prerendering keeps the library out of the
 * browser bundle: the app just points <img> at these files.
 *
 * Run with `npm run signs` after changing the list below.
 */
import { mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { listSigns, renderSVG } from 'mutcd-ts'

const OUT = join(process.cwd(), 'public', 'signs')

/**
 * Signs that take content. Defaults are NJ-flavored: 25 mph is the New Jersey
 * limit for school zones and business/residential districts, and the routes and
 * destinations are real New Jersey ones.
 */
const PROPS = {
  'R2-1': { speed: 25 },
  'S1-1': { fluorescent: true },
  'S5-1': { speed: 25, fluorescent: true },
  'W11-1': { fluorescent: true },
  'W11-2': { fluorescent: true },
  'W13-1P': { speed: 25 },
  // Curves and turns point right, the way the questions describe them.
  'W1-1': { direction: 'right' },
  'W1-2': { direction: 'right' },
  'W1-3': { direction: 'right' },
  'W1-4': { direction: 'right' },
  'W1-5': { direction: 'right' },
  'W1-6': { direction: 'right' },
  'W1-8': { direction: 'right' },
  'R6-1': { direction: 'right' },
  'R6-2': { direction: 'right' },
  'D1-1': { lines: [{ name: 'Trenton', arrow: 'left', miles: 3 }] },
  'D1-2': {
    lines: [
      { name: 'Trenton', arrow: 'left' },
      { name: 'Camden', arrow: 'up' },
    ],
  },
  'D1-3': {
    lines: [
      { name: 'Newark', arrow: 'left' },
      { name: 'Trenton', arrow: 'up' },
      { name: 'Camden', arrow: 'right' },
    ],
  },
  'D3-1': { name: 'Ocean', suffix: 'Ave', prefix: '' },
  'E5-1': { exit: '14' },
  'M1-1': { route: '80' },
  'M1-4': { route: '9' },
  'M1-5': { route: '35' },
}

/** Width and height in inches make the file huge on screen; CSS sizes it instead. */
function stripFixedSize(svg, code, name) {
  return svg
    .replace(/\s+width="[^"]*"\s+height="[^"]*"/, '')
    .replace('<svg ', `<svg role="img" aria-label="${name} (${code})" `)
}

mkdirSync(OUT, { recursive: true })
for (const file of readdirSync(OUT, { withFileTypes: true })) {
  if (file.isFile() && file.name.endsWith('.svg')) rmSync(join(OUT, file.name))
}

const manifest = []
for (const sign of listSigns()) {
  const svg = renderSVG(sign.code, PROPS[sign.code])
  writeFileSync(join(OUT, `${sign.code}.svg`), stripFixedSize(svg, sign.code, sign.name))
  manifest.push({ code: sign.code, name: sign.name, category: sign.category })
}

console.log(`Wrote ${manifest.length} signs to public/signs/`)
