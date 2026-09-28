# Approved painting sources

The full-quality files for the site's larger paintings. The site serves web
copies from `public/assets/world/` under the same names, encoded by
`scripts/encode-art.mjs` (lossy WebP at a visually lossless setting, lossless
alpha). Edit or replace artwork here, then run:

```sh
node scripts/encode-art.mjs
```

New paintings over about 150 KB can be adopted from `public/assets/world/` with
`node scripts/encode-art.mjs --adopt`. Scripts that measure geometry from the
paintings (the Work screen mask, lake shoreline, writing hand) read the served
copies, because that is what visitors see.

Provenance and the style guide are unchanged: see
[the shared art style](../docs/art-style.md).
