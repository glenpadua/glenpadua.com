# glenpadua.com

Personal website built with Next.js App Router, TypeScript, Prismic, Tailwind CSS, and shadcn UI primitives.

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

- Routing uses the `app/` directory with route-local components in `app/<route>/_components`.
- Core routes are preserved: `/`, `/skills`, `/work`, `/blog`, `/blog/[uid]`.
- UI styling is class-based via Tailwind utilities and reusable `app/components/ui/*` primitives.
