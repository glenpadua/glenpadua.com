# Articles

The reading preview lives at `/preview/diorama/blog/[uid]`. Public `/blog/[uid]` routes remain unchanged. It uses Prismic content, a server-rendered article body and the shared Lora/Nunito Sans typography. Comments and likes are omitted. Repo-owned MDX, interactive blocks and public promotion remain later work.

## Ownership

`features/diorama/articles/` owns the reader, its styles, cover registry and Prismic adapter. `app/preview/diorama/blog/[uid]/page.tsx` is a thin route with noindex metadata and the existing public canonical URL. `rooms/stories/` owns the writing desk and archive; its cards, archive entries and no-JavaScript links use `articles/routes.ts` to reach the updated reader. That helper handles preview article links without changing the shared mount map.

The reader inherits `WorldLayout`. Its stylesheet adjusts the containing header and utility placement only when `.reading-article` is present, so controls scroll with the reading page. Static articles hide the inherited motion toggle from display and keyboard/accessibility navigation. Future animated article blocks should expose controls only when they have motion to pause. No scene artwork, room styling or shared control implementation is copied.

## Covers

Every article has an illustrated cover slot. Set its source, thumbnail, dimensions, focal position and alt text in `articles/covers.ts`. Both the reader and Stories call `getArticleCover(uid)`, so the same artwork appears in each. All covers follow [the one shared art style](art-style.md); do not create an article-specific style definition. The eight published articles have bespoke illustrations grounded in their content. [The cover manifest](article-covers.json) records their generation prompts, sources and review. Unknown/new posts receive the approved writing-desk illustration until assigned a cover.

For a replacement, add uniquely named assets under `public/assets/world/articles/`, record the provenance and review required by the art guide, then replace that post's registry entry. Match source dimensions and review the 2:1 desktop, 3:2 portrait and small paper-card crops. Full covers carry descriptive alt text; thumbnail images repeat the linked title's context and use empty alt text. Article cover images are distinct from Prismic's legacy `cover_image` and `show_cover_image` fields. Those source fields remain untouched, along with all body media. Childhood scenes must respect the chronology: Glen wore a calliper before his later amputation, so the adult character's prosthesis must not be applied to those years.

## Source fidelity

The adapter uses the editorial `date`, falling back to the CMS publication date only when absent. Body slices are rendered in source order with rich-text emphasis, links, list numbering, line breaks, code, image proportions and captions. Unknown slice types raise an error rather than silently dropping content. CMS errors remain errors, while a genuinely absent UID returns a 404.

Only known article links on `glenpadua.com` under `/story/` or `/blog/` resolve to the corresponding preview article; query strings and fragments survive. Other destinations remain as supplied. This is not a public redirect migration. Dates, writing and source mistakes are not silently rewritten. Image descriptions missing from the source still need editorial review; the renderer does not invent them.

The first review post is `do-you-have-an-ideal-dream-job` (headings, lists, quotes and portrait media). Also review `lottery-of-birth` (long prose and family photos), `lord-of-the-rings` (numbered lists) and `free-space-npkill` (code).

## Verification and later migration

Run the repository application checks and the existing post-build contracts, plus `scripts/article-links.test.mjs`. Check desktop/portrait reading, keyboard focus, zoom, image loading, article-to-article links, return to Stories and no-JavaScript HTML. There is no article animation in this pass. Pause/reduced motion must leave the same complete reading experience. Keep evidence under `docs/verification/articles/`.

Before an approved repo migration, export published and unpublished content separately and preserve original UIDs, dates, CMS IDs, raw rich text, tags, media URLs/crops/dimensions/credits and source timestamps. Compare every migrated paragraph, span, link, caption and image with the source. Preserve `/blog/[uid]`, plan the legacy `/story/` redirects, verify canonical/social metadata and sitemap, and keep rollback material. The CMS authoring and preview flows remain in place until that migration is explicitly requested.
