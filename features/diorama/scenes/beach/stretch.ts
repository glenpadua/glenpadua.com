// Painting-space boundary for the connected head, neck, shoulders and arms.
// Its lower/right edge follows the original laptop and seated legs, keeping
// those props and the rest of the umbrella/sand fixed throughout the routine.
export const STRETCH_SIZE = 900;
// Crop the served poses to this rectangle; invisible lower-body pixels and
// transparent margins need not be downloaded or decoded on every visit.
export const STRETCH_BOUNDS = {
  left: 300,
  top: 274,
  width: 400,
  height: 456,
} as const;
export const STRETCH_STYLE = {
  inset: 'auto',
  left: `${(STRETCH_BOUNDS.left / STRETCH_SIZE) * 100}%`,
  top: `${(STRETCH_BOUNDS.top / STRETCH_SIZE) * 100}%`,
  width: `${(STRETCH_BOUNDS.width / STRETCH_SIZE) * 100}%`,
  height: `${(STRETCH_BOUNDS.height / STRETCH_SIZE) * 100}%`,
};
export const STRETCH_REGION = [
  [300, 520],
  [300, 405],
  [312, 343],
  [350, 295],
  [406, 274],
  [470, 274],
  [536, 295],
  [583, 333],
  [604, 388],
  [600, 457],
  [700, 462],
  [700, 550],
  [674, 549],
  [540, 557],
  [535, 563],
  [506, 659],
  [475, 655],
  [428, 657],
  [403, 664],
  [379, 679],
  [362, 704],
  [352, 730],
  [328, 730],
  [332, 675],
  [300, 667],
] as const;

export function stretchPath(size = STRETCH_SIZE) {
  return (
    STRETCH_REGION.map(
      ([x, y], i) => `${i ? 'L' : 'M'}${x / size} ${y / size}`,
    ).join(' ') + 'Z'
  );
}
