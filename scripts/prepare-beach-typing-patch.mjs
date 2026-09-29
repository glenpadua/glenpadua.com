// Mechanical crop of the approved keypress; no regenerated artwork.
import sharp from 'sharp';
import { TYPING_PATCH } from '../features/diorama/scenes/beach/typing.ts';

const { left, top, right, bottom } = TYPING_PATCH;
await sharp('public/assets/world/beach-typing-focused-tap.webp')
  .extract({ left, top, width: right - left, height: bottom - top })
  .webp({ lossless: true })
  .toFile('art-source/world/beach-typing-tap-crop-v1.webp');
