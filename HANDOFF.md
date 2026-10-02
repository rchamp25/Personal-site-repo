# Handoff

Agents append to the log. Do not rewrite earlier entries. Keep **Current** accurate at the end of every session. If a log entry conflicts with **Current**, follow **Current**.

## Current

Rewritten 2026-10-01 into sections; the log below is the history behind it.

### State

- **Live:** `https://rosschamplin.com` (Vercel, static). `www` redirects to it. Ross commits and pushes; Vercel deploys `main`.
- **Built (PLAN.md tasks 1–12 and 14 done; 13 deferred by Ross):** Astro 7 static site, TypeScript strict, Tailwind v4 tokens; content collections; Home (identity, Selected work), `/projects` (every project's full breakdown), `/projects/[slug]`, `/experience`, `/contact`; responsive and accessibility passes.
- **Built beyond the plan, at Ross's request:** motion system (page change, Home first-load sequence, scroll reveals, project row hover and press with a travelling accent); title morph between a project row and its page; running index in the desktop margin with progress fills and drawing rules; logo contact links; education fields and a resume button; sharing basics (favicon, meta, canonical, Open Graph image, sitemap, robots); Vercel Web Analytics; graphite dust background.
- **Content:** real: name, role line ("CS Student at Binghamton University"), email, GitHub, LinkedIn, Home photo, education (Binghamton University, Webster Schroeder High School), roles (2), achievements (6), the resume button (technical resume), and MixTwin (personal project; Ross's own description, marked for a technical rewrite). Placeholders: bio, personal note, all of NailsByGabs. Home photo: Ross's studio headshot (2026-10-02).

### In progress

None.

### Next

- Waiting on Ross: a more technical MixTwin description (the current text is his plain-language version; the file is marked NEEDS REWRITE), MixTwin repo/demo links if any, NailsByGabs details (the most important project), bio and note, an updated technical resume. The Home photo is settled: Ross wants it big and dominant, not pinned while scrolling (2026-10-02). Ross runs `git rm --cached` on the originals (see the 2026-10-02 log). Excluded at Ross's instruction: TOPSoccer (not started), the AP Water Quality project (first on the technical resume), the technical skills list (outdated).
- Waiting on Ross: bio, personal note, MixTwin and NailsByGabs details and screenshots, BingMCP details. Delete placeholder entries as real ones arrive. When nailsbygabs.com serves HTTPS, change its `demo` to `https://`.
- Ross to enable Web Analytics in Vercel if not done; set the `www` redirect to 308.
- PLAN.md task 13 (performance) stays deferred until Ross asks.
- Not chosen in the visual pass (do not build unless asked): notebook grid, display-size type, footer signature, project hover previews, live readouts.

### Gotchas

**Working rules**
- Agents do not commit or push; Ross does. Do not invent facts; placeholders say they are placeholders. Check work in the browser at 390px and 1440px.
- Ross manages Vercel and Cloudflare DNS. Astro `site` is `https://rosschamplin.com`; do not change it.
- Headless Edge with `--window-size` under about 500px crops screenshots; use DevTools device emulation for phone checks. Edge renders the canvas in software, so its frame rates are a worst case.
- Node 22.12+. TypeScript is pinned to `^6` because `astro check` refuses 7. Import Zod from `astro/zod`. The content store is `node_modules/.astro/data-store.json`.

**Shell and layout ([src/layouts/Base.astro](src/layouts/Base.astro))**
- Every page uses `<Base title? label? sections? description?>`. Leaving out `label` drops the left margin column, so the content spans the full width aligned with the header name: Home (which also omits `title`, so its document title is the name), Projects, and Contact do this. Experience and project pages pass a `label` and keep the margin with their section index. Pages never import `global.css`.
- `<title>` is "Ross Champlin" on Home and "<title> · Ross Champlin" elsewhere. `description` may use `{name}`; default is "<name>, <role>.".
- From `md` up `<main>` is an 11rem index column plus content. Below `md` the label stacks above the content. Prose goes in `<Measure>` (65ch). `html` has `scrollbar-gutter: stable` and `scroll-padding-top: 5rem`.
- `<body>` has no background: `<html>` paints the ground so the graphite dust canvas (`z-index: -1`) shows through. Do not add a background to `<body>` or to full-width wrappers.
- The header is sticky with an opaque ground background; on phones it hides the name so the four nav links fit on one row. No menu button.
- `<main id="main" tabindex="-1">` with `outline-none` lets the skip link move focus; keep both.

**Tokens and type ([src/styles/global.css](src/styles/global.css))**
- `@theme static`: colors `ground`, `ink`, `muted`, `hairline`, `accent`; fonts `headline`, `body`, `meta`; `max-w-page`, `max-w-measure`; motion `--duration-page` 240ms, `--duration-reveal` 480ms, `--duration-hover` 180ms, `--ease-out-quart`, `--shift-hover` 4px, `--scale-hover` 1.02. Tailwind's default palette and font stacks are cleared.
- Contrast on ground: ink 16.58, muted 8.85, accent 6.34, hairline 1.30 (rules only, never text).
- Fonts are self-hosted in `public/fonts` (from the official GitHub repos; Fontshare does not carry Instrument Serif or Newsreader). Instrument Serif has only weight 400: headings are 400 with `font-synthesis-weight: none`. No italics ship.
- Links: ink with a muted underline that turns ink on hover. Focus: 2px ink outline, never the accent.

**Accent**
- One oxide accent per view at rest: the rule under the page h1 (`aria-hidden`). Exceptions, Ross's choice: on Home and Contact the photo (`Headshot.astro`) also has a 2px oxide border; on Home both stay oxide all the time, including while a project row is hovered (the old `data-page-accent` dimming is removed). A hovered row also draws its own oxide mark. `/projects` has no rule; instead every project name has a permanent 2px oxide underline (`border-b-2` on an inline-block span, not a link). The dust never uses the accent.

**Motion (source: DESIGN.md "Motion")**
- Page change: `<ClientRouter />` in `<head>`; `<html transition:animate>` runs `page-leave`/`page-arrive` on the tokens. Header (`site-header`), footer (`site-footer`), and the dust canvas (`graphite-dust`) are named with `transition:animate="none"` and hold still. `<main>` is deliberately not named. `::view-transition` has the ground background; header group `z-index: 1`, dust group `z-index: -1`.
- Title morph: the row title span (`ProjectRow`, now used only on Home) and an inline-block span in the project h1 share `transition:name="project-<slug>"` with `transition:animate="initial"`. Keep both inline-block; one row per project per page.
- Home first load: `data-intro` plus `--intro-delay` (label 0, name words 80/160, rule 280 with `draw`, role 360, bio 440, note 520, Selected work 600; done by 840ms). Gated by `html:not([data-nav="client"])`; the script sets `data-nav="client"` on the incoming document in `astro:before-swap`.
- Scroll reveal: `data-reveal`. Only elements starting below the fold are hidden (`data-reveal-pending`) and each is revealed once. Nothing hidden under reduced motion.
- Running index: pages pass `sections={[{ id, label }]}`; rendered from `md` up with a `label` and two or more sections (only Experience and project pages have one). The script marks the current link `aria-current="location"` (last section past 35% of the viewport, or the last at page bottom). `.index-progress` and `.header-progress` (phones) fill via `scroll()` timelines and are empty at rest; `draw-rule` draws a `border-top` via a `view()` timeline. Firefox lacks scroll-driven animations: no fills, static rules.
- Project rows: `.row-rule` and `.row-accent` spans; hover only on `(hover: hover)`, press via `:active` (a `touchstart` listener enables it on iOS), focus via `:has(a:focus-visible)`. The title moves `--shift-hover` from `md` up only. The title moves on an inner span because a translated link would shrink its stretched `::after`.
- Any future script that touches the DOM must run on `astro:page-load`.
- Project breakdown: [ProjectBreakdown.astro](src/components/ProjectBreakdown.astro) renders a project's summary, sections, details, links, image, and commentary for both `/projects/[slug]` and `/projects`. On `/projects` it gets `idPrefix="<slug>-"` (unique section ids), `level={3}` (labels are h3 under the h2 name), and `titleId` so each region is labelled "<name> Problem" and so on; without that axe reports `landmark-unique`. Its scoped `.body` styles cover the Markdown body. `wide` (only `/projects`) makes it a two-column grid from `lg` (`65ch` story column, facts column filling the rest, `gap-x-16`); the facts column's first child gets `mt-8` so it lines up near the summary. On `/projects` the rule between projects is `draw-rule draw-rule-strong border-muted`: `.draw-rule-strong` (global.css) colors the drawn `::before` muted. Do not do this with an inherited custom property; the inner `draw-rule`s would pick it up.
- Headshot: [Headshot.astro](src/components/Headshot.astro) is the framed square photo for Home and Contact (`<Picture>` AVIF/WebP, quality 90, widths up to 1254). On Contact from `lg` the photo's `contain: size` plus `height: 100%`, `width: auto`, and `justify-self: start` make it exactly as tall as the text column without setting the row height; dropping any of them makes it size to the column (464px) instead.

**Graphite dust ([src/components/GraphiteDust.astro](src/components/GraphiteDust.astro))**
- One fixed `<canvas>` behind every page, `transition:persist`, so it survives page changes and keeps its state. Specks: muted color only, two brightness levels (0.7 and 0.35 alpha in open areas), drawn at 0.14 and 0.07 behind text using a 16px grid of text boxes (`main` headings, paragraphs, list items, `dt`/`dd`, links, header, footer) rebuilt on scroll, resize, and page load. Worst case text contrast over a speck: muted 6.99:1, ink 13.09:1. axe marks some text "needs review" for contrast because of the canvas; it is not a failure.
- Count scales with viewport area (140 to 480). Device pixel ratio capped at 1.5. The canvas is sized from its own box (the viewport minus the scrollbar gutter, 100lvh tall); height only grows, so a phone's sliding address bar does not reallocate it.
- Input: mouse and pen via `pointermove`; touch via passive `touchstart`/`touchmove` (pointer events cancel once a touch scrolls). Push radius 120px desktop, 90px phone, damped with no bounce. Scrolling stirs specks against the scroll direction (capped); the scroll itself is never touched. No cursor change, no trail, no click burst.
- Performance: measured about 60fps with about 0.1–0.2ms of script per frame in software-rendered headless Edge. Pauses when the tab is hidden. Watchdog: after a 30-frame warmup, if the median frame time over 120 frames exceeds 28ms (outside page changes), it clears the canvas, stops, and sets `sessionStorage["graphite-dust-off"] = "1"` so it stays off for the rest of the visit (tested).
- Reduced motion: one still frame, no input response.
- Every page, always: Ross wants the dust, cursor response included, on all pages permanently (2026-10-02). Do not add a per-page opt-out (a `data-cursor-calm` one existed briefly and was removed).

**Content ([src/content/README.md](src/content/README.md), [src/content.config.ts](src/content.config.ts))**
- `placeholder: true` entries may omit facts; real entries must have them or the build fails (projects: `kind`, `role`, `start`, `stack`; roles and achievements: `org`, `start`; education: `degree`, `end`; links: `href`).
- Projects: file name is the slug; the Markdown body is "what was built"; use `##` or deeper in the body (a `#` adds a second h1). Home shows up to four `featured` by `order` (now four: MixTwin, NailsByGabs, BingMCP, Personal Site). `mixtwin.md` and `nailsbygabs.md` have real titles only.
- Experience: grouped Education, Roles, Achievements, then Resume. Education `title` is the school and `org` the college or place (shown in the meta line before the dates); `degree`, optional `major`, `end` with `expected`, `gpa`, `honors`, `involvement`; no courses. Dates are `"YYYY"` or `"YYYY-MM"`; missing `end` means ongoing ([src/lib/dates.ts](src/lib/dates.ts); `[slug].astro` still has its own copy).
- Resume: once `profile.resume.href` is set, Experience shows a button that opens it in a new tab.
- Links: logo links (`Icon.astro`, Bootstrap Icons, MIT) on Contact and in the footer; the address is the hover title, never printed. A link is live only with `placeholder: false` and an `href`.
- Project pages: not yet seen in a browser with real role, dates, stack, links, or image. Astro's default Shiki colors would be off-palette if a project adds code blocks.

**Sharing and analytics**
- Head tags come from `Base`: description, canonical (no trailing slash; the host serves both forms), `theme-color`, icons, Open Graph, X card. `public/og.png`, `favicon-32.png`, `favicon.ico`, `apple-touch-icon.png` are generated by `npm run share-images` ([scripts/make-share-images.mjs](scripts/make-share-images.mjs), headless Edge or Chrome, `BROWSER_PATH` overrides); rerun after changing the name, role, or `public/favicon.svg`. Keep `name` and `role` as one-line values in `profile.yaml`.
- `@astrojs/sitemap` writes `sitemap-index.xml` with trailing slashes stripped; `public/robots.txt` points to it.
- `<Analytics />` (`@vercel/analytics/astro`) sits at the end of `<body>`, so each client-side page change counts. It requests `/_vercel/insights/script.js` in production only.

**JavaScript shipped**
- `ClientRouter` bundle (16,357 bytes) plus inline modules: graphite dust (3,590), Vercel Analytics loader (2,817), motion (1,285: intro gate, reveals, running index, iOS touch). All are in use; keep them in the performance pass.

## Log

### 2026-09-30 — Auto

- Recorded the approved plan in the docs below. No site scaffold, no commits of application code.
- [DESIGN.md](DESIGN.md): kept the reference list and aim paragraph; replaced `AGGENTS:` with `AGENTS:` and wrote color, type, layout, motion, anti-patterns, and a first visualization note.
- [PLAN.md](PLAN.md): ordered checklist, tasks 1–14, plus the route list those tasks build.
- [AGENTS.md](AGENTS.md): set the stack to Astro + Tailwind + GitHub Pages; added site map, content you must supply, folder map, and a technical log entry.
- [HANDOFF.md](HANDOFF.md): added this Current block and log.

### 2026-09-30 — Auto

- Recorded Ross’s answers to the five clarifying questions.
- [DESIGN.md](DESIGN.md): switched v1 from paper to a dark lab notebook. Ground `#12110f`, ink `#f4f0e6`, muted `#b7b1a6`, hairline `#2c2924`, oxide `#e07a4a` once per view. No theme toggle.
- [AGENTS.md](AGENTS.md): display name Ross Champlin; public email, GitHub, and LinkedIn; placeholders until content exists; purpose is school work, personal projects, a bio, other achievements, and commentary.
- [PLAN.md](PLAN.md): tasks 2, 5, 8, and 9 and the route list now include the personal note, commentary, and life achievements.
- [HANDOFF.md](HANDOFF.md): updated Current and appended this entry.

### 2026-09-30 — Auto

- Recorded scaffold answers. Domain `rosschamplin.com` (`base` `/`). npm. TypeScript strict. Empty folder skeleton and a placeholder home page for task 1.
- Recommended Tailwind v4 and recorded it: CSS-first `@theme`, no `tailwind.config.js`, which matches task 3’s CSS variables. Ross had asked for a recommendation.
- [AGENTS.md](AGENTS.md), [PLAN.md](PLAN.md), [HANDOFF.md](HANDOFF.md): scaffold constraints added. No application code.

### 2026-09-30 — Auto

- Recorded how Claude should build. Agents work in this local checkout, one PLAN task at a time, and do not commit, push, or open pull requests. Ross commits.
- Deploy target changed from GitHub Pages to Vercel static (`dist`, no SSR adapter). Task 14 prepares the build and README only. Ross connects Vercel.
- `rosschamplin.com` is not owned yet. Ross will register it at Cloudflare and point DNS. Astro `site` must not use that host until he owns it. `base` stays `/`.
- Locked self-hosted fonts in `public/fonts` for task 3.
- [AGENTS.md](AGENTS.md), [PLAN.md](PLAN.md), [HANDOFF.md](HANDOFF.md) updated. No application code. Left uncommitted because Ross commits.

### 2026-09-30 — Auto

- Ross corrected the public URL: deploy is Vercel and the host ends in `.vercel.app`. No custom domain in this build.
- [AGENTS.md](AGENTS.md), [PLAN.md](PLAN.md), [HANDOFF.md](HANDOFF.md): removed the Cloudflare / `rosschamplin.com` deploy step. Astro `site` stays unset until the real `*.vercel.app` hostname exists. Agents still do not create the Vercel project. Left uncommitted because Ross commits.

### 2026-09-30 — Claude (Opus 5.5)

- PLAN.md task 1 done. Scaffolded by hand, not with `create-astro`, so there is no template content and no `git init`.
- Files: [package.json](package.json), `package-lock.json`, [astro.config.mjs](astro.config.mjs) (static, `base` `/`, `site` unset, Tailwind Vite plugin), [tsconfig.json](tsconfig.json) (extends `astro/tsconfigs/strict`), [.gitignore](.gitignore), [README.md](README.md), [src/styles/global.css](src/styles/global.css), [src/pages/index.astro](src/pages/index.astro), `.gitkeep` in `src/layouts`, `src/components`, `src/content`.
- Versions: astro 7.3.5, tailwindcss and @tailwindcss/vite 4.3.3, @astrojs/check 0.9.10, typescript 6.0.3 (downgraded from 7.0.2 because `astro check` does not support 7).
- Added `src/styles/` beyond the four folders the task lists. Tailwind v4 needs one stylesheet to import, and AGENTS.md says `@theme` lives in one stylesheet.
- Placeholder page copy says “Placeholder”, shows the display name Ross Champlin, and says the page is a placeholder with no real content yet. No bio, projects, or contact details.
- Verified: `npm run build` writes `dist/index.html`. `npm run dev` serves `/` with status 200. `npm run check` shows 0 errors. Browser check in headless Edge with device emulation: 390×844 has no horizontal overflow (scrollWidth 390) and the text wraps; 1440×900 renders with the prose measure capped.
- No content collections, tokens, fonts, deploy config, or Vercel project. Nothing committed; changes are in the working tree for Ross.

### 2026-09-30 — Claude (Opus 5.5)

- PLAN.md task 2 done. Content collections in [src/content.config.ts](src/content.config.ts). I read the task's "`site` config" as this content config (profile, projects, experience, links); there is no separate `site.config` file. Astro `site` is still unset.
- Collections: `profile` and `links` use the `file()` loader on YAML; `projects` and `experience` use `glob()` on Markdown. `experience.kind` covers education, roles, and achievements that are not jobs. Both have optional `commentary`.
- Seed, all placeholders that say so: profile (name Ross Champlin; role, bio, note, and resume label are placeholders; no resume href), links (GitHub `https://github.com/rchamp25` is real; email and LinkedIn are placeholders with no href), three placeholder projects, and one placeholder each for education, role, and achievement. No invented projects, dates, stats, or life story.
- Schema requires facts on real entries (see Gotchas in Current). Tested by adding a temporary non-placeholder project with missing fields: the build failed with the schema message. Removed the test file.
- [src/pages/index.astro](src/pages/index.astro) now reads the name from `profile` instead of hard-coding it. The rendered HTML is unchanged. Checked at 390×844 (no horizontal overflow) and 1440×900.
- Removed `src/content/.gitkeep` since the folder now has files. Added two lines to [README.md](README.md) about `src/content` and `src/content.config.ts`.
- Verified: `npm run check` 0 errors, 0 warnings; `npm run build` succeeds; all ten seed entries load.
- No design changes, tokens, fonts, new pages, or deploy config. Nothing committed.

### 2026-09-30 — Claude (Opus 5.5)

- PLAN.md task 3 done. Tokens and `@font-face` rules in [src/styles/global.css](src/styles/global.css). No `tailwind.config.js`.
- Colors: ground `#12110f`, ink `#f4f0e6`, muted `#b7b1a6`, hairline `#2c2924`, accent `#e07a4a`. Contrast on ground: ink 16.58, muted 8.85, accent 6.34, hairline 1.30. Muted passes AA, so it is unchanged. Tailwind's default palette is removed so there is no second accent to reach for.
- Type: `font-headline` (Instrument Serif, then Iowan Old Style, Palatino Linotype, Palatino, serif), `font-body` (Newsreader, then Georgia, Times New Roman, serif), `font-meta` (IBM Plex Mono, then Courier New, Courier, monospace). Body is the default family; mono is the default mono family.
- Fonts: Fontshare's catalog has neither Instrument Serif nor Newsreader, so, as Ross allowed, both came from their official GitHub repos. IBM Plex Mono came from `IBM/plex`. Files in [public/fonts](public/fonts): `instrument-serif-regular.woff2` (static, 27 KB), `newsreader-variable.woff2` (weight and optical size, 215 KB), `ibm-plex-mono-variable.woff2` (weight, 83 KB), plus `OFL-*.txt` for each, since the OFL requires the license to ship with the fonts. All `font-display: swap`. Axis ranges were read from each file's `fvar` table.
- Measures: `max-w-page` 72rem, `max-w-measure` 65ch. Default spacing scale kept. No left-margin index.
- Motion: `--duration-page` 240ms, `--ease-out-quart` `cubic-bezier(0.25, 1, 0.5, 1)` (no overshoot), `--scale-hover` 1.02. Under `prefers-reduced-motion: reduce`, transitions and animations are off (including view-transition pseudo-elements) and `--scale-hover` is 1. I used the scale token instead of a global `transform: none`, which would also disable layout transforms such as a translated skip link. No stagger and no view transitions yet.
- [src/pages/index.astro](src/pages/index.astro): body is ground, ink, and Newsreader; the "Placeholder" label is Plex Mono in muted; the name is Instrument Serif; the text column is `max-w-measure`. Same copy, no new sections.
- Verified: `npm run check` 0 errors; `npm run build` succeeds and copies the fonts to `dist/fonts`. In headless Edge at 390×844 and 1440×900: all three faces report `loaded`, fonts are requested only from `/fonts` on the same origin, no other host is contacted, background is `rgb(18, 17, 15)`, no horizontal overflow at 390px, and `--scale-hover` is 1 under emulated reduced motion.
- `src/content` untouched. Astro `site` unset. Nothing committed.

### 2026-09-30 — Claude (Opus 5.5)

- PLAN.md task 4 done. Layout primitives built only from the existing tokens. No new colors, fonts, or accent.
- [src/layouts/Base.astro](src/layouts/Base.astro): the page shell. It owns `<html>`, `<head>`, and the `global.css` import (moved out of the home page). Body is ground, ink, Newsreader, and a full-height column so the footer sits at the bottom. A "Skip to content" link appears on first Tab. `<main id="main">` is `max-w-page` (72rem); from `md` up it is a grid with an 11rem left index column.
- [src/components/SiteHeader.astro](src/components/SiteHeader.astro): sticky, ground background (opaque, no blur), hairline bottom rule, IBM Plex Mono. Name from `profile` on the left (from `sm` up), and nav Home, Projects, Experience, Contact linking to `/`, `/projects`, `/experience`, `/contact`. The header is 41px on phones and 53px on desktop. No hamburger.
- [src/components/SiteFooter.astro](src/components/SiteFooter.astro): hairline top rule, mono, "© year Ross Champlin" in muted, and the non-placeholder links from `src/content/links.yaml` (GitHub only).
- [src/components/SectionLabel.astro](src/components/SectionLabel.astro): the running index label, mono uppercase muted with a hairline rule above. [src/components/Measure.astro](src/components/Measure.astro): `max-w-measure` wrapper for prose.
- [src/styles/global.css](src/styles/global.css) base layer: headlines at weight 400 with `font-synthesis-weight: none`; links in ink with an underline; `aria-current="page"` underline; `:focus-visible` 2px ink ring; `scroll-padding-top`.
- [src/pages/index.astro](src/pages/index.astro): uses `Base` with `label="Home"`. Copy unchanged ("Placeholder", the name, the placeholder sentence).
- Fixed during the browser check: the nav focus ring first wrapped the link's padded box and ran past the header's top and bottom. I moved the padding to the header so the ring fits inside it.
- Verified: `npm run check` 0 errors and 0 warnings; `npm run build` succeeds. In headless Edge at 390×844: header sticky at top 0 after scrolling 1200px (content was lengthened in the browser only), label above the h1 at the same left edge, all four nav labels on one row, no horizontal overflow. At 1440×900: label in the left column (x 176) and h1 in the content column (x 384, aligned with the nav), header sticky, label stays in view while scrolling. Tab 1 focuses the visible skip link and Tab 2 focuses Home, both with a 2px ink outline. h1 computes to weight 400 with synthesis off. Footer link is ink and underlined.
- No new routes, no home bio or project list, no stagger or view transitions. `src/content` untouched. Astro `site` unset. Removed `.gitkeep` from `src/layouts` and `src/components`. Nothing committed.

### 2026-09-30 — Claude (Opus 5.5)

- PLAN.md task 5 done. [src/pages/index.astro](src/pages/index.astro) uses `Base` with `label="Home"` and `title` set to the name only ("Ross Champlin"). It does not import `global.css`.
- Reads profile entry `ross` and renders, inside `Measure`: the name as `h1` (font-headline through the base rule, weight 400, `text-5xl` / `sm:text-6xl` / `md:text-7xl`), then the role line, the bio, and the note. The three strings are rendered exactly as written in `profile.yaml`; they are still placeholders.
- Removed the "This is a placeholder page" sentence and the mono "Placeholder" eyebrow above the name, so the page holds only the four requested items plus the rule.
- Accent: one 4rem × 2px oxide rule between the name and the role line, decorative (`aria-hidden`). No other accent on the page.
- Motion: first-paint stagger on the h1 only. Two word spans fade and rise 0.2em using `--duration-page` (240ms) and `--ease-out-quart`, the second word 80ms after the first. No new tokens. Reduced motion is handled by the existing global rule; I added nothing to get around it.
- Verified: `npm run check` 0 errors and 0 warnings; `npm run build` succeeds. In headless Edge at 390×844 and 1440×900: the heading reads "Ross Champlin", weight 400; order is h1, role, bio, note; exactly one element uses the accent color; no horizontal overflow; prose width 358px on the phone and 572px on desktop (65ch). With motion, both words start at opacity 0 and finish at 1 (animations `rise@0ms/240ms`, `rise@80ms/240ms`), and a mid-animation screenshot shows the second word trailing. With reduced motion emulated, there are no running animations and both words are at opacity 1.
- No project list, contact block, or new route. `src/content` untouched. Astro `site` unset. Nothing committed.

### 2026-09-30 — Claude (Opus 5.5)

- PLAN.md task 6 done. Home page now has a "Selected work" section after the identity block, which is unchanged.
- [src/pages/index.astro](src/pages/index.astro): `getCollection("projects")` filtered on `featured`, sorted by `order`, first three. The section has a mono uppercase muted `h2` "Selected work" (`aria-labelledby`), then a `ul` with a hairline top rule. The section is omitted if no project is featured.
- New [src/components/ProjectRow.astro](src/components/ProjectRow.astro): the "index row" primitive from the AGENTS.md folder map. Title (`h3` by default, Instrument Serif `text-2xl`) linking to `/projects/<file name>`, summary, and a mono muted meta line for year and stack only when content has them. Hairline rule under each row. No card, no background, no accent. Built for reuse by `/projects` in task 7.
- Placeholders render as written: titles "Placeholder project 1–3" and their placeholder summaries. No year and no stack, because the entries have no `start` and an empty `stack`. Nothing invented.
- Verified: `npm run check` 0 errors and 0 warnings; `npm run build` succeeds. In headless Edge at 390×844 and 1440×900: exactly one accent-colored element (the rule under the name); three rows in order 1, 2, 3 linking to `/projects/placeholder-project-1` to `-3`; row and list rules are hairline `rgb(44, 41, 36)`; row text is only title and summary; clicking the summary hits the title link; a focused title shows the 2px ink ring; no horizontal overflow; rows stack on the phone and form three columns on desktop. The h1 stagger is unchanged, and there is no new animation.
- Fixed the stale task 4 line in Current that said the accent was unused.
- `src/content` untouched. No new route; `/projects/<slug>` is task 8. Astro `site` unset. Nothing committed.

### 2026-10-01 — Auto

- Ross deployed the site. Live URL: [https://personal-site-pearl-tau-17.vercel.app](https://personal-site-pearl-tau-17.vercel.app/).
- [astro.config.mjs](astro.config.mjs): set `site` to `https://personal-site-pearl-tau-17.vercel.app`.
- [AGENTS.md](AGENTS.md), [PLAN.md](PLAN.md), [HANDOFF.md](HANDOFF.md): recorded that host. Task 14 still includes writing the URL into the README. Left uncommitted because Ross commits. A push is required before this `site` value is on the live deploy.

### 2026-10-01 — Claude (Opus 5.5)

- PLAN.md task 7 done. New [src/pages/projects/index.astro](src/pages/projects/index.astro), served at `/projects`.
- Uses `Base` with `title="Projects"` and `label="Projects"`; no `global.css` import in the page. `h1` "Projects" (Instrument Serif, weight 400 through the base rule). Below it, a `ul` with a hairline top rule holding one `ProjectRow` per project with `headingLevel={2}`.
- Loads every entry from `src/content/projects` with `getCollection("projects")` and no `featured` filter; sorted by `order`, then title. All three are placeholders and render as written. No year or stack shows, because none has `start` or a non-empty `stack`.
- No accent on this page. Rows use ink, muted, and hairline only. Titles link to `/projects/<slug>`; those pages are task 8.
- Astro `site` stays `https://personal-site-pearl-tau-17.vercel.app`, as the 2026-10-01 Auto entry set it. Not touched. Home page and `src/content` not touched.
- Fixed one stale line in Current: `CLAUDE.md` is tracked now.
- Verified: `npm run check` 0 errors and 0 warnings; `npm run build` succeeds and writes `/projects/index.html` and `/index.html`. In headless Edge at 390×844 and 1440×900 on `/projects`: title "Projects"; nav marks Projects with `aria-current`; label "Projects" sits above the h1 on the phone and in the left column on desktop (x 176, with the h1 at x 384); headings are h1 "Projects" then three h2 titles; each row's visible text is only title and summary; row and list rules are hairline `rgb(44, 41, 36)`; no accent-colored elements; no horizontal overflow. On `/` at both widths: exactly one accent-colored element, the rule under the name.
- Nothing committed.

### 2026-10-01 — Claude (Opus 5.5)

- PLAN.md task 8 done. New [src/pages/projects/[slug].astro](src/pages/projects/[slug].astro): one static page per entry in `src/content/projects` (`/projects/placeholder-project-1` to `-3`), via `getStaticPaths` and `render()`.
- Uses `Base` with `label="Projects"` (nav marks Projects) and `title` set to the project title. No `global.css` import in the page.
- Order on the page: title `h1` (weight 400); a 4rem × 2px oxide rule (`aria-hidden`; the only accent on the page); summary; "Problem"; "What was built" (Markdown body); a role, dates, and stack list only for fields present (a missing `end` reads "ongoing"); repo and demo links only when the URLs exist; image only when present, with its `alt`; "Commentary" last, only when present, set apart by a hairline rule above and styled like the home note (muted, hairline left rule). Prose sits in `Measure`.
- Placeholders render as written. Each page shows the title, summary, problem, body, and commentary placeholders, and no role, dates, stack, links, or image, because none are in content. Nothing invented. No stagger.
- Verified: `npm run check` 0 errors, 0 warnings, 0 hints; `npm run build` succeeds and writes three project pages plus `/projects` and `/`. In headless Edge, starting on `/projects` and clicking the first row's summary, the browser landed on `/projects/placeholder-project-1`. At 390×844 and 1440×900: nav marks Projects, label "Projects" above the h1 on the phone and in the left column on desktop (x 176 vs h1 x 384), sections in the required order, exactly one accent-colored element (the rule), commentary in muted `rgb(183, 177, 166)`, prose width 358px and 572px, no horizontal overflow.
- Not exercised in a browser: the role, dates, stack, links, and image branches, because no entry has those fields and I left `src/content` unchanged. See Gotchas in Current.
- Home page, projects index, `src/content`, and Astro `site` not touched. Nothing committed.

### 2026-10-01 — Claude (Opus 5.5)

- PLAN.md task 9 done. New [src/pages/experience.astro](src/pages/experience.astro) at `/experience`, new [src/components/ExperienceRow.astro](src/components/ExperienceRow.astro), and new [src/lib/dates.ts](src/lib/dates.ts).
- Page: `Base` with `title="Experience"` and `label="Experience"` (nav marks Experience); no `global.css` import. `h1` "Experience", then one 4rem × 2px oxide rule (`aria-hidden`), the only accent on the page.
- Loads every `src/content/experience` entry, sorts by `order` (then title), and groups by `kind` into Education, Roles, and Achievements, each a section with a mono muted `h2` and a hairline-ruled list. Rows are not cards: title, org and dates only when present, bullets, an optional Markdown body only when non-empty, and commentary last under a "Commentary" label.
- Placeholders render as written. The education entry shows its title and bullet and no commentary (it has none). The role and achievement show title, bullet, and commentary. No org, dates, school name, or Binghamton anywhere.
- Resume: a "Resume" section below the entries shows `profile.resume.label` ("Placeholder: resume PDF not added yet.") as plain text. No link, no PDF path. It becomes a link automatically once `resume.href` is set.
- `src/lib/dates.ts` holds the date formatting; Node test: no start returns nothing, `2025` with no end gives "2025 – ongoing", `2024-09`/`2028-05` gives "Sep 2024 – May 2028", equal start and end give one date, and `2023`/`2024` gives "2023 – 2024". The project page's own copy was left alone, as instructed.
- Fixed two stale lines in Current: project row links no longer 404, and only `/contact` is missing from the nav targets.
- Verified: `npm run check` 0 errors, 0 warnings, 0 hints; `npm run build` succeeds and writes `/experience/index.html`. In headless Edge at 390×844 and 1440×900: title "Experience"; nav marks Experience; label above the h1 on the phone and in the left column on desktop; headings h1, then h2 Education, Roles, Achievements, Resume with h3 entry titles; row rules hairline `rgb(44, 41, 36)`; resume paragraph has no link; exactly one accent-colored element (the rule); no horizontal overflow.
- `src/content`, project pages, home page, and Astro `site` not touched. Nothing committed.

### 2026-10-01 — Claude (Opus 5.5)

- PLAN.md task 10 done. New [src/pages/contact.astro](src/pages/contact.astro) at `/contact`.
- `Base` with `title="Contact"` and `label="Contact"` (nav marks Contact); no `global.css` import. `h1` "Contact", then one 4rem × 2px oxide rule (`aria-hidden`), the only accent on the page.
- Loads every entry in `src/content/links.yaml` and sorts by `order`. A hairline-ruled `<dl>`, not cards and not a form: Email shows "Placeholder: email address not added yet." as plain text; GitHub shows "rchamp25" linking to `https://github.com/rchamp25`; LinkedIn shows "Placeholder: LinkedIn URL not added yet." as plain text. A link is made only when `placeholder` is false and `href` exists.
- No form, inputs, phone number, `mailto:`, or `tel:`. No invented address or URL.
- Fixed one stale line in Current: all four nav targets exist now.
- Verified: `npm run check` 0 errors, 0 warnings, 0 hints; `npm run build` succeeds and writes `/contact/index.html`. In headless Edge at 390×844 and 1440×900: title "Contact"; nav marks Contact; label above the h1 on the phone and in the left column on desktop (x 176, h1 at x 384); three rows in order Email, GitHub, LinkedIn with hairline rules; the only link in the list is `rchamp25` → `https://github.com/rchamp25`, ink with underline; 0 form controls; 0 `mailto:`/`tel:` links; exactly one accent-colored element; no horizontal overflow.
- `src/content` and Astro `site` not touched. Nothing committed.

### 2026-10-01 — Claude (Opus 5.5)

- PLAN.md task 11 done: responsive pass in headless Edge with device emulation at 390×844 (mobile) and 1440×900 (desktop) on `/`, `/projects`, `/projects/placeholder-project-1`, `/experience`, and `/contact`.
- Checked on every route at both widths: horizontal overflow (`scrollWidth` against `clientWidth`, plus any element past either edge); vertical scrollbar width; the left edge of header nav, section label, h1, and footer; label above the h1 (phone) or in the left column (desktop); nav labels on one row, all inside the viewport; no `button`, `[aria-haspopup]`, or `details` (no menu toggle); header height; header still at top 0 after scrolling 1500px (height added in the browser only and removed after).
- Baseline before any change: everything passed except the known shift. `/experience` at 1440px is taller than the viewport and gets a 15px scrollbar, which moved the whole centered column 7px left (nav and h1 at x 377, label and footer at 169) compared with the four shorter pages (384 and 176). Phones were unaffected (overlay scrollbars).
- Change: [src/styles/global.css](src/styles/global.css) base layer, `html { scrollbar-gutter: stable; }` with a comment. Nothing else changed.
- After: at 1440px all five routes line up at nav and h1 x 377 and label and footer x 169. At 390px all five routes are unchanged: label above the h1 at x 16, header 41px and sticky (top 0 after scroll), four nav labels on one row inside the viewport, no menu control, no horizontal overflow. At 1440px: label left of the h1 on every route, header 53px and sticky, no horizontal overflow. Screenshots reviewed for `/contact` and `/experience` at 1440px and the project page at 390px.
- Verified: `npm run check` 0 errors, 0 warnings, 0 hints; `npm run build` succeeds and the built CSS contains `scrollbar-gutter:stable`.
- No redesign, no new sections, `src/content` and Astro `site` not touched. Nothing committed.

### 2026-10-01 — Claude (Opus 5.5)

- PLAN.md task 12 done: accessibility pass on `/`, `/projects`, `/projects/placeholder-project-1`, `/experience`, and `/contact` in headless Edge at 1440×900, against the dev server.
- Checked on every route, before and after the fixes:
  - axe-core 4.13 (installed in the session scratch folder, not in the project), tags `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa`, `best-practice`: 0 violations and 0 incomplete, both runs.
  - Landmarks: one `header` (banner), one `nav` labeled "Main", one `main`, one `footer` (contentinfo); `lang="en"`.
  - Headings: exactly one `h1` per page, no skipped levels (Home 1-2-3-3-3, Projects 1-2-2-2, project 1-2-2-2, Experience 1-2-3-2-3-2-3-2, Contact 1).
  - Keyboard: first Tab stop is "Skip to content", visible when focused. Walked every Tab stop: each shows a solid 2px ink `rgb(244, 240, 230)` ring, none uses the accent.
  - Decorative rules: every `border-accent` rule has `aria-hidden="true"` (Projects has none).
  - Text colors in use: only ink and muted. Ink is 16.58:1 and muted 8.85:1 on ground (AA needs 4.5:1). Hairline is used only in borders; no `text-hairline` or `text-accent` anywhere.
  - Reduced motion (emulated): Home has 0 animations 60ms after load, h1 word spans at opacity 1 and transform none; screenshot shows the name fully readable.
- Failures found and fixed:
  - Skip link did not move focus: Enter set `#main` but `document.activeElement` stayed `<body>`. Fix in [src/layouts/Base.astro](src/layouts/Base.astro): `<main id="main" tabindex="-1" class="outline-none …">`. After: Enter focuses `MAIN#main` with no outline, and the next Tab goes to the first link in the content.
  - Document titles were not unique across the site's naming pattern. Fix in `Base`: `title` is optional and the document title is composed from the profile name. Home dropped its `title` prop ([src/pages/index.astro](src/pages/index.astro)). Built titles: "Ross Champlin", "Projects · Ross Champlin", "Placeholder project 1 · Ross Champlin" (and 2 and 3), "Experience · Ross Champlin", "Contact · Ross Champlin".
- Updated stale lines in Current about titles and the `Base` call.
- Verified: `npm run check` 0 errors, 0 warnings, 0 hints; `npm run build` succeeds.
- No redesign. `src/content` and Astro `site` not touched. Nothing committed.

### 2026-10-01 — Claude (Opus 5.5)

- Added the page transition from DESIGN.md ("Astro view transitions under 300ms"). Not a PLAN.md task; nothing in PLAN.md was marked, and task 13 is still next.
- [src/layouts/Base.astro](src/layouts/Base.astro): `import { ClientRouter } from "astro:transitions"` and `<ClientRouter />` in `<head>`, so every page that uses `Base` (all of them) navigates client-side. `<html transition:animate={pageTransition}>`, typed `TransitionDirectionalAnimations`: forwards and backwards both `astroFadeOut` (old) and `astroFadeIn` (new) with `duration: "var(--duration-page)"`, `easing: "var(--ease-out-quart)"`, `fillMode: "both"`. One fade of the whole page. No slide, scale, second stagger, or animation library.
- [src/styles/global.css](src/styles/global.css): `::view-transition-group(*)` gets `animation-duration: var(--duration-page)` and `animation-timing-function: var(--ease-out-quart)`, so the browser's group animation does not run its default 250ms. The existing reduced-motion rule was already in place and still overrides it with `!important`.
- Verified in headless Edge at 390×844 and 1440×900, clicking Home → Projects in the nav and then pressing Back:
  - Motion allowed: both directions are client-side swaps (no full reload). Recorded view-transition animations: `::view-transition-old` `astroFadeOut`, `::view-transition-new` `astroFadeIn`, and the group, each 240ms with computed timing `cubic-bezier(0.25, 1, 0.5, 1)`. Mid-transition screenshots at about 120ms show the old page fading out under the new one. Nav `aria-current` and the document title update.
  - Back to Home: the h1 stagger replays (`rise` 0ms and 80ms, 240ms each), unchanged.
  - Reduced motion emulated: both directions swap with zero view-transition animations and no stagger.
  - Keyboard after a client-side navigation: the first Tab is "Skip to content", and Enter focuses `MAIN#main`.
- `npm run check` 0 errors, 0 warnings, 0 hints; `npm run build` succeeds. The build adds one script, `ClientRouter` (16,357 bytes), the only JS on the site.
- `src/content`, colors, type, and Astro `site` not touched. Nothing committed.

### 2026-10-01 — Claude (Opus 5.5)

- Motion pass at Ross's request, to the level of the fluidity references (Cuberto, Fuselab, Linear, Stripe). Not a PLAN.md task; nothing in PLAN.md was marked, and task 13 is still next. The earlier "one fade only" notes are history; Current and DESIGN.md "Motion" now describe the following.
- Page change. [src/layouts/Base.astro](src/layouts/Base.astro): the whole-page cross-fade is replaced. `<html transition:animate>` now runs `page-leave` and `page-arrive` (in [src/styles/global.css](src/styles/global.css)) on `--duration-page` and `--ease-out-quart`. [SiteHeader](src/components/SiteHeader.astro) and [SiteFooter](src/components/SiteFooter.astro) have `transition:name` plus `transition:animate="none"`, so they hold still. `::view-transition` has the ground background.
- Home first load. [src/pages/index.astro](src/pages/index.astro): `data-intro` with `--intro-delay` on the name words, the oxide rule (`draw`), role, bio, note, and Selected work. `Base` has a new `intro` prop for the section label, and [SectionLabel](src/components/SectionLabel.astro) now passes extra attributes through. Gated to real first loads by `data-nav="client"`, set in `astro:before-swap`. The old `.stagger` style is removed.
- Scroll reveals. A small inline script in `Base` handles `data-reveal` on `astro:page-load`: below-fold elements only, once each, through an IntersectionObserver, nothing under reduced motion. Marked: project rows (Home, `/projects`), the project page's Problem, What was built, details, links, image, and Commentary, Experience section labels, rows ([ExperienceRow](src/components/ExperienceRow.astro)), and Resume, and the Contact list.
- Project rows. [src/components/ProjectRow.astro](src/components/ProjectRow.astro): new `.row-rule` and `.row-accent` spans (the hairline moved off the `li` border onto `.row-rule`), with the title text in an inline-block `.row-title` span. Hover (hover-capable devices), `:active`, and keyboard focus brighten the rule to muted and draw a 4rem oxide mark; from `md` up the title also moves by `--shift-hover` (4px). `global.css` dims `[data-page-accent]` (the Home name rule) to hairline meanwhile.
- New tokens in `@theme`: `--duration-reveal` 480ms, `--duration-hover` 180ms, `--shift-hover` 4px (0 under reduced motion). Colors, type, and layout unchanged; no glass, gradient, neon, cursor, or scroll hijacking.
- [DESIGN.md](DESIGN.md): rewrote "Motion" (including that the accent may travel to the active row) and added a dated note.
- Verified in headless Edge at 390×844 (touch emulation, `hover: none`) and 1440×900 on `/`, `/projects`, `/projects/placeholder-project-1`, `/experience`, `/contact`:
  - No horizontal overflow on any route, including while scrolling and with a row hovered or pressed. Nav on one row. Header sticky (top 0 after scrolling). Label above the h1 on the phone, left column on desktop.
  - Home first load: 8 animations (`rise` at 0, 80, 160, 360, 440, 520, and 600ms, and `draw` at 280ms, each 240ms), the last ending at 840ms. Every `data-intro` element at opacity 1 afterwards. A mid-sequence screenshot shows the label and name in and the rule drawing.
  - Home → Projects by clicking the nav: root `page-leave` and `page-arrive` 240ms with `cubic-bezier(0.25, 1, 0.5, 1)`. During the transition `::view-transition-old(site-header)` is `animation none, opacity 0` and `::view-transition-new(site-header)` is `animation none, opacity 1`, so the header does not fade or move; the footer is the same. The mid-transition screenshot shows the header steady. Projects → Home (client-side): 0 intro animations, `data-nav="client"`.
  - Reveals: `/experience` had 1 below-fold element pending at load on each width, cleared while scrolling, and not re-hidden after scrolling back up (0 pending, 0 transitions running, 0 elements below opacity 1). Other routes have nothing below the fold with placeholder content.
  - Desktop hover on row 2 (`/projects` and `/`): that row's title moves 4px, its rule turns muted `rgb(183, 177, 166)`, and its oxide mark scale is 1; rows 1 and 3 unchanged; on `/` the name rule turns hairline, so exactly one accent element is visible. Mouse away restores everything.
  - Phone press: a real finger `:active` could not be produced in headless Edge (synthesized taps did not reach the row; dispatched `touchstart` does reach the page). With `:active` forced on row 2 through DevTools: rule muted, oxide mark drawn, title not moved (below `md`), Home name rule dims, no overflow; released, it all restores, so no stuck state. Worth one check on a real phone.
  - Reduced motion: 0 intro animations, 0 view-transition animations (header and footer `none`), 0 pending reveals, hover title travel `0px`; everything visible.
- `npm run check` 0 errors, 0 warnings, 0 hints; `npm run build` succeeds. JS: `ClientRouter` bundle (16,357 bytes) plus a 639-byte inline module.
- `src/content` and Astro `site` not touched. Nothing committed.

### 2026-10-01 — Auto

- Ross said the performance pass is not needed right now.
- [PLAN.md](PLAN.md) task 13 is deferred. [HANDOFF.md](HANDOFF.md) next step is nothing queued. [AGENTS.md](AGENTS.md) technical log notes the same. Fonts and the motion scripts stay as they are. Left uncommitted because Ross commits.

### 2026-10-01 — Claude (Opus 5.5)

- Content round 1, from Ross's answers. Checked Ross's edits to `links.yaml` and `profile.yaml`: valid YAML and valid against the schema (check and build passed). Email and LinkedIn were still `placeholder: true` with no `href`, so they rendered as plain text; fixed below.
- Contact links as logos, at Ross's request ("the full URL, covered by a logo"). New [src/components/Icon.astro](src/components/Icon.astro): inline SVG email, GitHub, LinkedIn, and external-link icons from Bootstrap Icons 1.13.1 (MIT), no library or request. [links.yaml](src/content/links.yaml): all three live (`mailto:rosschamplin25@gmail.com`, `https://github.com/rchamp25`, `https://www.linkedin.com/in/ross-champlin/`), each with an `icon`. [contact.astro](src/pages/contact.astro): ruled list of logo plus label links, full address as hover title. [SiteFooter](src/components/SiteFooter.astro): logo-only links with `aria-label`.
- Projects: deleted `placeholder-project-1..3.md` from the working tree; added [mixtwin.md](src/content/projects/mixtwin.md) and [nailsbygabs.md](src/content/projects/nailsbygabs.md) (real titles, `featured: true`, orders 1 and 2, every other field a labeled placeholder, `placeholder: true`). Pages `/projects/mixtwin` and `/projects/nailsbygabs` build.
- Education: [content.config.ts](src/content.config.ts) adds optional `degree`, `major`, `expected`, `gpa`, `honors`, `involvement`; a real education entry needs degree, major, and end. [ExperienceRow](src/components/ExperienceRow.astro) renders them (school as title, "Degree, Major", "Expected <date> · GPA …", labeled Honors and Involvement lists). The education placeholder now shows each field as a placeholder.
- Resume: [experience.astro](src/pages/experience.astro) shows a button that opens `profile.resume.href` in a new tab once set; until then the placeholder label stays text.
- Photo: `public/images/profile/` (with `.gitkeep`) and an optional `profile.photo` field. Not rendered yet.
- New [src/content/README.md](src/content/README.md): how to fill in and add profile, links, projects, and experience entries.
- Verified: temporary test entry (real education with `expected`, GPA) rendered "Expected May 2028 · GPA 3.9 / 4.0"; a real education entry without degree failed the build with the schema message; a temporary resume `href` rendered the new-tab button. All test changes reverted (`profile.yaml` restored byte-identical from a backup, test file deleted). axe-core on `/`, `/projects`, `/projects/mixtwin`, `/experience`, `/contact`: 0 violations. Every Tab stop shows the ink ring (footer and resume transitions limited so the ring color does not animate). 390px and 1440px: no horizontal overflow, nav one row, label placement unchanged. `npm run check` 0/0/0; `npm run build` succeeds.
- Mistake caught and undone: one command ran `git rm --cached` on `placeholder-project-1.md`, staging a deletion. Unstaged immediately with `git restore --staged`; the index has nothing staged.
- Not changed: AGENTS.md "Decisions from Ross" still says email and LinkedIn are missing; left for Ross to update. Nothing committed.
- Follow-up, at Ross's request: updated AGENTS.md "Decisions from Ross" (contact line now lists the email, GitHub, and LinkedIn addresses and the logo-link rule) and "Content you must supply" (contact marked supplied), and added a dated technical log entry. Nothing committed.

### 2026-10-01 — Claude (Opus 5.5)

- Custom domain. Ross bought `rosschamplin.com` (nameservers `journey`/`lakas.ns.cloudflare.com`) and, with step-by-step help, added it in Vercel (main domain `rosschamplin.com`, `www` set to redirect) and in Cloudflare DNS (A `@` → `76.76.21.21`, CNAME `www` → `02a034b774e335d6.vercel-dns-017.com`, both DNS only).
- Verified from here: `rosschamplin.com` A record is `76.76.21.21`; `https://rosschamplin.com` returns 200 from Vercel with a valid certificate and serves the site (title "Ross Champlin"); `http://rosschamplin.com` redirects 308 to HTTPS.
- Open issues at the time of writing: `www.rosschamplin.com` does not resolve (NXDOMAIN on Cloudflare's and Google's resolvers), so the `www` CNAME is not saved in Cloudflare yet. `https://personal-site-pearl-tau-17.vercel.app` now returns Vercel `DEPLOYMENT_NOT_FOUND`; harmless for the custom domain, but that old address no longer works.
- Repo updated to the new domain: [astro.config.mjs](astro.config.mjs) `site: "https://rosschamplin.com"`; [AGENTS.md](AGENTS.md) Stack, Hosting, and Astro `site` decisions plus a log entry; [PLAN.md](PLAN.md) task 14 text; [README.md](README.md) one-line wording; HANDOFF Current. Earlier log entries that name the `vercel.app` host are history.
- `npm run check` and `npm run build` pass. Nothing committed.

### 2026-10-01 — Claude (Opus 5.5)

- Domain follow-up: `https://rosschamplin.com` serves the site; `http://` redirects 308 to HTTPS. `www.rosschamplin.com` still did not exist on Cloudflare's own nameservers (`journey`/`lakas`), so the `www` CNAME was not yet saved in Cloudflare DNS; told Ross the exact record. The old `*.vercel.app` host returns `DEPLOYMENT_NOT_FOUND`; nothing in config, pages, or Current references it any more (only dated log entries, kept as history).
- Built E, the title morph. [ProjectRow](src/components/ProjectRow.astro) row title and the [project page](src/pages/projects/[slug].astro) h1 span share `transition:name="project-<slug>"`.
- Built G, the scroll-linked margin. [Base.astro](src/layouts/Base.astro): new `sections` prop, a desktop running index ("On this page", numbered, current in ink) with a progress track, and a current-section script. [SiteHeader](src/components/SiteHeader.astro): phone progress rule. [global.css](src/styles/global.css): index styles, `scroll()`/`view()` animations under `@supports`, `fill-down`/`fill-across` keyframes, the `draw-rule` class, a header z-index during transitions, and reduced-motion hiding of the fills. Pages pass their sections and mark list rules `draw-rule`: [Home](src/pages/index.astro), [project page](src/pages/projects/[slug].astro), [Experience](src/pages/experience.astro), [Projects](src/pages/projects/index.astro), and [Contact](src/pages/contact.astro). [Measure](src/components/Measure.astro) passes attributes through.
- [DESIGN.md](DESIGN.md) Motion: added the title morph and running index, and widened the reduced-motion line; dated note added.
- Verified in headless Edge at 390×844 and 1440×900:
  - E: clicking the MixTwin title on `/projects` and on `/` runs `::view-transition-group(project-mixtwin)` (240ms) with old and new cross-fade, and the header group has z-index 1. Back morphs it home. A mid-transition screenshot shows the title settling into the headline.
  - G: on `/experience` the current index item goes 01 Education → 02 Roles → 04 Resume as the page scrolls, and the margin fill scales 0 → 0.33 → 0.66 → 1. On phones the header fill does the same and the index is hidden. The third Experience list rule draws from 0 to full on entering. Short pages (desktop Home, MixTwin) show an empty track.
  - axe: 0 violations on `/`, `/experience`, `/projects/mixtwin`. No horizontal overflow anywhere.
  - Reduced motion: no morph animation, fills hidden, rules fully drawn, current-section highlight still updates.
  - One reduced-motion run on desktop Home showed the click not navigating; 4 reruns all navigated (the previous Back had not settled), so it was a test timing flake.
- `npm run check` 0/0/0; `npm run build` succeeds. JS: `ClientRouter` (16,357 bytes) plus the inline module (1,316 bytes). Nothing committed.

### 2026-10-01 — Claude (Opus 5.5)

- `www.rosschamplin.com`: Ross had the Cloudflare CNAME fields swapped (name and target reversed); fixed by Ross. Afterwards Cloudflare's nameservers, Google (8.8.8.8), and Cloudflare (1.1.1.1) all resolve `www` to Vercel, and Vercel redirects it to `https://rosschamplin.com`. The Binghamton campus resolver (`bingnet2.cc.binghamton.edu`) kept serving a cached "does not exist" for a while; suggested switching the `www` redirect to 308 in Vercel.
- Sharing basics, Ross's pick. New [public/favicon.svg](public/favicon.svg) ("RC", Instrument Serif outlined with opentype.js, ink on ground) and [scripts/make-share-images.mjs](scripts/make-share-images.mjs) (`npm run share-images`), which wrote `public/favicon-32.png`, `public/favicon.ico`, `public/apple-touch-icon.png`, and `public/og.png` (1200×630: mono "rosschamplin.com", name in Instrument Serif, oxide rule, role in Newsreader, hairline frame). New [public/robots.txt](public/robots.txt).
- [Base.astro](src/layouts/Base.astro): `description` prop and head tags (description, canonical, theme-color, icons, sitemap link, Open Graph, X/Twitter card), plus `<Analytics />`. Pages pass descriptions: [Projects](src/pages/projects/index.astro), [project page](src/pages/projects/[slug].astro), [Experience](src/pages/experience.astro), [Contact](src/pages/contact.astro); Home uses the default. [astro.config.mjs](astro.config.mjs): `@astrojs/sitemap` with trailing slashes stripped. New dependencies: `@astrojs/sitemap` 3.7.4, `@vercel/analytics` 2.0.1. [src/content/README.md](src/content/README.md): rerun `npm run share-images` after changing name or role.
- Verified with `astro preview` (production build) in headless Edge: every page has a unique title, description, canonical (`https://rosschamplin.com`, `/projects`, `/projects/mixtwin`, `/experience`, `/contact`), and `og:image` `https://rosschamplin.com/og.png`; no console errors or exceptions; only failed request is the expected local 404 for `/_vercel/insights/script.js` (exists only on Vercel once enabled). `window.va` loaded; a Home → Projects client-side click queued a second page view. Icons, `og.png`, `robots.txt`, `sitemap-index.xml`, and `sitemap-0.xml` all served 200 with correct types. Sitemap lists the six pages without trailing slashes. Rendered images reviewed.
- `npm run check` 0/0/0; `npm run build` succeeds. Nothing committed. Ross still has to enable Web Analytics in Vercel.

### 2026-10-01 — Claude (Opus 5.5)

- Graphite dust background, Ross's choices: graphite dust concept, every page behind content, noticeable, touch and scroll on phones; ink and muted only (no oxide), no cursor trail, no click burst; switch off on frame drops but tuned not to need it.
- New [src/components/GraphiteDust.astro](src/components/GraphiteDust.astro), rendered first in `<body>` by [Base.astro](src/layouts/Base.astro). `<body>` lost `bg-ground` so the canvas (`z-index: -1`) shows through; `<html>` still paints the ground. [global.css](src/styles/global.css): `::view-transition-group(graphite-dust) { z-index: -1 }`. Details are in Current → Gotchas → Graphite dust.
- Fixes during testing: the watchdog's page-change pause first used a class on `<html>`, which Astro's root attribute swap would wipe, so it became a module variable. The canvas was first sized from `innerWidth` (1440) while drawn at 1425 because of the scrollbar gutter, which stretched specks about 1%; it is now sized from its own box. Visibility was raised after the first screenshots (open-area alpha 0.55 → 0.7, dim 0.28 → 0.35, 2px specks 18% → 28%, drift 0.05–0.22 → 0.08–0.3 px per frame).
- Verified in headless Edge at 390×844 (touch emulation, DPR 3) and 1440×900: canvas fixed, `z-index: -1`, bitmap matches its box (585×1266 at DPR cap 1.5; 1425×900). About 60fps; about 0.1–0.2ms of script and about 2ms of total task time per frame (software rendering). Max speck alpha behind the h1 0.14 vs about 0.5–0.7 in open areas. Holding the mouse or a finger on an open spot cleared it (about 20–32 lit pixels to 0) and it refilled within about 4s on the phone. Page change: same canvas element before and after (`transition:persist`), one canvas, `::view-transition-group(graphite-dust)` z-index -1 with no animation during the transition, still animating afterwards. Reduced motion: still frame (0 pixels changing), no pointer response, persists across pages. Watchdog: with about 45ms burned per frame it cleared the canvas, set `sessionStorage["graphite-dust-off"]`, and stayed off on the next page. axe: 0 violations on all five pages; new "needs review" color-contrast items come from the canvas behind text; computed worst case is muted 6.99:1 and ink 13.09:1 over a dim speck. First Tab stop is still the skip link. No horizontal overflow; no exceptions.
- Docs brought up to date, at Ross's request: HANDOFF Current rewritten into State, In progress, Next, and topic Gotchas (the old single-line Current is replaced; this log is unchanged). [AGENTS.md](AGENTS.md): rules for Ross's direct requests, Stack (motion script, dust canvas, integrations), Decisions (look and motion level, dust, photo-only Home visual, analytics, resume button, growing content), site map, content list, folder map, log entry; removed the stale "no custom domain" line. [PLAN.md](PLAN.md): fixed the stale `/content` path, refreshed task 13, marked task 14 done (static `dist`, no adapter, domain live, `site` set, README names the URL), updated routes, added "Beyond the plan" (done and open). [DESIGN.md](DESIGN.md): Direction, accent may travel, dust is muted only, font sources, Home layout, Motion (dust, reduced motion, tools), custom-cursor note, dated note. [README.md](README.md): kept Ross's line, added run commands and where things live. All five docs keep CRLF line endings.
- JS shipped now: `ClientRouter` 16,357 bytes plus inline modules: graphite dust 3,590, analytics loader 2,817, motion 1,285.
- `npm run check` and `npm run build` pass (rerun after the doc edits). Nothing committed.

### 2026-10-02 — Claude (Opus 5.5)

- Ross added `RossChamplin2026Resume.pdf`, `RossChamplinTechnicalResumeUpdated.pdf`, `BallTuxFull.JPEG`, and `BallTuxFullZoomedOut.JPEG` to `src/content`. His instructions: leave out TOPSoccer (not started), the first project on the technical resume (AP Water Quality Data Processor), and the technical skills (outdated); use the photo that is not zoomed out, cropped so it is not full body, styled after matthewgresock.com.
- Experience ([src/content/experience](src/content/experience)): removed the three placeholders; added `binghamton-university` (B.S. Computer Science, Watson College, expected May 2029, Dean's List, intramural soccer) and `webster-schroeder-high-school` (diploma June 2025, GPA 96.47/100 unweighted, Summa Cum Laude, Regents with Distinction, AP Scholar Award, Link Crew, Wind and Jazz Ensemble); roles `junior-site-assistant` (WonderCare, Nov 2024 to now) and `summer-camp-counselor` (Webster Parks and Recreation, Jun 2023 to Aug 2026); achievements `varsity-athletics`, `lakefront-soccer-club`, `national-honor-society`, `tri-m-music-honor-society`, `best-buddies`, `community-service`. Wording is the resumes', with small edits: "Lead" to "Led" for the camp, captaincies from the general resume merged into the soccer and lacrosse lines, "the" added in two places. No address, phone, or school email anywhere.
- Schema ([src/content.config.ts](src/content.config.ts)): education `major` is optional (a real education entry needs `degree` and `end`); `profile.photo` now uses Astro's `image()` with a path relative to `profile.yaml`. [ExperienceRow](src/components/ExperienceRow.astro) shows `org` for education too.
- MixTwin ([src/content/projects/mixtwin.md](src/content/projects/mixtwin.md)): summary "A DJ set planning assistant.", Full-Stack Developer, Jan–Mar 2026, stack React, Vercel, Spotify API, Web Audio, and a body from the resume bullets. Still `placeholder: true` because its kind and problem are unknown.
- Photo: cropped `BallTuxFull.JPEG` (2268×4032) to a 4:5 head-to-waist frame (x 248, y 300, 1700×2125), resized to 1200×1500, metadata stripped (the original had EXIF), saved as [src/content/images/ross-champlin.jpg](src/content/images/ross-champlin.jpg) (288 KB). Home renders it with `<Picture>` (AVIF and WebP at 480, 720, 960, 1200; served files 20–174 KB), `loading="eager"`, `fetchpriority="high"`. Styling after matthewgresock.com: no frame, `contrast(1.04) brightness(0.9) saturate(0.9)`, mask fades on every edge (stronger left and bottom). Layout: from `lg` a right column (22rem, 26rem from `xl`) beside the text; on phones full width above the name. It joins the first-load sequence at 200ms. Removed the unused `public/images/profile/`.
- Docs: [src/content/README.md](src/content/README.md) (photo and education), [DESIGN.md](DESIGN.md) (Home visual), [AGENTS.md](AGENTS.md) (Home visual, site map, content list, log), [PLAN.md](PLAN.md) (open items), and this file's Current.
- Verified in headless Edge at 390×844 and 1440×900: photo 390×488 edge to edge above the name on the phone, 416×520 beside the text on desktop, AVIF served; Experience shows Education (2), Roles (2), Achievements (6), Resume; MixTwin shows role, dates, and stack; no horizontal overflow; no exceptions. `npm run check` 0/0/0; `npm run build` succeeds. Nothing committed.

### 2026-10-02 — Claude (Opus 5.5)

- Ross's answers: publish the technical resume; MixTwin is a personal project for beginners struggling to build DJ sets, with his plain-language description to be replaced by a technical one later; the photo should be bigger, "more persistent", cut less close above the head, and more vivid; keep the original photos and general resume out of the repo; summer camp stays Jun 2023 – Aug 2026; WonderCare stays ongoing (he works during breaks).
- Resume: moved `src/content/RossChamplinTechnicalResumeUpdated.pdf` to `public/Ross-Champlin-Resume.pdf`; `profile.resume` is `label: Resume (PDF)`, `href: /Ross-Champlin-Resume.pdf`. The Experience button opens it in a new tab (verified: a new page target opens and the tab stays on `/experience`). It shows Ross's phone and school email; that was his choice.
- [.gitignore](.gitignore): `src/content/BallTuxFull.JPEG`, `src/content/BallTuxFullZoomedOut.JPEG`, `src/content/RossChamplin2026Resume.pdf`. They were already committed in `5fb039e` (pushed; the GitHub repo answers 404 to unauthenticated API and raw requests, so it appears private), so the ignore alone does not remove them; Ross is to run `git rm --cached src/content/BallTuxFull.JPEG src/content/BallTuxFullZoomedOut.JPEG src/content/RossChamplin2026Resume.pdf` and commit. They stay in history unless the history is rewritten. Agents did not touch the index.
- MixTwin ([src/content/projects/mixtwin.md](src/content/projects/mixtwin.md)): `kind: personal`, problem "Putting together DJ sets is a struggle for beginners.", summary "A DJ set planning assistant for beginners.", `placeholder: false`; body is Ross's description (spelling fixed: analyzed, determine, beat pattern, structure, certain, environment, windowed, rekordbox) followed by the resume bullets. A `NEEDS REWRITE` comment at the top marks it for his technical version.
- Photo: re-cropped `BallTuxFull.JPEG` at 2:3 (x 248, y 60, 1700×2550; about 16% headroom above the hair, down to just past the hands), 1200×1800, metadata stripped, 350 KB source. Home: from `lg` a 26rem (30rem from `xl`) column at `min(100svh - 10rem, 46rem)` tall, `object-cover object-top`; phones `aspect-[3/4]`, full width. Filter now `contrast(1.06) saturate(1.15)` (was `contrast(1.04) brightness(0.9) saturate(0.9)`, which made it look dull; the crop itself kept the original's color, checked by mean saturation 0.29 in both). Measured: desktop 480×736, phone 390×520.
- Docs: [src/content/README.md](src/content/README.md), [DESIGN.md](DESIGN.md), [AGENTS.md](AGENTS.md), [PLAN.md](PLAN.md), and this file's Current.
- `npm run check` 0/0/0; `npm run build` succeeds. No horizontal overflow or exceptions at 390px and 1440px. Nothing committed.
- Follow-up: Ross confirmed "more persistent" meant bigger and more dominant, as built, not pinned while scrolling. No change to the page.

### 2026-10-02 — Claude (Opus 5.5)

- At Ross's request, made the Home photo fades sharper ([src/pages/index.astro](src/pages/index.astro)): phones top 6% to 2% and bottom 30% to 12%; from `lg` left 22% to 8%, right 8% to 3%, top 8% to 2%, bottom 28% to 12%. [DESIGN.md](DESIGN.md) Home line updated. Checked at 390px and 1440px; `npm run check` 0/0/0, `npm run build` succeeds. Nothing committed.

### 2026-10-02 — Claude (Opus 5.5)

- Ross removed the Home photo: it looked poorly filtered and he looked pale. Deleted `src/content/images/ross-champlin.jpg` (and the empty folder) and the `photo` entry in [profile.yaml](src/content/profile.yaml), which now carries a "PHOTO TO BE REPLACED" comment with the shape of the new entry. The original `BallTuxFull.JPEG` stays local and ignored.
- [src/pages/index.astro](src/pages/index.astro): the intro grid is always two columns from `lg`. With no photo, a hairline-bordered frame labeled "Placeholder: new photo coming" (mono, muted) takes the photo's place: full photo height on desktop, 16:9 on phones. Adding a `photo` entry renders the photo again with no code change (the `<Picture>` branch, crop pinned to the top, mask fades, and filter are unchanged).
- Docs: [src/content/README.md](src/content/README.md), [DESIGN.md](DESIGN.md), [AGENTS.md](AGENTS.md), [PLAN.md](PLAN.md), and this file's Current.
- Verified at 390px and 1440px: placeholder frame 358×201 above the name on the phone, 480×736 beside the text on desktop; no horizontal overflow; no exceptions. `npm run check` 0/0/0; `npm run build` succeeds with no photo assets generated. Nothing committed.

### 2026-10-02 — Claude (Opus 5.5)

- Ross added `src/content/professional-headshot-ross` (a PNG with no extension, 1254×1254, sRGB, no EXIF): a studio headshot on a gray backdrop. Added it to [.gitignore](.gitignore); the site uses a processed copy.
- The hair started at row 49 of 1254, too tight at the top. Extended the backdrop upward by 180px: a straight copy of the top row left vertical streaks and a seam, so the extension is the per-column average of the 40 backdrop rows above the hair, box-blurred sideways (radius 30, three passes), with fine seeded grain, feathered into the original's first 36 rows. Result: [src/content/images/ross-headshot.jpg](src/content/images/ross-headshot.jpg), 1200×1372, 151 KB, no metadata. The processing script was a one-off in the session scratch folder (not in the repo).
- [profile.yaml](src/content/profile.yaml) has the `photo` entry again. [src/pages/index.astro](src/pages/index.astro): no color filter now (the photo is shown as shot); desktop frame `lg:aspect-[4/5]` (480×600 at 1440px) instead of the full-height strip, which would have cut the square headshot's shoulders; phones stay 3:4 (390×520); crisp fades unchanged; the placeholder branch stays for a missing photo.
- Docs: [src/content/README.md](src/content/README.md), [DESIGN.md](DESIGN.md), [AGENTS.md](AGENTS.md), [PLAN.md](PLAN.md), and this file's Current.
- Verified at 390px and 1440px: filter `none`, pinned to the top, sizes as above, no horizontal overflow, no exceptions. `npm run check` 0/0/0; `npm run build` succeeds (12 generated image files). Nothing committed.
- Line endings: `core.autocrlf` is true, so git normalizes on commit. Files in the working tree are a mix of CRLF and LF, each file consistent within itself; keep it that way when editing. In this Git Bash, counting carriage returns with grep is unreliable; count with Node (match `\r\n` with a regex) instead.

### 2026-10-02 — Claude (Opus 5.5)

- Ross wants the original headshot used, for full quality. Moved `src/content/professional-headshot-ross` to [src/content/images/ross-headshot.png](src/content/images/ross-headshot.png) unchanged (SHA-1 `1cebebae8d04b4793c9624f8e8a222691263a0a0` before and after; the extension lets Astro read it); deleted the edited `ross-headshot.jpg`; removed the PNG's line from [.gitignore](.gitignore); `profile.photo.src` is `./images/ross-headshot.png`.
- [src/pages/index.astro](src/pages/index.astro): `<Picture>` widths 480, 720, 960, 1254 at `quality={90}`. `sizes` now gives the rendered width, not the column width: the square photo fills a taller frame (4:5 from `lg`, 3:4 below), so it draws 1.25× or 1.33× wider than its column; with the old `sizes` desktop picked the 480w file and upscaled it to 600px. Now desktop at DPR 1 gets 600×600 and the phone 518×518; high-density screens get up to the full 1254px. Generated files: AVIF 37–220 KB, WebP 26–146 KB, PNG fallbacks 114–709 KB for old browsers.
- Trade-off: without the extended backdrop the hair sits about 23px from the top of the desktop frame (the original has 49px of 1254 above the hair). Ross chose the original.
- Docs: [src/content/README.md](src/content/README.md), [DESIGN.md](DESIGN.md), [AGENTS.md](AGENTS.md). Verified at 390px and 1440px: no overflow, no exceptions. `npm run check` 0/0/0; `npm run build` succeeds. Nothing committed.

### 2026-10-02 — Claude (Opus 5.5)

- At Ross's request the Home photo keeps its square shape: [src/pages/index.astro](src/pages/index.astro) uses `aspect-square` at every width (was `aspect-[3/4]` on phones and `lg:aspect-[4/5]` on desktop, which cropped the square headshot's sides) and drops `object-top`. `sizes` is the plain column width again ("(min-width: 1280px) 30rem, (min-width: 1024px) 26rem, (min-width: 640px) 36rem, 100vw"), since the photo now draws exactly as wide as its column. The whole original shows, including its 49px above the hair.
- Measured: desktop 480×480 (480w source at DPR 1), phone 390×390; no overflow; no exceptions. Docs: [DESIGN.md](DESIGN.md), [src/content/README.md](src/content/README.md), [AGENTS.md](AGENTS.md). `npm run check` 0/0/0; `npm run build` succeeds. Nothing committed.

### 2026-10-02 — Claude (Opus 5.5)

- At Ross's request: removed the Home photo's edge fade (the page's `<style>` block held only the mask, so it is gone), then, from his follow-up, outlined the photo with a 2px oxide border matching the rule under his name ([src/pages/index.astro](src/pages/index.astro): `border-2 border-accent` and `data-page-accent` on the photo wrapper; the edge-to-edge `-mx-4` on phones was dropped so the border sits inside the page margins).
- This is a second accent on Home, against DESIGN.md's once-per-view rule, chosen by Ross; DESIGN.md now records it as the one exception. Because the frame carries `data-page-accent`, the existing rule in global.css dims it to hairline with the name rule while a project row is hovered: verified (both `rgb(224, 122, 74)` at rest, both `rgb(44, 41, 36)` on hover, back after).
- Measured: desktop image 476×476 inside the 2px border, phone 354×354; no overflow; no exceptions. Docs: [DESIGN.md](DESIGN.md), [AGENTS.md](AGENTS.md), this file's Current. `npm run check` 0/0/0; `npm run build` succeeds. Nothing committed.

### 2026-10-02 — Claude (Opus 5.5)

- Ross asked for the oxide around his headshot and under his name to stay on during project hover, and for Home to lose its left-side "tabs" (the HOME label and the 01/02 running index), since the header nav covers navigation.
- [src/layouts/Base.astro](src/layouts/Base.astro): `label` is optional; without it the margin column (label, running index, desktop progress track) is not rendered and `<main>` is not a two-column grid. Removed the `intro` prop (it only staged the label in Home's first load). Other pages are unchanged: verified `/projects` and `/experience` still show their labels, Experience its 4-item index, and their h1 at x 377.
- [src/pages/index.astro](src/pages/index.astro): `<Base>` with no props; removed the `sections` list and both `data-page-accent` attributes; updated comments (first-load sequence: name 80/160ms, photo 200ms, rule 280ms, role, bio, note, Selected work 600ms). [global.css](src/styles/global.css): removed the `[data-page-accent]` dimming rules (no other users). [ProjectRow](src/components/ProjectRow.astro) comment updated.
- Verified in headless Edge: on Home at 1440px the name rule and photo frame are `rgb(224, 122, 74)` at rest, during row hover (the row's oxide mark draws), and after; Home h1 at x 169, matching the header name; no overflow at 390px or 1440px; no exceptions. Docs: [DESIGN.md](DESIGN.md) (accent exception, page shell, project rows), [AGENTS.md](AGENTS.md), this file's Current. `npm run check` 0/0/0; `npm run build` succeeds. Nothing committed.

### 2026-10-02 — Claude (Opus 5.5)

- At Ross's request, removed the left margin column from [Projects](src/pages/projects/index.astro) and [Contact](src/pages/contact.astro) by no longer passing `label` to `Base`. Verified at 1440px: both h1 at x 169, matching the header name (Experience and MixTwin stay at x 377 with their labels and indexes); the projects list spans 1088px; the contact list keeps its 572px measure; no overflow at 390px or 1440px. Docs: [DESIGN.md](DESIGN.md), [AGENTS.md](AGENTS.md), this file's Current. `npm run check` 0/0/0; `npm run build` succeeds. Nothing committed.

### 2026-10-02 — Claude (Opus 5.5)

- Ross's request: add BingMCP (placeholder for now) and this site as projects, both featured, with Home showing four; give NailsByGabs an active link to its live site from the project page title, opening in a new tab (Ross chose: rows still go to the project page; the project page title goes to the live site).
- New [src/content/projects/bingmcp.md](src/content/projects/bingmcp.md) (`placeholder: true`, order 3) and [src/content/projects/personal-site.md](src/content/projects/personal-site.md) (real, order 4): written from the build (Astro 7, strict TypeScript, content collections with schema checks, Tailwind v4 tokens, self-hosted fonts, ClientRouter transitions, title morph, scroll-driven index, graphite dust canvas, accessibility, image pipeline, sitemap, analytics, Vercel with Cloudflare DNS). Role reads "Design direction and development, built with Claude Code"; flagged for Ross to review. No repo link (the repo is private) and no live-site link (visitors are already on it).
- [src/content/projects/nailsbygabs.md](src/content/projects/nailsbygabs.md): `demo: http://nailsbygabs.com`. Checked 2026-10-02: `https://nailsbygabs.com` fails the TLS handshake (curl schannel error 35, Edge `ERR_CONNECTION_CLOSED`); `http://` returns 200 from nginx 1.20.1 at 85.10.206.21 with only a bare "Nails by Gabs" heading. Told Ross.
- [src/pages/projects/[slug].astro](src/pages/projects/[slug].astro): with a `demo`, the h1 is a link to it (new tab, `rel="noopener"`, thin 2px underline inherited by the inline-block title span, ↗ icon, screen-reader "(live site, opens in a new tab)"); the title span keeps its `transition:name`, and the morph from rows still runs (verified from `/projects` and `/`). Links list: "Demo" relabelled "Live site"; Repository and Live site open in a new tab with a ↗ icon and "(opens in a new tab)". [src/pages/index.astro](src/pages/index.astro): `slice(0, 4)`.
- Verified at 390px and 1440px: Home and `/projects` list MixTwin, NailsByGabs, BingMCP, Personal Site linking to their pages; clicking the NailsByGabs title opens one new tab and leaves the page; axe 0 violations on `/`, `/projects/nailsbygabs`, `/projects/personal-site`; no overflow. A first morph check failed only because the new tab left the test page hidden (the browser aborts transitions on hidden documents); rerun without it passed. `npm run check` 0/0/0; `npm run build` succeeds. Nothing committed.

### 2026-10-02 — Claude (Opus 5.5)

- Ross's request: on Projects show each project's full breakdown instead of needing to open it, underline every project name in oxide at all times, and have no cursor-activated components there; on Contact keep the text where it is and add his headshot in equal proportion to the contact text.
- New [src/components/ProjectBreakdown.astro](src/components/ProjectBreakdown.astro), moved out of [src/pages/projects/[slug].astro](src/pages/projects/[slug].astro) (which now uses it; unchanged in output). [src/pages/projects/index.astro](src/pages/projects/index.astro) renders all four projects as articles: h2 name with an oxide underline (not a link), then the breakdown. No `ProjectRow` there, so no hover rows and no title morph from `/projects`; links inside a breakdown (NailsByGabs "Live site") keep the standard link hover underline.
- [src/components/GraphiteDust.astro](src/components/GraphiteDust.astro): `data-cursor-calm` makes the dust ignore the mouse; `/projects` sets it. I read "no cursor activated components" as including the dust; Ross can say if he only meant the rows.
- New [src/components/Headshot.astro](src/components/Headshot.astro), shared by Home and [src/pages/contact.astro](src/pages/contact.astro). On Contact the text column is unchanged (h1 at x 169); from `lg` the photo sits beside it at 351×351, the text block's height; on phones it is full width below the links (358×358).
- Verified in headless Edge at 390px and 1440px: four articles on `/projects`, each name underlined `rgb(224, 122, 74) 2px`, no title links, no duplicate ids; dust under a moving cursor on `/projects` unchanged; all sections reveal on scroll and rules draw; axe 0 violations on `/projects`, `/contact`, `/`, `/projects/nailsbygabs`; no overflow; no exceptions. Docs: [DESIGN.md](DESIGN.md), [AGENTS.md](AGENTS.md), [PLAN.md](PLAN.md), this file's Current. `npm run check` 0/0/0; `npm run build` succeeds. Nothing committed.

### 2026-10-02 — Claude (Opus 5.5)

- Ross reversed the Projects dust change: "the dust will persist on all pages forever." Removed `data-cursor-calm` from [src/components/GraphiteDust.astro](src/components/GraphiteDust.astro) and the wrapper from [src/pages/projects/index.astro](src/pages/projects/index.astro) (comment updated). Projects keeps its full breakdowns, oxide-underlined names, and no hover rows.
- Docs: [DESIGN.md](DESIGN.md), [AGENTS.md](AGENTS.md) (Decisions: dust on every page, no opt-out), this file's Current.

### 2026-10-02 — Claude (Opus 5.5)

- Ross's requests: remove Claude Code's credit from the Personal Site project; make the rule between projects on `/projects` brighter than the rules inside a project; on desktop center the Projects information and widen it (a shorter page is fine); and ideas for eye-catching logos or graphics on Projects (ideas only, nothing built).
- [src/content/projects/personal-site.md](src/content/projects/personal-site.md): role is now "Design direction and development"; the source comment no longer asks for review.
- [src/pages/projects/index.astro](src/pages/projects/index.astro): project dividers are muted (`rgb(183, 177, 166)`), inner rules stay hairline (`rgb(44, 41, 36)`); new `.draw-rule-strong` in [global.css](src/styles/global.css). [src/components/ProjectBreakdown.astro](src/components/ProjectBreakdown.astro): `wide` prop for the two-column layout; `Measure` replaced by two `max-w-measure` blocks, so project pages look the same.
- Verified in headless Edge: at 1440px each project spans 169–1257px (story 572px, facts 452px), page height 3626 → 3182px; at 390px one column, no overflow; Personal Site shows no "Claude" text; axe 0 violations on `/projects`, `/projects/personal-site`, `/projects/mixtwin`; no exceptions. Docs: [DESIGN.md](DESIGN.md), [AGENTS.md](AGENTS.md), [PLAN.md](PLAN.md), this file's Current. `npm run check` 0/0/0; `npm run build` succeeds. Nothing committed.
