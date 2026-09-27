# Website architecture and edit guide

Updated 27 September 2026. This is the current implementation map. Historical v1/v2 reports describe their own checkpoints; use this guide for paths and ownership today.

## Two websites, one repository

The existing public pages still live in `app/`. The illustrated experience is a route-independent feature mounted by thin entries under `app/preview/diorama/`. Its layout supplies motion policy, navigation and scoped styles; the preview route supplies `noindex` metadata. Existing `/preview/lakeside` and `/preview/coast` are earlier studies, not the main development targets.

Keep the loading boundary scoped to `app/blog/loading.tsx`. A root `app/loading.tsx` caused the built scenic pages to be parked inside a hidden React streaming container, requiring JavaScript to reveal otherwise complete static content. The generated-HTML contracts check the ancestors of each preview page's main content to guard against this regression.

```text
features/diorama/
  world-layout.tsx          reusable experience layout
  screens/world-journey.tsx native scroll, active chapter, nearby loading
  data/scenes.ts            chapter order
  data/site.ts              shared contact destination
  articles/                reading layout, cover registry and article CMS adapter
  model/                   scene content and runtime contracts
  lib/                     route map, asset paths, pure choreography
  shared/                  orb, motion policy, layer/fallback renderer, dialog, sky
  scenes/
    lake/                  copy, composition, character, foliage, water shader
    beach/                 copy, composition, character, sea/boat effects
    city/                  copy, composition, terrace and lighting
  rooms/
    work/                  project content and workstation UI
    stories/               article content, CMS adapter and writing-room UI
  styles/                  world shell, rooms, common motion, ordered imports
```

Each scene owns `content.ts`, `scene.tsx` and `styles.css`, plus its character/effect modules. The beach and city agents can improve their scenes without editing the journey, lake, or each other. Assets remain at stable `/assets/world/` URLs; add new assets with scene-specific names, preserving approved source artwork and manifests.

`data/diorama.ts` and `app/preview/_components/scene-motion.tsx` are compatibility exports for earlier consumers. They contain no separate configuration or state implementation. New code imports feature-owned modules directly.

## What to edit

| Task                                                                            | Owner                                                        |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| Add/remove/reorder homepage chapters                                            | `features/diorama/data/scenes.ts`                            |
| Change one scene's words, layers, depth, hotspot locations or phone composition | `scenes/<name>/content.ts` and `styles.css`                  |
| Character movement, water, lighting, scene-specific interaction state           | `scenes/<name>/scene.tsx` and adjacent modules               |
| Every interaction orb's appearance and behavior                                 | `shared/interaction-orb.tsx` and `interaction-orb.css`       |
| Pause, reduced motion, tab visibility                                           | `shared/scene-motion.tsx`                                    |
| Scroll transitions and nearby asset loading                                     | `screens/world-journey.tsx`, `lib/travel.ts`                 |
| Default layer images, static fallback, image failure handling                   | `shared/scene-artwork.tsx`                                   |
| Project content/order                                                           | `rooms/work/content.ts`                                      |
| Featured story notes/order and outage fallback                                  | `rooms/stories/content.ts`                                   |
| Matching Stories thumbnails and article covers                                  | `articles/covers.ts`, `getArticleCover(uid)`                 |
| Stories handwriting and its painting-space masks                                | `rooms/stories/writing-hand.tsx`, `rooms/stories/styles.css` |
| CMS refresh/mapping                                                             | `rooms/stories/load-articles.ts` (server only)               |
| Mount URLs / contact                                                            | `lib/routes.ts` / `data/site.ts`                             |

## Scene contract

`WorldScene` is serializable content: id, copy, description, palette, mobile stage, layers and link hotspots. `SceneProps` adds `load`, `first`, and `active`. The journey supplies these and manages native scroll, visibility and inert inactive chapters.

`SceneArtwork` supplies the shared art stage, default images, no-JavaScript/error fallback and link hotspots. A scene can supply `renderLayer`, `afterLayer`, `atmosphere`, `controls`, `response` and `fallback`. Return `undefined` from `renderLayer` to use the default image. Optional `fallback` replaces the default static image both after a layer failure and inside `<noscript>`; use static, decorative markup with scene-owned responsive positioning and no dependency on effects or event handlers. Keep essential links in the existing hotspot/navigation slots. Omitting the fallback preserves the default image and its horizon mask. Keep behavior and state in the scene rather than adding new scene-id branches to the shared renderer.

For a new chapter, create a unique id and its content, add it to `data/scenes.ts`, and supply a `<id>-static.webp` fallback plus declared assets. A data-only scene works with the default renderer. For custom effects, add its component to `scenes/registry.tsx` and import its stylesheet in `styles/index.css`. Unique ids are required. The empty scene list has an intentional fallback; a single scene works without a transition.

All positions refer to the same painting stage, so artwork and controls share coordinates. Scene-only selectors stay scoped to their scene or uniquely named effect classes. Shared CSS pause/reduced-motion rules apply to all scene effects; do not override them locally. Review mobile overrides whenever the artwork changes.

## Shared typography

All visual assets follow [the shared art style](art-style.md). Article implementation and cover replacement are documented in [the article guide](articles.md); article styles are scoped to `.reading-article` and its containing `.world`, leaving scene and room layouts unchanged.

The approved Lora/Nunito Sans pairing is recorded in [current direction](website-direction.md#typography). Edit font-face declarations and `--world-heading-font` / `--world-body-font` in `styles/typography.css`; it is imported by the shared stylesheet entry. Font files, licenses and provenance live in `public/assets/fonts/diorama/`. Scene-specific sizes and placement remain scene-owned, while font families use the shared tokens.

## One sky through the day

`shared/journey-sky.tsx` and its stylesheet own the persistent sky, sun, moon, drifting clouds, birds and stars. `lib/sky-time.ts` owns palette stops and reversible interpolation. Each scene's `content.ts` sets `skyTime`: 0 is dawn, .45 midday and 1 night. The journey interpolates adjacent scene times, so scenes can be reordered or added without fixed chapter indices in the sky renderer. The existing scroll/resize frame updates CSS variables; there is no separate sky render loop or added engine.

Scene-owned styles mask the upper painted sky into the shared background. Keep these masks with their scene geometry. Beach masks the entire background layer because its water canvas samples the complete painting; masking only the image would leave a second sky over the shared one. No source artwork is rewritten. City skyline lights/reflections remain local; its former separate clouds/stars were replaced by the shared sky.

Lake uses a painting-space ridge/pine mask from `scenes/lake/horizon.ts`; its existing animated pines share those same paths. Optional `WorldLayer.mask` applies the silhouette to the whole layer and static fallback. Optional `WorldScene.sunrise` anchors the initial sun centre to a percentage position in the background painting. The journey projects this into viewport coordinates on initialization/resize using the scaled background width and the resting art stage, independent of image load and scroll travel. Sun/moon arcs stay in `sky-time.ts`, with separate portrait heights; the lake's morning tint stays in its scene stylesheet.

Before hydration or without JavaScript, each stacked scene has its own server-rendered sky at its declared time. Once ready, only the continuous sky is displayed. Reduced motion and pause stop ambient CSS motion and use each active chapter's still sky, with no celestial scroll travel. The global visibility policy pauses ambient effects in background tabs. Run `scripts/sky-time.test.mjs` for colour/position continuity, reverse travel, chapter edits and day/night handoff; visual checks must also inspect the masks and intermediate scroll positions on desktop and portrait.

## Shared controls and effects

`InteractionOrb` renders either a real link (`href`) or button (`onClick`). Supply a descriptive `label`; optional `hint` is the brief visible tooltip. Optional `pressed`, `hasPopup` and `disabled` expose action semantics. Place it with a scene class or percentage style. Touch activates the action directly; it does not require a hover-only step. Text navigation provides the obvious route to essentials.

Use `useMotionPolicy().enabled` **and** scene `active` for continuous scene renderers. CSS animations inherit the shared pause rules. Imperative canvases must explicitly pause, stop when hidden, clean up frames/listeners/textures/renderers, bound their pixel ratio and preserve the painting if initialization fails. Lazy-load expensive engines. The existing lake implementation is an experiment with lake-specific shoreline geometry, not yet a generic water engine. Extract shared lifecycle code once another real effect demonstrates the common contract; keep shaders and masks scene-local.

Keep runtime business content in TypeScript or Prismic. JSON under docs is asset provenance, not an alternative runtime configuration. UI content remains HTML; decorative canvas/SVG art is hidden from assistive technology.

## Parallel ownership

Work owns the interactive globe in `rooms/work/spinning-globe.tsx`, `spinning-globe.module.css`, `globe-renderer.ts` and `globe-motion.ts`. It uses a bounded 160×160 Canvas2D surface over an illustrated fallback, shared `InteractionOrb` controls, and motion-policy-aware momentum with no idle animation loop. Keep its projection, map texture, room artwork and responsive placement local to Work. Its assets use the `work-globe*` prefix; verification and provenance live in `docs/verification/work-refinement/globe.md`, with focused physics checks in `scripts/work-globe.test.mjs`.

Stories handwriting is owned by `rooms/stories/writing-hand.tsx` and `rooms/stories/styles.css`; it no longer uses shared `RoomHands`. One opaque hand cut from the approved artwork rotates over a fixed cleaned background, with the original cuff above it. Desktop/portrait masks and cleaned backgrounds use the `public/assets/world/stories-writing-*` prefix. Keep these assets and motion geometry together; preserve the original painting fallback while assets load or fail. Verification lives in `docs/verification/stories-refinement/`.

- Lakeside thread: `scenes/lake/`, lake assets, lake tests and verification.
- Beach thread: `scenes/beach/`, beach assets, beach tests and verification.
- City thread: `scenes/city/`, city assets, city tests and verification.
- Coordinating thread: shared modules, routing, shared styles, dependency changes and top-level documentation.

Do not copy/paste the orb or another scene's renderer into a new local implementation. Request changes to shared APIs through coordination. Use unique files for generated assets/evidence. Workstation/Stories remain intact unless explicitly assigned. Local threads share one checkout: changes appear immediately. A second `next build` or server restart can disrupt another thread; coordinate before either.

## Promoting the experience later

Promotion is a separate requested step; this refactor does not switch the public site.

1. Change the single mount in `lib/routes.ts` from `/preview/diorama` to an empty string. Its helper maps that to `/`, `/work`, `/stories`; all scene/room/navigation links use it.
2. Compose `WorldLayout` and the existing feature screens in the public route entries, or a shared route-group layout. Keep the old pages recoverable in Git. Avoid wrapping article pages in a scenic viewport.
3. Preserve `/blog` and every `/blog/[uid]`; retain `/skills` or add a deliberate redirect. Decide whether Stories replaces the blog index or complements it. The server article adapter and original URLs do not change.
4. Keep preview routes `noindex`; set public titles, descriptions, canonical URLs, sitemap and social metadata for the new public entries. If keeping both mounts live, replace the single deployment mount with an explicit route context; do not silently let preview links escape to public pages.
5. Verify direct navigation, back/forward, fragments, article URLs, external links, no-JavaScript content, reduced motion, keyboard operation and mobile layouts. Measure assets/runtime and review animation on representative hardware before claiming performance.

## Verification

Use the scripts in `package.json` for typecheck, lint and production build. After a coordinated build, run `rtk proxy node --test scripts/diorama-contracts.test.mjs scripts/lake-shoreline.test.mjs` on Node 24+. The tests check reversible scene travel, archive batching, routing and rendered semantics; the lake test checks its water mask against actual painting pixels.

For visual work, inspect several moments of the animation, not just the initial frame. Exercise orbs with mouse/touch and keyboard, verify label disclosure and focus return, and compare desktop/phone composition. Store scene-specific evidence under `docs/verification/`. Keep claims limited to what was actually observed.
