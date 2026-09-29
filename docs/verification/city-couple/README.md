# City couple animation — 29 September 2026

The couple catches each other's eye, takes turns talking, shares a small laugh, and independently sips coffee. Complete exchanges vary after 5–10 seconds of rest. Arrival always starts with the same quiet pause and conversation, so hydration is deterministic. The coffee control starts a sip at rest or queues one after the current exchange; repeated clicks coalesce, and manual sips alternate people.

## Artwork and motion

The visual definition remains [illustrated-world-v1](../../art-style.md). Approved references were the current City painting, its full-quality terrace layer, and the Lake/City style references. Glen retains clear prescription glasses and his anatomical left prosthetic leg; his wife's sunglasses remain on her head.

Ten registered poses cover neutral, Glen's glance, mutual eye contact, each person talking, shared laughter, and each person's raised-cup/drinking poses. Heads, necks and shoulders move together. The terrace, seated hips, legs and feet stay fixed. This applies the previous Lake/Beach lessons: no animated full-painting replacements, clipped background polygons, detached specks or independently warped limbs.

`scripts/prepare-city-couple.mjs` performs mechanical alpha cleanup, uniform scaling, translation registration, clean-plate compositing and atlas packing. It keeps the main connected cutout, removes the old silhouettes, and overlaps identical neutral hip pixels with a short alpha taper to avoid a hard horizontal join. The clean plate changes only the former couple area. It does not animate.

The runtime reuses the neutral frame for the stationary partner during a sip. This avoids small colour differences between separately encoded WebP atlas cells. Steam follows each cup. The unlit lantern layer sits below the moving upper bodies.

The atlas is 1600×460: ten 320×230 cells, approximately 187 KiB served and 2.94 MB decoded RGBA. The lit and unlit fixed terrace images are approximately 151 KiB and 123 KiB. A timeout runs at pose boundaries, with no per-frame React renders or idle requestAnimationFrame loop. Shared motion policy and scene activity stop the timer; resume consumes active time only.

## Sources and reproduction

Artwork was created with the built-in image-generation tool, with transparent output, then saved in the repository. No API/CLI image-generation fallback was used. [Prompt set and generation provenance](prompts.md) records inputs and output identities.

Full-quality generated inputs:

- `art-source/world/city-couple-conversation-v1.png`
- `art-source/world/city-couple-sips-v1.png`
- `art-source/world/city-couple-empty-plate-v2.png`

Prepared full-quality outputs, with matching encoded copies under `public/assets/world/`:

- `art-source/world/city-couple-backdrop-v1.webp`
- `art-source/world/city-couple-backdrop-off-v1.webp`
- `art-source/world/city-couple-motion-v1.webp`

Reproduce with Node 24+:

```sh
node scripts/prepare-city-couple.mjs
node scripts/encode-art.mjs
```

## Verification

- `npm run typecheck`, `npm run lint`, and `npm run build -- --webpack` passed.
- After the build, `npm run test:diorama` passed all 66 checks, including the existing contract/shoreline tests and eight new City checks. These cover arrival, turn taking, randomized gaps, ordered independent sips, queued clicks, active-time pause, connected alpha/transparent gutters, old-face residue and built no-JavaScript fallback/navigation.
- Desktop at 1164×867: observed three 20-second windows, seeing all ten poses and all five phases (including idle). Inspected head edges, the hip join, mug/hand count, stationary partner and prosthetic alignment. No detached marks, background spillover or visible torso seam observed at displayed size.
- Portrait at 390×844: observed 15 seconds, including conversation and a sip. Both people and their feet remained visible, text stayed readable, and document width equalled viewport width (390 px).
- Keyboard: Enter activated coffee, pause/resume and lantern controls. A second coffee activation during Glen's sip queued the wife's sip after return to rest. Activating coffee while paused did not schedule a surprise on resume.
- Pause: verified both idle and mid-sip. Frame 9, its phase and transform stayed identical between observations while paused; resume continued the routine.
- Inactive scene: navigated back to Beach, verified `data-moving=false` and unchanged City frame/phase/transform between observations, then returned through the journey arrow.
- Lantern: toggled off/on and inspected the darkened lamp/pool without covering the characters; restored on.
- Missing image: temporarily removed the served atlas, opened a fresh localhost origin, and verified the animated layer was replaced with the complete original `city-static-glasses-v1.webp` (natural width 1536); the Writing link remained `/writing`. Restored the atlas immediately and closed the test tab.
- Normal preview console returned no warning/error entries in the final check. The preview was left on City with motion enabled.

Reduced motion uses the same shared disabled-motion gate inspected in code; an OS-level preference change was not exercised. These are local browser checks and portrait emulation, not physical-phone, screen-reader or hosted-deployment evidence. Lake and Beach were unchanged by this task; their regression checks are included in the 66-test suite, and their prior live verification remains in their respective folders.

## Evidence

- [Desktop](desktop.jpg), [portrait](portrait.jpg), [paused sip](paused.jpg), [lantern off](lantern-off.jpg), [missing-image fallback](fallback.jpg).
- [All ten live poses](live-contact-sheet.png) and [registered source composites](pose-review.png).
- [Sampled live sequence](live-cycle.webp): screenshots captured at changing poses, with gaps between recording windows shortened. This is a sampled animation, not a continuous real-time video. DOM reads before/after a screenshot can straddle short pose boundaries; the contact sheet uses stable samples where available.
- [Motion samples](motion-samples.json), [keyboard sip sequence](keyboard-sips.json), [pause/inactive snapshots](lifecycle.json), [registration translations](registration.json).
