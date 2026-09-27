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
    writing/               article content, CMS adapter and writing-room UI
  styles/                  world shell, room stage, motion policy, ordered imports
```

Each scene owns `content.ts`, `scene.tsx` and `styles.css`, plus its character/effect modules. The beach and city agents can improve their scenes without editing the journey, lake, or each other. Assets remain at stable `/assets/world/` URLs; add new assets with scene-specific names, preserving approved source artwork and manifests.

`data/diorama.ts` and `app/preview/_components/scene-motion.tsx` are compatibility exports for earlier consumers. They contain no separate configuration or state implementation. New code imports feature-owned modules directly.

## What to edit

| Task                                                                     | Owner                                                        |
| ------------------------------------------------------------------------ | ------------------------------------------------------------ |
| Add/remove/reorder homepage chapters                                     | `features/diorama/data/scenes.ts`                            |
| Change one scene's words, layers, hotspot locations or phone composition | `scenes/<name>/content.ts` and `styles.css`                  |
| Character movement, water, lighting, scene-specific interaction state    | `scenes/<name>/scene.tsx` and adjacent modules               |
| Every interaction orb's appearance and behavior                          | `shared/interaction-orb.tsx` and `interaction-orb.css`       |
| Pause, reduced motion, tab visibility                                    | `shared/scene-motion.tsx`                                    |
| Scroll transitions and nearby asset loading                              | `screens/world-journey.tsx`, `lib/travel.ts`                 |
| Default layer images, static fallback, image failure handling            | `shared/scene-artwork.tsx`                                   |
| Project content/order                                                    | `rooms/work/content.ts`                                      |
| Featured article notes/order and outage fallback                         | `rooms/writing/content.ts`                                   |
| Matching Writing thumbnails and article covers                           | `articles/covers.ts`, `getArticleCover(uid)`                 |
| Writing-desk handwriting and its painting-space masks                    | `rooms/writing/writing-hand.tsx`, `rooms/writing/styles.css` |
| CMS refresh/mapping                                                      | `rooms/writing/load-articles.ts` (server only)               |
| Mount URLs / contact                                                     | `lib/routes.ts` / `data/site.ts`                             |

## Scene contract

`WorldScene` is serializable content: id, copy, description, palette, mobile stage, layers and link hotspots. `SceneProps` adds `load`, `first`, and `active`. The journey supplies these and manages native scroll, visibility and inert inactive chapters. `sceneFrame` supplies each chapter's passage role (`rest`, `in`, `out`), a shared `wipe` amount and separate `subject` (people, props, discoveries) and `copy` fades. A scene's optional `entrance` (`tide`, `dusk`, default `fade`) names a shaped edge in `shared/scene-wipe.css`: the incoming chapter is uncovered over the opaque outgoing one, which takes the inverse mask. Browsers without `mask-composite` fall back to a fade. Hidden chapters get both `visibility: hidden` and `opacity: 0`, because scene CSS may force children visible. Outgoing people leave ahead of the edge by wipe 0.55, or 0.42 on portrait stages where people sit nearer the entrance edges (`leaveBy`); incoming people wait for `PEOPLE_HANDOFF`. The contract tests keep one person and one heading on screen at a time. Ground layers, local effects and discovery targets share fixed painting-space geometry, with no scroll-derived translation or layer depth speeds. Preserve local character/environment animation and the shared sky’s scroll progression.

`SceneArtwork` supplies the shared art stage, default images, no-JavaScript/error fallback and link hotspots. A scene can supply `renderLayer`, `afterLayer`, `atmosphere`, `controls`, `response` and `fallback`. Return `undefined` from `renderLayer` to use the default image. Optional `fallback` replaces the default static image both after a layer failure and inside `<noscript>`; use static, decorative markup with scene-owned responsive positioning and no dependency on effects or event handlers. Keep essential links in the existing hotspot/navigation slots. Omitting the fallback preserves the default image and its horizon mask. Keep behavior and state in the scene rather than adding new scene-id branches to the shared renderer.

For a new chapter, create a unique id and its content, add it to `data/scenes.ts`, and supply a `<id>-static.webp` fallback plus declared assets. A data-only scene works with the default renderer. For custom effects, add its component to `scenes/registry.tsx` and import its stylesheet in `styles/index.css`. Unique ids are required. The empty scene list has an intentional fallback; a single scene works without a transition.

All positions refer to the same painting stage, so artwork and controls share coordinates. Scene-only selectors stay scoped to their scene or uniquely named effect classes. Shared CSS pause/reduced-motion rules apply to all scene effects; do not override them locally. Review mobile overrides whenever the artwork changes.

## Room styles and feature boundaries

`styles/rooms.css` owns only the common full-view room stage and no-JavaScript presentation. Work layout, monitor UI and ambient motion live in `rooms/work/layout.css`; Writing paper layout, archive cards and ambient motion live in `rooms/writing/layout.css`. `styles/index.css` imports these in a deliberate order, before the scene styles. Keep that order stable and verify a production build after changes.

Room styles use `:where(...)` boundaries so scoping does not increase selector specificity. There are no modal dialogs in the world: information is conveyed inside the scenes (monitor windows, the laptop's Slack profile, the archive's index cards). Typing geometry, masks and screen-sleep pause behavior are entirely inside Work’s `typing-hands.module.css`; do not add room-specific animation rules back to shared `styles/motion.css`.

`scripts/diorama-boundaries.test.mjs` checks that feature imports never reach into `app/` and that the extracted room/dialog styles stay scoped away from legacy pages. Keep the feature reusable without introducing a renderer abstraction for every similar-looking effect.

## Shared typography

All visual assets follow [the shared art style](art-style.md). Article implementation and cover replacement are documented in [the article guide](articles.md); article styles are scoped to `.reading-article` and its containing `.world`, leaving scene and room layouts unchanged.

The approved Lora/Nunito Sans pairing is recorded in [current direction](website-direction.md#typography). Edit font-face declarations and `--world-heading-font` / `--world-body-font` in `styles/typography.css`; it is imported by the shared stylesheet entry. Font files, licenses and provenance live in `public/assets/fonts/diorama/`. Scene-specific sizes and placement remain scene-owned, while font families use the shared tokens.

## One sky through the day

`shared/journey-sky.tsx` and its stylesheet own the persistent sky, sun, moon, drifting clouds, birds and stars. `lib/sky-time.ts` owns palette stops and reversible interpolation. Each scene's `content.ts` sets `skyTime`: 0 is dawn, .45 midday and 1 night. The journey interpolates adjacent scene times, so scenes can be reordered or added without fixed chapter indices in the sky renderer. The existing scroll/resize frame updates CSS variables; there is no separate sky render loop or added engine.

Scene-owned styles mask the upper painted sky into the shared background. Keep these masks with their scene geometry. Beach masks the entire background layer because its water canvas samples the complete painting; masking only the image would leave a second sky over the shared one. No source artwork is rewritten. City skyline lights/reflections remain local; its former separate clouds/stars were replaced by the shared sky.

Lake uses a painting-space ridge/pine mask from `scenes/lake/horizon.ts`; its existing animated pines share those same paths. Optional `WorldLayer.mask` applies the silhouette to the whole layer and static fallback. Optional `WorldScene.sunrise` anchors the initial sun centre to a percentage position in the background painting. The journey projects this into viewport coordinates on initialization/resize using the scaled background width and the resting art stage, independent of image load and scroll travel. Sun/moon arcs stay in `sky-time.ts`, with separate portrait heights; the lake's morning tint stays in its scene stylesheet.

Before hydration or without JavaScript, each stacked scene has its own server-rendered sky at its declared time. Once ready, only the continuous sky is displayed. Reduced motion and pause stop ambient CSS motion and use each active chapter's still sky, with no celestial scroll travel. The global visibility policy pauses ambient effects in background tabs. Run `scripts/sky-time.test.mjs` for colour/position continuity, reverse travel, chapter edits and day/night handoff; visual checks must also inspect the masks and intermediate scroll positions on desktop and portrait.

## The day's end and scroll gusts

`lib/travel.ts` maps scroll to chapters plus an `EPILOGUE` (0.8 viewport heights) after the last one (`journeyPosition`, `chapterStop`). The journey sets `--ending` (0–1; snapped while paused) and `data-ended`; `shared/journey-ending.tsx` renders the closing words from `data/ending.ts` over the night sky, or as an ordinary block without JavaScript. Internal links use a plain → and external ones ↗; socials are a small icon row. Keyboard focus entering it scrolls it into view. At the end the scroll arrow becomes a labelled “Back to dawn” button that returns to the top and focuses the page. `#end` is a fragment stop.

The journey also sets `--lean` (−1 to 1) from smoothed scroll speed and keeps settling for a few frames after scrolling stops, then goes idle. It is 0 while motion is disabled. Scenes may use it for foreground foliage only (lake grass strips, city sprigs); keep it to a degree or two.

## Scene copy

`shared/scene-copy.tsx` renders scene-owned words with semantic headings, naturally wrapping paragraphs and an optional `discovery`, a quiet real link; its copy stays in `scenes/<name>/content.ts`. Disclosure dialogs were removed: information belongs inside the scene. `eyebrow` is optional; the homepage no longer supplies it. Common copy/link styling lives in `shared/scene-copy.css`; each scene owns heading scale and placement.

## Page transitions

Full page loads inside the world (desk papers, article links, “Back to Writing”) use cross-document view transitions from `shared/page-transitions.css`. The header and bottom controls are anchored; a story cover carries one `cover-<uid>` name (from `coverTransition` in `articles/covers.ts`) on the desk paper and in the article, so it grows from the paper into the page and settles back. `WorldShell` skips the transition while motion is paused; reduced motion removes its animation. Browsers without cross-document view transitions navigate normally. Header links are client-side navigations and do not use this path. `world-layout.tsx` preloads the three first-paint font files so full page loads do not flash fallback faces.

## Shared controls and effects

`InteractionOrb` retains its existing API and now renders an outlined `DiscoveryMark`, rather than a floating glowing dot. The same mark is used for quiet copy discoveries. `InteractionOrb` renders either a real link (`href`) or button (`onClick`). Supply a descriptive `label`; optional `hint` is the brief visible tooltip. Optional `marker` replaces the decorative glint with a scene-owned object (GitHub sticker or Twitter phone) while preserving the shared target and label behavior. Custom markers must be decorative; accessible naming stays on the link/button. Social destinations live in `data/site.ts`. Optional `pressed`, `hasPopup` and `disabled` expose action semantics. Place it with a scene class or percentage style. Touch activates the action directly; it does not require a hover-only step. Text navigation provides the obvious route to essentials. Marks are hidden at rest so the paintings stay clean. `WorldShell` shows them three ways: once on a first visit to each page in a session (an arrival reveal), briefly for all of them from the eye button in the footer or the `?` key (`data-reveal` on `.world`), and as an occasional glint on one visible mark (`data-glint`). Hover and focus always show the mark and its hint.

Use `useMotionPolicy().enabled` **and** scene `active` for continuous scene renderers. CSS animations inherit the shared pause rules. Imperative canvases must explicitly pause, stop when hidden, clean up frames/listeners/textures/renderers, bound their pixel ratio and preserve the painting if initialization fails. Lazy-load expensive engines. The existing lake implementation is an experiment with lake-specific shoreline geometry, not yet a generic water engine. Extract shared lifecycle code once another real effect demonstrates the common contract; keep shaders and masks scene-local.

Keep runtime business content in TypeScript or Prismic. JSON under docs is asset provenance, not an alternative runtime configuration. UI content remains HTML; decorative canvas/SVG art is hidden from assistive technology.

## Work monitor desktop

`rooms/work/monitor-desktop.tsx` (with `monitor-desktop.module.css`) renders the monitor as a desktop from `deskFiles` and `deskNotes` in `rooms/work/content.ts`. Windows are real HTML (`role="dialog"`, non-modal), focusable, draggable within the screen and closed with Escape, returning focus to their icon. The visitor's mini cursor is updated directly on pointer move; the idle wander only highlights icons and never opens anything, and stops while motion is disabled. Leaning in portals the screen to the `.world` root (the art stage is transformed, so `position: fixed` cannot live inside it) with a same-document view transition; phones lean in when a file opens and show windows full-screen. Without JavaScript, `DesktopFallback` lists every file. Copy is draft until Glen approves it; case-study pages are later work. The wallpaper (`desk-wallpaper.tsx`) is quiet paper: a cream-to-sage gradient, faint grain, generated hand-drawn contour lines and a coffee ring. Painted scene wallpapers were tried and removed: a second painting inside the painted room competed with it and put two Glens on screen. On large screens the desktop fills the whole painted screen: `screen-mask.ts` (generated by `scripts/work-screen-mask.mjs` from the room art, checked by `scripts/work-screen-mask.test.mjs`) gives the measured screen box and a PNG alpha mask whose edge follows the painting's own anti-aliasing, so Glen's painted head stays in front. Phones and the leaned-in screen use no mask. The room's desk lamp sets the desktop's dark mode (`dark`), a 90-second quiet spell on the page lets it drift into the screensaver (`onIdle`), and “Glen's desk” in the menu bar is a system menu with Restart (a short boot) and Shut down. The desktop also has rubber-band selection (highlight only) and rare decorative notifications (`deskToasts`, `aria-hidden`, idle and motion-enabled only).

## Rooms without dialogs

The Work laptop (`rooms/work/slack-profile.tsx`) is a button that leans in to a straightened Slack window, portalled to `.world` with a view transition: channels in the sidebar, a profile with role, status and Valencia clock, and a quiet remote.com link where Slack's search would be. Escape, the close button or the backdrop return focus to the laptop. The Writing archive tray and the “All writing” button bring out index cards anchored in the room (`section.archive-cards`, non-modal), with search, topic chips and a link to the original blog; Escape or a click elsewhere puts them back and returns focus to whichever control opened them. In the city, the coffee cup is a small action (a sip and a puff of steam) rather than a contact link; contact lives in the header and at the day's end.

The header's contact is a plain “Say hello ↗” link after a faint divider (“hello ↗” on very narrow phones), not a button.

## Parallel ownership

Work owns the interactive globe in `rooms/work/spinning-globe.tsx`, `spinning-globe.module.css`, `globe-renderer.ts` and `globe-motion.ts`. It uses a bounded 160×160 Canvas2D surface over an illustrated fallback, shared `InteractionOrb` controls, and motion-policy-aware momentum with no idle animation loop. Keep its projection, map texture, room artwork and responsive placement local to Work. Its assets use the `work-globe*` prefix; verification and provenance live in `docs/verification/work-refinement/globe.md`, with focused physics checks in `scripts/work-globe.test.mjs`.

Writing-desk handwriting is owned by `rooms/writing/writing-hand.tsx` and `rooms/writing/styles.css`; its assets keep the historical `stories-writing-*` prefix. The unused shared `RoomHands` prototype has been removed. One opaque hand cut from the approved artwork rotates over a fixed cleaned background, with the original cuff above it. Desktop/portrait masks and cleaned backgrounds use the `public/assets/world/stories-writing-*` prefix. Keep these assets and motion geometry together; preserve the original painting fallback while assets load or fail. Verification lives in `docs/verification/stories-refinement/`.

- Lakeside thread: `scenes/lake/`, lake assets, lake tests and verification.
- Beach thread: `scenes/beach/`, beach assets, beach tests and verification.
- City thread: `scenes/city/`, city assets, city tests and verification.
- Coordinating thread: shared modules, routing, shared styles, dependency changes and top-level documentation.

Do not copy/paste the orb or another scene's renderer into a new local implementation. Request changes to shared APIs through coordination. Use unique files for generated assets/evidence. Workstation/Writing remain intact unless explicitly assigned. Local threads share one checkout: changes appear immediately. A second `next build` or server restart can disrupt another thread; coordinate before either.

## Promoting the experience later

Promotion is a separate requested step; this refactor does not switch the public site. See [the current readiness review](site-readiness.md) for the remaining launch work.

1. Change the single mount in `lib/routes.ts` from `/preview/diorama` to an empty string. Its helper maps that to `/`, `/work`, `/writing` and the `/blog` article prefix. `articleHref` and legacy article-link resolution live in that same module.
2. Compose `WorldLayout` and the existing feature screens in the public route entries, or a shared route-group layout. Keep the old pages recoverable in Git. Avoid wrapping article pages in a scenic viewport.
3. Preserve `/blog` and every `/blog/[uid]`; retain `/skills` or add a deliberate redirect. Decide whether Writing replaces the blog index or complements it. The server article adapter and original URLs do not change.
4. Keep preview routes `noindex`; set public titles, descriptions, canonical URLs, sitemap and social metadata for the new public entries. If keeping both mounts live, replace the single deployment mount with an explicit route context; do not silently let preview links escape to public pages.
5. Verify direct navigation, back/forward, fragments, article URLs, external links, no-JavaScript content, reduced motion, keyboard operation and mobile layouts. Measure assets/runtime and review animation on representative hardware before claiming performance.

## Verification

Use the scripts in `package.json` for typecheck, lint and production build. After a coordinated build, run `rtk proxy npm run test:diorama` on Node 24+ to run every focused suite, including the required rendered-content and lake-shoreline checks. In hosts where the default build cannot create Turbopack workers, use `rtk proxy npm run build -- --webpack`. The tests check reversible scene travel, archive batching, routing and rendered semantics; the lake test checks its water mask against actual painting pixels.

For visual work, inspect several moments of the animation, not just the initial frame. Exercise orbs with mouse/touch and keyboard, verify label disclosure and focus return, and compare desktop/phone composition. Store scene-specific evidence under `docs/verification/`. Keep claims limited to what was actually observed.
