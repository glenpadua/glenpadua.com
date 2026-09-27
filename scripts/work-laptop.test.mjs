import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const css = readFileSync(
  'features/diorama/rooms/work/slack-profile.module.css',
  'utf8',
);
const blocks = [...css.matchAll(/:global\(\.world\) \.screen\s*\{([^}]+)\}/g)];
const paintings = [
  {
    name: 'desktop',
    size: [1536, 1024],
    corners: [
      [225, 486],
      [433, 464],
      [453, 606],
      [246, 639],
    ],
  },
  {
    name: 'portrait',
    size: [800, 1600],
    corners: [
      [29, 670],
      [139, 651],
      [158, 760],
      [49, 786],
    ],
  },
];

for (const [index, { name, size, corners }] of paintings.entries()) {
  test(`${name} laptop UI stays on the four painted glass corners at different scales`, () => {
    const block = blocks[index][1];
    const percent = property =>
      Number(block.match(new RegExp(`${property}:\\s*([\\d.]+)%`))[1]) / 100;
    const matrix = block
      .match(/matrix3d\(([^)]+)\)/)[1]
      .split(',')
      .map(Number);
    assert.match(
      block,
      /perspective\(100cqw\)/,
      'Perspective must resize with the painting.',
    );
    for (const scale of [0.25, 0.6, 1, 1.5]) {
      const [stageWidth, stageHeight] = size.map(value => value * scale);
      const width = percent('width') * stageWidth;
      const height = percent('height') * stageHeight;
      for (const [corner, [x, y]] of [
        [0, 0],
        [width, 0],
        [width, height],
        [0, height],
      ].entries()) {
        const depth = matrix[2] * x + matrix[6] * y;
        const divisor = 1 - depth / stageWidth;
        const projected = [
          percent('left') * stageWidth +
            (matrix[0] * x + matrix[4] * y) / divisor,
          percent('top') * stageHeight +
            (matrix[1] * x + matrix[5] * y) / divisor,
        ];
        const error = Math.hypot(
          ...projected.map(
            (value, axis) => value - corners[corner][axis] * scale,
          ),
        );
        assert.ok(
          error < 0.01,
          `${name} corner ${corner} misses the glass by ${error}px at scale ${scale}`,
        );
      }
    }
  });
}
