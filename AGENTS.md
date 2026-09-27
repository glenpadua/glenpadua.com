# Working on Glen’s website

Read `/Users/glen/.codex/RTK.md` for this host's shell conventions. Prefix shell commands with `rtk` (`rtk proxy` preserves raw output).

## Start with the right source

- For any website design, copy, scene or interaction work, read [MANIFESTO.md](MANIFESTO.md) and [current direction](docs/website-direction.md).
- For creating, selecting, editing or animating any visual asset (including article covers), read [the shared art style](docs/art-style.md) and inspect its approved references. Link to that definition rather than writing a separate style brief.
- For implementation, file ownership, adding a scene, or replacing the old website, read [the architecture and edit guide](docs/website-architecture.md).
- For scene artwork, inspect the actual approved images and the scene's `content.ts`; [the mock](docs/mock/README.md) and [storyboard](docs/storyboard/README.md) are design history. Current direction supersedes their older experiments.
- When changing Next.js routing or rendering, read the relevant installed guide under `node_modules/next/dist/docs/`; this installed version may differ from remembered APIs.

## Boundaries

- The new experience lives in `features/diorama/`, mounted at `/preview/diorama`. Keep `app/` entries thin. Features must not import preview route internals.
- Own scene-specific copy, effects, composition and styles under `features/diorama/scenes/<scene>/`. Shared controls, motion policy, art fallback and dialogs live in `shared/`; use `InteractionOrb` for object discovery.
- Shared styles use the `.world`/`.world-dialog` boundary; scene styles must affect only their scene. Keep painting-space geometry and asset choices with the scene. Keep readable text and interactive elements in HTML.
- Homepage sky is shared across chapters. Set each scene's `skyTime` in its content; coordinate changes to `shared/journey-sky.*` and `lib/sky-time.ts`. Painted horizon masks stay scene-owned.
- Consult `docs/website-architecture.md` before extracting a shared renderer. Three.js is allowed as a measured enhancement; its fallback, pause, lifecycle cleanup and style match are part of the feature.
- The public `/`, `/work`, `/skills`, `/blog` and `/blog/[uid]` remain intact until promotion is requested. Preview metadata stays `noindex`.

## Concurrent work

Inspect the working tree before editing. Existing uncommitted work belongs to the user or another thread; preserve it. Scene threads edit only their assigned scene, uniquely named assets, tests and verification notes. Coordinate shared module, dependency and route changes with the coordinating thread. One production build at a time: `.next` is shared. Do not restart a server owned by another thread without coordinating.

## Completion evidence

Run `npm run typecheck`, `npm run lint`, and a coordinated `npm run build` for application changes. After building, run `node --test scripts/diorama-contracts.test.mjs scripts/lake-shoreline.test.mjs` (Node 24+ for these TypeScript-importing tests). Add focused checks when behavior or a boundary changes; avoid tests that only restate markup.

For scene changes, review desktop and portrait layouts, actual animation over time, pause/reduced motion, inactive scenes, keyboard controls and navigation. Verify fallback when changing rendering. Record what was observed and any unfinished animation in scene verification notes. A still screenshot is not animation verification; emulation is not a physical phone test. Format changed files only. Update the relevant guide when an ownership boundary or workflow changes.
