import { pathToFileURL } from 'node:url'

export function pagesBase(repository) {
  const match = /^([^/]+)\/([^/]+)$/.exec(repository ?? '')
  if (!match || !/^[\w.-]+$/.test(match[1]) || !/^[\w.-]+$/.test(match[2])) {
    throw new Error('Expected GITHUB_REPOSITORY in owner/repo format')
  }
  const [, owner, repo] = match
  return repo.toLowerCase() === `${owner.toLowerCase()}.github.io` ? '/' : `/${repo}/`
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  console.log(pagesBase(process.env.GITHUB_REPOSITORY))
}
