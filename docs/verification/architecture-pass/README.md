# Organization pass · 27 September 2026

The diorama feature was separated from preview routes, with per-scene content/effects/styles, a shared `InteractionOrb`, a shared art-stage/fallback renderer, and route-independent layout/link configuration. Artwork and current animation behavior were preserved. This is a refactor checkpoint, not a claim that scene polish is finished.

## Checks

- TypeScript and zero-warning ESLint passed.
- Production build passed with `npm run build -- --webpack`. Default Turbopack could not bind its worker port in this thread's sandbox, including on the elevated retry. No application error was reported by the webpack build.
- Seven Node contract tests passed: preview/public mount mapping, variable chapter counts, scene stops, reversible transitions without duplicate characters, archive batching, built semantic/URL/fallback contracts, and lake shoreline geometry against the painting.
- Browser smoke used an isolated production server at `127.0.0.1:3102` rather than the lake thread's cached server at 3100.
- At 1280×720: lake rendering and running shader; native navigation to beach and city; keyboard football request; lake shader paused outside lake; city lantern toggled with correct pressed label/state.
- At 390×844: city, workstation and writing compositions inspected; no horizontal overflow in those views. Labels were hidden on unfocused city orbs; the beach button retained a 44×44 target and disclosed its label on keyboard focus.
- Work: lamp toggled, Remote detail dialog opened with keyboard, Escape closed it and returned focus to its orb.
- Stories: shared shuffle orb displayed papers 5–8 of 8; manual pause set the orb animation to paused. No browser error entries were reported.

System reduced-motion and physical phone performance were not re-audited in this structural pass. Existing policy was moved without behavioral changes. Scene agents must verify their new effects separately. [Workstation evidence](work-desktop.png) records the preserved room layout.

## Follow-up: direct chapter links

The city agent found that opening `/preview/diorama#city` directly could hydrate at scroll zero with the lake active. The browser jumped before the stacked fallback changed to a sticky stage. The marker itself was correctly positioned: a reproduced failure had `hash: '#city'`, `active: 'lake'`, `scrollY: 0`, and city marker top `1440`.

`world-journey.tsx` now restores recognized chapter fragments after the hydrated layout is ready and on hash changes. It uses the same travel geometry as the scene calculation, accepts the pre-hydration `-scene` links, ignores other hashes, and does not rerun on pause or intercept user scrolling.

The browser regression was run red before the fix, then green: load/reload `#city`, wait for `.world-journey.is-ready`, and assert its `data-scene` is `city` and `#city-scene` is visible. Desktop results: city at scroll 1440 and beach at 720; browser Back selected city again. Paused reload retained city. At 390×844, city opened at scroll 1688. [Phone evidence](city-fragment-phone.png) records this direct-link check. Typecheck, lint, webpack build and the seven existing contracts passed again. This is browser-level evidence of hydration timing; the pure choreography tests alone cannot reproduce it.

## Follow-up: static content without JavaScript

The city thread reproduced a production failure in a fresh 390×844 browser context with JavaScript disabled before navigation. The city section existed, but its ancestor `<div hidden id="S:0">` had `display: none`. This was the root `app/loading.tsx` streaming boundary, not city artwork or scene CSS. Presence-only HTML checks had missed it.

Added a rendered-ancestor regression for Home, Work and Stories. It failed against the existing production build. Moved the unchanged loading component from `app/loading.tsx` to `app/blog/loading.tsx`, retaining the CMS loading UI within its route and leaving the static scenic pages outside that boundary. The regression then passed after rebuilding.

The integrated current-source webpack build, TypeScript, zero-warning ESLint and all 12 Node checks passed, including the four beach physics/WebGL fallback checks and lake shoreline geometry. The build includes the beach and city agents' final scene changes and approved self-hosted typography.

The city thread then verified fresh production browser contexts with JavaScript disabled: Home/City, Work and Stories were visible. Native notebook → Stories, Back, satchel → Work, project disclosure and header Home navigation all passed. Its evidence is under `docs/verification/city-refinement/no-javascript*.png`.

That browser check also exposed empty outlines from unloaded image tags without a source. The shared default layer and city unlit layer now omit their image until loading is enabled, retaining their positioning wrappers. The built-HTML contract also rejects source-less images; it was run red against the affected output before rebuilding.

Final build, typecheck, lint and all 12 tests passed after that fix. The city thread's refreshed production screenshots confirm the outlines are gone, with zero source-less images both with and without JavaScript. The coordinating thread also inspected the refreshed no-JavaScript screenshot. Normal City rendering and lantern toggling passed. Temporary production verification servers were stopped; the shared development preview remains on port 3102. Physical-device performance remains unverified.
