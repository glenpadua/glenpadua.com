# Current creative direction

Updated 27 September 2026. This is the current design brief. [The manifesto](../MANIFESTO.md) gives the enduring purpose; this document resolves choices made since it was written. Earlier mock/storyboard notes remain history, not competing instructions.

## The experience

A personal world, strong work and a quiet invitation to collaborate. The homepage tells a scenic story about Glen; Work and Stories are separate immersive rooms. Senior engineering experience, initiative and problem solving should be evident in how the website works and in useful things visitors can try. Avoid a homepage full of project cards or explanations of each picture.

The [shared art style](art-style.md) is the single visual definition for every asset across scenes, pages and article covers. It owns the approved references, rendering treatment, character identity, asset review and future style changes. Runtime art and derived motion assets live in `public/assets/world/`.

## Characters and copy

Follow the [character and motion rules](art-style.md#the-visual-language) for Glen's identity, anatomy and complete poses. Scene-specific contact and choreography remain with each scene.

The voice is direct, cheeky and personal: “Skipping leg day since 2008.” Read the original posts, especially “Lottery of Birth”, “Bone to Be Wild”, “The Russian Connection” and “Do you have an ideal dream job?”, before writing copy. The draft is editable. Avoid generic portfolio slogans, narrated pictures, exaggerated business claims and explanations of the technology in visitor-facing UI.

## Typography

Glen selected **Lora for headings and the italic signature**, with **Nunito Sans for body text and navigation**, on 27 September 2026. Apply this pairing consistently across the scenic homepage, rooms and dialogs. Keep wording and line breaks editable, and check portrait wrapping after copy or layout changes.

The fonts are self-hosted under `public/assets/fonts/diorama/`, with source records and licenses alongside them. Shared declarations and font tokens live in `features/diorama/styles/typography.css`; scene styles should inherit those tokens rather than introduce competing font families.

## Places

| Place   | Story and interactions                                                                                                                                                                                                                                                                 |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Lake    | Calisthenics by mountains and a lake. Glen in exercise clothes, believable pull-ups, gentle living foliage/water. Instagram opens the known profile until a specific clip is selected.                                                                                                 |
| Beach   | Seated Glen working on a laptop under an umbrella, wearing the earlier yellow striped shirt, with his left prosthesis preserved. Occasional drink sips, animated sea and a laptop interaction leading to Work. Copy reflects remote work and travel. This replaces the football scene. |
| City    | Evening terrace, coffee with Millusha. She is simply present; no copy introducing her. Keep both faces in the same illustrated style. Notebook → Stories, satchel → Work, lantern/light discoveries.                                                                                   |
| Work    | Rear view of Glen at a bedroom desk, usable main monitor in front, laptop/Slack-inspired Remote.com profile at the side, a spinnable illustrated globe and Arsenal scarf. Projects on the monitor; details in dialogs. The desk light toggle is a successful interaction to build on.                         |
| Stories | Overhead writing table, glimpse of Glen writing, real article titles on scattered papers, lamp/coffee/archive. Shuffle and a scalable archive; articles retain normal readable URLs.                                                                                                   |

## Movement and discovery

The homepage follows one day: **dawn at the lake → midday at the beach → night in the city**. A single persistent sky changes with native scroll while the ground, characters and scene objects transition beneath it. Keep cloud positions continuous, let the sun rise and set, and bring in the moon and stars as daylight fades. The original landscape art blends into that shared sky; avoid three separate sky panels or long empty transition bands. Portrait has its own celestial placement so the copy stays readable.

The sun starts peeking over the lake's right-hand ridge and follows one east-to-west (right-to-left) arc. Morning scroll starts its ascent immediately and gently brightens the lake. Sunset and moonrise overlap: the sun lowers on the left as the moon climbs from the right, with faint stars gradually emerging. These movements reverse naturally when scrolling back.

Later character routines may follow that day (for example, alternating pull-ups and laptop work at the lake). Those routines are future work; the current change is the sky and its environmental motion.

The initial v1 felt too static. The target is visible character actions plus restrained environmental movement, not simply parallax applied to a flat picture. Native reversible scrolling connects scenes; eliminate long muddy gradient bands and forced pauses. A small down arrow is enough of a scroll prompt. Navigation should feel part of the scene without enclosing header/footer panels.

Use a **small floating orb** near interactive objects. One shared component sets appearance, target size, focus and label behavior. Labels appear on hover/focus instead of being permanently displayed. Real links/buttons and ordinary navigation remain available; discovery is a pleasure, not a prerequisite. Light switches, paper shuffling, screen changes and the beach laptop should offer deliberate little interactions.

Three.js experiments are welcome wherever they produce a better result. Preserve the illustrated aesthetic: the first lake shader was judged too realistic/fluid and was tuned towards the painting's texture and a gentler rhythm. Compare effects in motion, then retain only those that belong. Text/navigation never depend on a canvas. Honor pause/reduced motion, stop offscreen work, cap resolution, handle unavailable WebGL, and dispose resources.

## Longer-term direction

Articles use a quiet paper reading layout with a dedicated illustrated cover slot, preserving original writing and in-body photographs. Cover art follows [the shared art style](art-style.md#article-covers-and-source-material). Stories links to the updated article previews and shares each article's bespoke cover through one registry. Content still comes from Prismic; comments, likes, repo migration and bespoke interactive essays are separate later work. See [article ownership and workflow](articles.md).

AI conversation with a character, optional voice, useful niche tools and interactive essays can show capability through use. These remain future work unless implemented and verified explicitly. StayPal is an exploration, not a proven product claim. Work history, client outcomes and business results require evidence. Glen's role at Remote.com and 10+ years of experience can appear through scene objects and progressive disclosure.

Fast loading, meaningful SEO, responsive portrait composition, accessible navigation and maintainable code are part of the design. A static/reduced-motion version must still be complete and attractive.
