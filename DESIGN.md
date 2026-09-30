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

Direction: a drafting-table / lab-notebook page. Hierarchy and navigation should be as clear as the utility references (Airbnb, PayPal, Lemonade, Gatsby). Motion should be short and physical, in the spirit of Linear and Cuberto, and limited to first paint, page change, and hover. The page should feel written by a person, not assembled from a component kit. Mobile uses the same system, stacked. There is no separate mobile theme.

## Color

- Ground: `#f3efe6` (page background)
- Ink: `#1c1915` (text, rules that must read as type)
- Hairline: `#d8d1c4` (dividers, index rules, borders)
- Accent: `#c4562a` (oxide). Use it once per view: one link, one marker, or one rule. Never as a large fill.
- No second accent. No gradient fills. No dark-mode theme in v1.

Text on ground must meet WCAG AA contrast. Ink on ground does. Oxide on ground is for large text or non-text marks only; small oxide text is not allowed unless contrast is checked and passes.

## Type

- Headlines: Instrument Serif
- Body: Newsreader
- Dates, tags, nav indexes, and other meta: IBM Plex Mono

Load these from a privacy-friendly source (self-hosted files in `public/fonts`, or Fontshare / the official IBM Plex repo). Do not pull fonts from Google Fonts.

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
- Home holds identity, a short bio, three selected projects, a “now” line, and contact links. It is not a second copy of every page.

## Motion

- One staggered first paint, on the home headline only.
- Astro view transitions under 300ms.
- Hover: underline, or image scale of `1.02`. Nothing else.
- `prefers-reduced-motion: reduce` disables the stagger, the view transition, and the image scale.
- No animation library. CSS only, plus Astro’s built-in view transitions.

## Anti-patterns

Do not ship any of these:

- Inter, Roboto, Arial, or Space Grotesk as the design (fallbacks above are for load failure only)
- Purple-to-blue gradients, gradient text, or neon glow
- Three identical icon cards, or any “features” row
- Glassmorphism, blur panels, or soft floating cards as the layout
- Custom cursors
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


