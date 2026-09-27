// Run with Node 24+: node --test scripts/diorama-contracts.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createWorldRoutes } from '../features/diorama/lib/routes.ts';
import {
  sceneFrame,
  paperBatch,
  PEOPLE_HANDOFF,
  journeyPosition,
  chapterStop,
} from '../features/diorama/lib/travel.ts';

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
  for (const route of ['diorama', 'diorama/work', 'diorama/writing']) {
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
    writing: '/preview/diorama/writing',
    blog: '/preview/diorama/blog',
  });
  assert.deepEqual(createWorldRoutes('/'), {
    home: '/',
    work: '/work',
    writing: '/writing',
    blog: '/blog',
  });
  assert.deepEqual(createWorldRoutes(''), createWorldRoutes('/'));
});

test('chapter stops remain complete when scenes are added or removed', () => {
  for (const count of [1, 2, 4, 7]) {
    for (let stop = 0; stop < count; stop++) {
      const poses = Array.from({ length: count }, (_, i) =>
        sceneFrame(stop, i, count),
      );
      assert.equal(poses.filter(p => p.visible).length, 1);
      assert.deepEqual(
        { ...poses[stop] },
        { visible: true, role: 'rest', wipe: 1, subject: 1, copy: 1 },
      );
    }
  }
});

test('each passage uncovers one chapter over the next, in both directions', () => {
  const positions = Array.from({ length: 401 }, (_, i) => i / 200);
  for (const progress of [...positions, ...positions.toReversed()]) {
    const poses = [0, 1, 2].map(i => sceneFrame(progress, i, 3));
    const shown = poses.filter(p => p.visible);
    assert.ok(shown.length === 1 || shown.length === 2);
    if (shown.length === 2) {
      const [out, incoming] = shown;
      assert.equal(out.role, 'out');
      assert.equal(incoming.role, 'in');
      assert.equal(out.wipe, incoming.wipe);
      assert.ok(incoming.wipe > 0 && incoming.wipe < 1);
    }
    for (const pose of poses) {
      for (const value of [pose.wipe, pose.subject, pose.copy])
        assert.ok(value >= 0 && value <= 1);
    }
  }
});

test('transitions never show two Glens, including reverse travel', () => {
  const positions = Array.from({ length: 2001 }, (_, i) => i / 1000);
  for (const progress of [...positions, ...positions.toReversed()]) {
    const poses = [0, 1, 2].map(i => sceneFrame(progress, i, 3));
    const people = poses.filter(p => p.visible && p.subject > 0.001);
    assert.ok(people.length <= 1, `two people at ${progress}`);
    // Copy never overlaps either: one heading at a time.
    const copy = poses.filter(p => p.visible && p.copy > 0.001);
    assert.ok(copy.length <= 1, `two headings at ${progress}`);
  }
});

test('incoming people wait for the handoff; outgoing people stay until the edge', () => {
  for (let i = 0; i <= 100; i++) {
    const progress = 0.62 + (0.38 * i) / 100;
    const [out, incoming] = [0, 1].map(n => sceneFrame(progress, n, 2));
    if (incoming.role === 'in' && incoming.wipe < PEOPLE_HANDOFF)
      assert.equal(incoming.subject, 0);
    if (out.role !== 'out') continue;
    if (out.wipe <= 0.3) assert.equal(out.subject, 1);
    if (out.wipe >= 0.55) assert.equal(out.subject, 0);
  }
});

test('portrait people leave sooner but still before anyone arrives', () => {
  for (let i = 0; i <= 100; i++) {
    const progress = 0.62 + (0.38 * i) / 100;
    const [out, incoming] = [0, 1].map(n => sceneFrame(progress, n, 2, 0.42));
    if (out.role === 'out' && out.wipe >= 0.42) assert.equal(out.subject, 0);
    assert.ok(!(out.subject > 0 && incoming.subject > 0));
  }
});

test('every chapter rests at its stop and the day ends after the last', () => {
  for (const count of [1, 2, 3, 5]) {
    for (let i = 0; i < count; i++) {
      const at = journeyPosition(chapterStop(i, count), count);
      assert.ok(Math.abs(at.progress - i) < 1e-9);
      assert.equal(at.ending, 0);
    }
    const end = journeyPosition(1, count);
    assert.equal(end.progress, count - 1);
    assert.ok(Math.abs(end.ending - 1) < 1e-9);
    assert.deepEqual(journeyPosition(-0.2, count), { progress: 0, ending: 0 });
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
  const writing = fs.readFileSync(
    '.next/server/app/preview/diorama/writing.html',
    'utf8',
  );
  for (const html of [home, work, writing]) {
    for (const [img] of html.matchAll(/<img\b[^>]*>/gi)) {
      assert.match(img, /\ssrc="[^"]+"/, `empty image placeholder: ${img}`);
    }
    assert.match(html, /<meta name="robots" content="noindex, nofollow"/);
    assert.match(html, /<h1/);
    assert.match(html, /<noscript>/);
    assert.match(html, /href="\/preview\/diorama\/work"/);
    assert.match(html, /href="\/preview\/diorama\/writing"/);
  }
  assert.match(home, /Skipping leg day/);
  assert.match(home, /href="\/preview\/diorama\/blog\/lottery-of-birth"/);
  assert.match(home, /I’m Glen, a software engineer\./);
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
    assert.match(writing, new RegExp(`href="/preview/diorama/blog/${uid}"`));
});
