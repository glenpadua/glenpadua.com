# Website art style

Style revision: `illustrated-world-v1` · 27 September 2026

This is the single art-direction reference for every visual asset in the redesigned website: scenes, rooms, article covers, characters, props, icons, textures, diagrams, social illustrations and animated or shader-rendered effects. Scene briefs and generation prompts link here and describe only their subject, composition and functional needs. [Website direction](website-direction.md) owns content and experience decisions; [architecture](website-architecture.md) owns implementation.

## The visual language

**The landing page is the visual authority: a spacious, simple 2D cartoon world with a tiny, playful Glen.** Broad colour shapes, sparse detail, gentle layered depth and faint paper grain define the style. Matching the palette alone is not a style match. Do not turn this into a detailed storybook painting, realistic portrait or furnished miniature set.

### Landing-page fidelity

- Use `docs/mock/assets/lake.png` directly as the primary image reference when generating covers or new scenes. Inspect the live landing page too. Use its character design as the identity source, not a description of a generic brown-haired man.
- Glen has an oversized rounded head, compact short body, small simple facial features, spiky brown hair and dark sunglasses. Preserve the reference's proportions and contour treatment. Do not add realistic muscles, stubble, body hair or skin detail. Childhood depictions use the same simple character language at the appropriate age, with natural legs or the historically correct calliper before amputation.
- Keep subjects small within a spacious setting. A character ordinarily occupies about a quarter to a third of the image height. Covers focus the group centrally to survive cropping; they do not enlarge him into a portrait.
- Describe places with a few broad silhouettes and quiet colour fields. Use only the objects needed to communicate the article. Avoid ornamental props, dense interiors, individually rendered foliage, intricate architecture, textile patterns, stone texture, woodgrain and detailed water reflections.
- The room images below can inform object placement and warm colour, but their greater detail must not override the landing-page style. A failed detailed cover is not a style reference for its replacement: start from the approved landing artwork.

| Element         | Treatment                                                                                                                                                                                                                                                 |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Shape and edges | Broad, readable silhouettes; rounded organic forms; gently irregular edges. Fine detail is subordinate to the silhouette. Characters and small props may have restrained dark contours.                                                                   |
| Surface         | Subtle paper grain and soft brushed colour within large shapes. Texture adds warmth without becoming photographic material detail or a heavy oil painting.                                                                                                |
| Depth           | Clear foreground, middle ground and background layers. Distance reduces contrast and saturation. Rooms use believable perspective and contact shadows; overhead compositions remain coherent.                                                             |
| Colour          | Muted forest and sage greens, cream paper, warm sand and wood, soft sky blues. Terracotta, amber and turquoise are selective accents. Evening introduces dusty blue and warm lamplight. Palette follows the place and time while retaining this family.   |
| Light           | Broad, soft illumination with simple, coherent shadows. Keep the scene's light direction and colour temperature across every inserted asset. Night can be atmospheric without neon bloom.                                                                 |
| Characters      | Compact, appealing proportions, expressive faces and consistent identity, as in the approved references. Preserve anatomy and proportions between poses. Glen's prosthesis is his anatomical left leg (viewer-right when front-facing); never mirror him. |
| Composition     | One clear focal idea with generous quiet areas. Keep readable words in HTML. A cover should work as both a wide article image and a small thumbnail; meaningful subjects survive portrait cropping.                                                       |
| Movement        | Restrained, purposeful and faithful to the illustrated shapes. Contact with equipment and ground remains believable. Still frames, paused motion and rendering fallbacks must look like the same artwork.                                                 |
| UI and diagrams | Simple, consistent line weight and readable silhouettes; colours and typography come from the shared website tokens. Charts retain legible labels and truthful scales. Essential controls stay real HTML.                                                 |

Avoid photorealism, glossy 3D toy rendering, pixel art, cinematic depth-of-field, intricate painterly realism and rubber-like procedural character motion. Broad simplified shapes and sparse detail apply to covers and interiors as well as outdoor scenes.

## Visual references

Inspect the actual files before generating or editing art. These approved images define the current revision; filenames under `docs/mock` are retained for provenance, not a competing style guide.

- [Lake](mock/assets/lake.png): outdoor shape language, gentle depth, palette and Glen's character design.
- [Approved poolside article cover](../public/assets/world/articles/do-you-have-an-ideal-dream-job-v1.webp): Glen approved this cover on 27 September 2026 as the reference for the remaining articles. It demonstrates the required sparse composition, small character, simple proportions and low detail. Use it with the lake reference for new covers.
- [Beach](mock/assets/beach-football.png): brighter daylight, water and physical character/object contact.
- [City](mock/assets/city.png): evening colour and the relationship between two characters.
- [Work](mock/assets/work-arsenal.png) and [portrait Work](mock/assets/work-portrait.png): room perspective and warm interior lighting.
- [Stories](mock/assets/writing.png): overhead composition, paper, wood and restrained personal objects.

The lake/landing-page illustration is the primary style and character reference. Other images supply scene-specific context only. Historical experiments and rejected detailed cover drafts do not supersede it.

## Article covers and source material

Every article has a cover slot separate from its original in-body media. Cover illustrations follow this guide. Select a subject grounded in the essay, with no baked-in title or UI. Supply dimensions, alt text (empty only for decorative art), focal position and provenance. Target a wide 2:1 composition, with a useful 3:2 portrait crop; keep important subjects inside both. Existing approved scene art can fill the slot while a bespoke cover is pending; record that reuse honestly.

All assets follow the same treatment policy, but documentary content remains documentary: original photographs, screenshots, scans, quoted illustrations and external logos keep their factual appearance, proportions and attribution. Frame and space them using the website's design language. Do not repaint a childhood photograph, medical image or credited illustration to make it look like fictional scenery. Illustrative adaptations are separate assets, never replacements for originals.

## Making and reviewing assets

1. Read this guide and inspect the relevant reference. Write a subject/composition brief; reference this file and its revision instead of maintaining a second style description.
2. Record source/reference paths, authorship or generator, prompt where applicable, date, dimensions, crop/focal position, credits/rights information and this style revision in the asset's provenance record. Preserve unknowns explicitly. Derived assets also identify their source.
3. Compare the candidate beside the approved reference at full size and its actual desktop, portrait and thumbnail sizes. Check silhouette, texture, palette, lighting, character identity and crops. Review inserted assets within the destination scene, not only in isolation.
4. Verify legible HTML text, image descriptions, loading/failure fallback and actual motion over time where applicable. Pause and reduced motion must preserve a complete composition.
5. Record what passed and what remains pending. Reuse of approved artwork is not approval of a new composition or newly generated image.

## Changing the style later

Change this document and its reference set first, increment the revision, then inventory all active asset records against it. Rework shared visual tokens and assets in a coordinated pass, preserving originals and marking each replacement reviewed. Check pages, scenes, covers, thumbnails, social images, animated layers and still fallbacks together. A guide edit does not automatically repaint existing bitmaps; the revision/provenance trail identifies what still needs work. Historical manifests retain the revision they actually used.
