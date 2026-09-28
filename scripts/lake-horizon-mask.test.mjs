// The page masks the lake with a pre-rendered copy of horizon.ts's silhouette.
// Editing the ridge or pines without re-running the script would let the sky
// mask drift away from the animated pines drawn from the same paths.
import test from 'node:test';
import assert from 'node:assert/strict';
import sharp from 'sharp';
import {
  lakeHorizonMaskFile,
  renderLakeHorizonMask,
} from './lake-horizon-mask.mjs';

test('the lake horizon mask matches its source geometry', async () => {
  const alpha = image => image.extractChannel(3).raw().toBuffer();
  const [fresh, committed] = await Promise.all([
    alpha(renderLakeHorizonMask()),
    alpha(sharp(lakeHorizonMaskFile).ensureAlpha()),
  ]);
  assert.ok(
    fresh.equals(committed),
    'Run `node scripts/lake-horizon-mask.mjs` after editing scenes/lake/horizon.ts.',
  );
});
