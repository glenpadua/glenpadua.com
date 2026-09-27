# Organisation pass verification — 27 September 2026

Scope: feature ownership, room styles, obsolete prototype removal, shared URL configuration and a launch-readiness review. No new artwork, redesign, public-route promotion or deployment.

## Automated evidence

Passed on Node 24.14.0:

- `npm run typecheck`
- `npm run lint`
- `npm run build -- --webpack`: 29 generated pages, including all eight preview articles and the existing public pages.
- `npm run test:diorama`: 36 passing tests after the final build. Includes feature import/style boundaries, preview/public route maps, article links/covers, generated HTML and no-JavaScript contracts, scene travel/sky continuity, water mask/fallback, globe physics and real-image hand/steam/laptop checks.
- `git diff --check`

The native Node TypeScript tests emit the existing module-type warning; they pass. The application module format was deliberately not changed as part of this cleanup.

## Browser evidence

Used the Codex in-app browser, a separate temporary tab, desktop 1280×800 and portrait 390×844. Compared the development preview on port 3102, then the final production build on a temporary port 3104. The existing development server was not restarted.

- Before/after DOM geometry for Work's art stage, monitor, screen-saver orb, Remote orb and lamp orb matched exactly at both viewport sizes. The production desktop measurements also matched the pre-cleanup baseline.
- Stories' stage, paper container and controls matched the previous desktop/portrait geometry. Individual card snapshots differed during the existing staggered dealing animation; the settled layout was inspected visually. Production portrait had no document horizontal overflow.
- Work typing was observed at different moments: the left pose changed from hidden to visible while the right pose remained separate. Both mask frames reported running animations during normal operation, and paused animations during screen sleep and the global motion pause. The real-image tests additionally verify that stationary areas do not flash.
- Opened the Stories archive using Enter, searched for “dream” and saw one matching story, dismissed with Escape, and confirmed focus returned to “All stories.” Inspected the portrait dialog and its text layout.
- Opened Remote's details and followed “My take on work and life” into the new preview reader. The article title/body and links back to Stories rendered successfully.
- Returned to Home, resumed motion and inspected the lake character after its geometry moved into the lake stylesheet.
- In the production build, shuffled the Stories papers from entries 1–4 to entries 5–8 and verified the new article links.

Screenshots record composition, not proof of motion:

- [Work, desktop production build](organisation-2026-09-27/work-desktop.png)
- [Stories, portrait production build](organisation-2026-09-27/stories-portrait.png)

## Limits and follow-up

This was not a physical-phone, Safari, screen-reader, slow-network or field-performance test. OS-level reduced motion, complete inactive-scene lifecycle behavior and every fallback were not newly exercised interactively in this pass; shared policy was preserved, and the focused automated fallback/HTML checks passed. No public deployment or analytics behavior was verified. See [the readiness review](../site-readiness.md) for the release checklist.
