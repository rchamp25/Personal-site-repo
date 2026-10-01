# Plan

One task per session, on the current local branch. Do not commit or push; Ross commits. Read [AGENTS.md](AGENTS.md) for the stack, site map, and content rules. Read [DESIGN.md](DESIGN.md) before any UI task. Do not invent bio facts or projects; use `/content` or leave a placeholder that says it is a placeholder.

- [x] 1. Scaffold Astro (TypeScript strict, `base` `/`, leave `site` unset), Tailwind v4, `.gitignore`, npm scripts, and a one-screen README. Create empty `src/pages`, `src/layouts`, `src/components`, and `src/content`, plus a home page that says it is a placeholder. No content collections, tokens, or deploy config in this task.
- [x] 2. Content collections and a `site` config shape for profile, projects, experience (including life achievements), and links. Include an optional commentary field on projects and experience. Seed with placeholders that say they are placeholders. Display name in the placeholder profile is Ross Champlin.
- [x] 3. Design tokens: color, type, spacing, and motion as CSS variables wired into Tailwind v4 `@theme`. Self-host Instrument Serif, Newsreader, and IBM Plex Mono in `public/fonts`. Follow [DESIGN.md](DESIGN.md).
- [x] 4. Layout primitives: page shell, header, footer, measure, section label, link and focus styles.
- [x] 5. Home: identity and bio (name Ross Champlin, role, bio, short personal note).
- [x] 6. Home: selected work (three featured projects).
- [x] 7. Projects index at `/projects` (ruled list, not a card grid).
- [x] 8. Project detail template at `/projects/[slug]`, including the optional commentary field.
- [x] 9. Experience page at `/experience`: education, roles, other life achievements, commentary, and a link to the resume PDF.
- [x] 10. Contact page at `/contact` (links only; no form).
- [x] 11. Responsive pass at phone and desktop widths, in the browser.
- [x] 12. Accessibility pass: landmarks, headings, focus, contrast, keyboard, reduced motion.
- [ ] 13. Performance pass: font loading, image size, no unused JS.
- [ ] 14. Confirm the static Vercel setup stays as it is (`npm run build` outputs `dist`, no SSR adapter, no custom domain). Astro `site` is already `https://personal-site-pearl-tau-17.vercel.app`. Document that URL in the README. Do not create another Vercel project.

Routes, for the tasks above:

- `/` Home: Ross Champlin, one-line role, short bio, three selected projects, a short personal note, contact links.
- `/projects` Index: title, one line, year, stack. School and personal work.
- `/projects/[slug]` Problem, what was built, role, stack, links, dates, optional commentary. Images only if provided.
- `/experience` Education, roles, other life achievements, optional commentary, resume PDF.
- `/contact` Email, GitHub (`rchamp25`), and LinkedIn. Addresses stay placeholders until Ross supplies them.
