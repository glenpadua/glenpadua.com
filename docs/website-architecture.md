# Website architecture and edit guide

Updated 28 September 2026. This is the current implementation map. Historical v1/v2 reports describe their own checkpoints; use this guide for paths and ownership today.

## Routes and the archive

The illustrated site is the website. It is a route-independent feature (`features/diorama/`) mounted by thin entries in `app/`:

| URL                           | Entry                             | Notes                                                                              |
| ----------------------------- | --------------------------------- | ---------------------------------------------------------------------------------- |
| `/`                           | `app/page.tsx`                    | The day's journey; also emits the `Person` JSON-LD                                 |
| `/work`                       | `app/work/page.tsx`               | Work room                                                                          |
| `/writing`                    | `app/writing/page.tsx`            | Writing room (revalidates hourly from Prismic)                                     |
| `/blog/<uid>`                 | `app/blog/[uid]/page.tsx`         | Article reader, `BlogPosting` JSON-LD; `app/blog/layout.tsx` adds Prismic previews |
| not found                     | `app/not-found.tsx`               | `screens/lost-page.tsx`                                                            |
| `/robots.txt`, `/sitemap.xml` | `app/robots.ts`, `app/sitemap.ts` | Sitemap lists the rooms and every article                                          |

`app/layout.tsx` wraps every page in `WorldLayout` and sets site-wide metadata from `data/site.ts`. Page metadata comes from `lib/metadata.ts` (`pageMetadata`), which sets the canonical URL and the Open Graph/Twitter card on every page. `app/globals.css` is the only global stylesheet: a vendored copy of Tailwind v3's preflight (so the site keeps the base it was designed on, without a Tailwind build), a zero margin/padding reset, and `.sr-only`.

`next.config.mjs` keeps old addresses working: `/preview/diorama/*` → the same path at the root, other `/preview/*` studies → `/`, `/blog` → `/writing`, `/skills` → `/work`, `/story/<uid>` → `/blog/<uid>`. Every `/blog/<uid>` article kept its URL.

The previous website, its data and assets, and the early `/preview/lakeside` and `/preview/coast` studies are in `archive/legacy-site/` (see its README). The archive is excluded from builds, linting and type-checking. Do not import from it.

Do not add a root `app/loading.tsx`. It parked the built scenic pages inside a hidden React streaming container, requiring JavaScript to reveal otherwise complete static content. The generated-HTML contracts check the ancestors of each page's main content to guard against this regression.

```text
features/diorama/
  world-layout.tsx          reusable experience layout
  screens/world-journey.tsx native scroll, active chapter, nearby loading
  screens/lost-page.tsx     the not-found page
  data/scenes.ts            chapter order
  data/site.ts              site identity, share image, contact and socials
  articles/                reading layout, cover registry and article CMS adapter
  model/                   scene content and runtime contracts
  lib/                     route map, page metadata, asset paths, pure choreography
  shared/                  orb, motion policy, layer/fallback renderer, sky, shell
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

## What to edit

| Task                                                                     | Owner                                                                           |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------- |
| Add/remove/reorder homepage chapters                                     | `features/diorama/data/scenes.ts`                                               |
| Change one scene's words, layers, hotspot locations or phone composition | `scenes/<name>/content.ts` and `styles.css`                                     |
| Character movement, water, lighting, scene-specific interaction state    | `scenes/<name>/scene.tsx` and adjacent modules                                  |
| Every interaction orb's appearance and behavior                          | `shared/interaction-orb.tsx` and `interaction-orb.css`                          |
| Pause, reduced motion, tab visibility                                    | `shared/scene-motion.tsx`                                                       |
| Scroll transitions and nearby asset loading                              | `screens/world-journey.tsx`, `lib/travel.ts`                                    |
| Default layer images, static fallback, image failure handling            | `shared/scene-artwork.tsx`                                                      |
| Project content/order                                                    | `rooms/work/content.ts`                                                         |
| Featured article notes/order and outage fallback                         | `rooms/writing/content.ts`                                                      |
| Matching Writing thumbnails and article covers                           | `articles/covers.ts`, `getArticleCover(uid)`                                    |
| Writing desk objects, optional session memory, collection and postcard   | `rooms/writing/desk-objects.css`, `desk-state.ts`, `chronicles.*`, `postcard.*` |
| Writing-desk handwriting and its painting-space masks                    | `rooms/writing/writing-hand.tsx`, `rooms/writing/styles.css`                    |
| CMS refresh/mapping                                                      | `rooms/writing/load-articles.ts` (server only)                                  |
| Mount URLs / contact, site title and share image                         | `lib/routes.ts` / `data/site.ts`                                                |

## Scene contract

`WorldScene` is serializable content: id, copy, description, palette, mobile stage, layers and link hotspots. `SceneProps` adds `load`, `first`, and `active`. The journey supplies these and manages native scroll, visibility and inert inactive chapters. `sceneFrame` supplies each chapter's passage role (`rest`, `in`, `out`), a shared `wipe` amount and separate `subject` (people, props, discoveries) and `copy` fades. A scene's optional `entrance` (`tide`, `dusk`, default `fade`) names a shaped edge in `shared/scene-wipe.css`: the incoming chapter is uncovered over the opaque outgoing one, which takes the inverse mask. Browsers without `mask-composite` fall back to a fade. Hidden chapters get both `visibility: hidden` and `opacity: 0`, because scene CSS may force children visible. Outgoing people leave ahead of the edge by wipe 0.55, or 0.42 on portrait stages where people sit nearer the entrance edges (`leaveBy`); incoming people wait for `PEOPLE_HANDOFF`. The contract tests keep one person and one heading on screen at a time. Ground layers, local effects and discovery targets share fixed painting-space geometry, with no scroll-derived translation or layer depth speeds. Preserve local character/environment animation and the shared sky’s scroll progression.

`SceneArtwork` supplies the shared art stage, default images, no-JavaScript/error fallback and link hotspots. A scene can supply `renderLayer`, `afterLayer`, `atmosphere`, `controls`, `response` and `fallback`. Return `undefined` from `renderLayer` to use the default image. Optional `fallback` replaces the default static image both after a layer failure and inside `<noscript>`; use static, decorative markup with scene-owned responsive positioning and no dependency on effects or event handlers. Keep essential links in the existing hotspot/navigation slots. Omitting the fallback preserves the default image and its horizon mask. Keep behavior and state in the scene rather than adding new scene-id branches to the shared renderer.

For a new chapter, create a unique id and its content, add it to `data/scenes.ts`, and supply a `<id>-static.webp` fallback plus declared assets. A data-only scene works with the default renderer. For custom effects, add its component to `scenes/registry.tsx` and import its stylesheet in `styles/index.css`. Unique ids are required. The empty scene list has an intentional fallback; a single scene works without a transition.

Scenes and rooms fill the large viewport (`100lvh`), so on phones the painting runs beneath Safari's glass toolbar and Chrome's URL bar instead of leaving a band of page background. `--toolbar` (on `.world`, `100lvh - 100svh`, zero on desktop) lifts in-room controls that must stay tappable, such as the Writing buttons. Use `svh` only for sizes that must fit the visible area, and `lvh` for anything that paints the background.

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

The drifting clouds share `sky-cloud-painted-v1.webp`, a small transparent painted mask, with daylight/night ink, shade and rim colours supplied by `sky-time.ts`. Keep their edges and texture consistent with the clouds retained in the city painting; avoid smooth SVG bubble silhouettes. They use the existing transform animation and motion policy, without another render loop. See [cloud verification and asset provenance](verification/clouds-2026-09-27/README.md).

Lake uses a painting-space ridge/pine mask from `scenes/lake/horizon.ts`; its existing animated pines share those same paths. The page masks with `lake-horizon-mask-v1.webp`, rendered from that SVG by `node scripts/lake-horizon-mask.mjs` (re-run it after editing the ridge or pines; `scripts/lake-horizon-mask.test.mjs` catches a stale copy). Do not mask with a filtered SVG directly: browsers re-run the filter on every repaint, which at retina desktop sizes took ~300 ms and blanked the lake while scrolling. Optional `WorldLayer.mask` applies the silhouette to the whole layer and static fallback. Optional `WorldScene.sunrise` anchors the initial sun centre to a percentage position in the background painting. The journey projects this into viewport coordinates on initialization/resize using the scaled background width and the resting art stage, independent of image load and scroll travel. Sun/moon arcs stay in `sky-time.ts`, with separate portrait heights; the lake's morning tint stays in its scene stylesheet.

Before hydration or without JavaScript, each stacked scene has its own server-rendered sky at its declared time. Once ready, only the continuous sky is displayed. Reduced motion and pause stop ambient CSS motion and use each active chapter's still sky, with no celestial scroll travel. The global visibility policy pauses ambient effects in background tabs. Run `scripts/sky-time.test.mjs` for colour/position continuity, reverse travel, chapter edits and day/night handoff; visual checks must also inspect the masks and intermediate scroll positions on desktop and portrait.

## The day's end and scroll gusts

`lib/travel.ts` maps scroll to chapters plus an `EPILOGUE` (0.8 viewport heights) after the last one (`journeyPosition`, `chapterStop`). The journey sets `--ending` (0–1; snapped while paused) and `data-ended`; `shared/journey-ending.tsx` renders the closing words from `data/ending.ts` over the night sky, or as an ordinary block without JavaScript. Internal links use a plain → and external ones ↗; socials are a small icon row. Keyboard focus entering it scrolls it into view. At the end the scroll arrow becomes a labelled “Back to dawn” button that returns to the top and focuses the page. `#end` is a fragment stop. At dawn “Spend a day with me” sits centred above the scroll arrow (it fades in after a moment and away once scrolling starts; the arrow itself never moves); tapping any arrow glides to the next scene's `world-stop` rather than jumping past the handover. The journey page disables overscroll bounce, so no pale background flashes beyond the night. There is no scroll snapping: on iPhone it pulled swipes back.

On iOS Safari, three things matter (verified in the iOS Simulator's Safari):

- The scene viewport is `position: fixed` at `100lvh`, and scroll travel is measured against it (`journeyTravel`), never `innerHeight`, which changes as the toolbar shrinks mid-swipe and made scenes lurch. The painting rests on the visible bottom edge (`bottom: var(--toolbar)`), and a strip of `--ground` continues beneath it.
- Safari tints its floating toolbar from the page background. `html` sets `--ground` from the scene or room on screen (grass, sand, terrace, desk), so the toolbar matches the painting instead of showing a pale band.
- iOS withholds or delays a tap's click while the page is changing. So the arrow acts on a still touch release; a short hold (`holdTaps`) ignores the late or doubled click; its mousedown doesn't move focus (iOS scrolled the focused journey back to dawn); the heading's retyping runs on animation frames; and on touch, interaction marks rest at half opacity rather than appearing from nothing under a finger.

The journey also sets `--lean` (−1 to 1) from smoothed scroll speed and keeps settling for a few frames after scrolling stops, then goes idle. It is 0 while motion is disabled. Scenes may use it for small foreground foliage only (city sprigs); keep it to a degree or two. Never put it or a full-scene mask on a screen-sized layer: leaning the lake meadow on scroll made the lake flicker in Chromium, and five masked grass strips halved its scroll frame rate on retina desktops.

## Scene copy

`shared/scene-copy.tsx` renders scene-owned words with semantic headings, naturally wrapping paragraphs and an optional `discovery`, a quiet real link; its copy stays in `scenes/<name>/content.ts`. Disclosure dialogs were removed: information belongs inside the scene. `eyebrow` is optional; the homepage no longer supplies it. Common copy/link styling lives in `shared/scene-copy.css`; each scene owns heading scale and placement.

## Page transitions

Full page loads inside the world (desk papers, article links, “Back to Writing”) use cross-document view transitions from `shared/page-transitions.css`. The header and bottom controls are anchored; a story cover carries one `cover-<uid>` name (from `coverTransition` in `articles/covers.ts`) on the desk paper and in the article, so it grows from the paper into the page and settles back. `WorldShell` skips the transition while motion is paused; reduced motion removes its animation. Browsers without cross-document view transitions navigate normally. Header links are client-side navigations and do not use this path. `world-layout.tsx` preloads the three first-paint font files so full page loads do not flash fallback faces.

## Shared controls and effects

`InteractionOrb` renders either a real link (`href`) or button (`onClick`) and signals itself with `CueLight`: a ring of warm light around the object (a thin bright edge, a soft glow, a faint dark rim for light backgrounds; at least 124px, or 130% of a large hotspot, with a clear centre so it never veils a character). There is no icon. On screens with a pointer the light is dark at rest; on touch it rests faintly lit (`--light-rest`). `WorldShell` brightens it four ways: as a mouse comes within about 150px, or a finger touches nearby (`--near`, `data-near`); a reveal of every light when someone lingers on a scene or room for 2.6 seconds, once per scene per visit; the footer's eye button, labelled “Things to touch”, or the `?` key (`data-reveal`); and an occasional glint on one light (`data-glint`). Hover and keyboard focus light it fully and show its hint; a pressed toggle keeps a little warmer light. Supply a descriptive `label`; optional `hint` is the brief visible tooltip. Optional `marker` replaces the light with a scene-owned object (GitHub sticker, lake cheer target) while preserving the shared target and label behaviour; the beach phone keeps a light alongside its art. Custom markers must be decorative; accessible naming stays on the link or button. Social destinations live in `data/site.ts`. Optional `pressed`, `hasPopup` and `disabled` expose action semantics. Place it with a scene class or percentage style. Touch activates the action directly. Text navigation provides the obvious route to essentials.

Use `useMotionPolicy().enabled` **and** scene `active` for continuous scene renderers. CSS animations inherit the shared pause rules. Imperative canvases must explicitly pause, stop when hidden, clean up frames/listeners/textures/renderers, bound their pixel ratio and preserve the painting if initialization fails. Lazy-load expensive engines. The existing lake implementation is an experiment with lake-specific shoreline geometry, not yet a generic water engine. Extract shared lifecycle code once another real effect demonstrates the common contract; keep shaders and masks scene-local.

Keep runtime business content in TypeScript or Prismic. JSON under docs is asset provenance, not an alternative runtime configuration. UI content remains HTML; decorative canvas/SVG art is hidden from assistive technology.

## Work monitor desktop

`rooms/work/monitor-desktop.tsx` (with `monitor-desktop.module.css`) renders the monitor as a desktop from `deskFiles` and `deskNotes` in `rooms/work/content.ts`. Windows are real HTML (`role="dialog"`, non-modal), focusable, draggable within the screen and closed with Escape, returning focus to their icon. The visitor's mini cursor is updated directly on pointer move; the idle wander only highlights icons and never opens anything, and stops while motion is disabled. Leaning in portals the screen to the `.world` root (the art stage is transformed, so `position: fixed` cannot live inside it) with a same-document view transition; phones lean in when a file opens and show windows full-screen. Without JavaScript, `DesktopFallback` lists every file. Copy is draft until Glen approves it; case-study pages are later work. The wallpaper (`desk-wallpaper.tsx`) is cream-to-sage paper with faint grain and the homepage's day doodled in light line art: the lake at dawn (a tiny stick figure on the bar), the beach at midday and the city at night, joined by a dotted trail, with a drifting paper plane and a coffee ring. Painted scene wallpapers were tried and removed: a second painting inside the painted room competed with it and put two Glens on screen. Trash lists abandoned projects as tilted icons (`scraps` in `content.ts`). On large screens the desktop fills the whole painted screen: `screen-mask.ts` (generated by `scripts/work-screen-mask.mjs` from the room art, checked by `scripts/work-screen-mask.test.mjs`) gives the measured screen box and a PNG alpha mask whose edge follows the painting's own anti-aliasing, so Glen's painted head stays in front. Phones and the leaned-in screen use no mask. The room's desk lamp sets the desktop's dark mode (`dark`), a 90-second quiet spell on the page lets it drift into the screensaver (`onIdle`; `screen-saver.tsx`, a signature that bounces off the edges and changes colour, celebrating corner hits, still when motion is off), and “Glen's desktop” in the menu bar is a system menu with Restart (a short boot) and Shut down. The desktop also has rubber-band selection (highlight only) and rare decorative notifications (`deskToasts`, `aria-hidden`, idle and motion-enabled only).

## Rooms without dialogs

The Work screensaver's collision model lives in `rooms/work/screen-saver-motion.ts`. Its field fills the whole monitor; the away message and wake button sit above it as a small readable overlay. Motion advances to each wall contact before using the rest of a frame, and counts a corner only when both edges meet within half a CSS pixel. Missing layout bounds cannot score hits. Keep the normalized position across pause/resume, and keep celebration expiry independent of the motion effect. Regression checks and browser evidence live in `scripts/work-screensaver.test.mjs` and `docs/verification/work-screensaver/`.

The Work laptop (`rooms/work/slack-profile.tsx`) is a button that leans in to a straightened Slack window, portalled to `.world` with a view transition: channels in the sidebar, a profile with role, status and Valencia clock, and a quiet remote.com link where Slack's search would be. Each channel button shows one short conversation (`slackChannels` in `content.ts`, draft copy with made-up teammates), advancing to the next on every click from a random start; the DM entry returns to the profile. Escape, the close button or the backdrop return focus to the laptop. The Writing archive tray brings out index cards anchored in the room (`section.archive-cards`, non-modal), with search, paper divider topics and ordinary article links; Escape or a click elsewhere puts them back and returns focus to whichever control opened them. In the city, the coffee cup is a small action (a sip and a puff of steam) rather than a contact link; contact lives in the header and at the day's end.

The header's contact is a plain “Say hello ↗” link after a faint divider (“hello ↗” on very narrow phones), not a button.

## Parallel ownership

Lake's pull-up routine lives in `scenes/lake/character.tsx` and `pullup-routine.ts`: three reps, a release and soft landing, a short arm shake, then a hop back to the fixed bar. The first four atlas cells preserve the existing pull-up drawings; six recovery poses are registered without limb warping by `scripts/prepare-lake-pullup.mjs`, then encoded through the normal art pipeline. The scene-local clock runs only while Lake is active and the shared motion policy permits it, preserving the current pose on pause. Held poses sleep until the next beat; only the drop and hop request continuous animation frames. Cheers quicken three reps without resetting a grounded pose. See [routine verification and provenance](verification/lake-pullup-routine/README.md) and the [motion performance follow-up](verification/motion-polish/README.md).

Beach's typing/stretch routine lives in `scenes/beach/typing.ts`, with painting-space limits in `stretch.ts`. `scripts/prepare-beach-stretch.mjs` prepares clean character cutouts, a fixed backdrop and the original typing matte; all exports pass through the normal art encoder. Stretch poses are cropped to their visible region with the boundary baked into alpha, avoiding full-canvas decoding and runtime SVG clipping. `scripts/prepare-beach-typing-patch.mjs` also crops the second typing pose to the 110×66 keyboard patch; `TYPING_PATCH_STYLE` places it in the original 900×900 painting coordinates. Keep the background fixed and remove detached alpha components before serving new poses: clipping a generated full-scene frame caused canopy seams and stray pixels. The head and shoulders move together, and the active-time timer respects the shared motion policy. See [verification and provenance](verification/beach-stretch/README.md).

City's glances, conversation, laughter and independent coffee sips live in `scenes/city/couple.tsx` and `couple-motion.ts`, with painting-space limits in `couple-geometry.ts`. `scripts/prepare-city-couple.mjs` cleans and registers ten upper-body cutouts over a fixed terrace and lower bodies; encode the exports through the normal art pipeline. Only complete exchanges are randomized, separated by quiet intervals. A boundary timer advances poses while the scene is active and the shared motion policy allows it; coffee clicks queue one sip during an exchange. Keep the neutral listener's exact atlas pixels during the other person's sip to prevent lossy re-encoding shimmer, and keep steam attached to the moving mug. See [verification and asset provenance](verification/city-couple/README.md).

Work owns the interactive globe in `rooms/work/spinning-globe.tsx`, `spinning-globe.module.css`, `globe-renderer.ts` and `globe-motion.ts`. It uses a bounded 160×160 Canvas2D surface over an illustrated fallback, shared `InteractionOrb` controls, and motion-policy-aware momentum with no idle animation loop. Keep its projection, map texture, room artwork and responsive placement local to Work. Its assets use the `work-globe*` prefix; verification and provenance live in `docs/verification/work-refinement/globe.md`, with focused physics checks in `scripts/work-globe.test.mjs`.

Writing-desk handwriting is owned by `rooms/writing/writing-hand.tsx` and `rooms/writing/styles.css`; its assets keep the historical `stories-writing-*` prefix. The unused shared `RoomHands` prototype has been removed. One opaque hand cut from the approved artwork rotates over a fixed cleaned background, with the original cuff above it. Desktop/portrait masks and cleaned backgrounds use the `public/assets/world/stories-writing-*` prefix. Keep these assets and motion geometry together; preserve the original painting fallback while assets load or fail. The 11-second routine includes short strokes, a hesitation and a thinking pause. Asking the pen to rest finishes its current stroke, then settles. The shared motion policy and a hand-area observer pause it when hidden, offscreen or explicitly paused. Verification lives in `docs/verification/stories-refinement/` and `docs/verification/writing-delight/`.

Writing uses its portrait composition at widths at most 520px or aspect ratios at most 13:10. The painting, hand masks, placeholder and scene objects use that same breakpoint. The compact desk removes empty middle wood using two overlapping slices of the original painting: the lamp/cup stay at the top, while the full-height painting and hand composite stay aligned at the bottom. `--desk-art-height` keeps lower object targets in the original painting coordinates; `--desk-height` controls the shorter room. The placeholder uses the same slices. Loose papers have a capped 620px spread and independent height so tablet windows do not inflate them. Some short viewports still scroll. On the wide desk, the painted lower binder clip opens the Chronicles and the painted tray opens the archive; compact layouts have a small illustrated manuscript stack using the first chapter's existing cover. “More pages” is a paper stack, tucked away while the compact collection is open. Session memory keeps the current spread or collection, lamp state and last-opened article; unavailable storage does not block reading. Server and initial client output are settled; returning from an article never replays the loose-paper arrival or Chronicles fan. Confirmed first visits and explicit object interactions may animate. The postcard quotes the published dream-job essay and uses a locally masked cleanup plate, with the original painting retained underneath.

- Lakeside thread: `scenes/lake/`, lake assets, lake tests and verification.
- Beach thread: `scenes/beach/`, beach assets, beach tests and verification.
- City thread: `scenes/city/`, city assets, city tests and verification.
- Coordinating thread: shared modules, routing, shared styles, dependency changes and top-level documentation.

Do not copy/paste the orb or another scene's renderer into a new local implementation. Request changes to shared APIs through coordination. Use unique files for generated assets/evidence. Workstation/Writing remain intact unless explicitly assigned. Local threads share one checkout: changes appear immediately. A second `next build` or server restart can disrupt another thread; coordinate before either.

## Loading without flashes

Every scene and room paints in one piece. `shared/art-veil.tsx` lays a blurred miniature of the painting (from `data/placeholders.ts`, about 300 bytes each, inlined; regenerate with `node scripts/art-placeholders.mjs` after changing a scene's or room's art) over the stage, and dissolves it once everything on the stage is ready: its `<img>`s, SVG `<image>`s and CSS mask/background images. An inline script does the watching while the page is still parsing, so a first visit doesn't wait for JavaScript; an effect does it after client navigation, where the veil waits 160ms before appearing, so already-downloaded art never flickers through a blur. Veils only exist with JavaScript (`html.art-gate`) and lift themselves after 4.5s regardless. The Writing papers wait under the veil to be dealt.

Supporting this: the lake preloads its SVG landscape and horizon mask with high priority, and the beach waits until the page has loaded before downloading. `WorldShell` fetches the other rooms' opening paintings at low priority 2.5s after a page settles, and immediately when a nav link is hovered, touched or focused; nav links use Next's prefetch. The article cover shows the desk paper's thumbnail behind the full image, so the Writing → article morph always lands on a picture. In the page transition the old page stays opaque and the new one fades in over it with a normal blend (`page-transitions.css`): the browser's default additive crossfade dipped and flashed between the dark desk and the cream article. Only the paper that belongs to the article keeps its cover transition name while a page is swapped or revealed (the `coverFocus` script in `world-layout.tsx`), so the other papers don't fade in one by one. The papers' deal answers to `data-still` (Pause only), not `data-motion`, which also turns off when the tab is hidden and would replay the deal after a back-forward cache restore or a tab switch.

## Paintings and page weight

Large paintings have two copies. The approved full-quality file lives in `art-source/world/`; the site serves an encoded copy under the same name in `public/assets/world/` (lossy WebP at a visually lossless setting, lossless alpha), written by `scripts/encode-art.mjs`. Edit art in `art-source/`, then re-run the script. Geometry scripts and tests (Work screen mask, lake shoreline, writing hand) read the served copies, because that is what visitors see. Article link-preview cards (`<uid>-v1-og.jpg`) come from `scripts/article-og-images.mjs`; `covers.ts` exposes them as `shareSrc`.

Heavy code stays lazy: the lake and beach water renderers import three.js on demand, and Prismic's preview toolbar only loads under `/blog`. Measured on a local production build (28 September 2026, cache disabled): Work ≈ 0.66 MB, Writing ≈ 0.8 MB, an article ≈ 0.4 MB, and the whole homepage journey ≈ 1.7 MB after scrolling to the end; LCP under 350 ms locally. Re-measure after adding paintings.

## Verification

Use the scripts in `package.json` for typecheck, lint and production build. After a coordinated build, run `rtk proxy npm run test:diorama` on Node 24+ to run every focused suite, including the required rendered-content and lake-shoreline checks. In hosts where the default build cannot create Turbopack workers, use `rtk proxy npm run build -- --webpack`. The tests check reversible scene travel, archive batching, routing and rendered semantics; the lake test checks its water mask against actual painting pixels.

For visual work, inspect several moments of the animation, not just the initial frame. Exercise orbs with mouse/touch and keyboard, verify label disclosure and focus return, and compare desktop/phone composition. Store scene-specific evidence under `docs/verification/`. Keep claims limited to what was actually observed.
