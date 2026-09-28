# glenpadua.com

Glen Padua's website: an illustrated day. A lake at dawn, a beach at noon and a
city at night on the homepage, with a Work desk and a Writing desk as rooms, and
the articles in a quiet reader. Built with the Next.js App Router, TypeScript and
scoped CSS; articles come from Prismic.

| Page          | What it is                                                  |
| ------------- | ----------------------------------------------------------- |
| `/`           | The day, scroll by scroll, ending in the night sky          |
| `/work`       | Glen's desk: a small working desktop, Slack, a globe        |
| `/writing`    | The writing desk: papers to shuffle and an archive of cards |
| `/blog/<uid>` | Each article, at the same address it has always had         |

## Where things are

- `features/diorama/`: the whole site (scenes, rooms, articles, shared shell). `app/` only mounts it.
- `art-source/world/`: approved full-quality paintings; `public/assets/world/` serves encoded copies.
- `archive/legacy-site/`: the previous website, for reference only (not built).

Read these before changing things:

- [Manifesto](MANIFESTO.md): why the site exists and the standard it should meet.
- [Current creative direction](docs/website-direction.md): scenes, characters, voice, motion and interactions.
- [Architecture and edit guide](docs/website-architecture.md): routes, ownership, where to change what, performance.
- [Shared art style](docs/art-style.md): for any new or changed artwork.
- [AGENTS.md](AGENTS.md): concise instructions for coding agents.

## Develop

Node.js 20.9+ runs the app; the focused tests need Node.js 24+.

```sh
npm install
npm run dev -- --hostname 127.0.0.1 --port 3100
```

## Scripts

- `npm run dev`: local dev server
- `npm run build` / `npm run start`: production build and server
- `npm run typecheck`, `npm run lint`, `npm run format`
- `npm run check`: typecheck, lint and build
- `npm run test:diorama`: every focused test (run after a build; several read the built HTML)
- `node scripts/encode-art.mjs`: re-encode paintings after editing `art-source/`
- `node scripts/article-og-images.mjs`: regenerate article link-preview cards

## Content

Articles live in Prismic (repository in `sm.json`). New posts appear on the
Writing desk within an hour; `/api/preview` and `/api/exit-preview` support
Prismic's draft previews. Featured-paper notes and the order of the desk are in
`features/diorama/rooms/writing/content.ts`; Work desk files in
`features/diorama/rooms/work/content.ts`.
