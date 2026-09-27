export interface WorldHotspot {
  id: string;
  label: string;
  href: string;
  x: number;
  y: number;
}
export interface WorldLayer {
  id: string;
  asset: string;
  depth: number;
  x?: number;
  y?: number;
  width?: number;
  responsive?: boolean;
  /** Optional painting-space silhouette revealing the shared sky. */
  mask?: string;
}
export interface WorldScene {
  id: string;
  name: string;
  eyebrow: string;
  title: readonly string[];
  body?: readonly string[];
  description: string;
  sky: string;
  /** Position in the shared day: 0 dawn, .45 noon, 1 night. */
  skyTime?: number;
  /** Sun's initial contact with the ridge, in background-painting percent. */
  sunrise?: { x: number; y: number };
  mobile: { width: number; left: number };
  layers: readonly WorldLayer[];
  hotspots: readonly WorldHotspot[];
}
