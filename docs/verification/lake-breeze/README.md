# Lake breeze and shoreline · 27 September 2026

The local `/preview/diorama#lake` scene now has a gentle passing gust through its five pines and foreground grass. Pine crowns shear around fixed root positions, with small delays between trees. The original tree paint is preserved. One generated clean plate is visible only behind those silhouettes. Water highlights are softer and clipped to a conservative shoreline inside the same transformed layer as the painting.

## Bug reproduction and regression

Before the fix, reading the actual browser geometry placed the first ripple at painting coordinates approximately `(504, 661)`, above the water's far shore at `y=672`. The browser shoreline check returned `{ pass: false, highlightsAboveShoreline: 1 }`. A fourth ripple also crossed the lower green bank. The ripple rectangle and background additionally used different scale and scroll transforms.

The corrected implementation passes the same above-shoreline check throughout captured desktop and phone cycles. Its mask matches the background's full rendered bounds. This alignment also held at mobile scroll position 548.5, with a nonzero lake travel transform.

`rtk proxy node --test scripts/lake-shoreline.test.mjs` checks every pixel inside the actual CSS polygon against the original painting's water color. This caught a bank pixel at `(962, 720)` in the first candidate mask. Tightening that edge made the check pass. A known green pixel beneath the former first ripple remains the negative control. The test is deliberately tied to the approved painting and should be reviewed if that artwork changes.

## Browser checks

- Desktop: 26 production frames over 10.35 seconds at the normal desktop viewport. Every sampled water/background alignment check passed. Tree and grass transforms changed through the gust.
- Phone: 24 development frames over 11.18 seconds at 390 × 844. All sampled shoreline and alignment checks passed. The right-hand pines and foreground grass remain visible in the crop.
- Manual pause: all five trees, four ripples and grass reported paused, and their transforms and opacity were unchanged after 500 ms. Resume restored movement.
- Reduced-motion and inactive-scene CSS still cover the new SVG groups and water elements. System-setting changes and physical-phone performance were not tested.
- `npm run check`: TypeScript, zero-warning lint and production build passed. The four existing diorama contracts and the new shoreline regression passed.

## Evidence

- [Full-scene breeze recording](lake-breeze.gif), sampled from the production preview.
- [Desktop still](desktop.jpg) and [phone still](mobile.jpg).
- [Desktop timing and geometry](desktop-timing.json) and [phone timing and geometry](mobile-timing.json).

The final tiny shoreline inset does not affect the visible composition in the captures; the final pixel regression verifies its containment. These are local browser observations, not hosted deployment, physical-device, screen-reader or field-performance claims. No deployment was performed.
