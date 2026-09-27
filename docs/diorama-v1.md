# Illustrated world · local v1

> Current implementation: [architecture and edit guide](website-architecture.md). Current design decisions: [creative direction](website-direction.md). This document retains the earlier study/checkpoint; its old file paths and technology limits are historical.

The following is the v1 record. [Motion v2](diorama-motion-v2.md) now adds character actions, glowing discovery orbs and object interactions; it supersedes the held-pose limitations below.

26 September 2026. Preview only. `/preview/diorama`, `/preview/diorama/work`, `/preview/diorama/stories`. The public homepage, work page, blog and article URLs are unchanged. The old lakeside/coast studies remain available.

This implementation follows the latest `docs/mock` and storyboard notes, which supersede the original two-exercise study. The six approved source paintings in `docs/mock/assets` are preserved. The rejected detailed landscape generations are not used.

## What is implemented

- Three scenic chapters: lake/pull-up hold, beach/football, city/coffee. Native vertical scrolling and ordinary fragment links. One viewport of travel between stops; no wheel interception, timed navigation, snapping or additional animation engine.
- True separate clean background plates, transparent character/terrace layers and foreground grass. Foreground, subjects and backgrounds have different depth and transition speeds. Subjects leave before the next subject arrives; the transition passes through open sky. Small birds, sailboat, water, light and steam effects are decorative.
- A workstation room with actual HTML project content, a manual four-project carousel, project index and detail dialogs. Laptop and its generous cue open the Remote.com profile. Notebook leads to Stories. Lamp can be dimmed. The tablet opens a short account of working with software and agents and explicitly says it is not live AI.
- An overhead writing desk with four semantic article papers, deliberate shuffle, and an archive with title search, topic filtering and dates. Eight existing posts were fetched from the site's public Prismic repository. The server refreshes the catalogue hourly and includes future posts. Verified static entries survive a CMS outage. Original article routes are retained.
- Dedicated portrait room artwork. Home independently positions its art, type, props and chapter controls on phones. The portrait monitor is enlarged in the illustration itself so HTML content fits its actual bezel.

## Edit map

| Change                                                                   | Location                                             |
| ------------------------------------------------------------------------ | ---------------------------------------------------- |
| Scene order, copy, descriptions, layers, depth, portrait stage, hotspots | `data/diorama.ts` → `worldScenes`                    |
| Project order, status, teaser, details and destination                   | `data/diorama.ts` → `deskProjects`                   |
| Featured article order, short notes and artwork; CMS fallback            | `data/diorama.ts` → `deskArticles`                   |
| New article titles/dates                                                 | Existing Prismic CMS; Stories reads it on the server |
| Scene composition, atmospheric motion, mobile overrides                  | `app/preview/diorama/world.css`                      |
| Room monitor/laptop/paper geometry, responsive rooms and dialogs         | `app/preview/diorama/rooms.css`                      |
| Native scroll choreography and paper batching                            | `_components/travel.ts`                              |
| Layered home rendering and nearby asset loading                          | `_components/world-journey.tsx`                      |
| Reusable pause/reduced-motion/tab-visibility policy                      | `app/preview/_components/scene-motion.tsx`           |
| Artwork sources and generation instructions                              | `docs/diorama-v1-artwork.md`                         |

Keep percentages relative to the shared art stage, so hotspots follow the same transform as their objects. New scenes need a readable open area, a static image, a clean plate and coherent foreground layers. No mirrored characters: Glen's anatomical left prosthesis is viewer-right when he faces the visitor. The CSS is intentionally scoped to `.world` and `.world-dialog`; the existing public site retains its design.

## Engineering decisions

CSS transforms/opacity and event-driven animation frames are the only motion approach here. The existing Framer Motion 2 dependency remains in the public site and is not imported into this preview. No Three.js, canvas, new runtime package or backend is introduced. React state changes on chapter or content selection; travel writes CSS properties. No continuously running JavaScript animation loop.

Pages remain server-rendered and statically generated, with preview `noindex` metadata. The initial lake plate has high fetch priority. Only the lake and nearby beach load initially; the city is enabled when the visitor approaches it. Responsive WebP variants are used for large plates. The Work/Stories routes do not prefetch each other's art. Original full scenes provide image-error and no-JavaScript fallbacks.

The provider respects `prefers-reduced-motion`, manual pause stored for the tab session, and document visibility. Pausing during a transition selects a whole readable scene, rather than freezing a half-blended character. Offscreen chapter decorations pause. Entrance animations cannot conceal newly navigated or shuffled content while paused. Radix dialogs provide modal focus containment, Escape/backdrop dismissal, and explicitly restored focus. All essential routes also have ordinary navigation.

Static reference scripts under `docs/mock` and `docs/storyboard` are excluded from application linting. Their pre-existing content is left untouched. The earlier modified `journey.css` is preserved, although the new preview uses its own scoped styles.

## Deliberate limits

Characters currently use coherent held poses. There is no finished pull-up cycle, football kick, typing loop or writing loop. The pull-up cutout includes the whole apparatus; a front bar overlay preserves bar/face occlusion without procedural limbs. These should be replaced with cleaned, registered full-pose frames if character animation is developed further. Do not describe atmospheric motion as finished character animation.

The background edits and transparent cutouts retain the original simple game-like direction but are generated derivatives, not pixel-identical artist-separated layers. Distant hills/buildings remain painted into their background plates. Parallax is 2.5D, not a simulated landscape. Desktop Work/Stories use static room plates with live HTML and small environmental effects. Scene transitions are a layered camera lift with a short sky dissolve, not one physically continuous geography.

No AI chat, voice, selected exercise video, contact form, invented client results or launched StayPal claim. Instagram opens the known profile. Collaboration uses the existing LinkedIn destination. Existing article pages retain their original visual design.

Physical phone performance, field Core Web Vitals and a complete screen-reader audit require later evidence. Browser emulation is not device verification.

## Verification record

See `docs/verification/diorama-v1/README.md` for the explicit visual/interaction inventory and final evidence. `npm run check` passes TypeScript, zero-warning ESLint and the optimized Next build. A small contract suite checks scene endpoints, reversible transitions without overlapping characters, arbitrary archive sizes, and server-rendered fallback/link/metadata contracts.
