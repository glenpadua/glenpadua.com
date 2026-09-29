import test from 'node:test';
import assert from 'node:assert/strict';
import sharp from 'sharp';
import fs from 'node:fs/promises';
import {
  advanceCityClock,
  cityMoments,
  cityPose,
  initialCityClock,
  requestCitySip,
} from '../features/diorama/scenes/city/couple-motion.ts';
import {
  CITY_ATLAS,
  CITY_COUPLE_REGION,
} from '../features/diorama/scenes/city/couple-geometry.ts';

const duration = moment =>
  cityMoments[moment].reduce((sum, beat) => sum + beat.duration, 0);
test('arrival rests, catches her eye, then alternates speaking with listening', () => {
  const noRandom = () => {
    throw new Error('Arrival must be deterministic');
  };
  let clock = advanceCityClock(initialCityClock(), 2599, noRandom);
  assert.equal(cityPose(clock).frame, 0);
  clock = advanceCityClock(clock, 1, noRandom);
  const poses = [];
  while (clock.beat < cityMoments.conversation.length - 1) {
    poses.push(cityPose(clock).frame);
    clock = advanceCityClock(clock, clock.remaining, noRandom);
  }
  poses.push(cityPose(clock).frame);
  assert.deepEqual(poses, [1, 2, 3, 2, 3, 2, 4, 2, 4, 2, 1]);
});

test('random moments never repeat immediately and always have a quiet interval', () => {
  let clock = initialCityClock();
  const observed = new Set();
  let seed = 87;
  const random = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 2 ** 32;
  };
  for (let i = 0; i < 100; i++) {
    const before = clock.moment;
    observed.add(before);
    clock = advanceCityClock(clock, clock.remaining + duration(before), random);
    assert.equal(cityPose(clock).frame, 0);
    assert.notEqual(clock.moment, before);
    assert.ok(clock.remaining >= 5000 && clock.remaining <= 10000);
  }
  assert.equal(observed.size, 4);
});

test('both sip gestures raise, drink, lower and return to rest with no simultaneous sip', () => {
  for (const [moment, expected] of [
    ['glen-sip', [6, 7, 6]],
    ['companion-sip', [8, 9, 8]],
  ]) {
    let clock = {
      ...initialCityClock(),
      moment,
      beat: 0,
      remaining: cityMoments[moment][0].duration,
    };
    const seen = [];
    while (clock.beat >= 0) {
      seen.push(cityPose(clock).frame);
      clock = advanceCityClock(clock, clock.remaining, () => 0.5);
    }
    assert.deepEqual(seen, expected);
    assert.equal(cityPose(clock).frame, 0);
  }
});

test('coffee clicks start at rest, queue safely during an exchange and alternate people', () => {
  let clock = requestCitySip(initialCityClock());
  assert.equal(cityPose(clock).phase, 'glen-sip');
  const drinking = advanceCityClock(clock, 320, () => 0.5);
  clock = requestCitySip(requestCitySip(drinking));
  assert.deepEqual(cityPose(clock), cityPose(drinking));
  clock = advanceCityClock(clock, 1420, () => 0.5);
  assert.equal(cityPose(clock).phase, 'idle');
  assert.equal(clock.remaining, 350);
  clock = advanceCityClock(clock, 350, () => 0.5);
  assert.equal(cityPose(clock).phase, 'companion-sip');
  assert.equal(clock.queuedSip, false);
});

test('paused active time preserves a half-raised cup and its remaining duration', () => {
  const clock = advanceCityClock(
    requestCitySip(initialCityClock()),
    170,
    () => 0.5,
  );
  assert.equal(clock.remaining, 150);
  assert.deepEqual(
    advanceCityClock(clock, 0, () => {
      throw new Error('No random work while paused');
    }),
    clock,
  );
  const resumed = advanceCityClock(clock, 150, () => 0.5);
  assert.equal(cityPose(resumed).frame, 7);
  assert.equal(resumed.remaining, 1100);
});

test('every served pose is a connected transparent cutout without stray marks', async () => {
  const metadata = await sharp(
    'public/assets/world/city-couple-motion-v1.webp',
  ).metadata();
  const { width, height } = CITY_COUPLE_REGION;
  assert.equal(metadata.width, width * CITY_ATLAS.columns);
  assert.equal(metadata.height, height * CITY_ATLAS.rows);
  for (let frame = 0; frame < 10; frame++) {
    const pixels = await sharp('public/assets/world/city-couple-motion-v1.webp')
      .extract({
        left: (frame % 5) * width,
        top: Math.floor(frame / 5) * height,
        width,
        height,
      })
      .ensureAlpha()
      .raw()
      .toBuffer();
    const visited = new Uint8Array(width * height),
      queue = new Int32Array(width * height);
    let components = 0;
    for (let n = 0; n < visited.length; n++) {
      if (visited[n] || pixels[n * 4 + 3] < 16) continue;
      components++;
      let read = 0,
        end = 1;
      queue[0] = n;
      visited[n] = 1;
      while (read < end) {
        const p = queue[read++],
          x = p % width,
          y = Math.floor(p / width);
        for (const q of [
          x > 0 ? p - 1 : -1,
          x < width - 1 ? p + 1 : -1,
          y > 0 ? p - width : -1,
          y < height - 1 ? p + width : -1,
        ])
          if (q >= 0 && !visited[q] && pixels[q * 4 + 3] >= 16) {
            visited[q] = 1;
            queue[end++] = q;
          }
      }
    }
    assert.equal(components, 1, `Detached pixels in pose ${frame}`);
    for (let x = 0; x < width; x++)
      assert.equal(
        pixels[x * 4 + 3],
        0,
        'Transparent top gutter prevents atlas spillover',
      );
  }
});

test('no old hair or glasses remain in the fixed background behind the heads', async () => {
  const pixels = await sharp('public/assets/world/city-couple-backdrop-v1.webp')
    .ensureAlpha()
    .raw()
    .toBuffer();
  for (let y = 550; y < 620; y++)
    for (let x = 1160; x < 1370; x++)
      assert.equal(
        pixels[(y * 1536 + x) * 4 + 3],
        0,
        `Original face residue at ${x},${y}`,
      );
});

test('the built city retains its complete no-JavaScript painting and real navigation', async () => {
  const html = await fs.readFile('.next/server/app/index.html', 'utf8');
  assert.match(html, /<noscript><img[^>]+city-static-glasses-v1\.webp/);
  assert.match(html, /href="\/writing"/);
  assert.match(html, /Take a sip of coffee/);
});
