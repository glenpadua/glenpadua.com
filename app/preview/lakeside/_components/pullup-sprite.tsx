'use client';

import { AtlasCell, useSpriteSequence } from '../../_components/atlas-sprite';

// Complete drawn poses, registered by the centre of each grip. No limb scaling,
// detached arms, mirroring, or procedural joint movement is applied to the art.
const poses = [
  { cell: [0, 0], left: [166, 133], right: [337, 133], name: 'hang' },
  { cell: [1, 0], left: [166, 180], right: [346, 180], name: 'pull' },
  { cell: [2, 0], left: [156, 208], right: [332, 208], name: 'upper-pull' },
  { cell: [2, 1], left: [162, 183], right: [335, 183], name: 'hold' },
] as const;

// A short, deliberate pixel-animation cycle: rest, pull, hold, slower lowering.
const sequence = [
  { pose: 0, duration: 1100 },
  { pose: 1, duration: 190 },
  { pose: 2, duration: 190 },
  { pose: 3, duration: 650 },
  { pose: 2, duration: 260 },
  { pose: 1, duration: 280 },
] as const;

export function PullupSprite({ moving }: { moving: boolean }): JSX.Element {
  const pose = poses[useSpriteSequence(sequence, moving)];
  const scale = 150 / (pose.right[0] - pose.left[0]);
  const x = 125 - pose.left[0] * scale;
  const y = 145 - pose.left[1] * scale;

  return (
    <svg
      className="pullup-sprite"
      viewBox="0 0 400 510"
      aria-hidden="true"
      data-pose={pose.name}
    >
      <defs>
        <clipPath id="front-grips">
          <rect x="108" y="128" width="34" height="30" />
          <rect x="258" y="128" width="34" height="30" />
        </clipPath>
        <linearGradient id="post-shading" x1="0" x2="1">
          <stop stopColor="#294f36" />
          <stop offset=".35" stopColor="#527444" />
          <stop offset="1" stopColor="#35583a" />
        </linearGradient>
        <linearGradient id="bar-shading" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#68825a" />
          <stop offset=".4" stopColor="#3d603d" />
          <stop offset="1" stopColor="#23482f" />
        </linearGradient>
      </defs>
      <ellipse
        cx="210"
        cy="486"
        rx="171"
        ry="13"
        fill="#294930"
        opacity=".14"
      />
      <ellipse cx="200" cy="480" rx="55" ry="8" fill="#233f28" opacity=".16" />
      <path d="M70 145H330" stroke="#2d4930" strokeWidth="16" />
      <path d="M70 142H330" stroke="url(#bar-shading)" strokeWidth="13" />
      <rect
        x="57"
        y="118"
        width="23"
        height="366"
        rx="3"
        fill="url(#post-shading)"
      />
      <rect
        x="320"
        y="118"
        width="23"
        height="366"
        rx="3"
        fill="url(#post-shading)"
      />
      <path
        d="M60 123V478M323 123V478"
        stroke="#88a06b"
        strokeWidth="2"
        opacity=".45"
      />
      <g transform={`translate(${x} ${y}) scale(${scale})`}>
        <AtlasCell src="/assets/diorama/pullup-atlas.webp" cell={pose.cell} />
      </g>
      {/* The bar occludes the torso/face, but the fingers wrap in front of it. */}
      <path d="M70 145H330" stroke="#2d4930" strokeWidth="16" />
      <path d="M70 142H330" stroke="url(#bar-shading)" strokeWidth="13" />
      <g clipPath="url(#front-grips)">
        <g transform={`translate(${x} ${y}) scale(${scale})`}>
          <AtlasCell src="/assets/diorama/pullup-atlas.webp" cell={pose.cell} />
        </g>
      </g>
      <path
        d="M51 483l-6-13m12 15 4-18m259 18-3-16m13 16 10-21m-270 21 9-12"
        stroke="#5d7649"
        strokeWidth="3"
      />
    </svg>
  );
}
