This is the repository for the site at https://rosschamplin.com

## Run it

Node.js 22.12 or newer, npm.

```sh
npm install             # once
npm run dev             # http://localhost:4321
npm run build           # static site in dist/
npm run preview         # serve dist/ locally
npm run check           # type-check
npm run share-images    # rebuild favicon PNG/ICO and the social preview image
```

## Where things live

- `src/content/`: everything the site says (profile, links, projects, experience). See `src/content/README.md` for how to fill it in.
- `src/pages/`, `src/layouts/`, `src/components/`: pages, the shared shell, and building blocks.
- `src/styles/global.css`: design tokens and motion.
- `public/`: fonts, icons, the social image, and files such as the resume PDF and photo.

Pushing to `main` deploys to Vercel. Project rules and history: `AGENTS.md`, `DESIGN.md`, `PLAN.md`, `HANDOFF.md`.
