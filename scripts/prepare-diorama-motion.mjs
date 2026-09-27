// Mechanical registration/packing of approved generated poses. No limb warping.
// Generated originals stay untouched; paths/provenance are recorded in the docs.
import sharp from 'sharp';
import fs from 'node:fs/promises';
const source =
  '/Users/glen/.codex/generated_images/01a0df7a-c5ab-7c32-a9ce-6c1d06419986/';
const out = 'public/assets/world/';
const transparent = { r: 0, g: 0, b: 0, alpha: 0 };
const sheet = 'exec-172538bb-5d58-4f48-a86e-c7949bfdd8b6.png';
// Green crossbar measured at y144/178 in each source row. Its centre is 4px above.
// Crop only between the uprights; a single stationary frame supplies the posts.
const pullup = [];
for (let i = 0; i < 4; i++) {
  const row = Math.floor(i / 2),
    col = i % 2;
  const innerLeft = col === 0 ? 184 : 131;
  const crop = await sharp(source + sheet)
    .extract({
      left: col * 637 + innerLeft,
      top: row * 618,
      width: 320,
      height: 618,
    })
    .png()
    .toBuffer();
  const registered = await sharp({
    create: { width: 600, height: 720, channels: 4, background: transparent },
  })
    .composite([{ input: crop, left: 140, top: row === 0 ? 50 : 16 }])
    .png()
    .toBuffer();
  pullup.push({ input: registered, left: col * 600, top: row * 720 });
}
await sharp({
  create: { width: 1200, height: 1440, channels: 4, background: transparent },
})
  .composite(pullup)
  .webp({ quality: 90, alphaQuality: 100 })
  .toFile(out + 'pullup-motion-v2.webp');
const football = [];
for (let i = 0; i < 3; i++) {
  const frame = await sharp(
    source + 'exec-e6aeb046-04a1-4434-b9d3-1ebc88a653eb.png',
  )
    .extract({ left: i * 724, top: 0, width: 724, height: 724 })
    .png()
    .toBuffer();
  const registered = await sharp({
    create: { width: 744, height: 744, channels: 4, background: transparent },
  })
    .composite([{ input: frame, left: 10 + [0, 5, 8][i], top: 0 }])
    .png()
    .toBuffer();
  football.push({ input: registered, left: i * 744, top: 0 });
}
const footballAtlas = await sharp({
  create: { width: 2232, height: 744, channels: 4, background: transparent },
})
  .composite(football)
  .png()
  .toBuffer();
await sharp(footballAtlas)
  .resize(1536, 512)
  .webp({ quality: 88, alphaQuality: 100 })
  .toFile(out + 'football-motion-v2.webp');
const plates = [
  ['city-front-off-v2', 'exec-85a78514-7e19-4eec-bc73-2ce8f5c3a18b.png', 1536],
  ['typing-desktop-v2', 'exec-ab130d0d-a1ea-4137-98f0-f6dff36dc71d.png', 1536],
  ['typing-portrait-v2', 'exec-a6907452-58f1-4e7a-b477-08dc22b1a9a8.png', 800],
  ['writing-desktop-v2', 'exec-f606d73c-1199-4fe2-9624-eac437b78d16.png', 1536],
  ['writing-portrait-v2', 'exec-1644c245-8bbc-431d-b03d-07708c6bdb79.png', 800],
];
for (const [name, file, width] of plates)
  await sharp(source + file)
    .resize({ width })
    .webp({ quality: 86 })
    .toFile(out + name + '.webp');
const files = [
  'pullup-motion-v2',
  'football-motion-v2',
  ...plates.map(([name]) => name),
];
for (const name of files)
  console.log(name, (await fs.stat(out + name + '.webp')).size);
