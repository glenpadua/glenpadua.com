# Writing desk refinement — 30 September 2026

Implemented scene objects for shuffling, the archive and the ordered Chronicles; lamp dimming; optional session memory and a last-opened bookmark; an authored postcard excerpt; and an 11-second writing/hesitation/thinking routine. The original approved artwork supplies the scene and hand. The postcard cleanup is local and masked; see [asset provenance](assets.json) and the [shared art style](../../art-style.md).

## Responsive review

### Compact revision after visual feedback

The earlier compact layout passed boundary checks but its full-width 1:2 desk made the papers much too tall in intermediate windows. That visual treatment was rejected. The current version shortens only the empty middle wood using CSS slices of the approved portrait painting, preserves the props' aspect ratio and hand-mask registration, caps the loose-paper spread at 620×440px, and uses smaller headings. The compact Chronicles opener is now a small fanned manuscript with the existing first-chapter cover and paperclip. No bitmap was regenerated or resized destructively. The archive also has a 420px width cap in compact views.

Checked both four-paper spreads, the six-chapter collection, archive and postcard at 17 browser viewports: 320×740, 375×667, 390×844, 430×932, 520×740, 600×900, 760×1000, 768×1024, 820×1180, 812×1000, 1038×898, 1024×768, 1280×800, 1440×900, 1920×1080, 844×390 and 667×375. No paper/collection text overflow or horizontal clipping was found; all opened panels remained within the page. At 812×1000, individual sheets are approximately 298×218px and all four fit above the hands. The room is about 1056px tall, down from 1624px. The wide layout retains its original composition.

Current captures use the `compact-v2-` prefix; `compact-v2-checks.json` contains the measurements. Reviewed a full hand cycle in the shortened portrait composition: 25 samples, 20 distinct transforms, all layers ready and moving, with three saved close-ups. The cuff, hand and painted background stayed registered. Rechecked article return: all four papers had `animation-name: none`. Found and fixed a paused-archive bug: its opening animation could freeze at opacity zero; paused opening now has opacity 1 and no animation, and Escape restores focus to “All writing”.

The final production build was reviewed at 812×1000 with no browser console warnings/errors. Repeated the deliberate optional-layer 404 test against that build: the shortened static painting stayed complete, all four papers remained readable, and the archive opened. The original hand remained visible with the failed enhancement removed. See `compact-v2-fallback.jpg` and `.json`. Typecheck, lint, final webpack build and all 21 focused/contract tests passed for this revision.

### Earlier pass (superseded compact proportions)

Browser viewports: 320×740, 375×667, 390×844, 430×932, 600×900, 760×1000, 768×1024, 820×1180, 1024×768, 1280×800, 1440×900, 1920×1080, 844×390 and 667×375. Checked the closed desk, collection, postcard and archive at all 14 sizes. Measurements are in `layout-matrix.json` and `panel-matrix.json`; representative captures are alongside this note.

No horizontal overflow, clipped paper bounds or collection text overflow was found after corrections. Each object retains at least 44 visible horizontal pixels for interaction. Compact and short viewports scroll vertically where needed to keep the composition intact. Final short-window fixes keep opened objects below the header without scrolling the clipped painting stage. The duplicate fake clip and detached archive label were removed; wide controls use the painted clip/tray, with a separate bound collection on compact screens.

## Behavior observed

- Archive: search, topic filtering, an empty result, Escape, close button and focus restoration.
- Collection: authored chapters 01–06; article navigation and return preserve the open collection and last-opened bookmark.
- Desk: next spread, wraparound, paused immediate shuffle, lamp toggle, saved spread/lamp/bookmark after navigation, malformed/deleted-catalogue storage handling in focused tests.
- Return correction: the server and initial client render are settled. A confirmed first visit or deliberate interaction opts into animation. Both “Back to Writing” and browser Back returned all six collection cards with `animation-name: none`; loose-paper return also reported `none` for all four sheets. Deliberate collection opening still reports `chronicle-fan`; deliberate shuffle still reports `paper-gather`. See `return-animation-checks.json` and `return-no-arrival.jpg`.
- Postcard: desktop cleanup, compact front, real excerpt/link, Escape and return focus. Cached-image readiness explicitly checks both cleanup image and mask.
- Motion: sampled 25 poses over 13.5 seconds across a complete 11-second cycle (22 distinct transforms); inspected the saved hand frames. No duplicate hand or moving hair/desk region was seen. Rest finishes in 480 ms and then remains at the neutral matrix. Global pause freezes the hand and steam. On the portrait tablet, the hand paused below the fold and resumed when scrolled into view.
- Forced optional-layer failure through a temporary localhost proxy against the production build: original painting loaded, hand enhancement disappeared, postcard cleanup stayed hidden, all four papers remained visible, and the archive opened. Normal production page logged no console warnings/errors. The temporary servers were stopped after QA.

## Checks and limits

`npm run typecheck`, `npm run lint`, and `npm run build -- --webpack` passed. After the build, the diorama contracts, lake shoreline, writing hand masks, writing desk state and feature boundaries passed (21 tests). No routes or article prose changed.

These are browser viewport checks, not physical-device acceptance. Reduced-motion CSS and provider behavior were reviewed; OS preference switching was not forced in this session. No-JavaScript semantic links/static content were checked by the production contracts, not by disabling JavaScript in a physical browser. The new pen routine uses the existing single rigid hand cutout: its lift is deliberately tiny; it is not a newly drawn articulated hand pose.
