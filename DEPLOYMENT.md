# Deployment Guide

## Hybrid Deployment Strategy

This portfolio uses a **hybrid deployment approach** for the best of both worlds:

- **Production (main branch)**: Deployed to **GitHub Pages** (free, fast, simple)
- **PR Previews**: Deployed to **Netlify** (excellent preview system, automatic)

### Why This Approach?

✅ **Best of both platforms**:
- GitHub Pages: Simple, free, reliable production hosting
- Netlify: Superior PR preview experience with automatic comments and cleanup

✅ **Advantages**:
- Production stays stable on GitHub Pages
- Every PR gets a unique Netlify preview URL
- Automatic comments on PRs with preview links
- Zero manual configuration per PR
- Automatic cleanup when PRs close
- Better isolation between previews

---

## Production Deployment (GitHub Pages)

### How It Works

When you push to `main` branch:
1. GitHub Actions workflow runs
2. Builds your Next.js app
3. Deploys to `gh-pages` branch
4. Available at your GitHub Pages URL

### Setup Steps

1. **Enable GitHub Pages**:
   - Go to your repository → Settings → Pages
   - Under "Build and deployment", select:
     - Source: **Deploy from a branch**
     - Branch: **gh-pages** / (root)
   - Save the settings

2. **The workflow is already configured** in `.github/workflows/deploy-main.yml`

3. **Production URL**: `https://<username>.github.io/<repo-name>/`

---

## PR Preview Deployment (Netlify)

Netlify provides automatic PR preview deployments with zero configuration needed per PR.

### Setup Steps

See **[NETLIFY-SETUP.md](./NETLIFY-SETUP.md)** for complete instructions.

**Quick setup**:
1. Go to [app.netlify.com](https://app.netlify.com)
2. Import your GitHub repository
3. Configure build: `pnpm build`, publish: `out`
4. Deploy previews are enabled by default!

### How It Works

When you open/update a PR:
1. Netlify automatically detects the PR
2. Builds the PR branch
3. Deploys to a unique URL: `https://deploy-preview-<pr-number>--<site>.netlify.app/`
4. Comments on the PR with the preview link
5. Updates on every commit
6. Cleans up when PR closes

### Configuration

The `netlify.toml` file configures:
- Build command and publish directory
- Production builds are skipped (we use GitHub Pages)
- PR preview builds are enabled
- Caching headers for performance

---

## Better Alternative: Vercel (Recommended)

Vercel is purpose-built for PR previews and offers a superior experience:

### Advantages
- ✅ Automatic PR preview deployments with unique URLs
- ✅ Perfect Next.js integration (Vercel created Next.js)
- ✅ Automatic cleanup when PRs close
- ✅ Preview comments automatically added to PRs
- ✅ Better performance and caching
- ✅ Free for personal projects
- ✅ Custom domains with automatic HTTPS

### Setup Steps

1. **Install Vercel CLI** (optional):
   ```bash
   npm i -g vercel
   ```

2. **Connect via Vercel Dashboard**:
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "Add New Project"
   - Import your repository
   - Vercel auto-detects Next.js - just click "Deploy"

3. **Configure Custom Domain** (if needed):
   - In Vercel dashboard → Project Settings → Domains
   - Add your custom domain (e.g., `joseppascualbadia.com`)
   - Update DNS records as instructed

4. **PR Previews Work Automatically**:
   - Every PR gets a unique preview URL
   - Comments automatically posted to PRs
   - Updates on every push

### Migration from GitHub Pages to Vercel

If you decide to switch:
1. Remove the GitHub Actions workflows (or keep them as backup)
2. Update `next.config.mjs` to remove basePath/assetPrefix
3. Deploy to Vercel (keeps your existing setup compatible)

---

## Other Alternatives

### Netlify
- Similar to Vercel
- Great PR preview support
- Free tier available
- [netlify.com](https://netlify.com)

### Cloudflare Pages
- Free unlimited builds
- Fast global CDN
- PR preview support
- [pages.cloudflare.com](https://pages.cloudflare.com)

---

## Current URLs

- **Production (main branch)**: `https://<username>.github.io/<repo-name>/`
- **PR Previews**: `https://<username>.github.io/<repo-name>/pr-<number>/`

Replace `<username>` with your GitHub username and `<repo-name>` with your repository name.

---

## Troubleshooting

### PR Preview Not Deploying
- Check that the `gh-pages` branch exists
- Verify GitHub Actions have write permissions
- Check the Actions tab for error logs

### 404 on PR Preview
- Ensure the PR workflow completed successfully
- Check that `basePath` and `assetPrefix` are set correctly in the build

### Main Deployment Failing
- Ensure GitHub Pages is set to "GitHub Actions" source
- Check for build errors in the Actions tab
- Verify `out` directory is created during build

---

## Need Help?

- GitHub Actions logs: Repository → Actions tab
- GitHub Pages settings: Repository → Settings → Pages
- Vercel support: [vercel.com/support](https://vercel.com/support)

