// Mechanical registration and alpha cleanup of generated cutouts.
// The original painting supplies every visible static pixel; the clean plate
// is used only where the original character used to cover the background.
import sharp from 'sharp';
import fs from 'node:fs/promises';
import {
  STRETCH_BOUNDS,
  stretchPath,
} from '../features/diorama/scenes/beach/stretch.ts';
const names = ['gather', 'clasp', 'extend', 'hold'];
const original = await sharp('public/assets/world/beach-typing-focused.webp')
  .ensureAlpha()
  .raw()
  .toBuffer();
const empty = await sharp('art-source/world/beach-empty-plate-v1.png')
  .resize(900, 900)
  .ensureAlpha()
  .raw()
  .toBuffer();
const region = await sharp(
  Buffer.from(
    `<svg width="900" height="900"><path d="${stretchPath(1)}" fill="white"/></svg>`,
  ),
)
  .ensureAlpha()
  .raw()
  .toBuffer();
// Separate the original upper body from the green canopy, including its dark
// contour. This is a matte, not replacement illustration or a colour patch.
const matte = new Uint8Array(900 * 900);
for (let y = 274; y < 730; y++)
  for (let x = 300; x < 700; x++) {
    const n = y * 900 + x,
      i = n * 4;
    if (!region[i + 3] || !original[i + 3]) continue;
    if (y >= 495) {
      const laptop = y >= 549 && x >= 506 && x >= 540 - 0.29 * (y - 557);
      if (!laptop && (y < 680 || x >= 343)) matte[n] = 1;
    } else if (
      x >= 350 &&
      x < 592 &&
      original[i] > original[i + 1] + 3 &&
      (y >= 405 || (original[i] < 200 && original[i + 1] < 155))
    )
      matte[n] = 1;
  }
const headQueue = [];
for (let y = 290; y < 525; y++)
  for (let x = 350; x < 595; x++)
    if (matte[y * 900 + x]) headQueue.push(y * 900 + x);
for (let read = 0; read < headQueue.length; read++) {
  const n = headQueue[read];
  for (const q of [n - 1, n + 1, n - 900, n + 900]) {
    const x = q % 900,
      y = Math.floor(q / 900),
      i = q * 4;
    if (
      x < 350 ||
      x >= 595 ||
      y < 290 ||
      y >= 525 ||
      matte[q] ||
      !original[i + 3]
    )
      continue;
    const green =
      original[i + 1] > 70 &&
      original[i + 1] > original[i] + 2 &&
      original[i + 1] > original[i + 2] + 5;
    const cream =
      y < 400 &&
      original[i] > 200 &&
      original[i + 1] > 190 &&
      original[i + 2] > 160;
    if (!green && !cream) {
      matte[q] = 1;
      headQueue.push(q);
    }
  }
}
// Fill enclosed highlight pixels and include the antialiased silhouette edge.
for (let y = 290; y < 525; y++) {
  const row = [];
  for (let x = 350; x < 595; x++) if (matte[y * 900 + x]) row.push(x);
  if (row.length)
    for (
      let x = Math.max(350, row[0] - 1);
      x <= Math.min(594, row.at(-1) + 1);
      x++
    )
      matte[y * 900 + x] = 1;
}
// This rectangle is entirely open air beneath the canopy, including where
// the original hair and sunglasses used to be. Clear faint edge residues too.
for (let y = 390; y < 525; y++)
  for (let x = 350; x < 595; x++) {
    matte[y * 900 + x] = 1;
    empty[(y * 900 + x) * 4 + 3] = 0;
  }
const background = Buffer.from(original);
for (let n = 0; n < matte.length; n++)
  if (matte[n]) empty.copy(background, n * 4, n * 4, n * 4 + 4);
await sharp(background, { raw: { width: 900, height: 900, channels: 4 } })
  .webp({ lossless: true })
  .toFile('art-source/world/beach-stretch-backdrop-v1.webp');
const typingMask = Buffer.alloc(900 * 900 * 4, 255);
for (let n = 0; n < matte.length; n++)
  typingMask[n * 4 + 3] = matte[n] ? 255 : 0;
await sharp(typingMask, { raw: { width: 900, height: 900, channels: 4 } })
  .webp({ lossless: true })
  .toFile('art-source/world/beach-typing-mask-v1.webp');
// Label opaque connected components to discard isolated generated specks.
const { data, info } = await sharp(
  'art-source/world/beach-stretch-cutouts-v1.png',
)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const labels = new Int32Array(info.width * info.height),
  queue = new Int32Array(labels.length),
  components = [];
for (let n = 0; n < labels.length; n++) {
  if (labels[n] || data[n * 4 + 3] < 16) continue;
  const id = components.length + 1;
  let count = 0,
    read = 0,
    end = 1,
    left = info.width,
    right = 0,
    top = info.height,
    bottom = 0;
  queue[0] = n;
  labels[n] = id;
  while (read < end) {
    const p = queue[read++],
      x = p % info.width,
      y = Math.floor(p / info.width);
    count++;
    left = Math.min(left, x);
    right = Math.max(right, x);
    top = Math.min(top, y);
    bottom = Math.max(bottom, y);
    for (const q of [
      x > 0 ? p - 1 : -1,
      x + 1 < info.width ? p + 1 : -1,
      y > 0 ? p - info.width : -1,
      y + 1 < info.height ? p + info.width : -1,
    ])
      if (q >= 0 && !labels[q] && data[q * 4 + 3] >= 16) {
        labels[q] = id;
        queue[end++] = q;
      }
  }
  components.push({
    id,
    count,
    left,
    top,
    width: right - left + 1,
    height: bottom - top + 1,
  });
}
const people = components
  .sort((a, b) => b.count - a.count)
  .slice(0, 4)
  .sort((a, b) =>
    Math.abs(a.top - b.top) > 200 ? a.top - b.top : a.left - b.left,
  );
const kept = new Set(people.map(p => p.id));
for (let n = 0; n < labels.length; n++)
  if (!kept.has(labels[n])) data[n * 4 + 3] = 0;
const results = [];
for (let frame = 0; frame < people.length; frame++) {
  const person = people[frame];
  const crop = await sharp(data, { raw: info })
    .extract({
      left: person.left,
      top: person.top,
      width: person.width,
      height: person.height,
    })
    .resize({ height: 540 })
    .png()
    .toBuffer();
  const cell = await sharp({
    create: {
      width: 900,
      height: 900,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([{ input: crop, left: 310, top: 305 }])
    .raw()
    .toBuffer();
  let best = { error: Infinity, scale: 1, dx: 0, dy: 0 };
  const skin = (pixels, i) =>
    pixels[i + 3] > 200 &&
    pixels[i] > 180 &&
    pixels[i] - pixels[i + 1] > 30 &&
    pixels[i + 1] - pixels[i + 2] > 25;
  for (let scale = 0.9; scale < 1.121; scale += 0.01)
    for (let dx = -60; dx <= 60; dx += 3)
      for (let dy = -60; dy <= 60; dy += 3) {
        let error = 0;
        for (let y = 665; y < 790; y += 5)
          for (let x = 375; x < 550; x += 5) {
            const ox = Math.round((x - dx) / scale),
              oy = Math.round((y - dy) / scale),
              a = (y * 900 + x) * 4,
              b = (oy * 900 + ox) * 4;
            const oldSkin = skin(original, a),
              newSkin = skin(cell, b);
            error += oldSkin !== newSkin ? 40000 : 0;
            if (oldSkin && newSkin)
              for (let c = 0; c < 3; c++)
                error += (original[a + c] - cell[b + c]) ** 2;
          }
        if (error < best.error) best = { error, scale, dx, dy };
      }
  const size = Math.round(900 * best.scale);
  const resized = await sharp(cell, {
    raw: { width: 900, height: 900, channels: 4 },
  })
    .resize(size, size)
    .png()
    .toBuffer();
  const extracted = await sharp(resized)
    .extract({
      left: Math.max(0, -best.dx),
      top: Math.max(0, -best.dy),
      width: Math.min(900 - Math.max(0, best.dx), size - Math.max(0, -best.dx)),
      height: Math.min(
        900 - Math.max(0, best.dy),
        size - Math.max(0, -best.dy),
      ),
    })
    .png()
    .toBuffer();
  const registered = await sharp({
    create: {
      width: 900,
      height: 900,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      {
        input: extracted,
        left: Math.max(0, best.dx),
        top: Math.max(0, best.dy),
      },
      {
        input: region,
        raw: { width: 900, height: 900, channels: 4 },
        blend: 'dest-in',
      },
    ])
    .png()
    .toBuffer();
  await sharp(registered)
    .extract(STRETCH_BOUNDS)
    .webp({ lossless: true })
    .toFile(`art-source/world/beach-stretch-${names[frame]}-v1.webp`);
  results.push({ frame: names[frame], component: person, ...best });
}
await fs.writeFile(
  'docs/verification/beach-stretch/registration.json',
  JSON.stringify(results, null, 2) + '\n',
);
console.log(results);
