# Diorama motion v2 · local verification

27 September 2026. Local preview only. Production server: `http://127.0.0.1:3100/preview/diorama`.

## Automated validation

- `npm run check`: TypeScript, zero-warning ESLint and optimized Next build passed. The three preview routes remain prerendered; Stories retains its hourly refresh.
- `node --test scripts/diorama-contracts.test.mjs`: all four contracts passed (scene endpoints, forward/reverse travel without double-exposed people, arbitrary article batches, built semantic/fallback/link metadata).
- `git diff --check`: passed. Original mock paintings and storyboard material remain preserved.

## Timed motion evidence

These GIFs are consecutive screenshots of the actual optimized browser rendering, downsampled to 800 × 450 and encoded with the measured capture intervals. They are review recordings, not animation assets loaded by the site. The source viewport was 1280 × 720. Timing JSON files record the corresponding CSS transforms or opacity. Capture cadence is approximately 5–7 samples per second; it is not a browser frame-rate benchmark.

| Action   | Recording                              | Observed states                                                                                                     |
| -------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Pull-up  | [Lake motion](lake-motion.gif)         | 32 frames across 6.95 seconds; all four poses, fixed apparatus and grips, ascending and descending body.            |
| Football | [Football motion](football-motion.gif) | 16 frames across 2.24 seconds after the action click; all three poses, planted natural shoe, ball remains grounded. |
| Typing   | [Typing motion](typing-motion.gif)     | 22 frames across 4.28 seconds; left and right finger alternates observed independently, with rest beats.            |
| Writing  | [Writing motion](writing-motion.gif)   | 20 frames across 3.89 seconds; pen and hand alternate coherently, old pen silhouette covered by the corrected crop. |

`*-pose-check.png` places the distinct captured states alongside one another for registration review. `*-production-timing.json` records the sample timings. Raw final frames remain locally in `/tmp/glen-diorama-motion-v2-final/`; compact recordings and selected stills are kept here. Older development captures were moved to `/tmp/glen-diorama-motion-v2-captures/` so they cannot be mistaken for final evidence.

## Interaction and responsive checks

Development-browser review covered 1440 × 900, 390 × 844 and 320 × 740. Final production playback covered 1280 × 720. Phone sizes are browser emulation, not physical-device acceptance.

- All three outdoor stops remain readable on phones. At 320px the complete pull-up apparatus and feet fit above the footer. No horizontal document overflow was observed on Home, Work or Stories.
- Work's five orbs and Stories' two orbs retain 44 × 44 targets inside both phone widths. Edge-aligned labels were corrected to remain inside the viewport. Keyboard Tab reveals the label and focus indicator; the shuffle label's right edge was measured at 318px in a 320px viewport.
- A single tap on the terrace Stories orb opens Stories. The football orb starts its action; the lantern switches its glass and painted ground light. The tray orb changes the four displayed articles. The pen control pauses/resumes the writing animation. Work's screen saver replaces project content and pauses both typing alternates; returning restores the projects.
- Global pause sets every animated descendant to paused. A production pull-up transform was unchanged after a 1.2-second observation interval. Resume restores the animation. Offscreen outdoor character animations were measured paused while the active scene's character was running.
- The final production tab had no browser error logs. It was left on Home with motion enabled. The temporary viewport override was cleared.

Still images include `home-production.jpg`, `work-production.jpg`, `stories-production.jpg`, `screen-rest-desktop.jpg`, phone scenes and lantern on/off states. Phone stills and lantern comparisons are from development review; files marked production and the GIFs are from the optimized build.

## Evidence boundaries

The provider retains document-visibility and system reduced-motion handling, and the CSS explicitly disables new motion under the reduced-motion media rule. A real hidden-tab transition and an OS reduced-motion preference override were not exercised in this pass. No physical phone performance run, field Core Web Vitals, full screen-reader audit, JavaScript-disabled browser test or deployed release is claimed. These remain limited-frame illustrated character actions, not a fluid high-frame-rate animation production.

See [implementation notes](../../diorama-motion-v2.md) and [exact artwork prompts/provenance](../../diorama-motion-v2-assets.json).
