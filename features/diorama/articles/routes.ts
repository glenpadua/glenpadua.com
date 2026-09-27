/** Preview routing remains separate from the existing public blog. */
export function articleHref(uid: string): string {
  return `/preview/diorama/blog/${encodeURIComponent(uid)}`;
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
