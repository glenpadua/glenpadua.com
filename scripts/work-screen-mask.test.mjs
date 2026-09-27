// Checks the Work monitor's screen mask against the unchanged room painting:
// the desktop must cover painted screen and never cover Glen's painted head.
import test from 'node:test';
import assert from 'node:assert/strict';
import sharp from 'sharp';
import {
  workScreen,
  workScreenMask,
} from '../features/diorama/rooms/work/screen-mask.ts';

test('the desktop covers the painted screen and stays behind Glen’s head', async () => {
  const art = await sharp('public/assets/world/work-globe-room.webp')
    .raw()
    .toBuffer({ resolveWithObject: true });
  const png = Buffer.from(workScreenMask.match(/base64,([^"]+)"/)[1], 'base64');
  const mask = await sharp(png)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = art.info;
  const x0 = Math.round((workScreen.left / 100) * W);
  const y0 = Math.round((workScreen.top / 100) * H);
  assert.equal(mask.info.width, Math.round((workScreen.width / 100) * W));
  let screen = 0;
  let hair = 0;
  for (let y = 0; y < mask.info.height; y++) {
    for (let x = 0; x < mask.info.width; x++) {
      const i = ((y0 + y) * W + (x0 + x)) * art.info.channels;
      const [r, g, b] = art.data.subarray(i, i + 3);
      const alpha = mask.data[(y * mask.info.width + x) * 4 + 3];
      // The screen's own cream (not the lighter rim painted round the hair):
      // the desktop shows.
      if (Math.hypot(r - 254, g - 246, b - 225) < 8) {
        assert.ok(alpha > 240, `screen hidden at ${x0 + x},${y0 + y}`);
        screen++;
      }
      // Clearly dark or brown hair inside the screen: the painting stays in
      // front. (The 2px margin under the dark bezel is covered on purpose.)
      const inner =
        x >= 2 && x < mask.info.width - 2 && y >= 2 && y < mask.info.height - 2;
      if (inner && r < 140 && g < 110) {
        assert.ok(alpha < 16, `hair covered at ${x0 + x},${y0 + y}`);
        hair++;
      }
    }
  }
  assert.ok(screen > 150_000, `only ${screen} screen pixels checked`);
  assert.ok(hair > 2_000, `only ${hair} hair pixels checked`);
});
