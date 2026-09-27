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
  x?: number;
  y?: number;
  width?: number;
  responsive?: boolean;
  /** Optional painting-space silhouette revealing the shared sky. */
  mask?: string;
}
/** Shaped edges defined in `shared/scene-wipe.css`; `fade` is the default. */
export type SceneEntrance = 'fade' | 'tide' | 'dusk';
export interface WorldScene {
  id: string;
  name: string;
  eyebrow?: string;
  title: readonly string[];
  /** Paragraphs wrap naturally; title lines may still be art-directed. */
  body?: readonly string[];
  discovery?:
    | { label: string; href: string }
    | { label: string; title: string; paragraphs: readonly string[] };
  description: string;
  sky: string;
  /** Position in the shared day: 0 dawn, .45 noon, 1 night. */
  skyTime?: number;
  /** Sun's initial contact with the ridge, in background-painting percent. */
  sunrise?: { x: number; y: number };
  mobile: { width: number; left: number };
  /** How this chapter uncovers the previous one while scrolling. */
  entrance?: SceneEntrance;
  layers: readonly WorldLayer[];
  hotspots: readonly WorldHotspot[];
}
