// Checks the Work monitor's screen masks against the unchanged room paintings:
// the desktop must cover the painted screen and never cover what is painted in
// front of it (Glen's head on large screens, the laptop lid on phones).
import test from 'node:test';
import assert from 'node:assert/strict';
import sharp from 'sharp';
import {
  workScreen,
  workScreenMask,
  workScreenPortrait,
  workScreenPortraitMask,
} from '../features/diorama/rooms/work/screen-mask.ts';

const cases = [
  {
    name: 'large screens: behind Glen’s head',
    art: 'public/assets/world/work-globe-room.webp',
    box: workScreen,
    css: workScreenMask,
    minScreen: 150_000,
    minFront: 2_000,
  },
  {
    name: 'phones: behind the laptop lid',
    art: 'public/assets/world/work-globe-room-portrait.webp',
    box: workScreenPortrait,
    css: workScreenPortraitMask,
    minScreen: 200_000,
    minFront: 300,
  },
];

for (const c of cases)
  test(`the desktop covers the painted screen (${c.name})`, async () => {
    const art = await sharp(c.art).raw().toBuffer({ resolveWithObject: true });
    const png = Buffer.from(c.css.match(/base64,([^"]+)"/)[1], 'base64');
    const mask = await sharp(png)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    const { width: W, height: H } = art.info;
    const x0 = Math.round((c.box.left / 100) * W);
    const y0 = Math.round((c.box.top / 100) * H);
    assert.equal(mask.info.width, Math.round((c.box.width / 100) * W));
    assert.equal(mask.info.height, Math.round((c.box.height / 100) * H));
    let screen = 0;
    let front = 0;
    for (let y = 0; y < mask.info.height; y++) {
      for (let x = 0; x < mask.info.width; x++) {
        const i = ((y0 + y) * W + (x0 + x)) * art.info.channels;
        const [r, g, b] = art.data.subarray(i, i + 3);
        const alpha = mask.data[(y * mask.info.width + x) * 4 + 3];
        // The screen's own cream: the desktop shows.
        if (Math.hypot(r - 254, g - 246, b - 225) < 8) {
          assert.ok(alpha > 240, `screen hidden at ${x0 + x},${y0 + y}`);
          screen++;
        }
        // Clearly dark paint inside the screen (hair, lid): the painting stays
        // in front. (The 2px margin under the dark bezel is covered on purpose.)
        const inner =
          x >= 2 &&
          x < mask.info.width - 2 &&
          y >= 2 &&
          y < mask.info.height - 2;
        if (inner && 0.3 * r + 0.59 * g + 0.11 * b < 110) {
          assert.ok(alpha < 16, `painting covered at ${x0 + x},${y0 + y}`);
          front++;
        }
      }
    }
    assert.ok(screen > c.minScreen, `only ${screen} screen pixels checked`);
    assert.ok(front > c.minFront, `only ${front} front pixels checked`);
  });
