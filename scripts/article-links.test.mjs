import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import sharp from 'sharp';
import { resolveArticleLink } from '../features/diorama/lib/routes.ts';
import { getArticleCover } from '../features/diorama/articles/covers.ts';
import { deskArticles } from '../features/diorama/rooms/writing/content.ts';

test('known legacy and public article links stay in the preview, preserving fragments and queries', () => {
  const uids = ['lottery-of-birth'];
  for (const href of [
    'https://glenpadua.com/story/lottery-of-birth/?from=series#childhood',
    '/blog/lottery-of-birth?from=series#childhood',
  ]) {
    assert.equal(
      resolveArticleLink(href, uids),
      '/preview/diorama/blog/lottery-of-birth?from=series#childhood',
    );
  }
});

test('unrelated, unknown and non-web destinations are not rewritten', () => {
  for (const href of [
    'https://example.com/blog/lottery-of-birth',
    '/story/unpublished/',
    'mailto:glen@example.com',
    '#time',
    'https://glenpadua.com/work',
  ]) {
    assert.equal(resolveArticleLink(href, ['lottery-of-birth']), href);
  }
});

test('each published story has a distinct, loadable cover with accurate dimensions and a matching thumbnail', async () => {
  const sources = new Set();
  for (const article of deskArticles) {
    const cover = getArticleCover(article.uid);
    sources.add(cover.src);
    const full = await sharp(`public${cover.src}`).metadata();
    const thumbnail = await sharp(`public${cover.thumbnailSrc}`).metadata();
    assert.equal(full.width, cover.width, article.uid);
    assert.equal(full.height, cover.height, article.uid);
    assert.equal(thumbnail.width, 600, article.uid);
    assert.equal(thumbnail.width / thumbnail.height, full.width / full.height);
    assert.ok(cover.alt.length > 0, article.uid);
  }
  assert.equal(sources.size, deskArticles.length);
  assert.equal(
    getArticleCover('future-post').src,
    '/assets/world/writing.webp',
  );
  assert.equal(
    getArticleCover('constructor').src,
    '/assets/world/writing.webp',
  );
});

test('built Writing links resolve to rendered articles and its featured covers share the reader registry', () => {
  const writing = fs.readFileSync(
    '.next/server/app/preview/diorama/writing.html',
    'utf8',
  );
  for (const article of deskArticles) {
    const cover = getArticleCover(article.uid);
    assert.ok(
      writing.includes(`href="/preview/diorama/blog/${article.uid}"`),
      article.uid,
    );
    assert.ok(!writing.includes(`href="/blog/${article.uid}"`), article.uid);
    const reader = fs.readFileSync(
      `.next/server/app/preview/diorama/blog/${article.uid}.html`,
      'utf8',
    );
    assert.ok(reader.includes(`src="${cover.src}"`), article.uid);
    assert.match(reader, /href="\/preview\/diorama\/writing"/);
    assert.match(reader, /<meta name="robots" content="noindex, nofollow"/);
  }
  for (const article of deskArticles.slice(0, 4)) {
    assert.ok(
      writing.includes(`src="${getArticleCover(article.uid).thumbnailSrc}"`),
      article.uid,
    );
  }
});
