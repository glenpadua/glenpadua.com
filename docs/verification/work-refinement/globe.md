# Tablet removal and interactive globe — 2026-09-27

Art direction: [illustrated-world-v1](../../art-style.md). User chose removal or replacement of the unused tablet, with the globe becoming the interaction. The tablet and its How I work placeholder dialog are removed. Projects remain on the monitor. The globe keeps its warm illustrated stand while only its map surface rotates.

## Implementation

Scene-owned files: spinning-globe.tsx, spinning-globe.module.css, globe-renderer.ts, globe-motion.ts. The shared InteractionOrb supplies the accessible control. Drag/swipe turns the map; tap, Enter or Space gives a short spin; Left/Right reverse direction; Home resets. Momentum decays to zero. Pause, reduced motion, background-tab visibility and offscreen state stop coasting; direct input can still turn the globe without autonomous movement. Pointer capture is released and animation frames are cancelled on cleanup. There is no idle animation loop or added dependency.

A fixed 160×160 Canvas2D sphere uses precomputed projection and lighting with the generated map texture. The complete illustrated cutout stays behind the canvas as fallback for missing JavaScript, texture failure or unavailable canvas. The map is a decorative illustration, not an authoritative atlas. Mobile preserves a 44px minimum shared-orb target. Tall tablet crops place the globe on the clear front-right desk corner; the redundant discovery dot for the offscreen notebook is hidden there, while Stories remains in navigation.

## Assets and provenance

Built-in image generation, not CLI. Existing monitor-corrected runtime paintings supplied composition/style references. Generated candidates are preserved at:

- docs/mock/assets/work-globe-clean-desktop.png
- docs/mock/assets/work-globe-clean-portrait.png
- docs/mock/assets/work-globe-map.png
- docs/mock/assets/work-globe-cutout.png

Runtime assets:

- public/assets/world/work-globe-room.webp — 1536×1024 lossless
- public/assets/world/work-globe-room-900.webp — 900×600 derivative
- public/assets/world/work-globe-room-portrait.webp — 800×1600 lossless
- public/assets/world/work-globe.webp — trimmed transparent illustrated globe and stand, 362×500
- public/assets/world/work-globe-map.webp — 768×384 equirectangular illustrated map

Room edits are local composites onto work-monitor-v2.webp and work-monitor-portrait-v2.webp, not wholesale replacements with generated scenes. Desktop repair bounds: tablet (1135,403,200,292), original globe (1352,477,155,176). Portrait: tablet (624,686,132,151), original globe (731,697,69,123). Edges feather over five source pixels. Pixel comparison confirmed zero changes outside these bounds in both full-size runtime paintings. Candidate images were resized into their original painting coordinates before compositing. Original imagery remains saved. Existing artwork rights/provenance are inherited; no additional external artist attribution is asserted.

## Generation prompts

Desktop tablet removal:

> Use case: precise-object-edit. Remove ONLY the dark tablet computer to the right of the large monitor at x1140..1335, y410..670 from this room painting. Reconstruct the wall/window sill behind it and wooden desk beneath it seamlessly, including removing its contact shadow. Keep the nearby coffee mug, books, globe, monitor, character, hands and all other objects EXACTLY in place. Do not move or resize anything, and do not reintroduce monitor side supports. No replacement object. Same full image dimensions and framing. Match this exact artwork's style, lighting and texture, following docs/art-style.md revision illustrated-world-v1. The globe is important: preserve it, its stand and its position exactly.

Portrait tablet removal:

> Use case: precise-object-edit. Remove ONLY the dark tablet computer to the right of the large monitor at x625..750, y683..824 from this room painting. Reconstruct the wall/window sill behind it and wooden desk beneath it seamlessly, including removing its contact shadow. Keep the nearby coffee mug, books, globe, monitor, character, hands and all other objects EXACTLY in place. Do not move or resize anything, and do not reintroduce monitor side supports. No replacement object. Same full image dimensions and framing. Match this exact artwork's style, lighting and texture, following docs/art-style.md revision illustrated-world-v1. The globe is important: preserve it, its stand and its position exactly.

Clean globe background (same prompt applied independently to both tablet-free candidates):

> Use case: precise-object-edit. Remove ONLY the small antique globe and its supporting stand at the far right of this room image. Preserve the stack of books underneath, the plant leaves in front and behind it, the window, desk and every other object. Reconstruct the wall/plant/window visible behind where the globe was. The tablet is already removed; leave that area unchanged. Preserve complete image size, framing, and all other pixels. Match the original artwork exactly according to docs/art-style.md illustrated-world-v1. This is a clean background plate for later overlaying the SAME globe as a draggable interactive element. Do NOT insert another object or change the monitor.

Globe cutout:

> Use case: background-extraction. Extract the small antique globe at the far right of this reference painting, with its brown curved axis support and wooden pedestal base, as one isolated transparent-background object. Preserve its illustrated appearance, warm muted ochre/tan/brown colours, soft brush texture, lighting from upper-left, globe proportions, tilted axis and base. No redesign. Remove ALL surrounding books, plant leaves, desk, window, screen and other objects. Fill any tiny parts of the globe stand obscured by leaves. Center the whole globe and stand upright in a tight transparent portrait canvas, no artificial ground shadow outside its base, no text. Project art style docs/art-style.md illustrated-world-v1. The sphere should occupy roughly the upper 75 percent and the short pedestal the lower 25 percent. Output genuine transparency.

Map texture:

> Use case: stylized-concept. Asset: flat equirectangular world map texture for the small antique globe in the supplied room reference, not a picture of a globe. Follow docs/art-style.md illustrated-world-v1 and match the warm ochre, tan, muted brown, softly brushed hand-illustrated globe at the right of reference image. Output a full-bleed 2:1 rectangular equirectangular world map, complete recognizable continents North America South America Europe Africa Asia Australia Antarctica in their correct broad positions, Pacific split at left/right seam. Warm muted amber/tan oceans, slightly darker desaturated brown continents, large simplified geographic shapes, very subtle brushed paper texture. Uniform flat illumination, no painted highlight or shadow because runtime supplies spherical lighting. No lettering, no labels, no political borders, no meridians or grid, no frame, no globe sphere, no furniture, no perspective. Texture should wrap seamlessly horizontally. This is a tiny decorative illustrated globe, not a detailed geographic atlas.

## Verification

- Inspected desktop, 390×844, 320×740 and 768×1024 browser layouts. Tablet and its hotspot/dialog are gone. Globe stays reachable with its stand, without a second globe painted behind it.
- Measured phone targets: 46.41×48.71px at 390 wide, 44×44px at 320 wide.
- Keyboard Enter/arrow rotation and native browser dragging visibly changed the globe's geography while the stand remained fixed. Successive screenshots captured the coast. Screenshot crops show Africa/Asia moving across the surface.
- Paused phone sphere captures separated by other verification work had zero changed pixels. Arrow input while paused advanced the globe without coasting; Resume restored flick motion. Normal viewport and unpaused setting restored after review.
- Typecheck, lint and production webpack build passed. All 18 diorama/shoreline/Work tests passed, including decay-to-rest, 30/60fps equivalence, direction/drag scale, velocity limits, and long-gap/stopped-state checks.
- Pause was exercised live. OS reduced-motion switching, browser-background switching, image-failure injection and a physical phone were not tested; those code paths were reviewed. No measured 60fps/mobile performance claim is made.

Screenshots in this folder: globe-spin-start.png, globe-spin-middle.png, globe-spin-end.png, globe-drag.png, globe-phone-drag.png, globe-phone-paused-first.png, globe-phone-paused-later.png, globe-tablet.png, globe-desktop-final.png. The two paused screenshot crops compared exactly. These changes are local; no commit or deployment is claimed by this chat.

## Places, 27 September 2026

Glen supplied the places. Lived (`livedPlaces` in `rooms/work/content.ts`, his order, notes kept close to his words): Coimbatore, Bangalore, Kochi, Bali, Goa, Lisbon, Valencia. Visited (`visitedPlaces`, small dots, listed for screen readers only): Hanoi, Da Nang, Bangkok, Paris, Annecy, Berlin, Dresden, Prague, Amsterdam, Barcelona.

Pins are markers, not targets (about 4 px at display size). Every gesture ends on a named place: a tap spins one extra turn and lands on the next lived place; a drag or flick coasts and then eases onto the nearest one (`nearestPlace`); arrow keys step; paused or reduced motion jumps without the spin. A paper slip names the place at rest and hides while moving; on phones it lies on the desk below the globe instead of over Glen's head. Projection mirrors the renderer (`projectPlace`, tested); headless Chrome confirmed pin positions against the painted map (Cape Town, New York, South India, Iberia) and each tour stop's tag at 1440×900 and 390×844.
