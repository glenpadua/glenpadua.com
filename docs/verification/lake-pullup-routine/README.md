# Lake pull-up and recovery routine

29 September 2026. User request: after a few reps, hop down from the bar, shake the arms, hop back up and repeat. Three reps and a short recovery were selected as the initial timing. Style authority: [the shared art style](../../art-style.md), revision `illustrated-world-v1`; the existing clear-glasses sprite and the user's screenshot supply the current character identity.

## Implementation

- A 10.33-second loop: three complete reps, release, soft landing, relaxed arm shake, jump preparation and reach back to the same bar. Whole poses change discretely; the short airborne translations use acceleration/deceleration. The apparatus never moves.
- Existing four pull-up poses remain in atlas cells 0–3. Six new complete drawings occupy cells 4–9, preserving the anatomical left prosthesis (viewer-right), clear glasses, outfit and proportions. No mirrored poses or procedural limb warping. The final asset pass removes detached alpha components, including two tiny remnants below a raised shoe in the original pose. Connected antialiased edges are retained.
- The scene-local clock stops when paused, hidden or inactive; resuming preserves the pose without catching up elapsed wall time. Reduced motion leaves the initial hang still through the existing shared policy. The keyboard-accessible cheer quickens three reps, waiting through recovery when needed, without teleporting the character.
- A cached image failure before hydration now invokes the existing static-art fallback. The fallback keeps its entire painting: the landscape-only horizon mask clipped the character's head in that image, so it is not applied to the still.

## Art and provenance

Generated using the built-in image tool, then mechanically cropped, uniformly scaled and registered. [Generation prompts](prompts.md). No CLI image model was used.

- Identity: `art-source/world/pullup-motion-glasses-v1.webp`; primary style reference: `docs/mock/assets/lake.png`. The tool reference was its first 600×720 pose, flattened onto cream solely for visibility; the shipped original poses retain transparency.
- Initial generated atlas: `exec-84385a9a-7b94-483e-b3b0-bcebd016931e.png` under the current Codex generated-images directory. A second edit narrowed the arm shake and removed drawn motion marks.
- Final generated source: `exec-5c1e9b70-32a1-4b4c-8cdb-496bbc902b37.png`, copied to `art-source/world/lake-pullup-recovery-poses-v1.png`.
- Registered lossless 3000×1440 source: `art-source/world/lake-pullup-routine-v1.webp` (5 columns, 2 rows, 600×720 cells).
- Served image: `public/assets/world/lake-pullup-routine-v1.webp`, about 348 KiB, generated with `node scripts/encode-art.mjs`. Rebuild the atlas with `node scripts/prepare-lake-pullup.mjs` first. Originals remain available.

## Verification

- After the final pixel cleanup, observed 100 native screenshots over 25 seconds of running desktop animation, including repeated recovery sequences. All ten poses and all seven phases were observed. [Timed samples](motion-samples.json), [sampled live animation](live-cycle.webp), [contact sheet](cycle-contact-sheet.png). DOM states precede screenshots, so short transitions may occur between them.
- Reviewed [desktop](desktop.jpg) and [390×844 portrait](portrait.jpg) composition. The figure lands between the fixed posts, keeps his prosthesis on viewer-right, and retains character scale through the new poses.
- Paused during recovery in the initial pass and at the top of a pull-up in the final pass: the exact sprite transform remained unchanged; keyboard Enter resumed it. Keyboard Enter activates the cheer. An additional portrait cycle was observed, with no clipped poses or horizontal overflow.
- Navigated away from Lake: its sprite transform stayed identical over 1.4 seconds, then resumed on returning. The viewport override was reset.
- Forced the served sprite to return 404 on a fresh localhost origin. This reproduced an early image failure that originally hid the character. After repair, the loaded static lake painting replaced the sprite. The served asset was restored afterwards.
- `npm run typecheck`, `npm run lint`, and `npm run build -- --webpack` pass. After that fresh production build, `npm run test:diorama` passes all 58 tests, including the required contracts and shoreline tests. The five focused lake tests exercise three complete reps, phase order, grounded poses, hop endpoints, queued cheers, clock suspension and one connected figure in every served atlas cell. No console errors or warnings appeared in the normal preview.
- OS/browser reduced-motion emulation and a physical phone were not run. Reduced-motion gating was reviewed against the existing shared policy; portrait evidence is browser emulation. This is a local preview, not a production release of the new animation.
