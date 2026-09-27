# Work monitor desktop prototype, 27 September 2026

Replaces the four-slide project carousel with a small desktop (`rooms/work/monitor-desktop.tsx`). Draft copy from Glen's projects and old site; not final.

Observed in headless Chrome for Testing (CDP) against the dev server:

- 1440×900: six icons in three columns fit the painted monitor (579×238); idle for ~9 s, the wandering cursor highlighted “Career”; clicking StayPal opened and focused its window; title-bar drag moved it (clamped inside the screen); Escape closed the focused window and returned focus to its icon; lean-in centred an enlarged screen over a dimmed room with focus on “Back to the room”.
- 390×844 with touch emulation: icon targets ≥ 59×44; tapping “Client work” leaned in and opened the window full-screen below the menu bar with focus inside it; the close button and “Back to the room” worked. The “Let it rest” marker moved off the lean-in button (and off the desktop on large screens, to the bezel corner).
- Sticky note: five different notes over six reloads, no hydration warnings.
- Screensaver still sleeps and wakes the desktop on both sizes.

Not yet: scripted StayPal/Purrfect Plate demos, case-study pages, final copy, and a check with a real phone and a screen reader.

## Wallpaper, selection and notifications

- Wallpaper followed Valencia time (20:30 → city) and cycled lake → beach → city with the fade, tide and dusk entrances; the previous painting was removed after each handoff. The lake scene's night-tint `::after` leaked into the borrowed wrapper and is switched off there.
- Beach Glen sits on the right-hand sand in the wallpaper so the icons don't cover him; the sticky note sits bottom-middle on large screens and in the sky under the icons on phones, clear of every icon and person on all three wallpapers (checked programmatically).
- Rubber-band selection initially stopped after one move because the browser began a native image drag on the painting; wallpaper images are now non-draggable and the band prevents default, after which dragging selected StayPal and Purrfect Plate.
- Right-click opened the Desktop menu with focus on “Change wallpaper”; Escape closes it.
- A notification appeared after ~45 s idle and only once in 75 s.

## Wallpaper, revised

Glen found the painted wallpapers weren't landing. They were replaced with quiet paper (gradient, grain, contour lines, a coffee ring) and “Change wallpaper” was removed; the label pills went with them. The sticky note returned to the bottom-right corner and notifications moved to the top right (bottom centre on phones). Rubber-band selection and notifications are unchanged.

## Lamp dark mode, power menu and the full screen

- In the browser pane: dimming the desk lamp switched the desktop to its dark theme; “Glen’s desk” opened Restart / Shut down; Shut down showed “It’s now safe to walk away from your desk.” with focus on “Turn it back on”.
- Glen reported the desktop not filling the painted screen (a cream band below it, obvious once dark or off). The desktop now uses the measured painted screen (x 465–1095, y 182–510 of 1536×1024, plus 2px under the bezel) and a generated alpha mask for his head. A first version grew the head outline and uncovered a pale halo and bottom line; the final mask follows the painting's anti-aliasing and lets the desktop cover the light rim painted round the hair. Checked at 2.5× in light, dark and off; the pixel test passes.
- Phones keep their own screen layout with no mask; the leaned-in screen is unmasked while the monitor left in the room keeps the mask.
- Glen then saw a pale line round the hair in dark mode: the single blended pixel between screen cream and the hair's dark outline was left uncovered. The mask now covers pixels within 150 of the screen cream (ramping to none at 220), so only the dark outline and brown hair stay in front; a faint anti-aliased edge remains from the browser scaling both images. Half-covering the first outline pixel was tried and reverted: it thinned the outline in light mode. The pixel test still passes.
