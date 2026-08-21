/**
 * Every HOME_ANCHORS entry must point at a section that exists.
 *
 * These two lists drifted before: the footer advertised five documentation
 * links that all resolved to `#docs`, which is the id on the footer itself, so
 * each one scrolled to itself. A missing anchor is silent in the browser — the
 * click just does nothing — so it is worth failing the build over.
 *
 *     node scripts/check-anchors.mjs
 */
import { readFileSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const src = join(root, 'src')

const routes = readFileSync(join(src, 'data', 'routes.ts'), 'utf8')
const anchors = [...routes.matchAll(/^\s*(\w+): '\/#([\w-]+)',/gm)].map(([, key, id]) => ({
  key,
  id,
}))

if (anchors.length === 0) {
  console.error('check-anchors: found no HOME_ANCHORS entries — has the shape changed?')
  process.exit(1)
}

const ids = new Set()
for (const dir of ['components', 'pages']) {
  for (const file of readdirSync(join(src, dir))) {
    if (!file.endsWith('.tsx')) continue
    const source = readFileSync(join(src, dir, file), 'utf8')
    for (const [, id] of source.matchAll(/\sid="([\w-]+)"/g)) ids.add(id)
  }
}

const missing = anchors.filter((anchor) => !ids.has(anchor.id))
if (missing.length > 0) {
  for (const { key, id } of missing) {
    console.error(`check-anchors: HOME_ANCHORS.${key} points at #${id}, which no section has`)
  }
  process.exit(1)
}

console.log(`check-anchors: ${anchors.length} anchors, all resolved`)
