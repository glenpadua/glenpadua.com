# Two scenes, one repeatable pattern

> Current implementation: [architecture and edit guide](website-architecture.md). Current design decisions: [creative direction](website-direction.md). This document retains the earlier study/checkpoint; its old file paths and technology limits are historical.

26 September 2026. Working preview: `/preview/diorama`. Individual studies remain at `/preview/lakeside` and `/preview/coast`. All three are static, `noindex` preview routes; the public homepage is unchanged.

The [manifesto](../MANIFESTO.md) sets the direction. These two chapters test how to carry that direction across different places, exercises, and screen sizes. The [beach reference](references/beach-pushup-reference.png) is the starting art direction for the second chapter; the [lakeside notes](lakeside-scene.md) preserve the first experiment and its rejected approaches.

## The experience

The lake gives way to a short, quiet passage, then the coast. Painted edges fade into the surrounding page, and the coast gradually shifts the palette from sage and ivory to turquoise and sand. Scrolling stays native, reversible, and unrestricted. Chapter links work as ordinary fragment links. There is no forced snapping, pinned scroll tunnel, or input interception.

Both chapters now have independently moving near trees, slow water highlights, birds, and foreground grass. The coast adds two overlapping shoreline washes and a sailboat with separate rocking and drifting rhythms. The distant forest and headland remain painted into the backgrounds. This is layered 2D artwork, not a simulated ocean or independently articulated tree branches.

The beach sprite is roughly 17% smaller than the initial study at each breakpoint. Shoreline motion reuses a clipped, softly masked strip of the background's painted foam: it advances 19 artwork pixels, then retreats over eight seconds, with staggered foam highlights. This preserves the illustration's texture without another asset. The sprite sits above the page-edge fade so its feet remain clear at the smaller size. The same pause and reduced-motion rules apply to the water.

Scroll and mouse parallax add small differences in depth. Background travel is bounded to 36px in either direction; mouse travel is similarly bounded. Animation uses transforms and opacity. Copy remains still and selectable HTML.

## Reusable pieces

Shared components live in `app/preview/_components/`:

| Piece                                  | Responsibility                                                                                     |
| -------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `SceneMotionProvider` / `MotionToggle` | One pause state for the whole journey; system motion preference and tab visibility                 |
| `useSceneMotion`                       | Per-chapter visibility, bounded mouse and scroll parallax, event listener cleanup                  |
| `useSpriteSequence`                    | A timed list of full poses; preserves remaining frame duration through pause and offscreen periods |
| `AtlasCell`                            | Displays one 512px cell from a 1536 × 1024 transparent atlas                                       |
| `contactTransform`                     | Uniform scale, rotation, and translation to register two measured contact points                   |
| `NatureArt`                            | Selects a painted tree or boat from the shared decoration atlas                                    |

The scene owns composition, content, timings, and occlusion. These stay explicit rather than being hidden in an elaborate scene description language. Add a third scene before expanding the abstraction further.

## Character rules learned the hard way

1. **Identity is an invariant.** Brown hair, sunglasses, yellow/ivory shirt, shorts, and the anatomical left prosthesis must persist. The push-up view shows the prosthetic socket and metal pylon on the near leg. Never mirror a sprite to change its direction.
2. **Draw complete poses.** The first procedural-arm experiment produced implausible anatomy. Full drawn poses preserve the relationship between shoulder, elbow, sleeve, hand, and torso.
3. **Measure contacts after generation.** Prompts asking for fixed coordinates do not guarantee them. For pull-ups, register both grips. For push-ups, register the near palm and prosthetic shoe contact to the same ground line.
4. **Use uniform transforms.** Do not independently scale limbs or stretch the torso to force alignment. The shared two-contact transform rotates and uniformly scales the whole drawing.
5. **Depth is part of the action.** The pull-up body is behind the bar, with clipped fingers in front. The beach has no exercise apparatus; its shadow sits below the registered contact line.
6. **Review the whole cycle.** Check top, bottom, ascent, descent, and the last-to-first loop. A good still frame is insufficient.

The push-up cycle selects four poses from six generated candidates. It pauses in the top plank, lowers more slowly, holds briefly near the sand, then pushes up. The last two generated cells are unused because reversing the selected poses keeps the cycle more consistent.

Both exercises are deliberately stepped pixel animations. Registration fixes contact drift; it cannot fix every proportion change inside generated drawings. Small changes in head/body proportions remain in the beach sheet. A final character pipeline should use an approved model sheet and artist-cleaned in-betweens. Generating more unrelated sheets is not a dependable way to achieve smooth, consistent animation.

## Adding the next scene

1. Write its purpose, copy, personal activity, and intended feeling first. Reserve quiet sky or another low-detail region for the content.
2. Prepare a background without the character or independently moving props. Export separate transparent foreground and prop art. Match palette, grain, light direction, and horizon.
3. Make and inspect the character atlas. Record cell positions, contact landmarks, selected poses, and phase durations beside the component. Reject anatomically wrong or inconsistent frames.
4. Build the scene using semantic headings, links, a descriptive figure, and decorative artwork hidden from assistive technology. Use one page-level H1 and chapter-level H2s in a journey.
5. Wrap the page once in the motion provider. Apply the scene hook to each chapter. All animation must live beneath its `data-moving` root.
6. Compose mobile independently. Keep the sprite on actual ground and vegetation outside the text area. Let the section grow taller than the viewport when necessary.
7. Connect chapters with a shared edge color and a brief visual rest. Check partial scroll positions as well as each full scene, in both directions.
8. Verify the acceptance list below and record what was actually observed.

## Motion and accessibility contract

- First render is still. Reduced motion is honored in JavaScript and CSS; content and links remain present without animation or JavaScript.
- Either pause button controls both chapters. Sprite timers and CSS animation pause together. Parallax stops accepting updates while paused.
- Hidden tabs and offscreen chapters do not run sprite timers or ambient animations. Scroll updates are event-driven and coalesced into one animation frame, not a perpetual JavaScript loop.
- Scene text is never encoded in an image. Figures describe the activity and prosthesis once; individual decorative layers are hidden from assistive technology.
- Native scrolling, keyboard activation, visible focus, and direct chapter links remain available.

## Assets and performance

The six runtime WebP files total approximately **1.79 MiB**. The new coast background is about 80 KiB; the lossless push-up atlas is about 685 KiB; the reusable nature atlas is about 294 KiB. Original references are documentation assets and are not loaded by the preview. The coast background is lazy-loaded in the combined journey. SVG sprite and prop images are shared cached resources but are not all lazy-loaded; keep this in mind before adding many chapters.

No dependency was added. There is no canvas, WebGL engine, continuous sprite RAF, audio, or layout-property animation. The present two-scene asset budget is under 2 MiB; future chapters should load art near visibility rather than multiplying the initial payload indefinitely.

Generated PNGs were preserved locally and encoded to WebP. Generation prompts and source names are recorded in [the artwork manifest](diorama-artwork.json). Transparency was checked from image alpha data; a dark glow in the generator preview did not mean a background was present in the asset.

## Verification — this iteration

- Production `npm run check` passed: TypeScript, ESLint, and the Next.js production build. All three previews are statically rendered.
- Browser inspection at 1305 × 867, 390 × 844, and 320 × 740. No horizontal overflow; copy ends above the exercise figures at both narrow widths. The 320px layout uses a taller scene than the viewport.
- Inspected top and low push-up poses, prosthetic leg visibility, and contact registration. Verified the pull-up bar still renders in front of the body with hands in front of the bar.
- Keyboard pause changed both controls and froze both sprite poses and all inspected tree, water, and boat animations. Resume re-enabled motion. Moving between chapters stopped the offscreen chapter.
- Checked navigation to the coast and back, the intermediate passage, and desktop/phone compositions. Mobile adjustments lowered the push-up sprite onto dry sand, moved the palm below the copy, and softened the background's upper edge.

Native system reduced-motion preference was not toggled during this run; its implementation was reviewed. Physical phone performance, a complete screen-reader audit, and field Core Web Vitals remain unverified. The small generated-art proportion changes described above remain a known animation limitation.
