export const lakeWaterVertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

export const lakeWaterFragmentShader = /* glsl */ `
  uniform sampler2D uPainting;
  uniform vec2 uPaintingSize;
  uniform vec4 uRegion;
  uniform vec2 uShore[11];
  uniform float uTime;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0)), f.x), f.y);
  }
  float waterEdge(vec2 p, out float bankDistance) {
    float distanceToBank = 10000.0;
    bool inside = false;
    for (int i = 0; i < 11; i++) {
      vec2 a = uShore[i];
      vec2 b = uShore[i == 10 ? 0 : i + 1];
      vec2 ab = b - a;
      float along = clamp(dot(p - a, ab) / dot(ab, ab), 0.0, 1.0);
      distanceToBank = min(distanceToBank, length(p - a - ab * along));
      if ((a.y > p.y) != (b.y > p.y)) {
        if (p.x < (b.x - a.x) * (p.y - a.y) / (b.y - a.y) + a.x)
          inside = !inside;
      }
    }
    bankDistance = distanceToBank;
    return inside ? smoothstep(0.0, 10.0, distanceToBank) : 0.0;
  }
  vec3 paint(vec2 p) {
    return texture2D(uPainting, vec2(p.x, uPaintingSize.y - p.y) / uPaintingSize).rgb;
  }
  void main() {
    vec2 p = uRegion.xy + vec2(vUv.x, 1.0 - vUv.y) * uRegion.zw;
    float bankDistance;
    float edge = waterEdge(p, bankDistance);
    if (edge < 0.001) discard;

    // Move the original brushwork, rather than drawing separate ripple marks.
    float irregularity = noise(vec2(p.x * 0.012, p.y * 0.035));
    float swell = sin(p.y * 0.18 + uTime * 1.0 + irregularity * 1.1);
    float crossWave = sin(p.x * 0.014 + p.y * 0.12 - uTime * 0.7);
    // Broad horizontal brush strokes keep their shape. Avoid liquid-looking
    // eddies, normal-map lighting and the vertical wobble of realistic water.
    // Horizontal-only motion disappears along the painting's long strokes.
    // A small rise and fall makes those existing reflections readable at
    // scene scale, without adding separate marks or animated lighting.
    vec2 flow = vec2(11.0 * swell + 2.0 * crossWave, 3.0 * crossWave);
    flow *= min(1.0, bankDistance * 0.65 / max(length(flow), 0.001));
    vec2 displaced = p + flow * edge;
    vec3 color = paint(displaced);
    float blur = min(5.0, bankDistance * 0.25);
    vec3 localAverage = (paint(displaced + vec2(0.0, blur))
                      + paint(displaced - vec2(0.0, blur))) * 0.5;
    // Bring out the painting's own reflected light without introducing lines.
    color = mix(color, color + (color - localAverage) * 0.7, edge);
    gl_FragColor = vec4(clamp(color, 0.0, 1.0), edge);
    #include <colorspace_fragment>
  }
`;
