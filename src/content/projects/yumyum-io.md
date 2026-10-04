---
# Written 2026-10-04 from Ross's write-up (yumyum.io/WRITEUP.md in its repo,
# as of 2026-10-04). Left out, as with Personal Site and IdleShapes: the AI
# Studio starting point; nothing claims it was built from scratch. Also left
# out: the old dev password and other security details beyond what the site
# needs.
title: "yumyum.io"
summary: "A browser action RPG: three classes, an 18,000-unit world, crafting, and a boss in every corner."
kind: personal
# Ross's own words (2026-10-04), lightly edited.
problem: "I wanted to build a prototype based on one of my favorite games. I tried scaling it up with a multiplayer server, then went back to single-player because of the cost. Now it plays straight from a link: no account needed, no paid server, and the same speed at any refresh rate."
role: Full-Stack Developer
start: "2025-11"
stack: ["TypeScript", "React", "Canvas 2D", "Vite", "Tailwind CSS", "Supabase", "PostgreSQL", "Vercel", "Playwright"]
repo: https://github.com/rchamp25/yumyum.io
demo: https://yumyum-io.vercel.app
featured: false
order: 4
# No image yet; Ross will supply a screenshot.
image:
  kind: screenshot
placeholder: false
---

yumyum.io is a single-player action RPG that runs right in the browser. Pick one of three classes and fight outward from a safe village across an 18,000 × 18,000 world with up to 1,750 enemies, collecting and crafting gear across six rarity tiers on the way to the bosses in the four corners. It started in November 2025, grew a multiplayer server, went back to single-player in January 2026, and got a full overhaul for its public release in October 2026.

- **Same speed on every screen:** movement used to advance once per animation frame, so on a 144 Hz monitor the whole game ran 2.4 times faster. A fixed-timestep loop now simulates in 1/60-second steps and draws once per frame.
- **Lost features, found:** the single-player pivot had silently dropped six features (the safe zone, bosses, waypoints, fast travel, enemy projectile hits, and items from an unequipped bag). They're back, along with about 25 bug fixes, all checked by 75 Playwright tests.
- **Accounts, guests, and safe saves:** Google sign-in through Supabase with row-level security, or play as a guest saved in the browser. Saves queue instead of being skipped, and a token refresh no longer kicks anyone back to the menu.
- **Fast with 1,750 enemies:** React runs the menus while a canvas engine owns the world, kept out of React state. Only what's on screen is drawn, and idle enemies far from the player are skipped.
- **No server to pay for:** the old Express and Socket.IO server is gone. The game is a static Vercel deploy with one small daily job that keeps the free Supabase project awake.
