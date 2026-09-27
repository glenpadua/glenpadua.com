# Stories controls and paper placement

27 September 2026. Local preview: `http://127.0.0.1:3102/preview/diorama/stories`.

## Changes

- Removed the pale control panel, border and rounded corners. Shuffle, count and archive now use warm cream text with a restrained shadow over the desk. Keyboard focus has a cream outline with a dark edge.
- Moved and resized the four desktop papers to clear the plant, writing hands, handwritten note and archive tray. Reduced heading size and padding enough to preserve article thumbnails and readable titles.
- Limited the portrait paper spread to the clear tabletop before the tray. Positions remain tied to the painting, including its responsive crop.
- Only Stories selectors in `features/diorama/styles/rooms.css` changed. The coordinating chat approved those shared-file edits.

## Observed

- Reviewed both story batches at desktop and 390 × 844; also reviewed the longer first-batch titles at 320 × 740 and desktop at 1280 × 800. No card content overflow in measured layouts. The desktop sheets clear the painted objects; portrait sheets clear the tray and writing area.
- Pointer and keyboard shuffle changed the group and count. Archive opened by keyboard; Escape closed it and returned focus to All stories.
- Global pause froze the writing-hand and coffee-steam frames across separate observations; resume restored their running state. Existing reduced-motion rules and fallback markup were retained. Reduced motion, no-JavaScript mode and physical phones were not independently retested in this CSS-only pass.
- Typecheck, lint and formatting passed after the complete CSS change.
- Initial controls-only production build passed, followed by all eight diorama/shoreline contracts. The coordinating Home chat subsequently reported a successful final integrated webpack build containing these paper-layout changes, with clean typecheck/lint and all 15 contracts/physics/shoreline/sky tests passing.

## Evidence

- `desktop-second-batch.png`: second story group and keyboard focus on shuffle.
- `portrait-390.png`: first group in portrait.
- `portrait-320.png`: narrow portrait with focus returned to archive.
- `desktop-final.png`: final desktop composition.

## Writing repair: single layer, 27 September 2026

The original writing effect switched between two generated full paintings inside a broad polygon. The crop included changed desk grain, hair and sleeves. A first attempt narrowed the mask and faded into the forearm. That removed the large background flicker but Glen correctly rejected the remaining ghost forearm and sliced baked shadow. `writing-isolation.gif` records that rejected intermediate attempt, not the final result.

The final implementation uses `rooms/stories/writing-hand.tsx` and its local stylesheet:

- A fixed cleanup patch removes the original hand, pen and their baked shadow. Generated background plates are used only inside that patch; the original painting supplies the moving hand and the fixed cuff.
- A single fully opaque hand cutout makes small continuous rotations around the cuff. Its shadow is attached to the moving cutout. There is no alternate pose or opacity crossfade.
- The original cuff covers the arm root. All image/mask resources must load before the enhancement appears; errors and unavailable masking leave the complete original painting. Reduced motion hides the enhancement. The room unmount and responsive resource-loading effect clean up their listeners and ignore stale completion callbacks.
- Pen rest and the shared motion policy pause the animation. This remains a restrained wrist/forearm movement, not separately articulated fingers or newly drawn handwriting.

### Final evidence

- `writing-single-layer.gif`: final live browser capture; 80 frames spanning a complete 5.4-second writing cycle, with more than 60 distinct hand positions.
- `writing-capture-checks.json`: sampled hair and desk regions have zero changed frames across that capture.
- `writing-single-desktop.png` and `writing-single-portrait.png`: final composition at 1280 × 800 and 390 × 844.
- `writing-assets.json`: exact built-in imagegen prompts, original generated files and final background asset paths.
- `scripts/stories-writing.test.mjs`: verifies opaque forearm interiors, coverage of the entire original hand beneath the moving layer, removal of known baked-shadow areas, and exclusion of stationary hair/desk from the moving mask. The earlier broad-mask reproduction failed in both layouts before repair.
- Final source passed typecheck/lint. The Work chat reported a successful coordinated webpack build containing this Stories implementation; all ten required diorama/shoreline plus writing tests subsequently passed here.

Local browser review covered desktop/portrait movement, stationary surrounding texture and pen pause/resume. Reduced-motion and asset-error fallback are implemented but were not independently forced in the live browser. This is not physical-phone or field-performance verification.
