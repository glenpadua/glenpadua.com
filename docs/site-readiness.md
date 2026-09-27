# Replacing the original website

Reviewed 27 September 2026 against the local implementation. This is a launch assessment, not a new creative brief. [Current direction](website-direction.md), [the manifesto](../MANIFESTO.md) and [the shared art style](art-style.md) remain authoritative.

## Recommendation

The direction is settled enough to stop expanding the concept and prepare a first public release. The current preview is not yet a drop-in replacement. Finish a small, credible version of Work, complete the public-route/metadata handover, and do a focused release check on real devices. Further easter eggs and richer AI features can follow after launch.

Home, the two rooms and the article reader already form a coherent experience. There is no reason to wait for every future consulting offer, interactive essay or side project. The first release should let a stranger understand who Glen is, see credible work, read his stories and make contact without having to discover every hidden interaction.

## Before switching the public routes

| Area                          | What exists / remaining work                                                                                                                                                                                                                                       | Done when                                                                                                                                                                                                                                                                                                                                                                             |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Work and contact              | The monitor has four entries: the website, Uncommon UI, New Faces and the StayPal exploration. The Remote profile/dialog is present. New Faces still links to the old `/work` page, which would become a self-link after promotion. “Say hello” leads to LinkedIn. | Glen approves the first set of accurate project summaries, each has an intentional destination, and the contact route suits the kind of enquiries he wants. A few convincing examples are enough; no invented results or client claims.                                                                                                                                               |
| URL handover                  | New pages are preview-only. Article links now share the same mount configuration as Home/Work/Writing. The archive still deliberately offers “Visit the original blog.”                                                                                            | Mount the feature on public routes, preserve every `/blog/[uid]`, decide whether `/blog` redirects to `/stories`, and retain or redirect `/skills` deliberately. Remove preview-only exits. Check historical `/story/…` links against the real host before deciding redirects. If preview and public mounts both remain interactive, supply their routes through an explicit context. |
| Search and sharing            | Preview routes correctly say `noindex`. The article reader already declares stable public canonicals. The root description still describes the old Next.js/Prismic site; no application sitemap or robots route was found.                                         | Public titles, descriptions, canonicals, social cards and sitemap reflect the new pages. Confirm the real host's robots rules and indexability. Preview stays excluded. Test an article shared directly, not only reached through Writing.                                                                                                                                            |
| Missing pages and failures    | Missing articles reach the legacy root not-found page. Writing can fall back to its known article list during a CMS outage, but that does not make article bodies available offline. Article failures intentionally distinguish missing content from a CMS error.  | Give missing content and recoverable failures an intentional treatment in the new theme, with a clear way back. Exercise invalid slugs, image failures and a CMS failure.                                                                                                                                                                                                             |
| Accessibility and performance | Shared pause/reduced-motion behavior, semantic links, keyboard-operated dialogs and static art fallbacks exist. Local automated checks and desktop/portrait browser inspection are useful but incomplete evidence.                                                 | Test on a real phone, including Safari, and with a screen reader. Check zoom/large text, touch target reachability, reduced motion, slow first load, scroll/frame behavior and memory after navigating between rooms. Record production measurements and fix actual problems before claiming it is fast.                                                                              |
| Release verification          | The repository has local checks but no checked-in GitHub Actions workflow. Deployment and analytics have not been verified in this review. `lib/analytics.ts` still configures a `UA-…` tracker.                                                                   | Establish repeatable release checks, smoke-test the deployed build and its direct URLs, keep a rollback point, and deliberately replace/remove/verify the analytics setup. Analytics itself need not delay launch if omitted intentionally.                                                                                                                                           |

## Organisation completed in this pass

- Moved Work layout, monitor and ambient styles into `rooms/work/layout.css`; moved Stories paper, archive and ambient styles into `rooms/stories/layout.css`.
- Moved portal styling beside `shared/world-dialog.tsx`. Shared room CSS now handles only common stage geometry and the no-JavaScript presentation.
- Scoped extracted styles to the illustrated experience without raising selector specificity. Kept the established art, compositions, effects and responsive placement.
- Removed the unused shared `RoomHands` component and abandoned laptop/project-index/hand-animation rules. Work's real typing effect now owns its geometry, masks and pause rules in its CSS module.
- Consolidated scene and article URLs in `lib/routes.ts`, including legacy article-link rewriting. The Remote dialog's related article now opens in the new reader.
- Added import/CSS boundary checks and `npm run test:diorama` to run every focused suite. Removed a test-only diagnostic branch for the retired typing polygons; kept the real-image regression checks.
- Updated the architecture guide and README. No public route was replaced and no deployment was performed.

## Sensible next cleanup

Keep these small and tied to actual needs rather than turning the settled design into another rebuild.

- Keep Work and Writing content edits in their existing content modules. Work currently assumes at least one project; add an empty-state contract if removing all entries becomes a supported editing workflow.
- The writing desk and article reader have separate Prismic adapters because their curation/fallback behavior differs. A shared raw post loader is a possible future seam; preserve those distinct behaviors if consolidating it.
- Inventory runtime art versus archived experiments. Retain approved sources and provenance, then deliberately relocate superseded public assets and retire old preview studies. Do not delete artwork simply because a text search finds no reference.
- Once the public replacement is proven, remove the legacy page/component dependencies and preview-only scaffolding that are no longer needed. Git preserves the old website; two permanent implementations should not become a maintenance obligation.
- Consolidate responsive overrides further when changing each room's composition. Their current ordered cascade is preserved in this pass to avoid another visual redesign.

## Can follow the first release

Repo-owned MDX posts and custom interactive essay components; the character chat/voice experiment; niche lead magnets; a consulting funnel; more elaborate character routines; additional easter eggs; full project case studies as they become available.

Prismic is still the source of the existing article bodies. Keeping it temporarily is compatible with a server-rendered, searchable first release. Migrating the writing system is a separate content-preservation task, not a prerequisite for switching the design.

## Verification for this pass

See [the organisation verification record](verification/organisation-2026-09-27.md). Local evidence does not establish production performance, physical-phone behavior or screen-reader acceptance.
