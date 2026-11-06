import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'
import { resolve, sep } from 'node:path'

const base = process.argv[2] ?? '/'
assert(/^\/(?:[\w.-]+\/)*$/.test(base), 'Base must start and end with /')
const root = resolve('dist')
const html = await readFile(resolve(root, 'index.html'), 'utf8')
const references = [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map(m => m[1])
assert(references.length > 0, 'Expected generated script/style/image references')
for (const url of references) {
  assert(!/^(?:https?:)?\/\//.test(url), `Unexpected external runtime asset: ${url}`)
  if (url.startsWith('data:') || url.startsWith('#')) continue
  assert(url.startsWith(base), `Asset outside Pages base ${base}: ${url}`)
  const path = resolve(root, decodeURIComponent(url.slice(base.length).split(/[?#]/)[0]))
  assert(path.startsWith(root + sep), `Asset escaped dist: ${url}`)
  await access(path).catch(() => assert.fail(`Missing generated asset: ${url}`))
}
await access(resolve(root, '404.html'))
console.log(`PASS: index.html, SPA fallback and ${references.length} script/style/image references exist under ${base}`)
