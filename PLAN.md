# Plan

One task per session, on its own branch. Read [AGENTS.md](AGENTS.md) for the stack, site map, and content rules. Read [DESIGN.md](DESIGN.md) before any UI task. Do not invent bio facts or projects; use `/content` or leave a placeholder that says it is a placeholder.

- [ ] 1. Scaffold Astro, Tailwind, `.gitignore`, scripts, and a one-screen README for how to run the site.
- [ ] 2. Content collections and a `site` config shape for profile, projects, experience, and links. Seed with placeholders that say they are placeholders.
- [ ] 3. Design tokens: color, type, spacing, and motion as CSS variables wired into Tailwind. Follow [DESIGN.md](DESIGN.md).
- [ ] 4. Layout primitives: page shell, header, footer, measure, section label, link and focus styles.
- [ ] 5. Home: identity and bio.
- [ ] 6. Home: selected work (three featured projects).
- [ ] 7. Projects index at `/projects` (ruled list, not a card grid).
- [ ] 8. Project detail template at `/projects/[slug]`.
- [ ] 9. Experience page at `/experience`, including a link to the resume PDF.
- [ ] 10. Contact page at `/contact` (links only; no form).
- [ ] 11. Responsive pass at phone and desktop widths, in the browser.
- [ ] 12. Accessibility pass: landmarks, headings, focus, contrast, keyboard, reduced motion.
- [ ] 13. Performance pass: font loading, image size, no unused JS.
- [ ] 14. GitHub Pages deploy via GitHub Actions.

Routes, for the tasks above:

- `/` Home: name, one-line role, short bio, three selected projects, a “now” line, contact links.
- `/projects` Index: title, one line, year, stack.
- `/projects/[slug]` Problem, what was built, role, stack, links, dates. Images only if provided.
- `/experience` Education, roles, resume PDF.
- `/contact` Email, GitHub, LinkedIn, and any other real links.
