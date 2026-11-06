import assert from 'node:assert/strict'
import { readFile, readdir, access, mkdir, writeFile } from 'node:fs/promises'

const entry = await readFile('slides.md', 'utf8')
const files = (await readdir('chapters')).filter(f => f.endsWith('.md')).sort()
assert.equal(files.length, 12, 'Exactly 12 chapters')
const imports = [...entry.matchAll(/^src: \.\/chapters\/(.+)$/gm)].map(m => m[1])
assert.deepEqual(imports, files, 'Chapter import order must match 01–12')
const aliases = new Set(['toc'])
const report = []
let first = 3
for (const [i, file] of files.entries()) {
  const source = await readFile(`chapters/${file}`, 'utf8')
  const number = String(i + 1).padStart(2, '0')
  assert(file.startsWith(number + '-'))
  const slideCount = [...source.matchAll(/^# .+$/gm)].length
  assert(slideCount >= 6 && slideCount <= 8, `${file}: expected 6–8 substantive slides`)
  assert(source.startsWith(`---\nrouteAlias: ch${number}\n---`), `${file}: stable landing alias`)
  assert(source.includes(`<ChapterHeader number="${number}"`), `${file}: header and Contents link`)
  assert(source.includes('선수 지식:') && source.includes('objectives'), `${file}: prerequisite and measurable objectives`)
  assert(source.includes('검산:') && /^# .*\bCheck\b/m.test(source), `${file}: recap and solution`)
  assert(!/TODO|placeholder|lorem ipsum/i.test(source), `${file}: unfinished content`)
  assert(source.includes('<!-- Source'), `${file}: compact source attribution`)
  for (const [, alias] of source.matchAll(/^routeAlias: (\S+)$/gm)) {
    assert(!aliases.has(alias), `Duplicate alias ${alias}`)
    aliases.add(alias)
  }
  for (const [, asset] of source.matchAll(/<LocalDiagram src="([^"]+)"/g)) await access(`public/${asset}`)
  const labs = [...source.matchAll(/^routeAlias: (lab-\S+)$/gm)].map(m => m[1])
  report.push({ file, alias: `ch${number}`, first, count: slideCount, labs })
  first += slideCount
}
for (const [, alias] of entry.matchAll(/<Link to="([^"]+)"/g)) assert(aliases.has(alias), `Broken TOC link ${alias}`)
for (const [, asset] of entry.matchAll(/<LocalDiagram src="([^"]+)"/g)) await access(`public/${asset}`)
assert.equal([...entry.matchAll(/class="toc-card"/g)].length, 12)
await mkdir('output', { recursive: true })
await writeFile('output/content-report.json', JSON.stringify({ total: first - 1, chapters: report, aliases: [...aliases] }, null, 2))
for (const row of report) console.log(`${row.alias} · ${row.count} slides · starts ${row.first} · ${row.file}`)
console.log(`PASS: 12 chapters, ${first - 3} teaching slides, ${first - 1} total, ${aliases.size} unique aliases, all TOC and local diagram references valid.`)
