# Illustrated world · motion v2

> Current implementation: [architecture and edit guide](website-architecture.md). Current design decisions: [creative direction](website-direction.md). This document retains the earlier study/checkpoint; its old file paths and technology limits are historical.

27 September 2026. Local preview at `/preview/diorama`, with Work and Stories in the persistent navigation. This continues the approved v1 artwork and replaces its held-character limitation. The public routes and original paintings remain unchanged.

## What moves

The lake character performs a complete pull-up: dead hang, quarter, half, chin above the bar, then a controlled return. Four registered full poses share a stationary apparatus and fixed grip positions. The beach character rolls the football under his prosthetic foot; three full poses preserve the planted natural shoe. The ball stays on the ground. The anatomical left prosthesis remains viewer-right. There is no mirroring, procedural limb bending or crossfade between bodies.

Work alternates the fingers of both hands over the keyboard, with independent timing and planted wrists. Stories alternates the writing hand and pen along the page while the other hand holds the paper. Desktop and portrait paintings have their own matching alternates. These are deliberately limited-frame illustrated actions: four pull-up poses, three football poses and one alternate painting per room. They are not fluid high-frame-rate character films.

The environment adds slow cloud movement, four lake ripples, shore wash, foreground grass sway, distant city windows, coffee steam and warm room light. The lake's five painted pines and grass share a passing 9.2-second breeze. Five regions of the original grass lean in sequence from left to right; nearby trees follow the same gust, with their roots fixed. Three small dandelion seeds drift through every other gust, leaving quiet gaps. Broad, softly striped reflections make the water shimmer more readable within its existing mask. [Follow-up browser evidence](verification/lake-breeze-indicators/README.md) records the desktop, phone and pause checks.

Lake highlights use a shoreline mask in the background painting's own coordinates. The mask and glimmer share the painting's scale and scroll movement, preventing the former white streaks over the green banks. The original tree paint is clipped into moving silhouettes over small masked clean-plate patches; the rest of the original painting remains untouched. [Asset provenance](diorama-lake-breeze-assets.json) and [breeze verification](verification/lake-breeze/README.md) describe this refinement.

Current water status: the user found the broad reflection overlays too faint, then rejected the stronger drawn ripple lines as visually incompatible with the painting. Both experimental treatments have been removed; the original painted lake and soft glimmer remain. Water motion still needs an approved solution. A small shader that deforms the existing painted reflections is being considered; no renderer dependency has been introduced.

Cursor-following parallax is removed from the current preview. Moving the pointer does not shift the scene or its hotspots. Native scroll transitions, character actions and ambient motion remain; Work and Stories also keep their fixed room compositions.

## Discoverable actions

The header and footer no longer use paper panels. The signature and navigation sit directly in each scene, with green lettering in daylight and cream lettering at dusk and in the rooms. The Lake / Beach / City selector is removed. A gently moving down arrow links to the next outdoor scene and disappears at the city. The existing motion policy also pauses this arrow. The small pause control and contact link remain unboxed; mobile controls retain at least 44px targets.

Permanent hotspot labels are replaced by small floating, glowing orbs. The interactive area remains 44 × 44 CSS pixels; descriptive accessible names and ordinary navigation remain. Labels appear on hover or keyboard focus. One click or tap immediately performs the action.

- Beach football: starts a short sole-roll sequence. When motion is paused, a status message explains why it remains still.
- Terrace lantern: changes the lamp glass and the painted pool of light on the tiles, as well as the ambient glow.
- Work monitor: switches to a quiet screen saver and rests the typing hands; its button returns to the projects.
- Work lamp: retains the existing dimming interaction.
- Stories tray: shuffles to the next four actual articles.
- Stories pen: rests or resumes the writing hand.

## Motion policy and assets

The existing shared policy controls all new CSS animations. Manual pause freezes them and persists for the tab session; inactive outdoor chapters pause; document visibility and the system reduced-motion preference remain wired through the provider. Reduced motion also disables animation and transitions in CSS. Navigation and content remain usable while paused.

No new runtime dependency, continuously running JavaScript animation loop, canvas or video is introduced. Atlas changes use stepped transforms; hands use clipped alternate paintings with stepped opacity. Original generated files are preserved. Preparation only crops, registers, packs, resizes and encodes them. Exact generation prompts, input paintings, source paths and rejected attempts are in [the asset manifest](diorama-motion-v2-assets.json).

The seven v2 WebPs total approximately 1.07 MB across all three routes and both room sizes. A room selects its desktop or portrait hand painting through `picture`; duplicate hand elements reuse the same image request. Home retains nearby-scene loading. These transfer sizes are asset measurements, not a field-performance result.

## Edit map

| Area                                               | File                                                   |
| -------------------------------------------------- | ------------------------------------------------------ |
| Character poses and room alternates                | `app/preview/diorama/_components/character-action.tsx` |
| Registered lake foliage and water                  | `app/preview/diorama/_components/lake-life.tsx`        |
| Timing, ambient motion, orb styling and hand crops | `app/preview/diorama/motion.css`                       |
| Football and terrace interactions                  | `app/preview/diorama/_components/world-journey.tsx`    |
| Screen saver                                       | `app/preview/diorama/_components/work-room.tsx`        |
| Tray and pen interactions                          | `app/preview/diorama/_components/stories-room.tsx`     |
| Mechanical asset preparation                       | `scripts/prepare-diorama-motion.mjs`                   |

Timed browser captures and verification boundaries are recorded in [the v2 verification report](verification/diorama-v2/README.md). No deployment is part of this pass.
