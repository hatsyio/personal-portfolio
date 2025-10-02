# Personal Portfolio

A modern, minimalist portfolio website built with Next.js and Tailwind CSS, designed to showcase your projects, blog posts, and personal information.

## Features

- 🎨 Clean, minimalist design with dark theme
- 📱 Fully responsive layout
- ♿ Accessible components following WCAG guidelines
- 📝 Blog section with individual post pages
- 🚀 Static site generation for optimal performance
- 📦 Hybrid deployment: GitHub Pages (production) + Netlify (PR previews)

## Getting Started

### Development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view your site.

### Customization

1. **Personal Information**: Update the content in `components/hero.tsx`, `components/about.tsx`
2. **Projects**: Edit the projects array in `components/projects.tsx`
3. **Blog Posts**: Add or modify posts in `app/blog/[slug]/page.tsx`
4. **Social Links**: Update links in `components/hero.tsx`
5. **Colors**: Customize the theme in `app/globals.css`

## Deployment

This project uses a **hybrid deployment strategy**:

- **Production (main branch)**: GitHub Pages
- **PR Previews**: Netlify

### Production Deployment (GitHub Pages)

**Setup (one-time)**:

1. Go to repository **Settings → Pages**
2. Under "Build and deployment":
   - Source: **GitHub Actions**
3. Push to `main` branch to deploy

The `.github/workflows/deploy.yml` workflow automatically:
- Builds the Next.js app on every push to `main`
- Deploys to GitHub Pages
- Includes caching for faster builds

**Production URL**: `https://<username>.github.io/<repo-name>/`

### PR Preview Deployment (Netlify)

**Setup (one-time)**:

1. Go to [app.netlify.com](https://app.netlify.com)
2. Click **"Add new site" → "Import an existing project"**
3. Select **GitHub** and choose this repository
4. Configure build settings:
   - Build command: `pnpm build`
   - Publish directory: `out`
   - (These are auto-detected from `netlify.toml`)
5. Click **"Deploy site"**

**Configure deploy contexts**:
1. Go to **Site settings → Build & deploy → Deploy contexts**
2. Enable **"Deploy previews"** for pull requests ✅
3. Disable **"Branch deploys"** (we only want PR previews) ❌

**How it works**:
- Every PR automatically gets a unique preview URL
- Netlify comments on the PR with the preview link
- Preview updates automatically on every commit
- Cleans up when PR closes

**Preview URL**: `https://deploy-preview-<pr-number>--<site-name>.netlify.app/`

### Why Hybrid Deployment?

✅ **Production on GitHub Pages**: Free, reliable, simple  
✅ **Previews on Netlify**: Superior PR preview experience with automatic comments  
✅ **Best of both worlds**: Stable production + excellent preview workflow

### Troubleshooting

**GitHub Pages not deploying**:
- Check Settings → Pages → Source is set to "GitHub Actions"
- View build logs in the **Actions** tab

**Netlify preview not appearing**:
- Verify deploy previews are enabled in Site settings
- Check Netlify build logs for errors
- Ensure `netlify.toml` is committed to repository

**Build fails with "pnpm not found"** (Netlify):
- The `netlify.toml` configures pnpm automatically
- If needed, add environment variable: `PNPM_VERSION = 8`

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Fonts**: Geist Sans & Geist Mono
- **Deployment**: GitHub Pages + Netlify

## Project Structure

```
├── app/
│   ├── blog/[slug]/     # Individual blog post pages
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles and theme
├── components/
│   ├── about.tsx        # About section
│   ├── blog.tsx         # Blog listing
│   ├── footer.tsx       # Footer component
│   ├── hero.tsx         # Hero section
│   ├── navigation.tsx   # Side navigation
│   └── projects.tsx     # Projects showcase
├── .github/workflows/
│   └── deploy.yml       # GitHub Actions deployment
└── netlify.toml         # Netlify configuration
```

## License

MIT
