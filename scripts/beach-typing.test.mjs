import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {
  TYPING_CYCLE_MS,
  TYPING_PATCH,
  typingStateAt,
} from '../features/diorama/scenes/beach/typing.ts';

test('typing loops through quiet keypresses and returns to the starting pose', () => {
  assert.deepEqual(
    [0, 260, 400, 620, 740, 1260].map(t => typingStateAt(t).frame),
    [0, 1, 0, 1, 0, 0],
  );
  assert.equal(TYPING_CYCLE_MS, 1260);
});

test('resuming active time preserves the current keypress and its remaining duration', () => {
  assert.deepEqual(typingStateAt(300), { frame: 1, untilNextMs: 100 });
  assert.deepEqual(
    typingStateAt(300 + TYPING_CYCLE_MS * 50),
    typingStateAt(300),
  );
  for (let t = 0; t < TYPING_CYCLE_MS; t++)
    assert.ok(typingStateAt(t).untilNextMs > 0);
});

test('unavailable WebGL leaves the underlying painting as the fallback', async t => {
  const { createBeachWater } =
    await import('../features/diorama/scenes/beach/water-renderer.ts');
  let attempts = 0;
  const canvas = {
    width: 1,
    height: 1,
    style: {},
    addEventListener() {},
    removeEventListener() {},
    setAttribute() {},
    getContext() {
      attempts++;
      return null;
    },
  };
  t.mock.method(console, 'error', () => {});
  assert.equal(
    await createBeachWater(canvas, '/assets/world/beach-back.webp'),
    null,
  );
  assert.ok(
    attempts > 0,
    'Exercise the actual unavailable graphics context path.',
  );
  assert.equal(
    canvas.style.opacity,
    undefined,
    'The hidden canvas is never revealed.',
  );
});

test('built no-JavaScript beach keeps seated art and a usable GitHub sticker', () => {
  const html = fs.readFileSync('.next/server/app/index.html', 'utf8');
  const still = [...html.matchAll(/<noscript>([\s\S]*?)<\/noscript>/g)]
    .map(match => match[1])
    .find(markup => markup.includes('beach-still'));
  assert.ok(
    still,
    'Beach supplies its own static composition without JavaScript.',
  );
  assert.match(still, /beach-back\.webp/);
  assert.match(still, /beach-typing-focused\.webp/);
  assert.doesNotMatch(still, /beach-static|football/);
  assert.match(
    html,
    /<a[^>]*class="[^"]*beach-github[^>]*href="https:\/\/github\.com\/glenpadua"/,
  );
  assert.match(
    html,
    /<a[^>]*class="[^"]*beach-social-phone[^>]*href="https:\/\/twitter\.com\/glenp01"/,
  );
  assert.doesNotMatch(html, /city-bench-cleared-v1\.webp/);
});

test('the typing overlay stays inside solid hand and keyboard pixels', async () => {
  const { default: sharp } = await import('sharp');
  const { left, top, right, bottom } = TYPING_PATCH;
  for (const asset of ['beach-typing-focused', 'beach-typing-focused-tap']) {
    const pixels = await sharp(`public/assets/world/${asset}.webp`)
      .ensureAlpha()
      .extract({ left, top, width: right - left, height: bottom - top })
      .raw()
      .toBuffer();
    for (let i = 3; i < pixels.length; i += 4)
      assert.ok(
        pixels[i] >= 250,
        'The generated alpha must cover at least 98% of the original pose.',
      );
  }
});

test('the small served keyboard patch preserves the approved crop and opaque coverage', async () => {
  const { default: sharp } = await import('sharp');
  const { left, top, right, bottom } = TYPING_PATCH;
  const crop = { left, top, width: right - left, height: bottom - top };
  const source = await sharp(
    'public/assets/world/beach-typing-focused-tap.webp',
  )
    .extract(crop)
    .ensureAlpha()
    .raw()
    .toBuffer();
  const image = sharp('public/assets/world/beach-typing-tap-crop-v1.webp');
  const metadata = await image.metadata();
  assert.equal(metadata.width, crop.width);
  assert.equal(metadata.height, crop.height);
  const served = await image.ensureAlpha().raw().toBuffer();
  let squaredError = 0;
  for (let i = 0; i < served.length; i++) {
    if (i % 4 === 3)
      assert.equal(served[i], source[i], 'Alpha coverage stays exact');
    else squaredError += (served[i] - source[i]) ** 2;
  }
  assert.ok(
    Math.sqrt(squaredError / ((served.length / 4) * 3)) < 7,
    'Encoded RGB stays close to the approved pixels',
  );
  assert.ok(
    fs.statSync('public/assets/world/beach-typing-tap-crop-v1.webp').size <
      8000,
  );
});
