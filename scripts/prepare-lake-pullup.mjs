// Register complete generated poses, without warping limbs or mirroring.
// Art/provenance: docs/verification/lake-pullup-routine/README.md.
import sharp from 'sharp';

const original = 'art-source/world/pullup-motion-glasses-v1.webp';
const recovery = 'art-source/world/lake-pullup-recovery-poses-v1.png';
const output = 'art-source/world/lake-pullup-routine-v1.webp';
const { width, height } = await sharp(recovery).metadata();
const transparent = { r: 0, g: 0, b: 0, alpha: 0 };
const frames = [];

for (let i = 0; i < 4; i++) {
  frames.push(
    await sharp(original)
      .extract({
        left: (i % 2) * 600,
        top: Math.floor(i / 2) * 720,
        width: 600,
        height: 720,
      })
      .png()
      .toBuffer(),
  );
}

for (let i = 0; i < 6; i++) {
  const column = i % 3,
    row = Math.floor(i / 3);
  const left = Math.round((column * width) / 3),
    top = Math.round((row * height) / 2);
  const cell = await sharp(recovery)
    .extract({
      left,
      top,
      width: Math.round(((column + 1) * width) / 3) - left,
      height: Math.round(((row + 1) * height) / 2) - top,
    })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  let x0 = cell.info.width,
    y0 = cell.info.height,
    x1 = 0,
    y1 = 0;
  for (let y = 0; y < cell.info.height; y++)
    for (let x = 0; x < cell.info.width; x++) {
      if (cell.data[(y * cell.info.width + x) * 4 + 3] < 16) continue;
      x0 = Math.min(x0, x);
      x1 = Math.max(x1, x);
      y0 = Math.min(y0, y);
      y1 = Math.max(y1, y);
    }
  // Align the feet, not a changing hand silhouette. Every generated pose uses
  // one uniform scale; grounded poses share the apparatus's y=699 baseline.
  let footLeft = cell.info.width,
    footRight = 0;
  for (let y = y1 - 40; y <= y1; y++)
    for (let x = x0; x <= x1; x++) {
      if (cell.data[(y * cell.info.width + x) * 4 + 3] < 16) continue;
      footLeft = Math.min(footLeft, x);
      footRight = Math.max(footRight, x);
    }
  const scale = 1.04;
  const pose = await sharp(cell.data, { raw: cell.info })
    .extract({ left: x0, top: y0, width: x1 - x0 + 1, height: y1 - y0 + 1 })
    .resize({ width: Math.round((x1 - x0 + 1) * scale) })
    .png()
    .toBuffer();
  const size = await sharp(pose).metadata();
  const baseline = i === 0 || i === 5 ? 665 : 699;
  const position = {
    left: Math.round(300 - ((footLeft + footRight) / 2 - x0) * scale),
    top: baseline - size.height,
  };
  frames.push(
    await sharp({
      create: { width: 600, height: 720, channels: 4, background: transparent },
    })
      .composite([{ input: pose, ...position }])
      .png()
      .toBuffer(),
  );
  console.log({
    frame: i + 4,
    bounds: [x0, y0, x1, y1],
    ...position,
    width: size.width,
    height: size.height,
  });
}

// Some original poses include tiny detached remnants below the lifted shoes.
// Retain the connected figure (including every nonzero antialiased edge), so
// neither those marks nor isolated generated pixels enter the served atlas.
for (let frame = 0; frame < frames.length; frame++) {
  const pixels = await sharp(frames[frame]).ensureAlpha().raw().toBuffer();
  const labels = new Int32Array(600 * 720);
  const queue = new Int32Array(labels.length);
  let label = 0,
    largest = 0,
    largestSize = 0;
  for (let n = 0; n < labels.length; n++) {
    if (labels[n] || !pixels[n * 4 + 3]) continue;
    label++;
    let read = 0,
      end = 1;
    queue[0] = n;
    labels[n] = label;
    while (read < end) {
      const p = queue[read++],
        x = p % 600,
        y = Math.floor(p / 600);
      for (const q of [
        x > 0 ? p - 1 : -1,
        x < 599 ? p + 1 : -1,
        y > 0 ? p - 600 : -1,
        y < 719 ? p + 600 : -1,
      ]) {
        if (q >= 0 && !labels[q] && pixels[q * 4 + 3]) {
          labels[q] = label;
          queue[end++] = q;
        }
      }
    }
    if (end > largestSize) {
      largest = label;
      largestSize = end;
    }
  }
  for (let n = 0; n < labels.length; n++)
    if (labels[n] !== largest) pixels[n * 4 + 3] = 0;
  frames[frame] = await sharp(pixels, {
    raw: { width: 600, height: 720, channels: 4 },
  })
    .png()
    .toBuffer();
}

await sharp({
  create: { width: 3000, height: 1440, channels: 4, background: transparent },
})
  .composite(
    frames.map((input, i) => ({
      input,
      left: (i % 5) * 600,
      top: Math.floor(i / 5) * 720,
    })),
  )
  .webp({ lossless: true })
  .toFile(output);
console.log(output);
