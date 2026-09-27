# Grounded scene scrolling — 27 September 2026

Removed scroll-driven translation from the three homepage scenes. Terrain, characters, foregrounds, atmosphere containers and discovery targets now share fixed painting-space coordinates. Chapter and subject crossfades, the continuous day/night sky and local environmental/character animations remain. Removed obsolete layer depth configuration and travel/drift variables rather than overriding animated transforms globally.

## Evidence

Local browser at `http://127.0.0.1:3102/preview/diorama`, desktop 1280 × 720 and portrait 390 × 844.

- Reproduced the previous beach drift: desktop scroll 720 → 972 moved the character's top from 233.60px to 238.15px while the background stayed at −163.19px.
- After the fix, desktop scroll 576 → 1008 kept the beach character at 233.60px, the background at −163.19px and hotspots at −133.33px.
- Portrait scroll 844 → 1139.5 → 1013 kept the beach character at 497.59px, background at 307.40px and hotspots at 324.69px.
- Portrait city scroll 1688 → 1519 kept the terrace and hotspots at 298px and skyline at 278.89px.
- Portrait lake scroll 0 → 337.5 kept the character at 534.77px, background at 253.58px and grass/hotspots at 272.69px. The sunrise position continued changing.
- Observed forward/reverse transitions and inspected portrait composition. The boat's animated transform continued changing over time while its parent composition stayed fixed. Retained character and water renderers were not modified.
- Keyboard activation of Continue to City worked. Pause set global motion false and all three scene moving flags false; Resume restored motion. Inactive scenes remained inert.
- Saved desktop and portrait beach screenshots alongside this note; stills document composition, the measurements above document scroll behavior.

## Checks and limits

`npm run typecheck`, `npm run lint`, `npm run build -- --webpack`, `npm run test:diorama` (36 tests), and `git diff --check` passed. Existing tests cover reverse crossfade continuity, single visible subject, sky progression, unavailable WebGL fallback and built no-JavaScript content.

No renderer or image-failure path changed. Did not force a browser WebGL failure or OS reduced-motion preference in this pass; pause was exercised directly. This is local desktop and emulated portrait evidence, not a physical-device or full screen-reader review. The existing viewport-resize chapter-position limitation remains outside this change.
