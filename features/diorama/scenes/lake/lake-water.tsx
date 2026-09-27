'use client';
import { useEffect, useRef } from 'react';
import { worldAsset } from '@/features/diorama/lib/assets';
import {
  lakePaintingSize,
  lakeWaterClip,
  lakeWaterRegion,
} from './water-config';
import { useMotionPolicy } from '@/features/diorama/shared/scene-motion';
import type { WaterSurface } from './lake-water-renderer';

interface LakeWaterProps {
  active: boolean;
}

export function LakeWater({ active }: LakeWaterProps): JSX.Element {
  const canvas = useRef<HTMLCanvasElement>(null);
  const surface = useRef<WaterSurface | null>(null);
  const running = useRef(false);
  const { enabled, reduced } = useMotionPolicy();

  useEffect(() => {
    running.current = enabled && active;
    surface.current?.setRunning(running.current);
  }, [active, enabled]);

  useEffect(() => {
    const element = canvas.current;
    if (!element || reduced) return;
    let cancelled = false;
    const controller = new AbortController();
    let instance: WaterSurface | undefined;
    const initialize = async () => {
      try {
        const { createLakeWater } = await import('./lake-water-renderer');
        if (cancelled) return;
        instance = await createLakeWater(
          element,
          worldAsset('lake-back'),
          controller.signal,
        );
        if (cancelled) {
          instance.dispose();
          return;
        }
        surface.current = instance;
        instance.setRunning(running.current);
      } catch {
        // The original painting remains underneath when WebGL is unavailable.
        if (!cancelled) element.dataset.waterState = 'fallback';
      }
    };
    void initialize();
    return () => {
      cancelled = true;
      controller.abort();
      surface.current = null;
      instance?.dispose();
    };
  }, [reduced]);

  return (
    <div
      className="lake-water"
      style={{ clipPath: lakeWaterClip }}
      aria-hidden="true"
    >
      <canvas
        ref={canvas}
        className="lake-water-canvas"
        data-water-state="fallback"
        style={{
          left: `${(lakeWaterRegion.left / lakePaintingSize.width) * 100}%`,
          top: `${(lakeWaterRegion.top / lakePaintingSize.height) * 100}%`,
          width: `${(lakeWaterRegion.width / lakePaintingSize.width) * 100}%`,
          height: `${(lakeWaterRegion.height / lakePaintingSize.height) * 100}%`,
        }}
      />
    </div>
  );
}
