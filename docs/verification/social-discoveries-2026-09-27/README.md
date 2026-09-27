# Social discoveries — 27 September 2026

## Current placement: phone moved to the beach

Glen subsequently requested the phone beside him on the beach and the original bag restored in the city. The phone component and its styles now belong to `scenes/beach/`. The city retouch overlay is no longer rendered or loaded; the original terrace and fallback images show the bag again. The unused retouch asset and its provenance below remain as design history.

Verified desktop 1280 × 720 and portrait 390 × 844: the phone lies on the sand beside the character, the GitHub sticker remains on the laptop, and the city bag is restored. Keyboard traversal reaches Twitter with its label and 44 × 44 target; its destination remains `twitter.com/glenp01`. Checked native chapter navigation in both directions. The phone remains static and inherits shared subject opacity/motion policy; no renderer or animation was changed. Pause/reduced-motion behavior was not re-tested for this relocation.

Typecheck, lint, webpack production build, all 36 tests and diff whitespace check pass. Updated built-output assertions verify the beach Twitter link and absence of the retired city patch. Current evidence: `beach-phone-desktop.png`, `beach-phone-portrait.png`, `city-bag-restored.png`. Earlier screenshots and the sections below document the superseded city placement.

## Previous city placement and asset provenance

The beach laptop now has a clickable GitHub sticker, replacing its former Work glint; Work remains in navigation. The city bag is removed and a small phone lies flat on the cleared seat. A tiny glint marks the phone, with a stylised decorative feed. It links directly to Twitter; it is not a live feed and contains no invented posts.

Social destinations are in `features/diorama/data/site.ts`. GitHub (`glenpadua`) and Twitter (`glenp01`) come from the existing public footer; Instagram (`404legnotfound`) was provided by Glen. `InteractionOrb.marker` lets each scene supply its decorative object while preserving real links, labels, focus behavior and 44px targets.

## Visual source and provenance

Style authority: [art-style.md](../../art-style.md), `illustrated-world-v1`.

- GitHub/Twitter marks: existing installed `react-icons/si` library, used as factual brand icons. The sticker perspective and phone UI are scene-owned vector/CSS elements, not raster replacements.
- Source painting: `public/assets/world/city-static-glasses-v1.webp` (1536 × 1024).
- Retouch: built-in image generation/editing tool, 27 September 2026. Generated full image: `/Users/glen/.codex/generated_images/01a09489-ebe7-7a92-875b-3eec922a4f3e/exec-2972804d-193f-4c9c-9469-cd892686cdf3.png`.
- Final project asset: [city-bench-cleared-v1.webp](../../../public/assets/world/city-bench-cleared-v1.webp), 148 × 114, approximately 4.3 KB. Extracted only the retouched seat region at x1388, y706 from the generated 1536 × 1024 image, encoded as WebP quality 95. All characters and the rest of the scene continue using original artwork. The patch uses the original painting coordinates, including static fallback, and shares subject opacity.
- The first upright phone was rejected as oversized. Final version is smaller and foreshortened onto the seat, with a close contact shadow and an unchanged 44px interaction target.

### Exact image edit prompt

Use case: precise-object-edit. Edit target: the provided 1536x1024 city terrace illustration. Remove ONLY the olive brown satchel/bag on the far right of the wooden bench beside the woman (approximately x1390..1510, y714..801). Fill the removed bag region with the continuation of the existing warm beige bench backrest and warm wooden seat, matching their exact lines, perspective, texture and lighting. Leave that spot empty; DO NOT add a phone or any new object. Preserve the full original canvas framing and all remaining pixels and landmarks as closely as possible, especially both characters, glasses, faces, clothing, prosthetic leg, lantern, notebook, table, plants and skyline. Same simple illustrated website/game art style as input, governed by this project's docs/art-style.md illustrated-world-v1: broad soft painted shapes, restrained contour lines and paper grain, no new detail. This is a tiny local retouch, not a redesign. Output the whole landscape at the same 3:2 aspect ratio and composition.

## Verification

Local preview at port 3102, desktop 1280 × 720 and emulated portrait 390 × 844. Reviewed sticker on the laptop lid and phone on the cleared bench. Final screenshots alongside this note show the revised flat phone, not the earlier upright version.

- Verified GitHub and Twitter accessible names, destinations, 44 × 44 targets and keyboard focus/label disclosure. External links use the shared new-tab/noopener behavior.
- Exercised city lantern off/on and global pause/resume; the bench patch remained loaded and the phone link available. New visuals have no continuous animation or render loop. Existing city effects continue around them; their full animation behavior was not re-audited.
- Scrolled city back to beach and confirmed scene switching preserves placement. Shared inactive-scene inert handling is unchanged.
- Typecheck, lint, webpack production build, all 36 diorama tests and diff whitespace check passed. Built-output coverage verifies both social anchors and the retouch asset are available without client hydration.

No physical-device or screen-reader session. Did not force OS reduced motion or browser image failure. Feed graphics remain decorative; the Twitter profile supplies real posts. These observations establish local composition and link behavior, not social-account ownership or live third-party availability.
