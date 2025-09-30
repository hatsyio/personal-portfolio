# Personal Portfolio

A modern, minimalist portfolio website built with Next.js and Tailwind CSS, designed to showcase your projects, blog posts, and personal information.

## Features

- 🎨 Clean, minimalist design with dark theme
- 📱 Fully responsive layout
- ♿ Accessible components following WCAG guidelines
- 📝 Blog section with individual post pages
- 🚀 Static site generation for optimal performance
- 📦 Ready for GitHub Pages deployment

## Getting Started

### Development

\`\`\`bash
npm install
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view your site.

### Customization

1. **Personal Information**: Update the content in `components/hero.tsx`, `components/about.tsx`
2. **Projects**: Edit the projects array in `components/projects.tsx`
3. **Blog Posts**: Add or modify posts in `app/blog/[slug]/page.tsx`
4. **Social Links**: Update links in `components/hero.tsx`
5. **Colors**: Customize the theme in `app/globals.css`

### Deployment to GitHub Pages

1. Create a new repository on GitHub
2. Update `basePath` in `next.config.mjs` with your repository name
3. Push your code to the `main` branch
4. Enable GitHub Pages in repository settings (Settings → Pages → Source: GitHub Actions)
5. The site will automatically deploy on every push to `main`

Your site will be available at: `https://yourusername.github.io/your-repo-name`

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Fonts**: Geist Sans & Geist Mono
- **Deployment**: GitHub Pages

## Project Structure

\`\`\`
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
└── .github/workflows/
    └── deploy.yml       # GitHub Actions deployment
\`\`\`

## License

MIT
