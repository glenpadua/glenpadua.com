# Focused typing loop — 27 September 2026

Final scope follows the user's correction: Glen faces the laptop and types in a consistent loop. The drink sequence is removed. This supersedes all sipping verification in `beach-laptop/`.

## Implementation

The complete base sprite remains visible at all times. A small rectangular keypress region (painting coordinates x420–530, y596–662 of the 900-square export) is shown only during key-release frames. It lies entirely inside solid hand/shirt/keyboard pixels; the frame never changes the umbrella, face, pole, legs or sand/shadow. There are no articulated limb cutouts or pose blending. Glen faces down/right toward the screen. The laptop's real HTML link still opens Work.

The earlier whole-frame swap caused visible umbrella/shadow flicker because image generation changed pixels outside the intended fingers. This was reproduced with the rendered component before fixing it. The final comparison uses two copies of the actual component at 448 px wide, aligned to JPEG blocks because the browser captures JPEG. Outside the keyboard blocks plus the one-pixel chroma halo, the two rendered poses have **zero changed pixels**; 1938 keyboard pixels change. See [comparison](flicker-fixed.jpg) and [measurements](flicker-pixels.json). A regression test verifies that the replacement region remains at least 98% opaque in both source images (actual minimum alpha 252/255), preventing transparent holes from exposing another hand.

`typing.ts` supplies a 1260 ms rhythm: key-rest (260 ms), key-release (140 ms), key-rest (220 ms), key-release (120 ms), then key-rest (520 ms). The small finger changes are deliberately subtle at the actual scene size. The existing motion policy stops the timer when paused, inactive or hidden; elapsed active time resumes from the same point. A complete first frame is the static fallback.

The earlier sprite sheet attempts were rejected during close-up review because their registration differed and cutout boundaries sliced through artwork. No sipping sprites are referenced by the final renderer. The original artwork and intermediate generated sources are preserved as history.

## Assets and prompts

Generated using built-in imagegen, style reference [docs/art-style.md](../../art-style.md), revision `illustrated-world-v1`. The base edit uses the earlier beach typing candidate as a composition reference, with explicit corrections to face the laptop and remove the glass. The tap frame is a targeted edit of that new base. [Exact prompts](prompts.json).

Generated source folder: `/Users/glen/.codex/generated_images/01a0e222-03fe-7e61-b9d5-bc8685db2c2e/`.

| Export                                              | Source                                          | Dimensions     | Bytes  |
| --------------------------------------------------- | ----------------------------------------------- | -------------- | ------ |
| `public/assets/world/beach-typing-focused.webp`     | `exec-1b1b16db-5a3f-4f92-9e32-1c1fe109f163.png` | 900 × 900 RGBA | 125342 |
| `public/assets/world/beach-typing-focused-tap.webp` | `exec-42d6d255-5d15-4a16-9e95-16d16b7e8886.png` | 900 × 900 RGBA | 120320 |

Both originals are 1254 square. Sharp performed only resizing and WebP format conversion, preserving alpha. The tap image is restricted at render time to the small solid keyboard rectangle described above; the original exports are unchanged. User supplied/owns the project references; third-party rights were not independently audited. New generated art is subject to the user's visual review.

## Verification

- Reviewed the complete base and tap images at source size and in the actual desktop/portrait scene. The face points toward the laptop. There is no glass and no retained lower hand. The small opaque keyboard replacement avoids silhouette seams while keeping every other part of the approved base fixed.
- The earlier eight-frame whole-sprite observation is retained in `live-frames.json` as history. After the flicker fix, observed repeated live key-rest/key-release transitions with the base continuously visible and the tap image restricted to the same keyboard rectangle. Desktop and portrait rendering were reviewed again.
- Pause set `data-moving=false`; the current frame remained unchanged across subsequent checks. Enter on the laptop link opened Work, and Back returned to Beach.
- Desktop 900 × 850 and portrait 390 × 844 compositions reviewed: [desktop](desktop.png), [portrait](portrait.png). The full umbrella and feet remain in view and text stays clear.
- Temporarily removed only the tap export and reloaded. The image-error branch replaced the animation with the complete focused typing pose, preserving the Work link: [fallback](fallback.png). Restored the tap export afterward.
- Built HTML test confirms the focused typing asset in `noscript`, with a real Work destination. JavaScript-disabled browser rendering was not separately exercised. Reduced-motion integration was source-reviewed against the existing shared policy; no sustained OS reduced-motion session or physical-phone test was performed in this pass.
- Typecheck, lint and `npm run build -- --webpack` passed. No competing build process was present at the build check. Post-build `node --test scripts/diorama-contracts.test.mjs scripts/lake-shoreline.test.mjs scripts/beach-typing.test.mjs` passed all 13 tests. The existing Node module-type warning remains non-fatal.

No production deployment, public-route promotion or commit is included.
