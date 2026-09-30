# Work screensaver correction — 30 September 2026

The old field excluded the upper 17% of the monitor. A browser read at the original viewport measured its top at 130.5px against the monitor's 83.328px: the message strip was an invisible wall. The field now fills the monitor. A small opaque backing keeps the away controls readable when the signature passes behind them.

The old collision loop also accepted any wall bounce within seven pixels of the other wall. A deterministic near-miss at x=99, y=95 in a 100×100 movement area reported **two corners instead of zero** as it bounced off each wall separately. A zero-sized field reported a corner before layout was available. Both failures were reproduced with `node --test scripts/work-screensaver.test.mjs` before fixing the extracted, unchanged motion code.

The motion helper now resolves the first collision and then spends the remaining frame travel. A corner is one simultaneous contact, with a half-CSS-pixel allowance for subpixel rounding; both axes snap and reverse together. Unmeasured/collapsed bounds preserve the pose without scoring. Celebration expiry no longer belongs to the motion effect, so pausing or hiding the tab cannot cancel its dismissal. Removed the paused CSS offset that moved an already-positioned signature a second time.

Browser verification:

- Screen and field bounds match at 320×740, 390×844, 820×1180, 1024×768 and 1440×900.
- Sampled 160 live poses over roughly 20 seconds. The signature reached 0.3px from the true top edge, passing through the former 53px reserved band. Ordinary wall bounces did not add corners.
- Pause preserved the rendered pose; a later read was identical. Resuming continued from that position.
- Dark mode gave the controls and screen the same background; keyboard Enter on “Back to the desk” restored the desktop. No browser warnings/errors were recorded.
- `full-monitor.jpg` shows the signature near the top of the actual screen, above the old boundary.

The seven focused tests cover near-misses, zero-sized fields, all four corners, one-time subpixel contacts, two separate collisions in a slow frame, consistent 30/60/144fps travel, and zero/large elapsed times. Browser checks are emulation, not physical-device acceptance. Reduced motion retains the static signature and wake control; the existing shared policy was preserved.

Typecheck, lint and the final webpack production build passed. After building, all 20 tests across the diorama contracts, lake shoreline, feature boundaries and screensaver regression files passed.
