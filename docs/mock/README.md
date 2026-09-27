# Scene mock — rooms first

> Current implementation: [architecture and edit guide](../website-architecture.md). Current design decisions: [creative direction](../website-direction.md). This document retains the earlier study/checkpoint; its old file paths and technology limits are historical.

26 September 2026. An editable visual prototype, separate from the Next.js site.

## Open

From the repository root, run `python3 docs/mock/serve.py` and open the printed localhost address in a browser. An optional port can be passed: `python3 docs/mock/serve.py 62511`. The server serves only this folder on this computer. Restart after adding files; edits to existing files appear on reload.

- **Home — `index.html`:** lake → beach → city, with a stationary viewport and brief whole-scene dissolves. Calisthenics at the lake, football on the beach, coffee with Glen’s wife in the city. Her presence is visual, without explanatory copy.
- **Work — `work.html`:** the bedroom workstation fills the viewport. The laptop contains a Slack-inspired profile showing Senior engineer. Clicking it or its indicator opens the Remote.com details. The monitor opens work and side projects. An Arsenal scarf hangs over the desk.
- **Stories — `stories.html`:** the writing table fills the viewport. Four article sheets link to the existing posts. Glen is writing at the bottom of the scene; an archive cue links to the full blog.

No introductory text blocks or project lists sit above or below Work and Stories. These details appear only when requested.

## Edit map

| Change                                              | File                                          |
| --------------------------------------------------- | --------------------------------------------- |
| Home copy, scene order, images, indicator positions | `content.js` → `scenes`                       |
| Work monitor content and project list               | `content.js` → `work`                         |
| Articles and desktop paper positions                | `content.js` → `writing.articles`             |
| Shared fonts and colours                            | `styles.css`                                  |
| Home layout and scroll transitions                  | `journey.css`, `journey.js`                   |
| Full-view room geometry, mobile crops, dialogs      | `rooms.css`                                   |
| Shared markup, room indicators, Remote detail copy  | `render.js`                                   |
| Paintings                                           | `assets/`                                     |
| Original/revision image prompts                     | `asset-prompts.json`, `revision-prompts.json` |

Words on the page, the monitor, the laptop profile and the article sheets are editable HTML, separate from the paintings. Detail copy remains a draft based on Glen’s stated experience; no specific business results or metrics have been invented.

### Add a Home scene

Add an image, append a scene entry in `content.js` with a unique `id`, and add its sky colour in `styles.css` and desktop/phone composition in `journey.css`. The journey height and scene stops follow the scene count automatically. There are no edge gradients joining one scene’s ground to the next sky. Scene navigation follows the data order automatically.

Hotspots use `x/y` percentages and separate `mx/my` phone percentages on Home. Room indicators are anchored to the shared scene stage, with phone overrides in `rooms.css`. `href` creates a link; `panel` opens a detail dialog; `planned: true` produces an inert “later” cue.

Paper location and size use `x/y/w/h` percentages, with `r` for rotation. Phone papers use a two-column layout within the scene. Check long titles whenever adding a paper.

## Art and responsive composition

- Lake: sage exercise top and shorts, left prosthesis retained.
- Beach: shirtless with shorts, casually playing football; `beach-football.png`.
- City: evening clothes and coffee; the woman’s face uses simpler cartoon features to better match Glen. `city.png` is the revised painting; the prior version remains in the storyboard art-direction folder.
- Work: sage shirt, rear perspective and Arsenal scarf; `work-arsenal.png`. A separate `work-portrait.png` supports phones.
- Writing: overhead perspective and a glimpse of Glen writing; `writing.png`.

These edits used the built-in image tool. Personal photo references have not been copied into the mock. Artwork style can still be refined; this is a composition prototype rather than a finished asset pipeline.

Desktop rooms crop one shared stage to fill the view while keeping HTML objects aligned. On phones, Work uses the portrait painting with a quiet extension of the wall; Stories rearranges its article papers above the writing area. Ordinary route navigation remains available alongside object indicators.

## Functional scope

The scene illustrations are static. Native dialogs are deliberately functional so progressive disclosure can be evaluated: open from laptop/monitor or indicators, close with the close control, Escape or backdrop, and restore focus to the opener. Dialogs constrain focus while open and scroll independently when needed.

Page, article, Remote.com and Instagram links work. Exercise/personal cues currently open Instagram’s profile, since no specific clip is selected. Staypal remains an exploration, not a launched product claim.

Apart from the short scene-change dissolve, there is no character animation, parallax, AI conversation, working carousel, paper shuffle, light toggle, embedded video, CMS or contact form. These future cues are inert. Production SEO, image optimization, interaction accessibility and performance budgets belong to implementation.

## Verification

Visually reviewed desktop Work and Stories filling the viewport, plus Home’s new football and city compositions on phone. Work and Stories at 390px match viewport dimensions without document overflow, and the four article sheets fit without overflowing their containers. Laptop and monitor dialogs were checked with pointer/keyboard opening, close control and Escape; focus returns to the opener. Updated local assets and route links load.

This is prototype layout and disclosure verification, not a full production audit. The earlier [discussion board](../storyboard/index.html) and [storyboard](../storyboard/README.md) preserve earlier exploration; this folder is the current layout mock.

## Transition study and art constraint

The current Home test holds one complete scene in a sticky viewport. Ordinary native scroll selects the next scene after roughly 65% of a viewport of travel, and a 260ms dissolve completes independently of scroll. Pausing cannot leave a permanent half-blended character. No wheel/touch interception or smooth-scroll library is used. Scene links jump directly to each stop; scrolling back revisits earlier scenes.

Only the current scene exposes its links to focus and assistive technology. `prefers-reduced-motion` selects immediate scene changes, and a visible Dissolve on/off control exercises the same cut mode. The system preference cannot be overridden by that control. Essential route navigation remains visible.

Glen clarified the visual direction during this pass: **keep the original simple, website/video-game-like art style.** The detailed landscape regeneration attempts were rejected and were not copied into the mock. `lake.png`, `beach-football.png`, and `city.png` remain the active scene paintings. Do not use the rejected detailed paintings as future art direction.

Checked native keyboard scrolling between scenes, direct scene links, active-scene focus exclusion, the no-dissolve control (computed transition duration 0s), and desktop/phone layouts. System reduced-motion handling is implemented; a system-preference override was not used during browser testing. These are local prototype checks, not a claim of verification on every device.
