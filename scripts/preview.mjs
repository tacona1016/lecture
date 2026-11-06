import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { resolve, extname, sep } from 'node:path'
import { parseArgs } from 'node:util'

const { values } = parseArgs({ options: {
  base: { type: 'string', default: '/' },
  port: { type: 'string', default: '4173' },
} })
if (!/^\/(?:[\w.-]+\/)*$/.test(values.base)) throw new Error('Base must start and end with /')
const root = resolve('dist')
try { await stat(resolve(root, 'index.html')) }
catch { throw new Error('dist/index.html is missing. Run npm run build first.') }
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff': 'font/woff', '.woff2': 'font/woff2', '.json': 'application/json', '.ico': 'image/x-icon' }
createServer(async (req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405).end(); return }
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname)
    if (!pathname.startsWith(values.base)) { res.writeHead(404).end('Outside base path'); return }
    const relative = pathname.slice(values.base.length)
    let target = resolve(root, relative || 'index.html')
    if (!target.startsWith(root + sep) && target !== root) { res.writeHead(403).end(); return }
    try { if (!(await stat(target)).isFile()) throw new Error('not a file') }
    catch {
      if (extname(relative)) { res.writeHead(404).end('Missing asset'); return }
      target = resolve(root, 'index.html')
    }
    const body = await readFile(target)
    res.writeHead(200, { 'Content-Type': types[extname(target)] || 'application/octet-stream', 'Cache-Control': 'no-store' })
    res.end(req.method === 'HEAD' ? undefined : body)
  } catch { res.writeHead(400).end('Bad request') }
}).listen(Number(values.port), '127.0.0.1', () => console.log(`Preview: http://127.0.0.1:${values.port}${values.base}`))
