# City refinement — 27 September 2026

## QA inventory

- Approved simple illustrated identity, consistent faces and anatomical left prosthesis; inspect desktop and portrait compositions.
- Lantern visibly switches off/on, with localized lighting and unchanged faces/props; inspect settled and mid-transition states; repeat rapidly; use Space/Enter as well as pointer input.
- Both cups emit restrained steam; reflections stay on river; windows change slowly; two small drawn sprigs pivot at their stems. Capture multiple moments and playback, not only a still.
- Motion obeys global pause, reduced motion and inactive scene; inspect animation state and repeat time samples. Hidden-tab policy is inherited from the shared motion provider.
- Notebook leads to Stories and satchel to Work, with normal back navigation; enter city from beach using native scroll.
- At 1440×960, 390×844 and 320×740, both people, cups, notebook, lantern and satchel stay in frame; every orb has a 44px target; labels appear only on hover/focus.
- Failed foreground and failed unlit image preserve a complete scene; do not offer a lamp control that cannot affect the painting. Review no-JavaScript fallback.
- Exploratory checks: rapid alternating light toggles and navigating away/back while dark; narrowest portrait, portrait tablet, and short landscape.

## Implementation and evidence

Shared development preview: port 3102, parent-owned. No public routes promoted or deployed. All implementation edits stay in `features/diorama/scenes/city/`; approved raster artwork is unchanged.

- Copy: “Nothing urgent. For a change.” Read the four requested original posts from the existing Prismic export before writing it. No introductory copy about Glen’s wife.
- Localized off-painting mask replaces only the lantern and its pool. Faces and satchel are pixel-identical between paused lit/unlit screenshots (mean channel difference 0); the lamp region changes by 23.38. Both keyboard activation keys work, rapid toggling settles correctly, and the state survives native scroll away/back.
- Both cups have independent steam; restrained painted reflection strokes remain on the river; two small vector sprigs sway at fixed roots. Original character poses, faces and left prosthesis stay intact. Character sipping/blinking animation is not implemented.
- User follow-up: individual windows switch at randomly chosen intervals of 1.4–5 seconds. The selected window is random each time; a single timer is cleaned up on pause/inactivity. Stars flicker with independent timings. Clouds use a bounded 1200×188 2D canvas at at most 24 draws/second, moving the existing cloud band by ±11 painting pixels over 72 seconds. The original painting remains underneath if canvas/image loading fails. No additional library or artwork download; no Three.js added because translating an intact painted band needs no 3D engine.
- Recorded 32 actual frames over 22.591 seconds, preserving measured frame intervals in `evening-motion.gif` and `motion-timing.json`. Inspected multiple sampled moments at larger scale. Cloud pixels moved, stars changed brightness, and 10 distinct window configurations appeared. Clouds, stars and random windows remained unchanged during 5.5-second pause, reduced-motion and inactive-scene samples. See `atmosphere-checks.json`.
- Inspected desktop 1440×960, landscape 1280×720, tablet 768×1024, phones 390×844 and 320×740. Both people, cups and all three props remain in frame; no horizontal overflow. All discovery targets measure 44×44px. New Lora heading wraps into two lines on both phone sizes (`phone-final.png`, `viewport-320-final.png`).
- Notebook and satchel clicked through to their actual Stories and Work routes, then normal Back navigation returned to the scene. Tooltip/focus and light transition states captured. Exploratory rapid toggles and dark-state navigation passed.
- Failed foreground loads use the complete static painting and hide the ineffective lamp control. Failed unlit asset leaves the original art intact and hides its unavailable control. An initial fallback test ran before hydration and captured Lake; `failed-artwork.png` was replaced by a production test of the actual City fallback. The legacy `checks.json` fallback count is therefore superseded by the production verification here.
- Typecheck and lint passed. Coordinated webpack build passed after the random-window/cloud additions. Original seven contracts passed. During final verification the parent added a new regression for a real no-JavaScript defect: root `app/loading.tsx` wrapped all preview content in a hidden React suspense container. The coordinating thread relocated the root loading boundary to Blog. Its final integrated webpack build, typecheck, lint and all 12 tests pass, including the new no-JavaScript regression and beach checks.

## Limits

Browser emulation, not physical-phone testing or a full screen-reader audit. Hidden-tab stopping uses the shared motion provider and effect cleanup; the explicit browser time-sample tests cover pause, reduced motion and inactive scenes. Motion screenshots/GIF are sampled playback evidence, not a 60fps hardware performance benchmark. Characters remain complete, static approved poses.


## Final production fallback check

Fresh Chrome contexts, JavaScript disabled **before** page creation: City at `#city-scene`, Work and Stories all visibly render. Reviewed all three screenshots. The notebook, satchel and navigation retain native link destinations. No-JavaScript City initially showed two empty-image outlines at the upper edge of the feathered fallback. The shared owner changed SceneArtwork to omit unloaded default images; on their request, City likewise omits its unlit image until load=true. This removes the source-less placeholders rather than masking their borders. Final integrated production screenshot confirms the outlines are gone; zero src-less images with JavaScript both enabled and disabled. The normal City still renders and its lantern toggles off/on. Work and Stories provide their native content panels.

Forced canvas 2D unavailable: original City background loads and the canvas remains hidden. Failed foreground: exactly one static City fallback, lamp control hidden. Failed unlit asset: original foreground loads and ineffective lamp control hidden. `fallback-checks.json` supersedes the early fallback entry in `checks.json`.

The intermediate desktop crop (around 1071px wide) exposed a clipped satchel during final live review. Extending right-alignment from aspect ratio 5/4 to the actual painting ratio 3/2 fixes it; reviewed the live corrected window. No further scene source edits after this checkpoint.

No-JavaScript native input also verified: click notebook → Stories, Back, click satchel → Work, open first native project disclosure, click header Home → preview root. Temporary production3105 stopped; shared dev3102 remains running.

Final integrated build, typecheck, lint and all 12 tests passed after the placeholder fix (coordinating thread). Reviewed refreshed `no-javascript.png` and `phone-production-final.png`. City source complete; temporary production and isolated test-browser processes stopped; shared dev3102 and user-facing preview tab remain open.
