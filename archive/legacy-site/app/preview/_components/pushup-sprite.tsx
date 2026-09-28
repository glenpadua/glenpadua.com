'use client';

import { AtlasCell, contactTransform, useSpriteSequence } from './atlas-sprite';

// Near palm and prosthetic shoe contact, measured in each 512px atlas cell.
const poses = [
  { cell: [0, 0], palm: [211, 444], toe: [464, 440], name: 'plank' },
  { cell: [1, 0], palm: [225, 444], toe: [465, 439], name: 'lowering' },
  { cell: [2, 0], palm: [242, 444], toe: [465, 439], name: 'mid-pushup' },
  { cell: [0, 1], palm: [245, 410], toe: [478, 405], name: 'low-pushup' },
] as const;
const sequence = [
  { pose: 0, duration: 1050 },
  { pose: 1, duration: 260 },
  { pose: 2, duration: 270 },
  { pose: 3, duration: 380 },
  { pose: 2, duration: 180 },
  { pose: 1, duration: 160 },
] as const;

export function PushupSprite({ moving }: { moving: boolean }): JSX.Element {
  const pose = poses[useSpriteSequence(sequence, moving)];
  return (
    <svg
      className="pushup-sprite"
      viewBox="0 0 540 380"
      aria-hidden="true"
      data-pose={pose.name}
    >
      <ellipse
        cx="287"
        cy="339"
        rx="224"
        ry="12"
        fill="#836d45"
        opacity=".17"
      />
      <g
        transform={contactTransform(
          pose.palm,
          pose.toe,
          [220, 330],
          [470, 330],
        )}
      >
        <AtlasCell src="/assets/diorama/pushup-atlas.webp" cell={pose.cell} />
      </g>
    </svg>
  );
}
