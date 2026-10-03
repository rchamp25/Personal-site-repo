Refrence sites:

Flashy/UI Fluidity
    https://linear.app
    https://stripe.com
    https://wickret.cuberto.com/
    https://www.iota.org/

Smoothness:
    https://convertify.com/
    https://fuselabcreative.com/

Utility (Not overly complicating things):
    https://www.royalcaribbean.com/ultimate-world-cruise
    https://www.airbnb.com/
    https://www.lemonade.com/
    https://www.paypal.com/us/home
    https://www.gatsbyjs.com/

The above are some reference sites that I enjoyed the UI and components of. The reasoning for the separate types of sites is because of the nature of the site we're producing. The aim of the site is to produce something that is visually impressive, has flares of personality, doesn't appear to be a generic AI generated site but rather an actual work of art, and is entirely functional and has the ultility of being a personal project and resume site. Mobile versitlity is equally important to Desktop and both need to be entirely polished. 

AGENTS:

Direction: a dark lab notebook, closer to Linear and Iota in value (near-black ground, light type, thin lines) and as clear as the utility references (Airbnb, PayPal, Lemonade, Gatsby). The structure stays a written index: rules, a running margin, and prose. It is not a clone of Linear’s indigo product UI. Motion is short and physical, in the spirit of Linear, Stripe, and Cuberto: page change, Home's first load, scroll reveals, hover and press, a running index that follows the scroll, and a graphite dust background that answers the cursor. The page should feel written by a person, not assembled from a component kit. Mobile uses the same system, stacked. v1 is dark only. There is no theme toggle and no separate mobile theme.

## Color

- Ground: `#12110f` (page background; warm black, not cool slate)
- Ink: `#f4f0e6` (text)
- Muted: `#b7b1a6` (secondary lines such as dates). Verify WCAG AA before using it at small sizes.
- Hairline: `#2c2924` (dividers, index rules, borders)
- Accent: `#e07a4a` (oxide). Use it once per view: one marker or one rule. Exceptions, all Ross's choice: on Home and Contact his photo is framed in the same 2px oxide as the rule under the page title, and on Home both stay oxide at all times, including while a project row is hovered; on Projects every project name carries a permanent 2px oxide underline (the page has no other accent). Never as a large fill, and not as small body text unless contrast is checked and passes. While a project row is hovered, pressed, or focused, the accent draws on that row; on other pages that is the only moving use of it, and on Home it joins the rule and photo frame.
- Graphite dust uses muted only, dimmed behind text, never the accent.
- No second accent. No gradient fills. No light theme in v1.
- Exception, Ross's choice: the "What I've worked with" logos on Home are the brands' official full-color logos (white versions of black marks so they read on the ground). The palette rules above apply to everything else.

Text on ground must meet WCAG AA contrast. Ink on ground does. Links are ink with an underline, not oxide-colored words.

## Type

- Headlines: Instrument Serif
- Body: Newsreader
- Dates, tags, nav indexes, and other meta: IBM Plex Mono

Self-host the font files in `public/fonts`. Instrument Serif and Newsreader come from their official GitHub repositories (Fontshare does not carry them), and IBM Plex Mono from the official IBM Plex repository. Do not request fonts from Google Fonts or from any CDN at runtime.

Fallbacks, in order:

- Headlines: `"Iowan Old Style", "Palatino Linotype", Palatino, serif`
- Body: `Georgia, "Times New Roman", serif`
- Meta: `"Courier New", Courier, monospace`

Prose line length stays around 60–75 characters. Headlines can run wider. Do not set the whole page in mono.

## Layout

- Page shell: a wide left margin used as a running index (section number or short label). On small screens that index collapses into the section label above the content, not into a hamburger-only mystery. Home, Projects, and Contact have no margin column at all (Ross's choice: the header nav is the navigation there), so their content spans the full width, aligned with the name in the header. Experience and project pages keep the margin, since they carry a section index.
- Max content width about `72rem`. Prose sits in a narrower measure inside that.
- Header and footer use the same ink, hairline, and mono index. Header is sticky and compact on small screens.
- Projects index: every project's full breakdown on one page (summary, framed plate, problem, what was built, role, dates, stack, links, commentary), so nothing needs a click to read. Projects are separated by a muted rule, brighter than the hairlines inside each project, so one project reads apart from the next. From `lg` each breakdown spans the full page width in two columns: the story (problem, what was built) at the prose measure on the left, the plate and then the facts (role, dates, stack, links, commentary) on the right, under a full-width summary. Each project name is a large heading with a permanent 2px oxide underline. No hover rows; the graphite dust still answers the cursor, as on every page. Not a grid of equal rounded cards.
- Project plates: each project has one framed plate, a screenshot or, where the project's visual is its branding (NailsByGabs, Personal Site), its logo. A 16:10 frame with a 1px muted border on the ground color and a small mono caption ("MixTwin · Screenshot"); a screenshot fills it from the top, a logo sits centered with room around it. No accent on the plate. Until Ross supplies the file the frame shows "Placeholder: screenshot coming" (or logo). On phones the plate follows the summary.
- Project pages: summary, plate, problem, what was built, role, stack, links, dates. When a project has a live site, the page title itself links to it (thin underline, small ↗), as does a "Live site" link; external links open in a new tab.
- Home holds the name Ross Champlin, a one-line role, a short bio, a short personal note, up to four featured projects, and then "What I've worked with". Its visual is Ross's studio headshot, the unedited original at full quality: large, no color filter (shown as shot), no edge fade, outlined by a 2px oxide border that matches the rule under the name. The frame is square, like the photo, so nothing is cropped: from `lg` a 26–30rem square in the right column, so the name breaks onto two lines beside it; on phones a full-width square above the name. Without a photo, a labeled hairline placeholder frame holds its place. The top edge is pinned so the head never crops. Contact links live in the footer on every page. Home is not a second copy of every page.
- What I've worked with (Home, below Selected work): one block, no groups, of the languages, frameworks, tools, and services Ross has used, each as its official logo (40px on phones, 48px from `sm`) with its name under it in small mono muted type. Three across on phones, four from `sm`, six from `md`, eight from `lg`. Static, not links.
- Contact lists Email, GitHub, LinkedIn, and Resume as logo links in one ruled list (Resume opens the PDF in a new tab; the footer keeps the three contact links). It keeps its title, rule, and links where they were; the same framed headshot sits beside them from `lg`, a square exactly as tall as the text block, and below the links on phones.
- Project pages include an optional commentary field: the author’s own note, separate from the problem and what was built.
- Experience holds education, roles, and other life achievements that are not jobs. Each entry can include a short commentary.

## Motion

Short, physical, and in service of reading, at the level of the fluidity references (Cuberto, Fuselab, Linear, Stripe). The page always scrolls normally. Tokens: `--duration-page` 240ms, `--duration-reveal` 480ms, `--duration-hover` 180ms, `--ease-out-quart`, `--shift-hover` 4px.

- Page change: Astro view transitions (`ClientRouter`). The header and footer hold still. The page content leaves with a short rise and fade, and the next page arrives with a short rise and fade, on `--duration-page` and `--ease-out-quart`. No slide that moves the header.
- Title morph: a project's title is one shared element between its Home row and its page headline, so opening a project morphs the title into place, and going back morphs it home.
- Running index: on desktop the left margin lists the page's sections (numbered, mono). The one being read is ink, the rest muted, and a hairline track beside the list fills with page progress. On phones the progress runs along the header rule instead. List rules draw across as they scroll into view. All of it follows the scroll and never moves it.
- First load, Home only: one sequence, settled in under a second. The section label, the headline word by word, the oxide rule drawing to its width, then role, bio, and note, then Selected work. It does not replay on client-side visits. It is the only staggered load on the site.
- Scroll reveal: sections and rows that start below the fold settle in (a short rise and fade) as they enter the view, once. Nothing replays on scroll-up, and anything already in view at load is shown as is. Used on Home, Projects, project pages, and Experience; Contact reveals its list and photo once.
- What I've worked with: the logo under the pointer (or a pressing finger) lifts by the hover shift and grows to 1.06, its name brightens to ink, and every other logo dims to 40%, so the one in focus stands out. Reduced motion keeps the brightening and dimming, without movement.
- Project rows (Home only): on hover, press, or keyboard focus, the rule under the row brightens and the oxide accent draws along it. On Home the name rule and the photo frame stay oxide meanwhile (Ross's choice). From `md` up the title also moves a few pixels. Touch devices get the press state, never a hover that sticks.
- Graphite dust: a fixed canvas behind every page with fine muted specks that drift. The cursor (or a dragging finger) brushes them aside and they settle back; scrolling stirs them against its direction. This holds on every page, always (Ross's choice, 2026-10-02); no page opts out. No trail, no click burst, and the cursor itself never changes. Specks behind text are much dimmer so reading is never affected. It persists through page changes and switches itself off for the visit if the device cannot hold the frame rate.
- Other hover: underline, or image scale of `1.02`.
- Phones get the same ideas. Any move that would cause sideways overflow, hide the nav, or trap scrolling at 390px is dropped on small screens (for example, the row title does not move there).
- `prefers-reduced-motion: reduce` turns off the page change, the title morph, the first-load sequence, the scroll reveals, the progress fills, the rule drawing (rules show in full), the hover travel, and the image scale, and the graphite dust becomes one still frame. Content is fully visible; color changes on hover and press, and the running index's current section, stay.
- No animation library, no scroll hijacking, no custom cursor. CSS, Astro’s built-in view transitions, one small script (first-load gate, reveals, running index), and one hand-written canvas for the dust.

## Anti-patterns

Do not ship any of these:

- Inter, Roboto, Arial, or Space Grotesk as the design (fallbacks above are for load failure only)
- Purple-to-blue gradients, gradient text, or neon glow
- Three identical icon cards, or any “features” row
- Glassmorphism, blur panels, or soft floating cards as the layout
- Custom cursors (a background that reacts to the cursor, like the graphite dust, is allowed; the cursor itself never changes)
- Scroll hijacking or scroll-jacked horizontal galleries
- Skill-logo walls (React, Python, and so on as a grid of brand icons). Exception, Ross's choice (2026-10-03): the "What I've worked with" block on Home; nowhere else.
- Invented metrics, fake testimonials, or lorem used as if it were real
- Emoji as UI
- A centered “passionate developer” hero
- Bounce, elastic, or overshoot easing
- Stock illustrations, 3D blobs, or an abstract gradient mesh as the background

## Notes

Append visualization notes below this line. Date them and name the agent. Do not delete earlier notes.

- 2026-09-30 — Auto: Recorded the visual system above from the approved planning pass. Reference list at the top of this file stays the source for taste; this section is the source for what to build.
- 2026-09-30 — Auto: Ross chose a dark page, closer to Linear and Iota. Replaced the paper ground with warm black `#12110f`, ink `#f4f0e6`, hairline `#2c2924`, and oxide `#e07a4a` still used once per view. v1 stays dark only. Layout, type, and motion are unchanged.


- 2026-10-01 — Claude (Opus 5.5): Raised motion to the fluidity references at Ross's request: page change keeps the header and footer still while the content rises out and in; Home has a first-load sequence; sections and rows reveal once on scroll; project rows brighten their rule and take the oxide accent on hover and press, with the page's own accent rule stepping back meanwhile. Rewrote the Motion section to match. Colors, type, and layout unchanged.
- 2026-10-01 — Claude (Opus 5.5): Added the title morph (project row title to project page headline) and the running index (numbered section list in the desktop margin with a filling progress track, header progress on phones, list rules drawing in on scroll), at Ross's choice. Motion section updated.
- 2026-10-01 — Claude (Opus 5.5): Added the graphite dust background at Ross's request (muted specks on every page, cursor and touch push, scroll stir, self-disabling on slow devices). Updated Direction, Color (accent may travel; dust is muted only), Type (font sources), Layout (Home: photo plate, no contact block), Motion, and the custom-cursor anti-pattern note to match the site as built.
- 2026-10-02 — Claude (Opus 5.5): Home photo added at Ross's request, styled after matthewgresock.com rather than as a framed plate: head-to-waist crop, slight tone shift, edge fades into the ground (an alpha mask on the photo, not a gradient fill), right column from `lg`, full width above the name on phones.
- 2026-10-02 — Claude (Opus 5.5): Ross removed the first Home photo (it looked over-filtered and pale). A labeled placeholder frame keeps the layout until a new photo arrives; the photo treatment above still applies to it, with the filter to be judged against the new image.
- 2026-10-02 — Claude (Opus 5.5): New Home photo: Ross's studio headshot, shown without a color filter, gray backdrop extended upward for headroom, 4:5 on desktop. The gray studio backdrop against the dark ground matches the matthewgresock.com reference.
- 2026-10-02 — Claude (Opus 5.5): At Ross's request the Home photo is now his unedited original headshot (no backdrop extension), served at quality 90 up to its full 1254px.
- 2026-10-02 — Claude (Opus 5.5): The Home photo frame is square at every width (was 4:5 on desktop and 3:4 on phones), at Ross's request, so the square headshot is never cropped.
- 2026-10-02 — Claude (Opus 5.5): At Ross's request the Home photo has no edge fade and is outlined in a 2px oxide border matching the rule under the name: a deliberate second accent on Home, which dims with the rule while a project row holds the accent. On phones the photo sits inside the page margins so the border is not cut by the screen edge.
- 2026-10-02 — Claude (Opus 5.5): At Ross's request Home has no left margin column (no section label, no running index), so its content spans the full width and the name aligns with the header name; and Home's oxide rule and photo frame stay oxide while a project row is hovered (the dimming is removed).
- 2026-10-02 — Claude (Opus 5.5): At Ross's request Projects and Contact also drop the left margin column, like Home. Experience and project pages keep it.
- 2026-10-02 — Claude (Opus 5.5): Home shows up to four featured projects (Ross's choice). Project page titles link to the project's live site when it has one; repository and live-site links open in a new tab with a ↗ icon.
- 2026-10-02 — Claude (Opus 5.5): At Ross's request `/projects` shows every project's full breakdown instead of a ruled list of links, each name with a permanent oxide underline, and nothing there responds to the cursor (no hover rows; the dust ignores the cursor). Contact gains the framed headshot beside the text, as tall as the text block; the photo frame exception now covers Contact and the underlines cover Projects.
- 2026-10-02 — Claude (Opus 5.5): Ross reversed the Projects exception: the graphite dust answers the cursor on every page, permanently. Projects still has no hover rows.
- 2026-10-02 — Claude (Opus 5.5): At Ross's request the rule between projects on `/projects` is muted (inner rules stay hairline), and from `lg` each project uses the full page width in two columns, which also shortens the page.
- 2026-10-02 — Claude (Opus 5.5): At Ross's request each project gets a framed plate (screenshot, or the branding logo for NailsByGabs and Personal Site), placeholders until he supplies the images. The big index numbers idea was declined.
- 2026-10-03 — Claude (Opus 5.5): Added "What I've worked with" to Home at Ross's request: 23 official full-color logos with names, one block below Selected work, static, with a lift-and-spotlight hover. Recorded as Ross's exception to the logo-wall and palette rules.
- 2026-10-03 — Claude (Opus 5.5): At Ross's request Contact adds Resume as a fourth logo link, and Experience opens with its Resume section before Education.
- 2026-10-03 — Claude (Opus 5.5): Project rows cap their year-and-stack column (fit-content, 14rem, 26rem from `lg`) so a long stack wraps instead of squeezing the summary. A private repo shows as "Repository (coming soon)" in muted type, not a link.
- 2026-10-03 — Claude (Opus 5.5): A logo file with its own solid background is shown unedited: the plate takes that background color and the logo fills the plate's height (NailsByGabs: black on white, so a white plate inside the muted frame).
