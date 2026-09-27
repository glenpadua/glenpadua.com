# Local diorama v1 verification

Historical v1 evidence. See [the v2 verification record](../diorama-v2/README.md) for the subsequent character-motion and interaction pass.

26 September 2026. Local preview only; no deployment or physical-device claim. The public homepage and existing public routes were preserved.

## Automated checks

- `npm run check`: TypeScript, zero-warning ESLint and optimized Next build.
- `node --test scripts/diorama-contracts.test.mjs` (Node 24+): four contracts covering scene endpoints, forward/reverse travel without double-exposed people, complete paper batches for arbitrary archive sizes, and generated HTML with semantic headings, genuine article destinations, preview noindex and no-JavaScript fallbacks.
- `git diff --check`: whitespace validation. Pre-existing tracked changes compared with the saved starting diff; original mock/storyboard files were not edited.
- Three preview routes are statically generated. Stories uses a one-hour refresh of the public Prismic catalogue. All eight existing posts were confirmed against the public CMS.

## Browser inventory

Tested in the Codex in-app browser. Responsive viewport checks are browser emulation, not a physical phone test.

The final normal-window pass at 943 × 867 also checked the lake, city and Work room. Nearly square windows anchor the scenic crop to keep characters and object cues visible. Motion was restored, the viewport override was cleared, and the Home preview was left open. Its images loaded successfully and the final browser error log was empty.

| Area                                   | Evidence                                                                                                                                                                                                   |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Home, 1440 × 900 and 390 × 844         | All three stops, native chapter links, forward/reverse travel, complete characters at each stop, legible copy, object links exposed in the accessibility tree.                                             |
| Direct scene link                      | Incoming `/preview/diorama#city` reaches the city stop. Fixed an initial hidden-target issue.                                                                                                              |
| Intermediate travel                    | Background, subject and foreground travel independently. People leave before the next person appears. Transition passes through sky without a permanent horizontal scene band.                             |
| Pausing                                | Pausing during travel resolves to one complete scene; atmospheric animations pause. Preference persists through room navigation and reload. New project/paper/dialog content remains visible while paused. |
| Work, 1440 × 900, 390 × 844, 320 × 740 | Full room composition, HTML inside the monitor bezel, accessible remote/workflow/notebook cues. Manual next/previous project navigation; correct project details.                                          |
| Stories, same three sizes              | Four real articles, both paper batches, no document horizontal overflow, no paper content overflow. At 320px every rotated paper remains within the viewport.                                              |
| Archive                                | Eight articles, title search finds npkill, unmatched search shows a useful empty state, Code topic filtering returns its one matching article; dated links remain readable.                                |
| Dialog keyboard behavior               | Escape closes, focus returns to opener, modal content is readable on phone. Radix supplies modal focus containment.                                                                                        |
| Static reading path                    | Built HTML contains the full Home copy, Work detail disclosures and all story links in no-JavaScript fallbacks. This is an HTML contract check; JavaScript-disabled browser mode was not exercised.        |
| Reduced motion                         | CSS media rules and the shared provider honor the system preference. Manual pause exercises the same disabled-motion rendering path. A real system reduced-motion override was not exercised.              |

## Screenshot index

Final optimized local build:

- `home-desktop.jpg` — lake and primary navigation.
- `city-desktop.jpg` — dusk terrace with Stories and Work objects.
- `work-desktop.jpg` — monitor, laptop and room cues.
- `stories-desktop.jpg` — four real article papers.
- `work-phone.jpg` — dedicated portrait room at 390 × 844.
- `stories-phone.jpg` — four-paper layout at 390 × 844.
- `stories-narrow.jpg` — margin and long-title check at 320 × 740.

## Remaining evidence boundaries

No physical iOS/Android run, field performance measurements, full screen-reader audit, JavaScript-disabled browser run or native reduced-motion preference override. No deployed release. Character exercise/typing/writing animation cycles are not implemented; see `docs/diorama-v1.md` for the exact scope and edit map.

Run locally with `npm run dev -- --hostname 127.0.0.1 --port 3100`, or after a successful build with `npm start -- --hostname 127.0.0.1 --port 3100`. Open `/preview/diorama`, then use Work and Stories in the persistent navigation.
