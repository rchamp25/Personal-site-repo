---
# Written 2026-10-03 from Ross's write-up in the NailsByGabs repo
# (docs/PROJECT_ARCHITECTURE.md); brought up to date 2026-11-16 from the same
# doc and the repo's commits through 2026-11-03 (overhaul, loyalty, cuticle
# oil, Turnstile, Thanksgiving theme). Left out at Ross's request: the
# no-payments reasoning, the revenue figure, and admin setup details. Also left
# out: the owner's email setup and the salon's town names. Built for a local
# nail artist; kind is personal (not paid client work).
title: "NailsByGabs"
summary: "A booking and portfolio site for a solo GelX nail artist."
kind: personal
problem: "A solo nail artist needed one place to show her work and let clients book appointments on a schedule she controls. A third-party booking embed was more than the business needed, so booking had to be built in."
role: Full-Stack Developer
start: "2026-06"
stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "Resend", "Google Calendar API", "Cloudflare Turnstile", "GitHub Actions", "Vercel"]
# Public since 2026-10-03.
repo: https://github.com/rchamp25/NailsByGabs
demo: https://nailsbygabs.org
featured: true
order: 1
# The current NailsByGabs logo (public/branding/NailsByGabsLogo.png in its
# repo, adopted 2026-10-27), unedited: pink on a solid white ground, so the
# frame is white to match.
image:
  kind: logo
  src: ../images/projects/nailsbygabs-logo.png
  alt: "Nails by Gabs logo: “NAILS” in large pink outlined letters, “By Gabs” in white script across them, and a pink bow"
  background: "#ffffff"
placeholder: false
---

NailsByGabs started as a marketing site with a third-party booking embed and grew into a custom appointment platform with a loyalty program, owner tools, and seasonal themes. It is built on the Next.js App Router, mostly server-rendered with Server Components and Server Actions, with Supabase for accounts and data.

- **Booking:** clients sign in with a verified email and book open slots on a week and month calendar, always shown in the salon's time zone. PostgreSQL functions run every booking, so two clients can never take the same slot, each client holds at most three upcoming bookings, and members-only times stay reserved for loyalty members until 24 hours before.
- **Owner tools:** the owner manages slots and loyalty members, books clients who have no account, edits the services, cuticle oil, and gallery pages in place, and follows bookings on an analytics dashboard built on an event log. Every appointment change syncs to the owner's Google Calendar.
- **Email:** confirmations, cancellations, change notices, loyalty welcomes, and reminders 48 hours ahead, sent through Resend in the site's active theme colors, with reminders run by a daily Vercel cron job. A failed email never undoes a booking.
- **Security:** row-level security limits each client to their own profile and bookings, Cloudflare Turnstile guards sign-up and sign-in, and a local attack script probes the API as a visitor, a client, and a member. GitHub Actions lints, type-checks, builds, and audits dependencies on every push.
- **Portfolio and themes:** a gallery filtered by style tags, with a lightbox and a featured carousel, served as WebP from an image pipeline that cut 238 MB of photos to 9.4 MB and strips their metadata. The owner switches between three color themes and seasonal Halloween and Thanksgiving themes that switch back on a schedule.
