import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';

const artwork = 'public/assets/world/';
const cases = [
  {
    name: 'desktop',
    base: 'work.webp',
    protectedAreas: [
      ['desk above left hand', 37.1, 63.1, 43.9, 64.5],
      ['shirt below right hand', 54.1, 77, 62.8, 81.8],
    ],
    fingers: [
      [630, 680],
      [646, 697],
      [866, 710],
      [893, 699],
    ],
  },
  {
    name: 'portrait',
    base: 'work-portrait-v1.webp',
    protectedAreas: [
      ['desk above left hand', 28.1, 53.1, 43.9, 54.1],
      ['shirt below right hand', 55.1, 63.5, 71.9, 66.8],
    ],
    fingers: [
      [298, 886],
      [284, 911],
      [481, 929],
      [507, 922],
    ],
  },
];

for (const { name, base, protectedAreas, fingers } of cases) {
  test(`${name} typing changes fingers without flashing stationary patch corners`, async () => {
    const { data: original, info } = await sharp(artwork + base)
      .removeAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    const alternate = await sharp(artwork + `typing-${name}-v2.webp`)
      .resize(info.width, info.height)
      .removeAlpha()
      .raw()
      .toBuffer();
    const masks = await Promise.all(
      ['left', 'right'].map(async side => {
        let svg;
        if (process.env.WORK_TYPING_BASELINE) {
          // Reproduce the original runtime clip polygons against the real frames.
          const css = readFileSync(
            'features/diorama/styles/motion.css',
            'utf8',
          );
          const matches = [
            ...css.matchAll(
              new RegExp(
                `\\.hands-typing\\.hand-${side}\\s*\\{\\s*clip-path: polygon\\(([^)]+)\\)`,
                'g',
              ),
            ),
          ];
          const polygon = matches[name === 'portrait' ? 1 : 0][1];
          const points = polygon
            .split(',')
            .map(pair =>
              pair
                .trim()
                .split(/\s+/)
                .map(
                  (value, axis) =>
                    (parseFloat(value) / 100) *
                    (axis ? info.height : info.width),
                )
                .join(','),
            )
            .join(' ');
          svg = Buffer.from(
            `<svg xmlns="http://www.w3.org/2000/svg" width="${info.width}" height="${info.height}"><polygon points="${points}" fill="white"/></svg>`,
          );
        } else {
          svg = readFileSync(`${artwork}work-typing-mask-${name}-${side}.svg`);
        }
        return sharp(svg)
          .resize(info.width, info.height)
          .ensureAlpha()
          .raw()
          .toBuffer();
      }),
    );
    const alphaAt = pixel =>
      Math.max(...masks.map(mask => mask[pixel * 4 + 3])) / 255;
    let movingPixels = 0;
    for (let pixel = 0; pixel < info.width * info.height; pixel++) {
      if (alphaAt(pixel) < 0.95) continue;
      if (Math.abs(original[pixel * 3] - alternate[pixel * 3]) > 12)
        movingPixels++;
    }
    assert.ok(movingPixels > 500, 'The hand must still visibly change pose.');
    for (const [x, y] of fingers) {
      assert.ok(
        alphaAt(y * info.width + x) > 0.95,
        `Finger at ${x},${y} must stay crisp.`,
      );
    }
    for (const [label, left, top, right, bottom] of protectedAreas) {
      let changed = 0;
      for (
        let y = Math.ceil((top * info.height) / 100);
        y < (bottom * info.height) / 100;
        y++
      ) {
        for (
          let x = Math.ceil((left * info.width) / 100);
          x < (right * info.width) / 100;
          x++
        ) {
          const pixel = y * info.width + x;
          if (
            [0, 1, 2].some(
              c =>
                Math.round(
                  Math.abs(original[pixel * 3 + c] - alternate[pixel * 3 + c]) *
                    alphaAt(pixel),
                ) > 0,
            )
          )
            changed++;
        }
      }
      assert.equal(
        changed,
        0,
        `${label}: ${changed} stationary pixels flicker between poses`,
      );
    }
  });
}
