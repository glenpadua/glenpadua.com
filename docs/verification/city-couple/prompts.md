# City couple — prompt set and provenance

Mode: built-in image generation, transparent output. Style authority: [illustrated-world-v1](../../art-style.md). The first two entries below preserve the working prompt requirements as a concise reproduction specification; the final clean-plate prompt is recorded verbatim.

## Conversation sheet

Reference: a 290×380 crop at (1120, 540) from the approved `art-source/world/city-front-glasses-v1.webp`, inspected before generation. The crop shows the complete seated couple and establishes identity, clothing, lighting, perspective and proportions.

Generate a 3×2 sheet of six complete isolated seated couples on true transparent alpha. Match the reference identities, clothes, proportions and warm painted lighting. Keep hips, legs, feet and baseline fixed. Retain Glen's anatomical LEFT prosthetic leg, clear prescription glasses, green overshirt, light shirt and shorts; retain his wife's cream floral top, navy trousers and sunglasses on her head. No bench, ground, cast shadows, text or motion marks. Poses in reading order: both neutral looking outward; Glen glances toward his wife while she looks outward; mutual eye contact and a small smile; Glen speaks while she listens; she speaks while Glen listens; both share a gentle chuckle with eyes closed. Heads, necks and shoulders should move coherently, with subtle restrained expression changes.

Generated output: `exec-36116f7e-9c64-4109-a845-a3395350632e.png` (1536×1024), saved as `art-source/world/city-couple-conversation-v1.png`.

## Independent sips sheet

References: the approved couple crop and the generated conversation sheet, both inspected. Generate a 2×2 sheet of complete isolated seated couples on transparent alpha, with the same proportions, clothes, faces, light, seated hips and feet. Reading order: Glen raises his mug halfway; Glen touches the mug rim to his mouth; his wife raises her mug halfway; his wife touches the rim to her mouth. The non-drinking partner remains identical to the neutral pose. Exactly two arms and one mug per person; no duplicate cup remaining in a lap, extra hands, extra props, steam, ground or backdrop. Preserve the left prosthesis and glasses details. Move the drinker's head and shoulders naturally with the gesture.

Generated output: `exec-c8305f02-3ce2-4338-9b19-f79f684ca7e3.png` (1536×1024), saved as `art-source/world/city-couple-sips-v1.png`.

## Fixed empty terrace plate

Edit target: the full `art-source/world/city-front-glasses-v1.webp`, inspected before editing. A previous crop-based attempt invented a bench height; it was rejected and is not referenced by the application or preparation script.

Final prompt:

> Precise local edit of the supplied transparent terrace painting. Remove ONLY the seated man and woman and their two mugs COMPLETELY, leaving an empty seat, and seamlessly reconstruct the small parts of the existing bench, plants, railing and stone floor hidden by their silhouettes. Preserve the original 1536x1024 composition, dimensions, framing, all existing geometry, background transparency and every other object. This is an animation background clean plate, NOT a new scene or reimagining. Especially preserve the bench's exact original seat/back height, angle, perspective, colour and texture, the tan stone floor, the bag at right, table and books at left, lit lantern, existing rail and leaves. Do not invent a taller bench back or move anything. Above the terrace objects remains true alpha transparency so the underlying city can show through. Remove all traces of the couple including hair tips, shadows shaped like feet, black outlines, clothing, shoes, glasses and cups. No added props or text. All unaffected artwork must stay as close to pixel-identical as possible. Only formerly occluded pixels should be reconstructed.

Generated output: `exec-69d1200e-3240-4d90-a902-5695fb7f9dc4.png` (1536×1024), saved as `art-source/world/city-couple-empty-plate-v2.png`.

Original tool outputs are under `/Users/glen/.codex/generated_images/01a0ee96-2afd-7600-b241-dc7410829682/`; all consumed assets are copied into the repository. The preparation script performs only mechanical cleanup/registration/compositing/packing; it does not synthesize replacement poses or backgrounds.
