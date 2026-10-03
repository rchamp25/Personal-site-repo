---
# NEEDS REWRITE: Ross will supply a more technical description of MixTwin.
# Until then the problem and body use his own wording (2026-10-02), with
# spelling fixed, plus the bullets from his technical resume.
title: "MixTwin"
summary: "A DJ set planning assistant for beginners."
kind: personal
problem: "Putting together DJ sets is a struggle for beginners."
role: Full-Stack Developer
start: "2026-01"
end: "2026-03"
stack: ["React", "Supabase", "Vercel", "Spotify API", "Web Audio"]
featured: true
order: 1
# Screenshot coming from Ross. Add src and alt then.
image:
  kind: screenshot
placeholder: false
---

MixTwin analyzes and tags the music in your local files and folders, using algorithms that determine each track's beat pattern, vibe, and structure, then groups songs together for specific DJ sets depending on the environment. It isn't trying to compete with DJ software such as rekordbox or Serato DJ; its aim is to help beginners string songs together in a way that makes sense for their sets. A windowed Spotify player, built on Spotify's API, lets you hear a song without leaving the tab.

- A web-based music library manager and automated set-list generator, built with React and deployed on Vercel. Spotify API integration retrieves metadata and keeps track details in sync.
- An asynchronous analysis pipeline processes and displays track attributes from analyzed libraries.
- A client-side processing tool built on web audio libraries analyzes BPM and harmonic key.
- Local file-system uploading runs bulk analysis on entire folders, with Spotify API data checking for correction.
