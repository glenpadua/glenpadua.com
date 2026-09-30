// Register ImageGen artwork to the lake's existing painting coordinates.
// Sources/prompts: docs/verification/lake-delight-2026-09-30/.
import sharp from 'sharp';

const source = 'art-source/world';
const transparent = { r: 0, g: 0, b: 0, alpha: 0 };

// Same scale and registration for every pose: 512px cells become 128px cells.
// Perched feet sit at y=110; the runtime anchors that point to the fixed bar.
const bird = await sharp(`${source}/lake-bird-generated-v1.png`)
  .resize(384, 256)
  .webp({ lossless: true })
  .toFile(`${source}/lake-bird-v1.webp`);
console.log('bird', bird.width, bird.height);

const pebble = await sharp(`${source}/lake-skipping-stone-generated-v1.png`)
  .trim()
  .resize({ width: 192 })
  .webp({ lossless: true })
  .toFile(`${source}/lake-skipping-stone-v1.webp`);
console.log('stone', pebble.width, pebble.height);

const smallPebble = await sharp(
  `${source}/lake-skipping-pebble-generated-v2.png`,
)
  .trim()
  .resize({ width: 192 })
  .webp({ lossless: true })
  .toFile(`${source}/lake-skipping-pebble-v2.webp`);
console.log('pebble', smallPebble.width, smallPebble.height);

// Only the newly drawn head is used. The live body, hands, feet and prosthesis
// remain the exact original atlas pixels while Glen glances at the visitor.
const head = await sharp(`${source}/lake-bird-glance-generated-v1.png`)
  .extract({ left: 441, top: 490, width: 297, height: 286 })
  .resize({ width: 154 })
  .webp({ lossless: true })
  .toFile(`${source}/lake-bird-glance-v1.webp`);
console.log('glance', head.width, head.height);

// Review the registered head against the fixed body without changing its art.
const rest = await sharp(`${source}/lake-rest-reference-v1.png`)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
for (let y = 0; y < 414; y++)
  for (let x = 0; x < 600; x++) rest.data[(y * 600 + x) * 4 + 3] = 0;
await sharp(rest.data, { raw: rest.info })
  .composite([
    { input: `${source}/lake-bird-glance-v1.webp`, left: 226, top: 266 },
  ])
  .flatten({ background: '#f8f0dd' })
  .png()
  .toFile('docs/verification/lake-delight-2026-09-30/glance-registration.png');
await sharp({
  create: { width: 600, height: 720, channels: 4, background: transparent },
})
  .composite([
    { input: `${source}/lake-bird-glance-v1.webp`, left: 226, top: 266 },
  ])
  .png()
  .toFile('docs/verification/lake-delight-2026-09-30/glance-placement.png');
