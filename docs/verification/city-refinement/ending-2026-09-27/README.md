# End of the day — 27 September 2026

The city now settles into night during the existing `--ending` scroll interval. The scene prepares one canvas from the loaded responsive backdrop, cools the painted sunset, extinguishes warm windows and streetlights, and replaces warm river reflections with nearby water colours. Scrolling crossfades the original and prepared image; there is no per-frame canvas rendering or new asset request. Two authored windows remain lit. The existing off-lantern painting appears as its glow fades. Reverse scrolling restores the original city and manual lantern preference.

The shared sky adds a dark gradient and 56 stars only during the ending, preserving the current painted cloud asset and motion. The ending heading shares the city's desktop and portrait coordinates and font sizes; its text waits for city copy to fade before appearing. All artwork follows [the shared art style](../../../art-style.md).

## Observed in the local browser

- Desktop: both heading bounds x=102.328125, y=156.0546875, font size 37.521px in the available browser viewport. Night sky, two remaining windows, unlit lamp, unchanged people/props.
- 390×844 emulation: both headings x=27.296875, y=104, font size 29.25px. Final ending=1, canvas opacity=1, ordinary window opacity=0, lantern-light opacity=0. See `portrait.png`.
- 360×640 emulation: both headings x=25.1953125, y=88, font size 28px.
- Motion over time: cloud translation changed from 56.2014 to 43.0415px and sampled star opacity changed from .896647 to .772502. After pause, cloud transform, star opacity and all random window states remained identical across separate observations. Resume restored motion.
- Reverse travel: ending=0, canvas opacity=0, lantern-light opacity=1. Inactive city reports data-moving=false. Enter on the chapter link returned to City.
- No browser console errors were observed.
- Existing reduced-motion policy still snaps `--ending` and disables CSS animation/transition. Its system preference was not independently emulated in this pass. Static/no-JavaScript fallback is covered by the built HTML contracts; injected image/canvas failures were not browser-tested. The original painting remains the canvas-error fallback.

These are local browser/emulation observations, not physical-phone evidence. No unfinished new animation remains; the nightfall effect intentionally falls back to the original painting if canvas preparation is unavailable.

## Checks

Type checking, lint, and a coordinated webpack production build passed. The obsolete generated `.next/dev/types/app/preview/diorama/stories/page.ts` was removed after confirming the source route no longer exists; no application route was changed. The required diorama/shoreline contracts plus focused sky and city nightfall checks passed (18 tests). Other threads' Work/Writing/cloud changes were preserved.
