import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"

// This would typically come from a CMS or markdown files
const blogPosts: Record<string, { title: string; date: string; content: string }> = {
  "building-accessible-web-applications": {
    title: "Building Accessible Web Applications",
    date: "March 15, 2024",
    content: `
      <p>Web accessibility is not just a nice-to-have feature—it's essential for creating inclusive digital experiences that everyone can use, regardless of their abilities or the devices they use.</p>
      
      <h2>Why Accessibility Matters</h2>
      <p>Approximately 15% of the world's population lives with some form of disability. By building accessible websites, we ensure that everyone can access information, services, and opportunities online.</p>
      
      <h2>Key Principles</h2>
      <ul>
        <li><strong>Perceivable:</strong> Information must be presentable to users in ways they can perceive</li>
        <li><strong>Operable:</strong> User interface components must be operable</li>
        <li><strong>Understandable:</strong> Information and operation must be understandable</li>
        <li><strong>Robust:</strong> Content must be robust enough to work with current and future technologies</li>
      </ul>
      
      <h2>Practical Implementation</h2>
      <p>Start with semantic HTML, add proper ARIA labels, ensure keyboard navigation works smoothly, and test with screen readers. These foundational steps will significantly improve your application's accessibility.</p>
    `,
  },
  "my-journey-with-nextjs": {
    title: "My Journey with Next.js",
    date: "February 28, 2024",
    content: `
      <p>Next.js has revolutionized the way I build web applications. Its powerful features and developer experience make it my go-to framework for modern web development.</p>
      
      <h2>What Makes Next.js Special</h2>
      <p>The framework provides an excellent balance between performance and developer experience. Server-side rendering, static site generation, and API routes all work seamlessly together.</p>
      
      <h2>Key Features I Love</h2>
      <ul>
        <li>File-based routing that just makes sense</li>
        <li>Built-in optimization for images and fonts</li>
        <li>Flexible rendering strategies (SSR, SSG, ISR)</li>
        <li>Excellent TypeScript support</li>
      </ul>
      
      <h2>Real-World Impact</h2>
      <p>Since adopting Next.js, my projects load faster, rank better in search engines, and provide a superior user experience. The framework handles many complex optimizations automatically, letting me focus on building features.</p>
    `,
  },
  "the-art-of-clean-code": {
    title: "The Art of Clean Code",
    date: "January 10, 2024",
    content: `
      <p>Writing clean code is an art form that requires practice, discipline, and a genuine care for the craft. It's about creating code that's not just functional, but maintainable and elegant.</p>
      
      <h2>What is Clean Code?</h2>
      <p>Clean code is code that is easy to read, understand, and modify. It follows consistent patterns, has clear naming conventions, and is well-organized.</p>
      
      <h2>Principles to Follow</h2>
      <ul>
        <li><strong>Meaningful Names:</strong> Variables and functions should clearly express their purpose</li>
        <li><strong>Single Responsibility:</strong> Each function should do one thing well</li>
        <li><strong>DRY Principle:</strong> Don't Repeat Yourself—extract common logic</li>
        <li><strong>Comments When Necessary:</strong> Code should be self-documenting, but complex logic deserves explanation</li>
      </ul>
      
      <h2>The Long-Term Benefits</h2>
      <p>Investing time in writing clean code pays dividends. Your future self (and your teammates) will thank you when they need to modify or debug the code months or years later.</p>
    `,
  },
}

export function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug,
  }))
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug]

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen px-6 lg:px-20 py-20">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/#blog"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to blog
        </Link>

        <article className="prose prose-invert prose-lg max-w-none">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-foreground">{post.title}</h1>
          <p className="text-muted-foreground mb-12">{post.date}</p>

          <div
            className="text-muted-foreground leading-relaxed [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:text-foreground [&>h2]:mt-12 [&>h2]:mb-4 [&>p]:mb-6 [&>ul]:mb-6 [&>ul]:list-disc [&>ul]:pl-6 [&>li]:mb-2 [&>strong]:text-foreground"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </div>
  )
}
