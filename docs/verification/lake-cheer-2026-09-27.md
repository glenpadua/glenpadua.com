# Lake: cheer him on, 27 September 2026

Glen on the pull-up bar is now a button (`InteractionOrb` with an invisible silhouette marker, label “Cheer Glen on”, hover/focus hint “Cheer him on”). Each tap re-triggers the character's existing `play` hook: three 0.84 s reps from the approved four-frame sheet, then the normal 5.8 s cycle resumes. No new art.

Observed in the in-app browser (desktop): the hit area (x 683–795, y 542–830) matches Glen's body inside the sprite frame (x 685–792, y 546–832); sampled frame sequence showed three complete reps within ~2.4 s followed by the usual hang/hold rhythm. The control is only rendered while motion is enabled and the lake is active, so pause/reduced motion show no inert button. Typecheck and lint pass.

Not done: beach/city reactions and the beach drink. The drink was previously rejected in favour of a focused typing loop (see `beach-typing/README.md`); new reaction poses need art made to `docs/art-style.md`. Portrait placement is set from the mobile layer geometry but was not visually confirmed because the pane was hidden during this check.
