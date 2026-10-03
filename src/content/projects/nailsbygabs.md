---
# Written 2026-10-03 from Ross's write-up in the NailsByGabs repo
# (docs/PROJECT_ARCHITECTURE.md). Left out at Ross's request: the no-payments
# reasoning, the revenue figure, and admin setup details. Also left out: the
# owner's email setup and the salon's town names. Built for a local nail
# artist; kind is personal (not paid client work).
title: "NailsByGabs"
summary: "A booking and portfolio site for a solo GelX nail artist."
kind: personal
problem: "A solo nail artist needed one place to show her work and let clients book appointments on a schedule she controls. A third-party booking embed was more than the business needed, so booking had to be built in."
role: Full-Stack Developer
start: "2026-06"
stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "Resend", "Google Calendar API", "Vercel"]
# Public since 2026-10-03.
repo: https://github.com/rchamp25/NailsByGabs
demo: https://nailsbygabs.org
featured: true
order: 2
# The NailsByGabs branding logo (public/branding/Nails by Gabs.png in its repo),
# unedited: black on a solid white square, so the frame is white to match.
image:
  kind: logo
  src: ../images/projects/nailsbygabs-logo.png
  alt: "Nails by Gabs logo: a large serif monogram with “Nails by Gabs” in script and “Gel X Nails” beneath"
  background: "#ffffff"
placeholder: false
---

NailsByGabs started as a marketing site with a third-party booking embed and grew into a custom appointment platform. It is built on the Next.js App Router, mostly server-rendered with Server Components and Server Actions, with Supabase for accounts and data.

- **Booking:** clients sign in with a verified email and book open time slots on a week and month calendar. Booking and cancelling run as PostgreSQL functions, so two clients can never take the same slot, and row level security on every table keeps the business rules in the database.
- **Owner tools:** the owner adds and removes slots, books clients who have no account by name, tags each appointment with one of two locations, and edits the services and prices page.
- **Google Calendar sync:** every booking, change, and cancellation updates the owner's Google Calendar.
- **Email:** booking confirmations, owner alerts, and reminders 48 hours before each appointment, sent through Resend by a daily Vercel cron job. A failed email never undoes a booking.
- **Analytics:** an owner dashboard built on an event log of bookings, cancellations, and completions, backfilled from the booking history, with trend charts drawn in SVG that show quiet days as zero instead of skipping them.
- **Eastern time everywhere:** a real bug showed a 4:30 PM appointment as 12:30 PM; every time is now entered and shown in the salon's time zone, with daylight saving handled.
- **Portfolio:** a gallery filtered by style tags (Aura, Chrome, 3D, and more) read from the photo file names, with a lightbox, and three color themes the owner can switch between.
