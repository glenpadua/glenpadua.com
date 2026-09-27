# Shared dawn → noon → night sky

27 September 2026. One continuous sky sits behind the homepage landscape transitions. Scene times live in each `content.ts`; palette/interpolation and decorative sky elements are shared. Approved landscape and character assets are unchanged. Ground masks remain scene-owned. The beach water layer must be masked as a whole because its canvas includes the painting's sky.

## Observed

- Desktop 1280×800, portrait 390×844 and narrow 320×740 reviewed. Morning is warm rose/cream, midday blue, and City has a dark blue sky, moon and stars. The painting retains a warm twilight horizon. No horizontal overflow in the checked phone layouts.
- Native forward and reverse scrolling sampled between stops. The sky stays at viewport coordinates (0,0), including at intermediate positions, while the scene layers move. Its palette and celestial position evolve without remounting. Sunset begins before night; night is delayed until the beach copy is leaving. Direct lake/beach/city fragments and keyboard chapter links work.
- Actual CSS motion sampled across time: cloud translation changed from 19.3481px to 17.5016px over approximately 19 seconds, with bird-wing rotation also changing. Daytime stars reported `paused`; night birds reported `paused`.
- Keyboard Pause stopped the visible clouds and wings. Their transforms were identical after 45.1 seconds, and computed animation state was `paused`. Resume worked. Four night stars changed opacity between samples 40.9 seconds apart. These are runtime motion observations, not claims of measured frame rate.
- Production webpack build, typecheck, zero-warning lint and all **15** tests passed. Includes new sky interpolation tests for scene edits/reordering, overscroll, reverse travel, palette/position continuity and the daylight/night handoff. Existing HTML fallback, shoreline and football checks also passed. This integrated build includes the concurrent Work laptop and Stories layout refinements.

## Boundaries

No new dependency or sky animation frame loop. The existing scroll handler writes CSS variables; SVG/CSS handle ambient effects. Shared pause/visibility and reduced-motion rules govern those effects. Reduced-motion and hidden-tab behaviour were source-reviewed in this pass, not newly emulated. The no-JavaScript path is server-rendered per-scene sky with the static painting; generated HTML tests passed, but a fresh JavaScript-disabled browser session was not run in this pass. Physical-phone performance and screen-reader review remain unverified.

The new pull-up/laptop routine is future work. Character movement is unchanged. City skyline lights/reflections remain scene-local; its former separate cloud canvas/star set and the old duplicate daylight sky component were retired.

## Captures

- `dawn-desktop.png`, `noon-desktop.png`, `night-desktop.png`
- `dawn-phone.png`, `noon-phone.png`, `night-phone.png`

Still captures document composition only; the timed observations above document motion.
