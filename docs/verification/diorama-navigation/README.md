# Scene navigation refinement

27 September 2026. Removed header/footer paper panels, the numbered scene selector and the scroll instruction. Scene-aware lettering sits directly on the paintings. An accessible down-arrow link leads to the next scene; it disappears at the final stop. Pause and contact remain as small unboxed controls.

Checked Home, beach, city, Work and Stories in the local browser. Responsive review used 390px and 320px widths; the 320 × 740 layout had no horizontal overflow, all header links were at least 44px high, and the arrow's 48 × 48 target did not overlap the bottom controls. Keyboard pause froze the arrow; keyboard navigation reached both scene stops. Reduced motion remains covered by the existing shared CSS media rule.

`npm run check`, all four existing diorama contract tests, formatting and `git diff --check` passed. The final optimized local preview at port 3100 also passed both arrow-link clicks and showed no arrow at the city. `home.jpg` and `city.jpg` show that final build. This is local browser evidence, not physical-device or deployed verification.

Cursor-following removal: deleted pointer movement/leave handlers and pointer offsets from the current outdoor renderer and styles. Room compositions were already independent of the cursor. After rebuilding, a horizontal pointer sweep left every lake layer and hotspot transform unchanged; character animation remained running and the next-scene link still reached the beach. `cursor-stable.jpg` records the updated build. The production check and all four contract tests passed again.
