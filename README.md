# glenpadua.com

Personal website built with Next.js App Router, Prismic, and styled-components.

## Stack

- Next.js 16 (App Router)
- React 18
- Prismic (`@prismicio/client`, `@prismicio/next`, `@prismicio/react`)
- styled-components 6

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
