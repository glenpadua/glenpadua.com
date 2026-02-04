# glenpadua.com

Personal website built with Next.js App Router, Prismic, Tailwind CSS, and shadcn UI primitives.

## Stack

- Next.js 16 (App Router)
- React 18
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

## Prismic Preview Routes

- `/api/preview`
- `/api/exit-preview`

## Notes

- Routing now uses the `app/` directory.
- Core routes are preserved: `/`, `/skills`, `/work`, `/blog`, `/blog/[uid]`.
- UI styling is class-based via Tailwind utilities and reusable `components/ui/*` primitives.
