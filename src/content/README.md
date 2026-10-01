# Site content

Everything the site says about you lives in this folder. Pages read it at build time; no page has your details typed into it. The shape of each file is checked by `src/content.config.ts`, so `npm run build` stops with a clear message if a field is missing or misspelled.

**Placeholders.** An entry with `placeholder: true` is a stand-in, and its text says so. When an entry has its real details, set `placeholder: false`. A real entry must have its key facts (listed below) or the build fails, so nothing half-filled goes live.

**Dates** are `"2025"` or `"2025-09"` (quoted). Leaving out `end` means ongoing.

## profile.yaml

One entry, `ross`: `name`, `role` (the line under your name), `bio`, `note`, `resume`, and optional `photo`.

- **Resume:** put the PDF in `public/` (for example `public/resume.pdf`), then set `href: /resume.pdf` and a `label` such as `Resume (PDF)`. The Experience page then shows a button that opens it in a new tab.
- **Photo:** put the image in `public/images/profile/`, then add:

  ```yaml
  photo:
    src: /images/profile/your-file.jpg
    alt: Short description of the photo
  ```

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
repo: https://github.com/...
demo: https://...       # optional
featured: true          # shown on Home (up to three, by order)
order: 1                # lower comes first
image:                  # optional; file in public/images/
  src: /images/projects/mixtwin.png
  alt: What the image shows
commentary: "Optional personal note."
placeholder: false
---

What you built, in Markdown. Use ## for headings (never #).
```

A real project needs `kind`, `role`, `start`, and at least one `stack` item. To add a project, add a file; to remove one, delete its file.

## experience/

One Markdown file per entry. `kind` is `education`, `role`, or `achievement`; the Experience page groups them in that order and sorts by `order`. Every entry can have `bullets`, `commentary`, and a Markdown body.

- **Roles and achievements:** `title` (the role, or what it was), `org`, `start`, `end`. A real one needs `org` and `start`.
- **Education:** `title` is the school, then `degree`, `major`, `end` (graduation) with `expected: true` while it is ahead, `gpa` (as you want it shown), `honors` and `involvement` (lists). A real one needs `degree`, `major`, and `end`. Courses are not shown.
