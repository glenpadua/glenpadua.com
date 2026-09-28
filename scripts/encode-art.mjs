// Encodes the approved paintings in art-source/world/ into the web copies the
// site serves from public/assets/world/. The sources stay untouched; the web
// copies are lossy WebP at a visually lossless setting (PSNR ≥ 45 dB composited)
// with lossless alpha, so masks and edges keep their exact shape.
//   node scripts/encode-art.mjs            encode sources newer than their copy
//   node scripts/encode-art.mjs --adopt    move large public images into sources first
import sharp from 'sharp';
import fs from 'node:fs/promises';
import { execFileSync } from 'node:child_process';

const sources = 'art-source/world';
const web = 'public/assets/world';
const LARGE = 150 * 1024;

await fs.mkdir(sources, { recursive: true });
if (process.argv.includes('--adopt')) {
  for (const name of await fs.readdir(web)) {
    if (!name.endsWith('.webp')) continue;
    const { size } = await fs.stat(`${web}/${name}`);
    if (size < LARGE) continue;
    // git mv keeps the approved file's history with the source.
    execFileSync('git', ['mv', `${web}/${name}`, `${sources}/${name}`]);
  }
}

for (const name of (await fs.readdir(sources)).sort()) {
  if (!name.endsWith('.webp')) continue;
  const from = `${sources}/${name}`;
  const to = `${web}/${name}`;
  const source = await fs.stat(from);
  const copy = await fs.stat(to).catch(() => null);
  if (copy && copy.mtimeMs >= source.mtimeMs) continue;
  const encoded = await sharp(from)
    .webp({ quality: 86, alphaQuality: 100, effort: 6, smartSubsample: true })
    .toBuffer();
  // Keep whichever is smaller: some small paintings are already compact.
  const original = await fs.readFile(from);
  await fs.writeFile(to, encoded.length < original.length ? encoded : original);
  console.log(
    `${name}: ${Math.round(source.size / 1024)}K → ${Math.round(Math.min(encoded.length, original.length) / 1024)}K`,
  );
}
