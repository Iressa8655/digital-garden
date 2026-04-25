---
title: Personal site, long-term plan
draft: true
tags: [private, planning, meta]
created: 2026-04-25
---

# Personal site, long-term plan

> Private note. `draft: true` so it does not publish. Future me, this is for you.

## TL;DR

**For now (next ~6 months):** do nothing. Two sites, shared nav, shared brand. It is annoying but functional.

**When you come back to this** (probably around the next big application, UCLA 2026 or post-DPhil roles): migrate everything to **Astro**. One repo, one site, markdown-first, will outlast both Lovable and Quartz.

## Where things stand right now (April 2026)

Two sites, two repos, one shared nav stitched across them.

| Site | URL | Repo | Tool | What it does well |
|---|---|---|---|---|
| CV | `iressas-refined-folio.lovable.app` (and `iressa8655.github.io`) | `Iressa8655.github.io` | Lovable (React) | Polished landing page, accomplishments, headshot |
| Garden | `iressa8655.github.io/digital-garden/` | `digital-garden` | Quartz (Markdown) | Essays, weekly notes, structured writing |

Both share: H&H brand palette, the diamond logo, the same five-tab navigation (CV / Medicine / Technology / Business / Personal Development). To a casual reader this already feels like one site.

## Why I have not just merged them

Honest answer: they are built with completely different tech.

- Lovable is a React app. It does not natively render markdown blogs. Asking it to fight that is asking for trouble.
- Quartz is a markdown-to-static-site engine. It does not do polished React landing pages with bespoke hero animations. Asking it to is also asking for trouble.

Stitching is the cheapest fix. Merging means choosing one tool, losing the strengths of the other, OR moving to a third tool that handles both.

## Options when you come back to this

Ranked by long-term sense, not effort.

### A. Stay as is, polish the stitching further.
- **Effort**: minimal.
- **Lifespan**: as long as both Lovable and Quartz exist. Quartz is open source and likely fine for years. Lovable is the weaker bet (AI startup; their generated code is not always pretty; if they pivot or fold you inherit a React app you did not really write).
- **Verdict**: fine for now. Not the long-term answer.

### B. Move everything into Quartz.
- **Effort**: a weekend.
- Rebuild the CV as a markdown page in Quartz, with HTML embeds for the rich layout where needed. Drop Lovable.
- **Trade-off**: lose the polished Lovable design. CV will read more "thoughtful blog" than "designer portfolio".
- **Verdict**: only do this if you decide the polish does not matter to you. For applications and academic positions, it might not.

### C. Move everything into Lovable.
- **Effort**: medium.
- Ask Lovable to add a "Writing" page that fetches markdown from a repo.
- **Verdict**: **don't.** AI-generated React app, dependency on Lovable's continued existence, brittle when their tools update. Bad bet for long-term.

### D. Migrate both to Astro. **(The actual answer.)**
- **Effort**: a weekend or two upfront.
- Rebuild the CV as Astro components (React-style if you like, or just plain), the writing as Astro markdown collections. One repo, one deploy, full ownership.
- **Lifespan**: longest. Astro is mature and well-maintained. The markdown content is portable to literally any other framework if you ever switch.
- **Trade-off**: you write some actual code. Given the whole "I want to actually understand my code" arc you are on, this is the consistent move.

## Why Astro specifically (and not Hugo, Eleventy, Next.js)

- **Markdown-first**, with proper frontmatter and content collections. Quartz-like, but you control everything.
- **Supports rich landing pages** with React/Vue/Svelte components when you want them. So your CV page can stay glossy.
- **Outputs static HTML** by default. Cheap to host, fast, no server to maintain.
- **Hosts free** on GitHub Pages, Vercel, Netlify, Cloudflare Pages.
- **Active community, good docs, clearly the most likely-to-still-exist-in-five-years choice** in the modern static site space (as of 2026).

Hugo is also fine but the templating is in Go and quietly painful. Eleventy is great but smaller community. Next.js is overkill for a personal site and ties you to React forever.

## Concrete first steps when you pick this up

1. Pick an Astro starter template that already looks roughly right (Astro has a marketplace; "personal portfolio + blog" templates exist, hundreds of them).
2. Create a new repo: `iressa-site` or similar.
3. Copy your existing markdown notes from `Dropbox\Iressa's note\Public\` into the Astro `src/content/` folder. Wikilinks may need conversion to standard markdown links; there is a tool for that (or a pandoc one-liner).
4. Rebuild the CV as one Astro page using your existing Lovable design as visual reference. Headshot, sections, accomplishments. Hand-write it; it is not as much code as you think.
5. Set up GitHub Pages or Vercel deployment.
6. Point `iressa8655.github.io` (or a custom domain if you ever buy one) at the new site.
7. Archive both Lovable and Quartz repos with a README pointing to the new home.

## Triggers for "now is the time"

Do not start until at least one of these happens:

- A major application is coming up that needs your site to look its best (UCLA 2026, post-DPhil applications, anything similar)
- Lovable does something annoying that breaks your CV site
- You have a clear two-day stretch with nothing else demanding attention
- You start finding the two-site stitching genuinely irritating in daily use, not just theoretically

If none of those, leave it alone. The site is fine. Write more essays instead; that is what actually matters.

## Things you would lose by moving (so you remember why you chose Lovable in the first place)

- Lovable's AI-driven editing ("change the colour of the third button") is convenient when you just want a tweak.
- The polished animations and hover states you did not write yourself.
- The headstart on the visual design; rebuilding by hand means rebuilding by hand.

These are real losses. But "Astro + a good template" gets you 80% of that polish back and gives you full ownership in return.

## A note from past me to future you

You are about to spend a weekend rebuilding your website instead of writing the next essay. That weekend is fine, as long as you have actually decided this is the moment, and not the polite procrastination it sometimes feels like. Re-read the "Triggers" section above before you start. If none of them apply, close this file.
