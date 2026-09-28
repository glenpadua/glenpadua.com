// Renders the lake's ridge-and-pine silhouette (scenes/lake/horizon.ts) into
// the alpha mask the page uses. A raster mask is decoded once; the SVG's erode
// filter was re-run on every repaint and blanked the lake while scrolling.
// Re-run after changing the ridge or the pines:
//   node scripts/lake-horizon-mask.mjs
import sharp from 'sharp';
import { lakeHorizonMaskSvg } from '../features/diorama/scenes/lake/horizon.ts';

export const lakeHorizonMaskFile =
  'public/assets/world/lake-horizon-mask-v1.webp';

// Twice the painting's 1536 × 1024, so the ridge stays crisp on retina screens.
export function renderLakeHorizonMask() {
  return sharp(Buffer.from(lakeHorizonMaskSvg), { density: 144 }).ensureAlpha();
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const info = await renderLakeHorizonMask()
    .webp({ lossless: true, effort: 6 })
    .toFile(lakeHorizonMaskFile);
  console.log(
    `${lakeHorizonMaskFile}: ${info.width} × ${info.height}, ${info.size} bytes`,
  );
}
