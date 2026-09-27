# Scene wipes, 27 September 2026

Replaced the homepage opacity crossfade with shaped, scroll-driven wipes (`lib/travel.ts`, `shared/scene-wipe.css`, `screens/world-journey.tsx`).

## Problem observed

At the midpoint of each passage both paintings were semi-transparent and every character, prop and the city terrace had already faded, leaving a muddy double exposure of two empty landscapes (beach palms over the city skyline).

## What changed

- Lake → beach (`tide`): a wave with a foam crest rolls down from the horizon, drifting sideways. Foam appears only once the crest reaches the ground (later on portrait).
- Beach → city (`dusk`): a soft, uneven edge sweeps right-to-left, following the sun's westward arc.
- The outgoing chapter takes the inverse mask (subtract composite), so no hills show through the new sky and no seam follows the edge.
- Outgoing people fade just ahead of the edge (wipe 0.3–0.55); incoming people and the city terrace settle in after 0.85. Copy fades out early and in late; one heading at a time.
- Hidden chapters also get `opacity: 0`: the beach's `frame-0` typing image sets `visibility: visible`, which leaked beach Glen into the lake once the old opacity crossfade was gone (caught by Glen during this pass).
- The header and bottom controls switch to light ink when the shared sky passes 0.72, not when the city becomes active.
- Scenes start loading one passage earlier, so quick scrolling doesn't reach an unpainted scene.
- Lake: the pull-up bar and Glen fade in together once the sprite loads (high fetch priority on the first scene). Server HTML and no-JavaScript visits still show him immediately.

## Observed

In-app browser, desktop (~1156×994) and 375×812 emulation, forward and reverse scroll at wipe ≈ 0.1, 0.3, 0.46, 0.62, 0.69, 0.83 and at each rest stop. Pause keeps the plain chapter switch with no mask. `node --test scripts/diorama-contracts.test.mjs`, typecheck and lint pass.

## Not yet verified

A production build (not run: the `.next` directory is shared with the running servers), Safari/iOS mask compositing on a physical device, frame timing of the masked layers during scrolling on a mid-range phone, and a screen-reader pass. The in-app browser throttles frames while the pane is hidden, so some intermediate screenshots lagged the page state; the values above were confirmed from computed styles.

## City lights follow the dusk line

Each overlay window in `scenes/city/atmosphere.tsx` carries `--lights-on`, derived from its painting x position; during the dusk entrance its lit colour mixes in shortly after the right-to-left edge passes, and reverses on scroll back. Headless Chrome at 1440×900: at wipe 0.46 none were lit yet; at 0.83 six of eight were lit with the two leftmost still dark; at rest all lit. Painted windows in the artwork are always lit, so the effect is deliberately subtle.

## Shooting star

`shared/journey-sky.tsx` has one `.journey-meteor`; the journey sets `data-meteor` 2.5–6.5 s after resting on the night chapter, once per session (`sessionStorage`), only while motion is enabled. Headless Chrome: first visible at ~4.9 s, peak opacity 0.93, crossed above the moon; after leaving and returning in the same session it did not repeat.

## Real rendering and portrait follow-up

Headless Chrome for Testing (CDP, not the throttled in-app pane) at 1440×900 and 390×844 mobile emulation confirmed the tide and dusk frames above. On portrait the dusk line reached beach Glen while he was still ~30% visible, slicing the faded umbrella; outgoing people now leave by wipe 0.42 on portrait stages (0.55 landscape). At 390×844, wipe 0.38 shows him at 6% opacity with the edge still to his right. With `prefers-reduced-motion: reduce`, scroll switches chapters with no mask or wipe attributes.
