---
# Written from the build itself (2026-10-02); Ross may add his own commentary.
# The repo is private, so no repo link, and no
# live-site link: visitors are already on it.
title: "Personal Site"
summary: "This site: a dark lab-notebook portfolio built with Astro."
kind: personal
problem: "A single home for school and personal projects, experience, and contact details that stays fast, reads well on any screen, and is easy to update as new work arrives."
role: Design direction and development
start: "2026-09"
stack: ["Astro", "TypeScript", "Tailwind CSS", "View Transitions", "Canvas 2D", "Vercel"]
featured: true
order: 4
placeholder: false
---

A static Astro site in strict TypeScript, deployed on Vercel with a custom domain on Cloudflare DNS. Everything it says lives in Markdown and YAML content collections checked by a schema, so a half-filled entry fails the build instead of shipping.

- **Design system:** a warm-black "lab notebook" palette with one oxide accent, set as Tailwind CSS v4 tokens, and three self-hosted typefaces (Instrument Serif, Newsreader, IBM Plex Mono).
- **Motion:** client-side page transitions where the header and footer hold still while the content rises out and in; a shared-element morph that carries a project's title from its row into its page; a running section index with progress that follows the scroll through CSS scroll-driven animations; and one-time reveals as sections enter the view.
- **Graphite dust:** a hand-written canvas background of fine specks that the cursor or a finger brushes aside and scrolling stirs, about 0.2ms of script per frame, with a watchdog that switches it off on devices that can't keep up.
- **Accessibility:** WCAG 2.2 AA contrast, a skip link, visible keyboard focus, and full support for reduced motion, checked with axe on every page.
- **Delivery:** responsive AVIF and WebP images, a sitemap, social preview cards, and cookie-free analytics.
