// Mechanical alpha cleanup, registration and packing. Art direction and prompts:
// docs/verification/city-couple/README.md. No generated background is animated.
import sharp from 'sharp';
import fs from 'node:fs/promises';
import {
  CITY_ART,
  CITY_COUPLE_REGION,
} from '../features/diorama/scenes/city/couple-geometry.ts';

const { width, height } = CITY_ART;
const bounds = CITY_COUPLE_REGION;
const transparent = { r: 0, g: 0, b: 0, alpha: 0 };
const create = (w, h) =>
  sharp({
    create: { width: w, height: h, channels: 4, background: transparent },
  });
const sources = [
  { name: 'conversation', columns: 3, rows: 2 },
  { name: 'sips', columns: 2, rows: 2 },
];
const poses = [];

// Keep only the main connected couple, retaining the source alpha at its edge.
function clean(data, w, h) {
  const labels = new Int32Array(w * h),
    queue = new Int32Array(w * h);
  let label = 0,
    largest = 0,
    largestSize = 0;
  for (let n = 0; n < labels.length; n++) {
    if (labels[n] || data[n * 4 + 3] < 16) continue;
    label++;
    let read = 0,
      end = 1;
    queue[0] = n;
    labels[n] = label;
    while (read < end) {
      const p = queue[read++],
        x = p % w,
        y = Math.floor(p / w);
      for (const q of [
        x > 0 ? p - 1 : -1,
        x < w - 1 ? p + 1 : -1,
        y > 0 ? p - w : -1,
        y < h - 1 ? p + w : -1,
      ])
        if (q >= 0 && !labels[q] && data[q * 4 + 3] >= 16) {
          labels[q] = label;
          queue[end++] = q;
        }
    }
    if (end > largestSize) {
      largest = label;
      largestSize = end;
    }
  }
  let left = w,
    top = h,
    right = 0,
    bottom = 0;
  for (let n = 0; n < labels.length; n++) {
    if (labels[n] !== largest) {
      data[n * 4 + 3] = 0;
      continue;
    }
    left = Math.min(left, n % w);
    right = Math.max(right, n % w);
    top = Math.min(top, Math.floor(n / w));
    bottom = Math.max(bottom, Math.floor(n / w));
  }
  return { left, top, width: right - left + 1, height: bottom - top + 1 };
}

for (const source of sources) {
  const path = `art-source/world/city-couple-${source.name}-v1.png`;
  const metadata = await sharp(path).metadata();
  let scale;
  for (let n = 0; n < source.columns * source.rows; n++) {
    const w = metadata.width / source.columns,
      h = metadata.height / source.rows;
    const { data } = await sharp(path)
      .extract({
        left: (n % source.columns) * w,
        top: Math.floor(n / source.columns) * h,
        width: w,
        height: h,
      })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    const box = clean(data, w, h);
    if (scale === undefined) scale = 350 / box.height;
    const png = await sharp(data, { raw: { width: w, height: h, channels: 4 } })
      .extract(box)
      .resize({ width: Math.round(box.width * scale) })
      .png()
      .toBuffer();
    const size = await sharp(png).metadata();
    poses.push(
      await create(width, height)
        .composite([
          {
            input: png,
            left: Math.round(1261 - size.width / 2),
            top: 904 - size.height,
          },
        ])
        .raw()
        .toBuffer(),
    );
  }
}

// Register unchanged trousers/shoes to the neutral pose, never a moving hand or head.
const registration = [];
for (let frame = 1; frame < poses.length; frame++) {
  let best = { error: Infinity, dx: 0, dy: 0 };
  for (let dy = -8; dy <= 8; dy++)
    for (let dx = -8; dx <= 8; dx++) {
      let error = 0;
      for (let y = 780; y < 908; y += 3)
        for (let x = 1115; x < 1405; x += 3) {
          const a = (y * width + x) * 4,
            b = ((y - dy) * width + x - dx) * 4;
          const opaqueA = poses[0][a + 3] >= 128,
            opaqueB = poses[frame][b + 3] >= 128;
          error += opaqueA !== opaqueB ? 60000 : 0;
          if (opaqueA && opaqueB)
            for (let c = 0; c < 3; c++)
              error += (poses[0][a + c] - poses[frame][b + c]) ** 2;
        }
      if (error < best.error) best = { error, dx, dy };
    }
  const png = await sharp(poses[frame], { raw: { width, height, channels: 4 } })
    .extract({ left: 1100, top: 530, width: 320, height: 390 })
    .png()
    .toBuffer();
  poses[frame] = await create(width, height)
    .composite([{ input: png, left: 1100 + best.dx, top: 530 + best.dy }])
    .raw()
    .toBuffer();
  registration.push({ frame, ...best });
}
// During an individual sip the listener is literally the neutral drawing,
// avoiding a tiny redraw/position change in the person who is not moving.
for (let frame = 6; frame < 10; frame++)
  for (let y = 535; y < 765; y++)
    for (let x = 1100; x < 1420; x++) {
      if (frame < 8 ? x >= 1265 : x < 1265) {
        const i = (y * width + x) * 4;
        for (let c = 0; c < 4; c++) poses[frame][i + c] = poses[0][i + c];
      }
    }

// A fixed cleaned terrace plus the neutral legs. The original painting remains
// byte-identical outside this small couple silhouette in the lossless sources.
const silhouette = [
  [1150, 540],
  [1280, 540],
  [1300, 560],
  [1380, 560],
  [1400, 632],
  [1410, 708],
  [1384, 755],
  [1380, 803],
  [1336, 808],
  [1328, 855],
  [1300, 908],
  [1244, 916],
  [1222, 874],
  [1198, 896],
  [1177, 882],
  [1145, 886],
  [1116, 878],
  [1115, 847],
  [1134, 820],
  [1132, 779],
  [1140, 749],
  [1150, 701],
  [1150, 675],
];
const d =
  silhouette.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join(' ') + 'Z';
const mask = await sharp(
  Buffer.from(
    `<svg width="1536" height="1024"><path d="${d}" fill="white" stroke="white" stroke-width="14" stroke-linejoin="round"/></svg>`,
  ),
)
  .blur(3)
  .ensureAlpha()
  .raw()
  .toBuffer();
const plate = await sharp('art-source/world/city-couple-empty-plate-v2.png')
  .resize(width, height)
  .ensureAlpha()
  .raw()
  .toBuffer();
for (const [name, source] of [
  ['backdrop', 'city-front-glasses-v1'],
  ['backdrop-off', 'city-front-off-glasses-v1'],
]) {
  const original = await sharp(`art-source/world/${source}.webp`)
    .ensureAlpha()
    .raw()
    .toBuffer();
  for (let y = 530; y < 925; y++)
    for (let x = 1100; x < 1420; x++) {
      const i = (y * width + x) * 4;
      if (!mask[i + 3]) continue;
      const amount = mask[i + 3] / 255;
      const a = original[i + 3] * (1 - amount),
        b = plate[i + 3] * amount;
      for (let c = 0; c < 3; c++)
        original[i + c] =
          a + b
            ? Math.round((original[i + c] * a + plate[i + c] * b) / (a + b))
            : 0;
      original[i + 3] = Math.round(a + b);
      // Open air above the terrace: remove even barely visible alpha remnants
      // from the generated clean plate, away from the foliage boundary.
      if (x >= 1150 && x < 1390 && y >= 540 && y < 626) original[i + 3] = 0;
    }
  const lower = await sharp(poses[0], { raw: { width, height, channels: 4 } })
    .extract({ left: 1100, top: 750, width: 320, height: 175 })
    .png()
    .toBuffer();
  await sharp(original, { raw: { width, height, channels: 4 } })
    .composite([{ input: lower, left: 1100, top: 750 }])
    .webp({ lossless: true })
    .toFile(`art-source/world/city-couple-${name}-v1.webp`);
}

const frames = [];
for (const source of poses) {
  const pose = Buffer.from(source);
  // Share the neutral hips in a short overlap with the fixed legs. Fading
  // this identical drawing at the crop edge prevents subpixel raster seams.
  for (let y = 750; y < 765; y++)
    for (let x = 1100; x < 1420; x++) {
      const i = (y * width + x) * 4;
      for (let c = 0; c < 4; c++) pose[i + c] = poses[0][i + c];
      pose[i + 3] = Math.round(
        pose[i + 3] * Math.max(0, Math.min(1, (764 - y) / 8)),
      );
    }
  frames.push(
    await sharp(pose, { raw: { width, height, channels: 4 } })
      .extract(bounds)
      .png()
      .toBuffer(),
  );
}
await create(bounds.width * 5, bounds.height * 2)
  .composite(
    frames.map((input, i) => ({
      input,
      left: (i % 5) * bounds.width,
      top: Math.floor(i / 5) * bounds.height,
    })),
  )
  .webp({ lossless: true })
  .toFile('art-source/world/city-couple-motion-v1.webp');
await fs.mkdir('docs/verification/city-couple', { recursive: true });
await fs.writeFile(
  'docs/verification/city-couple/registration.json',
  JSON.stringify(registration, null, 2) + '\n',
);
// Full composites expose registration seams at the seated hips during review.
const backdrop = await sharp('art-source/world/city-couple-backdrop-v1.webp')
  .png()
  .toBuffer();
const review = [];
for (let i = 0; i < frames.length; i++) {
  const full = await sharp(backdrop)
    .composite([{ input: frames[i], left: bounds.left, top: bounds.top }])
    .png()
    .toBuffer();
  review.push({
    input: await sharp(full)
      .extract({ left: 1100, top: 530, width: 320, height: 395 })
      .flatten({ background: '#adc7d5' })
      .png()
      .toBuffer(),
    left: (i % 5) * 320,
    top: Math.floor(i / 5) * 395,
  });
}
await create(1600, 790)
  .composite(review)
  .png()
  .toFile('docs/verification/city-couple/pose-review.png');
console.log({ bounds, registration });
