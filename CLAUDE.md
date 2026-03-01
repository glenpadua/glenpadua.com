# CLAUDE.md

This file provides guidance for AI assistants working in this repository.

## Project Overview

Personal portfolio and blog site for Glen Padua. Built with Next.js 16 App Router, TypeScript (strict), Tailwind CSS, and Prismic CMS for blog content.

## Development Commands

```bash
npm run dev           # Start dev server (localhost:3000)
npm run build         # Production build
npm start             # Run production server

npm run typecheck     # TypeScript type check
npm run lint          # ESLint (zero warnings enforced)
npm run lint:fix      # Auto-fix lint issues
npm run format        # Check Prettier formatting
npm run format:write  # Auto-format files

npm run check         # typecheck + lint + build (run before committing)
```

**Node.js requirement:** `>=20.9.0`

## Repository Structure

```
app/                        # Next.js App Router root
  _components/              # Route-local components for the home page
  components/               # Shared global components
    analytics/              # Google Analytics wrapper
    layout/                 # Header, footer, nav
    shared/                 # Reusable cross-route components
    ui/                     # shadcn UI primitives (Button, Badge, etc.)
  blog/
    [uid]/                  # Dynamic blog post route
    _components/            # Blog-specific components
  skills/                   # Skills page
  work/                     # Portfolio/work page
  api/
    preview/                # Prismic preview endpoint
    exit-preview/           # Prismic preview exit endpoint
  layout.tsx                # Root layout
  page.tsx                  # Home page
  globals.css               # Font imports + Tailwind directives
  not-found.tsx             # 404 page
customtypes/                # Prismic content type definitions (post, blog_home, category, snippet)
data/                       # Static data as TypeScript constants
  about-cards.ts
  blog-categories.ts
  icon-maps.ts
  navigation.ts
  portfolio-items.ts
  skill-cards.ts
  timeline-items.ts
lib/                        # Utility functions
  analytics.ts              # Google Analytics helper
  cn.ts                     # clsx + tailwind-merge utility
  prismic.ts                # Prismic client setup
  random.ts
types/                      # TypeScript type definitions
  content.ts                # Content interfaces
  global.d.ts
public/assets/              # Static assets (SVGs, images, logos)
```

## Key Conventions

### File Organization
- **Route-local components** go in `app/<route>/_components/` (prefixed with `_` to prevent Next.js from treating them as routes)
- **Shared components** go in `app/components/` organized by category (`ui/`, `layout/`, `analytics/`, `shared/`)
- **Static data** lives in `data/*.ts` as exported TypeScript constants — no JSON files
- **Type definitions** go in `types/content.ts`

### Components
- Use TypeScript with strict typing; define props interfaces above each component
- App Router server components by default; add `'use client'` only when necessary (event handlers, browser APIs, hooks)
- Export components as named exports
- Use the `cn()` utility from `lib/cn.ts` for merging Tailwind classes

### Styling
- **Utility-first Tailwind CSS** — no CSS modules, no styled-components
- Use `cn()` (`clsx` + `tailwind-merge`) for conditional/merged class names
- Use **class-variance-authority (CVA)** for components with multiple variants (see `app/components/ui/`)
- Custom Tailwind theme is defined in `tailwind.config.mjs`:
  - Primary blue: `#1d5fd8`
  - Font: Ubuntu (sans-serif)
  - Custom border radius and card shadow values
- Mobile-first responsive design with Tailwind breakpoints

### TypeScript
- Strict mode is enabled — avoid `any`, use proper type annotations
- Import path alias `@/*` maps to the project root
- Generic React types via `React.HTMLAttributes`, `React.forwardRef`, etc.

### Content: Static vs. CMS
- **Static content** (skills, portfolio items, navigation, timeline) is stored in `data/*.ts` and updated by editing those files directly
- **Blog content** is managed in **Prismic CMS** — blog posts use `type: 'post'` and are fetched via `lib/prismic.ts`
- Blog routes: `/blog` (listing) and `/blog/[uid]` (individual post with Disqus comments)

### Icons
- `react-icons/si` for social/tech brand icons
- `lucide-react` for general UI icons
- Icon keys are mapped to components in `data/icon-maps.ts`

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS 3 |
| UI Primitives | shadcn (Radix UI) |
| Animations | Framer Motion |
| CMS | Prismic |
| Analytics | react-ga (Google Analytics) |
| Comments | disqus-react |
| Dates | date-fns |
| Linting | ESLint + Prettier |

## Environment Variables

Prismic requires environment variables to be set. Check `.env.local` (not committed). Required variables are used in `lib/prismic.ts` and `sm.json`.

## ESLint Notes

- `@next/next/no-img-element` is disabled — `<img>` tags are used intentionally
- All other Next.js core web vitals rules are enforced
- Zero warnings policy: `npm run lint` must exit cleanly before committing
