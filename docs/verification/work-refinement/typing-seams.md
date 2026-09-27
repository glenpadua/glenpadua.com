# Typing overlay seams — 27 September 2026

## Cause and change

The original full-scene alternate painting has small texture and colour differences outside the fingers. Broad, hard-edged clip polygons switched those differences over the desk and shirt, producing rectangular flashes. The animation's cadence and finger poses were already liked, so they are unchanged.

Work now owns `typing-hands.tsx`, a CSS module and four SVG alpha masks (one per hand and viewport painting). Each mask covers the original and alternate finger silhouettes, has a lightly feathered boundary and fades toward the stationary wrist. The surrounding desk and lower shirt retain the original painting. No source painting was regenerated or changed; no shared file was edited.

The original painting remains visible beneath the effect. A failed alternate image removes the enhancement; missing/unsupported masks leave the base painting visible. Shared motion policy and screen-saver pause still apply through `room-hands`.

## Evidence

- `WORK_TYPING_BASELINE=1 node --test scripts/work-typing.test.mjs` reproduced the old symptom against the real clip polygons and paintings. The selected desk/shirt regions contained 7,863 changing pixels on desktop and 8,719 on portrait (see `typing-seam-before.json`).
- The default test uses the new runtime masks: zero changes in those protected areas, while retaining over 500 changed finger pixels and full coverage at representative finger positions. Both tests pass.
- Examined enlarged original/alternate masked pose comparisons for both paintings, including old finger coverage and wrist joins (`typing-*-pose-comparison.png`).
- Captured 3.5 seconds of the live desktop animation, observing left-only, right-only and original poses (`typing-desktop.gif`, `typing-desktop-timing.json`). Rectangular patch boundaries are no longer visible in the captured states.
- Inspected portrait mask selection at 390 CSS pixels and sampled all three pose states over 2.1 seconds. Browser screenshot scaling was unreliable during that emulation capture; the native-size portrait pose comparison is the detailed visual evidence. No physical phone test.
- Manual pause retained both hand opacities across observations and set both animation states to paused. Resume restored motion. The screen saver also paused both hands; returning to projects restored the monitor. These controls were operated with Enter.
- Navigating away to Home removed both Work hand elements; returning restored the room. No animation loop or listener was introduced.
- Reduced-motion disabling is preserved by the existing shared CSS/provider, but an OS preference change was not independently tested. Asset-failure handling was inspected in code, not fault-injected in the browser. Generated static HTML/fallback contracts passed.
- Typecheck, lint, coordinated webpack production build, required contract suites and the new typing suite passed (10 tests). Build window released to the coordinator; port 3102 not restarted.

This remains the existing two-pose illustrated typing action. The change addresses its visible compositing boundary, not a new continuous hand animation.
