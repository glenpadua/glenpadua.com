# Story cover morph, 27 September 2026

Cross-document view transitions between the Stories desk and articles (`shared/page-transitions.css`, `articles/covers.ts#coverTransition`, `rooms/stories/stories-room.tsx`, `articles/article-page.tsx`, pause handling in `shared/world-shell.tsx`), plus first-paint font preloads in `world-layout.tsx`.

## Observed

Headless Chrome for Testing (Playwright's chromium-1243) driven over CDP at 1440×900, with the transition's animations frozen at fixed times on the new page:

- Desk → “The Lottery of Birth”: `cover-lottery-of-birth` paired old/new snapshots. At 100 ms a single painting lifts off the tilted paper while the desk fades; at 180 ms it is nearly in the article's cover slot, still unwinding the paper's rotation; the header stays fixed. An earlier version crossfaded thumbnail and cover over the full duration and showed a ghosted double image; the swap is now 110 ms.
- Article → “Back to Stories”: at 160 ms the cover is shrinking back onto its paper among the other cards.
- Font preload links are server-rendered in `<head>`.

## Caveats

- Headless Chrome needed focus emulation and disabled backgrounding; without them it aborted with “Document hidden”. The forward transition ran on every attempt afterwards; the return ran in roughly half of attempts, skipping cleanly (normal navigation) otherwise. This needs checking in a real browser before relying on it; the dev server compiling routes on first request is one suspected cause.
- Not checked: Safari 18.2+, Firefox (no cross-document support; plain navigation expected), a physical phone, or the archive dialog's links (no paired cover by design).

## Return trip follow-up

Glen reported the article → Stories morph not working in development. Chrome's console reason for the skips was “ViewTransition opt-in disabled”, only when the Stories page was revealed while still streaming (`readyState` “loading”) from the dev server. A production build of the same commit (`next build --webpack` in a separate worktree, served on :3210) ran the return transition on 8/8 attempts.

Changes:

- The `@view-transition` opt-in is also inline in `world-layout.tsx`, and `<link rel="expect" href="#world-main" blocking="render">` holds first paint until the main content is parsed. Development still skips roughly 3 in 8 return trips; production did not.
- Arriving at Stories from an article (link or browser Back, via `navigation.activation.from` or the referrer) adds a pre-paint head style so the papers are already on the desk: no deal-in replay, and the cover lands on a paper that is not moving. Fresh visits still animate; the marker is removed on the next client navigation or shuffle. An earlier version set an attribute on `<html>`, which caused a React hydration warning and was cleared by development double-mounting; both are fixed.

## Paper treatment

The papers now match the painted note under Glen's hand: warm paper tone, faint SVG grain, no outline, lamp-lit from the upper left with shadows falling to the lower right. Arrival settles each sheet onto the desk (700 ms, staggered); hover nudges the sheet towards the viewer, keeping most of its angle while its shadow lengthens (it no longer snaps square); shuffle slides the sheets opaque into a pile, lifts the pile away and slides the next handful out of it, without spinning. Paused motion shows papers without animation; reduced motion removes all of it.
