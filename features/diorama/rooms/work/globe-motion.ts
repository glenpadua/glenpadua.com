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
