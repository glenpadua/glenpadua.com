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
