# Monitor support repair — 2026-09-27

Style: [illustrated-world-v1](../../art-style.md). The twin side posts and round feet made the desktop monitor read as a television. Both paintings now imply one conventional central support, fully occluded by Glen's head. The monitor bezel, screen geometry, character and other desk objects retain their original pixels in the full-resolution assets.

## Assets and provenance

Built-in image generation (not CLI) repaired the support areas using each existing runtime painting as its edit target and style reference. Original assets are retained. Generated candidates are saved in docs/mock/assets/work-monitor-repair-desktop.png and work-monitor-repair-portrait.png. Only the repaired wall/desktop areas were composited into the originals, with feathered side and bottom edges; the complete generated rooms are not used at runtime.

Runtime outputs:
- public/assets/world/work-monitor-v2.webp — 1536×1024, lossless; replaces work.webp in WorkRoom.
- public/assets/world/work-monitor-v2-900.webp — 900×600, quality-88 derivative.
- public/assets/world/work-monitor-portrait-v2.webp — 800×1600, lossless; replaces work-portrait-v1.webp in WorkRoom.

Desktop repair rectangles (x, y, width, height): (461,528,177,72), (879,528,240,72). Portrait rectangles: (166,686,89,65), (548,686,91,65). Candidate portrait output was resized back to the original 800×1600 coordinate space before extracting these areas. Full-size pixel comparison: 28,792 desktop and 11,253 portrait pixels changed inside the repair regions; zero pixels changed outside them. Sources are existing project artwork; external artist/rights provenance remains as recorded for the originals, not newly asserted here.

## Prompts

Desktop:
> Use case: precise-object-edit. Edit the supplied 1536x1024 website room painting. Follow its existing style exactly (project art direction: docs/art-style.md, illustrated-world-v1). The main widescreen monitor incorrectly stands on TWO chunky short support posts with round feet, one at x560 y545 and one at x960 y545. Repair ONLY these two support areas. This is a normal desktop monitor supported by ONE conventional central stem behind the person's head; that central stem is fully occluded by the person's head, so there should be NO visible support at either side. Erase the two visible side support posts and their round feet, reconstructing the warm wall behind their upper portions and the wooden tabletop beneath. Preserve the monitor bezel and screen geometry EXACTLY, preserve the desk's back edge and its horizontal line, preserve every pixel of the person's silhouette, and keep ALL other objects, lighting, colours, composition, resolution and framing unchanged. No new side legs, no TV feet, no new objects. Output the same full 1536x1024 scene.

Portrait:
> Use case: precise-object-edit. Edit the supplied 800x1600 portrait website room painting, retaining its exact composition. Follow its existing style exactly (project art direction: docs/art-style.md, illustrated-world-v1). The large main monitor incorrectly has TWO visible chunky support posts with round feet: one at x205 y708, the other at x563 y708. Remove ONLY these two side supports and their feet. The monitor is supported by ONE normal central stem, fully hidden behind the person's head in this view; show no side legs. Reconstruct the wall and warm wooden desktop where each of the old two supports stood. Preserve the entire monitor bezel and its bottom edge EXACTLY, preserve the person's silhouette, head, hands, keyboard, desk edge, colours and all other objects. Do not reposition or rescale anything. Output the same full portrait scene and same aspect ratio. No side legs, no TV feet, no new objects.

## Verification

Reviewed enlarged joins and actual desktop/390×844 phone layouts. The twin supports are gone, the wall and wood join continuously, and the screen still aligns with the HTML monitor. Browser currentSrc confirmed both new full-size assets loaded. Static replacements do not depend on animation; no motion policy, keyboard controls, route, or fallback rendering logic changed. Pixel comparison confirms the typing-hand and cup areas are unchanged. Existing typing-mask, laptop projection and steam boundary tests passed. Physical phone and fresh full-cycle animation QA were not repeated for this static art edit.

Typecheck, lint and webpack production build passed; all 14 diorama/shoreline/laptop/typing/steam checks passed. Prior unrelated article errors no longer appeared in this build. Normal browser size restored.

Evidence: monitor-desktop-detail.png, monitor-portrait-detail.png, monitor-desktop-final.png, monitor-portrait-final.png in this folder. This repair is local, after the coordinating chat's completed-work commit bffd15b; it is not claimed deployed.
