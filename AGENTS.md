# Personal portfolio site: Ross, CS sophomore at Binghamton University

Read DESIGN.md before any UI work, and HANDOFF.md at the start of every session.
Stack: Astro (static) + Tailwind CSS + Markdown content collections. Deploy with GitHub Actions to GitHub Pages on `rchamp25/Personal-site-repo`.

## Rules
- Work on one PLAN.md task at a time, on its own branch. Commit small and often.
- Before stopping or when I say "wrap up": update HANDOFF.md (done / in progress / next / gotchas) and commit.
- Never invent projects, stats, or bio facts. Use content from /content or ask me.
- Follow the anti-patterns list in DESIGN.md strictly.
- Check your work in the browser at mobile and desktop widths before calling it done.

## Stack

Astro output is a static site. Tailwind is only for the tokens and layout primitives in DESIGN.md. Motion is CSS plus Astro view transitions. There is no React app, database, CMS, or animation library.

Why this stack: one language to maintain, content edited as Markdown, and GitHub Pages with no extra host. Local loop is `npm run dev` and `npm run build`.

## Site map

- `/` Home: name and one-line role, short bio, three selected projects, a “now” line, contact links.
- `/projects` Ruled index of all work (title, one line, year, stack).
- `/projects/[slug]` Problem, what was built, role, stack, links, dates. Images only when content includes them.
- `/experience` Education, roles, and a link to a resume PDF.
- `/contact` Email, GitHub, LinkedIn, and other real links. No contact form in v1.

## Content you must supply

Agents do not invent these. Until a fact is in `/content`, the page shows a placeholder that says it is a placeholder.

- Name as it should be shown, role line, 2–4 sentence bio, “now” line
- Each project: title, slug, one-line summary, problem, what you did, tech, dates, repo and demo URLs, featured on the home page or not; optional image
- Experience: org, role, dates, bullets you wrote
- Education (Binghamton, major, expected graduation) only as you want it stated
- Resume PDF
- Email, GitHub, LinkedIn, and any other links you actually use
- Photo only if you provide one. Otherwise the site is type-only.

## Folders

Once the app exists, keep this map:

- `src/pages` — routes
- `src/layouts` — page shell
- `src/components` — header, footer, index row, and other primitives
- `src/content` — profile, projects, experience, links (Markdown and config)
- `public/` — resume PDF, fonts, and images you supplied

Facts live in `src/content` (and `public/` for files). Layout code does not hard-code bio or project copy.

## Technical log

Append decisions here. Date them and name the agent. Do not delete earlier entries.

- 2026-09-30 — Auto: Chose Astro static, Tailwind, Markdown content collections, and GitHub Pages. Documented the site map, content rules, and folder map. No application code yet.
