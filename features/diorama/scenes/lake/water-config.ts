export const lakePaintingSize = { width: 1536, height: 1024 };

// Percent coordinates of the approved, inset shoreline. Both the CSS safety
// clip and the shader's feathered edge are derived from this one boundary.
export const lakeShoreline = [
  [50.78, 66.21],
  [70.96, 66.21],
  [67.05, 67.77],
  [63.28, 69.34],
  [58.59, 71.58],
  [53.77, 72.65],
  [49.02, 72.36],
  [42.71, 71.09],
  [37.89, 69.63],
  [49.94, 69.14],
  [50.78, 67.77],
] as const;

export const lakeWaterClip = `polygon(${lakeShoreline.map(([x, y]) => `${x}% ${y}%`).join(', ')})`;
export const lakeWaterRegion = { left: 560, top: 664, width: 560, height: 90 };
