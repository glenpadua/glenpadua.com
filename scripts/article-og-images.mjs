// Writes a 1200×630 JPEG link-preview card beside each article cover
// (`<uid>-v1-og.jpg`). WebP covers are not shown by every social network.
// Re-run after adding or changing a cover:
//   node scripts/article-og-images.mjs
import sharp from 'sharp';
import fs from 'node:fs/promises';

const dir = 'public/assets/world/articles';
for (const name of await fs.readdir(dir)) {
  const match = name.match(/^(.+-v\d+)\.webp$/);
  if (!match) continue;
  const out = `${dir}/${match[1]}-og.jpg`;
  await sharp(`${dir}/${name}`)
    .resize(1200, 630, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(out);
  console.log(out);
}
