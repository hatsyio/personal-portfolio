# Editorial/Warm Portfolio Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `personal-portfolio` with the approved Editorial/Warm visual design, English copy, no blog, and a manually-curated Projects section linking to live Vercel deployments.

**Architecture:** Single-page React app (no more client-side routing), same Vite + Tailwind + TypeScript build. Color/typography changes are centralized in CSS custom properties in `src/index.css` so components keep using the existing semantic Tailwind classes (`bg-background`, `text-primary`, etc.) — only the token *values* change.

**Tech Stack:** React 18, Vite 6, TypeScript 5, Tailwind CSS 4, pnpm. No test framework exists in this repo today (verification is `tsc --noEmit` + `vite build`, matching the existing Husky pre-commit hook) — this plan follows that same pattern rather than introducing new test tooling for a presentational rebuild.

## Global Constraints

- Spec: `docs/superpowers/specs/2026-07-15-editorial-portfolio-rebuild-design.md`
- All work happens on the `rebuild-editorial` branch (already created); the live site on `main` must stay untouched until the final PR is merged
- Per `AGENTS.md`: never commit directly to the default branch — this branch + PR flow is required
- Keep `.github/workflows/deploy.yml` and `public/CNAME` unchanged — no hosting/DNS changes
- No blog, no react-router-dom, no dynamic project fetching — projects are a manually maintained array
- All copy is in English
- Contact links: email `contact@joseppascual.com` (unchanged from the current live site), GitHub `https://github.com/hatsyio`, X `https://x.com/hatsyio`, LinkedIn `https://www.linkedin.com/in/josep-pascual-badia-14a199a2/`
- Projects to include: **VG Picker** (`https://vg-picker.vercel.app`, no repo link — the `hatsyio/vg-picker` GitHub repo is private) and **Finance Tracker** (`https://finance-tracker-ruby-mu.vercel.app`, repo `https://github.com/mystraldev/finance-tracker`, public)

---

### Task 1: Remove blog and routing, flatten to a single page

**Files:**
- Delete: `src/components/Blog.tsx`
- Delete: `src/pages/BlogPost.tsx`
- Delete: `src/data/blogPosts.ts`
- Delete: `public/open-source-collaboration.png`, `public/python-bot-development.jpg`, `public/gaming-technology-creative.jpg` (only referenced by the deleted blog data)
- Delete: `netlify.toml`
- Modify: `src/pages/Home.tsx`
- Modify: `src/App.tsx`
- Modify: `src/main.tsx`
- Modify: `package.json:12` (remove `react-router-dom` dependency)

**Interfaces:**
- Produces: `Home` component with no Blog section — later tasks (4–9) rewrite the components it renders, but its shape (`Navigation`, `Hero`, `About`, `Projects`, `Contact`, `Footer`) stays stable from here on.

- [ ] **Step 1: Delete blog files and orphaned blog images**

```bash
git rm src/components/Blog.tsx src/pages/BlogPost.tsx src/data/blogPosts.ts
git rm public/open-source-collaboration.png public/python-bot-development.jpg public/gaming-technology-creative.jpg
git rm netlify.toml
```

- [ ] **Step 2: Rewrite `src/pages/Home.tsx` to drop the Blog import/usage**

```tsx
import { Navigation } from '../components/Navigation'
import { Hero } from '../components/Hero'
import { About } from '../components/About'
import { Projects } from '../components/Projects'
import { Contact } from '../components/Contact'
import { Footer } from '../components/Footer'

export function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
```

- [ ] **Step 3: Rewrite `src/App.tsx` to render `Home` directly, no routing**

```tsx
import { Home } from './pages/Home'

function App() {
  return <Home />
}

export default App
```

- [ ] **Step 4: Rewrite `src/main.tsx` to drop `BrowserRouter`**

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

- [ ] **Step 5: Remove `react-router-dom` from `package.json` dependencies**

In `package.json`, delete this line from `"dependencies"`:

```json
    "react-router-dom": "6.28.0"
```

(Remove the trailing comma from the preceding `"react-dom"` line so the JSON stays valid.)

- [ ] **Step 6: Update the lockfile**

Run: `pnpm install`
Expected: `pnpm-lock.yaml` updates, `react-router-dom` and `react-router` entries are removed, install succeeds with no errors.

- [ ] **Step 7: Verify the app still builds and typechecks**

Run: `pnpm typecheck && pnpm build`
Expected: both succeed with no errors (no leftover references to `react-router-dom`, `Blog`, or `BlogPost`).

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "chore: remove blog and routing, drop netlify config"
```

---

### Task 2: Switch theme tokens to the Editorial/Warm palette

**Files:**
- Modify: `src/index.css` (full rewrite of the `:root` token block)

**Interfaces:**
- Produces: `--background`, `--foreground`, `--card`, `--primary`, `--accent`, `--secondary`, `--muted`, `--border` CSS variables consumed via Tailwind's `bg-*`/`text-*`/`border-*` classes throughout every component — this is why components elsewhere in the plan don't need per-component color overrides.

- [ ] **Step 1: Replace `src/index.css` in full**

```css
@import "tailwindcss";

:root {
  /* Warm off-white background */
  --background: #faf6ee;
  /* Near-black brown text */
  --foreground: #2b2620;
  /* Slightly darker warm card background */
  --card: #f2ead9;
  --card-foreground: #2b2620;
  --popover: #f2ead9;
  --popover-foreground: #2b2620;
  /* Terracotta — the site's single accent color */
  --primary: #c2703d;
  --primary-foreground: #faf6ee;
  --secondary: #e6ddc9;
  --secondary-foreground: #2b2620;
  --muted: #efe7d6;
  --muted-foreground: #6b6255;
  --accent: #c2703d;
  --accent-foreground: #faf6ee;
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.98 0 0);
  --border: #e6ddc9;
  --input: #e6ddc9;
  --ring: #c2703d;
  --radius: 0.75rem;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}

* {
  @apply border-border outline-ring/50;
}

body {
  @apply bg-background text-foreground;
  margin: 0;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3 {
  font-family: Georgia, 'Times New Roman', serif;
}
```

- [ ] **Step 2: Verify it builds and typechecks**

Run: `pnpm typecheck && pnpm build`
Expected: both succeed (pure CSS change, no type impact).

- [ ] **Step 3: Commit**

```bash
git add src/index.css
git commit -m "style: switch theme tokens to editorial/warm palette"
```

---

### Task 3: Add a LinkedIn icon

**Files:**
- Modify: `src/components/Icons.tsx`

**Interfaces:**
- Produces: `Linkedin({ className }: IconProps)` — used by Task 9's Contact rewrite.

- [ ] **Step 1: Append a `Linkedin` icon export to `src/components/Icons.tsx`**

Add this function after the existing `Globe` export (keep every existing export in the file unchanged):

```tsx
export function Linkedin({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.446-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.114 20.452H3.56V9h3.554v11.452z" />
    </svg>
  )
}
```

- [ ] **Step 2: Verify it typechecks**

Run: `pnpm typecheck`
Expected: PASS (no consumers yet, just confirming the new export compiles).

- [ ] **Step 3: Commit**

```bash
git add src/components/Icons.tsx
git commit -m "feat: add LinkedIn icon"
```

---

### Task 4: Rewrite Navigation as a top sticky bar

**Files:**
- Modify: `src/components/Navigation.tsx` (full rewrite)

**Interfaces:**
- Consumes: `--background`, `--border`, `--primary`, `--muted-foreground` theme tokens from Task 2.
- Produces: no exports consumed elsewhere; renders section anchors `#about`, `#projects`, `#contact` which Tasks 6–9 must keep as their section `id`s.

- [ ] **Step 1: Replace `src/components/Navigation.tsx` in full**

```tsx
import { useState, useEffect } from 'react'

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

export function Navigation() {
  const [activeSection, setActiveSection] = useState('about')

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      for (const item of navItems) {
        const element = document.getElementById(item.id)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(item.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
      <nav className="max-w-3xl mx-auto flex items-center justify-between px-6 py-4">
        <span className="text-sm tracking-wide">Josep Pascual Badia</span>
        <ul className="flex gap-6">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`text-sm tracking-wide transition-colors duration-300 pb-1 border-b-2 ${
                  activeSection === item.id
                    ? 'text-primary border-primary'
                    : 'text-muted-foreground border-transparent hover:text-primary'
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
```

- [ ] **Step 2: Verify it typechecks and builds**

Run: `pnpm typecheck && pnpm build`
Expected: both succeed.

- [ ] **Step 3: Commit**

```bash
git add src/components/Navigation.tsx
git commit -m "feat: rewrite navigation as a top sticky bar"
```

---

### Task 5: Rewrite Hero

**Files:**
- Modify: `src/components/Hero.tsx` (full rewrite)

**Interfaces:**
- Consumes: `public/developer-profile-photo.jpg` (existing asset, unchanged).
- Produces: no exports consumed elsewhere. No section `id` (Hero sits above `#about`, matching the approved design — nav has no "Home" link).

- [ ] **Step 1: Replace `src/components/Hero.tsx` in full**

```tsx
export function Hero() {
  return (
    <section className="min-h-screen flex items-center px-6 py-20">
      <div className="max-w-3xl mx-auto w-full">
        <div className="mb-8">
          <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-secondary">
            <img
              src="/developer-profile-photo.jpg"
              alt="Josep Pascual Badia"
              width="112"
              height="112"
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        <h1 className="text-4xl lg:text-5xl italic mb-4 text-balance">
          Practical idealist, occasional coder.
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
          I build things, chase good games, and I&apos;m always up for trying the next dish worth crossing town for.
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify it typechecks and builds**

Run: `pnpm typecheck && pnpm build`
Expected: both succeed.

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "feat: rewrite hero with editorial copy"
```

---

### Task 6: Rewrite About

**Files:**
- Modify: `src/components/About.tsx` (full rewrite)

**Interfaces:**
- Consumes: `public/hometown.jpeg` (existing asset, unchanged).
- Produces: section with `id="about"`, matching Task 4's nav anchor.

- [ ] **Step 1: Replace `src/components/About.tsx` in full**

```tsx
export function About() {
  return (
    <section id="about" className="min-h-screen flex items-center px-6 py-20">
      <div className="max-w-3xl mx-auto w-full">
        <h2 className="text-3xl lg:text-4xl italic mb-10">About</h2>

        <div className="space-y-8 text-lg leading-relaxed">
          <p className="text-muted-foreground">
            I&apos;m a software engineer who likes building small, useful things — web tools, automations, and the
            occasional bot. Right now that means working at Carto during the day, and tinkering with side
            projects like a game-picker and a personal finance tracker in my spare time.
          </p>

          <div className="w-full h-64 rounded-lg overflow-hidden">
            <img
              src="/hometown.jpeg"
              alt="My hometown"
              width="800"
              height="400"
              className="object-cover w-full h-full"
            />
          </div>

          <p className="text-muted-foreground">
            Outside of code, I&apos;m a fairly practical idealist: I love a good video game, a cold beer, and
            finding the next dish worth crossing town for. I also share my home with a couple of very soft cats.
          </p>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify it typechecks and builds**

Run: `pnpm typecheck && pnpm build`
Expected: both succeed.

- [ ] **Step 3: Commit**

```bash
git add src/components/About.tsx
git commit -m "feat: rewrite about section with editorial copy"
```

---

### Task 7: Add manually-curated projects data

**Files:**
- Create: `src/data/projects.ts`

**Interfaces:**
- Produces: `interface Project { title: string; description: string; tags: string[]; vercelUrl: string; repoUrl?: string; image?: string }` and `export const projects: Project[]` — consumed by Task 8's `Projects` component. `image` is optional and unset for both current entries; it exists so future projects can add a screenshot without a type change.

- [ ] **Step 1: Create `src/data/projects.ts`**

```ts
export interface Project {
  title: string
  description: string
  tags: string[]
  vercelUrl: string
  repoUrl?: string
  image?: string
}

export const projects: Project[] = [
  {
    title: 'VG Picker',
    description:
      'Ranks games by critic score divided by hours-to-beat, so a great 6-hour game beats an equally great 80-hour epic. Scope the ranking globally or to a specific subscription service like Xbox Game Pass or PS Plus.',
    tags: ['React', 'TypeScript', 'Supabase'],
    vercelUrl: 'https://vg-picker.vercel.app',
  },
  {
    title: 'Finance Tracker',
    description:
      'A personal finance tracker for keeping tabs on spending and budgets, built as a React + TypeScript single-page app.',
    tags: ['React', 'TypeScript', 'Vite'],
    vercelUrl: 'https://finance-tracker-ruby-mu.vercel.app',
    repoUrl: 'https://github.com/mystraldev/finance-tracker',
  },
]
```

- [ ] **Step 2: Verify it typechecks**

Run: `pnpm typecheck`
Expected: PASS (no consumers yet, just confirming the file compiles).

- [ ] **Step 3: Commit**

```bash
git add src/data/projects.ts
git commit -m "feat: add manually-curated projects data"
```

---

### Task 8: Rewrite Projects to consume the data file

**Files:**
- Modify: `src/components/Projects.tsx` (full rewrite)
- Delete: `public/pokemon-battle-bot-twitter-interface.jpg`, `public/modern-personal-website-design.jpg`, `public/election-data-visualization-dashboard.jpg`, `public/java-development-framework-code.jpg`, `public/placeholder.jpg`, `public/placeholder.svg`, `public/placeholder-logo.png`, `public/placeholder-logo.svg`, `public/placeholder-user.jpg` (only referenced by the old hardcoded project list and blog placeholder fallback, both now gone)

**Interfaces:**
- Consumes: `Project` type and `projects` array from Task 7 (`../data/projects`); `ExternalLink`, `Github` icons from `./Icons`.
- Produces: section with `id="projects"`, matching Task 4's nav anchor.

- [ ] **Step 1: Replace `src/components/Projects.tsx` in full**

```tsx
import { ExternalLink, Github } from './Icons'
import { projects } from '../data/projects'

export function Projects() {
  return (
    <section id="projects" className="min-h-screen flex items-center px-6 py-20">
      <div className="max-w-3xl mx-auto w-full">
        <h2 className="text-3xl lg:text-4xl italic mb-10">Projects</h2>

        <div className="space-y-6">
          {projects.map((project) => (
            <div key={project.title} className="border border-border rounded-lg p-6 bg-card/60">
              {project.image && (
                <div className="w-full h-40 rounded-md overflow-hidden mb-4">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="text-2xl font-semibold">{project.title}</h3>
                <div className="flex items-center gap-3 shrink-0">
                  <a
                    href={project.vercelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                    aria-label={`Open ${project.title} on Vercel`}
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors duration-300"
                      aria-label={`View ${project.title} source on GitHub`}
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
              <p className="text-base text-muted-foreground mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Delete the now-orphaned placeholder/project images**

```bash
git rm public/pokemon-battle-bot-twitter-interface.jpg public/modern-personal-website-design.jpg
git rm public/election-data-visualization-dashboard.jpg public/java-development-framework-code.jpg
git rm public/placeholder.jpg public/placeholder.svg public/placeholder-logo.png public/placeholder-logo.svg public/placeholder-user.jpg
```

- [ ] **Step 3: Verify it typechecks and builds**

Run: `pnpm typecheck && pnpm build`
Expected: both succeed, with the two projects (VG Picker, Finance Tracker) appearing in the built output.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: rebuild projects section from curated data, drop unused images"
```

---

### Task 9: Rewrite Contact

**Files:**
- Modify: `src/components/Contact.tsx` (full rewrite)

**Interfaces:**
- Consumes: `Github`, `Twitter`, `Mail`, `Linkedin` from `./Icons` (all four exist as of Task 3).
- Produces: section with `id="contact"`, matching Task 4's nav anchor.

- [ ] **Step 1: Replace `src/components/Contact.tsx` in full**

```tsx
import { Github, Twitter, Mail, Linkedin } from './Icons'

const links = [
  { label: 'Email', value: 'contact@joseppascual.com', href: 'mailto:contact@joseppascual.com', Icon: Mail },
  { label: 'GitHub', value: '@hatsyio', href: 'https://github.com/hatsyio', Icon: Github },
  { label: 'X (Twitter)', value: '@hatsyio', href: 'https://x.com/hatsyio', Icon: Twitter },
  {
    label: 'LinkedIn',
    value: 'josep-pascual-badia',
    href: 'https://www.linkedin.com/in/josep-pascual-badia-14a199a2/',
    Icon: Linkedin,
  },
]

export function Contact() {
  return (
    <section id="contact" className="min-h-screen flex items-center px-6 py-20">
      <div className="max-w-3xl mx-auto w-full">
        <h2 className="text-3xl lg:text-4xl italic mb-10">Contact</h2>

        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          Got a question or want to collaborate on something? Reach out through any of these — always happy to
          hear about new projects.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {links.map(({ label, value, href, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto:') ? undefined : '_blank'}
              rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
              className="group flex items-center gap-4 p-5 border border-border rounded-lg bg-card/60 hover:border-primary/60 transition-colors duration-300"
            >
              <Icon className="w-6 h-6 text-primary" />
              <div>
                <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">{label}</h3>
                <p className="text-sm text-muted-foreground">{value}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify it typechecks and builds**

Run: `pnpm typecheck && pnpm build`
Expected: both succeed.

- [ ] **Step 3: Commit**

```bash
git add src/components/Contact.tsx
git commit -m "feat: rewrite contact section with linkedin link"
```

---

### Task 10: Simplify Footer

**Files:**
- Modify: `src/components/Footer.tsx` (full rewrite)

**Interfaces:**
- Produces: no exports consumed elsewhere.

- [ ] **Step 1: Replace `src/components/Footer.tsx` in full**

```tsx
export function Footer() {
  return (
    <footer className="border-t border-border py-8 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Josep Pascual Badia</p>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Verify it typechecks and builds**

Run: `pnpm typecheck && pnpm build`
Expected: both succeed.

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "feat: simplify footer to copyright only"
```

---

### Task 11: Update page metadata

**Files:**
- Modify: `index.html:6` (meta description)

**Interfaces:**
- None — metadata only.

- [ ] **Step 1: Update the meta description in `index.html`**

Change:

```html
    <meta name="description" content="Personal portfolio showcasing my projects, hobbies, and blog" />
```

to:

```html
    <meta name="description" content="Personal portfolio showcasing my projects and a bit about me." />
```

- [ ] **Step 2: Verify it builds**

Run: `pnpm build`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "docs: update meta description, drop blog mention"
```

---

### Task 12: Full verification and PR

**Files:** none (verification and git/GitHub operations only)

- [ ] **Step 1: Clean install and full verification**

Run: `pnpm install --frozen-lockfile && pnpm typecheck && pnpm build`
Expected: all three succeed with no errors.

- [ ] **Step 2: Manual check in the browser**

Run: `pnpm dev`, open the printed local URL (typically `http://localhost:5173`), and check:
- Nav links scroll to About/Projects/Contact and the active-section underline updates
- Hero, About, and Projects photos render correctly on the warm background
- Both project cards show correct titles/descriptions/tags, and their Vercel links (plus the Finance Tracker GitHub link) open the right pages
- All four Contact links (Email, GitHub, X, LinkedIn) point to the right destination
- Layout holds up at mobile width (~375px) and desktop width — resize the window or use browser dev tools device toolbar

Stop the dev server (Ctrl+C) once satisfied.

- [ ] **Step 3: Push the branch**

Run: `git push -u origin rebuild-editorial`
Expected: branch pushed successfully.

- [ ] **Step 4: Open a PR into `main`**

```bash
gh pr create --title "Rebuild portfolio: editorial/warm redesign" --body "$(cat <<'EOF'
## Summary
- Full visual rebuild in the approved Editorial/Warm style (warm palette, serif headlines)
- Rewrote all copy in English; dropped the blog and react-router-dom entirely
- Projects section now reads from a manually-curated data file, linking out to live Vercel deployments (VG Picker, Finance Tracker)
- Added a LinkedIn link to Contact
- Removed the stray netlify.toml and unused placeholder/blog images
- No changes to hosting: same GitHub Actions → GitHub Pages workflow and CNAME

## Test plan
- [x] `pnpm typecheck` and `pnpm build` pass
- [x] Manually verified nav, all sections, project links, and contact links in the browser
- [ ] Confirm joseppascual.com renders correctly after merge
EOF
)"
```

Expected: PR created against `main`, URL printed. Do not merge — per `AGENTS.md`, this repo follows a PR flow, and final review/merge is the user's call.
