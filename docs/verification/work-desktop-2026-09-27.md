# Work monitor desktop prototype, 27 September 2026

Replaces the four-slide project carousel with a small desktop (`rooms/work/monitor-desktop.tsx`). Draft copy from Glen's projects and old site; not final.

Observed in headless Chrome for Testing (CDP) against the dev server:

- 1440×900: six icons in three columns fit the painted monitor (579×238); idle for ~9 s, the wandering cursor highlighted “Career”; clicking StayPal opened and focused its window; title-bar drag moved it (clamped inside the screen); Escape closed the focused window and returned focus to its icon; lean-in centred an enlarged screen over a dimmed room with focus on “Back to the room”.
- 390×844 with touch emulation: icon targets ≥ 59×44; tapping “Client work” leaned in and opened the window full-screen below the menu bar with focus inside it; the close button and “Back to the room” worked. The “Let it rest” marker moved off the lean-in button (and off the desktop on large screens, to the bezel corner).
- Sticky note: five different notes over six reloads, no hydration warnings.
- Screensaver still sleeps and wakes the desktop on both sizes.

Not yet: scripted StayPal/Purrfect Plate demos, case-study pages, final copy, and a check with a real phone and a screen reader.
