# Diorama v1 artwork

26 September 2026. These assets belong to the preview routes only. All original paintings in `docs/mock/assets` are unchanged. The built-in image tool produced the edits and transparent cutouts below; Sharp only resized and encoded their outputs as WebP.

## Source and output map

Generated originals are retained in `/Users/glen/.codex/generated_images/01a0df7a-c5ab-7c32-a9ce-6c1d06419986/`. The filenames below identify accepted generations. Runtime assets live in `public/assets/world/`; they are self-contained and do not depend on that local generation folder.

| Runtime asset                                               | Approved reference                              | Accepted generation filename                    |
| ----------------------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- |
| `lake-back.webp`                                            | `lake.png`                                      | `exec-65d19e5b-92be-42e2-80e8-49b55dab68ee.png` |
| `lake-character.webp`                                       | `lake.png`                                      | `exec-37894067-f0b6-4ee1-86da-5f5f3ad1e57f.png` |
| `beach-back.webp`                                           | `beach-football.png`                            | `exec-6490b8fa-32c1-4a5e-9afc-805994908f97.png` |
| `beach-character.webp`                                      | `beach-football.png`                            | `exec-f6926607-e091-43d2-925c-b9fc74bc8f6d.png` |
| `city-back.webp`                                            | `city.png`                                      | `exec-b3904ecd-6c9e-4a98-8eca-5c9e64414a0f.png` |
| `city-front.webp`                                           | `city.png`                                      | `exec-e3781a9f-94fe-4e3c-b3a5-06f25f263f4f.png` |
| `grass.webp`                                                | `lake.png`, `beach-football.png`                | `exec-a4b2eaa7-4cd1-4025-8a77-b47e80afa5c5.png` |
| `work-portrait-v1.webp`                                     | `work-portrait.png`, then portrait intermediate | `exec-1cf75141-f6f8-4c68-9cee-d3f1b8fa31a3.png` |
| `writing-portrait-v1.webp`                                  | `writing.png`                                   | `exec-6873e618-62b0-4c75-8704-510fd9bf5b2d.png` |
| `work.webp`                                                 | `work-arsenal.png`                              | Original approved painting, encoding only       |
| `writing.webp`                                              | `writing.png`                                   | Original approved painting, encoding only       |
| `lake-static.webp`, `beach-static.webp`, `city-static.webp` | Corresponding approved full scenes              | Original approved paintings, encoding only      |

The first Work portrait edit, `exec-0a9c6718-9275-470a-847a-7319ac0f32f7.png`, is an intermediate reference and is not shipped. Its monitor remained too small; the accepted second edit enlarges the illustrated monitor itself. Rejected detailed landscape generations are not used.

## Production edit specifications

These are the reusable briefs for the accepted assets, condensed from the generation instructions. For the original paintings' prompts, see `docs/mock/asset-prompts.json` and `docs/mock/revision-prompts.json`.

Every edit preserves the approved simple illustrated game style: restrained soft texture, clear shapes, original palette, coherent character anatomy, and no photorealistic detail. Glen's prosthesis is on his anatomical **left** leg, viewer-right when front-facing. Never mirror the character. Do not create or articulate individual limbs procedurally.

- **Lake clean plate:** Remove Glen, the entire exercise bar and its shadow, birds and nearest dark grass. Reconstruct the landscape behind them. Preserve the original sky, hills, lake, meadow, viewpoint and composition.
- **Lake foreground:** Extract the complete Glen-and-pull-up-apparatus pose and its ground shadow onto transparency. Keep the sage top, dark shorts, left prosthesis, both hands and all apparatus parts together. No scenery. This is a stable held pose. The runtime adds a short front bar segment over the face, with fingers remaining in front of the bar.
- **Beach clean plate:** Remove Glen, football, shadow, boat, birds and nearest foreground grass. Preserve the beach, sea, distant shore, sky, perspective and simple style; reconstruct the removed areas.
- **Beach character:** Extract the whole shirtless Glen pose, dark shorts, left prosthesis resting on the football, and ground shadow. Transparent background. Keep body and ball together, with no mirrored anatomy or detached limbs.
- **City clean plate:** Remove the entire near terrace, couple, bench, furniture, railings, props and near plants. Fill that space with distant city scenery. Preserve the original dusk sky, palette and city style.
- **City foreground:** Extract the complete terrace, seated couple, bench, coffee, table, notebook, satchel, lantern, railings and near plants onto transparency. Keep their relative positions on the original 1536 × 1024 canvas. Preserve the simplified faces and left prosthesis.
- **Grass:** A transparent 1536 × 1024 overlay with only the bottom quarter occupied by simple sage grass. Higher at the outer edges and low in the middle. Match both the lake and beach; no sky, terrain, people or new objects.
- **Work portrait:** Recompose the approved room at 1:2. Rear view of Glen, Arsenal scarf above, lamp upper-left, laptop/tablet on either side, and one large monitor. Final targeted edit: enlarge the actual monitor from approximately x=6–94%, y=17–43%, preserving Glen and the room below. Keep its screen blank for HTML content. Do not add a second monitor or a floating card.
- **Writing portrait:** Recompose at 1:2, overhead viewpoint. Lamp upper-left, coffee upper-right, archive at the edge, clear tabletop through roughly y=18–70%. Keep Glen's crown, hands and notebook in the bottom quarter. No painted article text or new UI.

## Delivery and loading

Full plates are 1536 pixels wide, with 900-pixel variants for responsive use. Character cutouts are 600 pixels wide. Portrait rooms are 800 pixels wide. WebP uses quality 86 and alpha quality 100; 900-pixel variants use quality 83. Transparency is preserved. See `diorama-v1-assets.json` for dimensions, byte sizes, SHA-256 hashes and source identifiers.

The initial lake plus nearby beach layers total about 291 KiB using full-size plates; smaller responsive plates reduce that. City layers load as the visitor approaches them. The Work plate is about 126 KiB on desktop / 134 KiB in portrait; the Stories plate is about 242 KiB / 191 KiB, plus article thumbnails. These are file sizes, not measured network timings or a Core Web Vitals claim.

Characters remain held poses in this v1. A later exercise, typing or writing animation needs registered, visually verified full-pose frames, including apparatus/prop contact and correct prosthetic mechanics. Current atmospheric motion is not a character animation cycle.
