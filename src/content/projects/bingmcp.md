---
# Written 2026-11-16 from the HackBU-2026 repo (github.com/mitoiscool/HackBU-2026,
# public, a teammate's account; READMEs and code as of 2026-03-12) and Ross's
# account of his part: he found and reverse-engineered every campus API with
# Chrome DevTools, helped scaffold the backend architecture, and made the Baxter
# mascot images. A team project: the rest of the code is credited to the team,
# not Ross. No image at Ross's request. No placement or award is known.
title: "BingMCP"
summary: "An AI campus assistant that answers Binghamton students' questions with live campus data."
kind: hackathon
event: "HackBU 2026"
problem: "Everyday campus questions, like whether a washer is free, when the next bus comes, what's for dinner, or how busy the gym is, have answers spread across six university systems with no public APIs, none of which an AI assistant can reach."
role: "Campus API Research and Backend"
start: "2026-03"
end: "2026-03"
stack: ["Python", "FastMCP", "Model Context Protocol", "httpx", "asyncio", "Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel AI SDK", "Gemini"]
repo: https://github.com/mitoiscool/HackBU-2026
featured: true
order: 2
placeholder: false
---

BingMCP was built by a team at HackBU 2026 over one weekend in March 2026. It is a Python server that exposes live Binghamton data as seven tools an AI model can call through the Model Context Protocol, plus a Next.js chat app where an assistant named Baxter uses them. My part was the data: I found and reverse-engineered every campus API it reads by tracing each site's network traffic in Chrome DevTools, helped scaffold the backend's architecture, and created the Baxter mascot images.

- **Six undocumented sources:** live bus positions and arrival times, washer and dryer counts for 31 residence hall laundry rooms, dining hall hours and menus, gym occupancy, open library study rooms, and upcoming campus events, all read from the same private endpoints the university's own sites use.
- **Messy formats, one clean shape:** dining hours come out of a nested page-layout payload with seasonal overrides and overnight hours, library rooms need a page scrape for room names plus a form request for the availability grid, and events arrive as positional rows keyed by a field list. Each tool turns its source into predictable JSON an AI model can use.
- **Plug-in tools:** the server picks up any new tool folder at startup, with optional startup and shutdown hooks, and runs over stdio for desktop AI clients or Streamable HTTP for the web app.
- **Fast and fault-tolerant:** per-source caches (20 seconds for buses up to 5 minutes for dining), concurrent requests, and a background poller that refreshes events every 15 minutes and keeps serving the last good copy if a refresh fails. A source that is down returns "unavailable" instead of breaking the chat.
- **Baxter:** a Gemini chat built on the Vercel AI SDK that calls the tools, shows each result as a live card, and tailors answers to the student's laundry room, dining hall, dietary needs, and the current weather, alongside a live campus dashboard.
