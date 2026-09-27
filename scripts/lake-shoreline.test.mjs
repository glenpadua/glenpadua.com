// Checks the real ripple mask against the unchanged painting, not a copy of
// the implementation's coordinates. Green bank pixels must never receive water.
import test from 'node:test';
import assert from 'node:assert/strict';
import sharp from 'sharp';
import {
  lakeShoreline,
  lakeWaterRegion,
} from '../features/diorama/scenes/lake/water-config.ts';

test('the lake highlight mask stays entirely over painted water', async () => {
  const { data, info } = await sharp('public/assets/world/lake-back.webp')
    .raw()
    .toBuffer({ resolveWithObject: true });
  const polygon = lakeShoreline.map(([x, y]) => {
    return [(x * info.width) / 100, (y * info.height) / 100];
  });
  const inside = (x, y) => {
    let contained = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const [a, b] = polygon[i];
      const [c, d] = polygon[j];
      if (b > y !== d > y && x < ((c - a) * (y - b)) / (d - b) + a)
        contained = !contained;
    }
    return contained;
  };
  let samples = 0;
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      if (!inside(x, y)) continue;
      assert.ok(
        x >= lakeWaterRegion.left &&
          x <= lakeWaterRegion.left + lakeWaterRegion.width,
      );
      assert.ok(
        y >= lakeWaterRegion.top &&
          y <= lakeWaterRegion.top + lakeWaterRegion.height,
      );
      samples++;
      const offset = (y * info.width + x) * info.channels;
      // The fixed painting's water is pale cream; its banks are darker green.
      assert.ok(
        data[offset] >= 180,
        `Water mask touches land at painting pixel ${x},${y}`,
      );
    }
  }
  assert.ok(samples > 10000, 'The check must cover a visible body of water.');
  // A known point under the old first ripple provides the negative control.
  assert.ok(data[(661 * info.width + 504) * info.channels] < 180);
});
