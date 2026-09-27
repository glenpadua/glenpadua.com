# Readable breeze cues · 27 September 2026

Follow-up to the lake shoreline fix: five regions of the original foreground grass lean in sequence from left to right, at half-second intervals. Tree response delays now follow that direction. Three small, cream dandelion seeds drift across the lower scene, with a quiet interval between passes. Two broad, softly striped reflection patches make the lake shimmer more readable inside the existing shoreline mask. No new raster assets or animation library were added.

Local production browser verification:

- 46 desktop frames over 21.75 seconds include three, two, one and zero visible seeds. All five grass regions had different transforms during the travelling gust. Shimmer opacity reached 0.80.
- At 390 × 844, the shoreline mask stayed registered to the painting and the grass retained its staggered movement. A visible seed pass placed all three seeds inside the viewport, at approximately x=99, 170 and 222.
- Pause froze all 18 inspected grass, seed, seed-rotation, shimmer and tree elements. Transforms and opacity stayed identical across 500 ms; resume restored movement.
- The existing reduced-motion rule covers the new effects; seeds and shimmer have zero base opacity when animation is disabled. System-setting changes and physical-device performance were not tested.
- `npm run check` passed, as did the four existing diorama contracts and the shoreline pixel regression. No hosted deployment was performed.

[Breeze recording](breeze.gif) · [Desktop](desktop.jpg) · [Phone](phone.jpg) · [Desktop timing](desktop-timing.json) · [Phone checks](phone-checks.json)
