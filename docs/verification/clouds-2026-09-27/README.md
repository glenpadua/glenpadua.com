# Painted shared clouds — 27 September 2026

Cloud-only correction: replace the smooth SVG bubble silhouettes with a reusable painted alpha mask. The existing city background retains its painted clouds. Moving clouds now use irregular flattened edges and daylight-to-lilac/slate colouring with a muted warm underside. Positions, drift timing, celestial motion and scene transitions are unchanged.

Style authority: [shared art style](../../art-style.md). Implementation: `features/diorama/shared/journey-sky.*` and `features/diorama/lib/sky-time.ts`.

## Asset provenance

- Generator: built-in `image_gen.imagegen`, transparent background enabled.
- Reference: `public/assets/world/city-back.webp`, inspected before generation.
- Generated source: `/Users/glen/.codex/generated_images/01a09489-ebe7-7a92-875b-3eec922a4f3e/exec-16770993-f450-46bb-85b6-6549e26a578d.png` (2172 × 724).
- Shipped asset: `public/assets/world/sky-cloud-painted-v1.webp`, 960 × 110 RGBA, 36,362 bytes.
- Preparation: Sharp trim with threshold 10, resize to width 960, WebP quality 90 / alpha quality 95. Used as a CSS alpha mask with three colour stops; shared by all three clouds, with the second mirrored and slightly flattened. No added JavaScript render loop or dependency.

Exact generation prompt:

> Create one isolated cloud-bank sprite on a genuinely transparent background, based on the painted clouds in the provided reference city illustration. This is a website's slow drifting decorative sky layer. Follow the reference cloud edge treatment exactly: flattened irregular cumulus bank, small uneven lobes, broken tapered wisps at both ends, subtle brushed/paper grain, softly feathered edges. NOT a clean vector cloud, NOT big round bubble lobes, NOT a photoreal cloud. Use a wide horizontal bank with overall width about five times its height, centered with transparent breathing room. No skyline, no sky rectangle, no stars, no landscape, no text. Render the cloud itself in soft ivory white only, with fine internal variation conveyed by partial transparency, so it can serve as an alpha mask recoloured in code. All surrounding area must be fully transparent, including gaps between trailing wisps. Match the project's docs/art-style.md illustrated-world-v1: simple broad painted shapes, restrained texture, not dense or realistic. Output a landscape transparent sprite.

## Observations

- Local preview on port 3102: city/end inspected at 1280 × 720 and portrait 390 × 844; lake at desktop and beach at portrait. The new silhouette avoids the large smooth lobes that previously overlapped the city painting.
- Actual drift checked using computed transforms at separate times: the first cloud moved from −37.98px to −6.73px. Keyboard pause froze it at −6.57px across subsequent observations; resume restored motion. This checks animation over time, not just screenshots.
- Cloud colour continuity across 1,000 day/night samples is now covered by the existing sky test. Shared reduced-motion, background pause and server-rendered fallback paths are unchanged; reduced-motion OS emulation and a physical phone were not tested in this pass.
- A missing mask removes only the decorative cloud; the underlying sky and city painting remain. No image-failure injection was performed.
- Screenshots: [desktop city](city-desktop.png), [portrait city](city-portrait.png).

## Checks

- Lint passed.
- Production Webpack compilation passed, but build/typecheck were blocked by stale generated `.next/dev/types/app/preview/diorama/stories/page.ts` references to the removed Stories route (now Writing). The initial typecheck also found stale production route types. Generated route caches were left alone while other threads were active.
- Full Diorama suite was attempted after the build; four built-HTML checks could not run because the blocked build did not emit the preview HTML. These are not cloud failures.
- Focused sky and lake shoreline checks: all six passed.

This pass does not claim production deployment, physical-device performance or comprehensive accessibility testing.
