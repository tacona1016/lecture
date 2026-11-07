import assert from 'node:assert/strict'
import { readFile, readdir, access, mkdir, writeFile } from 'node:fs/promises'
import { parseSync } from '@slidev/parser'

const entry = await readFile('slides.md', 'utf8')
const files = (await readdir('chapters')).filter(f => f.endsWith('.md')).sort()
assert.equal(files.length, 12, 'Exactly 12 chapters')
const imports = [...entry.matchAll(/^src: \.\/chapters\/(.+)$/gm)].map(m => m[1])
assert.deepEqual(imports, files, 'Chapter import order must match 01–12')
const aliases = new Set(['toc'])
const report = []
// Setup operation/equation are separated; SRAM hold/read/write each have a slide.
const expectedCounts = [7, 8, 7, 7, 8, 7, 7, 7, 9, 7, 7, 10]
let first = 3
for (const [i, file] of files.entries()) {
  const source = await readFile(`chapters/${file}`, 'utf8')
  const number = String(i + 1).padStart(2, '0')
  assert(file.startsWith(number + '-'))
  const slideCount = [...source.matchAll(/^# .+$/gm)].length
  const parsed = parseSync(source, `chapters/${file}`).slides
  assert.equal(parsed.length, slideCount, `${file}: parsed slides must match substantive headings; check frontmatter whitespace`)
  for (const slide of parsed) assert(/^# .+$/m.test(slide.content), `${file}: every parsed slide needs a learning heading`)
  assert.equal(slideCount, expectedCounts[i], `${file}: expected substantive slide count`)
  assert(source.startsWith(`---\nrouteAlias: ch${number}\nclass: chapter-opening\n---`), `${file}: stable landing alias and chapter layout`)
  assert(source.includes(`<ChapterHeader number="${number}"`), `${file}: header and Contents link`)
  assert(source.includes('선수 지식:') && source.includes('objectives'), `${file}: prerequisite and measurable objectives`)
  assert(source.includes('검산:') && /^# .*\bCheck\b/m.test(source), `${file}: recap and solution`)
  assert(source.includes(`routeAlias: quiz-ch${number}\nclicks: 2`), `${file}: two-step quiz alias`)
  assert.equal((source.match(/<QuizReveal :step="\$clicks">/g) || []).length, 1, `${file}: exactly one shared quiz`)
  assert(source.includes('<template #answer>') && source.includes('<template #explanation>'), `${file}: separate answer and reasoning`)
  assert(!/TODO|placeholder|lorem ipsum/i.test(source), `${file}: unfinished content`)
  assert(source.includes('<!-- Source'), `${file}: compact source attribution`)
  for (const [, alias] of source.matchAll(/^routeAlias: (\S+)$/gm)) {
    assert(parsed.some(s => s.frontmatter.routeAlias === alias), `${file}: alias ${alias} must be parsed as frontmatter`)
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
