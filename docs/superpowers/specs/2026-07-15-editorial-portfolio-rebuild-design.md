# Personal Portfolio Rebuild — Editorial/Warm Design

## Context

The current `personal-portfolio` site (React + Vite + Tailwind + TypeScript) is live at
`joseppascual.com` via GitHub Pages, deployed through `.github/workflows/deploy.yml`. It
includes Hero, About, Projects, Blog, and Contact sections, plus a stray `netlify.toml`
left over from an earlier hosting experiment.

This spec covers a full visual and content rebuild of the site, done in place in this
repo, keeping the same hosting setup and custom domain.

## Goals

- Rebuild the site with a new visual direction ("Editorial/Warm" — see below)
- Showcase projects the user is building, linking out to their live Vercel deployments
- Give more space to a personal "about me" section (interests, what they work on)
- Drop the blog entirely — it saw no real use
- Keep the custom domain (`joseppascual.com`) and GitHub Pages hosting unchanged

## Non-goals

- No CMS or dynamic content fetching (projects are manually curated, not pulled live
  from GitHub/Vercel APIs)
- No blog, even in a hidden/minimal form
- No stack change — staying on React + Vite + Tailwind + TypeScript
- No hosting change — staying on GitHub Pages, not resurrecting the Netlify config

## Site structure

Single-page site (no more blog routes):

- **Nav** — sticky, minimal: About · Projects · Contact
- **Hero** — circular profile photo, name, short tagline ("Practical idealist,
  occasional coder"), one-line personality hook
- **About** — a photo (e.g. hometown or a candid shot) + a couple of short paragraphs
  on what the user works on and what they're into (games, food, travel)
- **Projects** — grid of manually-curated project cards, each linking out to the live
  Vercel deployment (and optionally the GitHub repo)
- **Contact** — email, GitHub, Twitter/X, LinkedIn
- **Footer** — small, just copyright/name

## Visual design — Editorial/Warm

Chosen after comparing four rough directions (Minimal Dark, Editorial/Warm, Bento Grid,
Dev/Terminal) and then a head-to-head of the top two with real photos dropped in. The
warm/light palette took the user's actual photos (profile photo, hometown shot) with no
extra color-grading needed, while the dark palette required desaturating every photo to
avoid looking patchy — Editorial/Warm was picked for being lower-maintenance as well as
better-looking with photos.

- Background: warm off-white (`#faf6ee`), text near-black-brown (`#2b2620`)
- Headlines: serif/italic (Georgia or similar editorial serif) for personality;
  nav/body text in a clean sans-serif for readability
- Accent color: warm terracotta (`#c2703d`) for underlines, links, hover states
- Photos: used close to as-shot, no heavy filtering — circular profile photo in Hero, a
  wider photo in About
- Layout: generous whitespace, single-column on mobile, comfortable max-width
  (~700–800px) on desktop so it reads like an article rather than a dashboard

## Projects data & implementation

- Projects are a manually maintained array, following the pattern of the current
  `blogPosts.ts`, in a new `src/data/projects.ts`:

  ```ts
  interface Project {
    title: string;
    description: string;
    tags: string[];
    vercelUrl: string;
    repoUrl?: string;
    image?: string;
  }
  ```

- Components rebuilt fresh for the Editorial/Warm look: `Nav`, `Hero`, `About`,
  `Projects`, `Contact`, `Footer`
- Removed: `src/components/Blog.tsx`, `src/pages/BlogPost.tsx`,
  `src/data/blogPosts.ts`, the blog route in `App.tsx`, and the `react-router-dom`
  dependency (single page, no routing needed anymore)
- Removed: `netlify.toml` (committing to GitHub Pages only)
- Existing images in `public/` are reused where relevant (profile photo, hometown
  shot); new project screenshots added as needed

## Repo strategy, deployment & verification

- All work happens on the `rebuild-editorial` branch of the existing
  `hatsyio/personal-portfolio` repo — the live site is untouched until merge
- Keep `.github/workflows/deploy.yml` (GitHub Actions → GitHub Pages) and `CNAME`
  (`joseppascual.com`) unchanged — no DNS or Pages settings changes needed
- Keep the Husky pre-commit hook (typecheck + build) as a safety net
- Before merging to `main`:
  - `pnpm dev` to check locally
  - `pnpm build && pnpm typecheck` clean
  - Manually verify responsive layout (mobile/desktop) and that all Contact/Project
    links resolve
  - Merge to `main`, confirm the live site at `joseppascual.com` updates correctly
