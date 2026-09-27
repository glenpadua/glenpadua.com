import test from 'node:test';
import assert from 'node:assert/strict';
import sharp from 'sharp';

const artwork = 'public/assets/world/';
const cases = [
  {
    name: 'desktop',
    width: 1536,
    height: 1024,
    protectedAreas: [
      ['hair', 53, 88, 59, 100],
      ['desk', 68, 69, 76, 78],
    ],
    handInterior: [
      [60, 79],
      [66, 87],
      [70, 93],
    ],
    oldShadow: [
      [55.8, 80.2],
      [57.8, 83.8],
      [62.2, 87.7],
    ],
  },
  {
    name: 'portrait',
    width: 800,
    height: 1600,
    protectedAreas: [
      ['hair', 54, 90, 66, 100],
      ['desk', 79, 76, 97, 83],
    ],
    handInterior: [
      [65, 83],
      [74, 89],
      [80, 91],
    ],
    oldShadow: [
      [58, 83.5],
      [62.4, 86.7],
      [67, 87.8],
    ],
  },
];

for (const {
  name,
  width,
  height,
  protectedAreas,
  handInterior,
  oldShadow,
} of cases) {
  test(`${name} writing has one opaque hand over a fully cleared original silhouette`, async () => {
    const readMask = async part =>
      sharp(`${artwork}stories-writing-${part}mask-${name}.svg`)
        .resize(width, height)
        .ensureAlpha()
        .raw()
        .toBuffer();
    const [hand, clean, cuff] = await Promise.all([
      readMask(''),
      readMask('clean-'),
      readMask('cuff-'),
    ]);
    const alphaAt = (mask, x, y) =>
      mask[
        (Math.floor((y * height) / 100) * width +
          Math.floor((x * width) / 100)) *
          4 +
          3
      ];
    for (const [x, y] of handInterior)
      assert.equal(
        alphaAt(hand, x, y),
        255,
        `Forearm must be opaque at ${x}%,${y}%; no pose crossfade`,
      );
    for (const [x, y] of oldShadow)
      assert.ok(
        alphaAt(clean, x, y) >= 250,
        `Baked shadow must be erased at ${x}%,${y}%`,
      );

    let covered = 0,
      ghosts = 0;
    for (let pixel = 0; pixel < width * height; pixel++) {
      const alpha = pixel * 4 + 3;
      if (hand[alpha] < 250 || cuff[alpha] > 5) continue;
      covered++;
      if (clean[alpha] < 250) ghosts++;
    }
    assert.ok(covered > 10000, 'Check the whole visible hand and forearm.');
    assert.equal(
      ghosts,
      0,
      `${ghosts} original hand pixels remain beneath the moving layer`,
    );

    for (const [label, left, top, right, bottom] of protectedAreas) {
      let affected = 0;
      for (
        let y = Math.ceil((top * height) / 100);
        y < (bottom * height) / 100;
        y++
      ) {
        for (
          let x = Math.ceil((left * width) / 100);
          x < (right * width) / 100;
          x++
        ) {
          if (hand[(y * width + x) * 4 + 3] > 0) affected++;
        }
      }
      assert.equal(
        affected,
        0,
        `${label} must not be part of the moving cutout`,
      );
    }
  });
}
