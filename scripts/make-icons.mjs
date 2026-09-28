// Builds the site icons from Glen's head in the approved city terrace art
// (glasses, olive overshirt), so the favicon is the character visitors meet.
//   node scripts/make-icons.mjs
// Writes app/favicon.ico (16, 32, 48), app/icon.png and app/apple-icon.png.
import sharp from 'sharp';
import fs from 'node:fs/promises';

const source = 'art-source/world/city-front-glasses-v1.webp';
// Glen's head and collar on the bench, in source pixels.
const head = { left: 1160, top: 548, width: 124, height: 132 };
// Millusha's hair beside his ear and shoulder, erased from the crop.
const beside = [
  [1280, 548],
  [1280, 600],
  [1279, 612],
  [1274, 625],
  [1271, 632],
  [1269, 641],
  [1266, 650],
  [1264, 662],
  [1264, 670],
  [1265, 680],
  [1284, 680],
  [1284, 548],
];
// Morning sky sampled from the lake painting, top to horizon.
const sky = ['#98c6ed', '#c9e0ec'];

const mask = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${head.width}" height="${head.height}">
    <polygon points="${beside.map(([x, y]) => `${x - head.left},${y - head.top}`).join(' ')}"/>
  </svg>`,
);
const cutout = await sharp(source)
  .extract(head)
  .composite([{ input: mask, blend: 'dest-out' }])
  .png()
  .toBuffer();

async function tile(size, { rounded }) {
  const radius = rounded ? Math.round(size * 0.22) : 0;
  const background = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
      <defs><linearGradient id="s" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${sky[0]}"/><stop offset="1" stop-color="${sky[1]}"/>
      </linearGradient></defs>
      <rect width="${size}" height="${size}" rx="${radius}" fill="url(#s)"/>
    </svg>`,
  );
  const height = size;
  const width = Math.round((height * head.width) / head.height);
  const face = await sharp(cutout)
    .resize(width, height, { kernel: 'lanczos3' })
    .toBuffer();
  const tileImage = await sharp(background)
    .composite([{ input: face, left: Math.round((size - width) / 2), top: 0 }])
    .png()
    .toBuffer();
  if (!rounded)
    return sharp(tileImage).flatten({ background: sky[1] }).png().toBuffer();
  // Clip the shoulders to the rounded corners.
  return sharp(tileImage)
    .composite([{ input: background, blend: 'dest-in' }])
    .png()
    .toBuffer();
}

function ico(images) {
  const header = Buffer.alloc(6 + images.length * 16);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = header.length;
  images.forEach(({ size, png }, index) => {
    const entry = 6 + index * 16;
    header.writeUInt8(size % 256, entry);
    header.writeUInt8(size % 256, entry + 1);
    header.writeUInt16LE(1, entry + 4);
    header.writeUInt16LE(32, entry + 6);
    header.writeUInt32LE(png.length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    offset += png.length;
  });
  return Buffer.concat([header, ...images.map(({ png }) => png)]);
}

const favicon = await Promise.all(
  [16, 32, 48].map(async size => ({
    size,
    png: await tile(size, { rounded: true }),
  })),
);
await fs.writeFile('app/favicon.ico', ico(favicon));
// The source head is about 110px wide, so larger icons would only blur it.
await fs.writeFile('app/icon.png', await tile(192, { rounded: true }));
// iOS applies its own mask, so the touch icon is an opaque full square.
await fs.writeFile('app/apple-icon.png', await tile(180, { rounded: false }));
console.log('Wrote app/favicon.ico, app/icon.png and app/apple-icon.png');
