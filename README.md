# Ross Champlin — personal site

Static site built with Astro (TypeScript strict) and Tailwind CSS v4. Work in progress: the home page is a placeholder.

## Requirements

- Node.js 22.12 or newer (developed on Node 24)
- npm

## Run it

```sh
npm install      # once, after cloning
npm run dev      # dev server at http://localhost:4321
npm run build    # static build into dist/
npm run preview  # serve the built dist/ locally
npm run check    # type-check .astro and .ts files
```

## Where things go

- `src/pages` — routes
- `src/layouts` — page shell
- `src/components` — shared pieces
- `src/content` — site content: `profile.yaml`, `links.yaml`, `projects/*.md`, `experience/*.md`. Entries marked `placeholder: true` are stand-ins; replace them with real ones and set `placeholder: false`.
- `src/content.config.ts` — the schema each content file must match (`npm run build` fails on a mismatch)
- `src/styles/global.css` — the single Tailwind stylesheet
- `public/` — files served as-is

Agent rules, the plan, and the design system are in `AGENTS.md`, `PLAN.md`, and `DESIGN.md`.
