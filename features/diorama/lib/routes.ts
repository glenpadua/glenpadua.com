/** One mount for scene navigation and article links; public article slugs stay stable. */
export function createWorldRoutes(base: string) {
  const prefix = base.replace(/\/+$/, '');
  return {
    home: prefix || '/',
    work: `${prefix}/work`,
    writing: `${prefix}/writing`,
    blog: `${prefix}/blog`,
  };
}
/** The site is mounted at the root: /, /work, /writing and /blog/<uid>. */
export const worldRoutes = createWorldRoutes('');

/** Article links follow the same mount as the rest of the experience. */
export function articleHref(uid: string): string {
  return `${worldRoutes.blog}/${encodeURIComponent(uid)}`;
}

// Only rewrite a known published article. Preserve unknown URLs and fragments.
export function resolveArticleLink(
  href: string,
  knownUids: readonly string[],
): string {
  let url: URL;
  try {
    url = new URL(href, 'https://glenpadua.com');
  } catch {
    return href;
  }
  if (!['glenpadua.com', 'www.glenpadua.com'].includes(url.hostname))
    return href;
  if (!['https:', 'http:'].includes(url.protocol)) return href;
  const match = url.pathname.match(/^\/(?:story|blog)\/([^/]+)\/?$/);
  if (!match || !knownUids.includes(match[1])) return href;
  return `${articleHref(match[1])}${url.search}${url.hash}`;
}
