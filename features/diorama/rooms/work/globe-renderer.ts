import { GLOBE_TILT, projectPlace, type GlobePlace } from './globe-motion';

/** A tiny orthographic sphere. Precompute its projection once; repaint only
 * during direct manipulation or a short coast. No WebGL or idle render loop. */
export function createGlobeRenderer(
  canvas: HTMLCanvasElement,
  map: ImageData,
  places: readonly GlobePlace[] = [],
  visited: readonly GlobePlace[] = [],
) {
  const size = 160;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  const frame = ctx.createImageData(size, size);
  const pixels: { index: number; u: number; row: number; shade: number }[] = [];
  const tilt = GLOBE_TILT;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const nx = ((x + 0.5) / size) * 2 - 1;
      const ny = ((y + 0.5) / size) * 2 - 1;
      const radius = Math.hypot(nx, ny);
      if (radius >= 1) continue;
      const nz = Math.sqrt(1 - radius * radius);
      const tx = nx * Math.cos(tilt) + ny * Math.sin(tilt);
      const ty = -nx * Math.sin(tilt) + ny * Math.cos(tilt);
      const u = Math.atan2(tx, nz) / (2 * Math.PI) + 0.5;
      const v = Math.asin(ty) / Math.PI + 0.5;
      const index = (y * size + x) * 4;
      frame.data[index + 3] = Math.min(255, (1 - radius) * size * 255);
      pixels.push({
        index,
        u,
        row: Math.min(map.height - 1, Math.floor(v * map.height)),
        shade: 0.59 + 0.47 * Math.max(0, -0.48 * nx - 0.48 * ny + 0.73 * nz),
      });
    }
  }
  // Map pins: a small painted head with a highlight, fading at the limb.
  const pin = (x: number, y: number, depth: number, current: boolean) => {
    const r = current ? 4.4 : 3.2;
    ctx.globalAlpha = Math.min(1, depth * 3);
    ctx.fillStyle = '#3a1e1266';
    ctx.beginPath();
    ctx.arc(x + 1, y + 1.4, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = current ? '#d24a2e' : '#b8402a';
    ctx.strokeStyle = '#6e2014';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#f6c3a8';
    ctx.beginPath();
    ctx.arc(x - r * 0.35, y - r * 0.35, r * 0.34, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  };
  // Places visited: a small, quiet dot beneath the lived-in pins.
  const dot = (x: number, y: number, depth: number) => {
    ctx.globalAlpha = Math.min(1, depth * 3) * 0.9;
    ctx.fillStyle = '#8a4a32';
    ctx.strokeStyle = '#f3e3c4';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.arc(x, y, 1.7, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.globalAlpha = 1;
  };
  return (angle: number, current = -1) => {
    const offset = angle / (2 * Math.PI);
    for (const pixel of pixels) {
      const u = (((pixel.u + offset) % 1) + 1) % 1;
      const source = (pixel.row * map.width + Math.floor(u * map.width)) * 4;
      for (let channel = 0; channel < 3; channel++) {
        frame.data[pixel.index + channel] =
          map.data[source + channel] * pixel.shade;
      }
    }
    ctx.putImageData(frame, 0, 0);
    for (const place of visited) {
      const p = projectPlace(angle, place.lat, place.lon);
      if (p.depth > 0.05)
        dot(((p.x + 1) / 2) * size, ((p.y + 1) / 2) * size, p.depth);
    }
    places.forEach((place, i) => {
      const p = projectPlace(angle, place.lat, place.lon);
      if (p.depth > 0.05)
        pin(
          ((p.x + 1) / 2) * size,
          ((p.y + 1) / 2) * size,
          p.depth,
          i === current,
        );
    });
  };
}
