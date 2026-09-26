# Lakeside scene experiment

26 September 2026. Preview route: `/preview/lakeside`.

This is the first working scene described in [the manifesto](../MANIFESTO.md). It is deliberately isolated from the current homepage and marked `noindex`. Existing work and writing links lead to the existing site; the invitation to say hello uses Glen's existing LinkedIn URL.

## What is implemented

The scene combines a painted lakeside background, a separate transparent foreground, water highlights, birds, drifting pollen, gentle pointer parallax, semantic HTML content, and an animated pixel-art character. The foreground and character move at different depths from the background. The landscape itself is one painted surface; the distant hills are not independently modeled geometry.

The character wears the reference's sunglasses, yellow striped shirt, shorts, and tan shoes. His anatomical left leg remains the prosthetic leg, on the viewer's right, in every selected pose. Sprites are never mirrored.

The final animation uses complete raster poses from a sprite atlas. Four usable poses were selected from six generated candidates: hang, pull, upper pull, and top hold. Each is registered to the same two hand positions using a uniform scale and translation. Both ascent and descent use the same artwork, with a longer descent and a rest at the bottom. No independent arm stretching or procedural limb rotation is used.

The body renders behind the bar. Small clipped copies of the current sprite render the gripping fingers in front of the bar. This preserves contact and the correct depth order throughout the cycle.

The initial experiment with a fixed torso and separately drawn arms was rejected after visual review and Glen's feedback. Those components and unused runtime assets have been removed. A second generated set of in-betweens changed the character proportions too much and was not adopted.

## Controls and rendering

- The pause control freezes the sprite and environmental animation. Keyboard activation works with Enter.
- The scene honors `prefers-reduced-motion` through both the component state and CSS. It starts still before hydration.
- Sprite timers and animated decoration stop when the scene is offscreen or the document is hidden. Mouse parallax is disabled when motion is disabled and does not depend on touch gestures.
- The introduction, links, and field note are rendered as HTML. They do not require canvas or WebGL. The still hang pose renders on the server.
- The narrow layout changes type scale and character placement. The scene can grow beyond the viewport so small phones do not have to compress the content.
- The three runtime WebP assets total about 770 KiB. The sprite atlas is lossless. There is no new animation engine dependency and no continuous JavaScript render loop for sprite playback.

## Verification and limits

The scene was inspected in the Codex in-app browser at desktop width, 390 × 844, and 320 × 740 CSS pixels. The narrow view has no horizontal overflow and the introduction ends above the character. The left prosthesis, complete hang/top poses, and front-bar/foreground-hand compositing were visually inspected. Pause/resume was exercised with keyboard input.

`npm run check` passes: TypeScript, ESLint, and the production build. Prettier passes for the scene files. An initial Turbopack build cached a sandbox port-binding failure; moving that disposable cache aside and running the build with the required process permissions resolved it. The webpack production build also passed during diagnosis.

This is a deliberately stepped, four-pose pixel animation. It establishes composition, scene integration, character identity, contact registration, and occlusion. It does not establish a finished high-frame-count animation pipeline. A future polish pass should add carefully drawn in-between frames from the same character model, with fixed proportions and grip landmarks. Repeated independent image generation is not a reliable substitute for that animation cleanup.

Physical phone performance, field Core Web Vitals, and a full screen-reader/accessibility audit remain future acceptance work. Reduced-motion handling is implemented; the system preference was not changed during this browser session. The existing root layout's global font and analytics configuration is inherited and has not been redesigned in this experiment.

## Artwork provenance

All adopted artwork was generated with the built-in image generation tool, using [Glen's supplied reference](references/lakeside-pullup-reference.png). The original reference remains unchanged. Generated PNGs were encoded to WebP for the runtime assets. Atlas selection and grip registration happen in the component; the character art is not geometrically deformed.

The prompts used for the adopted assets are preserved below. The rejected fixed-body puppet and additional in-between sheet are not runtime dependencies.

### Landscape — `public/assets/diorama/landscape.webp`

> Create a beautiful production background illustration for a personal portfolio website, using the attached as the exact art direction. Landscape wide 3:2. Soft painterly storybook gouache, restrained sage greens, creamy pale morning sky, delicate paper texture, layered hills, evergreen forests descending to a still pale lake. Carefully art-directed, sophisticated and peaceful. Preserve the reference composition: upper 55 percent is almost empty warm ivory sky, distant hills around 58 percent, lake across center lower, a gently rolling grassy meadow fills bottom 22 percent. Left side a few delicate evergreen silhouettes, right side richer forest edge. Subtle warm early sunlight, fine atmospheric haze. REMOVE the person and exercise equipment completely, remove the birds too; no people, no structures, no text, no typography, no UI. The right foreground must be empty grassy ground suitable for separately placing an exercise character. Entire image must be continuous finished artwork, not separate panels. Keep the reference's spaciousness and quiet muted tones; beautiful detailed brush texture in foreground, simple airy sky.

### Foreground — `public/assets/diorama/foreground.webp`

> Create a single transparent foreground overlay for a scenic website, wide landscape canvas 3:2. Match the attached soft sage green gouache storybook landscape exactly in palette and painterly paper-grain texture. ONLY render a very low band of delicate meadow grasses along the bottom edge, with slightly taller fernlike grass blades and a few small pale cream wildflowers at bottom left and bottom right. All vegetation confined to the lowest 15 percent of the canvas, corners may rise to 23 percent. Center band extremely low, 5 percent height. Top 77 percent must be fully TRANSPARENT, and all gaps between grass blades genuinely transparent. Muted deep olive sage nearest the viewer, subtle warm pale green edges, refined and organic. No ground rectangle, no scenery, no sky, no horizon, no people, no text. This will sit over a separate landscape to provide independently moving foreground depth.

### Character atlas — `public/assets/diorama/pullup-atlas.webp`

> PRODUCTION PIXEL ART SPRITESHEET. Create SIX sequential keyframes of a believable strict PULL-UP by the same character from the reference, on a transparent background. Layout EXACTLY 3 equal columns x 2 equal rows, every cell identical square dimensions, overall canvas landscape 3:2, no margins between cells, no grid lines, no labels. Each cell contains ONE complete character, no bar or posts; the fists grip the same imaginary fixed horizontal bar in every frame. Hands must remain at EXACTLY the same cell coordinates: left fist at 30 percent cell width, right fist at 70 percent cell width, both at 34 percent cell height. They never move between frames. Head, shoulders, elbows, torso, legs move naturally around those fixed hands. SIX ascending poses in reading order: 1 full dead hang with straight arms overhead, head below hands, shoulders elevated, legs hanging; 2 early pull with elbows beginning to flex; 3 mid pull with elbows bending down towards ribs; 4 upper pull; 5 chin just clearing hands/bar; 6 top hold chin clearly above hands/bar. Compact plausible human anatomy with moderately chibi proportions; head about one quarter of total standing height, not an enormous bobble head. Upper arms and forearms anatomically short and proportional, upper arms rotate with shoulders, sleeves follow shoulder rotation, elbow joints natural, no long triangular outstretched elbows. Real pull-up biomechanics, controlled body, legs hanging still with slight knee softness, no jumping, no lifting shoulders with arms glued down. SAME identical character in ALL six cells: tousled dark brown hair, black sunglasses, warm tan skin, mustard yellow and ivory vertical striped short-sleeve button shirt, charcoal shorts, tan sneakers. CRITICAL IDENTITY: anatomical LEFT LEG, on viewer's RIGHT in every cell, is a prosthesis with charcoal socket and simple narrow metallic grey pylon above tan shoe; anatomical RIGHT leg viewer LEFT is natural tan skin. Preserve prosthesis in all six frames; never mirror; keep same face clothes proportions colors and pixel density. Crisp professionally drawn pixel art, hand-animated game sprite quality with detailed outlines and controlled shading. No background, no floor, no shadows, no equipment, no extra sprites. Ensure every head and shoe remains inside its own cell. Uniform cell coordinates and character scale across all six frames.

The generated atlas did not exactly follow the requested wrist positions or pose spacing. The component's measured grip landmarks and selection of four frames correct those differences; the prompt alone is not evidence of alignment.
