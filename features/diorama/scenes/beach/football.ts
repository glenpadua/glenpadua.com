/** A sole roll: the right foot stays planted; the left leg has rigid links. */
export const FOOTBALL = {
  hip: { x: 273, y: 298 },
  knee: { x: 320, y: 343 },
  ankle: { x: 349, y: 386 },
  ball: { x: 390, y: 434, radius: 43 },
  duration: 2.8,
};

export function footballPose(progress: number) {
  const p = Math.max(0, Math.min(1, progress));
  const roll = -34 * Math.sin(Math.PI * p) ** 2;
  const { hip, knee, ankle, ball } = FOOTBALL;
  const target = { x: ankle.x + roll, y: ankle.y };
  const upper = Math.hypot(knee.x - hip.x, knee.y - hip.y);
  const lower = Math.hypot(ankle.x - knee.x, ankle.y - knee.y);
  const dx = target.x - hip.x;
  const dy = target.y - hip.y;
  const distance = Math.hypot(dx, dy);
  const along = (upper ** 2 - lower ** 2 + distance ** 2) / (2 * distance);
  const across = Math.sqrt(Math.max(0, upper ** 2 - along ** 2));
  const joint = {
    x: hip.x + (along * dx + across * dy) / distance,
    y: hip.y + (along * dy - across * dx) / distance,
  };
  const angle = (x: number, y: number) => (Math.atan2(y, x) * 180) / Math.PI;
  return {
    roll,
    knee: joint,
    ankle: target,
    upperAngle:
      angle(joint.x - hip.x, joint.y - hip.y) -
      angle(knee.x - hip.x, knee.y - hip.y),
    lowerAngle:
      angle(target.x - joint.x, target.y - joint.y) -
      angle(ankle.x - knee.x, ankle.y - knee.y),
    ballAngle: (roll / ball.radius) * (180 / Math.PI),
  };
}
