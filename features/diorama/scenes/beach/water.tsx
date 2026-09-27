'use client';
import { useEffect, useRef } from 'react';
import { worldAsset } from '../../lib/assets';

/** A small UV wash of the original painting, mounted in the background layer. */
export function BeachWater({
  moving,
  load,
}: {
  moving: boolean;
  load: boolean;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const runtime = useRef<{ setMoving: (value: boolean) => void } | null>(null);
  const enabled = useRef(moving);
  useEffect(() => {
    enabled.current = moving;
    runtime.current?.setMoving(moving);
  }, [moving]);
  useEffect(() => {
    const element = canvas.current;
    if (!element || !load) return;
    let disposed = false;
    let cleanup = () => {};
    void import('./water-renderer')
      .then(async ({ createBeachWater }) => {
        if (disposed) return;
        const result = await createBeachWater(
          element,
          worldAsset('beach-back'),
        );
        if (!result) return;
        if (disposed) {
          result.dispose();
          return;
        }
        runtime.current = result;
        cleanup = result.dispose;
        result.setMoving(enabled.current);
      })
      .catch(() => {
        /* The complete painting remains underneath. */
      });
    return () => {
      disposed = true;
      runtime.current = null;
      cleanup();
    };
  }, [load]);
  return <canvas ref={canvas} className="beach-water" aria-hidden="true" />;
}
