// Only repository-owned, distributable SVGs are embedded. No user-provided HTML.
// Inline SVG shares the bundled font with the slide and keeps all original geometry.
const sources = import.meta.glob('../public/images/*.svg', { query: '?raw', import: 'default', eager: true })

export function diagramArtwork(src, instanceId, inner = false) {
  const source = sources[`../public/${src}`]
  if (!source) throw new Error(`Unknown local diagram: ${src}`)
  const prefix = `diagram-${instanceId.replace(/[^\w-]/g, '')}-`
  let markup = source
    .replace(/\bid="([^"]+)"/g, (_, id) => `id="${prefix}${id}"`)
    .replace(/url\(#([^)]+)\)/g, (_, id) => `url(#${prefix}${id})`)
    .replace(/\bhref="#([^"]+)"/g, (_, id) => `href="#${prefix}${id}"`)
    .replace(/\saria-labelledby="[^"]*"/g, '')
    .replace(/<style>([\s\S]*?)<\/style>/g, (_, css) => `<style>${css.replace(/([^{}]+)\{/g, (__, selectors) => selectors.split(',').map(s => `#${prefix}root ${s.trim()}`).join(',') + '{')}</style>`)
  if (inner) return `<g id="${prefix}root">${markup.replace(/<svg\b[^>]*>/, '').replace(/<\/svg>\s*$/, '')}</g>`
  return markup.replace(/<svg\b/, `<svg id="${prefix}root" aria-hidden="true" focusable="false"`)
}
