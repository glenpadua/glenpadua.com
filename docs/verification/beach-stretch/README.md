# Beach typing and stretch — 29 September 2026

Glen types for 7.56 seconds, gathers his hands, lifts his head with his shoulders, extends his clasped hands forward, holds for 1.5 seconds, then lowers his gaze and returns to typing. The complete active-time cycle is 10.66 seconds. The user selected clasped hands stretched forward and then requested a natural head response and cleanup of canopy fragments and stray black pixels.

## Rendering

`scenes/beach/typing.ts` owns the timing; `character.tsx` stops its timer when paused, hidden or inactive and retains elapsed active time. All six poses, the backdrop and typing mask must load before motion starts. Any asset error returns the complete original `BeachStill` composition. Cached image failures are checked in the ref callback as well as `onError`.

The final implementation separates the fixed painting from actual transparent character cutouts. The same backdrop stays visible throughout. Original typing artwork is masked to the character; the existing opaque keypress patch remains unchanged. Stretch frames replace the connected head, neck, shoulders and arms, bounded by the laptop and seated legs. No body-part warping, whole-frame crossfade or mirrored anatomy is used. The anatomical left prosthesis remains viewer-right.

The earlier fixed-head treatment and the later polygon-clipped full-scene frames were rejected. They caused an unnatural neck pose, canopy-colour patches and detached pixels beside the head. Those frames are superseded. The final cutouts contain one connected character each. The backdrop has an explicitly clear air region where the original head/glasses used to be. `scripts/beach-stretch.test.mjs` checks both properties against the served WebP assets. The shared backdrop also avoids compression changes to the static painting on every pose switch.

## Assets and provenance

Style authority: [shared art style](../../art-style.md), revision `illustrated-world-v1`. Original approved beach typing artwork supplies the identity, static painting and typing poses. Generated with built-in imagegen, with actual alpha transparency; no external image API was used. [Final generation prompts](prompts.json).

Sources retained in `art-source/world/`:

- `beach-empty-plate-v1.png`: generated clean plate, 1254 × 1254; source `exec-2b465671-cb57-40c3-a9c7-77c30d16d782.png`.
- `beach-stretch-cutouts-v1.png`: generated four isolated poses, 1254 × 1254; source `exec-956eb005-cb42-455c-8cc7-d83c5fb72379.png`.
- `beach-stretch-poses-v1.png` and `beach-stretch-poses-v2.png`: intermediate pose references; not served. The second contains the requested head lift.
- `beach-stretch-{gather,clasp,extend,hold}-v1.webp`: reproducible 400 × 456 lossless working exports, cropped from the 900-square painting coordinates. The region boundary is baked into their alpha channel, so the browser needs no SVG clipping.
- `beach-stretch-backdrop-v1.webp` and `beach-typing-mask-v1.webp`: 900-square lossless working exports.

`node scripts/prepare-beach-stretch.mjs` separates the four connected cutouts, removes detached alpha components, uniformly registers the poses to the seated leg, and prepares a static backdrop from original pixels plus the clean plate only where the original character hid it. [Registration measurements](registration.json). `node scripts/encode-art.mjs` writes the public WebP copies. Cropping removes invisible legs and margins: the four poses need 77.5% fewer decoded pixels, and the added served assets total approximately 195 KiB instead of 290 KiB. Original typing exports remain untouched. References belong to the user's project; third-party rights were not independently audited.

## Verification

After cleanup and optimization, observed 80 native browser screenshots over 21.4 seconds, including all six frame states and repeated typing/stretch cycles. Reviewed the hair silhouette, open air and canopy at enlarged and actual scene sizes. No canopy polygon, ghost glasses, detached black marks or exposed white mask remains. The common background stays fixed. The earlier raw JPEG comparison in `canopy-pixels.json` includes small raster-position/compression differences and is not an exact pixel-equivalence assertion. [Desktop](desktop.jpg), [portrait](portrait.jpg), [live cycle](live-cycle.webp), [sampled states](motion-samples.json) and [contact sheet](live-contact-sheet.png). Sampled DOM states precede their screenshots, so a short transition can occur between them.

Pause retained stretch frame 3 for 1.2 seconds; Enter resumed it. Enter on the next-scene control reached City and the inactive beach retained typing frame 1 across a further 1.3-second observation. An additional portrait cycle at 390 × 844 preserved the full character, umbrella, feet, readable text and controls, with no horizontal overflow. Temporary viewport overrides were reset. No console errors or warnings appeared in the normal preview during this pass.

Temporarily removed only the gather export and loaded a fresh localhost origin. The renderer showed the complete static beach, with both still images loaded, no animated character and the real GitHub link intact. The export was restored immediately; the temporary tab was closed. See [fallback](fallback.jpg).

Typecheck, lint and the coordinated webpack production build passed. After building, `npm run test:diorama` passed all 58 checks, including the required contracts and shoreline tests, both animation clocks, static fallbacks and served-asset pixel checks. The existing Node module-type warning is non-fatal. These observations are local verification, not production deployment or physical-phone evidence.

Reduced-motion behavior is inherited from the shared policy: the timer never starts when motion is disabled. Source integration and static built HTML are checked; OS-level reduced-motion switching, physical phones and a full screen-reader session were not exercised in this pass.
