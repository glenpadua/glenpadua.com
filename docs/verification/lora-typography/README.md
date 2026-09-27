# Approved Lora / Nunito Sans typography — 27 September 2026

Glen selected option 2 from the local font comparison: Lora headings and italic signature, paired with Nunito Sans body text and navigation. He explicitly authorized coordination with the other website chats after the initial coordination message was blocked by automatic review.

## Implementation

- `features/diorama/styles/typography.css`: self-hosted variable WOFF2 font faces, Latin and Latin Extended subsets, `font-display: swap`, scoped heading/body tokens. Lora 400–600 normal and italic; Nunito Sans 400–700 normal.
- `world.css`: imports typography; applies Lora 500 to headings and signature and Nunito Sans to the world UI. Heading tracking follows the selected study.
- `rooms.css`: project lists, archive titles, search controls and dialog text use the same tokens, including portalled dialogs.
- `public/assets/fonts/diorama/`: unmodified font files, original OFL licenses and source notes. No third-party font requests are added to the diorama. The legacy site's existing Ubuntu setup remains separate.
- Heading fallback: Georgia, Times New Roman, serif. Body fallback: Trebuchet MS, Arial, sans-serif.

## Verification

- Typecheck and zero-warning lint passed.
- Coordinated `npm run build -- --webpack` passed; generated production CSS contains both new font families. Build window released to city afterward.
- Seven required contract/shoreline tests passed after the build.
- Live dev preview at 3102: visually reviewed lake desktop and 390×844 portrait; no horizontal overflow. Computed font stacks matched the selected families. Screenshot evidence is in this folder.
- Work project dialog and Stories archive: reviewed headline, list, control and body rendering; no browser errors. Dialogs were opened using keyboard activation.
- Beach thread independently reported clean Lora/Nunito wrapping at 375×667, 390×844, 900×850 and wide desktop.
- No browser-matrix, physical-device or deliberately blocked-font network test was performed. Browser fallbacks are defined; exact fallback metrics vary by operating system.
- Shared preview/server was not restarted. Existing user website tab was moved to the live 3102 preview. No public-site promotion or deployment.

The earlier three-option study remains under `docs/verification/font-options/`; it is a design artifact, not a website route.
