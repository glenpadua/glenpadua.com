# glenpadua.com

Personal website built with Next.js App Router, TypeScript, Prismic, Tailwind CSS, and shadcn UI primitives.

## The illustrated website

The current development preview is `/preview/diorama`, with immersive Work and Stories rooms at `/preview/diorama/work` and `/preview/diorama/stories`. The existing public website is preserved. The implementation lives in `features/diorama/`; preview routes only mount it.

- [Manifesto](MANIFESTO.md): why this website exists and the standard it should meet.
- [Current creative direction](docs/website-direction.md): approved scenes, character details, voice, motion and interactions.
- [Architecture and edit guide](docs/website-architecture.md): where to change things, parallel scene ownership, and eventual public-site promotion.
- [AGENTS.md](AGENTS.md): concise instructions for coding agents.

Start the application with `rtk proxy npm run dev -- --hostname 127.0.0.1 --port 3100`, then open [the local preview](http://127.0.0.1:3100/preview/diorama). Check whether that port already has a server before starting another. A running production server needs a coordinated rebuild/restart to show source changes.

The [static mock](docs/mock/README.md) and [storyboard](docs/storyboard/README.md) preserve design studies. `/preview/lakeside` and `/preview/coast` are earlier animation experiments. Use the current direction and architecture guide for new implementation work. Historical [v1](docs/diorama-v1.md) and [motion v2](docs/diorama-motion-v2.md) reports record earlier verification, not current release guarantees.

## Stack

- Next.js 16 (App Router)
- React 18 + TypeScript (strict mode)
- Prismic (`@prismicio/client`, `@prismicio/next`, `@prismicio/react`)
- Tailwind CSS 3
- shadcn UI primitives (Radix + utility components)

## Requirements

- Node.js `>=20.9.0`
- npm

## Scripts

- `npm run dev` - start local dev server
- `npm run build` - create production build
- `npm run start` - run production server
- `npm run typecheck` - run TypeScript checks
- `npm run lint` - run ESLint
- `npm run format` - check Prettier formatting
- `npm run check` - typecheck + lint + build

## Prismic Preview Routes

- `/api/preview`
- `/api/exit-preview`

## Notes

- Routes live in `app/`. The illustrated experience is feature-owned under `features/diorama`; legacy pages retain route-local components.
- Core routes are preserved: `/`, `/skills`, `/work`, `/blog`, `/blog/[uid]`.
- The public site uses Tailwind and `app/components/ui/*`; the illustrated experience uses scoped CSS, shared orbs/dialogs, and scene-owned effects.
