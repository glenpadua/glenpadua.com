// Run with Node 24+: node --test scripts/diorama-contracts.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createWorldRoutes } from '../features/diorama/lib/routes.ts';
import { sceneFrame, paperBatch } from '../features/diorama/lib/travel.ts';

// Presence alone is insufficient: streamed Suspense content can be parked under
// a hidden parent and require JavaScript to become visible.
function ancestorsBeforeMain(html) {
  const prefix = html
    .slice(0, html.indexOf('<main id="world-main"'))
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '');
  const stack = [];
  const voidTags = new Set([
    'area',
    'base',
    'br',
    'col',
    'embed',
    'hr',
    'img',
    'input',
    'link',
    'meta',
    'param',
    'source',
    'track',
    'wbr',
  ]);
  for (const match of prefix.matchAll(/<(\/?)([a-z][\w-]*)\b[^>]*>/gi)) {
    const tag = match[2].toLowerCase();
    if (match[1]) {
      const index = stack.findLastIndex(element => element.tag === tag);
      if (index >= 0) stack.splice(index);
    } else if (!voidTags.has(tag)) {
      stack.push({ tag, markup: match[0] });
    }
  }
  return stack;
}

test('static preview content is not hidden behind a JavaScript-only loading reveal', () => {
  for (const route of ['diorama', 'diorama/work', 'diorama/stories']) {
    const html = fs.readFileSync(
      `.next/server/app/preview/${route}.html`,
      'utf8',
    );
    assert.match(html, /<main id="world-main"/);
    for (const ancestor of ancestorsBeforeMain(html)) {
      assert.doesNotMatch(
        ancestor.markup,
        /\shidden(?:\s|=|>)/i,
        `${route}: hidden ancestor ${ancestor.markup}`,
      );
    }
  }
});

test('the same experience can mount at preview or public URLs', () => {
  assert.deepEqual(createWorldRoutes('/preview/diorama/'), {
    home: '/preview/diorama',
    work: '/preview/diorama/work',
    stories: '/preview/diorama/stories',
  });
  assert.deepEqual(createWorldRoutes('/'), {
    home: '/',
    work: '/work',
    stories: '/stories',
  });
  assert.deepEqual(createWorldRoutes(''), createWorldRoutes('/'));
});

test('chapter stops remain complete when scenes are added or removed', () => {
  for (const count of [1, 2, 4, 7]) {
    for (let stop = 0; stop < count; stop++) {
      const poses = Array.from({ length: count }, (_, i) =>
        sceneFrame(stop, i, count),
      );
      assert.equal(poses.filter(p => p.opacity === 1).length, 1);
      assert.equal(poses[stop].subject, 1);
      assert.equal(poses[stop].travel, 0);
    }
  }
});

test('each native scene stop has one complete character and background', () => {
  for (let stop = 0; stop < 3; stop++) {
    for (let scene = 0; scene < 3; scene++) {
      const pose = sceneFrame(stop, scene, 3);
      assert.equal(pose.opacity, scene === stop ? 1 : 0);
      if (scene === stop) {
        assert.equal(pose.subject, 1);
        assert.equal(pose.travel, 0);
      }
    }
  }
});

test('transitions never double-expose people, including reverse travel', () => {
  const positions = Array.from({ length: 401 }, (_, i) => i / 200);
  for (const progress of [...positions, ...positions.toReversed()]) {
    const poses = [0, 1, 2].map(i => sceneFrame(progress, i, 3));
    assert.ok(poses.filter(p => p.opacity * p.subject > 0.001).length <= 1);
    for (const pose of poses) {
      assert.ok(Number.isFinite(pose.travel));
      assert.ok(pose.opacity >= 0 && pose.opacity <= 1);
      assert.ok(pose.subject >= 0 && pose.subject <= 1);
    }
    assert.ok(
      Math.abs(poses.reduce((sum, p) => sum + p.opacity, 0) - 1) < 0.00001,
    );
  }
});

test('paper batches cover any archive size exactly once before wrapping', () => {
  for (const count of [0, 1, 4, 5, 8, 9, 101]) {
    const articles = Array.from({ length: count }, (_, i) => i);
    const pages = Math.max(1, Math.ceil(count / 4));
    const displayed = Array.from({ length: pages }, (_, i) =>
      paperBatch(articles, i, 4),
    ).flat();
    assert.deepEqual(displayed, articles);
    assert.deepEqual(
      paperBatch(articles, pages, 4),
      paperBatch(articles, 0, 4),
    );
    assert.deepEqual(
      paperBatch(articles, -1, 4),
      paperBatch(articles, pages - 1, 4),
    );
  }
});

test('built preview HTML has semantic copy, real destinations, noindex and static fallbacks', () => {
  const home = fs.readFileSync('.next/server/app/preview/diorama.html', 'utf8');
  const work = fs.readFileSync(
    '.next/server/app/preview/diorama/work.html',
    'utf8',
  );
  const stories = fs.readFileSync(
    '.next/server/app/preview/diorama/stories.html',
    'utf8',
  );
  for (const html of [home, work, stories]) {
    for (const [img] of html.matchAll(/<img\b[^>]*>/gi)) {
      assert.match(img, /\ssrc="[^"]+"/, `empty image placeholder: ${img}`);
    }
    assert.match(html, /<meta name="robots" content="noindex, nofollow"/);
    assert.match(html, /<h1/);
    assert.match(html, /<noscript>/);
    assert.match(html, /href="\/preview\/diorama\/work"/);
    assert.match(html, /href="\/preview\/diorama\/stories"/);
  }
  assert.match(home, /Skipping leg day/);
  assert.match(home, /instagram.com\/glen.padua/);
  assert.match(work, /Senior engineer/);
  assert.match(work, /Exploration/);
  for (const uid of [
    'lottery-of-birth',
    'bone-to-be-wild',
    'the-russian-connection',
    'do-you-have-an-ideal-dream-job',
    'lord-of-the-rings',
    'bones-that-got-away',
    'back-to-school',
    'free-space-npkill',
  ])
    assert.match(stories, new RegExp(`href="/preview/diorama/blog/${uid}"`));
});
