# Plan

One task per session, on the current local branch. Do not commit or push; Ross commits. Read [AGENTS.md](AGENTS.md) for the stack, site map, and content rules. Read [DESIGN.md](DESIGN.md) before any UI task. Do not invent bio facts or projects; use `src/content` or leave a placeholder that says it is a placeholder. Work beyond these tasks comes from Ross directly; it is listed under "Beyond the plan" below and tracked in [HANDOFF.md](HANDOFF.md).

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
- [ ] 13. Performance pass: font loading (subset and preload; Newsreader is 215 KB, Plex Mono 83 KB), an image pipeline for Ross's photo and project screenshots, and no unused JS. Keep the scripts that are in use: `ClientRouter`, the motion script, the graphite dust, and the analytics loader. Deferred on 2026-10-01. Do not start this unless Ross asks.
- [x] 14. Confirm the static Vercel setup stays as it is (`npm run build` outputs `dist`, no SSR adapter). The custom domain `https://rosschamplin.com` is live on Vercel and Astro `site` is set to it. The README names that URL. Do not create another Vercel project. Confirmed 2026-10-01.

Routes, for the tasks above:

- `/` Home: Ross Champlin, one-line role, short bio, a short personal note, Ross's headshot, and up to four featured projects.
- `/projects` Index: every project's full breakdown, school and personal work.
- `/projects/[slug]` Problem, what was built, framed screenshot or logo, role, stack, links, dates, optional commentary.
- `/experience` Education, roles, other life achievements, optional commentary, and a resume button that opens the PDF in a new tab.
- `/contact` Email, GitHub, LinkedIn, and Resume as logo links (all supplied), with Ross's headshot.

## Beyond the plan

Done at Ross's request (details in HANDOFF.md and DESIGN.md):

- [x] Motion pass: page change with a still header and footer, Home first-load sequence, scroll reveals, project rows whose rule brightens and take the oxide accent.
- [x] Content round 1: logo contact links, role line, MixTwin and NailsByGabs entries, education fields, resume button, photo folder, content guide (`src/content/README.md`).
- [x] Custom domain `rosschamplin.com` (Vercel, Cloudflare DNS) and Astro `site`.
- [x] Title morph between a project row and its page; running index with progress fills and drawing rules.
- [x] Sharing basics: favicon, meta descriptions, canonical URLs, social preview image, sitemap, `robots.txt`; Vercel Web Analytics.
- [x] Graphite dust background on every page.

Open:

- [x] Resume contents sorted into education, roles, and achievements (2026-10-02).
- [x] Resume PDF published (technical resume) and wired to the Experience button (2026-10-02).
- [ ] Replace the technical resume when Ross updates it (it is outdated and lacks NailsByGabs).
- [x] New Home photo: Ross's studio headshot (2026-10-02).
- [x] MixTwin filled in from Ross's description (2026-10-02).
- [ ] MixTwin: more technical description from Ross.
- [x] BingMCP (placeholder) and Personal Site added as featured projects; Home shows four (2026-10-02).
- [x] Projects page shows full breakdowns; Contact shows the headshot (2026-10-02).
- [x] Projects page: brighter rule between projects, two columns across the full width on desktop (2026-10-02).
- [x] Framed project plates with placeholders (2026-10-02).
- [x] NailsByGabs logo on its plate (2026-10-03).
- [ ] Project images from Ross: MixTwin and BingMCP screenshots, Personal Site logo.
- [x] Home: "Tools I've used", 23 official logos (2026-10-03).
- [x] NailsByGabs details, from Ross's write-up (2026-10-03).
- [x] NailsByGabs link fixed: `https://nailsbygabs.org` (`.com` was a typo).
- [x] NailsByGabs repo linked (public 2026-10-03).
- [ ] Bio, personal note, BingMCP details.
