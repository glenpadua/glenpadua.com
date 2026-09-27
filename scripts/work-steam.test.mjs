import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const css = readFileSync(
  'features/diorama/rooms/work/coffee-steam.module.css',
  'utf8',
);
const regions = [...css.matchAll(/\.region\s*\{([^}]+)\}/g)];
const paintings = [
  {
    name: 'desktop',
    width: 1536,
    height: 1024,
    opening: [1040, 1091, 598, 620],
  },
  { name: 'portrait', width: 800, height: 1600, opening: [553, 601, 757, 778] },
];

for (const [index, painting] of paintings.entries()) {
  test(`${painting.name} steam is clipped inside the painted cup opening at every scale`, () => {
    const block = regions[index][1];
    const percent = property =>
      Number(block.match(new RegExp(`${property}:\\s*([\\d.]+)%`))[1]) / 100;
    assert.match(regions[0][1], /overflow:\s*hidden/);
    assert.doesNotMatch(
      regions[0][1],
      /animation:/,
      'The clipping boundary must stay fixed.',
    );
    for (const scale of [0.25, 0.6, 1, 1.5]) {
      const x = percent('left') * painting.width * scale;
      const bottom = (1 - percent('bottom')) * painting.height * scale;
      const [left, right, back, front] = painting.opening.map(
        value => value * scale,
      );
      assert.ok(x > left && x < right, 'Steam must originate over the coffee.');
      assert.ok(
        bottom >= back && bottom < front,
        'The fixed clip must stop before the front rim.',
      );
    }
  });
}
