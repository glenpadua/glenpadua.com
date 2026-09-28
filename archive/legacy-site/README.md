# The previous website (archived)

This folder holds the website that was live at glenpadua.com until the
illustrated site replaced it on 28 September 2026: the Tailwind/shadcn pages
for Home, Work, Skills and the blog, their data and assets, and the early
`/preview/lakeside` and `/preview/coast` animation studies.

It is kept for reference only. Nothing here is built, linted, type-checked or
deployed: `tsconfig.json`, `eslint.config.mjs` and `.prettierignore` exclude
`archive/`.

Paths mirror where each file used to live (`archive/legacy-site/app/…` was
`app/…`, `archive/legacy-site/public/assets/…` was `public/assets/…`). The
old site also needed dependencies that were removed with it (Tailwind CSS,
Radix UI, Framer Motion, date-fns, disqus-react, react-ga and others). To run
it again, check out commit `670664a` (the last commit before the switch),
where the whole site, its `package.json` and lockfile are intact.

Old URLs still work: `/blog` redirects to `/writing`, `/skills` to `/work`,
`/story/<uid>` to `/blog/<uid>`, and every `/blog/<uid>` article kept its
address (see `next.config.mjs`).
