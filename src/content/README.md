# Site content

Everything the site says about you lives in this folder. Pages read it at build time; no page has your details typed into it. The shape of each file is checked by `src/content.config.ts`, so `npm run build` stops with a clear message if a field is missing or misspelled.

**Placeholders.** An entry with `placeholder: true` is a stand-in, and its text says so. When an entry has its real details, set `placeholder: false`. A real entry must have its key facts (listed below) or the build fails, so nothing half-filled goes live.

**Dates** are `"2025"` or `"2025-09"` (quoted). Leaving out `end` means ongoing.

## profile.yaml

One entry, `ross`: `name`, `role` (the line under your name), `bio`, `note`, `resume`, and optional `photo`.

The social preview image (`public/og.png`, what shows when the link is shared) prints your name and role. After changing either, run `npm run share-images` to rebuild it and the icons.

- **Resume:** the button at the top of Experience and the Resume link on Contact open `public/Ross-Champlin-Resume.pdf` (the technical resume) in a new tab. To update it, replace that file with the new PDF under the same name.
- **Photo:** the Home photo is `images/ross-headshot.png` in this folder: Ross's original studio headshot, unedited (1254×1254). Astro makes the AVIF and WebP copies visitors download, at quality 90 and up to full resolution. Home and Contact show it in a square frame at every size. An optional `crop` (`left`, `top`, `size` in the file's own pixels) zooms into a square of it without editing the file; the current one centers Ross's head. Remove `crop` to show the whole photo; Astro makes small AVIF and WebP copies at build time. To change it, add the new image to `images/` (it needs a file extension, such as `.png` or `.jpg`) and point `src` at it. Without a `photo` entry, Home shows a labeled placeholder frame instead:

  ```yaml
  photo:
    src: ./images/ross-headshot.png
    alt: Short description of the photo
  ```

  Keep large originals out of this folder's `images/`; crop and resize first (a 2:3 portrait around 1200px wide is plenty). Originals kept in `src/content/` are listed in `.gitignore` so they never reach the repo.

## links.yaml

One entry per contact link, shown as a logo on the Contact page and in the footer: `label` (its name for screen readers), `text` (the full address, shown on hover), `icon` (`email`, `github`, or `linkedin`), `href`, `order`, and `placeholder`. Email uses `href: mailto:you@example.com`.

## projects/

One Markdown file per project. The file name is the web address: `projects/mixtwin.md` is `/projects/mixtwin`.

```markdown
---
title: "MixTwin"
summary: "One line about it."
kind: personal          # or school
problem: "The problem it solved."
role: "What you did."
stack: ["Astro", "TypeScript"]
start: "2025-06"
end: "2025-09"          # leave out while ongoing
repo: https://github.com/...   # or, while the repo is still private: repoPending: true
demo: https://...       # optional live site: the page title links to it, plus a "See it live" link (new tab)
featured: true          # shown on Home (up to four, by order)
order: 1                # lower comes first
image:                  # the framed plate
  kind: screenshot      # or logo (centered, for a project shown by its branding)
  src: ../images/projects/mixtwin.png   # leave out src and alt until the file exists
  alt: What the image shows
  background: "#ffffff"   # optional, logos only: a logo on a solid background; the frame takes that color
commentary: "Optional personal note."
placeholder: false
---

What you built, in Markdown. Use ## for headings (never #).
```

A real project needs `kind`, `role`, `start`, and at least one `stack` item.

Project images go in `images/projects/` in this folder (PNG, JPG, WebP, or SVG for a logo). A screenshot fills a 16:10 frame from the top, so a 16:10 capture about 1440px wide fits best; a logo is centered with space around it, so a transparent PNG or an SVG that reads on a dark ground works best. Until `src` is set, the frame shows a labeled placeholder. To add a project, add a file; to remove one, delete its file.

## tools.yaml

"Tools I've used" on Home. One entry per language, framework, tool, or service: `name` (shown under the logo), `logo` (an SVG in `logos/`, e.g. `./logos/java.svg`), and `order`. Use the brand's official logo; if it is black or very dark, use the brand's white version so it shows on the dark page. To add one, drop the SVG in `logos/` and add an entry; to remove one, delete both.

## experience/

One Markdown file per entry. `kind` is `education`, `role`, or `achievement`; the Experience page groups them in that order and sorts by `order`. Every entry can have `bullets`, `commentary`, and a Markdown body.

- **Roles and achievements:** `title` (the role, or what it was), `org`, `start`, `end`. A real one needs `org` and `start`.
- **Education:** `title` is the school, `org` the college or place, then `degree`, optional `major`, `end` (graduation) with `expected: true` while it is ahead, `gpa` (as you want it shown), `honors` and `involvement` (lists). A real one needs `degree` and `end`. Courses are not shown.
