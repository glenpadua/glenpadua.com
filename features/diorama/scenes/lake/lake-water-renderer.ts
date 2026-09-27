import {
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  SRGBColorSpace,
  TextureLoader,
  Vector2,
  Vector4,
  WebGLRenderer,
} from 'three';
import {
  lakePaintingSize,
  lakeShoreline,
  lakeWaterRegion,
} from './water-config';
import {
  lakeWaterFragmentShader,
  lakeWaterVertexShader,
} from './lake-water-shader';

export interface WaterSurface {
  setRunning: (running: boolean) => void;
  dispose: () => void;
}

export async function createLakeWater(
  canvas: HTMLCanvasElement,
  paintingUrl: string,
  signal: AbortSignal,
): Promise<WaterSurface> {
  // Fetch before allocating a context; a failed asset leaves the painting intact.
  const texture = await new TextureLoader().loadAsync(paintingUrl);
  if (signal.aborted) {
    texture.dispose();
    throw new DOMException('Water initialization cancelled', 'AbortError');
  }
  texture.colorSpace = SRGBColorSpace;
  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: 'low-power',
    });
  } catch (error) {
    texture.dispose();
    throw error;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setClearColor(0x000000, 0);
  const material = new ShaderMaterial({
    vertexShader: lakeWaterVertexShader,
    fragmentShader: lakeWaterFragmentShader,
    uniforms: {
      uPainting: { value: texture },
      uPaintingSize: {
        value: new Vector2(lakePaintingSize.width, lakePaintingSize.height),
      },
      uRegion: {
        value: new Vector4(
          lakeWaterRegion.left,
          lakeWaterRegion.top,
          lakeWaterRegion.width,
          lakeWaterRegion.height,
        ),
      },
      uShore: {
        value: lakeShoreline.map(
          ([x, y]) =>
            new Vector2(
              (x * lakePaintingSize.width) / 100,
              (y * lakePaintingSize.height) / 100,
            ),
        ),
      },
      uTime: { value: 0 },
    },
    transparent: true,
    depthTest: false,
    depthWrite: false,
  });
  const geometry = new PlaneGeometry(2, 2);
  const scene = new Scene();
  scene.add(new Mesh(geometry, material));
  const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
  let requested = false;
  let contextReady = true;
  let failed = false;
  let disposed = false;
  let frame = 0;
  let previous = 0;
  const stop = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    previous = 0;
  };
  renderer.debug.onShaderError = () => {
    failed = true;
    stop();
    canvas.dataset.waterState = 'fallback';
  };
  const draw = () => {
    if (disposed || failed || !contextReady) return;
    renderer.render(scene, camera);
    if (!failed) {
      const state = requested ? 'running' : 'paused';
      if (canvas.dataset.waterState !== state)
        canvas.dataset.waterState = state;
    }
  };
  const tick = (now: number) => {
    frame = 0;
    if (!requested || disposed || failed || !contextReady) return;
    if (!previous) previous = now;
    const elapsed = now - previous;
    // Held painted frames belong with the scene's limited character animation.
    // Keep elapsed time continuous while drawing at an illustrated cadence.
    if (elapsed >= 1000 / 10) {
      material.uniforms.uTime.value += Math.min(elapsed / 1000, 0.15);
      previous = now;
      draw();
    }
    if (!failed) frame = requestAnimationFrame(tick);
  };
  const setRunning = (running: boolean) => {
    requested = running;
    stop();
    if (disposed || failed || !contextReady) return;
    canvas.dataset.waterState = running ? 'running' : 'paused';
    if (running) frame = requestAnimationFrame(tick);
  };
  const resize = () => {
    if (disposed || !contextReady) return;
    renderer.setSize(
      Math.max(1, canvas.clientWidth),
      Math.max(1, canvas.clientHeight),
      false,
    );
    draw();
  };
  const lost = (event: Event) => {
    event.preventDefault();
    contextReady = false;
    stop();
    canvas.dataset.waterState = 'fallback';
  };
  const restored = () => {
    contextReady = true;
    resize();
    setRunning(requested);
  };
  canvas.addEventListener('webglcontextlost', lost);
  canvas.addEventListener('webglcontextrestored', restored);
  const observer = new ResizeObserver(resize);
  observer.observe(canvas);
  resize();
  return {
    setRunning,
    dispose: () => {
      disposed = true;
      stop();
      observer.disconnect();
      canvas.removeEventListener('webglcontextlost', lost);
      canvas.removeEventListener('webglcontextrestored', restored);
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
      canvas.dataset.waterState = 'fallback';
    },
  };
}
