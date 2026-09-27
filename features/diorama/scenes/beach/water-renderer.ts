import * as THREE from 'three';

export async function createBeachWater(
  canvas: HTMLCanvasElement,
  source: string,
) {
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      powerPreference: 'low-power',
    });
  } catch {
    return null;
  }
  let texture: THREE.Texture;
  try {
    texture = await new THREE.TextureLoader().loadAsync(source);
  } catch {
    renderer.dispose();
    return null;
  }
  texture.minFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  const material = new THREE.ShaderMaterial({
    uniforms: { painting: { value: texture }, time: { value: 0 } },
    vertexShader: `varying vec2 uvPaint; void main(){ uvPaint=uv; gl_Position=vec4(position.xy,0.,1.); }`,
    fragmentShader: `
      uniform sampler2D painting;
      uniform float time;
      varying vec2 uvPaint;
      void main() {
        vec2 p=vec2(uvPaint.x,1.-uvPaint.y);
        // Beach-specific curve follows the painted crescent from the far cove.
        float shore=.627+.19*pow(max(p.x,0.),.78);
        float nearShore=exp(-pow((p.y-shore)/.048,2.));
        float cove=smoothstep(.04,.24,p.x);
        float sea=smoothstep(.568,.61,p.y)*(1.-smoothstep(shore+.014,shore+.047,p.y))*cove;
        // Long, shallow strokes: no caustics, specular highlights or noise field.
        float tide=sin(time*.78+p.x*2.4);
        float wash=nearShore*tide*.0055;
        float ripple=sin(p.y*225.+time*.72+p.x*4.)*.00065;
        vec2 sampleUV=uvPaint;
        sampleUV.y+=(wash+ripple)*sea;
        sampleUV.x+=sin(time*.49+p.y*130.)*.00045*sea*(1.-nearShore);
        gl_FragColor=texture2D(painting,sampleUV);
      }`,
    depthTest: false,
    depthWrite: false,
  });
  const geometry = new THREE.PlaneGeometry(2, 2);
  const scene = new THREE.Scene();
  scene.add(new THREE.Mesh(geometry, material));
  const camera = new THREE.Camera();
  let frame = 0;
  let previous = 0;
  let moving = false;
  let disposed = false;
  let lost = false;
  const render = () => {
    if (lost) return;
    renderer.render(scene, camera);
    canvas.dataset.ready = 'true';
  };
  const resize = () => {
    const width = Math.min(canvas.clientWidth, 1536);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(width, (width * 2) / 3, false);
    render();
  };
  const tick = (now: number) => {
    if (!moving || disposed || lost) return;
    material.uniforms.time.value += previous
      ? Math.min((now - previous) / 1000, 0.05)
      : 0;
    previous = now;
    render();
    frame = requestAnimationFrame(tick);
  };
  const setMoving = (value: boolean) => {
    moving = value && !document.hidden;
    cancelAnimationFrame(frame);
    previous = 0;
    if (moving && !disposed && !lost) frame = requestAnimationFrame(tick);
  };
  const contextLost = (event: Event) => {
    event.preventDefault();
    lost = true;
    setMoving(false);
    delete canvas.dataset.ready;
  };
  const observer = new ResizeObserver(resize);
  observer.observe(canvas);
  canvas.addEventListener('webglcontextlost', contextLost);
  resize();
  return {
    setMoving,
    dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      canvas.removeEventListener('webglcontextlost', contextLost);
      delete canvas.dataset.ready;
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    },
  };
}
