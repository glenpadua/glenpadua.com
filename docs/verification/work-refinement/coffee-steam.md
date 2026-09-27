# Coffee steam correction — 2026-09-27

The former shared steam border extended below the painted cup rim. Live desktop measurements reproduced the issue: steam bottom 536.47px, front rim 526.63px. Its vertical animation moved the whole unbounded shape across the cup.

Work now owns `coffee-steam.tsx` and `coffee-steam.module.css`. Two subtle SVG wisps rise and fade inside a stationary clipped region ending inside the coffee opening. Desktop origin is (1065, 609) in the 1536×1024 painting; phone origin is (577, 768) in the 800×1600 painting. The clip cannot move with the wisps. Shared Stories steam is unchanged.

Observed in the running preview:

- Desktop clip ends at 515.61px, above the 526.63px front rim. Ten successive screenshots and transform/opacity samples showed the upward drift, fading and phase wrap without crossing the cup body.
- Phone 390×844: clip ends at 405.13px, above the 410.40px front rim. Screenshot `steam-phone.png` shows the effect over the opening.
- Pause sets both wisps to paused. A subsequent preview hot reload reset the frozen phase, so continuous unchanged-transform evidence across that reload is not claimed. Resume worked via the keyboard. Reduced motion hides the decoration in CSS; the shared motion policy handles background-tab pause. Neither OS reduced-motion switching nor physical-phone performance was tested.
- Typecheck and lint passed before concurrent article changes. Production build subsequently failed on unrelated `articles/article-body.tsx` link-target types and `articles/load-articles.ts` nullable fields. The coordinating chat was notified. Twelve of fourteen checks passed; the two built-HTML checks lacked output from that failed build. Both new `scripts/work-steam.test.mjs` checks passed against the actual CSS positions and independently measured painting rim bounds at four scales.

Desktop motion evidence: `steam-desktop-0.png` through `steam-desktop-9.png`. The normal viewport and motion setting were restored afterward.
