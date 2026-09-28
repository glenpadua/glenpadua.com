# City nightfall revision — 28 September 2026

Supersedes the 27 September lights-out treatment, following Glen's feedback. The terrace and lantern stay warm; city shadows deepen into navy without lifting black levels. Eighteen deterministic switch points extinguish small groups of painted lights. Waterfront lights and their reflections share district timing. Three insomniac windows remain lit. The painted sunset keeps an ember until the latter half of the ending, then cools. The top-left desktop cloud moves right/down away from the logo.

A second review identified near-black holes in switched-off buildings. The final implementation samples nearby unlit masonry or water for those pixels, retaining local colour instead of filling them black. The light mask excludes the large connected sunset field. No source art assets were changed. The original terrace artwork, faces, plants and lamp remain unchanged throughout. Manual lantern control remains available.

The ending words reveal rapidly over ending progress .3–.4 after city copy clears at .3. The headings remain aligned. Link interactivity follows the same .4 threshold and uses the snapped pose when motion is paused/reduced.

## Browser evidence

Actual viewport measurements were 1440×900 and 390×844. Seven native-scroll captures per size are saved alongside this note (desktop-0…6.png and phone-0…6.png).

| Ending progress | Desktop groups off | Phone groups off | Copy state                 |
| --------------- | ------------------ | ---------------- | -------------------------- |
| 0               | 0                  | 0                | City fully readable        |
| ≈.16            | 5                  | 5                | City fully readable        |
| ≈.325           | 11                 | 11               | Ending in its brief reveal |
| ≈.49            | 15                 | 16               | Ending fully readable      |
| ≈.65            | 18                 | 18               | Ending fully readable      |
| ≈.82            | 18                 | 18               | Ending fully readable      |
| ≈1              | 18                 | 18               | Ending fully readable      |

The slight group-count difference at the fourth capture follows the slightly different scroll positions (.487 desktop / .493 phone). Sunset remains visible in the middle frames, final shadows are navy, and the lantern stays on in every capture. Three authored final windows are present; portrait cropping determines which are visible.

Pause: cloud matrix 5.82357px, star opacity .261955, canvas progress 1 and 18 groups off stayed unchanged across separate observations. Resume and reverse scroll returned canvas progress to 0 and groups off to 0, with the lantern still on. This is browser emulation, not a physical-phone check. Reduced-motion uses the same snapped journey pose; OS preference and injected rendering failures were not independently exercised this pass.

## Implementation and checks

`nightfall.ts` prepares the light islands once per source image. `night-backdrop.tsx` uses a canvas capped at 1024px, changes source pixels only at light thresholds, and applies a navy multiply pass as scroll changes. It observes the existing journey state only while the city is active, uses at most one pending animation frame, and has no idle render loop. Listener/observer/frame cleanup and the original-image fallback remain local to the city. Art direction remains [the shared art style](../../../art-style.md).

Focused tests cover staggered switching, exact restoration on reverse scroll, preserving the sunset and unlit masonry, avoiding black window holes, paired reflection timing, contrast-preserving tint and the late ember. After the concurrent public-route migration settled, typecheck, lint, webpack production build and all 19 focused diorama/shoreline/sky/nightfall tests passed. No legacy migration files were edited by this refinement.
