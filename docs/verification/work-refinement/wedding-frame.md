# Wedding frame — 2026-09-27

The Work room wedding picture links to https://fenimeetsfiltercoffee.vercel.app/ via the shared InteractionOrb. The entire frame is a keyboard-accessible link, with a label identifying Glen's work and a new-tab announcement. No-JavaScript content also includes the destination. Failed image loading falls back to a G & M monogram.

## Artwork and lighting

Built-in image generation was used, with the supplied wedding photograph as identity/composition reference and docs/mock/assets/work-arsenal.png as the approved style reference. The second pass simplifies the faces, shapes and texture to match the scene. Source: docs/mock/assets/work-wedding-portrait-v2.png. Runtime: public/assets/world/work-wedding-portrait-v2.webp (512 square). The original generated version is retained separately.

The final treatment removes the wooden border and inset rim: the picture is a borderless print with a small top pin and soft contact shadow, matching the neighbouring wall art. The scene applies brightness 0.78, saturation 0.68, contrast 0.88 and sepia 0.12 to the print so it receives subdued warm ambient light. The existing room-light layer covers the frame when the desk lamp is switched off.

Final generation prompt:

> Use case: style-transfer. EDIT input 1 (wedding illustration) to match the visual style of input 2 (approved website room artwork) much more closely. Input 2 is the authoritative style reference. Keep the couple's identity, kissing pose, bride left, groom right with glasses, white dress and flowing veil, black suit, white Goan church with cross, and square full-bleed composition. Change only rendering style and palette: simplified rounded animated-film character faces with very restrained facial detail; clear soft dark contours like the room character; broad softly painted shapes; muted warm cream and ochre whites, dusty blue sky, warm brown shadows, gentle brush texture matching the wall pictures and room character. Reduce photographic anatomy, hair strands, fabric detail, contrast and saturated blue. The first version is too realistic and bright; the result must look like a little hand-painted picture created by the exact same artist as input 2, belonging inside that cozy illustrated world. Couple must remain readable at 60 pixels. Do not add a frame, text, typography or watermark. Do not reproduce room furniture. Output one square illustration.

## Verification

- Reviewed the actual updated image in the desktop room and at 390×844 and 768×1024 browser viewport sizes. The final responsive pass removes the separate tall-tablet relocation. The frame retains its painted vertical anchor and continuously clamps horizontally to the visible wall, shrinking only when necessary to avoid the monitor. The phone painting keeps its original frame position beneath the shelf.
- Phone link measured 46.47×45.41 CSS pixels; final tall-tablet link 74.09 by 66.45 CSS pixels. Desktop uses the painted frame position. The independent All projects button and index dialog were removed by the requested subagent; the monitor carousel remains the entry point.
- Keyboard focus reaches the wedding link with its descriptive label. Link uses target=_blank and noopener noreferrer. Destination was loaded and its wedding archive title verified.
- Live transform samples changed over time (scale approximately 1.036 to 1.063). After Pause, two samples retained the exact same transform. The slow 14-second drift is a gentle pan/zoom of the illustration, not character or veil deformation. CSS disables this animation under prefers-reduced-motion; that media preference was reviewed in source, not force-emulated.
- Typecheck and lint passed. Production webpack build passed. All 12 diorama, shoreline, laptop projection and typing-mask checks passed. Final lighting CSS was rebuilt successfully.
- Screenshots: wedding-portrait-final.png, wedding-tablet-final.png, wedding-desktop-final.png.
- Browser size emulation is not physical-phone or full screen-reader validation. Image-error fallback and reduced-motion were reviewed in source; no network fault injection was performed.

