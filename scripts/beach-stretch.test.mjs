import test from 'node:test';
import assert from 'node:assert/strict';
import {
  BEACH_TYPING_MS,
  BEACH_WORK_CYCLE_MS,
  beachWorkStateAt,
  typingStateAt,
} from '../features/diorama/scenes/beach/typing.ts';

test('the original typing cadence lasts for six phrases before a stretch', () => {
  assert.equal(BEACH_TYPING_MS, 7560);
  for (let time = 0; time < BEACH_TYPING_MS; time++) {
    const actual = beachWorkStateAt(time);
    const typing = typingStateAt(time);
    assert.equal(actual.phase, 'typing');
    assert.equal(actual.frame, typing.frame);
    assert.equal(actual.untilNextMs, typing.untilNextMs);
  }
});

test('hands clasp, extend, hold, retract and settle before typing resumes', () => {
  let time = BEACH_TYPING_MS;
  const states = [];
  while (time < BEACH_WORK_CYCLE_MS) {
    const state = beachWorkStateAt(time);
    states.push([state.frame, state.phase, state.untilNextMs]);
    time += state.untilNextMs;
  }
  assert.deepEqual(states, [
    [2, 'stretch', 200],
    [3, 'stretch', 200],
    [4, 'stretch', 200],
    [5, 'stretch', 1500],
    [4, 'stretch', 200],
    [3, 'stretch', 200],
    [2, 'stretch', 200],
    [0, 'settle', 400],
  ]);
  assert.deepEqual(beachWorkStateAt(time), beachWorkStateAt(0));
});

test('pause/resume can preserve any hold and timers always have a next boundary', () => {
  const held = BEACH_TYPING_MS + 900;
  const state = beachWorkStateAt(held);
  assert.equal(state.frame, 5);
  assert.equal(state.untilNextMs, 1200);
  assert.deepEqual(beachWorkStateAt(held + BEACH_WORK_CYCLE_MS * 20), state);
  for (let time = 0; time < BEACH_WORK_CYCLE_MS; time++) {
    assert.ok(beachWorkStateAt(time).untilNextMs > 0);
  }
});

test('stretch geometry keeps the canopy, laptop and seated legs outside the replacement', async () => {
  const { default: sharp } = await import('sharp');
  const { stretchPath } =
    await import('../features/diorama/scenes/beach/stretch.ts');
  const mask = await sharp(
    Buffer.from(
      `<svg width="900" height="900"><path d="${stretchPath(1)}" fill="white"/></svg>`,
    ),
  )
    .ensureAlpha()
    .raw()
    .toBuffer();
  for (const [left, top, right, bottom] of [
    [0, 0, 900, 270], // the complete upper canopy
    [550, 570, 665, 620], // laptop screen and HTML sticker placement
    [375, 740, 800, 855], // both legs, prosthesis and shoes
  ]) {
    for (let y = top; y < bottom; y++)
      for (let x = left; x < right; x++) {
        assert.equal(
          mask[(y * 900 + x) * 4 + 3],
          0,
          `Fixed painting pixel ${x},${y} is outside the stretch.`,
        );
      }
  }
});

test('the cleared backdrop has no old hair, sunglasses or stray pixels in the revealed air', async () => {
  const { default: sharp } = await import('sharp');
  const pixels = await sharp(
    'public/assets/world/beach-stretch-backdrop-v1.webp',
  )
    .ensureAlpha()
    .raw()
    .toBuffer();
  for (let y = 390; y < 525; y++)
    for (let x = 390; x < 575; x++) {
      assert.equal(
        pixels[(y * 900 + x) * 4 + 3],
        0,
        `Old character residue at ${x},${y}`,
      );
    }
});

test('every stretch cutout is one connected character without floating specks or canopy pixels', async () => {
  const { default: sharp } = await import('sharp');
  const { STRETCH_BOUNDS } =
    await import('../features/diorama/scenes/beach/stretch.ts');
  for (const name of ['gather', 'clasp', 'extend', 'hold']) {
    const { data: pixels, info } = await sharp(
      `public/assets/world/beach-stretch-${name}-v1.webp`,
    )
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    const { width, height } = info;
    assert.equal(width, STRETCH_BOUNDS.width);
    assert.equal(height, STRETCH_BOUNDS.height);
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
        ]) {
          if (q >= 0 && !visited[q] && pixels[q * 4 + 3] >= 16) {
            visited[q] = 1;
            queue[end++] = q;
          }
        }
      }
    }
    assert.equal(components, 1, `${name} contains a detached mark`);
    assert.ok(STRETCH_BOUNDS.top > 270, 'crop excludes the upper canopy');
  }
});
