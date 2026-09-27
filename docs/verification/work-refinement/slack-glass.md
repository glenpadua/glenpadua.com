# Slack view fitted to laptop glass — 27 September 2026

The rotated rectangular overlay could not match the painting's tapered screen. Its added border and inset shadow also read as a separate card.

Updated only the Work-local Slack CSS: removed border/shadow and used a projective CSS transform fitted to the four inner glass corners. The desktop coordinates are `(225,486), (433,464), (453,606), (246,639)` in the 1536 × 1024 painting; portrait uses `(29,670), (139,651), (158,760), (49,786)` in its 800 × 1600 painting. These are visually measured artwork coordinates, not inferred from the former overlay. The original bezel remains visible.

Perspective is tied to the painting container width (`100cqw`), so the projection scales without a resize listener or runtime measurement. Content remains HTML. No source art, shared files, routes or animation behavior changed.

## Verification

- `scripts/work-laptop.test.mjs` projects the actual CSS matrix to the measured glass corners at four scales, for both paintings. All corners match within 0.01 source-scaled pixels.
- Browser-computed transforms also match those coordinates within 0.01 CSS pixels at the inspected desktop and 390px portrait sizes. This measures consistency with the chosen art coordinates, not subpixel accuracy of the illustrated border itself.
- Visually reviewed both compositions: `slack-glass-desktop.png`, `slack-glass-portrait.png`; enlarged desktop detail in `slack-glass-detail.png`.
- Clicking the transformed desktop screen opens work details. Escape closes the dialog and restores focus to the screen. No new animation, image request or fallback dependency; prior typing motion checks remain applicable.
- Typecheck/lint and coordinated webpack build passed. Required contract/shoreline suites plus Work typing and laptop tests passed: 12 total.
- The same build includes the current Stories refinement; its owner was notified to run their post-build checks. Build window released to both room and main coordinators.
- Portrait is browser emulation, not a physical-phone check. Viewport override reset; preview server left running unchanged.
