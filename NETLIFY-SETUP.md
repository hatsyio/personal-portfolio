# Netlify PR Preview Setup Guide

## Overview

This repository uses a hybrid deployment strategy:
- **Production (main branch)**: Deployed to **GitHub Pages**
- **PR Previews**: Deployed to **Netlify**

This gives you the best of both worlds:
- Free, fast GitHub Pages hosting for production
- Excellent automatic PR preview system from Netlify

---

## Setup Instructions

### Step 1: Connect Repository to Netlify

1. **Log in to Netlify**: Go to [app.netlify.com](https://app.netlify.com)

2. **Import your project**:
   - Click **"Add new site"** → **"Import an existing project"**
   - Choose **"Deploy with GitHub"**
   - Authorize Netlify to access your GitHub account (if not already done)
   - Select this repository from the list

3. **Configure build settings**:
   ```
   Build command: pnpm build
   Publish directory: out
   ```
   
   These should be auto-detected from `netlify.toml` - verify they match!

4. **Click "Deploy site"**

### Step 2: Configure Production Deploys to Stop

Since we want production on GitHub Pages, not Netlify:

1. **Go to Site settings** → **Build & deploy** → **Build settings**

2. **Stop builds**:
   - Under "Build settings", find **"Stop builds"** or **"Production branch"**
   - You can either:
     - **Option A**: Set production branch to a non-existent branch (e.g., `netlify-disabled`)
     - **Option B**: Go to **"Build hooks"** and disable automatic production deploys

3. **Alternative approach** (recommended):
   - The `netlify.toml` is already configured to skip production builds
   - Netlify will still "build" on main, but it won't do anything
   - This keeps the site active for PR previews

### Step 3: Configure PR Preview Settings

1. **Enable Deploy Previews**:
   - Go to **Site settings** → **Build & deploy** → **Deploy contexts**
   - Ensure **"Deploy previews"** is set to **"Any pull request against your production branch"**
   - This should be enabled by default ✅

2. **Disable Branch deploys**:
   - In the same **Deploy contexts** section
   - Set **"Branch deploys"** to **"None"** or disable it
   - We only want PR previews, not branch deploys

### Step 4: Configure GitHub Integration

Netlify automatically:
- ✅ Comments on PRs with preview links
- ✅ Updates the preview on every commit
- ✅ Shows deployment status in GitHub checks
- ✅ Cleans up when PRs are closed

No additional configuration needed!

### Step 5: Test It Out

1. **Create a test branch**:
   ```bash
   git checkout -b test-netlify-preview
   ```

2. **Make a small change** (e.g., update a comment in a component)

3. **Push and create a PR**:
   ```bash
   git add .
   git commit -m "Test Netlify PR preview"
   git push origin test-netlify-preview
   ```

4. **Open the PR on GitHub**:
   - You should see Netlify deploy checks appear
   - Within a few minutes, Netlify will comment with the preview URL
   - Click the link to see your preview! 🎉

---

## How It Works

### Production Flow (GitHub Pages)
```
Push to main
  → GitHub Actions workflow runs
  → Builds Next.js app
  → Deploys to gh-pages branch
  → Available at your GitHub Pages URL
```

### PR Preview Flow (Netlify)
```
Open/update PR
  → Netlify webhook triggered
  → Netlify builds the PR branch
  → Deploys to unique Netlify URL
  → Comments on PR with link
  → Cleans up when PR closes
```

---

## URLs

- **Production**: `https://<username>.github.io/<repo-name>/` (GitHub Pages)
- **PR Previews**: `https://deploy-preview-<pr-number>--<site-name>.netlify.app/` (Netlify)

---

## Common Issues & Solutions

### Issue: Netlify build fails with "pnpm not found"

**Solution**: The `netlify.toml` configures pnpm automatically. If this doesn't work:
1. Go to Site settings → Build & deploy → Environment
2. Add environment variable: `PNPM_VERSION` = `8`

### Issue: PR preview shows 404 errors

**Solution**: Check that:
- `netlify.toml` has `publish = "out"`
- Next.js is configured with `output: 'export'` (already set ✅)
- Build completes successfully (check Netlify build logs)

### Issue: Images don't load in preview

**Solution**: Ensure `next.config.mjs` has:
```javascript
images: {
  unoptimized: true,
}
```
Already configured ✅

### Issue: Netlify deploys production (we don't want this)

**Solution**: 
1. In `netlify.toml`, production context is set to skip builds
2. Alternatively, in Netlify dashboard, disable production branch deploys
3. The site will still work for PR previews

---

## Managing Your Netlify Site

### Useful Netlify Settings

1. **Custom domain for previews** (optional):
   - Site settings → Domain management
   - Add a custom domain for your Netlify previews
   - E.g., `previews.yourdomain.com`

2. **Password protection** (optional):
   - Site settings → Access control
   - Add password protection to all deploy previews
   - Useful for private projects

3. **Notification settings**:
   - Site settings → Build & deploy → Deploy notifications
   - Configure email/Slack notifications for deploy status

### Netlify CLI (optional)

Install for local development:
```bash
npm install -g netlify-cli
```

Useful commands:
```bash
# Link your local project to Netlify site
netlify link

# Test build locally
netlify build

# Test site locally (with Netlify's routing)
netlify dev

# Deploy preview manually
netlify deploy

# Deploy production (we don't use this)
netlify deploy --prod
```

---

## Cost Considerations

### Netlify Free Tier Includes:
- ✅ Unlimited PR preview deploys
- ✅ 300 build minutes/month (should be plenty)
- ✅ 100 GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Deploy previews
- ✅ Forms (100 submissions/month)

This should be more than enough for a personal portfolio!

### If You Exceed Free Tier:
- Build minutes: ~$7/500 extra minutes
- Bandwidth: $20/100 GB
- Consider optimizing build times or reducing preview frequency

---

## Alternative: Netlify for Everything

If you decide you prefer Netlify for both production and previews:

1. **Enable production deploys**:
   - Remove the production skip in `netlify.toml`
   - Or in Netlify dashboard, set production branch to `main`

2. **Add custom domain**:
   - Site settings → Domain management
   - Add your custom domain (e.g., `joseppascualbadia.com`)
   - Update DNS records as instructed

3. **Update/disable GitHub Pages workflow**:
   - Rename `deploy-main.yml` to `deploy-main.yml.disabled`
   - Or delete it entirely

Benefits of using Netlify for everything:
- Simpler setup (one platform)
- Better build cache
- Atomic deploys
- Instant rollbacks
- Better analytics

---

## Support & Resources

- **Netlify Documentation**: [docs.netlify.com](https://docs.netlify.com)
- **Deploy Previews Guide**: [docs.netlify.com/site-deploys/deploy-previews](https://docs.netlify.com/site-deploys/deploy-previews/)
- **Next.js on Netlify**: [docs.netlify.com/frameworks/next-js](https://docs.netlify.com/frameworks/next-js/)
- **Netlify Support**: [answers.netlify.com](https://answers.netlify.com)

---

## Quick Troubleshooting Checklist

- [ ] Repository connected to Netlify
- [ ] Build settings configured (`pnpm build`, publish: `out`)
- [ ] Deploy previews enabled in site settings
- [ ] `netlify.toml` file committed to repository
- [ ] Test PR created and Netlify check appears
- [ ] Preview link works in PR comment

Need help? Check the Netlify build logs for detailed error messages!

