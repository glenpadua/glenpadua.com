const TAU = Math.PI * 2;
export const wrapAngle = (angle: number) => ((angle % TAU) + TAU) % TAU;

export function advanceGlobe(angle: number, velocity: number, seconds: number) {
  const decay = Math.exp(-2.8 * Math.max(0, Math.min(seconds, 0.05)));
  const nextVelocity = velocity * decay;
  return {
    angle: wrapAngle(angle + (velocity * (1 - decay)) / 2.8),
    velocity: Math.abs(nextVelocity) < 0.006 ? 0 : nextVelocity,
  };
}

export function dragRotation(delta: number, diameter: number) {
  return (delta / Math.max(diameter, 44)) * Math.PI;
}

export function releaseVelocity(deltaAngle: number, elapsedMs: number) {
  return Math.max(
    -7,
    Math.min(7, deltaAngle / (Math.max(16, elapsedMs) / 1000)),
  );
}

/** Axial tilt the renderer draws with; places are projected with the same. */
export const GLOBE_TILT = (18 * Math.PI) / 180;

export interface GlobePlace {
  name: string;
  lat: number;
  lon: number;
  note?: string;
}

/** The globe angle at which a longitude faces the viewer. */
export const facingAngle = (lon: number) => wrapAngle((lon * Math.PI) / 180);

/**
 * A place on the unit disc at a globe angle: x/y in −1…1 (screen axes),
 * depth > 0 on the visible hemisphere. Mirrors `createGlobeRenderer`.
 */
export function projectPlace(angle: number, lat: number, lon: number) {
  const theta = ((lon + 180) / 360 - angle / TAU - 0.5) * TAU;
  const latitude = (lat * Math.PI) / 180;
  const ring = Math.cos(latitude);
  const tx = ring * Math.sin(theta);
  const ty = -Math.sin(latitude);
  return {
    x: tx * Math.cos(GLOBE_TILT) - ty * Math.sin(GLOBE_TILT),
    y: tx * Math.sin(GLOBE_TILT) + ty * Math.cos(GLOBE_TILT),
    depth: ring * Math.cos(theta),
  };
}

/**
 * The place whose meridian faces the viewer (within ~20°), if any. Latitude
 * does not count against it: far-north and far-south places still qualify.
 */
export function facingPlace(angle: number, places: readonly GlobePlace[]) {
  let best = -1;
  let bestAlignment = Math.cos((20 * Math.PI) / 180);
  places.forEach((place, i) => {
    const alignment = Math.cos((place.lon * Math.PI) / 180 - angle);
    if (alignment > bestAlignment) {
      best = i;
      bestAlignment = alignment;
    }
  });
  return best;
}

/** The place whose meridian is closest to facing the viewer. */
export function nearestPlace(angle: number, places: readonly GlobePlace[]) {
  let best = 0;
  places.forEach((place, i) => {
    const alignment = (lon: number) => Math.cos((lon * Math.PI) / 180 - angle);
    if (alignment(place.lon) > alignment(places[best].lon)) best = i;
  });
  return best;
}

/** Eased travel for a spin that lands on a place after one extra turn. */
export const landingEase = (t: number) => 1 - Math.pow(1 - Math.min(1, t), 3);
