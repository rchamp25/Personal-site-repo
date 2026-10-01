# Personal portfolio site: Ross, CS sophomore at Binghamton University

Read DESIGN.md before any UI work, and HANDOFF.md at the start of every session.
Stack: Astro (static, TypeScript strict) + Tailwind CSS v4 + Markdown content collections. Package manager: npm. Deploy target: Vercel static (`dist`, no SSR adapter). Public URL: `https://personal-site-pearl-tau-17.vercel.app`. Astro `site` is that origin. `base` is `/`. No custom domain in this build.

## Rules
- Work on one PLAN.md task at a time, on the current local branch. Do not start the next task in the same session.
- Do not commit, push, or open pull requests. Ross commits.
- Before stopping or when Ross says "wrap up": update HANDOFF.md (done / in progress / next / gotchas) and leave the changes in the working tree.
- Never invent projects, stats, or bio facts. Use content from `src/content` or ask Ross.
- Follow the anti-patterns list in DESIGN.md strictly.
- Check your work in the browser at mobile and desktop widths before calling it done.

## Stack

Astro output is a static site. TypeScript is strict. Tailwind v4 is CSS-first (`@theme` in one stylesheet) and is only for the tokens and layout primitives in DESIGN.md. Motion is CSS plus Astro view transitions. There is no React app, database, CMS, animation library, or `tailwind.config.js`.

Why this stack: one language to maintain, content edited as Markdown, and a static build Vercel can host with no server. Local loop is `npm run dev` and `npm run build`.

## Decisions from Ross

- Display name: Ross Champlin.
- Look: dark, closer to Linear and Iota. Tokens are in DESIGN.md. v1 has no light theme.
- Purpose: a record of school and personal projects, a bio, and other life achievements, with room for personal commentary. Not an internship landing page.
- Contact: email, GitHub, and LinkedIn are all public: `rosschamplin25@gmail.com`, `https://github.com/rchamp25`, and `https://www.linkedin.com/in/ross-champlin/` (in `src/content/links.yaml`). They show as logo links that go to the full address; the address itself is not printed on the page. Do not invent other contact methods.
- Copy: build with labeled placeholders until Ross adds files. Do not wait, and do not mine a resume that is not in the repo.
- Hosting: Vercel, static output. Public URL: `https://personal-site-pearl-tau-17.vercel.app`. Agents do not create another Vercel project, attach a custom domain, register a domain, or edit DNS. No GitHub Pages workflow. No `@astrojs/vercel` SSR adapter. `base` is `/`.
- Astro `site` is `https://personal-site-pearl-tau-17.vercel.app`. Do not change it and do not set it to `rosschamplin.com`.
- Git: agents work together in this local checkout. Ross commits. Agents do not commit or push.
- Scaffold: npm, TypeScript strict, Tailwind v4. Task 1 creates empty `src/pages`, `src/layouts`, `src/components`, and `src/content`, plus one home page whose copy says it is a placeholder. No content collections in task 1. No design tokens yet (task 3). Fonts, when task 3 adds them, are self-hosted files in `public/fonts` (not Google Fonts, not a runtime Fontshare request).

## Site map

- `/` Home: Ross Champlin, one-line role, short bio, three selected projects, a short personal note, contact links.
- `/projects` Ruled index of school and personal work (title, one line, year, stack).
- `/projects/[slug]` Problem, what was built, role, stack, links, dates, and an optional commentary field. Images only when content includes them.
- `/experience` Education, roles, other life achievements, and a link to a resume PDF. Entries may include commentary.
- `/contact` Email, GitHub, and LinkedIn. No contact form in v1.

## Content you must supply

Agents do not invent these. Until a fact is in `/content`, the page shows a placeholder that says it is a placeholder.

- Role line, 2–4 sentence bio, and the short personal note for the home page. The display name is already Ross Champlin.
- Each project: title, slug, one-line summary, problem, what you did, tech, dates, repo and demo URLs, featured on the home page or not, optional commentary, optional image. School work and personal work both belong here.
- Experience and achievements: org or context, role or what it was, dates, bullets you wrote, optional commentary
- Education (Binghamton, major, expected graduation) only as you want it stated
- Resume PDF
- Email, GitHub, and LinkedIn: supplied (see Decisions from Ross).
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

Append decisions here. Date them and name the agent. Do not delete earlier entries. If an older entry conflicts with the stack line or **Decisions from Ross**, follow those sections. The log is history.

- 2026-09-30 — Auto: Chose Astro static, Tailwind, Markdown content collections, and GitHub Pages. Documented the site map, content rules, and folder map. No application code yet.
- 2026-09-30 — Auto: Recorded Ross’s answers. Display name Ross Champlin. Dark theme. Placeholders until content arrives. Public contact is email, GitHub, and LinkedIn, with email and LinkedIn still unknown. Purpose is a record of school work, personal projects, a bio, and other achievements, plus commentary fields on projects and experience.
- 2026-09-30 — Auto: Scaffold choices. npm, TypeScript strict, Tailwind v4 (CSS-first, no tailwind.config.js) because task 3 maps DESIGN.md tokens through `@theme`. `base` is `/`. Task 1 is an empty folder skeleton and a placeholder home page. Content collections stay in task 2.
- 2026-09-30 — Auto: Ross will commit. Agents stay on the current local branch, do one PLAN task, update HANDOFF, and stop. No commits, pushes, or pull requests from agents. Deploy is Vercel static, not GitHub Pages. Fonts will be self-hosted in `public/fonts`.
- 2026-09-30 — Auto: Ross confirmed the public URL is the Vercel `*.vercel.app` host. No custom domain in this build. Do not guess the subdomain. Leave Astro `site` unset until that hostname exists.
- 2026-10-01 — Auto: Ross deployed. The live host is `https://personal-site-pearl-tau-17.vercel.app`. Set Astro `site` to that origin.
- 2026-10-01 — Auto: Ross deferred PLAN.md task 13 (font size, image pipeline, unused JS). Do not start it unless he asks. The ClientRouter script and the motion script stay.
- 2026-10-01 — Claude (Opus 5.5): Ross supplied his email (`rosschamplin25@gmail.com`) and LinkedIn (`https://www.linkedin.com/in/ross-champlin/`). Updated Decisions from Ross and Content you must supply. Contact links are logo links to the full address.
