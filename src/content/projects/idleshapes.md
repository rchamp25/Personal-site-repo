---
# Written 2026-10-03 from Ross's write-up (IdleShapes-portfolio-context.md,
# facts as of 2026-10-03). Kept inside its guardrails: no player or download
# numbers, Windows only, unsigned installer (not mentioned), offline apart from
# update checks, and no "from scratch" claim. The starter template and AI
# assistance are not mentioned, matching Ross's choice on Personal Site.
title: "IdleShapes"
summary: "A physics idle game for Windows where bouncing shapes shatter procedurally generated glass."
kind: personal
problem: "An idle game lives on endless levels and on progress that keeps building while you're away. IdleShapes needed levels that never run out, a game that keeps playing in the background, and updates that reach players without running a server."
role: Solo Developer
start: "2026-02"
stack: ["TypeScript", "React", "Matter.js", "d3-delaunay", "Electron", "Vite", "Tailwind CSS", "Vitest", "GitHub Actions"]
repo: https://github.com/rchamp25/IdleShapes
download: https://github.com/rchamp25/IdleShapes/releases/latest
featured: true
order: 3
# No screenshots exist yet; Ross may add some. The app icon (public/icon.ico in
# the repo) could be shown as a logo instead.
image:
  kind: screenshot
placeholder: false
---

IdleShapes is a Windows idle game built on a real 2D physics engine. Triangles, squares, and every shape up to decagons ricochet around an arena and chip away at a field of glass shards; every hit earns money for more shapes, more power, and auras. It was prototyped and shipped over two days in February 2026, then hardened and open-sourced as v1.2.7 in October 2026. The game engine is plain TypeScript on Matter.js, with React drawing the interface on top.

- **Endless levels:** each level is a seeded Voronoi diagram (d3-delaunay) smoothed with a pass of Lloyd's relaxation, so the shards come out evenly sized and a given level always looks the same.
- **Physics that never naps:** a fixed 144-steps-per-second loop runs on its own timer, separate from the screen's frame rate, so the game keeps playing at full speed while minimized. Speed is renormalized every step, so shapes never lose energy or get stuck on walls.
- **Auras and lasers:** unlocking a shape's aura links every pair of that shape with a damaging laser, checked 20 times a second against every shard edge it crosses, plus effects like chain lightning, critical hits, and supernova blasts.
- **Star Map:** a 10×10 grid where 2×2 clusters of the same shape stack global damage bonuses.
- **Updates itself:** packaged with Electron as a Windows installer that checks GitHub Releases on launch, downloads new versions in the background, and installs them on quit. 12 releases so far.
- **Saves that survive updates:** save data is versioned and migrated on load, and the save folder is pinned so renaming the app can't wipe anyone's progress.
- **Hardened for release:** split a 1,000-line engine into 10 focused modules, turned on TypeScript strict mode, added 38 unit tests and a GitHub Actions pipeline, took `npm audit` from 32 findings to 0, and fixed the bugs that scripted end-to-end checks of the packaged app turned up.
