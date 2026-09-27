# Clear glasses — lake and City

User request, 2026-09-27: replace Glen's sunglasses with ordinary clear prescription glasses in the lakeside and nighttime scenes.

Style authority: [shared art style](../../art-style.md), `illustrated-world-v1`. This request is a scene-specific exception to its sunglasses description. Beach, article artwork and the woman's glasses are unchanged.

## Assets and provenance

Edited with the built-in image generation tool; [exact prompts](prompts.json). Original source assets remain intact. Generated eye regions were registered to the source canvases, blended at a two-pixel boundary, and saved as lossless WebP. This preserves visible original pixels outside those regions; [pixel comparison results](pixel-check.json) report zero differences. The 900px terrace variant is derived from the finished full-size image.

- [Four-pose pull-up sheet](../../../public/assets/world/pullup-motion-glasses-v1.webp)
- [Lake still fallback](../../../public/assets/world/lake-static-glasses-v1.webp)
- [City terrace](../../../public/assets/world/city-front-glasses-v1.webp)
- [City terrace, 900px](../../../public/assets/world/city-front-glasses-v1-900.webp)
- [City lantern-off terrace](../../../public/assets/world/city-front-off-glasses-v1.webp)
- [City still fallback](../../../public/assets/world/city-static-glasses-v1.webp)

Generated sources: `exec-aeb16f08-0a25-474d-b00a-f03ce79f579c.png` (pull-up sheet), `exec-93c74c90-2667-4798-a920-db82fd0f0c87.png` (City), `exec-c3114e99-7933-42f6-9f87-7734c60eb04a.png` (lake still), under the built-in tool's session output directory. The pull-up generation returned 1145×1374 and was registered back to the original 1200×1440 canvas before extracting eye regions.

Both scenes use the existing scene-owned fallback slot. No shared rendering, motion, routes, or layout logic changed. Runtime sources include both responsive City variants and its lantern-off overlay. All four lake poses have the same clear glasses; anatomical left prosthesis and grip/bar pixels are unchanged.

## Verification

- Typecheck and lint pass.
- Required contract/shoreline command: 8 tests pass. The built-HTML test used the preceding build; a new coordinated production build is pending, so this is not fresh production-build verification.
- Local dev preview `http://127.0.0.1:3102/preview/diorama`: inspected at 1280×720 and 390×844. Both new runtime sources loaded successfully.
- Lake animation sampled over time: moving between atlas rows and columns, with clear glasses retained. All four edited poses also inspected in [detail](character-details.png). [Motion samples](motion-samples.json).
- Pause/resume controls activated by keyboard; computed animation state changed from running to paused and back. Keyboard chapter navigation reached City. City lantern toggled off with clear glasses retained; both on/off images loaded successfully.
- Static fallback assets visually inspected and wired for failure/no-JavaScript use. Forced failure and JavaScript-disabled browser execution were not rerun. OS reduced-motion and physical-device checks were not rerun for this asset-only change.
- [Lake desktop](lake-desktop.png), [lake portrait](lake-portrait.png), [City desktop](city-desktop.png), [City portrait](city-portrait.png), [lantern off](city-lantern-off.png).

City chat and coordinating chat were read-only checked as idle before scene source edits. Automatic approval review rejected cross-chat messaging because the existing permission was typography-specific. A fresh permission question remains pending; no glasses-related messages were sent and no shared production build was started.
