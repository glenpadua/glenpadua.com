// Painting-space coordinates shared by the renderer and mechanical art export.
export const CITY_ART = { width: 1536, height: 1024 } as const;
export const CITY_COUPLE_REGION = {
  left: 1100,
  top: 535,
  width: 320,
  height: 230,
} as const;
export const CITY_ATLAS = { columns: 5, rows: 2 } as const;
export const CITY_COUPLE_STYLE = {
  left: `${(CITY_COUPLE_REGION.left / CITY_ART.width) * 100}%`,
  top: `${(CITY_COUPLE_REGION.top / CITY_ART.height) * 100}%`,
  width: `${(CITY_COUPLE_REGION.width / CITY_ART.width) * 100}%`,
  height: `${(CITY_COUPLE_REGION.height / CITY_ART.height) * 100}%`,
};
