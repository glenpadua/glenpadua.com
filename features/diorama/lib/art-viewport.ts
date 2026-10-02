export interface ArtViewport {
  width: number;
  height: number;
  visibleBottom: number;
  inset: number;
}

/** Keep the painting above browser chrome without moving it on every swipe. */
export function artViewport(
  previous: ArtViewport | undefined,
  stage: { width: number; height: number },
  visible: { height: number; offsetTop: number; scale: number },
): ArtViewport | undefined {
  // Pinch zoom pans a smaller visual viewport over the existing composition.
  if (
    Math.abs(visible.scale - 1) > 0.01 ||
    ![
      stage.width,
      stage.height,
      visible.height,
      visible.offsetTop,
      visible.scale,
    ].every(Number.isFinite) ||
    stage.width <= 0 ||
    stage.height <= 0 ||
    visible.height <= 0
  ) {
    return undefined;
  }

  const bottom = Math.min(stage.height, visible.height + visible.offsetTop);
  const sameStage =
    previous?.width === stage.width && previous.height === stage.height;
  // Remember the smallest visible area while the toolbar folds away. Rotation
  // or a window resize starts a fresh measurement for the new composition.
  const visibleBottom = sameStage
    ? Math.min(previous.visibleBottom, bottom)
    : bottom;
  return {
    width: stage.width,
    height: stage.height,
    visibleBottom,
    inset: Math.max(0, stage.height - visibleBottom),
  };
}
