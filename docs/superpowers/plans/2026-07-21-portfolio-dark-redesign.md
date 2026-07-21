# Portfolio Dark Bento Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current Long Document/editorial redesign of `personal-portfolio` (near-black-free, terracotta-on-cream, Newsreader serif) with a near-black, mono-accent, Marquee Hero + Bento Grid redesign, executed via the `hallmark` design skill, per the approved spec at `docs/superpowers/specs/2026-07-21-portfolio-dark-redesign-design.md`.

**Architecture:** Single-page Vite + React 18 + TypeScript + Tailwind v4 app (`src/pages/Home.tsx` renders `Navigation`, `Hero`, `About`, `Projects`, `Contact`, `Footer` in that order). Each task rewrites one component (or the shared token layer) in place, invoking the `hallmark` skill with a fully-specified brief for that section, then verifies with `pnpm typecheck`, `pnpm build`, and a live browser check via the Playwright MCP tools (`mcp__playwright__browser_navigate`, `browser_resize`, `browser_evaluate`, `browser_take_screenshot`) at 320px, 375px, and 1280px.

**Tech Stack:** React 18, TypeScript, Vite 6, Tailwind CSS v4 (`@theme inline` token pattern in `src/index.css`), no motion library (implement CSS-only motion), Playwright MCP for browser verification, Hallmark skill (`.claude/skills/hallmark`) for design generation.

## Global Constraints

These apply to every task below — copied verbatim from the approved spec:

- **Palette is fixed and OKLCH-only:** `--color-paper: oklch(20.0% 0.009 264)`, `--color-paper-2: oklch(23.8% 0.011 261)` (card/tile surface), `--color-rule: oklch(30.8% 0.012 258)` (borders), `--color-ink: oklch(96.6% 0.003 229)` (primary text), `--color-muted: oklch(84.3% 0.009 248)` (body copy on dark), `--color-muted-2: oklch(56.0% 0.020 246)` (low-emphasis text), `--color-accent: oklch(81% 0.14 229)` (single light sky-blue accent — chroma tuned from the mockup's 0.075 up into Hallmark's 0.12–0.22 accent band, same hue/lightness).
- **One accent only.** No second accent color anywhere on the page.
- **Dark palette runs the whole page** — Navigation, Hero, About, Projects, Contact, Footer all use the same dark tokens. This is a single fixed dark theme, not a light/dark toggle.
- **Typography:** display face is Bricolage Grotesque (bold weights, 700/800), body face is IBM Plex Sans (400/500/600). No third/outlier face needed. Headings are always roman (`font-style: normal`) — no italic display type anywhere.
- **Image treatment — "bordered window":** every real image (project screenshots, hometown photo) keeps its original colors, sits inside a 1px solid `var(--color-accent)` border with `border-radius: var(--radius)`, caption/title sits below the image, never overlapping it. No fake browser chrome, no mock toolbars.
- **Copy, data, links, and section order are preserved exactly.** Section order stays About → Projects → Contact. All project/contact data comes from the existing `src/data/projects.ts` (do not edit that file). Do not reword or invent copy.
- **Motion:** at most 3 distinct animation primitives on the whole page, GPU-only (`transform`/`opacity`), using the existing `--ease-out`/`--ease-in`/`--ease-in-out` and `--dur-micro`/`--dur-short`/`--dur-long` tokens already in `src/index.css`. Every animation must respect `@media (prefers-reduced-motion: reduce)` (already defined globally in `src/index.css`).
- **Mobile:** no horizontal scroll at 320px, 375px, or 414px viewport widths. `overflow-x: clip` stays set on `html`/`body` (already present).
- **Contrast:** body text on `--color-paper`/`--color-paper-2` must measure ≥ 4.5:1 (WCAG AA). Verify with the computed-luminance check in each task's verification step.
- **No dark-mode toggle.** This replaces the site's only theme; there is no light variant to maintain.

---

### Task 1: Global tokens, fonts, and Hallmark stamp

**Files:**
- Modify: `src/index.css` (currently has the Long Document stamp + terracotta OKLCH tokens from the previous build, lines 1–95 approx.)
- Modify: `index.html` (currently loads Newsreader + IBM Plex Sans via Google Fonts `<link>` tags in `<head>`)
- Modify: `tokens.css` (project-root portable token file, mirrors `src/index.css`)
- Modify: `.hallmark/log.json` (currently has one entry for the Long Document build)

**Interfaces:**
- Produces (consumed by every later task): CSS custom properties `--background`, `--foreground`, `--card`, `--card-foreground`, `--popover`, `--popover-foreground`, `--primary`, `--primary-foreground`, `--secondary`, `--secondary-foreground`, `--muted`, `--muted-foreground`, `--accent`, `--accent-foreground`, `--border`, `--input`, `--ring`, `--radius`, `--font-display`, `--font-body`, plus the existing `--space-*`, `--ease-*`, `--dur-*` tokens (unchanged, already present). Tailwind utility classes `bg-background`, `text-foreground`, `bg-card`, `text-primary`, `border-border`, `font-display`, `font-body` etc. read from these via the `@theme inline` block.

- [ ] **Step 1: Read the approved spec**

Read `docs/superpowers/specs/2026-07-21-portfolio-dark-redesign-design.md` in full for context on why these values were chosen (palette exploration, energy direction). This task implements only the "Palette" and "Typography" sections of that spec.

- [ ] **Step 2: Invoke the hallmark skill to rebuild the token layer**

Invoke the `hallmark` skill (Skill tool, `skill: "hallmark"`) with this exact brief:

```
redesign ./src/index.css --mood bold-graphic

Context: this is a re-theme of an existing Hallmark build (previous stamp:
"Long Document · nav: N6 Newspaper masthead · footer: Ft6 Letter close").
Do not ask the three-question design gate — the direction is already fully
decided (this is a --mood redesign). Apply exactly these fixed decisions,
do not invent alternatives:

- Genre: bold-graphic (custom, not a catalog theme name)
- Palette (OKLCH, near-black, single accent, reuse the project's existing
  token NAMES per contract.md — --background/--foreground/--card/--primary/
  --secondary/--muted/--border/--ring, do not introduce a parallel
  --color-paper/--color-ink naming scheme):
  --background:  oklch(20.0% 0.009 264)
  --card:        oklch(23.8% 0.011 261)
  --border:      oklch(30.8% 0.012 258)
  --foreground:  oklch(96.6% 0.003 229)
  --muted-foreground: oklch(84.3% 0.009 248)
  (a second, lower-emphasis muted tone: oklch(56.0% 0.020 246))
  --primary (the single accent): oklch(81% 0.14 229) — tune chroma into
  0.12-0.18 if 0.14 clips gamut at this lightness/hue, keep hue ~229 and
  lightness ~78-82%.
  --secondary: a slightly darker/lower-chroma step of the same neutral
  family as --card, for subtle surface variation (e.g. oklch(21.5% 0.010 262)).
  --accent: same value as --primary (alias, matching the project's existing
  convention where --accent === --primary).
  --ring: same value as --primary.
  --radius: keep small/modest (e.g. 0.375rem-0.5rem) — this is a graphic/
  bold direction, not a soft-rounded one.
- Typography: --font-display: "Bricolage Grotesque", ui-sans-serif,
  system-ui, sans-serif (weights 700/800 only for headings). --font-body:
  "IBM Plex Sans", ui-sans-serif, system-ui, sans-serif (weights 400/500/600).
  Remove the Newsreader font-family and any italic heading styling — headings
  must be font-style: normal always.
- Keep the existing --space-*, --ease-*, --dur-* tokens exactly as they are
  (do not regenerate them).
- Update the top-of-file stamp comment to:
  /* Hallmark · macrostructure: Marquee Hero + Bento Grid · nav: N5 Floating pill · footer: Ft2 Inline single line
   * genre: bold-graphic (custom) · theme: near-black mono light-blue accent · anchor hue: 229
   * pre-emit critique: <fill in real scores after this task's build passes>
   */
- This file is append-only per Hallmark's contract (keep the @tailwind/
  @import "tailwindcss" directive first, keep the @theme inline block
  structure, keep the html/body/reduced-motion rules already present —
  only replace the :root token VALUES and the h1/h2/h3/h4 rule's font-style
  and font-weight, do not restructure the file).
```

- [ ] **Step 3: Update `index.html` fonts**

Replace the existing Google Fonts `<link>` block (currently loading `IBM+Plex+Sans` and `Newsreader`) with:

```html
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700;800&family=IBM+Plex+Sans:wght@400;500;600&display=swap"
      rel="stylesheet"
    />
```

- [ ] **Step 4: Update `tokens.css`**

Rewrite the project-root `tokens.css` to mirror the new `src/index.css` `:root` values exactly (same OKLCH numbers as Step 2), renaming its documentation-only `--color-paper`/`--color-ink`/etc. names to match (this file is allowed its own semantic names since it's the portable export, not the live app file — but the OKLCH values must match `src/index.css` bit for bit).

- [ ] **Step 5: Update `.hallmark/log.json`**

Prepend a new entry (newest first) to the array:

```json
{
  "date": "2026-07-21",
  "macrostructure": "Marquee Hero + Bento Grid",
  "theme": "bold-graphic (custom, near-black mono light-blue)",
  "enrichment": "none",
  "brief": "Josep Pascual Badia · personal developer portfolio (dark redesign, brainstormed)"
}
```

Keep the previous Long Document entry below it (do not delete history).

- [ ] **Step 6: Typecheck and build**

Run: `pnpm typecheck`
Expected: no errors.

Run: `pnpm build`
Expected: `✓ built` with no errors. Note the output CSS filename for reference (it will change on each build).

- [ ] **Step 7: Verify the background/token change renders**

Start the dev server in the background: `pnpm dev --port 5185 &` (use a port not already in use — check with `lsof -i :5185` first, pick another if occupied).

Using the Playwright MCP tools: `browser_navigate` to `http://localhost:5185/`, then `browser_evaluate` with:

```js
() => {
  const bg = getComputedStyle(document.body).backgroundColor;
  const el = document.createElement('div');
  document.body.appendChild(el);
  el.remove();
  return { bodyBackgroundColor: bg };
}
```

Expected: `bodyBackgroundColor` is a near-black RGB value (NOT the previous cream `rgb(250-ish, 246-ish, 238-ish)`). Since browsers report computed OKLCH as RGB, expect something around `rgb(20-35, 22-38, 26-42)` (dark, faint blue tint) — reject anything with R/G/B channels all above 60.

- [ ] **Step 8: Commit**

```bash
git add src/index.css index.html tokens.css .hallmark/log.json
git commit -m "$(cat <<'EOF'
feat: rebuild design tokens for dark bento redesign

Swaps the Long Document terracotta/Newsreader token layer for the
approved near-black mono light-blue palette and Bricolage Grotesque +
IBM Plex Sans pairing, per docs/superpowers/specs/2026-07-21-portfolio-
dark-redesign-design.md.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 2: Navigation (N5 Floating pill)

**Files:**
- Modify: `src/components/Navigation.tsx` (currently an N6 Newspaper masthead — centered wordmark, standfirst line, double rule below)

**Interfaces:**
- Consumes: `--background`, `--card`, `--foreground`, `--muted-foreground`, `--primary`, `--border`, `--font-display`, `--dur-short` from Task 1.
- Produces: no new tokens. Keeps the existing scroll-spy behavior (`activeSection` state, `id="about"`/`id="projects"`/`id="contact"` anchor targets used by later tasks).

- [ ] **Step 1: Read the current file**

Read `src/components/Navigation.tsx` to see the existing scroll-spy `useEffect` and `navItems` array — this task keeps that logic, only changes the markup/styling from masthead to floating pill.

- [ ] **Step 2: Invoke hallmark for the nav**

Invoke the `hallmark` skill with:

```
redesign ./src/components/Navigation.tsx --mood bold-graphic

Context: part of the Marquee Hero + Bento Grid dark redesign (see
docs/superpowers/specs/2026-07-21-portfolio-dark-redesign-design.md).
Replace the current N6 Newspaper masthead with N5 Floating pill:
- A rounded, full-pill nav bar, visibly detached from the viewport edges
  (position: sticky or fixed, ~1rem/var(--space-md) from the top).
- Soft blur backdrop (backdrop-filter: blur) over var(--background),
  semi-transparent background so the page content is faintly visible
  behind it while scrolling.
- Wordmark "Josep Pascual Badia" in var(--font-display), left-aligned
  inside the pill.
- Keep the existing three nav items (About/Projects/Contact) and the
  existing scroll-spy useEffect logic exactly as-is — do not remove or
  rewrite the active-section detection, only restyle the markup around it.
- Active link state uses var(--primary) for text + a bottom-border or
  background chip in var(--primary) at low opacity; inactive links use
  var(--muted-foreground).
- Must collapse gracefully at 320px width: keep all three links on one
  line if they fit (they do — "About", "Projects", "Contact" are short),
  do not add a hamburger menu (three short items don't need one, per the
  previous build's same reasoning).
- No italic anywhere. Wordmark uses font-weight 700+ since it's
  var(--font-display) = Bricolage Grotesque.
```

- [ ] **Step 3: Typecheck**

Run: `pnpm typecheck`
Expected: no errors.

- [ ] **Step 4: Build**

Run: `pnpm build`
Expected: `✓ built` with no errors.

- [ ] **Step 5: Verify nav renders and scroll-spy still works, at three widths**

With the dev server still running from Task 1 (or restart it: `pnpm dev --port 5185 &`), for each of width 320, 375, 1280 (using `browser_resize` then `browser_navigate` to `http://localhost:5185/`):

Run `browser_evaluate`:

```js
() => ({
  scrollWidth: document.documentElement.scrollWidth,
  clientWidth: document.documentElement.clientWidth,
  navText: document.querySelector('header')?.textContent?.trim(),
})
```

Expected at every width: `scrollWidth === clientWidth` (no horizontal scroll) and `navText` includes `"About"`, `"Projects"`, and `"Contact"`.

Then scroll to the About section and re-check active state:

```js
() => {
  document.getElementById('about')?.scrollIntoView();
  return null;
}
```

Wait briefly (the scroll-spy listens on the `scroll` event — trigger a small manual scroll if needed), then verify the "About" link has `oklch`-based color matching `--primary` via `getComputedStyle`.

- [ ] **Step 6: Commit**

```bash
git add src/components/Navigation.tsx
git commit -m "$(cat <<'EOF'
feat: redesign nav as N5 floating pill for dark bento build

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 3: Hero (Marquee Hero)

**Files:**
- Modify: `src/components/Hero.tsx` (currently a Long Document opening: small inline photo + moderate h1 + lede paragraph)

**Interfaces:**
- Consumes: `--background`, `--foreground`, `--primary`, `--font-display`, `--font-body`, `--space-*`, `--ease-out`, `--dur-long` from Task 1.
- Produces: a `.hero-reveal` (or similarly named) CSS class/keyframe for the one-time headline entrance animation, which is self-contained to this file (no other task depends on it).

- [ ] **Step 1: Read the current file and the exact copy to preserve**

Read `src/components/Hero.tsx`. The exact copy that MUST be preserved verbatim:
- Headline: `Practical idealist, occasional coder.`
- Body: `I build things, chase good games, and I'm always up for trying the next dish worth crossing town for.` (note: uses `&rsquo;` for the apostrophe in the current JSX — keep that typographic apostrophe)
- Photo: `src="/developer-profile-photo.jpg"` `alt="Josep Pascual Badia"`

- [ ] **Step 2: Invoke hallmark for the hero**

Invoke the `hallmark` skill with:

```
redesign ./src/components/Hero.tsx --mood bold-graphic

Context: part of the Marquee Hero + Bento Grid dark redesign (see
docs/superpowers/specs/2026-07-21-portfolio-dark-redesign-design.md).
Rebuild this section as a Marquee Hero: a single bold full-viewport-ish
statement, no subhead crowding the fold. Exact requirements:

- Preserve the headline text "Practical idealist, occasional coder."
  exactly, and the body paragraph "I build things, chase good games, and
  I'm always up for trying the next dish worth crossing town for." exactly
  (keep the existing &rsquo; typographic apostrophe).
- Headline in var(--font-display) (Bricolage Grotesque), weight 800,
  uppercase, tight line-height (1.0-1.05), large clamp()-based size (e.g.
  clamp(2.75rem, 8vw, 5.5rem) — stay at or under Hallmark's 5.5rem/88px
  display ceiling per typography.md). Roman only, no italic.
- Add ONE graphic block: an absolutely-positioned var(--primary)-colored
  rectangle or square, rotated 8-12deg, partially bleeding off the top-right
  edge of the hero section (use overflow:hidden on the hero <section> so it
  clips cleanly, and confirm html/body keep overflow-x: clip from Task 1's
  global CSS so this never causes page-level horizontal scroll).
- Add ONE playful touch: the existing profile photo, now shown as a
  rounded-circle (not the current rounded-square), tilted -6 to -8deg via
  CSS transform, roughly 72-96px diameter, with a 2px var(--primary) border.
- Body paragraph in var(--font-body), var(--muted-foreground) color, max
  measure 58-65ch.
- Add exactly ONE motion primitive here: a one-time entrance on the
  headline only (opacity 0 -> 1, translateY(12px) -> 0, using var(--ease-out)
  and var(--dur-long), NOT scroll-triggered — fires on mount). Wrap it in
  @media (prefers-reduced-motion: reduce) so it's skipped (render final
  state immediately) for users who prefer reduced motion.
- No fake browser chrome. No section eyebrow/kicker text was in the
  original and none should be added.
- Must not overflow horizontally at 320px width — the graphic block's
  rotation/offset must stay contained by the section's overflow:hidden.
```

- [ ] **Step 3: Typecheck**

Run: `pnpm typecheck`
Expected: no errors.

- [ ] **Step 4: Build**

Run: `pnpm build`
Expected: `✓ built` with no errors.

- [ ] **Step 5: Verify copy, no horizontal scroll, and reduced-motion behavior**

With the dev server running, `browser_navigate` to `http://localhost:5185/`, then `browser_evaluate`:

```js
() => ({
  headline: document.querySelector('h1')?.textContent,
  scrollWidth: document.documentElement.scrollWidth,
  clientWidth: document.documentElement.clientWidth,
})
```

Expected: `headline === "Practical idealist, occasional coder."` and `scrollWidth === clientWidth`.

Repeat at 320px and 375px (`browser_resize` then re-navigate) — same expectation on `scrollWidth === clientWidth`.

Take a screenshot: `browser_take_screenshot` with `fullPage: false` (viewport only, since the hero is above the fold) at 1280px width, saved as `hero-1280.png`. Read it back with the Read tool and visually confirm: dark background, large bold headline, one rotated color block, one tilted circular photo.

- [ ] **Step 6: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "$(cat <<'EOF'
feat: rebuild hero as Marquee Hero for dark bento build

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 4: Projects (Bento Grid + bordered-window screenshots)

**Files:**
- Modify: `src/components/Projects.tsx` (currently Long-Document-style stacked entries with typographic links)
- Do NOT modify: `src/data/projects.ts` (data stays exactly as-is — 3 projects: VG Picker, Finance Tracker, Pokémon War Bot; 2 open-source contributions: SQLAlchemy, JHipster)
- Do NOT modify: `src/components/Icons.tsx` (reuse existing `ExternalLink`, `Github`, `GitPullRequest`, `Gamepad`, `Chart`, `Ball` icons)

**Interfaces:**
- Consumes: `--background`, `--card`, `--border`, `--foreground`, `--muted-foreground`, `--primary`, `--radius`, `--font-display`, `--dur-short`, `--space-*` from Task 1. Consumes `projects` and `openSourceContributions` arrays and the `ProjectIcon` type from `../data/projects` (unchanged shape: `{ title, description, tags, icon, liveUrl?, repoUrl?, image? }` and `{ title, description, tags, prUrl }` respectively — same as the current file already imports).
- Produces: a `.bento-tile` (or similarly named) hover-lift CSS rule, self-contained to this file.

- [ ] **Step 1: Read the current file and the data shape**

Read `src/components/Projects.tsx` and `src/data/projects.ts` to confirm the exact data shape and current icon-fallback logic (`coverIcons` map keyed by `ProjectIcon`) — this task keeps that fallback logic (for future projects with no `image`), just changes the layout from stacked list to Bento Grid.

- [ ] **Step 2: Invoke hallmark for the projects grid**

Invoke the `hallmark` skill with:

```
redesign ./src/components/Projects.tsx --mood bold-graphic

Context: part of the Marquee Hero + Bento Grid dark redesign (see
docs/superpowers/specs/2026-07-21-portfolio-dark-redesign-design.md).
Rebuild the "Selected work" section as a Bento Grid with these exact
requirements:

- Section label "Selected work" stays, styled as small-caps or uppercase
  var(--primary)-colored label (12px, letter-spacing 0.08-0.1em) above
  the grid — do not make it a two-column hanging-header (label-left,
  content-right) layout, that pattern is banned (slop-test gate 54).
  Stack it directly above the grid instead.
- Grid layout: CSS Grid, irregular tile spans (NOT uniform 3-equal-columns).
  Use this exact arrangement (matches the approved mockup): row 1 is a
  2fr/1fr split (VG Picker gets the wide tile, Finance Tracker gets the
  narrow tile), row 2 is a 1fr/2fr split (Pokémon War Bot gets the narrow
  tile, an Open Source Contributions tile gets the wide tile). On mobile
  (below 60rem / 960px per Hallmark's Bento collapse rule) collapse to a
  single column, tiles keep their relative order (VG Picker, Finance
  Tracker, Pokémon War Bot, Open Source).
- EVERY project tile: real screenshot from project.image (VG Picker =
  /projects/vg-picker.jpg, Finance Tracker = /projects/finance-tracker.jpg,
  Pokémon War Bot = /projects/pokemon-war-bot.jpg — these paths are already
  correct in src/data/projects.ts, do not change them) shown in the
  "bordered window" treatment: image keeps its own real colors, sits
  inside a 1px solid var(--primary) border with var(--radius) corners,
  the project title + description + tags + links sit BELOW the image
  (never overlapping it, no gradient scrim over the image — that was
  explicitly rejected during brainstorming). If a project has no `image`
  (use the existing coverIcons fallback logic for this case), show the
  matching icon centered on a var(--card) background instead, same
  bordered treatment.
- Below the title: description paragraph in var(--muted-foreground), tags
  joined by " · " in a smaller var(--muted-foreground) line (keep the
  existing tag-as-text-not-pills convention from the previous build — do
  not reintroduce colored pill badges for tags, that was the old
  terracotta build's pattern and reads templated).
- Links: keep the existing "View live" / "Source" typographic link pattern
  (icon + text, underline on hover) from the current file, just restyle
  the colors to var(--foreground) default / var(--primary) on hover
  instead of the old terracotta tokens.
- Open Source Contributions: keep as a second small-caps-labeled block
  below/beside the main grid (per the layout above, it's the wide bottom-
  right Bento tile) — each contribution shows title, description, tags,
  and a "Pull request" link to contribution.prUrl, same visual treatment
  as project tags/links.
- Add exactly ONE motion primitive here: bento tile hover-lift —
  transform: translateY(-3px) plus a subtle shadow upgrade, 180ms
  var(--ease-out), on :hover AND :focus-within (so keyboard users get the
  same affordance). This is the 2nd of the plan's 3 total motion
  primitives (1st was the hero headline reveal in Task 3).
- No fake browser chrome around any screenshot.
- Must not overflow horizontally at 320px width once collapsed to a
  single column.
```

- [ ] **Step 3: Typecheck**

Run: `pnpm typecheck`
Expected: no errors.

- [ ] **Step 4: Build**

Run: `pnpm build`
Expected: `✓ built` with no errors.

- [ ] **Step 5: Verify grid renders, images load, links preserved, no horizontal scroll**

With the dev server running, `browser_navigate` to `http://localhost:5185/#projects`, then `browser_evaluate`:

```js
() => {
  const links = Array.from(document.querySelectorAll('#projects a')).map(a => a.href);
  return {
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    hasVgPicker: document.body.textContent.includes('VG Picker'),
    hasFinanceTracker: document.body.textContent.includes('Finance Tracker'),
    hasPokemon: document.body.textContent.includes('Pokémon War Bot'),
    hasSqlAlchemy: document.body.textContent.includes('SQLAlchemy'),
    hasJHipster: document.body.textContent.includes('JHipster'),
    links,
  };
}
```

Expected: all five `has*` booleans are `true`; `links` includes `https://vg-picker.vercel.app`, `https://finance-tracker-ruby-mu.vercel.app`, `https://github.com/mystraldev/finance-tracker`, `https://twitter.com/PokemonWarBot1`, `https://github.com/hatsyio/pokemon-war-bot`, `https://github.com/sqlalchemy/sqlalchemy/pull/8075`, `https://github.com/jhipster/jhipster.github.io/pull/141` (the exact same hrefs from `src/data/projects.ts` — none dropped or altered); `scrollWidth === clientWidth`.

Then check each image actually loaded (not a 404):

```js
async () => {
  const imgs = Array.from(document.querySelectorAll('#projects img'));
  const results = [];
  for (const img of imgs) {
    if (!img.complete) await new Promise(r => { img.onload = img.onerror = r; });
    results.push({ src: img.src, naturalWidth: img.naturalWidth });
  }
  return results;
}
```

Expected: every entry has `naturalWidth > 0`.

Resize to 320px width, re-navigate, re-check `scrollWidth === clientWidth` (single-column collapse must not overflow).

- [ ] **Step 6: Commit**

```bash
git add src/components/Projects.tsx
git commit -m "$(cat <<'EOF'
feat: rebuild projects as Bento Grid with bordered-window screenshots

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 5: About and Contact

**Files:**
- Modify: `src/components/About.tsx` (currently Long-Document-style prose + inline hometown photo)
- Modify: `src/components/Contact.tsx` (currently inline typographic-link prose paragraph)

**Interfaces:**
- Consumes: `--background`, `--card`, `--border`, `--foreground`, `--muted-foreground`, `--primary`, `--radius`, `--font-display`, `--font-body`, `--dur-short` from Task 1.
- Produces: nothing new — both files are leaves (nothing later depends on their internals beyond the `id="about"` / `id="contact"` anchors, which already exist and must be kept for Task 2's nav links to keep working).

- [ ] **Step 1: Read both current files and the exact copy/links to preserve**

Read `src/components/About.tsx` and `src/components/Contact.tsx`. Exact copy that MUST be preserved verbatim in About (two paragraphs, both currently use `&rsquo;` for apostrophes):
1. `I'm a software engineer who likes building small, useful things — web tools, automations, and the occasional bot. Right now that means working at Carto during the day, and tinkering with side projects like a game-picker and a personal finance tracker in my spare time.`
2. `Outside of code, I'm a fairly practical idealist: I love a good video game, a cold beer, and finding the next dish worth crossing town for. I also share my home with a couple of very soft cats.`

Photo: `src="/hometown.jpeg"` `alt="My hometown"`.

Exact contact channels/hrefs that MUST be preserved (currently defined as a `links` object in Contact.tsx):
- Email: `mailto:contact@joseppascual.com`
- GitHub: `https://github.com/hatsyio`
- X: `https://x.com/hatsyio`
- LinkedIn: `https://www.linkedin.com/in/josep-pascual-badia-14a199a2/`

- [ ] **Step 2: Invoke hallmark for About**

Invoke the `hallmark` skill with:

```
redesign ./src/components/About.tsx --mood bold-graphic

Context: part of the Marquee Hero + Bento Grid dark redesign (see
docs/superpowers/specs/2026-07-21-portfolio-dark-redesign-design.md).
This section is NOT a distinct macrostructure — it extends the same dark
system established by the Hero/Bento (per the spec's "About/Contact/Footer"
section). Exact requirements:

- Preserve both paragraphs of copy exactly (see Task 5 Step 1 above for
  the exact text), including the &rsquo; apostrophes.
- Small-caps or uppercase "About" label in var(--primary), same treatment
  as the "Selected work" label in Projects.tsx, stacked directly above
  the content (not a hanging left-margin label).
- Pick out 1-2 short phrases within the body copy in var(--primary) with
  font-weight 600 (e.g. "software engineer" in the first paragraph,
  "practical idealist" in the second) — do not recolor entire sentences,
  just short 2-3 word phrases, and do not change the wording itself.
- Hometown photo in the same "bordered window" treatment as Projects: 1px
  solid var(--primary) border, var(--radius) corners, own real colors,
  no overlay/gradient/caption text on top of it.
- Body text in var(--font-body), var(--muted-foreground), max measure
  ~52-58ch, line-height 1.6-1.65.
- No motion here — About gets zero animation primitives (the plan's 3
  total primitives are used by Hero's headline reveal and Projects'
  tile hover-lift; do not add a third one here).
```

- [ ] **Step 3: Invoke hallmark for Contact**

Invoke the `hallmark` skill with:

```
redesign ./src/components/Contact.tsx --mood bold-graphic

Context: part of the Marquee Hero + Bento Grid dark redesign (see
docs/superpowers/specs/2026-07-21-portfolio-dark-redesign-design.md).
Per the approved mockup, replace the current inline-typographic-link
paragraph with four bordered tile-buttons in a 2x2 grid (1 column on
narrow viewports below 40rem/640px). Exact requirements:

- Keep the exact four channels and hrefs (do not change any):
  Email -> mailto:contact@joseppascual.com (no target/rel, it's a mailto)
  GitHub -> https://github.com/hatsyio (target="_blank" rel="noopener noreferrer")
  X -> https://x.com/hatsyio (target="_blank" rel="noopener noreferrer")
  LinkedIn -> https://www.linkedin.com/in/josep-pascual-badia-14a199a2/ (target="_blank" rel="noopener noreferrer")
- Each tile: 1px solid var(--border) by default, icon (reuse Mail/Github/
  Twitter/Linkedin from ../components/Icons — these already exist, do not
  create new icon components) + visible text label ("Email", "GitHub",
  "X", "LinkedIn"), var(--foreground) text.
- On :hover and :focus-visible: border becomes var(--primary), icon/text
  become var(--primary). Every tile must have a visible :focus-visible
  ring/border change (keyboard-navigable, not hover-only).
- Small-caps/uppercase "Contact" label above, same treatment as the
  "About" and "Selected work" labels (var(--primary), stacked above,
  not a hanging left-margin label).
- Keep a short intro line above the grid (the current file has "Got a
  question or want to collaborate on something?" as part of a longer
  sentence — you may shorten it to a standalone lead-in sentence since
  the links are now buttons, not inline prose, but do not invent new
  claims or change its meaning).
- No motion here beyond the color-shift on hover/focus above (that's a
  simple property transition, not counted against the plan's 3-primitive
  cap — the cap is for animation/transform primitives specifically:
  headline reveal + tile hover-lift).
- Minimum tap target 44x44px on every tile (WCAG AA), confirmed at 320px
  width.
```

- [ ] **Step 4: Typecheck**

Run: `pnpm typecheck`
Expected: no errors.

- [ ] **Step 5: Build**

Run: `pnpm build`
Expected: `✓ built` with no errors.

- [ ] **Step 6: Verify copy, links, and layout for both sections**

With the dev server running, `browser_navigate` to `http://localhost:5185/`, then `browser_evaluate`:

```js
() => {
  const aboutText = document.getElementById('about')?.textContent || '';
  const contactLinks = Array.from(document.querySelectorAll('#contact a')).map(a => ({ href: a.href, text: a.textContent.trim() }));
  return {
    hasCarto: aboutText.includes('Carto'),
    hasCats: aboutText.includes('cats'),
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    contactLinks,
  };
}
```

Expected: `hasCarto` and `hasCats` both `true` (confirms the two paragraphs survived); `contactLinks` has exactly 4 entries with hrefs `mailto:contact@joseppascual.com`, `https://github.com/hatsyio/`, `https://x.com/hatsyio/`, `https://www.linkedin.com/in/josep-pascual-badia-14a199a2/`; `scrollWidth === clientWidth`.

Resize to 320px, re-navigate, re-check `scrollWidth === clientWidth`, and check each contact tile's bounding box is at least 44x44:

```js
() => Array.from(document.querySelectorAll('#contact a')).map(a => {
  const r = a.getBoundingClientRect();
  return { width: r.width, height: r.height };
})
```

Expected: every entry has `height >= 44`.

- [ ] **Step 7: Commit**

```bash
git add src/components/About.tsx src/components/Contact.tsx
git commit -m "$(cat <<'EOF'
feat: extend dark bento system to About and Contact

Contact moves from inline typographic links to bordered tile-buttons;
About gets the bordered-window photo treatment and accent-highlighted
phrases. Copy and links unchanged.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 6: Footer, final stamp critique, and full-page verification

**Files:**
- Modify: `src/components/Footer.tsx` (currently Ft6 Letter close — italic signoff line + P.S. + copyright)
- Modify: `src/index.css` (only the `pre-emit critique` line in the Task 1 stamp comment, filled in with real scores now that the whole page is built)

**Interfaces:**
- Consumes: `--background`, `--border`, `--muted-foreground`, `--primary` from Task 1.
- Produces: nothing (final task).

- [ ] **Step 1: Read the current footer file**

Read `src/components/Footer.tsx` — currently: italic `font-display` signoff ("Yours, Josep. {year}."), a P.S. line about the tech stack, and a copyright line, all above a top border.

- [ ] **Step 2: Invoke hallmark for the footer**

Invoke the `hallmark` skill with:

```
redesign ./src/components/Footer.tsx --mood bold-graphic

Context: part of the Marquee Hero + Bento Grid dark redesign (see
docs/superpowers/specs/2026-07-21-portfolio-dark-redesign-design.md).
Per the spec, the footer is deliberately quiet (boldness is front-loaded
in Hero/Bento) — this maps to Ft2 Inline single line. Exact requirements:

- Remove the italic signoff line entirely (italic display/heading-style
  text is banned by Hallmark's typography rules, and the spec calls for
  "quiet" here, not a literary flourish that no longer fits the
  bold-graphic direction).
- Single line: "© {current year} Josep Pascual Badia" in var(--muted-
  foreground), plus a small var(--primary)-colored circular dot (roughly
  16-20px, rotated -8deg via CSS transform, echoing the hero's tilted
  photo) positioned at the opposite end of the line (flex justify-
  content: space-between).
- Hairline var(--border) rule above the line, no columns, no link list.
- You may drop the P.S. tech-stack line, or keep a short version of it
  as plain var(--muted-foreground) text above the copyright line if it
  still reads as quiet, honest colophon text — either is fine, but do
  not fabricate any new claims about the tech stack (React, TypeScript,
  Tailwind are the actual stack, per package.json).
```

- [ ] **Step 3: Typecheck**

Run: `pnpm typecheck`
Expected: no errors.

- [ ] **Step 4: Build**

Run: `pnpm build`
Expected: `✓ built` with no errors.

- [ ] **Step 5: Full-page verification — desktop, tablet, and three mobile widths**

With the dev server running, for each width in `[320, 375, 414, 768, 1280]` (use `browser_resize` then `browser_navigate` to `http://localhost:5185/` fresh each time):

`browser_evaluate`:

```js
() => ({
  scrollWidth: document.documentElement.scrollWidth,
  clientWidth: document.documentElement.clientWidth,
})
```

Expected at every width: `scrollWidth === clientWidth`.

At 1280px, take a full-page screenshot: `browser_take_screenshot` with `fullPage: true`, filename `full-page-1280.png`. Read it back with the Read tool and confirm, section by section: dark near-black background throughout (Nav, Hero, About, Projects, Contact, Footer all consistently dark — no leftover light/cream sections), single light-blue accent used for the graphic block, tilted photo/dot, borders, and active nav state (no second accent color visible anywhere), Bricolage Grotesque bold headline in the hero, bordered-window screenshots in the Bento grid with their own real colors intact, bordered tile-buttons in Contact, quiet single-line footer.

- [ ] **Step 6: Verify contrast on body text**

`browser_evaluate`:

```js
() => {
  function relLuminance(r, g, b) {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c /= 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  }
  function parseRgb(str) {
    const m = str.match(/\d+/g).map(Number);
    return m;
  }
  function contrastRatio(hex1, hex2) {
    const l1 = relLuminance(...hex1);
    const l2 = relLuminance(...hex2);
    const [lighter, darker] = l1 > l2 ? [l1, l2] : [l2, l1];
    return (lighter + 0.05) / (darker + 0.05);
  }
  const aboutP = document.querySelector('#about p');
  const bg = parseRgb(getComputedStyle(document.getElementById('about')).backgroundColor || getComputedStyle(document.body).backgroundColor);
  const fg = parseRgb(getComputedStyle(aboutP).color);
  return { ratio: contrastRatio(bg, fg), bg, fg };
}
```

Expected: `ratio >= 4.5`.

- [ ] **Step 7: Verify reduced-motion is respected**

`browser_evaluate` cannot toggle OS-level `prefers-reduced-motion` directly, so instead inspect the CSS: confirm the hero's headline-reveal animation and the Projects tile hover-lift transition are both wrapped in, or governed by, the existing global `@media (prefers-reduced-motion: reduce)` block in `src/index.css` (already present from before Task 1, untouched by this plan — it forces `animation-duration`/`transition-duration` to `150ms` for everything). Read `src/index.css` and confirm this block is still intact and still the last rule in the file (or still present, wherever Hallmark's edits left it).

- [ ] **Step 8: Fill in the real pre-emit critique score**

Score the finished build 1-5 on Philosophy, Hierarchy, Execution, Specificity, Restraint, Variety (per Hallmark's own self-critique discipline — see `.claude/skills/hallmark/references/slop-test.md` § Pre-emit self-critique if you need the rubric). Edit the stamp comment at the top of `src/index.css` (written in Task 1 with a placeholder) to replace `<fill in real scores after this task's build passes>` with the six real scores, e.g. `P5 H5 E4 S5 R4 V5`. Any axis scoring below 3 means going back to the relevant task and fixing it before proceeding.

- [ ] **Step 9: Commit**

```bash
git add src/components/Footer.tsx src/index.css
git commit -m "$(cat <<'EOF'
feat: quiet Ft2 footer and final stamp critique for dark bento build

Completes the Marquee Hero + Bento Grid redesign across the whole page.
Verified: no horizontal scroll at 320/375/414/768/1280px, body text
contrast >= 4.5:1, reduced-motion respected, all copy/links/data preserved.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

- [ ] **Step 10: Stop the dev server**

Find and kill the background `pnpm dev` process started in Task 1 (e.g. `lsof -ti :5185 | xargs kill` or kill the job by its shell job ID if run with `&` in the current shell).
