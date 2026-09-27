# Lake motion visibility follow-up — 27 September 2026

The user could not see the lake effect after the illustrated-style adjustment. The live preview showed `data-water-state="running"`, opacity 1, motion enabled and no console errors. The effect was present but its horizontal displacement along long, pale brush strokes was too subtle.

Changed only the lake fragment shader: increased horizontal brushwork displacement from 5.5 + 1.5 to 11 + 2 painting pixels, vertical movement from 1 to 3 pixels, pace from 0.65/0.45 to 1.0/0.7, and local texture contrast from 0.45 to 0.7. The existing palette, held-frame cadence, shoreline feather, bank-distance sampling bound and motion lifecycle remain intact. No added ripple lines or animated lighting.

## Observed verification

- Typecheck and zero-warning lint passed. The default Turbopack build could not bind its worker port in this environment, including after escalation. `npm run build -- --webpack` passed.
- Both scene-contract and shoreline suites passed after the build: five tests total.
- Restarted the local production preview at 127.0.0.1:3100 and refreshed the existing browser tab. Temporary verification server on 3102 was stopped.
- Captured 24 desktop frames over seven seconds. `readable-water.gif` shows the actual browser capture with nearby banks for context; `readable-water-desktop.jpg` shows the full scene.
- Two separated paused captures were pixel-identical in the water/context crop. Resumed captures changed. Measurements are in `readable-water-checks.json`; they establish motion, not aesthetic approval.
- Reviewed phone composition at an emulated 390 × 844 with the canvas running; `readable-water-phone.jpg`. Restored the browser viewport and left motion running.
- No shader errors were logged. Bank mask still passes against the actual painting. Reduced-motion, context-loss and offscreen lifecycle code were unchanged and were not re-exercised in this narrowly scoped shader adjustment.

The user has not yet approved this stronger version. No physical-device or deployment claim is implied.
