# Beach laptop revision — 27 September 2026

**Superseded:** the user rejected the drink/masking implementation and requested a focused, complete-sprite typing loop. See [the typing refinement](../beach-typing/README.md). This document records the earlier attempt only.

Supersedes the football interaction in `beach-refinement`. User requested sitting on the sand under an umbrella, wearing the earlier yellow striped shirt, working on a laptop, and occasionally sipping a drink. The laptop opens Work. Copy now reads “Still very much online.” / “The office has moved.” / “I like my work. I just don’t think it needs four walls.”

## Artwork and provenance

Style reference: [canonical art guide](../../art-style.md), revision `illustrated-world-v1`. Generated with built-in imagegen on 27 September 2026; exact prompts are in [prompts.json](prompts.json). Input references were the approved beach (`docs/mock/assets/beach-football.png`), the yellow shirt in `docs/references/lakeside-pullup-reference.png`, and seated proportions in `docs/mock/assets/city.png`. User owns/supplied the project references; third-party rights were not independently audited. These are newly generated assets, not a claim of final user approval.

Source folder: `/Users/glen/.codex/generated_images/01a0e222-03fe-7e61-b9d5-bc8685db2c2e/`.

| Delivery asset under `public/assets/world/` | Generated source                                | Size                  | Bytes  |
| ------------------------------------------- | ----------------------------------------------- | --------------------- | ------ |
| `beach-laptop-rest.webp`                    | `exec-99bf109b-70da-4beb-8c5b-16713d0480bd.png` | 900 × 900             | 130720 |
| `beach-laptop-lift.webp`                    | `exec-2297577a-d246-42ef-bafe-e4b28c5e3208.png` | 1800 × 900, two cells | 260138 |
| `beach-laptop-sip.webp`                     | `exec-ddd3d2b2-cb3c-44f0-96a7-d363ef0bfd73.png` | 900 × 900             | 124600 |

All exports retain true alpha. Sharp performed resolution/format conversion only. Generated dimensions were 1254 square for rest/sip and 1774 × 887 for the two-cell lift sheet, despite requested dimensions in the prompts. Runtime normalizes these to the same square painting coordinates. No mirroring: the left prosthesis is on viewer-right.

The resting body, umbrella, keyboard hand, legs and laptop remain one fixed plate. Only the right arm/sleeve/adjacent cheek region is replaced with a mutually exclusive pose. This cutout is essential: overlaying a raised arm above the complete resting image leaves the duplicate hand the user reported. All four composed poses were inspected after the cutout was in place. The sip source omitted the keyboard hand, so the fixed rest plate explicitly preserves it.

A full-scene generated fallback candidate (`exec-a49073c3-f531-4b35-8ef1-64ed78be988f.png`) was rejected because its scale and position differed from the live layout. It is unused. The accepted fallback layers the same beach background and resting sprite at the same responsive coordinates instead.

## Motion and checks

`sip.ts` uses an active-time 16-second cycle: 12 seconds resting, two 180 ms lifting poses, 1.4 seconds sipping, two 180 ms lowering poses, then 1.88 seconds resting. Timers stop while paused, inactive or the document is hidden; resuming retains active elapsed time. There is no character RAF loop or artificial limb stretching. This is limited illustrated pose animation, not continuous frame-by-frame character animation.

- Desktop 900 × 850 and portrait 390 × 844 reviewed in the local in-app browser. Umbrella, feet, laptop and text remain visible. Portrait laptop link measured 44 × 44 px.
- Actual live rest-to-sip transition observed, then paused at pose 3. The pose remained 3 with `data-moving=false` across subsequent checks. The composed sip has one raised drink hand and one keyboard hand; no lower duplicate hand/glass. [Paused sip](desktop-sip-paused.png), [raised-pose detail](poses-raised.png), [portrait](portrait-rest.png).
- Enter on the laptop link opened `/preview/diorama/work`; Back returned to the beach. Continue to City set the inactive beach to `data-moving=false`.
- Live image failure exercised by temporarily removing only the sip export, reloading, and confirming `.beach-still` replaced `.beach-laptop`. Desktop and portrait retained the new sitting composition and Work link. Export restored afterward. [Desktop fallback](desktop-image-error.png), [portrait fallback](portrait-image-error.png).
- Built HTML test confirms the same `BeachStill` composition appears inside `noscript`, with the seated asset and real Work link. No JavaScript-disabled browser session was available; browser screenshots above cover the identical image-error composition.
- Reduced-motion uses the existing shared policy and begins at resting pose without scheduling character timers. This policy was source-reviewed; a sustained OS reduced-motion browser session was not independently exercised in this pass.
- Typecheck, lint and `npm run build -- --webpack` passed. After build, `node --test scripts/diorama-contracts.test.mjs scripts/lake-shoreline.test.mjs scripts/beach-sip.test.mjs` passed all 12 tests, including unavailable-WebGL fallback, clock boundaries and built no-JavaScript output. The existing Node module-type warning is non-fatal.

The coordinating chat released the build window before this build; no production build process was present when checked. A subsequent coordination message was rejected by automatic approval review because cross-chat messaging authorization could not be verified. No deployment or commit performed. Local emulation is not physical-phone or full screen-reader evidence.
