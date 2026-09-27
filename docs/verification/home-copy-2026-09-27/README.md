# Homepage copy and discovery controls — 27 September 2026

This pass replaces the repeated eyebrow/headline/tagline format with a connected introduction: Glen and his engineering experience, work and AI curiosity, then writing and conversation. Existing scenic artwork and environmental/character routines are preserved. No new playful rewards were added.

The shared `InteractionOrb` now displays an outlined four-point glint through `DiscoveryMark`. It stays anchored to its object, has no floating animation or glow, and preserves real links/buttons, 44px targets, keyboard focus and contextual labels. Work and Stories use the same mark. The lake cue moved beside the pull-up post, clear of the sun.

New discoveries: the leg-day aside links to The Lottery of Birth; the beach opens an honest creation note; city coffee links to the existing contact destination. The city satchel no longer repeats the Work link. Instagram still goes to the known profile; a specific clip has not been supplied.

## Verification

- Typecheck, lint and the final webpack production build passed. All 36 focused tests passed after the final build.
- Inspected the three Home scenes in the development browser at 390×844; also reviewed Beach and City at 320×568 and Lake/Beach at 1280×800. Checked the shared glints in the Work room. These are browser viewport checks, not physical-phone evidence.
- Followed the beach laptop into Work and the leg-day link into the actual Lottery of Birth reader; waited for its article heading to render.
- Opened the new beach disclosure using Enter, dismissed with Escape, and observed focus return to its button. Repeated this on the final production build. Its native details fallback is present in generated HTML and the JavaScript-only opener starts hidden before hydration.
- Checked keyboard traversal and discovery links with motion paused, then restored normal motion. Glints have no continuous animation; their hover/focus scaling uses the existing reduced-motion policy. OS-level reduced motion was not independently toggled in this pass.
- In the production build, verified only the active chapter was free of `inert` and `aria-hidden`. Portrait Beach had no horizontal document overflow.
- Preview remains noindex. No public route was promoted or deployed. A temporary production server was used for the final checks; the existing development server was left running.

Viewport resizing can place the existing scroll-driven journey between chapter stops. Re-entered the chapter at the new size before judging settled layouts; this pass does not change journey resize behavior.

## Screenshots

Screenshots document composition, not animation performance:

- [Lake, desktop](lake-desktop.png)
- [Beach, desktop](beach-desktop.png)
- [Beach, portrait](beach-portrait.png)

## Later simplification: remove the website explainer

At Glen’s request, removed the beach’s “About this little world” disclosure entirely, including its AI/art/code explanation, and removed the separate pull-up-bar aside explaining the website. The remaining introduction and social objects are unchanged. Current direction now explicitly rules out visitor-facing explanations that the website was built with AI.

Verified the live desktop beach: no disclosure trigger or explanatory paragraphs, and both social links remain available. Screenshot: `beach-without-explainer.png`. Typecheck, lint, webpack build, 36 diorama tests and whitespace check passed. No motion or layout logic changed; the earlier portrait and motion checks were not repeated for this content removal.
