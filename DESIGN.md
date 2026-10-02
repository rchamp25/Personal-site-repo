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
- Accent: `#e07a4a` (oxide). Use it once per view: one marker or one rule. Never as a large fill, and not as small body text unless contrast is checked and passes. It may travel: while a project row is hovered, pressed, or focused, the accent draws on that row and the page's own rule steps back to hairline, so a view still shows one accent at a time.
- Graphite dust uses muted only, dimmed behind text, never the accent.
- No second accent. No gradient fills. No light theme in v1.

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

- Page shell: a wide left margin used as a running index (section number or short label). On small screens that index collapses into the section label above the content, not into a hamburger-only mystery.
- Max content width about `72rem`. Prose sits in a narrower measure inside that.
- Header and footer use the same ink, hairline, and mono index. Header is sticky and compact on small screens.
- Projects index: horizontal rules and type (title, one line, year, stack). Not a grid of equal rounded cards.
- Project pages: problem, what was built, role, stack, links, dates. Images only when a real image is in content.
- Home holds the name Ross Champlin, a one-line role, a short bio, a short personal note, and up to three featured projects. Its visual is Ross's photo (a head-to-waist crop), in the spirit of matthewgresock.com: no frame, toned slightly toward the warm dark palette, its edges fading into the ground (softly at the top and right, strongly at the left and bottom). From `lg` it sits in a right column beside the text; on phones it runs full width above the name. Contact links live in the footer on every page. Home is not a second copy of every page.
- Project pages include an optional commentary field: the author’s own note, separate from the problem and what was built.
- Experience holds education, roles, and other life achievements that are not jobs. Each entry can include a short commentary.

## Motion

Short, physical, and in service of reading, at the level of the fluidity references (Cuberto, Fuselab, Linear, Stripe). The page always scrolls normally. Tokens: `--duration-page` 240ms, `--duration-reveal` 480ms, `--duration-hover` 180ms, `--ease-out-quart`, `--shift-hover` 4px.

- Page change: Astro view transitions (`ClientRouter`). The header and footer hold still. The page content leaves with a short rise and fade, and the next page arrives with a short rise and fade, on `--duration-page` and `--ease-out-quart`. No slide that moves the header.
- Title morph: a project's title is one shared element between its row (Home, `/projects`) and its page headline, so opening a project morphs the title into place, and going back morphs it home.
- Running index: on desktop the left margin lists the page's sections (numbered, mono). The one being read is ink, the rest muted, and a hairline track beside the list fills with page progress. On phones the progress runs along the header rule instead. List rules draw across as they scroll into view. All of it follows the scroll and never moves it.
- First load, Home only: one sequence, settled in under a second. The section label, the headline word by word, the oxide rule drawing to its width, then role, bio, and note, then Selected work. It does not replay on client-side visits. It is the only staggered load on the site.
- Scroll reveal: sections and rows that start below the fold settle in (a short rise and fade) as they enter the view, once. Nothing replays on scroll-up, and anything already in view at load is shown as is. Used on Home, Projects, project pages, and Experience; Contact reveals its list once.
- Project rows (Home and `/projects`): on hover, press, or keyboard focus, the rule under the row brightens and the oxide accent draws along it. The accent travels to that row: the page's own accent rule steps back to hairline while the row holds it, so a view still shows one accent. From `md` up the title also moves a few pixels. Touch devices get the press state, never a hover that sticks.
- Graphite dust: a fixed canvas behind every page with fine muted specks that drift. The cursor (or a dragging finger) brushes them aside and they settle back; scrolling stirs them against its direction. No trail, no click burst, and the cursor itself never changes. Specks behind text are much dimmer so reading is never affected. It persists through page changes and switches itself off for the visit if the device cannot hold the frame rate.
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
- Skill-logo walls (React, Python, and so on as a grid of brand icons)
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
