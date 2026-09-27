# Stories links and bespoke covers

27 September 2026. This follow-up supersedes the initial reader review's cover reuse and unconnected Stories destinations. Preview only; no public promotion or CMS migration.

## Result

- All eight article covers were generated from their published content using the built-in image tool. The first detailed drafts and their attempted refinements were rejected and are not shipped. Glen approved the sparse poolside cover, then requested that treatment for every article.
- The approved poolside image and original lake artwork were the direct image references for the remaining seven. The shared art guide now makes the landing-page character, simple proportions, sparse detail and spacious composition explicit. It links the approved poolside example.
- The childhood school cover was corrected to show an intact left leg inside an external calliper and the khaki uniform, preserving the pre-amputation timeline. Documentary photographs and article writing remain unchanged.
- Full covers are 1536 × 768 WebP; matching thumbnails are 600 × 300. All eight full files total 404,040 bytes, and all eight thumbnails total 92,902 bytes. Prompts, generation sources, article source hashes, dimensions, file hashes and focal positions are in `docs/article-covers.json`.
- Stories cards, the archive and no-JavaScript links now reach `/preview/diorama/blog/[uid]`. The reader and Stories use one `getArticleCover(uid)` registry. Narrow paper thumbnails have their own focal position, and desktop headings leave more space for the illustration. Their colour is no longer faded independently of the full cover.

## Checks

- `npm run typecheck` and `npm run lint`: passed.
- `npm run build -- --webpack`: passed in the isolated copy `/private/tmp/glen-articles-check.PJLBsW`, generating all eight article previews among 29 pages. No shared build directory or existing server was restarted by this chat.
- Post-build `node --test scripts/diorama-contracts.test.mjs scripts/lake-shoreline.test.mjs scripts/article-links.test.mjs`: all 12 passed with Node 24. Tests check built destinations, matching cover assignments, source dimensions, available files, future-post fallback, static HTML and existing scene contracts.
- Inspected every final generated image against the approved poolside/lake references. Reviewed both paper stacks at a 1440 × 952 content viewport and 390 × 796 portrait viewport. All eight thumbnail images loaded and the important subject in each remained visible. Phone pages had no horizontal overflow.
- Searched the archive for npkill, confirmed its one matching result, activated it with Enter and reached the new reader. Opened the dream-job card with Enter on the phone layout and confirmed its full cover matches the card's asset. Back to Stories returned to the writing desk.
- Inspected the dream-job reader's centered 3:2 phone crop: the complete character, laptop and table remain visible. Wide covers retain the whole generated composition. No cover animation was added.
- Observed the existing writing motion, then paused it with the shared control. Its computed animation state became paused and its transform remained identical across observations. Keyboard shuffling still revealed four fully visible cards with all images loaded while paused. Restored motion, the first stack and the original viewport afterward.

## Evidence

- `stories-covers-desktop-1.jpg` and `stories-covers-desktop-2.jpg`: both final desktop stacks.
- `stories-covers-portrait-1.jpg` and `stories-covers-portrait-2.jpg`: both phone stacks.
- `approved-cover-portrait.jpg`: matching article cover with title/byline and readable body text.

The viewport override only affected the visible in-app tab, not the hidden test tabs; viewport dimensions were confirmed from the rendered page before recording responsive evidence. Pointer automation was unreliable in the resized in-app surface, so final activation checks used keyboard controls. Physical-phone, full screen-reader and fresh OS reduced-motion testing were not performed. Static no-JavaScript destinations were verified from built HTML, not by disabling JavaScript in the browser.
