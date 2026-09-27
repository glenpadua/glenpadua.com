# Beach refinement — 27 September 2026

Scope: features/diorama/scenes/beach, dedicated beach tests, and this evidence directory. Existing artwork, public pages, shared interaction orb and navigation remain owned by their existing modules. No deployment or commit.

## What changed

- Glen is smaller in the painting (18% stage width on desktop, 19% on portrait), still shirtless with dark shorts and his anatomical left prosthesis on viewer-right.
- The former three-pose jump is replaced by a 2.8-second sole-roll. The approved first pose supplies the textured body/rigid leg/foot pieces. Two rigid links solve the knee position; the ankle and football travel together. Ball rotation corresponds to distance along the sand. The right foot stays planted. There is no mirroring, body scaling, limb stretching or whole-cutout bob.
- A shared orb starts the touch; repeated activation during a touch does not teleport the ball. An idle touch occurs after a short rest. Paused activation has a short tooltip and screen-reader status without overlapping visible feedback.
- A scene-local lazy-loaded Three.js pass moves the original sea/foam texture by a few painting pixels. It replaces the straight wave overlays, uses the beach crescent rather than lake geometry, and retains the illustrated texture. The boat and birds have gentle CSS motion.
- The painting fades into the scene sky, removing the portrait join. Phone and narrower desktop compositions keep the ball, orbs, copy and boat apart.
- The existing copy and Instagram destination remain. The late shared Lora/Nunito Sans update was checked here; this scene did not edit shared typography.

## Verification

Passed: npm run typecheck; npm run lint; npm run build -- --webpack. The coordinating thread confirmed a final integrated latest-source build including the final desktop/portrait boat positions, new typography, and shared no-JavaScript fix.

All twelve tests passed in the final integrated run, including all four beach checks and the new shared no-JavaScript hidden-container regression check:
node --test scripts/diorama-contracts.test.mjs scripts/lake-shoreline.test.mjs scripts/beach-football.test.mjs

The beach suite has four passing focused checks: constant limb lengths throughout 281 sampled poses; foot/ball travel and rolling distance; matching quiet start/end poses; actual Three.js initialization with an unavailable graphics context returns the fallback result without exposing a canvas.

Live browser at http://127.0.0.1:3102/preview/diorama#beach:

- Visually reviewed desktop 900x850 and portrait 390x844 / 375x667. A 1440px viewport layout check placed the complete copy box inside the viewport. Lora/Nunito Sans wrap the phone heading into two lines.
- Reviewed separate moments across repeated idle and requested footwork. The inward bend, ball roll and return remain connected. Browser-observed ball travel included -4.12, -31.71 and near-zero painting pixels, with the shoe sharing the same translation.
- Enter activated the football button and exposed its focus label. Both discovery targets measured 44x44 CSS pixels on portrait.
- Pause froze a partial pose: the transform arrays remained exactly equal across subsequent reads and activation while paused. The frozen partial pose retained foot/ball contact. Resume restarted motion.
- Continue to City made beach aria-hidden=true and character data-moving=false. After the transition settled, the pose remained exactly equal on a later read. Browser Back restored Beach. Direct #beach reload settled on Beach after hydration.
- No browser warnings/errors were observed in the final desktop review.
- Static background images and no-JavaScript fallback remain in rendered HTML; WebGL-unavailable behavior was exercised in the focused test.

## Evidence and limits

PNG files are layout/moment evidence, not video. Motion was inspected at several live moments and through changing/frozen transforms; no frame-rate, battery or physical-phone claim is made. The action is a compact sole-roll, not a running, kicking or juggling cycle. Palm foliage remains part of the original still background.

Reduced-motion and hidden-document gating were reviewed in source through useMotionPolicy().enabled combined with scene active, including frame cancellation and cleanup. This browser interface did not expose reduced-motion emulation or forced WebGL-context-loss controls; those states were not visually fault-injected. The unavailable-WebGL unit check is not a device GPU test.

Three.js cleanup/reference: https://threejs.org/docs/ (installed 0.186.1). Existing approved source: docs/mock/assets/beach-football.png; runtime background: beach-back.webp; character texture source: football-motion-v2.webp. No replacement raster art was generated.

### Water motion samples

A raw pixel comparison of desktop-a.png and desktop-b.png (900x850, same view, no intervening source edits) found visible movement in water and foam while the sampled dry sand was exactly stable:

| Region in screenshot        | Sampled pixels | Changed pixels (RGB difference >3) | Mean per-channel difference |
| --------------------------- | -------------: | ---------------------------------: | --------------------------: |
| Sea x500 y490 w200 h55      |         11,000 |                              6,333 |                        2.03 |
| Foam x600 y570 w170 h35     |          5,950 |                              4,071 |                        3.50 |
| Dry sand x600 y750 w160 h30 |          4,800 |                                  0 |                           0 |

These support localized motion, not a general frame-rate claim.

After the scene settled into its paused composition, paused-a.png and paused-b.png had zero changed channels across the 270x130 sea/foam sample (105,300 RGB channels). This directly verifies that the rendered water stops, in addition to the frozen character transforms.
