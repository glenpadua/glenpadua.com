import { lakePaintingSize } from './water-config.ts';

const point = (x: number, y: number) => ({
  x: (x / 100) * lakePaintingSize.width,
  y: (y / 100) * lakePaintingSize.height,
});

export const skippingStone = point(49, 75);
export const stoneContacts = [
  { ...point(54, 71.5), at: 520, radius: 43 },
  { ...point(58, 69.8), at: 920, radius: 34 },
  { ...point(61, 68.7), at: 1220, radius: 25 },
] as const;
export const stoneSkipDuration = 2320;

// The background layer scales about its lower centre; the stone control and
// its SVG share that exact painting transform, including on portrait stages.
export const stoneControlPosition = {
  left: `${50 + (49 - 50) * 1.035}%`,
  top: `${100 + (75 - 100) * 1.035}%`,
};

export function stoneSkipPose(elapsed: number) {
  const t = Math.max(0, elapsed);
  const stops = [{ ...skippingStone, at: 0 }, ...stoneContacts];
  for (let i = 1; i < stops.length; i++) {
    const from = stops[i - 1];
    const to = stops[i];
    if (t > to.at) continue;
    const u = (t - from.at) / (to.at - from.at);
    return {
      x: from.x + (to.x - from.x) * u,
      y: from.y + (to.y - from.y) * u - 4 * [32, 19, 10][i - 1] * u * (1 - u),
      scale: 1 - (i - 1 + u) * 0.17,
      rotation: -8 + Math.sin(u * Math.PI) * 18,
      opacity: 1,
    };
  }
  const last = stoneContacts.at(-1)!;
  return {
    x: last.x,
    y: last.y + Math.min(3, (t - last.at) / 30),
    scale: 0.49,
    rotation: -8,
    opacity: Math.max(0, 1 - (t - last.at) / 100),
  };
}

export function stoneRipplePose(elapsed: number, index: number) {
  const contact = stoneContacts[index];
  const age = elapsed - contact.at;
  const u = Math.max(0, Math.min(1, age / 1100));
  return {
    ...contact,
    radius: 3 + contact.radius * (1 - (1 - u) ** 2),
    opacity: age < 0 || age >= 1100 ? 0 : 0.75 * (1 - u) ** 1.3,
  };
}
