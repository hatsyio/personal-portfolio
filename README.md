# Personal Portfolio

A modern, minimalist portfolio website built with React and Tailwind CSS, designed to showcase your projects, blog posts, and personal information.

## Features

- 🎨 Clean, minimalist design with dark theme
- 📱 Fully responsive layout
- ⚡ Fast and lightweight - built with Vite
- 📝 Blog section
- 🚀 Static site generation for optimal performance
- 📦 Easy deployment to any static hosting

## Getting Started

### Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) to view your site.

### Customization

1. **Personal Information**: Update the content in `src/components/Hero.tsx`, `src/components/About.tsx`
2. **Projects**: Edit the projects array in `src/components/Projects.tsx`
3. **Blog Posts**: Edit the blogPosts array in `src/data/blogPosts.ts`
4. **Social Links**: Update links in `src/components/Hero.tsx` and `src/components/Contact.tsx`
5. **Colors**: Customize the theme in `src/index.css`

## Build for Production

```bash
# Build the project
pnpm build

# Preview the production build
pnpm preview
```

The build output will be in the `dist` directory, ready to be deployed to any static hosting service.

## CI/CD

### Pre-commit Hooks (Husky)

The project uses Husky to run checks before each commit:
- Type checking with TypeScript
- Build verification

These checks ensure code quality and prevent broken commits.

### GitHub Actions

**Production Deployment** (`.github/workflows/deploy.yml`):
- Triggers on push to `main` branch
- Builds the project
- Deploys to GitHub Pages
- Includes caching for faster builds

**PR Checks** (`.github/workflows/pr-checks.yml`):
- Runs on all pull requests
- Type checking
- Build verification
- Ensures PRs don't break the build

## Deployment

### GitHub Pages (Recommended)

**Setup (one-time)**:
1. Go to repository **Settings → Pages**
2. Under "Build and deployment":
   - Source: **GitHub Actions**
3. Push to `main` branch to deploy

The deploy workflow automatically builds and deploys your site.

### Netlify

The project includes a `netlify.toml` configuration file. Simply:

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Netlify will automatically detect the configuration and deploy

**Configure for PR previews**:
- Enable "Deploy previews" for pull requests
- Disable "Branch deploys" (optional)

### Other Static Hosts

You can deploy the `dist` folder to any static hosting service:

- **Vercel**: Import the repository
- **Cloudflare Pages**: Connect your repository
- **Any static host**: Upload the `dist` folder

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Language**: TypeScript

## Project Structure

```
├── src/
│   ├── components/       # React components (sections)
│   │   ├── About.tsx
│   │   ├── Blog.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── Navigation.tsx
│   │   └── Projects.tsx
│   ├── pages/           # Route-level pages
│   │   ├── Home.tsx     # Main landing page
│   │   └── BlogPost.tsx # Individual blog post page
│   ├── data/            # Static data
│   │   └── blogPosts.ts # Blog posts array
│   ├── App.tsx          # Main app component with routing
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── public/              # Static assets
├── index.html           # HTML template
└── vite.config.ts       # Vite configuration
```

## Routing

The site uses React Router for client-side routing:

- **`/`** - Home page with all main sections (Hero, About, Projects, Blog, Contact)
- **`/blog/:slug`** - Individual blog post pages (dynamic route based on slug)

Blog posts link to their individual pages from the Blog section on the home page.

## Adding Content

### Adding a New Blog Post

Edit `src/data/blogPosts.ts` and add a new entry to the `blogPosts` array:

```typescript
{
  slug: 'your-post-url-slug',
  title: 'Your Post Title',
  excerpt: 'A brief description for the blog card',
  date: 'Month Day, Year',
  image: '/your-image.jpg',
  content: `
    <p>Your HTML content here...</p>
    <h2>Subheading</h2>
    <p>More content...</p>
  `,
}
```

Place your image in the `public/` folder and reference it with an absolute path (e.g., `/your-image.jpg`).

### Adding a New Project

Edit the `projects` array in `src/components/Projects.tsx`:

```typescript
{
  title: 'Project Name',
  description: 'Project description',
  tags: ['Tech1', 'Tech2', 'Tech3'],
  link: 'https://github.com/username/repo',
  year: '2024',
  image: '/project-image.jpg',
}
```

## License

MIT
