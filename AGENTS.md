# Personal portfolio site: Ross, CS sophomore at Binghamton University

Read DESIGN.md before any UI work, and HANDOFF.md at the start of every session.
Stack: Astro (static, TypeScript strict) + Tailwind CSS v4 + Markdown content collections. Package manager: npm. Deploy target: Vercel static (`dist`, no SSR adapter). Public URL: `https://rosschamplin.com` (custom domain on Vercel). Astro `site` is that origin. `base` is `/`.

## Rules
- Do what Ross asks in the session, on the current local branch. When the request is a PLAN.md task, do that one task and stop. Larger direction changes (motion, content, sharing) come from Ross directly; record them in HANDOFF.md and, when they change the design, in DESIGN.md.
- Do not commit, push, or open pull requests. Ross commits.
- Before stopping or when Ross says "wrap up": update HANDOFF.md (done / in progress / next / gotchas) and leave the changes in the working tree.
- Never invent projects, stats, or bio facts. Use content from `src/content` or ask Ross.
- Follow the anti-patterns list in DESIGN.md strictly.
- Check your work in the browser at mobile and desktop widths before calling it done.

## Stack

Astro output is a static site. TypeScript is strict. Tailwind v4 is CSS-first (`@theme` in one stylesheet) and is only for the tokens and layout primitives in DESIGN.md. Motion is CSS, Astro view transitions (`ClientRouter`), one small inline script (Home first-load gate, scroll reveals, running index), and one canvas (the graphite dust background); all hand-written. Integrations: `@astrojs/sitemap` and `@vercel/analytics`. There is no React app, database, CMS, animation library, or `tailwind.config.js`.

Why this stack: one language to maintain, content edited as Markdown, and a static build Vercel can host with no server. Local loop is `npm run dev` and `npm run build`.

## Decisions from Ross

- Display name: Ross Champlin.
- Look: a dark lab notebook, closer to Linear and Iota, with motion at the level of the fluidity references (Linear, Stripe, Cuberto, Fuselab). Tokens and motion rules are in DESIGN.md. v1 has no light theme.
- Background: graphite dust on every page, a fine muted speck field the cursor (or a finger) brushes aside and scrolling stirs; no cursor change, trail, or click burst; switches itself off on slow devices. Approved 2026-10-01. It stays on every page, cursor response included, with no per-page opt-out (Ross, 2026-10-02).
- Home visual: Ross's original studio headshot, unedited (`src/content/images/ross-headshot.png`; do not crop, extend, re-encode, or filter it), large, no color filter, no edge fade, a 2px oxide border matching the rule under the name (Ross's chosen second accent on Home); square (never cropped), in the right column on desktop and full width above the name on phones. The first photo (`BallTuxFull.JPEG`) was rejected as over-filtered and pale.
- Purpose: a record of school and personal projects, a bio, and other life achievements, with room for personal commentary. Not an internship landing page.
- Contact: email, GitHub, and LinkedIn are all public: `rosschamplin25@gmail.com`, `https://github.com/rchamp25`, and `https://www.linkedin.com/in/ross-champlin/` (in `src/content/links.yaml`). They show as logo links that go to the full address; the address itself is not printed on the page. Do not invent other contact methods.
- Copy: build with labeled placeholders until Ross adds files. Do not wait, and do not mine a resume that is not in the repo.
- Hosting: Vercel, static output. Public URL: `https://rosschamplin.com`, a custom domain Ross owns. DNS is on Cloudflare (A record `@` to Vercel, `www` CNAME to Vercel, both DNS only, not proxied); `www.rosschamplin.com` redirects to `rosschamplin.com`. Ross manages Vercel and Cloudflare. Agents do not create another Vercel project, change domains, or edit DNS. No GitHub Pages workflow. No `@astrojs/vercel` SSR adapter. `base` is `/`.
- Astro `site` is `https://rosschamplin.com`. Do not change it.
- Git: agents work together in this local checkout. Ross commits. Agents do not commit or push.
- Stack basics: npm, TypeScript strict, Tailwind v4. Fonts are self-hosted files in `public/fonts` (never Google Fonts or a runtime font CDN).
- Analytics: Vercel Web Analytics only (no cookies). No other tracking.
- Resume: the technical resume, `public/Ross-Champlin-Resume.pdf`, opened in a new tab from a button at the top of Experience and from a Resume logo link on Contact (not in the footer). The general resume is never published or committed (it has Ross's home address); its facts are on the site. Ross's original photos are not committed either (`.gitignore`).
- What I've worked with (Home): official full-color logos (white versions of black marks), names under them, one block, static, below Selected work; lift-and-spotlight hover. The list is Ross's (`src/content/tools.yaml`); do not add to it without him. Left off at his choice: Cloudflare, C, JavaScript, HTML, GitHub. "SQL" is shown as PostgreSQL (Supabase's database). Approved 2026-10-03.
- Content grows over time: keep it in `src/content`, easy to add to, and delete placeholder entries as real ones arrive.

## Site map

- `/` Home: Ross Champlin, one-line role, short bio, a short personal note, Ross's headshot, up to four featured projects, and "What I've worked with" (official logos with names).
- `/projects` Every school and personal project's full breakdown on one page, each name underlined in oxide; no hover rows.
- `/projects/[slug]` Problem, what was built, a framed screenshot or logo, role, stack, links, dates, and an optional commentary field.
- `/experience` Education (degree, major, expected graduation, GPA, honors, involvement; no courses), roles, other life achievements, and a resume button that opens the PDF in a new tab. Entries may include commentary.
- `/contact` Email, GitHub, LinkedIn, and Resume as logo links, with Ross's framed headshot beside them. No contact form in v1.
- Every page: header nav, footer with the same three logo links, graphite dust background.

## Content you must supply

Agents do not invent these. Until a fact is in `src/content`, the page shows a placeholder that says it is a placeholder. How to fill each file is in `src/content/README.md`.

- 2–4 sentence bio and the short personal note for the home page. Name (Ross Champlin) and role line ("CS Student at Binghamton University") are supplied.
- Each project: title, slug, one-line summary, problem, what you did, tech, dates, repo and demo URLs, featured on the home page or not, optional commentary, and a screenshot or branding logo for its framed plate (a labeled placeholder until supplied: MixTwin and BingMCP screenshots, NailsByGabs and Personal Site logos). School work and personal work both belong here. MixTwin is filled in from Ross's own description and needs a more technical rewrite he will supply; NailsByGabs has its name, role (Full-Stack Developer), live site, and Supabase in its stack (the most important project; other details coming); BingMCP exists by name only (details coming; Ross is holding its role for now); Personal Site (this site) is written from the build; its role is "Full-Stack Developer", like MixTwin (Ross's choice; no Claude Code credit).
- Experience and achievements: org or context, role or what it was, dates, bullets you wrote, optional commentary
- Education: supplied from the resumes (Binghamton University and Webster Schroeder High School)
- Resume: supplied (technical resume, published). Education, roles, and achievements are filled from both resumes, except TOPSoccer (not started yet), the AP Water Quality project, and the technical skills list (outdated). The technical resume itself is outdated and will be replaced.
- Email, GitHub, and LinkedIn: supplied (see Decisions from Ross).
- Photo: supplied (studio headshot, 2026-10-02).

## Folders

Once the app exists, keep this map:

- `src/pages` — routes
- `src/layouts` — page shell (`Base.astro`: head tags, header, running index in the left margin on Experience and project pages (Home, Projects, and Contact have no margin column), footer, scripts)
- `src/components` — header, footer, project and experience rows, icons, graphite dust, and other primitives
- `src/content` — profile, projects, experience, links, tools (Markdown and YAML; logo SVGs in `logos/`), plus `README.md` on how to fill them; the schema is `src/content.config.ts`
- `src/lib` — small helpers (dates)
- `src/styles/global.css` — the one stylesheet: tokens, base rules, motion
- `scripts/` — `make-share-images.mjs` (`npm run share-images`): favicon PNG/ICO and the social preview image
- `public/` — fonts, favicon and share images, `robots.txt`, resume PDF, and images (`public/images/profile/` for the photo)

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
- 2026-10-01 — Claude (Opus 5.5): Ross bought `rosschamplin.com` and connected it on Vercel with Cloudflare DNS. Public URL and Astro `site` are now `https://rosschamplin.com`; `www` redirects to it. Updated Stack, Decisions from Ross (Hosting, Astro `site`), PLAN.md task 14, README, and HANDOFF.
- 2026-10-01 — Claude (Opus 5.5): Brought this file up to date with the current direction at Ross's request: removed the stale "no custom domain" line; rules now cover Ross's direct requests beyond PLAN.md; Stack lists the motion script, the graphite dust canvas, and the sitemap and analytics integrations; Decisions add the look and motion level, the graphite dust background, the photo-only Home visual, analytics, the resume button, and growing content; the site map, content list, and folder map match the site as built.
- 2026-10-02 — Claude (Opus 5.5): Ross added two resumes and two photos to `src/content`. Experience now holds 2 education, 2 roles, and 6 achievements from the resumes (excluding TOPSoccer, the AP Water Quality project, and the skills list, at Ross's instruction); MixTwin details came from the technical resume. Home shows the cropped `BallTuxFull.JPEG` photo through Astro's image pipeline. No address, phone, or school email is published. Education `major` became optional (a high school diploma has none).
- 2026-10-02 — Claude (Opus 5.5): Ross chose the technical resume for the Experience button (`public/Ross-Champlin-Resume.pdf`); the general resume and the original photos are in `.gitignore`. MixTwin is a real personal project with Ross's description (to be rewritten more technically later). The Home photo was re-cropped with more headroom, made larger, and made more vivid.
- 2026-10-02 — Claude (Opus 5.5): Removed the Home photo at Ross's request (it looked over-filtered and pale); deleted `src/content/images/ross-champlin.jpg` and the `photo` entry; Home shows a labeled placeholder frame until a new photo is supplied.
- 2026-10-02 — Claude (Opus 5.5): Ross supplied a studio headshot; it replaces the placeholder frame on Home (backdrop extended for headroom, no filter, 4:5 on desktop). The original PNG is in `.gitignore`.
- 2026-10-02 — Claude (Opus 5.5): Ross wants his original headshot used at full quality: `src/content/images/ross-headshot.png` is his file byte for byte (moved from `src/content/professional-headshot-ross`); the edited JPEG with an extended backdrop is gone.
- 2026-10-02 — Claude (Opus 5.5): Home photo frame is square at all widths, matching the square headshot.
- 2026-10-02 — Claude (Opus 5.5): Home photo: fade removed and a 2px oxide border added at Ross's request (the one exception to one accent per view).
- 2026-10-02 — Claude (Opus 5.5): Home has no left margin column (no label or running index; the header nav is enough there); `Base`'s `label` is optional and omitting it drops the column. Home's oxide rule and photo frame stay oxide during project-row hover.
- 2026-10-02 — Claude (Opus 5.5): Projects and Contact dropped their left margin column at Ross's request (no `label` passed to `Base`), matching Home.
- 2026-10-02 — Claude (Opus 5.5): Added BingMCP (placeholder) and Personal Site (this site) as featured projects; Home shows up to four. NailsByGabs links to its live site, currently `http://nailsbygabs.com` because the domain has no working HTTPS yet.
- 2026-10-02 — Claude (Opus 5.5): `/projects` shows full breakdowns (shared `ProjectBreakdown` component) with oxide-underlined names and no cursor effects; Contact shows the headshot (shared `Headshot` component) as tall as its text.
- 2026-10-02 — Claude (Opus 5.5): Ross reversed the calm dust on `/projects`: the dust answers the cursor on every page, permanently. `data-cursor-calm` is removed.
- 2026-10-02 — Claude (Opus 5.5): Personal Site no longer credits Claude Code (Ross's request). `/projects`: muted rule between projects; two-column breakdowns from `lg` (`ProjectBreakdown` `wide`).
- 2026-10-02 — Claude (Opus 5.5): Project `image` is now `{ kind: screenshot | logo, src?, alt? }` through Astro's `image()` (files in `src/content/images/projects/`); `ProjectFigure` frames it or shows a placeholder. Personal Site role is "Full-Stack Developer".
- 2026-10-02 — Claude (Opus 5.5): NailsByGabs role set to "Full-Stack Developer" (Ross). BingMCP's role is on hold at Ross's request.
- 2026-10-03 — Claude (Opus 5.5): Ross: Supabase was used in NailsByGabs and MixTwin; added to both stacks (NailsByGabs's stack is partial until he sends the rest).
- 2026-10-03 — Claude (Opus 5.5): New `tools` collection (`src/content/tools.yaml`, `image()` logos in `src/content/logos/`) for Home's "What I've worked with".
- 2026-10-03 — Claude (Opus 5.5): Resume added to Contact as a fourth logo link (from `profile.resume.href`, new tab); Experience now starts with its Resume section.
