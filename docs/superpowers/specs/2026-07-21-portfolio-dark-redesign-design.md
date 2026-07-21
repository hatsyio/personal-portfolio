# Portfolio dark redesign — design

## Context

The current site (built earlier via `hallmark redesign`) uses Hallmark's Long Document
macrostructure: a calm, editorial, terracotta-on-cream reading experience with Newsreader
serif headings and no motion. The user found it boring — specifically the structure (a flat
scroll of text blocks), the color/type (safe, muted), and the overall energy (too quiet for
someone whose bio leads with games/food/cats).

This spec captures a brainstorm session (with the visual companion) that explored three
distinct energy directions, merged them, iterated on palette, and validated a full-page
mockup before approval. It replaces the Long Document redesign with a new direction, to be
executed by the `hallmark` skill.

## Decisions

### Energy
Combine elements from three explored directions rather than picking one purely:
- **Bold/graphic** — high contrast, oversized display type, a hard graphic color-block
  breaking the frame, confident asymmetric layout.
- **Playful** — a tilted circular badge/photo, pill-shaped tags, a little irreverence.
- **Vibrant** — explored as a multi-color system, but narrowed down through iteration to a
  single accent (see Palette). The "vibrant" contribution survives as confident, generous use
  of that one accent rather than multiple hues.

### Palette
Near-black, cool-neutral paper with a single light sky-blue accent. No second accent color.
Precise OKLCH anchors (computed from the approved mockup, to be fine-tuned during build to
keep the accent's chroma in Hallmark's 0.12–0.22 accent band while holding hue/lightness):

```
--color-paper:       oklch(20.0% 0.009 264)   /* page background */
--color-paper-2:     oklch(23.8% 0.011 261)   /* card / tile surface */
--color-rule:        oklch(30.8% 0.012 258)   /* borders, hairlines */
--color-ink:         oklch(96.6% 0.003 229)   /* primary text */
--color-muted:       oklch(84.3% 0.009 248)   /* body copy on dark */
--color-muted-2:     oklch(56.0% 0.020 246)   /* low-emphasis text */
--color-accent:      oklch(81% 0.12–0.18 229) /* light sky-blue — tune chroma up from the
                                                  0.075 the mockup's #8ecbe8 measures at,
                                                  into Hallmark's accent range, same hue/L */
```

Scope: the dark palette runs the **whole page** — About, Projects, Contact, and Footer all
live in it, not just the hero. This was an explicit choice (rejected the "bold hero, lighter
body" alternative).

### Typography
- **Display:** Bricolage Grotesque (bold weights) — carries the playful edge better than the
  serif from the previous build.
- **Body:** IBM Plex Sans (kept from the previous build — it already reads clean and is not
  a banned default).
- No outlier/mono face needed.

### Macrostructure
- **Hero:** Marquee Hero — a single full-viewport bold statement (the headline, the tilted
  photo/emoji badge, the graphic color-block), no subhead crowding the fold.
- **Projects:** Bento Grid — irregular tile sizes (not uniform cards), real project
  screenshots given genuine visual weight.
- **About / Contact / Footer:** not a distinct macrostructure of their own — they extend the
  same visual system (dark bg, same accent, same type) established by Hero + Bento, per the
  approved mockup:
  - **About:** prose on dark background, one or two key phrases picked out in the accent
    color instead of a uniform gray wall of text, hometown photo in the same bordered-window
    treatment as project screenshots.
  - **Contact:** four bordered tile-buttons (Email, GitHub, X, LinkedIn) in a 2×2 grid,
    replacing the previous build's plain inline typographic links — matches the Bento
    energy better than underlined text would.
  - **Footer:** deliberately quiet — copyright line + a small tilted accent-colored dot for
    continuity. The boldness is front-loaded in Hero/Bento, not repeated here.

### Image treatment — "bordered window"
Every real image (project screenshots, hometown photo) keeps its own original colors, sits
inside a hairline accent-colored border, with the caption/title below it — never overlapping
the image. Rejected alternatives: full-bleed image with a bottom gradient scrim (rejected —
the brightest screenshots, like VG Picker's light UI, would fight the dark palette too hard),
and a duotone tint over every screenshot (rejected — it edits the real screenshot rather than
showing it as-is). This directly answers the concern that dropping bright real screenshots
flat into near-black tiles would look broken — the border does the separating work instead of
altering the image.

### Motion
Marquee Hero and Bento Grid are both "motion default-on" archetypes in Hallmark's system
(unlike Long Document, which was motion-off). Ship exactly 2–3 purposeful primitives, no more:
1. Bento tile hover-lift (`translateY(-3px)` + shadow upgrade, per Hallmark's motion canon).
2. One-time hero headline entrance (opacity/translateY reveal on load, not scroll-triggered,
   capped per Hallmark's stagger rules).
3. (Optional third, decided at build time if it earns its place — e.g. a tag hover color
   shift.) Do not exceed three distinct animation primitives on the page.
All motion respects `prefers-reduced-motion`.

## What's preserved (non-negotiable)

Same as every prior redesign pass on this project: exact copy, exact project/contact data
(from `src/data/projects.ts`), section order (About → Projects → Contact), all real assets
(profile photo, hometown photo, project screenshots) — nothing invented, nothing reworded
without being asked.

## What's explicitly out of scope

- No second accent color (the "vibrant multi-color" idea was explored and deliberately
  narrowed to mono-accent through the brainstorm — do not reintroduce it without a fresh
  ask).
- No fake browser chrome / mock toolbars around screenshots (Hallmark rule, unaffected by
  this redesign).
- No dark-mode *toggle* — this is a single fixed dark theme, not a light/dark switch.

## Open implementation details (for the build step)

- Exact Bento Grid tile count/spans for the 3 projects + open-source contributions block —
  the mockup showed one plausible arrangement (2-tile top row, 2-tile bottom row); Hallmark
  should pick genuinely irregular spans per its own diversification rules, not necessarily
  copy the mockup's exact grid 1:1.
- Exact accent chroma tuning (see Palette note above) and contrast verification (Hallmark's
  4.5:1 / 7:1 text contrast targets) once real tokens are in code.
- Nav treatment was not part of this brainstorm — Hallmark should pick a nav archetype
  appropriate to Marquee Hero + Bento Grid + dark palette (e.g. N5 Floating pill or N9
  Edge-aligned minimal) and state the pick per its own process, same as the previous build.
- Footer archetype likewise wasn't pinned to a named Hallmark archetype — build step should
  map "quiet copyright + accent dot" to the closest fit (likely Ft2 Inline single line) and
  state it.
