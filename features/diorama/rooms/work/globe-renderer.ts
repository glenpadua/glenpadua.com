/** A tiny orthographic sphere. Precompute its projection once; repaint only
 * during direct manipulation or a short coast. No WebGL or idle render loop. */
export function createGlobeRenderer(canvas: HTMLCanvasElement, map: ImageData) {
  const size = 160;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  const frame = ctx.createImageData(size, size);
  const pixels: { index: number; u: number; row: number; shade: number }[] = [];
  const tilt = (18 * Math.PI) / 180;
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
  return (angle: number) => {
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
  };
}
