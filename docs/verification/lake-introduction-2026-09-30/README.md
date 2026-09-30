# Lake introduction — 30 September 2026

The lake retains all three alternate lines, including “a human in the loop.” to communicate AI’s role in Glen’s work. It plays one complete sequence and settles on “a software engineer.”. Scene-owned `holdMs: 2600` gives completed phrases more reading time; the eraser and typing rhythm remain intact. Supporting copy now adds: “Here you’ll find my work, experiments, and the occasional change of mind.”

## Observed in the local preview

- Desktop: 1280×900. Watched the full sequence, including the moving eraser, human-in-the-loop line, building line, leg-day line and return to the authored heading. It settled about 25.6 seconds after sampling began and remained settled through the end of the 33-second recording. The accessible heading stayed “I’m Glen, a software engineer.” throughout. The DOM trace is in `animation-trace.json`.
- Portrait emulation: 390×844. Observed every alternate phrase. The leg-day phrase wraps onto two lines; copy remains readable above the landscape. Both paragraphs remain inside the viewport and document scroll width is 390px.
- Keyboard: Space activates pause/resume. Pausing during the sequence restores the authored heading and removes the caret/correction. Enter on the day prompt advances to the beach; the inactive lake has no typing caret or eraser. Scrolling back restores the lake view.
- No browser console errors were captured. The preview was left at the lake with motion enabled and the viewport override reset.
- Reduced-motion handling was reviewed in the unchanged shared provider: it disables the same `running` flag as pause, preserving the authored heading. An explicit OS reduced-motion preference and physical phones were not tested. Artwork/rendering/fallback behavior was not changed; built-HTML tests verify the static authored heading before hydration and static artwork fallbacks.

## Checks

- `npm run typecheck`: passed.
- `npm run lint`: passed.
- `npm run build -- --webpack`: passed in `/private/tmp/glen-lake-intro-build-i2bw3emc`, using a snapshot of the changed source and the installed dependencies. This kept the active preview’s `.next` folder untouched.
- After that build, `node --test scripts/diorama-contracts.test.mjs scripts/lake-shoreline.test.mjs`: 11 passed, 0 failed.
- Changed source and guide files formatted with the installed Prettier. No new implementation-mirroring tests were added for this small copy/timing change.

Screenshots capture the desktop eraser, human and leg-day phrases, settled heading, portrait phrases and keyboard-paused state. They supplement the timed observation; still screenshots alone do not establish animation behavior.
