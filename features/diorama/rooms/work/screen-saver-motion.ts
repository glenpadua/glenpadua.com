export interface SaverPosition {
  x: number;
  y: number;
  dx: number;
  dy: number;
}

// Resolve contacts within half a CSS pixel as one corner, snapping both
// edges together. Larger near-misses are ordinary, separate wall bounces.
const CONTACT_EPSILON = 0.5;

/** Advance to each collision before spending the rest of the frame's travel. */
export function advanceSaver(
  position: SaverPosition,
  width: number,
  height: number,
  speed: number,
  seconds: number,
): { position: SaverPosition; bounces: number; corners: number } {
  if (width < 1 || height < 1 || speed <= 0 || seconds <= 0) {
    return { position, bounces: 0, corners: 0 };
  }
  let { dx, dy } = position;
  let px = position.x * width;
  let py = position.y * height;
  let remaining = speed * Math.min(seconds, 0.05);
  let bounces = 0;
  let corners = 0;
  while (remaining > 1e-9) {
    const toX = dx > 0 ? width - px : px;
    const toY = dy > 0 ? height - py : py;
    const contact = Math.min(toX, toY);
    const travel = Math.min(contact, remaining);
    px += dx * travel;
    py += dy * travel;
    remaining -= travel;
    if (contact > travel + 1e-9) break;

    const hitX = toX - contact <= CONTACT_EPSILON;
    const hitY = toY - contact <= CONTACT_EPSILON;
    if (hitX) {
      px = dx > 0 ? width : 0;
      dx *= -1;
    }
    if (hitY) {
      py = dy > 0 ? height : 0;
      dy *= -1;
    }
    bounces++;
    if (hitX && hitY) corners++;
  }
  return {
    position: { x: px / width, y: py / height, dx, dy },
    bounces,
    corners,
  };
}
