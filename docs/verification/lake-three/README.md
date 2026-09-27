# Illustrated lake water with Three.js · 27 September 2026

Three.js 0.186.1 is introduced as a dynamically imported, lake-only renderer. One transparent canvas samples the original `lake-back.webp`; it occupies only the 560 × 90 painting-pixel rectangle around the water. The CSS safety clip and the shader's feathered shoreline come from the same `data/lake-water.ts` boundary. No new artwork was generated.

## Visual direction

The first shader prototype used stronger vertical deformation, local contrast enhancement and changing light. The user found it promising but eerily fluid compared with the illustrated scene. The revised version removes animated lighting, reduces vertical displacement to one painting pixel, preserves the original palette and grain, and moves broad reflections predominantly sideways. It draws at a target of ten held frames per second to fit the limited animation style. The rejected SVG ripple strokes remain removed.

The current result is a visual prototype for review, not an assertion of final aesthetic approval. [Revised water recording](painted-water.gif) shows the actual browser output with shoreline context; [desktop](desktop.jpg) and [phone](phone.jpg) show the composition. `phone-initial-prototype.jpg` records the earlier version only.

## Lifecycle and scope

- A small client wrapper dynamically imports the renderer after the motion preference is known. Reduced motion leaves the original painting visible.
- Manual pause, document visibility and the current scene govern the animation loop. The image remains usable without WebGL or when a texture/shader fails.
- Context loss reveals the original painting. Context restoration resizes and resumes only if motion is still requested.
- Cleanup cancels animation, disconnects resize observation and disposes texture, geometry, material and renderer. Cancellation is checked after asynchronous texture loading, before allocating a context.
- Shader sampling is bounded by distance to the bank, including its contrast samples, so refraction cannot pull green land into the water.
- Trees, grass, seeds, characters and navigation retain their existing rendering. No general renderer migration was performed.

## Verification

- `npm run check` passed: typecheck, zero-warning lint and production build.
- Four existing diorama contracts and the shoreline regression passed. The regression now reads the actual shared shoreline and verifies every covered painting pixel is water and lies inside the canvas region.
- No browser shader errors were reported. The canvas identified itself as Three.js r186.
- Final desktop capture: 28 frames over 7.918 seconds. The water/context crop changed during motion and was pixel-identical across a 600 ms pause. Measurements are in [checks.json](checks.json).
- Navigating to the beach changed the water renderer to `paused`; scrolling back to the lake restored `running`.
- Final phone check at 390 × 844: renderer running, buffer 448 × 72. Desktop buffer was 711 × 114. Pixel ratio is capped at 1.5.
- Reduced-motion changes, forced context loss/restoration, physical-device performance and screen-reader use were not exercised in the browser; those paths were inspected in code. Ten draws/sec is a configured target, not a measured field-performance result.

The prototype is served locally on port 3100. No deployment or commit was performed. Verification above preceded the separately coordinated shared-module reorganization; the lake implementation files were complete when that reorganization began.
