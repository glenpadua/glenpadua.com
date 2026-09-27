# Article preview verification

27 September 2026. Initial reader review, before the Stories integration and bespoke covers recorded in [the follow-up review](stories-covers.md). Public blog routes remain unchanged.

## Implemented

- All eight published Prismic posts render at `/preview/diorama/blog/[uid]` using the shared reading template, dedicated cover slot, original body media and server-rendered rich text.
- Covers reuse approved scene artwork. There are no newly generated bespoke covers, migrated posts, comments, likes or animated article blocks.
- `docs/art-style.md` is the shared style definition, reached from `AGENTS.md`, website direction, architecture and the world asset folder. The cover registry records its revision and reuse provenance.

## Checks

- `npm run typecheck`: passed in the working checkout.
- `npm run lint`: passed in the working checkout.
- `npm run build -- --webpack`: passed in an isolated copy at `/private/tmp/glen-articles-check.PJLBsW`; generated all eight preview articles. The shared `.next` directory and existing server were not rebuilt or restarted by this chat.
- Post-build `node --test scripts/diorama-contracts.test.mjs scripts/lake-shoreline.test.mjs scripts/article-links.test.mjs`: 10 passed in that copy, using Node 24.
- Compared generated HTML against freshly read public Prismic content: all 220 nonempty source text blocks, including captions and code, were present in order across eight posts. All 17 body image URLs and supplied alt values matched. Every preview had one H1, a cover, noindex/nofollow and its existing public canonical URL. This comparison normalised whitespace and did not assert visual equality of every rich-text span.
- The new link tests verify that known legacy/public article links resolve within the preview while preserving query strings/fragments; unknown/external/non-web links remain unchanged.

## Browser observations

- Reviewed the dream-job article at desktop 1440 × 1000 and portrait 390 × 844. The full cover subject survived both crops. At 390px, body text was 18px with no horizontal page overflow.
- Checked the opening prose, headings/lists and original portrait photo. The source image loaded at its natural aspect ratio, displayed at 487.5 × 650 CSS pixels on desktop.
- Tab revealed the skip link with a solid focus outline; Enter moved focus to `world-main`. The article header scrolls away rather than obscuring prose.
- Following the related npkill link opened the corresponding preview. Its code block was keyboard focusable and fit the 390px layout without page overflow.
- Article prose has no animation. The page was also observed with the shared reduced-motion control disabled by preference during initial rendering, but a deliberate reduced-motion emulation pass was not completed. A later pause-control interaction navigated unexpectedly in the shared browser session, so pause/resume is not claimed as independently verified here.
- Temporary viewport overrides were reset. A separate Chrome session attempt timed out; the in-app browser was used for the successful observations.

## Limits and follow-up

Physical-phone, screen-reader and browser-zoom testing remain unperformed. Browser no-JavaScript mode was not exercised; the source comparison checked generated static HTML. Missing source alt text remains an editorial issue, including the dream-job body photograph. New covers need their own review against the art guide. Existing asset bitmaps were not regenerated or individually audited by this documentation change. Stories link integration, source migration and public promotion remain separate work.

Screenshots: `desktop-heading.png`, `portrait-heading.png`, `source-photo.png`, `portrait-code.png`.

## Follow-up: remove the irrelevant motion control

Static articles now hide the inherited motion toggle with an article-scoped rule. The live article accessibility tree no longer includes it, its computed display is `none`, and the footer retains Say hello. Scene/room rules and the shared motion implementation are unchanged. Evidence: `footer-no-motion.png`. Typecheck, lint, the isolated production rebuild and all 10 post-build checks passed again. Future animated essay blocks should introduce a relevant control when needed.
